import { j as e, a as S, t as i, r as v, l as h, e as U } from "./admin-D8w3Ih7q.js";
import { u as l } from "./ui-Dh5wfMwT.js";
import { F as f } from "./FieldError-DGX_mF_G.js";
import { x as P, b as B, h as H, y as A } from "./FieldInput-B0EIykHK.js";
import { F as M } from "./FieldSections-CIJr-f5c.js";
import { S as q, T as G } from "./SlugNote-o5OC0159.js";
import { V as J } from "./VersionConflict-CxefABSs.js";
import { L as R } from "./LanguageTabs-ViLa7fyG.js";
import { s as z } from "./seo-Uu0c2psJ.js";
import { E as Q } from "./external-link-CFxEu4M4.js";
import { L as W } from "./loader-circle-ByksABXO.js";
const b = "__top";
function me(r) {
  return /* @__PURE__ */ e.jsx(X, { ...r }, `${r.term?.id ?? "new"}:${r.locale}:${r.version}:${JSON.stringify([r.values, r.seo, r.term?.template, r.parentId])}`);
}
function X({ taxonomy: r, term: t, parentId: $ = null, terms: k = [], translated: N, fields: T, locale: m, locales: p, shared: L, sharedValues: E, values: F, seo: _, version: D, usedBy: y = [], redirectsUrl: K = null, templates: I = null }) {
  const g = S(`cms/taxonomies/${r.handle}/terms`), j = t ? S(`cms/terms/${t.id}/content`) : g, C = t ? t.title : i("New term");
  l.useBreadcrumbs([{ label: r.title, href: `${g}?locale=${m}` }, { label: C }]);
  const a = v.useForm({
    locale: m,
    title: t?.ownTitle ?? "",
    slug: t?.slug ?? "",
    parent_id: $,
    data: F,
    seo: _ ?? {},
    template: t?.template ?? "",
    version: D
  }), n = a.errors, u = (s) => {
    const c = A(n, s);
    c.length > 0 && a.clearErrors(...c);
  }, w = () => a.processing || (t ? a.put(j, { preserveScroll: !0 }) : a.post(j)), O = () => {
    a.transform((s) => ({ ...s, version: null })), a.put(j, { preserveScroll: !0 });
  }, d = l.useEditLock({
    type: "cms.term",
    id: t?.id,
    locale: m,
    enabled: t !== null && N,
    noun: i("term"),
    leaveTo: `${g}?locale=${m}`,
    getUnsaved: () => a.isDirty ? { data: a.data.data, seo: a.data.seo, template: a.data.template } : null
  }), o = !d.readOnly, V = async (s) => {
    const c = await d.loadKept(s);
    a.setData((x) => ({
      ...x,
      data: c.data && typeof c.data == "object" ? c.data : x.data,
      seo: c.seo && typeof c.seo == "object" ? c.seo : x.seo,
      template: typeof c.template == "string" ? c.template : x.template
    }));
  };
  return l.useUnsavedChanges(a.isDirty && !d.takenOver, o ? w : void 0), /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (s) => {
    s.preventDefault(), w();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(v.Head, { title: t ? t.title : i("New term · :taxonomy", { taxonomy: r.title }) }),
    d.dialogs,
    /* @__PURE__ */ e.jsx(
      l.PageHeader,
      {
        title: C,
        back: { href: `${g}?locale=${m}`, label: i("Back to :title", { title: r.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          t?.url && /* @__PURE__ */ e.jsx(l.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: t.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(Q, {}),
            " ",
            i("View page")
          ] }) }),
          o && /* @__PURE__ */ e.jsxs(l.Button, { type: "submit", disabled: a.processing, children: [
            a.processing && /* @__PURE__ */ e.jsx(W, { className: "cms:animate-spin" }),
            " ",
            t ? i("Save") : i("Create term")
          ] })
        ] }),
        children: a.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: i("Unsaved changes") })
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:items-start cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_20rem]", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(
          R,
          {
            current: m,
            locales: p,
            translated: t ? t.translatedIn ?? null : [m],
            onSwitch: (s) => v.router.get(t ? `${g}/${t.id}/edit` : `${g}/create`, { locale: s, ...t === null && a.data.parent_id !== null ? { parent: a.data.parent_id } : {} })
          }
        ),
        /* @__PURE__ */ e.jsx(l.ViewingNotice, { by: d.viewingBy, onTakeOver: d.requestTakeOver }),
        t === null && p.length > 1 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: i("In :language. Translate it here afterwards: switch the language and give it a title there.", { language: h(m) }) }),
        !N && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:bg-muted/40 cms:p-3 cms:text-sm cms:text-muted-foreground", role: "note", children: i("Not in :language yet: the site shows the :main term meanwhile. Give it a title in :language and save to add it.", { language: h(m), main: h(p[0] ?? "en") }) }),
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
                  a.setData("title", s.target.value), u("title");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(f, { message: n.title })
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
                  a.setData("slug", s.target.value), u("slug");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(q, { note: U(t?.hasPage ? t.slug : null, a.data.slug, !1), redirectsUrl: K }),
            /* @__PURE__ */ e.jsx(f, { message: n.slug })
          ] }),
          r.hierarchical && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:sm:col-span-2", children: [
            /* @__PURE__ */ e.jsx(l.Label, { htmlFor: "term-parent", children: i("Under") }),
            /* @__PURE__ */ e.jsxs(
              l.Select,
              {
                value: a.data.parent_id === null ? b : String(a.data.parent_id),
                onValueChange: (s) => {
                  a.setData("parent_id", s === b ? null : Number(s)), u("parent_id");
                },
                children: [
                  /* @__PURE__ */ e.jsx(l.SelectTrigger, { id: "term-parent", className: "cms:sm:w-1/2", "aria-invalid": n.parent_id !== void 0, children: /* @__PURE__ */ e.jsx(l.SelectValue, {}) }),
                  /* @__PURE__ */ e.jsxs(l.SelectContent, { children: [
                    /* @__PURE__ */ e.jsx(l.SelectItem, { value: b, children: i("Top level") }),
                    k.map((s) => /* @__PURE__ */ e.jsxs(l.SelectItem, { value: String(s.id), children: [
                      "— ".repeat(s.depth),
                      s.title
                    ] }, s.id))
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ e.jsx(f, { message: n.parent_id })
          ] })
        ] }),
        /* @__PURE__ */ e.jsx(l.KeptEditsNotice, { kept: d.kept, disabled: !o, onLoad: (s) => {
          V(s);
        }, onDiscard: (s) => {
          d.discardKept(s);
        } }),
        /* @__PURE__ */ e.jsx(J, { message: n.version, processing: a.processing, onSaveMine: O }),
        /* @__PURE__ */ e.jsx(
          M,
          {
            disabled: !o,
            fields: T,
            values: a.data.data,
            errors: n,
            storageKey: `cms:term:${r.handle}`,
            shared: L,
            sharedValues: E,
            sharedNote: i("Shared by all languages: the greyed-out fields are edited in :language.", { language: h(p[0] ?? "en") }),
            onChange: (s, c) => {
              a.setData("data", { ...a.data.data, [s]: c }), u(`data.${s}`);
            }
          }
        ),
        /* @__PURE__ */ e.jsx(l.CollapsibleCard, { title: i("SEO"), description: i("How this term's page appears in search results and shared links."), titleClassName: "cms:text-base", storageKey: "cms:term:seo", hasErrors: H(n, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !o, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(P, { bare: !0, id: "seo", fields: z(), value: a.data.seo, errors: B(n, "seo"), onChange: (s) => {
          a.setData("seo", s), u("seo");
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
            children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: !o, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: [
              /* @__PURE__ */ e.jsx(l.Label, { htmlFor: "template", children: i("Template") }),
              /* @__PURE__ */ e.jsx(
                l.Input,
                {
                  id: "template",
                  className: "cms:font-mono",
                  placeholder: `cms.${r.handle}-special`,
                  value: a.data.template,
                  onChange: (s) => a.setData("template", s.target.value),
                  "aria-invalid": n.template !== void 0
                }
              ),
              /* @__PURE__ */ e.jsx(G, { example: `cms.${r.handle}-special`, empty: i("Leave empty to use the taxonomy's template."), value: a.data.template, lookup: I }),
              /* @__PURE__ */ e.jsx(f, { message: n.template })
            ] })
          }
        ),
        t && /* @__PURE__ */ e.jsxs(l.CollapsibleCard, { title: i("Used by"), titleClassName: "cms:text-base", storageKey: "cms:term:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          y.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: i("No content links here through its fields.") }),
          y.map((s) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:gap-2", children: [
            s.url ? /* @__PURE__ */ e.jsx("a", { href: s.url, className: "cms:truncate cms:underline-offset-4 cms:hover:underline", children: s.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:truncate", children: s.label }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", title: s.field, children: s.fieldLabel ?? s.field })
          ] }, `${s.label}:${s.field}`))
        ] })
      ] })
    ] })
  ] });
}
export {
  me as default
};
