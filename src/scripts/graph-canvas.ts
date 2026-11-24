// Canvas renderer for the precomputed wiki graph: pan, zoom, hover, select, filter, ego-network mode.
export type GNode = { id: string; t: string; c: string; k: string; d: number; x: number; y: number };
export type GData = { nodes: GNode[]; links: [string, string][] };
export interface GraphOpts { colors: Record<string, string>; focus?: string; ego?: boolean; onSelect?: (n: GNode | null) => void; onHover?: (n: GNode | null, x: number, y: number) => void; labelAll?: boolean; padding?: number }

export function mountGraph(canvas: HTMLCanvasElement, data: GData, o: GraphOpts) {
  const ctx = canvas.getContext('2d')!;
  let nodes = data.nodes, links = data.links;
  if (o.ego && o.focus) {
    const nb = new Set([o.focus]);
    for (const [a, b] of links) { if (a === o.focus) nb.add(b); if (b === o.focus) nb.add(a); }
    nodes = nodes.filter((n) => nb.has(n.id));
    links = links.filter(([a, b]) => nb.has(a) && nb.has(b));
    // radial re-layout around the focus
    const f = nodes.find((n) => n.id === o.focus)!; const others = nodes.filter((n) => n !== f);
    nodes = [{ ...f, x: 0, y: 0 }, ...others.map((n, i) => { const a = (i / others.length) * Math.PI * 2; const r = 110 + (i % 3) * 38; return { ...n, x: Math.cos(a) * r, y: Math.sin(a) * r }; })];
  }
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const adj = new Map<string, Set<string>>();
  for (const [a, b] of links) { (adj.get(a) ?? adj.set(a, new Set()).get(a)!).add(b); (adj.get(b) ?? adj.set(b, new Set()).get(b)!).add(a); }
  const hidden = new Set<string>();
  let hover: GNode | null = null, selected: GNode | null = o.focus && !o.ego ? byId.get(o.focus) ?? null : null;
  let W = 0, H = 0, dpr = 1, k = 1, tx = 0, ty = 0, t0 = performance.now();
  const rad = (n: GNode) => 2.2 + Math.sqrt(n.d) * (o.ego ? 1.6 : 1.05);

  function fit() {
    const r = canvas.getBoundingClientRect(); W = r.width; H = r.height; dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr; canvas.height = H * dpr;
    const xs = nodes.map((n) => n.x), ys = nodes.map((n) => n.y);
    const bw = Math.max(...xs) - Math.min(...xs) || 1, bh = Math.max(...ys) - Math.min(...ys) || 1;
    const pad = o.padding ?? 40;
    k = Math.min((W - pad * 2) / bw, (H - pad * 2) / bh);
    tx = W / 2 - ((Math.max(...xs) + Math.min(...xs)) / 2) * k; ty = H / 2 - ((Math.max(...ys) + Math.min(...ys)) / 2) * k;
  }
  const sx = (n: GNode) => n.x * k + tx, sy = (n: GNode) => n.y * k + ty;
  function draw() {
    const now = performance.now(); const pulse = (Math.sin((now - t0) / 600) + 1) / 2;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
    const act = hover || selected; const nb = act ? adj.get(act.id) ?? new Set() : null;
    ctx.lineWidth = 1;
    for (const [a, b] of links) {
      const A = byId.get(a)!, Bn = byId.get(b)!; if (hidden.has(A.c) || hidden.has(Bn.c)) continue;
      const on = act && (a === act.id || b === act.id);
      ctx.strokeStyle = on ? hexA(o.colors[act!.c] || '#fff', .75) : act ? 'rgba(140,160,200,.04)' : 'rgba(140,160,220,.11)';
      ctx.beginPath(); ctx.moveTo(sx(A), sy(A)); ctx.lineTo(sx(Bn), sy(Bn)); ctx.stroke();
    }
    for (const n of nodes) {
      if (hidden.has(n.c)) continue;
      const dim = act && n !== act && !nb!.has(n.id);
      const col = o.colors[n.c] || '#fff'; const r = rad(n) * Math.max(.7, Math.min(k, 2.2));
      ctx.globalAlpha = dim ? .14 : 1;
      if (!dim && (n === act || (!o.ego && n.d > 25))) { ctx.fillStyle = hexA(col, .12 + (n === act ? .2 * pulse : 0)); ctx.beginPath(); ctx.arc(sx(n), sy(n), r * 3, 0, 7); ctx.fill(); }
      ctx.fillStyle = col; ctx.beginPath(); ctx.arc(sx(n), sy(n), r, 0, 7); ctx.fill();
      if (n.k === 'hub') { ctx.strokeStyle = col; ctx.beginPath(); ctx.arc(sx(n), sy(n), r + 3, 0, 7); ctx.stroke(); }
    }
    ctx.globalAlpha = 1;
    ctx.font = '500 11px "JetBrains Mono Variable", monospace'; ctx.textBaseline = 'middle';
    for (const n of nodes) {
      if (hidden.has(n.c)) continue;
      const show = n === act || (nb && nb.has(n.id) && (k > .9 || nodes.length < 60)) || (!act && (o.labelAll || n.d > 34 / Math.max(k, .6) || k > 2.3));
      if (!show) continue;
      const label = n.t.length > 34 ? n.t.slice(0, 32) + '…' : n.t;
      const x = sx(n) + rad(n) * Math.max(.7, Math.min(k, 2.2)) + 5, y = sy(n);
      ctx.fillStyle = 'rgba(5,7,13,.75)'; const w = ctx.measureText(label).width; ctx.fillRect(x - 2, y - 8, w + 4, 16);
      ctx.fillStyle = n === act ? '#fff' : 'rgba(225,232,255,.86)'; ctx.fillText(label, x, y);
    }
    requestAnimationFrame(draw);
  }
  function pick(px: number, py: number) {
    let best: GNode | null = null, bd = 18 * 18;
    for (const n of nodes) { if (hidden.has(n.c)) continue; const dx = sx(n) - px, dy = sy(n) - py, d = dx * dx + dy * dy; if (d < bd) { bd = d; best = n; } }
    return best;
  }
  let drag: { x: number; y: number; tx: number; ty: number; moved: boolean } | null = null;
  const pts = new Map<number, { x: number; y: number }>(); let pinch0 = 0, k0 = 1;
  canvas.addEventListener('pointerdown', (e) => { canvas.setPointerCapture(e.pointerId); pts.set(e.pointerId, { x: e.offsetX, y: e.offsetY }); drag = { x: e.offsetX, y: e.offsetY, tx, ty, moved: false }; if (pts.size === 2) { const [a, b] = [...pts.values()]; pinch0 = Math.hypot(a.x - b.x, a.y - b.y); k0 = k; } });
  canvas.addEventListener('pointermove', (e) => {
    if (pts.has(e.pointerId)) pts.set(e.pointerId, { x: e.offsetX, y: e.offsetY });
    if (pts.size === 2) { const [a, b] = [...pts.values()]; const d = Math.hypot(a.x - b.x, a.y - b.y); zoomAt((a.x + b.x) / 2, (a.y + b.y) / 2, (k0 * d / pinch0) / k); return; }
    if (drag) { const dx = e.offsetX - drag.x, dy = e.offsetY - drag.y; if (Math.abs(dx) + Math.abs(dy) > 4) drag.moved = true; if (drag.moved) { tx = drag.tx + dx; ty = drag.ty + dy; } return; }
    const h = pick(e.offsetX, e.offsetY); if (h !== hover) { hover = h; canvas.style.cursor = h ? 'pointer' : 'grab'; o.onHover?.(h, e.offsetX, e.offsetY); }
  });
  canvas.addEventListener('pointerup', (e) => { pts.delete(e.pointerId); if (drag && !drag.moved) { const p = pick(e.offsetX, e.offsetY); selected = p; o.onSelect?.(p); } drag = null; });
  canvas.addEventListener('pointerleave', () => { hover = null; o.onHover?.(null, 0, 0); });
  function zoomAt(px: number, py: number, f: number) { const nk = Math.max(.25, Math.min(8, k * f)); f = nk / k; tx = px - (px - tx) * f; ty = py - (py - ty) * f; k = nk; }
  canvas.addEventListener('wheel', (e) => { e.preventDefault(); zoomAt(e.offsetX, e.offsetY, Math.exp(-e.deltaY * .0015)); }, { passive: false });
  new ResizeObserver(() => fit()).observe(canvas);
  fit(); requestAnimationFrame(draw);
  return {
    toggle(cat: string, on: boolean) { on ? hidden.delete(cat) : hidden.add(cat); },
    select(id: string | null) { selected = id ? byId.get(id) ?? null : null; if (selected) { tx = W / 2 - selected.x * k; ty = H / 2 - selected.y * k; } o.onSelect?.(selected); },
    zoom(f: number) { zoomAt(W / 2, H / 2, f); },
    reset() { fit(); selected = null; o.onSelect?.(null); },
  };
}
function hexA(hex: string, a: number) { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; }
