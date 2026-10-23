const g = globalThis.Sunrice;
if (!g) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const w = g.modules["react/jsx-runtime"], p = globalThis.Sunrice;
if (!p) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const b = p.modules["@inertiajs/react"], l = 3;
function u() {
  const e = globalThis.Sunrice;
  if (!e)
    throw new Error("[sunrice] This script runs outside the Sunrice admin panel (window.Sunrice is missing).");
  return e;
}
function S(e) {
  const t = u();
  if (t.version !== l)
    throw new Error(`[sunrice] This plugin was built for admin runtime ${l}, but the panel runs ${t.version}. Rebuild it with a matching @imajiner/admin-sdk.`);
  for (const [n, r] of Object.entries(e.pages ?? {}))
    t.registerPage(n, r);
  for (const [n, r] of Object.entries(e.lazyPages ?? {}))
    t.registerPageLoader(n, r);
}
function a(e, t = {}) {
  return u().t(e, t);
}
function N(e = "") {
  return u().adminUrl(e);
}
function D(e) {
  return { draft: a("Draft"), scheduled: a("Scheduled"), published: a("Published") }[e];
}
function x(e, t) {
  if (!e) return "—";
  const n = new Date(e);
  return Number.isNaN(n.getTime()) ? "—" : n.toLocaleString(document.documentElement.lang || void 0, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
}
function I(e, t = /* @__PURE__ */ new Date()) {
  const n = e ? new Date(e) : null;
  if (n && !Number.isNaN(n.getTime()) && n > t) return n;
  const r = new Date(t);
  return r.setDate(r.getDate() + 1), r.setMinutes(0, 0, 0), r;
}
function $(e) {
  const t = (n) => String(n).padStart(2, "0");
  return `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}T${t(e.getHours())}:${t(e.getMinutes())}`;
}
function j(e, t, n, r = Date.now()) {
  const i = t === "" ? null : new Date(t);
  if (i === null || Number.isNaN(i.getTime())) return { action: "now", at: null };
  const s = (h) => Math.floor(h / 6e4), m = n ? new Date(n).getTime() : null;
  if (e !== "draft" && m !== null && s(m) === s(i.getTime())) return { action: "now", at: null };
  const c = i.toISOString();
  return i.getTime() > r ? { action: "schedule", at: c } : { action: e === "draft" ? "backdate" : "redate", at: c };
}
let o = {};
function C(e) {
  o = e ?? {};
}
function y(e, t) {
  if (t === void 0 && o[e]) return o[e];
  try {
    return new Intl.DisplayNames(t ? [t] : void 0, { type: "language" }).of(e.replace("_", "-")) ?? e;
  } catch {
    return e;
  }
}
function d(e) {
  return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function P(e, t, n, r) {
  const i = d(t), s = e === i || e.startsWith(`${i}-`) && /^\d+$/.test(e.slice(i.length + 1));
  return r && i !== "" && s ? d(n) : e;
}
function v(e, t, n) {
  return !e || t.trim() === "" || t.trim() === e ? null : n ? "redirects" : "breaks";
}
function E(e) {
  return function(n) {
    const r = b.usePage().props.cms;
    return C(r?.locales), /* @__PURE__ */ w.jsx(e, { ...n });
  };
}
const f = () => (__sunricePreload(["./createLucideIcon-Ccbp7F45.js","./ui-Dh5wfMwT.js","./Confirm-D-4qtSiN.js","./FieldInput-B0EIykHK.js","./EntriesPicker-BeYNoSdl.js","./x-CB4QIx1-.js","./search-3zKi7F1_.js","./FieldError-DGX_mF_G.js","./plus-COqahUZ2.js","./trash-DHN6ewjn.js","./chevron-right-9qVV6b-Q.js","./tags-BBqDPNxj.js","./copy-BT7TBOUx.js","./loader-circle-ByksABXO.js"]), import("./Edit--Nqmihzz.js")), T = {
  "Cms/Blueprints/Index": () => (__sunricePreload(["./FieldError-DGX_mF_G.js","./StructureList-Cd4iFskk.js","./ui-Dh5wfMwT.js","./Confirm-D-4qtSiN.js","./createLucideIcon-Ccbp7F45.js","./plus-COqahUZ2.js","./trash-DHN6ewjn.js"]), import("./Index-mGlrD2mB.js")),
  "Cms/Blueprints/Edit": f,
  "Cms/Fieldsets/Index": () => (__sunricePreload(["./FieldError-DGX_mF_G.js","./StructureList-Cd4iFskk.js","./ui-Dh5wfMwT.js","./Confirm-D-4qtSiN.js","./createLucideIcon-Ccbp7F45.js","./plus-COqahUZ2.js","./trash-DHN6ewjn.js"]), import("./Index-CBU0lhpe.js")),
  // A fieldset is edited like a blueprint.
  "Cms/Fieldsets/Edit": f,
  "Cms/Entries/Index": () => (__sunricePreload(["./createLucideIcon-Ccbp7F45.js","./Confirm-D-4qtSiN.js","./ui-Dh5wfMwT.js","./tree-B7sRX6dH.js","./download-DA5N5mq4.js","./plus-COqahUZ2.js","./search-3zKi7F1_.js","./x-CB4QIx1-.js","./rotate-ccw-BcgdCn0y.js","./trash-DHN6ewjn.js","./chevron-left-usCQl1qw.js","./chevron-right-9qVV6b-Q.js"]), import("./Index-Cwd5JZG9.js")),
  "Cms/Entries/Edit": () => (__sunricePreload(["./createLucideIcon-Ccbp7F45.js","./ui-Dh5wfMwT.js","./Confirm-D-4qtSiN.js","./SlugNote-o5OC0159.js","./EntriesPicker-BeYNoSdl.js","./x-CB4QIx1-.js","./search-3zKi7F1_.js","./check-OeKFYRnl.js","./undo-2-CBzqSKK6.js","./FieldSections-CIJr-f5c.js","./FieldInput-B0EIykHK.js","./FieldError-DGX_mF_G.js","./plus-COqahUZ2.js","./trash-DHN6ewjn.js","./chevron-right-9qVV6b-Q.js","./seo-Uu0c2psJ.js","./external-link-CFxEu4M4.js","./rotate-ccw-BcgdCn0y.js","./layout-template-DgadsRJI.js","./copy-BT7TBOUx.js","./loader-circle-ByksABXO.js"]), import("./Edit-BMJFUTya.js")),
  "Cms/Listing/Edit": () => (__sunricePreload(["./PageValuesForm-j4ZC3oP8.js","./ui-Dh5wfMwT.js","./FieldInput-B0EIykHK.js","./createLucideIcon-Ccbp7F45.js","./EntriesPicker-BeYNoSdl.js","./x-CB4QIx1-.js","./search-3zKi7F1_.js","./FieldError-DGX_mF_G.js","./plus-COqahUZ2.js","./trash-DHN6ewjn.js","./chevron-right-9qVV6b-Q.js","./FieldSections-CIJr-f5c.js","./VersionConflict-CxefABSs.js","./Confirm-D-4qtSiN.js","./LanguageTabs-ViLa7fyG.js","./check-OeKFYRnl.js","./seo-Uu0c2psJ.js","./external-link-CFxEu4M4.js","./loader-circle-ByksABXO.js"]), import("./Edit-Cbfa9LqO.js")),
  "Cms/Terms/Index": () => (__sunricePreload(["./createLucideIcon-Ccbp7F45.js","./ui-Dh5wfMwT.js","./Confirm-D-4qtSiN.js","./tree-B7sRX6dH.js","./settings-2-0VUe76YZ.js","./layout-template-DgadsRJI.js","./plus-COqahUZ2.js","./search-3zKi7F1_.js","./trash-DHN6ewjn.js","./external-link-CFxEu4M4.js","./rotate-ccw-BcgdCn0y.js","./pencil-D-dwWCMx.js"]), import("./Index-D4VADrAL.js")),
  "Cms/TaxonomyIndex/Edit": () => (__sunricePreload(["./ui-Dh5wfMwT.js","./PageValuesForm-j4ZC3oP8.js","./FieldInput-B0EIykHK.js","./createLucideIcon-Ccbp7F45.js","./EntriesPicker-BeYNoSdl.js","./x-CB4QIx1-.js","./search-3zKi7F1_.js","./FieldError-DGX_mF_G.js","./plus-COqahUZ2.js","./trash-DHN6ewjn.js","./chevron-right-9qVV6b-Q.js","./FieldSections-CIJr-f5c.js","./VersionConflict-CxefABSs.js","./Confirm-D-4qtSiN.js","./LanguageTabs-ViLa7fyG.js","./check-OeKFYRnl.js","./seo-Uu0c2psJ.js","./external-link-CFxEu4M4.js","./loader-circle-ByksABXO.js","./settings-2-0VUe76YZ.js"]), import("./Edit-BLfkPrC1.js")),
  "Cms/Translations/Edit": () => (__sunricePreload(["./createLucideIcon-Ccbp7F45.js","./ui-Dh5wfMwT.js","./FieldError-DGX_mF_G.js","./loader-circle-ByksABXO.js","./external-link-CFxEu4M4.js"]), import("./Edit-DdsIvmo-.js")),
  "Cms/Terms/Edit": () => (__sunricePreload(["./ui-Dh5wfMwT.js","./FieldError-DGX_mF_G.js","./FieldInput-B0EIykHK.js","./createLucideIcon-Ccbp7F45.js","./EntriesPicker-BeYNoSdl.js","./x-CB4QIx1-.js","./search-3zKi7F1_.js","./plus-COqahUZ2.js","./trash-DHN6ewjn.js","./chevron-right-9qVV6b-Q.js","./FieldSections-CIJr-f5c.js","./SlugNote-o5OC0159.js","./VersionConflict-CxefABSs.js","./Confirm-D-4qtSiN.js","./LanguageTabs-ViLa7fyG.js","./check-OeKFYRnl.js","./seo-Uu0c2psJ.js","./external-link-CFxEu4M4.js","./loader-circle-ByksABXO.js"]), import("./Edit-C1M5Fckh.js")),
  "Cms/Globals/Edit": () => (__sunricePreload(["./ui-Dh5wfMwT.js","./FieldSections-CIJr-f5c.js","./FieldInput-B0EIykHK.js","./createLucideIcon-Ccbp7F45.js","./EntriesPicker-BeYNoSdl.js","./x-CB4QIx1-.js","./search-3zKi7F1_.js","./FieldError-DGX_mF_G.js","./plus-COqahUZ2.js","./trash-DHN6ewjn.js","./chevron-right-9qVV6b-Q.js","./VersionConflict-CxefABSs.js","./Confirm-D-4qtSiN.js","./loader-circle-ByksABXO.js","./settings-2-0VUe76YZ.js"]), import("./Edit-CFajBcpI.js")),
  "Cms/Menus/Edit": () => (__sunricePreload(["./createLucideIcon-Ccbp7F45.js","./ui-Dh5wfMwT.js","./EntriesPicker-BeYNoSdl.js","./x-CB4QIx1-.js","./search-3zKi7F1_.js","./FieldError-DGX_mF_G.js","./tree-B7sRX6dH.js","./plus-COqahUZ2.js","./tags-BBqDPNxj.js","./loader-circle-ByksABXO.js","./settings-2-0VUe76YZ.js","./trash-DHN6ewjn.js"]), import("./Edit-CNqR1nfi.js")),
  "Cms/Comments/Index": () => (__sunricePreload(["./createLucideIcon-Ccbp7F45.js","./ui-Dh5wfMwT.js","./Confirm-D-4qtSiN.js","./FieldError-DGX_mF_G.js","./search-3zKi7F1_.js","./check-OeKFYRnl.js","./undo-2-CBzqSKK6.js","./trash-DHN6ewjn.js","./rotate-ccw-BcgdCn0y.js","./external-link-CFxEu4M4.js","./pencil-D-dwWCMx.js","./chevron-left-usCQl1qw.js","./chevron-right-9qVV6b-Q.js"]), import("./Index-D33UBjXU.js")),
  "Cms/Seo/Edit": () => (__sunricePreload(["./ui-Dh5wfMwT.js","./FieldError-DGX_mF_G.js"]), import("./Edit-CBtSkYIH.js")),
  "Cms/Submissions/Index": () => (__sunricePreload(["./createLucideIcon-Ccbp7F45.js","./ui-Dh5wfMwT.js","./Confirm-D-4qtSiN.js","./plus-COqahUZ2.js","./download-DA5N5mq4.js","./chevron-left-usCQl1qw.js","./chevron-right-9qVV6b-Q.js","./trash-DHN6ewjn.js"]), import("./Index-C5YPK-Pm.js"))
};
S({
  lazyPages: Object.fromEntries(Object.entries(T).map(([e, t]) => [
    e,
    async () => E((await t()).default)
  ]))
});
export {
  N as a,
  $ as b,
  P as c,
  j as d,
  v as e,
  x as f,
  I as g,
  w as j,
  y as l,
  b as r,
  D as s,
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
