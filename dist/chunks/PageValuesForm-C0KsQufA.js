import { j as e, r as c, l as D, t as n } from "./admin-jLkZXlkF.js";
import { u as t } from "./ui-Dh5wfMwT.js";
import { D as z, E as K, F as y, G as L, b as V, H as W, A as q, h as Q, B as X } from "./FieldInput-B3seWJR2.js";
import { l as Y, S as Z } from "./languages-otg5-_I0.js";
import { V as ee } from "./VersionConflict-DX0WKDud.js";
import { s as se, T as ae, w as te } from "./seo-NAOsLdKh.js";
import { U as re } from "./UnsavedNote-CwmldI5M.js";
import { E as le } from "./external-link-CFxEu4M4.js";
import { L as ne } from "./loader-circle-ByksABXO.js";
function je(r) {
  return /* @__PURE__ */ e.jsx(ie, { ...r }, `${r.editUrl}:${JSON.stringify(r.params ?? {})}:${r.locale}:${r.version}:${JSON.stringify([r.values, r.seo])}`);
}
function ie({
  title: r,
  breadcrumbs: P,
  back: T,
  saveUrl: g,
  editUrl: k,
  params: m = {},
  viewUrl: p,
  empty: B,
  emptyAction: d = null,
  seoDescription: A,
  storageKey: j,
  menu: H,
  children: M,
  fields: f,
  locale: v,
  locales: C,
  translated: O = [],
  shared: _,
  values: x,
  seo: G,
  version: I,
  can: h,
  template: b,
  templates: N,
  templateChoices: J,
  templateHelp: R
}) {
  t.useBreadcrumbs(P);
  const u = N !== void 0, E = h.update && h.template === !0, a = c.useForm({
    locale: v,
    data: x,
    seo: G ?? {},
    version: I,
    ...u && E ? { template: b ?? "" } : {}
  }), l = a.errors, $ = (s) => {
    const o = X(l, s);
    o.length > 0 && a.clearErrors(...o);
  }, S = C[0], i = h.update, F = () => {
    a.processing || (a.transform((s) => ({ ...s, ...m })), a.put(g, { preserveScroll: !0 }));
  }, U = () => {
    a.transform((s) => ({ ...s, ...m, version: null })), a.put(g, { preserveScroll: !0 });
  };
  t.useUnsavedChanges(a.isDirty, i ? F : void 0);
  const w = /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    M,
    /* @__PURE__ */ e.jsx(t.LanguageTabs, { value: v, languages: Y(C, O, D), onValueChange: (s) => c.router.get(k, { ...m, locale: s }) }),
    /* @__PURE__ */ e.jsxs("fieldset", { disabled: !i, className: "cms:flex cms:flex-col cms:gap-6", children: [
      /* @__PURE__ */ e.jsx(ee, { message: l.version, processing: a.processing, onSaveMine: U }),
      f.length === 0 ? (
        // A card like the fields' would be, so it lines up with the cards beside it.
        /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsxs(t.CardContent, { className: "cms:flex cms:flex-col cms:items-start cms:gap-3", children: [
          /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: B }),
          d && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "outline", size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsx(c.Link, { href: d.href, children: d.label }) })
        ] }) })
      ) : /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsx(t.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: /* @__PURE__ */ e.jsx(z.Provider, { value: S ? D(S) : null, children: /* @__PURE__ */ e.jsx("div", { className: W(), children: f.filter((s) => K(s, { ...x, ...a.data.data })).map((s) => _.includes(s.handle) ? /* @__PURE__ */ e.jsx("fieldset", { disabled: !0, className: `${Z} ${L(s)}`, children: /* @__PURE__ */ e.jsx(y, { id: `data-${s.handle}`, field: s, content: !0, value: x[s.handle], errors: {}, onChange: () => {
      }, shared: !0 }) }, s.handle) : /* @__PURE__ */ e.jsx("div", { className: L(s), children: /* @__PURE__ */ e.jsx(
        y,
        {
          id: `data-${s.handle}`,
          field: s,
          content: !0,
          value: a.data.data[s.handle],
          errors: V(l, `data.${s.handle}`),
          onChange: (o) => {
            a.setData("data", { ...a.data.data, [s.handle]: o }), $(`data.${s.handle}`);
          }
        }
      ) }, s.handle)) }) }) }) })
    ] }),
    /* @__PURE__ */ e.jsx(t.CollapsibleCard, { title: n("SEO"), description: A, titleClassName: "cms:text-base", storageKey: j, hasErrors: Q(l, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !i, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(q, { bare: !0, id: "seo", fields: se(), value: a.data.seo, errors: V(l, "seo"), onChange: (s) => {
      a.setData("seo", s), $("seo");
    } }) }) })
  ] });
  return /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (s) => {
    s.preventDefault(), F();
  }, className: `cms:flex cms:flex-col cms:gap-6 ${u ? "" : "cms:max-w-5xl"}`, children: [
    /* @__PURE__ */ e.jsx(c.Head, { title: r }),
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: r,
        back: T,
        menu: H,
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          p && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: p, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(le, {}),
            " ",
            n("View")
          ] }) }),
          i && /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", disabled: a.processing, children: [
            a.processing && /* @__PURE__ */ e.jsx(ne, { className: "cms:animate-spin" }),
            " ",
            n("Save")
          ] })
        ] }),
        children: /* @__PURE__ */ e.jsx(re, { dirty: a.isDirty })
      }
    ),
    u ? (
      // Like the entry and term editors: the page's texts, and its settings beside them.
      /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:items-start cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_20rem]", children: [
        /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: w }),
        /* @__PURE__ */ e.jsx("aside", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: /* @__PURE__ */ e.jsx(
          t.CollapsibleCard,
          {
            title: n("Page settings"),
            titleClassName: "cms:text-base",
            storageKey: `${j}:page-settings`,
            hasErrors: l.template !== void 0,
            contentClassName: "cms:flex cms:flex-col cms:gap-2",
            children: /* @__PURE__ */ e.jsx(
              ae,
              {
                id: "template",
                value: a.data.template ?? b ?? "",
                lookup: te(N ?? null, J),
                onChange: (s) => {
                  a.setData("template", s), a.clearErrors("template");
                },
                example: "cms.landing",
                automatic: R ?? n("Automatic uses the first file that exists."),
                error: l.template,
                disabled: !E
              }
            )
          }
        ) })
      ] })
    ) : w
  ] });
}
export {
  je as P
};
