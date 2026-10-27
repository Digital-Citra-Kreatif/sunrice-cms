import { a as r, t as e, j as a, r as b } from "./admin-jLkZXlkF.js";
import { u as i } from "./ui-Dh5wfMwT.js";
import { P as g } from "./PageValuesForm-C0KsQufA.js";
import { S } from "./settings-2-0VUe76YZ.js";
import { L as j } from "./layout-template-RwJXNfEY.js";
const s = "__shared";
function w({ taxonomy: l, collection: o, url: p, pages: d, settings: t = null, blueprint: m = null, ...u }) {
  const h = t ?? r(`cms/taxonomies/${l.handle}/terms`), x = r(`cms/taxonomies/${l.handle}/index-page/edit`), c = o ? e("Index page: :collection", { collection: o.title }) : e("Index page"), f = t ? [{ label: e("Taxonomies"), href: r("cms/taxonomies") }, { label: l.title, href: t }, { label: c }] : [{ label: l.title, href: h }, { label: c }];
  return /* @__PURE__ */ a.jsx(
    g,
    {
      ...u,
      title: `${l.title}: ${c}`,
      breadcrumbs: f,
      back: { href: h, label: e("Back to :title", { title: l.title }) },
      saveUrl: r(`cms/taxonomies/${l.handle}/index-page`),
      editUrl: x,
      params: o ? { collection: o.handle } : {},
      viewUrl: p,
      empty: e("The index page has no fields of its own: choose an index page blueprint for the taxonomy under Structure → Taxonomies."),
      emptyAction: t ? { label: e("Choose an index page blueprint"), href: `${t}#field-index_blueprint` } : null,
      seoDescription: e("How the index page appears in search results and shared links."),
      storageKey: "cms:taxonomy-index:seo",
      templateHelp: e("For all of :taxonomy's index pages, the shared one and each collection's, in every language; also under Structure → Taxonomies. Automatic uses the first file that exists.", { taxonomy: l.title }),
      menu: [
        ...t ? [{ label: e("Taxonomy settings"), href: t, icon: /* @__PURE__ */ a.jsx(S, {}) }] : [],
        ...m ? [{ label: e("Edit blueprint"), href: m, icon: /* @__PURE__ */ a.jsx(j, {}) }] : []
      ],
      children: d.length > 1 && /* @__PURE__ */ a.jsxs(i.Select, { value: o?.handle ?? s, onValueChange: (n) => b.router.get(x, { ...n === s ? {} : { collection: n }, locale: u.locale }), children: [
        /* @__PURE__ */ a.jsx(i.SelectTrigger, { className: "cms:w-64", "aria-label": e("Page"), children: /* @__PURE__ */ a.jsx(i.SelectValue, {}) }),
        /* @__PURE__ */ a.jsx(i.SelectContent, { children: d.map((n) => /* @__PURE__ */ a.jsx(i.SelectItem, { value: n.collection ?? s, children: n.collection === null ? e("Shared index (all collections)") : e(":collection only", { collection: n.title }) }, n.collection ?? s)) })
      ] })
    }
  );
}
export {
  w as default
};
