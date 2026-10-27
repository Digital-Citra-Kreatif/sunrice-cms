import { j as n, t as d, r as Je, a as Qe } from "./admin-DOytNhi-.js";
import { c as B, _ as w } from "./createLucideIcon-Ccbp7F45.js";
import { u as f } from "./ui-Dh5wfMwT.js";
import { t as Ze, a as O, E as $e, o as es, d as pe, b as ss, g as ts, i as _e, n as ns, c as rs, s as cs, e as as, l as ls } from "./EntriesPicker-CLrWeR83.js";
import { F as V } from "./FieldError-HMA8utBI.js";
import { C as os } from "./check-OeKFYRnl.js";
import { X as is } from "./EntryStatus-Duw-1dIJ.js";
import { S as ms } from "./search-3zKi7F1_.js";
import { P as Se } from "./plus-COqahUZ2.js";
import { T as Ae } from "./Confirm-CLMxWuYj.js";
import { C as us } from "./chevron-right-9qVV6b-Q.js";
const Ce = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
Ce.node;
const ds = B(Ce);
const Te = {
  name: "chevrons-down-up",
  size: 24,
  node: [
    ["path", { d: "m7 20 5-5 5 5", key: "13a0gw" }],
    ["path", { d: "m7 4 5 5 5-5", key: "1kwcof" }]
  ]
};
Te.node;
const fs = B(Te);
const Ee = {
  name: "chevrons-up-down",
  size: 24,
  node: [
    ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
    ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
  ]
};
Ee.node;
const De = B(Ee);
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
const ps = B(Me), hs = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
function P(e) {
  return e.replace(/[&<>"']/g, (s) => hs[s] ?? s);
}
function xs(e) {
  return /[\u0000- \u007f]/.test(e) ? !1 : /^(https?:\/\/[^/]|mailto:|tel:|\/(?![/\\])|#)/i.test(e);
}
const he = new RegExp("`([^`\\n]+)`|\\[([^\\]\\n]+)\\]\\(((?:[^()\\s]|\\([^()\\s]*\\))+)\\)|\\*\\*(?=\\S)(.+?)(?<=\\S)\\*\\*|\\*(?=[^\\s*])([^*\\n]+?)(?<=\\S)\\*");
function F(e, s = !1) {
  let t = "", c = e;
  for (let r = he.exec(c); r !== null; r = he.exec(c)) {
    t += P(c.slice(0, r.index));
    const [l, o, x, m, j, g] = r;
    o !== void 0 ? t += `<code>${P(o)}</code>` : x !== void 0 && m !== void 0 ? t += s || !xs(m) ? F(x, s) : `<a href="${P(m)}" target="_blank" rel="noopener noreferrer">${F(x, !0)}</a>` : j !== void 0 ? t += `<strong>${F(j, s)}</strong>` : g !== void 0 ? t += `<em>${F(g, s)}</em>` : t += P(l), c = c.slice(r.index + l.length);
  }
  return t + P(c);
}
const gs = ["text", "number"], bs = ["group", "repeater", "flexible"], ys = ["placeholder", "prefix", "suffix"];
function R(e) {
  return typeof e == "string" && e.trim() !== "" ? e.trim() : null;
}
function Oe(e) {
  return { hint: R(e.hint), tooltip: R(e.hint_tooltip) };
}
function qe(e) {
  return gs.includes(e.type) ? { prefix: R(e.config?.prefix), suffix: R(e.config?.suffix) } : { prefix: null, suffix: null };
}
function xe({ field: e, id: s, label: t, maxWidth: c = "cms:max-w-[60%]" }) {
  const { hint: r, tooltip: l } = Oe(e);
  return r === null && l === null ? null : /* @__PURE__ */ n.jsxs("span", { className: `cms:ml-auto cms:flex ${c} cms:min-w-0 cms:shrink-0 cms:items-center cms:gap-1 cms:text-xs cms:leading-none cms:text-muted-foreground`, children: [
    r !== null && /* @__PURE__ */ n.jsx("span", { id: `${s}-hint`, className: "cms:min-w-0 cms:truncate cms:py-0.5", title: r, children: r }),
    l !== null && /* @__PURE__ */ n.jsxs(f.Tooltip, { children: [
      /* @__PURE__ */ n.jsx(f.TooltipTrigger, { asChild: !0, children: /* @__PURE__ */ n.jsx(
        "button",
        {
          type: "button",
          "aria-label": d("More about :field", { field: t }),
          className: "cms:-m-1 cms:inline-flex cms:shrink-0 cms:rounded-full cms:p-1 cms:text-muted-foreground cms:outline-none cms:hover:text-foreground cms:focus-visible:ring-2 cms:focus-visible:ring-ring",
          children: /* @__PURE__ */ n.jsx(ps, { className: "cms:size-3.5", "aria-hidden": !0 })
        }
      ) }),
      /* @__PURE__ */ n.jsx(f.TooltipContent, { className: "cms:max-w-xs cms:text-left cms:whitespace-pre-line", children: l })
    ] })
  ] });
}
function vs({ text: e, id: s, className: t = "" }) {
  return !e || e.trim() === "" ? null : /* @__PURE__ */ n.jsx(
    "p",
    {
      id: s,
      className: `cms:text-sm cms:text-muted-foreground cms:[overflow-wrap:anywhere] cms:[&_a]:font-medium cms:[&_a]:text-foreground cms:[&_a]:underline cms:[&_a]:underline-offset-2 cms:[&_a:hover]:text-primary cms:[&_code]:rounded cms:[&_code]:bg-muted cms:[&_code]:px-1 cms:[&_code]:font-mono cms:[&_code]:text-[0.8125rem] cms:[&_strong]:font-semibold cms:[&_strong]:text-foreground ${t}`.trim(),
      dangerouslySetInnerHTML: { __html: F(e) }
    }
  );
}
const js = w.createContext(null);
function ws({ id: e, className: s = "" }) {
  const t = w.useContext(js);
  return /* @__PURE__ */ n.jsx("p", { id: e, className: `cms:text-sm cms:text-muted-foreground ${s}`.trim(), children: t ? d("Not translatable: edit it in :language.", { language: t }) : d("Not translatable: edit it in the main language.") });
}
function ge({ prefix: e, suffix: s, id: t, className: c = "", children: r }) {
  if (e === null && s === null) return /* @__PURE__ */ n.jsx(n.Fragment, { children: r });
  const l = "cms:flex cms:shrink-0 cms:items-center cms:bg-muted/60 cms:px-3 cms:text-sm cms:whitespace-nowrap cms:text-muted-foreground cms:select-none";
  return /* @__PURE__ */ n.jsxs("div", { "data-slot": "input-group", className: `cms:flex cms:h-10 cms:w-full cms:min-w-0 cms:items-stretch cms:overflow-hidden cms:rounded-md cms:border cms:border-input/80 cms:bg-card cms:shadow-xs cms:transition-[border-color,box-shadow] cms:duration-150 cms:hover:border-ring/45 cms:focus-within:border-ring/70 cms:focus-within:ring-4 cms:focus-within:ring-ring-glow cms:has-[[aria-invalid=true]]:border-destructive cms:has-[[aria-invalid=true]]:ring-destructive/20 cms:has-disabled:cursor-not-allowed cms:has-disabled:opacity-50 cms:has-[[readonly]]:bg-muted/30 cms:dark:bg-input/20 ${c}`.trim(), children: [
    e !== null && /* @__PURE__ */ n.jsx("span", { id: `${t}-prefix`, className: `${l} cms:border-r cms:border-input/80`, children: e }),
    r,
    s !== null && /* @__PURE__ */ n.jsx("span", { id: `${t}-suffix`, className: `${l} cms:border-l cms:border-input/80`, children: s })
  ] });
}
const be = "cms:h-full cms:min-w-0 cms:flex-1 cms:rounded-none cms:border-0 cms:bg-transparent cms:shadow-none cms:hover:border-0 cms:focus-visible:ring-0 cms:aria-invalid:ring-0 cms:disabled:opacity-100 cms:dark:bg-transparent";
function ks(e) {
  return e === null ? [] : Array.isArray(e) ? e : [e];
}
function He(e, s, t) {
  return s && t !== null && e.length >= t;
}
function Ns(e, s, t, c) {
  return t ? e.includes(s) ? e.filter((r) => r !== s) : He(e, t, c) ? e.slice() : [...e, s] : [s];
}
function $s(e) {
  return e.slice(0, -1);
}
function _s(e, s) {
  return s ? e.slice() : e[0] ?? null;
}
function Ss(e, s, t, c = () => !1) {
  const r = s === "ArrowDown" || s === "Home" ? 1 : s === "ArrowUp" || s === "End" ? -1 : 0;
  if (r === 0 || t === 0) return e;
  let l = s === "Home" ? 0 : s === "End" ? t - 1 : e + r;
  for (s === "ArrowUp" && e === -1 && (l = t - 1); l >= 0 && l < t && c(l); ) l += r;
  return l >= 0 && l < t ? l : e;
}
function As(e, s) {
  const t = new Set(e.map((c) => c.id));
  return [...e, ...s.filter((c) => !t.has(c.id))];
}
function Cs(e) {
  const s = [], t = {};
  for (const c of e)
    s.length = Math.min(s.length, c.depth), t[c.id] = s.slice(), s.push(c.label);
  return t;
}
function ye(e, s) {
  return [...s ?? [], e].join(" › ");
}
const Ts = w.createContext({});
function Es(e) {
  const s = e.termParents;
  return s && typeof s == "object" && !Array.isArray(s) ? s : {};
}
async function te(e, s) {
  const t = await fetch(`${Qe("cms/terms/picker")}?${Ze(e)}`, { headers: { Accept: "application/json" }, credentials: "same-origin", signal: s });
  if (!t.ok) throw new Error(String(t.status));
  return await t.json();
}
function Ds({ id: e, taxonomy: s, multiple: t, max: c, required: r, invalid: l, value: o, onChange: x }) {
  const m = w.useContext(Ts), j = Es(Je.usePage().props), g = ks(o), [y, i] = w.useState(!1), [p, h] = w.useState(""), [u, b] = w.useState(null), [N, $] = w.useState(!1), [k, A] = w.useState(!1), [q, Ue] = w.useState(0), [U, Ke] = w.useState({}), [_, K] = w.useState(-1), G = w.useRef(!1), W = w.useRef(null), oe = w.useRef(null), X = p.trim(), H = w.useCallback((a, v) => {
    const S = v ? Cs(a) : {};
    Ke((M) => {
      const L = { ...M };
      for (const D of a) L[D.id] = { label: D.label, parents: S[D.id] ?? D.parents ?? M[D.id]?.parents };
      return L;
    });
  }, []), C = y && s ? X : null;
  w.useEffect(() => {
    if (C === null || s === null || oe.current === `${s}
${C}`) return;
    const a = new AbortController(), v = window.setTimeout(() => {
      te({ taxonomy: s, q: C }, a.signal).then((S) => {
        oe.current = `${s}
${C}`, b({ ...S, q: C }), H(S.items, C === ""), K(C !== "" && S.items.length > 0 ? 0 : -1), A(!1);
      }).catch((S) => {
        S instanceof DOMException && S.name === "AbortError" || A(!0);
      });
    }, C === "" ? 0 : 250);
    return () => {
      window.clearTimeout(v), a.abort();
    };
  }, [s, C, q, H]);
  const ie = (a) => m[String(a)] ?? U[a]?.label, Y = g.filter((a) => ie(a) === void 0).join(",");
  w.useEffect(() => {
    !s || Y === "" || te({ taxonomy: s, ids: Y.split(",").map(Number) }).then((a) => H(a.items, !1)).catch(() => {
    });
  }, [s, Y, H]);
  const J = () => {
    !s || !u?.more || N || u.q !== X || ($(!0), te({ taxonomy: s, q: u.q, offset: u.items.length }).then((a) => {
      const v = As(u.items, a.items);
      b({ items: v, more: a.more, q: u.q }), H(v, u.q === "");
    }).catch(() => A(!0)).finally(() => $(!1)));
  };
  if (w.useEffect(() => {
    _ >= 0 && u && document.getElementById(`${e}-option-${u.items[_]?.id}`)?.scrollIntoView({ block: "nearest" });
  }, [_, e, u]), !s) return /* @__PURE__ */ n.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: d("Choose a taxonomy for this field in its blueprint.") });
  const me = He(g, t, c), Q = t || !r, Z = (a) => x(_s(a, t)), ue = (a) => {
    Z(Ns(g, a, t, c)), t || i(!1);
  }, E = u?.items ?? [], ee = (a) => me && !g.includes(E[a]?.id ?? -1), se = (a) => ie(a) ?? d("Term #:id", { id: a }), Ge = (a) => {
    a || h(""), i(a);
  }, We = (a) => {
    if (a.key === "ArrowDown" || a.key === "ArrowUp") {
      a.preventDefault();
      const v = Ss(_, a.key, E.length, ee);
      a.key === "ArrowDown" && v === _ && _ === E.length - 1 && J(), K(v);
    } else if (a.key === "Enter") {
      a.preventDefault();
      const v = E[_];
      v && !ee(_) && ue(v.id);
    } else a.key === "Backspace" && p === "" && Q && g.length > 0 && (a.preventDefault(), Z($s(g)));
  }, Xe = (a) => {
    const v = a.currentTarget;
    v.scrollTop + v.clientHeight >= v.scrollHeight - 48 && J();
  }, Ye = t ? d("Choose terms…") : d("Choose a term…"), de = `${e}-listbox`, fe = u !== null && u.q !== X;
  let I;
  return k ? I = /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:items-start cms:gap-2 cms:p-3 cms:text-sm", children: [
    /* @__PURE__ */ n.jsx("p", { className: "cms:text-destructive", children: d("Terms could not be loaded.") }),
    /* @__PURE__ */ n.jsx(f.Button, { type: "button", variant: "outline", size: "sm", onClick: () => {
      A(!1), Ue((a) => a + 1);
    }, children: d("Try again") })
  ] }) : u === null ? I = /* @__PURE__ */ n.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:p-2", "aria-busy": "true", "aria-label": d("Loading terms"), children: [70, 55, 80, 45, 65].map((a) => /* @__PURE__ */ n.jsx(f.Skeleton, { className: "cms:h-5", style: { width: `${a}%` } }, a)) }) : E.length === 0 ? I = /* @__PURE__ */ n.jsx("p", { className: "cms:p-3 cms:text-sm cms:text-muted-foreground", children: u.q ? d("No terms match “:search”.", { search: u.q }) : d("Nothing to choose from yet.") }) : I = /* @__PURE__ */ n.jsxs("div", { className: `cms:max-h-72 cms:overflow-y-auto cms:overscroll-contain cms:p-1 ${fe ? "cms:opacity-60" : ""}`, onScroll: Xe, children: [
    /* @__PURE__ */ n.jsx("div", { role: "listbox", id: de, "aria-label": d("Terms"), "aria-multiselectable": t || void 0, "aria-busy": fe || void 0, children: E.map((a, v) => {
      const S = g.includes(a.id), M = ee(v), L = ye(a.label, U[a.id]?.parents);
      return /* @__PURE__ */ n.jsxs(
        "div",
        {
          id: `${e}-option-${a.id}`,
          role: "option",
          "aria-selected": S,
          "aria-disabled": M || void 0,
          title: L,
          className: `cms:flex cms:cursor-default cms:items-center cms:gap-2 cms:rounded-sm cms:py-1.5 cms:pr-2 cms:text-sm cms:select-none ${v === _ ? "cms:bg-accent cms:text-accent-foreground" : ""} ${M ? "cms:opacity-50" : ""}`,
          style: { paddingLeft: `${0.5 + Math.min(a.depth, 6) * 0.875}rem` },
          onMouseDown: (D) => D.preventDefault(),
          onMouseMove: () => {
            v !== _ && K(v);
          },
          onClick: () => {
            M || ue(a.id);
          },
          children: [
            /* @__PURE__ */ n.jsx(os, { className: `cms:size-4 cms:shrink-0 ${S ? "" : "cms:invisible"}`, "aria-hidden": "true" }),
            /* @__PURE__ */ n.jsx("span", { className: "cms:min-w-0 cms:truncate", children: a.label })
          ]
        },
        a.id
      );
    }) }),
    u.more && /* @__PURE__ */ n.jsx(f.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:mt-1 cms:w-full", disabled: N, onMouseDown: (a) => a.preventDefault(), onClick: J, children: N ? d("Loading…") : d("Load more") })
  ] }), /* @__PURE__ */ n.jsxs(f.Popover, { open: y, onOpenChange: Ge, children: [
    /* @__PURE__ */ n.jsx(f.PopoverAnchor, { asChild: !0, children: /* @__PURE__ */ n.jsxs(
      "div",
      {
        "data-terms-box": "",
        onPointerDownCapture: () => {
          G.current = !0;
        },
        onClickCapture: () => {
          setTimeout(() => {
            G.current = !1;
          }, 0);
        },
        "data-invalid": l || void 0,
        className: "cms:flex cms:w-full cms:max-w-xl cms:min-w-0 cms:[contain:inline-size] cms:flex-wrap cms:items-center cms:gap-1 cms:rounded-md cms:border cms:border-input/80 cms:bg-card cms:p-1 cms:shadow-xs cms:data-invalid:border-destructive cms:dark:bg-input/20",
        children: [
          g.map((a) => /* @__PURE__ */ n.jsxs(
            "span",
            {
              title: ye(se(a), U[a]?.parents ?? j[String(a)]),
              className: "cms:inline-flex cms:h-7 cms:max-w-full cms:min-w-0 cms:items-center cms:gap-0.5 cms:rounded-sm cms:bg-secondary cms:pl-2 cms:text-xs cms:font-medium cms:text-secondary-foreground",
              children: [
                /* @__PURE__ */ n.jsx("span", { className: `cms:min-w-0 cms:truncate ${Q ? "" : "cms:pr-2"}`, children: se(a) }),
                Q && /* @__PURE__ */ n.jsx(
                  "button",
                  {
                    type: "button",
                    className: "cms:inline-flex cms:size-7 cms:shrink-0 cms:items-center cms:justify-center cms:rounded-sm cms:text-muted-foreground cms:hover:bg-muted cms:hover:text-foreground cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none",
                    "aria-label": d("Remove :term", { term: se(a) }),
                    onMouseDown: (v) => {
                      y && v.preventDefault();
                    },
                    onClick: () => {
                      Z(g.filter((v) => v !== a)), y && W.current?.focus();
                    },
                    children: /* @__PURE__ */ n.jsx(is, { className: "cms:size-3", "aria-hidden": "true" })
                  }
                )
              ]
            },
            a
          )),
          /* @__PURE__ */ n.jsx(f.PopoverTrigger, { asChild: !0, children: /* @__PURE__ */ n.jsxs(
            "button",
            {
              id: e,
              type: "button",
              "aria-haspopup": "listbox",
              "aria-invalid": l || void 0,
              className: "cms:flex cms:h-7 cms:min-w-24 cms:flex-1 cms:items-center cms:justify-between cms:gap-1 cms:rounded-sm cms:px-2 cms:text-left cms:text-sm cms:text-muted-foreground cms:hover:bg-muted cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none cms:disabled:pointer-events-none cms:disabled:opacity-50",
              children: [
                /* @__PURE__ */ n.jsx("span", { className: "cms:truncate", children: g.length === 0 ? Ye : t ? d("Add…") : d("Change…") }),
                /* @__PURE__ */ n.jsx(De, { className: "cms:size-4 cms:shrink-0 cms:opacity-60", "aria-hidden": "true" })
              ]
            }
          ) })
        ]
      }
    ) }),
    /* @__PURE__ */ n.jsxs(
      f.PopoverContent,
      {
        side: "bottom",
        align: "start",
        sideOffset: 4,
        avoidCollisions: !1,
        className: "cms:max-w-[calc(100vw-2rem)] cms:p-0",
        style: { width: "var(--radix-popper-anchor-width)" },
        onInteractOutside: (a) => {
          (G.current || a.target instanceof Element && a.target.closest("[data-terms-box]")) && a.preventDefault();
        },
        onFocusOutside: (a) => {
          const v = a.target;
          (!(v instanceof Element) || v === document.body || v.closest("[data-terms-box]")) && a.preventDefault();
        },
        onOpenAutoFocus: (a) => {
          a.preventDefault(), W.current?.focus();
        },
        children: [
          /* @__PURE__ */ n.jsxs("div", { className: "cms:relative cms:border-b cms:border-border/60", children: [
            /* @__PURE__ */ n.jsx(ms, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground", "aria-hidden": "true" }),
            /* @__PURE__ */ n.jsx(
              "input",
              {
                ref: W,
                type: "text",
                role: "combobox",
                "aria-expanded": "true",
                "aria-controls": de,
                "aria-autocomplete": "list",
                "aria-label": d("Search terms"),
                "aria-activedescendant": _ >= 0 && E[_] ? `${e}-option-${E[_].id}` : void 0,
                className: "cms:h-10 cms:w-full cms:bg-transparent cms:pr-3 cms:pl-9 cms:text-sm cms:outline-none cms:placeholder:text-muted-foreground",
                placeholder: d("Search terms"),
                autoComplete: "off",
                value: p,
                onKeyDown: We,
                onChange: (a) => h(a.target.value)
              }
            )
          ] }),
          I,
          me && c !== null && /* @__PURE__ */ n.jsx("p", { className: "cms:border-t cms:border-border/60 cms:px-3 cms:py-2 cms:text-xs cms:text-muted-foreground", children: d("Up to :max terms.", { max: c }) })
        ]
      }
    )
  ] });
}
const Ie = (e, s = {}) => e.replace(/:([A-Za-z_]+)/g, (t, c) => s[c] ?? t), xt = 5;
let Ms = 0;
const ce = () => `f${++Ms}`;
function Os(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function qs(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^[0-9_]+/, "").replace(/_{2,}/g, "_").slice(0, 64);
}
function Pe(e, s) {
  const t = new Set(s.map((l) => l.handle)), c = Os(e) || "field";
  let r = c;
  for (let l = 2; t.has(r); l++)
    r = `${c}_${l}`;
  return r;
}
function Hs(e) {
  return (e ?? []).map(({ fields: s, ...t }) => ({
    ...t,
    key: ce(),
    fields: Hs(s),
    handleTouched: !0,
    savedHandle: t.handle
  }));
}
function Is(e, s) {
  return e.map(({ key: t, handleTouched: c, savedHandle: r, fields: l, ...o }) => ({
    ...o,
    validation: (o.validation ?? []).map((x) => x.trim()).filter((x) => x !== ""),
    ...s(o.type) ? { fields: Is(l, s) } : {}
  }));
}
function gt(e, s, t) {
  return { key: ce(), type: e, label: s, handle: Pe(s, t), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function bt(e) {
  return e.type !== "fieldset" && e.savedHandle !== void 0 && e.savedHandle !== "" && e.handle !== e.savedHandle ? e.savedHandle : null;
}
function Ps(e) {
  return e.map((s) => ({ ...s, savedHandle: s.handle, fields: Ps(s.fields) }));
}
function yt(e, s, t) {
  if (e.handleTouched) return { ...e, label: s };
  const c = t.filter((r) => r.key !== e.key);
  return { ...e, label: s, handle: Pe(s || e.type, c) };
}
function zs(e, s) {
  const t = `${s}.`, c = {};
  for (const [r, l] of Object.entries(e))
    r.startsWith(t) && (c[r.slice(t.length)] = l);
  return c;
}
function ae(e, s) {
  const t = e[s];
  return { ...zs(e, s), ...t !== void 0 ? { "": t } : {} };
}
function vt(e, s) {
  return Object.keys(e).filter((t) => t === s || t.startsWith(`${s}.`));
}
function jt(e, s) {
  return Object.keys(e).some((t) => t === s || t.startsWith(`${s}.`));
}
function wt(e, s) {
  return s.filter((t) => t.key !== e.key && t.handle !== "" && t.type !== "fieldset");
}
function kt(e, s, t, c = Ie) {
  return e.type === "fieldset" ? null : t?.includes(e.handle) ? c('":handle" is used by the content itself; choose another handle.', { handle: e.handle }) : e.handle !== "" && s.some((r) => r.key !== e.key && r.type !== "fieldset" && r.handle === e.handle) ? c('There is already a field ":handle" here.', { handle: e.handle }) : null;
}
function Nt(e, s) {
  return typeof e.translatable == "boolean" ? e.translatable : s;
}
function $t(e, s, t) {
  return { ...e, translatable: s === t ? null : s };
}
function Fs(e, s, t = []) {
  const c = /* @__PURE__ */ new Set([...s.map((o) => o.handle), ...t]), r = `${(qs(e) || "field").slice(0, 56)}_copy`;
  let l = r;
  for (let o = 2; c.has(l); o++)
    l = `${r}_${o}`;
  return l;
}
function ze(e) {
  const { key: s, savedHandle: t, fields: c, ...r } = e;
  return { ...structuredClone(r), key: ce(), fields: c.map(ze) };
}
function _t(e, s, t = [], c = Ie) {
  const r = e[s];
  if (r === void 0) return null;
  const l = r.label || r.handle, o = {
    ...ze(r),
    label: c(":label (copy)", { label: l }),
    handle: r.type === "fieldset" ? r.handle : Fs(r.handle, e, t),
    handleTouched: !0
  };
  return { fields: [...e.slice(0, s + 1), o, ...e.slice(s + 1)], copy: o };
}
function Ls(e, s) {
  const t = e.condition;
  return !t || "rules" in t ? null : (t.operator === "filled" || t.operator === "equals" && (t.value === !0 || t.value === "true")) && s.some((r) => r.handle === t.field && r.type === "toggle") ? t.field : null;
}
function St(e) {
  const s = (o) => o.type === "number" || o.type === "text" && (o.instructions ?? "").length <= 60, t = (o) => o.type === "text" && ys.includes(o.handle), c = {}, r = [];
  for (const o of e) {
    const x = Ls(o, e);
    x === null ? r.push(o) : (c[x] ??= []).push(o);
  }
  const l = r.filter((o) => !t(o));
  return { options: l.filter((o) => !s(o)), limits: l.filter(s), appearance: r.filter(t), dependents: c };
}
const Rs = ["html", "css", "javascript", "json", "plain"];
function Bs(e) {
  const s = e.config?.language;
  return typeof s == "string" && Rs.includes(s) ? s : "plain";
}
const At = [
  { value: "equals", label: "is", needsValue: !0 },
  { value: "not_equals", label: "is not", needsValue: !0 },
  { value: "filled", label: "is filled in", needsValue: !1 },
  { value: "empty", label: "is empty", needsValue: !1 }
];
function ve(e) {
  return e === !0 ? "true" : e === !1 ? "false" : typeof e == "string" || typeof e == "number" ? String(e) : "";
}
function Vs(e) {
  return e ? "rules" in e ? Array.isArray(e.rules) ? e.rules : [] : [e] : [];
}
function Us(e) {
  return e && "rules" in e && e.match === "any" ? "any" : "all";
}
function Ct(e, s) {
  return e.length === 0 ? null : e.length === 1 ? e[0] : { match: s, rules: e };
}
function je(e, s) {
  const t = s[e.field], c = t != null && t !== "" && t !== !1 && !(Array.isArray(t) && t.length === 0), r = (Array.isArray(t) ? t : [t]).map(ve).includes(ve(e.value));
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
function Ks(e, s) {
  const t = Vs(e.condition);
  return t.length === 0 ? !0 : Us(e.condition) === "any" ? t.some((c) => je(c, s)) : t.every((c) => je(c, s));
}
function Tt(e) {
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
function Et(e) {
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
const Gs = [25, 33, 50, 66, 75, 100];
function Ws(e) {
  return Gs.find((s) => s === e.width) ?? 100;
}
function Xs(e = "cms:gap-x-4 cms:gap-y-6") {
  return `cms:@container cms:grid cms:grid-cols-12 cms:items-start ${e}`;
}
const Ys = {
  25: "cms:@lg:col-span-3",
  33: "cms:@lg:col-span-4",
  50: "cms:@lg:col-span-6",
  66: "cms:@lg:col-span-8",
  75: "cms:@lg:col-span-9",
  100: ""
};
function we(e) {
  return `cms:col-span-12 cms:min-w-0 ${Ys[Ws(e)]}`.trim();
}
function Dt(e, s) {
  const { width: t, ...c } = e;
  return s === 100 ? c : { ...c, width: s };
}
const ne = "__none";
function re(e) {
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
const Js = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function Fe(e) {
  if (e.label) return e.label;
  const s = e.handle.replace(/_/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function ke({ field: e, value: s, onChange: t, errors: c, id: r, content: l = !1, fill: o = !1, marker: x = null, shared: m = e.shared === !0 }) {
  const j = Fe(e), g = Js.includes(e.type) || ["select", "terms"].includes(e.type) && e.config?.multiple === !0, y = c[""] !== void 0, i = bs.includes(e.type), p = e.instructions && e.instructions.trim() !== "" ? /* @__PURE__ */ n.jsx(vs, { id: `${r}-help`, text: e.instructions }) : null, h = m ? /* @__PURE__ */ n.jsx(ws, { id: `${r}-shared` }) : null, { hint: u } = Oe(e), { prefix: b, suffix: N } = qe(e), $ = [u && `${r}-hint`, b && `${r}-prefix`, N && `${r}-suffix`, p && `${r}-help`, h && `${r}-shared`, y && `${r}-error`].filter(Boolean).join(" ") || void 0;
  return /* @__PURE__ */ n.jsxs(
    "div",
    {
      className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2",
      ...g ? { role: "group", "aria-labelledby": `${r}-label`, ...y ? { "aria-invalid": !0 } : {}, ...y || p || h ? { "aria-describedby": [p && `${r}-help`, h && `${r}-shared`, y && `${r}-error`].filter(Boolean).join(" ") } : {} } : {},
      children: [
        e.type === "toggle" ? /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
          /* @__PURE__ */ n.jsx(f.Switch, { id: r, checked: s === !0, "aria-describedby": $, onCheckedChange: (k) => t(k) }),
          /* @__PURE__ */ n.jsx(f.Label, { htmlFor: r, className: "cms:min-w-0", children: j }),
          x,
          /* @__PURE__ */ n.jsx(xe, { field: e, id: r, label: j })
        ] }) : /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:min-h-4 cms:min-w-0 cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ n.jsxs(f.Label, { id: `${r}-label`, htmlFor: g ? void 0 : r, className: "cms:min-w-0", children: [
            j,
            e.required && /* @__PURE__ */ n.jsx("span", { className: "cms:text-destructive", children: " *" }),
            x
          ] }),
          /* @__PURE__ */ n.jsx(xe, { field: e, id: r, label: j })
        ] }),
        i && p,
        i && h,
        /* @__PURE__ */ n.jsx(Zs, { field: e, value: s, onChange: t, errors: c, id: r, content: l, fill: o, describedBy: $ }),
        ["text", "textarea", "code"].includes(e.type) && T(e, "max") !== void 0 && /* @__PURE__ */ n.jsx(Qs, { length: typeof s == "string" ? [...s].length : 0, max: T(e, "max") ?? 0 }),
        !i && p,
        !i && h,
        /* @__PURE__ */ n.jsx(V, { message: c[""], id: `${r}-error` })
      ]
    }
  );
}
function Qs({ length: e, max: s }) {
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
function Zs({ field: e, value: s, onChange: t, errors: c, id: r, content: l, fill: o = !1, describedBy: x }) {
  const m = c[""] !== void 0, { prefix: j, suffix: g } = qe(e), y = j !== null || g !== null;
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
          rows: T(e, "rows") ?? 4,
          placeholder: z(e, "placeholder"),
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
          language: Bs(e),
          value: typeof s == "string" ? s : "",
          placeholder: z(e, "placeholder"),
          onChange: (i) => t(i)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ n.jsx(f.RichTextEditor, { id: r, labelledBy: `${r}-label`, invalid: m, value: typeof s == "string" ? s : "", onChange: t });
    case "number": {
      const i = ts(s);
      return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ n.jsx(ge, { prefix: j, suffix: g, id: r, className: o ? "" : "cms:max-w-64", children: /* @__PURE__ */ n.jsx(
          f.Input,
          {
            id: r,
            type: "number",
            className: y ? be : o ? "cms:w-full" : "cms:max-w-48",
            placeholder: z(e, "placeholder"),
            "aria-invalid": m,
            "aria-describedby": [x, i && `${r}-grouped`].filter(Boolean).join(" ") || void 0,
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
          value: pe(ss(s, i)),
          onChange: (p) => t(pe(p ?? ""))
        }
      );
    }
    case "select":
      return e.config?.multiple === !0 ? /* @__PURE__ */ n.jsx(
        st,
        {
          options: re(e),
          value: Array.isArray(s) ? s.map(String) : [],
          onChange: t,
          invalid: m,
          empty: typeof e.config?.empty == "string" ? e.config.empty : void 0,
          inTickOrder: e.config?.in_tick_order === !0
        }
      ) : /* @__PURE__ */ n.jsx(
        et,
        {
          options: re(e),
          value: typeof s == "string" ? s : null,
          onChange: t,
          id: r,
          fill: o,
          empty: es(re(e), e.required === !0, typeof e.config?.default == "string" && e.config.default !== "", typeof s == "string" && s !== "")
        }
      );
    case "terms": {
      const i = e.config?.multiple === !0, p = Array.isArray(s) ? s.filter((h) => typeof h == "number") : typeof s == "number" ? s : null;
      return /* @__PURE__ */ n.jsx(
        Ds,
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
        $e,
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
        tt,
        {
          label: Fe(e),
          value: O(s),
          onChange: t,
          errors: c,
          id: r,
          collections: e.collections ?? [],
          placeholder: z(e, "placeholder"),
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
          max: T(e, "max") ?? null,
          types: Array.isArray(e.config?.types) ? e.config.types : [],
          value: typeof s == "number" || Array.isArray(s) && s.every((i) => typeof i == "number") ? s : null,
          onChange: t
        }
      );
    case "group":
      return /* @__PURE__ */ n.jsx(le, { fields: e.fields ?? [], value: O(s), onChange: t, errors: c, id: r, content: l });
    case "repeater":
      return /* @__PURE__ */ n.jsx(nt, { field: e, value: Array.isArray(s) ? s : [], onChange: t, errors: c, id: r, content: l });
    case "flexible":
      return /* @__PURE__ */ n.jsx(rt, { field: e, value: Array.isArray(s) ? s : [], onChange: t, errors: c, id: r });
    default:
      return /* @__PURE__ */ n.jsx(ge, { prefix: j, suffix: g, id: r, children: /* @__PURE__ */ n.jsx(
        f.Input,
        {
          id: r,
          "aria-invalid": m,
          "aria-describedby": x,
          className: y ? be : void 0,
          value: typeof s == "string" ? s : "",
          placeholder: z(e, "placeholder"),
          onChange: (i) => t(i.target.value)
        }
      ) });
  }
}
function T(e, s) {
  const t = e.config?.[s];
  return typeof t == "number" ? t : void 0;
}
function z(e, s) {
  const t = e.config?.[s];
  return typeof t == "string" ? t : void 0;
}
function le({ fields: e, value: s, onChange: t, errors: c, id: r, content: l, bare: o = !1 }) {
  const x = /* @__PURE__ */ n.jsx("div", { className: Xs(o ? void 0 : "cms:gap-4"), children: e.filter((m) => Ks(m, s)).map((m) => m.shared ? (
    // Greyed out, with where to edit it under it.
    /* @__PURE__ */ n.jsx("fieldset", { disabled: !0, className: `cms:flex cms:flex-col cms:gap-1 cms:opacity-60 ${we(m)}`, children: /* @__PURE__ */ n.jsx(ke, { id: `${r}-${m.handle}`, field: m, value: s[m.handle], content: l, errors: {}, onChange: () => {
    }, shared: !0 }) }, m.handle)
  ) : /* @__PURE__ */ n.jsx("div", { className: we(m), children: /* @__PURE__ */ n.jsx(
    ke,
    {
      id: `${r}-${m.handle}`,
      field: m,
      value: s[m.handle],
      content: l,
      errors: ae(c, m.handle),
      onChange: (j) => t({ ...s, [m.handle]: j })
    }
  ) }, m.handle)) });
  return o ? x : /* @__PURE__ */ n.jsx("div", { className: "cms:rounded-lg cms:border cms:p-4", children: x });
}
function et({ options: e, value: s, onChange: t, id: c, empty: r, fill: l = !1 }) {
  return /* @__PURE__ */ n.jsxs(f.Select, { value: s ?? ne, onValueChange: (o) => t(o === ne ? null : o), children: [
    /* @__PURE__ */ n.jsx(f.SelectTrigger, { id: c, className: l ? "cms:w-full" : "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ n.jsx(f.SelectValue, {}) }),
    /* @__PURE__ */ n.jsxs(f.SelectContent, { children: [
      r && /* @__PURE__ */ n.jsx(f.SelectItem, { value: ne, children: d("None") }),
      e.map((o) => /* @__PURE__ */ n.jsx(f.SelectItem, { value: o.value, children: o.label }, o.value))
    ] })
  ] });
}
function st({ options: e, value: s, onChange: t, empty: c, inTickOrder: r = !1, invalid: l = !1 }) {
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
function tt({ label: e, value: s, onChange: t, errors: c, id: r, collections: l, placeholder: o, describedBy: x }) {
  const [m, j] = w.useState(s.type === "entry" ? "entry" : "url"), g = s.type === "entry" || s.type === "url" ? s.type : m, y = w.useRef({}), i = (h) => t(ls({ ...s, type: g, ...h })), p = (h) => {
    if (h === g) return;
    const u = as(s, g, h, y.current);
    y.current = u.remembered, j(h), t(u.value);
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
        $e,
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
      /* @__PURE__ */ n.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ n.jsx(V, { message: c.url ?? c.entry_id ?? c.label ?? c.type }) })
    ] })
  ] });
}
function Ne(e, s) {
  return !s && (e.fields ?? []).every((t) => t.type === "text");
}
function Le(e) {
  const s = w.useRef([]);
  return s.current = cs(s.current, e), {
    keys: s.current,
    remove: (t) => {
      s.current = s.current.filter((c, r) => r !== t);
    },
    move: (t, c) => {
      s.current = f.moveItem(s.current, t, c);
    }
  };
}
function Re() {
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
function Be({ keys: e, folding: s }) {
  if (e.length < 2) return null;
  const t = s.anyOpen(e);
  return /* @__PURE__ */ n.jsxs(f.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => s.setAll(e, t), children: [
    t ? /* @__PURE__ */ n.jsx(fs, {}) : /* @__PURE__ */ n.jsx(De, {}),
    " ",
    t ? d("Collapse all") : d("Expand all")
  ] });
}
function nt({ field: e, value: s, onChange: t, errors: c, id: r, content: l = !1 }) {
  const o = e.fields ?? [], x = s.map(O), m = Le(x.length), j = (u, b) => t(x.map((N, $) => $ === u ? b : N)), g = (u) => {
    m.remove(u), t(x.filter((b, N) => N !== u));
  }, y = e.label ? e.label.toLowerCase().replace(/s$/, "") : d("row"), i = y.charAt(0).toUpperCase() + y.slice(1), p = x.map((u, b) => ({ row: u, index: b, key: m.keys[b] ?? String(b) })), h = Re();
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
        children: ({ row: u, index: b, key: N }, { handle: $ }) => Ne(e, l) ? /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
          /* @__PURE__ */ n.jsx(f.SortableHandle, { ...$, label: d("Move :item :number", { item: y, number: b + 1 }), className: "cms:mt-1" }),
          o.map((k) => /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
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
          /* @__PURE__ */ n.jsx(f.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": d("Remove :item :number", { item: y, number: b + 1 }), onClick: () => g(b), children: /* @__PURE__ */ n.jsx(Ae, {}) })
        ] }) : (() => {
          const k = ae(c, String(b)), A = h.isCollapsed(N, Object.keys(k).length > 0);
          return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ n.jsx(
              Ve,
              {
                label: `${i} ${b + 1}`,
                summary: _e(o, u),
                handle: $,
                onRemove: () => g(b),
                collapsed: A,
                onToggle: () => h.toggle(N),
                controls: `${r}-${b}-fields`,
                hidden: l ? u._hidden === !0 : void 0,
                onHidden: (q) => j(b, { ...u, _hidden: q })
              }
            ),
            /* @__PURE__ */ n.jsx("div", { id: `${r}-${b}-fields`, hidden: A, children: !A && /* @__PURE__ */ n.jsx(le, { fields: o, value: u, onChange: (q) => j(b, q), errors: k, id: `${r}-${b}`, content: l }) })
          ] });
        })()
      }
    ),
    /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ n.jsxs(f.Button, { type: "button", variant: "outline", size: "sm", onClick: () => t([...x, l ? rs(e.defaults) : {}]), children: [
        /* @__PURE__ */ n.jsx(Se, {}),
        " ",
        d("Add :item", { item: y })
      ] }),
      !Ne(e, l) && /* @__PURE__ */ n.jsx(Be, { keys: p.map((u) => u.key), folding: h })
    ] })
  ] });
}
function rt({ field: e, value: s, onChange: t, errors: c, id: r }) {
  const l = e.blocks ?? [], o = s.map(O), x = Le(o.length), m = (i, p) => t(o.map((h, u) => u === i ? p : h)), j = (i) => {
    x.remove(i), t(o.filter((p, h) => h !== i));
  }, g = o.map((i, p) => ({ block: i, index: p, key: x.keys[p] ?? String(p) })), y = Re();
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
          const b = l.find((k) => k.type === i.type), N = ae(c, `${p}.values`), $ = y.isCollapsed(h, Object.keys(N).length > 0 || c[`${p}.type`] !== void 0);
          return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ n.jsx(
              Ve,
              {
                label: b?.label ?? String(i.type),
                summary: b ? _e(b.fields, O(i.values)) : null,
                badge: !0,
                handle: u,
                onRemove: () => j(p),
                collapsed: $,
                onToggle: () => y.toggle(h),
                controls: `${r}-${p}-fields`,
                hidden: i.hidden === !0,
                onHidden: (k) => m(p, { ...i, hidden: k })
              }
            ),
            /* @__PURE__ */ n.jsx("div", { id: `${r}-${p}-fields`, hidden: $, children: $ ? null : b ? /* @__PURE__ */ n.jsx(
              le,
              {
                fields: b.fields,
                value: O(i.values),
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
        /* @__PURE__ */ n.jsx(f.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ n.jsxs(f.Button, { type: "button", variant: "outline", size: "sm", disabled: l.length === 0, children: [
          /* @__PURE__ */ n.jsx(Se, {}),
          " ",
          d("Add block")
        ] }) }),
        /* @__PURE__ */ n.jsx(f.DropdownMenuContent, { align: "start", children: l.map((i) => /* @__PURE__ */ n.jsx(f.DropdownMenuItem, { onSelect: () => t([...o, ns(i.type, i.defaults)]), children: i.label }, i.type)) })
      ] }),
      /* @__PURE__ */ n.jsx(Be, { keys: g.map((i) => i.key), folding: y })
    ] })
  ] });
}
function Ve({ label: e, summary: s, badge: t = !1, handle: c, onRemove: r, collapsed: l, onToggle: o, controls: x, hidden: m, onHidden: j }) {
  const g = l ? us : ds, y = s ? `${e}: ${s}` : e;
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
      /* @__PURE__ */ n.jsx(f.Switch, { checked: !m, onCheckedChange: (i) => j(!i), "aria-label": d(":title: visible on site", { title: y }) }),
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
        children: /* @__PURE__ */ n.jsx(Ae, {})
      }
    )
  ] });
}
export {
  le as A,
  vt as B,
  ds as C,
  js as D,
  Ks as E,
  ke as F,
  we as G,
  Xs as H,
  De as I,
  vs as J,
  Fe as K,
  xe as L,
  xt as M,
  Oe as N,
  At as O,
  ws as S,
  Ds as T,
  kt as a,
  ae as b,
  qs as c,
  _t as d,
  zs as e,
  Ws as f,
  bt as g,
  jt as h,
  Nt as i,
  $t as j,
  Gs as k,
  wt as l,
  Vs as m,
  gt as n,
  Us as o,
  Tt as p,
  Et as q,
  yt as r,
  St as s,
  Ct as t,
  Hs as u,
  Os as v,
  Dt as w,
  Is as x,
  Ps as y,
  Ts as z
};
