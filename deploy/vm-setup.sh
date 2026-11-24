#!/usr/bin/env bash
# Idempotent setup on an exe.dev VM: Node, deps, build, nginx on :8000. No scheduled rebuilds.
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
  absolute_redirect off;
  gzip on; gzip_types text/css application/javascript application/json image/svg+xml; gzip_min_length 1024;
  # v3 preview paths: /a/ and /d/ were the earlier directions, /c/ is now nerd mode.
  location ~ ^/[ad](/.*)\$ { return 301 \$1\$is_args\$args; }
  location ~ ^/[ad]\$ { return 301 /; }
  location ~ ^/c(/.*)\$ { return 301 /nerd\$1\$is_args\$args; }
  location = /c { return 301 /nerd/; }
  location = /nerd { return 301 /nerd/; }
  location ^~ /_astro/ { expires 30d; add_header Cache-Control "public, immutable"; }
  location ^~ /nerd/_astro/ { expires 30d; add_header Cache-Control "public, immutable"; }
  location ^~ /nerd/ { try_files \$uri \$uri/index.html \$uri/ =404; add_header Cache-Control "public, max-age=300"; error_page 404 /nerd/404.html; }
  location / { try_files \$uri \$uri/index.html \$uri/ =404; add_header Cache-Control "public, max-age=300"; }
  error_page 404 /404.html;
}
NGINX
sudo ln -sf /etc/nginx/sites-available/sovereignagents /etc/nginx/sites-enabled/sovereignagents
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && (sudo systemctl enable --now nginx && sudo systemctl reload nginx)
# v2: content changes go through commits, so remove the old 30-minute rebuild timer if present.
if systemctl list-unit-files sa-refresh.timer >/dev/null 2>&1 && [[ -e /etc/systemd/system/sa-refresh.timer ]]; then
  sudo systemctl disable --now sa-refresh.timer || true
fi
sudo rm -f /etc/systemd/system/sa-refresh.timer /etc/systemd/system/sa-refresh.service
sudo systemctl daemon-reload
rm -rf "$APP/content-src"
echo "[setup] done"
