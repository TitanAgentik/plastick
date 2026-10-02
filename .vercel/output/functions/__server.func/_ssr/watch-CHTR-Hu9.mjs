import { i as __toESM } from "../_runtime.mjs";
import { _ as getBody, g as getBezel, t as cn, v as getFace, y as getStrap } from "./utils-C_uf36nf.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/watch-CHTR-Hu9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function n(v) {
	return Math.round(v * 1e3) / 1e3;
}
function fillFor(color, finish, id) {
	if (finish === "chrome") return `url(#${id}-chrome)`;
	if (finish === "jelly") return `url(#${id}-jelly)`;
	if (finish === "frost") return `url(#${id}-frost)`;
	return color;
}
function WatchPreview({ build, className, size = "hero" }) {
	const id = `w${(0, import_react.useId)().replace(/:/g, "")}`;
	const face = getFace(build.face);
	const bezel = getBezel(build.bezel);
	const body = getBody(build.body);
	const strap = getStrap(build.strap);
	const jellyOp = body.finish === "jelly" || body.finish === "frost" ? .72 : 1;
	const bezelOp = bezel.finish === "jelly" ? .78 : bezel.finish === "frost" ? .82 : 1;
	const strapOp = strap.finish === "jelly" ? .7 : strap.finish === "frost" ? .8 : 1;
	const cx = 120;
	const cy = 152;
	const hour = (10 + 10 / 60) / 12 * Math.PI * 2;
	const minute = 10 / 60 * Math.PI * 2;
	const hx = n(cx + Math.sin(hour) * 28);
	const hy = n(cy - Math.cos(hour) * 28);
	const mx = n(cx + Math.sin(minute) * 40);
	const my = n(cy - Math.cos(minute) * 40);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 240 400",
		className: cn("pointer-events-none h-full w-full", className),
		role: "img",
		"aria-label": "RIX tank watch preview",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: `${id}-chrome`,
					x1: "0",
					y1: "0",
					x2: "1",
					y2: "1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "#f4f6f8"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "45%",
							stopColor: "#b8bcc4"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "#7a8088"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: `${id}-jelly`,
					x1: "0",
					y1: "0",
					x2: "0",
					y2: "1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "#ffffff",
							stopOpacity: "0.45"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "40%",
							stopColor: "#ffffff",
							stopOpacity: "0.08"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "#000000",
							stopOpacity: "0.18"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: `${id}-frost`,
					x1: "0",
					y1: "0",
					x2: "0",
					y2: "1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "#ffffff",
						stopOpacity: "0.35"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "#ffffff",
						stopOpacity: "0.05"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: `${id}-glass`,
					x1: "0",
					y1: "0",
					x2: "0",
					y2: "1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "#ffffff",
						stopOpacity: "0.22"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "55%",
						stopColor: "#ffffff",
						stopOpacity: "0"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("filter", {
					id: `${id}-soft`,
					x: "-20%",
					y: "-20%",
					width: "140%",
					height: "140%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feDropShadow", {
						dx: "0",
						dy: "6",
						stdDeviation: "6",
						floodColor: "#000",
						floodOpacity: "0.45"
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				opacity: strapOp,
				filter: `url(#${id}-soft)`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "78",
						y: "14",
						width: "84",
						height: "128",
						rx: strap.finish === "nato" ? 6 : 18,
						fill: strap.top
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "78",
						y: "164",
						width: "84",
						height: "190",
						rx: strap.finish === "nato" ? 6 : 18,
						fill: strap.bottom
					}),
					strap.finish === "nato" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [[
						28,
						46,
						64,
						82,
						100
					].map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "78",
						y,
						width: "84",
						height: "5",
						fill: "#000",
						opacity: "0.28"
					}, `t${y}`)), [
						210,
						230,
						250,
						270,
						290,
						310
					].map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "78",
						y,
						width: "84",
						height: "5",
						fill: "#000",
						opacity: "0.28"
					}, `b${y}`))] }) : null,
					strap.finish === "jelly" || strap.finish === "frost" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "78",
						y: "14",
						width: "84",
						height: "128",
						rx: "18",
						fill: `url(#${id}-jelly)`
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "78",
						y: "164",
						width: "84",
						height: "190",
						rx: "18",
						fill: `url(#${id}-jelly)`
					})] }) : null,
					[
						236,
						256,
						276,
						296,
						316
					].map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "110",
						y,
						width: "20",
						height: "7",
						rx: "3",
						fill: "#0a0a0a",
						opacity: "0.35"
					}, y)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "72",
						y: "338",
						width: "96",
						height: "18",
						rx: "4",
						fill: strap.hardware
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "92",
						y: "312",
						width: "56",
						height: "12",
						rx: "3",
						fill: strap.hardware,
						opacity: "0.9"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				opacity: jellyOp,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "46",
						y: "78",
						width: "148",
						height: "148",
						rx: "34",
						fill: body.bumper
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "54",
						y: "86",
						width: "132",
						height: "132",
						rx: "30",
						fill: fillFor(body.color, body.finish, id)
					}),
					(body.finish === "jelly" || body.finish === "frost") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "54",
						y: "86",
						width: "132",
						height: "132",
						rx: "30",
						fill: body.color,
						opacity: "0.55"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "54",
						y: "86",
						width: "132",
						height: "132",
						rx: "30",
						fill: `url(#${id}-jelly)`,
						opacity: body.finish === "opaque" ? .12 : .55
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "184",
				y: "118",
				width: "12",
				height: "22",
				rx: "3",
				fill: body.bumper
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "186",
				y: "148",
				width: "14",
				height: "16",
				rx: "3",
				fill: bezel.color
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "184",
				y: "172",
				width: "12",
				height: "22",
				rx: "3",
				fill: body.bumper
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				opacity: bezelOp,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "62",
						y: "94",
						width: "116",
						height: "116",
						rx: "26",
						fill: fillFor(bezel.color, bezel.finish, id)
					}),
					(bezel.finish === "jelly" || bezel.finish === "frost") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "62",
						y: "94",
						width: "116",
						height: "116",
						rx: "26",
						fill: bezel.color,
						opacity: "0.5"
					}),
					bezel.texture === "ribbed" || bezel.texture === "guard" ? [
						0,
						90,
						180,
						270
					].map((deg) => {
						const r = (deg - 90) * Math.PI / 180;
						const x = n(cx + Math.cos(r) * 54);
						const y = n(cy + Math.sin(r) * 54);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: x - 7,
							y: y - 4,
							width: "14",
							height: "8",
							rx: "1",
							fill: bezel.highlight,
							opacity: "0.55"
						}, deg);
					}) : null,
					[
						[74, 106],
						[154, 106],
						[74, 186],
						[154, 186]
					].map(([x, y]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: x,
						cy: y,
						r: "3.2",
						fill: bezel.highlight,
						stroke: "#0a0a0a",
						strokeOpacity: "0.35",
						strokeWidth: "0.6"
					}, `${x}-${y}`))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "74",
				y: "106",
				width: "92",
				height: "92",
				rx: "20",
				fill: face.ring
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "78",
				y: "110",
				width: "84",
				height: "84",
				rx: "18",
				fill: face.dial
			}),
			face.graphic === "grid" && [
				122,
				140,
				158
			].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: x,
				y1: "118",
				x2: x,
				y2: "186",
				stroke: face.indices,
				strokeOpacity: "0.18",
				strokeWidth: "0.8"
			}, x)),
			face.graphic === "sun" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx,
				cy,
				r: "28",
				fill: "none",
				stroke: face.indices,
				strokeOpacity: "0.2",
				strokeWidth: "8"
			}),
			face.graphic === "void" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M96 140 A28 28 0 1 1 144 168",
				fill: "none",
				stroke: face.indices,
				strokeWidth: "3",
				strokeLinecap: "round",
				opacity: "0.55"
			}),
			[
				0,
				1,
				2,
				3,
				4,
				5,
				6,
				7,
				8,
				9,
				10,
				11
			].map((h) => {
				const a = h / 12 * Math.PI * 2;
				const inner = h % 3 === 0 ? 32 : 36;
				const outer = 40;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: n(cx + Math.sin(a) * inner),
					y1: n(cy - Math.cos(a) * inner),
					x2: n(cx + Math.sin(a) * outer),
					y2: n(cy - Math.cos(a) * outer),
					stroke: face.indices,
					strokeWidth: h % 3 === 0 ? 2.4 : 1.1,
					strokeLinecap: "round",
					opacity: h % 3 === 0 ? .95 : .55
				}, h);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "96",
				y: "174",
				width: "48",
				height: "14",
				rx: "3",
				fill: face.lcdBg
			}),
			size !== "thumb" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "120",
				y: "184.5",
				textAnchor: "middle",
				fill: face.lcdFg,
				fontSize: "8",
				fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
				fontWeight: "700",
				children: "10:10"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: cx,
				y1: cy,
				x2: hx,
				y2: hy,
				stroke: face.hands,
				strokeWidth: "4.2",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: cx,
				y1: cy,
				x2: mx,
				y2: my,
				stroke: face.hands,
				strokeWidth: "2.6",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx,
				cy,
				r: "4.2",
				fill: face.hands
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx,
				cy,
				r: "1.8",
				fill: face.dial
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "78",
				y: "110",
				width: "84",
				height: "84",
				rx: "18",
				fill: `url(#${id}-glass)`
			})
		]
	});
}
//#endregion
export { WatchPreview as t };
