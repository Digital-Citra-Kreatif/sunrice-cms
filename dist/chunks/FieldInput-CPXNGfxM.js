import { j as n, t as f, a as pe } from "./admin-BrOs4B--.js";
import { c as F, _ as $ } from "./createLucideIcon-Ccbp7F45.js";
import { u as m } from "./ui-Dh5wfMwT.js";
import { t as he, a as T, E as X, o as xe, d as B, b as ge, g as ye, i as Q, n as be, c as je, s as ve } from "./EntriesPicker-BT8AqXSL.js";
import { F as E } from "./FieldError-36ltLu3Y.js";
import { X as ke } from "./EntryStatus-DJdsr1W8.js";
import { S as Ne } from "./search-3zKi7F1_.js";
import { P as Z } from "./plus-COqahUZ2.js";
import { T as J } from "./trash-DHN6ewjn.js";
import { C as we } from "./chevron-right-9qVV6b-Q.js";
const Y = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
Y.node;
const Se = F(Y);
const ee = {
  name: "chevrons-down-up",
  size: 24,
  node: [
    ["path", { d: "m7 20 5-5 5 5", key: "13a0gw" }],
    ["path", { d: "m7 4 5 5 5-5", key: "1kwcof" }]
  ]
};
ee.node;
const _e = F(ee);
const se = {
  name: "chevrons-up-down",
  size: 24,
  node: [
    ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
    ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
  ]
};
se.node;
const $e = F(se), Ce = $.createContext({}), O = "__none";
async function V(e) {
  const s = await fetch(`${pe("cms/terms/picker")}?${he(e)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!s.ok) throw new Error(String(s.status));
  return await s.json();
}
function Ae({ id: e, taxonomy: s, multiple: t, max: a, required: r, invalid: o, value: c, onChange: d }) {
  const l = $.useContext(Ce), u = c === null ? [] : Array.isArray(c) ? c : [c], [y, j] = $.useState(null), [p, g] = $.useState(!1), [v, h] = $.useState(""), [x, N] = $.useState({}), [w, b] = $.useState(!1);
  $.useEffect(() => {
    if (!s) return;
    const i = v.trim(), S = window.setTimeout(() => {
      V({ taxonomy: s, q: i }).then((k) => {
        j(k.items), k.more && g(!0), b(!1);
      }).catch(() => b(!0));
    }, i === "" ? 0 : 250);
    return () => window.clearTimeout(S);
  }, [s, v]);
  const _ = (i) => l[String(i)] ?? x[i] ?? y?.find((S) => S.id === i)?.label, A = y === null ? "" : u.filter((i) => _(i) === void 0).join(",");
  if ($.useEffect(() => {
    !s || A === "" || V({ taxonomy: s, ids: A.split(",").map(Number) }).then((i) => N((S) => ({ ...S, ...Object.fromEntries(i.items.map((k) => [k.id, k.label])) }))).catch(() => b(!0));
  }, [s, A]), !s) return /* @__PURE__ */ n.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: f("Choose a taxonomy for this field in its blueprint.") });
  if (y === null) return w ? /* @__PURE__ */ n.jsx("p", { className: "cms:text-sm cms:text-destructive", children: f("Terms could not be loaded. Try again.") }) : /* @__PURE__ */ n.jsx(m.Skeleton, { className: "cms:h-9 cms:w-full cms:max-w-sm" });
  const I = (i) => `${"— ".repeat(i.depth)}${i.label}`, me = t && a !== null && u.length >= a, L = (i) => d(t ? i : i[0] ?? null), ue = p && u.length > 0 && /* @__PURE__ */ n.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-1.5", children: u.map((i) => /* @__PURE__ */ n.jsxs(m.Badge, { variant: "secondary", className: "cms:gap-1 cms:pr-1", children: [
    _(i) ?? f("Term #:id", { id: i }),
    !(r && !t) && /* @__PURE__ */ n.jsx(
      "button",
      {
        type: "button",
        className: "cms:rounded-sm cms:p-0.5 cms:hover:bg-muted",
        "aria-label": f("Remove :title", { title: _(i) ?? i }),
        onClick: () => L(u.filter((S) => S !== i)),
        children: /* @__PURE__ */ n.jsx(ke, { className: "cms:size-3" })
      }
    )
  ] }, i)) }), de = p && /* @__PURE__ */ n.jsxs("div", { className: "cms:relative cms:max-w-sm", children: [
    /* @__PURE__ */ n.jsx(Ne, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
    /* @__PURE__ */ n.jsx(
      m.Input,
      {
        id: e,
        className: "cms:pl-9",
        placeholder: f("Search terms"),
        autoComplete: "off",
        "aria-invalid": o,
        value: v,
        onChange: (i) => h(i.target.value)
      }
    )
  ] });
  if (!t && !p) {
    const i = u[0], S = i === void 0 || y.some((k) => k.id === i);
    return /* @__PURE__ */ n.jsxs(m.Select, { value: i === void 0 ? O : String(i), onValueChange: (k) => d(k === O ? null : Number(k)), children: [
      /* @__PURE__ */ n.jsx(m.SelectTrigger, { id: e, className: "cms:w-full cms:max-w-sm", "aria-invalid": o, children: /* @__PURE__ */ n.jsx(m.SelectValue, { children: i === void 0 ? f("None") : _(i) ?? f("Term #:id", { id: i }) }) }),
      /* @__PURE__ */ n.jsxs(m.SelectContent, { children: [
        !r && /* @__PURE__ */ n.jsx(m.SelectItem, { value: O, children: f("None") }),
        !S && i !== void 0 && /* @__PURE__ */ n.jsx(m.SelectItem, { value: String(i), children: _(i) ?? f("Term #:id", { id: i }) }),
        y.map((k) => /* @__PURE__ */ n.jsx(m.SelectItem, { value: String(k.id), children: I(k) }, k.id))
      ] })
    ] });
  }
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    ue,
    de,
    y.length === 0 ? /* @__PURE__ */ n.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: v.trim() ? f("No terms match.") : f("Nothing to choose from yet.") }) : t ? /* @__PURE__ */ n.jsx("div", { className: "cms:flex cms:max-h-72 cms:flex-col cms:gap-2 cms:overflow-auto", children: y.map((i) => {
      const S = u.includes(i.id);
      return /* @__PURE__ */ n.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ n.jsx(
          m.Checkbox,
          {
            checked: S,
            disabled: !S && me,
            onCheckedChange: (k) => L(k ? [...u, i.id] : u.filter((fe) => fe !== i.id))
          }
        ),
        I(i)
      ] }, i.id);
    }) }) : /* @__PURE__ */ n.jsx("div", { role: "listbox", "aria-label": f("Terms"), className: "cms:flex cms:max-h-72 cms:flex-col cms:overflow-auto", children: y.map((i) => /* @__PURE__ */ n.jsx(
      m.Button,
      {
        type: "button",
        variant: u[0] === i.id ? "secondary" : "ghost",
        size: "sm",
        className: "cms:justify-start",
        role: "option",
        "aria-selected": u[0] === i.id,
        onClick: () => d(i.id),
        children: I(i)
      },
      i.id
    )) })
  ] });
}
const te = (e, s = {}) => e.replace(/:([A-Za-z_]+)/g, (t, a) => s[a] ?? t), ms = 5;
let Te = 0;
const H = () => `f${++Te}`;
function Ee(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function Ie(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^[0-9_]+/, "").replace(/_{2,}/g, "_").slice(0, 64);
}
function ne(e, s) {
  const t = new Set(s.map((o) => o.handle)), a = Ee(e) || "field";
  let r = a;
  for (let o = 2; t.has(r); o++)
    r = `${a}_${o}`;
  return r;
}
function Oe(e) {
  return (e ?? []).map(({ fields: s, ...t }) => ({
    ...t,
    key: H(),
    fields: Oe(s),
    handleTouched: !0,
    savedHandle: t.handle
  }));
}
function ze(e, s) {
  return e.map(({ key: t, handleTouched: a, savedHandle: r, fields: o, ...c }) => ({
    ...c,
    validation: (c.validation ?? []).map((d) => d.trim()).filter((d) => d !== ""),
    ...s(c.type) ? { fields: ze(o, s) } : {}
  }));
}
function us(e, s, t) {
  return { key: H(), type: e, label: s, handle: ne(s, t), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function ds(e) {
  return e.type !== "fieldset" && e.savedHandle !== void 0 && e.savedHandle !== "" && e.handle !== e.savedHandle ? e.savedHandle : null;
}
function De(e) {
  return e.map((s) => ({ ...s, savedHandle: s.handle, fields: De(s.fields) }));
}
function fs(e, s, t) {
  if (e.handleTouched) return { ...e, label: s };
  const a = t.filter((r) => r.key !== e.key);
  return { ...e, label: s, handle: ne(s || e.type, a) };
}
function Fe(e, s) {
  const t = `${s}.`, a = {};
  for (const [r, o] of Object.entries(e))
    r.startsWith(t) && (a[r.slice(t.length)] = o);
  return a;
}
function R(e, s) {
  const t = e[s];
  return { ...Fe(e, s), ...t !== void 0 ? { "": t } : {} };
}
function ps(e, s) {
  return Object.keys(e).filter((t) => t === s || t.startsWith(`${s}.`));
}
function hs(e, s) {
  return Object.keys(e).some((t) => t === s || t.startsWith(`${s}.`));
}
function xs(e, s) {
  return s.filter((t) => t.key !== e.key && t.handle !== "" && t.type !== "fieldset");
}
function gs(e, s, t, a = te) {
  return e.type === "fieldset" ? null : t?.includes(e.handle) ? a('":handle" is used by the content itself; choose another handle.', { handle: e.handle }) : e.handle !== "" && s.some((r) => r.key !== e.key && r.type !== "fieldset" && r.handle === e.handle) ? a('There is already a field ":handle" here.', { handle: e.handle }) : null;
}
function ys(e, s) {
  return typeof e.translatable == "boolean" ? e.translatable : s;
}
function bs(e, s, t) {
  return { ...e, translatable: s === t ? null : s };
}
function He(e, s, t = []) {
  const a = /* @__PURE__ */ new Set([...s.map((c) => c.handle), ...t]), r = `${(Ie(e) || "field").slice(0, 56)}_copy`;
  let o = r;
  for (let c = 2; a.has(o); c++)
    o = `${r}_${c}`;
  return o;
}
function re(e) {
  const { key: s, savedHandle: t, fields: a, ...r } = e;
  return { ...structuredClone(r), key: H(), fields: a.map(re) };
}
function js(e, s, t = [], a = te) {
  const r = e[s];
  if (r === void 0) return null;
  const o = r.label || r.handle, c = {
    ...re(r),
    label: a(":label (copy)", { label: o }),
    handle: r.type === "fieldset" ? r.handle : He(r.handle, e, t),
    handleTouched: !0
  };
  return { fields: [...e.slice(0, s + 1), c, ...e.slice(s + 1)], copy: c };
}
function Re(e, s) {
  const t = e.condition;
  return !t || "rules" in t ? null : (t.operator === "filled" || t.operator === "equals" && (t.value === !0 || t.value === "true")) && s.some((r) => r.handle === t.field && r.type === "toggle") ? t.field : null;
}
function vs(e) {
  const s = (r) => r.type === "number" || r.type === "text" && (r.instructions ?? "").length <= 60, t = {}, a = [];
  for (const r of e) {
    const o = Re(r, e);
    o === null ? a.push(r) : (t[o] ??= []).push(r);
  }
  return { options: a.filter((r) => !s(r)), limits: a.filter(s), dependents: t };
}
const ks = [
  { value: "equals", label: "is", needsValue: !0 },
  { value: "not_equals", label: "is not", needsValue: !0 },
  { value: "filled", label: "is filled in", needsValue: !1 },
  { value: "empty", label: "is empty", needsValue: !1 }
];
function M(e) {
  return e === !0 ? "true" : e === !1 ? "false" : typeof e == "string" || typeof e == "number" ? String(e) : "";
}
function qe(e) {
  return e ? "rules" in e ? Array.isArray(e.rules) ? e.rules : [] : [e] : [];
}
function Le(e) {
  return e && "rules" in e && e.match === "any" ? "any" : "all";
}
function Ns(e, s) {
  return e.length === 0 ? null : e.length === 1 ? e[0] : { match: s, rules: e };
}
function P(e, s) {
  const t = s[e.field], a = t != null && t !== "" && t !== !1 && !(Array.isArray(t) && t.length === 0), r = (Array.isArray(t) ? t : [t]).map(M).includes(M(e.value));
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
function Be(e, s) {
  const t = qe(e.condition);
  return t.length === 0 ? !0 : Le(e.condition) === "any" ? t.some((a) => P(a, s)) : t.every((a) => P(a, s));
}
function ws(e) {
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
function Ss(e) {
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
const Ve = [25, 33, 50, 66, 75, 100];
function Me(e) {
  return Ve.find((s) => s === e.width) ?? 100;
}
function Pe(e = "cms:gap-x-4 cms:gap-y-6") {
  return `cms:@container cms:grid cms:grid-cols-12 cms:items-start ${e}`;
}
const Ue = {
  25: "cms:@lg:col-span-3",
  33: "cms:@lg:col-span-4",
  50: "cms:@lg:col-span-6",
  66: "cms:@lg:col-span-8",
  75: "cms:@lg:col-span-9",
  100: ""
};
function U(e) {
  return `cms:col-span-12 cms:min-w-0 ${Ue[Me(e)]}`.trim();
}
function _s(e, s) {
  const { width: t, ...a } = e;
  return s === 100 ? a : { ...a, width: s };
}
const z = "__none";
function D(e) {
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
const We = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function ae(e) {
  if (e.label) return e.label;
  const s = e.handle.replace(/_/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function W({ field: e, value: s, onChange: t, errors: a, id: r, content: o = !1, fill: c = !1, marker: d = null }) {
  const l = ae(e), u = We.includes(e.type) || ["select", "terms"].includes(e.type) && e.config?.multiple === !0, y = a[""] !== void 0;
  return /* @__PURE__ */ n.jsxs(
    "div",
    {
      className: "cms:flex cms:flex-col cms:gap-2",
      ...u ? { role: "group", "aria-labelledby": `${r}-label`, ...y ? { "aria-invalid": !0, "aria-describedby": `${r}-error` } : {} } : {},
      children: [
        e.type === "toggle" ? /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
          /* @__PURE__ */ n.jsx(m.Switch, { id: r, checked: s === !0, onCheckedChange: (j) => t(j) }),
          /* @__PURE__ */ n.jsx(m.Label, { htmlFor: r, children: l }),
          d
        ] }) : /* @__PURE__ */ n.jsxs(m.Label, { id: `${r}-label`, htmlFor: u ? void 0 : r, children: [
          l,
          e.required && /* @__PURE__ */ n.jsx("span", { className: "cms:text-destructive", children: " *" }),
          d
        ] }),
        /* @__PURE__ */ n.jsx(Ge, { field: e, value: s, onChange: t, errors: a, id: r, content: o, fill: c }),
        ["text", "textarea"].includes(e.type) && C(e, "max") !== void 0 && /* @__PURE__ */ n.jsx(Ke, { length: typeof s == "string" ? [...s].length : 0, max: C(e, "max") ?? 0 }),
        e.instructions && /* @__PURE__ */ n.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: e.instructions }),
        /* @__PURE__ */ n.jsx(E, { message: a[""], id: `${r}-error` })
      ]
    }
  );
}
function Ke({ length: e, max: s }) {
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
function Ge({ field: e, value: s, onChange: t, errors: a, id: r, content: o, fill: c = !1 }) {
  const d = a[""] !== void 0;
  switch (e.type) {
    case "toggle":
      return null;
    case "file":
      return /* @__PURE__ */ n.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: f("Visitors attach a file here when they send a form.") });
    case "textarea":
      return /* @__PURE__ */ n.jsx(
        m.Textarea,
        {
          id: r,
          "aria-invalid": d,
          value: typeof s == "string" ? s : "",
          rows: C(e, "rows") ?? 4,
          onChange: (l) => t(l.target.value)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ n.jsx(m.RichTextEditor, { id: r, labelledBy: `${r}-label`, invalid: d, value: typeof s == "string" ? s : "", onChange: t });
    case "number": {
      const l = ye(s);
      return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ n.jsx(
          m.Input,
          {
            id: r,
            type: "number",
            className: c ? "cms:w-full" : "cms:max-w-48",
            placeholder: K(e, "placeholder"),
            "aria-invalid": d,
            "aria-describedby": l ? `${r}-grouped` : void 0,
            value: typeof s == "number" ? String(s) : typeof s == "string" ? s : "",
            min: C(e, "min"),
            max: C(e, "max"),
            step: C(e, "step") ?? "any",
            onChange: (u) => t(u.target.value === "" ? null : Number(u.target.value))
          }
        ),
        l && /* @__PURE__ */ n.jsx("span", { id: `${r}-grouped`, className: "cms:text-sm cms:tabular-nums cms:text-muted-foreground", children: l })
      ] });
    }
    case "date": {
      const l = e.config?.time === !0;
      return /* @__PURE__ */ n.jsx(
        m.DatePicker,
        {
          id: r,
          withTime: l,
          invalid: d,
          required: e.required === !0,
          value: B(ge(s, l)),
          onChange: (u) => t(B(u ?? ""))
        }
      );
    }
    case "select":
      return e.config?.multiple === !0 ? /* @__PURE__ */ n.jsx(
        Qe,
        {
          options: D(e),
          value: Array.isArray(s) ? s.map(String) : [],
          onChange: t,
          invalid: d,
          empty: typeof e.config?.empty == "string" ? e.config.empty : void 0,
          inTickOrder: e.config?.in_tick_order === !0
        }
      ) : /* @__PURE__ */ n.jsx(
        Xe,
        {
          options: D(e),
          value: typeof s == "string" ? s : null,
          onChange: t,
          id: r,
          fill: c,
          empty: xe(D(e), e.required === !0, typeof e.config?.default == "string" && e.config.default !== "", typeof s == "string" && s !== "")
        }
      );
    case "terms": {
      const l = e.config?.multiple === !0, u = Array.isArray(s) ? s.filter((y) => typeof y == "number") : typeof s == "number" ? s : null;
      return /* @__PURE__ */ n.jsx(
        Ae,
        {
          id: r,
          taxonomy: typeof e.taxonomy == "string" ? e.taxonomy : null,
          multiple: l,
          max: C(e, "max") ?? null,
          required: e.required === !0,
          invalid: d,
          value: l ? Array.isArray(u) ? u : [] : typeof u == "number" ? u : null,
          onChange: t
        }
      );
    }
    case "entries":
      return /* @__PURE__ */ n.jsx(
        X,
        {
          id: r,
          invalid: d,
          multiple: e.config?.multiple === !0,
          max: C(e, "max") ?? null,
          collections: e.collections ?? [],
          onChange: t,
          value: typeof s == "number" || Array.isArray(s) && s.every((l) => typeof l == "number") ? s : null
        }
      );
    case "link":
      return /* @__PURE__ */ n.jsx(Ze, { label: ae(e), value: T(s), onChange: t, errors: a, id: r, collections: e.collections ?? [] });
    case "media":
      return /* @__PURE__ */ n.jsx(
        m.MediaPickerInput,
        {
          id: r,
          invalid: d,
          disabled: !1,
          multiple: e.config?.multiple === !0,
          max: C(e, "max") ?? null,
          types: Array.isArray(e.config?.types) ? e.config.types : [],
          value: typeof s == "number" || Array.isArray(s) && s.every((l) => typeof l == "number") ? s : null,
          onChange: t
        }
      );
    case "group":
      return /* @__PURE__ */ n.jsx(q, { fields: e.fields ?? [], value: T(s), onChange: t, errors: a, id: r, content: o });
    case "repeater":
      return /* @__PURE__ */ n.jsx(Je, { field: e, value: Array.isArray(s) ? s : [], onChange: t, errors: a, id: r, content: o });
    case "flexible":
      return /* @__PURE__ */ n.jsx(Ye, { field: e, value: Array.isArray(s) ? s : [], onChange: t, errors: a, id: r });
    default:
      return /* @__PURE__ */ n.jsx(
        m.Input,
        {
          id: r,
          "aria-invalid": d,
          value: typeof s == "string" ? s : "",
          placeholder: K(e, "placeholder"),
          onChange: (l) => t(l.target.value)
        }
      );
  }
}
function C(e, s) {
  const t = e.config?.[s];
  return typeof t == "number" ? t : void 0;
}
function K(e, s) {
  const t = e.config?.[s];
  return typeof t == "string" ? t : void 0;
}
function q({ fields: e, value: s, onChange: t, errors: a, id: r, content: o, bare: c = !1 }) {
  const d = /* @__PURE__ */ n.jsx("div", { className: Pe(c ? void 0 : "cms:gap-4"), children: e.filter((l) => Be(l, s)).map((l) => l.shared ? (
    // Greyed out; the form says once, at the top, where to edit shared fields.
    /* @__PURE__ */ n.jsx("fieldset", { disabled: !0, className: `cms:flex cms:flex-col cms:gap-1 cms:opacity-60 ${U(l)}`, title: f("Shared by all languages: edit it in the main language."), children: /* @__PURE__ */ n.jsx(W, { id: `${r}-${l.handle}`, field: l, value: s[l.handle], content: o, errors: {}, onChange: () => {
    } }) }, l.handle)
  ) : /* @__PURE__ */ n.jsx("div", { className: U(l), children: /* @__PURE__ */ n.jsx(
    W,
    {
      id: `${r}-${l.handle}`,
      field: l,
      value: s[l.handle],
      content: o,
      errors: R(a, l.handle),
      onChange: (u) => t({ ...s, [l.handle]: u })
    }
  ) }, l.handle)) });
  return c ? d : /* @__PURE__ */ n.jsx("div", { className: "cms:rounded-lg cms:border cms:p-4", children: d });
}
function Xe({ options: e, value: s, onChange: t, id: a, empty: r, fill: o = !1 }) {
  return /* @__PURE__ */ n.jsxs(m.Select, { value: s ?? z, onValueChange: (c) => t(c === z ? null : c), children: [
    /* @__PURE__ */ n.jsx(m.SelectTrigger, { id: a, className: o ? "cms:w-full" : "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ n.jsx(m.SelectValue, {}) }),
    /* @__PURE__ */ n.jsxs(m.SelectContent, { children: [
      r && /* @__PURE__ */ n.jsx(m.SelectItem, { value: z, children: f("None") }),
      e.map((c) => /* @__PURE__ */ n.jsx(m.SelectItem, { value: c.value, children: c.label }, c.value))
    ] })
  ] });
}
function Qe({ options: e, value: s, onChange: t, empty: a, inTickOrder: r = !1, invalid: o = !1 }) {
  return e.length === 0 ? /* @__PURE__ */ n.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: a ?? f("Nothing to choose from yet.") }) : /* @__PURE__ */ n.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2", children: e.map((c) => /* @__PURE__ */ n.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
    /* @__PURE__ */ n.jsx(
      m.Checkbox,
      {
        checked: s.includes(c.value),
        "aria-invalid": o || void 0,
        onCheckedChange: (d) => t(d ? r ? [...s.filter((l) => l !== c.value), c.value] : e.map((l) => l.value).filter((l) => l === c.value || s.includes(l)) : s.filter((l) => l !== c.value))
      }
    ),
    c.label,
    r && s.includes(c.value) && /* @__PURE__ */ n.jsxs("span", { className: "cms:text-xs cms:text-muted-foreground", "aria-label": `number ${s.indexOf(c.value) + 1}`, children: [
      "#",
      s.indexOf(c.value) + 1
    ] })
  ] }, c.value)) });
}
function Ze({ label: e, value: s, onChange: t, errors: a, id: r, collections: o }) {
  const c = s.type === "entry" ? "entry" : "url", d = (l) => {
    const u = { ...s, type: c, ...l }, y = u.type === "entry" ? typeof u.entry_id != "number" : u.url === "" || u.url === void 0 || u.url === null;
    t(y ? u.label || u.new_tab ? u : null : u);
  };
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ n.jsx("div", { role: "radiogroup", "aria-label": f(":field: link to", { field: e }), className: "cms:inline-flex cms:w-fit cms:rounded-md cms:border cms:p-0.5", children: ["url", "entry"].map((l) => /* @__PURE__ */ n.jsx(
      m.Button,
      {
        type: "button",
        size: "sm",
        role: "radio",
        "aria-checked": c === l,
        variant: c === l ? "secondary" : "ghost",
        onClick: () => d({ type: l, url: l === "url" ? s.url : void 0, entry_id: l === "entry" ? s.entry_id : void 0 }),
        children: l === "url" ? f("Address") : f("Entry")
      },
      l
    )) }),
    /* @__PURE__ */ n.jsxs("div", { className: "cms:grid cms:gap-2 cms:md:grid-cols-[2fr_1fr_auto] cms:md:items-start", children: [
      c === "url" ? /* @__PURE__ */ n.jsx(
        m.Input,
        {
          id: r,
          "aria-label": f(":field: address", { field: e }),
          placeholder: f("https://… or /about"),
          value: typeof s.url == "string" ? s.url : "",
          onChange: (l) => d({ url: l.target.value }),
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
          onChange: (l) => d({ entry_id: typeof l == "number" ? l : void 0 })
        }
      ),
      /* @__PURE__ */ n.jsx(
        m.Input,
        {
          "aria-label": f(":field: link text", { field: e }),
          placeholder: c === "entry" ? f("Link text (the entry's title)") : f("Link text"),
          value: typeof s.label == "string" ? s.label : "",
          onChange: (l) => d({ label: l.target.value })
        }
      ),
      /* @__PURE__ */ n.jsxs("label", { className: "cms:flex cms:h-9 cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ n.jsx(m.Checkbox, { checked: s.new_tab === !0, onCheckedChange: (l) => d({ new_tab: l }) }),
        f("New tab")
      ] }),
      /* @__PURE__ */ n.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ n.jsx(E, { message: a.url ?? a.entry_id ?? a.label ?? a.type }) })
    ] })
  ] });
}
function G(e, s) {
  return !s && (e.fields ?? []).every((t) => t.type === "text");
}
function le(e) {
  const s = $.useRef([]);
  return s.current = ve(s.current, e), {
    keys: s.current,
    remove: (t) => {
      s.current = s.current.filter((a, r) => r !== t);
    },
    move: (t, a) => {
      s.current = m.moveItem(s.current, t, a);
    }
  };
}
function ce() {
  const [e, s] = $.useState(() => /* @__PURE__ */ new Set());
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
function oe({ keys: e, folding: s }) {
  if (e.length < 2) return null;
  const t = s.anyOpen(e);
  return /* @__PURE__ */ n.jsxs(m.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => s.setAll(e, t), children: [
    t ? /* @__PURE__ */ n.jsx(_e, {}) : /* @__PURE__ */ n.jsx($e, {}),
    " ",
    t ? f("Collapse all") : f("Expand all")
  ] });
}
function Je({ field: e, value: s, onChange: t, errors: a, id: r, content: o = !1 }) {
  const c = e.fields ?? [], d = s.map(T), l = le(d.length), u = (h, x) => t(d.map((N, w) => w === h ? x : N)), y = (h) => {
    l.remove(h), t(d.filter((x, N) => N !== h));
  }, j = e.label ? e.label.toLowerCase().replace(/s$/, "") : f("row"), p = j.charAt(0).toUpperCase() + j.slice(1), g = d.map((h, x) => ({ row: h, index: x, key: l.keys[x] ?? String(x) })), v = ce();
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ n.jsx(
      m.SortableList,
      {
        items: g,
        getId: (h) => h.key,
        getLabel: (h) => `${j} ${h.index + 1}`,
        onReorder: (h, x, N) => {
          l.move(x, N), t(h.map((w) => w.row));
        },
        children: ({ row: h, index: x, key: N }, { handle: w }) => G(e, o) ? /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
          /* @__PURE__ */ n.jsx(m.SortableHandle, { ...w, label: f("Move :item :number", { item: j, number: x + 1 }), className: "cms:mt-1" }),
          c.map((b) => /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
            /* @__PURE__ */ n.jsx(
              m.Input,
              {
                "aria-label": b.label || b.handle,
                placeholder: b.label || b.handle,
                value: typeof h[b.handle] == "string" ? h[b.handle] : "",
                onChange: (_) => u(x, { ...h, [b.handle]: _.target.value })
              }
            ),
            /* @__PURE__ */ n.jsx(E, { message: a[`${x}.${b.handle}`] })
          ] }, b.handle)),
          /* @__PURE__ */ n.jsx(m.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": f("Remove :item :number", { item: j, number: x + 1 }), onClick: () => y(x), children: /* @__PURE__ */ n.jsx(J, {}) })
        ] }) : (() => {
          const b = R(a, String(x)), _ = v.isCollapsed(N, Object.keys(b).length > 0);
          return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ n.jsx(
              ie,
              {
                label: `${p} ${x + 1}`,
                summary: Q(c, h),
                handle: w,
                onRemove: () => y(x),
                collapsed: _,
                onToggle: () => v.toggle(N),
                controls: `${r}-${x}-fields`,
                hidden: o ? h._hidden === !0 : void 0,
                onHidden: (A) => u(x, { ...h, _hidden: A })
              }
            ),
            /* @__PURE__ */ n.jsx("div", { id: `${r}-${x}-fields`, hidden: _, children: !_ && /* @__PURE__ */ n.jsx(q, { fields: c, value: h, onChange: (A) => u(x, A), errors: b, id: `${r}-${x}`, content: o }) })
          ] });
        })()
      }
    ),
    /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ n.jsxs(m.Button, { type: "button", variant: "outline", size: "sm", onClick: () => t([...d, o ? je() : {}]), children: [
        /* @__PURE__ */ n.jsx(Z, {}),
        " ",
        f("Add :item", { item: j })
      ] }),
      !G(e, o) && /* @__PURE__ */ n.jsx(oe, { keys: g.map((h) => h.key), folding: v })
    ] })
  ] });
}
function Ye({ field: e, value: s, onChange: t, errors: a, id: r }) {
  const o = e.blocks ?? [], c = s.map(T), d = le(c.length), l = (p, g) => t(c.map((v, h) => h === p ? g : v)), u = (p) => {
    d.remove(p), t(c.filter((g, v) => v !== p));
  }, y = c.map((p, g) => ({ block: p, index: g, key: d.keys[g] ?? String(g) })), j = ce();
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    /* @__PURE__ */ n.jsx(
      m.SortableList,
      {
        items: y,
        getId: (p) => p.key,
        className: "cms:gap-3",
        getLabel: (p) => f(":type block", { type: o.find((g) => g.type === p.block.type)?.label ?? String(p.block.type) }),
        onReorder: (p, g, v) => {
          d.move(g, v), t(p.map((h) => h.block));
        },
        children: ({ block: p, index: g, key: v }, { handle: h }) => {
          const x = o.find((b) => b.type === p.type), N = R(a, `${g}.values`), w = j.isCollapsed(v, Object.keys(N).length > 0 || a[`${g}.type`] !== void 0);
          return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ n.jsx(
              ie,
              {
                label: x?.label ?? String(p.type),
                summary: x ? Q(x.fields, T(p.values)) : null,
                badge: !0,
                handle: h,
                onRemove: () => u(g),
                collapsed: w,
                onToggle: () => j.toggle(v),
                controls: `${r}-${g}-fields`,
                hidden: p.hidden === !0,
                onHidden: (b) => l(g, { ...p, hidden: b })
              }
            ),
            /* @__PURE__ */ n.jsx("div", { id: `${r}-${g}-fields`, hidden: w, children: w ? null : x ? /* @__PURE__ */ n.jsx(
              q,
              {
                fields: x.fields,
                value: T(p.values),
                onChange: (b) => l(g, { ...p, values: b }),
                errors: N,
                id: `${r}-${g}`,
                content: !0
              }
            ) : /* @__PURE__ */ n.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: f("This kind of block no longer exists. Its values are kept.") }) }),
            /* @__PURE__ */ n.jsx(E, { message: a[`${g}.type`] })
          ] });
        }
      }
    ),
    /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ n.jsxs(m.DropdownMenu, { children: [
        /* @__PURE__ */ n.jsx(m.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ n.jsxs(m.Button, { type: "button", variant: "outline", size: "sm", disabled: o.length === 0, children: [
          /* @__PURE__ */ n.jsx(Z, {}),
          " ",
          f("Add block")
        ] }) }),
        /* @__PURE__ */ n.jsx(m.DropdownMenuContent, { align: "start", children: o.map((p) => /* @__PURE__ */ n.jsx(m.DropdownMenuItem, { onSelect: () => t([...c, be(p.type)]), children: p.label }, p.type)) })
      ] }),
      /* @__PURE__ */ n.jsx(oe, { keys: y.map((p) => p.key), folding: j })
    ] })
  ] });
}
function ie({ label: e, summary: s, badge: t = !1, handle: a, onRemove: r, collapsed: o, onToggle: c, controls: d, hidden: l, onHidden: u }) {
  const y = o ? we : Se, j = s ? `${e}: ${s}` : e;
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ n.jsx(m.SortableHandle, { ...a, label: f("Move :title", { title: j }) }),
    /* @__PURE__ */ n.jsxs(
      "button",
      {
        type: "button",
        onClick: c,
        "aria-expanded": !o,
        "aria-controls": d,
        className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:rounded-md cms:text-left cms:outline-none cms:focus-visible:ring-2 cms:focus-visible:ring-ring",
        children: [
          /* @__PURE__ */ n.jsx(y, { className: "cms:size-4 cms:shrink-0 cms:text-muted-foreground", "aria-hidden": !0 }),
          t ? /* @__PURE__ */ n.jsx(m.Badge, { variant: "secondary", children: e }) : /* @__PURE__ */ n.jsx("span", { className: "cms:shrink-0 cms:text-sm cms:font-medium", children: e }),
          s && /* @__PURE__ */ n.jsx("span", { className: "cms:truncate cms:text-sm cms:text-muted-foreground", children: s }),
          /* @__PURE__ */ n.jsx("span", { className: "cms:sr-only", children: o ? f("(collapsed)") : "" })
        ]
      }
    ),
    l !== void 0 && /* @__PURE__ */ n.jsxs("label", { className: "cms:flex cms:shrink-0 cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", title: f("Off: kept here, but left out of the page"), children: [
      /* @__PURE__ */ n.jsx(m.Switch, { checked: !l, onCheckedChange: (p) => u(!p), "aria-label": f(":title: visible on site", { title: j }) }),
      f("Visible on site")
    ] }),
    /* @__PURE__ */ n.jsx(
      m.Button,
      {
        type: "button",
        variant: "ghost",
        size: "icon",
        className: "cms:size-8 cms:shrink-0 cms:text-destructive",
        "aria-label": f("Remove :title", { title: j }),
        onClick: r,
        children: /* @__PURE__ */ n.jsx(J, {})
      }
    )
  ] });
}
export {
  q as A,
  ps as B,
  Se as C,
  Be as D,
  U as E,
  W as F,
  Pe as G,
  $e as H,
  ae as I,
  ms as M,
  ks as O,
  Ae as T,
  gs as a,
  R as b,
  Ie as c,
  js as d,
  Fe as e,
  Me as f,
  ds as g,
  hs as h,
  ys as i,
  bs as j,
  Ve as k,
  xs as l,
  qe as m,
  us as n,
  Le as o,
  ws as p,
  Ss as q,
  fs as r,
  vs as s,
  Ns as t,
  Oe as u,
  Ee as v,
  _s as w,
  ze as x,
  De as y,
  Ce as z
};
