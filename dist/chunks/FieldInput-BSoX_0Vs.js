import { j as n, t as m, a as Pe } from "./admin-BXp1g0Oh.js";
import { c as se, _ as j } from "./createLucideIcon-Ccbp7F45.js";
import { u as d } from "./ui-Dh5wfMwT.js";
import { t as Ve, a as E, E as ve, o as Ue, d as de, b as Ke, g as We, i as je, n as Ge, c as Xe, s as Qe } from "./EntriesPicker-BENyeSiq.js";
import { F as H } from "./FieldError-Cn9v3eQ-.js";
import { C as Ze } from "./check-OeKFYRnl.js";
import { X as Je } from "./EntryStatus-DZSmr1B2.js";
import { S as Ye } from "./search-3zKi7F1_.js";
import { P as we } from "./plus-COqahUZ2.js";
import { T as ke } from "./trash-DHN6ewjn.js";
import { C as es } from "./chevron-right-9qVV6b-Q.js";
const Ne = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
Ne.node;
const ss = se(Ne);
const $e = {
  name: "chevrons-down-up",
  size: 24,
  node: [
    ["path", { d: "m7 20 5-5 5 5", key: "13a0gw" }],
    ["path", { d: "m7 4 5 5 5-5", key: "1kwcof" }]
  ]
};
$e.node;
const ts = se($e);
const Ce = {
  name: "chevrons-up-down",
  size: 24,
  node: [
    ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
    ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
  ]
};
Ce.node;
const Se = se(Ce);
function ns(e) {
  return e === null ? [] : Array.isArray(e) ? e : [e];
}
function Ae(e, s, t) {
  return s && t !== null && e.length >= t;
}
function rs(e, s, t, c) {
  return t ? e.includes(s) ? e.filter((r) => r !== s) : Ae(e, t, c) ? e.slice() : [...e, s] : [s];
}
function cs(e) {
  return e.slice(0, -1);
}
function as(e, s) {
  return s ? e.slice() : e[0] ?? null;
}
function ls(e, s, t, c = () => !1) {
  const r = s === "ArrowDown" || s === "Home" ? 1 : s === "ArrowUp" || s === "End" ? -1 : 0;
  if (r === 0 || t === 0) return e;
  let o = s === "Home" ? 0 : s === "End" ? t - 1 : e + r;
  for (s === "ArrowUp" && e === -1 && (o = t - 1); o >= 0 && o < t && c(o); ) o += r;
  return o >= 0 && o < t ? o : e;
}
function os(e, s) {
  const t = new Set(e.map((c) => c.id));
  return [...e, ...s.filter((c) => !t.has(c.id))];
}
function is(e) {
  const s = [], t = {};
  for (const c of e)
    s.length = Math.min(s.length, c.depth), t[c.id] = s.slice(), s.push(c.label);
  return t;
}
function fe(e, s) {
  return [...s ?? [], e].join(" › ");
}
const ms = j.createContext({});
async function J(e, s) {
  const t = await fetch(`${Pe("cms/terms/picker")}?${Ve(e)}`, { headers: { Accept: "application/json" }, credentials: "same-origin", signal: s });
  if (!t.ok) throw new Error(String(t.status));
  return await t.json();
}
function us({ id: e, taxonomy: s, multiple: t, max: c, required: r, invalid: o, value: i, onChange: f }) {
  const a = j.useContext(ms), u = ns(i), [k, w] = j.useState(!1), [p, b] = j.useState(""), [x, g] = j.useState(null), [h, N] = j.useState(!1), [S, v] = j.useState(!1), [D, z] = j.useState(0), [I, Le] = j.useState({}), [C, F] = j.useState(-1), [B, Me] = j.useState(null), P = j.useRef(null), V = j.useRef(null), ce = j.useRef(null), ae = j.useRef(null), U = p.trim(), R = j.useCallback((l, y) => {
    const $ = y ? is(l) : {};
    Le((q) => {
      const M = { ...q };
      for (const O of l) M[O.id] = { label: O.label, parents: $[O.id] ?? q[O.id]?.parents };
      return M;
    });
  }, []), A = k && s ? U : null;
  j.useEffect(() => {
    if (A === null || s === null || ae.current === `${s}
${A}`) return;
    const l = new AbortController(), y = window.setTimeout(() => {
      J({ taxonomy: s, q: A }, l.signal).then(($) => {
        ae.current = `${s}
${A}`, g({ ...$, q: A }), R($.items, A === ""), F(A !== "" && $.items.length > 0 ? 0 : -1), v(!1);
      }).catch(($) => {
        $ instanceof DOMException && $.name === "AbortError" || v(!0);
      });
    }, A === "" ? 0 : 250);
    return () => {
      window.clearTimeout(y), l.abort();
    };
  }, [s, A, D, R]);
  const le = (l) => a[String(l)] ?? I[l]?.label, K = u.filter((l) => le(l) === void 0).join(",");
  j.useEffect(() => {
    !s || K === "" || J({ taxonomy: s, ids: K.split(",").map(Number) }).then((l) => R(l.items, !1)).catch(() => {
    });
  }, [s, K, R]);
  const W = () => {
    !s || !x?.more || h || x.q !== U || (N(!0), J({ taxonomy: s, q: x.q, offset: x.items.length }).then((l) => {
      const y = os(x.items, l.items);
      g({ items: y, more: l.more, q: x.q }), R(y, x.q === "");
    }).catch(() => v(!0)).finally(() => N(!1)));
  };
  if (j.useEffect(() => {
    C >= 0 && x && document.getElementById(`${e}-option-${x.items[C]?.id}`)?.scrollIntoView({ block: "nearest" });
  }, [C, e, x]), !s) return /* @__PURE__ */ n.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: m("Choose a taxonomy for this field in its blueprint.") });
  const oe = Ae(u, t, c), G = t || !r, X = (l) => f(as(l, t)), ie = (l) => {
    X(rs(u, l, t, c)), t || w(!1);
  }, T = x?.items ?? [], Q = (l) => oe && !u.includes(T[l]?.id ?? -1), Z = (l) => le(l) ?? m("Term #:id", { id: l }), He = (l) => {
    if (l && P.current && V.current) {
      const y = P.current.getBoundingClientRect(), $ = V.current.getBoundingClientRect();
      Me({ width: y.width, alignOffset: y.left - $.left, sideOffset: 4 + y.bottom - $.bottom });
    }
    l || b(""), w(l);
  }, Ie = (l) => {
    if (l.key === "ArrowDown" || l.key === "ArrowUp") {
      l.preventDefault();
      const y = ls(C, l.key, T.length, Q);
      l.key === "ArrowDown" && y === C && C === T.length - 1 && W(), F(y);
    } else if (l.key === "Enter") {
      l.preventDefault();
      const y = T[C];
      y && !Q(C) && ie(y.id);
    } else l.key === "Backspace" && p === "" && G && u.length > 0 && (l.preventDefault(), X(cs(u)));
  }, Fe = (l) => {
    const y = l.currentTarget;
    y.scrollTop + y.clientHeight >= y.scrollHeight - 48 && W();
  }, Be = t ? m("Choose terms…") : m("Choose a term…"), me = `${e}-listbox`, ue = x !== null && x.q !== U;
  let L;
  return S ? L = /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:items-start cms:gap-2 cms:p-3 cms:text-sm", children: [
    /* @__PURE__ */ n.jsx("p", { className: "cms:text-destructive", children: m("Terms could not be loaded.") }),
    /* @__PURE__ */ n.jsx(d.Button, { type: "button", variant: "outline", size: "sm", onClick: () => {
      v(!1), z((l) => l + 1);
    }, children: m("Try again") })
  ] }) : x === null ? L = /* @__PURE__ */ n.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:p-2", "aria-busy": "true", "aria-label": m("Loading terms"), children: [70, 55, 80, 45, 65].map((l) => /* @__PURE__ */ n.jsx(d.Skeleton, { className: "cms:h-5", style: { width: `${l}%` } }, l)) }) : T.length === 0 ? L = /* @__PURE__ */ n.jsx("p", { className: "cms:p-3 cms:text-sm cms:text-muted-foreground", children: x.q ? m("No terms match “:search”.", { search: x.q }) : m("Nothing to choose from yet.") }) : L = /* @__PURE__ */ n.jsxs("div", { className: `cms:max-h-72 cms:overflow-y-auto cms:overscroll-contain cms:p-1 ${ue ? "cms:opacity-60" : ""}`, onScroll: Fe, children: [
    /* @__PURE__ */ n.jsx("div", { role: "listbox", id: me, "aria-label": m("Terms"), "aria-multiselectable": t || void 0, "aria-busy": ue || void 0, children: T.map((l, y) => {
      const $ = u.includes(l.id), q = Q(y), M = fe(l.label, I[l.id]?.parents);
      return /* @__PURE__ */ n.jsxs(
        "div",
        {
          id: `${e}-option-${l.id}`,
          role: "option",
          "aria-selected": $,
          "aria-disabled": q || void 0,
          title: M,
          className: `cms:flex cms:cursor-default cms:items-center cms:gap-2 cms:rounded-sm cms:py-1.5 cms:pr-2 cms:text-sm cms:select-none ${y === C ? "cms:bg-accent cms:text-accent-foreground" : ""} ${q ? "cms:opacity-50" : ""}`,
          style: { paddingLeft: `${0.5 + Math.min(l.depth, 6) * 0.875}rem` },
          onMouseDown: (O) => O.preventDefault(),
          onMouseMove: () => {
            y !== C && F(y);
          },
          onClick: () => {
            q || ie(l.id);
          },
          children: [
            /* @__PURE__ */ n.jsx(Ze, { className: `cms:size-4 cms:shrink-0 ${$ ? "" : "cms:invisible"}`, "aria-hidden": "true" }),
            /* @__PURE__ */ n.jsx("span", { className: "cms:min-w-0 cms:truncate", children: l.label })
          ]
        },
        l.id
      );
    }) }),
    x.more && /* @__PURE__ */ n.jsx(d.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:mt-1 cms:w-full", disabled: h, onMouseDown: (l) => l.preventDefault(), onClick: W, children: h ? m("Loading…") : m("Load more") })
  ] }), /* @__PURE__ */ n.jsxs(d.Popover, { open: k, onOpenChange: He, children: [
    /* @__PURE__ */ n.jsxs(
      "div",
      {
        ref: P,
        "data-invalid": o || void 0,
        className: "cms:flex cms:w-full cms:max-w-xl cms:min-w-0 cms:[contain:inline-size] cms:flex-wrap cms:items-center cms:gap-1 cms:rounded-md cms:border cms:border-input/80 cms:bg-card cms:p-1 cms:shadow-xs cms:data-invalid:border-destructive cms:dark:bg-input/20",
        children: [
          u.map((l) => /* @__PURE__ */ n.jsxs(
            "span",
            {
              title: fe(Z(l), I[l]?.parents),
              className: "cms:inline-flex cms:h-7 cms:max-w-full cms:min-w-0 cms:items-center cms:gap-0.5 cms:rounded-sm cms:bg-secondary cms:pl-2 cms:text-xs cms:font-medium cms:text-secondary-foreground",
              children: [
                /* @__PURE__ */ n.jsx("span", { className: `cms:min-w-0 cms:truncate ${G ? "" : "cms:pr-2"}`, children: Z(l) }),
                G && /* @__PURE__ */ n.jsx(
                  "button",
                  {
                    type: "button",
                    className: "cms:inline-flex cms:size-7 cms:shrink-0 cms:items-center cms:justify-center cms:rounded-sm cms:text-muted-foreground cms:hover:bg-muted cms:hover:text-foreground cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none",
                    "aria-label": m("Remove :term", { term: Z(l) }),
                    onClick: () => X(u.filter((y) => y !== l)),
                    children: /* @__PURE__ */ n.jsx(Je, { className: "cms:size-3", "aria-hidden": "true" })
                  }
                )
              ]
            },
            l
          )),
          /* @__PURE__ */ n.jsx(d.PopoverTrigger, { asChild: !0, children: /* @__PURE__ */ n.jsxs(
            "button",
            {
              ref: V,
              id: e,
              type: "button",
              "aria-haspopup": "listbox",
              "aria-invalid": o || void 0,
              className: "cms:flex cms:h-7 cms:min-w-24 cms:flex-1 cms:items-center cms:justify-between cms:gap-1 cms:rounded-sm cms:px-2 cms:text-left cms:text-sm cms:text-muted-foreground cms:hover:bg-muted cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none cms:disabled:pointer-events-none cms:disabled:opacity-50",
              children: [
                /* @__PURE__ */ n.jsx("span", { className: "cms:truncate", children: u.length === 0 ? Be : t ? m("Add…") : m("Change…") }),
                /* @__PURE__ */ n.jsx(Se, { className: "cms:size-4 cms:shrink-0 cms:opacity-60", "aria-hidden": "true" })
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
        alignOffset: B?.alignOffset,
        sideOffset: B?.sideOffset,
        className: "cms:max-w-[calc(100vw-2rem)] cms:min-w-60 cms:p-0",
        style: { width: B?.width },
        onOpenAutoFocus: (l) => {
          l.preventDefault(), ce.current?.focus();
        },
        children: [
          /* @__PURE__ */ n.jsxs("div", { className: "cms:relative cms:border-b cms:border-border/60", children: [
            /* @__PURE__ */ n.jsx(Ye, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground", "aria-hidden": "true" }),
            /* @__PURE__ */ n.jsx(
              "input",
              {
                ref: ce,
                type: "text",
                role: "combobox",
                "aria-expanded": "true",
                "aria-controls": me,
                "aria-autocomplete": "list",
                "aria-label": m("Search terms"),
                "aria-activedescendant": C >= 0 && T[C] ? `${e}-option-${T[C].id}` : void 0,
                className: "cms:h-10 cms:w-full cms:bg-transparent cms:pr-3 cms:pl-9 cms:text-sm cms:outline-none cms:placeholder:text-muted-foreground",
                placeholder: m("Search terms"),
                autoComplete: "off",
                value: p,
                onKeyDown: Ie,
                onChange: (l) => b(l.target.value)
              }
            )
          ] }),
          L,
          oe && c !== null && /* @__PURE__ */ n.jsx("p", { className: "cms:border-t cms:border-border/60 cms:px-3 cms:py-2 cms:text-xs cms:text-muted-foreground", children: m("Up to :max terms.", { max: c }) })
        ]
      }
    )
  ] });
}
const _e = (e, s = {}) => e.replace(/:([A-Za-z_]+)/g, (t, c) => s[c] ?? t), Ws = 5;
let ds = 0;
const te = () => `f${++ds}`;
function fs(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function ps(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^[0-9_]+/, "").replace(/_{2,}/g, "_").slice(0, 64);
}
function Te(e, s) {
  const t = new Set(s.map((o) => o.handle)), c = fs(e) || "field";
  let r = c;
  for (let o = 2; t.has(r); o++)
    r = `${c}_${o}`;
  return r;
}
function hs(e) {
  return (e ?? []).map(({ fields: s, ...t }) => ({
    ...t,
    key: te(),
    fields: hs(s),
    handleTouched: !0,
    savedHandle: t.handle
  }));
}
function gs(e, s) {
  return e.map(({ key: t, handleTouched: c, savedHandle: r, fields: o, ...i }) => ({
    ...i,
    validation: (i.validation ?? []).map((f) => f.trim()).filter((f) => f !== ""),
    ...s(i.type) ? { fields: gs(o, s) } : {}
  }));
}
function Gs(e, s, t) {
  return { key: te(), type: e, label: s, handle: Te(s, t), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function Xs(e) {
  return e.type !== "fieldset" && e.savedHandle !== void 0 && e.savedHandle !== "" && e.handle !== e.savedHandle ? e.savedHandle : null;
}
function xs(e) {
  return e.map((s) => ({ ...s, savedHandle: s.handle, fields: xs(s.fields) }));
}
function Qs(e, s, t) {
  if (e.handleTouched) return { ...e, label: s };
  const c = t.filter((r) => r.key !== e.key);
  return { ...e, label: s, handle: Te(s || e.type, c) };
}
function ys(e, s) {
  const t = `${s}.`, c = {};
  for (const [r, o] of Object.entries(e))
    r.startsWith(t) && (c[r.slice(t.length)] = o);
  return c;
}
function ne(e, s) {
  const t = e[s];
  return { ...ys(e, s), ...t !== void 0 ? { "": t } : {} };
}
function Zs(e, s) {
  return Object.keys(e).filter((t) => t === s || t.startsWith(`${s}.`));
}
function Js(e, s) {
  return Object.keys(e).some((t) => t === s || t.startsWith(`${s}.`));
}
function Ys(e, s) {
  return s.filter((t) => t.key !== e.key && t.handle !== "" && t.type !== "fieldset");
}
function et(e, s, t, c = _e) {
  return e.type === "fieldset" ? null : t?.includes(e.handle) ? c('":handle" is used by the content itself; choose another handle.', { handle: e.handle }) : e.handle !== "" && s.some((r) => r.key !== e.key && r.type !== "fieldset" && r.handle === e.handle) ? c('There is already a field ":handle" here.', { handle: e.handle }) : null;
}
function st(e, s) {
  return typeof e.translatable == "boolean" ? e.translatable : s;
}
function tt(e, s, t) {
  return { ...e, translatable: s === t ? null : s };
}
function bs(e, s, t = []) {
  const c = /* @__PURE__ */ new Set([...s.map((i) => i.handle), ...t]), r = `${(ps(e) || "field").slice(0, 56)}_copy`;
  let o = r;
  for (let i = 2; c.has(o); i++)
    o = `${r}_${i}`;
  return o;
}
function De(e) {
  const { key: s, savedHandle: t, fields: c, ...r } = e;
  return { ...structuredClone(r), key: te(), fields: c.map(De) };
}
function nt(e, s, t = [], c = _e) {
  const r = e[s];
  if (r === void 0) return null;
  const o = r.label || r.handle, i = {
    ...De(r),
    label: c(":label (copy)", { label: o }),
    handle: r.type === "fieldset" ? r.handle : bs(r.handle, e, t),
    handleTouched: !0
  };
  return { fields: [...e.slice(0, s + 1), i, ...e.slice(s + 1)], copy: i };
}
function vs(e, s) {
  const t = e.condition;
  return !t || "rules" in t ? null : (t.operator === "filled" || t.operator === "equals" && (t.value === !0 || t.value === "true")) && s.some((r) => r.handle === t.field && r.type === "toggle") ? t.field : null;
}
function rt(e) {
  const s = (r) => r.type === "number" || r.type === "text" && (r.instructions ?? "").length <= 60, t = {}, c = [];
  for (const r of e) {
    const o = vs(r, e);
    o === null ? c.push(r) : (t[o] ??= []).push(r);
  }
  return { options: c.filter((r) => !s(r)), limits: c.filter(s), dependents: t };
}
const ct = [
  { value: "equals", label: "is", needsValue: !0 },
  { value: "not_equals", label: "is not", needsValue: !0 },
  { value: "filled", label: "is filled in", needsValue: !1 },
  { value: "empty", label: "is empty", needsValue: !1 }
];
function pe(e) {
  return e === !0 ? "true" : e === !1 ? "false" : typeof e == "string" || typeof e == "number" ? String(e) : "";
}
function js(e) {
  return e ? "rules" in e ? Array.isArray(e.rules) ? e.rules : [] : [e] : [];
}
function ws(e) {
  return e && "rules" in e && e.match === "any" ? "any" : "all";
}
function at(e, s) {
  return e.length === 0 ? null : e.length === 1 ? e[0] : { match: s, rules: e };
}
function he(e, s) {
  const t = s[e.field], c = t != null && t !== "" && t !== !1 && !(Array.isArray(t) && t.length === 0), r = (Array.isArray(t) ? t : [t]).map(pe).includes(pe(e.value));
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
function ks(e, s) {
  const t = js(e.condition);
  return t.length === 0 ? !0 : ws(e.condition) === "any" ? t.some((c) => he(c, s)) : t.every((c) => he(c, s));
}
function lt(e) {
  const s = e?.config ?? {};
  switch (e?.type) {
    case "select": {
      const t = (Array.isArray(s.options) ? s.options : []).flatMap((c) => {
        if (typeof c == "string" && c !== "") return [{ value: c, label: c }];
        if (c && typeof c == "object" && typeof c.value == "string" && c.value !== "") {
          const { value: r, label: o } = c;
          return [{ value: r, label: typeof o == "string" && o !== "" ? o : r }];
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
function ot(e) {
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
const Ns = [25, 33, 50, 66, 75, 100];
function $s(e) {
  return Ns.find((s) => s === e.width) ?? 100;
}
function Cs(e = "cms:gap-x-4 cms:gap-y-6") {
  return `cms:@container cms:grid cms:grid-cols-12 cms:items-start ${e}`;
}
const Ss = {
  25: "cms:@lg:col-span-3",
  33: "cms:@lg:col-span-4",
  50: "cms:@lg:col-span-6",
  66: "cms:@lg:col-span-8",
  75: "cms:@lg:col-span-9",
  100: ""
};
function ge(e) {
  return `cms:col-span-12 cms:min-w-0 ${Ss[$s(e)]}`.trim();
}
function it(e, s) {
  const { width: t, ...c } = e;
  return s === 100 ? c : { ...c, width: s };
}
const Y = "__none";
function ee(e) {
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
const As = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function qe(e) {
  if (e.label) return e.label;
  const s = e.handle.replace(/_/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function xe({ field: e, value: s, onChange: t, errors: c, id: r, content: o = !1, fill: i = !1, marker: f = null }) {
  const a = qe(e), u = As.includes(e.type) || ["select", "terms"].includes(e.type) && e.config?.multiple === !0, k = c[""] !== void 0;
  return /* @__PURE__ */ n.jsxs(
    "div",
    {
      className: "cms:flex cms:flex-col cms:gap-2",
      ...u ? { role: "group", "aria-labelledby": `${r}-label`, ...k ? { "aria-invalid": !0, "aria-describedby": `${r}-error` } : {} } : {},
      children: [
        e.type === "toggle" ? /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
          /* @__PURE__ */ n.jsx(d.Switch, { id: r, checked: s === !0, onCheckedChange: (w) => t(w) }),
          /* @__PURE__ */ n.jsx(d.Label, { htmlFor: r, children: a }),
          f
        ] }) : /* @__PURE__ */ n.jsxs(d.Label, { id: `${r}-label`, htmlFor: u ? void 0 : r, children: [
          a,
          e.required && /* @__PURE__ */ n.jsx("span", { className: "cms:text-destructive", children: " *" }),
          f
        ] }),
        /* @__PURE__ */ n.jsx(Ts, { field: e, value: s, onChange: t, errors: c, id: r, content: o, fill: i }),
        ["text", "textarea"].includes(e.type) && _(e, "max") !== void 0 && /* @__PURE__ */ n.jsx(_s, { length: typeof s == "string" ? [...s].length : 0, max: _(e, "max") ?? 0 }),
        e.instructions && /* @__PURE__ */ n.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: e.instructions }),
        /* @__PURE__ */ n.jsx(H, { message: c[""], id: `${r}-error` })
      ]
    }
  );
}
function _s({ length: e, max: s }) {
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
function Ts({ field: e, value: s, onChange: t, errors: c, id: r, content: o, fill: i = !1 }) {
  const f = c[""] !== void 0;
  switch (e.type) {
    case "toggle":
      return null;
    case "file":
      return /* @__PURE__ */ n.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: m("Visitors attach a file here when they send a form.") });
    case "textarea":
      return /* @__PURE__ */ n.jsx(
        d.Textarea,
        {
          id: r,
          "aria-invalid": f,
          value: typeof s == "string" ? s : "",
          rows: _(e, "rows") ?? 4,
          onChange: (a) => t(a.target.value)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ n.jsx(d.RichTextEditor, { id: r, labelledBy: `${r}-label`, invalid: f, value: typeof s == "string" ? s : "", onChange: t });
    case "number": {
      const a = We(s);
      return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ n.jsx(
          d.Input,
          {
            id: r,
            type: "number",
            className: i ? "cms:w-full" : "cms:max-w-48",
            placeholder: ye(e, "placeholder"),
            "aria-invalid": f,
            "aria-describedby": a ? `${r}-grouped` : void 0,
            value: typeof s == "number" ? String(s) : typeof s == "string" ? s : "",
            min: _(e, "min"),
            max: _(e, "max"),
            step: _(e, "step") ?? "any",
            onChange: (u) => t(u.target.value === "" ? null : Number(u.target.value))
          }
        ),
        a && /* @__PURE__ */ n.jsx("span", { id: `${r}-grouped`, className: "cms:text-sm cms:tabular-nums cms:text-muted-foreground", children: a })
      ] });
    }
    case "date": {
      const a = e.config?.time === !0;
      return /* @__PURE__ */ n.jsx(
        d.DatePicker,
        {
          id: r,
          withTime: a,
          invalid: f,
          required: e.required === !0,
          value: de(Ke(s, a)),
          onChange: (u) => t(de(u ?? ""))
        }
      );
    }
    case "select":
      return e.config?.multiple === !0 ? /* @__PURE__ */ n.jsx(
        qs,
        {
          options: ee(e),
          value: Array.isArray(s) ? s.map(String) : [],
          onChange: t,
          invalid: f,
          empty: typeof e.config?.empty == "string" ? e.config.empty : void 0,
          inTickOrder: e.config?.in_tick_order === !0
        }
      ) : /* @__PURE__ */ n.jsx(
        Ds,
        {
          options: ee(e),
          value: typeof s == "string" ? s : null,
          onChange: t,
          id: r,
          fill: i,
          empty: Ue(ee(e), e.required === !0, typeof e.config?.default == "string" && e.config.default !== "", typeof s == "string" && s !== "")
        }
      );
    case "terms": {
      const a = e.config?.multiple === !0, u = Array.isArray(s) ? s.filter((k) => typeof k == "number") : typeof s == "number" ? s : null;
      return /* @__PURE__ */ n.jsx(
        us,
        {
          id: r,
          taxonomy: typeof e.taxonomy == "string" ? e.taxonomy : null,
          multiple: a,
          max: _(e, "max") ?? null,
          required: e.required === !0,
          invalid: f,
          value: a ? Array.isArray(u) ? u : [] : typeof u == "number" ? u : null,
          onChange: t
        }
      );
    }
    case "entries":
      return /* @__PURE__ */ n.jsx(
        ve,
        {
          id: r,
          invalid: f,
          multiple: e.config?.multiple === !0,
          max: _(e, "max") ?? null,
          collections: e.collections ?? [],
          onChange: t,
          value: typeof s == "number" || Array.isArray(s) && s.every((a) => typeof a == "number") ? s : null
        }
      );
    case "link":
      return /* @__PURE__ */ n.jsx(Os, { label: qe(e), value: E(s), onChange: t, errors: c, id: r, collections: e.collections ?? [] });
    case "media":
      return /* @__PURE__ */ n.jsx(
        d.MediaPickerInput,
        {
          id: r,
          invalid: f,
          disabled: !1,
          multiple: e.config?.multiple === !0,
          max: _(e, "max") ?? null,
          types: Array.isArray(e.config?.types) ? e.config.types : [],
          value: typeof s == "number" || Array.isArray(s) && s.every((a) => typeof a == "number") ? s : null,
          onChange: t
        }
      );
    case "group":
      return /* @__PURE__ */ n.jsx(re, { fields: e.fields ?? [], value: E(s), onChange: t, errors: c, id: r, content: o });
    case "repeater":
      return /* @__PURE__ */ n.jsx(Es, { field: e, value: Array.isArray(s) ? s : [], onChange: t, errors: c, id: r, content: o });
    case "flexible":
      return /* @__PURE__ */ n.jsx(zs, { field: e, value: Array.isArray(s) ? s : [], onChange: t, errors: c, id: r });
    default:
      return /* @__PURE__ */ n.jsx(
        d.Input,
        {
          id: r,
          "aria-invalid": f,
          value: typeof s == "string" ? s : "",
          placeholder: ye(e, "placeholder"),
          onChange: (a) => t(a.target.value)
        }
      );
  }
}
function _(e, s) {
  const t = e.config?.[s];
  return typeof t == "number" ? t : void 0;
}
function ye(e, s) {
  const t = e.config?.[s];
  return typeof t == "string" ? t : void 0;
}
function re({ fields: e, value: s, onChange: t, errors: c, id: r, content: o, bare: i = !1 }) {
  const f = /* @__PURE__ */ n.jsx("div", { className: Cs(i ? void 0 : "cms:gap-4"), children: e.filter((a) => ks(a, s)).map((a) => a.shared ? (
    // Greyed out; the form says once, at the top, where to edit shared fields.
    /* @__PURE__ */ n.jsx("fieldset", { disabled: !0, className: `cms:flex cms:flex-col cms:gap-1 cms:opacity-60 ${ge(a)}`, title: m("Shared by all languages: edit it in the main language."), children: /* @__PURE__ */ n.jsx(xe, { id: `${r}-${a.handle}`, field: a, value: s[a.handle], content: o, errors: {}, onChange: () => {
    } }) }, a.handle)
  ) : /* @__PURE__ */ n.jsx("div", { className: ge(a), children: /* @__PURE__ */ n.jsx(
    xe,
    {
      id: `${r}-${a.handle}`,
      field: a,
      value: s[a.handle],
      content: o,
      errors: ne(c, a.handle),
      onChange: (u) => t({ ...s, [a.handle]: u })
    }
  ) }, a.handle)) });
  return i ? f : /* @__PURE__ */ n.jsx("div", { className: "cms:rounded-lg cms:border cms:p-4", children: f });
}
function Ds({ options: e, value: s, onChange: t, id: c, empty: r, fill: o = !1 }) {
  return /* @__PURE__ */ n.jsxs(d.Select, { value: s ?? Y, onValueChange: (i) => t(i === Y ? null : i), children: [
    /* @__PURE__ */ n.jsx(d.SelectTrigger, { id: c, className: o ? "cms:w-full" : "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ n.jsx(d.SelectValue, {}) }),
    /* @__PURE__ */ n.jsxs(d.SelectContent, { children: [
      r && /* @__PURE__ */ n.jsx(d.SelectItem, { value: Y, children: m("None") }),
      e.map((i) => /* @__PURE__ */ n.jsx(d.SelectItem, { value: i.value, children: i.label }, i.value))
    ] })
  ] });
}
function qs({ options: e, value: s, onChange: t, empty: c, inTickOrder: r = !1, invalid: o = !1 }) {
  return e.length === 0 ? /* @__PURE__ */ n.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: c ?? m("Nothing to choose from yet.") }) : /* @__PURE__ */ n.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2", children: e.map((i) => /* @__PURE__ */ n.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
    /* @__PURE__ */ n.jsx(
      d.Checkbox,
      {
        checked: s.includes(i.value),
        "aria-invalid": o || void 0,
        onCheckedChange: (f) => t(f ? r ? [...s.filter((a) => a !== i.value), i.value] : e.map((a) => a.value).filter((a) => a === i.value || s.includes(a)) : s.filter((a) => a !== i.value))
      }
    ),
    i.label,
    r && s.includes(i.value) && /* @__PURE__ */ n.jsxs("span", { className: "cms:text-xs cms:text-muted-foreground", "aria-label": `number ${s.indexOf(i.value) + 1}`, children: [
      "#",
      s.indexOf(i.value) + 1
    ] })
  ] }, i.value)) });
}
function Os({ label: e, value: s, onChange: t, errors: c, id: r, collections: o }) {
  const i = s.type === "entry" ? "entry" : "url", f = (a) => {
    const u = { ...s, type: i, ...a }, k = u.type === "entry" ? typeof u.entry_id != "number" : u.url === "" || u.url === void 0 || u.url === null;
    t(k ? u.label || u.new_tab ? u : null : u);
  };
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ n.jsx("div", { role: "radiogroup", "aria-label": m(":field: link to", { field: e }), className: "cms:inline-flex cms:w-fit cms:rounded-md cms:border cms:p-0.5", children: ["url", "entry"].map((a) => /* @__PURE__ */ n.jsx(
      d.Button,
      {
        type: "button",
        size: "sm",
        role: "radio",
        "aria-checked": i === a,
        variant: i === a ? "secondary" : "ghost",
        onClick: () => f({ type: a, url: a === "url" ? s.url : void 0, entry_id: a === "entry" ? s.entry_id : void 0 }),
        children: a === "url" ? m("Address") : m("Entry")
      },
      a
    )) }),
    /* @__PURE__ */ n.jsxs("div", { className: "cms:grid cms:gap-2 cms:md:grid-cols-[2fr_1fr_auto] cms:md:items-start", children: [
      i === "url" ? /* @__PURE__ */ n.jsx(
        d.Input,
        {
          id: r,
          "aria-label": m(":field: address", { field: e }),
          placeholder: m("https://… or /about"),
          value: typeof s.url == "string" ? s.url : "",
          onChange: (a) => f({ url: a.target.value }),
          "aria-invalid": c.url !== void 0
        }
      ) : /* @__PURE__ */ n.jsx(
        ve,
        {
          id: r,
          invalid: c.entry_id !== void 0,
          multiple: !1,
          max: null,
          collections: o,
          value: typeof s.entry_id == "number" ? s.entry_id : null,
          onChange: (a) => f({ entry_id: typeof a == "number" ? a : void 0 })
        }
      ),
      /* @__PURE__ */ n.jsx(
        d.Input,
        {
          "aria-label": m(":field: link text", { field: e }),
          placeholder: i === "entry" ? m("Link text (the entry's title)") : m("Link text"),
          value: typeof s.label == "string" ? s.label : "",
          onChange: (a) => f({ label: a.target.value })
        }
      ),
      /* @__PURE__ */ n.jsxs("label", { className: "cms:flex cms:h-9 cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ n.jsx(d.Checkbox, { checked: s.new_tab === !0, onCheckedChange: (a) => f({ new_tab: a }) }),
        m("New tab")
      ] }),
      /* @__PURE__ */ n.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ n.jsx(H, { message: c.url ?? c.entry_id ?? c.label ?? c.type }) })
    ] })
  ] });
}
function be(e, s) {
  return !s && (e.fields ?? []).every((t) => t.type === "text");
}
function Oe(e) {
  const s = j.useRef([]);
  return s.current = Qe(s.current, e), {
    keys: s.current,
    remove: (t) => {
      s.current = s.current.filter((c, r) => r !== t);
    },
    move: (t, c) => {
      s.current = d.moveItem(s.current, t, c);
    }
  };
}
function Ee() {
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
function ze({ keys: e, folding: s }) {
  if (e.length < 2) return null;
  const t = s.anyOpen(e);
  return /* @__PURE__ */ n.jsxs(d.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => s.setAll(e, t), children: [
    t ? /* @__PURE__ */ n.jsx(ts, {}) : /* @__PURE__ */ n.jsx(Se, {}),
    " ",
    t ? m("Collapse all") : m("Expand all")
  ] });
}
function Es({ field: e, value: s, onChange: t, errors: c, id: r, content: o = !1 }) {
  const i = e.fields ?? [], f = s.map(E), a = Oe(f.length), u = (g, h) => t(f.map((N, S) => S === g ? h : N)), k = (g) => {
    a.remove(g), t(f.filter((h, N) => N !== g));
  }, w = e.label ? e.label.toLowerCase().replace(/s$/, "") : m("row"), p = w.charAt(0).toUpperCase() + w.slice(1), b = f.map((g, h) => ({ row: g, index: h, key: a.keys[h] ?? String(h) })), x = Ee();
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ n.jsx(
      d.SortableList,
      {
        items: b,
        getId: (g) => g.key,
        getLabel: (g) => `${w} ${g.index + 1}`,
        onReorder: (g, h, N) => {
          a.move(h, N), t(g.map((S) => S.row));
        },
        children: ({ row: g, index: h, key: N }, { handle: S }) => be(e, o) ? /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
          /* @__PURE__ */ n.jsx(d.SortableHandle, { ...S, label: m("Move :item :number", { item: w, number: h + 1 }), className: "cms:mt-1" }),
          i.map((v) => /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
            /* @__PURE__ */ n.jsx(
              d.Input,
              {
                "aria-label": v.label || v.handle,
                placeholder: v.label || v.handle,
                value: typeof g[v.handle] == "string" ? g[v.handle] : "",
                onChange: (D) => u(h, { ...g, [v.handle]: D.target.value })
              }
            ),
            /* @__PURE__ */ n.jsx(H, { message: c[`${h}.${v.handle}`] })
          ] }, v.handle)),
          /* @__PURE__ */ n.jsx(d.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": m("Remove :item :number", { item: w, number: h + 1 }), onClick: () => k(h), children: /* @__PURE__ */ n.jsx(ke, {}) })
        ] }) : (() => {
          const v = ne(c, String(h)), D = x.isCollapsed(N, Object.keys(v).length > 0);
          return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ n.jsx(
              Re,
              {
                label: `${p} ${h + 1}`,
                summary: je(i, g),
                handle: S,
                onRemove: () => k(h),
                collapsed: D,
                onToggle: () => x.toggle(N),
                controls: `${r}-${h}-fields`,
                hidden: o ? g._hidden === !0 : void 0,
                onHidden: (z) => u(h, { ...g, _hidden: z })
              }
            ),
            /* @__PURE__ */ n.jsx("div", { id: `${r}-${h}-fields`, hidden: D, children: !D && /* @__PURE__ */ n.jsx(re, { fields: i, value: g, onChange: (z) => u(h, z), errors: v, id: `${r}-${h}`, content: o }) })
          ] });
        })()
      }
    ),
    /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ n.jsxs(d.Button, { type: "button", variant: "outline", size: "sm", onClick: () => t([...f, o ? Xe() : {}]), children: [
        /* @__PURE__ */ n.jsx(we, {}),
        " ",
        m("Add :item", { item: w })
      ] }),
      !be(e, o) && /* @__PURE__ */ n.jsx(ze, { keys: b.map((g) => g.key), folding: x })
    ] })
  ] });
}
function zs({ field: e, value: s, onChange: t, errors: c, id: r }) {
  const o = e.blocks ?? [], i = s.map(E), f = Oe(i.length), a = (p, b) => t(i.map((x, g) => g === p ? b : x)), u = (p) => {
    f.remove(p), t(i.filter((b, x) => x !== p));
  }, k = i.map((p, b) => ({ block: p, index: b, key: f.keys[b] ?? String(b) })), w = Ee();
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    /* @__PURE__ */ n.jsx(
      d.SortableList,
      {
        items: k,
        getId: (p) => p.key,
        className: "cms:gap-3",
        getLabel: (p) => m(":type block", { type: o.find((b) => b.type === p.block.type)?.label ?? String(p.block.type) }),
        onReorder: (p, b, x) => {
          f.move(b, x), t(p.map((g) => g.block));
        },
        children: ({ block: p, index: b, key: x }, { handle: g }) => {
          const h = o.find((v) => v.type === p.type), N = ne(c, `${b}.values`), S = w.isCollapsed(x, Object.keys(N).length > 0 || c[`${b}.type`] !== void 0);
          return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ n.jsx(
              Re,
              {
                label: h?.label ?? String(p.type),
                summary: h ? je(h.fields, E(p.values)) : null,
                badge: !0,
                handle: g,
                onRemove: () => u(b),
                collapsed: S,
                onToggle: () => w.toggle(x),
                controls: `${r}-${b}-fields`,
                hidden: p.hidden === !0,
                onHidden: (v) => a(b, { ...p, hidden: v })
              }
            ),
            /* @__PURE__ */ n.jsx("div", { id: `${r}-${b}-fields`, hidden: S, children: S ? null : h ? /* @__PURE__ */ n.jsx(
              re,
              {
                fields: h.fields,
                value: E(p.values),
                onChange: (v) => a(b, { ...p, values: v }),
                errors: N,
                id: `${r}-${b}`,
                content: !0
              }
            ) : /* @__PURE__ */ n.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: m("This kind of block no longer exists. Its values are kept.") }) }),
            /* @__PURE__ */ n.jsx(H, { message: c[`${b}.type`] })
          ] });
        }
      }
    ),
    /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ n.jsxs(d.DropdownMenu, { children: [
        /* @__PURE__ */ n.jsx(d.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ n.jsxs(d.Button, { type: "button", variant: "outline", size: "sm", disabled: o.length === 0, children: [
          /* @__PURE__ */ n.jsx(we, {}),
          " ",
          m("Add block")
        ] }) }),
        /* @__PURE__ */ n.jsx(d.DropdownMenuContent, { align: "start", children: o.map((p) => /* @__PURE__ */ n.jsx(d.DropdownMenuItem, { onSelect: () => t([...i, Ge(p.type)]), children: p.label }, p.type)) })
      ] }),
      /* @__PURE__ */ n.jsx(ze, { keys: k.map((p) => p.key), folding: w })
    ] })
  ] });
}
function Re({ label: e, summary: s, badge: t = !1, handle: c, onRemove: r, collapsed: o, onToggle: i, controls: f, hidden: a, onHidden: u }) {
  const k = o ? es : ss, w = s ? `${e}: ${s}` : e;
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ n.jsx(d.SortableHandle, { ...c, label: m("Move :title", { title: w }) }),
    /* @__PURE__ */ n.jsxs(
      "button",
      {
        type: "button",
        onClick: i,
        "aria-expanded": !o,
        "aria-controls": f,
        className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:rounded-md cms:text-left cms:outline-none cms:focus-visible:ring-2 cms:focus-visible:ring-ring",
        children: [
          /* @__PURE__ */ n.jsx(k, { className: "cms:size-4 cms:shrink-0 cms:text-muted-foreground", "aria-hidden": !0 }),
          t ? /* @__PURE__ */ n.jsx(d.Badge, { variant: "secondary", children: e }) : /* @__PURE__ */ n.jsx("span", { className: "cms:shrink-0 cms:text-sm cms:font-medium", children: e }),
          s && /* @__PURE__ */ n.jsx("span", { className: "cms:truncate cms:text-sm cms:text-muted-foreground", children: s }),
          /* @__PURE__ */ n.jsx("span", { className: "cms:sr-only", children: o ? m("(collapsed)") : "" })
        ]
      }
    ),
    a !== void 0 && /* @__PURE__ */ n.jsxs("label", { className: "cms:flex cms:shrink-0 cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", title: m("Off: kept here, but left out of the page"), children: [
      /* @__PURE__ */ n.jsx(d.Switch, { checked: !a, onCheckedChange: (p) => u(!p), "aria-label": m(":title: visible on site", { title: w }) }),
      m("Visible on site")
    ] }),
    /* @__PURE__ */ n.jsx(
      d.Button,
      {
        type: "button",
        variant: "ghost",
        size: "icon",
        className: "cms:size-8 cms:shrink-0 cms:text-destructive",
        "aria-label": m("Remove :title", { title: w }),
        onClick: r,
        children: /* @__PURE__ */ n.jsx(ke, {})
      }
    )
  ] });
}
export {
  re as A,
  Zs as B,
  ss as C,
  ks as D,
  ge as E,
  xe as F,
  Cs as G,
  Se as H,
  qe as I,
  Ws as M,
  ct as O,
  us as T,
  et as a,
  ne as b,
  ps as c,
  nt as d,
  ys as e,
  $s as f,
  Xs as g,
  Js as h,
  st as i,
  tt as j,
  Ns as k,
  Ys as l,
  js as m,
  Gs as n,
  ws as o,
  lt as p,
  ot as q,
  Qs as r,
  rt as s,
  at as t,
  hs as u,
  fs as v,
  it as w,
  gs as x,
  xs as y,
  ms as z
};
