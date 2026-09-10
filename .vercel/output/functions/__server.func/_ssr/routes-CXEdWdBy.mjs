import { i as __toESM } from "../_runtime.mjs";
import { n as Slot, o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as GitBranch, i as Leaf, n as SlidersHorizontal, o as Flower2, r as RefreshCw } from "../_libs/lucide-react.mjs";
import { a as string, i as object, r as number, t as _enum } from "../_libs/zod.mjs";
import { t as Drawer } from "../_libs/vaul.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/@radix-ui/react-slider+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CXEdWdBy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function mulberry32(seed) {
	let a = seed >>> 0;
	return () => {
		a |= 0;
		a = a + 1831565813 | 0;
		let t = Math.imul(a ^ a >>> 15, 1 | a);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function branchCount(rng, depth) {
	if (depth === 0) return 2;
	if (depth >= 8) return rng() < .58 ? 2 : 1;
	const r = rng();
	if (r < .1) return 1;
	if (r < .84) return 2;
	return 3;
}
function makeNode(rng, depth, length, width, angleMul) {
	return {
		angleMul,
		jitter: (rng() - .5) * (depth === 0 ? .08 : .24),
		length,
		width,
		curve: (rng() - .5) * .38,
		phase: rng() * Math.PI * 2,
		depth,
		born: depth * .07,
		span: depth === 0 ? .18 : .13,
		children: [],
		foliage: 3 + Math.floor(rng() * 5),
		foliageSpread: rng() * Math.PI * 2,
		hueShift: rng()
	};
}
function grow(node, rng, budget) {
	if (node.depth >= 11 || budget.n > 4200) {
		node.foliage = 4 + Math.floor(rng() * 5);
		return;
	}
	const count = branchCount(rng, node.depth);
	const signs = count === 1 ? [rng() < .5 ? -.22 : .22] : count === 2 ? [-1, 1] : [
		-1.18,
		(rng() < .5 ? -1 : 1) * .08,
		1.18
	];
	const bias = .92 + rng() * .16;
	for (let i = 0; i < count; i++) {
		const sign = signs[i];
		const isLeader = Math.abs(sign) < .3;
		const sideBias = i === 0 ? bias : 2 - bias;
		const child = makeNode(rng, node.depth + 1, node.length * (.64 + rng() * .15) * (isLeader ? .88 : 1) * (.88 + sideBias * .12), node.width * (.6 + rng() * .1), sign * (.7 + rng() * .52));
		node.children.push(child);
		budget.n += 1;
		grow(child, rng, budget);
	}
	if (node.depth >= 9 && rng() < .35) node.foliage = 1 + Math.floor(rng() * 3);
}
function generateTree(seed) {
	const rng = mulberry32(seed);
	const root = makeNode(rng, 0, 1, 1, 0);
	grow(root, rng, { n: 1 });
	if (root.children.length === 0) root.foliage = 6;
	return root;
}
function newSeed() {
	return Math.random() * 4294967295 >>> 0;
}
var PALETTES = [
	{
		id: "dusk",
		name: "Dusk grove",
		skyTop: [
			16,
			26,
			34
		],
		skyMid: [
			34,
			46,
			50
		],
		skyBottom: [
			64,
			54,
			42
		],
		groundTop: [
			44,
			38,
			30
		],
		groundBottom: [
			22,
			20,
			16
		],
		trunk: [
			54,
			38,
			28
		],
		twig: [
			92,
			68,
			46
		],
		leafA: [
			102,
			128,
			78
		],
		leafB: [
			62,
			96,
			64
		],
		blossomA: [
			232,
			214,
			196
		],
		blossomB: [
			214,
			176,
			168
		],
		blossomCenter: [
			196,
			140,
			90
		],
		celestial: [
			236,
			230,
			214
		],
		celestialGlow: [
			186,
			176,
			148
		],
		celestialKind: "moon",
		fog: [
			12,
			14,
			16
		],
		shadow: [
			8,
			8,
			6
		],
		stars: 42,
		swatch: [
			102,
			128,
			78
		]
	},
	{
		id: "sakura",
		name: "Sakura",
		skyTop: [
			236,
			220,
			216
		],
		skyMid: [
			244,
			230,
			222
		],
		skyBottom: [
			232,
			208,
			198
		],
		groundTop: [
			176,
			140,
			120
		],
		groundBottom: [
			118,
			88,
			74
		],
		trunk: [
			74,
			50,
			40
		],
		twig: [
			112,
			78,
			62
		],
		leafA: [
			150,
			176,
			108
		],
		leafB: [
			108,
			140,
			86
		],
		blossomA: [
			242,
			176,
			186
		],
		blossomB: [
			255,
			216,
			220
		],
		blossomCenter: [
			228,
			128,
			140
		],
		celestial: [
			255,
			236,
			214
		],
		celestialGlow: [
			255,
			214,
			180
		],
		celestialKind: "sun",
		fog: [
			92,
			60,
			50
		],
		shadow: [
			70,
			42,
			34
		],
		stars: 0,
		swatch: [
			242,
			176,
			186
		]
	},
	{
		id: "harvest",
		name: "Harvest",
		skyTop: [
			228,
			164,
			104
		],
		skyMid: [
			204,
			118,
			70
		],
		skyBottom: [
			156,
			78,
			48
		],
		groundTop: [
			96,
			54,
			32
		],
		groundBottom: [
			48,
			28,
			18
		],
		trunk: [
			60,
			36,
			24
		],
		twig: [
			102,
			60,
			32
		],
		leafA: [
			198,
			92,
			42
		],
		leafB: [
			168,
			52,
			30
		],
		blossomA: [
			255,
			232,
			204
		],
		blossomB: [
			236,
			196,
			140
		],
		blossomCenter: [
			196,
			120,
			48
		],
		celestial: [
			255,
			220,
			160
		],
		celestialGlow: [
			255,
			180,
			96
		],
		celestialKind: "sun",
		fog: [
			80,
			36,
			20
		],
		shadow: [
			20,
			10,
			6
		],
		stars: 0,
		swatch: [
			198,
			92,
			42
		]
	},
	{
		id: "frost",
		name: "Frost",
		skyTop: [
			164,
			184,
			196
		],
		skyMid: [
			196,
			210,
			216
		],
		skyBottom: [
			220,
			226,
			228
		],
		groundTop: [
			176,
			186,
			190
		],
		groundBottom: [
			132,
			144,
			150
		],
		trunk: [
			90,
			96,
			102
		],
		twig: [
			138,
			148,
			156
		],
		leafA: [
			188,
			210,
			202
		],
		leafB: [
			160,
			184,
			186
		],
		blossomA: [
			244,
			250,
			255
		],
		blossomB: [
			214,
			226,
			236
		],
		blossomCenter: [
			186,
			198,
			210
		],
		celestial: [
			255,
			255,
			255
		],
		celestialGlow: [
			210,
			224,
			236
		],
		celestialKind: "sun",
		fog: [
			150,
			162,
			172
		],
		shadow: [
			96,
			108,
			116
		],
		stars: 0,
		swatch: [
			188,
			210,
			202
		]
	},
	{
		id: "ink",
		name: "Ink",
		skyTop: [
			242,
			234,
			218
		],
		skyMid: [
			236,
			226,
			206
		],
		skyBottom: [
			224,
			212,
			190
		],
		groundTop: [
			198,
			184,
			160
		],
		groundBottom: [
			166,
			150,
			126
		],
		trunk: [
			28,
			26,
			24
		],
		twig: [
			52,
			46,
			40
		],
		leafA: [
			44,
			52,
			38
		],
		leafB: [
			32,
			36,
			30
		],
		blossomA: [
			168,
			42,
			36
		],
		blossomB: [
			196,
			78,
			64
		],
		blossomCenter: [
			120,
			24,
			20
		],
		celestial: [
			242,
			234,
			218
		],
		celestialGlow: [
			242,
			234,
			218
		],
		celestialKind: "none",
		fog: [
			92,
			78,
			54
		],
		shadow: [
			72,
			60,
			42
		],
		stars: 0,
		swatch: [
			28,
			26,
			24
		]
	},
	{
		id: "nocturne",
		name: "Nocturne",
		skyTop: [
			8,
			10,
			16
		],
		skyMid: [
			12,
			16,
			28
		],
		skyBottom: [
			16,
			18,
			24
		],
		groundTop: [
			16,
			18,
			22
		],
		groundBottom: [
			8,
			8,
			10
		],
		trunk: [
			40,
			44,
			52
		],
		twig: [
			128,
			140,
			154
		],
		leafA: [
			176,
			194,
			200
		],
		leafB: [
			118,
			148,
			158
		],
		blossomA: [
			222,
			228,
			238
		],
		blossomB: [
			176,
			188,
			210
		],
		blossomCenter: [
			255,
			236,
			196
		],
		celestial: [
			232,
			234,
			242
		],
		celestialGlow: [
			160,
			176,
			210
		],
		celestialKind: "moon",
		fog: [
			0,
			0,
			0
		],
		shadow: [
			0,
			0,
			0
		],
		stars: 86,
		swatch: [
			176,
			194,
			200
		]
	}
];
var PALETTE_BY_ID = Object.fromEntries(PALETTES.map((p) => [p.id, p]));
function getPalette(id) {
	return PALETTE_BY_ID[id] ?? PALETTES[0];
}
function toCss(c, a = 1) {
	const r = Math.round(c[0]);
	const g = Math.round(c[1]);
	const b = Math.round(c[2]);
	if (a >= .999) return `rgb(${r} ${g} ${b})`;
	return `rgb(${r} ${g} ${b} / ${Math.round(Math.min(1, Math.max(0, a)) * 1e3) / 1e3})`;
}
function mix(a, b, t) {
	const s = t < 0 ? 0 : t > 1 ? 1 : t;
	return [
		a[0] + (b[0] - a[0]) * s,
		a[1] + (b[1] - a[1]) * s,
		a[2] + (b[2] - a[2]) * s
	];
}
function easeOutCubic(t) {
	return 1 - (1 - (t < 0 ? 0 : t > 1 ? 1 : t)) ** 3;
}
function clamp(n, min, max) {
	return n < min ? min : n > max ? max : n;
}
var TIPS_CAP = 4096;
var tipsX = new Float32Array(TIPS_CAP);
var tipsY = new Float32Array(TIPS_CAP);
var tipsA = new Float32Array(TIPS_CAP);
var tipCount = 0;
var strokeCache = new Array(12);
function rebuildStrokeCache(palette, depth) {
	const last = Math.max(1, depth - 1);
	for (let d = 0; d <= 11; d++) {
		const t = Math.min(1, d / last);
		strokeCache[d] = toCss(mix(palette.trunk, palette.twig, t ** .72));
	}
}
function createParticlePool(size = 72) {
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
		color: [
			0,
			0,
			0
		],
		kind: "leaf",
		active: false
	}));
}
function buildStars(seed, count) {
	const stars = [];
	let s = seed >>> 0;
	const next = () => {
		s = s + 1831565813 | 0;
		let t = Math.imul(s ^ s >>> 15, 1 | s);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
	for (let i = 0; i < count; i++) stars.push({
		x: next(),
		y: next() * .62,
		r: .4 + next() * 1.3,
		a: .18 + next() * .55
	});
	return stars;
}
function hash(n) {
	const x = Math.sin(n * 127.1) * 43758.5453;
	return x - Math.floor(x);
}
function drawBackground(ctx, w, h, palette, stars, time) {
	const sky = ctx.createLinearGradient(0, 0, 0, h);
	sky.addColorStop(0, toCss(palette.skyTop));
	sky.addColorStop(.52, toCss(palette.skyMid));
	sky.addColorStop(1, toCss(palette.skyBottom));
	ctx.fillStyle = sky;
	ctx.fillRect(0, 0, w, h);
	if (stars.length > 0) for (const star of stars) {
		const twinkle = .72 + .28 * Math.sin(time * 1.4 + star.x * 12);
		ctx.fillStyle = toCss([
			236,
			238,
			242
		], star.a * twinkle);
		ctx.beginPath();
		ctx.arc(star.x * w, star.y * h, star.r, 0, Math.PI * 2);
		ctx.fill();
	}
	if (palette.celestialKind !== "none") {
		const isSun = palette.celestialKind === "sun";
		const cx = w * (isSun ? .78 : .72);
		const cy = h * (isSun ? .18 : .14);
		const r = Math.min(w, h) * (isSun ? .055 : .034);
		const glow = ctx.createRadialGradient(cx, cy, r * .2, cx, cy, r * 5.5);
		glow.addColorStop(0, toCss(palette.celestialGlow, isSun ? .42 : .28));
		glow.addColorStop(.45, toCss(palette.celestialGlow, .08));
		glow.addColorStop(1, toCss(palette.celestialGlow, 0));
		ctx.fillStyle = glow;
		ctx.fillRect(cx - r * 6, cy - r * 6, r * 12, r * 12);
		ctx.fillStyle = toCss(palette.celestial);
		ctx.beginPath();
		ctx.arc(cx, cy, r, 0, Math.PI * 2);
		ctx.fill();
	}
	const gy = h * .865;
	const ground = ctx.createLinearGradient(0, gy - h * .06, 0, h);
	ground.addColorStop(0, toCss(palette.groundTop));
	ground.addColorStop(1, toCss(palette.groundBottom));
	ctx.beginPath();
	ctx.moveTo(0, h);
	ctx.lineTo(0, gy);
	ctx.bezierCurveTo(w * .28, gy - h * .028, w * .55, gy + h * .016, w, gy - h * .012);
	ctx.lineTo(w, h);
	ctx.closePath();
	ctx.fillStyle = ground;
	ctx.fill();
	return gy;
}
function drawLeaf(ctx, x, y, angle, size, color, alpha) {
	ctx.save();
	ctx.translate(x, y);
	ctx.rotate(angle);
	ctx.fillStyle = toCss(color, alpha);
	ctx.beginPath();
	ctx.ellipse(0, -size * .55, size * .42, size, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.restore();
}
function drawBlossom(ctx, x, y, size, petal, center, alpha, rot) {
	ctx.save();
	ctx.translate(x, y);
	ctx.rotate(rot);
	if (size < 3.6) {
		ctx.fillStyle = toCss(petal, alpha);
		ctx.beginPath();
		ctx.arc(0, 0, size * .7, 0, Math.PI * 2);
		ctx.fill();
	} else {
		ctx.fillStyle = toCss(petal, alpha);
		for (let i = 0; i < 5; i++) {
			const a = i / 5 * Math.PI * 2;
			ctx.beginPath();
			ctx.ellipse(Math.cos(a) * size * .42, Math.sin(a) * size * .42, size * .36, size * .26, a, 0, Math.PI * 2);
			ctx.fill();
		}
		ctx.fillStyle = toCss(center, alpha);
		ctx.beginPath();
		ctx.arc(0, 0, size * .2, 0, Math.PI * 2);
		ctx.fill();
	}
	ctx.restore();
}
function drawFoliage(ctx, node, x, y, angle, size, overlay, palette, alpha) {
	const n = Math.max(1, node.foliage);
	for (let i = 0; i < n; i++) {
		const t = i / n;
		const a = angle + node.foliageSpread + t * Math.PI * 1.4 - .7;
		const dist = size * (.15 + hash(node.phase + i * 3.1) * .7);
		const px = x + Math.sin(a) * dist;
		const py = y - Math.cos(a) * dist;
		const s = size * (.55 + hash(node.hueShift + i) * .7);
		if (overlay === "leaves") {
			const col = mix(palette.leafA, palette.leafB, node.hueShift * .65 + t * .35);
			drawLeaf(ctx, px, py, a + .4, s, col, alpha);
		} else {
			const petal = mix(palette.blossomA, palette.blossomB, hash(node.phase + i * 1.7));
			drawBlossom(ctx, px, py, s * .72, petal, palette.blossomCenter, alpha, node.foliageSpread + i);
		}
	}
}
function drawNode(ctx, node, x, y, inAngle, view, growth, time, gust, baseLen, rootWidth, leafScale) {
	if (node.depth >= view.depth) return;
	const tipWeight = node.depth / Math.max(1, view.depth - 1);
	const sway = (view.wind + gust * .9) * (.14 + .86 * tipWeight) * (Math.sin(time * 1.12 + node.phase) * .58 + Math.sin(time * .37 + 1.4) * .42) * .3;
	const angle = inAngle + node.angleMul * (view.angle * Math.PI / 180) + node.jitter + sway;
	const e = easeOutCubic(clamp((growth - node.born) / node.span, 0, 1));
	if (e <= 0) return;
	const len = baseLen * node.length * e;
	const x2 = x + Math.sin(angle) * len;
	const y2 = y - Math.cos(angle) * len;
	const nx = Math.cos(angle);
	const ny = Math.sin(angle);
	const mx = (x + x2) / 2 + nx * node.curve * len * .22;
	const my = (y + y2) / 2 + ny * node.curve * len * .22;
	ctx.strokeStyle = strokeCache[node.depth] ?? toCss(view.palette.trunk);
	ctx.lineWidth = Math.max(.65, rootWidth * node.width * (.35 + .65 * e));
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.quadraticCurveTo(mx, my, x2, y2);
	ctx.stroke();
	const canBranch = node.depth + 1 < view.depth && e > .42;
	if (canBranch) for (const child of node.children) drawNode(ctx, child, x2, y2, angle, view, growth, time, gust, baseLen, rootWidth, leafScale);
	if ((node.children.length === 0 || node.depth + 1 >= view.depth || !canBranch) && e > .72) {
		if (tipCount < TIPS_CAP) {
			tipsX[tipCount] = x2;
			tipsY[tipCount] = y2;
			tipsA[tipCount] = angle;
			tipCount += 1;
		}
		if (view.overlay !== "none") {
			const fo = clamp((e - .72) / .28, 0, 1);
			drawFoliage(ctx, node, x2, y2, angle, leafScale * (3.2 + node.width * 4.5), view.overlay, view.palette, fo);
		}
	}
}
function spawnParticle(pool, overlay, palette, scale) {
	if (tipCount === 0 || overlay === "none") return;
	let slot = -1;
	for (let i = 0; i < pool.length; i++) if (!pool[i].active) {
		slot = i;
		break;
	}
	if (slot < 0) return;
	const idx = Math.floor(hash(performance.now() * .001 + slot) * tipCount) % tipCount;
	const p = pool[slot];
	p.active = true;
	p.x = tipsX[idx];
	p.y = tipsY[idx];
	p.vx = (hash(idx + 2.2) - .5) * 18;
	p.vy = 8 + hash(idx + 4.4) * 16;
	p.life = 0;
	p.ttl = 2.4 + hash(idx + 8.1) * 2.2;
	p.size = (3.2 + hash(idx + 1.1) * 3.4) * scale;
	p.rot = hash(idx + 9) * Math.PI * 2;
	p.vr = (hash(idx + 5) - .5) * 2.4;
	p.kind = overlay === "blossoms" ? "blossom" : "leaf";
	p.color = p.kind === "blossom" ? mix(palette.blossomA, palette.blossomB, hash(idx + 7.7)) : mix(palette.leafA, palette.leafB, hash(idx + 6.6));
}
function stepParticles(ctx, pool, dt, wind, gust, time, h) {
	const gravity = h * .045;
	const drift = (wind * .7 + gust) * 36 * Math.sin(time * .8);
	for (const p of pool) {
		if (!p.active) continue;
		p.life += dt;
		if (p.life >= p.ttl || p.y > h + 20) {
			p.active = false;
			continue;
		}
		p.vx += (drift - p.vx) * dt * .45;
		p.vy += gravity * dt;
		p.x += p.vx * dt;
		p.y += p.vy * dt;
		p.rot += p.vr * dt;
		const fade = 1 - p.life / p.ttl;
		const alpha = fade * fade * .9;
		if (p.kind === "blossom") drawBlossom(ctx, p.x, p.y, p.size, p.color, p.color, alpha, p.rot);
		else drawLeaf(ctx, p.x, p.y, p.rot, p.size * 1.15, p.color, alpha);
	}
}
function stepAndDraw(ctx, w, h, sim, view, dt) {
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
	const baseLen = h * .152 * view.length;
	const rootWidth = Math.max(7, h * .018);
	const offset = w > 720 ? Math.min(120, (w - 720) * .22) : 0;
	const cx = w * .5 - offset;
	const baseY = gy + 6;
	const leafScale = Math.min(w, h) / 720;
	ctx.save();
	ctx.fillStyle = toCss(view.palette.shadow, .32);
	ctx.beginPath();
	ctx.ellipse(cx, gy + 10, baseLen * .62, Math.max(6, h * .01), 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.restore();
	ctx.lineCap = "round";
	ctx.lineJoin = "round";
	tipCount = 0;
	drawNode(ctx, sim.tree, cx, baseY, 0, view, sim.growth, sim.time, sim.gust, baseLen, rootWidth, leafScale);
	if (!view.reduced && view.overlay !== "none" && sim.growth > .62) {
		sim.spawnAcc += dt;
		const rate = .11 + view.wind * .05;
		while (sim.spawnAcc > rate) {
			sim.spawnAcc -= rate;
			spawnParticle(sim.particles, view.overlay, view.palette, leafScale);
		}
	}
	stepParticles(ctx, sim.particles, dt, view.wind, sim.gust, sim.time, h);
	const vignette = ctx.createRadialGradient(w * .5, h * .42, Math.min(w, h) * .2, w * .5, h * .5, Math.max(w, h) * .72);
	vignette.addColorStop(0, toCss(view.palette.fog, 0));
	vignette.addColorStop(1, toCss(view.palette.fog, .28));
	ctx.fillStyle = vignette;
	ctx.fillRect(0, 0, w, h);
}
var STORAGE_KEY = "sylva-settings-v1";
var savedSchema = object({
	angle: number().min(8).max(42),
	depth: number().int().min(5).max(11),
	length: number().min(.6).max(1.45),
	wind: number().min(0).max(1),
	overlay: _enum([
		"none",
		"leaves",
		"blossoms"
	]),
	paletteId: string()
});
var useTreeStore = create((set) => ({
	seed: newSeed(),
	angle: 23,
	depth: 9,
	length: 1,
	wind: .42,
	overlay: "leaves",
	paletteId: "dusk",
	setAngle: (angle) => set({ angle }),
	setDepth: (depth) => set({ depth }),
	setLength: (length) => set({ length }),
	setWind: (wind) => set({ wind }),
	setOverlay: (overlay) => set({ overlay }),
	setPaletteId: (paletteId) => set({ paletteId: PALETTE_BY_ID[paletteId] ? paletteId : "dusk" }),
	regenerate: () => set({ seed: newSeed() }),
	hydrate: (partial) => set((state) => ({
		angle: partial.angle ?? state.angle,
		depth: partial.depth ?? state.depth,
		length: partial.length ?? state.length,
		wind: partial.wind ?? state.wind,
		overlay: partial.overlay ?? state.overlay,
		paletteId: partial.paletteId && PALETTE_BY_ID[partial.paletteId] ? partial.paletteId : state.paletteId
	}))
}));
function persistTreeSettings() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (raw) {
			const parsed = savedSchema.partial().safeParse(JSON.parse(raw));
			if (parsed.success) useTreeStore.getState().hydrate(parsed.data);
		}
	} catch {}
	return useTreeStore.subscribe((state) => {
		const saved = {
			angle: state.angle,
			depth: state.depth,
			length: state.length,
			wind: state.wind,
			overlay: state.overlay,
			paletteId: state.paletteId
		};
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
		} catch {}
	});
}
function prefersReducedMotion() {
	if (typeof window === "undefined") return false;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function TreeCanvas() {
	const canvasRef = (0, import_react.useRef)(null);
	const seed = useTreeStore((s) => s.seed);
	const angle = useTreeStore((s) => s.angle);
	const depth = useTreeStore((s) => s.depth);
	const length = useTreeStore((s) => s.length);
	const wind = useTreeStore((s) => s.wind);
	const overlay = useTreeStore((s) => s.overlay);
	const paletteId = useTreeStore((s) => s.paletteId);
	const viewRef = (0, import_react.useRef)({
		angle,
		depth,
		length,
		wind,
		overlay,
		palette: getPalette(paletteId),
		reduced: false
	});
	viewRef.current = {
		angle,
		depth,
		length,
		wind,
		overlay,
		palette: getPalette(paletteId),
		reduced: prefersReducedMotion()
	};
	const simRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const reduced = prefersReducedMotion();
		simRef.current = {
			tree: generateTree(seed),
			particles: createParticlePool(),
			growth: reduced ? 1 : 0,
			time: 0,
			gust: reduced ? 0 : .8,
			spawnAcc: 0,
			stars: buildStars(seed, getPalette(useTreeStore.getState().paletteId).stars)
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
		const frame = (now) => {
			const sim = simRef.current;
			if (!sim) return;
			const dt = Math.min(.1, (now - last) / 1e3);
			last = now;
			viewRef.current.palette = getPalette(useTreeStore.getState().paletteId);
			const wantStars = viewRef.current.palette.stars;
			if (sim.stars.length !== wantStars) sim.stars = buildStars(useTreeStore.getState().seed, wantStars);
			stepAndDraw(ctx, cssW, cssH, sim, viewRef.current, dt);
			raf = requestAnimationFrame(frame);
		};
		raf = requestAnimationFrame(frame);
		const gust = () => {
			const sim = simRef.current;
			if (sim && !viewRef.current.reduced) sim.gust = Math.min(1.2, sim.gust + .85);
		};
		canvas.addEventListener("pointerdown", gust);
		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
			media.removeEventListener("change", onMotion);
			canvas.removeEventListener("pointerdown", gust);
		};
	}, [seed]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		className: "absolute inset-0 size-full touch-none",
		role: "img",
		"aria-label": "Living fractal tree"
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 rounded-sm text-sm font-medium transition-[color,background-color,opacity,transform] duration-(--motion-quick) ease-(--ease-out) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:opacity-90",
			secondary: "border border-border bg-surface-2 text-fg hover:bg-surface",
			ghost: "text-fg hover:bg-surface-2",
			outline: "border border-border bg-transparent text-fg hover:bg-surface-2"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), "active:not-disabled:scale-[0.96]", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		className: cn("text-xs font-medium text-muted", className),
		...props
	});
}
function Slider({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
		className: cn("relative flex h-11 w-full touch-none select-none items-center", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
			className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-surface-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-accent" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block size-4 rounded-full border border-border bg-fg shadow-sm transition-[box-shadow,transform] duration-(--motion-quick) ease-(--ease-out) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:pointer-events-none disabled:opacity-50" })]
	});
}
var OVERLAYS = [
	{
		id: "none",
		label: "Bare",
		icon: GitBranch
	},
	{
		id: "leaves",
		label: "Leaves",
		icon: Leaf
	},
	{
		id: "blossoms",
		label: "Blossoms",
		icon: Flower2
	}
];
function Field({ id, label, value, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-baseline justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: id,
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs tabular-nums text-fg",
				children: value
			})]
		}), children]
	});
}
function TreeControls({ showRegenerate = true }) {
	const angle = useTreeStore((s) => s.angle);
	const depth = useTreeStore((s) => s.depth);
	const length = useTreeStore((s) => s.length);
	const wind = useTreeStore((s) => s.wind);
	const overlay = useTreeStore((s) => s.overlay);
	const paletteId = useTreeStore((s) => s.paletteId);
	const setAngle = useTreeStore((s) => s.setAngle);
	const setDepth = useTreeStore((s) => s.setDepth);
	const setLength = useTreeStore((s) => s.setLength);
	const setWind = useTreeStore((s) => s.setWind);
	const setOverlay = useTreeStore((s) => s.setOverlay);
	const setPaletteId = useTreeStore((s) => s.setPaletteId);
	const regenerate = useTreeStore((s) => s.regenerate);
	const paletteName = PALETTES.find((p) => p.id === paletteId)?.name ?? "Dusk grove";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "angle",
				label: "Branching angle",
				value: `${Math.round(angle)}°`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					id: "angle",
					min: 8,
					max: 42,
					step: 1,
					value: [angle],
					onValueChange: (v) => setAngle(v[0] ?? angle),
					"aria-label": "Branching angle"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "depth",
				label: "Depth",
				value: `${depth}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					id: "depth",
					min: 5,
					max: 11,
					step: 1,
					value: [depth],
					onValueChange: (v) => setDepth(v[0] ?? depth),
					"aria-label": "Depth"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "length",
				label: "Length",
				value: `${Math.round(length * 100)}%`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					id: "length",
					min: .6,
					max: 1.45,
					step: .01,
					value: [length],
					onValueChange: (v) => setLength(v[0] ?? length),
					"aria-label": "Length"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "wind",
				label: "Wind",
				value: `${Math.round(wind * 100)}%`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					id: "wind",
					min: 0,
					max: 1,
					step: .01,
					value: [wind],
					onValueChange: (v) => setWind(v[0] ?? wind),
					"aria-label": "Wind"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Overlay" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-1 rounded-sm bg-surface-2 p-1",
					children: OVERLAYS.map((item) => {
						const Icon = item.icon;
						const active = overlay === item.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setOverlay(item.id),
							"aria-pressed": active,
							className: cn("flex h-11 items-center justify-center gap-1.5 rounded-xs text-xs font-medium transition-[background-color,color] duration-(--motion-quick) ease-(--ease-out)", active ? "bg-accent text-accent-fg" : "text-muted hover:text-fg"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-3.5",
								strokeWidth: 1.75
							}), item.label]
						}, item.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Palette" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted",
						children: paletteName
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-6 gap-1",
					children: PALETTES.map((p) => {
						const selected = p.id === paletteId;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": p.name,
							"aria-pressed": selected,
							title: p.name,
							onClick: () => setPaletteId(p.id),
							className: cn("size-11 rounded-full ring-2 ring-offset-2 ring-offset-surface transition-[box-shadow,transform] duration-(--motion-quick) ease-(--ease-out)", selected ? "ring-accent" : "ring-transparent hover:ring-border"),
							style: { backgroundColor: toCss(p.swatch) }
						}, p.id);
					})
				})]
			}),
			showRegenerate ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				className: "w-full",
				onClick: regenerate,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { strokeWidth: 1.75 }),
					"Regenerate",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
						className: "ml-auto hidden rounded-xs border border-accent-fg/20 px-1.5 py-0.5 text-xs font-medium text-accent-fg/70 md:inline",
						children: "R"
					})
				]
			}) : null
		]
	});
}
function PersistGate() {
	(0, import_react.useEffect)(() => persistTreeSettings(), []);
	return null;
}
function Keybinds() {
	const regenerate = useTreeStore((s) => s.regenerate);
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			if (event.key !== "r" && event.key !== "R") return;
			if (event.metaKey || event.ctrlKey || event.altKey) return;
			const target = event.target;
			const tag = target?.tagName;
			if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) return;
			event.preventDefault();
			regenerate();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [regenerate]);
	return null;
}
function BrandMark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-surface/92 px-4 py-3 shadow-panel ring-1 ring-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-xl font-medium leading-tight tracking-tight text-fg text-balance",
			children: "Sylva"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-0.5 text-sm leading-snug text-muted",
			children: "Generative trees"
		})]
	});
}
function DesktopPanel() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "pointer-events-auto hidden w-80 shrink-0 flex-col rounded-xl bg-surface/92 p-4 shadow-panel ring-1 ring-border md:flex md:max-h-[calc(100dvh-2.5rem)] md:overflow-y-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-base font-medium text-fg",
				children: "Grow"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Shape the tree, then let the wind move through it."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TreeControls, {})
			})
		]
	});
}
function MobileChrome() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const regenerate = useTreeStore((s) => s.regenerate);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-3 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Root, {
			open,
			onOpenChange: setOpen,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Trigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					size: "icon",
					className: "pointer-events-auto shadow-panel",
					"aria-label": "Open controls",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { strokeWidth: 1.75 })
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Overlay, { className: "fixed inset-0 z-40 bg-bg/50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Content, {
				className: "fixed inset-x-0 bottom-0 z-50 flex max-h-[80dvh] flex-col rounded-t-xl bg-surface p-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-panel ring-1 ring-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mb-3 h-1 w-10 rounded-full bg-border" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Title, {
						className: "font-display text-lg font-medium text-fg",
						children: "Grow"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Description, {
						className: "sr-only",
						children: "Adjust branching angle, depth, length, wind, overlay, and palette"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 overflow-y-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TreeControls, {})
					})
				]
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "icon",
			className: "pointer-events-auto shadow-panel",
			"aria-label": "Regenerate tree",
			onClick: regenerate,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { strokeWidth: 1.75 })
		})]
	});
}
function TreeShell() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative h-dvh w-full overflow-hidden bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersistGate, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keybinds, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TreeCanvas, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-0 z-10 flex items-start justify-between gap-4 p-5 pt-[max(1.25rem,env(safe-area-inset-top))]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesktopPanel, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileChrome, {})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TreeShell, {});
}
//#endregion
export { Home as component };
