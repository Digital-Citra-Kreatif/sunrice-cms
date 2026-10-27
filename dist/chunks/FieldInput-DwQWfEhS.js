import { j as n, t as f, r as es, a as ss } from "./admin-DgMI81wH.js";
import { c as B, _ as j } from "./createLucideIcon-Ccbp7F45.js";
import { u as p } from "./ui-Dh5wfMwT.js";
import { t as ts, a as q, E as Se, o as ns, d as xe, b as rs, g as cs, i as Ae, n as as, c as ls, s as os } from "./EntriesPicker-C4jAazTS.js";
import { F as V } from "./FieldError-1RL8kZK4.js";
import { C as is } from "./check-OeKFYRnl.js";
import { X as ms } from "./EntryStatus-Cse8Y5gG.js";
import { S as us } from "./search-3zKi7F1_.js";
import { P as Ce } from "./plus-COqahUZ2.js";
import { T as Te } from "./Confirm-BjwabtOi.js";
import { C as ds } from "./chevron-right-9qVV6b-Q.js";
const Ee = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
Ee.node;
const fs = B(Ee);
const De = {
  name: "chevrons-down-up",
  size: 24,
  node: [
    ["path", { d: "m7 20 5-5 5 5", key: "13a0gw" }],
    ["path", { d: "m7 4 5 5 5-5", key: "1kwcof" }]
  ]
};
De.node;
const ps = B(De);
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
const hs = B(Me), xs = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
function I(e) {
  return e.replace(/[&<>"']/g, (s) => xs[s] ?? s);
}
function gs(e) {
  return /[\u0000- \u007f]/.test(e) ? !1 : /^(https?:\/\/[^/]|mailto:|tel:|\/(?![/\\])|#)/i.test(e);
}
const ge = new RegExp("`([^`\\n]+)`|\\[([^\\]\\n]+)\\]\\(((?:[^()\\s]|\\([^()\\s]*\\))+)\\)|\\*\\*(?=\\S)(.+?)(?<=\\S)\\*\\*|\\*(?=[^\\s*])([^*\\n]+?)(?<=\\S)\\*");
function F(e, s = !1) {
  let t = "", c = e;
  for (let r = ge.exec(c); r !== null; r = ge.exec(c)) {
    t += I(c.slice(0, r.index));
    const [a, l, h, i, b, u] = r;
    l !== void 0 ? t += `<code>${I(l)}</code>` : h !== void 0 && i !== void 0 ? t += s || !gs(i) ? F(h, s) : `<a href="${I(i)}" target="_blank" rel="noopener noreferrer">${F(h, !0)}</a>` : b !== void 0 ? t += `<strong>${F(b, s)}</strong>` : u !== void 0 ? t += `<em>${F(u, s)}</em>` : t += I(a), c = c.slice(r.index + a.length);
  }
  return t + I(c);
}
const ys = ["text", "number"], bs = ["group", "repeater", "flexible"], vs = ["placeholder", "prefix", "suffix"];
function L(e) {
  return typeof e == "string" && e.trim() !== "" ? e.trim() : null;
}
function ze(e) {
  return { hint: L(e.hint), tooltip: L(e.hint_tooltip) };
}
function He(e) {
  return ys.includes(e.type) ? { prefix: L(e.config?.prefix), suffix: L(e.config?.suffix) } : { prefix: null, suffix: null };
}
function ye({ field: e, id: s, label: t, maxWidth: c = "cms:max-w-[60%]" }) {
  const { hint: r, tooltip: a } = ze(e);
  return r === null && a === null ? null : /* @__PURE__ */ n.jsxs("span", { className: `cms:ml-auto cms:flex ${c} cms:min-w-0 cms:shrink-0 cms:items-center cms:gap-1 cms:text-xs cms:leading-none cms:text-muted-foreground`, children: [
    r !== null && /* @__PURE__ */ n.jsx("span", { id: `${s}-hint`, className: "cms:min-w-0 cms:truncate cms:py-0.5", title: r, children: r }),
    a !== null && /* @__PURE__ */ n.jsxs(p.Tooltip, { children: [
      /* @__PURE__ */ n.jsx(p.TooltipTrigger, { asChild: !0, children: /* @__PURE__ */ n.jsx(
        "button",
        {
          type: "button",
          "aria-label": f("More about :field", { field: t }),
          className: "cms:-m-1 cms:inline-flex cms:shrink-0 cms:rounded-full cms:p-1 cms:text-muted-foreground cms:outline-none cms:hover:text-foreground cms:focus-visible:ring-2 cms:focus-visible:ring-ring",
          children: /* @__PURE__ */ n.jsx(hs, { className: "cms:size-3.5", "aria-hidden": !0 })
        }
      ) }),
      /* @__PURE__ */ n.jsx(p.TooltipContent, { className: "cms:max-w-xs cms:text-left cms:whitespace-pre-line", children: a })
    ] })
  ] });
}
function js({ text: e, id: s, className: t = "" }) {
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
function ws(e) {
  return e === null ? [] : Array.isArray(e) ? e : [e];
}
function Ie(e, s, t) {
  return s && t !== null && e.length >= t;
}
function ks(e, s, t, c) {
  return t ? e.includes(s) ? e.filter((r) => r !== s) : Ie(e, t, c) ? e.slice() : [...e, s] : [s];
}
function Ns(e) {
  return e.slice(0, -1);
}
function $s(e, s) {
  return s ? e.slice() : e[0] ?? null;
}
function _s(e, s, t, c = () => !1) {
  const r = s === "ArrowDown" || s === "Home" ? 1 : s === "ArrowUp" || s === "End" ? -1 : 0;
  if (r === 0 || t === 0) return e;
  let a = s === "Home" ? 0 : s === "End" ? t - 1 : e + r;
  for (s === "ArrowUp" && e === -1 && (a = t - 1); a >= 0 && a < t && c(a); ) a += r;
  return a >= 0 && a < t ? a : e;
}
function Ss(e, s) {
  const t = new Set(e.map((c) => c.id));
  return [...e, ...s.filter((c) => !t.has(c.id))];
}
function As(e) {
  const s = [], t = {};
  for (const c of e)
    s.length = Math.min(s.length, c.depth), t[c.id] = s.slice(), s.push(c.label);
  return t;
}
function je(e, s) {
  return [...s ?? [], e].join(" › ");
}
const Cs = j.createContext({});
function Ts(e) {
  const s = e.termParents;
  return s && typeof s == "object" && !Array.isArray(s) ? s : {};
}
async function ne(e, s) {
  const t = await fetch(`${ss("cms/terms/picker")}?${ts(e)}`, { headers: { Accept: "application/json" }, credentials: "same-origin", signal: s });
  if (!t.ok) throw new Error(String(t.status));
  return await t.json();
}
function Es({ id: e, taxonomy: s, multiple: t, max: c, required: r, invalid: a, value: l, onChange: h }) {
  const i = j.useContext(Cs), b = Ts(es.usePage().props), u = ws(l), [y, m] = j.useState(!1), [x, k] = j.useState(""), [d, g] = j.useState(null), [N, _] = j.useState(!1), [w, A] = j.useState(!1), [M, Ge] = j.useState(0), [U, We] = j.useState({}), [S, K] = j.useState(-1), [G, Xe] = j.useState(null), W = j.useRef(null), X = j.useRef(null), ie = j.useRef(null), me = j.useRef(null), Y = x.trim(), z = j.useCallback((o, v) => {
    const $ = v ? As(o) : {};
    We((O) => {
      const R = { ...O };
      for (const D of o) R[D.id] = { label: D.label, parents: $[D.id] ?? D.parents ?? O[D.id]?.parents };
      return R;
    });
  }, []), C = y && s ? Y : null;
  j.useEffect(() => {
    if (C === null || s === null || me.current === `${s}
${C}`) return;
    const o = new AbortController(), v = window.setTimeout(() => {
      ne({ taxonomy: s, q: C }, o.signal).then(($) => {
        me.current = `${s}
${C}`, g({ ...$, q: C }), z($.items, C === ""), K(C !== "" && $.items.length > 0 ? 0 : -1), A(!1);
      }).catch(($) => {
        $ instanceof DOMException && $.name === "AbortError" || A(!0);
      });
    }, C === "" ? 0 : 250);
    return () => {
      window.clearTimeout(v), o.abort();
    };
  }, [s, C, M, z]);
  const ue = (o) => i[String(o)] ?? U[o]?.label, J = u.filter((o) => ue(o) === void 0).join(",");
  j.useEffect(() => {
    !s || J === "" || ne({ taxonomy: s, ids: J.split(",").map(Number) }).then((o) => z(o.items, !1)).catch(() => {
    });
  }, [s, J, z]);
  const Q = () => {
    !s || !d?.more || N || d.q !== Y || (_(!0), ne({ taxonomy: s, q: d.q, offset: d.items.length }).then((o) => {
      const v = Ss(d.items, o.items);
      g({ items: v, more: o.more, q: d.q }), z(v, d.q === "");
    }).catch(() => A(!0)).finally(() => _(!1)));
  };
  if (j.useEffect(() => {
    S >= 0 && d && document.getElementById(`${e}-option-${d.items[S]?.id}`)?.scrollIntoView({ block: "nearest" });
  }, [S, e, d]), !s) return /* @__PURE__ */ n.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: f("Choose a taxonomy for this field in its blueprint.") });
  const de = Ie(u, t, c), Z = t || !r, ee = (o) => h($s(o, t)), fe = (o) => {
    ee(ks(u, o, t, c)), t || m(!1);
  }, E = d?.items ?? [], se = (o) => de && !u.includes(E[o]?.id ?? -1), te = (o) => ue(o) ?? f("Term #:id", { id: o }), Ye = (o) => {
    if (o && W.current && X.current) {
      const v = W.current.getBoundingClientRect(), $ = X.current.getBoundingClientRect();
      Xe({ width: v.width, alignOffset: v.left - $.left, sideOffset: 4 + v.bottom - $.bottom });
    }
    o || k(""), m(o);
  }, Je = (o) => {
    if (o.key === "ArrowDown" || o.key === "ArrowUp") {
      o.preventDefault();
      const v = _s(S, o.key, E.length, se);
      o.key === "ArrowDown" && v === S && S === E.length - 1 && Q(), K(v);
    } else if (o.key === "Enter") {
      o.preventDefault();
      const v = E[S];
      v && !se(S) && fe(v.id);
    } else o.key === "Backspace" && x === "" && Z && u.length > 0 && (o.preventDefault(), ee(Ns(u)));
  }, Qe = (o) => {
    const v = o.currentTarget;
    v.scrollTop + v.clientHeight >= v.scrollHeight - 48 && Q();
  }, Ze = t ? f("Choose terms…") : f("Choose a term…"), pe = `${e}-listbox`, he = d !== null && d.q !== Y;
  let H;
  return w ? H = /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:items-start cms:gap-2 cms:p-3 cms:text-sm", children: [
    /* @__PURE__ */ n.jsx("p", { className: "cms:text-destructive", children: f("Terms could not be loaded.") }),
    /* @__PURE__ */ n.jsx(p.Button, { type: "button", variant: "outline", size: "sm", onClick: () => {
      A(!1), Ge((o) => o + 1);
    }, children: f("Try again") })
  ] }) : d === null ? H = /* @__PURE__ */ n.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:p-2", "aria-busy": "true", "aria-label": f("Loading terms"), children: [70, 55, 80, 45, 65].map((o) => /* @__PURE__ */ n.jsx(p.Skeleton, { className: "cms:h-5", style: { width: `${o}%` } }, o)) }) : E.length === 0 ? H = /* @__PURE__ */ n.jsx("p", { className: "cms:p-3 cms:text-sm cms:text-muted-foreground", children: d.q ? f("No terms match “:search”.", { search: d.q }) : f("Nothing to choose from yet.") }) : H = /* @__PURE__ */ n.jsxs("div", { className: `cms:max-h-72 cms:overflow-y-auto cms:overscroll-contain cms:p-1 ${he ? "cms:opacity-60" : ""}`, onScroll: Qe, children: [
    /* @__PURE__ */ n.jsx("div", { role: "listbox", id: pe, "aria-label": f("Terms"), "aria-multiselectable": t || void 0, "aria-busy": he || void 0, children: E.map((o, v) => {
      const $ = u.includes(o.id), O = se(v), R = je(o.label, U[o.id]?.parents);
      return /* @__PURE__ */ n.jsxs(
        "div",
        {
          id: `${e}-option-${o.id}`,
          role: "option",
          "aria-selected": $,
          "aria-disabled": O || void 0,
          title: R,
          className: `cms:flex cms:cursor-default cms:items-center cms:gap-2 cms:rounded-sm cms:py-1.5 cms:pr-2 cms:text-sm cms:select-none ${v === S ? "cms:bg-accent cms:text-accent-foreground" : ""} ${O ? "cms:opacity-50" : ""}`,
          style: { paddingLeft: `${0.5 + Math.min(o.depth, 6) * 0.875}rem` },
          onMouseDown: (D) => D.preventDefault(),
          onMouseMove: () => {
            v !== S && K(v);
          },
          onClick: () => {
            O || fe(o.id);
          },
          children: [
            /* @__PURE__ */ n.jsx(is, { className: `cms:size-4 cms:shrink-0 ${$ ? "" : "cms:invisible"}`, "aria-hidden": "true" }),
            /* @__PURE__ */ n.jsx("span", { className: "cms:min-w-0 cms:truncate", children: o.label })
          ]
        },
        o.id
      );
    }) }),
    d.more && /* @__PURE__ */ n.jsx(p.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:mt-1 cms:w-full", disabled: N, onMouseDown: (o) => o.preventDefault(), onClick: Q, children: N ? f("Loading…") : f("Load more") })
  ] }), /* @__PURE__ */ n.jsxs(p.Popover, { open: y, onOpenChange: Ye, children: [
    /* @__PURE__ */ n.jsxs(
      "div",
      {
        ref: W,
        "data-invalid": a || void 0,
        className: "cms:flex cms:w-full cms:max-w-xl cms:min-w-0 cms:[contain:inline-size] cms:flex-wrap cms:items-center cms:gap-1 cms:rounded-md cms:border cms:border-input/80 cms:bg-card cms:p-1 cms:shadow-xs cms:data-invalid:border-destructive cms:dark:bg-input/20",
        children: [
          u.map((o) => /* @__PURE__ */ n.jsxs(
            "span",
            {
              title: je(te(o), U[o]?.parents ?? b[String(o)]),
              className: "cms:inline-flex cms:h-7 cms:max-w-full cms:min-w-0 cms:items-center cms:gap-0.5 cms:rounded-sm cms:bg-secondary cms:pl-2 cms:text-xs cms:font-medium cms:text-secondary-foreground",
              children: [
                /* @__PURE__ */ n.jsx("span", { className: `cms:min-w-0 cms:truncate ${Z ? "" : "cms:pr-2"}`, children: te(o) }),
                Z && /* @__PURE__ */ n.jsx(
                  "button",
                  {
                    type: "button",
                    className: "cms:inline-flex cms:size-7 cms:shrink-0 cms:items-center cms:justify-center cms:rounded-sm cms:text-muted-foreground cms:hover:bg-muted cms:hover:text-foreground cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none",
                    "aria-label": f("Remove :term", { term: te(o) }),
                    onClick: () => ee(u.filter((v) => v !== o)),
                    children: /* @__PURE__ */ n.jsx(ms, { className: "cms:size-3", "aria-hidden": "true" })
                  }
                )
              ]
            },
            o
          )),
          /* @__PURE__ */ n.jsx(p.PopoverTrigger, { asChild: !0, children: /* @__PURE__ */ n.jsxs(
            "button",
            {
              ref: X,
              id: e,
              type: "button",
              "aria-haspopup": "listbox",
              "aria-invalid": a || void 0,
              className: "cms:flex cms:h-7 cms:min-w-24 cms:flex-1 cms:items-center cms:justify-between cms:gap-1 cms:rounded-sm cms:px-2 cms:text-left cms:text-sm cms:text-muted-foreground cms:hover:bg-muted cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none cms:disabled:pointer-events-none cms:disabled:opacity-50",
              children: [
                /* @__PURE__ */ n.jsx("span", { className: "cms:truncate", children: u.length === 0 ? Ze : t ? f("Add…") : f("Change…") }),
                /* @__PURE__ */ n.jsx(qe, { className: "cms:size-4 cms:shrink-0 cms:opacity-60", "aria-hidden": "true" })
              ]
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ n.jsxs(
      p.PopoverContent,
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
            /* @__PURE__ */ n.jsx(us, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground", "aria-hidden": "true" }),
            /* @__PURE__ */ n.jsx(
              "input",
              {
                ref: ie,
                type: "text",
                role: "combobox",
                "aria-expanded": "true",
                "aria-controls": pe,
                "aria-autocomplete": "list",
                "aria-label": f("Search terms"),
                "aria-activedescendant": S >= 0 && E[S] ? `${e}-option-${E[S].id}` : void 0,
                className: "cms:h-10 cms:w-full cms:bg-transparent cms:pr-3 cms:pl-9 cms:text-sm cms:outline-none cms:placeholder:text-muted-foreground",
                placeholder: f("Search terms"),
                autoComplete: "off",
                value: x,
                onKeyDown: Je,
                onChange: (o) => k(o.target.value)
              }
            )
          ] }),
          H,
          de && c !== null && /* @__PURE__ */ n.jsx("p", { className: "cms:border-t cms:border-border/60 cms:px-3 cms:py-2 cms:text-xs cms:text-muted-foreground", children: f("Up to :max terms.", { max: c }) })
        ]
      }
    )
  ] });
}
const Pe = (e, s = {}) => e.replace(/:([A-Za-z_]+)/g, (t, c) => s[c] ?? t), ht = 5;
let Ds = 0;
const ae = () => `f${++Ds}`;
function Os(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function qs(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^[0-9_]+/, "").replace(/_{2,}/g, "_").slice(0, 64);
}
function Fe(e, s) {
  const t = new Set(s.map((a) => a.handle)), c = Os(e) || "field";
  let r = c;
  for (let a = 2; t.has(r); a++)
    r = `${c}_${a}`;
  return r;
}
function Ms(e) {
  return (e ?? []).map(({ fields: s, ...t }) => ({
    ...t,
    key: ae(),
    fields: Ms(s),
    handleTouched: !0,
    savedHandle: t.handle
  }));
}
function zs(e, s) {
  return e.map(({ key: t, handleTouched: c, savedHandle: r, fields: a, ...l }) => ({
    ...l,
    validation: (l.validation ?? []).map((h) => h.trim()).filter((h) => h !== ""),
    ...s(l.type) ? { fields: zs(a, s) } : {}
  }));
}
function xt(e, s, t) {
  return { key: ae(), type: e, label: s, handle: Fe(s, t), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function gt(e) {
  return e.type !== "fieldset" && e.savedHandle !== void 0 && e.savedHandle !== "" && e.handle !== e.savedHandle ? e.savedHandle : null;
}
function Hs(e) {
  return e.map((s) => ({ ...s, savedHandle: s.handle, fields: Hs(s.fields) }));
}
function yt(e, s, t) {
  if (e.handleTouched) return { ...e, label: s };
  const c = t.filter((r) => r.key !== e.key);
  return { ...e, label: s, handle: Fe(s || e.type, c) };
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
function bt(e, s) {
  return Object.keys(e).filter((t) => t === s || t.startsWith(`${s}.`));
}
function vt(e, s) {
  return Object.keys(e).some((t) => t === s || t.startsWith(`${s}.`));
}
function jt(e, s) {
  return s.filter((t) => t.key !== e.key && t.handle !== "" && t.type !== "fieldset");
}
function wt(e, s, t, c = Pe) {
  return e.type === "fieldset" ? null : t?.includes(e.handle) ? c('":handle" is used by the content itself; choose another handle.', { handle: e.handle }) : e.handle !== "" && s.some((r) => r.key !== e.key && r.type !== "fieldset" && r.handle === e.handle) ? c('There is already a field ":handle" here.', { handle: e.handle }) : null;
}
function kt(e, s) {
  return typeof e.translatable == "boolean" ? e.translatable : s;
}
function Nt(e, s, t) {
  return { ...e, translatable: s === t ? null : s };
}
function Ps(e, s, t = []) {
  const c = /* @__PURE__ */ new Set([...s.map((l) => l.handle), ...t]), r = `${(qs(e) || "field").slice(0, 56)}_copy`;
  let a = r;
  for (let l = 2; c.has(a); l++)
    a = `${r}_${l}`;
  return a;
}
function Re(e) {
  const { key: s, savedHandle: t, fields: c, ...r } = e;
  return { ...structuredClone(r), key: ae(), fields: c.map(Re) };
}
function $t(e, s, t = [], c = Pe) {
  const r = e[s];
  if (r === void 0) return null;
  const a = r.label || r.handle, l = {
    ...Re(r),
    label: c(":label (copy)", { label: a }),
    handle: r.type === "fieldset" ? r.handle : Ps(r.handle, e, t),
    handleTouched: !0
  };
  return { fields: [...e.slice(0, s + 1), l, ...e.slice(s + 1)], copy: l };
}
function Fs(e, s) {
  const t = e.condition;
  return !t || "rules" in t ? null : (t.operator === "filled" || t.operator === "equals" && (t.value === !0 || t.value === "true")) && s.some((r) => r.handle === t.field && r.type === "toggle") ? t.field : null;
}
function _t(e) {
  const s = (l) => l.type === "number" || l.type === "text" && (l.instructions ?? "").length <= 60, t = (l) => l.type === "text" && vs.includes(l.handle), c = {}, r = [];
  for (const l of e) {
    const h = Fs(l, e);
    h === null ? r.push(l) : (c[h] ??= []).push(l);
  }
  const a = r.filter((l) => !t(l));
  return { options: a.filter((l) => !s(l)), limits: a.filter(s), appearance: r.filter(t), dependents: c };
}
const Rs = ["html", "css", "javascript", "json", "plain"];
function Ls(e) {
  const s = e.config?.language;
  return typeof s == "string" && Rs.includes(s) ? s : "plain";
}
const St = [
  { value: "equals", label: "is", needsValue: !0 },
  { value: "not_equals", label: "is not", needsValue: !0 },
  { value: "filled", label: "is filled in", needsValue: !1 },
  { value: "empty", label: "is empty", needsValue: !1 }
];
function we(e) {
  return e === !0 ? "true" : e === !1 ? "false" : typeof e == "string" || typeof e == "number" ? String(e) : "";
}
function Bs(e) {
  return e ? "rules" in e ? Array.isArray(e.rules) ? e.rules : [] : [e] : [];
}
function Vs(e) {
  return e && "rules" in e && e.match === "any" ? "any" : "all";
}
function At(e, s) {
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
function Us(e, s) {
  const t = Bs(e.condition);
  return t.length === 0 ? !0 : Vs(e.condition) === "any" ? t.some((c) => ke(c, s)) : t.every((c) => ke(c, s));
}
function Ct(e) {
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
function Tt(e) {
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
const Ks = [25, 33, 50, 66, 75, 100];
function Gs(e) {
  return Ks.find((s) => s === e.width) ?? 100;
}
function Ws(e = "cms:gap-x-4 cms:gap-y-6") {
  return `cms:@container cms:grid cms:grid-cols-12 cms:items-start ${e}`;
}
const Xs = {
  25: "cms:@lg:col-span-3",
  33: "cms:@lg:col-span-4",
  50: "cms:@lg:col-span-6",
  66: "cms:@lg:col-span-8",
  75: "cms:@lg:col-span-9",
  100: ""
};
function Ne(e) {
  return `cms:col-span-12 cms:min-w-0 ${Xs[Gs(e)]}`.trim();
}
function Et(e, s) {
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
const Ys = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function Le(e) {
  if (e.label) return e.label;
  const s = e.handle.replace(/_/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function $e({ field: e, value: s, onChange: t, errors: c, id: r, content: a = !1, fill: l = !1, marker: h = null }) {
  const i = Le(e), b = Ys.includes(e.type) || ["select", "terms"].includes(e.type) && e.config?.multiple === !0, u = c[""] !== void 0, y = bs.includes(e.type), m = e.instructions && e.instructions.trim() !== "" ? /* @__PURE__ */ n.jsx(js, { id: `${r}-help`, text: e.instructions }) : null, { hint: x } = ze(e), { prefix: k, suffix: d } = He(e), g = [x && `${r}-hint`, k && `${r}-prefix`, d && `${r}-suffix`, m && `${r}-help`, u && `${r}-error`].filter(Boolean).join(" ") || void 0;
  return /* @__PURE__ */ n.jsxs(
    "div",
    {
      className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2",
      ...b ? { role: "group", "aria-labelledby": `${r}-label`, ...u ? { "aria-invalid": !0 } : {}, ...u || m ? { "aria-describedby": [m && `${r}-help`, u && `${r}-error`].filter(Boolean).join(" ") } : {} } : {},
      children: [
        e.type === "toggle" ? /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
          /* @__PURE__ */ n.jsx(p.Switch, { id: r, checked: s === !0, "aria-describedby": g, onCheckedChange: (N) => t(N) }),
          /* @__PURE__ */ n.jsx(p.Label, { htmlFor: r, className: "cms:min-w-0", children: i }),
          h,
          /* @__PURE__ */ n.jsx(ye, { field: e, id: r, label: i })
        ] }) : /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:min-h-4 cms:min-w-0 cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ n.jsxs(p.Label, { id: `${r}-label`, htmlFor: b ? void 0 : r, className: "cms:min-w-0", children: [
            i,
            e.required && /* @__PURE__ */ n.jsx("span", { className: "cms:text-destructive", children: " *" }),
            h
          ] }),
          /* @__PURE__ */ n.jsx(ye, { field: e, id: r, label: i })
        ] }),
        y && m,
        /* @__PURE__ */ n.jsx(Qs, { field: e, value: s, onChange: t, errors: c, id: r, content: a, fill: l, describedBy: g }),
        ["text", "textarea", "code"].includes(e.type) && T(e, "max") !== void 0 && /* @__PURE__ */ n.jsx(Js, { length: typeof s == "string" ? [...s].length : 0, max: T(e, "max") ?? 0 }),
        !y && m,
        /* @__PURE__ */ n.jsx(V, { message: c[""], id: `${r}-error` })
      ]
    }
  );
}
function Js({ length: e, max: s }) {
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
function Qs({ field: e, value: s, onChange: t, errors: c, id: r, content: a, fill: l = !1, describedBy: h }) {
  const i = c[""] !== void 0, { prefix: b, suffix: u } = He(e), y = b !== null || u !== null;
  switch (e.type) {
    case "toggle":
      return null;
    case "file":
      return /* @__PURE__ */ n.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: f("Visitors attach a file here when they send a form.") });
    case "textarea":
      return /* @__PURE__ */ n.jsx(
        p.Textarea,
        {
          id: r,
          "aria-invalid": i,
          "aria-describedby": h,
          value: typeof s == "string" ? s : "",
          rows: T(e, "rows") ?? 4,
          placeholder: P(e, "placeholder"),
          onChange: (m) => t(m.target.value)
        }
      );
    case "code":
      return /* @__PURE__ */ n.jsx(
        p.CodeEditor,
        {
          id: r,
          "aria-labelledby": `${r}-label`,
          "aria-describedby": h,
          invalid: i,
          language: Ls(e),
          value: typeof s == "string" ? s : "",
          placeholder: P(e, "placeholder"),
          onChange: (m) => t(m)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ n.jsx(p.RichTextEditor, { id: r, labelledBy: `${r}-label`, invalid: i, value: typeof s == "string" ? s : "", onChange: t });
    case "number": {
      const m = cs(s);
      return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ n.jsx(be, { prefix: b, suffix: u, id: r, className: l ? "" : "cms:max-w-64", children: /* @__PURE__ */ n.jsx(
          p.Input,
          {
            id: r,
            type: "number",
            className: y ? ve : l ? "cms:w-full" : "cms:max-w-48",
            placeholder: P(e, "placeholder"),
            "aria-invalid": i,
            "aria-describedby": [h, m && `${r}-grouped`].filter(Boolean).join(" ") || void 0,
            value: typeof s == "number" ? String(s) : typeof s == "string" ? s : "",
            min: T(e, "min"),
            max: T(e, "max"),
            step: T(e, "step") ?? "any",
            onChange: (x) => t(x.target.value === "" ? null : Number(x.target.value))
          }
        ) }),
        m && /* @__PURE__ */ n.jsx("span", { id: `${r}-grouped`, className: "cms:text-sm cms:tabular-nums cms:text-muted-foreground", children: m })
      ] });
    }
    case "date": {
      const m = e.config?.time === !0;
      return /* @__PURE__ */ n.jsx(
        p.DatePicker,
        {
          id: r,
          withTime: m,
          invalid: i,
          required: e.required === !0,
          value: xe(rs(s, m)),
          onChange: (x) => t(xe(x ?? ""))
        }
      );
    }
    case "select":
      return e.config?.multiple === !0 ? /* @__PURE__ */ n.jsx(
        et,
        {
          options: ce(e),
          value: Array.isArray(s) ? s.map(String) : [],
          onChange: t,
          invalid: i,
          empty: typeof e.config?.empty == "string" ? e.config.empty : void 0,
          inTickOrder: e.config?.in_tick_order === !0
        }
      ) : /* @__PURE__ */ n.jsx(
        Zs,
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
      const m = e.config?.multiple === !0, x = Array.isArray(s) ? s.filter((k) => typeof k == "number") : typeof s == "number" ? s : null;
      return /* @__PURE__ */ n.jsx(
        Es,
        {
          id: r,
          taxonomy: typeof e.taxonomy == "string" ? e.taxonomy : null,
          multiple: m,
          max: T(e, "max") ?? null,
          required: e.required === !0,
          invalid: i,
          value: m ? Array.isArray(x) ? x : [] : typeof x == "number" ? x : null,
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
          max: T(e, "max") ?? null,
          collections: e.collections ?? [],
          onChange: t,
          value: typeof s == "number" || Array.isArray(s) && s.every((m) => typeof m == "number") ? s : null
        }
      );
    case "link":
      return /* @__PURE__ */ n.jsx(
        st,
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
        p.MediaPickerInput,
        {
          id: r,
          invalid: i,
          disabled: !1,
          multiple: e.config?.multiple === !0,
          max: T(e, "max") ?? null,
          types: Array.isArray(e.config?.types) ? e.config.types : [],
          value: typeof s == "number" || Array.isArray(s) && s.every((m) => typeof m == "number") ? s : null,
          onChange: t
        }
      );
    case "group":
      return /* @__PURE__ */ n.jsx(oe, { fields: e.fields ?? [], value: q(s), onChange: t, errors: c, id: r, content: a });
    case "repeater":
      return /* @__PURE__ */ n.jsx(tt, { field: e, value: Array.isArray(s) ? s : [], onChange: t, errors: c, id: r, content: a });
    case "flexible":
      return /* @__PURE__ */ n.jsx(nt, { field: e, value: Array.isArray(s) ? s : [], onChange: t, errors: c, id: r });
    default:
      return /* @__PURE__ */ n.jsx(be, { prefix: b, suffix: u, id: r, children: /* @__PURE__ */ n.jsx(
        p.Input,
        {
          id: r,
          "aria-invalid": i,
          "aria-describedby": h,
          className: y ? ve : void 0,
          value: typeof s == "string" ? s : "",
          placeholder: P(e, "placeholder"),
          onChange: (m) => t(m.target.value)
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
  const h = /* @__PURE__ */ n.jsx("div", { className: Ws(l ? void 0 : "cms:gap-4"), children: e.filter((i) => Us(i, s)).map((i) => i.shared ? (
    // Greyed out; the form says once, at the top, where to edit shared fields.
    /* @__PURE__ */ n.jsx("fieldset", { disabled: !0, className: `cms:flex cms:flex-col cms:gap-1 cms:opacity-60 ${Ne(i)}`, title: f("Shared by all languages: edit it in the main language."), children: /* @__PURE__ */ n.jsx($e, { id: `${r}-${i.handle}`, field: i, value: s[i.handle], content: a, errors: {}, onChange: () => {
    } }) }, i.handle)
  ) : /* @__PURE__ */ n.jsx("div", { className: Ne(i), children: /* @__PURE__ */ n.jsx(
    $e,
    {
      id: `${r}-${i.handle}`,
      field: i,
      value: s[i.handle],
      content: a,
      errors: le(c, i.handle),
      onChange: (b) => t({ ...s, [i.handle]: b })
    }
  ) }, i.handle)) });
  return l ? h : /* @__PURE__ */ n.jsx("div", { className: "cms:rounded-lg cms:border cms:p-4", children: h });
}
function Zs({ options: e, value: s, onChange: t, id: c, empty: r, fill: a = !1 }) {
  return /* @__PURE__ */ n.jsxs(p.Select, { value: s ?? re, onValueChange: (l) => t(l === re ? null : l), children: [
    /* @__PURE__ */ n.jsx(p.SelectTrigger, { id: c, className: a ? "cms:w-full" : "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ n.jsx(p.SelectValue, {}) }),
    /* @__PURE__ */ n.jsxs(p.SelectContent, { children: [
      r && /* @__PURE__ */ n.jsx(p.SelectItem, { value: re, children: f("None") }),
      e.map((l) => /* @__PURE__ */ n.jsx(p.SelectItem, { value: l.value, children: l.label }, l.value))
    ] })
  ] });
}
function et({ options: e, value: s, onChange: t, empty: c, inTickOrder: r = !1, invalid: a = !1 }) {
  return e.length === 0 ? /* @__PURE__ */ n.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: c ?? f("Nothing to choose from yet.") }) : /* @__PURE__ */ n.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2", children: e.map((l) => /* @__PURE__ */ n.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
    /* @__PURE__ */ n.jsx(
      p.Checkbox,
      {
        checked: s.includes(l.value),
        "aria-invalid": a || void 0,
        onCheckedChange: (h) => t(h ? r ? [...s.filter((i) => i !== l.value), l.value] : e.map((i) => i.value).filter((i) => i === l.value || s.includes(i)) : s.filter((i) => i !== l.value))
      }
    ),
    l.label,
    r && s.includes(l.value) && /* @__PURE__ */ n.jsxs("span", { className: "cms:text-xs cms:text-muted-foreground", "aria-label": `number ${s.indexOf(l.value) + 1}`, children: [
      "#",
      s.indexOf(l.value) + 1
    ] })
  ] }, l.value)) });
}
function st({ label: e, value: s, onChange: t, errors: c, id: r, collections: a, placeholder: l, describedBy: h }) {
  const i = s.type === "entry" ? "entry" : "url", b = (u) => {
    const y = { ...s, type: i, ...u }, m = y.type === "entry" ? typeof y.entry_id != "number" : y.url === "" || y.url === void 0 || y.url === null;
    t(m ? y.label || y.new_tab ? y : null : y);
  };
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ n.jsx("div", { role: "radiogroup", "aria-label": f(":field: link to", { field: e }), className: "cms:inline-flex cms:w-fit cms:rounded-md cms:border cms:p-0.5", children: ["url", "entry"].map((u) => /* @__PURE__ */ n.jsx(
      p.Button,
      {
        type: "button",
        size: "sm",
        role: "radio",
        "aria-checked": i === u,
        variant: i === u ? "secondary" : "ghost",
        onClick: () => b({ type: u, url: u === "url" ? s.url : void 0, entry_id: u === "entry" ? s.entry_id : void 0 }),
        children: u === "url" ? f("Address") : f("Entry")
      },
      u
    )) }),
    /* @__PURE__ */ n.jsxs("div", { className: "cms:grid cms:gap-2 cms:md:grid-cols-[2fr_1fr_auto] cms:md:items-start", children: [
      i === "url" ? /* @__PURE__ */ n.jsx(
        p.Input,
        {
          id: r,
          "aria-label": f(":field: address", { field: e }),
          placeholder: l || f("https://… or /about"),
          "aria-describedby": h,
          value: typeof s.url == "string" ? s.url : "",
          onChange: (u) => b({ url: u.target.value }),
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
          onChange: (u) => b({ entry_id: typeof u == "number" ? u : void 0 })
        }
      ),
      /* @__PURE__ */ n.jsx(
        p.Input,
        {
          "aria-label": f(":field: link text", { field: e }),
          placeholder: i === "entry" ? f("Link text (the entry's title)") : f("Link text"),
          value: typeof s.label == "string" ? s.label : "",
          onChange: (u) => b({ label: u.target.value })
        }
      ),
      /* @__PURE__ */ n.jsxs("label", { className: "cms:flex cms:h-9 cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ n.jsx(p.Checkbox, { checked: s.new_tab === !0, onCheckedChange: (u) => b({ new_tab: u }) }),
        f("New tab")
      ] }),
      /* @__PURE__ */ n.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ n.jsx(V, { message: c.url ?? c.entry_id ?? c.label ?? c.type }) })
    ] })
  ] });
}
function _e(e, s) {
  return !s && (e.fields ?? []).every((t) => t.type === "text");
}
function Be(e) {
  const s = j.useRef([]);
  return s.current = os(s.current, e), {
    keys: s.current,
    remove: (t) => {
      s.current = s.current.filter((c, r) => r !== t);
    },
    move: (t, c) => {
      s.current = p.moveItem(s.current, t, c);
    }
  };
}
function Ve() {
  const [e, s] = j.useState(() => /* @__PURE__ */ new Set());
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
  return /* @__PURE__ */ n.jsxs(p.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => s.setAll(e, t), children: [
    t ? /* @__PURE__ */ n.jsx(ps, {}) : /* @__PURE__ */ n.jsx(qe, {}),
    " ",
    t ? f("Collapse all") : f("Expand all")
  ] });
}
function tt({ field: e, value: s, onChange: t, errors: c, id: r, content: a = !1 }) {
  const l = e.fields ?? [], h = s.map(q), i = Be(h.length), b = (d, g) => t(h.map((N, _) => _ === d ? g : N)), u = (d) => {
    i.remove(d), t(h.filter((g, N) => N !== d));
  }, y = e.label ? e.label.toLowerCase().replace(/s$/, "") : f("row"), m = y.charAt(0).toUpperCase() + y.slice(1), x = h.map((d, g) => ({ row: d, index: g, key: i.keys[g] ?? String(g) })), k = Ve();
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ n.jsx(
      p.SortableList,
      {
        items: x,
        getId: (d) => d.key,
        getLabel: (d) => `${y} ${d.index + 1}`,
        onReorder: (d, g, N) => {
          i.move(g, N), t(d.map((_) => _.row));
        },
        children: ({ row: d, index: g, key: N }, { handle: _ }) => _e(e, a) ? /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
          /* @__PURE__ */ n.jsx(p.SortableHandle, { ..._, label: f("Move :item :number", { item: y, number: g + 1 }), className: "cms:mt-1" }),
          l.map((w) => /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
            /* @__PURE__ */ n.jsx(
              p.Input,
              {
                "aria-label": w.label || w.handle,
                placeholder: w.label || w.handle,
                value: typeof d[w.handle] == "string" ? d[w.handle] : "",
                onChange: (A) => b(g, { ...d, [w.handle]: A.target.value })
              }
            ),
            /* @__PURE__ */ n.jsx(V, { message: c[`${g}.${w.handle}`] })
          ] }, w.handle)),
          /* @__PURE__ */ n.jsx(p.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": f("Remove :item :number", { item: y, number: g + 1 }), onClick: () => u(g), children: /* @__PURE__ */ n.jsx(Te, {}) })
        ] }) : (() => {
          const w = le(c, String(g)), A = k.isCollapsed(N, Object.keys(w).length > 0);
          return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ n.jsx(
              Ke,
              {
                label: `${m} ${g + 1}`,
                summary: Ae(l, d),
                handle: _,
                onRemove: () => u(g),
                collapsed: A,
                onToggle: () => k.toggle(N),
                controls: `${r}-${g}-fields`,
                hidden: a ? d._hidden === !0 : void 0,
                onHidden: (M) => b(g, { ...d, _hidden: M })
              }
            ),
            /* @__PURE__ */ n.jsx("div", { id: `${r}-${g}-fields`, hidden: A, children: !A && /* @__PURE__ */ n.jsx(oe, { fields: l, value: d, onChange: (M) => b(g, M), errors: w, id: `${r}-${g}`, content: a }) })
          ] });
        })()
      }
    ),
    /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ n.jsxs(p.Button, { type: "button", variant: "outline", size: "sm", onClick: () => t([...h, a ? ls() : {}]), children: [
        /* @__PURE__ */ n.jsx(Ce, {}),
        " ",
        f("Add :item", { item: y })
      ] }),
      !_e(e, a) && /* @__PURE__ */ n.jsx(Ue, { keys: x.map((d) => d.key), folding: k })
    ] })
  ] });
}
function nt({ field: e, value: s, onChange: t, errors: c, id: r }) {
  const a = e.blocks ?? [], l = s.map(q), h = Be(l.length), i = (m, x) => t(l.map((k, d) => d === m ? x : k)), b = (m) => {
    h.remove(m), t(l.filter((x, k) => k !== m));
  }, u = l.map((m, x) => ({ block: m, index: x, key: h.keys[x] ?? String(x) })), y = Ve();
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    /* @__PURE__ */ n.jsx(
      p.SortableList,
      {
        items: u,
        getId: (m) => m.key,
        className: "cms:gap-3",
        getLabel: (m) => f(":type block", { type: a.find((x) => x.type === m.block.type)?.label ?? String(m.block.type) }),
        onReorder: (m, x, k) => {
          h.move(x, k), t(m.map((d) => d.block));
        },
        children: ({ block: m, index: x, key: k }, { handle: d }) => {
          const g = a.find((w) => w.type === m.type), N = le(c, `${x}.values`), _ = y.isCollapsed(k, Object.keys(N).length > 0 || c[`${x}.type`] !== void 0);
          return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ n.jsx(
              Ke,
              {
                label: g?.label ?? String(m.type),
                summary: g ? Ae(g.fields, q(m.values)) : null,
                badge: !0,
                handle: d,
                onRemove: () => b(x),
                collapsed: _,
                onToggle: () => y.toggle(k),
                controls: `${r}-${x}-fields`,
                hidden: m.hidden === !0,
                onHidden: (w) => i(x, { ...m, hidden: w })
              }
            ),
            /* @__PURE__ */ n.jsx("div", { id: `${r}-${x}-fields`, hidden: _, children: _ ? null : g ? /* @__PURE__ */ n.jsx(
              oe,
              {
                fields: g.fields,
                value: q(m.values),
                onChange: (w) => i(x, { ...m, values: w }),
                errors: N,
                id: `${r}-${x}`,
                content: !0
              }
            ) : /* @__PURE__ */ n.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: f("This kind of block no longer exists. Its values are kept.") }) }),
            /* @__PURE__ */ n.jsx(V, { message: c[`${x}.type`] })
          ] });
        }
      }
    ),
    /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ n.jsxs(p.DropdownMenu, { children: [
        /* @__PURE__ */ n.jsx(p.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ n.jsxs(p.Button, { type: "button", variant: "outline", size: "sm", disabled: a.length === 0, children: [
          /* @__PURE__ */ n.jsx(Ce, {}),
          " ",
          f("Add block")
        ] }) }),
        /* @__PURE__ */ n.jsx(p.DropdownMenuContent, { align: "start", children: a.map((m) => /* @__PURE__ */ n.jsx(p.DropdownMenuItem, { onSelect: () => t([...l, as(m.type)]), children: m.label }, m.type)) })
      ] }),
      /* @__PURE__ */ n.jsx(Ue, { keys: u.map((m) => m.key), folding: y })
    ] })
  ] });
}
function Ke({ label: e, summary: s, badge: t = !1, handle: c, onRemove: r, collapsed: a, onToggle: l, controls: h, hidden: i, onHidden: b }) {
  const u = a ? ds : fs, y = s ? `${e}: ${s}` : e;
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ n.jsx(p.SortableHandle, { ...c, label: f("Move :title", { title: y }) }),
    /* @__PURE__ */ n.jsxs(
      "button",
      {
        type: "button",
        onClick: l,
        "aria-expanded": !a,
        "aria-controls": h,
        className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:rounded-md cms:text-left cms:outline-none cms:focus-visible:ring-2 cms:focus-visible:ring-ring",
        children: [
          /* @__PURE__ */ n.jsx(u, { className: "cms:size-4 cms:shrink-0 cms:text-muted-foreground", "aria-hidden": !0 }),
          t ? /* @__PURE__ */ n.jsx(p.Badge, { variant: "secondary", children: e }) : /* @__PURE__ */ n.jsx("span", { className: "cms:shrink-0 cms:text-sm cms:font-medium", children: e }),
          s && /* @__PURE__ */ n.jsx("span", { className: "cms:truncate cms:text-sm cms:text-muted-foreground", children: s }),
          /* @__PURE__ */ n.jsx("span", { className: "cms:sr-only", children: a ? f("(collapsed)") : "" })
        ]
      }
    ),
    i !== void 0 && /* @__PURE__ */ n.jsxs("label", { className: "cms:flex cms:shrink-0 cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", title: f("Off: kept here, but left out of the page"), children: [
      /* @__PURE__ */ n.jsx(p.Switch, { checked: !i, onCheckedChange: (m) => b(!m), "aria-label": f(":title: visible on site", { title: y }) }),
      f("Visible on site")
    ] }),
    /* @__PURE__ */ n.jsx(
      p.Button,
      {
        type: "button",
        variant: "ghost",
        size: "icon",
        className: "cms:size-8 cms:shrink-0 cms:text-destructive",
        "aria-label": f("Remove :title", { title: y }),
        onClick: r,
        children: /* @__PURE__ */ n.jsx(Te, {})
      }
    )
  ] });
}
export {
  oe as A,
  bt as B,
  fs as C,
  Us as D,
  Ne as E,
  $e as F,
  Ws as G,
  qe as H,
  js as I,
  Le as J,
  ye as K,
  ze as L,
  ht as M,
  St as O,
  Es as T,
  wt as a,
  le as b,
  qs as c,
  $t as d,
  Is as e,
  Gs as f,
  gt as g,
  vt as h,
  kt as i,
  Nt as j,
  Ks as k,
  jt as l,
  Bs as m,
  xt as n,
  Vs as o,
  Ct as p,
  Tt as q,
  yt as r,
  _t as s,
  At as t,
  Ms as u,
  Os as v,
  Et as w,
  zs as x,
  Hs as y,
  Cs as z
};
