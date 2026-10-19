function Ve(s, t) {
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
const te = 1;
function oe() {
  const s = globalThis.Sunrice;
  if (!s)
    throw new Error("[sunrice] This script runs outside the Sunrice admin panel (window.Sunrice is missing).");
  return s;
}
function Ue(s) {
  const t = oe();
  if (t.version !== te)
    throw new Error(`[sunrice] This plugin was built for admin runtime ${te}, but the panel runs ${t.version}. Rebuild it with a matching @sunrice/admin-sdk.`);
  for (const [l, c] of Object.entries(s.pages ?? {}))
    t.registerPage(l, c);
}
function y(s = "") {
  return oe().adminUrl(s);
}
const de = globalThis.Sunrice;
if (!de) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const e = de.modules["react/jsx-runtime"], me = globalThis.Sunrice;
if (!me) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const N = me.modules.react, Hs = /* @__PURE__ */ Ve({
  __proto__: null
}, [N]), ue = globalThis.Sunrice;
if (!ue) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const p = ue.modules["@inertiajs/react"];
const Oe = (s) => s?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
function qe(s, t, l = []) {
  if (t == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: Oe(s),
    size: 24,
    node: t,
    ...l.length > 0 ? { aliases: l } : {}
  };
}
const We = (s) => {
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
const Ge = (s) => {
  const t = We(s);
  return t.charAt(0).toUpperCase() + t.slice(1);
};
const Y = (...s) => s.filter((t, l, c) => !!t && t.trim() !== "" && c.indexOf(t) === l).join(" ").trim();
const B = {
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
function K(s) {
  return s != null;
}
function Ke(s, t = {}) {
  const l = t.attributeNames ?? {}, c = (x) => l[x] ?? x, r = s.size ?? s.width ?? B.width, n = s.size ?? s.height ?? B.height, d = s.aliases?.filter((x) => typeof x == "string" && x.trim() !== "").map((x) => `lucide-${x}`) ?? [], i = [...s.name ? [`lucide-${s.name}`] : [], ...d], u = t.className?.split(" ").filter(Boolean) ?? [], o = t.includeDefaultClasses === !1 ? Y(...u) : Y("lucide", ...i, ...u), h = t.absoluteStrokeWidth ? Number(t.strokeWidth ?? B["stroke-width"]) * Number(s.size ?? s.width ?? B.width) / Number(t.size ?? t.width ?? B.width) : t.strokeWidth ?? B["stroke-width"];
  return [
    "svg",
    {
      ...Object.entries(B).reduce((x, [g, j]) => (x[c(g)] = j, x), {}),
      ..."color" in t && t.color && {
        [c("stroke")]: t.color
      },
      ..."size" in t && K(t.size) && {
        [c("width")]: t.size,
        [c("height")]: t.size
      },
      ..."width" in t && K(t.width) && {
        [c("width")]: t.width
      },
      ..."height" in t && K(t.height) && {
        [c("height")]: t.height
      },
      [c("stroke-width")]: h,
      ...o && {
        [c("class")]: o
      },
      [c("viewBox")]: `0 0 ${r} ${n}`,
      ...t.hasA11yProp === !1 ? {
        [c("aria-hidden")]: "true"
      } : {},
      ..."attributes" in t && t.attributes
    },
    s.node.map((x) => {
      const [g, j, C] = x, v = t.nonScalingStroke ? { [c("vector-effect")]: "non-scaling-stroke", ...j } : j;
      return C ? [g, v, C] : [g, v];
    })
  ];
}
function Ze(s, t = {}) {
  return Ke(s, {
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
const Xe = (s) => {
  for (const t in s)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
  return !1;
}, Ye = N.createContext({}), Je = () => N.useContext(Ye), Qe = N.forwardRef(
  ({
    color: s,
    size: t,
    width: l,
    height: c,
    strokeWidth: r,
    absoluteStrokeWidth: n,
    nonScalingStroke: d,
    className: i = "",
    children: u,
    iconNode: o = [],
    icon: h = {
      node: o,
      aliases: [],
      size: 24
    },
    ...m
  }, x) => {
    const {
      size: g = 24,
      strokeWidth: j = 2,
      absoluteStrokeWidth: C = !1,
      nonScalingStroke: v = !1,
      color: D = "currentColor",
      className: T = ""
    } = Je() ?? {}, w = !!u || Xe(m), [f, _, S = []] = Ze(h, {
      color: s ?? D,
      width: l ?? t ?? g,
      height: c ?? t ?? g,
      strokeWidth: r ?? j,
      absoluteStrokeWidth: n ?? C,
      nonScalingStroke: d ?? v,
      className: Y(T, i),
      hasA11yProp: w,
      attributes: m
    });
    return N.createElement(
      f,
      {
        ref: x,
        ..._
      },
      [
        ...S.map(([M, b]) => N.createElement(M, b)),
        ...Array.isArray(u) ? u : [u]
      ]
    );
  }
);
function $(s, t = [], l = []) {
  const c = typeof s == "string" ? qe(s, t, l) : s, r = N.forwardRef(
    ({ className: n, ...d }, i) => N.createElement(Qe, {
      ref: i,
      icon: c,
      className: n,
      ...d
    })
  );
  return c.name && (r.displayName = Ge(c.name)), r;
}
const he = {
  name: "arrow-down",
  size: 24,
  node: [
    ["path", { d: "M12 5v14", key: "s699le" }],
    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
  ]
};
he.node;
const U = $(he);
const xe = {
  name: "arrow-left",
  size: 24,
  node: [
    ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
    ["path", { d: "M19 12H5", key: "x3x0zl" }]
  ]
};
xe.node;
const Q = $(xe);
const ge = {
  name: "arrow-up",
  size: 24,
  node: [
    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
    ["path", { d: "M12 19V5", key: "x0mq9r" }]
  ]
};
ge.node;
const O = $(ge);
const pe = {
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
pe.node;
const es = $(pe);
const fe = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
fe.node;
const je = $(fe);
const be = {
  name: "chevron-left",
  size: 24,
  node: [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]]
};
be.node;
const ss = $(be);
const ve = {
  name: "chevron-right",
  size: 24,
  node: [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]
};
ve.node;
const Ne = $(ve);
const we = {
  name: "external-link",
  size: 24,
  node: [
    ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
    ["path", { d: "M10 14 21 3", key: "gplh6r" }],
    ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
  ]
};
we.node;
const ts = $(we);
const Ce = {
  name: "eye",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
        key: "1nclc0"
      }
    ],
    ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
  ]
};
Ce.node;
const as = $(Ce);
const ye = {
  name: "loader-circle",
  size: 24,
  node: [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  aliases: ["loader-2"]
};
ye.node;
const ee = $(ye);
const ke = {
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
ke.node;
const ls = $(ke);
const Se = {
  name: "plus",
  size: 24,
  node: [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ]
};
Se.node;
const I = $(Se);
const $e = {
  name: "rotate-ccw",
  size: 24,
  node: [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ]
};
$e.node;
const ns = $($e);
const Te = {
  name: "search",
  size: 24,
  node: [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ]
};
Te.node;
const _e = $(Te);
const De = {
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
De.node;
const A = $(De);
const ze = {
  name: "x",
  size: 24,
  node: [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]
};
ze.node;
const cs = $(ze), Be = globalThis.Sunrice;
if (!Be) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const a = Be.modules["@sunrice/admin-sdk/ui"];
function q() {
  const [s, t] = N.useState(null), l = /* @__PURE__ */ e.jsx(a.Dialog, { open: s !== null, onOpenChange: (c) => !c && t(null), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
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
const rs = 5;
let is = 0;
const Le = () => `f${++is}`;
function Ie(s) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function Ae(s, t) {
  const l = new Set(t.map((n) => n.handle)), c = Ie(s) || "field";
  let r = c;
  for (let n = 2; l.has(r); n++)
    r = `${c}_${n}`;
  return r;
}
function Me(s) {
  return (s ?? []).map(({ fields: t, ...l }) => ({
    ...l,
    key: Le(),
    fields: Me(t),
    handleTouched: !0
  }));
}
function Ee(s, t) {
  return s.map(({ key: l, handleTouched: c, fields: r, ...n }) => ({
    ...n,
    validation: (n.validation ?? []).map((d) => d.trim()).filter((d) => d !== ""),
    ...t(n.type) ? { fields: Ee(r, t) } : {}
  }));
}
function os(s, t, l) {
  return { key: Le(), type: s, label: t, handle: Ae(t, l), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function E(s, t, l) {
  const c = t + l;
  if (t < 0 || t >= s.length || c < 0 || c >= s.length) return s;
  const r = s.slice(), [n] = r.splice(t, 1);
  return r.splice(c, 0, n), r;
}
function ds(s, t, l) {
  if (s.handleTouched) return { ...s, label: t };
  const c = l.filter((r) => r.key !== s.key);
  return { ...s, label: t, handle: Ae(t || s.type, c) };
}
function W(s, t) {
  const l = `${t}.`, c = {};
  for (const [r, n] of Object.entries(s))
    r.startsWith(l) && (c[r.slice(l.length)] = n);
  return c;
}
function P(s, t) {
  const l = s[t];
  return { ...W(s, t), ...l !== void 0 ? { "": l } : {} };
}
function ae(s, t) {
  return Object.keys(s).some((l) => l === t || l.startsWith(`${t}.`));
}
function V(s) {
  return s && typeof s == "object" && !Array.isArray(s) ? s : {};
}
function ms(s, t) {
  if (typeof s != "string" || s === "") return "";
  const l = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(s);
  return l ? t ? `${l[1]}T${l[2] ?? "00:00"}` : l[1] ?? "" : "";
}
function us(s) {
  return s === "" ? null : s;
}
function hs() {
  return { _hidden: !1 };
}
function xs(s) {
  return { type: s, hidden: !1, values: {} };
}
function Ps(s) {
  const t = s.replace(/[\u0000- \u007f]+/g, ""), l = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(t);
  return l ? ["http", "https", "mailto", "tel"].includes(l[1].toLowerCase()) : !t.includes("\\");
}
function gs({ ids: s, search: t, collections: l }) {
  const c = new URLSearchParams();
  for (const r of s ?? []) c.append("ids[]", String(r));
  t && c.set("search", t);
  for (const r of l) c.append("collections[]", r);
  return c.toString();
}
function F(s) {
  return { draft: "Draft", scheduled: "Scheduled", published: "Published" }[s];
}
function J(s, t) {
  if (!s) return "—";
  const l = new Date(s);
  return Number.isNaN(l.getTime()) ? "—" : l.toLocaleString(t, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
function ps(s) {
  const t = (l) => String(l).padStart(2, "0");
  return `${s.getFullYear()}-${t(s.getMonth() + 1)}-${t(s.getDate())}T${t(s.getHours())}:${t(s.getMinutes())}`;
}
function R(s, t) {
  try {
    return new Intl.DisplayNames(t ? [t] : void 0, { type: "language" }).of(s.replace("_", "-")) ?? s;
  } catch {
    return s;
  }
}
async function le(s) {
  const t = await fetch(`${y("cms/entry-picker")}?${gs(s)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!t.ok) throw new Error(String(t.status));
  return (await t.json()).items;
}
function fs({ id: s, value: t, multiple: l, max: c, collections: r, invalid: n, onChange: d }) {
  const i = t === null ? [] : Array.isArray(t) ? t : [t], [u, o] = N.useState({}), [h, m] = N.useState(""), [x, g] = N.useState(null), [j, C] = N.useState(!1), v = l && c !== null && i.length >= c, D = i.filter((f) => !u[f]).join(",");
  N.useEffect(() => {
    D !== "" && le({ ids: D.split(",").map(Number), collections: r }).then((f) => o((_) => ({ ..._, ...Object.fromEntries(f.map((S) => [S.id, S])) }))).catch(() => C(!0));
  }, [D]), N.useEffect(() => {
    if (h.trim() === "") {
      g(null);
      return;
    }
    const f = window.setTimeout(() => {
      le({ search: h.trim(), collections: r }).then((_) => {
        g(_), C(!1);
      }).catch(() => C(!0));
    }, 250);
    return () => window.clearTimeout(f);
  }, [h]);
  const T = (f) => {
    o((_) => ({ ..._, [f.id]: f })), d(l ? [...i, f.id] : f.id), m("");
  }, w = (f) => d(l ? f : f[0] ?? null);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    i.length > 0 && /* @__PURE__ */ e.jsx("ul", { className: "cms:flex cms:flex-col cms:gap-1", children: i.map((f, _) => {
      const S = u[f];
      return /* @__PURE__ */ e.jsxs("li", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-md cms:border cms:px-3 cms:py-1.5 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate", children: S ? S.title : `Entry #${f}` }),
        S && /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: S.collection }),
        S && /* @__PURE__ */ e.jsx(a.Badge, { variant: S.status === "published" ? "default" : "secondary", children: F(S.status) }),
        l && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-7",
              "aria-label": `Move ${S?.title ?? f} up`,
              disabled: _ === 0,
              onClick: () => w(E(i, _, -1)),
              children: /* @__PURE__ */ e.jsx(O, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-7",
              "aria-label": `Move ${S?.title ?? f} down`,
              disabled: _ === i.length - 1,
              onClick: () => w(E(i, _, 1)),
              children: /* @__PURE__ */ e.jsx(U, {})
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            type: "button",
            variant: "ghost",
            size: "icon",
            className: "cms:size-7",
            "aria-label": `Remove ${S?.title ?? f}`,
            onClick: () => w(i.filter((M) => M !== f)),
            children: /* @__PURE__ */ e.jsx(cs, {})
          }
        )
      ] }, f);
    }) }),
    !v && (l || i.length === 0) && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-md", children: [
      /* @__PURE__ */ e.jsx(_e, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: s,
          className: "cms:pl-9",
          placeholder: "Search entries by title",
          "aria-invalid": n,
          value: h,
          autoComplete: "off",
          onChange: (f) => m(f.target.value)
        }
      ),
      x !== null && /* @__PURE__ */ e.jsxs("ul", { role: "listbox", "aria-label": "Matching entries", className: "cms:absolute cms:z-10 cms:mt-1 cms:max-h-64 cms:w-full cms:overflow-auto cms:rounded-md cms:border cms:bg-card cms:p-1 cms:shadow-md", children: [
        x.filter((f) => !i.includes(f.id)).length === 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: "No entries match." }),
        x.filter((f) => !i.includes(f.id)).map((f) => /* @__PURE__ */ e.jsx("li", { role: "option", "aria-selected": !1, children: /* @__PURE__ */ e.jsxs(
          "button",
          {
            type: "button",
            className: "cms:flex cms:w-full cms:items-center cms:gap-2 cms:rounded cms:px-2 cms:py-1.5 cms:text-left cms:text-sm cms:hover:bg-accent",
            onClick: () => T(f),
            children: [
              /* @__PURE__ */ e.jsx("span", { className: "cms:flex-1 cms:truncate", children: f.title }),
              /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: f.collection })
            ]
          }
        ) }, f.id))
      ] })
    ] }),
    j && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "Entries could not be loaded. Try again." })
  ] });
}
const js = N.lazy(() => import("./RichTextEditor-EMOrS9nN.js").then((s) => ({ default: s.RichTextEditor }))), Z = "__none";
function k({ message: s }) {
  return s ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: s }) : null;
}
function ne(s) {
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
const bs = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function vs(s) {
  if (s.label) return s.label;
  const t = s.handle.replace(/_/g, " ");
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function H({ field: s, value: t, onChange: l, errors: c, id: r, content: n = !1 }) {
  const d = vs(s), i = bs.includes(s.type) || ["select", "terms"].includes(s.type) && s.config?.multiple === !0;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", ...i ? { role: "group", "aria-labelledby": `${r}-label` } : {}, children: [
    s.type === "toggle" ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(a.Switch, { id: r, checked: t === !0, onCheckedChange: (u) => l(u) }),
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: r, children: d })
    ] }) : /* @__PURE__ */ e.jsxs(a.Label, { id: `${r}-label`, htmlFor: i ? void 0 : r, children: [
      d,
      s.required && /* @__PURE__ */ e.jsx("span", { className: "cms:text-destructive", children: " *" })
    ] }),
    /* @__PURE__ */ e.jsx(Ns, { field: s, value: t, onChange: l, errors: c, id: r, content: n }),
    s.instructions && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s.instructions }),
    /* @__PURE__ */ e.jsx(k, { message: c[""] })
  ] });
}
function Ns({ field: s, value: t, onChange: l, errors: c, id: r, content: n }) {
  const d = c[""] !== void 0;
  switch (s.type) {
    case "toggle":
      return null;
    case "textarea":
      return /* @__PURE__ */ e.jsx(
        a.Textarea,
        {
          id: r,
          "aria-invalid": d,
          value: typeof t == "string" ? t : "",
          rows: L(s, "rows") ?? 4,
          onChange: (i) => l(i.target.value)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ e.jsx(N.Suspense, { fallback: /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-48 cms:w-full" }), children: /* @__PURE__ */ e.jsx(js, { id: r, labelledBy: `${r}-label`, invalid: d, value: typeof t == "string" ? t : "", onChange: l }) });
    case "number":
      return /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: r,
          type: "number",
          className: "cms:max-w-48",
          "aria-invalid": d,
          value: typeof t == "number" ? String(t) : typeof t == "string" ? t : "",
          min: L(s, "min"),
          max: L(s, "max"),
          step: L(s, "step") ?? "any",
          onChange: (i) => l(i.target.value === "" ? null : Number(i.target.value))
        }
      );
    case "date": {
      const i = s.config?.time === !0;
      return /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: r,
          type: i ? "datetime-local" : "date",
          className: "cms:max-w-64",
          "aria-invalid": d,
          value: ms(t, i),
          onChange: (u) => l(us(u.target.value))
        }
      );
    }
    case "select":
      return s.config?.multiple === !0 ? /* @__PURE__ */ e.jsx(re, { options: ne(s), value: Array.isArray(t) ? t.map(String) : [], onChange: l }) : /* @__PURE__ */ e.jsx(ce, { options: ne(s), value: typeof t == "string" ? t : null, onChange: l, id: r, required: s.required === !0 });
    case "terms": {
      const i = s.terms ?? [];
      if (s.config?.multiple === !0) {
        const u = Array.isArray(t) ? t.map(String) : [];
        return /* @__PURE__ */ e.jsx(re, { options: i, value: u, onChange: (o) => l(o.map(Number)) });
      }
      return /* @__PURE__ */ e.jsx(
        ce,
        {
          options: i,
          id: r,
          required: s.required === !0,
          value: t == null ? null : String(t),
          onChange: (u) => l(u === null ? null : Number(u))
        }
      );
    }
    case "entries":
      return /* @__PURE__ */ e.jsx(
        fs,
        {
          id: r,
          invalid: d,
          multiple: s.config?.multiple === !0,
          max: L(s, "max") ?? null,
          collections: s.collections ?? [],
          onChange: l,
          value: typeof t == "number" || Array.isArray(t) && t.every((i) => typeof i == "number") ? t : null
        }
      );
    case "link":
      return /* @__PURE__ */ e.jsx(Cs, { value: V(t), onChange: l, errors: c, id: r });
    case "media":
      return /* @__PURE__ */ e.jsx(
        a.MediaPickerInput,
        {
          id: r,
          invalid: d,
          disabled: !1,
          multiple: s.config?.multiple === !0,
          max: L(s, "max") ?? null,
          types: Array.isArray(s.config?.types) ? s.config.types : [],
          value: typeof t == "number" || Array.isArray(t) && t.every((i) => typeof i == "number") ? t : null,
          onChange: l
        }
      );
    case "group":
      return /* @__PURE__ */ e.jsx(se, { fields: s.fields ?? [], value: V(t), onChange: l, errors: c, id: r, content: n });
    case "repeater":
      return /* @__PURE__ */ e.jsx(ks, { field: s, value: Array.isArray(t) ? t : [], onChange: l, errors: c, id: r, content: n });
    case "flexible":
      return /* @__PURE__ */ e.jsx(Ss, { field: s, value: Array.isArray(t) ? t : [], onChange: l, errors: c, id: r });
    default:
      return /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: r,
          "aria-invalid": d,
          value: typeof t == "string" ? t : "",
          placeholder: ws(s, "placeholder"),
          maxLength: L(s, "max"),
          onChange: (i) => l(i.target.value)
        }
      );
  }
}
function L(s, t) {
  const l = s.config?.[t];
  return typeof l == "number" ? l : void 0;
}
function ws(s, t) {
  const l = s.config?.[t];
  return typeof l == "string" ? l : void 0;
}
function se({ fields: s, value: t, onChange: l, errors: c, id: r, content: n }) {
  return /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-4 cms:rounded-lg cms:border cms:p-4", children: s.map((d) => /* @__PURE__ */ e.jsx(
    H,
    {
      id: `${r}-${d.handle}`,
      field: d,
      value: t[d.handle],
      content: n,
      errors: P(c, d.handle),
      onChange: (i) => l({ ...t, [d.handle]: i })
    },
    d.handle
  )) });
}
function ce({ options: s, value: t, onChange: l, id: c, required: r }) {
  return /* @__PURE__ */ e.jsxs(a.Select, { value: t ?? Z, onValueChange: (n) => l(n === Z ? null : n), children: [
    /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: c, className: "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
    /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
      !r && /* @__PURE__ */ e.jsx(a.SelectItem, { value: Z, children: "None" }),
      s.map((n) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: n.value, children: n.label }, n.value))
    ] })
  ] });
}
function re({ options: s, value: t, onChange: l }) {
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
function Cs({ value: s, onChange: t, errors: l, id: c }) {
  const r = (n, d) => {
    const i = { ...s, [n]: d };
    t(i.url === "" || i.url === void 0 ? null : i);
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
    /* @__PURE__ */ e.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ e.jsx(k, { message: l.url ?? l.label }) })
  ] });
}
function ys(s, t) {
  return !t && (s.fields ?? []).every((l) => l.type === "text");
}
function ks({ field: s, value: t, onChange: l, errors: c, id: r, content: n = !1 }) {
  const d = s.fields ?? [], i = t.map(V), u = (m, x) => l(i.map((g, j) => j === m ? x : g)), o = (s.label || "row").toLowerCase().replace(/s$/, ""), h = o.charAt(0).toUpperCase() + o.slice(1);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    i.map((m, x) => ys(s, n) ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
      d.map((g) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            "aria-label": g.label || g.handle,
            placeholder: g.label || g.handle,
            value: typeof m[g.handle] == "string" ? m[g.handle] : "",
            onChange: (j) => u(x, { ...m, [g.handle]: j.target.value })
          }
        ),
        /* @__PURE__ */ e.jsx(k, { message: c[`${x}.${g.handle}`] })
      ] }, g.handle)),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": `Remove ${o} ${x + 1}`, onClick: () => l(i.filter((g, j) => j !== x)), children: /* @__PURE__ */ e.jsx(A, {}) })
    ] }, x) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(
        Fe,
        {
          label: `${h} ${x + 1}`,
          index: x,
          count: i.length,
          onMove: (g) => l(E(i, x, g)),
          onRemove: () => l(i.filter((g, j) => j !== x)),
          hidden: n ? m._hidden === !0 : void 0,
          onHidden: (g) => u(x, { ...m, _hidden: g })
        }
      ),
      /* @__PURE__ */ e.jsx(se, { fields: d, value: m, onChange: (g) => u(x, g), errors: P(c, String(x)), id: `${r}-${x}`, content: n })
    ] }, typeof m._id == "string" ? m._id : x)),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => l([...i, n ? hs() : {}]), children: [
      /* @__PURE__ */ e.jsx(I, {}),
      " Add ",
      o
    ] }) })
  ] });
}
function Ss({ field: s, value: t, onChange: l, errors: c, id: r }) {
  const n = s.blocks ?? [], d = t.map(V), i = (u, o) => l(d.map((h, m) => m === u ? o : h));
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    d.map((u, o) => {
      const h = n.find((m) => m.type === u.type);
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(
          Fe,
          {
            label: h?.label ?? String(u.type),
            badge: !0,
            index: o,
            count: d.length,
            onMove: (m) => l(E(d, o, m)),
            onRemove: () => l(d.filter((m, x) => x !== o)),
            hidden: u.hidden === !0,
            onHidden: (m) => i(o, { ...u, hidden: m })
          }
        ),
        h ? /* @__PURE__ */ e.jsx(
          se,
          {
            fields: h.fields,
            value: V(u.values),
            onChange: (m) => i(o, { ...u, values: m }),
            errors: P(c, `${o}.values`),
            id: `${r}-${o}`,
            content: !0
          }
        ) : /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: "This kind of block no longer exists. Its values are kept." }),
        /* @__PURE__ */ e.jsx(k, { message: c[`${o}.type`] })
      ] }, typeof u.id == "string" ? u.id : o);
    }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", disabled: n.length === 0, children: [
        /* @__PURE__ */ e.jsx(I, {}),
        " Add block"
      ] }) }),
      /* @__PURE__ */ e.jsx(a.DropdownMenuContent, { align: "start", children: n.map((u) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => l([...d, xs(u.type)]), children: u.label }, u.type)) })
    ] }) })
  ] });
}
function Fe({ label: s, badge: t = !1, index: l, count: c, onMove: r, onRemove: n, hidden: d, onHidden: i }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    t ? /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: s }) : /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:font-medium", children: s }),
    d !== void 0 && /* @__PURE__ */ e.jsxs("label", { className: "cms:ml-auto cms:flex cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", children: [
      /* @__PURE__ */ e.jsx(a.Switch, { checked: !d, onCheckedChange: (u) => i(!u), "aria-label": `Show ${s}` }),
      "Show"
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: d === void 0 ? "cms:ml-auto cms:flex" : "cms:flex", children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Move ${s} up`, disabled: l === 0, onClick: () => r(-1), children: /* @__PURE__ */ e.jsx(O, {}) }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Move ${s} down`, disabled: l === c - 1, onClick: () => r(1), children: /* @__PURE__ */ e.jsx(U, {}) }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": `Remove ${s}`, onClick: n, children: /* @__PURE__ */ e.jsx(A, {}) })
    ] })
  ] });
}
function Re({ fields: s, onChange: t, types: l, errors: c, depth: r = 1, idPrefix: n = "field" }) {
  const [d, i] = N.useState(() => /* @__PURE__ */ new Set()), u = (m) => i((x) => {
    const g = new Set(x);
    return g.has(m) ? g.delete(m) : g.add(m), g;
  }), o = (m, x) => t(s.map((g, j) => j === m ? x : g)), h = (m) => {
    const x = os(m.type, m.label, s);
    t([...s, x]), i((g) => new Set(g).add(x.key));
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:border-dashed cms:p-4 cms:text-sm cms:text-muted-foreground", children: "No fields yet." }),
    s.map((m, x) => {
      const g = l.find((v) => v.type === m.type), j = d.has(m.key) || ae(c, String(x)), C = `${n}-${m.key}`;
      return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${ae(c, String(x)) ? "cms:border-destructive" : ""}`, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:p-2", children: [
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-expanded": j,
              "aria-controls": C,
              "aria-label": `${j ? "Close" : "Open"} ${m.label || m.handle}`,
              onClick: () => u(m.key),
              children: j ? /* @__PURE__ */ e.jsx(je, {}) : /* @__PURE__ */ e.jsx(Ne, {})
            }
          ),
          /* @__PURE__ */ e.jsxs("button", { type: "button", className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:text-left", onClick: () => u(m.key), children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: m.label || m.handle }),
            /* @__PURE__ */ e.jsx("code", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", children: m.handle })
          ] }),
          m.required && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", children: "Required" }),
          /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: g?.label ?? m.type }),
          /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move up", disabled: x === 0, onClick: () => t(E(s, x, -1)), children: /* @__PURE__ */ e.jsx(O, {}) }),
          /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move down", disabled: x === s.length - 1, onClick: () => t(E(s, x, 1)), children: /* @__PURE__ */ e.jsx(U, {}) }),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Remove ${m.label || m.handle}`,
              onClick: () => t(s.filter((v, D) => D !== x)),
              children: /* @__PURE__ */ e.jsx(A, {})
            }
          )
        ] }),
        j && /* @__PURE__ */ e.jsx(
          $s,
          {
            id: C,
            field: m,
            type: g,
            siblings: s,
            onChange: (v) => o(x, v),
            types: l,
            errors: W(c, String(x)),
            depth: r
          }
        )
      ] }, m.key);
    }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", children: [
        /* @__PURE__ */ e.jsx(I, {}),
        " Add field"
      ] }) }),
      /* @__PURE__ */ e.jsx(a.DropdownMenuContent, { align: "start", children: l.filter((m) => !m.hasChildren || r < rs).map((m) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => h(m), children: m.label }, m.type)) })
    ] }) })
  ] });
}
const z = { default: "__default", yes: "yes", no: "no" };
function $s({ id: s, field: t, type: l, siblings: c, onChange: r, types: n, errors: d, depth: i }) {
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
        /* @__PURE__ */ e.jsx(a.Input, { id: `${s}-label`, value: t.label ?? "", onChange: (o) => r(ds(t, o.target.value, c)) }),
        /* @__PURE__ */ e.jsx(k, { message: d.label })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-handle`, children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: `${s}-handle`,
            className: "cms:font-mono",
            value: t.handle,
            onChange: (o) => r({ ...t, handle: o.target.value, handleTouched: !0 })
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "How templates read it. Renaming it hides values saved under the old one." }),
        /* @__PURE__ */ e.jsx(k, { message: d.handle })
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
          onChange: (o) => r({ ...t, instructions: o.target.value || null })
        }
      ),
      /* @__PURE__ */ e.jsx(k, { message: d.instructions })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-6", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Switch, { id: `${s}-required`, checked: t.required === !0, onCheckedChange: (o) => r({ ...t, required: o }) }),
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-required`, children: "Required" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-translatable`, children: "Per language" }),
        /* @__PURE__ */ e.jsxs(
          a.Select,
          {
            value: t.translatable === !0 ? z.yes : t.translatable === !1 ? z.no : z.default,
            onValueChange: (o) => r({ ...t, translatable: o === z.yes ? !0 : o === z.no ? !1 : null }),
            children: [
              /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: `${s}-translatable`, className: "cms:w-48", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
              /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: z.default, children: "As the type decides" }),
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: z.yes, children: "Yes, translated" }),
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: z.no, children: "No, shared" })
              ] })
            ]
          }
        )
      ] })
    ] }),
    (l?.settings.length ?? 0) > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: l?.settings.map((o) => /* @__PURE__ */ e.jsx(
      H,
      {
        id: `${s}-config-${o.handle}`,
        field: o,
        value: u[o.handle],
        errors: P(d, `config.${o.handle}`),
        onChange: (h) => r({ ...t, config: { ...u, [o.handle]: h } })
      },
      o.handle
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
          onChange: (o) => r({ ...t, validation: o.target.value.split(`
`) })
        }
      ),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Laravel rules, one per line." }),
      /* @__PURE__ */ e.jsx(k, { message: d.validation ?? Object.entries(d).find(([o]) => o.startsWith("validation."))?.[1] })
    ] }),
    l?.hasChildren && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { children: "Fields inside" }),
      /* @__PURE__ */ e.jsx(
        Re,
        {
          fields: t.fields,
          onChange: (o) => r({ ...t, fields: o }),
          types: n,
          errors: W(d, "fields"),
          depth: i + 1,
          idPrefix: s
        }
      ),
      /* @__PURE__ */ e.jsx(k, { message: d.fields })
    ] }),
    /* @__PURE__ */ e.jsx(k, { message: d.type })
  ] });
}
function Ts({ kind: s = "blueprint", blueprint: t, fieldTypes: l, usedBy: c = [] }) {
  const r = s === "fieldset" ? "Fieldset" : "Blueprint", n = y(s === "fieldset" ? "cms/fieldsets" : "cms/blueprints"), d = t ? t.title : `New ${r.toLowerCase()}`;
  a.useBreadcrumbs([{ label: `${r}s`, href: n }, { label: d }]);
  const [i, u] = q(), o = p.useForm({ title: t?.title ?? "", handle: t?.handle ?? "" }), [h, m] = N.useState(t !== null), [x, g] = N.useState(() => Me(t?.fields)), j = (T) => l.find((w) => w.type === T)?.hasChildren === !0, C = o.errors, v = (T) => {
    T.preventDefault(), o.transform((w) => ({
      ...t ? { title: w.title } : w,
      fields: Ee(x, j)
    })), t ? o.put(`${n}/${t.id}`, { preserveScroll: !0 }) : o.post(n);
  }, D = () => t && i(
    `Delete the ${r.toLowerCase()} "${t.title}"? Content keeps its values.`,
    () => p.router.delete(`${n}/${t.id}`, { preserveScroll: !0 })
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: v, className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(p.Head, { title: d }),
    u,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(p.Link, { href: n, "aria-label": `Back to ${r.toLowerCase()}s`, children: /* @__PURE__ */ e.jsx(Q, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: d })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        t && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "icon", className: "cms:text-destructive", "aria-label": `Delete ${d}`, onClick: D, children: /* @__PURE__ */ e.jsx(A, {}) }),
        /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: o.processing, children: [
          o.processing && /* @__PURE__ */ e.jsx(ee, { className: "cms:animate-spin" }),
          t ? "Save" : `Create ${r.toLowerCase()}`
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(k, { message: C.blueprint ?? C.fieldset }),
    /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "title", children: "Title" }),
        /* @__PURE__ */ e.jsx(a.Input, { id: "title", value: o.data.title, required: !0, onChange: (T) => {
          o.setData((w) => ({ ...w, title: T.target.value, handle: h ? w.handle : Ie(T.target.value) }));
        } }),
        /* @__PURE__ */ e.jsx(k, { message: C.title })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "handle", children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: "handle",
            className: "cms:font-mono",
            value: o.data.handle,
            disabled: t !== null,
            required: !0,
            onChange: (T) => {
              m(!0), o.setData("handle", T.target.value);
            }
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t ? "Set when it was created." : "Lowercase letters, digits and underscores. It can't change later." }),
        /* @__PURE__ */ e.jsx(k, { message: C.handle })
      ] })
    ] }) }),
    c.length > 0 && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      "Used by ",
      c.join(", "),
      ". Changes show there at once."
    ] }),
    /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-3", "aria-labelledby": "fields-heading", children: [
      /* @__PURE__ */ e.jsx("h2", { id: "fields-heading", className: "cms:text-lg cms:font-medium", children: "Fields" }),
      /* @__PURE__ */ e.jsx(Re, { fields: x, onChange: g, types: l, errors: W(C, "fields") }),
      /* @__PURE__ */ e.jsx(k, { message: C.fields })
    ] })
  ] });
}
function He({ noun: s, base: t, rows: l, intro: c }) {
  const r = `${s}s`;
  a.useBreadcrumbs([{ label: r }]);
  const [n, d] = q();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(p.Head, { title: r }),
    d,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: r }),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: c })
      ] }),
      /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(p.Link, { href: `${t}/create`, children: [
        /* @__PURE__ */ e.jsx(I, {}),
        " New ",
        s.toLowerCase()
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsx(a.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(a.Table, { children: [
      /* @__PURE__ */ e.jsx(a.TableHeader, { children: /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Title" }),
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Handle" }),
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Fields" }),
        l.some((i) => i.usedBy) && /* @__PURE__ */ e.jsx(a.TableHead, { children: "Used by" }),
        /* @__PURE__ */ e.jsx(a.TableHead, { className: "cms:w-12", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: "Actions" }) })
      ] }) }),
      /* @__PURE__ */ e.jsxs(a.TableBody, { children: [
        l.length === 0 && /* @__PURE__ */ e.jsx(a.TableRow, { children: /* @__PURE__ */ e.jsxs(a.TableCell, { colSpan: 5, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: [
          "No ",
          r.toLowerCase(),
          " yet."
        ] }) }),
        l.map((i) => /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx(p.Link, { href: `${t}/${i.id}/edit`, className: "cms:font-medium cms:hover:underline", children: i.title }) }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: i.handle }) }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: i.fields }),
          i.usedBy && /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:text-muted-foreground", children: i.usedBy.join(", ") || "—" }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx(
            a.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Delete ${i.title}`,
              onClick: () => n(
                `Delete the ${s.toLowerCase()} "${i.title}"? Content keeps its values.`,
                () => p.router.delete(`${t}/${i.id}`, { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(A, {})
            }
          ) })
        ] }, i.id))
      ] })
    ] }) })
  ] });
}
function _s({ blueprints: s }) {
  const t = p.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(k, { message: t.blueprint }),
    /* @__PURE__ */ e.jsx(
      He,
      {
        noun: "Blueprint",
        base: y("cms/blueprints"),
        rows: s,
        intro: "The fields editors fill in, for each kind of content."
      }
    )
  ] });
}
function Ds(s) {
  const { entry: t } = s;
  return /* @__PURE__ */ e.jsx(zs, { ...s }, t ? `${t.id}:${t.locale}:${t.version}:${t.status}:${t.trashed}:${t.publishedAt}` : "new");
}
function zs({ collection: s, fields: t, locales: l = [], shared: c = [], sharedValues: r = {}, entry: n, values: d, revisions: i, can: u }) {
  const o = y(`cms/collections/${s.handle}/entries`), h = n ? y(`cms/entries/${n.id}`) : o, m = n ? d.title : "New entry";
  a.useBreadcrumbs([{ label: s.title, href: o }, { label: m }]);
  const [x, g] = q(), [j, C] = N.useState(!1), v = p.useForm({ ...d, locale: n?.locale ?? null, version: n?.version ?? null, publish: !1, published_at: null }), D = n ? { locale: n.locale } : {}, T = l.find((b) => b.main)?.code, w = v.errors, f = n !== null && n.status !== "draft" && !n.hasUnpublishedChanges && !v.isDirty, _ = n === null ? u.create : u.update && !n.trashed, S = (b = !1, G = null) => {
    v.transform((Pe) => ({ ...Pe, publish: b, published_at: G })), n ? v.put(h, { preserveScroll: !0, onSuccess: () => C(!1) }) : v.post(h);
  }, M = (b = null) => {
    u.update ? S(!0, b) : n && p.router.post(`${h}/publish`, { ...D, published_at: b }, { preserveScroll: !0, onSuccess: () => C(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (b) => {
    b.preventDefault(), S();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(p.Head, { title: m }),
    g,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(p.Link, { href: o, "aria-label": `Back to ${s.title}`, children: /* @__PURE__ */ e.jsx(Q, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: m }),
        n && /* @__PURE__ */ e.jsx(a.Badge, { variant: n.status === "published" ? "default" : "secondary", children: n.trashed ? "In the trash" : F(n.status) }),
        v.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        n && !n.trashed && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(
          "a",
          {
            href: n.previewUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            title: v.isDirty ? "Shows the saved draft: save first to see your changes." : "Shows the saved draft.",
            children: [
              /* @__PURE__ */ e.jsx(as, {}),
              " Preview"
            ]
          }
        ) }),
        n?.url && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: n.url, target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ e.jsx(ts, {}),
          " View"
        ] }) }),
        n?.trashed && u.delete && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", onClick: () => p.router.post(`${h}/restore`, {}, { preserveScroll: !0 }), children: [
          /* @__PURE__ */ e.jsx(ns, {}),
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
            onClick: () => x(`Move "${d.title}" to the trash? It comes off the site; you can restore it.`, () => p.router.delete(h)),
            children: /* @__PURE__ */ e.jsx(A, {})
          }
        ),
        _ && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", variant: n && u.publish ? "outline" : "default", disabled: v.processing, children: [
          v.processing && /* @__PURE__ */ e.jsx(ee, { className: "cms:animate-spin" }),
          n ? "Save draft" : "Create draft"
        ] }),
        n && !n.trashed && u.publish && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex", children: [
          /* @__PURE__ */ e.jsx(a.Button, { type: "button", className: "cms:rounded-r-none", disabled: v.processing || f, onClick: () => M(), children: n.status === "draft" ? "Publish" : f ? "Published" : "Publish changes" }),
          /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "icon", className: "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": "More publishing options", children: /* @__PURE__ */ e.jsx(je, {}) }) }),
            /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", children: [
              /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { onSelect: () => C(!0), children: [
                /* @__PURE__ */ e.jsx(es, {}),
                " Publish on a date…"
              ] }),
              n.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
                /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => p.router.post(`${h}/unpublish`, D, { preserveScroll: !0 }), children: "Unpublish" })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }),
    n && l.length > 1 && /* @__PURE__ */ e.jsx(
      Bs,
      {
        entryUrl: h,
        current: n.locale,
        locales: l,
        canAdd: u.create && !n.trashed,
        canRemove: u.delete && !n.isMain && !n.trashed,
        onRemove: () => x(
          `Remove the ${R(n.locale)} translation of "${d.title}"? Its revisions go with it.`,
          () => p.router.delete(`${h}/translations/${n.locale}`)
        )
      }
    ),
    w.version && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: w.version }),
    (w.entry || w.published_at) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: w.entry ?? w.published_at }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_18rem]", children: [
      /* @__PURE__ */ e.jsxs("fieldset", { disabled: !_, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-[2fr_1fr]", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "title", children: "Title" }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "title",
                value: v.data.title,
                "aria-invalid": w.title !== void 0,
                onChange: (b) => v.setData("title", b.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(k, { message: w.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "slug", children: "Slug" }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "slug",
                className: "cms:font-mono",
                value: v.data.slug,
                placeholder: "Made from the title",
                "aria-invalid": w.slug !== void 0,
                onChange: (b) => v.setData("slug", b.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(k, { message: w.slug })
          ] })
        ] }) }),
        t.length > 0 && /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsx(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: t.map((b) => c.includes(b.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
          /* @__PURE__ */ e.jsx(H, { id: `data-${b.handle}`, field: b, content: !0, value: r[b.handle], errors: {}, onChange: () => {
          } }),
          /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
            "Shared by all languages: edit it in ",
            T ? R(T) : "the main language",
            "."
          ] })
        ] }, b.handle) : /* @__PURE__ */ e.jsx(
          H,
          {
            id: `data-${b.handle}`,
            field: b,
            content: !0,
            value: v.data.data[b.handle],
            errors: P(w, `data.${b.handle}`),
            onChange: (G) => v.setData("data", { ...v.data.data, [b.handle]: G })
          },
          b.handle
        )) }) })
      ] }),
      n && /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:flex-col cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs(a.Card, { children: [
          /* @__PURE__ */ e.jsx(a.CardHeader, { children: /* @__PURE__ */ e.jsx(a.CardTitle, { className: "cms:text-base", children: "Status" }) }),
          /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
            /* @__PURE__ */ e.jsxs("p", { children: [
              F(n.status),
              n.status !== "draft" && n.publishedAt ? ` · ${J(n.publishedAt)}` : ""
            ] }),
            n.status !== "draft" && n.hasUnpublishedChanges && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The draft has changes the site doesn't show yet." })
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs(a.Card, { children: [
          /* @__PURE__ */ e.jsx(a.CardHeader, { children: /* @__PURE__ */ e.jsx(a.CardTitle, { className: "cms:text-base", children: "Revisions" }) }),
          /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
            i.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "Each publish keeps one." }),
            i.map((b) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
                /* @__PURE__ */ e.jsx("div", { className: "cms:truncate", children: b.title }),
                /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: J(b.createdAt) })
              ] }),
              u.update && !n.trashed && /* @__PURE__ */ e.jsx(
                a.Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  onClick: () => p.router.post(y(`cms/revisions/${b.id}/restore`), {}, { preserveScroll: !0 }),
                  children: "Restore"
                }
              )
            ] }, b.id))
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(
      Ls,
      {
        open: j,
        onClose: () => C(!1),
        processing: v.processing,
        current: n?.publishedAt ?? null,
        onSchedule: (b) => M(b)
      }
    )
  ] });
}
function Bs({ entryUrl: s, current: t, locales: l, canAdd: c, canRemove: r, onRemove: n }) {
  return /* @__PURE__ */ e.jsxs("nav", { "aria-label": "Languages", className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
    l.map((d) => {
      const i = `${R(d.code)}${d.main ? " (main)" : ""}`;
      return d.status === null ? c ? /* @__PURE__ */ e.jsxs(
        a.Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "cms:border-dashed",
          onClick: () => p.router.post(`${s}/translations`, { locale: d.code }),
          children: [
            /* @__PURE__ */ e.jsx(I, {}),
            " ",
            i
          ]
        },
        d.code
      ) : null : /* @__PURE__ */ e.jsxs(
        a.Button,
        {
          type: "button",
          size: "sm",
          variant: d.code === t ? "secondary" : "ghost",
          "aria-current": d.code === t ? "page" : void 0,
          onClick: () => d.code !== t && p.router.get(`${s}/edit`, { locale: d.code }),
          children: [
            i,
            /* @__PURE__ */ e.jsx(a.Badge, { variant: d.status === "published" ? "default" : "outline", className: "cms:ml-1", children: F(d.status) })
          ]
        },
        d.code
      );
    }),
    r && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:ml-auto cms:text-destructive", onClick: n, children: "Remove this language" })
  ] });
}
function Ls({ open: s, onClose: t, onSchedule: l, current: c, processing: r }) {
  const [n, d] = N.useState("");
  return N.useEffect(() => {
    s && d(ps(c ? new Date(c) : new Date(Date.now() + 864e5)));
  }, [s, c]), /* @__PURE__ */ e.jsx(a.Dialog, { open: s, onOpenChange: (i) => !i && t(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: "Publish on a date" }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: "The entry goes live then; a date in the past publishes it now with that date." })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "published-at", children: "Date and time" }),
      /* @__PURE__ */ e.jsx(a.Input, { id: "published-at", type: "datetime-local", value: n, onChange: (i) => d(i.target.value) }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "In your time zone." })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: t, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", disabled: n === "" || r, onClick: () => l(new Date(n).toISOString()), children: "Publish" })
    ] })
  ] }) });
}
function Is({ collection: s, collections: t, entries: l, query: c, can: r }) {
  a.useBreadcrumbs([{ label: "Entries", href: y("cms/entries") }, ...s ? [{ label: s.title }] : []]);
  const [n, d] = N.useState(c.search), i = s ? y(`cms/collections/${s.handle}/entries`) : "", u = (o) => {
    const h = { ...c, ...o };
    p.router.get(
      i,
      { ...h.search ? { search: h.search } : {}, ...h.trashed ? { trashed: 1 } : {} },
      { preserveState: !0, preserveScroll: !0, replace: !0 }
    );
  };
  return N.useEffect(() => {
    if (n === c.search) return;
    const o = window.setTimeout(() => u({ search: n }), 300);
    return () => window.clearTimeout(o);
  }, [n]), !s || !l ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(p.Head, { title: "Entries" }),
    /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Entries" }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no collections yet. Create one under Structure → Collections, then come back to write its entries." })
  ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(p.Head, { title: s.title }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
        t.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: s.handle, onValueChange: (o) => p.router.get(y(`cms/collections/${o}/entries`)), children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": "Collection", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: t.map((o) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: o.handle, children: o.title }, o.handle)) })
        ] })
      ] }),
      r?.create && !c.trashed && /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(p.Link, { href: `${i}/create`, children: [
        /* @__PURE__ */ e.jsx(I, {}),
        " New entry"
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-sm", children: [
        /* @__PURE__ */ e.jsx(_e, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            className: "cms:pl-9",
            placeholder: "Search titles",
            "aria-label": "Search titles",
            value: n,
            onChange: (o) => d(o.target.value)
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
        l.data.map((o) => /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
          /* @__PURE__ */ e.jsxs(a.TableCell, { children: [
            /* @__PURE__ */ e.jsx(p.Link, { href: y(`cms/entries/${o.id}/edit`), className: "cms:font-medium cms:hover:underline", children: o.title }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
              "/",
              o.slug
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-1", children: [
            /* @__PURE__ */ e.jsx(a.Badge, { variant: o.status === "published" ? "default" : "secondary", children: F(o.status) }),
            o.locales.length > 1 && o.locales.filter((h) => !h.main).map((h) => /* @__PURE__ */ e.jsx(
              a.Badge,
              {
                variant: h.status === "published" ? "default" : "outline",
                className: h.status === null ? "cms:opacity-50" : "",
                title: `${h.code}: ${h.status === null ? "not translated" : F(h.status)}`,
                children: h.code.toUpperCase()
              },
              h.code
            ))
          ] }) }),
          /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:text-muted-foreground", children: J(s.dated ? o.publishedAt : o.updatedAt) })
        ] }, o.id))
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
            children: /* @__PURE__ */ e.jsx(ss, {})
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
            children: /* @__PURE__ */ e.jsx(Ne, {})
          }
        )
      ] })
    ] })
  ] });
}
function As({ fieldsets: s }) {
  const t = p.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(k, { message: t.fieldset }),
    /* @__PURE__ */ e.jsx(
      He,
      {
        noun: "Fieldset",
        base: y("cms/fieldsets"),
        rows: s,
        intro: "Fields shared between blueprints, and the kinds of block of flexible fields."
      }
    )
  ] });
}
function Ms(s) {
  return /* @__PURE__ */ e.jsx(Es, { ...s }, `${s.locale}:${JSON.stringify(s.values)}`);
}
function Es({ set: s, fields: t, locale: l, locales: c, shared: r, values: n, can: d }) {
  const i = y(`cms/globals/${s.handle}`);
  a.useBreadcrumbs([{ label: "Globals", href: y("cms/globals") }, { label: s.title }]);
  const u = p.useForm({ locale: l, data: n }), o = u.errors, h = c[0];
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (m) => {
    m.preventDefault(), u.put(i, { preserveScroll: !0 });
  }, className: "cms:flex cms:max-w-3xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(p.Head, { title: s.title }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(p.Link, { href: y("cms/globals"), "aria-label": "Back to globals", children: /* @__PURE__ */ e.jsx(Q, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
        u.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        c.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: l, onValueChange: (m) => p.router.get(i, { locale: m }), children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: c.map((m, x) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: m, children: [
            R(m),
            x === 0 ? " (main)" : ""
          ] }, m)) })
        ] }),
        d.update && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: u.processing, children: [
          u.processing && /* @__PURE__ */ e.jsx(ee, { className: "cms:animate-spin" }),
          " Save"
        ] })
      ] })
    ] }),
    t.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "This global set has no fields: choose a blueprint for it under Structure → Global sets." }) : /* @__PURE__ */ e.jsx("fieldset", { disabled: !d.update, children: /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsx(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: t.map((m) => r.includes(m.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(H, { id: `data-${m.handle}`, field: m, content: !0, value: n[m.handle], errors: {}, onChange: () => {
      } }),
      /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
        "Shared by all languages: edit it in ",
        h ? R(h) : "the main language",
        "."
      ] })
    ] }, m.handle) : /* @__PURE__ */ e.jsx(
      H,
      {
        id: `data-${m.handle}`,
        field: m,
        content: !0,
        value: u.data.data[m.handle],
        errors: P(o, `data.${m.handle}`),
        onChange: (x) => u.setData("data", { ...u.data.data, [m.handle]: x })
      },
      m.handle
    )) }) }) })
  ] });
}
function Fs({ sets: s }) {
  return a.useBreadcrumbs([{ label: "Globals" }]), /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(p.Head, { title: "Globals" }),
    /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Globals" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Values the whole site uses, like contact details and footer text." })
    ] }),
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no global sets yet. Create one under Structure → Global sets." }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:sm:grid-cols-2 cms:lg:grid-cols-3", children: s.map((t) => /* @__PURE__ */ e.jsx(p.Link, { href: y(`cms/globals/${t.handle}`), className: "cms:rounded-xl cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none", children: /* @__PURE__ */ e.jsxs(a.Card, { className: "cms:h-full cms:transition-colors cms:hover:bg-accent", children: [
      /* @__PURE__ */ e.jsxs(a.CardHeader, { children: [
        /* @__PURE__ */ e.jsx(a.CardTitle, { className: "cms:text-base", children: t.title }),
        /* @__PURE__ */ e.jsx(a.CardDescription, { children: t.blueprint ? /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: t.handle }) : "No blueprint yet: choose one under Structure → Global sets." })
      ] }),
      /* @__PURE__ */ e.jsx(a.CardContent, {})
    ] }) }, t.handle)) })
  ] });
}
const X = "__top";
function Rs({ taxonomy: s, taxonomies: t, terms: l, locales: c, locale: r }) {
  a.useBreadcrumbs([{ label: "Terms", href: y("cms/terms") }, ...s ? [{ label: s.title }] : []]);
  const [n, d] = q(), [i, u] = N.useState(null);
  if (!s)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(p.Head, { title: "Terms" }),
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Terms" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no taxonomies yet. Create one under Structure → Taxonomies (categories, tags…), then add its terms here." })
    ] });
  const o = y(`cms/taxonomies/${s.handle}/terms`);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(p.Head, { title: s.title }),
    d,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
      t.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: s.handle, onValueChange: (h) => p.router.get(y(`cms/taxonomies/${h}/terms`)), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": "Taxonomy", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(a.SelectContent, { children: t.map((h) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: h.handle, children: h.title }, h.handle)) })
      ] }),
      c.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: r, onValueChange: (h) => p.router.get(o, { locale: h }), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:ml-auto cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(a.SelectContent, { children: c.map((h) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: h, children: R(h) }, h)) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsx(a.CardContent, { children: /* @__PURE__ */ e.jsx(
      ie,
      {
        action: o,
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
      l.map((h) => {
        const m = l.filter((g) => g.parentId === h.parentId), x = m.findIndex((g) => g.id === h.id);
        return /* @__PURE__ */ e.jsx("li", { className: "cms:p-3", style: { paddingLeft: `${0.75 + h.depth * 1.5}rem` }, children: i === h.id ? /* @__PURE__ */ e.jsx(
          ie,
          {
            action: y(`cms/terms/${h.id}`),
            method: "put",
            locale: r,
            terms: l,
            hierarchical: s.hierarchical,
            term: h,
            submitLabel: "Save",
            onDone: () => u(null)
          }
        ) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0 cms:flex-1", children: [
            h.title !== null ? /* @__PURE__ */ e.jsx("span", { className: "cms:font-medium", children: h.title }) : /* @__PURE__ */ e.jsxs("span", { className: "cms:text-muted-foreground cms:italic", children: [
              h.fallback,
              " · not translated"
            ] }),
            h.slug && /* @__PURE__ */ e.jsxs("span", { className: "cms:ml-2 cms:text-xs cms:text-muted-foreground", children: [
              "/",
              h.slug
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-label": `Move ${h.fallback} up`,
              disabled: x === 0,
              onClick: () => p.router.post(y(`cms/terms/${h.id}/move`), { direction: "up" }, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(O, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-label": `Move ${h.fallback} down`,
              disabled: x === m.length - 1,
              onClick: () => p.router.post(y(`cms/terms/${h.id}/move`), { direction: "down" }, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(U, {})
            }
          ),
          /* @__PURE__ */ e.jsx(a.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Edit ${h.fallback}`, onClick: () => u(h.id), children: /* @__PURE__ */ e.jsx(ls, {}) }),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Delete ${h.fallback}`,
              onClick: () => n(
                `Delete "${h.fallback}" in every language? Terms under it move up a level.`,
                () => p.router.delete(y(`cms/terms/${h.id}`), { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(A, {})
            }
          )
        ] }) }, h.id);
      })
    ] }) })
  ] });
}
function ie({ action: s, method: t, locale: l, terms: c, hierarchical: r, term: n, submitLabel: d, onDone: i }) {
  const u = p.useForm({ title: n?.title ?? "", slug: n?.slug ?? "", parent_id: n?.parentId ?? null, locale: l }), o = u.errors, h = /* @__PURE__ */ new Set();
  if (n) {
    h.add(n.id);
    const g = c.findIndex((j) => j.id === n.id);
    for (let j = g + 1; j < c.length && (c[j]?.depth ?? 0) > n.depth; j++) h.add(c[j].id);
  }
  const m = (g) => {
    g.preventDefault(), u.submit(t, s, { preserveScroll: !0, onSuccess: () => {
      t === "post" && u.reset("title", "slug"), i?.();
    } });
  }, x = n ? `term-${n.id}` : "new-term";
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: m, className: "cms:grid cms:items-start cms:gap-3 cms:md:grid-cols-[2fr_1.5fr_1.5fr_auto]", children: [
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
      /* @__PURE__ */ e.jsx(k, { message: o.title })
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
      /* @__PURE__ */ e.jsx(k, { message: o.slug })
    ] }),
    r ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${x}-parent`, className: n ? "cms:sr-only" : "", children: "Under" }),
      /* @__PURE__ */ e.jsxs(
        a.Select,
        {
          value: u.data.parent_id === null ? X : String(u.data.parent_id),
          onValueChange: (g) => u.setData("parent_id", g === X ? null : Number(g)),
          children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: `${x}-parent`, children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(a.SelectItem, { value: X, children: "Top level" }),
              c.filter((g) => !h.has(g.id)).map((g) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: String(g.id), children: [
                "— ".repeat(g.depth),
                g.title ?? g.fallback
              ] }, g.id))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ e.jsx(k, { message: o.parent_id })
    ] }) : /* @__PURE__ */ e.jsx("div", {}),
    /* @__PURE__ */ e.jsxs("div", { className: `cms:flex cms:gap-2 ${n ? "" : "cms:md:mt-6"}`, children: [
      /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: u.processing, children: [
        !n && /* @__PURE__ */ e.jsx(I, {}),
        " ",
        d
      ] }),
      i && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", onClick: i, children: "Cancel" })
    ] })
  ] });
}
Ue({
  pages: {
    "Cms/Blueprints/Index": _s,
    "Cms/Blueprints/Form": Ts,
    "Cms/Fieldsets/Index": As,
    "Cms/Entries/Index": Is,
    "Cms/Entries/Editor": Ds,
    "Cms/Terms/Index": Rs,
    "Cms/Globals/Index": Fs,
    "Cms/Globals/Edit": Ms
  }
});
export {
  N as R,
  Hs as _,
  y as a,
  $ as c,
  Ps as i,
  e as j,
  a as u
};
