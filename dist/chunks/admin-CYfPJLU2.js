const h = globalThis.Sunrice;
if (!h) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const w = h.modules["react/jsx-runtime"], f = globalThis.Sunrice;
if (!f) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const b = f.modules["@inertiajs/react"], m = 3;
function o() {
  const e = globalThis.Sunrice;
  if (!e)
    throw new Error("[sunrice] This script runs outside the Sunrice admin panel (window.Sunrice is missing).");
  return e;
}
function C(e) {
  const t = o();
  if (t.version !== m)
    throw new Error(`[sunrice] This plugin was built for admin runtime ${m}, but the panel runs ${t.version}. Rebuild it with a matching @imajiner/admin-sdk.`);
  for (const [n, i] of Object.entries(e.pages ?? {}))
    t.registerPage(n, i);
  for (const [n, i] of Object.entries(e.lazyPages ?? {}))
    t.registerPageLoader(n, i);
}
function a(e, t = {}) {
  return o().t(e, t);
}
function N(e = "") {
  return o().adminUrl(e);
}
function D(e) {
  return { draft: a("Draft"), scheduled: a("Scheduled"), published: a("Live") }[e];
}
function x(e, t) {
  if (!e) return "—";
  const n = new Date(e);
  return Number.isNaN(n.getTime()) ? "—" : n.toLocaleString(document.documentElement.lang || void 0, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
}
function I(e, t = /* @__PURE__ */ new Date()) {
  const n = e ? new Date(e) : null;
  if (n && !Number.isNaN(n.getTime()) && n > t) return n;
  const i = new Date(t);
  return i.setDate(i.getDate() + 1), i.setMinutes(0, 0, 0), i;
}
function P(e) {
  const t = (n) => String(n).padStart(2, "0");
  return `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}T${t(e.getHours())}:${t(e.getMinutes())}`;
}
function $(e, t, n, i = Date.now()) {
  const r = t === "" ? null : new Date(t);
  if (r === null || Number.isNaN(r.getTime())) return { action: "now", at: null };
  const s = (p) => Math.floor(p / 6e4), c = n ? new Date(n).getTime() : null;
  if (c !== null && s(c) === s(r.getTime()) && (e !== "draft" || r.getTime() <= i)) return { action: "now", at: null };
  const l = r.toISOString();
  return r.getTime() > i ? { action: "schedule", at: l } : { action: e === "draft" ? "backdate" : "redate", at: l };
}
let u = {};
function S(e) {
  u = e ?? {};
}
function j(e, t) {
  if (t === void 0 && u[e]) return u[e];
  try {
    return new Intl.DisplayNames(t ? [t] : void 0, { type: "language" }).of(e.replace("_", "-")) ?? e;
  } catch {
    return e;
  }
}
function d(e) {
  return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function L(e, t, n, i) {
  const r = d(t), s = e === r || e.startsWith(`${r}-`) && /^\d+$/.test(e.slice(r.length + 1));
  return i && r !== "" && s ? d(n) : e;
}
function O(e, t, n) {
  return !e || t.trim() === "" || t.trim() === e ? null : n ? "redirects" : "breaks";
}
function U(e) {
  return e.trashed ? "trashed" : e.status === "draft" ? e.everPublished ? "offline" : "draft" : e.status === "scheduled" ? e.hasUnpublishedChanges ? "scheduled-changes" : "scheduled" : e.hasUnpublishedChanges ? "live-changes" : "live";
}
function E(e) {
  return e === "live-changes" || e === "scheduled-changes";
}
function y(e, t) {
  const n = E(e);
  return {
    viewLive: t.liveUrl && (e === "live" || e === "live-changes"),
    compare: n,
    preview: t.pages && e !== "trashed" && e !== "live",
    discard: n && t.canUpdate
  };
}
function F(e) {
  return e.status !== "draft" && e.changes === !0;
}
function T(e) {
  return function(n) {
    const i = b.usePage().props.cms;
    return S(i?.locales), /* @__PURE__ */ w.jsx(e, { ...n });
  };
}
const g = () => (__sunricePreload(["./createLucideIcon-Ccbp7F45.js","./ui-Dh5wfMwT.js","./Confirm-C6q6hCPN.js","./FieldInput-Bp9y7puO.js","./EntriesPicker-D3lVX5Mf.js","./EntryStatus-B_w7AMip.js","./search-3zKi7F1_.js","./FieldError-BIWghK_o.js","./check-OeKFYRnl.js","./plus-COqahUZ2.js","./trash-DHN6ewjn.js","./chevron-right-9qVV6b-Q.js","./link-2-BYZeXgi5.js","./tags-DR5XKR3w.js","./copy-BT7TBOUx.js","./loader-circle-ByksABXO.js"]), import("./Edit-BQCj89M4.js")), v = {
  "Cms/Blueprints/Index": () => (__sunricePreload(["./FieldError-BIWghK_o.js","./StructureList-BAM6lwW3.js","./ui-Dh5wfMwT.js","./Confirm-C6q6hCPN.js","./createLucideIcon-Ccbp7F45.js","./plus-COqahUZ2.js","./trash-DHN6ewjn.js"]), import("./Index-hDl5GlHO.js")),
  "Cms/Blueprints/Edit": g,
  "Cms/Fieldsets/Index": () => (__sunricePreload(["./FieldError-BIWghK_o.js","./StructureList-BAM6lwW3.js","./ui-Dh5wfMwT.js","./Confirm-C6q6hCPN.js","./createLucideIcon-Ccbp7F45.js","./plus-COqahUZ2.js","./trash-DHN6ewjn.js"]), import("./Index-AHRs2xiW.js")),
  // A fieldset is edited like a blueprint.
  "Cms/Fieldsets/Edit": g,
  "Cms/Entries/Index": () => (__sunricePreload(["./createLucideIcon-Ccbp7F45.js","./Confirm-C6q6hCPN.js","./ui-Dh5wfMwT.js","./EntryStatus-B_w7AMip.js","./tree-B7sRX6dH.js","./download-DA5N5mq4.js","./plus-COqahUZ2.js","./search-3zKi7F1_.js","./rotate-ccw-BcgdCn0y.js","./trash-DHN6ewjn.js","./chevron-left-usCQl1qw.js","./chevron-right-9qVV6b-Q.js"]), import("./Index-D-78F-2V.js")),
  "Cms/Entries/Edit": () => (__sunricePreload(["./createLucideIcon-Ccbp7F45.js","./ui-Dh5wfMwT.js","./Confirm-C6q6hCPN.js","./seo-BlcWC4dk.js","./FieldError-BIWghK_o.js","./FieldInput-Bp9y7puO.js","./EntriesPicker-D3lVX5Mf.js","./EntryStatus-B_w7AMip.js","./search-3zKi7F1_.js","./check-OeKFYRnl.js","./plus-COqahUZ2.js","./trash-DHN6ewjn.js","./chevron-right-9qVV6b-Q.js","./undo-2-CBzqSKK6.js","./FieldSections-DtIBxEBC.js","./SlugNote-ChIcbtnv.js","./rotate-ccw-BcgdCn0y.js","./link-2-BYZeXgi5.js","./copy-BT7TBOUx.js","./layout-template-RwJXNfEY.js","./loader-circle-ByksABXO.js","./external-link-CFxEu4M4.js"]), import("./Edit-oo0_yD_e.js")),
  "Cms/Listing/Edit": () => (__sunricePreload(["./PageValuesForm-BKUn_M2n.js","./ui-Dh5wfMwT.js","./FieldInput-Bp9y7puO.js","./createLucideIcon-Ccbp7F45.js","./EntriesPicker-D3lVX5Mf.js","./EntryStatus-B_w7AMip.js","./search-3zKi7F1_.js","./FieldError-BIWghK_o.js","./check-OeKFYRnl.js","./plus-COqahUZ2.js","./trash-DHN6ewjn.js","./chevron-right-9qVV6b-Q.js","./FieldSections-DtIBxEBC.js","./VersionConflict--vbDG4vv.js","./Confirm-C6q6hCPN.js","./LanguageTabs-Bw6h_MHg.js","./seo-BlcWC4dk.js","./external-link-CFxEu4M4.js","./loader-circle-ByksABXO.js"]), import("./Edit-CjbG8gCw.js")),
  "Cms/Terms/Index": () => (__sunricePreload(["./createLucideIcon-Ccbp7F45.js","./ui-Dh5wfMwT.js","./Confirm-C6q6hCPN.js","./tree-B7sRX6dH.js","./settings-2-0VUe76YZ.js","./layout-template-RwJXNfEY.js","./plus-COqahUZ2.js","./search-3zKi7F1_.js","./trash-DHN6ewjn.js","./external-link-CFxEu4M4.js","./rotate-ccw-BcgdCn0y.js","./pencil-D-dwWCMx.js"]), import("./Index-DV6Uyyuz.js")),
  "Cms/TaxonomyIndex/Edit": () => (__sunricePreload(["./ui-Dh5wfMwT.js","./PageValuesForm-BKUn_M2n.js","./FieldInput-Bp9y7puO.js","./createLucideIcon-Ccbp7F45.js","./EntriesPicker-D3lVX5Mf.js","./EntryStatus-B_w7AMip.js","./search-3zKi7F1_.js","./FieldError-BIWghK_o.js","./check-OeKFYRnl.js","./plus-COqahUZ2.js","./trash-DHN6ewjn.js","./chevron-right-9qVV6b-Q.js","./FieldSections-DtIBxEBC.js","./VersionConflict--vbDG4vv.js","./Confirm-C6q6hCPN.js","./LanguageTabs-Bw6h_MHg.js","./seo-BlcWC4dk.js","./external-link-CFxEu4M4.js","./loader-circle-ByksABXO.js","./settings-2-0VUe76YZ.js"]), import("./Edit-h6ypTmOp.js")),
  "Cms/Translations/Edit": () => (__sunricePreload(["./createLucideIcon-Ccbp7F45.js","./ui-Dh5wfMwT.js","./FieldError-BIWghK_o.js","./loader-circle-ByksABXO.js","./external-link-CFxEu4M4.js"]), import("./Edit-B74Y3Kw7.js")),
  "Cms/Terms/Edit": () => (__sunricePreload(["./ui-Dh5wfMwT.js","./FieldError-BIWghK_o.js","./FieldInput-Bp9y7puO.js","./createLucideIcon-Ccbp7F45.js","./EntriesPicker-D3lVX5Mf.js","./EntryStatus-B_w7AMip.js","./search-3zKi7F1_.js","./check-OeKFYRnl.js","./plus-COqahUZ2.js","./trash-DHN6ewjn.js","./chevron-right-9qVV6b-Q.js","./FieldSections-DtIBxEBC.js","./SlugNote-ChIcbtnv.js","./seo-BlcWC4dk.js","./VersionConflict--vbDG4vv.js","./Confirm-C6q6hCPN.js","./LanguageTabs-Bw6h_MHg.js","./external-link-CFxEu4M4.js","./loader-circle-ByksABXO.js"]), import("./Edit-iFZPvnu9.js")),
  "Cms/Globals/Edit": () => (__sunricePreload(["./ui-Dh5wfMwT.js","./FieldSections-DtIBxEBC.js","./FieldInput-Bp9y7puO.js","./createLucideIcon-Ccbp7F45.js","./EntriesPicker-D3lVX5Mf.js","./EntryStatus-B_w7AMip.js","./search-3zKi7F1_.js","./FieldError-BIWghK_o.js","./check-OeKFYRnl.js","./plus-COqahUZ2.js","./trash-DHN6ewjn.js","./chevron-right-9qVV6b-Q.js","./VersionConflict--vbDG4vv.js","./Confirm-C6q6hCPN.js","./loader-circle-ByksABXO.js","./settings-2-0VUe76YZ.js"]), import("./Edit-CbWPm8Of.js")),
  "Cms/Menus/Edit": () => (__sunricePreload(["./createLucideIcon-Ccbp7F45.js","./ui-Dh5wfMwT.js","./EntriesPicker-D3lVX5Mf.js","./EntryStatus-B_w7AMip.js","./search-3zKi7F1_.js","./FieldError-BIWghK_o.js","./tree-B7sRX6dH.js","./plus-COqahUZ2.js","./tags-DR5XKR3w.js","./link-2-BYZeXgi5.js","./loader-circle-ByksABXO.js","./settings-2-0VUe76YZ.js","./trash-DHN6ewjn.js"]), import("./Edit-Cl8TfKx1.js")),
  "Cms/Comments/Index": () => (__sunricePreload(["./createLucideIcon-Ccbp7F45.js","./ui-Dh5wfMwT.js","./Confirm-C6q6hCPN.js","./FieldError-BIWghK_o.js","./search-3zKi7F1_.js","./check-OeKFYRnl.js","./undo-2-CBzqSKK6.js","./trash-DHN6ewjn.js","./rotate-ccw-BcgdCn0y.js","./external-link-CFxEu4M4.js","./pencil-D-dwWCMx.js","./chevron-left-usCQl1qw.js","./chevron-right-9qVV6b-Q.js"]), import("./Index-BAooDAv1.js")),
  "Cms/Seo/Edit": () => (__sunricePreload(["./ui-Dh5wfMwT.js","./FieldError-BIWghK_o.js"]), import("./Edit-PQKGk8cf.js")),
  "Cms/Submissions/Index": () => (__sunricePreload(["./createLucideIcon-Ccbp7F45.js","./ui-Dh5wfMwT.js","./Confirm-C6q6hCPN.js","./plus-COqahUZ2.js","./download-DA5N5mq4.js","./chevron-left-usCQl1qw.js","./chevron-right-9qVV6b-Q.js","./trash-DHN6ewjn.js"]), import("./Index-CtUOQoCq.js"))
};
C({
  lazyPages: Object.fromEntries(Object.entries(v).map(([e, t]) => [
    e,
    async () => T((await t()).default)
  ]))
});
export {
  N as a,
  P as b,
  y as c,
  $ as d,
  U as e,
  x as f,
  L as g,
  O as h,
  I as i,
  w as j,
  E as k,
  j as l,
  F as m,
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
