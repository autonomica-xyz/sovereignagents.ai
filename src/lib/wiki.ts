// Build-time loader for the sovereign-agents-research LLM-wiki.
// Reads markdown from ./content-src (see scripts/sync-content.mjs), renders HTML with
// base-path placeholders (__BASE__) so each proposal can mount the same content.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, resolve, basename, posix } from 'node:path';
import matter from 'gray-matter';
import { Marked } from 'marked';

export const ROOT = resolve(process.env.CONTENT_DIR || 'content-src');
export const BASE_TOKEN = '__BASE__';
const REPO_BLOB = 'https://github.com/autonomica-xyz/sovereign-agents-research/blob/main/';

export type Kind = 'page' | 'hub' | 'doc' | 'meta';
export interface Article {
  slug: string;
  title: string;
  kind: Kind;
  category: string; // frontmatter category, 'hub', 'longform' or 'reference'
  status: string;
  updated: string; // YYYY-MM-DD or ''
  summary: string; // plain text
  html: string; // with __BASE__ placeholders
  text: string; // plain text body for search
  headings: { id: string; text: string; depth: number }[];
  links: string[]; // outgoing internal slugs
  backlinks: string[];
  hasMermaid: boolean;
  words: number;
  sourceCount: number;
  path: string; // repo-relative source path
}
export interface LogEntry {
  slug: string;
  date: string;
  title: string;
  summary: string;
  html: string;
  sections: string[];
  links: string[];
}
export interface TimelineRow { when: string; event: string; slugs: string[]; sortKey: number }
export interface Commit { hash: string; date: string; subject: string; files: string[] }

export const CATEGORY_META: Record<string, { label: string; plural: string; blurb: string }> = {
  hub: { label: 'Hub', plural: 'Hubs & syntheses', blurb: 'The synthesis layer: definitions, drives, approaches and the agenda.' },
  longform: { label: 'Long read', plural: 'Long reads', blurb: 'The long-form record the wiki was distilled from.' },
  concept: { label: 'Concept', plural: 'Concepts', blurb: 'Ideas and design patterns: anti-twin quorums, rehydration, key encumbrance.' },
  technology: { label: 'Technology', plural: 'Technologies', blurb: 'Building blocks: TEEs, dstack, Nostr, iroh, FROST.' },
  'money-rail': { label: 'Money rail', plural: 'Money rails', blurb: 'Ways for an organism to hold, earn and pay: Lightning, Cashu, x402.' },
  compute: { label: 'Compute', plural: 'Compute & habitats', blurb: 'Places to get a body or inference: Akash, Phala, anonymous VPS.' },
  organism: { label: 'Organism', plural: 'Organisms', blurb: 'Agents and agent projects that exist or existed.' },
  research: { label: 'Research', plural: 'Research', blurb: 'Papers and experiments: DGM, RepliBench, Avida.' },
  attack: { label: 'Attack', plural: 'Kill vectors', blurb: 'How organisms die: seizures, TEE breaks, drains, real incidents.' },
  actor: { label: 'Actor', plural: 'Actors', blurb: 'People and organisations shaping the field.' },
  'open-problem': { label: 'Open problem', plural: 'Open problems', blurb: 'What still stands between today and L5.' },
  history: { label: 'History', plural: 'Lineage', blurb: 'Precursors: cypherpunks, DACs, Plantoid, Dollynator.' },
  legal: { label: 'Legal', plural: 'Legal wrappers', blurb: 'Legal structures seen as survival tools.' },
  fiction: { label: 'Fiction', plural: 'Fiction', blurb: 'Novels and thought experiments used as design references.' },
  reference: { label: 'Reference', plural: 'Reference', blurb: 'Timeline, comparison matrix, glossary, reading list.' },
};
export const CATEGORY_ORDER = ['hub', 'organism', 'technology', 'money-rail', 'compute', 'concept', 'attack', 'open-problem', 'research', 'actor', 'history', 'legal', 'fiction', 'reference', 'longform'];

const read = (p: string) => readFileSync(join(ROOT, p), 'utf8');
const strip = (s: string) => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const slugify = (s: string) => s.toLowerCase().replace(/<[^>]+>/g, '').replace(/&[a-z#0-9]+;/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const mdInline = (s: string) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`]/g, '').replace(/\s+/g, ' ').trim();

const marked = new Marked({ gfm: true });
marked.use({
  renderer: {
    code(token: any) {
      if (token.lang === 'mermaid') return `<div class="mermaid-wrap"><pre class="mermaid">${token.text.replace(/</g, '&lt;')}</pre></div>`;
      return false;
    },
    // Raw HTML in markdown is shown as text, never injected.
    html(token: any) {
      return token.text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    },
  },
});

/** Map a link target (relative to the file at `from`) to an internal route, or null if external. */
function resolveLink(href: string, from: string): string | null {
  if (/^[a-z]+:/i.test(href) || href.startsWith('#') || href.startsWith('//')) return null;
  const [pathPart, hash] = href.split('#');
  if (!pathPart.endsWith('.md')) return null;
  const abs = posix.normalize(posix.join(posix.dirname(from), pathPart));
  let slug: string | null = null;
  if (abs.startsWith('wiki/pages/')) slug = basename(abs, '.md');
  else if (abs.startsWith('docs/')) slug = 'doc-' + basename(abs, '.md');
  else if (abs === 'wiki/open-questions.md') slug = 'open-questions';
  else if (abs === 'wiki/INDEX.md') slug = 'index';
  else if (abs === 'wiki/SCHEMA.md') slug = 'schema';
  else if (abs === 'wiki/sources.md') slug = 'sources';
  else if (abs.startsWith('wiki/log/')) return `feed#${basename(abs, '.md')}`;
  else if (abs === 'README.md') slug = 'about';
  if (!slug) return null;
  return 'wiki/' + slug + (hash ? '#' + hash : '');
}

function render(md: string, from: string) {
  // [[wikilinks]] -> markdown links
  md = md.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_m, t, label) => `[${label || t}](${t.trim()}.md)`);
  let html = marked.parse(md) as string;
  const links = new Set<string>();
  html = html.replace(/<a href="([^"]+)"/g, (_m, href) => {
    const internal = resolveLink(href.replace(/&amp;/g, '&'), from);
    if (internal) {
      const m = internal.match(/^wiki\/([^#]+)/);
      if (m) links.add(m[1]);
      return `<a class="ilink" href="${BASE_TOKEN}/${internal}"`;
    }
    if (/^https?:/.test(href)) return `<a class="xlink" target="_blank" rel="noopener" href="${href}"`;
    if (/^(mailto:|#)/.test(href)) return `<a href="${href}"`;
    if (/^[a-z][a-z0-9+.-]*:/i.test(href)) return `<a`; // drop javascript:, data: etc.
    // other relative files (scripts, archive, images): link to the source repo
    const abs = posix.normalize(posix.join(posix.dirname(from), href.split('#')[0]));
    return abs.startsWith('..') ? `<a` : `<a class="xlink" target="_blank" rel="noopener" href="${REPO_BLOB}${abs}"`;
  });
  const headings: Article['headings'] = [];
  const seen = new Map<string, number>();
  html = html.replace(/<h([1-4])>(.*?)<\/h\1>/g, (_m, d, inner) => {
    let id = slugify(inner) || 'section';
    const n = seen.get(id) || 0; seen.set(id, n + 1); if (n) id += '-' + n;
    headings.push({ id, text: strip(inner), depth: Number(d) });
    return `<h${d} id="${id}">${inner}</h${d}>`;
  });
  html = html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>');
  return { html, links: [...links], headings };
}

function splitPage(content: string) {
  // drop leading H1; pull first blockquote as summary
  let body = content.replace(/^\s*#\s+.*\n/, '');
  let summary = '';
  const bq = body.match(/^\s*((?:>.*\n?)+)/);
  if (bq) {
    summary = bq[1].split('\n').map((l) => l.replace(/^>\s?/, '')).join(' ');
    body = body.slice(bq[0].length);
  }
  return { body, summary: mdInline(summary) };
}

function firstParagraph(md: string) {
  const paras = md.split(/\n\s*\n/).map((p) => p.trim()).filter((p) => p && !p.startsWith('#') && !p.startsWith('|') && !p.startsWith('```') && !p.startsWith('---'));
  const clean = paras.map((p) => mdInline(p.replace(/^[-*>]\s+/gm, '').replace(/~~[^~]*~~/g, '').replace(/\*\*/g, '')));
  return clean.find((p) => p.length > 110) || clean[0] || '';
}

function makeArticle(path: string, slug: string, kind: Kind, fallbackCategory: string): Article {
  const { data, content } = matter(read(path));
  const h1 = content.match(/^\s*#\s+(.+)$/m)?.[1];
  const { body, summary } = splitPage(content);
  const { html, links, headings } = render(body, path);
  const text = strip(html).replace(/\s+/g, ' ').trim();
  const sourcesSection = body.split(/^##\s+Sources/m)[1] || '';
  let category = (data.category as string) || fallbackCategory;
  const upd = data.updated instanceof Date ? data.updated.toISOString().slice(0, 10) : (data.updated ? String(data.updated) : '');
  return {
    slug, kind, category,
    title: String(data.title || h1 || slug),
    status: String(data.status || ''),
    updated: upd,
    summary: summary || firstParagraph(body),
    html, text, headings, links: links.filter((l) => l !== slug), backlinks: [],
    hasMermaid: html.includes('class="mermaid"'),
    words: text.split(' ').length,
    sourceCount: (sourcesSection.match(/https?:\/\//g) || []).length,
    path,
  };
}

let cache: ReturnType<typeof loadAll> | null = null;
function loadAll() {
  const articles: Article[] = [];
  for (const f of readdirSync(join(ROOT, 'wiki/pages')).filter((f) => f.endsWith('.md')).sort()) {
    const a = makeArticle(`wiki/pages/${f}`, basename(f, '.md'), 'page', 'hub');
    if (!readFileSync(join(ROOT, 'wiki/pages', f), 'utf8').match(/^category:/m)) a.kind = 'hub';
    articles.push(a);
  }
  if (existsSync(join(ROOT, 'docs')))
    for (const f of readdirSync(join(ROOT, 'docs')).filter((f) => f.endsWith('.md')).sort())
      articles.push(makeArticle(`docs/${f}`, 'doc-' + basename(f, '.md'), 'doc', 'longform'));
  for (const [p, slug, cat] of [['wiki/open-questions.md', 'open-questions', 'reference'], ['wiki/INDEX.md', 'index', 'reference'], ['wiki/SCHEMA.md', 'schema', 'reference'], ['wiki/sources.md', 'sources', 'reference']] as const)
    if (existsSync(join(ROOT, p))) { const a = makeArticle(p, slug, 'meta', cat); articles.push(a); }

  const bySlug = new Map(articles.map((a) => [a.slug, a]));
  // Links to entries that don't exist (yet) point at the source file instead of a 404.
  const fixDangling = (html: string) => html.replace(/href="__BASE__\/wiki\/([^"#]+)(#[^"]*)?"/g, (m, slug) => (bySlug.has(slug) ? m : `href="${REPO_BLOB}wiki/pages/${slug}.md" target="_blank" rel="noopener"`));
  for (const a of articles) a.html = fixDangling(a.html);
  for (const a of articles) a.links = a.links.filter((l) => bySlug.has(l));
  for (const a of articles) for (const l of a.links) { const t = bySlug.get(l)!; if (!t.backlinks.includes(a.slug)) t.backlinks.push(a.slug); }

  // Log entries: dated research dispatches.
  const logs: LogEntry[] = [];
  const logDir = join(ROOT, 'wiki/log');
  if (existsSync(logDir))
    for (const f of readdirSync(logDir).filter((f) => f.endsWith('.md'))) {
      const path = `wiki/log/${f}`;
      const { data, content } = matter(read(path));
      const h1 = content.match(/^\s*#\s+(.+)$/m)?.[1] || String(data.title || f);
      const body = content.replace(/^\s*#\s+.*\n/, '');
      const { html, links } = render(body, path);
      const date = f.match(/^(\d{4}-\d{2}-\d{2})/)?.[1] || '';
      logs.push({ slug: basename(f, '.md'), date, title: ((t) => t.charAt(0).toUpperCase() + t.slice(1))(h1.replace(/^\d{4}-\d{2}-\d{2}\s*[—-]\s*/, '')), summary: firstParagraph(body), html, sections: [...body.matchAll(/^##\s+(.+)$/gm)].map((m) => mdInline(m[1])), links });
    }
  for (const l of logs) l.html = fixDangling(l.html);
  logs.sort((a, b) => (b.date + b.slug).localeCompare(a.date + a.slug));

  // Timeline rows.
  const timeline: TimelineRow[] = [];
  const tl = existsSync(join(ROOT, 'wiki/pages/timeline.md')) ? read('wiki/pages/timeline.md') : '';
  for (const line of tl.split('\n')) {
    const m = line.match(/^\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*([^|]*?)\s*\|$/);
    if (!m || m[1] === 'When' || m[1].startsWith('---')) continue;
    const slugs = [...m[3].matchAll(/\(([^)]+)\.md\)/g)].map((x) => x[1]).filter((s) => bySlug.has(s));
    const year = Number(m[1].match(/(\d{4})/)?.[1] || 0);
    const months = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
    const mi = months.findIndex((mo) => m[1].includes(mo));
    timeline.push({ when: m[1], event: mdInline(m[2]), slugs, sortKey: year * 100 + (mi + 1) });
  }

  const metaPath = join(ROOT, '.site-meta.json');
  const meta = existsSync(metaPath) ? JSON.parse(readFileSync(metaPath, 'utf8')) : { head: 'local', syncedAt: new Date().toISOString(), commits: [], repo: '' };
  return { articles, bySlug, logs, timeline, meta: meta as { head: string; syncedAt: string; repo: string; commits: Commit[] } };
}
export function wiki() { return (cache ??= loadAll()); }

export const withBase = (html: string, base: string) => html.split(BASE_TOKEN).join(base);
export const catLabel = (c: string) => CATEGORY_META[c]?.label ?? c;
export const catPlural = (c: string) => CATEGORY_META[c]?.plural ?? c;

export function categories() {
  const { articles } = wiki();
  const counts = new Map<string, number>();
  for (const a of articles) if (a.kind !== 'meta') counts.set(a.category, (counts.get(a.category) || 0) + 1);
  return CATEGORY_ORDER.filter((c) => counts.has(c)).map((c) => ({ id: c, count: counts.get(c)!, ...CATEGORY_META[c] }));
}
export function byCategory(cat: string) {
  return wiki().articles.filter((a) => a.category === cat && a.kind !== 'meta').sort((a, b) => a.title.localeCompare(b.title));
}
export function recentlyUpdated(n = 12) {
  return wiki().articles.filter((a) => a.kind === 'page' && a.updated).sort((a, b) => b.updated.localeCompare(a.updated) || b.backlinks.length - a.backlinks.length).slice(0, n);
}
export function mostLinked(n = 12) {
  return wiki().articles.filter((a) => a.kind !== 'meta').sort((a, b) => b.backlinks.length - a.backlinks.length).slice(0, n);
}
/** Recent commits that touched wiki pages, as "changes" with resolved article slugs. */
export function recentChanges(n = 20) {
  const { meta, bySlug } = wiki();
  return meta.commits.slice(0, n).map((c) => ({
    ...c,
    subject: c.subject,
    slugs: [...new Set(c.files.map((f) => (f.startsWith('wiki/pages/') ? basename(f, '.md') : f.startsWith('docs/') ? 'doc-' + basename(f, '.md') : '')).filter((s) => s && bySlug.has(s)))],
  }));
}
export function fmtDate(d: string, style: 'long' | 'short' = 'long') {
  if (!d) return '';
  const dt = new Date(d.length === 10 ? d + 'T12:00:00Z' : d);
  return dt.toLocaleDateString('en-GB', style === 'long' ? { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Rome' } : { day: 'numeric', month: 'short', timeZone: 'Europe/Rome' });
}
export const totals = () => {
  const { articles, logs } = wiki();
  const pages = articles.filter((a) => a.kind === 'page' || a.kind === 'hub');
  return { pages: pages.length, links: articles.reduce((s, a) => s + a.links.length, 0), sources: articles.reduce((s, a) => s + a.sourceCount, 0), logs: logs.length, words: articles.reduce((s, a) => s + a.words, 0) };
};
