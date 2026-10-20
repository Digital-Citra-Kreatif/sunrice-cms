function Ss(t, a) {
  for (var n = 0; n < a.length; n++) {
    const r = a[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const c in r)
        if (c !== "default" && !(c in t)) {
          const l = Object.getOwnPropertyDescriptor(r, c);
          l && Object.defineProperty(t, c, l.get ? l : {
            enumerable: !0,
            get: () => r[c]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }));
}
const ge = 2;
function we() {
  const t = globalThis.Sunrice;
  if (!t)
    throw new Error("[sunrice] This script runs outside the Sunrice admin panel (window.Sunrice is missing).");
  return t;
}
function $s(t) {
  const a = we();
  if (a.version !== ge)
    throw new Error(`[sunrice] This plugin was built for admin runtime ${ge}, but the panel runs ${a.version}. Rebuild it with a matching @sunrice/admin-sdk.`);
  for (const [n, r] of Object.entries(t.pages ?? {}))
    a.registerPage(n, r);
}
function k(t = "") {
  return we().adminUrl(t);
}
const _e = globalThis.Sunrice;
if (!_e) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const s = _e.modules["@sunrice/admin-sdk/ui"];
function X(t) {
  return t && typeof t == "object" && !Array.isArray(t) ? t : {};
}
function ws(t, a) {
  if (typeof t != "string" || t === "") return "";
  const n = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(t);
  return n ? a ? `${n[1]}T${n[2] ?? "00:00"}` : n[1] ?? "" : "";
}
function je(t) {
  return t === "" ? null : t;
}
function _s() {
  return { _hidden: !1 };
}
function Ds(t) {
  return { type: t, hidden: !1, values: {} };
}
function Ts(t) {
  const a = t.replace(/[\u0000- \u007f]+/g, ""), n = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(a);
  return n ? ["http", "https", "mailto", "tel"].includes(n[1].toLowerCase()) : !a.includes("\\");
}
function me({ ids: t, search: a, collections: n }) {
  const r = new URLSearchParams();
  for (const c of t ?? []) r.append("ids[]", String(c));
  a && r.set("search", a);
  for (const c of n) r.append("collections[]", c);
  return r.toString();
}
function Bs(t, a) {
  return t.map((n) => ({
    id: String(n.id),
    label: n.title,
    description: n.status === "published" ? n.collection : `${n.collection} · ${n.status}`,
    group: "Entries",
    icon: "file-text",
    url: a(`cms/entries/${n.id}/edit`)
  }));
}
async function zs(t, a, n) {
  const r = await fetch(`${n("cms/entry-picker")}?${me({ search: t.trim(), collections: [] })}`, {
    signal: a,
    headers: { Accept: "application/json" },
    credentials: "same-origin"
  });
  if (!r.ok) return [];
  const { items: c } = await r.json();
  return Bs(c, n);
}
const De = globalThis.Sunrice;
if (!De) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const e = De.modules["react/jsx-runtime"], Te = globalThis.Sunrice;
if (!Te) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const S = Te.modules.react, Kt = /* @__PURE__ */ Ss({
  __proto__: null
}, [S]), Be = globalThis.Sunrice;
if (!Be) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const v = Be.modules["@inertiajs/react"];
const Ms = (t) => t?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
function Ls(t, a, n = []) {
  if (a == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: Ms(t),
    size: 24,
    node: a,
    ...n.length > 0 ? { aliases: n } : {}
  };
}
const Is = (t) => {
  let a = "", n = !1;
  for (const r of t) {
    if (r === "-" || r === "_" || r <= " ") {
      n = a.length > 0;
      continue;
    }
    a.length === 0 ? a += r.toLowerCase() : a += n ? r.toUpperCase() : r, n = !1;
  }
  return a;
};
const Fs = (t) => {
  const a = Is(t);
  return a.charAt(0).toUpperCase() + a.slice(1);
};
const oe = (...t) => t.filter((a, n, r) => !!a && a.trim() !== "" && r.indexOf(a) === n).join(" ").trim();
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
function ce(t) {
  return t != null;
}
function As(t, a = {}) {
  const n = a.attributeNames ?? {}, r = (h) => n[h] ?? h, c = t.size ?? t.width ?? O.width, l = t.size ?? t.height ?? O.height, o = t.aliases?.filter((h) => typeof h == "string" && h.trim() !== "").map((h) => `lucide-${h}`) ?? [], u = [...t.name ? [`lucide-${t.name}`] : [], ...o], d = a.className?.split(" ").filter(Boolean) ?? [], m = a.includeDefaultClasses === !1 ? oe(...d) : oe("lucide", ...u, ...d), g = a.absoluteStrokeWidth ? Number(a.strokeWidth ?? O["stroke-width"]) * Number(t.size ?? t.width ?? O.width) / Number(a.size ?? a.width ?? O.width) : a.strokeWidth ?? O["stroke-width"];
  return [
    "svg",
    {
      ...Object.entries(O).reduce((h, [p, C]) => (h[r(p)] = C, h), {}),
      ..."color" in a && a.color && {
        [r("stroke")]: a.color
      },
      ..."size" in a && ce(a.size) && {
        [r("width")]: a.size,
        [r("height")]: a.size
      },
      ..."width" in a && ce(a.width) && {
        [r("width")]: a.width
      },
      ..."height" in a && ce(a.height) && {
        [r("height")]: a.height
      },
      [r("stroke-width")]: g,
      ...m && {
        [r("class")]: m
      },
      [r("viewBox")]: `0 0 ${c} ${l}`,
      ...a.hasA11yProp === !1 ? {
        [r("aria-hidden")]: "true"
      } : {},
      ..."attributes" in a && a.attributes
    },
    t.node.map((h) => {
      const [p, C, b] = h, N = a.nonScalingStroke ? { [r("vector-effect")]: "non-scaling-stroke", ...C } : C;
      return b ? [p, N, b] : [p, N];
    })
  ];
}
function Hs(t, a = {}) {
  return As(t, {
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
const Es = (t) => {
  for (const a in t)
    if (a.startsWith("aria-") || a === "role" || a === "title")
      return !0;
  return !1;
}, Ps = S.createContext({}), Rs = () => S.useContext(Ps), Vs = S.forwardRef(
  ({
    color: t,
    size: a,
    width: n,
    height: r,
    strokeWidth: c,
    absoluteStrokeWidth: l,
    nonScalingStroke: o,
    className: u = "",
    children: d,
    iconNode: m = [],
    icon: g = {
      node: m,
      aliases: [],
      size: 24
    },
    ...i
  }, h) => {
    const {
      size: p = 24,
      strokeWidth: C = 2,
      absoluteStrokeWidth: b = !1,
      nonScalingStroke: N = !1,
      color: j = "currentColor",
      className: f = ""
    } = Rs() ?? {}, B = !!d || Es(i), [x, y, w = []] = Hs(g, {
      color: t ?? j,
      width: n ?? a ?? p,
      height: r ?? a ?? p,
      strokeWidth: c ?? C,
      absoluteStrokeWidth: l ?? b,
      nonScalingStroke: o ?? N,
      className: oe(f, u),
      hasA11yProp: B,
      attributes: i
    });
    return S.createElement(
      x,
      {
        ref: h,
        ...y
      },
      [
        ...w.map(([_, L]) => S.createElement(_, L)),
        ...Array.isArray(d) ? d : [d]
      ]
    );
  }
);
function D(t, a = [], n = []) {
  const r = typeof t == "string" ? Ls(t, a, n) : t, c = S.forwardRef(
    ({ className: l, ...o }, u) => S.createElement(Vs, {
      ref: u,
      icon: r,
      className: l,
      ...o
    })
  );
  return r.name && (c.displayName = Fs(r.name)), c;
}
const ze = {
  name: "arrow-down",
  size: 24,
  node: [
    ["path", { d: "M12 5v14", key: "s699le" }],
    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
  ]
};
ze.node;
const K = D(ze);
const Me = {
  name: "arrow-up",
  size: 24,
  node: [
    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
    ["path", { d: "M12 19V5", key: "x0mq9r" }]
  ]
};
Me.node;
const J = D(Me);
const Le = {
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
Le.node;
const Os = D(Le);
const Ie = {
  name: "check",
  size: 24,
  node: [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]
};
Ie.node;
const fe = D(Ie);
const Fe = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
Fe.node;
const Ae = D(Fe);
const He = {
  name: "chevron-left",
  size: 24,
  node: [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]]
};
He.node;
const ue = D(He);
const Ee = {
  name: "chevron-right",
  size: 24,
  node: [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]
};
Ee.node;
const ae = D(Ee);
const Pe = {
  name: "copy",
  size: 24,
  node: [
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
  ]
};
Pe.node;
const Us = D(Pe);
const Re = {
  name: "download",
  size: 24,
  node: [
    ["path", { d: "M12 15V3", key: "m9g1x1" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
  ]
};
Re.node;
const Ve = D(Re);
const Oe = {
  name: "external-link",
  size: 24,
  node: [
    ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
    ["path", { d: "M10 14 21 3", key: "gplh6r" }],
    ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
  ]
};
Oe.node;
const ne = D(Oe);
const Ue = {
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
Ue.node;
const qs = D(Ue);
const qe = {
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
qe.node;
const Ws = D(qe);
const We = {
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
We.node;
const Gs = D(We);
const Ge = {
  name: "link-2",
  size: 24,
  node: [
    ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
    ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
    ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
  ]
};
Ge.node;
const Ks = D(Ge);
const Ke = {
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
Ke.node;
const Js = D(Ke);
const Je = {
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
Je.node;
const Ys = D(Je);
const Ye = {
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
Ye.node;
const Zs = D(Ye);
const Ze = {
  name: "loader-circle",
  size: 24,
  node: [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  aliases: ["loader-2"]
};
Ze.node;
const Y = D(Ze);
const Xe = {
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
Xe.node;
const Xs = D(Xe);
const Qe = {
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
Qe.node;
const es = D(Qe);
const ss = {
  name: "plus",
  size: 24,
  node: [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ]
};
ss.node;
const P = D(ss);
const ts = {
  name: "rotate-ccw",
  size: 24,
  node: [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ]
};
ts.node;
const te = D(ts);
const as = {
  name: "search",
  size: 24,
  node: [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ]
};
as.node;
const ns = D(as);
const ls = {
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
ls.node;
const be = D(ls);
const cs = {
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
cs.node;
const Qs = D(cs);
const rs = {
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
rs.node;
const z = D(rs);
const is = {
  name: "undo-2",
  size: 24,
  node: [
    ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
    ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
  ]
};
is.node;
const de = D(is);
const os = {
  name: "x",
  size: 24,
  node: [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]
};
os.node;
const et = D(os);
function R() {
  const [t, a] = S.useState(null), n = /* @__PURE__ */ e.jsx(s.Dialog, { open: t !== null, onOpenChange: (r) => !r && a(null), children: /* @__PURE__ */ e.jsxs(s.DialogContent, { children: [
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
  return [(r, c) => a({ message: r, onConfirm: c }), n];
}
const st = 5;
let tt = 0;
const ds = () => `f${++tt}`;
function ms(t) {
  return t.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function us(t, a) {
  const n = new Set(a.map((l) => l.handle)), r = ms(t) || "field";
  let c = r;
  for (let l = 2; n.has(c); l++)
    c = `${r}_${l}`;
  return c;
}
function hs(t) {
  return (t ?? []).map(({ fields: a, ...n }) => ({
    ...n,
    key: ds(),
    fields: hs(a),
    handleTouched: !0
  }));
}
function xs(t, a) {
  return t.map(({ key: n, handleTouched: r, fields: c, ...l }) => ({
    ...l,
    validation: (l.validation ?? []).map((o) => o.trim()).filter((o) => o !== ""),
    ...a(l.type) ? { fields: xs(c, a) } : {}
  }));
}
function at(t, a, n) {
  return { key: ds(), type: t, label: a, handle: us(a, n), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function q(t, a, n) {
  const r = a + n;
  if (a < 0 || a >= t.length || r < 0 || r >= t.length) return t;
  const c = t.slice(), [l] = c.splice(a, 1);
  return c.splice(r, 0, l), c;
}
function nt(t, a, n) {
  if (t.handleTouched) return { ...t, label: a };
  const r = n.filter((c) => c.key !== t.key);
  return { ...t, label: a, handle: us(a || t.type, r) };
}
function le(t, a) {
  const n = `${a}.`, r = {};
  for (const [c, l] of Object.entries(t))
    c.startsWith(n) && (r[c.slice(n.length)] = l);
  return r;
}
function I(t, a) {
  const n = t[a];
  return { ...le(t, a), ...n !== void 0 ? { "": n } : {} };
}
function ve(t, a) {
  return Object.keys(t).some((n) => n === a || n.startsWith(`${a}.`));
}
function W(t) {
  return { draft: "Draft", scheduled: "Scheduled", published: "Published" }[t];
}
function G(t, a) {
  if (!t) return "—";
  const n = new Date(t);
  return Number.isNaN(n.getTime()) ? "—" : n.toLocaleString(a, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
function lt(t) {
  const a = (n) => String(n).padStart(2, "0");
  return `${t.getFullYear()}-${a(t.getMonth() + 1)}-${a(t.getDate())}T${a(t.getHours())}:${a(t.getMinutes())}`;
}
function M(t, a) {
  try {
    return new Intl.DisplayNames(a ? [a] : void 0, { type: "language" }).of(t.replace("_", "-")) ?? t;
  } catch {
    return t;
  }
}
async function ye(t) {
  const a = await fetch(`${k("cms/entry-picker")}?${me(t)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!a.ok) throw new Error(String(a.status));
  return (await a.json()).items;
}
function he({ id: t, value: a, multiple: n, max: r, collections: c, invalid: l, onChange: o }) {
  const u = a === null ? [] : Array.isArray(a) ? a : [a], [d, m] = S.useState({}), [g, i] = S.useState(""), [h, p] = S.useState(null), [C, b] = S.useState(!1), N = n && r !== null && u.length >= r, j = u.filter((x) => !d[x]).join(",");
  S.useEffect(() => {
    j !== "" && ye({ ids: j.split(",").map(Number), collections: c }).then((x) => m((y) => ({ ...y, ...Object.fromEntries(x.map((w) => [w.id, w])) }))).catch(() => b(!0));
  }, [j]), S.useEffect(() => {
    if (g.trim() === "") {
      p(null);
      return;
    }
    const x = window.setTimeout(() => {
      ye({ search: g.trim(), collections: c }).then((y) => {
        p(y), b(!1);
      }).catch(() => b(!0));
    }, 250);
    return () => window.clearTimeout(x);
  }, [g]);
  const f = (x) => {
    m((y) => ({ ...y, [x.id]: x })), o(n ? [...u, x.id] : x.id), i("");
  }, B = (x) => o(n ? x : x[0] ?? null);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    u.length > 0 && /* @__PURE__ */ e.jsx("ul", { className: "cms:flex cms:flex-col cms:gap-1", children: u.map((x, y) => {
      const w = d[x];
      return /* @__PURE__ */ e.jsxs("li", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-md cms:border cms:px-3 cms:py-1.5 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate", children: w ? w.title : `Entry #${x}` }),
        w && /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: w.collection }),
        w && /* @__PURE__ */ e.jsx(s.Badge, { variant: w.status === "published" ? "default" : "secondary", children: W(w.status) }),
        n && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(
            s.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-7",
              "aria-label": `Move ${w?.title ?? x} up`,
              disabled: y === 0,
              onClick: () => B(q(u, y, -1)),
              children: /* @__PURE__ */ e.jsx(J, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            s.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-7",
              "aria-label": `Move ${w?.title ?? x} down`,
              disabled: y === u.length - 1,
              onClick: () => B(q(u, y, 1)),
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
            "aria-label": `Remove ${w?.title ?? x}`,
            onClick: () => B(u.filter((_) => _ !== x)),
            children: /* @__PURE__ */ e.jsx(et, {})
          }
        )
      ] }, x);
    }) }),
    !N && (n || u.length === 0) && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-md", children: [
      /* @__PURE__ */ e.jsx(ns, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
      /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: t,
          className: "cms:pl-9",
          placeholder: "Search entries by title",
          "aria-invalid": l,
          value: g,
          autoComplete: "off",
          onChange: (x) => i(x.target.value)
        }
      ),
      h !== null && /* @__PURE__ */ e.jsxs("ul", { role: "listbox", "aria-label": "Matching entries", className: "cms:absolute cms:z-10 cms:mt-1 cms:max-h-64 cms:w-full cms:overflow-auto cms:rounded-md cms:border cms:bg-card cms:p-1 cms:shadow-md", children: [
        h.filter((x) => !u.includes(x.id)).length === 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: "No entries match." }),
        h.filter((x) => !u.includes(x.id)).map((x) => /* @__PURE__ */ e.jsx("li", { role: "option", "aria-selected": !1, children: /* @__PURE__ */ e.jsxs(
          "button",
          {
            type: "button",
            className: "cms:flex cms:w-full cms:items-center cms:gap-2 cms:rounded cms:px-2 cms:py-1.5 cms:text-left cms:text-sm cms:hover:bg-accent",
            onClick: () => f(x),
            children: [
              /* @__PURE__ */ e.jsx("span", { className: "cms:flex-1 cms:truncate", children: x.title }),
              /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: x.collection })
            ]
          }
        ) }, x.id))
      ] })
    ] }),
    C && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "Entries could not be loaded. Try again." })
  ] });
}
const ct = S.lazy(() => import("./RichTextEditor-CRUhJcw2.js").then((t) => ({ default: t.RichTextEditor }))), re = "__none";
function T({ message: t }) {
  return t ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t }) : null;
}
function Ce(t) {
  const a = t.config?.options;
  return Array.isArray(a) ? a.flatMap((n) => {
    if (typeof n == "string") return [{ value: n, label: n }];
    if (n && typeof n == "object" && typeof n.value == "string") {
      const { value: r, label: c } = n;
      return [{ value: r, label: c || r }];
    }
    return [];
  }) : [];
}
const rt = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function it(t) {
  if (t.label) return t.label;
  const a = t.handle.replace(/_/g, " ");
  return a.charAt(0).toUpperCase() + a.slice(1);
}
function F({ field: t, value: a, onChange: n, errors: r, id: c, content: l = !1 }) {
  const o = it(t), u = rt.includes(t.type) || ["select", "terms"].includes(t.type) && t.config?.multiple === !0;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", ...u ? { role: "group", "aria-labelledby": `${c}-label` } : {}, children: [
    t.type === "toggle" ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(s.Switch, { id: c, checked: a === !0, onCheckedChange: (d) => n(d) }),
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: c, children: o })
    ] }) : /* @__PURE__ */ e.jsxs(s.Label, { id: `${c}-label`, htmlFor: u ? void 0 : c, children: [
      o,
      t.required && /* @__PURE__ */ e.jsx("span", { className: "cms:text-destructive", children: " *" })
    ] }),
    /* @__PURE__ */ e.jsx(ot, { field: t, value: a, onChange: n, errors: r, id: c, content: l }),
    t.instructions && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t.instructions }),
    /* @__PURE__ */ e.jsx(T, { message: r[""] })
  ] });
}
function ot({ field: t, value: a, onChange: n, errors: r, id: c, content: l }) {
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
          rows: U(t, "rows") ?? 4,
          onChange: (u) => n(u.target.value)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ e.jsx(S.Suspense, { fallback: /* @__PURE__ */ e.jsx(s.Skeleton, { className: "cms:h-48 cms:w-full" }), children: /* @__PURE__ */ e.jsx(ct, { id: c, labelledBy: `${c}-label`, invalid: o, value: typeof a == "string" ? a : "", onChange: n }) });
    case "number":
      return /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: c,
          type: "number",
          className: "cms:max-w-48",
          "aria-invalid": o,
          value: typeof a == "number" ? String(a) : typeof a == "string" ? a : "",
          min: U(t, "min"),
          max: U(t, "max"),
          step: U(t, "step") ?? "any",
          onChange: (u) => n(u.target.value === "" ? null : Number(u.target.value))
        }
      );
    case "date": {
      const u = t.config?.time === !0;
      return /* @__PURE__ */ e.jsx(
        s.DatePicker,
        {
          id: c,
          withTime: u,
          invalid: o,
          required: t.required === !0,
          value: je(ws(a, u)),
          onChange: (d) => n(je(d ?? ""))
        }
      );
    }
    case "select":
      return t.config?.multiple === !0 ? /* @__PURE__ */ e.jsx(ke, { options: Ce(t), value: Array.isArray(a) ? a.map(String) : [], onChange: n }) : /* @__PURE__ */ e.jsx(Ne, { options: Ce(t), value: typeof a == "string" ? a : null, onChange: n, id: c, required: t.required === !0 });
    case "terms": {
      const u = t.terms ?? [];
      if (t.config?.multiple === !0) {
        const d = Array.isArray(a) ? a.map(String) : [];
        return /* @__PURE__ */ e.jsx(ke, { options: u, value: d, onChange: (m) => n(m.map(Number)) });
      }
      return /* @__PURE__ */ e.jsx(
        Ne,
        {
          options: u,
          id: c,
          required: t.required === !0,
          value: a == null ? null : String(a),
          onChange: (d) => n(d === null ? null : Number(d))
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
          max: U(t, "max") ?? null,
          collections: t.collections ?? [],
          onChange: n,
          value: typeof a == "number" || Array.isArray(a) && a.every((u) => typeof u == "number") ? a : null
        }
      );
    case "link":
      return /* @__PURE__ */ e.jsx(mt, { value: X(a), onChange: n, errors: r, id: c });
    case "media":
      return /* @__PURE__ */ e.jsx(
        s.MediaPickerInput,
        {
          id: c,
          invalid: o,
          disabled: !1,
          multiple: t.config?.multiple === !0,
          max: U(t, "max") ?? null,
          types: Array.isArray(t.config?.types) ? t.config.types : [],
          value: typeof a == "number" || Array.isArray(a) && a.every((u) => typeof u == "number") ? a : null,
          onChange: n
        }
      );
    case "group":
      return /* @__PURE__ */ e.jsx(ee, { fields: t.fields ?? [], value: X(a), onChange: n, errors: r, id: c, content: l });
    case "repeater":
      return /* @__PURE__ */ e.jsx(ht, { field: t, value: Array.isArray(a) ? a : [], onChange: n, errors: r, id: c, content: l });
    case "flexible":
      return /* @__PURE__ */ e.jsx(xt, { field: t, value: Array.isArray(a) ? a : [], onChange: n, errors: r, id: c });
    default:
      return /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: c,
          "aria-invalid": o,
          value: typeof a == "string" ? a : "",
          placeholder: dt(t, "placeholder"),
          maxLength: U(t, "max"),
          onChange: (u) => n(u.target.value)
        }
      );
  }
}
function U(t, a) {
  const n = t.config?.[a];
  return typeof n == "number" ? n : void 0;
}
function dt(t, a) {
  const n = t.config?.[a];
  return typeof n == "string" ? n : void 0;
}
function ee({ fields: t, value: a, onChange: n, errors: r, id: c, content: l }) {
  return /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-4 cms:rounded-lg cms:border cms:p-4", children: t.map((o) => /* @__PURE__ */ e.jsx(
    F,
    {
      id: `${c}-${o.handle}`,
      field: o,
      value: a[o.handle],
      content: l,
      errors: I(r, o.handle),
      onChange: (u) => n({ ...a, [o.handle]: u })
    },
    o.handle
  )) });
}
function Ne({ options: t, value: a, onChange: n, id: r, required: c }) {
  return /* @__PURE__ */ e.jsxs(s.Select, { value: a ?? re, onValueChange: (l) => n(l === re ? null : l), children: [
    /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: r, className: "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
    /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
      !c && /* @__PURE__ */ e.jsx(s.SelectItem, { value: re, children: "None" }),
      t.map((l) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: l.value, children: l.label }, l.value))
    ] })
  ] });
}
function ke({ options: t, value: a, onChange: n }) {
  return t.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Nothing to choose from yet." }) : /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2", children: t.map((r) => /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
    /* @__PURE__ */ e.jsx(
      s.Checkbox,
      {
        checked: a.includes(r.value),
        onCheckedChange: (c) => n(c ? t.map((l) => l.value).filter((l) => l === r.value || a.includes(l)) : a.filter((l) => l !== r.value))
      }
    ),
    r.label
  ] }, r.value)) });
}
function mt({ value: t, onChange: a, errors: n, id: r }) {
  const c = (l, o) => {
    const u = { ...t, [l]: o };
    a(u.url === "" || u.url === void 0 ? null : u);
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-2 cms:md:grid-cols-[2fr_1fr_auto] cms:md:items-center", children: [
    /* @__PURE__ */ e.jsx(
      s.Input,
      {
        id: r,
        "aria-label": "Address",
        placeholder: "https://… or /about",
        value: typeof t.url == "string" ? t.url : "",
        onChange: (l) => c("url", l.target.value),
        "aria-invalid": n.url !== void 0
      }
    ),
    /* @__PURE__ */ e.jsx(
      s.Input,
      {
        "aria-label": "Link text",
        placeholder: "Link text",
        value: typeof t.label == "string" ? t.label : "",
        onChange: (l) => c("label", l.target.value)
      }
    ),
    /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
      /* @__PURE__ */ e.jsx(s.Checkbox, { checked: t.new_tab === !0, onCheckedChange: (l) => c("new_tab", l) }),
      "New tab"
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ e.jsx(T, { message: n.url ?? n.label }) })
  ] });
}
function ut(t, a) {
  return !a && (t.fields ?? []).every((n) => n.type === "text");
}
function ht({ field: t, value: a, onChange: n, errors: r, id: c, content: l = !1 }) {
  const o = t.fields ?? [], u = a.map(X), d = (i, h) => n(u.map((p, C) => C === i ? h : p)), m = (t.label || "row").toLowerCase().replace(/s$/, ""), g = m.charAt(0).toUpperCase() + m.slice(1);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    u.map((i, h) => ut(t, l) ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
      o.map((p) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            "aria-label": p.label || p.handle,
            placeholder: p.label || p.handle,
            value: typeof i[p.handle] == "string" ? i[p.handle] : "",
            onChange: (C) => d(h, { ...i, [p.handle]: C.target.value })
          }
        ),
        /* @__PURE__ */ e.jsx(T, { message: r[`${h}.${p.handle}`] })
      ] }, p.handle)),
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": `Remove ${m} ${h + 1}`, onClick: () => n(u.filter((p, C) => C !== h)), children: /* @__PURE__ */ e.jsx(z, {}) })
    ] }, h) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(
        ps,
        {
          label: `${g} ${h + 1}`,
          index: h,
          count: u.length,
          onMove: (p) => n(q(u, h, p)),
          onRemove: () => n(u.filter((p, C) => C !== h)),
          hidden: l ? i._hidden === !0 : void 0,
          onHidden: (p) => d(h, { ...i, _hidden: p })
        }
      ),
      /* @__PURE__ */ e.jsx(ee, { fields: o, value: i, onChange: (p) => d(h, p), errors: I(r, String(h)), id: `${c}-${h}`, content: l })
    ] }, typeof i._id == "string" ? i._id : h)),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", size: "sm", onClick: () => n([...u, l ? _s() : {}]), children: [
      /* @__PURE__ */ e.jsx(P, {}),
      " Add ",
      m
    ] }) })
  ] });
}
function xt({ field: t, value: a, onChange: n, errors: r, id: c }) {
  const l = t.blocks ?? [], o = a.map(X), u = (d, m) => n(o.map((g, i) => i === d ? m : g));
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    o.map((d, m) => {
      const g = l.find((i) => i.type === d.type);
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(
          ps,
          {
            label: g?.label ?? String(d.type),
            badge: !0,
            index: m,
            count: o.length,
            onMove: (i) => n(q(o, m, i)),
            onRemove: () => n(o.filter((i, h) => h !== m)),
            hidden: d.hidden === !0,
            onHidden: (i) => u(m, { ...d, hidden: i })
          }
        ),
        g ? /* @__PURE__ */ e.jsx(
          ee,
          {
            fields: g.fields,
            value: X(d.values),
            onChange: (i) => u(m, { ...d, values: i }),
            errors: I(r, `${m}.values`),
            id: `${c}-${m}`,
            content: !0
          }
        ) : /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: "This kind of block no longer exists. Its values are kept." }),
        /* @__PURE__ */ e.jsx(T, { message: r[`${m}.type`] })
      ] }, typeof d.id == "string" ? d.id : m);
    }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(s.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(s.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", size: "sm", disabled: l.length === 0, children: [
        /* @__PURE__ */ e.jsx(P, {}),
        " Add block"
      ] }) }),
      /* @__PURE__ */ e.jsx(s.DropdownMenuContent, { align: "start", children: l.map((d) => /* @__PURE__ */ e.jsx(s.DropdownMenuItem, { onSelect: () => n([...o, Ds(d.type)]), children: d.label }, d.type)) })
    ] }) })
  ] });
}
function ps({ label: t, badge: a = !1, index: n, count: r, onMove: c, onRemove: l, hidden: o, onHidden: u }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    a ? /* @__PURE__ */ e.jsx(s.Badge, { variant: "secondary", children: t }) : /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:font-medium", children: t }),
    o !== void 0 && /* @__PURE__ */ e.jsxs("label", { className: "cms:ml-auto cms:flex cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", children: [
      /* @__PURE__ */ e.jsx(s.Switch, { checked: !o, onCheckedChange: (d) => u(!d), "aria-label": `Show ${t}` }),
      "Show"
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: o === void 0 ? "cms:ml-auto cms:flex" : "cms:flex", children: [
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Move ${t} up`, disabled: n === 0, onClick: () => c(-1), children: /* @__PURE__ */ e.jsx(J, {}) }),
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Move ${t} down`, disabled: n === r - 1, onClick: () => c(1), children: /* @__PURE__ */ e.jsx(K, {}) }),
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": `Remove ${t}`, onClick: l, children: /* @__PURE__ */ e.jsx(z, {}) })
    ] })
  ] });
}
function gs({ fields: t, onChange: a, types: n, errors: r, depth: c = 1, idPrefix: l = "field" }) {
  const [o, u] = S.useState(() => /* @__PURE__ */ new Set()), d = (i) => u((h) => {
    const p = new Set(h);
    return p.has(i) ? p.delete(i) : p.add(i), p;
  }), m = (i, h) => a(t.map((p, C) => C === i ? h : p)), g = (i) => {
    const h = at(i.type, i.label, t);
    a([...t, h]), u((p) => new Set(p).add(h.key));
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    t.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:border-dashed cms:p-4 cms:text-sm cms:text-muted-foreground", children: "No fields yet." }),
    t.map((i, h) => {
      const p = n.find((N) => N.type === i.type), C = o.has(i.key) || ve(r, String(h)), b = `${l}-${i.key}`;
      return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${ve(r, String(h)) ? "cms:border-destructive" : ""}`, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:p-2", children: [
          /* @__PURE__ */ e.jsx(
            s.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-expanded": C,
              "aria-controls": b,
              "aria-label": `${C ? "Close" : "Open"} ${i.label || i.handle}`,
              onClick: () => d(i.key),
              children: C ? /* @__PURE__ */ e.jsx(Ae, {}) : /* @__PURE__ */ e.jsx(ae, {})
            }
          ),
          /* @__PURE__ */ e.jsxs("button", { type: "button", className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:text-left", onClick: () => d(i.key), children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: i.label || i.handle }),
            /* @__PURE__ */ e.jsx("code", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", children: i.handle })
          ] }),
          i.required && /* @__PURE__ */ e.jsx(s.Badge, { variant: "outline", children: "Required" }),
          /* @__PURE__ */ e.jsx(s.Badge, { variant: "secondary", children: p?.label ?? i.type }),
          /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move up", disabled: h === 0, onClick: () => a(q(t, h, -1)), children: /* @__PURE__ */ e.jsx(J, {}) }),
          /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move down", disabled: h === t.length - 1, onClick: () => a(q(t, h, 1)), children: /* @__PURE__ */ e.jsx(K, {}) }),
          /* @__PURE__ */ e.jsx(
            s.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Remove ${i.label || i.handle}`,
              onClick: () => a(t.filter((N, j) => j !== h)),
              children: /* @__PURE__ */ e.jsx(z, {})
            }
          )
        ] }),
        C && /* @__PURE__ */ e.jsx(
          pt,
          {
            id: b,
            field: i,
            type: p,
            siblings: t,
            onChange: (N) => m(h, N),
            types: n,
            errors: le(r, String(h)),
            depth: c
          }
        )
      ] }, i.key);
    }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(s.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(s.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", size: "sm", children: [
        /* @__PURE__ */ e.jsx(P, {}),
        " Add field"
      ] }) }),
      /* @__PURE__ */ e.jsx(s.DropdownMenuContent, { align: "start", children: n.filter((i) => !i.hasChildren || c < st).map((i) => /* @__PURE__ */ e.jsx(s.DropdownMenuItem, { onSelect: () => g(i), children: i.label }, i.type)) })
    ] }) })
  ] });
}
const E = { default: "__default", yes: "yes", no: "no" };
function pt({ id: t, field: a, type: n, siblings: r, onChange: c, types: l, errors: o, depth: u }) {
  const d = a.config ?? {};
  return /* @__PURE__ */ e.jsxs("div", { id: t, className: "cms:flex cms:flex-col cms:gap-4 cms:border-t cms:p-4", children: [
    !n && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-destructive", children: [
      'The field type "',
      a.type,
      `" isn't registered. Its data is kept; register the type or remove the field.`
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${t}-label`, children: "Label" }),
        /* @__PURE__ */ e.jsx(s.Input, { id: `${t}-label`, value: a.label ?? "", onChange: (m) => c(nt(a, m.target.value, r)) }),
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
            onChange: (m) => c({ ...a, handle: m.target.value, handleTouched: !0 })
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
          onChange: (m) => c({ ...a, instructions: m.target.value || null })
        }
      ),
      /* @__PURE__ */ e.jsx(T, { message: o.instructions })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-6", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(s.Switch, { id: `${t}-required`, checked: a.required === !0, onCheckedChange: (m) => c({ ...a, required: m }) }),
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${t}-required`, children: "Required" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${t}-translatable`, children: "Per language" }),
        /* @__PURE__ */ e.jsxs(
          s.Select,
          {
            value: a.translatable === !0 ? E.yes : a.translatable === !1 ? E.no : E.default,
            onValueChange: (m) => c({ ...a, translatable: m === E.yes ? !0 : m === E.no ? !1 : null }),
            children: [
              /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: `${t}-translatable`, className: "cms:w-48", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
              /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
                /* @__PURE__ */ e.jsx(s.SelectItem, { value: E.default, children: "As the type decides" }),
                /* @__PURE__ */ e.jsx(s.SelectItem, { value: E.yes, children: "Yes, translated" }),
                /* @__PURE__ */ e.jsx(s.SelectItem, { value: E.no, children: "No, shared" })
              ] })
            ]
          }
        )
      ] })
    ] }),
    (n?.settings.length ?? 0) > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: n?.settings.map((m) => /* @__PURE__ */ e.jsx(
      F,
      {
        id: `${t}-config-${m.handle}`,
        field: m,
        value: d[m.handle],
        errors: I(o, `config.${m.handle}`),
        onChange: (g) => c({ ...a, config: { ...d, [m.handle]: g } })
      },
      m.handle
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
          onChange: (m) => c({ ...a, validation: m.target.value.split(`
`) })
        }
      ),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Laravel rules, one per line." }),
      /* @__PURE__ */ e.jsx(T, { message: o.validation ?? Object.entries(o).find(([m]) => m.startsWith("validation."))?.[1] })
    ] }),
    n?.hasChildren && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(s.Label, { children: "Fields inside" }),
      /* @__PURE__ */ e.jsx(
        gs,
        {
          fields: a.fields,
          onChange: (m) => c({ ...a, fields: m }),
          types: l,
          errors: le(o, "fields"),
          depth: u + 1,
          idPrefix: t
        }
      ),
      /* @__PURE__ */ e.jsx(T, { message: o.fields })
    ] }),
    /* @__PURE__ */ e.jsx(T, { message: o.type })
  ] });
}
function gt({ kind: t = "blueprint", blueprint: a, fieldTypes: n, usedBy: r = [] }) {
  const c = t === "fieldset" ? "Fieldset" : "Blueprint", l = k(t === "fieldset" ? "cms/fieldsets" : "cms/blueprints"), o = a ? a.title : `New ${c.toLowerCase()}`;
  s.useBreadcrumbs([{ label: `${c}s`, href: l }, { label: o }]);
  const [u, d] = R(), m = v.useForm({ title: a?.title ?? "", handle: a?.handle ?? "" }), [g, i] = S.useState(a !== null), [h, p] = S.useState(() => hs(a?.fields)), C = (_) => n.find((L) => L.type === _)?.hasChildren === !0, b = m.errors, [N, j] = S.useState(() => JSON.stringify(h)), f = m.isDirty || JSON.stringify(h) !== N, B = () => {
    m.setDefaults(), j(JSON.stringify(h));
  }, x = () => {
    m.processing || (m.transform((_) => ({
      ...a ? { title: _.title } : _,
      fields: xs(h, C)
    })), a ? m.put(`${l}/${a.id}`, { preserveScroll: !0, onSuccess: B }) : m.post(l, { onSuccess: B }));
  }, y = (_) => {
    _.preventDefault(), x();
  };
  s.useUnsavedChanges(f, x);
  const w = () => a && u(
    `Delete the ${c.toLowerCase()} "${a.title}"? Content keeps its values.`,
    () => v.router.delete(`${l}/${a.id}`, { preserveScroll: !0 })
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: y, className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(v.Head, { title: o }),
    d,
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: o,
        back: { href: l, label: `Back to ${c.toLowerCase()}s` },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          a && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", size: "icon", className: "cms:text-destructive", "aria-label": `Delete ${o}`, onClick: w, children: /* @__PURE__ */ e.jsx(z, {}) }),
          /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: m.processing, children: [
            m.processing && /* @__PURE__ */ e.jsx(Y, { className: "cms:animate-spin" }),
            a ? "Save" : `Create ${c.toLowerCase()}`
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(T, { message: b.blueprint ?? b.fieldset }),
    /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsxs(s.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "title", children: "Title" }),
        /* @__PURE__ */ e.jsx(s.Input, { id: "title", value: m.data.title, required: !0, onChange: (_) => {
          m.setData((L) => ({ ...L, title: _.target.value, handle: g ? L.handle : ms(_.target.value) }));
        } }),
        /* @__PURE__ */ e.jsx(T, { message: b.title })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "handle", children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            id: "handle",
            className: "cms:font-mono",
            value: m.data.handle,
            disabled: a !== null,
            required: !0,
            onChange: (_) => {
              i(!0), m.setData("handle", _.target.value);
            }
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: a ? "Set when it was created." : "Lowercase letters, digits and underscores. It can't change later." }),
        /* @__PURE__ */ e.jsx(T, { message: b.handle })
      ] })
    ] }) }),
    r.length > 0 && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      "Used by ",
      r.join(", "),
      ". Changes show there at once."
    ] }),
    /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-3", "aria-labelledby": "fields-heading", children: [
      /* @__PURE__ */ e.jsx("h2", { id: "fields-heading", className: "cms:text-lg cms:font-medium", children: "Fields" }),
      /* @__PURE__ */ e.jsx(gs, { fields: h, onChange: p, types: n, errors: le(b, "fields") }),
      /* @__PURE__ */ e.jsx(T, { message: b.fields })
    ] })
  ] });
}
function js({ noun: t, base: a, rows: n, intro: r }) {
  const c = `${t}s`;
  s.useBreadcrumbs([{ label: c }]);
  const [l, o] = R();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(v.Head, { title: c }),
    o,
    /* @__PURE__ */ e.jsx(s.PageHeader, { title: c, description: r, actions: /* @__PURE__ */ e.jsx(s.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(v.Link, { href: `${a}/create`, children: [
      /* @__PURE__ */ e.jsx(P, {}),
      " New ",
      t.toLowerCase()
    ] }) }) }),
    /* @__PURE__ */ e.jsx(s.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(s.Table, { children: [
      /* @__PURE__ */ e.jsx(s.TableHeader, { children: /* @__PURE__ */ e.jsxs(s.TableRow, { children: [
        /* @__PURE__ */ e.jsx(s.TableHead, { children: "Title" }),
        /* @__PURE__ */ e.jsx(s.TableHead, { children: "Handle" }),
        /* @__PURE__ */ e.jsx(s.TableHead, { children: "Fields" }),
        n.some((u) => u.usedBy) && /* @__PURE__ */ e.jsx(s.TableHead, { children: "Used by" }),
        /* @__PURE__ */ e.jsx(s.TableHead, { className: "cms:w-12", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: "Actions" }) })
      ] }) }),
      /* @__PURE__ */ e.jsxs(s.TableBody, { children: [
        n.length === 0 && /* @__PURE__ */ e.jsx(s.TableRow, { children: /* @__PURE__ */ e.jsxs(s.TableCell, { colSpan: 5, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: [
          "No ",
          c.toLowerCase(),
          " yet."
        ] }) }),
        n.map((u) => /* @__PURE__ */ e.jsxs(s.TableRow, { children: [
          /* @__PURE__ */ e.jsx(s.TableCell, { children: /* @__PURE__ */ e.jsx(v.Link, { href: `${a}/${u.id}/edit`, className: "cms:font-medium cms:hover:underline", children: u.title }) }),
          /* @__PURE__ */ e.jsx(s.TableCell, { children: /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: u.handle }) }),
          /* @__PURE__ */ e.jsx(s.TableCell, { children: u.fields }),
          u.usedBy && /* @__PURE__ */ e.jsx(s.TableCell, { className: "cms:text-muted-foreground", children: u.usedBy.join(", ") || "—" }),
          /* @__PURE__ */ e.jsx(s.TableCell, { children: /* @__PURE__ */ e.jsx(
            s.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Delete ${u.title}`,
              onClick: () => l(
                `Delete the ${t.toLowerCase()} "${u.title}"? Content keeps its values.`,
                () => v.router.delete(`${a}/${u.id}`, { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(z, {})
            }
          ) })
        ] }, u.id))
      ] })
    ] }) })
  ] });
}
function jt({ blueprints: t }) {
  const a = v.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(T, { message: a.blueprint }),
    /* @__PURE__ */ e.jsx(
      js,
      {
        noun: "Blueprint",
        base: k("cms/blueprints"),
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
function ft(t) {
  const { entry: a } = t;
  return /* @__PURE__ */ e.jsx(bt, { ...t }, a ? `${a.id}:${a.locale}:${a.version}:${a.status}:${a.trashed}:${a.publishedAt}` : "new");
}
function bt({ collection: t, fields: a, locales: n = [], shared: r = [], sharedValues: c = {}, entry: l, values: o, revisions: u, undoRestore: d = null, settings: m, can: g }) {
  const i = k(`cms/collections/${t.handle}/entries`), h = l ? k(`cms/entries/${l.id}`) : i, p = l ? o.title : "New entry";
  s.useBreadcrumbs([{ label: t.title, href: i }, { label: p }]);
  const [C, b] = R(), [N, j] = S.useState(!1), f = v.useForm({ ...o, seo: o.seo ?? {}, locale: l?.locale ?? null, version: l?.version ?? null, publish: !1, published_at: null }), B = l ? { locale: l.locale } : {}, x = n.find(($) => $.main)?.code, y = f.errors, w = l !== null && l.status !== "draft" && !l.hasUnpublishedChanges && !f.isDirty, _ = l === null ? g.create : g.update && !l.trashed, L = ($ = !1, H = null) => {
    f.transform((V) => ({ ...V, publish: $, published_at: H })), l ? f.put(h, { preserveScroll: !0, onSuccess: () => j(!1) }) : f.post(h);
  }, Ns = () => {
    f.transform(($) => ({ ...$, version: null, publish: !1, published_at: null })), f.put(h, { preserveScroll: !0 });
  }, A = s.useEditLock({
    type: "cms.entry",
    id: l?.id,
    locale: l?.locale,
    enabled: l !== null && _,
    noun: "entry",
    leaveTo: i,
    getUnsaved: () => f.isDirty ? { title: f.data.title, slug: f.data.slug, data: f.data.data, seo: f.data.seo } : null
  }), Z = _ && !A.readOnly, ks = async ($) => {
    const H = await A.loadKept($);
    f.setData((V) => ({ ...V, title: H.title ?? V.title, slug: H.slug ?? V.slug, data: H.data ?? V.data, seo: H.seo ?? V.seo }));
  };
  s.useUnsavedChanges(f.isDirty && !A.takenOver, Z ? () => f.processing || L() : void 0);
  const pe = ($ = null) => {
    g.update ? L(!0, $) : l && v.router.post(`${h}/publish`, { ...B, published_at: $ }, { preserveScroll: !0, onSuccess: () => j(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: ($) => {
    $.preventDefault(), L();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(v.Head, { title: p }),
    b,
    A.dialogs,
    /* @__PURE__ */ e.jsxs(
      s.PageHeader,
      {
        title: p,
        back: { href: i, label: `Back to ${t.title}` },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          l && !l.trashed && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(
            "a",
            {
              href: l.previewUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              title: f.isDirty ? "Shows the saved draft: save first to see your changes." : "Shows the saved draft.",
              children: [
                /* @__PURE__ */ e.jsx(qs, {}),
                " Preview"
              ]
            }
          ) }),
          l?.url && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: l.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(ne, {}),
            " View"
          ] }) }),
          l?.trashed && g.delete && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", onClick: () => v.router.post(`${h}/restore`, {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(te, {}),
            " Restore"
          ] }),
          l?.trashed && g.delete && /* @__PURE__ */ e.jsxs(
            s.Button,
            {
              type: "button",
              variant: "outline",
              className: "cms:text-destructive",
              onClick: () => C(`Delete "${o.title}" for good, in every language, with its revisions? This can't be undone.`, () => v.router.delete(`${h}/force`)),
              children: [
                /* @__PURE__ */ e.jsx(z, {}),
                " Delete for good"
              ]
            }
          ),
          l && !l.trashed && g.create && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "ghost", title: "Copy every language as a new draft", onClick: () => v.router.post(`${h}/duplicate`), children: [
            /* @__PURE__ */ e.jsx(Us, {}),
            " Duplicate"
          ] }),
          l && !l.trashed && g.delete && !A.readOnly && /* @__PURE__ */ e.jsx(
            s.Button,
            {
              type: "button",
              variant: "outline",
              size: "icon",
              className: "cms:text-destructive",
              "aria-label": "Move to the trash",
              onClick: () => C(`Move "${o.title}" to the trash? It comes off the site; you can restore it.`, () => v.router.delete(h)),
              children: /* @__PURE__ */ e.jsx(z, {})
            }
          ),
          Z && /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", variant: l && g.publish ? "outline" : "default", disabled: f.processing, children: [
            f.processing && /* @__PURE__ */ e.jsx(Y, { className: "cms:animate-spin" }),
            l ? "Save draft" : "Create draft"
          ] }),
          l && !l.trashed && g.publish && !A.readOnly && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex", children: [
            /* @__PURE__ */ e.jsx(s.Button, { type: "button", className: "cms:rounded-r-none", disabled: f.processing || w, onClick: () => pe(), children: l.status === "draft" ? "Publish" : w ? "Published" : "Publish changes" }),
            /* @__PURE__ */ e.jsxs(s.DropdownMenu, { children: [
              /* @__PURE__ */ e.jsx(s.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(s.Button, { type: "button", size: "icon", className: "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": "More publishing options", children: /* @__PURE__ */ e.jsx(Ae, {}) }) }),
              /* @__PURE__ */ e.jsxs(s.DropdownMenuContent, { align: "end", children: [
                /* @__PURE__ */ e.jsxs(s.DropdownMenuItem, { onSelect: () => j(!0), children: [
                  /* @__PURE__ */ e.jsx(Os, {}),
                  " Publish on a date…"
                ] }),
                l.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  /* @__PURE__ */ e.jsx(s.DropdownMenuSeparator, {}),
                  /* @__PURE__ */ e.jsx(s.DropdownMenuItem, { onSelect: () => v.router.post(`${h}/unpublish`, B, { preserveScroll: !0 }), children: "Unpublish" })
                ] })
              ] })
            ] })
          ] })
        ] }),
        children: [
          l && /* @__PURE__ */ e.jsx(s.Badge, { variant: l.status === "published" ? "default" : "secondary", children: l.trashed ? "In the trash" : W(l.status) }),
          f.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
        ]
      }
    ),
    l && n.length > 1 && /* @__PURE__ */ e.jsx(
      vt,
      {
        entryUrl: h,
        current: l.locale,
        locales: n,
        canAdd: g.create && !l.trashed,
        canRemove: g.delete && !l.isMain && !l.trashed,
        onRemove: () => C(
          `Remove the ${M(l.locale)} translation of "${o.title}"? Its revisions go with it.`,
          () => v.router.delete(`${h}/translations/${l.locale}`)
        )
      }
    ),
    /* @__PURE__ */ e.jsx(s.ViewingNotice, { by: A.viewingBy }),
    /* @__PURE__ */ e.jsx(s.KeptEditsNotice, { kept: A.kept, disabled: !Z, onLoad: ($) => {
      ks($);
    }, onDiscard: ($) => {
      A.discardKept($);
    } }),
    y.version && /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: [
      /* @__PURE__ */ e.jsx("span", { children: y.version }),
      /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", size: "sm", onClick: () => v.router.reload(), children: "Load theirs" }),
        /* @__PURE__ */ e.jsx(
          s.Button,
          {
            type: "button",
            variant: "destructive",
            size: "sm",
            disabled: f.processing,
            onClick: () => C("Save your version over theirs? Their changes are replaced (their earlier published versions stay in the revisions).", Ns),
            children: "Save mine anyway"
          }
        )
      ] })
    ] }),
    (y.entry || y.published_at) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: y.entry ?? y.published_at }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_18rem]", children: [
      /* @__PURE__ */ e.jsxs("fieldset", { disabled: !Z, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsxs(s.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-[2fr_1fr]", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "title", children: "Title" }),
            /* @__PURE__ */ e.jsx(
              s.Input,
              {
                id: "title",
                value: f.data.title,
                "aria-invalid": y.title !== void 0,
                onChange: ($) => f.setData("title", $.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(T, { message: y.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "slug", children: "Slug" }),
            /* @__PURE__ */ e.jsx(
              s.Input,
              {
                id: "slug",
                className: "cms:font-mono",
                value: f.data.slug,
                placeholder: "Made from the title",
                "aria-invalid": y.slug !== void 0,
                onChange: ($) => f.setData("slug", $.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(T, { message: y.slug })
          ] })
        ] }) }),
        a.length > 0 && /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsx(s.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: a.map(($) => r.includes($.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
          /* @__PURE__ */ e.jsx(F, { id: `data-${$.handle}`, field: $, content: !0, value: c[$.handle], errors: {}, onChange: () => {
          } }),
          /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
            "Shared by all languages: edit it in ",
            x ? M(x) : "the main language",
            "."
          ] })
        ] }, $.handle) : /* @__PURE__ */ e.jsx(
          F,
          {
            id: `data-${$.handle}`,
            field: $,
            content: !0,
            value: f.data.data[$.handle],
            errors: I(y, `data.${$.handle}`),
            onChange: (H) => f.setData("data", { ...f.data.data, [$.handle]: H })
          },
          $.handle
        )) }) }),
        /* @__PURE__ */ e.jsxs(s.Card, { children: [
          /* @__PURE__ */ e.jsx(s.CardHeader, { children: /* @__PURE__ */ e.jsx(s.CardTitle, { className: "cms:text-base", children: "Search and sharing" }) }),
          /* @__PURE__ */ e.jsx(s.CardContent, { children: /* @__PURE__ */ e.jsx(
            ee,
            {
              id: "seo",
              fields: fs,
              value: f.data.seo,
              errors: I(y, "seo"),
              onChange: ($) => f.setData("seo", $)
            }
          ) })
        ] })
      ] }),
      l && /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:flex-col cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs(s.Card, { children: [
          /* @__PURE__ */ e.jsx(s.CardHeader, { children: /* @__PURE__ */ e.jsx(s.CardTitle, { className: "cms:text-base", children: "Status" }) }),
          /* @__PURE__ */ e.jsxs(s.CardContent, { className: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
            /* @__PURE__ */ e.jsxs("p", { children: [
              W(l.status),
              l.status !== "draft" && l.publishedAt ? ` · ${G(l.publishedAt)}` : ""
            ] }),
            l.status !== "draft" && l.hasUnpublishedChanges && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The draft has changes the site doesn't show yet." })
          ] })
        ] }),
        m && /* @__PURE__ */ e.jsx(Ct, { entryUrl: h, collection: t, settings: m, disabled: !Z }),
        /* @__PURE__ */ e.jsxs(s.Card, { children: [
          /* @__PURE__ */ e.jsx(s.CardHeader, { children: /* @__PURE__ */ e.jsx(s.CardTitle, { className: "cms:text-base", children: "Revisions" }) }),
          /* @__PURE__ */ e.jsxs(s.CardContent, { className: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
            d !== null && g.update && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", size: "sm", onClick: () => v.router.post(k(`cms/entry-translations/${d}/undo-restore`), {}, { preserveScroll: !0 }), children: [
              /* @__PURE__ */ e.jsx(de, {}),
              " Undo the restore"
            ] }),
            u.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "Each publish keeps one." }),
            u.map(($) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
                /* @__PURE__ */ e.jsx("div", { className: "cms:truncate", children: $.title }),
                /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: G($.createdAt) })
              ] }),
              g.update && !l.trashed && /* @__PURE__ */ e.jsx(
                s.Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  onClick: () => v.router.post(k(`cms/revisions/${$.id}/restore`), {}, { preserveScroll: !0 }),
                  children: "Restore"
                }
              )
            ] }, $.id))
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(
      yt,
      {
        open: N,
        onClose: () => j(!1),
        processing: f.processing,
        current: l?.publishedAt ?? null,
        onSchedule: ($) => pe($)
      }
    )
  ] });
}
function vt({ entryUrl: t, current: a, locales: n, canAdd: r, canRemove: c, onRemove: l }) {
  return /* @__PURE__ */ e.jsxs("nav", { "aria-label": "Languages", className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
    n.map((o) => {
      const u = `${M(o.code)}${o.main ? " (main)" : ""}`;
      return o.status === null ? r ? /* @__PURE__ */ e.jsxs(
        s.Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "cms:border-dashed",
          onClick: () => v.router.post(`${t}/translations`, { locale: o.code }),
          children: [
            /* @__PURE__ */ e.jsx(P, {}),
            " ",
            u
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
          onClick: () => o.code !== a && v.router.get(`${t}/edit`, { locale: o.code }),
          children: [
            u,
            /* @__PURE__ */ e.jsx(s.Badge, { variant: o.status === "published" ? "default" : "outline", className: "cms:ml-1", children: W(o.status) })
          ]
        },
        o.code
      );
    }),
    c && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:ml-auto cms:text-destructive", onClick: l, children: "Remove this language" })
  ] });
}
function yt({ open: t, onClose: a, onSchedule: n, current: r, processing: c }) {
  const [l, o] = S.useState("");
  return S.useEffect(() => {
    t && o(lt(r ? new Date(r) : new Date(Date.now() + 864e5)));
  }, [t, r]), /* @__PURE__ */ e.jsx(s.Dialog, { open: t, onOpenChange: (u) => !u && a(), children: /* @__PURE__ */ e.jsxs(s.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(s.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(s.DialogTitle, { children: "Publish on a date" }),
      /* @__PURE__ */ e.jsx(s.DialogDescription, { children: "The entry goes live then; a date in the past publishes it now with that date." })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "published-at", children: "Date and time" }),
      /* @__PURE__ */ e.jsx(s.Input, { id: "published-at", type: "datetime-local", value: l, onChange: (u) => o(u.target.value) }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "In your time zone." })
    ] }),
    /* @__PURE__ */ e.jsxs(s.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", onClick: a, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", disabled: l === "" || c, onClick: () => n(new Date(l).toISOString()), children: "Publish" })
    ] })
  ] }) });
}
function Ct({ entryUrl: t, collection: a, settings: n, disabled: r }) {
  const c = v.useForm({ parent_id: n.parentId, template: n.template ?? "", comments_closed: n.commentsClosed === !0 }), l = c.errors;
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
            invalid: l.parent_id !== void 0,
            value: c.data.parent_id,
            onChange: (o) => c.setData("parent_id", typeof o == "number" ? o : null)
          }
        ),
        /* @__PURE__ */ e.jsx(T, { message: l.parent_id })
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
            "aria-invalid": l.template !== void 0
          }
        ),
        /* @__PURE__ */ e.jsx(T, { message: l.template })
      ] }),
      a.comments && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(s.Switch, { id: "comments-open", checked: !c.data.comments_closed, onCheckedChange: (o) => c.setData("comments_closed", !o) }),
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "comments-open", children: "Accept new comments" }),
        /* @__PURE__ */ e.jsx("a", { href: k(`cms/comments?entry=${t.split("/").slice(-1)[0]}`), className: "cms:ml-auto cms:text-muted-foreground cms:underline-offset-4 hover:cms:underline", children: "Comments" })
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
function Nt({ collection: t, collections: a, entries: n, query: r, can: c }) {
  s.useBreadcrumbs([{ label: "Entries", href: k("cms/entries") }, ...t ? [{ label: t.title }] : []]);
  const [l, o] = S.useState(r.search), u = t ? k(`cms/collections/${t.handle}/entries`) : "", [d, m] = S.useState([]), [g, i] = R();
  S.useEffect(() => m([]), [n]);
  const h = r.trashed ? c?.delete ? [{ action: "restore", label: "Restore" }, { action: "delete", label: "Delete for good", danger: !0 }] : [] : [
    ...c?.publish ? [{ action: "publish", label: "Publish" }, { action: "unpublish", label: "Unpublish" }] : [],
    ...c?.delete ? [{ action: "trash", label: "Move to the trash", danger: !0 }] : []
  ], p = (b, N, j = !1) => {
    const f = () => v.router.post(`${u}/bulk`, { action: b, ids: d }, { preserveScroll: !0 });
    j ? g(`${N}: ${d.length} ${d.length === 1 ? "entry" : "entries"}?${b === "delete" ? " This can't be undone." : ""}`, f) : f();
  }, C = (b) => {
    const N = { ...r, ...b };
    v.router.get(
      u,
      { ...N.search ? { search: N.search } : {}, ...N.trashed ? { trashed: 1 } : {} },
      { preserveState: !0, preserveScroll: !0, replace: !0 }
    );
  };
  return S.useEffect(() => {
    if (l === r.search) return;
    const b = window.setTimeout(() => C({ search: l }), 300);
    return () => window.clearTimeout(b);
  }, [l]), !t || !n ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(v.Head, { title: "Entries" }),
    /* @__PURE__ */ e.jsx(s.PageHeader, { title: "Entries", description: "There are no collections yet. Create one under Structure → Collections, then come back to write its entries." })
  ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(v.Head, { title: t.title }),
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: t.title,
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          t.listing && !r.trashed && /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs(v.Link, { href: k(`cms/collections/${t.handle}/listing`), children: [
            /* @__PURE__ */ e.jsx(Gs, {}),
            " Listing page"
          ] }) }),
          n.total > 0 && !r.trashed && /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: `${u}/export`, children: [
            /* @__PURE__ */ e.jsx(Ve, {}),
            " Export CSV"
          ] }) }),
          c?.create && !r.trashed && /* @__PURE__ */ e.jsx(s.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(v.Link, { href: `${u}/create`, children: [
            /* @__PURE__ */ e.jsx(P, {}),
            " New entry"
          ] }) })
        ] }),
        children: a.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: t.handle, onValueChange: (b) => v.router.get(k(`cms/collections/${b}/entries`)), children: [
          /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": "Collection", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(s.SelectContent, { children: a.map((b) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: b.handle, children: b.title }, b.handle)) })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-sm", children: [
        /* @__PURE__ */ e.jsx(ns, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            className: "cms:pl-9",
            placeholder: "Search titles",
            "aria-label": "Search titles",
            value: l,
            onChange: (b) => o(b.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(s.Button, { variant: r.trashed ? "secondary" : "ghost", size: "sm", onClick: () => C({ trashed: !r.trashed }), children: r.trashed ? "Back to entries" : "Trash" }),
      d.length > 0 && h.length > 0 && /* @__PURE__ */ e.jsxs("div", { role: "toolbar", "aria-label": "Selected entries", className: "cms:ml-auto cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs("span", { className: "cms:text-sm cms:text-muted-foreground", children: [
          d.length,
          " selected"
        ] }),
        h.map((b) => /* @__PURE__ */ e.jsx(s.Button, { size: "sm", variant: b.danger ? "destructive" : "outline", onClick: () => p(b.action, b.label, b.danger), children: b.label }, b.action))
      ] })
    ] }),
    i,
    /* @__PURE__ */ e.jsx(s.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(s.Table, { children: [
      /* @__PURE__ */ e.jsx(s.TableHeader, { children: /* @__PURE__ */ e.jsxs(s.TableRow, { children: [
        h.length > 0 && /* @__PURE__ */ e.jsx(s.TableHead, { className: "cms:w-10", children: /* @__PURE__ */ e.jsx(
          s.Checkbox,
          {
            "aria-label": "Select all on this page",
            checked: n.data.length > 0 && d.length === n.data.length,
            onCheckedChange: (b) => m(b ? n.data.map((N) => N.id) : [])
          }
        ) }),
        /* @__PURE__ */ e.jsx(s.TableHead, { children: "Title" }),
        /* @__PURE__ */ e.jsx(s.TableHead, { children: "Status" }),
        /* @__PURE__ */ e.jsx(s.TableHead, { children: t.dated ? "Date" : "Updated" })
      ] }) }),
      /* @__PURE__ */ e.jsxs(s.TableBody, { children: [
        n.data.length === 0 && /* @__PURE__ */ e.jsx(s.TableRow, { children: /* @__PURE__ */ e.jsx(s.TableCell, { colSpan: h.length > 0 ? 4 : 3, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: r.trashed ? "The trash is empty." : r.search ? "Nothing matches." : "No entries yet." }) }),
        n.data.map((b, N) => /* @__PURE__ */ e.jsxs(s.TableRow, { className: "sunrice-row-in", style: { "--i": N }, "data-state": d.includes(b.id) ? "selected" : void 0, children: [
          h.length > 0 && /* @__PURE__ */ e.jsx(s.TableCell, { children: /* @__PURE__ */ e.jsx(
            s.Checkbox,
            {
              "aria-label": `Select ${b.title}`,
              checked: d.includes(b.id),
              onCheckedChange: (j) => m(j ? [...d, b.id] : d.filter((f) => f !== b.id))
            }
          ) }),
          /* @__PURE__ */ e.jsxs(s.TableCell, { children: [
            /* @__PURE__ */ e.jsx(v.Link, { href: k(`cms/entries/${b.id}/edit`), className: "cms:font-medium cms:hover:underline", children: b.title }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
              "/",
              b.slug,
              b.parent ? ` · under ${b.parent}` : ""
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(s.TableCell, { children: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-1", children: [
            /* @__PURE__ */ e.jsx(s.Badge, { variant: b.status === "published" ? "default" : "secondary", children: W(b.status) }),
            b.locales.length > 1 && b.locales.filter((j) => !j.main).map((j) => /* @__PURE__ */ e.jsx(
              s.Badge,
              {
                variant: j.status === "published" ? "default" : "outline",
                className: j.status === null ? "cms:opacity-50" : "",
                title: `${j.code}: ${j.status === null ? "not translated" : W(j.status)}`,
                children: j.code.toUpperCase()
              },
              j.code
            ))
          ] }) }),
          /* @__PURE__ */ e.jsx(s.TableCell, { className: "cms:text-muted-foreground", children: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-2", children: [
            G(t.dated ? b.publishedAt : b.updatedAt),
            t.ordered && c?.update && !r.trashed && !r.search && /* @__PURE__ */ e.jsxs("span", { className: "cms:flex", children: [
              /* @__PURE__ */ e.jsx(s.Button, { variant: "ghost", size: "icon", "aria-label": `Move ${b.title} up`, onClick: () => v.router.post(k(`cms/entries/${b.id}/move`), { direction: "up" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(J, {}) }),
              /* @__PURE__ */ e.jsx(s.Button, { variant: "ghost", size: "icon", "aria-label": `Move ${b.title} down`, onClick: () => v.router.post(k(`cms/entries/${b.id}/move`), { direction: "down" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(K, {}) })
            ] })
          ] }) })
        ] }, b.id))
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
          s.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Previous page",
            disabled: !n.prev_page_url,
            onClick: () => n.prev_page_url && v.router.get(n.prev_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(ue, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          s.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Next page",
            disabled: !n.next_page_url,
            onClick: () => n.next_page_url && v.router.get(n.next_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(ae, {})
          }
        )
      ] })
    ] })
  ] });
}
function xe({ message: t, processing: a, onSaveMine: n }) {
  const [r, c] = R();
  return t ? /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: [
    c,
    /* @__PURE__ */ e.jsx("span", { children: t }),
    /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", size: "sm", onClick: () => v.router.reload(), children: "Load theirs" }),
      /* @__PURE__ */ e.jsx(
        s.Button,
        {
          type: "button",
          variant: "destructive",
          size: "sm",
          disabled: a,
          onClick: () => r("Save your version over theirs? Their changes are replaced.", n),
          children: "Save mine anyway"
        }
      )
    ] })
  ] }) : null;
}
function kt(t) {
  return /* @__PURE__ */ e.jsx(St, { ...t }, `${t.locale}:${t.version}:${JSON.stringify(t.values)}`);
}
function St({ collection: t, fields: a, locale: n, locales: r, shared: c, values: l, version: o, can: u }) {
  const d = k(`cms/collections/${t.handle}/listing`), m = k(`cms/collections/${t.handle}/entries`);
  s.useBreadcrumbs([{ label: t.title, href: m }, { label: "Listing page" }]);
  const g = v.useForm({ locale: n, data: l, version: o }), i = g.errors, h = r[0], p = u.update, C = () => g.processing || g.put(d, { preserveScroll: !0 }), b = () => {
    g.transform((N) => ({ ...N, version: null })), g.put(d, { preserveScroll: !0 });
  };
  return s.useUnsavedChanges(g.isDirty, p ? C : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: (N) => {
    N.preventDefault(), C();
  }, className: "cms:flex cms:max-w-3xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(v.Head, { title: `${t.title}: listing page` }),
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: `${t.title}: listing page`,
        back: { href: m, label: `Back to ${t.title}` },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          r.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: n, onValueChange: (N) => v.router.get(d, { locale: N }), children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(s.SelectContent, { children: r.map((N, j) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: N, children: [
              M(N),
              j === 0 ? " (main)" : ""
            ] }, N)) })
          ] }),
          t.url && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: t.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(ne, {}),
            " View"
          ] }) }),
          p && /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: g.processing, children: [
            g.processing && /* @__PURE__ */ e.jsx(Y, { className: "cms:animate-spin" }),
            " Save"
          ] })
        ] }),
        children: g.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      }
    ),
    a.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The listing page has no fields of its own: choose a listing blueprint for the collection under Structure → Collections." }) : /* @__PURE__ */ e.jsxs("fieldset", { disabled: !p, className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(xe, { message: i.version, processing: g.processing, onSaveMine: b }),
      /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsx(s.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: a.map((N) => c.includes(N.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(F, { id: `data-${N.handle}`, field: N, content: !0, value: l[N.handle], errors: {}, onChange: () => {
        } }),
        /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
          "Shared by all languages: edit it in ",
          h ? M(h) : "the main language",
          "."
        ] })
      ] }, N.handle) : /* @__PURE__ */ e.jsx(
        F,
        {
          id: `data-${N.handle}`,
          field: N,
          content: !0,
          value: g.data.data[N.handle],
          errors: I(i, `data.${N.handle}`),
          onChange: (j) => g.setData("data", { ...g.data.data, [N.handle]: j })
        },
        N.handle
      )) }) })
    ] })
  ] });
}
function $t({ fieldsets: t }) {
  const a = v.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(T, { message: a.fieldset }),
    /* @__PURE__ */ e.jsx(
      js,
      {
        noun: "Fieldset",
        base: k("cms/fieldsets"),
        rows: t,
        intro: "Fields shared between blueprints, and the kinds of block of flexible fields."
      }
    )
  ] });
}
function wt(t) {
  return /* @__PURE__ */ e.jsx(_t, { ...t }, `${t.locale}:${t.version}:${JSON.stringify(t.values)}`);
}
function _t({ set: t, fields: a, locale: n, locales: r, shared: c, values: l, version: o, can: u }) {
  const d = k(`cms/globals/${t.handle}`);
  s.useBreadcrumbs([{ label: "Globals", href: k("cms/globals") }, { label: t.title }]);
  const m = v.useForm({ locale: n, data: l, version: o }), g = m.errors, i = r[0], h = s.useEditLock({
    type: "cms.global",
    id: t.id,
    locale: n,
    enabled: u.update,
    noun: "global set",
    leaveTo: k("cms/globals"),
    getUnsaved: () => m.isDirty ? { data: m.data.data } : null
  }), p = u.update && !h.readOnly, C = () => m.processing || m.put(d, { preserveScroll: !0 }), b = () => {
    m.transform((j) => ({ ...j, version: null })), m.put(d, { preserveScroll: !0 });
  }, N = async (j) => {
    const f = await h.loadKept(j);
    f.data && typeof f.data == "object" && m.setData("data", f.data);
  };
  return s.useUnsavedChanges(m.isDirty && !h.takenOver, p ? C : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: (j) => {
    j.preventDefault(), C();
  }, className: "cms:flex cms:max-w-3xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(v.Head, { title: t.title }),
    h.dialogs,
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: t.title,
        back: { href: k("cms/globals"), label: "Back to globals" },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          r.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: n, onValueChange: (j) => v.router.get(d, { locale: j }), children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(s.SelectContent, { children: r.map((j, f) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: j, children: [
              M(j),
              f === 0 ? " (main)" : ""
            ] }, j)) })
          ] }),
          p && /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: m.processing, children: [
            m.processing && /* @__PURE__ */ e.jsx(Y, { className: "cms:animate-spin" }),
            " Save"
          ] })
        ] }),
        children: m.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      }
    ),
    a.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "This global set has no fields: choose a blueprint for it under Structure → Global sets." }) : /* @__PURE__ */ e.jsxs("fieldset", { disabled: !p, className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(s.ViewingNotice, { by: h.viewingBy }),
      /* @__PURE__ */ e.jsx(xe, { message: g.version, processing: m.processing, onSaveMine: b }),
      /* @__PURE__ */ e.jsx(s.KeptEditsNotice, { kept: h.kept, disabled: !p, onLoad: (j) => {
        N(j);
      }, onDiscard: (j) => {
        h.discardKept(j);
      } }),
      /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsx(s.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: a.map((j) => c.includes(j.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(F, { id: `data-${j.handle}`, field: j, content: !0, value: l[j.handle], errors: {}, onChange: () => {
        } }),
        /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
          "Shared by all languages: edit it in ",
          i ? M(i) : "the main language",
          "."
        ] })
      ] }, j.handle) : /* @__PURE__ */ e.jsx(
        F,
        {
          id: `data-${j.handle}`,
          field: j,
          content: !0,
          value: m.data.data[j.handle],
          errors: I(g, `data.${j.handle}`),
          onChange: (f) => m.setData("data", { ...m.data.data, [j.handle]: f })
        },
        j.handle
      )) }) })
    ] })
  ] });
}
function Dt({ sets: t }) {
  return s.useBreadcrumbs([{ label: "Globals" }]), /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(v.Head, { title: "Globals" }),
    /* @__PURE__ */ e.jsx(s.PageHeader, { title: "Globals", description: "Values the whole site uses, like contact details and footer text." }),
    t.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no global sets yet. Create one under Structure → Global sets." }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:sm:grid-cols-2 cms:lg:grid-cols-3", children: t.map((a) => /* @__PURE__ */ e.jsx(v.Link, { href: k(`cms/globals/${a.handle}`), className: "cms:rounded-xl cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none", children: /* @__PURE__ */ e.jsxs(s.Card, { className: "cms:h-full cms:transition-colors cms:hover:bg-accent", children: [
      /* @__PURE__ */ e.jsxs(s.CardHeader, { children: [
        /* @__PURE__ */ e.jsx(s.CardTitle, { className: "cms:text-base", children: a.title }),
        /* @__PURE__ */ e.jsx(s.CardDescription, { children: a.blueprint ? /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: a.handle }) : "No blueprint yet: choose one under Structure → Global sets." })
      ] }),
      /* @__PURE__ */ e.jsx(s.CardContent, {})
    ] }) }, a.handle)) })
  ] });
}
let bs = 0;
function vs(t, a = 0) {
  return t.flatMap(({ children: n, ...r }) => [{ ...r, key: `m${++bs}`, depth: a }, ...vs(n ?? [], a + 1)]);
}
function Tt(t) {
  const a = [], n = [{ depth: -1, children: a }];
  for (const { key: r, depth: c, ...l } of t) {
    for (; n.length > 1 && n[n.length - 1].depth >= c; ) n.pop();
    const o = { ...l, children: [] };
    n[n.length - 1].children.push(o), n.push({ depth: c, children: o.children });
  }
  return a;
}
function Q(t, a) {
  const n = t[a]?.depth ?? 0;
  let r = a + 1;
  for (; r < t.length && t[r].depth > n; ) r++;
  return r;
}
function ys(t, a, n) {
  const r = Q(t, a);
  return t.map((c, l) => l >= a && l < r ? { ...c, depth: c.depth + n } : c);
}
function Bt(t, a, n) {
  const r = t[a], c = t[a - 1];
  return !r || !c || r.depth > c.depth || Math.max(...t.slice(a, Q(t, a)).map((o) => o.depth)) + 1 > n - 1 ? t : ys(t, a, 1);
}
function zt(t, a) {
  return (t[a]?.depth ?? 0) === 0 ? t : ys(t, a, -1);
}
function Se(t, a, n) {
  const r = t[a];
  if (!r) return t;
  const c = Q(t, a), l = t.slice(a, c);
  if (n === -1) {
    let d = a - 1;
    for (; d >= 0 && t[d].depth > r.depth; ) d--;
    return d < 0 || t[d].depth !== r.depth ? t : [...t.slice(0, d), ...l, ...t.slice(d, a), ...t.slice(c)];
  }
  const o = t[c];
  if (!o || o.depth !== r.depth) return t;
  const u = Q(t, c);
  return [...t.slice(0, a), ...t.slice(c, u), ...l, ...t.slice(u)];
}
function Mt(t, a) {
  return [...t.slice(0, a), ...t.slice(Q(t, a))];
}
function se(t) {
  return { key: `m${++bs}`, depth: 0, entry_id: null, term_id: null, collection_id: null, target: null, url: null, labels: {}, new_tab: !1, ...t };
}
function Lt({ menu: t, items: a, locales: n, limits: r, terms: c, listings: l, can: o }) {
  const u = k(`cms/menus/${t.handle}`);
  s.useBreadcrumbs([{ label: "Menus", href: k("cms/menus") }, { label: t.title }]);
  const [d, m] = S.useState(() => vs(a)), [g, i] = S.useState(null), h = v.useForm({ items: a }), p = h.errors, [C, b] = S.useState(!1), N = n[0] ?? "en", j = (y) => {
    m(y), b(!0);
  }, f = (y, w) => j(d.map((_, L) => L === y ? { ..._, ...w } : _)), B = () => {
    h.processing || (h.transform(() => ({ items: Tt(d).map(Cs) })), h.put(u, { preserveScroll: !0, onSuccess: () => b(!1) }));
  }, x = (y) => {
    y.preventDefault(), B();
  };
  return s.useUnsavedChanges(C, o.update ? B : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: x, className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(v.Head, { title: t.title }),
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: t.title,
        back: { href: k("cms/menus"), label: "Back to menus" },
        actions: o.update && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", disabled: d.length >= r.items, onClick: () => i("entry"), children: [
            /* @__PURE__ */ e.jsx(P, {}),
            " Entry"
          ] }),
          c.length > 0 && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", disabled: d.length >= r.items, onClick: () => i("term"), children: [
            /* @__PURE__ */ e.jsx(Qs, {}),
            " Term"
          ] }),
          l.length > 0 && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", disabled: d.length >= r.items, onClick: () => i("listing"), children: [
            /* @__PURE__ */ e.jsx(Zs, {}),
            " Listing"
          ] }),
          /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", disabled: d.length >= r.items, onClick: () => i("url"), children: [
            /* @__PURE__ */ e.jsx(Ks, {}),
            " Link"
          ] }),
          /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: h.processing, children: [
            h.processing && /* @__PURE__ */ e.jsx(Y, { className: "cms:animate-spin" }),
            " Save"
          ] })
        ] }),
        children: C && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      }
    ),
    /* @__PURE__ */ e.jsx(T, { message: p.items }),
    Object.keys(p).some((y) => y.startsWith("items.")) && /* @__PURE__ */ e.jsxs("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: [
      "Some links need fixing: ",
      Object.values(p).filter(Boolean)[0]
    ] }),
    /* @__PURE__ */ e.jsx(s.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs("ul", { className: "cms:divide-y", children: [
      d.length === 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-6 cms:text-center cms:text-muted-foreground", children: "No links yet. Add an entry or a link." }),
      d.map((y, w) => /* @__PURE__ */ e.jsxs("li", { className: "cms:flex cms:flex-col cms:gap-2 cms:p-3", style: { paddingLeft: `${0.75 + y.depth * 2}rem` }, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(
            s.Input,
            {
              "aria-label": `Label (${M(N)})`,
              className: "cms:max-w-xs",
              disabled: !o.update,
              placeholder: y.target?.title ?? "Label",
              value: y.labels[N] ?? "",
              onChange: (_) => f(w, { labels: { ...y.labels, [N]: _.target.value } })
            }
          ),
          /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:text-sm cms:text-muted-foreground", children: y.url !== null ? y.url : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            y.target ? `${y.target.kind}: ${y.target.title}` : "Gone",
            " ",
            (!y.target || !y.target.live) && /* @__PURE__ */ e.jsx(s.Badge, { variant: "outline", children: "Not on the site" })
          ] }) }),
          o.update && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center", children: [
            /* @__PURE__ */ e.jsxs("label", { className: "cms:mr-2 cms:flex cms:items-center cms:gap-1.5 cms:text-sm", children: [
              /* @__PURE__ */ e.jsx(s.Checkbox, { checked: y.new_tab, onCheckedChange: (_) => f(w, { new_tab: _ }) }),
              " New tab"
            ] }),
            /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Out a level", disabled: y.depth === 0, onClick: () => j(zt(d, w)), children: /* @__PURE__ */ e.jsx(Js, {}) }),
            /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "In a level", onClick: () => j(Bt(d, w, r.depth)), children: /* @__PURE__ */ e.jsx(Ys, {}) }),
            /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move up", onClick: () => j(Se(d, w, -1)), children: /* @__PURE__ */ e.jsx(J, {}) }),
            /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move down", onClick: () => j(Se(d, w, 1)), children: /* @__PURE__ */ e.jsx(K, {}) }),
            /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": "Remove, with what's under it", onClick: () => j(Mt(d, w)), children: /* @__PURE__ */ e.jsx(z, {}) })
          ] })
        ] }),
        n.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: n.slice(1).map((_) => /* @__PURE__ */ e.jsx(
          s.Input,
          {
            "aria-label": `Label (${M(_)})`,
            className: "cms:max-w-xs",
            disabled: !o.update,
            placeholder: `${M(_)}: as ${M(N)}`,
            value: y.labels[_] ?? "",
            onChange: (L) => f(w, { labels: { ...y.labels, [_]: L.target.value } })
          },
          _
        )) })
      ] }, y.key))
    ] }) }),
    /* @__PURE__ */ e.jsx(At, { kind: g, terms: c, listings: l, onClose: () => i(null), onAdd: (y) => {
      j([...d, y]), i(null);
    }, main: N })
  ] });
}
function Cs({ target: t, children: a, ...n }) {
  return { ...n, children: a.map(Cs) };
}
const It = { entry: "Link to an entry", term: "Link to a term's page", listing: "Link to a listing page", url: "Link to an address" }, Ft = {
  entry: "It follows the entry: its title (unless you give a label) and its address in each language. It shows only while the entry is on the site.",
  term: "The page listing the term's entries, in each language. Its title is the label unless you give one.",
  listing: "The collection's listing page, in each language. The collection's title is the label unless you give one.",
  url: "A web address, a path on this site (/contact), mailto: or tel:."
};
function At({ kind: t, terms: a, listings: n, onClose: r, onAdd: c, main: l }) {
  const [o, u] = S.useState(null), [d, m] = S.useState(""), [g, i] = S.useState(""), [h, p] = S.useState("");
  S.useEffect(() => {
    u(null), m(""), i(""), p("");
  }, [t]);
  const C = g.trim() === "" || Ts(g.trim()), b = h.trim() ? { [l]: h.trim() } : {}, N = async () => {
    if (t === "entry" && o !== null) {
      const f = await fetch(`${k("cms/entry-picker")}?${me({ ids: [o], collections: [] })}`, { headers: { Accept: "application/json" }, credentials: "same-origin" }), B = f.ok ? (await f.json()).items[0] : void 0;
      c(se({ entry_id: o, target: B ? { title: B.title, kind: B.collection, live: B.status === "published" } : null, labels: b }));
    } else if (t === "term" && d !== "") {
      const f = a.find((B) => String(B.id) === d);
      c(se({ term_id: Number(d), target: f ? { title: f.title, kind: f.taxonomy, live: !0 } : null, labels: b }));
    } else if (t === "listing" && d !== "") {
      const f = n.find((B) => String(B.id) === d);
      c(se({ collection_id: Number(d), target: f ? { title: f.title, kind: "Listing page", live: !0 } : null, labels: b }));
    } else t === "url" && g.trim() !== "" && C && h.trim() !== "" && c(se({ url: g.trim(), labels: b }));
  }, j = t === "entry" ? o !== null : t === "url" ? g.trim() !== "" && C && h.trim() !== "" : d !== "";
  return /* @__PURE__ */ e.jsx(s.Dialog, { open: t !== null, onOpenChange: (f) => !f && r(), children: /* @__PURE__ */ e.jsxs(s.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(s.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(s.DialogTitle, { children: t ? It[t] : "" }),
      /* @__PURE__ */ e.jsx(s.DialogDescription, { children: t ? Ft[t] : "" })
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
          onChange: (f) => u(typeof f == "number" ? f : null)
        }
      ),
      (t === "term" || t === "listing") && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "menu-target", children: t === "term" ? "Term" : "Collection" }),
        /* @__PURE__ */ e.jsxs(s.Select, { value: d, onValueChange: m, children: [
          /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: "menu-target", children: /* @__PURE__ */ e.jsx(s.SelectValue, { placeholder: "Choose…" }) }),
          /* @__PURE__ */ e.jsx(s.SelectContent, { children: t === "term" ? a.map((f) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: String(f.id), children: [
            f.taxonomy,
            ": ",
            f.title
          ] }, f.id)) : n.map((f) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: String(f.id), children: f.title }, f.id)) })
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
            "aria-invalid": !C,
            onChange: (f) => i(f.target.value)
          }
        ),
        !C && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "This address could run code; use https://, a path, mailto: or tel:." })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(s.Label, { htmlFor: "menu-label", children: [
          "Label",
          t === "url" ? "" : " (optional)"
        ] }),
        /* @__PURE__ */ e.jsx(s.Input, { id: "menu-label", value: h, onChange: (f) => p(f.target.value) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(s.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", onClick: r, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", onClick: () => {
        N();
      }, disabled: !j, children: "Add" })
    ] })
  ] }) });
}
function Ht({ menus: t }) {
  return s.useBreadcrumbs([{ label: "Menus" }]), /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(v.Head, { title: "Menus" }),
    /* @__PURE__ */ e.jsx(s.PageHeader, { title: "Menus", description: "Navigation for the site: the main menu, the footer…" }),
    t.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no menus yet. Create one under Structure → Menus." }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:sm:grid-cols-2 cms:lg:grid-cols-3", children: t.map((a) => /* @__PURE__ */ e.jsx(v.Link, { href: k(`cms/menus/${a.handle}`), className: "cms:rounded-xl cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none", children: /* @__PURE__ */ e.jsxs(s.Card, { className: "cms:h-full cms:transition-colors cms:hover:bg-accent", children: [
      /* @__PURE__ */ e.jsxs(s.CardHeader, { children: [
        /* @__PURE__ */ e.jsx(s.CardTitle, { className: "cms:text-base", children: a.title }),
        /* @__PURE__ */ e.jsx(s.CardDescription, { children: /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: a.handle }) })
      ] }),
      /* @__PURE__ */ e.jsx(s.CardContent, {})
    ] }) }, a.handle)) })
  ] });
}
const Et = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "spam", label: "Spam" },
  { value: "trash", label: "Trash" }
], Pt = { pending: "Pending", approved: "Approved", spam: "Spam" };
function Rt({ tab: t, counts: a, filters: n, collections: r, comments: c, can: l, errors: o = {} }) {
  s.useBreadcrumbs([{ label: "Comments", href: k("cms/comments") }]);
  const [u, d] = S.useState(n.search), [m, g] = S.useState([]), [i, h] = S.useState(null), [p, C] = R(), b = (x) => {
    const y = { status: t, search: n.search, collection: n.collection, ...x };
    v.router.get(k("cms/comments"), {
      ...y.status !== "all" ? { status: y.status } : {},
      ...y.search ? { search: y.search } : {},
      ...y.collection ? { collection: y.collection } : {},
      ...n.entry ? { entry: n.entry } : {}
    }, { preserveState: !0, replace: !0, onSuccess: () => g([]) });
  };
  S.useEffect(() => {
    if (u === n.search) return;
    const x = window.setTimeout(() => b({ search: u }), 300);
    return () => window.clearTimeout(x);
  }, [u]);
  const N = (x, y = {}) => v.router.post(k(x), y, { preserveScroll: !0, onSuccess: () => g([]) }), j = (x, y) => N(`cms/comments/${x.id}/status`, { status: y }), f = (x) => {
    const y = () => N("cms/comments/bulk", { action: x, ids: m });
    x === "delete" ? p(`Delete ${m.length} comments for good? This can't be undone.`, y) : y();
  }, B = c.data.length > 0 && m.length === c.data.length;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(v.Head, { title: "Comments" }),
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: "Comments",
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(
            s.Input,
            {
              type: "search",
              placeholder: "Search text, name or email",
              "aria-label": "Search comments",
              className: "cms:w-64",
              value: u,
              onChange: (x) => d(x.target.value)
            }
          ),
          r.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: n.collection ?? "all", onValueChange: (x) => b({ collection: x === "all" ? null : x }), children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": "Collection", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(s.SelectItem, { value: "all", children: "Every collection" }),
              r.map((x) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: x.handle, children: x.title }, x.handle))
            ] })
          ] })
        ] })
      }
    ),
    n.entry !== null && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      "Comments on one entry. ",
      /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:underline cms:underline-offset-4", onClick: () => v.router.get(k("cms/comments")), children: "Show all" })
    ] }),
    /* @__PURE__ */ e.jsx(s.Tabs, { value: t, onValueChange: (x) => b({ status: x }), children: /* @__PURE__ */ e.jsx(s.TabsList, { className: "cms:h-auto cms:flex-wrap cms:justify-start", children: Et.map((x) => /* @__PURE__ */ e.jsxs(s.TabsTrigger, { value: x.value, children: [
      x.label,
      " ",
      /* @__PURE__ */ e.jsx("span", { className: "cms:ml-1 cms:text-muted-foreground", children: a[x.value] })
    ] }, x.value)) }) }),
    m.length > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2 cms:text-sm", role: "toolbar", "aria-label": "With the selected comments", children: [
      /* @__PURE__ */ e.jsxs("span", { className: "cms:text-muted-foreground", children: [
        m.length,
        " selected"
      ] }),
      l.moderate && t !== "trash" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "outline", onClick: () => f("approve"), children: [
          /* @__PURE__ */ e.jsx(fe, {}),
          " Approve"
        ] }),
        /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "outline", onClick: () => f("unapprove"), children: [
          /* @__PURE__ */ e.jsx(de, {}),
          " Unapprove"
        ] }),
        /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "outline", onClick: () => f("spam"), children: [
          /* @__PURE__ */ e.jsx(be, {}),
          " Spam"
        ] })
      ] }),
      l.delete && t !== "trash" && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "outline", onClick: () => f("trash"), children: [
        /* @__PURE__ */ e.jsx(z, {}),
        " Trash"
      ] }),
      l.delete && t === "trash" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "outline", onClick: () => f("restore"), children: [
          /* @__PURE__ */ e.jsx(te, {}),
          " Restore"
        ] }),
        /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "destructive", onClick: () => f("delete"), children: [
          /* @__PURE__ */ e.jsx(z, {}),
          " Delete for good"
        ] })
      ] })
    ] }),
    c.data.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: n.search ? "No comments match." : "No comments here." }) : /* @__PURE__ */ e.jsxs(s.Card, { className: "cms:divide-y cms:p-0", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3 cms:px-4 cms:py-2 cms:text-sm cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsx(s.Checkbox, { checked: B, "aria-label": "Select all", onCheckedChange: (x) => g(x ? c.data.map((y) => y.id) : []) }),
        /* @__PURE__ */ e.jsxs("span", { children: [
          c.from,
          "–",
          c.to,
          " of ",
          c.total
        ] })
      ] }),
      c.data.map((x) => /* @__PURE__ */ e.jsxs("article", { className: "cms:flex cms:gap-3 cms:px-4 cms:py-4", "aria-labelledby": `comment-${x.id}-author`, children: [
        /* @__PURE__ */ e.jsx(
          s.Checkbox,
          {
            checked: m.includes(x.id),
            "aria-label": `Select ${x.author}'s comment`,
            onCheckedChange: (y) => g(y ? [...m, x.id] : m.filter((w) => w !== x.id))
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-x-3 cms:gap-y-1 cms:text-sm", children: [
            /* @__PURE__ */ e.jsx("span", { id: `comment-${x.id}-author`, className: "cms:font-medium", children: x.author }),
            x.email && /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", children: x.email }),
            x.member && /* @__PURE__ */ e.jsx(s.Badge, { variant: "outline", children: "Signed in" }),
            !x.trashed && /* @__PURE__ */ e.jsx(s.Badge, { variant: x.status === "approved" ? "secondary" : x.status === "spam" ? "destructive" : "default", children: Pt[x.status] }),
            /* @__PURE__ */ e.jsxs("span", { className: "cms:text-muted-foreground", children: [
              x.createdAt ? G(x.createdAt) : "",
              " · ",
              x.locale.toUpperCase()
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
            "On ",
            x.entry.url ? /* @__PURE__ */ e.jsxs("a", { href: x.entry.url, target: "_blank", rel: "noreferrer", className: "cms:underline-offset-4 hover:cms:underline", children: [
              x.entry.title,
              " ",
              /* @__PURE__ */ e.jsx(ne, { className: "cms:inline cms:size-3" })
            ] }) : x.entry.title,
            x.parent && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              " · replying to ",
              x.parent.author,
              ": “",
              x.parent.excerpt,
              "”"
            ] })
          ] }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:whitespace-pre-wrap cms:break-words", children: x.body }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-1", children: [
            l.moderate && !x.trashed && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              x.status !== "approved" && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => j(x, "approved"), children: [
                /* @__PURE__ */ e.jsx(fe, {}),
                " Approve"
              ] }),
              x.status === "approved" && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => j(x, "pending"), children: [
                /* @__PURE__ */ e.jsx(de, {}),
                " Unapprove"
              ] }),
              x.status !== "spam" && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => j(x, "spam"), children: [
                /* @__PURE__ */ e.jsx(be, {}),
                " Spam"
              ] }),
              x.status !== "spam" && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => h({ row: x, mode: "reply" }), children: [
                /* @__PURE__ */ e.jsx(Xs, {}),
                " Reply"
              ] }),
              /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => h({ row: x, mode: "edit" }), children: [
                /* @__PURE__ */ e.jsx(es, {}),
                " Edit"
              ] })
            ] }),
            l.delete && !x.trashed && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => v.router.delete(k(`cms/comments/${x.id}`), { preserveScroll: !0 }), children: [
              /* @__PURE__ */ e.jsx(z, {}),
              " Trash"
            ] }),
            l.delete && x.trashed && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => N(`cms/comments/${x.id}/restore`), children: [
                /* @__PURE__ */ e.jsx(te, {}),
                " Restore"
              ] }),
              /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => p(
                "Delete this comment for good? Replies to it stay.",
                () => v.router.delete(k(`cms/comments/${x.id}/force`), { preserveScroll: !0 })
              ), children: [
                /* @__PURE__ */ e.jsx(z, {}),
                " Delete for good"
              ] })
            ] })
          ] })
        ] })
      ] }, x.id))
    ] }),
    (c.prev_page_url || c.next_page_url) && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:justify-end cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(s.Button, { variant: "outline", size: "sm", disabled: !c.prev_page_url, onClick: () => c.prev_page_url && v.router.get(c.prev_page_url), children: [
        /* @__PURE__ */ e.jsx(ue, {}),
        " Newer"
      ] }),
      /* @__PURE__ */ e.jsxs(s.Button, { variant: "outline", size: "sm", disabled: !c.next_page_url, onClick: () => c.next_page_url && v.router.get(c.next_page_url), children: [
        "Older ",
        /* @__PURE__ */ e.jsx(ae, {})
      ] })
    ] }),
    i && /* @__PURE__ */ e.jsx(Vt, { row: i.row, mode: i.mode, error: o.body, onClose: () => h(null) }, `${i.mode}-${i.row.id}`),
    C
  ] });
}
function Vt({ row: t, mode: a, error: n, onClose: r }) {
  const [c, l] = S.useState(a === "edit" ? t.body : ""), [o, u] = S.useState(!1), d = () => {
    u(!0);
    const m = { preserveScroll: !0, onSuccess: r, onFinish: () => u(!1) };
    a === "reply" ? v.router.post(k(`cms/comments/${t.id}/reply`), { body: c }, m) : v.router.put(k(`cms/comments/${t.id}`), { body: c }, m);
  };
  return /* @__PURE__ */ e.jsx(s.Dialog, { open: !0, onOpenChange: (m) => !m && r(), children: /* @__PURE__ */ e.jsxs(s.DialogContent, { children: [
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
        "aria-invalid": n !== void 0,
        onChange: (m) => l(m.target.value)
      }
    ),
    /* @__PURE__ */ e.jsx(T, { message: n }),
    /* @__PURE__ */ e.jsxs(s.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", onClick: r, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", disabled: c.trim() === "" || o, onClick: d, children: a === "reply" ? "Post reply" : "Save" })
    ] })
  ] }) });
}
const Ot = 3;
function Ut({ form: t, forms: a, submissions: n, can: r }) {
  s.useBreadcrumbs([{ label: "Submissions", href: k("cms/submissions") }, ...t ? [{ label: t.title }] : []]);
  const [c, l] = S.useState(null), [o, u] = R();
  if (!t || !n)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(v.Head, { title: "Submissions" }),
      /* @__PURE__ */ e.jsx(s.PageHeader, { title: "Submissions", description: "There are no forms yet. Create one under Structure → Forms and put it on a page; what visitors send shows up here." })
    ] });
  const d = (n.data[0]?.rows ?? []).slice(0, Ot), m = (g) => o(
    "Delete this submission for good? It can't be restored.",
    () => v.router.delete(k(`cms/submissions/${g.id}`), { preserveScroll: !0, onSuccess: () => l(null) })
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(v.Head, { title: `${t.title} submissions` }),
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: t.title,
        actions: n.total > 0 && /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: k(`cms/forms/${t.handle}/submissions/export`), children: [
          /* @__PURE__ */ e.jsx(Ve, {}),
          " Export CSV"
        ] }) }),
        children: a.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: t.handle, onValueChange: (g) => v.router.get(k(`cms/forms/${g}/submissions`)), children: [
          /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-56", "aria-label": "Form", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(s.SelectContent, { children: a.map((g) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: g.handle, children: [
            g.title,
            " (",
            g.count,
            ")"
          ] }, g.handle)) })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(s.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(s.Table, { children: [
      /* @__PURE__ */ e.jsx(s.TableHeader, { children: /* @__PURE__ */ e.jsxs(s.TableRow, { children: [
        /* @__PURE__ */ e.jsx(s.TableHead, { children: "Sent" }),
        d.map((g) => /* @__PURE__ */ e.jsx(s.TableHead, { children: g.label }, g.handle))
      ] }) }),
      /* @__PURE__ */ e.jsxs(s.TableBody, { children: [
        n.data.length === 0 && /* @__PURE__ */ e.jsx(s.TableRow, { children: /* @__PURE__ */ e.jsx(s.TableCell, { colSpan: d.length + 1, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: "Nothing sent yet." }) }),
        n.data.map((g) => /* @__PURE__ */ e.jsxs(s.TableRow, { children: [
          /* @__PURE__ */ e.jsx(s.TableCell, { className: "cms:whitespace-nowrap", children: /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:font-medium cms:hover:underline", onClick: () => l(g), children: G(g.createdAt) }) }),
          d.map((i) => /* @__PURE__ */ e.jsx(s.TableCell, { className: "cms:max-w-64 cms:truncate", children: g.rows.find((h) => h.handle === i.handle)?.value }, i.handle))
        ] }, g.id))
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
          s.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Previous page",
            disabled: !n.prev_page_url,
            onClick: () => n.prev_page_url && v.router.get(n.prev_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(ue, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          s.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Next page",
            disabled: !n.next_page_url,
            onClick: () => n.next_page_url && v.router.get(n.next_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(ae, {})
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(s.Dialog, { open: c !== null, onOpenChange: (g) => !g && l(null), children: /* @__PURE__ */ e.jsxs(s.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto", children: [
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
      r.delete && c && /* @__PURE__ */ e.jsx(s.DialogFooter, { children: /* @__PURE__ */ e.jsxs(s.Button, { variant: "destructive", onClick: () => m(c), children: [
        /* @__PURE__ */ e.jsx(z, {}),
        " Delete"
      ] }) })
    ] }) }),
    u
  ] });
}
function qt(t) {
  return /* @__PURE__ */ e.jsx(Wt, { ...t }, `${t.locale}:${t.version}:${JSON.stringify([t.values, t.seo, t.term.template])}`);
}
function Wt({ taxonomy: t, term: a, translated: n, fields: r, locale: c, locales: l, shared: o, sharedValues: u, values: d, seo: m, version: g }) {
  const i = k(`cms/taxonomies/${t.handle}/terms`), h = k(`cms/terms/${a.id}/content`);
  s.useBreadcrumbs([{ label: t.title, href: `${i}?locale=${c}` }, { label: a.title }]);
  const p = v.useForm({ locale: c, data: d, seo: m ?? {}, template: a.template ?? "", version: g }), C = p.errors, b = () => p.processing || p.put(h, { preserveScroll: !0 }), N = () => {
    p.transform((j) => ({ ...j, version: null })), p.put(h, { preserveScroll: !0 });
  };
  return s.useUnsavedChanges(p.isDirty, n ? b : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: (j) => {
    j.preventDefault(), b();
  }, className: "cms:flex cms:max-w-3xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(v.Head, { title: a.title }),
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: a.title,
        back: { href: `${i}?locale=${c}`, label: `Back to ${t.title}` },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          a.url && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: a.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(ne, {}),
            " View"
          ] }) }),
          l.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: c, onValueChange: (j) => v.router.get(k(`cms/terms/${a.id}/edit`), { locale: j }), children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(s.SelectContent, { children: l.map((j, f) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: j, children: [
              M(j),
              f === 0 ? " (main)" : ""
            ] }, j)) })
          ] }),
          n && /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: p.processing, children: [
            p.processing && /* @__PURE__ */ e.jsx(Y, { className: "cms:animate-spin" }),
            " Save"
          ] })
        ] }),
        children: p.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      }
    ),
    n ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      /* @__PURE__ */ e.jsx(xe, { message: C.version, processing: p.processing, onSaveMine: N }),
      r.length > 0 && /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsx(s.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: r.map((j) => o.includes(j.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(F, { id: `data-${j.handle}`, field: j, content: !0, value: u[j.handle], errors: {}, onChange: () => {
        } }),
        /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
          "Shared by all languages: edit it in ",
          M(l[0] ?? "en"),
          "."
        ] })
      ] }, j.handle) : /* @__PURE__ */ e.jsx(
        F,
        {
          id: `data-${j.handle}`,
          field: j,
          content: !0,
          value: p.data.data[j.handle],
          errors: I(C, `data.${j.handle}`),
          onChange: (f) => p.setData("data", { ...p.data.data, [j.handle]: f })
        },
        j.handle
      )) }) }),
      /* @__PURE__ */ e.jsxs(s.Card, { children: [
        /* @__PURE__ */ e.jsx(s.CardHeader, { children: /* @__PURE__ */ e.jsx(s.CardTitle, { className: "cms:text-base", children: "Search and sharing" }) }),
        /* @__PURE__ */ e.jsx(s.CardContent, { children: /* @__PURE__ */ e.jsx(ee, { id: "seo", fields: fs, value: p.data.seo, errors: I(C, "seo"), onChange: (j) => p.setData("seo", j) }) })
      ] }),
      /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsxs(s.CardContent, { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "template", children: "Template" }),
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            id: "template",
            className: "cms:font-mono",
            placeholder: "The taxonomy's",
            value: p.data.template,
            onChange: (j) => p.setData("template", j.target.value),
            "aria-invalid": C.template !== void 0
          }
        ),
        /* @__PURE__ */ e.jsx(T, { message: C.template })
      ] }) })
    ] }) : /* @__PURE__ */ e.jsxs("p", { className: "cms:text-muted-foreground", children: [
      "This term has no title in ",
      M(c),
      " yet: give it one in the list first."
    ] })
  ] });
}
const ie = "__top";
function Gt({ taxonomy: t, taxonomies: a, terms: n, locales: r, locale: c, trashed: l = !1 }) {
  s.useBreadcrumbs([{ label: "Terms", href: k("cms/terms") }, ...t ? [{ label: t.title }] : []]);
  const [o, u] = R(), [d, m] = S.useState(null);
  if (!t)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(v.Head, { title: "Terms" }),
      /* @__PURE__ */ e.jsx(s.PageHeader, { title: "Terms", description: "There are no taxonomies yet. Create one under Structure → Taxonomies (categories, tags…), then add its terms here." })
    ] });
  const g = k(`cms/taxonomies/${t.handle}/terms`);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(v.Head, { title: t.title }),
    u,
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: t.title,
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(s.Button, { variant: l ? "secondary" : "ghost", size: "sm", onClick: () => v.router.get(g, { locale: c, ...l ? {} : { trashed: 1 } }), children: l ? "Back to terms" : "Trash" }),
          r.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: c, onValueChange: (i) => v.router.get(g, { locale: i, ...l ? { trashed: 1 } : {} }), children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(s.SelectContent, { children: r.map((i) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: i, children: M(i) }, i)) })
          ] })
        ] }),
        children: a.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: t.handle, onValueChange: (i) => v.router.get(k(`cms/taxonomies/${i}/terms`)), children: [
          /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": "Taxonomy", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(s.SelectContent, { children: a.map((i) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: i.handle, children: i.title }, i.handle)) })
        ] })
      }
    ),
    !l && /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsx(s.CardContent, { children: /* @__PURE__ */ e.jsx(
      $e,
      {
        action: g,
        method: "post",
        locale: c,
        terms: n,
        hierarchical: t.hierarchical,
        submitLabel: "Add term"
      },
      `new-${n.length}`
    ) }) }),
    /* @__PURE__ */ e.jsx(s.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs("ul", { className: "cms:divide-y", children: [
      n.length === 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-6 cms:text-center cms:text-muted-foreground", children: l ? "The trash is empty." : "No terms yet." }),
      n.map((i) => {
        const h = n.filter((C) => C.parentId === i.parentId), p = h.findIndex((C) => C.id === i.id);
        return /* @__PURE__ */ e.jsx("li", { className: "cms:p-3", style: { paddingLeft: `${0.75 + i.depth * 1.5}rem` }, children: l ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
          /* @__PURE__ */ e.jsx("span", { className: "cms:flex-1 cms:font-medium", children: i.title ?? i.fallback }),
          /* @__PURE__ */ e.jsxs(s.Button, { variant: "outline", size: "sm", onClick: () => v.router.post(k(`cms/terms/${i.id}/restore`), {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(te, {}),
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
                () => v.router.delete(k(`cms/terms/${i.id}/force`), { preserveScroll: !0 })
              ),
              children: [
                /* @__PURE__ */ e.jsx(z, {}),
                " Delete for good"
              ]
            }
          )
        ] }) : d === i.id ? /* @__PURE__ */ e.jsx(
          $e,
          {
            action: k(`cms/terms/${i.id}`),
            method: "put",
            locale: c,
            terms: n,
            hierarchical: t.hierarchical,
            term: i,
            submitLabel: "Save",
            onDone: () => m(null)
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
              disabled: p === 0,
              onClick: () => v.router.post(k(`cms/terms/${i.id}/move`), { direction: "up" }, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(J, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            s.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-label": `Move ${i.fallback} down`,
              disabled: p === h.length - 1,
              onClick: () => v.router.post(k(`cms/terms/${i.id}/move`), { direction: "down" }, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(K, {})
            }
          ),
          /* @__PURE__ */ e.jsx(s.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Rename ${i.fallback}`, onClick: () => m(i.id), children: /* @__PURE__ */ e.jsx(es, {}) }),
          t.pages && i.title !== null && /* @__PURE__ */ e.jsx(s.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Edit ${i.fallback}'s page`, asChild: !0, children: /* @__PURE__ */ e.jsx(v.Link, { href: k(`cms/terms/${i.id}/edit`) + `?locale=${c}`, children: /* @__PURE__ */ e.jsx(Ws, {}) }) }),
          /* @__PURE__ */ e.jsx(
            s.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Move ${i.fallback} to the trash`,
              onClick: () => o(
                `Move "${i.fallback}" to the trash, with the terms under it? It comes off the site; you can restore it.`,
                () => v.router.delete(k(`cms/terms/${i.id}`), { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(z, {})
            }
          )
        ] }) }, i.id);
      })
    ] }) })
  ] });
}
function $e({ action: t, method: a, locale: n, terms: r, hierarchical: c, term: l, submitLabel: o, onDone: u }) {
  const d = v.useForm({ title: l?.title ?? "", slug: l?.slug ?? "", parent_id: l?.parentId ?? null, locale: n, version: l?.version ?? null }), m = d.errors, g = /* @__PURE__ */ new Set();
  if (l) {
    g.add(l.id);
    const p = r.findIndex((C) => C.id === l.id);
    for (let C = p + 1; C < r.length && (r[C]?.depth ?? 0) > l.depth; C++) g.add(r[C].id);
  }
  const i = (p) => {
    p.preventDefault(), d.submit(a, t, { preserveScroll: !0, onSuccess: () => {
      a === "post" && d.reset("title", "slug"), u?.();
    } });
  }, h = l ? `term-${l.id}` : "new-term";
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: i, className: "cms:grid cms:items-start cms:gap-3 cms:md:grid-cols-[2fr_1.5fr_1.5fr_auto]", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${h}-title`, className: l ? "cms:sr-only" : "", children: "Title" }),
      /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: `${h}-title`,
          value: d.data.title,
          placeholder: l?.fallback,
          required: !0,
          onChange: (p) => d.setData("title", p.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(T, { message: m.title ?? m.version })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${h}-slug`, className: l ? "cms:sr-only" : "", children: "Slug" }),
      /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: `${h}-slug`,
          className: "cms:font-mono",
          value: d.data.slug,
          placeholder: "Made from the title",
          onChange: (p) => d.setData("slug", p.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(T, { message: m.slug })
    ] }),
    c ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${h}-parent`, className: l ? "cms:sr-only" : "", children: "Under" }),
      /* @__PURE__ */ e.jsxs(
        s.Select,
        {
          value: d.data.parent_id === null ? ie : String(d.data.parent_id),
          onValueChange: (p) => d.setData("parent_id", p === ie ? null : Number(p)),
          children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: `${h}-parent`, children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(s.SelectItem, { value: ie, children: "Top level" }),
              r.filter((p) => !g.has(p.id)).map((p) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: String(p.id), children: [
                "— ".repeat(p.depth),
                p.title ?? p.fallback
              ] }, p.id))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ e.jsx(T, { message: m.parent_id })
    ] }) : /* @__PURE__ */ e.jsx("div", {}),
    /* @__PURE__ */ e.jsxs("div", { className: `cms:flex cms:gap-2 ${l ? "" : "cms:md:mt-6"}`, children: [
      /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: d.processing, children: [
        !l && /* @__PURE__ */ e.jsx(P, {}),
        " ",
        o
      ] }),
      u && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", onClick: u, children: "Cancel" })
    ] })
  ] });
}
$s({
  pages: {
    "Cms/Blueprints/Index": jt,
    "Cms/Blueprints/Form": gt,
    "Cms/Fieldsets/Index": $t,
    "Cms/Entries/Index": Nt,
    "Cms/Entries/Editor": ft,
    "Cms/Entries/Listing": kt,
    "Cms/Terms/Index": Gt,
    "Cms/Terms/Edit": qt,
    "Cms/Globals/Index": Dt,
    "Cms/Globals/Edit": wt,
    "Cms/Menus/Index": Ht,
    "Cms/Menus/Edit": Lt,
    "Cms/Comments/Index": Rt,
    "Cms/Submissions/Index": Ut
  }
});
s.registerCommandSource((t, a) => zs(t, a, k));
export {
  Zs as L,
  S as R,
  de as U,
  Kt as _,
  Ks as a,
  k as b,
  D as c,
  Ts as i,
  e as j,
  s as u
};
