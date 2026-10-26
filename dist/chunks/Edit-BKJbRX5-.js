import { a as s, t as e, j as i, r as f } from "./admin-CLF05qBH.js";
import { u as o } from "./ui-Dh5wfMwT.js";
import { P as g } from "./PageValuesForm-W0CmeVEH.js";
import { S as b } from "./settings-2-0VUe76YZ.js";
const r = "__shared";
function v({ taxonomy: l, collection: n, url: u, pages: d, settings: a, ...m }) {
  const h = a ?? s(`cms/taxonomies/${l.handle}/terms`), x = s(`cms/taxonomies/${l.handle}/index-page/edit`), c = n ? e("Index page: :collection", { collection: n.title }) : e("Index page"), p = a ? [{ label: e("Taxonomies"), href: s("cms/taxonomies") }, { label: l.title, href: a }, { label: c }] : [{ label: l.title, href: h }, { label: c }];
  return /* @__PURE__ */ i.jsx(
    g,
    {
      ...m,
      title: `${l.title}: ${c}`,
      breadcrumbs: p,
      back: { href: h, label: e("Back to :title", { title: l.title }) },
      saveUrl: s(`cms/taxonomies/${l.handle}/index-page`),
      editUrl: x,
      params: n ? { collection: n.handle } : {},
      viewUrl: u,
      empty: e("The index page has no fields of its own: choose its fields (Index page fields) in the taxonomy's settings under Structure → Taxonomies."),
      emptyAction: a ? { label: e("Choose index page fields"), href: `${a}#field-index_blueprint` } : null,
      seoDescription: e("How the index page appears in search results and shared links."),
      storageKey: "cms:taxonomy-index:seo",
      templateHelp: e("For all of :taxonomy's index pages, the shared one and each collection's, in every language; also under Structure → Taxonomies. Automatic uses the first file that exists.", { taxonomy: l.title }),
      menu: a ? [{ label: e("Taxonomy settings"), href: a, icon: /* @__PURE__ */ i.jsx(b, {}) }] : [],
      children: d.length > 1 && /* @__PURE__ */ i.jsxs(o.Select, { value: n?.handle ?? r, onValueChange: (t) => f.router.get(x, { ...t === r ? {} : { collection: t }, locale: m.locale }), children: [
        /* @__PURE__ */ i.jsx(o.SelectTrigger, { className: "cms:w-64", "aria-label": e("Page"), children: /* @__PURE__ */ i.jsx(o.SelectValue, {}) }),
        /* @__PURE__ */ i.jsx(o.SelectContent, { children: d.map((t) => /* @__PURE__ */ i.jsx(o.SelectItem, { value: t.collection ?? r, children: t.collection === null ? e("Shared index (all collections)") : e(":collection only", { collection: t.title }) }, t.collection ?? r)) })
      ] })
    }
  );
}
export {
  v as default
};
