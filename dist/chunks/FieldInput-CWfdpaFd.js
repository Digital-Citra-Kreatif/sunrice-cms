import { j as n, t as d, r as ts, a as ns } from "./admin-uwjZ4-fp.js";
import { c as U, _ as v } from "./createLucideIcon-Ccbp7F45.js";
import { u as f } from "./ui-Dh5wfMwT.js";
import { t as rs, a as q, E as Ae, o as cs, d as ge, b as as, g as ls, i as Ce, n as os, c as is, s as ms, e as us, l as ds } from "./EntriesPicker-Cli9zxnz.js";
import { F as K } from "./FieldError-B1cYCThf.js";
import { C as fs } from "./check-OeKFYRnl.js";
import { X as ps } from "./EntryStatus-CTfsahPX.js";
import { S as hs } from "./search-3zKi7F1_.js";
import { P as Te } from "./plus-COqahUZ2.js";
import { T as Ee } from "./Confirm-DWMyAUT-.js";
import { C as xs } from "./chevron-right-9qVV6b-Q.js";
const Oe = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
Oe.node;
const gs = U(Oe);
const De = {
  name: "chevrons-down-up",
  size: 24,
  node: [
    ["path", { d: "m7 20 5-5 5 5", key: "13a0gw" }],
    ["path", { d: "m7 4 5 5 5-5", key: "1kwcof" }]
  ]
};
De.node;
const bs = U(De);
const qe = {
  name: "chevrons-up-down",
  size: 24,
  node: [
    ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
    ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
  ]
};
qe.node;
const ze = U(qe);
const He = {
  name: "info",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M12 16v-4", key: "1dtifu" }],
    ["path", { d: "M12 8h.01", key: "e9boi3" }]
  ]
};
He.node;
const ys = U(He), vs = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
function I(e) {
  return e.replace(/[&<>"']/g, (s) => vs[s] ?? s);
}
function js(e) {
  return /[\u0000- \u007f]/.test(e) ? !1 : /^(https?:\/\/[^/]|mailto:|tel:|\/(?![/\\])|#)/i.test(e);
}
const be = new RegExp("`([^`\\n]+)`|\\[([^\\]\\n]+)\\]\\(((?:[^()\\s]|\\([^()\\s]*\\))+)\\)|\\*\\*(?=\\S)(.+?)(?<=\\S)\\*\\*|\\*(?=[^\\s*])([^*\\n]+?)(?<=\\S)\\*");
function P(e, s = !1) {
  let t = "", c = e;
  for (let r = be.exec(c); r !== null; r = be.exec(c)) {
    t += I(c.slice(0, r.index));
    const [l, o, x, m, w, g] = r;
    o !== void 0 ? t += `<code>${I(o)}</code>` : x !== void 0 && m !== void 0 ? t += s || !js(m) ? P(x, s) : `<a href="${I(m)}" target="_blank" rel="noopener noreferrer">${P(x, !0)}</a>` : w !== void 0 ? t += `<strong>${P(w, s)}</strong>` : g !== void 0 ? t += `<em>${P(g, s)}</em>` : t += I(l), c = c.slice(r.index + l.length);
  }
  return t + I(c);
}
const ws = ["text", "number"], ks = ["group", "repeater", "flexible"], Ns = ["placeholder", "prefix", "suffix"];
function V(e) {
  return typeof e == "string" && e.trim() !== "" ? e.trim() : null;
}
function Me(e) {
  return { hint: V(e.hint), tooltip: V(e.hint_tooltip) };
}
function Re(e) {
  return ws.includes(e.type) ? { prefix: V(e.config?.prefix), suffix: V(e.config?.suffix) } : { prefix: null, suffix: null };
}
function ye({ field: e, id: s, label: t, maxWidth: c = "cms:max-w-[60%]" }) {
  const { hint: r, tooltip: l } = Me(e);
  return r === null && l === null ? null : /* @__PURE__ */ n.jsxs("span", { className: `cms:ml-auto cms:flex ${c} cms:min-w-0 cms:shrink-0 cms:items-center cms:gap-1 cms:text-xs cms:leading-none cms:text-muted-foreground`, children: [
    r !== null && /* @__PURE__ */ n.jsx("span", { id: `${s}-hint`, className: "cms:min-w-0 cms:truncate cms:py-0.5", title: r, children: r }),
    l !== null && /* @__PURE__ */ n.jsxs(f.Tooltip, { children: [
      /* @__PURE__ */ n.jsx(f.TooltipTrigger, { asChild: !0, children: /* @__PURE__ */ n.jsx(
        "button",
        {
          type: "button",
          "aria-label": d("More about :field", { field: t }),
          className: "cms:-m-1 cms:inline-flex cms:shrink-0 cms:rounded-full cms:p-1 cms:text-muted-foreground cms:outline-none cms:hover:text-foreground cms:focus-visible:ring-2 cms:focus-visible:ring-ring",
          children: /* @__PURE__ */ n.jsx(ys, { className: "cms:size-3.5", "aria-hidden": !0 })
        }
      ) }),
      /* @__PURE__ */ n.jsx(f.TooltipContent, { className: "cms:max-w-xs cms:text-left cms:whitespace-pre-line", children: l })
    ] })
  ] });
}
function $s({ text: e, id: s, className: t = "" }) {
  return !e || e.trim() === "" ? null : /* @__PURE__ */ n.jsx(
    "p",
    {
      id: s,
      className: `cms:text-sm cms:text-muted-foreground cms:[overflow-wrap:anywhere] cms:[&_a]:font-medium cms:[&_a]:text-foreground cms:[&_a]:underline cms:[&_a]:underline-offset-2 cms:[&_a:hover]:text-primary cms:[&_code]:rounded cms:[&_code]:bg-muted cms:[&_code]:px-1 cms:[&_code]:font-mono cms:[&_code]:text-[0.8125rem] cms:[&_strong]:font-semibold cms:[&_strong]:text-foreground ${t}`.trim(),
      dangerouslySetInnerHTML: { __html: P(e) }
    }
  );
}
const _s = v.createContext(null);
function Ss({ id: e, className: s = "" }) {
  const t = v.useContext(_s);
  return /* @__PURE__ */ n.jsx("p", { id: e, className: `cms:text-sm cms:text-muted-foreground ${s}`.trim(), children: t ? d("Not translatable: edit it in :language.", { language: t }) : d("Not translatable: edit it in the main language.") });
}
function ve({ prefix: e, suffix: s, id: t, className: c = "", children: r }) {
  if (e === null && s === null) return /* @__PURE__ */ n.jsx(n.Fragment, { children: r });
  const l = "cms:flex cms:shrink-0 cms:items-center cms:bg-muted/60 cms:px-3 cms:text-sm cms:whitespace-nowrap cms:text-muted-foreground cms:select-none";
  return /* @__PURE__ */ n.jsxs("div", { "data-slot": "input-group", className: `cms:flex cms:h-10 cms:w-full cms:min-w-0 cms:items-stretch cms:overflow-hidden cms:rounded-md cms:border cms:border-input/80 cms:bg-card cms:shadow-xs cms:transition-[border-color,box-shadow] cms:duration-150 cms:hover:border-ring/45 cms:focus-within:border-ring/70 cms:focus-within:ring-4 cms:focus-within:ring-ring-glow cms:has-[[aria-invalid=true]]:border-destructive cms:has-[[aria-invalid=true]]:ring-destructive/20 cms:has-disabled:cursor-not-allowed cms:has-disabled:opacity-50 cms:has-[[readonly]]:bg-muted/30 cms:dark:bg-input/20 ${c}`.trim(), children: [
    e !== null && /* @__PURE__ */ n.jsx("span", { id: `${t}-prefix`, className: `${l} cms:border-r cms:border-input/80`, children: e }),
    r,
    s !== null && /* @__PURE__ */ n.jsx("span", { id: `${t}-suffix`, className: `${l} cms:border-l cms:border-input/80`, children: s })
  ] });
}
const je = "cms:h-full cms:min-w-0 cms:flex-1 cms:rounded-none cms:border-0 cms:bg-transparent cms:shadow-none cms:hover:border-0 cms:focus-visible:ring-0 cms:aria-invalid:ring-0 cms:disabled:opacity-100 cms:dark:bg-transparent";
function As(e) {
  return e === null ? [] : Array.isArray(e) ? e : [e];
}
function Ie(e, s, t) {
  return s && t !== null && e.length >= t;
}
function Cs(e, s, t, c) {
  return t ? e.includes(s) ? e.filter((r) => r !== s) : Ie(e, t, c) ? e.slice() : [...e, s] : [s];
}
function Ts(e) {
  return e.slice(0, -1);
}
function Es(e, s) {
  return s ? e.slice() : e[0] ?? null;
}
function Os(e, s, t, c = () => !1) {
  const r = s === "ArrowDown" || s === "Home" ? 1 : s === "ArrowUp" || s === "End" ? -1 : 0;
  if (r === 0 || t === 0) return e;
  let l = s === "Home" ? 0 : s === "End" ? t - 1 : e + r;
  for (s === "ArrowUp" && e === -1 && (l = t - 1); l >= 0 && l < t && c(l); ) l += r;
  return l >= 0 && l < t ? l : e;
}
function Ds(e, s) {
  const t = new Set(e.map((c) => c.id));
  return [...e, ...s.filter((c) => !t.has(c.id))];
}
function qs(e) {
  const s = [], t = {};
  for (const c of e)
    s.length = Math.min(s.length, c.depth), t[c.id] = s.slice(), s.push(c.label);
  return t;
}
function we(e, s) {
  return [...s ?? [], e].join(" › ");
}
const zs = v.createContext({});
function Hs(e) {
  const s = e.termParents;
  return s && typeof s == "object" && !Array.isArray(s) ? s : {};
}
async function re(e, s) {
  const t = await fetch(`${ns("cms/terms/picker")}?${rs(e)}`, { headers: { Accept: "application/json" }, credentials: "same-origin", signal: s });
  if (!t.ok) throw new Error(String(t.status));
  return await t.json();
}
function Ms({ id: e, taxonomy: s, multiple: t, max: c, required: r, invalid: l, value: o, onChange: x }) {
  const m = v.useContext(zs), w = Hs(ts.usePage().props), g = As(o), [y, i] = v.useState(!1), [p, h] = v.useState(""), [u, b] = v.useState(null), [N, $] = v.useState(!1), [k, C] = v.useState(!1), [z, We] = v.useState(0), [G, Xe] = v.useState({}), [S, W] = v.useState(-1), [X, Ye] = v.useState(null), H = v.useRef(null), Y = v.useRef(null), me = v.useRef(null), ue = v.useRef(null), J = p.trim(), M = v.useCallback((a, j) => {
    const _ = j ? qs(a) : {};
    Xe((A) => {
      const B = { ...A };
      for (const D of a) B[D.id] = { label: D.label, parents: _[D.id] ?? D.parents ?? A[D.id]?.parents };
      return B;
    });
  }, []), T = y && s ? J : null;
  v.useEffect(() => {
    if (T === null || s === null || ue.current === `${s}
${T}`) return;
    const a = new AbortController(), j = window.setTimeout(() => {
      re({ taxonomy: s, q: T }, a.signal).then((_) => {
        ue.current = `${s}
${T}`, b({ ..._, q: T }), M(_.items, T === ""), W(T !== "" && _.items.length > 0 ? 0 : -1), C(!1);
      }).catch((_) => {
        _ instanceof DOMException && _.name === "AbortError" || C(!0);
      });
    }, T === "" ? 0 : 250);
    return () => {
      window.clearTimeout(j), a.abort();
    };
  }, [s, T, z, M]);
  const de = (a) => m[String(a)] ?? G[a]?.label, Q = g.filter((a) => de(a) === void 0).join(",");
  v.useEffect(() => {
    !s || Q === "" || re({ taxonomy: s, ids: Q.split(",").map(Number) }).then((a) => M(a.items, !1)).catch(() => {
    });
  }, [s, Q, M]);
  const Z = () => {
    !s || !u?.more || N || u.q !== J || ($(!0), re({ taxonomy: s, q: u.q, offset: u.items.length }).then((a) => {
      const j = Ds(u.items, a.items);
      b({ items: j, more: a.more, q: u.q }), M(j, u.q === "");
    }).catch(() => C(!0)).finally(() => $(!1)));
  };
  if (v.useEffect(() => {
    S >= 0 && u && document.getElementById(`${e}-option-${u.items[S]?.id}`)?.scrollIntoView({ block: "nearest" });
  }, [S, e, u]), !s) return /* @__PURE__ */ n.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: d("Choose a taxonomy for this field in its blueprint.") });
  const fe = Ie(g, t, c), ee = t || !r, se = (a) => x(Es(a, t)), pe = (a) => {
    se(Cs(g, a, t, c)), t || i(!1);
  }, O = u?.items ?? [], te = (a) => fe && !g.includes(O[a]?.id ?? -1), ne = (a) => de(a) ?? d("Term #:id", { id: a }), F = v.useCallback(() => {
    if (!H.current || !Y.current) return;
    const a = H.current.getBoundingClientRect(), j = Y.current.getBoundingClientRect(), _ = { width: a.width, alignOffset: a.left - j.left, sideOffset: 4 + a.bottom - j.bottom };
    Ye((A) => A && A.width === _.width && A.alignOffset === _.alignOffset && A.sideOffset === _.sideOffset ? A : _);
  }, []), Je = g.join(",");
  v.useLayoutEffect(() => {
    if (!y || (F(), typeof ResizeObserver > "u" || !H.current)) return;
    const a = new ResizeObserver(F);
    return a.observe(H.current), () => a.disconnect();
  }, [y, Je, F]);
  const Qe = (a) => {
    a && F(), a || h(""), i(a);
  }, Ze = (a) => {
    if (a.key === "ArrowDown" || a.key === "ArrowUp") {
      a.preventDefault();
      const j = Os(S, a.key, O.length, te);
      a.key === "ArrowDown" && j === S && S === O.length - 1 && Z(), W(j);
    } else if (a.key === "Enter") {
      a.preventDefault();
      const j = O[S];
      j && !te(S) && pe(j.id);
    } else a.key === "Backspace" && p === "" && ee && g.length > 0 && (a.preventDefault(), se(Ts(g)));
  }, es = (a) => {
    const j = a.currentTarget;
    j.scrollTop + j.clientHeight >= j.scrollHeight - 48 && Z();
  }, ss = t ? d("Choose terms…") : d("Choose a term…"), he = `${e}-listbox`, xe = u !== null && u.q !== J;
  let R;
  return k ? R = /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:items-start cms:gap-2 cms:p-3 cms:text-sm", children: [
    /* @__PURE__ */ n.jsx("p", { className: "cms:text-destructive", children: d("Terms could not be loaded.") }),
    /* @__PURE__ */ n.jsx(f.Button, { type: "button", variant: "outline", size: "sm", onClick: () => {
      C(!1), We((a) => a + 1);
    }, children: d("Try again") })
  ] }) : u === null ? R = /* @__PURE__ */ n.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:p-2", "aria-busy": "true", "aria-label": d("Loading terms"), children: [70, 55, 80, 45, 65].map((a) => /* @__PURE__ */ n.jsx(f.Skeleton, { className: "cms:h-5", style: { width: `${a}%` } }, a)) }) : O.length === 0 ? R = /* @__PURE__ */ n.jsx("p", { className: "cms:p-3 cms:text-sm cms:text-muted-foreground", children: u.q ? d("No terms match “:search”.", { search: u.q }) : d("Nothing to choose from yet.") }) : R = /* @__PURE__ */ n.jsxs("div", { className: `cms:max-h-72 cms:overflow-y-auto cms:overscroll-contain cms:p-1 ${xe ? "cms:opacity-60" : ""}`, onScroll: es, children: [
    /* @__PURE__ */ n.jsx("div", { role: "listbox", id: he, "aria-label": d("Terms"), "aria-multiselectable": t || void 0, "aria-busy": xe || void 0, children: O.map((a, j) => {
      const _ = g.includes(a.id), A = te(j), B = we(a.label, G[a.id]?.parents);
      return /* @__PURE__ */ n.jsxs(
        "div",
        {
          id: `${e}-option-${a.id}`,
          role: "option",
          "aria-selected": _,
          "aria-disabled": A || void 0,
          title: B,
          className: `cms:flex cms:cursor-default cms:items-center cms:gap-2 cms:rounded-sm cms:py-1.5 cms:pr-2 cms:text-sm cms:select-none ${j === S ? "cms:bg-accent cms:text-accent-foreground" : ""} ${A ? "cms:opacity-50" : ""}`,
          style: { paddingLeft: `${0.5 + Math.min(a.depth, 6) * 0.875}rem` },
          onMouseDown: (D) => D.preventDefault(),
          onMouseMove: () => {
            j !== S && W(j);
          },
          onClick: () => {
            A || pe(a.id);
          },
          children: [
            /* @__PURE__ */ n.jsx(fs, { className: `cms:size-4 cms:shrink-0 ${_ ? "" : "cms:invisible"}`, "aria-hidden": "true" }),
            /* @__PURE__ */ n.jsx("span", { className: "cms:min-w-0 cms:truncate", children: a.label })
          ]
        },
        a.id
      );
    }) }),
    u.more && /* @__PURE__ */ n.jsx(f.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:mt-1 cms:w-full", disabled: N, onMouseDown: (a) => a.preventDefault(), onClick: Z, children: N ? d("Loading…") : d("Load more") })
  ] }), /* @__PURE__ */ n.jsxs(f.Popover, { open: y, onOpenChange: Qe, children: [
    /* @__PURE__ */ n.jsxs(
      "div",
      {
        ref: H,
        "data-invalid": l || void 0,
        className: "cms:flex cms:w-full cms:max-w-xl cms:min-w-0 cms:[contain:inline-size] cms:flex-wrap cms:items-center cms:gap-1 cms:rounded-md cms:border cms:border-input/80 cms:bg-card cms:p-1 cms:shadow-xs cms:data-invalid:border-destructive cms:dark:bg-input/20",
        children: [
          g.map((a) => /* @__PURE__ */ n.jsxs(
            "span",
            {
              title: we(ne(a), G[a]?.parents ?? w[String(a)]),
              className: "cms:inline-flex cms:h-7 cms:max-w-full cms:min-w-0 cms:items-center cms:gap-0.5 cms:rounded-sm cms:bg-secondary cms:pl-2 cms:text-xs cms:font-medium cms:text-secondary-foreground",
              children: [
                /* @__PURE__ */ n.jsx("span", { className: `cms:min-w-0 cms:truncate ${ee ? "" : "cms:pr-2"}`, children: ne(a) }),
                ee && /* @__PURE__ */ n.jsx(
                  "button",
                  {
                    type: "button",
                    className: "cms:inline-flex cms:size-7 cms:shrink-0 cms:items-center cms:justify-center cms:rounded-sm cms:text-muted-foreground cms:hover:bg-muted cms:hover:text-foreground cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none",
                    "aria-label": d("Remove :term", { term: ne(a) }),
                    onClick: () => se(g.filter((j) => j !== a)),
                    children: /* @__PURE__ */ n.jsx(ps, { className: "cms:size-3", "aria-hidden": "true" })
                  }
                )
              ]
            },
            a
          )),
          /* @__PURE__ */ n.jsx(f.PopoverTrigger, { asChild: !0, children: /* @__PURE__ */ n.jsxs(
            "button",
            {
              ref: Y,
              id: e,
              type: "button",
              "aria-haspopup": "listbox",
              "aria-invalid": l || void 0,
              className: "cms:flex cms:h-7 cms:min-w-24 cms:flex-1 cms:items-center cms:justify-between cms:gap-1 cms:rounded-sm cms:px-2 cms:text-left cms:text-sm cms:text-muted-foreground cms:hover:bg-muted cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none cms:disabled:pointer-events-none cms:disabled:opacity-50",
              children: [
                /* @__PURE__ */ n.jsx("span", { className: "cms:truncate", children: g.length === 0 ? ss : t ? d("Add…") : d("Change…") }),
                /* @__PURE__ */ n.jsx(ze, { className: "cms:size-4 cms:shrink-0 cms:opacity-60", "aria-hidden": "true" })
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
        alignOffset: X?.alignOffset,
        sideOffset: X?.sideOffset,
        className: "cms:max-w-[calc(100vw-2rem)] cms:min-w-60 cms:p-0",
        style: { width: X?.width },
        onOpenAutoFocus: (a) => {
          a.preventDefault(), me.current?.focus();
        },
        children: [
          /* @__PURE__ */ n.jsxs("div", { className: "cms:relative cms:border-b cms:border-border/60", children: [
            /* @__PURE__ */ n.jsx(hs, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground", "aria-hidden": "true" }),
            /* @__PURE__ */ n.jsx(
              "input",
              {
                ref: me,
                type: "text",
                role: "combobox",
                "aria-expanded": "true",
                "aria-controls": he,
                "aria-autocomplete": "list",
                "aria-label": d("Search terms"),
                "aria-activedescendant": S >= 0 && O[S] ? `${e}-option-${O[S].id}` : void 0,
                className: "cms:h-10 cms:w-full cms:bg-transparent cms:pr-3 cms:pl-9 cms:text-sm cms:outline-none cms:placeholder:text-muted-foreground",
                placeholder: d("Search terms"),
                autoComplete: "off",
                value: p,
                onKeyDown: Ze,
                onChange: (a) => h(a.target.value)
              }
            )
          ] }),
          R,
          fe && c !== null && /* @__PURE__ */ n.jsx("p", { className: "cms:border-t cms:border-border/60 cms:px-3 cms:py-2 cms:text-xs cms:text-muted-foreground", children: d("Up to :max terms.", { max: c }) })
        ]
      }
    )
  ] });
}
const Le = (e, s = {}) => e.replace(/:([A-Za-z_]+)/g, (t, c) => s[c] ?? t), jt = 5;
let Rs = 0;
const le = () => `f${++Rs}`;
function Is(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function Ls(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^[0-9_]+/, "").replace(/_{2,}/g, "_").slice(0, 64);
}
function Pe(e, s) {
  const t = new Set(s.map((l) => l.handle)), c = Is(e) || "field";
  let r = c;
  for (let l = 2; t.has(r); l++)
    r = `${c}_${l}`;
  return r;
}
function Ps(e) {
  return (e ?? []).map(({ fields: s, ...t }) => ({
    ...t,
    key: le(),
    fields: Ps(s),
    handleTouched: !0,
    savedHandle: t.handle
  }));
}
function Fs(e, s) {
  return e.map(({ key: t, handleTouched: c, savedHandle: r, fields: l, ...o }) => ({
    ...o,
    validation: (o.validation ?? []).map((x) => x.trim()).filter((x) => x !== ""),
    ...s(o.type) ? { fields: Fs(l, s) } : {}
  }));
}
function wt(e, s, t) {
  return { key: le(), type: e, label: s, handle: Pe(s, t), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function kt(e) {
  return e.type !== "fieldset" && e.savedHandle !== void 0 && e.savedHandle !== "" && e.handle !== e.savedHandle ? e.savedHandle : null;
}
function Bs(e) {
  return e.map((s) => ({ ...s, savedHandle: s.handle, fields: Bs(s.fields) }));
}
function Nt(e, s, t) {
  if (e.handleTouched) return { ...e, label: s };
  const c = t.filter((r) => r.key !== e.key);
  return { ...e, label: s, handle: Pe(s || e.type, c) };
}
function Vs(e, s) {
  const t = `${s}.`, c = {};
  for (const [r, l] of Object.entries(e))
    r.startsWith(t) && (c[r.slice(t.length)] = l);
  return c;
}
function oe(e, s) {
  const t = e[s];
  return { ...Vs(e, s), ...t !== void 0 ? { "": t } : {} };
}
function $t(e, s) {
  return Object.keys(e).filter((t) => t === s || t.startsWith(`${s}.`));
}
function _t(e, s) {
  return Object.keys(e).some((t) => t === s || t.startsWith(`${s}.`));
}
function St(e, s) {
  return s.filter((t) => t.key !== e.key && t.handle !== "" && t.type !== "fieldset");
}
function At(e, s, t, c = Le) {
  return e.type === "fieldset" ? null : t?.includes(e.handle) ? c('":handle" is used by the content itself; choose another handle.', { handle: e.handle }) : e.handle !== "" && s.some((r) => r.key !== e.key && r.type !== "fieldset" && r.handle === e.handle) ? c('There is already a field ":handle" here.', { handle: e.handle }) : null;
}
function Ct(e, s) {
  return typeof e.translatable == "boolean" ? e.translatable : s;
}
function Tt(e, s, t) {
  return { ...e, translatable: s === t ? null : s };
}
function Us(e, s, t = []) {
  const c = /* @__PURE__ */ new Set([...s.map((o) => o.handle), ...t]), r = `${(Ls(e) || "field").slice(0, 56)}_copy`;
  let l = r;
  for (let o = 2; c.has(l); o++)
    l = `${r}_${o}`;
  return l;
}
function Fe(e) {
  const { key: s, savedHandle: t, fields: c, ...r } = e;
  return { ...structuredClone(r), key: le(), fields: c.map(Fe) };
}
function Et(e, s, t = [], c = Le) {
  const r = e[s];
  if (r === void 0) return null;
  const l = r.label || r.handle, o = {
    ...Fe(r),
    label: c(":label (copy)", { label: l }),
    handle: r.type === "fieldset" ? r.handle : Us(r.handle, e, t),
    handleTouched: !0
  };
  return { fields: [...e.slice(0, s + 1), o, ...e.slice(s + 1)], copy: o };
}
function Ks(e, s) {
  const t = e.condition;
  return !t || "rules" in t ? null : (t.operator === "filled" || t.operator === "equals" && (t.value === !0 || t.value === "true")) && s.some((r) => r.handle === t.field && r.type === "toggle") ? t.field : null;
}
function Ot(e) {
  const s = (o) => o.type === "number" || o.type === "text" && (o.instructions ?? "").length <= 60, t = (o) => o.type === "text" && Ns.includes(o.handle), c = {}, r = [];
  for (const o of e) {
    const x = Ks(o, e);
    x === null ? r.push(o) : (c[x] ??= []).push(o);
  }
  const l = r.filter((o) => !t(o));
  return { options: l.filter((o) => !s(o)), limits: l.filter(s), appearance: r.filter(t), dependents: c };
}
const Gs = ["html", "css", "javascript", "json", "plain"];
function Ws(e) {
  const s = e.config?.language;
  return typeof s == "string" && Gs.includes(s) ? s : "plain";
}
const Dt = [
  { value: "equals", label: "is", needsValue: !0 },
  { value: "not_equals", label: "is not", needsValue: !0 },
  { value: "filled", label: "is filled in", needsValue: !1 },
  { value: "empty", label: "is empty", needsValue: !1 }
];
function ke(e) {
  return e === !0 ? "true" : e === !1 ? "false" : typeof e == "string" || typeof e == "number" ? String(e) : "";
}
function Xs(e) {
  return e ? "rules" in e ? Array.isArray(e.rules) ? e.rules : [] : [e] : [];
}
function Ys(e) {
  return e && "rules" in e && e.match === "any" ? "any" : "all";
}
function qt(e, s) {
  return e.length === 0 ? null : e.length === 1 ? e[0] : { match: s, rules: e };
}
function Ne(e, s) {
  const t = s[e.field], c = t != null && t !== "" && t !== !1 && !(Array.isArray(t) && t.length === 0), r = (Array.isArray(t) ? t : [t]).map(ke).includes(ke(e.value));
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
function Js(e, s) {
  const t = Xs(e.condition);
  return t.length === 0 ? !0 : Ys(e.condition) === "any" ? t.some((c) => Ne(c, s)) : t.every((c) => Ne(c, s));
}
function zt(e) {
  const s = e?.config ?? {};
  switch (e?.type) {
    case "select": {
      const t = (Array.isArray(s.options) ? s.options : []).flatMap((c) => {
        if (typeof c == "string" && c !== "") return [{ value: c, label: c }];
        if (c && typeof c == "object" && typeof c.value == "string" && c.value !== "") {
          const { value: r, label: l } = c;
          return [{ value: r, label: typeof l == "string" && l !== "" ? l : r }];
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
function Ht(e) {
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
const Qs = [25, 33, 50, 66, 75, 100];
function Zs(e) {
  return Qs.find((s) => s === e.width) ?? 100;
}
function et(e = "cms:gap-x-4 cms:gap-y-6") {
  return `cms:@container cms:grid cms:grid-cols-12 cms:items-start ${e}`;
}
const st = {
  25: "cms:@lg:col-span-3",
  33: "cms:@lg:col-span-4",
  50: "cms:@lg:col-span-6",
  66: "cms:@lg:col-span-8",
  75: "cms:@lg:col-span-9",
  100: ""
};
function $e(e) {
  return `cms:col-span-12 cms:min-w-0 ${st[Zs(e)]}`.trim();
}
function Mt(e, s) {
  const { width: t, ...c } = e;
  return s === 100 ? c : { ...c, width: s };
}
const ce = "__none";
function ae(e) {
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
const tt = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function Be(e) {
  if (e.label) return e.label;
  const s = e.handle.replace(/_/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function _e({ field: e, value: s, onChange: t, errors: c, id: r, content: l = !1, fill: o = !1, marker: x = null, shared: m = e.shared === !0 }) {
  const w = Be(e), g = tt.includes(e.type) || ["select", "terms"].includes(e.type) && e.config?.multiple === !0, y = c[""] !== void 0, i = ks.includes(e.type), p = e.instructions && e.instructions.trim() !== "" ? /* @__PURE__ */ n.jsx($s, { id: `${r}-help`, text: e.instructions }) : null, h = m ? /* @__PURE__ */ n.jsx(Ss, { id: `${r}-shared` }) : null, { hint: u } = Me(e), { prefix: b, suffix: N } = Re(e), $ = [u && `${r}-hint`, b && `${r}-prefix`, N && `${r}-suffix`, p && `${r}-help`, h && `${r}-shared`, y && `${r}-error`].filter(Boolean).join(" ") || void 0;
  return /* @__PURE__ */ n.jsxs(
    "div",
    {
      className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2",
      ...g ? { role: "group", "aria-labelledby": `${r}-label`, ...y ? { "aria-invalid": !0 } : {}, ...y || p || h ? { "aria-describedby": [p && `${r}-help`, h && `${r}-shared`, y && `${r}-error`].filter(Boolean).join(" ") } : {} } : {},
      children: [
        e.type === "toggle" ? /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
          /* @__PURE__ */ n.jsx(f.Switch, { id: r, checked: s === !0, "aria-describedby": $, onCheckedChange: (k) => t(k) }),
          /* @__PURE__ */ n.jsx(f.Label, { htmlFor: r, className: "cms:min-w-0", children: w }),
          x,
          /* @__PURE__ */ n.jsx(ye, { field: e, id: r, label: w })
        ] }) : /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:min-h-4 cms:min-w-0 cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ n.jsxs(f.Label, { id: `${r}-label`, htmlFor: g ? void 0 : r, className: "cms:min-w-0", children: [
            w,
            e.required && /* @__PURE__ */ n.jsx("span", { className: "cms:text-destructive", children: " *" }),
            x
          ] }),
          /* @__PURE__ */ n.jsx(ye, { field: e, id: r, label: w })
        ] }),
        i && p,
        i && h,
        /* @__PURE__ */ n.jsx(rt, { field: e, value: s, onChange: t, errors: c, id: r, content: l, fill: o, describedBy: $ }),
        ["text", "textarea", "code"].includes(e.type) && E(e, "max") !== void 0 && /* @__PURE__ */ n.jsx(nt, { length: typeof s == "string" ? [...s].length : 0, max: E(e, "max") ?? 0 }),
        !i && p,
        !i && h,
        /* @__PURE__ */ n.jsx(K, { message: c[""], id: `${r}-error` })
      ]
    }
  );
}
function nt({ length: e, max: s }) {
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
function rt({ field: e, value: s, onChange: t, errors: c, id: r, content: l, fill: o = !1, describedBy: x }) {
  const m = c[""] !== void 0, { prefix: w, suffix: g } = Re(e), y = w !== null || g !== null;
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
          "aria-describedby": x,
          value: typeof s == "string" ? s : "",
          rows: E(e, "rows") ?? 4,
          placeholder: L(e, "placeholder"),
          onChange: (i) => t(i.target.value)
        }
      );
    case "code":
      return /* @__PURE__ */ n.jsx(
        f.CodeEditor,
        {
          id: r,
          "aria-labelledby": `${r}-label`,
          "aria-describedby": x,
          invalid: m,
          language: Ws(e),
          value: typeof s == "string" ? s : "",
          placeholder: L(e, "placeholder"),
          onChange: (i) => t(i)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ n.jsx(f.RichTextEditor, { id: r, labelledBy: `${r}-label`, invalid: m, value: typeof s == "string" ? s : "", onChange: t });
    case "number": {
      const i = ls(s);
      return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ n.jsx(ve, { prefix: w, suffix: g, id: r, className: o ? "" : "cms:max-w-64", children: /* @__PURE__ */ n.jsx(
          f.Input,
          {
            id: r,
            type: "number",
            className: y ? je : o ? "cms:w-full" : "cms:max-w-48",
            placeholder: L(e, "placeholder"),
            "aria-invalid": m,
            "aria-describedby": [x, i && `${r}-grouped`].filter(Boolean).join(" ") || void 0,
            value: typeof s == "number" ? String(s) : typeof s == "string" ? s : "",
            min: E(e, "min"),
            max: E(e, "max"),
            step: E(e, "step") ?? "any",
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
          value: ge(as(s, i)),
          onChange: (p) => t(ge(p ?? ""))
        }
      );
    }
    case "select":
      return e.config?.multiple === !0 ? /* @__PURE__ */ n.jsx(
        at,
        {
          options: ae(e),
          value: Array.isArray(s) ? s.map(String) : [],
          onChange: t,
          invalid: m,
          empty: typeof e.config?.empty == "string" ? e.config.empty : void 0,
          inTickOrder: e.config?.in_tick_order === !0
        }
      ) : /* @__PURE__ */ n.jsx(
        ct,
        {
          options: ae(e),
          value: typeof s == "string" ? s : null,
          onChange: t,
          id: r,
          fill: o,
          empty: cs(ae(e), e.required === !0, typeof e.config?.default == "string" && e.config.default !== "", typeof s == "string" && s !== "")
        }
      );
    case "terms": {
      const i = e.config?.multiple === !0, p = Array.isArray(s) ? s.filter((h) => typeof h == "number") : typeof s == "number" ? s : null;
      return /* @__PURE__ */ n.jsx(
        Ms,
        {
          id: r,
          taxonomy: typeof e.taxonomy == "string" ? e.taxonomy : null,
          multiple: i,
          max: E(e, "max") ?? null,
          required: e.required === !0,
          invalid: m,
          value: i ? Array.isArray(p) ? p : [] : typeof p == "number" ? p : null,
          onChange: t
        }
      );
    }
    case "entries":
      return /* @__PURE__ */ n.jsx(
        Ae,
        {
          id: r,
          invalid: m,
          multiple: e.config?.multiple === !0,
          max: E(e, "max") ?? null,
          collections: e.collections ?? [],
          onChange: t,
          value: typeof s == "number" || Array.isArray(s) && s.every((i) => typeof i == "number") ? s : null
        }
      );
    case "link":
      return /* @__PURE__ */ n.jsx(
        lt,
        {
          label: Be(e),
          value: q(s),
          onChange: t,
          errors: c,
          id: r,
          collections: e.collections ?? [],
          placeholder: L(e, "placeholder"),
          describedBy: x
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
          max: E(e, "max") ?? null,
          types: Array.isArray(e.config?.types) ? e.config.types : [],
          value: typeof s == "number" || Array.isArray(s) && s.every((i) => typeof i == "number") ? s : null,
          onChange: t
        }
      );
    case "group":
      return /* @__PURE__ */ n.jsx(ie, { fields: e.fields ?? [], value: q(s), onChange: t, errors: c, id: r, content: l });
    case "repeater":
      return /* @__PURE__ */ n.jsx(ot, { field: e, value: Array.isArray(s) ? s : [], onChange: t, errors: c, id: r, content: l });
    case "flexible":
      return /* @__PURE__ */ n.jsx(it, { field: e, value: Array.isArray(s) ? s : [], onChange: t, errors: c, id: r });
    default:
      return /* @__PURE__ */ n.jsx(ve, { prefix: w, suffix: g, id: r, children: /* @__PURE__ */ n.jsx(
        f.Input,
        {
          id: r,
          "aria-invalid": m,
          "aria-describedby": x,
          className: y ? je : void 0,
          value: typeof s == "string" ? s : "",
          placeholder: L(e, "placeholder"),
          onChange: (i) => t(i.target.value)
        }
      ) });
  }
}
function E(e, s) {
  const t = e.config?.[s];
  return typeof t == "number" ? t : void 0;
}
function L(e, s) {
  const t = e.config?.[s];
  return typeof t == "string" ? t : void 0;
}
function ie({ fields: e, value: s, onChange: t, errors: c, id: r, content: l, bare: o = !1 }) {
  const x = /* @__PURE__ */ n.jsx("div", { className: et(o ? void 0 : "cms:gap-4"), children: e.filter((m) => Js(m, s)).map((m) => m.shared ? (
    // Greyed out, with where to edit it under it.
    /* @__PURE__ */ n.jsx("fieldset", { disabled: !0, className: `cms:flex cms:flex-col cms:gap-1 cms:opacity-60 ${$e(m)}`, children: /* @__PURE__ */ n.jsx(_e, { id: `${r}-${m.handle}`, field: m, value: s[m.handle], content: l, errors: {}, onChange: () => {
    }, shared: !0 }) }, m.handle)
  ) : /* @__PURE__ */ n.jsx("div", { className: $e(m), children: /* @__PURE__ */ n.jsx(
    _e,
    {
      id: `${r}-${m.handle}`,
      field: m,
      value: s[m.handle],
      content: l,
      errors: oe(c, m.handle),
      onChange: (w) => t({ ...s, [m.handle]: w })
    }
  ) }, m.handle)) });
  return o ? x : /* @__PURE__ */ n.jsx("div", { className: "cms:rounded-lg cms:border cms:p-4", children: x });
}
function ct({ options: e, value: s, onChange: t, id: c, empty: r, fill: l = !1 }) {
  return /* @__PURE__ */ n.jsxs(f.Select, { value: s ?? ce, onValueChange: (o) => t(o === ce ? null : o), children: [
    /* @__PURE__ */ n.jsx(f.SelectTrigger, { id: c, className: l ? "cms:w-full" : "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ n.jsx(f.SelectValue, {}) }),
    /* @__PURE__ */ n.jsxs(f.SelectContent, { children: [
      r && /* @__PURE__ */ n.jsx(f.SelectItem, { value: ce, children: d("None") }),
      e.map((o) => /* @__PURE__ */ n.jsx(f.SelectItem, { value: o.value, children: o.label }, o.value))
    ] })
  ] });
}
function at({ options: e, value: s, onChange: t, empty: c, inTickOrder: r = !1, invalid: l = !1 }) {
  return e.length === 0 ? /* @__PURE__ */ n.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: c ?? d("Nothing to choose from yet.") }) : /* @__PURE__ */ n.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2", children: e.map((o) => /* @__PURE__ */ n.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
    /* @__PURE__ */ n.jsx(
      f.Checkbox,
      {
        checked: s.includes(o.value),
        "aria-invalid": l || void 0,
        onCheckedChange: (x) => t(x ? r ? [...s.filter((m) => m !== o.value), o.value] : e.map((m) => m.value).filter((m) => m === o.value || s.includes(m)) : s.filter((m) => m !== o.value))
      }
    ),
    o.label,
    r && s.includes(o.value) && /* @__PURE__ */ n.jsxs("span", { className: "cms:text-xs cms:text-muted-foreground", "aria-label": `number ${s.indexOf(o.value) + 1}`, children: [
      "#",
      s.indexOf(o.value) + 1
    ] })
  ] }, o.value)) });
}
function lt({ label: e, value: s, onChange: t, errors: c, id: r, collections: l, placeholder: o, describedBy: x }) {
  const [m, w] = v.useState(s.type === "entry" ? "entry" : "url"), g = s.type === "entry" || s.type === "url" ? s.type : m, y = v.useRef({}), i = (h) => t(ds({ ...s, type: g, ...h })), p = (h) => {
    if (h === g) return;
    const u = us(s, g, h, y.current);
    y.current = u.remembered, w(h), t(u.value);
  };
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ n.jsx("div", { role: "radiogroup", "aria-label": d(":field: link to", { field: e }), className: "cms:inline-flex cms:w-fit cms:rounded-md cms:border cms:p-0.5", children: ["url", "entry"].map((h) => /* @__PURE__ */ n.jsx(
      f.Button,
      {
        type: "button",
        size: "sm",
        role: "radio",
        "aria-checked": g === h,
        variant: g === h ? "secondary" : "ghost",
        onClick: () => p(h),
        children: h === "url" ? d("Address") : d("Entry")
      },
      h
    )) }),
    /* @__PURE__ */ n.jsxs("div", { className: "cms:grid cms:gap-2 cms:md:grid-cols-[2fr_1fr_auto] cms:md:items-start", children: [
      g === "url" ? /* @__PURE__ */ n.jsx(
        f.Input,
        {
          id: r,
          "aria-label": d(":field: address", { field: e }),
          placeholder: o || d("https://… or /about"),
          "aria-describedby": x,
          value: typeof s.url == "string" ? s.url : "",
          onChange: (h) => i({ url: h.target.value }),
          "aria-invalid": c.url !== void 0
        }
      ) : /* @__PURE__ */ n.jsx(
        Ae,
        {
          id: r,
          invalid: c.entry_id !== void 0,
          multiple: !1,
          max: null,
          collections: l,
          value: typeof s.entry_id == "number" ? s.entry_id : null,
          onChange: (h) => i({ entry_id: typeof h == "number" ? h : void 0 })
        }
      ),
      /* @__PURE__ */ n.jsx(
        f.Input,
        {
          "aria-label": d(":field: link text", { field: e }),
          placeholder: g === "entry" ? d("Link text (the entry's title)") : d("Link text"),
          value: typeof s.label == "string" ? s.label : "",
          onChange: (h) => i({ label: h.target.value })
        }
      ),
      /* @__PURE__ */ n.jsxs("label", { className: "cms:flex cms:h-9 cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ n.jsx(f.Checkbox, { checked: s.new_tab === !0, onCheckedChange: (h) => i({ new_tab: h }) }),
        d("New tab")
      ] }),
      /* @__PURE__ */ n.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ n.jsx(K, { message: c.url ?? c.entry_id ?? c.label ?? c.type }) })
    ] })
  ] });
}
function Se(e, s) {
  return !s && (e.fields ?? []).every((t) => t.type === "text");
}
function Ve(e) {
  const s = v.useRef([]);
  return s.current = ms(s.current, e), {
    keys: s.current,
    remove: (t) => {
      s.current = s.current.filter((c, r) => r !== t);
    },
    move: (t, c) => {
      s.current = f.moveItem(s.current, t, c);
    }
  };
}
function Ue() {
  const [e, s] = v.useState(() => /* @__PURE__ */ new Set());
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
function Ke({ keys: e, folding: s }) {
  if (e.length < 2) return null;
  const t = s.anyOpen(e);
  return /* @__PURE__ */ n.jsxs(f.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => s.setAll(e, t), children: [
    t ? /* @__PURE__ */ n.jsx(bs, {}) : /* @__PURE__ */ n.jsx(ze, {}),
    " ",
    t ? d("Collapse all") : d("Expand all")
  ] });
}
function ot({ field: e, value: s, onChange: t, errors: c, id: r, content: l = !1 }) {
  const o = e.fields ?? [], x = s.map(q), m = Ve(x.length), w = (u, b) => t(x.map((N, $) => $ === u ? b : N)), g = (u) => {
    m.remove(u), t(x.filter((b, N) => N !== u));
  }, y = e.label ? e.label.toLowerCase().replace(/s$/, "") : d("row"), i = y.charAt(0).toUpperCase() + y.slice(1), p = x.map((u, b) => ({ row: u, index: b, key: m.keys[b] ?? String(b) })), h = Ue();
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ n.jsx(
      f.SortableList,
      {
        items: p,
        getId: (u) => u.key,
        getLabel: (u) => `${y} ${u.index + 1}`,
        onReorder: (u, b, N) => {
          m.move(b, N), t(u.map(($) => $.row));
        },
        children: ({ row: u, index: b, key: N }, { handle: $ }) => Se(e, l) ? /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
          /* @__PURE__ */ n.jsx(f.SortableHandle, { ...$, label: d("Move :item :number", { item: y, number: b + 1 }), className: "cms:mt-1" }),
          o.map((k) => /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
            /* @__PURE__ */ n.jsx(
              f.Input,
              {
                "aria-label": k.label || k.handle,
                placeholder: k.label || k.handle,
                value: typeof u[k.handle] == "string" ? u[k.handle] : "",
                onChange: (C) => w(b, { ...u, [k.handle]: C.target.value })
              }
            ),
            /* @__PURE__ */ n.jsx(K, { message: c[`${b}.${k.handle}`] })
          ] }, k.handle)),
          /* @__PURE__ */ n.jsx(f.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": d("Remove :item :number", { item: y, number: b + 1 }), onClick: () => g(b), children: /* @__PURE__ */ n.jsx(Ee, {}) })
        ] }) : (() => {
          const k = oe(c, String(b)), C = h.isCollapsed(N, Object.keys(k).length > 0);
          return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ n.jsx(
              Ge,
              {
                label: `${i} ${b + 1}`,
                summary: Ce(o, u),
                handle: $,
                onRemove: () => g(b),
                collapsed: C,
                onToggle: () => h.toggle(N),
                controls: `${r}-${b}-fields`,
                hidden: l ? u._hidden === !0 : void 0,
                onHidden: (z) => w(b, { ...u, _hidden: z })
              }
            ),
            /* @__PURE__ */ n.jsx("div", { id: `${r}-${b}-fields`, hidden: C, children: !C && /* @__PURE__ */ n.jsx(ie, { fields: o, value: u, onChange: (z) => w(b, z), errors: k, id: `${r}-${b}`, content: l }) })
          ] });
        })()
      }
    ),
    /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ n.jsxs(f.Button, { type: "button", variant: "outline", size: "sm", onClick: () => t([...x, l ? is() : {}]), children: [
        /* @__PURE__ */ n.jsx(Te, {}),
        " ",
        d("Add :item", { item: y })
      ] }),
      !Se(e, l) && /* @__PURE__ */ n.jsx(Ke, { keys: p.map((u) => u.key), folding: h })
    ] })
  ] });
}
function it({ field: e, value: s, onChange: t, errors: c, id: r }) {
  const l = e.blocks ?? [], o = s.map(q), x = Ve(o.length), m = (i, p) => t(o.map((h, u) => u === i ? p : h)), w = (i) => {
    x.remove(i), t(o.filter((p, h) => h !== i));
  }, g = o.map((i, p) => ({ block: i, index: p, key: x.keys[p] ?? String(p) })), y = Ue();
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    /* @__PURE__ */ n.jsx(
      f.SortableList,
      {
        items: g,
        getId: (i) => i.key,
        className: "cms:gap-3",
        getLabel: (i) => d(":type block", { type: l.find((p) => p.type === i.block.type)?.label ?? String(i.block.type) }),
        onReorder: (i, p, h) => {
          x.move(p, h), t(i.map((u) => u.block));
        },
        children: ({ block: i, index: p, key: h }, { handle: u }) => {
          const b = l.find((k) => k.type === i.type), N = oe(c, `${p}.values`), $ = y.isCollapsed(h, Object.keys(N).length > 0 || c[`${p}.type`] !== void 0);
          return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ n.jsx(
              Ge,
              {
                label: b?.label ?? String(i.type),
                summary: b ? Ce(b.fields, q(i.values)) : null,
                badge: !0,
                handle: u,
                onRemove: () => w(p),
                collapsed: $,
                onToggle: () => y.toggle(h),
                controls: `${r}-${p}-fields`,
                hidden: i.hidden === !0,
                onHidden: (k) => m(p, { ...i, hidden: k })
              }
            ),
            /* @__PURE__ */ n.jsx("div", { id: `${r}-${p}-fields`, hidden: $, children: $ ? null : b ? /* @__PURE__ */ n.jsx(
              ie,
              {
                fields: b.fields,
                value: q(i.values),
                onChange: (k) => m(p, { ...i, values: k }),
                errors: N,
                id: `${r}-${p}`,
                content: !0
              }
            ) : /* @__PURE__ */ n.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: d("This kind of block no longer exists. Its values are kept.") }) }),
            /* @__PURE__ */ n.jsx(K, { message: c[`${p}.type`] })
          ] });
        }
      }
    ),
    /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ n.jsxs(f.DropdownMenu, { children: [
        /* @__PURE__ */ n.jsx(f.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ n.jsxs(f.Button, { type: "button", variant: "outline", size: "sm", disabled: l.length === 0, children: [
          /* @__PURE__ */ n.jsx(Te, {}),
          " ",
          d("Add block")
        ] }) }),
        /* @__PURE__ */ n.jsx(f.DropdownMenuContent, { align: "start", children: l.map((i) => /* @__PURE__ */ n.jsx(f.DropdownMenuItem, { onSelect: () => t([...o, os(i.type)]), children: i.label }, i.type)) })
      ] }),
      /* @__PURE__ */ n.jsx(Ke, { keys: g.map((i) => i.key), folding: y })
    ] })
  ] });
}
function Ge({ label: e, summary: s, badge: t = !1, handle: c, onRemove: r, collapsed: l, onToggle: o, controls: x, hidden: m, onHidden: w }) {
  const g = l ? xs : gs, y = s ? `${e}: ${s}` : e;
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ n.jsx(f.SortableHandle, { ...c, label: d("Move :title", { title: y }) }),
    /* @__PURE__ */ n.jsxs(
      "button",
      {
        type: "button",
        onClick: o,
        "aria-expanded": !l,
        "aria-controls": x,
        className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:rounded-md cms:text-left cms:outline-none cms:focus-visible:ring-2 cms:focus-visible:ring-ring",
        children: [
          /* @__PURE__ */ n.jsx(g, { className: "cms:size-4 cms:shrink-0 cms:text-muted-foreground", "aria-hidden": !0 }),
          t ? /* @__PURE__ */ n.jsx(f.Badge, { variant: "secondary", children: e }) : /* @__PURE__ */ n.jsx("span", { className: "cms:shrink-0 cms:text-sm cms:font-medium", children: e }),
          s && /* @__PURE__ */ n.jsx("span", { className: "cms:truncate cms:text-sm cms:text-muted-foreground", children: s }),
          /* @__PURE__ */ n.jsx("span", { className: "cms:sr-only", children: l ? d("(collapsed)") : "" })
        ]
      }
    ),
    m !== void 0 && /* @__PURE__ */ n.jsxs("label", { className: "cms:flex cms:shrink-0 cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", title: d("Off: kept here, but left out of the page"), children: [
      /* @__PURE__ */ n.jsx(f.Switch, { checked: !m, onCheckedChange: (i) => w(!i), "aria-label": d(":title: visible on site", { title: y }) }),
      d("Visible on site")
    ] }),
    /* @__PURE__ */ n.jsx(
      f.Button,
      {
        type: "button",
        variant: "ghost",
        size: "icon",
        className: "cms:size-8 cms:shrink-0 cms:text-destructive",
        "aria-label": d("Remove :title", { title: y }),
        onClick: r,
        children: /* @__PURE__ */ n.jsx(Ee, {})
      }
    )
  ] });
}
export {
  ie as A,
  $t as B,
  gs as C,
  _s as D,
  Js as E,
  _e as F,
  $e as G,
  et as H,
  ze as I,
  $s as J,
  Be as K,
  ye as L,
  jt as M,
  Me as N,
  Dt as O,
  Ss as S,
  Ms as T,
  At as a,
  oe as b,
  Ls as c,
  Et as d,
  Vs as e,
  Zs as f,
  kt as g,
  _t as h,
  Ct as i,
  Tt as j,
  Qs as k,
  St as l,
  Xs as m,
  wt as n,
  Ys as o,
  zt as p,
  Ht as q,
  Nt as r,
  Ot as s,
  qt as t,
  Ps as u,
  Is as v,
  Mt as w,
  Fs as x,
  Bs as y,
  zs as z
};
