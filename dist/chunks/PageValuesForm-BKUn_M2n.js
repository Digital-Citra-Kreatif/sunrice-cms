import { j as e, r as o, t as l, l as z } from "./admin-CYfPJLU2.js";
import { u as t } from "./ui-Dh5wfMwT.js";
import { D as K, F as D, E as L, b as V, G as U, A as W, h as q, B as Q } from "./FieldInput-Bp9y7puO.js";
import { S as X } from "./FieldSections-DtIBxEBC.js";
import { V as Y } from "./VersionConflict--vbDG4vv.js";
import { L as Z } from "./LanguageTabs-Bw6h_MHg.js";
import { s as ee, T as se, w as ae } from "./seo-BlcWC4dk.js";
import { h as te } from "./EntriesPicker-D3lVX5Mf.js";
import { E as re } from "./external-link-CFxEu4M4.js";
import { L as le } from "./loader-circle-ByksABXO.js";
function fe(r) {
  return /* @__PURE__ */ e.jsx(ne, { ...r }, `${r.editUrl}:${JSON.stringify(r.params ?? {})}:${r.locale}:${r.version}:${JSON.stringify([r.values, r.seo])}`);
}
function ne({
  title: r,
  breadcrumbs: k,
  back: B,
  saveUrl: p,
  editUrl: P,
  params: m = {},
  viewUrl: f,
  empty: T,
  emptyAction: d = null,
  seoDescription: A,
  storageKey: j,
  menu: H,
  children: O,
  fields: h,
  locale: b,
  locales: C,
  translated: _ = [],
  shared: v,
  values: x,
  seo: G,
  version: I,
  can: u,
  template: N,
  templates: S,
  templateChoices: J,
  templateHelp: M
}) {
  t.useBreadcrumbs(k);
  const g = S !== void 0, y = u.update && u.template === !0, a = o.useForm({
    locale: b,
    data: x,
    seo: G ?? {},
    version: I,
    ...g && y ? { template: N ?? "" } : {}
  }), n = a.errors, E = (s) => {
    const i = Q(n, s);
    i.length > 0 && a.clearErrors(...i);
  }, $ = C[0], c = u.update, F = () => {
    a.processing || (a.transform((s) => ({ ...s, ...m })), a.put(p, { preserveScroll: !0 }));
  }, R = () => {
    a.transform((s) => ({ ...s, ...m, version: null })), a.put(p, { preserveScroll: !0 });
  };
  t.useUnsavedChanges(a.isDirty, c ? F : void 0);
  const w = /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    O,
    /* @__PURE__ */ e.jsx(Z, { current: b, locales: C, translated: _, onSwitch: (s) => o.router.get(P, { ...m, locale: s }) }),
    /* @__PURE__ */ e.jsxs("fieldset", { disabled: !c, className: "cms:flex cms:flex-col cms:gap-6", children: [
      /* @__PURE__ */ e.jsx(Y, { message: n.version, processing: a.processing, onSaveMine: R }),
      h.length === 0 ? (
        // A card like the fields' would be, so it lines up with the cards beside it.
        /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsxs(t.CardContent, { className: "cms:flex cms:flex-col cms:items-start cms:gap-3", children: [
          /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: T }),
          d && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "outline", size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsx(o.Link, { href: d.href, children: d.label }) })
        ] }) })
      ) : /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsxs(t.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: [
        (v.length > 0 || te(h)) && /* @__PURE__ */ e.jsx("p", { role: "note", className: "cms:rounded-lg cms:border cms:border-dashed cms:px-3 cms:py-2 cms:text-sm cms:text-muted-foreground", children: $ ? l("Shared by all languages: the greyed-out fields are edited in :language.", { language: z($) }) : l("Shared by all languages: the greyed-out fields are edited in the main language.") }),
        /* @__PURE__ */ e.jsx("div", { className: U(), children: h.filter((s) => K(s, { ...x, ...a.data.data })).map((s) => v.includes(s.handle) ? /* @__PURE__ */ e.jsx("fieldset", { disabled: !0, className: `${X} ${L(s)}`, title: l("Shared by all languages"), children: /* @__PURE__ */ e.jsx(D, { id: `data-${s.handle}`, field: s, content: !0, value: x[s.handle], errors: {}, onChange: () => {
        } }) }, s.handle) : /* @__PURE__ */ e.jsx("div", { className: L(s), children: /* @__PURE__ */ e.jsx(
          D,
          {
            id: `data-${s.handle}`,
            field: s,
            content: !0,
            value: a.data.data[s.handle],
            errors: V(n, `data.${s.handle}`),
            onChange: (i) => {
              a.setData("data", { ...a.data.data, [s.handle]: i }), E(`data.${s.handle}`);
            }
          }
        ) }, s.handle)) })
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsx(t.CollapsibleCard, { title: l("SEO"), description: A, titleClassName: "cms:text-base", storageKey: j, hasErrors: q(n, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !c, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(W, { bare: !0, id: "seo", fields: ee(), value: a.data.seo, errors: V(n, "seo"), onChange: (s) => {
      a.setData("seo", s), E("seo");
    } }) }) })
  ] });
  return /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (s) => {
    s.preventDefault(), F();
  }, className: `cms:flex cms:flex-col cms:gap-6 ${g ? "" : "cms:max-w-5xl"}`, children: [
    /* @__PURE__ */ e.jsx(o.Head, { title: r }),
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: r,
        back: B,
        menu: H,
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          f && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: f, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(re, {}),
            " ",
            l("View")
          ] }) }),
          c && /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", disabled: a.processing, children: [
            a.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
            " ",
            l("Save")
          ] })
        ] }),
        children: a.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: l("Unsaved changes") })
      }
    ),
    g ? (
      // Like the entry and term editors: the page's texts, and its settings beside them.
      /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:items-start cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_20rem]", children: [
        /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: w }),
        /* @__PURE__ */ e.jsx("aside", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: /* @__PURE__ */ e.jsx(
          t.CollapsibleCard,
          {
            title: l("Page settings"),
            titleClassName: "cms:text-base",
            storageKey: `${j}:page-settings`,
            hasErrors: n.template !== void 0,
            contentClassName: "cms:flex cms:flex-col cms:gap-2",
            children: /* @__PURE__ */ e.jsx(
              se,
              {
                id: "template",
                value: a.data.template ?? N ?? "",
                lookup: ae(S ?? null, J),
                onChange: (s) => {
                  a.setData("template", s), a.clearErrors("template");
                },
                example: "cms.landing",
                automatic: M ?? l("Automatic uses the first file that exists."),
                error: n.template,
                disabled: !y
              }
            )
          }
        ) })
      ] })
    ) : w
  ] });
}
export {
  fe as P
};
