import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/support-DnpmgY1R.js
var import_jsx_runtime = require_jsx_runtime();
var FAQS = [
	{
		q: "How long does it take?",
		a: "Hero prebuilds (the 12 vibes) ship in 2 days from the US. Custom combos are assembled to order, 5–8 days. We tell you which one you have before you lock it."
	},
	{
		q: "Can I swap parts after I buy?",
		a: "Yes. Straps and bezels are tool-free. Faces and bodies use the hex in the box. Spare modules start at $16."
	},
	{
		q: "What's the return policy?",
		a: "Unused modules, 30 days. A built watch, 14 days if unworn with tags. We don't take back a wrist that's been in the pool."
	},
	{
		q: "Is this a smartwatch?",
		a: "No. Quartz. Analog hands plus an LCD. No app, no Bluetooth, no subscription. It will still work in 2032."
	},
	{
		q: "Where do you ship?",
		a: "United States, Canada, UK, and EU for launch. Duties calculated at checkout where required."
	},
	{
		q: "Will you restock a sold-out drop?",
		a: "Maybe a color language, never the exact limited part. That's the point."
	}
];
function SupportPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.2em] text-muted uppercase",
				children: "Support"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-5xl tracking-tight sm:text-6xl",
				children: "Straight answers."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 divide-y divide-border border-y border-border",
				children: FAQS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "group py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
						className: "cursor-pointer list-none font-display text-xl tracking-tight [&::-webkit-details-marker]:hidden",
						children: f.q
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted",
						children: f.a
					})]
				}, f.q))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-sm text-muted",
				children: "Help: support@rix.watch · we answer in a day, not a bot."
			})
		]
	});
}
//#endregion
export { SupportPage as component };
