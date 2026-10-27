import { a as L, t as r, l as k, r as p, j as s } from "./admin-B85tCaRI.js";
import { _ as S } from "./createLucideIcon-Ccbp7F45.js";
import { u as t } from "./ui-Dh5wfMwT.js";
import { F as w } from "./FieldError-ol5snTmU.js";
import { U as T } from "./UnsavedNote-B_mDcgQd.js";
import { L as E } from "./loader-circle-ByksABXO.js";
import { E as F } from "./external-link-CFxEu4M4.js";
function D(l) {
  return { done: l.filter((c) => c.trim() !== "").length, total: l.length };
}
function H({ locale: l, main: c, locales: i, sections: o }) {
  const f = L("cms/translations");
  t.useBreadcrumbs([{ label: r("Translations") }]);
  const m = i.find((e) => e.code === l)?.name ?? k(l), n = p.useForm({
    locale: l,
    texts: Object.fromEntries(o.flatMap((e) => e.texts.map((a) => [a.key, a.value])))
  }), [d, C] = S.useState(!1), h = n.errors, j = () => n.put(f, { preserveScroll: !0, onSuccess: () => n.setDefaults() });
  t.useUnsavedChanges(n.isDirty, j);
  const y = (e, a) => n.setData("texts", { ...n.data.texts, [e]: a }), v = D(o.flatMap((e) => e.texts.map((a) => n.data.texts[a.key] ?? ""))), N = o.map((e) => ({ ...e, texts: d ? e.texts.filter((a) => a.value.trim() === "") : e.texts })).filter((e) => e.texts.length > 0);
  return /* @__PURE__ */ s.jsxs("form", { onSubmit: (e) => {
    e.preventDefault(), j();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ s.jsx(p.Head, { title: r("Translations") }),
    /* @__PURE__ */ s.jsx(
      t.PageHeader,
      {
        title: r("Translations"),
        description: r("Translate the site's own texts that aren't entries: they show on listing pages, forms and menus. Left empty, the :main text shows.", { main: k(c) })
      }
    ),
    /* @__PURE__ */ s.jsx(t.Card, { className: "cms:sticky cms:top-16 cms:z-10 cms:py-3 cms:shadow-sm", children: /* @__PURE__ */ s.jsxs(t.CardContent, { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-x-4 cms:gap-y-2", children: [
      i.length > 1 ? /* @__PURE__ */ s.jsx(t.LanguageTabs, { value: l, languages: i, onValueChange: (e) => p.router.get(f, { locale: e }) }) : /* @__PURE__ */ s.jsx("span", { className: "cms:font-medium", children: m }),
      /* @__PURE__ */ s.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", "aria-live": "polite", children: r(":done of :total translated into :language", { done: v.done, total: v.total, language: m }) }),
      /* @__PURE__ */ s.jsxs("span", { className: "cms:flex cms:items-center cms:gap-2", children: [
        /* @__PURE__ */ s.jsx(t.Switch, { id: "untranslated-only", checked: d, onCheckedChange: (e) => C(e) }),
        /* @__PURE__ */ s.jsx(t.Label, { htmlFor: "untranslated-only", className: "cms:font-normal", children: r("Only untranslated") })
      ] }),
      /* @__PURE__ */ s.jsxs("span", { className: "cms:ml-auto cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ s.jsx(T, { dirty: n.isDirty }),
        /* @__PURE__ */ s.jsxs(t.Button, { type: "submit", disabled: n.processing, children: [
          n.processing && /* @__PURE__ */ s.jsx(E, { className: "cms:animate-spin" }),
          " ",
          r("Save")
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ s.jsx(w, { message: h.locale }),
    N.length === 0 && /* @__PURE__ */ s.jsx("p", { className: "cms:py-8 cms:text-center cms:text-sm cms:text-muted-foreground", children: d ? r("Everything is translated into :language.", { language: m }) : r("Nothing to translate yet.") }),
    N.map((e) => /* @__PURE__ */ s.jsx(
      t.CollapsibleCard,
      {
        title: e.hint ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
          e.title,
          " ",
          /* @__PURE__ */ s.jsxs("span", { className: "cms:font-normal cms:text-muted-foreground", children: [
            "· ",
            e.hint
          ] })
        ] }) : e.title,
        titleClassName: "cms:text-base",
        storageKey: `cms:translations:${e.key}`,
        contentClassName: "cms:flex cms:flex-col cms:divide-y cms:divide-border/60",
        children: e.texts.map((a) => {
          const x = `text-${a.key.replace(/[^A-Za-z0-9_-]/g, "-")}`, g = h[`texts.${a.key}`], b = n.data.texts[a.key] ?? "";
          return /* @__PURE__ */ s.jsxs("div", { className: "cms:grid cms:gap-2 cms:py-3 cms:first:pt-0 cms:last:pb-0 cms:md:grid-cols-2 cms:md:gap-4", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-0.5", children: [
              /* @__PURE__ */ s.jsx(t.Label, { htmlFor: x, lang: c, className: "cms:break-words cms:whitespace-pre-line", children: a.source }),
              (a.label || a.url) && /* @__PURE__ */ s.jsxs("p", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-x-2 cms:text-xs cms:text-muted-foreground", children: [
                a.label && /* @__PURE__ */ s.jsx("span", { children: a.label }),
                a.url && /* @__PURE__ */ s.jsxs("a", { href: a.url, target: "_blank", rel: "noopener noreferrer", className: "cms:inline-flex cms:items-center cms:gap-1 cms:underline-offset-4 cms:hover:text-foreground cms:hover:underline", children: [
                  r("View"),
                  /* @__PURE__ */ s.jsx(F, { className: "cms:size-3", "aria-hidden": !0 })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-1", children: [
              a.multiline ? /* @__PURE__ */ s.jsx(
                t.Textarea,
                {
                  id: x,
                  rows: 2,
                  lang: l,
                  value: b,
                  "aria-invalid": g !== void 0,
                  "aria-description": r("In :language", { language: m }),
                  onChange: (u) => y(a.key, u.target.value)
                }
              ) : /* @__PURE__ */ s.jsx(
                t.Input,
                {
                  id: x,
                  lang: l,
                  value: b,
                  "aria-invalid": g !== void 0,
                  "aria-description": r("In :language", { language: m }),
                  onChange: (u) => y(a.key, u.target.value)
                }
              ),
              /* @__PURE__ */ s.jsx(w, { message: g })
            ] })
          ] }, a.key);
        })
      },
      e.key
    ))
  ] });
}
export {
  H as default
};
