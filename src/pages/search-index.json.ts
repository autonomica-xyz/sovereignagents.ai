import { wiki, catLabel } from '../lib/wiki';
export const GET = () => {
  const docs = wiki().articles.map((a) => ({ id: a.slug, t: a.title, c: a.category, cl: catLabel(a.category), s: a.summary.slice(0, 260), h: a.headings.map((h) => h.text).join(' · '), x: a.text.slice(0, 1400) }));
  return new Response(JSON.stringify(docs), { headers: { 'content-type': 'application/json' } });
};
