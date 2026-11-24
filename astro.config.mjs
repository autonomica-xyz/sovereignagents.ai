// One content layer, three visual themes. Each build renders the whole site for one theme
// (THEME=a|c|d) under /<theme>/; scripts/build-all.mjs builds all three plus the chooser.
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const THEME = process.env.THEME || 'a';
if (!['a', 'c', 'd'].includes(THEME)) throw new Error(`unknown THEME ${THEME}`);
const BASE = `/${THEME}`;

// Content and pages link root-relatively ("/blueprint/…"). After the build, prefix every
// internal href with the theme base so each variant is self-contained.
const prefixLinks = {
  name: 'theme-prefix-links',
  hooks: {
    'astro:build:done': ({ dir }) => {
      const root = fileURLToPath(dir);
      // Leave alone: protocol-relative URLs, links already under a theme (/a/, /c/, /d/),
      // built assets, and anchors marked data-abs (e.g. the link back to the chooser).
      const re = /(?<!data-abs)(\shref=")\/(?!\/|[acd]\/|_astro\/)/g;
      (function walk(d) {
        for (const f of readdirSync(d)) {
          const p = join(d, f);
          if (statSync(p).isDirectory()) walk(p);
          else if (p.endsWith('.html')) writeFileSync(p, readFileSync(p, 'utf8').replace(re, `$1${BASE}/`));
        }
      })(root);
    },
  },
};

export default defineConfig({
  site: process.env.SITE_URL || 'https://sovereignagents.exe.xyz',
  base: BASE,
  outDir: process.env.OUT_DIR || `./dist/${THEME}`,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  compressHTML: true,
  integrations: [prefixLinks],
  vite: { resolve: { alias: { '@theme': fileURLToPath(new URL(`./src/themes/${THEME}`, import.meta.url)) } } },
});
