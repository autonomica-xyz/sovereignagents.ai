// One content layer, two modes. MODE=organism (default) renders the site at the root;
// MODE=nerd renders the same routes under /nerd/ in the terminal theme.
// scripts/build-all.mjs builds both into one output directory.
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const MODE = process.env.MODE || 'organism';
if (!['organism', 'nerd'].includes(MODE)) throw new Error(`unknown MODE ${MODE}`);
const BASE = MODE === 'nerd' ? '/nerd' : '/';

// Content and pages link root-relatively ("/blueprint/…"). In nerd mode, prefix every internal
// href with /nerd after the build so readers stay in nerd mode.
const prefixLinks = {
  name: 'nerd-prefix-links',
  hooks: {
    'astro:build:done': ({ dir }) => {
      if (MODE !== 'nerd') return;
      const root = fileURLToPath(dir);
      // Leave alone: protocol-relative URLs, links already under /nerd/, built assets, and
      // anchors marked data-abs (the mode toggle, which points at the organism page on purpose).
      const re = /(?<!data-abs)(\shref=")\/(?!\/|nerd\/|_astro\/)/g;
      (function walk(d) {
        for (const f of readdirSync(d)) {
          const p = join(d, f);
          if (statSync(p).isDirectory()) walk(p);
          else if (p.endsWith('.html')) writeFileSync(p, readFileSync(p, 'utf8').replace(re, '$1/nerd/'));
        }
      })(root);
    },
  },
};

export default defineConfig({
  site: process.env.SITE_URL || 'https://sovereignagents.exe.xyz',
  base: BASE,
  outDir: process.env.OUT_DIR || (MODE === 'nerd' ? './dist/nerd' : './dist'),
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  compressHTML: true,
  integrations: [prefixLinks],
  vite: { resolve: { alias: { '@theme': fileURLToPath(new URL(`./src/themes/${MODE}`, import.meta.url)) } } },
});
