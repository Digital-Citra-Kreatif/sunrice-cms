import { t as e } from "./admin-CBkX-z7V.js";
function n() {
  return [
    { handle: "title", type: "text", label: e("Meta title"), instructions: e("Empty: the title."), config: { max: 255 } },
    { handle: "description", type: "textarea", label: e("Meta description"), instructions: e("A sentence or two for search results."), config: { max: 500 } },
    { handle: "canonical", type: "text", label: e("Canonical URL"), instructions: e("Only if this page copies another: that page's address. Empty: this page."), config: { max: 2e3 } },
    { handle: "image", type: "media", label: e("Open Graph image"), instructions: e("Shown when the page is shared."), config: { types: ["image"] } },
    { handle: "noindex", type: "toggle", label: e("Hide from search engines (noindex)") }
  ];
}
export {
  n as s
};
