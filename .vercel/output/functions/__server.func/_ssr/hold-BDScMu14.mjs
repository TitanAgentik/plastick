import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as Droplets, n as Wrench, o as Shield } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hold-BDScMu14.js
var import_jsx_runtime = require_jsx_runtime();
function HoldPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.2em] text-muted uppercase",
				children: "Specs in human"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-5xl tracking-tight sm:text-6xl",
				children: "How it holds up."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-muted",
				children: "Built for youth life, not a marketing dive rating. Here's what that actually means."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spec, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, {
							className: "size-5",
							strokeWidth: 1.75
						}),
						title: "50 meters. Rain, pool, shower.",
						body: "5 ATM. Swim laps. Get caught in it. Do not scuba. The LCD will fog if you boil it in a sauna — that's resin, not magic."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spec, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
							className: "size-5",
							strokeWidth: 1.75
						}),
						title: "Daily shock. Gym bag. Skate fall.",
						body: "42mm resin tank with corner bumpers. It is designed to survive a drop onto concrete from pocket height. It is not a military instrument and we will not pretend it is."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spec, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, {
							className: "size-5",
							strokeWidth: 1.75
						}),
						title: "Tool-free swaps.",
						body: "Straps and bezels click. Faces and bodies take the one included hex. Extra parts are cheap on purpose so one watch becomes a wardrobe."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-12 grid grid-cols-2 gap-x-4 gap-y-6 border-t border-border pt-8 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted",
						children: "Case"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1",
						children: "42mm resin, 12.4mm thick"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted",
						children: "Movement"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1",
						children: "Quartz analog-digital hybrid"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted",
						children: "Water"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1",
						children: "50m / 5 ATM"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted",
						children: "Weight"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1",
						children: "~52g depending on strap"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted",
						children: "Battery"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1",
						children: "~3 years, user-replaceable"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted",
						children: "Warranty"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1",
						children: "2 years on movement and case"
					})] })
				]
			})
		]
	});
}
function Spec({ icon, title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-surface p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-fg",
				children: icon
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl tracking-tight",
				children: title
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm leading-relaxed text-muted",
			children: body
		})]
	});
}
//#endregion
export { HoldPage as component };
