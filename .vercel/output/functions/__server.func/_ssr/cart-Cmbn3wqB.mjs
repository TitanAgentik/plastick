import { i as __toESM } from "../_runtime.mjs";
import { b as isHeroBuild, s as EXTRA_PRICES, y as getStrap } from "./utils-C_uf36nf.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as itemLabel, i as cartTotal, o as itemPrice, r as Button, s as useCart } from "./router-C61syJw2.mjs";
import { t as WatchPreview } from "./watch-CHTR-Hu9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-Cmbn3wqB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CartPage() {
	const items = useCart((s) => s.items);
	const setQty = useCart((s) => s.setQty);
	const remove = useCart((s) => s.remove);
	const addPart = useCart((s) => s.addPart);
	const clear = useCart((s) => s.clear);
	const [locked, setLocked] = (0, import_react.useState)(false);
	const [ready, setReady] = (0, import_react.useState)(false);
	const total = cartTotal(items);
	(0, import_react.useEffect)(() => {
		setReady(true);
	}, []);
	const firstWatch = items.find((i) => i.kind === "watch");
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-[40vh]" });
	if (locked) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg px-4 py-20 text-center sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.2em] text-muted uppercase",
				children: "Claimed"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-5xl tracking-tight",
				children: "It's yours."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-muted",
				children: "Build card is in the box. Photograph it. Remix it. Spare parts ship in the same mailer if you added them."
			}),
			firstWatch && firstWatch.kind === "watch" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto mt-8 max-w-xs overflow-hidden rounded-lg border border-border bg-surface",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WatchPreview, {
					build: firstWatch.build,
					size: "card"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "border-t border-border p-3 font-mono text-xs text-muted",
					children: itemLabel(firstWatch)
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/build",
					children: "Build another"
				})
			})
		]
	});
	if (items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg px-4 py-20 text-center sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-5xl tracking-tight",
				children: "Bag is empty."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: "Lock a wrist first."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/build",
					children: "Build yours"
				})
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-5xl tracking-tight",
				children: "You're locking this build."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-8 divide-y divide-border border-y border-border",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-4 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, { item }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm",
								children: itemLabel(item)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: item.kind === "watch" && isHeroBuild(item.build) ? "Hero · 2 day ship" : item.kind === "watch" ? "Custom · 5–8 days" : "Module · ships with the watch"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "size-9 rounded-sm border border-border text-lg",
									onClick: () => setQty(item.id, item.qty - 1),
									"aria-label": "Decrease",
									children: "−"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-6 text-center font-mono text-sm tabular-nums",
									children: item.qty
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "size-9 rounded-sm border border-border text-lg",
									onClick: () => setQty(item.id, item.qty + 1),
									"aria-label": "Increase",
									children: "+"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "w-14 text-right font-mono text-sm tabular-nums",
							children: ["$", itemPrice(item)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-xs text-muted hover:text-fg",
							onClick: () => remove(item.id),
							children: "Remove"
						})
					]
				}, item.id))
			}),
			firstWatch && firstWatch.kind === "watch" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 rounded-lg border border-border p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: "Add a spare strap. That's how this trends."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					className: "mt-3",
					onClick: () => {
						addPart("strap", firstWatch.build.strap);
						toast("Spare strap added.");
					},
					children: [
						getStrap(firstWatch.build.strap).name,
						" · $",
						EXTRA_PRICES.strap
					]
				})]
			}) : null
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "h-fit rounded-lg border border-border bg-surface p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.16em] text-muted uppercase",
					children: "Lock-in"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 font-display text-4xl tabular-nums",
					children: ["$", total]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Guest checkout. No account until you want to save a wrist."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-5 flex flex-col gap-3",
					onSubmit: (e) => {
						e.preventDefault();
						clear();
						setLocked(true);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Name",
							name: "name"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Email",
							name: "email",
							type: "email"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Ship to",
							name: "address"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							size: "lg",
							className: "mt-2",
							children: ["Lock it in — $", total]
						})
					]
				})
			]
		})]
	});
}
function Field({ label, name, type = "text" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block text-xs text-muted",
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			required: true,
			name,
			type,
			className: "mt-1 h-11 w-full rounded-md border border-border bg-bg px-3 text-sm text-fg outline-none focus:ring-2 focus:ring-ring/70"
		})]
	});
}
function Thumb({ item }) {
	if (item.kind === "watch") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "size-16 overflow-hidden rounded-sm bg-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WatchPreview, {
			build: item.build,
			size: "thumb"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex size-16 items-center justify-center rounded-sm bg-bg font-mono text-[10px] text-muted",
		children: item.partKind
	});
}
//#endregion
export { CartPage as component };
