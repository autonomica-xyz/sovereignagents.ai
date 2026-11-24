// Checks every internal link and #anchor in the built site. Usage: node scripts/check-links.mjs [dist]
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
const root = process.argv[2] || process.env.OUT_DIR || 'dist';
const files = [];
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); } })(root);
const ids = new Map();
const pathOf = (f) => '/' + relative(root, f).replace(/index\.html$/, '').replace(/\\/g, '/');
for (const f of files) ids.set(pathOf(f), new Set([...readFileSync(f, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
let bad = 0, n = 0;
for (const f of files) {
  const html = readFileSync(f, 'utf8');
  for (const [, raw] of html.matchAll(/\shref="([^"]+)"/g)) {
    const href = raw.replace(/&amp;/g, '&');
    if (/^(https?:|mailto:|data:)/.test(href)) continue;
    n++;
    const [p0, hash] = href.split('#');
    let p = (p0 || pathOf(f)).split('?')[0];
    if (!p.endsWith('/') && !/\.\w+$/.test(p)) p += '/';
    const target = /\.\w+$/.test(p) ? existsSync(join(root, p)) : ids.has(p);
    const anchorOk = !hash || (ids.get(p)?.has(decodeURIComponent(hash)) ?? false);
    if (!target || !anchorOk) { bad++; console.log(`BROKEN ${pathOf(f)} -> ${href}`); }
  }
}
console.log(`${files.length} pages, ${n} internal links, ${bad} broken`);
process.exit(bad ? 1 : 0);
