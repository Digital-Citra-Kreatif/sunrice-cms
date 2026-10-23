import { j as s, r as u, t as n, l as H } from "./admin-DHtIIW6o.js";
import { u as t } from "./ui-Dh5wfMwT.js";
import { z as O, F as y, b as v, x as I, h as J, y as M } from "./FieldInput-BTBWVKy6.js";
import { S as R } from "./FieldSections-D4LcAo0i.js";
import { V as _ } from "./VersionConflict-Ccmt53ZY.js";
import { L as z } from "./LanguageTabs-CMHA_wB_.js";
import { s as K } from "./seo-Bq5ZjOXm.js";
import { h as T } from "./EntriesPicker-CiRbK2ZS.js";
import { E as U } from "./external-link-CFxEu4M4.js";
import { L as q } from "./loader-circle-ByksABXO.js";
function ne(r) {
  return /* @__PURE__ */ s.jsx(G, { ...r }, `${r.editUrl}:${JSON.stringify(r.params ?? {})}:${r.locale}:${r.version}:${JSON.stringify([r.values, r.seo])}`);
}
function G({
  title: r,
  breadcrumbs: C,
  back: N,
  saveUrl: h,
  editUrl: E,
  params: d = {},
  viewUrl: g,
  empty: F,
  seoDescription: $,
  storageKey: D,
  menu: L,
  children: V,
  fields: c,
  locale: x,
  locales: f,
  translated: w = [],
  shared: j,
  values: m,
  seo: A,
  version: P,
  can: k
}) {
  t.useBreadcrumbs(C);
  const a = u.useForm({ locale: x, data: m, seo: A ?? {}, version: P }), o = a.errors, p = (e) => {
    const i = M(o, e);
    i.length > 0 && a.clearErrors(...i);
  }, b = f[0], l = k.update, S = () => {
    a.processing || (a.transform((e) => ({ ...e, ...d })), a.put(h, { preserveScroll: !0 }));
  }, B = () => {
    a.transform((e) => ({ ...e, ...d, version: null })), a.put(h, { preserveScroll: !0 });
  };
  return t.useUnsavedChanges(a.isDirty, l ? S : void 0), /* @__PURE__ */ s.jsxs("form", { noValidate: !0, onSubmit: (e) => {
    e.preventDefault(), S();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ s.jsx(u.Head, { title: r }),
    /* @__PURE__ */ s.jsx(
      t.PageHeader,
      {
        title: r,
        back: N,
        menu: L,
        actions: /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
          g && /* @__PURE__ */ s.jsx(t.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ s.jsxs("a", { href: g, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ s.jsx(U, {}),
            " ",
            n("View")
          ] }) }),
          l && /* @__PURE__ */ s.jsxs(t.Button, { type: "submit", disabled: a.processing, children: [
            a.processing && /* @__PURE__ */ s.jsx(q, { className: "cms:animate-spin" }),
            " ",
            n("Save")
          ] })
        ] }),
        children: a.isDirty && /* @__PURE__ */ s.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: n("Unsaved changes") })
      }
    ),
    V,
    /* @__PURE__ */ s.jsx(z, { current: x, locales: f, translated: w, onSwitch: (e) => u.router.get(E, { ...d, locale: e }) }),
    /* @__PURE__ */ s.jsxs("fieldset", { disabled: !l, className: "cms:flex cms:flex-col cms:gap-6", children: [
      /* @__PURE__ */ s.jsx(_, { message: o.version, processing: a.processing, onSaveMine: B }),
      c.length === 0 ? /* @__PURE__ */ s.jsx("p", { className: "cms:text-muted-foreground", children: F }) : /* @__PURE__ */ s.jsx(t.Card, { children: /* @__PURE__ */ s.jsxs(t.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: [
        (j.length > 0 || T(c)) && /* @__PURE__ */ s.jsx("p", { role: "note", className: "cms:rounded-lg cms:border cms:border-dashed cms:px-3 cms:py-2 cms:text-sm cms:text-muted-foreground", children: b ? n("Shared by all languages: the greyed-out fields are edited in :language.", { language: H(b) }) : n("Shared by all languages: the greyed-out fields are edited in the main language.") }),
        c.filter((e) => O(e, { ...m, ...a.data.data })).map((e) => j.includes(e.handle) ? /* @__PURE__ */ s.jsx("fieldset", { disabled: !0, className: R, title: n("Shared by all languages"), children: /* @__PURE__ */ s.jsx(y, { id: `data-${e.handle}`, field: e, content: !0, value: m[e.handle], errors: {}, onChange: () => {
        } }) }, e.handle) : /* @__PURE__ */ s.jsx(
          y,
          {
            id: `data-${e.handle}`,
            field: e,
            content: !0,
            value: a.data.data[e.handle],
            errors: v(o, `data.${e.handle}`),
            onChange: (i) => {
              a.setData("data", { ...a.data.data, [e.handle]: i }), p(`data.${e.handle}`);
            }
          },
          e.handle
        ))
      ] }) })
    ] }),
    /* @__PURE__ */ s.jsx(t.CollapsibleCard, { title: n("SEO"), description: $, titleClassName: "cms:text-base", storageKey: D, hasErrors: J(o, "seo"), children: /* @__PURE__ */ s.jsx("fieldset", { disabled: !l, className: "cms:min-w-0", children: /* @__PURE__ */ s.jsx(I, { bare: !0, id: "seo", fields: K(), value: a.data.seo, errors: v(o, "seo"), onChange: (e) => {
      a.setData("seo", e), p("seo");
    } }) }) })
  ] });
}
export {
  ne as P
};
