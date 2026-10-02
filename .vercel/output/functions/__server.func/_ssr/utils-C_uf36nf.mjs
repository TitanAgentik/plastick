import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog-Bvkpq-qp.js
var COMBO_TOTAL = 3840;
var FACES = [
	{
		id: "nite",
		name: "Nite",
		blurb: "Black dial. Lime LCD. Reads in a dark room.",
		dial: "#0d0d0c",
		hands: "#f3efe4",
		indices: "#c8ccd4",
		lcdBg: "#11140c",
		lcdFg: "#c6e84a",
		ring: "#1c1c18",
		graphic: "none",
		upcharge: 0
	},
	{
		id: "bone",
		name: "Bone",
		blurb: "Cream analog. Gift-safe. Still a tank.",
		dial: "#e7e0d0",
		hands: "#1a1916",
		indices: "#1a1916",
		lcdBg: "#2a2722",
		lcdFg: "#e7e0d0",
		ring: "#d4ccba",
		graphic: "none",
		upcharge: 0
	},
	{
		id: "visor",
		name: "Visor",
		blurb: "Smoked crystal energy. White digits punch through.",
		dial: "#2a2c2e",
		hands: "#f3efe4",
		indices: "#9aa0a6",
		lcdBg: "#0e1012",
		lcdFg: "#f3efe4",
		ring: "#3a3e42",
		graphic: "grid",
		upcharge: 6
	},
	{
		id: "blush",
		name: "Blush",
		blurb: "Pastel dial. Not cute. Just loud-quiet.",
		dial: "#e8cfc6",
		hands: "#4a2e2a",
		indices: "#4a2e2a",
		lcdBg: "#5a3834",
		lcdFg: "#f7e6e0",
		ring: "#d4b4aa",
		graphic: "sun",
		upcharge: 4
	},
	{
		id: "stealth",
		name: "Stealth",
		blurb: "Charcoal on charcoal. Hands you have to look for.",
		dial: "#1a1a18",
		hands: "#8a8880",
		indices: "#5a5850",
		lcdBg: "#10100e",
		lcdFg: "#8a8880",
		ring: "#242420",
		graphic: "none",
		upcharge: 0
	},
	{
		id: "void",
		name: "Void",
		blurb: "Collab graphic. Broken ring. Limited face.",
		dial: "#121214",
		hands: "#c8ccd4",
		indices: "#6a6e76",
		lcdBg: "#08080a",
		lcdFg: "#c8ccd4",
		ring: "#2a2c32",
		graphic: "void",
		upcharge: 12,
		limited: true
	},
	{
		id: "tide",
		name: "Tide",
		blurb: "Slate dial. Pool-adjacent without trying.",
		dial: "#2c3a42",
		hands: "#e8f0f2",
		indices: "#b0c4c8",
		lcdBg: "#152028",
		lcdFg: "#b8e0dc",
		ring: "#3a4c54",
		graphic: "none",
		upcharge: 4
	},
	{
		id: "frost",
		name: "Frost",
		blurb: "Icy analog. Silver hands. Winter fit.",
		dial: "#dce3e8",
		hands: "#2a3034",
		indices: "#2a3034",
		lcdBg: "#4a5458",
		lcdFg: "#e8eef0",
		ring: "#c8d2d6",
		graphic: "none",
		upcharge: 6
	}
];
var BEZELS = [
	{
		id: "guard",
		name: "Guard",
		blurb: "Matte black. Ribbed. The default tank frame.",
		color: "#1a1a18",
		highlight: "#3a3a34",
		finish: "opaque",
		texture: "ribbed",
		upcharge: 0
	},
	{
		id: "slime",
		name: "Slime",
		blurb: "Lime jelly. Three-second screenshot.",
		color: "#b6e034",
		highlight: "#e8ff88",
		finish: "jelly",
		texture: "smooth",
		upcharge: 10
	},
	{
		id: "smoke",
		name: "Smoke",
		blurb: "Frosted gray. Ghosts the rest of the build.",
		color: "#6a6c70",
		highlight: "#c8ccd4",
		finish: "frost",
		texture: "smooth",
		upcharge: 8
	},
	{
		id: "bone",
		name: "Bone",
		blurb: "Opaque cream. Makes stealth bodies look meaner.",
		color: "#e4dcc8",
		highlight: "#f7f2e6",
		finish: "opaque",
		texture: "smooth",
		upcharge: 4
	},
	{
		id: "chrome",
		name: "Chrome",
		blurb: "Cool silver. Used sparingly on purpose.",
		color: "#b8bcc4",
		highlight: "#f0f2f4",
		finish: "chrome",
		texture: "smooth",
		upcharge: 14
	},
	{
		id: "olive",
		name: "Olive",
		blurb: "Guard texture. Skate-park green.",
		color: "#4a5238",
		highlight: "#8a9468",
		finish: "opaque",
		texture: "guard",
		upcharge: 4
	},
	{
		id: "ice",
		name: "Ice",
		blurb: "Clear frost. Limited bezel drop.",
		color: "#d0e4ea",
		highlight: "#ffffff",
		finish: "frost",
		texture: "smooth",
		upcharge: 16,
		limited: true
	},
	{
		id: "punch",
		name: "Punch",
		blurb: "Candy jelly. Festival bezel.",
		color: "#e8789a",
		highlight: "#ffd0dc",
		finish: "jelly",
		texture: "smooth",
		upcharge: 10
	}
];
var BODIES = [
	{
		id: "stealth",
		name: "Stealth",
		blurb: "Opaque black chassis. Disappears under a sleeve.",
		color: "#141412",
		bumper: "#0e0e0c",
		finish: "opaque",
		upcharge: 0
	},
	{
		id: "smoke",
		name: "Smoke",
		blurb: "Translucent gray. See the module sit inside.",
		color: "#5a5c60",
		bumper: "#3a3c40",
		finish: "frost",
		upcharge: 8
	},
	{
		id: "clear",
		name: "Clear",
		blurb: "Full see-through case. Y2K without the joke.",
		color: "#d8e0e4",
		bumper: "#b0bcc0",
		finish: "jelly",
		upcharge: 10
	},
	{
		id: "olive",
		name: "Olive",
		blurb: "Tank green. Dirt hides well on this one.",
		color: "#3a422c",
		bumper: "#2a3220",
		finish: "opaque",
		upcharge: 4
	},
	{
		id: "bone",
		name: "Bone",
		blurb: "Warm off-white. Loud next to a dark strap.",
		color: "#e8e0d0",
		bumper: "#c8c0b0",
		finish: "opaque",
		upcharge: 4
	},
	{
		id: "ink",
		name: "Ink",
		blurb: "Blue-black resin. Night-run default.",
		color: "#141820",
		bumper: "#0c1016",
		finish: "opaque",
		upcharge: 4
	}
];
var STRAPS = [
	{
		id: "black",
		name: "Black resin",
		blurb: "Two-piece resin. The quiet default.",
		top: "#1a1a18",
		bottom: "#1a1a18",
		hardware: "#2a2a26",
		finish: "opaque",
		upcharge: 0
	},
	{
		id: "slime",
		name: "Slime jelly",
		blurb: "Translucent lime. The screenshot strap.",
		top: "#b6e034",
		bottom: "#b6e034",
		hardware: "#d8ff70",
		finish: "jelly",
		upcharge: 12
	},
	{
		id: "nato",
		name: "Nato ink",
		blurb: "Black webbing. Swap in two seconds.",
		top: "#1c1c1a",
		bottom: "#1c1c1a",
		hardware: "#c8ccd4",
		finish: "nato",
		upcharge: 6
	},
	{
		id: "split",
		name: "Split acid",
		blurb: "Black long, lime short. Combo multiplier.",
		top: "#1a1a18",
		bottom: "#b6e034",
		hardware: "#2a2a26",
		finish: "opaque",
		upcharge: 10
	},
	{
		id: "blush",
		name: "Blush resin",
		blurb: "Dusty pink resin. Pastel without baby.",
		top: "#d4a8a0",
		bottom: "#d4a8a0",
		hardware: "#8a6058",
		finish: "opaque",
		upcharge: 6
	},
	{
		id: "olive",
		name: "Olive nato",
		blurb: "Webbing in tank green.",
		top: "#4a5238",
		bottom: "#4a5238",
		hardware: "#c8ccd4",
		finish: "nato",
		upcharge: 6
	},
	{
		id: "ghost",
		name: "Ghost jelly",
		blurb: "Smoke-clear strap. Matches frost bezels.",
		top: "#8a9098",
		bottom: "#8a9098",
		hardware: "#c8ccd4",
		finish: "jelly",
		upcharge: 12
	},
	{
		id: "bone",
		name: "Bone resin",
		blurb: "Cream two-piece. Summer default.",
		top: "#e4dcc8",
		bottom: "#e4dcc8",
		hardware: "#8a8478",
		finish: "opaque",
		upcharge: 4
	},
	{
		id: "candy",
		name: "Split candy",
		blurb: "Pink long, lime short. Limited drop.",
		top: "#e8789a",
		bottom: "#b6e034",
		hardware: "#f3efe4",
		finish: "jelly",
		upcharge: 14,
		limited: true
	},
	{
		id: "ice",
		name: "Ice jelly",
		blurb: "Frosted clear strap. Winter drop adjacent.",
		top: "#d0e4ea",
		bottom: "#d0e4ea",
		hardware: "#f3efe4",
		finish: "jelly",
		upcharge: 12
	}
];
var PRESETS = [
	{
		id: "slime",
		name: "Y2K Slime",
		vibe: "Jelly",
		who: "Anyone filming a wrist check.",
		build: {
			face: "nite",
			bezel: "slime",
			body: "clear",
			strap: "slime"
		},
		inStock: true
	},
	{
		id: "nightrun",
		name: "Night Run",
		vibe: "Stealth",
		who: "Late gym. Black on black.",
		build: {
			face: "nite",
			bezel: "guard",
			body: "ink",
			strap: "black"
		},
		inStock: true
	},
	{
		id: "stealth",
		name: "Stealth Tank",
		vibe: "Stealth",
		who: "You already own too much black.",
		build: {
			face: "stealth",
			bezel: "guard",
			body: "stealth",
			strap: "black"
		},
		inStock: true
	},
	{
		id: "skate",
		name: "Skate Park",
		vibe: "Street",
		who: "Olive, dirt, and a NATO.",
		build: {
			face: "visor",
			bezel: "olive",
			body: "olive",
			strap: "olive"
		},
		inStock: true
	},
	{
		id: "first",
		name: "First Wrist",
		vibe: "Gift",
		who: "Parents. Partners. Safe and still cool.",
		build: {
			face: "bone",
			bezel: "bone",
			body: "stealth",
			strap: "black"
		},
		inStock: true
	},
	{
		id: "pastel",
		name: "Pastel Drop",
		vibe: "Pastel",
		who: "Festival bag, not a jewelry case.",
		build: {
			face: "blush",
			bezel: "punch",
			body: "bone",
			strap: "blush"
		},
		inStock: true
	},
	{
		id: "ghost",
		name: "Smoke Ghost",
		vibe: "Frost",
		who: "Translucent stack. Quiet flex.",
		build: {
			face: "visor",
			bezel: "smoke",
			body: "smoke",
			strap: "ghost"
		},
		inStock: true
	},
	{
		id: "fest",
		name: "Fest",
		vibe: "Jelly",
		who: "Clash on purpose.",
		build: {
			face: "nite",
			bezel: "punch",
			body: "clear",
			strap: "candy"
		},
		inStock: true
	},
	{
		id: "after",
		name: "After Hours",
		vibe: "Stealth",
		who: "Chrome bezel, ink body, out at 1am.",
		build: {
			face: "nite",
			bezel: "chrome",
			body: "ink",
			strap: "nato"
		},
		inStock: true
	},
	{
		id: "pool",
		name: "Poolside",
		vibe: "Jelly",
		who: "Tide face, ice strap, chlorine optional.",
		build: {
			face: "tide",
			bezel: "ice",
			body: "clear",
			strap: "ice"
		},
		inStock: true
	},
	{
		id: "clash",
		name: "Clash City",
		vibe: "Street",
		who: "Split acid strap. Does not match. Good.",
		build: {
			face: "nite",
			bezel: "guard",
			body: "stealth",
			strap: "split"
		},
		inStock: true
	},
	{
		id: "office",
		name: "Office After",
		vibe: "Gift",
		who: "Bone face under a cuff. Still a tank.",
		build: {
			face: "bone",
			bezel: "chrome",
			body: "stealth",
			strap: "nato"
		},
		inStock: true
	}
];
var DROPS = [
	{
		id: "d-slime",
		name: "Slime strap",
		kind: "strap",
		partId: "slime",
		ends: "2026-09-23",
		remaining: 240,
		total: 400,
		blurb: "One jelly strap. When it's gone, it's a restock maybe."
	},
	{
		id: "d-void",
		name: "Void face",
		kind: "face",
		partId: "void",
		ends: "2026-09-28",
		remaining: 80,
		total: 200,
		blurb: "Collab graphic. Broken ring. Not coming back in this color."
	},
	{
		id: "d-ice",
		name: "Ice bezel",
		kind: "bezel",
		partId: "ice",
		ends: "2026-10-05",
		remaining: 160,
		total: 300,
		blurb: "Frosted clear frame. Weekly part drop."
	},
	{
		id: "d-candy",
		name: "Split candy",
		kind: "strap",
		partId: "candy",
		ends: "2026-10-12",
		remaining: 120,
		total: 250,
		blurb: "Pink long, lime short. The clash strap."
	}
];
var GALLERY = [
	{
		handle: "mina",
		caption: "slime on a Tuesday",
		build: {
			face: "nite",
			bezel: "slime",
			body: "clear",
			strap: "slime"
		},
		remixes: 84
	},
	{
		handle: "jo",
		caption: "night bus wrist",
		build: {
			face: "nite",
			bezel: "guard",
			body: "ink",
			strap: "black"
		},
		remixes: 41
	},
	{
		handle: "ari",
		caption: "stole this from a story",
		build: {
			face: "visor",
			bezel: "olive",
			body: "olive",
			strap: "olive"
		},
		remixes: 29
	},
	{
		handle: "ken",
		caption: "first one. bone.",
		build: {
			face: "bone",
			bezel: "bone",
			body: "stealth",
			strap: "black"
		},
		remixes: 63
	},
	{
		handle: "val",
		caption: "pool filter",
		build: {
			face: "tide",
			bezel: "ice",
			body: "clear",
			strap: "ice"
		},
		remixes: 22
	},
	{
		handle: "neo",
		caption: "does not match the hoodie. on purpose.",
		build: {
			face: "nite",
			bezel: "guard",
			body: "stealth",
			strap: "split"
		},
		remixes: 57
	},
	{
		handle: "suki",
		caption: "blush + punch",
		build: {
			face: "blush",
			bezel: "punch",
			body: "bone",
			strap: "blush"
		},
		remixes: 18
	},
	{
		handle: "rex",
		caption: "ghost stack",
		build: {
			face: "visor",
			bezel: "smoke",
			body: "smoke",
			strap: "ghost"
		},
		remixes: 33
	},
	{
		handle: "ida",
		caption: "void face finally",
		build: {
			face: "void",
			bezel: "chrome",
			body: "ink",
			strap: "nato"
		},
		remixes: 71
	},
	{
		handle: "sol",
		caption: "fest fit",
		build: {
			face: "nite",
			bezel: "punch",
			body: "clear",
			strap: "candy"
		},
		remixes: 46
	},
	{
		handle: "mae",
		caption: "office then bar",
		build: {
			face: "bone",
			bezel: "chrome",
			body: "stealth",
			strap: "nato"
		},
		remixes: 15
	},
	{
		handle: "k",
		caption: "stealth tank no notes",
		build: {
			face: "stealth",
			bezel: "guard",
			body: "stealth",
			strap: "black"
		},
		remixes: 90
	}
];
var EXTRA_PRICES = {
	face: 16,
	bezel: 22,
	body: 28,
	strap: 18
};
function getFace(id) {
	return FACES.find((p) => p.id === id) ?? FACES[0];
}
function getBezel(id) {
	return BEZELS.find((p) => p.id === id) ?? BEZELS[0];
}
function getBody(id) {
	return BODIES.find((p) => p.id === id) ?? BODIES[0];
}
function getStrap(id) {
	return STRAPS.find((p) => p.id === id) ?? STRAPS[0];
}
function encodeSku(b) {
	return `${b.face}.${b.bezel}.${b.body}.${b.strap}`;
}
function decodeSku(sku) {
	if (!sku) return null;
	const [face, bezel, body, strap] = sku.split(".");
	if (!face || !bezel || !body || !strap) return null;
	if (!FACES.some((p) => p.id === face)) return null;
	if (!BEZELS.some((p) => p.id === bezel)) return null;
	if (!BODIES.some((p) => p.id === body)) return null;
	if (!STRAPS.some((p) => p.id === strap)) return null;
	return {
		face,
		bezel,
		body,
		strap
	};
}
function priceOf(b) {
	return 89 + getFace(b.face).upcharge + getBezel(b.bezel).upcharge + getBody(b.body).upcharge + getStrap(b.strap).upcharge;
}
function isHeroBuild(b) {
	const sku = encodeSku(b);
	return PRESETS.some((p) => encodeSku(p.build) === sku);
}
function shipCopy(b) {
	return isHeroBuild(b) ? "Hero build. Ships in 2 days." : "Custom. Built when you lock it. 5–8 days.";
}
function comboCount(sku) {
	let h = 2166136261;
	for (let i = 0; i < sku.length; i++) {
		h ^= sku.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return 4 + (h >>> 0) % 73;
}
function clashWarnings(b) {
	const face = getFace(b.face);
	const bezel = getBezel(b.bezel);
	const out = [];
	const dist = (a, c) => {
		const n = (hex) => {
			const h = hex.replace("#", "");
			return [
				parseInt(h.slice(0, 2), 16),
				parseInt(h.slice(2, 4), 16),
				parseInt(h.slice(4, 6), 16)
			];
		};
		const [r1, g1, b1] = n(a);
		const [r2, g2, b2] = n(c);
		return Math.hypot(r1 - r2, g1 - g2, b1 - b2);
	};
	if (dist(face.dial, face.hands) < 40) out.push("Hands sit too close to the dial. It will look blank on camera.");
	if (dist(face.lcdBg, face.lcdFg) < 50) out.push("LCD contrast is low. Hard to read in noon sun.");
	if (dist(face.dial, bezel.color) < 28) out.push("Face and bezel are almost the same color. The silhouette disappears.");
	return out;
}
function randomBuild(avoidClash = true) {
	const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
	for (let i = 0; i < 12; i++) {
		const b = {
			face: pick(FACES).id,
			bezel: pick(BEZELS).id,
			body: pick(BODIES).id,
			strap: pick(STRAPS).id
		};
		if (!avoidClash || clashWarnings(b).length === 0) return b;
	}
	return PRESETS[0].build;
}
function hexToRgb(hex) {
	const h = hex.replace("#", "");
	return {
		r: parseInt(h.slice(0, 2), 16),
		g: parseInt(h.slice(2, 4), 16),
		b: parseInt(h.slice(4, 6), 16)
	};
}
function colorDist(a, b) {
	const x = hexToRgb(a);
	const y = hexToRgb(b);
	return Math.hypot(x.r - y.r, x.g - y.g, x.b - y.b);
}
function matchHex(hex) {
	const nearest = (items, colorOf) => items.reduce((best, item) => colorDist(colorOf(item), hex) < colorDist(colorOf(best), hex) ? item : best);
	return {
		face: nearest(FACES, (f) => f.dial).id,
		bezel: nearest(BEZELS, (b) => b.color).id,
		body: nearest(BODIES, (b) => b.color).id,
		strap: nearest(STRAPS, (s) => s.top).id
	};
}
var DEFAULT_BUILD = PRESETS[2].build;
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/utils-C_uf36nf.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
export { randomBuild as C, priceOf as S, getBody as _, DEFAULT_BUILD as a, isHeroBuild as b, FACES as c, STRAPS as d, clashWarnings as f, getBezel as g, encodeSku as h, COMBO_TOTAL as i, GALLERY as l, decodeSku as m, BEZELS as n, DROPS as o, comboCount as p, BODIES as r, EXTRA_PRICES as s, cn as t, PRESETS as u, getFace as v, shipCopy as w, matchHex as x, getStrap as y };
