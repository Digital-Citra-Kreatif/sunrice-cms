import { j as e, t as s } from "./admin-t_knV6mj.js";
function n({ note: r, redirectsUrl: d }) {
  return /* @__PURE__ */ e.jsx("div", { "aria-live": "polite", children: r !== null && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-xs cms:text-muted-foreground", children: [
    r === "redirects" ? s("Once published, the old address redirects to the new one.") : s("The old address will stop working (404) unless a redirect is added."),
    r === "breaks" && d && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      " ",
      /* @__PURE__ */ e.jsx("a", { href: d, target: "_blank", rel: "noopener", className: "cms:underline cms:underline-offset-2 cms:hover:text-foreground", children: s("Add a redirect") })
    ] })
  ] }) });
}
export {
  n as S
};
