import { clamp, easeOutCubic, mix, toCss, type RGB } from "./color";
import type { TreeNode } from "./generate";
import { MAX_GEN_DEPTH } from "./generate";
import type { OverlayMode, Palette } from "./palettes";

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  ttl: number;
  size: number;
  rot: number;
  vr: number;
  color: RGB;
  kind: "leaf" | "blossom";
  active: boolean;
}

export interface SimState {
  tree: TreeNode;
  particles: Particle[];
  growth: number;
  time: number;
  gust: number;
  spawnAcc: number;
  stars: { x: number; y: number; r: number; a: number }[];
}

export interface ViewParams {
  angle: number;
  depth: number;
  length: number;
  wind: number;
  overlay: OverlayMode;
  palette: Palette;
  reduced: boolean;
}

const TIPS_CAP = 4096;
const tipsX = new Float32Array(TIPS_CAP);
const tipsY = new Float32Array(TIPS_CAP);
const tipsA = new Float32Array(TIPS_CAP);
let tipCount = 0;

const strokeCache: string[] = new Array(MAX_GEN_DEPTH + 1);

function rebuildStrokeCache(palette: Palette, depth: number): void {
  const last = Math.max(1, depth - 1);
  for (let d = 0; d <= MAX_GEN_DEPTH; d++) {
    const t = Math.min(1, d / last);
    strokeCache[d] = toCss(mix(palette.trunk, palette.twig, t ** 0.72));
  }
}

export function createParticlePool(size = 72): Particle[] {
  return Array.from({ length: size }, () => ({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    life: 0,
    ttl: 1,
    size: 4,
    rot: 0,
    vr: 0,
    color: [0, 0, 0] as RGB,
    kind: "leaf" as const,
    active: false,
  }));
}

export function buildStars(
  seed: number,
  count: number,
): SimState["stars"] {
  const stars: SimState["stars"] = [];
  let s = seed >>> 0;
  const next = () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  for (let i = 0; i < count; i++) {
    stars.push({
      x: next(),
      y: next() * 0.62,
      r: 0.4 + next() * 1.3,
      a: 0.18 + next() * 0.55,
    });
  }
  return stars;
}

function hash(n: number): number {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

function drawBackground(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  palette: Palette,
  stars: SimState["stars"],
  time: number,
): number {
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, toCss(palette.skyTop));
  sky.addColorStop(0.52, toCss(palette.skyMid));
  sky.addColorStop(1, toCss(palette.skyBottom));
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  if (stars.length > 0) {
    for (const star of stars) {
      const twinkle = 0.72 + 0.28 * Math.sin(time * 1.4 + star.x * 12);
      ctx.fillStyle = toCss([236, 238, 242], star.a * twinkle);
      ctx.beginPath();
      ctx.arc(star.x * w, star.y * h, star.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  if (palette.celestialKind !== "none") {
    const isSun = palette.celestialKind === "sun";
    const cx = w * (isSun ? 0.78 : 0.72);
    const cy = h * (isSun ? 0.18 : 0.14);
    const r = Math.min(w, h) * (isSun ? 0.055 : 0.034);
    const glow = ctx.createRadialGradient(cx, cy, r * 0.2, cx, cy, r * 5.5);
    glow.addColorStop(0, toCss(palette.celestialGlow, isSun ? 0.42 : 0.28));
    glow.addColorStop(0.45, toCss(palette.celestialGlow, 0.08));
    glow.addColorStop(1, toCss(palette.celestialGlow, 0));
    ctx.fillStyle = glow;
    ctx.fillRect(cx - r * 6, cy - r * 6, r * 12, r * 12);
    ctx.fillStyle = toCss(palette.celestial);
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const gy = h * 0.865;
  const ground = ctx.createLinearGradient(0, gy - h * 0.06, 0, h);
  ground.addColorStop(0, toCss(palette.groundTop));
  ground.addColorStop(1, toCss(palette.groundBottom));
  ctx.beginPath();
  ctx.moveTo(0, h);
  ctx.lineTo(0, gy);
  ctx.bezierCurveTo(
    w * 0.28,
    gy - h * 0.028,
    w * 0.55,
    gy + h * 0.016,
    w,
    gy - h * 0.012,
  );
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fillStyle = ground;
  ctx.fill();

  return gy;
}

function drawLeaf(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  size: number,
  color: RGB,
  alpha: number,
): void {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = toCss(color, alpha);
  ctx.beginPath();
  ctx.ellipse(0, -size * 0.55, size * 0.42, size, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawBlossom(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  petal: RGB,
  center: RGB,
  alpha: number,
  rot: number,
): void {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  if (size < 3.6) {
    ctx.fillStyle = toCss(petal, alpha);
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.7, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.fillStyle = toCss(petal, alpha);
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      ctx.beginPath();
      ctx.ellipse(
        Math.cos(a) * size * 0.42,
        Math.sin(a) * size * 0.42,
        size * 0.36,
        size * 0.26,
        a,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    }
    ctx.fillStyle = toCss(center, alpha);
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawFoliage(
  ctx: CanvasRenderingContext2D,
  node: TreeNode,
  x: number,
  y: number,
  angle: number,
  size: number,
  overlay: OverlayMode,
  palette: Palette,
  alpha: number,
): void {
  const n = Math.max(1, node.foliage);
  for (let i = 0; i < n; i++) {
    const t = i / n;
    const a = angle + node.foliageSpread + t * Math.PI * 1.4 - 0.7;
    const dist = size * (0.15 + hash(node.phase + i * 3.1) * 0.7);
    const px = x + Math.sin(a) * dist;
    const py = y - Math.cos(a) * dist;
    const s = size * (0.55 + hash(node.hueShift + i) * 0.7);
    if (overlay === "leaves") {
      const col = mix(palette.leafA, palette.leafB, node.hueShift * 0.65 + t * 0.35);
      drawLeaf(ctx, px, py, a + 0.4, s, col, alpha);
    } else {
      const petal = mix(
        palette.blossomA,
        palette.blossomB,
        hash(node.phase + i * 1.7),
      );
      drawBlossom(
        ctx,
        px,
        py,
        s * 0.72,
        petal,
        palette.blossomCenter,
        alpha,
        node.foliageSpread + i,
      );
    }
  }
}

function drawNode(
  ctx: CanvasRenderingContext2D,
  node: TreeNode,
  x: number,
  y: number,
  inAngle: number,
  view: ViewParams,
  growth: number,
  time: number,
  gust: number,
  baseLen: number,
  rootWidth: number,
  leafScale: number,
): void {
  if (node.depth >= view.depth) return;

  const tipWeight = node.depth / Math.max(1, view.depth - 1);
  const sway =
    (view.wind + gust * 0.9) *
    (0.14 + 0.86 * tipWeight) *
    (Math.sin(time * 1.12 + node.phase) * 0.58 +
      Math.sin(time * 0.37 + 1.4) * 0.42) *
    0.3;

  const angle =
    inAngle + node.angleMul * ((view.angle * Math.PI) / 180) + node.jitter + sway;

  const raw = clamp((growth - node.born) / node.span, 0, 1);
  const e = easeOutCubic(raw);
  if (e <= 0) return;

  const len = baseLen * node.length * e;
  const x2 = x + Math.sin(angle) * len;
  const y2 = y - Math.cos(angle) * len;
  const nx = Math.cos(angle);
  const ny = Math.sin(angle);
  const mx = (x + x2) / 2 + nx * node.curve * len * 0.22;
  const my = (y + y2) / 2 + ny * node.curve * len * 0.22;

  ctx.strokeStyle = strokeCache[node.depth] ?? toCss(view.palette.trunk);
  ctx.lineWidth = Math.max(0.65, rootWidth * node.width * (0.35 + 0.65 * e));
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.quadraticCurveTo(mx, my, x2, y2);
  ctx.stroke();

  const canBranch = node.depth + 1 < view.depth && e > 0.42;
  if (canBranch) {
    for (const child of node.children) {
      drawNode(
        ctx,
        child,
        x2,
        y2,
        angle,
        view,
        growth,
        time,
        gust,
        baseLen,
        rootWidth,
        leafScale,
      );
    }
  }

  const isTip =
    node.children.length === 0 || node.depth + 1 >= view.depth || !canBranch;
  if (isTip && e > 0.72) {
    if (tipCount < TIPS_CAP) {
      tipsX[tipCount] = x2;
      tipsY[tipCount] = y2;
      tipsA[tipCount] = angle;
      tipCount += 1;
    }
    if (view.overlay !== "none") {
      const fo = clamp((e - 0.72) / 0.28, 0, 1);
      drawFoliage(
        ctx,
        node,
        x2,
        y2,
        angle,
        leafScale * (3.2 + node.width * 4.5),
        view.overlay,
        view.palette,
        fo,
      );
    }
  }
}

function spawnParticle(
  pool: Particle[],
  overlay: OverlayMode,
  palette: Palette,
  scale: number,
): void {
  if (tipCount === 0 || overlay === "none") return;
  let slot = -1;
  for (let i = 0; i < pool.length; i++) {
    if (!pool[i]!.active) {
      slot = i;
      break;
    }
  }
  if (slot < 0) return;
  const idx = Math.floor(hash(performance.now() * 0.001 + slot) * tipCount) % tipCount;
  const p = pool[slot]!;
  p.active = true;
  p.x = tipsX[idx]!;
  p.y = tipsY[idx]!;
  p.vx = (hash(idx + 2.2) - 0.5) * 18;
  p.vy = 8 + hash(idx + 4.4) * 16;
  p.life = 0;
  p.ttl = 2.4 + hash(idx + 8.1) * 2.2;
  p.size = (3.2 + hash(idx + 1.1) * 3.4) * scale;
  p.rot = hash(idx + 9) * Math.PI * 2;
  p.vr = (hash(idx + 5) - 0.5) * 2.4;
  p.kind = overlay === "blossoms" ? "blossom" : "leaf";
  p.color =
    p.kind === "blossom"
      ? mix(palette.blossomA, palette.blossomB, hash(idx + 7.7))
      : mix(palette.leafA, palette.leafB, hash(idx + 6.6));
}

function stepParticles(
  ctx: CanvasRenderingContext2D,
  pool: Particle[],
  dt: number,
  wind: number,
  gust: number,
  time: number,
  h: number,
): void {
  const gravity = h * 0.045;
  const drift = (wind * 0.7 + gust) * 36 * Math.sin(time * 0.8);
  for (const p of pool) {
    if (!p.active) continue;
    p.life += dt;
    if (p.life >= p.ttl || p.y > h + 20) {
      p.active = false;
      continue;
    }
    p.vx += (drift - p.vx) * dt * 0.45;
    p.vy += gravity * dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.rot += p.vr * dt;
    const fade = 1 - p.life / p.ttl;
    const alpha = fade * fade * 0.9;
    if (p.kind === "blossom") {
      drawBlossom(ctx, p.x, p.y, p.size, p.color, p.color, alpha, p.rot);
    } else {
      drawLeaf(ctx, p.x, p.y, p.rot, p.size * 1.15, p.color, alpha);
    }
  }
}

export function stepAndDraw(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  sim: SimState,
  view: ViewParams,
  dt: number,
): void {
  if (w < 8 || h < 8) return;

  if (!view.reduced) {
    sim.time += dt;
    sim.growth = Math.min(1, sim.growth + dt / 3.6);
    sim.gust = Math.max(0, sim.gust - dt * 1.35);
  } else {
    sim.growth = 1;
    sim.gust = 0;
  }

  rebuildStrokeCache(view.palette, view.depth);

  const gy = drawBackground(ctx, w, h, view.palette, sim.stars, sim.time);
  const baseLen = h * 0.152 * view.length;
  const rootWidth = Math.max(7, h * 0.018);
  const offset = w > 720 ? Math.min(120, (w - 720) * 0.22) : 0;
  const cx = w * 0.5 - offset;
  const baseY = gy + 6;
  const leafScale = Math.min(w, h) / 720;

  ctx.save();
  ctx.fillStyle = toCss(view.palette.shadow, 0.32);
  ctx.beginPath();
  ctx.ellipse(cx, gy + 10, baseLen * 0.62, Math.max(6, h * 0.01), 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  tipCount = 0;
  drawNode(
    ctx,
    sim.tree,
    cx,
    baseY,
    0,
    view,
    sim.growth,
    sim.time,
    sim.gust,
    baseLen,
    rootWidth,
    leafScale,
  );

  if (!view.reduced && view.overlay !== "none" && sim.growth > 0.62) {
    sim.spawnAcc += dt;
    const rate = 0.11 + view.wind * 0.05;
    while (sim.spawnAcc > rate) {
      sim.spawnAcc -= rate;
      spawnParticle(sim.particles, view.overlay, view.palette, leafScale);
    }
  }
  stepParticles(
    ctx,
    sim.particles,
    dt,
    view.wind,
    sim.gust,
    sim.time,
    h,
  );

  const vignette = ctx.createRadialGradient(
    w * 0.5,
    h * 0.42,
    Math.min(w, h) * 0.2,
    w * 0.5,
    h * 0.5,
    Math.max(w, h) * 0.72,
  );
  vignette.addColorStop(0, toCss(view.palette.fog, 0));
  vignette.addColorStop(1, toCss(view.palette.fog, 0.28));
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, w, h);
}
