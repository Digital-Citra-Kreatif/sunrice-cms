import { c as i } from "./createLucideIcon-Ccbp7F45.js";
import { j as e, s as c, m, t as s } from "./admin-CQrIqXPu.js";
import { u as a } from "./ui-Dh5wfMwT.js";
const r = {
  name: "x",
  size: 24,
  node: [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]
};
r.node;
const f = i(r);
function h({ status: n, changes: t = !1 }) {
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(a.Badge, { variant: n === "published" ? "success" : "secondary", children: c(n) }),
    m({ status: n, changes: t }) && /* @__PURE__ */ e.jsx(a.Badge, { variant: "warning", title: s("Saved changes visitors don't see yet"), children: s("Changes pending") })
  ] });
}
function g() {
  return /* @__PURE__ */ e.jsxs("span", { title: s("Different from the live version"), className: "cms:ml-2 cms:inline-flex cms:items-center cms:gap-1 cms:align-middle cms:text-xs cms:font-normal cms:text-amber-700 cms:dark:text-amber-400", children: [
    /* @__PURE__ */ e.jsx("span", { "aria-hidden": !0, className: "cms:size-1.5 cms:rounded-full cms:bg-amber-500" }),
    s("Changed"),
    /* @__PURE__ */ e.jsxs("span", { className: "cms:sr-only", children: [
      " (",
      s("Different from the live version"),
      ")"
    ] })
  ] });
}
export {
  g as C,
  h as E,
  f as X
};
