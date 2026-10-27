import { j as n, t as d, r as es, a as ss } from "./admin-CtU9_6Av.js";
import { c as B, _ as w } from "./createLucideIcon-Ccbp7F45.js";
import { u as f } from "./ui-Dh5wfMwT.js";
import { t as ts, a as q, E as Se, o as ns, d as xe, b as rs, g as cs, i as Ae, n as as, c as ls, s as os, e as is, l as ms } from "./EntriesPicker-7y9EAZLO.js";
import { F as V } from "./FieldError-Bao8rVy4.js";
import { C as us } from "./check-OeKFYRnl.js";
import { X as ds } from "./EntryStatus-C5_moFaA.js";
import { S as fs } from "./search-3zKi7F1_.js";
import { P as Ce } from "./plus-COqahUZ2.js";
import { T as Te } from "./Confirm-Wmgv4eCv.js";
import { C as ps } from "./chevron-right-9qVV6b-Q.js";
const Ee = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
Ee.node;
const hs = B(Ee);
const De = {
  name: "chevrons-down-up",
  size: 24,
  node: [
    ["path", { d: "m7 20 5-5 5 5", key: "13a0gw" }],
    ["path", { d: "m7 4 5 5 5-5", key: "1kwcof" }]
  ]
};
De.node;
const xs = B(De);
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
const Me = {
  name: "info",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M12 16v-4", key: "1dtifu" }],
    ["path", { d: "M12 8h.01", key: "e9boi3" }]
  ]
};
Me.node;
const gs = B(Me), bs = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
function I(e) {
  return e.replace(/[&<>"']/g, (s) => bs[s] ?? s);
}
function ys(e) {
  return /[\u0000- \u007f]/.test(e) ? !1 : /^(https?:\/\/[^/]|mailto:|tel:|\/(?![/\\])|#)/i.test(e);
}
const ge = new RegExp("`([^`\\n]+)`|\\[([^\\]\\n]+)\\]\\(((?:[^()\\s]|\\([^()\\s]*\\))+)\\)|\\*\\*(?=\\S)(.+?)(?<=\\S)\\*\\*|\\*(?=[^\\s*])([^*\\n]+?)(?<=\\S)\\*");
function R(e, s = !1) {
  let t = "", c = e;
  for (let r = ge.exec(c); r !== null; r = ge.exec(c)) {
    t += I(c.slice(0, r.index));
    const [a, l, h, m, j, g] = r;
    l !== void 0 ? t += `<code>${I(l)}</code>` : h !== void 0 && m !== void 0 ? t += s || !ys(m) ? R(h, s) : `<a href="${I(m)}" target="_blank" rel="noopener noreferrer">${R(h, !0)}</a>` : j !== void 0 ? t += `<strong>${R(j, s)}</strong>` : g !== void 0 ? t += `<em>${R(g, s)}</em>` : t += I(a), c = c.slice(r.index + a.length);
  }
  return t + I(c);
}
const vs = ["text", "number"], js = ["group", "repeater", "flexible"], ws = ["placeholder", "prefix", "suffix"];
function L(e) {
  return typeof e == "string" && e.trim() !== "" ? e.trim() : null;
}
function ze(e) {
  return { hint: L(e.hint), tooltip: L(e.hint_tooltip) };
}
function He(e) {
  return vs.includes(e.type) ? { prefix: L(e.config?.prefix), suffix: L(e.config?.suffix) } : { prefix: null, suffix: null };
}
function be({ field: e, id: s, label: t, maxWidth: c = "cms:max-w-[60%]" }) {
  const { hint: r, tooltip: a } = ze(e);
  return r === null && a === null ? null : /* @__PURE__ */ n.jsxs("span", { className: `cms:ml-auto cms:flex ${c} cms:min-w-0 cms:shrink-0 cms:items-center cms:gap-1 cms:text-xs cms:leading-none cms:text-muted-foreground`, children: [
    r !== null && /* @__PURE__ */ n.jsx("span", { id: `${s}-hint`, className: "cms:min-w-0 cms:truncate cms:py-0.5", title: r, children: r }),
    a !== null && /* @__PURE__ */ n.jsxs(f.Tooltip, { children: [
      /* @__PURE__ */ n.jsx(f.TooltipTrigger, { asChild: !0, children: /* @__PURE__ */ n.jsx(
        "button",
        {
          type: "button",
          "aria-label": d("More about :field", { field: t }),
          className: "cms:-m-1 cms:inline-flex cms:shrink-0 cms:rounded-full cms:p-1 cms:text-muted-foreground cms:outline-none cms:hover:text-foreground cms:focus-visible:ring-2 cms:focus-visible:ring-ring",
          children: /* @__PURE__ */ n.jsx(gs, { className: "cms:size-3.5", "aria-hidden": !0 })
        }
      ) }),
      /* @__PURE__ */ n.jsx(f.TooltipContent, { className: "cms:max-w-xs cms:text-left cms:whitespace-pre-line", children: a })
    ] })
  ] });
}
function ks({ text: e, id: s, className: t = "" }) {
  return !e || e.trim() === "" ? null : /* @__PURE__ */ n.jsx(
    "p",
    {
      id: s,
      className: `cms:text-sm cms:text-muted-foreground cms:[overflow-wrap:anywhere] cms:[&_a]:font-medium cms:[&_a]:text-foreground cms:[&_a]:underline cms:[&_a]:underline-offset-2 cms:[&_a:hover]:text-primary cms:[&_code]:rounded cms:[&_code]:bg-muted cms:[&_code]:px-1 cms:[&_code]:font-mono cms:[&_code]:text-[0.8125rem] cms:[&_strong]:font-semibold cms:[&_strong]:text-foreground ${t}`.trim(),
      dangerouslySetInnerHTML: { __html: R(e) }
    }
  );
}
function ye({ prefix: e, suffix: s, id: t, className: c = "", children: r }) {
  if (e === null && s === null) return /* @__PURE__ */ n.jsx(n.Fragment, { children: r });
  const a = "cms:flex cms:shrink-0 cms:items-center cms:bg-muted/60 cms:px-3 cms:text-sm cms:whitespace-nowrap cms:text-muted-foreground cms:select-none";
  return /* @__PURE__ */ n.jsxs("div", { "data-slot": "input-group", className: `cms:flex cms:h-10 cms:w-full cms:min-w-0 cms:items-stretch cms:overflow-hidden cms:rounded-md cms:border cms:border-input/80 cms:bg-card cms:shadow-xs cms:transition-[border-color,box-shadow] cms:duration-150 cms:hover:border-ring/45 cms:focus-within:border-ring/70 cms:focus-within:ring-4 cms:focus-within:ring-ring-glow cms:has-[[aria-invalid=true]]:border-destructive cms:has-[[aria-invalid=true]]:ring-destructive/20 cms:has-disabled:cursor-not-allowed cms:has-disabled:opacity-50 cms:has-[[readonly]]:bg-muted/30 cms:dark:bg-input/20 ${c}`.trim(), children: [
    e !== null && /* @__PURE__ */ n.jsx("span", { id: `${t}-prefix`, className: `${a} cms:border-r cms:border-input/80`, children: e }),
    r,
    s !== null && /* @__PURE__ */ n.jsx("span", { id: `${t}-suffix`, className: `${a} cms:border-l cms:border-input/80`, children: s })
  ] });
}
const ve = "cms:h-full cms:min-w-0 cms:flex-1 cms:rounded-none cms:border-0 cms:bg-transparent cms:shadow-none cms:hover:border-0 cms:focus-visible:ring-0 cms:aria-invalid:ring-0 cms:disabled:opacity-100 cms:dark:bg-transparent";
function Ns(e) {
  return e === null ? [] : Array.isArray(e) ? e : [e];
}
function Ie(e, s, t) {
  return s && t !== null && e.length >= t;
}
function $s(e, s, t, c) {
  return t ? e.includes(s) ? e.filter((r) => r !== s) : Ie(e, t, c) ? e.slice() : [...e, s] : [s];
}
function _s(e) {
  return e.slice(0, -1);
}
function Ss(e, s) {
  return s ? e.slice() : e[0] ?? null;
}
function As(e, s, t, c = () => !1) {
  const r = s === "ArrowDown" || s === "Home" ? 1 : s === "ArrowUp" || s === "End" ? -1 : 0;
  if (r === 0 || t === 0) return e;
  let a = s === "Home" ? 0 : s === "End" ? t - 1 : e + r;
  for (s === "ArrowUp" && e === -1 && (a = t - 1); a >= 0 && a < t && c(a); ) a += r;
  return a >= 0 && a < t ? a : e;
}
function Cs(e, s) {
  const t = new Set(e.map((c) => c.id));
  return [...e, ...s.filter((c) => !t.has(c.id))];
}
function Ts(e) {
  const s = [], t = {};
  for (const c of e)
    s.length = Math.min(s.length, c.depth), t[c.id] = s.slice(), s.push(c.label);
  return t;
}
function je(e, s) {
  return [...s ?? [], e].join(" › ");
}
const Es = w.createContext({});
function Ds(e) {
  const s = e.termParents;
  return s && typeof s == "object" && !Array.isArray(s) ? s : {};
}
async function ne(e, s) {
  const t = await fetch(`${ss("cms/terms/picker")}?${ts(e)}`, { headers: { Accept: "application/json" }, credentials: "same-origin", signal: s });
  if (!t.ok) throw new Error(String(t.status));
  return await t.json();
}
function Os({ id: e, taxonomy: s, multiple: t, max: c, required: r, invalid: a, value: l, onChange: h }) {
  const m = w.useContext(Es), j = Ds(es.usePage().props), g = Ns(l), [v, i] = w.useState(!1), [p, x] = w.useState(""), [u, b] = w.useState(null), [N, _] = w.useState(!1), [k, A] = w.useState(!1), [M, Ge] = w.useState(0), [U, We] = w.useState({}), [S, K] = w.useState(-1), [G, Xe] = w.useState(null), W = w.useRef(null), X = w.useRef(null), ie = w.useRef(null), me = w.useRef(null), Y = p.trim(), z = w.useCallback((o, y) => {
    const $ = y ? Ts(o) : {};
    We((O) => {
      const F = { ...O };
      for (const D of o) F[D.id] = { label: D.label, parents: $[D.id] ?? D.parents ?? O[D.id]?.parents };
      return F;
    });
  }, []), C = v && s ? Y : null;
  w.useEffect(() => {
    if (C === null || s === null || me.current === `${s}
${C}`) return;
    const o = new AbortController(), y = window.setTimeout(() => {
      ne({ taxonomy: s, q: C }, o.signal).then(($) => {
        me.current = `${s}
${C}`, b({ ...$, q: C }), z($.items, C === ""), K(C !== "" && $.items.length > 0 ? 0 : -1), A(!1);
      }).catch(($) => {
        $ instanceof DOMException && $.name === "AbortError" || A(!0);
      });
    }, C === "" ? 0 : 250);
    return () => {
      window.clearTimeout(y), o.abort();
    };
  }, [s, C, M, z]);
  const ue = (o) => m[String(o)] ?? U[o]?.label, J = g.filter((o) => ue(o) === void 0).join(",");
  w.useEffect(() => {
    !s || J === "" || ne({ taxonomy: s, ids: J.split(",").map(Number) }).then((o) => z(o.items, !1)).catch(() => {
    });
  }, [s, J, z]);
  const Q = () => {
    !s || !u?.more || N || u.q !== Y || (_(!0), ne({ taxonomy: s, q: u.q, offset: u.items.length }).then((o) => {
      const y = Cs(u.items, o.items);
      b({ items: y, more: o.more, q: u.q }), z(y, u.q === "");
    }).catch(() => A(!0)).finally(() => _(!1)));
  };
  if (w.useEffect(() => {
    S >= 0 && u && document.getElementById(`${e}-option-${u.items[S]?.id}`)?.scrollIntoView({ block: "nearest" });
  }, [S, e, u]), !s) return /* @__PURE__ */ n.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: d("Choose a taxonomy for this field in its blueprint.") });
  const de = Ie(g, t, c), Z = t || !r, ee = (o) => h(Ss(o, t)), fe = (o) => {
    ee($s(g, o, t, c)), t || i(!1);
  }, E = u?.items ?? [], se = (o) => de && !g.includes(E[o]?.id ?? -1), te = (o) => ue(o) ?? d("Term #:id", { id: o }), Ye = (o) => {
    if (o && W.current && X.current) {
      const y = W.current.getBoundingClientRect(), $ = X.current.getBoundingClientRect();
      Xe({ width: y.width, alignOffset: y.left - $.left, sideOffset: 4 + y.bottom - $.bottom });
    }
    o || x(""), i(o);
  }, Je = (o) => {
    if (o.key === "ArrowDown" || o.key === "ArrowUp") {
      o.preventDefault();
      const y = As(S, o.key, E.length, se);
      o.key === "ArrowDown" && y === S && S === E.length - 1 && Q(), K(y);
    } else if (o.key === "Enter") {
      o.preventDefault();
      const y = E[S];
      y && !se(S) && fe(y.id);
    } else o.key === "Backspace" && p === "" && Z && g.length > 0 && (o.preventDefault(), ee(_s(g)));
  }, Qe = (o) => {
    const y = o.currentTarget;
    y.scrollTop + y.clientHeight >= y.scrollHeight - 48 && Q();
  }, Ze = t ? d("Choose terms…") : d("Choose a term…"), pe = `${e}-listbox`, he = u !== null && u.q !== Y;
  let H;
  return k ? H = /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:items-start cms:gap-2 cms:p-3 cms:text-sm", children: [
    /* @__PURE__ */ n.jsx("p", { className: "cms:text-destructive", children: d("Terms could not be loaded.") }),
    /* @__PURE__ */ n.jsx(f.Button, { type: "button", variant: "outline", size: "sm", onClick: () => {
      A(!1), Ge((o) => o + 1);
    }, children: d("Try again") })
  ] }) : u === null ? H = /* @__PURE__ */ n.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:p-2", "aria-busy": "true", "aria-label": d("Loading terms"), children: [70, 55, 80, 45, 65].map((o) => /* @__PURE__ */ n.jsx(f.Skeleton, { className: "cms:h-5", style: { width: `${o}%` } }, o)) }) : E.length === 0 ? H = /* @__PURE__ */ n.jsx("p", { className: "cms:p-3 cms:text-sm cms:text-muted-foreground", children: u.q ? d("No terms match “:search”.", { search: u.q }) : d("Nothing to choose from yet.") }) : H = /* @__PURE__ */ n.jsxs("div", { className: `cms:max-h-72 cms:overflow-y-auto cms:overscroll-contain cms:p-1 ${he ? "cms:opacity-60" : ""}`, onScroll: Qe, children: [
    /* @__PURE__ */ n.jsx("div", { role: "listbox", id: pe, "aria-label": d("Terms"), "aria-multiselectable": t || void 0, "aria-busy": he || void 0, children: E.map((o, y) => {
      const $ = g.includes(o.id), O = se(y), F = je(o.label, U[o.id]?.parents);
      return /* @__PURE__ */ n.jsxs(
        "div",
        {
          id: `${e}-option-${o.id}`,
          role: "option",
          "aria-selected": $,
          "aria-disabled": O || void 0,
          title: F,
          className: `cms:flex cms:cursor-default cms:items-center cms:gap-2 cms:rounded-sm cms:py-1.5 cms:pr-2 cms:text-sm cms:select-none ${y === S ? "cms:bg-accent cms:text-accent-foreground" : ""} ${O ? "cms:opacity-50" : ""}`,
          style: { paddingLeft: `${0.5 + Math.min(o.depth, 6) * 0.875}rem` },
          onMouseDown: (D) => D.preventDefault(),
          onMouseMove: () => {
            y !== S && K(y);
          },
          onClick: () => {
            O || fe(o.id);
          },
          children: [
            /* @__PURE__ */ n.jsx(us, { className: `cms:size-4 cms:shrink-0 ${$ ? "" : "cms:invisible"}`, "aria-hidden": "true" }),
            /* @__PURE__ */ n.jsx("span", { className: "cms:min-w-0 cms:truncate", children: o.label })
          ]
        },
        o.id
      );
    }) }),
    u.more && /* @__PURE__ */ n.jsx(f.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:mt-1 cms:w-full", disabled: N, onMouseDown: (o) => o.preventDefault(), onClick: Q, children: N ? d("Loading…") : d("Load more") })
  ] }), /* @__PURE__ */ n.jsxs(f.Popover, { open: v, onOpenChange: Ye, children: [
    /* @__PURE__ */ n.jsxs(
      "div",
      {
        ref: W,
        "data-invalid": a || void 0,
        className: "cms:flex cms:w-full cms:max-w-xl cms:min-w-0 cms:[contain:inline-size] cms:flex-wrap cms:items-center cms:gap-1 cms:rounded-md cms:border cms:border-input/80 cms:bg-card cms:p-1 cms:shadow-xs cms:data-invalid:border-destructive cms:dark:bg-input/20",
        children: [
          g.map((o) => /* @__PURE__ */ n.jsxs(
            "span",
            {
              title: je(te(o), U[o]?.parents ?? j[String(o)]),
              className: "cms:inline-flex cms:h-7 cms:max-w-full cms:min-w-0 cms:items-center cms:gap-0.5 cms:rounded-sm cms:bg-secondary cms:pl-2 cms:text-xs cms:font-medium cms:text-secondary-foreground",
              children: [
                /* @__PURE__ */ n.jsx("span", { className: `cms:min-w-0 cms:truncate ${Z ? "" : "cms:pr-2"}`, children: te(o) }),
                Z && /* @__PURE__ */ n.jsx(
                  "button",
                  {
                    type: "button",
                    className: "cms:inline-flex cms:size-7 cms:shrink-0 cms:items-center cms:justify-center cms:rounded-sm cms:text-muted-foreground cms:hover:bg-muted cms:hover:text-foreground cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none",
                    "aria-label": d("Remove :term", { term: te(o) }),
                    onClick: () => ee(g.filter((y) => y !== o)),
                    children: /* @__PURE__ */ n.jsx(ds, { className: "cms:size-3", "aria-hidden": "true" })
                  }
                )
              ]
            },
            o
          )),
          /* @__PURE__ */ n.jsx(f.PopoverTrigger, { asChild: !0, children: /* @__PURE__ */ n.jsxs(
            "button",
            {
              ref: X,
              id: e,
              type: "button",
              "aria-haspopup": "listbox",
              "aria-invalid": a || void 0,
              className: "cms:flex cms:h-7 cms:min-w-24 cms:flex-1 cms:items-center cms:justify-between cms:gap-1 cms:rounded-sm cms:px-2 cms:text-left cms:text-sm cms:text-muted-foreground cms:hover:bg-muted cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none cms:disabled:pointer-events-none cms:disabled:opacity-50",
              children: [
                /* @__PURE__ */ n.jsx("span", { className: "cms:truncate", children: g.length === 0 ? Ze : t ? d("Add…") : d("Change…") }),
                /* @__PURE__ */ n.jsx(qe, { className: "cms:size-4 cms:shrink-0 cms:opacity-60", "aria-hidden": "true" })
              ]
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ n.jsxs(
      f.PopoverContent,
      {
        align: "start",
        alignOffset: G?.alignOffset,
        sideOffset: G?.sideOffset,
        className: "cms:max-w-[calc(100vw-2rem)] cms:min-w-60 cms:p-0",
        style: { width: G?.width },
        onOpenAutoFocus: (o) => {
          o.preventDefault(), ie.current?.focus();
        },
        children: [
          /* @__PURE__ */ n.jsxs("div", { className: "cms:relative cms:border-b cms:border-border/60", children: [
            /* @__PURE__ */ n.jsx(fs, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground", "aria-hidden": "true" }),
            /* @__PURE__ */ n.jsx(
              "input",
              {
                ref: ie,
                type: "text",
                role: "combobox",
                "aria-expanded": "true",
                "aria-controls": pe,
                "aria-autocomplete": "list",
                "aria-label": d("Search terms"),
                "aria-activedescendant": S >= 0 && E[S] ? `${e}-option-${E[S].id}` : void 0,
                className: "cms:h-10 cms:w-full cms:bg-transparent cms:pr-3 cms:pl-9 cms:text-sm cms:outline-none cms:placeholder:text-muted-foreground",
                placeholder: d("Search terms"),
                autoComplete: "off",
                value: p,
                onKeyDown: Je,
                onChange: (o) => x(o.target.value)
              }
            )
          ] }),
          H,
          de && c !== null && /* @__PURE__ */ n.jsx("p", { className: "cms:border-t cms:border-border/60 cms:px-3 cms:py-2 cms:text-xs cms:text-muted-foreground", children: d("Up to :max terms.", { max: c }) })
        ]
      }
    )
  ] });
}
const Pe = (e, s = {}) => e.replace(/:([A-Za-z_]+)/g, (t, c) => s[c] ?? t), gt = 5;
let qs = 0;
const ae = () => `f${++qs}`;
function Ms(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function zs(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^[0-9_]+/, "").replace(/_{2,}/g, "_").slice(0, 64);
}
function Re(e, s) {
  const t = new Set(s.map((a) => a.handle)), c = Ms(e) || "field";
  let r = c;
  for (let a = 2; t.has(r); a++)
    r = `${c}_${a}`;
  return r;
}
function Hs(e) {
  return (e ?? []).map(({ fields: s, ...t }) => ({
    ...t,
    key: ae(),
    fields: Hs(s),
    handleTouched: !0,
    savedHandle: t.handle
  }));
}
function Is(e, s) {
  return e.map(({ key: t, handleTouched: c, savedHandle: r, fields: a, ...l }) => ({
    ...l,
    validation: (l.validation ?? []).map((h) => h.trim()).filter((h) => h !== ""),
    ...s(l.type) ? { fields: Is(a, s) } : {}
  }));
}
function bt(e, s, t) {
  return { key: ae(), type: e, label: s, handle: Re(s, t), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function yt(e) {
  return e.type !== "fieldset" && e.savedHandle !== void 0 && e.savedHandle !== "" && e.handle !== e.savedHandle ? e.savedHandle : null;
}
function Ps(e) {
  return e.map((s) => ({ ...s, savedHandle: s.handle, fields: Ps(s.fields) }));
}
function vt(e, s, t) {
  if (e.handleTouched) return { ...e, label: s };
  const c = t.filter((r) => r.key !== e.key);
  return { ...e, label: s, handle: Re(s || e.type, c) };
}
function Rs(e, s) {
  const t = `${s}.`, c = {};
  for (const [r, a] of Object.entries(e))
    r.startsWith(t) && (c[r.slice(t.length)] = a);
  return c;
}
function le(e, s) {
  const t = e[s];
  return { ...Rs(e, s), ...t !== void 0 ? { "": t } : {} };
}
function jt(e, s) {
  return Object.keys(e).filter((t) => t === s || t.startsWith(`${s}.`));
}
function wt(e, s) {
  return Object.keys(e).some((t) => t === s || t.startsWith(`${s}.`));
}
function kt(e, s) {
  return s.filter((t) => t.key !== e.key && t.handle !== "" && t.type !== "fieldset");
}
function Nt(e, s, t, c = Pe) {
  return e.type === "fieldset" ? null : t?.includes(e.handle) ? c('":handle" is used by the content itself; choose another handle.', { handle: e.handle }) : e.handle !== "" && s.some((r) => r.key !== e.key && r.type !== "fieldset" && r.handle === e.handle) ? c('There is already a field ":handle" here.', { handle: e.handle }) : null;
}
function $t(e, s) {
  return typeof e.translatable == "boolean" ? e.translatable : s;
}
function _t(e, s, t) {
  return { ...e, translatable: s === t ? null : s };
}
function Fs(e, s, t = []) {
  const c = /* @__PURE__ */ new Set([...s.map((l) => l.handle), ...t]), r = `${(zs(e) || "field").slice(0, 56)}_copy`;
  let a = r;
  for (let l = 2; c.has(a); l++)
    a = `${r}_${l}`;
  return a;
}
function Fe(e) {
  const { key: s, savedHandle: t, fields: c, ...r } = e;
  return { ...structuredClone(r), key: ae(), fields: c.map(Fe) };
}
function St(e, s, t = [], c = Pe) {
  const r = e[s];
  if (r === void 0) return null;
  const a = r.label || r.handle, l = {
    ...Fe(r),
    label: c(":label (copy)", { label: a }),
    handle: r.type === "fieldset" ? r.handle : Fs(r.handle, e, t),
    handleTouched: !0
  };
  return { fields: [...e.slice(0, s + 1), l, ...e.slice(s + 1)], copy: l };
}
function Ls(e, s) {
  const t = e.condition;
  return !t || "rules" in t ? null : (t.operator === "filled" || t.operator === "equals" && (t.value === !0 || t.value === "true")) && s.some((r) => r.handle === t.field && r.type === "toggle") ? t.field : null;
}
function At(e) {
  const s = (l) => l.type === "number" || l.type === "text" && (l.instructions ?? "").length <= 60, t = (l) => l.type === "text" && ws.includes(l.handle), c = {}, r = [];
  for (const l of e) {
    const h = Ls(l, e);
    h === null ? r.push(l) : (c[h] ??= []).push(l);
  }
  const a = r.filter((l) => !t(l));
  return { options: a.filter((l) => !s(l)), limits: a.filter(s), appearance: r.filter(t), dependents: c };
}
const Bs = ["html", "css", "javascript", "json", "plain"];
function Vs(e) {
  const s = e.config?.language;
  return typeof s == "string" && Bs.includes(s) ? s : "plain";
}
const Ct = [
  { value: "equals", label: "is", needsValue: !0 },
  { value: "not_equals", label: "is not", needsValue: !0 },
  { value: "filled", label: "is filled in", needsValue: !1 },
  { value: "empty", label: "is empty", needsValue: !1 }
];
function we(e) {
  return e === !0 ? "true" : e === !1 ? "false" : typeof e == "string" || typeof e == "number" ? String(e) : "";
}
function Us(e) {
  return e ? "rules" in e ? Array.isArray(e.rules) ? e.rules : [] : [e] : [];
}
function Ks(e) {
  return e && "rules" in e && e.match === "any" ? "any" : "all";
}
function Tt(e, s) {
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
function Gs(e, s) {
  const t = Us(e.condition);
  return t.length === 0 ? !0 : Ks(e.condition) === "any" ? t.some((c) => ke(c, s)) : t.every((c) => ke(c, s));
}
function Et(e) {
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
function Dt(e) {
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
const Ws = [25, 33, 50, 66, 75, 100];
function Xs(e) {
  return Ws.find((s) => s === e.width) ?? 100;
}
function Ys(e = "cms:gap-x-4 cms:gap-y-6") {
  return `cms:@container cms:grid cms:grid-cols-12 cms:items-start ${e}`;
}
const Js = {
  25: "cms:@lg:col-span-3",
  33: "cms:@lg:col-span-4",
  50: "cms:@lg:col-span-6",
  66: "cms:@lg:col-span-8",
  75: "cms:@lg:col-span-9",
  100: ""
};
function Ne(e) {
  return `cms:col-span-12 cms:min-w-0 ${Js[Xs(e)]}`.trim();
}
function Ot(e, s) {
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
const Qs = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function Le(e) {
  if (e.label) return e.label;
  const s = e.handle.replace(/_/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function $e({ field: e, value: s, onChange: t, errors: c, id: r, content: a = !1, fill: l = !1, marker: h = null }) {
  const m = Le(e), j = Qs.includes(e.type) || ["select", "terms"].includes(e.type) && e.config?.multiple === !0, g = c[""] !== void 0, v = js.includes(e.type), i = e.instructions && e.instructions.trim() !== "" ? /* @__PURE__ */ n.jsx(ks, { id: `${r}-help`, text: e.instructions }) : null, { hint: p } = ze(e), { prefix: x, suffix: u } = He(e), b = [p && `${r}-hint`, x && `${r}-prefix`, u && `${r}-suffix`, i && `${r}-help`, g && `${r}-error`].filter(Boolean).join(" ") || void 0;
  return /* @__PURE__ */ n.jsxs(
    "div",
    {
      className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2",
      ...j ? { role: "group", "aria-labelledby": `${r}-label`, ...g ? { "aria-invalid": !0 } : {}, ...g || i ? { "aria-describedby": [i && `${r}-help`, g && `${r}-error`].filter(Boolean).join(" ") } : {} } : {},
      children: [
        e.type === "toggle" ? /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
          /* @__PURE__ */ n.jsx(f.Switch, { id: r, checked: s === !0, "aria-describedby": b, onCheckedChange: (N) => t(N) }),
          /* @__PURE__ */ n.jsx(f.Label, { htmlFor: r, className: "cms:min-w-0", children: m }),
          h,
          /* @__PURE__ */ n.jsx(be, { field: e, id: r, label: m })
        ] }) : /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:min-h-4 cms:min-w-0 cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ n.jsxs(f.Label, { id: `${r}-label`, htmlFor: j ? void 0 : r, className: "cms:min-w-0", children: [
            m,
            e.required && /* @__PURE__ */ n.jsx("span", { className: "cms:text-destructive", children: " *" }),
            h
          ] }),
          /* @__PURE__ */ n.jsx(be, { field: e, id: r, label: m })
        ] }),
        v && i,
        /* @__PURE__ */ n.jsx(et, { field: e, value: s, onChange: t, errors: c, id: r, content: a, fill: l, describedBy: b }),
        ["text", "textarea", "code"].includes(e.type) && T(e, "max") !== void 0 && /* @__PURE__ */ n.jsx(Zs, { length: typeof s == "string" ? [...s].length : 0, max: T(e, "max") ?? 0 }),
        !v && i,
        /* @__PURE__ */ n.jsx(V, { message: c[""], id: `${r}-error` })
      ]
    }
  );
}
function Zs({ length: e, max: s }) {
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
function et({ field: e, value: s, onChange: t, errors: c, id: r, content: a, fill: l = !1, describedBy: h }) {
  const m = c[""] !== void 0, { prefix: j, suffix: g } = He(e), v = j !== null || g !== null;
  switch (e.type) {
    case "toggle":
      return null;
    case "file":
      return /* @__PURE__ */ n.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: d("Visitors attach a file here when they send a form.") });
    case "textarea":
      return /* @__PURE__ */ n.jsx(
        f.Textarea,
        {
          id: r,
          "aria-invalid": m,
          "aria-describedby": h,
          value: typeof s == "string" ? s : "",
          rows: T(e, "rows") ?? 4,
          placeholder: P(e, "placeholder"),
          onChange: (i) => t(i.target.value)
        }
      );
    case "code":
      return /* @__PURE__ */ n.jsx(
        f.CodeEditor,
        {
          id: r,
          "aria-labelledby": `${r}-label`,
          "aria-describedby": h,
          invalid: m,
          language: Vs(e),
          value: typeof s == "string" ? s : "",
          placeholder: P(e, "placeholder"),
          onChange: (i) => t(i)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ n.jsx(f.RichTextEditor, { id: r, labelledBy: `${r}-label`, invalid: m, value: typeof s == "string" ? s : "", onChange: t });
    case "number": {
      const i = cs(s);
      return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ n.jsx(ye, { prefix: j, suffix: g, id: r, className: l ? "" : "cms:max-w-64", children: /* @__PURE__ */ n.jsx(
          f.Input,
          {
            id: r,
            type: "number",
            className: v ? ve : l ? "cms:w-full" : "cms:max-w-48",
            placeholder: P(e, "placeholder"),
            "aria-invalid": m,
            "aria-describedby": [h, i && `${r}-grouped`].filter(Boolean).join(" ") || void 0,
            value: typeof s == "number" ? String(s) : typeof s == "string" ? s : "",
            min: T(e, "min"),
            max: T(e, "max"),
            step: T(e, "step") ?? "any",
            onChange: (p) => t(p.target.value === "" ? null : Number(p.target.value))
          }
        ) }),
        i && /* @__PURE__ */ n.jsx("span", { id: `${r}-grouped`, className: "cms:text-sm cms:tabular-nums cms:text-muted-foreground", children: i })
      ] });
    }
    case "date": {
      const i = e.config?.time === !0;
      return /* @__PURE__ */ n.jsx(
        f.DatePicker,
        {
          id: r,
          withTime: i,
          invalid: m,
          required: e.required === !0,
          value: xe(rs(s, i)),
          onChange: (p) => t(xe(p ?? ""))
        }
      );
    }
    case "select":
      return e.config?.multiple === !0 ? /* @__PURE__ */ n.jsx(
        tt,
        {
          options: ce(e),
          value: Array.isArray(s) ? s.map(String) : [],
          onChange: t,
          invalid: m,
          empty: typeof e.config?.empty == "string" ? e.config.empty : void 0,
          inTickOrder: e.config?.in_tick_order === !0
        }
      ) : /* @__PURE__ */ n.jsx(
        st,
        {
          options: ce(e),
          value: typeof s == "string" ? s : null,
          onChange: t,
          id: r,
          fill: l,
          empty: ns(ce(e), e.required === !0, typeof e.config?.default == "string" && e.config.default !== "", typeof s == "string" && s !== "")
        }
      );
    case "terms": {
      const i = e.config?.multiple === !0, p = Array.isArray(s) ? s.filter((x) => typeof x == "number") : typeof s == "number" ? s : null;
      return /* @__PURE__ */ n.jsx(
        Os,
        {
          id: r,
          taxonomy: typeof e.taxonomy == "string" ? e.taxonomy : null,
          multiple: i,
          max: T(e, "max") ?? null,
          required: e.required === !0,
          invalid: m,
          value: i ? Array.isArray(p) ? p : [] : typeof p == "number" ? p : null,
          onChange: t
        }
      );
    }
    case "entries":
      return /* @__PURE__ */ n.jsx(
        Se,
        {
          id: r,
          invalid: m,
          multiple: e.config?.multiple === !0,
          max: T(e, "max") ?? null,
          collections: e.collections ?? [],
          onChange: t,
          value: typeof s == "number" || Array.isArray(s) && s.every((i) => typeof i == "number") ? s : null
        }
      );
    case "link":
      return /* @__PURE__ */ n.jsx(
        nt,
        {
          label: Le(e),
          value: q(s),
          onChange: t,
          errors: c,
          id: r,
          collections: e.collections ?? [],
          placeholder: P(e, "placeholder"),
          describedBy: h
        }
      );
    case "media":
      return /* @__PURE__ */ n.jsx(
        f.MediaPickerInput,
        {
          id: r,
          invalid: m,
          disabled: !1,
          multiple: e.config?.multiple === !0,
          max: T(e, "max") ?? null,
          types: Array.isArray(e.config?.types) ? e.config.types : [],
          value: typeof s == "number" || Array.isArray(s) && s.every((i) => typeof i == "number") ? s : null,
          onChange: t
        }
      );
    case "group":
      return /* @__PURE__ */ n.jsx(oe, { fields: e.fields ?? [], value: q(s), onChange: t, errors: c, id: r, content: a });
    case "repeater":
      return /* @__PURE__ */ n.jsx(rt, { field: e, value: Array.isArray(s) ? s : [], onChange: t, errors: c, id: r, content: a });
    case "flexible":
      return /* @__PURE__ */ n.jsx(ct, { field: e, value: Array.isArray(s) ? s : [], onChange: t, errors: c, id: r });
    default:
      return /* @__PURE__ */ n.jsx(ye, { prefix: j, suffix: g, id: r, children: /* @__PURE__ */ n.jsx(
        f.Input,
        {
          id: r,
          "aria-invalid": m,
          "aria-describedby": h,
          className: v ? ve : void 0,
          value: typeof s == "string" ? s : "",
          placeholder: P(e, "placeholder"),
          onChange: (i) => t(i.target.value)
        }
      ) });
  }
}
function T(e, s) {
  const t = e.config?.[s];
  return typeof t == "number" ? t : void 0;
}
function P(e, s) {
  const t = e.config?.[s];
  return typeof t == "string" ? t : void 0;
}
function oe({ fields: e, value: s, onChange: t, errors: c, id: r, content: a, bare: l = !1 }) {
  const h = /* @__PURE__ */ n.jsx("div", { className: Ys(l ? void 0 : "cms:gap-4"), children: e.filter((m) => Gs(m, s)).map((m) => m.shared ? (
    // Greyed out; the form says once, at the top, where to edit shared fields.
    /* @__PURE__ */ n.jsx("fieldset", { disabled: !0, className: `cms:flex cms:flex-col cms:gap-1 cms:opacity-60 ${Ne(m)}`, title: d("Shared by all languages: edit it in the main language."), children: /* @__PURE__ */ n.jsx($e, { id: `${r}-${m.handle}`, field: m, value: s[m.handle], content: a, errors: {}, onChange: () => {
    } }) }, m.handle)
  ) : /* @__PURE__ */ n.jsx("div", { className: Ne(m), children: /* @__PURE__ */ n.jsx(
    $e,
    {
      id: `${r}-${m.handle}`,
      field: m,
      value: s[m.handle],
      content: a,
      errors: le(c, m.handle),
      onChange: (j) => t({ ...s, [m.handle]: j })
    }
  ) }, m.handle)) });
  return l ? h : /* @__PURE__ */ n.jsx("div", { className: "cms:rounded-lg cms:border cms:p-4", children: h });
}
function st({ options: e, value: s, onChange: t, id: c, empty: r, fill: a = !1 }) {
  return /* @__PURE__ */ n.jsxs(f.Select, { value: s ?? re, onValueChange: (l) => t(l === re ? null : l), children: [
    /* @__PURE__ */ n.jsx(f.SelectTrigger, { id: c, className: a ? "cms:w-full" : "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ n.jsx(f.SelectValue, {}) }),
    /* @__PURE__ */ n.jsxs(f.SelectContent, { children: [
      r && /* @__PURE__ */ n.jsx(f.SelectItem, { value: re, children: d("None") }),
      e.map((l) => /* @__PURE__ */ n.jsx(f.SelectItem, { value: l.value, children: l.label }, l.value))
    ] })
  ] });
}
function tt({ options: e, value: s, onChange: t, empty: c, inTickOrder: r = !1, invalid: a = !1 }) {
  return e.length === 0 ? /* @__PURE__ */ n.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: c ?? d("Nothing to choose from yet.") }) : /* @__PURE__ */ n.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2", children: e.map((l) => /* @__PURE__ */ n.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
    /* @__PURE__ */ n.jsx(
      f.Checkbox,
      {
        checked: s.includes(l.value),
        "aria-invalid": a || void 0,
        onCheckedChange: (h) => t(h ? r ? [...s.filter((m) => m !== l.value), l.value] : e.map((m) => m.value).filter((m) => m === l.value || s.includes(m)) : s.filter((m) => m !== l.value))
      }
    ),
    l.label,
    r && s.includes(l.value) && /* @__PURE__ */ n.jsxs("span", { className: "cms:text-xs cms:text-muted-foreground", "aria-label": `number ${s.indexOf(l.value) + 1}`, children: [
      "#",
      s.indexOf(l.value) + 1
    ] })
  ] }, l.value)) });
}
function nt({ label: e, value: s, onChange: t, errors: c, id: r, collections: a, placeholder: l, describedBy: h }) {
  const [m, j] = w.useState(s.type === "entry" ? "entry" : "url"), g = s.type === "entry" || s.type === "url" ? s.type : m, v = w.useRef({}), i = (x) => t(ms({ ...s, type: g, ...x })), p = (x) => {
    if (x === g) return;
    const u = is(s, g, x, v.current);
    v.current = u.remembered, j(x), t(u.value);
  };
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ n.jsx("div", { role: "radiogroup", "aria-label": d(":field: link to", { field: e }), className: "cms:inline-flex cms:w-fit cms:rounded-md cms:border cms:p-0.5", children: ["url", "entry"].map((x) => /* @__PURE__ */ n.jsx(
      f.Button,
      {
        type: "button",
        size: "sm",
        role: "radio",
        "aria-checked": g === x,
        variant: g === x ? "secondary" : "ghost",
        onClick: () => p(x),
        children: x === "url" ? d("Address") : d("Entry")
      },
      x
    )) }),
    /* @__PURE__ */ n.jsxs("div", { className: "cms:grid cms:gap-2 cms:md:grid-cols-[2fr_1fr_auto] cms:md:items-start", children: [
      g === "url" ? /* @__PURE__ */ n.jsx(
        f.Input,
        {
          id: r,
          "aria-label": d(":field: address", { field: e }),
          placeholder: l || d("https://… or /about"),
          "aria-describedby": h,
          value: typeof s.url == "string" ? s.url : "",
          onChange: (x) => i({ url: x.target.value }),
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
          onChange: (x) => i({ entry_id: typeof x == "number" ? x : void 0 })
        }
      ),
      /* @__PURE__ */ n.jsx(
        f.Input,
        {
          "aria-label": d(":field: link text", { field: e }),
          placeholder: g === "entry" ? d("Link text (the entry's title)") : d("Link text"),
          value: typeof s.label == "string" ? s.label : "",
          onChange: (x) => i({ label: x.target.value })
        }
      ),
      /* @__PURE__ */ n.jsxs("label", { className: "cms:flex cms:h-9 cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ n.jsx(f.Checkbox, { checked: s.new_tab === !0, onCheckedChange: (x) => i({ new_tab: x }) }),
        d("New tab")
      ] }),
      /* @__PURE__ */ n.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ n.jsx(V, { message: c.url ?? c.entry_id ?? c.label ?? c.type }) })
    ] })
  ] });
}
function _e(e, s) {
  return !s && (e.fields ?? []).every((t) => t.type === "text");
}
function Be(e) {
  const s = w.useRef([]);
  return s.current = os(s.current, e), {
    keys: s.current,
    remove: (t) => {
      s.current = s.current.filter((c, r) => r !== t);
    },
    move: (t, c) => {
      s.current = f.moveItem(s.current, t, c);
    }
  };
}
function Ve() {
  const [e, s] = w.useState(() => /* @__PURE__ */ new Set());
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
  return /* @__PURE__ */ n.jsxs(f.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => s.setAll(e, t), children: [
    t ? /* @__PURE__ */ n.jsx(xs, {}) : /* @__PURE__ */ n.jsx(qe, {}),
    " ",
    t ? d("Collapse all") : d("Expand all")
  ] });
}
function rt({ field: e, value: s, onChange: t, errors: c, id: r, content: a = !1 }) {
  const l = e.fields ?? [], h = s.map(q), m = Be(h.length), j = (u, b) => t(h.map((N, _) => _ === u ? b : N)), g = (u) => {
    m.remove(u), t(h.filter((b, N) => N !== u));
  }, v = e.label ? e.label.toLowerCase().replace(/s$/, "") : d("row"), i = v.charAt(0).toUpperCase() + v.slice(1), p = h.map((u, b) => ({ row: u, index: b, key: m.keys[b] ?? String(b) })), x = Ve();
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ n.jsx(
      f.SortableList,
      {
        items: p,
        getId: (u) => u.key,
        getLabel: (u) => `${v} ${u.index + 1}`,
        onReorder: (u, b, N) => {
          m.move(b, N), t(u.map((_) => _.row));
        },
        children: ({ row: u, index: b, key: N }, { handle: _ }) => _e(e, a) ? /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
          /* @__PURE__ */ n.jsx(f.SortableHandle, { ..._, label: d("Move :item :number", { item: v, number: b + 1 }), className: "cms:mt-1" }),
          l.map((k) => /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
            /* @__PURE__ */ n.jsx(
              f.Input,
              {
                "aria-label": k.label || k.handle,
                placeholder: k.label || k.handle,
                value: typeof u[k.handle] == "string" ? u[k.handle] : "",
                onChange: (A) => j(b, { ...u, [k.handle]: A.target.value })
              }
            ),
            /* @__PURE__ */ n.jsx(V, { message: c[`${b}.${k.handle}`] })
          ] }, k.handle)),
          /* @__PURE__ */ n.jsx(f.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": d("Remove :item :number", { item: v, number: b + 1 }), onClick: () => g(b), children: /* @__PURE__ */ n.jsx(Te, {}) })
        ] }) : (() => {
          const k = le(c, String(b)), A = x.isCollapsed(N, Object.keys(k).length > 0);
          return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ n.jsx(
              Ke,
              {
                label: `${i} ${b + 1}`,
                summary: Ae(l, u),
                handle: _,
                onRemove: () => g(b),
                collapsed: A,
                onToggle: () => x.toggle(N),
                controls: `${r}-${b}-fields`,
                hidden: a ? u._hidden === !0 : void 0,
                onHidden: (M) => j(b, { ...u, _hidden: M })
              }
            ),
            /* @__PURE__ */ n.jsx("div", { id: `${r}-${b}-fields`, hidden: A, children: !A && /* @__PURE__ */ n.jsx(oe, { fields: l, value: u, onChange: (M) => j(b, M), errors: k, id: `${r}-${b}`, content: a }) })
          ] });
        })()
      }
    ),
    /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ n.jsxs(f.Button, { type: "button", variant: "outline", size: "sm", onClick: () => t([...h, a ? ls() : {}]), children: [
        /* @__PURE__ */ n.jsx(Ce, {}),
        " ",
        d("Add :item", { item: v })
      ] }),
      !_e(e, a) && /* @__PURE__ */ n.jsx(Ue, { keys: p.map((u) => u.key), folding: x })
    ] })
  ] });
}
function ct({ field: e, value: s, onChange: t, errors: c, id: r }) {
  const a = e.blocks ?? [], l = s.map(q), h = Be(l.length), m = (i, p) => t(l.map((x, u) => u === i ? p : x)), j = (i) => {
    h.remove(i), t(l.filter((p, x) => x !== i));
  }, g = l.map((i, p) => ({ block: i, index: p, key: h.keys[p] ?? String(p) })), v = Ve();
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    /* @__PURE__ */ n.jsx(
      f.SortableList,
      {
        items: g,
        getId: (i) => i.key,
        className: "cms:gap-3",
        getLabel: (i) => d(":type block", { type: a.find((p) => p.type === i.block.type)?.label ?? String(i.block.type) }),
        onReorder: (i, p, x) => {
          h.move(p, x), t(i.map((u) => u.block));
        },
        children: ({ block: i, index: p, key: x }, { handle: u }) => {
          const b = a.find((k) => k.type === i.type), N = le(c, `${p}.values`), _ = v.isCollapsed(x, Object.keys(N).length > 0 || c[`${p}.type`] !== void 0);
          return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ n.jsx(
              Ke,
              {
                label: b?.label ?? String(i.type),
                summary: b ? Ae(b.fields, q(i.values)) : null,
                badge: !0,
                handle: u,
                onRemove: () => j(p),
                collapsed: _,
                onToggle: () => v.toggle(x),
                controls: `${r}-${p}-fields`,
                hidden: i.hidden === !0,
                onHidden: (k) => m(p, { ...i, hidden: k })
              }
            ),
            /* @__PURE__ */ n.jsx("div", { id: `${r}-${p}-fields`, hidden: _, children: _ ? null : b ? /* @__PURE__ */ n.jsx(
              oe,
              {
                fields: b.fields,
                value: q(i.values),
                onChange: (k) => m(p, { ...i, values: k }),
                errors: N,
                id: `${r}-${p}`,
                content: !0
              }
            ) : /* @__PURE__ */ n.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: d("This kind of block no longer exists. Its values are kept.") }) }),
            /* @__PURE__ */ n.jsx(V, { message: c[`${p}.type`] })
          ] });
        }
      }
    ),
    /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ n.jsxs(f.DropdownMenu, { children: [
        /* @__PURE__ */ n.jsx(f.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ n.jsxs(f.Button, { type: "button", variant: "outline", size: "sm", disabled: a.length === 0, children: [
          /* @__PURE__ */ n.jsx(Ce, {}),
          " ",
          d("Add block")
        ] }) }),
        /* @__PURE__ */ n.jsx(f.DropdownMenuContent, { align: "start", children: a.map((i) => /* @__PURE__ */ n.jsx(f.DropdownMenuItem, { onSelect: () => t([...l, as(i.type)]), children: i.label }, i.type)) })
      ] }),
      /* @__PURE__ */ n.jsx(Ue, { keys: g.map((i) => i.key), folding: v })
    ] })
  ] });
}
function Ke({ label: e, summary: s, badge: t = !1, handle: c, onRemove: r, collapsed: a, onToggle: l, controls: h, hidden: m, onHidden: j }) {
  const g = a ? ps : hs, v = s ? `${e}: ${s}` : e;
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ n.jsx(f.SortableHandle, { ...c, label: d("Move :title", { title: v }) }),
    /* @__PURE__ */ n.jsxs(
      "button",
      {
        type: "button",
        onClick: l,
        "aria-expanded": !a,
        "aria-controls": h,
        className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:rounded-md cms:text-left cms:outline-none cms:focus-visible:ring-2 cms:focus-visible:ring-ring",
        children: [
          /* @__PURE__ */ n.jsx(g, { className: "cms:size-4 cms:shrink-0 cms:text-muted-foreground", "aria-hidden": !0 }),
          t ? /* @__PURE__ */ n.jsx(f.Badge, { variant: "secondary", children: e }) : /* @__PURE__ */ n.jsx("span", { className: "cms:shrink-0 cms:text-sm cms:font-medium", children: e }),
          s && /* @__PURE__ */ n.jsx("span", { className: "cms:truncate cms:text-sm cms:text-muted-foreground", children: s }),
          /* @__PURE__ */ n.jsx("span", { className: "cms:sr-only", children: a ? d("(collapsed)") : "" })
        ]
      }
    ),
    m !== void 0 && /* @__PURE__ */ n.jsxs("label", { className: "cms:flex cms:shrink-0 cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", title: d("Off: kept here, but left out of the page"), children: [
      /* @__PURE__ */ n.jsx(f.Switch, { checked: !m, onCheckedChange: (i) => j(!i), "aria-label": d(":title: visible on site", { title: v }) }),
      d("Visible on site")
    ] }),
    /* @__PURE__ */ n.jsx(
      f.Button,
      {
        type: "button",
        variant: "ghost",
        size: "icon",
        className: "cms:size-8 cms:shrink-0 cms:text-destructive",
        "aria-label": d("Remove :title", { title: v }),
        onClick: r,
        children: /* @__PURE__ */ n.jsx(Te, {})
      }
    )
  ] });
}
export {
  oe as A,
  jt as B,
  hs as C,
  Gs as D,
  Ne as E,
  $e as F,
  Ys as G,
  qe as H,
  ks as I,
  Le as J,
  be as K,
  ze as L,
  gt as M,
  Ct as O,
  Os as T,
  Nt as a,
  le as b,
  zs as c,
  St as d,
  Rs as e,
  Xs as f,
  yt as g,
  wt as h,
  $t as i,
  _t as j,
  Ws as k,
  kt as l,
  Us as m,
  bt as n,
  Ks as o,
  Et as p,
  Dt as q,
  vt as r,
  At as s,
  Tt as t,
  Hs as u,
  Ms as v,
  Ot as w,
  Is as x,
  Ps as y,
  Es as z
};
