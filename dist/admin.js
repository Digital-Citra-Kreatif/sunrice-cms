const Ds = globalThis.Sunrice;
if (!Ds) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const e = Ds.modules["react/jsx-runtime"], _s = globalThis.Sunrice;
if (!_s) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const S = _s.modules["@inertiajs/react"], is = 3;
function Qe() {
  const s = globalThis.Sunrice;
  if (!s)
    throw new Error("[sunrice] This script runs outside the Sunrice admin panel (window.Sunrice is missing).");
  return s;
}
function Ca(s) {
  const a = Qe();
  if (a.version !== is)
    throw new Error(`[sunrice] This plugin was built for admin runtime ${is}, but the panel runs ${a.version}. Rebuild it with a matching @sunrice/admin-sdk.`);
  for (const [l, c] of Object.entries(s.pages ?? {}))
    a.registerPage(l, c);
}
function t(s, a = {}) {
  return Qe().t(s, a);
}
function z(s = "") {
  return Qe().adminUrl(s);
}
function te(s) {
  return { draft: t("Draft"), scheduled: t("Scheduled"), published: t("Published") }[s];
}
function K(s, a) {
  if (!s) return "—";
  const l = new Date(s);
  return Number.isNaN(l.getTime()) ? "—" : l.toLocaleString(document.documentElement.lang || void 0, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
}
function $a(s, a = /* @__PURE__ */ new Date()) {
  const l = s ? new Date(s) : null;
  if (l && !Number.isNaN(l.getTime()) && l > a) return l;
  const c = new Date(a);
  return c.setDate(c.getDate() + 1), c.setMinutes(0, 0, 0), c;
}
function Ts(s) {
  const a = (l) => String(l).padStart(2, "0");
  return `${s.getFullYear()}-${a(s.getMonth() + 1)}-${a(s.getDate())}T${a(s.getHours())}:${a(s.getMinutes())}`;
}
let Ke = {};
function Da(s) {
  Ke = s ?? {};
}
function P(s, a) {
  if (a === void 0 && Ke[s]) return Ke[s];
  try {
    return new Intl.DisplayNames(a ? [a] : void 0, { type: "language" }).of(s.replace("_", "-")) ?? s;
  } catch {
    return s;
  }
}
function os(s) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function _a(s, a, l, c) {
  return c && s !== "" && s === os(a) ? os(l) : s;
}
function zs(s, a, l) {
  return !s || a.trim() === "" || a.trim() === s ? null : l ? "redirects" : "breaks";
}
const Ms = globalThis.Sunrice;
if (!Ms) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const D = Ms.modules.react;
const Ta = (s) => s?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
function za(s, a, l = []) {
  if (a == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: Ta(s),
    size: 24,
    node: a,
    ...l.length > 0 ? { aliases: l } : {}
  };
}
const Ma = (s) => {
  let a = "", l = !1;
  for (const c of s) {
    if (c === "-" || c === "_" || c <= " ") {
      l = a.length > 0;
      continue;
    }
    a.length === 0 ? a += c.toLowerCase() : a += l ? c.toUpperCase() : c, l = !1;
  }
  return a;
};
const Ba = (s) => {
  const a = Ma(s);
  return a.charAt(0).toUpperCase() + a.slice(1);
};
const We = (...s) => s.filter((a, l, c) => !!a && a.trim() !== "" && c.indexOf(a) === l).join(" ").trim();
const me = {
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
function Be(s) {
  return s != null;
}
function La(s, a = {}) {
  const l = a.attributeNames ?? {}, c = (u) => l[u] ?? u, i = s.size ?? s.width ?? me.width, r = s.size ?? s.height ?? me.height, d = s.aliases?.filter((u) => typeof u == "string" && u.trim() !== "").map((u) => `lucide-${u}`) ?? [], p = [...s.name ? [`lucide-${s.name}`] : [], ...d], m = a.className?.split(" ").filter(Boolean) ?? [], o = a.includeDefaultClasses === !1 ? We(...m) : We("lucide", ...p, ...m), x = a.absoluteStrokeWidth ? Number(a.strokeWidth ?? me["stroke-width"]) * Number(s.size ?? s.width ?? me.width) / Number(a.size ?? a.width ?? me.width) : a.strokeWidth ?? me["stroke-width"];
  return [
    "svg",
    {
      ...Object.entries(me).reduce((u, [y, w]) => (u[c(y)] = w, u), {}),
      ..."color" in a && a.color && {
        [c("stroke")]: a.color
      },
      ..."size" in a && Be(a.size) && {
        [c("width")]: a.size,
        [c("height")]: a.size
      },
      ..."width" in a && Be(a.width) && {
        [c("width")]: a.width
      },
      ..."height" in a && Be(a.height) && {
        [c("height")]: a.height
      },
      [c("stroke-width")]: x,
      ...o && {
        [c("class")]: o
      },
      [c("viewBox")]: `0 0 ${i} ${r}`,
      ...a.hasA11yProp === !1 ? {
        [c("aria-hidden")]: "true"
      } : {},
      ..."attributes" in a && a.attributes
    },
    s.node.map((u) => {
      const [y, w, N] = u, j = a.nonScalingStroke ? { [c("vector-effect")]: "non-scaling-stroke", ...w } : w;
      return N ? [y, j, N] : [y, j];
    })
  ];
}
function Ia(s, a = {}) {
  return La(s, {
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
const Aa = (s) => {
  for (const a in s)
    if (a.startsWith("aria-") || a === "role" || a === "title")
      return !0;
  return !1;
}, Ea = D.createContext({}), Fa = () => D.useContext(Ea), Ha = D.forwardRef(
  ({
    color: s,
    size: a,
    width: l,
    height: c,
    strokeWidth: i,
    absoluteStrokeWidth: r,
    nonScalingStroke: d,
    className: p = "",
    children: m,
    iconNode: o = [],
    icon: x = {
      node: o,
      aliases: [],
      size: 24
    },
    ...h
  }, u) => {
    const {
      size: y = 24,
      strokeWidth: w = 2,
      absoluteStrokeWidth: N = !1,
      nonScalingStroke: j = !1,
      color: C = "currentColor",
      className: $ = ""
    } = Fa() ?? {}, f = !!m || Aa(h), [g, b, B = []] = Ia(x, {
      color: s ?? C,
      width: l ?? a ?? y,
      height: c ?? a ?? y,
      strokeWidth: i ?? w,
      absoluteStrokeWidth: r ?? N,
      nonScalingStroke: d ?? j,
      className: We($, p),
      hasA11yProp: f,
      attributes: h
    });
    return D.createElement(
      g,
      {
        ref: u,
        ...b
      },
      [
        ...B.map(([E, I]) => D.createElement(E, I)),
        ...Array.isArray(m) ? m : [m]
      ]
    );
  }
);
function M(s, a = [], l = []) {
  const c = typeof s == "string" ? za(s, a, l) : s, i = D.forwardRef(
    ({ className: r, ...d }, p) => D.createElement(Ha, {
      ref: p,
      icon: c,
      className: r,
      ...d
    })
  );
  return c.name && (i.displayName = Ba(c.name)), i;
}
const Bs = {
  name: "arrow-down",
  size: 24,
  node: [
    ["path", { d: "M12 5v14", key: "s699le" }],
    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
  ]
};
Bs.node;
const Ls = M(Bs);
const Is = {
  name: "arrow-up-down",
  size: 24,
  node: [
    ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
    ["path", { d: "M17 20V4", key: "1ejh1v" }],
    ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
    ["path", { d: "M7 4v16", key: "1glfcx" }]
  ]
};
Is.node;
const As = M(Is);
const Es = {
  name: "arrow-up",
  size: 24,
  node: [
    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
    ["path", { d: "M12 19V5", key: "x0mq9r" }]
  ]
};
Es.node;
const Fs = M(Es);
const Hs = {
  name: "blocks",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2",
        key: "1ah6g2"
      }
    ],
    ["rect", { x: "14", y: "2", width: "8", height: "8", rx: "1", key: "88lufb" }]
  ]
};
Hs.node;
const Pa = M(Hs);
const Ps = {
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
Ps.node;
const Ge = M(Ps);
const Os = {
  name: "calendar",
  size: 24,
  node: [
    ["path", { d: "M8 2v3", key: "1ioesn" }],
    ["path", { d: "M16 2v3", key: "otl347" }],
    ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", key: "h1oib" }],
    ["path", { d: "M3 9h18", key: "1pudct" }]
  ]
};
Os.node;
const Oa = M(Os);
const Vs = {
  name: "check",
  size: 24,
  node: [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]
};
Vs.node;
const je = M(Vs);
const Rs = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
Rs.node;
const Us = M(Rs);
const qs = {
  name: "chevron-left",
  size: 24,
  node: [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]]
};
qs.node;
const Ze = M(qs);
const Ks = {
  name: "chevron-right",
  size: 24,
  node: [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]
};
Ks.node;
const ye = M(Ks);
const Ws = {
  name: "chevrons-down-up",
  size: 24,
  node: [
    ["path", { d: "m7 20 5-5 5 5", key: "13a0gw" }],
    ["path", { d: "m7 4 5 5 5-5", key: "1kwcof" }]
  ]
};
Ws.node;
const Va = M(Ws);
const Gs = {
  name: "chevrons-up-down",
  size: 24,
  node: [
    ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
    ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
  ]
};
Gs.node;
const Ra = M(Gs);
const Ys = {
  name: "columns-3",
  size: 24,
  node: [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M9 3v18", key: "fh3hqa" }],
    ["path", { d: "M15 3v18", key: "14nvp0" }]
  ],
  aliases: ["panels-left-right"]
};
Ys.node;
const Ua = M(Ys);
const Js = {
  name: "compass",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    [
      "path",
      {
        d: "m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",
        key: "9ktpf1"
      }
    ]
  ]
};
Js.node;
const qa = M(Js);
const Qs = {
  name: "copy",
  size: 24,
  node: [
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
  ]
};
Qs.node;
const Zs = M(Qs);
const Xs = {
  name: "download",
  size: 24,
  node: [
    ["path", { d: "M12 15V3", key: "m9g1x1" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
  ]
};
Xs.node;
const et = M(Xs);
const st = {
  name: "ellipsis-vertical",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
    ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
    ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }]
  ],
  aliases: ["more-vertical"]
};
st.node;
const Ka = M(st);
const tt = {
  name: "ellipsis",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
    ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
    ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
  ],
  aliases: ["more-horizontal"]
};
tt.node;
const at = M(tt);
const nt = {
  name: "external-link",
  size: 24,
  node: [
    ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
    ["path", { d: "M10 14 21 3", key: "gplh6r" }],
    ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
  ]
};
nt.node;
const ge = M(nt);
const lt = {
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
lt.node;
const Wa = M(lt);
const ct = {
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
ct.node;
const Ga = M(ct);
const rt = {
  name: "group",
  size: 24,
  node: [
    ["path", { d: "M3 7V5c0-1.1.9-2 2-2h2", key: "adw53z" }],
    ["path", { d: "M17 3h2c1.1 0 2 .9 2 2v2", key: "an4l38" }],
    ["path", { d: "M21 17v2c0 1.1-.9 2-2 2h-2", key: "144t0e" }],
    ["path", { d: "M7 21H5c-1.1 0-2-.9-2-2v-2", key: "rtnfgi" }],
    ["rect", { width: "7", height: "5", x: "7", y: "7", rx: "1", key: "1eyiv7" }],
    ["rect", { width: "7", height: "5", x: "10", y: "12", rx: "1", key: "1qlmkx" }]
  ]
};
rt.node;
const Ya = M(rt);
const it = {
  name: "hash",
  size: 24,
  node: [
    ["line", { x1: "4", x2: "20", y1: "9", y2: "9", key: "4lhtct" }],
    ["line", { x1: "4", x2: "20", y1: "15", y2: "15", key: "vyu0kd" }],
    ["line", { x1: "10", x2: "8", y1: "3", y2: "21", key: "1ggp8o" }],
    ["line", { x1: "16", x2: "14", y1: "3", y2: "21", key: "weycgp" }]
  ]
};
it.node;
const Ja = M(it);
const ot = {
  name: "image",
  size: 24,
  node: [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
    ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
    ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
  ]
};
ot.node;
const Qa = M(ot);
const dt = {
  name: "inbox",
  size: 24,
  node: [
    ["polyline", { points: "22 12 16 12 14 15 10 15 8 12 2 12", key: "o97t9d" }],
    [
      "path",
      {
        d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
        key: "oot6mr"
      }
    ]
  ]
};
dt.node;
const Za = M(dt);
const mt = {
  name: "languages",
  size: 24,
  node: [
    ["path", { d: "m5 8 6 6", key: "1wu5hv" }],
    ["path", { d: "m4 14 6-6 2-3", key: "1k1g8d" }],
    ["path", { d: "M2 5h12", key: "or177f" }],
    ["path", { d: "M7 2h1", key: "1t2jsx" }],
    ["path", { d: "m22 22-5-10-5 10", key: "don7ne" }],
    ["path", { d: "M14 18h6", key: "1m8k6r" }]
  ]
};
mt.node;
const ds = M(mt);
const ut = {
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
ut.node;
const Xa = M(ut);
const ht = {
  name: "link-2",
  size: 24,
  node: [
    ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
    ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
    ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
  ]
};
ht.node;
const xt = M(ht);
const pt = {
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
pt.node;
const en = M(pt);
const gt = {
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
gt.node;
const sn = M(gt);
const ft = {
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
ft.node;
const jt = M(ft);
const bt = {
  name: "loader-circle",
  size: 24,
  node: [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  aliases: ["loader-2"]
};
bt.node;
const ce = M(bt);
const vt = {
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
vt.node;
const yt = M(vt);
const Nt = {
  name: "message-square",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
        key: "18887p"
      }
    ]
  ]
};
Nt.node;
const tn = M(Nt);
const kt = {
  name: "newspaper",
  size: 24,
  node: [
    ["path", { d: "M15 18h-5", key: "95g1m2" }],
    ["path", { d: "M18 14h-8", key: "sponae" }],
    [
      "path",
      {
        d: "M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2",
        key: "39pd36"
      }
    ],
    ["rect", { width: "8", height: "4", x: "10", y: "6", rx: "1", key: "aywv1n" }]
  ]
};
kt.node;
const an = M(kt);
const wt = {
  name: "paperclip",
  size: 24,
  node: [
    [
      "path",
      {
        d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
        key: "1miecu"
      }
    ]
  ]
};
wt.node;
const nn = M(wt);
const St = {
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
St.node;
const Ct = M(St);
const $t = {
  name: "plus",
  size: 24,
  node: [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ]
};
$t.node;
const Y = M($t);
const Dt = {
  name: "puzzle",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z",
        key: "w46dr5"
      }
    ]
  ]
};
Dt.node;
const ln = M(Dt);
const _t = {
  name: "repeat",
  size: 24,
  node: [
    ["path", { d: "m17 2 4 4-4 4", key: "nntrym" }],
    ["path", { d: "M3 11v-1a4 4 0 0 1 4-4h14", key: "84bu3i" }],
    ["path", { d: "m7 22-4-4 4-4", key: "1wqhfi" }],
    ["path", { d: "M21 13v1a4 4 0 0 1-4 4H3", key: "1rx37r" }]
  ]
};
_t.node;
const cn = M(_t);
const Tt = {
  name: "rotate-ccw",
  size: 24,
  node: [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ]
};
Tt.node;
const be = M(Tt);
const zt = {
  name: "search",
  size: 24,
  node: [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ]
};
zt.node;
const Ne = M(zt);
const Mt = {
  name: "send",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
        key: "1ffxy3"
      }
    ],
    ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
  ]
};
Mt.node;
const rn = M(Mt);
const Bt = {
  name: "settings-2",
  size: 24,
  node: [
    ["path", { d: "M14 17H5", key: "gfn3mx" }],
    ["path", { d: "M19 7h-9", key: "6i9tg" }],
    ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
    ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
  ]
};
Bt.node;
const Xe = M(Bt);
const Lt = {
  name: "shapes",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z",
        key: "1bo67w"
      }
    ],
    ["rect", { x: "3", y: "14", width: "7", height: "7", rx: "1", key: "1bkyp8" }],
    ["circle", { cx: "17.5", cy: "17.5", r: "3.5", key: "w3z12y" }]
  ]
};
Lt.node;
const on = M(Lt);
const It = {
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
It.node;
const Ye = M(It);
const At = {
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
At.node;
const dn = M(At);
const Et = {
  name: "tags",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M13.172 2a2 2 0 0 1 1.414.586l6.71 6.71a2.4 2.4 0 0 1 0 3.408l-4.592 4.592a2.4 2.4 0 0 1-3.408 0l-6.71-6.71A2 2 0 0 1 6 9.172V3a1 1 0 0 1 1-1z",
        key: "16rjxf"
      }
    ],
    [
      "path",
      { d: "M2 7v6.172a2 2 0 0 0 .586 1.414l6.71 6.71a2.4 2.4 0 0 0 3.191.193", key: "178nd4" }
    ],
    ["circle", { cx: "10.5", cy: "6.5", r: ".5", fill: "currentColor", key: "12ikhr" }]
  ]
};
Et.node;
const mn = M(Et);
const Ft = {
  name: "text-align-start",
  size: 24,
  node: [
    ["path", { d: "M21 5H3", key: "1fi0y6" }],
    ["path", { d: "M15 12H3", key: "6jk70r" }],
    ["path", { d: "M17 19H3", key: "z6ezky" }]
  ],
  aliases: ["text", "align-left"]
};
Ft.node;
const un = M(Ft);
const Ht = {
  name: "toggle-left",
  size: 24,
  node: [
    ["circle", { cx: "9", cy: "12", r: "3", key: "u3jwor" }],
    ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "7", key: "g7kal2" }]
  ]
};
Ht.node;
const hn = M(Ht);
const Pt = {
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
Pt.node;
const W = M(Pt);
const Ot = {
  name: "triangle-alert",
  size: 24,
  node: [
    [
      "path",
      {
        d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
        key: "wmoenq"
      }
    ],
    ["path", { d: "M12 9v4", key: "juzpu7" }],
    ["path", { d: "M12 17h.01", key: "p32p05" }]
  ],
  aliases: ["alert-triangle"]
};
Ot.node;
const xn = M(Ot);
const Vt = {
  name: "type",
  size: 24,
  node: [
    ["path", { d: "M12 4v16", key: "1654pz" }],
    ["path", { d: "M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2", key: "e0r10z" }],
    ["path", { d: "M9 20h6", key: "s66wpe" }]
  ]
};
Vt.node;
const pn = M(Vt);
const Rt = {
  name: "undo-2",
  size: 24,
  node: [
    ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
    ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
  ]
};
Rt.node;
const _e = M(Rt);
const Ut = {
  name: "x",
  size: 24,
  node: [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]
};
Ut.node;
const ke = M(Ut), qt = globalThis.Sunrice;
if (!qt) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const n = qt.modules["@sunrice/admin-sdk/ui"];
function Kt({ id: s, children: a }) {
  return /* @__PURE__ */ e.jsxs("p", { id: s, className: "cms:flex cms:items-start cms:gap-2 cms:rounded-md cms:border cms:border-amber-500/40 cms:bg-amber-500/10 cms:px-3 cms:py-2 cms:text-sm cms:text-amber-900 cms:dark:text-amber-200", children: [
    /* @__PURE__ */ e.jsx(xn, { className: "cms:mt-0.5 cms:size-4 cms:shrink-0", "aria-hidden": !0 }),
    /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:[overflow-wrap:anywhere] cms:[&_code]:rounded cms:[&_code]:bg-amber-500/15 cms:[&_code]:px-1 cms:[&_code]:font-mono cms:[&_code]:text-[0.8125rem]", children: a })
  ] });
}
function re() {
  const [s, a] = D.useState(null), l = /* @__PURE__ */ e.jsx(n.Dialog, { open: s !== null, onOpenChange: (c) => !c && a(null), children: /* @__PURE__ */ e.jsxs(n.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(n.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(n.DialogTitle, { children: t("Are you sure?") }),
      /* @__PURE__ */ e.jsx(n.DialogDescription, { children: s?.message })
    ] }),
    /* @__PURE__ */ e.jsxs(n.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "outline", onClick: () => a(null), children: t("Cancel") }),
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "destructive", onClick: () => {
        s?.onConfirm(), a(null);
      }, children: s?.label ?? t("Delete") })
    ] })
  ] }) });
  return [(c, i, r = "Delete") => a({ message: c, onConfirm: i, label: r }), l];
}
function ue(s) {
  return s && typeof s == "object" && !Array.isArray(s) ? s : {};
}
function gn(s, a) {
  if (typeof s != "string" || s === "") return "";
  const l = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(s);
  return l ? a ? `${l[1]}T${l[2] ?? "00:00"}` : l[1] ?? "" : "";
}
function ms(s) {
  return s === "" ? null : s;
}
function fn(s) {
  const a = typeof s == "number" ? s : typeof s == "string" && s.trim() !== "" ? Number(s) : NaN;
  return !Number.isFinite(a) || Math.abs(a) < 1e4 ? null : new Intl.NumberFormat("en", { maximumFractionDigits: 20 }).format(a);
}
function jn(s, a, l, c) {
  return a || s.some((i) => ["none", ""].includes(i.label.trim().toLowerCase()) || i.value.trim().toLowerCase() === "none") ? !1 : !l || !c;
}
function Te(s) {
  return s.some((a) => a.shared === !0 || Te(a.fields ?? []) || (a.blocks ?? []).some((l) => Te(l.fields)));
}
function bn() {
  return { _hidden: !1 };
}
function es(s, a, l = 60) {
  for (const c of s) {
    const i = a[c.handle];
    let r = null;
    ["text", "textarea", "email", "url"].includes(c.type) && typeof i == "string" ? r = i : c.type === "rich_text" && typeof i == "string" ? r = i.replace(/<[^>]*>/g, " ") : c.type === "group" && Array.isArray(c.fields) && (r = es(c.fields, ue(i), l));
    const d = (r ?? "").replace(/\s+/g, " ").trim();
    if (d !== "") return d.length > l ? `${d.slice(0, l - 1).trimEnd()}…` : d;
  }
  return null;
}
function vn(s) {
  return { type: s, hidden: !1, values: {} };
}
function yn(s) {
  const a = s.replace(/[\u0000- \u007f]+/g, ""), l = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(a);
  return l ? ["http", "https", "mailto", "tel"].includes(l[1].toLowerCase()) : !a.includes("\\");
}
function Wt({ ids: s, search: a, collections: l }) {
  const c = new URLSearchParams();
  for (const i of s ?? []) c.append("ids[]", String(i));
  a && c.set("search", a);
  for (const i of l) c.append("collections[]", i);
  return c.toString();
}
let Nn = 0;
function kn(s, a) {
  return s.length === a ? s.slice() : s.length < a ? [...s, ...Array.from({ length: a - s.length }, () => `k${++Nn}`)] : s.slice(0, a);
}
function wn({ taxonomy: s, q: a, ids: l }) {
  const c = new URLSearchParams({ taxonomy: s });
  a && c.set("q", a);
  for (const i of l ?? []) c.append("ids[]", String(i));
  return c.toString();
}
async function us(s) {
  const a = await fetch(`${z("cms/entries/picker")}?${Wt(s)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!a.ok) throw new Error(String(a.status));
  const l = await a.json();
  return { items: l.items, unavailable: l.unavailable ?? [] };
}
function Sn(s) {
  return s.length < 2 ? s[0] ?? "" : t(":items and :last", { items: s.slice(0, -1).join(", "), last: s[s.length - 1] });
}
function we({ id: s, value: a, multiple: l, max: c, collections: i, invalid: r, onChange: d, emptyHint: p }) {
  const m = a === null ? [] : Array.isArray(a) ? a : [a], [o, x] = D.useState({}), [h, u] = D.useState(""), [y, w] = D.useState(!1), [N, j] = D.useState(null), [C, $] = D.useState([]), [f, g] = D.useState(!1), b = l && c !== null && m.length >= c, B = m.filter((_) => !o[_]).join(",");
  D.useEffect(() => {
    B !== "" && us({ ids: B.split(",").map(Number), collections: i }).then(({ items: _ }) => x((H) => ({ ...H, ...Object.fromEntries(_.map((v) => [v.id, v])) }))).catch(() => g(!0));
  }, [B]), D.useEffect(() => {
    if (!y) {
      j(null);
      return;
    }
    const _ = window.setTimeout(() => {
      us({ search: h.trim(), collections: i }).then((H) => {
        j(H.items), $(H.unavailable), g(!1);
      }).catch(() => g(!0));
    }, h.trim() === "" ? 0 : 250);
    return () => window.clearTimeout(_);
  }, [h, y]);
  const E = (_) => {
    x((H) => ({ ...H, [_.id]: _ })), d(l ? [...m, _.id] : _.id), u("");
  }, I = (_) => d(l ? _ : _[0] ?? null);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    m.length > 0 && /* @__PURE__ */ e.jsx(n.SortableList, { items: m, getId: (_) => _, getLabel: (_) => o[_]?.title ?? `Entry #${_}`, onReorder: (_) => I(_), disabled: !l, className: "cms:gap-1", children: (_, { handle: H }) => {
      const v = o[_];
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-md cms:border cms:bg-card cms:px-2 cms:py-1 cms:text-sm", children: [
        l && /* @__PURE__ */ e.jsx(n.SortableHandle, { ...H, label: t("Move :title", { title: v?.title ?? _ }) }),
        /* @__PURE__ */ e.jsx("span", { className: `cms:min-w-0 cms:flex-1 cms:truncate ${l ? "" : "cms:pl-1"}`, children: v ? v.title : t("Entry #:id", { id: _ }) }),
        v && /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: v.collection }),
        v && /* @__PURE__ */ e.jsx(n.Badge, { variant: v.status === "published" ? "success" : "secondary", children: te(v.status) }),
        /* @__PURE__ */ e.jsx(
          n.Button,
          {
            type: "button",
            variant: "ghost",
            size: "icon",
            className: "cms:size-7",
            "aria-label": t("Remove :title", { title: v?.title ?? _ }),
            onClick: () => I(m.filter((A) => A !== _)),
            children: /* @__PURE__ */ e.jsx(ke, {})
          }
        )
      ] });
    } }),
    !b && (l || m.length === 0) && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-md", children: [
      /* @__PURE__ */ e.jsx(Ne, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
      /* @__PURE__ */ e.jsx(
        n.Input,
        {
          id: s,
          className: "cms:pl-9",
          placeholder: t("Search entries by title"),
          "aria-invalid": r,
          value: h,
          autoComplete: "off",
          "aria-expanded": N !== null,
          onFocus: () => w(!0),
          onBlur: () => w(!1),
          onKeyDown: (_) => {
            _.key === "Escape" && y && (_.preventDefault(), w(!1));
          },
          onChange: (_) => {
            u(_.target.value), w(!0);
          }
        }
      ),
      N !== null && /* @__PURE__ */ e.jsxs("ul", { role: "listbox", "aria-label": t("Matching entries"), className: "cms:absolute cms:z-10 cms:mt-1 cms:max-h-64 cms:w-full cms:overflow-auto cms:rounded-md cms:border cms:bg-card cms:p-1 cms:shadow-md", children: [
        N.filter((_) => !m.includes(_.id)).length === 0 && /* @__PURE__ */ e.jsxs("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: [
          h.trim() === "" ? t("No entries yet.") : t("No entries match."),
          p && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            " ",
            p
          ] })
        ] }),
        C.length > 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: t("Your role can't see entries of :collections: ask an editor to link them.", { collections: Sn(C) }) }),
        N.filter((_) => !m.includes(_.id)).map((_) => /* @__PURE__ */ e.jsx("li", { role: "option", "aria-selected": !1, children: /* @__PURE__ */ e.jsxs(
          "button",
          {
            type: "button",
            className: "cms:flex cms:w-full cms:items-center cms:gap-2 cms:rounded cms:px-2 cms:py-1.5 cms:text-left cms:text-sm cms:hover:bg-accent",
            onMouseDown: (H) => H.preventDefault(),
            onClick: () => E(_),
            children: [
              /* @__PURE__ */ e.jsx("span", { className: "cms:flex-1 cms:truncate", children: _.title }),
              /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: _.collection })
            ]
          }
        ) }, _.id))
      ] })
    ] }),
    f && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t("Entries could not be loaded. Try again.") })
  ] });
}
const Gt = D.createContext({}), Le = "__none";
async function hs(s) {
  const a = await fetch(`${z("cms/terms/picker")}?${wn(s)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!a.ok) throw new Error(String(a.status));
  return await a.json();
}
function Yt({ id: s, taxonomy: a, multiple: l, max: c, required: i, invalid: r, value: d, onChange: p }) {
  const m = D.useContext(Gt), o = d === null ? [] : Array.isArray(d) ? d : [d], [x, h] = D.useState(null), [u, y] = D.useState(!1), [w, N] = D.useState(""), [j, C] = D.useState({}), [$, f] = D.useState(!1);
  D.useEffect(() => {
    if (!a) return;
    const v = w.trim(), A = window.setTimeout(() => {
      hs({ taxonomy: a, q: v }).then((V) => {
        h(V.items), V.more && y(!0), f(!1);
      }).catch(() => f(!0));
    }, v === "" ? 0 : 250);
    return () => window.clearTimeout(A);
  }, [a, w]);
  const g = (v) => m[String(v)] ?? j[v] ?? x?.find((A) => A.id === v)?.label, b = x === null ? "" : o.filter((v) => g(v) === void 0).join(",");
  if (D.useEffect(() => {
    !a || b === "" || hs({ taxonomy: a, ids: b.split(",").map(Number) }).then((v) => C((A) => ({ ...A, ...Object.fromEntries(v.items.map((V) => [V.id, V.label])) }))).catch(() => f(!0));
  }, [a, b]), !a) return /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("Choose a taxonomy for this field in its blueprint.") });
  if (x === null) return $ ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t("Terms could not be loaded. Try again.") }) : /* @__PURE__ */ e.jsx(n.Skeleton, { className: "cms:h-9 cms:w-full cms:max-w-sm" });
  const B = (v) => `${"— ".repeat(v.depth)}${v.label}`, E = l && c !== null && o.length >= c, I = (v) => p(l ? v : v[0] ?? null), _ = u && o.length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-1.5", children: o.map((v) => /* @__PURE__ */ e.jsxs(n.Badge, { variant: "secondary", className: "cms:gap-1 cms:pr-1", children: [
    g(v) ?? t("Term #:id", { id: v }),
    !(i && !l) && /* @__PURE__ */ e.jsx(
      "button",
      {
        type: "button",
        className: "cms:rounded-sm cms:p-0.5 cms:hover:bg-muted",
        "aria-label": t("Remove :title", { title: g(v) ?? v }),
        onClick: () => I(o.filter((A) => A !== v)),
        children: /* @__PURE__ */ e.jsx(ke, { className: "cms:size-3" })
      }
    )
  ] }, v)) }), H = u && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-sm", children: [
    /* @__PURE__ */ e.jsx(Ne, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
    /* @__PURE__ */ e.jsx(
      n.Input,
      {
        id: s,
        className: "cms:pl-9",
        placeholder: t("Search terms"),
        autoComplete: "off",
        "aria-invalid": r,
        value: w,
        onChange: (v) => N(v.target.value)
      }
    )
  ] });
  if (!l && !u) {
    const v = o[0], A = v === void 0 || x.some((V) => V.id === v);
    return /* @__PURE__ */ e.jsxs(n.Select, { value: v === void 0 ? Le : String(v), onValueChange: (V) => p(V === Le ? null : Number(V)), children: [
      /* @__PURE__ */ e.jsx(n.SelectTrigger, { id: s, className: "cms:w-full cms:max-w-sm", "aria-invalid": r, children: /* @__PURE__ */ e.jsx(n.SelectValue, { children: v === void 0 ? t("None") : g(v) ?? t("Term #:id", { id: v }) }) }),
      /* @__PURE__ */ e.jsxs(n.SelectContent, { children: [
        !i && /* @__PURE__ */ e.jsx(n.SelectItem, { value: Le, children: t("None") }),
        !A && v !== void 0 && /* @__PURE__ */ e.jsx(n.SelectItem, { value: String(v), children: g(v) ?? t("Term #:id", { id: v }) }),
        x.map((V) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: String(V.id), children: B(V) }, V.id))
      ] })
    ] });
  }
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    _,
    H,
    x.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: w.trim() ? t("No terms match.") : t("Nothing to choose from yet.") }) : l ? /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:max-h-72 cms:flex-col cms:gap-2 cms:overflow-auto", children: x.map((v) => {
      const A = o.includes(v.id);
      return /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx(
          n.Checkbox,
          {
            checked: A,
            disabled: !A && E,
            onCheckedChange: (V) => I(V ? [...o, v.id] : o.filter((ne) => ne !== v.id))
          }
        ),
        B(v)
      ] }, v.id);
    }) }) : /* @__PURE__ */ e.jsx("div", { role: "listbox", "aria-label": t("Terms"), className: "cms:flex cms:max-h-72 cms:flex-col cms:overflow-auto", children: x.map((v) => /* @__PURE__ */ e.jsx(
      n.Button,
      {
        type: "button",
        variant: o[0] === v.id ? "secondary" : "ghost",
        size: "sm",
        className: "cms:justify-start",
        role: "option",
        "aria-selected": o[0] === v.id,
        onClick: () => p(v.id),
        children: B(v)
      },
      v.id
    )) })
  ] });
}
const Jt = (s, a = {}) => s.replace(/:([A-Za-z_]+)/g, (l, c) => a[c] ?? l), Cn = 5;
let $n = 0;
const ss = () => `f${++$n}`;
function Qt(s) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function ts(s) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^[0-9_]+/, "").replace(/_{2,}/g, "_").slice(0, 64);
}
function Zt(s, a) {
  const l = new Set(a.map((r) => r.handle)), c = Qt(s) || "field";
  let i = c;
  for (let r = 2; l.has(i); r++)
    i = `${c}_${r}`;
  return i;
}
function Xt(s) {
  return (s ?? []).map(({ fields: a, ...l }) => ({
    ...l,
    key: ss(),
    fields: Xt(a),
    handleTouched: !0,
    savedHandle: l.handle
  }));
}
function ea(s, a) {
  return s.map(({ key: l, handleTouched: c, savedHandle: i, fields: r, ...d }) => ({
    ...d,
    validation: (d.validation ?? []).map((p) => p.trim()).filter((p) => p !== ""),
    ...a(d.type) ? { fields: ea(r, a) } : {}
  }));
}
function Dn(s, a, l) {
  return { key: ss(), type: s, label: a, handle: Zt(a, l), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function Ie(s) {
  return s.type !== "fieldset" && s.savedHandle !== void 0 && s.savedHandle !== "" && s.handle !== s.savedHandle ? s.savedHandle : null;
}
function sa(s) {
  return s.map((a) => ({ ...a, savedHandle: a.handle, fields: sa(a.fields) }));
}
function xs(s, a, l) {
  if (s.handleTouched) return { ...s, label: a };
  const c = l.filter((i) => i.key !== s.key);
  return { ...s, label: a, handle: Zt(a || s.type, c) };
}
function he(s, a) {
  const l = `${a}.`, c = {};
  for (const [i, r] of Object.entries(s))
    i.startsWith(l) && (c[i.slice(l.length)] = r);
  return c;
}
function J(s, a) {
  const l = s[a];
  return { ...he(s, a), ...l !== void 0 ? { "": l } : {} };
}
function Me(s, a) {
  return Object.keys(s).filter((l) => l === a || l.startsWith(`${a}.`));
}
function Se(s, a) {
  return Object.keys(s).some((l) => l === a || l.startsWith(`${a}.`));
}
function _n(s, a) {
  return a.filter((l) => l.key !== s.key && l.handle !== "" && l.type !== "fieldset");
}
function ta(s, a, l, c = Jt) {
  return s.type === "fieldset" ? null : l?.includes(s.handle) ? c('":handle" is used by the content itself; choose another handle.', { handle: s.handle }) : s.handle !== "" && a.some((i) => i.key !== s.key && i.type !== "fieldset" && i.handle === s.handle) ? c('There is already a field ":handle" here.', { handle: s.handle }) : null;
}
function aa(s, a) {
  return typeof s.translatable == "boolean" ? s.translatable : a;
}
function Tn(s, a, l) {
  return { ...s, translatable: a === l ? null : a };
}
function zn(s, a, l = []) {
  const c = /* @__PURE__ */ new Set([...a.map((d) => d.handle), ...l]), i = `${(ts(s) || "field").slice(0, 56)}_copy`;
  let r = i;
  for (let d = 2; c.has(r); d++)
    r = `${i}_${d}`;
  return r;
}
function na(s) {
  const { key: a, savedHandle: l, fields: c, ...i } = s;
  return { ...structuredClone(i), key: ss(), fields: c.map(na) };
}
function Mn(s, a, l = [], c = Jt) {
  const i = s[a];
  if (i === void 0) return null;
  const r = i.label || i.handle, d = {
    ...na(i),
    label: c(":label (copy)", { label: r }),
    handle: i.type === "fieldset" ? i.handle : zn(i.handle, s, l),
    handleTouched: !0
  };
  return { fields: [...s.slice(0, a + 1), d, ...s.slice(a + 1)], copy: d };
}
function Bn(s, a) {
  const l = s.condition;
  return !l || "rules" in l ? null : (l.operator === "filled" || l.operator === "equals" && (l.value === !0 || l.value === "true")) && a.some((i) => i.handle === l.field && i.type === "toggle") ? l.field : null;
}
function Ln(s) {
  const a = (i) => i.type === "number" || i.type === "text" && (i.instructions ?? "").length <= 60, l = {}, c = [];
  for (const i of s) {
    const r = Bn(i, s);
    r === null ? c.push(i) : (l[r] ??= []).push(i);
  }
  return { options: c.filter((i) => !a(i)), limits: c.filter(a), dependents: l };
}
const Ae = [
  { value: "equals", label: "is", needsValue: !0 },
  { value: "not_equals", label: "is not", needsValue: !0 },
  { value: "filled", label: "is filled in", needsValue: !1 },
  { value: "empty", label: "is empty", needsValue: !1 }
];
function ps(s) {
  return s === !0 ? "true" : s === !1 ? "false" : typeof s == "string" || typeof s == "number" ? String(s) : "";
}
function la(s) {
  return s ? "rules" in s ? Array.isArray(s.rules) ? s.rules : [] : [s] : [];
}
function ca(s) {
  return s && "rules" in s && s.match === "any" ? "any" : "all";
}
function In(s, a) {
  return s.length === 0 ? null : s.length === 1 ? s[0] : { match: a, rules: s };
}
function gs(s, a) {
  const l = a[s.field], c = l != null && l !== "" && l !== !1 && !(Array.isArray(l) && l.length === 0), i = (Array.isArray(l) ? l : [l]).map(ps).includes(ps(s.value));
  switch (s.operator) {
    case "equals":
      return i;
    case "not_equals":
      return !i;
    case "filled":
      return c;
    default:
      return !c;
  }
}
function as(s, a) {
  const l = la(s.condition);
  return l.length === 0 ? !0 : ca(s.condition) === "any" ? l.some((c) => gs(c, a)) : l.every((c) => gs(c, a));
}
function Ee(s) {
  const a = s?.config ?? {};
  switch (s?.type) {
    case "select": {
      const l = (Array.isArray(a.options) ? a.options : []).flatMap((c) => {
        if (typeof c == "string" && c !== "") return [{ value: c, label: c }];
        if (c && typeof c == "object" && typeof c.value == "string" && c.value !== "") {
          const { value: i, label: r } = c;
          return [{ value: i, label: typeof r == "string" && r !== "" ? r : i }];
        }
        return [];
      });
      return l.length > 0 ? { kind: "options", options: l } : { kind: "text" };
    }
    case "toggle":
      return { kind: "toggle" };
    case "terms":
      return { kind: "terms", taxonomy: typeof a.taxonomy == "string" && a.taxonomy !== "" ? a.taxonomy : null };
    case "entries":
      return { kind: "entries", collections: Array.isArray(a.collections) ? a.collections.filter((l) => typeof l == "string") : [] };
    case "number":
      return { kind: "number" };
    default:
      return { kind: "text" };
  }
}
function fs(s) {
  switch (s.kind) {
    case "toggle":
      return !0;
    case "options":
      return s.options[0]?.value ?? "";
    case "terms":
    case "entries":
    case "number":
      return null;
    default:
      return "";
  }
}
const Fe = "__none";
function F({ message: s, id: a }) {
  return s ? /* @__PURE__ */ e.jsx("p", { id: a, className: "cms:text-sm cms:text-destructive", children: s }) : null;
}
function He(s) {
  const a = s.config?.options;
  return Array.isArray(a) ? a.flatMap((l) => {
    if (typeof l == "string") return [{ value: l, label: l }];
    if (l && typeof l == "object" && typeof l.value == "string") {
      const { value: c, label: i } = l;
      return [{ value: c, label: i || c }];
    }
    return [];
  }) : [];
}
const An = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function ze(s) {
  if (s.label) return s.label;
  const a = s.handle.replace(/_/g, " ");
  return a.charAt(0).toUpperCase() + a.slice(1);
}
function ae({ field: s, value: a, onChange: l, errors: c, id: i, content: r = !1, fill: d = !1 }) {
  const p = ze(s), m = An.includes(s.type) || ["select", "terms"].includes(s.type) && s.config?.multiple === !0, o = c[""] !== void 0;
  return /* @__PURE__ */ e.jsxs(
    "div",
    {
      className: "cms:flex cms:flex-col cms:gap-2",
      ...m ? { role: "group", "aria-labelledby": `${i}-label`, ...o ? { "aria-invalid": !0, "aria-describedby": `${i}-error` } : {} } : {},
      children: [
        s.type === "toggle" ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
          /* @__PURE__ */ e.jsx(n.Switch, { id: i, checked: a === !0, onCheckedChange: (x) => l(x) }),
          /* @__PURE__ */ e.jsx(n.Label, { htmlFor: i, children: p })
        ] }) : /* @__PURE__ */ e.jsxs(n.Label, { id: `${i}-label`, htmlFor: m ? void 0 : i, children: [
          p,
          s.required && /* @__PURE__ */ e.jsx("span", { className: "cms:text-destructive", children: " *" })
        ] }),
        /* @__PURE__ */ e.jsx(Fn, { field: s, value: a, onChange: l, errors: c, id: i, content: r, fill: d }),
        ["text", "textarea"].includes(s.type) && se(s, "max") !== void 0 && /* @__PURE__ */ e.jsx(En, { length: typeof a == "string" ? [...a].length : 0, max: se(s, "max") ?? 0 }),
        s.instructions && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s.instructions }),
        /* @__PURE__ */ e.jsx(F, { message: c[""], id: `${i}-error` })
      ]
    }
  );
}
function En({ length: s, max: a }) {
  const l = s > a;
  return /* @__PURE__ */ e.jsxs("p", { className: `cms:-mt-1 cms:self-end cms:text-xs cms:tabular-nums ${l ? "cms:font-medium cms:text-destructive" : "cms:text-muted-foreground"}`, children: [
    s,
    " / ",
    a,
    l && /* @__PURE__ */ e.jsxs("span", { children: [
      " · ",
      s - a,
      " too many"
    ] })
  ] });
}
function Fn({ field: s, value: a, onChange: l, errors: c, id: i, content: r, fill: d = !1 }) {
  const p = c[""] !== void 0;
  switch (s.type) {
    case "toggle":
      return null;
    case "file":
      return /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("Visitors attach a file here when they send a form.") });
    case "textarea":
      return /* @__PURE__ */ e.jsx(
        n.Textarea,
        {
          id: i,
          "aria-invalid": p,
          value: typeof a == "string" ? a : "",
          rows: se(s, "rows") ?? 4,
          onChange: (m) => l(m.target.value)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ e.jsx(n.RichTextEditor, { id: i, labelledBy: `${i}-label`, invalid: p, value: typeof a == "string" ? a : "", onChange: l });
    case "number": {
      const m = fn(a);
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(
          n.Input,
          {
            id: i,
            type: "number",
            className: d ? "cms:w-full" : "cms:max-w-48",
            placeholder: js(s, "placeholder"),
            "aria-invalid": p,
            "aria-describedby": m ? `${i}-grouped` : void 0,
            value: typeof a == "number" ? String(a) : typeof a == "string" ? a : "",
            min: se(s, "min"),
            max: se(s, "max"),
            step: se(s, "step") ?? "any",
            onChange: (o) => l(o.target.value === "" ? null : Number(o.target.value))
          }
        ),
        m && /* @__PURE__ */ e.jsx("span", { id: `${i}-grouped`, className: "cms:text-sm cms:tabular-nums cms:text-muted-foreground", children: m })
      ] });
    }
    case "date": {
      const m = s.config?.time === !0;
      return /* @__PURE__ */ e.jsx(
        n.DatePicker,
        {
          id: i,
          withTime: m,
          invalid: p,
          required: s.required === !0,
          value: ms(gn(a, m)),
          onChange: (o) => l(ms(o ?? ""))
        }
      );
    }
    case "select":
      return s.config?.multiple === !0 ? /* @__PURE__ */ e.jsx(
        Pn,
        {
          options: He(s),
          value: Array.isArray(a) ? a.map(String) : [],
          onChange: l,
          invalid: p,
          empty: typeof s.config?.empty == "string" ? s.config.empty : void 0,
          inTickOrder: s.config?.in_tick_order === !0
        }
      ) : /* @__PURE__ */ e.jsx(
        Hn,
        {
          options: He(s),
          value: typeof a == "string" ? a : null,
          onChange: l,
          id: i,
          fill: d,
          empty: jn(He(s), s.required === !0, typeof s.config?.default == "string" && s.config.default !== "", typeof a == "string" && a !== "")
        }
      );
    case "terms": {
      const m = s.config?.multiple === !0, o = Array.isArray(a) ? a.filter((x) => typeof x == "number") : typeof a == "number" ? a : null;
      return /* @__PURE__ */ e.jsx(
        Yt,
        {
          id: i,
          taxonomy: typeof s.taxonomy == "string" ? s.taxonomy : null,
          multiple: m,
          max: se(s, "max") ?? null,
          required: s.required === !0,
          invalid: p,
          value: m ? Array.isArray(o) ? o : [] : typeof o == "number" ? o : null,
          onChange: l
        }
      );
    }
    case "entries":
      return /* @__PURE__ */ e.jsx(
        we,
        {
          id: i,
          invalid: p,
          multiple: s.config?.multiple === !0,
          max: se(s, "max") ?? null,
          collections: s.collections ?? [],
          onChange: l,
          value: typeof a == "number" || Array.isArray(a) && a.every((m) => typeof m == "number") ? a : null
        }
      );
    case "link":
      return /* @__PURE__ */ e.jsx(On, { label: ze(s), value: ue(a), onChange: l, errors: c, id: i, collections: s.collections ?? [] });
    case "media":
      return /* @__PURE__ */ e.jsx(
        n.MediaPickerInput,
        {
          id: i,
          invalid: p,
          disabled: !1,
          multiple: s.config?.multiple === !0,
          max: se(s, "max") ?? null,
          types: Array.isArray(s.config?.types) ? s.config.types : [],
          value: typeof a == "number" || Array.isArray(a) && a.every((m) => typeof m == "number") ? a : null,
          onChange: l
        }
      );
    case "group":
      return /* @__PURE__ */ e.jsx(xe, { fields: s.fields ?? [], value: ue(a), onChange: l, errors: c, id: i, content: r });
    case "repeater":
      return /* @__PURE__ */ e.jsx(Vn, { field: s, value: Array.isArray(a) ? a : [], onChange: l, errors: c, id: i, content: r });
    case "flexible":
      return /* @__PURE__ */ e.jsx(Rn, { field: s, value: Array.isArray(a) ? a : [], onChange: l, errors: c, id: i });
    default:
      return /* @__PURE__ */ e.jsx(
        n.Input,
        {
          id: i,
          "aria-invalid": p,
          value: typeof a == "string" ? a : "",
          placeholder: js(s, "placeholder"),
          onChange: (m) => l(m.target.value)
        }
      );
  }
}
function se(s, a) {
  const l = s.config?.[a];
  return typeof l == "number" ? l : void 0;
}
function js(s, a) {
  const l = s.config?.[a];
  return typeof l == "string" ? l : void 0;
}
function xe({ fields: s, value: a, onChange: l, errors: c, id: i, content: r, bare: d = !1 }) {
  return /* @__PURE__ */ e.jsx("div", { className: d ? "cms:flex cms:flex-col cms:gap-6" : "cms:flex cms:flex-col cms:gap-4 cms:rounded-lg cms:border cms:p-4", children: s.filter((p) => as(p, a)).map((p) => p.shared ? (
    // Greyed out; the form says once, at the top, where to edit shared fields.
    /* @__PURE__ */ e.jsx("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1 cms:opacity-60", title: t("Shared by all languages: edit it in the main language."), children: /* @__PURE__ */ e.jsx(ae, { id: `${i}-${p.handle}`, field: p, value: a[p.handle], content: r, errors: {}, onChange: () => {
    } }) }, p.handle)
  ) : /* @__PURE__ */ e.jsx(
    ae,
    {
      id: `${i}-${p.handle}`,
      field: p,
      value: a[p.handle],
      content: r,
      errors: J(c, p.handle),
      onChange: (m) => l({ ...a, [p.handle]: m })
    },
    p.handle
  )) });
}
function Hn({ options: s, value: a, onChange: l, id: c, empty: i, fill: r = !1 }) {
  return /* @__PURE__ */ e.jsxs(n.Select, { value: a ?? Fe, onValueChange: (d) => l(d === Fe ? null : d), children: [
    /* @__PURE__ */ e.jsx(n.SelectTrigger, { id: c, className: r ? "cms:w-full" : "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
    /* @__PURE__ */ e.jsxs(n.SelectContent, { children: [
      i && /* @__PURE__ */ e.jsx(n.SelectItem, { value: Fe, children: t("None") }),
      s.map((d) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: d.value, children: d.label }, d.value))
    ] })
  ] });
}
function Pn({ options: s, value: a, onChange: l, empty: c, inTickOrder: i = !1, invalid: r = !1 }) {
  return s.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: c ?? t("Nothing to choose from yet.") }) : /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2", children: s.map((d) => /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
    /* @__PURE__ */ e.jsx(
      n.Checkbox,
      {
        checked: a.includes(d.value),
        "aria-invalid": r || void 0,
        onCheckedChange: (p) => l(p ? i ? [...a.filter((m) => m !== d.value), d.value] : s.map((m) => m.value).filter((m) => m === d.value || a.includes(m)) : a.filter((m) => m !== d.value))
      }
    ),
    d.label,
    i && a.includes(d.value) && /* @__PURE__ */ e.jsxs("span", { className: "cms:text-xs cms:text-muted-foreground", "aria-label": `number ${a.indexOf(d.value) + 1}`, children: [
      "#",
      a.indexOf(d.value) + 1
    ] })
  ] }, d.value)) });
}
function On({ label: s, value: a, onChange: l, errors: c, id: i, collections: r }) {
  const d = a.type === "entry" ? "entry" : "url", p = (m) => {
    const o = { ...a, type: d, ...m }, x = o.type === "entry" ? typeof o.entry_id != "number" : o.url === "" || o.url === void 0 || o.url === null;
    l(x ? o.label || o.new_tab ? o : null : o);
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("div", { role: "radiogroup", "aria-label": t(":field: link to", { field: s }), className: "cms:inline-flex cms:w-fit cms:rounded-md cms:border cms:p-0.5", children: ["url", "entry"].map((m) => /* @__PURE__ */ e.jsx(
      n.Button,
      {
        type: "button",
        size: "sm",
        role: "radio",
        "aria-checked": d === m,
        variant: d === m ? "secondary" : "ghost",
        onClick: () => p({ type: m, url: m === "url" ? a.url : void 0, entry_id: m === "entry" ? a.entry_id : void 0 }),
        children: t(m === "url" ? "Address" : "Entry")
      },
      m
    )) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-2 cms:md:grid-cols-[2fr_1fr_auto] cms:md:items-start", children: [
      d === "url" ? /* @__PURE__ */ e.jsx(
        n.Input,
        {
          id: i,
          "aria-label": t(":field: address", { field: s }),
          placeholder: t("https://… or /about"),
          value: typeof a.url == "string" ? a.url : "",
          onChange: (m) => p({ url: m.target.value }),
          "aria-invalid": c.url !== void 0
        }
      ) : /* @__PURE__ */ e.jsx(
        we,
        {
          id: i,
          invalid: c.entry_id !== void 0,
          multiple: !1,
          max: null,
          collections: r,
          value: typeof a.entry_id == "number" ? a.entry_id : null,
          onChange: (m) => p({ entry_id: typeof m == "number" ? m : void 0 })
        }
      ),
      /* @__PURE__ */ e.jsx(
        n.Input,
        {
          "aria-label": t(":field: link text", { field: s }),
          placeholder: t(d === "entry" ? "Link text (the entry's title)" : "Link text"),
          value: typeof a.label == "string" ? a.label : "",
          onChange: (m) => p({ label: m.target.value })
        }
      ),
      /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:h-9 cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx(n.Checkbox, { checked: a.new_tab === !0, onCheckedChange: (m) => p({ new_tab: m }) }),
        t("New tab")
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ e.jsx(F, { message: c.url ?? c.entry_id ?? c.label ?? c.type }) })
    ] })
  ] });
}
function bs(s, a) {
  return !a && (s.fields ?? []).every((l) => l.type === "text");
}
function ra(s) {
  const a = D.useRef([]);
  return a.current = kn(a.current, s), {
    keys: a.current,
    remove: (l) => {
      a.current = a.current.filter((c, i) => i !== l);
    },
    move: (l, c) => {
      a.current = n.moveItem(a.current, l, c);
    }
  };
}
function ia() {
  const [s, a] = D.useState(() => /* @__PURE__ */ new Set());
  return {
    isCollapsed: (l, c) => !c && s.has(l),
    toggle: (l) => a((c) => {
      const i = new Set(c);
      return i.delete(l) || i.add(l), i;
    }),
    setAll: (l, c) => a(c ? new Set(l) : /* @__PURE__ */ new Set()),
    anyOpen: (l) => l.some((c) => !s.has(c))
  };
}
function oa({ keys: s, folding: a }) {
  if (s.length < 2) return null;
  const l = a.anyOpen(s);
  return /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => a.setAll(s, l), children: [
    l ? /* @__PURE__ */ e.jsx(Va, {}) : /* @__PURE__ */ e.jsx(Ra, {}),
    " ",
    t(l ? "Collapse all" : "Expand all")
  ] });
}
function Vn({ field: s, value: a, onChange: l, errors: c, id: i, content: r = !1 }) {
  const d = s.fields ?? [], p = a.map(ue), m = ra(p.length), o = (N, j) => l(p.map((C, $) => $ === N ? j : C)), x = (N) => {
    m.remove(N), l(p.filter((j, C) => C !== N));
  }, h = s.label ? s.label.toLowerCase().replace(/s$/, "") : t("row"), u = h.charAt(0).toUpperCase() + h.slice(1), y = p.map((N, j) => ({ row: N, index: j, key: m.keys[j] ?? String(j) })), w = ia();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(
      n.SortableList,
      {
        items: y,
        getId: (N) => N.key,
        getLabel: (N) => `${h} ${N.index + 1}`,
        onReorder: (N, j, C) => {
          m.move(j, C), l(N.map(($) => $.row));
        },
        children: ({ row: N, index: j, key: C }, { handle: $ }) => bs(s, r) ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(n.SortableHandle, { ...$, label: t("Move :item :number", { item: h, number: j + 1 }), className: "cms:mt-1" }),
          d.map((f) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
            /* @__PURE__ */ e.jsx(
              n.Input,
              {
                "aria-label": f.label || f.handle,
                placeholder: f.label || f.handle,
                value: typeof N[f.handle] == "string" ? N[f.handle] : "",
                onChange: (g) => o(j, { ...N, [f.handle]: g.target.value })
              }
            ),
            /* @__PURE__ */ e.jsx(F, { message: c[`${j}.${f.handle}`] })
          ] }, f.handle)),
          /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": t("Remove :item :number", { item: h, number: j + 1 }), onClick: () => x(j), children: /* @__PURE__ */ e.jsx(W, {}) })
        ] }) : (() => {
          const f = J(c, String(j)), g = w.isCollapsed(C, Object.keys(f).length > 0);
          return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              da,
              {
                label: `${u} ${j + 1}`,
                summary: es(d, N),
                handle: $,
                onRemove: () => x(j),
                collapsed: g,
                onToggle: () => w.toggle(C),
                controls: `${i}-${j}-fields`,
                hidden: r ? N._hidden === !0 : void 0,
                onHidden: (b) => o(j, { ...N, _hidden: b })
              }
            ),
            /* @__PURE__ */ e.jsx("div", { id: `${i}-${j}-fields`, hidden: g, children: !g && /* @__PURE__ */ e.jsx(xe, { fields: d, value: N, onChange: (b) => o(j, b), errors: f, id: `${i}-${j}`, content: r }) })
          ] });
        })()
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", size: "sm", onClick: () => l([...p, r ? bn() : {}]), children: [
        /* @__PURE__ */ e.jsx(Y, {}),
        " ",
        t("Add :item", { item: h })
      ] }),
      !bs(s, r) && /* @__PURE__ */ e.jsx(oa, { keys: y.map((N) => N.key), folding: w })
    ] })
  ] });
}
function Rn({ field: s, value: a, onChange: l, errors: c, id: i }) {
  const r = s.blocks ?? [], d = a.map(ue), p = ra(d.length), m = (u, y) => l(d.map((w, N) => N === u ? y : w)), o = (u) => {
    p.remove(u), l(d.filter((y, w) => w !== u));
  }, x = d.map((u, y) => ({ block: u, index: y, key: p.keys[y] ?? String(y) })), h = ia();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    /* @__PURE__ */ e.jsx(
      n.SortableList,
      {
        items: x,
        getId: (u) => u.key,
        className: "cms:gap-3",
        getLabel: (u) => t(":type block", { type: r.find((y) => y.type === u.block.type)?.label ?? String(u.block.type) }),
        onReorder: (u, y, w) => {
          p.move(y, w), l(u.map((N) => N.block));
        },
        children: ({ block: u, index: y, key: w }, { handle: N }) => {
          const j = r.find((f) => f.type === u.type), C = J(c, `${y}.values`), $ = h.isCollapsed(w, Object.keys(C).length > 0 || c[`${y}.type`] !== void 0);
          return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              da,
              {
                label: j?.label ?? String(u.type),
                summary: j ? es(j.fields, ue(u.values)) : null,
                badge: !0,
                handle: N,
                onRemove: () => o(y),
                collapsed: $,
                onToggle: () => h.toggle(w),
                controls: `${i}-${y}-fields`,
                hidden: u.hidden === !0,
                onHidden: (f) => m(y, { ...u, hidden: f })
              }
            ),
            /* @__PURE__ */ e.jsx("div", { id: `${i}-${y}-fields`, hidden: $, children: $ ? null : j ? /* @__PURE__ */ e.jsx(
              xe,
              {
                fields: j.fields,
                value: ue(u.values),
                onChange: (f) => m(y, { ...u, values: f }),
                errors: C,
                id: `${i}-${y}`,
                content: !0
              }
            ) : /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: t("This kind of block no longer exists. Its values are kept.") }) }),
            /* @__PURE__ */ e.jsx(F, { message: c[`${y}.type`] })
          ] });
        }
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(n.DropdownMenu, { children: [
        /* @__PURE__ */ e.jsx(n.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", size: "sm", disabled: r.length === 0, children: [
          /* @__PURE__ */ e.jsx(Y, {}),
          " ",
          t("Add block")
        ] }) }),
        /* @__PURE__ */ e.jsx(n.DropdownMenuContent, { align: "start", children: r.map((u) => /* @__PURE__ */ e.jsx(n.DropdownMenuItem, { onSelect: () => l([...d, vn(u.type)]), children: u.label }, u.type)) })
      ] }),
      /* @__PURE__ */ e.jsx(oa, { keys: x.map((u) => u.key), folding: h })
    ] })
  ] });
}
function da({ label: s, summary: a, badge: l = !1, handle: c, onRemove: i, collapsed: r, onToggle: d, controls: p, hidden: m, onHidden: o }) {
  const x = r ? ye : Us, h = a ? `${s}: ${a}` : s;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(n.SortableHandle, { ...c, label: t("Move :title", { title: h }) }),
    /* @__PURE__ */ e.jsxs(
      "button",
      {
        type: "button",
        onClick: d,
        "aria-expanded": !r,
        "aria-controls": p,
        className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:rounded-md cms:text-left cms:outline-none cms:focus-visible:ring-2 cms:focus-visible:ring-ring",
        children: [
          /* @__PURE__ */ e.jsx(x, { className: "cms:size-4 cms:shrink-0 cms:text-muted-foreground", "aria-hidden": !0 }),
          l ? /* @__PURE__ */ e.jsx(n.Badge, { variant: "secondary", children: s }) : /* @__PURE__ */ e.jsx("span", { className: "cms:shrink-0 cms:text-sm cms:font-medium", children: s }),
          a && /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:text-sm cms:text-muted-foreground", children: a }),
          /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: r ? t("(collapsed)") : "" })
        ]
      }
    ),
    m !== void 0 && /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:shrink-0 cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", title: t("Off: kept here, but left out of the page"), children: [
      /* @__PURE__ */ e.jsx(n.Switch, { checked: !m, onCheckedChange: (u) => o(!u), "aria-label": t(":title: visible on site", { title: h }) }),
      t("Visible on site")
    ] }),
    /* @__PURE__ */ e.jsx(
      n.Button,
      {
        type: "button",
        variant: "ghost",
        size: "icon",
        className: "cms:size-8 cms:shrink-0 cms:text-destructive",
        "aria-label": t("Remove :title", { title: h }),
        onClick: i,
        children: /* @__PURE__ */ e.jsx(W, {})
      }
    )
  ] });
}
function ma({ fields: s, onChange: a, types: l, errors: c, depth: i = 1, idPrefix: r = "field", reserved: d, locales: p = [] }) {
  const [m, o] = D.useState(() => /* @__PURE__ */ new Set()), x = (j) => o((C) => {
    const $ = new Set(C);
    return $.has(j) ? $.delete(j) : $.add(j), $;
  }), h = (j, C) => a(s.map(($, f) => f === j ? C : $)), u = (j) => {
    const C = Dn(j.type, j.label, s);
    a([...s, C]), o(/* @__PURE__ */ new Set([C.key]));
  }, [y, w] = D.useState(""), N = (j) => {
    const C = Mn(s, j, d, t);
    C && (a(C.fields), o(/* @__PURE__ */ new Set([C.copy.key])), w(t(":title duplicated as :copy, below it.", { title: s[j]?.label || s[j]?.handle || "", copy: C.copy.label ?? C.copy.handle })));
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:border-dashed cms:p-4 cms:text-sm cms:text-muted-foreground", children: t("No fields yet.") }),
    s.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:justify-end", children: m.size > 0 ? /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => o(/* @__PURE__ */ new Set()), children: t("Close all") }) : /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => o(new Set(s.map((j) => j.key))), children: t("Open all") }) }),
    /* @__PURE__ */ e.jsx(n.SortableList, { items: s, getId: (j) => j.key, getLabel: (j) => j.label || j.handle, onReorder: (j) => a(j), children: (j, { index: C, handle: $, isOverlay: f }) => {
      const g = l.find((I) => I.type === j.type), b = Se(c, String(C)) || ta(j, s, d) !== null, B = !f && (m.has(j.key) || b), E = `${r}-${j.key}`;
      return /* @__PURE__ */ e.jsxs("div", { "data-invalid": b ? "true" : void 0, className: `cms:rounded-lg cms:border cms:bg-card ${b ? "cms:border-destructive" : ""}`, children: [
        /* @__PURE__ */ e.jsx(
          qn,
          {
            field: j,
            type: g,
            index: C,
            expanded: B,
            controls: E,
            handle: $,
            shared: p.length > 0,
            onToggle: () => x(j.key),
            onDuplicate: () => N(C),
            onRemove: () => a(s.filter((I, _) => _ !== C))
          }
        ),
        B && /* @__PURE__ */ e.jsx(
          Kn,
          {
            id: E,
            field: j,
            type: g,
            siblings: s,
            onChange: (I) => h(C, I),
            types: l,
            errors: he(c, String(C)),
            depth: i,
            reserved: d,
            locales: p
          }
        )
      ] });
    } }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:sr-only", "aria-live": "polite", children: y }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(n.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(n.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", size: "sm", children: [
        /* @__PURE__ */ e.jsx(Y, {}),
        " ",
        t("Add field")
      ] }) }),
      /* @__PURE__ */ e.jsx(n.DropdownMenuContent, { align: "start", children: l.filter((j) => !j.hasChildren || i < Cn).map((j) => /* @__PURE__ */ e.jsx(n.DropdownMenuItem, { onSelect: () => u(j), children: j.label }, j.type)) })
    ] }) })
  ] });
}
const Un = {
  text: pn,
  textarea: un,
  rich_text: Ga,
  number: Ja,
  toggle: hn,
  date: Oa,
  select: jt,
  media: Qa,
  entries: an,
  terms: mn,
  link: xt,
  group: Ya,
  repeater: cn,
  flexible: Pa,
  fieldset: ln,
  file: nn
};
function qn({ field: s, type: a, expanded: l, controls: c, handle: i, shared: r, onToggle: d, onDuplicate: p, onRemove: m }) {
  const o = s.label || s.handle, x = Un[s.type] ?? on, h = s.type === "fieldset", u = h ? typeof s.config?.fieldset == "string" ? s.config.fieldset : "" : s.handle, y = r && !h && !aa(s, a?.translatable ?? !1);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-1 cms:py-1.5 cms:pr-1.5 cms:pl-2", children: [
    /* @__PURE__ */ e.jsx(n.SortableHandle, { ...i, label: t("Move :title", { title: o }) }),
    /* @__PURE__ */ e.jsx(
      "button",
      {
        type: "button",
        "aria-expanded": l,
        "aria-controls": c,
        onClick: d,
        "aria-label": l ? t("Close :title", { title: o }) : t("Open :title", { title: o }),
        className: "cms:inline-flex cms:size-7 cms:shrink-0 cms:items-center cms:justify-center cms:rounded-md cms:text-muted-foreground cms:transition-colors hover:cms:bg-accent hover:cms:text-foreground focus-visible:cms:outline-none focus-visible:cms:ring-2 focus-visible:cms:ring-ring",
        children: /* @__PURE__ */ e.jsx(ye, { "aria-hidden": !0, className: `cms:size-4 cms:transition-transform cms:duration-200 ${l ? "cms:rotate-90" : ""}` })
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { role: "presentation", onClick: d, className: "cms:flex cms:min-w-0 cms:flex-1 cms:cursor-pointer cms:flex-wrap cms:items-center cms:gap-x-2.5 cms:gap-y-1 cms:py-0.5", children: [
      /* @__PURE__ */ e.jsxs("span", { className: "cms:inline-flex cms:shrink-0 cms:items-center cms:gap-1 cms:rounded-md cms:bg-muted cms:px-1.5 cms:py-0.5 cms:text-xs cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsx(x, { "aria-hidden": !0, className: "cms:size-3.5" }),
        a?.label ?? s.type
      ] }),
      /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:min-w-0 cms:max-w-full cms:flex-col cms:gap-x-2 cms:sm:flex-row cms:sm:items-baseline", children: [
        /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: o }),
        u !== "" && u !== o && /* @__PURE__ */ e.jsx("code", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", title: t(h ? "Fieldset" : "Handle"), children: u })
      ] }),
      (s.required || y || s.condition || a?.hasChildren && s.fields.length > 0 && !l) && /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-1", children: [
        s.required && /* @__PURE__ */ e.jsx(n.Badge, { variant: "outline", className: "cms:font-normal", children: t("Required") }),
        y && /* @__PURE__ */ e.jsx(n.Badge, { variant: "outline", className: "cms:font-normal", title: t("One value shared by every language."), children: t("Shared") }),
        s.condition && /* @__PURE__ */ e.jsx(n.Badge, { variant: "outline", className: "cms:font-normal", children: t("Conditional") }),
        a?.hasChildren && s.fields.length > 0 && !l && /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: t(":count inside", { count: s.fields.length }) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(
      n.Button,
      {
        type: "button",
        variant: "ghost",
        size: "icon",
        className: "cms:size-8 cms:text-muted-foreground hover:cms:text-foreground",
        "aria-label": t("Duplicate :title", { title: o }),
        title: t("Duplicate :title", { title: o }),
        onClick: p,
        children: /* @__PURE__ */ e.jsx(Zs, {})
      }
    ),
    /* @__PURE__ */ e.jsx(
      n.Button,
      {
        type: "button",
        variant: "ghost",
        size: "icon",
        className: "cms:size-8 cms:text-destructive",
        "aria-label": t("Remove :title", { title: o }),
        title: t("Remove :title", { title: o }),
        onClick: m,
        children: /* @__PURE__ */ e.jsx(W, {})
      }
    )
  ] });
}
function Kn({ id: s, field: a, type: l, siblings: c, onChange: i, types: r, errors: d, depth: p, reserved: m, locales: o }) {
  const x = a.config ?? {}, h = ta(a, c, m, t);
  if (a.type === "fieldset")
    return /* @__PURE__ */ e.jsxs("div", { id: s, className: "cms:flex cms:flex-col cms:gap-4 cms:border-t cms:p-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(n.Label, { htmlFor: `${s}-label`, children: t("Label") }),
          /* @__PURE__ */ e.jsx(n.Input, { id: `${s}-label`, value: a.label ?? "", onChange: (N) => i(xs(a, N.target.value, c)) }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("Only shown here, in the builder.") })
        ] }),
        l?.settings.map((N) => /* @__PURE__ */ e.jsx(
          ae,
          {
            id: `${s}-config-${N.handle}`,
            field: N,
            value: x[N.handle],
            errors: J(d, `config.${N.handle}`),
            onChange: (j) => i({ ...a, config: { ...x, [N.handle]: j } })
          },
          N.handle
        ))
      ] }),
      /* @__PURE__ */ e.jsx(F, { message: d.handle ?? d.type })
    ] });
  const u = Ln(l?.settings ?? []), y = (N, j = !1) => /* @__PURE__ */ e.jsx(
    ae,
    {
      id: `${s}-config-${N.handle}`,
      field: N,
      value: x[N.handle],
      fill: j,
      errors: J(d, `config.${N.handle}`),
      onChange: (C) => i({ ...a, config: { ...x, [N.handle]: C } })
    },
    N.handle
  ), w = d.validation ?? Object.entries(d).find(([N]) => N.startsWith("validation."))?.[1];
  return /* @__PURE__ */ e.jsxs("div", { id: s, className: "cms:flex cms:flex-col cms:gap-5 cms:border-t cms:p-4", children: [
    !l && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t(`The field type ":type" isn't registered. Its data is kept; register the type or remove the field.`, { type: a.type }) }),
    /* @__PURE__ */ e.jsxs(De, { title: t("Basics"), children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:items-start cms:gap-4 cms:md:grid-cols-2", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(n.Label, { htmlFor: `${s}-label`, children: t("Label") }),
          /* @__PURE__ */ e.jsx(n.Input, { id: `${s}-label`, value: a.label ?? "", onChange: (N) => i(xs(a, N.target.value, c)) }),
          /* @__PURE__ */ e.jsx(F, { message: d.label })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(n.Label, { htmlFor: `${s}-handle`, children: t("Handle") }),
          /* @__PURE__ */ e.jsx(
            n.Input,
            {
              id: `${s}-handle`,
              className: "cms:font-mono",
              value: a.handle,
              onChange: (N) => i({ ...a, handle: ts(N.target.value), handleTouched: !0 })
            }
          ),
          Ie(a) === null && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("How templates read it. Renaming it hides values saved under the old one.") }),
          /* @__PURE__ */ e.jsx("div", { "aria-live": "polite", children: Ie(a) !== null && /* @__PURE__ */ e.jsx(Kt, { children: vs(
            t("Content saved under :old won't show under :new, and templates reading :old get nothing. To rename it with its content: put back :old, save, then run :command."),
            { old: Ie(a) ?? "", new: a.handle || "…", command: "php artisan sunrice:rename-field" }
          ) }) }),
          /* @__PURE__ */ e.jsx(F, { message: d.handle ?? h ?? void 0 })
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: `${s}-instructions`, children: t("Instructions") }),
        /* @__PURE__ */ e.jsx(
          n.Input,
          {
            id: `${s}-instructions`,
            value: a.instructions ?? "",
            placeholder: t("Shown under the field to editors"),
            onChange: (N) => i({ ...a, instructions: N.target.value || null })
          }
        ),
        /* @__PURE__ */ e.jsx(F, { message: d.instructions })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:items-start cms:gap-4 cms:md:grid-cols-2", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:h-9 cms:items-center cms:gap-3 cms:md:h-auto", children: [
          /* @__PURE__ */ e.jsx(n.Switch, { id: `${s}-required`, checked: a.required === !0, onCheckedChange: (N) => i({ ...a, required: N }) }),
          /* @__PURE__ */ e.jsx(n.Label, { htmlFor: `${s}-required`, children: t("Required") })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-1", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
            /* @__PURE__ */ e.jsx(
              n.Switch,
              {
                id: `${s}-translatable`,
                checked: aa(a, l?.translatable ?? !1),
                "aria-describedby": `${s}-translatable-help`,
                onCheckedChange: (N) => i(Tn(a, N, l?.translatable ?? !1))
              }
            ),
            /* @__PURE__ */ e.jsx(n.Label, { htmlFor: `${s}-translatable`, children: t("Translatable") })
          ] }),
          /* @__PURE__ */ e.jsx("p", { id: `${s}-translatable-help`, className: "cms:text-sm cms:text-muted-foreground", children: t("Each language gets its own value. Off: one value shared by every language.") })
        ] })
      ] })
    ] }),
    u.options.length > 0 && /* @__PURE__ */ e.jsx(De, { title: t("Options"), children: u.options.map((N) => (u.dependents[N.handle]?.length ?? 0) > 0 ? /* @__PURE__ */ e.jsx(
      Wn,
      {
        id: s,
        toggle: N,
        dependents: u.dependents[N.handle] ?? [],
        config: x,
        errors: d,
        onChange: (j) => i({ ...a, config: { ...x, ...j } })
      },
      N.handle
    ) : y(N, !0)) }),
    u.limits.length > 0 && /* @__PURE__ */ e.jsx(De, { title: t("Limits and defaults"), children: /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:grid-cols-1 cms:items-start cms:gap-4 cms:min-[420px]:grid-cols-2 cms:lg:grid-cols-4", children: u.limits.map((N) => /* @__PURE__ */ e.jsx("div", { className: "cms:min-w-0", children: y(N, !0) }, N.handle)) }) }),
    /* @__PURE__ */ e.jsx(Jn, { id: s, field: a, siblings: c, onChange: i, errors: he(d, "condition") }),
    o.length > 0 && /* @__PURE__ */ e.jsx(Gn, { id: s, field: a, locales: o, onChange: i, errors: he(d, "translations") }),
    /* @__PURE__ */ e.jsxs("details", { className: "cms:group cms:rounded-lg cms:border cms:p-3", open: (a.validation ?? []).some((N) => N.trim() !== "") || w !== void 0, children: [
      /* @__PURE__ */ e.jsx("summary", { className: "cms:cursor-pointer cms:text-sm cms:font-medium", children: t("Advanced") }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:mt-3 cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: `${s}-validation`, children: t("Extra rules") }),
        /* @__PURE__ */ e.jsx(
          n.Textarea,
          {
            id: `${s}-validation`,
            rows: 2,
            className: "cms:min-h-0 cms:font-mono",
            value: (a.validation ?? []).join(`
`),
            onChange: (N) => i({ ...a, validation: N.target.value.split(`
`) })
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: vs(t("Optional checks, one per line, such as :email or :max (for developers: Laravel validation rules)."), { email: "email", max: "max:100" }) }),
        /* @__PURE__ */ e.jsx(F, { message: w })
      ] })
    ] }),
    l?.hasChildren && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(n.Label, { children: t("Fields inside") }),
      /* @__PURE__ */ e.jsx(
        ma,
        {
          fields: a.fields,
          onChange: (N) => i({ ...a, fields: N }),
          types: r,
          errors: he(d, "fields"),
          depth: p + 1,
          idPrefix: s,
          locales: o
        }
      ),
      /* @__PURE__ */ e.jsx(F, { message: d.fields })
    ] }),
    /* @__PURE__ */ e.jsx(F, { message: d.type })
  ] });
}
function Wn({ id: s, toggle: a, dependents: l, config: c, errors: i, onChange: r }) {
  const d = c[a.handle] === !0, p = `${s}-config-${a.handle}`, m = [a, ...l].map((o) => J(i, `config.${o.handle}`)[""]).filter((o) => o !== void 0);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-h-9 cms:flex-wrap cms:items-center cms:gap-x-6 cms:gap-y-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(n.Switch, { id: p, checked: d, onCheckedChange: (o) => r({ [a.handle]: o }) }),
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: p, children: a.label || a.handle })
      ] }),
      d && l.map((o) => {
        const x = `${s}-config-${o.handle}`, h = c[o.handle];
        return o.type === "number" ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(n.Label, { htmlFor: x, className: "cms:font-normal", children: o.label || o.handle }),
          /* @__PURE__ */ e.jsx(
            n.Input,
            {
              id: x,
              type: "number",
              className: "cms:w-28",
              "aria-describedby": o.instructions ? `${x}-help` : void 0,
              placeholder: typeof o.config?.placeholder == "string" ? o.config.placeholder : void 0,
              min: typeof o.config?.min == "number" ? o.config.min : void 0,
              max: typeof o.config?.max == "number" ? o.config.max : void 0,
              step: typeof o.config?.step == "number" ? o.config.step : "any",
              value: typeof h == "number" || typeof h == "string" ? String(h) : "",
              onChange: (u) => r({ [o.handle]: u.target.value === "" ? null : Number(u.target.value) })
            }
          ),
          o.instructions && /* @__PURE__ */ e.jsx("span", { id: `${x}-help`, className: "cms:text-sm cms:text-muted-foreground", children: o.instructions })
        ] }, o.handle) : /* @__PURE__ */ e.jsx("div", { className: "cms:basis-full", children: /* @__PURE__ */ e.jsx(ae, { id: x, field: o, value: h, fill: !0, errors: J(i, `config.${o.handle}`), onChange: (u) => r({ [o.handle]: u }) }) }, o.handle);
      })
    ] }),
    a.instructions && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: a.instructions }),
    m.map((o) => /* @__PURE__ */ e.jsx(F, { message: o }, o))
  ] });
}
function De({ title: s, children: a }) {
  const l = D.useId();
  return /* @__PURE__ */ e.jsxs("section", { "aria-labelledby": l, className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx("h4", { id: l, className: "cms:text-xs cms:font-semibold cms:uppercase cms:tracking-wide cms:text-muted-foreground", children: s }),
    a
  ] });
}
function Gn({ id: s, field: a, locales: l, onChange: c, errors: i }) {
  const r = a.translations ?? {}, d = a.type === "select" && Array.isArray(a.config?.options) ? a.config.options.filter((o) => typeof o?.value == "string" && o.value !== "") : [], p = (o, x) => {
    const h = { ...r, [o]: { ...r[o], ...x } };
    c({ ...a, translations: h });
  }, m = Object.entries(i).find(([, o]) => o)?.[1];
  return /* @__PURE__ */ e.jsxs("details", { className: "cms:rounded-lg cms:border cms:p-3", open: Object.keys(r).length > 0 || m !== void 0, children: [
    /* @__PURE__ */ e.jsx("summary", { className: "cms:cursor-pointer cms:text-sm cms:font-medium", children: t("In other languages") }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:mt-2 cms:text-sm cms:text-muted-foreground", children: t("What visitors read in each language, as forms show it. Empty: as above.") }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:mt-3 cms:flex cms:flex-col cms:gap-4", children: l.map(({ code: o, name: x }) => /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-3 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(n.Label, { htmlFor: `${s}-label-${o}`, children: [
          "Label (",
          x,
          ")"
        ] }),
        /* @__PURE__ */ e.jsx(
          n.Input,
          {
            id: `${s}-label-${o}`,
            value: r[o]?.label ?? "",
            placeholder: a.label ?? "",
            onChange: (h) => p(o, { label: h.target.value })
          }
        )
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(n.Label, { htmlFor: `${s}-instructions-${o}`, children: [
          "Instructions (",
          x,
          ")"
        ] }),
        /* @__PURE__ */ e.jsx(
          n.Input,
          {
            id: `${s}-instructions-${o}`,
            value: r[o]?.instructions ?? "",
            placeholder: a.instructions ?? "",
            onChange: (h) => p(o, { instructions: h.target.value })
          }
        )
      ] }),
      d.length > 0 && /* @__PURE__ */ e.jsxs("fieldset", { className: "cms:flex cms:flex-col cms:gap-2 cms:md:col-span-2", children: [
        /* @__PURE__ */ e.jsxs("legend", { className: "cms:text-sm cms:font-medium", children: [
          "Options (",
          x,
          ")"
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-2 cms:sm:grid-cols-2", children: d.map((h) => {
          const u = String(h.value);
          return /* @__PURE__ */ e.jsx(
            n.Input,
            {
              "aria-label": `${u} (${x})`,
              value: r[o]?.options?.[u] ?? "",
              placeholder: typeof h.label == "string" && h.label !== "" ? h.label : u,
              onChange: (y) => p(o, { options: { ...r[o]?.options, [u]: y.target.value } })
            },
            u
          );
        }) })
      ] })
    ] }, o)) }),
    /* @__PURE__ */ e.jsx(F, { message: m })
  ] });
}
function Yn(s) {
  switch (s) {
    case "equals":
      return t("is");
    case "not_equals":
      return t("is not");
    case "filled":
      return t("is filled in");
    default:
      return t("is empty");
  }
}
function Jn({ id: s, field: a, siblings: l, onChange: c, errors: i }) {
  const r = _n(a, l), d = la(a.condition), p = ca(a.condition), m = (u, y = p) => c({ ...a, condition: In(u, y) }), o = (u, y) => m(d.map((w, N) => N === u ? { ...w, ...y } : w)), x = () => {
    const u = r.find((y) => !d.some((w) => w.field === y.handle)) ?? r[0];
    u && m([...d, { field: u.handle, operator: "equals", value: fs(Ee(u)) }]);
  }, h = (u) => {
    const y = d.length > 1 || "rules" in (a.condition ?? {}) ? he(i, `rules.${u}`) : i;
    return y.field ?? y.operator ?? y.value;
  };
  return r.length === 0 && d.length === 0 ? null : /* @__PURE__ */ e.jsxs(De, { title: t("Visibility"), children: [
    d.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("Always shown.") }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      d.length > 1 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx("span", { id: `${s}-match-label`, children: t("Show when") }),
        /* @__PURE__ */ e.jsxs(n.Select, { value: p, onValueChange: (u) => m(d, u === "any" ? "any" : "all"), children: [
          /* @__PURE__ */ e.jsx(n.SelectTrigger, { "aria-labelledby": `${s}-match-label`, className: "cms:h-8 cms:w-auto", children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
          /* @__PURE__ */ e.jsxs(n.SelectContent, { children: [
            /* @__PURE__ */ e.jsx(n.SelectItem, { value: "all", children: t("All of these") }),
            /* @__PURE__ */ e.jsx(n.SelectItem, { value: "any", children: t("Any of these") })
          ] })
        ] }),
        /* @__PURE__ */ e.jsx("span", { children: t("are true:") })
      ] }),
      /* @__PURE__ */ e.jsx("ul", { className: "cms:flex cms:flex-col cms:gap-2", children: d.map((u, y) => {
        const w = l.find(($) => $.handle === u.field && $.key !== a.key), N = Ae.find(($) => $.value === u.operator) ?? Ae[0], j = Ee(w), C = h(y);
        return /* @__PURE__ */ e.jsxs("li", { className: "cms:flex cms:flex-col cms:gap-1", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-start cms:gap-2", children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:flex cms:h-9 cms:w-20 cms:shrink-0 cms:items-center cms:text-sm cms:text-muted-foreground", children: t(y === 0 ? "Only when" : p === "any" ? "or" : "and") }),
            /* @__PURE__ */ e.jsxs(n.Select, { value: u.field, onValueChange: ($) => {
              const f = l.find((g) => g.handle === $);
              o(y, { field: $, value: fs(Ee(f)) });
            }, children: [
              /* @__PURE__ */ e.jsx(n.SelectTrigger, { id: y === 0 ? `${s}-condition` : void 0, "aria-label": t("Field"), className: "cms:w-48", children: /* @__PURE__ */ e.jsx(n.SelectValue, { placeholder: u.field }) }),
              /* @__PURE__ */ e.jsx(n.SelectContent, { children: r.map(($) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: $.handle, children: $.label || $.handle }, $.key)) })
            ] }),
            /* @__PURE__ */ e.jsxs(n.Select, { value: N.value, onValueChange: ($) => o(y, { operator: $ }), children: [
              /* @__PURE__ */ e.jsx(n.SelectTrigger, { "aria-label": t("How to compare"), className: "cms:w-36", children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
              /* @__PURE__ */ e.jsx(n.SelectContent, { children: Ae.map(($) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: $.value, children: Yn($.value) }, $.value)) })
            ] }),
            N.needsValue && /* @__PURE__ */ e.jsx("div", { className: "cms:min-w-48 cms:flex-1 cms:sm:max-w-72", children: /* @__PURE__ */ e.jsx(
              Qn,
              {
                id: `${s}-rule-${y}-value`,
                input: j,
                value: u.value ?? null,
                invalid: C !== void 0,
                onChange: ($) => o(y, { value: $ })
              }
            ) }),
            /* @__PURE__ */ e.jsx(
              n.Button,
              {
                type: "button",
                variant: "ghost",
                size: "icon",
                className: "cms:ml-auto cms:size-9 cms:text-muted-foreground hover:cms:text-destructive",
                "aria-label": t("Remove condition :number", { number: String(y + 1) }),
                title: t("Remove condition"),
                onClick: () => m(d.filter(($, f) => f !== y)),
                children: /* @__PURE__ */ e.jsx(ke, {})
              }
            )
          ] }),
          /* @__PURE__ */ e.jsx(F, { message: C })
        ] }, y);
      }) })
    ] }),
    r.length > 0 && /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", size: "sm", onClick: x, children: [
      /* @__PURE__ */ e.jsx(Y, {}),
      " ",
      t("Add condition")
    ] }) }),
    d.length > 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("A hidden field isn't required, and keeps what it had.") }),
    /* @__PURE__ */ e.jsx(F, { message: i[""] ?? i.rules ?? i.match })
  ] });
}
function Qn({ id: s, input: a, value: l, invalid: c, onChange: i }) {
  switch (a.kind) {
    case "options":
      return /* @__PURE__ */ e.jsxs(n.Select, { value: typeof l == "string" && l !== "" ? l : void 0, onValueChange: (r) => i(r), children: [
        /* @__PURE__ */ e.jsx(n.SelectTrigger, { id: s, "aria-label": t("Value"), "aria-invalid": c, className: "cms:w-full", children: /* @__PURE__ */ e.jsx(n.SelectValue, { placeholder: t("Choose…") }) }),
        /* @__PURE__ */ e.jsx(n.SelectContent, { children: a.options.map((r) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: r.value, children: r.label }, r.value)) })
      ] });
    case "toggle":
      return /* @__PURE__ */ e.jsxs(n.Select, { value: l === !1 || l === "false" ? "false" : "true", onValueChange: (r) => i(r === "true"), children: [
        /* @__PURE__ */ e.jsx(n.SelectTrigger, { id: s, "aria-label": t("Value"), "aria-invalid": c, className: "cms:w-full", children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
        /* @__PURE__ */ e.jsxs(n.SelectContent, { children: [
          /* @__PURE__ */ e.jsx(n.SelectItem, { value: "true", children: t("switched on") }),
          /* @__PURE__ */ e.jsx(n.SelectItem, { value: "false", children: t("switched off") })
        ] })
      ] });
    case "terms":
      return a.taxonomy === null ? /* @__PURE__ */ e.jsx(n.Input, { id: s, "aria-label": t("Value"), "aria-invalid": c, disabled: !0, placeholder: t("Choose the field's taxonomy first") }) : /* @__PURE__ */ e.jsx(
        Yt,
        {
          id: s,
          taxonomy: a.taxonomy,
          multiple: !1,
          max: null,
          required: !1,
          invalid: c,
          value: typeof l == "number" ? l : typeof l == "string" && /^\d+$/.test(l) ? Number(l) : null,
          onChange: (r) => i(typeof r == "number" ? r : null)
        }
      );
    case "entries":
      return /* @__PURE__ */ e.jsx(
        we,
        {
          id: s,
          multiple: !1,
          max: null,
          collections: a.collections,
          invalid: c,
          value: typeof l == "number" ? l : typeof l == "string" && /^\d+$/.test(l) ? Number(l) : null,
          onChange: (r) => i(typeof r == "number" ? r : null)
        }
      );
    case "number":
      return /* @__PURE__ */ e.jsx(
        n.Input,
        {
          id: s,
          type: "number",
          "aria-label": t("Value"),
          "aria-invalid": c,
          placeholder: t("A number"),
          value: l == null ? "" : String(l),
          onChange: (r) => i(r.target.value === "" ? null : Number(r.target.value))
        }
      );
    default:
      return /* @__PURE__ */ e.jsx(
        n.Input,
        {
          id: s,
          "aria-label": t("Value"),
          "aria-invalid": c,
          placeholder: t("The text to compare with"),
          value: l == null ? "" : String(l),
          onChange: (r) => i(r.target.value)
        }
      );
  }
}
function vs(s, a) {
  return s.split(/(:[a-z_]+)/).map((l, c) => {
    const i = a[l.slice(1)];
    return l.startsWith(":") && i !== void 0 ? /* @__PURE__ */ e.jsx("code", { children: i }, c) : l;
  });
}
function Zn(s, a) {
  return t(s === "fieldset" ? a ? "A short name for this fieldset, set when it was created: flexible blocks keep it with what they hold." : "A short name for this fieldset. It can't change later: flexible blocks keep it with what they hold." : a ? "A short name for this blueprint. Changing it updates the collections, taxonomies, global sets, forms and entries that use it." : "A short name for this blueprint, used by the collections, taxonomies, global sets and forms that pick it.");
}
function Xn({ kind: s, handle: a }) {
  const l = a !== "" ? a : s === "fieldset" ? "address" : "article", c = s === "fieldset" ? `['type' => 'fieldset', 'config' => ['fieldset' => '${l}']]` : `Blueprint::where('handle', '${l}')`;
  return /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
    /* @__PURE__ */ e.jsx("span", { className: "cms:font-medium", children: t("For developers:") }),
    " ",
    t(s === "fieldset" ? "In a blueprint definition:" : "In code:"),
    " ",
    /* @__PURE__ */ e.jsx("code", { className: "cms:rounded cms:bg-muted cms:px-1 cms:py-0.5 cms:font-mono cms:text-[0.8125rem] cms:break-words cms:text-foreground", children: c })
  ] });
}
function ys({ kind: s = "blueprint", blueprint: a, fieldTypes: l, locales: c = [], usedBy: i = [], reserved: r = [] }) {
  const d = s === "fieldset", p = z(d ? "cms/fieldsets" : "cms/blueprints"), m = a ? a.title : t(d ? "New fieldset" : "New blueprint");
  n.useBreadcrumbs([{ label: t(d ? "Fieldsets" : "Blueprints"), href: p }, { label: m }]);
  const [o, x] = re(), h = S.useForm({ title: a?.title ?? "", handle: a?.handle ?? "" }), [u, y] = D.useState(a !== null), [w, N] = D.useState(() => Xt(a?.fields)), j = (_) => l.find((H) => H.type === _)?.hasChildren === !0, C = h.errors, [$, f] = D.useState(() => JSON.stringify(w)), g = h.isDirty || JSON.stringify(w) !== $, b = () => {
    h.setDefaults();
    const _ = sa(w);
    N(_), f(JSON.stringify(_));
  }, B = () => {
    if (h.processing) return;
    h.transform((H) => ({
      // A blueprint's handle can change (RenameBlueprint); a fieldset's can't: flexible blocks store it.
      ...a ? s === "blueprint" ? { title: H.title, handle: H.handle } : { title: H.title } : H,
      fields: ea(w, j)
    }));
    const _ = () => window.requestAnimationFrame(() => document.querySelector('[data-invalid="true"]')?.scrollIntoView({ block: "center", behavior: "smooth" }));
    a ? h.put(`${p}/${a.handle}`, { preserveScroll: !0, onSuccess: b, onError: _ }) : h.post(p, { onSuccess: b, onError: _ });
  }, E = (_) => {
    _.preventDefault(), B();
  };
  n.useUnsavedChanges(g, B);
  const I = () => a && o(
    d ? t('Delete the fieldset ":title"? Content keeps its values.', { title: a.title }) : t('Delete the blueprint ":title"? Content keeps its values.', { title: a.title }),
    () => S.router.delete(`${p}/${a.handle}`, { preserveScroll: !0 })
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: E, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: m }),
    x,
    /* @__PURE__ */ e.jsx(
      n.PageHeader,
      {
        title: m,
        back: { href: p, label: t(d ? "Back to fieldsets" : "Back to blueprints") },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          a && /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "outline", size: "icon", className: "cms:text-destructive", "aria-label": t("Delete :title", { title: m }), onClick: I, children: /* @__PURE__ */ e.jsx(W, {}) }),
          /* @__PURE__ */ e.jsxs(n.Button, { type: "submit", disabled: h.processing, children: [
            h.processing && /* @__PURE__ */ e.jsx(ce, { className: "cms:animate-spin" }),
            t(a ? "Save" : d ? "Create fieldset" : "Create blueprint")
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(F, { message: C.blueprint ?? C.fieldset }),
    /* @__PURE__ */ e.jsx(n.Card, { children: /* @__PURE__ */ e.jsxs(n.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "title", children: t("Title") }),
        /* @__PURE__ */ e.jsx(n.Input, { id: "title", value: h.data.title, required: !0, onChange: (_) => {
          h.setData((H) => ({ ...H, title: _.target.value, handle: u ? H.handle : Qt(_.target.value) }));
        } }),
        /* @__PURE__ */ e.jsx(F, { message: C.title })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "handle", children: t("Handle") }),
        /* @__PURE__ */ e.jsx(
          n.Input,
          {
            id: "handle",
            className: "cms:font-mono",
            value: h.data.handle,
            disabled: a !== null && s === "fieldset",
            required: !0,
            spellCheck: !1,
            onChange: (_) => {
              y(!0), h.setData("handle", ts(_.target.value));
            }
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: Zn(s, a !== null) }),
        /* @__PURE__ */ e.jsx(Xn, { kind: s, handle: h.data.handle }),
        /* @__PURE__ */ e.jsx("div", { "aria-live": "polite", children: a !== null && s === "blueprint" && h.data.handle !== "" && h.data.handle !== a.handle && /* @__PURE__ */ e.jsx(Kt, { id: "handle-warning", children: t(`Changing the handle can break code. Sunrice updates the collections, taxonomies, global sets, forms and entries that use ":old". You update code that names it (Blueprint::where('handle', ':old')) and structure exports made before.`, { old: a.handle }) }) }),
        /* @__PURE__ */ e.jsx(F, { message: C.handle })
      ] })
    ] }) }),
    i.length > 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("Used by :list. Changes show there at once.", { list: i.join(", ") }) }),
    /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-3", "aria-labelledby": "fields-heading", children: [
      /* @__PURE__ */ e.jsx("h2", { id: "fields-heading", className: "cms:text-lg cms:font-medium", children: t("Fields") }),
      /* @__PURE__ */ e.jsx(ma, { fields: w, onChange: N, types: l, errors: he(C, "fields"), reserved: s === "blueprint" ? r : void 0, locales: c.slice(1) }),
      /* @__PURE__ */ e.jsx(F, { message: C.fields })
    ] })
  ] });
}
function ua({ kind: s, base: a, rows: l, intro: c }) {
  const i = s === "blueprint", r = t(i ? "Blueprints" : "Fieldsets");
  n.useBreadcrumbs([{ label: r }]);
  const [d, p] = re();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: r }),
    p,
    /* @__PURE__ */ e.jsx(n.PageHeader, { title: r, description: c, actions: /* @__PURE__ */ e.jsx(n.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(S.Link, { href: `${a}/create`, children: [
      /* @__PURE__ */ e.jsx(Y, {}),
      " ",
      t(i ? "New blueprint" : "New fieldset")
    ] }) }) }),
    /* @__PURE__ */ e.jsx(n.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(n.Table, { children: [
      /* @__PURE__ */ e.jsx(n.TableHeader, { children: /* @__PURE__ */ e.jsxs(n.TableRow, { children: [
        /* @__PURE__ */ e.jsx(n.TableHead, { children: t("Title") }),
        /* @__PURE__ */ e.jsx(n.TableHead, { children: t("Handle") }),
        /* @__PURE__ */ e.jsx(n.TableHead, { children: t("Fields") }),
        l.some((m) => m.usedBy) && /* @__PURE__ */ e.jsx(n.TableHead, { children: t("Used by") }),
        /* @__PURE__ */ e.jsx(n.TableHead, { className: "cms:w-12", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: t("Actions") }) })
      ] }) }),
      /* @__PURE__ */ e.jsxs(n.TableBody, { children: [
        l.length === 0 && /* @__PURE__ */ e.jsx(n.TableRow, { children: /* @__PURE__ */ e.jsx(n.TableCell, { colSpan: 5, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: t(i ? "No blueprints yet." : "No fieldsets yet.") }) }),
        l.map((m) => /* @__PURE__ */ e.jsxs(n.TableRow, { children: [
          /* @__PURE__ */ e.jsx(n.TableCell, { children: /* @__PURE__ */ e.jsx(S.Link, { href: `${a}/${m.handle}/edit`, className: "cms:font-medium cms:hover:underline", children: m.title }) }),
          /* @__PURE__ */ e.jsx(n.TableCell, { children: /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: m.handle }) }),
          /* @__PURE__ */ e.jsx(n.TableCell, { children: m.fields }),
          m.usedBy && /* @__PURE__ */ e.jsx(n.TableCell, { className: "cms:text-muted-foreground", children: m.usedBy.join(", ") || "—" }),
          /* @__PURE__ */ e.jsx(n.TableCell, { children: /* @__PURE__ */ e.jsx(
            n.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": t("Delete :title", { title: m.title }),
              onClick: () => d(
                i ? t('Delete the blueprint ":title"? Content keeps its values.', { title: m.title }) : t('Delete the fieldset ":title"? Content keeps its values.', { title: m.title }),
                () => S.router.delete(`${a}/${m.handle}`, { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(W, {})
            }
          ) })
        ] }, m.id))
      ] })
    ] }) })
  ] });
}
function el({ blueprints: s }) {
  const a = S.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(F, { message: a.blueprint }),
    /* @__PURE__ */ e.jsx(
      ua,
      {
        kind: "blueprint",
        base: z("cms/blueprints"),
        rows: s,
        intro: t("The fields editors fill in, for each kind of content.")
      }
    )
  ] });
}
const Pe = (s) => s.includes("::") ? s : `${s.replace(/\./g, "/")}.blade.php`;
function sl(s, a) {
  const l = s.trim();
  return l !== "" ? a?.own?.view === l && !a.own.exists ? null : l : a?.fallbacks.find((c) => c.exists)?.view ?? null;
}
function Oe({ file: s }) {
  const a = s.split("/");
  return /* @__PURE__ */ e.jsx("code", { className: "cms:whitespace-normal cms:break-normal", children: a.map((l, c) => /* @__PURE__ */ e.jsxs(D.Fragment, { children: [
    l,
    c < a.length - 1 && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      "/",
      /* @__PURE__ */ e.jsx("wbr", {})
    ] })
  ] }, c)) });
}
function ha({ example: s, empty: a, value: l = "", lookup: c = null }) {
  const i = l.trim(), r = sl(l, c), d = c?.fallbacks ?? [], p = /* @__PURE__ */ e.jsx("span", { className: "cms:ml-1 cms:rounded cms:bg-muted cms:px-1 cms:text-[0.65rem] cms:font-medium cms:text-foreground", children: t("in use") });
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1 cms:text-xs cms:leading-relaxed cms:text-muted-foreground", children: [
    /* @__PURE__ */ e.jsx("p", { children: a }),
    /* @__PURE__ */ e.jsxs("details", { className: "cms:group", children: [
      /* @__PURE__ */ e.jsx("summary", { className: "cms:w-fit cms:cursor-pointer cms:select-none cms:rounded-sm cms:underline-offset-4 hover:cms:underline focus-visible:cms:outline-2 focus-visible:cms:outline-ring", children: t("Which file?") }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:mt-1.5 cms:flex cms:flex-col cms:gap-1.5", children: [
        i !== "" && /* @__PURE__ */ e.jsxs("p", { children: [
          /* @__PURE__ */ e.jsx(Oe, { file: Pe(i) }),
          c?.own?.view === i ? c.own.exists ? p : /* @__PURE__ */ e.jsx("span", { className: "cms:ml-1 cms:text-destructive", children: t("not found") }) : null
        ] }),
        /* @__PURE__ */ e.jsx("p", { children: t(i !== "" ? "Without it, the first that exists:" : "The first that exists:") }),
        /* @__PURE__ */ e.jsxs("ol", { className: "cms:ml-4 cms:list-decimal cms:space-y-0.5", children: [
          d.map((m) => /* @__PURE__ */ e.jsxs("li", { children: [
            /* @__PURE__ */ e.jsx(Oe, { file: Pe(m.view) }),
            r === m.view && i === "" && p
          ] }, m.view)),
          /* @__PURE__ */ e.jsxs("li", { children: [
            t("the built-in template"),
            r === null && p
          ] })
        ] }),
        /* @__PURE__ */ e.jsx("p", { children: t("Files are under resources/views; a name like :example is :file.", { example: "\0", file: "" }).split(/(\u0000|\u0001)/).map((m, o) => m === "\0" ? /* @__PURE__ */ e.jsx("code", { children: s }, o) : m === "" ? /* @__PURE__ */ e.jsx(Oe, { file: Pe(s) }, o) : m) })
      ] })
    ] })
  ] });
}
const Ns = { preserveScroll: !0, preserveState: !0 };
function tl({ entryId: s, comments: a }) {
  const [l, c] = D.useState(null), [i, r] = D.useState(""), [d, p] = D.useState(!1), m = (x, h) => S.router.post(z(`cms/comments/${x}/status`), { status: h }, Ns), o = (x) => S.router.post(z(`cms/comments/${x}/reply`), { body: i }, {
    ...Ns,
    onStart: () => p(!0),
    onFinish: () => p(!1),
    onSuccess: () => {
      c(null), r("");
    }
  });
  return /* @__PURE__ */ e.jsx(
    n.CollapsibleCard,
    {
      title: t("Comments"),
      titleClassName: "cms:text-base",
      storageKey: "cms:entry:comments",
      contentClassName: "cms:flex cms:flex-col cms:gap-3 cms:text-sm",
      headerAction: a && a.counts.pending > 0 ? /* @__PURE__ */ e.jsx(n.Badge, { children: t(":count pending", { count: a.counts.pending }) }) : void 0,
      children: a ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t(":approved approved · :pending pending · :spam spam", { approved: a.counts.approved, pending: a.counts.pending, spam: a.counts.spam }) }),
        a.latest.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("No comments yet.") }),
        a.latest.map((x) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5 cms:border-t cms:border-border/70 cms:pt-3 cms:first-of-type:border-t-0 cms:first-of-type:pt-0", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium", children: x.author }),
            x.status === "pending" && /* @__PURE__ */ e.jsx(n.Badge, { variant: "outline", children: t("Pending") })
          ] }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:line-clamp-3 cms:break-words cms:whitespace-pre-line", children: x.excerpt }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
            K(x.createdAt),
            x.reply ? ` · ${t("a reply")}` : ""
          ] }),
          a.canModerate && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-1", children: [
            x.status === "pending" && /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", size: "sm", onClick: () => m(x.id, "approved"), children: [
              /* @__PURE__ */ e.jsx(je, {}),
              " ",
              t("Approve")
            ] }),
            /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => m(x.id, "spam"), children: [
              /* @__PURE__ */ e.jsx(Ye, {}),
              " ",
              t("Spam")
            ] }),
            /* @__PURE__ */ e.jsxs(
              n.Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                "aria-expanded": l === x.id,
                onClick: () => {
                  c(l === x.id ? null : x.id), r("");
                },
                children: [
                  /* @__PURE__ */ e.jsx(yt, {}),
                  " ",
                  t("Reply")
                ]
              }
            )
          ] }),
          l === x.id && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              n.Textarea,
              {
                "aria-label": t("Reply to :author", { author: x.author }),
                rows: 3,
                value: i,
                onChange: (h) => r(h.target.value)
              }
            ),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
              /* @__PURE__ */ e.jsx(n.Button, { type: "button", size: "sm", disabled: i.trim() === "" || d, onClick: () => o(x.id), children: t("Post reply") }),
              /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => c(null), children: t("Cancel") })
            ] })
          ] })
        ] }, x.id)),
        /* @__PURE__ */ e.jsx("a", { href: z(`cms/comments?entry=${s}`), className: "cms:text-sm cms:font-medium cms:underline-offset-4 cms:hover:underline", children: t("All comments on this entry") })
      ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Skeleton, { className: "cms:h-10" }),
        /* @__PURE__ */ e.jsx(n.Skeleton, { className: "cms:h-10" })
      ] })
    }
  );
}
const xa = "cms:flex cms:flex-col cms:gap-1 cms:opacity-60";
function ns({ fields: s, values: a, onChange: l, errors: c, storageKey: i, shared: r = [], sharedValues: d = {}, sharedNote: p, disabled: m = !1 }) {
  const o = [], x = { ...d, ...a };
  for (const u of s.filter((y) => as(y, x))) {
    const y = o[o.length - 1];
    u.type === "group" ? o.push(u) : Array.isArray(y) ? y.push(u) : o.push([u]);
  }
  const h = p && (r.length > 0 || Te(s)) ? /* @__PURE__ */ e.jsx("p", { role: "note", className: "cms:rounded-lg cms:border cms:border-dashed cms:px-3 cms:py-2 cms:text-sm cms:text-muted-foreground", children: p }) : null;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    h,
    o.map((u) => {
      if (Array.isArray(u))
        return /* @__PURE__ */ e.jsx(n.Card, { children: /* @__PURE__ */ e.jsx(n.CardContent, { children: /* @__PURE__ */ e.jsx("fieldset", { disabled: m, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: u.map((j) => r.includes(j.handle) ? /* @__PURE__ */ e.jsx("fieldset", { disabled: !0, className: xa, title: t("Shared by all languages"), children: /* @__PURE__ */ e.jsx(ae, { id: `data-${j.handle}`, field: j, content: !0, value: d[j.handle], errors: {}, onChange: () => {
        } }) }, j.handle) : /* @__PURE__ */ e.jsx(
          ae,
          {
            id: `data-${j.handle}`,
            field: j,
            content: !0,
            value: a[j.handle],
            errors: J(c, `data.${j.handle}`),
            onChange: (C) => l(j.handle, C)
          },
          j.handle
        )) }) }) }, `fields-${u[0]?.handle ?? ""}`);
      const y = r.includes(u.handle), w = (y ? d : a)[u.handle], N = J(c, `data.${u.handle}`);
      return /* @__PURE__ */ e.jsx(
        n.CollapsibleCard,
        {
          title: ze(u),
          titleClassName: "cms:text-base",
          description: u.instructions ?? void 0,
          storageKey: `${i}:${u.handle}`,
          hasErrors: !y && Se(c, `data.${u.handle}`),
          children: /* @__PURE__ */ e.jsxs(
            "fieldset",
            {
              disabled: y || m,
              role: "group",
              "aria-label": ze(u),
              className: `cms:flex cms:flex-col cms:gap-2 ${y ? "cms:opacity-60" : ""}`,
              title: y ? t("Shared by all languages") : void 0,
              children: [
                /* @__PURE__ */ e.jsx(
                  xe,
                  {
                    bare: !0,
                    fields: u.fields ?? [],
                    id: `data-${u.handle}`,
                    content: !0,
                    errors: y ? {} : N,
                    value: w && typeof w == "object" && !Array.isArray(w) ? w : {},
                    onChange: (j) => l(u.handle, j)
                  }
                ),
                /* @__PURE__ */ e.jsx(F, { message: y ? void 0 : N[""] })
              ]
            }
          )
        },
        u.handle
      );
    })
  ] });
}
function pa({ note: s, redirectsUrl: a }) {
  return /* @__PURE__ */ e.jsx("div", { "aria-live": "polite", children: s !== null && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-xs cms:text-muted-foreground", children: [
    t(s === "redirects" ? "Once published, the old address redirects to the new one." : "The old address will stop working (404) unless a redirect is added."),
    s === "breaks" && a && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      " ",
      /* @__PURE__ */ e.jsx("a", { href: a, target: "_blank", rel: "noopener", className: "cms:underline cms:underline-offset-2 cms:hover:text-foreground", children: t("Add a redirect") })
    ] })
  ] }) });
}
function ls() {
  return [
    { handle: "title", type: "text", label: t("Meta title"), instructions: t("Empty: the title."), config: { max: 255 } },
    { handle: "description", type: "textarea", label: t("Meta description"), instructions: t("A sentence or two for search results."), config: { max: 500 } },
    { handle: "canonical", type: "text", label: t("Canonical URL"), instructions: t("Only if this page copies another: that page's address. Empty: this page."), config: { max: 2e3 } },
    { handle: "image", type: "media", label: t("Open Graph image"), instructions: t("Shown when the page is shared."), config: { types: ["image"] } },
    { handle: "noindex", type: "toggle", label: t("Hide from search engines (noindex)") }
  ];
}
function ks(s) {
  if (s.length === 0) return "";
  const a = s.slice(0, 5).map((l) => l.label).join("; ");
  return ` ${s.length > 5 ? t("It's used by :list and :count more: those links will show nothing.", { list: a, count: s.length - 5 }) : t("It's used by :list: those links will show nothing.", { list: a })}`;
}
function al(s) {
  const { entry: a } = s;
  return /* @__PURE__ */ e.jsx(nl, { ...s }, a ? `${a.id}:${a.locale}:${a.version}:${a.status}:${a.trashed}:${a.publishedAt}` : "new");
}
function nl({ collection: s, fields: a, locales: l = [], shared: c = [], sharedValues: i = {}, entry: r, values: d, revisions: p, comments: m, termLabels: o, usedBy: x = [], undoRestore: h = null, machineTranslate: u = null, machineTranslateMissing: y = !1, settings: w, blueprints: N = [], homepage: j, redirectsUrl: C = null, templates: $ = null, can: f }) {
  const g = z(`cms/collections/${s.handle}/entries`), b = r ? z(`cms/entries/${r.id}`) : g, B = r ? d.title : t("New entry");
  n.useBreadcrumbs([{ label: s.title, href: g }, { label: B }]);
  const [E, I] = re(), [_, H] = D.useState(!1), [v, A] = D.useState(null), [V, ne] = D.useState(!1), L = S.useForm({
    ...d,
    seo: d.seo ?? {},
    locale: r?.locale ?? null,
    version: r?.version ?? null,
    publish: !1,
    published_at: null,
    parent_id: w?.parentId ?? null,
    template: w?.template ?? "",
    comments_closed: w?.commentsClosed === !0
  }), ie = (T) => L.setData((U) => ({ ...U, ...T })), ee = r ? { locale: r.locale } : {}, Q = l.find((T) => T.main)?.code, q = L.errors, oe = S.usePage().props.errors ?? {}, pe = (T) => {
    const U = Me(q, T);
    U.length > 0 && L.clearErrors(...U);
  }, k = r !== null && r.status !== "draft" && !r.hasUnpublishedChanges && !L.isDirty, O = r === null ? f.create : f.update && !r.trashed, R = r?.status === "scheduled", de = (T) => {
    if (w || r === null) return T;
    const { parent_id: U, template: X, comments_closed: ec, ...Sa } = T;
    return Sa;
  }, fe = (T = !1, U = null) => {
    L.transform((X) => ({ ...de(X), publish: T, published_at: U })), r ? L.put(b, { preserveScroll: !0, onSuccess: () => H(!1) }) : L.post(b);
  }, Na = () => {
    L.transform((T) => ({ ...de(T), version: null, publish: !1, published_at: null })), L.put(b, { preserveScroll: !0 });
  }, G = n.useEditLock({
    type: "cms.entry",
    id: r?.id,
    locale: r?.locale,
    enabled: r !== null && O,
    noun: t("entry"),
    leaveTo: g,
    getUnsaved: () => L.isDirty ? { title: L.data.title, slug: L.data.slug, data: L.data.data, seo: L.data.seo } : null
  }), Z = O && !G.readOnly, ka = async (T) => {
    const U = await G.loadKept(T);
    L.setData((X) => ({ ...X, title: U.title ?? X.title, slug: U.slug ?? X.slug, data: U.data ?? X.data, seo: U.seo ?? X.seo }));
  };
  n.useUnsavedChanges(L.isDirty && !G.takenOver, Z ? () => L.processing || fe() : void 0);
  const wa = () => {
    const T = () => S.router.post(`${b}/review`, ee, { preserveScroll: !0 });
    L.isDirty ? (L.transform((U) => ({ ...U, publish: !1, published_at: null })), L.put(b, { preserveScroll: !0, onSuccess: T })) : T();
  }, Ce = (T = null) => {
    f.update ? fe(!0, T) : r && S.router.post(`${b}/publish`, { ...ee, published_at: T }, { preserveScroll: !0, onSuccess: () => H(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (T) => {
    T.preventDefault(), fe();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: B }),
    I,
    G.dialogs,
    /* @__PURE__ */ e.jsxs(
      n.PageHeader,
      {
        title: B,
        back: { href: g, label: t("Back to :title", { title: s.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          r && !r.trashed && s.pages !== !1 && /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(
            "a",
            {
              href: r.previewUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              title: L.isDirty ? t("Shows the saved draft: save first to see your changes.") : t("Shows the saved draft."),
              children: [
                /* @__PURE__ */ e.jsx(Wa, {}),
                " ",
                t("Preview")
              ]
            }
          ) }),
          r?.url && /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: r.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(ge, {}),
            " ",
            t("View page")
          ] }) }),
          r?.trashed && f.delete && /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", onClick: () => S.router.post(`${b}/restore`, {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(be, {}),
            " ",
            t("Restore")
          ] }),
          r?.trashed && f.delete && /* @__PURE__ */ e.jsxs(
            n.Button,
            {
              type: "button",
              variant: "outline",
              className: "cms:text-destructive",
              onClick: () => E(
                t(`Delete ":title" for good, in every language, with its revisions? This can't be undone.`, { title: d.title }) + ks(x),
                () => S.router.delete(`${b}/force`, { data: x.length > 0 ? { force: 1 } : {} })
              ),
              children: [
                /* @__PURE__ */ e.jsx(W, {}),
                " ",
                t("Delete for good")
              ]
            }
          ),
          r && !r.trashed && (f.create || f.delete && !G.readOnly || Z && u !== null) && /* @__PURE__ */ e.jsxs(n.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(n.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "outline", size: "icon", "aria-label": t("More actions"), children: /* @__PURE__ */ e.jsx(at, {}) }) }),
            /* @__PURE__ */ e.jsxs(n.DropdownMenuContent, { align: "end", className: "cms:min-w-52", children: [
              Z && u !== null && /* @__PURE__ */ e.jsxs(
                n.DropdownMenuItem,
                {
                  disabled: L.processing || L.isDirty,
                  title: L.isDirty ? void 0 : t("Fill in what isn't translated yet, into the draft"),
                  onSelect: () => S.router.post(z(`cms/entries/${r.id}/translations/${r.locale}/translate`), { version: r.version }, { preserveScroll: !0 }),
                  children: [
                    /* @__PURE__ */ e.jsx(ds, {}),
                    " ",
                    L.isDirty ? t("Save to translate") : t("Translate from :language", { language: l.find((T) => T.main)?.name ?? (Q ? P(Q) : t("the main language")) })
                  ]
                }
              ),
              f.create && /* @__PURE__ */ e.jsxs(n.DropdownMenuItem, { title: t("Copy every language as a new draft"), onSelect: () => S.router.post(`${b}/duplicate`), children: [
                /* @__PURE__ */ e.jsx(Zs, {}),
                " ",
                t("Duplicate")
              ] }),
              f.delete && !G.readOnly && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(n.DropdownMenuSeparator, {}),
                /* @__PURE__ */ e.jsxs(
                  n.DropdownMenuItem,
                  {
                    className: "cms:text-destructive",
                    onSelect: () => E(t('Move ":title" to the trash? It comes off the site; you can restore it.', { title: d.title }) + ks(x), () => S.router.delete(b), t("Move to trash")),
                    children: [
                      /* @__PURE__ */ e.jsx(W, {}),
                      " ",
                      t("Move to trash")
                    ]
                  }
                )
              ] })
            ] })
          ] }),
          r && Z && y && /* @__PURE__ */ e.jsxs("span", { title: t("Machine translation isn't set up on this site: ask your developer (SUNRICE_TRANSLATE_DRIVER, see Help → Developer docs → Machine translation)."), children: [
            /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", disabled: !0, "aria-describedby": "machine-translate-missing", children: [
              /* @__PURE__ */ e.jsx(ds, {}),
              " ",
              t("Translate from :language", { language: l.find((T) => T.main)?.name ?? (Q ? P(Q) : t("the main language")) })
            ] }),
            /* @__PURE__ */ e.jsx("span", { id: "machine-translate-missing", className: "cms:sr-only", children: t("Machine translation isn't set up on this site: ask your developer.") })
          ] }),
          Z && /* @__PURE__ */ e.jsxs(n.Button, { type: "submit", variant: r ? "outline" : "default", disabled: L.processing, children: [
            L.processing && /* @__PURE__ */ e.jsx(ce, { className: "cms:animate-spin" }),
            t(r ? "Save draft" : "Create draft")
          ] }),
          r && !r.trashed && Z && !f.publish && (r.status === "draft" || r.hasUnpublishedChanges || L.isDirty) && /* @__PURE__ */ e.jsxs(
            n.Button,
            {
              type: "button",
              disabled: L.processing,
              onClick: wa,
              title: r.review ? t("Already sent; sending again tells them again") : t("Ask those who can publish to review it"),
              children: [
                /* @__PURE__ */ e.jsx(rn, {}),
                " ",
                r.review ? t("Send for review again") : t("Submit for review")
              ]
            }
          ),
          r && !r.trashed && f.publish && !G.readOnly && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex", children: [
            R && k ? /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", className: "cms:rounded-r-none", disabled: L.processing, title: t("Change the date"), onClick: () => H(!0), children: [
              /* @__PURE__ */ e.jsx(Ge, {}),
              " ",
              t("Scheduled for :date", { date: K(r.publishedAt) })
            ] }) : /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: k ? "outline" : "default", className: "cms:rounded-r-none cms:disabled:opacity-100", disabled: L.processing || k, onClick: () => Ce(), children: [
              k && /* @__PURE__ */ e.jsx(je, { className: "cms:text-emerald-600 cms:dark:text-emerald-400" }),
              r.status === "draft" ? t("Publish") : t(k ? "Published" : "Publish changes")
            ] }),
            /* @__PURE__ */ e.jsxs(n.DropdownMenu, { children: [
              /* @__PURE__ */ e.jsx(n.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(n.Button, { type: "button", size: "icon", variant: k ? "outline" : "default", className: k ? "cms:-ml-px cms:rounded-l-none" : "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": t("More publishing options"), children: /* @__PURE__ */ e.jsx(Us, {}) }) }),
              /* @__PURE__ */ e.jsxs(n.DropdownMenuContent, { align: "end", children: [
                /* @__PURE__ */ e.jsxs(n.DropdownMenuItem, { onSelect: () => H(!0), children: [
                  /* @__PURE__ */ e.jsx(Ge, {}),
                  " ",
                  t(R ? "Change the date…" : "Publish on a date…")
                ] }),
                R && /* @__PURE__ */ e.jsx(n.DropdownMenuItem, { onSelect: () => Ce((/* @__PURE__ */ new Date()).toISOString()), children: t("Publish now") }),
                r.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  /* @__PURE__ */ e.jsx(n.DropdownMenuSeparator, {}),
                  /* @__PURE__ */ e.jsx(n.DropdownMenuItem, { onSelect: () => S.router.post(`${b}/unpublish`, ee, { preserveScroll: !0 }), children: t(R ? "Unschedule (back to draft)" : "Unpublish") })
                ] })
              ] })
            ] })
          ] })
        ] }),
        children: [
          r && /* @__PURE__ */ e.jsx(n.Badge, { variant: r.status === "published" ? "success" : "secondary", children: r.trashed ? t("In the trash") : te(r.status) }),
          r?.review && !r.trashed && /* @__PURE__ */ e.jsx(n.Badge, { variant: "warning", title: r.review.by ? t(":name sent it on :date", { name: r.review.by, date: K(r.review.requestedAt) }) : t("Sent on :date", { date: K(r.review.requestedAt) }), children: t("Waiting for review") }),
          L.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
        ]
      }
    ),
    r && l.length > 1 && /* @__PURE__ */ e.jsx(
      cl,
      {
        entryUrl: b,
        editUrl: `${g}/${r.id}/edit`,
        current: r.locale,
        locales: l,
        canAdd: (f.create || f.translate === !0) && !r.trashed,
        canRemove: f.delete && !r.isMain && !r.trashed,
        onRemove: () => E(
          t('Remove the :language translation of ":title"? Its revisions go with it.', { language: P(r.locale), title: d.title }),
          () => S.router.delete(`${b}/translations/${r.locale}`)
        )
      }
    ),
    /* @__PURE__ */ e.jsx(n.ViewingNotice, { by: G.viewingBy, onTakeOver: G.requestTakeOver }),
    /* @__PURE__ */ e.jsx(n.KeptEditsNotice, { kept: G.kept, disabled: !Z, onLoad: (T) => {
      ka(T);
    }, onDiscard: (T) => {
      G.discardKept(T);
    } }),
    q.version && /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: [
      /* @__PURE__ */ e.jsx("span", { children: q.version }),
      /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "outline", size: "sm", onClick: () => S.router.reload(), children: t("Load theirs") }),
        /* @__PURE__ */ e.jsx(
          n.Button,
          {
            type: "button",
            variant: "destructive",
            size: "sm",
            disabled: L.processing,
            onClick: () => E(t("Save your version over theirs? Their changes are replaced (their earlier published versions stay in the revisions)."), Na),
            children: t("Save mine anyway")
          }
        )
      ] })
    ] }),
    (q.entry || q.published_at || oe.published_at || oe.homepage) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: q.entry ?? q.published_at ?? oe.published_at ?? oe.homepage }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_18rem]", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(n.Card, { children: /* @__PURE__ */ e.jsx(n.CardContent, { children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: !Z, className: "cms:grid cms:gap-4 cms:md:grid-cols-[2fr_1fr]", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "title", children: t("Title") }),
            /* @__PURE__ */ e.jsx(
              n.Input,
              {
                id: "title",
                value: L.data.title,
                "aria-invalid": q.title !== void 0,
                onChange: (T) => {
                  const U = T.target.value;
                  L.setData((X) => ({ ...X, title: U, slug: _a(X.slug, X.title, U, r !== null && r.publishedAt === null && r.status === "draft") })), pe("title");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(F, { message: q.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "slug", children: t("Slug") }),
            /* @__PURE__ */ e.jsx(
              n.Input,
              {
                id: "slug",
                className: "cms:font-mono",
                value: L.data.slug,
                placeholder: t("Made from the title"),
                "aria-invalid": q.slug !== void 0,
                onChange: (T) => {
                  L.setData("slug", T.target.value), pe("slug");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(pa, { note: zs(r?.publishedSlug, L.data.slug, r !== null && r.status !== "draft"), redirectsUrl: C }),
            /* @__PURE__ */ e.jsx(F, { message: q.slug })
          ] })
        ] }) }) }),
        /* @__PURE__ */ e.jsx(Gt.Provider, { value: Array.isArray(o) || !o ? {} : o, children: /* @__PURE__ */ e.jsx(
          ns,
          {
            disabled: !Z,
            fields: a,
            values: L.data.data,
            errors: q,
            storageKey: `cms:entry:${s.handle}`,
            shared: c,
            sharedValues: i,
            sharedNote: Q ? t("Shared by all languages: the greyed-out fields are edited in :language.", { language: P(Q) }) : t("Shared by all languages: the greyed-out fields are edited in the main language."),
            onChange: (T, U) => {
              L.setData("data", { ...L.data.data, [T]: U }), pe(`data.${T}`);
            }
          }
        ) }),
        /* @__PURE__ */ e.jsx(n.CollapsibleCard, { title: t("SEO"), description: t("How this entry appears in search results and shared links."), titleClassName: "cms:text-base", storageKey: "cms:entry:seo", hasErrors: Se(q, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !Z, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(
          xe,
          {
            bare: !0,
            id: "seo",
            fields: ls(),
            value: L.data.seo,
            errors: J(q, "seo"),
            onChange: (T) => {
              L.setData("seo", T), pe("seo");
            }
          }
        ) }) })
      ] }),
      !r && s.hierarchical && /* @__PURE__ */ e.jsx("aside", { className: "cms:flex cms:flex-col cms:gap-4", children: /* @__PURE__ */ e.jsx(n.CollapsibleCard, { title: "Page settings", titleClassName: "cms:text-base", storageKey: "cms:entry:page-settings", hasErrors: q.parent_id !== void 0, children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !Z, className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: /* @__PURE__ */ e.jsx(ga, { collection: s, value: L.data.parent_id, error: q.parent_id, onChange: (T) => ie({ parent_id: T }) }) }) }) }),
      r && /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:flex-col cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs(n.CollapsibleCard, { title: t("Status"), titleClassName: "cms:text-base", storageKey: "cms:entry:status", contentClassName: "cms:flex cms:flex-col cms:gap-3 cms:text-sm", children: [
          /* @__PURE__ */ e.jsxs("dl", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-3", children: [
              /* @__PURE__ */ e.jsx("dt", { className: "cms:text-muted-foreground", children: t("Status") }),
              /* @__PURE__ */ e.jsx("dd", { children: /* @__PURE__ */ e.jsx(n.Badge, { variant: r.status === "published" ? "success" : "secondary", children: r.trashed ? t("In the trash") : te(r.status) }) })
            ] }),
            r.status !== "draft" && r.publishedAt && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:justify-between cms:gap-3", children: [
              /* @__PURE__ */ e.jsx("dt", { className: "cms:text-muted-foreground", children: r.status === "scheduled" ? t("Goes live") : t("Published") }),
              /* @__PURE__ */ e.jsx("dd", { className: "cms:text-right cms:tabular-nums", children: K(r.publishedAt) })
            ] })
          ] }),
          r.review && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-muted-foreground", children: [
            r.review.by ? t("Sent for review by :name · :date.", { name: r.review.by, date: K(r.review.requestedAt) }) : t("Sent for review · :date.", { date: K(r.review.requestedAt) }),
            f.publish ? ` ${t("Publishing it answers the request.")}` : ""
          ] }),
          r.review && !r.trashed && (r.review.mine || f.publish && !G.readOnly) && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: [
            f.publish && !G.readOnly && /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", size: "sm", disabled: L.processing, onClick: () => ne(!0), children: [
              /* @__PURE__ */ e.jsx(_e, {}),
              " ",
              t("Send back…")
            ] }),
            r.review.mine && /* @__PURE__ */ e.jsx(
              n.Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                disabled: L.processing,
                title: t("Take the request back, to keep working on it"),
                onClick: () => S.router.post(`${b}/review/withdraw`, ee, { preserveScroll: !0 }),
                children: t("Withdraw the request")
              }
            )
          ] }),
          !r.trashed && f.publish && !G.readOnly && /* @__PURE__ */ e.jsx(
            rl,
            {
              status: r.status,
              publishedAt: r.publishedAt,
              processing: L.processing,
              onPublish: (T) => Ce(T),
              onUnpublish: () => S.router.post(`${b}/unpublish`, ee, { preserveScroll: !0 })
            },
            r.publishedAt ?? "none"
          ),
          r.status !== "draft" && r.hasUnpublishedChanges && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("The draft has changes the site doesn't show yet.") }),
          j?.is && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("This is the site's homepage.") }),
          j && !j.is && j.can && r.status === "published" && !r.trashed && /* @__PURE__ */ e.jsx(
            n.Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "cms:mt-1 cms:self-start",
              onClick: () => E(
                (j.current ? t('Make ":title" the homepage? Visitors to / will see it instead of ":current".', { title: d.title, current: j.current }) : t('Make ":title" the homepage? Visitors to / will see it.', { title: d.title })) + " " + t("Its own address will lead to / as well."),
                () => S.router.post(`${b}/homepage`, {}, { preserveScroll: !0 }),
                t("Make this the homepage")
              ),
              children: t("Make this the homepage")
            }
          ),
          l.find((T) => T.code === r.locale)?.outdated && /* @__PURE__ */ e.jsx("p", { className: "cms:text-amber-700 cms:dark:text-amber-400", children: Q ? t("The :language version changed since this translation was last saved.", { language: P(Q) }) : t("The main version changed since this translation was last saved.") })
        ] }),
        /* @__PURE__ */ e.jsxs(n.CollapsibleCard, { title: t("Used by"), titleClassName: "cms:text-base", storageKey: "cms:entry:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          x.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("No other content links here.") }),
          x.map((T) => /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
            T.url ? /* @__PURE__ */ e.jsx("a", { href: T.url, className: "cms:block cms:truncate cms:underline-offset-4 cms:hover:underline", children: T.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:truncate", children: T.label }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", title: T.field, children: T.fieldLabel ?? T.field })
          ] }, `${T.label}:${T.field}`))
        ] }),
        w && /* @__PURE__ */ e.jsx(
          dl,
          {
            entryUrl: b,
            collection: s,
            settings: w,
            templates: $,
            blueprints: N,
            disabled: !Z,
            values: L.data,
            errors: q,
            onChange: ie,
            draftDirty: L.isDirty
          }
        ),
        m !== null && s.comments && /* @__PURE__ */ e.jsx(tl, { entryId: r.id, comments: m }),
        /* @__PURE__ */ e.jsxs(n.CollapsibleCard, { title: t("Revisions"), titleClassName: "cms:text-base", storageKey: "cms:entry:revisions", contentClassName: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
          h !== null && f.update && /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", size: "sm", onClick: () => S.router.post(z(`cms/entries/${r.id}/translations/${r.locale}/undo-restore`), {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(_e, {}),
            " ",
            t("Undo the restore")
          ] }),
          /* @__PURE__ */ e.jsx(S.Deferred, { data: "revisions", fallback: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(n.Skeleton, { className: "cms:h-8" }),
            /* @__PURE__ */ e.jsx(n.Skeleton, { className: "cms:h-8" })
          ] }), children: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            (p ?? []).length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("Each publish keeps one.") }),
            (p ?? []).map((T) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1 cms:border-b cms:border-border/60 cms:pb-2 cms:last:border-b-0 cms:last:pb-0", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
                /* @__PURE__ */ e.jsx("div", { className: "cms:truncate", children: T.title }),
                /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
                  K(T.createdAt),
                  T.author ? ` · ${T.author}` : ""
                ] }),
                /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: T.changed === null ? t("First kept version") : T.changed.length === 0 ? t("No field changed") : t("Changed: :fields", { fields: T.changed.join(", ") }) })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-1", children: [
                /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => A(T), children: t("Compare") }),
                f.update && !r.trashed && /* @__PURE__ */ e.jsx(
                  n.Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    onClick: () => S.router.post(z(`cms/entries/${r.id}/revisions/${T.id}/restore`), {}, { preserveScroll: !0 }),
                    children: t("Restore")
                  }
                )
              ] })
            ] }, T.id))
          ] }) })
        ] })
      ] })
    ] }),
    r?.review && /* @__PURE__ */ e.jsx(
      ll,
      {
        open: V,
        onClose: () => ne(!1),
        by: r.review.by,
        onSend: (T, U) => S.router.post(`${b}/review/send-back`, { ...ee, note: T }, { preserveScroll: !0, onSuccess: () => {
          ne(!1), U();
        }, onError: U })
      }
    ),
    /* @__PURE__ */ e.jsx(ol, { entryId: r?.id ?? 0, revision: v, onClose: () => A(null), dirty: L.isDirty }),
    /* @__PURE__ */ e.jsx(
      il,
      {
        open: _,
        onClose: () => H(!1),
        processing: L.processing,
        rescheduling: R,
        current: r?.publishedAt ?? null,
        onSchedule: (T) => Ce(T)
      }
    )
  ] });
}
function ll({ open: s, onClose: a, by: l, onSend: c }) {
  const [i, r] = D.useState(""), [d, p] = D.useState(!1), m = S.usePage().props.errors ?? {};
  return D.useEffect(() => {
    s && r("");
  }, [s]), /* @__PURE__ */ e.jsx(n.Dialog, { open: s, onOpenChange: (o) => !o && !d && a(), children: /* @__PURE__ */ e.jsxs(n.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(n.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(n.DialogTitle, { children: t("Send back without publishing") }),
      /* @__PURE__ */ e.jsx(n.DialogDescription, { children: l ? t(":name gets an email with your note, and the request is cleared. The draft stays as it is.", { name: l }) : t("The one who asked gets an email with your note, and the request is cleared. The draft stays as it is.") })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "send-back-note", children: t("Note (optional)") }),
      /* @__PURE__ */ e.jsx(
        n.Textarea,
        {
          id: "send-back-note",
          rows: 4,
          maxLength: 2e3,
          value: i,
          placeholder: t("What to change before it can go live"),
          "aria-invalid": m.note !== void 0,
          onChange: (o) => r(o.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(F, { message: m.note })
    ] }),
    /* @__PURE__ */ e.jsxs(n.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "outline", disabled: d, onClick: a, children: t("Cancel") }),
      /* @__PURE__ */ e.jsxs(n.Button, { type: "button", disabled: d, onClick: () => {
        p(!0), c(i, () => p(!1));
      }, children: [
        d && /* @__PURE__ */ e.jsx(ce, { className: "cms:animate-spin" }),
        " ",
        t("Send back")
      ] })
    ] })
  ] }) });
}
function cl({ entryUrl: s, editUrl: a, current: l, locales: c, canAdd: i, canRemove: r, onRemove: d }) {
  const p = c.filter((o) => o.status !== null), m = c.filter((o) => o.status === null);
  return /* @__PURE__ */ e.jsxs("nav", { "aria-label": t("Languages"), className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("div", { className: "cms:inline-flex cms:items-center cms:gap-0.5 cms:rounded-md cms:bg-muted cms:p-0.5", children: p.map((o) => {
      const x = o.code === l, h = o.main ? t(":language (main)", { language: o.name ?? P(o.code) }) : o.name ?? P(o.code), u = o.status ? te(o.status) : "", y = o.outdated ? t(":language: :status, outdated (the main language changed since)", { language: h, status: u }) : t(":language: :status", { language: h, status: u });
      return /* @__PURE__ */ e.jsxs(
        "button",
        {
          type: "button",
          title: y,
          "aria-label": y,
          "aria-current": x ? "page" : void 0,
          onClick: () => !x && S.router.get(a, { locale: o.code }),
          className: `cms:relative cms:inline-flex cms:h-7 cms:min-w-10 cms:items-center cms:justify-center cms:gap-1.5 cms:rounded cms:px-2.5 cms:text-xs cms:font-semibold cms:tracking-wide cms:uppercase cms:transition-colors ${x ? "cms:bg-card cms:text-foreground cms:shadow-xs" : "cms:text-muted-foreground cms:hover:text-foreground"}`,
          children: [
            o.code,
            (o.outdated || o.status === "published") && /* @__PURE__ */ e.jsx("span", { "aria-hidden": !0, className: `cms:size-1.5 cms:rounded-full ${o.outdated ? "cms:bg-amber-500" : "cms:bg-emerald-500"}` })
          ]
        },
        o.code
      );
    }) }),
    i && m.map((o) => /* @__PURE__ */ e.jsxs(
      n.Button,
      {
        type: "button",
        variant: "outline",
        size: "sm",
        className: "cms:h-8 cms:border-dashed cms:text-xs cms:uppercase",
        title: t("Add :language", { language: o.name ?? P(o.code) }),
        onClick: () => S.router.post(`${s}/translations`, { locale: o.code }),
        children: [
          /* @__PURE__ */ e.jsx(Y, {}),
          " ",
          o.code
        ]
      },
      o.code
    )),
    r && /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:ml-auto cms:text-destructive", onClick: d, children: t("Remove this language") })
  ] });
}
function rl({ status: s, publishedAt: a, processing: l, onPublish: c, onUnpublish: i }) {
  const [r, d] = D.useState(a ? Ts(new Date(a)) : ""), p = r === "" ? null : new Date(r), m = p !== null && p.getTime() > Date.now(), o = (u) => u === null ? null : Math.floor(u.getTime() / 6e4), x = o(p) !== o(a ? new Date(a) : null), h = t(s === "draft" ? m ? "Schedule" : "Publish" : m ? s === "scheduled" ? "Reschedule" : "Schedule" : "Change date");
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:border-t cms:border-border/60 cms:pt-3", children: [
    /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "entry-published-at", children: t("Publish date") }),
    /* @__PURE__ */ e.jsx(n.DatePicker, { id: "entry-published-at", withTime: !0, className: "cms:max-w-none", value: r || null, onChange: (u) => d(u ?? "") }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t(s === "draft" ? "Empty: now. A date in the future schedules it." : "The date shown as published. A date in the future takes it off the site until then.") }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: [
      (s === "draft" || x) && /* @__PURE__ */ e.jsxs(n.Button, { type: "button", size: "sm", disabled: l, onClick: () => c(p?.toISOString() ?? null), children: [
        /* @__PURE__ */ e.jsx(Ge, {}),
        " ",
        h
      ] }),
      s !== "draft" && /* @__PURE__ */ e.jsx(n.Button, { type: "button", size: "sm", variant: "outline", disabled: l, onClick: i, children: t("Unpublish") })
    ] })
  ] });
}
function il({ open: s, onClose: a, onSchedule: l, current: c, processing: i, rescheduling: r }) {
  const [d, p] = D.useState("");
  D.useEffect(() => {
    s && p(Ts($a(c)));
  }, [s, c]);
  const m = d === "" ? null : new Date(d), o = m !== null && m.getTime() <= Date.now();
  return /* @__PURE__ */ e.jsx(n.Dialog, { open: s, onOpenChange: (x) => !x && a(), children: /* @__PURE__ */ e.jsxs(n.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(n.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(n.DialogTitle, { children: t(r ? "Change the publish date" : "Publish on a date") }),
      /* @__PURE__ */ e.jsx(n.DialogDescription, { children: t("The entry goes live then.") })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "published-at", children: t("Date and time") }),
      /* @__PURE__ */ e.jsx(n.DatePicker, { id: "published-at", withTime: !0, required: !0, className: "cms:max-w-none", value: d || null, onChange: (x) => p(x ?? "") }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("In your time zone.") }),
      o && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-amber-700 cms:dark:text-amber-400", children: t("This date has passed: the entry goes live now, dated :date.", { date: K(m.toISOString()) }) })
    ] }),
    /* @__PURE__ */ e.jsxs(n.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "outline", onClick: a, children: t("Cancel") }),
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", disabled: m === null || i, onClick: () => m && l(m.toISOString()), children: t(o ? "Publish now, back-dated" : r ? "Change the date" : "Schedule") })
    ] })
  ] }) });
}
function ol({ entryId: s, revision: a, onClose: l, dirty: c }) {
  const [i, r] = D.useState(null), [d, p] = D.useState(!1);
  return D.useEffect(() => {
    if (r(null), p(!1), !a) return;
    let m = !0;
    return fetch(z(`cms/entries/${s}/revisions/${a.id}/compare`), { headers: { Accept: "application/json" }, credentials: "same-origin" }).then((o) => o.ok ? o.json() : Promise.reject(new Error(String(o.status)))).then((o) => {
      m && r(o.fields);
    }).catch(() => {
      m && p(!0);
    }), () => {
      m = !1;
    };
  }, [a, s]), /* @__PURE__ */ e.jsx(n.Dialog, { open: a !== null, onOpenChange: (m) => !m && l(), children: /* @__PURE__ */ e.jsxs(n.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto cms:sm:max-w-2xl", children: [
    /* @__PURE__ */ e.jsxs(n.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(n.DialogTitle, { children: t("Compare with the draft") }),
      /* @__PURE__ */ e.jsxs(n.DialogDescription, { children: [
        a ? a.author ? t("The version published :date by :name, beside the saved draft.", { date: K(a.createdAt), name: a.author }) : t("The version published :date, beside the saved draft.", { date: K(a.createdAt) }) : "",
        c ? ` ${t("Your unsaved changes aren't included.")}` : ""
      ] })
    ] }),
    d && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t("The comparison could not be loaded. Try again.") }),
    !d && i === null && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(n.Skeleton, { className: "cms:h-12" }),
      /* @__PURE__ */ e.jsx(n.Skeleton, { className: "cms:h-12" })
    ] }),
    i?.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("The draft is the same as this version.") }),
    i && i.length > 0 && /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: i.map((m) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: m.label }),
      /* @__PURE__ */ e.jsxs("dd", { className: "cms:grid cms:gap-2 cms:sm:grid-cols-2", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:rounded-md cms:border cms:border-destructive/30 cms:bg-destructive/5 cms:p-2 cms:break-words cms:whitespace-pre-wrap", children: [
          /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:text-xs cms:text-muted-foreground", children: t("This version") }),
          m.revision || "—"
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:rounded-md cms:border cms:border-emerald-500/30 cms:bg-emerald-500/5 cms:p-2 cms:break-words cms:whitespace-pre-wrap", children: [
          /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:text-xs cms:text-muted-foreground", children: t("Draft") }),
          m.draft || "—"
        ] })
      ] })
    ] }, m.label)) }),
    /* @__PURE__ */ e.jsx(n.DialogFooter, { children: /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "outline", onClick: l, children: t("Close") }) })
  ] }) });
}
function ga({ collection: s, value: a, error: l, onChange: c }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "parent", children: t("Parent") }),
    /* @__PURE__ */ e.jsx(
      we,
      {
        id: "parent",
        multiple: !1,
        max: 1,
        collections: [s.handle],
        invalid: l !== void 0,
        value: a,
        onChange: (i) => c(typeof i == "number" ? i : null)
      }
    ),
    /* @__PURE__ */ e.jsx(F, { message: l })
  ] });
}
function dl({ entryUrl: s, collection: a, settings: l, templates: c, blueprints: i, disabled: r, values: d, errors: p, onChange: m, draftDirty: o }) {
  const x = i.length > 1 ? l.blueprint ?? i[0].handle : void 0, h = S.useForm({ blueprint: x ?? "" }), u = h.errors.blueprint, y = ["parent_id", "template", "comments_closed"].some((w) => p[w] !== void 0) || u !== void 0;
  return /* @__PURE__ */ e.jsx(n.CollapsibleCard, { title: t("Page settings"), titleClassName: "cms:text-base", storageKey: "cms:entry:page-settings", hasErrors: y, children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: r, className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: [
    a.hierarchical && /* @__PURE__ */ e.jsx(ga, { collection: a, value: d.parent_id, error: p.parent_id, onChange: (w) => m({ parent_id: w }) }),
    i.length > 1 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "blueprint", children: t("Blueprint") }),
      /* @__PURE__ */ e.jsxs(n.Select, { value: h.data.blueprint, onValueChange: (w) => h.setData("blueprint", w), children: [
        /* @__PURE__ */ e.jsx(n.SelectTrigger, { id: "blueprint", "aria-invalid": u !== void 0, children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(n.SelectContent, { children: i.map((w) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: w.handle, children: w.title }, w.handle)) })
      ] }),
      h.data.blueprint !== x && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("The fields change in every language; values of fields both blueprints have are kept. The editor reloads.") }),
        /* @__PURE__ */ e.jsx(
          n.Button,
          {
            type: "button",
            size: "sm",
            disabled: h.processing || o,
            title: o ? t("Save your draft first") : void 0,
            onClick: () => h.put(`${s}/settings`, { preserveScroll: !0 }),
            children: t("Change blueprint")
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(F, { message: u })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "template", children: t("Template") }),
      /* @__PURE__ */ e.jsx(
        n.Input,
        {
          id: "template",
          className: "cms:font-mono",
          placeholder: `cms.${a.handle}-landing`,
          value: d.template,
          onChange: (w) => m({ template: w.target.value }),
          "aria-invalid": p.template !== void 0
        }
      ),
      /* @__PURE__ */ e.jsx(ha, { example: `cms.${a.handle}-landing`, empty: t("Leave empty to use the collection's template."), value: d.template, lookup: c }),
      /* @__PURE__ */ e.jsx(F, { message: p.template })
    ] }),
    a.comments && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(n.Switch, { id: "comments-open", checked: !d.comments_closed, onCheckedChange: (w) => m({ comments_closed: !w }) }),
      /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "comments-open", children: t("Accept new comments") }),
      /* @__PURE__ */ e.jsx("a", { href: z(`cms/comments?entry=${s.split("/").slice(-1)[0]}`), className: "cms:ml-auto cms:text-muted-foreground cms:underline-offset-4 hover:cms:underline", children: t("Comments") })
    ] })
  ] }) });
}
function Je(s, a) {
  const l = s[a]?.depth ?? 0;
  let c = a + 1;
  for (; c < s.length && s[c].depth > l; ) c++;
  return c;
}
function le(s, a) {
  const l = a < 0 ? 0 : a + 1, c = a < 0 ? s.length : Je(s, a), i = a < 0 ? 0 : (s[a]?.depth ?? 0) + 1, r = [];
  for (let d = l; d < c; d++)
    s[d].depth === i && r.push(d);
  return r;
}
function cs(s, a, l) {
  const c = le(s, a);
  if (l.length !== c.length || [...l].sort((p, m) => p - m).some((p, m) => p !== c[m]) || c.length === 0) return s.slice();
  const i = c[0], r = Je(s, c[c.length - 1]), d = l.flatMap((p) => s.slice(p, Je(s, p)));
  return [...s.slice(0, i), ...d, ...s.slice(r)];
}
function ml(s, a) {
  const l = new Set(s.map((p) => p.id)), c = /* @__PURE__ */ new Map();
  for (const p of s) {
    const m = a(p), o = m != null && l.has(m) ? m : null;
    c.set(o, [...c.get(o) ?? [], p]);
  }
  const i = [], r = /* @__PURE__ */ new Set(), d = (p, m) => {
    for (const o of c.get(p) ?? [])
      r.has(o.id) || (r.add(o.id), i.push({ ...o, depth: m }), d(o.id, m + 1));
  };
  d(null, 0);
  for (const p of s)
    r.has(p.id) || (r.add(p.id), i.push({ ...p, depth: 0 }), d(p.id, 1));
  return i;
}
function ul({ collection: s, rows: a, hierarchical: l = !1 }) {
  const c = D.useCallback(
    (m) => ml(m, (o) => l ? o.parentId : null),
    [l]
  ), [i, r] = D.useState(() => c(a));
  D.useEffect(() => r(c(a)), [a, c]);
  const d = (m, o) => {
    const x = cs(i, m, o), h = le(x, m).map((u) => x[u].id);
    r(x), S.router.post(
      z("cms/entries/reorder"),
      { collection: s, ids: h, parent_id: m < 0 ? null : i[m]?.id ?? null },
      { preserveScroll: !0, preserveState: !0, onError: () => r(c(a)) }
    );
  }, p = (m) => /* @__PURE__ */ e.jsx(
    n.SortableList,
    {
      items: le(i, m),
      getId: (o) => i[o].id,
      getLabel: (o) => i[o].title,
      onReorder: (o) => d(m, o),
      className: m < 0 ? "cms:gap-1" : "cms:mt-1 cms:gap-1 cms:pl-6",
      children: (o, { handle: x }) => {
        const h = i[o];
        return /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-lg cms:border cms:border-border/70 cms:bg-card cms:p-2 cms:text-sm", children: [
            /* @__PURE__ */ e.jsx(n.SortableHandle, { ...x, label: t("Move :title", { title: h.title }) }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium", children: h.title }),
            /* @__PURE__ */ e.jsx(n.Badge, { variant: h.status === "published" ? "success" : "secondary", children: te(h.status) })
          ] }),
          le(i, o).length > 0 && p(o)
        ] });
      }
    }
  );
  return /* @__PURE__ */ e.jsxs(n.Card, { className: "cms:p-2", children: [
    l && /* @__PURE__ */ e.jsx("p", { className: "cms:px-1 cms:pb-1 cms:text-xs cms:text-muted-foreground", children: t("Entries move among those at their level, with what's under them. To put one under another, choose its Parent in its Page settings.") }),
    p(-1)
  ] });
}
function hl(s, a, l) {
  const c = { ...s, ...a }, i = Object.fromEntries(Object.entries(c.terms).filter(([, d]) => d !== "")), r = {};
  return c.search && (r.search = c.search), c.status && (r.status = c.status), c.author && (r.author = c.author), Object.keys(i).length > 0 && (r.terms = i), c.locale && c.locale !== l && (r.locale = c.locale), c.sort && (r.sort = c.sort), r.per_page = c.perPage, r;
}
function xl(s) {
  const a = new URLSearchParams();
  for (const [l, c] of Object.entries(s))
    if (typeof c == "object")
      for (const [i, r] of Object.entries(c)) a.set(`${l}[${i}]`, r);
    else
      a.set(l, String(c));
  return a.toString();
}
function pl(s, a) {
  return s === a ? `-${a}` : s === `-${a}` ? "" : a;
}
function gl(s, a) {
  return s === a ? "asc" : s === `-${a}` ? "desc" : null;
}
function ws(s) {
  return [s.search, s.status, s.author, ...Object.values(s.terms)].filter((a) => a !== "").length;
}
const Ve = "__all", fl = () => [
  { value: "draft", label: t("Drafts") },
  { value: "published", label: t("Published") },
  { value: "scheduled", label: t("Scheduled") },
  { value: "trashed", label: t("Trash") }
];
function jl(s) {
  const { collection: a, entries: l, query: c } = s;
  return n.useBreadcrumbs([{ label: a ? a.title : t("Entries") }]), !a || !l || !c ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: t("Entries") }),
    /* @__PURE__ */ e.jsx(n.PageHeader, { title: t("Entries"), description: t("There are no collections yet. Create one under Structure → Collections, then come back to write its entries.") })
  ] }) : /* @__PURE__ */ e.jsx(bl, { ...s, collection: a, entries: l, query: c });
}
function bl({
  collection: s,
  collections: a,
  entries: l,
  query: c,
  columns: i = [],
  filters: r = { authors: [], taxonomies: [], locales: [] },
  links: d = [],
  manualOrder: p = !1,
  perPageOptions: m = [10, 25, 50, 100],
  preferencesKey: o,
  can: x
}) {
  const h = z(`cms/collections/${s.handle}/entries`), u = r.locales[0] ?? c.locale, [y, w] = D.useState(c.search), [N, j] = D.useState([]), [C, $] = D.useState(!1), [f, g] = re(), { setColumns: b, setPerPage: B } = n.useTablePreferences(o ?? `table.cms.entries.${s.handle}`, { columns: c.columns, perPage: c.perPage });
  D.useEffect(() => j([]), [l]);
  const E = c.status === "trashed", I = ws(c) > 0, _ = i.filter((k) => c.columns.includes(k.key)), H = (k = {}) => hl(c, k, u), v = (k) => S.router.get(h, H(k), { preserveState: !0, preserveScroll: !0, replace: !0 });
  D.useEffect(() => {
    if (y === c.search) return;
    const k = window.setTimeout(() => v({ search: y }), 300);
    return () => window.clearTimeout(k);
  }, [y]);
  const A = E ? x?.delete ? [{ action: "restore", label: t("Restore") }, { action: "delete", label: t("Delete for good"), danger: !0 }] : [] : [
    ...x?.publish ? [{ action: "publish", label: t("Publish") }, { action: "unpublish", label: t("Unpublish") }] : [],
    ...x?.delete ? [{ action: "trash", label: t("Move to the trash"), danger: !0 }] : []
  ], V = (k, O, R = !1) => {
    const de = () => S.router.post(`${h}/bulk`, { action: k, ids: N }, { preserveScroll: !0 });
    if (R) {
      const fe = N.length === 1 ? t(":action: 1 entry?", { action: O }) : t(":action: :count entries?", { action: O, count: N.length });
      f(
        `${fe} ${t(k === "delete" ? "This can't be undone." : "They come off the site; you can restore them.")}`,
        de,
        t(k === "trash" ? "Move to trash" : "Delete")
      );
    } else
      de();
  }, ne = async (k) => {
    const O = new Set(c.columns);
    O.has(k) ? O.delete(k) : O.add(k), await b(i.map((R) => R.key).filter((R) => O.has(R))), S.router.reload({ only: ["entries", "query"] });
  }, L = () => {
    w(""), v({ search: "", status: "", author: "", terms: {} });
  }, ie = p && !!x?.update, ee = ie && l !== null && l.lastPage <= 1 && l.data.length > 1, Q = E && !!x?.delete, q = 1 + _.length + (A.length > 0 ? 1 : 0) + (ie ? 1 : 0) + (Q ? 1 : 0), oe = xl(H()), pe = [...new Set(d.map((k) => k.group))];
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: s.title }),
    g,
    /* @__PURE__ */ e.jsx(
      n.PageHeader,
      {
        title: s.title,
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          d.length > 0 && /* @__PURE__ */ e.jsxs(n.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(n.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(n.Button, { variant: "outline", children: [
              /* @__PURE__ */ e.jsx(qa, {}),
              " ",
              t("Go to")
            ] }) }),
            /* @__PURE__ */ e.jsx(n.DropdownMenuContent, { align: "end", className: "cms:min-w-56", children: pe.map((k, O) => /* @__PURE__ */ e.jsxs(D.Fragment, { children: [
              O > 0 && /* @__PURE__ */ e.jsx(n.DropdownMenuSeparator, {}),
              /* @__PURE__ */ e.jsx(n.DropdownMenuLabel, { children: k }),
              d.filter((R) => R.group === k).map((R) => /* @__PURE__ */ e.jsx(n.DropdownMenuItem, { asChild: !0, children: R.external ? /* @__PURE__ */ e.jsxs("a", { href: R.href, target: "_blank", rel: "noopener noreferrer", children: [
                R.label,
                " ",
                /* @__PURE__ */ e.jsx(ge, { className: "cms:ml-auto" })
              ] }) : /* @__PURE__ */ e.jsx(S.Link, { href: R.href, children: R.label }) }, R.href))
            ] }, k)) })
          ] }),
          s.listing && !E && /* @__PURE__ */ e.jsx(n.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs(S.Link, { href: z(`cms/collections/${s.handle}/listing/edit`), children: [
            /* @__PURE__ */ e.jsx(Xa, {}),
            " ",
            t("Listing page")
          ] }) }),
          l.total > 0 && x?.export && /* @__PURE__ */ e.jsx(n.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: `${h}/export${oe ? `?${oe}` : ""}`, children: [
            /* @__PURE__ */ e.jsx(et, {}),
            " ",
            t("Export CSV")
          ] }) }),
          x?.create && !E && /* @__PURE__ */ e.jsx(n.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(S.Link, { href: `${h}/create`, children: [
            /* @__PURE__ */ e.jsx(Y, {}),
            " ",
            t("New entry")
          ] }) })
        ] }),
        children: a.length > 1 && /* @__PURE__ */ e.jsxs(n.Select, { value: s.handle, onValueChange: (k) => S.router.get(z(`cms/collections/${k}/entries`)), children: [
          /* @__PURE__ */ e.jsx(n.SelectTrigger, { className: "cms:w-48", "aria-label": t("Collection"), children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(n.SelectContent, { children: a.map((k) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: k.handle, children: k.title }, k.handle)) })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-xs", children: [
        /* @__PURE__ */ e.jsx(Ne, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          n.Input,
          {
            className: "cms:pl-9",
            placeholder: t("Search titles, slugs or #id"),
            "aria-label": t("Search entries"),
            value: y,
            onChange: (k) => w(k.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(Re, { label: t("Status"), value: c.status, options: fl(), onChange: (k) => v({ status: k }) }),
      r.authors.length > 0 && /* @__PURE__ */ e.jsx(Re, { label: t("Author"), value: c.author, options: r.authors, onChange: (k) => v({ author: k }) }),
      r.taxonomies.filter((k) => k.terms.length > 0).map((k) => /* @__PURE__ */ e.jsx(
        Re,
        {
          label: k.title,
          value: c.terms[k.handle] ?? "",
          options: k.terms.map((O) => ({ value: O.value, label: `${"— ".repeat(O.depth)}${O.label}` })),
          onChange: (O) => v({ terms: { ...c.terms, [k.handle]: O } })
        },
        k.handle
      )),
      r.locales.length > 1 && /* @__PURE__ */ e.jsxs(n.Select, { value: c.locale, onValueChange: (k) => v({ locale: k }), children: [
        /* @__PURE__ */ e.jsx(n.SelectTrigger, { className: "cms:w-auto cms:min-w-40 cms:max-w-72", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(n.SelectContent, { children: r.locales.map((k) => /* @__PURE__ */ e.jsxs(n.SelectItem, { value: k, children: [
          P(k),
          k === u ? ` ${t("(main)")}` : ""
        ] }, k)) })
      ] }),
      I && /* @__PURE__ */ e.jsxs(n.Button, { variant: "ghost", size: "sm", onClick: L, children: [
        /* @__PURE__ */ e.jsx(ke, {}),
        " ",
        t("Clear")
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:ml-auto cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
        N.length > 0 && A.length > 0 && /* @__PURE__ */ e.jsxs("div", { role: "toolbar", "aria-label": t("Selected entries"), className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t(":count selected", { count: N.length }) }),
          A.map((k) => /* @__PURE__ */ e.jsx(n.Button, { size: "sm", variant: k.danger ? "destructive" : "outline", onClick: () => V(k.action, k.label, k.danger), children: k.label }, k.action))
        ] }),
        ee && /* @__PURE__ */ e.jsxs(n.Button, { variant: C ? "secondary" : "outline", "aria-pressed": C, onClick: () => $(!C), children: [
          /* @__PURE__ */ e.jsx(As, {}),
          " ",
          t(C ? "Done" : "Reorder")
        ] }),
        i.length > 0 && /* @__PURE__ */ e.jsxs(n.DropdownMenu, { children: [
          /* @__PURE__ */ e.jsx(n.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(n.Button, { variant: "outline", children: [
            /* @__PURE__ */ e.jsx(Ua, {}),
            " ",
            t("Columns")
          ] }) }),
          /* @__PURE__ */ e.jsxs(n.DropdownMenuContent, { align: "end", className: "cms:max-h-96 cms:overflow-y-auto", children: [
            /* @__PURE__ */ e.jsx(n.DropdownMenuLabel, { children: t("Columns") }),
            i.filter((k) => !k.field).map((k) => /* @__PURE__ */ e.jsx(
              n.DropdownMenuCheckboxItem,
              {
                checked: c.columns.includes(k.key),
                onSelect: (O) => O.preventDefault(),
                onCheckedChange: () => {
                  ne(k.key);
                },
                children: k.label
              },
              k.key
            )),
            i.some((k) => k.field) && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(n.DropdownMenuSeparator, {}),
              /* @__PURE__ */ e.jsx(n.DropdownMenuLabel, { children: t("Fields") }),
              i.filter((k) => k.field).map((k) => /* @__PURE__ */ e.jsx(
                n.DropdownMenuCheckboxItem,
                {
                  checked: c.columns.includes(k.key),
                  onSelect: (O) => O.preventDefault(),
                  onCheckedChange: () => {
                    ne(k.key);
                  },
                  children: k.label
                },
                k.key
              ))
            ] })
          ] })
        ] })
      ] })
    ] }),
    C && ee ? /* @__PURE__ */ e.jsx(ul, { collection: s.handle, rows: l.data, hierarchical: s.hierarchical === !0 }) : /* @__PURE__ */ e.jsxs(n.Card, { className: "cms:gap-0 cms:overflow-hidden cms:py-0", children: [
      /* @__PURE__ */ e.jsxs(n.Table, { children: [
        /* @__PURE__ */ e.jsx(n.TableHeader, { className: "cms:bg-muted/60", children: /* @__PURE__ */ e.jsxs(n.TableRow, { className: "cms:hover:bg-transparent", children: [
          A.length > 0 && /* @__PURE__ */ e.jsx(n.TableHead, { className: "cms:w-10", children: /* @__PURE__ */ e.jsx(
            n.Checkbox,
            {
              "aria-label": t("Select all on this page"),
              checked: l.data.length > 0 && N.length === l.data.length,
              onCheckedChange: (k) => j(k ? l.data.map((O) => O.id) : [])
            }
          ) }),
          /* @__PURE__ */ e.jsx(Ss, { label: t("Title"), sortKey: "title", sort: c.sort, onSort: (k) => v({ sort: k }) }),
          _.map((k) => k.sortable ? /* @__PURE__ */ e.jsx(Ss, { label: k.label, sortKey: k.key, sort: c.sort, onSort: (O) => v({ sort: O }) }, k.key) : /* @__PURE__ */ e.jsx(n.TableHead, { children: k.label }, k.key)),
          ie && /* @__PURE__ */ e.jsx(n.TableHead, { className: "cms:w-px", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: t("Order") }) }),
          Q && /* @__PURE__ */ e.jsx(n.TableHead, { className: "cms:w-px", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: t("Restore") }) })
        ] }) }),
        /* @__PURE__ */ e.jsxs(n.TableBody, { children: [
          l.data.length === 0 && /* @__PURE__ */ e.jsx(n.TableRow, { className: "cms:hover:bg-transparent", children: /* @__PURE__ */ e.jsx(n.TableCell, { colSpan: q, className: "cms:h-32 cms:text-center cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx(Nl, { trashed: E, filtered: ws(E ? { ...c, status: "" } : c) > 0, canCreate: !!x?.create, createUrl: `${h}/create`, onClear: L }) }) }),
          l.data.map((k, O) => /* @__PURE__ */ e.jsxs(n.TableRow, { className: "sunrice-row-in", style: { "--i": O }, "data-state": N.includes(k.id) ? "selected" : void 0, children: [
            A.length > 0 && /* @__PURE__ */ e.jsx(n.TableCell, { children: /* @__PURE__ */ e.jsx(
              n.Checkbox,
              {
                "aria-label": t("Select :title", { title: k.title }),
                checked: N.includes(k.id),
                onCheckedChange: (R) => j(R ? [...N, k.id] : N.filter((de) => de !== k.id))
              }
            ) }),
            /* @__PURE__ */ e.jsxs(n.TableCell, { children: [
              /* @__PURE__ */ e.jsx(
                S.Link,
                {
                  href: z(`cms/collections/${s.handle}/entries/${k.id}/edit${c.locale !== u ? `?locale=${encodeURIComponent(c.locale)}` : ""}`),
                  className: "cms:font-medium cms:underline-offset-4 cms:hover:underline",
                  children: k.title
                }
              ),
              (!c.columns.includes("slug") && k.path || k.parent) && /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: [c.columns.includes("slug") ? null : k.path, k.parent ? t("under :parent", { parent: k.parent }) : null].filter(Boolean).join(" · ") })
            ] }),
            _.map((R) => /* @__PURE__ */ e.jsx(n.TableCell, { className: R.key === "status" ? "" : "cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx("div", { className: "cms:max-w-72 cms:truncate", children: /* @__PURE__ */ e.jsx(vl, { row: k, column: R, mainLocale: u }) }) }, R.key)),
            ie && /* @__PURE__ */ e.jsx(n.TableCell, { className: "cms:w-px", children: /* @__PURE__ */ e.jsxs("span", { className: "cms:flex", children: [
              /* @__PURE__ */ e.jsx(n.Button, { variant: "ghost", size: "icon", "aria-label": t("Move :title up", { title: k.title }), onClick: () => S.router.post(z(`cms/entries/${k.id}/move`), { direction: "up" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(Fs, {}) }),
              /* @__PURE__ */ e.jsx(n.Button, { variant: "ghost", size: "icon", "aria-label": t("Move :title down", { title: k.title }), onClick: () => S.router.post(z(`cms/entries/${k.id}/move`), { direction: "down" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(Ls, {}) })
            ] }) }),
            Q && /* @__PURE__ */ e.jsx(n.TableCell, { className: "cms:w-px", children: /* @__PURE__ */ e.jsxs(
              n.Button,
              {
                variant: "outline",
                size: "sm",
                "aria-label": `Restore ${k.title}`,
                onClick: () => S.router.post(z(`cms/entries/${k.id}/restore`), {}, { preserveScroll: !0 }),
                children: [
                  /* @__PURE__ */ e.jsx(be, {}),
                  " Restore"
                ]
              }
            ) })
          ] }, k.id))
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4 cms:border-t cms:px-6 cms:py-3 cms:text-sm cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-4", children: [
          /* @__PURE__ */ e.jsx("span", { children: l.total === 0 ? t("No entries") : t(":from–:to of :total", { from: l.from, to: l.to, total: l.total }) }),
          /* @__PURE__ */ e.jsxs(n.Select, { value: String(c.perPage), onValueChange: (k) => {
            B(Number(k)), v({ perPage: Number(k) });
          }, children: [
            /* @__PURE__ */ e.jsx(n.SelectTrigger, { className: "cms:h-8 cms:w-auto", "aria-label": t("Entries per page"), children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(n.SelectContent, { children: m.map((k) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: String(k), children: t(":count per page", { count: k }) }, k)) })
          ] })
        ] }),
        l.lastPage > 1 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsx("span", { children: t("Page :page of :last", { page: l.currentPage, last: l.lastPage }) }),
          /* @__PURE__ */ e.jsx(
            n.Button,
            {
              variant: "outline",
              size: "icon",
              className: "cms:size-8",
              "aria-label": t("Previous page"),
              disabled: !l.prev_page_url,
              onClick: () => l.prev_page_url && S.router.get(l.prev_page_url, {}, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(Ze, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            n.Button,
            {
              variant: "outline",
              size: "icon",
              className: "cms:size-8",
              "aria-label": t("Next page"),
              disabled: !l.next_page_url,
              onClick: () => l.next_page_url && S.router.get(l.next_page_url, {}, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(ye, {})
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function Re({ label: s, value: a, options: l, onChange: c }) {
  return /* @__PURE__ */ e.jsxs(n.Select, { value: a === "" ? Ve : a, onValueChange: (i) => c(i === Ve ? "" : i), children: [
    /* @__PURE__ */ e.jsx(n.SelectTrigger, { className: "cms:w-auto cms:min-w-40 cms:max-w-72", title: s, "aria-label": s, children: /* @__PURE__ */ e.jsx(n.SelectValue, { placeholder: s }) }),
    /* @__PURE__ */ e.jsxs(n.SelectContent, { children: [
      /* @__PURE__ */ e.jsx(n.SelectItem, { value: Ve, children: t(":filter: all", { filter: s }) }),
      l.map((i) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: i.value, children: i.label }, i.value))
    ] })
  ] });
}
function Ss({ label: s, sortKey: a, sort: l, onSort: c }) {
  const i = gl(l, a);
  return /* @__PURE__ */ e.jsx(n.TableHead, { "aria-sort": i === "asc" ? "ascending" : i === "desc" ? "descending" : void 0, children: /* @__PURE__ */ e.jsxs(
    "button",
    {
      type: "button",
      onClick: () => c(pl(l, a)),
      className: "cms:-ml-2 cms:inline-flex cms:h-8 cms:items-center cms:gap-1 cms:rounded-md cms:px-2 cms:hover:bg-accent cms:hover:text-accent-foreground",
      children: [
        s,
        i === "asc" ? /* @__PURE__ */ e.jsx(Fs, { className: "cms:size-3" }) : i === "desc" ? /* @__PURE__ */ e.jsx(Ls, { className: "cms:size-3" }) : /* @__PURE__ */ e.jsx(As, { className: "cms:size-3 cms:opacity-40" })
      ]
    }
  ) });
}
function vl({ row: s, column: a, mainLocale: l }) {
  switch (a.key) {
    case "slug":
      return /* @__PURE__ */ e.jsx("span", { className: "cms:font-mono", children: s.slug });
    case "status":
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-1", children: [
        s.trashed ? /* @__PURE__ */ e.jsx(n.Badge, { variant: "outline", className: "cms:text-destructive", title: t(":status before it was trashed", { status: te(s.status) }), children: t("Trashed") }) : /* @__PURE__ */ e.jsx(n.Badge, { variant: s.status === "published" ? "success" : "secondary", children: te(s.status) }),
        s.locales.length > 1 && s.locales.filter((c) => !c.main).map((c) => {
          const i = yl(c);
          return /* @__PURE__ */ e.jsxs(
            n.Badge,
            {
              variant: i.variant,
              className: i.className,
              title: t(":language: :status", { language: P(c.code), status: i.title }),
              "aria-label": t(":language: :status", { language: P(c.code), status: i.title }),
              children: [
                c.code.toUpperCase(),
                i.word && /* @__PURE__ */ e.jsx("span", { className: "cms:font-normal", children: i.word })
              ]
            },
            c.code
          );
        })
      ] });
    case "author":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: s.author ?? "—" });
    case "published_at":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: K(s.publishedAt) });
    case "updated_at":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: K(s.updatedAt) });
    case "created_at":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: K(s.createdAt) });
    default:
      return /* @__PURE__ */ e.jsx("span", { title: s.cells[a.key] ?? void 0, children: s.cells[a.key] ?? "—" });
  }
}
function yl(s) {
  return s.status === null ? { variant: "outline", className: "cms:border-dashed cms:text-muted-foreground", word: t("missing"), title: t("not translated") } : s.outdated ? { variant: "warning", className: "", word: t("outdated"), title: t(":status, outdated: the main language changed since", { status: te(s.status) }) } : s.status === "published" ? { variant: "secondary", className: "", word: null, title: t("Published") } : { variant: "outline", className: "", word: s.status === "scheduled" ? t("scheduled") : t("draft"), title: te(s.status) };
}
function Nl({ trashed: s, filtered: a, canCreate: l, createUrl: c, onClear: i }) {
  return a ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: t("Nothing matches these filters.") }),
    /* @__PURE__ */ e.jsxs(n.Button, { variant: "outline", size: "sm", onClick: i, children: [
      /* @__PURE__ */ e.jsx(ke, {}),
      " ",
      t("Clear filters")
    ] })
  ] }) : s ? /* @__PURE__ */ e.jsx(e.Fragment, { children: t("The trash is empty.") }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: t("No entries yet.") }),
    l && /* @__PURE__ */ e.jsx(n.Button, { size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs(S.Link, { href: c, children: [
      /* @__PURE__ */ e.jsx(Y, {}),
      " ",
      t("Write the first one")
    ] }) })
  ] });
}
function rs({ message: s, processing: a, onSaveMine: l }) {
  const [c, i] = re();
  return s ? /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: [
    i,
    /* @__PURE__ */ e.jsx("span", { children: s }),
    /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "outline", size: "sm", onClick: () => S.router.reload(), children: t("Load theirs") }),
      /* @__PURE__ */ e.jsx(
        n.Button,
        {
          type: "button",
          variant: "destructive",
          size: "sm",
          disabled: a,
          onClick: () => c(t("Save your version over theirs? Their changes are replaced."), l),
          children: t("Save mine anyway")
        }
      )
    ] })
  ] }) : null;
}
function kl(s, a, l, c, i) {
  const r = a[0], d = s === r ? c(":language (main)", { language: i(s) }) : i(s), p = a.filter((m) => m !== s).map(i).join(", ");
  return l !== null && !l.includes(s) ? c("Editing: :language, not translated yet", { language: d }) : p === "" ? c("Editing: :language", { language: d }) : c("Editing: :language — switch to edit :others", { language: d, others: p });
}
function fa({ current: s, locales: a, translated: l, onSwitch: c }) {
  if (a.length < 2) return null;
  const i = kl(s, a, l, t, P);
  return /* @__PURE__ */ e.jsxs("nav", { "aria-label": t("Languages"), className: "cms:flex cms:flex-wrap cms:items-center cms:gap-x-3 cms:gap-y-2", children: [
    /* @__PURE__ */ e.jsx("div", { className: "cms:inline-flex cms:items-center cms:gap-0.5 cms:rounded-md cms:bg-muted cms:p-0.5", children: a.map((r, d) => {
      const p = r === s, m = l === null || l.includes(r), o = d === 0 ? t(":language (main)", { language: P(r) }) : P(r), x = m ? o : t(":language: not translated yet", { language: o });
      return /* @__PURE__ */ e.jsxs(
        "button",
        {
          type: "button",
          title: x,
          "aria-label": x,
          "aria-current": p ? "page" : void 0,
          onClick: () => !p && c(r),
          className: `cms:inline-flex cms:h-7 cms:min-w-10 cms:items-center cms:justify-center cms:gap-1 cms:rounded cms:px-2.5 cms:text-xs cms:font-semibold cms:tracking-wide cms:uppercase cms:transition-colors ${p ? "cms:bg-card cms:text-foreground cms:shadow-xs" : "cms:text-muted-foreground cms:hover:text-foreground"} ${m ? "" : "cms:italic cms:opacity-70"}`,
          children: [
            r,
            m && l !== null && /* @__PURE__ */ e.jsx(je, { "aria-hidden": !0, className: "cms:size-3 cms:text-emerald-600" })
          ]
        },
        r
      );
    }) }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", "aria-live": "polite", children: i })
  ] });
}
function wl(s) {
  return /* @__PURE__ */ e.jsx(Sl, { ...s }, `${s.locale}:${s.version}:${JSON.stringify([s.values, s.seo])}`);
}
function Sl({ collection: s, fields: a, locale: l, locales: c, translated: i = [], shared: r, values: d, seo: p, version: m, can: o }) {
  const x = z(`cms/collections/${s.handle}/listing`), h = z(`cms/collections/${s.handle}/entries`);
  n.useBreadcrumbs([{ label: s.title, href: h }, { label: t("Listing page") }]);
  const u = S.useForm({ locale: l, data: d, seo: p ?? {}, version: m }), y = u.errors, w = (f) => {
    const g = Me(y, f);
    g.length > 0 && u.clearErrors(...g);
  }, N = c[0], j = o.update, C = () => u.processing || u.put(x, { preserveScroll: !0 }), $ = () => {
    u.transform((f) => ({ ...f, version: null })), u.put(x, { preserveScroll: !0 });
  };
  return n.useUnsavedChanges(u.isDirty, j ? C : void 0), /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (f) => {
    f.preventDefault(), C();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: t(":title: listing page", { title: s.title }) }),
    /* @__PURE__ */ e.jsx(
      n.PageHeader,
      {
        title: t(":title: listing page", { title: s.title }),
        back: { href: h, label: t("Back to :title", { title: s.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          s.url && /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: s.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(ge, {}),
            " ",
            t("View")
          ] }) }),
          j && /* @__PURE__ */ e.jsxs(n.Button, { type: "submit", disabled: u.processing, children: [
            u.processing && /* @__PURE__ */ e.jsx(ce, { className: "cms:animate-spin" }),
            " ",
            t("Save")
          ] })
        ] }),
        children: u.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
      }
    ),
    /* @__PURE__ */ e.jsx(fa, { current: l, locales: c, translated: i, onSwitch: (f) => S.router.get(x, { locale: f }) }),
    /* @__PURE__ */ e.jsxs("fieldset", { disabled: !j, className: "cms:flex cms:flex-col cms:gap-6", children: [
      /* @__PURE__ */ e.jsx(rs, { message: y.version, processing: u.processing, onSaveMine: $ }),
      a.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("The listing page has no fields of its own: choose a listing blueprint for the collection under Structure → Collections.") }) : /* @__PURE__ */ e.jsx(n.Card, { children: /* @__PURE__ */ e.jsxs(n.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: [
        (r.length > 0 || Te(a)) && /* @__PURE__ */ e.jsx("p", { role: "note", className: "cms:rounded-lg cms:border cms:border-dashed cms:px-3 cms:py-2 cms:text-sm cms:text-muted-foreground", children: N ? t("Shared by all languages: the greyed-out fields are edited in :language.", { language: P(N) }) : t("Shared by all languages: the greyed-out fields are edited in the main language.") }),
        a.filter((f) => as(f, { ...d, ...u.data.data })).map((f) => r.includes(f.handle) ? /* @__PURE__ */ e.jsx("fieldset", { disabled: !0, className: xa, title: t("Shared by all languages"), children: /* @__PURE__ */ e.jsx(ae, { id: `data-${f.handle}`, field: f, content: !0, value: d[f.handle], errors: {}, onChange: () => {
        } }) }, f.handle) : /* @__PURE__ */ e.jsx(
          ae,
          {
            id: `data-${f.handle}`,
            field: f,
            content: !0,
            value: u.data.data[f.handle],
            errors: J(y, `data.${f.handle}`),
            onChange: (g) => {
              u.setData("data", { ...u.data.data, [f.handle]: g }), w(`data.${f.handle}`);
            }
          },
          f.handle
        ))
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsx(n.CollapsibleCard, { title: t("SEO"), description: t("How the listing page appears in search results and shared links."), titleClassName: "cms:text-base", storageKey: "cms:listing:seo", hasErrors: Se(y, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !j, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(xe, { bare: !0, id: "seo", fields: ls(), value: u.data.seo, errors: J(y, "seo"), onChange: (f) => {
      u.setData("seo", f), w("seo");
    } }) }) })
  ] });
}
function Cl({ fieldsets: s }) {
  const a = S.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(F, { message: a.fieldset }),
    /* @__PURE__ */ e.jsx(
      ua,
      {
        kind: "fieldset",
        base: z("cms/fieldsets"),
        rows: s,
        intro: t("Fields shared between blueprints, and the kinds of block of flexible fields.")
      }
    )
  ] });
}
function $l(s) {
  return /* @__PURE__ */ e.jsx(Dl, { ...s }, `${s.locale}:${s.version}:${JSON.stringify(s.values)}`);
}
function Dl({ set: s, fields: a, locale: l, locales: c, shared: i, values: r, version: d, can: p, settings: m }) {
  const o = z(`cms/globals/${s.handle}/values`);
  n.useBreadcrumbs([{ label: t("Globals"), href: z("cms/globals") }, { label: s.title }]);
  const x = S.useForm({ locale: l, data: r, version: d }), h = x.errors, u = (f) => {
    const g = Me(h, f);
    g.length > 0 && x.clearErrors(...g);
  }, y = c[0], w = n.useEditLock({
    type: "cms.global",
    id: s.id,
    locale: l,
    enabled: p.update,
    noun: t("global set"),
    leaveTo: z("cms/globals"),
    getUnsaved: () => x.isDirty ? { data: x.data.data } : null
  }), N = p.update && !w.readOnly, j = () => x.processing || x.put(o, { preserveScroll: !0 }), C = () => {
    x.transform((f) => ({ ...f, version: null })), x.put(o, { preserveScroll: !0 });
  }, $ = async (f) => {
    const g = await w.loadKept(f);
    g.data && typeof g.data == "object" && x.setData("data", g.data);
  };
  return n.useUnsavedChanges(x.isDirty && !w.takenOver, N ? j : void 0), /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (f) => {
    f.preventDefault(), j();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: s.title }),
    w.dialogs,
    /* @__PURE__ */ e.jsx(
      n.PageHeader,
      {
        title: s.title,
        back: { href: z("cms/globals"), label: t("Back to globals") },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          m && /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(S.Link, { href: m, children: [
            /* @__PURE__ */ e.jsx(Xe, {}),
            " ",
            t("Settings")
          ] }) }),
          c.length > 1 && /* @__PURE__ */ e.jsxs(n.Select, { value: l, onValueChange: (f) => S.router.get(o, { locale: f }), children: [
            /* @__PURE__ */ e.jsx(n.SelectTrigger, { className: "cms:w-48", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(n.SelectContent, { children: c.map((f, g) => /* @__PURE__ */ e.jsxs(n.SelectItem, { value: f, children: [
              P(f),
              g === 0 ? ` ${t("(main)")}` : ""
            ] }, f)) })
          ] }),
          N && /* @__PURE__ */ e.jsxs(n.Button, { type: "submit", disabled: x.processing, children: [
            x.processing && /* @__PURE__ */ e.jsx(ce, { className: "cms:animate-spin" }),
            " ",
            t("Save")
          ] })
        ] }),
        children: x.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
      }
    ),
    a.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("This global set has no fields: choose a blueprint for it in its Settings.") }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(n.ViewingNotice, { by: w.viewingBy, onTakeOver: w.requestTakeOver }),
      y && l !== y && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:bg-muted/40 cms:p-3 cms:text-sm cms:text-muted-foreground", role: "note", children: d === null ? t("Not saved in :language yet: these are the :main values, which the site shows meanwhile. Translate them, then save.", { language: P(l), main: P(y) }) : t("A field left empty shows the :main value on the site.", { main: P(y) }) }),
      /* @__PURE__ */ e.jsx(rs, { message: h.version, processing: x.processing, onSaveMine: C }),
      /* @__PURE__ */ e.jsx(n.KeptEditsNotice, { kept: w.kept, disabled: !N, onLoad: (f) => {
        $(f);
      }, onDiscard: (f) => {
        w.discardKept(f);
      } }),
      /* @__PURE__ */ e.jsx(
        ns,
        {
          disabled: !N,
          fields: a,
          values: x.data.data,
          errors: h,
          storageKey: `cms:global:${s.handle}`,
          shared: i,
          sharedValues: r,
          sharedNote: y ? t("Shared by all languages: the greyed-out fields are edited in :language.", { language: P(y) }) : t("Shared by all languages: the greyed-out fields are edited in the main language."),
          onChange: (f, g) => {
            x.setData("data", { ...x.data.data, [f]: g }), u(`data.${f}`);
          }
        }
      )
    ] })
  ] });
}
let ja = 0;
function ba(s, a = 0) {
  return s.flatMap(({ children: l, ...c }) => [{ ...c, key: `m${++ja}`, depth: a }, ...ba(l ?? [], a + 1)]);
}
function _l(s) {
  const a = [], l = [{ depth: -1, children: a }];
  for (const { key: c, depth: i, ...r } of s) {
    for (; l.length > 1 && l[l.length - 1].depth >= i; ) l.pop();
    const d = { ...r, children: [] };
    l[l.length - 1].children.push(d), l.push({ depth: i, children: d.children });
  }
  return a;
}
function ve(s, a) {
  const l = s[a]?.depth ?? 0;
  let c = a + 1;
  for (; c < s.length && s[c].depth > l; ) c++;
  return c;
}
function va(s, a, l) {
  const c = ve(s, a);
  return s.map((i, r) => r >= a && r < c ? { ...i, depth: i.depth + l } : i);
}
function Tl(s, a, l) {
  const c = s[a], i = s[a - 1];
  return !c || !i || c.depth > i.depth || Math.max(...s.slice(a, ve(s, a)).map((d) => d.depth)) + 1 > l - 1 ? s : va(s, a, 1);
}
function zl(s, a) {
  const l = s[a];
  if (!l || l.depth === 0) return s;
  let c = a - 1;
  for (; c > 0 && s[c].depth >= l.depth; ) c--;
  const i = ve(s, a), r = ve(s, c), d = va(s, a, -1).slice(a, i);
  return [...s.slice(0, a), ...s.slice(i, r), ...d, ...s.slice(r)];
}
function Ml(s, a) {
  return [...s.slice(0, a), ...s.slice(ve(s, a))];
}
function $e(s) {
  return { key: `m${++ja}`, depth: 0, entry_id: null, term_id: null, collection_id: null, target: null, url: null, labels: {}, new_tab: !1, query: null, ...s };
}
function Bl(s) {
  return s.url !== null || s.collection_id !== null && (s.query ?? "").trim() !== "" ? "main" : "title";
}
function Ll({ menu: s, items: a, locales: l, limits: c, terms: i, listings: r, can: d, settings: p }) {
  const m = z(`cms/menus/${s.handle}/links`);
  n.useBreadcrumbs([{ label: t("Menus"), href: z("cms/menus") }, { label: s.title }]);
  const [o, x] = D.useState(() => ba(a)), [h, u] = D.useState(null), y = S.useForm({ items: a }), w = y.errors, [N, j] = D.useState(!1), C = l[0] ?? "en", $ = (E) => {
    x(E), j(!0);
  }, f = (E, I) => $(o.map((_, H) => H === E ? { ..._, ...I } : _)), g = () => {
    y.processing || (y.transform(() => ({ items: _l(o).map(ya) })), y.put(m, { preserveScroll: !0, onSuccess: () => j(!1) }));
  }, b = (E) => {
    E.preventDefault(), g();
  };
  n.useUnsavedChanges(N, d.update ? g : void 0);
  const B = (E) => /* @__PURE__ */ e.jsx(
    n.SortableList,
    {
      items: le(o, E),
      getId: (I) => o[I].key,
      getLabel: (I) => o[I].labels[C] || o[I].target?.title || o[I].url || "link",
      disabled: !d.update,
      onReorder: (I) => $(cs(o, E, I)),
      className: E < 0 ? "cms:gap-1" : "cms:mt-1 cms:gap-1 cms:pl-6",
      children: (I, { handle: _, isOverlay: H }) => {
        const v = o[I];
        return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${H ? "" : "cms:border-border/70"}`, children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2 cms:p-2", children: [
            d.update && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:h-10 cms:shrink-0 cms:items-center", children: /* @__PURE__ */ e.jsx(n.SortableHandle, { ..._, label: t("Move :title", { title: v.labels[C] || v.target?.title || v.url || t("link") }) }) }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
                /* @__PURE__ */ e.jsx(
                  n.Input,
                  {
                    "aria-label": t("Label (:language)", { language: P(C) }),
                    className: "cms:w-full cms:sm:max-w-xs",
                    disabled: !d.update,
                    placeholder: v.target?.title ?? t("Label"),
                    value: v.labels[C] ?? "",
                    onChange: (A) => f(I, { labels: { ...v.labels, [C]: A.target.value } })
                  }
                ),
                /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-32 cms:flex-1 cms:truncate cms:text-sm cms:text-muted-foreground", children: v.url !== null ? v.url : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  v.target ? `${v.target.kind}: ${v.target.title}` : t("Gone"),
                  " ",
                  (!v.target || !v.target.live) && /* @__PURE__ */ e.jsx(n.Badge, { variant: "outline", children: t("Not on the site") })
                ] }) }),
                d.update && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center", children: [
                  /* @__PURE__ */ e.jsxs("label", { className: "cms:mr-2 cms:flex cms:items-center cms:gap-1.5 cms:text-sm", children: [
                    /* @__PURE__ */ e.jsx(n.Checkbox, { checked: v.new_tab, onCheckedChange: (A) => f(I, { new_tab: A }) }),
                    " ",
                    t("New tab")
                  ] }),
                  /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": t("Out a level"), disabled: v.depth === 0, onClick: () => $(zl(o, I)), children: /* @__PURE__ */ e.jsx(en, {}) }),
                  /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": t("In a level"), onClick: () => $(Tl(o, I, c.depth)), children: /* @__PURE__ */ e.jsx(sn, {}) }),
                  /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": t("Remove, with what's under it"), onClick: () => $(Ml(o, I)), children: /* @__PURE__ */ e.jsx(W, {}) })
                ] })
              ] }),
              v.collection_id !== null && /* @__PURE__ */ e.jsx(
                n.Input,
                {
                  "aria-label": t("Filters"),
                  className: "cms:w-full cms:sm:max-w-md cms:font-mono",
                  disabled: !d.update,
                  placeholder: t("Filters (optional): :example", { example: "filter=value" }),
                  value: v.query ?? "",
                  onChange: (A) => f(I, { query: A.target.value })
                }
              ),
              l.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: l.slice(1).map((A) => /* @__PURE__ */ e.jsx(
                n.Input,
                {
                  "aria-label": t("Label (:language)", { language: P(A) }),
                  className: "cms:w-full cms:sm:max-w-xs",
                  disabled: !d.update,
                  placeholder: Bl(v) === "title" ? t(":language: its title there, else as :main", { language: P(A), main: P(C) }) : t(":language: as :main", { language: P(A), main: P(C) }),
                  value: v.labels[A] ?? "",
                  onChange: (V) => f(I, { labels: { ...v.labels, [A]: V.target.value } })
                },
                A
              )) })
            ] })
          ] }),
          !H && le(o, I).length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:px-2 cms:pb-2", children: B(I) })
        ] });
      }
    }
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: b, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: s.title }),
    /* @__PURE__ */ e.jsx(
      n.PageHeader,
      {
        title: s.title,
        back: { href: z("cms/menus"), label: t("Back to menus") },
        actions: d.update && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          p && /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(S.Link, { href: p, children: [
            /* @__PURE__ */ e.jsx(Xe, {}),
            " ",
            t("Settings")
          ] }) }),
          /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", disabled: o.length >= c.items, onClick: () => u("entry"), children: [
            /* @__PURE__ */ e.jsx(Y, {}),
            " ",
            t("Entry")
          ] }),
          i.length > 0 && /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", disabled: o.length >= c.items, onClick: () => u("term"), children: [
            /* @__PURE__ */ e.jsx(dn, {}),
            " ",
            t("Term")
          ] }),
          r.length > 0 && /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", disabled: o.length >= c.items, onClick: () => u("listing"), children: [
            /* @__PURE__ */ e.jsx(jt, {}),
            " ",
            t("Listing")
          ] }),
          /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", disabled: o.length >= c.items, onClick: () => u("url"), children: [
            /* @__PURE__ */ e.jsx(xt, {}),
            " ",
            t("Link")
          ] }),
          /* @__PURE__ */ e.jsxs(n.Button, { type: "submit", disabled: y.processing, children: [
            y.processing && /* @__PURE__ */ e.jsx(ce, { className: "cms:animate-spin" }),
            " ",
            t("Save")
          ] })
        ] }),
        children: N && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
      }
    ),
    /* @__PURE__ */ e.jsx(F, { message: w.items }),
    Object.keys(w).some((E) => E.startsWith("items.")) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: t("Some links need fixing: :error", { error: Object.values(w).filter(Boolean)[0] }) }),
    /* @__PURE__ */ e.jsx(n.Card, { className: "cms:p-2", children: o.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:p-4 cms:text-center cms:text-muted-foreground", children: t("No links yet. Add an entry or a link.") }) : B(-1) }),
    /* @__PURE__ */ e.jsx(Fl, { kind: h, terms: i, listings: r, onClose: () => u(null), onAdd: (E) => {
      $([...o, E]), u(null);
    }, main: C })
  ] });
}
function ya({ target: s, children: a, ...l }) {
  return { ...l, children: a.map(ya) };
}
const Il = () => t("A menu links to entries that already exist: create the page first (Content → Entries), then add it here, or add a web address instead."), Al = () => ({ entry: t("Link to an entry"), term: t("Link to a term's page"), listing: t("Link to a listing page"), url: t("Link to an address") }), El = () => ({
  entry: t("It follows the entry: its title (unless you give a label) and its address in each language. It shows only while the entry is on the site."),
  term: t("The page listing the term's entries, in each language. Its title is the label unless you give one."),
  listing: t("The collection's listing page, in each language, optionally with filters. The collection's title is the label unless you give one."),
  url: t("A web address, a path on this site (/contact), mailto: or tel:.")
});
function Fl({ kind: s, terms: a, listings: l, onClose: c, onAdd: i, main: r }) {
  const [d, p] = D.useState(null), [m, o] = D.useState(""), [x, h] = D.useState(""), [u, y] = D.useState(""), [w, N] = D.useState("");
  D.useEffect(() => {
    p(null), o(""), h(""), y(""), N("");
  }, [s]);
  const j = x.trim() === "" || yn(x.trim()), C = u.trim() ? { [r]: u.trim() } : {}, $ = async () => {
    if (s === "entry" && d !== null) {
      const g = await fetch(`${z("cms/entries/picker")}?${Wt({ ids: [d], collections: [] })}`, { headers: { Accept: "application/json" }, credentials: "same-origin" }), b = g.ok ? (await g.json()).items[0] : void 0;
      i($e({ entry_id: d, target: b ? { title: b.title, kind: b.collection, live: b.status === "published" } : null, labels: C }));
    } else if (s === "term" && m !== "") {
      const g = a.find((b) => String(b.id) === m);
      i($e({ term_id: Number(m), target: g ? { title: g.title, kind: g.taxonomy, live: !0 } : null, labels: C }));
    } else if (s === "listing" && m !== "") {
      const g = l.find((b) => String(b.id) === m);
      i($e({ collection_id: Number(m), target: g ? { title: g.title, kind: t("Listing page"), live: !0 } : null, labels: C, query: w.trim().replace(/^\?/, "") || null }));
    } else s === "url" && x.trim() !== "" && j && u.trim() !== "" && i($e({ url: x.trim(), labels: C }));
  }, f = s === "entry" ? d !== null : s === "url" ? x.trim() !== "" && j && u.trim() !== "" : m !== "";
  return /* @__PURE__ */ e.jsx(n.Dialog, { open: s !== null, onOpenChange: (g) => !g && c(), children: /* @__PURE__ */ e.jsxs(n.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(n.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(n.DialogTitle, { children: s ? Al()[s] : "" }),
      /* @__PURE__ */ e.jsx(n.DialogDescription, { children: s ? El()[s] : "" })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
      s === "entry" && /* @__PURE__ */ e.jsx(
        we,
        {
          id: "menu-entry",
          value: d,
          multiple: !1,
          max: null,
          collections: [],
          invalid: !1,
          emptyHint: Il(),
          onChange: (g) => p(typeof g == "number" ? g : null)
        }
      ),
      (s === "term" || s === "listing") && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "menu-target", children: t(s === "term" ? "Term" : "Collection") }),
        /* @__PURE__ */ e.jsxs(n.Select, { value: m, onValueChange: o, children: [
          /* @__PURE__ */ e.jsx(n.SelectTrigger, { id: "menu-target", children: /* @__PURE__ */ e.jsx(n.SelectValue, { placeholder: t("Choose…") }) }),
          /* @__PURE__ */ e.jsx(n.SelectContent, { children: s === "term" ? a.map((g) => /* @__PURE__ */ e.jsxs(n.SelectItem, { value: String(g.id), children: [
            g.taxonomy,
            ": ",
            g.title
          ] }, g.id)) : l.map((g) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: String(g.id), children: g.title }, g.id)) })
        ] })
      ] }),
      s === "listing" && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "menu-query", children: t("Filters (optional)") }),
        /* @__PURE__ */ e.jsx(
          n.Input,
          {
            id: "menu-query",
            className: "cms:font-mono",
            value: w,
            placeholder: "filter=value&other=value",
            onChange: (g) => N(g.target.value)
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("What the listing page's filters put after the ? in its address. Each language's link gets them, and a term may be named by its slug in any language.") })
      ] }),
      s === "url" && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "menu-url", children: t("Address") }),
        /* @__PURE__ */ e.jsx(
          n.Input,
          {
            id: "menu-url",
            value: x,
            placeholder: t("https://… or /contact"),
            "aria-invalid": !j,
            onChange: (g) => h(g.target.value)
          }
        ),
        !j && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t("This address could run code; use https://, a path, mailto: or tel:.") })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "menu-label", children: t(s === "url" ? "Label" : "Label (optional)") }),
        /* @__PURE__ */ e.jsx(n.Input, { id: "menu-label", value: u, onChange: (g) => y(g.target.value) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(n.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "outline", onClick: c, children: t("Cancel") }),
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", onClick: () => {
        $();
      }, disabled: !f, children: t("Add") })
    ] })
  ] }) });
}
const Hl = () => [
  { value: "all", label: t("All") },
  { value: "pending", label: t("Pending") },
  { value: "approved", label: t("Approved") },
  { value: "spam", label: t("Spam") },
  { value: "trashed", label: t("Trash") }
], Pl = (s) => ({ pending: t("Pending"), approved: t("Approved"), spam: t("Spam") })[s];
function Ol({ tab: s, counts: a, filters: l, collections: c, comments: i, can: r, errors: d = {} }) {
  n.useBreadcrumbs([{ label: t("Comments"), href: z("cms/comments") }]);
  const [p, m] = D.useState(l.search), [o, x] = D.useState([]), [h, u] = D.useState(null), [y, w] = re(), N = (g) => {
    const b = { status: s, search: l.search, collection: l.collection, ...g };
    S.router.get(z("cms/comments"), {
      ...b.status !== "all" ? { status: b.status } : {},
      ...b.search ? { search: b.search } : {},
      ...b.collection ? { collection: b.collection } : {},
      ...l.entry ? { entry: l.entry } : {}
    }, { preserveState: !0, replace: !0, onSuccess: () => x([]) });
  };
  D.useEffect(() => {
    if (p === l.search) return;
    const g = window.setTimeout(() => N({ search: p }), 300);
    return () => window.clearTimeout(g);
  }, [p]);
  const j = (g, b = {}) => S.router.post(z(g), b, { preserveScroll: !0, onSuccess: () => x([]) }), C = (g, b) => j(`cms/comments/${g.id}/status`, { status: b }), $ = (g) => {
    const b = () => j("cms/comments/bulk", { action: g, ids: o });
    g === "delete" ? y(o.length === 1 ? t("Delete 1 comment for good? This can't be undone.") : t("Delete :count comments for good? This can't be undone.", { count: o.length }), b) : b();
  }, f = i.data.length > 0 && o.length === i.data.length;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: t("Comments") }),
    /* @__PURE__ */ e.jsx(
      n.PageHeader,
      {
        title: t("Comments"),
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:sm:w-64", children: [
            /* @__PURE__ */ e.jsx(Ne, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
            /* @__PURE__ */ e.jsx(
              n.Input,
              {
                type: "search",
                placeholder: t("Search text, name or email"),
                "aria-label": t("Search comments"),
                className: "cms:pl-9",
                value: p,
                onChange: (g) => m(g.target.value)
              }
            )
          ] }),
          c.length > 1 && /* @__PURE__ */ e.jsxs(n.Select, { value: l.collection ?? "all", onValueChange: (g) => N({ collection: g === "all" ? null : g }), children: [
            /* @__PURE__ */ e.jsx(n.SelectTrigger, { className: "cms:w-48", "aria-label": t("Collection"), children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(n.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(n.SelectItem, { value: "all", children: t("Every collection") }),
              c.map((g) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: g.handle, children: g.title }, g.handle))
            ] })
          ] })
        ] })
      }
    ),
    l.entry !== null && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      t("Comments on one entry."),
      " ",
      /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:underline cms:underline-offset-4", onClick: () => S.router.get(z("cms/comments")), children: t("Show all") })
    ] }),
    /* @__PURE__ */ e.jsx(n.Tabs, { value: s, onValueChange: (g) => N({ status: g }), children: /* @__PURE__ */ e.jsx(n.TabsList, { className: "cms:h-auto cms:flex-wrap cms:justify-start", children: Hl().map((g) => /* @__PURE__ */ e.jsxs(n.TabsTrigger, { value: g.value, children: [
      g.label,
      " ",
      /* @__PURE__ */ e.jsx("span", { className: "cms:ml-1 cms:text-muted-foreground", children: a[g.value] })
    ] }, g.value)) }) }),
    o.length > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2 cms:text-sm", role: "toolbar", "aria-label": t("With the selected comments"), children: [
      /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", children: t(":count selected", { count: o.length }) }),
      r.moderate && s !== "trashed" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "outline", onClick: () => $("approve"), children: [
          /* @__PURE__ */ e.jsx(je, {}),
          " ",
          t("Approve")
        ] }),
        /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "outline", onClick: () => $("unapprove"), children: [
          /* @__PURE__ */ e.jsx(_e, {}),
          " ",
          t("Unapprove")
        ] }),
        /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "outline", onClick: () => $("spam"), children: [
          /* @__PURE__ */ e.jsx(Ye, {}),
          " ",
          t("Spam")
        ] })
      ] }),
      r.delete && s !== "trashed" && /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "outline", onClick: () => $("trash"), children: [
        /* @__PURE__ */ e.jsx(W, {}),
        " ",
        t("Trash")
      ] }),
      r.delete && s === "trashed" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "outline", onClick: () => $("restore"), children: [
          /* @__PURE__ */ e.jsx(be, {}),
          " ",
          t("Restore")
        ] }),
        /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "destructive", onClick: () => $("delete"), children: [
          /* @__PURE__ */ e.jsx(W, {}),
          " ",
          t("Delete for good")
        ] })
      ] })
    ] }),
    i.data.length === 0 ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:rounded-xl cms:border cms:border-dashed cms:px-6 cms:py-16 cms:text-center", children: [
      /* @__PURE__ */ e.jsx("span", { className: "cms:grid cms:size-10 cms:place-items-center cms:rounded-full cms:bg-muted cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx(tn, { className: "cms:size-4" }) }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: l.search ? t("No comments match.") : t("No comments here.") })
    ] }) : /* @__PURE__ */ e.jsxs(n.Card, { className: "cms:divide-y cms:p-0", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3 cms:px-4 cms:py-2 cms:text-sm cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsx(n.Checkbox, { checked: f, "aria-label": t("Select all"), onCheckedChange: (g) => x(g ? i.data.map((b) => b.id) : []) }),
        /* @__PURE__ */ e.jsx("span", { children: t(":from–:to of :total", { from: i.from, to: i.to, total: i.total }) })
      ] }),
      i.data.map((g) => /* @__PURE__ */ e.jsxs("article", { className: "cms:flex cms:gap-3 cms:px-4 cms:py-4", "aria-labelledby": `comment-${g.id}-author`, children: [
        /* @__PURE__ */ e.jsx(
          n.Checkbox,
          {
            checked: o.includes(g.id),
            "aria-label": t("Select :author's comment", { author: g.author }),
            onCheckedChange: (b) => x(b ? [...o, g.id] : o.filter((B) => B !== g.id))
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-x-3 cms:gap-y-1 cms:text-sm", children: [
            /* @__PURE__ */ e.jsx("span", { id: `comment-${g.id}-author`, className: "cms:font-medium", children: g.author }),
            g.email && /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", children: g.email }),
            g.member && /* @__PURE__ */ e.jsx(n.Badge, { variant: "outline", children: t("Signed in") }),
            !g.trashed && /* @__PURE__ */ e.jsx(n.Badge, { variant: g.status === "approved" ? "success" : g.status === "spam" ? "destructive" : "warning", children: Pl(g.status) }),
            /* @__PURE__ */ e.jsxs("span", { className: "cms:text-muted-foreground", children: [
              g.createdAt ? K(g.createdAt) : "",
              " · ",
              g.locale.toUpperCase()
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
            t("On"),
            " ",
            g.entry.url ? /* @__PURE__ */ e.jsxs("a", { href: g.entry.url, target: "_blank", rel: "noreferrer", className: "cms:underline-offset-4 hover:cms:underline", children: [
              g.entry.title,
              " ",
              /* @__PURE__ */ e.jsx(ge, { className: "cms:inline cms:size-3" })
            ] }) : g.entry.title,
            g.parent && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              " · ",
              t("replying to :author: “:excerpt”", { author: g.parent.author, excerpt: g.parent.excerpt })
            ] })
          ] }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:whitespace-pre-wrap cms:break-words", children: g.body }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-1", children: [
            r.moderate && !g.trashed && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              g.status !== "approved" && /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "ghost", onClick: () => C(g, "approved"), children: [
                /* @__PURE__ */ e.jsx(je, {}),
                " ",
                t("Approve")
              ] }),
              g.status === "approved" && /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "ghost", onClick: () => C(g, "pending"), children: [
                /* @__PURE__ */ e.jsx(_e, {}),
                " ",
                t("Unapprove")
              ] }),
              g.status !== "spam" && /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "ghost", onClick: () => C(g, "spam"), children: [
                /* @__PURE__ */ e.jsx(Ye, {}),
                " ",
                t("Spam")
              ] }),
              g.status !== "spam" && /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "ghost", onClick: () => u({ row: g, mode: "reply" }), children: [
                /* @__PURE__ */ e.jsx(yt, {}),
                " ",
                t("Reply")
              ] }),
              /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "ghost", onClick: () => u({ row: g, mode: "edit" }), children: [
                /* @__PURE__ */ e.jsx(Ct, {}),
                " ",
                t("Edit")
              ] })
            ] }),
            r.delete && !g.trashed && /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "ghost", onClick: () => S.router.delete(z(`cms/comments/${g.id}`), { preserveScroll: !0 }), children: [
              /* @__PURE__ */ e.jsx(W, {}),
              " ",
              t("Trash")
            ] }),
            r.delete && g.trashed && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "ghost", onClick: () => j(`cms/comments/${g.id}/restore`), children: [
                /* @__PURE__ */ e.jsx(be, {}),
                " ",
                t("Restore")
              ] }),
              /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "ghost", onClick: () => y(
                t("Delete this comment for good? Replies to it stay."),
                () => S.router.delete(z(`cms/comments/${g.id}/force`), { preserveScroll: !0 })
              ), children: [
                /* @__PURE__ */ e.jsx(W, {}),
                " ",
                t("Delete for good")
              ] })
            ] })
          ] })
        ] })
      ] }, g.id))
    ] }),
    (i.prev_page_url || i.next_page_url) && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:justify-end cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(n.Button, { variant: "outline", size: "sm", disabled: !i.prev_page_url, onClick: () => i.prev_page_url && S.router.get(i.prev_page_url), children: [
        /* @__PURE__ */ e.jsx(Ze, {}),
        " ",
        t("Newer")
      ] }),
      /* @__PURE__ */ e.jsxs(n.Button, { variant: "outline", size: "sm", disabled: !i.next_page_url, onClick: () => i.next_page_url && S.router.get(i.next_page_url), children: [
        t("Older"),
        " ",
        /* @__PURE__ */ e.jsx(ye, {})
      ] })
    ] }),
    h && /* @__PURE__ */ e.jsx(Vl, { row: h.row, mode: h.mode, error: d.body, onClose: () => u(null) }, `${h.mode}-${h.row.id}`),
    w
  ] });
}
function Vl({ row: s, mode: a, error: l, onClose: c }) {
  const [i, r] = D.useState(a === "edit" ? s.body : ""), [d, p] = D.useState(!1), m = () => {
    p(!0);
    const o = { preserveScroll: !0, onSuccess: c, onFinish: () => p(!1) };
    a === "reply" ? S.router.post(z(`cms/comments/${s.id}/reply`), { body: i }, o) : S.router.put(z(`cms/comments/${s.id}`), { body: i }, o);
  };
  return /* @__PURE__ */ e.jsx(n.Dialog, { open: !0, onOpenChange: (o) => !o && c(), children: /* @__PURE__ */ e.jsxs(n.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(n.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(n.DialogTitle, { children: a === "reply" ? t("Reply to :author", { author: s.author }) : t("Edit :author's comment", { author: s.author }) }),
      /* @__PURE__ */ e.jsx(n.DialogDescription, { children: a === "reply" ? s.status === "pending" ? t("Your reply is published at once, and approves this comment.") : t("Your reply is published at once, under your name.") : t("Fix a typo or remove a link.") })
    ] }),
    a === "reply" && /* @__PURE__ */ e.jsx("p", { className: "cms:max-h-32 cms:overflow-auto cms:whitespace-pre-wrap cms:text-sm cms:text-muted-foreground", children: s.body }),
    /* @__PURE__ */ e.jsx(
      n.Textarea,
      {
        "aria-label": t(a === "reply" ? "Your reply" : "Comment"),
        rows: 5,
        value: i,
        "aria-invalid": l !== void 0,
        onChange: (o) => r(o.target.value)
      }
    ),
    /* @__PURE__ */ e.jsx(F, { message: l }),
    /* @__PURE__ */ e.jsxs(n.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "outline", onClick: c, children: t("Cancel") }),
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", disabled: i.trim() === "" || d, onClick: m, children: t(a === "reply" ? "Post reply" : "Save") })
    ] })
  ] }) });
}
const Rl = () => [
  { role: "title", label: t("Meta title"), automatic: t("Automatic (the title)") },
  { role: "description", label: t("Meta description"), automatic: t("Automatic (nothing)") },
  { role: "image", label: t("Share image"), automatic: t("Automatic (nothing)") }
], Ue = "__auto";
function Ul({ site: s, siteName: a, collections: l, taxonomies: c }) {
  n.useBreadcrumbs([{ label: t("Settings"), href: z("settings") }, { label: t("SEO") }]);
  const i = [...l ?? [], ...c ?? []], r = S.useForm({
    site: { ...s },
    mappings: i.map((h) => ({ kind: h.kind, id: h.id, title: h.chosen.title ?? "", description: h.chosen.description ?? "", image: h.chosen.image ?? "" }))
  }), d = r.errors, p = () => r.put(z("cms/seo"), { preserveScroll: !0, onSuccess: () => r.setDefaults() });
  n.useUnsavedChanges(r.isDirty, p);
  const m = (h, u) => r.setData("site", { ...r.data.site, [h]: u }), o = (h, u, y) => r.setData("mappings", r.data.mappings.map((w, N) => N === h ? { ...w, [u]: y } : w)), x = (h, u, y, w, N) => /* @__PURE__ */ e.jsxs(n.CollapsibleCard, { title: u, description: y, titleClassName: "cms:text-base", storageKey: `cms:seo:${h}`, contentClassName: "cms:flex cms:flex-col cms:divide-y cms:divide-border/60", children: [
    w.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("None yet.") }),
    w.map((j, C) => {
      const $ = N + C;
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3 cms:py-4 cms:first:pt-0 cms:last:pb-0", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:justify-between cms:gap-3", children: [
          /* @__PURE__ */ e.jsx("h3", { className: "cms:font-medium", children: j.title }),
          /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: j.blueprint ? t("Blueprint: :name", { name: j.blueprint }) : t("No blueprint") })
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-3 cms:sm:grid-cols-3", children: Rl().map(({ role: f, label: g, automatic: b }) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-1.5", children: [
          /* @__PURE__ */ e.jsx(n.Label, { htmlFor: `seo-${$}-${f}`, className: "cms:text-xs", children: g }),
          /* @__PURE__ */ e.jsxs(n.Select, { value: r.data.mappings[$]?.[f] || Ue, onValueChange: (B) => o($, f, B === Ue ? "" : B), children: [
            /* @__PURE__ */ e.jsx(n.SelectTrigger, { id: `seo-${$}-${f}`, className: "cms:w-full", children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(n.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(n.SelectItem, { value: Ue, children: b }),
              j.options[f].map((B) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: B.value, children: B.label }, B.value))
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(F, { message: d[`mappings.${$}.${f}`] })
        ] }, f)) })
      ] }, `${j.kind}-${j.id}`);
    })
  ] });
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (h) => {
    h.preventDefault(), p();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: t("SEO") }),
    /* @__PURE__ */ e.jsx(
      n.PageHeader,
      {
        title: t("SEO"),
        description: t("What search engines and shared links see of the site."),
        actions: /* @__PURE__ */ e.jsx(n.Button, { type: "submit", disabled: r.processing, children: t("Save SEO settings") })
      }
    ),
    /* @__PURE__ */ e.jsxs(n.CollapsibleCard, { title: t("Search engines and sharing"), titleClassName: "cms:text-base", storageKey: "cms:seo:site", contentClassName: "cms:flex cms:flex-col cms:gap-5", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(n.Switch, { id: "seo-noindex", checked: r.data.site.noindex, onCheckedChange: (h) => m("noindex", h) }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-0.5", children: [
          /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "seo-noindex", children: t("Hide the whole site from search engines") }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t("Every page asks not to be indexed and the sitemap is empty. For a site still being built, or staging.") })
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-start cms:justify-between cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-3", children: [
          /* @__PURE__ */ e.jsx(n.Switch, { id: "seo-append", checked: r.data.site.appendName, onCheckedChange: (h) => m("appendName", h) }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-0.5", children: [
            /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "seo-append", children: t("Add the site name to page titles") }),
            /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t('The browser tab and search results show ":example". Share previews keep the bare title.', { example: `${t("About")} ${r.data.site.separator || "|"} ${a}` }) })
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
          /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "seo-separator", className: "cms:text-xs", children: t("Separator") }),
          /* @__PURE__ */ e.jsx(
            n.Input,
            {
              id: "seo-separator",
              className: "cms:w-20",
              maxLength: 5,
              disabled: !r.data.site.appendName,
              value: r.data.site.separator,
              onChange: (h) => m("separator", h.target.value)
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:max-w-xs cms:flex-col cms:gap-1.5", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "seo-twitter", children: t("X (Twitter) account") }),
        /* @__PURE__ */ e.jsx(
          n.Input,
          {
            id: "seo-twitter",
            placeholder: "@acme",
            maxLength: 16,
            value: r.data.site.twitter,
            onChange: (h) => m("twitter", h.target.value)
          }
        ),
        /* @__PURE__ */ e.jsx(F, { message: d["site.twitter"] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "seo-image", children: t("Default share image") }),
        /* @__PURE__ */ e.jsx(
          n.MediaPickerInput,
          {
            id: "seo-image",
            invalid: d["site.image"] !== void 0,
            disabled: !1,
            multiple: !1,
            max: null,
            types: ["image"],
            value: r.data.site.image,
            onChange: (h) => m("image", typeof h == "number" ? h : null)
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t("Shown when a page is shared and has no image of its own.") }),
        /* @__PURE__ */ e.jsx(F, { message: d["site.image"] })
      ] })
    ] }),
    i.length > 0 && /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx("h2", { className: "cms:text-base cms:font-medium", children: t("Fields used for SEO") }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("When an entry or term leaves its meta title, description or share image empty, the site uses one of its fields instead. A page's own SEO fields always win; after the field come the site's (the description in Settings → Site, the share image above).") })
    ] }),
    l !== null && x("Collections", t("Collections"), t("Entries of each collection."), l, 0),
    c !== null && x("Taxonomies", t("Taxonomies"), t("Term pages of each taxonomy."), c, l?.length ?? 0),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t("Meta title: a text field. Meta description: a text or textarea field, cut to 300 characters. Share image: the first image of a media field.") })
  ] });
}
const ql = 3;
function Kl({ form: s, forms: a, submissions: l, can: c, createForm: i = null }) {
  n.useBreadcrumbs([{ label: t("Submissions"), href: z("cms/submissions") }, ...s ? [{ label: s.title }] : []]);
  const [r, d] = D.useState(null), [p, m] = re();
  if (!s || !l)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(S.Head, { title: t("Submissions") }),
      /* @__PURE__ */ e.jsx(n.PageHeader, { title: t("Submissions"), description: t("What visitors send through the site's forms.") }),
      /* @__PURE__ */ e.jsxs(n.Card, { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:px-6 cms:py-14 cms:text-center", children: [
        /* @__PURE__ */ e.jsx(Za, { className: "cms:size-8 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
          /* @__PURE__ */ e.jsx("p", { className: "cms:font-medium", children: t("No forms yet") }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:max-w-sm cms:text-sm cms:text-muted-foreground", children: t(i ? "Create a form, put it on a page, and what visitors send shows up here." : "Once someone creates a form and puts it on a page, what visitors send shows up here.") })
        ] }),
        i && /* @__PURE__ */ e.jsx(n.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(S.Link, { href: i, children: [
          /* @__PURE__ */ e.jsx(Y, {}),
          " ",
          t("Create a form")
        ] }) })
      ] })
    ] });
  const o = (l.data[0]?.rows ?? []).slice(0, ql), x = (h) => p(
    t("Delete this submission for good? It can't be restored."),
    () => S.router.delete(z(`cms/submissions/${h.id}`), { preserveScroll: !0, onSuccess: () => d(null) })
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: t(":form submissions", { form: s.title }) }),
    /* @__PURE__ */ e.jsx(
      n.PageHeader,
      {
        title: s.title,
        actions: l.total > 0 && c.export && /* @__PURE__ */ e.jsx(n.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: z(`cms/forms/${s.handle}/submissions/export`), children: [
          /* @__PURE__ */ e.jsx(et, {}),
          " ",
          t("Export CSV")
        ] }) }),
        children: a.length > 1 && /* @__PURE__ */ e.jsxs(n.Select, { value: s.handle, onValueChange: (h) => S.router.get(z(`cms/forms/${h}/submissions`)), children: [
          /* @__PURE__ */ e.jsx(n.SelectTrigger, { className: "cms:w-56", "aria-label": t("Form"), children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(n.SelectContent, { children: a.map((h) => /* @__PURE__ */ e.jsxs(n.SelectItem, { value: h.handle, children: [
            h.title,
            " (",
            h.count,
            ")"
          ] }, h.handle)) })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(n.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(n.Table, { children: [
      /* @__PURE__ */ e.jsx(n.TableHeader, { children: /* @__PURE__ */ e.jsxs(n.TableRow, { children: [
        /* @__PURE__ */ e.jsx(n.TableHead, { children: t("Sent") }),
        o.map((h) => /* @__PURE__ */ e.jsx(n.TableHead, { children: h.label }, h.handle))
      ] }) }),
      /* @__PURE__ */ e.jsxs(n.TableBody, { children: [
        l.data.length === 0 && /* @__PURE__ */ e.jsx(n.TableRow, { children: /* @__PURE__ */ e.jsx(n.TableCell, { colSpan: o.length + 1, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: t("Nothing sent yet.") }) }),
        l.data.map((h) => /* @__PURE__ */ e.jsxs(n.TableRow, { children: [
          /* @__PURE__ */ e.jsx(n.TableCell, { className: "cms:whitespace-nowrap", children: /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:font-medium cms:hover:underline", onClick: () => d(h), children: K(h.createdAt) }) }),
          o.map((u) => /* @__PURE__ */ e.jsx(n.TableCell, { className: "cms:max-w-64 cms:truncate", children: h.rows.find((y) => y.handle === u.handle)?.value }, u.handle))
        ] }, h.id))
      ] })
    ] }) }),
    l.total > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:text-sm cms:text-muted-foreground", children: [
      /* @__PURE__ */ e.jsx("span", { children: t(":from–:to of :total", { from: l.from, to: l.to, total: l.total }) }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(
          n.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": t("Previous page"),
            disabled: !l.prev_page_url,
            onClick: () => l.prev_page_url && S.router.get(l.prev_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(Ze, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          n.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": t("Next page"),
            disabled: !l.next_page_url,
            onClick: () => l.next_page_url && S.router.get(l.next_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(ye, {})
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(n.Dialog, { open: r !== null, onOpenChange: (h) => !h && d(null), children: /* @__PURE__ */ e.jsxs(n.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto", children: [
      /* @__PURE__ */ e.jsxs(n.DialogHeader, { children: [
        /* @__PURE__ */ e.jsx(n.DialogTitle, { children: s.title }),
        /* @__PURE__ */ e.jsxs(n.DialogDescription, { children: [
          t("Sent :date", { date: K(r?.createdAt ?? null) }),
          " · ",
          r?.locale.toUpperCase()
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-3 cms:text-sm", children: r?.rows.map((h) => /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: h.label }),
        /* @__PURE__ */ e.jsx("dd", { className: "cms:whitespace-pre-wrap cms:break-words cms:text-muted-foreground", children: h.files && h.files.length > 0 ? /* @__PURE__ */ e.jsx("ul", { className: "cms:flex cms:flex-col cms:gap-1", children: h.files.map((u) => /* @__PURE__ */ e.jsx("li", { children: /* @__PURE__ */ e.jsx("a", { href: u.url, className: "cms:underline cms:underline-offset-4 hover:cms:text-foreground", download: !0, children: u.name }) }, u.url)) }) : h.file ? /* @__PURE__ */ e.jsx("a", { href: h.file, className: "cms:underline cms:underline-offset-4 hover:cms:text-foreground", download: !0, children: h.value }) : h.value || "—" })
      ] }, h.handle)) }),
      r && (r.visitor.ip || r.visitor.userAgent || r.visitor.referrer) && /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-3 cms:border-t cms:pt-3 cms:text-sm", children: [[t("IP address"), r.visitor.ip], [t("Browser"), r.visitor.userAgent], [t("Sent from"), r.visitor.referrer]].map(([h, u]) => u && /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: h }),
        /* @__PURE__ */ e.jsx("dd", { className: "cms:break-all cms:text-muted-foreground", children: u })
      ] }, h)) }),
      c.delete && r && /* @__PURE__ */ e.jsx(n.DialogFooter, { children: /* @__PURE__ */ e.jsxs(n.Button, { variant: "destructive", onClick: () => x(r), children: [
        /* @__PURE__ */ e.jsx(W, {}),
        " ",
        t("Delete")
      ] }) })
    ] }) }),
    m
  ] });
}
const qe = "__top";
function Wl(s) {
  return /* @__PURE__ */ e.jsx(Gl, { ...s }, `${s.term?.id ?? "new"}:${s.locale}:${s.version}:${JSON.stringify([s.values, s.seo, s.term?.template, s.parentId])}`);
}
function Gl({ taxonomy: s, term: a, parentId: l = null, terms: c = [], translated: i, fields: r, locale: d, locales: p, shared: m, sharedValues: o, values: x, seo: h, version: u, usedBy: y = [], redirectsUrl: w = null, templates: N = null }) {
  const j = z(`cms/taxonomies/${s.handle}/terms`), C = a ? z(`cms/terms/${a.id}/content`) : j, $ = a ? a.title : t("New term");
  n.useBreadcrumbs([{ label: s.title, href: `${j}?locale=${d}` }, { label: $ }]);
  const f = S.useForm({
    locale: d,
    title: a?.ownTitle ?? "",
    slug: a?.slug ?? "",
    parent_id: l,
    data: x,
    seo: h ?? {},
    template: a?.template ?? "",
    version: u
  }), g = f.errors, b = (v) => {
    const A = Me(g, v);
    A.length > 0 && f.clearErrors(...A);
  }, B = () => f.processing || (a ? f.put(C, { preserveScroll: !0 }) : f.post(C)), E = () => {
    f.transform((v) => ({ ...v, version: null })), f.put(C, { preserveScroll: !0 });
  }, I = n.useEditLock({
    type: "cms.term",
    id: a?.id,
    locale: d,
    enabled: a !== null && i,
    noun: t("term"),
    leaveTo: `${j}?locale=${d}`,
    getUnsaved: () => f.isDirty ? { data: f.data.data, seo: f.data.seo, template: f.data.template } : null
  }), _ = !I.readOnly, H = async (v) => {
    const A = await I.loadKept(v);
    f.setData((V) => ({
      ...V,
      data: A.data && typeof A.data == "object" ? A.data : V.data,
      seo: A.seo && typeof A.seo == "object" ? A.seo : V.seo,
      template: typeof A.template == "string" ? A.template : V.template
    }));
  };
  return n.useUnsavedChanges(f.isDirty && !I.takenOver, _ ? B : void 0), /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (v) => {
    v.preventDefault(), B();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: a ? a.title : t("New term · :taxonomy", { taxonomy: s.title }) }),
    I.dialogs,
    /* @__PURE__ */ e.jsx(
      n.PageHeader,
      {
        title: $,
        back: { href: `${j}?locale=${d}`, label: t("Back to :title", { title: s.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          a?.url && /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: a.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(ge, {}),
            " ",
            t("View page")
          ] }) }),
          _ && /* @__PURE__ */ e.jsxs(n.Button, { type: "submit", disabled: f.processing, children: [
            f.processing && /* @__PURE__ */ e.jsx(ce, { className: "cms:animate-spin" }),
            " ",
            t(a ? "Save" : "Create term")
          ] })
        ] }),
        children: f.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:items-start cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_20rem]", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(
          fa,
          {
            current: d,
            locales: p,
            translated: a ? a.translatedIn ?? null : [d],
            onSwitch: (v) => S.router.get(a ? `${j}/${a.id}/edit` : `${j}/create`, { locale: v, ...a === null && f.data.parent_id !== null ? { parent: f.data.parent_id } : {} })
          }
        ),
        /* @__PURE__ */ e.jsx(n.ViewingNotice, { by: I.viewingBy, onTakeOver: I.requestTakeOver }),
        a === null && p.length > 1 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("In :language. Translate it here afterwards: switch the language and give it a title there.", { language: P(d) }) }),
        !i && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:bg-muted/40 cms:p-3 cms:text-sm cms:text-muted-foreground", role: "note", children: t("Not in :language yet: the site shows the :main term meanwhile. Give it a title in :language and save to add it.", { language: P(d), main: P(p[0] ?? "en") }) }),
        /* @__PURE__ */ e.jsxs("fieldset", { disabled: !_, className: "cms:grid cms:min-w-0 cms:gap-4 cms:sm:grid-cols-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "term-title", children: t("Title") }),
            /* @__PURE__ */ e.jsx(
              n.Input,
              {
                id: "term-title",
                value: f.data.title,
                required: !0,
                autoFocus: a === null,
                placeholder: a?.mainTitle ?? "",
                maxLength: 255,
                "aria-invalid": g.title !== void 0,
                onChange: (v) => {
                  f.setData("title", v.target.value), b("title");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(F, { message: g.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "term-slug", children: t("Slug") }),
            /* @__PURE__ */ e.jsx(
              n.Input,
              {
                id: "term-slug",
                className: "cms:font-mono",
                value: f.data.slug,
                placeholder: t("Made from the title"),
                maxLength: 200,
                "aria-invalid": g.slug !== void 0,
                onChange: (v) => {
                  f.setData("slug", v.target.value), b("slug");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(pa, { note: zs(a?.hasPage ? a.slug : null, f.data.slug, !1), redirectsUrl: w }),
            /* @__PURE__ */ e.jsx(F, { message: g.slug })
          ] }),
          s.hierarchical && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:sm:col-span-2", children: [
            /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "term-parent", children: t("Under") }),
            /* @__PURE__ */ e.jsxs(
              n.Select,
              {
                value: f.data.parent_id === null ? qe : String(f.data.parent_id),
                onValueChange: (v) => {
                  f.setData("parent_id", v === qe ? null : Number(v)), b("parent_id");
                },
                children: [
                  /* @__PURE__ */ e.jsx(n.SelectTrigger, { id: "term-parent", className: "cms:sm:w-1/2", "aria-invalid": g.parent_id !== void 0, children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
                  /* @__PURE__ */ e.jsxs(n.SelectContent, { children: [
                    /* @__PURE__ */ e.jsx(n.SelectItem, { value: qe, children: t("Top level") }),
                    c.map((v) => /* @__PURE__ */ e.jsxs(n.SelectItem, { value: String(v.id), children: [
                      "— ".repeat(v.depth),
                      v.title
                    ] }, v.id))
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ e.jsx(F, { message: g.parent_id })
          ] })
        ] }),
        /* @__PURE__ */ e.jsx(n.KeptEditsNotice, { kept: I.kept, disabled: !_, onLoad: (v) => {
          H(v);
        }, onDiscard: (v) => {
          I.discardKept(v);
        } }),
        /* @__PURE__ */ e.jsx(rs, { message: g.version, processing: f.processing, onSaveMine: E }),
        /* @__PURE__ */ e.jsx(
          ns,
          {
            disabled: !_,
            fields: r,
            values: f.data.data,
            errors: g,
            storageKey: `cms:term:${s.handle}`,
            shared: m,
            sharedValues: o,
            sharedNote: t("Shared by all languages: the greyed-out fields are edited in :language.", { language: P(p[0] ?? "en") }),
            onChange: (v, A) => {
              f.setData("data", { ...f.data.data, [v]: A }), b(`data.${v}`);
            }
          }
        ),
        /* @__PURE__ */ e.jsx(n.CollapsibleCard, { title: t("SEO"), description: t("How this term's page appears in search results and shared links."), titleClassName: "cms:text-base", storageKey: "cms:term:seo", hasErrors: Se(g, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !_, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(xe, { bare: !0, id: "seo", fields: ls(), value: f.data.seo, errors: J(g, "seo"), onChange: (v) => {
          f.setData("seo", v), b("seo");
        } }) }) })
      ] }),
      /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(
          n.CollapsibleCard,
          {
            title: t("Page settings"),
            titleClassName: "cms:text-base",
            storageKey: "cms:term:page-settings",
            hasErrors: g.template !== void 0,
            contentClassName: "cms:flex cms:flex-col cms:gap-2",
            children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: !_, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: [
              /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "template", children: t("Template") }),
              /* @__PURE__ */ e.jsx(
                n.Input,
                {
                  id: "template",
                  className: "cms:font-mono",
                  placeholder: `cms.${s.handle}-special`,
                  value: f.data.template,
                  onChange: (v) => f.setData("template", v.target.value),
                  "aria-invalid": g.template !== void 0
                }
              ),
              /* @__PURE__ */ e.jsx(ha, { example: `cms.${s.handle}-special`, empty: t("Leave empty to use the taxonomy's template."), value: f.data.template, lookup: N }),
              /* @__PURE__ */ e.jsx(F, { message: g.template })
            ] })
          }
        ),
        a && /* @__PURE__ */ e.jsxs(n.CollapsibleCard, { title: t("Used by"), titleClassName: "cms:text-base", storageKey: "cms:term:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          y.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("No content links here through its fields.") }),
          y.map((v) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:gap-2", children: [
            v.url ? /* @__PURE__ */ e.jsx("a", { href: v.url, className: "cms:truncate cms:underline-offset-4 cms:hover:underline", children: v.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:truncate", children: v.label }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", title: v.field, children: v.fieldLabel ?? v.field })
          ] }, `${v.label}:${v.field}`))
        ] })
      ] })
    ] })
  ] });
}
function Cs(s = []) {
  if (s.length === 0) return "";
  const a = s.slice(0, 5).join("; ");
  return ` ${s.length > 5 ? t("It's used by :list and :count more.", { list: a, count: s.length - 5 }) : t("It's used by :list.", { list: a })}`;
}
function Yl({ taxonomy: s, taxonomies: a, terms: l, locales: c, locale: i, trashed: r = !1 }) {
  n.useBreadcrumbs([{ label: s ? s.title : t("Terms") }]);
  const [d, p] = re(), [m, o] = D.useState(""), [x, h] = D.useState(l);
  if (D.useEffect(() => h(l), [l]), !s)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(S.Head, { title: t("Terms") }),
      /* @__PURE__ */ e.jsx(n.PageHeader, { title: t("Terms"), description: t("There are no taxonomies yet. Create one under Structure → Taxonomies (categories, tags…), then add its terms here.") })
    ] });
  const u = z(`cms/taxonomies/${s.handle}/terms`), y = (b) => z(`cms/taxonomies/${s.handle}/terms/${b.id}/edit`) + `?locale=${encodeURIComponent(i)}`, w = (b, B) => {
    const E = B.map((I) => x[I].id);
    h(cs(x, b, B)), S.router.post(
      z("cms/terms/reorder"),
      { taxonomy: s.handle, ids: E, parent_id: b < 0 ? null : x[b].id },
      { preserveScroll: !0, preserveState: !0, onError: () => h(l) }
    );
  }, N = (b) => d(
    t('Move ":title" to the trash, with the terms under it? It comes off the site; you can restore it.', { title: b.fallback }) + Cs(b.usedBy),
    () => S.router.delete(z(`cms/terms/${b.id}`), { preserveScroll: !0 }),
    t("Move to trash")
  ), j = m.trim().toLowerCase(), C = j === "" ? null : x.filter((b) => `${b.title ?? b.fallback} ${b.slug ?? ""}`.toLowerCase().includes(j)), $ = s.collections ?? [], f = (b, B, E) => /* @__PURE__ */ e.jsxs("div", { className: `${$s} cms:border-t cms:border-border/60 cms:px-3 cms:py-2`, children: [
    /* @__PURE__ */ e.jsx("span", { className: "cms:flex cms:justify-center", children: B && !r && /* @__PURE__ */ e.jsx(n.SortableHandle, { ...B, label: t("Move :title", { title: b.fallback }) }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-2", style: { paddingLeft: E * 20 }, children: [
      E > 0 && /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", "aria-hidden": !0, children: "└" }),
      r ? /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: b.title ?? b.fallback }) : (
        // The term's editor, in the language shown (untranslated: give it a title there to add it).
        /* @__PURE__ */ e.jsx(S.Link, { href: y(b), className: "cms:truncate cms:text-left cms:font-medium cms:underline-offset-4 cms:hover:underline", children: b.title ?? /* @__PURE__ */ e.jsx("span", { className: "cms:font-normal cms:text-muted-foreground cms:italic", children: t(":title · not translated", { title: b.fallback }) }) })
      ),
      b.url && /* @__PURE__ */ e.jsx("a", { href: b.url, target: "_blank", rel: "noopener noreferrer", className: "cms:text-muted-foreground cms:hover:text-foreground", "aria-label": t("Visit term page"), title: t("Visit term page"), children: /* @__PURE__ */ e.jsx(ge, { className: "cms:size-3.5" }) })
    ] }),
    /* @__PURE__ */ e.jsx("code", { className: "cms:hidden cms:truncate cms:text-xs cms:text-muted-foreground cms:md:block", children: b.slug ?? "—" }),
    /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:text-sm cms:text-muted-foreground cms:tabular-nums cms:md:block", children: b.entries ?? 0 }),
    /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:text-sm cms:text-muted-foreground cms:md:block", children: Jl(b.createdAt) }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:justify-end", children: r ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-1", children: [
      /* @__PURE__ */ e.jsxs(n.Button, { variant: "outline", size: "sm", onClick: () => S.router.post(z(`cms/terms/${b.id}/restore`), {}, { preserveScroll: !0 }), children: [
        /* @__PURE__ */ e.jsx(be, {}),
        " ",
        t("Restore")
      ] }),
      /* @__PURE__ */ e.jsxs(
        n.Button,
        {
          variant: "ghost",
          size: "sm",
          className: "cms:text-destructive",
          onClick: () => d(
            t('Delete ":title" for good, in every language? Entries lose it.', { title: b.fallback }) + Cs(b.usedBy),
            () => S.router.delete(z(`cms/terms/${b.id}/force`), { preserveScroll: !0, data: (b.usedBy ?? []).length > 0 ? { force: 1 } : {} })
          ),
          children: [
            /* @__PURE__ */ e.jsx(W, {}),
            " ",
            t("Delete for good")
          ]
        }
      )
    ] }) : /* @__PURE__ */ e.jsxs(n.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(n.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(n.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": t("Actions for :title", { title: b.fallback }), children: /* @__PURE__ */ e.jsx(at, {}) }) }),
      /* @__PURE__ */ e.jsxs(n.DropdownMenuContent, { align: "end", children: [
        /* @__PURE__ */ e.jsx(n.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(S.Link, { href: y(b), children: [
          /* @__PURE__ */ e.jsx(Ct, {}),
          " ",
          t("Edit")
        ] }) }),
        s.hierarchical && b.title !== null && /* @__PURE__ */ e.jsx(n.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(S.Link, { href: `${u}/create?locale=${encodeURIComponent(i)}&parent=${b.id}`, children: [
          /* @__PURE__ */ e.jsx(Y, {}),
          " ",
          t("Add a term under it")
        ] }) }),
        /* @__PURE__ */ e.jsx(n.DropdownMenuSeparator, {}),
        /* @__PURE__ */ e.jsxs(n.DropdownMenuItem, { className: "cms:text-destructive", onSelect: () => N(b), children: [
          /* @__PURE__ */ e.jsx(W, {}),
          " ",
          t("Move to trash")
        ] })
      ] })
    ] }) })
  ] }), g = (b) => /* @__PURE__ */ e.jsx(n.SortableList, { items: le(x, b), getId: (B) => x[B].id, getLabel: (B) => x[B].title ?? x[B].fallback, disabled: r, onReorder: (B) => w(b, B), className: "cms:gap-0", children: (B, { handle: E, isOverlay: I }) => /* @__PURE__ */ e.jsxs("div", { className: I ? "cms:rounded-md cms:bg-card cms:shadow-md" : "", children: [
    f(x[B], E, x[B].depth),
    !I && !r && le(x, B).length > 0 && g(B)
  ] }) });
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: s.title }),
    p,
    /* @__PURE__ */ e.jsx(
      n.PageHeader,
      {
        title: r ? t(":title — trash", { title: s.title }) : s.title,
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          c.length > 1 && /* @__PURE__ */ e.jsxs(n.Select, { value: i, onValueChange: (b) => S.router.get(u, { locale: b, ...r ? { status: "trashed" } : {} }), children: [
            /* @__PURE__ */ e.jsx(n.SelectTrigger, { className: "cms:w-40", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(n.SelectContent, { children: c.map((b) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: b, children: P(b) }, b)) })
          ] }),
          r ? /* @__PURE__ */ e.jsx(n.Button, { variant: "outline", onClick: () => S.router.get(u, { locale: i }), children: t("Back to terms") }) : /* @__PURE__ */ e.jsx(n.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(S.Link, { href: `${u}/create?locale=${encodeURIComponent(i)}`, children: [
            /* @__PURE__ */ e.jsx(Y, {}),
            " ",
            t("New term")
          ] }) }),
          /* @__PURE__ */ e.jsxs(n.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(n.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(n.Button, { variant: "outline", size: "icon", "aria-label": t("More"), children: /* @__PURE__ */ e.jsx(Ka, {}) }) }),
            /* @__PURE__ */ e.jsxs(n.DropdownMenuContent, { align: "end", className: "cms:min-w-56", children: [
              $.length > 0 && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(n.DropdownMenuLabel, { children: t("Used by collections") }),
                $.map((b) => /* @__PURE__ */ e.jsx(n.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsx(S.Link, { href: b.url, children: b.title }) }, b.url)),
                /* @__PURE__ */ e.jsx(n.DropdownMenuSeparator, {})
              ] }),
              s.settings && /* @__PURE__ */ e.jsx(n.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(S.Link, { href: s.settings, children: [
                /* @__PURE__ */ e.jsx(Xe, {}),
                " ",
                t("Taxonomy settings")
              ] }) }),
              !r && /* @__PURE__ */ e.jsxs(n.DropdownMenuItem, { onSelect: () => S.router.get(u, { locale: i, status: "trashed" }), children: [
                /* @__PURE__ */ e.jsx(W, {}),
                " ",
                t("Trash")
              ] })
            ] })
          ] })
        ] }),
        children: a.length > 1 && /* @__PURE__ */ e.jsxs(n.Select, { value: s.handle, onValueChange: (b) => S.router.get(z(`cms/taxonomies/${b}/terms`)), children: [
          /* @__PURE__ */ e.jsx(n.SelectTrigger, { className: "cms:w-48", "aria-label": t("Taxonomy"), children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(n.SelectContent, { children: a.map((b) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: b.handle, children: b.title }, b.handle)) })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-xs", children: [
        /* @__PURE__ */ e.jsx(Ne, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          n.Input,
          {
            className: "cms:pl-9",
            placeholder: t("Search terms…"),
            "aria-label": t("Search terms"),
            value: m,
            onChange: (b) => o(b.target.value)
          }
        )
      ] }),
      !r && x.length > 1 && !C && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s.hierarchical ? t("Drag terms to set their order; a term's parent is set in its editor (Under).") : t("Drag terms to set their order.") })
    ] }),
    /* @__PURE__ */ e.jsxs(n.Card, { className: "cms:gap-0 cms:overflow-hidden cms:py-0", children: [
      /* @__PURE__ */ e.jsxs("div", { className: `${$s} cms:bg-muted/60 cms:px-3 cms:py-2.5 cms:text-sm cms:font-medium cms:text-muted-foreground`, children: [
        /* @__PURE__ */ e.jsx("span", {}),
        /* @__PURE__ */ e.jsx("span", { children: t("Title") }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:md:block", children: t("Slug") }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:md:block", children: t("Entries") }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:md:block", children: t("Created") }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: t("Actions") })
      ] }),
      x.length === 0 ? /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:border-t cms:border-border/60 cms:p-10 cms:text-center cms:text-muted-foreground", children: r ? t("The trash is empty.") : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        t("No terms yet."),
        /* @__PURE__ */ e.jsx(n.Button, { size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs(S.Link, { href: `${u}/create?locale=${encodeURIComponent(i)}`, children: [
          /* @__PURE__ */ e.jsx(Y, {}),
          " ",
          t("New term")
        ] }) })
      ] }) }) : C ? C.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:border-t cms:border-border/60 cms:p-8 cms:text-center cms:text-muted-foreground", children: t("No terms match “:search”.", { search: m }) }) : C.map((b) => /* @__PURE__ */ e.jsx(D.Fragment, { children: f(b, null, 0) }, b.id)) : r ? x.map((b) => /* @__PURE__ */ e.jsx(D.Fragment, { children: f(b, null, 0) }, b.id)) : g(-1)
    ] })
  ] });
}
const $s = "cms:grid cms:items-center cms:gap-3 cms:grid-cols-[1.5rem_1fr_2.5rem] cms:md:grid-cols-[1.5rem_minmax(0,2fr)_minmax(0,1.2fr)_5rem_7rem_2.5rem]";
function Jl(s) {
  if (!s) return "—";
  const a = new Date(s);
  return Number.isNaN(a.getTime()) ? "—" : a.toLocaleDateString(document.documentElement.lang || void 0, { day: "numeric", month: "short", year: "numeric" });
}
function Ql({ locale: s, main: a, locales: l, sections: c }) {
  const i = z("cms/translations");
  n.useBreadcrumbs([{ label: t("Translations") }]);
  const r = l.find((x) => x.code === s)?.name ?? P(s), d = S.useForm({
    locale: s,
    texts: Object.fromEntries(c.flatMap((x) => x.texts.map((h) => [h.key, h.value])))
  }), p = d.errors, m = () => d.put(i, { preserveScroll: !0, onSuccess: () => d.setDefaults() });
  n.useUnsavedChanges(d.isDirty, m);
  const o = (x, h) => d.setData("texts", { ...d.data.texts, [x]: h });
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (x) => {
    x.preventDefault(), m();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: t("Translations") }),
    /* @__PURE__ */ e.jsx(
      n.PageHeader,
      {
        title: t("Translations"),
        description: t("What visitors read outside entries: forms, listing titles, menus and the site's description. Empty: the :main text shows.", { main: P(a) }),
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          l.length > 1 && /* @__PURE__ */ e.jsxs(n.Select, { value: s, onValueChange: (x) => S.router.get(i, { locale: x }), children: [
            /* @__PURE__ */ e.jsx(n.SelectTrigger, { "aria-label": t("Language"), className: "cms:w-48", children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(n.SelectContent, { children: l.map((x) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: x.code, children: x.name }, x.code)) })
          ] }),
          /* @__PURE__ */ e.jsxs(n.Button, { type: "submit", disabled: d.processing, children: [
            d.processing && /* @__PURE__ */ e.jsx(ce, { className: "cms:animate-spin" }),
            " ",
            t("Save")
          ] })
        ] }),
        children: d.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
      }
    ),
    /* @__PURE__ */ e.jsx(F, { message: p.locale }),
    c.map((x) => /* @__PURE__ */ e.jsx(
      n.CollapsibleCard,
      {
        title: x.title,
        titleClassName: "cms:text-base",
        storageKey: `cms:translations:${x.key}`,
        contentClassName: "cms:flex cms:flex-col cms:divide-y cms:divide-border/60",
        children: x.texts.map((h) => {
          const u = `text-${h.key.replace(/[^A-Za-z0-9_-]/g, "-")}`, y = p[`texts.${h.key}`];
          return /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-2 cms:py-3 cms:first:pt-0 cms:last:pb-0 cms:md:grid-cols-2 cms:md:gap-4", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-1", children: [
              /* @__PURE__ */ e.jsx(n.Label, { htmlFor: u, children: h.label }),
              /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:break-words cms:whitespace-pre-line cms:text-muted-foreground", lang: a, children: h.source || "—" })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-1", children: [
              h.multiline ? /* @__PURE__ */ e.jsx(
                n.Textarea,
                {
                  id: u,
                  rows: 2,
                  lang: s,
                  value: d.data.texts[h.key] ?? "",
                  placeholder: h.source,
                  "aria-invalid": y !== void 0,
                  "aria-description": t("In :language", { language: r }),
                  onChange: (w) => o(h.key, w.target.value)
                }
              ) : /* @__PURE__ */ e.jsx(
                n.Input,
                {
                  id: u,
                  lang: s,
                  value: d.data.texts[h.key] ?? "",
                  placeholder: h.source,
                  "aria-invalid": y !== void 0,
                  "aria-description": t("In :language", { language: r }),
                  onChange: (w) => o(h.key, w.target.value)
                }
              ),
              /* @__PURE__ */ e.jsx(F, { message: y })
            ] })
          ] }, h.key);
        })
      },
      x.key
    ))
  ] });
}
function Zl(s) {
  return function(l) {
    const c = S.usePage().props.cms;
    return Da(c?.locales), /* @__PURE__ */ e.jsx(s, { ...l });
  };
}
const Xl = {
  "Cms/Blueprints/Index": el,
  "Cms/Blueprints/Edit": ys,
  "Cms/Fieldsets/Index": Cl,
  // A fieldset is edited like a blueprint.
  "Cms/Fieldsets/Edit": ys,
  "Cms/Entries/Index": jl,
  "Cms/Entries/Edit": al,
  "Cms/Listing/Edit": wl,
  "Cms/Terms/Index": Yl,
  "Cms/Translations/Edit": Ql,
  "Cms/Terms/Edit": Wl,
  "Cms/Globals/Edit": $l,
  "Cms/Menus/Edit": Ll,
  "Cms/Comments/Index": Ol,
  "Cms/Seo/Edit": Ul,
  "Cms/Submissions/Index": Kl
};
Ca({
  pages: Object.fromEntries(Object.entries(Xl).map(([s, a]) => [s, Zl(a)]))
});
