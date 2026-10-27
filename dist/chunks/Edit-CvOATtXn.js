import { a as w, t as s, r as F, j as e } from "./admin-CtU9_6Av.js";
import { u as a } from "./ui-Dh5wfMwT.js";
import { F as N } from "./FieldError-Bao8rVy4.js";
function D(f, g) {
  const o = {};
  for (const [c, n] of Object.entries(f))
    c.startsWith(`${g}.`) && n !== void 0 && (o[c.slice(g.length + 1)] = n);
  return o;
}
const O = () => [
  { role: "title", label: s("Meta title"), automatic: s("Automatic (the title)") },
  { role: "description", label: s("Meta description"), automatic: s("Automatic (nothing)") },
  { role: "image", label: s("Share image"), automatic: s("Automatic (nothing)") }
], v = "__auto";
function U({ site: f, siteName: g, structured: o, collections: c, taxonomies: n, settingsNav: $ }) {
  a.useBreadcrumbs([{ label: s("Settings"), href: w("settings") }, { label: s("SEO") }]);
  const S = [...c ?? [], ...n ?? []], i = F.useForm({
    site: { ...f },
    structured: { ...o.values },
    mappings: S.map((t) => ({ kind: t.kind, id: t.id, title: t.chosen.title ?? "", description: t.chosen.description ?? "", image: t.chosen.image ?? "" }))
  }), x = i.errors, C = () => i.put(w("settings/seo"), { preserveScroll: !0, onSuccess: () => i.setDefaults() });
  a.useUnsavedChanges(i.isDirty, C);
  const h = (t, l) => i.setData("site", { ...i.data.site, [t]: l }), k = (t, l, j) => i.setData("mappings", i.data.mappings.map((p, b) => b === t ? { ...p, [l]: j } : p)), y = (t, l, j, p, b) => /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: l, description: j, titleClassName: "cms:text-base", storageKey: `cms:seo:${t}`, contentClassName: "cms:flex cms:flex-col cms:divide-y cms:divide-border/60", children: [
    p.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s("None yet.") }),
    p.map((r, E) => {
      const u = b + E;
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3 cms:py-4 cms:first:pt-0 cms:last:pb-0", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:justify-between cms:gap-3", children: [
          /* @__PURE__ */ e.jsx("h3", { className: "cms:font-medium", children: r.title }),
          /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: r.blueprint ? s("Blueprint: :name", { name: r.blueprint }) : s("No blueprint") })
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-3 cms:sm:grid-cols-3", children: O().map(({ role: m, label: L, automatic: A }) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-1.5", children: [
          /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `seo-${u}-${m}`, className: "cms:text-xs", children: L }),
          /* @__PURE__ */ e.jsxs(a.Select, { value: i.data.mappings[u]?.[m] || v, onValueChange: (d) => k(u, m, d === v ? "" : d), children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: `seo-${u}-${m}`, className: "cms:w-full", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(a.SelectItem, { value: v, children: A }),
              r.options[m].map((d) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: d.value, children: d.label }, d.value))
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(N, { message: x[`mappings.${u}.${m}`] })
        ] }, m)) })
      ] }, `${r.kind}-${r.id}`);
    })
  ] });
  return /* @__PURE__ */ e.jsx(a.SettingsLayout, { items: $, current: "seo", children: /* @__PURE__ */ e.jsxs("form", { onSubmit: (t) => {
    t.preventDefault(), C();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(F.Head, { title: s("SEO") }),
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: s("SEO"),
        description: s("What search engines and shared links see of the site, and the structured data that tells them what its pages are."),
        actions: /* @__PURE__ */ e.jsx(a.Button, { type: "submit", disabled: i.processing, children: s("Save") })
      }
    ),
    /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: s("Search engines and sharing"), titleClassName: "cms:text-base", storageKey: "cms:seo:site", contentClassName: "cms:flex cms:flex-col cms:gap-5", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Switch, { id: "seo-noindex", checked: i.data.site.noindex, onCheckedChange: (t) => h("noindex", t) }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-0.5", children: [
          /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "seo-noindex", children: s("Hide the whole site from search engines") }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: s("Every page asks not to be indexed and the sitemap is empty. For a site still being built, or staging.") })
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-start cms:justify-between cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-3", children: [
          /* @__PURE__ */ e.jsx(a.Switch, { id: "seo-append", checked: i.data.site.appendName, onCheckedChange: (t) => h("appendName", t) }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-0.5", children: [
            /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "seo-append", children: s("Add the site name to page titles") }),
            /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: s('The browser tab and search results show ":example". Share previews keep the bare title.', { example: `${s("About")} ${i.data.site.separator || "|"} ${g}` }) })
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
          /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "seo-separator", className: "cms:text-xs", children: s("Separator") }),
          /* @__PURE__ */ e.jsx(
            a.Input,
            {
              id: "seo-separator",
              className: "cms:w-20",
              maxLength: 5,
              disabled: !i.data.site.appendName,
              value: i.data.site.separator,
              onChange: (t) => h("separator", t.target.value)
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:max-w-xs cms:flex-col cms:gap-1.5", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "seo-twitter", children: s("X (Twitter) account") }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: "seo-twitter",
            placeholder: "@acme",
            maxLength: 16,
            value: i.data.site.twitter,
            onChange: (t) => h("twitter", t.target.value)
          }
        ),
        /* @__PURE__ */ e.jsx(N, { message: x["site.twitter"] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "seo-image", children: s("Default share image") }),
        /* @__PURE__ */ e.jsx(
          a.MediaPickerInput,
          {
            id: "seo-image",
            invalid: x["site.image"] !== void 0,
            disabled: !1,
            multiple: !1,
            max: null,
            types: ["image"],
            value: i.data.site.image,
            onChange: (t) => h("image", typeof t == "number" ? t : null)
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: s("Shown when a page is shared and has no image of its own.") }),
        /* @__PURE__ */ e.jsx(N, { message: x["site.image"] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(
      a.FormSections,
      {
        sections: o.sections,
        data: i.data.structured,
        errors: D(x, "structured"),
        storageKey: "cms:seo:structured",
        onChange: (t, l) => i.setData("structured", { ...i.data.structured, [t]: l })
      }
    ),
    S.length > 0 && /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx("h2", { className: "cms:text-base cms:font-medium", children: s("Fields used for SEO") }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s("When an entry or term leaves its meta title, description or share image empty, the site uses one of its fields instead. A page's own SEO fields always win; after the field come the site's (the description in Settings → Site, the share image above).") })
    ] }),
    c !== null && y("Collections", s("Collections"), s("Entries of each collection."), c, 0),
    n !== null && y("Taxonomies", s("Taxonomies"), s("Term pages of each taxonomy."), n, c?.length ?? 0),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: s("Meta title: a text field. Meta description: a text or textarea field, cut to 300 characters. Share image: the first image of a media field.") })
  ] }) });
}
export {
  U as default
};
