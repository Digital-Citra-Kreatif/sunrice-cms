import { j as n, t as x } from "./admin-BJZuWFbX.js";
import { c as O, _ as N } from "./createLucideIcon-Ccbp7F45.js";
import { u as d } from "./ui-Dh5wfMwT.js";
import { E as X } from "./EntriesPicker-BIdhV-Id.js";
import { F as I } from "./FieldError-CrnP2AMi.js";
import { c as $, T as de, o as fe, d as z, e as pe, g as he, i as Y, n as xe, f as ge, s as ye, b as be, h as je, l as ve } from "./TermsPicker-BllVnJA-.js";
import { P as J } from "./plus-COqahUZ2.js";
import { T as Z } from "./Confirm-DcnjU4f1.js";
import { C as ke } from "./chevron-right-9qVV6b-Q.js";
const Q = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
Q.node;
const we = O(Q);
const ee = {
  name: "chevrons-down-up",
  size: 24,
  node: [
    ["path", { d: "m7 20 5-5 5 5", key: "13a0gw" }],
    ["path", { d: "m7 4 5 5 5-5", key: "1kwcof" }]
  ]
};
ee.node;
const $e = O(ee);
const se = {
  name: "info",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M12 16v-4", key: "1dtifu" }],
    ["path", { d: "M12 8h.01", key: "e9boi3" }]
  ]
};
se.node;
const Ne = O(se), _e = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
function S(e) {
  return e.replace(/[&<>"']/g, (s) => _e[s] ?? s);
}
function Se(e) {
  return /[\u0000- \u007f]/.test(e) ? !1 : /^(https?:\/\/[^/]|mailto:|tel:|\/(?![/\\])|#)/i.test(e);
}
const q = new RegExp("`([^`\\n]+)`|\\[([^\\]\\n]+)\\]\\(((?:[^()\\s]|\\([^()\\s]*\\))+)\\)|\\*\\*(?=\\S)(.+?)(?<=\\S)\\*\\*|\\*(?=[^\\s*])([^*\\n]+?)(?<=\\S)\\*");
function C(e, s = !1) {
  let t = "", a = e;
  for (let r = q.exec(a); r !== null; r = q.exec(a)) {
    t += S(a.slice(0, r.index));
    const [o, c, f, i, b, g] = r;
    c !== void 0 ? t += `<code>${S(c)}</code>` : f !== void 0 && i !== void 0 ? t += s || !Se(i) ? C(f, s) : `<a href="${S(i)}" target="_blank" rel="noopener noreferrer">${C(f, !0)}</a>` : b !== void 0 ? t += `<strong>${C(b, s)}</strong>` : g !== void 0 ? t += `<em>${C(g, s)}</em>` : t += S(o), a = a.slice(r.index + o.length);
  }
  return t + S(a);
}
const Ae = ["text", "number"], Ce = ["group", "repeater", "flexible"], Te = ["placeholder", "prefix", "suffix"];
function T(e) {
  return typeof e == "string" && e.trim() !== "" ? e.trim() : null;
}
function te(e) {
  return { hint: T(e.hint), tooltip: T(e.hint_tooltip) };
}
function ne(e) {
  return Ae.includes(e.type) ? { prefix: T(e.config?.prefix), suffix: T(e.config?.suffix) } : { prefix: null, suffix: null };
}
function L({ field: e, id: s, label: t, maxWidth: a = "cms:max-w-[60%]" }) {
  const { hint: r, tooltip: o } = te(e);
  return r === null && o === null ? null : /* @__PURE__ */ n.jsxs("span", { className: `cms:ml-auto cms:flex ${a} cms:min-w-0 cms:shrink-0 cms:items-center cms:gap-1 cms:text-xs cms:leading-none cms:text-muted-foreground`, children: [
    r !== null && /* @__PURE__ */ n.jsx("span", { id: `${s}-hint`, className: "cms:min-w-0 cms:truncate cms:py-0.5", title: r, children: r }),
    o !== null && /* @__PURE__ */ n.jsxs(d.Tooltip, { children: [
      /* @__PURE__ */ n.jsx(d.TooltipTrigger, { asChild: !0, children: /* @__PURE__ */ n.jsx(
        "button",
        {
          type: "button",
          "aria-label": x("More about :field", { field: t }),
          className: "cms:-m-1 cms:inline-flex cms:shrink-0 cms:rounded-full cms:p-1 cms:text-muted-foreground cms:outline-none cms:hover:text-foreground cms:focus-visible:ring-2 cms:focus-visible:ring-ring",
          children: /* @__PURE__ */ n.jsx(Ne, { className: "cms:size-3.5", "aria-hidden": !0 })
        }
      ) }),
      /* @__PURE__ */ n.jsx(d.TooltipContent, { className: "cms:max-w-xs cms:text-left cms:whitespace-pre-line", children: o })
    ] })
  ] });
}
function Ie({ text: e, id: s, className: t = "" }) {
  return !e || e.trim() === "" ? null : /* @__PURE__ */ n.jsx(
    "p",
    {
      id: s,
      className: `cms:text-sm cms:text-muted-foreground cms:[overflow-wrap:anywhere] cms:[&_a]:font-medium cms:[&_a]:text-foreground cms:[&_a]:underline cms:[&_a]:underline-offset-2 cms:[&_a:hover]:text-primary cms:[&_code]:rounded cms:[&_code]:bg-muted cms:[&_code]:px-1 cms:[&_code]:font-mono cms:[&_code]:text-[0.8125rem] cms:[&_strong]:font-semibold cms:[&_strong]:text-foreground ${t}`.trim(),
      dangerouslySetInnerHTML: { __html: C(e) }
    }
  );
}
const Ee = N.createContext(null);
function He({ id: e, className: s = "" }) {
  const t = N.useContext(Ee);
  return /* @__PURE__ */ n.jsx("p", { id: e, className: `cms:text-sm cms:text-muted-foreground ${s}`.trim(), children: t ? x("Not translatable: edit it in :language.", { language: t }) : x("Not translatable: edit it in the main language.") });
}
function P({ prefix: e, suffix: s, id: t, className: a = "", children: r }) {
  if (e === null && s === null) return /* @__PURE__ */ n.jsx(n.Fragment, { children: r });
  const o = "cms:flex cms:shrink-0 cms:items-center cms:bg-muted/60 cms:px-3 cms:text-sm cms:whitespace-nowrap cms:text-muted-foreground cms:select-none";
  return /* @__PURE__ */ n.jsxs("div", { "data-slot": "input-group", className: `cms:flex cms:h-10 cms:w-full cms:min-w-0 cms:items-stretch cms:overflow-hidden cms:rounded-md cms:border cms:border-input/80 cms:bg-card cms:shadow-xs cms:transition-[border-color,box-shadow] cms:duration-150 cms:hover:border-ring/45 cms:focus-within:border-ring/70 cms:focus-within:ring-4 cms:focus-within:ring-ring-glow cms:has-[[aria-invalid=true]]:border-destructive cms:has-[[aria-invalid=true]]:ring-destructive/20 cms:has-disabled:cursor-not-allowed cms:has-disabled:opacity-50 cms:has-[[readonly]]:bg-muted/30 cms:dark:bg-input/20 ${a}`.trim(), children: [
    e !== null && /* @__PURE__ */ n.jsx("span", { id: `${t}-prefix`, className: `${o} cms:border-r cms:border-input/80`, children: e }),
    r,
    s !== null && /* @__PURE__ */ n.jsx("span", { id: `${t}-suffix`, className: `${o} cms:border-l cms:border-input/80`, children: s })
  ] });
}
const V = "cms:h-full cms:min-w-0 cms:flex-1 cms:rounded-none cms:border-0 cms:bg-transparent cms:shadow-none cms:hover:border-0 cms:focus-visible:ring-0 cms:aria-invalid:ring-0 cms:disabled:opacity-100 cms:dark:bg-transparent", re = (e, s = {}) => e.replace(/:([A-Za-z_]+)/g, (t, a) => s[a] ?? t), hs = 5;
let Fe = 0;
const D = () => `f${++Fe}`;
function Oe(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function De(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^[0-9_]+/, "").replace(/_{2,}/g, "_").slice(0, 64);
}
function ae(e, s) {
  const t = new Set(s.map((o) => o.handle)), a = Oe(e) || "field";
  let r = a;
  for (let o = 2; t.has(r); o++)
    r = `${a}_${o}`;
  return r;
}
function Re(e) {
  return (e ?? []).map(({ fields: s, ...t }) => ({
    ...t,
    key: D(),
    fields: Re(s),
    handleTouched: !0,
    savedHandle: t.handle
  }));
}
function Me(e, s) {
  return e.map(({ key: t, handleTouched: a, savedHandle: r, fields: o, ...c }) => ({
    ...c,
    validation: (c.validation ?? []).map((f) => f.trim()).filter((f) => f !== ""),
    ...s(c.type) ? { fields: Me(o, s) } : {}
  }));
}
function xs(e, s, t) {
  return { key: D(), type: e, label: s, handle: ae(s, t), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function gs(e) {
  return e.type !== "fieldset" && e.savedHandle !== void 0 && e.savedHandle !== "" && e.handle !== e.savedHandle ? e.savedHandle : null;
}
function ze(e) {
  return e.map((s) => ({ ...s, savedHandle: s.handle, fields: ze(s.fields) }));
}
function ys(e, s, t) {
  if (e.handleTouched) return { ...e, label: s };
  const a = t.filter((r) => r.key !== e.key);
  return { ...e, label: s, handle: ae(s || e.type, a) };
}
function qe(e, s) {
  const t = `${s}.`, a = {};
  for (const [r, o] of Object.entries(e))
    r.startsWith(t) && (a[r.slice(t.length)] = o);
  return a;
}
function R(e, s) {
  const t = e[s];
  return { ...qe(e, s), ...t !== void 0 ? { "": t } : {} };
}
function bs(e, s) {
  return Object.keys(e).filter((t) => t === s || t.startsWith(`${s}.`));
}
function js(e, s) {
  return Object.keys(e).some((t) => t === s || t.startsWith(`${s}.`));
}
function vs(e, s) {
  return s.filter((t) => t.key !== e.key && t.handle !== "" && t.type !== "fieldset");
}
function ks(e, s, t, a = re) {
  return e.type === "fieldset" ? null : t?.includes(e.handle) ? a('":handle" is used by the content itself; choose another handle.', { handle: e.handle }) : e.handle !== "" && s.some((r) => r.key !== e.key && r.type !== "fieldset" && r.handle === e.handle) ? a('There is already a field ":handle" here.', { handle: e.handle }) : null;
}
function ws(e, s) {
  return typeof e.translatable == "boolean" ? e.translatable : s;
}
function $s(e, s, t) {
  return { ...e, translatable: s === t ? null : s };
}
function Le(e, s, t = []) {
  const a = /* @__PURE__ */ new Set([...s.map((c) => c.handle), ...t]), r = `${(De(e) || "field").slice(0, 56)}_copy`;
  let o = r;
  for (let c = 2; a.has(o); c++)
    o = `${r}_${c}`;
  return o;
}
function ce(e) {
  const { key: s, savedHandle: t, fields: a, ...r } = e;
  return { ...structuredClone(r), key: D(), fields: a.map(ce) };
}
function Ns(e, s, t = [], a = re) {
  const r = e[s];
  if (r === void 0) return null;
  const o = r.label || r.handle, c = {
    ...ce(r),
    label: a(":label (copy)", { label: o }),
    handle: r.type === "fieldset" ? r.handle : Le(r.handle, e, t),
    handleTouched: !0
  };
  return { fields: [...e.slice(0, s + 1), c, ...e.slice(s + 1)], copy: c };
}
function Pe(e, s) {
  const t = e.condition;
  return !t || "rules" in t ? null : (t.operator === "filled" || t.operator === "equals" && (t.value === !0 || t.value === "true")) && s.some((r) => r.handle === t.field && r.type === "toggle") ? t.field : null;
}
function _s(e) {
  const s = (c) => c.type === "number" || c.type === "text" && (c.instructions ?? "").length <= 60, t = (c) => c.type === "text" && Te.includes(c.handle), a = {}, r = [];
  for (const c of e) {
    const f = Pe(c, e);
    f === null ? r.push(c) : (a[f] ??= []).push(c);
  }
  const o = r.filter((c) => !t(c));
  return { options: o.filter((c) => !s(c)), limits: o.filter(s), appearance: r.filter(t), dependents: a };
}
const Ve = ["html", "css", "javascript", "json", "plain"];
function Be(e) {
  const s = e.config?.language;
  return typeof s == "string" && Ve.includes(s) ? s : "plain";
}
const Ss = [
  { value: "equals", label: "is", needsValue: !0 },
  { value: "not_equals", label: "is not", needsValue: !0 },
  { value: "filled", label: "is filled in", needsValue: !1 },
  { value: "empty", label: "is empty", needsValue: !1 }
];
function B(e) {
  return e === !0 ? "true" : e === !1 ? "false" : typeof e == "string" || typeof e == "number" ? String(e) : "";
}
function Ke(e) {
  return e ? "rules" in e ? Array.isArray(e.rules) ? e.rules : [] : [e] : [];
}
function Ue(e) {
  return e && "rules" in e && e.match === "any" ? "any" : "all";
}
function As(e, s) {
  return e.length === 0 ? null : e.length === 1 ? e[0] : { match: s, rules: e };
}
function K(e, s) {
  const t = s[e.field], a = t != null && t !== "" && t !== !1 && !(Array.isArray(t) && t.length === 0), r = (Array.isArray(t) ? t : [t]).map(B).includes(B(e.value));
  switch (e.operator) {
    case "equals":
      return r;
    case "not_equals":
      return !r;
    case "filled":
      return a;
    default:
      return !a;
  }
}
function Ge(e, s) {
  const t = Ke(e.condition);
  return t.length === 0 ? !0 : Ue(e.condition) === "any" ? t.some((a) => K(a, s)) : t.every((a) => K(a, s));
}
function Cs(e) {
  const s = e?.config ?? {};
  switch (e?.type) {
    case "select": {
      const t = (Array.isArray(s.options) ? s.options : []).flatMap((a) => {
        if (typeof a == "string" && a !== "") return [{ value: a, label: a }];
        if (a && typeof a == "object" && typeof a.value == "string" && a.value !== "") {
          const { value: r, label: o } = a;
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
function Ts(e) {
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
const We = [25, 33, 50, 66, 75, 100];
function Xe(e) {
  return We.find((s) => s === e.width) ?? 100;
}
function Ye(e = "cms:gap-x-4 cms:gap-y-6") {
  return `cms:@container cms:grid cms:grid-cols-12 cms:items-start ${e}`;
}
const Je = {
  25: "cms:@lg:col-span-3",
  33: "cms:@lg:col-span-4",
  50: "cms:@lg:col-span-6",
  66: "cms:@lg:col-span-8",
  75: "cms:@lg:col-span-9",
  100: ""
};
function U(e) {
  return `cms:col-span-12 cms:min-w-0 ${Je[Xe(e)]}`.trim();
}
function Is(e, s) {
  const { width: t, ...a } = e;
  return s === 100 ? a : { ...a, width: s };
}
const H = "__none";
function F(e) {
  const s = e.config?.options;
  return Array.isArray(s) ? s.flatMap((t) => {
    if (typeof t == "string") return [{ value: t, label: t }];
    if (t && typeof t == "object" && typeof t.value == "string") {
      const { value: a, label: r } = t;
      return [{ value: a, label: r || a }];
    }
    return [];
  }) : [];
}
const Ze = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function le(e) {
  if (e.label) return e.label;
  const s = e.handle.replace(/_/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function G({ field: e, value: s, onChange: t, errors: a, id: r, content: o = !1, fill: c = !1, marker: f = null, shared: i = e.shared === !0 }) {
  const b = le(e), g = Ze.includes(e.type) || ["select", "terms"].includes(e.type) && e.config?.multiple === !0, y = a[""] !== void 0, l = Ce.includes(e.type), m = e.instructions && e.instructions.trim() !== "" ? /* @__PURE__ */ n.jsx(Ie, { id: `${r}-help`, text: e.instructions }) : null, u = i ? /* @__PURE__ */ n.jsx(He, { id: `${r}-shared` }) : null, { hint: p } = te(e), { prefix: h, suffix: v } = ne(e), k = [p && `${r}-hint`, h && `${r}-prefix`, v && `${r}-suffix`, m && `${r}-help`, u && `${r}-shared`, y && `${r}-error`].filter(Boolean).join(" ") || void 0;
  return /* @__PURE__ */ n.jsxs(
    "div",
    {
      className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2",
      ...g ? { role: "group", "aria-labelledby": `${r}-label`, ...y ? { "aria-invalid": !0 } : {}, ...y || m || u ? { "aria-describedby": [m && `${r}-help`, u && `${r}-shared`, y && `${r}-error`].filter(Boolean).join(" ") } : {} } : {},
      children: [
        e.type === "toggle" ? /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
          /* @__PURE__ */ n.jsx(d.Switch, { id: r, checked: s === !0, "aria-describedby": k, onCheckedChange: (j) => t(j) }),
          /* @__PURE__ */ n.jsx(d.Label, { htmlFor: r, className: "cms:min-w-0", children: b }),
          f,
          /* @__PURE__ */ n.jsx(L, { field: e, id: r, label: b })
        ] }) : /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:min-h-4 cms:min-w-0 cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ n.jsxs(d.Label, { id: `${r}-label`, htmlFor: g ? void 0 : r, className: "cms:min-w-0", children: [
            b,
            e.required && /* @__PURE__ */ n.jsx("span", { className: "cms:text-destructive", children: " *" }),
            f
          ] }),
          /* @__PURE__ */ n.jsx(L, { field: e, id: r, label: b })
        ] }),
        l && m,
        l && u,
        /* @__PURE__ */ n.jsx(es, { field: e, value: s, onChange: t, errors: a, id: r, content: o, fill: c, describedBy: k }),
        ["text", "textarea", "code"].includes(e.type) && w(e, "max") !== void 0 && /* @__PURE__ */ n.jsx(Qe, { length: typeof s == "string" ? [...s].length : 0, max: w(e, "max") ?? 0 }),
        !l && m,
        !l && u,
        /* @__PURE__ */ n.jsx(I, { message: a[""], id: `${r}-error` })
      ]
    }
  );
}
function Qe({ length: e, max: s }) {
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
function es({ field: e, value: s, onChange: t, errors: a, id: r, content: o, fill: c = !1, describedBy: f }) {
  const i = a[""] !== void 0, { prefix: b, suffix: g } = ne(e), y = b !== null || g !== null;
  switch (e.type) {
    case "toggle":
      return null;
    case "file":
      return /* @__PURE__ */ n.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: x("Visitors attach a file here when they send a form.") });
    case "textarea":
      return /* @__PURE__ */ n.jsx(
        d.Textarea,
        {
          id: r,
          "aria-invalid": i,
          "aria-describedby": f,
          value: typeof s == "string" ? s : "",
          rows: w(e, "rows") ?? 4,
          placeholder: A(e, "placeholder"),
          onChange: (l) => t(l.target.value)
        }
      );
    case "code":
      return /* @__PURE__ */ n.jsx(
        d.CodeEditor,
        {
          id: r,
          "aria-labelledby": `${r}-label`,
          "aria-describedby": f,
          invalid: i,
          language: Be(e),
          value: typeof s == "string" ? s : "",
          placeholder: A(e, "placeholder"),
          onChange: (l) => t(l)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ n.jsx(d.RichTextEditor, { id: r, labelledBy: `${r}-label`, invalid: i, imageStyles: e.imageStyles, value: typeof s == "string" ? s : "", onChange: t });
    case "number": {
      const l = he(s);
      return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ n.jsx(P, { prefix: b, suffix: g, id: r, className: c ? "" : "cms:max-w-64", children: /* @__PURE__ */ n.jsx(
          d.Input,
          {
            id: r,
            type: "number",
            className: y ? V : c ? "cms:w-full" : "cms:max-w-48",
            placeholder: A(e, "placeholder"),
            "aria-invalid": i,
            "aria-describedby": [f, l && `${r}-grouped`].filter(Boolean).join(" ") || void 0,
            value: typeof s == "number" ? String(s) : typeof s == "string" ? s : "",
            min: w(e, "min"),
            max: w(e, "max"),
            step: w(e, "step") ?? "any",
            onChange: (m) => t(m.target.value === "" ? null : Number(m.target.value))
          }
        ) }),
        l && /* @__PURE__ */ n.jsx("span", { id: `${r}-grouped`, className: "cms:text-sm cms:tabular-nums cms:text-muted-foreground", children: l })
      ] });
    }
    case "date": {
      const l = e.config?.time === !0;
      return /* @__PURE__ */ n.jsx(
        d.DatePicker,
        {
          id: r,
          withTime: l,
          invalid: i,
          required: e.required === !0,
          value: z(pe(s, l)),
          onChange: (m) => t(z(m ?? ""))
        }
      );
    }
    case "select":
      return e.config?.multiple === !0 ? /* @__PURE__ */ n.jsx(
        ts,
        {
          options: F(e),
          value: Array.isArray(s) ? s.map(String) : [],
          onChange: t,
          invalid: i,
          empty: typeof e.config?.empty == "string" ? e.config.empty : void 0,
          inTickOrder: e.config?.in_tick_order === !0
        }
      ) : /* @__PURE__ */ n.jsx(
        ss,
        {
          options: F(e),
          value: typeof s == "string" ? s : null,
          onChange: t,
          id: r,
          fill: c,
          empty: fe(F(e), e.required === !0, typeof e.config?.default == "string" && e.config.default !== "", typeof s == "string" && s !== "")
        }
      );
    case "terms": {
      const l = e.config?.multiple === !0, m = Array.isArray(s) ? s.filter((u) => typeof u == "number") : typeof s == "number" ? s : null;
      return /* @__PURE__ */ n.jsx(
        de,
        {
          id: r,
          taxonomy: typeof e.taxonomy == "string" ? e.taxonomy : null,
          multiple: l,
          max: w(e, "max") ?? null,
          required: e.required === !0,
          invalid: i,
          value: l ? Array.isArray(m) ? m : [] : typeof m == "number" ? m : null,
          onChange: t
        }
      );
    }
    case "entries":
      return /* @__PURE__ */ n.jsx(
        X,
        {
          id: r,
          invalid: i,
          multiple: e.config?.multiple === !0,
          max: w(e, "max") ?? null,
          collections: e.collections ?? [],
          onChange: t,
          value: typeof s == "number" || Array.isArray(s) && s.every((l) => typeof l == "number") ? s : null
        }
      );
    case "link":
      return /* @__PURE__ */ n.jsx(
        ns,
        {
          label: le(e),
          value: $(s),
          onChange: t,
          errors: a,
          id: r,
          collections: e.collections ?? [],
          placeholder: A(e, "placeholder"),
          describedBy: f
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
          max: w(e, "max") ?? null,
          types: Array.isArray(e.config?.types) ? e.config.types : [],
          value: typeof s == "number" || Array.isArray(s) && s.every((l) => typeof l == "number") ? s : null,
          onChange: t
        }
      );
    case "group":
      return /* @__PURE__ */ n.jsx(M, { fields: e.fields ?? [], value: $(s), onChange: t, errors: a, id: r, content: o });
    case "repeater":
      return /* @__PURE__ */ n.jsx(rs, { field: e, value: Array.isArray(s) ? s : [], onChange: t, errors: a, id: r, content: o });
    case "flexible":
      return /* @__PURE__ */ n.jsx(as, { field: e, value: Array.isArray(s) ? s : [], onChange: t, errors: a, id: r });
    default:
      return /* @__PURE__ */ n.jsx(P, { prefix: b, suffix: g, id: r, children: /* @__PURE__ */ n.jsx(
        d.Input,
        {
          id: r,
          "aria-invalid": i,
          "aria-describedby": f,
          className: y ? V : void 0,
          value: typeof s == "string" ? s : "",
          placeholder: A(e, "placeholder"),
          onChange: (l) => t(l.target.value)
        }
      ) });
  }
}
function w(e, s) {
  const t = e.config?.[s];
  return typeof t == "number" ? t : void 0;
}
function A(e, s) {
  const t = e.config?.[s];
  return typeof t == "string" ? t : void 0;
}
function M({ fields: e, value: s, onChange: t, errors: a, id: r, content: o, bare: c = !1 }) {
  const f = /* @__PURE__ */ n.jsx("div", { className: Ye(c ? void 0 : "cms:gap-4"), children: e.filter((i) => Ge(i, s)).map((i) => i.shared ? (
    // Greyed out, with where to edit it under it.
    /* @__PURE__ */ n.jsx("fieldset", { disabled: !0, className: `cms:flex cms:flex-col cms:gap-1 cms:opacity-60 ${U(i)}`, children: /* @__PURE__ */ n.jsx(G, { id: `${r}-${i.handle}`, field: i, value: s[i.handle], content: o, errors: {}, onChange: () => {
    }, shared: !0 }) }, i.handle)
  ) : /* @__PURE__ */ n.jsx("div", { className: U(i), children: /* @__PURE__ */ n.jsx(
    G,
    {
      id: `${r}-${i.handle}`,
      field: i,
      value: s[i.handle],
      content: o,
      errors: R(a, i.handle),
      onChange: (b) => t({ ...s, [i.handle]: b })
    }
  ) }, i.handle)) });
  return c ? f : /* @__PURE__ */ n.jsx("div", { className: "cms:rounded-lg cms:border cms:p-4", children: f });
}
function ss({ options: e, value: s, onChange: t, id: a, empty: r, fill: o = !1 }) {
  return /* @__PURE__ */ n.jsxs(d.Select, { value: s ?? H, onValueChange: (c) => t(c === H ? null : c), children: [
    /* @__PURE__ */ n.jsx(d.SelectTrigger, { id: a, className: o ? "cms:w-full" : "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ n.jsx(d.SelectValue, {}) }),
    /* @__PURE__ */ n.jsxs(d.SelectContent, { children: [
      r && /* @__PURE__ */ n.jsx(d.SelectItem, { value: H, children: x("None") }),
      e.map((c) => /* @__PURE__ */ n.jsx(d.SelectItem, { value: c.value, children: c.label }, c.value))
    ] })
  ] });
}
function ts({ options: e, value: s, onChange: t, empty: a, inTickOrder: r = !1, invalid: o = !1 }) {
  return e.length === 0 ? /* @__PURE__ */ n.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: a ?? x("Nothing to choose from yet.") }) : /* @__PURE__ */ n.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2", children: e.map((c) => /* @__PURE__ */ n.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
    /* @__PURE__ */ n.jsx(
      d.Checkbox,
      {
        checked: s.includes(c.value),
        "aria-invalid": o || void 0,
        onCheckedChange: (f) => t(f ? r ? [...s.filter((i) => i !== c.value), c.value] : e.map((i) => i.value).filter((i) => i === c.value || s.includes(i)) : s.filter((i) => i !== c.value))
      }
    ),
    c.label,
    r && s.includes(c.value) && /* @__PURE__ */ n.jsxs("span", { className: "cms:text-xs cms:text-muted-foreground", "aria-label": `number ${s.indexOf(c.value) + 1}`, children: [
      "#",
      s.indexOf(c.value) + 1
    ] })
  ] }, c.value)) });
}
function ns({ label: e, value: s, onChange: t, errors: a, id: r, collections: o, placeholder: c, describedBy: f }) {
  const [i, b] = N.useState(s.type === "entry" ? "entry" : "url"), g = s.type === "entry" || s.type === "url" ? s.type : i, y = N.useRef({}), l = (u) => t(ve({ ...s, type: g, ...u })), m = (u) => {
    if (u === g) return;
    const p = je(s, g, u, y.current);
    y.current = p.remembered, b(u), t(p.value);
  };
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ n.jsx("div", { role: "radiogroup", "aria-label": x(":field: link to", { field: e }), className: "cms:inline-flex cms:w-fit cms:rounded-md cms:border cms:p-0.5", children: ["url", "entry"].map((u) => /* @__PURE__ */ n.jsx(
      d.Button,
      {
        type: "button",
        size: "sm",
        role: "radio",
        "aria-checked": g === u,
        variant: g === u ? "secondary" : "ghost",
        onClick: () => m(u),
        children: u === "url" ? x("Address") : x("Entry")
      },
      u
    )) }),
    /* @__PURE__ */ n.jsxs("div", { className: "cms:grid cms:gap-2 cms:md:grid-cols-[2fr_1fr_auto] cms:md:items-start", children: [
      g === "url" ? /* @__PURE__ */ n.jsx(
        d.Input,
        {
          id: r,
          "aria-label": x(":field: address", { field: e }),
          placeholder: c || x("https://… or /about"),
          "aria-describedby": f,
          value: typeof s.url == "string" ? s.url : "",
          onChange: (u) => l({ url: u.target.value }),
          "aria-invalid": a.url !== void 0
        }
      ) : /* @__PURE__ */ n.jsx(
        X,
        {
          id: r,
          invalid: a.entry_id !== void 0,
          multiple: !1,
          max: null,
          collections: o,
          value: typeof s.entry_id == "number" ? s.entry_id : null,
          onChange: (u) => l({ entry_id: typeof u == "number" ? u : void 0 })
        }
      ),
      /* @__PURE__ */ n.jsx(
        d.Input,
        {
          "aria-label": x(":field: link text", { field: e }),
          placeholder: g === "entry" ? x("Link text (the entry's title)") : x("Link text"),
          value: typeof s.label == "string" ? s.label : "",
          onChange: (u) => l({ label: u.target.value })
        }
      ),
      /* @__PURE__ */ n.jsxs("label", { className: "cms:flex cms:h-9 cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ n.jsx(d.Checkbox, { checked: s.new_tab === !0, onCheckedChange: (u) => l({ new_tab: u }) }),
        x("New tab")
      ] }),
      /* @__PURE__ */ n.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ n.jsx(I, { message: a.url ?? a.entry_id ?? a.label ?? a.type }) })
    ] })
  ] });
}
function W(e, s) {
  return !s && (e.fields ?? []).every((t) => t.type === "text");
}
function oe(e) {
  const s = N.useRef([]);
  return s.current = ye(s.current, e), {
    keys: s.current,
    remove: (t) => {
      s.current = s.current.filter((a, r) => r !== t);
    },
    move: (t, a) => {
      s.current = d.moveItem(s.current, t, a);
    }
  };
}
function ie() {
  const [e, s] = N.useState(() => /* @__PURE__ */ new Set());
  return {
    isCollapsed: (t, a) => !a && e.has(t),
    toggle: (t) => s((a) => {
      const r = new Set(a);
      return r.delete(t) || r.add(t), r;
    }),
    setAll: (t, a) => s(a ? new Set(t) : /* @__PURE__ */ new Set()),
    anyOpen: (t) => t.some((a) => !e.has(a))
  };
}
function me({ keys: e, folding: s }) {
  if (e.length < 2) return null;
  const t = s.anyOpen(e);
  return /* @__PURE__ */ n.jsxs(d.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => s.setAll(e, t), children: [
    t ? /* @__PURE__ */ n.jsx($e, {}) : /* @__PURE__ */ n.jsx(be, {}),
    " ",
    t ? x("Collapse all") : x("Expand all")
  ] });
}
function rs({ field: e, value: s, onChange: t, errors: a, id: r, content: o = !1 }) {
  const c = e.fields ?? [], f = s.map($), i = oe(f.length), b = (p, h) => t(f.map((v, k) => k === p ? h : v)), g = (p) => {
    i.remove(p), t(f.filter((h, v) => v !== p));
  }, y = e.label ? e.label.toLowerCase().replace(/s$/, "") : x("row"), l = y.charAt(0).toUpperCase() + y.slice(1), m = f.map((p, h) => ({ row: p, index: h, key: i.keys[h] ?? String(h) })), u = ie();
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ n.jsx(
      d.SortableList,
      {
        items: m,
        getId: (p) => p.key,
        getLabel: (p) => `${y} ${p.index + 1}`,
        onReorder: (p, h, v) => {
          i.move(h, v), t(p.map((k) => k.row));
        },
        children: ({ row: p, index: h, key: v }, { handle: k }) => W(e, o) ? /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
          /* @__PURE__ */ n.jsx(d.SortableHandle, { ...k, label: x("Move :item :number", { item: y, number: h + 1 }), className: "cms:mt-1" }),
          c.map((j) => /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
            /* @__PURE__ */ n.jsx(
              d.Input,
              {
                "aria-label": j.label || j.handle,
                placeholder: j.label || j.handle,
                value: typeof p[j.handle] == "string" ? p[j.handle] : "",
                onChange: (_) => b(h, { ...p, [j.handle]: _.target.value })
              }
            ),
            /* @__PURE__ */ n.jsx(I, { message: a[`${h}.${j.handle}`] })
          ] }, j.handle)),
          /* @__PURE__ */ n.jsx(d.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": x("Remove :item :number", { item: y, number: h + 1 }), onClick: () => g(h), children: /* @__PURE__ */ n.jsx(Z, {}) })
        ] }) : (() => {
          const j = R(a, String(h)), _ = u.isCollapsed(v, Object.keys(j).length > 0);
          return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ n.jsx(
              ue,
              {
                label: `${l} ${h + 1}`,
                summary: Y(c, p),
                handle: k,
                onRemove: () => g(h),
                collapsed: _,
                onToggle: () => u.toggle(v),
                controls: `${r}-${h}-fields`,
                hidden: o ? p._hidden === !0 : void 0,
                onHidden: (E) => b(h, { ...p, _hidden: E })
              }
            ),
            /* @__PURE__ */ n.jsx("div", { id: `${r}-${h}-fields`, hidden: _, children: !_ && /* @__PURE__ */ n.jsx(M, { fields: c, value: p, onChange: (E) => b(h, E), errors: j, id: `${r}-${h}`, content: o }) })
          ] });
        })()
      }
    ),
    /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ n.jsxs(d.Button, { type: "button", variant: "outline", size: "sm", onClick: () => t([...f, o ? ge(e.defaults) : {}]), children: [
        /* @__PURE__ */ n.jsx(J, {}),
        " ",
        x("Add :item", { item: y })
      ] }),
      !W(e, o) && /* @__PURE__ */ n.jsx(me, { keys: m.map((p) => p.key), folding: u })
    ] })
  ] });
}
function as({ field: e, value: s, onChange: t, errors: a, id: r }) {
  const o = e.blocks ?? [], c = s.map($), f = oe(c.length), i = (l, m) => t(c.map((u, p) => p === l ? m : u)), b = (l) => {
    f.remove(l), t(c.filter((m, u) => u !== l));
  }, g = c.map((l, m) => ({ block: l, index: m, key: f.keys[m] ?? String(m) })), y = ie();
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    /* @__PURE__ */ n.jsx(
      d.SortableList,
      {
        items: g,
        getId: (l) => l.key,
        className: "cms:gap-3",
        getLabel: (l) => x(":type block", { type: o.find((m) => m.type === l.block.type)?.label ?? String(l.block.type) }),
        onReorder: (l, m, u) => {
          f.move(m, u), t(l.map((p) => p.block));
        },
        children: ({ block: l, index: m, key: u }, { handle: p }) => {
          const h = o.find((j) => j.type === l.type), v = R(a, `${m}.values`), k = y.isCollapsed(u, Object.keys(v).length > 0 || a[`${m}.type`] !== void 0);
          return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ n.jsx(
              ue,
              {
                label: h?.label ?? String(l.type),
                summary: h ? Y(h.fields, $(l.values)) : null,
                badge: !0,
                handle: p,
                onRemove: () => b(m),
                collapsed: k,
                onToggle: () => y.toggle(u),
                controls: `${r}-${m}-fields`,
                hidden: l.hidden === !0,
                onHidden: (j) => i(m, { ...l, hidden: j })
              }
            ),
            /* @__PURE__ */ n.jsx("div", { id: `${r}-${m}-fields`, hidden: k, children: k ? null : h ? /* @__PURE__ */ n.jsx(
              M,
              {
                fields: h.fields,
                value: $(l.values),
                onChange: (j) => i(m, { ...l, values: j }),
                errors: v,
                id: `${r}-${m}`,
                content: !0
              }
            ) : /* @__PURE__ */ n.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: x("This kind of block no longer exists. Its values are kept.") }) }),
            /* @__PURE__ */ n.jsx(I, { message: a[`${m}.type`] })
          ] });
        }
      }
    ),
    /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ n.jsxs(d.DropdownMenu, { children: [
        /* @__PURE__ */ n.jsx(d.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ n.jsxs(d.Button, { type: "button", variant: "outline", size: "sm", disabled: o.length === 0, children: [
          /* @__PURE__ */ n.jsx(J, {}),
          " ",
          x("Add block")
        ] }) }),
        /* @__PURE__ */ n.jsx(d.DropdownMenuContent, { align: "start", children: o.map((l) => /* @__PURE__ */ n.jsx(d.DropdownMenuItem, { onSelect: () => t([...c, xe(l.type, l.defaults)]), children: l.label }, l.type)) })
      ] }),
      /* @__PURE__ */ n.jsx(me, { keys: g.map((l) => l.key), folding: y })
    ] })
  ] });
}
function ue({ label: e, summary: s, badge: t = !1, handle: a, onRemove: r, collapsed: o, onToggle: c, controls: f, hidden: i, onHidden: b }) {
  const g = o ? ke : we, y = s ? `${e}: ${s}` : e;
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ n.jsx(d.SortableHandle, { ...a, label: x("Move :title", { title: y }) }),
    /* @__PURE__ */ n.jsxs(
      "button",
      {
        type: "button",
        onClick: c,
        "aria-expanded": !o,
        "aria-controls": f,
        className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:rounded-md cms:text-left cms:outline-none cms:focus-visible:ring-2 cms:focus-visible:ring-ring",
        children: [
          /* @__PURE__ */ n.jsx(g, { className: "cms:size-4 cms:shrink-0 cms:text-muted-foreground", "aria-hidden": !0 }),
          t ? /* @__PURE__ */ n.jsx(d.Badge, { variant: "secondary", children: e }) : /* @__PURE__ */ n.jsx("span", { className: "cms:shrink-0 cms:text-sm cms:font-medium", children: e }),
          s && /* @__PURE__ */ n.jsx("span", { className: "cms:truncate cms:text-sm cms:text-muted-foreground", children: s }),
          /* @__PURE__ */ n.jsx("span", { className: "cms:sr-only", children: o ? x("(collapsed)") : "" })
        ]
      }
    ),
    i !== void 0 && /* @__PURE__ */ n.jsxs("label", { className: "cms:flex cms:shrink-0 cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", title: x("Off: kept here, but left out of the page"), children: [
      /* @__PURE__ */ n.jsx(d.Switch, { checked: !i, onCheckedChange: (l) => b(!l), "aria-label": x(":title: visible on site", { title: y }) }),
      x("Visible on site")
    ] }),
    /* @__PURE__ */ n.jsx(
      d.Button,
      {
        type: "button",
        variant: "ghost",
        size: "icon",
        className: "cms:size-8 cms:shrink-0 cms:text-destructive",
        "aria-label": x("Remove :title", { title: y }),
        onClick: r,
        children: /* @__PURE__ */ n.jsx(Z, {})
      }
    )
  ] });
}
export {
  bs as A,
  Ee as B,
  we as C,
  Ge as D,
  U as E,
  G as F,
  Ye as G,
  Ie as H,
  le as I,
  L as J,
  te as K,
  hs as M,
  Ss as O,
  He as S,
  ks as a,
  R as b,
  De as c,
  Ns as d,
  qe as e,
  Xe as f,
  gs as g,
  js as h,
  ws as i,
  $s as j,
  We as k,
  vs as l,
  Ke as m,
  xs as n,
  Ue as o,
  Cs as p,
  Ts as q,
  ys as r,
  _s as s,
  As as t,
  Re as u,
  Oe as v,
  Is as w,
  Me as x,
  ze as y,
  M as z
};
