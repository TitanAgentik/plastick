import { a as DEFAULT_BUILD, h as encodeSku, m as decodeSku, u as PRESETS } from "./utils-C_uf36nf.mjs";
import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Route$5 } from "./router-C61syJw2.mjs";
import { t as Configurator } from "./configurator-DrjB0tbx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/build-CW3fFrgz.js
var import_jsx_runtime = require_jsx_runtime();
function BuildPage() {
	const { sku } = Route$5.useSearch();
	const fromSku = decodeSku(sku);
	const fromPreset = PRESETS.find((p) => p.id === sku);
	const initial = fromSku ?? fromPreset?.build ?? DEFAULT_BUILD;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "py-8 sm:py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Configurator, { initial }, encodeSku(initial))
	});
}
//#endregion
export { BuildPage as component };
