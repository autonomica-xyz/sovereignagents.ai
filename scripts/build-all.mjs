// Builds organism mode into OUT_DIR/ and nerd mode into OUT_DIR/nerd/.
// Usage: OUT_DIR=dist node scripts/build-all.mjs
import { execFileSync } from 'node:child_process';
import { renameSync, mkdtempSync, rmSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
const out = resolve(process.env.OUT_DIR || 'dist');
// Astro moves files into outDir with rename(), so the scratch dir must sit on the same filesystem.
const tmp = mkdtempSync(join(dirname(out), '.sa-nerd-'));
rmSync(out, { recursive: true, force: true });
const build = (MODE, dir) => execFileSync('npx', ['astro', 'build', '--silent'], { stdio: 'inherit', env: { ...process.env, MODE, OUT_DIR: dir } });
try {
  build('organism', out);
  build('nerd', join(tmp, 'nerd'));
  if (existsSync(join(out, 'nerd'))) throw new Error('organism build already has a /nerd/ route');
  renameSync(join(tmp, 'nerd'), join(out, 'nerd'));
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
console.log(`[build-all] organism at /, nerd at /nerd/; output in ${out}`);
