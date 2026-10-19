function Cs(t, a) {
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
const xe = 1;
function Se() {
  const t = globalThis.Sunrice;
  if (!t)
    throw new Error("[sunrice] This script runs outside the Sunrice admin panel (window.Sunrice is missing).");
  return t;
}
function ks(t) {
  const a = Se();
  if (a.version !== xe)
    throw new Error(`[sunrice] This plugin was built for admin runtime ${xe}, but the panel runs ${a.version}. Rebuild it with a matching @sunrice/admin-sdk.`);
  for (const [l, r] of Object.entries(t.pages ?? {}))
    a.registerPage(l, r);
}
function y(t = "") {
  return Se().adminUrl(t);
}
const we = globalThis.Sunrice;
if (!we) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const e = we.modules["react/jsx-runtime"], $e = globalThis.Sunrice;
if (!$e) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const k = $e.modules.react, Vt = /* @__PURE__ */ Cs({
  __proto__: null
}, [k]), _e = globalThis.Sunrice;
if (!_e) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const f = _e.modules["@inertiajs/react"];
const Ss = (t) => t?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
function ws(t, a, l = []) {
  if (a == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: Ss(t),
    size: 24,
    node: a,
    ...l.length > 0 ? { aliases: l } : {}
  };
}
const $s = (t) => {
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
const _s = (t) => {
  const a = $s(t);
  return a.charAt(0).toUpperCase() + a.slice(1);
};
const oe = (...t) => t.filter((a, l, r) => !!a && a.trim() !== "" && r.indexOf(a) === l).join(" ").trim();
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
function Ds(t, a = {}) {
  const l = a.attributeNames ?? {}, r = (d) => l[d] ?? d, c = t.size ?? t.width ?? O.width, n = t.size ?? t.height ?? O.height, i = t.aliases?.filter((d) => typeof d == "string" && d.trim() !== "").map((d) => `lucide-${d}`) ?? [], u = [...t.name ? [`lucide-${t.name}`] : [], ...i], p = a.className?.split(" ").filter(Boolean) ?? [], x = a.includeDefaultClasses === !1 ? oe(...p) : oe("lucide", ...u, ...p), g = a.absoluteStrokeWidth ? Number(a.strokeWidth ?? O["stroke-width"]) * Number(t.size ?? t.width ?? O.width) / Number(a.size ?? a.width ?? O.width) : a.strokeWidth ?? O["stroke-width"];
  return [
    "svg",
    {
      ...Object.entries(O).reduce((d, [j, b]) => (d[r(j)] = b, d), {}),
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
      ...x && {
        [r("class")]: x
      },
      [r("viewBox")]: `0 0 ${c} ${n}`,
      ...a.hasA11yProp === !1 ? {
        [r("aria-hidden")]: "true"
      } : {},
      ..."attributes" in a && a.attributes
    },
    t.node.map((d) => {
      const [j, b, m] = d, N = a.nonScalingStroke ? { [r("vector-effect")]: "non-scaling-stroke", ...b } : b;
      return m ? [j, N, m] : [j, N];
    })
  ];
}
function Ts(t, a = {}) {
  return Ds(t, {
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
const Bs = (t) => {
  for (const a in t)
    if (a.startsWith("aria-") || a === "role" || a === "title")
      return !0;
  return !1;
}, zs = k.createContext({}), Ls = () => k.useContext(zs), Ms = k.forwardRef(
  ({
    color: t,
    size: a,
    width: l,
    height: r,
    strokeWidth: c,
    absoluteStrokeWidth: n,
    nonScalingStroke: i,
    className: u = "",
    children: p,
    iconNode: x = [],
    icon: g = {
      node: x,
      aliases: [],
      size: 24
    },
    ...o
  }, d) => {
    const {
      size: j = 24,
      strokeWidth: b = 2,
      absoluteStrokeWidth: m = !1,
      nonScalingStroke: N = !1,
      color: T = "currentColor",
      className: C = ""
    } = Ls() ?? {}, w = !!p || Bs(o), [h, v, _ = []] = Ts(g, {
      color: t ?? T,
      width: l ?? a ?? j,
      height: r ?? a ?? j,
      strokeWidth: c ?? b,
      absoluteStrokeWidth: n ?? m,
      nonScalingStroke: i ?? N,
      className: oe(C, u),
      hasA11yProp: w,
      attributes: o
    });
    return k.createElement(
      h,
      {
        ref: d,
        ...v
      },
      [
        ..._.map(([B, M]) => k.createElement(B, M)),
        ...Array.isArray(p) ? p : [p]
      ]
    );
  }
);
function $(t, a = [], l = []) {
  const r = typeof t == "string" ? ws(t, a, l) : t, c = k.forwardRef(
    ({ className: n, ...i }, u) => k.createElement(Ms, {
      ref: u,
      icon: r,
      className: n,
      ...i
    })
  );
  return r.name && (c.displayName = _s(r.name)), c;
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
const K = $(De);
const Te = {
  name: "arrow-left",
  size: 24,
  node: [
    ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
    ["path", { d: "M19 12H5", key: "x3x0zl" }]
  ]
};
Te.node;
const J = $(Te);
const Be = {
  name: "arrow-up",
  size: 24,
  node: [
    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
    ["path", { d: "M12 19V5", key: "x0mq9r" }]
  ]
};
Be.node;
const Y = $(Be);
const ze = {
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
ze.node;
const Is = $(ze);
const Le = {
  name: "check",
  size: 24,
  node: [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]
};
Le.node;
const pe = $(Le);
const Me = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
Me.node;
const Ie = $(Me);
const Ae = {
  name: "chevron-left",
  size: 24,
  node: [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]]
};
Ae.node;
const me = $(Ae);
const Ee = {
  name: "chevron-right",
  size: 24,
  node: [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]
};
Ee.node;
const ae = $(Ee);
const Fe = {
  name: "copy",
  size: 24,
  node: [
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
  ]
};
Fe.node;
const As = $(Fe);
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
const Re = $(He);
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
const le = $(Ve);
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
const Es = $(Oe);
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
const Fs = $(Pe);
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
const Hs = $(Ue);
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
const Rs = $(qe);
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
const Vs = $(We);
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
const Os = $(Ge);
const Ke = {
  name: "loader-circle",
  size: 24,
  node: [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  aliases: ["loader-2"]
};
Ke.node;
const Z = $(Ke);
const Je = {
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
Je.node;
const Ps = $(Je);
const Ye = {
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
Ye.node;
const Ze = $(Ye);
const Xe = {
  name: "plus",
  size: 24,
  node: [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ]
};
Xe.node;
const R = $(Xe);
const Qe = {
  name: "rotate-ccw",
  size: 24,
  node: [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ]
};
Qe.node;
const te = $(Qe);
const es = {
  name: "search",
  size: 24,
  node: [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ]
};
es.node;
const ss = $(es);
const ts = {
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
ts.node;
const ge = $(ts);
const as = {
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
as.node;
const z = $(as);
const ls = {
  name: "undo-2",
  size: 24,
  node: [
    ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
    ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
  ]
};
ls.node;
const de = $(ls);
const ns = {
  name: "x",
  size: 24,
  node: [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]
};
ns.node;
const Us = $(ns), cs = globalThis.Sunrice;
if (!cs) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const s = cs.modules["@sunrice/admin-sdk/ui"];
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
const qs = 5;
let Ws = 0;
const rs = () => `f${++Ws}`;
function is(t) {
  return t.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function os(t, a) {
  const l = new Set(a.map((n) => n.handle)), r = is(t) || "field";
  let c = r;
  for (let n = 2; l.has(c); n++)
    c = `${r}_${n}`;
  return c;
}
function ds(t) {
  return (t ?? []).map(({ fields: a, ...l }) => ({
    ...l,
    key: rs(),
    fields: ds(a),
    handleTouched: !0
  }));
}
function ms(t, a) {
  return t.map(({ key: l, handleTouched: r, fields: c, ...n }) => ({
    ...n,
    validation: (n.validation ?? []).map((i) => i.trim()).filter((i) => i !== ""),
    ...a(n.type) ? { fields: ms(c, a) } : {}
  }));
}
function Gs(t, a, l) {
  return { key: rs(), type: t, label: a, handle: os(a, l), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function q(t, a, l) {
  const r = a + l;
  if (a < 0 || a >= t.length || r < 0 || r >= t.length) return t;
  const c = t.slice(), [n] = c.splice(a, 1);
  return c.splice(r, 0, n), c;
}
function Ks(t, a, l) {
  if (t.handleTouched) return { ...t, label: a };
  const r = l.filter((c) => c.key !== t.key);
  return { ...t, label: a, handle: os(a || t.type, r) };
}
function ne(t, a) {
  const l = `${a}.`, r = {};
  for (const [c, n] of Object.entries(t))
    c.startsWith(l) && (r[c.slice(l.length)] = n);
  return r;
}
function I(t, a) {
  const l = t[a];
  return { ...ne(t, a), ...l !== void 0 ? { "": l } : {} };
}
function je(t, a) {
  return Object.keys(t).some((l) => l === a || l.startsWith(`${a}.`));
}
function Q(t) {
  return t && typeof t == "object" && !Array.isArray(t) ? t : {};
}
function Js(t, a) {
  if (typeof t != "string" || t === "") return "";
  const l = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(t);
  return l ? a ? `${l[1]}T${l[2] ?? "00:00"}` : l[1] ?? "" : "";
}
function Ys(t) {
  return t === "" ? null : t;
}
function Zs() {
  return { _hidden: !1 };
}
function Xs(t) {
  return { type: t, hidden: !1, values: {} };
}
function Qs(t) {
  const a = t.replace(/[\u0000- \u007f]+/g, ""), l = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(a);
  return l ? ["http", "https", "mailto", "tel"].includes(l[1].toLowerCase()) : !a.includes("\\");
}
function us({ ids: t, search: a, collections: l }) {
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
function et(t) {
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
async function fe(t) {
  const a = await fetch(`${y("cms/entry-picker")}?${us(t)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!a.ok) throw new Error(String(a.status));
  return (await a.json()).items;
}
function ue({ id: t, value: a, multiple: l, max: r, collections: c, invalid: n, onChange: i }) {
  const u = a === null ? [] : Array.isArray(a) ? a : [a], [p, x] = k.useState({}), [g, o] = k.useState(""), [d, j] = k.useState(null), [b, m] = k.useState(!1), N = l && r !== null && u.length >= r, T = u.filter((h) => !p[h]).join(",");
  k.useEffect(() => {
    T !== "" && fe({ ids: T.split(",").map(Number), collections: c }).then((h) => x((v) => ({ ...v, ...Object.fromEntries(h.map((_) => [_.id, _])) }))).catch(() => m(!0));
  }, [T]), k.useEffect(() => {
    if (g.trim() === "") {
      j(null);
      return;
    }
    const h = window.setTimeout(() => {
      fe({ search: g.trim(), collections: c }).then((v) => {
        j(v), m(!1);
      }).catch(() => m(!0));
    }, 250);
    return () => window.clearTimeout(h);
  }, [g]);
  const C = (h) => {
    x((v) => ({ ...v, [h.id]: h })), i(l ? [...u, h.id] : h.id), o("");
  }, w = (h) => i(l ? h : h[0] ?? null);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    u.length > 0 && /* @__PURE__ */ e.jsx("ul", { className: "cms:flex cms:flex-col cms:gap-1", children: u.map((h, v) => {
      const _ = p[h];
      return /* @__PURE__ */ e.jsxs("li", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-md cms:border cms:px-3 cms:py-1.5 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate", children: _ ? _.title : `Entry #${h}` }),
        _ && /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: _.collection }),
        _ && /* @__PURE__ */ e.jsx(s.Badge, { variant: _.status === "published" ? "default" : "secondary", children: W(_.status) }),
        l && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(
            s.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-7",
              "aria-label": `Move ${_?.title ?? h} up`,
              disabled: v === 0,
              onClick: () => w(q(u, v, -1)),
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
              "aria-label": `Move ${_?.title ?? h} down`,
              disabled: v === u.length - 1,
              onClick: () => w(q(u, v, 1)),
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
            "aria-label": `Remove ${_?.title ?? h}`,
            onClick: () => w(u.filter((B) => B !== h)),
            children: /* @__PURE__ */ e.jsx(Us, {})
          }
        )
      ] }, h);
    }) }),
    !N && (l || u.length === 0) && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-md", children: [
      /* @__PURE__ */ e.jsx(ss, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
      /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: t,
          className: "cms:pl-9",
          placeholder: "Search entries by title",
          "aria-invalid": n,
          value: g,
          autoComplete: "off",
          onChange: (h) => o(h.target.value)
        }
      ),
      d !== null && /* @__PURE__ */ e.jsxs("ul", { role: "listbox", "aria-label": "Matching entries", className: "cms:absolute cms:z-10 cms:mt-1 cms:max-h-64 cms:w-full cms:overflow-auto cms:rounded-md cms:border cms:bg-card cms:p-1 cms:shadow-md", children: [
        d.filter((h) => !u.includes(h.id)).length === 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: "No entries match." }),
        d.filter((h) => !u.includes(h.id)).map((h) => /* @__PURE__ */ e.jsx("li", { role: "option", "aria-selected": !1, children: /* @__PURE__ */ e.jsxs(
          "button",
          {
            type: "button",
            className: "cms:flex cms:w-full cms:items-center cms:gap-2 cms:rounded cms:px-2 cms:py-1.5 cms:text-left cms:text-sm cms:hover:bg-accent",
            onClick: () => C(h),
            children: [
              /* @__PURE__ */ e.jsx("span", { className: "cms:flex-1 cms:truncate", children: h.title }),
              /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: h.collection })
            ]
          }
        ) }, h.id))
      ] })
    ] }),
    b && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "Entries could not be loaded. Try again." })
  ] });
}
const st = k.lazy(() => import("./RichTextEditor-CcgrjKSm.js").then((t) => ({ default: t.RichTextEditor }))), re = "__none";
function D({ message: t }) {
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
const tt = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function at(t) {
  if (t.label) return t.label;
  const a = t.handle.replace(/_/g, " ");
  return a.charAt(0).toUpperCase() + a.slice(1);
}
function A({ field: t, value: a, onChange: l, errors: r, id: c, content: n = !1 }) {
  const i = at(t), u = tt.includes(t.type) || ["select", "terms"].includes(t.type) && t.config?.multiple === !0;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", ...u ? { role: "group", "aria-labelledby": `${c}-label` } : {}, children: [
    t.type === "toggle" ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(s.Switch, { id: c, checked: a === !0, onCheckedChange: (p) => l(p) }),
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: c, children: i })
    ] }) : /* @__PURE__ */ e.jsxs(s.Label, { id: `${c}-label`, htmlFor: u ? void 0 : c, children: [
      i,
      t.required && /* @__PURE__ */ e.jsx("span", { className: "cms:text-destructive", children: " *" })
    ] }),
    /* @__PURE__ */ e.jsx(lt, { field: t, value: a, onChange: l, errors: r, id: c, content: n }),
    t.instructions && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t.instructions }),
    /* @__PURE__ */ e.jsx(D, { message: r[""] })
  ] });
}
function lt({ field: t, value: a, onChange: l, errors: r, id: c, content: n }) {
  const i = r[""] !== void 0;
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
          "aria-invalid": i,
          value: typeof a == "string" ? a : "",
          rows: P(t, "rows") ?? 4,
          onChange: (u) => l(u.target.value)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ e.jsx(k.Suspense, { fallback: /* @__PURE__ */ e.jsx(s.Skeleton, { className: "cms:h-48 cms:w-full" }), children: /* @__PURE__ */ e.jsx(st, { id: c, labelledBy: `${c}-label`, invalid: i, value: typeof a == "string" ? a : "", onChange: l }) });
    case "number":
      return /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: c,
          type: "number",
          className: "cms:max-w-48",
          "aria-invalid": i,
          value: typeof a == "number" ? String(a) : typeof a == "string" ? a : "",
          min: P(t, "min"),
          max: P(t, "max"),
          step: P(t, "step") ?? "any",
          onChange: (u) => l(u.target.value === "" ? null : Number(u.target.value))
        }
      );
    case "date": {
      const u = t.config?.time === !0;
      return /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: c,
          type: u ? "datetime-local" : "date",
          className: "cms:max-w-64",
          "aria-invalid": i,
          value: Js(a, u),
          onChange: (p) => l(Ys(p.target.value))
        }
      );
    }
    case "select":
      return t.config?.multiple === !0 ? /* @__PURE__ */ e.jsx(Ne, { options: be(t), value: Array.isArray(a) ? a.map(String) : [], onChange: l }) : /* @__PURE__ */ e.jsx(ve, { options: be(t), value: typeof a == "string" ? a : null, onChange: l, id: c, required: t.required === !0 });
    case "terms": {
      const u = t.terms ?? [];
      if (t.config?.multiple === !0) {
        const p = Array.isArray(a) ? a.map(String) : [];
        return /* @__PURE__ */ e.jsx(Ne, { options: u, value: p, onChange: (x) => l(x.map(Number)) });
      }
      return /* @__PURE__ */ e.jsx(
        ve,
        {
          options: u,
          id: c,
          required: t.required === !0,
          value: a == null ? null : String(a),
          onChange: (p) => l(p === null ? null : Number(p))
        }
      );
    }
    case "entries":
      return /* @__PURE__ */ e.jsx(
        ue,
        {
          id: c,
          invalid: i,
          multiple: t.config?.multiple === !0,
          max: P(t, "max") ?? null,
          collections: t.collections ?? [],
          onChange: l,
          value: typeof a == "number" || Array.isArray(a) && a.every((u) => typeof u == "number") ? a : null
        }
      );
    case "link":
      return /* @__PURE__ */ e.jsx(ct, { value: Q(a), onChange: l, errors: r, id: c });
    case "media":
      return /* @__PURE__ */ e.jsx(
        s.MediaPickerInput,
        {
          id: c,
          invalid: i,
          disabled: !1,
          multiple: t.config?.multiple === !0,
          max: P(t, "max") ?? null,
          types: Array.isArray(t.config?.types) ? t.config.types : [],
          value: typeof a == "number" || Array.isArray(a) && a.every((u) => typeof u == "number") ? a : null,
          onChange: l
        }
      );
    case "group":
      return /* @__PURE__ */ e.jsx(se, { fields: t.fields ?? [], value: Q(a), onChange: l, errors: r, id: c, content: n });
    case "repeater":
      return /* @__PURE__ */ e.jsx(it, { field: t, value: Array.isArray(a) ? a : [], onChange: l, errors: r, id: c, content: n });
    case "flexible":
      return /* @__PURE__ */ e.jsx(ot, { field: t, value: Array.isArray(a) ? a : [], onChange: l, errors: r, id: c });
    default:
      return /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: c,
          "aria-invalid": i,
          value: typeof a == "string" ? a : "",
          placeholder: nt(t, "placeholder"),
          maxLength: P(t, "max"),
          onChange: (u) => l(u.target.value)
        }
      );
  }
}
function P(t, a) {
  const l = t.config?.[a];
  return typeof l == "number" ? l : void 0;
}
function nt(t, a) {
  const l = t.config?.[a];
  return typeof l == "string" ? l : void 0;
}
function se({ fields: t, value: a, onChange: l, errors: r, id: c, content: n }) {
  return /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-4 cms:rounded-lg cms:border cms:p-4", children: t.map((i) => /* @__PURE__ */ e.jsx(
    A,
    {
      id: `${c}-${i.handle}`,
      field: i,
      value: a[i.handle],
      content: n,
      errors: I(r, i.handle),
      onChange: (u) => l({ ...a, [i.handle]: u })
    },
    i.handle
  )) });
}
function ve({ options: t, value: a, onChange: l, id: r, required: c }) {
  return /* @__PURE__ */ e.jsxs(s.Select, { value: a ?? re, onValueChange: (n) => l(n === re ? null : n), children: [
    /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: r, className: "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
    /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
      !c && /* @__PURE__ */ e.jsx(s.SelectItem, { value: re, children: "None" }),
      t.map((n) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: n.value, children: n.label }, n.value))
    ] })
  ] });
}
function Ne({ options: t, value: a, onChange: l }) {
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
function ct({ value: t, onChange: a, errors: l, id: r }) {
  const c = (n, i) => {
    const u = { ...t, [n]: i };
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
    /* @__PURE__ */ e.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ e.jsx(D, { message: l.url ?? l.label }) })
  ] });
}
function rt(t, a) {
  return !a && (t.fields ?? []).every((l) => l.type === "text");
}
function it({ field: t, value: a, onChange: l, errors: r, id: c, content: n = !1 }) {
  const i = t.fields ?? [], u = a.map(Q), p = (o, d) => l(u.map((j, b) => b === o ? d : j)), x = (t.label || "row").toLowerCase().replace(/s$/, ""), g = x.charAt(0).toUpperCase() + x.slice(1);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    u.map((o, d) => rt(t, n) ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
      i.map((j) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            "aria-label": j.label || j.handle,
            placeholder: j.label || j.handle,
            value: typeof o[j.handle] == "string" ? o[j.handle] : "",
            onChange: (b) => p(d, { ...o, [j.handle]: b.target.value })
          }
        ),
        /* @__PURE__ */ e.jsx(D, { message: r[`${d}.${j.handle}`] })
      ] }, j.handle)),
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": `Remove ${x} ${d + 1}`, onClick: () => l(u.filter((j, b) => b !== d)), children: /* @__PURE__ */ e.jsx(z, {}) })
    ] }, d) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(
        hs,
        {
          label: `${g} ${d + 1}`,
          index: d,
          count: u.length,
          onMove: (j) => l(q(u, d, j)),
          onRemove: () => l(u.filter((j, b) => b !== d)),
          hidden: n ? o._hidden === !0 : void 0,
          onHidden: (j) => p(d, { ...o, _hidden: j })
        }
      ),
      /* @__PURE__ */ e.jsx(se, { fields: i, value: o, onChange: (j) => p(d, j), errors: I(r, String(d)), id: `${c}-${d}`, content: n })
    ] }, typeof o._id == "string" ? o._id : d)),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", size: "sm", onClick: () => l([...u, n ? Zs() : {}]), children: [
      /* @__PURE__ */ e.jsx(R, {}),
      " Add ",
      x
    ] }) })
  ] });
}
function ot({ field: t, value: a, onChange: l, errors: r, id: c }) {
  const n = t.blocks ?? [], i = a.map(Q), u = (p, x) => l(i.map((g, o) => o === p ? x : g));
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    i.map((p, x) => {
      const g = n.find((o) => o.type === p.type);
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(
          hs,
          {
            label: g?.label ?? String(p.type),
            badge: !0,
            index: x,
            count: i.length,
            onMove: (o) => l(q(i, x, o)),
            onRemove: () => l(i.filter((o, d) => d !== x)),
            hidden: p.hidden === !0,
            onHidden: (o) => u(x, { ...p, hidden: o })
          }
        ),
        g ? /* @__PURE__ */ e.jsx(
          se,
          {
            fields: g.fields,
            value: Q(p.values),
            onChange: (o) => u(x, { ...p, values: o }),
            errors: I(r, `${x}.values`),
            id: `${c}-${x}`,
            content: !0
          }
        ) : /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: "This kind of block no longer exists. Its values are kept." }),
        /* @__PURE__ */ e.jsx(D, { message: r[`${x}.type`] })
      ] }, typeof p.id == "string" ? p.id : x);
    }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(s.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(s.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", size: "sm", disabled: n.length === 0, children: [
        /* @__PURE__ */ e.jsx(R, {}),
        " Add block"
      ] }) }),
      /* @__PURE__ */ e.jsx(s.DropdownMenuContent, { align: "start", children: n.map((p) => /* @__PURE__ */ e.jsx(s.DropdownMenuItem, { onSelect: () => l([...i, Xs(p.type)]), children: p.label }, p.type)) })
    ] }) })
  ] });
}
function hs({ label: t, badge: a = !1, index: l, count: r, onMove: c, onRemove: n, hidden: i, onHidden: u }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    a ? /* @__PURE__ */ e.jsx(s.Badge, { variant: "secondary", children: t }) : /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:font-medium", children: t }),
    i !== void 0 && /* @__PURE__ */ e.jsxs("label", { className: "cms:ml-auto cms:flex cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", children: [
      /* @__PURE__ */ e.jsx(s.Switch, { checked: !i, onCheckedChange: (p) => u(!p), "aria-label": `Show ${t}` }),
      "Show"
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: i === void 0 ? "cms:ml-auto cms:flex" : "cms:flex", children: [
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Move ${t} up`, disabled: l === 0, onClick: () => c(-1), children: /* @__PURE__ */ e.jsx(Y, {}) }),
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Move ${t} down`, disabled: l === r - 1, onClick: () => c(1), children: /* @__PURE__ */ e.jsx(K, {}) }),
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": `Remove ${t}`, onClick: n, children: /* @__PURE__ */ e.jsx(z, {}) })
    ] })
  ] });
}
function xs({ fields: t, onChange: a, types: l, errors: r, depth: c = 1, idPrefix: n = "field" }) {
  const [i, u] = k.useState(() => /* @__PURE__ */ new Set()), p = (o) => u((d) => {
    const j = new Set(d);
    return j.has(o) ? j.delete(o) : j.add(o), j;
  }), x = (o, d) => a(t.map((j, b) => b === o ? d : j)), g = (o) => {
    const d = Gs(o.type, o.label, t);
    a([...t, d]), u((j) => new Set(j).add(d.key));
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    t.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:border-dashed cms:p-4 cms:text-sm cms:text-muted-foreground", children: "No fields yet." }),
    t.map((o, d) => {
      const j = l.find((N) => N.type === o.type), b = i.has(o.key) || je(r, String(d)), m = `${n}-${o.key}`;
      return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${je(r, String(d)) ? "cms:border-destructive" : ""}`, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:p-2", children: [
          /* @__PURE__ */ e.jsx(
            s.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-expanded": b,
              "aria-controls": m,
              "aria-label": `${b ? "Close" : "Open"} ${o.label || o.handle}`,
              onClick: () => p(o.key),
              children: b ? /* @__PURE__ */ e.jsx(Ie, {}) : /* @__PURE__ */ e.jsx(ae, {})
            }
          ),
          /* @__PURE__ */ e.jsxs("button", { type: "button", className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:text-left", onClick: () => p(o.key), children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: o.label || o.handle }),
            /* @__PURE__ */ e.jsx("code", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", children: o.handle })
          ] }),
          o.required && /* @__PURE__ */ e.jsx(s.Badge, { variant: "outline", children: "Required" }),
          /* @__PURE__ */ e.jsx(s.Badge, { variant: "secondary", children: j?.label ?? o.type }),
          /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move up", disabled: d === 0, onClick: () => a(q(t, d, -1)), children: /* @__PURE__ */ e.jsx(Y, {}) }),
          /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move down", disabled: d === t.length - 1, onClick: () => a(q(t, d, 1)), children: /* @__PURE__ */ e.jsx(K, {}) }),
          /* @__PURE__ */ e.jsx(
            s.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Remove ${o.label || o.handle}`,
              onClick: () => a(t.filter((N, T) => T !== d)),
              children: /* @__PURE__ */ e.jsx(z, {})
            }
          )
        ] }),
        b && /* @__PURE__ */ e.jsx(
          dt,
          {
            id: m,
            field: o,
            type: j,
            siblings: t,
            onChange: (N) => x(d, N),
            types: l,
            errors: ne(r, String(d)),
            depth: c
          }
        )
      ] }, o.key);
    }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(s.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(s.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", size: "sm", children: [
        /* @__PURE__ */ e.jsx(R, {}),
        " Add field"
      ] }) }),
      /* @__PURE__ */ e.jsx(s.DropdownMenuContent, { align: "start", children: l.filter((o) => !o.hasChildren || c < qs).map((o) => /* @__PURE__ */ e.jsx(s.DropdownMenuItem, { onSelect: () => g(o), children: o.label }, o.type)) })
    ] }) })
  ] });
}
const H = { default: "__default", yes: "yes", no: "no" };
function dt({ id: t, field: a, type: l, siblings: r, onChange: c, types: n, errors: i, depth: u }) {
  const p = a.config ?? {};
  return /* @__PURE__ */ e.jsxs("div", { id: t, className: "cms:flex cms:flex-col cms:gap-4 cms:border-t cms:p-4", children: [
    !l && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-destructive", children: [
      'The field type "',
      a.type,
      `" isn't registered. Its data is kept; register the type or remove the field.`
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${t}-label`, children: "Label" }),
        /* @__PURE__ */ e.jsx(s.Input, { id: `${t}-label`, value: a.label ?? "", onChange: (x) => c(Ks(a, x.target.value, r)) }),
        /* @__PURE__ */ e.jsx(D, { message: i.label })
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
        /* @__PURE__ */ e.jsx(D, { message: i.handle })
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
      /* @__PURE__ */ e.jsx(D, { message: i.instructions })
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
        value: p[x.handle],
        errors: I(i, `config.${x.handle}`),
        onChange: (g) => c({ ...a, config: { ...p, [x.handle]: g } })
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
      /* @__PURE__ */ e.jsx(D, { message: i.validation ?? Object.entries(i).find(([x]) => x.startsWith("validation."))?.[1] })
    ] }),
    l?.hasChildren && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(s.Label, { children: "Fields inside" }),
      /* @__PURE__ */ e.jsx(
        xs,
        {
          fields: a.fields,
          onChange: (x) => c({ ...a, fields: x }),
          types: n,
          errors: ne(i, "fields"),
          depth: u + 1,
          idPrefix: t
        }
      ),
      /* @__PURE__ */ e.jsx(D, { message: i.fields })
    ] }),
    /* @__PURE__ */ e.jsx(D, { message: i.type })
  ] });
}
function mt({ kind: t = "blueprint", blueprint: a, fieldTypes: l, usedBy: r = [] }) {
  const c = t === "fieldset" ? "Fieldset" : "Blueprint", n = y(t === "fieldset" ? "cms/fieldsets" : "cms/blueprints"), i = a ? a.title : `New ${c.toLowerCase()}`;
  s.useBreadcrumbs([{ label: `${c}s`, href: n }, { label: i }]);
  const [u, p] = U(), x = f.useForm({ title: a?.title ?? "", handle: a?.handle ?? "" }), [g, o] = k.useState(a !== null), [d, j] = k.useState(() => ds(a?.fields)), b = (B) => l.find((M) => M.type === B)?.hasChildren === !0, m = x.errors, [N, T] = k.useState(() => JSON.stringify(d)), C = x.isDirty || JSON.stringify(d) !== N, w = () => {
    x.setDefaults(), T(JSON.stringify(d));
  }, h = () => {
    x.processing || (x.transform((B) => ({
      ...a ? { title: B.title } : B,
      fields: ms(d, b)
    })), a ? x.put(`${n}/${a.id}`, { preserveScroll: !0, onSuccess: w }) : x.post(n, { onSuccess: w }));
  }, v = (B) => {
    B.preventDefault(), h();
  };
  s.useUnsavedChanges(C, h);
  const _ = () => a && u(
    `Delete the ${c.toLowerCase()} "${a.title}"? Content keeps its values.`,
    () => f.router.delete(`${n}/${a.id}`, { preserveScroll: !0 })
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: v, className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: i }),
    p,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: n, "aria-label": `Back to ${c.toLowerCase()}s`, children: /* @__PURE__ */ e.jsx(J, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: i })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        a && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", size: "icon", className: "cms:text-destructive", "aria-label": `Delete ${i}`, onClick: _, children: /* @__PURE__ */ e.jsx(z, {}) }),
        /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: x.processing, children: [
          x.processing && /* @__PURE__ */ e.jsx(Z, { className: "cms:animate-spin" }),
          a ? "Save" : `Create ${c.toLowerCase()}`
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(D, { message: m.blueprint ?? m.fieldset }),
    /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsxs(s.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "title", children: "Title" }),
        /* @__PURE__ */ e.jsx(s.Input, { id: "title", value: x.data.title, required: !0, onChange: (B) => {
          x.setData((M) => ({ ...M, title: B.target.value, handle: g ? M.handle : is(B.target.value) }));
        } }),
        /* @__PURE__ */ e.jsx(D, { message: m.title })
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
            onChange: (B) => {
              o(!0), x.setData("handle", B.target.value);
            }
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: a ? "Set when it was created." : "Lowercase letters, digits and underscores. It can't change later." }),
        /* @__PURE__ */ e.jsx(D, { message: m.handle })
      ] })
    ] }) }),
    r.length > 0 && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      "Used by ",
      r.join(", "),
      ". Changes show there at once."
    ] }),
    /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-3", "aria-labelledby": "fields-heading", children: [
      /* @__PURE__ */ e.jsx("h2", { id: "fields-heading", className: "cms:text-lg cms:font-medium", children: "Fields" }),
      /* @__PURE__ */ e.jsx(xs, { fields: d, onChange: j, types: l, errors: ne(m, "fields") }),
      /* @__PURE__ */ e.jsx(D, { message: m.fields })
    ] })
  ] });
}
function ps({ noun: t, base: a, rows: l, intro: r }) {
  const c = `${t}s`;
  s.useBreadcrumbs([{ label: c }]);
  const [n, i] = U();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: c }),
    i,
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
        l.some((u) => u.usedBy) && /* @__PURE__ */ e.jsx(s.TableHead, { children: "Used by" }),
        /* @__PURE__ */ e.jsx(s.TableHead, { className: "cms:w-12", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: "Actions" }) })
      ] }) }),
      /* @__PURE__ */ e.jsxs(s.TableBody, { children: [
        l.length === 0 && /* @__PURE__ */ e.jsx(s.TableRow, { children: /* @__PURE__ */ e.jsxs(s.TableCell, { colSpan: 5, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: [
          "No ",
          c.toLowerCase(),
          " yet."
        ] }) }),
        l.map((u) => /* @__PURE__ */ e.jsxs(s.TableRow, { children: [
          /* @__PURE__ */ e.jsx(s.TableCell, { children: /* @__PURE__ */ e.jsx(f.Link, { href: `${a}/${u.id}/edit`, className: "cms:font-medium cms:hover:underline", children: u.title }) }),
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
              onClick: () => n(
                `Delete the ${t.toLowerCase()} "${u.title}"? Content keeps its values.`,
                () => f.router.delete(`${a}/${u.id}`, { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(z, {})
            }
          ) })
        ] }, u.id))
      ] })
    ] }) })
  ] });
}
function ut({ blueprints: t }) {
  const a = f.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(D, { message: a.blueprint }),
    /* @__PURE__ */ e.jsx(
      ps,
      {
        noun: "Blueprint",
        base: y("cms/blueprints"),
        rows: t,
        intro: "The fields editors fill in, for each kind of content."
      }
    )
  ] });
}
const gs = [
  { handle: "title", type: "text", label: "SEO title", instructions: "For search results and tabs. Empty: the title.", config: { max: 255 } },
  { handle: "description", type: "textarea", label: "Description", instructions: "A sentence or two for search results and shared links.", config: { max: 500 } },
  { handle: "image", type: "media", label: "Share image", instructions: "Shown when the page is shared.", config: { types: ["image"] } },
  { handle: "noindex", type: "toggle", label: "Hide from search engines" },
  { handle: "canonical", type: "text", label: "Canonical address", instructions: "Only when this page copies one elsewhere: that page's full address. Empty: this page.", config: { max: 2e3 } }
];
function ht(t) {
  const { entry: a } = t;
  return /* @__PURE__ */ e.jsx(xt, { ...t }, a ? `${a.id}:${a.locale}:${a.version}:${a.status}:${a.trashed}:${a.publishedAt}` : "new");
}
function xt({ collection: t, fields: a, locales: l = [], shared: r = [], sharedValues: c = {}, entry: n, values: i, revisions: u, undoRestore: p = null, settings: x, can: g }) {
  const o = y(`cms/collections/${t.handle}/entries`), d = n ? y(`cms/entries/${n.id}`) : o, j = n ? i.title : "New entry";
  s.useBreadcrumbs([{ label: t.title, href: o }, { label: j }]);
  const [b, m] = U(), [N, T] = k.useState(!1), C = f.useForm({ ...i, seo: i.seo ?? {}, locale: n?.locale ?? null, version: n?.version ?? null, publish: !1, published_at: null }), w = n ? { locale: n.locale } : {}, h = l.find((S) => S.main)?.code, v = C.errors, _ = n !== null && n.status !== "draft" && !n.hasUnpublishedChanges && !C.isDirty, B = n === null ? g.create : g.update && !n.trashed, M = (S = !1, F = null) => {
    C.transform((V) => ({ ...V, publish: S, published_at: F })), n ? C.put(d, { preserveScroll: !0, onSuccess: () => T(!1) }) : C.post(d);
  }, Ns = () => {
    C.transform((S) => ({ ...S, version: null, publish: !1, published_at: null })), C.put(d, { preserveScroll: !0 });
  }, E = s.useEditLock({
    type: "cms.entry",
    id: n?.id,
    locale: n?.locale,
    enabled: n !== null && B,
    noun: "entry",
    leaveTo: o,
    getUnsaved: () => C.isDirty ? { title: C.data.title, slug: C.data.slug, data: C.data.data, seo: C.data.seo } : null
  }), X = B && !E.readOnly, ys = async (S) => {
    const F = await E.loadKept(S);
    C.setData((V) => ({ ...V, title: F.title ?? V.title, slug: F.slug ?? V.slug, data: F.data ?? V.data, seo: F.seo ?? V.seo }));
  };
  s.useUnsavedChanges(C.isDirty && !E.takenOver, X ? () => C.processing || M() : void 0);
  const he = (S = null) => {
    g.update ? M(!0, S) : n && f.router.post(`${d}/publish`, { ...w, published_at: S }, { preserveScroll: !0, onSuccess: () => T(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (S) => {
    S.preventDefault(), M();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: j }),
    m,
    E.dialogs,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: o, "aria-label": `Back to ${t.title}`, children: /* @__PURE__ */ e.jsx(J, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: j }),
        n && /* @__PURE__ */ e.jsx(s.Badge, { variant: n.status === "published" ? "default" : "secondary", children: n.trashed ? "In the trash" : W(n.status) }),
        C.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        n && !n.trashed && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(
          "a",
          {
            href: n.previewUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            title: C.isDirty ? "Shows the saved draft: save first to see your changes." : "Shows the saved draft.",
            children: [
              /* @__PURE__ */ e.jsx(Es, {}),
              " Preview"
            ]
          }
        ) }),
        n?.url && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: n.url, target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ e.jsx(le, {}),
          " View"
        ] }) }),
        n?.trashed && g.delete && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", onClick: () => f.router.post(`${d}/restore`, {}, { preserveScroll: !0 }), children: [
          /* @__PURE__ */ e.jsx(te, {}),
          " Restore"
        ] }),
        n?.trashed && g.delete && /* @__PURE__ */ e.jsxs(
          s.Button,
          {
            type: "button",
            variant: "outline",
            className: "cms:text-destructive",
            onClick: () => b(`Delete "${i.title}" for good, in every language, with its revisions? This can't be undone.`, () => f.router.delete(`${d}/force`)),
            children: [
              /* @__PURE__ */ e.jsx(z, {}),
              " Delete for good"
            ]
          }
        ),
        n && !n.trashed && g.create && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "ghost", title: "Copy every language as a new draft", onClick: () => f.router.post(`${d}/duplicate`), children: [
          /* @__PURE__ */ e.jsx(As, {}),
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
            onClick: () => b(`Move "${i.title}" to the trash? It comes off the site; you can restore it.`, () => f.router.delete(d)),
            children: /* @__PURE__ */ e.jsx(z, {})
          }
        ),
        X && /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", variant: n && g.publish ? "outline" : "default", disabled: C.processing, children: [
          C.processing && /* @__PURE__ */ e.jsx(Z, { className: "cms:animate-spin" }),
          n ? "Save draft" : "Create draft"
        ] }),
        n && !n.trashed && g.publish && !E.readOnly && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex", children: [
          /* @__PURE__ */ e.jsx(s.Button, { type: "button", className: "cms:rounded-r-none", disabled: C.processing || _, onClick: () => he(), children: n.status === "draft" ? "Publish" : _ ? "Published" : "Publish changes" }),
          /* @__PURE__ */ e.jsxs(s.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(s.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(s.Button, { type: "button", size: "icon", className: "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": "More publishing options", children: /* @__PURE__ */ e.jsx(Ie, {}) }) }),
            /* @__PURE__ */ e.jsxs(s.DropdownMenuContent, { align: "end", children: [
              /* @__PURE__ */ e.jsxs(s.DropdownMenuItem, { onSelect: () => T(!0), children: [
                /* @__PURE__ */ e.jsx(Is, {}),
                " Publish on a date…"
              ] }),
              n.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(s.DropdownMenuSeparator, {}),
                /* @__PURE__ */ e.jsx(s.DropdownMenuItem, { onSelect: () => f.router.post(`${d}/unpublish`, w, { preserveScroll: !0 }), children: "Unpublish" })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }),
    n && l.length > 1 && /* @__PURE__ */ e.jsx(
      pt,
      {
        entryUrl: d,
        current: n.locale,
        locales: l,
        canAdd: g.create && !n.trashed,
        canRemove: g.delete && !n.isMain && !n.trashed,
        onRemove: () => b(
          `Remove the ${L(n.locale)} translation of "${i.title}"? Its revisions go with it.`,
          () => f.router.delete(`${d}/translations/${n.locale}`)
        )
      }
    ),
    /* @__PURE__ */ e.jsx(s.ViewingNotice, { by: E.viewingBy }),
    /* @__PURE__ */ e.jsx(s.KeptEditsNotice, { kept: E.kept, disabled: !X, onLoad: (S) => {
      ys(S);
    }, onDiscard: (S) => {
      E.discardKept(S);
    } }),
    v.version && /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: [
      /* @__PURE__ */ e.jsx("span", { children: v.version }),
      /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", size: "sm", onClick: () => f.router.reload(), children: "Load theirs" }),
        /* @__PURE__ */ e.jsx(
          s.Button,
          {
            type: "button",
            variant: "destructive",
            size: "sm",
            disabled: C.processing,
            onClick: () => b("Save your version over theirs? Their changes are replaced (their earlier published versions stay in the revisions).", Ns),
            children: "Save mine anyway"
          }
        )
      ] })
    ] }),
    (v.entry || v.published_at) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: v.entry ?? v.published_at }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_18rem]", children: [
      /* @__PURE__ */ e.jsxs("fieldset", { disabled: !X, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsxs(s.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-[2fr_1fr]", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "title", children: "Title" }),
            /* @__PURE__ */ e.jsx(
              s.Input,
              {
                id: "title",
                value: C.data.title,
                "aria-invalid": v.title !== void 0,
                onChange: (S) => C.setData("title", S.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(D, { message: v.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "slug", children: "Slug" }),
            /* @__PURE__ */ e.jsx(
              s.Input,
              {
                id: "slug",
                className: "cms:font-mono",
                value: C.data.slug,
                placeholder: "Made from the title",
                "aria-invalid": v.slug !== void 0,
                onChange: (S) => C.setData("slug", S.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(D, { message: v.slug })
          ] })
        ] }) }),
        a.length > 0 && /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsx(s.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: a.map((S) => r.includes(S.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
          /* @__PURE__ */ e.jsx(A, { id: `data-${S.handle}`, field: S, content: !0, value: c[S.handle], errors: {}, onChange: () => {
          } }),
          /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
            "Shared by all languages: edit it in ",
            h ? L(h) : "the main language",
            "."
          ] })
        ] }, S.handle) : /* @__PURE__ */ e.jsx(
          A,
          {
            id: `data-${S.handle}`,
            field: S,
            content: !0,
            value: C.data.data[S.handle],
            errors: I(v, `data.${S.handle}`),
            onChange: (F) => C.setData("data", { ...C.data.data, [S.handle]: F })
          },
          S.handle
        )) }) }),
        /* @__PURE__ */ e.jsxs(s.Card, { children: [
          /* @__PURE__ */ e.jsx(s.CardHeader, { children: /* @__PURE__ */ e.jsx(s.CardTitle, { className: "cms:text-base", children: "Search and sharing" }) }),
          /* @__PURE__ */ e.jsx(s.CardContent, { children: /* @__PURE__ */ e.jsx(
            se,
            {
              id: "seo",
              fields: gs,
              value: C.data.seo,
              errors: I(v, "seo"),
              onChange: (S) => C.setData("seo", S)
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
        x && /* @__PURE__ */ e.jsx(jt, { entryUrl: d, collection: t, settings: x, disabled: !X }),
        /* @__PURE__ */ e.jsxs(s.Card, { children: [
          /* @__PURE__ */ e.jsx(s.CardHeader, { children: /* @__PURE__ */ e.jsx(s.CardTitle, { className: "cms:text-base", children: "Revisions" }) }),
          /* @__PURE__ */ e.jsxs(s.CardContent, { className: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
            p !== null && g.update && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", size: "sm", onClick: () => f.router.post(y(`cms/entry-translations/${p}/undo-restore`), {}, { preserveScroll: !0 }), children: [
              /* @__PURE__ */ e.jsx(de, {}),
              " Undo the restore"
            ] }),
            u.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "Each publish keeps one." }),
            u.map((S) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-2", children: [
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
                  onClick: () => f.router.post(y(`cms/revisions/${S.id}/restore`), {}, { preserveScroll: !0 }),
                  children: "Restore"
                }
              )
            ] }, S.id))
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(
      gt,
      {
        open: N,
        onClose: () => T(!1),
        processing: C.processing,
        current: n?.publishedAt ?? null,
        onSchedule: (S) => he(S)
      }
    )
  ] });
}
function pt({ entryUrl: t, current: a, locales: l, canAdd: r, canRemove: c, onRemove: n }) {
  return /* @__PURE__ */ e.jsxs("nav", { "aria-label": "Languages", className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
    l.map((i) => {
      const u = `${L(i.code)}${i.main ? " (main)" : ""}`;
      return i.status === null ? r ? /* @__PURE__ */ e.jsxs(
        s.Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "cms:border-dashed",
          onClick: () => f.router.post(`${t}/translations`, { locale: i.code }),
          children: [
            /* @__PURE__ */ e.jsx(R, {}),
            " ",
            u
          ]
        },
        i.code
      ) : null : /* @__PURE__ */ e.jsxs(
        s.Button,
        {
          type: "button",
          size: "sm",
          variant: i.code === a ? "secondary" : "ghost",
          "aria-current": i.code === a ? "page" : void 0,
          onClick: () => i.code !== a && f.router.get(`${t}/edit`, { locale: i.code }),
          children: [
            u,
            /* @__PURE__ */ e.jsx(s.Badge, { variant: i.status === "published" ? "default" : "outline", className: "cms:ml-1", children: W(i.status) })
          ]
        },
        i.code
      );
    }),
    c && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:ml-auto cms:text-destructive", onClick: n, children: "Remove this language" })
  ] });
}
function gt({ open: t, onClose: a, onSchedule: l, current: r, processing: c }) {
  const [n, i] = k.useState("");
  return k.useEffect(() => {
    t && i(et(r ? new Date(r) : new Date(Date.now() + 864e5)));
  }, [t, r]), /* @__PURE__ */ e.jsx(s.Dialog, { open: t, onOpenChange: (u) => !u && a(), children: /* @__PURE__ */ e.jsxs(s.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(s.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(s.DialogTitle, { children: "Publish on a date" }),
      /* @__PURE__ */ e.jsx(s.DialogDescription, { children: "The entry goes live then; a date in the past publishes it now with that date." })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "published-at", children: "Date and time" }),
      /* @__PURE__ */ e.jsx(s.Input, { id: "published-at", type: "datetime-local", value: n, onChange: (u) => i(u.target.value) }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "In your time zone." })
    ] }),
    /* @__PURE__ */ e.jsxs(s.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", onClick: a, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", disabled: n === "" || c, onClick: () => l(new Date(n).toISOString()), children: "Publish" })
    ] })
  ] }) });
}
function jt({ entryUrl: t, collection: a, settings: l, disabled: r }) {
  const c = f.useForm({ parent_id: l.parentId, template: l.template ?? "", comments_closed: l.commentsClosed === !0 }), n = c.errors;
  return /* @__PURE__ */ e.jsxs(s.Card, { children: [
    /* @__PURE__ */ e.jsx(s.CardHeader, { children: /* @__PURE__ */ e.jsx(s.CardTitle, { className: "cms:text-base", children: "Page settings" }) }),
    /* @__PURE__ */ e.jsx(s.CardContent, { children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: r, className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: [
      a.hierarchical && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "parent", children: "Parent" }),
        /* @__PURE__ */ e.jsx(
          ue,
          {
            id: "parent",
            multiple: !1,
            max: 1,
            collections: [a.handle],
            invalid: n.parent_id !== void 0,
            value: c.data.parent_id,
            onChange: (i) => c.setData("parent_id", typeof i == "number" ? i : null)
          }
        ),
        /* @__PURE__ */ e.jsx(D, { message: n.parent_id })
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
            onChange: (i) => c.setData("template", i.target.value),
            "aria-invalid": n.template !== void 0
          }
        ),
        /* @__PURE__ */ e.jsx(D, { message: n.template })
      ] }),
      a.comments && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(s.Switch, { id: "comments-open", checked: !c.data.comments_closed, onCheckedChange: (i) => c.setData("comments_closed", !i) }),
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "comments-open", children: "Accept new comments" }),
        /* @__PURE__ */ e.jsx("a", { href: y(`cms/comments?entry=${t.split("/").slice(-1)[0]}`), className: "cms:ml-auto cms:text-muted-foreground cms:underline-offset-4 hover:cms:underline", children: "Comments" })
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
function ft({ collection: t, collections: a, entries: l, query: r, can: c }) {
  s.useBreadcrumbs([{ label: "Entries", href: y("cms/entries") }, ...t ? [{ label: t.title }] : []]);
  const [n, i] = k.useState(r.search), u = t ? y(`cms/collections/${t.handle}/entries`) : "", [p, x] = k.useState([]), [g, o] = U();
  k.useEffect(() => x([]), [l]);
  const d = r.trashed ? c?.delete ? [{ action: "restore", label: "Restore" }, { action: "delete", label: "Delete for good", danger: !0 }] : [] : [
    ...c?.publish ? [{ action: "publish", label: "Publish" }, { action: "unpublish", label: "Unpublish" }] : [],
    ...c?.delete ? [{ action: "trash", label: "Move to the trash", danger: !0 }] : []
  ], j = (m, N, T = !1) => {
    const C = () => f.router.post(`${u}/bulk`, { action: m, ids: p }, { preserveScroll: !0 });
    T ? g(`${N}: ${p.length} ${p.length === 1 ? "entry" : "entries"}?${m === "delete" ? " This can't be undone." : ""}`, C) : C();
  }, b = (m) => {
    const N = { ...r, ...m };
    f.router.get(
      u,
      { ...N.search ? { search: N.search } : {}, ...N.trashed ? { trashed: 1 } : {} },
      { preserveState: !0, preserveScroll: !0, replace: !0 }
    );
  };
  return k.useEffect(() => {
    if (n === r.search) return;
    const m = window.setTimeout(() => b({ search: n }), 300);
    return () => window.clearTimeout(m);
  }, [n]), !t || !l ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: "Entries" }),
    /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Entries" }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no collections yet. Create one under Structure → Collections, then come back to write its entries." })
  ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: t.title }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: t.title }),
        a.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: t.handle, onValueChange: (m) => f.router.get(y(`cms/collections/${m}/entries`)), children: [
          /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": "Collection", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(s.SelectContent, { children: a.map((m) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: m.handle, children: m.title }, m.handle)) })
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        t.listing && !r.trashed && /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs(f.Link, { href: y(`cms/collections/${t.handle}/listing`), children: [
          /* @__PURE__ */ e.jsx(Hs, {}),
          " Listing page"
        ] }) }),
        l.total > 0 && !r.trashed && /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: `${u}/export`, children: [
          /* @__PURE__ */ e.jsx(Re, {}),
          " Export CSV"
        ] }) }),
        c?.create && !r.trashed && /* @__PURE__ */ e.jsx(s.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(f.Link, { href: `${u}/create`, children: [
          /* @__PURE__ */ e.jsx(R, {}),
          " New entry"
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-sm", children: [
        /* @__PURE__ */ e.jsx(ss, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            className: "cms:pl-9",
            placeholder: "Search titles",
            "aria-label": "Search titles",
            value: n,
            onChange: (m) => i(m.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(s.Button, { variant: r.trashed ? "secondary" : "ghost", size: "sm", onClick: () => b({ trashed: !r.trashed }), children: r.trashed ? "Back to entries" : "Trash" }),
      p.length > 0 && d.length > 0 && /* @__PURE__ */ e.jsxs("div", { role: "toolbar", "aria-label": "Selected entries", className: "cms:ml-auto cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs("span", { className: "cms:text-sm cms:text-muted-foreground", children: [
          p.length,
          " selected"
        ] }),
        d.map((m) => /* @__PURE__ */ e.jsx(s.Button, { size: "sm", variant: m.danger ? "destructive" : "outline", onClick: () => j(m.action, m.label, m.danger), children: m.label }, m.action))
      ] })
    ] }),
    o,
    /* @__PURE__ */ e.jsx(s.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(s.Table, { children: [
      /* @__PURE__ */ e.jsx(s.TableHeader, { children: /* @__PURE__ */ e.jsxs(s.TableRow, { children: [
        d.length > 0 && /* @__PURE__ */ e.jsx(s.TableHead, { className: "cms:w-10", children: /* @__PURE__ */ e.jsx(
          s.Checkbox,
          {
            "aria-label": "Select all on this page",
            checked: l.data.length > 0 && p.length === l.data.length,
            onCheckedChange: (m) => x(m ? l.data.map((N) => N.id) : [])
          }
        ) }),
        /* @__PURE__ */ e.jsx(s.TableHead, { children: "Title" }),
        /* @__PURE__ */ e.jsx(s.TableHead, { children: "Status" }),
        /* @__PURE__ */ e.jsx(s.TableHead, { children: t.dated ? "Date" : "Updated" })
      ] }) }),
      /* @__PURE__ */ e.jsxs(s.TableBody, { children: [
        l.data.length === 0 && /* @__PURE__ */ e.jsx(s.TableRow, { children: /* @__PURE__ */ e.jsx(s.TableCell, { colSpan: d.length > 0 ? 4 : 3, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: r.trashed ? "The trash is empty." : r.search ? "Nothing matches." : "No entries yet." }) }),
        l.data.map((m) => /* @__PURE__ */ e.jsxs(s.TableRow, { "data-state": p.includes(m.id) ? "selected" : void 0, children: [
          d.length > 0 && /* @__PURE__ */ e.jsx(s.TableCell, { children: /* @__PURE__ */ e.jsx(
            s.Checkbox,
            {
              "aria-label": `Select ${m.title}`,
              checked: p.includes(m.id),
              onCheckedChange: (N) => x(N ? [...p, m.id] : p.filter((T) => T !== m.id))
            }
          ) }),
          /* @__PURE__ */ e.jsxs(s.TableCell, { children: [
            /* @__PURE__ */ e.jsx(f.Link, { href: y(`cms/entries/${m.id}/edit`), className: "cms:font-medium cms:hover:underline", children: m.title }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
              "/",
              m.slug,
              m.parent ? ` · under ${m.parent}` : ""
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(s.TableCell, { children: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-1", children: [
            /* @__PURE__ */ e.jsx(s.Badge, { variant: m.status === "published" ? "default" : "secondary", children: W(m.status) }),
            m.locales.length > 1 && m.locales.filter((N) => !N.main).map((N) => /* @__PURE__ */ e.jsx(
              s.Badge,
              {
                variant: N.status === "published" ? "default" : "outline",
                className: N.status === null ? "cms:opacity-50" : "",
                title: `${N.code}: ${N.status === null ? "not translated" : W(N.status)}`,
                children: N.code.toUpperCase()
              },
              N.code
            ))
          ] }) }),
          /* @__PURE__ */ e.jsx(s.TableCell, { className: "cms:text-muted-foreground", children: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-2", children: [
            G(t.dated ? m.publishedAt : m.updatedAt),
            t.ordered && c?.update && !r.trashed && !r.search && /* @__PURE__ */ e.jsxs("span", { className: "cms:flex", children: [
              /* @__PURE__ */ e.jsx(s.Button, { variant: "ghost", size: "icon", "aria-label": `Move ${m.title} up`, onClick: () => f.router.post(y(`cms/entries/${m.id}/move`), { direction: "up" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(Y, {}) }),
              /* @__PURE__ */ e.jsx(s.Button, { variant: "ghost", size: "icon", "aria-label": `Move ${m.title} down`, onClick: () => f.router.post(y(`cms/entries/${m.id}/move`), { direction: "down" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(K, {}) })
            ] })
          ] }) })
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
          s.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Previous page",
            disabled: !l.prev_page_url,
            onClick: () => l.prev_page_url && f.router.get(l.prev_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(me, {})
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
            children: /* @__PURE__ */ e.jsx(ae, {})
          }
        )
      ] })
    ] })
  ] });
}
function bt(t) {
  return /* @__PURE__ */ e.jsx(vt, { ...t }, `${t.locale}:${JSON.stringify(t.values)}`);
}
function vt({ collection: t, fields: a, locale: l, locales: r, shared: c, values: n, can: i }) {
  const u = y(`cms/collections/${t.handle}/listing`), p = y(`cms/collections/${t.handle}/entries`);
  s.useBreadcrumbs([{ label: t.title, href: p }, { label: "Listing page" }]);
  const x = f.useForm({ locale: l, data: n }), g = x.errors, o = r[0], d = i.update, j = () => x.processing || x.put(u, { preserveScroll: !0 });
  return s.useUnsavedChanges(x.isDirty, d ? j : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: (b) => {
    b.preventDefault(), j();
  }, className: "cms:flex cms:max-w-3xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: `${t.title}: listing page` }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: p, "aria-label": `Back to ${t.title}`, children: /* @__PURE__ */ e.jsx(J, {}) }) }),
        /* @__PURE__ */ e.jsxs("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: [
          t.title,
          ": listing page"
        ] }),
        x.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        r.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: l, onValueChange: (b) => f.router.get(u, { locale: b }), children: [
          /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(s.SelectContent, { children: r.map((b, m) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: b, children: [
            L(b),
            m === 0 ? " (main)" : ""
          ] }, b)) })
        ] }),
        t.url && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: t.url, target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ e.jsx(le, {}),
          " View"
        ] }) }),
        d && /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: x.processing, children: [
          x.processing && /* @__PURE__ */ e.jsx(Z, { className: "cms:animate-spin" }),
          " Save"
        ] })
      ] })
    ] }),
    a.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The listing page has no fields of its own: choose a listing blueprint for the collection under Structure → Collections." }) : /* @__PURE__ */ e.jsx("fieldset", { disabled: !d, className: "cms:flex cms:flex-col cms:gap-4", children: /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsx(s.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: a.map((b) => c.includes(b.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(A, { id: `data-${b.handle}`, field: b, content: !0, value: n[b.handle], errors: {}, onChange: () => {
      } }),
      /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
        "Shared by all languages: edit it in ",
        o ? L(o) : "the main language",
        "."
      ] })
    ] }, b.handle) : /* @__PURE__ */ e.jsx(
      A,
      {
        id: `data-${b.handle}`,
        field: b,
        content: !0,
        value: x.data.data[b.handle],
        errors: I(g, `data.${b.handle}`),
        onChange: (m) => x.setData("data", { ...x.data.data, [b.handle]: m })
      },
      b.handle
    )) }) }) })
  ] });
}
function Nt({ fieldsets: t }) {
  const a = f.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(D, { message: a.fieldset }),
    /* @__PURE__ */ e.jsx(
      ps,
      {
        noun: "Fieldset",
        base: y("cms/fieldsets"),
        rows: t,
        intro: "Fields shared between blueprints, and the kinds of block of flexible fields."
      }
    )
  ] });
}
function yt(t) {
  return /* @__PURE__ */ e.jsx(Ct, { ...t }, `${t.locale}:${JSON.stringify(t.values)}`);
}
function Ct({ set: t, fields: a, locale: l, locales: r, shared: c, values: n, can: i }) {
  const u = y(`cms/globals/${t.handle}`);
  s.useBreadcrumbs([{ label: "Globals", href: y("cms/globals") }, { label: t.title }]);
  const p = f.useForm({ locale: l, data: n }), x = p.errors, g = r[0], o = s.useEditLock({
    type: "cms.global",
    id: t.id,
    locale: l,
    enabled: i.update,
    noun: "global set",
    leaveTo: y("cms/globals"),
    getUnsaved: () => p.isDirty ? { data: p.data.data } : null
  }), d = i.update && !o.readOnly, j = () => p.processing || p.put(u, { preserveScroll: !0 }), b = async (m) => {
    const N = await o.loadKept(m);
    N.data && typeof N.data == "object" && p.setData("data", N.data);
  };
  return s.useUnsavedChanges(p.isDirty && !o.takenOver, d ? j : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: (m) => {
    m.preventDefault(), j();
  }, className: "cms:flex cms:max-w-3xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: t.title }),
    o.dialogs,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: y("cms/globals"), "aria-label": "Back to globals", children: /* @__PURE__ */ e.jsx(J, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: t.title }),
        p.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        r.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: l, onValueChange: (m) => f.router.get(u, { locale: m }), children: [
          /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(s.SelectContent, { children: r.map((m, N) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: m, children: [
            L(m),
            N === 0 ? " (main)" : ""
          ] }, m)) })
        ] }),
        d && /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: p.processing, children: [
          p.processing && /* @__PURE__ */ e.jsx(Z, { className: "cms:animate-spin" }),
          " Save"
        ] })
      ] })
    ] }),
    a.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "This global set has no fields: choose a blueprint for it under Structure → Global sets." }) : /* @__PURE__ */ e.jsxs("fieldset", { disabled: !d, className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(s.ViewingNotice, { by: o.viewingBy }),
      /* @__PURE__ */ e.jsx(s.KeptEditsNotice, { kept: o.kept, disabled: !d, onLoad: (m) => {
        b(m);
      }, onDiscard: (m) => {
        o.discardKept(m);
      } }),
      /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsx(s.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: a.map((m) => c.includes(m.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(A, { id: `data-${m.handle}`, field: m, content: !0, value: n[m.handle], errors: {}, onChange: () => {
        } }),
        /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
          "Shared by all languages: edit it in ",
          g ? L(g) : "the main language",
          "."
        ] })
      ] }, m.handle) : /* @__PURE__ */ e.jsx(
        A,
        {
          id: `data-${m.handle}`,
          field: m,
          content: !0,
          value: p.data.data[m.handle],
          errors: I(x, `data.${m.handle}`),
          onChange: (N) => p.setData("data", { ...p.data.data, [m.handle]: N })
        },
        m.handle
      )) }) })
    ] })
  ] });
}
function kt({ sets: t }) {
  return s.useBreadcrumbs([{ label: "Globals" }]), /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: "Globals" }),
    /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Globals" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Values the whole site uses, like contact details and footer text." })
    ] }),
    t.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no global sets yet. Create one under Structure → Global sets." }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:sm:grid-cols-2 cms:lg:grid-cols-3", children: t.map((a) => /* @__PURE__ */ e.jsx(f.Link, { href: y(`cms/globals/${a.handle}`), className: "cms:rounded-xl cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none", children: /* @__PURE__ */ e.jsxs(s.Card, { className: "cms:h-full cms:transition-colors cms:hover:bg-accent", children: [
      /* @__PURE__ */ e.jsxs(s.CardHeader, { children: [
        /* @__PURE__ */ e.jsx(s.CardTitle, { className: "cms:text-base", children: a.title }),
        /* @__PURE__ */ e.jsx(s.CardDescription, { children: a.blueprint ? /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: a.handle }) : "No blueprint yet: choose one under Structure → Global sets." })
      ] }),
      /* @__PURE__ */ e.jsx(s.CardContent, {})
    ] }) }, a.handle)) })
  ] });
}
let js = 0;
function fs(t, a = 0) {
  return t.flatMap(({ children: l, ...r }) => [{ ...r, key: `m${++js}`, depth: a }, ...fs(l ?? [], a + 1)]);
}
function St(t) {
  const a = [], l = [{ depth: -1, children: a }];
  for (const { key: r, depth: c, ...n } of t) {
    for (; l.length > 1 && l[l.length - 1].depth >= c; ) l.pop();
    const i = { ...n, children: [] };
    l[l.length - 1].children.push(i), l.push({ depth: c, children: i.children });
  }
  return a;
}
function ee(t, a) {
  const l = t[a]?.depth ?? 0;
  let r = a + 1;
  for (; r < t.length && t[r].depth > l; ) r++;
  return r;
}
function bs(t, a, l) {
  const r = ee(t, a);
  return t.map((c, n) => n >= a && n < r ? { ...c, depth: c.depth + l } : c);
}
function wt(t, a, l) {
  const r = t[a], c = t[a - 1];
  return !r || !c || r.depth > c.depth || Math.max(...t.slice(a, ee(t, a)).map((i) => i.depth)) + 1 > l - 1 ? t : bs(t, a, 1);
}
function $t(t, a) {
  return (t[a]?.depth ?? 0) === 0 ? t : bs(t, a, -1);
}
function ye(t, a, l) {
  const r = t[a];
  if (!r) return t;
  const c = ee(t, a), n = t.slice(a, c);
  if (l === -1) {
    let p = a - 1;
    for (; p >= 0 && t[p].depth > r.depth; ) p--;
    return p < 0 || t[p].depth !== r.depth ? t : [...t.slice(0, p), ...n, ...t.slice(p, a), ...t.slice(c)];
  }
  const i = t[c];
  if (!i || i.depth !== r.depth) return t;
  const u = ee(t, c);
  return [...t.slice(0, a), ...t.slice(c, u), ...n, ...t.slice(u)];
}
function _t(t, a) {
  return [...t.slice(0, a), ...t.slice(ee(t, a))];
}
function Ce(t) {
  return { key: `m${++js}`, depth: 0, entry_id: null, entry: null, url: null, labels: {}, new_tab: !1, ...t };
}
function Dt({ menu: t, items: a, locales: l, limits: r, can: c }) {
  const n = y(`cms/menus/${t.handle}`);
  s.useBreadcrumbs([{ label: "Menus", href: y("cms/menus") }, { label: t.title }]);
  const [i, u] = k.useState(() => fs(a)), [p, x] = k.useState(null), g = f.useForm({ items: a }), o = g.errors, [d, j] = k.useState(!1), b = l[0] ?? "en", m = (w) => {
    u(w), j(!0);
  }, N = (w, h) => m(i.map((v, _) => _ === w ? { ...v, ...h } : v)), T = () => {
    g.processing || (g.transform(() => ({ items: St(i).map(vs) })), g.put(n, { preserveScroll: !0, onSuccess: () => j(!1) }));
  }, C = (w) => {
    w.preventDefault(), T();
  };
  return s.useUnsavedChanges(d, c.update ? T : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: C, className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: t.title }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: y("cms/menus"), "aria-label": "Back to menus", children: /* @__PURE__ */ e.jsx(J, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: t.title }),
        d && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      c.update && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", disabled: i.length >= r.items, onClick: () => x("entry"), children: [
          /* @__PURE__ */ e.jsx(R, {}),
          " Entry"
        ] }),
        /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", disabled: i.length >= r.items, onClick: () => x("url"), children: [
          /* @__PURE__ */ e.jsx(Rs, {}),
          " Link"
        ] }),
        /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: g.processing, children: [
          g.processing && /* @__PURE__ */ e.jsx(Z, { className: "cms:animate-spin" }),
          " Save"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(D, { message: o.items }),
    Object.keys(o).some((w) => w.startsWith("items.")) && /* @__PURE__ */ e.jsxs("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: [
      "Some links need fixing: ",
      Object.values(o).filter(Boolean)[0]
    ] }),
    /* @__PURE__ */ e.jsx(s.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs("ul", { className: "cms:divide-y", children: [
      i.length === 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-6 cms:text-center cms:text-muted-foreground", children: "No links yet. Add an entry or a link." }),
      i.map((w, h) => /* @__PURE__ */ e.jsxs("li", { className: "cms:flex cms:flex-col cms:gap-2 cms:p-3", style: { paddingLeft: `${0.75 + w.depth * 2}rem` }, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(
            s.Input,
            {
              "aria-label": `Label (${L(b)})`,
              className: "cms:max-w-xs",
              disabled: !c.update,
              placeholder: w.entry?.title ?? "Label",
              value: w.labels[b] ?? "",
              onChange: (v) => N(h, { labels: { ...w.labels, [b]: v.target.value } })
            }
          ),
          /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:text-sm cms:text-muted-foreground", children: w.entry_id !== null ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            w.entry?.collection,
            ": ",
            w.entry?.title ?? `Entry #${w.entry_id}`,
            " ",
            w.entry && !w.entry.live && /* @__PURE__ */ e.jsx(s.Badge, { variant: "outline", children: "Not on the site" })
          ] }) : w.url }),
          c.update && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center", children: [
            /* @__PURE__ */ e.jsxs("label", { className: "cms:mr-2 cms:flex cms:items-center cms:gap-1.5 cms:text-sm", children: [
              /* @__PURE__ */ e.jsx(s.Checkbox, { checked: w.new_tab, onCheckedChange: (v) => N(h, { new_tab: v }) }),
              " New tab"
            ] }),
            /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Out a level", disabled: w.depth === 0, onClick: () => m($t(i, h)), children: /* @__PURE__ */ e.jsx(Vs, {}) }),
            /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "In a level", onClick: () => m(wt(i, h, r.depth)), children: /* @__PURE__ */ e.jsx(Os, {}) }),
            /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move up", onClick: () => m(ye(i, h, -1)), children: /* @__PURE__ */ e.jsx(Y, {}) }),
            /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move down", onClick: () => m(ye(i, h, 1)), children: /* @__PURE__ */ e.jsx(K, {}) }),
            /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": "Remove, with what's under it", onClick: () => m(_t(i, h)), children: /* @__PURE__ */ e.jsx(z, {}) })
          ] })
        ] }),
        l.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: l.slice(1).map((v) => /* @__PURE__ */ e.jsx(
          s.Input,
          {
            "aria-label": `Label (${L(v)})`,
            className: "cms:max-w-xs",
            disabled: !c.update,
            placeholder: `${L(v)}: as ${L(b)}`,
            value: w.labels[v] ?? "",
            onChange: (_) => N(h, { labels: { ...w.labels, [v]: _.target.value } })
          },
          v
        )) })
      ] }, w.key))
    ] }) }),
    /* @__PURE__ */ e.jsx(Tt, { kind: p, onClose: () => x(null), onAdd: (w) => {
      m([...i, w]), x(null);
    }, main: b })
  ] });
}
function vs({ entry: t, children: a, ...l }) {
  return { ...l, children: a.map(vs) };
}
function Tt({ kind: t, onClose: a, onAdd: l, main: r }) {
  const [c, n] = k.useState(null), [i, u] = k.useState(""), [p, x] = k.useState("");
  k.useEffect(() => {
    n(null), u(""), x("");
  }, [t]);
  const g = i.trim() === "" || Qs(i.trim()), o = async () => {
    if (t === "entry" && c !== null) {
      const d = await fetch(`${y("cms/entry-picker")}?${us({ ids: [c], collections: [] })}`, { headers: { Accept: "application/json" }, credentials: "same-origin" }), j = d.ok ? (await d.json()).items[0] : void 0;
      l(Ce({ entry_id: c, entry: j ? { title: j.title, collection: j.collection, live: j.status === "published" } : null, labels: p ? { [r]: p } : {} }));
    } else t === "url" && i.trim() !== "" && g && p.trim() !== "" && l(Ce({ url: i.trim(), labels: { [r]: p.trim() } }));
  };
  return /* @__PURE__ */ e.jsx(s.Dialog, { open: t !== null, onOpenChange: (d) => !d && a(), children: /* @__PURE__ */ e.jsxs(s.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(s.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(s.DialogTitle, { children: t === "entry" ? "Link to an entry" : "Link to an address" }),
      /* @__PURE__ */ e.jsx(s.DialogDescription, { children: t === "entry" ? "It follows the entry: its title (unless you give a label) and its address in each language. It shows only while the entry is on the site." : "A web address, a path on this site (/contact), mailto: or tel:." })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
      t === "entry" ? /* @__PURE__ */ e.jsx(
        ue,
        {
          id: "menu-entry",
          value: c,
          multiple: !1,
          max: null,
          collections: [],
          invalid: !1,
          onChange: (d) => n(typeof d == "number" ? d : null)
        }
      ) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "menu-url", children: "Address" }),
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            id: "menu-url",
            value: i,
            placeholder: "https://… or /contact",
            "aria-invalid": !g,
            onChange: (d) => u(d.target.value)
          }
        ),
        !g && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "This address could run code; use https://, a path, mailto: or tel:." })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(s.Label, { htmlFor: "menu-label", children: [
          "Label",
          t === "entry" ? " (optional)" : ""
        ] }),
        /* @__PURE__ */ e.jsx(s.Input, { id: "menu-label", value: p, onChange: (d) => x(d.target.value) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(s.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", onClick: a, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(
        s.Button,
        {
          type: "button",
          onClick: () => {
            o();
          },
          disabled: t === "entry" ? c === null : i.trim() === "" || !g || p.trim() === "",
          children: "Add"
        }
      )
    ] })
  ] }) });
}
function Bt({ menus: t }) {
  return s.useBreadcrumbs([{ label: "Menus" }]), /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: "Menus" }),
    /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Menus" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Navigation for the site: the main menu, the footer…" })
    ] }),
    t.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no menus yet. Create one under Structure → Menus." }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:sm:grid-cols-2 cms:lg:grid-cols-3", children: t.map((a) => /* @__PURE__ */ e.jsx(f.Link, { href: y(`cms/menus/${a.handle}`), className: "cms:rounded-xl cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none", children: /* @__PURE__ */ e.jsxs(s.Card, { className: "cms:h-full cms:transition-colors cms:hover:bg-accent", children: [
      /* @__PURE__ */ e.jsxs(s.CardHeader, { children: [
        /* @__PURE__ */ e.jsx(s.CardTitle, { className: "cms:text-base", children: a.title }),
        /* @__PURE__ */ e.jsx(s.CardDescription, { children: /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: a.handle }) })
      ] }),
      /* @__PURE__ */ e.jsx(s.CardContent, {})
    ] }) }, a.handle)) })
  ] });
}
const zt = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "spam", label: "Spam" },
  { value: "trash", label: "Trash" }
], Lt = { pending: "Pending", approved: "Approved", spam: "Spam" };
function Mt({ tab: t, counts: a, filters: l, collections: r, comments: c, can: n, errors: i = {} }) {
  s.useBreadcrumbs([{ label: "Comments", href: y("cms/comments") }]);
  const [u, p] = k.useState(l.search), [x, g] = k.useState([]), [o, d] = k.useState(null), [j, b] = U(), m = (h) => {
    const v = { status: t, search: l.search, collection: l.collection, ...h };
    f.router.get(y("cms/comments"), {
      ...v.status !== "all" ? { status: v.status } : {},
      ...v.search ? { search: v.search } : {},
      ...v.collection ? { collection: v.collection } : {},
      ...l.entry ? { entry: l.entry } : {}
    }, { preserveState: !0, replace: !0, onSuccess: () => g([]) });
  };
  k.useEffect(() => {
    if (u === l.search) return;
    const h = window.setTimeout(() => m({ search: u }), 300);
    return () => window.clearTimeout(h);
  }, [u]);
  const N = (h, v = {}) => f.router.post(y(h), v, { preserveScroll: !0, onSuccess: () => g([]) }), T = (h, v) => N(`cms/comments/${h.id}/status`, { status: v }), C = (h) => {
    const v = () => N("cms/comments/bulk", { action: h, ids: x });
    h === "delete" ? j(`Delete ${x.length} comments for good? This can't be undone.`, v) : v();
  }, w = c.data.length > 0 && x.length === c.data.length;
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
            value: u,
            onChange: (h) => p(h.target.value)
          }
        ),
        r.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: l.collection ?? "all", onValueChange: (h) => m({ collection: h === "all" ? null : h }), children: [
          /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": "Collection", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
          /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
            /* @__PURE__ */ e.jsx(s.SelectItem, { value: "all", children: "Every collection" }),
            r.map((h) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: h.handle, children: h.title }, h.handle))
          ] })
        ] })
      ] })
    ] }),
    l.entry !== null && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      "Comments on one entry. ",
      /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:underline cms:underline-offset-4", onClick: () => f.router.get(y("cms/comments")), children: "Show all" })
    ] }),
    /* @__PURE__ */ e.jsx(s.Tabs, { value: t, onValueChange: (h) => m({ status: h }), children: /* @__PURE__ */ e.jsx(s.TabsList, { className: "cms:h-auto cms:flex-wrap cms:justify-start", children: zt.map((h) => /* @__PURE__ */ e.jsxs(s.TabsTrigger, { value: h.value, children: [
      h.label,
      " ",
      /* @__PURE__ */ e.jsx("span", { className: "cms:ml-1 cms:text-muted-foreground", children: a[h.value] })
    ] }, h.value)) }) }),
    x.length > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2 cms:text-sm", role: "toolbar", "aria-label": "With the selected comments", children: [
      /* @__PURE__ */ e.jsxs("span", { className: "cms:text-muted-foreground", children: [
        x.length,
        " selected"
      ] }),
      n.moderate && t !== "trash" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "outline", onClick: () => C("approve"), children: [
          /* @__PURE__ */ e.jsx(pe, {}),
          " Approve"
        ] }),
        /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "outline", onClick: () => C("unapprove"), children: [
          /* @__PURE__ */ e.jsx(de, {}),
          " Unapprove"
        ] }),
        /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "outline", onClick: () => C("spam"), children: [
          /* @__PURE__ */ e.jsx(ge, {}),
          " Spam"
        ] })
      ] }),
      n.delete && t !== "trash" && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "outline", onClick: () => C("trash"), children: [
        /* @__PURE__ */ e.jsx(z, {}),
        " Trash"
      ] }),
      n.delete && t === "trash" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "outline", onClick: () => C("restore"), children: [
          /* @__PURE__ */ e.jsx(te, {}),
          " Restore"
        ] }),
        /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "destructive", onClick: () => C("delete"), children: [
          /* @__PURE__ */ e.jsx(z, {}),
          " Delete for good"
        ] })
      ] })
    ] }),
    c.data.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: l.search ? "No comments match." : "No comments here." }) : /* @__PURE__ */ e.jsxs(s.Card, { className: "cms:divide-y cms:p-0", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3 cms:px-4 cms:py-2 cms:text-sm cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsx(s.Checkbox, { checked: w, "aria-label": "Select all", onCheckedChange: (h) => g(h ? c.data.map((v) => v.id) : []) }),
        /* @__PURE__ */ e.jsxs("span", { children: [
          c.from,
          "–",
          c.to,
          " of ",
          c.total
        ] })
      ] }),
      c.data.map((h) => /* @__PURE__ */ e.jsxs("article", { className: "cms:flex cms:gap-3 cms:px-4 cms:py-4", "aria-labelledby": `comment-${h.id}-author`, children: [
        /* @__PURE__ */ e.jsx(
          s.Checkbox,
          {
            checked: x.includes(h.id),
            "aria-label": `Select ${h.author}'s comment`,
            onCheckedChange: (v) => g(v ? [...x, h.id] : x.filter((_) => _ !== h.id))
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-x-3 cms:gap-y-1 cms:text-sm", children: [
            /* @__PURE__ */ e.jsx("span", { id: `comment-${h.id}-author`, className: "cms:font-medium", children: h.author }),
            h.email && /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", children: h.email }),
            h.member && /* @__PURE__ */ e.jsx(s.Badge, { variant: "outline", children: "Signed in" }),
            !h.trashed && /* @__PURE__ */ e.jsx(s.Badge, { variant: h.status === "approved" ? "secondary" : h.status === "spam" ? "destructive" : "default", children: Lt[h.status] }),
            /* @__PURE__ */ e.jsxs("span", { className: "cms:text-muted-foreground", children: [
              h.createdAt ? G(h.createdAt) : "",
              " · ",
              h.locale.toUpperCase()
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
            "On ",
            h.entry.url ? /* @__PURE__ */ e.jsxs("a", { href: h.entry.url, target: "_blank", rel: "noreferrer", className: "cms:underline-offset-4 hover:cms:underline", children: [
              h.entry.title,
              " ",
              /* @__PURE__ */ e.jsx(le, { className: "cms:inline cms:size-3" })
            ] }) : h.entry.title,
            h.parent && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              " · replying to ",
              h.parent.author,
              ": “",
              h.parent.excerpt,
              "”"
            ] })
          ] }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:whitespace-pre-wrap cms:break-words", children: h.body }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-1", children: [
            n.moderate && !h.trashed && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              h.status !== "approved" && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => T(h, "approved"), children: [
                /* @__PURE__ */ e.jsx(pe, {}),
                " Approve"
              ] }),
              h.status === "approved" && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => T(h, "pending"), children: [
                /* @__PURE__ */ e.jsx(de, {}),
                " Unapprove"
              ] }),
              h.status !== "spam" && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => T(h, "spam"), children: [
                /* @__PURE__ */ e.jsx(ge, {}),
                " Spam"
              ] }),
              h.status !== "spam" && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => d({ row: h, mode: "reply" }), children: [
                /* @__PURE__ */ e.jsx(Ps, {}),
                " Reply"
              ] }),
              /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => d({ row: h, mode: "edit" }), children: [
                /* @__PURE__ */ e.jsx(Ze, {}),
                " Edit"
              ] })
            ] }),
            n.delete && !h.trashed && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => f.router.delete(y(`cms/comments/${h.id}`), { preserveScroll: !0 }), children: [
              /* @__PURE__ */ e.jsx(z, {}),
              " Trash"
            ] }),
            n.delete && h.trashed && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => N(`cms/comments/${h.id}/restore`), children: [
                /* @__PURE__ */ e.jsx(te, {}),
                " Restore"
              ] }),
              /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => j(
                "Delete this comment for good? Replies to it stay.",
                () => f.router.delete(y(`cms/comments/${h.id}/force`), { preserveScroll: !0 })
              ), children: [
                /* @__PURE__ */ e.jsx(z, {}),
                " Delete for good"
              ] })
            ] })
          ] })
        ] })
      ] }, h.id))
    ] }),
    (c.prev_page_url || c.next_page_url) && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:justify-end cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(s.Button, { variant: "outline", size: "sm", disabled: !c.prev_page_url, onClick: () => c.prev_page_url && f.router.get(c.prev_page_url), children: [
        /* @__PURE__ */ e.jsx(me, {}),
        " Newer"
      ] }),
      /* @__PURE__ */ e.jsxs(s.Button, { variant: "outline", size: "sm", disabled: !c.next_page_url, onClick: () => c.next_page_url && f.router.get(c.next_page_url), children: [
        "Older ",
        /* @__PURE__ */ e.jsx(ae, {})
      ] })
    ] }),
    o && /* @__PURE__ */ e.jsx(It, { row: o.row, mode: o.mode, error: i.body, onClose: () => d(null) }, `${o.mode}-${o.row.id}`),
    b
  ] });
}
function It({ row: t, mode: a, error: l, onClose: r }) {
  const [c, n] = k.useState(a === "edit" ? t.body : ""), [i, u] = k.useState(!1), p = () => {
    u(!0);
    const x = { preserveScroll: !0, onSuccess: r, onFinish: () => u(!1) };
    a === "reply" ? f.router.post(y(`cms/comments/${t.id}/reply`), { body: c }, x) : f.router.put(y(`cms/comments/${t.id}`), { body: c }, x);
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
    /* @__PURE__ */ e.jsx(D, { message: l }),
    /* @__PURE__ */ e.jsxs(s.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", onClick: r, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", disabled: c.trim() === "" || i, onClick: p, children: a === "reply" ? "Post reply" : "Save" })
    ] })
  ] }) });
}
const At = 3;
function Et({ form: t, forms: a, submissions: l, can: r }) {
  s.useBreadcrumbs([{ label: "Submissions", href: y("cms/submissions") }, ...t ? [{ label: t.title }] : []]);
  const [c, n] = k.useState(null), [i, u] = U();
  if (!t || !l)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(f.Head, { title: "Submissions" }),
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Submissions" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no forms yet. Create one under Structure → Forms and put it on a page; what visitors send shows up here." })
    ] });
  const p = (l.data[0]?.rows ?? []).slice(0, At), x = (g) => i(
    "Delete this submission for good? It can't be restored.",
    () => f.router.delete(y(`cms/submissions/${g.id}`), { preserveScroll: !0, onSuccess: () => n(null) })
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: `${t.title} submissions` }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: t.title }),
        a.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: t.handle, onValueChange: (g) => f.router.get(y(`cms/forms/${g}/submissions`)), children: [
          /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-56", "aria-label": "Form", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(s.SelectContent, { children: a.map((g) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: g.handle, children: [
            g.title,
            " (",
            g.count,
            ")"
          ] }, g.handle)) })
        ] })
      ] }),
      l.total > 0 && /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: y(`cms/forms/${t.handle}/submissions/export`), children: [
        /* @__PURE__ */ e.jsx(Re, {}),
        " Export CSV"
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsx(s.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(s.Table, { children: [
      /* @__PURE__ */ e.jsx(s.TableHeader, { children: /* @__PURE__ */ e.jsxs(s.TableRow, { children: [
        /* @__PURE__ */ e.jsx(s.TableHead, { children: "Sent" }),
        p.map((g) => /* @__PURE__ */ e.jsx(s.TableHead, { children: g.label }, g.handle))
      ] }) }),
      /* @__PURE__ */ e.jsxs(s.TableBody, { children: [
        l.data.length === 0 && /* @__PURE__ */ e.jsx(s.TableRow, { children: /* @__PURE__ */ e.jsx(s.TableCell, { colSpan: p.length + 1, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: "Nothing sent yet." }) }),
        l.data.map((g) => /* @__PURE__ */ e.jsxs(s.TableRow, { children: [
          /* @__PURE__ */ e.jsx(s.TableCell, { className: "cms:whitespace-nowrap", children: /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:font-medium cms:hover:underline", onClick: () => n(g), children: G(g.createdAt) }) }),
          p.map((o) => /* @__PURE__ */ e.jsx(s.TableCell, { className: "cms:max-w-64 cms:truncate", children: g.rows.find((d) => d.handle === o.handle)?.value }, o.handle))
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
            children: /* @__PURE__ */ e.jsx(me, {})
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
            children: /* @__PURE__ */ e.jsx(ae, {})
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
        /* @__PURE__ */ e.jsx(z, {}),
        " Delete"
      ] }) })
    ] }) }),
    u
  ] });
}
function Ft(t) {
  return /* @__PURE__ */ e.jsx(Ht, { ...t }, `${t.locale}:${JSON.stringify([t.values, t.seo, t.term.template])}`);
}
function Ht({ taxonomy: t, term: a, translated: l, fields: r, locale: c, locales: n, shared: i, sharedValues: u, values: p, seo: x }) {
  const g = y(`cms/taxonomies/${t.handle}/terms`), o = y(`cms/terms/${a.id}/content`);
  s.useBreadcrumbs([{ label: t.title, href: `${g}?locale=${c}` }, { label: a.title }]);
  const d = f.useForm({ locale: c, data: p, seo: x ?? {}, template: a.template ?? "" }), j = d.errors, b = () => d.processing || d.put(o, { preserveScroll: !0 });
  return s.useUnsavedChanges(d.isDirty, l ? b : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: (m) => {
    m.preventDefault(), b();
  }, className: "cms:flex cms:max-w-3xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: a.title }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: `${g}?locale=${c}`, "aria-label": `Back to ${t.title}`, children: /* @__PURE__ */ e.jsx(J, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: a.title }),
        d.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        a.url && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: a.url, target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ e.jsx(le, {}),
          " View"
        ] }) }),
        n.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: c, onValueChange: (m) => f.router.get(y(`cms/terms/${a.id}/edit`), { locale: m }), children: [
          /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(s.SelectContent, { children: n.map((m, N) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: m, children: [
            L(m),
            N === 0 ? " (main)" : ""
          ] }, m)) })
        ] }),
        l && /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: d.processing, children: [
          d.processing && /* @__PURE__ */ e.jsx(Z, { className: "cms:animate-spin" }),
          " Save"
        ] })
      ] })
    ] }),
    l ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      r.length > 0 && /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsx(s.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: r.map((m) => i.includes(m.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(A, { id: `data-${m.handle}`, field: m, content: !0, value: u[m.handle], errors: {}, onChange: () => {
        } }),
        /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
          "Shared by all languages: edit it in ",
          L(n[0] ?? "en"),
          "."
        ] })
      ] }, m.handle) : /* @__PURE__ */ e.jsx(
        A,
        {
          id: `data-${m.handle}`,
          field: m,
          content: !0,
          value: d.data.data[m.handle],
          errors: I(j, `data.${m.handle}`),
          onChange: (N) => d.setData("data", { ...d.data.data, [m.handle]: N })
        },
        m.handle
      )) }) }),
      /* @__PURE__ */ e.jsxs(s.Card, { children: [
        /* @__PURE__ */ e.jsx(s.CardHeader, { children: /* @__PURE__ */ e.jsx(s.CardTitle, { className: "cms:text-base", children: "Search and sharing" }) }),
        /* @__PURE__ */ e.jsx(s.CardContent, { children: /* @__PURE__ */ e.jsx(se, { id: "seo", fields: gs, value: d.data.seo, errors: I(j, "seo"), onChange: (m) => d.setData("seo", m) }) })
      ] }),
      /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsxs(s.CardContent, { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "template", children: "Template" }),
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            id: "template",
            className: "cms:font-mono",
            placeholder: "The taxonomy's",
            value: d.data.template,
            onChange: (m) => d.setData("template", m.target.value),
            "aria-invalid": j.template !== void 0
          }
        ),
        /* @__PURE__ */ e.jsx(D, { message: j.template })
      ] }) })
    ] }) : /* @__PURE__ */ e.jsxs("p", { className: "cms:text-muted-foreground", children: [
      "This term has no title in ",
      L(c),
      " yet: give it one in the list first."
    ] })
  ] });
}
const ie = "__top";
function Rt({ taxonomy: t, taxonomies: a, terms: l, locales: r, locale: c, trashed: n = !1 }) {
  s.useBreadcrumbs([{ label: "Terms", href: y("cms/terms") }, ...t ? [{ label: t.title }] : []]);
  const [i, u] = U(), [p, x] = k.useState(null);
  if (!t)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(f.Head, { title: "Terms" }),
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Terms" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no taxonomies yet. Create one under Structure → Taxonomies (categories, tags…), then add its terms here." })
    ] });
  const g = y(`cms/taxonomies/${t.handle}/terms`);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: t.title }),
    u,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: t.title }),
      a.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: t.handle, onValueChange: (o) => f.router.get(y(`cms/taxonomies/${o}/terms`)), children: [
        /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": "Taxonomy", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(s.SelectContent, { children: a.map((o) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: o.handle, children: o.title }, o.handle)) })
      ] }),
      /* @__PURE__ */ e.jsx(s.Button, { variant: n ? "secondary" : "ghost", size: "sm", className: "cms:ml-auto", onClick: () => f.router.get(g, { locale: c, ...n ? {} : { trashed: 1 } }), children: n ? "Back to terms" : "Trash" }),
      r.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: c, onValueChange: (o) => f.router.get(g, { locale: o, ...n ? { trashed: 1 } : {} }), children: [
        /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(s.SelectContent, { children: r.map((o) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: o, children: L(o) }, o)) })
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
      l.map((o) => {
        const d = l.filter((b) => b.parentId === o.parentId), j = d.findIndex((b) => b.id === o.id);
        return /* @__PURE__ */ e.jsx("li", { className: "cms:p-3", style: { paddingLeft: `${0.75 + o.depth * 1.5}rem` }, children: n ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
          /* @__PURE__ */ e.jsx("span", { className: "cms:flex-1 cms:font-medium", children: o.title ?? o.fallback }),
          /* @__PURE__ */ e.jsxs(s.Button, { variant: "outline", size: "sm", onClick: () => f.router.post(y(`cms/terms/${o.id}/restore`), {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(te, {}),
            " Restore"
          ] }),
          /* @__PURE__ */ e.jsxs(
            s.Button,
            {
              variant: "ghost",
              size: "sm",
              className: "cms:text-destructive",
              onClick: () => i(
                `Delete "${o.fallback}" for good, in every language? Entries lose it.`,
                () => f.router.delete(y(`cms/terms/${o.id}/force`), { preserveScroll: !0 })
              ),
              children: [
                /* @__PURE__ */ e.jsx(z, {}),
                " Delete for good"
              ]
            }
          )
        ] }) : p === o.id ? /* @__PURE__ */ e.jsx(
          ke,
          {
            action: y(`cms/terms/${o.id}`),
            method: "put",
            locale: c,
            terms: l,
            hierarchical: t.hierarchical,
            term: o,
            submitLabel: "Save",
            onDone: () => x(null)
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
            s.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-label": `Move ${o.fallback} up`,
              disabled: j === 0,
              onClick: () => f.router.post(y(`cms/terms/${o.id}/move`), { direction: "up" }, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(Y, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            s.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-label": `Move ${o.fallback} down`,
              disabled: j === d.length - 1,
              onClick: () => f.router.post(y(`cms/terms/${o.id}/move`), { direction: "down" }, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(K, {})
            }
          ),
          /* @__PURE__ */ e.jsx(s.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Rename ${o.fallback}`, onClick: () => x(o.id), children: /* @__PURE__ */ e.jsx(Ze, {}) }),
          t.pages && o.title !== null && /* @__PURE__ */ e.jsx(s.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Edit ${o.fallback}'s page`, asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: y(`cms/terms/${o.id}/edit`) + `?locale=${c}`, children: /* @__PURE__ */ e.jsx(Fs, {}) }) }),
          /* @__PURE__ */ e.jsx(
            s.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Move ${o.fallback} to the trash`,
              onClick: () => i(
                `Move "${o.fallback}" to the trash, with the terms under it? It comes off the site; you can restore it.`,
                () => f.router.delete(y(`cms/terms/${o.id}`), { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(z, {})
            }
          )
        ] }) }, o.id);
      })
    ] }) })
  ] });
}
function ke({ action: t, method: a, locale: l, terms: r, hierarchical: c, term: n, submitLabel: i, onDone: u }) {
  const p = f.useForm({ title: n?.title ?? "", slug: n?.slug ?? "", parent_id: n?.parentId ?? null, locale: l }), x = p.errors, g = /* @__PURE__ */ new Set();
  if (n) {
    g.add(n.id);
    const j = r.findIndex((b) => b.id === n.id);
    for (let b = j + 1; b < r.length && (r[b]?.depth ?? 0) > n.depth; b++) g.add(r[b].id);
  }
  const o = (j) => {
    j.preventDefault(), p.submit(a, t, { preserveScroll: !0, onSuccess: () => {
      a === "post" && p.reset("title", "slug"), u?.();
    } });
  }, d = n ? `term-${n.id}` : "new-term";
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: o, className: "cms:grid cms:items-start cms:gap-3 cms:md:grid-cols-[2fr_1.5fr_1.5fr_auto]", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${d}-title`, className: n ? "cms:sr-only" : "", children: "Title" }),
      /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: `${d}-title`,
          value: p.data.title,
          placeholder: n?.fallback,
          required: !0,
          onChange: (j) => p.setData("title", j.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(D, { message: x.title })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${d}-slug`, className: n ? "cms:sr-only" : "", children: "Slug" }),
      /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: `${d}-slug`,
          className: "cms:font-mono",
          value: p.data.slug,
          placeholder: "Made from the title",
          onChange: (j) => p.setData("slug", j.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(D, { message: x.slug })
    ] }),
    c ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${d}-parent`, className: n ? "cms:sr-only" : "", children: "Under" }),
      /* @__PURE__ */ e.jsxs(
        s.Select,
        {
          value: p.data.parent_id === null ? ie : String(p.data.parent_id),
          onValueChange: (j) => p.setData("parent_id", j === ie ? null : Number(j)),
          children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: `${d}-parent`, children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(s.SelectItem, { value: ie, children: "Top level" }),
              r.filter((j) => !g.has(j.id)).map((j) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: String(j.id), children: [
                "— ".repeat(j.depth),
                j.title ?? j.fallback
              ] }, j.id))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ e.jsx(D, { message: x.parent_id })
    ] }) : /* @__PURE__ */ e.jsx("div", {}),
    /* @__PURE__ */ e.jsxs("div", { className: `cms:flex cms:gap-2 ${n ? "" : "cms:md:mt-6"}`, children: [
      /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: p.processing, children: [
        !n && /* @__PURE__ */ e.jsx(R, {}),
        " ",
        i
      ] }),
      u && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", onClick: u, children: "Cancel" })
    ] })
  ] });
}
ks({
  pages: {
    "Cms/Blueprints/Index": ut,
    "Cms/Blueprints/Form": mt,
    "Cms/Fieldsets/Index": Nt,
    "Cms/Entries/Index": ft,
    "Cms/Entries/Editor": ht,
    "Cms/Entries/Listing": bt,
    "Cms/Terms/Index": Rt,
    "Cms/Terms/Edit": Ft,
    "Cms/Globals/Index": kt,
    "Cms/Globals/Edit": yt,
    "Cms/Menus/Index": Bt,
    "Cms/Menus/Edit": Dt,
    "Cms/Comments/Index": Mt,
    "Cms/Submissions/Index": Et
  }
});
export {
  Rs as L,
  k as R,
  de as U,
  Vt as _,
  y as a,
  $ as c,
  Qs as i,
  e as j,
  s as u
};
