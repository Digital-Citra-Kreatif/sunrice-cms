import { j as s, t as e, r as U } from "./admin-tiVz_6M3.js";
import { _ as P } from "./createLucideIcon-Ccbp7F45.js";
import { u as m } from "./ui-Dh5wfMwT.js";
import { F as E } from "./FieldError-CCTmblX3.js";
import { b as L } from "./TermsPicker-oIGl2OBC.js";
import { C as j } from "./check-OeKFYRnl.js";
function B(c, t) {
  return c === null || t === void 0 ? c : { ...c, choices: t };
}
const S = (c) => c.includes("::") ? c : `${c.replace(/\./g, "/")}.blade.php`;
function _(c, t) {
  const i = c.trim();
  return i !== "" && !A(c, t) ? i : t?.fallbacks.find((a) => a.exists && a.view !== i)?.view ?? null;
}
function A(c, t) {
  const i = c.trim();
  return i === "" ? !1 : t?.own?.view === i ? !t.own.exists : t?.choices !== void 0 && !t.choices.includes(i);
}
function O({ view: c }) {
  const t = S(c);
  return /* @__PURE__ */ s.jsx("code", { title: t, className: "cms:block cms:min-w-0 cms:truncate cms:font-mono cms:text-xs", children: t });
}
function V({ value: c = "", lookup: t = null }) {
  const i = c.trim(), a = _(c, t), d = /* @__PURE__ */ s.jsx("span", { className: "cms:shrink-0 cms:rounded cms:bg-emerald-500/15 cms:px-1.5 cms:text-[0.65rem] cms:font-medium cms:text-emerald-800 cms:dark:text-emerald-300", children: e("in use") }), x = [...i !== "" ? [i] : [], ...(t?.fallbacks ?? []).map((r) => r.view).filter((r) => r !== i)];
  return /* @__PURE__ */ s.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:text-xs", children: [
    /* @__PURE__ */ s.jsx("p", { className: "cms:text-muted-foreground", children: e("Tried in this order; the first file that exists is used.") }),
    /* @__PURE__ */ s.jsxs("ol", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      x.map((r, h) => /* @__PURE__ */ s.jsxs("li", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-2 cms:text-muted-foreground", children: [
        /* @__PURE__ */ s.jsxs("span", { className: "cms:w-4 cms:shrink-0 cms:text-right cms:tabular-nums", children: [
          h + 1,
          "."
        ] }),
        /* @__PURE__ */ s.jsx(O, { view: r }),
        a === r && d
      ] }, r)),
      /* @__PURE__ */ s.jsxs("li", { className: "cms:flex cms:items-center cms:gap-2 cms:text-muted-foreground", children: [
        /* @__PURE__ */ s.jsxs("span", { className: "cms:w-4 cms:shrink-0 cms:text-right cms:tabular-nums", children: [
          x.length + 1,
          "."
        ] }),
        /* @__PURE__ */ s.jsx("span", { className: "cms:min-w-0 cms:truncate", children: e("the built-in template") }),
        a === null && d
      ] })
    ] })
  ] });
}
function D({ id: c, value: t, onChange: i, lookup: a = null, example: d, automatic: x, error: r, disabled: h = !1 }) {
  const [w, N] = P.useState(!1), [y, p] = P.useState(""), G = () => {
    a?.choices === void 0 && U.router.reload({ only: ["templateChoices"] });
  }, u = a?.choices ?? [], b = a?.example ?? d, f = u.filter((n) => n.startsWith("cms.")), v = u.filter((n) => !n.startsWith("cms.")), C = (n) => /* @__PURE__ */ s.jsxs(m.CommandItem, { value: n, onSelect: () => g(n), children: [
    /* @__PURE__ */ s.jsx(j, { className: l === n ? "" : "cms:opacity-0" }),
    " ",
    /* @__PURE__ */ s.jsx("span", { className: "cms:truncate cms:font-mono cms:text-xs", children: n })
  ] }, n), l = t.trim(), T = _(t, a), I = A(t, a), o = y.trim().toLowerCase(), g = (n) => {
    i(n), N(!1), p("");
  };
  return /* @__PURE__ */ s.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ s.jsx(m.Label, { htmlFor: c, children: e("Template") }),
    /* @__PURE__ */ s.jsxs(m.Popover, { open: w, onOpenChange: (n) => {
      N(n), n || p(""), n && G();
    }, children: [
      /* @__PURE__ */ s.jsx(m.PopoverTrigger, { asChild: !0, children: /* @__PURE__ */ s.jsxs(
        m.Button,
        {
          id: c,
          type: "button",
          variant: "outline",
          role: "combobox",
          "aria-expanded": w,
          "aria-invalid": r !== void 0,
          disabled: h,
          className: "cms:w-full cms:min-w-0 cms:justify-between cms:font-normal",
          children: [
            /* @__PURE__ */ s.jsx("span", { className: `cms:min-w-0 cms:truncate ${l === "" ? "cms:text-muted-foreground" : "cms:font-mono cms:text-xs"}`, title: l || void 0, children: l === "" ? e("Automatic") : l }),
            /* @__PURE__ */ s.jsx(L, { className: "cms:opacity-50" })
          ]
        }
      ) }),
      /* @__PURE__ */ s.jsx(m.PopoverContent, { align: "start", className: "cms:w-(--radix-popover-trigger-width) cms:min-w-64 cms:p-0", children: /* @__PURE__ */ s.jsxs(m.Command, { children: [
        /* @__PURE__ */ s.jsx(m.CommandInput, { placeholder: e("Automatic, or type a view name"), value: y, onValueChange: p }),
        /* @__PURE__ */ s.jsxs(m.CommandList, { children: [
          /* @__PURE__ */ s.jsx(m.CommandEmpty, { children: e("No such view.") }),
          o !== "" && !u.includes(o) && /* @__PURE__ */ s.jsx(m.CommandGroup, { children: /* @__PURE__ */ s.jsxs(m.CommandItem, { value: `__typed ${o}`, keywords: [o], onSelect: () => g(o), children: [
            /* @__PURE__ */ s.jsx(j, { className: "cms:opacity-0" }),
            " ",
            /* @__PURE__ */ s.jsx("span", { className: "cms:truncate", children: e("Use “:view”", { view: o }) })
          ] }) }),
          /* @__PURE__ */ s.jsx(m.CommandGroup, { children: /* @__PURE__ */ s.jsxs(m.CommandItem, { value: "__automatic", keywords: [e("Automatic")], onSelect: () => g(""), children: [
            /* @__PURE__ */ s.jsx(j, { className: l === "" ? "" : "cms:opacity-0" }),
            " ",
            e("Automatic")
          ] }) }),
          f.length > 0 && /* @__PURE__ */ s.jsx(m.CommandGroup, { heading: e("In cms/"), children: f.map(C) }),
          v.length > 0 && /* @__PURE__ */ s.jsx(m.CommandGroup, { heading: f.length > 0 ? e("Other views") : e("Views"), children: v.map(C) })
        ] })
      ] }) })
    ] }),
    I && /* @__PURE__ */ s.jsx("p", { className: "cms:text-xs cms:text-amber-700 cms:dark:text-amber-400", children: e("No such file yet: the page uses the next one until it exists.") }),
    /* @__PURE__ */ s.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-0.5 cms:text-xs cms:leading-relaxed cms:text-muted-foreground", children: [
      /* @__PURE__ */ s.jsx("p", { children: e("A view name from resources/views: :example is :file.", { example: "\0", file: "" }).split(/(\u0000|\u0001)/).map((n, F) => n === "\0" ? /* @__PURE__ */ s.jsx("code", { className: "cms:wrap-anywhere", children: b }, F) : n === "" ? /* @__PURE__ */ s.jsx("code", { className: "cms:wrap-anywhere", children: S(b) }, F) : n) }),
      /* @__PURE__ */ s.jsx("p", { children: x })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-wrap cms:items-center cms:gap-x-3 cms:gap-y-1 cms:text-xs cms:text-muted-foreground", children: [
      /* @__PURE__ */ s.jsxs("span", { className: "cms:flex cms:min-w-0 cms:max-w-full cms:items-baseline cms:gap-1", children: [
        /* @__PURE__ */ s.jsx("span", { className: "cms:shrink-0", children: e("Uses") }),
        T === null ? /* @__PURE__ */ s.jsx("span", { children: e("the built-in template") }) : /* @__PURE__ */ s.jsx(O, { view: T })
      ] }),
      /* @__PURE__ */ s.jsxs(m.Popover, { children: [
        /* @__PURE__ */ s.jsx(m.PopoverTrigger, { asChild: !0, children: /* @__PURE__ */ s.jsx("button", { type: "button", className: "cms:ml-auto cms:shrink-0 cms:rounded-sm cms:underline cms:underline-offset-4 cms:hover:text-foreground cms:focus-visible:outline-2 cms:focus-visible:outline-ring", children: e("How is it chosen?") }) }),
        /* @__PURE__ */ s.jsx(m.PopoverContent, { align: "end", className: "cms:w-max cms:min-w-72 cms:max-w-[min(32rem,calc(100vw-2rem))]", children: /* @__PURE__ */ s.jsx(V, { value: t, lookup: a }) })
      ] })
    ] }),
    /* @__PURE__ */ s.jsx(E, { message: r })
  ] });
}
function q() {
  return [
    { handle: "title", type: "text", label: e("Meta title"), instructions: e("Empty: the title."), config: { max: 255 } },
    { handle: "description", type: "textarea", label: e("Meta description"), instructions: e("A sentence or two for search results."), config: { max: 500 } },
    { handle: "canonical", type: "text", label: e("Canonical URL"), instructions: e("Only if this page copies another: that page's address. Empty: this page."), config: { max: 2e3 } },
    { handle: "image", type: "media", label: e("Open Graph image"), instructions: e("Shown when the page is shared."), config: { types: ["image"] } },
    { handle: "noindex", type: "toggle", label: e("Hide from search engines (noindex)") }
  ];
}
export {
  D as T,
  q as s,
  B as w
};
