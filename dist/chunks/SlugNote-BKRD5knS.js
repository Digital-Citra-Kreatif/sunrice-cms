import { j as s, t } from "./admin-BrOs4B--.js";
import { _ as C } from "./createLucideIcon-Ccbp7F45.js";
import { u as m } from "./ui-Dh5wfMwT.js";
import { F as _ } from "./FieldError-36ltLu3Y.js";
import { H as P } from "./FieldInput-CPXNGfxM.js";
import { C as f } from "./check-OeKFYRnl.js";
const y = (c) => c.includes("::") ? c : `${c.replace(/\./g, "/")}.blade.php`;
function T(c, e) {
  const i = c.trim();
  return i !== "" && !k(c, e) ? i : e?.fallbacks.find((r) => r.exists && r.view !== i)?.view ?? null;
}
function k(c, e) {
  const i = c.trim();
  return i === "" ? !1 : e?.own?.view === i ? !e.own.exists : e?.choices !== void 0 && !e.choices.includes(i);
}
function F({ view: c }) {
  const e = y(c);
  return /* @__PURE__ */ s.jsx("code", { title: e, className: "cms:block cms:min-w-0 cms:truncate cms:font-mono cms:text-xs", children: e });
}
function A({ value: c = "", lookup: e = null }) {
  const i = c.trim(), r = T(c, e), d = /* @__PURE__ */ s.jsx("span", { className: "cms:shrink-0 cms:rounded cms:bg-emerald-500/15 cms:px-1.5 cms:text-[0.65rem] cms:font-medium cms:text-emerald-800 cms:dark:text-emerald-300", children: t("in use") }), x = [...i !== "" ? [i] : [], ...(e?.fallbacks ?? []).map((a) => a.view).filter((a) => a !== i)];
  return /* @__PURE__ */ s.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:text-xs", children: [
    /* @__PURE__ */ s.jsx("p", { className: "cms:text-muted-foreground", children: t("Tried in this order; the first file that exists is used.") }),
    /* @__PURE__ */ s.jsxs("ol", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      x.map((a, u) => /* @__PURE__ */ s.jsxs("li", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-2 cms:text-muted-foreground", children: [
        /* @__PURE__ */ s.jsxs("span", { className: "cms:w-4 cms:shrink-0 cms:text-right cms:tabular-nums", children: [
          u + 1,
          "."
        ] }),
        /* @__PURE__ */ s.jsx(F, { view: a }),
        r === a && d
      ] }, a)),
      /* @__PURE__ */ s.jsxs("li", { className: "cms:flex cms:items-center cms:gap-2 cms:text-muted-foreground", children: [
        /* @__PURE__ */ s.jsxs("span", { className: "cms:w-4 cms:shrink-0 cms:text-right cms:tabular-nums", children: [
          x.length + 1,
          "."
        ] }),
        /* @__PURE__ */ s.jsx("span", { className: "cms:min-w-0 cms:truncate", children: t("the built-in template") }),
        r === null && d
      ] })
    ] })
  ] });
}
function H({ id: c, value: e, onChange: i, lookup: r = null, example: d, automatic: x, error: a, disabled: u = !1 }) {
  const [j, g] = C.useState(!1), [w, h] = C.useState(""), N = r?.choices ?? [], l = e.trim(), v = T(e, r), S = k(e, r), o = w.trim().toLowerCase(), p = (n) => {
    i(n), g(!1), h("");
  };
  return /* @__PURE__ */ s.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ s.jsx(m.Label, { htmlFor: c, children: t("Template") }),
    /* @__PURE__ */ s.jsxs(m.Popover, { open: j, onOpenChange: (n) => {
      g(n), n || h("");
    }, children: [
      /* @__PURE__ */ s.jsx(m.PopoverTrigger, { asChild: !0, children: /* @__PURE__ */ s.jsxs(
        m.Button,
        {
          id: c,
          type: "button",
          variant: "outline",
          role: "combobox",
          "aria-expanded": j,
          "aria-invalid": a !== void 0,
          disabled: u,
          className: "cms:w-full cms:min-w-0 cms:justify-between cms:font-normal",
          children: [
            /* @__PURE__ */ s.jsx("span", { className: `cms:min-w-0 cms:truncate ${l === "" ? "cms:text-muted-foreground" : "cms:font-mono cms:text-xs"}`, title: l || void 0, children: l === "" ? t("Automatic") : l }),
            /* @__PURE__ */ s.jsx(P, { className: "cms:opacity-50" })
          ]
        }
      ) }),
      /* @__PURE__ */ s.jsx(m.PopoverContent, { align: "start", className: "cms:w-(--radix-popover-trigger-width) cms:min-w-64 cms:p-0", children: /* @__PURE__ */ s.jsxs(m.Command, { children: [
        /* @__PURE__ */ s.jsx(m.CommandInput, { placeholder: t("Find or type a view name"), value: w, onValueChange: h }),
        /* @__PURE__ */ s.jsxs(m.CommandList, { children: [
          /* @__PURE__ */ s.jsx(m.CommandEmpty, { children: t("No such view.") }),
          /* @__PURE__ */ s.jsxs(m.CommandGroup, { children: [
            /* @__PURE__ */ s.jsxs(m.CommandItem, { value: "__automatic", keywords: [t("Automatic")], onSelect: () => p(""), children: [
              /* @__PURE__ */ s.jsx(f, { className: l === "" ? "" : "cms:opacity-0" }),
              " ",
              t("Automatic")
            ] }),
            N.map((n) => /* @__PURE__ */ s.jsxs(m.CommandItem, { value: n, onSelect: () => p(n), children: [
              /* @__PURE__ */ s.jsx(f, { className: l === n ? "" : "cms:opacity-0" }),
              " ",
              /* @__PURE__ */ s.jsx("span", { className: "cms:truncate cms:font-mono cms:text-xs", children: n })
            ] }, n)),
            o !== "" && !N.includes(o) && /* @__PURE__ */ s.jsxs(m.CommandItem, { value: `__typed ${o}`, keywords: [o], onSelect: () => p(o), children: [
              /* @__PURE__ */ s.jsx(f, { className: "cms:opacity-0" }),
              " ",
              /* @__PURE__ */ s.jsx("span", { className: "cms:truncate", children: t("Use :view", { view: o }) })
            ] })
          ] })
        ] })
      ] }) })
    ] }),
    S && /* @__PURE__ */ s.jsx("p", { className: "cms:text-xs cms:text-amber-700 cms:dark:text-amber-400", children: t("No such file yet: the page uses the next one until it exists.") }),
    /* @__PURE__ */ s.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-0.5 cms:text-xs cms:leading-relaxed cms:text-muted-foreground", children: [
      /* @__PURE__ */ s.jsx("p", { children: t("Files are under resources/views; a name like :example is :file.", { example: "\0", file: "" }).split(/(\u0000|\u0001)/).map((n, b) => n === "\0" ? /* @__PURE__ */ s.jsx("code", { children: d }, b) : n === "" ? /* @__PURE__ */ s.jsx("code", { children: y(d) }, b) : n) }),
      /* @__PURE__ */ s.jsx("p", { children: x })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-2 cms:text-xs cms:text-muted-foreground", children: [
      /* @__PURE__ */ s.jsx("span", { className: "cms:shrink-0", children: t("Uses") }),
      v === null ? /* @__PURE__ */ s.jsx("span", { className: "cms:min-w-0 cms:truncate", children: t("the built-in template") }) : /* @__PURE__ */ s.jsx(F, { view: v }),
      /* @__PURE__ */ s.jsxs(m.Popover, { children: [
        /* @__PURE__ */ s.jsx(m.PopoverTrigger, { asChild: !0, children: /* @__PURE__ */ s.jsx("button", { type: "button", className: "cms:ml-auto cms:shrink-0 cms:rounded-sm cms:underline cms:underline-offset-4 cms:hover:text-foreground cms:focus-visible:outline-2 cms:focus-visible:outline-ring", children: t("How is it chosen?") }) }),
        /* @__PURE__ */ s.jsx(m.PopoverContent, { align: "end", className: "cms:w-80 cms:max-w-[calc(100vw-2rem)]", children: /* @__PURE__ */ s.jsx(A, { value: e, lookup: r }) })
      ] })
    ] }),
    /* @__PURE__ */ s.jsx(_, { message: a })
  ] });
}
function V({ note: c, redirectsUrl: e }) {
  return /* @__PURE__ */ s.jsx("div", { "aria-live": "polite", children: c !== null && /* @__PURE__ */ s.jsxs("p", { className: "cms:text-xs cms:text-muted-foreground", children: [
    c === "redirects" ? t("Once published, the old address redirects to the new one.") : t("The old address will stop working (404) unless a redirect is added."),
    c === "breaks" && e && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      " ",
      /* @__PURE__ */ s.jsx("a", { href: e, target: "_blank", rel: "noopener", className: "cms:underline cms:underline-offset-2 cms:hover:text-foreground", children: t("Add a redirect") })
    ] })
  ] }) });
}
export {
  V as S,
  H as T
};
