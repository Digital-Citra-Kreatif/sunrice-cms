import { j as n, t as u, a as Ze } from "./admin-CBkX-z7V.js";
import { c as B, _ as k } from "./createLucideIcon-Ccbp7F45.js";
import { u as d } from "./ui-Dh5wfMwT.js";
import { t as es, a as q, E as Se, o as ss, d as xe, b as ts, g as ns, i as Ae, n as rs, c as cs, s as as } from "./EntriesPicker-C9EtCaFB.js";
import { F as V } from "./FieldError-DuMp-ZS3.js";
import { C as ls } from "./check-OeKFYRnl.js";
import { X as os } from "./EntryStatus-CAdx5wKB.js";
import { S as is } from "./search-3zKi7F1_.js";
import { P as Ce } from "./plus-COqahUZ2.js";
import { T as Te } from "./trash-DHN6ewjn.js";
import { C as ms } from "./chevron-right-9qVV6b-Q.js";
const Ee = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
Ee.node;
const us = B(Ee);
const De = {
  name: "chevrons-down-up",
  size: 24,
  node: [
    ["path", { d: "m7 20 5-5 5 5", key: "13a0gw" }],
    ["path", { d: "m7 4 5 5 5-5", key: "1kwcof" }]
  ]
};
De.node;
const ds = B(De);
const Oe = {
  name: "chevrons-up-down",
  size: 24,
  node: [
    ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
    ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
  ]
};
Oe.node;
const qe = B(Oe);
const Ie = {
  name: "info",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M12 16v-4", key: "1dtifu" }],
    ["path", { d: "M12 8h.01", key: "e9boi3" }]
  ]
};
Ie.node;
const fs = B(Ie), ps = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
function H(e) {
  return e.replace(/[&<>"']/g, (s) => ps[s] ?? s);
}
function hs(e) {
  return /[\u0000- \u007f]/.test(e) ? !1 : /^(https?:\/\/[^/]|mailto:|tel:|\/(?![/\\])|#)/i.test(e);
}
const ge = new RegExp("`([^`\\n]+)`|\\[([^\\]\\n]+)\\]\\(([^()\\s]+)\\)|\\*\\*(?=\\S)(.+?)(?<=\\S)\\*\\*|\\*(?=[^\\s*])([^*\\n]+?)(?<=\\S)\\*");
function F(e, s = !1) {
  let t = "", c = e;
  for (let r = ge.exec(c); r !== null; r = ge.exec(c)) {
    t += H(c.slice(0, r.index));
    const [a, l, p, i, x, f] = r;
    l !== void 0 ? t += `<code>${H(l)}</code>` : p !== void 0 && i !== void 0 ? t += s || !hs(i) ? F(p, s) : `<a href="${H(i)}" target="_blank" rel="noopener noreferrer">${F(p, !0)}</a>` : x !== void 0 ? t += `<strong>${F(x, s)}</strong>` : f !== void 0 ? t += `<em>${F(f, s)}</em>` : t += H(a), c = c.slice(r.index + a.length);
  }
  return t + H(c);
}
const xs = ["text", "number"], gs = ["group", "repeater", "flexible"], ys = ["placeholder", "prefix", "suffix"];
function L(e) {
  return typeof e == "string" && e.trim() !== "" ? e.trim() : null;
}
function Me(e) {
  return { hint: L(e.hint), tooltip: L(e.hint_tooltip) };
}
function ze(e) {
  return xs.includes(e.type) ? { prefix: L(e.config?.prefix), suffix: L(e.config?.suffix) } : { prefix: null, suffix: null };
}
function ye({ field: e, id: s, label: t, maxWidth: c = "cms:max-w-[60%]" }) {
  const { hint: r, tooltip: a } = Me(e);
  return r === null && a === null ? null : /* @__PURE__ */ n.jsxs("span", { className: `cms:ml-auto cms:flex ${c} cms:min-w-0 cms:shrink-0 cms:items-center cms:gap-1 cms:text-xs cms:leading-none cms:text-muted-foreground`, children: [
    r !== null && /* @__PURE__ */ n.jsx("span", { id: `${s}-hint`, className: "cms:min-w-0 cms:truncate cms:py-0.5", title: r, children: r }),
    a !== null && /* @__PURE__ */ n.jsxs(d.Tooltip, { children: [
      /* @__PURE__ */ n.jsx(d.TooltipTrigger, { asChild: !0, children: /* @__PURE__ */ n.jsx(
        "button",
        {
          type: "button",
          "aria-label": u("More about :field", { field: t }),
          className: "cms:-m-1 cms:inline-flex cms:shrink-0 cms:rounded-full cms:p-1 cms:text-muted-foreground cms:outline-none cms:hover:text-foreground cms:focus-visible:ring-2 cms:focus-visible:ring-ring",
          children: /* @__PURE__ */ n.jsx(fs, { className: "cms:size-3.5", "aria-hidden": !0 })
        }
      ) }),
      /* @__PURE__ */ n.jsx(d.TooltipContent, { className: "cms:max-w-xs cms:text-left cms:whitespace-pre-line", children: a })
    ] })
  ] });
}
function bs({ text: e, id: s, className: t = "" }) {
  return !e || e.trim() === "" ? null : /* @__PURE__ */ n.jsx(
    "p",
    {
      id: s,
      className: `cms:text-sm cms:text-muted-foreground cms:[overflow-wrap:anywhere] cms:[&_a]:font-medium cms:[&_a]:text-foreground cms:[&_a]:underline cms:[&_a]:underline-offset-2 cms:[&_a:hover]:text-primary cms:[&_code]:rounded cms:[&_code]:bg-muted cms:[&_code]:px-1 cms:[&_code]:font-mono cms:[&_code]:text-[0.8125rem] cms:[&_strong]:font-semibold cms:[&_strong]:text-foreground ${t}`.trim(),
      dangerouslySetInnerHTML: { __html: F(e) }
    }
  );
}
function be({ prefix: e, suffix: s, id: t, className: c = "", children: r }) {
  if (e === null && s === null) return /* @__PURE__ */ n.jsx(n.Fragment, { children: r });
  const a = "cms:flex cms:shrink-0 cms:items-center cms:bg-muted/60 cms:px-3 cms:text-sm cms:whitespace-nowrap cms:text-muted-foreground cms:select-none";
  return /* @__PURE__ */ n.jsxs("div", { "data-slot": "input-group", className: `cms:flex cms:h-10 cms:w-full cms:min-w-0 cms:items-stretch cms:overflow-hidden cms:rounded-md cms:border cms:border-input/80 cms:bg-card cms:shadow-xs cms:transition-[border-color,box-shadow] cms:duration-150 cms:hover:border-ring/45 cms:focus-within:border-ring/70 cms:focus-within:ring-4 cms:focus-within:ring-ring-glow cms:has-[[aria-invalid=true]]:border-destructive cms:has-[[aria-invalid=true]]:ring-destructive/20 cms:has-disabled:cursor-not-allowed cms:has-disabled:opacity-50 cms:has-[[readonly]]:bg-muted/30 cms:dark:bg-input/20 ${c}`.trim(), children: [
    e !== null && /* @__PURE__ */ n.jsx("span", { id: `${t}-prefix`, className: `${a} cms:border-r cms:border-input/80`, children: e }),
    r,
    s !== null && /* @__PURE__ */ n.jsx("span", { id: `${t}-suffix`, className: `${a} cms:border-l cms:border-input/80`, children: s })
  ] });
}
const ve = "cms:h-full cms:min-w-0 cms:flex-1 cms:rounded-none cms:border-0 cms:bg-transparent cms:shadow-none cms:hover:border-0 cms:focus-visible:ring-0 cms:aria-invalid:ring-0 cms:disabled:opacity-100 cms:dark:bg-transparent";
function vs(e) {
  return e === null ? [] : Array.isArray(e) ? e : [e];
}
function He(e, s, t) {
  return s && t !== null && e.length >= t;
}
function js(e, s, t, c) {
  return t ? e.includes(s) ? e.filter((r) => r !== s) : He(e, t, c) ? e.slice() : [...e, s] : [s];
}
function ws(e) {
  return e.slice(0, -1);
}
function ks(e, s) {
  return s ? e.slice() : e[0] ?? null;
}
function Ns(e, s, t, c = () => !1) {
  const r = s === "ArrowDown" || s === "Home" ? 1 : s === "ArrowUp" || s === "End" ? -1 : 0;
  if (r === 0 || t === 0) return e;
  let a = s === "Home" ? 0 : s === "End" ? t - 1 : e + r;
  for (s === "ArrowUp" && e === -1 && (a = t - 1); a >= 0 && a < t && c(a); ) a += r;
  return a >= 0 && a < t ? a : e;
}
function $s(e, s) {
  const t = new Set(e.map((c) => c.id));
  return [...e, ...s.filter((c) => !t.has(c.id))];
}
function _s(e) {
  const s = [], t = {};
  for (const c of e)
    s.length = Math.min(s.length, c.depth), t[c.id] = s.slice(), s.push(c.label);
  return t;
}
function je(e, s) {
  return [...s ?? [], e].join(" › ");
}
const Ss = k.createContext({});
async function ne(e, s) {
  const t = await fetch(`${Ze("cms/terms/picker")}?${es(e)}`, { headers: { Accept: "application/json" }, credentials: "same-origin", signal: s });
  if (!t.ok) throw new Error(String(t.status));
  return await t.json();
}
function As({ id: e, taxonomy: s, multiple: t, max: c, required: r, invalid: a, value: l, onChange: p }) {
  const i = k.useContext(Ss), x = vs(l), [f, b] = k.useState(!1), [m, h] = k.useState(""), [y, v] = k.useState(null), [g, N] = k.useState(!1), [S, w] = k.useState(!1), [E, I] = k.useState(0), [U, We] = k.useState({}), [_, K] = k.useState(-1), [W, Ge] = k.useState(null), G = k.useRef(null), X = k.useRef(null), ie = k.useRef(null), me = k.useRef(null), Y = m.trim(), M = k.useCallback((o, j) => {
    const $ = j ? _s(o) : {};
    We((D) => {
      const R = { ...D };
      for (const O of o) R[O.id] = { label: O.label, parents: $[O.id] ?? D[O.id]?.parents };
      return R;
    });
  }, []), A = f && s ? Y : null;
  k.useEffect(() => {
    if (A === null || s === null || me.current === `${s}
${A}`) return;
    const o = new AbortController(), j = window.setTimeout(() => {
      ne({ taxonomy: s, q: A }, o.signal).then(($) => {
        me.current = `${s}
${A}`, v({ ...$, q: A }), M($.items, A === ""), K(A !== "" && $.items.length > 0 ? 0 : -1), w(!1);
      }).catch(($) => {
        $ instanceof DOMException && $.name === "AbortError" || w(!0);
      });
    }, A === "" ? 0 : 250);
    return () => {
      window.clearTimeout(j), o.abort();
    };
  }, [s, A, E, M]);
  const ue = (o) => i[String(o)] ?? U[o]?.label, J = x.filter((o) => ue(o) === void 0).join(",");
  k.useEffect(() => {
    !s || J === "" || ne({ taxonomy: s, ids: J.split(",").map(Number) }).then((o) => M(o.items, !1)).catch(() => {
    });
  }, [s, J, M]);
  const Q = () => {
    !s || !y?.more || g || y.q !== Y || (N(!0), ne({ taxonomy: s, q: y.q, offset: y.items.length }).then((o) => {
      const j = $s(y.items, o.items);
      v({ items: j, more: o.more, q: y.q }), M(j, y.q === "");
    }).catch(() => w(!0)).finally(() => N(!1)));
  };
  if (k.useEffect(() => {
    _ >= 0 && y && document.getElementById(`${e}-option-${y.items[_]?.id}`)?.scrollIntoView({ block: "nearest" });
  }, [_, e, y]), !s) return /* @__PURE__ */ n.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: u("Choose a taxonomy for this field in its blueprint.") });
  const de = He(x, t, c), Z = t || !r, ee = (o) => p(ks(o, t)), fe = (o) => {
    ee(js(x, o, t, c)), t || b(!1);
  }, T = y?.items ?? [], se = (o) => de && !x.includes(T[o]?.id ?? -1), te = (o) => ue(o) ?? u("Term #:id", { id: o }), Xe = (o) => {
    if (o && G.current && X.current) {
      const j = G.current.getBoundingClientRect(), $ = X.current.getBoundingClientRect();
      Ge({ width: j.width, alignOffset: j.left - $.left, sideOffset: 4 + j.bottom - $.bottom });
    }
    o || h(""), b(o);
  }, Ye = (o) => {
    if (o.key === "ArrowDown" || o.key === "ArrowUp") {
      o.preventDefault();
      const j = Ns(_, o.key, T.length, se);
      o.key === "ArrowDown" && j === _ && _ === T.length - 1 && Q(), K(j);
    } else if (o.key === "Enter") {
      o.preventDefault();
      const j = T[_];
      j && !se(_) && fe(j.id);
    } else o.key === "Backspace" && m === "" && Z && x.length > 0 && (o.preventDefault(), ee(ws(x)));
  }, Je = (o) => {
    const j = o.currentTarget;
    j.scrollTop + j.clientHeight >= j.scrollHeight - 48 && Q();
  }, Qe = t ? u("Choose terms…") : u("Choose a term…"), pe = `${e}-listbox`, he = y !== null && y.q !== Y;
  let z;
  return S ? z = /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:items-start cms:gap-2 cms:p-3 cms:text-sm", children: [
    /* @__PURE__ */ n.jsx("p", { className: "cms:text-destructive", children: u("Terms could not be loaded.") }),
    /* @__PURE__ */ n.jsx(d.Button, { type: "button", variant: "outline", size: "sm", onClick: () => {
      w(!1), I((o) => o + 1);
    }, children: u("Try again") })
  ] }) : y === null ? z = /* @__PURE__ */ n.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:p-2", "aria-busy": "true", "aria-label": u("Loading terms"), children: [70, 55, 80, 45, 65].map((o) => /* @__PURE__ */ n.jsx(d.Skeleton, { className: "cms:h-5", style: { width: `${o}%` } }, o)) }) : T.length === 0 ? z = /* @__PURE__ */ n.jsx("p", { className: "cms:p-3 cms:text-sm cms:text-muted-foreground", children: y.q ? u("No terms match “:search”.", { search: y.q }) : u("Nothing to choose from yet.") }) : z = /* @__PURE__ */ n.jsxs("div", { className: `cms:max-h-72 cms:overflow-y-auto cms:overscroll-contain cms:p-1 ${he ? "cms:opacity-60" : ""}`, onScroll: Je, children: [
    /* @__PURE__ */ n.jsx("div", { role: "listbox", id: pe, "aria-label": u("Terms"), "aria-multiselectable": t || void 0, "aria-busy": he || void 0, children: T.map((o, j) => {
      const $ = x.includes(o.id), D = se(j), R = je(o.label, U[o.id]?.parents);
      return /* @__PURE__ */ n.jsxs(
        "div",
        {
          id: `${e}-option-${o.id}`,
          role: "option",
          "aria-selected": $,
          "aria-disabled": D || void 0,
          title: R,
          className: `cms:flex cms:cursor-default cms:items-center cms:gap-2 cms:rounded-sm cms:py-1.5 cms:pr-2 cms:text-sm cms:select-none ${j === _ ? "cms:bg-accent cms:text-accent-foreground" : ""} ${D ? "cms:opacity-50" : ""}`,
          style: { paddingLeft: `${0.5 + Math.min(o.depth, 6) * 0.875}rem` },
          onMouseDown: (O) => O.preventDefault(),
          onMouseMove: () => {
            j !== _ && K(j);
          },
          onClick: () => {
            D || fe(o.id);
          },
          children: [
            /* @__PURE__ */ n.jsx(ls, { className: `cms:size-4 cms:shrink-0 ${$ ? "" : "cms:invisible"}`, "aria-hidden": "true" }),
            /* @__PURE__ */ n.jsx("span", { className: "cms:min-w-0 cms:truncate", children: o.label })
          ]
        },
        o.id
      );
    }) }),
    y.more && /* @__PURE__ */ n.jsx(d.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:mt-1 cms:w-full", disabled: g, onMouseDown: (o) => o.preventDefault(), onClick: Q, children: g ? u("Loading…") : u("Load more") })
  ] }), /* @__PURE__ */ n.jsxs(d.Popover, { open: f, onOpenChange: Xe, children: [
    /* @__PURE__ */ n.jsxs(
      "div",
      {
        ref: G,
        "data-invalid": a || void 0,
        className: "cms:flex cms:w-full cms:max-w-xl cms:min-w-0 cms:[contain:inline-size] cms:flex-wrap cms:items-center cms:gap-1 cms:rounded-md cms:border cms:border-input/80 cms:bg-card cms:p-1 cms:shadow-xs cms:data-invalid:border-destructive cms:dark:bg-input/20",
        children: [
          x.map((o) => /* @__PURE__ */ n.jsxs(
            "span",
            {
              title: je(te(o), U[o]?.parents),
              className: "cms:inline-flex cms:h-7 cms:max-w-full cms:min-w-0 cms:items-center cms:gap-0.5 cms:rounded-sm cms:bg-secondary cms:pl-2 cms:text-xs cms:font-medium cms:text-secondary-foreground",
              children: [
                /* @__PURE__ */ n.jsx("span", { className: `cms:min-w-0 cms:truncate ${Z ? "" : "cms:pr-2"}`, children: te(o) }),
                Z && /* @__PURE__ */ n.jsx(
                  "button",
                  {
                    type: "button",
                    className: "cms:inline-flex cms:size-7 cms:shrink-0 cms:items-center cms:justify-center cms:rounded-sm cms:text-muted-foreground cms:hover:bg-muted cms:hover:text-foreground cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none",
                    "aria-label": u("Remove :term", { term: te(o) }),
                    onClick: () => ee(x.filter((j) => j !== o)),
                    children: /* @__PURE__ */ n.jsx(os, { className: "cms:size-3", "aria-hidden": "true" })
                  }
                )
              ]
            },
            o
          )),
          /* @__PURE__ */ n.jsx(d.PopoverTrigger, { asChild: !0, children: /* @__PURE__ */ n.jsxs(
            "button",
            {
              ref: X,
              id: e,
              type: "button",
              "aria-haspopup": "listbox",
              "aria-invalid": a || void 0,
              className: "cms:flex cms:h-7 cms:min-w-24 cms:flex-1 cms:items-center cms:justify-between cms:gap-1 cms:rounded-sm cms:px-2 cms:text-left cms:text-sm cms:text-muted-foreground cms:hover:bg-muted cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none cms:disabled:pointer-events-none cms:disabled:opacity-50",
              children: [
                /* @__PURE__ */ n.jsx("span", { className: "cms:truncate", children: x.length === 0 ? Qe : t ? u("Add…") : u("Change…") }),
                /* @__PURE__ */ n.jsx(qe, { className: "cms:size-4 cms:shrink-0 cms:opacity-60", "aria-hidden": "true" })
              ]
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ n.jsxs(
      d.PopoverContent,
      {
        align: "start",
        alignOffset: W?.alignOffset,
        sideOffset: W?.sideOffset,
        className: "cms:max-w-[calc(100vw-2rem)] cms:min-w-60 cms:p-0",
        style: { width: W?.width },
        onOpenAutoFocus: (o) => {
          o.preventDefault(), ie.current?.focus();
        },
        children: [
          /* @__PURE__ */ n.jsxs("div", { className: "cms:relative cms:border-b cms:border-border/60", children: [
            /* @__PURE__ */ n.jsx(is, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground", "aria-hidden": "true" }),
            /* @__PURE__ */ n.jsx(
              "input",
              {
                ref: ie,
                type: "text",
                role: "combobox",
                "aria-expanded": "true",
                "aria-controls": pe,
                "aria-autocomplete": "list",
                "aria-label": u("Search terms"),
                "aria-activedescendant": _ >= 0 && T[_] ? `${e}-option-${T[_].id}` : void 0,
                className: "cms:h-10 cms:w-full cms:bg-transparent cms:pr-3 cms:pl-9 cms:text-sm cms:outline-none cms:placeholder:text-muted-foreground",
                placeholder: u("Search terms"),
                autoComplete: "off",
                value: m,
                onKeyDown: Ye,
                onChange: (o) => h(o.target.value)
              }
            )
          ] }),
          z,
          de && c !== null && /* @__PURE__ */ n.jsx("p", { className: "cms:border-t cms:border-border/60 cms:px-3 cms:py-2 cms:text-xs cms:text-muted-foreground", children: u("Up to :max terms.", { max: c }) })
        ]
      }
    )
  ] });
}
const Fe = (e, s = {}) => e.replace(/:([A-Za-z_]+)/g, (t, c) => s[c] ?? t), mt = 5;
let Cs = 0;
const ae = () => `f${++Cs}`;
function Ts(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function Es(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^[0-9_]+/, "").replace(/_{2,}/g, "_").slice(0, 64);
}
function Re(e, s) {
  const t = new Set(s.map((a) => a.handle)), c = Ts(e) || "field";
  let r = c;
  for (let a = 2; t.has(r); a++)
    r = `${c}_${a}`;
  return r;
}
function Ds(e) {
  return (e ?? []).map(({ fields: s, ...t }) => ({
    ...t,
    key: ae(),
    fields: Ds(s),
    handleTouched: !0,
    savedHandle: t.handle
  }));
}
function Os(e, s) {
  return e.map(({ key: t, handleTouched: c, savedHandle: r, fields: a, ...l }) => ({
    ...l,
    validation: (l.validation ?? []).map((p) => p.trim()).filter((p) => p !== ""),
    ...s(l.type) ? { fields: Os(a, s) } : {}
  }));
}
function ut(e, s, t) {
  return { key: ae(), type: e, label: s, handle: Re(s, t), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function dt(e) {
  return e.type !== "fieldset" && e.savedHandle !== void 0 && e.savedHandle !== "" && e.handle !== e.savedHandle ? e.savedHandle : null;
}
function qs(e) {
  return e.map((s) => ({ ...s, savedHandle: s.handle, fields: qs(s.fields) }));
}
function ft(e, s, t) {
  if (e.handleTouched) return { ...e, label: s };
  const c = t.filter((r) => r.key !== e.key);
  return { ...e, label: s, handle: Re(s || e.type, c) };
}
function Is(e, s) {
  const t = `${s}.`, c = {};
  for (const [r, a] of Object.entries(e))
    r.startsWith(t) && (c[r.slice(t.length)] = a);
  return c;
}
function le(e, s) {
  const t = e[s];
  return { ...Is(e, s), ...t !== void 0 ? { "": t } : {} };
}
function pt(e, s) {
  return Object.keys(e).filter((t) => t === s || t.startsWith(`${s}.`));
}
function ht(e, s) {
  return Object.keys(e).some((t) => t === s || t.startsWith(`${s}.`));
}
function xt(e, s) {
  return s.filter((t) => t.key !== e.key && t.handle !== "" && t.type !== "fieldset");
}
function gt(e, s, t, c = Fe) {
  return e.type === "fieldset" ? null : t?.includes(e.handle) ? c('":handle" is used by the content itself; choose another handle.', { handle: e.handle }) : e.handle !== "" && s.some((r) => r.key !== e.key && r.type !== "fieldset" && r.handle === e.handle) ? c('There is already a field ":handle" here.', { handle: e.handle }) : null;
}
function yt(e, s) {
  return typeof e.translatable == "boolean" ? e.translatable : s;
}
function bt(e, s, t) {
  return { ...e, translatable: s === t ? null : s };
}
function Ms(e, s, t = []) {
  const c = /* @__PURE__ */ new Set([...s.map((l) => l.handle), ...t]), r = `${(Es(e) || "field").slice(0, 56)}_copy`;
  let a = r;
  for (let l = 2; c.has(a); l++)
    a = `${r}_${l}`;
  return a;
}
function Pe(e) {
  const { key: s, savedHandle: t, fields: c, ...r } = e;
  return { ...structuredClone(r), key: ae(), fields: c.map(Pe) };
}
function vt(e, s, t = [], c = Fe) {
  const r = e[s];
  if (r === void 0) return null;
  const a = r.label || r.handle, l = {
    ...Pe(r),
    label: c(":label (copy)", { label: a }),
    handle: r.type === "fieldset" ? r.handle : Ms(r.handle, e, t),
    handleTouched: !0
  };
  return { fields: [...e.slice(0, s + 1), l, ...e.slice(s + 1)], copy: l };
}
function zs(e, s) {
  const t = e.condition;
  return !t || "rules" in t ? null : (t.operator === "filled" || t.operator === "equals" && (t.value === !0 || t.value === "true")) && s.some((r) => r.handle === t.field && r.type === "toggle") ? t.field : null;
}
function jt(e) {
  const s = (l) => l.type === "number" || l.type === "text" && (l.instructions ?? "").length <= 60, t = (l) => l.type === "text" && ys.includes(l.handle), c = {}, r = [];
  for (const l of e) {
    const p = zs(l, e);
    p === null ? r.push(l) : (c[p] ??= []).push(l);
  }
  const a = r.filter((l) => !t(l));
  return { options: a.filter((l) => !s(l)), limits: a.filter(s), appearance: r.filter(t), dependents: c };
}
const wt = [
  { value: "equals", label: "is", needsValue: !0 },
  { value: "not_equals", label: "is not", needsValue: !0 },
  { value: "filled", label: "is filled in", needsValue: !1 },
  { value: "empty", label: "is empty", needsValue: !1 }
];
function we(e) {
  return e === !0 ? "true" : e === !1 ? "false" : typeof e == "string" || typeof e == "number" ? String(e) : "";
}
function Hs(e) {
  return e ? "rules" in e ? Array.isArray(e.rules) ? e.rules : [] : [e] : [];
}
function Fs(e) {
  return e && "rules" in e && e.match === "any" ? "any" : "all";
}
function kt(e, s) {
  return e.length === 0 ? null : e.length === 1 ? e[0] : { match: s, rules: e };
}
function ke(e, s) {
  const t = s[e.field], c = t != null && t !== "" && t !== !1 && !(Array.isArray(t) && t.length === 0), r = (Array.isArray(t) ? t : [t]).map(we).includes(we(e.value));
  switch (e.operator) {
    case "equals":
      return r;
    case "not_equals":
      return !r;
    case "filled":
      return c;
    default:
      return !c;
  }
}
function Rs(e, s) {
  const t = Hs(e.condition);
  return t.length === 0 ? !0 : Fs(e.condition) === "any" ? t.some((c) => ke(c, s)) : t.every((c) => ke(c, s));
}
function Nt(e) {
  const s = e?.config ?? {};
  switch (e?.type) {
    case "select": {
      const t = (Array.isArray(s.options) ? s.options : []).flatMap((c) => {
        if (typeof c == "string" && c !== "") return [{ value: c, label: c }];
        if (c && typeof c == "object" && typeof c.value == "string" && c.value !== "") {
          const { value: r, label: a } = c;
          return [{ value: r, label: typeof a == "string" && a !== "" ? a : r }];
        }
        return [];
      });
      return t.length > 0 ? { kind: "options", options: t } : { kind: "text" };
    }
    case "toggle":
      return { kind: "toggle" };
    case "terms":
      return { kind: "terms", taxonomy: typeof s.taxonomy == "string" && s.taxonomy !== "" ? s.taxonomy : null };
    case "entries":
      return { kind: "entries", collections: Array.isArray(s.collections) ? s.collections.filter((t) => typeof t == "string") : [] };
    case "number":
      return { kind: "number" };
    default:
      return { kind: "text" };
  }
}
function $t(e) {
  switch (e.kind) {
    case "toggle":
      return !0;
    case "options":
      return e.options[0]?.value ?? "";
    case "terms":
    case "entries":
    case "number":
      return null;
    default:
      return "";
  }
}
const Ps = [25, 33, 50, 66, 75, 100];
function Ls(e) {
  return Ps.find((s) => s === e.width) ?? 100;
}
function Bs(e = "cms:gap-x-4 cms:gap-y-6") {
  return `cms:@container cms:grid cms:grid-cols-12 cms:items-start ${e}`;
}
const Vs = {
  25: "cms:@lg:col-span-3",
  33: "cms:@lg:col-span-4",
  50: "cms:@lg:col-span-6",
  66: "cms:@lg:col-span-8",
  75: "cms:@lg:col-span-9",
  100: ""
};
function Ne(e) {
  return `cms:col-span-12 cms:min-w-0 ${Vs[Ls(e)]}`.trim();
}
function _t(e, s) {
  const { width: t, ...c } = e;
  return s === 100 ? c : { ...c, width: s };
}
const re = "__none";
function ce(e) {
  const s = e.config?.options;
  return Array.isArray(s) ? s.flatMap((t) => {
    if (typeof t == "string") return [{ value: t, label: t }];
    if (t && typeof t == "object" && typeof t.value == "string") {
      const { value: c, label: r } = t;
      return [{ value: c, label: r || c }];
    }
    return [];
  }) : [];
}
const Us = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function Le(e) {
  if (e.label) return e.label;
  const s = e.handle.replace(/_/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function $e({ field: e, value: s, onChange: t, errors: c, id: r, content: a = !1, fill: l = !1, marker: p = null }) {
  const i = Le(e), x = Us.includes(e.type) || ["select", "terms"].includes(e.type) && e.config?.multiple === !0, f = c[""] !== void 0, b = gs.includes(e.type), m = e.instructions && e.instructions.trim() !== "" ? /* @__PURE__ */ n.jsx(bs, { id: `${r}-help`, text: e.instructions }) : null, { hint: h } = Me(e), { prefix: y, suffix: v } = ze(e), g = [h && `${r}-hint`, y && `${r}-prefix`, v && `${r}-suffix`, m && `${r}-help`, f && `${r}-error`].filter(Boolean).join(" ") || void 0;
  return /* @__PURE__ */ n.jsxs(
    "div",
    {
      className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2",
      ...x ? { role: "group", "aria-labelledby": `${r}-label`, ...f ? { "aria-invalid": !0 } : {}, ...f || m ? { "aria-describedby": [m && `${r}-help`, f && `${r}-error`].filter(Boolean).join(" ") } : {} } : {},
      children: [
        e.type === "toggle" ? /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
          /* @__PURE__ */ n.jsx(d.Switch, { id: r, checked: s === !0, "aria-describedby": g, onCheckedChange: (N) => t(N) }),
          /* @__PURE__ */ n.jsx(d.Label, { htmlFor: r, className: "cms:min-w-0", children: i }),
          p,
          /* @__PURE__ */ n.jsx(ye, { field: e, id: r, label: i })
        ] }) : /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:min-h-4 cms:min-w-0 cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ n.jsxs(d.Label, { id: `${r}-label`, htmlFor: x ? void 0 : r, className: "cms:min-w-0", children: [
            i,
            e.required && /* @__PURE__ */ n.jsx("span", { className: "cms:text-destructive", children: " *" }),
            p
          ] }),
          /* @__PURE__ */ n.jsx(ye, { field: e, id: r, label: i })
        ] }),
        b && m,
        /* @__PURE__ */ n.jsx(Ws, { field: e, value: s, onChange: t, errors: c, id: r, content: a, fill: l, describedBy: g }),
        ["text", "textarea"].includes(e.type) && C(e, "max") !== void 0 && /* @__PURE__ */ n.jsx(Ks, { length: typeof s == "string" ? [...s].length : 0, max: C(e, "max") ?? 0 }),
        !b && m,
        /* @__PURE__ */ n.jsx(V, { message: c[""], id: `${r}-error` })
      ]
    }
  );
}
function Ks({ length: e, max: s }) {
  const t = e > s;
  return /* @__PURE__ */ n.jsxs("p", { className: `cms:-mt-1 cms:self-end cms:text-xs cms:tabular-nums ${t ? "cms:font-medium cms:text-destructive" : "cms:text-muted-foreground"}`, children: [
    e,
    " / ",
    s,
    t && /* @__PURE__ */ n.jsxs("span", { children: [
      " · ",
      e - s,
      " too many"
    ] })
  ] });
}
function Ws({ field: e, value: s, onChange: t, errors: c, id: r, content: a, fill: l = !1, describedBy: p }) {
  const i = c[""] !== void 0, { prefix: x, suffix: f } = ze(e), b = x !== null || f !== null;
  switch (e.type) {
    case "toggle":
      return null;
    case "file":
      return /* @__PURE__ */ n.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: u("Visitors attach a file here when they send a form.") });
    case "textarea":
      return /* @__PURE__ */ n.jsx(
        d.Textarea,
        {
          id: r,
          "aria-invalid": i,
          "aria-describedby": p,
          value: typeof s == "string" ? s : "",
          rows: C(e, "rows") ?? 4,
          placeholder: P(e, "placeholder"),
          onChange: (m) => t(m.target.value)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ n.jsx(d.RichTextEditor, { id: r, labelledBy: `${r}-label`, invalid: i, value: typeof s == "string" ? s : "", onChange: t });
    case "number": {
      const m = ns(s);
      return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ n.jsx(be, { prefix: x, suffix: f, id: r, className: l ? "" : "cms:max-w-64", children: /* @__PURE__ */ n.jsx(
          d.Input,
          {
            id: r,
            type: "number",
            className: b ? ve : l ? "cms:w-full" : "cms:max-w-48",
            placeholder: P(e, "placeholder"),
            "aria-invalid": i,
            "aria-describedby": [p, m && `${r}-grouped`].filter(Boolean).join(" ") || void 0,
            value: typeof s == "number" ? String(s) : typeof s == "string" ? s : "",
            min: C(e, "min"),
            max: C(e, "max"),
            step: C(e, "step") ?? "any",
            onChange: (h) => t(h.target.value === "" ? null : Number(h.target.value))
          }
        ) }),
        m && /* @__PURE__ */ n.jsx("span", { id: `${r}-grouped`, className: "cms:text-sm cms:tabular-nums cms:text-muted-foreground", children: m })
      ] });
    }
    case "date": {
      const m = e.config?.time === !0;
      return /* @__PURE__ */ n.jsx(
        d.DatePicker,
        {
          id: r,
          withTime: m,
          invalid: i,
          required: e.required === !0,
          value: xe(ts(s, m)),
          onChange: (h) => t(xe(h ?? ""))
        }
      );
    }
    case "select":
      return e.config?.multiple === !0 ? /* @__PURE__ */ n.jsx(
        Xs,
        {
          options: ce(e),
          value: Array.isArray(s) ? s.map(String) : [],
          onChange: t,
          invalid: i,
          empty: typeof e.config?.empty == "string" ? e.config.empty : void 0,
          inTickOrder: e.config?.in_tick_order === !0
        }
      ) : /* @__PURE__ */ n.jsx(
        Gs,
        {
          options: ce(e),
          value: typeof s == "string" ? s : null,
          onChange: t,
          id: r,
          fill: l,
          empty: ss(ce(e), e.required === !0, typeof e.config?.default == "string" && e.config.default !== "", typeof s == "string" && s !== "")
        }
      );
    case "terms": {
      const m = e.config?.multiple === !0, h = Array.isArray(s) ? s.filter((y) => typeof y == "number") : typeof s == "number" ? s : null;
      return /* @__PURE__ */ n.jsx(
        As,
        {
          id: r,
          taxonomy: typeof e.taxonomy == "string" ? e.taxonomy : null,
          multiple: m,
          max: C(e, "max") ?? null,
          required: e.required === !0,
          invalid: i,
          value: m ? Array.isArray(h) ? h : [] : typeof h == "number" ? h : null,
          onChange: t
        }
      );
    }
    case "entries":
      return /* @__PURE__ */ n.jsx(
        Se,
        {
          id: r,
          invalid: i,
          multiple: e.config?.multiple === !0,
          max: C(e, "max") ?? null,
          collections: e.collections ?? [],
          onChange: t,
          value: typeof s == "number" || Array.isArray(s) && s.every((m) => typeof m == "number") ? s : null
        }
      );
    case "link":
      return /* @__PURE__ */ n.jsx(
        Ys,
        {
          label: Le(e),
          value: q(s),
          onChange: t,
          errors: c,
          id: r,
          collections: e.collections ?? [],
          placeholder: P(e, "placeholder"),
          describedBy: p
        }
      );
    case "media":
      return /* @__PURE__ */ n.jsx(
        d.MediaPickerInput,
        {
          id: r,
          invalid: i,
          disabled: !1,
          multiple: e.config?.multiple === !0,
          max: C(e, "max") ?? null,
          types: Array.isArray(e.config?.types) ? e.config.types : [],
          value: typeof s == "number" || Array.isArray(s) && s.every((m) => typeof m == "number") ? s : null,
          onChange: t
        }
      );
    case "group":
      return /* @__PURE__ */ n.jsx(oe, { fields: e.fields ?? [], value: q(s), onChange: t, errors: c, id: r, content: a });
    case "repeater":
      return /* @__PURE__ */ n.jsx(Js, { field: e, value: Array.isArray(s) ? s : [], onChange: t, errors: c, id: r, content: a });
    case "flexible":
      return /* @__PURE__ */ n.jsx(Qs, { field: e, value: Array.isArray(s) ? s : [], onChange: t, errors: c, id: r });
    default:
      return /* @__PURE__ */ n.jsx(be, { prefix: x, suffix: f, id: r, children: /* @__PURE__ */ n.jsx(
        d.Input,
        {
          id: r,
          "aria-invalid": i,
          "aria-describedby": p,
          className: b ? ve : void 0,
          value: typeof s == "string" ? s : "",
          placeholder: P(e, "placeholder"),
          onChange: (m) => t(m.target.value)
        }
      ) });
  }
}
function C(e, s) {
  const t = e.config?.[s];
  return typeof t == "number" ? t : void 0;
}
function P(e, s) {
  const t = e.config?.[s];
  return typeof t == "string" ? t : void 0;
}
function oe({ fields: e, value: s, onChange: t, errors: c, id: r, content: a, bare: l = !1 }) {
  const p = /* @__PURE__ */ n.jsx("div", { className: Bs(l ? void 0 : "cms:gap-4"), children: e.filter((i) => Rs(i, s)).map((i) => i.shared ? (
    // Greyed out; the form says once, at the top, where to edit shared fields.
    /* @__PURE__ */ n.jsx("fieldset", { disabled: !0, className: `cms:flex cms:flex-col cms:gap-1 cms:opacity-60 ${Ne(i)}`, title: u("Shared by all languages: edit it in the main language."), children: /* @__PURE__ */ n.jsx($e, { id: `${r}-${i.handle}`, field: i, value: s[i.handle], content: a, errors: {}, onChange: () => {
    } }) }, i.handle)
  ) : /* @__PURE__ */ n.jsx("div", { className: Ne(i), children: /* @__PURE__ */ n.jsx(
    $e,
    {
      id: `${r}-${i.handle}`,
      field: i,
      value: s[i.handle],
      content: a,
      errors: le(c, i.handle),
      onChange: (x) => t({ ...s, [i.handle]: x })
    }
  ) }, i.handle)) });
  return l ? p : /* @__PURE__ */ n.jsx("div", { className: "cms:rounded-lg cms:border cms:p-4", children: p });
}
function Gs({ options: e, value: s, onChange: t, id: c, empty: r, fill: a = !1 }) {
  return /* @__PURE__ */ n.jsxs(d.Select, { value: s ?? re, onValueChange: (l) => t(l === re ? null : l), children: [
    /* @__PURE__ */ n.jsx(d.SelectTrigger, { id: c, className: a ? "cms:w-full" : "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ n.jsx(d.SelectValue, {}) }),
    /* @__PURE__ */ n.jsxs(d.SelectContent, { children: [
      r && /* @__PURE__ */ n.jsx(d.SelectItem, { value: re, children: u("None") }),
      e.map((l) => /* @__PURE__ */ n.jsx(d.SelectItem, { value: l.value, children: l.label }, l.value))
    ] })
  ] });
}
function Xs({ options: e, value: s, onChange: t, empty: c, inTickOrder: r = !1, invalid: a = !1 }) {
  return e.length === 0 ? /* @__PURE__ */ n.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: c ?? u("Nothing to choose from yet.") }) : /* @__PURE__ */ n.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2", children: e.map((l) => /* @__PURE__ */ n.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
    /* @__PURE__ */ n.jsx(
      d.Checkbox,
      {
        checked: s.includes(l.value),
        "aria-invalid": a || void 0,
        onCheckedChange: (p) => t(p ? r ? [...s.filter((i) => i !== l.value), l.value] : e.map((i) => i.value).filter((i) => i === l.value || s.includes(i)) : s.filter((i) => i !== l.value))
      }
    ),
    l.label,
    r && s.includes(l.value) && /* @__PURE__ */ n.jsxs("span", { className: "cms:text-xs cms:text-muted-foreground", "aria-label": `number ${s.indexOf(l.value) + 1}`, children: [
      "#",
      s.indexOf(l.value) + 1
    ] })
  ] }, l.value)) });
}
function Ys({ label: e, value: s, onChange: t, errors: c, id: r, collections: a, placeholder: l, describedBy: p }) {
  const i = s.type === "entry" ? "entry" : "url", x = (f) => {
    const b = { ...s, type: i, ...f }, m = b.type === "entry" ? typeof b.entry_id != "number" : b.url === "" || b.url === void 0 || b.url === null;
    t(m ? b.label || b.new_tab ? b : null : b);
  };
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ n.jsx("div", { role: "radiogroup", "aria-label": u(":field: link to", { field: e }), className: "cms:inline-flex cms:w-fit cms:rounded-md cms:border cms:p-0.5", children: ["url", "entry"].map((f) => /* @__PURE__ */ n.jsx(
      d.Button,
      {
        type: "button",
        size: "sm",
        role: "radio",
        "aria-checked": i === f,
        variant: i === f ? "secondary" : "ghost",
        onClick: () => x({ type: f, url: f === "url" ? s.url : void 0, entry_id: f === "entry" ? s.entry_id : void 0 }),
        children: f === "url" ? u("Address") : u("Entry")
      },
      f
    )) }),
    /* @__PURE__ */ n.jsxs("div", { className: "cms:grid cms:gap-2 cms:md:grid-cols-[2fr_1fr_auto] cms:md:items-start", children: [
      i === "url" ? /* @__PURE__ */ n.jsx(
        d.Input,
        {
          id: r,
          "aria-label": u(":field: address", { field: e }),
          placeholder: l || u("https://… or /about"),
          "aria-describedby": p,
          value: typeof s.url == "string" ? s.url : "",
          onChange: (f) => x({ url: f.target.value }),
          "aria-invalid": c.url !== void 0
        }
      ) : /* @__PURE__ */ n.jsx(
        Se,
        {
          id: r,
          invalid: c.entry_id !== void 0,
          multiple: !1,
          max: null,
          collections: a,
          value: typeof s.entry_id == "number" ? s.entry_id : null,
          onChange: (f) => x({ entry_id: typeof f == "number" ? f : void 0 })
        }
      ),
      /* @__PURE__ */ n.jsx(
        d.Input,
        {
          "aria-label": u(":field: link text", { field: e }),
          placeholder: i === "entry" ? u("Link text (the entry's title)") : u("Link text"),
          value: typeof s.label == "string" ? s.label : "",
          onChange: (f) => x({ label: f.target.value })
        }
      ),
      /* @__PURE__ */ n.jsxs("label", { className: "cms:flex cms:h-9 cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ n.jsx(d.Checkbox, { checked: s.new_tab === !0, onCheckedChange: (f) => x({ new_tab: f }) }),
        u("New tab")
      ] }),
      /* @__PURE__ */ n.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ n.jsx(V, { message: c.url ?? c.entry_id ?? c.label ?? c.type }) })
    ] })
  ] });
}
function _e(e, s) {
  return !s && (e.fields ?? []).every((t) => t.type === "text");
}
function Be(e) {
  const s = k.useRef([]);
  return s.current = as(s.current, e), {
    keys: s.current,
    remove: (t) => {
      s.current = s.current.filter((c, r) => r !== t);
    },
    move: (t, c) => {
      s.current = d.moveItem(s.current, t, c);
    }
  };
}
function Ve() {
  const [e, s] = k.useState(() => /* @__PURE__ */ new Set());
  return {
    isCollapsed: (t, c) => !c && e.has(t),
    toggle: (t) => s((c) => {
      const r = new Set(c);
      return r.delete(t) || r.add(t), r;
    }),
    setAll: (t, c) => s(c ? new Set(t) : /* @__PURE__ */ new Set()),
    anyOpen: (t) => t.some((c) => !e.has(c))
  };
}
function Ue({ keys: e, folding: s }) {
  if (e.length < 2) return null;
  const t = s.anyOpen(e);
  return /* @__PURE__ */ n.jsxs(d.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => s.setAll(e, t), children: [
    t ? /* @__PURE__ */ n.jsx(ds, {}) : /* @__PURE__ */ n.jsx(qe, {}),
    " ",
    t ? u("Collapse all") : u("Expand all")
  ] });
}
function Js({ field: e, value: s, onChange: t, errors: c, id: r, content: a = !1 }) {
  const l = e.fields ?? [], p = s.map(q), i = Be(p.length), x = (v, g) => t(p.map((N, S) => S === v ? g : N)), f = (v) => {
    i.remove(v), t(p.filter((g, N) => N !== v));
  }, b = e.label ? e.label.toLowerCase().replace(/s$/, "") : u("row"), m = b.charAt(0).toUpperCase() + b.slice(1), h = p.map((v, g) => ({ row: v, index: g, key: i.keys[g] ?? String(g) })), y = Ve();
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ n.jsx(
      d.SortableList,
      {
        items: h,
        getId: (v) => v.key,
        getLabel: (v) => `${b} ${v.index + 1}`,
        onReorder: (v, g, N) => {
          i.move(g, N), t(v.map((S) => S.row));
        },
        children: ({ row: v, index: g, key: N }, { handle: S }) => _e(e, a) ? /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
          /* @__PURE__ */ n.jsx(d.SortableHandle, { ...S, label: u("Move :item :number", { item: b, number: g + 1 }), className: "cms:mt-1" }),
          l.map((w) => /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
            /* @__PURE__ */ n.jsx(
              d.Input,
              {
                "aria-label": w.label || w.handle,
                placeholder: w.label || w.handle,
                value: typeof v[w.handle] == "string" ? v[w.handle] : "",
                onChange: (E) => x(g, { ...v, [w.handle]: E.target.value })
              }
            ),
            /* @__PURE__ */ n.jsx(V, { message: c[`${g}.${w.handle}`] })
          ] }, w.handle)),
          /* @__PURE__ */ n.jsx(d.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": u("Remove :item :number", { item: b, number: g + 1 }), onClick: () => f(g), children: /* @__PURE__ */ n.jsx(Te, {}) })
        ] }) : (() => {
          const w = le(c, String(g)), E = y.isCollapsed(N, Object.keys(w).length > 0);
          return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ n.jsx(
              Ke,
              {
                label: `${m} ${g + 1}`,
                summary: Ae(l, v),
                handle: S,
                onRemove: () => f(g),
                collapsed: E,
                onToggle: () => y.toggle(N),
                controls: `${r}-${g}-fields`,
                hidden: a ? v._hidden === !0 : void 0,
                onHidden: (I) => x(g, { ...v, _hidden: I })
              }
            ),
            /* @__PURE__ */ n.jsx("div", { id: `${r}-${g}-fields`, hidden: E, children: !E && /* @__PURE__ */ n.jsx(oe, { fields: l, value: v, onChange: (I) => x(g, I), errors: w, id: `${r}-${g}`, content: a }) })
          ] });
        })()
      }
    ),
    /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ n.jsxs(d.Button, { type: "button", variant: "outline", size: "sm", onClick: () => t([...p, a ? cs() : {}]), children: [
        /* @__PURE__ */ n.jsx(Ce, {}),
        " ",
        u("Add :item", { item: b })
      ] }),
      !_e(e, a) && /* @__PURE__ */ n.jsx(Ue, { keys: h.map((v) => v.key), folding: y })
    ] })
  ] });
}
function Qs({ field: e, value: s, onChange: t, errors: c, id: r }) {
  const a = e.blocks ?? [], l = s.map(q), p = Be(l.length), i = (m, h) => t(l.map((y, v) => v === m ? h : y)), x = (m) => {
    p.remove(m), t(l.filter((h, y) => y !== m));
  }, f = l.map((m, h) => ({ block: m, index: h, key: p.keys[h] ?? String(h) })), b = Ve();
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    /* @__PURE__ */ n.jsx(
      d.SortableList,
      {
        items: f,
        getId: (m) => m.key,
        className: "cms:gap-3",
        getLabel: (m) => u(":type block", { type: a.find((h) => h.type === m.block.type)?.label ?? String(m.block.type) }),
        onReorder: (m, h, y) => {
          p.move(h, y), t(m.map((v) => v.block));
        },
        children: ({ block: m, index: h, key: y }, { handle: v }) => {
          const g = a.find((w) => w.type === m.type), N = le(c, `${h}.values`), S = b.isCollapsed(y, Object.keys(N).length > 0 || c[`${h}.type`] !== void 0);
          return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ n.jsx(
              Ke,
              {
                label: g?.label ?? String(m.type),
                summary: g ? Ae(g.fields, q(m.values)) : null,
                badge: !0,
                handle: v,
                onRemove: () => x(h),
                collapsed: S,
                onToggle: () => b.toggle(y),
                controls: `${r}-${h}-fields`,
                hidden: m.hidden === !0,
                onHidden: (w) => i(h, { ...m, hidden: w })
              }
            ),
            /* @__PURE__ */ n.jsx("div", { id: `${r}-${h}-fields`, hidden: S, children: S ? null : g ? /* @__PURE__ */ n.jsx(
              oe,
              {
                fields: g.fields,
                value: q(m.values),
                onChange: (w) => i(h, { ...m, values: w }),
                errors: N,
                id: `${r}-${h}`,
                content: !0
              }
            ) : /* @__PURE__ */ n.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: u("This kind of block no longer exists. Its values are kept.") }) }),
            /* @__PURE__ */ n.jsx(V, { message: c[`${h}.type`] })
          ] });
        }
      }
    ),
    /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ n.jsxs(d.DropdownMenu, { children: [
        /* @__PURE__ */ n.jsx(d.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ n.jsxs(d.Button, { type: "button", variant: "outline", size: "sm", disabled: a.length === 0, children: [
          /* @__PURE__ */ n.jsx(Ce, {}),
          " ",
          u("Add block")
        ] }) }),
        /* @__PURE__ */ n.jsx(d.DropdownMenuContent, { align: "start", children: a.map((m) => /* @__PURE__ */ n.jsx(d.DropdownMenuItem, { onSelect: () => t([...l, rs(m.type)]), children: m.label }, m.type)) })
      ] }),
      /* @__PURE__ */ n.jsx(Ue, { keys: f.map((m) => m.key), folding: b })
    ] })
  ] });
}
function Ke({ label: e, summary: s, badge: t = !1, handle: c, onRemove: r, collapsed: a, onToggle: l, controls: p, hidden: i, onHidden: x }) {
  const f = a ? ms : us, b = s ? `${e}: ${s}` : e;
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ n.jsx(d.SortableHandle, { ...c, label: u("Move :title", { title: b }) }),
    /* @__PURE__ */ n.jsxs(
      "button",
      {
        type: "button",
        onClick: l,
        "aria-expanded": !a,
        "aria-controls": p,
        className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:rounded-md cms:text-left cms:outline-none cms:focus-visible:ring-2 cms:focus-visible:ring-ring",
        children: [
          /* @__PURE__ */ n.jsx(f, { className: "cms:size-4 cms:shrink-0 cms:text-muted-foreground", "aria-hidden": !0 }),
          t ? /* @__PURE__ */ n.jsx(d.Badge, { variant: "secondary", children: e }) : /* @__PURE__ */ n.jsx("span", { className: "cms:shrink-0 cms:text-sm cms:font-medium", children: e }),
          s && /* @__PURE__ */ n.jsx("span", { className: "cms:truncate cms:text-sm cms:text-muted-foreground", children: s }),
          /* @__PURE__ */ n.jsx("span", { className: "cms:sr-only", children: a ? u("(collapsed)") : "" })
        ]
      }
    ),
    i !== void 0 && /* @__PURE__ */ n.jsxs("label", { className: "cms:flex cms:shrink-0 cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", title: u("Off: kept here, but left out of the page"), children: [
      /* @__PURE__ */ n.jsx(d.Switch, { checked: !i, onCheckedChange: (m) => x(!m), "aria-label": u(":title: visible on site", { title: b }) }),
      u("Visible on site")
    ] }),
    /* @__PURE__ */ n.jsx(
      d.Button,
      {
        type: "button",
        variant: "ghost",
        size: "icon",
        className: "cms:size-8 cms:shrink-0 cms:text-destructive",
        "aria-label": u("Remove :title", { title: b }),
        onClick: r,
        children: /* @__PURE__ */ n.jsx(Te, {})
      }
    )
  ] });
}
export {
  oe as A,
  pt as B,
  us as C,
  Rs as D,
  Ne as E,
  $e as F,
  Bs as G,
  qe as H,
  bs as I,
  Le as J,
  ye as K,
  Me as L,
  mt as M,
  wt as O,
  As as T,
  gt as a,
  le as b,
  Es as c,
  vt as d,
  Is as e,
  Ls as f,
  dt as g,
  ht as h,
  yt as i,
  bt as j,
  Ps as k,
  xt as l,
  Hs as m,
  ut as n,
  Fs as o,
  Nt as p,
  $t as q,
  ft as r,
  jt as s,
  kt as t,
  Ds as u,
  Ts as v,
  _t as w,
  Os as x,
  qs as y,
  Ss as z
};
