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
  if (e !== "draft" && c !== null && s(c) === s(r.getTime())) return { action: "now", at: null };
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
const g = () => (__sunricePreload(["./createLucideIcon-Ccbp7F45.js","./ui-Dh5wfMwT.js","./Confirm-Dy8jz4Je.js","./FieldInput-CXFpAw9T.js","./EntriesPicker-B9rLvnsr.js","./EntryStatus-D9z0E-cZ.js","./search-3zKi7F1_.js","./FieldError-BD5SRSF-.js","./plus-COqahUZ2.js","./trash-DHN6ewjn.js","./chevron-right-9qVV6b-Q.js","./link-2-BYZeXgi5.js","./tags-DR5XKR3w.js","./copy-BT7TBOUx.js","./loader-circle-ByksABXO.js"]), import("./Edit-CDfpoawD.js")), v = {
  "Cms/Blueprints/Index": () => (__sunricePreload(["./FieldError-BD5SRSF-.js","./StructureList-CWR5il0k.js","./ui-Dh5wfMwT.js","./Confirm-Dy8jz4Je.js","./createLucideIcon-Ccbp7F45.js","./plus-COqahUZ2.js","./trash-DHN6ewjn.js"]), import("./Index-6IY8edW3.js")),
  "Cms/Blueprints/Edit": g,
  "Cms/Fieldsets/Index": () => (__sunricePreload(["./FieldError-BD5SRSF-.js","./StructureList-CWR5il0k.js","./ui-Dh5wfMwT.js","./Confirm-Dy8jz4Je.js","./createLucideIcon-Ccbp7F45.js","./plus-COqahUZ2.js","./trash-DHN6ewjn.js"]), import("./Index-BTP41FZK.js")),
  // A fieldset is edited like a blueprint.
  "Cms/Fieldsets/Edit": g,
  "Cms/Entries/Index": () => (__sunricePreload(["./createLucideIcon-Ccbp7F45.js","./Confirm-Dy8jz4Je.js","./ui-Dh5wfMwT.js","./EntryStatus-D9z0E-cZ.js","./tree-B7sRX6dH.js","./download-DA5N5mq4.js","./plus-COqahUZ2.js","./search-3zKi7F1_.js","./rotate-ccw-BcgdCn0y.js","./trash-DHN6ewjn.js","./chevron-left-usCQl1qw.js","./chevron-right-9qVV6b-Q.js"]), import("./Index-Bz75qVkI.js")),
  "Cms/Entries/Edit": () => (__sunricePreload(["./createLucideIcon-Ccbp7F45.js","./ui-Dh5wfMwT.js","./Confirm-Dy8jz4Je.js","./SlugNote-AnzpnY2G.js","./FieldError-BD5SRSF-.js","./FieldInput-CXFpAw9T.js","./EntriesPicker-B9rLvnsr.js","./EntryStatus-D9z0E-cZ.js","./search-3zKi7F1_.js","./plus-COqahUZ2.js","./trash-DHN6ewjn.js","./chevron-right-9qVV6b-Q.js","./check-OeKFYRnl.js","./undo-2-CBzqSKK6.js","./FieldSections-BKp60Le6.js","./seo-CpNaxZMX.js","./rotate-ccw-BcgdCn0y.js","./link-2-BYZeXgi5.js","./copy-BT7TBOUx.js","./layout-template-RwJXNfEY.js","./loader-circle-ByksABXO.js","./external-link-CFxEu4M4.js"]), import("./Edit-j9xqy9bs.js")),
  "Cms/Listing/Edit": () => (__sunricePreload(["./PageValuesForm-BwiY0T4l.js","./ui-Dh5wfMwT.js","./FieldInput-CXFpAw9T.js","./createLucideIcon-Ccbp7F45.js","./EntriesPicker-B9rLvnsr.js","./EntryStatus-D9z0E-cZ.js","./search-3zKi7F1_.js","./FieldError-BD5SRSF-.js","./plus-COqahUZ2.js","./trash-DHN6ewjn.js","./chevron-right-9qVV6b-Q.js","./FieldSections-BKp60Le6.js","./VersionConflict-dXud_KBL.js","./Confirm-Dy8jz4Je.js","./LanguageTabs-BNXIKfyR.js","./check-OeKFYRnl.js","./seo-CpNaxZMX.js","./external-link-CFxEu4M4.js","./loader-circle-ByksABXO.js"]), import("./Edit-D6I-2Et0.js")),
  "Cms/Terms/Index": () => (__sunricePreload(["./createLucideIcon-Ccbp7F45.js","./ui-Dh5wfMwT.js","./Confirm-Dy8jz4Je.js","./tree-B7sRX6dH.js","./settings-2-0VUe76YZ.js","./layout-template-RwJXNfEY.js","./plus-COqahUZ2.js","./search-3zKi7F1_.js","./trash-DHN6ewjn.js","./external-link-CFxEu4M4.js","./rotate-ccw-BcgdCn0y.js","./pencil-D-dwWCMx.js"]), import("./Index-CfRVBL9O.js")),
  "Cms/TaxonomyIndex/Edit": () => (__sunricePreload(["./ui-Dh5wfMwT.js","./PageValuesForm-BwiY0T4l.js","./FieldInput-CXFpAw9T.js","./createLucideIcon-Ccbp7F45.js","./EntriesPicker-B9rLvnsr.js","./EntryStatus-D9z0E-cZ.js","./search-3zKi7F1_.js","./FieldError-BD5SRSF-.js","./plus-COqahUZ2.js","./trash-DHN6ewjn.js","./chevron-right-9qVV6b-Q.js","./FieldSections-BKp60Le6.js","./VersionConflict-dXud_KBL.js","./Confirm-Dy8jz4Je.js","./LanguageTabs-BNXIKfyR.js","./check-OeKFYRnl.js","./seo-CpNaxZMX.js","./external-link-CFxEu4M4.js","./loader-circle-ByksABXO.js","./settings-2-0VUe76YZ.js"]), import("./Edit-DspshEKT.js")),
  "Cms/Translations/Edit": () => (__sunricePreload(["./createLucideIcon-Ccbp7F45.js","./ui-Dh5wfMwT.js","./FieldError-BD5SRSF-.js","./loader-circle-ByksABXO.js","./external-link-CFxEu4M4.js"]), import("./Edit-DXsNX5lF.js")),
  "Cms/Terms/Edit": () => (__sunricePreload(["./ui-Dh5wfMwT.js","./FieldError-BD5SRSF-.js","./FieldInput-CXFpAw9T.js","./createLucideIcon-Ccbp7F45.js","./EntriesPicker-B9rLvnsr.js","./EntryStatus-D9z0E-cZ.js","./search-3zKi7F1_.js","./plus-COqahUZ2.js","./trash-DHN6ewjn.js","./chevron-right-9qVV6b-Q.js","./FieldSections-BKp60Le6.js","./SlugNote-AnzpnY2G.js","./check-OeKFYRnl.js","./VersionConflict-dXud_KBL.js","./Confirm-Dy8jz4Je.js","./LanguageTabs-BNXIKfyR.js","./seo-CpNaxZMX.js","./external-link-CFxEu4M4.js","./loader-circle-ByksABXO.js"]), import("./Edit-D73Cxm-C.js")),
  "Cms/Globals/Edit": () => (__sunricePreload(["./ui-Dh5wfMwT.js","./FieldSections-BKp60Le6.js","./FieldInput-CXFpAw9T.js","./createLucideIcon-Ccbp7F45.js","./EntriesPicker-B9rLvnsr.js","./EntryStatus-D9z0E-cZ.js","./search-3zKi7F1_.js","./FieldError-BD5SRSF-.js","./plus-COqahUZ2.js","./trash-DHN6ewjn.js","./chevron-right-9qVV6b-Q.js","./VersionConflict-dXud_KBL.js","./Confirm-Dy8jz4Je.js","./loader-circle-ByksABXO.js","./settings-2-0VUe76YZ.js"]), import("./Edit-CiWaV-uz.js")),
  "Cms/Menus/Edit": () => (__sunricePreload(["./createLucideIcon-Ccbp7F45.js","./ui-Dh5wfMwT.js","./EntriesPicker-B9rLvnsr.js","./EntryStatus-D9z0E-cZ.js","./search-3zKi7F1_.js","./FieldError-BD5SRSF-.js","./tree-B7sRX6dH.js","./plus-COqahUZ2.js","./tags-DR5XKR3w.js","./link-2-BYZeXgi5.js","./loader-circle-ByksABXO.js","./settings-2-0VUe76YZ.js","./trash-DHN6ewjn.js"]), import("./Edit-xKK4ur67.js")),
  "Cms/Comments/Index": () => (__sunricePreload(["./createLucideIcon-Ccbp7F45.js","./ui-Dh5wfMwT.js","./Confirm-Dy8jz4Je.js","./FieldError-BD5SRSF-.js","./search-3zKi7F1_.js","./check-OeKFYRnl.js","./undo-2-CBzqSKK6.js","./trash-DHN6ewjn.js","./rotate-ccw-BcgdCn0y.js","./external-link-CFxEu4M4.js","./pencil-D-dwWCMx.js","./chevron-left-usCQl1qw.js","./chevron-right-9qVV6b-Q.js"]), import("./Index-CNhKqHJ5.js")),
  "Cms/Seo/Edit": () => (__sunricePreload(["./ui-Dh5wfMwT.js","./FieldError-BD5SRSF-.js"]), import("./Edit-Bw2qo4Wz.js")),
  "Cms/Submissions/Index": () => (__sunricePreload(["./createLucideIcon-Ccbp7F45.js","./ui-Dh5wfMwT.js","./Confirm-Dy8jz4Je.js","./plus-COqahUZ2.js","./download-DA5N5mq4.js","./chevron-left-usCQl1qw.js","./chevron-right-9qVV6b-Q.js","./trash-DHN6ewjn.js"]), import("./Index-zFDLPQhM.js"))
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
