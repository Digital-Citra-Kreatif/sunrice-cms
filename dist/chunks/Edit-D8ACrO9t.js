import { a as k, t as s, r as F, j as e } from "./admin-YMEUt_TB.js";
import { u as a } from "./ui-BzV6lfEf.js";
import { F as v } from "./FieldError-LuOioba_.js";
import { T as $ } from "./triangle-alert-CDOdGjCe.js";
function I(f, u) {
  const g = {};
  for (const [d, c] of Object.entries(f))
    d.startsWith(`${u}.`) && c !== void 0 && (g[d.slice(u.length + 1)] = c);
  return g;
}
const O = () => [
  { role: "title", label: s("Meta title"), automatic: s("Automatic (the title)") },
  { role: "description", label: s("Meta description"), automatic: s("Automatic (nothing)") },
  { role: "image", label: s("Share image"), automatic: s("Automatic (nothing)") }
], S = "__auto";
function K({ site: f, siteName: u, envNoindex: g = !1, structured: d, collections: c, taxonomies: j, settingsNav: E }) {
  a.useBreadcrumbs([{ label: s("Settings"), href: k("settings") }, { label: s("SEO") }]);
  const C = [...c ?? [], ...j ?? []], i = F.useForm({
    site: { ...f },
    structured: { ...d.values },
    mappings: C.map((t) => ({ kind: t.kind, id: t.id, title: t.chosen.title ?? "", description: t.chosen.description ?? "", image: t.chosen.image ?? "" }))
  }), o = i.errors, w = () => i.put(k("settings/seo"), { preserveScroll: !0, onSuccess: () => i.setDefaults() });
  a.useUnsavedChanges(i.isDirty, w);
  const x = (t, m) => i.setData("site", { ...i.data.site, [t]: m }), L = (t, m, b) => i.setData("mappings", i.data.mappings.map((h, N) => N === t ? { ...h, [m]: b } : h)), y = (t, m, b, h, N) => /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: m, description: b, titleClassName: "cms:text-base", storageKey: `cms:seo:${t}`, contentClassName: "cms:flex cms:flex-col cms:divide-y cms:divide-border/60", children: [
    h.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s("None yet.") }),
    h.map((r, T) => {
      const p = N + T;
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3 cms:py-4 cms:first:pt-0 cms:last:pb-0", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:justify-between cms:gap-3", children: [
          /* @__PURE__ */ e.jsx("h3", { className: "cms:font-medium", children: r.title }),
          /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: r.blueprint ? s("Blueprint: :name", { name: r.blueprint }) : s("No blueprint") })
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-3 cms:sm:grid-cols-3", children: O().map(({ role: l, label: A, automatic: D }) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-1.5", children: [
          /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `seo-${p}-${l}`, className: "cms:text-xs", children: A }),
          /* @__PURE__ */ e.jsxs(a.Select, { value: i.data.mappings[p]?.[l] || S, onValueChange: (n) => L(p, l, n === S ? "" : n), children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: `seo-${p}-${l}`, className: "cms:w-full", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(a.SelectItem, { value: S, children: D }),
              r.options[l].map((n) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: n.value, children: n.label }, n.value))
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(v, { message: o[`mappings.${p}.${l}`] })
        ] }, l)) })
      ] }, `${r.kind}-${r.id}`);
    })
  ] });
  return /* @__PURE__ */ e.jsx(a.SettingsLayout, { items: E, current: "seo", children: /* @__PURE__ */ e.jsxs("form", { onSubmit: (t) => {
    t.preventDefault(), w();
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
        /* @__PURE__ */ e.jsx(a.Switch, { id: "seo-noindex", checked: i.data.site.noindex, onCheckedChange: (t) => x("noindex", t) }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-0.5", children: [
          /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "seo-noindex", children: s("Hide the whole site from search engines") }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: s("Every page asks not to be indexed and the sitemap is empty. For a site still being built, or staging.") }),
          i.data.site.noindex && /* @__PURE__ */ e.jsxs("p", { role: "status", className: "cms:mt-1 cms:flex cms:items-start cms:gap-1.5 cms:text-xs cms:text-amber-800 cms:dark:text-amber-300", children: [
            /* @__PURE__ */ e.jsx($, { "aria-hidden": "true", className: "cms:mt-px cms:size-3.5 cms:shrink-0" }),
            s("Search engines are asked not to index this site, so it won't appear in Google and other search results. If the site is live, turn this off.")
          ] }),
          g && /* @__PURE__ */ e.jsxs("p", { role: "status", className: "cms:mt-1 cms:flex cms:items-start cms:gap-1.5 cms:text-xs cms:text-amber-800 cms:dark:text-amber-300", children: [
            /* @__PURE__ */ e.jsx($, { "aria-hidden": "true", className: "cms:mt-px cms:size-3.5 cms:shrink-0" }),
            s("SUNRICE_NOINDEX is on in the .env file, so the site is hidden from search engines whatever this says.")
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-start cms:justify-between cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-3", children: [
          /* @__PURE__ */ e.jsx(a.Switch, { id: "seo-append", checked: i.data.site.appendName, onCheckedChange: (t) => x("appendName", t) }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-0.5", children: [
            /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "seo-append", children: s("Add the site name to page titles") }),
            /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: s('The browser tab and search results show ":example". Share previews keep the bare title.', { example: `${s("About")} ${i.data.site.separator || "|"} ${u}` }) })
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
              onChange: (t) => x("separator", t.target.value)
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
            onChange: (t) => x("twitter", t.target.value)
          }
        ),
        /* @__PURE__ */ e.jsx(v, { message: o["site.twitter"] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "seo-image", children: s("Default share image") }),
        /* @__PURE__ */ e.jsx(
          a.MediaPickerInput,
          {
            id: "seo-image",
            invalid: o["site.image"] !== void 0,
            disabled: !1,
            multiple: !1,
            max: null,
            types: ["image"],
            value: i.data.site.image,
            onChange: (t) => x("image", typeof t == "number" ? t : null)
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: s("Shown when a page is shared and has no image of its own.") }),
        /* @__PURE__ */ e.jsx(v, { message: o["site.image"] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(
      a.FormSections,
      {
        sections: d.sections,
        data: i.data.structured,
        errors: I(o, "structured"),
        storageKey: "cms:seo:structured",
        onChange: (t, m) => i.setData("structured", { ...i.data.structured, [t]: m })
      }
    ),
    C.length > 0 && /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx("h2", { className: "cms:text-base cms:font-medium", children: s("Fields used for SEO") }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s("When an entry or term leaves its meta title, description or share image empty, the site uses one of its fields instead. A page's own SEO fields always win; after the field come the site's (the description in Settings → Site, the share image above).") })
    ] }),
    c !== null && y("Collections", s("Collections"), s("Entries of each collection."), c, 0),
    j !== null && y("Taxonomies", s("Taxonomies"), s("Term pages of each taxonomy."), j, c?.length ?? 0),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: s("Meta title: a text field. Meta description: a text or textarea field, cut to 300 characters. Share image: the first image of a media field.") })
  ] }) });
}
export {
  K as default
};
