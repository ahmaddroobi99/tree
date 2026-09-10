import { useEffect, useRef } from "react";
import { generateTree } from "@/lib/tree/generate";
import { getPalette } from "@/lib/tree/palettes";
import {
  buildStars,
  createParticlePool,
  stepAndDraw,
  type SimState,
  type ViewParams,
} from "@/lib/tree/render";
import { useTreeStore } from "@/lib/tree/store";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function TreeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const seed = useTreeStore((s) => s.seed);
  const angle = useTreeStore((s) => s.angle);
  const depth = useTreeStore((s) => s.depth);
  const length = useTreeStore((s) => s.length);
  const wind = useTreeStore((s) => s.wind);
  const overlay = useTreeStore((s) => s.overlay);
  const paletteId = useTreeStore((s) => s.paletteId);

  const viewRef = useRef<ViewParams>({
    angle,
    depth,
    length,
    wind,
    overlay,
    palette: getPalette(paletteId),
    reduced: false,
  });
  viewRef.current = {
    angle,
    depth,
    length,
    wind,
    overlay,
    palette: getPalette(paletteId),
    reduced: prefersReducedMotion(),
  };

  const simRef = useRef<SimState | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = prefersReducedMotion();
    simRef.current = {
      tree: generateTree(seed),
      particles: createParticlePool(),
      growth: reduced ? 1 : 0,
      time: 0,
      gust: reduced ? 0 : 0.8,
      spawnAcc: 0,
      stars: buildStars(seed, getPalette(useTreeStore.getState().paletteId).stars),
    };

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => {
      const sim = simRef.current;
      if (!sim) return;
      viewRef.current.reduced = media.matches;
      if (media.matches) {
        sim.growth = 1;
        sim.gust = 0;
      }
    };
    media.addEventListener("change", onMotion);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let last = performance.now();
    let cssW = 0;
    let cssH = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      const nextW = parent?.clientWidth ?? window.innerWidth;
      const nextH = parent?.clientHeight ?? window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cssW = nextW;
      cssH = nextH;
      canvas.width = Math.max(1, Math.floor(nextW * dpr));
      canvas.height = Math.max(1, Math.floor(nextH * dpr));
      canvas.style.width = `${nextW}px`;
      canvas.style.height = `${nextH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement ?? canvas);

    const frame = (now: number) => {
      const sim = simRef.current;
      if (!sim) return;
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      viewRef.current.palette = getPalette(useTreeStore.getState().paletteId);
      const wantStars = viewRef.current.palette.stars;
      if (sim.stars.length !== wantStars) {
        sim.stars = buildStars(useTreeStore.getState().seed, wantStars);
      }
      stepAndDraw(ctx, cssW, cssH, sim, viewRef.current, dt);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const gust = () => {
      const sim = simRef.current;
      if (sim && !viewRef.current.reduced) sim.gust = Math.min(1.2, sim.gust + 0.85);
    };
    canvas.addEventListener("pointerdown", gust);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      media.removeEventListener("change", onMotion);
      canvas.removeEventListener("pointerdown", gust);
    };
  }, [seed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 size-full touch-none"
      role="img"
      aria-label="Living fractal tree"
    />
  );
}
