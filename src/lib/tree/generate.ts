export const DEPTH_MIN = 5;
export const DEPTH_MAX = 11;
export const MAX_GEN_DEPTH = 11;

export interface TreeNode {
  angleMul: number;
  jitter: number;
  length: number;
  width: number;
  curve: number;
  phase: number;
  depth: number;
  born: number;
  span: number;
  children: TreeNode[];
  foliage: number;
  foliageSpread: number;
  hueShift: number;
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function branchCount(rng: () => number, depth: number): number {
  if (depth === 0) return 2;
  if (depth >= 8) return rng() < 0.58 ? 2 : 1;
  const r = rng();
  if (r < 0.1) return 1;
  if (r < 0.84) return 2;
  return 3;
}

function makeNode(
  rng: () => number,
  depth: number,
  length: number,
  width: number,
  angleMul: number,
): TreeNode {
  return {
    angleMul,
    jitter: (rng() - 0.5) * (depth === 0 ? 0.08 : 0.24),
    length,
    width,
    curve: (rng() - 0.5) * 0.38,
    phase: rng() * Math.PI * 2,
    depth,
    born: depth * 0.07,
    span: depth === 0 ? 0.18 : 0.13,
    children: [],
    foliage: 3 + Math.floor(rng() * 5),
    foliageSpread: rng() * Math.PI * 2,
    hueShift: rng(),
  };
}

function grow(node: TreeNode, rng: () => number, budget: { n: number }): void {
  if (node.depth >= MAX_GEN_DEPTH || budget.n > 4200) {
    node.foliage = 4 + Math.floor(rng() * 5);
    return;
  }

  const count = branchCount(rng, node.depth);
  const signs: number[] =
    count === 1
      ? [rng() < 0.5 ? -0.22 : 0.22]
      : count === 2
        ? [-1, 1]
        : [-1.18, (rng() < 0.5 ? -1 : 1) * 0.08, 1.18];

  const bias = 0.92 + rng() * 0.16;

  for (let i = 0; i < count; i++) {
    const sign = signs[i]!;
    const isLeader = Math.abs(sign) < 0.3;
    const sideBias = i === 0 ? bias : 2 - bias;
    const child = makeNode(
      rng,
      node.depth + 1,
      node.length * (0.64 + rng() * 0.15) * (isLeader ? 0.88 : 1) * (0.88 + sideBias * 0.12),
      node.width * (0.6 + rng() * 0.1),
      sign * (0.7 + rng() * 0.52),
    );
    node.children.push(child);
    budget.n += 1;
    grow(child, rng, budget);
  }

  if (node.depth >= MAX_GEN_DEPTH - 2 && rng() < 0.35) {
    node.foliage = 1 + Math.floor(rng() * 3);
  }
}

export function generateTree(seed: number): TreeNode {
  const rng = mulberry32(seed);
  const root = makeNode(rng, 0, 1, 1, 0);
  grow(root, rng, { n: 1 });
  if (root.children.length === 0) {
    root.foliage = 6;
  }
  return root;
}

export function newSeed(): number {
  return (Math.random() * 0xffffffff) >>> 0;
}
