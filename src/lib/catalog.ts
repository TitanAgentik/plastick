export type Finish = "opaque" | "jelly" | "frost" | "chrome" | "nato";

export type Face = {
  id: string;
  name: string;
  blurb: string;
  dial: string;
  hands: string;
  indices: string;
  lcdBg: string;
  lcdFg: string;
  ring: string;
  graphic: "none" | "grid" | "void" | "sun";
  upcharge: number;
  limited?: boolean;
};

export type Bezel = {
  id: string;
  name: string;
  blurb: string;
  color: string;
  highlight: string;
  finish: Finish;
  texture: "smooth" | "ribbed" | "guard";
  upcharge: number;
  limited?: boolean;
};

export type Body = {
  id: string;
  name: string;
  blurb: string;
  color: string;
  bumper: string;
  finish: Finish;
  upcharge: number;
  limited?: boolean;
};

export type Strap = {
  id: string;
  name: string;
  blurb: string;
  top: string;
  bottom: string;
  hardware: string;
  finish: Finish;
  upcharge: number;
  limited?: boolean;
};

export type Build = {
  design?: string;
  face: string;
  bezel: string;
  body: string;
  strap: string;
  hands?: string;
  marks?: string;
  knob?: string;
  led?: string;
  logo?: string;
  buckle?: string;
  faceTint?: string;
  bezelTint?: string;
  bodyTint?: string;
  strapTint?: string;
  strapLow?: string;
};

export type Preset = {
  id: string;
  name: string;
  vibe: string;
  who: string;
  build: Build;
  inStock: boolean;
};

export const BASE_PRICE = 89;
export const CASE_MM = 42;

export const FACES: Face[] = [
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
    upcharge: 0,
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
    upcharge: 0,
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
    upcharge: 6,
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
    upcharge: 4,
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
    upcharge: 0,
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
    limited: true,
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
    upcharge: 4,
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
    upcharge: 6,
  },
  {
    id: "rose",
    name: "Rose",
    blurb: "Dusty pink dial. The Y2K Pill face.",
    dial: "#c47890",
    hands: "#1a1216",
    indices: "#2a1820",
    lcdBg: "#4a2834",
    lcdFg: "#1a1216",
    ring: "#d490a4",
    graphic: "none",
    upcharge: 4,
  },
  {
    id: "forest",
    name: "Forest",
    blurb: "Dark olive module. Night-run default.",
    dial: "#1c2418",
    hands: "#f3efe4",
    indices: "#8a9468",
    lcdBg: "#10160e",
    lcdFg: "#c6e84a",
    ring: "#2a3220",
    graphic: "none",
    upcharge: 4,
  },
];

export const BEZELS: Bezel[] = [
  {
    id: "guard",
    name: "Guard",
    blurb: "Matte black. Ribbed. The default tank frame.",
    color: "#1a1a18",
    highlight: "#3a3a34",
    finish: "opaque",
    texture: "ribbed",
    upcharge: 0,
  },
  {
    id: "slime",
    name: "Slime",
    blurb: "Lime jelly. Three-second screenshot.",
    color: "#b6e034",
    highlight: "#e8ff88",
    finish: "jelly",
    texture: "smooth",
    upcharge: 10,
  },
  {
    id: "smoke",
    name: "Smoke",
    blurb: "Frosted gray. Ghosts the rest of the build.",
    color: "#6a6c70",
    highlight: "#c8ccd4",
    finish: "frost",
    texture: "smooth",
    upcharge: 8,
  },
  {
    id: "bone",
    name: "Bone",
    blurb: "Opaque cream. Makes stealth bodies look meaner.",
    color: "#e4dcc8",
    highlight: "#f7f2e6",
    finish: "opaque",
    texture: "smooth",
    upcharge: 4,
  },
  {
    id: "chrome",
    name: "Chrome",
    blurb: "Cool silver. Used sparingly on purpose.",
    color: "#b8bcc4",
    highlight: "#f0f2f4",
    finish: "chrome",
    texture: "smooth",
    upcharge: 14,
  },
  {
    id: "olive",
    name: "Olive",
    blurb: "Guard texture. Skate-park green.",
    color: "#4a5238",
    highlight: "#8a9468",
    finish: "opaque",
    texture: "guard",
    upcharge: 4,
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
    limited: true,
  },
  {
    id: "punch",
    name: "Punch",
    blurb: "Candy jelly. Festival bezel.",
    color: "#e8789a",
    highlight: "#ffd0dc",
    finish: "jelly",
    texture: "smooth",
    upcharge: 10,
  },
  {
    id: "navy",
    name: "Navy",
    blurb: "Court blue. Skate Court default.",
    color: "#243656",
    highlight: "#6a88b0",
    finish: "opaque",
    texture: "guard",
    upcharge: 4,
  },
  {
    id: "rose",
    name: "Rose jelly",
    blurb: "Pink translucent frame. Y2K Pill.",
    color: "#e8a8bc",
    highlight: "#ffd0dc",
    finish: "jelly",
    texture: "smooth",
    upcharge: 10,
  },
];

export const BODIES: Body[] = [
  {
    id: "stealth",
    name: "Stealth",
    blurb: "Opaque black chassis. Disappears under a sleeve.",
    color: "#141412",
    bumper: "#0e0e0c",
    finish: "opaque",
    upcharge: 0,
  },
  {
    id: "smoke",
    name: "Smoke",
    blurb: "Translucent gray. See the module sit inside.",
    color: "#5a5c60",
    bumper: "#3a3c40",
    finish: "frost",
    upcharge: 8,
  },
  {
    id: "clear",
    name: "Clear",
    blurb: "Full see-through case. Y2K without the joke.",
    color: "#d8e0e4",
    bumper: "#b0bcc0",
    finish: "jelly",
    upcharge: 10,
  },
  {
    id: "olive",
    name: "Olive",
    blurb: "Tank green. Dirt hides well on this one.",
    color: "#3a422c",
    bumper: "#2a3220",
    finish: "opaque",
    upcharge: 4,
  },
  {
    id: "bone",
    name: "Bone",
    blurb: "Warm off-white. Loud next to a dark strap.",
    color: "#e8e0d0",
    bumper: "#c8c0b0",
    finish: "opaque",
    upcharge: 4,
  },
  {
    id: "ink",
    name: "Ink",
    blurb: "Blue-black resin. Night-run default.",
    color: "#141820",
    bumper: "#0c1016",
    finish: "opaque",
    upcharge: 4,
  },
  {
    id: "pink",
    name: "Pink jelly",
    blurb: "Translucent rose chassis. The Pill body.",
    color: "#e8b4c4",
    bumper: "#d490a8",
    finish: "jelly",
    upcharge: 10,
  },
  {
    id: "sky",
    name: "Sky jelly",
    blurb: "Ice-blue translucent. Digital-module default.",
    color: "#8eb8c8",
    bumper: "#6a98a8",
    finish: "jelly",
    upcharge: 10,
  },
];

export const STRAPS: Strap[] = [
  {
    id: "black",
    name: "Black resin",
    blurb: "Two-piece resin. The quiet default.",
    top: "#1a1a18",
    bottom: "#1a1a18",
    hardware: "#2a2a26",
    finish: "opaque",
    upcharge: 0,
  },
  {
    id: "slime",
    name: "Slime jelly",
    blurb: "Translucent lime. The screenshot strap.",
    top: "#b6e034",
    bottom: "#b6e034",
    hardware: "#d8ff70",
    finish: "jelly",
    upcharge: 12,
  },
  {
    id: "nato",
    name: "Nato ink",
    blurb: "Black webbing. Swap in two seconds.",
    top: "#1c1c1a",
    bottom: "#1c1c1a",
    hardware: "#c8ccd4",
    finish: "nato",
    upcharge: 6,
  },
  {
    id: "split",
    name: "Split acid",
    blurb: "Black long, lime short. Combo multiplier.",
    top: "#1a1a18",
    bottom: "#b6e034",
    hardware: "#2a2a26",
    finish: "opaque",
    upcharge: 10,
  },
  {
    id: "blush",
    name: "Blush resin",
    blurb: "Dusty pink resin. Pastel without baby.",
    top: "#d4a8a0",
    bottom: "#d4a8a0",
    hardware: "#8a6058",
    finish: "opaque",
    upcharge: 6,
  },
  {
    id: "olive",
    name: "Olive nato",
    blurb: "Webbing in tank green.",
    top: "#4a5238",
    bottom: "#4a5238",
    hardware: "#c8ccd4",
    finish: "nato",
    upcharge: 6,
  },
  {
    id: "ghost",
    name: "Ghost jelly",
    blurb: "Smoke-clear strap. Matches frost bezels.",
    top: "#8a9098",
    bottom: "#8a9098",
    hardware: "#c8ccd4",
    finish: "jelly",
    upcharge: 12,
  },
  {
    id: "bone",
    name: "Bone resin",
    blurb: "Cream two-piece. Summer default.",
    top: "#e4dcc8",
    bottom: "#e4dcc8",
    hardware: "#8a8478",
    finish: "opaque",
    upcharge: 4,
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
    limited: true,
  },
  {
    id: "ice",
    name: "Ice jelly",
    blurb: "Frosted clear strap. Winter drop adjacent.",
    top: "#d0e4ea",
    bottom: "#d0e4ea",
    hardware: "#f3efe4",
    finish: "jelly",
    upcharge: 12,
  },
  {
    id: "pink",
    name: "Pink jelly",
    blurb: "Rose translucent strap. Matches the Pill.",
    top: "#e8b0c0",
    bottom: "#e8b0c0",
    hardware: "#f3efe4",
    finish: "jelly",
    upcharge: 12,
  },
  {
    id: "tan",
    name: "Court tan",
    blurb: "Perforated cognac. Skate Court strap.",
    top: "#c47848",
    bottom: "#c47848",
    hardware: "#2a2018",
    finish: "nato",
    upcharge: 8,
  },
];

export type Design = {
  id: string;
  name: string;
  blurb: string;
  shape: "tank" | "orb" | "facet" | "brick" | "cushion" | "field" | "module" | "hex" | "blob" | "star";
  upcharge: number;
};

export const DESIGNS: Design[] = [
  {
    id: "tank",
    name: "Tank",
    blurb: "Rounded square. The original Plas/Tick.",
    shape: "tank",
    upcharge: 0,
  },
  {
    id: "orb",
    name: "Orb",
    blurb: "Full circle. A bubble on the wrist.",
    shape: "orb",
    upcharge: 0,
  },
  {
    id: "facet",
    name: "Facet",
    blurb: "Eight sides. Light on every edge.",
    shape: "facet",
    upcharge: 6,
  },
  {
    id: "brick",
    name: "Brick",
    blurb: "Wide rectangle. Digital-first.",
    shape: "brick",
    upcharge: 0,
  },
  {
    id: "module",
    name: "Module",
    blurb: "Same pill case. Digital-first. Big LCD.",
    shape: "module",
    upcharge: 0,
  },
  // TREND_SHELLS v1 — say "revert the 3 new shells" to remove these.
  {
    id: "arena",
    name: "Arena",
    blurb: "Hex case. Gaming wrist. Ranked screenshot.",
    shape: "hex",
    upcharge: 6,
  },
  {
    id: "spark",
    name: "Spark",
    blurb: "Four-point star. Charm on the wrist.",
    shape: "star",
    upcharge: 8,
  },
];

export const COMBO_TOTAL =
  DESIGNS.length * FACES.length * BEZELS.length * BODIES.length * STRAPS.length;

export const PRESETS: Preset[] = [
  {
    id: "y2kpill",
    name: "Y2K Pill",
    vibe: "Jelly",
    who: "Pink jelly. The screenshot that starts the trend.",
    build: {
      design: "tank",
      face: "rose",
      bezel: "rose",
      body: "pink",
      strap: "pink",
      hands: "ink",
      marks: "ink",
      knob: "bone",
    },
    inStock: true,
  },
  {
    id: "stealth",
    name: "Stealth Tank",
    vibe: "Daily",
    who: "You already own too much black.",
    build: {
      design: "tank",
      face: "stealth",
      bezel: "guard",
      body: "stealth",
      strap: "black",
      hands: "bone",
      knob: "silver",
    },
    inStock: true,
  },
  {
    id: "nightrun",
    name: "Night Run",
    vibe: "Utility",
    who: "Lime bezel. Black NATO. Late gym.",
    build: {
      design: "tank",
      face: "forest",
      bezel: "slime",
      body: "olive",
      strap: "nato",
      hands: "bone",
      knob: "lime",
      led: "lime",
    },
    inStock: true,
  },
  {
    id: "skatecourt",
    name: "Skate Court",
    vibe: "Street",
    who: "Navy bezel. Court tan strap.",
    build: {
      design: "tank",
      face: "bone",
      bezel: "navy",
      body: "ink",
      strap: "tan",
      hands: "ink",
      marks: "ink",
      knob: "rust",
    },
    inStock: true,
  },
  {
    id: "icemodule",
    name: "Ice Module",
    vibe: "Digital",
    who: "Sky jelly. Big LCD. Pool-adjacent.",
    build: {
      design: "module",
      face: "tide",
      bezel: "ice",
      body: "sky",
      strap: "ice",
      knob: "bone",
      led: "lime",
    },
    inStock: true,
  },
  {
    id: "limeguard",
    name: "Lime Guard",
    vibe: "Utility",
    who: "Black tank. Slime frame. The other screenshot.",
    build: {
      design: "tank",
      face: "nite",
      bezel: "slime",
      body: "stealth",
      strap: "black",
      hands: "bone",
      knob: "lime",
    },
    inStock: true,
  },
  {
    id: "arenanight",
    name: "Arena Night",
    vibe: "Gaming",
    who: "Hex shell. Lime frame. Ranked screenshot.",
    build: {
      design: "arena",
      face: "nite",
      bezel: "slime",
      body: "stealth",
      strap: "black",
      hands: "lime",
      marks: "bone",
      knob: "lime",
      led: "lime",
    },
    inStock: true,
  },
  {
    id: "stargirl",
    name: "Star Girl",
    vibe: "Charm",
    who: "Four-point star. Chrome + candy. Locker magnet.",
    build: {
      design: "spark",
      face: "blush",
      bezel: "chrome",
      body: "clear",
      strap: "candy",
      hands: "punch",
      marks: "ink",
      knob: "silver",
      led: "cyan",
    },
    inStock: true,
  },
  {
    id: "slime",
    name: "Y2K Slime",
    vibe: "Jelly",
    who: "Anyone filming a wrist check.",
    build: { design: "orb", face: "nite", bezel: "slime", body: "clear", strap: "slime", hands: "lime", knob: "lime" },
    inStock: true,
  },
  {
    id: "ghost",
    name: "Smoke Ghost",
    vibe: "Frost",
    who: "Translucent stack. Quiet flex.",
    build: { design: "orb", face: "visor", bezel: "smoke", body: "smoke", strap: "ghost" },
    inStock: true,
  },
  {
    id: "fest",
    name: "Fest",
    vibe: "Jelly",
    who: "Clash on purpose.",
    build: { design: "facet", face: "nite", bezel: "punch", body: "clear", strap: "candy", hands: "punch", marks: "bone" },
    inStock: true,
  },
  {
    id: "after",
    name: "After Hours",
    vibe: "Stealth",
    who: "Chrome bezel, ink body, out at 1am.",
    build: { design: "brick", face: "nite", bezel: "chrome", body: "ink", strap: "nato", hands: "silver", knob: "silver" },
    inStock: true,
  },
  {
    id: "pool",
    name: "Poolside",
    vibe: "Jelly",
    who: "Tide face, ice strap, chlorine optional.",
    build: { design: "orb", face: "tide", bezel: "ice", body: "clear", strap: "ice" },
    inStock: true,
  },
  {
    id: "clash",
    name: "Clash City",
    vibe: "Street",
    who: "Split acid strap. Does not match. Good.",
    build: { design: "facet", face: "nite", bezel: "guard", body: "stealth", strap: "split" },
    inStock: true,
  },
];

export type Drop = {
  id: string;
  name: string;
  kind: PartKind;
  partId: string;
  ends: string;
  remaining: number;
  total: number;
  blurb: string;
};

export const DROPS: Drop[] = [
  {
    id: "d-slime",
    name: "Slime strap",
    kind: "strap",
    partId: "slime",
    ends: "2026-09-23",
    remaining: 240,
    total: 400,
    blurb: "One jelly strap. When it's gone, it's a restock maybe.",
  },
  {
    id: "d-void",
    name: "Void face",
    kind: "face",
    partId: "void",
    ends: "2026-09-28",
    remaining: 80,
    total: 200,
    blurb: "Collab graphic. Broken ring. Not coming back in this color.",
  },
  {
    id: "d-ice",
    name: "Ice bezel",
    kind: "bezel",
    partId: "ice",
    ends: "2026-10-05",
    remaining: 160,
    total: 300,
    blurb: "Frosted clear frame. Weekly part drop.",
  },
  {
    id: "d-candy",
    name: "Split candy",
    kind: "strap",
    partId: "candy",
    ends: "2026-10-12",
    remaining: 120,
    total: 250,
    blurb: "Pink long, lime short. The clash strap.",
  },
  {
    id: "d-lime-hands",
    name: "Lime hands",
    kind: "hands",
    partId: "lime",
    ends: "2026-10-08",
    remaining: 180,
    total: 300,
    blurb: "Swap the hands. Same module, loud needles.",
  },
];

export const GALLERY: Array<{
  handle: string;
  caption: string;
  build: Build;
  remixes: number;
}> = [
  {
    handle: "mina",
    caption: "slime on a Tuesday",
    build: { design: "orb", face: "nite", bezel: "slime", body: "clear", strap: "slime", hands: "lime", knob: "lime" },
    remixes: 84,
  },
  {
    handle: "jo",
    caption: "night bus wrist",
    build: { design: "tank", face: "nite", bezel: "guard", body: "ink", strap: "black", hands: "lime", knob: "silver" },
    remixes: 41,
  },
  {
    handle: "val",
    caption: "pool filter",
    build: { design: "orb", face: "tide", bezel: "ice", body: "clear", strap: "ice" },
    remixes: 22,
  },
  {
    handle: "neo",
    caption: "does not match the hoodie. on purpose.",
    build: { design: "facet", face: "nite", bezel: "guard", body: "stealth", strap: "split" },
    remixes: 57,
  },
  {
    handle: "rex",
    caption: "ghost stack",
    build: { design: "orb", face: "visor", bezel: "smoke", body: "smoke", strap: "ghost" },
    remixes: 33,
  },
  {
    handle: "ida",
    caption: "void face finally",
    build: { design: "brick", face: "void", bezel: "chrome", body: "ink", strap: "nato" },
    remixes: 71,
  },
  {
    handle: "sol",
    caption: "fest fit",
    build: { design: "facet", face: "nite", bezel: "punch", body: "clear", strap: "candy", hands: "punch", marks: "bone" },
    remixes: 46,
  },
  {
    handle: "k",
    caption: "stealth tank no notes",
    build: { design: "tank", face: "stealth", bezel: "guard", body: "stealth", strap: "black" },
    remixes: 90,
  },
];

export const EXTRA_PRICES = {
  face: 16,
  bezel: 22,
  body: 28,
  strap: 18,
  hands: 8,
  marks: 8,
  knob: 10,
  led: 8,
  logo: 6,
  buckle: 8,
} as const;

export function getFace(id: string) {
  return FACES.find((p) => p.id === id) ?? FACES[0];
}
export function getBezel(id: string) {
  return BEZELS.find((p) => p.id === id) ?? BEZELS[0];
}
export function getBody(id: string) {
  return BODIES.find((p) => p.id === id) ?? BODIES[0];
}
export function getStrap(id: string) {
  return STRAPS.find((p) => p.id === id) ?? STRAPS[0];
}
export function getDesign(id?: string) {
  return DESIGNS.find((p) => p.id === id) ?? DESIGNS[0];
}

export type Accent = {
  id: string;
  name: string;
  color: string;
};

export const ACCENTS: Accent[] = [
  { id: "auto", name: "Match", color: "" },
  { id: "bone", name: "Bone", color: "#f3efe4" },
  { id: "ink", name: "Ink", color: "#1a1916" },
  { id: "lime", name: "Lime", color: "#c6e84a" },
  { id: "silver", name: "Silver", color: "#c8ccd4" },
  { id: "punch", name: "Punch", color: "#e8789a" },
  { id: "ice", name: "Ice", color: "#d0e4ea" },
  { id: "rust", name: "Rust", color: "#c45c38" },
];

export const LEDS: Accent[] = [
  { id: "auto", name: "Match", color: "" },
  { id: "lime", name: "Volt", color: "#c6e84a" },
  { id: "amber", name: "Amber", color: "#ffb000" },
  { id: "red", name: "Red", color: "#ff4a3a" },
  { id: "cyan", name: "Cyan", color: "#5ef0e8" },
  { id: "blue", name: "Blue", color: "#4aa3ff" },
  { id: "punch", name: "Punch", color: "#e8789a" },
  { id: "bone", name: "White", color: "#f3efe4" },
];

export function isHexToken(id: string) {
  return /^[0-9a-fA-F]{6}$/.test(id);
}

export function normalizeHex(raw: string): string | null {
  const h = raw.replace(/[#\s]/g, "");
  if (/^[0-9a-fA-F]{6}$/.test(h)) return h.toLowerCase();
  if (/^[0-9a-fA-F]{3}$/.test(h)) {
    return `${h[0]}${h[0]}${h[1]}${h[1]}${h[2]}${h[2]}`.toLowerCase();
  }
  return null;
}

export function formatHex(raw: string) {
  const n = normalizeHex(raw);
  return n ? `#${n.toUpperCase()}` : "";
}

export function getAccent(id?: string) {
  return ACCENTS.find((p) => p.id === id) ?? ACCENTS[0];
}

export function accentColor(id: string | undefined, fallback: string) {
  if (!id || id === "auto") return fallback;
  if (isHexToken(id)) return `#${id}`;
  const a = ACCENTS.find((p) => p.id === id) ?? LEDS.find((p) => p.id === id);
  return a?.color || fallback;
}

export function ledColor(id: string | undefined, fallback: string) {
  if (!id || id === "auto") return fallback;
  if (isHexToken(id)) return `#${id}`;
  const a = LEDS.find((p) => p.id === id) ?? ACCENTS.find((p) => p.id === id);
  return a?.color || fallback;
}

export function encodeSku(b: Build) {
  return `${getDesign(b.design).id}.${b.face}.${b.bezel}.${b.body}.${b.strap}.${b.hands ?? "auto"}.${b.marks ?? "auto"}.${b.knob ?? "auto"}.${b.led ?? "auto"}.${b.logo ?? "auto"}.${b.faceTint ?? "auto"}.${b.bezelTint ?? "auto"}.${b.bodyTint ?? "auto"}.${b.strapTint ?? "auto"}.${b.strapLow ?? "auto"}.${b.buckle ?? "auto"}`;
}

export function decodeSku(sku: string | undefined): Build | null {
  if (!sku) return null;
  const parts = sku.split(".");
  let design = "tank";
  let face: string;
  let bezel: string;
  let body: string;
  let strap: string;
  let hands = "auto";
  let marks = "auto";
  let knob = "auto";
  let led = "auto";
  let logo = "auto";
  let buckle = "auto";
  let faceTint = "auto";
  let bezelTint = "auto";
  let bodyTint = "auto";
  let strapTint = "auto";
  let strapLow = "auto";
  if (parts.length === 16) {
    [
      design,
      face,
      bezel,
      body,
      strap,
      hands,
      marks,
      knob,
      led,
      logo,
      faceTint,
      bezelTint,
      bodyTint,
      strapTint,
      strapLow,
      buckle,
    ] = parts;
  } else if (parts.length === 15) {
    [
      design,
      face,
      bezel,
      body,
      strap,
      hands,
      marks,
      knob,
      led,
      logo,
      faceTint,
      bezelTint,
      bodyTint,
      strapTint,
      strapLow,
    ] = parts;
  } else if (parts.length === 14) {
    [
      design,
      face,
      bezel,
      body,
      strap,
      hands,
      marks,
      knob,
      led,
      logo,
      faceTint,
      bezelTint,
      bodyTint,
      strapTint,
    ] = parts;
  } else if (parts.length === 10) {
    [design, face, bezel, body, strap, hands, marks, knob, led, logo] = parts;
  } else if (parts.length === 9) {
    [design, face, bezel, body, strap, hands, marks, knob, led] = parts;
  } else if (parts.length === 8) {
    [design, face, bezel, body, strap, hands, marks, knob] = parts;
  } else if (parts.length === 5) {
    [design, face, bezel, body, strap] = parts;
  } else if (parts.length === 4) {
    [face, bezel, body, strap] = parts;
  } else {
    return null;
  }
  if (!face || !bezel || !body || !strap) return null;
  if (!DESIGNS.some((p) => p.id === design)) return null;
  if (!FACES.some((p) => p.id === face)) return null;
  if (!BEZELS.some((p) => p.id === bezel)) return null;
  if (!BODIES.some((p) => p.id === body)) return null;
  if (!STRAPS.some((p) => p.id === strap)) return null;
  if (!ACCENTS.some((p) => p.id === hands) && !isHexToken(hands)) hands = "auto";
  if (!ACCENTS.some((p) => p.id === marks) && !isHexToken(marks)) marks = "auto";
  if (!ACCENTS.some((p) => p.id === knob) && !isHexToken(knob)) knob = "auto";
  if (
    !LEDS.some((p) => p.id === led) &&
    !ACCENTS.some((p) => p.id === led) &&
    !isHexToken(led)
  ) {
    led = "auto";
  }
  if (!ACCENTS.some((p) => p.id === logo) && !isHexToken(logo)) logo = "auto";
  if (!ACCENTS.some((p) => p.id === buckle) && !isHexToken(buckle)) buckle = "auto";
  if (!isHexToken(faceTint)) faceTint = "auto";
  if (!isHexToken(bezelTint)) bezelTint = "auto";
  if (!isHexToken(bodyTint)) bodyTint = "auto";
  if (!isHexToken(strapTint)) strapTint = "auto";
  if (!isHexToken(strapLow)) strapLow = "auto";
  return {
    design,
    face,
    bezel,
    body,
    strap,
    hands,
    marks,
    knob,
    led,
    logo,
    buckle,
    faceTint: faceTint === "auto" ? undefined : faceTint,
    bezelTint: bezelTint === "auto" ? undefined : bezelTint,
    bodyTint: bodyTint === "auto" ? undefined : bodyTint,
    strapTint: strapTint === "auto" ? undefined : strapTint,
    strapLow: strapLow === "auto" ? undefined : strapLow,
  };
}

export function priceOf(b: Build) {
  return (
    BASE_PRICE +
    getDesign(b.design).upcharge +
    getFace(b.face).upcharge +
    getBezel(b.bezel).upcharge +
    getBody(b.body).upcharge +
    getStrap(b.strap).upcharge
  );
}

export function isHeroBuild(b: Build) {
  const sku = encodeSku(b);
  return PRESETS.some((p) => encodeSku(p.build) === sku);
}

export function shipCopy(b: Build) {
  return isHeroBuild(b)
    ? "Hero build. Ships in 2 days."
    : "Custom. Built when you lock it. 5–8 days.";
}

export function comboCount(sku: string) {
  let h = 2166136261;
  for (let i = 0; i < sku.length; i++) {
    h ^= sku.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return 4 + (h >>> 0) % 73;
}

export function clashWarnings(b: Build): string[] {
  const face = getFace(b.face);
  const bezel = getBezel(b.bezel);
  const hands = accentColor(b.hands, face.hands);
  const marks = accentColor(b.marks, face.indices);
  const out: string[] = [];
  const dist = (a: string, c: string) => {
    const n = (hex: string) => {
      const h = hex.replace("#", "");
      return [
        parseInt(h.slice(0, 2), 16),
        parseInt(h.slice(2, 4), 16),
        parseInt(h.slice(4, 6), 16),
      ] as const;
    };
    const [r1, g1, b1] = n(a);
    const [r2, g2, b2] = n(c);
    return Math.hypot(r1 - r2, g1 - g2, b1 - b2);
  };
  if (dist(face.dial, hands) < 40) {
    out.push("Hands sit too close to the dial. It will look blank on camera.");
  }
  if (dist(face.lcdBg, ledColor(b.led, face.lcdFg)) < 50) {
    out.push("LED contrast is low. Hard to read in noon sun.");
  }
  if (dist(face.dial, marks) < 28) {
    out.push("Markings sit too close to the dial. Hash marks will vanish.");
  }
  if (dist(face.dial, bezel.color) < 28) {
    out.push("Face and bezel are almost the same color. The silhouette disappears.");
  }
  return out;
}

export function randomBuild(avoidClash = true): Build {
  const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
  for (let i = 0; i < 12; i++) {
    const b: Build = {
      design: pick(DESIGNS).id,
      face: pick(FACES).id,
      bezel: pick(BEZELS).id,
      body: pick(BODIES).id,
      strap: pick(STRAPS).id,
    };
    if (!avoidClash || clashWarnings(b).length === 0) return b;
  }
  return PRESETS[0].build;
}

export type PartKind = "face" | "bezel" | "body" | "strap" | "hands" | "marks" | "knob" | "led" | "logo" | "buckle";

export function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function colorDist(a: string, b: string) {
  const x = hexToRgb(a);
  const y = hexToRgb(b);
  return Math.hypot(x.r - y.r, x.g - y.g, x.b - y.b);
}

export function readableOn(fg: string, bg: string) {
  if (colorDist(fg, bg) >= 90) return fg;
  return contrastInk(bg);
}

export function matchHex(hex: string, base: Build): Build {
  const raw = hex.replace("#", "").toLowerCase();
  const color = `#${raw}`;
  const ink = contrastInk(color).replace("#", "");
  const dial = shadeHex(color, -0.32).replace("#", "");
  return {
    ...base,
    faceTint: dial,
    bezelTint: raw,
    bodyTint: raw,
    strapTint: raw,
    strapLow: raw,
    hands: ink,
    marks: ink,
    logo: ink,
    knob: raw,
    led: raw,
    buckle: raw,
  };
}

export const DEFAULT_BUILD: Build = PRESETS[2].build;

export const NEUTRAL_BUILD: Build = {
  design: "tank",
  face: "stealth",
  bezel: "guard",
  body: "stealth",
  strap: "black",
  hands: "auto",
  marks: "auto",
  knob: "auto",
  led: "auto",
  logo: "auto",
  buckle: "auto",
};

export function shadeHex(hex: string, amount: number) {
  const { r, g, b } = hexToRgb(hex);
  const t = (c: number) => {
    const n =
      amount >= 0 ? c + (255 - c) * amount : c * (1 + amount);
    return Math.max(0, Math.min(255, Math.round(n)));
  };
  return `#${[t(r), t(g), t(b)]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("")}`;
}

export function contrastInk(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const l = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return l > 0.55 ? "#1a1916" : "#f3efe4";
}

export function partPreviewBuild(kind: PartKind, partId: string): Build {
  return { ...NEUTRAL_BUILD, [kind]: partId };
}

export function partSwatch(kind: PartKind, id: string) {
  if (kind === "face") return getFace(id).dial;
  if (kind === "bezel") return getBezel(id).color;
  if (kind === "body") return getBody(id).color;
  if (kind === "strap") return getStrap(id).top;
  if (kind === "led") return ledColor(id, "#c6e84a");
  if (kind === "logo") return accentColor(id, "#c8ccd4");
  return accentColor(id, "#c8ccd4");
}

export function partCatalog(kind: PartKind) {
  if (kind === "face")
    return FACES.map((p) => ({
      id: p.id,
      name: p.name,
      color: p.dial,
      color2: undefined as string | undefined,
      limited: p.limited,
      blurb: p.blurb,
    }));
  if (kind === "bezel")
    return BEZELS.map((p) => ({
      id: p.id,
      name: p.name,
      color: p.color,
      color2: undefined as string | undefined,
      limited: p.limited,
      blurb: p.blurb,
    }));
  if (kind === "body")
    return BODIES.map((p) => ({
      id: p.id,
      name: p.name,
      color: p.color,
      color2: undefined as string | undefined,
      limited: p.limited,
      blurb: p.blurb,
    }));
  if (kind === "strap")
    return STRAPS.map((p) => ({
      id: p.id,
      name: p.name,
      color: p.top,
      color2: p.bottom !== p.top ? p.bottom : undefined,
      limited: p.limited,
      blurb: p.blurb,
    }));
  if (kind === "led")
    return LEDS.filter((a) => a.id !== "auto").map((a) => ({
      id: a.id,
      name: a.name,
      color: a.color,
      color2: undefined as string | undefined,
      limited: undefined as boolean | undefined,
      blurb: `${a.name} LED. Lights the digital time.`,
    }));
  if (kind === "logo")
    return ACCENTS.filter((a) => a.id !== "auto").map((a) => ({
      id: a.id,
      name: a.name,
      color: a.color,
      color2: undefined as string | undefined,
      limited: undefined as boolean | undefined,
      blurb: `${a.name} PLAS/TICK print.`,
    }));
  const noun =
    kind === "hands"
      ? "hands"
      : kind === "marks"
        ? "markings"
        : kind === "buckle"
          ? "buckle"
          : "crown";
  return ACCENTS.filter((a) => a.id !== "auto").map((a) => ({
    id: a.id,
    name: a.name,
    color: a.color,
    color2: undefined as string | undefined,
    limited: undefined as boolean | undefined,
    blurb: `${a.name} ${noun}. Snap onto a watch you already own.`,
  }));
}

export function partName(kind: PartKind, id: string) {
  if (kind === "face") return `${getFace(id).name} face`;
  if (kind === "bezel") return `${getBezel(id).name} bezel`;
  if (kind === "body") return `${getBody(id).name} body`;
  if (kind === "strap") return getStrap(id).name;
  const accent = getAccent(id);
  if (kind === "hands") return `${accent.name} hands`;
  if (kind === "marks") return `${accent.name} markings`;
  if (kind === "led") {
    const led = LEDS.find((p) => p.id === id);
    return `${led?.name ?? accent.name} LED`;
  }
  if (kind === "logo") return `${accent.name} logo`;
  if (kind === "buckle") return `${accent.name} buckle`;
  return `${accent.name} crown`;
}

