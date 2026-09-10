export type RGB = readonly [number, number, number];

export function toCss(c: RGB, a = 1): string {
  const r = Math.round(c[0]);
  const g = Math.round(c[1]);
  const b = Math.round(c[2]);
  if (a >= 0.999) return `rgb(${r} ${g} ${b})`;
  const alpha = Math.round(Math.min(1, Math.max(0, a)) * 1000) / 1000;
  return `rgb(${r} ${g} ${b} / ${alpha})`;
}

export function mix(a: RGB, b: RGB, t: number): RGB {
  const s = t < 0 ? 0 : t > 1 ? 1 : t;
  return [
    a[0] + (b[0] - a[0]) * s,
    a[1] + (b[1] - a[1]) * s,
    a[2] + (b[2] - a[2]) * s,
  ];
}

export function easeOutCubic(t: number): number {
  const x = t < 0 ? 0 : t > 1 ? 1 : t;
  return 1 - (1 - x) ** 3;
}

export function clamp(n: number, min: number, max: number): number {
  return n < min ? min : n > max ? max : n;
}
