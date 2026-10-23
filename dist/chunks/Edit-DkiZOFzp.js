import { a as S, t as s, r as C, j as e } from "./admin-KmgSTUuL.js";
import { u as a } from "./ui-Dh5wfMwT.js";
import { F as f } from "./FieldError-D0UVAhdA.js";
const A = () => [
  { role: "title", label: s("Meta title"), automatic: s("Automatic (the title)") },
  { role: "description", label: s("Meta description"), automatic: s("Automatic (nothing)") },
  { role: "image", label: s("Share image"), automatic: s("Automatic (nothing)") }
], j = "__auto";
function I({ site: y, siteName: w, collections: x, taxonomies: p, settingsNav: F }) {
  a.useBreadcrumbs([{ label: s("Settings"), href: S("settings") }, { label: s("SEO") }]);
  const b = [...x ?? [], ...p ?? []], i = C.useForm({
    site: { ...y },
    mappings: b.map((t) => ({ kind: t.kind, id: t.id, title: t.chosen.title ?? "", description: t.chosen.description ?? "", image: t.chosen.image ?? "" }))
  }), h = i.errors, N = () => i.put(S("cms/seo"), { preserveScroll: !0, onSuccess: () => i.setDefaults() });
  a.useUnsavedChanges(i.isDirty, N);
  const n = (t, r) => i.setData("site", { ...i.data.site, [t]: r }), $ = (t, r, g) => i.setData("mappings", i.data.mappings.map((d, u) => u === t ? { ...d, [r]: g } : d)), v = (t, r, g, d, u) => /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: r, description: g, titleClassName: "cms:text-base", storageKey: `cms:seo:${t}`, contentClassName: "cms:flex cms:flex-col cms:divide-y cms:divide-border/60", children: [
    d.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s("None yet.") }),
    d.map((l, k) => {
      const o = u + k;
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3 cms:py-4 cms:first:pt-0 cms:last:pb-0", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:justify-between cms:gap-3", children: [
          /* @__PURE__ */ e.jsx("h3", { className: "cms:font-medium", children: l.title }),
          /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: l.blueprint ? s("Blueprint: :name", { name: l.blueprint }) : s("No blueprint") })
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-3 cms:sm:grid-cols-3", children: A().map(({ role: c, label: E, automatic: L }) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-1.5", children: [
          /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `seo-${o}-${c}`, className: "cms:text-xs", children: E }),
          /* @__PURE__ */ e.jsxs(a.Select, { value: i.data.mappings[o]?.[c] || j, onValueChange: (m) => $(o, c, m === j ? "" : m), children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: `seo-${o}-${c}`, className: "cms:w-full", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(a.SelectItem, { value: j, children: L }),
              l.options[c].map((m) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: m.value, children: m.label }, m.value))
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(f, { message: h[`mappings.${o}.${c}`] })
        ] }, c)) })
      ] }, `${l.kind}-${l.id}`);
    })
  ] });
  return /* @__PURE__ */ e.jsx(a.SettingsLayout, { items: F, current: "cms-seo", children: /* @__PURE__ */ e.jsxs("form", { onSubmit: (t) => {
    t.preventDefault(), N();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: s("SEO") }),
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: s("SEO"),
        description: s("What search engines and shared links see of the site."),
        actions: /* @__PURE__ */ e.jsx(a.Button, { type: "submit", disabled: i.processing, children: s("Save") })
      }
    ),
    /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: s("Search engines and sharing"), titleClassName: "cms:text-base", storageKey: "cms:seo:site", contentClassName: "cms:flex cms:flex-col cms:gap-5", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Switch, { id: "seo-noindex", checked: i.data.site.noindex, onCheckedChange: (t) => n("noindex", t) }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-0.5", children: [
          /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "seo-noindex", children: s("Hide the whole site from search engines") }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: s("Every page asks not to be indexed and the sitemap is empty. For a site still being built, or staging.") })
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-start cms:justify-between cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-3", children: [
          /* @__PURE__ */ e.jsx(a.Switch, { id: "seo-append", checked: i.data.site.appendName, onCheckedChange: (t) => n("appendName", t) }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-0.5", children: [
            /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "seo-append", children: s("Add the site name to page titles") }),
            /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: s('The browser tab and search results show ":example". Share previews keep the bare title.', { example: `${s("About")} ${i.data.site.separator || "|"} ${w}` }) })
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
              onChange: (t) => n("separator", t.target.value)
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
            onChange: (t) => n("twitter", t.target.value)
          }
        ),
        /* @__PURE__ */ e.jsx(f, { message: h["site.twitter"] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "seo-image", children: s("Default share image") }),
        /* @__PURE__ */ e.jsx(
          a.MediaPickerInput,
          {
            id: "seo-image",
            invalid: h["site.image"] !== void 0,
            disabled: !1,
            multiple: !1,
            max: null,
            types: ["image"],
            value: i.data.site.image,
            onChange: (t) => n("image", typeof t == "number" ? t : null)
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: s("Shown when a page is shared and has no image of its own.") }),
        /* @__PURE__ */ e.jsx(f, { message: h["site.image"] })
      ] })
    ] }),
    b.length > 0 && /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx("h2", { className: "cms:text-base cms:font-medium", children: s("Fields used for SEO") }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s("When an entry or term leaves its meta title, description or share image empty, the site uses one of its fields instead. A page's own SEO fields always win; after the field come the site's (the description in Settings → Site, the share image above).") })
    ] }),
    x !== null && v("Collections", s("Collections"), s("Entries of each collection."), x, 0),
    p !== null && v("Taxonomies", s("Taxonomies"), s("Term pages of each taxonomy."), p, x?.length ?? 0),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: s("Meta title: a text field. Meta description: a text or textarea field, cut to 300 characters. Share image: the first image of a media field.") })
  ] }) });
}
export {
  I as default
};
