import { j as e, r as h, a as S, t as i, l as f, h as B } from "./admin-CfeUugq5.js";
import { u as l } from "./ui-BzV6lfEf.js";
import { F as v } from "./FieldError-DpUNvmpt.js";
import { z as q, b as H, h as M, A as z } from "./FieldInput-B1VSzATK.js";
import { l as G, F as J } from "./languages-5U_Ekwyr.js";
import { S as R } from "./SlugNote-DWfo-4iA.js";
import { s as Q, T as W, w as X } from "./seo-Cxu7gyjP.js";
import { T as Y } from "./TermsPicker-Bgf9Y0lE.js";
import { V as Z } from "./VersionConflict-CDJrsYK8.js";
import { U as ee } from "./UnsavedNote-CuNiZYDR.js";
import { E as se } from "./external-link-Mqd1ZxLN.js";
import { L as ae } from "./loader-circle-CjVcQmAV.js";
import { L as te } from "./layout-template-Btp-VVsS.js";
const b = "__top";
function je(n) {
  return /* @__PURE__ */ e.jsx(le, { ...n }, `${n.term?.id ?? "new"}:${n.locale}:${n.version}:${JSON.stringify([n.values, n.seo, n.term?.template, n.parentId])}`);
}
function le({ taxonomy: n, term: t, parentId: k = null, terms: N = [], translated: C, fields: _, locale: d, locales: x, shared: L, sharedValues: E, values: D, seo: F, version: K, usedBy: w = [], redirectsUrl: V = null, blueprint: y = null, templates: I = null, templateChoices: O }) {
  const { cmsEditor: P } = h.usePage().props, u = S(`cms/taxonomies/${n.handle}/terms`), j = t ? S(`cms/terms/${t.id}/content`) : u, T = t ? t.title : i("New term");
  l.useBreadcrumbs([{ label: n.title, href: `${u}?locale=${d}` }, { label: T }]);
  const a = h.useForm({
    locale: d,
    title: t?.ownTitle ?? "",
    slug: t?.slug ?? "",
    parent_id: k,
    data: D,
    seo: F ?? {},
    template: t?.template ?? "",
    version: K
  }), c = a.errors, p = (s) => {
    const r = z(c, s);
    r.length > 0 && a.clearErrors(...r);
  }, $ = () => a.processing || (t ? a.put(j, { preserveScroll: !0 }) : a.post(j)), U = () => {
    a.transform((s) => ({ ...s, version: null })), a.put(j, { preserveScroll: !0 });
  }, m = l.useEditLock({
    type: "cms.term",
    id: t?.id,
    locale: d,
    enabled: t !== null && C,
    noun: i("term"),
    leaveTo: `${u}?locale=${d}`,
    getUnsaved: () => a.isDirty ? { data: a.data.data, seo: a.data.seo, template: a.data.template } : null
  }), o = !m.readOnly, A = async (s) => {
    const r = await m.loadKept(s);
    a.setData((g) => ({
      ...g,
      data: r.data && typeof r.data == "object" ? r.data : g.data,
      seo: r.seo && typeof r.seo == "object" ? r.seo : g.seo,
      template: typeof r.template == "string" ? r.template : g.template
    }));
  };
  return l.useUnsavedChanges(a.isDirty && !m.takenOver, o ? $ : void 0), /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (s) => {
    s.preventDefault(), $();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(h.Head, { title: t ? t.title : i("New term · :taxonomy", { taxonomy: n.title }) }),
    m.dialogs,
    /* @__PURE__ */ e.jsx(
      l.PageHeader,
      {
        title: T,
        back: { href: `${u}?locale=${d}`, label: i("Back to :title", { title: n.title }) },
        menu: y ? [{ label: i("Edit blueprint"), href: y, icon: /* @__PURE__ */ e.jsx(te, {}) }] : [],
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          t?.url && /* @__PURE__ */ e.jsx(l.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: t.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(se, {}),
            " ",
            i("View page")
          ] }) }),
          o && /* @__PURE__ */ e.jsxs(l.Button, { type: "submit", disabled: a.processing, children: [
            a.processing && /* @__PURE__ */ e.jsx(ae, { className: "cms:animate-spin" }),
            " ",
            t ? i("Save") : i("Create term")
          ] })
        ] }),
        children: /* @__PURE__ */ e.jsx(ee, { dirty: a.isDirty })
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:items-start cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_20rem]", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(
          l.LanguageTabs,
          {
            value: d,
            languages: G(x, t ? t.translatedIn ?? null : [d], f),
            onValueChange: (s) => h.router.get(t ? `${u}/${t.id}/edit` : `${u}/create`, { locale: s, ...t === null && a.data.parent_id !== null ? { parent: a.data.parent_id } : {} })
          }
        ),
        /* @__PURE__ */ e.jsx(l.ViewingNotice, { by: m.viewingBy, onTakeOver: m.requestTakeOver }),
        t === null && x.length > 1 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: i("In :language. Translate it here afterwards: switch the language and give it a title there.", { language: f(d) }) }),
        !C && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:bg-muted/40 cms:p-3 cms:text-sm cms:text-muted-foreground", role: "note", children: i("Not in :language yet: the site shows the :main term meanwhile. Give it a title in :language and save to add it.", { language: f(d), main: f(x[0] ?? "en") }) }),
        /* @__PURE__ */ e.jsxs("fieldset", { disabled: !o, className: "cms:grid cms:min-w-0 cms:gap-4 cms:sm:grid-cols-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(l.Label, { htmlFor: "term-title", children: i("Title") }),
            /* @__PURE__ */ e.jsx(
              l.Input,
              {
                id: "term-title",
                dir: "auto",
                value: a.data.title,
                required: !0,
                autoFocus: t === null,
                placeholder: t?.mainTitle ?? "",
                maxLength: 255,
                "aria-invalid": c.title !== void 0,
                onChange: (s) => {
                  a.setData("title", s.target.value), p("title");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(v, { message: c.title })
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
                "aria-invalid": c.slug !== void 0,
                onChange: (s) => {
                  a.setData("slug", s.target.value), p("slug");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(R, { note: B(t?.hasPage ? t.slug : null, a.data.slug, !1), redirectsUrl: V }),
            /* @__PURE__ */ e.jsx(v, { message: c.slug })
          ] }),
          n.hierarchical && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:sm:col-span-2", children: [
            /* @__PURE__ */ e.jsx(l.Label, { htmlFor: "term-parent", children: i("Under") }),
            N === null ? /* @__PURE__ */ e.jsx("div", { className: "cms:sm:w-1/2", children: /* @__PURE__ */ e.jsx(
              Y,
              {
                id: "term-parent",
                taxonomy: n.handle,
                multiple: !1,
                max: null,
                required: !1,
                invalid: c.parent_id !== void 0,
                placeholder: i("Top level"),
                except: t?.id ?? null,
                value: a.data.parent_id,
                onChange: (s) => {
                  a.setData("parent_id", typeof s == "number" ? s : null), p("parent_id");
                }
              }
            ) }) : /* @__PURE__ */ e.jsxs(
              l.Select,
              {
                value: a.data.parent_id === null ? b : String(a.data.parent_id),
                onValueChange: (s) => {
                  a.setData("parent_id", s === b ? null : Number(s)), p("parent_id");
                },
                children: [
                  /* @__PURE__ */ e.jsx(l.SelectTrigger, { id: "term-parent", className: "cms:sm:w-1/2", "aria-invalid": c.parent_id !== void 0, children: /* @__PURE__ */ e.jsx(l.SelectValue, {}) }),
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
            /* @__PURE__ */ e.jsx(v, { message: c.parent_id })
          ] })
        ] }),
        /* @__PURE__ */ e.jsx(l.KeptEditsNotice, { kept: m.kept, disabled: !o, onLoad: (s) => {
          A(s);
        }, onDiscard: (s) => {
          m.discardKept(s);
        } }),
        /* @__PURE__ */ e.jsx(Z, { message: c.version, processing: a.processing, onSaveMine: U }),
        /* @__PURE__ */ e.jsx(
          J,
          {
            disabled: !o,
            fields: _,
            values: a.data.data,
            errors: c,
            storageKey: `cms:term:${n.handle}`,
            shared: L,
            sharedValues: E,
            mainLanguage: x[0] ? f(x[0]) : null,
            onChange: (s, r) => {
              a.setData("data", { ...a.data.data, [s]: r }), p(`data.${s}`);
            }
          }
        ),
        /* @__PURE__ */ e.jsx(l.CollapsibleCard, { title: i("SEO"), description: i("How this term's page appears in search results and shared links."), titleClassName: "cms:text-base", storageKey: "cms:term:seo", hasErrors: M(c, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !o, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(q, { bare: !0, id: "seo", fields: Q(), value: a.data.seo, errors: H(c, "seo"), onChange: (s) => {
          a.setData("seo", s), p("seo");
        } }) }) })
      ] }),
      /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        P?.term?.map((s) => /* @__PURE__ */ e.jsx(
          l.CollapsibleCard,
          {
            title: s.title,
            description: s.description,
            titleClassName: "cms:text-base",
            contentClassName: "cms:grid cms:gap-3 cms:text-sm",
            children: s.items.map((r, g) => /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-0.5", children: [
              r.href ? /* @__PURE__ */ e.jsx(h.Link, { className: "cms:font-medium cms:underline cms:underline-offset-2", href: r.href, children: r.label }) : /* @__PURE__ */ e.jsx("span", { children: r.label }),
              r.detail && /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: r.detail })
            ] }, g))
          },
          s.title
        )),
        /* @__PURE__ */ e.jsx(
          l.CollapsibleCard,
          {
            title: i("Page settings"),
            titleClassName: "cms:text-base",
            storageKey: "cms:term:page-settings",
            hasErrors: c.template !== void 0,
            contentClassName: "cms:flex cms:flex-col cms:gap-2",
            children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !o, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: /* @__PURE__ */ e.jsx(
              W,
              {
                id: "template",
                value: a.data.template,
                onChange: (s) => a.setData("template", s),
                lookup: X(I, O),
                example: `cms.${n.handle}-special`,
                automatic: i("Automatic uses the taxonomy's template."),
                error: c.template,
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
  je as default
};
