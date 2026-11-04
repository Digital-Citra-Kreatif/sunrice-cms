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
const g = () => (__sunricePreload(["./ui-BzV6lfEf.js","./triangle-alert-CDOdGjCe.js","./Confirm-DLVtrvJb.js","./FieldInput-BnbpsmS3.js","./EntriesPicker-DNifzmNV.js","./TermsPicker-COfTvxHm.js","./check-Cvm5ZpBE.js","./search-Dj4j-7U0.js","./FieldError-BwAb83SC.js","./plus-Cn7AaagX.js","./chevron-right-1BqdTUoX.js","./link-2-HefnCw8K.js","./tags-RK9FkZvx.js","./copy-D11fpdhs.js","./loader-circle-CjVcQmAV.js"]), import("./Edit-CRn-kZ8J.js")), v = {
  "Cms/Blueprints/Index": () => (__sunricePreload(["./FieldError-BwAb83SC.js","./StructureList-Ci81zzFE.js","./ui-BzV6lfEf.js","./Confirm-DLVtrvJb.js","./plus-Cn7AaagX.js"]), import("./Index-DdkLA_Bt.js")),
  "Cms/Blueprints/Edit": g,
  "Cms/Fieldsets/Index": () => (__sunricePreload(["./FieldError-BwAb83SC.js","./StructureList-Ci81zzFE.js","./ui-BzV6lfEf.js","./Confirm-DLVtrvJb.js","./plus-Cn7AaagX.js"]), import("./Index-B0eA0JvZ.js")),
  // A fieldset is edited like a blueprint.
  "Cms/Fieldsets/Edit": g,
  "Cms/Entries/Index": () => (__sunricePreload(["./ui-BzV6lfEf.js","./Confirm-DLVtrvJb.js","./TermsPicker-COfTvxHm.js","./check-Cvm5ZpBE.js","./search-Dj4j-7U0.js","./ellipsis-BA6pVhi_.js","./tree-BdgFD7PS.js","./download-O5RUS1Kt.js","./plus-Cn7AaagX.js","./rotate-ccw-BxpZ9siY.js","./chevron-left-DDGNQO3o.js","./chevron-right-1BqdTUoX.js"]), import("./Index-eOFNCpYL.js")),
  "Cms/Entries/Edit": () => (__sunricePreload(["./ui-BzV6lfEf.js","./Confirm-DLVtrvJb.js","./seo-DV4g5clz.js","./FieldError-BwAb83SC.js","./TermsPicker-COfTvxHm.js","./check-Cvm5ZpBE.js","./search-Dj4j-7U0.js","./EntriesPicker-DNifzmNV.js","./undo-2-B1yF9-es.js","./languages-CvK0lHxM.js","./FieldInput-BnbpsmS3.js","./plus-Cn7AaagX.js","./chevron-right-1BqdTUoX.js","./SlugNote-BQOmSqki.js","./rotate-ccw-BxpZ9siY.js","./link-2-HefnCw8K.js","./copy-D11fpdhs.js","./layout-template-Btp-VVsS.js","./loader-circle-CjVcQmAV.js","./external-link-Mqd1ZxLN.js"]), import("./Edit-DF8kwFfw.js")),
  "Cms/Listing/Edit": () => (__sunricePreload(["./PageValuesForm-B70tMZ8S.js","./ui-BzV6lfEf.js","./FieldInput-BnbpsmS3.js","./EntriesPicker-DNifzmNV.js","./TermsPicker-COfTvxHm.js","./check-Cvm5ZpBE.js","./search-Dj4j-7U0.js","./FieldError-BwAb83SC.js","./plus-Cn7AaagX.js","./Confirm-DLVtrvJb.js","./chevron-right-1BqdTUoX.js","./languages-CvK0lHxM.js","./VersionConflict-BikAQb3f.js","./seo-DV4g5clz.js","./UnsavedNote-Cn9TNFCu.js","./external-link-Mqd1ZxLN.js","./loader-circle-CjVcQmAV.js","./settings-2-B2-hLaF4.js","./layout-template-Btp-VVsS.js"]), import("./Edit-pAN58xng.js")),
  "Cms/Terms/Index": () => (__sunricePreload(["./ui-BzV6lfEf.js","./Confirm-DLVtrvJb.js","./tree-BdgFD7PS.js","./settings-2-B2-hLaF4.js","./layout-template-Btp-VVsS.js","./plus-Cn7AaagX.js","./search-Dj4j-7U0.js","./external-link-Mqd1ZxLN.js","./rotate-ccw-BxpZ9siY.js","./ellipsis-BA6pVhi_.js","./pencil-BROVvpkc.js"]), import("./Index-BxbdUkBk.js")),
  "Cms/TaxonomyIndex/Edit": () => (__sunricePreload(["./ui-BzV6lfEf.js","./PageValuesForm-B70tMZ8S.js","./FieldInput-BnbpsmS3.js","./EntriesPicker-DNifzmNV.js","./TermsPicker-COfTvxHm.js","./check-Cvm5ZpBE.js","./search-Dj4j-7U0.js","./FieldError-BwAb83SC.js","./plus-Cn7AaagX.js","./Confirm-DLVtrvJb.js","./chevron-right-1BqdTUoX.js","./languages-CvK0lHxM.js","./VersionConflict-BikAQb3f.js","./seo-DV4g5clz.js","./UnsavedNote-Cn9TNFCu.js","./external-link-Mqd1ZxLN.js","./loader-circle-CjVcQmAV.js","./settings-2-B2-hLaF4.js","./layout-template-Btp-VVsS.js"]), import("./Edit-BBU2kCHE.js")),
  "Cms/Translations/Edit": () => (__sunricePreload(["./ui-BzV6lfEf.js","./FieldError-BwAb83SC.js","./UnsavedNote-Cn9TNFCu.js","./loader-circle-CjVcQmAV.js","./external-link-Mqd1ZxLN.js"]), import("./Edit-CETMDIPj.js")),
  "Cms/Terms/Edit": () => (__sunricePreload(["./ui-BzV6lfEf.js","./FieldError-BwAb83SC.js","./FieldInput-BnbpsmS3.js","./EntriesPicker-DNifzmNV.js","./TermsPicker-COfTvxHm.js","./check-Cvm5ZpBE.js","./search-Dj4j-7U0.js","./plus-Cn7AaagX.js","./Confirm-DLVtrvJb.js","./chevron-right-1BqdTUoX.js","./languages-CvK0lHxM.js","./SlugNote-BQOmSqki.js","./seo-DV4g5clz.js","./VersionConflict-BikAQb3f.js","./UnsavedNote-Cn9TNFCu.js","./external-link-Mqd1ZxLN.js","./loader-circle-CjVcQmAV.js","./layout-template-Btp-VVsS.js"]), import("./Edit-CMRFJF86.js")),
  "Cms/Globals/Edit": () => (__sunricePreload(["./ui-BzV6lfEf.js","./languages-CvK0lHxM.js","./FieldInput-BnbpsmS3.js","./EntriesPicker-DNifzmNV.js","./TermsPicker-COfTvxHm.js","./check-Cvm5ZpBE.js","./search-Dj4j-7U0.js","./FieldError-BwAb83SC.js","./plus-Cn7AaagX.js","./Confirm-DLVtrvJb.js","./chevron-right-1BqdTUoX.js","./VersionConflict-BikAQb3f.js","./UnsavedNote-Cn9TNFCu.js","./loader-circle-CjVcQmAV.js","./settings-2-B2-hLaF4.js","./layout-template-Btp-VVsS.js"]), import("./Edit-D9lnu01-.js")),
  "Cms/Menus/Edit": () => (__sunricePreload(["./ui-BzV6lfEf.js","./EntriesPicker-DNifzmNV.js","./TermsPicker-COfTvxHm.js","./check-Cvm5ZpBE.js","./search-Dj4j-7U0.js","./FieldError-BwAb83SC.js","./VersionConflict-BikAQb3f.js","./Confirm-DLVtrvJb.js","./tree-BdgFD7PS.js","./UnsavedNote-Cn9TNFCu.js","./plus-Cn7AaagX.js","./tags-RK9FkZvx.js","./link-2-HefnCw8K.js","./loader-circle-CjVcQmAV.js","./settings-2-B2-hLaF4.js","./pencil-BROVvpkc.js"]), import("./Edit-Bnnvex41.js")),
  "Cms/Comments/Index": () => (__sunricePreload(["./ui-BzV6lfEf.js","./Confirm-DLVtrvJb.js","./FieldError-BwAb83SC.js","./search-Dj4j-7U0.js","./check-Cvm5ZpBE.js","./undo-2-B1yF9-es.js","./rotate-ccw-BxpZ9siY.js","./external-link-Mqd1ZxLN.js","./pencil-BROVvpkc.js","./chevron-left-DDGNQO3o.js","./chevron-right-1BqdTUoX.js"]), import("./Index-BGwzn_IR.js")),
  "Cms/Seo/Edit": () => (__sunricePreload(["./ui-BzV6lfEf.js","./FieldError-BwAb83SC.js","./triangle-alert-CDOdGjCe.js"]), import("./Edit-DRjizrCs.js")),
  "Cms/Submissions/Index": () => (__sunricePreload(["./ui-BzV6lfEf.js","./Confirm-DLVtrvJb.js","./plus-Cn7AaagX.js","./download-O5RUS1Kt.js","./layout-template-Btp-VVsS.js","./chevron-left-DDGNQO3o.js","./chevron-right-1BqdTUoX.js"]), import("./Index-CTrEp96a.js"))
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
