// Static search index for the client-side search overlay.
import { getCollection } from 'astro:content';
import { load, url } from '../lib/site';

const plain = (md = '') => md
  .replace(/^\[\^[^\]]+\]:.*$/gm, '')
  .replace(/\[\^[^\]]+\]/g, '')
  .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
  .replace(/<https?:[^>]+>/g, '')
  .replace(/[#*_`>|]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

export async function GET() {
  const { organs, technologies, specimens, developments, builders } = await load();
  const pages = await getCollection('pages');
  const pageUrl: Record<string, string> = { framework: '/blueprint/framework/', 'build-path': '/blueprint/build-path/', methodology: '/ecosystem/methodology/', about: '/about/' };
  const docs = [
    ...organs.map((o) => ({ id: `o:${o.id}`, u: url.organ(o.id), t: o.data.title, cl: 'Organ', s: o.data.role, x: [o.data.threat, o.data.unsolved, ...o.data.must, ...o.data.options.map((p) => `${p.name} ${p.note}`), plain(o.body)].join(' ') })),
    ...technologies.map((t) => ({ id: `t:${t.id}`, u: url.tech(t.id), t: t.data.title, cl: 'Technology', s: t.data.summary, x: [t.data.verdict, ...t.data.components.map((c) => `${c.name} ${c.what}`), plain(t.body)].join(' ') })),
    ...specimens.map((s) => ({ id: `s:${s.id}`, u: url.specimen(s.id), t: s.data.name, cl: `Tracker · L${s.data.level}`, s: s.data.summary, x: [s.data.by, s.data.levelNote, s.data.lesson, plain(s.body)].join(' ') })),
    ...developments.map((d) => ({ id: `d:${d.id}`, u: `/ecosystem/developments/#${d.id}`, t: d.data.title, cl: `Development · ${d.data.date.slice(0, 4)}`, s: d.data.summary, x: '' })),
    ...builders.map((b) => ({ id: `b:${b.id}`, u: `/ecosystem/builders/#${b.id}`, t: b.data.name, cl: 'Builder', s: b.data.builds, x: '' })),
    ...pages.filter((p) => pageUrl[p.id]).map((p) => ({ id: `p:${p.id}`, u: pageUrl[p.id], t: p.data.title, cl: 'Page', s: p.data.summary, x: plain(p.body) })),
  ];
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  for (const d of docs) d.u = base + d.u;
  return new Response(JSON.stringify(docs), { headers: { 'Content-Type': 'application/json' } });
}
