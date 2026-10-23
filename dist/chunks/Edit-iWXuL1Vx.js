import { a as S, t as r, l as k, r as p, j as e } from "./admin-DR9cu_PG.js";
import { _ as L } from "./createLucideIcon-Ccbp7F45.js";
import { u as t } from "./ui-Dh5wfMwT.js";
import { F as w } from "./FieldError-CS3zzvPG.js";
import { L as T } from "./loader-circle-ByksABXO.js";
import { E } from "./external-link-CFxEu4M4.js";
function F(l) {
  return { done: l.filter((c) => c.trim() !== "").length, total: l.length };
}
function V({ locale: l, main: c, locales: i, sections: o }) {
  const h = S("cms/translations");
  t.useBreadcrumbs([{ label: r("Translations") }]);
  const m = i.find((s) => s.code === l)?.name ?? k(l), n = p.useForm({
    locale: l,
    texts: Object.fromEntries(o.flatMap((s) => s.texts.map((a) => [a.key, a.value])))
  }), [d, C] = L.useState(!1), f = n.errors, j = () => n.put(h, { preserveScroll: !0, onSuccess: () => n.setDefaults() });
  t.useUnsavedChanges(n.isDirty, j);
  const y = (s, a) => n.setData("texts", { ...n.data.texts, [s]: a }), v = F(o.flatMap((s) => s.texts.map((a) => n.data.texts[a.key] ?? ""))), N = o.map((s) => ({ ...s, texts: d ? s.texts.filter((a) => a.value.trim() === "") : s.texts })).filter((s) => s.texts.length > 0);
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (s) => {
    s.preventDefault(), j();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(p.Head, { title: r("Translations") }),
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: r("Translations"),
        description: r("Translate the site's own texts that aren't entries: they show on listing pages, forms and menus. Left empty, the :main text shows.", { main: k(c) })
      }
    ),
    /* @__PURE__ */ e.jsx(t.Card, { className: "cms:sticky cms:top-16 cms:z-10 cms:py-3 cms:shadow-sm", children: /* @__PURE__ */ e.jsxs(t.CardContent, { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-x-4 cms:gap-y-2", children: [
      i.length > 1 ? /* @__PURE__ */ e.jsxs(t.Select, { value: l, onValueChange: (s) => p.router.get(h, { locale: s }), children: [
        /* @__PURE__ */ e.jsx(t.SelectTrigger, { "aria-label": r("Language"), className: "cms:w-48", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(t.SelectContent, { children: i.map((s) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: s.code, children: s.name }, s.code)) })
      ] }) : /* @__PURE__ */ e.jsx("span", { className: "cms:font-medium", children: m }),
      /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", "aria-live": "polite", children: r(":done of :total translated into :language", { done: v.done, total: v.total, language: m }) }),
      /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:items-center cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Switch, { id: "untranslated-only", checked: d, onCheckedChange: (s) => C(s) }),
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "untranslated-only", className: "cms:font-normal", children: r("Only untranslated") })
      ] }),
      /* @__PURE__ */ e.jsxs("span", { className: "cms:ml-auto cms:flex cms:items-center cms:gap-3", children: [
        n.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: r("Unsaved changes") }),
        /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", disabled: n.processing, children: [
          n.processing && /* @__PURE__ */ e.jsx(T, { className: "cms:animate-spin" }),
          " ",
          r("Save")
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ e.jsx(w, { message: f.locale }),
    N.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:py-8 cms:text-center cms:text-sm cms:text-muted-foreground", children: d ? r("Everything is translated into :language.", { language: m }) : r("Nothing to translate yet.") }),
    N.map((s) => /* @__PURE__ */ e.jsx(
      t.CollapsibleCard,
      {
        title: s.hint ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          s.title,
          " ",
          /* @__PURE__ */ e.jsxs("span", { className: "cms:font-normal cms:text-muted-foreground", children: [
            "· ",
            s.hint
          ] })
        ] }) : s.title,
        titleClassName: "cms:text-base",
        storageKey: `cms:translations:${s.key}`,
        contentClassName: "cms:flex cms:flex-col cms:divide-y cms:divide-border/60",
        children: s.texts.map((a) => {
          const x = `text-${a.key.replace(/[^A-Za-z0-9_-]/g, "-")}`, u = f[`texts.${a.key}`], b = n.data.texts[a.key] ?? "";
          return /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-2 cms:py-3 cms:first:pt-0 cms:last:pb-0 cms:md:grid-cols-2 cms:md:gap-4", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-0.5", children: [
              /* @__PURE__ */ e.jsx(t.Label, { htmlFor: x, lang: c, className: "cms:break-words cms:whitespace-pre-line", children: a.source }),
              (a.label || a.url) && /* @__PURE__ */ e.jsxs("p", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-x-2 cms:text-xs cms:text-muted-foreground", children: [
                a.label && /* @__PURE__ */ e.jsx("span", { children: a.label }),
                a.url && /* @__PURE__ */ e.jsxs("a", { href: a.url, target: "_blank", rel: "noopener noreferrer", className: "cms:inline-flex cms:items-center cms:gap-1 cms:underline-offset-4 cms:hover:text-foreground cms:hover:underline", children: [
                  r("View"),
                  /* @__PURE__ */ e.jsx(E, { className: "cms:size-3", "aria-hidden": !0 })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-1", children: [
              a.multiline ? /* @__PURE__ */ e.jsx(
                t.Textarea,
                {
                  id: x,
                  rows: 2,
                  lang: l,
                  value: b,
                  "aria-invalid": u !== void 0,
                  "aria-description": r("In :language", { language: m }),
                  onChange: (g) => y(a.key, g.target.value)
                }
              ) : /* @__PURE__ */ e.jsx(
                t.Input,
                {
                  id: x,
                  lang: l,
                  value: b,
                  "aria-invalid": u !== void 0,
                  "aria-description": r("In :language", { language: m }),
                  onChange: (g) => y(a.key, g.target.value)
                }
              ),
              /* @__PURE__ */ e.jsx(w, { message: u })
            ] })
          ] }, a.key);
        })
      },
      s.key
    ))
  ] });
}
export {
  V as default
};
