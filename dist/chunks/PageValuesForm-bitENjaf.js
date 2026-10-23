import { j as s, r as u, t as n, l as O } from "./admin-DOeXGS4s.js";
import { u as t } from "./ui-Dh5wfMwT.js";
import { D as G, F as S, E as N, b as y, G as I, A as J, h as M, B as R } from "./FieldInput-Bq_thxuf.js";
import { S as _ } from "./FieldSections-1hrfbCvr.js";
import { V as K } from "./VersionConflict-D337XINe.js";
import { L as T } from "./LanguageTabs-D9p4MxF1.js";
import { s as U } from "./seo-DOAf80_3.js";
import { h as q } from "./EntriesPicker-9S07hwjh.js";
import { E as z } from "./external-link-CFxEu4M4.js";
import { L as Q } from "./loader-circle-ByksABXO.js";
function le(r) {
  return /* @__PURE__ */ s.jsx(W, { ...r }, `${r.editUrl}:${JSON.stringify(r.params ?? {})}:${r.locale}:${r.version}:${JSON.stringify([r.values, r.seo])}`);
}
function W({
  title: r,
  breadcrumbs: C,
  back: E,
  saveUrl: h,
  editUrl: $,
  params: d = {},
  viewUrl: g,
  empty: F,
  seoDescription: D,
  storageKey: L,
  menu: w,
  children: V,
  fields: c,
  locale: x,
  locales: j,
  translated: A = [],
  shared: f,
  values: m,
  seo: B,
  version: P,
  can: k
}) {
  t.useBreadcrumbs(C);
  const a = u.useForm({ locale: x, data: m, seo: B ?? {}, version: P }), o = a.errors, p = (e) => {
    const i = R(o, e);
    i.length > 0 && a.clearErrors(...i);
  }, b = j[0], l = k.update, v = () => {
    a.processing || (a.transform((e) => ({ ...e, ...d })), a.put(h, { preserveScroll: !0 }));
  }, H = () => {
    a.transform((e) => ({ ...e, ...d, version: null })), a.put(h, { preserveScroll: !0 });
  };
  return t.useUnsavedChanges(a.isDirty, l ? v : void 0), /* @__PURE__ */ s.jsxs("form", { noValidate: !0, onSubmit: (e) => {
    e.preventDefault(), v();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ s.jsx(u.Head, { title: r }),
    /* @__PURE__ */ s.jsx(
      t.PageHeader,
      {
        title: r,
        back: E,
        menu: w,
        actions: /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
          g && /* @__PURE__ */ s.jsx(t.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ s.jsxs("a", { href: g, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ s.jsx(z, {}),
            " ",
            n("View")
          ] }) }),
          l && /* @__PURE__ */ s.jsxs(t.Button, { type: "submit", disabled: a.processing, children: [
            a.processing && /* @__PURE__ */ s.jsx(Q, { className: "cms:animate-spin" }),
            " ",
            n("Save")
          ] })
        ] }),
        children: a.isDirty && /* @__PURE__ */ s.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: n("Unsaved changes") })
      }
    ),
    V,
    /* @__PURE__ */ s.jsx(T, { current: x, locales: j, translated: A, onSwitch: (e) => u.router.get($, { ...d, locale: e }) }),
    /* @__PURE__ */ s.jsxs("fieldset", { disabled: !l, className: "cms:flex cms:flex-col cms:gap-6", children: [
      /* @__PURE__ */ s.jsx(K, { message: o.version, processing: a.processing, onSaveMine: H }),
      c.length === 0 ? /* @__PURE__ */ s.jsx("p", { className: "cms:text-muted-foreground", children: F }) : /* @__PURE__ */ s.jsx(t.Card, { children: /* @__PURE__ */ s.jsxs(t.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: [
        (f.length > 0 || q(c)) && /* @__PURE__ */ s.jsx("p", { role: "note", className: "cms:rounded-lg cms:border cms:border-dashed cms:px-3 cms:py-2 cms:text-sm cms:text-muted-foreground", children: b ? n("Shared by all languages: the greyed-out fields are edited in :language.", { language: O(b) }) : n("Shared by all languages: the greyed-out fields are edited in the main language.") }),
        /* @__PURE__ */ s.jsx("div", { className: I(), children: c.filter((e) => G(e, { ...m, ...a.data.data })).map((e) => f.includes(e.handle) ? /* @__PURE__ */ s.jsx("fieldset", { disabled: !0, className: `${_} ${N(e)}`, title: n("Shared by all languages"), children: /* @__PURE__ */ s.jsx(S, { id: `data-${e.handle}`, field: e, content: !0, value: m[e.handle], errors: {}, onChange: () => {
        } }) }, e.handle) : /* @__PURE__ */ s.jsx("div", { className: N(e), children: /* @__PURE__ */ s.jsx(
          S,
          {
            id: `data-${e.handle}`,
            field: e,
            content: !0,
            value: a.data.data[e.handle],
            errors: y(o, `data.${e.handle}`),
            onChange: (i) => {
              a.setData("data", { ...a.data.data, [e.handle]: i }), p(`data.${e.handle}`);
            }
          }
        ) }, e.handle)) })
      ] }) })
    ] }),
    /* @__PURE__ */ s.jsx(t.CollapsibleCard, { title: n("SEO"), description: D, titleClassName: "cms:text-base", storageKey: L, hasErrors: M(o, "seo"), children: /* @__PURE__ */ s.jsx("fieldset", { disabled: !l, className: "cms:min-w-0", children: /* @__PURE__ */ s.jsx(J, { bare: !0, id: "seo", fields: U(), value: a.data.seo, errors: y(o, "seo"), onChange: (e) => {
      a.setData("seo", e), p("seo");
    } }) }) })
  ] });
}
export {
  le as P
};
