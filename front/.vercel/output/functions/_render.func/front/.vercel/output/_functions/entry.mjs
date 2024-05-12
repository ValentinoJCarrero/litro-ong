import { renderers } from './renderers.mjs';
import { manifest } from './manifest_B_hvPXug.mjs';
import * as serverEntrypointModule from '@astrojs/vercel/serverless/entrypoint';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./chunks/generic_CrncPk8D.mjs');
const _page1 = () => import('./chunks/index_CvMTpRNs.mjs');
const _page2 = () => import('./chunks/index_DHd4U-25.mjs');
const _page3 = () => import('./chunks/index_Dol8izMw.mjs');
const _page4 = () => import('./chunks/index_9Xr5yJKK.mjs');
const _page5 = () => import('./chunks/index_CN9lIstX.mjs');
const _page6 = () => import('./chunks/index_C2MqwzpC.mjs');
const _page7 = () => import('./chunks/index_C97vjgPO.mjs');
const _page8 = () => import('./chunks/index_CW9pvY6C.mjs');
const _page9 = () => import('./chunks/index_CxKW1tbm.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/aboutMe/index.astro", _page1],
    ["src/pages/communityKitchens/index.astro", _page2],
    ["src/pages/dashboardAdmin/newsCreate/index.astro", _page3],
    ["src/pages/dashboardAdmin/volunteers/index.astro", _page4],
    ["src/pages/dashboardAdmin/index.astro", _page5],
    ["src/pages/events/index.astro", _page6],
    ["src/pages/news/index.astro", _page7],
    ["src/pages/workshops/index.astro", _page8],
    ["src/pages/index.astro", _page9]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    renderers,
    middleware: onRequest
});
const _args = {
    "middlewareSecret": "37f5cd26-5796-4d8f-9565-aaad342dfbdd",
    "skewProtection": false
};
const _exports = serverEntrypointModule.createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
