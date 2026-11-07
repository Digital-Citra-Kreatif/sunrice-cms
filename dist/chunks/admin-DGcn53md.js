const g = globalThis.Sunrice;
if (!g) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const C = g.modules["react/jsx-runtime"], p = globalThis.Sunrice;
if (!p) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const b = p.modules["@inertiajs/react"], d = 3;
function c() {
  const e = globalThis.Sunrice;
  if (!e)
    throw new Error("[sunrice] This script runs outside the Sunrice admin panel (window.Sunrice is missing).");
  return e;
}
function S(e) {
  const n = c();
  if (n.version !== d)
    throw new Error(`[sunrice] This plugin was built for admin runtime ${d}, but the panel runs ${n.version}. Rebuild it with a matching @imajiner/admin-sdk.`);
  for (const [t, i] of Object.entries(e.pages ?? {}))
    n.registerPage(t, i);
  for (const [t, i] of Object.entries(e.lazyPages ?? {}))
    n.registerPageLoader(t, i);
}
function a(e, n = {}) {
  return c().t(e, n);
}
function x(e = "") {
  return c().adminUrl(e);
}
function $(e) {
  return { draft: a("Draft"), scheduled: a("Scheduled"), published: a("Live") }[e];
}
function P(e, n) {
  if (!e) return "—";
  const t = new Date(e);
  return Number.isNaN(t.getTime()) ? "—" : t.toLocaleString(document.documentElement.lang || void 0, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
}
function j(e, n = /* @__PURE__ */ new Date()) {
  const t = e ? new Date(e) : null;
  if (t && !Number.isNaN(t.getTime()) && t > n) return t;
  const i = new Date(n);
  return i.setDate(i.getDate() + 1), i.setMinutes(0, 0, 0), i;
}
function F(e) {
  const n = (t) => String(t).padStart(2, "0");
  return `${e.getFullYear()}-${n(e.getMonth() + 1)}-${n(e.getDate())}T${n(e.getHours())}:${n(e.getMinutes())}`;
}
function L(e, n, t, i = Date.now()) {
  const r = n === "" ? null : new Date(n);
  if (r === null || Number.isNaN(r.getTime())) return { action: "now", at: null };
  const s = (w) => Math.floor(w / 6e4), l = t ? new Date(t).getTime() : null;
  if (l !== null && s(l) === s(r.getTime()) && (e !== "draft" || r.getTime() <= i)) return { action: "now", at: null };
  const m = r.toISOString();
  return r.getTime() > i ? { action: "schedule", at: m } : { action: e === "draft" ? "backdate" : "redate", at: m };
}
let u = {};
function E(e) {
  u = e ?? {};
}
function M(e, n) {
  if (n === void 0 && u[e]) return u[e];
  try {
    return new Intl.DisplayNames(n ? [n] : void 0, { type: "language" }).of(e.replace("_", "-")) ?? e;
  } catch {
    return e;
  }
}
function f(e) {
  return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function O(e, n, t, i) {
  const r = f(n), s = e === r || e.startsWith(`${r}-`) && /^\d+$/.test(e.slice(r.length + 1));
  return i && r !== "" && s ? f(t) : e;
}
function U(e, n, t) {
  return !e || n.trim() === "" || n.trim() === e ? null : t ? "redirects" : "breaks";
}
function y(e) {
  return e.trashed ? "trashed" : e.status === "draft" ? e.everPublished ? "offline" : "draft" : e.status === "scheduled" ? e.hasUnpublishedChanges ? "scheduled-changes" : "scheduled" : e.hasUnpublishedChanges ? "live-changes" : "live";
}
function T(e) {
  return e === "live-changes" || e === "scheduled-changes";
}
function z(e, n) {
  const t = T(e);
  return {
    viewLive: n.liveUrl && (e === "live" || e === "live-changes"),
    compare: t,
    preview: n.pages && e !== "trashed" && e !== "live",
    discard: t && n.canUpdate
  };
}
function k(e) {
  return e.status !== "draft" && e.changes === !0;
}
const o = /* @__PURE__ */ new Map();
function v(e, n) {
  o.has(e) && console.warn(`[sunrice] The field input "${e}" was registered twice; the second registration wins.`), o.set(e, n);
}
function R(e) {
  return o.get(e);
}
function N() {
  const e = globalThis, n = { version: 1, registerFieldInput: v };
  e.SunriceCms = n;
  const t = e.SunriceCmsQueue ?? [], i = (r) => {
    try {
      r(n);
    } catch (s) {
      console.error("[sunrice] A queued SunriceCms call failed.", s);
    }
  };
  t.splice(0).forEach(i), t.push = (...r) => (r.forEach(i), 0), e.SunriceCmsQueue = t;
}
N();
function D(e) {
  return function(t) {
    const i = b.usePage().props.cms;
    return E(i?.locales), /* @__PURE__ */ C.jsx(e, { ...t });
  };
}
const h = () => (__sunricePreload(["./ui-BzV6lfEf.js","./triangle-alert-CDOdGjCe.js","./Confirm-DstGOW0Y.js","./FieldInput-jUHNFEOX.js","./EntriesPicker-DJBCVoZO.js","./TermsPicker-Dr4AsQhf.js","./check-Cvm5ZpBE.js","./search-Dj4j-7U0.js","./FieldError-BL_8-QnZ.js","./plus-Cn7AaagX.js","./chevron-right-1BqdTUoX.js","./link-2-HefnCw8K.js","./tags-RK9FkZvx.js","./copy-D11fpdhs.js","./loader-circle-CjVcQmAV.js"]), import("./Edit-Dkpr72uA.js")), I = {
  "Cms/Blueprints/Index": () => (__sunricePreload(["./FieldError-BL_8-QnZ.js","./StructureList-BkUiVoTK.js","./ui-BzV6lfEf.js","./Confirm-DstGOW0Y.js","./plus-Cn7AaagX.js"]), import("./Index-D9gurQEs.js")),
  "Cms/Blueprints/Edit": h,
  "Cms/Fieldsets/Index": () => (__sunricePreload(["./FieldError-BL_8-QnZ.js","./StructureList-BkUiVoTK.js","./ui-BzV6lfEf.js","./Confirm-DstGOW0Y.js","./plus-Cn7AaagX.js"]), import("./Index-BhbHSEvA.js")),
  // A fieldset is edited like a blueprint.
  "Cms/Fieldsets/Edit": h,
  "Cms/Entries/Index": () => (__sunricePreload(["./ui-BzV6lfEf.js","./Confirm-DstGOW0Y.js","./TermsPicker-Dr4AsQhf.js","./check-Cvm5ZpBE.js","./search-Dj4j-7U0.js","./ellipsis-BA6pVhi_.js","./tree-BdgFD7PS.js","./download-O5RUS1Kt.js","./plus-Cn7AaagX.js","./rotate-ccw-BxpZ9siY.js","./chevron-left-DDGNQO3o.js","./chevron-right-1BqdTUoX.js"]), import("./Index-C6piDyzx.js")),
  "Cms/Entries/Edit": () => (__sunricePreload(["./ui-BzV6lfEf.js","./Confirm-DstGOW0Y.js","./seo-1LJEfdc-.js","./FieldError-BL_8-QnZ.js","./TermsPicker-Dr4AsQhf.js","./check-Cvm5ZpBE.js","./search-Dj4j-7U0.js","./EntriesPicker-DJBCVoZO.js","./undo-2-B1yF9-es.js","./languages-CFcZTlB6.js","./FieldInput-jUHNFEOX.js","./plus-Cn7AaagX.js","./chevron-right-1BqdTUoX.js","./SlugNote-SunZcSpc.js","./rotate-ccw-BxpZ9siY.js","./link-2-HefnCw8K.js","./copy-D11fpdhs.js","./layout-template-Btp-VVsS.js","./loader-circle-CjVcQmAV.js","./external-link-Mqd1ZxLN.js"]), import("./Edit-qG61QIWf.js")),
  "Cms/Listing/Edit": () => (__sunricePreload(["./PageValuesForm-CijcuDIO.js","./ui-BzV6lfEf.js","./FieldInput-jUHNFEOX.js","./EntriesPicker-DJBCVoZO.js","./TermsPicker-Dr4AsQhf.js","./check-Cvm5ZpBE.js","./search-Dj4j-7U0.js","./FieldError-BL_8-QnZ.js","./plus-Cn7AaagX.js","./Confirm-DstGOW0Y.js","./chevron-right-1BqdTUoX.js","./languages-CFcZTlB6.js","./VersionConflict-BSP25GQG.js","./seo-1LJEfdc-.js","./UnsavedNote-CPr2vqIN.js","./external-link-Mqd1ZxLN.js","./loader-circle-CjVcQmAV.js","./settings-2-B2-hLaF4.js","./layout-template-Btp-VVsS.js"]), import("./Edit-oeo8UqPb.js")),
  "Cms/Terms/Index": () => (__sunricePreload(["./ui-BzV6lfEf.js","./Confirm-DstGOW0Y.js","./tree-BdgFD7PS.js","./settings-2-B2-hLaF4.js","./layout-template-Btp-VVsS.js","./plus-Cn7AaagX.js","./search-Dj4j-7U0.js","./external-link-Mqd1ZxLN.js","./rotate-ccw-BxpZ9siY.js","./ellipsis-BA6pVhi_.js","./pencil-BROVvpkc.js"]), import("./Index-BC9mb-wn.js")),
  "Cms/TaxonomyIndex/Edit": () => (__sunricePreload(["./ui-BzV6lfEf.js","./PageValuesForm-CijcuDIO.js","./FieldInput-jUHNFEOX.js","./EntriesPicker-DJBCVoZO.js","./TermsPicker-Dr4AsQhf.js","./check-Cvm5ZpBE.js","./search-Dj4j-7U0.js","./FieldError-BL_8-QnZ.js","./plus-Cn7AaagX.js","./Confirm-DstGOW0Y.js","./chevron-right-1BqdTUoX.js","./languages-CFcZTlB6.js","./VersionConflict-BSP25GQG.js","./seo-1LJEfdc-.js","./UnsavedNote-CPr2vqIN.js","./external-link-Mqd1ZxLN.js","./loader-circle-CjVcQmAV.js","./settings-2-B2-hLaF4.js","./layout-template-Btp-VVsS.js"]), import("./Edit-B6nShs3O.js")),
  "Cms/Translations/Edit": () => (__sunricePreload(["./ui-BzV6lfEf.js","./FieldError-BL_8-QnZ.js","./UnsavedNote-CPr2vqIN.js","./loader-circle-CjVcQmAV.js","./external-link-Mqd1ZxLN.js"]), import("./Edit-B4jDppSJ.js")),
  "Cms/Terms/Edit": () => (__sunricePreload(["./ui-BzV6lfEf.js","./FieldError-BL_8-QnZ.js","./FieldInput-jUHNFEOX.js","./EntriesPicker-DJBCVoZO.js","./TermsPicker-Dr4AsQhf.js","./check-Cvm5ZpBE.js","./search-Dj4j-7U0.js","./plus-Cn7AaagX.js","./Confirm-DstGOW0Y.js","./chevron-right-1BqdTUoX.js","./languages-CFcZTlB6.js","./SlugNote-SunZcSpc.js","./seo-1LJEfdc-.js","./VersionConflict-BSP25GQG.js","./UnsavedNote-CPr2vqIN.js","./external-link-Mqd1ZxLN.js","./loader-circle-CjVcQmAV.js","./layout-template-Btp-VVsS.js"]), import("./Edit-Bq1be4X1.js")),
  "Cms/Globals/Edit": () => (__sunricePreload(["./ui-BzV6lfEf.js","./languages-CFcZTlB6.js","./FieldInput-jUHNFEOX.js","./EntriesPicker-DJBCVoZO.js","./TermsPicker-Dr4AsQhf.js","./check-Cvm5ZpBE.js","./search-Dj4j-7U0.js","./FieldError-BL_8-QnZ.js","./plus-Cn7AaagX.js","./Confirm-DstGOW0Y.js","./chevron-right-1BqdTUoX.js","./VersionConflict-BSP25GQG.js","./UnsavedNote-CPr2vqIN.js","./loader-circle-CjVcQmAV.js","./settings-2-B2-hLaF4.js","./layout-template-Btp-VVsS.js"]), import("./Edit-D7w4o4aK.js")),
  "Cms/Menus/Edit": () => (__sunricePreload(["./ui-BzV6lfEf.js","./EntriesPicker-DJBCVoZO.js","./TermsPicker-Dr4AsQhf.js","./check-Cvm5ZpBE.js","./search-Dj4j-7U0.js","./FieldError-BL_8-QnZ.js","./VersionConflict-BSP25GQG.js","./Confirm-DstGOW0Y.js","./tree-BdgFD7PS.js","./UnsavedNote-CPr2vqIN.js","./plus-Cn7AaagX.js","./tags-RK9FkZvx.js","./link-2-HefnCw8K.js","./loader-circle-CjVcQmAV.js","./settings-2-B2-hLaF4.js","./pencil-BROVvpkc.js"]), import("./Edit-Cq814J9t.js")),
  "Cms/Comments/Index": () => (__sunricePreload(["./ui-BzV6lfEf.js","./Confirm-DstGOW0Y.js","./FieldError-BL_8-QnZ.js","./search-Dj4j-7U0.js","./check-Cvm5ZpBE.js","./undo-2-B1yF9-es.js","./rotate-ccw-BxpZ9siY.js","./external-link-Mqd1ZxLN.js","./pencil-BROVvpkc.js","./chevron-left-DDGNQO3o.js","./chevron-right-1BqdTUoX.js"]), import("./Index-CRsMYgxi.js")),
  "Cms/Seo/Edit": () => (__sunricePreload(["./ui-BzV6lfEf.js","./FieldError-BL_8-QnZ.js","./triangle-alert-CDOdGjCe.js"]), import("./Edit-BWZNpQaK.js")),
  "Cms/Submissions/Index": () => (__sunricePreload(["./ui-BzV6lfEf.js","./Confirm-DstGOW0Y.js","./plus-Cn7AaagX.js","./download-O5RUS1Kt.js","./layout-template-Btp-VVsS.js","./chevron-left-DDGNQO3o.js","./chevron-right-1BqdTUoX.js"]), import("./Index-CY3c9Jwe.js"))
};
S({
  lazyPages: Object.fromEntries(Object.entries(I).map(([e, n]) => [
    e,
    async () => D((await n()).default)
  ]))
});
export {
  x as a,
  F as b,
  z as c,
  L as d,
  y as e,
  P as f,
  O as g,
  U as h,
  j as i,
  C as j,
  T as k,
  M as l,
  R as m,
  k as n,
  b as r,
  $ as s,
  a as t
};

function __sunricePreload(files) {
    if (typeof document === 'undefined') return;
    for (const file of files) {
        const href = new URL(file, import.meta.url).href;
        if (document.querySelector('link[rel="modulepreload"][href="' + CSS.escape(href) + '"]')) continue;
        const link = document.createElement('link');
        link.rel = 'modulepreload';
        link.href = href;
        document.head.appendChild(link);
    }
}
