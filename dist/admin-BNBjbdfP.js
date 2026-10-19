function Fe(s, t) {
  for (var l = 0; l < t.length; l++) {
    const c = t[l];
    if (typeof c != "string" && !Array.isArray(c)) {
      for (const r in c)
        if (r !== "default" && !(r in s)) {
          const n = Object.getOwnPropertyDescriptor(c, r);
          n && Object.defineProperty(s, r, n.get ? n : {
            enumerable: !0,
            get: () => c[r]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(s, Symbol.toStringTag, { value: "Module" }));
}
const ee = 1;
function ce() {
  const s = globalThis.Sunrice;
  if (!s)
    throw new Error("[sunrice] This script runs outside the Sunrice admin panel (window.Sunrice is missing).");
  return s;
}
function Re(s) {
  const t = ce();
  if (t.version !== ee)
    throw new Error(`[sunrice] This plugin was built for admin runtime ${ee}, but the panel runs ${t.version}. Rebuild it with a matching @sunrice/admin-sdk.`);
  for (const [l, c] of Object.entries(s.pages ?? {}))
    t.registerPage(l, c);
}
function y(s = "") {
  return ce().adminUrl(s);
}
const re = globalThis.Sunrice;
if (!re) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const e = re.modules["react/jsx-runtime"], ie = globalThis.Sunrice;
if (!ie) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const C = ie.modules.react, Ts = /* @__PURE__ */ Fe({
  __proto__: null
}, [C]), oe = globalThis.Sunrice;
if (!oe) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const p = oe.modules["@inertiajs/react"];
const Ee = (s) => s?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
function He(s, t, l = []) {
  if (t == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: Ee(s),
    size: 24,
    node: t,
    ...l.length > 0 ? { aliases: l } : {}
  };
}
const Pe = (s) => {
  let t = "", l = !1;
  for (const c of s) {
    if (c === "-" || c === "_" || c <= " ") {
      l = t.length > 0;
      continue;
    }
    t.length === 0 ? t += c.toLowerCase() : t += l ? c.toUpperCase() : c, l = !1;
  }
  return t;
};
const Ve = (s) => {
  const t = Pe(s);
  return t.charAt(0).toUpperCase() + t.slice(1);
};
const G = (...s) => s.filter((t, l, c) => !!t && t.trim() !== "" && c.indexOf(t) === l).join(" ").trim();
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
function Oe(s, t = {}) {
  const l = t.attributeNames ?? {}, c = (x) => l[x] ?? x, r = s.size ?? s.width ?? _.width, n = s.size ?? s.height ?? _.height, o = s.aliases?.filter((x) => typeof x == "string" && x.trim() !== "").map((x) => `lucide-${x}`) ?? [], d = [...s.name ? [`lucide-${s.name}`] : [], ...o], u = t.className?.split(" ").filter(Boolean) ?? [], i = t.includeDefaultClasses === !1 ? G(...u) : G("lucide", ...d, ...u), m = t.absoluteStrokeWidth ? Number(t.strokeWidth ?? _["stroke-width"]) * Number(s.size ?? s.width ?? _.width) / Number(t.size ?? t.width ?? _.width) : t.strokeWidth ?? _["stroke-width"];
  return [
    "svg",
    {
      ...Object.entries(_).reduce((x, [g, f]) => (x[c(g)] = f, x), {}),
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
      [c("stroke-width")]: m,
      ...i && {
        [c("class")]: i
      },
      [c("viewBox")]: `0 0 ${r} ${n}`,
      ...t.hasA11yProp === !1 ? {
        [c("aria-hidden")]: "true"
      } : {},
      ..."attributes" in t && t.attributes
    },
    s.node.map((x) => {
      const [g, f, w] = x, b = t.nonScalingStroke ? { [c("vector-effect")]: "non-scaling-stroke", ...f } : f;
      return w ? [g, b, w] : [g, b];
    })
  ];
}
function Ue(s, t = {}) {
  return Oe(s, {
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
const qe = (s) => {
  for (const t in s)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
  return !1;
}, We = C.createContext({}), Ke = () => C.useContext(We), Ze = C.forwardRef(
  ({
    color: s,
    size: t,
    width: l,
    height: c,
    strokeWidth: r,
    absoluteStrokeWidth: n,
    nonScalingStroke: o,
    className: d = "",
    children: u,
    iconNode: i = [],
    icon: m = {
      node: i,
      aliases: [],
      size: 24
    },
    ...h
  }, x) => {
    const {
      size: g = 24,
      strokeWidth: f = 2,
      absoluteStrokeWidth: w = !1,
      nonScalingStroke: b = !1,
      color: $ = "currentColor",
      className: k = ""
    } = Ke() ?? {}, v = !!u || qe(h), [M, F, R = []] = Ue(m, {
      color: s ?? $,
      width: l ?? t ?? g,
      height: c ?? t ?? g,
      strokeWidth: r ?? f,
      absoluteStrokeWidth: n ?? w,
      nonScalingStroke: o ?? b,
      className: G(k, d),
      hasA11yProp: v,
      attributes: h
    });
    return C.createElement(
      M,
      {
        ref: x,
        ...F
      },
      [
        ...R.map(([E, j]) => C.createElement(E, j)),
        ...Array.isArray(u) ? u : [u]
      ]
    );
  }
);
function S(s, t = [], l = []) {
  const c = typeof s == "string" ? He(s, t, l) : s, r = C.forwardRef(
    ({ className: n, ...o }, d) => C.createElement(Ze, {
      ref: d,
      icon: c,
      className: n,
      ...o
    })
  );
  return c.name && (r.displayName = Ve(c.name)), r;
}
const de = {
  name: "arrow-down",
  size: 24,
  node: [
    ["path", { d: "M12 5v14", key: "s699le" }],
    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
  ]
};
de.node;
const X = S(de);
const me = {
  name: "arrow-left",
  size: 24,
  node: [
    ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
    ["path", { d: "M19 12H5", key: "x3x0zl" }]
  ]
};
me.node;
const ue = S(me);
const he = {
  name: "arrow-up",
  size: 24,
  node: [
    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
    ["path", { d: "M12 19V5", key: "x0mq9r" }]
  ]
};
he.node;
const J = S(he);
const xe = {
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
xe.node;
const Ge = S(xe);
const ge = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
ge.node;
const pe = S(ge);
const je = {
  name: "chevron-left",
  size: 24,
  node: [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]]
};
je.node;
const Ye = S(je);
const fe = {
  name: "chevron-right",
  size: 24,
  node: [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]
};
fe.node;
const be = S(fe);
const ve = {
  name: "loader-circle",
  size: 24,
  node: [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  aliases: ["loader-2"]
};
ve.node;
const Ne = S(ve);
const Ce = {
  name: "pencil",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
        key: "1a8usu"
      }
    ],
    ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
  ]
};
Ce.node;
const Xe = S(Ce);
const we = {
  name: "plus",
  size: 24,
  node: [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ]
};
we.node;
const D = S(we);
const ye = {
  name: "rotate-ccw",
  size: 24,
  node: [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ]
};
ye.node;
const Je = S(ye);
const ke = {
  name: "search",
  size: 24,
  node: [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ]
};
ke.node;
const Qe = S(ke);
const Se = {
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
Se.node;
const z = S(Se), $e = globalThis.Sunrice;
if (!$e) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const a = $e.modules["@sunrice/admin-sdk/ui"];
function O() {
  const [s, t] = C.useState(null), l = /* @__PURE__ */ e.jsx(a.Dialog, { open: s !== null, onOpenChange: (c) => !c && t(null), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
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
  return [(c, r) => t({ message: c, onConfirm: r }), l];
}
const es = 5;
let ss = 0;
const Te = () => `f${++ss}`;
function _e(s) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function De(s, t) {
  const l = new Set(t.map((n) => n.handle)), c = _e(s) || "field";
  let r = c;
  for (let n = 2; l.has(r); n++)
    r = `${c}_${n}`;
  return r;
}
function ze(s) {
  return (s ?? []).map(({ fields: t, ...l }) => ({
    ...l,
    key: Te(),
    fields: ze(t),
    handleTouched: !0
  }));
}
function Be(s, t) {
  return s.map(({ key: l, handleTouched: c, fields: r, ...n }) => ({
    ...n,
    validation: (n.validation ?? []).map((o) => o.trim()).filter((o) => o !== ""),
    ...t(n.type) ? { fields: Be(r, t) } : {}
  }));
}
function ts(s, t, l) {
  return { key: Te(), type: s, label: t, handle: De(t, l), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function H(s, t, l) {
  const c = t + l;
  if (t < 0 || t >= s.length || c < 0 || c >= s.length) return s;
  const r = s.slice(), [n] = r.splice(t, 1);
  return r.splice(c, 0, n), r;
}
function as(s, t, l) {
  if (s.handleTouched) return { ...s, label: t };
  const c = l.filter((r) => r.key !== s.key);
  return { ...s, label: t, handle: De(t || s.type, c) };
}
function U(s, t) {
  const l = `${t}.`, c = {};
  for (const [r, n] of Object.entries(s))
    r.startsWith(l) && (c[r.slice(l.length)] = n);
  return c;
}
function A(s, t) {
  const l = s[t];
  return { ...U(s, t), ...l !== void 0 ? { "": l } : {} };
}
function se(s, t) {
  return Object.keys(s).some((l) => l === t || l.startsWith(`${t}.`));
}
function I(s) {
  return s && typeof s == "object" && !Array.isArray(s) ? s : {};
}
function ls(s, t) {
  if (typeof s != "string" || s === "") return "";
  const l = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(s);
  return l ? t ? `${l[1]}T${l[2] ?? "00:00"}` : l[1] ?? "" : "";
}
function ns(s) {
  return s === "" ? null : s;
}
function cs() {
  return { _hidden: !1 };
}
function rs(s) {
  return { type: s, hidden: !1, values: {} };
}
function _s(s) {
  const t = s.replace(/[\u0000- \u007f]+/g, ""), l = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(t);
  return l ? ["http", "https", "mailto", "tel"].includes(l[1].toLowerCase()) : !t.includes("\\");
}
const is = C.lazy(() => import("./RichTextEditor-D6ezTKaV.js").then((s) => ({ default: s.RichTextEditor }))), K = "__none";
function N({ message: s }) {
  return s ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: s }) : null;
}
function te(s) {
  const t = s.config?.options;
  return Array.isArray(t) ? t.flatMap((l) => {
    if (typeof l == "string") return [{ value: l, label: l }];
    if (l && typeof l == "object" && typeof l.value == "string") {
      const { value: c, label: r } = l;
      return [{ value: c, label: r || c }];
    }
    return [];
  }) : [];
}
const os = ["repeater", "group", "flexible", "link", "media", "rich_text"];
function ds(s) {
  if (s.label) return s.label;
  const t = s.handle.replace(/_/g, " ");
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function P({ field: s, value: t, onChange: l, errors: c, id: r, content: n = !1 }) {
  const o = ds(s), d = os.includes(s.type) || ["select", "terms"].includes(s.type) && s.config?.multiple === !0;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", ...d ? { role: "group", "aria-labelledby": `${r}-label` } : {}, children: [
    s.type === "toggle" ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(a.Switch, { id: r, checked: t === !0, onCheckedChange: (u) => l(u) }),
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: r, children: o })
    ] }) : /* @__PURE__ */ e.jsxs(a.Label, { id: `${r}-label`, htmlFor: d ? void 0 : r, children: [
      o,
      s.required && /* @__PURE__ */ e.jsx("span", { className: "cms:text-destructive", children: " *" })
    ] }),
    /* @__PURE__ */ e.jsx(ms, { field: s, value: t, onChange: l, errors: c, id: r, content: n }),
    s.instructions && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s.instructions }),
    /* @__PURE__ */ e.jsx(N, { message: c[""] })
  ] });
}
function ms({ field: s, value: t, onChange: l, errors: c, id: r, content: n }) {
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
          rows: B(s, "rows") ?? 4,
          onChange: (d) => l(d.target.value)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ e.jsx(C.Suspense, { fallback: /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-48 cms:w-full" }), children: /* @__PURE__ */ e.jsx(is, { id: r, labelledBy: `${r}-label`, invalid: o, value: typeof t == "string" ? t : "", onChange: l }) });
    case "number":
      return /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: r,
          type: "number",
          className: "cms:max-w-48",
          "aria-invalid": o,
          value: typeof t == "number" ? String(t) : typeof t == "string" ? t : "",
          min: B(s, "min"),
          max: B(s, "max"),
          step: B(s, "step") ?? "any",
          onChange: (d) => l(d.target.value === "" ? null : Number(d.target.value))
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
          value: ls(t, d),
          onChange: (u) => l(ns(u.target.value))
        }
      );
    }
    case "select":
      return s.config?.multiple === !0 ? /* @__PURE__ */ e.jsx(le, { options: te(s), value: Array.isArray(t) ? t.map(String) : [], onChange: l }) : /* @__PURE__ */ e.jsx(ae, { options: te(s), value: typeof t == "string" ? t : null, onChange: l, id: r, required: s.required === !0 });
    case "terms": {
      const d = s.terms ?? [];
      if (s.config?.multiple === !0) {
        const u = Array.isArray(t) ? t.map(String) : [];
        return /* @__PURE__ */ e.jsx(le, { options: d, value: u, onChange: (i) => l(i.map(Number)) });
      }
      return /* @__PURE__ */ e.jsx(
        ae,
        {
          options: d,
          id: r,
          required: s.required === !0,
          value: t == null ? null : String(t),
          onChange: (u) => l(u === null ? null : Number(u))
        }
      );
    }
    case "link":
      return /* @__PURE__ */ e.jsx(hs, { value: I(t), onChange: l, errors: c, id: r });
    case "media":
      return /* @__PURE__ */ e.jsx(
        a.MediaPickerInput,
        {
          id: r,
          invalid: o,
          disabled: !1,
          multiple: s.config?.multiple === !0,
          max: B(s, "max") ?? null,
          types: Array.isArray(s.config?.types) ? s.config.types : [],
          value: typeof t == "number" || Array.isArray(t) && t.every((d) => typeof d == "number") ? t : null,
          onChange: l
        }
      );
    case "group":
      return /* @__PURE__ */ e.jsx(Q, { fields: s.fields ?? [], value: I(t), onChange: l, errors: c, id: r, content: n });
    case "repeater":
      return /* @__PURE__ */ e.jsx(gs, { field: s, value: Array.isArray(t) ? t : [], onChange: l, errors: c, id: r, content: n });
    case "flexible":
      return /* @__PURE__ */ e.jsx(ps, { field: s, value: Array.isArray(t) ? t : [], onChange: l, errors: c, id: r });
    default:
      return /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: r,
          "aria-invalid": o,
          value: typeof t == "string" ? t : "",
          placeholder: us(s, "placeholder"),
          maxLength: B(s, "max"),
          onChange: (d) => l(d.target.value)
        }
      );
  }
}
function B(s, t) {
  const l = s.config?.[t];
  return typeof l == "number" ? l : void 0;
}
function us(s, t) {
  const l = s.config?.[t];
  return typeof l == "string" ? l : void 0;
}
function Q({ fields: s, value: t, onChange: l, errors: c, id: r, content: n }) {
  return /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-4 cms:rounded-lg cms:border cms:p-4", children: s.map((o) => /* @__PURE__ */ e.jsx(
    P,
    {
      id: `${r}-${o.handle}`,
      field: o,
      value: t[o.handle],
      content: n,
      errors: A(c, o.handle),
      onChange: (d) => l({ ...t, [o.handle]: d })
    },
    o.handle
  )) });
}
function ae({ options: s, value: t, onChange: l, id: c, required: r }) {
  return /* @__PURE__ */ e.jsxs(a.Select, { value: t ?? K, onValueChange: (n) => l(n === K ? null : n), children: [
    /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: c, className: "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
    /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
      !r && /* @__PURE__ */ e.jsx(a.SelectItem, { value: K, children: "None" }),
      s.map((n) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: n.value, children: n.label }, n.value))
    ] })
  ] });
}
function le({ options: s, value: t, onChange: l }) {
  return s.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Nothing to choose from yet." }) : /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2", children: s.map((c) => /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
    /* @__PURE__ */ e.jsx(
      a.Checkbox,
      {
        checked: t.includes(c.value),
        onCheckedChange: (r) => l(r ? s.map((n) => n.value).filter((n) => n === c.value || t.includes(n)) : t.filter((n) => n !== c.value))
      }
    ),
    c.label
  ] }, c.value)) });
}
function hs({ value: s, onChange: t, errors: l, id: c }) {
  const r = (n, o) => {
    const d = { ...s, [n]: o };
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
        onChange: (n) => r("url", n.target.value),
        "aria-invalid": l.url !== void 0
      }
    ),
    /* @__PURE__ */ e.jsx(
      a.Input,
      {
        "aria-label": "Link text",
        placeholder: "Link text",
        value: typeof s.label == "string" ? s.label : "",
        onChange: (n) => r("label", n.target.value)
      }
    ),
    /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
      /* @__PURE__ */ e.jsx(a.Checkbox, { checked: s.new_tab === !0, onCheckedChange: (n) => r("new_tab", n) }),
      "New tab"
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ e.jsx(N, { message: l.url ?? l.label }) })
  ] });
}
function xs(s, t) {
  return !t && (s.fields ?? []).every((l) => l.type === "text");
}
function gs({ field: s, value: t, onChange: l, errors: c, id: r, content: n = !1 }) {
  const o = s.fields ?? [], d = t.map(I), u = (h, x) => l(d.map((g, f) => f === h ? x : g)), i = (s.label || "row").toLowerCase().replace(/s$/, ""), m = i.charAt(0).toUpperCase() + i.slice(1);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    d.map((h, x) => xs(s, n) ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
      o.map((g) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            "aria-label": g.label || g.handle,
            placeholder: g.label || g.handle,
            value: typeof h[g.handle] == "string" ? h[g.handle] : "",
            onChange: (f) => u(x, { ...h, [g.handle]: f.target.value })
          }
        ),
        /* @__PURE__ */ e.jsx(N, { message: c[`${x}.${g.handle}`] })
      ] }, g.handle)),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": `Remove ${i} ${x + 1}`, onClick: () => l(d.filter((g, f) => f !== x)), children: /* @__PURE__ */ e.jsx(z, {}) })
    ] }, x) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(
        Ie,
        {
          label: `${m} ${x + 1}`,
          index: x,
          count: d.length,
          onMove: (g) => l(H(d, x, g)),
          onRemove: () => l(d.filter((g, f) => f !== x)),
          hidden: n ? h._hidden === !0 : void 0,
          onHidden: (g) => u(x, { ...h, _hidden: g })
        }
      ),
      /* @__PURE__ */ e.jsx(Q, { fields: o, value: h, onChange: (g) => u(x, g), errors: A(c, String(x)), id: `${r}-${x}`, content: n })
    ] }, typeof h._id == "string" ? h._id : x)),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => l([...d, n ? cs() : {}]), children: [
      /* @__PURE__ */ e.jsx(D, {}),
      " Add ",
      i
    ] }) })
  ] });
}
function ps({ field: s, value: t, onChange: l, errors: c, id: r }) {
  const n = s.blocks ?? [], o = t.map(I), d = (u, i) => l(o.map((m, h) => h === u ? i : m));
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    o.map((u, i) => {
      const m = n.find((h) => h.type === u.type);
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(
          Ie,
          {
            label: m?.label ?? String(u.type),
            badge: !0,
            index: i,
            count: o.length,
            onMove: (h) => l(H(o, i, h)),
            onRemove: () => l(o.filter((h, x) => x !== i)),
            hidden: u.hidden === !0,
            onHidden: (h) => d(i, { ...u, hidden: h })
          }
        ),
        m ? /* @__PURE__ */ e.jsx(
          Q,
          {
            fields: m.fields,
            value: I(u.values),
            onChange: (h) => d(i, { ...u, values: h }),
            errors: A(c, `${i}.values`),
            id: `${r}-${i}`,
            content: !0
          }
        ) : /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: "This kind of block no longer exists. Its values are kept." }),
        /* @__PURE__ */ e.jsx(N, { message: c[`${i}.type`] })
      ] }, typeof u.id == "string" ? u.id : i);
    }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", disabled: n.length === 0, children: [
        /* @__PURE__ */ e.jsx(D, {}),
        " Add block"
      ] }) }),
      /* @__PURE__ */ e.jsx(a.DropdownMenuContent, { align: "start", children: n.map((u) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => l([...o, rs(u.type)]), children: u.label }, u.type)) })
    ] }) })
  ] });
}
function Ie({ label: s, badge: t = !1, index: l, count: c, onMove: r, onRemove: n, hidden: o, onHidden: d }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    t ? /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: s }) : /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:font-medium", children: s }),
    o !== void 0 && /* @__PURE__ */ e.jsxs("label", { className: "cms:ml-auto cms:flex cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", children: [
      /* @__PURE__ */ e.jsx(a.Switch, { checked: !o, onCheckedChange: (u) => d(!u), "aria-label": `Show ${s}` }),
      "Show"
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: o === void 0 ? "cms:ml-auto cms:flex" : "cms:flex", children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Move ${s} up`, disabled: l === 0, onClick: () => r(-1), children: /* @__PURE__ */ e.jsx(J, {}) }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Move ${s} down`, disabled: l === c - 1, onClick: () => r(1), children: /* @__PURE__ */ e.jsx(X, {}) }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": `Remove ${s}`, onClick: n, children: /* @__PURE__ */ e.jsx(z, {}) })
    ] })
  ] });
}
function Le({ fields: s, onChange: t, types: l, errors: c, depth: r = 1, idPrefix: n = "field" }) {
  const [o, d] = C.useState(() => /* @__PURE__ */ new Set()), u = (h) => d((x) => {
    const g = new Set(x);
    return g.has(h) ? g.delete(h) : g.add(h), g;
  }), i = (h, x) => t(s.map((g, f) => f === h ? x : g)), m = (h) => {
    const x = ts(h.type, h.label, s);
    t([...s, x]), d((g) => new Set(g).add(x.key));
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:border-dashed cms:p-4 cms:text-sm cms:text-muted-foreground", children: "No fields yet." }),
    s.map((h, x) => {
      const g = l.find((b) => b.type === h.type), f = o.has(h.key) || se(c, String(x)), w = `${n}-${h.key}`;
      return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${se(c, String(x)) ? "cms:border-destructive" : ""}`, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:p-2", children: [
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-expanded": f,
              "aria-controls": w,
              "aria-label": `${f ? "Close" : "Open"} ${h.label || h.handle}`,
              onClick: () => u(h.key),
              children: f ? /* @__PURE__ */ e.jsx(pe, {}) : /* @__PURE__ */ e.jsx(be, {})
            }
          ),
          /* @__PURE__ */ e.jsxs("button", { type: "button", className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:text-left", onClick: () => u(h.key), children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: h.label || h.handle }),
            /* @__PURE__ */ e.jsx("code", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", children: h.handle })
          ] }),
          h.required && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", children: "Required" }),
          /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: g?.label ?? h.type }),
          /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move up", disabled: x === 0, onClick: () => t(H(s, x, -1)), children: /* @__PURE__ */ e.jsx(J, {}) }),
          /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move down", disabled: x === s.length - 1, onClick: () => t(H(s, x, 1)), children: /* @__PURE__ */ e.jsx(X, {}) }),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Remove ${h.label || h.handle}`,
              onClick: () => t(s.filter((b, $) => $ !== x)),
              children: /* @__PURE__ */ e.jsx(z, {})
            }
          )
        ] }),
        f && /* @__PURE__ */ e.jsx(
          js,
          {
            id: w,
            field: h,
            type: g,
            siblings: s,
            onChange: (b) => i(x, b),
            types: l,
            errors: U(c, String(x)),
            depth: r
          }
        )
      ] }, h.key);
    }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", children: [
        /* @__PURE__ */ e.jsx(D, {}),
        " Add field"
      ] }) }),
      /* @__PURE__ */ e.jsx(a.DropdownMenuContent, { align: "start", children: l.filter((h) => !h.hasChildren || r < es).map((h) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => m(h), children: h.label }, h.type)) })
    ] }) })
  ] });
}
const T = { default: "__default", yes: "yes", no: "no" };
function js({ id: s, field: t, type: l, siblings: c, onChange: r, types: n, errors: o, depth: d }) {
  const u = t.config ?? {};
  return /* @__PURE__ */ e.jsxs("div", { id: s, className: "cms:flex cms:flex-col cms:gap-4 cms:border-t cms:p-4", children: [
    !l && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-destructive", children: [
      'The field type "',
      t.type,
      `" isn't registered. Its data is kept; register the type or remove the field.`
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-label`, children: "Label" }),
        /* @__PURE__ */ e.jsx(a.Input, { id: `${s}-label`, value: t.label ?? "", onChange: (i) => r(as(t, i.target.value, c)) }),
        /* @__PURE__ */ e.jsx(N, { message: o.label })
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
        /* @__PURE__ */ e.jsx(N, { message: o.handle })
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
      /* @__PURE__ */ e.jsx(N, { message: o.instructions })
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
    (l?.settings.length ?? 0) > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: l?.settings.map((i) => /* @__PURE__ */ e.jsx(
      P,
      {
        id: `${s}-config-${i.handle}`,
        field: i,
        value: u[i.handle],
        errors: A(o, `config.${i.handle}`),
        onChange: (m) => r({ ...t, config: { ...u, [i.handle]: m } })
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
      /* @__PURE__ */ e.jsx(N, { message: o.validation ?? Object.entries(o).find(([i]) => i.startsWith("validation."))?.[1] })
    ] }),
    l?.hasChildren && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { children: "Fields inside" }),
      /* @__PURE__ */ e.jsx(
        Le,
        {
          fields: t.fields,
          onChange: (i) => r({ ...t, fields: i }),
          types: n,
          errors: U(o, "fields"),
          depth: d + 1,
          idPrefix: s
        }
      ),
      /* @__PURE__ */ e.jsx(N, { message: o.fields })
    ] }),
    /* @__PURE__ */ e.jsx(N, { message: o.type })
  ] });
}
function fs({ kind: s = "blueprint", blueprint: t, fieldTypes: l, usedBy: c = [] }) {
  const r = s === "fieldset" ? "Fieldset" : "Blueprint", n = y(s === "fieldset" ? "cms/fieldsets" : "cms/blueprints"), o = t ? t.title : `New ${r.toLowerCase()}`;
  a.useBreadcrumbs([{ label: `${r}s`, href: n }, { label: o }]);
  const [d, u] = O(), i = p.useForm({ title: t?.title ?? "", handle: t?.handle ?? "" }), [m, h] = C.useState(t !== null), [x, g] = C.useState(() => ze(t?.fields)), f = (k) => l.find((v) => v.type === k)?.hasChildren === !0, w = i.errors, b = (k) => {
    k.preventDefault(), i.transform((v) => ({
      ...t ? { title: v.title } : v,
      fields: Be(x, f)
    })), t ? i.put(`${n}/${t.id}`, { preserveScroll: !0 }) : i.post(n);
  }, $ = () => t && d(
    `Delete the ${r.toLowerCase()} "${t.title}"? Content keeps its values.`,
    () => p.router.delete(`${n}/${t.id}`, { preserveScroll: !0 })
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: b, className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(p.Head, { title: o }),
    u,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(p.Link, { href: n, "aria-label": `Back to ${r.toLowerCase()}s`, children: /* @__PURE__ */ e.jsx(ue, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: o })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        t && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "icon", className: "cms:text-destructive", "aria-label": `Delete ${o}`, onClick: $, children: /* @__PURE__ */ e.jsx(z, {}) }),
        /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: i.processing, children: [
          i.processing && /* @__PURE__ */ e.jsx(Ne, { className: "cms:animate-spin" }),
          t ? "Save" : `Create ${r.toLowerCase()}`
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(N, { message: w.blueprint ?? w.fieldset }),
    /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "title", children: "Title" }),
        /* @__PURE__ */ e.jsx(a.Input, { id: "title", value: i.data.title, required: !0, onChange: (k) => {
          i.setData((v) => ({ ...v, title: k.target.value, handle: m ? v.handle : _e(k.target.value) }));
        } }),
        /* @__PURE__ */ e.jsx(N, { message: w.title })
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
            onChange: (k) => {
              h(!0), i.setData("handle", k.target.value);
            }
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t ? "Set when it was created." : "Lowercase letters, digits and underscores. It can't change later." }),
        /* @__PURE__ */ e.jsx(N, { message: w.handle })
      ] })
    ] }) }),
    c.length > 0 && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      "Used by ",
      c.join(", "),
      ". Changes show there at once."
    ] }),
    /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-3", "aria-labelledby": "fields-heading", children: [
      /* @__PURE__ */ e.jsx("h2", { id: "fields-heading", className: "cms:text-lg cms:font-medium", children: "Fields" }),
      /* @__PURE__ */ e.jsx(Le, { fields: x, onChange: g, types: l, errors: U(w, "fields") }),
      /* @__PURE__ */ e.jsx(N, { message: w.fields })
    ] })
  ] });
}
function Ae({ noun: s, base: t, rows: l, intro: c }) {
  const r = `${s}s`;
  a.useBreadcrumbs([{ label: r }]);
  const [n, o] = O();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(p.Head, { title: r }),
    o,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: r }),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: c })
      ] }),
      /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(p.Link, { href: `${t}/create`, children: [
        /* @__PURE__ */ e.jsx(D, {}),
        " New ",
        s.toLowerCase()
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsx(a.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(a.Table, { children: [
      /* @__PURE__ */ e.jsx(a.TableHeader, { children: /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Title" }),
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Handle" }),
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Fields" }),
        l.some((d) => d.usedBy) && /* @__PURE__ */ e.jsx(a.TableHead, { children: "Used by" }),
        /* @__PURE__ */ e.jsx(a.TableHead, { className: "cms:w-12", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: "Actions" }) })
      ] }) }),
      /* @__PURE__ */ e.jsxs(a.TableBody, { children: [
        l.length === 0 && /* @__PURE__ */ e.jsx(a.TableRow, { children: /* @__PURE__ */ e.jsxs(a.TableCell, { colSpan: 5, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: [
          "No ",
          r.toLowerCase(),
          " yet."
        ] }) }),
        l.map((d) => /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx(p.Link, { href: `${t}/${d.id}/edit`, className: "cms:font-medium cms:hover:underline", children: d.title }) }),
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
              onClick: () => n(
                `Delete the ${s.toLowerCase()} "${d.title}"? Content keeps its values.`,
                () => p.router.delete(`${t}/${d.id}`, { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(z, {})
            }
          ) })
        ] }, d.id))
      ] })
    ] }) })
  ] });
}
function bs({ blueprints: s }) {
  const t = p.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(N, { message: t.blueprint }),
    /* @__PURE__ */ e.jsx(
      Ae,
      {
        noun: "Blueprint",
        base: y("cms/blueprints"),
        rows: s,
        intro: "The fields editors fill in, for each kind of content."
      }
    )
  ] });
}
function L(s) {
  return { draft: "Draft", scheduled: "Scheduled", published: "Published" }[s];
}
function Y(s, t) {
  if (!s) return "—";
  const l = new Date(s);
  return Number.isNaN(l.getTime()) ? "—" : l.toLocaleString(t, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
function vs(s) {
  const t = (l) => String(l).padStart(2, "0");
  return `${s.getFullYear()}-${t(s.getMonth() + 1)}-${t(s.getDate())}T${t(s.getHours())}:${t(s.getMinutes())}`;
}
function V(s, t) {
  try {
    return new Intl.DisplayNames(t ? [t] : void 0, { type: "language" }).of(s.replace("_", "-")) ?? s;
  } catch {
    return s;
  }
}
function Ns(s) {
  const { entry: t } = s;
  return /* @__PURE__ */ e.jsx(Cs, { ...s }, t ? `${t.id}:${t.locale}:${t.version}:${t.status}:${t.trashed}:${t.publishedAt}` : "new");
}
function Cs({ collection: s, fields: t, locales: l = [], shared: c = [], sharedValues: r = {}, entry: n, values: o, revisions: d, can: u }) {
  const i = y(`cms/collections/${s.handle}/entries`), m = n ? y(`cms/entries/${n.id}`) : i, h = n ? o.title : "New entry";
  a.useBreadcrumbs([{ label: s.title, href: i }, { label: h }]);
  const [x, g] = O(), [f, w] = C.useState(!1), b = p.useForm({ ...o, locale: n?.locale ?? null, version: n?.version ?? null, publish: !1, published_at: null }), $ = n ? { locale: n.locale } : {}, k = l.find((j) => j.main)?.code, v = b.errors, M = n !== null && n.status !== "draft" && !n.hasUnpublishedChanges && !b.isDirty, F = n === null ? u.create : u.update && !n.trashed, R = (j = !1, q = null) => {
    b.transform((Me) => ({ ...Me, publish: j, published_at: q })), n ? b.put(m, { preserveScroll: !0, onSuccess: () => w(!1) }) : b.post(m);
  }, E = (j = null) => {
    u.update ? R(!0, j) : n && p.router.post(`${m}/publish`, { ...$, published_at: j }, { preserveScroll: !0, onSuccess: () => w(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (j) => {
    j.preventDefault(), R();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(p.Head, { title: h }),
    g,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(p.Link, { href: i, "aria-label": `Back to ${s.title}`, children: /* @__PURE__ */ e.jsx(ue, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: h }),
        n && /* @__PURE__ */ e.jsx(a.Badge, { variant: n.status === "published" ? "default" : "secondary", children: n.trashed ? "In the trash" : L(n.status) }),
        b.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        n?.trashed && u.delete && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", onClick: () => p.router.post(`${m}/restore`, {}, { preserveScroll: !0 }), children: [
          /* @__PURE__ */ e.jsx(Je, {}),
          " Restore"
        ] }),
        n && !n.trashed && u.delete && /* @__PURE__ */ e.jsx(
          a.Button,
          {
            type: "button",
            variant: "outline",
            size: "icon",
            className: "cms:text-destructive",
            "aria-label": "Move to the trash",
            onClick: () => x(`Move "${o.title}" to the trash? It comes off the site; you can restore it.`, () => p.router.delete(m)),
            children: /* @__PURE__ */ e.jsx(z, {})
          }
        ),
        F && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", variant: n && u.publish ? "outline" : "default", disabled: b.processing, children: [
          b.processing && /* @__PURE__ */ e.jsx(Ne, { className: "cms:animate-spin" }),
          n ? "Save draft" : "Create draft"
        ] }),
        n && !n.trashed && u.publish && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex", children: [
          /* @__PURE__ */ e.jsx(a.Button, { type: "button", className: "cms:rounded-r-none", disabled: b.processing || M, onClick: () => E(), children: n.status === "draft" ? "Publish" : M ? "Published" : "Publish changes" }),
          /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "icon", className: "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": "More publishing options", children: /* @__PURE__ */ e.jsx(pe, {}) }) }),
            /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", children: [
              /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { onSelect: () => w(!0), children: [
                /* @__PURE__ */ e.jsx(Ge, {}),
                " Publish on a date…"
              ] }),
              n.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
                /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => p.router.post(`${m}/unpublish`, $, { preserveScroll: !0 }), children: "Unpublish" })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }),
    n && l.length > 1 && /* @__PURE__ */ e.jsx(
      ws,
      {
        entryUrl: m,
        current: n.locale,
        locales: l,
        canAdd: u.create && !n.trashed,
        canRemove: u.delete && !n.isMain && !n.trashed,
        onRemove: () => x(
          `Remove the ${V(n.locale)} translation of "${o.title}"? Its revisions go with it.`,
          () => p.router.delete(`${m}/translations/${n.locale}`)
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
                value: b.data.title,
                "aria-invalid": v.title !== void 0,
                onChange: (j) => b.setData("title", j.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(N, { message: v.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "slug", children: "Slug" }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "slug",
                className: "cms:font-mono",
                value: b.data.slug,
                placeholder: "Made from the title",
                "aria-invalid": v.slug !== void 0,
                onChange: (j) => b.setData("slug", j.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(N, { message: v.slug })
          ] })
        ] }) }),
        t.length > 0 && /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsx(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: t.map((j) => c.includes(j.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
          /* @__PURE__ */ e.jsx(P, { id: `data-${j.handle}`, field: j, content: !0, value: r[j.handle], errors: {}, onChange: () => {
          } }),
          /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
            "Shared by all languages: edit it in ",
            k ? V(k) : "the main language",
            "."
          ] })
        ] }, j.handle) : /* @__PURE__ */ e.jsx(
          P,
          {
            id: `data-${j.handle}`,
            field: j,
            content: !0,
            value: b.data.data[j.handle],
            errors: A(v, `data.${j.handle}`),
            onChange: (q) => b.setData("data", { ...b.data.data, [j.handle]: q })
          },
          j.handle
        )) }) })
      ] }),
      n && /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:flex-col cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs(a.Card, { children: [
          /* @__PURE__ */ e.jsx(a.CardHeader, { children: /* @__PURE__ */ e.jsx(a.CardTitle, { className: "cms:text-base", children: "Status" }) }),
          /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
            /* @__PURE__ */ e.jsxs("p", { children: [
              L(n.status),
              n.status !== "draft" && n.publishedAt ? ` · ${Y(n.publishedAt)}` : ""
            ] }),
            n.status !== "draft" && n.hasUnpublishedChanges && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The draft has changes the site doesn't show yet." })
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs(a.Card, { children: [
          /* @__PURE__ */ e.jsx(a.CardHeader, { children: /* @__PURE__ */ e.jsx(a.CardTitle, { className: "cms:text-base", children: "Revisions" }) }),
          /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
            d.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "Each publish keeps one." }),
            d.map((j) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
                /* @__PURE__ */ e.jsx("div", { className: "cms:truncate", children: j.title }),
                /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: Y(j.createdAt) })
              ] }),
              u.update && !n.trashed && /* @__PURE__ */ e.jsx(
                a.Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  onClick: () => p.router.post(y(`cms/revisions/${j.id}/restore`), {}, { preserveScroll: !0 }),
                  children: "Restore"
                }
              )
            ] }, j.id))
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(
      ys,
      {
        open: f,
        onClose: () => w(!1),
        processing: b.processing,
        current: n?.publishedAt ?? null,
        onSchedule: (j) => E(j)
      }
    )
  ] });
}
function ws({ entryUrl: s, current: t, locales: l, canAdd: c, canRemove: r, onRemove: n }) {
  return /* @__PURE__ */ e.jsxs("nav", { "aria-label": "Languages", className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
    l.map((o) => {
      const d = `${V(o.code)}${o.main ? " (main)" : ""}`;
      return o.status === null ? c ? /* @__PURE__ */ e.jsxs(
        a.Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "cms:border-dashed",
          onClick: () => p.router.post(`${s}/translations`, { locale: o.code }),
          children: [
            /* @__PURE__ */ e.jsx(D, {}),
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
          onClick: () => o.code !== t && p.router.get(`${s}/edit`, { locale: o.code }),
          children: [
            d,
            /* @__PURE__ */ e.jsx(a.Badge, { variant: o.status === "published" ? "default" : "outline", className: "cms:ml-1", children: L(o.status) })
          ]
        },
        o.code
      );
    }),
    r && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:ml-auto cms:text-destructive", onClick: n, children: "Remove this language" })
  ] });
}
function ys({ open: s, onClose: t, onSchedule: l, current: c, processing: r }) {
  const [n, o] = C.useState("");
  return C.useEffect(() => {
    s && o(vs(c ? new Date(c) : new Date(Date.now() + 864e5)));
  }, [s, c]), /* @__PURE__ */ e.jsx(a.Dialog, { open: s, onOpenChange: (d) => !d && t(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: "Publish on a date" }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: "The entry goes live then; a date in the past publishes it now with that date." })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "published-at", children: "Date and time" }),
      /* @__PURE__ */ e.jsx(a.Input, { id: "published-at", type: "datetime-local", value: n, onChange: (d) => o(d.target.value) }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "In your time zone." })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: t, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", disabled: n === "" || r, onClick: () => l(new Date(n).toISOString()), children: "Publish" })
    ] })
  ] }) });
}
function ks({ collection: s, collections: t, entries: l, query: c, can: r }) {
  a.useBreadcrumbs([{ label: "Entries", href: y("cms/entries") }, ...s ? [{ label: s.title }] : []]);
  const [n, o] = C.useState(c.search), d = s ? y(`cms/collections/${s.handle}/entries`) : "", u = (i) => {
    const m = { ...c, ...i };
    p.router.get(
      d,
      { ...m.search ? { search: m.search } : {}, ...m.trashed ? { trashed: 1 } : {} },
      { preserveState: !0, preserveScroll: !0, replace: !0 }
    );
  };
  return C.useEffect(() => {
    if (n === c.search) return;
    const i = window.setTimeout(() => u({ search: n }), 300);
    return () => window.clearTimeout(i);
  }, [n]), !s || !l ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(p.Head, { title: "Entries" }),
    /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Entries" }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no collections yet. Create one under Structure → Collections, then come back to write its entries." })
  ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(p.Head, { title: s.title }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
        t.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: s.handle, onValueChange: (i) => p.router.get(y(`cms/collections/${i}/entries`)), children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": "Collection", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: t.map((i) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: i.handle, children: i.title }, i.handle)) })
        ] })
      ] }),
      r?.create && !c.trashed && /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(p.Link, { href: `${d}/create`, children: [
        /* @__PURE__ */ e.jsx(D, {}),
        " New entry"
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-sm", children: [
        /* @__PURE__ */ e.jsx(Qe, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            className: "cms:pl-9",
            placeholder: "Search titles",
            "aria-label": "Search titles",
            value: n,
            onChange: (i) => o(i.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(a.Button, { variant: c.trashed ? "secondary" : "ghost", size: "sm", onClick: () => u({ trashed: !c.trashed }), children: c.trashed ? "Back to entries" : "Trash" })
    ] }),
    /* @__PURE__ */ e.jsx(a.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(a.Table, { children: [
      /* @__PURE__ */ e.jsx(a.TableHeader, { children: /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Title" }),
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Status" }),
        /* @__PURE__ */ e.jsx(a.TableHead, { children: s.dated ? "Date" : "Updated" })
      ] }) }),
      /* @__PURE__ */ e.jsxs(a.TableBody, { children: [
        l.data.length === 0 && /* @__PURE__ */ e.jsx(a.TableRow, { children: /* @__PURE__ */ e.jsx(a.TableCell, { colSpan: 3, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: c.trashed ? "The trash is empty." : c.search ? "Nothing matches." : "No entries yet." }) }),
        l.data.map((i) => /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
          /* @__PURE__ */ e.jsxs(a.TableCell, { children: [
            /* @__PURE__ */ e.jsx(p.Link, { href: y(`cms/entries/${i.id}/edit`), className: "cms:font-medium cms:hover:underline", children: i.title }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
              "/",
              i.slug
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-1", children: [
            /* @__PURE__ */ e.jsx(a.Badge, { variant: i.status === "published" ? "default" : "secondary", children: L(i.status) }),
            i.locales.length > 1 && i.locales.filter((m) => !m.main).map((m) => /* @__PURE__ */ e.jsx(
              a.Badge,
              {
                variant: m.status === "published" ? "default" : "outline",
                className: m.status === null ? "cms:opacity-50" : "",
                title: `${m.code}: ${m.status === null ? "not translated" : L(m.status)}`,
                children: m.code.toUpperCase()
              },
              m.code
            ))
          ] }) }),
          /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:text-muted-foreground", children: Y(s.dated ? i.publishedAt : i.updatedAt) })
        ] }, i.id))
      ] })
    ] }) }),
    l.total > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:text-sm cms:text-muted-foreground", children: [
      /* @__PURE__ */ e.jsxs("span", { children: [
        l.from,
        "–",
        l.to,
        " of ",
        l.total
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Previous page",
            disabled: !l.prev_page_url,
            onClick: () => l.prev_page_url && p.router.get(l.prev_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(Ye, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Next page",
            disabled: !l.next_page_url,
            onClick: () => l.next_page_url && p.router.get(l.next_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(be, {})
          }
        )
      ] })
    ] })
  ] });
}
function Ss({ fieldsets: s }) {
  const t = p.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(N, { message: t.fieldset }),
    /* @__PURE__ */ e.jsx(
      Ae,
      {
        noun: "Fieldset",
        base: y("cms/fieldsets"),
        rows: s,
        intro: "Fields shared between blueprints, and the kinds of block of flexible fields."
      }
    )
  ] });
}
const Z = "__top";
function $s({ taxonomy: s, taxonomies: t, terms: l, locales: c, locale: r }) {
  a.useBreadcrumbs([{ label: "Terms", href: y("cms/terms") }, ...s ? [{ label: s.title }] : []]);
  const [n, o] = O(), [d, u] = C.useState(null);
  if (!s)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(p.Head, { title: "Terms" }),
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Terms" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no taxonomies yet. Create one under Structure → Taxonomies (categories, tags…), then add its terms here." })
    ] });
  const i = y(`cms/taxonomies/${s.handle}/terms`);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(p.Head, { title: s.title }),
    o,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
      t.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: s.handle, onValueChange: (m) => p.router.get(y(`cms/taxonomies/${m}/terms`)), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": "Taxonomy", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(a.SelectContent, { children: t.map((m) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: m.handle, children: m.title }, m.handle)) })
      ] }),
      c.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: r, onValueChange: (m) => p.router.get(i, { locale: m }), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:ml-auto cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(a.SelectContent, { children: c.map((m) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: m, children: V(m) }, m)) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsx(a.CardContent, { children: /* @__PURE__ */ e.jsx(
      ne,
      {
        action: i,
        method: "post",
        locale: r,
        terms: l,
        hierarchical: s.hierarchical,
        submitLabel: "Add term"
      },
      `new-${l.length}`
    ) }) }),
    /* @__PURE__ */ e.jsx(a.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs("ul", { className: "cms:divide-y", children: [
      l.length === 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-6 cms:text-center cms:text-muted-foreground", children: "No terms yet." }),
      l.map((m) => {
        const h = l.filter((g) => g.parentId === m.parentId), x = h.findIndex((g) => g.id === m.id);
        return /* @__PURE__ */ e.jsx("li", { className: "cms:p-3", style: { paddingLeft: `${0.75 + m.depth * 1.5}rem` }, children: d === m.id ? /* @__PURE__ */ e.jsx(
          ne,
          {
            action: y(`cms/terms/${m.id}`),
            method: "put",
            locale: r,
            terms: l,
            hierarchical: s.hierarchical,
            term: m,
            submitLabel: "Save",
            onDone: () => u(null)
          }
        ) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0 cms:flex-1", children: [
            m.title !== null ? /* @__PURE__ */ e.jsx("span", { className: "cms:font-medium", children: m.title }) : /* @__PURE__ */ e.jsxs("span", { className: "cms:text-muted-foreground cms:italic", children: [
              m.fallback,
              " · not translated"
            ] }),
            m.slug && /* @__PURE__ */ e.jsxs("span", { className: "cms:ml-2 cms:text-xs cms:text-muted-foreground", children: [
              "/",
              m.slug
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-label": `Move ${m.fallback} up`,
              disabled: x === 0,
              onClick: () => p.router.post(y(`cms/terms/${m.id}/move`), { direction: "up" }, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(J, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-label": `Move ${m.fallback} down`,
              disabled: x === h.length - 1,
              onClick: () => p.router.post(y(`cms/terms/${m.id}/move`), { direction: "down" }, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(X, {})
            }
          ),
          /* @__PURE__ */ e.jsx(a.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Edit ${m.fallback}`, onClick: () => u(m.id), children: /* @__PURE__ */ e.jsx(Xe, {}) }),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Delete ${m.fallback}`,
              onClick: () => n(
                `Delete "${m.fallback}" in every language? Terms under it move up a level.`,
                () => p.router.delete(y(`cms/terms/${m.id}`), { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(z, {})
            }
          )
        ] }) }, m.id);
      })
    ] }) })
  ] });
}
function ne({ action: s, method: t, locale: l, terms: c, hierarchical: r, term: n, submitLabel: o, onDone: d }) {
  const u = p.useForm({ title: n?.title ?? "", slug: n?.slug ?? "", parent_id: n?.parentId ?? null, locale: l }), i = u.errors, m = /* @__PURE__ */ new Set();
  if (n) {
    m.add(n.id);
    const g = c.findIndex((f) => f.id === n.id);
    for (let f = g + 1; f < c.length && (c[f]?.depth ?? 0) > n.depth; f++) m.add(c[f].id);
  }
  const h = (g) => {
    g.preventDefault(), u.submit(t, s, { preserveScroll: !0, onSuccess: () => {
      t === "post" && u.reset("title", "slug"), d?.();
    } });
  }, x = n ? `term-${n.id}` : "new-term";
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: h, className: "cms:grid cms:items-start cms:gap-3 cms:md:grid-cols-[2fr_1.5fr_1.5fr_auto]", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${x}-title`, className: n ? "cms:sr-only" : "", children: "Title" }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: `${x}-title`,
          value: u.data.title,
          placeholder: n?.fallback,
          required: !0,
          onChange: (g) => u.setData("title", g.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(N, { message: i.title })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${x}-slug`, className: n ? "cms:sr-only" : "", children: "Slug" }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: `${x}-slug`,
          className: "cms:font-mono",
          value: u.data.slug,
          placeholder: "Made from the title",
          onChange: (g) => u.setData("slug", g.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(N, { message: i.slug })
    ] }),
    r ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${x}-parent`, className: n ? "cms:sr-only" : "", children: "Under" }),
      /* @__PURE__ */ e.jsxs(
        a.Select,
        {
          value: u.data.parent_id === null ? Z : String(u.data.parent_id),
          onValueChange: (g) => u.setData("parent_id", g === Z ? null : Number(g)),
          children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: `${x}-parent`, children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(a.SelectItem, { value: Z, children: "Top level" }),
              c.filter((g) => !m.has(g.id)).map((g) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: String(g.id), children: [
                "— ".repeat(g.depth),
                g.title ?? g.fallback
              ] }, g.id))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ e.jsx(N, { message: i.parent_id })
    ] }) : /* @__PURE__ */ e.jsx("div", {}),
    /* @__PURE__ */ e.jsxs("div", { className: `cms:flex cms:gap-2 ${n ? "" : "cms:md:mt-6"}`, children: [
      /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: u.processing, children: [
        !n && /* @__PURE__ */ e.jsx(D, {}),
        " ",
        o
      ] }),
      d && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", onClick: d, children: "Cancel" })
    ] })
  ] });
}
Re({
  pages: {
    "Cms/Blueprints/Index": bs,
    "Cms/Blueprints/Form": fs,
    "Cms/Fieldsets/Index": Ss,
    "Cms/Entries/Index": ks,
    "Cms/Entries/Editor": Ns,
    "Cms/Terms/Index": $s
  }
});
export {
  C as R,
  Ts as _,
  y as a,
  S as c,
  _s as i,
  e as j,
  a as u
};
