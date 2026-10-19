function Ss(t, a) {
  for (var l = 0; l < a.length; l++) {
    const r = a[l];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const c in r)
        if (c !== "default" && !(c in t)) {
          const n = Object.getOwnPropertyDescriptor(r, c);
          n && Object.defineProperty(t, c, n.get ? n : {
            enumerable: !0,
            get: () => r[c]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }));
}
const pe = 1;
function Se() {
  const t = globalThis.Sunrice;
  if (!t)
    throw new Error("[sunrice] This script runs outside the Sunrice admin panel (window.Sunrice is missing).");
  return t;
}
function ws(t) {
  const a = Se();
  if (a.version !== pe)
    throw new Error(`[sunrice] This plugin was built for admin runtime ${pe}, but the panel runs ${a.version}. Rebuild it with a matching @sunrice/admin-sdk.`);
  for (const [l, r] of Object.entries(t.pages ?? {}))
    a.registerPage(l, r);
}
function C(t = "") {
  return Se().adminUrl(t);
}
const we = globalThis.Sunrice;
if (!we) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const e = we.modules["react/jsx-runtime"], $e = globalThis.Sunrice;
if (!$e) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const k = $e.modules.react, Gt = /* @__PURE__ */ Ss({
  __proto__: null
}, [k]), _e = globalThis.Sunrice;
if (!_e) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const f = _e.modules["@inertiajs/react"];
const $s = (t) => t?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
function _s(t, a, l = []) {
  if (a == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: $s(t),
    size: 24,
    node: a,
    ...l.length > 0 ? { aliases: l } : {}
  };
}
const Ds = (t) => {
  let a = "", l = !1;
  for (const r of t) {
    if (r === "-" || r === "_" || r <= " ") {
      l = a.length > 0;
      continue;
    }
    a.length === 0 ? a += r.toLowerCase() : a += l ? r.toUpperCase() : r, l = !1;
  }
  return a;
};
const Ts = (t) => {
  const a = Ds(t);
  return a.charAt(0).toUpperCase() + a.slice(1);
};
const de = (...t) => t.filter((a, l, r) => !!a && a.trim() !== "" && r.indexOf(a) === l).join(" ").trim();
const O = {
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
function re(t) {
  return t != null;
}
function zs(t, a = {}) {
  const l = a.attributeNames ?? {}, r = (m) => l[m] ?? m, c = t.size ?? t.width ?? O.width, n = t.size ?? t.height ?? O.height, o = t.aliases?.filter((m) => typeof m == "string" && m.trim() !== "").map((m) => `lucide-${m}`) ?? [], h = [...t.name ? [`lucide-${t.name}`] : [], ...o], d = a.className?.split(" ").filter(Boolean) ?? [], x = a.includeDefaultClasses === !1 ? de(...d) : de("lucide", ...h, ...d), g = a.absoluteStrokeWidth ? Number(a.strokeWidth ?? O["stroke-width"]) * Number(t.size ?? t.width ?? O.width) / Number(a.size ?? a.width ?? O.width) : a.strokeWidth ?? O["stroke-width"];
  return [
    "svg",
    {
      ...Object.entries(O).reduce((m, [j, v]) => (m[r(j)] = v, m), {}),
      ..."color" in a && a.color && {
        [r("stroke")]: a.color
      },
      ..."size" in a && re(a.size) && {
        [r("width")]: a.size,
        [r("height")]: a.size
      },
      ..."width" in a && re(a.width) && {
        [r("width")]: a.width
      },
      ..."height" in a && re(a.height) && {
        [r("height")]: a.height
      },
      [r("stroke-width")]: g,
      ...x && {
        [r("class")]: x
      },
      [r("viewBox")]: `0 0 ${c} ${n}`,
      ...a.hasA11yProp === !1 ? {
        [r("aria-hidden")]: "true"
      } : {},
      ..."attributes" in a && a.attributes
    },
    t.node.map((m) => {
      const [j, v, u] = m, y = a.nonScalingStroke ? { [r("vector-effect")]: "non-scaling-stroke", ...v } : v;
      return u ? [j, y, u] : [j, y];
    })
  ];
}
function Bs(t, a = {}) {
  return zs(t, {
    ...a,
    attributeNames: {
      ...a.attributeNames,
      class: "className",
      "stroke-width": "strokeWidth",
      "stroke-linecap": "strokeLinecap",
      "stroke-linejoin": "strokeLinejoin",
      "vector-effect": "vectorEffect"
    }
  });
}
const Ls = (t) => {
  for (const a in t)
    if (a.startsWith("aria-") || a === "role" || a === "title")
      return !0;
  return !1;
}, Ms = k.createContext({}), Is = () => k.useContext(Ms), As = k.forwardRef(
  ({
    color: t,
    size: a,
    width: l,
    height: r,
    strokeWidth: c,
    absoluteStrokeWidth: n,
    nonScalingStroke: o,
    className: h = "",
    children: d,
    iconNode: x = [],
    icon: g = {
      node: x,
      aliases: [],
      size: 24
    },
    ...i
  }, m) => {
    const {
      size: j = 24,
      strokeWidth: v = 2,
      absoluteStrokeWidth: u = !1,
      nonScalingStroke: y = !1,
      color: $ = "currentColor",
      className: b = ""
    } = Is() ?? {}, z = !!d || Ls(i), [p, N, w = []] = Bs(g, {
      color: t ?? $,
      width: l ?? a ?? j,
      height: r ?? a ?? j,
      strokeWidth: c ?? v,
      absoluteStrokeWidth: n ?? u,
      nonScalingStroke: o ?? y,
      className: de(b, h),
      hasA11yProp: z,
      attributes: i
    });
    return k.createElement(
      p,
      {
        ref: m,
        ...N
      },
      [
        ...w.map(([_, M]) => k.createElement(_, M)),
        ...Array.isArray(d) ? d : [d]
      ]
    );
  }
);
function D(t, a = [], l = []) {
  const r = typeof t == "string" ? _s(t, a, l) : t, c = k.forwardRef(
    ({ className: n, ...o }, h) => k.createElement(As, {
      ref: h,
      icon: r,
      className: n,
      ...o
    })
  );
  return r.name && (c.displayName = Ts(r.name)), c;
}
const De = {
  name: "arrow-down",
  size: 24,
  node: [
    ["path", { d: "M12 5v14", key: "s699le" }],
    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
  ]
};
De.node;
const K = D(De);
const Te = {
  name: "arrow-left",
  size: 24,
  node: [
    ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
    ["path", { d: "M19 12H5", key: "x3x0zl" }]
  ]
};
Te.node;
const J = D(Te);
const ze = {
  name: "arrow-up",
  size: 24,
  node: [
    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
    ["path", { d: "M12 19V5", key: "x0mq9r" }]
  ]
};
ze.node;
const Y = D(ze);
const Be = {
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
Be.node;
const Es = D(Be);
const Le = {
  name: "check",
  size: 24,
  node: [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]
};
Le.node;
const ge = D(Le);
const Me = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
Me.node;
const Ie = D(Me);
const Ae = {
  name: "chevron-left",
  size: 24,
  node: [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]]
};
Ae.node;
const ue = D(Ae);
const Ee = {
  name: "chevron-right",
  size: 24,
  node: [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]
};
Ee.node;
const le = D(Ee);
const Fe = {
  name: "copy",
  size: 24,
  node: [
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
  ]
};
Fe.node;
const Fs = D(Fe);
const He = {
  name: "download",
  size: 24,
  node: [
    ["path", { d: "M12 15V3", key: "m9g1x1" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
  ]
};
He.node;
const Re = D(He);
const Ve = {
  name: "external-link",
  size: 24,
  node: [
    ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
    ["path", { d: "M10 14 21 3", key: "gplh6r" }],
    ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
  ]
};
Ve.node;
const ne = D(Ve);
const Oe = {
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
Oe.node;
const Hs = D(Oe);
const Pe = {
  name: "file-text",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
        key: "1oefj6"
      }
    ],
    ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
    ["path", { d: "M10 9H8", key: "b1mrlr" }],
    ["path", { d: "M16 13H8", key: "t4e002" }],
    ["path", { d: "M16 17H8", key: "z1uh3a" }]
  ]
};
Pe.node;
const Rs = D(Pe);
const Ue = {
  name: "layout-list",
  size: 24,
  node: [
    ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
    ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }],
    ["path", { d: "M14 4h7", key: "3xa0d5" }],
    ["path", { d: "M14 9h7", key: "1icrd9" }],
    ["path", { d: "M14 15h7", key: "1mj8o2" }],
    ["path", { d: "M14 20h7", key: "11slyb" }]
  ]
};
Ue.node;
const Vs = D(Ue);
const qe = {
  name: "link-2",
  size: 24,
  node: [
    ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
    ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
    ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
  ]
};
qe.node;
const Os = D(qe);
const We = {
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
We.node;
const Ps = D(We);
const Ge = {
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
Ge.node;
const Us = D(Ge);
const Ke = {
  name: "list",
  size: 24,
  node: [
    ["path", { d: "M3 5h.01", key: "18ugdj" }],
    ["path", { d: "M3 12h.01", key: "nlz23k" }],
    ["path", { d: "M3 19h.01", key: "noohij" }],
    ["path", { d: "M8 5h13", key: "1pao27" }],
    ["path", { d: "M8 12h13", key: "1za7za" }],
    ["path", { d: "M8 19h13", key: "m83p4d" }]
  ]
};
Ke.node;
const qs = D(Ke);
const Je = {
  name: "loader-circle",
  size: 24,
  node: [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  aliases: ["loader-2"]
};
Je.node;
const Z = D(Je);
const Ye = {
  name: "message-square-reply",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
        key: "18887p"
      }
    ],
    ["path", { d: "m10 8-3 3 3 3", key: "fp6dz7" }],
    ["path", { d: "M17 14v-1a2 2 0 0 0-2-2H7", key: "1tkjnz" }]
  ]
};
Ye.node;
const Ws = D(Ye);
const Ze = {
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
Ze.node;
const Xe = D(Ze);
const Qe = {
  name: "plus",
  size: 24,
  node: [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ]
};
Qe.node;
const R = D(Qe);
const es = {
  name: "rotate-ccw",
  size: 24,
  node: [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ]
};
es.node;
const ae = D(es);
const ss = {
  name: "search",
  size: 24,
  node: [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ]
};
ss.node;
const ts = D(ss);
const as = {
  name: "shield-alert",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
        key: "oel41y"
      }
    ],
    ["path", { d: "M12 8v4", key: "1got3b" }],
    ["path", { d: "M12 16h.01", key: "1drbdi" }]
  ]
};
as.node;
const je = D(as);
const ls = {
  name: "tag",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
        key: "vktsd0"
      }
    ],
    ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
  ]
};
ls.node;
const Gs = D(ls);
const ns = {
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
ns.node;
const B = D(ns);
const cs = {
  name: "undo-2",
  size: 24,
  node: [
    ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
    ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
  ]
};
cs.node;
const me = D(cs);
const rs = {
  name: "x",
  size: 24,
  node: [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]
};
rs.node;
const Ks = D(rs), is = globalThis.Sunrice;
if (!is) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const s = is.modules["@sunrice/admin-sdk/ui"];
function U() {
  const [t, a] = k.useState(null), l = /* @__PURE__ */ e.jsx(s.Dialog, { open: t !== null, onOpenChange: (r) => !r && a(null), children: /* @__PURE__ */ e.jsxs(s.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(s.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(s.DialogTitle, { children: "Are you sure?" }),
      /* @__PURE__ */ e.jsx(s.DialogDescription, { children: t?.message })
    ] }),
    /* @__PURE__ */ e.jsxs(s.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", onClick: () => a(null), children: "Cancel" }),
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "destructive", onClick: () => {
        t?.onConfirm(), a(null);
      }, children: "Delete" })
    ] })
  ] }) });
  return [(r, c) => a({ message: r, onConfirm: c }), l];
}
const Js = 5;
let Ys = 0;
const os = () => `f${++Ys}`;
function ds(t) {
  return t.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function ms(t, a) {
  const l = new Set(a.map((n) => n.handle)), r = ds(t) || "field";
  let c = r;
  for (let n = 2; l.has(c); n++)
    c = `${r}_${n}`;
  return c;
}
function us(t) {
  return (t ?? []).map(({ fields: a, ...l }) => ({
    ...l,
    key: os(),
    fields: us(a),
    handleTouched: !0
  }));
}
function hs(t, a) {
  return t.map(({ key: l, handleTouched: r, fields: c, ...n }) => ({
    ...n,
    validation: (n.validation ?? []).map((o) => o.trim()).filter((o) => o !== ""),
    ...a(n.type) ? { fields: hs(c, a) } : {}
  }));
}
function Zs(t, a, l) {
  return { key: os(), type: t, label: a, handle: ms(a, l), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function q(t, a, l) {
  const r = a + l;
  if (a < 0 || a >= t.length || r < 0 || r >= t.length) return t;
  const c = t.slice(), [n] = c.splice(a, 1);
  return c.splice(r, 0, n), c;
}
function Xs(t, a, l) {
  if (t.handleTouched) return { ...t, label: a };
  const r = l.filter((c) => c.key !== t.key);
  return { ...t, label: a, handle: ms(a || t.type, r) };
}
function ce(t, a) {
  const l = `${a}.`, r = {};
  for (const [c, n] of Object.entries(t))
    c.startsWith(l) && (r[c.slice(l.length)] = n);
  return r;
}
function I(t, a) {
  const l = t[a];
  return { ...ce(t, a), ...l !== void 0 ? { "": l } : {} };
}
function fe(t, a) {
  return Object.keys(t).some((l) => l === a || l.startsWith(`${a}.`));
}
function Q(t) {
  return t && typeof t == "object" && !Array.isArray(t) ? t : {};
}
function Qs(t, a) {
  if (typeof t != "string" || t === "") return "";
  const l = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(t);
  return l ? a ? `${l[1]}T${l[2] ?? "00:00"}` : l[1] ?? "" : "";
}
function et(t) {
  return t === "" ? null : t;
}
function st() {
  return { _hidden: !1 };
}
function tt(t) {
  return { type: t, hidden: !1, values: {} };
}
function at(t) {
  const a = t.replace(/[\u0000- \u007f]+/g, ""), l = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(a);
  return l ? ["http", "https", "mailto", "tel"].includes(l[1].toLowerCase()) : !a.includes("\\");
}
function xs({ ids: t, search: a, collections: l }) {
  const r = new URLSearchParams();
  for (const c of t ?? []) r.append("ids[]", String(c));
  a && r.set("search", a);
  for (const c of l) r.append("collections[]", c);
  return r.toString();
}
function W(t) {
  return { draft: "Draft", scheduled: "Scheduled", published: "Published" }[t];
}
function G(t, a) {
  if (!t) return "—";
  const l = new Date(t);
  return Number.isNaN(l.getTime()) ? "—" : l.toLocaleString(a, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
function lt(t) {
  const a = (l) => String(l).padStart(2, "0");
  return `${t.getFullYear()}-${a(t.getMonth() + 1)}-${a(t.getDate())}T${a(t.getHours())}:${a(t.getMinutes())}`;
}
function L(t, a) {
  try {
    return new Intl.DisplayNames(a ? [a] : void 0, { type: "language" }).of(t.replace("_", "-")) ?? t;
  } catch {
    return t;
  }
}
async function ve(t) {
  const a = await fetch(`${C("cms/entry-picker")}?${xs(t)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!a.ok) throw new Error(String(a.status));
  return (await a.json()).items;
}
function he({ id: t, value: a, multiple: l, max: r, collections: c, invalid: n, onChange: o }) {
  const h = a === null ? [] : Array.isArray(a) ? a : [a], [d, x] = k.useState({}), [g, i] = k.useState(""), [m, j] = k.useState(null), [v, u] = k.useState(!1), y = l && r !== null && h.length >= r, $ = h.filter((p) => !d[p]).join(",");
  k.useEffect(() => {
    $ !== "" && ve({ ids: $.split(",").map(Number), collections: c }).then((p) => x((N) => ({ ...N, ...Object.fromEntries(p.map((w) => [w.id, w])) }))).catch(() => u(!0));
  }, [$]), k.useEffect(() => {
    if (g.trim() === "") {
      j(null);
      return;
    }
    const p = window.setTimeout(() => {
      ve({ search: g.trim(), collections: c }).then((N) => {
        j(N), u(!1);
      }).catch(() => u(!0));
    }, 250);
    return () => window.clearTimeout(p);
  }, [g]);
  const b = (p) => {
    x((N) => ({ ...N, [p.id]: p })), o(l ? [...h, p.id] : p.id), i("");
  }, z = (p) => o(l ? p : p[0] ?? null);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    h.length > 0 && /* @__PURE__ */ e.jsx("ul", { className: "cms:flex cms:flex-col cms:gap-1", children: h.map((p, N) => {
      const w = d[p];
      return /* @__PURE__ */ e.jsxs("li", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-md cms:border cms:px-3 cms:py-1.5 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate", children: w ? w.title : `Entry #${p}` }),
        w && /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: w.collection }),
        w && /* @__PURE__ */ e.jsx(s.Badge, { variant: w.status === "published" ? "default" : "secondary", children: W(w.status) }),
        l && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(
            s.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-7",
              "aria-label": `Move ${w?.title ?? p} up`,
              disabled: N === 0,
              onClick: () => z(q(h, N, -1)),
              children: /* @__PURE__ */ e.jsx(Y, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            s.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-7",
              "aria-label": `Move ${w?.title ?? p} down`,
              disabled: N === h.length - 1,
              onClick: () => z(q(h, N, 1)),
              children: /* @__PURE__ */ e.jsx(K, {})
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx(
          s.Button,
          {
            type: "button",
            variant: "ghost",
            size: "icon",
            className: "cms:size-7",
            "aria-label": `Remove ${w?.title ?? p}`,
            onClick: () => z(h.filter((_) => _ !== p)),
            children: /* @__PURE__ */ e.jsx(Ks, {})
          }
        )
      ] }, p);
    }) }),
    !y && (l || h.length === 0) && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-md", children: [
      /* @__PURE__ */ e.jsx(ts, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
      /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: t,
          className: "cms:pl-9",
          placeholder: "Search entries by title",
          "aria-invalid": n,
          value: g,
          autoComplete: "off",
          onChange: (p) => i(p.target.value)
        }
      ),
      m !== null && /* @__PURE__ */ e.jsxs("ul", { role: "listbox", "aria-label": "Matching entries", className: "cms:absolute cms:z-10 cms:mt-1 cms:max-h-64 cms:w-full cms:overflow-auto cms:rounded-md cms:border cms:bg-card cms:p-1 cms:shadow-md", children: [
        m.filter((p) => !h.includes(p.id)).length === 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: "No entries match." }),
        m.filter((p) => !h.includes(p.id)).map((p) => /* @__PURE__ */ e.jsx("li", { role: "option", "aria-selected": !1, children: /* @__PURE__ */ e.jsxs(
          "button",
          {
            type: "button",
            className: "cms:flex cms:w-full cms:items-center cms:gap-2 cms:rounded cms:px-2 cms:py-1.5 cms:text-left cms:text-sm cms:hover:bg-accent",
            onClick: () => b(p),
            children: [
              /* @__PURE__ */ e.jsx("span", { className: "cms:flex-1 cms:truncate", children: p.title }),
              /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: p.collection })
            ]
          }
        ) }, p.id))
      ] })
    ] }),
    v && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "Entries could not be loaded. Try again." })
  ] });
}
const nt = k.lazy(() => import("./RichTextEditor-TBXaNZH2.js").then((t) => ({ default: t.RichTextEditor }))), ie = "__none";
function T({ message: t }) {
  return t ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t }) : null;
}
function be(t) {
  const a = t.config?.options;
  return Array.isArray(a) ? a.flatMap((l) => {
    if (typeof l == "string") return [{ value: l, label: l }];
    if (l && typeof l == "object" && typeof l.value == "string") {
      const { value: r, label: c } = l;
      return [{ value: r, label: c || r }];
    }
    return [];
  }) : [];
}
const ct = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function rt(t) {
  if (t.label) return t.label;
  const a = t.handle.replace(/_/g, " ");
  return a.charAt(0).toUpperCase() + a.slice(1);
}
function A({ field: t, value: a, onChange: l, errors: r, id: c, content: n = !1 }) {
  const o = rt(t), h = ct.includes(t.type) || ["select", "terms"].includes(t.type) && t.config?.multiple === !0;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", ...h ? { role: "group", "aria-labelledby": `${c}-label` } : {}, children: [
    t.type === "toggle" ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(s.Switch, { id: c, checked: a === !0, onCheckedChange: (d) => l(d) }),
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: c, children: o })
    ] }) : /* @__PURE__ */ e.jsxs(s.Label, { id: `${c}-label`, htmlFor: h ? void 0 : c, children: [
      o,
      t.required && /* @__PURE__ */ e.jsx("span", { className: "cms:text-destructive", children: " *" })
    ] }),
    /* @__PURE__ */ e.jsx(it, { field: t, value: a, onChange: l, errors: r, id: c, content: n }),
    t.instructions && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t.instructions }),
    /* @__PURE__ */ e.jsx(T, { message: r[""] })
  ] });
}
function it({ field: t, value: a, onChange: l, errors: r, id: c, content: n }) {
  const o = r[""] !== void 0;
  switch (t.type) {
    case "toggle":
      return null;
    case "file":
      return /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Visitors attach a file here when they send a form." });
    case "textarea":
      return /* @__PURE__ */ e.jsx(
        s.Textarea,
        {
          id: c,
          "aria-invalid": o,
          value: typeof a == "string" ? a : "",
          rows: P(t, "rows") ?? 4,
          onChange: (h) => l(h.target.value)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ e.jsx(k.Suspense, { fallback: /* @__PURE__ */ e.jsx(s.Skeleton, { className: "cms:h-48 cms:w-full" }), children: /* @__PURE__ */ e.jsx(nt, { id: c, labelledBy: `${c}-label`, invalid: o, value: typeof a == "string" ? a : "", onChange: l }) });
    case "number":
      return /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: c,
          type: "number",
          className: "cms:max-w-48",
          "aria-invalid": o,
          value: typeof a == "number" ? String(a) : typeof a == "string" ? a : "",
          min: P(t, "min"),
          max: P(t, "max"),
          step: P(t, "step") ?? "any",
          onChange: (h) => l(h.target.value === "" ? null : Number(h.target.value))
        }
      );
    case "date": {
      const h = t.config?.time === !0;
      return /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: c,
          type: h ? "datetime-local" : "date",
          className: "cms:max-w-64",
          "aria-invalid": o,
          value: Qs(a, h),
          onChange: (d) => l(et(d.target.value))
        }
      );
    }
    case "select":
      return t.config?.multiple === !0 ? /* @__PURE__ */ e.jsx(ye, { options: be(t), value: Array.isArray(a) ? a.map(String) : [], onChange: l }) : /* @__PURE__ */ e.jsx(Ne, { options: be(t), value: typeof a == "string" ? a : null, onChange: l, id: c, required: t.required === !0 });
    case "terms": {
      const h = t.terms ?? [];
      if (t.config?.multiple === !0) {
        const d = Array.isArray(a) ? a.map(String) : [];
        return /* @__PURE__ */ e.jsx(ye, { options: h, value: d, onChange: (x) => l(x.map(Number)) });
      }
      return /* @__PURE__ */ e.jsx(
        Ne,
        {
          options: h,
          id: c,
          required: t.required === !0,
          value: a == null ? null : String(a),
          onChange: (d) => l(d === null ? null : Number(d))
        }
      );
    }
    case "entries":
      return /* @__PURE__ */ e.jsx(
        he,
        {
          id: c,
          invalid: o,
          multiple: t.config?.multiple === !0,
          max: P(t, "max") ?? null,
          collections: t.collections ?? [],
          onChange: l,
          value: typeof a == "number" || Array.isArray(a) && a.every((h) => typeof h == "number") ? a : null
        }
      );
    case "link":
      return /* @__PURE__ */ e.jsx(dt, { value: Q(a), onChange: l, errors: r, id: c });
    case "media":
      return /* @__PURE__ */ e.jsx(
        s.MediaPickerInput,
        {
          id: c,
          invalid: o,
          disabled: !1,
          multiple: t.config?.multiple === !0,
          max: P(t, "max") ?? null,
          types: Array.isArray(t.config?.types) ? t.config.types : [],
          value: typeof a == "number" || Array.isArray(a) && a.every((h) => typeof h == "number") ? a : null,
          onChange: l
        }
      );
    case "group":
      return /* @__PURE__ */ e.jsx(se, { fields: t.fields ?? [], value: Q(a), onChange: l, errors: r, id: c, content: n });
    case "repeater":
      return /* @__PURE__ */ e.jsx(ut, { field: t, value: Array.isArray(a) ? a : [], onChange: l, errors: r, id: c, content: n });
    case "flexible":
      return /* @__PURE__ */ e.jsx(ht, { field: t, value: Array.isArray(a) ? a : [], onChange: l, errors: r, id: c });
    default:
      return /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: c,
          "aria-invalid": o,
          value: typeof a == "string" ? a : "",
          placeholder: ot(t, "placeholder"),
          maxLength: P(t, "max"),
          onChange: (h) => l(h.target.value)
        }
      );
  }
}
function P(t, a) {
  const l = t.config?.[a];
  return typeof l == "number" ? l : void 0;
}
function ot(t, a) {
  const l = t.config?.[a];
  return typeof l == "string" ? l : void 0;
}
function se({ fields: t, value: a, onChange: l, errors: r, id: c, content: n }) {
  return /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-4 cms:rounded-lg cms:border cms:p-4", children: t.map((o) => /* @__PURE__ */ e.jsx(
    A,
    {
      id: `${c}-${o.handle}`,
      field: o,
      value: a[o.handle],
      content: n,
      errors: I(r, o.handle),
      onChange: (h) => l({ ...a, [o.handle]: h })
    },
    o.handle
  )) });
}
function Ne({ options: t, value: a, onChange: l, id: r, required: c }) {
  return /* @__PURE__ */ e.jsxs(s.Select, { value: a ?? ie, onValueChange: (n) => l(n === ie ? null : n), children: [
    /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: r, className: "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
    /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
      !c && /* @__PURE__ */ e.jsx(s.SelectItem, { value: ie, children: "None" }),
      t.map((n) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: n.value, children: n.label }, n.value))
    ] })
  ] });
}
function ye({ options: t, value: a, onChange: l }) {
  return t.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Nothing to choose from yet." }) : /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2", children: t.map((r) => /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
    /* @__PURE__ */ e.jsx(
      s.Checkbox,
      {
        checked: a.includes(r.value),
        onCheckedChange: (c) => l(c ? t.map((n) => n.value).filter((n) => n === r.value || a.includes(n)) : a.filter((n) => n !== r.value))
      }
    ),
    r.label
  ] }, r.value)) });
}
function dt({ value: t, onChange: a, errors: l, id: r }) {
  const c = (n, o) => {
    const h = { ...t, [n]: o };
    a(h.url === "" || h.url === void 0 ? null : h);
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-2 cms:md:grid-cols-[2fr_1fr_auto] cms:md:items-center", children: [
    /* @__PURE__ */ e.jsx(
      s.Input,
      {
        id: r,
        "aria-label": "Address",
        placeholder: "https://… or /about",
        value: typeof t.url == "string" ? t.url : "",
        onChange: (n) => c("url", n.target.value),
        "aria-invalid": l.url !== void 0
      }
    ),
    /* @__PURE__ */ e.jsx(
      s.Input,
      {
        "aria-label": "Link text",
        placeholder: "Link text",
        value: typeof t.label == "string" ? t.label : "",
        onChange: (n) => c("label", n.target.value)
      }
    ),
    /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
      /* @__PURE__ */ e.jsx(s.Checkbox, { checked: t.new_tab === !0, onCheckedChange: (n) => c("new_tab", n) }),
      "New tab"
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ e.jsx(T, { message: l.url ?? l.label }) })
  ] });
}
function mt(t, a) {
  return !a && (t.fields ?? []).every((l) => l.type === "text");
}
function ut({ field: t, value: a, onChange: l, errors: r, id: c, content: n = !1 }) {
  const o = t.fields ?? [], h = a.map(Q), d = (i, m) => l(h.map((j, v) => v === i ? m : j)), x = (t.label || "row").toLowerCase().replace(/s$/, ""), g = x.charAt(0).toUpperCase() + x.slice(1);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    h.map((i, m) => mt(t, n) ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
      o.map((j) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            "aria-label": j.label || j.handle,
            placeholder: j.label || j.handle,
            value: typeof i[j.handle] == "string" ? i[j.handle] : "",
            onChange: (v) => d(m, { ...i, [j.handle]: v.target.value })
          }
        ),
        /* @__PURE__ */ e.jsx(T, { message: r[`${m}.${j.handle}`] })
      ] }, j.handle)),
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": `Remove ${x} ${m + 1}`, onClick: () => l(h.filter((j, v) => v !== m)), children: /* @__PURE__ */ e.jsx(B, {}) })
    ] }, m) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(
        ps,
        {
          label: `${g} ${m + 1}`,
          index: m,
          count: h.length,
          onMove: (j) => l(q(h, m, j)),
          onRemove: () => l(h.filter((j, v) => v !== m)),
          hidden: n ? i._hidden === !0 : void 0,
          onHidden: (j) => d(m, { ...i, _hidden: j })
        }
      ),
      /* @__PURE__ */ e.jsx(se, { fields: o, value: i, onChange: (j) => d(m, j), errors: I(r, String(m)), id: `${c}-${m}`, content: n })
    ] }, typeof i._id == "string" ? i._id : m)),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", size: "sm", onClick: () => l([...h, n ? st() : {}]), children: [
      /* @__PURE__ */ e.jsx(R, {}),
      " Add ",
      x
    ] }) })
  ] });
}
function ht({ field: t, value: a, onChange: l, errors: r, id: c }) {
  const n = t.blocks ?? [], o = a.map(Q), h = (d, x) => l(o.map((g, i) => i === d ? x : g));
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    o.map((d, x) => {
      const g = n.find((i) => i.type === d.type);
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(
          ps,
          {
            label: g?.label ?? String(d.type),
            badge: !0,
            index: x,
            count: o.length,
            onMove: (i) => l(q(o, x, i)),
            onRemove: () => l(o.filter((i, m) => m !== x)),
            hidden: d.hidden === !0,
            onHidden: (i) => h(x, { ...d, hidden: i })
          }
        ),
        g ? /* @__PURE__ */ e.jsx(
          se,
          {
            fields: g.fields,
            value: Q(d.values),
            onChange: (i) => h(x, { ...d, values: i }),
            errors: I(r, `${x}.values`),
            id: `${c}-${x}`,
            content: !0
          }
        ) : /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: "This kind of block no longer exists. Its values are kept." }),
        /* @__PURE__ */ e.jsx(T, { message: r[`${x}.type`] })
      ] }, typeof d.id == "string" ? d.id : x);
    }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(s.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(s.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", size: "sm", disabled: n.length === 0, children: [
        /* @__PURE__ */ e.jsx(R, {}),
        " Add block"
      ] }) }),
      /* @__PURE__ */ e.jsx(s.DropdownMenuContent, { align: "start", children: n.map((d) => /* @__PURE__ */ e.jsx(s.DropdownMenuItem, { onSelect: () => l([...o, tt(d.type)]), children: d.label }, d.type)) })
    ] }) })
  ] });
}
function ps({ label: t, badge: a = !1, index: l, count: r, onMove: c, onRemove: n, hidden: o, onHidden: h }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    a ? /* @__PURE__ */ e.jsx(s.Badge, { variant: "secondary", children: t }) : /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:font-medium", children: t }),
    o !== void 0 && /* @__PURE__ */ e.jsxs("label", { className: "cms:ml-auto cms:flex cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", children: [
      /* @__PURE__ */ e.jsx(s.Switch, { checked: !o, onCheckedChange: (d) => h(!d), "aria-label": `Show ${t}` }),
      "Show"
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: o === void 0 ? "cms:ml-auto cms:flex" : "cms:flex", children: [
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Move ${t} up`, disabled: l === 0, onClick: () => c(-1), children: /* @__PURE__ */ e.jsx(Y, {}) }),
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Move ${t} down`, disabled: l === r - 1, onClick: () => c(1), children: /* @__PURE__ */ e.jsx(K, {}) }),
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": `Remove ${t}`, onClick: n, children: /* @__PURE__ */ e.jsx(B, {}) })
    ] })
  ] });
}
function gs({ fields: t, onChange: a, types: l, errors: r, depth: c = 1, idPrefix: n = "field" }) {
  const [o, h] = k.useState(() => /* @__PURE__ */ new Set()), d = (i) => h((m) => {
    const j = new Set(m);
    return j.has(i) ? j.delete(i) : j.add(i), j;
  }), x = (i, m) => a(t.map((j, v) => v === i ? m : j)), g = (i) => {
    const m = Zs(i.type, i.label, t);
    a([...t, m]), h((j) => new Set(j).add(m.key));
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    t.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:border-dashed cms:p-4 cms:text-sm cms:text-muted-foreground", children: "No fields yet." }),
    t.map((i, m) => {
      const j = l.find((y) => y.type === i.type), v = o.has(i.key) || fe(r, String(m)), u = `${n}-${i.key}`;
      return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${fe(r, String(m)) ? "cms:border-destructive" : ""}`, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:p-2", children: [
          /* @__PURE__ */ e.jsx(
            s.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-expanded": v,
              "aria-controls": u,
              "aria-label": `${v ? "Close" : "Open"} ${i.label || i.handle}`,
              onClick: () => d(i.key),
              children: v ? /* @__PURE__ */ e.jsx(Ie, {}) : /* @__PURE__ */ e.jsx(le, {})
            }
          ),
          /* @__PURE__ */ e.jsxs("button", { type: "button", className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:text-left", onClick: () => d(i.key), children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: i.label || i.handle }),
            /* @__PURE__ */ e.jsx("code", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", children: i.handle })
          ] }),
          i.required && /* @__PURE__ */ e.jsx(s.Badge, { variant: "outline", children: "Required" }),
          /* @__PURE__ */ e.jsx(s.Badge, { variant: "secondary", children: j?.label ?? i.type }),
          /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move up", disabled: m === 0, onClick: () => a(q(t, m, -1)), children: /* @__PURE__ */ e.jsx(Y, {}) }),
          /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move down", disabled: m === t.length - 1, onClick: () => a(q(t, m, 1)), children: /* @__PURE__ */ e.jsx(K, {}) }),
          /* @__PURE__ */ e.jsx(
            s.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Remove ${i.label || i.handle}`,
              onClick: () => a(t.filter((y, $) => $ !== m)),
              children: /* @__PURE__ */ e.jsx(B, {})
            }
          )
        ] }),
        v && /* @__PURE__ */ e.jsx(
          xt,
          {
            id: u,
            field: i,
            type: j,
            siblings: t,
            onChange: (y) => x(m, y),
            types: l,
            errors: ce(r, String(m)),
            depth: c
          }
        )
      ] }, i.key);
    }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(s.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(s.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", size: "sm", children: [
        /* @__PURE__ */ e.jsx(R, {}),
        " Add field"
      ] }) }),
      /* @__PURE__ */ e.jsx(s.DropdownMenuContent, { align: "start", children: l.filter((i) => !i.hasChildren || c < Js).map((i) => /* @__PURE__ */ e.jsx(s.DropdownMenuItem, { onSelect: () => g(i), children: i.label }, i.type)) })
    ] }) })
  ] });
}
const H = { default: "__default", yes: "yes", no: "no" };
function xt({ id: t, field: a, type: l, siblings: r, onChange: c, types: n, errors: o, depth: h }) {
  const d = a.config ?? {};
  return /* @__PURE__ */ e.jsxs("div", { id: t, className: "cms:flex cms:flex-col cms:gap-4 cms:border-t cms:p-4", children: [
    !l && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-destructive", children: [
      'The field type "',
      a.type,
      `" isn't registered. Its data is kept; register the type or remove the field.`
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${t}-label`, children: "Label" }),
        /* @__PURE__ */ e.jsx(s.Input, { id: `${t}-label`, value: a.label ?? "", onChange: (x) => c(Xs(a, x.target.value, r)) }),
        /* @__PURE__ */ e.jsx(T, { message: o.label })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${t}-handle`, children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            id: `${t}-handle`,
            className: "cms:font-mono",
            value: a.handle,
            onChange: (x) => c({ ...a, handle: x.target.value, handleTouched: !0 })
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "How templates read it. Renaming it hides values saved under the old one." }),
        /* @__PURE__ */ e.jsx(T, { message: o.handle })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${t}-instructions`, children: "Instructions" }),
      /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: `${t}-instructions`,
          value: a.instructions ?? "",
          placeholder: "Shown under the field to editors",
          onChange: (x) => c({ ...a, instructions: x.target.value || null })
        }
      ),
      /* @__PURE__ */ e.jsx(T, { message: o.instructions })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-6", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(s.Switch, { id: `${t}-required`, checked: a.required === !0, onCheckedChange: (x) => c({ ...a, required: x }) }),
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${t}-required`, children: "Required" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${t}-translatable`, children: "Per language" }),
        /* @__PURE__ */ e.jsxs(
          s.Select,
          {
            value: a.translatable === !0 ? H.yes : a.translatable === !1 ? H.no : H.default,
            onValueChange: (x) => c({ ...a, translatable: x === H.yes ? !0 : x === H.no ? !1 : null }),
            children: [
              /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: `${t}-translatable`, className: "cms:w-48", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
              /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
                /* @__PURE__ */ e.jsx(s.SelectItem, { value: H.default, children: "As the type decides" }),
                /* @__PURE__ */ e.jsx(s.SelectItem, { value: H.yes, children: "Yes, translated" }),
                /* @__PURE__ */ e.jsx(s.SelectItem, { value: H.no, children: "No, shared" })
              ] })
            ]
          }
        )
      ] })
    ] }),
    (l?.settings.length ?? 0) > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: l?.settings.map((x) => /* @__PURE__ */ e.jsx(
      A,
      {
        id: `${t}-config-${x.handle}`,
        field: x,
        value: d[x.handle],
        errors: I(o, `config.${x.handle}`),
        onChange: (g) => c({ ...a, config: { ...d, [x.handle]: g } })
      },
      x.handle
    )) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${t}-validation`, children: "Extra rules" }),
      /* @__PURE__ */ e.jsx(
        s.Textarea,
        {
          id: `${t}-validation`,
          rows: 2,
          className: "cms:font-mono",
          placeholder: `min:3
regex:/^[A-Z]/`,
          value: (a.validation ?? []).join(`
`),
          onChange: (x) => c({ ...a, validation: x.target.value.split(`
`) })
        }
      ),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Laravel rules, one per line." }),
      /* @__PURE__ */ e.jsx(T, { message: o.validation ?? Object.entries(o).find(([x]) => x.startsWith("validation."))?.[1] })
    ] }),
    l?.hasChildren && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(s.Label, { children: "Fields inside" }),
      /* @__PURE__ */ e.jsx(
        gs,
        {
          fields: a.fields,
          onChange: (x) => c({ ...a, fields: x }),
          types: n,
          errors: ce(o, "fields"),
          depth: h + 1,
          idPrefix: t
        }
      ),
      /* @__PURE__ */ e.jsx(T, { message: o.fields })
    ] }),
    /* @__PURE__ */ e.jsx(T, { message: o.type })
  ] });
}
function pt({ kind: t = "blueprint", blueprint: a, fieldTypes: l, usedBy: r = [] }) {
  const c = t === "fieldset" ? "Fieldset" : "Blueprint", n = C(t === "fieldset" ? "cms/fieldsets" : "cms/blueprints"), o = a ? a.title : `New ${c.toLowerCase()}`;
  s.useBreadcrumbs([{ label: `${c}s`, href: n }, { label: o }]);
  const [h, d] = U(), x = f.useForm({ title: a?.title ?? "", handle: a?.handle ?? "" }), [g, i] = k.useState(a !== null), [m, j] = k.useState(() => us(a?.fields)), v = (_) => l.find((M) => M.type === _)?.hasChildren === !0, u = x.errors, [y, $] = k.useState(() => JSON.stringify(m)), b = x.isDirty || JSON.stringify(m) !== y, z = () => {
    x.setDefaults(), $(JSON.stringify(m));
  }, p = () => {
    x.processing || (x.transform((_) => ({
      ...a ? { title: _.title } : _,
      fields: hs(m, v)
    })), a ? x.put(`${n}/${a.id}`, { preserveScroll: !0, onSuccess: z }) : x.post(n, { onSuccess: z }));
  }, N = (_) => {
    _.preventDefault(), p();
  };
  s.useUnsavedChanges(b, p);
  const w = () => a && h(
    `Delete the ${c.toLowerCase()} "${a.title}"? Content keeps its values.`,
    () => f.router.delete(`${n}/${a.id}`, { preserveScroll: !0 })
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: N, className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: o }),
    d,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: n, "aria-label": `Back to ${c.toLowerCase()}s`, children: /* @__PURE__ */ e.jsx(J, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: o })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        a && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", size: "icon", className: "cms:text-destructive", "aria-label": `Delete ${o}`, onClick: w, children: /* @__PURE__ */ e.jsx(B, {}) }),
        /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: x.processing, children: [
          x.processing && /* @__PURE__ */ e.jsx(Z, { className: "cms:animate-spin" }),
          a ? "Save" : `Create ${c.toLowerCase()}`
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(T, { message: u.blueprint ?? u.fieldset }),
    /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsxs(s.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "title", children: "Title" }),
        /* @__PURE__ */ e.jsx(s.Input, { id: "title", value: x.data.title, required: !0, onChange: (_) => {
          x.setData((M) => ({ ...M, title: _.target.value, handle: g ? M.handle : ds(_.target.value) }));
        } }),
        /* @__PURE__ */ e.jsx(T, { message: u.title })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "handle", children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            id: "handle",
            className: "cms:font-mono",
            value: x.data.handle,
            disabled: a !== null,
            required: !0,
            onChange: (_) => {
              i(!0), x.setData("handle", _.target.value);
            }
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: a ? "Set when it was created." : "Lowercase letters, digits and underscores. It can't change later." }),
        /* @__PURE__ */ e.jsx(T, { message: u.handle })
      ] })
    ] }) }),
    r.length > 0 && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      "Used by ",
      r.join(", "),
      ". Changes show there at once."
    ] }),
    /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-3", "aria-labelledby": "fields-heading", children: [
      /* @__PURE__ */ e.jsx("h2", { id: "fields-heading", className: "cms:text-lg cms:font-medium", children: "Fields" }),
      /* @__PURE__ */ e.jsx(gs, { fields: m, onChange: j, types: l, errors: ce(u, "fields") }),
      /* @__PURE__ */ e.jsx(T, { message: u.fields })
    ] })
  ] });
}
function js({ noun: t, base: a, rows: l, intro: r }) {
  const c = `${t}s`;
  s.useBreadcrumbs([{ label: c }]);
  const [n, o] = U();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: c }),
    o,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: c }),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: r })
      ] }),
      /* @__PURE__ */ e.jsx(s.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(f.Link, { href: `${a}/create`, children: [
        /* @__PURE__ */ e.jsx(R, {}),
        " New ",
        t.toLowerCase()
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsx(s.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(s.Table, { children: [
      /* @__PURE__ */ e.jsx(s.TableHeader, { children: /* @__PURE__ */ e.jsxs(s.TableRow, { children: [
        /* @__PURE__ */ e.jsx(s.TableHead, { children: "Title" }),
        /* @__PURE__ */ e.jsx(s.TableHead, { children: "Handle" }),
        /* @__PURE__ */ e.jsx(s.TableHead, { children: "Fields" }),
        l.some((h) => h.usedBy) && /* @__PURE__ */ e.jsx(s.TableHead, { children: "Used by" }),
        /* @__PURE__ */ e.jsx(s.TableHead, { className: "cms:w-12", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: "Actions" }) })
      ] }) }),
      /* @__PURE__ */ e.jsxs(s.TableBody, { children: [
        l.length === 0 && /* @__PURE__ */ e.jsx(s.TableRow, { children: /* @__PURE__ */ e.jsxs(s.TableCell, { colSpan: 5, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: [
          "No ",
          c.toLowerCase(),
          " yet."
        ] }) }),
        l.map((h) => /* @__PURE__ */ e.jsxs(s.TableRow, { children: [
          /* @__PURE__ */ e.jsx(s.TableCell, { children: /* @__PURE__ */ e.jsx(f.Link, { href: `${a}/${h.id}/edit`, className: "cms:font-medium cms:hover:underline", children: h.title }) }),
          /* @__PURE__ */ e.jsx(s.TableCell, { children: /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: h.handle }) }),
          /* @__PURE__ */ e.jsx(s.TableCell, { children: h.fields }),
          h.usedBy && /* @__PURE__ */ e.jsx(s.TableCell, { className: "cms:text-muted-foreground", children: h.usedBy.join(", ") || "—" }),
          /* @__PURE__ */ e.jsx(s.TableCell, { children: /* @__PURE__ */ e.jsx(
            s.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Delete ${h.title}`,
              onClick: () => n(
                `Delete the ${t.toLowerCase()} "${h.title}"? Content keeps its values.`,
                () => f.router.delete(`${a}/${h.id}`, { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(B, {})
            }
          ) })
        ] }, h.id))
      ] })
    ] }) })
  ] });
}
function gt({ blueprints: t }) {
  const a = f.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(T, { message: a.blueprint }),
    /* @__PURE__ */ e.jsx(
      js,
      {
        noun: "Blueprint",
        base: C("cms/blueprints"),
        rows: t,
        intro: "The fields editors fill in, for each kind of content."
      }
    )
  ] });
}
const fs = [
  { handle: "title", type: "text", label: "SEO title", instructions: "For search results and tabs. Empty: the title.", config: { max: 255 } },
  { handle: "description", type: "textarea", label: "Description", instructions: "A sentence or two for search results and shared links.", config: { max: 500 } },
  { handle: "image", type: "media", label: "Share image", instructions: "Shown when the page is shared.", config: { types: ["image"] } },
  { handle: "noindex", type: "toggle", label: "Hide from search engines" },
  { handle: "canonical", type: "text", label: "Canonical address", instructions: "Only when this page copies one elsewhere: that page's full address. Empty: this page.", config: { max: 2e3 } }
];
function jt(t) {
  const { entry: a } = t;
  return /* @__PURE__ */ e.jsx(ft, { ...t }, a ? `${a.id}:${a.locale}:${a.version}:${a.status}:${a.trashed}:${a.publishedAt}` : "new");
}
function ft({ collection: t, fields: a, locales: l = [], shared: r = [], sharedValues: c = {}, entry: n, values: o, revisions: h, undoRestore: d = null, settings: x, can: g }) {
  const i = C(`cms/collections/${t.handle}/entries`), m = n ? C(`cms/entries/${n.id}`) : i, j = n ? o.title : "New entry";
  s.useBreadcrumbs([{ label: t.title, href: i }, { label: j }]);
  const [v, u] = U(), [y, $] = k.useState(!1), b = f.useForm({ ...o, seo: o.seo ?? {}, locale: n?.locale ?? null, version: n?.version ?? null, publish: !1, published_at: null }), z = n ? { locale: n.locale } : {}, p = l.find((S) => S.main)?.code, N = b.errors, w = n !== null && n.status !== "draft" && !n.hasUnpublishedChanges && !b.isDirty, _ = n === null ? g.create : g.update && !n.trashed, M = (S = !1, F = null) => {
    b.transform((V) => ({ ...V, publish: S, published_at: F })), n ? b.put(m, { preserveScroll: !0, onSuccess: () => $(!1) }) : b.post(m);
  }, Cs = () => {
    b.transform((S) => ({ ...S, version: null, publish: !1, published_at: null })), b.put(m, { preserveScroll: !0 });
  }, E = s.useEditLock({
    type: "cms.entry",
    id: n?.id,
    locale: n?.locale,
    enabled: n !== null && _,
    noun: "entry",
    leaveTo: i,
    getUnsaved: () => b.isDirty ? { title: b.data.title, slug: b.data.slug, data: b.data.data, seo: b.data.seo } : null
  }), X = _ && !E.readOnly, ks = async (S) => {
    const F = await E.loadKept(S);
    b.setData((V) => ({ ...V, title: F.title ?? V.title, slug: F.slug ?? V.slug, data: F.data ?? V.data, seo: F.seo ?? V.seo }));
  };
  s.useUnsavedChanges(b.isDirty && !E.takenOver, X ? () => b.processing || M() : void 0);
  const xe = (S = null) => {
    g.update ? M(!0, S) : n && f.router.post(`${m}/publish`, { ...z, published_at: S }, { preserveScroll: !0, onSuccess: () => $(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (S) => {
    S.preventDefault(), M();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: j }),
    u,
    E.dialogs,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: i, "aria-label": `Back to ${t.title}`, children: /* @__PURE__ */ e.jsx(J, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: j }),
        n && /* @__PURE__ */ e.jsx(s.Badge, { variant: n.status === "published" ? "default" : "secondary", children: n.trashed ? "In the trash" : W(n.status) }),
        b.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        n && !n.trashed && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(
          "a",
          {
            href: n.previewUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            title: b.isDirty ? "Shows the saved draft: save first to see your changes." : "Shows the saved draft.",
            children: [
              /* @__PURE__ */ e.jsx(Hs, {}),
              " Preview"
            ]
          }
        ) }),
        n?.url && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: n.url, target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ e.jsx(ne, {}),
          " View"
        ] }) }),
        n?.trashed && g.delete && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", onClick: () => f.router.post(`${m}/restore`, {}, { preserveScroll: !0 }), children: [
          /* @__PURE__ */ e.jsx(ae, {}),
          " Restore"
        ] }),
        n?.trashed && g.delete && /* @__PURE__ */ e.jsxs(
          s.Button,
          {
            type: "button",
            variant: "outline",
            className: "cms:text-destructive",
            onClick: () => v(`Delete "${o.title}" for good, in every language, with its revisions? This can't be undone.`, () => f.router.delete(`${m}/force`)),
            children: [
              /* @__PURE__ */ e.jsx(B, {}),
              " Delete for good"
            ]
          }
        ),
        n && !n.trashed && g.create && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "ghost", title: "Copy every language as a new draft", onClick: () => f.router.post(`${m}/duplicate`), children: [
          /* @__PURE__ */ e.jsx(Fs, {}),
          " Duplicate"
        ] }),
        n && !n.trashed && g.delete && !E.readOnly && /* @__PURE__ */ e.jsx(
          s.Button,
          {
            type: "button",
            variant: "outline",
            size: "icon",
            className: "cms:text-destructive",
            "aria-label": "Move to the trash",
            onClick: () => v(`Move "${o.title}" to the trash? It comes off the site; you can restore it.`, () => f.router.delete(m)),
            children: /* @__PURE__ */ e.jsx(B, {})
          }
        ),
        X && /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", variant: n && g.publish ? "outline" : "default", disabled: b.processing, children: [
          b.processing && /* @__PURE__ */ e.jsx(Z, { className: "cms:animate-spin" }),
          n ? "Save draft" : "Create draft"
        ] }),
        n && !n.trashed && g.publish && !E.readOnly && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex", children: [
          /* @__PURE__ */ e.jsx(s.Button, { type: "button", className: "cms:rounded-r-none", disabled: b.processing || w, onClick: () => xe(), children: n.status === "draft" ? "Publish" : w ? "Published" : "Publish changes" }),
          /* @__PURE__ */ e.jsxs(s.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(s.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(s.Button, { type: "button", size: "icon", className: "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": "More publishing options", children: /* @__PURE__ */ e.jsx(Ie, {}) }) }),
            /* @__PURE__ */ e.jsxs(s.DropdownMenuContent, { align: "end", children: [
              /* @__PURE__ */ e.jsxs(s.DropdownMenuItem, { onSelect: () => $(!0), children: [
                /* @__PURE__ */ e.jsx(Es, {}),
                " Publish on a date…"
              ] }),
              n.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(s.DropdownMenuSeparator, {}),
                /* @__PURE__ */ e.jsx(s.DropdownMenuItem, { onSelect: () => f.router.post(`${m}/unpublish`, z, { preserveScroll: !0 }), children: "Unpublish" })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }),
    n && l.length > 1 && /* @__PURE__ */ e.jsx(
      vt,
      {
        entryUrl: m,
        current: n.locale,
        locales: l,
        canAdd: g.create && !n.trashed,
        canRemove: g.delete && !n.isMain && !n.trashed,
        onRemove: () => v(
          `Remove the ${L(n.locale)} translation of "${o.title}"? Its revisions go with it.`,
          () => f.router.delete(`${m}/translations/${n.locale}`)
        )
      }
    ),
    /* @__PURE__ */ e.jsx(s.ViewingNotice, { by: E.viewingBy }),
    /* @__PURE__ */ e.jsx(s.KeptEditsNotice, { kept: E.kept, disabled: !X, onLoad: (S) => {
      ks(S);
    }, onDiscard: (S) => {
      E.discardKept(S);
    } }),
    N.version && /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: [
      /* @__PURE__ */ e.jsx("span", { children: N.version }),
      /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", size: "sm", onClick: () => f.router.reload(), children: "Load theirs" }),
        /* @__PURE__ */ e.jsx(
          s.Button,
          {
            type: "button",
            variant: "destructive",
            size: "sm",
            disabled: b.processing,
            onClick: () => v("Save your version over theirs? Their changes are replaced (their earlier published versions stay in the revisions).", Cs),
            children: "Save mine anyway"
          }
        )
      ] })
    ] }),
    (N.entry || N.published_at) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: N.entry ?? N.published_at }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_18rem]", children: [
      /* @__PURE__ */ e.jsxs("fieldset", { disabled: !X, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsxs(s.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-[2fr_1fr]", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "title", children: "Title" }),
            /* @__PURE__ */ e.jsx(
              s.Input,
              {
                id: "title",
                value: b.data.title,
                "aria-invalid": N.title !== void 0,
                onChange: (S) => b.setData("title", S.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(T, { message: N.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "slug", children: "Slug" }),
            /* @__PURE__ */ e.jsx(
              s.Input,
              {
                id: "slug",
                className: "cms:font-mono",
                value: b.data.slug,
                placeholder: "Made from the title",
                "aria-invalid": N.slug !== void 0,
                onChange: (S) => b.setData("slug", S.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(T, { message: N.slug })
          ] })
        ] }) }),
        a.length > 0 && /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsx(s.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: a.map((S) => r.includes(S.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
          /* @__PURE__ */ e.jsx(A, { id: `data-${S.handle}`, field: S, content: !0, value: c[S.handle], errors: {}, onChange: () => {
          } }),
          /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
            "Shared by all languages: edit it in ",
            p ? L(p) : "the main language",
            "."
          ] })
        ] }, S.handle) : /* @__PURE__ */ e.jsx(
          A,
          {
            id: `data-${S.handle}`,
            field: S,
            content: !0,
            value: b.data.data[S.handle],
            errors: I(N, `data.${S.handle}`),
            onChange: (F) => b.setData("data", { ...b.data.data, [S.handle]: F })
          },
          S.handle
        )) }) }),
        /* @__PURE__ */ e.jsxs(s.Card, { children: [
          /* @__PURE__ */ e.jsx(s.CardHeader, { children: /* @__PURE__ */ e.jsx(s.CardTitle, { className: "cms:text-base", children: "Search and sharing" }) }),
          /* @__PURE__ */ e.jsx(s.CardContent, { children: /* @__PURE__ */ e.jsx(
            se,
            {
              id: "seo",
              fields: fs,
              value: b.data.seo,
              errors: I(N, "seo"),
              onChange: (S) => b.setData("seo", S)
            }
          ) })
        ] })
      ] }),
      n && /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:flex-col cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs(s.Card, { children: [
          /* @__PURE__ */ e.jsx(s.CardHeader, { children: /* @__PURE__ */ e.jsx(s.CardTitle, { className: "cms:text-base", children: "Status" }) }),
          /* @__PURE__ */ e.jsxs(s.CardContent, { className: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
            /* @__PURE__ */ e.jsxs("p", { children: [
              W(n.status),
              n.status !== "draft" && n.publishedAt ? ` · ${G(n.publishedAt)}` : ""
            ] }),
            n.status !== "draft" && n.hasUnpublishedChanges && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The draft has changes the site doesn't show yet." })
          ] })
        ] }),
        x && /* @__PURE__ */ e.jsx(Nt, { entryUrl: m, collection: t, settings: x, disabled: !X }),
        /* @__PURE__ */ e.jsxs(s.Card, { children: [
          /* @__PURE__ */ e.jsx(s.CardHeader, { children: /* @__PURE__ */ e.jsx(s.CardTitle, { className: "cms:text-base", children: "Revisions" }) }),
          /* @__PURE__ */ e.jsxs(s.CardContent, { className: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
            d !== null && g.update && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", size: "sm", onClick: () => f.router.post(C(`cms/entry-translations/${d}/undo-restore`), {}, { preserveScroll: !0 }), children: [
              /* @__PURE__ */ e.jsx(me, {}),
              " Undo the restore"
            ] }),
            h.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "Each publish keeps one." }),
            h.map((S) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
                /* @__PURE__ */ e.jsx("div", { className: "cms:truncate", children: S.title }),
                /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: G(S.createdAt) })
              ] }),
              g.update && !n.trashed && /* @__PURE__ */ e.jsx(
                s.Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  onClick: () => f.router.post(C(`cms/revisions/${S.id}/restore`), {}, { preserveScroll: !0 }),
                  children: "Restore"
                }
              )
            ] }, S.id))
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(
      bt,
      {
        open: y,
        onClose: () => $(!1),
        processing: b.processing,
        current: n?.publishedAt ?? null,
        onSchedule: (S) => xe(S)
      }
    )
  ] });
}
function vt({ entryUrl: t, current: a, locales: l, canAdd: r, canRemove: c, onRemove: n }) {
  return /* @__PURE__ */ e.jsxs("nav", { "aria-label": "Languages", className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
    l.map((o) => {
      const h = `${L(o.code)}${o.main ? " (main)" : ""}`;
      return o.status === null ? r ? /* @__PURE__ */ e.jsxs(
        s.Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "cms:border-dashed",
          onClick: () => f.router.post(`${t}/translations`, { locale: o.code }),
          children: [
            /* @__PURE__ */ e.jsx(R, {}),
            " ",
            h
          ]
        },
        o.code
      ) : null : /* @__PURE__ */ e.jsxs(
        s.Button,
        {
          type: "button",
          size: "sm",
          variant: o.code === a ? "secondary" : "ghost",
          "aria-current": o.code === a ? "page" : void 0,
          onClick: () => o.code !== a && f.router.get(`${t}/edit`, { locale: o.code }),
          children: [
            h,
            /* @__PURE__ */ e.jsx(s.Badge, { variant: o.status === "published" ? "default" : "outline", className: "cms:ml-1", children: W(o.status) })
          ]
        },
        o.code
      );
    }),
    c && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:ml-auto cms:text-destructive", onClick: n, children: "Remove this language" })
  ] });
}
function bt({ open: t, onClose: a, onSchedule: l, current: r, processing: c }) {
  const [n, o] = k.useState("");
  return k.useEffect(() => {
    t && o(lt(r ? new Date(r) : new Date(Date.now() + 864e5)));
  }, [t, r]), /* @__PURE__ */ e.jsx(s.Dialog, { open: t, onOpenChange: (h) => !h && a(), children: /* @__PURE__ */ e.jsxs(s.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(s.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(s.DialogTitle, { children: "Publish on a date" }),
      /* @__PURE__ */ e.jsx(s.DialogDescription, { children: "The entry goes live then; a date in the past publishes it now with that date." })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "published-at", children: "Date and time" }),
      /* @__PURE__ */ e.jsx(s.Input, { id: "published-at", type: "datetime-local", value: n, onChange: (h) => o(h.target.value) }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "In your time zone." })
    ] }),
    /* @__PURE__ */ e.jsxs(s.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", onClick: a, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", disabled: n === "" || c, onClick: () => l(new Date(n).toISOString()), children: "Publish" })
    ] })
  ] }) });
}
function Nt({ entryUrl: t, collection: a, settings: l, disabled: r }) {
  const c = f.useForm({ parent_id: l.parentId, template: l.template ?? "", comments_closed: l.commentsClosed === !0 }), n = c.errors;
  return /* @__PURE__ */ e.jsxs(s.Card, { children: [
    /* @__PURE__ */ e.jsx(s.CardHeader, { children: /* @__PURE__ */ e.jsx(s.CardTitle, { className: "cms:text-base", children: "Page settings" }) }),
    /* @__PURE__ */ e.jsx(s.CardContent, { children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: r, className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: [
      a.hierarchical && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "parent", children: "Parent" }),
        /* @__PURE__ */ e.jsx(
          he,
          {
            id: "parent",
            multiple: !1,
            max: 1,
            collections: [a.handle],
            invalid: n.parent_id !== void 0,
            value: c.data.parent_id,
            onChange: (o) => c.setData("parent_id", typeof o == "number" ? o : null)
          }
        ),
        /* @__PURE__ */ e.jsx(T, { message: n.parent_id })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "template", children: "Template" }),
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            id: "template",
            className: "cms:font-mono",
            placeholder: "The collection's",
            value: c.data.template,
            onChange: (o) => c.setData("template", o.target.value),
            "aria-invalid": n.template !== void 0
          }
        ),
        /* @__PURE__ */ e.jsx(T, { message: n.template })
      ] }),
      a.comments && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(s.Switch, { id: "comments-open", checked: !c.data.comments_closed, onCheckedChange: (o) => c.setData("comments_closed", !o) }),
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "comments-open", children: "Accept new comments" }),
        /* @__PURE__ */ e.jsx("a", { href: C(`cms/comments?entry=${t.split("/").slice(-1)[0]}`), className: "cms:ml-auto cms:text-muted-foreground cms:underline-offset-4 hover:cms:underline", children: "Comments" })
      ] }),
      c.isDirty && /* @__PURE__ */ e.jsx(
        s.Button,
        {
          type: "button",
          size: "sm",
          disabled: c.processing,
          onClick: () => c.put(`${t}/settings`, { preserveScroll: !0, onSuccess: () => c.setDefaults() }),
          children: "Save settings"
        }
      )
    ] }) })
  ] });
}
function yt({ collection: t, collections: a, entries: l, query: r, can: c }) {
  s.useBreadcrumbs([{ label: "Entries", href: C("cms/entries") }, ...t ? [{ label: t.title }] : []]);
  const [n, o] = k.useState(r.search), h = t ? C(`cms/collections/${t.handle}/entries`) : "", [d, x] = k.useState([]), [g, i] = U();
  k.useEffect(() => x([]), [l]);
  const m = r.trashed ? c?.delete ? [{ action: "restore", label: "Restore" }, { action: "delete", label: "Delete for good", danger: !0 }] : [] : [
    ...c?.publish ? [{ action: "publish", label: "Publish" }, { action: "unpublish", label: "Unpublish" }] : [],
    ...c?.delete ? [{ action: "trash", label: "Move to the trash", danger: !0 }] : []
  ], j = (u, y, $ = !1) => {
    const b = () => f.router.post(`${h}/bulk`, { action: u, ids: d }, { preserveScroll: !0 });
    $ ? g(`${y}: ${d.length} ${d.length === 1 ? "entry" : "entries"}?${u === "delete" ? " This can't be undone." : ""}`, b) : b();
  }, v = (u) => {
    const y = { ...r, ...u };
    f.router.get(
      h,
      { ...y.search ? { search: y.search } : {}, ...y.trashed ? { trashed: 1 } : {} },
      { preserveState: !0, preserveScroll: !0, replace: !0 }
    );
  };
  return k.useEffect(() => {
    if (n === r.search) return;
    const u = window.setTimeout(() => v({ search: n }), 300);
    return () => window.clearTimeout(u);
  }, [n]), !t || !l ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: "Entries" }),
    /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Entries" }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no collections yet. Create one under Structure → Collections, then come back to write its entries." })
  ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: t.title }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: t.title }),
        a.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: t.handle, onValueChange: (u) => f.router.get(C(`cms/collections/${u}/entries`)), children: [
          /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": "Collection", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(s.SelectContent, { children: a.map((u) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: u.handle, children: u.title }, u.handle)) })
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        t.listing && !r.trashed && /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs(f.Link, { href: C(`cms/collections/${t.handle}/listing`), children: [
          /* @__PURE__ */ e.jsx(Vs, {}),
          " Listing page"
        ] }) }),
        l.total > 0 && !r.trashed && /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: `${h}/export`, children: [
          /* @__PURE__ */ e.jsx(Re, {}),
          " Export CSV"
        ] }) }),
        c?.create && !r.trashed && /* @__PURE__ */ e.jsx(s.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(f.Link, { href: `${h}/create`, children: [
          /* @__PURE__ */ e.jsx(R, {}),
          " New entry"
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-sm", children: [
        /* @__PURE__ */ e.jsx(ts, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            className: "cms:pl-9",
            placeholder: "Search titles",
            "aria-label": "Search titles",
            value: n,
            onChange: (u) => o(u.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(s.Button, { variant: r.trashed ? "secondary" : "ghost", size: "sm", onClick: () => v({ trashed: !r.trashed }), children: r.trashed ? "Back to entries" : "Trash" }),
      d.length > 0 && m.length > 0 && /* @__PURE__ */ e.jsxs("div", { role: "toolbar", "aria-label": "Selected entries", className: "cms:ml-auto cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs("span", { className: "cms:text-sm cms:text-muted-foreground", children: [
          d.length,
          " selected"
        ] }),
        m.map((u) => /* @__PURE__ */ e.jsx(s.Button, { size: "sm", variant: u.danger ? "destructive" : "outline", onClick: () => j(u.action, u.label, u.danger), children: u.label }, u.action))
      ] })
    ] }),
    i,
    /* @__PURE__ */ e.jsx(s.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(s.Table, { children: [
      /* @__PURE__ */ e.jsx(s.TableHeader, { children: /* @__PURE__ */ e.jsxs(s.TableRow, { children: [
        m.length > 0 && /* @__PURE__ */ e.jsx(s.TableHead, { className: "cms:w-10", children: /* @__PURE__ */ e.jsx(
          s.Checkbox,
          {
            "aria-label": "Select all on this page",
            checked: l.data.length > 0 && d.length === l.data.length,
            onCheckedChange: (u) => x(u ? l.data.map((y) => y.id) : [])
          }
        ) }),
        /* @__PURE__ */ e.jsx(s.TableHead, { children: "Title" }),
        /* @__PURE__ */ e.jsx(s.TableHead, { children: "Status" }),
        /* @__PURE__ */ e.jsx(s.TableHead, { children: t.dated ? "Date" : "Updated" })
      ] }) }),
      /* @__PURE__ */ e.jsxs(s.TableBody, { children: [
        l.data.length === 0 && /* @__PURE__ */ e.jsx(s.TableRow, { children: /* @__PURE__ */ e.jsx(s.TableCell, { colSpan: m.length > 0 ? 4 : 3, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: r.trashed ? "The trash is empty." : r.search ? "Nothing matches." : "No entries yet." }) }),
        l.data.map((u) => /* @__PURE__ */ e.jsxs(s.TableRow, { "data-state": d.includes(u.id) ? "selected" : void 0, children: [
          m.length > 0 && /* @__PURE__ */ e.jsx(s.TableCell, { children: /* @__PURE__ */ e.jsx(
            s.Checkbox,
            {
              "aria-label": `Select ${u.title}`,
              checked: d.includes(u.id),
              onCheckedChange: (y) => x(y ? [...d, u.id] : d.filter(($) => $ !== u.id))
            }
          ) }),
          /* @__PURE__ */ e.jsxs(s.TableCell, { children: [
            /* @__PURE__ */ e.jsx(f.Link, { href: C(`cms/entries/${u.id}/edit`), className: "cms:font-medium cms:hover:underline", children: u.title }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
              "/",
              u.slug,
              u.parent ? ` · under ${u.parent}` : ""
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(s.TableCell, { children: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-1", children: [
            /* @__PURE__ */ e.jsx(s.Badge, { variant: u.status === "published" ? "default" : "secondary", children: W(u.status) }),
            u.locales.length > 1 && u.locales.filter((y) => !y.main).map((y) => /* @__PURE__ */ e.jsx(
              s.Badge,
              {
                variant: y.status === "published" ? "default" : "outline",
                className: y.status === null ? "cms:opacity-50" : "",
                title: `${y.code}: ${y.status === null ? "not translated" : W(y.status)}`,
                children: y.code.toUpperCase()
              },
              y.code
            ))
          ] }) }),
          /* @__PURE__ */ e.jsx(s.TableCell, { className: "cms:text-muted-foreground", children: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-2", children: [
            G(t.dated ? u.publishedAt : u.updatedAt),
            t.ordered && c?.update && !r.trashed && !r.search && /* @__PURE__ */ e.jsxs("span", { className: "cms:flex", children: [
              /* @__PURE__ */ e.jsx(s.Button, { variant: "ghost", size: "icon", "aria-label": `Move ${u.title} up`, onClick: () => f.router.post(C(`cms/entries/${u.id}/move`), { direction: "up" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(Y, {}) }),
              /* @__PURE__ */ e.jsx(s.Button, { variant: "ghost", size: "icon", "aria-label": `Move ${u.title} down`, onClick: () => f.router.post(C(`cms/entries/${u.id}/move`), { direction: "down" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(K, {}) })
            ] })
          ] }) })
        ] }, u.id))
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
          s.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Previous page",
            disabled: !l.prev_page_url,
            onClick: () => l.prev_page_url && f.router.get(l.prev_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(ue, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          s.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Next page",
            disabled: !l.next_page_url,
            onClick: () => l.next_page_url && f.router.get(l.next_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(le, {})
          }
        )
      ] })
    ] })
  ] });
}
function Ct(t) {
  return /* @__PURE__ */ e.jsx(kt, { ...t }, `${t.locale}:${JSON.stringify(t.values)}`);
}
function kt({ collection: t, fields: a, locale: l, locales: r, shared: c, values: n, can: o }) {
  const h = C(`cms/collections/${t.handle}/listing`), d = C(`cms/collections/${t.handle}/entries`);
  s.useBreadcrumbs([{ label: t.title, href: d }, { label: "Listing page" }]);
  const x = f.useForm({ locale: l, data: n }), g = x.errors, i = r[0], m = o.update, j = () => x.processing || x.put(h, { preserveScroll: !0 });
  return s.useUnsavedChanges(x.isDirty, m ? j : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: (v) => {
    v.preventDefault(), j();
  }, className: "cms:flex cms:max-w-3xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: `${t.title}: listing page` }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: d, "aria-label": `Back to ${t.title}`, children: /* @__PURE__ */ e.jsx(J, {}) }) }),
        /* @__PURE__ */ e.jsxs("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: [
          t.title,
          ": listing page"
        ] }),
        x.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        r.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: l, onValueChange: (v) => f.router.get(h, { locale: v }), children: [
          /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(s.SelectContent, { children: r.map((v, u) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: v, children: [
            L(v),
            u === 0 ? " (main)" : ""
          ] }, v)) })
        ] }),
        t.url && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: t.url, target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ e.jsx(ne, {}),
          " View"
        ] }) }),
        m && /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: x.processing, children: [
          x.processing && /* @__PURE__ */ e.jsx(Z, { className: "cms:animate-spin" }),
          " Save"
        ] })
      ] })
    ] }),
    a.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The listing page has no fields of its own: choose a listing blueprint for the collection under Structure → Collections." }) : /* @__PURE__ */ e.jsx("fieldset", { disabled: !m, className: "cms:flex cms:flex-col cms:gap-4", children: /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsx(s.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: a.map((v) => c.includes(v.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(A, { id: `data-${v.handle}`, field: v, content: !0, value: n[v.handle], errors: {}, onChange: () => {
      } }),
      /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
        "Shared by all languages: edit it in ",
        i ? L(i) : "the main language",
        "."
      ] })
    ] }, v.handle) : /* @__PURE__ */ e.jsx(
      A,
      {
        id: `data-${v.handle}`,
        field: v,
        content: !0,
        value: x.data.data[v.handle],
        errors: I(g, `data.${v.handle}`),
        onChange: (u) => x.setData("data", { ...x.data.data, [v.handle]: u })
      },
      v.handle
    )) }) }) })
  ] });
}
function St({ fieldsets: t }) {
  const a = f.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(T, { message: a.fieldset }),
    /* @__PURE__ */ e.jsx(
      js,
      {
        noun: "Fieldset",
        base: C("cms/fieldsets"),
        rows: t,
        intro: "Fields shared between blueprints, and the kinds of block of flexible fields."
      }
    )
  ] });
}
function wt(t) {
  return /* @__PURE__ */ e.jsx($t, { ...t }, `${t.locale}:${JSON.stringify(t.values)}`);
}
function $t({ set: t, fields: a, locale: l, locales: r, shared: c, values: n, can: o }) {
  const h = C(`cms/globals/${t.handle}`);
  s.useBreadcrumbs([{ label: "Globals", href: C("cms/globals") }, { label: t.title }]);
  const d = f.useForm({ locale: l, data: n }), x = d.errors, g = r[0], i = s.useEditLock({
    type: "cms.global",
    id: t.id,
    locale: l,
    enabled: o.update,
    noun: "global set",
    leaveTo: C("cms/globals"),
    getUnsaved: () => d.isDirty ? { data: d.data.data } : null
  }), m = o.update && !i.readOnly, j = () => d.processing || d.put(h, { preserveScroll: !0 }), v = async (u) => {
    const y = await i.loadKept(u);
    y.data && typeof y.data == "object" && d.setData("data", y.data);
  };
  return s.useUnsavedChanges(d.isDirty && !i.takenOver, m ? j : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: (u) => {
    u.preventDefault(), j();
  }, className: "cms:flex cms:max-w-3xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: t.title }),
    i.dialogs,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: C("cms/globals"), "aria-label": "Back to globals", children: /* @__PURE__ */ e.jsx(J, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: t.title }),
        d.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        r.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: l, onValueChange: (u) => f.router.get(h, { locale: u }), children: [
          /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(s.SelectContent, { children: r.map((u, y) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: u, children: [
            L(u),
            y === 0 ? " (main)" : ""
          ] }, u)) })
        ] }),
        m && /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: d.processing, children: [
          d.processing && /* @__PURE__ */ e.jsx(Z, { className: "cms:animate-spin" }),
          " Save"
        ] })
      ] })
    ] }),
    a.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "This global set has no fields: choose a blueprint for it under Structure → Global sets." }) : /* @__PURE__ */ e.jsxs("fieldset", { disabled: !m, className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(s.ViewingNotice, { by: i.viewingBy }),
      /* @__PURE__ */ e.jsx(s.KeptEditsNotice, { kept: i.kept, disabled: !m, onLoad: (u) => {
        v(u);
      }, onDiscard: (u) => {
        i.discardKept(u);
      } }),
      /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsx(s.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: a.map((u) => c.includes(u.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(A, { id: `data-${u.handle}`, field: u, content: !0, value: n[u.handle], errors: {}, onChange: () => {
        } }),
        /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
          "Shared by all languages: edit it in ",
          g ? L(g) : "the main language",
          "."
        ] })
      ] }, u.handle) : /* @__PURE__ */ e.jsx(
        A,
        {
          id: `data-${u.handle}`,
          field: u,
          content: !0,
          value: d.data.data[u.handle],
          errors: I(x, `data.${u.handle}`),
          onChange: (y) => d.setData("data", { ...d.data.data, [u.handle]: y })
        },
        u.handle
      )) }) })
    ] })
  ] });
}
function _t({ sets: t }) {
  return s.useBreadcrumbs([{ label: "Globals" }]), /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: "Globals" }),
    /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Globals" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Values the whole site uses, like contact details and footer text." })
    ] }),
    t.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no global sets yet. Create one under Structure → Global sets." }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:sm:grid-cols-2 cms:lg:grid-cols-3", children: t.map((a) => /* @__PURE__ */ e.jsx(f.Link, { href: C(`cms/globals/${a.handle}`), className: "cms:rounded-xl cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none", children: /* @__PURE__ */ e.jsxs(s.Card, { className: "cms:h-full cms:transition-colors cms:hover:bg-accent", children: [
      /* @__PURE__ */ e.jsxs(s.CardHeader, { children: [
        /* @__PURE__ */ e.jsx(s.CardTitle, { className: "cms:text-base", children: a.title }),
        /* @__PURE__ */ e.jsx(s.CardDescription, { children: a.blueprint ? /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: a.handle }) : "No blueprint yet: choose one under Structure → Global sets." })
      ] }),
      /* @__PURE__ */ e.jsx(s.CardContent, {})
    ] }) }, a.handle)) })
  ] });
}
let vs = 0;
function bs(t, a = 0) {
  return t.flatMap(({ children: l, ...r }) => [{ ...r, key: `m${++vs}`, depth: a }, ...bs(l ?? [], a + 1)]);
}
function Dt(t) {
  const a = [], l = [{ depth: -1, children: a }];
  for (const { key: r, depth: c, ...n } of t) {
    for (; l.length > 1 && l[l.length - 1].depth >= c; ) l.pop();
    const o = { ...n, children: [] };
    l[l.length - 1].children.push(o), l.push({ depth: c, children: o.children });
  }
  return a;
}
function ee(t, a) {
  const l = t[a]?.depth ?? 0;
  let r = a + 1;
  for (; r < t.length && t[r].depth > l; ) r++;
  return r;
}
function Ns(t, a, l) {
  const r = ee(t, a);
  return t.map((c, n) => n >= a && n < r ? { ...c, depth: c.depth + l } : c);
}
function Tt(t, a, l) {
  const r = t[a], c = t[a - 1];
  return !r || !c || r.depth > c.depth || Math.max(...t.slice(a, ee(t, a)).map((o) => o.depth)) + 1 > l - 1 ? t : Ns(t, a, 1);
}
function zt(t, a) {
  return (t[a]?.depth ?? 0) === 0 ? t : Ns(t, a, -1);
}
function Ce(t, a, l) {
  const r = t[a];
  if (!r) return t;
  const c = ee(t, a), n = t.slice(a, c);
  if (l === -1) {
    let d = a - 1;
    for (; d >= 0 && t[d].depth > r.depth; ) d--;
    return d < 0 || t[d].depth !== r.depth ? t : [...t.slice(0, d), ...n, ...t.slice(d, a), ...t.slice(c)];
  }
  const o = t[c];
  if (!o || o.depth !== r.depth) return t;
  const h = ee(t, c);
  return [...t.slice(0, a), ...t.slice(c, h), ...n, ...t.slice(h)];
}
function Bt(t, a) {
  return [...t.slice(0, a), ...t.slice(ee(t, a))];
}
function te(t) {
  return { key: `m${++vs}`, depth: 0, entry_id: null, term_id: null, collection_id: null, target: null, url: null, labels: {}, new_tab: !1, ...t };
}
function Lt({ menu: t, items: a, locales: l, limits: r, terms: c, listings: n, can: o }) {
  const h = C(`cms/menus/${t.handle}`);
  s.useBreadcrumbs([{ label: "Menus", href: C("cms/menus") }, { label: t.title }]);
  const [d, x] = k.useState(() => bs(a)), [g, i] = k.useState(null), m = f.useForm({ items: a }), j = m.errors, [v, u] = k.useState(!1), y = l[0] ?? "en", $ = (N) => {
    x(N), u(!0);
  }, b = (N, w) => $(d.map((_, M) => M === N ? { ..._, ...w } : _)), z = () => {
    m.processing || (m.transform(() => ({ items: Dt(d).map(ys) })), m.put(h, { preserveScroll: !0, onSuccess: () => u(!1) }));
  }, p = (N) => {
    N.preventDefault(), z();
  };
  return s.useUnsavedChanges(v, o.update ? z : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: p, className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: t.title }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: C("cms/menus"), "aria-label": "Back to menus", children: /* @__PURE__ */ e.jsx(J, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: t.title }),
        v && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      o.update && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", disabled: d.length >= r.items, onClick: () => i("entry"), children: [
          /* @__PURE__ */ e.jsx(R, {}),
          " Entry"
        ] }),
        c.length > 0 && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", disabled: d.length >= r.items, onClick: () => i("term"), children: [
          /* @__PURE__ */ e.jsx(Gs, {}),
          " Term"
        ] }),
        n.length > 0 && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", disabled: d.length >= r.items, onClick: () => i("listing"), children: [
          /* @__PURE__ */ e.jsx(qs, {}),
          " Listing"
        ] }),
        /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", disabled: d.length >= r.items, onClick: () => i("url"), children: [
          /* @__PURE__ */ e.jsx(Os, {}),
          " Link"
        ] }),
        /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: m.processing, children: [
          m.processing && /* @__PURE__ */ e.jsx(Z, { className: "cms:animate-spin" }),
          " Save"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(T, { message: j.items }),
    Object.keys(j).some((N) => N.startsWith("items.")) && /* @__PURE__ */ e.jsxs("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: [
      "Some links need fixing: ",
      Object.values(j).filter(Boolean)[0]
    ] }),
    /* @__PURE__ */ e.jsx(s.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs("ul", { className: "cms:divide-y", children: [
      d.length === 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-6 cms:text-center cms:text-muted-foreground", children: "No links yet. Add an entry or a link." }),
      d.map((N, w) => /* @__PURE__ */ e.jsxs("li", { className: "cms:flex cms:flex-col cms:gap-2 cms:p-3", style: { paddingLeft: `${0.75 + N.depth * 2}rem` }, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(
            s.Input,
            {
              "aria-label": `Label (${L(y)})`,
              className: "cms:max-w-xs",
              disabled: !o.update,
              placeholder: N.target?.title ?? "Label",
              value: N.labels[y] ?? "",
              onChange: (_) => b(w, { labels: { ...N.labels, [y]: _.target.value } })
            }
          ),
          /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:text-sm cms:text-muted-foreground", children: N.url !== null ? N.url : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            N.target ? `${N.target.kind}: ${N.target.title}` : "Gone",
            " ",
            (!N.target || !N.target.live) && /* @__PURE__ */ e.jsx(s.Badge, { variant: "outline", children: "Not on the site" })
          ] }) }),
          o.update && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center", children: [
            /* @__PURE__ */ e.jsxs("label", { className: "cms:mr-2 cms:flex cms:items-center cms:gap-1.5 cms:text-sm", children: [
              /* @__PURE__ */ e.jsx(s.Checkbox, { checked: N.new_tab, onCheckedChange: (_) => b(w, { new_tab: _ }) }),
              " New tab"
            ] }),
            /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Out a level", disabled: N.depth === 0, onClick: () => $(zt(d, w)), children: /* @__PURE__ */ e.jsx(Ps, {}) }),
            /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "In a level", onClick: () => $(Tt(d, w, r.depth)), children: /* @__PURE__ */ e.jsx(Us, {}) }),
            /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move up", onClick: () => $(Ce(d, w, -1)), children: /* @__PURE__ */ e.jsx(Y, {}) }),
            /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move down", onClick: () => $(Ce(d, w, 1)), children: /* @__PURE__ */ e.jsx(K, {}) }),
            /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": "Remove, with what's under it", onClick: () => $(Bt(d, w)), children: /* @__PURE__ */ e.jsx(B, {}) })
          ] })
        ] }),
        l.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: l.slice(1).map((_) => /* @__PURE__ */ e.jsx(
          s.Input,
          {
            "aria-label": `Label (${L(_)})`,
            className: "cms:max-w-xs",
            disabled: !o.update,
            placeholder: `${L(_)}: as ${L(y)}`,
            value: N.labels[_] ?? "",
            onChange: (M) => b(w, { labels: { ...N.labels, [_]: M.target.value } })
          },
          _
        )) })
      ] }, N.key))
    ] }) }),
    /* @__PURE__ */ e.jsx(At, { kind: g, terms: c, listings: n, onClose: () => i(null), onAdd: (N) => {
      $([...d, N]), i(null);
    }, main: y })
  ] });
}
function ys({ target: t, children: a, ...l }) {
  return { ...l, children: a.map(ys) };
}
const Mt = { entry: "Link to an entry", term: "Link to a term's page", listing: "Link to a listing page", url: "Link to an address" }, It = {
  entry: "It follows the entry: its title (unless you give a label) and its address in each language. It shows only while the entry is on the site.",
  term: "The page listing the term's entries, in each language. Its title is the label unless you give one.",
  listing: "The collection's listing page, in each language. The collection's title is the label unless you give one.",
  url: "A web address, a path on this site (/contact), mailto: or tel:."
};
function At({ kind: t, terms: a, listings: l, onClose: r, onAdd: c, main: n }) {
  const [o, h] = k.useState(null), [d, x] = k.useState(""), [g, i] = k.useState(""), [m, j] = k.useState("");
  k.useEffect(() => {
    h(null), x(""), i(""), j("");
  }, [t]);
  const v = g.trim() === "" || at(g.trim()), u = m.trim() ? { [n]: m.trim() } : {}, y = async () => {
    if (t === "entry" && o !== null) {
      const b = await fetch(`${C("cms/entry-picker")}?${xs({ ids: [o], collections: [] })}`, { headers: { Accept: "application/json" }, credentials: "same-origin" }), z = b.ok ? (await b.json()).items[0] : void 0;
      c(te({ entry_id: o, target: z ? { title: z.title, kind: z.collection, live: z.status === "published" } : null, labels: u }));
    } else if (t === "term" && d !== "") {
      const b = a.find((z) => String(z.id) === d);
      c(te({ term_id: Number(d), target: b ? { title: b.title, kind: b.taxonomy, live: !0 } : null, labels: u }));
    } else if (t === "listing" && d !== "") {
      const b = l.find((z) => String(z.id) === d);
      c(te({ collection_id: Number(d), target: b ? { title: b.title, kind: "Listing page", live: !0 } : null, labels: u }));
    } else t === "url" && g.trim() !== "" && v && m.trim() !== "" && c(te({ url: g.trim(), labels: u }));
  }, $ = t === "entry" ? o !== null : t === "url" ? g.trim() !== "" && v && m.trim() !== "" : d !== "";
  return /* @__PURE__ */ e.jsx(s.Dialog, { open: t !== null, onOpenChange: (b) => !b && r(), children: /* @__PURE__ */ e.jsxs(s.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(s.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(s.DialogTitle, { children: t ? Mt[t] : "" }),
      /* @__PURE__ */ e.jsx(s.DialogDescription, { children: t ? It[t] : "" })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
      t === "entry" && /* @__PURE__ */ e.jsx(
        he,
        {
          id: "menu-entry",
          value: o,
          multiple: !1,
          max: null,
          collections: [],
          invalid: !1,
          onChange: (b) => h(typeof b == "number" ? b : null)
        }
      ),
      (t === "term" || t === "listing") && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "menu-target", children: t === "term" ? "Term" : "Collection" }),
        /* @__PURE__ */ e.jsxs(s.Select, { value: d, onValueChange: x, children: [
          /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: "menu-target", children: /* @__PURE__ */ e.jsx(s.SelectValue, { placeholder: "Choose…" }) }),
          /* @__PURE__ */ e.jsx(s.SelectContent, { children: t === "term" ? a.map((b) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: String(b.id), children: [
            b.taxonomy,
            ": ",
            b.title
          ] }, b.id)) : l.map((b) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: String(b.id), children: b.title }, b.id)) })
        ] })
      ] }),
      t === "url" && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "menu-url", children: "Address" }),
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            id: "menu-url",
            value: g,
            placeholder: "https://… or /contact",
            "aria-invalid": !v,
            onChange: (b) => i(b.target.value)
          }
        ),
        !v && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "This address could run code; use https://, a path, mailto: or tel:." })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(s.Label, { htmlFor: "menu-label", children: [
          "Label",
          t === "url" ? "" : " (optional)"
        ] }),
        /* @__PURE__ */ e.jsx(s.Input, { id: "menu-label", value: m, onChange: (b) => j(b.target.value) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(s.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", onClick: r, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", onClick: () => {
        y();
      }, disabled: !$, children: "Add" })
    ] })
  ] }) });
}
function Et({ menus: t }) {
  return s.useBreadcrumbs([{ label: "Menus" }]), /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: "Menus" }),
    /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Menus" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Navigation for the site: the main menu, the footer…" })
    ] }),
    t.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no menus yet. Create one under Structure → Menus." }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:sm:grid-cols-2 cms:lg:grid-cols-3", children: t.map((a) => /* @__PURE__ */ e.jsx(f.Link, { href: C(`cms/menus/${a.handle}`), className: "cms:rounded-xl cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none", children: /* @__PURE__ */ e.jsxs(s.Card, { className: "cms:h-full cms:transition-colors cms:hover:bg-accent", children: [
      /* @__PURE__ */ e.jsxs(s.CardHeader, { children: [
        /* @__PURE__ */ e.jsx(s.CardTitle, { className: "cms:text-base", children: a.title }),
        /* @__PURE__ */ e.jsx(s.CardDescription, { children: /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: a.handle }) })
      ] }),
      /* @__PURE__ */ e.jsx(s.CardContent, {})
    ] }) }, a.handle)) })
  ] });
}
const Ft = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "spam", label: "Spam" },
  { value: "trash", label: "Trash" }
], Ht = { pending: "Pending", approved: "Approved", spam: "Spam" };
function Rt({ tab: t, counts: a, filters: l, collections: r, comments: c, can: n, errors: o = {} }) {
  s.useBreadcrumbs([{ label: "Comments", href: C("cms/comments") }]);
  const [h, d] = k.useState(l.search), [x, g] = k.useState([]), [i, m] = k.useState(null), [j, v] = U(), u = (p) => {
    const N = { status: t, search: l.search, collection: l.collection, ...p };
    f.router.get(C("cms/comments"), {
      ...N.status !== "all" ? { status: N.status } : {},
      ...N.search ? { search: N.search } : {},
      ...N.collection ? { collection: N.collection } : {},
      ...l.entry ? { entry: l.entry } : {}
    }, { preserveState: !0, replace: !0, onSuccess: () => g([]) });
  };
  k.useEffect(() => {
    if (h === l.search) return;
    const p = window.setTimeout(() => u({ search: h }), 300);
    return () => window.clearTimeout(p);
  }, [h]);
  const y = (p, N = {}) => f.router.post(C(p), N, { preserveScroll: !0, onSuccess: () => g([]) }), $ = (p, N) => y(`cms/comments/${p.id}/status`, { status: N }), b = (p) => {
    const N = () => y("cms/comments/bulk", { action: p, ids: x });
    p === "delete" ? j(`Delete ${x.length} comments for good? This can't be undone.`, N) : N();
  }, z = c.data.length > 0 && x.length === c.data.length;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: "Comments" }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Comments" }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            type: "search",
            placeholder: "Search text, name or email",
            "aria-label": "Search comments",
            className: "cms:w-64",
            value: h,
            onChange: (p) => d(p.target.value)
          }
        ),
        r.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: l.collection ?? "all", onValueChange: (p) => u({ collection: p === "all" ? null : p }), children: [
          /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": "Collection", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
          /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
            /* @__PURE__ */ e.jsx(s.SelectItem, { value: "all", children: "Every collection" }),
            r.map((p) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: p.handle, children: p.title }, p.handle))
          ] })
        ] })
      ] })
    ] }),
    l.entry !== null && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      "Comments on one entry. ",
      /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:underline cms:underline-offset-4", onClick: () => f.router.get(C("cms/comments")), children: "Show all" })
    ] }),
    /* @__PURE__ */ e.jsx(s.Tabs, { value: t, onValueChange: (p) => u({ status: p }), children: /* @__PURE__ */ e.jsx(s.TabsList, { className: "cms:h-auto cms:flex-wrap cms:justify-start", children: Ft.map((p) => /* @__PURE__ */ e.jsxs(s.TabsTrigger, { value: p.value, children: [
      p.label,
      " ",
      /* @__PURE__ */ e.jsx("span", { className: "cms:ml-1 cms:text-muted-foreground", children: a[p.value] })
    ] }, p.value)) }) }),
    x.length > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2 cms:text-sm", role: "toolbar", "aria-label": "With the selected comments", children: [
      /* @__PURE__ */ e.jsxs("span", { className: "cms:text-muted-foreground", children: [
        x.length,
        " selected"
      ] }),
      n.moderate && t !== "trash" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "outline", onClick: () => b("approve"), children: [
          /* @__PURE__ */ e.jsx(ge, {}),
          " Approve"
        ] }),
        /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "outline", onClick: () => b("unapprove"), children: [
          /* @__PURE__ */ e.jsx(me, {}),
          " Unapprove"
        ] }),
        /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "outline", onClick: () => b("spam"), children: [
          /* @__PURE__ */ e.jsx(je, {}),
          " Spam"
        ] })
      ] }),
      n.delete && t !== "trash" && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "outline", onClick: () => b("trash"), children: [
        /* @__PURE__ */ e.jsx(B, {}),
        " Trash"
      ] }),
      n.delete && t === "trash" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "outline", onClick: () => b("restore"), children: [
          /* @__PURE__ */ e.jsx(ae, {}),
          " Restore"
        ] }),
        /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "destructive", onClick: () => b("delete"), children: [
          /* @__PURE__ */ e.jsx(B, {}),
          " Delete for good"
        ] })
      ] })
    ] }),
    c.data.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: l.search ? "No comments match." : "No comments here." }) : /* @__PURE__ */ e.jsxs(s.Card, { className: "cms:divide-y cms:p-0", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3 cms:px-4 cms:py-2 cms:text-sm cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsx(s.Checkbox, { checked: z, "aria-label": "Select all", onCheckedChange: (p) => g(p ? c.data.map((N) => N.id) : []) }),
        /* @__PURE__ */ e.jsxs("span", { children: [
          c.from,
          "–",
          c.to,
          " of ",
          c.total
        ] })
      ] }),
      c.data.map((p) => /* @__PURE__ */ e.jsxs("article", { className: "cms:flex cms:gap-3 cms:px-4 cms:py-4", "aria-labelledby": `comment-${p.id}-author`, children: [
        /* @__PURE__ */ e.jsx(
          s.Checkbox,
          {
            checked: x.includes(p.id),
            "aria-label": `Select ${p.author}'s comment`,
            onCheckedChange: (N) => g(N ? [...x, p.id] : x.filter((w) => w !== p.id))
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-x-3 cms:gap-y-1 cms:text-sm", children: [
            /* @__PURE__ */ e.jsx("span", { id: `comment-${p.id}-author`, className: "cms:font-medium", children: p.author }),
            p.email && /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", children: p.email }),
            p.member && /* @__PURE__ */ e.jsx(s.Badge, { variant: "outline", children: "Signed in" }),
            !p.trashed && /* @__PURE__ */ e.jsx(s.Badge, { variant: p.status === "approved" ? "secondary" : p.status === "spam" ? "destructive" : "default", children: Ht[p.status] }),
            /* @__PURE__ */ e.jsxs("span", { className: "cms:text-muted-foreground", children: [
              p.createdAt ? G(p.createdAt) : "",
              " · ",
              p.locale.toUpperCase()
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
            "On ",
            p.entry.url ? /* @__PURE__ */ e.jsxs("a", { href: p.entry.url, target: "_blank", rel: "noreferrer", className: "cms:underline-offset-4 hover:cms:underline", children: [
              p.entry.title,
              " ",
              /* @__PURE__ */ e.jsx(ne, { className: "cms:inline cms:size-3" })
            ] }) : p.entry.title,
            p.parent && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              " · replying to ",
              p.parent.author,
              ": “",
              p.parent.excerpt,
              "”"
            ] })
          ] }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:whitespace-pre-wrap cms:break-words", children: p.body }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-1", children: [
            n.moderate && !p.trashed && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              p.status !== "approved" && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => $(p, "approved"), children: [
                /* @__PURE__ */ e.jsx(ge, {}),
                " Approve"
              ] }),
              p.status === "approved" && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => $(p, "pending"), children: [
                /* @__PURE__ */ e.jsx(me, {}),
                " Unapprove"
              ] }),
              p.status !== "spam" && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => $(p, "spam"), children: [
                /* @__PURE__ */ e.jsx(je, {}),
                " Spam"
              ] }),
              p.status !== "spam" && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => m({ row: p, mode: "reply" }), children: [
                /* @__PURE__ */ e.jsx(Ws, {}),
                " Reply"
              ] }),
              /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => m({ row: p, mode: "edit" }), children: [
                /* @__PURE__ */ e.jsx(Xe, {}),
                " Edit"
              ] })
            ] }),
            n.delete && !p.trashed && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => f.router.delete(C(`cms/comments/${p.id}`), { preserveScroll: !0 }), children: [
              /* @__PURE__ */ e.jsx(B, {}),
              " Trash"
            ] }),
            n.delete && p.trashed && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => y(`cms/comments/${p.id}/restore`), children: [
                /* @__PURE__ */ e.jsx(ae, {}),
                " Restore"
              ] }),
              /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => j(
                "Delete this comment for good? Replies to it stay.",
                () => f.router.delete(C(`cms/comments/${p.id}/force`), { preserveScroll: !0 })
              ), children: [
                /* @__PURE__ */ e.jsx(B, {}),
                " Delete for good"
              ] })
            ] })
          ] })
        ] })
      ] }, p.id))
    ] }),
    (c.prev_page_url || c.next_page_url) && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:justify-end cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(s.Button, { variant: "outline", size: "sm", disabled: !c.prev_page_url, onClick: () => c.prev_page_url && f.router.get(c.prev_page_url), children: [
        /* @__PURE__ */ e.jsx(ue, {}),
        " Newer"
      ] }),
      /* @__PURE__ */ e.jsxs(s.Button, { variant: "outline", size: "sm", disabled: !c.next_page_url, onClick: () => c.next_page_url && f.router.get(c.next_page_url), children: [
        "Older ",
        /* @__PURE__ */ e.jsx(le, {})
      ] })
    ] }),
    i && /* @__PURE__ */ e.jsx(Vt, { row: i.row, mode: i.mode, error: o.body, onClose: () => m(null) }, `${i.mode}-${i.row.id}`),
    v
  ] });
}
function Vt({ row: t, mode: a, error: l, onClose: r }) {
  const [c, n] = k.useState(a === "edit" ? t.body : ""), [o, h] = k.useState(!1), d = () => {
    h(!0);
    const x = { preserveScroll: !0, onSuccess: r, onFinish: () => h(!1) };
    a === "reply" ? f.router.post(C(`cms/comments/${t.id}/reply`), { body: c }, x) : f.router.put(C(`cms/comments/${t.id}`), { body: c }, x);
  };
  return /* @__PURE__ */ e.jsx(s.Dialog, { open: !0, onOpenChange: (x) => !x && r(), children: /* @__PURE__ */ e.jsxs(s.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(s.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(s.DialogTitle, { children: a === "reply" ? `Reply to ${t.author}` : `Edit ${t.author}'s comment` }),
      /* @__PURE__ */ e.jsx(s.DialogDescription, { children: a === "reply" ? t.status === "pending" ? "Your reply is published at once, and approves this comment." : "Your reply is published at once, under your name." : "Fix a typo or remove a link." })
    ] }),
    a === "reply" && /* @__PURE__ */ e.jsx("p", { className: "cms:max-h-32 cms:overflow-auto cms:whitespace-pre-wrap cms:text-sm cms:text-muted-foreground", children: t.body }),
    /* @__PURE__ */ e.jsx(
      s.Textarea,
      {
        "aria-label": a === "reply" ? "Your reply" : "Comment",
        rows: 5,
        value: c,
        "aria-invalid": l !== void 0,
        onChange: (x) => n(x.target.value)
      }
    ),
    /* @__PURE__ */ e.jsx(T, { message: l }),
    /* @__PURE__ */ e.jsxs(s.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", onClick: r, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", disabled: c.trim() === "" || o, onClick: d, children: a === "reply" ? "Post reply" : "Save" })
    ] })
  ] }) });
}
const Ot = 3;
function Pt({ form: t, forms: a, submissions: l, can: r }) {
  s.useBreadcrumbs([{ label: "Submissions", href: C("cms/submissions") }, ...t ? [{ label: t.title }] : []]);
  const [c, n] = k.useState(null), [o, h] = U();
  if (!t || !l)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(f.Head, { title: "Submissions" }),
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Submissions" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no forms yet. Create one under Structure → Forms and put it on a page; what visitors send shows up here." })
    ] });
  const d = (l.data[0]?.rows ?? []).slice(0, Ot), x = (g) => o(
    "Delete this submission for good? It can't be restored.",
    () => f.router.delete(C(`cms/submissions/${g.id}`), { preserveScroll: !0, onSuccess: () => n(null) })
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: `${t.title} submissions` }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: t.title }),
        a.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: t.handle, onValueChange: (g) => f.router.get(C(`cms/forms/${g}/submissions`)), children: [
          /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-56", "aria-label": "Form", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(s.SelectContent, { children: a.map((g) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: g.handle, children: [
            g.title,
            " (",
            g.count,
            ")"
          ] }, g.handle)) })
        ] })
      ] }),
      l.total > 0 && /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: C(`cms/forms/${t.handle}/submissions/export`), children: [
        /* @__PURE__ */ e.jsx(Re, {}),
        " Export CSV"
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsx(s.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(s.Table, { children: [
      /* @__PURE__ */ e.jsx(s.TableHeader, { children: /* @__PURE__ */ e.jsxs(s.TableRow, { children: [
        /* @__PURE__ */ e.jsx(s.TableHead, { children: "Sent" }),
        d.map((g) => /* @__PURE__ */ e.jsx(s.TableHead, { children: g.label }, g.handle))
      ] }) }),
      /* @__PURE__ */ e.jsxs(s.TableBody, { children: [
        l.data.length === 0 && /* @__PURE__ */ e.jsx(s.TableRow, { children: /* @__PURE__ */ e.jsx(s.TableCell, { colSpan: d.length + 1, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: "Nothing sent yet." }) }),
        l.data.map((g) => /* @__PURE__ */ e.jsxs(s.TableRow, { children: [
          /* @__PURE__ */ e.jsx(s.TableCell, { className: "cms:whitespace-nowrap", children: /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:font-medium cms:hover:underline", onClick: () => n(g), children: G(g.createdAt) }) }),
          d.map((i) => /* @__PURE__ */ e.jsx(s.TableCell, { className: "cms:max-w-64 cms:truncate", children: g.rows.find((m) => m.handle === i.handle)?.value }, i.handle))
        ] }, g.id))
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
          s.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Previous page",
            disabled: !l.prev_page_url,
            onClick: () => l.prev_page_url && f.router.get(l.prev_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(ue, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          s.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Next page",
            disabled: !l.next_page_url,
            onClick: () => l.next_page_url && f.router.get(l.next_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(le, {})
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(s.Dialog, { open: c !== null, onOpenChange: (g) => !g && n(null), children: /* @__PURE__ */ e.jsxs(s.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto", children: [
      /* @__PURE__ */ e.jsxs(s.DialogHeader, { children: [
        /* @__PURE__ */ e.jsx(s.DialogTitle, { children: t.title }),
        /* @__PURE__ */ e.jsxs(s.DialogDescription, { children: [
          "Sent ",
          G(c?.createdAt ?? null),
          " · ",
          c?.locale.toUpperCase()
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-3 cms:text-sm", children: c?.rows.map((g) => /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: g.label }),
        /* @__PURE__ */ e.jsx("dd", { className: "cms:whitespace-pre-wrap cms:break-words cms:text-muted-foreground", children: g.file ? /* @__PURE__ */ e.jsx("a", { href: g.file, className: "cms:underline cms:underline-offset-4 hover:cms:text-foreground", download: !0, children: g.value }) : g.value || "—" })
      ] }, g.handle)) }),
      r.delete && c && /* @__PURE__ */ e.jsx(s.DialogFooter, { children: /* @__PURE__ */ e.jsxs(s.Button, { variant: "destructive", onClick: () => x(c), children: [
        /* @__PURE__ */ e.jsx(B, {}),
        " Delete"
      ] }) })
    ] }) }),
    h
  ] });
}
function Ut(t) {
  return /* @__PURE__ */ e.jsx(qt, { ...t }, `${t.locale}:${JSON.stringify([t.values, t.seo, t.term.template])}`);
}
function qt({ taxonomy: t, term: a, translated: l, fields: r, locale: c, locales: n, shared: o, sharedValues: h, values: d, seo: x }) {
  const g = C(`cms/taxonomies/${t.handle}/terms`), i = C(`cms/terms/${a.id}/content`);
  s.useBreadcrumbs([{ label: t.title, href: `${g}?locale=${c}` }, { label: a.title }]);
  const m = f.useForm({ locale: c, data: d, seo: x ?? {}, template: a.template ?? "" }), j = m.errors, v = () => m.processing || m.put(i, { preserveScroll: !0 });
  return s.useUnsavedChanges(m.isDirty, l ? v : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: (u) => {
    u.preventDefault(), v();
  }, className: "cms:flex cms:max-w-3xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: a.title }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: `${g}?locale=${c}`, "aria-label": `Back to ${t.title}`, children: /* @__PURE__ */ e.jsx(J, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: a.title }),
        m.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        a.url && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: a.url, target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ e.jsx(ne, {}),
          " View"
        ] }) }),
        n.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: c, onValueChange: (u) => f.router.get(C(`cms/terms/${a.id}/edit`), { locale: u }), children: [
          /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(s.SelectContent, { children: n.map((u, y) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: u, children: [
            L(u),
            y === 0 ? " (main)" : ""
          ] }, u)) })
        ] }),
        l && /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: m.processing, children: [
          m.processing && /* @__PURE__ */ e.jsx(Z, { className: "cms:animate-spin" }),
          " Save"
        ] })
      ] })
    ] }),
    l ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      r.length > 0 && /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsx(s.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: r.map((u) => o.includes(u.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(A, { id: `data-${u.handle}`, field: u, content: !0, value: h[u.handle], errors: {}, onChange: () => {
        } }),
        /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
          "Shared by all languages: edit it in ",
          L(n[0] ?? "en"),
          "."
        ] })
      ] }, u.handle) : /* @__PURE__ */ e.jsx(
        A,
        {
          id: `data-${u.handle}`,
          field: u,
          content: !0,
          value: m.data.data[u.handle],
          errors: I(j, `data.${u.handle}`),
          onChange: (y) => m.setData("data", { ...m.data.data, [u.handle]: y })
        },
        u.handle
      )) }) }),
      /* @__PURE__ */ e.jsxs(s.Card, { children: [
        /* @__PURE__ */ e.jsx(s.CardHeader, { children: /* @__PURE__ */ e.jsx(s.CardTitle, { className: "cms:text-base", children: "Search and sharing" }) }),
        /* @__PURE__ */ e.jsx(s.CardContent, { children: /* @__PURE__ */ e.jsx(se, { id: "seo", fields: fs, value: m.data.seo, errors: I(j, "seo"), onChange: (u) => m.setData("seo", u) }) })
      ] }),
      /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsxs(s.CardContent, { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "template", children: "Template" }),
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            id: "template",
            className: "cms:font-mono",
            placeholder: "The taxonomy's",
            value: m.data.template,
            onChange: (u) => m.setData("template", u.target.value),
            "aria-invalid": j.template !== void 0
          }
        ),
        /* @__PURE__ */ e.jsx(T, { message: j.template })
      ] }) })
    ] }) : /* @__PURE__ */ e.jsxs("p", { className: "cms:text-muted-foreground", children: [
      "This term has no title in ",
      L(c),
      " yet: give it one in the list first."
    ] })
  ] });
}
const oe = "__top";
function Wt({ taxonomy: t, taxonomies: a, terms: l, locales: r, locale: c, trashed: n = !1 }) {
  s.useBreadcrumbs([{ label: "Terms", href: C("cms/terms") }, ...t ? [{ label: t.title }] : []]);
  const [o, h] = U(), [d, x] = k.useState(null);
  if (!t)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(f.Head, { title: "Terms" }),
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Terms" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no taxonomies yet. Create one under Structure → Taxonomies (categories, tags…), then add its terms here." })
    ] });
  const g = C(`cms/taxonomies/${t.handle}/terms`);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: t.title }),
    h,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: t.title }),
      a.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: t.handle, onValueChange: (i) => f.router.get(C(`cms/taxonomies/${i}/terms`)), children: [
        /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": "Taxonomy", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(s.SelectContent, { children: a.map((i) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: i.handle, children: i.title }, i.handle)) })
      ] }),
      /* @__PURE__ */ e.jsx(s.Button, { variant: n ? "secondary" : "ghost", size: "sm", className: "cms:ml-auto", onClick: () => f.router.get(g, { locale: c, ...n ? {} : { trashed: 1 } }), children: n ? "Back to terms" : "Trash" }),
      r.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: c, onValueChange: (i) => f.router.get(g, { locale: i, ...n ? { trashed: 1 } : {} }), children: [
        /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(s.SelectContent, { children: r.map((i) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: i, children: L(i) }, i)) })
      ] })
    ] }),
    !n && /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsx(s.CardContent, { children: /* @__PURE__ */ e.jsx(
      ke,
      {
        action: g,
        method: "post",
        locale: c,
        terms: l,
        hierarchical: t.hierarchical,
        submitLabel: "Add term"
      },
      `new-${l.length}`
    ) }) }),
    /* @__PURE__ */ e.jsx(s.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs("ul", { className: "cms:divide-y", children: [
      l.length === 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-6 cms:text-center cms:text-muted-foreground", children: n ? "The trash is empty." : "No terms yet." }),
      l.map((i) => {
        const m = l.filter((v) => v.parentId === i.parentId), j = m.findIndex((v) => v.id === i.id);
        return /* @__PURE__ */ e.jsx("li", { className: "cms:p-3", style: { paddingLeft: `${0.75 + i.depth * 1.5}rem` }, children: n ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
          /* @__PURE__ */ e.jsx("span", { className: "cms:flex-1 cms:font-medium", children: i.title ?? i.fallback }),
          /* @__PURE__ */ e.jsxs(s.Button, { variant: "outline", size: "sm", onClick: () => f.router.post(C(`cms/terms/${i.id}/restore`), {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(ae, {}),
            " Restore"
          ] }),
          /* @__PURE__ */ e.jsxs(
            s.Button,
            {
              variant: "ghost",
              size: "sm",
              className: "cms:text-destructive",
              onClick: () => o(
                `Delete "${i.fallback}" for good, in every language? Entries lose it.`,
                () => f.router.delete(C(`cms/terms/${i.id}/force`), { preserveScroll: !0 })
              ),
              children: [
                /* @__PURE__ */ e.jsx(B, {}),
                " Delete for good"
              ]
            }
          )
        ] }) : d === i.id ? /* @__PURE__ */ e.jsx(
          ke,
          {
            action: C(`cms/terms/${i.id}`),
            method: "put",
            locale: c,
            terms: l,
            hierarchical: t.hierarchical,
            term: i,
            submitLabel: "Save",
            onDone: () => x(null)
          }
        ) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0 cms:flex-1", children: [
            i.title !== null ? /* @__PURE__ */ e.jsx("span", { className: "cms:font-medium", children: i.title }) : /* @__PURE__ */ e.jsxs("span", { className: "cms:text-muted-foreground cms:italic", children: [
              i.fallback,
              " · not translated"
            ] }),
            i.slug && /* @__PURE__ */ e.jsxs("span", { className: "cms:ml-2 cms:text-xs cms:text-muted-foreground", children: [
              "/",
              i.slug
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(
            s.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-label": `Move ${i.fallback} up`,
              disabled: j === 0,
              onClick: () => f.router.post(C(`cms/terms/${i.id}/move`), { direction: "up" }, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(Y, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            s.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-label": `Move ${i.fallback} down`,
              disabled: j === m.length - 1,
              onClick: () => f.router.post(C(`cms/terms/${i.id}/move`), { direction: "down" }, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(K, {})
            }
          ),
          /* @__PURE__ */ e.jsx(s.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Rename ${i.fallback}`, onClick: () => x(i.id), children: /* @__PURE__ */ e.jsx(Xe, {}) }),
          t.pages && i.title !== null && /* @__PURE__ */ e.jsx(s.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Edit ${i.fallback}'s page`, asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: C(`cms/terms/${i.id}/edit`) + `?locale=${c}`, children: /* @__PURE__ */ e.jsx(Rs, {}) }) }),
          /* @__PURE__ */ e.jsx(
            s.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Move ${i.fallback} to the trash`,
              onClick: () => o(
                `Move "${i.fallback}" to the trash, with the terms under it? It comes off the site; you can restore it.`,
                () => f.router.delete(C(`cms/terms/${i.id}`), { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(B, {})
            }
          )
        ] }) }, i.id);
      })
    ] }) })
  ] });
}
function ke({ action: t, method: a, locale: l, terms: r, hierarchical: c, term: n, submitLabel: o, onDone: h }) {
  const d = f.useForm({ title: n?.title ?? "", slug: n?.slug ?? "", parent_id: n?.parentId ?? null, locale: l }), x = d.errors, g = /* @__PURE__ */ new Set();
  if (n) {
    g.add(n.id);
    const j = r.findIndex((v) => v.id === n.id);
    for (let v = j + 1; v < r.length && (r[v]?.depth ?? 0) > n.depth; v++) g.add(r[v].id);
  }
  const i = (j) => {
    j.preventDefault(), d.submit(a, t, { preserveScroll: !0, onSuccess: () => {
      a === "post" && d.reset("title", "slug"), h?.();
    } });
  }, m = n ? `term-${n.id}` : "new-term";
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: i, className: "cms:grid cms:items-start cms:gap-3 cms:md:grid-cols-[2fr_1.5fr_1.5fr_auto]", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${m}-title`, className: n ? "cms:sr-only" : "", children: "Title" }),
      /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: `${m}-title`,
          value: d.data.title,
          placeholder: n?.fallback,
          required: !0,
          onChange: (j) => d.setData("title", j.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(T, { message: x.title })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${m}-slug`, className: n ? "cms:sr-only" : "", children: "Slug" }),
      /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: `${m}-slug`,
          className: "cms:font-mono",
          value: d.data.slug,
          placeholder: "Made from the title",
          onChange: (j) => d.setData("slug", j.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(T, { message: x.slug })
    ] }),
    c ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${m}-parent`, className: n ? "cms:sr-only" : "", children: "Under" }),
      /* @__PURE__ */ e.jsxs(
        s.Select,
        {
          value: d.data.parent_id === null ? oe : String(d.data.parent_id),
          onValueChange: (j) => d.setData("parent_id", j === oe ? null : Number(j)),
          children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: `${m}-parent`, children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(s.SelectItem, { value: oe, children: "Top level" }),
              r.filter((j) => !g.has(j.id)).map((j) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: String(j.id), children: [
                "— ".repeat(j.depth),
                j.title ?? j.fallback
              ] }, j.id))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ e.jsx(T, { message: x.parent_id })
    ] }) : /* @__PURE__ */ e.jsx("div", {}),
    /* @__PURE__ */ e.jsxs("div", { className: `cms:flex cms:gap-2 ${n ? "" : "cms:md:mt-6"}`, children: [
      /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: d.processing, children: [
        !n && /* @__PURE__ */ e.jsx(R, {}),
        " ",
        o
      ] }),
      h && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", onClick: h, children: "Cancel" })
    ] })
  ] });
}
ws({
  pages: {
    "Cms/Blueprints/Index": gt,
    "Cms/Blueprints/Form": pt,
    "Cms/Fieldsets/Index": St,
    "Cms/Entries/Index": yt,
    "Cms/Entries/Editor": jt,
    "Cms/Entries/Listing": Ct,
    "Cms/Terms/Index": Wt,
    "Cms/Terms/Edit": Ut,
    "Cms/Globals/Index": _t,
    "Cms/Globals/Edit": wt,
    "Cms/Menus/Index": Et,
    "Cms/Menus/Edit": Lt,
    "Cms/Comments/Index": Rt,
    "Cms/Submissions/Index": Pt
  }
});
export {
  qs as L,
  k as R,
  me as U,
  Gt as _,
  Os as a,
  C as b,
  D as c,
  at as i,
  e as j,
  s as u
};
