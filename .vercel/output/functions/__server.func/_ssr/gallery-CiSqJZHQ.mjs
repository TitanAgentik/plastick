import { h as encodeSku, l as GALLERY } from "./utils-C_uf36nf.mjs";
import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as WatchPreview } from "./watch-CHTR-Hu9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gallery-CiSqJZHQ.js
var import_jsx_runtime = require_jsx_runtime();
function GalleryPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.2em] text-muted uppercase",
				children: "Real builds"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-5xl tracking-tight sm:text-6xl",
				children: "Steal this wrist."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-xl text-muted",
				children: "The catalog is other people's combos. Remix any of them. Unique URL included."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4",
				children: GALLERY.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/build",
					search: { sku: encodeSku(g.build) },
					className: "overflow-hidden rounded-lg border border-border bg-surface",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-[3/4] bg-bg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WatchPreview, {
							build: g.build,
							size: "card"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-border p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm",
								children: ["@", g.handle]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-xs text-muted",
								children: g.caption
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-mono text-[11px] text-subtle",
								children: [g.remixes, " remixes"]
							})
						]
					})]
				}, g.handle + encodeSku(g.build)))
			})
		]
	});
}
//#endregion
export { GalleryPage as component };
