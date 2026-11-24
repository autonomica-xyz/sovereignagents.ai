// Geometry helpers for the organism illustrations.
export type P = [number, number];
export const f = (n: number) => n.toFixed(1);
/** Smooth closed path through points (Catmull–Rom converted to cubic Béziers). */
export function closed(pts: P[], k = 1): string {
  const n = pts.length; let d = `M${f(pts[0][0])},${f(pts[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    const c1: P = [p1[0] + ((p2[0] - p0[0]) / 6) * k, p1[1] + ((p2[1] - p0[1]) / 6) * k];
    const c2: P = [p2[0] - ((p3[0] - p1[0]) / 6) * k, p2[1] - ((p3[1] - p1[1]) / 6) * k];
    d += ` C${f(c1[0])},${f(c1[1])} ${f(c2[0])},${f(c2[1])} ${f(p2[0])},${f(p2[1])}`;
  }
  return d + 'Z';
}
export const polar = (cx: number, cy: number, r: number, t: number): P => [cx + Math.cos(t) * r, cy + Math.sin(t) * r];
export const deg = (d: number) => (d * Math.PI) / 180;
/** Deterministic wobble radius for organic outlines. */
export const wob = (t: number, seed = 0, a = 0.55) => 1 + a * (0.045 * Math.sin(3 * t + 0.6 + seed) + 0.03 * Math.sin(5 * t + 2.1 + seed * 2) + 0.018 * Math.sin(7 * t + seed * 3));
export const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV'];
