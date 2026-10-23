import { j as e, t as l } from "./admin-D8w3Ih7q.js";
import { _ as h } from "./createLucideIcon-Ccbp7F45.js";
const a = (s) => s.includes("::") ? s : `${s.replace(/\./g, "/")}.blade.php`;
function f(s, c) {
  const i = s.trim();
  return i !== "" ? c?.own?.view === i && !c.own.exists ? null : i : c?.fallbacks.find((n) => n.exists)?.view ?? null;
}
function d({ file: s }) {
  const c = s.split("/");
  return /* @__PURE__ */ e.jsx("code", { className: "cms:whitespace-normal cms:break-normal", children: c.map((i, n) => /* @__PURE__ */ e.jsxs(h.Fragment, { children: [
    i,
    n < c.length - 1 && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      "/",
      /* @__PURE__ */ e.jsx("wbr", {})
    ] })
  ] }, n)) });
}
function g({ example: s, empty: c, value: i = "", lookup: n = null }) {
  const r = i.trim(), o = f(i, n), u = n?.fallbacks ?? [], m = /* @__PURE__ */ e.jsx("span", { className: "cms:ml-1 cms:rounded cms:bg-muted cms:px-1 cms:text-[0.65rem] cms:font-medium cms:text-foreground", children: l("in use") });
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1 cms:text-xs cms:leading-relaxed cms:text-muted-foreground", children: [
    /* @__PURE__ */ e.jsx("p", { children: c }),
    /* @__PURE__ */ e.jsxs("details", { className: "cms:group", children: [
      /* @__PURE__ */ e.jsx("summary", { className: "cms:w-fit cms:cursor-pointer cms:select-none cms:rounded-sm cms:underline-offset-4 hover:cms:underline focus-visible:cms:outline-2 focus-visible:cms:outline-ring", children: l("Which file?") }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:mt-1.5 cms:flex cms:flex-col cms:gap-1.5", children: [
        r !== "" && /* @__PURE__ */ e.jsxs("p", { children: [
          /* @__PURE__ */ e.jsx(d, { file: a(r) }),
          n?.own?.view === r ? n.own.exists ? m : /* @__PURE__ */ e.jsx("span", { className: "cms:ml-1 cms:text-destructive", children: l("not found") }) : null
        ] }),
        /* @__PURE__ */ e.jsx("p", { children: r !== "" ? l("Without it, the first that exists:") : l("The first that exists:") }),
        /* @__PURE__ */ e.jsxs("ol", { className: "cms:ml-4 cms:list-decimal cms:space-y-0.5", children: [
          u.map((t) => /* @__PURE__ */ e.jsxs("li", { children: [
            /* @__PURE__ */ e.jsx(d, { file: a(t.view) }),
            o === t.view && r === "" && m
          ] }, t.view)),
          /* @__PURE__ */ e.jsxs("li", { children: [
            l("the built-in template"),
            o === null && m
          ] })
        ] }),
        /* @__PURE__ */ e.jsx("p", { children: l("Files are under resources/views; a name like :example is :file.", { example: "\0", file: "" }).split(/(\u0000|\u0001)/).map((t, x) => t === "\0" ? /* @__PURE__ */ e.jsx("code", { children: s }, x) : t === "" ? /* @__PURE__ */ e.jsx(d, { file: a(s) }, x) : t) })
      ] })
    ] })
  ] });
}
function w({ note: s, redirectsUrl: c }) {
  return /* @__PURE__ */ e.jsx("div", { "aria-live": "polite", children: s !== null && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-xs cms:text-muted-foreground", children: [
    s === "redirects" ? l("Once published, the old address redirects to the new one.") : l("The old address will stop working (404) unless a redirect is added."),
    s === "breaks" && c && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      " ",
      /* @__PURE__ */ e.jsx("a", { href: c, target: "_blank", rel: "noopener", className: "cms:underline cms:underline-offset-2 cms:hover:text-foreground", children: l("Add a redirect") })
    ] })
  ] }) });
}
export {
  w as S,
  g as T
};
