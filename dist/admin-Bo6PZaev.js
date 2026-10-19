function ze(s, t) {
  for (var n = 0; n < t.length; n++) {
    const c = t[n];
    if (typeof c != "string" && !Array.isArray(c)) {
      for (const r in c)
        if (r !== "default" && !(r in s)) {
          const l = Object.getOwnPropertyDescriptor(c, r);
          l && Object.defineProperty(s, r, l.get ? l : {
            enumerable: !0,
            get: () => c[r]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(s, Symbol.toStringTag, { value: "Module" }));
}
const X = 1;
function ee() {
  const s = globalThis.Sunrice;
  if (!s)
    throw new Error("[sunrice] This script runs outside the Sunrice admin panel (window.Sunrice is missing).");
  return s;
}
function Le(s) {
  const t = ee();
  if (t.version !== X)
    throw new Error(`[sunrice] This plugin was built for admin runtime ${X}, but the panel runs ${t.version}. Rebuild it with a matching @sunrice/admin-sdk.`);
  for (const [n, c] of Object.entries(s.pages ?? {}))
    t.registerPage(n, c);
}
function S(s = "") {
  return ee().adminUrl(s);
}
const se = globalThis.Sunrice;
if (!se) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const e = se.modules["react/jsx-runtime"], te = globalThis.Sunrice;
if (!te) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const w = te.modules.react, ys = /* @__PURE__ */ ze({
  __proto__: null
}, [w]), ae = globalThis.Sunrice;
if (!ae) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const j = ae.modules["@inertiajs/react"];
const Ae = (s) => s?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
function Ie(s, t, n = []) {
  if (t == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: Ae(s),
    size: 24,
    node: t,
    ...n.length > 0 ? { aliases: n } : {}
  };
}
const Me = (s) => {
  let t = "", n = !1;
  for (const c of s) {
    if (c === "-" || c === "_" || c <= " ") {
      n = t.length > 0;
      continue;
    }
    t.length === 0 ? t += c.toLowerCase() : t += n ? c.toUpperCase() : c, n = !1;
  }
  return t;
};
const Fe = (s) => {
  const t = Me(s);
  return t.charAt(0).toUpperCase() + t.slice(1);
};
const q = (...s) => s.filter((t, n, c) => !!t && t.trim() !== "" && c.indexOf(t) === n).join(" ").trim();
const _ = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
function W(s) {
  return s != null;
}
function Re(s, t = {}) {
  const n = t.attributeNames ?? {}, c = (u) => n[u] ?? u, r = s.size ?? s.width ?? _.width, l = s.size ?? s.height ?? _.height, o = s.aliases?.filter((u) => typeof u == "string" && u.trim() !== "").map((u) => `lucide-${u}`) ?? [], d = [...s.name ? [`lucide-${s.name}`] : [], ...o], h = t.className?.split(" ").filter(Boolean) ?? [], i = t.includeDefaultClasses === !1 ? q(...h) : q("lucide", ...d, ...h), p = t.absoluteStrokeWidth ? Number(t.strokeWidth ?? _["stroke-width"]) * Number(s.size ?? s.width ?? _.width) / Number(t.size ?? t.width ?? _.width) : t.strokeWidth ?? _["stroke-width"];
  return [
    "svg",
    {
      ...Object.entries(_).reduce((u, [x, b]) => (u[c(x)] = b, u), {}),
      ..."color" in t && t.color && {
        [c("stroke")]: t.color
      },
      ..."size" in t && W(t.size) && {
        [c("width")]: t.size,
        [c("height")]: t.size
      },
      ..."width" in t && W(t.width) && {
        [c("width")]: t.width
      },
      ..."height" in t && W(t.height) && {
        [c("height")]: t.height
      },
      [c("stroke-width")]: p,
      ...i && {
        [c("class")]: i
      },
      [c("viewBox")]: `0 0 ${r} ${l}`,
      ...t.hasA11yProp === !1 ? {
        [c("aria-hidden")]: "true"
      } : {},
      ..."attributes" in t && t.attributes
    },
    s.node.map((u) => {
      const [x, b, N] = u, f = t.nonScalingStroke ? { [c("vector-effect")]: "non-scaling-stroke", ...b } : b;
      return N ? [x, f, N] : [x, f];
    })
  ];
}
function Ee(s, t = {}) {
  return Re(s, {
    ...t,
    attributeNames: {
      ...t.attributeNames,
      class: "className",
      "stroke-width": "strokeWidth",
      "stroke-linecap": "strokeLinecap",
      "stroke-linejoin": "strokeLinejoin",
      "vector-effect": "vectorEffect"
    }
  });
}
const He = (s) => {
  for (const t in s)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
  return !1;
}, Pe = w.createContext({}), Oe = () => w.useContext(Pe), Ue = w.forwardRef(
  ({
    color: s,
    size: t,
    width: n,
    height: c,
    strokeWidth: r,
    absoluteStrokeWidth: l,
    nonScalingStroke: o,
    className: d = "",
    children: h,
    iconNode: i = [],
    icon: p = {
      node: i,
      aliases: [],
      size: 24
    },
    ...m
  }, u) => {
    const {
      size: x = 24,
      strokeWidth: b = 2,
      absoluteStrokeWidth: N = !1,
      nonScalingStroke: f = !1,
      color: $ = "currentColor",
      className: C = ""
    } = Oe() ?? {}, v = !!h || He(m), [M, F, R = []] = Ee(p, {
      color: s ?? $,
      width: n ?? t ?? x,
      height: c ?? t ?? x,
      strokeWidth: r ?? b,
      absoluteStrokeWidth: l ?? N,
      nonScalingStroke: o ?? f,
      className: q(C, d),
      hasA11yProp: v,
      attributes: m
    });
    return w.createElement(
      M,
      {
        ref: u,
        ...F
      },
      [
        ...R.map(([E, g]) => w.createElement(E, g)),
        ...Array.isArray(h) ? h : [h]
      ]
    );
  }
);
function k(s, t = [], n = []) {
  const c = typeof s == "string" ? Ie(s, t, n) : s, r = w.forwardRef(
    ({ className: l, ...o }, d) => w.createElement(Ue, {
      ref: d,
      icon: c,
      className: l,
      ...o
    })
  );
  return c.name && (r.displayName = Fe(c.name)), r;
}
const ne = {
  name: "arrow-down",
  size: 24,
  node: [
    ["path", { d: "M12 5v14", key: "s699le" }],
    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
  ]
};
ne.node;
const le = k(ne);
const ce = {
  name: "arrow-left",
  size: 24,
  node: [
    ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
    ["path", { d: "M19 12H5", key: "x3x0zl" }]
  ]
};
ce.node;
const re = k(ce);
const ie = {
  name: "arrow-up",
  size: 24,
  node: [
    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
    ["path", { d: "M12 19V5", key: "x0mq9r" }]
  ]
};
ie.node;
const oe = k(ie);
const de = {
  name: "calendar-clock",
  size: 24,
  node: [
    ["path", { d: "M16 14v2.2l1.6 1", key: "fo4ql5" }],
    ["path", { d: "M16 2v3", key: "otl347" }],
    ["path", { d: "M21 7.338V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2.338", key: "7hb8p4" }],
    ["path", { d: "M3 9h5.859", key: "numkqi" }],
    ["path", { d: "M8 2v3", key: "1ioesn" }],
    ["circle", { cx: "16", cy: "16", r: "6", key: "qoo3c4" }]
  ]
};
de.node;
const We = k(de);
const me = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
me.node;
const ue = k(me);
const he = {
  name: "chevron-left",
  size: 24,
  node: [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]]
};
he.node;
const Ve = k(he);
const xe = {
  name: "chevron-right",
  size: 24,
  node: [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]
};
xe.node;
const pe = k(xe);
const ge = {
  name: "loader-circle",
  size: 24,
  node: [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  aliases: ["loader-2"]
};
ge.node;
const fe = k(ge);
const je = {
  name: "plus",
  size: 24,
  node: [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ]
};
je.node;
const B = k(je);
const be = {
  name: "rotate-ccw",
  size: 24,
  node: [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ]
};
be.node;
const qe = k(be);
const ve = {
  name: "search",
  size: 24,
  node: [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ]
};
ve.node;
const Ke = k(ve);
const Ne = {
  name: "trash",
  size: 24,
  node: [
    ["path", { d: "M10 11v6", key: "nco0om" }],
    ["path", { d: "M14 11v6", key: "outv1u" }],
    ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
    ["path", { d: "M3 6h18", key: "d0wm0j" }],
    ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
  ],
  aliases: ["trash-2"]
};
Ne.node;
const z = k(Ne), we = globalThis.Sunrice;
if (!we) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const a = we.modules["@sunrice/admin-sdk/ui"];
function G() {
  const [s, t] = w.useState(null), n = /* @__PURE__ */ e.jsx(a.Dialog, { open: s !== null, onOpenChange: (c) => !c && t(null), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: "Are you sure?" }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: s?.message })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: () => t(null), children: "Cancel" }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "destructive", onClick: () => {
        s?.onConfirm(), t(null);
      }, children: "Delete" })
    ] })
  ] }) });
  return [(c, r) => t({ message: c, onConfirm: r }), n];
}
const Ze = 5;
let Ge = 0;
const ye = () => `f${++Ge}`;
function Ce(s) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function ke(s, t) {
  const n = new Set(t.map((l) => l.handle)), c = Ce(s) || "field";
  let r = c;
  for (let l = 2; n.has(r); l++)
    r = `${c}_${l}`;
  return r;
}
function Se(s) {
  return (s ?? []).map(({ fields: t, ...n }) => ({
    ...n,
    key: ye(),
    fields: Se(t),
    handleTouched: !0
  }));
}
function $e(s, t) {
  return s.map(({ key: n, handleTouched: c, fields: r, ...l }) => ({
    ...l,
    validation: (l.validation ?? []).map((o) => o.trim()).filter((o) => o !== ""),
    ...t(l.type) ? { fields: $e(r, t) } : {}
  }));
}
function Ye(s, t, n) {
  return { key: ye(), type: s, label: t, handle: ke(t, n), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function H(s, t, n) {
  const c = t + n;
  if (t < 0 || t >= s.length || c < 0 || c >= s.length) return s;
  const r = s.slice(), [l] = r.splice(t, 1);
  return r.splice(c, 0, l), r;
}
function Xe(s, t, n) {
  if (s.handleTouched) return { ...s, label: t };
  const c = n.filter((r) => r.key !== s.key);
  return { ...s, label: t, handle: ke(t || s.type, c) };
}
function O(s, t) {
  const n = `${t}.`, c = {};
  for (const [r, l] of Object.entries(s))
    r.startsWith(n) && (c[r.slice(n.length)] = l);
  return c;
}
function I(s, t) {
  const n = s[t];
  return { ...O(s, t), ...n !== void 0 ? { "": n } : {} };
}
function J(s, t) {
  return Object.keys(s).some((n) => n === t || n.startsWith(`${t}.`));
}
function L(s) {
  return s && typeof s == "object" && !Array.isArray(s) ? s : {};
}
function Je(s, t) {
  if (typeof s != "string" || s === "") return "";
  const n = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(s);
  return n ? t ? `${n[1]}T${n[2] ?? "00:00"}` : n[1] ?? "" : "";
}
function Qe(s) {
  return s === "" ? null : s;
}
function es() {
  return { _hidden: !1 };
}
function ss(s) {
  return { type: s, hidden: !1, values: {} };
}
function Cs(s) {
  const t = s.replace(/[\u0000- \u007f]+/g, ""), n = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(t);
  return n ? ["http", "https", "mailto", "tel"].includes(n[1].toLowerCase()) : !t.includes("\\");
}
const ts = w.lazy(() => import("./RichTextEditor-qK-IiVF0.js").then((s) => ({ default: s.RichTextEditor }))), V = "__none";
function y({ message: s }) {
  return s ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: s }) : null;
}
function Q(s) {
  const t = s.config?.options;
  return Array.isArray(t) ? t.flatMap((n) => {
    if (typeof n == "string") return [{ value: n, label: n }];
    if (n && typeof n == "object" && typeof n.value == "string") {
      const { value: c, label: r } = n;
      return [{ value: c, label: r || c }];
    }
    return [];
  }) : [];
}
const as = ["repeater", "group", "flexible", "link", "media", "rich_text"];
function ns(s) {
  if (s.label) return s.label;
  const t = s.handle.replace(/_/g, " ");
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function P({ field: s, value: t, onChange: n, errors: c, id: r, content: l = !1 }) {
  const o = ns(s), d = as.includes(s.type) || s.type === "select" && s.config?.multiple === !0;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", ...d ? { role: "group", "aria-labelledby": `${r}-label` } : {}, children: [
    s.type === "toggle" ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(a.Switch, { id: r, checked: t === !0, onCheckedChange: (h) => n(h) }),
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: r, children: o })
    ] }) : /* @__PURE__ */ e.jsxs(a.Label, { id: `${r}-label`, htmlFor: d ? void 0 : r, children: [
      o,
      s.required && /* @__PURE__ */ e.jsx("span", { className: "cms:text-destructive", children: " *" })
    ] }),
    /* @__PURE__ */ e.jsx(ls, { field: s, value: t, onChange: n, errors: c, id: r, content: l }),
    s.instructions && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s.instructions }),
    /* @__PURE__ */ e.jsx(y, { message: c[""] })
  ] });
}
function ls({ field: s, value: t, onChange: n, errors: c, id: r, content: l }) {
  const o = c[""] !== void 0;
  switch (s.type) {
    case "toggle":
      return null;
    case "textarea":
      return /* @__PURE__ */ e.jsx(
        a.Textarea,
        {
          id: r,
          "aria-invalid": o,
          value: typeof t == "string" ? t : "",
          rows: D(s, "rows") ?? 4,
          onChange: (d) => n(d.target.value)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ e.jsx(w.Suspense, { fallback: /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-48 cms:w-full" }), children: /* @__PURE__ */ e.jsx(ts, { id: r, labelledBy: `${r}-label`, invalid: o, value: typeof t == "string" ? t : "", onChange: n }) });
    case "number":
      return /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: r,
          type: "number",
          className: "cms:max-w-48",
          "aria-invalid": o,
          value: typeof t == "number" ? String(t) : typeof t == "string" ? t : "",
          min: D(s, "min"),
          max: D(s, "max"),
          step: D(s, "step") ?? "any",
          onChange: (d) => n(d.target.value === "" ? null : Number(d.target.value))
        }
      );
    case "date": {
      const d = s.config?.time === !0;
      return /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: r,
          type: d ? "datetime-local" : "date",
          className: "cms:max-w-64",
          "aria-invalid": o,
          value: Je(t, d),
          onChange: (h) => n(Qe(h.target.value))
        }
      );
    }
    case "select":
      return s.config?.multiple === !0 ? /* @__PURE__ */ e.jsx(is, { options: Q(s), value: Array.isArray(t) ? t.map(String) : [], onChange: n }) : /* @__PURE__ */ e.jsx(rs, { options: Q(s), value: typeof t == "string" ? t : null, onChange: n, id: r, required: s.required === !0 });
    case "link":
      return /* @__PURE__ */ e.jsx(os, { value: L(t), onChange: n, errors: c, id: r });
    case "media":
      return /* @__PURE__ */ e.jsx(
        a.MediaPickerInput,
        {
          id: r,
          invalid: o,
          disabled: !1,
          multiple: s.config?.multiple === !0,
          max: D(s, "max") ?? null,
          types: Array.isArray(s.config?.types) ? s.config.types : [],
          value: typeof t == "number" || Array.isArray(t) && t.every((d) => typeof d == "number") ? t : null,
          onChange: n
        }
      );
    case "group":
      return /* @__PURE__ */ e.jsx(Y, { fields: s.fields ?? [], value: L(t), onChange: n, errors: c, id: r, content: l });
    case "repeater":
      return /* @__PURE__ */ e.jsx(ms, { field: s, value: Array.isArray(t) ? t : [], onChange: n, errors: c, id: r, content: l });
    case "flexible":
      return /* @__PURE__ */ e.jsx(us, { field: s, value: Array.isArray(t) ? t : [], onChange: n, errors: c, id: r });
    default:
      return /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: r,
          "aria-invalid": o,
          value: typeof t == "string" ? t : "",
          placeholder: cs(s, "placeholder"),
          maxLength: D(s, "max"),
          onChange: (d) => n(d.target.value)
        }
      );
  }
}
function D(s, t) {
  const n = s.config?.[t];
  return typeof n == "number" ? n : void 0;
}
function cs(s, t) {
  const n = s.config?.[t];
  return typeof n == "string" ? n : void 0;
}
function Y({ fields: s, value: t, onChange: n, errors: c, id: r, content: l }) {
  return /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-4 cms:rounded-lg cms:border cms:p-4", children: s.map((o) => /* @__PURE__ */ e.jsx(
    P,
    {
      id: `${r}-${o.handle}`,
      field: o,
      value: t[o.handle],
      content: l,
      errors: I(c, o.handle),
      onChange: (d) => n({ ...t, [o.handle]: d })
    },
    o.handle
  )) });
}
function rs({ options: s, value: t, onChange: n, id: c, required: r }) {
  return /* @__PURE__ */ e.jsxs(a.Select, { value: t ?? V, onValueChange: (l) => n(l === V ? null : l), children: [
    /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: c, className: "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
    /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
      !r && /* @__PURE__ */ e.jsx(a.SelectItem, { value: V, children: "None" }),
      s.map((l) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: l.value, children: l.label }, l.value))
    ] })
  ] });
}
function is({ options: s, value: t, onChange: n }) {
  return s.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Nothing to choose from yet." }) : /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2", children: s.map((c) => /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
    /* @__PURE__ */ e.jsx(
      a.Checkbox,
      {
        checked: t.includes(c.value),
        onCheckedChange: (r) => n(r ? s.map((l) => l.value).filter((l) => l === c.value || t.includes(l)) : t.filter((l) => l !== c.value))
      }
    ),
    c.label
  ] }, c.value)) });
}
function os({ value: s, onChange: t, errors: n, id: c }) {
  const r = (l, o) => {
    const d = { ...s, [l]: o };
    t(d.url === "" || d.url === void 0 ? null : d);
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-2 cms:md:grid-cols-[2fr_1fr_auto] cms:md:items-center", children: [
    /* @__PURE__ */ e.jsx(
      a.Input,
      {
        id: c,
        "aria-label": "Address",
        placeholder: "https://… or /about",
        value: typeof s.url == "string" ? s.url : "",
        onChange: (l) => r("url", l.target.value),
        "aria-invalid": n.url !== void 0
      }
    ),
    /* @__PURE__ */ e.jsx(
      a.Input,
      {
        "aria-label": "Link text",
        placeholder: "Link text",
        value: typeof s.label == "string" ? s.label : "",
        onChange: (l) => r("label", l.target.value)
      }
    ),
    /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
      /* @__PURE__ */ e.jsx(a.Checkbox, { checked: s.new_tab === !0, onCheckedChange: (l) => r("new_tab", l) }),
      "New tab"
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ e.jsx(y, { message: n.url ?? n.label }) })
  ] });
}
function ds(s, t) {
  return !t && (s.fields ?? []).every((n) => n.type === "text");
}
function ms({ field: s, value: t, onChange: n, errors: c, id: r, content: l = !1 }) {
  const o = s.fields ?? [], d = t.map(L), h = (m, u) => n(d.map((x, b) => b === m ? u : x)), i = (s.label || "row").toLowerCase().replace(/s$/, ""), p = i.charAt(0).toUpperCase() + i.slice(1);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    d.map((m, u) => ds(s, l) ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
      o.map((x) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            "aria-label": x.label || x.handle,
            placeholder: x.label || x.handle,
            value: typeof m[x.handle] == "string" ? m[x.handle] : "",
            onChange: (b) => h(u, { ...m, [x.handle]: b.target.value })
          }
        ),
        /* @__PURE__ */ e.jsx(y, { message: c[`${u}.${x.handle}`] })
      ] }, x.handle)),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": `Remove ${i} ${u + 1}`, onClick: () => n(d.filter((x, b) => b !== u)), children: /* @__PURE__ */ e.jsx(z, {}) })
    ] }, u) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(
        Te,
        {
          label: `${p} ${u + 1}`,
          index: u,
          count: d.length,
          onMove: (x) => n(H(d, u, x)),
          onRemove: () => n(d.filter((x, b) => b !== u)),
          hidden: l ? m._hidden === !0 : void 0,
          onHidden: (x) => h(u, { ...m, _hidden: x })
        }
      ),
      /* @__PURE__ */ e.jsx(Y, { fields: o, value: m, onChange: (x) => h(u, x), errors: I(c, String(u)), id: `${r}-${u}`, content: l })
    ] }, typeof m._id == "string" ? m._id : u)),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => n([...d, l ? es() : {}]), children: [
      /* @__PURE__ */ e.jsx(B, {}),
      " Add ",
      i
    ] }) })
  ] });
}
function us({ field: s, value: t, onChange: n, errors: c, id: r }) {
  const l = s.blocks ?? [], o = t.map(L), d = (h, i) => n(o.map((p, m) => m === h ? i : p));
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    o.map((h, i) => {
      const p = l.find((m) => m.type === h.type);
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(
          Te,
          {
            label: p?.label ?? String(h.type),
            badge: !0,
            index: i,
            count: o.length,
            onMove: (m) => n(H(o, i, m)),
            onRemove: () => n(o.filter((m, u) => u !== i)),
            hidden: h.hidden === !0,
            onHidden: (m) => d(i, { ...h, hidden: m })
          }
        ),
        p ? /* @__PURE__ */ e.jsx(
          Y,
          {
            fields: p.fields,
            value: L(h.values),
            onChange: (m) => d(i, { ...h, values: m }),
            errors: I(c, `${i}.values`),
            id: `${r}-${i}`,
            content: !0
          }
        ) : /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: "This kind of block no longer exists. Its values are kept." }),
        /* @__PURE__ */ e.jsx(y, { message: c[`${i}.type`] })
      ] }, typeof h.id == "string" ? h.id : i);
    }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", disabled: l.length === 0, children: [
        /* @__PURE__ */ e.jsx(B, {}),
        " Add block"
      ] }) }),
      /* @__PURE__ */ e.jsx(a.DropdownMenuContent, { align: "start", children: l.map((h) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => n([...o, ss(h.type)]), children: h.label }, h.type)) })
    ] }) })
  ] });
}
function Te({ label: s, badge: t = !1, index: n, count: c, onMove: r, onRemove: l, hidden: o, onHidden: d }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    t ? /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: s }) : /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:font-medium", children: s }),
    o !== void 0 && /* @__PURE__ */ e.jsxs("label", { className: "cms:ml-auto cms:flex cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", children: [
      /* @__PURE__ */ e.jsx(a.Switch, { checked: !o, onCheckedChange: (h) => d(!h), "aria-label": `Show ${s}` }),
      "Show"
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: o === void 0 ? "cms:ml-auto cms:flex" : "cms:flex", children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Move ${s} up`, disabled: n === 0, onClick: () => r(-1), children: /* @__PURE__ */ e.jsx(oe, {}) }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Move ${s} down`, disabled: n === c - 1, onClick: () => r(1), children: /* @__PURE__ */ e.jsx(le, {}) }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": `Remove ${s}`, onClick: l, children: /* @__PURE__ */ e.jsx(z, {}) })
    ] })
  ] });
}
function _e({ fields: s, onChange: t, types: n, errors: c, depth: r = 1, idPrefix: l = "field" }) {
  const [o, d] = w.useState(() => /* @__PURE__ */ new Set()), h = (m) => d((u) => {
    const x = new Set(u);
    return x.has(m) ? x.delete(m) : x.add(m), x;
  }), i = (m, u) => t(s.map((x, b) => b === m ? u : x)), p = (m) => {
    const u = Ye(m.type, m.label, s);
    t([...s, u]), d((x) => new Set(x).add(u.key));
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:border-dashed cms:p-4 cms:text-sm cms:text-muted-foreground", children: "No fields yet." }),
    s.map((m, u) => {
      const x = n.find((f) => f.type === m.type), b = o.has(m.key) || J(c, String(u)), N = `${l}-${m.key}`;
      return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${J(c, String(u)) ? "cms:border-destructive" : ""}`, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:p-2", children: [
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-expanded": b,
              "aria-controls": N,
              "aria-label": `${b ? "Close" : "Open"} ${m.label || m.handle}`,
              onClick: () => h(m.key),
              children: b ? /* @__PURE__ */ e.jsx(ue, {}) : /* @__PURE__ */ e.jsx(pe, {})
            }
          ),
          /* @__PURE__ */ e.jsxs("button", { type: "button", className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:text-left", onClick: () => h(m.key), children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: m.label || m.handle }),
            /* @__PURE__ */ e.jsx("code", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", children: m.handle })
          ] }),
          m.required && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", children: "Required" }),
          /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: x?.label ?? m.type }),
          /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move up", disabled: u === 0, onClick: () => t(H(s, u, -1)), children: /* @__PURE__ */ e.jsx(oe, {}) }),
          /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move down", disabled: u === s.length - 1, onClick: () => t(H(s, u, 1)), children: /* @__PURE__ */ e.jsx(le, {}) }),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Remove ${m.label || m.handle}`,
              onClick: () => t(s.filter((f, $) => $ !== u)),
              children: /* @__PURE__ */ e.jsx(z, {})
            }
          )
        ] }),
        b && /* @__PURE__ */ e.jsx(
          hs,
          {
            id: N,
            field: m,
            type: x,
            siblings: s,
            onChange: (f) => i(u, f),
            types: n,
            errors: O(c, String(u)),
            depth: r
          }
        )
      ] }, m.key);
    }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", children: [
        /* @__PURE__ */ e.jsx(B, {}),
        " Add field"
      ] }) }),
      /* @__PURE__ */ e.jsx(a.DropdownMenuContent, { align: "start", children: n.filter((m) => !m.hasChildren || r < Ze).map((m) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => p(m), children: m.label }, m.type)) })
    ] }) })
  ] });
}
const T = { default: "__default", yes: "yes", no: "no" };
function hs({ id: s, field: t, type: n, siblings: c, onChange: r, types: l, errors: o, depth: d }) {
  const h = t.config ?? {};
  return /* @__PURE__ */ e.jsxs("div", { id: s, className: "cms:flex cms:flex-col cms:gap-4 cms:border-t cms:p-4", children: [
    !n && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-destructive", children: [
      'The field type "',
      t.type,
      `" isn't registered. Its data is kept; register the type or remove the field.`
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-label`, children: "Label" }),
        /* @__PURE__ */ e.jsx(a.Input, { id: `${s}-label`, value: t.label ?? "", onChange: (i) => r(Xe(t, i.target.value, c)) }),
        /* @__PURE__ */ e.jsx(y, { message: o.label })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-handle`, children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: `${s}-handle`,
            className: "cms:font-mono",
            value: t.handle,
            onChange: (i) => r({ ...t, handle: i.target.value, handleTouched: !0 })
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "How templates read it. Renaming it hides values saved under the old one." }),
        /* @__PURE__ */ e.jsx(y, { message: o.handle })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-instructions`, children: "Instructions" }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: `${s}-instructions`,
          value: t.instructions ?? "",
          placeholder: "Shown under the field to editors",
          onChange: (i) => r({ ...t, instructions: i.target.value || null })
        }
      ),
      /* @__PURE__ */ e.jsx(y, { message: o.instructions })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-6", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Switch, { id: `${s}-required`, checked: t.required === !0, onCheckedChange: (i) => r({ ...t, required: i }) }),
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-required`, children: "Required" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-translatable`, children: "Per language" }),
        /* @__PURE__ */ e.jsxs(
          a.Select,
          {
            value: t.translatable === !0 ? T.yes : t.translatable === !1 ? T.no : T.default,
            onValueChange: (i) => r({ ...t, translatable: i === T.yes ? !0 : i === T.no ? !1 : null }),
            children: [
              /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: `${s}-translatable`, className: "cms:w-48", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
              /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: T.default, children: "As the type decides" }),
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: T.yes, children: "Yes, translated" }),
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: T.no, children: "No, shared" })
              ] })
            ]
          }
        )
      ] })
    ] }),
    (n?.settings.length ?? 0) > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: n?.settings.map((i) => /* @__PURE__ */ e.jsx(
      P,
      {
        id: `${s}-config-${i.handle}`,
        field: i,
        value: h[i.handle],
        errors: I(o, `config.${i.handle}`),
        onChange: (p) => r({ ...t, config: { ...h, [i.handle]: p } })
      },
      i.handle
    )) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-validation`, children: "Extra rules" }),
      /* @__PURE__ */ e.jsx(
        a.Textarea,
        {
          id: `${s}-validation`,
          rows: 2,
          className: "cms:font-mono",
          placeholder: `min:3
regex:/^[A-Z]/`,
          value: (t.validation ?? []).join(`
`),
          onChange: (i) => r({ ...t, validation: i.target.value.split(`
`) })
        }
      ),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Laravel rules, one per line." }),
      /* @__PURE__ */ e.jsx(y, { message: o.validation ?? Object.entries(o).find(([i]) => i.startsWith("validation."))?.[1] })
    ] }),
    n?.hasChildren && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { children: "Fields inside" }),
      /* @__PURE__ */ e.jsx(
        _e,
        {
          fields: t.fields,
          onChange: (i) => r({ ...t, fields: i }),
          types: l,
          errors: O(o, "fields"),
          depth: d + 1,
          idPrefix: s
        }
      ),
      /* @__PURE__ */ e.jsx(y, { message: o.fields })
    ] }),
    /* @__PURE__ */ e.jsx(y, { message: o.type })
  ] });
}
function xs({ kind: s = "blueprint", blueprint: t, fieldTypes: n, usedBy: c = [] }) {
  const r = s === "fieldset" ? "Fieldset" : "Blueprint", l = S(s === "fieldset" ? "cms/fieldsets" : "cms/blueprints"), o = t ? t.title : `New ${r.toLowerCase()}`;
  a.useBreadcrumbs([{ label: `${r}s`, href: l }, { label: o }]);
  const [d, h] = G(), i = j.useForm({ title: t?.title ?? "", handle: t?.handle ?? "" }), [p, m] = w.useState(t !== null), [u, x] = w.useState(() => Se(t?.fields)), b = (C) => n.find((v) => v.type === C)?.hasChildren === !0, N = i.errors, f = (C) => {
    C.preventDefault(), i.transform((v) => ({
      ...t ? { title: v.title } : v,
      fields: $e(u, b)
    })), t ? i.put(`${l}/${t.id}`, { preserveScroll: !0 }) : i.post(l);
  }, $ = () => t && d(
    `Delete the ${r.toLowerCase()} "${t.title}"? Content keeps its values.`,
    () => j.router.delete(`${l}/${t.id}`, { preserveScroll: !0 })
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: f, className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(j.Head, { title: o }),
    h,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(j.Link, { href: l, "aria-label": `Back to ${r.toLowerCase()}s`, children: /* @__PURE__ */ e.jsx(re, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: o })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        t && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "icon", className: "cms:text-destructive", "aria-label": `Delete ${o}`, onClick: $, children: /* @__PURE__ */ e.jsx(z, {}) }),
        /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: i.processing, children: [
          i.processing && /* @__PURE__ */ e.jsx(fe, { className: "cms:animate-spin" }),
          t ? "Save" : `Create ${r.toLowerCase()}`
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(y, { message: N.blueprint ?? N.fieldset }),
    /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "title", children: "Title" }),
        /* @__PURE__ */ e.jsx(a.Input, { id: "title", value: i.data.title, required: !0, onChange: (C) => {
          i.setData((v) => ({ ...v, title: C.target.value, handle: p ? v.handle : Ce(C.target.value) }));
        } }),
        /* @__PURE__ */ e.jsx(y, { message: N.title })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "handle", children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: "handle",
            className: "cms:font-mono",
            value: i.data.handle,
            disabled: t !== null,
            required: !0,
            onChange: (C) => {
              m(!0), i.setData("handle", C.target.value);
            }
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t ? "Set when it was created." : "Lowercase letters, digits and underscores. It can't change later." }),
        /* @__PURE__ */ e.jsx(y, { message: N.handle })
      ] })
    ] }) }),
    c.length > 0 && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      "Used by ",
      c.join(", "),
      ". Changes show there at once."
    ] }),
    /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-3", "aria-labelledby": "fields-heading", children: [
      /* @__PURE__ */ e.jsx("h2", { id: "fields-heading", className: "cms:text-lg cms:font-medium", children: "Fields" }),
      /* @__PURE__ */ e.jsx(_e, { fields: u, onChange: x, types: n, errors: O(N, "fields") }),
      /* @__PURE__ */ e.jsx(y, { message: N.fields })
    ] })
  ] });
}
function De({ noun: s, base: t, rows: n, intro: c }) {
  const r = `${s}s`;
  a.useBreadcrumbs([{ label: r }]);
  const [l, o] = G();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(j.Head, { title: r }),
    o,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: r }),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: c })
      ] }),
      /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(j.Link, { href: `${t}/create`, children: [
        /* @__PURE__ */ e.jsx(B, {}),
        " New ",
        s.toLowerCase()
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsx(a.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(a.Table, { children: [
      /* @__PURE__ */ e.jsx(a.TableHeader, { children: /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Title" }),
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Handle" }),
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Fields" }),
        n.some((d) => d.usedBy) && /* @__PURE__ */ e.jsx(a.TableHead, { children: "Used by" }),
        /* @__PURE__ */ e.jsx(a.TableHead, { className: "cms:w-12", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: "Actions" }) })
      ] }) }),
      /* @__PURE__ */ e.jsxs(a.TableBody, { children: [
        n.length === 0 && /* @__PURE__ */ e.jsx(a.TableRow, { children: /* @__PURE__ */ e.jsxs(a.TableCell, { colSpan: 5, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: [
          "No ",
          r.toLowerCase(),
          " yet."
        ] }) }),
        n.map((d) => /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx(j.Link, { href: `${t}/${d.id}/edit`, className: "cms:font-medium cms:hover:underline", children: d.title }) }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: d.handle }) }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: d.fields }),
          d.usedBy && /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:text-muted-foreground", children: d.usedBy.join(", ") || "—" }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx(
            a.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Delete ${d.title}`,
              onClick: () => l(
                `Delete the ${s.toLowerCase()} "${d.title}"? Content keeps its values.`,
                () => j.router.delete(`${t}/${d.id}`, { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(z, {})
            }
          ) })
        ] }, d.id))
      ] })
    ] }) })
  ] });
}
function ps({ blueprints: s }) {
  const t = j.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(y, { message: t.blueprint }),
    /* @__PURE__ */ e.jsx(
      De,
      {
        noun: "Blueprint",
        base: S("cms/blueprints"),
        rows: s,
        intro: "The fields editors fill in, for each kind of content."
      }
    )
  ] });
}
function A(s) {
  return { draft: "Draft", scheduled: "Scheduled", published: "Published" }[s];
}
function K(s, t) {
  if (!s) return "—";
  const n = new Date(s);
  return Number.isNaN(n.getTime()) ? "—" : n.toLocaleString(t, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
function gs(s) {
  const t = (n) => String(n).padStart(2, "0");
  return `${s.getFullYear()}-${t(s.getMonth() + 1)}-${t(s.getDate())}T${t(s.getHours())}:${t(s.getMinutes())}`;
}
function Z(s, t) {
  try {
    return new Intl.DisplayNames(t ? [t] : void 0, { type: "language" }).of(s.replace("_", "-")) ?? s;
  } catch {
    return s;
  }
}
function fs(s) {
  const { entry: t } = s;
  return /* @__PURE__ */ e.jsx(js, { ...s }, t ? `${t.id}:${t.locale}:${t.version}:${t.status}:${t.trashed}:${t.publishedAt}` : "new");
}
function js({ collection: s, fields: t, locales: n = [], shared: c = [], sharedValues: r = {}, entry: l, values: o, revisions: d, can: h }) {
  const i = S(`cms/collections/${s.handle}/entries`), p = l ? S(`cms/entries/${l.id}`) : i, m = l ? o.title : "New entry";
  a.useBreadcrumbs([{ label: s.title, href: i }, { label: m }]);
  const [u, x] = G(), [b, N] = w.useState(!1), f = j.useForm({ ...o, locale: l?.locale ?? null, version: l?.version ?? null, publish: !1, published_at: null }), $ = l ? { locale: l.locale } : {}, C = n.find((g) => g.main)?.code, v = f.errors, M = l !== null && l.status !== "draft" && !l.hasUnpublishedChanges && !f.isDirty, F = l === null ? h.create : h.update && !l.trashed, R = (g = !1, U = null) => {
    f.transform((Be) => ({ ...Be, publish: g, published_at: U })), l ? f.put(p, { preserveScroll: !0, onSuccess: () => N(!1) }) : f.post(p);
  }, E = (g = null) => {
    h.update ? R(!0, g) : l && j.router.post(`${p}/publish`, { ...$, published_at: g }, { preserveScroll: !0, onSuccess: () => N(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (g) => {
    g.preventDefault(), R();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(j.Head, { title: m }),
    x,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(j.Link, { href: i, "aria-label": `Back to ${s.title}`, children: /* @__PURE__ */ e.jsx(re, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: m }),
        l && /* @__PURE__ */ e.jsx(a.Badge, { variant: l.status === "published" ? "default" : "secondary", children: l.trashed ? "In the trash" : A(l.status) }),
        f.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        l?.trashed && h.delete && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", onClick: () => j.router.post(`${p}/restore`, {}, { preserveScroll: !0 }), children: [
          /* @__PURE__ */ e.jsx(qe, {}),
          " Restore"
        ] }),
        l && !l.trashed && h.delete && /* @__PURE__ */ e.jsx(
          a.Button,
          {
            type: "button",
            variant: "outline",
            size: "icon",
            className: "cms:text-destructive",
            "aria-label": "Move to the trash",
            onClick: () => u(`Move "${o.title}" to the trash? It comes off the site; you can restore it.`, () => j.router.delete(p)),
            children: /* @__PURE__ */ e.jsx(z, {})
          }
        ),
        F && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", variant: l && h.publish ? "outline" : "default", disabled: f.processing, children: [
          f.processing && /* @__PURE__ */ e.jsx(fe, { className: "cms:animate-spin" }),
          l ? "Save draft" : "Create draft"
        ] }),
        l && !l.trashed && h.publish && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex", children: [
          /* @__PURE__ */ e.jsx(a.Button, { type: "button", className: "cms:rounded-r-none", disabled: f.processing || M, onClick: () => E(), children: l.status === "draft" ? "Publish" : M ? "Published" : "Publish changes" }),
          /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "icon", className: "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": "More publishing options", children: /* @__PURE__ */ e.jsx(ue, {}) }) }),
            /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", children: [
              /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { onSelect: () => N(!0), children: [
                /* @__PURE__ */ e.jsx(We, {}),
                " Publish on a date…"
              ] }),
              l.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
                /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => j.router.post(`${p}/unpublish`, $, { preserveScroll: !0 }), children: "Unpublish" })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }),
    l && n.length > 1 && /* @__PURE__ */ e.jsx(
      bs,
      {
        entryUrl: p,
        current: l.locale,
        locales: n,
        canAdd: h.create && !l.trashed,
        canRemove: h.delete && !l.isMain && !l.trashed,
        onRemove: () => u(
          `Remove the ${Z(l.locale)} translation of "${o.title}"? Its revisions go with it.`,
          () => j.router.delete(`${p}/translations/${l.locale}`)
        )
      }
    ),
    v.version && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: v.version }),
    (v.entry || v.published_at) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: v.entry ?? v.published_at }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_18rem]", children: [
      /* @__PURE__ */ e.jsxs("fieldset", { disabled: !F, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-[2fr_1fr]", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "title", children: "Title" }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "title",
                value: f.data.title,
                "aria-invalid": v.title !== void 0,
                onChange: (g) => f.setData("title", g.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(y, { message: v.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "slug", children: "Slug" }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "slug",
                className: "cms:font-mono",
                value: f.data.slug,
                placeholder: "Made from the title",
                "aria-invalid": v.slug !== void 0,
                onChange: (g) => f.setData("slug", g.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(y, { message: v.slug })
          ] })
        ] }) }),
        t.length > 0 && /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsx(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: t.map((g) => c.includes(g.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
          /* @__PURE__ */ e.jsx(P, { id: `data-${g.handle}`, field: g, content: !0, value: r[g.handle], errors: {}, onChange: () => {
          } }),
          /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
            "Shared by all languages: edit it in ",
            C ? Z(C) : "the main language",
            "."
          ] })
        ] }, g.handle) : /* @__PURE__ */ e.jsx(
          P,
          {
            id: `data-${g.handle}`,
            field: g,
            content: !0,
            value: f.data.data[g.handle],
            errors: I(v, `data.${g.handle}`),
            onChange: (U) => f.setData("data", { ...f.data.data, [g.handle]: U })
          },
          g.handle
        )) }) })
      ] }),
      l && /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:flex-col cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs(a.Card, { children: [
          /* @__PURE__ */ e.jsx(a.CardHeader, { children: /* @__PURE__ */ e.jsx(a.CardTitle, { className: "cms:text-base", children: "Status" }) }),
          /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
            /* @__PURE__ */ e.jsxs("p", { children: [
              A(l.status),
              l.status !== "draft" && l.publishedAt ? ` · ${K(l.publishedAt)}` : ""
            ] }),
            l.status !== "draft" && l.hasUnpublishedChanges && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The draft has changes the site doesn't show yet." })
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs(a.Card, { children: [
          /* @__PURE__ */ e.jsx(a.CardHeader, { children: /* @__PURE__ */ e.jsx(a.CardTitle, { className: "cms:text-base", children: "Revisions" }) }),
          /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
            d.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "Each publish keeps one." }),
            d.map((g) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
                /* @__PURE__ */ e.jsx("div", { className: "cms:truncate", children: g.title }),
                /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: K(g.createdAt) })
              ] }),
              h.update && !l.trashed && /* @__PURE__ */ e.jsx(
                a.Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  onClick: () => j.router.post(S(`cms/revisions/${g.id}/restore`), {}, { preserveScroll: !0 }),
                  children: "Restore"
                }
              )
            ] }, g.id))
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(
      vs,
      {
        open: b,
        onClose: () => N(!1),
        processing: f.processing,
        current: l?.publishedAt ?? null,
        onSchedule: (g) => E(g)
      }
    )
  ] });
}
function bs({ entryUrl: s, current: t, locales: n, canAdd: c, canRemove: r, onRemove: l }) {
  return /* @__PURE__ */ e.jsxs("nav", { "aria-label": "Languages", className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
    n.map((o) => {
      const d = `${Z(o.code)}${o.main ? " (main)" : ""}`;
      return o.status === null ? c ? /* @__PURE__ */ e.jsxs(
        a.Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "cms:border-dashed",
          onClick: () => j.router.post(`${s}/translations`, { locale: o.code }),
          children: [
            /* @__PURE__ */ e.jsx(B, {}),
            " ",
            d
          ]
        },
        o.code
      ) : null : /* @__PURE__ */ e.jsxs(
        a.Button,
        {
          type: "button",
          size: "sm",
          variant: o.code === t ? "secondary" : "ghost",
          "aria-current": o.code === t ? "page" : void 0,
          onClick: () => o.code !== t && j.router.get(`${s}/edit`, { locale: o.code }),
          children: [
            d,
            /* @__PURE__ */ e.jsx(a.Badge, { variant: o.status === "published" ? "default" : "outline", className: "cms:ml-1", children: A(o.status) })
          ]
        },
        o.code
      );
    }),
    r && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:ml-auto cms:text-destructive", onClick: l, children: "Remove this language" })
  ] });
}
function vs({ open: s, onClose: t, onSchedule: n, current: c, processing: r }) {
  const [l, o] = w.useState("");
  return w.useEffect(() => {
    s && o(gs(c ? new Date(c) : new Date(Date.now() + 864e5)));
  }, [s, c]), /* @__PURE__ */ e.jsx(a.Dialog, { open: s, onOpenChange: (d) => !d && t(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: "Publish on a date" }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: "The entry goes live then; a date in the past publishes it now with that date." })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "published-at", children: "Date and time" }),
      /* @__PURE__ */ e.jsx(a.Input, { id: "published-at", type: "datetime-local", value: l, onChange: (d) => o(d.target.value) }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "In your time zone." })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: t, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", disabled: l === "" || r, onClick: () => n(new Date(l).toISOString()), children: "Publish" })
    ] })
  ] }) });
}
function Ns({ collection: s, collections: t, entries: n, query: c, can: r }) {
  a.useBreadcrumbs([{ label: "Entries", href: S("cms/entries") }, ...s ? [{ label: s.title }] : []]);
  const [l, o] = w.useState(c.search), d = s ? S(`cms/collections/${s.handle}/entries`) : "", h = (i) => {
    const p = { ...c, ...i };
    j.router.get(
      d,
      { ...p.search ? { search: p.search } : {}, ...p.trashed ? { trashed: 1 } : {} },
      { preserveState: !0, preserveScroll: !0, replace: !0 }
    );
  };
  return w.useEffect(() => {
    if (l === c.search) return;
    const i = window.setTimeout(() => h({ search: l }), 300);
    return () => window.clearTimeout(i);
  }, [l]), !s || !n ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(j.Head, { title: "Entries" }),
    /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Entries" }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no collections yet. Create one under Structure → Collections, then come back to write its entries." })
  ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(j.Head, { title: s.title }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
        t.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: s.handle, onValueChange: (i) => j.router.get(S(`cms/collections/${i}/entries`)), children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": "Collection", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: t.map((i) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: i.handle, children: i.title }, i.handle)) })
        ] })
      ] }),
      r?.create && !c.trashed && /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(j.Link, { href: `${d}/create`, children: [
        /* @__PURE__ */ e.jsx(B, {}),
        " New entry"
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-sm", children: [
        /* @__PURE__ */ e.jsx(Ke, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            className: "cms:pl-9",
            placeholder: "Search titles",
            "aria-label": "Search titles",
            value: l,
            onChange: (i) => o(i.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(a.Button, { variant: c.trashed ? "secondary" : "ghost", size: "sm", onClick: () => h({ trashed: !c.trashed }), children: c.trashed ? "Back to entries" : "Trash" })
    ] }),
    /* @__PURE__ */ e.jsx(a.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(a.Table, { children: [
      /* @__PURE__ */ e.jsx(a.TableHeader, { children: /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Title" }),
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Status" }),
        /* @__PURE__ */ e.jsx(a.TableHead, { children: s.dated ? "Date" : "Updated" })
      ] }) }),
      /* @__PURE__ */ e.jsxs(a.TableBody, { children: [
        n.data.length === 0 && /* @__PURE__ */ e.jsx(a.TableRow, { children: /* @__PURE__ */ e.jsx(a.TableCell, { colSpan: 3, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: c.trashed ? "The trash is empty." : c.search ? "Nothing matches." : "No entries yet." }) }),
        n.data.map((i) => /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
          /* @__PURE__ */ e.jsxs(a.TableCell, { children: [
            /* @__PURE__ */ e.jsx(j.Link, { href: S(`cms/entries/${i.id}/edit`), className: "cms:font-medium cms:hover:underline", children: i.title }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
              "/",
              i.slug
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-1", children: [
            /* @__PURE__ */ e.jsx(a.Badge, { variant: i.status === "published" ? "default" : "secondary", children: A(i.status) }),
            i.locales.length > 1 && i.locales.filter((p) => !p.main).map((p) => /* @__PURE__ */ e.jsx(
              a.Badge,
              {
                variant: p.status === "published" ? "default" : "outline",
                className: p.status === null ? "cms:opacity-50" : "",
                title: `${p.code}: ${p.status === null ? "not translated" : A(p.status)}`,
                children: p.code.toUpperCase()
              },
              p.code
            ))
          ] }) }),
          /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:text-muted-foreground", children: K(s.dated ? i.publishedAt : i.updatedAt) })
        ] }, i.id))
      ] })
    ] }) }),
    n.total > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:text-sm cms:text-muted-foreground", children: [
      /* @__PURE__ */ e.jsxs("span", { children: [
        n.from,
        "–",
        n.to,
        " of ",
        n.total
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Previous page",
            disabled: !n.prev_page_url,
            onClick: () => n.prev_page_url && j.router.get(n.prev_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(Ve, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Next page",
            disabled: !n.next_page_url,
            onClick: () => n.next_page_url && j.router.get(n.next_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(pe, {})
          }
        )
      ] })
    ] })
  ] });
}
function ws({ fieldsets: s }) {
  const t = j.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(y, { message: t.fieldset }),
    /* @__PURE__ */ e.jsx(
      De,
      {
        noun: "Fieldset",
        base: S("cms/fieldsets"),
        rows: s,
        intro: "Fields shared between blueprints, and the kinds of block of flexible fields."
      }
    )
  ] });
}
Le({
  pages: {
    "Cms/Blueprints/Index": ps,
    "Cms/Blueprints/Form": xs,
    "Cms/Fieldsets/Index": ws,
    "Cms/Entries/Index": Ns,
    "Cms/Entries/Editor": fs
  }
});
export {
  w as R,
  ys as _,
  S as a,
  k as c,
  Cs as i,
  e as j,
  a as u
};
