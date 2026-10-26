import { j as e, a as S, t as l, r as j, l as x, h as A } from "./admin-CYfPJLU2.js";
import { u as i } from "./ui-Dh5wfMwT.js";
import { F as v } from "./FieldError-BIWghK_o.js";
import { A as B, b as P, h as H, B as M } from "./FieldInput-Bp9y7puO.js";
import { F as q } from "./FieldSections-DtIBxEBC.js";
import { S as G } from "./SlugNote-ChIcbtnv.js";
import { s as J, T as R, w as z } from "./seo-BlcWC4dk.js";
import { V as Q } from "./VersionConflict--vbDG4vv.js";
import { L as W } from "./LanguageTabs-Bw6h_MHg.js";
import { E as X } from "./external-link-CFxEu4M4.js";
import { L as Y } from "./loader-circle-ByksABXO.js";
const b = "__top";
function oe(r) {
  return /* @__PURE__ */ e.jsx(Z, { ...r }, `${r.term?.id ?? "new"}:${r.locale}:${r.version}:${JSON.stringify([r.values, r.seo, r.term?.template, r.parentId])}`);
}
function Z({ taxonomy: r, term: t, parentId: $ = null, terms: k = [], translated: N, fields: T, locale: d, locales: p, shared: E, sharedValues: F, values: L, seo: _, version: D, usedBy: C = [], redirectsUrl: K = null, templates: I = null, templateChoices: O }) {
  const g = S(`cms/taxonomies/${r.handle}/terms`), f = t ? S(`cms/terms/${t.id}/content`) : g, w = t ? t.title : l("New term");
  i.useBreadcrumbs([{ label: r.title, href: `${g}?locale=${d}` }, { label: w }]);
  const a = j.useForm({
    locale: d,
    title: t?.ownTitle ?? "",
    slug: t?.slug ?? "",
    parent_id: $,
    data: L,
    seo: _ ?? {},
    template: t?.template ?? "",
    version: D
  }), n = a.errors, u = (s) => {
    const c = M(n, s);
    c.length > 0 && a.clearErrors(...c);
  }, y = () => a.processing || (t ? a.put(f, { preserveScroll: !0 }) : a.post(f)), V = () => {
    a.transform((s) => ({ ...s, version: null })), a.put(f, { preserveScroll: !0 });
  }, m = i.useEditLock({
    type: "cms.term",
    id: t?.id,
    locale: d,
    enabled: t !== null && N,
    noun: l("term"),
    leaveTo: `${g}?locale=${d}`,
    getUnsaved: () => a.isDirty ? { data: a.data.data, seo: a.data.seo, template: a.data.template } : null
  }), o = !m.readOnly, U = async (s) => {
    const c = await m.loadKept(s);
    a.setData((h) => ({
      ...h,
      data: c.data && typeof c.data == "object" ? c.data : h.data,
      seo: c.seo && typeof c.seo == "object" ? c.seo : h.seo,
      template: typeof c.template == "string" ? c.template : h.template
    }));
  };
  return i.useUnsavedChanges(a.isDirty && !m.takenOver, o ? y : void 0), /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (s) => {
    s.preventDefault(), y();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(j.Head, { title: t ? t.title : l("New term · :taxonomy", { taxonomy: r.title }) }),
    m.dialogs,
    /* @__PURE__ */ e.jsx(
      i.PageHeader,
      {
        title: w,
        back: { href: `${g}?locale=${d}`, label: l("Back to :title", { title: r.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          t?.url && /* @__PURE__ */ e.jsx(i.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: t.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(X, {}),
            " ",
            l("View page")
          ] }) }),
          o && /* @__PURE__ */ e.jsxs(i.Button, { type: "submit", disabled: a.processing, children: [
            a.processing && /* @__PURE__ */ e.jsx(Y, { className: "cms:animate-spin" }),
            " ",
            t ? l("Save") : l("Create term")
          ] })
        ] }),
        children: a.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: l("Unsaved changes") })
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:items-start cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_20rem]", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(
          W,
          {
            current: d,
            locales: p,
            translated: t ? t.translatedIn ?? null : [d],
            onSwitch: (s) => j.router.get(t ? `${g}/${t.id}/edit` : `${g}/create`, { locale: s, ...t === null && a.data.parent_id !== null ? { parent: a.data.parent_id } : {} })
          }
        ),
        /* @__PURE__ */ e.jsx(i.ViewingNotice, { by: m.viewingBy, onTakeOver: m.requestTakeOver }),
        t === null && p.length > 1 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: l("In :language. Translate it here afterwards: switch the language and give it a title there.", { language: x(d) }) }),
        !N && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:bg-muted/40 cms:p-3 cms:text-sm cms:text-muted-foreground", role: "note", children: l("Not in :language yet: the site shows the :main term meanwhile. Give it a title in :language and save to add it.", { language: x(d), main: x(p[0] ?? "en") }) }),
        /* @__PURE__ */ e.jsxs("fieldset", { disabled: !o, className: "cms:grid cms:min-w-0 cms:gap-4 cms:sm:grid-cols-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(i.Label, { htmlFor: "term-title", children: l("Title") }),
            /* @__PURE__ */ e.jsx(
              i.Input,
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
            /* @__PURE__ */ e.jsx(v, { message: n.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(i.Label, { htmlFor: "term-slug", children: l("Slug") }),
            /* @__PURE__ */ e.jsx(
              i.Input,
              {
                id: "term-slug",
                className: "cms:font-mono",
                value: a.data.slug,
                placeholder: l("Made from the title"),
                maxLength: 200,
                "aria-invalid": n.slug !== void 0,
                onChange: (s) => {
                  a.setData("slug", s.target.value), u("slug");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(G, { note: A(t?.hasPage ? t.slug : null, a.data.slug, !1), redirectsUrl: K }),
            /* @__PURE__ */ e.jsx(v, { message: n.slug })
          ] }),
          r.hierarchical && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:sm:col-span-2", children: [
            /* @__PURE__ */ e.jsx(i.Label, { htmlFor: "term-parent", children: l("Under") }),
            /* @__PURE__ */ e.jsxs(
              i.Select,
              {
                value: a.data.parent_id === null ? b : String(a.data.parent_id),
                onValueChange: (s) => {
                  a.setData("parent_id", s === b ? null : Number(s)), u("parent_id");
                },
                children: [
                  /* @__PURE__ */ e.jsx(i.SelectTrigger, { id: "term-parent", className: "cms:sm:w-1/2", "aria-invalid": n.parent_id !== void 0, children: /* @__PURE__ */ e.jsx(i.SelectValue, {}) }),
                  /* @__PURE__ */ e.jsxs(i.SelectContent, { children: [
                    /* @__PURE__ */ e.jsx(i.SelectItem, { value: b, children: l("Top level") }),
                    k.map((s) => /* @__PURE__ */ e.jsxs(i.SelectItem, { value: String(s.id), children: [
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
        /* @__PURE__ */ e.jsx(i.KeptEditsNotice, { kept: m.kept, disabled: !o, onLoad: (s) => {
          U(s);
        }, onDiscard: (s) => {
          m.discardKept(s);
        } }),
        /* @__PURE__ */ e.jsx(Q, { message: n.version, processing: a.processing, onSaveMine: V }),
        /* @__PURE__ */ e.jsx(
          q,
          {
            disabled: !o,
            fields: T,
            values: a.data.data,
            errors: n,
            storageKey: `cms:term:${r.handle}`,
            shared: E,
            sharedValues: F,
            sharedNote: l("Shared by all languages: the greyed-out fields are edited in :language.", { language: x(p[0] ?? "en") }),
            onChange: (s, c) => {
              a.setData("data", { ...a.data.data, [s]: c }), u(`data.${s}`);
            }
          }
        ),
        /* @__PURE__ */ e.jsx(i.CollapsibleCard, { title: l("SEO"), description: l("How this term's page appears in search results and shared links."), titleClassName: "cms:text-base", storageKey: "cms:term:seo", hasErrors: H(n, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !o, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(B, { bare: !0, id: "seo", fields: J(), value: a.data.seo, errors: P(n, "seo"), onChange: (s) => {
          a.setData("seo", s), u("seo");
        } }) }) })
      ] }),
      /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(
          i.CollapsibleCard,
          {
            title: l("Page settings"),
            titleClassName: "cms:text-base",
            storageKey: "cms:term:page-settings",
            hasErrors: n.template !== void 0,
            contentClassName: "cms:flex cms:flex-col cms:gap-2",
            children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !o, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: /* @__PURE__ */ e.jsx(
              R,
              {
                id: "template",
                value: a.data.template,
                onChange: (s) => a.setData("template", s),
                lookup: z(I, O),
                example: `cms.${r.handle}-special`,
                automatic: l("Automatic uses the taxonomy's template."),
                error: n.template,
                disabled: !o
              }
            ) })
          }
        ),
        t && /* @__PURE__ */ e.jsxs(i.CollapsibleCard, { title: l("Used by"), titleClassName: "cms:text-base", storageKey: "cms:term:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          C.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: l("No content links here through its fields.") }),
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
  oe as default
};
