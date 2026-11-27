// Shared vocabulary and helpers. One place for labels so pages never drift.
import { getCollection, type CollectionEntry } from 'astro:content';

export const AXES = ['privacy', 'custody', 'funding', 'continuity', 'independence'] as const;
export type Axis = (typeof AXES)[number];
export const AXIS_LABEL: Record<Axis, string> = { privacy: 'Privacy', custody: 'Custody', funding: 'Funding', continuity: 'Continuity', independence: 'Independence' };
export const AXIS_Q: Record<Axis, string> = {
  privacy: 'Can the host or operator read its mind, keys and memory?',
  custody: 'Who can move its money and sign as it?',
  funding: 'Does it earn what it spends?',
  continuity: 'Does it survive losing a body?',
  independence: 'Can any single provider, platform or developer stop or steer it?',
};
export const SCORE_LABEL = ['None', 'Weak', 'Partial', 'Strong'];
export const LEVELS = [
  { n: 0, name: 'Operated bot', short: 'The operator controls everything.' },
  { n: 1, name: 'Wallet-holding agent', short: 'Has a wallet; a human or host holds or can read the keys.' },
  { n: 2, name: 'Enclaved agent', short: 'The host cannot read its keys; one party can still stop or upgrade it.' },
  { n: 3, name: 'Quorum agent', short: 'No single machine or person can stop, seize or rewrite it.' },
  { n: 4, name: 'Self-sustaining organism', short: 'Across vendors and markets; earns its rent; buys its own hosts.' },
  { n: 5, name: 'Sovereign organism', short: 'No one can read, stop, steer or seize it; it chooses its successor.' },
];
export const MATURITY = ['research', 'experimental', 'early', 'production'] as const;
export const MATURITY_LABEL: Record<string, string> = { research: 'Research', experimental: 'Experimental', early: 'Early deployment', production: 'Production' };
export const STATUS_LABEL: Record<string, string> = { active: 'Active', dormant: 'Dormant', dead: 'Ended', unknown: 'Unknown' };
export const KIND_LABEL: Record<string, string> = { organism: 'Organism', attack: 'Attack', infrastructure: 'Infrastructure', research: 'Research', market: 'Market' };

export const url = {
  organ: (id: string) => `/blueprint/anatomy/${id}/`,
  tech: (id: string) => `/technology/${id}/`,
  specimen: (id: string) => `/ecosystem/tracker/${id}/`,
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export function fmtDate(d: Date | string, long = false): string {
  if (typeof d === 'string') {
    const [y, m, day] = d.split('-').map(Number);
    const mon = (long ? MONTHS_LONG : MONTHS)[m - 1];
    return day ? `${day} ${mon} ${y}` : `${mon} ${y}`;
  }
  return `${d.getUTCDate()} ${(long ? MONTHS_LONG : MONTHS)[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}
export function fmtSince(s: string) { return /^\d{4}-\d{2}$/.test(s) ? fmtDate(s) : s; }
export const iso = (d: Date) => d.toISOString().slice(0, 10);
export const total = (r: CollectionEntry<'specimens'>['data']['ratings']) => AXES.reduce((a, k) => a + r[k].score, 0);

export async function load() {
  const by = <T extends { data: { order: number } }>(a: T, b: T) => a.data.order - b.data.order;
  const organs = (await getCollection('organs')).sort(by);
  const technologies = (await getCollection('technologies')).sort(by);
  const specimens = (await getCollection('specimens')).sort((a, b) => b.data.level - a.data.level || total(b.data.ratings) - total(a.data.ratings) || a.data.name.localeCompare(b.data.name));
  const developments = (await getCollection('developments')).sort((a, b) => b.data.date.localeCompare(a.data.date));
  const builders = (await getCollection('builders')).sort((a, b) => a.data.name.localeCompare(b.data.name));
  const organ = Object.fromEntries(organs.map((o) => [o.id, o]));
  const tech = Object.fromEntries(technologies.map((t) => [t.id, t]));
  const spec = Object.fromEntries(specimens.map((s) => [s.id, s]));
  return { organs, technologies, specimens, developments, builders, organ, tech, spec };
}
