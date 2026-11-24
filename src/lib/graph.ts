// Precompute a force-directed layout of the wiki link graph at build time (deterministic, no client simulation needed).
import { forceSimulation, forceLink, forceManyBody, forceCenter, forceCollide, forceX, forceY } from 'd3-force';
import { wiki } from './wiki';

let cached: any = null;
export function graph() {
  if (cached) return cached;
  const { articles } = wiki();
  const arts = articles.filter((a) => a.kind !== 'meta');
  const ids = new Set(arts.map((a) => a.slug));
  // deterministic seeded initial positions
  let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const cats = [...new Set(arts.map((a) => a.category))];
  const nodes: any[] = arts.map((a) => {
    const ci = cats.indexOf(a.category), ang = (ci / cats.length) * Math.PI * 2;
    return { id: a.slug, t: a.title, c: a.category, k: a.kind, d: a.backlinks.length + a.links.length, x: Math.cos(ang) * 300 + rnd() * 60, y: Math.sin(ang) * 300 + rnd() * 60 };
  });
  const links: any[] = [];
  const seen = new Set<string>();
  for (const a of arts) for (const l of a.links) if (ids.has(l)) { const k = [a.slug, l].sort().join('|'); if (!seen.has(k)) { seen.add(k); links.push({ source: a.slug, target: l }); } }
  const sim = forceSimulation(nodes)
    .force('link', forceLink(links).id((d: any) => d.id).distance(38).strength(0.25))
    .force('charge', forceManyBody().strength(-70).distanceMax(500))
    .force('collide', forceCollide().radius((d: any) => 4 + Math.sqrt(d.d) * 1.6))
    .force('center', forceCenter(0, 0))
    .force('x', forceX(0).strength(0.04)).force('y', forceY(0).strength(0.04))
    .stop();
  for (let i = 0; i < 400; i++) sim.tick();
  cached = {
    nodes: nodes.map((n) => ({ id: n.id, t: n.t, c: n.c, k: n.k, d: n.d, x: Math.round(n.x * 10) / 10, y: Math.round(n.y * 10) / 10 })),
    links: links.map((l) => [l.source.id ?? l.source, l.target.id ?? l.target]),
  };
  return cached;
}
