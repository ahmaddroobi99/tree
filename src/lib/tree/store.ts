import { z } from "zod";
import { create } from "zustand";
import { DEPTH_MAX, DEPTH_MIN, newSeed } from "./generate";
import type { OverlayMode } from "./palettes";
import { PALETTE_BY_ID } from "./palettes";

const STORAGE_KEY = "sylva-settings-v1";

const savedSchema = z.object({
  angle: z.number().min(8).max(42),
  depth: z.number().int().min(DEPTH_MIN).max(DEPTH_MAX),
  length: z.number().min(0.6).max(1.45),
  wind: z.number().min(0).max(1),
  overlay: z.enum(["none", "leaves", "blossoms"]),
  paletteId: z.string(),
});

export type SavedSettings = z.infer<typeof savedSchema>;

interface TreeState {
  seed: number;
  angle: number;
  depth: number;
  length: number;
  wind: number;
  overlay: OverlayMode;
  paletteId: string;
  setAngle: (angle: number) => void;
  setDepth: (depth: number) => void;
  setLength: (length: number) => void;
  setWind: (wind: number) => void;
  setOverlay: (overlay: OverlayMode) => void;
  setPaletteId: (paletteId: string) => void;
  regenerate: () => void;
  hydrate: (partial: Partial<SavedSettings>) => void;
}

export const useTreeStore = create<TreeState>((set) => ({
  seed: newSeed(),
  angle: 23,
  depth: 9,
  length: 1,
  wind: 0.42,
  overlay: "leaves",
  paletteId: "dusk",
  setAngle: (angle) => set({ angle }),
  setDepth: (depth) => set({ depth }),
  setLength: (length) => set({ length }),
  setWind: (wind) => set({ wind }),
  setOverlay: (overlay) => set({ overlay }),
  setPaletteId: (paletteId) =>
    set({ paletteId: PALETTE_BY_ID[paletteId] ? paletteId : "dusk" }),
  regenerate: () => set({ seed: newSeed() }),
  hydrate: (partial) =>
    set((state) => ({
      angle: partial.angle ?? state.angle,
      depth: partial.depth ?? state.depth,
      length: partial.length ?? state.length,
      wind: partial.wind ?? state.wind,
      overlay: partial.overlay ?? state.overlay,
      paletteId: partial.paletteId && PALETTE_BY_ID[partial.paletteId]
        ? partial.paletteId
        : state.paletteId,
    })),
}));

export function persistTreeSettings(): () => void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = savedSchema.partial().safeParse(JSON.parse(raw));
      if (parsed.success) useTreeStore.getState().hydrate(parsed.data);
    }
  } catch {
    // Ignore malformed storage.
  }

  return useTreeStore.subscribe((state) => {
    const saved: SavedSettings = {
      angle: state.angle,
      depth: state.depth,
      length: state.length,
      wind: state.wind,
      overlay: state.overlay,
      paletteId: state.paletteId,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    } catch {
      // Quota or private mode.
    }
  });
}
