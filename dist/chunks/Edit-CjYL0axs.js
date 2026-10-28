import { j as e, a as S, t as i, r as j, l as x, h as A } from "./admin-BJZuWFbX.js";
import { u as l } from "./ui-Dh5wfMwT.js";
import { F as v } from "./FieldError-CrnP2AMi.js";
import { z as B, b as q, h as H, A as M } from "./FieldInput-Brfyzq5K.js";
import { l as z, F as G } from "./languages-DNfJSvPI.js";
import { S as J } from "./SlugNote-CwzzRF4s.js";
import { s as R, T as Q, w as W } from "./seo-CQmYxlxs.js";
import { T as X } from "./TermsPicker-BllVnJA-.js";
import { V as Y } from "./VersionConflict-CyqkOmVX.js";
import { U as Z } from "./UnsavedNote-Cg5PBZU1.js";
import { E as ee } from "./external-link-CFxEu4M4.js";
import { L as se } from "./loader-circle-ByksABXO.js";
import { L as ae } from "./layout-template-RwJXNfEY.js";
const b = "__top";
function fe(r) {
  return /* @__PURE__ */ e.jsx(te, { ...r }, `${r.term?.id ?? "new"}:${r.locale}:${r.version}:${JSON.stringify([r.values, r.seo, r.term?.template, r.parentId])}`);
}
function te({ taxonomy: r, term: t, parentId: k = null, terms: N = [], translated: C, fields: _, locale: d, locales: p, shared: L, sharedValues: E, values: D, seo: F, version: K, usedBy: w = [], redirectsUrl: V = null, blueprint: y = null, templates: I = null, templateChoices: O }) {
  const u = S(`cms/taxonomies/${r.handle}/terms`), f = t ? S(`cms/terms/${t.id}/content`) : u, T = t ? t.title : i("New term");
  l.useBreadcrumbs([{ label: r.title, href: `${u}?locale=${d}` }, { label: T }]);
  const a = j.useForm({
    locale: d,
    title: t?.ownTitle ?? "",
    slug: t?.slug ?? "",
    parent_id: k,
    data: D,
    seo: F ?? {},
    template: t?.template ?? "",
    version: K
  }), n = a.errors, g = (s) => {
    const c = M(n, s);
    c.length > 0 && a.clearErrors(...c);
  }, $ = () => a.processing || (t ? a.put(f, { preserveScroll: !0 }) : a.post(f)), U = () => {
    a.transform((s) => ({ ...s, version: null })), a.put(f, { preserveScroll: !0 });
  }, m = l.useEditLock({
    type: "cms.term",
    id: t?.id,
    locale: d,
    enabled: t !== null && C,
    noun: i("term"),
    leaveTo: `${u}?locale=${d}`,
    getUnsaved: () => a.isDirty ? { data: a.data.data, seo: a.data.seo, template: a.data.template } : null
  }), o = !m.readOnly, P = async (s) => {
    const c = await m.loadKept(s);
    a.setData((h) => ({
      ...h,
      data: c.data && typeof c.data == "object" ? c.data : h.data,
      seo: c.seo && typeof c.seo == "object" ? c.seo : h.seo,
      template: typeof c.template == "string" ? c.template : h.template
    }));
  };
  return l.useUnsavedChanges(a.isDirty && !m.takenOver, o ? $ : void 0), /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (s) => {
    s.preventDefault(), $();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(j.Head, { title: t ? t.title : i("New term · :taxonomy", { taxonomy: r.title }) }),
    m.dialogs,
    /* @__PURE__ */ e.jsx(
      l.PageHeader,
      {
        title: T,
        back: { href: `${u}?locale=${d}`, label: i("Back to :title", { title: r.title }) },
        menu: y ? [{ label: i("Edit blueprint"), href: y, icon: /* @__PURE__ */ e.jsx(ae, {}) }] : [],
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          t?.url && /* @__PURE__ */ e.jsx(l.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: t.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(ee, {}),
            " ",
            i("View page")
          ] }) }),
          o && /* @__PURE__ */ e.jsxs(l.Button, { type: "submit", disabled: a.processing, children: [
            a.processing && /* @__PURE__ */ e.jsx(se, { className: "cms:animate-spin" }),
            " ",
            t ? i("Save") : i("Create term")
          ] })
        ] }),
        children: /* @__PURE__ */ e.jsx(Z, { dirty: a.isDirty })
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:items-start cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_20rem]", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(
          l.LanguageTabs,
          {
            value: d,
            languages: z(p, t ? t.translatedIn ?? null : [d], x),
            onValueChange: (s) => j.router.get(t ? `${u}/${t.id}/edit` : `${u}/create`, { locale: s, ...t === null && a.data.parent_id !== null ? { parent: a.data.parent_id } : {} })
          }
        ),
        /* @__PURE__ */ e.jsx(l.ViewingNotice, { by: m.viewingBy, onTakeOver: m.requestTakeOver }),
        t === null && p.length > 1 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: i("In :language. Translate it here afterwards: switch the language and give it a title there.", { language: x(d) }) }),
        !C && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:bg-muted/40 cms:p-3 cms:text-sm cms:text-muted-foreground", role: "note", children: i("Not in :language yet: the site shows the :main term meanwhile. Give it a title in :language and save to add it.", { language: x(d), main: x(p[0] ?? "en") }) }),
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
                  a.setData("title", s.target.value), g("title");
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
                  a.setData("slug", s.target.value), g("slug");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(J, { note: A(t?.hasPage ? t.slug : null, a.data.slug, !1), redirectsUrl: V }),
            /* @__PURE__ */ e.jsx(v, { message: n.slug })
          ] }),
          r.hierarchical && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:sm:col-span-2", children: [
            /* @__PURE__ */ e.jsx(l.Label, { htmlFor: "term-parent", children: i("Under") }),
            N === null ? /* @__PURE__ */ e.jsx("div", { className: "cms:sm:w-1/2", children: /* @__PURE__ */ e.jsx(
              X,
              {
                id: "term-parent",
                taxonomy: r.handle,
                multiple: !1,
                max: null,
                required: !1,
                invalid: n.parent_id !== void 0,
                placeholder: i("Top level"),
                except: t?.id ?? null,
                value: a.data.parent_id,
                onChange: (s) => {
                  a.setData("parent_id", typeof s == "number" ? s : null), g("parent_id");
                }
              }
            ) }) : /* @__PURE__ */ e.jsxs(
              l.Select,
              {
                value: a.data.parent_id === null ? b : String(a.data.parent_id),
                onValueChange: (s) => {
                  a.setData("parent_id", s === b ? null : Number(s)), g("parent_id");
                },
                children: [
                  /* @__PURE__ */ e.jsx(l.SelectTrigger, { id: "term-parent", className: "cms:sm:w-1/2", "aria-invalid": n.parent_id !== void 0, children: /* @__PURE__ */ e.jsx(l.SelectValue, {}) }),
                  /* @__PURE__ */ e.jsxs(l.SelectContent, { children: [
                    /* @__PURE__ */ e.jsx(l.SelectItem, { value: b, children: i("Top level") }),
                    N.map((s) => /* @__PURE__ */ e.jsxs(l.SelectItem, { value: String(s.id), children: [
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
        /* @__PURE__ */ e.jsx(l.KeptEditsNotice, { kept: m.kept, disabled: !o, onLoad: (s) => {
          P(s);
        }, onDiscard: (s) => {
          m.discardKept(s);
        } }),
        /* @__PURE__ */ e.jsx(Y, { message: n.version, processing: a.processing, onSaveMine: U }),
        /* @__PURE__ */ e.jsx(
          G,
          {
            disabled: !o,
            fields: _,
            values: a.data.data,
            errors: n,
            storageKey: `cms:term:${r.handle}`,
            shared: L,
            sharedValues: E,
            mainLanguage: p[0] ? x(p[0]) : null,
            onChange: (s, c) => {
              a.setData("data", { ...a.data.data, [s]: c }), g(`data.${s}`);
            }
          }
        ),
        /* @__PURE__ */ e.jsx(l.CollapsibleCard, { title: i("SEO"), description: i("How this term's page appears in search results and shared links."), titleClassName: "cms:text-base", storageKey: "cms:term:seo", hasErrors: H(n, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !o, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(B, { bare: !0, id: "seo", fields: R(), value: a.data.seo, errors: q(n, "seo"), onChange: (s) => {
          a.setData("seo", s), g("seo");
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
              Q,
              {
                id: "template",
                value: a.data.template,
                onChange: (s) => a.setData("template", s),
                lookup: W(I, O),
                example: `cms.${r.handle}-special`,
                automatic: i("Automatic uses the taxonomy's template."),
                error: n.template,
                disabled: !o
              }
            ) })
          }
        ),
        t && /* @__PURE__ */ e.jsxs(l.CollapsibleCard, { title: i("Used by"), titleClassName: "cms:text-base", storageKey: "cms:term:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          w.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: i("No content links here through its fields.") }),
          w.map((s) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:gap-2", children: [
            s.url ? /* @__PURE__ */ e.jsx("a", { href: s.url, className: "cms:truncate cms:underline-offset-4 cms:hover:underline", children: s.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:truncate", children: s.label }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", title: s.field, children: s.fieldLabel ?? s.field })
          ] }, `${s.label}:${s.field}`))
        ] })
      ] })
    ] })
  ] });
}
export {
  fe as default
};
