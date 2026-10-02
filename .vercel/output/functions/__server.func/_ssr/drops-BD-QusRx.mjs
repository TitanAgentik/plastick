import { g as getBezel, o as DROPS, s as EXTRA_PRICES, u as PRESETS, v as getFace, y as getStrap } from "./utils-C_uf36nf.mjs";
import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as Button, s as useCart } from "./router-C61syJw2.mjs";
import { t as WatchPreview } from "./watch-CHTR-Hu9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/drops-BD-QusRx.js
var import_jsx_runtime = require_jsx_runtime();
function DropsPage() {
	const addPart = useCart((s) => s.addPart);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.2em] text-muted uppercase",
				children: "Limited parts"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-5xl tracking-tight sm:text-6xl",
				children: "Today's drops."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-xl text-muted",
				children: "Real counts. When a part hits zero, it's gone. No fake countdown on evergreen SKUs. Snap it onto a watch you already own, or start a new build around it."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-4 lg:grid-cols-2",
				children: DROPS.map((d) => {
					const preview = d.kind === "face" ? {
						...PRESETS[0].build,
						face: d.partId
					} : d.kind === "bezel" ? {
						...PRESETS[2].build,
						bezel: d.partId
					} : d.kind === "strap" ? {
						...PRESETS[2].build,
						strap: d.partId
					} : PRESETS[0].build;
					const price = EXTRA_PRICES[d.kind];
					const sold = Math.round((1 - d.remaining / d.total) * 100);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "grid overflow-hidden rounded-lg border border-border bg-surface sm:grid-cols-[0.8fr_1.2fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-bg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WatchPreview, {
								build: preview,
								size: "card"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs tracking-[0.14em] text-muted uppercase",
									children: [
										d.kind,
										" · ends ",
										d.ends
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-2 font-display text-3xl",
									children: d.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted",
									children: d.blurb
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-1 overflow-hidden rounded-full bg-elevated",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full bg-fg",
											style: { width: `${Math.min(100, sold)}%` }
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 font-mono text-xs text-muted tabular-nums",
										children: [
											d.remaining,
											" / ",
											d.total,
											" left"
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-auto flex flex-wrap gap-2 pt-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										onClick: () => {
											addPart(d.kind, d.partId);
											toast(`${d.name} claimed.`);
										},
										children: ["Claim · $", price]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										variant: "outline",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/build",
											search: { sku: d.kind === "face" ? `${d.partId}.guard.stealth.black` : d.kind === "bezel" ? `nite.${d.partId}.stealth.black` : d.kind === "strap" ? `nite.guard.stealth.${d.partId}` : void 0 },
											children: "Build around it"
										})
									})]
								})
							]
						})]
					}, d.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-10 text-sm text-muted",
				children: [
					"Extra faces $",
					EXTRA_PRICES.face,
					" · bezels $",
					EXTRA_PRICES.bezel,
					" · bodies $",
					EXTRA_PRICES.body,
					" · straps $",
					EXTRA_PRICES.strap,
					".",
					" ",
					getFace("void").name,
					", ",
					getBezel("ice").name,
					", ",
					getStrap("candy").name,
					" ",
					"are this cycle's limiteds."
				]
			})
		]
	});
}
//#endregion
export { DropsPage as component };
