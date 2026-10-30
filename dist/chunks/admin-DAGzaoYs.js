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
const g = () => (__sunricePreload(["./createLucideIcon-Ccbp7F45.js","./ui-Dh5wfMwT.js","./Confirm-BSxcGfBV.js","./FieldInput-mGQAw7Z2.js","./EntriesPicker-Dy346dkc.js","./TermsPicker-BK5YZMp_.js","./check-OeKFYRnl.js","./search-3zKi7F1_.js","./FieldError-D00wjzOP.js","./plus-COqahUZ2.js","./chevron-right-9qVV6b-Q.js","./link-2-BYZeXgi5.js","./tags-DR5XKR3w.js","./copy-BT7TBOUx.js","./loader-circle-ByksABXO.js"]), import("./Edit-hB7V0U89.js")), v = {
  "Cms/Blueprints/Index": () => (__sunricePreload(["./FieldError-D00wjzOP.js","./StructureList-BMLvVEQ3.js","./ui-Dh5wfMwT.js","./Confirm-BSxcGfBV.js","./createLucideIcon-Ccbp7F45.js","./plus-COqahUZ2.js"]), import("./Index-I9BM0AZg.js")),
  "Cms/Blueprints/Edit": g,
  "Cms/Fieldsets/Index": () => (__sunricePreload(["./FieldError-D00wjzOP.js","./StructureList-BMLvVEQ3.js","./ui-Dh5wfMwT.js","./Confirm-BSxcGfBV.js","./createLucideIcon-Ccbp7F45.js","./plus-COqahUZ2.js"]), import("./Index-Cz5EzgLe.js")),
  // A fieldset is edited like a blueprint.
  "Cms/Fieldsets/Edit": g,
  "Cms/Entries/Index": () => (__sunricePreload(["./createLucideIcon-Ccbp7F45.js","./Confirm-BSxcGfBV.js","./ui-Dh5wfMwT.js","./TermsPicker-BK5YZMp_.js","./check-OeKFYRnl.js","./search-3zKi7F1_.js","./ellipsis-C7tKJoZ2.js","./tree-BdgFD7PS.js","./download-DA5N5mq4.js","./plus-COqahUZ2.js","./rotate-ccw-BcgdCn0y.js","./chevron-left-usCQl1qw.js","./chevron-right-9qVV6b-Q.js"]), import("./Index-BZmUAGBT.js")),
  "Cms/Entries/Edit": () => (__sunricePreload(["./createLucideIcon-Ccbp7F45.js","./ui-Dh5wfMwT.js","./Confirm-BSxcGfBV.js","./seo-DbSOyJf8.js","./FieldError-D00wjzOP.js","./TermsPicker-BK5YZMp_.js","./check-OeKFYRnl.js","./search-3zKi7F1_.js","./EntriesPicker-Dy346dkc.js","./undo-2-CBzqSKK6.js","./languages-CP7_SmCO.js","./FieldInput-mGQAw7Z2.js","./plus-COqahUZ2.js","./chevron-right-9qVV6b-Q.js","./SlugNote-C6mHDxpk.js","./rotate-ccw-BcgdCn0y.js","./link-2-BYZeXgi5.js","./copy-BT7TBOUx.js","./layout-template-RwJXNfEY.js","./loader-circle-ByksABXO.js","./external-link-CFxEu4M4.js"]), import("./Edit-Dfi6taFP.js")),
  "Cms/Listing/Edit": () => (__sunricePreload(["./PageValuesForm-DdzPgV5H.js","./ui-Dh5wfMwT.js","./FieldInput-mGQAw7Z2.js","./createLucideIcon-Ccbp7F45.js","./EntriesPicker-Dy346dkc.js","./TermsPicker-BK5YZMp_.js","./check-OeKFYRnl.js","./search-3zKi7F1_.js","./FieldError-D00wjzOP.js","./plus-COqahUZ2.js","./Confirm-BSxcGfBV.js","./chevron-right-9qVV6b-Q.js","./languages-CP7_SmCO.js","./VersionConflict-DCvIKxLP.js","./seo-DbSOyJf8.js","./UnsavedNote-BdLs8zRA.js","./external-link-CFxEu4M4.js","./loader-circle-ByksABXO.js","./settings-2-0VUe76YZ.js","./layout-template-RwJXNfEY.js"]), import("./Edit-CTOeIf-f.js")),
  "Cms/Terms/Index": () => (__sunricePreload(["./createLucideIcon-Ccbp7F45.js","./ui-Dh5wfMwT.js","./Confirm-BSxcGfBV.js","./tree-BdgFD7PS.js","./settings-2-0VUe76YZ.js","./layout-template-RwJXNfEY.js","./plus-COqahUZ2.js","./search-3zKi7F1_.js","./external-link-CFxEu4M4.js","./rotate-ccw-BcgdCn0y.js","./ellipsis-C7tKJoZ2.js","./pencil-D-dwWCMx.js"]), import("./Index-BZCiKa4c.js")),
  "Cms/TaxonomyIndex/Edit": () => (__sunricePreload(["./ui-Dh5wfMwT.js","./PageValuesForm-DdzPgV5H.js","./FieldInput-mGQAw7Z2.js","./createLucideIcon-Ccbp7F45.js","./EntriesPicker-Dy346dkc.js","./TermsPicker-BK5YZMp_.js","./check-OeKFYRnl.js","./search-3zKi7F1_.js","./FieldError-D00wjzOP.js","./plus-COqahUZ2.js","./Confirm-BSxcGfBV.js","./chevron-right-9qVV6b-Q.js","./languages-CP7_SmCO.js","./VersionConflict-DCvIKxLP.js","./seo-DbSOyJf8.js","./UnsavedNote-BdLs8zRA.js","./external-link-CFxEu4M4.js","./loader-circle-ByksABXO.js","./settings-2-0VUe76YZ.js","./layout-template-RwJXNfEY.js"]), import("./Edit-Cl8kqUMF.js")),
  "Cms/Translations/Edit": () => (__sunricePreload(["./createLucideIcon-Ccbp7F45.js","./ui-Dh5wfMwT.js","./FieldError-D00wjzOP.js","./UnsavedNote-BdLs8zRA.js","./loader-circle-ByksABXO.js","./external-link-CFxEu4M4.js"]), import("./Edit-43m3OIGI.js")),
  "Cms/Terms/Edit": () => (__sunricePreload(["./ui-Dh5wfMwT.js","./FieldError-D00wjzOP.js","./FieldInput-mGQAw7Z2.js","./createLucideIcon-Ccbp7F45.js","./EntriesPicker-Dy346dkc.js","./TermsPicker-BK5YZMp_.js","./check-OeKFYRnl.js","./search-3zKi7F1_.js","./plus-COqahUZ2.js","./Confirm-BSxcGfBV.js","./chevron-right-9qVV6b-Q.js","./languages-CP7_SmCO.js","./SlugNote-C6mHDxpk.js","./seo-DbSOyJf8.js","./VersionConflict-DCvIKxLP.js","./UnsavedNote-BdLs8zRA.js","./external-link-CFxEu4M4.js","./loader-circle-ByksABXO.js","./layout-template-RwJXNfEY.js"]), import("./Edit-D67PMtDU.js")),
  "Cms/Globals/Edit": () => (__sunricePreload(["./ui-Dh5wfMwT.js","./languages-CP7_SmCO.js","./FieldInput-mGQAw7Z2.js","./createLucideIcon-Ccbp7F45.js","./EntriesPicker-Dy346dkc.js","./TermsPicker-BK5YZMp_.js","./check-OeKFYRnl.js","./search-3zKi7F1_.js","./FieldError-D00wjzOP.js","./plus-COqahUZ2.js","./Confirm-BSxcGfBV.js","./chevron-right-9qVV6b-Q.js","./VersionConflict-DCvIKxLP.js","./UnsavedNote-BdLs8zRA.js","./loader-circle-ByksABXO.js","./settings-2-0VUe76YZ.js","./layout-template-RwJXNfEY.js"]), import("./Edit-CS4P2QbE.js")),
  "Cms/Menus/Edit": () => (__sunricePreload(["./createLucideIcon-Ccbp7F45.js","./ui-Dh5wfMwT.js","./EntriesPicker-Dy346dkc.js","./TermsPicker-BK5YZMp_.js","./check-OeKFYRnl.js","./search-3zKi7F1_.js","./FieldError-D00wjzOP.js","./VersionConflict-DCvIKxLP.js","./Confirm-BSxcGfBV.js","./tree-BdgFD7PS.js","./UnsavedNote-BdLs8zRA.js","./plus-COqahUZ2.js","./tags-DR5XKR3w.js","./link-2-BYZeXgi5.js","./loader-circle-ByksABXO.js","./settings-2-0VUe76YZ.js","./pencil-D-dwWCMx.js"]), import("./Edit--phAJVNl.js")),
  "Cms/Comments/Index": () => (__sunricePreload(["./createLucideIcon-Ccbp7F45.js","./ui-Dh5wfMwT.js","./Confirm-BSxcGfBV.js","./FieldError-D00wjzOP.js","./search-3zKi7F1_.js","./check-OeKFYRnl.js","./undo-2-CBzqSKK6.js","./rotate-ccw-BcgdCn0y.js","./external-link-CFxEu4M4.js","./pencil-D-dwWCMx.js","./chevron-left-usCQl1qw.js","./chevron-right-9qVV6b-Q.js"]), import("./Index-CF5ilGdY.js")),
  "Cms/Seo/Edit": () => (__sunricePreload(["./ui-Dh5wfMwT.js","./FieldError-D00wjzOP.js"]), import("./Edit-CcwdxrWJ.js")),
  "Cms/Submissions/Index": () => (__sunricePreload(["./createLucideIcon-Ccbp7F45.js","./ui-Dh5wfMwT.js","./Confirm-BSxcGfBV.js","./plus-COqahUZ2.js","./download-DA5N5mq4.js","./layout-template-RwJXNfEY.js","./chevron-left-usCQl1qw.js","./chevron-right-9qVV6b-Q.js"]), import("./Index-WhwxAPLH.js"))
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
