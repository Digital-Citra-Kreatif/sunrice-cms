import { j as n, t as h } from "./admin-tiVz_6M3.js";
import { c as R, _ } from "./createLucideIcon-Ccbp7F45.js";
import { u as m } from "./ui-Dh5wfMwT.js";
import { E as Z } from "./EntriesPicker-y2PJEVBu.js";
import { F as O } from "./FieldError-CCTmblX3.js";
import { c as S, T as he, o as xe, d as z, e as ge, g as ye, i as Q, n as be, f as je, l as H, h as P, j as ve, L as ke, s as we, b as Ne, k as _e, m as $e, p as Se } from "./TermsPicker-oIGl2OBC.js";
import { P as ee } from "./plus-COqahUZ2.js";
import { T as se } from "./Confirm-n17IwOM3.js";
import { C as Ae } from "./chevron-right-9qVV6b-Q.js";
const te = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
te.node;
const Ce = R(te);
const ne = {
  name: "chevrons-down-up",
  size: 24,
  node: [
    ["path", { d: "m7 20 5-5 5 5", key: "13a0gw" }],
    ["path", { d: "m7 4 5 5 5-5", key: "1kwcof" }]
  ]
};
ne.node;
const Te = R(ne);
const re = {
  name: "info",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M12 16v-4", key: "1dtifu" }],
    ["path", { d: "M12 8h.01", key: "e9boi3" }]
  ]
};
re.node;
const Ie = R(re), Ee = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
function A(e) {
  return e.replace(/[&<>"']/g, (s) => Ee[s] ?? s);
}
function Oe(e) {
  return /[\u0000- \u007f]/.test(e) ? !1 : /^(https?:\/\/[^/]|mailto:|tel:|\/(?![/\\])|#)/i.test(e);
}
const V = new RegExp("`([^`\\n]+)`|\\[([^\\]\\n]+)\\]\\(((?:[^()\\s]|\\([^()\\s]*\\))+)\\)|\\*\\*(?=\\S)(.+?)(?<=\\S)\\*\\*|\\*(?=[^\\s*])([^*\\n]+?)(?<=\\S)\\*");
function T(e, s = !1) {
  let t = "", a = e;
  for (let r = V.exec(a); r !== null; r = V.exec(a)) {
    t += A(a.slice(0, r.index));
    const [c, l, d, i, j, x] = r;
    l !== void 0 ? t += `<code>${A(l)}</code>` : d !== void 0 && i !== void 0 ? t += s || !Oe(i) ? T(d, s) : `<a href="${A(i)}" target="_blank" rel="noopener noreferrer">${T(d, !0)}</a>` : j !== void 0 ? t += `<strong>${T(j, s)}</strong>` : x !== void 0 ? t += `<em>${T(x, s)}</em>` : t += A(c), a = a.slice(r.index + c.length);
  }
  return t + A(a);
}
const He = ["text", "number"], Le = ["group", "repeater", "flexible"], Fe = ["placeholder", "prefix", "suffix"];
function E(e) {
  return typeof e == "string" && e.trim() !== "" ? e.trim() : null;
}
function ae(e) {
  return { hint: E(e.hint), tooltip: E(e.hint_tooltip) };
}
function le(e) {
  return He.includes(e.type) ? { prefix: E(e.config?.prefix), suffix: E(e.config?.suffix) } : { prefix: null, suffix: null };
}
function K({ field: e, id: s, label: t, maxWidth: a = "cms:max-w-[60%]" }) {
  const { hint: r, tooltip: c } = ae(e);
  return r === null && c === null ? null : /* @__PURE__ */ n.jsxs("span", { className: `cms:ml-auto cms:flex ${a} cms:min-w-0 cms:shrink-0 cms:items-center cms:gap-1 cms:text-xs cms:leading-none cms:text-muted-foreground`, children: [
    r !== null && /* @__PURE__ */ n.jsx("span", { id: `${s}-hint`, className: "cms:min-w-0 cms:truncate cms:py-0.5", title: r, children: r }),
    c !== null && /* @__PURE__ */ n.jsxs(m.Tooltip, { children: [
      /* @__PURE__ */ n.jsx(m.TooltipTrigger, { asChild: !0, children: /* @__PURE__ */ n.jsx(
        "button",
        {
          type: "button",
          "aria-label": h("More about :field", { field: t }),
          className: "cms:-m-1 cms:inline-flex cms:shrink-0 cms:rounded-full cms:p-1 cms:text-muted-foreground cms:outline-none cms:hover:text-foreground cms:focus-visible:ring-2 cms:focus-visible:ring-ring",
          children: /* @__PURE__ */ n.jsx(Ie, { className: "cms:size-3.5", "aria-hidden": !0 })
        }
      ) }),
      /* @__PURE__ */ n.jsx(m.TooltipContent, { className: "cms:max-w-xs cms:text-left cms:whitespace-pre-line", children: c })
    ] })
  ] });
}
function Re({ text: e, id: s, className: t = "" }) {
  return !e || e.trim() === "" ? null : /* @__PURE__ */ n.jsx(
    "p",
    {
      id: s,
      className: `cms:text-sm cms:text-muted-foreground cms:[overflow-wrap:anywhere] cms:[&_a]:font-medium cms:[&_a]:text-foreground cms:[&_a]:underline cms:[&_a]:underline-offset-2 cms:[&_a:hover]:text-primary cms:[&_code]:rounded cms:[&_code]:bg-muted cms:[&_code]:px-1 cms:[&_code]:font-mono cms:[&_code]:text-[0.8125rem] cms:[&_strong]:font-semibold cms:[&_strong]:text-foreground ${t}`.trim(),
      dangerouslySetInnerHTML: { __html: T(e) }
    }
  );
}
const De = _.createContext(null);
function Me({ id: e, className: s = "" }) {
  const t = _.useContext(De);
  return /* @__PURE__ */ n.jsx("p", { id: e, className: `cms:text-sm cms:text-muted-foreground ${s}`.trim(), children: t ? h("Not translatable: edit it in :language.", { language: t }) : h("Not translatable: edit it in the main language.") });
}
function B({ prefix: e, suffix: s, id: t, className: a = "", children: r }) {
  if (e === null && s === null) return /* @__PURE__ */ n.jsx(n.Fragment, { children: r });
  const c = "cms:flex cms:shrink-0 cms:items-center cms:bg-muted/60 cms:px-3 cms:text-sm cms:whitespace-nowrap cms:text-muted-foreground cms:select-none";
  return /* @__PURE__ */ n.jsxs("div", { "data-slot": "input-group", className: `cms:flex cms:h-10 cms:w-full cms:min-w-0 cms:items-stretch cms:overflow-hidden cms:rounded-md cms:border cms:border-input/80 cms:bg-card cms:shadow-xs cms:transition-[border-color,box-shadow] cms:duration-150 cms:hover:border-ring/45 cms:focus-within:border-ring/70 cms:focus-within:ring-4 cms:focus-within:ring-ring-glow cms:has-[[aria-invalid=true]]:border-destructive cms:has-[[aria-invalid=true]]:ring-destructive/20 cms:has-disabled:cursor-not-allowed cms:has-disabled:opacity-50 cms:has-[[readonly]]:bg-muted/30 cms:dark:bg-input/20 ${a}`.trim(), children: [
    e !== null && /* @__PURE__ */ n.jsx("span", { id: `${t}-prefix`, className: `${c} cms:border-r cms:border-input/80`, children: e }),
    r,
    s !== null && /* @__PURE__ */ n.jsx("span", { id: `${t}-suffix`, className: `${c} cms:border-l cms:border-input/80`, children: s })
  ] });
}
const G = "cms:h-full cms:min-w-0 cms:flex-1 cms:rounded-none cms:border-0 cms:bg-transparent cms:shadow-none cms:hover:border-0 cms:focus-visible:ring-0 cms:aria-invalid:ring-0 cms:disabled:opacity-100 cms:dark:bg-transparent", ce = (e, s = {}) => e.replace(/:([A-Za-z_]+)/g, (t, a) => s[a] ?? t), ks = 5;
let qe = 0;
const D = () => `f${++qe}`;
function ze(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function Pe(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^[0-9_]+/, "").replace(/_{2,}/g, "_").slice(0, 64);
}
function oe(e, s) {
  const t = new Set(s.map((c) => c.handle)), a = ze(e) || "field";
  let r = a;
  for (let c = 2; t.has(r); c++)
    r = `${a}_${c}`;
  return r;
}
function Ve(e) {
  return (e ?? []).map(({ fields: s, ...t }) => ({
    ...t,
    key: D(),
    fields: Ve(s),
    handleTouched: !0,
    savedHandle: t.handle
  }));
}
function Ke(e, s) {
  return e.map(({ key: t, handleTouched: a, savedHandle: r, fields: c, ...l }) => ({
    ...l,
    validation: (l.validation ?? []).map((d) => d.trim()).filter((d) => d !== ""),
    ...s(l.type) ? { fields: Ke(c, s) } : {}
  }));
}
function ws(e, s, t) {
  return { key: D(), type: e, label: s, handle: oe(s, t), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function Ns(e) {
  return e.type !== "fieldset" && e.savedHandle !== void 0 && e.savedHandle !== "" && e.handle !== e.savedHandle ? e.savedHandle : null;
}
function Be(e) {
  return e.map((s) => ({ ...s, savedHandle: s.handle, fields: Be(s.fields) }));
}
function _s(e, s, t) {
  if (e.handleTouched) return { ...e, label: s };
  const a = t.filter((r) => r.key !== e.key);
  return { ...e, label: s, handle: oe(s || e.type, a) };
}
function Ge(e, s) {
  const t = `${s}.`, a = {};
  for (const [r, c] of Object.entries(e))
    r.startsWith(t) && (a[r.slice(t.length)] = c);
  return a;
}
function M(e, s) {
  const t = e[s];
  return { ...Ge(e, s), ...t !== void 0 ? { "": t } : {} };
}
function $s(e, s) {
  return Object.keys(e).filter((t) => t === s || t.startsWith(`${s}.`));
}
function Ss(e, s) {
  return Object.keys(e).some((t) => t === s || t.startsWith(`${s}.`));
}
function As(e, s) {
  return s.filter((t) => t.key !== e.key && t.handle !== "" && t.type !== "fieldset");
}
function Cs(e, s, t, a = ce) {
  return e.type === "fieldset" ? null : t?.includes(e.handle) ? a('":handle" is used by the content itself; choose another handle.', { handle: e.handle }) : e.handle !== "" && s.some((r) => r.key !== e.key && r.type !== "fieldset" && r.handle === e.handle) ? a('There is already a field ":handle" here.', { handle: e.handle }) : null;
}
function Ts(e, s) {
  return typeof e.translatable == "boolean" ? e.translatable : s;
}
function Is(e, s, t) {
  return { ...e, translatable: s === t ? null : s };
}
function Ue(e, s, t = []) {
  const a = /* @__PURE__ */ new Set([...s.map((l) => l.handle), ...t]), r = `${(Pe(e) || "field").slice(0, 56)}_copy`;
  let c = r;
  for (let l = 2; a.has(c); l++)
    c = `${r}_${l}`;
  return c;
}
function ie(e) {
  const { key: s, savedHandle: t, fields: a, ...r } = e;
  return { ...structuredClone(r), key: D(), fields: a.map(ie) };
}
function Es(e, s, t = [], a = ce) {
  const r = e[s];
  if (r === void 0) return null;
  const c = r.label || r.handle, l = {
    ...ie(r),
    label: a(":label (copy)", { label: c }),
    handle: r.type === "fieldset" ? r.handle : Ue(r.handle, e, t),
    handleTouched: !0
  };
  return { fields: [...e.slice(0, s + 1), l, ...e.slice(s + 1)], copy: l };
}
function We(e, s) {
  const t = e.condition;
  return !t || "rules" in t ? null : (t.operator === "filled" || t.operator === "equals" && (t.value === !0 || t.value === "true")) && s.some((r) => r.handle === t.field && r.type === "toggle") ? t.field : null;
}
function Os(e) {
  const s = (l) => l.type === "number" || l.type === "text" && (l.instructions ?? "").length <= 60, t = (l) => l.type === "text" && Fe.includes(l.handle), a = {}, r = [];
  for (const l of e) {
    const d = We(l, e);
    d === null ? r.push(l) : (a[d] ??= []).push(l);
  }
  const c = r.filter((l) => !t(l));
  return { options: c.filter((l) => !s(l)), limits: c.filter(s), appearance: r.filter(t), dependents: a };
}
const Xe = ["html", "css", "javascript", "json", "plain"];
function Ye(e) {
  const s = e.config?.language;
  return typeof s == "string" && Xe.includes(s) ? s : "plain";
}
const Hs = [
  { value: "equals", label: "is", needsValue: !0 },
  { value: "not_equals", label: "is not", needsValue: !0 },
  { value: "filled", label: "is filled in", needsValue: !1 },
  { value: "empty", label: "is empty", needsValue: !1 }
];
function U(e) {
  return e === !0 ? "true" : e === !1 ? "false" : typeof e == "string" || typeof e == "number" ? String(e) : "";
}
function Je(e) {
  return e ? "rules" in e ? Array.isArray(e.rules) ? e.rules : [] : [e] : [];
}
function Ze(e) {
  return e && "rules" in e && e.match === "any" ? "any" : "all";
}
function Ls(e, s) {
  return e.length === 0 ? null : e.length === 1 ? e[0] : { match: s, rules: e };
}
function W(e, s) {
  const t = s[e.field], a = t != null && t !== "" && t !== !1 && !(Array.isArray(t) && t.length === 0), r = (Array.isArray(t) ? t : [t]).map(U).includes(U(e.value));
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
function Qe(e, s) {
  const t = Je(e.condition);
  return t.length === 0 ? !0 : Ze(e.condition) === "any" ? t.some((a) => W(a, s)) : t.every((a) => W(a, s));
}
function Fs(e) {
  const s = e?.config ?? {};
  switch (e?.type) {
    case "select": {
      const t = (Array.isArray(s.options) ? s.options : []).flatMap((a) => {
        if (typeof a == "string" && a !== "") return [{ value: a, label: a }];
        if (a && typeof a == "object" && typeof a.value == "string" && a.value !== "") {
          const { value: r, label: c } = a;
          return [{ value: r, label: typeof c == "string" && c !== "" ? c : r }];
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
function Rs(e) {
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
const es = [25, 33, 50, 66, 75, 100];
function ss(e) {
  return es.find((s) => s === e.width) ?? 100;
}
function ts(e = "cms:gap-x-4 cms:gap-y-6") {
  return `cms:@container cms:grid cms:grid-cols-12 cms:items-start ${e}`;
}
const ns = {
  25: "cms:@lg:col-span-3",
  33: "cms:@lg:col-span-4",
  50: "cms:@lg:col-span-6",
  66: "cms:@lg:col-span-8",
  75: "cms:@lg:col-span-9",
  100: ""
};
function X(e) {
  return `cms:col-span-12 cms:min-w-0 ${ns[ss(e)]}`.trim();
}
function Ds(e, s) {
  const { width: t, ...a } = e;
  return s === 100 ? a : { ...a, width: s };
}
const L = "__none";
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
const rs = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function me(e) {
  if (e.label) return e.label;
  const s = e.handle.replace(/_/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function Y({ field: e, value: s, onChange: t, errors: a, id: r, content: c = !1, fill: l = !1, marker: d = null, shared: i = e.shared === !0 }) {
  const j = me(e), x = rs.includes(e.type) || ["select", "terms"].includes(e.type) && e.config?.multiple === !0, b = a[""] !== void 0, o = Le.includes(e.type), u = e.instructions && e.instructions.trim() !== "" ? /* @__PURE__ */ n.jsx(Re, { id: `${r}-help`, text: e.instructions }) : null, v = i ? /* @__PURE__ */ n.jsx(Me, { id: `${r}-shared` }) : null, { hint: p } = ae(e), { prefix: f, suffix: k } = le(e), w = [p && `${r}-hint`, f && `${r}-prefix`, k && `${r}-suffix`, u && `${r}-help`, v && `${r}-shared`, b && `${r}-error`].filter(Boolean).join(" ") || void 0;
  return /* @__PURE__ */ n.jsxs(
    "div",
    {
      className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2",
      ...x ? { role: "group", "aria-labelledby": `${r}-label`, ...b ? { "aria-invalid": !0 } : {}, ...b || u || v ? { "aria-describedby": [u && `${r}-help`, v && `${r}-shared`, b && `${r}-error`].filter(Boolean).join(" ") } : {} } : {},
      children: [
        e.type === "toggle" ? /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
          /* @__PURE__ */ n.jsx(m.Switch, { id: r, checked: s === !0, "aria-describedby": w, onCheckedChange: (y) => t(y) }),
          /* @__PURE__ */ n.jsx(m.Label, { htmlFor: r, className: "cms:min-w-0", children: j }),
          d,
          /* @__PURE__ */ n.jsx(K, { field: e, id: r, label: j })
        ] }) : /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:min-h-4 cms:min-w-0 cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ n.jsxs(m.Label, { id: `${r}-label`, htmlFor: x ? void 0 : r, className: "cms:min-w-0", children: [
            j,
            e.required && /* @__PURE__ */ n.jsx("span", { className: "cms:text-destructive", children: " *" }),
            d
          ] }),
          /* @__PURE__ */ n.jsx(K, { field: e, id: r, label: j })
        ] }),
        o && u,
        o && v,
        /* @__PURE__ */ n.jsx(ls, { field: e, value: s, onChange: t, errors: a, id: r, content: c, fill: l, describedBy: w }),
        ["text", "textarea", "code"].includes(e.type) && N(e, "max") !== void 0 && /* @__PURE__ */ n.jsx(as, { length: typeof s == "string" ? [...s].length : 0, max: N(e, "max") ?? 0 }),
        !o && u,
        !o && v,
        /* @__PURE__ */ n.jsx(O, { message: a[""], id: `${r}-error` })
      ]
    }
  );
}
function as({ length: e, max: s }) {
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
function ls({ field: e, value: s, onChange: t, errors: a, id: r, content: c, fill: l = !1, describedBy: d }) {
  const i = a[""] !== void 0, { prefix: j, suffix: x } = le(e), b = j !== null || x !== null;
  switch (e.type) {
    case "toggle":
      return null;
    case "file":
      return /* @__PURE__ */ n.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: h("Visitors attach a file here when they send a form.") });
    case "textarea":
      return /* @__PURE__ */ n.jsx(
        m.Textarea,
        {
          id: r,
          "aria-invalid": i,
          "aria-describedby": d,
          value: typeof s == "string" ? s : "",
          rows: N(e, "rows") ?? 4,
          placeholder: C(e, "placeholder"),
          onChange: (o) => t(o.target.value)
        }
      );
    case "code":
      return /* @__PURE__ */ n.jsx(
        m.CodeEditor,
        {
          id: r,
          "aria-labelledby": `${r}-label`,
          "aria-describedby": d,
          invalid: i,
          language: Ye(e),
          value: typeof s == "string" ? s : "",
          placeholder: C(e, "placeholder"),
          onChange: (o) => t(o)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ n.jsx(m.RichTextEditor, { id: r, labelledBy: `${r}-label`, invalid: i, imageStyles: e.imageStyles, value: typeof s == "string" ? s : "", onChange: t });
    case "number": {
      const o = ye(s);
      return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ n.jsx(B, { prefix: j, suffix: x, id: r, className: l ? "" : "cms:max-w-64", children: /* @__PURE__ */ n.jsx(
          m.Input,
          {
            id: r,
            type: "number",
            className: b ? G : l ? "cms:w-full" : "cms:max-w-48",
            placeholder: C(e, "placeholder"),
            "aria-invalid": i,
            "aria-describedby": [d, o && `${r}-grouped`].filter(Boolean).join(" ") || void 0,
            value: typeof s == "number" ? String(s) : typeof s == "string" ? s : "",
            min: N(e, "min"),
            max: N(e, "max"),
            step: N(e, "step") ?? "any",
            onChange: (u) => t(u.target.value === "" ? null : Number(u.target.value))
          }
        ) }),
        o && /* @__PURE__ */ n.jsx("span", { id: `${r}-grouped`, className: "cms:text-sm cms:tabular-nums cms:text-muted-foreground", children: o })
      ] });
    }
    case "date": {
      const o = e.config?.time === !0;
      return /* @__PURE__ */ n.jsx(
        m.DatePicker,
        {
          id: r,
          withTime: o,
          invalid: i,
          required: e.required === !0,
          value: z(ge(s, o)),
          onChange: (u) => t(z(u ?? ""))
        }
      );
    }
    case "select":
      return e.config?.multiple === !0 ? /* @__PURE__ */ n.jsx(
        os,
        {
          options: F(e),
          value: Array.isArray(s) ? s.map(String) : [],
          onChange: t,
          invalid: i,
          empty: typeof e.config?.empty == "string" ? e.config.empty : void 0,
          inTickOrder: e.config?.in_tick_order === !0
        }
      ) : /* @__PURE__ */ n.jsx(
        cs,
        {
          options: F(e),
          value: typeof s == "string" ? s : null,
          onChange: t,
          id: r,
          fill: l,
          empty: xe(F(e), e.required === !0, typeof e.config?.default == "string" && e.config.default !== "", typeof s == "string" && s !== "")
        }
      );
    case "terms": {
      const o = e.config?.multiple === !0, u = Array.isArray(s) ? s.filter((v) => typeof v == "number") : typeof s == "number" ? s : null;
      return /* @__PURE__ */ n.jsx(
        he,
        {
          id: r,
          taxonomy: typeof e.taxonomy == "string" ? e.taxonomy : null,
          multiple: o,
          max: N(e, "max") ?? null,
          required: e.required === !0,
          invalid: i,
          value: o ? Array.isArray(u) ? u : [] : typeof u == "number" ? u : null,
          onChange: t
        }
      );
    }
    case "entries":
      return /* @__PURE__ */ n.jsx(
        Z,
        {
          id: r,
          invalid: i,
          multiple: e.config?.multiple === !0,
          max: N(e, "max") ?? null,
          collections: e.collections ?? [],
          onChange: t,
          value: typeof s == "number" || Array.isArray(s) && s.every((o) => typeof o == "number") ? s : null
        }
      );
    case "link":
      return /* @__PURE__ */ n.jsx(
        ms,
        {
          label: me(e),
          value: S(s),
          onChange: t,
          errors: a,
          id: r,
          collections: e.collections ?? [],
          placeholder: C(e, "placeholder"),
          describedBy: d
        }
      );
    case "media":
      return /* @__PURE__ */ n.jsx(
        m.MediaPickerInput,
        {
          id: r,
          invalid: i,
          disabled: !1,
          multiple: e.config?.multiple === !0,
          max: N(e, "max") ?? null,
          types: Array.isArray(e.config?.types) ? e.config.types : [],
          value: typeof s == "number" || Array.isArray(s) && s.every((o) => typeof o == "number") ? s : null,
          onChange: t
        }
      );
    case "group":
      return /* @__PURE__ */ n.jsx(q, { fields: e.fields ?? [], value: S(s), onChange: t, errors: a, id: r, content: c });
    case "repeater":
      return /* @__PURE__ */ n.jsx(us, { field: e, value: Array.isArray(s) ? s : [], onChange: t, errors: a, id: r, content: c });
    case "flexible":
      return /* @__PURE__ */ n.jsx(ds, { field: e, value: Array.isArray(s) ? s : [], onChange: t, errors: a, id: r });
    default:
      return /* @__PURE__ */ n.jsx(B, { prefix: j, suffix: x, id: r, children: /* @__PURE__ */ n.jsx(
        m.Input,
        {
          id: r,
          "aria-invalid": i,
          "aria-describedby": d,
          className: b ? G : void 0,
          value: typeof s == "string" ? s : "",
          placeholder: C(e, "placeholder"),
          onChange: (o) => t(o.target.value)
        }
      ) });
  }
}
function N(e, s) {
  const t = e.config?.[s];
  return typeof t == "number" ? t : void 0;
}
function C(e, s) {
  const t = e.config?.[s];
  return typeof t == "string" ? t : void 0;
}
function q({ fields: e, value: s, onChange: t, errors: a, id: r, content: c, bare: l = !1 }) {
  const d = /* @__PURE__ */ n.jsx("div", { className: ts(l ? void 0 : "cms:gap-4"), children: e.filter((i) => Qe(i, s)).map((i) => i.shared ? (
    // Greyed out, with where to edit it under it.
    /* @__PURE__ */ n.jsx("fieldset", { disabled: !0, className: `cms:flex cms:flex-col cms:gap-1 cms:opacity-60 ${X(i)}`, children: /* @__PURE__ */ n.jsx(Y, { id: `${r}-${i.handle}`, field: i, value: s[i.handle], content: c, errors: {}, onChange: () => {
    }, shared: !0 }) }, i.handle)
  ) : /* @__PURE__ */ n.jsx("div", { className: X(i), children: /* @__PURE__ */ n.jsx(
    Y,
    {
      id: `${r}-${i.handle}`,
      field: i,
      value: s[i.handle],
      content: c,
      errors: M(a, i.handle),
      onChange: (j) => t({ ...s, [i.handle]: j })
    }
  ) }, i.handle)) });
  return l ? d : /* @__PURE__ */ n.jsx("div", { className: "cms:rounded-lg cms:border cms:p-4", children: d });
}
function cs({ options: e, value: s, onChange: t, id: a, empty: r, fill: c = !1 }) {
  return /* @__PURE__ */ n.jsxs(m.Select, { value: s ?? L, onValueChange: (l) => t(l === L ? null : l), children: [
    /* @__PURE__ */ n.jsx(m.SelectTrigger, { id: a, className: c ? "cms:w-full" : "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ n.jsx(m.SelectValue, {}) }),
    /* @__PURE__ */ n.jsxs(m.SelectContent, { children: [
      r && /* @__PURE__ */ n.jsx(m.SelectItem, { value: L, children: h("None") }),
      e.map((l) => /* @__PURE__ */ n.jsx(m.SelectItem, { value: l.value, children: l.label }, l.value))
    ] })
  ] });
}
function os({ options: e, value: s, onChange: t, empty: a, inTickOrder: r = !1, invalid: c = !1 }) {
  return e.length === 0 ? /* @__PURE__ */ n.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: a ?? h("Nothing to choose from yet.") }) : /* @__PURE__ */ n.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2", children: e.map((l) => /* @__PURE__ */ n.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
    /* @__PURE__ */ n.jsx(
      m.Checkbox,
      {
        checked: s.includes(l.value),
        "aria-invalid": c || void 0,
        onCheckedChange: (d) => t(d ? r ? [...s.filter((i) => i !== l.value), l.value] : e.map((i) => i.value).filter((i) => i === l.value || s.includes(i)) : s.filter((i) => i !== l.value))
      }
    ),
    l.label,
    r && s.includes(l.value) && /* @__PURE__ */ n.jsxs("span", { className: "cms:text-xs cms:text-muted-foreground", "aria-label": `number ${s.indexOf(l.value) + 1}`, children: [
      "#",
      s.indexOf(l.value) + 1
    ] })
  ] }, l.value)) });
}
function is(e) {
  return { url: h("Link"), entry: h("Entry"), term: h("Term"), listing: h("Listing") }[e];
}
function ms({ label: e, value: s, onChange: t, errors: a, id: r, collections: c, placeholder: l, describedBy: d }) {
  const [i, j] = _.useState(H(s.type) ?? "url"), x = H(s.type) ?? i, b = _.useRef({}), o = _.useRef(Object.keys(s).length === 0), [u, v] = _.useState(!1), p = typeof s.new_tab == "boolean" ? s.new_tab : o.current && !u && P(x), f = (g) => t(Se({ ...s, type: x, new_tab: p, ...g })), k = (g) => {
    if (g === x) return;
    const I = $e(s, x, g, b.current);
    b.current = I.remembered, j(g), t(I.value === null || !o.current || u ? I.value : { ...I.value, new_tab: P(g) });
  }, w = ve(s.rel), y = _e[x], $ = a[y] ?? a.url ?? a.label ?? a.type ?? a.rel;
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ n.jsxs("div", { className: "cms:grid cms:gap-2 cms:md:grid-cols-[10rem_1fr] cms:md:items-start", children: [
      /* @__PURE__ */ n.jsxs(m.Select, { value: x, onValueChange: (g) => k(H(g) ?? "url"), children: [
        /* @__PURE__ */ n.jsx(m.SelectTrigger, { "aria-label": h(":field: link to", { field: e }), className: "cms:w-full", children: /* @__PURE__ */ n.jsx(m.SelectValue, {}) }),
        /* @__PURE__ */ n.jsx(m.SelectContent, { children: ke.map((g) => /* @__PURE__ */ n.jsx(m.SelectItem, { value: g, children: is(g) }, g)) })
      ] }),
      x === "url" && /* @__PURE__ */ n.jsx(
        m.Input,
        {
          id: r,
          "aria-label": h(":field: address", { field: e }),
          placeholder: l || h("https://… or /about"),
          "aria-describedby": d,
          value: typeof s.url == "string" ? s.url : "",
          onChange: (g) => f({ url: g.target.value }),
          "aria-invalid": a.url !== void 0
        }
      ),
      x === "entry" && /* @__PURE__ */ n.jsx(
        Z,
        {
          id: r,
          invalid: a.entry_id !== void 0,
          multiple: !1,
          max: null,
          collections: c,
          value: typeof s.entry_id == "number" ? s.entry_id : null,
          onChange: (g) => f({ entry_id: typeof g == "number" ? g : void 0 })
        }
      ),
      (x === "term" || x === "listing") && /* @__PURE__ */ n.jsx(
        m.LinkSourcePicker,
        {
          id: r,
          source: x,
          label: h(":field: search", { field: e }),
          invalid: a[y] !== void 0,
          value: typeof s[y] == "number" ? s[y] : null,
          onChange: (g) => f({ [y]: g?.id ?? void 0 })
        }
      )
    ] }),
    /* @__PURE__ */ n.jsx(
      m.Input,
      {
        "aria-label": h(":field: link text", { field: e }),
        placeholder: x === "url" ? h("Link text") : h("Link text (its title)"),
        value: typeof s.label == "string" ? s.label : "",
        onChange: (g) => f({ label: g.target.value })
      }
    ),
    /* @__PURE__ */ n.jsx(
      m.LinkAttributes,
      {
        label: h(":field: link attributes", { field: e }),
        newTab: p,
        rel: w,
        onNewTabChange: (g) => {
          v(!0), f({ new_tab: g });
        },
        onRelChange: (g) => f({ rel: g.length === 0 ? void 0 : g })
      }
    ),
    /* @__PURE__ */ n.jsx(O, { message: $ })
  ] });
}
function J(e, s) {
  return !s && (e.fields ?? []).every((t) => t.type === "text");
}
function ue(e) {
  const s = _.useRef([]);
  return s.current = we(s.current, e), {
    keys: s.current,
    remove: (t) => {
      s.current = s.current.filter((a, r) => r !== t);
    },
    move: (t, a) => {
      s.current = m.moveItem(s.current, t, a);
    }
  };
}
function de() {
  const [e, s] = _.useState(() => /* @__PURE__ */ new Set());
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
function fe({ keys: e, folding: s }) {
  if (e.length < 2) return null;
  const t = s.anyOpen(e);
  return /* @__PURE__ */ n.jsxs(m.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => s.setAll(e, t), children: [
    t ? /* @__PURE__ */ n.jsx(Te, {}) : /* @__PURE__ */ n.jsx(Ne, {}),
    " ",
    t ? h("Collapse all") : h("Expand all")
  ] });
}
function us({ field: e, value: s, onChange: t, errors: a, id: r, content: c = !1 }) {
  const l = e.fields ?? [], d = s.map(S), i = ue(d.length), j = (p, f) => t(d.map((k, w) => w === p ? f : k)), x = (p) => {
    i.remove(p), t(d.filter((f, k) => k !== p));
  }, b = e.label ? e.label.toLowerCase().replace(/s$/, "") : h("row"), o = b.charAt(0).toUpperCase() + b.slice(1), u = d.map((p, f) => ({ row: p, index: f, key: i.keys[f] ?? String(f) })), v = de();
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ n.jsx(
      m.SortableList,
      {
        items: u,
        getId: (p) => p.key,
        getLabel: (p) => `${b} ${p.index + 1}`,
        onReorder: (p, f, k) => {
          i.move(f, k), t(p.map((w) => w.row));
        },
        children: ({ row: p, index: f, key: k }, { handle: w }) => J(e, c) ? /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
          /* @__PURE__ */ n.jsx(m.SortableHandle, { ...w, label: h("Move :item :number", { item: b, number: f + 1 }), className: "cms:mt-1" }),
          l.map((y) => /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
            /* @__PURE__ */ n.jsx(
              m.Input,
              {
                "aria-label": y.label || y.handle,
                placeholder: y.label || y.handle,
                value: typeof p[y.handle] == "string" ? p[y.handle] : "",
                onChange: ($) => j(f, { ...p, [y.handle]: $.target.value })
              }
            ),
            /* @__PURE__ */ n.jsx(O, { message: a[`${f}.${y.handle}`] })
          ] }, y.handle)),
          /* @__PURE__ */ n.jsx(m.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": h("Remove :item :number", { item: b, number: f + 1 }), onClick: () => x(f), children: /* @__PURE__ */ n.jsx(se, {}) })
        ] }) : (() => {
          const y = M(a, String(f)), $ = v.isCollapsed(k, Object.keys(y).length > 0);
          return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ n.jsx(
              pe,
              {
                label: `${o} ${f + 1}`,
                summary: Q(l, p),
                handle: w,
                onRemove: () => x(f),
                collapsed: $,
                onToggle: () => v.toggle(k),
                controls: `${r}-${f}-fields`,
                hidden: c ? p._hidden === !0 : void 0,
                onHidden: (g) => j(f, { ...p, _hidden: g })
              }
            ),
            /* @__PURE__ */ n.jsx("div", { id: `${r}-${f}-fields`, hidden: $, children: !$ && /* @__PURE__ */ n.jsx(q, { fields: l, value: p, onChange: (g) => j(f, g), errors: y, id: `${r}-${f}`, content: c }) })
          ] });
        })()
      }
    ),
    /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ n.jsxs(m.Button, { type: "button", variant: "outline", size: "sm", onClick: () => t([...d, c ? je(e.defaults) : {}]), children: [
        /* @__PURE__ */ n.jsx(ee, {}),
        " ",
        h("Add :item", { item: b })
      ] }),
      !J(e, c) && /* @__PURE__ */ n.jsx(fe, { keys: u.map((p) => p.key), folding: v })
    ] })
  ] });
}
function ds({ field: e, value: s, onChange: t, errors: a, id: r }) {
  const c = e.blocks ?? [], l = s.map(S), d = ue(l.length), i = (o, u) => t(l.map((v, p) => p === o ? u : v)), j = (o) => {
    d.remove(o), t(l.filter((u, v) => v !== o));
  }, x = l.map((o, u) => ({ block: o, index: u, key: d.keys[u] ?? String(u) })), b = de();
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    /* @__PURE__ */ n.jsx(
      m.SortableList,
      {
        items: x,
        getId: (o) => o.key,
        className: "cms:gap-3",
        getLabel: (o) => h(":type block", { type: c.find((u) => u.type === o.block.type)?.label ?? String(o.block.type) }),
        onReorder: (o, u, v) => {
          d.move(u, v), t(o.map((p) => p.block));
        },
        children: ({ block: o, index: u, key: v }, { handle: p }) => {
          const f = c.find((y) => y.type === o.type), k = M(a, `${u}.values`), w = b.isCollapsed(v, Object.keys(k).length > 0 || a[`${u}.type`] !== void 0);
          return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ n.jsx(
              pe,
              {
                label: f?.label ?? String(o.type),
                summary: f ? Q(f.fields, S(o.values)) : null,
                badge: !0,
                handle: p,
                onRemove: () => j(u),
                collapsed: w,
                onToggle: () => b.toggle(v),
                controls: `${r}-${u}-fields`,
                hidden: o.hidden === !0,
                onHidden: (y) => i(u, { ...o, hidden: y })
              }
            ),
            /* @__PURE__ */ n.jsx("div", { id: `${r}-${u}-fields`, hidden: w, children: w ? null : f ? /* @__PURE__ */ n.jsx(
              q,
              {
                fields: f.fields,
                value: S(o.values),
                onChange: (y) => i(u, { ...o, values: y }),
                errors: k,
                id: `${r}-${u}`,
                content: !0
              }
            ) : /* @__PURE__ */ n.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: h("This kind of block no longer exists. Its values are kept.") }) }),
            /* @__PURE__ */ n.jsx(O, { message: a[`${u}.type`] })
          ] });
        }
      }
    ),
    /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ n.jsxs(m.DropdownMenu, { children: [
        /* @__PURE__ */ n.jsx(m.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ n.jsxs(m.Button, { type: "button", variant: "outline", size: "sm", disabled: c.length === 0, children: [
          /* @__PURE__ */ n.jsx(ee, {}),
          " ",
          h("Add block")
        ] }) }),
        /* @__PURE__ */ n.jsx(m.DropdownMenuContent, { align: "start", children: c.map((o) => /* @__PURE__ */ n.jsx(m.DropdownMenuItem, { onSelect: () => t([...l, be(o.type, o.defaults)]), children: o.label }, o.type)) })
      ] }),
      /* @__PURE__ */ n.jsx(fe, { keys: x.map((o) => o.key), folding: b })
    ] })
  ] });
}
function pe({ label: e, summary: s, badge: t = !1, handle: a, onRemove: r, collapsed: c, onToggle: l, controls: d, hidden: i, onHidden: j }) {
  const x = c ? Ae : Ce, b = s ? `${e}: ${s}` : e;
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ n.jsx(m.SortableHandle, { ...a, label: h("Move :title", { title: b }) }),
    /* @__PURE__ */ n.jsxs(
      "button",
      {
        type: "button",
        onClick: l,
        "aria-expanded": !c,
        "aria-controls": d,
        className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:rounded-md cms:text-left cms:outline-none cms:focus-visible:ring-2 cms:focus-visible:ring-ring",
        children: [
          /* @__PURE__ */ n.jsx(x, { className: "cms:size-4 cms:shrink-0 cms:text-muted-foreground", "aria-hidden": !0 }),
          t ? /* @__PURE__ */ n.jsx(m.Badge, { variant: "secondary", children: e }) : /* @__PURE__ */ n.jsx("span", { className: "cms:shrink-0 cms:text-sm cms:font-medium", children: e }),
          s && /* @__PURE__ */ n.jsx("span", { className: "cms:truncate cms:text-sm cms:text-muted-foreground", children: s }),
          /* @__PURE__ */ n.jsx("span", { className: "cms:sr-only", children: c ? h("(collapsed)") : "" })
        ]
      }
    ),
    i !== void 0 && /* @__PURE__ */ n.jsxs("label", { className: "cms:flex cms:shrink-0 cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", title: h("Off: kept here, but left out of the page"), children: [
      /* @__PURE__ */ n.jsx(m.Switch, { checked: !i, onCheckedChange: (o) => j(!o), "aria-label": h(":title: visible on site", { title: b }) }),
      h("Visible on site")
    ] }),
    /* @__PURE__ */ n.jsx(
      m.Button,
      {
        type: "button",
        variant: "ghost",
        size: "icon",
        className: "cms:size-8 cms:shrink-0 cms:text-destructive",
        "aria-label": h("Remove :title", { title: b }),
        onClick: r,
        children: /* @__PURE__ */ n.jsx(se, {})
      }
    )
  ] });
}
export {
  $s as A,
  De as B,
  Ce as C,
  Qe as D,
  X as E,
  Y as F,
  ts as G,
  Re as H,
  me as I,
  K as J,
  ae as K,
  ks as M,
  Hs as O,
  Me as S,
  Cs as a,
  M as b,
  Pe as c,
  Es as d,
  Ge as e,
  ss as f,
  Ns as g,
  Ss as h,
  Ts as i,
  Is as j,
  es as k,
  As as l,
  Je as m,
  ws as n,
  Ze as o,
  Fs as p,
  Rs as q,
  _s as r,
  Os as s,
  Ls as t,
  Ve as u,
  ze as v,
  Ds as w,
  Ke as x,
  Be as y,
  q as z
};
