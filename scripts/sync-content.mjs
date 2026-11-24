#!/usr/bin/env node
// Pull the knowledge base (an LLM-wiki in a public git repo) into ./content-src at build time,
// and record recent commit history so the site can show "latest developments".
// Env: CONTENT_REPO (default the public research repo), CONTENT_REF (default main),
//      CONTENT_DIR (use an existing local checkout instead of cloning).
import { execFileSync } from 'node:child_process';
import { existsSync, writeFileSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const REPO = process.env.CONTENT_REPO || 'https://github.com/autonomica-xyz/sovereign-agents-research.git';
const REF = process.env.CONTENT_REF || 'main';
const DEST = resolve(process.env.CONTENT_DIR || 'content-src');
const git = (args, cwd = DEST) => execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });

if (process.env.CONTENT_DIR && existsSync(DEST)) {
  console.log(`[content] using local checkout ${DEST}`);
} else if (existsSync(resolve(DEST, '.git'))) {
  try {
    git(['fetch', '--quiet', '--depth', '200', 'origin', REF]);
    git(['reset', '--quiet', '--hard', 'FETCH_HEAD']);
    console.log(`[content] updated ${DEST}`);
  } catch (e) {
    console.warn(`[content] fetch failed, building from the existing checkout: ${e.message.split('\n')[0]}`);
  }
} else {
  if (existsSync(DEST)) rmSync(DEST, { recursive: true, force: true });
  git(['clone', '--quiet', '--depth', '200', '--branch', REF, REPO, DEST], process.cwd());
  console.log(`[content] cloned ${REPO}@${REF}`);
}

// Commit history -> JSON (date, subject, files touched) for the feeds.
const SEP = '\u001e';
const raw = git(['log', '-n', '120', `--pretty=format:${SEP}%H%x09%aI%x09%s`, '--name-only']);
const commits = raw.split(SEP).filter(Boolean).map((block) => {
  const [head, ...files] = block.trim().split('\n');
  const [hash, date, subject] = head.split('\t');
  return { hash: hash.slice(0, 7), date, subject, files: files.filter(Boolean) };
});
const head = git(['rev-parse', '--short', 'HEAD']).trim();
writeFileSync(resolve(DEST, '.site-meta.json'), JSON.stringify({ head, syncedAt: new Date().toISOString(), repo: REPO.replace(/\.git$/, ''), commits }, null, 1));
console.log(`[content] ${commits.length} commits indexed, HEAD ${head}`);
