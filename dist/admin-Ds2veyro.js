function ts(s, t) {
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
const le = 1;
function he() {
  const s = globalThis.Sunrice;
  if (!s)
    throw new Error("[sunrice] This script runs outside the Sunrice admin panel (window.Sunrice is missing).");
  return s;
}
function as(s) {
  const t = he();
  if (t.version !== le)
    throw new Error(`[sunrice] This plugin was built for admin runtime ${le}, but the panel runs ${t.version}. Rebuild it with a matching @sunrice/admin-sdk.`);
  for (const [l, c] of Object.entries(s.pages ?? {}))
    t.registerPage(l, c);
}
function k(s = "") {
  return he().adminUrl(s);
}
const xe = globalThis.Sunrice;
if (!xe) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const e = xe.modules["react/jsx-runtime"], pe = globalThis.Sunrice;
if (!pe) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const w = pe.modules.react, ut = /* @__PURE__ */ ts({
  __proto__: null
}, [w]), ge = globalThis.Sunrice;
if (!ge) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const g = ge.modules["@inertiajs/react"];
const ls = (s) => s?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
function ns(s, t, l = []) {
  if (t == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: ls(s),
    size: 24,
    node: t,
    ...l.length > 0 ? { aliases: l } : {}
  };
}
const cs = (s) => {
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
const rs = (s) => {
  const t = cs(s);
  return t.charAt(0).toUpperCase() + t.slice(1);
};
const te = (...s) => s.filter((t, l, c) => !!t && t.trim() !== "" && c.indexOf(t) === l).join(" ").trim();
const M = {
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
function Q(s) {
  return s != null;
}
function is(s, t = {}) {
  const l = t.attributeNames ?? {}, c = (x) => l[x] ?? x, r = s.size ?? s.width ?? M.width, n = s.size ?? s.height ?? M.height, i = s.aliases?.filter((x) => typeof x == "string" && x.trim() !== "").map((x) => `lucide-${x}`) ?? [], d = [...s.name ? [`lucide-${s.name}`] : [], ...i], u = t.className?.split(" ").filter(Boolean) ?? [], m = t.includeDefaultClasses === !1 ? te(...u) : te("lucide", ...d, ...u), o = t.absoluteStrokeWidth ? Number(t.strokeWidth ?? M["stroke-width"]) * Number(s.size ?? s.width ?? M.width) / Number(t.size ?? t.width ?? M.width) : t.strokeWidth ?? M["stroke-width"];
  return [
    "svg",
    {
      ...Object.entries(M).reduce((x, [p, b]) => (x[c(p)] = b, x), {}),
      ..."color" in t && t.color && {
        [c("stroke")]: t.color
      },
      ..."size" in t && Q(t.size) && {
        [c("width")]: t.size,
        [c("height")]: t.size
      },
      ..."width" in t && Q(t.width) && {
        [c("width")]: t.width
      },
      ..."height" in t && Q(t.height) && {
        [c("height")]: t.height
      },
      [c("stroke-width")]: o,
      ...m && {
        [c("class")]: m
      },
      [c("viewBox")]: `0 0 ${r} ${n}`,
      ...t.hasA11yProp === !1 ? {
        [c("aria-hidden")]: "true"
      } : {},
      ..."attributes" in t && t.attributes
    },
    s.node.map((x) => {
      const [p, b, C] = x, v = t.nonScalingStroke ? { [c("vector-effect")]: "non-scaling-stroke", ...b } : b;
      return C ? [p, v, C] : [p, v];
    })
  ];
}
function os(s, t = {}) {
  return is(s, {
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
const ds = (s) => {
  for (const t in s)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
  return !1;
}, ms = w.createContext({}), us = () => w.useContext(ms), hs = w.forwardRef(
  ({
    color: s,
    size: t,
    width: l,
    height: c,
    strokeWidth: r,
    absoluteStrokeWidth: n,
    nonScalingStroke: i,
    className: d = "",
    children: u,
    iconNode: m = [],
    icon: o = {
      node: m,
      aliases: [],
      size: 24
    },
    ...h
  }, x) => {
    const {
      size: p = 24,
      strokeWidth: b = 2,
      absoluteStrokeWidth: C = !1,
      nonScalingStroke: v = !1,
      color: D = "currentColor",
      className: f = ""
    } = us() ?? {}, N = !!u || ds(h), [j, _, T = []] = os(o, {
      color: s ?? D,
      width: l ?? t ?? p,
      height: c ?? t ?? p,
      strokeWidth: r ?? b,
      absoluteStrokeWidth: n ?? C,
      nonScalingStroke: i ?? v,
      className: te(f, d),
      hasA11yProp: N,
      attributes: h
    });
    return w.createElement(
      j,
      {
        ref: x,
        ..._
      },
      [
        ...T.map(([F, y]) => w.createElement(F, y)),
        ...Array.isArray(u) ? u : [u]
      ]
    );
  }
);
function $(s, t = [], l = []) {
  const c = typeof s == "string" ? ns(s, t, l) : s, r = w.forwardRef(
    ({ className: n, ...i }, d) => w.createElement(hs, {
      ref: d,
      icon: c,
      className: n,
      ...i
    })
  );
  return c.name && (r.displayName = rs(c.name)), r;
}
const je = {
  name: "arrow-down",
  size: 24,
  node: [
    ["path", { d: "M12 5v14", key: "s699le" }],
    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
  ]
};
je.node;
const q = $(je);
const fe = {
  name: "arrow-left",
  size: 24,
  node: [
    ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
    ["path", { d: "M19 12H5", key: "x3x0zl" }]
  ]
};
fe.node;
const K = $(fe);
const be = {
  name: "arrow-up",
  size: 24,
  node: [
    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
    ["path", { d: "M12 19V5", key: "x0mq9r" }]
  ]
};
be.node;
const W = $(be);
const ve = {
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
ve.node;
const xs = $(ve);
const Ne = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
Ne.node;
const ye = $(Ne);
const we = {
  name: "chevron-left",
  size: 24,
  node: [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]]
};
we.node;
const Ce = $(we);
const ke = {
  name: "chevron-right",
  size: 24,
  node: [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]
};
ke.node;
const ae = $(ke);
const Se = {
  name: "download",
  size: 24,
  node: [
    ["path", { d: "M12 15V3", key: "m9g1x1" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
  ]
};
Se.node;
const ps = $(Se);
const $e = {
  name: "external-link",
  size: 24,
  node: [
    ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
    ["path", { d: "M10 14 21 3", key: "gplh6r" }],
    ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
  ]
};
$e.node;
const gs = $($e);
const _e = {
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
_e.node;
const js = $(_e);
const Te = {
  name: "link-2",
  size: 24,
  node: [
    ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
    ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
    ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
  ]
};
Te.node;
const fs = $(Te);
const De = {
  name: "list-indent-decrease",
  size: 24,
  node: [
    ["path", { d: "M21 5H11", key: "us1j55" }],
    ["path", { d: "M21 12H11", key: "wd7e0v" }],
    ["path", { d: "M21 19H11", key: "saa85w" }],
    ["path", { d: "m7 8-4 4 4 4", key: "o5hrat" }]
  ],
  aliases: ["outdent", "indent-decrease"]
};
De.node;
const bs = $(De);
const ze = {
  name: "list-indent-increase",
  size: 24,
  node: [
    ["path", { d: "M21 5H11", key: "us1j55" }],
    ["path", { d: "M21 12H11", key: "wd7e0v" }],
    ["path", { d: "M21 19H11", key: "saa85w" }],
    ["path", { d: "m3 8 4 4-4 4", key: "1a3j6y" }]
  ],
  aliases: ["indent", "indent-increase"]
};
ze.node;
const vs = $(ze);
const Be = {
  name: "loader-circle",
  size: 24,
  node: [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  aliases: ["loader-2"]
};
Be.node;
const Z = $(Be);
const Le = {
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
Le.node;
const Ns = $(Le);
const Ie = {
  name: "plus",
  size: 24,
  node: [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ]
};
Ie.node;
const I = $(Ie);
const Me = {
  name: "rotate-ccw",
  size: 24,
  node: [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ]
};
Me.node;
const ys = $(Me);
const Ae = {
  name: "search",
  size: 24,
  node: [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ]
};
Ae.node;
const Ee = $(Ae);
const Fe = {
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
Fe.node;
const B = $(Fe);
const He = {
  name: "x",
  size: 24,
  node: [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]
};
He.node;
const ws = $(He), Re = globalThis.Sunrice;
if (!Re) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const a = Re.modules["@sunrice/admin-sdk/ui"];
function G() {
  const [s, t] = w.useState(null), l = /* @__PURE__ */ e.jsx(a.Dialog, { open: s !== null, onOpenChange: (c) => !c && t(null), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
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
const Cs = 5;
let ks = 0;
const Pe = () => `f${++ks}`;
function Oe(s) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function Ve(s, t) {
  const l = new Set(t.map((n) => n.handle)), c = Oe(s) || "field";
  let r = c;
  for (let n = 2; l.has(r); n++)
    r = `${c}_${n}`;
  return r;
}
function Ue(s) {
  return (s ?? []).map(({ fields: t, ...l }) => ({
    ...l,
    key: Pe(),
    fields: Ue(t),
    handleTouched: !0
  }));
}
function qe(s, t) {
  return s.map(({ key: l, handleTouched: c, fields: r, ...n }) => ({
    ...n,
    validation: (n.validation ?? []).map((i) => i.trim()).filter((i) => i !== ""),
    ...t(n.type) ? { fields: qe(r, t) } : {}
  }));
}
function Ss(s, t, l) {
  return { key: Pe(), type: s, label: t, handle: Ve(t, l), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function H(s, t, l) {
  const c = t + l;
  if (t < 0 || t >= s.length || c < 0 || c >= s.length) return s;
  const r = s.slice(), [n] = r.splice(t, 1);
  return r.splice(c, 0, n), r;
}
function $s(s, t, l) {
  if (s.handleTouched) return { ...s, label: t };
  const c = l.filter((r) => r.key !== s.key);
  return { ...s, label: t, handle: Ve(t || s.type, c) };
}
function X(s, t) {
  const l = `${t}.`, c = {};
  for (const [r, n] of Object.entries(s))
    r.startsWith(l) && (c[r.slice(l.length)] = n);
  return c;
}
function E(s, t) {
  const l = s[t];
  return { ...X(s, t), ...l !== void 0 ? { "": l } : {} };
}
function ne(s, t) {
  return Object.keys(s).some((l) => l === t || l.startsWith(`${t}.`));
}
function O(s) {
  return s && typeof s == "object" && !Array.isArray(s) ? s : {};
}
function _s(s, t) {
  if (typeof s != "string" || s === "") return "";
  const l = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(s);
  return l ? t ? `${l[1]}T${l[2] ?? "00:00"}` : l[1] ?? "" : "";
}
function Ts(s) {
  return s === "" ? null : s;
}
function Ds() {
  return { _hidden: !1 };
}
function zs(s) {
  return { type: s, hidden: !1, values: {} };
}
function Bs(s) {
  const t = s.replace(/[\u0000- \u007f]+/g, ""), l = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(t);
  return l ? ["http", "https", "mailto", "tel"].includes(l[1].toLowerCase()) : !t.includes("\\");
}
function We({ ids: s, search: t, collections: l }) {
  const c = new URLSearchParams();
  for (const r of s ?? []) c.append("ids[]", String(r));
  t && c.set("search", t);
  for (const r of l) c.append("collections[]", r);
  return c.toString();
}
function R(s) {
  return { draft: "Draft", scheduled: "Scheduled", published: "Published" }[s];
}
function V(s, t) {
  if (!s) return "—";
  const l = new Date(s);
  return Number.isNaN(l.getTime()) ? "—" : l.toLocaleString(t, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
function Ls(s) {
  const t = (l) => String(l).padStart(2, "0");
  return `${s.getFullYear()}-${t(s.getMonth() + 1)}-${t(s.getDate())}T${t(s.getHours())}:${t(s.getMinutes())}`;
}
function z(s, t) {
  try {
    return new Intl.DisplayNames(t ? [t] : void 0, { type: "language" }).of(s.replace("_", "-")) ?? s;
  } catch {
    return s;
  }
}
async function ce(s) {
  const t = await fetch(`${k("cms/entry-picker")}?${We(s)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!t.ok) throw new Error(String(t.status));
  return (await t.json()).items;
}
function Ge({ id: s, value: t, multiple: l, max: c, collections: r, invalid: n, onChange: i }) {
  const d = t === null ? [] : Array.isArray(t) ? t : [t], [u, m] = w.useState({}), [o, h] = w.useState(""), [x, p] = w.useState(null), [b, C] = w.useState(!1), v = l && c !== null && d.length >= c, D = d.filter((j) => !u[j]).join(",");
  w.useEffect(() => {
    D !== "" && ce({ ids: D.split(",").map(Number), collections: r }).then((j) => m((_) => ({ ..._, ...Object.fromEntries(j.map((T) => [T.id, T])) }))).catch(() => C(!0));
  }, [D]), w.useEffect(() => {
    if (o.trim() === "") {
      p(null);
      return;
    }
    const j = window.setTimeout(() => {
      ce({ search: o.trim(), collections: r }).then((_) => {
        p(_), C(!1);
      }).catch(() => C(!0));
    }, 250);
    return () => window.clearTimeout(j);
  }, [o]);
  const f = (j) => {
    m((_) => ({ ..._, [j.id]: j })), i(l ? [...d, j.id] : j.id), h("");
  }, N = (j) => i(l ? j : j[0] ?? null);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    d.length > 0 && /* @__PURE__ */ e.jsx("ul", { className: "cms:flex cms:flex-col cms:gap-1", children: d.map((j, _) => {
      const T = u[j];
      return /* @__PURE__ */ e.jsxs("li", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-md cms:border cms:px-3 cms:py-1.5 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate", children: T ? T.title : `Entry #${j}` }),
        T && /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: T.collection }),
        T && /* @__PURE__ */ e.jsx(a.Badge, { variant: T.status === "published" ? "default" : "secondary", children: R(T.status) }),
        l && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-7",
              "aria-label": `Move ${T?.title ?? j} up`,
              disabled: _ === 0,
              onClick: () => N(H(d, _, -1)),
              children: /* @__PURE__ */ e.jsx(W, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-7",
              "aria-label": `Move ${T?.title ?? j} down`,
              disabled: _ === d.length - 1,
              onClick: () => N(H(d, _, 1)),
              children: /* @__PURE__ */ e.jsx(q, {})
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
            "aria-label": `Remove ${T?.title ?? j}`,
            onClick: () => N(d.filter((F) => F !== j)),
            children: /* @__PURE__ */ e.jsx(ws, {})
          }
        )
      ] }, j);
    }) }),
    !v && (l || d.length === 0) && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-md", children: [
      /* @__PURE__ */ e.jsx(Ee, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: s,
          className: "cms:pl-9",
          placeholder: "Search entries by title",
          "aria-invalid": n,
          value: o,
          autoComplete: "off",
          onChange: (j) => h(j.target.value)
        }
      ),
      x !== null && /* @__PURE__ */ e.jsxs("ul", { role: "listbox", "aria-label": "Matching entries", className: "cms:absolute cms:z-10 cms:mt-1 cms:max-h-64 cms:w-full cms:overflow-auto cms:rounded-md cms:border cms:bg-card cms:p-1 cms:shadow-md", children: [
        x.filter((j) => !d.includes(j.id)).length === 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: "No entries match." }),
        x.filter((j) => !d.includes(j.id)).map((j) => /* @__PURE__ */ e.jsx("li", { role: "option", "aria-selected": !1, children: /* @__PURE__ */ e.jsxs(
          "button",
          {
            type: "button",
            className: "cms:flex cms:w-full cms:items-center cms:gap-2 cms:rounded cms:px-2 cms:py-1.5 cms:text-left cms:text-sm cms:hover:bg-accent",
            onClick: () => f(j),
            children: [
              /* @__PURE__ */ e.jsx("span", { className: "cms:flex-1 cms:truncate", children: j.title }),
              /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: j.collection })
            ]
          }
        ) }, j.id))
      ] })
    ] }),
    b && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "Entries could not be loaded. Try again." })
  ] });
}
const Is = w.lazy(() => import("./RichTextEditor-Cze1_3ZS.js").then((s) => ({ default: s.RichTextEditor }))), ee = "__none";
function S({ message: s }) {
  return s ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: s }) : null;
}
function re(s) {
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
const Ms = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function As(s) {
  if (s.label) return s.label;
  const t = s.handle.replace(/_/g, " ");
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function P({ field: s, value: t, onChange: l, errors: c, id: r, content: n = !1 }) {
  const i = As(s), d = Ms.includes(s.type) || ["select", "terms"].includes(s.type) && s.config?.multiple === !0;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", ...d ? { role: "group", "aria-labelledby": `${r}-label` } : {}, children: [
    s.type === "toggle" ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(a.Switch, { id: r, checked: t === !0, onCheckedChange: (u) => l(u) }),
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: r, children: i })
    ] }) : /* @__PURE__ */ e.jsxs(a.Label, { id: `${r}-label`, htmlFor: d ? void 0 : r, children: [
      i,
      s.required && /* @__PURE__ */ e.jsx("span", { className: "cms:text-destructive", children: " *" })
    ] }),
    /* @__PURE__ */ e.jsx(Es, { field: s, value: t, onChange: l, errors: c, id: r, content: n }),
    s.instructions && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s.instructions }),
    /* @__PURE__ */ e.jsx(S, { message: c[""] })
  ] });
}
function Es({ field: s, value: t, onChange: l, errors: c, id: r, content: n }) {
  const i = c[""] !== void 0;
  switch (s.type) {
    case "toggle":
      return null;
    case "textarea":
      return /* @__PURE__ */ e.jsx(
        a.Textarea,
        {
          id: r,
          "aria-invalid": i,
          value: typeof t == "string" ? t : "",
          rows: A(s, "rows") ?? 4,
          onChange: (d) => l(d.target.value)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ e.jsx(w.Suspense, { fallback: /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-48 cms:w-full" }), children: /* @__PURE__ */ e.jsx(Is, { id: r, labelledBy: `${r}-label`, invalid: i, value: typeof t == "string" ? t : "", onChange: l }) });
    case "number":
      return /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: r,
          type: "number",
          className: "cms:max-w-48",
          "aria-invalid": i,
          value: typeof t == "number" ? String(t) : typeof t == "string" ? t : "",
          min: A(s, "min"),
          max: A(s, "max"),
          step: A(s, "step") ?? "any",
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
          "aria-invalid": i,
          value: _s(t, d),
          onChange: (u) => l(Ts(u.target.value))
        }
      );
    }
    case "select":
      return s.config?.multiple === !0 ? /* @__PURE__ */ e.jsx(oe, { options: re(s), value: Array.isArray(t) ? t.map(String) : [], onChange: l }) : /* @__PURE__ */ e.jsx(ie, { options: re(s), value: typeof t == "string" ? t : null, onChange: l, id: r, required: s.required === !0 });
    case "terms": {
      const d = s.terms ?? [];
      if (s.config?.multiple === !0) {
        const u = Array.isArray(t) ? t.map(String) : [];
        return /* @__PURE__ */ e.jsx(oe, { options: d, value: u, onChange: (m) => l(m.map(Number)) });
      }
      return /* @__PURE__ */ e.jsx(
        ie,
        {
          options: d,
          id: r,
          required: s.required === !0,
          value: t == null ? null : String(t),
          onChange: (u) => l(u === null ? null : Number(u))
        }
      );
    }
    case "entries":
      return /* @__PURE__ */ e.jsx(
        Ge,
        {
          id: r,
          invalid: i,
          multiple: s.config?.multiple === !0,
          max: A(s, "max") ?? null,
          collections: s.collections ?? [],
          onChange: l,
          value: typeof t == "number" || Array.isArray(t) && t.every((d) => typeof d == "number") ? t : null
        }
      );
    case "link":
      return /* @__PURE__ */ e.jsx(Hs, { value: O(t), onChange: l, errors: c, id: r });
    case "media":
      return /* @__PURE__ */ e.jsx(
        a.MediaPickerInput,
        {
          id: r,
          invalid: i,
          disabled: !1,
          multiple: s.config?.multiple === !0,
          max: A(s, "max") ?? null,
          types: Array.isArray(s.config?.types) ? s.config.types : [],
          value: typeof t == "number" || Array.isArray(t) && t.every((d) => typeof d == "number") ? t : null,
          onChange: l
        }
      );
    case "group":
      return /* @__PURE__ */ e.jsx(Y, { fields: s.fields ?? [], value: O(t), onChange: l, errors: c, id: r, content: n });
    case "repeater":
      return /* @__PURE__ */ e.jsx(Ps, { field: s, value: Array.isArray(t) ? t : [], onChange: l, errors: c, id: r, content: n });
    case "flexible":
      return /* @__PURE__ */ e.jsx(Os, { field: s, value: Array.isArray(t) ? t : [], onChange: l, errors: c, id: r });
    default:
      return /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: r,
          "aria-invalid": i,
          value: typeof t == "string" ? t : "",
          placeholder: Fs(s, "placeholder"),
          maxLength: A(s, "max"),
          onChange: (d) => l(d.target.value)
        }
      );
  }
}
function A(s, t) {
  const l = s.config?.[t];
  return typeof l == "number" ? l : void 0;
}
function Fs(s, t) {
  const l = s.config?.[t];
  return typeof l == "string" ? l : void 0;
}
function Y({ fields: s, value: t, onChange: l, errors: c, id: r, content: n }) {
  return /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-4 cms:rounded-lg cms:border cms:p-4", children: s.map((i) => /* @__PURE__ */ e.jsx(
    P,
    {
      id: `${r}-${i.handle}`,
      field: i,
      value: t[i.handle],
      content: n,
      errors: E(c, i.handle),
      onChange: (d) => l({ ...t, [i.handle]: d })
    },
    i.handle
  )) });
}
function ie({ options: s, value: t, onChange: l, id: c, required: r }) {
  return /* @__PURE__ */ e.jsxs(a.Select, { value: t ?? ee, onValueChange: (n) => l(n === ee ? null : n), children: [
    /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: c, className: "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
    /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
      !r && /* @__PURE__ */ e.jsx(a.SelectItem, { value: ee, children: "None" }),
      s.map((n) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: n.value, children: n.label }, n.value))
    ] })
  ] });
}
function oe({ options: s, value: t, onChange: l }) {
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
function Hs({ value: s, onChange: t, errors: l, id: c }) {
  const r = (n, i) => {
    const d = { ...s, [n]: i };
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
    /* @__PURE__ */ e.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ e.jsx(S, { message: l.url ?? l.label }) })
  ] });
}
function Rs(s, t) {
  return !t && (s.fields ?? []).every((l) => l.type === "text");
}
function Ps({ field: s, value: t, onChange: l, errors: c, id: r, content: n = !1 }) {
  const i = s.fields ?? [], d = t.map(O), u = (h, x) => l(d.map((p, b) => b === h ? x : p)), m = (s.label || "row").toLowerCase().replace(/s$/, ""), o = m.charAt(0).toUpperCase() + m.slice(1);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    d.map((h, x) => Rs(s, n) ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
      i.map((p) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            "aria-label": p.label || p.handle,
            placeholder: p.label || p.handle,
            value: typeof h[p.handle] == "string" ? h[p.handle] : "",
            onChange: (b) => u(x, { ...h, [p.handle]: b.target.value })
          }
        ),
        /* @__PURE__ */ e.jsx(S, { message: c[`${x}.${p.handle}`] })
      ] }, p.handle)),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": `Remove ${m} ${x + 1}`, onClick: () => l(d.filter((p, b) => b !== x)), children: /* @__PURE__ */ e.jsx(B, {}) })
    ] }, x) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(
        Ke,
        {
          label: `${o} ${x + 1}`,
          index: x,
          count: d.length,
          onMove: (p) => l(H(d, x, p)),
          onRemove: () => l(d.filter((p, b) => b !== x)),
          hidden: n ? h._hidden === !0 : void 0,
          onHidden: (p) => u(x, { ...h, _hidden: p })
        }
      ),
      /* @__PURE__ */ e.jsx(Y, { fields: i, value: h, onChange: (p) => u(x, p), errors: E(c, String(x)), id: `${r}-${x}`, content: n })
    ] }, typeof h._id == "string" ? h._id : x)),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => l([...d, n ? Ds() : {}]), children: [
      /* @__PURE__ */ e.jsx(I, {}),
      " Add ",
      m
    ] }) })
  ] });
}
function Os({ field: s, value: t, onChange: l, errors: c, id: r }) {
  const n = s.blocks ?? [], i = t.map(O), d = (u, m) => l(i.map((o, h) => h === u ? m : o));
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    i.map((u, m) => {
      const o = n.find((h) => h.type === u.type);
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(
          Ke,
          {
            label: o?.label ?? String(u.type),
            badge: !0,
            index: m,
            count: i.length,
            onMove: (h) => l(H(i, m, h)),
            onRemove: () => l(i.filter((h, x) => x !== m)),
            hidden: u.hidden === !0,
            onHidden: (h) => d(m, { ...u, hidden: h })
          }
        ),
        o ? /* @__PURE__ */ e.jsx(
          Y,
          {
            fields: o.fields,
            value: O(u.values),
            onChange: (h) => d(m, { ...u, values: h }),
            errors: E(c, `${m}.values`),
            id: `${r}-${m}`,
            content: !0
          }
        ) : /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: "This kind of block no longer exists. Its values are kept." }),
        /* @__PURE__ */ e.jsx(S, { message: c[`${m}.type`] })
      ] }, typeof u.id == "string" ? u.id : m);
    }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", disabled: n.length === 0, children: [
        /* @__PURE__ */ e.jsx(I, {}),
        " Add block"
      ] }) }),
      /* @__PURE__ */ e.jsx(a.DropdownMenuContent, { align: "start", children: n.map((u) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => l([...i, zs(u.type)]), children: u.label }, u.type)) })
    ] }) })
  ] });
}
function Ke({ label: s, badge: t = !1, index: l, count: c, onMove: r, onRemove: n, hidden: i, onHidden: d }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    t ? /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: s }) : /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:font-medium", children: s }),
    i !== void 0 && /* @__PURE__ */ e.jsxs("label", { className: "cms:ml-auto cms:flex cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", children: [
      /* @__PURE__ */ e.jsx(a.Switch, { checked: !i, onCheckedChange: (u) => d(!u), "aria-label": `Show ${s}` }),
      "Show"
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: i === void 0 ? "cms:ml-auto cms:flex" : "cms:flex", children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Move ${s} up`, disabled: l === 0, onClick: () => r(-1), children: /* @__PURE__ */ e.jsx(W, {}) }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Move ${s} down`, disabled: l === c - 1, onClick: () => r(1), children: /* @__PURE__ */ e.jsx(q, {}) }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": `Remove ${s}`, onClick: n, children: /* @__PURE__ */ e.jsx(B, {}) })
    ] })
  ] });
}
function Ze({ fields: s, onChange: t, types: l, errors: c, depth: r = 1, idPrefix: n = "field" }) {
  const [i, d] = w.useState(() => /* @__PURE__ */ new Set()), u = (h) => d((x) => {
    const p = new Set(x);
    return p.has(h) ? p.delete(h) : p.add(h), p;
  }), m = (h, x) => t(s.map((p, b) => b === h ? x : p)), o = (h) => {
    const x = Ss(h.type, h.label, s);
    t([...s, x]), d((p) => new Set(p).add(x.key));
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:border-dashed cms:p-4 cms:text-sm cms:text-muted-foreground", children: "No fields yet." }),
    s.map((h, x) => {
      const p = l.find((v) => v.type === h.type), b = i.has(h.key) || ne(c, String(x)), C = `${n}-${h.key}`;
      return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${ne(c, String(x)) ? "cms:border-destructive" : ""}`, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:p-2", children: [
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-expanded": b,
              "aria-controls": C,
              "aria-label": `${b ? "Close" : "Open"} ${h.label || h.handle}`,
              onClick: () => u(h.key),
              children: b ? /* @__PURE__ */ e.jsx(ye, {}) : /* @__PURE__ */ e.jsx(ae, {})
            }
          ),
          /* @__PURE__ */ e.jsxs("button", { type: "button", className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:text-left", onClick: () => u(h.key), children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: h.label || h.handle }),
            /* @__PURE__ */ e.jsx("code", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", children: h.handle })
          ] }),
          h.required && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", children: "Required" }),
          /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: p?.label ?? h.type }),
          /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move up", disabled: x === 0, onClick: () => t(H(s, x, -1)), children: /* @__PURE__ */ e.jsx(W, {}) }),
          /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move down", disabled: x === s.length - 1, onClick: () => t(H(s, x, 1)), children: /* @__PURE__ */ e.jsx(q, {}) }),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Remove ${h.label || h.handle}`,
              onClick: () => t(s.filter((v, D) => D !== x)),
              children: /* @__PURE__ */ e.jsx(B, {})
            }
          )
        ] }),
        b && /* @__PURE__ */ e.jsx(
          Vs,
          {
            id: C,
            field: h,
            type: p,
            siblings: s,
            onChange: (v) => m(x, v),
            types: l,
            errors: X(c, String(x)),
            depth: r
          }
        )
      ] }, h.key);
    }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", children: [
        /* @__PURE__ */ e.jsx(I, {}),
        " Add field"
      ] }) }),
      /* @__PURE__ */ e.jsx(a.DropdownMenuContent, { align: "start", children: l.filter((h) => !h.hasChildren || r < Cs).map((h) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => o(h), children: h.label }, h.type)) })
    ] }) })
  ] });
}
const L = { default: "__default", yes: "yes", no: "no" };
function Vs({ id: s, field: t, type: l, siblings: c, onChange: r, types: n, errors: i, depth: d }) {
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
        /* @__PURE__ */ e.jsx(a.Input, { id: `${s}-label`, value: t.label ?? "", onChange: (m) => r($s(t, m.target.value, c)) }),
        /* @__PURE__ */ e.jsx(S, { message: i.label })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-handle`, children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: `${s}-handle`,
            className: "cms:font-mono",
            value: t.handle,
            onChange: (m) => r({ ...t, handle: m.target.value, handleTouched: !0 })
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "How templates read it. Renaming it hides values saved under the old one." }),
        /* @__PURE__ */ e.jsx(S, { message: i.handle })
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
          onChange: (m) => r({ ...t, instructions: m.target.value || null })
        }
      ),
      /* @__PURE__ */ e.jsx(S, { message: i.instructions })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-6", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Switch, { id: `${s}-required`, checked: t.required === !0, onCheckedChange: (m) => r({ ...t, required: m }) }),
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-required`, children: "Required" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-translatable`, children: "Per language" }),
        /* @__PURE__ */ e.jsxs(
          a.Select,
          {
            value: t.translatable === !0 ? L.yes : t.translatable === !1 ? L.no : L.default,
            onValueChange: (m) => r({ ...t, translatable: m === L.yes ? !0 : m === L.no ? !1 : null }),
            children: [
              /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: `${s}-translatable`, className: "cms:w-48", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
              /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: L.default, children: "As the type decides" }),
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: L.yes, children: "Yes, translated" }),
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: L.no, children: "No, shared" })
              ] })
            ]
          }
        )
      ] })
    ] }),
    (l?.settings.length ?? 0) > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: l?.settings.map((m) => /* @__PURE__ */ e.jsx(
      P,
      {
        id: `${s}-config-${m.handle}`,
        field: m,
        value: u[m.handle],
        errors: E(i, `config.${m.handle}`),
        onChange: (o) => r({ ...t, config: { ...u, [m.handle]: o } })
      },
      m.handle
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
          onChange: (m) => r({ ...t, validation: m.target.value.split(`
`) })
        }
      ),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Laravel rules, one per line." }),
      /* @__PURE__ */ e.jsx(S, { message: i.validation ?? Object.entries(i).find(([m]) => m.startsWith("validation."))?.[1] })
    ] }),
    l?.hasChildren && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { children: "Fields inside" }),
      /* @__PURE__ */ e.jsx(
        Ze,
        {
          fields: t.fields,
          onChange: (m) => r({ ...t, fields: m }),
          types: n,
          errors: X(i, "fields"),
          depth: d + 1,
          idPrefix: s
        }
      ),
      /* @__PURE__ */ e.jsx(S, { message: i.fields })
    ] }),
    /* @__PURE__ */ e.jsx(S, { message: i.type })
  ] });
}
function Us({ kind: s = "blueprint", blueprint: t, fieldTypes: l, usedBy: c = [] }) {
  const r = s === "fieldset" ? "Fieldset" : "Blueprint", n = k(s === "fieldset" ? "cms/fieldsets" : "cms/blueprints"), i = t ? t.title : `New ${r.toLowerCase()}`;
  a.useBreadcrumbs([{ label: `${r}s`, href: n }, { label: i }]);
  const [d, u] = G(), m = g.useForm({ title: t?.title ?? "", handle: t?.handle ?? "" }), [o, h] = w.useState(t !== null), [x, p] = w.useState(() => Ue(t?.fields)), b = (f) => l.find((N) => N.type === f)?.hasChildren === !0, C = m.errors, v = (f) => {
    f.preventDefault(), m.transform((N) => ({
      ...t ? { title: N.title } : N,
      fields: qe(x, b)
    })), t ? m.put(`${n}/${t.id}`, { preserveScroll: !0 }) : m.post(n);
  }, D = () => t && d(
    `Delete the ${r.toLowerCase()} "${t.title}"? Content keeps its values.`,
    () => g.router.delete(`${n}/${t.id}`, { preserveScroll: !0 })
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: v, className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(g.Head, { title: i }),
    u,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(g.Link, { href: n, "aria-label": `Back to ${r.toLowerCase()}s`, children: /* @__PURE__ */ e.jsx(K, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: i })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        t && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "icon", className: "cms:text-destructive", "aria-label": `Delete ${i}`, onClick: D, children: /* @__PURE__ */ e.jsx(B, {}) }),
        /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: m.processing, children: [
          m.processing && /* @__PURE__ */ e.jsx(Z, { className: "cms:animate-spin" }),
          t ? "Save" : `Create ${r.toLowerCase()}`
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(S, { message: C.blueprint ?? C.fieldset }),
    /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "title", children: "Title" }),
        /* @__PURE__ */ e.jsx(a.Input, { id: "title", value: m.data.title, required: !0, onChange: (f) => {
          m.setData((N) => ({ ...N, title: f.target.value, handle: o ? N.handle : Oe(f.target.value) }));
        } }),
        /* @__PURE__ */ e.jsx(S, { message: C.title })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "handle", children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: "handle",
            className: "cms:font-mono",
            value: m.data.handle,
            disabled: t !== null,
            required: !0,
            onChange: (f) => {
              h(!0), m.setData("handle", f.target.value);
            }
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t ? "Set when it was created." : "Lowercase letters, digits and underscores. It can't change later." }),
        /* @__PURE__ */ e.jsx(S, { message: C.handle })
      ] })
    ] }) }),
    c.length > 0 && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      "Used by ",
      c.join(", "),
      ". Changes show there at once."
    ] }),
    /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-3", "aria-labelledby": "fields-heading", children: [
      /* @__PURE__ */ e.jsx("h2", { id: "fields-heading", className: "cms:text-lg cms:font-medium", children: "Fields" }),
      /* @__PURE__ */ e.jsx(Ze, { fields: x, onChange: p, types: l, errors: X(C, "fields") }),
      /* @__PURE__ */ e.jsx(S, { message: C.fields })
    ] })
  ] });
}
function Xe({ noun: s, base: t, rows: l, intro: c }) {
  const r = `${s}s`;
  a.useBreadcrumbs([{ label: r }]);
  const [n, i] = G();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(g.Head, { title: r }),
    i,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: r }),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: c })
      ] }),
      /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(g.Link, { href: `${t}/create`, children: [
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
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx(g.Link, { href: `${t}/${d.id}/edit`, className: "cms:font-medium cms:hover:underline", children: d.title }) }),
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
                () => g.router.delete(`${t}/${d.id}`, { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(B, {})
            }
          ) })
        ] }, d.id))
      ] })
    ] }) })
  ] });
}
function qs({ blueprints: s }) {
  const t = g.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(S, { message: t.blueprint }),
    /* @__PURE__ */ e.jsx(
      Xe,
      {
        noun: "Blueprint",
        base: k("cms/blueprints"),
        rows: s,
        intro: "The fields editors fill in, for each kind of content."
      }
    )
  ] });
}
const Ws = [
  { handle: "title", type: "text", label: "SEO title", instructions: "For search results and tabs. Empty: the title.", config: { max: 255 } },
  { handle: "description", type: "textarea", label: "Description", instructions: "A sentence or two for search results and shared links.", config: { max: 500 } },
  { handle: "image", type: "media", label: "Share image", instructions: "Shown when the page is shared.", config: { types: ["image"] } },
  { handle: "noindex", type: "toggle", label: "Hide from search engines" }
];
function Gs(s) {
  const { entry: t } = s;
  return /* @__PURE__ */ e.jsx(Ks, { ...s }, t ? `${t.id}:${t.locale}:${t.version}:${t.status}:${t.trashed}:${t.publishedAt}` : "new");
}
function Ks({ collection: s, fields: t, locales: l = [], shared: c = [], sharedValues: r = {}, entry: n, values: i, revisions: d, can: u }) {
  const m = k(`cms/collections/${s.handle}/entries`), o = n ? k(`cms/entries/${n.id}`) : m, h = n ? i.title : "New entry";
  a.useBreadcrumbs([{ label: s.title, href: m }, { label: h }]);
  const [x, p] = G(), [b, C] = w.useState(!1), v = g.useForm({ ...i, seo: i.seo ?? {}, locale: n?.locale ?? null, version: n?.version ?? null, publish: !1, published_at: null }), D = n ? { locale: n.locale } : {}, f = l.find((y) => y.main)?.code, N = v.errors, j = n !== null && n.status !== "draft" && !n.hasUnpublishedChanges && !v.isDirty, _ = n === null ? u.create : u.update && !n.trashed, T = (y = !1, J = null) => {
    v.transform((ss) => ({ ...ss, publish: y, published_at: J })), n ? v.put(o, { preserveScroll: !0, onSuccess: () => C(!1) }) : v.post(o);
  }, F = (y = null) => {
    u.update ? T(!0, y) : n && g.router.post(`${o}/publish`, { ...D, published_at: y }, { preserveScroll: !0, onSuccess: () => C(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (y) => {
    y.preventDefault(), T();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(g.Head, { title: h }),
    p,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(g.Link, { href: m, "aria-label": `Back to ${s.title}`, children: /* @__PURE__ */ e.jsx(K, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: h }),
        n && /* @__PURE__ */ e.jsx(a.Badge, { variant: n.status === "published" ? "default" : "secondary", children: n.trashed ? "In the trash" : R(n.status) }),
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
              /* @__PURE__ */ e.jsx(js, {}),
              " Preview"
            ]
          }
        ) }),
        n?.url && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: n.url, target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ e.jsx(gs, {}),
          " View"
        ] }) }),
        n?.trashed && u.delete && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", onClick: () => g.router.post(`${o}/restore`, {}, { preserveScroll: !0 }), children: [
          /* @__PURE__ */ e.jsx(ys, {}),
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
            onClick: () => x(`Move "${i.title}" to the trash? It comes off the site; you can restore it.`, () => g.router.delete(o)),
            children: /* @__PURE__ */ e.jsx(B, {})
          }
        ),
        _ && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", variant: n && u.publish ? "outline" : "default", disabled: v.processing, children: [
          v.processing && /* @__PURE__ */ e.jsx(Z, { className: "cms:animate-spin" }),
          n ? "Save draft" : "Create draft"
        ] }),
        n && !n.trashed && u.publish && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex", children: [
          /* @__PURE__ */ e.jsx(a.Button, { type: "button", className: "cms:rounded-r-none", disabled: v.processing || j, onClick: () => F(), children: n.status === "draft" ? "Publish" : j ? "Published" : "Publish changes" }),
          /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "icon", className: "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": "More publishing options", children: /* @__PURE__ */ e.jsx(ye, {}) }) }),
            /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", children: [
              /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { onSelect: () => C(!0), children: [
                /* @__PURE__ */ e.jsx(xs, {}),
                " Publish on a date…"
              ] }),
              n.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
                /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => g.router.post(`${o}/unpublish`, D, { preserveScroll: !0 }), children: "Unpublish" })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }),
    n && l.length > 1 && /* @__PURE__ */ e.jsx(
      Zs,
      {
        entryUrl: o,
        current: n.locale,
        locales: l,
        canAdd: u.create && !n.trashed,
        canRemove: u.delete && !n.isMain && !n.trashed,
        onRemove: () => x(
          `Remove the ${z(n.locale)} translation of "${i.title}"? Its revisions go with it.`,
          () => g.router.delete(`${o}/translations/${n.locale}`)
        )
      }
    ),
    N.version && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: N.version }),
    (N.entry || N.published_at) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: N.entry ?? N.published_at }),
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
                "aria-invalid": N.title !== void 0,
                onChange: (y) => v.setData("title", y.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(S, { message: N.title })
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
                "aria-invalid": N.slug !== void 0,
                onChange: (y) => v.setData("slug", y.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(S, { message: N.slug })
          ] })
        ] }) }),
        t.length > 0 && /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsx(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: t.map((y) => c.includes(y.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
          /* @__PURE__ */ e.jsx(P, { id: `data-${y.handle}`, field: y, content: !0, value: r[y.handle], errors: {}, onChange: () => {
          } }),
          /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
            "Shared by all languages: edit it in ",
            f ? z(f) : "the main language",
            "."
          ] })
        ] }, y.handle) : /* @__PURE__ */ e.jsx(
          P,
          {
            id: `data-${y.handle}`,
            field: y,
            content: !0,
            value: v.data.data[y.handle],
            errors: E(N, `data.${y.handle}`),
            onChange: (J) => v.setData("data", { ...v.data.data, [y.handle]: J })
          },
          y.handle
        )) }) }),
        /* @__PURE__ */ e.jsxs(a.Card, { children: [
          /* @__PURE__ */ e.jsx(a.CardHeader, { children: /* @__PURE__ */ e.jsx(a.CardTitle, { className: "cms:text-base", children: "Search and sharing" }) }),
          /* @__PURE__ */ e.jsx(a.CardContent, { children: /* @__PURE__ */ e.jsx(
            Y,
            {
              id: "seo",
              fields: Ws,
              value: v.data.seo,
              errors: E(N, "seo"),
              onChange: (y) => v.setData("seo", y)
            }
          ) })
        ] })
      ] }),
      n && /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:flex-col cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs(a.Card, { children: [
          /* @__PURE__ */ e.jsx(a.CardHeader, { children: /* @__PURE__ */ e.jsx(a.CardTitle, { className: "cms:text-base", children: "Status" }) }),
          /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
            /* @__PURE__ */ e.jsxs("p", { children: [
              R(n.status),
              n.status !== "draft" && n.publishedAt ? ` · ${V(n.publishedAt)}` : ""
            ] }),
            n.status !== "draft" && n.hasUnpublishedChanges && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The draft has changes the site doesn't show yet." })
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs(a.Card, { children: [
          /* @__PURE__ */ e.jsx(a.CardHeader, { children: /* @__PURE__ */ e.jsx(a.CardTitle, { className: "cms:text-base", children: "Revisions" }) }),
          /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
            d.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "Each publish keeps one." }),
            d.map((y) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
                /* @__PURE__ */ e.jsx("div", { className: "cms:truncate", children: y.title }),
                /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: V(y.createdAt) })
              ] }),
              u.update && !n.trashed && /* @__PURE__ */ e.jsx(
                a.Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  onClick: () => g.router.post(k(`cms/revisions/${y.id}/restore`), {}, { preserveScroll: !0 }),
                  children: "Restore"
                }
              )
            ] }, y.id))
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(
      Xs,
      {
        open: b,
        onClose: () => C(!1),
        processing: v.processing,
        current: n?.publishedAt ?? null,
        onSchedule: (y) => F(y)
      }
    )
  ] });
}
function Zs({ entryUrl: s, current: t, locales: l, canAdd: c, canRemove: r, onRemove: n }) {
  return /* @__PURE__ */ e.jsxs("nav", { "aria-label": "Languages", className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
    l.map((i) => {
      const d = `${z(i.code)}${i.main ? " (main)" : ""}`;
      return i.status === null ? c ? /* @__PURE__ */ e.jsxs(
        a.Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "cms:border-dashed",
          onClick: () => g.router.post(`${s}/translations`, { locale: i.code }),
          children: [
            /* @__PURE__ */ e.jsx(I, {}),
            " ",
            d
          ]
        },
        i.code
      ) : null : /* @__PURE__ */ e.jsxs(
        a.Button,
        {
          type: "button",
          size: "sm",
          variant: i.code === t ? "secondary" : "ghost",
          "aria-current": i.code === t ? "page" : void 0,
          onClick: () => i.code !== t && g.router.get(`${s}/edit`, { locale: i.code }),
          children: [
            d,
            /* @__PURE__ */ e.jsx(a.Badge, { variant: i.status === "published" ? "default" : "outline", className: "cms:ml-1", children: R(i.status) })
          ]
        },
        i.code
      );
    }),
    r && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:ml-auto cms:text-destructive", onClick: n, children: "Remove this language" })
  ] });
}
function Xs({ open: s, onClose: t, onSchedule: l, current: c, processing: r }) {
  const [n, i] = w.useState("");
  return w.useEffect(() => {
    s && i(Ls(c ? new Date(c) : new Date(Date.now() + 864e5)));
  }, [s, c]), /* @__PURE__ */ e.jsx(a.Dialog, { open: s, onOpenChange: (d) => !d && t(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: "Publish on a date" }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: "The entry goes live then; a date in the past publishes it now with that date." })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "published-at", children: "Date and time" }),
      /* @__PURE__ */ e.jsx(a.Input, { id: "published-at", type: "datetime-local", value: n, onChange: (d) => i(d.target.value) }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "In your time zone." })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: t, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", disabled: n === "" || r, onClick: () => l(new Date(n).toISOString()), children: "Publish" })
    ] })
  ] }) });
}
function Ys({ collection: s, collections: t, entries: l, query: c, can: r }) {
  a.useBreadcrumbs([{ label: "Entries", href: k("cms/entries") }, ...s ? [{ label: s.title }] : []]);
  const [n, i] = w.useState(c.search), d = s ? k(`cms/collections/${s.handle}/entries`) : "", u = (m) => {
    const o = { ...c, ...m };
    g.router.get(
      d,
      { ...o.search ? { search: o.search } : {}, ...o.trashed ? { trashed: 1 } : {} },
      { preserveState: !0, preserveScroll: !0, replace: !0 }
    );
  };
  return w.useEffect(() => {
    if (n === c.search) return;
    const m = window.setTimeout(() => u({ search: n }), 300);
    return () => window.clearTimeout(m);
  }, [n]), !s || !l ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(g.Head, { title: "Entries" }),
    /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Entries" }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no collections yet. Create one under Structure → Collections, then come back to write its entries." })
  ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(g.Head, { title: s.title }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
        t.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: s.handle, onValueChange: (m) => g.router.get(k(`cms/collections/${m}/entries`)), children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": "Collection", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: t.map((m) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: m.handle, children: m.title }, m.handle)) })
        ] })
      ] }),
      r?.create && !c.trashed && /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(g.Link, { href: `${d}/create`, children: [
        /* @__PURE__ */ e.jsx(I, {}),
        " New entry"
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-sm", children: [
        /* @__PURE__ */ e.jsx(Ee, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            className: "cms:pl-9",
            placeholder: "Search titles",
            "aria-label": "Search titles",
            value: n,
            onChange: (m) => i(m.target.value)
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
        l.data.map((m) => /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
          /* @__PURE__ */ e.jsxs(a.TableCell, { children: [
            /* @__PURE__ */ e.jsx(g.Link, { href: k(`cms/entries/${m.id}/edit`), className: "cms:font-medium cms:hover:underline", children: m.title }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
              "/",
              m.slug
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-1", children: [
            /* @__PURE__ */ e.jsx(a.Badge, { variant: m.status === "published" ? "default" : "secondary", children: R(m.status) }),
            m.locales.length > 1 && m.locales.filter((o) => !o.main).map((o) => /* @__PURE__ */ e.jsx(
              a.Badge,
              {
                variant: o.status === "published" ? "default" : "outline",
                className: o.status === null ? "cms:opacity-50" : "",
                title: `${o.code}: ${o.status === null ? "not translated" : R(o.status)}`,
                children: o.code.toUpperCase()
              },
              o.code
            ))
          ] }) }),
          /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:text-muted-foreground", children: V(s.dated ? m.publishedAt : m.updatedAt) })
        ] }, m.id))
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
            onClick: () => l.prev_page_url && g.router.get(l.prev_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(Ce, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Next page",
            disabled: !l.next_page_url,
            onClick: () => l.next_page_url && g.router.get(l.next_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(ae, {})
          }
        )
      ] })
    ] })
  ] });
}
function Js({ fieldsets: s }) {
  const t = g.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(S, { message: t.fieldset }),
    /* @__PURE__ */ e.jsx(
      Xe,
      {
        noun: "Fieldset",
        base: k("cms/fieldsets"),
        rows: s,
        intro: "Fields shared between blueprints, and the kinds of block of flexible fields."
      }
    )
  ] });
}
function Qs(s) {
  return /* @__PURE__ */ e.jsx(et, { ...s }, `${s.locale}:${JSON.stringify(s.values)}`);
}
function et({ set: s, fields: t, locale: l, locales: c, shared: r, values: n, can: i }) {
  const d = k(`cms/globals/${s.handle}`);
  a.useBreadcrumbs([{ label: "Globals", href: k("cms/globals") }, { label: s.title }]);
  const u = g.useForm({ locale: l, data: n }), m = u.errors, o = c[0];
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (h) => {
    h.preventDefault(), u.put(d, { preserveScroll: !0 });
  }, className: "cms:flex cms:max-w-3xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(g.Head, { title: s.title }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(g.Link, { href: k("cms/globals"), "aria-label": "Back to globals", children: /* @__PURE__ */ e.jsx(K, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
        u.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        c.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: l, onValueChange: (h) => g.router.get(d, { locale: h }), children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: c.map((h, x) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: h, children: [
            z(h),
            x === 0 ? " (main)" : ""
          ] }, h)) })
        ] }),
        i.update && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: u.processing, children: [
          u.processing && /* @__PURE__ */ e.jsx(Z, { className: "cms:animate-spin" }),
          " Save"
        ] })
      ] })
    ] }),
    t.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "This global set has no fields: choose a blueprint for it under Structure → Global sets." }) : /* @__PURE__ */ e.jsx("fieldset", { disabled: !i.update, children: /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsx(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: t.map((h) => r.includes(h.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(P, { id: `data-${h.handle}`, field: h, content: !0, value: n[h.handle], errors: {}, onChange: () => {
      } }),
      /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
        "Shared by all languages: edit it in ",
        o ? z(o) : "the main language",
        "."
      ] })
    ] }, h.handle) : /* @__PURE__ */ e.jsx(
      P,
      {
        id: `data-${h.handle}`,
        field: h,
        content: !0,
        value: u.data.data[h.handle],
        errors: E(m, `data.${h.handle}`),
        onChange: (x) => u.setData("data", { ...u.data.data, [h.handle]: x })
      },
      h.handle
    )) }) }) })
  ] });
}
function st({ sets: s }) {
  return a.useBreadcrumbs([{ label: "Globals" }]), /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(g.Head, { title: "Globals" }),
    /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Globals" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Values the whole site uses, like contact details and footer text." })
    ] }),
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no global sets yet. Create one under Structure → Global sets." }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:sm:grid-cols-2 cms:lg:grid-cols-3", children: s.map((t) => /* @__PURE__ */ e.jsx(g.Link, { href: k(`cms/globals/${t.handle}`), className: "cms:rounded-xl cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none", children: /* @__PURE__ */ e.jsxs(a.Card, { className: "cms:h-full cms:transition-colors cms:hover:bg-accent", children: [
      /* @__PURE__ */ e.jsxs(a.CardHeader, { children: [
        /* @__PURE__ */ e.jsx(a.CardTitle, { className: "cms:text-base", children: t.title }),
        /* @__PURE__ */ e.jsx(a.CardDescription, { children: t.blueprint ? /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: t.handle }) : "No blueprint yet: choose one under Structure → Global sets." })
      ] }),
      /* @__PURE__ */ e.jsx(a.CardContent, {})
    ] }) }, t.handle)) })
  ] });
}
let Ye = 0;
function Je(s, t = 0) {
  return s.flatMap(({ children: l, ...c }) => [{ ...c, key: `m${++Ye}`, depth: t }, ...Je(l ?? [], t + 1)]);
}
function tt(s) {
  const t = [], l = [{ depth: -1, children: t }];
  for (const { key: c, depth: r, ...n } of s) {
    for (; l.length > 1 && l[l.length - 1].depth >= r; ) l.pop();
    const i = { ...n, children: [] };
    l[l.length - 1].children.push(i), l.push({ depth: r, children: i.children });
  }
  return t;
}
function U(s, t) {
  const l = s[t]?.depth ?? 0;
  let c = t + 1;
  for (; c < s.length && s[c].depth > l; ) c++;
  return c;
}
function Qe(s, t, l) {
  const c = U(s, t);
  return s.map((r, n) => n >= t && n < c ? { ...r, depth: r.depth + l } : r);
}
function at(s, t, l) {
  const c = s[t], r = s[t - 1];
  return !c || !r || c.depth > r.depth || Math.max(...s.slice(t, U(s, t)).map((i) => i.depth)) + 1 > l - 1 ? s : Qe(s, t, 1);
}
function lt(s, t) {
  return (s[t]?.depth ?? 0) === 0 ? s : Qe(s, t, -1);
}
function de(s, t, l) {
  const c = s[t];
  if (!c) return s;
  const r = U(s, t), n = s.slice(t, r);
  if (l === -1) {
    let u = t - 1;
    for (; u >= 0 && s[u].depth > c.depth; ) u--;
    return u < 0 || s[u].depth !== c.depth ? s : [...s.slice(0, u), ...n, ...s.slice(u, t), ...s.slice(r)];
  }
  const i = s[r];
  if (!i || i.depth !== c.depth) return s;
  const d = U(s, r);
  return [...s.slice(0, t), ...s.slice(r, d), ...n, ...s.slice(d)];
}
function nt(s, t) {
  return [...s.slice(0, t), ...s.slice(U(s, t))];
}
function me(s) {
  return { key: `m${++Ye}`, depth: 0, entry_id: null, entry: null, url: null, labels: {}, new_tab: !1, ...s };
}
function ct({ menu: s, items: t, locales: l, limits: c, can: r }) {
  const n = k(`cms/menus/${s.handle}`);
  a.useBreadcrumbs([{ label: "Menus", href: k("cms/menus") }, { label: s.title }]);
  const [i, d] = w.useState(() => Je(t)), [u, m] = w.useState(null), o = g.useForm({ items: t }), h = o.errors, [x, p] = w.useState(!1), b = l[0] ?? "en", C = (f) => {
    d(f), p(!0);
  }, v = (f, N) => C(i.map((j, _) => _ === f ? { ...j, ...N } : j)), D = (f) => {
    f.preventDefault(), o.transform(() => ({ items: tt(i).map(es) })), o.put(n, { preserveScroll: !0, onSuccess: () => p(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: D, className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(g.Head, { title: s.title }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(g.Link, { href: k("cms/menus"), "aria-label": "Back to menus", children: /* @__PURE__ */ e.jsx(K, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
        x && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      r.update && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", disabled: i.length >= c.items, onClick: () => m("entry"), children: [
          /* @__PURE__ */ e.jsx(I, {}),
          " Entry"
        ] }),
        /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", disabled: i.length >= c.items, onClick: () => m("url"), children: [
          /* @__PURE__ */ e.jsx(fs, {}),
          " Link"
        ] }),
        /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: o.processing, children: [
          o.processing && /* @__PURE__ */ e.jsx(Z, { className: "cms:animate-spin" }),
          " Save"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(S, { message: h.items }),
    Object.keys(h).some((f) => f.startsWith("items.")) && /* @__PURE__ */ e.jsxs("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: [
      "Some links need fixing: ",
      Object.values(h).filter(Boolean)[0]
    ] }),
    /* @__PURE__ */ e.jsx(a.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs("ul", { className: "cms:divide-y", children: [
      i.length === 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-6 cms:text-center cms:text-muted-foreground", children: "No links yet. Add an entry or a link." }),
      i.map((f, N) => /* @__PURE__ */ e.jsxs("li", { className: "cms:flex cms:flex-col cms:gap-2 cms:p-3", style: { paddingLeft: `${0.75 + f.depth * 2}rem` }, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(
            a.Input,
            {
              "aria-label": `Label (${z(b)})`,
              className: "cms:max-w-xs",
              disabled: !r.update,
              placeholder: f.entry?.title ?? "Label",
              value: f.labels[b] ?? "",
              onChange: (j) => v(N, { labels: { ...f.labels, [b]: j.target.value } })
            }
          ),
          /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:text-sm cms:text-muted-foreground", children: f.entry_id !== null ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            f.entry?.collection,
            ": ",
            f.entry?.title ?? `Entry #${f.entry_id}`,
            " ",
            f.entry && !f.entry.live && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", children: "Not on the site" })
          ] }) : f.url }),
          r.update && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center", children: [
            /* @__PURE__ */ e.jsxs("label", { className: "cms:mr-2 cms:flex cms:items-center cms:gap-1.5 cms:text-sm", children: [
              /* @__PURE__ */ e.jsx(a.Checkbox, { checked: f.new_tab, onCheckedChange: (j) => v(N, { new_tab: j }) }),
              " New tab"
            ] }),
            /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Out a level", disabled: f.depth === 0, onClick: () => C(lt(i, N)), children: /* @__PURE__ */ e.jsx(bs, {}) }),
            /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "In a level", onClick: () => C(at(i, N, c.depth)), children: /* @__PURE__ */ e.jsx(vs, {}) }),
            /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move up", onClick: () => C(de(i, N, -1)), children: /* @__PURE__ */ e.jsx(W, {}) }),
            /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move down", onClick: () => C(de(i, N, 1)), children: /* @__PURE__ */ e.jsx(q, {}) }),
            /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": "Remove, with what's under it", onClick: () => C(nt(i, N)), children: /* @__PURE__ */ e.jsx(B, {}) })
          ] })
        ] }),
        l.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: l.slice(1).map((j) => /* @__PURE__ */ e.jsx(
          a.Input,
          {
            "aria-label": `Label (${z(j)})`,
            className: "cms:max-w-xs",
            disabled: !r.update,
            placeholder: `${z(j)}: as ${z(b)}`,
            value: f.labels[j] ?? "",
            onChange: (_) => v(N, { labels: { ...f.labels, [j]: _.target.value } })
          },
          j
        )) })
      ] }, f.key))
    ] }) }),
    /* @__PURE__ */ e.jsx(rt, { kind: u, onClose: () => m(null), onAdd: (f) => {
      C([...i, f]), m(null);
    }, main: b })
  ] });
}
function es({ entry: s, children: t, ...l }) {
  return { ...l, children: t.map(es) };
}
function rt({ kind: s, onClose: t, onAdd: l, main: c }) {
  const [r, n] = w.useState(null), [i, d] = w.useState(""), [u, m] = w.useState("");
  w.useEffect(() => {
    n(null), d(""), m("");
  }, [s]);
  const o = i.trim() === "" || Bs(i.trim()), h = async () => {
    if (s === "entry" && r !== null) {
      const x = await fetch(`${k("cms/entry-picker")}?${We({ ids: [r], collections: [] })}`, { headers: { Accept: "application/json" }, credentials: "same-origin" }), p = x.ok ? (await x.json()).items[0] : void 0;
      l(me({ entry_id: r, entry: p ? { title: p.title, collection: p.collection, live: p.status === "published" } : null, labels: u ? { [c]: u } : {} }));
    } else s === "url" && i.trim() !== "" && o && u.trim() !== "" && l(me({ url: i.trim(), labels: { [c]: u.trim() } }));
  };
  return /* @__PURE__ */ e.jsx(a.Dialog, { open: s !== null, onOpenChange: (x) => !x && t(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: s === "entry" ? "Link to an entry" : "Link to an address" }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: s === "entry" ? "It follows the entry: its title (unless you give a label) and its address in each language. It shows only while the entry is on the site." : "A web address, a path on this site (/contact), mailto: or tel:." })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
      s === "entry" ? /* @__PURE__ */ e.jsx(
        Ge,
        {
          id: "menu-entry",
          value: r,
          multiple: !1,
          max: null,
          collections: [],
          invalid: !1,
          onChange: (x) => n(typeof x == "number" ? x : null)
        }
      ) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "menu-url", children: "Address" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: "menu-url",
            value: i,
            placeholder: "https://… or /contact",
            "aria-invalid": !o,
            onChange: (x) => d(x.target.value)
          }
        ),
        !o && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "This address could run code; use https://, a path, mailto: or tel:." })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(a.Label, { htmlFor: "menu-label", children: [
          "Label",
          s === "entry" ? " (optional)" : ""
        ] }),
        /* @__PURE__ */ e.jsx(a.Input, { id: "menu-label", value: u, onChange: (x) => m(x.target.value) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: t, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(
        a.Button,
        {
          type: "button",
          onClick: () => {
            h();
          },
          disabled: s === "entry" ? r === null : i.trim() === "" || !o || u.trim() === "",
          children: "Add"
        }
      )
    ] })
  ] }) });
}
function it({ menus: s }) {
  return a.useBreadcrumbs([{ label: "Menus" }]), /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(g.Head, { title: "Menus" }),
    /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Menus" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Navigation for the site: the main menu, the footer…" })
    ] }),
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no menus yet. Create one under Structure → Menus." }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:sm:grid-cols-2 cms:lg:grid-cols-3", children: s.map((t) => /* @__PURE__ */ e.jsx(g.Link, { href: k(`cms/menus/${t.handle}`), className: "cms:rounded-xl cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none", children: /* @__PURE__ */ e.jsxs(a.Card, { className: "cms:h-full cms:transition-colors cms:hover:bg-accent", children: [
      /* @__PURE__ */ e.jsxs(a.CardHeader, { children: [
        /* @__PURE__ */ e.jsx(a.CardTitle, { className: "cms:text-base", children: t.title }),
        /* @__PURE__ */ e.jsx(a.CardDescription, { children: /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: t.handle }) })
      ] }),
      /* @__PURE__ */ e.jsx(a.CardContent, {})
    ] }) }, t.handle)) })
  ] });
}
const ot = 3;
function dt({ form: s, forms: t, submissions: l, can: c }) {
  a.useBreadcrumbs([{ label: "Submissions", href: k("cms/submissions") }, ...s ? [{ label: s.title }] : []]);
  const [r, n] = w.useState(null), [i, d] = G();
  if (!s || !l)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(g.Head, { title: "Submissions" }),
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Submissions" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no forms yet. Create one under Structure → Forms and put it on a page; what visitors send shows up here." })
    ] });
  const u = (l.data[0]?.rows ?? []).slice(0, ot), m = (o) => i(
    "Delete this submission for good? It can't be restored.",
    () => g.router.delete(k(`cms/submissions/${o.id}`), { preserveScroll: !0, onSuccess: () => n(null) })
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(g.Head, { title: `${s.title} submissions` }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
        t.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: s.handle, onValueChange: (o) => g.router.get(k(`cms/forms/${o}/submissions`)), children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-56", "aria-label": "Form", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: t.map((o) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: o.handle, children: [
            o.title,
            " (",
            o.count,
            ")"
          ] }, o.handle)) })
        ] })
      ] }),
      l.total > 0 && /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: k(`cms/forms/${s.handle}/submissions/export`), children: [
        /* @__PURE__ */ e.jsx(ps, {}),
        " Export CSV"
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsx(a.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(a.Table, { children: [
      /* @__PURE__ */ e.jsx(a.TableHeader, { children: /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Sent" }),
        u.map((o) => /* @__PURE__ */ e.jsx(a.TableHead, { children: o.label }, o.handle))
      ] }) }),
      /* @__PURE__ */ e.jsxs(a.TableBody, { children: [
        l.data.length === 0 && /* @__PURE__ */ e.jsx(a.TableRow, { children: /* @__PURE__ */ e.jsx(a.TableCell, { colSpan: u.length + 1, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: "Nothing sent yet." }) }),
        l.data.map((o) => /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
          /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:whitespace-nowrap", children: /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:font-medium cms:hover:underline", onClick: () => n(o), children: V(o.createdAt) }) }),
          u.map((h) => /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:max-w-64 cms:truncate", children: o.rows.find((x) => x.handle === h.handle)?.value }, h.handle))
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
            onClick: () => l.prev_page_url && g.router.get(l.prev_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(Ce, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Next page",
            disabled: !l.next_page_url,
            onClick: () => l.next_page_url && g.router.get(l.next_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(ae, {})
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(a.Dialog, { open: r !== null, onOpenChange: (o) => !o && n(null), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto", children: [
      /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
        /* @__PURE__ */ e.jsx(a.DialogTitle, { children: s.title }),
        /* @__PURE__ */ e.jsxs(a.DialogDescription, { children: [
          "Sent ",
          V(r?.createdAt ?? null),
          " · ",
          r?.locale.toUpperCase()
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-3 cms:text-sm", children: r?.rows.map((o) => /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: o.label }),
        /* @__PURE__ */ e.jsx("dd", { className: "cms:whitespace-pre-wrap cms:break-words cms:text-muted-foreground", children: o.value || "—" })
      ] }, o.handle)) }),
      c.delete && r && /* @__PURE__ */ e.jsx(a.DialogFooter, { children: /* @__PURE__ */ e.jsxs(a.Button, { variant: "destructive", onClick: () => m(r), children: [
        /* @__PURE__ */ e.jsx(B, {}),
        " Delete"
      ] }) })
    ] }) }),
    d
  ] });
}
const se = "__top";
function mt({ taxonomy: s, taxonomies: t, terms: l, locales: c, locale: r }) {
  a.useBreadcrumbs([{ label: "Terms", href: k("cms/terms") }, ...s ? [{ label: s.title }] : []]);
  const [n, i] = G(), [d, u] = w.useState(null);
  if (!s)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(g.Head, { title: "Terms" }),
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Terms" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no taxonomies yet. Create one under Structure → Taxonomies (categories, tags…), then add its terms here." })
    ] });
  const m = k(`cms/taxonomies/${s.handle}/terms`);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(g.Head, { title: s.title }),
    i,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
      t.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: s.handle, onValueChange: (o) => g.router.get(k(`cms/taxonomies/${o}/terms`)), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": "Taxonomy", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(a.SelectContent, { children: t.map((o) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: o.handle, children: o.title }, o.handle)) })
      ] }),
      c.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: r, onValueChange: (o) => g.router.get(m, { locale: o }), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:ml-auto cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(a.SelectContent, { children: c.map((o) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: o, children: z(o) }, o)) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsx(a.CardContent, { children: /* @__PURE__ */ e.jsx(
      ue,
      {
        action: m,
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
      l.map((o) => {
        const h = l.filter((p) => p.parentId === o.parentId), x = h.findIndex((p) => p.id === o.id);
        return /* @__PURE__ */ e.jsx("li", { className: "cms:p-3", style: { paddingLeft: `${0.75 + o.depth * 1.5}rem` }, children: d === o.id ? /* @__PURE__ */ e.jsx(
          ue,
          {
            action: k(`cms/terms/${o.id}`),
            method: "put",
            locale: r,
            terms: l,
            hierarchical: s.hierarchical,
            term: o,
            submitLabel: "Save",
            onDone: () => u(null)
          }
        ) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0 cms:flex-1", children: [
            o.title !== null ? /* @__PURE__ */ e.jsx("span", { className: "cms:font-medium", children: o.title }) : /* @__PURE__ */ e.jsxs("span", { className: "cms:text-muted-foreground cms:italic", children: [
              o.fallback,
              " · not translated"
            ] }),
            o.slug && /* @__PURE__ */ e.jsxs("span", { className: "cms:ml-2 cms:text-xs cms:text-muted-foreground", children: [
              "/",
              o.slug
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-label": `Move ${o.fallback} up`,
              disabled: x === 0,
              onClick: () => g.router.post(k(`cms/terms/${o.id}/move`), { direction: "up" }, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(W, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-label": `Move ${o.fallback} down`,
              disabled: x === h.length - 1,
              onClick: () => g.router.post(k(`cms/terms/${o.id}/move`), { direction: "down" }, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(q, {})
            }
          ),
          /* @__PURE__ */ e.jsx(a.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Edit ${o.fallback}`, onClick: () => u(o.id), children: /* @__PURE__ */ e.jsx(Ns, {}) }),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Delete ${o.fallback}`,
              onClick: () => n(
                `Delete "${o.fallback}" in every language? Terms under it move up a level.`,
                () => g.router.delete(k(`cms/terms/${o.id}`), { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(B, {})
            }
          )
        ] }) }, o.id);
      })
    ] }) })
  ] });
}
function ue({ action: s, method: t, locale: l, terms: c, hierarchical: r, term: n, submitLabel: i, onDone: d }) {
  const u = g.useForm({ title: n?.title ?? "", slug: n?.slug ?? "", parent_id: n?.parentId ?? null, locale: l }), m = u.errors, o = /* @__PURE__ */ new Set();
  if (n) {
    o.add(n.id);
    const p = c.findIndex((b) => b.id === n.id);
    for (let b = p + 1; b < c.length && (c[b]?.depth ?? 0) > n.depth; b++) o.add(c[b].id);
  }
  const h = (p) => {
    p.preventDefault(), u.submit(t, s, { preserveScroll: !0, onSuccess: () => {
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
          onChange: (p) => u.setData("title", p.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(S, { message: m.title })
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
          onChange: (p) => u.setData("slug", p.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(S, { message: m.slug })
    ] }),
    r ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${x}-parent`, className: n ? "cms:sr-only" : "", children: "Under" }),
      /* @__PURE__ */ e.jsxs(
        a.Select,
        {
          value: u.data.parent_id === null ? se : String(u.data.parent_id),
          onValueChange: (p) => u.setData("parent_id", p === se ? null : Number(p)),
          children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: `${x}-parent`, children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(a.SelectItem, { value: se, children: "Top level" }),
              c.filter((p) => !o.has(p.id)).map((p) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: String(p.id), children: [
                "— ".repeat(p.depth),
                p.title ?? p.fallback
              ] }, p.id))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ e.jsx(S, { message: m.parent_id })
    ] }) : /* @__PURE__ */ e.jsx("div", {}),
    /* @__PURE__ */ e.jsxs("div", { className: `cms:flex cms:gap-2 ${n ? "" : "cms:md:mt-6"}`, children: [
      /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: u.processing, children: [
        !n && /* @__PURE__ */ e.jsx(I, {}),
        " ",
        i
      ] }),
      d && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", onClick: d, children: "Cancel" })
    ] })
  ] });
}
as({
  pages: {
    "Cms/Blueprints/Index": qs,
    "Cms/Blueprints/Form": Us,
    "Cms/Fieldsets/Index": Js,
    "Cms/Entries/Index": Ys,
    "Cms/Entries/Editor": Gs,
    "Cms/Terms/Index": mt,
    "Cms/Globals/Index": st,
    "Cms/Globals/Edit": Qs,
    "Cms/Menus/Index": it,
    "Cms/Menus/Edit": ct,
    "Cms/Submissions/Index": dt
  }
});
export {
  fs as L,
  w as R,
  ut as _,
  k as a,
  $ as c,
  Bs as i,
  e as j,
  a as u
};
