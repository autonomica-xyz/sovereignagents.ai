#!/usr/bin/env bash
# Pull the latest wiki content, build into a fresh release dir, then atomically switch `current` to it.
# Safe to run repeatedly (cron/systemd timer); a failed build leaves the live site untouched.
set -euo pipefail
APP="${APP:-$(cd "$(dirname "$0")/.." && pwd)}"
cd "$APP"
TS=$(date +%Y%m%d%H%M%S)
mkdir -p releases
node scripts/sync-content.mjs
OUT_DIR="$APP/releases/$TS" npx astro build --silent
ln -sfn "$APP/releases/$TS" "$APP/current.tmp" && mv -Tf "$APP/current.tmp" "$APP/current"
ls -1dt releases/*/ | tail -n +4 | xargs -r rm -rf
echo "[rebuild] live: releases/$TS (wiki $(node -e "console.log(require('./content-src/.site-meta.json').head)"))"
