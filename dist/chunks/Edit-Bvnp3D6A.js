import { j as e, a as $, t as i, r as j, l as x, h as A } from "./admin-DnUS3JhT.js";
import { u as l } from "./ui-Dh5wfMwT.js";
import { F as v } from "./FieldError-0lRA6b_a.js";
import { A as B, b as P, h as H, B as M } from "./FieldInput-rGeU_i8L.js";
import { l as q, F as G } from "./languages-C7LCqnet.js";
import { S as J } from "./SlugNote-CEgR3_wn.js";
import { s as R, T as z, w as Q } from "./seo-B9JkCgun.js";
import { V as W } from "./VersionConflict-BHxwc6ZP.js";
import { U as X } from "./UnsavedNote-D4w1iX8O.js";
import { E as Y } from "./external-link-CFxEu4M4.js";
import { L as Z } from "./loader-circle-ByksABXO.js";
const b = "__top";
function ge(r) {
  return /* @__PURE__ */ e.jsx(ee, { ...r }, `${r.term?.id ?? "new"}:${r.locale}:${r.version}:${JSON.stringify([r.values, r.seo, r.term?.template, r.parentId])}`);
}
function ee({ taxonomy: r, term: t, parentId: S = null, terms: T = [], translated: N, fields: k, locale: m, locales: u, shared: E, sharedValues: F, values: L, seo: _, version: D, usedBy: C = [], redirectsUrl: K = null, templates: V = null, templateChoices: I }) {
  const g = $(`cms/taxonomies/${r.handle}/terms`), f = t ? $(`cms/terms/${t.id}/content`) : g, w = t ? t.title : i("New term");
  l.useBreadcrumbs([{ label: r.title, href: `${g}?locale=${m}` }, { label: w }]);
  const a = j.useForm({
    locale: m,
    title: t?.ownTitle ?? "",
    slug: t?.slug ?? "",
    parent_id: S,
    data: L,
    seo: _ ?? {},
    template: t?.template ?? "",
    version: D
  }), n = a.errors, p = (s) => {
    const c = M(n, s);
    c.length > 0 && a.clearErrors(...c);
  }, y = () => a.processing || (t ? a.put(f, { preserveScroll: !0 }) : a.post(f)), O = () => {
    a.transform((s) => ({ ...s, version: null })), a.put(f, { preserveScroll: !0 });
  }, d = l.useEditLock({
    type: "cms.term",
    id: t?.id,
    locale: m,
    enabled: t !== null && N,
    noun: i("term"),
    leaveTo: `${g}?locale=${m}`,
    getUnsaved: () => a.isDirty ? { data: a.data.data, seo: a.data.seo, template: a.data.template } : null
  }), o = !d.readOnly, U = async (s) => {
    const c = await d.loadKept(s);
    a.setData((h) => ({
      ...h,
      data: c.data && typeof c.data == "object" ? c.data : h.data,
      seo: c.seo && typeof c.seo == "object" ? c.seo : h.seo,
      template: typeof c.template == "string" ? c.template : h.template
    }));
  };
  return l.useUnsavedChanges(a.isDirty && !d.takenOver, o ? y : void 0), /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (s) => {
    s.preventDefault(), y();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(j.Head, { title: t ? t.title : i("New term · :taxonomy", { taxonomy: r.title }) }),
    d.dialogs,
    /* @__PURE__ */ e.jsx(
      l.PageHeader,
      {
        title: w,
        back: { href: `${g}?locale=${m}`, label: i("Back to :title", { title: r.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          t?.url && /* @__PURE__ */ e.jsx(l.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: t.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(Y, {}),
            " ",
            i("View page")
          ] }) }),
          o && /* @__PURE__ */ e.jsxs(l.Button, { type: "submit", disabled: a.processing, children: [
            a.processing && /* @__PURE__ */ e.jsx(Z, { className: "cms:animate-spin" }),
            " ",
            t ? i("Save") : i("Create term")
          ] })
        ] }),
        children: /* @__PURE__ */ e.jsx(X, { dirty: a.isDirty })
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:items-start cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_20rem]", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(
          l.LanguageTabs,
          {
            value: m,
            languages: q(u, t ? t.translatedIn ?? null : [m], x),
            onValueChange: (s) => j.router.get(t ? `${g}/${t.id}/edit` : `${g}/create`, { locale: s, ...t === null && a.data.parent_id !== null ? { parent: a.data.parent_id } : {} })
          }
        ),
        /* @__PURE__ */ e.jsx(l.ViewingNotice, { by: d.viewingBy, onTakeOver: d.requestTakeOver }),
        t === null && u.length > 1 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: i("In :language. Translate it here afterwards: switch the language and give it a title there.", { language: x(m) }) }),
        !N && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:bg-muted/40 cms:p-3 cms:text-sm cms:text-muted-foreground", role: "note", children: i("Not in :language yet: the site shows the :main term meanwhile. Give it a title in :language and save to add it.", { language: x(m), main: x(u[0] ?? "en") }) }),
        /* @__PURE__ */ e.jsxs("fieldset", { disabled: !o, className: "cms:grid cms:min-w-0 cms:gap-4 cms:sm:grid-cols-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(l.Label, { htmlFor: "term-title", children: i("Title") }),
            /* @__PURE__ */ e.jsx(
              l.Input,
              {
                id: "term-title",
                value: a.data.title,
                required: !0,
                autoFocus: t === null,
                placeholder: t?.mainTitle ?? "",
                maxLength: 255,
                "aria-invalid": n.title !== void 0,
                onChange: (s) => {
                  a.setData("title", s.target.value), p("title");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(v, { message: n.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(l.Label, { htmlFor: "term-slug", children: i("Slug") }),
            /* @__PURE__ */ e.jsx(
              l.Input,
              {
                id: "term-slug",
                className: "cms:font-mono",
                value: a.data.slug,
                placeholder: i("Made from the title"),
                maxLength: 200,
                "aria-invalid": n.slug !== void 0,
                onChange: (s) => {
                  a.setData("slug", s.target.value), p("slug");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(J, { note: A(t?.hasPage ? t.slug : null, a.data.slug, !1), redirectsUrl: K }),
            /* @__PURE__ */ e.jsx(v, { message: n.slug })
          ] }),
          r.hierarchical && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:sm:col-span-2", children: [
            /* @__PURE__ */ e.jsx(l.Label, { htmlFor: "term-parent", children: i("Under") }),
            /* @__PURE__ */ e.jsxs(
              l.Select,
              {
                value: a.data.parent_id === null ? b : String(a.data.parent_id),
                onValueChange: (s) => {
                  a.setData("parent_id", s === b ? null : Number(s)), p("parent_id");
                },
                children: [
                  /* @__PURE__ */ e.jsx(l.SelectTrigger, { id: "term-parent", className: "cms:sm:w-1/2", "aria-invalid": n.parent_id !== void 0, children: /* @__PURE__ */ e.jsx(l.SelectValue, {}) }),
                  /* @__PURE__ */ e.jsxs(l.SelectContent, { children: [
                    /* @__PURE__ */ e.jsx(l.SelectItem, { value: b, children: i("Top level") }),
                    T.map((s) => /* @__PURE__ */ e.jsxs(l.SelectItem, { value: String(s.id), children: [
                      "— ".repeat(s.depth),
                      s.title
                    ] }, s.id))
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ e.jsx(v, { message: n.parent_id })
          ] })
        ] }),
        /* @__PURE__ */ e.jsx(l.KeptEditsNotice, { kept: d.kept, disabled: !o, onLoad: (s) => {
          U(s);
        }, onDiscard: (s) => {
          d.discardKept(s);
        } }),
        /* @__PURE__ */ e.jsx(W, { message: n.version, processing: a.processing, onSaveMine: O }),
        /* @__PURE__ */ e.jsx(
          G,
          {
            disabled: !o,
            fields: k,
            values: a.data.data,
            errors: n,
            storageKey: `cms:term:${r.handle}`,
            shared: E,
            sharedValues: F,
            mainLanguage: u[0] ? x(u[0]) : null,
            onChange: (s, c) => {
              a.setData("data", { ...a.data.data, [s]: c }), p(`data.${s}`);
            }
          }
        ),
        /* @__PURE__ */ e.jsx(l.CollapsibleCard, { title: i("SEO"), description: i("How this term's page appears in search results and shared links."), titleClassName: "cms:text-base", storageKey: "cms:term:seo", hasErrors: H(n, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !o, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(B, { bare: !0, id: "seo", fields: R(), value: a.data.seo, errors: P(n, "seo"), onChange: (s) => {
          a.setData("seo", s), p("seo");
        } }) }) })
      ] }),
      /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(
          l.CollapsibleCard,
          {
            title: i("Page settings"),
            titleClassName: "cms:text-base",
            storageKey: "cms:term:page-settings",
            hasErrors: n.template !== void 0,
            contentClassName: "cms:flex cms:flex-col cms:gap-2",
            children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !o, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: /* @__PURE__ */ e.jsx(
              z,
              {
                id: "template",
                value: a.data.template,
                onChange: (s) => a.setData("template", s),
                lookup: Q(V, I),
                example: `cms.${r.handle}-special`,
                automatic: i("Automatic uses the taxonomy's template."),
                error: n.template,
                disabled: !o
              }
            ) })
          }
        ),
        t && /* @__PURE__ */ e.jsxs(l.CollapsibleCard, { title: i("Used by"), titleClassName: "cms:text-base", storageKey: "cms:term:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          C.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: i("No content links here through its fields.") }),
          C.map((s) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:gap-2", children: [
            s.url ? /* @__PURE__ */ e.jsx("a", { href: s.url, className: "cms:truncate cms:underline-offset-4 cms:hover:underline", children: s.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:truncate", children: s.label }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", title: s.field, children: s.fieldLabel ?? s.field })
          ] }, `${s.label}:${s.field}`))
        ] })
      ] })
    ] })
  ] });
}
export {
  ge as default
};
