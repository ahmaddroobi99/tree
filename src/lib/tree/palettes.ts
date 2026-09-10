import type { RGB } from "./color";

export type OverlayMode = "none" | "leaves" | "blossoms";

export type CelestialKind = "moon" | "sun" | "none";

export interface Palette {
  id: string;
  name: string;
  skyTop: RGB;
  skyMid: RGB;
  skyBottom: RGB;
  groundTop: RGB;
  groundBottom: RGB;
  trunk: RGB;
  twig: RGB;
  leafA: RGB;
  leafB: RGB;
  blossomA: RGB;
  blossomB: RGB;
  blossomCenter: RGB;
  celestial: RGB;
  celestialGlow: RGB;
  celestialKind: CelestialKind;
  fog: RGB;
  shadow: RGB;
  stars: number;
  swatch: RGB;
}

export const PALETTES: Palette[] = [
  {
    id: "dusk",
    name: "Dusk grove",
    skyTop: [16, 26, 34],
    skyMid: [34, 46, 50],
    skyBottom: [64, 54, 42],
    groundTop: [44, 38, 30],
    groundBottom: [22, 20, 16],
    trunk: [54, 38, 28],
    twig: [92, 68, 46],
    leafA: [102, 128, 78],
    leafB: [62, 96, 64],
    blossomA: [232, 214, 196],
    blossomB: [214, 176, 168],
    blossomCenter: [196, 140, 90],
    celestial: [236, 230, 214],
    celestialGlow: [186, 176, 148],
    celestialKind: "moon",
    fog: [12, 14, 16],
    shadow: [8, 8, 6],
    stars: 42,
    swatch: [102, 128, 78],
  },
  {
    id: "sakura",
    name: "Sakura",
    skyTop: [236, 220, 216],
    skyMid: [244, 230, 222],
    skyBottom: [232, 208, 198],
    groundTop: [176, 140, 120],
    groundBottom: [118, 88, 74],
    trunk: [74, 50, 40],
    twig: [112, 78, 62],
    leafA: [150, 176, 108],
    leafB: [108, 140, 86],
    blossomA: [242, 176, 186],
    blossomB: [255, 216, 220],
    blossomCenter: [228, 128, 140],
    celestial: [255, 236, 214],
    celestialGlow: [255, 214, 180],
    celestialKind: "sun",
    fog: [92, 60, 50],
    shadow: [70, 42, 34],
    stars: 0,
    swatch: [242, 176, 186],
  },
  {
    id: "harvest",
    name: "Harvest",
    skyTop: [228, 164, 104],
    skyMid: [204, 118, 70],
    skyBottom: [156, 78, 48],
    groundTop: [96, 54, 32],
    groundBottom: [48, 28, 18],
    trunk: [60, 36, 24],
    twig: [102, 60, 32],
    leafA: [198, 92, 42],
    leafB: [168, 52, 30],
    blossomA: [255, 232, 204],
    blossomB: [236, 196, 140],
    blossomCenter: [196, 120, 48],
    celestial: [255, 220, 160],
    celestialGlow: [255, 180, 96],
    celestialKind: "sun",
    fog: [80, 36, 20],
    shadow: [20, 10, 6],
    stars: 0,
    swatch: [198, 92, 42],
  },
  {
    id: "frost",
    name: "Frost",
    skyTop: [164, 184, 196],
    skyMid: [196, 210, 216],
    skyBottom: [220, 226, 228],
    groundTop: [176, 186, 190],
    groundBottom: [132, 144, 150],
    trunk: [90, 96, 102],
    twig: [138, 148, 156],
    leafA: [188, 210, 202],
    leafB: [160, 184, 186],
    blossomA: [244, 250, 255],
    blossomB: [214, 226, 236],
    blossomCenter: [186, 198, 210],
    celestial: [255, 255, 255],
    celestialGlow: [210, 224, 236],
    celestialKind: "sun",
    fog: [150, 162, 172],
    shadow: [96, 108, 116],
    stars: 0,
    swatch: [188, 210, 202],
  },
  {
    id: "ink",
    name: "Ink",
    skyTop: [242, 234, 218],
    skyMid: [236, 226, 206],
    skyBottom: [224, 212, 190],
    groundTop: [198, 184, 160],
    groundBottom: [166, 150, 126],
    trunk: [28, 26, 24],
    twig: [52, 46, 40],
    leafA: [44, 52, 38],
    leafB: [32, 36, 30],
    blossomA: [168, 42, 36],
    blossomB: [196, 78, 64],
    blossomCenter: [120, 24, 20],
    celestial: [242, 234, 218],
    celestialGlow: [242, 234, 218],
    celestialKind: "none",
    fog: [92, 78, 54],
    shadow: [72, 60, 42],
    stars: 0,
    swatch: [28, 26, 24],
  },
  {
    id: "nocturne",
    name: "Nocturne",
    skyTop: [8, 10, 16],
    skyMid: [12, 16, 28],
    skyBottom: [16, 18, 24],
    groundTop: [16, 18, 22],
    groundBottom: [8, 8, 10],
    trunk: [40, 44, 52],
    twig: [128, 140, 154],
    leafA: [176, 194, 200],
    leafB: [118, 148, 158],
    blossomA: [222, 228, 238],
    blossomB: [176, 188, 210],
    blossomCenter: [255, 236, 196],
    celestial: [232, 234, 242],
    celestialGlow: [160, 176, 210],
    celestialKind: "moon",
    fog: [0, 0, 0],
    shadow: [0, 0, 0],
    stars: 86,
    swatch: [176, 194, 200],
  },
];

export const PALETTE_BY_ID: Record<string, Palette> = Object.fromEntries(
  PALETTES.map((p) => [p.id, p]),
);

export function getPalette(id: string): Palette {
  return PALETTE_BY_ID[id] ?? PALETTES[0]!;
}
