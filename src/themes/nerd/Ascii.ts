// Helpers for the terminal theme: the ASCII organism, bars and banners.
import org from './organism.txt?raw';
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
export const BANNER = String.raw`███████╗ ██████╗ ██╗   ██╗███████╗██████╗ ███████╗██╗ ██████╗ ███╗   ██╗
██╔════╝██╔═══██╗██║   ██║██╔════╝██╔══██╗██╔════╝██║██╔════╝ ████╗  ██║
███████╗██║   ██║██║   ██║█████╗  ██████╔╝█████╗  ██║██║  ███╗██╔██╗ ██║
╚════██║██║   ██║╚██╗ ██╔╝██╔══╝  ██╔══██╗██╔══╝  ██║██║   ██║██║╚██╗██║
███████║╚██████╔╝ ╚████╔╝ ███████╗██║  ██║███████╗██║╚██████╔╝██║ ╚████║
╚══════╝ ╚═════╝   ╚═══╝  ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝
 █████╗  ██████╗ ███████╗███╗   ██╗████████╗███████╗
██╔══██╗██╔════╝ ██╔════╝████╗  ██║╚══██╔══╝██╔════╝
███████║██║  ███╗█████╗  ██╔██╗ ██║   ██║   ███████╗
██╔══██║██║   ██║██╔══╝  ██║╚██╗██║   ██║   ╚════██║
██║  ██║╚██████╔╝███████╗██║ ╚████║   ██║   ███████║
╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝`;
/** Organism art as HTML; [n] markers link to organ pages (ids in display order). */
export function organismHtml(ids: string[], titles: string[], href: (id: string) => string, highlight?: string) {
  const re = /(\[\d\])|(\[####\])|(~+)|(<>)|(@+)|(\(\(=\|=\|=\|=\)\))|(\*)/g;
  return org.replace(/\s+$/, '').split('\n').map((line) => {
    let out = '', last = 0;
    for (const m of line.matchAll(re)) {
      out += esc(line.slice(last, m.index)); last = m.index! + m[0].length;
      const t = esc(m[0]);
      if (m[1]) { const i = Number(m[0][1]) - 1; out += `<a class="o-mark${ids[i] === highlight ? ' on' : ''}" href="${href(ids[i])}" title="${esc(titles[i])}">${t}</a>`; }
      else out += `<span class="o-${m[2] ? 'host' : m[3] ? 'cil' : m[4] ? 'key' : m[5] ? 'nuc' : m[6] ? 'mito' : 'imm'}">${t}</span>`;
    }
    return out + esc(line.slice(last));
  }).join('\n');
}
export const bar = (v: number, max: number, w = 12) => { const n = Math.round((v / max) * w); return '█'.repeat(n) + '░'.repeat(w - n); };
export const pad = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1) + '…' : s + ' '.repeat(n - s.length));
