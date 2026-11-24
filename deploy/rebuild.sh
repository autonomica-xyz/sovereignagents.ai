#!/usr/bin/env bash
# Build the committed content into a fresh release dir, then atomically switch `current` to it.
# Runs are serialized with a lock, and a failed build leaves the live site untouched.
# Content changes only through commits to this repo; there is no scheduled rebuild.
set -euo pipefail
APP="${APP:-$(cd "$(dirname "$0")/.." && pwd)}"
cd "$APP"
exec 9>"$APP/.rebuild.lock"
flock -n 9 || { echo "[rebuild] another rebuild is running"; exit 0; }
mkdir -p releases
REL="$APP/releases/$(date +%Y%m%d%H%M%S)-$$"
trap 'rm -rf "$REL"' ERR
OUT_DIR="$REL" npx astro build --silent
node scripts/check-links.mjs "$REL"  # refuse to go live with broken internal links
trap - ERR
ln -sfn "$REL" "$APP/current.tmp" && mv -Tf "$APP/current.tmp" "$APP/current"
LIVE=$(readlink -f "$APP/current")
ls -1dt "$APP"/releases/*/ | tail -n +4 | while read -r d; do [[ "$(readlink -f "$d")" == "$LIVE" ]] || rm -rf "$d"; done
echo "[rebuild] live: $(basename "$REL")"
