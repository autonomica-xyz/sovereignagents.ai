#!/usr/bin/env bash
# Pull the latest wiki content, build into a fresh release dir, then atomically switch `current` to it.
# Safe to run repeatedly (cron/systemd timer): runs are serialized with a lock, and a failed build
# leaves the live site untouched.
set -euo pipefail
APP="${APP:-$(cd "$(dirname "$0")/.." && pwd)}"
cd "$APP"
exec 9>"$APP/.rebuild.lock"
flock -n 9 || { echo "[rebuild] another rebuild is running"; exit 0; }
mkdir -p releases
REL="$APP/releases/$(date +%Y%m%d%H%M%S)-$$"
trap 'rm -rf "$REL"' ERR
node scripts/sync-content.mjs
OUT_DIR="$REL" npx astro build --silent
trap - ERR
ln -sfn "$REL" "$APP/current.tmp" && mv -Tf "$APP/current.tmp" "$APP/current"
LIVE=$(readlink -f "$APP/current")
ls -1dt "$APP"/releases/*/ | tail -n +4 | while read -r d; do [[ "$(readlink -f "$d")" == "$LIVE" ]] || rm -rf "$d"; done
echo "[rebuild] live: $(basename "$REL") (wiki $(node -e "console.log(require('./content-src/.site-meta.json').head)"))"
