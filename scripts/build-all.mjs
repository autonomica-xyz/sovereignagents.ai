// Builds the three theme variants into OUT_DIR/{a,c,d} and writes the chooser at OUT_DIR/.
// Usage: OUT_DIR=dist node scripts/build-all.mjs
import { execFileSync } from 'node:child_process';
import { cpSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
const out = resolve(process.env.OUT_DIR || 'dist');
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
for (const theme of ['a', 'c', 'd']) {
  execFileSync('npx', ['astro', 'build', '--silent'], { stdio: 'inherit', env: { ...process.env, THEME: theme, OUT_DIR: join(out, theme) } });
  console.log(`[build-all] built /${theme}/`);
}
cpSync('chooser', out, { recursive: true });
if (!existsSync(join(out, 'index.html'))) throw new Error('chooser/index.html missing');
console.log(`[build-all] chooser written; output in ${out}`);
