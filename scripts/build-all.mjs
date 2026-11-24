// Builds the whole static site into OUT_DIR (default dist/):
//   /          organism mode
//   /nerd/     nerd mode
//   /a/ /c/ /d/  redirect pages for the old v3 preview paths (/c/ → /nerd/, the others → /)
//   robots.txt  production allows crawling; DEPLOY_ENV=preview (exe.dev) disallows everything
// The output needs no server-side rewrites or redirects, so it runs on GitHub Pages as is.
// Usage: OUT_DIR=dist [DEPLOY_ENV=preview] node scripts/build-all.mjs
import { execFileSync } from 'node:child_process';
import { renameSync, mkdtempSync, rmSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';

const out = resolve(process.env.OUT_DIR || 'dist');
const SITE = (process.env.SITE_URL || 'https://sovereignagents.ai').replace(/\/$/, '');
const preview = process.env.DEPLOY_ENV === 'preview';
// Astro moves files into outDir with rename(), so the scratch dir must sit on the same filesystem.
const tmp = mkdtempSync(join(dirname(out), '.sa-nerd-'));
const build = (MODE, dir) => execFileSync('npx', ['astro', 'build', '--silent'], { stdio: 'inherit', env: { ...process.env, MODE, OUT_DIR: dir } });
try {
  rmSync(out, { recursive: true, force: true });
  build('organism', out);
  build('nerd', join(tmp, 'nerd'));
  if (existsSync(join(out, 'nerd'))) throw new Error('organism build already has a /nerd/ route');
  renameSync(join(tmp, 'nerd'), join(out, 'nerd'));
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
rmSync(join(out, 'nerd', 'CNAME'), { force: true }); // public/ is copied into both builds; only the root needs it

// Every organism route, e.g. "/", "/blueprint/anatomy/brain/".
const routes = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) { if (p !== join(out, 'nerd')) walk(p); }
    else if (f === 'index.html') routes.push('/' + relative(out, d).split(sep).filter(Boolean).map((s) => s + '/').join(''));
  }
})(out);

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const redirectPage = (to, canonical) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Moved · Sovereign Agents</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="${esc(canonical)}">
<meta http-equiv="refresh" content="0; url=${esc(to)}">
<script>location.replace(${JSON.stringify(to)} + location.search + location.hash)</script>
</head><body><p>This page has moved to <a href="${esc(to)}">${esc(to)}</a>.</p></body></html>
`;
let n = 0;
for (const [old, prefix] of [['a', ''], ['d', ''], ['c', '/nerd']]) {
  if (existsSync(join(out, old))) throw new Error(`/${old}/ is a real route; cannot write redirects there`);
  for (const r of routes) {
    const dir = join(out, old, ...r.split('/').filter(Boolean));
    mkdirSync(dir, { recursive: true });
    // Nerd pages declare the organism page as canonical, so every redirect does too.
    writeFileSync(join(dir, 'index.html'), redirectPage(prefix + r, SITE + r));
    n++;
  }
}

writeFileSync(join(out, 'robots.txt'), preview ? 'User-agent: *\nDisallow: /\n' : 'User-agent: *\nAllow: /\n');
if (preview) rmSync(join(out, 'CNAME'), { force: true });
console.log(`[build-all] ${routes.length} routes in each mode, ${n} redirect pages, ${preview ? 'preview (noindex)' : 'production'}; output in ${out}`);
