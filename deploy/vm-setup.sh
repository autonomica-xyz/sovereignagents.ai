#!/usr/bin/env bash
# One-time (idempotent) setup on an exe.dev VM: Node, deps, first build, nginx on :8000, refresh timer.
set -euo pipefail
trap 'echo "[setup] failed at line $LINENO"' ERR
APP="${APP:-/home/exedev/sovereignagents-site}"
NODE_VERSION="${NODE_VERSION:-v22.23.4}"
if ! command -v node >/dev/null || [[ "$(node -v)" != "$NODE_VERSION" ]]; then
  curl -fsSL "https://nodejs.org/dist/${NODE_VERSION}/node-${NODE_VERSION}-linux-x64.tar.xz" -o /tmp/node.tar.xz
  sudo rm -rf /opt/node && sudo mkdir -p /opt/node && sudo tar -xJf /tmp/node.tar.xz -C /opt/node --strip-components=1
  sudo ln -sf /opt/node/bin/node /usr/local/bin/node; sudo ln -sf /opt/node/bin/npm /usr/local/bin/npm; sudo ln -sf /opt/node/bin/npx /usr/local/bin/npx
fi
cd "$APP"
npm ci --no-audit --no-fund --loglevel=error
bash deploy/rebuild.sh
chmod o+x /home/exedev "$APP"
sudo tee /etc/nginx/sites-available/sovereignagents >/dev/null <<NGINX
server {
  listen 8000 default_server;
  root $APP/current;
  index index.html;
  gzip on; gzip_types text/css application/javascript application/json image/svg+xml; gzip_min_length 1024;
  location /_astro/ { expires 30d; add_header Cache-Control "public, immutable"; }
  location / { try_files \$uri \$uri/index.html \$uri/ =404; add_header Cache-Control "public, max-age=300"; }
  error_page 404 /404.html;
}
NGINX
sudo ln -sf /etc/nginx/sites-available/sovereignagents /etc/nginx/sites-enabled/sovereignagents
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && (sudo systemctl enable --now nginx && sudo systemctl reload nginx)
sudo tee /etc/systemd/system/sa-refresh.service >/dev/null <<UNIT
[Unit]
Description=Rebuild sovereignagents site from the latest wiki
[Service]
Type=oneshot
User=exedev
Environment=PATH=/usr/local/bin:/usr/bin:/bin
ExecStart=/bin/bash $APP/deploy/rebuild.sh
UNIT
sudo tee /etc/systemd/system/sa-refresh.timer >/dev/null <<UNIT
[Unit]
Description=Refresh sovereignagents site every 30 minutes
[Timer]
OnBootSec=2min
OnUnitActiveSec=30min
Persistent=true
[Install]
WantedBy=timers.target
UNIT
sudo systemctl daemon-reload && sudo systemctl enable --now sa-refresh.timer
echo "[setup] done"
