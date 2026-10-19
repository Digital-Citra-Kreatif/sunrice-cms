function H() {
  const s = globalThis.Sunrice;
  if (!s)
    throw new Error("[sunrice] This script runs outside the Sunrice admin panel (window.Sunrice is missing).");
  return s;
}
function ue(s) {
  const t = H();
  if (t.version !== 1)
    throw new Error(`[sunrice] This plugin was built for admin runtime 1, but the panel runs ${t.version}. Rebuild it with a matching @sunrice/admin-sdk.`);
  for (const [l, r] of Object.entries(s.pages ?? {}))
    t.registerPage(l, r);
}
function F(s = "") {
  return H().adminUrl(s);
}
const R = globalThis.Sunrice;
if (!R) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const e = R.modules["react/jsx-runtime"], q = globalThis.Sunrice;
if (!q) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const v = q.modules.react, W = globalThis.Sunrice;
if (!W) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const y = W.modules["@inertiajs/react"];
const he = (s) => s?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
function xe(s, t, l = []) {
  if (t == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: he(s),
    size: 24,
    node: t,
    ...l.length > 0 ? { aliases: l } : {}
  };
}
const me = (s) => {
  let t = "", l = !1;
  for (const r of s) {
    if (r === "-" || r === "_" || r <= " ") {
      l = t.length > 0;
      continue;
    }
    t.length === 0 ? t += r.toLowerCase() : t += l ? r.toUpperCase() : r, l = !1;
  }
  return t;
};
const ge = (s) => {
  const t = me(s);
  return t.charAt(0).toUpperCase() + t.slice(1);
};
const B = (...s) => s.filter((t, l, r) => !!t && t.trim() !== "" && r.indexOf(t) === l).join(" ").trim();
const S = {
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
function z(s) {
  return s != null;
}
function je(s, t = {}) {
  const l = t.attributeNames ?? {}, r = (u) => l[u] ?? u, a = s.size ?? s.width ?? S.width, i = s.size ?? s.height ?? S.height, h = s.aliases?.filter((u) => typeof u == "string" && u.trim() !== "").map((u) => `lucide-${u}`) ?? [], d = [...s.name ? [`lucide-${s.name}`] : [], ...h], x = t.className?.split(" ").filter(Boolean) ?? [], o = t.includeDefaultClasses === !1 ? B(...x) : B("lucide", ...d, ...x), g = t.absoluteStrokeWidth ? Number(t.strokeWidth ?? S["stroke-width"]) * Number(s.size ?? s.width ?? S.width) / Number(t.size ?? t.width ?? S.width) : t.strokeWidth ?? S["stroke-width"];
  return [
    "svg",
    {
      ...Object.entries(S).reduce((u, [m, j]) => (u[r(m)] = j, u), {}),
      ..."color" in t && t.color && {
        [r("stroke")]: t.color
      },
      ..."size" in t && z(t.size) && {
        [r("width")]: t.size,
        [r("height")]: t.size
      },
      ..."width" in t && z(t.width) && {
        [r("width")]: t.width
      },
      ..."height" in t && z(t.height) && {
        [r("height")]: t.height
      },
      [r("stroke-width")]: g,
      ...o && {
        [r("class")]: o
      },
      [r("viewBox")]: `0 0 ${a} ${i}`,
      ...t.hasA11yProp === !1 ? {
        [r("aria-hidden")]: "true"
      } : {},
      ..."attributes" in t && t.attributes
    },
    s.node.map((u) => {
      const [m, j, f] = u, b = t.nonScalingStroke ? { [r("vector-effect")]: "non-scaling-stroke", ...j } : j;
      return f ? [m, b, f] : [m, b];
    })
  ];
}
function fe(s, t = {}) {
  return je(s, {
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
const pe = (s) => {
  for (const t in s)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
  return !1;
}, be = v.createContext({}), ve = () => v.useContext(be), we = v.forwardRef(
  ({
    color: s,
    size: t,
    width: l,
    height: r,
    strokeWidth: a,
    absoluteStrokeWidth: i,
    nonScalingStroke: h,
    className: d = "",
    children: x,
    iconNode: o = [],
    icon: g = {
      node: o,
      aliases: [],
      size: 24
    },
    ...c
  }, u) => {
    const {
      size: m = 24,
      strokeWidth: j = 2,
      absoluteStrokeWidth: f = !1,
      nonScalingStroke: b = !1,
      color: $ = "currentColor",
      className: w = ""
    } = ve() ?? {}, N = !!x || pe(c), [ae, ie, oe = []] = fe(g, {
      color: s ?? $,
      width: l ?? t ?? m,
      height: r ?? t ?? m,
      strokeWidth: a ?? j,
      absoluteStrokeWidth: i ?? f,
      nonScalingStroke: h ?? b,
      className: B(w, d),
      hasA11yProp: N,
      attributes: c
    });
    return v.createElement(
      ae,
      {
        ref: u,
        ...ie
      },
      [
        ...oe.map(([ce, de]) => v.createElement(ce, de)),
        ...Array.isArray(x) ? x : [x]
      ]
    );
  }
);
function C(s, t = [], l = []) {
  const r = typeof s == "string" ? xe(s, t, l) : s, a = v.forwardRef(
    ({ className: i, ...h }, d) => v.createElement(we, {
      ref: d,
      icon: r,
      className: i,
      ...h
    })
  );
  return r.name && (a.displayName = ge(r.name)), a;
}
const P = {
  name: "arrow-down",
  size: 24,
  node: [
    ["path", { d: "M12 5v14", key: "s699le" }],
    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
  ]
};
P.node;
const ye = C(P);
const O = {
  name: "arrow-left",
  size: 24,
  node: [
    ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
    ["path", { d: "M19 12H5", key: "x3x0zl" }]
  ]
};
O.node;
const Ne = C(O);
const V = {
  name: "arrow-up",
  size: 24,
  node: [
    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
    ["path", { d: "M12 19V5", key: "x0mq9r" }]
  ]
};
V.node;
const ke = C(V);
const U = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
U.node;
const Ce = C(U);
const K = {
  name: "chevron-right",
  size: 24,
  node: [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]
};
K.node;
const Se = C(K);
const G = {
  name: "loader-circle",
  size: 24,
  node: [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  aliases: ["loader-2"]
};
G.node;
const $e = C(G);
const Z = {
  name: "plus",
  size: 24,
  node: [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ]
};
Z.node;
const A = C(Z);
const X = {
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
X.node;
const L = C(X), Y = globalThis.Sunrice;
if (!Y) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const n = Y.modules["@sunrice/admin-sdk/ui"];
function J() {
  const [s, t] = v.useState(null), l = /* @__PURE__ */ e.jsx(n.Dialog, { open: s !== null, onOpenChange: (r) => !r && t(null), children: /* @__PURE__ */ e.jsxs(n.DialogContent, { children: [
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
  return [(r, a) => t({ message: r, onConfirm: a }), l];
}
const Te = 5;
let Le = 0;
const Q = () => `f${++Le}`;
function ee(s) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function te(s, t) {
  const l = new Set(t.map((i) => i.handle)), r = ee(s) || "field";
  let a = r;
  for (let i = 2; l.has(a); i++)
    a = `${r}_${i}`;
  return a;
}
function se(s) {
  return (s ?? []).map(({ fields: t, ...l }) => ({
    ...l,
    key: Q(),
    fields: se(t),
    handleTouched: !0
  }));
}
function ne(s, t) {
  return s.map(({ key: l, handleTouched: r, fields: a, ...i }) => ({
    ...i,
    validation: (i.validation ?? []).map((h) => h.trim()).filter((h) => h !== ""),
    ...t(i.type) ? { fields: ne(a, t) } : {}
  }));
}
function ze(s, t, l) {
  return { key: Q(), type: s, label: t, handle: te(t, l), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function I(s, t, l) {
  const r = t + l;
  if (t < 0 || t >= s.length || r < 0 || r >= s.length) return s;
  const a = s.slice(), [i] = a.splice(t, 1);
  return a.splice(r, 0, i), a;
}
function De(s, t, l) {
  if (s.handleTouched) return { ...s, label: t };
  const r = l.filter((a) => a.key !== s.key);
  return { ...s, label: t, handle: te(t || s.type, r) };
}
function T(s, t) {
  const l = `${t}.`, r = {};
  for (const [a, i] of Object.entries(s))
    a.startsWith(l) && (r[a.slice(l.length)] = i);
  return r;
}
function E(s, t) {
  return Object.keys(s).some((l) => l === t || l.startsWith(`${t}.`));
}
const D = "__none";
function p({ message: s }) {
  return s ? /* @__PURE__ */ e.jsx("p", { className: "text-sm text-destructive", children: s }) : null;
}
function M(s) {
  const t = s.config?.options;
  return Array.isArray(t) ? t.flatMap((l) => {
    if (typeof l == "string") return [{ value: l, label: l }];
    if (l && typeof l == "object" && typeof l.value == "string") {
      const { value: r, label: a } = l;
      return [{ value: r, label: a || r }];
    }
    return [];
  }) : [];
}
function _e({ field: s, value: t, onChange: l, errors: r, id: a }) {
  const i = s.label || s.handle, h = s.type === "repeater" || s.type === "select" && s.config?.multiple === !0;
  return /* @__PURE__ */ e.jsxs("div", { className: "flex flex-col gap-2", ...h ? { role: "group", "aria-labelledby": `${a}-label` } : {}, children: [
    s.type === "toggle" ? /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ e.jsx(n.Switch, { id: a, checked: t === !0, onCheckedChange: (d) => l(d) }),
      /* @__PURE__ */ e.jsx(n.Label, { htmlFor: a, children: i })
    ] }) : /* @__PURE__ */ e.jsxs(n.Label, { id: `${a}-label`, htmlFor: h ? void 0 : a, children: [
      i,
      s.required && /* @__PURE__ */ e.jsx("span", { className: "text-destructive", children: " *" })
    ] }),
    /* @__PURE__ */ e.jsx(Be, { field: s, value: t, onChange: l, errors: r, id: a }),
    s.instructions && /* @__PURE__ */ e.jsx("p", { className: "text-sm text-muted-foreground", children: s.instructions }),
    /* @__PURE__ */ e.jsx(p, { message: r[""] })
  ] });
}
function Be({ field: s, value: t, onChange: l, errors: r, id: a }) {
  switch (s.type) {
    case "toggle":
      return null;
    case "textarea":
      return /* @__PURE__ */ e.jsx(n.Textarea, { id: a, value: typeof t == "string" ? t : "", rows: 4, onChange: (i) => l(i.target.value) });
    case "number":
      return /* @__PURE__ */ e.jsx(
        n.Input,
        {
          id: a,
          type: "number",
          className: "max-w-48",
          value: typeof t == "number" ? String(t) : typeof t == "string" ? t : "",
          min: _(s, "min"),
          max: _(s, "max"),
          step: _(s, "step") ?? "any",
          onChange: (i) => l(i.target.value === "" ? null : Number(i.target.value))
        }
      );
    case "select":
      return s.config?.multiple === !0 ? /* @__PURE__ */ e.jsx(Ae, { options: M(s), value: Array.isArray(t) ? t.map(String) : [], onChange: l }) : /* @__PURE__ */ e.jsx(Fe, { options: M(s), value: typeof t == "string" ? t : null, onChange: l, id: a, required: s.required === !0 });
    case "repeater":
      return /* @__PURE__ */ e.jsx(Ie, { field: s, value: Array.isArray(t) ? t : [], onChange: l, errors: r });
    default:
      return /* @__PURE__ */ e.jsx(n.Input, { id: a, value: typeof t == "string" ? t : "", onChange: (i) => l(i.target.value) });
  }
}
function _(s, t) {
  const l = s.config?.[t];
  return typeof l == "number" ? l : void 0;
}
function Fe({ options: s, value: t, onChange: l, id: r, required: a }) {
  return /* @__PURE__ */ e.jsxs(n.Select, { value: t ?? D, onValueChange: (i) => l(i === D ? null : i), children: [
    /* @__PURE__ */ e.jsx(n.SelectTrigger, { id: r, className: "w-full max-w-sm", children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
    /* @__PURE__ */ e.jsxs(n.SelectContent, { children: [
      !a && /* @__PURE__ */ e.jsx(n.SelectItem, { value: D, children: "None" }),
      s.map((i) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: i.value, children: i.label }, i.value))
    ] })
  ] });
}
function Ae({ options: s, value: t, onChange: l }) {
  return s.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "text-sm text-muted-foreground", children: "Nothing to choose from yet." }) : /* @__PURE__ */ e.jsx("div", { className: "flex flex-col gap-2", children: s.map((r) => /* @__PURE__ */ e.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
    /* @__PURE__ */ e.jsx(
      n.Checkbox,
      {
        checked: t.includes(r.value),
        onCheckedChange: (a) => l(a ? s.map((i) => i.value).filter((i) => i === r.value || t.includes(i)) : t.filter((i) => i !== r.value))
      }
    ),
    r.label
  ] }, r.value)) });
}
function Ie({ field: s, value: t, onChange: l, errors: r }) {
  const a = s.fields ?? [], i = t.map((d) => d && typeof d == "object" && !Array.isArray(d) ? d : {}), h = (d, x, o) => l(i.map((g, c) => c === d ? { ...g, [x]: o } : g));
  return /* @__PURE__ */ e.jsxs("div", { className: "flex flex-col gap-2", children: [
    i.map((d, x) => /* @__PURE__ */ e.jsxs("div", { className: "flex items-start gap-2", children: [
      a.map((o) => {
        const g = T(r, `${x}.${o.handle}`);
        return /* @__PURE__ */ e.jsxs("div", { className: "flex flex-1 flex-col gap-1", children: [
          /* @__PURE__ */ e.jsx(
            n.Input,
            {
              "aria-label": o.label || o.handle,
              placeholder: o.label || o.handle,
              value: typeof d[o.handle] == "string" ? d[o.handle] : "",
              onChange: (c) => h(x, o.handle, c.target.value)
            }
          ),
          /* @__PURE__ */ e.jsx(p, { message: r[`${x}.${o.handle}`] ?? g[""] })
        ] }, o.handle);
      }),
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": "Remove row", onClick: () => l(i.filter((o, g) => g !== x)), children: /* @__PURE__ */ e.jsx(L, {}) })
    ] }, x)),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", size: "sm", onClick: () => l([...i, {}]), children: [
      /* @__PURE__ */ e.jsx(A, {}),
      " Add ",
      (s.label || "row").toLowerCase().replace(/s$/, "")
    ] }) })
  ] });
}
function le({ fields: s, onChange: t, types: l, errors: r, depth: a = 1, idPrefix: i = "field" }) {
  const [h, d] = v.useState(() => /* @__PURE__ */ new Set()), x = (c) => d((u) => {
    const m = new Set(u);
    return m.has(c) ? m.delete(c) : m.add(c), m;
  }), o = (c, u) => t(s.map((m, j) => j === c ? u : m)), g = (c) => {
    const u = ze(c.type, c.label, s);
    t([...s, u]), d((m) => new Set(m).add(u.key));
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "flex flex-col gap-2", children: [
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "rounded-lg border border-dashed p-4 text-sm text-muted-foreground", children: "No fields yet." }),
    s.map((c, u) => {
      const m = l.find((b) => b.type === c.type), j = h.has(c.key) || E(r, String(u)), f = `${i}-${c.key}`;
      return /* @__PURE__ */ e.jsxs("div", { className: `rounded-lg border bg-card ${E(r, String(u)) ? "border-destructive" : ""}`, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2 p-2", children: [
          /* @__PURE__ */ e.jsx(
            n.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "size-8",
              "aria-expanded": j,
              "aria-controls": f,
              "aria-label": `${j ? "Close" : "Open"} ${c.label || c.handle}`,
              onClick: () => x(c.key),
              children: j ? /* @__PURE__ */ e.jsx(Ce, {}) : /* @__PURE__ */ e.jsx(Se, {})
            }
          ),
          /* @__PURE__ */ e.jsxs("button", { type: "button", className: "flex min-w-0 flex-1 items-center gap-2 text-left", onClick: () => x(c.key), children: [
            /* @__PURE__ */ e.jsx("span", { className: "truncate font-medium", children: c.label || c.handle }),
            /* @__PURE__ */ e.jsx("code", { className: "truncate text-xs text-muted-foreground", children: c.handle })
          ] }),
          c.required && /* @__PURE__ */ e.jsx(n.Badge, { variant: "outline", children: "Required" }),
          /* @__PURE__ */ e.jsx(n.Badge, { variant: "secondary", children: m?.label ?? c.type }),
          /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "icon", className: "size-8", "aria-label": "Move up", disabled: u === 0, onClick: () => t(I(s, u, -1)), children: /* @__PURE__ */ e.jsx(ke, {}) }),
          /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "icon", className: "size-8", "aria-label": "Move down", disabled: u === s.length - 1, onClick: () => t(I(s, u, 1)), children: /* @__PURE__ */ e.jsx(ye, {}) }),
          /* @__PURE__ */ e.jsx(
            n.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "size-8 text-destructive",
              "aria-label": `Remove ${c.label || c.handle}`,
              onClick: () => t(s.filter((b, $) => $ !== u)),
              children: /* @__PURE__ */ e.jsx(L, {})
            }
          )
        ] }),
        j && /* @__PURE__ */ e.jsx(
          Ee,
          {
            id: f,
            field: c,
            type: m,
            siblings: s,
            onChange: (b) => o(u, b),
            types: l,
            errors: T(r, String(u)),
            depth: a
          }
        )
      ] }, c.key);
    }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(n.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(n.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", size: "sm", children: [
        /* @__PURE__ */ e.jsx(A, {}),
        " Add field"
      ] }) }),
      /* @__PURE__ */ e.jsx(n.DropdownMenuContent, { align: "start", children: l.filter((c) => !c.hasChildren || a < Te).map((c) => /* @__PURE__ */ e.jsx(n.DropdownMenuItem, { onSelect: () => g(c), children: c.label }, c.type)) })
    ] }) })
  ] });
}
const k = { default: "__default", yes: "yes", no: "no" };
function Ee({ id: s, field: t, type: l, siblings: r, onChange: a, types: i, errors: h, depth: d }) {
  const x = t.config ?? {};
  return /* @__PURE__ */ e.jsxs("div", { id: s, className: "flex flex-col gap-4 border-t p-4", children: [
    !l && /* @__PURE__ */ e.jsxs("p", { className: "text-sm text-destructive", children: [
      'The field type "',
      t.type,
      `" isn't registered. Its data is kept; register the type or remove the field.`
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: `${s}-label`, children: "Label" }),
        /* @__PURE__ */ e.jsx(n.Input, { id: `${s}-label`, value: t.label ?? "", onChange: (o) => a(De(t, o.target.value, r)) }),
        /* @__PURE__ */ e.jsx(p, { message: h.label })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: `${s}-handle`, children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          n.Input,
          {
            id: `${s}-handle`,
            className: "font-mono",
            value: t.handle,
            onChange: (o) => a({ ...t, handle: o.target.value, handleTouched: !0 })
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "text-sm text-muted-foreground", children: "How templates read it. Renaming it hides values saved under the old one." }),
        /* @__PURE__ */ e.jsx(p, { message: h.handle })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ e.jsx(n.Label, { htmlFor: `${s}-instructions`, children: "Instructions" }),
      /* @__PURE__ */ e.jsx(
        n.Input,
        {
          id: `${s}-instructions`,
          value: t.instructions ?? "",
          placeholder: "Shown under the field to editors",
          onChange: (o) => a({ ...t, instructions: o.target.value || null })
        }
      ),
      /* @__PURE__ */ e.jsx(p, { message: h.instructions })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "flex flex-wrap items-center gap-6", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ e.jsx(n.Switch, { id: `${s}-required`, checked: t.required === !0, onCheckedChange: (o) => a({ ...t, required: o }) }),
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: `${s}-required`, children: "Required" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: `${s}-translatable`, children: "Per language" }),
        /* @__PURE__ */ e.jsxs(
          n.Select,
          {
            value: t.translatable === !0 ? k.yes : t.translatable === !1 ? k.no : k.default,
            onValueChange: (o) => a({ ...t, translatable: o === k.yes ? !0 : o === k.no ? !1 : null }),
            children: [
              /* @__PURE__ */ e.jsx(n.SelectTrigger, { id: `${s}-translatable`, className: "w-48", children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
              /* @__PURE__ */ e.jsxs(n.SelectContent, { children: [
                /* @__PURE__ */ e.jsx(n.SelectItem, { value: k.default, children: "As the type decides" }),
                /* @__PURE__ */ e.jsx(n.SelectItem, { value: k.yes, children: "Yes, translated" }),
                /* @__PURE__ */ e.jsx(n.SelectItem, { value: k.no, children: "No, shared" })
              ] })
            ]
          }
        )
      ] })
    ] }),
    (l?.settings.length ?? 0) > 0 && /* @__PURE__ */ e.jsx("div", { className: "grid gap-4 md:grid-cols-2", children: l?.settings.map((o) => /* @__PURE__ */ e.jsx(
      _e,
      {
        id: `${s}-config-${o.handle}`,
        field: o,
        value: x[o.handle],
        errors: T(h, `config.${o.handle}`),
        onChange: (g) => a({ ...t, config: { ...x, [o.handle]: g } })
      },
      o.handle
    )) }),
    /* @__PURE__ */ e.jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ e.jsx(n.Label, { htmlFor: `${s}-validation`, children: "Extra rules" }),
      /* @__PURE__ */ e.jsx(
        n.Textarea,
        {
          id: `${s}-validation`,
          rows: 2,
          className: "font-mono",
          placeholder: `min:3
regex:/^[A-Z]/`,
          value: (t.validation ?? []).join(`
`),
          onChange: (o) => a({ ...t, validation: o.target.value.split(`
`) })
        }
      ),
      /* @__PURE__ */ e.jsx("p", { className: "text-sm text-muted-foreground", children: "Laravel rules, one per line." }),
      /* @__PURE__ */ e.jsx(p, { message: h.validation ?? Object.entries(h).find(([o]) => o.startsWith("validation."))?.[1] })
    ] }),
    l?.hasChildren && /* @__PURE__ */ e.jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ e.jsx(n.Label, { children: "Fields inside" }),
      /* @__PURE__ */ e.jsx(
        le,
        {
          fields: t.fields,
          onChange: (o) => a({ ...t, fields: o }),
          types: i,
          errors: T(h, "fields"),
          depth: d + 1,
          idPrefix: s
        }
      ),
      /* @__PURE__ */ e.jsx(p, { message: h.fields })
    ] }),
    /* @__PURE__ */ e.jsx(p, { message: h.type })
  ] });
}
function Me({ kind: s = "blueprint", blueprint: t, fieldTypes: l, usedBy: r = [] }) {
  const a = s === "fieldset" ? "Fieldset" : "Blueprint", i = F(s === "fieldset" ? "cms/fieldsets" : "cms/blueprints"), h = t ? t.title : `New ${a.toLowerCase()}`;
  n.useBreadcrumbs([{ label: `${a}s`, href: i }, { label: h }]);
  const [d, x] = J(), o = y.useForm({ title: t?.title ?? "", handle: t?.handle ?? "" }), [g, c] = v.useState(t !== null), [u, m] = v.useState(() => se(t?.fields)), j = (w) => l.find((N) => N.type === w)?.hasChildren === !0, f = o.errors, b = (w) => {
    w.preventDefault(), o.transform((N) => ({
      ...t ? { title: N.title } : N,
      fields: ne(u, j)
    })), t ? o.put(`${i}/${t.id}`, { preserveScroll: !0 }) : o.post(i);
  }, $ = () => t && d(
    `Delete the ${a.toLowerCase()} "${t.title}"? Content keeps its values.`,
    () => y.router.delete(`${i}/${t.id}`, { preserveScroll: !0 })
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: b, className: "flex max-w-4xl flex-col gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: h }),
    x,
    /* @__PURE__ */ e.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "flex min-w-0 items-center gap-3", children: [
        /* @__PURE__ */ e.jsx(n.Button, { variant: "outline", size: "icon", className: "size-8 shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(y.Link, { href: i, "aria-label": `Back to ${a.toLowerCase()}s`, children: /* @__PURE__ */ e.jsx(Ne, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "truncate text-2xl font-medium tracking-tight", children: h })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-2", children: [
        t && /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "outline", size: "icon", className: "text-destructive", "aria-label": `Delete ${h}`, onClick: $, children: /* @__PURE__ */ e.jsx(L, {}) }),
        /* @__PURE__ */ e.jsxs(n.Button, { type: "submit", disabled: o.processing, children: [
          o.processing && /* @__PURE__ */ e.jsx($e, { className: "animate-spin" }),
          t ? "Save" : `Create ${a.toLowerCase()}`
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(p, { message: f.blueprint ?? f.fieldset }),
    /* @__PURE__ */ e.jsx(n.Card, { children: /* @__PURE__ */ e.jsxs(n.CardContent, { className: "grid gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "title", children: "Title" }),
        /* @__PURE__ */ e.jsx(n.Input, { id: "title", value: o.data.title, required: !0, onChange: (w) => {
          o.setData((N) => ({ ...N, title: w.target.value, handle: g ? N.handle : ee(w.target.value) }));
        } }),
        /* @__PURE__ */ e.jsx(p, { message: f.title })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "handle", children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          n.Input,
          {
            id: "handle",
            className: "font-mono",
            value: o.data.handle,
            disabled: t !== null,
            required: !0,
            onChange: (w) => {
              c(!0), o.setData("handle", w.target.value);
            }
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "text-sm text-muted-foreground", children: t ? "Set when it was created." : "Lowercase letters, digits and underscores. It can't change later." }),
        /* @__PURE__ */ e.jsx(p, { message: f.handle })
      ] })
    ] }) }),
    r.length > 0 && /* @__PURE__ */ e.jsxs("p", { className: "text-sm text-muted-foreground", children: [
      "Used by ",
      r.join(", "),
      ". Changes show there at once."
    ] }),
    /* @__PURE__ */ e.jsxs("section", { className: "flex flex-col gap-3", "aria-labelledby": "fields-heading", children: [
      /* @__PURE__ */ e.jsx("h2", { id: "fields-heading", className: "text-lg font-medium", children: "Fields" }),
      /* @__PURE__ */ e.jsx(le, { fields: u, onChange: m, types: l, errors: T(f, "fields") }),
      /* @__PURE__ */ e.jsx(p, { message: f.fields })
    ] })
  ] });
}
function re({ noun: s, base: t, rows: l, intro: r }) {
  const a = `${s}s`;
  n.useBreadcrumbs([{ label: a }]);
  const [i, h] = J();
  return /* @__PURE__ */ e.jsxs("div", { className: "flex flex-col gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: a }),
    h,
    /* @__PURE__ */ e.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("h1", { className: "text-2xl font-medium tracking-tight", children: a }),
        /* @__PURE__ */ e.jsx("p", { className: "text-sm text-muted-foreground", children: r })
      ] }),
      /* @__PURE__ */ e.jsx(n.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(y.Link, { href: `${t}/create`, children: [
        /* @__PURE__ */ e.jsx(A, {}),
        " New ",
        s.toLowerCase()
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsx(n.Card, { className: "py-0", children: /* @__PURE__ */ e.jsxs(n.Table, { children: [
      /* @__PURE__ */ e.jsx(n.TableHeader, { children: /* @__PURE__ */ e.jsxs(n.TableRow, { children: [
        /* @__PURE__ */ e.jsx(n.TableHead, { children: "Title" }),
        /* @__PURE__ */ e.jsx(n.TableHead, { children: "Handle" }),
        /* @__PURE__ */ e.jsx(n.TableHead, { children: "Fields" }),
        l.some((d) => d.usedBy) && /* @__PURE__ */ e.jsx(n.TableHead, { children: "Used by" }),
        /* @__PURE__ */ e.jsx(n.TableHead, { className: "w-12", children: /* @__PURE__ */ e.jsx("span", { className: "sr-only", children: "Actions" }) })
      ] }) }),
      /* @__PURE__ */ e.jsxs(n.TableBody, { children: [
        l.length === 0 && /* @__PURE__ */ e.jsx(n.TableRow, { children: /* @__PURE__ */ e.jsxs(n.TableCell, { colSpan: 5, className: "py-8 text-center text-muted-foreground", children: [
          "No ",
          a.toLowerCase(),
          " yet."
        ] }) }),
        l.map((d) => /* @__PURE__ */ e.jsxs(n.TableRow, { children: [
          /* @__PURE__ */ e.jsx(n.TableCell, { children: /* @__PURE__ */ e.jsx(y.Link, { href: `${t}/${d.id}/edit`, className: "font-medium hover:underline", children: d.title }) }),
          /* @__PURE__ */ e.jsx(n.TableCell, { children: /* @__PURE__ */ e.jsx("code", { className: "text-xs", children: d.handle }) }),
          /* @__PURE__ */ e.jsx(n.TableCell, { children: d.fields }),
          d.usedBy && /* @__PURE__ */ e.jsx(n.TableCell, { className: "text-muted-foreground", children: d.usedBy.join(", ") || "—" }),
          /* @__PURE__ */ e.jsx(n.TableCell, { children: /* @__PURE__ */ e.jsx(
            n.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "size-8 text-destructive",
              "aria-label": `Delete ${d.title}`,
              onClick: () => i(
                `Delete the ${s.toLowerCase()} "${d.title}"? Content keeps its values.`,
                () => y.router.delete(`${t}/${d.id}`, { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(L, {})
            }
          ) })
        ] }, d.id))
      ] })
    ] }) })
  ] });
}
function He({ blueprints: s }) {
  const t = y.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(p, { message: t.blueprint }),
    /* @__PURE__ */ e.jsx(
      re,
      {
        noun: "Blueprint",
        base: F("cms/blueprints"),
        rows: s,
        intro: "The fields editors fill in, for each kind of content."
      }
    )
  ] });
}
function Re({ fieldsets: s }) {
  const t = y.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(p, { message: t.fieldset }),
    /* @__PURE__ */ e.jsx(
      re,
      {
        noun: "Fieldset",
        base: F("cms/fieldsets"),
        rows: s,
        intro: "Fields shared between blueprints, and the kinds of block of flexible fields."
      }
    )
  ] });
}
ue({
  pages: {
    "Cms/Blueprints/Index": He,
    "Cms/Blueprints/Form": Me,
    "Cms/Fieldsets/Index": Re
  }
});
