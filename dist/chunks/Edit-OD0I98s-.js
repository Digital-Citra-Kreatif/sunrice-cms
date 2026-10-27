import { a as r, t as e, j as n, r as f } from "./admin-4vjDOX5A.js";
import { u as i } from "./ui-Dh5wfMwT.js";
import { P as b } from "./PageValuesForm-DTgde64P.js";
import { S as g } from "./settings-2-0VUe76YZ.js";
const s = "__shared";
function v({ taxonomy: l, collection: o, url: x, pages: d, settings: a, ...m }) {
  const h = a ?? r(`cms/taxonomies/${l.handle}/terms`), u = r(`cms/taxonomies/${l.handle}/index-page/edit`), c = o ? e("Index page: :collection", { collection: o.title }) : e("Index page"), p = a ? [{ label: e("Taxonomies"), href: r("cms/taxonomies") }, { label: l.title, href: a }, { label: c }] : [{ label: l.title, href: h }, { label: c }];
  return /* @__PURE__ */ n.jsx(
    b,
    {
      ...m,
      title: `${l.title}: ${c}`,
      breadcrumbs: p,
      back: { href: h, label: e("Back to :title", { title: l.title }) },
      saveUrl: r(`cms/taxonomies/${l.handle}/index-page`),
      editUrl: u,
      params: o ? { collection: o.handle } : {},
      viewUrl: x,
      empty: e("The index page has no fields of its own: choose an index page blueprint for the taxonomy under Structure → Taxonomies."),
      emptyAction: a ? { label: e("Choose an index page blueprint"), href: `${a}#field-index_blueprint` } : null,
      seoDescription: e("How the index page appears in search results and shared links."),
      storageKey: "cms:taxonomy-index:seo",
      templateHelp: e("For all of :taxonomy's index pages, the shared one and each collection's, in every language; also under Structure → Taxonomies. Automatic uses the first file that exists.", { taxonomy: l.title }),
      menu: a ? [{ label: e("Taxonomy settings"), href: a, icon: /* @__PURE__ */ n.jsx(g, {}) }] : [],
      children: d.length > 1 && /* @__PURE__ */ n.jsxs(i.Select, { value: o?.handle ?? s, onValueChange: (t) => f.router.get(u, { ...t === s ? {} : { collection: t }, locale: m.locale }), children: [
        /* @__PURE__ */ n.jsx(i.SelectTrigger, { className: "cms:w-64", "aria-label": e("Page"), children: /* @__PURE__ */ n.jsx(i.SelectValue, {}) }),
        /* @__PURE__ */ n.jsx(i.SelectContent, { children: d.map((t) => /* @__PURE__ */ n.jsx(i.SelectItem, { value: t.collection ?? s, children: t.collection === null ? e("Shared index (all collections)") : e(":collection only", { collection: t.title }) }, t.collection ?? s)) })
      ] })
    }
  );
}
export {
  v as default
};
