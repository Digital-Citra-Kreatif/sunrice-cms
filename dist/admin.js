const vs = globalThis.Sunrice;
if (!vs) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const e = vs.modules["react/jsx-runtime"], ys = globalThis.Sunrice;
if (!ys) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const C = ys.modules["@inertiajs/react"], as = 3;
function We() {
  const s = globalThis.Sunrice;
  if (!s)
    throw new Error("[sunrice] This script runs outside the Sunrice admin panel (window.Sunrice is missing).");
  return s;
}
function Rt(s) {
  const l = We();
  if (l.version !== as)
    throw new Error(`[sunrice] This plugin was built for admin runtime ${as}, but the panel runs ${l.version}. Rebuild it with a matching @sunrice/admin-sdk.`);
  for (const [n, r] of Object.entries(s.pages ?? {}))
    l.registerPage(n, r);
}
function t(s, l = {}) {
  return We().t(s, l);
}
function z(s = "") {
  return We().adminUrl(s);
}
function se(s) {
  return { draft: t("Draft"), scheduled: t("Scheduled"), published: t("Published") }[s];
}
function K(s, l) {
  if (!s) return "—";
  const n = new Date(s);
  return Number.isNaN(n.getTime()) ? "—" : n.toLocaleString(document.documentElement.lang || void 0, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
}
function Vt(s, l = /* @__PURE__ */ new Date()) {
  const n = s ? new Date(s) : null;
  if (n && !Number.isNaN(n.getTime()) && n > l) return n;
  const r = new Date(l);
  return r.setDate(r.getDate() + 1), r.setMinutes(0, 0, 0), r;
}
function Ns(s) {
  const l = (n) => String(n).padStart(2, "0");
  return `${s.getFullYear()}-${l(s.getMonth() + 1)}-${l(s.getDate())}T${l(s.getHours())}:${l(s.getMinutes())}`;
}
let Oe = {};
function Ut(s) {
  Oe = s ?? {};
}
function P(s, l) {
  if (Oe[s]) return Oe[s];
  try {
    return new Intl.DisplayNames(l ? [l] : void 0, { type: "language" }).of(s.replace("_", "-")) ?? s;
  } catch {
    return s;
  }
}
function ls(s) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function qt(s, l, n, r) {
  return r && s !== "" && s === ls(l) ? ls(n) : s;
}
const Ss = globalThis.Sunrice;
if (!Ss) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const _ = Ss.modules.react;
const Kt = (s) => s?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
function Wt(s, l, n = []) {
  if (l == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: Kt(s),
    size: 24,
    node: l,
    ...n.length > 0 ? { aliases: n } : {}
  };
}
const Gt = (s) => {
  let l = "", n = !1;
  for (const r of s) {
    if (r === "-" || r === "_" || r <= " ") {
      n = l.length > 0;
      continue;
    }
    l.length === 0 ? l += r.toLowerCase() : l += n ? r.toUpperCase() : r, n = !1;
  }
  return l;
};
const Yt = (s) => {
  const l = Gt(s);
  return l.charAt(0).toUpperCase() + l.slice(1);
};
const Re = (...s) => s.filter((l, n, r) => !!l && l.trim() !== "" && r.indexOf(l) === n).join(" ").trim();
const ie = {
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
function Te(s) {
  return s != null;
}
function Jt(s, l = {}) {
  const n = l.attributeNames ?? {}, r = (h) => n[h] ?? h, i = s.size ?? s.width ?? ie.width, c = s.size ?? s.height ?? ie.height, m = s.aliases?.filter((h) => typeof h == "string" && h.trim() !== "").map((h) => `lucide-${h}`) ?? [], x = [...s.name ? [`lucide-${s.name}`] : [], ...m], d = l.className?.split(" ").filter(Boolean) ?? [], o = l.includeDefaultClasses === !1 ? Re(...d) : Re("lucide", ...x, ...d), g = l.absoluteStrokeWidth ? Number(l.strokeWidth ?? ie["stroke-width"]) * Number(s.size ?? s.width ?? ie.width) / Number(l.size ?? l.width ?? ie.width) : l.strokeWidth ?? ie["stroke-width"];
  return [
    "svg",
    {
      ...Object.entries(ie).reduce((h, [p, b]) => (h[r(p)] = b, h), {}),
      ..."color" in l && l.color && {
        [r("stroke")]: l.color
      },
      ..."size" in l && Te(l.size) && {
        [r("width")]: l.size,
        [r("height")]: l.size
      },
      ..."width" in l && Te(l.width) && {
        [r("width")]: l.width
      },
      ..."height" in l && Te(l.height) && {
        [r("height")]: l.height
      },
      [r("stroke-width")]: g,
      ...o && {
        [r("class")]: o
      },
      [r("viewBox")]: `0 0 ${i} ${c}`,
      ...l.hasA11yProp === !1 ? {
        [r("aria-hidden")]: "true"
      } : {},
      ..."attributes" in l && l.attributes
    },
    s.node.map((h) => {
      const [p, b, S] = h, k = l.nonScalingStroke ? { [r("vector-effect")]: "non-scaling-stroke", ...b } : b;
      return S ? [p, k, S] : [p, k];
    })
  ];
}
function Qt(s, l = {}) {
  return Jt(s, {
    ...l,
    attributeNames: {
      ...l.attributeNames,
      class: "className",
      "stroke-width": "strokeWidth",
      "stroke-linecap": "strokeLinecap",
      "stroke-linejoin": "strokeLinejoin",
      "vector-effect": "vectorEffect"
    }
  });
}
const Zt = (s) => {
  for (const l in s)
    if (l.startsWith("aria-") || l === "role" || l === "title")
      return !0;
  return !1;
}, Xt = _.createContext({}), ea = () => _.useContext(Xt), sa = _.forwardRef(
  ({
    color: s,
    size: l,
    width: n,
    height: r,
    strokeWidth: i,
    absoluteStrokeWidth: c,
    nonScalingStroke: m,
    className: x = "",
    children: d,
    iconNode: o = [],
    icon: g = {
      node: o,
      aliases: [],
      size: 24
    },
    ...u
  }, h) => {
    const {
      size: p = 24,
      strokeWidth: b = 2,
      absoluteStrokeWidth: S = !1,
      nonScalingStroke: k = !1,
      color: $ = "currentColor",
      className: w = ""
    } = ea() ?? {}, N = !!d || Zt(u), [f, L, T = []] = Qt(g, {
      color: s ?? $,
      width: n ?? l ?? p,
      height: r ?? l ?? p,
      strokeWidth: i ?? b,
      absoluteStrokeWidth: c ?? S,
      nonScalingStroke: m ?? k,
      className: Re(w, x),
      hasA11yProp: N,
      attributes: u
    });
    return _.createElement(
      f,
      {
        ref: h,
        ...L
      },
      [
        ...T.map(([v, M]) => _.createElement(v, M)),
        ...Array.isArray(d) ? d : [d]
      ]
    );
  }
);
function I(s, l = [], n = []) {
  const r = typeof s == "string" ? Wt(s, l, n) : s, i = _.forwardRef(
    ({ className: c, ...m }, x) => _.createElement(sa, {
      ref: x,
      icon: r,
      className: c,
      ...m
    })
  );
  return r.name && (i.displayName = Yt(r.name)), i;
}
const Cs = {
  name: "arrow-down",
  size: 24,
  node: [
    ["path", { d: "M12 5v14", key: "s699le" }],
    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
  ]
};
Cs.node;
const ks = I(Cs);
const ws = {
  name: "arrow-up-down",
  size: 24,
  node: [
    ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
    ["path", { d: "M17 20V4", key: "1ejh1v" }],
    ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
    ["path", { d: "M7 4v16", key: "1glfcx" }]
  ]
};
ws.node;
const $s = I(ws);
const Ds = {
  name: "arrow-up",
  size: 24,
  node: [
    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
    ["path", { d: "M12 19V5", key: "x0mq9r" }]
  ]
};
Ds.node;
const _s = I(Ds);
const Ts = {
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
Ts.node;
const Ve = I(Ts);
const Bs = {
  name: "check",
  size: 24,
  node: [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]
};
Bs.node;
const Se = I(Bs);
const Ls = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
Ls.node;
const Ge = I(Ls);
const Ms = {
  name: "chevron-left",
  size: 24,
  node: [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]]
};
Ms.node;
const Ye = I(Ms);
const zs = {
  name: "chevron-right",
  size: 24,
  node: [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]
};
zs.node;
const ge = I(zs);
const Is = {
  name: "chevrons-down-up",
  size: 24,
  node: [
    ["path", { d: "m7 20 5-5 5 5", key: "13a0gw" }],
    ["path", { d: "m7 4 5 5 5-5", key: "1kwcof" }]
  ]
};
Is.node;
const ta = I(Is);
const As = {
  name: "chevrons-up-down",
  size: 24,
  node: [
    ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
    ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
  ]
};
As.node;
const aa = I(As);
const Es = {
  name: "columns-3",
  size: 24,
  node: [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M9 3v18", key: "fh3hqa" }],
    ["path", { d: "M15 3v18", key: "14nvp0" }]
  ],
  aliases: ["panels-left-right"]
};
Es.node;
const la = I(Es);
const Fs = {
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
Fs.node;
const na = I(Fs);
const Hs = {
  name: "copy",
  size: 24,
  node: [
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
  ]
};
Hs.node;
const ca = I(Hs);
const Ps = {
  name: "download",
  size: 24,
  node: [
    ["path", { d: "M12 15V3", key: "m9g1x1" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
  ]
};
Ps.node;
const Os = I(Ps);
const Rs = {
  name: "ellipsis-vertical",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
    ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
    ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }]
  ],
  aliases: ["more-vertical"]
};
Rs.node;
const ra = I(Rs);
const Vs = {
  name: "ellipsis",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
    ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
    ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
  ],
  aliases: ["more-horizontal"]
};
Vs.node;
const Us = I(Vs);
const qs = {
  name: "external-link",
  size: 24,
  node: [
    ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
    ["path", { d: "M10 14 21 3", key: "gplh6r" }],
    ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
  ]
};
qs.node;
const he = I(qs);
const Ks = {
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
Ks.node;
const ia = I(Ks);
const Ws = {
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
Ws.node;
const oa = I(Ws);
const Gs = {
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
Gs.node;
const da = I(Gs);
const Ys = {
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
Ys.node;
const ns = I(Ys);
const Js = {
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
Js.node;
const ma = I(Js);
const Qs = {
  name: "link-2",
  size: 24,
  node: [
    ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
    ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
    ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
  ]
};
Qs.node;
const ua = I(Qs);
const Zs = {
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
Zs.node;
const ha = I(Zs);
const Xs = {
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
Xs.node;
const xa = I(Xs);
const et = {
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
et.node;
const pa = I(et);
const st = {
  name: "loader-circle",
  size: 24,
  node: [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  aliases: ["loader-2"]
};
st.node;
const de = I(st);
const tt = {
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
tt.node;
const at = I(tt);
const lt = {
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
lt.node;
const ga = I(lt);
const nt = {
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
nt.node;
const ct = I(nt);
const rt = {
  name: "plus",
  size: 24,
  node: [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ]
};
rt.node;
const J = I(rt);
const it = {
  name: "rotate-ccw",
  size: 24,
  node: [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ]
};
it.node;
const xe = I(it);
const ot = {
  name: "search",
  size: 24,
  node: [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ]
};
ot.node;
const fe = I(ot);
const dt = {
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
dt.node;
const fa = I(dt);
const mt = {
  name: "settings-2",
  size: 24,
  node: [
    ["path", { d: "M14 17H5", key: "gfn3mx" }],
    ["path", { d: "M19 7h-9", key: "6i9tg" }],
    ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
    ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
  ]
};
mt.node;
const Je = I(mt);
const ut = {
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
ut.node;
const Ue = I(ut);
const ht = {
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
ht.node;
const ja = I(ht);
const xt = {
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
xt.node;
const W = I(xt);
const pt = {
  name: "undo-2",
  size: 24,
  node: [
    ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
    ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
  ]
};
pt.node;
const qe = I(pt);
const gt = {
  name: "x",
  size: 24,
  node: [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]
};
gt.node;
const we = I(gt), ft = globalThis.Sunrice;
if (!ft) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const a = ft.modules["@sunrice/admin-sdk/ui"];
function ce() {
  const [s, l] = _.useState(null), n = /* @__PURE__ */ e.jsx(a.Dialog, { open: s !== null, onOpenChange: (r) => !r && l(null), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: t("Are you sure?") }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: s?.message })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: () => l(null), children: t("Cancel") }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "destructive", onClick: () => {
        s?.onConfirm(), l(null);
      }, children: s?.label ?? t("Delete") })
    ] })
  ] }) });
  return [(r, i, c = "Delete") => l({ message: r, onConfirm: i, label: c }), n];
}
function oe(s) {
  return s && typeof s == "object" && !Array.isArray(s) ? s : {};
}
function ba(s, l) {
  if (typeof s != "string" || s === "") return "";
  const n = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(s);
  return n ? l ? `${n[1]}T${n[2] ?? "00:00"}` : n[1] ?? "" : "";
}
function cs(s) {
  return s === "" ? null : s;
}
function va(s) {
  const l = typeof s == "number" ? s : typeof s == "string" && s.trim() !== "" ? Number(s) : NaN;
  return !Number.isFinite(l) || Math.abs(l) < 1e4 ? null : new Intl.NumberFormat("en", { maximumFractionDigits: 20 }).format(l);
}
function ya(s, l, n, r) {
  return l || s.some((i) => ["none", ""].includes(i.label.trim().toLowerCase()) || i.value.trim().toLowerCase() === "none") ? !1 : !n || !r;
}
function Ce(s) {
  return s.some((l) => l.shared === !0 || Ce(l.fields ?? []) || (l.blocks ?? []).some((n) => Ce(n.fields)));
}
function Na() {
  return { _hidden: !1 };
}
function Qe(s, l, n = 60) {
  for (const r of s) {
    const i = l[r.handle];
    let c = null;
    ["text", "textarea", "email", "url"].includes(r.type) && typeof i == "string" ? c = i : r.type === "rich_text" && typeof i == "string" ? c = i.replace(/<[^>]*>/g, " ") : r.type === "group" && Array.isArray(r.fields) && (c = Qe(r.fields, oe(i), n));
    const m = (c ?? "").replace(/\s+/g, " ").trim();
    if (m !== "") return m.length > n ? `${m.slice(0, n - 1).trimEnd()}…` : m;
  }
  return null;
}
function Sa(s) {
  return { type: s, hidden: !1, values: {} };
}
function Ca(s) {
  const l = s.replace(/[\u0000- \u007f]+/g, ""), n = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(l);
  return n ? ["http", "https", "mailto", "tel"].includes(n[1].toLowerCase()) : !l.includes("\\");
}
function jt({ ids: s, search: l, collections: n }) {
  const r = new URLSearchParams();
  for (const i of s ?? []) r.append("ids[]", String(i));
  l && r.set("search", l);
  for (const i of n) r.append("collections[]", i);
  return r.toString();
}
let ka = 0;
function wa(s, l) {
  return s.length === l ? s.slice() : s.length < l ? [...s, ...Array.from({ length: l - s.length }, () => `k${++ka}`)] : s.slice(0, l);
}
function $a({ taxonomy: s, q: l, ids: n }) {
  const r = new URLSearchParams({ taxonomy: s });
  l && r.set("q", l);
  for (const i of n ?? []) r.append("ids[]", String(i));
  return r.toString();
}
async function rs(s) {
  const l = await fetch(`${z("cms/entries/picker")}?${jt(s)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!l.ok) throw new Error(String(l.status));
  const n = await l.json();
  return { items: n.items, unavailable: n.unavailable ?? [] };
}
function Da(s) {
  return s.length < 2 ? s[0] ?? "" : t(":items and :last", { items: s.slice(0, -1).join(", "), last: s[s.length - 1] });
}
function $e({ id: s, value: l, multiple: n, max: r, collections: i, invalid: c, onChange: m, emptyHint: x }) {
  const d = l === null ? [] : Array.isArray(l) ? l : [l], [o, g] = _.useState({}), [u, h] = _.useState(""), [p, b] = _.useState(!1), [S, k] = _.useState(null), [$, w] = _.useState([]), [N, f] = _.useState(!1), L = n && r !== null && d.length >= r, T = d.filter((D) => !o[D]).join(",");
  _.useEffect(() => {
    T !== "" && rs({ ids: T.split(",").map(Number), collections: i }).then(({ items: D }) => g((F) => ({ ...F, ...Object.fromEntries(D.map((j) => [j.id, j])) }))).catch(() => f(!0));
  }, [T]), _.useEffect(() => {
    if (!p) {
      k(null);
      return;
    }
    const D = window.setTimeout(() => {
      rs({ search: u.trim(), collections: i }).then((F) => {
        k(F.items), w(F.unavailable), f(!1);
      }).catch(() => f(!0));
    }, u.trim() === "" ? 0 : 250);
    return () => window.clearTimeout(D);
  }, [u, p]);
  const v = (D) => {
    g((F) => ({ ...F, [D.id]: D })), m(n ? [...d, D.id] : D.id), h("");
  }, M = (D) => m(n ? D : D[0] ?? null);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    d.length > 0 && /* @__PURE__ */ e.jsx(a.SortableList, { items: d, getId: (D) => D, getLabel: (D) => o[D]?.title ?? `Entry #${D}`, onReorder: (D) => M(D), disabled: !n, className: "cms:gap-1", children: (D, { handle: F }) => {
      const j = o[D];
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-md cms:border cms:bg-card cms:px-2 cms:py-1 cms:text-sm", children: [
        n && /* @__PURE__ */ e.jsx(a.SortableHandle, { ...F, label: t("Move :title", { title: j?.title ?? D }) }),
        /* @__PURE__ */ e.jsx("span", { className: `cms:min-w-0 cms:flex-1 cms:truncate ${n ? "" : "cms:pl-1"}`, children: j ? j.title : t("Entry #:id", { id: D }) }),
        j && /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: j.collection }),
        j && /* @__PURE__ */ e.jsx(a.Badge, { variant: j.status === "published" ? "success" : "secondary", children: se(j.status) }),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            type: "button",
            variant: "ghost",
            size: "icon",
            className: "cms:size-7",
            "aria-label": t("Remove :title", { title: j?.title ?? D }),
            onClick: () => M(d.filter((E) => E !== D)),
            children: /* @__PURE__ */ e.jsx(we, {})
          }
        )
      ] });
    } }),
    !L && (n || d.length === 0) && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-md", children: [
      /* @__PURE__ */ e.jsx(fe, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: s,
          className: "cms:pl-9",
          placeholder: t("Search entries by title"),
          "aria-invalid": c,
          value: u,
          autoComplete: "off",
          "aria-expanded": S !== null,
          onFocus: () => b(!0),
          onBlur: () => b(!1),
          onKeyDown: (D) => {
            D.key === "Escape" && p && (D.preventDefault(), b(!1));
          },
          onChange: (D) => {
            h(D.target.value), b(!0);
          }
        }
      ),
      S !== null && /* @__PURE__ */ e.jsxs("ul", { role: "listbox", "aria-label": t("Matching entries"), className: "cms:absolute cms:z-10 cms:mt-1 cms:max-h-64 cms:w-full cms:overflow-auto cms:rounded-md cms:border cms:bg-card cms:p-1 cms:shadow-md", children: [
        S.filter((D) => !d.includes(D.id)).length === 0 && /* @__PURE__ */ e.jsxs("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: [
          u.trim() === "" ? t("No entries yet.") : t("No entries match."),
          x && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            " ",
            x
          ] })
        ] }),
        $.length > 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: t("Your role can't see entries of :collections: ask an editor to link them.", { collections: Da($) }) }),
        S.filter((D) => !d.includes(D.id)).map((D) => /* @__PURE__ */ e.jsx("li", { role: "option", "aria-selected": !1, children: /* @__PURE__ */ e.jsxs(
          "button",
          {
            type: "button",
            className: "cms:flex cms:w-full cms:items-center cms:gap-2 cms:rounded cms:px-2 cms:py-1.5 cms:text-left cms:text-sm cms:hover:bg-accent",
            onMouseDown: (F) => F.preventDefault(),
            onClick: () => v(D),
            children: [
              /* @__PURE__ */ e.jsx("span", { className: "cms:flex-1 cms:truncate", children: D.title }),
              /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: D.collection })
            ]
          }
        ) }, D.id))
      ] })
    ] }),
    N && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t("Entries could not be loaded. Try again.") })
  ] });
}
const bt = _.createContext({}), Be = "__none";
async function is(s) {
  const l = await fetch(`${z("cms/terms/picker")}?${$a(s)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!l.ok) throw new Error(String(l.status));
  return await l.json();
}
function _a({ id: s, taxonomy: l, multiple: n, max: r, required: i, invalid: c, value: m, onChange: x }) {
  const d = _.useContext(bt), o = m === null ? [] : Array.isArray(m) ? m : [m], [g, u] = _.useState(null), [h, p] = _.useState(!1), [b, S] = _.useState(""), [k, $] = _.useState({}), [w, N] = _.useState(!1);
  _.useEffect(() => {
    if (!l) return;
    const j = b.trim(), E = window.setTimeout(() => {
      is({ taxonomy: l, q: j }).then((R) => {
        u(R.items), R.more && p(!0), N(!1);
      }).catch(() => N(!0));
    }, j === "" ? 0 : 250);
    return () => window.clearTimeout(E);
  }, [l, b]);
  const f = (j) => d[String(j)] ?? k[j] ?? g?.find((E) => E.id === j)?.label, L = g === null ? "" : o.filter((j) => f(j) === void 0).join(",");
  if (_.useEffect(() => {
    !l || L === "" || is({ taxonomy: l, ids: L.split(",").map(Number) }).then((j) => $((E) => ({ ...E, ...Object.fromEntries(j.items.map((R) => [R.id, R.label])) }))).catch(() => N(!0));
  }, [l, L]), !l) return /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("Choose a taxonomy for this field in its blueprint.") });
  if (g === null) return w ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t("Terms could not be loaded. Try again.") }) : /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-9 cms:w-full cms:max-w-sm" });
  const T = (j) => `${"— ".repeat(j.depth)}${j.label}`, v = n && r !== null && o.length >= r, M = (j) => x(n ? j : j[0] ?? null), D = h && o.length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-1.5", children: o.map((j) => /* @__PURE__ */ e.jsxs(a.Badge, { variant: "secondary", className: "cms:gap-1 cms:pr-1", children: [
    f(j) ?? t("Term #:id", { id: j }),
    !(i && !n) && /* @__PURE__ */ e.jsx(
      "button",
      {
        type: "button",
        className: "cms:rounded-sm cms:p-0.5 cms:hover:bg-muted",
        "aria-label": t("Remove :title", { title: f(j) ?? j }),
        onClick: () => M(o.filter((E) => E !== j)),
        children: /* @__PURE__ */ e.jsx(we, { className: "cms:size-3" })
      }
    )
  ] }, j)) }), F = h && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-sm", children: [
    /* @__PURE__ */ e.jsx(fe, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
    /* @__PURE__ */ e.jsx(
      a.Input,
      {
        id: s,
        className: "cms:pl-9",
        placeholder: t("Search terms"),
        autoComplete: "off",
        "aria-invalid": c,
        value: b,
        onChange: (j) => S(j.target.value)
      }
    )
  ] });
  if (!n && !h) {
    const j = o[0], E = j === void 0 || g.some((R) => R.id === j);
    return /* @__PURE__ */ e.jsxs(a.Select, { value: j === void 0 ? Be : String(j), onValueChange: (R) => x(R === Be ? null : Number(R)), children: [
      /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: s, className: "cms:w-full cms:max-w-sm", "aria-invalid": c, children: /* @__PURE__ */ e.jsx(a.SelectValue, { children: j === void 0 ? t("None") : f(j) ?? t("Term #:id", { id: j }) }) }),
      /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
        !i && /* @__PURE__ */ e.jsx(a.SelectItem, { value: Be, children: t("None") }),
        !E && j !== void 0 && /* @__PURE__ */ e.jsx(a.SelectItem, { value: String(j), children: f(j) ?? t("Term #:id", { id: j }) }),
        g.map((R) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: String(R.id), children: T(R) }, R.id))
      ] })
    ] });
  }
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    D,
    F,
    g.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: b.trim() ? t("No terms match.") : t("Nothing to choose from yet.") }) : n ? /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:max-h-72 cms:flex-col cms:gap-2 cms:overflow-auto", children: g.map((j) => {
      const E = o.includes(j.id);
      return /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx(
          a.Checkbox,
          {
            checked: E,
            disabled: !E && v,
            onCheckedChange: (R) => M(R ? [...o, j.id] : o.filter((G) => G !== j.id))
          }
        ),
        T(j)
      ] }, j.id);
    }) }) : /* @__PURE__ */ e.jsx("div", { role: "listbox", "aria-label": t("Terms"), className: "cms:flex cms:max-h-72 cms:flex-col cms:overflow-auto", children: g.map((j) => /* @__PURE__ */ e.jsx(
      a.Button,
      {
        type: "button",
        variant: o[0] === j.id ? "secondary" : "ghost",
        size: "sm",
        className: "cms:justify-start",
        role: "option",
        "aria-selected": o[0] === j.id,
        onClick: () => x(j.id),
        children: T(j)
      },
      j.id
    )) })
  ] });
}
const Ta = (s, l = {}) => s.replace(/:([A-Za-z_]+)/g, (n, r) => l[r] ?? n), Ba = 5;
let La = 0;
const vt = () => `f${++La}`;
function yt(s) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function Nt(s) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^[0-9_]+/, "").replace(/_{2,}/g, "_").slice(0, 64);
}
function St(s, l) {
  const n = new Set(l.map((c) => c.handle)), r = yt(s) || "field";
  let i = r;
  for (let c = 2; n.has(i); c++)
    i = `${r}_${c}`;
  return i;
}
function Ct(s) {
  return (s ?? []).map(({ fields: l, ...n }) => ({
    ...n,
    key: vt(),
    fields: Ct(l),
    handleTouched: !0
  }));
}
function kt(s, l) {
  return s.map(({ key: n, handleTouched: r, fields: i, ...c }) => ({
    ...c,
    validation: (c.validation ?? []).map((m) => m.trim()).filter((m) => m !== ""),
    ...l(c.type) ? { fields: kt(i, l) } : {}
  }));
}
function Ma(s, l, n) {
  return { key: vt(), type: s, label: l, handle: St(l, n), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function os(s, l, n) {
  if (s.handleTouched) return { ...s, label: l };
  const r = n.filter((i) => i.key !== s.key);
  return { ...s, label: l, handle: St(l || s.type, r) };
}
function ue(s, l) {
  const n = `${l}.`, r = {};
  for (const [i, c] of Object.entries(s))
    i.startsWith(n) && (r[i.slice(n.length)] = c);
  return r;
}
function Z(s, l) {
  const n = s[l];
  return { ...ue(s, l), ...n !== void 0 ? { "": n } : {} };
}
function De(s, l) {
  return Object.keys(s).filter((n) => n === l || n.startsWith(`${l}.`));
}
function je(s, l) {
  return Object.keys(s).some((n) => n === l || n.startsWith(`${l}.`));
}
function wt(s, l, n, r = Ta) {
  return s.type === "fieldset" ? null : n?.includes(s.handle) ? r('":handle" is used by the content itself; choose another handle.', { handle: s.handle }) : s.handle !== "" && l.some((i) => i.key !== s.key && i.type !== "fieldset" && i.handle === s.handle) ? r('There is already a field ":handle" here.', { handle: s.handle }) : null;
}
const Le = [
  { value: "equals", label: "is", needsValue: !0 },
  { value: "not_equals", label: "is not", needsValue: !0 },
  { value: "filled", label: "is filled in", needsValue: !1 },
  { value: "empty", label: "is empty", needsValue: !1 }
];
function ds(s) {
  return s === !0 ? "true" : s === !1 ? "false" : typeof s == "string" || typeof s == "number" ? String(s) : "";
}
function Ze(s, l) {
  const n = s.condition;
  if (!n) return !0;
  const r = l[n.field], i = r != null && r !== "" && r !== !1 && !(Array.isArray(r) && r.length === 0), c = (Array.isArray(r) ? r : [r]).map(ds).includes(ds(n.value));
  switch (n.operator) {
    case "equals":
      return c;
    case "not_equals":
      return !c;
    case "filled":
      return i;
    default:
      return !i;
  }
}
const Me = "__none";
function A({ message: s }) {
  return s ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: s }) : null;
}
function ze(s) {
  const l = s.config?.options;
  return Array.isArray(l) ? l.flatMap((n) => {
    if (typeof n == "string") return [{ value: n, label: n }];
    if (n && typeof n == "object" && typeof n.value == "string") {
      const { value: r, label: i } = n;
      return [{ value: r, label: i || r }];
    }
    return [];
  }) : [];
}
const za = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function ke(s) {
  if (s.label) return s.label;
  const l = s.handle.replace(/_/g, " ");
  return l.charAt(0).toUpperCase() + l.slice(1);
}
function ne({ field: s, value: l, onChange: n, errors: r, id: i, content: c = !1 }) {
  const m = ke(s), x = za.includes(s.type) || ["select", "terms"].includes(s.type) && s.config?.multiple === !0;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", ...x ? { role: "group", "aria-labelledby": `${i}-label` } : {}, children: [
    s.type === "toggle" ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(a.Switch, { id: i, checked: l === !0, onCheckedChange: (d) => n(d) }),
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: i, children: m })
    ] }) : /* @__PURE__ */ e.jsxs(a.Label, { id: `${i}-label`, htmlFor: x ? void 0 : i, children: [
      m,
      s.required && /* @__PURE__ */ e.jsx("span", { className: "cms:text-destructive", children: " *" })
    ] }),
    /* @__PURE__ */ e.jsx(Aa, { field: s, value: l, onChange: n, errors: r, id: i, content: c }),
    ["text", "textarea"].includes(s.type) && ee(s, "max") !== void 0 && /* @__PURE__ */ e.jsx(Ia, { length: typeof l == "string" ? [...l].length : 0, max: ee(s, "max") ?? 0 }),
    s.instructions && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s.instructions }),
    /* @__PURE__ */ e.jsx(A, { message: r[""] })
  ] });
}
function Ia({ length: s, max: l }) {
  const n = s > l;
  return /* @__PURE__ */ e.jsxs("p", { className: `cms:-mt-1 cms:self-end cms:text-xs cms:tabular-nums ${n ? "cms:font-medium cms:text-destructive" : "cms:text-muted-foreground"}`, children: [
    s,
    " / ",
    l,
    n && /* @__PURE__ */ e.jsxs("span", { children: [
      " · ",
      s - l,
      " too many"
    ] })
  ] });
}
function Aa({ field: s, value: l, onChange: n, errors: r, id: i, content: c }) {
  const m = r[""] !== void 0;
  switch (s.type) {
    case "toggle":
      return null;
    case "file":
      return /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("Visitors attach a file here when they send a form.") });
    case "textarea":
      return /* @__PURE__ */ e.jsx(
        a.Textarea,
        {
          id: i,
          "aria-invalid": m,
          value: typeof l == "string" ? l : "",
          rows: ee(s, "rows") ?? 4,
          onChange: (x) => n(x.target.value)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ e.jsx(a.RichTextEditor, { id: i, labelledBy: `${i}-label`, invalid: m, value: typeof l == "string" ? l : "", onChange: n });
    case "number": {
      const x = va(l);
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: i,
            type: "number",
            className: "cms:max-w-48",
            "aria-invalid": m,
            "aria-describedby": x ? `${i}-grouped` : void 0,
            value: typeof l == "number" ? String(l) : typeof l == "string" ? l : "",
            min: ee(s, "min"),
            max: ee(s, "max"),
            step: ee(s, "step") ?? "any",
            onChange: (d) => n(d.target.value === "" ? null : Number(d.target.value))
          }
        ),
        x && /* @__PURE__ */ e.jsx("span", { id: `${i}-grouped`, className: "cms:text-sm cms:tabular-nums cms:text-muted-foreground", children: x })
      ] });
    }
    case "date": {
      const x = s.config?.time === !0;
      return /* @__PURE__ */ e.jsx(
        a.DatePicker,
        {
          id: i,
          withTime: x,
          invalid: m,
          required: s.required === !0,
          value: cs(ba(l, x)),
          onChange: (d) => n(cs(d ?? ""))
        }
      );
    }
    case "select":
      return s.config?.multiple === !0 ? /* @__PURE__ */ e.jsx(
        Ha,
        {
          options: ze(s),
          value: Array.isArray(l) ? l.map(String) : [],
          onChange: n,
          empty: typeof s.config?.empty == "string" ? s.config.empty : void 0,
          inTickOrder: s.config?.in_tick_order === !0
        }
      ) : /* @__PURE__ */ e.jsx(
        Fa,
        {
          options: ze(s),
          value: typeof l == "string" ? l : null,
          onChange: n,
          id: i,
          empty: ya(ze(s), s.required === !0, typeof s.config?.default == "string" && s.config.default !== "", typeof l == "string" && l !== "")
        }
      );
    case "terms": {
      const x = s.config?.multiple === !0, d = Array.isArray(l) ? l.filter((o) => typeof o == "number") : typeof l == "number" ? l : null;
      return /* @__PURE__ */ e.jsx(
        _a,
        {
          id: i,
          taxonomy: typeof s.taxonomy == "string" ? s.taxonomy : null,
          multiple: x,
          max: ee(s, "max") ?? null,
          required: s.required === !0,
          invalid: m,
          value: x ? Array.isArray(d) ? d : [] : typeof d == "number" ? d : null,
          onChange: n
        }
      );
    }
    case "entries":
      return /* @__PURE__ */ e.jsx(
        $e,
        {
          id: i,
          invalid: m,
          multiple: s.config?.multiple === !0,
          max: ee(s, "max") ?? null,
          collections: s.collections ?? [],
          onChange: n,
          value: typeof l == "number" || Array.isArray(l) && l.every((x) => typeof x == "number") ? l : null
        }
      );
    case "link":
      return /* @__PURE__ */ e.jsx(Pa, { label: ke(s), value: oe(l), onChange: n, errors: r, id: i, collections: s.collections ?? [] });
    case "media":
      return /* @__PURE__ */ e.jsx(
        a.MediaPickerInput,
        {
          id: i,
          invalid: m,
          disabled: !1,
          multiple: s.config?.multiple === !0,
          max: ee(s, "max") ?? null,
          types: Array.isArray(s.config?.types) ? s.config.types : [],
          value: typeof l == "number" || Array.isArray(l) && l.every((x) => typeof x == "number") ? l : null,
          onChange: n
        }
      );
    case "group":
      return /* @__PURE__ */ e.jsx(me, { fields: s.fields ?? [], value: oe(l), onChange: n, errors: r, id: i, content: c });
    case "repeater":
      return /* @__PURE__ */ e.jsx(Oa, { field: s, value: Array.isArray(l) ? l : [], onChange: n, errors: r, id: i, content: c });
    case "flexible":
      return /* @__PURE__ */ e.jsx(Ra, { field: s, value: Array.isArray(l) ? l : [], onChange: n, errors: r, id: i });
    default:
      return /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: i,
          "aria-invalid": m,
          value: typeof l == "string" ? l : "",
          placeholder: Ea(s, "placeholder"),
          onChange: (x) => n(x.target.value)
        }
      );
  }
}
function ee(s, l) {
  const n = s.config?.[l];
  return typeof n == "number" ? n : void 0;
}
function Ea(s, l) {
  const n = s.config?.[l];
  return typeof n == "string" ? n : void 0;
}
function me({ fields: s, value: l, onChange: n, errors: r, id: i, content: c, bare: m = !1 }) {
  return /* @__PURE__ */ e.jsx("div", { className: m ? "cms:flex cms:flex-col cms:gap-6" : "cms:flex cms:flex-col cms:gap-4 cms:rounded-lg cms:border cms:p-4", children: s.filter((x) => Ze(x, l)).map((x) => x.shared ? (
    // Greyed out; the form says once, at the top, where to edit shared fields.
    /* @__PURE__ */ e.jsx("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1 cms:opacity-60", title: t("Shared by all languages: edit it in the main language."), children: /* @__PURE__ */ e.jsx(ne, { id: `${i}-${x.handle}`, field: x, value: l[x.handle], content: c, errors: {}, onChange: () => {
    } }) }, x.handle)
  ) : /* @__PURE__ */ e.jsx(
    ne,
    {
      id: `${i}-${x.handle}`,
      field: x,
      value: l[x.handle],
      content: c,
      errors: Z(r, x.handle),
      onChange: (d) => n({ ...l, [x.handle]: d })
    },
    x.handle
  )) });
}
function Fa({ options: s, value: l, onChange: n, id: r, empty: i }) {
  return /* @__PURE__ */ e.jsxs(a.Select, { value: l ?? Me, onValueChange: (c) => n(c === Me ? null : c), children: [
    /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: r, className: "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
    /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
      i && /* @__PURE__ */ e.jsx(a.SelectItem, { value: Me, children: t("None") }),
      s.map((c) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: c.value, children: c.label }, c.value))
    ] })
  ] });
}
function Ha({ options: s, value: l, onChange: n, empty: r, inTickOrder: i = !1 }) {
  return s.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: r ?? t("Nothing to choose from yet.") }) : /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2", children: s.map((c) => /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
    /* @__PURE__ */ e.jsx(
      a.Checkbox,
      {
        checked: l.includes(c.value),
        onCheckedChange: (m) => n(m ? i ? [...l.filter((x) => x !== c.value), c.value] : s.map((x) => x.value).filter((x) => x === c.value || l.includes(x)) : l.filter((x) => x !== c.value))
      }
    ),
    c.label,
    i && l.includes(c.value) && /* @__PURE__ */ e.jsxs("span", { className: "cms:text-xs cms:text-muted-foreground", "aria-label": `number ${l.indexOf(c.value) + 1}`, children: [
      "#",
      l.indexOf(c.value) + 1
    ] })
  ] }, c.value)) });
}
function Pa({ label: s, value: l, onChange: n, errors: r, id: i, collections: c }) {
  const m = l.type === "entry" ? "entry" : "url", x = (d) => {
    const o = { ...l, type: m, ...d }, g = o.type === "entry" ? typeof o.entry_id != "number" : o.url === "" || o.url === void 0 || o.url === null;
    n(g ? o.label || o.new_tab ? o : null : o);
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("div", { role: "radiogroup", "aria-label": t(":field: link to", { field: s }), className: "cms:inline-flex cms:w-fit cms:rounded-md cms:border cms:p-0.5", children: ["url", "entry"].map((d) => /* @__PURE__ */ e.jsx(
      a.Button,
      {
        type: "button",
        size: "sm",
        role: "radio",
        "aria-checked": m === d,
        variant: m === d ? "secondary" : "ghost",
        onClick: () => x({ type: d, url: d === "url" ? l.url : void 0, entry_id: d === "entry" ? l.entry_id : void 0 }),
        children: t(d === "url" ? "Address" : "Entry")
      },
      d
    )) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-2 cms:md:grid-cols-[2fr_1fr_auto] cms:md:items-start", children: [
      m === "url" ? /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: i,
          "aria-label": t(":field: address", { field: s }),
          placeholder: t("https://… or /about"),
          value: typeof l.url == "string" ? l.url : "",
          onChange: (d) => x({ url: d.target.value }),
          "aria-invalid": r.url !== void 0
        }
      ) : /* @__PURE__ */ e.jsx(
        $e,
        {
          id: i,
          invalid: r.entry_id !== void 0,
          multiple: !1,
          max: null,
          collections: c,
          value: typeof l.entry_id == "number" ? l.entry_id : null,
          onChange: (d) => x({ entry_id: typeof d == "number" ? d : void 0 })
        }
      ),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          "aria-label": t(":field: link text", { field: s }),
          placeholder: t(m === "entry" ? "Link text (the entry's title)" : "Link text"),
          value: typeof l.label == "string" ? l.label : "",
          onChange: (d) => x({ label: d.target.value })
        }
      ),
      /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:h-9 cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx(a.Checkbox, { checked: l.new_tab === !0, onCheckedChange: (d) => x({ new_tab: d }) }),
        t("New tab")
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ e.jsx(A, { message: r.url ?? r.entry_id ?? r.label ?? r.type }) })
    ] })
  ] });
}
function ms(s, l) {
  return !l && (s.fields ?? []).every((n) => n.type === "text");
}
function $t(s) {
  const l = _.useRef([]);
  return l.current = wa(l.current, s), {
    keys: l.current,
    remove: (n) => {
      l.current = l.current.filter((r, i) => i !== n);
    },
    move: (n, r) => {
      l.current = a.moveItem(l.current, n, r);
    }
  };
}
function Dt() {
  const [s, l] = _.useState(() => /* @__PURE__ */ new Set());
  return {
    isCollapsed: (n, r) => !r && s.has(n),
    toggle: (n) => l((r) => {
      const i = new Set(r);
      return i.delete(n) || i.add(n), i;
    }),
    setAll: (n, r) => l(r ? new Set(n) : /* @__PURE__ */ new Set()),
    anyOpen: (n) => n.some((r) => !s.has(r))
  };
}
function _t({ keys: s, folding: l }) {
  if (s.length < 2) return null;
  const n = l.anyOpen(s);
  return /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => l.setAll(s, n), children: [
    n ? /* @__PURE__ */ e.jsx(ta, {}) : /* @__PURE__ */ e.jsx(aa, {}),
    " ",
    t(n ? "Collapse all" : "Expand all")
  ] });
}
function Oa({ field: s, value: l, onChange: n, errors: r, id: i, content: c = !1 }) {
  const m = s.fields ?? [], x = l.map(oe), d = $t(x.length), o = (S, k) => n(x.map(($, w) => w === S ? k : $)), g = (S) => {
    d.remove(S), n(x.filter((k, $) => $ !== S));
  }, u = s.label ? s.label.toLowerCase().replace(/s$/, "") : t("row"), h = u.charAt(0).toUpperCase() + u.slice(1), p = x.map((S, k) => ({ row: S, index: k, key: d.keys[k] ?? String(k) })), b = Dt();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(
      a.SortableList,
      {
        items: p,
        getId: (S) => S.key,
        getLabel: (S) => `${u} ${S.index + 1}`,
        onReorder: (S, k, $) => {
          d.move(k, $), n(S.map((w) => w.row));
        },
        children: ({ row: S, index: k, key: $ }, { handle: w }) => ms(s, c) ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(a.SortableHandle, { ...w, label: t("Move :item :number", { item: u, number: k + 1 }), className: "cms:mt-1" }),
          m.map((N) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                "aria-label": N.label || N.handle,
                placeholder: N.label || N.handle,
                value: typeof S[N.handle] == "string" ? S[N.handle] : "",
                onChange: (f) => o(k, { ...S, [N.handle]: f.target.value })
              }
            ),
            /* @__PURE__ */ e.jsx(A, { message: r[`${k}.${N.handle}`] })
          ] }, N.handle)),
          /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": t("Remove :item :number", { item: u, number: k + 1 }), onClick: () => g(k), children: /* @__PURE__ */ e.jsx(W, {}) })
        ] }) : (() => {
          const N = Z(r, String(k)), f = b.isCollapsed($, Object.keys(N).length > 0);
          return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              Tt,
              {
                label: `${h} ${k + 1}`,
                summary: Qe(m, S),
                handle: w,
                onRemove: () => g(k),
                collapsed: f,
                onToggle: () => b.toggle($),
                controls: `${i}-${k}-fields`,
                hidden: c ? S._hidden === !0 : void 0,
                onHidden: (L) => o(k, { ...S, _hidden: L })
              }
            ),
            /* @__PURE__ */ e.jsx("div", { id: `${i}-${k}-fields`, hidden: f, children: !f && /* @__PURE__ */ e.jsx(me, { fields: m, value: S, onChange: (L) => o(k, L), errors: N, id: `${i}-${k}`, content: c }) })
          ] });
        })()
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => n([...x, c ? Na() : {}]), children: [
        /* @__PURE__ */ e.jsx(J, {}),
        " ",
        t("Add :item", { item: u })
      ] }),
      !ms(s, c) && /* @__PURE__ */ e.jsx(_t, { keys: p.map((S) => S.key), folding: b })
    ] })
  ] });
}
function Ra({ field: s, value: l, onChange: n, errors: r, id: i }) {
  const c = s.blocks ?? [], m = l.map(oe), x = $t(m.length), d = (h, p) => n(m.map((b, S) => S === h ? p : b)), o = (h) => {
    x.remove(h), n(m.filter((p, b) => b !== h));
  }, g = m.map((h, p) => ({ block: h, index: p, key: x.keys[p] ?? String(p) })), u = Dt();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    /* @__PURE__ */ e.jsx(
      a.SortableList,
      {
        items: g,
        getId: (h) => h.key,
        className: "cms:gap-3",
        getLabel: (h) => t(":type block", { type: c.find((p) => p.type === h.block.type)?.label ?? String(h.block.type) }),
        onReorder: (h, p, b) => {
          x.move(p, b), n(h.map((S) => S.block));
        },
        children: ({ block: h, index: p, key: b }, { handle: S }) => {
          const k = c.find((N) => N.type === h.type), $ = Z(r, `${p}.values`), w = u.isCollapsed(b, Object.keys($).length > 0 || r[`${p}.type`] !== void 0);
          return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              Tt,
              {
                label: k?.label ?? String(h.type),
                summary: k ? Qe(k.fields, oe(h.values)) : null,
                badge: !0,
                handle: S,
                onRemove: () => o(p),
                collapsed: w,
                onToggle: () => u.toggle(b),
                controls: `${i}-${p}-fields`,
                hidden: h.hidden === !0,
                onHidden: (N) => d(p, { ...h, hidden: N })
              }
            ),
            /* @__PURE__ */ e.jsx("div", { id: `${i}-${p}-fields`, hidden: w, children: w ? null : k ? /* @__PURE__ */ e.jsx(
              me,
              {
                fields: k.fields,
                value: oe(h.values),
                onChange: (N) => d(p, { ...h, values: N }),
                errors: $,
                id: `${i}-${p}`,
                content: !0
              }
            ) : /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: t("This kind of block no longer exists. Its values are kept.") }) }),
            /* @__PURE__ */ e.jsx(A, { message: r[`${p}.type`] })
          ] });
        }
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
        /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", disabled: c.length === 0, children: [
          /* @__PURE__ */ e.jsx(J, {}),
          " ",
          t("Add block")
        ] }) }),
        /* @__PURE__ */ e.jsx(a.DropdownMenuContent, { align: "start", children: c.map((h) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => n([...m, Sa(h.type)]), children: h.label }, h.type)) })
      ] }),
      /* @__PURE__ */ e.jsx(_t, { keys: g.map((h) => h.key), folding: u })
    ] })
  ] });
}
function Tt({ label: s, summary: l, badge: n = !1, handle: r, onRemove: i, collapsed: c, onToggle: m, controls: x, hidden: d, onHidden: o }) {
  const g = c ? ge : Ge, u = l ? `${s}: ${l}` : s;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(a.SortableHandle, { ...r, label: t("Move :title", { title: u }) }),
    /* @__PURE__ */ e.jsxs(
      "button",
      {
        type: "button",
        onClick: m,
        "aria-expanded": !c,
        "aria-controls": x,
        className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:rounded-md cms:text-left cms:outline-none cms:focus-visible:ring-2 cms:focus-visible:ring-ring",
        children: [
          /* @__PURE__ */ e.jsx(g, { className: "cms:size-4 cms:shrink-0 cms:text-muted-foreground", "aria-hidden": !0 }),
          n ? /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: s }) : /* @__PURE__ */ e.jsx("span", { className: "cms:shrink-0 cms:text-sm cms:font-medium", children: s }),
          l && /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:text-sm cms:text-muted-foreground", children: l }),
          /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: c ? t("(collapsed)") : "" })
        ]
      }
    ),
    d !== void 0 && /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:shrink-0 cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", title: t("Off: kept here, but left out of the page"), children: [
      /* @__PURE__ */ e.jsx(a.Switch, { checked: !d, onCheckedChange: (h) => o(!h), "aria-label": t(":title: visible on site", { title: u }) }),
      t("Visible on site")
    ] }),
    /* @__PURE__ */ e.jsx(
      a.Button,
      {
        type: "button",
        variant: "ghost",
        size: "icon",
        className: "cms:size-8 cms:shrink-0 cms:text-destructive",
        "aria-label": t("Remove :title", { title: u }),
        onClick: i,
        children: /* @__PURE__ */ e.jsx(W, {})
      }
    )
  ] });
}
function Bt({ fields: s, onChange: l, types: n, errors: r, depth: i = 1, idPrefix: c = "field", reserved: m, locales: x = [] }) {
  const [d, o] = _.useState(() => /* @__PURE__ */ new Set()), g = (p) => o((b) => {
    const S = new Set(b);
    return S.has(p) ? S.delete(p) : S.add(p), S;
  }), u = (p, b) => l(s.map((S, k) => k === p ? b : S)), h = (p) => {
    const b = Ma(p.type, p.label, s);
    l([...s, b]), o(/* @__PURE__ */ new Set([b.key]));
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:border-dashed cms:p-4 cms:text-sm cms:text-muted-foreground", children: t("No fields yet.") }),
    s.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:justify-end", children: d.size > 0 ? /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => o(/* @__PURE__ */ new Set()), children: t("Close all") }) : /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => o(new Set(s.map((p) => p.key))), children: t("Open all") }) }),
    /* @__PURE__ */ e.jsx(a.SortableList, { items: s, getId: (p) => p.key, getLabel: (p) => p.label || p.handle, onReorder: (p) => l(p), children: (p, { index: b, handle: S, isOverlay: k }) => {
      const $ = n.find((L) => L.type === p.type), w = je(r, String(b)) || wt(p, s, m) !== null, N = !k && (d.has(p.key) || w), f = `${c}-${p.key}`;
      return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${w ? "cms:border-destructive" : ""}`, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:p-2", children: [
          /* @__PURE__ */ e.jsx(a.SortableHandle, { ...S, label: t("Move :title", { title: p.label || p.handle }) }),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-expanded": N,
              "aria-controls": f,
              "aria-label": N ? t("Close :title", { title: p.label || p.handle }) : t("Open :title", { title: p.label || p.handle }),
              onClick: () => g(p.key),
              children: N ? /* @__PURE__ */ e.jsx(Ge, {}) : /* @__PURE__ */ e.jsx(ge, {})
            }
          ),
          /* @__PURE__ */ e.jsxs("button", { type: "button", className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:text-left", onClick: () => g(p.key), children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: p.label || p.handle }),
            /* @__PURE__ */ e.jsx("code", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", children: p.handle })
          ] }),
          p.required && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", children: t("Required") }),
          /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: $?.label ?? p.type }),
          $?.hasChildren && p.fields.length > 0 && !N && /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: t(":count inside", { count: p.fields.length }) }),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": t("Remove :title", { title: p.label || p.handle }),
              onClick: () => l(s.filter((L, T) => T !== b)),
              children: /* @__PURE__ */ e.jsx(W, {})
            }
          )
        ] }),
        N && /* @__PURE__ */ e.jsx(
          Va,
          {
            id: f,
            field: p,
            type: $,
            siblings: s,
            onChange: (L) => u(b, L),
            types: n,
            errors: ue(r, String(b)),
            depth: i,
            reserved: m,
            locales: x
          }
        )
      ] });
    } }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", children: [
        /* @__PURE__ */ e.jsx(J, {}),
        " ",
        t("Add field")
      ] }) }),
      /* @__PURE__ */ e.jsx(a.DropdownMenuContent, { align: "start", children: n.filter((p) => !p.hasChildren || i < Ba).map((p) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => h(p), children: p.label }, p.type)) })
    ] }) })
  ] });
}
const ae = { default: "__default", yes: "yes", no: "no" };
function Va({ id: s, field: l, type: n, siblings: r, onChange: i, types: c, errors: m, depth: x, reserved: d, locales: o }) {
  const g = l.config ?? {}, u = wt(l, r, d, t);
  return l.type === "fieldset" ? /* @__PURE__ */ e.jsxs("div", { id: s, className: "cms:flex cms:flex-col cms:gap-4 cms:border-t cms:p-4", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-label`, children: t("Label") }),
        /* @__PURE__ */ e.jsx(a.Input, { id: `${s}-label`, value: l.label ?? "", onChange: (h) => i(os(l, h.target.value, r)) }),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("Only shown here, in the builder.") })
      ] }),
      n?.settings.map((h) => /* @__PURE__ */ e.jsx(
        ne,
        {
          id: `${s}-config-${h.handle}`,
          field: h,
          value: g[h.handle],
          errors: Z(m, `config.${h.handle}`),
          onChange: (p) => i({ ...l, config: { ...g, [h.handle]: p } })
        },
        h.handle
      ))
    ] }),
    /* @__PURE__ */ e.jsx(A, { message: m.handle ?? m.type })
  ] }) : /* @__PURE__ */ e.jsxs("div", { id: s, className: "cms:flex cms:flex-col cms:gap-4 cms:border-t cms:p-4", children: [
    !n && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t(`The field type ":type" isn't registered. Its data is kept; register the type or remove the field.`, { type: l.type }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-label`, children: t("Label") }),
        /* @__PURE__ */ e.jsx(a.Input, { id: `${s}-label`, value: l.label ?? "", onChange: (h) => i(os(l, h.target.value, r)) }),
        /* @__PURE__ */ e.jsx(A, { message: m.label })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-handle`, children: t("Handle") }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: `${s}-handle`,
            className: "cms:font-mono",
            value: l.handle,
            onChange: (h) => i({ ...l, handle: Nt(h.target.value), handleTouched: !0 })
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("How templates read it. Renaming it hides values saved under the old one.") }),
        /* @__PURE__ */ e.jsx(A, { message: m.handle ?? u ?? void 0 })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-instructions`, children: t("Instructions") }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: `${s}-instructions`,
          value: l.instructions ?? "",
          placeholder: t("Shown under the field to editors"),
          onChange: (h) => i({ ...l, instructions: h.target.value || null })
        }
      ),
      /* @__PURE__ */ e.jsx(A, { message: m.instructions })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-6", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Switch, { id: `${s}-required`, checked: l.required === !0, onCheckedChange: (h) => i({ ...l, required: h }) }),
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-required`, children: t("Required") })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-translatable`, children: t("Per language") }),
        /* @__PURE__ */ e.jsxs(
          a.Select,
          {
            value: l.translatable === !0 ? ae.yes : l.translatable === !1 ? ae.no : ae.default,
            onValueChange: (h) => i({ ...l, translatable: h === ae.yes ? !0 : h === ae.no ? !1 : null }),
            children: [
              /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: `${s}-translatable`, className: "cms:w-48", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
              /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: ae.default, children: t("As the type decides") }),
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: ae.yes, children: t("Yes, translated") }),
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: ae.no, children: t("No, shared") })
              ] })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(Ka, { id: s, field: l, siblings: r, onChange: i, errors: ue(m, "condition") }),
    o.length > 0 && /* @__PURE__ */ e.jsx(Ua, { id: s, field: l, locales: o, onChange: i, errors: ue(m, "translations") }),
    (n?.settings.length ?? 0) > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: n?.settings.map((h) => /* @__PURE__ */ e.jsx(
      ne,
      {
        id: `${s}-config-${h.handle}`,
        field: h,
        value: g[h.handle],
        errors: Z(m, `config.${h.handle}`),
        onChange: (p) => i({ ...l, config: { ...g, [h.handle]: p } })
      },
      h.handle
    )) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-validation`, children: t("Extra rules") }),
      /* @__PURE__ */ e.jsx(
        a.Textarea,
        {
          id: `${s}-validation`,
          rows: 2,
          className: "cms:font-mono",
          value: (l.validation ?? []).join(`
`),
          onChange: (h) => i({ ...l, validation: h.target.value.split(`
`) })
        }
      ),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: Wa(t("Optional checks, one per line, such as :email or :max (for developers: Laravel validation rules)."), { email: "email", max: "max:100" }) }),
      /* @__PURE__ */ e.jsx(A, { message: m.validation ?? Object.entries(m).find(([h]) => h.startsWith("validation."))?.[1] })
    ] }),
    n?.hasChildren && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { children: t("Fields inside") }),
      /* @__PURE__ */ e.jsx(
        Bt,
        {
          fields: l.fields,
          onChange: (h) => i({ ...l, fields: h }),
          types: c,
          errors: ue(m, "fields"),
          depth: x + 1,
          idPrefix: s,
          locales: o
        }
      ),
      /* @__PURE__ */ e.jsx(A, { message: m.fields })
    ] }),
    /* @__PURE__ */ e.jsx(A, { message: m.type })
  ] });
}
function Ua({ id: s, field: l, locales: n, onChange: r, errors: i }) {
  const c = l.translations ?? {}, m = l.type === "select" && Array.isArray(l.config?.options) ? l.config.options.filter((o) => typeof o?.value == "string" && o.value !== "") : [], x = (o, g) => {
    const u = { ...c, [o]: { ...c[o], ...g } };
    r({ ...l, translations: u });
  }, d = Object.entries(i).find(([, o]) => o)?.[1];
  return /* @__PURE__ */ e.jsxs("details", { className: "cms:rounded-lg cms:border cms:p-3", open: Object.keys(c).length > 0 || d !== void 0, children: [
    /* @__PURE__ */ e.jsx("summary", { className: "cms:cursor-pointer cms:text-sm cms:font-medium", children: t("In other languages") }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:mt-2 cms:text-sm cms:text-muted-foreground", children: t("What visitors read in each language, as forms show it. Empty: as above.") }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:mt-3 cms:flex cms:flex-col cms:gap-4", children: n.map(({ code: o, name: g }) => /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-3 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(a.Label, { htmlFor: `${s}-label-${o}`, children: [
          "Label (",
          g,
          ")"
        ] }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: `${s}-label-${o}`,
            value: c[o]?.label ?? "",
            placeholder: l.label ?? "",
            onChange: (u) => x(o, { label: u.target.value })
          }
        )
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(a.Label, { htmlFor: `${s}-instructions-${o}`, children: [
          "Instructions (",
          g,
          ")"
        ] }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: `${s}-instructions-${o}`,
            value: c[o]?.instructions ?? "",
            placeholder: l.instructions ?? "",
            onChange: (u) => x(o, { instructions: u.target.value })
          }
        )
      ] }),
      m.length > 0 && /* @__PURE__ */ e.jsxs("fieldset", { className: "cms:flex cms:flex-col cms:gap-2 cms:md:col-span-2", children: [
        /* @__PURE__ */ e.jsxs("legend", { className: "cms:text-sm cms:font-medium", children: [
          "Options (",
          g,
          ")"
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-2 cms:sm:grid-cols-2", children: m.map((u) => {
          const h = String(u.value);
          return /* @__PURE__ */ e.jsx(
            a.Input,
            {
              "aria-label": `${h} (${g})`,
              value: c[o]?.options?.[h] ?? "",
              placeholder: typeof u.label == "string" && u.label !== "" ? u.label : h,
              onChange: (p) => x(o, { options: { ...c[o]?.options, [h]: p.target.value } })
            },
            h
          );
        }) })
      ] })
    ] }, o)) }),
    /* @__PURE__ */ e.jsx(A, { message: d })
  ] });
}
const Ie = "__always";
function qa(s) {
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
function Ka({ id: s, field: l, siblings: n, onChange: r, errors: i }) {
  const c = n.filter((o) => o.key !== l.key && o.handle !== ""), m = l.condition ?? null, x = Le.find((o) => o.value === m?.operator) ?? Le[0], d = (o) => r({ ...l, condition: o === null ? null : { field: m?.field ?? c[0]?.handle ?? "", operator: m?.operator ?? "equals", value: m?.value ?? "", ...o } });
  return c.length === 0 && m === null ? null : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-condition`, children: t("Show") }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(a.Select, { value: m?.field ?? Ie, onValueChange: (o) => d(o === Ie ? null : { field: o }), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: `${s}-condition`, className: "cms:w-56", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
          /* @__PURE__ */ e.jsx(a.SelectItem, { value: Ie, children: t("Always") }),
          c.map((o) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: o.handle, children: t("When :field", { field: o.label || o.handle }) }, o.key))
        ] })
      ] }),
      m && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(a.Select, { value: x.value, onValueChange: (o) => d({ operator: o }), children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { "aria-label": t("How to compare"), className: "cms:w-36", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: Le.map((o) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: o.value, children: qa(o.value) }, o.value)) })
        ] }),
        x.needsValue && /* @__PURE__ */ e.jsx(
          a.Input,
          {
            "aria-label": t("Value"),
            className: "cms:w-48",
            placeholder: t("a value, or true / false"),
            value: String(m.value ?? ""),
            onChange: (o) => d({ value: o.target.value })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("A hidden field isn't required, and keeps what it had.") }),
    /* @__PURE__ */ e.jsx(A, { message: i.field ?? i.operator ?? i.value ?? i[""] })
  ] });
}
function Wa(s, l) {
  return s.split(/(:[a-z_]+)/).map((n, r) => {
    const i = l[n.slice(1)];
    return n.startsWith(":") && i !== void 0 ? /* @__PURE__ */ e.jsx("code", { children: i }, r) : n;
  });
}
function Ga(s, l) {
  return t(s === "fieldset" ? l ? "Set when it was created: flexible blocks keep it with what they hold." : "Lowercase letters, digits and underscores. It can't change later: flexible blocks keep it with what they hold." : l ? "Changing it updates the collections, taxonomies, global sets, forms and entries that use it." : "Lowercase letters, digits and underscores, made from the title until you type one.");
}
function us({ kind: s = "blueprint", blueprint: l, fieldTypes: n, locales: r = [], usedBy: i = [], reserved: c = [] }) {
  const m = s === "fieldset", x = z(m ? "cms/fieldsets" : "cms/blueprints"), d = l ? l.title : t(m ? "New fieldset" : "New blueprint");
  a.useBreadcrumbs([{ label: t(m ? "Fieldsets" : "Blueprints"), href: x }, { label: d }]);
  const [o, g] = ce(), u = C.useForm({ title: l?.title ?? "", handle: l?.handle ?? "" }), [h, p] = _.useState(l !== null), [b, S] = _.useState(() => Ct(l?.fields)), k = (D) => n.find((F) => F.type === D)?.hasChildren === !0, $ = u.errors, [w, N] = _.useState(() => JSON.stringify(b)), f = u.isDirty || JSON.stringify(b) !== w, L = () => {
    u.setDefaults(), N(JSON.stringify(b));
  }, T = () => {
    u.processing || (u.transform((D) => ({
      // A blueprint's handle can change (RenameBlueprint); a fieldset's can't: flexible blocks store it.
      ...l ? s === "blueprint" ? { title: D.title, handle: D.handle } : { title: D.title } : D,
      fields: kt(b, k)
    })), l ? u.put(`${x}/${l.handle}`, { preserveScroll: !0, onSuccess: L }) : u.post(x, { onSuccess: L }));
  }, v = (D) => {
    D.preventDefault(), T();
  };
  a.useUnsavedChanges(f, T);
  const M = () => l && o(
    m ? t('Delete the fieldset ":title"? Content keeps its values.', { title: l.title }) : t('Delete the blueprint ":title"? Content keeps its values.', { title: l.title }),
    () => C.router.delete(`${x}/${l.handle}`, { preserveScroll: !0 })
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: v, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: d }),
    g,
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: d,
        back: { href: x, label: t(m ? "Back to fieldsets" : "Back to blueprints") },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          l && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "icon", className: "cms:text-destructive", "aria-label": t("Delete :title", { title: d }), onClick: M, children: /* @__PURE__ */ e.jsx(W, {}) }),
          /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: u.processing, children: [
            u.processing && /* @__PURE__ */ e.jsx(de, { className: "cms:animate-spin" }),
            t(l ? "Save" : m ? "Create fieldset" : "Create blueprint")
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(A, { message: $.blueprint ?? $.fieldset }),
    /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "title", children: t("Title") }),
        /* @__PURE__ */ e.jsx(a.Input, { id: "title", value: u.data.title, required: !0, onChange: (D) => {
          u.setData((F) => ({ ...F, title: D.target.value, handle: h ? F.handle : yt(D.target.value) }));
        } }),
        /* @__PURE__ */ e.jsx(A, { message: $.title })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "handle", children: t("Handle") }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: "handle",
            className: "cms:font-mono",
            value: u.data.handle,
            disabled: l !== null && s === "fieldset",
            required: !0,
            spellCheck: !1,
            onChange: (D) => {
              p(!0), u.setData("handle", Nt(D.target.value));
            }
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: Ga(s, l !== null) }),
        /* @__PURE__ */ e.jsx(A, { message: $.handle })
      ] })
    ] }) }),
    i.length > 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("Used by :list. Changes show there at once.", { list: i.join(", ") }) }),
    /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-3", "aria-labelledby": "fields-heading", children: [
      /* @__PURE__ */ e.jsx("h2", { id: "fields-heading", className: "cms:text-lg cms:font-medium", children: t("Fields") }),
      /* @__PURE__ */ e.jsx(Bt, { fields: b, onChange: S, types: n, errors: ue($, "fields"), reserved: s === "blueprint" ? c : void 0, locales: r.slice(1) }),
      /* @__PURE__ */ e.jsx(A, { message: $.fields })
    ] })
  ] });
}
function Lt({ kind: s, base: l, rows: n, intro: r }) {
  const i = s === "blueprint", c = t(i ? "Blueprints" : "Fieldsets");
  a.useBreadcrumbs([{ label: c }]);
  const [m, x] = ce();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: c }),
    x,
    /* @__PURE__ */ e.jsx(a.PageHeader, { title: c, description: r, actions: /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(C.Link, { href: `${l}/create`, children: [
      /* @__PURE__ */ e.jsx(J, {}),
      " ",
      t(i ? "New blueprint" : "New fieldset")
    ] }) }) }),
    /* @__PURE__ */ e.jsx(a.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(a.Table, { children: [
      /* @__PURE__ */ e.jsx(a.TableHeader, { children: /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
        /* @__PURE__ */ e.jsx(a.TableHead, { children: t("Title") }),
        /* @__PURE__ */ e.jsx(a.TableHead, { children: t("Handle") }),
        /* @__PURE__ */ e.jsx(a.TableHead, { children: t("Fields") }),
        n.some((d) => d.usedBy) && /* @__PURE__ */ e.jsx(a.TableHead, { children: t("Used by") }),
        /* @__PURE__ */ e.jsx(a.TableHead, { className: "cms:w-12", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: t("Actions") }) })
      ] }) }),
      /* @__PURE__ */ e.jsxs(a.TableBody, { children: [
        n.length === 0 && /* @__PURE__ */ e.jsx(a.TableRow, { children: /* @__PURE__ */ e.jsx(a.TableCell, { colSpan: 5, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: t(i ? "No blueprints yet." : "No fieldsets yet.") }) }),
        n.map((d) => /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx(C.Link, { href: `${l}/${d.handle}/edit`, className: "cms:font-medium cms:hover:underline", children: d.title }) }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: d.handle }) }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: d.fields }),
          d.usedBy && /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:text-muted-foreground", children: d.usedBy.join(", ") || "—" }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx(
            a.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": t("Delete :title", { title: d.title }),
              onClick: () => m(
                i ? t('Delete the blueprint ":title"? Content keeps its values.', { title: d.title }) : t('Delete the fieldset ":title"? Content keeps its values.', { title: d.title }),
                () => C.router.delete(`${l}/${d.handle}`, { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(W, {})
            }
          ) })
        ] }, d.id))
      ] })
    ] }) })
  ] });
}
function Ya({ blueprints: s }) {
  const l = C.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(A, { message: l.blueprint }),
    /* @__PURE__ */ e.jsx(
      Lt,
      {
        kind: "blueprint",
        base: z("cms/blueprints"),
        rows: s,
        intro: t("The fields editors fill in, for each kind of content.")
      }
    )
  ] });
}
const hs = (s) => `resources/views/${s.replace(/\./g, "/")}.blade.php`;
function Mt({ example: s, fallbacks: l }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1 cms:text-xs cms:leading-relaxed cms:text-muted-foreground", children: [
    /* @__PURE__ */ e.jsx("p", { children: t("A Blade view: :example is :file.", { example: "\0", file: "" }).split(/(\u0000|\u0001)/).map((n, r) => n === "\0" ? /* @__PURE__ */ e.jsx("code", { className: "cms:text-foreground", children: s }, r) : n === "" ? /* @__PURE__ */ e.jsx("code", { className: "cms:break-all", children: hs(s) }, r) : n) }),
    /* @__PURE__ */ e.jsx("p", { children: t("Empty: the first that exists of") }),
    /* @__PURE__ */ e.jsxs("ol", { className: "cms:ml-4 cms:list-decimal", children: [
      l.map((n) => /* @__PURE__ */ e.jsx("li", { children: n.includes(" ") ? n : /* @__PURE__ */ e.jsx("code", { className: "cms:break-all", children: hs(n) }) }, n)),
      /* @__PURE__ */ e.jsx("li", { children: t("the built-in template") })
    ] })
  ] });
}
const xs = { preserveScroll: !0, preserveState: !0 };
function Ja({ entryId: s, comments: l }) {
  const [n, r] = _.useState(null), [i, c] = _.useState(""), [m, x] = _.useState(!1), d = (g, u) => C.router.post(z(`cms/comments/${g}/status`), { status: u }, xs), o = (g) => C.router.post(z(`cms/comments/${g}/reply`), { body: i }, {
    ...xs,
    onStart: () => x(!0),
    onFinish: () => x(!1),
    onSuccess: () => {
      r(null), c("");
    }
  });
  return /* @__PURE__ */ e.jsx(
    a.CollapsibleCard,
    {
      title: t("Comments"),
      titleClassName: "cms:text-base",
      storageKey: "cms:entry:comments",
      contentClassName: "cms:flex cms:flex-col cms:gap-3 cms:text-sm",
      headerAction: l && l.counts.pending > 0 ? /* @__PURE__ */ e.jsx(a.Badge, { children: t(":count pending", { count: l.counts.pending }) }) : void 0,
      children: l ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t(":approved approved · :pending pending · :spam spam", { approved: l.counts.approved, pending: l.counts.pending, spam: l.counts.spam }) }),
        l.latest.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("No comments yet.") }),
        l.latest.map((g) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5 cms:border-t cms:border-border/70 cms:pt-3 cms:first-of-type:border-t-0 cms:first-of-type:pt-0", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium", children: g.author }),
            g.status === "pending" && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", children: t("Pending") })
          ] }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:line-clamp-3 cms:break-words cms:whitespace-pre-line", children: g.excerpt }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
            K(g.createdAt),
            g.reply ? ` · ${t("a reply")}` : ""
          ] }),
          l.canModerate && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-1", children: [
            g.status === "pending" && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => d(g.id, "approved"), children: [
              /* @__PURE__ */ e.jsx(Se, {}),
              " ",
              t("Approve")
            ] }),
            /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => d(g.id, "spam"), children: [
              /* @__PURE__ */ e.jsx(Ue, {}),
              " ",
              t("Spam")
            ] }),
            /* @__PURE__ */ e.jsxs(
              a.Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                "aria-expanded": n === g.id,
                onClick: () => {
                  r(n === g.id ? null : g.id), c("");
                },
                children: [
                  /* @__PURE__ */ e.jsx(at, {}),
                  " ",
                  t("Reply")
                ]
              }
            )
          ] }),
          n === g.id && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              a.Textarea,
              {
                "aria-label": t("Reply to :author", { author: g.author }),
                rows: 3,
                value: i,
                onChange: (u) => c(u.target.value)
              }
            ),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
              /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "sm", disabled: i.trim() === "" || m, onClick: () => o(g.id), children: t("Post reply") }),
              /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => r(null), children: t("Cancel") })
            ] })
          ] })
        ] }, g.id)),
        /* @__PURE__ */ e.jsx("a", { href: z(`cms/comments?entry=${s}`), className: "cms:text-sm cms:font-medium cms:underline-offset-4 cms:hover:underline", children: t("All comments on this entry") })
      ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-10" }),
        /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-10" })
      ] })
    }
  );
}
const zt = "cms:flex cms:flex-col cms:gap-1 cms:opacity-60";
function Xe({ fields: s, values: l, onChange: n, errors: r, storageKey: i, shared: c = [], sharedValues: m = {}, sharedNote: x, disabled: d = !1 }) {
  const o = [], g = { ...m, ...l };
  for (const h of s.filter((p) => Ze(p, g))) {
    const p = o[o.length - 1];
    h.type === "group" ? o.push(h) : Array.isArray(p) ? p.push(h) : o.push([h]);
  }
  const u = x && (c.length > 0 || Ce(s)) ? /* @__PURE__ */ e.jsx("p", { role: "note", className: "cms:rounded-lg cms:border cms:border-dashed cms:px-3 cms:py-2 cms:text-sm cms:text-muted-foreground", children: x }) : null;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    u,
    o.map((h) => {
      if (Array.isArray(h))
        return /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsx(a.CardContent, { children: /* @__PURE__ */ e.jsx("fieldset", { disabled: d, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: h.map((k) => c.includes(k.handle) ? /* @__PURE__ */ e.jsx("fieldset", { disabled: !0, className: zt, title: t("Shared by all languages"), children: /* @__PURE__ */ e.jsx(ne, { id: `data-${k.handle}`, field: k, content: !0, value: m[k.handle], errors: {}, onChange: () => {
        } }) }, k.handle) : /* @__PURE__ */ e.jsx(
          ne,
          {
            id: `data-${k.handle}`,
            field: k,
            content: !0,
            value: l[k.handle],
            errors: Z(r, `data.${k.handle}`),
            onChange: ($) => n(k.handle, $)
          },
          k.handle
        )) }) }) }, `fields-${h[0]?.handle ?? ""}`);
      const p = c.includes(h.handle), b = (p ? m : l)[h.handle], S = Z(r, `data.${h.handle}`);
      return /* @__PURE__ */ e.jsx(
        a.CollapsibleCard,
        {
          title: ke(h),
          titleClassName: "cms:text-base",
          description: h.instructions ?? void 0,
          storageKey: `${i}:${h.handle}`,
          hasErrors: !p && je(r, `data.${h.handle}`),
          children: /* @__PURE__ */ e.jsxs(
            "fieldset",
            {
              disabled: p || d,
              role: "group",
              "aria-label": ke(h),
              className: `cms:flex cms:flex-col cms:gap-2 ${p ? "cms:opacity-60" : ""}`,
              title: p ? t("Shared by all languages") : void 0,
              children: [
                /* @__PURE__ */ e.jsx(
                  me,
                  {
                    bare: !0,
                    fields: h.fields ?? [],
                    id: `data-${h.handle}`,
                    content: !0,
                    errors: p ? {} : S,
                    value: b && typeof b == "object" && !Array.isArray(b) ? b : {},
                    onChange: (k) => n(h.handle, k)
                  }
                ),
                /* @__PURE__ */ e.jsx(A, { message: p ? void 0 : S[""] })
              ]
            }
          )
        },
        h.handle
      );
    })
  ] });
}
function es() {
  return [
    { handle: "title", type: "text", label: t("Meta title"), instructions: t("Empty: the title."), config: { max: 255 } },
    { handle: "description", type: "textarea", label: t("Meta description"), instructions: t("A sentence or two for search results."), config: { max: 500 } },
    { handle: "canonical", type: "text", label: t("Canonical URL"), instructions: t("Only if this page copies another: that page's address. Empty: this page."), config: { max: 2e3 } },
    { handle: "image", type: "media", label: t("Open Graph image"), instructions: t("Shown when the page is shared."), config: { types: ["image"] } },
    { handle: "noindex", type: "toggle", label: t("Hide from search engines (noindex)") }
  ];
}
function ps(s) {
  if (s.length === 0) return "";
  const l = s.slice(0, 5).map((n) => n.label).join("; ");
  return ` ${s.length > 5 ? t("It's used by :list and :count more: those links will show nothing.", { list: l, count: s.length - 5 }) : t("It's used by :list: those links will show nothing.", { list: l })}`;
}
function Qa(s) {
  const { entry: l } = s;
  return /* @__PURE__ */ e.jsx(Za, { ...s }, l ? `${l.id}:${l.locale}:${l.version}:${l.status}:${l.trashed}:${l.publishedAt}` : "new");
}
function Za({ collection: s, fields: l, locales: n = [], shared: r = [], sharedValues: i = {}, entry: c, values: m, revisions: x, comments: d, termLabels: o, usedBy: g = [], undoRestore: u = null, machineTranslate: h = null, machineTranslateMissing: p = !1, settings: b, blueprints: S = [], homepage: k, can: $ }) {
  const w = z(`cms/collections/${s.handle}/entries`), N = c ? z(`cms/entries/${c.id}`) : w, f = c ? m.title : t("New entry");
  a.useBreadcrumbs([{ label: s.title, href: w }, { label: f }]);
  const [L, T] = ce(), [v, M] = _.useState(!1), [D, F] = _.useState(null), j = C.useForm({
    ...m,
    seo: m.seo ?? {},
    locale: c?.locale ?? null,
    version: c?.version ?? null,
    publish: !1,
    published_at: null,
    parent_id: b?.parentId ?? null,
    template: b?.template ?? "",
    comments_closed: b?.commentsClosed === !0
  }), E = (B) => j.setData((U) => ({ ...U, ...B })), R = c ? { locale: c.locale } : {}, G = n.find((B) => B.main)?.code, V = j.errors, X = C.usePage().props.errors ?? {}, re = (B) => {
    const U = De(V, B);
    U.length > 0 && j.clearErrors(...U);
  }, Q = c !== null && c.status !== "draft" && !c.hasUnpublishedChanges && !j.isDirty, be = c === null ? $.create : $.update && !c.trashed, te = c?.status === "scheduled", ve = (B) => {
    if (b || c === null) return B;
    const { parent_id: U, template: Y, comments_closed: Kl, ...Ot } = B;
    return Ot;
  }, y = (B = !1, U = null) => {
    j.transform((Y) => ({ ...ve(Y), publish: B, published_at: U })), c ? j.put(N, { preserveScroll: !0, onSuccess: () => M(!1) }) : j.post(N);
  }, O = () => {
    j.transform((B) => ({ ...ve(B), version: null, publish: !1, published_at: null })), j.put(N, { preserveScroll: !0 });
  }, H = a.useEditLock({
    type: "cms.entry",
    id: c?.id,
    locale: c?.locale,
    enabled: c !== null && be,
    noun: t("entry"),
    leaveTo: w,
    getUnsaved: () => j.isDirty ? { title: j.data.title, slug: j.data.slug, data: j.data.data, seo: j.data.seo } : null
  }), q = be && !H.readOnly, _e = async (B) => {
    const U = await H.loadKept(B);
    j.setData((Y) => ({ ...Y, title: U.title ?? Y.title, slug: U.slug ?? Y.slug, data: U.data ?? Y.data, seo: U.seo ?? Y.seo }));
  };
  a.useUnsavedChanges(j.isDirty && !H.takenOver, q ? () => j.processing || y() : void 0);
  const Pt = () => {
    const B = () => C.router.post(`${N}/review`, R, { preserveScroll: !0 });
    j.isDirty ? (j.transform((U) => ({ ...U, publish: !1, published_at: null })), j.put(N, { preserveScroll: !0, onSuccess: B })) : B();
  }, ye = (B = null) => {
    $.update ? y(!0, B) : c && C.router.post(`${N}/publish`, { ...R, published_at: B }, { preserveScroll: !0, onSuccess: () => M(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (B) => {
    B.preventDefault(), y();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: f }),
    T,
    H.dialogs,
    /* @__PURE__ */ e.jsxs(
      a.PageHeader,
      {
        title: f,
        back: { href: w, label: t("Back to :title", { title: s.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          c && !c.trashed && s.pages !== !1 && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(
            "a",
            {
              href: c.previewUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              title: j.isDirty ? t("Shows the saved draft: save first to see your changes.") : t("Shows the saved draft."),
              children: [
                /* @__PURE__ */ e.jsx(ia, {}),
                " ",
                t("Preview")
              ]
            }
          ) }),
          c?.url && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: c.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(he, {}),
            " ",
            t("View page")
          ] }) }),
          c?.trashed && $.delete && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", onClick: () => C.router.post(`${N}/restore`, {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(xe, {}),
            " ",
            t("Restore")
          ] }),
          c?.trashed && $.delete && /* @__PURE__ */ e.jsxs(
            a.Button,
            {
              type: "button",
              variant: "outline",
              className: "cms:text-destructive",
              onClick: () => L(
                t(`Delete ":title" for good, in every language, with its revisions? This can't be undone.`, { title: m.title }) + ps(g),
                () => C.router.delete(`${N}/force`, { data: g.length > 0 ? { force: 1 } : {} })
              ),
              children: [
                /* @__PURE__ */ e.jsx(W, {}),
                " ",
                t("Delete for good")
              ]
            }
          ),
          c && !c.trashed && ($.create || $.delete && !H.readOnly || q && h !== null) && /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "icon", "aria-label": t("More actions"), children: /* @__PURE__ */ e.jsx(Us, {}) }) }),
            /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", className: "cms:min-w-52", children: [
              q && h !== null && /* @__PURE__ */ e.jsxs(
                a.DropdownMenuItem,
                {
                  disabled: j.processing || j.isDirty,
                  title: j.isDirty ? void 0 : t("Fill in what isn't translated yet, into the draft"),
                  onSelect: () => C.router.post(z(`cms/entries/${c.id}/translations/${c.locale}/translate`), { version: c.version }, { preserveScroll: !0 }),
                  children: [
                    /* @__PURE__ */ e.jsx(ns, {}),
                    " ",
                    j.isDirty ? t("Save to translate") : t("Translate from :language", { language: n.find((B) => B.main)?.name ?? (G ? P(G) : t("the main language")) })
                  ]
                }
              ),
              $.create && /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { title: t("Copy every language as a new draft"), onSelect: () => C.router.post(`${N}/duplicate`), children: [
                /* @__PURE__ */ e.jsx(ca, {}),
                " ",
                t("Duplicate")
              ] }),
              $.delete && !H.readOnly && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
                /* @__PURE__ */ e.jsxs(
                  a.DropdownMenuItem,
                  {
                    className: "cms:text-destructive",
                    onSelect: () => L(t('Move ":title" to the trash? It comes off the site; you can restore it.', { title: m.title }) + ps(g), () => C.router.delete(N), t("Move to trash")),
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
          c && q && p && /* @__PURE__ */ e.jsxs("span", { title: t("Machine translation isn't set up on this site: ask your developer (SUNRICE_TRANSLATE_DRIVER, see Help → Developer docs → Machine translation)."), children: [
            /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", disabled: !0, "aria-describedby": "machine-translate-missing", children: [
              /* @__PURE__ */ e.jsx(ns, {}),
              " ",
              t("Translate from :language", { language: n.find((B) => B.main)?.name ?? (G ? P(G) : t("the main language")) })
            ] }),
            /* @__PURE__ */ e.jsx("span", { id: "machine-translate-missing", className: "cms:sr-only", children: t("Machine translation isn't set up on this site: ask your developer.") })
          ] }),
          q && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", variant: c ? "outline" : "default", disabled: j.processing, children: [
            j.processing && /* @__PURE__ */ e.jsx(de, { className: "cms:animate-spin" }),
            t(c ? "Save draft" : "Create draft")
          ] }),
          c && !c.trashed && q && !$.publish && (c.status === "draft" || c.hasUnpublishedChanges || j.isDirty) && /* @__PURE__ */ e.jsxs(
            a.Button,
            {
              type: "button",
              disabled: j.processing,
              onClick: Pt,
              title: c.review ? t("Already sent; sending again tells them again") : t("Ask those who can publish to review it"),
              children: [
                /* @__PURE__ */ e.jsx(fa, {}),
                " ",
                c.review ? t("Send for review again") : t("Submit for review")
              ]
            }
          ),
          c && !c.trashed && $.publish && !H.readOnly && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex", children: [
            te && Q ? /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", className: "cms:rounded-r-none", disabled: j.processing, title: t("Change the date"), onClick: () => M(!0), children: [
              /* @__PURE__ */ e.jsx(Ve, {}),
              " ",
              t("Scheduled for :date", { date: K(c.publishedAt) })
            ] }) : /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: Q ? "outline" : "default", className: "cms:rounded-r-none cms:disabled:opacity-100", disabled: j.processing || Q, onClick: () => ye(), children: [
              Q && /* @__PURE__ */ e.jsx(Se, { className: "cms:text-emerald-600 cms:dark:text-emerald-400" }),
              c.status === "draft" ? t("Publish") : t(Q ? "Published" : "Publish changes")
            ] }),
            /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
              /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "icon", variant: Q ? "outline" : "default", className: Q ? "cms:-ml-px cms:rounded-l-none" : "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": t("More publishing options"), children: /* @__PURE__ */ e.jsx(Ge, {}) }) }),
              /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", children: [
                /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { onSelect: () => M(!0), children: [
                  /* @__PURE__ */ e.jsx(Ve, {}),
                  " ",
                  t(te ? "Change the date…" : "Publish on a date…")
                ] }),
                te && /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => ye((/* @__PURE__ */ new Date()).toISOString()), children: t("Publish now") }),
                c.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
                  /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => C.router.post(`${N}/unpublish`, R, { preserveScroll: !0 }), children: t(te ? "Unschedule (back to draft)" : "Unpublish") })
                ] })
              ] })
            ] })
          ] })
        ] }),
        children: [
          c && /* @__PURE__ */ e.jsx(a.Badge, { variant: c.status === "published" ? "success" : "secondary", children: c.trashed ? t("In the trash") : se(c.status) }),
          c?.review && !c.trashed && /* @__PURE__ */ e.jsx(a.Badge, { variant: "warning", title: c.review.by ? t(":name sent it on :date", { name: c.review.by, date: K(c.review.requestedAt) }) : t("Sent on :date", { date: K(c.review.requestedAt) }), children: t("Waiting for review") }),
          j.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
        ]
      }
    ),
    c && n.length > 1 && /* @__PURE__ */ e.jsx(
      Xa,
      {
        entryUrl: N,
        editUrl: `${w}/${c.id}/edit`,
        current: c.locale,
        locales: n,
        canAdd: $.create && !c.trashed,
        canRemove: $.delete && !c.isMain && !c.trashed,
        onRemove: () => L(
          t('Remove the :language translation of ":title"? Its revisions go with it.', { language: P(c.locale), title: m.title }),
          () => C.router.delete(`${N}/translations/${c.locale}`)
        )
      }
    ),
    /* @__PURE__ */ e.jsx(a.ViewingNotice, { by: H.viewingBy, onTakeOver: H.requestTakeOver }),
    /* @__PURE__ */ e.jsx(a.KeptEditsNotice, { kept: H.kept, disabled: !q, onLoad: (B) => {
      _e(B);
    }, onDiscard: (B) => {
      H.discardKept(B);
    } }),
    V.version && /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: [
      /* @__PURE__ */ e.jsx("span", { children: V.version }),
      /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => C.router.reload(), children: t("Load theirs") }),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            type: "button",
            variant: "destructive",
            size: "sm",
            disabled: j.processing,
            onClick: () => L(t("Save your version over theirs? Their changes are replaced (their earlier published versions stay in the revisions)."), O),
            children: t("Save mine anyway")
          }
        )
      ] })
    ] }),
    (V.entry || V.published_at || X.published_at || X.homepage) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: V.entry ?? V.published_at ?? X.published_at ?? X.homepage }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_18rem]", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsx(a.CardContent, { children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: !q, className: "cms:grid cms:gap-4 cms:md:grid-cols-[2fr_1fr]", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "title", children: t("Title") }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "title",
                value: j.data.title,
                "aria-invalid": V.title !== void 0,
                onChange: (B) => {
                  const U = B.target.value;
                  j.setData((Y) => ({ ...Y, title: U, slug: qt(Y.slug, Y.title, U, c !== null && c.publishedAt === null && c.status === "draft") })), re("title");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(A, { message: V.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "slug", children: t("Slug") }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "slug",
                className: "cms:font-mono",
                value: j.data.slug,
                placeholder: t("Made from the title"),
                "aria-invalid": V.slug !== void 0,
                onChange: (B) => {
                  j.setData("slug", B.target.value), re("slug");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(A, { message: V.slug })
          ] })
        ] }) }) }),
        /* @__PURE__ */ e.jsx(bt.Provider, { value: Array.isArray(o) || !o ? {} : o, children: /* @__PURE__ */ e.jsx(
          Xe,
          {
            disabled: !q,
            fields: l,
            values: j.data.data,
            errors: V,
            storageKey: `cms:entry:${s.handle}`,
            shared: r,
            sharedValues: i,
            sharedNote: G ? t("Shared by all languages: the greyed-out fields are edited in :language.", { language: P(G) }) : t("Shared by all languages: the greyed-out fields are edited in the main language."),
            onChange: (B, U) => {
              j.setData("data", { ...j.data.data, [B]: U }), re(`data.${B}`);
            }
          }
        ) }),
        /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: t("SEO"), description: t("How this entry appears in search results and shared links."), titleClassName: "cms:text-base", storageKey: "cms:entry:seo", hasErrors: je(V, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !q, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(
          me,
          {
            bare: !0,
            id: "seo",
            fields: es(),
            value: j.data.seo,
            errors: Z(V, "seo"),
            onChange: (B) => {
              j.setData("seo", B), re("seo");
            }
          }
        ) }) })
      ] }),
      !c && s.hierarchical && /* @__PURE__ */ e.jsx("aside", { className: "cms:flex cms:flex-col cms:gap-4", children: /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: "Page settings", titleClassName: "cms:text-base", storageKey: "cms:entry:page-settings", hasErrors: V.parent_id !== void 0, children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !q, className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: /* @__PURE__ */ e.jsx(It, { collection: s, value: j.data.parent_id, error: V.parent_id, onChange: (B) => E({ parent_id: B }) }) }) }) }),
      c && /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:flex-col cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: t("Status"), titleClassName: "cms:text-base", storageKey: "cms:entry:status", contentClassName: "cms:flex cms:flex-col cms:gap-3 cms:text-sm", children: [
          /* @__PURE__ */ e.jsxs("dl", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-3", children: [
              /* @__PURE__ */ e.jsx("dt", { className: "cms:text-muted-foreground", children: t("Status") }),
              /* @__PURE__ */ e.jsx("dd", { children: /* @__PURE__ */ e.jsx(a.Badge, { variant: c.status === "published" ? "success" : "secondary", children: c.trashed ? t("In the trash") : se(c.status) }) })
            ] }),
            c.status !== "draft" && c.publishedAt && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:justify-between cms:gap-3", children: [
              /* @__PURE__ */ e.jsx("dt", { className: "cms:text-muted-foreground", children: c.status === "scheduled" ? t("Goes live") : t("Published") }),
              /* @__PURE__ */ e.jsx("dd", { className: "cms:text-right cms:tabular-nums", children: K(c.publishedAt) })
            ] })
          ] }),
          c.review && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-muted-foreground", children: [
            c.review.by ? t("Sent for review by :name · :date.", { name: c.review.by, date: K(c.review.requestedAt) }) : t("Sent for review · :date.", { date: K(c.review.requestedAt) }),
            $.publish ? ` ${t("Publishing it answers the request.")}` : ""
          ] }),
          !c.trashed && $.publish && !H.readOnly && /* @__PURE__ */ e.jsx(
            el,
            {
              status: c.status,
              publishedAt: c.publishedAt,
              processing: j.processing,
              onPublish: (B) => ye(B),
              onUnpublish: () => C.router.post(`${N}/unpublish`, R, { preserveScroll: !0 }),
              onChangeDate: (B) => C.router.post(`${N}/date`, { ...R, published_at: B }, { preserveScroll: !0 })
            },
            c.publishedAt ?? "none"
          ),
          c.status !== "draft" && c.hasUnpublishedChanges && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("The draft has changes the site doesn't show yet.") }),
          k?.is && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("This is the site's homepage.") }),
          k && !k.is && k.can && c.status === "published" && !c.trashed && /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "cms:mt-1 cms:self-start",
              onClick: () => C.router.post(`${N}/homepage`, {}, { preserveScroll: !0 }),
              children: t("Make this the homepage")
            }
          ),
          n.find((B) => B.code === c.locale)?.outdated && /* @__PURE__ */ e.jsx("p", { className: "cms:text-amber-700 cms:dark:text-amber-400", children: G ? t("The :language version changed since this translation was last saved.", { language: P(G) }) : t("The main version changed since this translation was last saved.") })
        ] }),
        /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: t("Used by"), titleClassName: "cms:text-base", storageKey: "cms:entry:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          g.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("No other content links here.") }),
          g.map((B) => /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
            B.url ? /* @__PURE__ */ e.jsx("a", { href: B.url, className: "cms:block cms:truncate cms:underline-offset-4 cms:hover:underline", children: B.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:truncate", children: B.label }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", title: B.field, children: B.fieldLabel ?? B.field })
          ] }, `${B.label}:${B.field}`))
        ] }),
        b && /* @__PURE__ */ e.jsx(
          al,
          {
            entryUrl: N,
            collection: s,
            settings: b,
            blueprints: S,
            disabled: !q,
            values: j.data,
            errors: V,
            onChange: E,
            draftDirty: j.isDirty
          }
        ),
        d !== null && s.comments && /* @__PURE__ */ e.jsx(Ja, { entryId: c.id, comments: d }),
        /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: t("Revisions"), titleClassName: "cms:text-base", storageKey: "cms:entry:revisions", contentClassName: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
          u !== null && $.update && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => C.router.post(z(`cms/entries/${c.id}/translations/${c.locale}/undo-restore`), {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(qe, {}),
            " ",
            t("Undo the restore")
          ] }),
          /* @__PURE__ */ e.jsx(C.Deferred, { data: "revisions", fallback: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-8" }),
            /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-8" })
          ] }), children: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            (x ?? []).length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("Each publish keeps one.") }),
            (x ?? []).map((B) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1 cms:border-b cms:border-border/60 cms:pb-2 cms:last:border-b-0 cms:last:pb-0", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
                /* @__PURE__ */ e.jsx("div", { className: "cms:truncate", children: B.title }),
                /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
                  K(B.createdAt),
                  B.author ? ` · ${B.author}` : ""
                ] }),
                /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: B.changed === null ? t("First kept version") : B.changed.length === 0 ? t("No field changed") : t("Changed: :fields", { fields: B.changed.join(", ") }) })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-1", children: [
                /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => F(B), children: t("Compare") }),
                $.update && !c.trashed && /* @__PURE__ */ e.jsx(
                  a.Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    onClick: () => C.router.post(z(`cms/entries/${c.id}/revisions/${B.id}/restore`), {}, { preserveScroll: !0 }),
                    children: t("Restore")
                  }
                )
              ] })
            ] }, B.id))
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(tl, { entryId: c?.id ?? 0, revision: D, onClose: () => F(null), dirty: j.isDirty }),
    /* @__PURE__ */ e.jsx(
      sl,
      {
        open: v,
        onClose: () => M(!1),
        processing: j.processing,
        rescheduling: te,
        current: c?.publishedAt ?? null,
        onSchedule: (B) => ye(B)
      }
    )
  ] });
}
function Xa({ entryUrl: s, editUrl: l, current: n, locales: r, canAdd: i, canRemove: c, onRemove: m }) {
  const x = r.filter((o) => o.status !== null), d = r.filter((o) => o.status === null);
  return /* @__PURE__ */ e.jsxs("nav", { "aria-label": t("Languages"), className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("div", { className: "cms:inline-flex cms:items-center cms:gap-0.5 cms:rounded-md cms:bg-muted cms:p-0.5", children: x.map((o) => {
      const g = o.code === n, u = o.main ? t(":language (main)", { language: o.name ?? P(o.code) }) : o.name ?? P(o.code), h = o.status ? se(o.status) : "", p = o.outdated ? t(":language: :status, outdated (the main language changed since)", { language: u, status: h }) : t(":language: :status", { language: u, status: h });
      return /* @__PURE__ */ e.jsxs(
        "button",
        {
          type: "button",
          title: p,
          "aria-label": p,
          "aria-current": g ? "page" : void 0,
          onClick: () => !g && C.router.get(l, { locale: o.code }),
          className: `cms:relative cms:inline-flex cms:h-7 cms:min-w-10 cms:items-center cms:justify-center cms:gap-1.5 cms:rounded cms:px-2.5 cms:text-xs cms:font-semibold cms:tracking-wide cms:uppercase cms:transition-colors ${g ? "cms:bg-card cms:text-foreground cms:shadow-xs" : "cms:text-muted-foreground cms:hover:text-foreground"}`,
          children: [
            o.code,
            (o.outdated || o.status === "published") && /* @__PURE__ */ e.jsx("span", { "aria-hidden": !0, className: `cms:size-1.5 cms:rounded-full ${o.outdated ? "cms:bg-amber-500" : "cms:bg-emerald-500"}` })
          ]
        },
        o.code
      );
    }) }),
    i && d.map((o) => /* @__PURE__ */ e.jsxs(
      a.Button,
      {
        type: "button",
        variant: "outline",
        size: "sm",
        className: "cms:h-8 cms:border-dashed cms:text-xs cms:uppercase",
        title: t("Add :language", { language: o.name ?? P(o.code) }),
        onClick: () => C.router.post(`${s}/translations`, { locale: o.code }),
        children: [
          /* @__PURE__ */ e.jsx(J, {}),
          " ",
          o.code
        ]
      },
      o.code
    )),
    c && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:ml-auto cms:text-destructive", onClick: m, children: t("Remove this language") })
  ] });
}
function el({ status: s, publishedAt: l, processing: n, onPublish: r, onUnpublish: i, onChangeDate: c }) {
  const [m, x] = _.useState(l ? Ns(new Date(l)) : ""), d = m === "" ? null : new Date(m), o = d !== null && d.getTime() > Date.now(), g = (p) => p === null ? null : Math.floor(p.getTime() / 6e4), u = g(d) !== g(l ? new Date(l) : null), h = t(s === "draft" ? o ? "Schedule" : "Publish" : o ? s === "scheduled" ? "Reschedule" : "Schedule" : "Change date");
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:border-t cms:border-border/60 cms:pt-3", children: [
    /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "entry-published-at", children: t("Publish date") }),
    /* @__PURE__ */ e.jsx(a.DatePicker, { id: "entry-published-at", withTime: !0, className: "cms:max-w-none", value: m || null, onChange: (p) => x(p ?? "") }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t(s === "draft" ? "Empty: now. A date in the future schedules it." : "The date shown as published; the draft stays as it is. A date in the future takes it off the site until then.") }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: [
      (s === "draft" || u) && /* @__PURE__ */ e.jsxs(
        a.Button,
        {
          type: "button",
          size: "sm",
          disabled: n,
          onClick: () => s === "draft" ? r(d?.toISOString() ?? null) : c((d ?? /* @__PURE__ */ new Date()).toISOString()),
          children: [
            /* @__PURE__ */ e.jsx(Ve, {}),
            " ",
            h
          ]
        }
      ),
      s !== "draft" && /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "sm", variant: "outline", disabled: n, onClick: i, children: t("Unpublish") })
    ] })
  ] });
}
function sl({ open: s, onClose: l, onSchedule: n, current: r, processing: i, rescheduling: c }) {
  const [m, x] = _.useState("");
  _.useEffect(() => {
    s && x(Ns(Vt(r)));
  }, [s, r]);
  const d = m === "" ? null : new Date(m), o = d !== null && d.getTime() <= Date.now();
  return /* @__PURE__ */ e.jsx(a.Dialog, { open: s, onOpenChange: (g) => !g && l(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: t(c ? "Change the publish date" : "Publish on a date") }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: t("The entry goes live then.") })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "published-at", children: t("Date and time") }),
      /* @__PURE__ */ e.jsx(a.DatePicker, { id: "published-at", withTime: !0, required: !0, className: "cms:max-w-none", value: m || null, onChange: (g) => x(g ?? "") }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("In your time zone.") }),
      o && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-amber-700 cms:dark:text-amber-400", children: t("This date has passed: the entry goes live now, dated :date.", { date: K(d.toISOString()) }) })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: l, children: t("Cancel") }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", disabled: d === null || i, onClick: () => d && n(d.toISOString()), children: t(o ? "Publish now, back-dated" : c ? "Change the date" : "Schedule") })
    ] })
  ] }) });
}
function tl({ entryId: s, revision: l, onClose: n, dirty: r }) {
  const [i, c] = _.useState(null), [m, x] = _.useState(!1);
  return _.useEffect(() => {
    if (c(null), x(!1), !l) return;
    let d = !0;
    return fetch(z(`cms/entries/${s}/revisions/${l.id}/compare`), { headers: { Accept: "application/json" }, credentials: "same-origin" }).then((o) => o.ok ? o.json() : Promise.reject(new Error(String(o.status)))).then((o) => {
      d && c(o.fields);
    }).catch(() => {
      d && x(!0);
    }), () => {
      d = !1;
    };
  }, [l, s]), /* @__PURE__ */ e.jsx(a.Dialog, { open: l !== null, onOpenChange: (d) => !d && n(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto cms:sm:max-w-2xl", children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: t("Compare with the draft") }),
      /* @__PURE__ */ e.jsxs(a.DialogDescription, { children: [
        l ? l.author ? t("The version published :date by :name, beside the saved draft.", { date: K(l.createdAt), name: l.author }) : t("The version published :date, beside the saved draft.", { date: K(l.createdAt) }) : "",
        r ? ` ${t("Your unsaved changes aren't included.")}` : ""
      ] })
    ] }),
    m && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t("The comparison could not be loaded. Try again.") }),
    !m && i === null && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-12" }),
      /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-12" })
    ] }),
    i?.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("The draft is the same as this version.") }),
    i && i.length > 0 && /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: i.map((d) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: d.label }),
      /* @__PURE__ */ e.jsxs("dd", { className: "cms:grid cms:gap-2 cms:sm:grid-cols-2", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:rounded-md cms:border cms:border-destructive/30 cms:bg-destructive/5 cms:p-2 cms:break-words cms:whitespace-pre-wrap", children: [
          /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:text-xs cms:text-muted-foreground", children: "This version" }),
          d.revision || "—"
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:rounded-md cms:border cms:border-emerald-500/30 cms:bg-emerald-500/5 cms:p-2 cms:break-words cms:whitespace-pre-wrap", children: [
          /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:text-xs cms:text-muted-foreground", children: "Draft" }),
          d.draft || "—"
        ] })
      ] })
    ] }, d.label)) }),
    /* @__PURE__ */ e.jsx(a.DialogFooter, { children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: n, children: t("Close") }) })
  ] }) });
}
function It({ collection: s, value: l, error: n, onChange: r }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "parent", children: t("Parent") }),
    /* @__PURE__ */ e.jsx(
      $e,
      {
        id: "parent",
        multiple: !1,
        max: 1,
        collections: [s.handle],
        invalid: n !== void 0,
        value: l,
        onChange: (i) => r(typeof i == "number" ? i : null)
      }
    ),
    /* @__PURE__ */ e.jsx(A, { message: n })
  ] });
}
function al({ entryUrl: s, collection: l, settings: n, blueprints: r, disabled: i, values: c, errors: m, onChange: x, draftDirty: d }) {
  const o = r.length > 1 ? n.blueprint ?? r[0].handle : void 0, g = C.useForm({ blueprint: o ?? "" }), u = g.errors.blueprint, h = ["parent_id", "template", "comments_closed"].some((p) => m[p] !== void 0) || u !== void 0;
  return /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: t("Page settings"), titleClassName: "cms:text-base", storageKey: "cms:entry:page-settings", hasErrors: h, children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: i, className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: [
    l.hierarchical && /* @__PURE__ */ e.jsx(It, { collection: l, value: c.parent_id, error: m.parent_id, onChange: (p) => x({ parent_id: p }) }),
    r.length > 1 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "blueprint", children: t("Blueprint") }),
      /* @__PURE__ */ e.jsxs(a.Select, { value: g.data.blueprint, onValueChange: (p) => g.setData("blueprint", p), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: "blueprint", "aria-invalid": u !== void 0, children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(a.SelectContent, { children: r.map((p) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: p.handle, children: p.title }, p.handle)) })
      ] }),
      g.data.blueprint !== o && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("The fields change in every language; values of fields both blueprints have are kept. The editor reloads.") }),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            type: "button",
            size: "sm",
            disabled: g.processing || d,
            title: d ? t("Save your draft first") : void 0,
            onClick: () => g.put(`${s}/settings`, { preserveScroll: !0 }),
            children: t("Change blueprint")
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(A, { message: u })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "template", children: t("Template") }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: "template",
          className: "cms:font-mono",
          placeholder: `cms.${l.handle}-landing`,
          value: c.template,
          onChange: (p) => x({ template: p.target.value }),
          "aria-invalid": m.template !== void 0
        }
      ),
      /* @__PURE__ */ e.jsx(Mt, { example: `cms.${l.handle}-landing`, fallbacks: [t("the collection's template, if set"), `cms.${l.handle}`, "cms.entry"] }),
      /* @__PURE__ */ e.jsx(A, { message: m.template })
    ] }),
    l.comments && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(a.Switch, { id: "comments-open", checked: !c.comments_closed, onCheckedChange: (p) => x({ comments_closed: !p }) }),
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "comments-open", children: t("Accept new comments") }),
      /* @__PURE__ */ e.jsx("a", { href: z(`cms/comments?entry=${s.split("/").slice(-1)[0]}`), className: "cms:ml-auto cms:text-muted-foreground cms:underline-offset-4 hover:cms:underline", children: t("Comments") })
    ] })
  ] }) });
}
function Ke(s, l) {
  const n = s[l]?.depth ?? 0;
  let r = l + 1;
  for (; r < s.length && s[r].depth > n; ) r++;
  return r;
}
function le(s, l) {
  const n = l < 0 ? 0 : l + 1, r = l < 0 ? s.length : Ke(s, l), i = l < 0 ? 0 : (s[l]?.depth ?? 0) + 1, c = [];
  for (let m = n; m < r; m++)
    s[m].depth === i && c.push(m);
  return c;
}
function ss(s, l, n) {
  const r = le(s, l);
  if (n.length !== r.length || [...n].sort((x, d) => x - d).some((x, d) => x !== r[d]) || r.length === 0) return s.slice();
  const i = r[0], c = Ke(s, r[r.length - 1]), m = n.flatMap((x) => s.slice(x, Ke(s, x)));
  return [...s.slice(0, i), ...m, ...s.slice(c)];
}
function ll(s, l) {
  const n = new Set(s.map((x) => x.id)), r = /* @__PURE__ */ new Map();
  for (const x of s) {
    const d = l(x), o = d != null && n.has(d) ? d : null;
    r.set(o, [...r.get(o) ?? [], x]);
  }
  const i = [], c = /* @__PURE__ */ new Set(), m = (x, d) => {
    for (const o of r.get(x) ?? [])
      c.has(o.id) || (c.add(o.id), i.push({ ...o, depth: d }), m(o.id, d + 1));
  };
  m(null, 0);
  for (const x of s)
    c.has(x.id) || (c.add(x.id), i.push({ ...x, depth: 0 }), m(x.id, 1));
  return i;
}
function nl({ collection: s, rows: l, hierarchical: n = !1 }) {
  const r = _.useCallback(
    (d) => ll(d, (o) => n ? o.parentId : null),
    [n]
  ), [i, c] = _.useState(() => r(l));
  _.useEffect(() => c(r(l)), [l, r]);
  const m = (d, o) => {
    const g = ss(i, d, o), u = le(g, d).map((h) => g[h].id);
    c(g), C.router.post(
      z("cms/entries/reorder"),
      { collection: s, ids: u, parent_id: d < 0 ? null : i[d]?.id ?? null },
      { preserveScroll: !0, preserveState: !0, onError: () => c(r(l)) }
    );
  }, x = (d) => /* @__PURE__ */ e.jsx(
    a.SortableList,
    {
      items: le(i, d),
      getId: (o) => i[o].id,
      getLabel: (o) => i[o].title,
      onReorder: (o) => m(d, o),
      className: d < 0 ? "cms:gap-1" : "cms:mt-1 cms:gap-1 cms:pl-6",
      children: (o, { handle: g }) => {
        const u = i[o];
        return /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-lg cms:border cms:border-border/70 cms:bg-card cms:p-2 cms:text-sm", children: [
            /* @__PURE__ */ e.jsx(a.SortableHandle, { ...g, label: t("Move :title", { title: u.title }) }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium", children: u.title }),
            /* @__PURE__ */ e.jsx(a.Badge, { variant: u.status === "published" ? "success" : "secondary", children: se(u.status) })
          ] }),
          le(i, o).length > 0 && x(o)
        ] });
      }
    }
  );
  return /* @__PURE__ */ e.jsxs(a.Card, { className: "cms:p-2", children: [
    n && /* @__PURE__ */ e.jsx("p", { className: "cms:px-1 cms:pb-1 cms:text-xs cms:text-muted-foreground", children: t("Entries move among those at their level, with what's under them. To put one under another, choose its Parent in its Page settings.") }),
    x(-1)
  ] });
}
function cl(s, l, n) {
  const r = { ...s, ...l }, i = Object.fromEntries(Object.entries(r.terms).filter(([, m]) => m !== "")), c = {};
  return r.search && (c.search = r.search), r.status && (c.status = r.status), r.author && (c.author = r.author), Object.keys(i).length > 0 && (c.terms = i), r.locale && r.locale !== n && (c.locale = r.locale), r.sort && (c.sort = r.sort), c.per_page = r.perPage, c;
}
function rl(s) {
  const l = new URLSearchParams();
  for (const [n, r] of Object.entries(s))
    if (typeof r == "object")
      for (const [i, c] of Object.entries(r)) l.set(`${n}[${i}]`, c);
    else
      l.set(n, String(r));
  return l.toString();
}
function il(s, l) {
  return s === l ? `-${l}` : s === `-${l}` ? "" : l;
}
function ol(s, l) {
  return s === l ? "asc" : s === `-${l}` ? "desc" : null;
}
function gs(s) {
  return [s.search, s.status, s.author, ...Object.values(s.terms)].filter((l) => l !== "").length;
}
const Ae = "__all", dl = () => [
  { value: "draft", label: t("Drafts") },
  { value: "published", label: t("Published") },
  { value: "scheduled", label: t("Scheduled") },
  { value: "trashed", label: t("Trash") }
];
function ml(s) {
  const { collection: l, entries: n, query: r } = s;
  return a.useBreadcrumbs([{ label: l ? l.title : t("Entries") }]), !l || !n || !r ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: t("Entries") }),
    /* @__PURE__ */ e.jsx(a.PageHeader, { title: t("Entries"), description: t("There are no collections yet. Create one under Structure → Collections, then come back to write its entries.") })
  ] }) : /* @__PURE__ */ e.jsx(ul, { ...s, collection: l, entries: n, query: r });
}
function ul({
  collection: s,
  collections: l,
  entries: n,
  query: r,
  columns: i = [],
  filters: c = { authors: [], taxonomies: [], locales: [] },
  links: m = [],
  manualOrder: x = !1,
  perPageOptions: d = [10, 25, 50, 100],
  preferencesKey: o,
  can: g
}) {
  const u = z(`cms/collections/${s.handle}/entries`), h = c.locales[0] ?? r.locale, [p, b] = _.useState(r.search), [S, k] = _.useState([]), [$, w] = _.useState(!1), [N, f] = ce(), { setColumns: L, setPerPage: T } = a.useTablePreferences(o ?? `table.cms.entries.${s.handle}`, { columns: r.columns, perPage: r.perPage });
  _.useEffect(() => k([]), [n]);
  const v = r.status === "trashed", M = gs(r) > 0, D = i.filter((y) => r.columns.includes(y.key)), F = (y = {}) => cl(r, y, h), j = (y) => C.router.get(u, F(y), { preserveState: !0, preserveScroll: !0, replace: !0 });
  _.useEffect(() => {
    if (p === r.search) return;
    const y = window.setTimeout(() => j({ search: p }), 300);
    return () => window.clearTimeout(y);
  }, [p]);
  const E = v ? g?.delete ? [{ action: "restore", label: t("Restore") }, { action: "delete", label: t("Delete for good"), danger: !0 }] : [] : [
    ...g?.publish ? [{ action: "publish", label: t("Publish") }, { action: "unpublish", label: t("Unpublish") }] : [],
    ...g?.delete ? [{ action: "trash", label: t("Move to the trash"), danger: !0 }] : []
  ], R = (y, O, H = !1) => {
    const q = () => C.router.post(`${u}/bulk`, { action: y, ids: S }, { preserveScroll: !0 });
    if (H) {
      const _e = S.length === 1 ? t(":action: 1 entry?", { action: O }) : t(":action: :count entries?", { action: O, count: S.length });
      N(
        `${_e} ${t(y === "delete" ? "This can't be undone." : "They come off the site; you can restore them.")}`,
        q,
        t(y === "trash" ? "Move to trash" : "Delete")
      );
    } else
      q();
  }, G = async (y) => {
    const O = new Set(r.columns);
    O.has(y) ? O.delete(y) : O.add(y), await L(i.map((H) => H.key).filter((H) => O.has(H))), C.router.reload({ only: ["entries", "query"] });
  }, V = () => {
    b(""), j({ search: "", status: "", author: "", terms: {} });
  }, X = x && !!g?.update, re = X && n !== null && n.lastPage <= 1 && n.data.length > 1, Q = v && !!g?.delete, be = 1 + D.length + (E.length > 0 ? 1 : 0) + (X ? 1 : 0) + (Q ? 1 : 0), te = rl(F()), ve = [...new Set(m.map((y) => y.group))];
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: s.title }),
    f,
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: s.title,
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          m.length > 0 && /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(a.Button, { variant: "outline", children: [
              /* @__PURE__ */ e.jsx(na, {}),
              " ",
              t("Go to")
            ] }) }),
            /* @__PURE__ */ e.jsx(a.DropdownMenuContent, { align: "end", className: "cms:min-w-56", children: ve.map((y, O) => /* @__PURE__ */ e.jsxs(_.Fragment, { children: [
              O > 0 && /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
              /* @__PURE__ */ e.jsx(a.DropdownMenuLabel, { children: y }),
              m.filter((H) => H.group === y).map((H) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { asChild: !0, children: H.external ? /* @__PURE__ */ e.jsxs("a", { href: H.href, target: "_blank", rel: "noopener noreferrer", children: [
                H.label,
                " ",
                /* @__PURE__ */ e.jsx(he, { className: "cms:ml-auto" })
              ] }) : /* @__PURE__ */ e.jsx(C.Link, { href: H.href, children: H.label }) }, H.href))
            ] }, y)) })
          ] }),
          s.listing && !v && /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs(C.Link, { href: z(`cms/collections/${s.handle}/listing/edit`), children: [
            /* @__PURE__ */ e.jsx(ma, {}),
            " ",
            t("Listing page")
          ] }) }),
          n.total > 0 && g?.export && /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: `${u}/export${te ? `?${te}` : ""}`, children: [
            /* @__PURE__ */ e.jsx(Os, {}),
            " ",
            t("Export CSV")
          ] }) }),
          g?.create && !v && /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(C.Link, { href: `${u}/create`, children: [
            /* @__PURE__ */ e.jsx(J, {}),
            " ",
            t("New entry")
          ] }) })
        ] }),
        children: l.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: s.handle, onValueChange: (y) => C.router.get(z(`cms/collections/${y}/entries`)), children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": t("Collection"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: l.map((y) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: y.handle, children: y.title }, y.handle)) })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-xs", children: [
        /* @__PURE__ */ e.jsx(fe, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            className: "cms:pl-9",
            placeholder: t("Search titles, slugs or #id"),
            "aria-label": t("Search entries"),
            value: p,
            onChange: (y) => b(y.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(Ee, { label: t("Status"), value: r.status, options: dl(), onChange: (y) => j({ status: y }) }),
      c.authors.length > 0 && /* @__PURE__ */ e.jsx(Ee, { label: t("Author"), value: r.author, options: c.authors, onChange: (y) => j({ author: y }) }),
      c.taxonomies.filter((y) => y.terms.length > 0).map((y) => /* @__PURE__ */ e.jsx(
        Ee,
        {
          label: y.title,
          value: r.terms[y.handle] ?? "",
          options: y.terms.map((O) => ({ value: O.value, label: `${"— ".repeat(O.depth)}${O.label}` })),
          onChange: (O) => j({ terms: { ...r.terms, [y.handle]: O } })
        },
        y.handle
      )),
      c.locales.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: r.locale, onValueChange: (y) => j({ locale: y }), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-auto cms:min-w-40 cms:max-w-72", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(a.SelectContent, { children: c.locales.map((y) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: y, children: [
          P(y),
          y === h ? ` ${t("(main)")}` : ""
        ] }, y)) })
      ] }),
      M && /* @__PURE__ */ e.jsxs(a.Button, { variant: "ghost", size: "sm", onClick: V, children: [
        /* @__PURE__ */ e.jsx(we, {}),
        " ",
        t("Clear")
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:ml-auto cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
        S.length > 0 && E.length > 0 && /* @__PURE__ */ e.jsxs("div", { role: "toolbar", "aria-label": t("Selected entries"), className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t(":count selected", { count: S.length }) }),
          E.map((y) => /* @__PURE__ */ e.jsx(a.Button, { size: "sm", variant: y.danger ? "destructive" : "outline", onClick: () => R(y.action, y.label, y.danger), children: y.label }, y.action))
        ] }),
        re && /* @__PURE__ */ e.jsxs(a.Button, { variant: $ ? "secondary" : "outline", "aria-pressed": $, onClick: () => w(!$), children: [
          /* @__PURE__ */ e.jsx($s, {}),
          " ",
          t($ ? "Done" : "Reorder")
        ] }),
        i.length > 0 && /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
          /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(a.Button, { variant: "outline", children: [
            /* @__PURE__ */ e.jsx(la, {}),
            " ",
            t("Columns")
          ] }) }),
          /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", className: "cms:max-h-96 cms:overflow-y-auto", children: [
            /* @__PURE__ */ e.jsx(a.DropdownMenuLabel, { children: t("Columns") }),
            i.filter((y) => !y.field).map((y) => /* @__PURE__ */ e.jsx(
              a.DropdownMenuCheckboxItem,
              {
                checked: r.columns.includes(y.key),
                onSelect: (O) => O.preventDefault(),
                onCheckedChange: () => {
                  G(y.key);
                },
                children: y.label
              },
              y.key
            )),
            i.some((y) => y.field) && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
              /* @__PURE__ */ e.jsx(a.DropdownMenuLabel, { children: t("Fields") }),
              i.filter((y) => y.field).map((y) => /* @__PURE__ */ e.jsx(
                a.DropdownMenuCheckboxItem,
                {
                  checked: r.columns.includes(y.key),
                  onSelect: (O) => O.preventDefault(),
                  onCheckedChange: () => {
                    G(y.key);
                  },
                  children: y.label
                },
                y.key
              ))
            ] })
          ] })
        ] })
      ] })
    ] }),
    $ && re ? /* @__PURE__ */ e.jsx(nl, { collection: s.handle, rows: n.data, hierarchical: s.hierarchical === !0 }) : /* @__PURE__ */ e.jsxs(a.Card, { className: "cms:gap-0 cms:overflow-hidden cms:py-0", children: [
      /* @__PURE__ */ e.jsxs(a.Table, { children: [
        /* @__PURE__ */ e.jsx(a.TableHeader, { className: "cms:bg-muted/60", children: /* @__PURE__ */ e.jsxs(a.TableRow, { className: "cms:hover:bg-transparent", children: [
          E.length > 0 && /* @__PURE__ */ e.jsx(a.TableHead, { className: "cms:w-10", children: /* @__PURE__ */ e.jsx(
            a.Checkbox,
            {
              "aria-label": t("Select all on this page"),
              checked: n.data.length > 0 && S.length === n.data.length,
              onCheckedChange: (y) => k(y ? n.data.map((O) => O.id) : [])
            }
          ) }),
          /* @__PURE__ */ e.jsx(fs, { label: t("Title"), sortKey: "title", sort: r.sort, onSort: (y) => j({ sort: y }) }),
          D.map((y) => y.sortable ? /* @__PURE__ */ e.jsx(fs, { label: y.label, sortKey: y.key, sort: r.sort, onSort: (O) => j({ sort: O }) }, y.key) : /* @__PURE__ */ e.jsx(a.TableHead, { children: y.label }, y.key)),
          X && /* @__PURE__ */ e.jsx(a.TableHead, { className: "cms:w-px", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: t("Order") }) }),
          Q && /* @__PURE__ */ e.jsx(a.TableHead, { className: "cms:w-px", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: t("Restore") }) })
        ] }) }),
        /* @__PURE__ */ e.jsxs(a.TableBody, { children: [
          n.data.length === 0 && /* @__PURE__ */ e.jsx(a.TableRow, { className: "cms:hover:bg-transparent", children: /* @__PURE__ */ e.jsx(a.TableCell, { colSpan: be, className: "cms:h-32 cms:text-center cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx(pl, { trashed: v, filtered: gs(v ? { ...r, status: "" } : r) > 0, canCreate: !!g?.create, createUrl: `${u}/create`, onClear: V }) }) }),
          n.data.map((y, O) => /* @__PURE__ */ e.jsxs(a.TableRow, { className: "sunrice-row-in", style: { "--i": O }, "data-state": S.includes(y.id) ? "selected" : void 0, children: [
            E.length > 0 && /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx(
              a.Checkbox,
              {
                "aria-label": t("Select :title", { title: y.title }),
                checked: S.includes(y.id),
                onCheckedChange: (H) => k(H ? [...S, y.id] : S.filter((q) => q !== y.id))
              }
            ) }),
            /* @__PURE__ */ e.jsxs(a.TableCell, { children: [
              /* @__PURE__ */ e.jsx(
                C.Link,
                {
                  href: z(`cms/collections/${s.handle}/entries/${y.id}/edit${r.locale !== h ? `?locale=${encodeURIComponent(r.locale)}` : ""}`),
                  className: "cms:font-medium cms:underline-offset-4 cms:hover:underline",
                  children: y.title
                }
              ),
              (!r.columns.includes("slug") && y.path || y.parent) && /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: [r.columns.includes("slug") ? null : y.path, y.parent ? t("under :parent", { parent: y.parent }) : null].filter(Boolean).join(" · ") })
            ] }),
            D.map((H) => /* @__PURE__ */ e.jsx(a.TableCell, { className: H.key === "status" ? "" : "cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx("div", { className: "cms:max-w-72 cms:truncate", children: /* @__PURE__ */ e.jsx(hl, { row: y, column: H, mainLocale: h }) }) }, H.key)),
            X && /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:w-px", children: /* @__PURE__ */ e.jsxs("span", { className: "cms:flex", children: [
              /* @__PURE__ */ e.jsx(a.Button, { variant: "ghost", size: "icon", "aria-label": t("Move :title up", { title: y.title }), onClick: () => C.router.post(z(`cms/entries/${y.id}/move`), { direction: "up" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(_s, {}) }),
              /* @__PURE__ */ e.jsx(a.Button, { variant: "ghost", size: "icon", "aria-label": t("Move :title down", { title: y.title }), onClick: () => C.router.post(z(`cms/entries/${y.id}/move`), { direction: "down" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(ks, {}) })
            ] }) }),
            Q && /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:w-px", children: /* @__PURE__ */ e.jsxs(
              a.Button,
              {
                variant: "outline",
                size: "sm",
                "aria-label": `Restore ${y.title}`,
                onClick: () => C.router.post(z(`cms/entries/${y.id}/restore`), {}, { preserveScroll: !0 }),
                children: [
                  /* @__PURE__ */ e.jsx(xe, {}),
                  " Restore"
                ]
              }
            ) })
          ] }, y.id))
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4 cms:border-t cms:px-6 cms:py-3 cms:text-sm cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-4", children: [
          /* @__PURE__ */ e.jsx("span", { children: n.total === 0 ? t("No entries") : t(":from–:to of :total", { from: n.from, to: n.to, total: n.total }) }),
          /* @__PURE__ */ e.jsxs(a.Select, { value: String(r.perPage), onValueChange: (y) => {
            T(Number(y)), j({ perPage: Number(y) });
          }, children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:h-8 cms:w-auto", "aria-label": t("Entries per page"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(a.SelectContent, { children: d.map((y) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: String(y), children: t(":count per page", { count: y }) }, y)) })
          ] })
        ] }),
        n.lastPage > 1 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsx("span", { children: t("Page :page of :last", { page: n.currentPage, last: n.lastPage }) }),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              variant: "outline",
              size: "icon",
              className: "cms:size-8",
              "aria-label": t("Previous page"),
              disabled: !n.prev_page_url,
              onClick: () => n.prev_page_url && C.router.get(n.prev_page_url, {}, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(Ye, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              variant: "outline",
              size: "icon",
              className: "cms:size-8",
              "aria-label": t("Next page"),
              disabled: !n.next_page_url,
              onClick: () => n.next_page_url && C.router.get(n.next_page_url, {}, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(ge, {})
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function Ee({ label: s, value: l, options: n, onChange: r }) {
  return /* @__PURE__ */ e.jsxs(a.Select, { value: l === "" ? Ae : l, onValueChange: (i) => r(i === Ae ? "" : i), children: [
    /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-auto cms:min-w-40 cms:max-w-72", title: s, "aria-label": s, children: /* @__PURE__ */ e.jsx(a.SelectValue, { placeholder: s }) }),
    /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
      /* @__PURE__ */ e.jsx(a.SelectItem, { value: Ae, children: t(":filter: all", { filter: s }) }),
      n.map((i) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: i.value, children: i.label }, i.value))
    ] })
  ] });
}
function fs({ label: s, sortKey: l, sort: n, onSort: r }) {
  const i = ol(n, l);
  return /* @__PURE__ */ e.jsx(a.TableHead, { "aria-sort": i === "asc" ? "ascending" : i === "desc" ? "descending" : void 0, children: /* @__PURE__ */ e.jsxs(
    "button",
    {
      type: "button",
      onClick: () => r(il(n, l)),
      className: "cms:-ml-2 cms:inline-flex cms:h-8 cms:items-center cms:gap-1 cms:rounded-md cms:px-2 cms:hover:bg-accent cms:hover:text-accent-foreground",
      children: [
        s,
        i === "asc" ? /* @__PURE__ */ e.jsx(_s, { className: "cms:size-3" }) : i === "desc" ? /* @__PURE__ */ e.jsx(ks, { className: "cms:size-3" }) : /* @__PURE__ */ e.jsx($s, { className: "cms:size-3 cms:opacity-40" })
      ]
    }
  ) });
}
function hl({ row: s, column: l, mainLocale: n }) {
  switch (l.key) {
    case "slug":
      return /* @__PURE__ */ e.jsx("span", { className: "cms:font-mono", children: s.slug });
    case "status":
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-1", children: [
        s.trashed ? /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", className: "cms:text-destructive", title: t(":status before it was trashed", { status: se(s.status) }), children: t("Trashed") }) : /* @__PURE__ */ e.jsx(a.Badge, { variant: s.status === "published" ? "success" : "secondary", children: se(s.status) }),
        s.locales.length > 1 && s.locales.filter((r) => !r.main).map((r) => {
          const i = xl(r);
          return /* @__PURE__ */ e.jsxs(
            a.Badge,
            {
              variant: i.variant,
              className: i.className,
              title: t(":language: :status", { language: P(r.code), status: i.title }),
              "aria-label": t(":language: :status", { language: P(r.code), status: i.title }),
              children: [
                r.code.toUpperCase(),
                i.word && /* @__PURE__ */ e.jsx("span", { className: "cms:font-normal", children: i.word })
              ]
            },
            r.code
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
      return /* @__PURE__ */ e.jsx("span", { title: s.cells[l.key] ?? void 0, children: s.cells[l.key] ?? "—" });
  }
}
function xl(s) {
  return s.status === null ? { variant: "outline", className: "cms:border-dashed cms:text-muted-foreground", word: t("missing"), title: t("not translated") } : s.outdated ? { variant: "warning", className: "", word: t("outdated"), title: t(":status, outdated: the main language changed since", { status: se(s.status) }) } : s.status === "published" ? { variant: "secondary", className: "", word: null, title: t("Published") } : { variant: "outline", className: "", word: s.status === "scheduled" ? t("scheduled") : t("draft"), title: se(s.status) };
}
function pl({ trashed: s, filtered: l, canCreate: n, createUrl: r, onClear: i }) {
  return l ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: t("Nothing matches these filters.") }),
    /* @__PURE__ */ e.jsxs(a.Button, { variant: "outline", size: "sm", onClick: i, children: [
      /* @__PURE__ */ e.jsx(we, {}),
      " ",
      t("Clear filters")
    ] })
  ] }) : s ? /* @__PURE__ */ e.jsx(e.Fragment, { children: t("The trash is empty.") }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: t("No entries yet.") }),
    n && /* @__PURE__ */ e.jsx(a.Button, { size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs(C.Link, { href: r, children: [
      /* @__PURE__ */ e.jsx(J, {}),
      " ",
      t("Write the first one")
    ] }) })
  ] });
}
function ts({ message: s, processing: l, onSaveMine: n }) {
  const [r, i] = ce();
  return s ? /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: [
    i,
    /* @__PURE__ */ e.jsx("span", { children: s }),
    /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => C.router.reload(), children: t("Load theirs") }),
      /* @__PURE__ */ e.jsx(
        a.Button,
        {
          type: "button",
          variant: "destructive",
          size: "sm",
          disabled: l,
          onClick: () => r(t("Save your version over theirs? Their changes are replaced."), n),
          children: t("Save mine anyway")
        }
      )
    ] })
  ] }) : null;
}
function gl(s) {
  return /* @__PURE__ */ e.jsx(fl, { ...s }, `${s.locale}:${s.version}:${JSON.stringify([s.values, s.seo])}`);
}
function fl({ collection: s, fields: l, locale: n, locales: r, shared: i, values: c, seo: m, version: x, can: d }) {
  const o = z(`cms/collections/${s.handle}/listing`), g = z(`cms/collections/${s.handle}/entries`);
  a.useBreadcrumbs([{ label: s.title, href: g }, { label: t("Listing page") }]);
  const u = C.useForm({ locale: n, data: c, seo: m ?? {}, version: x }), h = u.errors, p = (w) => {
    const N = De(h, w);
    N.length > 0 && u.clearErrors(...N);
  }, b = r[0], S = d.update, k = () => u.processing || u.put(o, { preserveScroll: !0 }), $ = () => {
    u.transform((w) => ({ ...w, version: null })), u.put(o, { preserveScroll: !0 });
  };
  return a.useUnsavedChanges(u.isDirty, S ? k : void 0), /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (w) => {
    w.preventDefault(), k();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: t(":title: listing page", { title: s.title }) }),
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: t(":title: listing page", { title: s.title }),
        back: { href: g, label: t("Back to :title", { title: s.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          r.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: n, onValueChange: (w) => C.router.get(o, { locale: w }), children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(a.SelectContent, { children: r.map((w, N) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: w, children: [
              P(w),
              N === 0 ? ` ${t("(main)")}` : ""
            ] }, w)) })
          ] }),
          s.url && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: s.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(he, {}),
            " ",
            t("View")
          ] }) }),
          S && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: u.processing, children: [
            u.processing && /* @__PURE__ */ e.jsx(de, { className: "cms:animate-spin" }),
            " ",
            t("Save")
          ] })
        ] }),
        children: u.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
      }
    ),
    /* @__PURE__ */ e.jsxs("fieldset", { disabled: !S, className: "cms:flex cms:flex-col cms:gap-6", children: [
      /* @__PURE__ */ e.jsx(ts, { message: h.version, processing: u.processing, onSaveMine: $ }),
      l.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("The listing page has no fields of its own: choose a listing blueprint for the collection under Structure → Collections.") }) : /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: [
        (i.length > 0 || Ce(l)) && /* @__PURE__ */ e.jsx("p", { role: "note", className: "cms:rounded-lg cms:border cms:border-dashed cms:px-3 cms:py-2 cms:text-sm cms:text-muted-foreground", children: b ? t("Shared by all languages: the greyed-out fields are edited in :language.", { language: P(b) }) : t("Shared by all languages: the greyed-out fields are edited in the main language.") }),
        l.filter((w) => Ze(w, { ...c, ...u.data.data })).map((w) => i.includes(w.handle) ? /* @__PURE__ */ e.jsx("fieldset", { disabled: !0, className: zt, title: t("Shared by all languages"), children: /* @__PURE__ */ e.jsx(ne, { id: `data-${w.handle}`, field: w, content: !0, value: c[w.handle], errors: {}, onChange: () => {
        } }) }, w.handle) : /* @__PURE__ */ e.jsx(
          ne,
          {
            id: `data-${w.handle}`,
            field: w,
            content: !0,
            value: u.data.data[w.handle],
            errors: Z(h, `data.${w.handle}`),
            onChange: (N) => {
              u.setData("data", { ...u.data.data, [w.handle]: N }), p(`data.${w.handle}`);
            }
          },
          w.handle
        ))
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: t("SEO"), description: t("How the listing page appears in search results and shared links."), titleClassName: "cms:text-base", storageKey: "cms:listing:seo", hasErrors: je(h, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !S, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(me, { bare: !0, id: "seo", fields: es(), value: u.data.seo, errors: Z(h, "seo"), onChange: (w) => {
      u.setData("seo", w), p("seo");
    } }) }) })
  ] });
}
function jl({ fieldsets: s }) {
  const l = C.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(A, { message: l.fieldset }),
    /* @__PURE__ */ e.jsx(
      Lt,
      {
        kind: "fieldset",
        base: z("cms/fieldsets"),
        rows: s,
        intro: t("Fields shared between blueprints, and the kinds of block of flexible fields.")
      }
    )
  ] });
}
function bl(s) {
  return /* @__PURE__ */ e.jsx(vl, { ...s }, `${s.locale}:${s.version}:${JSON.stringify(s.values)}`);
}
function vl({ set: s, fields: l, locale: n, locales: r, shared: i, values: c, version: m, can: x, settings: d }) {
  const o = z(`cms/globals/${s.handle}/values`);
  a.useBreadcrumbs([{ label: t("Globals"), href: z("cms/globals") }, { label: s.title }]);
  const g = C.useForm({ locale: n, data: c, version: m }), u = g.errors, h = (N) => {
    const f = De(u, N);
    f.length > 0 && g.clearErrors(...f);
  }, p = r[0], b = a.useEditLock({
    type: "cms.global",
    id: s.id,
    locale: n,
    enabled: x.update,
    noun: t("global set"),
    leaveTo: z("cms/globals"),
    getUnsaved: () => g.isDirty ? { data: g.data.data } : null
  }), S = x.update && !b.readOnly, k = () => g.processing || g.put(o, { preserveScroll: !0 }), $ = () => {
    g.transform((N) => ({ ...N, version: null })), g.put(o, { preserveScroll: !0 });
  }, w = async (N) => {
    const f = await b.loadKept(N);
    f.data && typeof f.data == "object" && g.setData("data", f.data);
  };
  return a.useUnsavedChanges(g.isDirty && !b.takenOver, S ? k : void 0), /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (N) => {
    N.preventDefault(), k();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: s.title }),
    b.dialogs,
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: s.title,
        back: { href: z("cms/globals"), label: t("Back to globals") },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          d && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(C.Link, { href: d, children: [
            /* @__PURE__ */ e.jsx(Je, {}),
            " ",
            t("Settings")
          ] }) }),
          r.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: n, onValueChange: (N) => C.router.get(o, { locale: N }), children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(a.SelectContent, { children: r.map((N, f) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: N, children: [
              P(N),
              f === 0 ? ` ${t("(main)")}` : ""
            ] }, N)) })
          ] }),
          S && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: g.processing, children: [
            g.processing && /* @__PURE__ */ e.jsx(de, { className: "cms:animate-spin" }),
            " ",
            t("Save")
          ] })
        ] }),
        children: g.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
      }
    ),
    l.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("This global set has no fields: choose a blueprint for it in its Settings.") }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(a.ViewingNotice, { by: b.viewingBy, onTakeOver: b.requestTakeOver }),
      p && n !== p && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:bg-muted/40 cms:p-3 cms:text-sm cms:text-muted-foreground", role: "note", children: m === null ? t("Not saved in :language yet: these are the :main values, which the site shows meanwhile. Translate them, then save.", { language: P(n), main: P(p) }) : t("A field left empty shows the :main value on the site.", { main: P(p) }) }),
      /* @__PURE__ */ e.jsx(ts, { message: u.version, processing: g.processing, onSaveMine: $ }),
      /* @__PURE__ */ e.jsx(a.KeptEditsNotice, { kept: b.kept, disabled: !S, onLoad: (N) => {
        w(N);
      }, onDiscard: (N) => {
        b.discardKept(N);
      } }),
      /* @__PURE__ */ e.jsx(
        Xe,
        {
          disabled: !S,
          fields: l,
          values: g.data.data,
          errors: u,
          storageKey: `cms:global:${s.handle}`,
          shared: i,
          sharedValues: c,
          sharedNote: p ? t("Shared by all languages: the greyed-out fields are edited in :language.", { language: P(p) }) : t("Shared by all languages: the greyed-out fields are edited in the main language."),
          onChange: (N, f) => {
            g.setData("data", { ...g.data.data, [N]: f }), h(`data.${N}`);
          }
        }
      )
    ] })
  ] });
}
let At = 0;
function Et(s, l = 0) {
  return s.flatMap(({ children: n, ...r }) => [{ ...r, key: `m${++At}`, depth: l }, ...Et(n ?? [], l + 1)]);
}
function yl(s) {
  const l = [], n = [{ depth: -1, children: l }];
  for (const { key: r, depth: i, ...c } of s) {
    for (; n.length > 1 && n[n.length - 1].depth >= i; ) n.pop();
    const m = { ...c, children: [] };
    n[n.length - 1].children.push(m), n.push({ depth: i, children: m.children });
  }
  return l;
}
function pe(s, l) {
  const n = s[l]?.depth ?? 0;
  let r = l + 1;
  for (; r < s.length && s[r].depth > n; ) r++;
  return r;
}
function Ft(s, l, n) {
  const r = pe(s, l);
  return s.map((i, c) => c >= l && c < r ? { ...i, depth: i.depth + n } : i);
}
function Nl(s, l, n) {
  const r = s[l], i = s[l - 1];
  return !r || !i || r.depth > i.depth || Math.max(...s.slice(l, pe(s, l)).map((m) => m.depth)) + 1 > n - 1 ? s : Ft(s, l, 1);
}
function Sl(s, l) {
  const n = s[l];
  if (!n || n.depth === 0) return s;
  let r = l - 1;
  for (; r > 0 && s[r].depth >= n.depth; ) r--;
  const i = pe(s, l), c = pe(s, r), m = Ft(s, l, -1).slice(l, i);
  return [...s.slice(0, l), ...s.slice(i, c), ...m, ...s.slice(c)];
}
function Cl(s, l) {
  return [...s.slice(0, l), ...s.slice(pe(s, l))];
}
function Ne(s) {
  return { key: `m${++At}`, depth: 0, entry_id: null, term_id: null, collection_id: null, target: null, url: null, labels: {}, new_tab: !1, query: null, ...s };
}
function kl({ menu: s, items: l, locales: n, limits: r, terms: i, listings: c, can: m, settings: x }) {
  const d = z(`cms/menus/${s.handle}/links`);
  a.useBreadcrumbs([{ label: t("Menus"), href: z("cms/menus") }, { label: s.title }]);
  const [o, g] = _.useState(() => Et(l)), [u, h] = _.useState(null), p = C.useForm({ items: l }), b = p.errors, [S, k] = _.useState(!1), $ = n[0] ?? "en", w = (v) => {
    g(v), k(!0);
  }, N = (v, M) => w(o.map((D, F) => F === v ? { ...D, ...M } : D)), f = () => {
    p.processing || (p.transform(() => ({ items: yl(o).map(Ht) })), p.put(d, { preserveScroll: !0, onSuccess: () => k(!1) }));
  }, L = (v) => {
    v.preventDefault(), f();
  };
  a.useUnsavedChanges(S, m.update ? f : void 0);
  const T = (v) => /* @__PURE__ */ e.jsx(
    a.SortableList,
    {
      items: le(o, v),
      getId: (M) => o[M].key,
      getLabel: (M) => o[M].labels[$] || o[M].target?.title || o[M].url || "link",
      disabled: !m.update,
      onReorder: (M) => w(ss(o, v, M)),
      className: v < 0 ? "cms:gap-1" : "cms:mt-1 cms:gap-1 cms:pl-6",
      children: (M, { handle: D, isOverlay: F }) => {
        const j = o[M];
        return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${F ? "" : "cms:border-border/70"}`, children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2 cms:p-2", children: [
            m.update && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:h-10 cms:shrink-0 cms:items-center", children: /* @__PURE__ */ e.jsx(a.SortableHandle, { ...D, label: t("Move :title", { title: j.labels[$] || j.target?.title || j.url || t("link") }) }) }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
                /* @__PURE__ */ e.jsx(
                  a.Input,
                  {
                    "aria-label": t("Label (:language)", { language: P($) }),
                    className: "cms:w-full cms:sm:max-w-xs",
                    disabled: !m.update,
                    placeholder: j.target?.title ?? t("Label"),
                    value: j.labels[$] ?? "",
                    onChange: (E) => N(M, { labels: { ...j.labels, [$]: E.target.value } })
                  }
                ),
                /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-32 cms:flex-1 cms:truncate cms:text-sm cms:text-muted-foreground", children: j.url !== null ? j.url : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  j.target ? `${j.target.kind}: ${j.target.title}` : t("Gone"),
                  " ",
                  (!j.target || !j.target.live) && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", children: t("Not on the site") })
                ] }) }),
                m.update && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center", children: [
                  /* @__PURE__ */ e.jsxs("label", { className: "cms:mr-2 cms:flex cms:items-center cms:gap-1.5 cms:text-sm", children: [
                    /* @__PURE__ */ e.jsx(a.Checkbox, { checked: j.new_tab, onCheckedChange: (E) => N(M, { new_tab: E }) }),
                    " ",
                    t("New tab")
                  ] }),
                  /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": t("Out a level"), disabled: j.depth === 0, onClick: () => w(Sl(o, M)), children: /* @__PURE__ */ e.jsx(ha, {}) }),
                  /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": t("In a level"), onClick: () => w(Nl(o, M, r.depth)), children: /* @__PURE__ */ e.jsx(xa, {}) }),
                  /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": t("Remove, with what's under it"), onClick: () => w(Cl(o, M)), children: /* @__PURE__ */ e.jsx(W, {}) })
                ] })
              ] }),
              j.collection_id !== null && /* @__PURE__ */ e.jsx(
                a.Input,
                {
                  "aria-label": t("Filters"),
                  className: "cms:w-full cms:sm:max-w-md cms:font-mono",
                  disabled: !m.update,
                  placeholder: t("Filters (optional): :example", { example: "listing_type=for-sale" }),
                  value: j.query ?? "",
                  onChange: (E) => N(M, { query: E.target.value })
                }
              ),
              n.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: n.slice(1).map((E) => /* @__PURE__ */ e.jsx(
                a.Input,
                {
                  "aria-label": t("Label (:language)", { language: P(E) }),
                  className: "cms:w-full cms:sm:max-w-xs",
                  disabled: !m.update,
                  placeholder: t(":language: as :main", { language: P(E), main: P($) }),
                  value: j.labels[E] ?? "",
                  onChange: (R) => N(M, { labels: { ...j.labels, [E]: R.target.value } })
                },
                E
              )) })
            ] })
          ] }),
          !F && le(o, M).length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:px-2 cms:pb-2", children: T(M) })
        ] });
      }
    }
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: L, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: s.title }),
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: s.title,
        back: { href: z("cms/menus"), label: t("Back to menus") },
        actions: m.update && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          x && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(C.Link, { href: x, children: [
            /* @__PURE__ */ e.jsx(Je, {}),
            " ",
            t("Settings")
          ] }) }),
          /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", disabled: o.length >= r.items, onClick: () => h("entry"), children: [
            /* @__PURE__ */ e.jsx(J, {}),
            " ",
            t("Entry")
          ] }),
          i.length > 0 && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", disabled: o.length >= r.items, onClick: () => h("term"), children: [
            /* @__PURE__ */ e.jsx(ja, {}),
            " ",
            t("Term")
          ] }),
          c.length > 0 && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", disabled: o.length >= r.items, onClick: () => h("listing"), children: [
            /* @__PURE__ */ e.jsx(pa, {}),
            " ",
            t("Listing")
          ] }),
          /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", disabled: o.length >= r.items, onClick: () => h("url"), children: [
            /* @__PURE__ */ e.jsx(ua, {}),
            " ",
            t("Link")
          ] }),
          /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: p.processing, children: [
            p.processing && /* @__PURE__ */ e.jsx(de, { className: "cms:animate-spin" }),
            " ",
            t("Save")
          ] })
        ] }),
        children: S && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
      }
    ),
    /* @__PURE__ */ e.jsx(A, { message: b.items }),
    Object.keys(b).some((v) => v.startsWith("items.")) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: t("Some links need fixing: :error", { error: Object.values(b).filter(Boolean)[0] }) }),
    /* @__PURE__ */ e.jsx(a.Card, { className: "cms:p-2", children: o.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:p-4 cms:text-center cms:text-muted-foreground", children: t("No links yet. Add an entry or a link.") }) : T(-1) }),
    /* @__PURE__ */ e.jsx(_l, { kind: u, terms: i, listings: c, onClose: () => h(null), onAdd: (v) => {
      w([...o, v]), h(null);
    }, main: $ })
  ] });
}
function Ht({ target: s, children: l, ...n }) {
  return { ...n, children: l.map(Ht) };
}
const wl = () => t("A menu links to entries that already exist: create the page first (Content → Entries), then add it here, or add a web address instead."), $l = () => ({ entry: t("Link to an entry"), term: t("Link to a term's page"), listing: t("Link to a listing page"), url: t("Link to an address") }), Dl = () => ({
  entry: t("It follows the entry: its title (unless you give a label) and its address in each language. It shows only while the entry is on the site."),
  term: t("The page listing the term's entries, in each language. Its title is the label unless you give one."),
  listing: t("The collection's listing page, in each language, optionally with filters. The collection's title is the label unless you give one."),
  url: t("A web address, a path on this site (/contact), mailto: or tel:.")
});
function _l({ kind: s, terms: l, listings: n, onClose: r, onAdd: i, main: c }) {
  const [m, x] = _.useState(null), [d, o] = _.useState(""), [g, u] = _.useState(""), [h, p] = _.useState(""), [b, S] = _.useState("");
  _.useEffect(() => {
    x(null), o(""), u(""), p(""), S("");
  }, [s]);
  const k = g.trim() === "" || Ca(g.trim()), $ = h.trim() ? { [c]: h.trim() } : {}, w = async () => {
    if (s === "entry" && m !== null) {
      const f = await fetch(`${z("cms/entries/picker")}?${jt({ ids: [m], collections: [] })}`, { headers: { Accept: "application/json" }, credentials: "same-origin" }), L = f.ok ? (await f.json()).items[0] : void 0;
      i(Ne({ entry_id: m, target: L ? { title: L.title, kind: L.collection, live: L.status === "published" } : null, labels: $ }));
    } else if (s === "term" && d !== "") {
      const f = l.find((L) => String(L.id) === d);
      i(Ne({ term_id: Number(d), target: f ? { title: f.title, kind: f.taxonomy, live: !0 } : null, labels: $ }));
    } else if (s === "listing" && d !== "") {
      const f = n.find((L) => String(L.id) === d);
      i(Ne({ collection_id: Number(d), target: f ? { title: f.title, kind: t("Listing page"), live: !0 } : null, labels: $, query: b.trim().replace(/^\?/, "") || null }));
    } else s === "url" && g.trim() !== "" && k && h.trim() !== "" && i(Ne({ url: g.trim(), labels: $ }));
  }, N = s === "entry" ? m !== null : s === "url" ? g.trim() !== "" && k && h.trim() !== "" : d !== "";
  return /* @__PURE__ */ e.jsx(a.Dialog, { open: s !== null, onOpenChange: (f) => !f && r(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: s ? $l()[s] : "" }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: s ? Dl()[s] : "" })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
      s === "entry" && /* @__PURE__ */ e.jsx(
        $e,
        {
          id: "menu-entry",
          value: m,
          multiple: !1,
          max: null,
          collections: [],
          invalid: !1,
          emptyHint: wl(),
          onChange: (f) => x(typeof f == "number" ? f : null)
        }
      ),
      (s === "term" || s === "listing") && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "menu-target", children: t(s === "term" ? "Term" : "Collection") }),
        /* @__PURE__ */ e.jsxs(a.Select, { value: d, onValueChange: o, children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: "menu-target", children: /* @__PURE__ */ e.jsx(a.SelectValue, { placeholder: t("Choose…") }) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: s === "term" ? l.map((f) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: String(f.id), children: [
            f.taxonomy,
            ": ",
            f.title
          ] }, f.id)) : n.map((f) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: String(f.id), children: f.title }, f.id)) })
        ] })
      ] }),
      s === "listing" && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "menu-query", children: t("Filters (optional)") }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: "menu-query",
            className: "cms:font-mono",
            value: b,
            placeholder: "listing_type=for-sale",
            onChange: (f) => S(f.target.value)
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("What the listing page's filters put after the ? in its address. Each language's link gets them, and a term may be named by its slug in any language.") })
      ] }),
      s === "url" && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "menu-url", children: t("Address") }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: "menu-url",
            value: g,
            placeholder: t("https://… or /contact"),
            "aria-invalid": !k,
            onChange: (f) => u(f.target.value)
          }
        ),
        !k && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t("This address could run code; use https://, a path, mailto: or tel:.") })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "menu-label", children: t(s === "url" ? "Label" : "Label (optional)") }),
        /* @__PURE__ */ e.jsx(a.Input, { id: "menu-label", value: h, onChange: (f) => p(f.target.value) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: r, children: t("Cancel") }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", onClick: () => {
        w();
      }, disabled: !N, children: t("Add") })
    ] })
  ] }) });
}
const Tl = () => [
  { value: "all", label: t("All") },
  { value: "pending", label: t("Pending") },
  { value: "approved", label: t("Approved") },
  { value: "spam", label: t("Spam") },
  { value: "trashed", label: t("Trash") }
], Bl = (s) => ({ pending: t("Pending"), approved: t("Approved"), spam: t("Spam") })[s];
function Ll({ tab: s, counts: l, filters: n, collections: r, comments: i, can: c, errors: m = {} }) {
  a.useBreadcrumbs([{ label: t("Comments"), href: z("cms/comments") }]);
  const [x, d] = _.useState(n.search), [o, g] = _.useState([]), [u, h] = _.useState(null), [p, b] = ce(), S = (f) => {
    const L = { status: s, search: n.search, collection: n.collection, ...f };
    C.router.get(z("cms/comments"), {
      ...L.status !== "all" ? { status: L.status } : {},
      ...L.search ? { search: L.search } : {},
      ...L.collection ? { collection: L.collection } : {},
      ...n.entry ? { entry: n.entry } : {}
    }, { preserveState: !0, replace: !0, onSuccess: () => g([]) });
  };
  _.useEffect(() => {
    if (x === n.search) return;
    const f = window.setTimeout(() => S({ search: x }), 300);
    return () => window.clearTimeout(f);
  }, [x]);
  const k = (f, L = {}) => C.router.post(z(f), L, { preserveScroll: !0, onSuccess: () => g([]) }), $ = (f, L) => k(`cms/comments/${f.id}/status`, { status: L }), w = (f) => {
    const L = () => k("cms/comments/bulk", { action: f, ids: o });
    f === "delete" ? p(o.length === 1 ? t("Delete 1 comment for good? This can't be undone.") : t("Delete :count comments for good? This can't be undone.", { count: o.length }), L) : L();
  }, N = i.data.length > 0 && o.length === i.data.length;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: t("Comments") }),
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: t("Comments"),
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:sm:w-64", children: [
            /* @__PURE__ */ e.jsx(fe, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                type: "search",
                placeholder: t("Search text, name or email"),
                "aria-label": t("Search comments"),
                className: "cms:pl-9",
                value: x,
                onChange: (f) => d(f.target.value)
              }
            )
          ] }),
          r.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: n.collection ?? "all", onValueChange: (f) => S({ collection: f === "all" ? null : f }), children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": t("Collection"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(a.SelectItem, { value: "all", children: t("Every collection") }),
              r.map((f) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: f.handle, children: f.title }, f.handle))
            ] })
          ] })
        ] })
      }
    ),
    n.entry !== null && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      t("Comments on one entry."),
      " ",
      /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:underline cms:underline-offset-4", onClick: () => C.router.get(z("cms/comments")), children: t("Show all") })
    ] }),
    /* @__PURE__ */ e.jsx(a.Tabs, { value: s, onValueChange: (f) => S({ status: f }), children: /* @__PURE__ */ e.jsx(a.TabsList, { className: "cms:h-auto cms:flex-wrap cms:justify-start", children: Tl().map((f) => /* @__PURE__ */ e.jsxs(a.TabsTrigger, { value: f.value, children: [
      f.label,
      " ",
      /* @__PURE__ */ e.jsx("span", { className: "cms:ml-1 cms:text-muted-foreground", children: l[f.value] })
    ] }, f.value)) }) }),
    o.length > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2 cms:text-sm", role: "toolbar", "aria-label": t("With the selected comments"), children: [
      /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", children: t(":count selected", { count: o.length }) }),
      c.moderate && s !== "trashed" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "outline", onClick: () => w("approve"), children: [
          /* @__PURE__ */ e.jsx(Se, {}),
          " ",
          t("Approve")
        ] }),
        /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "outline", onClick: () => w("unapprove"), children: [
          /* @__PURE__ */ e.jsx(qe, {}),
          " ",
          t("Unapprove")
        ] }),
        /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "outline", onClick: () => w("spam"), children: [
          /* @__PURE__ */ e.jsx(Ue, {}),
          " ",
          t("Spam")
        ] })
      ] }),
      c.delete && s !== "trashed" && /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "outline", onClick: () => w("trash"), children: [
        /* @__PURE__ */ e.jsx(W, {}),
        " ",
        t("Trash")
      ] }),
      c.delete && s === "trashed" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "outline", onClick: () => w("restore"), children: [
          /* @__PURE__ */ e.jsx(xe, {}),
          " ",
          t("Restore")
        ] }),
        /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "destructive", onClick: () => w("delete"), children: [
          /* @__PURE__ */ e.jsx(W, {}),
          " ",
          t("Delete for good")
        ] })
      ] })
    ] }),
    i.data.length === 0 ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:rounded-xl cms:border cms:border-dashed cms:px-6 cms:py-16 cms:text-center", children: [
      /* @__PURE__ */ e.jsx("span", { className: "cms:grid cms:size-10 cms:place-items-center cms:rounded-full cms:bg-muted cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx(ga, { className: "cms:size-4" }) }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: n.search ? t("No comments match.") : t("No comments here.") })
    ] }) : /* @__PURE__ */ e.jsxs(a.Card, { className: "cms:divide-y cms:p-0", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3 cms:px-4 cms:py-2 cms:text-sm cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsx(a.Checkbox, { checked: N, "aria-label": t("Select all"), onCheckedChange: (f) => g(f ? i.data.map((L) => L.id) : []) }),
        /* @__PURE__ */ e.jsx("span", { children: t(":from–:to of :total", { from: i.from, to: i.to, total: i.total }) })
      ] }),
      i.data.map((f) => /* @__PURE__ */ e.jsxs("article", { className: "cms:flex cms:gap-3 cms:px-4 cms:py-4", "aria-labelledby": `comment-${f.id}-author`, children: [
        /* @__PURE__ */ e.jsx(
          a.Checkbox,
          {
            checked: o.includes(f.id),
            "aria-label": t("Select :author's comment", { author: f.author }),
            onCheckedChange: (L) => g(L ? [...o, f.id] : o.filter((T) => T !== f.id))
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-x-3 cms:gap-y-1 cms:text-sm", children: [
            /* @__PURE__ */ e.jsx("span", { id: `comment-${f.id}-author`, className: "cms:font-medium", children: f.author }),
            f.email && /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", children: f.email }),
            f.member && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", children: t("Signed in") }),
            !f.trashed && /* @__PURE__ */ e.jsx(a.Badge, { variant: f.status === "approved" ? "success" : f.status === "spam" ? "destructive" : "warning", children: Bl(f.status) }),
            /* @__PURE__ */ e.jsxs("span", { className: "cms:text-muted-foreground", children: [
              f.createdAt ? K(f.createdAt) : "",
              " · ",
              f.locale.toUpperCase()
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
            t("On"),
            " ",
            f.entry.url ? /* @__PURE__ */ e.jsxs("a", { href: f.entry.url, target: "_blank", rel: "noreferrer", className: "cms:underline-offset-4 hover:cms:underline", children: [
              f.entry.title,
              " ",
              /* @__PURE__ */ e.jsx(he, { className: "cms:inline cms:size-3" })
            ] }) : f.entry.title,
            f.parent && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              " · ",
              t("replying to :author: “:excerpt”", { author: f.parent.author, excerpt: f.parent.excerpt })
            ] })
          ] }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:whitespace-pre-wrap cms:break-words", children: f.body }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-1", children: [
            c.moderate && !f.trashed && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              f.status !== "approved" && /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => $(f, "approved"), children: [
                /* @__PURE__ */ e.jsx(Se, {}),
                " ",
                t("Approve")
              ] }),
              f.status === "approved" && /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => $(f, "pending"), children: [
                /* @__PURE__ */ e.jsx(qe, {}),
                " ",
                t("Unapprove")
              ] }),
              f.status !== "spam" && /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => $(f, "spam"), children: [
                /* @__PURE__ */ e.jsx(Ue, {}),
                " ",
                t("Spam")
              ] }),
              f.status !== "spam" && /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => h({ row: f, mode: "reply" }), children: [
                /* @__PURE__ */ e.jsx(at, {}),
                " ",
                t("Reply")
              ] }),
              /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => h({ row: f, mode: "edit" }), children: [
                /* @__PURE__ */ e.jsx(ct, {}),
                " ",
                t("Edit")
              ] })
            ] }),
            c.delete && !f.trashed && /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => C.router.delete(z(`cms/comments/${f.id}`), { preserveScroll: !0 }), children: [
              /* @__PURE__ */ e.jsx(W, {}),
              " ",
              t("Trash")
            ] }),
            c.delete && f.trashed && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => k(`cms/comments/${f.id}/restore`), children: [
                /* @__PURE__ */ e.jsx(xe, {}),
                " ",
                t("Restore")
              ] }),
              /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => p(
                t("Delete this comment for good? Replies to it stay."),
                () => C.router.delete(z(`cms/comments/${f.id}/force`), { preserveScroll: !0 })
              ), children: [
                /* @__PURE__ */ e.jsx(W, {}),
                " ",
                t("Delete for good")
              ] })
            ] })
          ] })
        ] })
      ] }, f.id))
    ] }),
    (i.prev_page_url || i.next_page_url) && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:justify-end cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(a.Button, { variant: "outline", size: "sm", disabled: !i.prev_page_url, onClick: () => i.prev_page_url && C.router.get(i.prev_page_url), children: [
        /* @__PURE__ */ e.jsx(Ye, {}),
        " ",
        t("Newer")
      ] }),
      /* @__PURE__ */ e.jsxs(a.Button, { variant: "outline", size: "sm", disabled: !i.next_page_url, onClick: () => i.next_page_url && C.router.get(i.next_page_url), children: [
        t("Older"),
        " ",
        /* @__PURE__ */ e.jsx(ge, {})
      ] })
    ] }),
    u && /* @__PURE__ */ e.jsx(Ml, { row: u.row, mode: u.mode, error: m.body, onClose: () => h(null) }, `${u.mode}-${u.row.id}`),
    b
  ] });
}
function Ml({ row: s, mode: l, error: n, onClose: r }) {
  const [i, c] = _.useState(l === "edit" ? s.body : ""), [m, x] = _.useState(!1), d = () => {
    x(!0);
    const o = { preserveScroll: !0, onSuccess: r, onFinish: () => x(!1) };
    l === "reply" ? C.router.post(z(`cms/comments/${s.id}/reply`), { body: i }, o) : C.router.put(z(`cms/comments/${s.id}`), { body: i }, o);
  };
  return /* @__PURE__ */ e.jsx(a.Dialog, { open: !0, onOpenChange: (o) => !o && r(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: l === "reply" ? t("Reply to :author", { author: s.author }) : t("Edit :author's comment", { author: s.author }) }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: l === "reply" ? s.status === "pending" ? t("Your reply is published at once, and approves this comment.") : t("Your reply is published at once, under your name.") : t("Fix a typo or remove a link.") })
    ] }),
    l === "reply" && /* @__PURE__ */ e.jsx("p", { className: "cms:max-h-32 cms:overflow-auto cms:whitespace-pre-wrap cms:text-sm cms:text-muted-foreground", children: s.body }),
    /* @__PURE__ */ e.jsx(
      a.Textarea,
      {
        "aria-label": t(l === "reply" ? "Your reply" : "Comment"),
        rows: 5,
        value: i,
        "aria-invalid": n !== void 0,
        onChange: (o) => c(o.target.value)
      }
    ),
    /* @__PURE__ */ e.jsx(A, { message: n }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: r, children: t("Cancel") }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", disabled: i.trim() === "" || m, onClick: d, children: t(l === "reply" ? "Post reply" : "Save") })
    ] })
  ] }) });
}
const zl = () => [
  { role: "title", label: t("Meta title"), automatic: t("Automatic (the title)") },
  { role: "description", label: t("Meta description"), automatic: t("Automatic (nothing)") },
  { role: "image", label: t("Share image"), automatic: t("Automatic (nothing)") }
], Fe = "__auto";
function Il({ site: s, siteName: l, collections: n, taxonomies: r }) {
  a.useBreadcrumbs([{ label: t("Settings"), href: z("settings") }, { label: t("SEO") }]);
  const i = [...n ?? [], ...r ?? []], c = C.useForm({
    site: { ...s },
    mappings: i.map((u) => ({ kind: u.kind, id: u.id, title: u.chosen.title ?? "", description: u.chosen.description ?? "", image: u.chosen.image ?? "" }))
  }), m = c.errors, x = () => c.put(z("cms/seo"), { preserveScroll: !0, onSuccess: () => c.setDefaults() });
  a.useUnsavedChanges(c.isDirty, x);
  const d = (u, h) => c.setData("site", { ...c.data.site, [u]: h }), o = (u, h, p) => c.setData("mappings", c.data.mappings.map((b, S) => S === u ? { ...b, [h]: p } : b)), g = (u, h, p, b, S) => /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: h, description: p, titleClassName: "cms:text-base", storageKey: `cms:seo:${u}`, contentClassName: "cms:flex cms:flex-col cms:divide-y cms:divide-border/60", children: [
    b.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("None yet.") }),
    b.map((k, $) => {
      const w = S + $;
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3 cms:py-4 cms:first:pt-0 cms:last:pb-0", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:justify-between cms:gap-3", children: [
          /* @__PURE__ */ e.jsx("h3", { className: "cms:font-medium", children: k.title }),
          /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: k.blueprint ? t("Blueprint: :name", { name: k.blueprint }) : t("No blueprint") })
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-3 cms:sm:grid-cols-3", children: zl().map(({ role: N, label: f, automatic: L }) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-1.5", children: [
          /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `seo-${w}-${N}`, className: "cms:text-xs", children: f }),
          /* @__PURE__ */ e.jsxs(a.Select, { value: c.data.mappings[w]?.[N] || Fe, onValueChange: (T) => o(w, N, T === Fe ? "" : T), children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: `seo-${w}-${N}`, className: "cms:w-full", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(a.SelectItem, { value: Fe, children: L }),
              k.options[N].map((T) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: T.value, children: T.label }, T.value))
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(A, { message: m[`mappings.${w}.${N}`] })
        ] }, N)) })
      ] }, `${k.kind}-${k.id}`);
    })
  ] });
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (u) => {
    u.preventDefault(), x();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: t("SEO") }),
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: t("SEO"),
        description: t("What search engines and shared links see of the site."),
        actions: /* @__PURE__ */ e.jsx(a.Button, { type: "submit", disabled: c.processing, children: t("Save SEO settings") })
      }
    ),
    /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: t("Search engines and sharing"), titleClassName: "cms:text-base", storageKey: "cms:seo:site", contentClassName: "cms:flex cms:flex-col cms:gap-5", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Switch, { id: "seo-noindex", checked: c.data.site.noindex, onCheckedChange: (u) => d("noindex", u) }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-0.5", children: [
          /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "seo-noindex", children: t("Hide the whole site from search engines") }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t("Every page asks not to be indexed and the sitemap is empty. For a site still being built, or staging.") })
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-start cms:justify-between cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-3", children: [
          /* @__PURE__ */ e.jsx(a.Switch, { id: "seo-append", checked: c.data.site.appendName, onCheckedChange: (u) => d("appendName", u) }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-0.5", children: [
            /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "seo-append", children: t("Add the site name to page titles") }),
            /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t('The browser tab and search results show ":example". Share previews keep the bare title.', { example: `${t("About")} ${c.data.site.separator || "|"} ${l}` }) })
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
          /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "seo-separator", className: "cms:text-xs", children: t("Separator") }),
          /* @__PURE__ */ e.jsx(
            a.Input,
            {
              id: "seo-separator",
              className: "cms:w-20",
              maxLength: 5,
              disabled: !c.data.site.appendName,
              value: c.data.site.separator,
              onChange: (u) => d("separator", u.target.value)
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:max-w-xs cms:flex-col cms:gap-1.5", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "seo-twitter", children: t("X (Twitter) account") }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: "seo-twitter",
            placeholder: "@acme",
            maxLength: 16,
            value: c.data.site.twitter,
            onChange: (u) => d("twitter", u.target.value)
          }
        ),
        /* @__PURE__ */ e.jsx(A, { message: m["site.twitter"] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "seo-image", children: t("Default share image") }),
        /* @__PURE__ */ e.jsx(
          a.MediaPickerInput,
          {
            id: "seo-image",
            invalid: m["site.image"] !== void 0,
            disabled: !1,
            multiple: !1,
            max: null,
            types: ["image"],
            value: c.data.site.image,
            onChange: (u) => d("image", typeof u == "number" ? u : null)
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t("Shown when a page is shared and has no image of its own.") }),
        /* @__PURE__ */ e.jsx(A, { message: m["site.image"] })
      ] })
    ] }),
    i.length > 0 && /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx("h2", { className: "cms:text-base cms:font-medium", children: t("Fields used for SEO") }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("When an entry or term leaves its meta title, description or share image empty, the site uses one of its fields instead. A page's own SEO fields always win; after the field come the site's (the description in Settings → Site, the share image above).") })
    ] }),
    n !== null && g("Collections", t("Collections"), t("Entries of each collection."), n, 0),
    r !== null && g("Taxonomies", t("Taxonomies"), t("Term pages of each taxonomy."), r, n?.length ?? 0),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t("Meta title: a text field. Meta description: a text or textarea field, cut to 300 characters. Share image: the first image of a media field.") })
  ] });
}
const Al = 3;
function El({ form: s, forms: l, submissions: n, can: r, createForm: i = null }) {
  a.useBreadcrumbs([{ label: t("Submissions"), href: z("cms/submissions") }, ...s ? [{ label: s.title }] : []]);
  const [c, m] = _.useState(null), [x, d] = ce();
  if (!s || !n)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(C.Head, { title: t("Submissions") }),
      /* @__PURE__ */ e.jsx(a.PageHeader, { title: t("Submissions"), description: t("What visitors send through the site's forms.") }),
      /* @__PURE__ */ e.jsxs(a.Card, { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:px-6 cms:py-14 cms:text-center", children: [
        /* @__PURE__ */ e.jsx(da, { className: "cms:size-8 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
          /* @__PURE__ */ e.jsx("p", { className: "cms:font-medium", children: t("No forms yet") }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:max-w-sm cms:text-sm cms:text-muted-foreground", children: t(i ? "Create a form, put it on a page, and what visitors send shows up here." : "Once someone creates a form and puts it on a page, what visitors send shows up here.") })
        ] }),
        i && /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(C.Link, { href: i, children: [
          /* @__PURE__ */ e.jsx(J, {}),
          " ",
          t("Create a form")
        ] }) })
      ] })
    ] });
  const o = (n.data[0]?.rows ?? []).slice(0, Al), g = (u) => x(
    t("Delete this submission for good? It can't be restored."),
    () => C.router.delete(z(`cms/submissions/${u.id}`), { preserveScroll: !0, onSuccess: () => m(null) })
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: t(":form submissions", { form: s.title }) }),
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: s.title,
        actions: n.total > 0 && r.export && /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: z(`cms/forms/${s.handle}/submissions/export`), children: [
          /* @__PURE__ */ e.jsx(Os, {}),
          " ",
          t("Export CSV")
        ] }) }),
        children: l.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: s.handle, onValueChange: (u) => C.router.get(z(`cms/forms/${u}/submissions`)), children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-56", "aria-label": t("Form"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: l.map((u) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: u.handle, children: [
            u.title,
            " (",
            u.count,
            ")"
          ] }, u.handle)) })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(a.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(a.Table, { children: [
      /* @__PURE__ */ e.jsx(a.TableHeader, { children: /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
        /* @__PURE__ */ e.jsx(a.TableHead, { children: t("Sent") }),
        o.map((u) => /* @__PURE__ */ e.jsx(a.TableHead, { children: u.label }, u.handle))
      ] }) }),
      /* @__PURE__ */ e.jsxs(a.TableBody, { children: [
        n.data.length === 0 && /* @__PURE__ */ e.jsx(a.TableRow, { children: /* @__PURE__ */ e.jsx(a.TableCell, { colSpan: o.length + 1, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: t("Nothing sent yet.") }) }),
        n.data.map((u) => /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
          /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:whitespace-nowrap", children: /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:font-medium cms:hover:underline", onClick: () => m(u), children: K(u.createdAt) }) }),
          o.map((h) => /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:max-w-64 cms:truncate", children: u.rows.find((p) => p.handle === h.handle)?.value }, h.handle))
        ] }, u.id))
      ] })
    ] }) }),
    n.total > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:text-sm cms:text-muted-foreground", children: [
      /* @__PURE__ */ e.jsx("span", { children: t(":from–:to of :total", { from: n.from, to: n.to, total: n.total }) }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": t("Previous page"),
            disabled: !n.prev_page_url,
            onClick: () => n.prev_page_url && C.router.get(n.prev_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(Ye, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": t("Next page"),
            disabled: !n.next_page_url,
            onClick: () => n.next_page_url && C.router.get(n.next_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(ge, {})
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(a.Dialog, { open: c !== null, onOpenChange: (u) => !u && m(null), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto", children: [
      /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
        /* @__PURE__ */ e.jsx(a.DialogTitle, { children: s.title }),
        /* @__PURE__ */ e.jsxs(a.DialogDescription, { children: [
          t("Sent :date", { date: K(c?.createdAt ?? null) }),
          " · ",
          c?.locale.toUpperCase()
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-3 cms:text-sm", children: c?.rows.map((u) => /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: u.label }),
        /* @__PURE__ */ e.jsx("dd", { className: "cms:whitespace-pre-wrap cms:break-words cms:text-muted-foreground", children: u.files && u.files.length > 0 ? /* @__PURE__ */ e.jsx("ul", { className: "cms:flex cms:flex-col cms:gap-1", children: u.files.map((h) => /* @__PURE__ */ e.jsx("li", { children: /* @__PURE__ */ e.jsx("a", { href: h.url, className: "cms:underline cms:underline-offset-4 hover:cms:text-foreground", download: !0, children: h.name }) }, h.url)) }) : u.file ? /* @__PURE__ */ e.jsx("a", { href: u.file, className: "cms:underline cms:underline-offset-4 hover:cms:text-foreground", download: !0, children: u.value }) : u.value || "—" })
      ] }, u.handle)) }),
      c && (c.visitor.ip || c.visitor.userAgent || c.visitor.referrer) && /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-3 cms:border-t cms:pt-3 cms:text-sm", children: [[t("IP address"), c.visitor.ip], [t("Browser"), c.visitor.userAgent], [t("Sent from"), c.visitor.referrer]].map(([u, h]) => h && /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: u }),
        /* @__PURE__ */ e.jsx("dd", { className: "cms:break-all cms:text-muted-foreground", children: h })
      ] }, u)) }),
      r.delete && c && /* @__PURE__ */ e.jsx(a.DialogFooter, { children: /* @__PURE__ */ e.jsxs(a.Button, { variant: "destructive", onClick: () => g(c), children: [
        /* @__PURE__ */ e.jsx(W, {}),
        " ",
        t("Delete")
      ] }) })
    ] }) }),
    d
  ] });
}
function Fl(s) {
  return /* @__PURE__ */ e.jsx(Hl, { ...s }, `${s.locale}:${s.version}:${JSON.stringify([s.values, s.seo, s.term.template])}`);
}
function Hl({ taxonomy: s, term: l, translated: n, fields: r, locale: i, locales: c, shared: m, sharedValues: x, values: d, seo: o, version: g, usedBy: u = [] }) {
  const h = z(`cms/taxonomies/${s.handle}/terms`), p = z(`cms/terms/${l.id}/content`);
  a.useBreadcrumbs([{ label: s.title, href: `${h}?locale=${i}` }, { label: l.title }]);
  const b = C.useForm({
    locale: i,
    title: l.ownTitle ?? "",
    slug: l.slug ?? "",
    data: d,
    seo: o ?? {},
    template: l.template ?? "",
    version: g
  }), S = b.errors, k = (T) => {
    const v = De(S, T);
    v.length > 0 && b.clearErrors(...v);
  }, $ = () => b.processing || b.put(p, { preserveScroll: !0 }), w = () => {
    b.transform((T) => ({ ...T, version: null })), b.put(p, { preserveScroll: !0 });
  }, N = a.useEditLock({
    type: "cms.term",
    id: l.id,
    locale: i,
    enabled: n,
    noun: t("term"),
    leaveTo: `${h}?locale=${i}`,
    getUnsaved: () => b.isDirty ? { data: b.data.data, seo: b.data.seo, template: b.data.template } : null
  }), f = !N.readOnly, L = async (T) => {
    const v = await N.loadKept(T);
    b.setData((M) => ({
      ...M,
      data: v.data && typeof v.data == "object" ? v.data : M.data,
      seo: v.seo && typeof v.seo == "object" ? v.seo : M.seo,
      template: typeof v.template == "string" ? v.template : M.template
    }));
  };
  return a.useUnsavedChanges(b.isDirty && !N.takenOver, f ? $ : void 0), /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (T) => {
    T.preventDefault(), $();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: l.title }),
    N.dialogs,
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: l.title,
        back: { href: `${h}?locale=${i}`, label: t("Back to :title", { title: s.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          l.url && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: l.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(he, {}),
            " ",
            t("View page")
          ] }) }),
          c.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: i, onValueChange: (T) => C.router.get(`${h}/${l.id}/edit`, { locale: T }), children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(a.SelectContent, { children: c.map((T, v) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: T, children: [
              P(T),
              v === 0 ? ` ${t("(main)")}` : ""
            ] }, T)) })
          ] }),
          f && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: b.processing, children: [
            b.processing && /* @__PURE__ */ e.jsx(de, { className: "cms:animate-spin" }),
            " ",
            t("Save")
          ] })
        ] }),
        children: b.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:items-start cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_20rem]", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(a.ViewingNotice, { by: N.viewingBy, onTakeOver: N.requestTakeOver }),
        !n && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:bg-muted/40 cms:p-3 cms:text-sm cms:text-muted-foreground", role: "note", children: t("Not in :language yet: the site shows the :main term meanwhile. Give it a title in :language and save to add it.", { language: P(i), main: P(c[0] ?? "en") }) }),
        /* @__PURE__ */ e.jsxs("fieldset", { disabled: !f, className: "cms:grid cms:min-w-0 cms:gap-4 cms:sm:grid-cols-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "term-title", children: t("Title") }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "term-title",
                value: b.data.title,
                required: !0,
                placeholder: l.mainTitle ?? "",
                maxLength: 255,
                "aria-invalid": S.title !== void 0,
                onChange: (T) => {
                  b.setData("title", T.target.value), k("title");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(A, { message: S.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "term-slug", children: t("Slug") }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "term-slug",
                className: "cms:font-mono",
                value: b.data.slug,
                placeholder: t("Made from the title"),
                maxLength: 200,
                "aria-invalid": S.slug !== void 0,
                onChange: (T) => {
                  b.setData("slug", T.target.value), k("slug");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(A, { message: S.slug })
          ] })
        ] }),
        /* @__PURE__ */ e.jsx(a.KeptEditsNotice, { kept: N.kept, disabled: !f, onLoad: (T) => {
          L(T);
        }, onDiscard: (T) => {
          N.discardKept(T);
        } }),
        /* @__PURE__ */ e.jsx(ts, { message: S.version, processing: b.processing, onSaveMine: w }),
        /* @__PURE__ */ e.jsx(
          Xe,
          {
            disabled: !f,
            fields: r,
            values: b.data.data,
            errors: S,
            storageKey: `cms:term:${s.handle}`,
            shared: m,
            sharedValues: x,
            sharedNote: t("Shared by all languages: the greyed-out fields are edited in :language.", { language: P(c[0] ?? "en") }),
            onChange: (T, v) => {
              b.setData("data", { ...b.data.data, [T]: v }), k(`data.${T}`);
            }
          }
        ),
        /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: t("SEO"), description: t("How this term's page appears in search results and shared links."), titleClassName: "cms:text-base", storageKey: "cms:term:seo", hasErrors: je(S, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !f, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(me, { bare: !0, id: "seo", fields: es(), value: b.data.seo, errors: Z(S, "seo"), onChange: (T) => {
          b.setData("seo", T), k("seo");
        } }) }) })
      ] }),
      /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(
          a.CollapsibleCard,
          {
            title: t("Template"),
            titleClassName: "cms:text-base",
            storageKey: "cms:term:page-settings",
            hasErrors: S.template !== void 0,
            contentClassName: "cms:flex cms:flex-col cms:gap-2",
            children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: !f, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: [
              /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "template", className: "cms:sr-only", children: t("Template") }),
              /* @__PURE__ */ e.jsx(
                a.Input,
                {
                  id: "template",
                  className: "cms:font-mono",
                  placeholder: `cms.${s.handle}-special`,
                  value: b.data.template,
                  onChange: (T) => b.setData("template", T.target.value),
                  "aria-invalid": S.template !== void 0
                }
              ),
              /* @__PURE__ */ e.jsx(Mt, { example: `cms.${s.handle}-special`, fallbacks: [t("the taxonomy's template, if set"), `cms.taxonomy-${s.handle}`, "cms.term"] }),
              /* @__PURE__ */ e.jsx(A, { message: S.template })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: t("Used by"), titleClassName: "cms:text-base", storageKey: "cms:term:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          u.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("No content links here through its fields.") }),
          u.map((T) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:gap-2", children: [
            T.url ? /* @__PURE__ */ e.jsx("a", { href: T.url, className: "cms:truncate cms:underline-offset-4 cms:hover:underline", children: T.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:truncate", children: T.label }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", title: T.field, children: T.fieldLabel ?? T.field })
          ] }, `${T.label}:${T.field}`))
        ] })
      ] })
    ] })
  ] });
}
const He = "__top";
function Pl({ taxonomy: s, locale: l, locales: n, parent: r, terms: i }) {
  const c = z(`cms/taxonomies/${s.handle}/terms`);
  a.useBreadcrumbs([{ label: s.title, href: `${c}?locale=${l}` }, { label: t("New term") }]);
  const m = C.useForm({ title: "", slug: "", parent_id: r, locale: l }), x = m.errors;
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (d) => {
    d.preventDefault(), m.post(c);
  }, className: "cms:flex cms:max-w-3xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: t("New term · :taxonomy", { taxonomy: s.title }) }),
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: t("New term"),
        back: { href: `${c}?locale=${l}`, label: t("Back to :title", { title: s.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          n.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: l, onValueChange: (d) => C.router.get(`${c}/create`, { locale: d, ...r ? { parent: r } : {} }), children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-40", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(a.SelectContent, { children: n.map((d) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: d, children: P(d) }, d)) })
          ] }),
          /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: m.processing, children: [
            m.processing && /* @__PURE__ */ e.jsx(de, { className: "cms:animate-spin" }),
            " ",
            t("Create term")
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:grid cms:gap-5 cms:md:grid-cols-[3fr_2fr]", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "title", children: t("Title") }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: "title",
            value: m.data.title,
            required: !0,
            autoFocus: !0,
            "aria-invalid": x.title !== void 0,
            onChange: (d) => m.setData("title", d.target.value)
          }
        ),
        /* @__PURE__ */ e.jsx(A, { message: x.title })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "slug", children: t("Slug") }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: "slug",
            className: "cms:font-mono",
            value: m.data.slug,
            placeholder: t("Made from the title"),
            "aria-invalid": x.slug !== void 0,
            onChange: (d) => m.setData("slug", d.target.value)
          }
        ),
        /* @__PURE__ */ e.jsx(A, { message: x.slug })
      ] }),
      s.hierarchical && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:md:col-span-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "parent", children: t("Under") }),
        /* @__PURE__ */ e.jsxs(
          a.Select,
          {
            value: m.data.parent_id === null ? He : String(m.data.parent_id),
            onValueChange: (d) => m.setData("parent_id", d === He ? null : Number(d)),
            children: [
              /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: "parent", className: "cms:md:w-1/2", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
              /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: He, children: t("Top level") }),
                i.map((d) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: String(d.id), children: [
                  "— ".repeat(d.depth),
                  d.title
                ] }, d.id))
              ] })
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(A, { message: x.parent_id })
      ] }),
      n.length > 1 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground cms:md:col-span-2", children: t("In :language. Translate it from the list afterwards.", { language: P(l) }) })
    ] }) })
  ] });
}
const Pe = "__top";
function js(s = []) {
  if (s.length === 0) return "";
  const l = s.slice(0, 5).join("; ");
  return ` ${s.length > 5 ? t("It's used by :list and :count more.", { list: l, count: s.length - 5 }) : t("It's used by :list.", { list: l })}`;
}
function Ol({ taxonomy: s, taxonomies: l, terms: n, locales: r, locale: i, trashed: c = !1 }) {
  a.useBreadcrumbs([{ label: s ? s.title : t("Terms") }]);
  const [m, x] = ce(), [d, o] = _.useState(null), [g, u] = _.useState(""), [h, p] = _.useState(n);
  if (_.useEffect(() => p(n), [n]), !s)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(C.Head, { title: t("Terms") }),
      /* @__PURE__ */ e.jsx(a.PageHeader, { title: t("Terms"), description: t("There are no taxonomies yet. Create one under Structure → Taxonomies (categories, tags…), then add its terms here.") })
    ] });
  const b = z(`cms/taxonomies/${s.handle}/terms`), S = (v) => z(`cms/taxonomies/${s.handle}/terms/${v.id}/edit`) + `?locale=${encodeURIComponent(i)}`, k = (v, M) => {
    const D = M.map((F) => h[F].id);
    p(ss(h, v, M)), C.router.post(
      z("cms/terms/reorder"),
      { taxonomy: s.handle, ids: D, parent_id: v < 0 ? null : h[v].id },
      { preserveScroll: !0, preserveState: !0, onError: () => p(n) }
    );
  }, $ = (v) => m(
    t('Move ":title" to the trash, with the terms under it? It comes off the site; you can restore it.', { title: v.fallback }) + js(v.usedBy),
    () => C.router.delete(z(`cms/terms/${v.id}`), { preserveScroll: !0 }),
    t("Move to trash")
  ), w = g.trim().toLowerCase(), N = w === "" ? null : h.filter((v) => `${v.title ?? v.fallback} ${v.slug ?? ""}`.toLowerCase().includes(w)), f = s.collections ?? [], L = (v, M, D) => /* @__PURE__ */ e.jsxs("div", { className: `${bs} cms:border-t cms:border-border/60 cms:px-3 cms:py-2`, children: [
    /* @__PURE__ */ e.jsx("span", { className: "cms:flex cms:justify-center", children: M && !c && /* @__PURE__ */ e.jsx(a.SortableHandle, { ...M, label: t("Move :title", { title: v.fallback }) }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-2", style: { paddingLeft: D * 20 }, children: [
      D > 0 && /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", "aria-hidden": !0, children: "└" }),
      c ? /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: v.title ?? v.fallback }) : /* @__PURE__ */ e.jsx(
        "button",
        {
          type: "button",
          className: "cms:truncate cms:text-left cms:font-medium cms:underline-offset-4 cms:hover:underline",
          onClick: () => s.pages && v.title !== null ? C.router.get(S(v)) : o(v),
          children: v.title ?? /* @__PURE__ */ e.jsx("span", { className: "cms:font-normal cms:text-muted-foreground cms:italic", children: t(":title · not translated", { title: v.fallback }) })
        }
      ),
      v.url && /* @__PURE__ */ e.jsx("a", { href: v.url, target: "_blank", rel: "noopener noreferrer", className: "cms:text-muted-foreground cms:hover:text-foreground", "aria-label": t("Visit term page"), title: t("Visit term page"), children: /* @__PURE__ */ e.jsx(he, { className: "cms:size-3.5" }) })
    ] }),
    /* @__PURE__ */ e.jsx("code", { className: "cms:hidden cms:truncate cms:text-xs cms:text-muted-foreground cms:md:block", children: v.slug ?? "—" }),
    /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:text-sm cms:text-muted-foreground cms:tabular-nums cms:md:block", children: v.entries ?? 0 }),
    /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:text-sm cms:text-muted-foreground cms:md:block", children: Rl(v.createdAt) }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:justify-end", children: c ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-1", children: [
      /* @__PURE__ */ e.jsxs(a.Button, { variant: "outline", size: "sm", onClick: () => C.router.post(z(`cms/terms/${v.id}/restore`), {}, { preserveScroll: !0 }), children: [
        /* @__PURE__ */ e.jsx(xe, {}),
        " ",
        t("Restore")
      ] }),
      /* @__PURE__ */ e.jsxs(
        a.Button,
        {
          variant: "ghost",
          size: "sm",
          className: "cms:text-destructive",
          onClick: () => m(
            t('Delete ":title" for good, in every language? Entries lose it.', { title: v.fallback }) + js(v.usedBy),
            () => C.router.delete(z(`cms/terms/${v.id}/force`), { preserveScroll: !0, data: (v.usedBy ?? []).length > 0 ? { force: 1 } : {} })
          ),
          children: [
            /* @__PURE__ */ e.jsx(W, {}),
            " ",
            t("Delete for good")
          ]
        }
      )
    ] }) : /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": t("Actions for :title", { title: v.fallback }), children: /* @__PURE__ */ e.jsx(Us, {}) }) }),
      /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", children: [
        /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { onSelect: () => o(v), children: [
          /* @__PURE__ */ e.jsx(ct, {}),
          " ",
          t("Rename")
        ] }),
        s.hierarchical && v.title !== null && /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(C.Link, { href: `${b}/create?locale=${encodeURIComponent(i)}&parent=${v.id}`, children: [
          /* @__PURE__ */ e.jsx(J, {}),
          " ",
          t("Add a term under it")
        ] }) }),
        s.pages && v.title !== null && /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(C.Link, { href: S(v), children: [
          /* @__PURE__ */ e.jsx(oa, {}),
          " ",
          t("Edit page")
        ] }) }),
        /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
        /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { className: "cms:text-destructive", onSelect: () => $(v), children: [
          /* @__PURE__ */ e.jsx(W, {}),
          " ",
          t("Move to trash")
        ] })
      ] })
    ] }) })
  ] }), T = (v) => /* @__PURE__ */ e.jsx(a.SortableList, { items: le(h, v), getId: (M) => h[M].id, getLabel: (M) => h[M].title ?? h[M].fallback, disabled: c, onReorder: (M) => k(v, M), className: "cms:gap-0", children: (M, { handle: D, isOverlay: F }) => /* @__PURE__ */ e.jsxs("div", { className: F ? "cms:rounded-md cms:bg-card cms:shadow-md" : "", children: [
    L(h[M], D, h[M].depth),
    !F && !c && le(h, M).length > 0 && T(M)
  ] }) });
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: s.title }),
    x,
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: c ? t(":title — trash", { title: s.title }) : s.title,
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          r.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: i, onValueChange: (v) => C.router.get(b, { locale: v, ...c ? { status: "trashed" } : {} }), children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-40", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(a.SelectContent, { children: r.map((v) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: v, children: P(v) }, v)) })
          ] }),
          c ? /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", onClick: () => C.router.get(b, { locale: i }), children: t("Back to terms") }) : /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(C.Link, { href: `${b}/create?locale=${encodeURIComponent(i)}`, children: [
            /* @__PURE__ */ e.jsx(J, {}),
            " ",
            t("New term")
          ] }) }),
          /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", size: "icon", "aria-label": t("More"), children: /* @__PURE__ */ e.jsx(ra, {}) }) }),
            /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", className: "cms:min-w-56", children: [
              f.length > 0 && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(a.DropdownMenuLabel, { children: t("Used by collections") }),
                f.map((v) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsx(C.Link, { href: v.url, children: v.title }) }, v.url)),
                /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {})
              ] }),
              s.settings && /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(C.Link, { href: s.settings, children: [
                /* @__PURE__ */ e.jsx(Je, {}),
                " ",
                t("Taxonomy settings")
              ] }) }),
              !c && /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { onSelect: () => C.router.get(b, { locale: i, status: "trashed" }), children: [
                /* @__PURE__ */ e.jsx(W, {}),
                " ",
                t("Trash")
              ] })
            ] })
          ] })
        ] }),
        children: l.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: s.handle, onValueChange: (v) => C.router.get(z(`cms/taxonomies/${v}/terms`)), children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": t("Taxonomy"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: l.map((v) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: v.handle, children: v.title }, v.handle)) })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-xs", children: [
        /* @__PURE__ */ e.jsx(fe, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            className: "cms:pl-9",
            placeholder: t("Search terms…"),
            "aria-label": t("Search terms"),
            value: g,
            onChange: (v) => u(v.target.value)
          }
        )
      ] }),
      !c && h.length > 1 && !N && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s.hierarchical ? t("Drag terms to set their order; a term's parent is set when you rename it.") : t("Drag terms to set their order.") })
    ] }),
    /* @__PURE__ */ e.jsxs(a.Card, { className: "cms:gap-0 cms:overflow-hidden cms:py-0", children: [
      /* @__PURE__ */ e.jsxs("div", { className: `${bs} cms:bg-muted/60 cms:px-3 cms:py-2.5 cms:text-sm cms:font-medium cms:text-muted-foreground`, children: [
        /* @__PURE__ */ e.jsx("span", {}),
        /* @__PURE__ */ e.jsx("span", { children: t("Title") }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:md:block", children: t("Slug") }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:md:block", children: t("Entries") }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:md:block", children: t("Created") }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: t("Actions") })
      ] }),
      h.length === 0 ? /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:border-t cms:border-border/60 cms:p-10 cms:text-center cms:text-muted-foreground", children: c ? t("The trash is empty.") : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        t("No terms yet."),
        /* @__PURE__ */ e.jsx(a.Button, { size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs(C.Link, { href: `${b}/create?locale=${encodeURIComponent(i)}`, children: [
          /* @__PURE__ */ e.jsx(J, {}),
          " ",
          t("New term")
        ] }) })
      ] }) }) : N ? N.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:border-t cms:border-border/60 cms:p-8 cms:text-center cms:text-muted-foreground", children: t("No terms match “:search”.", { search: g }) }) : N.map((v) => /* @__PURE__ */ e.jsx(_.Fragment, { children: L(v, null, 0) }, v.id)) : c ? h.map((v) => /* @__PURE__ */ e.jsx(_.Fragment, { children: L(v, null, 0) }, v.id)) : T(-1)
    ] }),
    /* @__PURE__ */ e.jsx(a.Dialog, { open: d !== null, onOpenChange: (v) => {
      v || o(null);
    }, children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
      /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
        /* @__PURE__ */ e.jsx(a.DialogTitle, { children: t("Rename “:title”", { title: d?.fallback }) }),
        /* @__PURE__ */ e.jsx(a.DialogDescription, { children: r.length > 1 ? t("In :language.", { language: P(i) }) : t("Its title and the slug in its address.") })
      ] }),
      d !== null && /* @__PURE__ */ e.jsx(Vl, { term: d, locale: i, terms: n, hierarchical: s.hierarchical, onDone: () => o(null) }, d.id)
    ] }) })
  ] });
}
const bs = "cms:grid cms:items-center cms:gap-3 cms:grid-cols-[1.5rem_1fr_2.5rem] cms:md:grid-cols-[1.5rem_minmax(0,2fr)_minmax(0,1.2fr)_5rem_7rem_2.5rem]";
function Rl(s) {
  if (!s) return "—";
  const l = new Date(s);
  return Number.isNaN(l.getTime()) ? "—" : l.toLocaleDateString(document.documentElement.lang || void 0, { day: "numeric", month: "short", year: "numeric" });
}
function Vl({ locale: s, terms: l, hierarchical: n, term: r, onDone: i }) {
  const c = C.useForm({ title: r.title ?? "", slug: r.slug ?? "", parent_id: r.parentId, locale: s, version: r.version }), m = c.errors, x = /* @__PURE__ */ new Set();
  x.add(r.id);
  const d = l.findIndex((u) => u.id === r.id);
  for (let u = d + 1; u < l.length && (l[u]?.depth ?? 0) > r.depth; u++) x.add(l[u].id);
  const o = (u) => {
    u.preventDefault(), c.put(z(`cms/terms/${r.id}`), { preserveScroll: !0, onSuccess: i });
  }, g = `term-${r.id}`;
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: o, className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${g}-title`, children: t("Title") }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: `${g}-title`,
          value: c.data.title,
          placeholder: r.fallback,
          required: !0,
          autoFocus: !0,
          onChange: (u) => c.setData("title", u.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(A, { message: m.title ?? m.version })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${g}-slug`, children: t("Slug") }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: `${g}-slug`,
          className: "cms:font-mono",
          value: c.data.slug,
          placeholder: t("Made from the title"),
          onChange: (u) => c.setData("slug", u.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(A, { message: m.slug })
    ] }),
    n && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${g}-parent`, children: t("Under") }),
      /* @__PURE__ */ e.jsxs(
        a.Select,
        {
          value: c.data.parent_id === null ? Pe : String(c.data.parent_id),
          onValueChange: (u) => c.setData("parent_id", u === Pe ? null : Number(u)),
          children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: `${g}-parent`, children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(a.SelectItem, { value: Pe, children: t("Top level") }),
              l.filter((u) => !x.has(u.id)).map((u) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: String(u.id), children: [
                "— ".repeat(u.depth),
                u.title ?? u.fallback
              ] }, u.id))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ e.jsx(A, { message: m.parent_id })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", onClick: i, children: t("Cancel") }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "submit", disabled: c.processing, children: t("Save") })
    ] })
  ] });
}
function Ul(s) {
  return function(n) {
    const r = C.usePage().props.cms;
    return Ut(r?.locales), /* @__PURE__ */ e.jsx(s, { ...n });
  };
}
const ql = {
  "Cms/Blueprints/Index": Ya,
  "Cms/Blueprints/Edit": us,
  "Cms/Fieldsets/Index": jl,
  // A fieldset is edited like a blueprint.
  "Cms/Fieldsets/Edit": us,
  "Cms/Entries/Index": ml,
  "Cms/Entries/Edit": Qa,
  "Cms/Listing/Edit": gl,
  "Cms/Terms/Index": Ol,
  "Cms/Terms/Create": Pl,
  "Cms/Terms/Edit": Fl,
  "Cms/Globals/Edit": bl,
  "Cms/Menus/Edit": kl,
  "Cms/Comments/Index": Ll,
  "Cms/Seo/Edit": Il,
  "Cms/Submissions/Index": El
};
Rt({
  pages: Object.fromEntries(Object.entries(ql).map(([s, l]) => [s, Ul(l)]))
});
