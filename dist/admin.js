function K() {
  const s = globalThis.Sunrice;
  if (!s)
    throw new Error("[sunrice] This script runs outside the Sunrice admin panel (window.Sunrice is missing).");
  return s;
}
function Te(s) {
  const t = K();
  if (t.version !== 1)
    throw new Error(`[sunrice] This plugin was built for admin runtime 1, but the panel runs ${t.version}. Rebuild it with a matching @sunrice/admin-sdk.`);
  for (const [a, l] of Object.entries(s.pages ?? {}))
    t.registerPage(a, l);
}
function k(s = "") {
  return K().adminUrl(s);
}
const G = globalThis.Sunrice;
if (!G) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const e = G.modules["react/jsx-runtime"], Y = globalThis.Sunrice;
if (!Y) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const N = Y.modules.react, Z = globalThis.Sunrice;
if (!Z) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const j = Z.modules["@inertiajs/react"];
const De = (s) => s?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
function _e(s, t, a = []) {
  if (t == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: De(s),
    size: 24,
    node: t,
    ...a.length > 0 ? { aliases: a } : {}
  };
}
const Be = (s) => {
  let t = "", a = !1;
  for (const l of s) {
    if (l === "-" || l === "_" || l <= " ") {
      a = t.length > 0;
      continue;
    }
    t.length === 0 ? t += l.toLowerCase() : t += a ? l.toUpperCase() : l, a = !1;
  }
  return t;
};
const ze = (s) => {
  const t = Be(s);
  return t.charAt(0).toUpperCase() + t.slice(1);
};
const H = (...s) => s.filter((t, a, l) => !!t && t.trim() !== "" && l.indexOf(t) === a).join(" ").trim();
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
function Le(s, t = {}) {
  const a = t.attributeNames ?? {}, l = (u) => a[u] ?? u, c = s.size ?? s.width ?? T.width, r = s.size ?? s.height ?? T.height, d = s.aliases?.filter((u) => typeof u == "string" && u.trim() !== "").map((u) => `lucide-${u}`) ?? [], o = [...s.name ? [`lucide-${s.name}`] : [], ...d], x = t.className?.split(" ").filter(Boolean) ?? [], i = t.includeDefaultClasses === !1 ? H(...x) : H("lucide", ...o, ...x), f = t.absoluteStrokeWidth ? Number(t.strokeWidth ?? T["stroke-width"]) * Number(s.size ?? s.width ?? T.width) / Number(t.size ?? t.width ?? T.width) : t.strokeWidth ?? T["stroke-width"];
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
      [l("stroke-width")]: f,
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
      const [h, p, v] = u, w = t.nonScalingStroke ? { [l("vector-effect")]: "non-scaling-stroke", ...p } : p;
      return v ? [h, w, v] : [h, w];
    })
  ];
}
function Ie(s, t = {}) {
  return Le(s, {
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
const Ae = (s) => {
  for (const t in s)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
  return !1;
}, Me = N.createContext({}), Fe = () => N.useContext(Me), Ee = N.forwardRef(
  ({
    color: s,
    size: t,
    width: a,
    height: l,
    strokeWidth: c,
    absoluteStrokeWidth: r,
    nonScalingStroke: d,
    className: o = "",
    children: x,
    iconNode: i = [],
    icon: f = {
      node: i,
      aliases: [],
      size: 24
    },
    ...m
  }, u) => {
    const {
      size: h = 24,
      strokeWidth: p = 2,
      absoluteStrokeWidth: v = !1,
      nonScalingStroke: w = !1,
      color: S = "currentColor",
      className: g = ""
    } = Fe() ?? {}, y = !!x || Ae(m), [M, Ce, ke = []] = Ie(f, {
      color: s ?? S,
      width: a ?? t ?? h,
      height: l ?? t ?? h,
      strokeWidth: c ?? p,
      absoluteStrokeWidth: r ?? v,
      nonScalingStroke: d ?? w,
      className: H(g, o),
      hasA11yProp: y,
      attributes: m
    });
    return N.createElement(
      M,
      {
        ref: u,
        ...Ce
      },
      [
        ...ke.map(([Se, $e]) => N.createElement(Se, $e)),
        ...Array.isArray(x) ? x : [x]
      ]
    );
  }
);
function C(s, t = [], a = []) {
  const l = typeof s == "string" ? _e(s, t, a) : s, c = N.forwardRef(
    ({ className: r, ...d }, o) => N.createElement(Ee, {
      ref: o,
      icon: l,
      className: r,
      ...d
    })
  );
  return l.name && (c.displayName = ze(l.name)), c;
}
const X = {
  name: "arrow-down",
  size: 24,
  node: [
    ["path", { d: "M12 5v14", key: "s699le" }],
    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
  ]
};
X.node;
const J = C(X);
const Q = {
  name: "arrow-left",
  size: 24,
  node: [
    ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
    ["path", { d: "M19 12H5", key: "x3x0zl" }]
  ]
};
Q.node;
const ee = C(Q);
const se = {
  name: "arrow-up",
  size: 24,
  node: [
    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
    ["path", { d: "M12 19V5", key: "x0mq9r" }]
  ]
};
se.node;
const te = C(se);
const ne = {
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
ne.node;
const He = C(ne);
const ae = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
ae.node;
const le = C(ae);
const ce = {
  name: "chevron-left",
  size: 24,
  node: [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]]
};
ce.node;
const Re = C(ce);
const re = {
  name: "chevron-right",
  size: 24,
  node: [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]
};
re.node;
const ie = C(re);
const oe = {
  name: "loader-circle",
  size: 24,
  node: [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  aliases: ["loader-2"]
};
oe.node;
const de = C(oe);
const me = {
  name: "plus",
  size: 24,
  node: [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ]
};
me.node;
const z = C(me);
const ue = {
  name: "rotate-ccw",
  size: 24,
  node: [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ]
};
ue.node;
const Pe = C(ue);
const he = {
  name: "search",
  size: 24,
  node: [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ]
};
he.node;
const Ve = C(he);
const xe = {
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
xe.node;
const _ = C(xe), pe = globalThis.Sunrice;
if (!pe) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const n = pe.modules["@sunrice/admin-sdk/ui"];
function V() {
  const [s, t] = N.useState(null), a = /* @__PURE__ */ e.jsx(n.Dialog, { open: s !== null, onOpenChange: (l) => !l && t(null), children: /* @__PURE__ */ e.jsxs(n.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(n.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(n.DialogTitle, { children: "Are you sure?" }),
      /* @__PURE__ */ e.jsx(n.DialogDescription, { children: s?.message })
    ] }),
    /* @__PURE__ */ e.jsxs(n.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "outline", onClick: () => t(null), children: "Cancel" }),
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "destructive", onClick: () => {
        s?.onConfirm(), t(null);
      }, children: "Delete" })
    ] })
  ] }) });
  return [(l, c) => t({ message: l, onConfirm: c }), a];
}
const Oe = 5;
let Ue = 0;
const ge = () => `f${++Ue}`;
function je(s) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function fe(s, t) {
  const a = new Set(t.map((r) => r.handle)), l = je(s) || "field";
  let c = l;
  for (let r = 2; a.has(c); r++)
    c = `${l}_${r}`;
  return c;
}
function be(s) {
  return (s ?? []).map(({ fields: t, ...a }) => ({
    ...a,
    key: ge(),
    fields: be(t),
    handleTouched: !0
  }));
}
function ve(s, t) {
  return s.map(({ key: a, handleTouched: l, fields: c, ...r }) => ({
    ...r,
    validation: (r.validation ?? []).map((d) => d.trim()).filter((d) => d !== ""),
    ...t(r.type) ? { fields: ve(c, t) } : {}
  }));
}
function We(s, t, a) {
  return { key: ge(), type: s, label: t, handle: fe(t, a), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function I(s, t, a) {
  const l = t + a;
  if (t < 0 || t >= s.length || l < 0 || l >= s.length) return s;
  const c = s.slice(), [r] = c.splice(t, 1);
  return c.splice(l, 0, r), c;
}
function qe(s, t, a) {
  if (s.handleTouched) return { ...s, label: t };
  const l = a.filter((c) => c.key !== s.key);
  return { ...s, label: t, handle: fe(t || s.type, l) };
}
function A(s, t) {
  const a = `${t}.`, l = {};
  for (const [c, r] of Object.entries(s))
    c.startsWith(a) && (l[c.slice(a.length)] = r);
  return l;
}
function L(s, t) {
  const a = s[t];
  return { ...A(s, t), ...a !== void 0 ? { "": a } : {} };
}
function W(s, t) {
  return Object.keys(s).some((a) => a === t || a.startsWith(`${t}.`));
}
function B(s) {
  return s && typeof s == "object" && !Array.isArray(s) ? s : {};
}
function Ke(s, t) {
  if (typeof s != "string" || s === "") return "";
  const a = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(s);
  return a ? t ? `${a[1]}T${a[2] ?? "00:00"}` : a[1] ?? "" : "";
}
function Ge(s) {
  return s === "" ? null : s;
}
function Ye() {
  return { _hidden: !1 };
}
function Ze(s) {
  return { type: s, hidden: !1, values: {} };
}
const E = "__none";
function b({ message: s }) {
  return s ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: s }) : null;
}
function q(s) {
  const t = s.config?.options;
  return Array.isArray(t) ? t.flatMap((a) => {
    if (typeof a == "string") return [{ value: a, label: a }];
    if (a && typeof a == "object" && typeof a.value == "string") {
      const { value: l, label: c } = a;
      return [{ value: l, label: c || l }];
    }
    return [];
  }) : [];
}
const Xe = ["repeater", "group", "flexible", "link", "media"];
function Je(s) {
  if (s.label) return s.label;
  const t = s.handle.replace(/_/g, " ");
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function O({ field: s, value: t, onChange: a, errors: l, id: c, content: r = !1 }) {
  const d = Je(s), o = Xe.includes(s.type) || s.type === "select" && s.config?.multiple === !0;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", ...o ? { role: "group", "aria-labelledby": `${c}-label` } : {}, children: [
    s.type === "toggle" ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(n.Switch, { id: c, checked: t === !0, onCheckedChange: (x) => a(x) }),
      /* @__PURE__ */ e.jsx(n.Label, { htmlFor: c, children: d })
    ] }) : /* @__PURE__ */ e.jsxs(n.Label, { id: `${c}-label`, htmlFor: o ? void 0 : c, children: [
      d,
      s.required && /* @__PURE__ */ e.jsx("span", { className: "cms:text-destructive", children: " *" })
    ] }),
    /* @__PURE__ */ e.jsx(Qe, { field: s, value: t, onChange: a, errors: l, id: c, content: r }),
    s.instructions && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s.instructions }),
    /* @__PURE__ */ e.jsx(b, { message: l[""] })
  ] });
}
function Qe({ field: s, value: t, onChange: a, errors: l, id: c, content: r }) {
  const d = l[""] !== void 0;
  switch (s.type) {
    case "toggle":
      return null;
    case "textarea":
      return /* @__PURE__ */ e.jsx(
        n.Textarea,
        {
          id: c,
          "aria-invalid": d,
          value: typeof t == "string" ? t : "",
          rows: D(s, "rows") ?? 4,
          onChange: (o) => a(o.target.value)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx(
          n.Textarea,
          {
            id: c,
            "aria-invalid": d,
            className: "cms:font-mono",
            rows: 8,
            value: typeof t == "string" ? t : "",
            onChange: (o) => a(o.target.value)
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "HTML. Scripts and styles are removed when saved." })
      ] });
    case "number":
      return /* @__PURE__ */ e.jsx(
        n.Input,
        {
          id: c,
          type: "number",
          className: "cms:max-w-48",
          "aria-invalid": d,
          value: typeof t == "number" ? String(t) : typeof t == "string" ? t : "",
          min: D(s, "min"),
          max: D(s, "max"),
          step: D(s, "step") ?? "any",
          onChange: (o) => a(o.target.value === "" ? null : Number(o.target.value))
        }
      );
    case "date": {
      const o = s.config?.time === !0;
      return /* @__PURE__ */ e.jsx(
        n.Input,
        {
          id: c,
          type: o ? "datetime-local" : "date",
          className: "cms:max-w-64",
          "aria-invalid": d,
          value: Ke(t, o),
          onChange: (x) => a(Ge(x.target.value))
        }
      );
    }
    case "select":
      return s.config?.multiple === !0 ? /* @__PURE__ */ e.jsx(ts, { options: q(s), value: Array.isArray(t) ? t.map(String) : [], onChange: a }) : /* @__PURE__ */ e.jsx(ss, { options: q(s), value: typeof t == "string" ? t : null, onChange: a, id: c, required: s.required === !0 });
    case "link":
      return /* @__PURE__ */ e.jsx(ns, { value: B(t), onChange: a, errors: l, id: c });
    case "media":
      return /* @__PURE__ */ e.jsx(
        n.MediaPickerInput,
        {
          id: c,
          invalid: d,
          disabled: !1,
          multiple: s.config?.multiple === !0,
          max: D(s, "max") ?? null,
          types: Array.isArray(s.config?.types) ? s.config.types : [],
          value: typeof t == "number" || Array.isArray(t) && t.every((o) => typeof o == "number") ? t : null,
          onChange: a
        }
      );
    case "group":
      return /* @__PURE__ */ e.jsx(U, { fields: s.fields ?? [], value: B(t), onChange: a, errors: l, id: c, content: r });
    case "repeater":
      return /* @__PURE__ */ e.jsx(ls, { field: s, value: Array.isArray(t) ? t : [], onChange: a, errors: l, id: c, content: r });
    case "flexible":
      return /* @__PURE__ */ e.jsx(cs, { field: s, value: Array.isArray(t) ? t : [], onChange: a, errors: l, id: c });
    default:
      return /* @__PURE__ */ e.jsx(
        n.Input,
        {
          id: c,
          "aria-invalid": d,
          value: typeof t == "string" ? t : "",
          placeholder: es(s, "placeholder"),
          maxLength: D(s, "max"),
          onChange: (o) => a(o.target.value)
        }
      );
  }
}
function D(s, t) {
  const a = s.config?.[t];
  return typeof a == "number" ? a : void 0;
}
function es(s, t) {
  const a = s.config?.[t];
  return typeof a == "string" ? a : void 0;
}
function U({ fields: s, value: t, onChange: a, errors: l, id: c, content: r }) {
  return /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-4 cms:rounded-lg cms:border cms:p-4", children: s.map((d) => /* @__PURE__ */ e.jsx(
    O,
    {
      id: `${c}-${d.handle}`,
      field: d,
      value: t[d.handle],
      content: r,
      errors: L(l, d.handle),
      onChange: (o) => a({ ...t, [d.handle]: o })
    },
    d.handle
  )) });
}
function ss({ options: s, value: t, onChange: a, id: l, required: c }) {
  return /* @__PURE__ */ e.jsxs(n.Select, { value: t ?? E, onValueChange: (r) => a(r === E ? null : r), children: [
    /* @__PURE__ */ e.jsx(n.SelectTrigger, { id: l, className: "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
    /* @__PURE__ */ e.jsxs(n.SelectContent, { children: [
      !c && /* @__PURE__ */ e.jsx(n.SelectItem, { value: E, children: "None" }),
      s.map((r) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: r.value, children: r.label }, r.value))
    ] })
  ] });
}
function ts({ options: s, value: t, onChange: a }) {
  return s.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Nothing to choose from yet." }) : /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2", children: s.map((l) => /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
    /* @__PURE__ */ e.jsx(
      n.Checkbox,
      {
        checked: t.includes(l.value),
        onCheckedChange: (c) => a(c ? s.map((r) => r.value).filter((r) => r === l.value || t.includes(r)) : t.filter((r) => r !== l.value))
      }
    ),
    l.label
  ] }, l.value)) });
}
function ns({ value: s, onChange: t, errors: a, id: l }) {
  const c = (r, d) => {
    const o = { ...s, [r]: d };
    t(o.url === "" || o.url === void 0 ? null : o);
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-2 cms:md:grid-cols-[2fr_1fr_auto] cms:md:items-center", children: [
    /* @__PURE__ */ e.jsx(
      n.Input,
      {
        id: l,
        "aria-label": "Address",
        placeholder: "https://… or /about",
        value: typeof s.url == "string" ? s.url : "",
        onChange: (r) => c("url", r.target.value),
        "aria-invalid": a.url !== void 0
      }
    ),
    /* @__PURE__ */ e.jsx(
      n.Input,
      {
        "aria-label": "Link text",
        placeholder: "Link text",
        value: typeof s.label == "string" ? s.label : "",
        onChange: (r) => c("label", r.target.value)
      }
    ),
    /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
      /* @__PURE__ */ e.jsx(n.Checkbox, { checked: s.new_tab === !0, onCheckedChange: (r) => c("new_tab", r) }),
      "New tab"
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ e.jsx(b, { message: a.url ?? a.label }) })
  ] });
}
function as(s, t) {
  return !t && (s.fields ?? []).every((a) => a.type === "text");
}
function ls({ field: s, value: t, onChange: a, errors: l, id: c, content: r = !1 }) {
  const d = s.fields ?? [], o = t.map(B), x = (m, u) => a(o.map((h, p) => p === m ? u : h)), i = (s.label || "row").toLowerCase().replace(/s$/, ""), f = i.charAt(0).toUpperCase() + i.slice(1);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    o.map((m, u) => as(s, r) ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
      d.map((h) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(
          n.Input,
          {
            "aria-label": h.label || h.handle,
            placeholder: h.label || h.handle,
            value: typeof m[h.handle] == "string" ? m[h.handle] : "",
            onChange: (p) => x(u, { ...m, [h.handle]: p.target.value })
          }
        ),
        /* @__PURE__ */ e.jsx(b, { message: l[`${u}.${h.handle}`] })
      ] }, h.handle)),
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": `Remove ${i} ${u + 1}`, onClick: () => a(o.filter((h, p) => p !== u)), children: /* @__PURE__ */ e.jsx(_, {}) })
    ] }, u) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(
        Ne,
        {
          label: `${f} ${u + 1}`,
          index: u,
          count: o.length,
          onMove: (h) => a(I(o, u, h)),
          onRemove: () => a(o.filter((h, p) => p !== u)),
          hidden: r ? m._hidden === !0 : void 0,
          onHidden: (h) => x(u, { ...m, _hidden: h })
        }
      ),
      /* @__PURE__ */ e.jsx(U, { fields: d, value: m, onChange: (h) => x(u, h), errors: L(l, String(u)), id: `${c}-${u}`, content: r })
    ] }, typeof m._id == "string" ? m._id : u)),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", size: "sm", onClick: () => a([...o, r ? Ye() : {}]), children: [
      /* @__PURE__ */ e.jsx(z, {}),
      " Add ",
      i
    ] }) })
  ] });
}
function cs({ field: s, value: t, onChange: a, errors: l, id: c }) {
  const r = s.blocks ?? [], d = t.map(B), o = (x, i) => a(d.map((f, m) => m === x ? i : f));
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    d.map((x, i) => {
      const f = r.find((m) => m.type === x.type);
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(
          Ne,
          {
            label: f?.label ?? String(x.type),
            badge: !0,
            index: i,
            count: d.length,
            onMove: (m) => a(I(d, i, m)),
            onRemove: () => a(d.filter((m, u) => u !== i)),
            hidden: x.hidden === !0,
            onHidden: (m) => o(i, { ...x, hidden: m })
          }
        ),
        f ? /* @__PURE__ */ e.jsx(
          U,
          {
            fields: f.fields,
            value: B(x.values),
            onChange: (m) => o(i, { ...x, values: m }),
            errors: L(l, `${i}.values`),
            id: `${c}-${i}`,
            content: !0
          }
        ) : /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: "This kind of block no longer exists. Its values are kept." }),
        /* @__PURE__ */ e.jsx(b, { message: l[`${i}.type`] })
      ] }, typeof x.id == "string" ? x.id : i);
    }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(n.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(n.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", size: "sm", disabled: r.length === 0, children: [
        /* @__PURE__ */ e.jsx(z, {}),
        " Add block"
      ] }) }),
      /* @__PURE__ */ e.jsx(n.DropdownMenuContent, { align: "start", children: r.map((x) => /* @__PURE__ */ e.jsx(n.DropdownMenuItem, { onSelect: () => a([...d, Ze(x.type)]), children: x.label }, x.type)) })
    ] }) })
  ] });
}
function Ne({ label: s, badge: t = !1, index: a, count: l, onMove: c, onRemove: r, hidden: d, onHidden: o }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    t ? /* @__PURE__ */ e.jsx(n.Badge, { variant: "secondary", children: s }) : /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:font-medium", children: s }),
    d !== void 0 && /* @__PURE__ */ e.jsxs("label", { className: "cms:ml-auto cms:flex cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", children: [
      /* @__PURE__ */ e.jsx(n.Switch, { checked: !d, onCheckedChange: (x) => o(!x), "aria-label": `Show ${s}` }),
      "Show"
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: d === void 0 ? "cms:ml-auto cms:flex" : "cms:flex", children: [
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Move ${s} up`, disabled: a === 0, onClick: () => c(-1), children: /* @__PURE__ */ e.jsx(te, {}) }),
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Move ${s} down`, disabled: a === l - 1, onClick: () => c(1), children: /* @__PURE__ */ e.jsx(J, {}) }),
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": `Remove ${s}`, onClick: r, children: /* @__PURE__ */ e.jsx(_, {}) })
    ] })
  ] });
}
function we({ fields: s, onChange: t, types: a, errors: l, depth: c = 1, idPrefix: r = "field" }) {
  const [d, o] = N.useState(() => /* @__PURE__ */ new Set()), x = (m) => o((u) => {
    const h = new Set(u);
    return h.has(m) ? h.delete(m) : h.add(m), h;
  }), i = (m, u) => t(s.map((h, p) => p === m ? u : h)), f = (m) => {
    const u = We(m.type, m.label, s);
    t([...s, u]), o((h) => new Set(h).add(u.key));
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:border-dashed cms:p-4 cms:text-sm cms:text-muted-foreground", children: "No fields yet." }),
    s.map((m, u) => {
      const h = a.find((w) => w.type === m.type), p = d.has(m.key) || W(l, String(u)), v = `${r}-${m.key}`;
      return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${W(l, String(u)) ? "cms:border-destructive" : ""}`, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:p-2", children: [
          /* @__PURE__ */ e.jsx(
            n.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-expanded": p,
              "aria-controls": v,
              "aria-label": `${p ? "Close" : "Open"} ${m.label || m.handle}`,
              onClick: () => x(m.key),
              children: p ? /* @__PURE__ */ e.jsx(le, {}) : /* @__PURE__ */ e.jsx(ie, {})
            }
          ),
          /* @__PURE__ */ e.jsxs("button", { type: "button", className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:text-left", onClick: () => x(m.key), children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: m.label || m.handle }),
            /* @__PURE__ */ e.jsx("code", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", children: m.handle })
          ] }),
          m.required && /* @__PURE__ */ e.jsx(n.Badge, { variant: "outline", children: "Required" }),
          /* @__PURE__ */ e.jsx(n.Badge, { variant: "secondary", children: h?.label ?? m.type }),
          /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move up", disabled: u === 0, onClick: () => t(I(s, u, -1)), children: /* @__PURE__ */ e.jsx(te, {}) }),
          /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move down", disabled: u === s.length - 1, onClick: () => t(I(s, u, 1)), children: /* @__PURE__ */ e.jsx(J, {}) }),
          /* @__PURE__ */ e.jsx(
            n.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Remove ${m.label || m.handle}`,
              onClick: () => t(s.filter((w, S) => S !== u)),
              children: /* @__PURE__ */ e.jsx(_, {})
            }
          )
        ] }),
        p && /* @__PURE__ */ e.jsx(
          rs,
          {
            id: v,
            field: m,
            type: h,
            siblings: s,
            onChange: (w) => i(u, w),
            types: a,
            errors: A(l, String(u)),
            depth: c
          }
        )
      ] }, m.key);
    }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(n.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(n.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", size: "sm", children: [
        /* @__PURE__ */ e.jsx(z, {}),
        " Add field"
      ] }) }),
      /* @__PURE__ */ e.jsx(n.DropdownMenuContent, { align: "start", children: a.filter((m) => !m.hasChildren || c < Oe).map((m) => /* @__PURE__ */ e.jsx(n.DropdownMenuItem, { onSelect: () => f(m), children: m.label }, m.type)) })
    ] }) })
  ] });
}
const $ = { default: "__default", yes: "yes", no: "no" };
function rs({ id: s, field: t, type: a, siblings: l, onChange: c, types: r, errors: d, depth: o }) {
  const x = t.config ?? {};
  return /* @__PURE__ */ e.jsxs("div", { id: s, className: "cms:flex cms:flex-col cms:gap-4 cms:border-t cms:p-4", children: [
    !a && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-destructive", children: [
      'The field type "',
      t.type,
      `" isn't registered. Its data is kept; register the type or remove the field.`
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: `${s}-label`, children: "Label" }),
        /* @__PURE__ */ e.jsx(n.Input, { id: `${s}-label`, value: t.label ?? "", onChange: (i) => c(qe(t, i.target.value, l)) }),
        /* @__PURE__ */ e.jsx(b, { message: d.label })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: `${s}-handle`, children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          n.Input,
          {
            id: `${s}-handle`,
            className: "cms:font-mono",
            value: t.handle,
            onChange: (i) => c({ ...t, handle: i.target.value, handleTouched: !0 })
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "How templates read it. Renaming it hides values saved under the old one." }),
        /* @__PURE__ */ e.jsx(b, { message: d.handle })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(n.Label, { htmlFor: `${s}-instructions`, children: "Instructions" }),
      /* @__PURE__ */ e.jsx(
        n.Input,
        {
          id: `${s}-instructions`,
          value: t.instructions ?? "",
          placeholder: "Shown under the field to editors",
          onChange: (i) => c({ ...t, instructions: i.target.value || null })
        }
      ),
      /* @__PURE__ */ e.jsx(b, { message: d.instructions })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-6", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(n.Switch, { id: `${s}-required`, checked: t.required === !0, onCheckedChange: (i) => c({ ...t, required: i }) }),
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: `${s}-required`, children: "Required" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: `${s}-translatable`, children: "Per language" }),
        /* @__PURE__ */ e.jsxs(
          n.Select,
          {
            value: t.translatable === !0 ? $.yes : t.translatable === !1 ? $.no : $.default,
            onValueChange: (i) => c({ ...t, translatable: i === $.yes ? !0 : i === $.no ? !1 : null }),
            children: [
              /* @__PURE__ */ e.jsx(n.SelectTrigger, { id: `${s}-translatable`, className: "cms:w-48", children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
              /* @__PURE__ */ e.jsxs(n.SelectContent, { children: [
                /* @__PURE__ */ e.jsx(n.SelectItem, { value: $.default, children: "As the type decides" }),
                /* @__PURE__ */ e.jsx(n.SelectItem, { value: $.yes, children: "Yes, translated" }),
                /* @__PURE__ */ e.jsx(n.SelectItem, { value: $.no, children: "No, shared" })
              ] })
            ]
          }
        )
      ] })
    ] }),
    (a?.settings.length ?? 0) > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: a?.settings.map((i) => /* @__PURE__ */ e.jsx(
      O,
      {
        id: `${s}-config-${i.handle}`,
        field: i,
        value: x[i.handle],
        errors: L(d, `config.${i.handle}`),
        onChange: (f) => c({ ...t, config: { ...x, [i.handle]: f } })
      },
      i.handle
    )) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(n.Label, { htmlFor: `${s}-validation`, children: "Extra rules" }),
      /* @__PURE__ */ e.jsx(
        n.Textarea,
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
      /* @__PURE__ */ e.jsx(b, { message: d.validation ?? Object.entries(d).find(([i]) => i.startsWith("validation."))?.[1] })
    ] }),
    a?.hasChildren && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(n.Label, { children: "Fields inside" }),
      /* @__PURE__ */ e.jsx(
        we,
        {
          fields: t.fields,
          onChange: (i) => c({ ...t, fields: i }),
          types: r,
          errors: A(d, "fields"),
          depth: o + 1,
          idPrefix: s
        }
      ),
      /* @__PURE__ */ e.jsx(b, { message: d.fields })
    ] }),
    /* @__PURE__ */ e.jsx(b, { message: d.type })
  ] });
}
function is({ kind: s = "blueprint", blueprint: t, fieldTypes: a, usedBy: l = [] }) {
  const c = s === "fieldset" ? "Fieldset" : "Blueprint", r = k(s === "fieldset" ? "cms/fieldsets" : "cms/blueprints"), d = t ? t.title : `New ${c.toLowerCase()}`;
  n.useBreadcrumbs([{ label: `${c}s`, href: r }, { label: d }]);
  const [o, x] = V(), i = j.useForm({ title: t?.title ?? "", handle: t?.handle ?? "" }), [f, m] = N.useState(t !== null), [u, h] = N.useState(() => be(t?.fields)), p = (g) => a.find((y) => y.type === g)?.hasChildren === !0, v = i.errors, w = (g) => {
    g.preventDefault(), i.transform((y) => ({
      ...t ? { title: y.title } : y,
      fields: ve(u, p)
    })), t ? i.put(`${r}/${t.id}`, { preserveScroll: !0 }) : i.post(r);
  }, S = () => t && o(
    `Delete the ${c.toLowerCase()} "${t.title}"? Content keeps its values.`,
    () => j.router.delete(`${r}/${t.id}`, { preserveScroll: !0 })
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: w, className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(j.Head, { title: d }),
    x,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(n.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(j.Link, { href: r, "aria-label": `Back to ${c.toLowerCase()}s`, children: /* @__PURE__ */ e.jsx(ee, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: d })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        t && /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "outline", size: "icon", className: "cms:text-destructive", "aria-label": `Delete ${d}`, onClick: S, children: /* @__PURE__ */ e.jsx(_, {}) }),
        /* @__PURE__ */ e.jsxs(n.Button, { type: "submit", disabled: i.processing, children: [
          i.processing && /* @__PURE__ */ e.jsx(de, { className: "cms:animate-spin" }),
          t ? "Save" : `Create ${c.toLowerCase()}`
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(b, { message: v.blueprint ?? v.fieldset }),
    /* @__PURE__ */ e.jsx(n.Card, { children: /* @__PURE__ */ e.jsxs(n.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "title", children: "Title" }),
        /* @__PURE__ */ e.jsx(n.Input, { id: "title", value: i.data.title, required: !0, onChange: (g) => {
          i.setData((y) => ({ ...y, title: g.target.value, handle: f ? y.handle : je(g.target.value) }));
        } }),
        /* @__PURE__ */ e.jsx(b, { message: v.title })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "handle", children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          n.Input,
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
        /* @__PURE__ */ e.jsx(b, { message: v.handle })
      ] })
    ] }) }),
    l.length > 0 && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      "Used by ",
      l.join(", "),
      ". Changes show there at once."
    ] }),
    /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-3", "aria-labelledby": "fields-heading", children: [
      /* @__PURE__ */ e.jsx("h2", { id: "fields-heading", className: "cms:text-lg cms:font-medium", children: "Fields" }),
      /* @__PURE__ */ e.jsx(we, { fields: u, onChange: h, types: a, errors: A(v, "fields") }),
      /* @__PURE__ */ e.jsx(b, { message: v.fields })
    ] })
  ] });
}
function ye({ noun: s, base: t, rows: a, intro: l }) {
  const c = `${s}s`;
  n.useBreadcrumbs([{ label: c }]);
  const [r, d] = V();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(j.Head, { title: c }),
    d,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: c }),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: l })
      ] }),
      /* @__PURE__ */ e.jsx(n.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(j.Link, { href: `${t}/create`, children: [
        /* @__PURE__ */ e.jsx(z, {}),
        " New ",
        s.toLowerCase()
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsx(n.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(n.Table, { children: [
      /* @__PURE__ */ e.jsx(n.TableHeader, { children: /* @__PURE__ */ e.jsxs(n.TableRow, { children: [
        /* @__PURE__ */ e.jsx(n.TableHead, { children: "Title" }),
        /* @__PURE__ */ e.jsx(n.TableHead, { children: "Handle" }),
        /* @__PURE__ */ e.jsx(n.TableHead, { children: "Fields" }),
        a.some((o) => o.usedBy) && /* @__PURE__ */ e.jsx(n.TableHead, { children: "Used by" }),
        /* @__PURE__ */ e.jsx(n.TableHead, { className: "cms:w-12", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: "Actions" }) })
      ] }) }),
      /* @__PURE__ */ e.jsxs(n.TableBody, { children: [
        a.length === 0 && /* @__PURE__ */ e.jsx(n.TableRow, { children: /* @__PURE__ */ e.jsxs(n.TableCell, { colSpan: 5, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: [
          "No ",
          c.toLowerCase(),
          " yet."
        ] }) }),
        a.map((o) => /* @__PURE__ */ e.jsxs(n.TableRow, { children: [
          /* @__PURE__ */ e.jsx(n.TableCell, { children: /* @__PURE__ */ e.jsx(j.Link, { href: `${t}/${o.id}/edit`, className: "cms:font-medium cms:hover:underline", children: o.title }) }),
          /* @__PURE__ */ e.jsx(n.TableCell, { children: /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: o.handle }) }),
          /* @__PURE__ */ e.jsx(n.TableCell, { children: o.fields }),
          o.usedBy && /* @__PURE__ */ e.jsx(n.TableCell, { className: "cms:text-muted-foreground", children: o.usedBy.join(", ") || "—" }),
          /* @__PURE__ */ e.jsx(n.TableCell, { children: /* @__PURE__ */ e.jsx(
            n.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Delete ${o.title}`,
              onClick: () => r(
                `Delete the ${s.toLowerCase()} "${o.title}"? Content keeps its values.`,
                () => j.router.delete(`${t}/${o.id}`, { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(_, {})
            }
          ) })
        ] }, o.id))
      ] })
    ] }) })
  ] });
}
function os({ blueprints: s }) {
  const t = j.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(b, { message: t.blueprint }),
    /* @__PURE__ */ e.jsx(
      ye,
      {
        noun: "Blueprint",
        base: k("cms/blueprints"),
        rows: s,
        intro: "The fields editors fill in, for each kind of content."
      }
    )
  ] });
}
function R(s) {
  return { draft: "Draft", scheduled: "Scheduled", published: "Published" }[s];
}
function P(s, t) {
  if (!s) return "—";
  const a = new Date(s);
  return Number.isNaN(a.getTime()) ? "—" : a.toLocaleString(t, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
function ds(s) {
  const t = (a) => String(a).padStart(2, "0");
  return `${s.getFullYear()}-${t(s.getMonth() + 1)}-${t(s.getDate())}T${t(s.getHours())}:${t(s.getMinutes())}`;
}
function ms(s) {
  const { entry: t } = s;
  return /* @__PURE__ */ e.jsx(us, { ...s }, t ? `${t.id}:${t.version}:${t.status}:${t.trashed}:${t.publishedAt}` : "new");
}
function us({ collection: s, fields: t, entry: a, values: l, revisions: c, can: r }) {
  const d = k(`cms/collections/${s.handle}/entries`), o = a ? k(`cms/entries/${a.id}`) : d, x = a ? l.title : "New entry";
  n.useBreadcrumbs([{ label: s.title, href: d }, { label: x }]);
  const [i, f] = V(), [m, u] = N.useState(!1), h = j.useForm({ ...l, version: a?.version ?? null, publish: !1, published_at: null }), p = h.errors, v = a === null ? r.create : r.update && !a.trashed, w = (g = !1, y = null) => {
    h.transform((M) => ({ ...M, publish: g, published_at: y })), a ? h.put(o, { preserveScroll: !0, onSuccess: () => u(!1) }) : h.post(o);
  }, S = (g = null) => {
    r.update ? w(!0, g) : a && j.router.post(`${o}/publish`, { published_at: g }, { preserveScroll: !0, onSuccess: () => u(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (g) => {
    g.preventDefault(), w();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(j.Head, { title: x }),
    f,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(n.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(j.Link, { href: d, "aria-label": `Back to ${s.title}`, children: /* @__PURE__ */ e.jsx(ee, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: x }),
        a && /* @__PURE__ */ e.jsx(n.Badge, { variant: a.status === "published" ? "default" : "secondary", children: a.trashed ? "In the trash" : R(a.status) }),
        h.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        a?.trashed && r.delete && /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", onClick: () => j.router.post(`${o}/restore`, {}, { preserveScroll: !0 }), children: [
          /* @__PURE__ */ e.jsx(Pe, {}),
          " Restore"
        ] }),
        a && !a.trashed && r.delete && /* @__PURE__ */ e.jsx(
          n.Button,
          {
            type: "button",
            variant: "outline",
            size: "icon",
            className: "cms:text-destructive",
            "aria-label": "Move to the trash",
            onClick: () => i(`Move "${l.title}" to the trash? It comes off the site; you can restore it.`, () => j.router.delete(o)),
            children: /* @__PURE__ */ e.jsx(_, {})
          }
        ),
        v && /* @__PURE__ */ e.jsxs(n.Button, { type: "submit", variant: a && r.publish ? "outline" : "default", disabled: h.processing, children: [
          h.processing && /* @__PURE__ */ e.jsx(de, { className: "cms:animate-spin" }),
          a ? "Save draft" : "Create draft"
        ] }),
        a && !a.trashed && r.publish && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex", children: [
          /* @__PURE__ */ e.jsx(n.Button, { type: "button", className: "cms:rounded-r-none", disabled: h.processing, onClick: () => S(), children: a.status === "draft" ? "Publish" : "Publish changes" }),
          /* @__PURE__ */ e.jsxs(n.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(n.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(n.Button, { type: "button", size: "icon", className: "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": "More publishing options", children: /* @__PURE__ */ e.jsx(le, {}) }) }),
            /* @__PURE__ */ e.jsxs(n.DropdownMenuContent, { align: "end", children: [
              /* @__PURE__ */ e.jsxs(n.DropdownMenuItem, { onSelect: () => u(!0), children: [
                /* @__PURE__ */ e.jsx(He, {}),
                " Publish on a date…"
              ] }),
              a.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(n.DropdownMenuSeparator, {}),
                /* @__PURE__ */ e.jsx(n.DropdownMenuItem, { onSelect: () => j.router.post(`${o}/unpublish`, {}, { preserveScroll: !0 }), children: "Unpublish" })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }),
    p.version && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: p.version }),
    (p.entry || p.published_at) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: p.entry ?? p.published_at }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_18rem]", children: [
      /* @__PURE__ */ e.jsxs("fieldset", { disabled: !v, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(n.Card, { children: /* @__PURE__ */ e.jsxs(n.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-[2fr_1fr]", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "title", children: "Title" }),
            /* @__PURE__ */ e.jsx(
              n.Input,
              {
                id: "title",
                value: h.data.title,
                "aria-invalid": p.title !== void 0,
                onChange: (g) => h.setData("title", g.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(b, { message: p.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "slug", children: "Slug" }),
            /* @__PURE__ */ e.jsx(
              n.Input,
              {
                id: "slug",
                className: "cms:font-mono",
                value: h.data.slug,
                placeholder: "Made from the title",
                "aria-invalid": p.slug !== void 0,
                onChange: (g) => h.setData("slug", g.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(b, { message: p.slug })
          ] })
        ] }) }),
        t.length > 0 && /* @__PURE__ */ e.jsx(n.Card, { children: /* @__PURE__ */ e.jsx(n.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: t.map((g) => /* @__PURE__ */ e.jsx(
          O,
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
      a && /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:flex-col cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs(n.Card, { children: [
          /* @__PURE__ */ e.jsx(n.CardHeader, { children: /* @__PURE__ */ e.jsx(n.CardTitle, { className: "cms:text-base", children: "Status" }) }),
          /* @__PURE__ */ e.jsxs(n.CardContent, { className: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
            /* @__PURE__ */ e.jsxs("p", { children: [
              R(a.status),
              a.status !== "draft" && a.publishedAt ? ` · ${P(a.publishedAt)}` : ""
            ] }),
            a.status !== "draft" && a.hasUnpublishedChanges && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The draft has changes the site doesn't show yet." })
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs(n.Card, { children: [
          /* @__PURE__ */ e.jsx(n.CardHeader, { children: /* @__PURE__ */ e.jsx(n.CardTitle, { className: "cms:text-base", children: "Revisions" }) }),
          /* @__PURE__ */ e.jsxs(n.CardContent, { className: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
            c.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "Each publish keeps one." }),
            c.map((g) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
                /* @__PURE__ */ e.jsx("div", { className: "cms:truncate", children: g.title }),
                /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: P(g.createdAt) })
              ] }),
              r.update && !a.trashed && /* @__PURE__ */ e.jsx(
                n.Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  onClick: () => j.router.post(k(`cms/revisions/${g.id}/restore`), {}, { preserveScroll: !0 }),
                  children: "Restore"
                }
              )
            ] }, g.id))
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(
      hs,
      {
        open: m,
        onClose: () => u(!1),
        processing: h.processing,
        current: a?.publishedAt ?? null,
        onSchedule: (g) => S(g)
      }
    )
  ] });
}
function hs({ open: s, onClose: t, onSchedule: a, current: l, processing: c }) {
  const [r, d] = N.useState("");
  return N.useEffect(() => {
    s && d(ds(l ? new Date(l) : new Date(Date.now() + 864e5)));
  }, [s, l]), /* @__PURE__ */ e.jsx(n.Dialog, { open: s, onOpenChange: (o) => !o && t(), children: /* @__PURE__ */ e.jsxs(n.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(n.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(n.DialogTitle, { children: "Publish on a date" }),
      /* @__PURE__ */ e.jsx(n.DialogDescription, { children: "The entry goes live then; a date in the past publishes it now with that date." })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "published-at", children: "Date and time" }),
      /* @__PURE__ */ e.jsx(n.Input, { id: "published-at", type: "datetime-local", value: r, onChange: (o) => d(o.target.value) }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "In your time zone." })
    ] }),
    /* @__PURE__ */ e.jsxs(n.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "outline", onClick: t, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", disabled: r === "" || c, onClick: () => a(new Date(r).toISOString()), children: "Publish" })
    ] })
  ] }) });
}
function xs({ collection: s, collections: t, entries: a, query: l, can: c }) {
  n.useBreadcrumbs([{ label: "Entries", href: k("cms/entries") }, ...s ? [{ label: s.title }] : []]);
  const [r, d] = N.useState(l.search), o = s ? k(`cms/collections/${s.handle}/entries`) : "", x = (i) => {
    const f = { ...l, ...i };
    j.router.get(
      o,
      { ...f.search ? { search: f.search } : {}, ...f.trashed ? { trashed: 1 } : {} },
      { preserveState: !0, preserveScroll: !0, replace: !0 }
    );
  };
  return N.useEffect(() => {
    if (r === l.search) return;
    const i = window.setTimeout(() => x({ search: r }), 300);
    return () => window.clearTimeout(i);
  }, [r]), !s || !a ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(j.Head, { title: "Entries" }),
    /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Entries" }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no collections yet. Create one under Structure → Collections, then come back to write its entries." })
  ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(j.Head, { title: s.title }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
        t.length > 1 && /* @__PURE__ */ e.jsxs(n.Select, { value: s.handle, onValueChange: (i) => j.router.get(k(`cms/collections/${i}/entries`)), children: [
          /* @__PURE__ */ e.jsx(n.SelectTrigger, { className: "cms:w-48", "aria-label": "Collection", children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(n.SelectContent, { children: t.map((i) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: i.handle, children: i.title }, i.handle)) })
        ] })
      ] }),
      c?.create && !l.trashed && /* @__PURE__ */ e.jsx(n.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(j.Link, { href: `${o}/create`, children: [
        /* @__PURE__ */ e.jsx(z, {}),
        " New entry"
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-sm", children: [
        /* @__PURE__ */ e.jsx(Ve, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          n.Input,
          {
            className: "cms:pl-9",
            placeholder: "Search titles",
            "aria-label": "Search titles",
            value: r,
            onChange: (i) => d(i.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(n.Button, { variant: l.trashed ? "secondary" : "ghost", size: "sm", onClick: () => x({ trashed: !l.trashed }), children: l.trashed ? "Back to entries" : "Trash" })
    ] }),
    /* @__PURE__ */ e.jsx(n.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(n.Table, { children: [
      /* @__PURE__ */ e.jsx(n.TableHeader, { children: /* @__PURE__ */ e.jsxs(n.TableRow, { children: [
        /* @__PURE__ */ e.jsx(n.TableHead, { children: "Title" }),
        /* @__PURE__ */ e.jsx(n.TableHead, { children: "Status" }),
        /* @__PURE__ */ e.jsx(n.TableHead, { children: s.dated ? "Date" : "Updated" })
      ] }) }),
      /* @__PURE__ */ e.jsxs(n.TableBody, { children: [
        a.data.length === 0 && /* @__PURE__ */ e.jsx(n.TableRow, { children: /* @__PURE__ */ e.jsx(n.TableCell, { colSpan: 3, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: l.trashed ? "The trash is empty." : l.search ? "Nothing matches." : "No entries yet." }) }),
        a.data.map((i) => /* @__PURE__ */ e.jsxs(n.TableRow, { children: [
          /* @__PURE__ */ e.jsxs(n.TableCell, { children: [
            /* @__PURE__ */ e.jsx(j.Link, { href: k(`cms/entries/${i.id}/edit`), className: "cms:font-medium cms:hover:underline", children: i.title }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
              "/",
              i.slug
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(n.TableCell, { children: /* @__PURE__ */ e.jsx(n.Badge, { variant: i.status === "published" ? "default" : "secondary", children: R(i.status) }) }),
          /* @__PURE__ */ e.jsx(n.TableCell, { className: "cms:text-muted-foreground", children: P(s.dated ? i.publishedAt : i.updatedAt) })
        ] }, i.id))
      ] })
    ] }) }),
    a.total > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:text-sm cms:text-muted-foreground", children: [
      /* @__PURE__ */ e.jsxs("span", { children: [
        a.from,
        "–",
        a.to,
        " of ",
        a.total
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(
          n.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Previous page",
            disabled: !a.prev_page_url,
            onClick: () => a.prev_page_url && j.router.get(a.prev_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(Re, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          n.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Next page",
            disabled: !a.next_page_url,
            onClick: () => a.next_page_url && j.router.get(a.next_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(ie, {})
          }
        )
      ] })
    ] })
  ] });
}
function ps({ fieldsets: s }) {
  const t = j.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(b, { message: t.fieldset }),
    /* @__PURE__ */ e.jsx(
      ye,
      {
        noun: "Fieldset",
        base: k("cms/fieldsets"),
        rows: s,
        intro: "Fields shared between blueprints, and the kinds of block of flexible fields."
      }
    )
  ] });
}
Te({
  pages: {
    "Cms/Blueprints/Index": os,
    "Cms/Blueprints/Form": is,
    "Cms/Fieldsets/Index": ps,
    "Cms/Entries/Index": xs,
    "Cms/Entries/Editor": ms
  }
});
