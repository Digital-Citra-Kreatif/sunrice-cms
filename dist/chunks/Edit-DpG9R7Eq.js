import { a as i, t, j as n } from "./admin-DgMI81wH.js";
import { P as o } from "./PageValuesForm-BXuiBr5n.js";
function p({ collection: e, settings: l, ...a }) {
  const s = l ?? i(`cms/collections/${e.handle}/entries`), r = l ? [{ label: t("Collections"), href: i("cms/collections") }, { label: e.title, href: l }, { label: t("Listing page") }] : [{ label: e.title, href: s }, { label: t("Listing page") }];
  return /* @__PURE__ */ n.jsx(
    o,
    {
      ...a,
      title: t(":title: listing page", { title: e.title }),
      breadcrumbs: r,
      back: { href: s, label: t("Back to :title", { title: e.title }) },
      saveUrl: i(`cms/collections/${e.handle}/listing`),
      editUrl: i(`cms/collections/${e.handle}/listing/edit`),
      viewUrl: e.url,
      empty: t("The listing page has no fields of its own: choose a listing blueprint for the collection under Structure → Collections."),
      emptyAction: l ? { label: t("Choose a listing blueprint"), href: `${l}#field-listing_blueprint` } : null,
      seoDescription: t("How the listing page appears in search results and shared links."),
      storageKey: "cms:listing:seo",
      templateHelp: t("For :title's listing page, in every language; also under Structure → Collections. Automatic uses the first file that exists.", { title: e.title })
    }
  );
}
export {
  p as default
};
