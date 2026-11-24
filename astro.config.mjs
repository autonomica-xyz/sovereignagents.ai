import { defineConfig } from 'astro/config';
export default defineConfig({
  site: process.env.SITE_URL || 'https://sovereignagents.exe.xyz',
  outDir: process.env.OUT_DIR || './dist',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  compressHTML: true,
});
