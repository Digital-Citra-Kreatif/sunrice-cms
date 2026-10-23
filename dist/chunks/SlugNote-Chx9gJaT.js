import { j as s, t, r as G } from "./admin-DOeXGS4s.js";
import { _ } from "./createLucideIcon-Ccbp7F45.js";
import { u as n } from "./ui-Dh5wfMwT.js";
import { F as L } from "./FieldError-D-WN54vL.js";
import { H as U } from "./FieldInput-Bq_thxuf.js";
import { C as g } from "./check-OeKFYRnl.js";
function R(e, c) {
  return e === null || c === void 0 ? e : { ...e, choices: c };
}
const F = (e) => e.includes("::") ? e : `${e.replace(/\./g, "/")}.blade.php`;
function P(e, c) {
  const i = e.trim();
  return i !== "" && !A(e, c) ? i : c?.fallbacks.find((a) => a.exists && a.view !== i)?.view ?? null;
}
function A(e, c) {
  const i = e.trim();
  return i === "" ? !1 : c?.own?.view === i ? !c.own.exists : c?.choices !== void 0 && !c.choices.includes(i);
}
function k({ view: e }) {
  const c = F(e);
  return /* @__PURE__ */ s.jsx("code", { title: c, className: "cms:block cms:min-w-0 cms:truncate cms:font-mono cms:text-xs", children: c });
}
function V({ value: e = "", lookup: c = null }) {
  const i = e.trim(), a = P(e, c), d = /* @__PURE__ */ s.jsx("span", { className: "cms:shrink-0 cms:rounded cms:bg-emerald-500/15 cms:px-1.5 cms:text-[0.65rem] cms:font-medium cms:text-emerald-800 cms:dark:text-emerald-300", children: t("in use") }), x = [...i !== "" ? [i] : [], ...(c?.fallbacks ?? []).map((r) => r.view).filter((r) => r !== i)];
  return /* @__PURE__ */ s.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:text-xs", children: [
    /* @__PURE__ */ s.jsx("p", { className: "cms:text-muted-foreground", children: t("Tried in this order; the first file that exists is used.") }),
    /* @__PURE__ */ s.jsxs("ol", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      x.map((r, h) => /* @__PURE__ */ s.jsxs("li", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-2 cms:text-muted-foreground", children: [
        /* @__PURE__ */ s.jsxs("span", { className: "cms:w-4 cms:shrink-0 cms:text-right cms:tabular-nums", children: [
          h + 1,
          "."
        ] }),
        /* @__PURE__ */ s.jsx(k, { view: r }),
        a === r && d
      ] }, r)),
      /* @__PURE__ */ s.jsxs("li", { className: "cms:flex cms:items-center cms:gap-2 cms:text-muted-foreground", children: [
        /* @__PURE__ */ s.jsxs("span", { className: "cms:w-4 cms:shrink-0 cms:text-right cms:tabular-nums", children: [
          x.length + 1,
          "."
        ] }),
        /* @__PURE__ */ s.jsx("span", { className: "cms:min-w-0 cms:truncate", children: t("the built-in template") }),
        a === null && d
      ] })
    ] })
  ] });
}
function q({ id: e, value: c, onChange: i, lookup: a = null, example: d, automatic: x, error: r, disabled: h = !1 }) {
  const [w, N] = _.useState(!1), [v, u] = _.useState(""), I = () => {
    a?.choices === void 0 && G.router.reload({ only: ["templateChoices"] });
  }, p = a?.choices ?? [], C = a?.example ?? d, f = p.filter((m) => m.startsWith("cms.")), b = p.filter((m) => !m.startsWith("cms.")), y = (m) => /* @__PURE__ */ s.jsxs(n.CommandItem, { value: m, onSelect: () => j(m), children: [
    /* @__PURE__ */ s.jsx(g, { className: l === m ? "" : "cms:opacity-0" }),
    " ",
    /* @__PURE__ */ s.jsx("span", { className: "cms:truncate cms:font-mono cms:text-xs", children: m })
  ] }, m), l = c.trim(), T = P(c, a), O = A(c, a), o = v.trim().toLowerCase(), j = (m) => {
    i(m), N(!1), u("");
  };
  return /* @__PURE__ */ s.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ s.jsx(n.Label, { htmlFor: e, children: t("Template") }),
    /* @__PURE__ */ s.jsxs(n.Popover, { open: w, onOpenChange: (m) => {
      N(m), m || u(""), m && I();
    }, children: [
      /* @__PURE__ */ s.jsx(n.PopoverTrigger, { asChild: !0, children: /* @__PURE__ */ s.jsxs(
        n.Button,
        {
          id: e,
          type: "button",
          variant: "outline",
          role: "combobox",
          "aria-expanded": w,
          "aria-invalid": r !== void 0,
          disabled: h,
          className: "cms:w-full cms:min-w-0 cms:justify-between cms:font-normal",
          children: [
            /* @__PURE__ */ s.jsx("span", { className: `cms:min-w-0 cms:truncate ${l === "" ? "cms:text-muted-foreground" : "cms:font-mono cms:text-xs"}`, title: l || void 0, children: l === "" ? t("Automatic") : l }),
            /* @__PURE__ */ s.jsx(U, { className: "cms:opacity-50" })
          ]
        }
      ) }),
      /* @__PURE__ */ s.jsx(n.PopoverContent, { align: "start", className: "cms:w-(--radix-popover-trigger-width) cms:min-w-64 cms:p-0", children: /* @__PURE__ */ s.jsxs(n.Command, { children: [
        /* @__PURE__ */ s.jsx(n.CommandInput, { placeholder: t("Automatic, or type a view name"), value: v, onValueChange: u }),
        /* @__PURE__ */ s.jsxs(n.CommandList, { children: [
          /* @__PURE__ */ s.jsx(n.CommandEmpty, { children: t("No such view.") }),
          o !== "" && !p.includes(o) && /* @__PURE__ */ s.jsx(n.CommandGroup, { children: /* @__PURE__ */ s.jsxs(n.CommandItem, { value: `__typed ${o}`, keywords: [o], onSelect: () => j(o), children: [
            /* @__PURE__ */ s.jsx(g, { className: "cms:opacity-0" }),
            " ",
            /* @__PURE__ */ s.jsx("span", { className: "cms:truncate", children: t("Use “:view”", { view: o }) })
          ] }) }),
          /* @__PURE__ */ s.jsx(n.CommandGroup, { children: /* @__PURE__ */ s.jsxs(n.CommandItem, { value: "__automatic", keywords: [t("Automatic")], onSelect: () => j(""), children: [
            /* @__PURE__ */ s.jsx(g, { className: l === "" ? "" : "cms:opacity-0" }),
            " ",
            t("Automatic")
          ] }) }),
          f.length > 0 && /* @__PURE__ */ s.jsx(n.CommandGroup, { heading: t("In cms/"), children: f.map(y) }),
          b.length > 0 && /* @__PURE__ */ s.jsx(n.CommandGroup, { heading: f.length > 0 ? t("Other views") : t("Views"), children: b.map(y) })
        ] })
      ] }) })
    ] }),
    O && /* @__PURE__ */ s.jsx("p", { className: "cms:text-xs cms:text-amber-700 cms:dark:text-amber-400", children: t("No such file yet: the page uses the next one until it exists.") }),
    /* @__PURE__ */ s.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-0.5 cms:text-xs cms:leading-relaxed cms:text-muted-foreground", children: [
      /* @__PURE__ */ s.jsx("p", { children: t("A view name from resources/views: :example is :file.", { example: "\0", file: "" }).split(/(\u0000|\u0001)/).map((m, S) => m === "\0" ? /* @__PURE__ */ s.jsx("code", { className: "cms:wrap-anywhere", children: C }, S) : m === "" ? /* @__PURE__ */ s.jsx("code", { className: "cms:wrap-anywhere", children: F(C) }, S) : m) }),
      /* @__PURE__ */ s.jsx("p", { children: x })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-wrap cms:items-center cms:gap-x-3 cms:gap-y-1 cms:text-xs cms:text-muted-foreground", children: [
      /* @__PURE__ */ s.jsxs("span", { className: "cms:flex cms:min-w-0 cms:max-w-full cms:items-baseline cms:gap-1", children: [
        /* @__PURE__ */ s.jsx("span", { className: "cms:shrink-0", children: t("Uses") }),
        T === null ? /* @__PURE__ */ s.jsx("span", { children: t("the built-in template") }) : /* @__PURE__ */ s.jsx(k, { view: T })
      ] }),
      /* @__PURE__ */ s.jsxs(n.Popover, { children: [
        /* @__PURE__ */ s.jsx(n.PopoverTrigger, { asChild: !0, children: /* @__PURE__ */ s.jsx("button", { type: "button", className: "cms:ml-auto cms:shrink-0 cms:rounded-sm cms:underline cms:underline-offset-4 cms:hover:text-foreground cms:focus-visible:outline-2 cms:focus-visible:outline-ring", children: t("How is it chosen?") }) }),
        /* @__PURE__ */ s.jsx(n.PopoverContent, { align: "end", className: "cms:w-max cms:min-w-72 cms:max-w-[min(32rem,calc(100vw-2rem))]", children: /* @__PURE__ */ s.jsx(V, { value: c, lookup: a }) })
      ] })
    ] }),
    /* @__PURE__ */ s.jsx(L, { message: r })
  ] });
}
function z({ note: e, redirectsUrl: c }) {
  return /* @__PURE__ */ s.jsx("div", { "aria-live": "polite", children: e !== null && /* @__PURE__ */ s.jsxs("p", { className: "cms:text-xs cms:text-muted-foreground", children: [
    e === "redirects" ? t("Once published, the old address redirects to the new one.") : t("The old address will stop working (404) unless a redirect is added."),
    e === "breaks" && c && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      " ",
      /* @__PURE__ */ s.jsx("a", { href: c, target: "_blank", rel: "noopener", className: "cms:underline cms:underline-offset-2 cms:hover:text-foreground", children: t("Add a redirect") })
    ] })
  ] }) });
}
export {
  z as S,
  q as T,
  R as w
};
