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
const h = () => (__sunricePreload(["./ui-BzV6lfEf.js","./triangle-alert-CDOdGjCe.js","./Confirm-D5KnjVgH.js","./FieldInput-Bn-2u3xQ.js","./EntriesPicker-DDZeiDLw.js","./TermsPicker-CvOMeEGz.js","./check-Cvm5ZpBE.js","./search-Dj4j-7U0.js","./FieldError-LuOioba_.js","./plus-Cn7AaagX.js","./chevron-right-1BqdTUoX.js","./link-2-HefnCw8K.js","./tags-RK9FkZvx.js","./copy-D11fpdhs.js","./loader-circle-CjVcQmAV.js"]), import("./Edit-CqjKC06Q.js")), I = {
  "Cms/Blueprints/Index": () => (__sunricePreload(["./FieldError-LuOioba_.js","./StructureList-BK6VhJ0N.js","./ui-BzV6lfEf.js","./Confirm-D5KnjVgH.js","./plus-Cn7AaagX.js"]), import("./Index-BNy08V2Q.js")),
  "Cms/Blueprints/Edit": h,
  "Cms/Fieldsets/Index": () => (__sunricePreload(["./FieldError-LuOioba_.js","./StructureList-BK6VhJ0N.js","./ui-BzV6lfEf.js","./Confirm-D5KnjVgH.js","./plus-Cn7AaagX.js"]), import("./Index-CN0kp_iI.js")),
  // A fieldset is edited like a blueprint.
  "Cms/Fieldsets/Edit": h,
  "Cms/Entries/Index": () => (__sunricePreload(["./ui-BzV6lfEf.js","./Confirm-D5KnjVgH.js","./TermsPicker-CvOMeEGz.js","./check-Cvm5ZpBE.js","./search-Dj4j-7U0.js","./ellipsis-BA6pVhi_.js","./tree-BdgFD7PS.js","./download-O5RUS1Kt.js","./plus-Cn7AaagX.js","./rotate-ccw-BxpZ9siY.js","./chevron-left-DDGNQO3o.js","./chevron-right-1BqdTUoX.js"]), import("./Index--rlQAFNK.js")),
  "Cms/Entries/Edit": () => (__sunricePreload(["./ui-BzV6lfEf.js","./Confirm-D5KnjVgH.js","./seo-BN9-y2Lt.js","./FieldError-LuOioba_.js","./TermsPicker-CvOMeEGz.js","./check-Cvm5ZpBE.js","./search-Dj4j-7U0.js","./EntriesPicker-DDZeiDLw.js","./undo-2-B1yF9-es.js","./languages-NP23gcJ3.js","./FieldInput-Bn-2u3xQ.js","./plus-Cn7AaagX.js","./chevron-right-1BqdTUoX.js","./SlugNote-DbuUpcH5.js","./rotate-ccw-BxpZ9siY.js","./link-2-HefnCw8K.js","./copy-D11fpdhs.js","./layout-template-Btp-VVsS.js","./loader-circle-CjVcQmAV.js","./external-link-Mqd1ZxLN.js"]), import("./Edit-LcqdYKpu.js")),
  "Cms/Listing/Edit": () => (__sunricePreload(["./PageValuesForm-CQ6MR1Xo.js","./ui-BzV6lfEf.js","./FieldInput-Bn-2u3xQ.js","./EntriesPicker-DDZeiDLw.js","./TermsPicker-CvOMeEGz.js","./check-Cvm5ZpBE.js","./search-Dj4j-7U0.js","./FieldError-LuOioba_.js","./plus-Cn7AaagX.js","./Confirm-D5KnjVgH.js","./chevron-right-1BqdTUoX.js","./languages-NP23gcJ3.js","./VersionConflict-B_aVTFKO.js","./seo-BN9-y2Lt.js","./UnsavedNote-YhkM-mgQ.js","./external-link-Mqd1ZxLN.js","./loader-circle-CjVcQmAV.js","./settings-2-B2-hLaF4.js","./layout-template-Btp-VVsS.js"]), import("./Edit-EnbEbsJM.js")),
  "Cms/Terms/Index": () => (__sunricePreload(["./ui-BzV6lfEf.js","./Confirm-D5KnjVgH.js","./tree-BdgFD7PS.js","./settings-2-B2-hLaF4.js","./layout-template-Btp-VVsS.js","./plus-Cn7AaagX.js","./search-Dj4j-7U0.js","./external-link-Mqd1ZxLN.js","./rotate-ccw-BxpZ9siY.js","./ellipsis-BA6pVhi_.js","./pencil-BROVvpkc.js"]), import("./Index-m-NLQj3-.js")),
  "Cms/TaxonomyIndex/Edit": () => (__sunricePreload(["./ui-BzV6lfEf.js","./PageValuesForm-CQ6MR1Xo.js","./FieldInput-Bn-2u3xQ.js","./EntriesPicker-DDZeiDLw.js","./TermsPicker-CvOMeEGz.js","./check-Cvm5ZpBE.js","./search-Dj4j-7U0.js","./FieldError-LuOioba_.js","./plus-Cn7AaagX.js","./Confirm-D5KnjVgH.js","./chevron-right-1BqdTUoX.js","./languages-NP23gcJ3.js","./VersionConflict-B_aVTFKO.js","./seo-BN9-y2Lt.js","./UnsavedNote-YhkM-mgQ.js","./external-link-Mqd1ZxLN.js","./loader-circle-CjVcQmAV.js","./settings-2-B2-hLaF4.js","./layout-template-Btp-VVsS.js"]), import("./Edit-dkAJz_X0.js")),
  "Cms/Translations/Edit": () => (__sunricePreload(["./ui-BzV6lfEf.js","./FieldError-LuOioba_.js","./UnsavedNote-YhkM-mgQ.js","./loader-circle-CjVcQmAV.js","./external-link-Mqd1ZxLN.js"]), import("./Edit-DHfukTMK.js")),
  "Cms/Terms/Edit": () => (__sunricePreload(["./ui-BzV6lfEf.js","./FieldError-LuOioba_.js","./FieldInput-Bn-2u3xQ.js","./EntriesPicker-DDZeiDLw.js","./TermsPicker-CvOMeEGz.js","./check-Cvm5ZpBE.js","./search-Dj4j-7U0.js","./plus-Cn7AaagX.js","./Confirm-D5KnjVgH.js","./chevron-right-1BqdTUoX.js","./languages-NP23gcJ3.js","./SlugNote-DbuUpcH5.js","./seo-BN9-y2Lt.js","./VersionConflict-B_aVTFKO.js","./UnsavedNote-YhkM-mgQ.js","./external-link-Mqd1ZxLN.js","./loader-circle-CjVcQmAV.js","./layout-template-Btp-VVsS.js"]), import("./Edit-pbjko5K3.js")),
  "Cms/Globals/Edit": () => (__sunricePreload(["./ui-BzV6lfEf.js","./languages-NP23gcJ3.js","./FieldInput-Bn-2u3xQ.js","./EntriesPicker-DDZeiDLw.js","./TermsPicker-CvOMeEGz.js","./check-Cvm5ZpBE.js","./search-Dj4j-7U0.js","./FieldError-LuOioba_.js","./plus-Cn7AaagX.js","./Confirm-D5KnjVgH.js","./chevron-right-1BqdTUoX.js","./VersionConflict-B_aVTFKO.js","./UnsavedNote-YhkM-mgQ.js","./loader-circle-CjVcQmAV.js","./settings-2-B2-hLaF4.js","./layout-template-Btp-VVsS.js"]), import("./Edit-DSJni5L2.js")),
  "Cms/Menus/Edit": () => (__sunricePreload(["./ui-BzV6lfEf.js","./EntriesPicker-DDZeiDLw.js","./TermsPicker-CvOMeEGz.js","./check-Cvm5ZpBE.js","./search-Dj4j-7U0.js","./FieldError-LuOioba_.js","./VersionConflict-B_aVTFKO.js","./Confirm-D5KnjVgH.js","./tree-BdgFD7PS.js","./UnsavedNote-YhkM-mgQ.js","./plus-Cn7AaagX.js","./tags-RK9FkZvx.js","./link-2-HefnCw8K.js","./loader-circle-CjVcQmAV.js","./settings-2-B2-hLaF4.js","./pencil-BROVvpkc.js"]), import("./Edit-tgzhGiMl.js")),
  "Cms/Comments/Index": () => (__sunricePreload(["./ui-BzV6lfEf.js","./Confirm-D5KnjVgH.js","./FieldError-LuOioba_.js","./search-Dj4j-7U0.js","./check-Cvm5ZpBE.js","./undo-2-B1yF9-es.js","./rotate-ccw-BxpZ9siY.js","./external-link-Mqd1ZxLN.js","./pencil-BROVvpkc.js","./chevron-left-DDGNQO3o.js","./chevron-right-1BqdTUoX.js"]), import("./Index-DUN66ePu.js")),
  "Cms/Seo/Edit": () => (__sunricePreload(["./ui-BzV6lfEf.js","./FieldError-LuOioba_.js","./triangle-alert-CDOdGjCe.js"]), import("./Edit-D8ACrO9t.js")),
  "Cms/Submissions/Index": () => (__sunricePreload(["./ui-BzV6lfEf.js","./Confirm-D5KnjVgH.js","./plus-Cn7AaagX.js","./download-O5RUS1Kt.js","./layout-template-Btp-VVsS.js","./chevron-left-DDGNQO3o.js","./chevron-right-1BqdTUoX.js"]), import("./Index-CPbj1Ebg.js"))
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
