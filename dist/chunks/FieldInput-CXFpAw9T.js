import { j as n, t as f, a as fe } from "./admin-AwfaNzsU.js";
import { c as R, _ as $ } from "./createLucideIcon-Ccbp7F45.js";
import { u } from "./ui-Dh5wfMwT.js";
import { t as pe, a as T, E as G, o as he, d as L, b as xe, g as ye, i as X, n as ge, c as be, s as je } from "./EntriesPicker-B9rLvnsr.js";
import { F as O } from "./FieldError-BD5SRSF-.js";
import { X as ve } from "./EntryStatus-D9z0E-cZ.js";
import { S as ke } from "./search-3zKi7F1_.js";
import { P as Q } from "./plus-COqahUZ2.js";
import { T as Z } from "./trash-DHN6ewjn.js";
import { C as Ne } from "./chevron-right-9qVV6b-Q.js";
const J = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
J.node;
const we = R(J);
const Y = {
  name: "chevrons-down-up",
  size: 24,
  node: [
    ["path", { d: "m7 20 5-5 5 5", key: "13a0gw" }],
    ["path", { d: "m7 4 5 5 5-5", key: "1kwcof" }]
  ]
};
Y.node;
const Se = R(Y);
const ee = {
  name: "chevrons-up-down",
  size: 24,
  node: [
    ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
    ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
  ]
};
ee.node;
const _e = R(ee), $e = $.createContext({}), E = "__none";
async function V(e) {
  const s = await fetch(`${fe("cms/terms/picker")}?${pe(e)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!s.ok) throw new Error(String(s.status));
  return await s.json();
}
function Ce({ id: e, taxonomy: s, multiple: t, max: a, required: r, invalid: i, value: c, onChange: o }) {
  const l = $.useContext($e), d = c === null ? [] : Array.isArray(c) ? c : [c], [g, j] = $.useState(null), [p, y] = $.useState(!1), [v, h] = $.useState(""), [x, N] = $.useState({}), [w, b] = $.useState(!1);
  $.useEffect(() => {
    if (!s) return;
    const m = v.trim(), S = window.setTimeout(() => {
      V({ taxonomy: s, q: m }).then((k) => {
        j(k.items), k.more && y(!0), b(!1);
      }).catch(() => b(!0));
    }, m === "" ? 0 : 250);
    return () => window.clearTimeout(S);
  }, [s, v]);
  const _ = (m) => l[String(m)] ?? x[m] ?? g?.find((S) => S.id === m)?.label, A = g === null ? "" : d.filter((m) => _(m) === void 0).join(",");
  if ($.useEffect(() => {
    !s || A === "" || V({ taxonomy: s, ids: A.split(",").map(Number) }).then((m) => N((S) => ({ ...S, ...Object.fromEntries(m.items.map((k) => [k.id, k.label])) }))).catch(() => b(!0));
  }, [s, A]), !s) return /* @__PURE__ */ n.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: f("Choose a taxonomy for this field in its blueprint.") });
  if (g === null) return w ? /* @__PURE__ */ n.jsx("p", { className: "cms:text-sm cms:text-destructive", children: f("Terms could not be loaded. Try again.") }) : /* @__PURE__ */ n.jsx(u.Skeleton, { className: "cms:h-9 cms:w-full cms:max-w-sm" });
  const z = (m) => `${"— ".repeat(m.depth)}${m.label}`, ie = t && a !== null && d.length >= a, B = (m) => o(t ? m : m[0] ?? null), me = p && d.length > 0 && /* @__PURE__ */ n.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-1.5", children: d.map((m) => /* @__PURE__ */ n.jsxs(u.Badge, { variant: "secondary", className: "cms:gap-1 cms:pr-1", children: [
    _(m) ?? f("Term #:id", { id: m }),
    !(r && !t) && /* @__PURE__ */ n.jsx(
      "button",
      {
        type: "button",
        className: "cms:rounded-sm cms:p-0.5 cms:hover:bg-muted",
        "aria-label": f("Remove :title", { title: _(m) ?? m }),
        onClick: () => B(d.filter((S) => S !== m)),
        children: /* @__PURE__ */ n.jsx(ve, { className: "cms:size-3" })
      }
    )
  ] }, m)) }), ue = p && /* @__PURE__ */ n.jsxs("div", { className: "cms:relative cms:max-w-sm", children: [
    /* @__PURE__ */ n.jsx(ke, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
    /* @__PURE__ */ n.jsx(
      u.Input,
      {
        id: e,
        className: "cms:pl-9",
        placeholder: f("Search terms"),
        autoComplete: "off",
        "aria-invalid": i,
        value: v,
        onChange: (m) => h(m.target.value)
      }
    )
  ] });
  if (!t && !p) {
    const m = d[0], S = m === void 0 || g.some((k) => k.id === m);
    return /* @__PURE__ */ n.jsxs(u.Select, { value: m === void 0 ? E : String(m), onValueChange: (k) => o(k === E ? null : Number(k)), children: [
      /* @__PURE__ */ n.jsx(u.SelectTrigger, { id: e, className: "cms:w-full cms:max-w-sm", "aria-invalid": i, children: /* @__PURE__ */ n.jsx(u.SelectValue, { children: m === void 0 ? f("None") : _(m) ?? f("Term #:id", { id: m }) }) }),
      /* @__PURE__ */ n.jsxs(u.SelectContent, { children: [
        !r && /* @__PURE__ */ n.jsx(u.SelectItem, { value: E, children: f("None") }),
        !S && m !== void 0 && /* @__PURE__ */ n.jsx(u.SelectItem, { value: String(m), children: _(m) ?? f("Term #:id", { id: m }) }),
        g.map((k) => /* @__PURE__ */ n.jsx(u.SelectItem, { value: String(k.id), children: z(k) }, k.id))
      ] })
    ] });
  }
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    me,
    ue,
    g.length === 0 ? /* @__PURE__ */ n.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: v.trim() ? f("No terms match.") : f("Nothing to choose from yet.") }) : t ? /* @__PURE__ */ n.jsx("div", { className: "cms:flex cms:max-h-72 cms:flex-col cms:gap-2 cms:overflow-auto", children: g.map((m) => {
      const S = d.includes(m.id);
      return /* @__PURE__ */ n.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ n.jsx(
          u.Checkbox,
          {
            checked: S,
            disabled: !S && ie,
            onCheckedChange: (k) => B(k ? [...d, m.id] : d.filter((de) => de !== m.id))
          }
        ),
        z(m)
      ] }, m.id);
    }) }) : /* @__PURE__ */ n.jsx("div", { role: "listbox", "aria-label": f("Terms"), className: "cms:flex cms:max-h-72 cms:flex-col cms:overflow-auto", children: g.map((m) => /* @__PURE__ */ n.jsx(
      u.Button,
      {
        type: "button",
        variant: d[0] === m.id ? "secondary" : "ghost",
        size: "sm",
        className: "cms:justify-start",
        role: "option",
        "aria-selected": d[0] === m.id,
        onClick: () => o(m.id),
        children: z(m)
      },
      m.id
    )) })
  ] });
}
const se = (e, s = {}) => e.replace(/:([A-Za-z_]+)/g, (t, a) => s[a] ?? t), as = 5;
let Ae = 0;
const q = () => `f${++Ae}`;
function Te(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function Oe(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^[0-9_]+/, "").replace(/_{2,}/g, "_").slice(0, 64);
}
function te(e, s) {
  const t = new Set(s.map((i) => i.handle)), a = Te(e) || "field";
  let r = a;
  for (let i = 2; t.has(r); i++)
    r = `${a}_${i}`;
  return r;
}
function ze(e) {
  return (e ?? []).map(({ fields: s, ...t }) => ({
    ...t,
    key: q(),
    fields: ze(s),
    handleTouched: !0,
    savedHandle: t.handle
  }));
}
function Ee(e, s) {
  return e.map(({ key: t, handleTouched: a, savedHandle: r, fields: i, ...c }) => ({
    ...c,
    validation: (c.validation ?? []).map((o) => o.trim()).filter((o) => o !== ""),
    ...s(c.type) ? { fields: Ee(i, s) } : {}
  }));
}
function ls(e, s, t) {
  return { key: q(), type: e, label: s, handle: te(s, t), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function cs(e) {
  return e.type !== "fieldset" && e.savedHandle !== void 0 && e.savedHandle !== "" && e.handle !== e.savedHandle ? e.savedHandle : null;
}
function Fe(e) {
  return e.map((s) => ({ ...s, savedHandle: s.handle, fields: Fe(s.fields) }));
}
function os(e, s, t) {
  if (e.handleTouched) return { ...e, label: s };
  const a = t.filter((r) => r.key !== e.key);
  return { ...e, label: s, handle: te(s || e.type, a) };
}
function Ie(e, s) {
  const t = `${s}.`, a = {};
  for (const [r, i] of Object.entries(e))
    r.startsWith(t) && (a[r.slice(t.length)] = i);
  return a;
}
function D(e, s) {
  const t = e[s];
  return { ...Ie(e, s), ...t !== void 0 ? { "": t } : {} };
}
function is(e, s) {
  return Object.keys(e).filter((t) => t === s || t.startsWith(`${s}.`));
}
function ms(e, s) {
  return Object.keys(e).some((t) => t === s || t.startsWith(`${s}.`));
}
function us(e, s) {
  return s.filter((t) => t.key !== e.key && t.handle !== "" && t.type !== "fieldset");
}
function ds(e, s, t, a = se) {
  return e.type === "fieldset" ? null : t?.includes(e.handle) ? a('":handle" is used by the content itself; choose another handle.', { handle: e.handle }) : e.handle !== "" && s.some((r) => r.key !== e.key && r.type !== "fieldset" && r.handle === e.handle) ? a('There is already a field ":handle" here.', { handle: e.handle }) : null;
}
function fs(e, s) {
  return typeof e.translatable == "boolean" ? e.translatable : s;
}
function ps(e, s, t) {
  return { ...e, translatable: s === t ? null : s };
}
function Re(e, s, t = []) {
  const a = /* @__PURE__ */ new Set([...s.map((c) => c.handle), ...t]), r = `${(Oe(e) || "field").slice(0, 56)}_copy`;
  let i = r;
  for (let c = 2; a.has(i); c++)
    i = `${r}_${c}`;
  return i;
}
function ne(e) {
  const { key: s, savedHandle: t, fields: a, ...r } = e;
  return { ...structuredClone(r), key: q(), fields: a.map(ne) };
}
function hs(e, s, t = [], a = se) {
  const r = e[s];
  if (r === void 0) return null;
  const i = r.label || r.handle, c = {
    ...ne(r),
    label: a(":label (copy)", { label: i }),
    handle: r.type === "fieldset" ? r.handle : Re(r.handle, e, t),
    handleTouched: !0
  };
  return { fields: [...e.slice(0, s + 1), c, ...e.slice(s + 1)], copy: c };
}
function qe(e, s) {
  const t = e.condition;
  return !t || "rules" in t ? null : (t.operator === "filled" || t.operator === "equals" && (t.value === !0 || t.value === "true")) && s.some((r) => r.handle === t.field && r.type === "toggle") ? t.field : null;
}
function xs(e) {
  const s = (r) => r.type === "number" || r.type === "text" && (r.instructions ?? "").length <= 60, t = {}, a = [];
  for (const r of e) {
    const i = qe(r, e);
    i === null ? a.push(r) : (t[i] ??= []).push(r);
  }
  return { options: a.filter((r) => !s(r)), limits: a.filter(s), dependents: t };
}
const ys = [
  { value: "equals", label: "is", needsValue: !0 },
  { value: "not_equals", label: "is not", needsValue: !0 },
  { value: "filled", label: "is filled in", needsValue: !1 },
  { value: "empty", label: "is empty", needsValue: !1 }
];
function M(e) {
  return e === !0 ? "true" : e === !1 ? "false" : typeof e == "string" || typeof e == "number" ? String(e) : "";
}
function De(e) {
  return e ? "rules" in e ? Array.isArray(e.rules) ? e.rules : [] : [e] : [];
}
function He(e) {
  return e && "rules" in e && e.match === "any" ? "any" : "all";
}
function gs(e, s) {
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
  const t = De(e.condition);
  return t.length === 0 ? !0 : He(e.condition) === "any" ? t.some((a) => P(a, s)) : t.every((a) => P(a, s));
}
function bs(e) {
  const s = e?.config ?? {};
  switch (e?.type) {
    case "select": {
      const t = (Array.isArray(s.options) ? s.options : []).flatMap((a) => {
        if (typeof a == "string" && a !== "") return [{ value: a, label: a }];
        if (a && typeof a == "object" && typeof a.value == "string" && a.value !== "") {
          const { value: r, label: i } = a;
          return [{ value: r, label: typeof i == "string" && i !== "" ? i : r }];
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
function js(e) {
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
const F = "__none";
function I(e) {
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
const Le = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function re(e) {
  if (e.label) return e.label;
  const s = e.handle.replace(/_/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function U({ field: e, value: s, onChange: t, errors: a, id: r, content: i = !1, fill: c = !1, marker: o = null }) {
  const l = re(e), d = Le.includes(e.type) || ["select", "terms"].includes(e.type) && e.config?.multiple === !0, g = a[""] !== void 0;
  return /* @__PURE__ */ n.jsxs(
    "div",
    {
      className: "cms:flex cms:flex-col cms:gap-2",
      ...d ? { role: "group", "aria-labelledby": `${r}-label`, ...g ? { "aria-invalid": !0, "aria-describedby": `${r}-error` } : {} } : {},
      children: [
        e.type === "toggle" ? /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
          /* @__PURE__ */ n.jsx(u.Switch, { id: r, checked: s === !0, onCheckedChange: (j) => t(j) }),
          /* @__PURE__ */ n.jsx(u.Label, { htmlFor: r, children: l }),
          o
        ] }) : /* @__PURE__ */ n.jsxs(u.Label, { id: `${r}-label`, htmlFor: d ? void 0 : r, children: [
          l,
          e.required && /* @__PURE__ */ n.jsx("span", { className: "cms:text-destructive", children: " *" }),
          o
        ] }),
        /* @__PURE__ */ n.jsx(Me, { field: e, value: s, onChange: t, errors: a, id: r, content: i, fill: c }),
        ["text", "textarea"].includes(e.type) && C(e, "max") !== void 0 && /* @__PURE__ */ n.jsx(Ve, { length: typeof s == "string" ? [...s].length : 0, max: C(e, "max") ?? 0 }),
        e.instructions && /* @__PURE__ */ n.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: e.instructions }),
        /* @__PURE__ */ n.jsx(O, { message: a[""], id: `${r}-error` })
      ]
    }
  );
}
function Ve({ length: e, max: s }) {
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
function Me({ field: e, value: s, onChange: t, errors: a, id: r, content: i, fill: c = !1 }) {
  const o = a[""] !== void 0;
  switch (e.type) {
    case "toggle":
      return null;
    case "file":
      return /* @__PURE__ */ n.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: f("Visitors attach a file here when they send a form.") });
    case "textarea":
      return /* @__PURE__ */ n.jsx(
        u.Textarea,
        {
          id: r,
          "aria-invalid": o,
          value: typeof s == "string" ? s : "",
          rows: C(e, "rows") ?? 4,
          onChange: (l) => t(l.target.value)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ n.jsx(u.RichTextEditor, { id: r, labelledBy: `${r}-label`, invalid: o, value: typeof s == "string" ? s : "", onChange: t });
    case "number": {
      const l = ye(s);
      return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ n.jsx(
          u.Input,
          {
            id: r,
            type: "number",
            className: c ? "cms:w-full" : "cms:max-w-48",
            placeholder: K(e, "placeholder"),
            "aria-invalid": o,
            "aria-describedby": l ? `${r}-grouped` : void 0,
            value: typeof s == "number" ? String(s) : typeof s == "string" ? s : "",
            min: C(e, "min"),
            max: C(e, "max"),
            step: C(e, "step") ?? "any",
            onChange: (d) => t(d.target.value === "" ? null : Number(d.target.value))
          }
        ),
        l && /* @__PURE__ */ n.jsx("span", { id: `${r}-grouped`, className: "cms:text-sm cms:tabular-nums cms:text-muted-foreground", children: l })
      ] });
    }
    case "date": {
      const l = e.config?.time === !0;
      return /* @__PURE__ */ n.jsx(
        u.DatePicker,
        {
          id: r,
          withTime: l,
          invalid: o,
          required: e.required === !0,
          value: L(xe(s, l)),
          onChange: (d) => t(L(d ?? ""))
        }
      );
    }
    case "select":
      return e.config?.multiple === !0 ? /* @__PURE__ */ n.jsx(
        Ue,
        {
          options: I(e),
          value: Array.isArray(s) ? s.map(String) : [],
          onChange: t,
          invalid: o,
          empty: typeof e.config?.empty == "string" ? e.config.empty : void 0,
          inTickOrder: e.config?.in_tick_order === !0
        }
      ) : /* @__PURE__ */ n.jsx(
        Pe,
        {
          options: I(e),
          value: typeof s == "string" ? s : null,
          onChange: t,
          id: r,
          fill: c,
          empty: he(I(e), e.required === !0, typeof e.config?.default == "string" && e.config.default !== "", typeof s == "string" && s !== "")
        }
      );
    case "terms": {
      const l = e.config?.multiple === !0, d = Array.isArray(s) ? s.filter((g) => typeof g == "number") : typeof s == "number" ? s : null;
      return /* @__PURE__ */ n.jsx(
        Ce,
        {
          id: r,
          taxonomy: typeof e.taxonomy == "string" ? e.taxonomy : null,
          multiple: l,
          max: C(e, "max") ?? null,
          required: e.required === !0,
          invalid: o,
          value: l ? Array.isArray(d) ? d : [] : typeof d == "number" ? d : null,
          onChange: t
        }
      );
    }
    case "entries":
      return /* @__PURE__ */ n.jsx(
        G,
        {
          id: r,
          invalid: o,
          multiple: e.config?.multiple === !0,
          max: C(e, "max") ?? null,
          collections: e.collections ?? [],
          onChange: t,
          value: typeof s == "number" || Array.isArray(s) && s.every((l) => typeof l == "number") ? s : null
        }
      );
    case "link":
      return /* @__PURE__ */ n.jsx(Ke, { label: re(e), value: T(s), onChange: t, errors: a, id: r, collections: e.collections ?? [] });
    case "media":
      return /* @__PURE__ */ n.jsx(
        u.MediaPickerInput,
        {
          id: r,
          invalid: o,
          disabled: !1,
          multiple: e.config?.multiple === !0,
          max: C(e, "max") ?? null,
          types: Array.isArray(e.config?.types) ? e.config.types : [],
          value: typeof s == "number" || Array.isArray(s) && s.every((l) => typeof l == "number") ? s : null,
          onChange: t
        }
      );
    case "group":
      return /* @__PURE__ */ n.jsx(H, { fields: e.fields ?? [], value: T(s), onChange: t, errors: a, id: r, content: i });
    case "repeater":
      return /* @__PURE__ */ n.jsx(We, { field: e, value: Array.isArray(s) ? s : [], onChange: t, errors: a, id: r, content: i });
    case "flexible":
      return /* @__PURE__ */ n.jsx(Ge, { field: e, value: Array.isArray(s) ? s : [], onChange: t, errors: a, id: r });
    default:
      return /* @__PURE__ */ n.jsx(
        u.Input,
        {
          id: r,
          "aria-invalid": o,
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
function H({ fields: e, value: s, onChange: t, errors: a, id: r, content: i, bare: c = !1 }) {
  return /* @__PURE__ */ n.jsx("div", { className: c ? "cms:flex cms:flex-col cms:gap-6" : "cms:flex cms:flex-col cms:gap-4 cms:rounded-lg cms:border cms:p-4", children: e.filter((o) => Be(o, s)).map((o) => o.shared ? (
    // Greyed out; the form says once, at the top, where to edit shared fields.
    /* @__PURE__ */ n.jsx("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1 cms:opacity-60", title: f("Shared by all languages: edit it in the main language."), children: /* @__PURE__ */ n.jsx(U, { id: `${r}-${o.handle}`, field: o, value: s[o.handle], content: i, errors: {}, onChange: () => {
    } }) }, o.handle)
  ) : /* @__PURE__ */ n.jsx(
    U,
    {
      id: `${r}-${o.handle}`,
      field: o,
      value: s[o.handle],
      content: i,
      errors: D(a, o.handle),
      onChange: (l) => t({ ...s, [o.handle]: l })
    },
    o.handle
  )) });
}
function Pe({ options: e, value: s, onChange: t, id: a, empty: r, fill: i = !1 }) {
  return /* @__PURE__ */ n.jsxs(u.Select, { value: s ?? F, onValueChange: (c) => t(c === F ? null : c), children: [
    /* @__PURE__ */ n.jsx(u.SelectTrigger, { id: a, className: i ? "cms:w-full" : "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ n.jsx(u.SelectValue, {}) }),
    /* @__PURE__ */ n.jsxs(u.SelectContent, { children: [
      r && /* @__PURE__ */ n.jsx(u.SelectItem, { value: F, children: f("None") }),
      e.map((c) => /* @__PURE__ */ n.jsx(u.SelectItem, { value: c.value, children: c.label }, c.value))
    ] })
  ] });
}
function Ue({ options: e, value: s, onChange: t, empty: a, inTickOrder: r = !1, invalid: i = !1 }) {
  return e.length === 0 ? /* @__PURE__ */ n.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: a ?? f("Nothing to choose from yet.") }) : /* @__PURE__ */ n.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2", children: e.map((c) => /* @__PURE__ */ n.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
    /* @__PURE__ */ n.jsx(
      u.Checkbox,
      {
        checked: s.includes(c.value),
        "aria-invalid": i || void 0,
        onCheckedChange: (o) => t(o ? r ? [...s.filter((l) => l !== c.value), c.value] : e.map((l) => l.value).filter((l) => l === c.value || s.includes(l)) : s.filter((l) => l !== c.value))
      }
    ),
    c.label,
    r && s.includes(c.value) && /* @__PURE__ */ n.jsxs("span", { className: "cms:text-xs cms:text-muted-foreground", "aria-label": `number ${s.indexOf(c.value) + 1}`, children: [
      "#",
      s.indexOf(c.value) + 1
    ] })
  ] }, c.value)) });
}
function Ke({ label: e, value: s, onChange: t, errors: a, id: r, collections: i }) {
  const c = s.type === "entry" ? "entry" : "url", o = (l) => {
    const d = { ...s, type: c, ...l }, g = d.type === "entry" ? typeof d.entry_id != "number" : d.url === "" || d.url === void 0 || d.url === null;
    t(g ? d.label || d.new_tab ? d : null : d);
  };
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ n.jsx("div", { role: "radiogroup", "aria-label": f(":field: link to", { field: e }), className: "cms:inline-flex cms:w-fit cms:rounded-md cms:border cms:p-0.5", children: ["url", "entry"].map((l) => /* @__PURE__ */ n.jsx(
      u.Button,
      {
        type: "button",
        size: "sm",
        role: "radio",
        "aria-checked": c === l,
        variant: c === l ? "secondary" : "ghost",
        onClick: () => o({ type: l, url: l === "url" ? s.url : void 0, entry_id: l === "entry" ? s.entry_id : void 0 }),
        children: l === "url" ? f("Address") : f("Entry")
      },
      l
    )) }),
    /* @__PURE__ */ n.jsxs("div", { className: "cms:grid cms:gap-2 cms:md:grid-cols-[2fr_1fr_auto] cms:md:items-start", children: [
      c === "url" ? /* @__PURE__ */ n.jsx(
        u.Input,
        {
          id: r,
          "aria-label": f(":field: address", { field: e }),
          placeholder: f("https://… or /about"),
          value: typeof s.url == "string" ? s.url : "",
          onChange: (l) => o({ url: l.target.value }),
          "aria-invalid": a.url !== void 0
        }
      ) : /* @__PURE__ */ n.jsx(
        G,
        {
          id: r,
          invalid: a.entry_id !== void 0,
          multiple: !1,
          max: null,
          collections: i,
          value: typeof s.entry_id == "number" ? s.entry_id : null,
          onChange: (l) => o({ entry_id: typeof l == "number" ? l : void 0 })
        }
      ),
      /* @__PURE__ */ n.jsx(
        u.Input,
        {
          "aria-label": f(":field: link text", { field: e }),
          placeholder: c === "entry" ? f("Link text (the entry's title)") : f("Link text"),
          value: typeof s.label == "string" ? s.label : "",
          onChange: (l) => o({ label: l.target.value })
        }
      ),
      /* @__PURE__ */ n.jsxs("label", { className: "cms:flex cms:h-9 cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ n.jsx(u.Checkbox, { checked: s.new_tab === !0, onCheckedChange: (l) => o({ new_tab: l }) }),
        f("New tab")
      ] }),
      /* @__PURE__ */ n.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ n.jsx(O, { message: a.url ?? a.entry_id ?? a.label ?? a.type }) })
    ] })
  ] });
}
function W(e, s) {
  return !s && (e.fields ?? []).every((t) => t.type === "text");
}
function ae(e) {
  const s = $.useRef([]);
  return s.current = je(s.current, e), {
    keys: s.current,
    remove: (t) => {
      s.current = s.current.filter((a, r) => r !== t);
    },
    move: (t, a) => {
      s.current = u.moveItem(s.current, t, a);
    }
  };
}
function le() {
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
function ce({ keys: e, folding: s }) {
  if (e.length < 2) return null;
  const t = s.anyOpen(e);
  return /* @__PURE__ */ n.jsxs(u.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => s.setAll(e, t), children: [
    t ? /* @__PURE__ */ n.jsx(Se, {}) : /* @__PURE__ */ n.jsx(_e, {}),
    " ",
    t ? f("Collapse all") : f("Expand all")
  ] });
}
function We({ field: e, value: s, onChange: t, errors: a, id: r, content: i = !1 }) {
  const c = e.fields ?? [], o = s.map(T), l = ae(o.length), d = (h, x) => t(o.map((N, w) => w === h ? x : N)), g = (h) => {
    l.remove(h), t(o.filter((x, N) => N !== h));
  }, j = e.label ? e.label.toLowerCase().replace(/s$/, "") : f("row"), p = j.charAt(0).toUpperCase() + j.slice(1), y = o.map((h, x) => ({ row: h, index: x, key: l.keys[x] ?? String(x) })), v = le();
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ n.jsx(
      u.SortableList,
      {
        items: y,
        getId: (h) => h.key,
        getLabel: (h) => `${j} ${h.index + 1}`,
        onReorder: (h, x, N) => {
          l.move(x, N), t(h.map((w) => w.row));
        },
        children: ({ row: h, index: x, key: N }, { handle: w }) => W(e, i) ? /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
          /* @__PURE__ */ n.jsx(u.SortableHandle, { ...w, label: f("Move :item :number", { item: j, number: x + 1 }), className: "cms:mt-1" }),
          c.map((b) => /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
            /* @__PURE__ */ n.jsx(
              u.Input,
              {
                "aria-label": b.label || b.handle,
                placeholder: b.label || b.handle,
                value: typeof h[b.handle] == "string" ? h[b.handle] : "",
                onChange: (_) => d(x, { ...h, [b.handle]: _.target.value })
              }
            ),
            /* @__PURE__ */ n.jsx(O, { message: a[`${x}.${b.handle}`] })
          ] }, b.handle)),
          /* @__PURE__ */ n.jsx(u.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": f("Remove :item :number", { item: j, number: x + 1 }), onClick: () => g(x), children: /* @__PURE__ */ n.jsx(Z, {}) })
        ] }) : (() => {
          const b = D(a, String(x)), _ = v.isCollapsed(N, Object.keys(b).length > 0);
          return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ n.jsx(
              oe,
              {
                label: `${p} ${x + 1}`,
                summary: X(c, h),
                handle: w,
                onRemove: () => g(x),
                collapsed: _,
                onToggle: () => v.toggle(N),
                controls: `${r}-${x}-fields`,
                hidden: i ? h._hidden === !0 : void 0,
                onHidden: (A) => d(x, { ...h, _hidden: A })
              }
            ),
            /* @__PURE__ */ n.jsx("div", { id: `${r}-${x}-fields`, hidden: _, children: !_ && /* @__PURE__ */ n.jsx(H, { fields: c, value: h, onChange: (A) => d(x, A), errors: b, id: `${r}-${x}`, content: i }) })
          ] });
        })()
      }
    ),
    /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ n.jsxs(u.Button, { type: "button", variant: "outline", size: "sm", onClick: () => t([...o, i ? be() : {}]), children: [
        /* @__PURE__ */ n.jsx(Q, {}),
        " ",
        f("Add :item", { item: j })
      ] }),
      !W(e, i) && /* @__PURE__ */ n.jsx(ce, { keys: y.map((h) => h.key), folding: v })
    ] })
  ] });
}
function Ge({ field: e, value: s, onChange: t, errors: a, id: r }) {
  const i = e.blocks ?? [], c = s.map(T), o = ae(c.length), l = (p, y) => t(c.map((v, h) => h === p ? y : v)), d = (p) => {
    o.remove(p), t(c.filter((y, v) => v !== p));
  }, g = c.map((p, y) => ({ block: p, index: y, key: o.keys[y] ?? String(y) })), j = le();
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    /* @__PURE__ */ n.jsx(
      u.SortableList,
      {
        items: g,
        getId: (p) => p.key,
        className: "cms:gap-3",
        getLabel: (p) => f(":type block", { type: i.find((y) => y.type === p.block.type)?.label ?? String(p.block.type) }),
        onReorder: (p, y, v) => {
          o.move(y, v), t(p.map((h) => h.block));
        },
        children: ({ block: p, index: y, key: v }, { handle: h }) => {
          const x = i.find((b) => b.type === p.type), N = D(a, `${y}.values`), w = j.isCollapsed(v, Object.keys(N).length > 0 || a[`${y}.type`] !== void 0);
          return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ n.jsx(
              oe,
              {
                label: x?.label ?? String(p.type),
                summary: x ? X(x.fields, T(p.values)) : null,
                badge: !0,
                handle: h,
                onRemove: () => d(y),
                collapsed: w,
                onToggle: () => j.toggle(v),
                controls: `${r}-${y}-fields`,
                hidden: p.hidden === !0,
                onHidden: (b) => l(y, { ...p, hidden: b })
              }
            ),
            /* @__PURE__ */ n.jsx("div", { id: `${r}-${y}-fields`, hidden: w, children: w ? null : x ? /* @__PURE__ */ n.jsx(
              H,
              {
                fields: x.fields,
                value: T(p.values),
                onChange: (b) => l(y, { ...p, values: b }),
                errors: N,
                id: `${r}-${y}`,
                content: !0
              }
            ) : /* @__PURE__ */ n.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: f("This kind of block no longer exists. Its values are kept.") }) }),
            /* @__PURE__ */ n.jsx(O, { message: a[`${y}.type`] })
          ] });
        }
      }
    ),
    /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ n.jsxs(u.DropdownMenu, { children: [
        /* @__PURE__ */ n.jsx(u.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ n.jsxs(u.Button, { type: "button", variant: "outline", size: "sm", disabled: i.length === 0, children: [
          /* @__PURE__ */ n.jsx(Q, {}),
          " ",
          f("Add block")
        ] }) }),
        /* @__PURE__ */ n.jsx(u.DropdownMenuContent, { align: "start", children: i.map((p) => /* @__PURE__ */ n.jsx(u.DropdownMenuItem, { onSelect: () => t([...c, ge(p.type)]), children: p.label }, p.type)) })
      ] }),
      /* @__PURE__ */ n.jsx(ce, { keys: g.map((p) => p.key), folding: j })
    ] })
  ] });
}
function oe({ label: e, summary: s, badge: t = !1, handle: a, onRemove: r, collapsed: i, onToggle: c, controls: o, hidden: l, onHidden: d }) {
  const g = i ? Ne : we, j = s ? `${e}: ${s}` : e;
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ n.jsx(u.SortableHandle, { ...a, label: f("Move :title", { title: j }) }),
    /* @__PURE__ */ n.jsxs(
      "button",
      {
        type: "button",
        onClick: c,
        "aria-expanded": !i,
        "aria-controls": o,
        className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:rounded-md cms:text-left cms:outline-none cms:focus-visible:ring-2 cms:focus-visible:ring-ring",
        children: [
          /* @__PURE__ */ n.jsx(g, { className: "cms:size-4 cms:shrink-0 cms:text-muted-foreground", "aria-hidden": !0 }),
          t ? /* @__PURE__ */ n.jsx(u.Badge, { variant: "secondary", children: e }) : /* @__PURE__ */ n.jsx("span", { className: "cms:shrink-0 cms:text-sm cms:font-medium", children: e }),
          s && /* @__PURE__ */ n.jsx("span", { className: "cms:truncate cms:text-sm cms:text-muted-foreground", children: s }),
          /* @__PURE__ */ n.jsx("span", { className: "cms:sr-only", children: i ? f("(collapsed)") : "" })
        ]
      }
    ),
    l !== void 0 && /* @__PURE__ */ n.jsxs("label", { className: "cms:flex cms:shrink-0 cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", title: f("Off: kept here, but left out of the page"), children: [
      /* @__PURE__ */ n.jsx(u.Switch, { checked: !l, onCheckedChange: (p) => d(!p), "aria-label": f(":title: visible on site", { title: j }) }),
      f("Visible on site")
    ] }),
    /* @__PURE__ */ n.jsx(
      u.Button,
      {
        type: "button",
        variant: "ghost",
        size: "icon",
        className: "cms:size-8 cms:shrink-0 cms:text-destructive",
        "aria-label": f("Remove :title", { title: j }),
        onClick: r,
        children: /* @__PURE__ */ n.jsx(Z, {})
      }
    )
  ] });
}
export {
  _e as A,
  re as B,
  we as C,
  U as F,
  as as M,
  ys as O,
  Ce as T,
  ds as a,
  D as b,
  Oe as c,
  hs as d,
  Ie as e,
  cs as f,
  ps as g,
  ms as h,
  fs as i,
  us as j,
  De as k,
  He as l,
  bs as m,
  ls as n,
  js as o,
  gs as p,
  ze as q,
  os as r,
  xs as s,
  Te as t,
  Ee as u,
  Fe as v,
  $e as w,
  H as x,
  is as y,
  Be as z
};
