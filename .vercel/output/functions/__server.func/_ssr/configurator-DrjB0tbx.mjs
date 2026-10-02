import { i as __toESM } from "../_runtime.mjs";
import { C as randomBuild, S as priceOf, _ as getBody, c as FACES, d as STRAPS, f as clashWarnings, g as getBezel, h as encodeSku, i as COMBO_TOTAL, n as BEZELS, p as comboCount, r as BODIES, s as EXTRA_PRICES, t as cn, u as PRESETS, v as getFace, w as shipCopy, x as matchHex, y as getStrap } from "./utils-C_uf36nf.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Check, i as Shuffle, s as Share2, u as Copy } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as Button, s as useCart } from "./router-C61syJw2.mjs";
import { t as WatchPreview } from "./watch-CHTR-Hu9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/configurator-DrjB0tbx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STEPS = [
	"Face",
	"Bezel",
	"Body",
	"Strap"
];
function Configurator({ initial }) {
	const [build, setBuild] = (0, import_react.useState)(initial);
	const [step, setStep] = (0, import_react.useState)("Face");
	const [copied, setCopied] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const addWatch = useCart((s) => s.addWatch);
	const addPart = useCart((s) => s.addPart);
	const sku = encodeSku(build);
	const price = priceOf(build);
	const warnings = (0, import_react.useMemo)(() => clashWarnings(build), [build]);
	const n = comboCount(sku);
	const face = getFace(build.face);
	const bezel = getBezel(build.bezel);
	const body = getBody(build.body);
	const strap = getStrap(build.strap);
	function apply(next) {
		setBuild(next);
		navigate({
			to: "/build",
			search: { sku: encodeSku(next) },
			replace: true
		});
	}
	async function share() {
		const url = `${window.location.origin}/build?sku=${sku}`;
		try {
			if (navigator.share) {
				await navigator.share({
					title: "Steal this RIX",
					text: `RIX · ${sku}`,
					url
				});
				return;
			}
		} catch {}
		await navigator.clipboard.writeText(url);
		setCopied(true);
		toast("Link copied. Remix this wrist.");
		setTimeout(() => setCopied(false), 1600);
	}
	function lockIn() {
		addWatch(build);
		toast("Locked. It's in your bag.");
		navigate({ to: "/cart" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-6xl gap-8 px-4 pb-28 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative overflow-hidden rounded-xl bg-surface",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute top-4 left-4 z-10 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-sm bg-bg/80 px-2 py-1 font-mono text-[11px] text-muted",
								children: sku
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-sm bg-bg/80 px-2 py-1 text-[11px] text-muted",
								children: [n, " people built this combo"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto aspect-[3/4] max-h-[72dvh] w-full max-w-md",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WatchPreview, { build })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: shipCopy(build)
					}),
					warnings.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 rounded-md border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-fg",
						children: warnings[0]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-[0.18em] text-muted uppercase",
						children: "Build yours"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 font-display text-4xl tracking-tight sm:text-5xl",
						children: "Mix the four layers."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2 overflow-x-auto pb-1",
						children: PRESETS.map((p) => {
							const on = encodeSku(p.build) === sku;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => apply(p.build),
								className: cn("h-9 shrink-0 rounded-full border px-3 text-xs transition-colors duration-150", on ? "border-fg bg-fg text-bg" : "border-border text-muted hover:text-fg"),
								children: p.name
							}, p.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => apply(randomBuild()),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shuffle, { className: "size-3.5" }), "Shuffle"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "inline-flex h-9 cursor-pointer items-center gap-2 rounded-sm border border-border px-3 text-xs text-muted hover:text-fg",
								children: ["Match my fit", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "color",
									className: "size-4 cursor-pointer border-0 bg-transparent p-0",
									"aria-label": "Pick a color from your fit",
									onChange: (e) => apply(matchHex(e.target.value))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: () => void share(),
								children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-3.5" }), "Steal this build"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex border-b border-border",
						children: STEPS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setStep(s),
							className: cn("relative h-11 flex-1 text-sm transition-colors duration-150", step === s ? "text-fg" : "text-muted hover:text-fg"),
							children: [s, step === s ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-x-0 -bottom-px h-px bg-fg" }) : null]
						}, s))
					}),
					step === "Face" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartGrid, {
						label: face.name,
						blurb: face.blurb,
						items: FACES.map((p) => ({
							id: p.id,
							name: p.name,
							color: p.dial,
							limited: p.limited,
							selected: build.face === p.id,
							onSelect: () => apply({
								...build,
								face: p.id
							})
						}))
					}),
					step === "Bezel" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartGrid, {
						label: bezel.name,
						blurb: bezel.blurb,
						items: BEZELS.map((p) => ({
							id: p.id,
							name: p.name,
							color: p.color,
							limited: p.limited,
							selected: build.bezel === p.id,
							onSelect: () => apply({
								...build,
								bezel: p.id
							})
						}))
					}),
					step === "Body" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartGrid, {
						label: body.name,
						blurb: body.blurb,
						items: BODIES.map((p) => ({
							id: p.id,
							name: p.name,
							color: p.color,
							limited: p.limited,
							selected: build.body === p.id,
							onSelect: () => apply({
								...build,
								body: p.id
							})
						}))
					}),
					step === "Strap" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartGrid, {
						label: strap.name,
						blurb: strap.blurb,
						items: STRAPS.map((p) => ({
							id: p.id,
							name: p.name,
							color: p.top,
							color2: p.bottom,
							limited: p.limited,
							selected: build.strap === p.id,
							onSelect: () => apply({
								...build,
								strap: p.id
							})
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden items-center justify-between gap-4 border-t border-border pt-4 lg:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-3xl tabular-nums",
							children: ["$", price]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [COMBO_TOTAL.toLocaleString(), " combos. Extra parts after purchase."]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							onClick: lockIn,
							children: "Lock this wrist"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-[0.16em] text-muted uppercase",
								children: "After purchase"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted",
								children: [
									"Keep the body. Swap the rest. Spare straps $",
									EXTRA_PRICES.strap,
									", bezels $",
									EXTRA_PRICES.bezel,
									", faces $",
									EXTRA_PRICES.face,
									"."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								className: "mt-3",
								onClick: () => {
									addPart("strap", build.strap);
									toast("Spare strap added.");
								},
								children: [
									"Add a spare ",
									strap.name,
									" · $",
									EXTRA_PRICES.strap
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg/95 px-4 py-3 backdrop-blur-md lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-2xl leading-none tabular-nums",
						children: ["$", price]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted",
						children: sku
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "icon",
							"aria-label": "Copy build link",
							onClick: () => void share(),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: lockIn,
							children: "Lock it in"
						})]
					})]
				})
			})
		]
	});
}
function PartGrid({ label, blurb, items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-3 flex items-baseline justify-between gap-3",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-fg",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-muted",
				children: [" — ", blurb]
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-4 gap-2 sm:grid-cols-5",
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: item.onSelect,
			className: cn("flex flex-col items-center gap-2 rounded-md border p-2 pt-3 transition-colors duration-150", item.selected ? "border-fg bg-elevated" : "border-border hover:border-muted"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "size-10 overflow-hidden rounded-full border border-border",
				style: { background: item.color2 ? `linear-gradient(180deg, ${item.color} 50%, ${item.color2} 50%)` : item.color }
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "w-full truncate text-center text-[11px] text-muted",
				children: [item.name, item.limited ? " · drop" : ""]
			})]
		}, item.id))
	})] });
}
var GALLERY_N = 2104;
function ProofStrip() {
	const bits = [
		`${COMBO_TOTAL.toLocaleString()} combos`,
		"Build in under a minute",
		"50m / rain, pool, gym",
		`${GALLERY_N} wrists in the gallery`
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "border-y border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto grid max-w-6xl grid-cols-2 sm:grid-cols-4",
			children: bits.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-4 py-4 text-center text-xs tracking-[0.12em] text-muted uppercase sm:py-5",
				children: b
			}, b))
		})
	});
}
//#endregion
export { ProofStrip as n, Configurator as t };
