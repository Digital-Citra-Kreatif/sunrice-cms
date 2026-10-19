function ds(s, t) {
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
const oe = 1;
function fe() {
  const s = globalThis.Sunrice;
  if (!s)
    throw new Error("[sunrice] This script runs outside the Sunrice admin panel (window.Sunrice is missing).");
  return s;
}
function ms(s) {
  const t = fe();
  if (t.version !== oe)
    throw new Error(`[sunrice] This plugin was built for admin runtime ${oe}, but the panel runs ${t.version}. Rebuild it with a matching @sunrice/admin-sdk.`);
  for (const [l, c] of Object.entries(s.pages ?? {}))
    t.registerPage(l, c);
}
function w(s = "") {
  return fe().adminUrl(s);
}
const be = globalThis.Sunrice;
if (!be) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const e = be.modules["react/jsx-runtime"], ve = globalThis.Sunrice;
if (!ve) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const C = ve.modules.react, Nt = /* @__PURE__ */ ds({
  __proto__: null
}, [C]), Ne = globalThis.Sunrice;
if (!Ne) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const f = Ne.modules["@inertiajs/react"];
const us = (s) => s?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
function hs(s, t, l = []) {
  if (t == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: us(s),
    size: 24,
    node: t,
    ...l.length > 0 ? { aliases: l } : {}
  };
}
const xs = (s) => {
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
const ps = (s) => {
  const t = xs(s);
  return t.charAt(0).toUpperCase() + t.slice(1);
};
const ce = (...s) => s.filter((t, l, c) => !!t && t.trim() !== "" && c.indexOf(t) === l).join(" ").trim();
const R = {
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
function ae(s) {
  return s != null;
}
function gs(s, t = {}) {
  const l = t.attributeNames ?? {}, c = (h) => l[h] ?? h, r = s.size ?? s.width ?? R.width, n = s.size ?? s.height ?? R.height, i = s.aliases?.filter((h) => typeof h == "string" && h.trim() !== "").map((h) => `lucide-${h}`) ?? [], d = [...s.name ? [`lucide-${s.name}`] : [], ...i], o = t.className?.split(" ").filter(Boolean) ?? [], u = t.includeDefaultClasses === !1 ? ce(...o) : ce("lucide", ...d, ...o), m = t.absoluteStrokeWidth ? Number(t.strokeWidth ?? R["stroke-width"]) * Number(s.size ?? s.width ?? R.width) / Number(t.size ?? t.width ?? R.width) : t.strokeWidth ?? R["stroke-width"];
  return [
    "svg",
    {
      ...Object.entries(R).reduce((h, [g, N]) => (h[c(g)] = N, h), {}),
      ..."color" in t && t.color && {
        [c("stroke")]: t.color
      },
      ..."size" in t && ae(t.size) && {
        [c("width")]: t.size,
        [c("height")]: t.size
      },
      ..."width" in t && ae(t.width) && {
        [c("width")]: t.width
      },
      ..."height" in t && ae(t.height) && {
        [c("height")]: t.height
      },
      [c("stroke-width")]: m,
      ...u && {
        [c("class")]: u
      },
      [c("viewBox")]: `0 0 ${r} ${n}`,
      ...t.hasA11yProp === !1 ? {
        [c("aria-hidden")]: "true"
      } : {},
      ..."attributes" in t && t.attributes
    },
    s.node.map((h) => {
      const [g, N, p] = h, b = t.nonScalingStroke ? { [c("vector-effect")]: "non-scaling-stroke", ...N } : N;
      return p ? [g, b, p] : [g, b];
    })
  ];
}
function js(s, t = {}) {
  return gs(s, {
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
const fs = (s) => {
  for (const t in s)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
  return !1;
}, bs = C.createContext({}), vs = () => C.useContext(bs), Ns = C.forwardRef(
  ({
    color: s,
    size: t,
    width: l,
    height: c,
    strokeWidth: r,
    absoluteStrokeWidth: n,
    nonScalingStroke: i,
    className: d = "",
    children: o,
    iconNode: u = [],
    icon: m = {
      node: u,
      aliases: [],
      size: 24
    },
    ...x
  }, h) => {
    const {
      size: g = 24,
      strokeWidth: N = 2,
      absoluteStrokeWidth: p = !1,
      nonScalingStroke: b = !1,
      color: v = "currentColor",
      className: B = ""
    } = vs() ?? {}, k = !!o || fs(x), [j, S, $ = []] = js(m, {
      color: s ?? v,
      width: l ?? t ?? g,
      height: c ?? t ?? g,
      strokeWidth: r ?? N,
      absoluteStrokeWidth: n ?? p,
      nonScalingStroke: i ?? b,
      className: ce(B, d),
      hasA11yProp: k,
      attributes: x
    });
    return C.createElement(
      j,
      {
        ref: h,
        ...S
      },
      [
        ...$.map(([T, M]) => C.createElement(T, M)),
        ...Array.isArray(o) ? o : [o]
      ]
    );
  }
);
function _(s, t = [], l = []) {
  const c = typeof s == "string" ? hs(s, t, l) : s, r = C.forwardRef(
    ({ className: n, ...i }, d) => C.createElement(Ns, {
      ref: d,
      icon: c,
      className: n,
      ...i
    })
  );
  return c.name && (r.displayName = ps(c.name)), r;
}
const ye = {
  name: "arrow-down",
  size: 24,
  node: [
    ["path", { d: "M12 5v14", key: "s699le" }],
    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
  ]
};
ye.node;
const Z = _(ye);
const ke = {
  name: "arrow-left",
  size: 24,
  node: [
    ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
    ["path", { d: "M19 12H5", key: "x3x0zl" }]
  ]
};
ke.node;
const Q = _(ke);
const Ce = {
  name: "arrow-up",
  size: 24,
  node: [
    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
    ["path", { d: "M12 19V5", key: "x0mq9r" }]
  ]
};
Ce.node;
const X = _(Ce);
const we = {
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
we.node;
const ys = _(we);
const Se = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
Se.node;
const $e = _(Se);
const De = {
  name: "chevron-left",
  size: 24,
  node: [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]]
};
De.node;
const _e = _(De);
const Te = {
  name: "chevron-right",
  size: 24,
  node: [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]
};
Te.node;
const re = _(Te);
const Be = {
  name: "copy",
  size: 24,
  node: [
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
  ]
};
Be.node;
const ks = _(Be);
const ze = {
  name: "download",
  size: 24,
  node: [
    ["path", { d: "M12 15V3", key: "m9g1x1" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
  ]
};
ze.node;
const Le = _(ze);
const Ie = {
  name: "external-link",
  size: 24,
  node: [
    ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
    ["path", { d: "M10 14 21 3", key: "gplh6r" }],
    ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
  ]
};
Ie.node;
const Cs = _(Ie);
const Me = {
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
Me.node;
const ws = _(Me);
const Ae = {
  name: "link-2",
  size: 24,
  node: [
    ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
    ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
    ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
  ]
};
Ae.node;
const Ss = _(Ae);
const Ee = {
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
Ee.node;
const $s = _(Ee);
const Fe = {
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
Fe.node;
const Ds = _(Fe);
const He = {
  name: "loader-circle",
  size: 24,
  node: [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  aliases: ["loader-2"]
};
He.node;
const ee = _(He);
const Re = {
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
Re.node;
const _s = _(Re);
const Oe = {
  name: "plus",
  size: 24,
  node: [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ]
};
Oe.node;
const F = _(Oe);
const Pe = {
  name: "rotate-ccw",
  size: 24,
  node: [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ]
};
Pe.node;
const Ts = _(Pe);
const Ue = {
  name: "search",
  size: 24,
  node: [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ]
};
Ue.node;
const Ve = _(Ue);
const qe = {
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
qe.node;
const L = _(qe);
const We = {
  name: "undo-2",
  size: 24,
  node: [
    ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
    ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
  ]
};
We.node;
const Bs = _(We);
const Ge = {
  name: "x",
  size: 24,
  node: [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]
};
Ge.node;
const zs = _(Ge), Ke = globalThis.Sunrice;
if (!Ke) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const a = Ke.modules["@sunrice/admin-sdk/ui"];
function W() {
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
const Ls = 5;
let Is = 0;
const Je = () => `f${++Is}`;
function Ze(s) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function Xe(s, t) {
  const l = new Set(t.map((n) => n.handle)), c = Ze(s) || "field";
  let r = c;
  for (let n = 2; l.has(r); n++)
    r = `${c}_${n}`;
  return r;
}
function Ye(s) {
  return (s ?? []).map(({ fields: t, ...l }) => ({
    ...l,
    key: Je(),
    fields: Ye(t),
    handleTouched: !0
  }));
}
function Qe(s, t) {
  return s.map(({ key: l, handleTouched: c, fields: r, ...n }) => ({
    ...n,
    validation: (n.validation ?? []).map((i) => i.trim()).filter((i) => i !== ""),
    ...t(n.type) ? { fields: Qe(r, t) } : {}
  }));
}
function Ms(s, t, l) {
  return { key: Je(), type: s, label: t, handle: Xe(t, l), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function U(s, t, l) {
  const c = t + l;
  if (t < 0 || t >= s.length || c < 0 || c >= s.length) return s;
  const r = s.slice(), [n] = r.splice(t, 1);
  return r.splice(c, 0, n), r;
}
function As(s, t, l) {
  if (s.handleTouched) return { ...s, label: t };
  const c = l.filter((r) => r.key !== s.key);
  return { ...s, label: t, handle: Xe(t || s.type, c) };
}
function se(s, t) {
  const l = `${t}.`, c = {};
  for (const [r, n] of Object.entries(s))
    r.startsWith(l) && (c[r.slice(l.length)] = n);
  return c;
}
function P(s, t) {
  const l = s[t];
  return { ...se(s, t), ...l !== void 0 ? { "": l } : {} };
}
function de(s, t) {
  return Object.keys(s).some((l) => l === t || l.startsWith(`${t}.`));
}
function G(s) {
  return s && typeof s == "object" && !Array.isArray(s) ? s : {};
}
function Es(s, t) {
  if (typeof s != "string" || s === "") return "";
  const l = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(s);
  return l ? t ? `${l[1]}T${l[2] ?? "00:00"}` : l[1] ?? "" : "";
}
function Fs(s) {
  return s === "" ? null : s;
}
function Hs() {
  return { _hidden: !1 };
}
function Rs(s) {
  return { type: s, hidden: !1, values: {} };
}
function Os(s) {
  const t = s.replace(/[\u0000- \u007f]+/g, ""), l = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(t);
  return l ? ["http", "https", "mailto", "tel"].includes(l[1].toLowerCase()) : !t.includes("\\");
}
function es({ ids: s, search: t, collections: l }) {
  const c = new URLSearchParams();
  for (const r of s ?? []) c.append("ids[]", String(r));
  t && c.set("search", t);
  for (const r of l) c.append("collections[]", r);
  return c.toString();
}
function V(s) {
  return { draft: "Draft", scheduled: "Scheduled", published: "Published" }[s];
}
function K(s, t) {
  if (!s) return "—";
  const l = new Date(s);
  return Number.isNaN(l.getTime()) ? "—" : l.toLocaleString(t, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
function Ps(s) {
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
async function me(s) {
  const t = await fetch(`${w("cms/entry-picker")}?${es(s)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!t.ok) throw new Error(String(t.status));
  return (await t.json()).items;
}
function ss({ id: s, value: t, multiple: l, max: c, collections: r, invalid: n, onChange: i }) {
  const d = t === null ? [] : Array.isArray(t) ? t : [t], [o, u] = C.useState({}), [m, x] = C.useState(""), [h, g] = C.useState(null), [N, p] = C.useState(!1), b = l && c !== null && d.length >= c, v = d.filter((j) => !o[j]).join(",");
  C.useEffect(() => {
    v !== "" && me({ ids: v.split(",").map(Number), collections: r }).then((j) => u((S) => ({ ...S, ...Object.fromEntries(j.map(($) => [$.id, $])) }))).catch(() => p(!0));
  }, [v]), C.useEffect(() => {
    if (m.trim() === "") {
      g(null);
      return;
    }
    const j = window.setTimeout(() => {
      me({ search: m.trim(), collections: r }).then((S) => {
        g(S), p(!1);
      }).catch(() => p(!0));
    }, 250);
    return () => window.clearTimeout(j);
  }, [m]);
  const B = (j) => {
    u((S) => ({ ...S, [j.id]: j })), i(l ? [...d, j.id] : j.id), x("");
  }, k = (j) => i(l ? j : j[0] ?? null);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    d.length > 0 && /* @__PURE__ */ e.jsx("ul", { className: "cms:flex cms:flex-col cms:gap-1", children: d.map((j, S) => {
      const $ = o[j];
      return /* @__PURE__ */ e.jsxs("li", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-md cms:border cms:px-3 cms:py-1.5 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate", children: $ ? $.title : `Entry #${j}` }),
        $ && /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: $.collection }),
        $ && /* @__PURE__ */ e.jsx(a.Badge, { variant: $.status === "published" ? "default" : "secondary", children: V($.status) }),
        l && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-7",
              "aria-label": `Move ${$?.title ?? j} up`,
              disabled: S === 0,
              onClick: () => k(U(d, S, -1)),
              children: /* @__PURE__ */ e.jsx(X, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-7",
              "aria-label": `Move ${$?.title ?? j} down`,
              disabled: S === d.length - 1,
              onClick: () => k(U(d, S, 1)),
              children: /* @__PURE__ */ e.jsx(Z, {})
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
            "aria-label": `Remove ${$?.title ?? j}`,
            onClick: () => k(d.filter((T) => T !== j)),
            children: /* @__PURE__ */ e.jsx(zs, {})
          }
        )
      ] }, j);
    }) }),
    !b && (l || d.length === 0) && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-md", children: [
      /* @__PURE__ */ e.jsx(Ve, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: s,
          className: "cms:pl-9",
          placeholder: "Search entries by title",
          "aria-invalid": n,
          value: m,
          autoComplete: "off",
          onChange: (j) => x(j.target.value)
        }
      ),
      h !== null && /* @__PURE__ */ e.jsxs("ul", { role: "listbox", "aria-label": "Matching entries", className: "cms:absolute cms:z-10 cms:mt-1 cms:max-h-64 cms:w-full cms:overflow-auto cms:rounded-md cms:border cms:bg-card cms:p-1 cms:shadow-md", children: [
        h.filter((j) => !d.includes(j.id)).length === 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: "No entries match." }),
        h.filter((j) => !d.includes(j.id)).map((j) => /* @__PURE__ */ e.jsx("li", { role: "option", "aria-selected": !1, children: /* @__PURE__ */ e.jsxs(
          "button",
          {
            type: "button",
            className: "cms:flex cms:w-full cms:items-center cms:gap-2 cms:rounded cms:px-2 cms:py-1.5 cms:text-left cms:text-sm cms:hover:bg-accent",
            onClick: () => B(j),
            children: [
              /* @__PURE__ */ e.jsx("span", { className: "cms:flex-1 cms:truncate", children: j.title }),
              /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: j.collection })
            ]
          }
        ) }, j.id))
      ] })
    ] }),
    N && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "Entries could not be loaded. Try again." })
  ] });
}
const Us = C.lazy(() => import("./RichTextEditor-C83DognX.js").then((s) => ({ default: s.RichTextEditor }))), le = "__none";
function D({ message: s }) {
  return s ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: s }) : null;
}
function ue(s) {
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
const Vs = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function qs(s) {
  if (s.label) return s.label;
  const t = s.handle.replace(/_/g, " ");
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function q({ field: s, value: t, onChange: l, errors: c, id: r, content: n = !1 }) {
  const i = qs(s), d = Vs.includes(s.type) || ["select", "terms"].includes(s.type) && s.config?.multiple === !0;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", ...d ? { role: "group", "aria-labelledby": `${r}-label` } : {}, children: [
    s.type === "toggle" ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(a.Switch, { id: r, checked: t === !0, onCheckedChange: (o) => l(o) }),
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: r, children: i })
    ] }) : /* @__PURE__ */ e.jsxs(a.Label, { id: `${r}-label`, htmlFor: d ? void 0 : r, children: [
      i,
      s.required && /* @__PURE__ */ e.jsx("span", { className: "cms:text-destructive", children: " *" })
    ] }),
    /* @__PURE__ */ e.jsx(Ws, { field: s, value: t, onChange: l, errors: c, id: r, content: n }),
    s.instructions && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s.instructions }),
    /* @__PURE__ */ e.jsx(D, { message: c[""] })
  ] });
}
function Ws({ field: s, value: t, onChange: l, errors: c, id: r, content: n }) {
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
          rows: O(s, "rows") ?? 4,
          onChange: (d) => l(d.target.value)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ e.jsx(C.Suspense, { fallback: /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-48 cms:w-full" }), children: /* @__PURE__ */ e.jsx(Us, { id: r, labelledBy: `${r}-label`, invalid: i, value: typeof t == "string" ? t : "", onChange: l }) });
    case "number":
      return /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: r,
          type: "number",
          className: "cms:max-w-48",
          "aria-invalid": i,
          value: typeof t == "number" ? String(t) : typeof t == "string" ? t : "",
          min: O(s, "min"),
          max: O(s, "max"),
          step: O(s, "step") ?? "any",
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
          value: Es(t, d),
          onChange: (o) => l(Fs(o.target.value))
        }
      );
    }
    case "select":
      return s.config?.multiple === !0 ? /* @__PURE__ */ e.jsx(xe, { options: ue(s), value: Array.isArray(t) ? t.map(String) : [], onChange: l }) : /* @__PURE__ */ e.jsx(he, { options: ue(s), value: typeof t == "string" ? t : null, onChange: l, id: r, required: s.required === !0 });
    case "terms": {
      const d = s.terms ?? [];
      if (s.config?.multiple === !0) {
        const o = Array.isArray(t) ? t.map(String) : [];
        return /* @__PURE__ */ e.jsx(xe, { options: d, value: o, onChange: (u) => l(u.map(Number)) });
      }
      return /* @__PURE__ */ e.jsx(
        he,
        {
          options: d,
          id: r,
          required: s.required === !0,
          value: t == null ? null : String(t),
          onChange: (o) => l(o === null ? null : Number(o))
        }
      );
    }
    case "entries":
      return /* @__PURE__ */ e.jsx(
        ss,
        {
          id: r,
          invalid: i,
          multiple: s.config?.multiple === !0,
          max: O(s, "max") ?? null,
          collections: s.collections ?? [],
          onChange: l,
          value: typeof t == "number" || Array.isArray(t) && t.every((d) => typeof d == "number") ? t : null
        }
      );
    case "link":
      return /* @__PURE__ */ e.jsx(Ks, { value: G(t), onChange: l, errors: c, id: r });
    case "media":
      return /* @__PURE__ */ e.jsx(
        a.MediaPickerInput,
        {
          id: r,
          invalid: i,
          disabled: !1,
          multiple: s.config?.multiple === !0,
          max: O(s, "max") ?? null,
          types: Array.isArray(s.config?.types) ? s.config.types : [],
          value: typeof t == "number" || Array.isArray(t) && t.every((d) => typeof d == "number") ? t : null,
          onChange: l
        }
      );
    case "group":
      return /* @__PURE__ */ e.jsx(te, { fields: s.fields ?? [], value: G(t), onChange: l, errors: c, id: r, content: n });
    case "repeater":
      return /* @__PURE__ */ e.jsx(Zs, { field: s, value: Array.isArray(t) ? t : [], onChange: l, errors: c, id: r, content: n });
    case "flexible":
      return /* @__PURE__ */ e.jsx(Xs, { field: s, value: Array.isArray(t) ? t : [], onChange: l, errors: c, id: r });
    default:
      return /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: r,
          "aria-invalid": i,
          value: typeof t == "string" ? t : "",
          placeholder: Gs(s, "placeholder"),
          maxLength: O(s, "max"),
          onChange: (d) => l(d.target.value)
        }
      );
  }
}
function O(s, t) {
  const l = s.config?.[t];
  return typeof l == "number" ? l : void 0;
}
function Gs(s, t) {
  const l = s.config?.[t];
  return typeof l == "string" ? l : void 0;
}
function te({ fields: s, value: t, onChange: l, errors: c, id: r, content: n }) {
  return /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-4 cms:rounded-lg cms:border cms:p-4", children: s.map((i) => /* @__PURE__ */ e.jsx(
    q,
    {
      id: `${r}-${i.handle}`,
      field: i,
      value: t[i.handle],
      content: n,
      errors: P(c, i.handle),
      onChange: (d) => l({ ...t, [i.handle]: d })
    },
    i.handle
  )) });
}
function he({ options: s, value: t, onChange: l, id: c, required: r }) {
  return /* @__PURE__ */ e.jsxs(a.Select, { value: t ?? le, onValueChange: (n) => l(n === le ? null : n), children: [
    /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: c, className: "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
    /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
      !r && /* @__PURE__ */ e.jsx(a.SelectItem, { value: le, children: "None" }),
      s.map((n) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: n.value, children: n.label }, n.value))
    ] })
  ] });
}
function xe({ options: s, value: t, onChange: l }) {
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
function Ks({ value: s, onChange: t, errors: l, id: c }) {
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
    /* @__PURE__ */ e.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ e.jsx(D, { message: l.url ?? l.label }) })
  ] });
}
function Js(s, t) {
  return !t && (s.fields ?? []).every((l) => l.type === "text");
}
function Zs({ field: s, value: t, onChange: l, errors: c, id: r, content: n = !1 }) {
  const i = s.fields ?? [], d = t.map(G), o = (x, h) => l(d.map((g, N) => N === x ? h : g)), u = (s.label || "row").toLowerCase().replace(/s$/, ""), m = u.charAt(0).toUpperCase() + u.slice(1);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    d.map((x, h) => Js(s, n) ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
      i.map((g) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            "aria-label": g.label || g.handle,
            placeholder: g.label || g.handle,
            value: typeof x[g.handle] == "string" ? x[g.handle] : "",
            onChange: (N) => o(h, { ...x, [g.handle]: N.target.value })
          }
        ),
        /* @__PURE__ */ e.jsx(D, { message: c[`${h}.${g.handle}`] })
      ] }, g.handle)),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": `Remove ${u} ${h + 1}`, onClick: () => l(d.filter((g, N) => N !== h)), children: /* @__PURE__ */ e.jsx(L, {}) })
    ] }, h) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(
        ts,
        {
          label: `${m} ${h + 1}`,
          index: h,
          count: d.length,
          onMove: (g) => l(U(d, h, g)),
          onRemove: () => l(d.filter((g, N) => N !== h)),
          hidden: n ? x._hidden === !0 : void 0,
          onHidden: (g) => o(h, { ...x, _hidden: g })
        }
      ),
      /* @__PURE__ */ e.jsx(te, { fields: i, value: x, onChange: (g) => o(h, g), errors: P(c, String(h)), id: `${r}-${h}`, content: n })
    ] }, typeof x._id == "string" ? x._id : h)),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => l([...d, n ? Hs() : {}]), children: [
      /* @__PURE__ */ e.jsx(F, {}),
      " Add ",
      u
    ] }) })
  ] });
}
function Xs({ field: s, value: t, onChange: l, errors: c, id: r }) {
  const n = s.blocks ?? [], i = t.map(G), d = (o, u) => l(i.map((m, x) => x === o ? u : m));
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    i.map((o, u) => {
      const m = n.find((x) => x.type === o.type);
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(
          ts,
          {
            label: m?.label ?? String(o.type),
            badge: !0,
            index: u,
            count: i.length,
            onMove: (x) => l(U(i, u, x)),
            onRemove: () => l(i.filter((x, h) => h !== u)),
            hidden: o.hidden === !0,
            onHidden: (x) => d(u, { ...o, hidden: x })
          }
        ),
        m ? /* @__PURE__ */ e.jsx(
          te,
          {
            fields: m.fields,
            value: G(o.values),
            onChange: (x) => d(u, { ...o, values: x }),
            errors: P(c, `${u}.values`),
            id: `${r}-${u}`,
            content: !0
          }
        ) : /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: "This kind of block no longer exists. Its values are kept." }),
        /* @__PURE__ */ e.jsx(D, { message: c[`${u}.type`] })
      ] }, typeof o.id == "string" ? o.id : u);
    }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", disabled: n.length === 0, children: [
        /* @__PURE__ */ e.jsx(F, {}),
        " Add block"
      ] }) }),
      /* @__PURE__ */ e.jsx(a.DropdownMenuContent, { align: "start", children: n.map((o) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => l([...i, Rs(o.type)]), children: o.label }, o.type)) })
    ] }) })
  ] });
}
function ts({ label: s, badge: t = !1, index: l, count: c, onMove: r, onRemove: n, hidden: i, onHidden: d }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    t ? /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: s }) : /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:font-medium", children: s }),
    i !== void 0 && /* @__PURE__ */ e.jsxs("label", { className: "cms:ml-auto cms:flex cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", children: [
      /* @__PURE__ */ e.jsx(a.Switch, { checked: !i, onCheckedChange: (o) => d(!o), "aria-label": `Show ${s}` }),
      "Show"
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: i === void 0 ? "cms:ml-auto cms:flex" : "cms:flex", children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Move ${s} up`, disabled: l === 0, onClick: () => r(-1), children: /* @__PURE__ */ e.jsx(X, {}) }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Move ${s} down`, disabled: l === c - 1, onClick: () => r(1), children: /* @__PURE__ */ e.jsx(Z, {}) }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": `Remove ${s}`, onClick: n, children: /* @__PURE__ */ e.jsx(L, {}) })
    ] })
  ] });
}
function as({ fields: s, onChange: t, types: l, errors: c, depth: r = 1, idPrefix: n = "field" }) {
  const [i, d] = C.useState(() => /* @__PURE__ */ new Set()), o = (x) => d((h) => {
    const g = new Set(h);
    return g.has(x) ? g.delete(x) : g.add(x), g;
  }), u = (x, h) => t(s.map((g, N) => N === x ? h : g)), m = (x) => {
    const h = Ms(x.type, x.label, s);
    t([...s, h]), d((g) => new Set(g).add(h.key));
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:border-dashed cms:p-4 cms:text-sm cms:text-muted-foreground", children: "No fields yet." }),
    s.map((x, h) => {
      const g = l.find((b) => b.type === x.type), N = i.has(x.key) || de(c, String(h)), p = `${n}-${x.key}`;
      return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${de(c, String(h)) ? "cms:border-destructive" : ""}`, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:p-2", children: [
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-expanded": N,
              "aria-controls": p,
              "aria-label": `${N ? "Close" : "Open"} ${x.label || x.handle}`,
              onClick: () => o(x.key),
              children: N ? /* @__PURE__ */ e.jsx($e, {}) : /* @__PURE__ */ e.jsx(re, {})
            }
          ),
          /* @__PURE__ */ e.jsxs("button", { type: "button", className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:text-left", onClick: () => o(x.key), children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: x.label || x.handle }),
            /* @__PURE__ */ e.jsx("code", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", children: x.handle })
          ] }),
          x.required && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", children: "Required" }),
          /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: g?.label ?? x.type }),
          /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move up", disabled: h === 0, onClick: () => t(U(s, h, -1)), children: /* @__PURE__ */ e.jsx(X, {}) }),
          /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move down", disabled: h === s.length - 1, onClick: () => t(U(s, h, 1)), children: /* @__PURE__ */ e.jsx(Z, {}) }),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Remove ${x.label || x.handle}`,
              onClick: () => t(s.filter((b, v) => v !== h)),
              children: /* @__PURE__ */ e.jsx(L, {})
            }
          )
        ] }),
        N && /* @__PURE__ */ e.jsx(
          Ys,
          {
            id: p,
            field: x,
            type: g,
            siblings: s,
            onChange: (b) => u(h, b),
            types: l,
            errors: se(c, String(h)),
            depth: r
          }
        )
      ] }, x.key);
    }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", children: [
        /* @__PURE__ */ e.jsx(F, {}),
        " Add field"
      ] }) }),
      /* @__PURE__ */ e.jsx(a.DropdownMenuContent, { align: "start", children: l.filter((x) => !x.hasChildren || r < Ls).map((x) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => m(x), children: x.label }, x.type)) })
    ] }) })
  ] });
}
const E = { default: "__default", yes: "yes", no: "no" };
function Ys({ id: s, field: t, type: l, siblings: c, onChange: r, types: n, errors: i, depth: d }) {
  const o = t.config ?? {};
  return /* @__PURE__ */ e.jsxs("div", { id: s, className: "cms:flex cms:flex-col cms:gap-4 cms:border-t cms:p-4", children: [
    !l && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-destructive", children: [
      'The field type "',
      t.type,
      `" isn't registered. Its data is kept; register the type or remove the field.`
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-label`, children: "Label" }),
        /* @__PURE__ */ e.jsx(a.Input, { id: `${s}-label`, value: t.label ?? "", onChange: (u) => r(As(t, u.target.value, c)) }),
        /* @__PURE__ */ e.jsx(D, { message: i.label })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-handle`, children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: `${s}-handle`,
            className: "cms:font-mono",
            value: t.handle,
            onChange: (u) => r({ ...t, handle: u.target.value, handleTouched: !0 })
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "How templates read it. Renaming it hides values saved under the old one." }),
        /* @__PURE__ */ e.jsx(D, { message: i.handle })
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
          onChange: (u) => r({ ...t, instructions: u.target.value || null })
        }
      ),
      /* @__PURE__ */ e.jsx(D, { message: i.instructions })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-6", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Switch, { id: `${s}-required`, checked: t.required === !0, onCheckedChange: (u) => r({ ...t, required: u }) }),
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-required`, children: "Required" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-translatable`, children: "Per language" }),
        /* @__PURE__ */ e.jsxs(
          a.Select,
          {
            value: t.translatable === !0 ? E.yes : t.translatable === !1 ? E.no : E.default,
            onValueChange: (u) => r({ ...t, translatable: u === E.yes ? !0 : u === E.no ? !1 : null }),
            children: [
              /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: `${s}-translatable`, className: "cms:w-48", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
              /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: E.default, children: "As the type decides" }),
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: E.yes, children: "Yes, translated" }),
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: E.no, children: "No, shared" })
              ] })
            ]
          }
        )
      ] })
    ] }),
    (l?.settings.length ?? 0) > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: l?.settings.map((u) => /* @__PURE__ */ e.jsx(
      q,
      {
        id: `${s}-config-${u.handle}`,
        field: u,
        value: o[u.handle],
        errors: P(i, `config.${u.handle}`),
        onChange: (m) => r({ ...t, config: { ...o, [u.handle]: m } })
      },
      u.handle
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
          onChange: (u) => r({ ...t, validation: u.target.value.split(`
`) })
        }
      ),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Laravel rules, one per line." }),
      /* @__PURE__ */ e.jsx(D, { message: i.validation ?? Object.entries(i).find(([u]) => u.startsWith("validation."))?.[1] })
    ] }),
    l?.hasChildren && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { children: "Fields inside" }),
      /* @__PURE__ */ e.jsx(
        as,
        {
          fields: t.fields,
          onChange: (u) => r({ ...t, fields: u }),
          types: n,
          errors: se(i, "fields"),
          depth: d + 1,
          idPrefix: s
        }
      ),
      /* @__PURE__ */ e.jsx(D, { message: i.fields })
    ] }),
    /* @__PURE__ */ e.jsx(D, { message: i.type })
  ] });
}
function Qs({ kind: s = "blueprint", blueprint: t, fieldTypes: l, usedBy: c = [] }) {
  const r = s === "fieldset" ? "Fieldset" : "Blueprint", n = w(s === "fieldset" ? "cms/fieldsets" : "cms/blueprints"), i = t ? t.title : `New ${r.toLowerCase()}`;
  a.useBreadcrumbs([{ label: `${r}s`, href: n }, { label: i }]);
  const [d, o] = W(), u = f.useForm({ title: t?.title ?? "", handle: t?.handle ?? "" }), [m, x] = C.useState(t !== null), [h, g] = C.useState(() => Ye(t?.fields)), N = (T) => l.find((M) => M.type === T)?.hasChildren === !0, p = u.errors, [b, v] = C.useState(() => JSON.stringify(h)), B = u.isDirty || JSON.stringify(h) !== b, k = () => {
    u.setDefaults(), v(JSON.stringify(h));
  }, j = () => {
    u.processing || (u.transform((T) => ({
      ...t ? { title: T.title } : T,
      fields: Qe(h, N)
    })), t ? u.put(`${n}/${t.id}`, { preserveScroll: !0, onSuccess: k }) : u.post(n, { onSuccess: k }));
  }, S = (T) => {
    T.preventDefault(), j();
  };
  a.useUnsavedChanges(B, j);
  const $ = () => t && d(
    `Delete the ${r.toLowerCase()} "${t.title}"? Content keeps its values.`,
    () => f.router.delete(`${n}/${t.id}`, { preserveScroll: !0 })
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: S, className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: i }),
    o,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: n, "aria-label": `Back to ${r.toLowerCase()}s`, children: /* @__PURE__ */ e.jsx(Q, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: i })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        t && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "icon", className: "cms:text-destructive", "aria-label": `Delete ${i}`, onClick: $, children: /* @__PURE__ */ e.jsx(L, {}) }),
        /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: u.processing, children: [
          u.processing && /* @__PURE__ */ e.jsx(ee, { className: "cms:animate-spin" }),
          t ? "Save" : `Create ${r.toLowerCase()}`
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(D, { message: p.blueprint ?? p.fieldset }),
    /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "title", children: "Title" }),
        /* @__PURE__ */ e.jsx(a.Input, { id: "title", value: u.data.title, required: !0, onChange: (T) => {
          u.setData((M) => ({ ...M, title: T.target.value, handle: m ? M.handle : Ze(T.target.value) }));
        } }),
        /* @__PURE__ */ e.jsx(D, { message: p.title })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "handle", children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: "handle",
            className: "cms:font-mono",
            value: u.data.handle,
            disabled: t !== null,
            required: !0,
            onChange: (T) => {
              x(!0), u.setData("handle", T.target.value);
            }
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t ? "Set when it was created." : "Lowercase letters, digits and underscores. It can't change later." }),
        /* @__PURE__ */ e.jsx(D, { message: p.handle })
      ] })
    ] }) }),
    c.length > 0 && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      "Used by ",
      c.join(", "),
      ". Changes show there at once."
    ] }),
    /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-3", "aria-labelledby": "fields-heading", children: [
      /* @__PURE__ */ e.jsx("h2", { id: "fields-heading", className: "cms:text-lg cms:font-medium", children: "Fields" }),
      /* @__PURE__ */ e.jsx(as, { fields: h, onChange: g, types: l, errors: se(p, "fields") }),
      /* @__PURE__ */ e.jsx(D, { message: p.fields })
    ] })
  ] });
}
function ls({ noun: s, base: t, rows: l, intro: c }) {
  const r = `${s}s`;
  a.useBreadcrumbs([{ label: r }]);
  const [n, i] = W();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: r }),
    i,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: r }),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: c })
      ] }),
      /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(f.Link, { href: `${t}/create`, children: [
        /* @__PURE__ */ e.jsx(F, {}),
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
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx(f.Link, { href: `${t}/${d.id}/edit`, className: "cms:font-medium cms:hover:underline", children: d.title }) }),
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
                () => f.router.delete(`${t}/${d.id}`, { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(L, {})
            }
          ) })
        ] }, d.id))
      ] })
    ] }) })
  ] });
}
function et({ blueprints: s }) {
  const t = f.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(D, { message: t.blueprint }),
    /* @__PURE__ */ e.jsx(
      ls,
      {
        noun: "Blueprint",
        base: w("cms/blueprints"),
        rows: s,
        intro: "The fields editors fill in, for each kind of content."
      }
    )
  ] });
}
const st = [
  { handle: "title", type: "text", label: "SEO title", instructions: "For search results and tabs. Empty: the title.", config: { max: 255 } },
  { handle: "description", type: "textarea", label: "Description", instructions: "A sentence or two for search results and shared links.", config: { max: 500 } },
  { handle: "image", type: "media", label: "Share image", instructions: "Shown when the page is shared.", config: { types: ["image"] } },
  { handle: "noindex", type: "toggle", label: "Hide from search engines" }
];
function tt(s) {
  const { entry: t } = s;
  return /* @__PURE__ */ e.jsx(at, { ...s }, t ? `${t.id}:${t.locale}:${t.version}:${t.status}:${t.trashed}:${t.publishedAt}` : "new");
}
function at({ collection: s, fields: t, locales: l = [], shared: c = [], sharedValues: r = {}, entry: n, values: i, revisions: d, undoRestore: o = null, can: u }) {
  const m = w(`cms/collections/${s.handle}/entries`), x = n ? w(`cms/entries/${n.id}`) : m, h = n ? i.title : "New entry";
  a.useBreadcrumbs([{ label: s.title, href: m }, { label: h }]);
  const [g, N] = W(), [p, b] = C.useState(!1), v = f.useForm({ ...i, seo: i.seo ?? {}, locale: n?.locale ?? null, version: n?.version ?? null, publish: !1, published_at: null }), B = n ? { locale: n.locale } : {}, k = l.find((y) => y.main)?.code, j = v.errors, S = n !== null && n.status !== "draft" && !n.hasUnpublishedChanges && !v.isDirty, $ = n === null ? u.create : u.update && !n.trashed, T = (y = !1, A = null) => {
    v.transform((H) => ({ ...H, publish: y, published_at: A })), n ? v.put(x, { preserveScroll: !0, onSuccess: () => b(!1) }) : v.post(x);
  }, M = () => {
    v.transform((y) => ({ ...y, version: null, publish: !1, published_at: null })), v.put(x, { preserveScroll: !0 });
  }, I = a.useEditLock({
    type: "cms.entry",
    id: n?.id,
    locale: n?.locale,
    enabled: n !== null && $,
    noun: "entry",
    leaveTo: m,
    getUnsaved: () => v.isDirty ? { title: v.data.title, slug: v.data.slug, data: v.data.data, seo: v.data.seo } : null
  }), Y = $ && !I.readOnly, os = async (y) => {
    const A = await I.loadKept(y);
    v.setData((H) => ({ ...H, title: A.title ?? H.title, slug: A.slug ?? H.slug, data: A.data ?? H.data, seo: A.seo ?? H.seo }));
  };
  a.useUnsavedChanges(v.isDirty && !I.takenOver, Y ? () => v.processing || T() : void 0);
  const ie = (y = null) => {
    u.update ? T(!0, y) : n && f.router.post(`${x}/publish`, { ...B, published_at: y }, { preserveScroll: !0, onSuccess: () => b(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (y) => {
    y.preventDefault(), T();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: h }),
    N,
    I.dialogs,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: m, "aria-label": `Back to ${s.title}`, children: /* @__PURE__ */ e.jsx(Q, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: h }),
        n && /* @__PURE__ */ e.jsx(a.Badge, { variant: n.status === "published" ? "default" : "secondary", children: n.trashed ? "In the trash" : V(n.status) }),
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
              /* @__PURE__ */ e.jsx(ws, {}),
              " Preview"
            ]
          }
        ) }),
        n?.url && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: n.url, target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ e.jsx(Cs, {}),
          " View"
        ] }) }),
        n?.trashed && u.delete && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", onClick: () => f.router.post(`${x}/restore`, {}, { preserveScroll: !0 }), children: [
          /* @__PURE__ */ e.jsx(Ts, {}),
          " Restore"
        ] }),
        n?.trashed && u.delete && /* @__PURE__ */ e.jsxs(
          a.Button,
          {
            type: "button",
            variant: "outline",
            className: "cms:text-destructive",
            onClick: () => g(`Delete "${i.title}" for good, in every language, with its revisions? This can't be undone.`, () => f.router.delete(`${x}/force`)),
            children: [
              /* @__PURE__ */ e.jsx(L, {}),
              " Delete for good"
            ]
          }
        ),
        n && !n.trashed && u.create && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "ghost", title: "Copy every language as a new draft", onClick: () => f.router.post(`${x}/duplicate`), children: [
          /* @__PURE__ */ e.jsx(ks, {}),
          " Duplicate"
        ] }),
        n && !n.trashed && u.delete && !I.readOnly && /* @__PURE__ */ e.jsx(
          a.Button,
          {
            type: "button",
            variant: "outline",
            size: "icon",
            className: "cms:text-destructive",
            "aria-label": "Move to the trash",
            onClick: () => g(`Move "${i.title}" to the trash? It comes off the site; you can restore it.`, () => f.router.delete(x)),
            children: /* @__PURE__ */ e.jsx(L, {})
          }
        ),
        Y && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", variant: n && u.publish ? "outline" : "default", disabled: v.processing, children: [
          v.processing && /* @__PURE__ */ e.jsx(ee, { className: "cms:animate-spin" }),
          n ? "Save draft" : "Create draft"
        ] }),
        n && !n.trashed && u.publish && !I.readOnly && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex", children: [
          /* @__PURE__ */ e.jsx(a.Button, { type: "button", className: "cms:rounded-r-none", disabled: v.processing || S, onClick: () => ie(), children: n.status === "draft" ? "Publish" : S ? "Published" : "Publish changes" }),
          /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "icon", className: "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": "More publishing options", children: /* @__PURE__ */ e.jsx($e, {}) }) }),
            /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", children: [
              /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { onSelect: () => b(!0), children: [
                /* @__PURE__ */ e.jsx(ys, {}),
                " Publish on a date…"
              ] }),
              n.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
                /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => f.router.post(`${x}/unpublish`, B, { preserveScroll: !0 }), children: "Unpublish" })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }),
    n && l.length > 1 && /* @__PURE__ */ e.jsx(
      lt,
      {
        entryUrl: x,
        current: n.locale,
        locales: l,
        canAdd: u.create && !n.trashed,
        canRemove: u.delete && !n.isMain && !n.trashed,
        onRemove: () => g(
          `Remove the ${z(n.locale)} translation of "${i.title}"? Its revisions go with it.`,
          () => f.router.delete(`${x}/translations/${n.locale}`)
        )
      }
    ),
    /* @__PURE__ */ e.jsx(a.ViewingNotice, { by: I.viewingBy }),
    /* @__PURE__ */ e.jsx(a.KeptEditsNotice, { kept: I.kept, disabled: !Y, onLoad: (y) => {
      os(y);
    }, onDiscard: (y) => {
      I.discardKept(y);
    } }),
    j.version && /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: [
      /* @__PURE__ */ e.jsx("span", { children: j.version }),
      /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => f.router.reload(), children: "Load theirs" }),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            type: "button",
            variant: "destructive",
            size: "sm",
            disabled: v.processing,
            onClick: () => g("Save your version over theirs? Their changes are replaced (their earlier published versions stay in the revisions).", M),
            children: "Save mine anyway"
          }
        )
      ] })
    ] }),
    (j.entry || j.published_at) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: j.entry ?? j.published_at }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_18rem]", children: [
      /* @__PURE__ */ e.jsxs("fieldset", { disabled: !Y, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-[2fr_1fr]", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "title", children: "Title" }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "title",
                value: v.data.title,
                "aria-invalid": j.title !== void 0,
                onChange: (y) => v.setData("title", y.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(D, { message: j.title })
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
                "aria-invalid": j.slug !== void 0,
                onChange: (y) => v.setData("slug", y.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(D, { message: j.slug })
          ] })
        ] }) }),
        t.length > 0 && /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsx(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: t.map((y) => c.includes(y.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
          /* @__PURE__ */ e.jsx(q, { id: `data-${y.handle}`, field: y, content: !0, value: r[y.handle], errors: {}, onChange: () => {
          } }),
          /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
            "Shared by all languages: edit it in ",
            k ? z(k) : "the main language",
            "."
          ] })
        ] }, y.handle) : /* @__PURE__ */ e.jsx(
          q,
          {
            id: `data-${y.handle}`,
            field: y,
            content: !0,
            value: v.data.data[y.handle],
            errors: P(j, `data.${y.handle}`),
            onChange: (A) => v.setData("data", { ...v.data.data, [y.handle]: A })
          },
          y.handle
        )) }) }),
        /* @__PURE__ */ e.jsxs(a.Card, { children: [
          /* @__PURE__ */ e.jsx(a.CardHeader, { children: /* @__PURE__ */ e.jsx(a.CardTitle, { className: "cms:text-base", children: "Search and sharing" }) }),
          /* @__PURE__ */ e.jsx(a.CardContent, { children: /* @__PURE__ */ e.jsx(
            te,
            {
              id: "seo",
              fields: st,
              value: v.data.seo,
              errors: P(j, "seo"),
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
              V(n.status),
              n.status !== "draft" && n.publishedAt ? ` · ${K(n.publishedAt)}` : ""
            ] }),
            n.status !== "draft" && n.hasUnpublishedChanges && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The draft has changes the site doesn't show yet." })
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs(a.Card, { children: [
          /* @__PURE__ */ e.jsx(a.CardHeader, { children: /* @__PURE__ */ e.jsx(a.CardTitle, { className: "cms:text-base", children: "Revisions" }) }),
          /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
            o !== null && u.update && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => f.router.post(w(`cms/entry-translations/${o}/undo-restore`), {}, { preserveScroll: !0 }), children: [
              /* @__PURE__ */ e.jsx(Bs, {}),
              " Undo the restore"
            ] }),
            d.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "Each publish keeps one." }),
            d.map((y) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
                /* @__PURE__ */ e.jsx("div", { className: "cms:truncate", children: y.title }),
                /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: K(y.createdAt) })
              ] }),
              u.update && !n.trashed && /* @__PURE__ */ e.jsx(
                a.Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  onClick: () => f.router.post(w(`cms/revisions/${y.id}/restore`), {}, { preserveScroll: !0 }),
                  children: "Restore"
                }
              )
            ] }, y.id))
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(
      nt,
      {
        open: p,
        onClose: () => b(!1),
        processing: v.processing,
        current: n?.publishedAt ?? null,
        onSchedule: (y) => ie(y)
      }
    )
  ] });
}
function lt({ entryUrl: s, current: t, locales: l, canAdd: c, canRemove: r, onRemove: n }) {
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
          onClick: () => f.router.post(`${s}/translations`, { locale: i.code }),
          children: [
            /* @__PURE__ */ e.jsx(F, {}),
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
          onClick: () => i.code !== t && f.router.get(`${s}/edit`, { locale: i.code }),
          children: [
            d,
            /* @__PURE__ */ e.jsx(a.Badge, { variant: i.status === "published" ? "default" : "outline", className: "cms:ml-1", children: V(i.status) })
          ]
        },
        i.code
      );
    }),
    r && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:ml-auto cms:text-destructive", onClick: n, children: "Remove this language" })
  ] });
}
function nt({ open: s, onClose: t, onSchedule: l, current: c, processing: r }) {
  const [n, i] = C.useState("");
  return C.useEffect(() => {
    s && i(Ps(c ? new Date(c) : new Date(Date.now() + 864e5)));
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
function ct({ collection: s, collections: t, entries: l, query: c, can: r }) {
  a.useBreadcrumbs([{ label: "Entries", href: w("cms/entries") }, ...s ? [{ label: s.title }] : []]);
  const [n, i] = C.useState(c.search), d = s ? w(`cms/collections/${s.handle}/entries`) : "", [o, u] = C.useState([]), [m, x] = W();
  C.useEffect(() => u([]), [l]);
  const h = c.trashed ? r?.delete ? [{ action: "restore", label: "Restore" }, { action: "delete", label: "Delete for good", danger: !0 }] : [] : [
    ...r?.publish ? [{ action: "publish", label: "Publish" }, { action: "unpublish", label: "Unpublish" }] : [],
    ...r?.delete ? [{ action: "trash", label: "Move to the trash", danger: !0 }] : []
  ], g = (p, b, v = !1) => {
    const B = () => f.router.post(`${d}/bulk`, { action: p, ids: o }, { preserveScroll: !0 });
    v ? m(`${b}: ${o.length} ${o.length === 1 ? "entry" : "entries"}?${p === "delete" ? " This can't be undone." : ""}`, B) : B();
  }, N = (p) => {
    const b = { ...c, ...p };
    f.router.get(
      d,
      { ...b.search ? { search: b.search } : {}, ...b.trashed ? { trashed: 1 } : {} },
      { preserveState: !0, preserveScroll: !0, replace: !0 }
    );
  };
  return C.useEffect(() => {
    if (n === c.search) return;
    const p = window.setTimeout(() => N({ search: n }), 300);
    return () => window.clearTimeout(p);
  }, [n]), !s || !l ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: "Entries" }),
    /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Entries" }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no collections yet. Create one under Structure → Collections, then come back to write its entries." })
  ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: s.title }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
        t.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: s.handle, onValueChange: (p) => f.router.get(w(`cms/collections/${p}/entries`)), children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": "Collection", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: t.map((p) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: p.handle, children: p.title }, p.handle)) })
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        l.total > 0 && !c.trashed && /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: `${d}/export`, children: [
          /* @__PURE__ */ e.jsx(Le, {}),
          " Export CSV"
        ] }) }),
        r?.create && !c.trashed && /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(f.Link, { href: `${d}/create`, children: [
          /* @__PURE__ */ e.jsx(F, {}),
          " New entry"
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-sm", children: [
        /* @__PURE__ */ e.jsx(Ve, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            className: "cms:pl-9",
            placeholder: "Search titles",
            "aria-label": "Search titles",
            value: n,
            onChange: (p) => i(p.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(a.Button, { variant: c.trashed ? "secondary" : "ghost", size: "sm", onClick: () => N({ trashed: !c.trashed }), children: c.trashed ? "Back to entries" : "Trash" }),
      o.length > 0 && h.length > 0 && /* @__PURE__ */ e.jsxs("div", { role: "toolbar", "aria-label": "Selected entries", className: "cms:ml-auto cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs("span", { className: "cms:text-sm cms:text-muted-foreground", children: [
          o.length,
          " selected"
        ] }),
        h.map((p) => /* @__PURE__ */ e.jsx(a.Button, { size: "sm", variant: p.danger ? "destructive" : "outline", onClick: () => g(p.action, p.label, p.danger), children: p.label }, p.action))
      ] })
    ] }),
    x,
    /* @__PURE__ */ e.jsx(a.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(a.Table, { children: [
      /* @__PURE__ */ e.jsx(a.TableHeader, { children: /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
        h.length > 0 && /* @__PURE__ */ e.jsx(a.TableHead, { className: "cms:w-10", children: /* @__PURE__ */ e.jsx(
          a.Checkbox,
          {
            "aria-label": "Select all on this page",
            checked: l.data.length > 0 && o.length === l.data.length,
            onCheckedChange: (p) => u(p ? l.data.map((b) => b.id) : [])
          }
        ) }),
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Title" }),
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Status" }),
        /* @__PURE__ */ e.jsx(a.TableHead, { children: s.dated ? "Date" : "Updated" })
      ] }) }),
      /* @__PURE__ */ e.jsxs(a.TableBody, { children: [
        l.data.length === 0 && /* @__PURE__ */ e.jsx(a.TableRow, { children: /* @__PURE__ */ e.jsx(a.TableCell, { colSpan: h.length > 0 ? 4 : 3, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: c.trashed ? "The trash is empty." : c.search ? "Nothing matches." : "No entries yet." }) }),
        l.data.map((p) => /* @__PURE__ */ e.jsxs(a.TableRow, { "data-state": o.includes(p.id) ? "selected" : void 0, children: [
          h.length > 0 && /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx(
            a.Checkbox,
            {
              "aria-label": `Select ${p.title}`,
              checked: o.includes(p.id),
              onCheckedChange: (b) => u(b ? [...o, p.id] : o.filter((v) => v !== p.id))
            }
          ) }),
          /* @__PURE__ */ e.jsxs(a.TableCell, { children: [
            /* @__PURE__ */ e.jsx(f.Link, { href: w(`cms/entries/${p.id}/edit`), className: "cms:font-medium cms:hover:underline", children: p.title }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
              "/",
              p.slug
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-1", children: [
            /* @__PURE__ */ e.jsx(a.Badge, { variant: p.status === "published" ? "default" : "secondary", children: V(p.status) }),
            p.locales.length > 1 && p.locales.filter((b) => !b.main).map((b) => /* @__PURE__ */ e.jsx(
              a.Badge,
              {
                variant: b.status === "published" ? "default" : "outline",
                className: b.status === null ? "cms:opacity-50" : "",
                title: `${b.code}: ${b.status === null ? "not translated" : V(b.status)}`,
                children: b.code.toUpperCase()
              },
              b.code
            ))
          ] }) }),
          /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:text-muted-foreground", children: K(s.dated ? p.publishedAt : p.updatedAt) })
        ] }, p.id))
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
            onClick: () => l.prev_page_url && f.router.get(l.prev_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(_e, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Next page",
            disabled: !l.next_page_url,
            onClick: () => l.next_page_url && f.router.get(l.next_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(re, {})
          }
        )
      ] })
    ] })
  ] });
}
function rt({ fieldsets: s }) {
  const t = f.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(D, { message: t.fieldset }),
    /* @__PURE__ */ e.jsx(
      ls,
      {
        noun: "Fieldset",
        base: w("cms/fieldsets"),
        rows: s,
        intro: "Fields shared between blueprints, and the kinds of block of flexible fields."
      }
    )
  ] });
}
function it(s) {
  return /* @__PURE__ */ e.jsx(ot, { ...s }, `${s.locale}:${JSON.stringify(s.values)}`);
}
function ot({ set: s, fields: t, locale: l, locales: c, shared: r, values: n, can: i }) {
  const d = w(`cms/globals/${s.handle}`);
  a.useBreadcrumbs([{ label: "Globals", href: w("cms/globals") }, { label: s.title }]);
  const o = f.useForm({ locale: l, data: n }), u = o.errors, m = c[0], x = a.useEditLock({
    type: "cms.global",
    id: s.id,
    locale: l,
    enabled: i.update,
    noun: "global set",
    leaveTo: w("cms/globals"),
    getUnsaved: () => o.isDirty ? { data: o.data.data } : null
  }), h = i.update && !x.readOnly, g = () => o.processing || o.put(d, { preserveScroll: !0 }), N = async (p) => {
    const b = await x.loadKept(p);
    b.data && typeof b.data == "object" && o.setData("data", b.data);
  };
  return a.useUnsavedChanges(o.isDirty && !x.takenOver, h ? g : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: (p) => {
    p.preventDefault(), g();
  }, className: "cms:flex cms:max-w-3xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: s.title }),
    x.dialogs,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: w("cms/globals"), "aria-label": "Back to globals", children: /* @__PURE__ */ e.jsx(Q, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
        o.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        c.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: l, onValueChange: (p) => f.router.get(d, { locale: p }), children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: c.map((p, b) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: p, children: [
            z(p),
            b === 0 ? " (main)" : ""
          ] }, p)) })
        ] }),
        h && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: o.processing, children: [
          o.processing && /* @__PURE__ */ e.jsx(ee, { className: "cms:animate-spin" }),
          " Save"
        ] })
      ] })
    ] }),
    t.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "This global set has no fields: choose a blueprint for it under Structure → Global sets." }) : /* @__PURE__ */ e.jsxs("fieldset", { disabled: !h, className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(a.ViewingNotice, { by: x.viewingBy }),
      /* @__PURE__ */ e.jsx(a.KeptEditsNotice, { kept: x.kept, disabled: !h, onLoad: (p) => {
        N(p);
      }, onDiscard: (p) => {
        x.discardKept(p);
      } }),
      /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsx(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: t.map((p) => r.includes(p.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(q, { id: `data-${p.handle}`, field: p, content: !0, value: n[p.handle], errors: {}, onChange: () => {
        } }),
        /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
          "Shared by all languages: edit it in ",
          m ? z(m) : "the main language",
          "."
        ] })
      ] }, p.handle) : /* @__PURE__ */ e.jsx(
        q,
        {
          id: `data-${p.handle}`,
          field: p,
          content: !0,
          value: o.data.data[p.handle],
          errors: P(u, `data.${p.handle}`),
          onChange: (b) => o.setData("data", { ...o.data.data, [p.handle]: b })
        },
        p.handle
      )) }) })
    ] })
  ] });
}
function dt({ sets: s }) {
  return a.useBreadcrumbs([{ label: "Globals" }]), /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: "Globals" }),
    /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Globals" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Values the whole site uses, like contact details and footer text." })
    ] }),
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no global sets yet. Create one under Structure → Global sets." }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:sm:grid-cols-2 cms:lg:grid-cols-3", children: s.map((t) => /* @__PURE__ */ e.jsx(f.Link, { href: w(`cms/globals/${t.handle}`), className: "cms:rounded-xl cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none", children: /* @__PURE__ */ e.jsxs(a.Card, { className: "cms:h-full cms:transition-colors cms:hover:bg-accent", children: [
      /* @__PURE__ */ e.jsxs(a.CardHeader, { children: [
        /* @__PURE__ */ e.jsx(a.CardTitle, { className: "cms:text-base", children: t.title }),
        /* @__PURE__ */ e.jsx(a.CardDescription, { children: t.blueprint ? /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: t.handle }) : "No blueprint yet: choose one under Structure → Global sets." })
      ] }),
      /* @__PURE__ */ e.jsx(a.CardContent, {})
    ] }) }, t.handle)) })
  ] });
}
let ns = 0;
function cs(s, t = 0) {
  return s.flatMap(({ children: l, ...c }) => [{ ...c, key: `m${++ns}`, depth: t }, ...cs(l ?? [], t + 1)]);
}
function mt(s) {
  const t = [], l = [{ depth: -1, children: t }];
  for (const { key: c, depth: r, ...n } of s) {
    for (; l.length > 1 && l[l.length - 1].depth >= r; ) l.pop();
    const i = { ...n, children: [] };
    l[l.length - 1].children.push(i), l.push({ depth: r, children: i.children });
  }
  return t;
}
function J(s, t) {
  const l = s[t]?.depth ?? 0;
  let c = t + 1;
  for (; c < s.length && s[c].depth > l; ) c++;
  return c;
}
function rs(s, t, l) {
  const c = J(s, t);
  return s.map((r, n) => n >= t && n < c ? { ...r, depth: r.depth + l } : r);
}
function ut(s, t, l) {
  const c = s[t], r = s[t - 1];
  return !c || !r || c.depth > r.depth || Math.max(...s.slice(t, J(s, t)).map((i) => i.depth)) + 1 > l - 1 ? s : rs(s, t, 1);
}
function ht(s, t) {
  return (s[t]?.depth ?? 0) === 0 ? s : rs(s, t, -1);
}
function pe(s, t, l) {
  const c = s[t];
  if (!c) return s;
  const r = J(s, t), n = s.slice(t, r);
  if (l === -1) {
    let o = t - 1;
    for (; o >= 0 && s[o].depth > c.depth; ) o--;
    return o < 0 || s[o].depth !== c.depth ? s : [...s.slice(0, o), ...n, ...s.slice(o, t), ...s.slice(r)];
  }
  const i = s[r];
  if (!i || i.depth !== c.depth) return s;
  const d = J(s, r);
  return [...s.slice(0, t), ...s.slice(r, d), ...n, ...s.slice(d)];
}
function xt(s, t) {
  return [...s.slice(0, t), ...s.slice(J(s, t))];
}
function ge(s) {
  return { key: `m${++ns}`, depth: 0, entry_id: null, entry: null, url: null, labels: {}, new_tab: !1, ...s };
}
function pt({ menu: s, items: t, locales: l, limits: c, can: r }) {
  const n = w(`cms/menus/${s.handle}`);
  a.useBreadcrumbs([{ label: "Menus", href: w("cms/menus") }, { label: s.title }]);
  const [i, d] = C.useState(() => cs(t)), [o, u] = C.useState(null), m = f.useForm({ items: t }), x = m.errors, [h, g] = C.useState(!1), N = l[0] ?? "en", p = (k) => {
    d(k), g(!0);
  }, b = (k, j) => p(i.map((S, $) => $ === k ? { ...S, ...j } : S)), v = () => {
    m.processing || (m.transform(() => ({ items: mt(i).map(is) })), m.put(n, { preserveScroll: !0, onSuccess: () => g(!1) }));
  }, B = (k) => {
    k.preventDefault(), v();
  };
  return a.useUnsavedChanges(h, r.update ? v : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: B, className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: s.title }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: w("cms/menus"), "aria-label": "Back to menus", children: /* @__PURE__ */ e.jsx(Q, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
        h && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      r.update && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", disabled: i.length >= c.items, onClick: () => u("entry"), children: [
          /* @__PURE__ */ e.jsx(F, {}),
          " Entry"
        ] }),
        /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", disabled: i.length >= c.items, onClick: () => u("url"), children: [
          /* @__PURE__ */ e.jsx(Ss, {}),
          " Link"
        ] }),
        /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: m.processing, children: [
          m.processing && /* @__PURE__ */ e.jsx(ee, { className: "cms:animate-spin" }),
          " Save"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(D, { message: x.items }),
    Object.keys(x).some((k) => k.startsWith("items.")) && /* @__PURE__ */ e.jsxs("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: [
      "Some links need fixing: ",
      Object.values(x).filter(Boolean)[0]
    ] }),
    /* @__PURE__ */ e.jsx(a.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs("ul", { className: "cms:divide-y", children: [
      i.length === 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-6 cms:text-center cms:text-muted-foreground", children: "No links yet. Add an entry or a link." }),
      i.map((k, j) => /* @__PURE__ */ e.jsxs("li", { className: "cms:flex cms:flex-col cms:gap-2 cms:p-3", style: { paddingLeft: `${0.75 + k.depth * 2}rem` }, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(
            a.Input,
            {
              "aria-label": `Label (${z(N)})`,
              className: "cms:max-w-xs",
              disabled: !r.update,
              placeholder: k.entry?.title ?? "Label",
              value: k.labels[N] ?? "",
              onChange: (S) => b(j, { labels: { ...k.labels, [N]: S.target.value } })
            }
          ),
          /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:text-sm cms:text-muted-foreground", children: k.entry_id !== null ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            k.entry?.collection,
            ": ",
            k.entry?.title ?? `Entry #${k.entry_id}`,
            " ",
            k.entry && !k.entry.live && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", children: "Not on the site" })
          ] }) : k.url }),
          r.update && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center", children: [
            /* @__PURE__ */ e.jsxs("label", { className: "cms:mr-2 cms:flex cms:items-center cms:gap-1.5 cms:text-sm", children: [
              /* @__PURE__ */ e.jsx(a.Checkbox, { checked: k.new_tab, onCheckedChange: (S) => b(j, { new_tab: S }) }),
              " New tab"
            ] }),
            /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Out a level", disabled: k.depth === 0, onClick: () => p(ht(i, j)), children: /* @__PURE__ */ e.jsx($s, {}) }),
            /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "In a level", onClick: () => p(ut(i, j, c.depth)), children: /* @__PURE__ */ e.jsx(Ds, {}) }),
            /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move up", onClick: () => p(pe(i, j, -1)), children: /* @__PURE__ */ e.jsx(X, {}) }),
            /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move down", onClick: () => p(pe(i, j, 1)), children: /* @__PURE__ */ e.jsx(Z, {}) }),
            /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": "Remove, with what's under it", onClick: () => p(xt(i, j)), children: /* @__PURE__ */ e.jsx(L, {}) })
          ] })
        ] }),
        l.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: l.slice(1).map((S) => /* @__PURE__ */ e.jsx(
          a.Input,
          {
            "aria-label": `Label (${z(S)})`,
            className: "cms:max-w-xs",
            disabled: !r.update,
            placeholder: `${z(S)}: as ${z(N)}`,
            value: k.labels[S] ?? "",
            onChange: ($) => b(j, { labels: { ...k.labels, [S]: $.target.value } })
          },
          S
        )) })
      ] }, k.key))
    ] }) }),
    /* @__PURE__ */ e.jsx(gt, { kind: o, onClose: () => u(null), onAdd: (k) => {
      p([...i, k]), u(null);
    }, main: N })
  ] });
}
function is({ entry: s, children: t, ...l }) {
  return { ...l, children: t.map(is) };
}
function gt({ kind: s, onClose: t, onAdd: l, main: c }) {
  const [r, n] = C.useState(null), [i, d] = C.useState(""), [o, u] = C.useState("");
  C.useEffect(() => {
    n(null), d(""), u("");
  }, [s]);
  const m = i.trim() === "" || Os(i.trim()), x = async () => {
    if (s === "entry" && r !== null) {
      const h = await fetch(`${w("cms/entry-picker")}?${es({ ids: [r], collections: [] })}`, { headers: { Accept: "application/json" }, credentials: "same-origin" }), g = h.ok ? (await h.json()).items[0] : void 0;
      l(ge({ entry_id: r, entry: g ? { title: g.title, collection: g.collection, live: g.status === "published" } : null, labels: o ? { [c]: o } : {} }));
    } else s === "url" && i.trim() !== "" && m && o.trim() !== "" && l(ge({ url: i.trim(), labels: { [c]: o.trim() } }));
  };
  return /* @__PURE__ */ e.jsx(a.Dialog, { open: s !== null, onOpenChange: (h) => !h && t(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: s === "entry" ? "Link to an entry" : "Link to an address" }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: s === "entry" ? "It follows the entry: its title (unless you give a label) and its address in each language. It shows only while the entry is on the site." : "A web address, a path on this site (/contact), mailto: or tel:." })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
      s === "entry" ? /* @__PURE__ */ e.jsx(
        ss,
        {
          id: "menu-entry",
          value: r,
          multiple: !1,
          max: null,
          collections: [],
          invalid: !1,
          onChange: (h) => n(typeof h == "number" ? h : null)
        }
      ) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "menu-url", children: "Address" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: "menu-url",
            value: i,
            placeholder: "https://… or /contact",
            "aria-invalid": !m,
            onChange: (h) => d(h.target.value)
          }
        ),
        !m && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "This address could run code; use https://, a path, mailto: or tel:." })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(a.Label, { htmlFor: "menu-label", children: [
          "Label",
          s === "entry" ? " (optional)" : ""
        ] }),
        /* @__PURE__ */ e.jsx(a.Input, { id: "menu-label", value: o, onChange: (h) => u(h.target.value) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: t, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(
        a.Button,
        {
          type: "button",
          onClick: () => {
            x();
          },
          disabled: s === "entry" ? r === null : i.trim() === "" || !m || o.trim() === "",
          children: "Add"
        }
      )
    ] })
  ] }) });
}
function jt({ menus: s }) {
  return a.useBreadcrumbs([{ label: "Menus" }]), /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: "Menus" }),
    /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Menus" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Navigation for the site: the main menu, the footer…" })
    ] }),
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no menus yet. Create one under Structure → Menus." }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:sm:grid-cols-2 cms:lg:grid-cols-3", children: s.map((t) => /* @__PURE__ */ e.jsx(f.Link, { href: w(`cms/menus/${t.handle}`), className: "cms:rounded-xl cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none", children: /* @__PURE__ */ e.jsxs(a.Card, { className: "cms:h-full cms:transition-colors cms:hover:bg-accent", children: [
      /* @__PURE__ */ e.jsxs(a.CardHeader, { children: [
        /* @__PURE__ */ e.jsx(a.CardTitle, { className: "cms:text-base", children: t.title }),
        /* @__PURE__ */ e.jsx(a.CardDescription, { children: /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: t.handle }) })
      ] }),
      /* @__PURE__ */ e.jsx(a.CardContent, {})
    ] }) }, t.handle)) })
  ] });
}
const ft = 3;
function bt({ form: s, forms: t, submissions: l, can: c }) {
  a.useBreadcrumbs([{ label: "Submissions", href: w("cms/submissions") }, ...s ? [{ label: s.title }] : []]);
  const [r, n] = C.useState(null), [i, d] = W();
  if (!s || !l)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(f.Head, { title: "Submissions" }),
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Submissions" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no forms yet. Create one under Structure → Forms and put it on a page; what visitors send shows up here." })
    ] });
  const o = (l.data[0]?.rows ?? []).slice(0, ft), u = (m) => i(
    "Delete this submission for good? It can't be restored.",
    () => f.router.delete(w(`cms/submissions/${m.id}`), { preserveScroll: !0, onSuccess: () => n(null) })
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: `${s.title} submissions` }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
        t.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: s.handle, onValueChange: (m) => f.router.get(w(`cms/forms/${m}/submissions`)), children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-56", "aria-label": "Form", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: t.map((m) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: m.handle, children: [
            m.title,
            " (",
            m.count,
            ")"
          ] }, m.handle)) })
        ] })
      ] }),
      l.total > 0 && /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: w(`cms/forms/${s.handle}/submissions/export`), children: [
        /* @__PURE__ */ e.jsx(Le, {}),
        " Export CSV"
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsx(a.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(a.Table, { children: [
      /* @__PURE__ */ e.jsx(a.TableHeader, { children: /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Sent" }),
        o.map((m) => /* @__PURE__ */ e.jsx(a.TableHead, { children: m.label }, m.handle))
      ] }) }),
      /* @__PURE__ */ e.jsxs(a.TableBody, { children: [
        l.data.length === 0 && /* @__PURE__ */ e.jsx(a.TableRow, { children: /* @__PURE__ */ e.jsx(a.TableCell, { colSpan: o.length + 1, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: "Nothing sent yet." }) }),
        l.data.map((m) => /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
          /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:whitespace-nowrap", children: /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:font-medium cms:hover:underline", onClick: () => n(m), children: K(m.createdAt) }) }),
          o.map((x) => /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:max-w-64 cms:truncate", children: m.rows.find((h) => h.handle === x.handle)?.value }, x.handle))
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
            onClick: () => l.prev_page_url && f.router.get(l.prev_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(_e, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Next page",
            disabled: !l.next_page_url,
            onClick: () => l.next_page_url && f.router.get(l.next_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(re, {})
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(a.Dialog, { open: r !== null, onOpenChange: (m) => !m && n(null), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto", children: [
      /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
        /* @__PURE__ */ e.jsx(a.DialogTitle, { children: s.title }),
        /* @__PURE__ */ e.jsxs(a.DialogDescription, { children: [
          "Sent ",
          K(r?.createdAt ?? null),
          " · ",
          r?.locale.toUpperCase()
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-3 cms:text-sm", children: r?.rows.map((m) => /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: m.label }),
        /* @__PURE__ */ e.jsx("dd", { className: "cms:whitespace-pre-wrap cms:break-words cms:text-muted-foreground", children: m.value || "—" })
      ] }, m.handle)) }),
      c.delete && r && /* @__PURE__ */ e.jsx(a.DialogFooter, { children: /* @__PURE__ */ e.jsxs(a.Button, { variant: "destructive", onClick: () => u(r), children: [
        /* @__PURE__ */ e.jsx(L, {}),
        " Delete"
      ] }) })
    ] }) }),
    d
  ] });
}
const ne = "__top";
function vt({ taxonomy: s, taxonomies: t, terms: l, locales: c, locale: r }) {
  a.useBreadcrumbs([{ label: "Terms", href: w("cms/terms") }, ...s ? [{ label: s.title }] : []]);
  const [n, i] = W(), [d, o] = C.useState(null);
  if (!s)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(f.Head, { title: "Terms" }),
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Terms" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no taxonomies yet. Create one under Structure → Taxonomies (categories, tags…), then add its terms here." })
    ] });
  const u = w(`cms/taxonomies/${s.handle}/terms`);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: s.title }),
    i,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
      t.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: s.handle, onValueChange: (m) => f.router.get(w(`cms/taxonomies/${m}/terms`)), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": "Taxonomy", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(a.SelectContent, { children: t.map((m) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: m.handle, children: m.title }, m.handle)) })
      ] }),
      c.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: r, onValueChange: (m) => f.router.get(u, { locale: m }), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:ml-auto cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(a.SelectContent, { children: c.map((m) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: m, children: z(m) }, m)) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsx(a.CardContent, { children: /* @__PURE__ */ e.jsx(
      je,
      {
        action: u,
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
        const x = l.filter((g) => g.parentId === m.parentId), h = x.findIndex((g) => g.id === m.id);
        return /* @__PURE__ */ e.jsx("li", { className: "cms:p-3", style: { paddingLeft: `${0.75 + m.depth * 1.5}rem` }, children: d === m.id ? /* @__PURE__ */ e.jsx(
          je,
          {
            action: w(`cms/terms/${m.id}`),
            method: "put",
            locale: r,
            terms: l,
            hierarchical: s.hierarchical,
            term: m,
            submitLabel: "Save",
            onDone: () => o(null)
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
              disabled: h === 0,
              onClick: () => f.router.post(w(`cms/terms/${m.id}/move`), { direction: "up" }, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(X, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-label": `Move ${m.fallback} down`,
              disabled: h === x.length - 1,
              onClick: () => f.router.post(w(`cms/terms/${m.id}/move`), { direction: "down" }, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(Z, {})
            }
          ),
          /* @__PURE__ */ e.jsx(a.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Edit ${m.fallback}`, onClick: () => o(m.id), children: /* @__PURE__ */ e.jsx(_s, {}) }),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Delete ${m.fallback}`,
              onClick: () => n(
                `Delete "${m.fallback}" in every language? Terms under it move up a level.`,
                () => f.router.delete(w(`cms/terms/${m.id}`), { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(L, {})
            }
          )
        ] }) }, m.id);
      })
    ] }) })
  ] });
}
function je({ action: s, method: t, locale: l, terms: c, hierarchical: r, term: n, submitLabel: i, onDone: d }) {
  const o = f.useForm({ title: n?.title ?? "", slug: n?.slug ?? "", parent_id: n?.parentId ?? null, locale: l }), u = o.errors, m = /* @__PURE__ */ new Set();
  if (n) {
    m.add(n.id);
    const g = c.findIndex((N) => N.id === n.id);
    for (let N = g + 1; N < c.length && (c[N]?.depth ?? 0) > n.depth; N++) m.add(c[N].id);
  }
  const x = (g) => {
    g.preventDefault(), o.submit(t, s, { preserveScroll: !0, onSuccess: () => {
      t === "post" && o.reset("title", "slug"), d?.();
    } });
  }, h = n ? `term-${n.id}` : "new-term";
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: x, className: "cms:grid cms:items-start cms:gap-3 cms:md:grid-cols-[2fr_1.5fr_1.5fr_auto]", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${h}-title`, className: n ? "cms:sr-only" : "", children: "Title" }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: `${h}-title`,
          value: o.data.title,
          placeholder: n?.fallback,
          required: !0,
          onChange: (g) => o.setData("title", g.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(D, { message: u.title })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${h}-slug`, className: n ? "cms:sr-only" : "", children: "Slug" }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: `${h}-slug`,
          className: "cms:font-mono",
          value: o.data.slug,
          placeholder: "Made from the title",
          onChange: (g) => o.setData("slug", g.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(D, { message: u.slug })
    ] }),
    r ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${h}-parent`, className: n ? "cms:sr-only" : "", children: "Under" }),
      /* @__PURE__ */ e.jsxs(
        a.Select,
        {
          value: o.data.parent_id === null ? ne : String(o.data.parent_id),
          onValueChange: (g) => o.setData("parent_id", g === ne ? null : Number(g)),
          children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: `${h}-parent`, children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(a.SelectItem, { value: ne, children: "Top level" }),
              c.filter((g) => !m.has(g.id)).map((g) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: String(g.id), children: [
                "— ".repeat(g.depth),
                g.title ?? g.fallback
              ] }, g.id))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ e.jsx(D, { message: u.parent_id })
    ] }) : /* @__PURE__ */ e.jsx("div", {}),
    /* @__PURE__ */ e.jsxs("div", { className: `cms:flex cms:gap-2 ${n ? "" : "cms:md:mt-6"}`, children: [
      /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: o.processing, children: [
        !n && /* @__PURE__ */ e.jsx(F, {}),
        " ",
        i
      ] }),
      d && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", onClick: d, children: "Cancel" })
    ] })
  ] });
}
ms({
  pages: {
    "Cms/Blueprints/Index": et,
    "Cms/Blueprints/Form": Qs,
    "Cms/Fieldsets/Index": rt,
    "Cms/Entries/Index": ct,
    "Cms/Entries/Editor": tt,
    "Cms/Terms/Index": vt,
    "Cms/Globals/Index": dt,
    "Cms/Globals/Edit": it,
    "Cms/Menus/Index": jt,
    "Cms/Menus/Edit": pt,
    "Cms/Submissions/Index": bt
  }
});
export {
  Ss as L,
  C as R,
  Bs as U,
  Nt as _,
  w as a,
  _ as c,
  Os as i,
  e as j,
  a as u
};
