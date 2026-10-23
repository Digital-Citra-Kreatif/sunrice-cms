import { a as o, t as e, j as t, r as g } from "./admin-BXp1g0Oh.js";
import { u as n } from "./ui-Dh5wfMwT.js";
import { P as p } from "./PageValuesForm-CisdPX1X.js";
import { S as f } from "./settings-2-0VUe76YZ.js";
const i = "__shared";
function T({ taxonomy: a, collection: s, url: u, pages: r, settings: c, ...d }) {
  const m = o(`cms/taxonomies/${a.handle}/terms`), h = o(`cms/taxonomies/${a.handle}/index-page/edit`), x = s ? e("Index page: :collection", { collection: s.title }) : e("Index page");
  return /* @__PURE__ */ t.jsx(
    p,
    {
      ...d,
      title: `${a.title}: ${x}`,
      breadcrumbs: [{ label: a.title, href: m }, { label: x }],
      back: { href: m, label: e("Back to :title", { title: a.title }) },
      saveUrl: o(`cms/taxonomies/${a.handle}/index-page`),
      editUrl: h,
      params: s ? { collection: s.handle } : {},
      viewUrl: u,
      empty: e("The index page has no fields of its own: choose its fields (Index page fields) in the taxonomy's settings under Structure → Taxonomies."),
      seoDescription: e("How the index page appears in search results and shared links."),
      storageKey: "cms:taxonomy-index:seo",
      menu: c ? [{ label: e("Taxonomy settings"), href: c, icon: /* @__PURE__ */ t.jsx(f, {}) }] : [],
      children: r.length > 1 && /* @__PURE__ */ t.jsxs(n.Select, { value: s?.handle ?? i, onValueChange: (l) => g.router.get(h, { ...l === i ? {} : { collection: l }, locale: d.locale }), children: [
        /* @__PURE__ */ t.jsx(n.SelectTrigger, { className: "cms:w-64", "aria-label": e("Page"), children: /* @__PURE__ */ t.jsx(n.SelectValue, {}) }),
        /* @__PURE__ */ t.jsx(n.SelectContent, { children: r.map((l) => /* @__PURE__ */ t.jsx(n.SelectItem, { value: l.collection ?? i, children: l.collection === null ? e("Shared index (all collections)") : e(":collection only", { collection: l.title }) }, l.collection ?? i)) })
      ] })
    }
  );
}
export {
  T as default
};
