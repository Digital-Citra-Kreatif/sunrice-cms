import { j as e, t as s, r as a } from "./admin-KmgSTUuL.js";
import { u as t } from "./ui-Dh5wfMwT.js";
import { u as m } from "./Confirm-BBOmz6aj.js";
function f({ message: r, processing: i, onSaveMine: n }) {
  const [c, o] = m();
  return r ? /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: [
    o,
    /* @__PURE__ */ e.jsx("span", { children: r }),
    /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "outline", size: "sm", onClick: () => a.router.reload(), children: s("Load theirs") }),
      /* @__PURE__ */ e.jsx(
        t.Button,
        {
          type: "button",
          variant: "destructive",
          size: "sm",
          disabled: i,
          onClick: () => c(s("Save your version over theirs? Their changes are replaced."), n),
          children: s("Save mine anyway")
        }
      )
    ] })
  ] }) : null;
}
export {
  f as V
};
