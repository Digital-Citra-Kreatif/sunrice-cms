import { j as e, r as o, l as D, t as l } from "./admin-DCThpc9t.js";
import { u as t } from "./ui-Dh5wfMwT.js";
import { D as K, F as L, E as V, b as T, G as U, A as W, h as q, B as Q } from "./FieldInput-C3H3znTN.js";
import { l as X, S as Y } from "./languages-_PUNyV1m.js";
import { V as Z } from "./VersionConflict--geVinT6.js";
import { s as ee, T as se, w as ae } from "./seo-C_t4jkTG.js";
import { h as te } from "./EntriesPicker-B2JoqUav.js";
import { E as re } from "./external-link-CFxEu4M4.js";
import { L as le } from "./loader-circle-ByksABXO.js";
function pe(r) {
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
  empty: A,
  emptyAction: d = null,
  seoDescription: H,
  storageKey: j,
  menu: O,
  children: _,
  fields: h,
  locale: b,
  locales: C,
  translated: G = [],
  shared: v,
  values: u,
  seo: I,
  version: J,
  can: x,
  template: N,
  templates: S,
  templateChoices: M,
  templateHelp: R
}) {
  t.useBreadcrumbs(k);
  const g = S !== void 0, y = x.update && x.template === !0, a = o.useForm({
    locale: b,
    data: u,
    seo: I ?? {},
    version: J,
    ...g && y ? { template: N ?? "" } : {}
  }), n = a.errors, E = (s) => {
    const i = Q(n, s);
    i.length > 0 && a.clearErrors(...i);
  }, $ = C[0], c = x.update, F = () => {
    a.processing || (a.transform((s) => ({ ...s, ...m })), a.put(p, { preserveScroll: !0 }));
  }, z = () => {
    a.transform((s) => ({ ...s, ...m, version: null })), a.put(p, { preserveScroll: !0 });
  };
  t.useUnsavedChanges(a.isDirty, c ? F : void 0);
  const w = /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    _,
    /* @__PURE__ */ e.jsx(t.LanguageTabs, { value: b, languages: X(C, G, D), onValueChange: (s) => o.router.get(P, { ...m, locale: s }) }),
    /* @__PURE__ */ e.jsxs("fieldset", { disabled: !c, className: "cms:flex cms:flex-col cms:gap-6", children: [
      /* @__PURE__ */ e.jsx(Z, { message: n.version, processing: a.processing, onSaveMine: z }),
      h.length === 0 ? (
        // A card like the fields' would be, so it lines up with the cards beside it.
        /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsxs(t.CardContent, { className: "cms:flex cms:flex-col cms:items-start cms:gap-3", children: [
          /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: A }),
          d && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "outline", size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsx(o.Link, { href: d.href, children: d.label }) })
        ] }) })
      ) : /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsxs(t.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: [
        (v.length > 0 || te(h)) && /* @__PURE__ */ e.jsx("p", { role: "note", className: "cms:rounded-lg cms:border cms:border-dashed cms:px-3 cms:py-2 cms:text-sm cms:text-muted-foreground", children: $ ? l("Shared by all languages: the greyed-out fields are edited in :language.", { language: D($) }) : l("Shared by all languages: the greyed-out fields are edited in the main language.") }),
        /* @__PURE__ */ e.jsx("div", { className: U(), children: h.filter((s) => K(s, { ...u, ...a.data.data })).map((s) => v.includes(s.handle) ? /* @__PURE__ */ e.jsx("fieldset", { disabled: !0, className: `${Y} ${V(s)}`, title: l("Shared by all languages"), children: /* @__PURE__ */ e.jsx(L, { id: `data-${s.handle}`, field: s, content: !0, value: u[s.handle], errors: {}, onChange: () => {
        } }) }, s.handle) : /* @__PURE__ */ e.jsx("div", { className: V(s), children: /* @__PURE__ */ e.jsx(
          L,
          {
            id: `data-${s.handle}`,
            field: s,
            content: !0,
            value: a.data.data[s.handle],
            errors: T(n, `data.${s.handle}`),
            onChange: (i) => {
              a.setData("data", { ...a.data.data, [s.handle]: i }), E(`data.${s.handle}`);
            }
          }
        ) }, s.handle)) })
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsx(t.CollapsibleCard, { title: l("SEO"), description: H, titleClassName: "cms:text-base", storageKey: j, hasErrors: q(n, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !c, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(W, { bare: !0, id: "seo", fields: ee(), value: a.data.seo, errors: T(n, "seo"), onChange: (s) => {
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
        menu: O,
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
                lookup: ae(S ?? null, M),
                onChange: (s) => {
                  a.setData("template", s), a.clearErrors("template");
                },
                example: "cms.landing",
                automatic: R ?? l("Automatic uses the first file that exists."),
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
  pe as P
};
