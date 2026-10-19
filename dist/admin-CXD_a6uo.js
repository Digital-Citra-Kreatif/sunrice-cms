function _e(s, t) {
  for (var n = 0; n < t.length; n++) {
    const l = t[n];
    if (typeof l != "string" && !Array.isArray(l)) {
      for (const c in l)
        if (c !== "default" && !(c in s)) {
          const r = Object.getOwnPropertyDescriptor(l, c);
          r && Object.defineProperty(s, c, r.get ? r : {
            enumerable: !0,
            get: () => l[c]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(s, Symbol.toStringTag, { value: "Module" }));
}
const V = 1;
function Z() {
  const s = globalThis.Sunrice;
  if (!s)
    throw new Error("[sunrice] This script runs outside the Sunrice admin panel (window.Sunrice is missing).");
  return s;
}
function De(s) {
  const t = Z();
  if (t.version !== V)
    throw new Error(`[sunrice] This plugin was built for admin runtime ${V}, but the panel runs ${t.version}. Rebuild it with a matching @sunrice/admin-sdk.`);
  for (const [n, l] of Object.entries(s.pages ?? {}))
    t.registerPage(n, l);
}
function k(s = "") {
  return Z().adminUrl(s);
}
const G = globalThis.Sunrice;
if (!G) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const e = G.modules["react/jsx-runtime"], Y = globalThis.Sunrice;
if (!Y) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const b = Y.modules.react, bs = /* @__PURE__ */ _e({
  __proto__: null
}, [b]), X = globalThis.Sunrice;
if (!X) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const f = X.modules["@inertiajs/react"];
const ze = (s) => s?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
function Be(s, t, n = []) {
  if (t == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: ze(s),
    size: 24,
    node: t,
    ...n.length > 0 ? { aliases: n } : {}
  };
}
const Le = (s) => {
  let t = "", n = !1;
  for (const l of s) {
    if (l === "-" || l === "_" || l <= " ") {
      n = t.length > 0;
      continue;
    }
    t.length === 0 ? t += l.toLowerCase() : t += n ? l.toUpperCase() : l, n = !1;
  }
  return t;
};
const Ae = (s) => {
  const t = Le(s);
  return t.charAt(0).toUpperCase() + t.slice(1);
};
const R = (...s) => s.filter((t, n, l) => !!t && t.trim() !== "" && l.indexOf(t) === n).join(" ").trim();
const T = {
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
function F(s) {
  return s != null;
}
function Ie(s, t = {}) {
  const n = t.attributeNames ?? {}, l = (u) => n[u] ?? u, c = s.size ?? s.width ?? T.width, r = s.size ?? s.height ?? T.height, d = s.aliases?.filter((u) => typeof u == "string" && u.trim() !== "").map((u) => `lucide-${u}`) ?? [], o = [...s.name ? [`lucide-${s.name}`] : [], ...d], x = t.className?.split(" ").filter(Boolean) ?? [], i = t.includeDefaultClasses === !1 ? R(...x) : R("lucide", ...o, ...x), j = t.absoluteStrokeWidth ? Number(t.strokeWidth ?? T["stroke-width"]) * Number(s.size ?? s.width ?? T.width) / Number(t.size ?? t.width ?? T.width) : t.strokeWidth ?? T["stroke-width"];
  return [
    "svg",
    {
      ...Object.entries(T).reduce((u, [h, p]) => (u[l(h)] = p, u), {}),
      ..."color" in t && t.color && {
        [l("stroke")]: t.color
      },
      ..."size" in t && F(t.size) && {
        [l("width")]: t.size,
        [l("height")]: t.size
      },
      ..."width" in t && F(t.width) && {
        [l("width")]: t.width
      },
      ..."height" in t && F(t.height) && {
        [l("height")]: t.height
      },
      [l("stroke-width")]: j,
      ...i && {
        [l("class")]: i
      },
      [l("viewBox")]: `0 0 ${c} ${r}`,
      ...t.hasA11yProp === !1 ? {
        [l("aria-hidden")]: "true"
      } : {},
      ..."attributes" in t && t.attributes
    },
    s.node.map((u) => {
      const [h, p, N] = u, w = t.nonScalingStroke ? { [l("vector-effect")]: "non-scaling-stroke", ...p } : p;
      return N ? [h, w, N] : [h, w];
    })
  ];
}
function Me(s, t = {}) {
  return Ie(s, {
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
const Fe = (s) => {
  for (const t in s)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
  return !1;
}, Ee = b.createContext({}), Re = () => b.useContext(Ee), He = b.forwardRef(
  ({
    color: s,
    size: t,
    width: n,
    height: l,
    strokeWidth: c,
    absoluteStrokeWidth: r,
    nonScalingStroke: d,
    className: o = "",
    children: x,
    iconNode: i = [],
    icon: j = {
      node: i,
      aliases: [],
      size: 24
    },
    ...m
  }, u) => {
    const {
      size: h = 24,
      strokeWidth: p = 2,
      absoluteStrokeWidth: N = !1,
      nonScalingStroke: w = !1,
      color: S = "currentColor",
      className: g = ""
    } = Re() ?? {}, y = !!x || Fe(m), [M, ke, Se = []] = Me(j, {
      color: s ?? S,
      width: n ?? t ?? h,
      height: l ?? t ?? h,
      strokeWidth: c ?? p,
      absoluteStrokeWidth: r ?? N,
      nonScalingStroke: d ?? w,
      className: R(g, o),
      hasA11yProp: y,
      attributes: m
    });
    return b.createElement(
      M,
      {
        ref: u,
        ...ke
      },
      [
        ...Se.map(([$e, Te]) => b.createElement($e, Te)),
        ...Array.isArray(x) ? x : [x]
      ]
    );
  }
);
function C(s, t = [], n = []) {
  const l = typeof s == "string" ? Be(s, t, n) : s, c = b.forwardRef(
    ({ className: r, ...d }, o) => b.createElement(He, {
      ref: o,
      icon: l,
      className: r,
      ...d
    })
  );
  return l.name && (c.displayName = Ae(l.name)), c;
}
const J = {
  name: "arrow-down",
  size: 24,
  node: [
    ["path", { d: "M12 5v14", key: "s699le" }],
    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
  ]
};
J.node;
const Q = C(J);
const ee = {
  name: "arrow-left",
  size: 24,
  node: [
    ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
    ["path", { d: "M19 12H5", key: "x3x0zl" }]
  ]
};
ee.node;
const se = C(ee);
const te = {
  name: "arrow-up",
  size: 24,
  node: [
    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
    ["path", { d: "M12 19V5", key: "x0mq9r" }]
  ]
};
te.node;
const ne = C(te);
const ae = {
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
ae.node;
const Pe = C(ae);
const le = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
le.node;
const ce = C(le);
const re = {
  name: "chevron-left",
  size: 24,
  node: [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]]
};
re.node;
const Oe = C(re);
const ie = {
  name: "chevron-right",
  size: 24,
  node: [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]
};
ie.node;
const oe = C(ie);
const de = {
  name: "loader-circle",
  size: 24,
  node: [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  aliases: ["loader-2"]
};
de.node;
const me = C(de);
const ue = {
  name: "plus",
  size: 24,
  node: [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ]
};
ue.node;
const B = C(ue);
const he = {
  name: "rotate-ccw",
  size: 24,
  node: [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ]
};
he.node;
const Ue = C(he);
const xe = {
  name: "search",
  size: 24,
  node: [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ]
};
xe.node;
const We = C(xe);
const pe = {
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
pe.node;
const D = C(pe), ge = globalThis.Sunrice;
if (!ge) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const a = ge.modules["@sunrice/admin-sdk/ui"];
function O() {
  const [s, t] = b.useState(null), n = /* @__PURE__ */ e.jsx(a.Dialog, { open: s !== null, onOpenChange: (l) => !l && t(null), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
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
  return [(l, c) => t({ message: l, onConfirm: c }), n];
}
const Ve = 5;
let qe = 0;
const fe = () => `f${++qe}`;
function je(s) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function be(s, t) {
  const n = new Set(t.map((r) => r.handle)), l = je(s) || "field";
  let c = l;
  for (let r = 2; n.has(c); r++)
    c = `${l}_${r}`;
  return c;
}
function ve(s) {
  return (s ?? []).map(({ fields: t, ...n }) => ({
    ...n,
    key: fe(),
    fields: ve(t),
    handleTouched: !0
  }));
}
function Ne(s, t) {
  return s.map(({ key: n, handleTouched: l, fields: c, ...r }) => ({
    ...r,
    validation: (r.validation ?? []).map((d) => d.trim()).filter((d) => d !== ""),
    ...t(r.type) ? { fields: Ne(c, t) } : {}
  }));
}
function Ke(s, t, n) {
  return { key: fe(), type: s, label: t, handle: be(t, n), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function A(s, t, n) {
  const l = t + n;
  if (t < 0 || t >= s.length || l < 0 || l >= s.length) return s;
  const c = s.slice(), [r] = c.splice(t, 1);
  return c.splice(l, 0, r), c;
}
function Ze(s, t, n) {
  if (s.handleTouched) return { ...s, label: t };
  const l = n.filter((c) => c.key !== s.key);
  return { ...s, label: t, handle: be(t || s.type, l) };
}
function I(s, t) {
  const n = `${t}.`, l = {};
  for (const [c, r] of Object.entries(s))
    c.startsWith(n) && (l[c.slice(n.length)] = r);
  return l;
}
function L(s, t) {
  const n = s[t];
  return { ...I(s, t), ...n !== void 0 ? { "": n } : {} };
}
function q(s, t) {
  return Object.keys(s).some((n) => n === t || n.startsWith(`${t}.`));
}
function z(s) {
  return s && typeof s == "object" && !Array.isArray(s) ? s : {};
}
function Ge(s, t) {
  if (typeof s != "string" || s === "") return "";
  const n = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(s);
  return n ? t ? `${n[1]}T${n[2] ?? "00:00"}` : n[1] ?? "" : "";
}
function Ye(s) {
  return s === "" ? null : s;
}
function Xe() {
  return { _hidden: !1 };
}
function Je(s) {
  return { type: s, hidden: !1, values: {} };
}
function vs(s) {
  const t = s.replace(/[\u0000- \u007f]+/g, ""), n = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(t);
  return n ? ["http", "https", "mailto", "tel"].includes(n[1].toLowerCase()) : !t.includes("\\");
}
const Qe = b.lazy(() => import("./RichTextEditor-DcuGe1Fr.js").then((s) => ({ default: s.RichTextEditor }))), E = "__none";
function v({ message: s }) {
  return s ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: s }) : null;
}
function K(s) {
  const t = s.config?.options;
  return Array.isArray(t) ? t.flatMap((n) => {
    if (typeof n == "string") return [{ value: n, label: n }];
    if (n && typeof n == "object" && typeof n.value == "string") {
      const { value: l, label: c } = n;
      return [{ value: l, label: c || l }];
    }
    return [];
  }) : [];
}
const es = ["repeater", "group", "flexible", "link", "media", "rich_text"];
function ss(s) {
  if (s.label) return s.label;
  const t = s.handle.replace(/_/g, " ");
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function U({ field: s, value: t, onChange: n, errors: l, id: c, content: r = !1 }) {
  const d = ss(s), o = es.includes(s.type) || s.type === "select" && s.config?.multiple === !0;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", ...o ? { role: "group", "aria-labelledby": `${c}-label` } : {}, children: [
    s.type === "toggle" ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(a.Switch, { id: c, checked: t === !0, onCheckedChange: (x) => n(x) }),
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: c, children: d })
    ] }) : /* @__PURE__ */ e.jsxs(a.Label, { id: `${c}-label`, htmlFor: o ? void 0 : c, children: [
      d,
      s.required && /* @__PURE__ */ e.jsx("span", { className: "cms:text-destructive", children: " *" })
    ] }),
    /* @__PURE__ */ e.jsx(ts, { field: s, value: t, onChange: n, errors: l, id: c, content: r }),
    s.instructions && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s.instructions }),
    /* @__PURE__ */ e.jsx(v, { message: l[""] })
  ] });
}
function ts({ field: s, value: t, onChange: n, errors: l, id: c, content: r }) {
  const d = l[""] !== void 0;
  switch (s.type) {
    case "toggle":
      return null;
    case "textarea":
      return /* @__PURE__ */ e.jsx(
        a.Textarea,
        {
          id: c,
          "aria-invalid": d,
          value: typeof t == "string" ? t : "",
          rows: _(s, "rows") ?? 4,
          onChange: (o) => n(o.target.value)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ e.jsx(b.Suspense, { fallback: /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-48 cms:w-full" }), children: /* @__PURE__ */ e.jsx(Qe, { id: c, labelledBy: `${c}-label`, invalid: d, value: typeof t == "string" ? t : "", onChange: n }) });
    case "number":
      return /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: c,
          type: "number",
          className: "cms:max-w-48",
          "aria-invalid": d,
          value: typeof t == "number" ? String(t) : typeof t == "string" ? t : "",
          min: _(s, "min"),
          max: _(s, "max"),
          step: _(s, "step") ?? "any",
          onChange: (o) => n(o.target.value === "" ? null : Number(o.target.value))
        }
      );
    case "date": {
      const o = s.config?.time === !0;
      return /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: c,
          type: o ? "datetime-local" : "date",
          className: "cms:max-w-64",
          "aria-invalid": d,
          value: Ge(t, o),
          onChange: (x) => n(Ye(x.target.value))
        }
      );
    }
    case "select":
      return s.config?.multiple === !0 ? /* @__PURE__ */ e.jsx(ls, { options: K(s), value: Array.isArray(t) ? t.map(String) : [], onChange: n }) : /* @__PURE__ */ e.jsx(as, { options: K(s), value: typeof t == "string" ? t : null, onChange: n, id: c, required: s.required === !0 });
    case "link":
      return /* @__PURE__ */ e.jsx(cs, { value: z(t), onChange: n, errors: l, id: c });
    case "media":
      return /* @__PURE__ */ e.jsx(
        a.MediaPickerInput,
        {
          id: c,
          invalid: d,
          disabled: !1,
          multiple: s.config?.multiple === !0,
          max: _(s, "max") ?? null,
          types: Array.isArray(s.config?.types) ? s.config.types : [],
          value: typeof t == "number" || Array.isArray(t) && t.every((o) => typeof o == "number") ? t : null,
          onChange: n
        }
      );
    case "group":
      return /* @__PURE__ */ e.jsx(W, { fields: s.fields ?? [], value: z(t), onChange: n, errors: l, id: c, content: r });
    case "repeater":
      return /* @__PURE__ */ e.jsx(is, { field: s, value: Array.isArray(t) ? t : [], onChange: n, errors: l, id: c, content: r });
    case "flexible":
      return /* @__PURE__ */ e.jsx(os, { field: s, value: Array.isArray(t) ? t : [], onChange: n, errors: l, id: c });
    default:
      return /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: c,
          "aria-invalid": d,
          value: typeof t == "string" ? t : "",
          placeholder: ns(s, "placeholder"),
          maxLength: _(s, "max"),
          onChange: (o) => n(o.target.value)
        }
      );
  }
}
function _(s, t) {
  const n = s.config?.[t];
  return typeof n == "number" ? n : void 0;
}
function ns(s, t) {
  const n = s.config?.[t];
  return typeof n == "string" ? n : void 0;
}
function W({ fields: s, value: t, onChange: n, errors: l, id: c, content: r }) {
  return /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-4 cms:rounded-lg cms:border cms:p-4", children: s.map((d) => /* @__PURE__ */ e.jsx(
    U,
    {
      id: `${c}-${d.handle}`,
      field: d,
      value: t[d.handle],
      content: r,
      errors: L(l, d.handle),
      onChange: (o) => n({ ...t, [d.handle]: o })
    },
    d.handle
  )) });
}
function as({ options: s, value: t, onChange: n, id: l, required: c }) {
  return /* @__PURE__ */ e.jsxs(a.Select, { value: t ?? E, onValueChange: (r) => n(r === E ? null : r), children: [
    /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: l, className: "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
    /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
      !c && /* @__PURE__ */ e.jsx(a.SelectItem, { value: E, children: "None" }),
      s.map((r) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: r.value, children: r.label }, r.value))
    ] })
  ] });
}
function ls({ options: s, value: t, onChange: n }) {
  return s.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Nothing to choose from yet." }) : /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2", children: s.map((l) => /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
    /* @__PURE__ */ e.jsx(
      a.Checkbox,
      {
        checked: t.includes(l.value),
        onCheckedChange: (c) => n(c ? s.map((r) => r.value).filter((r) => r === l.value || t.includes(r)) : t.filter((r) => r !== l.value))
      }
    ),
    l.label
  ] }, l.value)) });
}
function cs({ value: s, onChange: t, errors: n, id: l }) {
  const c = (r, d) => {
    const o = { ...s, [r]: d };
    t(o.url === "" || o.url === void 0 ? null : o);
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-2 cms:md:grid-cols-[2fr_1fr_auto] cms:md:items-center", children: [
    /* @__PURE__ */ e.jsx(
      a.Input,
      {
        id: l,
        "aria-label": "Address",
        placeholder: "https://… or /about",
        value: typeof s.url == "string" ? s.url : "",
        onChange: (r) => c("url", r.target.value),
        "aria-invalid": n.url !== void 0
      }
    ),
    /* @__PURE__ */ e.jsx(
      a.Input,
      {
        "aria-label": "Link text",
        placeholder: "Link text",
        value: typeof s.label == "string" ? s.label : "",
        onChange: (r) => c("label", r.target.value)
      }
    ),
    /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
      /* @__PURE__ */ e.jsx(a.Checkbox, { checked: s.new_tab === !0, onCheckedChange: (r) => c("new_tab", r) }),
      "New tab"
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ e.jsx(v, { message: n.url ?? n.label }) })
  ] });
}
function rs(s, t) {
  return !t && (s.fields ?? []).every((n) => n.type === "text");
}
function is({ field: s, value: t, onChange: n, errors: l, id: c, content: r = !1 }) {
  const d = s.fields ?? [], o = t.map(z), x = (m, u) => n(o.map((h, p) => p === m ? u : h)), i = (s.label || "row").toLowerCase().replace(/s$/, ""), j = i.charAt(0).toUpperCase() + i.slice(1);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    o.map((m, u) => rs(s, r) ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
      d.map((h) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            "aria-label": h.label || h.handle,
            placeholder: h.label || h.handle,
            value: typeof m[h.handle] == "string" ? m[h.handle] : "",
            onChange: (p) => x(u, { ...m, [h.handle]: p.target.value })
          }
        ),
        /* @__PURE__ */ e.jsx(v, { message: l[`${u}.${h.handle}`] })
      ] }, h.handle)),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": `Remove ${i} ${u + 1}`, onClick: () => n(o.filter((h, p) => p !== u)), children: /* @__PURE__ */ e.jsx(D, {}) })
    ] }, u) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(
        we,
        {
          label: `${j} ${u + 1}`,
          index: u,
          count: o.length,
          onMove: (h) => n(A(o, u, h)),
          onRemove: () => n(o.filter((h, p) => p !== u)),
          hidden: r ? m._hidden === !0 : void 0,
          onHidden: (h) => x(u, { ...m, _hidden: h })
        }
      ),
      /* @__PURE__ */ e.jsx(W, { fields: d, value: m, onChange: (h) => x(u, h), errors: L(l, String(u)), id: `${c}-${u}`, content: r })
    ] }, typeof m._id == "string" ? m._id : u)),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => n([...o, r ? Xe() : {}]), children: [
      /* @__PURE__ */ e.jsx(B, {}),
      " Add ",
      i
    ] }) })
  ] });
}
function os({ field: s, value: t, onChange: n, errors: l, id: c }) {
  const r = s.blocks ?? [], d = t.map(z), o = (x, i) => n(d.map((j, m) => m === x ? i : j));
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    d.map((x, i) => {
      const j = r.find((m) => m.type === x.type);
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(
          we,
          {
            label: j?.label ?? String(x.type),
            badge: !0,
            index: i,
            count: d.length,
            onMove: (m) => n(A(d, i, m)),
            onRemove: () => n(d.filter((m, u) => u !== i)),
            hidden: x.hidden === !0,
            onHidden: (m) => o(i, { ...x, hidden: m })
          }
        ),
        j ? /* @__PURE__ */ e.jsx(
          W,
          {
            fields: j.fields,
            value: z(x.values),
            onChange: (m) => o(i, { ...x, values: m }),
            errors: L(l, `${i}.values`),
            id: `${c}-${i}`,
            content: !0
          }
        ) : /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: "This kind of block no longer exists. Its values are kept." }),
        /* @__PURE__ */ e.jsx(v, { message: l[`${i}.type`] })
      ] }, typeof x.id == "string" ? x.id : i);
    }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", disabled: r.length === 0, children: [
        /* @__PURE__ */ e.jsx(B, {}),
        " Add block"
      ] }) }),
      /* @__PURE__ */ e.jsx(a.DropdownMenuContent, { align: "start", children: r.map((x) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => n([...d, Je(x.type)]), children: x.label }, x.type)) })
    ] }) })
  ] });
}
function we({ label: s, badge: t = !1, index: n, count: l, onMove: c, onRemove: r, hidden: d, onHidden: o }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    t ? /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: s }) : /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:font-medium", children: s }),
    d !== void 0 && /* @__PURE__ */ e.jsxs("label", { className: "cms:ml-auto cms:flex cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", children: [
      /* @__PURE__ */ e.jsx(a.Switch, { checked: !d, onCheckedChange: (x) => o(!x), "aria-label": `Show ${s}` }),
      "Show"
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: d === void 0 ? "cms:ml-auto cms:flex" : "cms:flex", children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Move ${s} up`, disabled: n === 0, onClick: () => c(-1), children: /* @__PURE__ */ e.jsx(ne, {}) }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Move ${s} down`, disabled: n === l - 1, onClick: () => c(1), children: /* @__PURE__ */ e.jsx(Q, {}) }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": `Remove ${s}`, onClick: r, children: /* @__PURE__ */ e.jsx(D, {}) })
    ] })
  ] });
}
function ye({ fields: s, onChange: t, types: n, errors: l, depth: c = 1, idPrefix: r = "field" }) {
  const [d, o] = b.useState(() => /* @__PURE__ */ new Set()), x = (m) => o((u) => {
    const h = new Set(u);
    return h.has(m) ? h.delete(m) : h.add(m), h;
  }), i = (m, u) => t(s.map((h, p) => p === m ? u : h)), j = (m) => {
    const u = Ke(m.type, m.label, s);
    t([...s, u]), o((h) => new Set(h).add(u.key));
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:border-dashed cms:p-4 cms:text-sm cms:text-muted-foreground", children: "No fields yet." }),
    s.map((m, u) => {
      const h = n.find((w) => w.type === m.type), p = d.has(m.key) || q(l, String(u)), N = `${r}-${m.key}`;
      return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${q(l, String(u)) ? "cms:border-destructive" : ""}`, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:p-2", children: [
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-expanded": p,
              "aria-controls": N,
              "aria-label": `${p ? "Close" : "Open"} ${m.label || m.handle}`,
              onClick: () => x(m.key),
              children: p ? /* @__PURE__ */ e.jsx(ce, {}) : /* @__PURE__ */ e.jsx(oe, {})
            }
          ),
          /* @__PURE__ */ e.jsxs("button", { type: "button", className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:text-left", onClick: () => x(m.key), children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: m.label || m.handle }),
            /* @__PURE__ */ e.jsx("code", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", children: m.handle })
          ] }),
          m.required && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", children: "Required" }),
          /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: h?.label ?? m.type }),
          /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move up", disabled: u === 0, onClick: () => t(A(s, u, -1)), children: /* @__PURE__ */ e.jsx(ne, {}) }),
          /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move down", disabled: u === s.length - 1, onClick: () => t(A(s, u, 1)), children: /* @__PURE__ */ e.jsx(Q, {}) }),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Remove ${m.label || m.handle}`,
              onClick: () => t(s.filter((w, S) => S !== u)),
              children: /* @__PURE__ */ e.jsx(D, {})
            }
          )
        ] }),
        p && /* @__PURE__ */ e.jsx(
          ds,
          {
            id: N,
            field: m,
            type: h,
            siblings: s,
            onChange: (w) => i(u, w),
            types: n,
            errors: I(l, String(u)),
            depth: c
          }
        )
      ] }, m.key);
    }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", children: [
        /* @__PURE__ */ e.jsx(B, {}),
        " Add field"
      ] }) }),
      /* @__PURE__ */ e.jsx(a.DropdownMenuContent, { align: "start", children: n.filter((m) => !m.hasChildren || c < Ve).map((m) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => j(m), children: m.label }, m.type)) })
    ] }) })
  ] });
}
const $ = { default: "__default", yes: "yes", no: "no" };
function ds({ id: s, field: t, type: n, siblings: l, onChange: c, types: r, errors: d, depth: o }) {
  const x = t.config ?? {};
  return /* @__PURE__ */ e.jsxs("div", { id: s, className: "cms:flex cms:flex-col cms:gap-4 cms:border-t cms:p-4", children: [
    !n && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-destructive", children: [
      'The field type "',
      t.type,
      `" isn't registered. Its data is kept; register the type or remove the field.`
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-label`, children: "Label" }),
        /* @__PURE__ */ e.jsx(a.Input, { id: `${s}-label`, value: t.label ?? "", onChange: (i) => c(Ze(t, i.target.value, l)) }),
        /* @__PURE__ */ e.jsx(v, { message: d.label })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-handle`, children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: `${s}-handle`,
            className: "cms:font-mono",
            value: t.handle,
            onChange: (i) => c({ ...t, handle: i.target.value, handleTouched: !0 })
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "How templates read it. Renaming it hides values saved under the old one." }),
        /* @__PURE__ */ e.jsx(v, { message: d.handle })
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
          onChange: (i) => c({ ...t, instructions: i.target.value || null })
        }
      ),
      /* @__PURE__ */ e.jsx(v, { message: d.instructions })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-6", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Switch, { id: `${s}-required`, checked: t.required === !0, onCheckedChange: (i) => c({ ...t, required: i }) }),
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-required`, children: "Required" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-translatable`, children: "Per language" }),
        /* @__PURE__ */ e.jsxs(
          a.Select,
          {
            value: t.translatable === !0 ? $.yes : t.translatable === !1 ? $.no : $.default,
            onValueChange: (i) => c({ ...t, translatable: i === $.yes ? !0 : i === $.no ? !1 : null }),
            children: [
              /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: `${s}-translatable`, className: "cms:w-48", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
              /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: $.default, children: "As the type decides" }),
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: $.yes, children: "Yes, translated" }),
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: $.no, children: "No, shared" })
              ] })
            ]
          }
        )
      ] })
    ] }),
    (n?.settings.length ?? 0) > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: n?.settings.map((i) => /* @__PURE__ */ e.jsx(
      U,
      {
        id: `${s}-config-${i.handle}`,
        field: i,
        value: x[i.handle],
        errors: L(d, `config.${i.handle}`),
        onChange: (j) => c({ ...t, config: { ...x, [i.handle]: j } })
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
          onChange: (i) => c({ ...t, validation: i.target.value.split(`
`) })
        }
      ),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Laravel rules, one per line." }),
      /* @__PURE__ */ e.jsx(v, { message: d.validation ?? Object.entries(d).find(([i]) => i.startsWith("validation."))?.[1] })
    ] }),
    n?.hasChildren && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { children: "Fields inside" }),
      /* @__PURE__ */ e.jsx(
        ye,
        {
          fields: t.fields,
          onChange: (i) => c({ ...t, fields: i }),
          types: r,
          errors: I(d, "fields"),
          depth: o + 1,
          idPrefix: s
        }
      ),
      /* @__PURE__ */ e.jsx(v, { message: d.fields })
    ] }),
    /* @__PURE__ */ e.jsx(v, { message: d.type })
  ] });
}
function ms({ kind: s = "blueprint", blueprint: t, fieldTypes: n, usedBy: l = [] }) {
  const c = s === "fieldset" ? "Fieldset" : "Blueprint", r = k(s === "fieldset" ? "cms/fieldsets" : "cms/blueprints"), d = t ? t.title : `New ${c.toLowerCase()}`;
  a.useBreadcrumbs([{ label: `${c}s`, href: r }, { label: d }]);
  const [o, x] = O(), i = f.useForm({ title: t?.title ?? "", handle: t?.handle ?? "" }), [j, m] = b.useState(t !== null), [u, h] = b.useState(() => ve(t?.fields)), p = (g) => n.find((y) => y.type === g)?.hasChildren === !0, N = i.errors, w = (g) => {
    g.preventDefault(), i.transform((y) => ({
      ...t ? { title: y.title } : y,
      fields: Ne(u, p)
    })), t ? i.put(`${r}/${t.id}`, { preserveScroll: !0 }) : i.post(r);
  }, S = () => t && o(
    `Delete the ${c.toLowerCase()} "${t.title}"? Content keeps its values.`,
    () => f.router.delete(`${r}/${t.id}`, { preserveScroll: !0 })
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: w, className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: d }),
    x,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: r, "aria-label": `Back to ${c.toLowerCase()}s`, children: /* @__PURE__ */ e.jsx(se, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: d })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        t && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "icon", className: "cms:text-destructive", "aria-label": `Delete ${d}`, onClick: S, children: /* @__PURE__ */ e.jsx(D, {}) }),
        /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: i.processing, children: [
          i.processing && /* @__PURE__ */ e.jsx(me, { className: "cms:animate-spin" }),
          t ? "Save" : `Create ${c.toLowerCase()}`
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(v, { message: N.blueprint ?? N.fieldset }),
    /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "title", children: "Title" }),
        /* @__PURE__ */ e.jsx(a.Input, { id: "title", value: i.data.title, required: !0, onChange: (g) => {
          i.setData((y) => ({ ...y, title: g.target.value, handle: j ? y.handle : je(g.target.value) }));
        } }),
        /* @__PURE__ */ e.jsx(v, { message: N.title })
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
            onChange: (g) => {
              m(!0), i.setData("handle", g.target.value);
            }
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t ? "Set when it was created." : "Lowercase letters, digits and underscores. It can't change later." }),
        /* @__PURE__ */ e.jsx(v, { message: N.handle })
      ] })
    ] }) }),
    l.length > 0 && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      "Used by ",
      l.join(", "),
      ". Changes show there at once."
    ] }),
    /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-3", "aria-labelledby": "fields-heading", children: [
      /* @__PURE__ */ e.jsx("h2", { id: "fields-heading", className: "cms:text-lg cms:font-medium", children: "Fields" }),
      /* @__PURE__ */ e.jsx(ye, { fields: u, onChange: h, types: n, errors: I(N, "fields") }),
      /* @__PURE__ */ e.jsx(v, { message: N.fields })
    ] })
  ] });
}
function Ce({ noun: s, base: t, rows: n, intro: l }) {
  const c = `${s}s`;
  a.useBreadcrumbs([{ label: c }]);
  const [r, d] = O();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: c }),
    d,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: c }),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: l })
      ] }),
      /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(f.Link, { href: `${t}/create`, children: [
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
        n.some((o) => o.usedBy) && /* @__PURE__ */ e.jsx(a.TableHead, { children: "Used by" }),
        /* @__PURE__ */ e.jsx(a.TableHead, { className: "cms:w-12", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: "Actions" }) })
      ] }) }),
      /* @__PURE__ */ e.jsxs(a.TableBody, { children: [
        n.length === 0 && /* @__PURE__ */ e.jsx(a.TableRow, { children: /* @__PURE__ */ e.jsxs(a.TableCell, { colSpan: 5, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: [
          "No ",
          c.toLowerCase(),
          " yet."
        ] }) }),
        n.map((o) => /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx(f.Link, { href: `${t}/${o.id}/edit`, className: "cms:font-medium cms:hover:underline", children: o.title }) }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: o.handle }) }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: o.fields }),
          o.usedBy && /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:text-muted-foreground", children: o.usedBy.join(", ") || "—" }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx(
            a.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Delete ${o.title}`,
              onClick: () => r(
                `Delete the ${s.toLowerCase()} "${o.title}"? Content keeps its values.`,
                () => f.router.delete(`${t}/${o.id}`, { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(D, {})
            }
          ) })
        ] }, o.id))
      ] })
    ] }) })
  ] });
}
function us({ blueprints: s }) {
  const t = f.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(v, { message: t.blueprint }),
    /* @__PURE__ */ e.jsx(
      Ce,
      {
        noun: "Blueprint",
        base: k("cms/blueprints"),
        rows: s,
        intro: "The fields editors fill in, for each kind of content."
      }
    )
  ] });
}
function H(s) {
  return { draft: "Draft", scheduled: "Scheduled", published: "Published" }[s];
}
function P(s, t) {
  if (!s) return "—";
  const n = new Date(s);
  return Number.isNaN(n.getTime()) ? "—" : n.toLocaleString(t, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
function hs(s) {
  const t = (n) => String(n).padStart(2, "0");
  return `${s.getFullYear()}-${t(s.getMonth() + 1)}-${t(s.getDate())}T${t(s.getHours())}:${t(s.getMinutes())}`;
}
function xs(s) {
  const { entry: t } = s;
  return /* @__PURE__ */ e.jsx(ps, { ...s }, t ? `${t.id}:${t.version}:${t.status}:${t.trashed}:${t.publishedAt}` : "new");
}
function ps({ collection: s, fields: t, entry: n, values: l, revisions: c, can: r }) {
  const d = k(`cms/collections/${s.handle}/entries`), o = n ? k(`cms/entries/${n.id}`) : d, x = n ? l.title : "New entry";
  a.useBreadcrumbs([{ label: s.title, href: d }, { label: x }]);
  const [i, j] = O(), [m, u] = b.useState(!1), h = f.useForm({ ...l, version: n?.version ?? null, publish: !1, published_at: null }), p = h.errors, N = n === null ? r.create : r.update && !n.trashed, w = (g = !1, y = null) => {
    h.transform((M) => ({ ...M, publish: g, published_at: y })), n ? h.put(o, { preserveScroll: !0, onSuccess: () => u(!1) }) : h.post(o);
  }, S = (g = null) => {
    r.update ? w(!0, g) : n && f.router.post(`${o}/publish`, { published_at: g }, { preserveScroll: !0, onSuccess: () => u(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (g) => {
    g.preventDefault(), w();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: x }),
    j,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: d, "aria-label": `Back to ${s.title}`, children: /* @__PURE__ */ e.jsx(se, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: x }),
        n && /* @__PURE__ */ e.jsx(a.Badge, { variant: n.status === "published" ? "default" : "secondary", children: n.trashed ? "In the trash" : H(n.status) }),
        h.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        n?.trashed && r.delete && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", onClick: () => f.router.post(`${o}/restore`, {}, { preserveScroll: !0 }), children: [
          /* @__PURE__ */ e.jsx(Ue, {}),
          " Restore"
        ] }),
        n && !n.trashed && r.delete && /* @__PURE__ */ e.jsx(
          a.Button,
          {
            type: "button",
            variant: "outline",
            size: "icon",
            className: "cms:text-destructive",
            "aria-label": "Move to the trash",
            onClick: () => i(`Move "${l.title}" to the trash? It comes off the site; you can restore it.`, () => f.router.delete(o)),
            children: /* @__PURE__ */ e.jsx(D, {})
          }
        ),
        N && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", variant: n && r.publish ? "outline" : "default", disabled: h.processing, children: [
          h.processing && /* @__PURE__ */ e.jsx(me, { className: "cms:animate-spin" }),
          n ? "Save draft" : "Create draft"
        ] }),
        n && !n.trashed && r.publish && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex", children: [
          /* @__PURE__ */ e.jsx(a.Button, { type: "button", className: "cms:rounded-r-none", disabled: h.processing, onClick: () => S(), children: n.status === "draft" ? "Publish" : "Publish changes" }),
          /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "icon", className: "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": "More publishing options", children: /* @__PURE__ */ e.jsx(ce, {}) }) }),
            /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", children: [
              /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { onSelect: () => u(!0), children: [
                /* @__PURE__ */ e.jsx(Pe, {}),
                " Publish on a date…"
              ] }),
              n.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
                /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => f.router.post(`${o}/unpublish`, {}, { preserveScroll: !0 }), children: "Unpublish" })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }),
    p.version && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: p.version }),
    (p.entry || p.published_at) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: p.entry ?? p.published_at }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_18rem]", children: [
      /* @__PURE__ */ e.jsxs("fieldset", { disabled: !N, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-[2fr_1fr]", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "title", children: "Title" }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "title",
                value: h.data.title,
                "aria-invalid": p.title !== void 0,
                onChange: (g) => h.setData("title", g.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(v, { message: p.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "slug", children: "Slug" }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "slug",
                className: "cms:font-mono",
                value: h.data.slug,
                placeholder: "Made from the title",
                "aria-invalid": p.slug !== void 0,
                onChange: (g) => h.setData("slug", g.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(v, { message: p.slug })
          ] })
        ] }) }),
        t.length > 0 && /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsx(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: t.map((g) => /* @__PURE__ */ e.jsx(
          U,
          {
            id: `data-${g.handle}`,
            field: g,
            content: !0,
            value: h.data.data[g.handle],
            errors: L(p, `data.${g.handle}`),
            onChange: (y) => h.setData("data", { ...h.data.data, [g.handle]: y })
          },
          g.handle
        )) }) })
      ] }),
      n && /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:flex-col cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs(a.Card, { children: [
          /* @__PURE__ */ e.jsx(a.CardHeader, { children: /* @__PURE__ */ e.jsx(a.CardTitle, { className: "cms:text-base", children: "Status" }) }),
          /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
            /* @__PURE__ */ e.jsxs("p", { children: [
              H(n.status),
              n.status !== "draft" && n.publishedAt ? ` · ${P(n.publishedAt)}` : ""
            ] }),
            n.status !== "draft" && n.hasUnpublishedChanges && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The draft has changes the site doesn't show yet." })
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs(a.Card, { children: [
          /* @__PURE__ */ e.jsx(a.CardHeader, { children: /* @__PURE__ */ e.jsx(a.CardTitle, { className: "cms:text-base", children: "Revisions" }) }),
          /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
            c.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "Each publish keeps one." }),
            c.map((g) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
                /* @__PURE__ */ e.jsx("div", { className: "cms:truncate", children: g.title }),
                /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: P(g.createdAt) })
              ] }),
              r.update && !n.trashed && /* @__PURE__ */ e.jsx(
                a.Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  onClick: () => f.router.post(k(`cms/revisions/${g.id}/restore`), {}, { preserveScroll: !0 }),
                  children: "Restore"
                }
              )
            ] }, g.id))
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(
      gs,
      {
        open: m,
        onClose: () => u(!1),
        processing: h.processing,
        current: n?.publishedAt ?? null,
        onSchedule: (g) => S(g)
      }
    )
  ] });
}
function gs({ open: s, onClose: t, onSchedule: n, current: l, processing: c }) {
  const [r, d] = b.useState("");
  return b.useEffect(() => {
    s && d(hs(l ? new Date(l) : new Date(Date.now() + 864e5)));
  }, [s, l]), /* @__PURE__ */ e.jsx(a.Dialog, { open: s, onOpenChange: (o) => !o && t(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: "Publish on a date" }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: "The entry goes live then; a date in the past publishes it now with that date." })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "published-at", children: "Date and time" }),
      /* @__PURE__ */ e.jsx(a.Input, { id: "published-at", type: "datetime-local", value: r, onChange: (o) => d(o.target.value) }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "In your time zone." })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: t, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", disabled: r === "" || c, onClick: () => n(new Date(r).toISOString()), children: "Publish" })
    ] })
  ] }) });
}
function fs({ collection: s, collections: t, entries: n, query: l, can: c }) {
  a.useBreadcrumbs([{ label: "Entries", href: k("cms/entries") }, ...s ? [{ label: s.title }] : []]);
  const [r, d] = b.useState(l.search), o = s ? k(`cms/collections/${s.handle}/entries`) : "", x = (i) => {
    const j = { ...l, ...i };
    f.router.get(
      o,
      { ...j.search ? { search: j.search } : {}, ...j.trashed ? { trashed: 1 } : {} },
      { preserveState: !0, preserveScroll: !0, replace: !0 }
    );
  };
  return b.useEffect(() => {
    if (r === l.search) return;
    const i = window.setTimeout(() => x({ search: r }), 300);
    return () => window.clearTimeout(i);
  }, [r]), !s || !n ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: "Entries" }),
    /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Entries" }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no collections yet. Create one under Structure → Collections, then come back to write its entries." })
  ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: s.title }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
        t.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: s.handle, onValueChange: (i) => f.router.get(k(`cms/collections/${i}/entries`)), children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": "Collection", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: t.map((i) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: i.handle, children: i.title }, i.handle)) })
        ] })
      ] }),
      c?.create && !l.trashed && /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(f.Link, { href: `${o}/create`, children: [
        /* @__PURE__ */ e.jsx(B, {}),
        " New entry"
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-sm", children: [
        /* @__PURE__ */ e.jsx(We, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            className: "cms:pl-9",
            placeholder: "Search titles",
            "aria-label": "Search titles",
            value: r,
            onChange: (i) => d(i.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(a.Button, { variant: l.trashed ? "secondary" : "ghost", size: "sm", onClick: () => x({ trashed: !l.trashed }), children: l.trashed ? "Back to entries" : "Trash" })
    ] }),
    /* @__PURE__ */ e.jsx(a.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(a.Table, { children: [
      /* @__PURE__ */ e.jsx(a.TableHeader, { children: /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Title" }),
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Status" }),
        /* @__PURE__ */ e.jsx(a.TableHead, { children: s.dated ? "Date" : "Updated" })
      ] }) }),
      /* @__PURE__ */ e.jsxs(a.TableBody, { children: [
        n.data.length === 0 && /* @__PURE__ */ e.jsx(a.TableRow, { children: /* @__PURE__ */ e.jsx(a.TableCell, { colSpan: 3, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: l.trashed ? "The trash is empty." : l.search ? "Nothing matches." : "No entries yet." }) }),
        n.data.map((i) => /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
          /* @__PURE__ */ e.jsxs(a.TableCell, { children: [
            /* @__PURE__ */ e.jsx(f.Link, { href: k(`cms/entries/${i.id}/edit`), className: "cms:font-medium cms:hover:underline", children: i.title }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
              "/",
              i.slug
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx(a.Badge, { variant: i.status === "published" ? "default" : "secondary", children: H(i.status) }) }),
          /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:text-muted-foreground", children: P(s.dated ? i.publishedAt : i.updatedAt) })
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
            onClick: () => n.prev_page_url && f.router.get(n.prev_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(Oe, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Next page",
            disabled: !n.next_page_url,
            onClick: () => n.next_page_url && f.router.get(n.next_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(oe, {})
          }
        )
      ] })
    ] })
  ] });
}
function js({ fieldsets: s }) {
  const t = f.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(v, { message: t.fieldset }),
    /* @__PURE__ */ e.jsx(
      Ce,
      {
        noun: "Fieldset",
        base: k("cms/fieldsets"),
        rows: s,
        intro: "Fields shared between blueprints, and the kinds of block of flexible fields."
      }
    )
  ] });
}
De({
  pages: {
    "Cms/Blueprints/Index": us,
    "Cms/Blueprints/Form": ms,
    "Cms/Fieldsets/Index": js,
    "Cms/Entries/Index": fs,
    "Cms/Entries/Editor": xs
  }
});
export {
  b as R,
  bs as _,
  k as a,
  C as c,
  vs as i,
  e as j,
  a as u
};
