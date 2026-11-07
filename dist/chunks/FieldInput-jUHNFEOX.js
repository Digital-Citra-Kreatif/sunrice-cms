import { j as n, t as h, m as xe } from "./admin-DGcn53md.js";
import { c as R, _, u as m } from "./ui-BzV6lfEf.js";
import { E as Z } from "./EntriesPicker-DJBCVoZO.js";
import { F as O } from "./FieldError-BL_8-QnZ.js";
import { c as S, T as ge, o as ye, d as z, e as be, g as je, i as Q, n as ve, f as ke, l as L, h as P, j as we, L as Ne, s as _e, b as $e, k as Se, m as Ae, p as Ce } from "./TermsPicker-Dr4AsQhf.js";
import { P as ee } from "./plus-Cn7AaagX.js";
import { T as se } from "./Confirm-DstGOW0Y.js";
import { C as Te } from "./chevron-right-1BqdTUoX.js";
const te = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
te.node;
const Ie = R(te);
const ne = {
  name: "chevrons-down-up",
  size: 24,
  node: [
    ["path", { d: "m7 20 5-5 5 5", key: "13a0gw" }],
    ["path", { d: "m7 4 5 5 5-5", key: "1kwcof" }]
  ]
};
ne.node;
const Ee = R(ne);
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
const Oe = R(re), Le = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
function A(e) {
  return e.replace(/[&<>"']/g, (s) => Le[s] ?? s);
}
function Fe(e) {
  return /[\u0000- \u007f]/.test(e) ? !1 : /^(https?:\/\/[^/]|mailto:|tel:|\/(?![/\\])|#)/i.test(e);
}
const V = new RegExp("`([^`\\n]+)`|\\[([^\\]\\n]+)\\]\\(((?:[^()\\s]|\\([^()\\s]*\\))+)\\)|\\*\\*(?=\\S)(.+?)(?<=\\S)\\*\\*|\\*(?=[^\\s*])([^*\\n]+?)(?<=\\S)\\*");
function T(e, s = !1) {
  let t = "", a = e;
  for (let r = V.exec(a); r !== null; r = V.exec(a)) {
    t += A(a.slice(0, r.index));
    const [o, l, d, i, j, x] = r;
    l !== void 0 ? t += `<code>${A(l)}</code>` : d !== void 0 && i !== void 0 ? t += s || !Fe(i) ? T(d, s) : `<a href="${A(i)}" target="_blank" rel="noopener noreferrer">${T(d, !0)}</a>` : j !== void 0 ? t += `<strong>${T(j, s)}</strong>` : x !== void 0 ? t += `<em>${T(x, s)}</em>` : t += A(o), a = a.slice(r.index + o.length);
  }
  return t + A(a);
}
const He = ["text", "number"], Re = ["group", "repeater", "flexible"], De = ["placeholder", "prefix", "suffix"];
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
  const { hint: r, tooltip: o } = ae(e);
  return r === null && o === null ? null : /* @__PURE__ */ n.jsxs("span", { className: `cms:ml-auto cms:flex ${a} cms:min-w-0 cms:shrink-0 cms:items-center cms:gap-1 cms:text-xs cms:leading-none cms:text-muted-foreground`, children: [
    r !== null && /* @__PURE__ */ n.jsx("span", { id: `${s}-hint`, className: "cms:min-w-0 cms:truncate cms:py-0.5", title: r, children: r }),
    o !== null && /* @__PURE__ */ n.jsxs(m.Tooltip, { children: [
      /* @__PURE__ */ n.jsx(m.TooltipTrigger, { asChild: !0, children: /* @__PURE__ */ n.jsx(
        "button",
        {
          type: "button",
          "aria-label": h("More about :field", { field: t }),
          className: "cms:-m-1 cms:inline-flex cms:shrink-0 cms:rounded-full cms:p-1 cms:text-muted-foreground cms:outline-none cms:hover:text-foreground cms:focus-visible:ring-2 cms:focus-visible:ring-ring",
          children: /* @__PURE__ */ n.jsx(Oe, { className: "cms:size-3.5", "aria-hidden": !0 })
        }
      ) }),
      /* @__PURE__ */ n.jsx(m.TooltipContent, { className: "cms:max-w-xs cms:text-left cms:whitespace-pre-line", children: o })
    ] })
  ] });
}
function Me({ text: e, id: s, className: t = "" }) {
  return !e || e.trim() === "" ? null : /* @__PURE__ */ n.jsx(
    "p",
    {
      id: s,
      className: `cms:text-sm cms:text-muted-foreground cms:[overflow-wrap:anywhere] cms:[&_a]:font-medium cms:[&_a]:text-foreground cms:[&_a]:underline cms:[&_a]:underline-offset-2 cms:[&_a:hover]:text-primary cms:[&_code]:rounded cms:[&_code]:bg-muted cms:[&_code]:px-1 cms:[&_code]:font-mono cms:[&_code]:text-[0.8125rem] cms:[&_strong]:font-semibold cms:[&_strong]:text-foreground ${t}`.trim(),
      dangerouslySetInnerHTML: { __html: T(e) }
    }
  );
}
const qe = _.createContext(null);
function ze({ id: e, className: s = "" }) {
  const t = _.useContext(qe);
  return /* @__PURE__ */ n.jsx("p", { id: e, className: `cms:text-sm cms:text-muted-foreground ${s}`.trim(), children: t ? h("Not translatable: edit it in :language.", { language: t }) : h("Not translatable: edit it in the main language.") });
}
function B({ prefix: e, suffix: s, id: t, className: a = "", children: r }) {
  if (e === null && s === null) return /* @__PURE__ */ n.jsx(n.Fragment, { children: r });
  const o = "cms:flex cms:shrink-0 cms:items-center cms:bg-muted/60 cms:px-3 cms:text-sm cms:whitespace-nowrap cms:text-muted-foreground cms:select-none";
  return /* @__PURE__ */ n.jsxs("div", { "data-slot": "input-group", className: `cms:flex cms:h-10 cms:w-full cms:min-w-0 cms:items-stretch cms:overflow-hidden cms:rounded-md cms:border cms:border-input/80 cms:bg-card cms:shadow-xs cms:transition-[border-color,box-shadow] cms:duration-150 cms:hover:border-ring/45 cms:focus-within:border-ring/70 cms:focus-within:ring-4 cms:focus-within:ring-ring-glow cms:has-[[aria-invalid=true]]:border-destructive cms:has-[[aria-invalid=true]]:ring-destructive/20 cms:has-disabled:cursor-not-allowed cms:has-disabled:opacity-50 cms:has-[[readonly]]:bg-muted/30 cms:dark:bg-input/20 ${a}`.trim(), children: [
    e !== null && /* @__PURE__ */ n.jsx("span", { id: `${t}-prefix`, className: `${o} cms:border-r cms:border-input/80`, children: e }),
    r,
    s !== null && /* @__PURE__ */ n.jsx("span", { id: `${t}-suffix`, className: `${o} cms:border-l cms:border-input/80`, children: s })
  ] });
}
const G = "cms:h-full cms:min-w-0 cms:flex-1 cms:rounded-none cms:border-0 cms:bg-transparent cms:shadow-none cms:hover:border-0 cms:focus-visible:ring-0 cms:aria-invalid:ring-0 cms:disabled:opacity-100 cms:dark:bg-transparent", ce = (e, s = {}) => e.replace(/:([A-Za-z_]+)/g, (t, a) => s[a] ?? t), ws = 5;
let Pe = 0;
const D = () => `f${++Pe}`;
function Ve(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function Ke(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^[0-9_]+/, "").replace(/_{2,}/g, "_").slice(0, 64);
}
function oe(e, s) {
  const t = new Set(s.map((o) => o.handle)), a = Ve(e) || "field";
  let r = a;
  for (let o = 2; t.has(r); o++)
    r = `${a}_${o}`;
  return r;
}
function Be(e) {
  return (e ?? []).map(({ fields: s, ...t }) => ({
    ...t,
    key: D(),
    fields: Be(s),
    handleTouched: !0,
    savedHandle: t.handle
  }));
}
function Ge(e, s) {
  return e.map(({ key: t, handleTouched: a, savedHandle: r, fields: o, ...l }) => ({
    ...l,
    validation: (l.validation ?? []).map((d) => d.trim()).filter((d) => d !== ""),
    ...s(l.type) ? { fields: Ge(o, s) } : {}
  }));
}
function Ns(e, s, t) {
  return { key: D(), type: e, label: s, handle: oe(s, t), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function _s(e) {
  return e.type !== "fieldset" && e.savedHandle !== void 0 && e.savedHandle !== "" && e.handle !== e.savedHandle ? e.savedHandle : null;
}
function Ue(e) {
  return e.map((s) => ({ ...s, savedHandle: s.handle, fields: Ue(s.fields) }));
}
function $s(e, s, t) {
  if (e.handleTouched) return { ...e, label: s };
  const a = t.filter((r) => r.key !== e.key);
  return { ...e, label: s, handle: oe(s || e.type, a) };
}
function We(e, s) {
  const t = `${s}.`, a = {};
  for (const [r, o] of Object.entries(e))
    r.startsWith(t) && (a[r.slice(t.length)] = o);
  return a;
}
function M(e, s) {
  const t = e[s];
  return { ...We(e, s), ...t !== void 0 ? { "": t } : {} };
}
function Ss(e, s) {
  return Object.keys(e).filter((t) => t === s || t.startsWith(`${s}.`));
}
function As(e, s) {
  return Object.keys(e).some((t) => t === s || t.startsWith(`${s}.`));
}
function Cs(e, s) {
  return s.filter((t) => t.key !== e.key && t.handle !== "" && t.type !== "fieldset");
}
function Ts(e, s, t, a = ce) {
  return e.type === "fieldset" ? null : t?.includes(e.handle) ? a('":handle" is used by the content itself; choose another handle.', { handle: e.handle }) : e.handle !== "" && s.some((r) => r.key !== e.key && r.type !== "fieldset" && r.handle === e.handle) ? a('There is already a field ":handle" here.', { handle: e.handle }) : null;
}
function Is(e, s) {
  return typeof e.translatable == "boolean" ? e.translatable : s;
}
function Es(e, s, t) {
  return { ...e, translatable: s === t ? null : s };
}
function Xe(e, s, t = []) {
  const a = /* @__PURE__ */ new Set([...s.map((l) => l.handle), ...t]), r = `${(Ke(e) || "field").slice(0, 56)}_copy`;
  let o = r;
  for (let l = 2; a.has(o); l++)
    o = `${r}_${l}`;
  return o;
}
function ie(e) {
  const { key: s, savedHandle: t, fields: a, ...r } = e;
  return { ...structuredClone(r), key: D(), fields: a.map(ie) };
}
function Os(e, s, t = [], a = ce) {
  const r = e[s];
  if (r === void 0) return null;
  const o = r.label || r.handle, l = {
    ...ie(r),
    label: a(":label (copy)", { label: o }),
    handle: r.type === "fieldset" ? r.handle : Xe(r.handle, e, t),
    handleTouched: !0
  };
  return { fields: [...e.slice(0, s + 1), l, ...e.slice(s + 1)], copy: l };
}
function Ye(e, s) {
  const t = e.condition;
  return !t || "rules" in t ? null : (t.operator === "filled" || t.operator === "equals" && (t.value === !0 || t.value === "true")) && s.some((r) => r.handle === t.field && r.type === "toggle") ? t.field : null;
}
function Ls(e) {
  const s = (l) => l.type === "number" || l.type === "text" && (l.instructions ?? "").length <= 60, t = (l) => l.type === "text" && De.includes(l.handle), a = {}, r = [];
  for (const l of e) {
    const d = Ye(l, e);
    d === null ? r.push(l) : (a[d] ??= []).push(l);
  }
  const o = r.filter((l) => !t(l));
  return { options: o.filter((l) => !s(l)), limits: o.filter(s), appearance: r.filter(t), dependents: a };
}
const Je = ["html", "css", "javascript", "json", "plain"];
function Ze(e) {
  const s = e.config?.language;
  return typeof s == "string" && Je.includes(s) ? s : "plain";
}
const Fs = [
  { value: "equals", label: "is", needsValue: !0 },
  { value: "not_equals", label: "is not", needsValue: !0 },
  { value: "filled", label: "is filled in", needsValue: !1 },
  { value: "empty", label: "is empty", needsValue: !1 }
];
function U(e) {
  return e === !0 ? "true" : e === !1 ? "false" : typeof e == "string" || typeof e == "number" ? String(e) : "";
}
function Qe(e) {
  return e ? "rules" in e ? Array.isArray(e.rules) ? e.rules : [] : [e] : [];
}
function es(e) {
  return e && "rules" in e && e.match === "any" ? "any" : "all";
}
function Hs(e, s) {
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
function me(e, s) {
  const t = Qe(e.condition);
  return t.length === 0 ? !0 : es(e.condition) === "any" ? t.some((a) => W(a, s)) : t.every((a) => W(a, s));
}
function Rs(e) {
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
function Ds(e) {
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
function ss(e, s) {
  if (!s || typeof s != "object" || Array.isArray(s)) return [];
  const t = s;
  return e.filter((a) => me(a, t)).flatMap((a) => a.type === "group" && a.fields ? ss(a.fields, t[a.handle]) : [t[a.handle]]);
}
const ts = [25, 33, 50, 66, 75, 100];
function ns(e) {
  return ts.find((s) => s === e.width) ?? 100;
}
function rs(e = "cms:gap-x-4 cms:gap-y-6") {
  return `cms:@container cms:grid cms:grid-cols-12 cms:items-start ${e}`;
}
const as = {
  25: "cms:@lg:col-span-3",
  33: "cms:@lg:col-span-4",
  50: "cms:@lg:col-span-6",
  66: "cms:@lg:col-span-8",
  75: "cms:@lg:col-span-9",
  100: ""
};
function X(e) {
  return `cms:col-span-12 cms:min-w-0 ${as[ns(e)]}`.trim();
}
function Ms(e, s) {
  const { width: t, ...a } = e;
  return s === 100 ? a : { ...a, width: s };
}
const F = "__none";
function H(e) {
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
const ls = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function ue(e) {
  if (e.label) return e.label;
  const s = e.handle.replace(/_/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function Y({ field: e, value: s, onChange: t, errors: a, id: r, content: o = !1, fill: l = !1, marker: d = null, shared: i = e.shared === !0 }) {
  const j = ue(e), x = ls.includes(e.type) || ["select", "terms"].includes(e.type) && e.config?.multiple === !0, b = a[""] !== void 0, c = Re.includes(e.type), u = e.instructions && e.instructions.trim() !== "" ? /* @__PURE__ */ n.jsx(Me, { id: `${r}-help`, text: e.instructions }) : null, v = i ? /* @__PURE__ */ n.jsx(ze, { id: `${r}-shared` }) : null, { hint: p } = ae(e), { prefix: f, suffix: k } = le(e), w = [p && `${r}-hint`, f && `${r}-prefix`, k && `${r}-suffix`, u && `${r}-help`, v && `${r}-shared`, b && `${r}-error`].filter(Boolean).join(" ") || void 0;
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
        c && u,
        c && v,
        /* @__PURE__ */ n.jsx(os, { field: e, value: s, onChange: t, errors: a, id: r, content: o, fill: l, describedBy: w }),
        ["text", "textarea", "code"].includes(e.type) && N(e, "max") !== void 0 && /* @__PURE__ */ n.jsx(cs, { length: typeof s == "string" ? [...s].length : 0, max: N(e, "max") ?? 0 }),
        !c && u,
        !c && v,
        /* @__PURE__ */ n.jsx(O, { message: a[""], id: `${r}-error` })
      ]
    }
  );
}
function cs({ length: e, max: s }) {
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
function os({ field: e, value: s, onChange: t, errors: a, id: r, content: o, fill: l = !1, describedBy: d }) {
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
          dir: "auto",
          "aria-invalid": i,
          "aria-describedby": d,
          value: typeof s == "string" ? s : "",
          rows: N(e, "rows") ?? 4,
          placeholder: C(e, "placeholder"),
          onChange: (c) => t(c.target.value)
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
          language: Ze(e),
          value: typeof s == "string" ? s : "",
          placeholder: C(e, "placeholder"),
          onChange: (c) => t(c)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ n.jsx(m.RichTextEditor, { id: r, labelledBy: `${r}-label`, invalid: i, imageStyles: e.imageStyles, value: typeof s == "string" ? s : "", onChange: t });
    case "number": {
      const c = je(s);
      return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ n.jsx(B, { prefix: j, suffix: x, id: r, className: l ? "" : "cms:max-w-64", children: /* @__PURE__ */ n.jsx(
          m.Input,
          {
            id: r,
            type: "number",
            className: b ? G : l ? "cms:w-full" : "cms:max-w-48",
            placeholder: C(e, "placeholder"),
            "aria-invalid": i,
            "aria-describedby": [d, c && `${r}-grouped`].filter(Boolean).join(" ") || void 0,
            value: typeof s == "number" ? String(s) : typeof s == "string" ? s : "",
            min: N(e, "min"),
            max: N(e, "max"),
            step: N(e, "step") ?? "any",
            onChange: (u) => t(u.target.value === "" ? null : Number(u.target.value))
          }
        ) }),
        c && /* @__PURE__ */ n.jsx("span", { id: `${r}-grouped`, className: "cms:text-sm cms:tabular-nums cms:text-muted-foreground", children: c })
      ] });
    }
    case "date": {
      const c = e.config?.time === !0;
      return /* @__PURE__ */ n.jsx(
        m.DatePicker,
        {
          id: r,
          withTime: c,
          invalid: i,
          required: e.required === !0,
          value: z(be(s, c)),
          onChange: (u) => t(z(u ?? ""))
        }
      );
    }
    case "select":
      return e.config?.multiple === !0 ? /* @__PURE__ */ n.jsx(
        ms,
        {
          options: H(e),
          value: Array.isArray(s) ? s.map(String) : [],
          onChange: t,
          invalid: i,
          empty: typeof e.config?.empty == "string" ? e.config.empty : void 0,
          inTickOrder: e.config?.in_tick_order === !0
        }
      ) : /* @__PURE__ */ n.jsx(
        is,
        {
          options: H(e),
          value: typeof s == "string" ? s : null,
          onChange: t,
          id: r,
          fill: l,
          empty: ye(H(e), e.required === !0, typeof e.config?.default == "string" && e.config.default !== "", typeof s == "string" && s !== "")
        }
      );
    case "terms": {
      const c = e.config?.multiple === !0, u = Array.isArray(s) ? s.filter((v) => typeof v == "number") : typeof s == "number" ? s : null;
      return /* @__PURE__ */ n.jsx(
        ge,
        {
          id: r,
          taxonomy: typeof e.taxonomy == "string" ? e.taxonomy : null,
          multiple: c,
          max: N(e, "max") ?? null,
          required: e.required === !0,
          invalid: i,
          value: c ? Array.isArray(u) ? u : [] : typeof u == "number" ? u : null,
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
          value: typeof s == "number" || Array.isArray(s) && s.every((c) => typeof c == "number") ? s : null
        }
      );
    case "link":
      return /* @__PURE__ */ n.jsx(
        ds,
        {
          label: ue(e),
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
          value: typeof s == "number" || Array.isArray(s) && s.every((c) => typeof c == "number") ? s : null,
          onChange: t
        }
      );
    case "group":
      return /* @__PURE__ */ n.jsx(q, { fields: e.fields ?? [], value: S(s), onChange: t, errors: a, id: r, content: o });
    case "repeater":
      return /* @__PURE__ */ n.jsx(fs, { field: e, value: Array.isArray(s) ? s : [], onChange: t, errors: a, id: r, content: o });
    case "flexible":
      return /* @__PURE__ */ n.jsx(ps, { field: e, value: Array.isArray(s) ? s : [], onChange: t, errors: a, id: r });
    default: {
      const c = xe(e.type);
      return c ? /* @__PURE__ */ n.jsx(c, { field: e, value: s, onChange: t, errors: a, id: r, describedBy: d }) : /* @__PURE__ */ n.jsx(B, { prefix: j, suffix: x, id: r, children: /* @__PURE__ */ n.jsx(
        m.Input,
        {
          id: r,
          dir: "auto",
          "aria-invalid": i,
          "aria-describedby": d,
          className: b ? G : void 0,
          value: typeof s == "string" ? s : "",
          placeholder: C(e, "placeholder"),
          onChange: (u) => t(u.target.value)
        }
      ) });
    }
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
function q({ fields: e, value: s, onChange: t, errors: a, id: r, content: o, bare: l = !1 }) {
  const d = /* @__PURE__ */ n.jsx("div", { className: rs(l ? void 0 : "cms:gap-4"), children: e.filter((i) => me(i, s)).map((i) => i.shared ? (
    // Greyed out, with where to edit it under it.
    /* @__PURE__ */ n.jsx("fieldset", { disabled: !0, className: `cms:flex cms:flex-col cms:gap-1 cms:opacity-60 ${X(i)}`, children: /* @__PURE__ */ n.jsx(Y, { id: `${r}-${i.handle}`, field: i, value: s[i.handle], content: o, errors: {}, onChange: () => {
    }, shared: !0 }) }, i.handle)
  ) : /* @__PURE__ */ n.jsx("div", { className: X(i), children: /* @__PURE__ */ n.jsx(
    Y,
    {
      id: `${r}-${i.handle}`,
      field: i,
      value: s[i.handle],
      content: o,
      errors: M(a, i.handle),
      onChange: (j) => t({ ...s, [i.handle]: j })
    }
  ) }, i.handle)) });
  return l ? d : /* @__PURE__ */ n.jsx("div", { className: "cms:rounded-lg cms:border cms:p-4", children: d });
}
function is({ options: e, value: s, onChange: t, id: a, empty: r, fill: o = !1 }) {
  return /* @__PURE__ */ n.jsxs(m.Select, { value: s ?? F, onValueChange: (l) => t(l === F ? null : l), children: [
    /* @__PURE__ */ n.jsx(m.SelectTrigger, { id: a, className: o ? "cms:w-full" : "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ n.jsx(m.SelectValue, {}) }),
    /* @__PURE__ */ n.jsxs(m.SelectContent, { children: [
      r && /* @__PURE__ */ n.jsx(m.SelectItem, { value: F, children: h("None") }),
      e.map((l) => /* @__PURE__ */ n.jsx(m.SelectItem, { value: l.value, children: l.label }, l.value))
    ] })
  ] });
}
function ms({ options: e, value: s, onChange: t, empty: a, inTickOrder: r = !1, invalid: o = !1 }) {
  return e.length === 0 ? /* @__PURE__ */ n.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: a ?? h("Nothing to choose from yet.") }) : /* @__PURE__ */ n.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2", children: e.map((l) => /* @__PURE__ */ n.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
    /* @__PURE__ */ n.jsx(
      m.Checkbox,
      {
        checked: s.includes(l.value),
        "aria-invalid": o || void 0,
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
function us(e) {
  return { url: h("Link"), entry: h("Entry"), term: h("Term"), listing: h("Listing") }[e];
}
function ds({ label: e, value: s, onChange: t, errors: a, id: r, collections: o, placeholder: l, describedBy: d }) {
  const [i, j] = _.useState(L(s.type) ?? "url"), x = L(s.type) ?? i, b = _.useRef({}), c = _.useRef(Object.keys(s).length === 0), [u, v] = _.useState(!1), p = typeof s.new_tab == "boolean" ? s.new_tab : c.current && !u && P(x), f = (g) => t(Ce({ ...s, type: x, new_tab: p, ...g })), k = (g) => {
    if (g === x) return;
    const I = Ae(s, x, g, b.current);
    b.current = I.remembered, j(g), t(I.value === null || !c.current || u ? I.value : { ...I.value, new_tab: P(g) });
  }, w = we(s.rel), y = Se[x], $ = a[y] ?? a.url ?? a.label ?? a.type ?? a.rel;
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ n.jsxs("div", { className: "cms:grid cms:gap-2 cms:md:grid-cols-[10rem_1fr] cms:md:items-start", children: [
      /* @__PURE__ */ n.jsxs(m.Select, { value: x, onValueChange: (g) => k(L(g) ?? "url"), children: [
        /* @__PURE__ */ n.jsx(m.SelectTrigger, { "aria-label": h(":field: link to", { field: e }), className: "cms:w-full", children: /* @__PURE__ */ n.jsx(m.SelectValue, {}) }),
        /* @__PURE__ */ n.jsx(m.SelectContent, { children: Ne.map((g) => /* @__PURE__ */ n.jsx(m.SelectItem, { value: g, children: us(g) }, g)) })
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
          collections: o,
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
        dir: "auto",
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
function de(e) {
  const s = _.useRef([]);
  return s.current = _e(s.current, e), {
    keys: s.current,
    remove: (t) => {
      s.current = s.current.filter((a, r) => r !== t);
    },
    move: (t, a) => {
      s.current = m.moveItem(s.current, t, a);
    }
  };
}
function fe() {
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
function pe({ keys: e, folding: s }) {
  if (e.length < 2) return null;
  const t = s.anyOpen(e);
  return /* @__PURE__ */ n.jsxs(m.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => s.setAll(e, t), children: [
    t ? /* @__PURE__ */ n.jsx(Ee, {}) : /* @__PURE__ */ n.jsx($e, {}),
    " ",
    t ? h("Collapse all") : h("Expand all")
  ] });
}
function fs({ field: e, value: s, onChange: t, errors: a, id: r, content: o = !1 }) {
  const l = e.fields ?? [], d = s.map(S), i = de(d.length), j = (p, f) => t(d.map((k, w) => w === p ? f : k)), x = (p) => {
    i.remove(p), t(d.filter((f, k) => k !== p));
  }, b = e.label ? e.label.toLowerCase().replace(/s$/, "") : h("row"), c = b.charAt(0).toUpperCase() + b.slice(1), u = d.map((p, f) => ({ row: p, index: f, key: i.keys[f] ?? String(f) })), v = fe();
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
        children: ({ row: p, index: f, key: k }, { handle: w }) => J(e, o) ? /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
          /* @__PURE__ */ n.jsx(m.SortableHandle, { ...w, label: h("Move :item :number", { item: b, number: f + 1 }), className: "cms:mt-1" }),
          l.map((y) => /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
            /* @__PURE__ */ n.jsx(
              m.Input,
              {
                dir: "auto",
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
              he,
              {
                label: `${c} ${f + 1}`,
                summary: Q(l, p),
                handle: w,
                onRemove: () => x(f),
                collapsed: $,
                onToggle: () => v.toggle(k),
                controls: `${r}-${f}-fields`,
                hidden: o ? p._hidden === !0 : void 0,
                onHidden: (g) => j(f, { ...p, _hidden: g })
              }
            ),
            /* @__PURE__ */ n.jsx("div", { id: `${r}-${f}-fields`, hidden: $, children: !$ && /* @__PURE__ */ n.jsx(q, { fields: l, value: p, onChange: (g) => j(f, g), errors: y, id: `${r}-${f}`, content: o }) })
          ] });
        })()
      }
    ),
    /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ n.jsxs(m.Button, { type: "button", variant: "outline", size: "sm", onClick: () => t([...d, o ? ke(e.defaults) : {}]), children: [
        /* @__PURE__ */ n.jsx(ee, {}),
        " ",
        h("Add :item", { item: b })
      ] }),
      !J(e, o) && /* @__PURE__ */ n.jsx(pe, { keys: u.map((p) => p.key), folding: v })
    ] })
  ] });
}
function ps({ field: e, value: s, onChange: t, errors: a, id: r }) {
  const o = e.blocks ?? [], l = s.map(S), d = de(l.length), i = (c, u) => t(l.map((v, p) => p === c ? u : v)), j = (c) => {
    d.remove(c), t(l.filter((u, v) => v !== c));
  }, x = l.map((c, u) => ({ block: c, index: u, key: d.keys[u] ?? String(u) })), b = fe();
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    /* @__PURE__ */ n.jsx(
      m.SortableList,
      {
        items: x,
        getId: (c) => c.key,
        className: "cms:gap-3",
        getLabel: (c) => h(":type block", { type: o.find((u) => u.type === c.block.type)?.label ?? String(c.block.type) }),
        onReorder: (c, u, v) => {
          d.move(u, v), t(c.map((p) => p.block));
        },
        children: ({ block: c, index: u, key: v }, { handle: p }) => {
          const f = o.find((y) => y.type === c.type), k = M(a, `${u}.values`), w = b.isCollapsed(v, Object.keys(k).length > 0 || a[`${u}.type`] !== void 0);
          return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ n.jsx(
              he,
              {
                label: f?.label ?? String(c.type),
                summary: f ? Q(f.fields, S(c.values)) : null,
                badge: !0,
                handle: p,
                onRemove: () => j(u),
                collapsed: w,
                onToggle: () => b.toggle(v),
                controls: `${r}-${u}-fields`,
                hidden: c.hidden === !0,
                onHidden: (y) => i(u, { ...c, hidden: y })
              }
            ),
            /* @__PURE__ */ n.jsx("div", { id: `${r}-${u}-fields`, hidden: w, children: w ? null : f ? /* @__PURE__ */ n.jsx(
              q,
              {
                fields: f.fields,
                value: S(c.values),
                onChange: (y) => i(u, { ...c, values: y }),
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
        /* @__PURE__ */ n.jsx(m.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ n.jsxs(m.Button, { type: "button", variant: "outline", size: "sm", disabled: o.length === 0, children: [
          /* @__PURE__ */ n.jsx(ee, {}),
          " ",
          h("Add block")
        ] }) }),
        /* @__PURE__ */ n.jsx(m.DropdownMenuContent, { align: "start", children: o.map((c) => /* @__PURE__ */ n.jsx(m.DropdownMenuItem, { onSelect: () => t([...l, ve(c.type, c.defaults)]), children: c.label }, c.type)) })
      ] }),
      /* @__PURE__ */ n.jsx(pe, { keys: x.map((c) => c.key), folding: b })
    ] })
  ] });
}
function he({ label: e, summary: s, badge: t = !1, handle: a, onRemove: r, collapsed: o, onToggle: l, controls: d, hidden: i, onHidden: j }) {
  const x = o ? Te : Ie, b = s ? `${e}: ${s}` : e;
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ n.jsx(m.SortableHandle, { ...a, label: h("Move :title", { title: b }) }),
    /* @__PURE__ */ n.jsxs(
      "button",
      {
        type: "button",
        onClick: l,
        "aria-expanded": !o,
        "aria-controls": d,
        className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:rounded-md cms:text-left cms:outline-none cms:focus-visible:ring-2 cms:focus-visible:ring-ring",
        children: [
          /* @__PURE__ */ n.jsx(x, { className: "cms:size-4 cms:shrink-0 cms:text-muted-foreground", "aria-hidden": !0 }),
          t ? /* @__PURE__ */ n.jsx(m.Badge, { variant: "secondary", children: e }) : /* @__PURE__ */ n.jsx("span", { className: "cms:shrink-0 cms:text-sm cms:font-medium", children: e }),
          s && /* @__PURE__ */ n.jsx("span", { className: "cms:truncate cms:text-sm cms:text-muted-foreground", children: s }),
          /* @__PURE__ */ n.jsx("span", { className: "cms:sr-only", children: o ? h("(collapsed)") : "" })
        ]
      }
    ),
    i !== void 0 && /* @__PURE__ */ n.jsxs("label", { className: "cms:flex cms:shrink-0 cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", title: h("Off: kept here, but left out of the page"), children: [
      /* @__PURE__ */ n.jsx(m.Switch, { checked: !i, onCheckedChange: (c) => j(!c), "aria-label": h(":title: visible on site", { title: b }) }),
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
  Ss as A,
  qe as B,
  Ie as C,
  me as D,
  X as E,
  Y as F,
  rs as G,
  Me as H,
  ue as I,
  K as J,
  ss as K,
  ae as L,
  ws as M,
  Fs as O,
  ze as S,
  Ts as a,
  M as b,
  Ke as c,
  Os as d,
  We as e,
  ns as f,
  _s as g,
  As as h,
  Is as i,
  Es as j,
  ts as k,
  Cs as l,
  Qe as m,
  Ns as n,
  es as o,
  Rs as p,
  Ds as q,
  $s as r,
  Ls as s,
  Hs as t,
  Be as u,
  Ve as v,
  Ms as w,
  Ge as x,
  Ue as y,
  q as z
};
