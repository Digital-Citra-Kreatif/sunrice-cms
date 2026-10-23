import { a as s, j as l, t } from "./admin-DR9cu_PG.js";
import { P as r } from "./PageValuesForm-B64vmgUI.js";
function g({ collection: e, ...a }) {
  const i = s(`cms/collections/${e.handle}/entries`);
  return /* @__PURE__ */ l.jsx(
    r,
    {
      ...a,
      title: t(":title: listing page", { title: e.title }),
      breadcrumbs: [{ label: e.title, href: i }, { label: t("Listing page") }],
      back: { href: i, label: t("Back to :title", { title: e.title }) },
      saveUrl: s(`cms/collections/${e.handle}/listing`),
      editUrl: s(`cms/collections/${e.handle}/listing/edit`),
      viewUrl: e.url,
      empty: t("The listing page has no fields of its own: choose a listing blueprint for the collection under Structure → Collections."),
      seoDescription: t("How the listing page appears in search results and shared links."),
      storageKey: "cms:listing:seo"
    }
  );
}
export {
  g as default
};
