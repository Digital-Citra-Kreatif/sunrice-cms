import { a as i, t as e, j as s } from "./admin-BJZuWFbX.js";
import { P as u } from "./PageValuesForm-DtzMvWKN.js";
import { S as m } from "./settings-2-0VUe76YZ.js";
import { L as p } from "./layout-template-RwJXNfEY.js";
function b({ collection: t, settings: l = null, blueprint: a = null, ...n }) {
  const r = l ?? i(`cms/collections/${t.handle}/entries`), o = l ? [{ label: e("Collections"), href: i("cms/collections") }, { label: t.title, href: l }, { label: e("Listing page") }] : [{ label: t.title, href: r }, { label: e("Listing page") }];
  return /* @__PURE__ */ s.jsx(
    u,
    {
      ...n,
      title: e(":title: listing page", { title: t.title }),
      breadcrumbs: o,
      back: { href: r, label: e("Back to :title", { title: t.title }) },
      saveUrl: i(`cms/collections/${t.handle}/listing`),
      editUrl: i(`cms/collections/${t.handle}/listing/edit`),
      viewUrl: t.url,
      empty: e("The listing page has no fields of its own: choose a listing blueprint for the collection under Structure → Collections."),
      emptyAction: l ? { label: e("Choose a listing blueprint"), href: `${l}#field-listing_blueprint` } : null,
      seoDescription: e("How the listing page appears in search results and shared links."),
      storageKey: "cms:listing:seo",
      templateHelp: e("For :title's listing page, in every language; also under Structure → Collections. Automatic uses the first file that exists.", { title: t.title }),
      menu: [
        ...l ? [{ label: e("Collection settings"), href: l, icon: /* @__PURE__ */ s.jsx(m, {}) }] : [],
        ...a ? [{ label: e("Edit blueprint"), href: a, icon: /* @__PURE__ */ s.jsx(p, {}) }] : []
      ]
    }
  );
}
export {
  b as default
};
