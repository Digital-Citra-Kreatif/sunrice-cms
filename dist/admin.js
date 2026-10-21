const ys = globalThis.Sunrice;
if (!ys) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const e = ys.modules["react/jsx-runtime"], Ns = globalThis.Sunrice;
if (!Ns) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const N = Ns.modules["@inertiajs/react"], as = 3;
function We() {
  const s = globalThis.Sunrice;
  if (!s)
    throw new Error("[sunrice] This script runs outside the Sunrice admin panel (window.Sunrice is missing).");
  return s;
}
function Yt(s) {
  const l = We();
  if (l.version !== as)
    throw new Error(`[sunrice] This plugin was built for admin runtime ${as}, but the panel runs ${l.version}. Rebuild it with a matching @sunrice/admin-sdk.`);
  for (const [n, r] of Object.entries(s.pages ?? {}))
    l.registerPage(n, r);
}
function t(s, l = {}) {
  return We().t(s, l);
}
function L(s = "") {
  return We().adminUrl(s);
}
function te(s) {
  return { draft: t("Draft"), scheduled: t("Scheduled"), published: t("Published") }[s];
}
function K(s, l) {
  if (!s) return "—";
  const n = new Date(s);
  return Number.isNaN(n.getTime()) ? "—" : n.toLocaleString(document.documentElement.lang || void 0, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
}
function Jt(s, l = /* @__PURE__ */ new Date()) {
  const n = s ? new Date(s) : null;
  if (n && !Number.isNaN(n.getTime()) && n > l) return n;
  const r = new Date(l);
  return r.setDate(r.getDate() + 1), r.setMinutes(0, 0, 0), r;
}
function Ss(s) {
  const l = (n) => String(n).padStart(2, "0");
  return `${s.getFullYear()}-${l(s.getMonth() + 1)}-${l(s.getDate())}T${l(s.getHours())}:${l(s.getMinutes())}`;
}
let Oe = {};
function Qt(s) {
  Oe = s ?? {};
}
function H(s, l) {
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
function Zt(s, l, n, r) {
  return r && s !== "" && s === ls(l) ? ls(n) : s;
}
function ks(s, l, n) {
  return !s || l.trim() === "" || l.trim() === s ? null : n ? "redirects" : "breaks";
}
const Cs = globalThis.Sunrice;
if (!Cs) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const _ = Cs.modules.react;
const Xt = (s) => s?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
function ea(s, l, n = []) {
  if (l == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: Xt(s),
    size: 24,
    node: l,
    ...n.length > 0 ? { aliases: n } : {}
  };
}
const sa = (s) => {
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
const ta = (s) => {
  const l = sa(s);
  return l.charAt(0).toUpperCase() + l.slice(1);
};
const Re = (...s) => s.filter((l, n, r) => !!l && l.trim() !== "" && r.indexOf(l) === n).join(" ").trim();
const de = {
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
function aa(s, l = {}) {
  const n = l.attributeNames ?? {}, r = (h) => n[h] ?? h, i = s.size ?? s.width ?? de.width, c = s.size ?? s.height ?? de.height, u = s.aliases?.filter((h) => typeof h == "string" && h.trim() !== "").map((h) => `lucide-${h}`) ?? [], x = [...s.name ? [`lucide-${s.name}`] : [], ...u], d = l.className?.split(" ").filter(Boolean) ?? [], o = l.includeDefaultClasses === !1 ? Re(...d) : Re("lucide", ...x, ...d), f = l.absoluteStrokeWidth ? Number(l.strokeWidth ?? de["stroke-width"]) * Number(s.size ?? s.width ?? de.width) / Number(l.size ?? l.width ?? de.width) : l.strokeWidth ?? de["stroke-width"];
  return [
    "svg",
    {
      ...Object.entries(de).reduce((h, [g, k]) => (h[r(g)] = k, h), {}),
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
      [r("stroke-width")]: f,
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
      const [g, k, b] = h, y = l.nonScalingStroke ? { [r("vector-effect")]: "non-scaling-stroke", ...k } : k;
      return b ? [g, y, b] : [g, y];
    })
  ];
}
function la(s, l = {}) {
  return aa(s, {
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
const na = (s) => {
  for (const l in s)
    if (l.startsWith("aria-") || l === "role" || l === "title")
      return !0;
  return !1;
}, ca = _.createContext({}), ra = () => _.useContext(ca), ia = _.forwardRef(
  ({
    color: s,
    size: l,
    width: n,
    height: r,
    strokeWidth: i,
    absoluteStrokeWidth: c,
    nonScalingStroke: u,
    className: x = "",
    children: d,
    iconNode: o = [],
    icon: f = {
      node: o,
      aliases: [],
      size: 24
    },
    ...m
  }, h) => {
    const {
      size: g = 24,
      strokeWidth: k = 2,
      absoluteStrokeWidth: b = !1,
      nonScalingStroke: y = !1,
      color: T = "currentColor",
      className: S = ""
    } = ra() ?? {}, w = !!d || na(m), [p, B, E = []] = la(f, {
      color: s ?? T,
      width: n ?? l ?? g,
      height: r ?? l ?? g,
      strokeWidth: i ?? k,
      absoluteStrokeWidth: c ?? b,
      nonScalingStroke: u ?? y,
      className: Re(S, x),
      hasA11yProp: w,
      attributes: m
    });
    return _.createElement(
      p,
      {
        ref: h,
        ...B
      },
      [
        ...E.map(([j, M]) => _.createElement(j, M)),
        ...Array.isArray(d) ? d : [d]
      ]
    );
  }
);
function I(s, l = [], n = []) {
  const r = typeof s == "string" ? ea(s, l, n) : s, i = _.forwardRef(
    ({ className: c, ...u }, x) => _.createElement(ia, {
      ref: x,
      icon: r,
      className: c,
      ...u
    })
  );
  return r.name && (i.displayName = ta(r.name)), i;
}
const ws = {
  name: "arrow-down",
  size: 24,
  node: [
    ["path", { d: "M12 5v14", key: "s699le" }],
    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
  ]
};
ws.node;
const $s = I(ws);
const Ds = {
  name: "arrow-up-down",
  size: 24,
  node: [
    ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
    ["path", { d: "M17 20V4", key: "1ejh1v" }],
    ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
    ["path", { d: "M7 4v16", key: "1glfcx" }]
  ]
};
Ds.node;
const _s = I(Ds);
const Ts = {
  name: "arrow-up",
  size: 24,
  node: [
    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
    ["path", { d: "M12 19V5", key: "x0mq9r" }]
  ]
};
Ts.node;
const Bs = I(Ts);
const Ms = {
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
Ms.node;
const Ve = I(Ms);
const zs = {
  name: "check",
  size: 24,
  node: [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]
};
zs.node;
const ke = I(zs);
const Ls = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
Ls.node;
const Ge = I(Ls);
const Is = {
  name: "chevron-left",
  size: 24,
  node: [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]]
};
Is.node;
const Ye = I(Is);
const As = {
  name: "chevron-right",
  size: 24,
  node: [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]
};
As.node;
const be = I(As);
const Es = {
  name: "chevrons-down-up",
  size: 24,
  node: [
    ["path", { d: "m7 20 5-5 5 5", key: "13a0gw" }],
    ["path", { d: "m7 4 5 5 5-5", key: "1kwcof" }]
  ]
};
Es.node;
const oa = I(Es);
const Fs = {
  name: "chevrons-up-down",
  size: 24,
  node: [
    ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
    ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
  ]
};
Fs.node;
const da = I(Fs);
const Hs = {
  name: "columns-3",
  size: 24,
  node: [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M9 3v18", key: "fh3hqa" }],
    ["path", { d: "M15 3v18", key: "14nvp0" }]
  ],
  aliases: ["panels-left-right"]
};
Hs.node;
const ma = I(Hs);
const Ps = {
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
Ps.node;
const ua = I(Ps);
const Os = {
  name: "copy",
  size: 24,
  node: [
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
  ]
};
Os.node;
const ha = I(Os);
const Rs = {
  name: "download",
  size: 24,
  node: [
    ["path", { d: "M12 15V3", key: "m9g1x1" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
  ]
};
Rs.node;
const Vs = I(Rs);
const Us = {
  name: "ellipsis-vertical",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
    ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
    ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }]
  ],
  aliases: ["more-vertical"]
};
Us.node;
const xa = I(Us);
const qs = {
  name: "ellipsis",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
    ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
    ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
  ],
  aliases: ["more-horizontal"]
};
qs.node;
const Ks = I(qs);
const Ws = {
  name: "external-link",
  size: 24,
  node: [
    ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
    ["path", { d: "M10 14 21 3", key: "gplh6r" }],
    ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
  ]
};
Ws.node;
const pe = I(Ws);
const Gs = {
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
Gs.node;
const pa = I(Gs);
const Ys = {
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
Ys.node;
const ga = I(Ys);
const Js = {
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
Js.node;
const fa = I(Js);
const Qs = {
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
Qs.node;
const ns = I(Qs);
const Zs = {
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
Zs.node;
const ja = I(Zs);
const Xs = {
  name: "link-2",
  size: 24,
  node: [
    ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
    ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
    ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
  ]
};
Xs.node;
const ba = I(Xs);
const et = {
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
et.node;
const va = I(et);
const st = {
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
st.node;
const ya = I(st);
const tt = {
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
tt.node;
const Na = I(tt);
const at = {
  name: "loader-circle",
  size: 24,
  node: [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  aliases: ["loader-2"]
};
at.node;
const ue = I(at);
const lt = {
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
lt.node;
const nt = I(lt);
const ct = {
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
ct.node;
const Sa = I(ct);
const rt = {
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
rt.node;
const it = I(rt);
const ot = {
  name: "plus",
  size: 24,
  node: [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ]
};
ot.node;
const J = I(ot);
const dt = {
  name: "rotate-ccw",
  size: 24,
  node: [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ]
};
dt.node;
const fe = I(dt);
const mt = {
  name: "search",
  size: 24,
  node: [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ]
};
mt.node;
const ve = I(mt);
const ut = {
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
ut.node;
const ka = I(ut);
const ht = {
  name: "settings-2",
  size: 24,
  node: [
    ["path", { d: "M14 17H5", key: "gfn3mx" }],
    ["path", { d: "M19 7h-9", key: "6i9tg" }],
    ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
    ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
  ]
};
ht.node;
const Je = I(ht);
const xt = {
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
xt.node;
const Ue = I(xt);
const pt = {
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
pt.node;
const Ca = I(pt);
const gt = {
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
gt.node;
const W = I(gt);
const ft = {
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
ft.node;
const wa = I(ft);
const jt = {
  name: "undo-2",
  size: 24,
  node: [
    ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
    ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
  ]
};
jt.node;
const qe = I(jt);
const bt = {
  name: "x",
  size: 24,
  node: [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]
};
bt.node;
const $e = I(bt), vt = globalThis.Sunrice;
if (!vt) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const a = vt.modules["@sunrice/admin-sdk/ui"];
function yt({ id: s, children: l }) {
  return /* @__PURE__ */ e.jsxs("p", { id: s, className: "cms:flex cms:items-start cms:gap-2 cms:rounded-md cms:border cms:border-amber-500/40 cms:bg-amber-500/10 cms:px-3 cms:py-2 cms:text-sm cms:text-amber-900 cms:dark:text-amber-200", children: [
    /* @__PURE__ */ e.jsx(wa, { className: "cms:mt-0.5 cms:size-4 cms:shrink-0", "aria-hidden": !0 }),
    /* @__PURE__ */ e.jsx("span", { children: l })
  ] });
}
function re() {
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
function me(s) {
  return s && typeof s == "object" && !Array.isArray(s) ? s : {};
}
function $a(s, l) {
  if (typeof s != "string" || s === "") return "";
  const n = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(s);
  return n ? l ? `${n[1]}T${n[2] ?? "00:00"}` : n[1] ?? "" : "";
}
function cs(s) {
  return s === "" ? null : s;
}
function Da(s) {
  const l = typeof s == "number" ? s : typeof s == "string" && s.trim() !== "" ? Number(s) : NaN;
  return !Number.isFinite(l) || Math.abs(l) < 1e4 ? null : new Intl.NumberFormat("en", { maximumFractionDigits: 20 }).format(l);
}
function _a(s, l, n, r) {
  return l || s.some((i) => ["none", ""].includes(i.label.trim().toLowerCase()) || i.value.trim().toLowerCase() === "none") ? !1 : !n || !r;
}
function Ce(s) {
  return s.some((l) => l.shared === !0 || Ce(l.fields ?? []) || (l.blocks ?? []).some((n) => Ce(n.fields)));
}
function Ta() {
  return { _hidden: !1 };
}
function Qe(s, l, n = 60) {
  for (const r of s) {
    const i = l[r.handle];
    let c = null;
    ["text", "textarea", "email", "url"].includes(r.type) && typeof i == "string" ? c = i : r.type === "rich_text" && typeof i == "string" ? c = i.replace(/<[^>]*>/g, " ") : r.type === "group" && Array.isArray(r.fields) && (c = Qe(r.fields, me(i), n));
    const u = (c ?? "").replace(/\s+/g, " ").trim();
    if (u !== "") return u.length > n ? `${u.slice(0, n - 1).trimEnd()}…` : u;
  }
  return null;
}
function Ba(s) {
  return { type: s, hidden: !1, values: {} };
}
function Ma(s) {
  const l = s.replace(/[\u0000- \u007f]+/g, ""), n = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(l);
  return n ? ["http", "https", "mailto", "tel"].includes(n[1].toLowerCase()) : !l.includes("\\");
}
function Nt({ ids: s, search: l, collections: n }) {
  const r = new URLSearchParams();
  for (const i of s ?? []) r.append("ids[]", String(i));
  l && r.set("search", l);
  for (const i of n) r.append("collections[]", i);
  return r.toString();
}
let za = 0;
function La(s, l) {
  return s.length === l ? s.slice() : s.length < l ? [...s, ...Array.from({ length: l - s.length }, () => `k${++za}`)] : s.slice(0, l);
}
function Ia({ taxonomy: s, q: l, ids: n }) {
  const r = new URLSearchParams({ taxonomy: s });
  l && r.set("q", l);
  for (const i of n ?? []) r.append("ids[]", String(i));
  return r.toString();
}
async function rs(s) {
  const l = await fetch(`${L("cms/entries/picker")}?${Nt(s)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!l.ok) throw new Error(String(l.status));
  const n = await l.json();
  return { items: n.items, unavailable: n.unavailable ?? [] };
}
function Aa(s) {
  return s.length < 2 ? s[0] ?? "" : t(":items and :last", { items: s.slice(0, -1).join(", "), last: s[s.length - 1] });
}
function De({ id: s, value: l, multiple: n, max: r, collections: i, invalid: c, onChange: u, emptyHint: x }) {
  const d = l === null ? [] : Array.isArray(l) ? l : [l], [o, f] = _.useState({}), [m, h] = _.useState(""), [g, k] = _.useState(!1), [b, y] = _.useState(null), [T, S] = _.useState([]), [w, p] = _.useState(!1), B = n && r !== null && d.length >= r, E = d.filter(($) => !o[$]).join(",");
  _.useEffect(() => {
    E !== "" && rs({ ids: E.split(",").map(Number), collections: i }).then(({ items: $ }) => f((F) => ({ ...F, ...Object.fromEntries($.map((C) => [C.id, C])) }))).catch(() => p(!0));
  }, [E]), _.useEffect(() => {
    if (!g) {
      y(null);
      return;
    }
    const $ = window.setTimeout(() => {
      rs({ search: m.trim(), collections: i }).then((F) => {
        y(F.items), S(F.unavailable), p(!1);
      }).catch(() => p(!0));
    }, m.trim() === "" ? 0 : 250);
    return () => window.clearTimeout($);
  }, [m, g]);
  const j = ($) => {
    f((F) => ({ ...F, [$.id]: $ })), u(n ? [...d, $.id] : $.id), h("");
  }, M = ($) => u(n ? $ : $[0] ?? null);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    d.length > 0 && /* @__PURE__ */ e.jsx(a.SortableList, { items: d, getId: ($) => $, getLabel: ($) => o[$]?.title ?? `Entry #${$}`, onReorder: ($) => M($), disabled: !n, className: "cms:gap-1", children: ($, { handle: F }) => {
      const C = o[$];
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-md cms:border cms:bg-card cms:px-2 cms:py-1 cms:text-sm", children: [
        n && /* @__PURE__ */ e.jsx(a.SortableHandle, { ...F, label: t("Move :title", { title: C?.title ?? $ }) }),
        /* @__PURE__ */ e.jsx("span", { className: `cms:min-w-0 cms:flex-1 cms:truncate ${n ? "" : "cms:pl-1"}`, children: C ? C.title : t("Entry #:id", { id: $ }) }),
        C && /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: C.collection }),
        C && /* @__PURE__ */ e.jsx(a.Badge, { variant: C.status === "published" ? "success" : "secondary", children: te(C.status) }),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            type: "button",
            variant: "ghost",
            size: "icon",
            className: "cms:size-7",
            "aria-label": t("Remove :title", { title: C?.title ?? $ }),
            onClick: () => M(d.filter((D) => D !== $)),
            children: /* @__PURE__ */ e.jsx($e, {})
          }
        )
      ] });
    } }),
    !B && (n || d.length === 0) && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-md", children: [
      /* @__PURE__ */ e.jsx(ve, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: s,
          className: "cms:pl-9",
          placeholder: t("Search entries by title"),
          "aria-invalid": c,
          value: m,
          autoComplete: "off",
          "aria-expanded": b !== null,
          onFocus: () => k(!0),
          onBlur: () => k(!1),
          onKeyDown: ($) => {
            $.key === "Escape" && g && ($.preventDefault(), k(!1));
          },
          onChange: ($) => {
            h($.target.value), k(!0);
          }
        }
      ),
      b !== null && /* @__PURE__ */ e.jsxs("ul", { role: "listbox", "aria-label": t("Matching entries"), className: "cms:absolute cms:z-10 cms:mt-1 cms:max-h-64 cms:w-full cms:overflow-auto cms:rounded-md cms:border cms:bg-card cms:p-1 cms:shadow-md", children: [
        b.filter(($) => !d.includes($.id)).length === 0 && /* @__PURE__ */ e.jsxs("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: [
          m.trim() === "" ? t("No entries yet.") : t("No entries match."),
          x && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            " ",
            x
          ] })
        ] }),
        T.length > 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: t("Your role can't see entries of :collections: ask an editor to link them.", { collections: Aa(T) }) }),
        b.filter(($) => !d.includes($.id)).map(($) => /* @__PURE__ */ e.jsx("li", { role: "option", "aria-selected": !1, children: /* @__PURE__ */ e.jsxs(
          "button",
          {
            type: "button",
            className: "cms:flex cms:w-full cms:items-center cms:gap-2 cms:rounded cms:px-2 cms:py-1.5 cms:text-left cms:text-sm cms:hover:bg-accent",
            onMouseDown: (F) => F.preventDefault(),
            onClick: () => j($),
            children: [
              /* @__PURE__ */ e.jsx("span", { className: "cms:flex-1 cms:truncate", children: $.title }),
              /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: $.collection })
            ]
          }
        ) }, $.id))
      ] })
    ] }),
    w && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t("Entries could not be loaded. Try again.") })
  ] });
}
const St = _.createContext({}), Be = "__none";
async function is(s) {
  const l = await fetch(`${L("cms/terms/picker")}?${Ia(s)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!l.ok) throw new Error(String(l.status));
  return await l.json();
}
function Ea({ id: s, taxonomy: l, multiple: n, max: r, required: i, invalid: c, value: u, onChange: x }) {
  const d = _.useContext(St), o = u === null ? [] : Array.isArray(u) ? u : [u], [f, m] = _.useState(null), [h, g] = _.useState(!1), [k, b] = _.useState(""), [y, T] = _.useState({}), [S, w] = _.useState(!1);
  _.useEffect(() => {
    if (!l) return;
    const C = k.trim(), D = window.setTimeout(() => {
      is({ taxonomy: l, q: C }).then((O) => {
        m(O.items), O.more && g(!0), w(!1);
      }).catch(() => w(!0));
    }, C === "" ? 0 : 250);
    return () => window.clearTimeout(D);
  }, [l, k]);
  const p = (C) => d[String(C)] ?? y[C] ?? f?.find((D) => D.id === C)?.label, B = f === null ? "" : o.filter((C) => p(C) === void 0).join(",");
  if (_.useEffect(() => {
    !l || B === "" || is({ taxonomy: l, ids: B.split(",").map(Number) }).then((C) => T((D) => ({ ...D, ...Object.fromEntries(C.items.map((O) => [O.id, O.label])) }))).catch(() => w(!0));
  }, [l, B]), !l) return /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("Choose a taxonomy for this field in its blueprint.") });
  if (f === null) return S ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t("Terms could not be loaded. Try again.") }) : /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-9 cms:w-full cms:max-w-sm" });
  const E = (C) => `${"— ".repeat(C.depth)}${C.label}`, j = n && r !== null && o.length >= r, M = (C) => x(n ? C : C[0] ?? null), $ = h && o.length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-1.5", children: o.map((C) => /* @__PURE__ */ e.jsxs(a.Badge, { variant: "secondary", className: "cms:gap-1 cms:pr-1", children: [
    p(C) ?? t("Term #:id", { id: C }),
    !(i && !n) && /* @__PURE__ */ e.jsx(
      "button",
      {
        type: "button",
        className: "cms:rounded-sm cms:p-0.5 cms:hover:bg-muted",
        "aria-label": t("Remove :title", { title: p(C) ?? C }),
        onClick: () => M(o.filter((D) => D !== C)),
        children: /* @__PURE__ */ e.jsx($e, { className: "cms:size-3" })
      }
    )
  ] }, C)) }), F = h && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-sm", children: [
    /* @__PURE__ */ e.jsx(ve, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
    /* @__PURE__ */ e.jsx(
      a.Input,
      {
        id: s,
        className: "cms:pl-9",
        placeholder: t("Search terms"),
        autoComplete: "off",
        "aria-invalid": c,
        value: k,
        onChange: (C) => b(C.target.value)
      }
    )
  ] });
  if (!n && !h) {
    const C = o[0], D = C === void 0 || f.some((O) => O.id === C);
    return /* @__PURE__ */ e.jsxs(a.Select, { value: C === void 0 ? Be : String(C), onValueChange: (O) => x(O === Be ? null : Number(O)), children: [
      /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: s, className: "cms:w-full cms:max-w-sm", "aria-invalid": c, children: /* @__PURE__ */ e.jsx(a.SelectValue, { children: C === void 0 ? t("None") : p(C) ?? t("Term #:id", { id: C }) }) }),
      /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
        !i && /* @__PURE__ */ e.jsx(a.SelectItem, { value: Be, children: t("None") }),
        !D && C !== void 0 && /* @__PURE__ */ e.jsx(a.SelectItem, { value: String(C), children: p(C) ?? t("Term #:id", { id: C }) }),
        f.map((O) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: String(O.id), children: E(O) }, O.id))
      ] })
    ] });
  }
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    $,
    F,
    f.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: k.trim() ? t("No terms match.") : t("Nothing to choose from yet.") }) : n ? /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:max-h-72 cms:flex-col cms:gap-2 cms:overflow-auto", children: f.map((C) => {
      const D = o.includes(C.id);
      return /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx(
          a.Checkbox,
          {
            checked: D,
            disabled: !D && j,
            onCheckedChange: (O) => M(O ? [...o, C.id] : o.filter((X) => X !== C.id))
          }
        ),
        E(C)
      ] }, C.id);
    }) }) : /* @__PURE__ */ e.jsx("div", { role: "listbox", "aria-label": t("Terms"), className: "cms:flex cms:max-h-72 cms:flex-col cms:overflow-auto", children: f.map((C) => /* @__PURE__ */ e.jsx(
      a.Button,
      {
        type: "button",
        variant: o[0] === C.id ? "secondary" : "ghost",
        size: "sm",
        className: "cms:justify-start",
        role: "option",
        "aria-selected": o[0] === C.id,
        onClick: () => x(C.id),
        children: E(C)
      },
      C.id
    )) })
  ] });
}
const Fa = (s, l = {}) => s.replace(/:([A-Za-z_]+)/g, (n, r) => l[r] ?? n), Ha = 5;
let Pa = 0;
const kt = () => `f${++Pa}`;
function Ct(s) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function wt(s) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^[0-9_]+/, "").replace(/_{2,}/g, "_").slice(0, 64);
}
function $t(s, l) {
  const n = new Set(l.map((c) => c.handle)), r = Ct(s) || "field";
  let i = r;
  for (let c = 2; n.has(i); c++)
    i = `${r}_${c}`;
  return i;
}
function Dt(s) {
  return (s ?? []).map(({ fields: l, ...n }) => ({
    ...n,
    key: kt(),
    fields: Dt(l),
    handleTouched: !0,
    savedHandle: n.handle
  }));
}
function _t(s, l) {
  return s.map(({ key: n, handleTouched: r, savedHandle: i, fields: c, ...u }) => ({
    ...u,
    validation: (u.validation ?? []).map((x) => x.trim()).filter((x) => x !== ""),
    ...l(u.type) ? { fields: _t(c, l) } : {}
  }));
}
function Oa(s, l, n) {
  return { key: kt(), type: s, label: l, handle: $t(l, n), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function os(s) {
  return s.type !== "fieldset" && s.savedHandle !== void 0 && s.savedHandle !== "" && s.handle !== s.savedHandle ? s.savedHandle : null;
}
function Tt(s) {
  return s.map((l) => ({ ...l, savedHandle: l.handle, fields: Tt(l.fields) }));
}
function ds(s, l, n) {
  if (s.handleTouched) return { ...s, label: l };
  const r = n.filter((i) => i.key !== s.key);
  return { ...s, label: l, handle: $t(l || s.type, r) };
}
function xe(s, l) {
  const n = `${l}.`, r = {};
  for (const [i, c] of Object.entries(s))
    i.startsWith(n) && (r[i.slice(n.length)] = c);
  return r;
}
function Z(s, l) {
  const n = s[l];
  return { ...xe(s, l), ...n !== void 0 ? { "": n } : {} };
}
function _e(s, l) {
  return Object.keys(s).filter((n) => n === l || n.startsWith(`${l}.`));
}
function ye(s, l) {
  return Object.keys(s).some((n) => n === l || n.startsWith(`${l}.`));
}
function Bt(s, l, n, r = Fa) {
  return s.type === "fieldset" ? null : n?.includes(s.handle) ? r('":handle" is used by the content itself; choose another handle.', { handle: s.handle }) : s.handle !== "" && l.some((i) => i.key !== s.key && i.type !== "fieldset" && i.handle === s.handle) ? r('There is already a field ":handle" here.', { handle: s.handle }) : null;
}
const Me = [
  { value: "equals", label: "is", needsValue: !0 },
  { value: "not_equals", label: "is not", needsValue: !0 },
  { value: "filled", label: "is filled in", needsValue: !1 },
  { value: "empty", label: "is empty", needsValue: !1 }
];
function ms(s) {
  return s === !0 ? "true" : s === !1 ? "false" : typeof s == "string" || typeof s == "number" ? String(s) : "";
}
function Ze(s, l) {
  const n = s.condition;
  if (!n) return !0;
  const r = l[n.field], i = r != null && r !== "" && r !== !1 && !(Array.isArray(r) && r.length === 0), c = (Array.isArray(r) ? r : [r]).map(ms).includes(ms(n.value));
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
const ze = "__none";
function A({ message: s }) {
  return s ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: s }) : null;
}
function Le(s) {
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
const Ra = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function we(s) {
  if (s.label) return s.label;
  const l = s.handle.replace(/_/g, " ");
  return l.charAt(0).toUpperCase() + l.slice(1);
}
function ce({ field: s, value: l, onChange: n, errors: r, id: i, content: c = !1 }) {
  const u = we(s), x = Ra.includes(s.type) || ["select", "terms"].includes(s.type) && s.config?.multiple === !0;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", ...x ? { role: "group", "aria-labelledby": `${i}-label` } : {}, children: [
    s.type === "toggle" ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(a.Switch, { id: i, checked: l === !0, onCheckedChange: (d) => n(d) }),
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: i, children: u })
    ] }) : /* @__PURE__ */ e.jsxs(a.Label, { id: `${i}-label`, htmlFor: x ? void 0 : i, children: [
      u,
      s.required && /* @__PURE__ */ e.jsx("span", { className: "cms:text-destructive", children: " *" })
    ] }),
    /* @__PURE__ */ e.jsx(Ua, { field: s, value: l, onChange: n, errors: r, id: i, content: c }),
    ["text", "textarea"].includes(s.type) && se(s, "max") !== void 0 && /* @__PURE__ */ e.jsx(Va, { length: typeof l == "string" ? [...l].length : 0, max: se(s, "max") ?? 0 }),
    s.instructions && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s.instructions }),
    /* @__PURE__ */ e.jsx(A, { message: r[""] })
  ] });
}
function Va({ length: s, max: l }) {
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
function Ua({ field: s, value: l, onChange: n, errors: r, id: i, content: c }) {
  const u = r[""] !== void 0;
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
          "aria-invalid": u,
          value: typeof l == "string" ? l : "",
          rows: se(s, "rows") ?? 4,
          onChange: (x) => n(x.target.value)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ e.jsx(a.RichTextEditor, { id: i, labelledBy: `${i}-label`, invalid: u, value: typeof l == "string" ? l : "", onChange: n });
    case "number": {
      const x = Da(l);
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: i,
            type: "number",
            className: "cms:max-w-48",
            "aria-invalid": u,
            "aria-describedby": x ? `${i}-grouped` : void 0,
            value: typeof l == "number" ? String(l) : typeof l == "string" ? l : "",
            min: se(s, "min"),
            max: se(s, "max"),
            step: se(s, "step") ?? "any",
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
          invalid: u,
          required: s.required === !0,
          value: cs($a(l, x)),
          onChange: (d) => n(cs(d ?? ""))
        }
      );
    }
    case "select":
      return s.config?.multiple === !0 ? /* @__PURE__ */ e.jsx(
        Wa,
        {
          options: Le(s),
          value: Array.isArray(l) ? l.map(String) : [],
          onChange: n,
          empty: typeof s.config?.empty == "string" ? s.config.empty : void 0,
          inTickOrder: s.config?.in_tick_order === !0
        }
      ) : /* @__PURE__ */ e.jsx(
        Ka,
        {
          options: Le(s),
          value: typeof l == "string" ? l : null,
          onChange: n,
          id: i,
          empty: _a(Le(s), s.required === !0, typeof s.config?.default == "string" && s.config.default !== "", typeof l == "string" && l !== "")
        }
      );
    case "terms": {
      const x = s.config?.multiple === !0, d = Array.isArray(l) ? l.filter((o) => typeof o == "number") : typeof l == "number" ? l : null;
      return /* @__PURE__ */ e.jsx(
        Ea,
        {
          id: i,
          taxonomy: typeof s.taxonomy == "string" ? s.taxonomy : null,
          multiple: x,
          max: se(s, "max") ?? null,
          required: s.required === !0,
          invalid: u,
          value: x ? Array.isArray(d) ? d : [] : typeof d == "number" ? d : null,
          onChange: n
        }
      );
    }
    case "entries":
      return /* @__PURE__ */ e.jsx(
        De,
        {
          id: i,
          invalid: u,
          multiple: s.config?.multiple === !0,
          max: se(s, "max") ?? null,
          collections: s.collections ?? [],
          onChange: n,
          value: typeof l == "number" || Array.isArray(l) && l.every((x) => typeof x == "number") ? l : null
        }
      );
    case "link":
      return /* @__PURE__ */ e.jsx(Ga, { label: we(s), value: me(l), onChange: n, errors: r, id: i, collections: s.collections ?? [] });
    case "media":
      return /* @__PURE__ */ e.jsx(
        a.MediaPickerInput,
        {
          id: i,
          invalid: u,
          disabled: !1,
          multiple: s.config?.multiple === !0,
          max: se(s, "max") ?? null,
          types: Array.isArray(s.config?.types) ? s.config.types : [],
          value: typeof l == "number" || Array.isArray(l) && l.every((x) => typeof x == "number") ? l : null,
          onChange: n
        }
      );
    case "group":
      return /* @__PURE__ */ e.jsx(he, { fields: s.fields ?? [], value: me(l), onChange: n, errors: r, id: i, content: c });
    case "repeater":
      return /* @__PURE__ */ e.jsx(Ya, { field: s, value: Array.isArray(l) ? l : [], onChange: n, errors: r, id: i, content: c });
    case "flexible":
      return /* @__PURE__ */ e.jsx(Ja, { field: s, value: Array.isArray(l) ? l : [], onChange: n, errors: r, id: i });
    default:
      return /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: i,
          "aria-invalid": u,
          value: typeof l == "string" ? l : "",
          placeholder: qa(s, "placeholder"),
          onChange: (x) => n(x.target.value)
        }
      );
  }
}
function se(s, l) {
  const n = s.config?.[l];
  return typeof n == "number" ? n : void 0;
}
function qa(s, l) {
  const n = s.config?.[l];
  return typeof n == "string" ? n : void 0;
}
function he({ fields: s, value: l, onChange: n, errors: r, id: i, content: c, bare: u = !1 }) {
  return /* @__PURE__ */ e.jsx("div", { className: u ? "cms:flex cms:flex-col cms:gap-6" : "cms:flex cms:flex-col cms:gap-4 cms:rounded-lg cms:border cms:p-4", children: s.filter((x) => Ze(x, l)).map((x) => x.shared ? (
    // Greyed out; the form says once, at the top, where to edit shared fields.
    /* @__PURE__ */ e.jsx("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1 cms:opacity-60", title: t("Shared by all languages: edit it in the main language."), children: /* @__PURE__ */ e.jsx(ce, { id: `${i}-${x.handle}`, field: x, value: l[x.handle], content: c, errors: {}, onChange: () => {
    } }) }, x.handle)
  ) : /* @__PURE__ */ e.jsx(
    ce,
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
function Ka({ options: s, value: l, onChange: n, id: r, empty: i }) {
  return /* @__PURE__ */ e.jsxs(a.Select, { value: l ?? ze, onValueChange: (c) => n(c === ze ? null : c), children: [
    /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: r, className: "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
    /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
      i && /* @__PURE__ */ e.jsx(a.SelectItem, { value: ze, children: t("None") }),
      s.map((c) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: c.value, children: c.label }, c.value))
    ] })
  ] });
}
function Wa({ options: s, value: l, onChange: n, empty: r, inTickOrder: i = !1 }) {
  return s.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: r ?? t("Nothing to choose from yet.") }) : /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2", children: s.map((c) => /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
    /* @__PURE__ */ e.jsx(
      a.Checkbox,
      {
        checked: l.includes(c.value),
        onCheckedChange: (u) => n(u ? i ? [...l.filter((x) => x !== c.value), c.value] : s.map((x) => x.value).filter((x) => x === c.value || l.includes(x)) : l.filter((x) => x !== c.value))
      }
    ),
    c.label,
    i && l.includes(c.value) && /* @__PURE__ */ e.jsxs("span", { className: "cms:text-xs cms:text-muted-foreground", "aria-label": `number ${l.indexOf(c.value) + 1}`, children: [
      "#",
      l.indexOf(c.value) + 1
    ] })
  ] }, c.value)) });
}
function Ga({ label: s, value: l, onChange: n, errors: r, id: i, collections: c }) {
  const u = l.type === "entry" ? "entry" : "url", x = (d) => {
    const o = { ...l, type: u, ...d }, f = o.type === "entry" ? typeof o.entry_id != "number" : o.url === "" || o.url === void 0 || o.url === null;
    n(f ? o.label || o.new_tab ? o : null : o);
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("div", { role: "radiogroup", "aria-label": t(":field: link to", { field: s }), className: "cms:inline-flex cms:w-fit cms:rounded-md cms:border cms:p-0.5", children: ["url", "entry"].map((d) => /* @__PURE__ */ e.jsx(
      a.Button,
      {
        type: "button",
        size: "sm",
        role: "radio",
        "aria-checked": u === d,
        variant: u === d ? "secondary" : "ghost",
        onClick: () => x({ type: d, url: d === "url" ? l.url : void 0, entry_id: d === "entry" ? l.entry_id : void 0 }),
        children: t(d === "url" ? "Address" : "Entry")
      },
      d
    )) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-2 cms:md:grid-cols-[2fr_1fr_auto] cms:md:items-start", children: [
      u === "url" ? /* @__PURE__ */ e.jsx(
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
        De,
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
          placeholder: t(u === "entry" ? "Link text (the entry's title)" : "Link text"),
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
function us(s, l) {
  return !l && (s.fields ?? []).every((n) => n.type === "text");
}
function Mt(s) {
  const l = _.useRef([]);
  return l.current = La(l.current, s), {
    keys: l.current,
    remove: (n) => {
      l.current = l.current.filter((r, i) => i !== n);
    },
    move: (n, r) => {
      l.current = a.moveItem(l.current, n, r);
    }
  };
}
function zt() {
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
function Lt({ keys: s, folding: l }) {
  if (s.length < 2) return null;
  const n = l.anyOpen(s);
  return /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => l.setAll(s, n), children: [
    n ? /* @__PURE__ */ e.jsx(oa, {}) : /* @__PURE__ */ e.jsx(da, {}),
    " ",
    t(n ? "Collapse all" : "Expand all")
  ] });
}
function Ya({ field: s, value: l, onChange: n, errors: r, id: i, content: c = !1 }) {
  const u = s.fields ?? [], x = l.map(me), d = Mt(x.length), o = (b, y) => n(x.map((T, S) => S === b ? y : T)), f = (b) => {
    d.remove(b), n(x.filter((y, T) => T !== b));
  }, m = s.label ? s.label.toLowerCase().replace(/s$/, "") : t("row"), h = m.charAt(0).toUpperCase() + m.slice(1), g = x.map((b, y) => ({ row: b, index: y, key: d.keys[y] ?? String(y) })), k = zt();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(
      a.SortableList,
      {
        items: g,
        getId: (b) => b.key,
        getLabel: (b) => `${m} ${b.index + 1}`,
        onReorder: (b, y, T) => {
          d.move(y, T), n(b.map((S) => S.row));
        },
        children: ({ row: b, index: y, key: T }, { handle: S }) => us(s, c) ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(a.SortableHandle, { ...S, label: t("Move :item :number", { item: m, number: y + 1 }), className: "cms:mt-1" }),
          u.map((w) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                "aria-label": w.label || w.handle,
                placeholder: w.label || w.handle,
                value: typeof b[w.handle] == "string" ? b[w.handle] : "",
                onChange: (p) => o(y, { ...b, [w.handle]: p.target.value })
              }
            ),
            /* @__PURE__ */ e.jsx(A, { message: r[`${y}.${w.handle}`] })
          ] }, w.handle)),
          /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": t("Remove :item :number", { item: m, number: y + 1 }), onClick: () => f(y), children: /* @__PURE__ */ e.jsx(W, {}) })
        ] }) : (() => {
          const w = Z(r, String(y)), p = k.isCollapsed(T, Object.keys(w).length > 0);
          return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              It,
              {
                label: `${h} ${y + 1}`,
                summary: Qe(u, b),
                handle: S,
                onRemove: () => f(y),
                collapsed: p,
                onToggle: () => k.toggle(T),
                controls: `${i}-${y}-fields`,
                hidden: c ? b._hidden === !0 : void 0,
                onHidden: (B) => o(y, { ...b, _hidden: B })
              }
            ),
            /* @__PURE__ */ e.jsx("div", { id: `${i}-${y}-fields`, hidden: p, children: !p && /* @__PURE__ */ e.jsx(he, { fields: u, value: b, onChange: (B) => o(y, B), errors: w, id: `${i}-${y}`, content: c }) })
          ] });
        })()
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => n([...x, c ? Ta() : {}]), children: [
        /* @__PURE__ */ e.jsx(J, {}),
        " ",
        t("Add :item", { item: m })
      ] }),
      !us(s, c) && /* @__PURE__ */ e.jsx(Lt, { keys: g.map((b) => b.key), folding: k })
    ] })
  ] });
}
function Ja({ field: s, value: l, onChange: n, errors: r, id: i }) {
  const c = s.blocks ?? [], u = l.map(me), x = Mt(u.length), d = (h, g) => n(u.map((k, b) => b === h ? g : k)), o = (h) => {
    x.remove(h), n(u.filter((g, k) => k !== h));
  }, f = u.map((h, g) => ({ block: h, index: g, key: x.keys[g] ?? String(g) })), m = zt();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    /* @__PURE__ */ e.jsx(
      a.SortableList,
      {
        items: f,
        getId: (h) => h.key,
        className: "cms:gap-3",
        getLabel: (h) => t(":type block", { type: c.find((g) => g.type === h.block.type)?.label ?? String(h.block.type) }),
        onReorder: (h, g, k) => {
          x.move(g, k), n(h.map((b) => b.block));
        },
        children: ({ block: h, index: g, key: k }, { handle: b }) => {
          const y = c.find((w) => w.type === h.type), T = Z(r, `${g}.values`), S = m.isCollapsed(k, Object.keys(T).length > 0 || r[`${g}.type`] !== void 0);
          return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              It,
              {
                label: y?.label ?? String(h.type),
                summary: y ? Qe(y.fields, me(h.values)) : null,
                badge: !0,
                handle: b,
                onRemove: () => o(g),
                collapsed: S,
                onToggle: () => m.toggle(k),
                controls: `${i}-${g}-fields`,
                hidden: h.hidden === !0,
                onHidden: (w) => d(g, { ...h, hidden: w })
              }
            ),
            /* @__PURE__ */ e.jsx("div", { id: `${i}-${g}-fields`, hidden: S, children: S ? null : y ? /* @__PURE__ */ e.jsx(
              he,
              {
                fields: y.fields,
                value: me(h.values),
                onChange: (w) => d(g, { ...h, values: w }),
                errors: T,
                id: `${i}-${g}`,
                content: !0
              }
            ) : /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: t("This kind of block no longer exists. Its values are kept.") }) }),
            /* @__PURE__ */ e.jsx(A, { message: r[`${g}.type`] })
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
        /* @__PURE__ */ e.jsx(a.DropdownMenuContent, { align: "start", children: c.map((h) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => n([...u, Ba(h.type)]), children: h.label }, h.type)) })
      ] }),
      /* @__PURE__ */ e.jsx(Lt, { keys: f.map((h) => h.key), folding: m })
    ] })
  ] });
}
function It({ label: s, summary: l, badge: n = !1, handle: r, onRemove: i, collapsed: c, onToggle: u, controls: x, hidden: d, onHidden: o }) {
  const f = c ? be : Ge, m = l ? `${s}: ${l}` : s;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(a.SortableHandle, { ...r, label: t("Move :title", { title: m }) }),
    /* @__PURE__ */ e.jsxs(
      "button",
      {
        type: "button",
        onClick: u,
        "aria-expanded": !c,
        "aria-controls": x,
        className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:rounded-md cms:text-left cms:outline-none cms:focus-visible:ring-2 cms:focus-visible:ring-ring",
        children: [
          /* @__PURE__ */ e.jsx(f, { className: "cms:size-4 cms:shrink-0 cms:text-muted-foreground", "aria-hidden": !0 }),
          n ? /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: s }) : /* @__PURE__ */ e.jsx("span", { className: "cms:shrink-0 cms:text-sm cms:font-medium", children: s }),
          l && /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:text-sm cms:text-muted-foreground", children: l }),
          /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: c ? t("(collapsed)") : "" })
        ]
      }
    ),
    d !== void 0 && /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:shrink-0 cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", title: t("Off: kept here, but left out of the page"), children: [
      /* @__PURE__ */ e.jsx(a.Switch, { checked: !d, onCheckedChange: (h) => o(!h), "aria-label": t(":title: visible on site", { title: m }) }),
      t("Visible on site")
    ] }),
    /* @__PURE__ */ e.jsx(
      a.Button,
      {
        type: "button",
        variant: "ghost",
        size: "icon",
        className: "cms:size-8 cms:shrink-0 cms:text-destructive",
        "aria-label": t("Remove :title", { title: m }),
        onClick: i,
        children: /* @__PURE__ */ e.jsx(W, {})
      }
    )
  ] });
}
function At({ fields: s, onChange: l, types: n, errors: r, depth: i = 1, idPrefix: c = "field", reserved: u, locales: x = [] }) {
  const [d, o] = _.useState(() => /* @__PURE__ */ new Set()), f = (g) => o((k) => {
    const b = new Set(k);
    return b.has(g) ? b.delete(g) : b.add(g), b;
  }), m = (g, k) => l(s.map((b, y) => y === g ? k : b)), h = (g) => {
    const k = Oa(g.type, g.label, s);
    l([...s, k]), o(/* @__PURE__ */ new Set([k.key]));
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:border-dashed cms:p-4 cms:text-sm cms:text-muted-foreground", children: t("No fields yet.") }),
    s.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:justify-end", children: d.size > 0 ? /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => o(/* @__PURE__ */ new Set()), children: t("Close all") }) : /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => o(new Set(s.map((g) => g.key))), children: t("Open all") }) }),
    /* @__PURE__ */ e.jsx(a.SortableList, { items: s, getId: (g) => g.key, getLabel: (g) => g.label || g.handle, onReorder: (g) => l(g), children: (g, { index: k, handle: b, isOverlay: y }) => {
      const T = n.find((B) => B.type === g.type), S = ye(r, String(k)) || Bt(g, s, u) !== null, w = !y && (d.has(g.key) || S), p = `${c}-${g.key}`;
      return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${S ? "cms:border-destructive" : ""}`, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:p-2", children: [
          /* @__PURE__ */ e.jsx(a.SortableHandle, { ...b, label: t("Move :title", { title: g.label || g.handle }) }),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-expanded": w,
              "aria-controls": p,
              "aria-label": w ? t("Close :title", { title: g.label || g.handle }) : t("Open :title", { title: g.label || g.handle }),
              onClick: () => f(g.key),
              children: w ? /* @__PURE__ */ e.jsx(Ge, {}) : /* @__PURE__ */ e.jsx(be, {})
            }
          ),
          /* @__PURE__ */ e.jsxs("button", { type: "button", className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:text-left", onClick: () => f(g.key), children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: g.label || g.handle }),
            /* @__PURE__ */ e.jsx("code", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", children: g.handle })
          ] }),
          g.required && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", children: t("Required") }),
          /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: T?.label ?? g.type }),
          T?.hasChildren && g.fields.length > 0 && !w && /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: t(":count inside", { count: g.fields.length }) }),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": t("Remove :title", { title: g.label || g.handle }),
              onClick: () => l(s.filter((B, E) => E !== k)),
              children: /* @__PURE__ */ e.jsx(W, {})
            }
          )
        ] }),
        w && /* @__PURE__ */ e.jsx(
          Qa,
          {
            id: p,
            field: g,
            type: T,
            siblings: s,
            onChange: (B) => m(k, B),
            types: n,
            errors: xe(r, String(k)),
            depth: i,
            reserved: u,
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
      /* @__PURE__ */ e.jsx(a.DropdownMenuContent, { align: "start", children: n.filter((g) => !g.hasChildren || i < Ha).map((g) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => h(g), children: g.label }, g.type)) })
    ] }) })
  ] });
}
const le = { default: "__default", yes: "yes", no: "no" };
function Qa({ id: s, field: l, type: n, siblings: r, onChange: i, types: c, errors: u, depth: x, reserved: d, locales: o }) {
  const f = l.config ?? {}, m = Bt(l, r, d, t);
  return l.type === "fieldset" ? /* @__PURE__ */ e.jsxs("div", { id: s, className: "cms:flex cms:flex-col cms:gap-4 cms:border-t cms:p-4", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-label`, children: t("Label") }),
        /* @__PURE__ */ e.jsx(a.Input, { id: `${s}-label`, value: l.label ?? "", onChange: (h) => i(ds(l, h.target.value, r)) }),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("Only shown here, in the builder.") })
      ] }),
      n?.settings.map((h) => /* @__PURE__ */ e.jsx(
        ce,
        {
          id: `${s}-config-${h.handle}`,
          field: h,
          value: f[h.handle],
          errors: Z(u, `config.${h.handle}`),
          onChange: (g) => i({ ...l, config: { ...f, [h.handle]: g } })
        },
        h.handle
      ))
    ] }),
    /* @__PURE__ */ e.jsx(A, { message: u.handle ?? u.type })
  ] }) : /* @__PURE__ */ e.jsxs("div", { id: s, className: "cms:flex cms:flex-col cms:gap-4 cms:border-t cms:p-4", children: [
    !n && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t(`The field type ":type" isn't registered. Its data is kept; register the type or remove the field.`, { type: l.type }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-label`, children: t("Label") }),
        /* @__PURE__ */ e.jsx(a.Input, { id: `${s}-label`, value: l.label ?? "", onChange: (h) => i(ds(l, h.target.value, r)) }),
        /* @__PURE__ */ e.jsx(A, { message: u.label })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-handle`, children: t("Handle") }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: `${s}-handle`,
            className: "cms:font-mono",
            value: l.handle,
            onChange: (h) => i({ ...l, handle: wt(h.target.value), handleTouched: !0 })
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("How templates read it. Renaming it hides values saved under the old one.") }),
        /* @__PURE__ */ e.jsx("div", { "aria-live": "polite", children: os(l) !== null && /* @__PURE__ */ e.jsx(yt, { children: t(`Content saved under ":old" won't show under the new handle, and templates that read ":old" get nothing. To keep it, put back ":old", save, and run php artisan sunrice:rename-field, which renames the field and moves its values.`, { old: os(l) ?? "" }) }) }),
        /* @__PURE__ */ e.jsx(A, { message: u.handle ?? m ?? void 0 })
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
      /* @__PURE__ */ e.jsx(A, { message: u.instructions })
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
            value: l.translatable === !0 ? le.yes : l.translatable === !1 ? le.no : le.default,
            onValueChange: (h) => i({ ...l, translatable: h === le.yes ? !0 : h === le.no ? !1 : null }),
            children: [
              /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: `${s}-translatable`, className: "cms:w-48", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
              /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: le.default, children: t("As the type decides") }),
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: le.yes, children: t("Yes, translated") }),
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: le.no, children: t("No, shared") })
              ] })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(el, { id: s, field: l, siblings: r, onChange: i, errors: xe(u, "condition") }),
    o.length > 0 && /* @__PURE__ */ e.jsx(Za, { id: s, field: l, locales: o, onChange: i, errors: xe(u, "translations") }),
    (n?.settings.length ?? 0) > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: n?.settings.map((h) => /* @__PURE__ */ e.jsx(
      ce,
      {
        id: `${s}-config-${h.handle}`,
        field: h,
        value: f[h.handle],
        errors: Z(u, `config.${h.handle}`),
        onChange: (g) => i({ ...l, config: { ...f, [h.handle]: g } })
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
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: sl(t("Optional checks, one per line, such as :email or :max (for developers: Laravel validation rules)."), { email: "email", max: "max:100" }) }),
      /* @__PURE__ */ e.jsx(A, { message: u.validation ?? Object.entries(u).find(([h]) => h.startsWith("validation."))?.[1] })
    ] }),
    n?.hasChildren && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { children: t("Fields inside") }),
      /* @__PURE__ */ e.jsx(
        At,
        {
          fields: l.fields,
          onChange: (h) => i({ ...l, fields: h }),
          types: c,
          errors: xe(u, "fields"),
          depth: x + 1,
          idPrefix: s,
          locales: o
        }
      ),
      /* @__PURE__ */ e.jsx(A, { message: u.fields })
    ] }),
    /* @__PURE__ */ e.jsx(A, { message: u.type })
  ] });
}
function Za({ id: s, field: l, locales: n, onChange: r, errors: i }) {
  const c = l.translations ?? {}, u = l.type === "select" && Array.isArray(l.config?.options) ? l.config.options.filter((o) => typeof o?.value == "string" && o.value !== "") : [], x = (o, f) => {
    const m = { ...c, [o]: { ...c[o], ...f } };
    r({ ...l, translations: m });
  }, d = Object.entries(i).find(([, o]) => o)?.[1];
  return /* @__PURE__ */ e.jsxs("details", { className: "cms:rounded-lg cms:border cms:p-3", open: Object.keys(c).length > 0 || d !== void 0, children: [
    /* @__PURE__ */ e.jsx("summary", { className: "cms:cursor-pointer cms:text-sm cms:font-medium", children: t("In other languages") }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:mt-2 cms:text-sm cms:text-muted-foreground", children: t("What visitors read in each language, as forms show it. Empty: as above.") }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:mt-3 cms:flex cms:flex-col cms:gap-4", children: n.map(({ code: o, name: f }) => /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-3 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(a.Label, { htmlFor: `${s}-label-${o}`, children: [
          "Label (",
          f,
          ")"
        ] }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: `${s}-label-${o}`,
            value: c[o]?.label ?? "",
            placeholder: l.label ?? "",
            onChange: (m) => x(o, { label: m.target.value })
          }
        )
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(a.Label, { htmlFor: `${s}-instructions-${o}`, children: [
          "Instructions (",
          f,
          ")"
        ] }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: `${s}-instructions-${o}`,
            value: c[o]?.instructions ?? "",
            placeholder: l.instructions ?? "",
            onChange: (m) => x(o, { instructions: m.target.value })
          }
        )
      ] }),
      u.length > 0 && /* @__PURE__ */ e.jsxs("fieldset", { className: "cms:flex cms:flex-col cms:gap-2 cms:md:col-span-2", children: [
        /* @__PURE__ */ e.jsxs("legend", { className: "cms:text-sm cms:font-medium", children: [
          "Options (",
          f,
          ")"
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-2 cms:sm:grid-cols-2", children: u.map((m) => {
          const h = String(m.value);
          return /* @__PURE__ */ e.jsx(
            a.Input,
            {
              "aria-label": `${h} (${f})`,
              value: c[o]?.options?.[h] ?? "",
              placeholder: typeof m.label == "string" && m.label !== "" ? m.label : h,
              onChange: (g) => x(o, { options: { ...c[o]?.options, [h]: g.target.value } })
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
function Xa(s) {
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
function el({ id: s, field: l, siblings: n, onChange: r, errors: i }) {
  const c = n.filter((o) => o.key !== l.key && o.handle !== ""), u = l.condition ?? null, x = Me.find((o) => o.value === u?.operator) ?? Me[0], d = (o) => r({ ...l, condition: o === null ? null : { field: u?.field ?? c[0]?.handle ?? "", operator: u?.operator ?? "equals", value: u?.value ?? "", ...o } });
  return c.length === 0 && u === null ? null : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-condition`, children: t("Show") }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(a.Select, { value: u?.field ?? Ie, onValueChange: (o) => d(o === Ie ? null : { field: o }), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: `${s}-condition`, className: "cms:w-56", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
          /* @__PURE__ */ e.jsx(a.SelectItem, { value: Ie, children: t("Always") }),
          c.map((o) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: o.handle, children: t("When :field", { field: o.label || o.handle }) }, o.key))
        ] })
      ] }),
      u && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(a.Select, { value: x.value, onValueChange: (o) => d({ operator: o }), children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { "aria-label": t("How to compare"), className: "cms:w-36", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: Me.map((o) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: o.value, children: Xa(o.value) }, o.value)) })
        ] }),
        x.needsValue && /* @__PURE__ */ e.jsx(
          a.Input,
          {
            "aria-label": t("Value"),
            className: "cms:w-48",
            placeholder: t("a value, or true / false"),
            value: String(u.value ?? ""),
            onChange: (o) => d({ value: o.target.value })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("A hidden field isn't required, and keeps what it had.") }),
    /* @__PURE__ */ e.jsx(A, { message: i.field ?? i.operator ?? i.value ?? i[""] })
  ] });
}
function sl(s, l) {
  return s.split(/(:[a-z_]+)/).map((n, r) => {
    const i = l[n.slice(1)];
    return n.startsWith(":") && i !== void 0 ? /* @__PURE__ */ e.jsx("code", { children: i }, r) : n;
  });
}
function tl(s, l) {
  return t(s === "fieldset" ? l ? "Set when it was created: flexible blocks keep it with what they hold." : "Lowercase letters, digits and underscores. It can't change later: flexible blocks keep it with what they hold." : l ? "Changing it updates the collections, taxonomies, global sets, forms and entries that use it." : "Lowercase letters, digits and underscores, made from the title until you type one.");
}
function hs({ kind: s = "blueprint", blueprint: l, fieldTypes: n, locales: r = [], usedBy: i = [], reserved: c = [] }) {
  const u = s === "fieldset", x = L(u ? "cms/fieldsets" : "cms/blueprints"), d = l ? l.title : t(u ? "New fieldset" : "New blueprint");
  a.useBreadcrumbs([{ label: t(u ? "Fieldsets" : "Blueprints"), href: x }, { label: d }]);
  const [o, f] = re(), m = N.useForm({ title: l?.title ?? "", handle: l?.handle ?? "" }), [h, g] = _.useState(l !== null), [k, b] = _.useState(() => Dt(l?.fields)), y = ($) => n.find((F) => F.type === $)?.hasChildren === !0, T = m.errors, [S, w] = _.useState(() => JSON.stringify(k)), p = m.isDirty || JSON.stringify(k) !== S, B = () => {
    m.setDefaults();
    const $ = Tt(k);
    b($), w(JSON.stringify($));
  }, E = () => {
    m.processing || (m.transform(($) => ({
      // A blueprint's handle can change (RenameBlueprint); a fieldset's can't: flexible blocks store it.
      ...l ? s === "blueprint" ? { title: $.title, handle: $.handle } : { title: $.title } : $,
      fields: _t(k, y)
    })), l ? m.put(`${x}/${l.handle}`, { preserveScroll: !0, onSuccess: B }) : m.post(x, { onSuccess: B }));
  }, j = ($) => {
    $.preventDefault(), E();
  };
  a.useUnsavedChanges(p, E);
  const M = () => l && o(
    u ? t('Delete the fieldset ":title"? Content keeps its values.', { title: l.title }) : t('Delete the blueprint ":title"? Content keeps its values.', { title: l.title }),
    () => N.router.delete(`${x}/${l.handle}`, { preserveScroll: !0 })
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: j, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: d }),
    f,
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: d,
        back: { href: x, label: t(u ? "Back to fieldsets" : "Back to blueprints") },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          l && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "icon", className: "cms:text-destructive", "aria-label": t("Delete :title", { title: d }), onClick: M, children: /* @__PURE__ */ e.jsx(W, {}) }),
          /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: m.processing, children: [
            m.processing && /* @__PURE__ */ e.jsx(ue, { className: "cms:animate-spin" }),
            t(l ? "Save" : u ? "Create fieldset" : "Create blueprint")
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(A, { message: T.blueprint ?? T.fieldset }),
    /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "title", children: t("Title") }),
        /* @__PURE__ */ e.jsx(a.Input, { id: "title", value: m.data.title, required: !0, onChange: ($) => {
          m.setData((F) => ({ ...F, title: $.target.value, handle: h ? F.handle : Ct($.target.value) }));
        } }),
        /* @__PURE__ */ e.jsx(A, { message: T.title })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "handle", children: t("Handle") }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: "handle",
            className: "cms:font-mono",
            value: m.data.handle,
            disabled: l !== null && s === "fieldset",
            required: !0,
            spellCheck: !1,
            onChange: ($) => {
              g(!0), m.setData("handle", wt($.target.value));
            }
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: tl(s, l !== null) }),
        /* @__PURE__ */ e.jsx("div", { "aria-live": "polite", children: l !== null && s === "blueprint" && m.data.handle !== "" && m.data.handle !== l.handle && /* @__PURE__ */ e.jsx(yt, { id: "handle-warning", children: t(`Changing the handle can break code. Sunrice updates the collections, taxonomies, global sets, forms and entries that use ":old". You update code that names it (Blueprint::where('handle', ':old')) and structure exports made before.`, { old: l.handle }) }) }),
        /* @__PURE__ */ e.jsx(A, { message: T.handle })
      ] })
    ] }) }),
    i.length > 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("Used by :list. Changes show there at once.", { list: i.join(", ") }) }),
    /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-3", "aria-labelledby": "fields-heading", children: [
      /* @__PURE__ */ e.jsx("h2", { id: "fields-heading", className: "cms:text-lg cms:font-medium", children: t("Fields") }),
      /* @__PURE__ */ e.jsx(At, { fields: k, onChange: b, types: n, errors: xe(T, "fields"), reserved: s === "blueprint" ? c : void 0, locales: r.slice(1) }),
      /* @__PURE__ */ e.jsx(A, { message: T.fields })
    ] })
  ] });
}
function Et({ kind: s, base: l, rows: n, intro: r }) {
  const i = s === "blueprint", c = t(i ? "Blueprints" : "Fieldsets");
  a.useBreadcrumbs([{ label: c }]);
  const [u, x] = re();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: c }),
    x,
    /* @__PURE__ */ e.jsx(a.PageHeader, { title: c, description: r, actions: /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(N.Link, { href: `${l}/create`, children: [
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
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx(N.Link, { href: `${l}/${d.handle}/edit`, className: "cms:font-medium cms:hover:underline", children: d.title }) }),
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
              onClick: () => u(
                i ? t('Delete the blueprint ":title"? Content keeps its values.', { title: d.title }) : t('Delete the fieldset ":title"? Content keeps its values.', { title: d.title }),
                () => N.router.delete(`${l}/${d.handle}`, { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(W, {})
            }
          ) })
        ] }, d.id))
      ] })
    ] }) })
  ] });
}
function al({ blueprints: s }) {
  const l = N.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(A, { message: l.blueprint }),
    /* @__PURE__ */ e.jsx(
      Et,
      {
        kind: "blueprint",
        base: L("cms/blueprints"),
        rows: s,
        intro: t("The fields editors fill in, for each kind of content.")
      }
    )
  ] });
}
const xs = (s) => `resources/views/${s.replace(/\./g, "/")}.blade.php`;
function Ft({ example: s, fallbacks: l }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1 cms:text-xs cms:leading-relaxed cms:text-muted-foreground", children: [
    /* @__PURE__ */ e.jsx("p", { children: t("A Blade view: :example is :file.", { example: "\0", file: "" }).split(/(\u0000|\u0001)/).map((n, r) => n === "\0" ? /* @__PURE__ */ e.jsx("code", { className: "cms:text-foreground", children: s }, r) : n === "" ? /* @__PURE__ */ e.jsx("code", { className: "cms:break-all", children: xs(s) }, r) : n) }),
    /* @__PURE__ */ e.jsx("p", { children: t("Empty: the first that exists of") }),
    /* @__PURE__ */ e.jsxs("ol", { className: "cms:ml-4 cms:list-decimal", children: [
      l.map((n) => /* @__PURE__ */ e.jsx("li", { children: n.includes(" ") ? n : /* @__PURE__ */ e.jsx("code", { className: "cms:break-all", children: xs(n) }) }, n)),
      /* @__PURE__ */ e.jsx("li", { children: t("the built-in template") })
    ] })
  ] });
}
const ps = { preserveScroll: !0, preserveState: !0 };
function ll({ entryId: s, comments: l }) {
  const [n, r] = _.useState(null), [i, c] = _.useState(""), [u, x] = _.useState(!1), d = (f, m) => N.router.post(L(`cms/comments/${f}/status`), { status: m }, ps), o = (f) => N.router.post(L(`cms/comments/${f}/reply`), { body: i }, {
    ...ps,
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
        l.latest.map((f) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5 cms:border-t cms:border-border/70 cms:pt-3 cms:first-of-type:border-t-0 cms:first-of-type:pt-0", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium", children: f.author }),
            f.status === "pending" && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", children: t("Pending") })
          ] }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:line-clamp-3 cms:break-words cms:whitespace-pre-line", children: f.excerpt }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
            K(f.createdAt),
            f.reply ? ` · ${t("a reply")}` : ""
          ] }),
          l.canModerate && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-1", children: [
            f.status === "pending" && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => d(f.id, "approved"), children: [
              /* @__PURE__ */ e.jsx(ke, {}),
              " ",
              t("Approve")
            ] }),
            /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => d(f.id, "spam"), children: [
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
                "aria-expanded": n === f.id,
                onClick: () => {
                  r(n === f.id ? null : f.id), c("");
                },
                children: [
                  /* @__PURE__ */ e.jsx(nt, {}),
                  " ",
                  t("Reply")
                ]
              }
            )
          ] }),
          n === f.id && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              a.Textarea,
              {
                "aria-label": t("Reply to :author", { author: f.author }),
                rows: 3,
                value: i,
                onChange: (m) => c(m.target.value)
              }
            ),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
              /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "sm", disabled: i.trim() === "" || u, onClick: () => o(f.id), children: t("Post reply") }),
              /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => r(null), children: t("Cancel") })
            ] })
          ] })
        ] }, f.id)),
        /* @__PURE__ */ e.jsx("a", { href: L(`cms/comments?entry=${s}`), className: "cms:text-sm cms:font-medium cms:underline-offset-4 cms:hover:underline", children: t("All comments on this entry") })
      ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-10" }),
        /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-10" })
      ] })
    }
  );
}
const Ht = "cms:flex cms:flex-col cms:gap-1 cms:opacity-60";
function Xe({ fields: s, values: l, onChange: n, errors: r, storageKey: i, shared: c = [], sharedValues: u = {}, sharedNote: x, disabled: d = !1 }) {
  const o = [], f = { ...u, ...l };
  for (const h of s.filter((g) => Ze(g, f))) {
    const g = o[o.length - 1];
    h.type === "group" ? o.push(h) : Array.isArray(g) ? g.push(h) : o.push([h]);
  }
  const m = x && (c.length > 0 || Ce(s)) ? /* @__PURE__ */ e.jsx("p", { role: "note", className: "cms:rounded-lg cms:border cms:border-dashed cms:px-3 cms:py-2 cms:text-sm cms:text-muted-foreground", children: x }) : null;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    m,
    o.map((h) => {
      if (Array.isArray(h))
        return /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsx(a.CardContent, { children: /* @__PURE__ */ e.jsx("fieldset", { disabled: d, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: h.map((y) => c.includes(y.handle) ? /* @__PURE__ */ e.jsx("fieldset", { disabled: !0, className: Ht, title: t("Shared by all languages"), children: /* @__PURE__ */ e.jsx(ce, { id: `data-${y.handle}`, field: y, content: !0, value: u[y.handle], errors: {}, onChange: () => {
        } }) }, y.handle) : /* @__PURE__ */ e.jsx(
          ce,
          {
            id: `data-${y.handle}`,
            field: y,
            content: !0,
            value: l[y.handle],
            errors: Z(r, `data.${y.handle}`),
            onChange: (T) => n(y.handle, T)
          },
          y.handle
        )) }) }) }, `fields-${h[0]?.handle ?? ""}`);
      const g = c.includes(h.handle), k = (g ? u : l)[h.handle], b = Z(r, `data.${h.handle}`);
      return /* @__PURE__ */ e.jsx(
        a.CollapsibleCard,
        {
          title: we(h),
          titleClassName: "cms:text-base",
          description: h.instructions ?? void 0,
          storageKey: `${i}:${h.handle}`,
          hasErrors: !g && ye(r, `data.${h.handle}`),
          children: /* @__PURE__ */ e.jsxs(
            "fieldset",
            {
              disabled: g || d,
              role: "group",
              "aria-label": we(h),
              className: `cms:flex cms:flex-col cms:gap-2 ${g ? "cms:opacity-60" : ""}`,
              title: g ? t("Shared by all languages") : void 0,
              children: [
                /* @__PURE__ */ e.jsx(
                  he,
                  {
                    bare: !0,
                    fields: h.fields ?? [],
                    id: `data-${h.handle}`,
                    content: !0,
                    errors: g ? {} : b,
                    value: k && typeof k == "object" && !Array.isArray(k) ? k : {},
                    onChange: (y) => n(h.handle, y)
                  }
                ),
                /* @__PURE__ */ e.jsx(A, { message: g ? void 0 : b[""] })
              ]
            }
          )
        },
        h.handle
      );
    })
  ] });
}
function Pt({ note: s, redirectsUrl: l }) {
  return /* @__PURE__ */ e.jsx("div", { "aria-live": "polite", children: s !== null && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-xs cms:text-muted-foreground", children: [
    t(s === "redirects" ? "Once published, the old address redirects to the new one." : "The old address will stop working (404) unless a redirect is added."),
    s === "breaks" && l && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      " ",
      /* @__PURE__ */ e.jsx("a", { href: l, target: "_blank", rel: "noopener", className: "cms:underline cms:underline-offset-2 cms:hover:text-foreground", children: t("Add a redirect") })
    ] })
  ] }) });
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
function gs(s) {
  if (s.length === 0) return "";
  const l = s.slice(0, 5).map((n) => n.label).join("; ");
  return ` ${s.length > 5 ? t("It's used by :list and :count more: those links will show nothing.", { list: l, count: s.length - 5 }) : t("It's used by :list: those links will show nothing.", { list: l })}`;
}
function nl(s) {
  const { entry: l } = s;
  return /* @__PURE__ */ e.jsx(cl, { ...s }, l ? `${l.id}:${l.locale}:${l.version}:${l.status}:${l.trashed}:${l.publishedAt}` : "new");
}
function cl({ collection: s, fields: l, locales: n = [], shared: r = [], sharedValues: i = {}, entry: c, values: u, revisions: x, comments: d, termLabels: o, usedBy: f = [], undoRestore: m = null, machineTranslate: h = null, machineTranslateMissing: g = !1, settings: k, blueprints: b = [], homepage: y, redirectsUrl: T = null, can: S }) {
  const w = L(`cms/collections/${s.handle}/entries`), p = c ? L(`cms/entries/${c.id}`) : w, B = c ? u.title : t("New entry");
  a.useBreadcrumbs([{ label: s.title, href: w }, { label: B }]);
  const [E, j] = re(), [M, $] = _.useState(!1), [F, C] = _.useState(null), D = N.useForm({
    ...u,
    seo: u.seo ?? {},
    locale: c?.locale ?? null,
    version: c?.version ?? null,
    publish: !1,
    published_at: null,
    parent_id: k?.parentId ?? null,
    template: k?.template ?? "",
    comments_closed: k?.commentsClosed === !0
  }), O = (z) => D.setData((U) => ({ ...U, ...z })), X = c ? { locale: c.locale } : {}, Q = n.find((z) => z.main)?.code, R = D.errors, ie = N.usePage().props.errors ?? {}, ae = (z) => {
    const U = _e(R, z);
    U.length > 0 && D.clearErrors(...U);
  }, ee = c !== null && c.status !== "draft" && !c.hasUnpublishedChanges && !D.isDirty, ge = c === null ? S.create : S.update && !c.trashed, oe = c?.status === "scheduled", v = (z) => {
    if (k || c === null) return z;
    const { parent_id: U, template: Y, comments_closed: en, ...Gt } = z;
    return Gt;
  }, P = (z = !1, U = null) => {
    D.transform((Y) => ({ ...v(Y), publish: z, published_at: U })), c ? D.put(p, { preserveScroll: !0, onSuccess: () => $(!1) }) : D.post(p);
  }, V = () => {
    D.transform((z) => ({ ...v(z), version: null, publish: !1, published_at: null })), D.put(p, { preserveScroll: !0 });
  }, q = a.useEditLock({
    type: "cms.entry",
    id: c?.id,
    locale: c?.locale,
    enabled: c !== null && ge,
    noun: t("entry"),
    leaveTo: w,
    getUnsaved: () => D.isDirty ? { title: D.data.title, slug: D.data.slug, data: D.data.data, seo: D.data.seo } : null
  }), G = ge && !q.readOnly, Kt = async (z) => {
    const U = await q.loadKept(z);
    D.setData((Y) => ({ ...Y, title: U.title ?? Y.title, slug: U.slug ?? Y.slug, data: U.data ?? Y.data, seo: U.seo ?? Y.seo }));
  };
  a.useUnsavedChanges(D.isDirty && !q.takenOver, G ? () => D.processing || P() : void 0);
  const Wt = () => {
    const z = () => N.router.post(`${p}/review`, X, { preserveScroll: !0 });
    D.isDirty ? (D.transform((U) => ({ ...U, publish: !1, published_at: null })), D.put(p, { preserveScroll: !0, onSuccess: z })) : z();
  }, Ne = (z = null) => {
    S.update ? P(!0, z) : c && N.router.post(`${p}/publish`, { ...X, published_at: z }, { preserveScroll: !0, onSuccess: () => $(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (z) => {
    z.preventDefault(), P();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: B }),
    j,
    q.dialogs,
    /* @__PURE__ */ e.jsxs(
      a.PageHeader,
      {
        title: B,
        back: { href: w, label: t("Back to :title", { title: s.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          c && !c.trashed && s.pages !== !1 && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(
            "a",
            {
              href: c.previewUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              title: D.isDirty ? t("Shows the saved draft: save first to see your changes.") : t("Shows the saved draft."),
              children: [
                /* @__PURE__ */ e.jsx(pa, {}),
                " ",
                t("Preview")
              ]
            }
          ) }),
          c?.url && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: c.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(pe, {}),
            " ",
            t("View page")
          ] }) }),
          c?.trashed && S.delete && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", onClick: () => N.router.post(`${p}/restore`, {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(fe, {}),
            " ",
            t("Restore")
          ] }),
          c?.trashed && S.delete && /* @__PURE__ */ e.jsxs(
            a.Button,
            {
              type: "button",
              variant: "outline",
              className: "cms:text-destructive",
              onClick: () => E(
                t(`Delete ":title" for good, in every language, with its revisions? This can't be undone.`, { title: u.title }) + gs(f),
                () => N.router.delete(`${p}/force`, { data: f.length > 0 ? { force: 1 } : {} })
              ),
              children: [
                /* @__PURE__ */ e.jsx(W, {}),
                " ",
                t("Delete for good")
              ]
            }
          ),
          c && !c.trashed && (S.create || S.delete && !q.readOnly || G && h !== null) && /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "icon", "aria-label": t("More actions"), children: /* @__PURE__ */ e.jsx(Ks, {}) }) }),
            /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", className: "cms:min-w-52", children: [
              G && h !== null && /* @__PURE__ */ e.jsxs(
                a.DropdownMenuItem,
                {
                  disabled: D.processing || D.isDirty,
                  title: D.isDirty ? void 0 : t("Fill in what isn't translated yet, into the draft"),
                  onSelect: () => N.router.post(L(`cms/entries/${c.id}/translations/${c.locale}/translate`), { version: c.version }, { preserveScroll: !0 }),
                  children: [
                    /* @__PURE__ */ e.jsx(ns, {}),
                    " ",
                    D.isDirty ? t("Save to translate") : t("Translate from :language", { language: n.find((z) => z.main)?.name ?? (Q ? H(Q) : t("the main language")) })
                  ]
                }
              ),
              S.create && /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { title: t("Copy every language as a new draft"), onSelect: () => N.router.post(`${p}/duplicate`), children: [
                /* @__PURE__ */ e.jsx(ha, {}),
                " ",
                t("Duplicate")
              ] }),
              S.delete && !q.readOnly && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
                /* @__PURE__ */ e.jsxs(
                  a.DropdownMenuItem,
                  {
                    className: "cms:text-destructive",
                    onSelect: () => E(t('Move ":title" to the trash? It comes off the site; you can restore it.', { title: u.title }) + gs(f), () => N.router.delete(p), t("Move to trash")),
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
          c && G && g && /* @__PURE__ */ e.jsxs("span", { title: t("Machine translation isn't set up on this site: ask your developer (SUNRICE_TRANSLATE_DRIVER, see Help → Developer docs → Machine translation)."), children: [
            /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", disabled: !0, "aria-describedby": "machine-translate-missing", children: [
              /* @__PURE__ */ e.jsx(ns, {}),
              " ",
              t("Translate from :language", { language: n.find((z) => z.main)?.name ?? (Q ? H(Q) : t("the main language")) })
            ] }),
            /* @__PURE__ */ e.jsx("span", { id: "machine-translate-missing", className: "cms:sr-only", children: t("Machine translation isn't set up on this site: ask your developer.") })
          ] }),
          G && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", variant: c ? "outline" : "default", disabled: D.processing, children: [
            D.processing && /* @__PURE__ */ e.jsx(ue, { className: "cms:animate-spin" }),
            t(c ? "Save draft" : "Create draft")
          ] }),
          c && !c.trashed && G && !S.publish && (c.status === "draft" || c.hasUnpublishedChanges || D.isDirty) && /* @__PURE__ */ e.jsxs(
            a.Button,
            {
              type: "button",
              disabled: D.processing,
              onClick: Wt,
              title: c.review ? t("Already sent; sending again tells them again") : t("Ask those who can publish to review it"),
              children: [
                /* @__PURE__ */ e.jsx(ka, {}),
                " ",
                c.review ? t("Send for review again") : t("Submit for review")
              ]
            }
          ),
          c && !c.trashed && S.publish && !q.readOnly && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex", children: [
            oe && ee ? /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", className: "cms:rounded-r-none", disabled: D.processing, title: t("Change the date"), onClick: () => $(!0), children: [
              /* @__PURE__ */ e.jsx(Ve, {}),
              " ",
              t("Scheduled for :date", { date: K(c.publishedAt) })
            ] }) : /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: ee ? "outline" : "default", className: "cms:rounded-r-none cms:disabled:opacity-100", disabled: D.processing || ee, onClick: () => Ne(), children: [
              ee && /* @__PURE__ */ e.jsx(ke, { className: "cms:text-emerald-600 cms:dark:text-emerald-400" }),
              c.status === "draft" ? t("Publish") : t(ee ? "Published" : "Publish changes")
            ] }),
            /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
              /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "icon", variant: ee ? "outline" : "default", className: ee ? "cms:-ml-px cms:rounded-l-none" : "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": t("More publishing options"), children: /* @__PURE__ */ e.jsx(Ge, {}) }) }),
              /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", children: [
                /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { onSelect: () => $(!0), children: [
                  /* @__PURE__ */ e.jsx(Ve, {}),
                  " ",
                  t(oe ? "Change the date…" : "Publish on a date…")
                ] }),
                oe && /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => Ne((/* @__PURE__ */ new Date()).toISOString()), children: t("Publish now") }),
                c.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
                  /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => N.router.post(`${p}/unpublish`, X, { preserveScroll: !0 }), children: t(oe ? "Unschedule (back to draft)" : "Unpublish") })
                ] })
              ] })
            ] })
          ] })
        ] }),
        children: [
          c && /* @__PURE__ */ e.jsx(a.Badge, { variant: c.status === "published" ? "success" : "secondary", children: c.trashed ? t("In the trash") : te(c.status) }),
          c?.review && !c.trashed && /* @__PURE__ */ e.jsx(a.Badge, { variant: "warning", title: c.review.by ? t(":name sent it on :date", { name: c.review.by, date: K(c.review.requestedAt) }) : t("Sent on :date", { date: K(c.review.requestedAt) }), children: t("Waiting for review") }),
          D.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
        ]
      }
    ),
    c && n.length > 1 && /* @__PURE__ */ e.jsx(
      rl,
      {
        entryUrl: p,
        editUrl: `${w}/${c.id}/edit`,
        current: c.locale,
        locales: n,
        canAdd: S.create && !c.trashed,
        canRemove: S.delete && !c.isMain && !c.trashed,
        onRemove: () => E(
          t('Remove the :language translation of ":title"? Its revisions go with it.', { language: H(c.locale), title: u.title }),
          () => N.router.delete(`${p}/translations/${c.locale}`)
        )
      }
    ),
    /* @__PURE__ */ e.jsx(a.ViewingNotice, { by: q.viewingBy, onTakeOver: q.requestTakeOver }),
    /* @__PURE__ */ e.jsx(a.KeptEditsNotice, { kept: q.kept, disabled: !G, onLoad: (z) => {
      Kt(z);
    }, onDiscard: (z) => {
      q.discardKept(z);
    } }),
    R.version && /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: [
      /* @__PURE__ */ e.jsx("span", { children: R.version }),
      /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => N.router.reload(), children: t("Load theirs") }),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            type: "button",
            variant: "destructive",
            size: "sm",
            disabled: D.processing,
            onClick: () => E(t("Save your version over theirs? Their changes are replaced (their earlier published versions stay in the revisions)."), V),
            children: t("Save mine anyway")
          }
        )
      ] })
    ] }),
    (R.entry || R.published_at || ie.published_at || ie.homepage) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: R.entry ?? R.published_at ?? ie.published_at ?? ie.homepage }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_18rem]", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsx(a.CardContent, { children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: !G, className: "cms:grid cms:gap-4 cms:md:grid-cols-[2fr_1fr]", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "title", children: t("Title") }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "title",
                value: D.data.title,
                "aria-invalid": R.title !== void 0,
                onChange: (z) => {
                  const U = z.target.value;
                  D.setData((Y) => ({ ...Y, title: U, slug: Zt(Y.slug, Y.title, U, c !== null && c.publishedAt === null && c.status === "draft") })), ae("title");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(A, { message: R.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "slug", children: t("Slug") }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "slug",
                className: "cms:font-mono",
                value: D.data.slug,
                placeholder: t("Made from the title"),
                "aria-invalid": R.slug !== void 0,
                onChange: (z) => {
                  D.setData("slug", z.target.value), ae("slug");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(Pt, { note: ks(c?.publishedSlug, D.data.slug, c !== null && c.status !== "draft"), redirectsUrl: T }),
            /* @__PURE__ */ e.jsx(A, { message: R.slug })
          ] })
        ] }) }) }),
        /* @__PURE__ */ e.jsx(St.Provider, { value: Array.isArray(o) || !o ? {} : o, children: /* @__PURE__ */ e.jsx(
          Xe,
          {
            disabled: !G,
            fields: l,
            values: D.data.data,
            errors: R,
            storageKey: `cms:entry:${s.handle}`,
            shared: r,
            sharedValues: i,
            sharedNote: Q ? t("Shared by all languages: the greyed-out fields are edited in :language.", { language: H(Q) }) : t("Shared by all languages: the greyed-out fields are edited in the main language."),
            onChange: (z, U) => {
              D.setData("data", { ...D.data.data, [z]: U }), ae(`data.${z}`);
            }
          }
        ) }),
        /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: t("SEO"), description: t("How this entry appears in search results and shared links."), titleClassName: "cms:text-base", storageKey: "cms:entry:seo", hasErrors: ye(R, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !G, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(
          he,
          {
            bare: !0,
            id: "seo",
            fields: es(),
            value: D.data.seo,
            errors: Z(R, "seo"),
            onChange: (z) => {
              D.setData("seo", z), ae("seo");
            }
          }
        ) }) })
      ] }),
      !c && s.hierarchical && /* @__PURE__ */ e.jsx("aside", { className: "cms:flex cms:flex-col cms:gap-4", children: /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: "Page settings", titleClassName: "cms:text-base", storageKey: "cms:entry:page-settings", hasErrors: R.parent_id !== void 0, children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !G, className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: /* @__PURE__ */ e.jsx(Ot, { collection: s, value: D.data.parent_id, error: R.parent_id, onChange: (z) => O({ parent_id: z }) }) }) }) }),
      c && /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:flex-col cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: t("Status"), titleClassName: "cms:text-base", storageKey: "cms:entry:status", contentClassName: "cms:flex cms:flex-col cms:gap-3 cms:text-sm", children: [
          /* @__PURE__ */ e.jsxs("dl", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-3", children: [
              /* @__PURE__ */ e.jsx("dt", { className: "cms:text-muted-foreground", children: t("Status") }),
              /* @__PURE__ */ e.jsx("dd", { children: /* @__PURE__ */ e.jsx(a.Badge, { variant: c.status === "published" ? "success" : "secondary", children: c.trashed ? t("In the trash") : te(c.status) }) })
            ] }),
            c.status !== "draft" && c.publishedAt && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:justify-between cms:gap-3", children: [
              /* @__PURE__ */ e.jsx("dt", { className: "cms:text-muted-foreground", children: c.status === "scheduled" ? t("Goes live") : t("Published") }),
              /* @__PURE__ */ e.jsx("dd", { className: "cms:text-right cms:tabular-nums", children: K(c.publishedAt) })
            ] })
          ] }),
          c.review && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-muted-foreground", children: [
            c.review.by ? t("Sent for review by :name · :date.", { name: c.review.by, date: K(c.review.requestedAt) }) : t("Sent for review · :date.", { date: K(c.review.requestedAt) }),
            S.publish ? ` ${t("Publishing it answers the request.")}` : ""
          ] }),
          !c.trashed && S.publish && !q.readOnly && /* @__PURE__ */ e.jsx(
            il,
            {
              status: c.status,
              publishedAt: c.publishedAt,
              processing: D.processing,
              onPublish: (z) => Ne(z),
              onUnpublish: () => N.router.post(`${p}/unpublish`, X, { preserveScroll: !0 })
            },
            c.publishedAt ?? "none"
          ),
          c.status !== "draft" && c.hasUnpublishedChanges && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("The draft has changes the site doesn't show yet.") }),
          y?.is && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("This is the site's homepage.") }),
          y && !y.is && y.can && c.status === "published" && !c.trashed && /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "cms:mt-1 cms:self-start",
              onClick: () => N.router.post(`${p}/homepage`, {}, { preserveScroll: !0 }),
              children: t("Make this the homepage")
            }
          ),
          n.find((z) => z.code === c.locale)?.outdated && /* @__PURE__ */ e.jsx("p", { className: "cms:text-amber-700 cms:dark:text-amber-400", children: Q ? t("The :language version changed since this translation was last saved.", { language: H(Q) }) : t("The main version changed since this translation was last saved.") })
        ] }),
        /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: t("Used by"), titleClassName: "cms:text-base", storageKey: "cms:entry:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          f.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("No other content links here.") }),
          f.map((z) => /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
            z.url ? /* @__PURE__ */ e.jsx("a", { href: z.url, className: "cms:block cms:truncate cms:underline-offset-4 cms:hover:underline", children: z.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:truncate", children: z.label }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", title: z.field, children: z.fieldLabel ?? z.field })
          ] }, `${z.label}:${z.field}`))
        ] }),
        k && /* @__PURE__ */ e.jsx(
          ml,
          {
            entryUrl: p,
            collection: s,
            settings: k,
            blueprints: b,
            disabled: !G,
            values: D.data,
            errors: R,
            onChange: O,
            draftDirty: D.isDirty
          }
        ),
        d !== null && s.comments && /* @__PURE__ */ e.jsx(ll, { entryId: c.id, comments: d }),
        /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: t("Revisions"), titleClassName: "cms:text-base", storageKey: "cms:entry:revisions", contentClassName: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
          m !== null && S.update && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => N.router.post(L(`cms/entries/${c.id}/translations/${c.locale}/undo-restore`), {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(qe, {}),
            " ",
            t("Undo the restore")
          ] }),
          /* @__PURE__ */ e.jsx(N.Deferred, { data: "revisions", fallback: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-8" }),
            /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-8" })
          ] }), children: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            (x ?? []).length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("Each publish keeps one.") }),
            (x ?? []).map((z) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1 cms:border-b cms:border-border/60 cms:pb-2 cms:last:border-b-0 cms:last:pb-0", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
                /* @__PURE__ */ e.jsx("div", { className: "cms:truncate", children: z.title }),
                /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
                  K(z.createdAt),
                  z.author ? ` · ${z.author}` : ""
                ] }),
                /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: z.changed === null ? t("First kept version") : z.changed.length === 0 ? t("No field changed") : t("Changed: :fields", { fields: z.changed.join(", ") }) })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-1", children: [
                /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => C(z), children: t("Compare") }),
                S.update && !c.trashed && /* @__PURE__ */ e.jsx(
                  a.Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    onClick: () => N.router.post(L(`cms/entries/${c.id}/revisions/${z.id}/restore`), {}, { preserveScroll: !0 }),
                    children: t("Restore")
                  }
                )
              ] })
            ] }, z.id))
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(dl, { entryId: c?.id ?? 0, revision: F, onClose: () => C(null), dirty: D.isDirty }),
    /* @__PURE__ */ e.jsx(
      ol,
      {
        open: M,
        onClose: () => $(!1),
        processing: D.processing,
        rescheduling: oe,
        current: c?.publishedAt ?? null,
        onSchedule: (z) => Ne(z)
      }
    )
  ] });
}
function rl({ entryUrl: s, editUrl: l, current: n, locales: r, canAdd: i, canRemove: c, onRemove: u }) {
  const x = r.filter((o) => o.status !== null), d = r.filter((o) => o.status === null);
  return /* @__PURE__ */ e.jsxs("nav", { "aria-label": t("Languages"), className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("div", { className: "cms:inline-flex cms:items-center cms:gap-0.5 cms:rounded-md cms:bg-muted cms:p-0.5", children: x.map((o) => {
      const f = o.code === n, m = o.main ? t(":language (main)", { language: o.name ?? H(o.code) }) : o.name ?? H(o.code), h = o.status ? te(o.status) : "", g = o.outdated ? t(":language: :status, outdated (the main language changed since)", { language: m, status: h }) : t(":language: :status", { language: m, status: h });
      return /* @__PURE__ */ e.jsxs(
        "button",
        {
          type: "button",
          title: g,
          "aria-label": g,
          "aria-current": f ? "page" : void 0,
          onClick: () => !f && N.router.get(l, { locale: o.code }),
          className: `cms:relative cms:inline-flex cms:h-7 cms:min-w-10 cms:items-center cms:justify-center cms:gap-1.5 cms:rounded cms:px-2.5 cms:text-xs cms:font-semibold cms:tracking-wide cms:uppercase cms:transition-colors ${f ? "cms:bg-card cms:text-foreground cms:shadow-xs" : "cms:text-muted-foreground cms:hover:text-foreground"}`,
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
        title: t("Add :language", { language: o.name ?? H(o.code) }),
        onClick: () => N.router.post(`${s}/translations`, { locale: o.code }),
        children: [
          /* @__PURE__ */ e.jsx(J, {}),
          " ",
          o.code
        ]
      },
      o.code
    )),
    c && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:ml-auto cms:text-destructive", onClick: u, children: t("Remove this language") })
  ] });
}
function il({ status: s, publishedAt: l, processing: n, onPublish: r, onUnpublish: i }) {
  const [c, u] = _.useState(l ? Ss(new Date(l)) : ""), x = c === "" ? null : new Date(c), d = x !== null && x.getTime() > Date.now(), o = (h) => h === null ? null : Math.floor(h.getTime() / 6e4), f = o(x) !== o(l ? new Date(l) : null), m = t(s === "draft" ? d ? "Schedule" : "Publish" : d ? s === "scheduled" ? "Reschedule" : "Schedule" : "Change date");
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:border-t cms:border-border/60 cms:pt-3", children: [
    /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "entry-published-at", children: t("Publish date") }),
    /* @__PURE__ */ e.jsx(a.DatePicker, { id: "entry-published-at", withTime: !0, className: "cms:max-w-none", value: c || null, onChange: (h) => u(h ?? "") }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t(s === "draft" ? "Empty: now. A date in the future schedules it." : "The date shown as published. A date in the future takes it off the site until then.") }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: [
      (s === "draft" || f) && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", size: "sm", disabled: n, onClick: () => r(x?.toISOString() ?? null), children: [
        /* @__PURE__ */ e.jsx(Ve, {}),
        " ",
        m
      ] }),
      s !== "draft" && /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "sm", variant: "outline", disabled: n, onClick: i, children: t("Unpublish") })
    ] })
  ] });
}
function ol({ open: s, onClose: l, onSchedule: n, current: r, processing: i, rescheduling: c }) {
  const [u, x] = _.useState("");
  _.useEffect(() => {
    s && x(Ss(Jt(r)));
  }, [s, r]);
  const d = u === "" ? null : new Date(u), o = d !== null && d.getTime() <= Date.now();
  return /* @__PURE__ */ e.jsx(a.Dialog, { open: s, onOpenChange: (f) => !f && l(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: t(c ? "Change the publish date" : "Publish on a date") }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: t("The entry goes live then.") })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "published-at", children: t("Date and time") }),
      /* @__PURE__ */ e.jsx(a.DatePicker, { id: "published-at", withTime: !0, required: !0, className: "cms:max-w-none", value: u || null, onChange: (f) => x(f ?? "") }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("In your time zone.") }),
      o && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-amber-700 cms:dark:text-amber-400", children: t("This date has passed: the entry goes live now, dated :date.", { date: K(d.toISOString()) }) })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: l, children: t("Cancel") }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", disabled: d === null || i, onClick: () => d && n(d.toISOString()), children: t(o ? "Publish now, back-dated" : c ? "Change the date" : "Schedule") })
    ] })
  ] }) });
}
function dl({ entryId: s, revision: l, onClose: n, dirty: r }) {
  const [i, c] = _.useState(null), [u, x] = _.useState(!1);
  return _.useEffect(() => {
    if (c(null), x(!1), !l) return;
    let d = !0;
    return fetch(L(`cms/entries/${s}/revisions/${l.id}/compare`), { headers: { Accept: "application/json" }, credentials: "same-origin" }).then((o) => o.ok ? o.json() : Promise.reject(new Error(String(o.status)))).then((o) => {
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
    u && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t("The comparison could not be loaded. Try again.") }),
    !u && i === null && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
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
function Ot({ collection: s, value: l, error: n, onChange: r }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "parent", children: t("Parent") }),
    /* @__PURE__ */ e.jsx(
      De,
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
function ml({ entryUrl: s, collection: l, settings: n, blueprints: r, disabled: i, values: c, errors: u, onChange: x, draftDirty: d }) {
  const o = r.length > 1 ? n.blueprint ?? r[0].handle : void 0, f = N.useForm({ blueprint: o ?? "" }), m = f.errors.blueprint, h = ["parent_id", "template", "comments_closed"].some((g) => u[g] !== void 0) || m !== void 0;
  return /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: t("Page settings"), titleClassName: "cms:text-base", storageKey: "cms:entry:page-settings", hasErrors: h, children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: i, className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: [
    l.hierarchical && /* @__PURE__ */ e.jsx(Ot, { collection: l, value: c.parent_id, error: u.parent_id, onChange: (g) => x({ parent_id: g }) }),
    r.length > 1 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "blueprint", children: t("Blueprint") }),
      /* @__PURE__ */ e.jsxs(a.Select, { value: f.data.blueprint, onValueChange: (g) => f.setData("blueprint", g), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: "blueprint", "aria-invalid": m !== void 0, children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(a.SelectContent, { children: r.map((g) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: g.handle, children: g.title }, g.handle)) })
      ] }),
      f.data.blueprint !== o && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("The fields change in every language; values of fields both blueprints have are kept. The editor reloads.") }),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            type: "button",
            size: "sm",
            disabled: f.processing || d,
            title: d ? t("Save your draft first") : void 0,
            onClick: () => f.put(`${s}/settings`, { preserveScroll: !0 }),
            children: t("Change blueprint")
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(A, { message: m })
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
          onChange: (g) => x({ template: g.target.value }),
          "aria-invalid": u.template !== void 0
        }
      ),
      /* @__PURE__ */ e.jsx(Ft, { example: `cms.${l.handle}-landing`, fallbacks: [t("the collection's template, if set"), `cms.${l.handle}`, "cms.entry"] }),
      /* @__PURE__ */ e.jsx(A, { message: u.template })
    ] }),
    l.comments && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(a.Switch, { id: "comments-open", checked: !c.comments_closed, onCheckedChange: (g) => x({ comments_closed: !g }) }),
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "comments-open", children: t("Accept new comments") }),
      /* @__PURE__ */ e.jsx("a", { href: L(`cms/comments?entry=${s.split("/").slice(-1)[0]}`), className: "cms:ml-auto cms:text-muted-foreground cms:underline-offset-4 hover:cms:underline", children: t("Comments") })
    ] })
  ] }) });
}
function Ke(s, l) {
  const n = s[l]?.depth ?? 0;
  let r = l + 1;
  for (; r < s.length && s[r].depth > n; ) r++;
  return r;
}
function ne(s, l) {
  const n = l < 0 ? 0 : l + 1, r = l < 0 ? s.length : Ke(s, l), i = l < 0 ? 0 : (s[l]?.depth ?? 0) + 1, c = [];
  for (let u = n; u < r; u++)
    s[u].depth === i && c.push(u);
  return c;
}
function ss(s, l, n) {
  const r = ne(s, l);
  if (n.length !== r.length || [...n].sort((x, d) => x - d).some((x, d) => x !== r[d]) || r.length === 0) return s.slice();
  const i = r[0], c = Ke(s, r[r.length - 1]), u = n.flatMap((x) => s.slice(x, Ke(s, x)));
  return [...s.slice(0, i), ...u, ...s.slice(c)];
}
function ul(s, l) {
  const n = new Set(s.map((x) => x.id)), r = /* @__PURE__ */ new Map();
  for (const x of s) {
    const d = l(x), o = d != null && n.has(d) ? d : null;
    r.set(o, [...r.get(o) ?? [], x]);
  }
  const i = [], c = /* @__PURE__ */ new Set(), u = (x, d) => {
    for (const o of r.get(x) ?? [])
      c.has(o.id) || (c.add(o.id), i.push({ ...o, depth: d }), u(o.id, d + 1));
  };
  u(null, 0);
  for (const x of s)
    c.has(x.id) || (c.add(x.id), i.push({ ...x, depth: 0 }), u(x.id, 1));
  return i;
}
function hl({ collection: s, rows: l, hierarchical: n = !1 }) {
  const r = _.useCallback(
    (d) => ul(d, (o) => n ? o.parentId : null),
    [n]
  ), [i, c] = _.useState(() => r(l));
  _.useEffect(() => c(r(l)), [l, r]);
  const u = (d, o) => {
    const f = ss(i, d, o), m = ne(f, d).map((h) => f[h].id);
    c(f), N.router.post(
      L("cms/entries/reorder"),
      { collection: s, ids: m, parent_id: d < 0 ? null : i[d]?.id ?? null },
      { preserveScroll: !0, preserveState: !0, onError: () => c(r(l)) }
    );
  }, x = (d) => /* @__PURE__ */ e.jsx(
    a.SortableList,
    {
      items: ne(i, d),
      getId: (o) => i[o].id,
      getLabel: (o) => i[o].title,
      onReorder: (o) => u(d, o),
      className: d < 0 ? "cms:gap-1" : "cms:mt-1 cms:gap-1 cms:pl-6",
      children: (o, { handle: f }) => {
        const m = i[o];
        return /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-lg cms:border cms:border-border/70 cms:bg-card cms:p-2 cms:text-sm", children: [
            /* @__PURE__ */ e.jsx(a.SortableHandle, { ...f, label: t("Move :title", { title: m.title }) }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium", children: m.title }),
            /* @__PURE__ */ e.jsx(a.Badge, { variant: m.status === "published" ? "success" : "secondary", children: te(m.status) })
          ] }),
          ne(i, o).length > 0 && x(o)
        ] });
      }
    }
  );
  return /* @__PURE__ */ e.jsxs(a.Card, { className: "cms:p-2", children: [
    n && /* @__PURE__ */ e.jsx("p", { className: "cms:px-1 cms:pb-1 cms:text-xs cms:text-muted-foreground", children: t("Entries move among those at their level, with what's under them. To put one under another, choose its Parent in its Page settings.") }),
    x(-1)
  ] });
}
function xl(s, l, n) {
  const r = { ...s, ...l }, i = Object.fromEntries(Object.entries(r.terms).filter(([, u]) => u !== "")), c = {};
  return r.search && (c.search = r.search), r.status && (c.status = r.status), r.author && (c.author = r.author), Object.keys(i).length > 0 && (c.terms = i), r.locale && r.locale !== n && (c.locale = r.locale), r.sort && (c.sort = r.sort), c.per_page = r.perPage, c;
}
function pl(s) {
  const l = new URLSearchParams();
  for (const [n, r] of Object.entries(s))
    if (typeof r == "object")
      for (const [i, c] of Object.entries(r)) l.set(`${n}[${i}]`, c);
    else
      l.set(n, String(r));
  return l.toString();
}
function gl(s, l) {
  return s === l ? `-${l}` : s === `-${l}` ? "" : l;
}
function fl(s, l) {
  return s === l ? "asc" : s === `-${l}` ? "desc" : null;
}
function fs(s) {
  return [s.search, s.status, s.author, ...Object.values(s.terms)].filter((l) => l !== "").length;
}
const Ae = "__all", jl = () => [
  { value: "draft", label: t("Drafts") },
  { value: "published", label: t("Published") },
  { value: "scheduled", label: t("Scheduled") },
  { value: "trashed", label: t("Trash") }
];
function bl(s) {
  const { collection: l, entries: n, query: r } = s;
  return a.useBreadcrumbs([{ label: l ? l.title : t("Entries") }]), !l || !n || !r ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: t("Entries") }),
    /* @__PURE__ */ e.jsx(a.PageHeader, { title: t("Entries"), description: t("There are no collections yet. Create one under Structure → Collections, then come back to write its entries.") })
  ] }) : /* @__PURE__ */ e.jsx(vl, { ...s, collection: l, entries: n, query: r });
}
function vl({
  collection: s,
  collections: l,
  entries: n,
  query: r,
  columns: i = [],
  filters: c = { authors: [], taxonomies: [], locales: [] },
  links: u = [],
  manualOrder: x = !1,
  perPageOptions: d = [10, 25, 50, 100],
  preferencesKey: o,
  can: f
}) {
  const m = L(`cms/collections/${s.handle}/entries`), h = c.locales[0] ?? r.locale, [g, k] = _.useState(r.search), [b, y] = _.useState([]), [T, S] = _.useState(!1), [w, p] = re(), { setColumns: B, setPerPage: E } = a.useTablePreferences(o ?? `table.cms.entries.${s.handle}`, { columns: r.columns, perPage: r.perPage });
  _.useEffect(() => y([]), [n]);
  const j = r.status === "trashed", M = fs(r) > 0, $ = i.filter((v) => r.columns.includes(v.key)), F = (v = {}) => xl(r, v, h), C = (v) => N.router.get(m, F(v), { preserveState: !0, preserveScroll: !0, replace: !0 });
  _.useEffect(() => {
    if (g === r.search) return;
    const v = window.setTimeout(() => C({ search: g }), 300);
    return () => window.clearTimeout(v);
  }, [g]);
  const D = j ? f?.delete ? [{ action: "restore", label: t("Restore") }, { action: "delete", label: t("Delete for good"), danger: !0 }] : [] : [
    ...f?.publish ? [{ action: "publish", label: t("Publish") }, { action: "unpublish", label: t("Unpublish") }] : [],
    ...f?.delete ? [{ action: "trash", label: t("Move to the trash"), danger: !0 }] : []
  ], O = (v, P, V = !1) => {
    const q = () => N.router.post(`${m}/bulk`, { action: v, ids: b }, { preserveScroll: !0 });
    if (V) {
      const G = b.length === 1 ? t(":action: 1 entry?", { action: P }) : t(":action: :count entries?", { action: P, count: b.length });
      w(
        `${G} ${t(v === "delete" ? "This can't be undone." : "They come off the site; you can restore them.")}`,
        q,
        t(v === "trash" ? "Move to trash" : "Delete")
      );
    } else
      q();
  }, X = async (v) => {
    const P = new Set(r.columns);
    P.has(v) ? P.delete(v) : P.add(v), await B(i.map((V) => V.key).filter((V) => P.has(V))), N.router.reload({ only: ["entries", "query"] });
  }, Q = () => {
    k(""), C({ search: "", status: "", author: "", terms: {} });
  }, R = x && !!f?.update, ie = R && n !== null && n.lastPage <= 1 && n.data.length > 1, ae = j && !!f?.delete, ee = 1 + $.length + (D.length > 0 ? 1 : 0) + (R ? 1 : 0) + (ae ? 1 : 0), ge = pl(F()), oe = [...new Set(u.map((v) => v.group))];
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: s.title }),
    p,
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: s.title,
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          u.length > 0 && /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(a.Button, { variant: "outline", children: [
              /* @__PURE__ */ e.jsx(ua, {}),
              " ",
              t("Go to")
            ] }) }),
            /* @__PURE__ */ e.jsx(a.DropdownMenuContent, { align: "end", className: "cms:min-w-56", children: oe.map((v, P) => /* @__PURE__ */ e.jsxs(_.Fragment, { children: [
              P > 0 && /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
              /* @__PURE__ */ e.jsx(a.DropdownMenuLabel, { children: v }),
              u.filter((V) => V.group === v).map((V) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { asChild: !0, children: V.external ? /* @__PURE__ */ e.jsxs("a", { href: V.href, target: "_blank", rel: "noopener noreferrer", children: [
                V.label,
                " ",
                /* @__PURE__ */ e.jsx(pe, { className: "cms:ml-auto" })
              ] }) : /* @__PURE__ */ e.jsx(N.Link, { href: V.href, children: V.label }) }, V.href))
            ] }, v)) })
          ] }),
          s.listing && !j && /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs(N.Link, { href: L(`cms/collections/${s.handle}/listing/edit`), children: [
            /* @__PURE__ */ e.jsx(ja, {}),
            " ",
            t("Listing page")
          ] }) }),
          n.total > 0 && f?.export && /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: `${m}/export${ge ? `?${ge}` : ""}`, children: [
            /* @__PURE__ */ e.jsx(Vs, {}),
            " ",
            t("Export CSV")
          ] }) }),
          f?.create && !j && /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(N.Link, { href: `${m}/create`, children: [
            /* @__PURE__ */ e.jsx(J, {}),
            " ",
            t("New entry")
          ] }) })
        ] }),
        children: l.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: s.handle, onValueChange: (v) => N.router.get(L(`cms/collections/${v}/entries`)), children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": t("Collection"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: l.map((v) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: v.handle, children: v.title }, v.handle)) })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-xs", children: [
        /* @__PURE__ */ e.jsx(ve, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            className: "cms:pl-9",
            placeholder: t("Search titles, slugs or #id"),
            "aria-label": t("Search entries"),
            value: g,
            onChange: (v) => k(v.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(Ee, { label: t("Status"), value: r.status, options: jl(), onChange: (v) => C({ status: v }) }),
      c.authors.length > 0 && /* @__PURE__ */ e.jsx(Ee, { label: t("Author"), value: r.author, options: c.authors, onChange: (v) => C({ author: v }) }),
      c.taxonomies.filter((v) => v.terms.length > 0).map((v) => /* @__PURE__ */ e.jsx(
        Ee,
        {
          label: v.title,
          value: r.terms[v.handle] ?? "",
          options: v.terms.map((P) => ({ value: P.value, label: `${"— ".repeat(P.depth)}${P.label}` })),
          onChange: (P) => C({ terms: { ...r.terms, [v.handle]: P } })
        },
        v.handle
      )),
      c.locales.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: r.locale, onValueChange: (v) => C({ locale: v }), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-auto cms:min-w-40 cms:max-w-72", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(a.SelectContent, { children: c.locales.map((v) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: v, children: [
          H(v),
          v === h ? ` ${t("(main)")}` : ""
        ] }, v)) })
      ] }),
      M && /* @__PURE__ */ e.jsxs(a.Button, { variant: "ghost", size: "sm", onClick: Q, children: [
        /* @__PURE__ */ e.jsx($e, {}),
        " ",
        t("Clear")
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:ml-auto cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
        b.length > 0 && D.length > 0 && /* @__PURE__ */ e.jsxs("div", { role: "toolbar", "aria-label": t("Selected entries"), className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t(":count selected", { count: b.length }) }),
          D.map((v) => /* @__PURE__ */ e.jsx(a.Button, { size: "sm", variant: v.danger ? "destructive" : "outline", onClick: () => O(v.action, v.label, v.danger), children: v.label }, v.action))
        ] }),
        ie && /* @__PURE__ */ e.jsxs(a.Button, { variant: T ? "secondary" : "outline", "aria-pressed": T, onClick: () => S(!T), children: [
          /* @__PURE__ */ e.jsx(_s, {}),
          " ",
          t(T ? "Done" : "Reorder")
        ] }),
        i.length > 0 && /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
          /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(a.Button, { variant: "outline", children: [
            /* @__PURE__ */ e.jsx(ma, {}),
            " ",
            t("Columns")
          ] }) }),
          /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", className: "cms:max-h-96 cms:overflow-y-auto", children: [
            /* @__PURE__ */ e.jsx(a.DropdownMenuLabel, { children: t("Columns") }),
            i.filter((v) => !v.field).map((v) => /* @__PURE__ */ e.jsx(
              a.DropdownMenuCheckboxItem,
              {
                checked: r.columns.includes(v.key),
                onSelect: (P) => P.preventDefault(),
                onCheckedChange: () => {
                  X(v.key);
                },
                children: v.label
              },
              v.key
            )),
            i.some((v) => v.field) && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
              /* @__PURE__ */ e.jsx(a.DropdownMenuLabel, { children: t("Fields") }),
              i.filter((v) => v.field).map((v) => /* @__PURE__ */ e.jsx(
                a.DropdownMenuCheckboxItem,
                {
                  checked: r.columns.includes(v.key),
                  onSelect: (P) => P.preventDefault(),
                  onCheckedChange: () => {
                    X(v.key);
                  },
                  children: v.label
                },
                v.key
              ))
            ] })
          ] })
        ] })
      ] })
    ] }),
    T && ie ? /* @__PURE__ */ e.jsx(hl, { collection: s.handle, rows: n.data, hierarchical: s.hierarchical === !0 }) : /* @__PURE__ */ e.jsxs(a.Card, { className: "cms:gap-0 cms:overflow-hidden cms:py-0", children: [
      /* @__PURE__ */ e.jsxs(a.Table, { children: [
        /* @__PURE__ */ e.jsx(a.TableHeader, { className: "cms:bg-muted/60", children: /* @__PURE__ */ e.jsxs(a.TableRow, { className: "cms:hover:bg-transparent", children: [
          D.length > 0 && /* @__PURE__ */ e.jsx(a.TableHead, { className: "cms:w-10", children: /* @__PURE__ */ e.jsx(
            a.Checkbox,
            {
              "aria-label": t("Select all on this page"),
              checked: n.data.length > 0 && b.length === n.data.length,
              onCheckedChange: (v) => y(v ? n.data.map((P) => P.id) : [])
            }
          ) }),
          /* @__PURE__ */ e.jsx(js, { label: t("Title"), sortKey: "title", sort: r.sort, onSort: (v) => C({ sort: v }) }),
          $.map((v) => v.sortable ? /* @__PURE__ */ e.jsx(js, { label: v.label, sortKey: v.key, sort: r.sort, onSort: (P) => C({ sort: P }) }, v.key) : /* @__PURE__ */ e.jsx(a.TableHead, { children: v.label }, v.key)),
          R && /* @__PURE__ */ e.jsx(a.TableHead, { className: "cms:w-px", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: t("Order") }) }),
          ae && /* @__PURE__ */ e.jsx(a.TableHead, { className: "cms:w-px", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: t("Restore") }) })
        ] }) }),
        /* @__PURE__ */ e.jsxs(a.TableBody, { children: [
          n.data.length === 0 && /* @__PURE__ */ e.jsx(a.TableRow, { className: "cms:hover:bg-transparent", children: /* @__PURE__ */ e.jsx(a.TableCell, { colSpan: ee, className: "cms:h-32 cms:text-center cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx(Sl, { trashed: j, filtered: fs(j ? { ...r, status: "" } : r) > 0, canCreate: !!f?.create, createUrl: `${m}/create`, onClear: Q }) }) }),
          n.data.map((v, P) => /* @__PURE__ */ e.jsxs(a.TableRow, { className: "sunrice-row-in", style: { "--i": P }, "data-state": b.includes(v.id) ? "selected" : void 0, children: [
            D.length > 0 && /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx(
              a.Checkbox,
              {
                "aria-label": t("Select :title", { title: v.title }),
                checked: b.includes(v.id),
                onCheckedChange: (V) => y(V ? [...b, v.id] : b.filter((q) => q !== v.id))
              }
            ) }),
            /* @__PURE__ */ e.jsxs(a.TableCell, { children: [
              /* @__PURE__ */ e.jsx(
                N.Link,
                {
                  href: L(`cms/collections/${s.handle}/entries/${v.id}/edit${r.locale !== h ? `?locale=${encodeURIComponent(r.locale)}` : ""}`),
                  className: "cms:font-medium cms:underline-offset-4 cms:hover:underline",
                  children: v.title
                }
              ),
              (!r.columns.includes("slug") && v.path || v.parent) && /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: [r.columns.includes("slug") ? null : v.path, v.parent ? t("under :parent", { parent: v.parent }) : null].filter(Boolean).join(" · ") })
            ] }),
            $.map((V) => /* @__PURE__ */ e.jsx(a.TableCell, { className: V.key === "status" ? "" : "cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx("div", { className: "cms:max-w-72 cms:truncate", children: /* @__PURE__ */ e.jsx(yl, { row: v, column: V, mainLocale: h }) }) }, V.key)),
            R && /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:w-px", children: /* @__PURE__ */ e.jsxs("span", { className: "cms:flex", children: [
              /* @__PURE__ */ e.jsx(a.Button, { variant: "ghost", size: "icon", "aria-label": t("Move :title up", { title: v.title }), onClick: () => N.router.post(L(`cms/entries/${v.id}/move`), { direction: "up" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(Bs, {}) }),
              /* @__PURE__ */ e.jsx(a.Button, { variant: "ghost", size: "icon", "aria-label": t("Move :title down", { title: v.title }), onClick: () => N.router.post(L(`cms/entries/${v.id}/move`), { direction: "down" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx($s, {}) })
            ] }) }),
            ae && /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:w-px", children: /* @__PURE__ */ e.jsxs(
              a.Button,
              {
                variant: "outline",
                size: "sm",
                "aria-label": `Restore ${v.title}`,
                onClick: () => N.router.post(L(`cms/entries/${v.id}/restore`), {}, { preserveScroll: !0 }),
                children: [
                  /* @__PURE__ */ e.jsx(fe, {}),
                  " Restore"
                ]
              }
            ) })
          ] }, v.id))
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4 cms:border-t cms:px-6 cms:py-3 cms:text-sm cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-4", children: [
          /* @__PURE__ */ e.jsx("span", { children: n.total === 0 ? t("No entries") : t(":from–:to of :total", { from: n.from, to: n.to, total: n.total }) }),
          /* @__PURE__ */ e.jsxs(a.Select, { value: String(r.perPage), onValueChange: (v) => {
            E(Number(v)), C({ perPage: Number(v) });
          }, children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:h-8 cms:w-auto", "aria-label": t("Entries per page"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(a.SelectContent, { children: d.map((v) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: String(v), children: t(":count per page", { count: v }) }, v)) })
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
              onClick: () => n.prev_page_url && N.router.get(n.prev_page_url, {}, { preserveScroll: !0 }),
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
              onClick: () => n.next_page_url && N.router.get(n.next_page_url, {}, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(be, {})
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
function js({ label: s, sortKey: l, sort: n, onSort: r }) {
  const i = fl(n, l);
  return /* @__PURE__ */ e.jsx(a.TableHead, { "aria-sort": i === "asc" ? "ascending" : i === "desc" ? "descending" : void 0, children: /* @__PURE__ */ e.jsxs(
    "button",
    {
      type: "button",
      onClick: () => r(gl(n, l)),
      className: "cms:-ml-2 cms:inline-flex cms:h-8 cms:items-center cms:gap-1 cms:rounded-md cms:px-2 cms:hover:bg-accent cms:hover:text-accent-foreground",
      children: [
        s,
        i === "asc" ? /* @__PURE__ */ e.jsx(Bs, { className: "cms:size-3" }) : i === "desc" ? /* @__PURE__ */ e.jsx($s, { className: "cms:size-3" }) : /* @__PURE__ */ e.jsx(_s, { className: "cms:size-3 cms:opacity-40" })
      ]
    }
  ) });
}
function yl({ row: s, column: l, mainLocale: n }) {
  switch (l.key) {
    case "slug":
      return /* @__PURE__ */ e.jsx("span", { className: "cms:font-mono", children: s.slug });
    case "status":
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-1", children: [
        s.trashed ? /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", className: "cms:text-destructive", title: t(":status before it was trashed", { status: te(s.status) }), children: t("Trashed") }) : /* @__PURE__ */ e.jsx(a.Badge, { variant: s.status === "published" ? "success" : "secondary", children: te(s.status) }),
        s.locales.length > 1 && s.locales.filter((r) => !r.main).map((r) => {
          const i = Nl(r);
          return /* @__PURE__ */ e.jsxs(
            a.Badge,
            {
              variant: i.variant,
              className: i.className,
              title: t(":language: :status", { language: H(r.code), status: i.title }),
              "aria-label": t(":language: :status", { language: H(r.code), status: i.title }),
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
function Nl(s) {
  return s.status === null ? { variant: "outline", className: "cms:border-dashed cms:text-muted-foreground", word: t("missing"), title: t("not translated") } : s.outdated ? { variant: "warning", className: "", word: t("outdated"), title: t(":status, outdated: the main language changed since", { status: te(s.status) }) } : s.status === "published" ? { variant: "secondary", className: "", word: null, title: t("Published") } : { variant: "outline", className: "", word: s.status === "scheduled" ? t("scheduled") : t("draft"), title: te(s.status) };
}
function Sl({ trashed: s, filtered: l, canCreate: n, createUrl: r, onClear: i }) {
  return l ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: t("Nothing matches these filters.") }),
    /* @__PURE__ */ e.jsxs(a.Button, { variant: "outline", size: "sm", onClick: i, children: [
      /* @__PURE__ */ e.jsx($e, {}),
      " ",
      t("Clear filters")
    ] })
  ] }) : s ? /* @__PURE__ */ e.jsx(e.Fragment, { children: t("The trash is empty.") }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: t("No entries yet.") }),
    n && /* @__PURE__ */ e.jsx(a.Button, { size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs(N.Link, { href: r, children: [
      /* @__PURE__ */ e.jsx(J, {}),
      " ",
      t("Write the first one")
    ] }) })
  ] });
}
function ts({ message: s, processing: l, onSaveMine: n }) {
  const [r, i] = re();
  return s ? /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: [
    i,
    /* @__PURE__ */ e.jsx("span", { children: s }),
    /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => N.router.reload(), children: t("Load theirs") }),
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
function kl(s) {
  return /* @__PURE__ */ e.jsx(Cl, { ...s }, `${s.locale}:${s.version}:${JSON.stringify([s.values, s.seo])}`);
}
function Cl({ collection: s, fields: l, locale: n, locales: r, shared: i, values: c, seo: u, version: x, can: d }) {
  const o = L(`cms/collections/${s.handle}/listing`), f = L(`cms/collections/${s.handle}/entries`);
  a.useBreadcrumbs([{ label: s.title, href: f }, { label: t("Listing page") }]);
  const m = N.useForm({ locale: n, data: c, seo: u ?? {}, version: x }), h = m.errors, g = (S) => {
    const w = _e(h, S);
    w.length > 0 && m.clearErrors(...w);
  }, k = r[0], b = d.update, y = () => m.processing || m.put(o, { preserveScroll: !0 }), T = () => {
    m.transform((S) => ({ ...S, version: null })), m.put(o, { preserveScroll: !0 });
  };
  return a.useUnsavedChanges(m.isDirty, b ? y : void 0), /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (S) => {
    S.preventDefault(), y();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: t(":title: listing page", { title: s.title }) }),
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: t(":title: listing page", { title: s.title }),
        back: { href: f, label: t("Back to :title", { title: s.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          r.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: n, onValueChange: (S) => N.router.get(o, { locale: S }), children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(a.SelectContent, { children: r.map((S, w) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: S, children: [
              H(S),
              w === 0 ? ` ${t("(main)")}` : ""
            ] }, S)) })
          ] }),
          s.url && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: s.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(pe, {}),
            " ",
            t("View")
          ] }) }),
          b && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: m.processing, children: [
            m.processing && /* @__PURE__ */ e.jsx(ue, { className: "cms:animate-spin" }),
            " ",
            t("Save")
          ] })
        ] }),
        children: m.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
      }
    ),
    /* @__PURE__ */ e.jsxs("fieldset", { disabled: !b, className: "cms:flex cms:flex-col cms:gap-6", children: [
      /* @__PURE__ */ e.jsx(ts, { message: h.version, processing: m.processing, onSaveMine: T }),
      l.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("The listing page has no fields of its own: choose a listing blueprint for the collection under Structure → Collections.") }) : /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: [
        (i.length > 0 || Ce(l)) && /* @__PURE__ */ e.jsx("p", { role: "note", className: "cms:rounded-lg cms:border cms:border-dashed cms:px-3 cms:py-2 cms:text-sm cms:text-muted-foreground", children: k ? t("Shared by all languages: the greyed-out fields are edited in :language.", { language: H(k) }) : t("Shared by all languages: the greyed-out fields are edited in the main language.") }),
        l.filter((S) => Ze(S, { ...c, ...m.data.data })).map((S) => i.includes(S.handle) ? /* @__PURE__ */ e.jsx("fieldset", { disabled: !0, className: Ht, title: t("Shared by all languages"), children: /* @__PURE__ */ e.jsx(ce, { id: `data-${S.handle}`, field: S, content: !0, value: c[S.handle], errors: {}, onChange: () => {
        } }) }, S.handle) : /* @__PURE__ */ e.jsx(
          ce,
          {
            id: `data-${S.handle}`,
            field: S,
            content: !0,
            value: m.data.data[S.handle],
            errors: Z(h, `data.${S.handle}`),
            onChange: (w) => {
              m.setData("data", { ...m.data.data, [S.handle]: w }), g(`data.${S.handle}`);
            }
          },
          S.handle
        ))
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: t("SEO"), description: t("How the listing page appears in search results and shared links."), titleClassName: "cms:text-base", storageKey: "cms:listing:seo", hasErrors: ye(h, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !b, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(he, { bare: !0, id: "seo", fields: es(), value: m.data.seo, errors: Z(h, "seo"), onChange: (S) => {
      m.setData("seo", S), g("seo");
    } }) }) })
  ] });
}
function wl({ fieldsets: s }) {
  const l = N.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(A, { message: l.fieldset }),
    /* @__PURE__ */ e.jsx(
      Et,
      {
        kind: "fieldset",
        base: L("cms/fieldsets"),
        rows: s,
        intro: t("Fields shared between blueprints, and the kinds of block of flexible fields.")
      }
    )
  ] });
}
function $l(s) {
  return /* @__PURE__ */ e.jsx(Dl, { ...s }, `${s.locale}:${s.version}:${JSON.stringify(s.values)}`);
}
function Dl({ set: s, fields: l, locale: n, locales: r, shared: i, values: c, version: u, can: x, settings: d }) {
  const o = L(`cms/globals/${s.handle}/values`);
  a.useBreadcrumbs([{ label: t("Globals"), href: L("cms/globals") }, { label: s.title }]);
  const f = N.useForm({ locale: n, data: c, version: u }), m = f.errors, h = (w) => {
    const p = _e(m, w);
    p.length > 0 && f.clearErrors(...p);
  }, g = r[0], k = a.useEditLock({
    type: "cms.global",
    id: s.id,
    locale: n,
    enabled: x.update,
    noun: t("global set"),
    leaveTo: L("cms/globals"),
    getUnsaved: () => f.isDirty ? { data: f.data.data } : null
  }), b = x.update && !k.readOnly, y = () => f.processing || f.put(o, { preserveScroll: !0 }), T = () => {
    f.transform((w) => ({ ...w, version: null })), f.put(o, { preserveScroll: !0 });
  }, S = async (w) => {
    const p = await k.loadKept(w);
    p.data && typeof p.data == "object" && f.setData("data", p.data);
  };
  return a.useUnsavedChanges(f.isDirty && !k.takenOver, b ? y : void 0), /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (w) => {
    w.preventDefault(), y();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: s.title }),
    k.dialogs,
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: s.title,
        back: { href: L("cms/globals"), label: t("Back to globals") },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          d && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(N.Link, { href: d, children: [
            /* @__PURE__ */ e.jsx(Je, {}),
            " ",
            t("Settings")
          ] }) }),
          r.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: n, onValueChange: (w) => N.router.get(o, { locale: w }), children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(a.SelectContent, { children: r.map((w, p) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: w, children: [
              H(w),
              p === 0 ? ` ${t("(main)")}` : ""
            ] }, w)) })
          ] }),
          b && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: f.processing, children: [
            f.processing && /* @__PURE__ */ e.jsx(ue, { className: "cms:animate-spin" }),
            " ",
            t("Save")
          ] })
        ] }),
        children: f.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
      }
    ),
    l.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("This global set has no fields: choose a blueprint for it in its Settings.") }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(a.ViewingNotice, { by: k.viewingBy, onTakeOver: k.requestTakeOver }),
      g && n !== g && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:bg-muted/40 cms:p-3 cms:text-sm cms:text-muted-foreground", role: "note", children: u === null ? t("Not saved in :language yet: these are the :main values, which the site shows meanwhile. Translate them, then save.", { language: H(n), main: H(g) }) : t("A field left empty shows the :main value on the site.", { main: H(g) }) }),
      /* @__PURE__ */ e.jsx(ts, { message: m.version, processing: f.processing, onSaveMine: T }),
      /* @__PURE__ */ e.jsx(a.KeptEditsNotice, { kept: k.kept, disabled: !b, onLoad: (w) => {
        S(w);
      }, onDiscard: (w) => {
        k.discardKept(w);
      } }),
      /* @__PURE__ */ e.jsx(
        Xe,
        {
          disabled: !b,
          fields: l,
          values: f.data.data,
          errors: m,
          storageKey: `cms:global:${s.handle}`,
          shared: i,
          sharedValues: c,
          sharedNote: g ? t("Shared by all languages: the greyed-out fields are edited in :language.", { language: H(g) }) : t("Shared by all languages: the greyed-out fields are edited in the main language."),
          onChange: (w, p) => {
            f.setData("data", { ...f.data.data, [w]: p }), h(`data.${w}`);
          }
        }
      )
    ] })
  ] });
}
let Rt = 0;
function Vt(s, l = 0) {
  return s.flatMap(({ children: n, ...r }) => [{ ...r, key: `m${++Rt}`, depth: l }, ...Vt(n ?? [], l + 1)]);
}
function _l(s) {
  const l = [], n = [{ depth: -1, children: l }];
  for (const { key: r, depth: i, ...c } of s) {
    for (; n.length > 1 && n[n.length - 1].depth >= i; ) n.pop();
    const u = { ...c, children: [] };
    n[n.length - 1].children.push(u), n.push({ depth: i, children: u.children });
  }
  return l;
}
function je(s, l) {
  const n = s[l]?.depth ?? 0;
  let r = l + 1;
  for (; r < s.length && s[r].depth > n; ) r++;
  return r;
}
function Ut(s, l, n) {
  const r = je(s, l);
  return s.map((i, c) => c >= l && c < r ? { ...i, depth: i.depth + n } : i);
}
function Tl(s, l, n) {
  const r = s[l], i = s[l - 1];
  return !r || !i || r.depth > i.depth || Math.max(...s.slice(l, je(s, l)).map((u) => u.depth)) + 1 > n - 1 ? s : Ut(s, l, 1);
}
function Bl(s, l) {
  const n = s[l];
  if (!n || n.depth === 0) return s;
  let r = l - 1;
  for (; r > 0 && s[r].depth >= n.depth; ) r--;
  const i = je(s, l), c = je(s, r), u = Ut(s, l, -1).slice(l, i);
  return [...s.slice(0, l), ...s.slice(i, c), ...u, ...s.slice(c)];
}
function Ml(s, l) {
  return [...s.slice(0, l), ...s.slice(je(s, l))];
}
function Se(s) {
  return { key: `m${++Rt}`, depth: 0, entry_id: null, term_id: null, collection_id: null, target: null, url: null, labels: {}, new_tab: !1, query: null, ...s };
}
function zl({ menu: s, items: l, locales: n, limits: r, terms: i, listings: c, can: u, settings: x }) {
  const d = L(`cms/menus/${s.handle}/links`);
  a.useBreadcrumbs([{ label: t("Menus"), href: L("cms/menus") }, { label: s.title }]);
  const [o, f] = _.useState(() => Vt(l)), [m, h] = _.useState(null), g = N.useForm({ items: l }), k = g.errors, [b, y] = _.useState(!1), T = n[0] ?? "en", S = (j) => {
    f(j), y(!0);
  }, w = (j, M) => S(o.map(($, F) => F === j ? { ...$, ...M } : $)), p = () => {
    g.processing || (g.transform(() => ({ items: _l(o).map(qt) })), g.put(d, { preserveScroll: !0, onSuccess: () => y(!1) }));
  }, B = (j) => {
    j.preventDefault(), p();
  };
  a.useUnsavedChanges(b, u.update ? p : void 0);
  const E = (j) => /* @__PURE__ */ e.jsx(
    a.SortableList,
    {
      items: ne(o, j),
      getId: (M) => o[M].key,
      getLabel: (M) => o[M].labels[T] || o[M].target?.title || o[M].url || "link",
      disabled: !u.update,
      onReorder: (M) => S(ss(o, j, M)),
      className: j < 0 ? "cms:gap-1" : "cms:mt-1 cms:gap-1 cms:pl-6",
      children: (M, { handle: $, isOverlay: F }) => {
        const C = o[M];
        return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${F ? "" : "cms:border-border/70"}`, children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2 cms:p-2", children: [
            u.update && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:h-10 cms:shrink-0 cms:items-center", children: /* @__PURE__ */ e.jsx(a.SortableHandle, { ...$, label: t("Move :title", { title: C.labels[T] || C.target?.title || C.url || t("link") }) }) }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
                /* @__PURE__ */ e.jsx(
                  a.Input,
                  {
                    "aria-label": t("Label (:language)", { language: H(T) }),
                    className: "cms:w-full cms:sm:max-w-xs",
                    disabled: !u.update,
                    placeholder: C.target?.title ?? t("Label"),
                    value: C.labels[T] ?? "",
                    onChange: (D) => w(M, { labels: { ...C.labels, [T]: D.target.value } })
                  }
                ),
                /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-32 cms:flex-1 cms:truncate cms:text-sm cms:text-muted-foreground", children: C.url !== null ? C.url : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  C.target ? `${C.target.kind}: ${C.target.title}` : t("Gone"),
                  " ",
                  (!C.target || !C.target.live) && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", children: t("Not on the site") })
                ] }) }),
                u.update && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center", children: [
                  /* @__PURE__ */ e.jsxs("label", { className: "cms:mr-2 cms:flex cms:items-center cms:gap-1.5 cms:text-sm", children: [
                    /* @__PURE__ */ e.jsx(a.Checkbox, { checked: C.new_tab, onCheckedChange: (D) => w(M, { new_tab: D }) }),
                    " ",
                    t("New tab")
                  ] }),
                  /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": t("Out a level"), disabled: C.depth === 0, onClick: () => S(Bl(o, M)), children: /* @__PURE__ */ e.jsx(va, {}) }),
                  /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": t("In a level"), onClick: () => S(Tl(o, M, r.depth)), children: /* @__PURE__ */ e.jsx(ya, {}) }),
                  /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": t("Remove, with what's under it"), onClick: () => S(Ml(o, M)), children: /* @__PURE__ */ e.jsx(W, {}) })
                ] })
              ] }),
              C.collection_id !== null && /* @__PURE__ */ e.jsx(
                a.Input,
                {
                  "aria-label": t("Filters"),
                  className: "cms:w-full cms:sm:max-w-md cms:font-mono",
                  disabled: !u.update,
                  placeholder: t("Filters (optional): :example", { example: "listing_type=for-sale" }),
                  value: C.query ?? "",
                  onChange: (D) => w(M, { query: D.target.value })
                }
              ),
              n.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: n.slice(1).map((D) => /* @__PURE__ */ e.jsx(
                a.Input,
                {
                  "aria-label": t("Label (:language)", { language: H(D) }),
                  className: "cms:w-full cms:sm:max-w-xs",
                  disabled: !u.update,
                  placeholder: t(":language: as :main", { language: H(D), main: H(T) }),
                  value: C.labels[D] ?? "",
                  onChange: (O) => w(M, { labels: { ...C.labels, [D]: O.target.value } })
                },
                D
              )) })
            ] })
          ] }),
          !F && ne(o, M).length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:px-2 cms:pb-2", children: E(M) })
        ] });
      }
    }
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: B, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: s.title }),
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: s.title,
        back: { href: L("cms/menus"), label: t("Back to menus") },
        actions: u.update && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          x && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(N.Link, { href: x, children: [
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
            /* @__PURE__ */ e.jsx(Ca, {}),
            " ",
            t("Term")
          ] }),
          c.length > 0 && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", disabled: o.length >= r.items, onClick: () => h("listing"), children: [
            /* @__PURE__ */ e.jsx(Na, {}),
            " ",
            t("Listing")
          ] }),
          /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", disabled: o.length >= r.items, onClick: () => h("url"), children: [
            /* @__PURE__ */ e.jsx(ba, {}),
            " ",
            t("Link")
          ] }),
          /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: g.processing, children: [
            g.processing && /* @__PURE__ */ e.jsx(ue, { className: "cms:animate-spin" }),
            " ",
            t("Save")
          ] })
        ] }),
        children: b && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
      }
    ),
    /* @__PURE__ */ e.jsx(A, { message: k.items }),
    Object.keys(k).some((j) => j.startsWith("items.")) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: t("Some links need fixing: :error", { error: Object.values(k).filter(Boolean)[0] }) }),
    /* @__PURE__ */ e.jsx(a.Card, { className: "cms:p-2", children: o.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:p-4 cms:text-center cms:text-muted-foreground", children: t("No links yet. Add an entry or a link.") }) : E(-1) }),
    /* @__PURE__ */ e.jsx(El, { kind: m, terms: i, listings: c, onClose: () => h(null), onAdd: (j) => {
      S([...o, j]), h(null);
    }, main: T })
  ] });
}
function qt({ target: s, children: l, ...n }) {
  return { ...n, children: l.map(qt) };
}
const Ll = () => t("A menu links to entries that already exist: create the page first (Content → Entries), then add it here, or add a web address instead."), Il = () => ({ entry: t("Link to an entry"), term: t("Link to a term's page"), listing: t("Link to a listing page"), url: t("Link to an address") }), Al = () => ({
  entry: t("It follows the entry: its title (unless you give a label) and its address in each language. It shows only while the entry is on the site."),
  term: t("The page listing the term's entries, in each language. Its title is the label unless you give one."),
  listing: t("The collection's listing page, in each language, optionally with filters. The collection's title is the label unless you give one."),
  url: t("A web address, a path on this site (/contact), mailto: or tel:.")
});
function El({ kind: s, terms: l, listings: n, onClose: r, onAdd: i, main: c }) {
  const [u, x] = _.useState(null), [d, o] = _.useState(""), [f, m] = _.useState(""), [h, g] = _.useState(""), [k, b] = _.useState("");
  _.useEffect(() => {
    x(null), o(""), m(""), g(""), b("");
  }, [s]);
  const y = f.trim() === "" || Ma(f.trim()), T = h.trim() ? { [c]: h.trim() } : {}, S = async () => {
    if (s === "entry" && u !== null) {
      const p = await fetch(`${L("cms/entries/picker")}?${Nt({ ids: [u], collections: [] })}`, { headers: { Accept: "application/json" }, credentials: "same-origin" }), B = p.ok ? (await p.json()).items[0] : void 0;
      i(Se({ entry_id: u, target: B ? { title: B.title, kind: B.collection, live: B.status === "published" } : null, labels: T }));
    } else if (s === "term" && d !== "") {
      const p = l.find((B) => String(B.id) === d);
      i(Se({ term_id: Number(d), target: p ? { title: p.title, kind: p.taxonomy, live: !0 } : null, labels: T }));
    } else if (s === "listing" && d !== "") {
      const p = n.find((B) => String(B.id) === d);
      i(Se({ collection_id: Number(d), target: p ? { title: p.title, kind: t("Listing page"), live: !0 } : null, labels: T, query: k.trim().replace(/^\?/, "") || null }));
    } else s === "url" && f.trim() !== "" && y && h.trim() !== "" && i(Se({ url: f.trim(), labels: T }));
  }, w = s === "entry" ? u !== null : s === "url" ? f.trim() !== "" && y && h.trim() !== "" : d !== "";
  return /* @__PURE__ */ e.jsx(a.Dialog, { open: s !== null, onOpenChange: (p) => !p && r(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: s ? Il()[s] : "" }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: s ? Al()[s] : "" })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
      s === "entry" && /* @__PURE__ */ e.jsx(
        De,
        {
          id: "menu-entry",
          value: u,
          multiple: !1,
          max: null,
          collections: [],
          invalid: !1,
          emptyHint: Ll(),
          onChange: (p) => x(typeof p == "number" ? p : null)
        }
      ),
      (s === "term" || s === "listing") && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "menu-target", children: t(s === "term" ? "Term" : "Collection") }),
        /* @__PURE__ */ e.jsxs(a.Select, { value: d, onValueChange: o, children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: "menu-target", children: /* @__PURE__ */ e.jsx(a.SelectValue, { placeholder: t("Choose…") }) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: s === "term" ? l.map((p) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: String(p.id), children: [
            p.taxonomy,
            ": ",
            p.title
          ] }, p.id)) : n.map((p) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: String(p.id), children: p.title }, p.id)) })
        ] })
      ] }),
      s === "listing" && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "menu-query", children: t("Filters (optional)") }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: "menu-query",
            className: "cms:font-mono",
            value: k,
            placeholder: "listing_type=for-sale",
            onChange: (p) => b(p.target.value)
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
            value: f,
            placeholder: t("https://… or /contact"),
            "aria-invalid": !y,
            onChange: (p) => m(p.target.value)
          }
        ),
        !y && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t("This address could run code; use https://, a path, mailto: or tel:.") })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "menu-label", children: t(s === "url" ? "Label" : "Label (optional)") }),
        /* @__PURE__ */ e.jsx(a.Input, { id: "menu-label", value: h, onChange: (p) => g(p.target.value) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: r, children: t("Cancel") }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", onClick: () => {
        S();
      }, disabled: !w, children: t("Add") })
    ] })
  ] }) });
}
const Fl = () => [
  { value: "all", label: t("All") },
  { value: "pending", label: t("Pending") },
  { value: "approved", label: t("Approved") },
  { value: "spam", label: t("Spam") },
  { value: "trashed", label: t("Trash") }
], Hl = (s) => ({ pending: t("Pending"), approved: t("Approved"), spam: t("Spam") })[s];
function Pl({ tab: s, counts: l, filters: n, collections: r, comments: i, can: c, errors: u = {} }) {
  a.useBreadcrumbs([{ label: t("Comments"), href: L("cms/comments") }]);
  const [x, d] = _.useState(n.search), [o, f] = _.useState([]), [m, h] = _.useState(null), [g, k] = re(), b = (p) => {
    const B = { status: s, search: n.search, collection: n.collection, ...p };
    N.router.get(L("cms/comments"), {
      ...B.status !== "all" ? { status: B.status } : {},
      ...B.search ? { search: B.search } : {},
      ...B.collection ? { collection: B.collection } : {},
      ...n.entry ? { entry: n.entry } : {}
    }, { preserveState: !0, replace: !0, onSuccess: () => f([]) });
  };
  _.useEffect(() => {
    if (x === n.search) return;
    const p = window.setTimeout(() => b({ search: x }), 300);
    return () => window.clearTimeout(p);
  }, [x]);
  const y = (p, B = {}) => N.router.post(L(p), B, { preserveScroll: !0, onSuccess: () => f([]) }), T = (p, B) => y(`cms/comments/${p.id}/status`, { status: B }), S = (p) => {
    const B = () => y("cms/comments/bulk", { action: p, ids: o });
    p === "delete" ? g(o.length === 1 ? t("Delete 1 comment for good? This can't be undone.") : t("Delete :count comments for good? This can't be undone.", { count: o.length }), B) : B();
  }, w = i.data.length > 0 && o.length === i.data.length;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: t("Comments") }),
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: t("Comments"),
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:sm:w-64", children: [
            /* @__PURE__ */ e.jsx(ve, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                type: "search",
                placeholder: t("Search text, name or email"),
                "aria-label": t("Search comments"),
                className: "cms:pl-9",
                value: x,
                onChange: (p) => d(p.target.value)
              }
            )
          ] }),
          r.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: n.collection ?? "all", onValueChange: (p) => b({ collection: p === "all" ? null : p }), children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": t("Collection"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(a.SelectItem, { value: "all", children: t("Every collection") }),
              r.map((p) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: p.handle, children: p.title }, p.handle))
            ] })
          ] })
        ] })
      }
    ),
    n.entry !== null && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      t("Comments on one entry."),
      " ",
      /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:underline cms:underline-offset-4", onClick: () => N.router.get(L("cms/comments")), children: t("Show all") })
    ] }),
    /* @__PURE__ */ e.jsx(a.Tabs, { value: s, onValueChange: (p) => b({ status: p }), children: /* @__PURE__ */ e.jsx(a.TabsList, { className: "cms:h-auto cms:flex-wrap cms:justify-start", children: Fl().map((p) => /* @__PURE__ */ e.jsxs(a.TabsTrigger, { value: p.value, children: [
      p.label,
      " ",
      /* @__PURE__ */ e.jsx("span", { className: "cms:ml-1 cms:text-muted-foreground", children: l[p.value] })
    ] }, p.value)) }) }),
    o.length > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2 cms:text-sm", role: "toolbar", "aria-label": t("With the selected comments"), children: [
      /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", children: t(":count selected", { count: o.length }) }),
      c.moderate && s !== "trashed" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "outline", onClick: () => S("approve"), children: [
          /* @__PURE__ */ e.jsx(ke, {}),
          " ",
          t("Approve")
        ] }),
        /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "outline", onClick: () => S("unapprove"), children: [
          /* @__PURE__ */ e.jsx(qe, {}),
          " ",
          t("Unapprove")
        ] }),
        /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "outline", onClick: () => S("spam"), children: [
          /* @__PURE__ */ e.jsx(Ue, {}),
          " ",
          t("Spam")
        ] })
      ] }),
      c.delete && s !== "trashed" && /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "outline", onClick: () => S("trash"), children: [
        /* @__PURE__ */ e.jsx(W, {}),
        " ",
        t("Trash")
      ] }),
      c.delete && s === "trashed" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "outline", onClick: () => S("restore"), children: [
          /* @__PURE__ */ e.jsx(fe, {}),
          " ",
          t("Restore")
        ] }),
        /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "destructive", onClick: () => S("delete"), children: [
          /* @__PURE__ */ e.jsx(W, {}),
          " ",
          t("Delete for good")
        ] })
      ] })
    ] }),
    i.data.length === 0 ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:rounded-xl cms:border cms:border-dashed cms:px-6 cms:py-16 cms:text-center", children: [
      /* @__PURE__ */ e.jsx("span", { className: "cms:grid cms:size-10 cms:place-items-center cms:rounded-full cms:bg-muted cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx(Sa, { className: "cms:size-4" }) }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: n.search ? t("No comments match.") : t("No comments here.") })
    ] }) : /* @__PURE__ */ e.jsxs(a.Card, { className: "cms:divide-y cms:p-0", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3 cms:px-4 cms:py-2 cms:text-sm cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsx(a.Checkbox, { checked: w, "aria-label": t("Select all"), onCheckedChange: (p) => f(p ? i.data.map((B) => B.id) : []) }),
        /* @__PURE__ */ e.jsx("span", { children: t(":from–:to of :total", { from: i.from, to: i.to, total: i.total }) })
      ] }),
      i.data.map((p) => /* @__PURE__ */ e.jsxs("article", { className: "cms:flex cms:gap-3 cms:px-4 cms:py-4", "aria-labelledby": `comment-${p.id}-author`, children: [
        /* @__PURE__ */ e.jsx(
          a.Checkbox,
          {
            checked: o.includes(p.id),
            "aria-label": t("Select :author's comment", { author: p.author }),
            onCheckedChange: (B) => f(B ? [...o, p.id] : o.filter((E) => E !== p.id))
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-x-3 cms:gap-y-1 cms:text-sm", children: [
            /* @__PURE__ */ e.jsx("span", { id: `comment-${p.id}-author`, className: "cms:font-medium", children: p.author }),
            p.email && /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", children: p.email }),
            p.member && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", children: t("Signed in") }),
            !p.trashed && /* @__PURE__ */ e.jsx(a.Badge, { variant: p.status === "approved" ? "success" : p.status === "spam" ? "destructive" : "warning", children: Hl(p.status) }),
            /* @__PURE__ */ e.jsxs("span", { className: "cms:text-muted-foreground", children: [
              p.createdAt ? K(p.createdAt) : "",
              " · ",
              p.locale.toUpperCase()
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
            t("On"),
            " ",
            p.entry.url ? /* @__PURE__ */ e.jsxs("a", { href: p.entry.url, target: "_blank", rel: "noreferrer", className: "cms:underline-offset-4 hover:cms:underline", children: [
              p.entry.title,
              " ",
              /* @__PURE__ */ e.jsx(pe, { className: "cms:inline cms:size-3" })
            ] }) : p.entry.title,
            p.parent && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              " · ",
              t("replying to :author: “:excerpt”", { author: p.parent.author, excerpt: p.parent.excerpt })
            ] })
          ] }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:whitespace-pre-wrap cms:break-words", children: p.body }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-1", children: [
            c.moderate && !p.trashed && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              p.status !== "approved" && /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => T(p, "approved"), children: [
                /* @__PURE__ */ e.jsx(ke, {}),
                " ",
                t("Approve")
              ] }),
              p.status === "approved" && /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => T(p, "pending"), children: [
                /* @__PURE__ */ e.jsx(qe, {}),
                " ",
                t("Unapprove")
              ] }),
              p.status !== "spam" && /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => T(p, "spam"), children: [
                /* @__PURE__ */ e.jsx(Ue, {}),
                " ",
                t("Spam")
              ] }),
              p.status !== "spam" && /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => h({ row: p, mode: "reply" }), children: [
                /* @__PURE__ */ e.jsx(nt, {}),
                " ",
                t("Reply")
              ] }),
              /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => h({ row: p, mode: "edit" }), children: [
                /* @__PURE__ */ e.jsx(it, {}),
                " ",
                t("Edit")
              ] })
            ] }),
            c.delete && !p.trashed && /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => N.router.delete(L(`cms/comments/${p.id}`), { preserveScroll: !0 }), children: [
              /* @__PURE__ */ e.jsx(W, {}),
              " ",
              t("Trash")
            ] }),
            c.delete && p.trashed && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => y(`cms/comments/${p.id}/restore`), children: [
                /* @__PURE__ */ e.jsx(fe, {}),
                " ",
                t("Restore")
              ] }),
              /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => g(
                t("Delete this comment for good? Replies to it stay."),
                () => N.router.delete(L(`cms/comments/${p.id}/force`), { preserveScroll: !0 })
              ), children: [
                /* @__PURE__ */ e.jsx(W, {}),
                " ",
                t("Delete for good")
              ] })
            ] })
          ] })
        ] })
      ] }, p.id))
    ] }),
    (i.prev_page_url || i.next_page_url) && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:justify-end cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(a.Button, { variant: "outline", size: "sm", disabled: !i.prev_page_url, onClick: () => i.prev_page_url && N.router.get(i.prev_page_url), children: [
        /* @__PURE__ */ e.jsx(Ye, {}),
        " ",
        t("Newer")
      ] }),
      /* @__PURE__ */ e.jsxs(a.Button, { variant: "outline", size: "sm", disabled: !i.next_page_url, onClick: () => i.next_page_url && N.router.get(i.next_page_url), children: [
        t("Older"),
        " ",
        /* @__PURE__ */ e.jsx(be, {})
      ] })
    ] }),
    m && /* @__PURE__ */ e.jsx(Ol, { row: m.row, mode: m.mode, error: u.body, onClose: () => h(null) }, `${m.mode}-${m.row.id}`),
    k
  ] });
}
function Ol({ row: s, mode: l, error: n, onClose: r }) {
  const [i, c] = _.useState(l === "edit" ? s.body : ""), [u, x] = _.useState(!1), d = () => {
    x(!0);
    const o = { preserveScroll: !0, onSuccess: r, onFinish: () => x(!1) };
    l === "reply" ? N.router.post(L(`cms/comments/${s.id}/reply`), { body: i }, o) : N.router.put(L(`cms/comments/${s.id}`), { body: i }, o);
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
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", disabled: i.trim() === "" || u, onClick: d, children: t(l === "reply" ? "Post reply" : "Save") })
    ] })
  ] }) });
}
const Rl = () => [
  { role: "title", label: t("Meta title"), automatic: t("Automatic (the title)") },
  { role: "description", label: t("Meta description"), automatic: t("Automatic (nothing)") },
  { role: "image", label: t("Share image"), automatic: t("Automatic (nothing)") }
], Fe = "__auto";
function Vl({ site: s, siteName: l, collections: n, taxonomies: r }) {
  a.useBreadcrumbs([{ label: t("Settings"), href: L("settings") }, { label: t("SEO") }]);
  const i = [...n ?? [], ...r ?? []], c = N.useForm({
    site: { ...s },
    mappings: i.map((m) => ({ kind: m.kind, id: m.id, title: m.chosen.title ?? "", description: m.chosen.description ?? "", image: m.chosen.image ?? "" }))
  }), u = c.errors, x = () => c.put(L("cms/seo"), { preserveScroll: !0, onSuccess: () => c.setDefaults() });
  a.useUnsavedChanges(c.isDirty, x);
  const d = (m, h) => c.setData("site", { ...c.data.site, [m]: h }), o = (m, h, g) => c.setData("mappings", c.data.mappings.map((k, b) => b === m ? { ...k, [h]: g } : k)), f = (m, h, g, k, b) => /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: h, description: g, titleClassName: "cms:text-base", storageKey: `cms:seo:${m}`, contentClassName: "cms:flex cms:flex-col cms:divide-y cms:divide-border/60", children: [
    k.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("None yet.") }),
    k.map((y, T) => {
      const S = b + T;
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3 cms:py-4 cms:first:pt-0 cms:last:pb-0", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:justify-between cms:gap-3", children: [
          /* @__PURE__ */ e.jsx("h3", { className: "cms:font-medium", children: y.title }),
          /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: y.blueprint ? t("Blueprint: :name", { name: y.blueprint }) : t("No blueprint") })
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-3 cms:sm:grid-cols-3", children: Rl().map(({ role: w, label: p, automatic: B }) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-1.5", children: [
          /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `seo-${S}-${w}`, className: "cms:text-xs", children: p }),
          /* @__PURE__ */ e.jsxs(a.Select, { value: c.data.mappings[S]?.[w] || Fe, onValueChange: (E) => o(S, w, E === Fe ? "" : E), children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: `seo-${S}-${w}`, className: "cms:w-full", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(a.SelectItem, { value: Fe, children: B }),
              y.options[w].map((E) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: E.value, children: E.label }, E.value))
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(A, { message: u[`mappings.${S}.${w}`] })
        ] }, w)) })
      ] }, `${y.kind}-${y.id}`);
    })
  ] });
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (m) => {
    m.preventDefault(), x();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: t("SEO") }),
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
        /* @__PURE__ */ e.jsx(a.Switch, { id: "seo-noindex", checked: c.data.site.noindex, onCheckedChange: (m) => d("noindex", m) }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-0.5", children: [
          /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "seo-noindex", children: t("Hide the whole site from search engines") }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t("Every page asks not to be indexed and the sitemap is empty. For a site still being built, or staging.") })
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-start cms:justify-between cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-3", children: [
          /* @__PURE__ */ e.jsx(a.Switch, { id: "seo-append", checked: c.data.site.appendName, onCheckedChange: (m) => d("appendName", m) }),
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
              onChange: (m) => d("separator", m.target.value)
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
            onChange: (m) => d("twitter", m.target.value)
          }
        ),
        /* @__PURE__ */ e.jsx(A, { message: u["site.twitter"] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "seo-image", children: t("Default share image") }),
        /* @__PURE__ */ e.jsx(
          a.MediaPickerInput,
          {
            id: "seo-image",
            invalid: u["site.image"] !== void 0,
            disabled: !1,
            multiple: !1,
            max: null,
            types: ["image"],
            value: c.data.site.image,
            onChange: (m) => d("image", typeof m == "number" ? m : null)
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t("Shown when a page is shared and has no image of its own.") }),
        /* @__PURE__ */ e.jsx(A, { message: u["site.image"] })
      ] })
    ] }),
    i.length > 0 && /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx("h2", { className: "cms:text-base cms:font-medium", children: t("Fields used for SEO") }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("When an entry or term leaves its meta title, description or share image empty, the site uses one of its fields instead. A page's own SEO fields always win; after the field come the site's (the description in Settings → Site, the share image above).") })
    ] }),
    n !== null && f("Collections", t("Collections"), t("Entries of each collection."), n, 0),
    r !== null && f("Taxonomies", t("Taxonomies"), t("Term pages of each taxonomy."), r, n?.length ?? 0),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t("Meta title: a text field. Meta description: a text or textarea field, cut to 300 characters. Share image: the first image of a media field.") })
  ] });
}
const Ul = 3;
function ql({ form: s, forms: l, submissions: n, can: r, createForm: i = null }) {
  a.useBreadcrumbs([{ label: t("Submissions"), href: L("cms/submissions") }, ...s ? [{ label: s.title }] : []]);
  const [c, u] = _.useState(null), [x, d] = re();
  if (!s || !n)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(N.Head, { title: t("Submissions") }),
      /* @__PURE__ */ e.jsx(a.PageHeader, { title: t("Submissions"), description: t("What visitors send through the site's forms.") }),
      /* @__PURE__ */ e.jsxs(a.Card, { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:px-6 cms:py-14 cms:text-center", children: [
        /* @__PURE__ */ e.jsx(fa, { className: "cms:size-8 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
          /* @__PURE__ */ e.jsx("p", { className: "cms:font-medium", children: t("No forms yet") }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:max-w-sm cms:text-sm cms:text-muted-foreground", children: t(i ? "Create a form, put it on a page, and what visitors send shows up here." : "Once someone creates a form and puts it on a page, what visitors send shows up here.") })
        ] }),
        i && /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(N.Link, { href: i, children: [
          /* @__PURE__ */ e.jsx(J, {}),
          " ",
          t("Create a form")
        ] }) })
      ] })
    ] });
  const o = (n.data[0]?.rows ?? []).slice(0, Ul), f = (m) => x(
    t("Delete this submission for good? It can't be restored."),
    () => N.router.delete(L(`cms/submissions/${m.id}`), { preserveScroll: !0, onSuccess: () => u(null) })
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: t(":form submissions", { form: s.title }) }),
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: s.title,
        actions: n.total > 0 && r.export && /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: L(`cms/forms/${s.handle}/submissions/export`), children: [
          /* @__PURE__ */ e.jsx(Vs, {}),
          " ",
          t("Export CSV")
        ] }) }),
        children: l.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: s.handle, onValueChange: (m) => N.router.get(L(`cms/forms/${m}/submissions`)), children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-56", "aria-label": t("Form"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: l.map((m) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: m.handle, children: [
            m.title,
            " (",
            m.count,
            ")"
          ] }, m.handle)) })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(a.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(a.Table, { children: [
      /* @__PURE__ */ e.jsx(a.TableHeader, { children: /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
        /* @__PURE__ */ e.jsx(a.TableHead, { children: t("Sent") }),
        o.map((m) => /* @__PURE__ */ e.jsx(a.TableHead, { children: m.label }, m.handle))
      ] }) }),
      /* @__PURE__ */ e.jsxs(a.TableBody, { children: [
        n.data.length === 0 && /* @__PURE__ */ e.jsx(a.TableRow, { children: /* @__PURE__ */ e.jsx(a.TableCell, { colSpan: o.length + 1, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: t("Nothing sent yet.") }) }),
        n.data.map((m) => /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
          /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:whitespace-nowrap", children: /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:font-medium cms:hover:underline", onClick: () => u(m), children: K(m.createdAt) }) }),
          o.map((h) => /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:max-w-64 cms:truncate", children: m.rows.find((g) => g.handle === h.handle)?.value }, h.handle))
        ] }, m.id))
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
            onClick: () => n.prev_page_url && N.router.get(n.prev_page_url, {}, { preserveScroll: !0 }),
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
            onClick: () => n.next_page_url && N.router.get(n.next_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(be, {})
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(a.Dialog, { open: c !== null, onOpenChange: (m) => !m && u(null), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto", children: [
      /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
        /* @__PURE__ */ e.jsx(a.DialogTitle, { children: s.title }),
        /* @__PURE__ */ e.jsxs(a.DialogDescription, { children: [
          t("Sent :date", { date: K(c?.createdAt ?? null) }),
          " · ",
          c?.locale.toUpperCase()
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-3 cms:text-sm", children: c?.rows.map((m) => /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: m.label }),
        /* @__PURE__ */ e.jsx("dd", { className: "cms:whitespace-pre-wrap cms:break-words cms:text-muted-foreground", children: m.files && m.files.length > 0 ? /* @__PURE__ */ e.jsx("ul", { className: "cms:flex cms:flex-col cms:gap-1", children: m.files.map((h) => /* @__PURE__ */ e.jsx("li", { children: /* @__PURE__ */ e.jsx("a", { href: h.url, className: "cms:underline cms:underline-offset-4 hover:cms:text-foreground", download: !0, children: h.name }) }, h.url)) }) : m.file ? /* @__PURE__ */ e.jsx("a", { href: m.file, className: "cms:underline cms:underline-offset-4 hover:cms:text-foreground", download: !0, children: m.value }) : m.value || "—" })
      ] }, m.handle)) }),
      c && (c.visitor.ip || c.visitor.userAgent || c.visitor.referrer) && /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-3 cms:border-t cms:pt-3 cms:text-sm", children: [[t("IP address"), c.visitor.ip], [t("Browser"), c.visitor.userAgent], [t("Sent from"), c.visitor.referrer]].map(([m, h]) => h && /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: m }),
        /* @__PURE__ */ e.jsx("dd", { className: "cms:break-all cms:text-muted-foreground", children: h })
      ] }, m)) }),
      r.delete && c && /* @__PURE__ */ e.jsx(a.DialogFooter, { children: /* @__PURE__ */ e.jsxs(a.Button, { variant: "destructive", onClick: () => f(c), children: [
        /* @__PURE__ */ e.jsx(W, {}),
        " ",
        t("Delete")
      ] }) })
    ] }) }),
    d
  ] });
}
function Kl(s) {
  return /* @__PURE__ */ e.jsx(Wl, { ...s }, `${s.locale}:${s.version}:${JSON.stringify([s.values, s.seo, s.term.template])}`);
}
function Wl({ taxonomy: s, term: l, translated: n, fields: r, locale: i, locales: c, shared: u, sharedValues: x, values: d, seo: o, version: f, usedBy: m = [], redirectsUrl: h = null }) {
  const g = L(`cms/taxonomies/${s.handle}/terms`), k = L(`cms/terms/${l.id}/content`);
  a.useBreadcrumbs([{ label: s.title, href: `${g}?locale=${i}` }, { label: l.title }]);
  const b = N.useForm({
    locale: i,
    title: l.ownTitle ?? "",
    slug: l.slug ?? "",
    data: d,
    seo: o ?? {},
    template: l.template ?? "",
    version: f
  }), y = b.errors, T = (j) => {
    const M = _e(y, j);
    M.length > 0 && b.clearErrors(...M);
  }, S = () => b.processing || b.put(k, { preserveScroll: !0 }), w = () => {
    b.transform((j) => ({ ...j, version: null })), b.put(k, { preserveScroll: !0 });
  }, p = a.useEditLock({
    type: "cms.term",
    id: l.id,
    locale: i,
    enabled: n,
    noun: t("term"),
    leaveTo: `${g}?locale=${i}`,
    getUnsaved: () => b.isDirty ? { data: b.data.data, seo: b.data.seo, template: b.data.template } : null
  }), B = !p.readOnly, E = async (j) => {
    const M = await p.loadKept(j);
    b.setData(($) => ({
      ...$,
      data: M.data && typeof M.data == "object" ? M.data : $.data,
      seo: M.seo && typeof M.seo == "object" ? M.seo : $.seo,
      template: typeof M.template == "string" ? M.template : $.template
    }));
  };
  return a.useUnsavedChanges(b.isDirty && !p.takenOver, B ? S : void 0), /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (j) => {
    j.preventDefault(), S();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: l.title }),
    p.dialogs,
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: l.title,
        back: { href: `${g}?locale=${i}`, label: t("Back to :title", { title: s.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          l.url && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: l.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(pe, {}),
            " ",
            t("View page")
          ] }) }),
          c.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: i, onValueChange: (j) => N.router.get(`${g}/${l.id}/edit`, { locale: j }), children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(a.SelectContent, { children: c.map((j, M) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: j, children: [
              H(j),
              M === 0 ? ` ${t("(main)")}` : ""
            ] }, j)) })
          ] }),
          B && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: b.processing, children: [
            b.processing && /* @__PURE__ */ e.jsx(ue, { className: "cms:animate-spin" }),
            " ",
            t("Save")
          ] })
        ] }),
        children: b.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:items-start cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_20rem]", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(a.ViewingNotice, { by: p.viewingBy, onTakeOver: p.requestTakeOver }),
        !n && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:bg-muted/40 cms:p-3 cms:text-sm cms:text-muted-foreground", role: "note", children: t("Not in :language yet: the site shows the :main term meanwhile. Give it a title in :language and save to add it.", { language: H(i), main: H(c[0] ?? "en") }) }),
        /* @__PURE__ */ e.jsxs("fieldset", { disabled: !B, className: "cms:grid cms:min-w-0 cms:gap-4 cms:sm:grid-cols-2", children: [
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
                "aria-invalid": y.title !== void 0,
                onChange: (j) => {
                  b.setData("title", j.target.value), T("title");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(A, { message: y.title })
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
                "aria-invalid": y.slug !== void 0,
                onChange: (j) => {
                  b.setData("slug", j.target.value), T("slug");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(Pt, { note: ks(l.hasPage ? l.slug : null, b.data.slug, !1), redirectsUrl: h }),
            /* @__PURE__ */ e.jsx(A, { message: y.slug })
          ] })
        ] }),
        /* @__PURE__ */ e.jsx(a.KeptEditsNotice, { kept: p.kept, disabled: !B, onLoad: (j) => {
          E(j);
        }, onDiscard: (j) => {
          p.discardKept(j);
        } }),
        /* @__PURE__ */ e.jsx(ts, { message: y.version, processing: b.processing, onSaveMine: w }),
        /* @__PURE__ */ e.jsx(
          Xe,
          {
            disabled: !B,
            fields: r,
            values: b.data.data,
            errors: y,
            storageKey: `cms:term:${s.handle}`,
            shared: u,
            sharedValues: x,
            sharedNote: t("Shared by all languages: the greyed-out fields are edited in :language.", { language: H(c[0] ?? "en") }),
            onChange: (j, M) => {
              b.setData("data", { ...b.data.data, [j]: M }), T(`data.${j}`);
            }
          }
        ),
        /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: t("SEO"), description: t("How this term's page appears in search results and shared links."), titleClassName: "cms:text-base", storageKey: "cms:term:seo", hasErrors: ye(y, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !B, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(he, { bare: !0, id: "seo", fields: es(), value: b.data.seo, errors: Z(y, "seo"), onChange: (j) => {
          b.setData("seo", j), T("seo");
        } }) }) })
      ] }),
      /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(
          a.CollapsibleCard,
          {
            title: t("Template"),
            titleClassName: "cms:text-base",
            storageKey: "cms:term:page-settings",
            hasErrors: y.template !== void 0,
            contentClassName: "cms:flex cms:flex-col cms:gap-2",
            children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: !B, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: [
              /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "template", className: "cms:sr-only", children: t("Template") }),
              /* @__PURE__ */ e.jsx(
                a.Input,
                {
                  id: "template",
                  className: "cms:font-mono",
                  placeholder: `cms.${s.handle}-special`,
                  value: b.data.template,
                  onChange: (j) => b.setData("template", j.target.value),
                  "aria-invalid": y.template !== void 0
                }
              ),
              /* @__PURE__ */ e.jsx(Ft, { example: `cms.${s.handle}-special`, fallbacks: [t("the taxonomy's template, if set"), `cms.taxonomy-${s.handle}`, "cms.term"] }),
              /* @__PURE__ */ e.jsx(A, { message: y.template })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: t("Used by"), titleClassName: "cms:text-base", storageKey: "cms:term:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          m.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("No content links here through its fields.") }),
          m.map((j) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:gap-2", children: [
            j.url ? /* @__PURE__ */ e.jsx("a", { href: j.url, className: "cms:truncate cms:underline-offset-4 cms:hover:underline", children: j.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:truncate", children: j.label }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", title: j.field, children: j.fieldLabel ?? j.field })
          ] }, `${j.label}:${j.field}`))
        ] })
      ] })
    ] })
  ] });
}
const He = "__top";
function Gl({ taxonomy: s, locale: l, locales: n, parent: r, terms: i }) {
  const c = L(`cms/taxonomies/${s.handle}/terms`);
  a.useBreadcrumbs([{ label: s.title, href: `${c}?locale=${l}` }, { label: t("New term") }]);
  const u = N.useForm({ title: "", slug: "", parent_id: r, locale: l }), x = u.errors;
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (d) => {
    d.preventDefault(), u.post(c);
  }, className: "cms:flex cms:max-w-3xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: t("New term · :taxonomy", { taxonomy: s.title }) }),
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: t("New term"),
        back: { href: `${c}?locale=${l}`, label: t("Back to :title", { title: s.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          n.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: l, onValueChange: (d) => N.router.get(`${c}/create`, { locale: d, ...r ? { parent: r } : {} }), children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-40", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(a.SelectContent, { children: n.map((d) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: d, children: H(d) }, d)) })
          ] }),
          /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: u.processing, children: [
            u.processing && /* @__PURE__ */ e.jsx(ue, { className: "cms:animate-spin" }),
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
            value: u.data.title,
            required: !0,
            autoFocus: !0,
            "aria-invalid": x.title !== void 0,
            onChange: (d) => u.setData("title", d.target.value)
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
            value: u.data.slug,
            placeholder: t("Made from the title"),
            "aria-invalid": x.slug !== void 0,
            onChange: (d) => u.setData("slug", d.target.value)
          }
        ),
        /* @__PURE__ */ e.jsx(A, { message: x.slug })
      ] }),
      s.hierarchical && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:md:col-span-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "parent", children: t("Under") }),
        /* @__PURE__ */ e.jsxs(
          a.Select,
          {
            value: u.data.parent_id === null ? He : String(u.data.parent_id),
            onValueChange: (d) => u.setData("parent_id", d === He ? null : Number(d)),
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
      n.length > 1 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground cms:md:col-span-2", children: t("In :language. Translate it from the list afterwards.", { language: H(l) }) })
    ] }) })
  ] });
}
const Pe = "__top";
function bs(s = []) {
  if (s.length === 0) return "";
  const l = s.slice(0, 5).join("; ");
  return ` ${s.length > 5 ? t("It's used by :list and :count more.", { list: l, count: s.length - 5 }) : t("It's used by :list.", { list: l })}`;
}
function Yl({ taxonomy: s, taxonomies: l, terms: n, locales: r, locale: i, trashed: c = !1 }) {
  a.useBreadcrumbs([{ label: s ? s.title : t("Terms") }]);
  const [u, x] = re(), [d, o] = _.useState(null), [f, m] = _.useState(""), [h, g] = _.useState(n);
  if (_.useEffect(() => g(n), [n]), !s)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(N.Head, { title: t("Terms") }),
      /* @__PURE__ */ e.jsx(a.PageHeader, { title: t("Terms"), description: t("There are no taxonomies yet. Create one under Structure → Taxonomies (categories, tags…), then add its terms here.") })
    ] });
  const k = L(`cms/taxonomies/${s.handle}/terms`), b = (j) => L(`cms/taxonomies/${s.handle}/terms/${j.id}/edit`) + `?locale=${encodeURIComponent(i)}`, y = (j, M) => {
    const $ = M.map((F) => h[F].id);
    g(ss(h, j, M)), N.router.post(
      L("cms/terms/reorder"),
      { taxonomy: s.handle, ids: $, parent_id: j < 0 ? null : h[j].id },
      { preserveScroll: !0, preserveState: !0, onError: () => g(n) }
    );
  }, T = (j) => u(
    t('Move ":title" to the trash, with the terms under it? It comes off the site; you can restore it.', { title: j.fallback }) + bs(j.usedBy),
    () => N.router.delete(L(`cms/terms/${j.id}`), { preserveScroll: !0 }),
    t("Move to trash")
  ), S = f.trim().toLowerCase(), w = S === "" ? null : h.filter((j) => `${j.title ?? j.fallback} ${j.slug ?? ""}`.toLowerCase().includes(S)), p = s.collections ?? [], B = (j, M, $) => /* @__PURE__ */ e.jsxs("div", { className: `${vs} cms:border-t cms:border-border/60 cms:px-3 cms:py-2`, children: [
    /* @__PURE__ */ e.jsx("span", { className: "cms:flex cms:justify-center", children: M && !c && /* @__PURE__ */ e.jsx(a.SortableHandle, { ...M, label: t("Move :title", { title: j.fallback }) }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-2", style: { paddingLeft: $ * 20 }, children: [
      $ > 0 && /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", "aria-hidden": !0, children: "└" }),
      c ? /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: j.title ?? j.fallback }) : /* @__PURE__ */ e.jsx(
        "button",
        {
          type: "button",
          className: "cms:truncate cms:text-left cms:font-medium cms:underline-offset-4 cms:hover:underline",
          onClick: () => s.pages && j.title !== null ? N.router.get(b(j)) : o(j),
          children: j.title ?? /* @__PURE__ */ e.jsx("span", { className: "cms:font-normal cms:text-muted-foreground cms:italic", children: t(":title · not translated", { title: j.fallback }) })
        }
      ),
      j.url && /* @__PURE__ */ e.jsx("a", { href: j.url, target: "_blank", rel: "noopener noreferrer", className: "cms:text-muted-foreground cms:hover:text-foreground", "aria-label": t("Visit term page"), title: t("Visit term page"), children: /* @__PURE__ */ e.jsx(pe, { className: "cms:size-3.5" }) })
    ] }),
    /* @__PURE__ */ e.jsx("code", { className: "cms:hidden cms:truncate cms:text-xs cms:text-muted-foreground cms:md:block", children: j.slug ?? "—" }),
    /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:text-sm cms:text-muted-foreground cms:tabular-nums cms:md:block", children: j.entries ?? 0 }),
    /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:text-sm cms:text-muted-foreground cms:md:block", children: Jl(j.createdAt) }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:justify-end", children: c ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-1", children: [
      /* @__PURE__ */ e.jsxs(a.Button, { variant: "outline", size: "sm", onClick: () => N.router.post(L(`cms/terms/${j.id}/restore`), {}, { preserveScroll: !0 }), children: [
        /* @__PURE__ */ e.jsx(fe, {}),
        " ",
        t("Restore")
      ] }),
      /* @__PURE__ */ e.jsxs(
        a.Button,
        {
          variant: "ghost",
          size: "sm",
          className: "cms:text-destructive",
          onClick: () => u(
            t('Delete ":title" for good, in every language? Entries lose it.', { title: j.fallback }) + bs(j.usedBy),
            () => N.router.delete(L(`cms/terms/${j.id}/force`), { preserveScroll: !0, data: (j.usedBy ?? []).length > 0 ? { force: 1 } : {} })
          ),
          children: [
            /* @__PURE__ */ e.jsx(W, {}),
            " ",
            t("Delete for good")
          ]
        }
      )
    ] }) : /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": t("Actions for :title", { title: j.fallback }), children: /* @__PURE__ */ e.jsx(Ks, {}) }) }),
      /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", children: [
        /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { onSelect: () => o(j), children: [
          /* @__PURE__ */ e.jsx(it, {}),
          " ",
          t("Rename")
        ] }),
        s.hierarchical && j.title !== null && /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(N.Link, { href: `${k}/create?locale=${encodeURIComponent(i)}&parent=${j.id}`, children: [
          /* @__PURE__ */ e.jsx(J, {}),
          " ",
          t("Add a term under it")
        ] }) }),
        s.pages && j.title !== null && /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(N.Link, { href: b(j), children: [
          /* @__PURE__ */ e.jsx(ga, {}),
          " ",
          t("Edit page")
        ] }) }),
        /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
        /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { className: "cms:text-destructive", onSelect: () => T(j), children: [
          /* @__PURE__ */ e.jsx(W, {}),
          " ",
          t("Move to trash")
        ] })
      ] })
    ] }) })
  ] }), E = (j) => /* @__PURE__ */ e.jsx(a.SortableList, { items: ne(h, j), getId: (M) => h[M].id, getLabel: (M) => h[M].title ?? h[M].fallback, disabled: c, onReorder: (M) => y(j, M), className: "cms:gap-0", children: (M, { handle: $, isOverlay: F }) => /* @__PURE__ */ e.jsxs("div", { className: F ? "cms:rounded-md cms:bg-card cms:shadow-md" : "", children: [
    B(h[M], $, h[M].depth),
    !F && !c && ne(h, M).length > 0 && E(M)
  ] }) });
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: s.title }),
    x,
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: c ? t(":title — trash", { title: s.title }) : s.title,
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          r.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: i, onValueChange: (j) => N.router.get(k, { locale: j, ...c ? { status: "trashed" } : {} }), children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-40", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(a.SelectContent, { children: r.map((j) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: j, children: H(j) }, j)) })
          ] }),
          c ? /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", onClick: () => N.router.get(k, { locale: i }), children: t("Back to terms") }) : /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(N.Link, { href: `${k}/create?locale=${encodeURIComponent(i)}`, children: [
            /* @__PURE__ */ e.jsx(J, {}),
            " ",
            t("New term")
          ] }) }),
          /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", size: "icon", "aria-label": t("More"), children: /* @__PURE__ */ e.jsx(xa, {}) }) }),
            /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", className: "cms:min-w-56", children: [
              p.length > 0 && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(a.DropdownMenuLabel, { children: t("Used by collections") }),
                p.map((j) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsx(N.Link, { href: j.url, children: j.title }) }, j.url)),
                /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {})
              ] }),
              s.settings && /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(N.Link, { href: s.settings, children: [
                /* @__PURE__ */ e.jsx(Je, {}),
                " ",
                t("Taxonomy settings")
              ] }) }),
              !c && /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { onSelect: () => N.router.get(k, { locale: i, status: "trashed" }), children: [
                /* @__PURE__ */ e.jsx(W, {}),
                " ",
                t("Trash")
              ] })
            ] })
          ] })
        ] }),
        children: l.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: s.handle, onValueChange: (j) => N.router.get(L(`cms/taxonomies/${j}/terms`)), children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": t("Taxonomy"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: l.map((j) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: j.handle, children: j.title }, j.handle)) })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-xs", children: [
        /* @__PURE__ */ e.jsx(ve, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            className: "cms:pl-9",
            placeholder: t("Search terms…"),
            "aria-label": t("Search terms"),
            value: f,
            onChange: (j) => m(j.target.value)
          }
        )
      ] }),
      !c && h.length > 1 && !w && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s.hierarchical ? t("Drag terms to set their order; a term's parent is set when you rename it.") : t("Drag terms to set their order.") })
    ] }),
    /* @__PURE__ */ e.jsxs(a.Card, { className: "cms:gap-0 cms:overflow-hidden cms:py-0", children: [
      /* @__PURE__ */ e.jsxs("div", { className: `${vs} cms:bg-muted/60 cms:px-3 cms:py-2.5 cms:text-sm cms:font-medium cms:text-muted-foreground`, children: [
        /* @__PURE__ */ e.jsx("span", {}),
        /* @__PURE__ */ e.jsx("span", { children: t("Title") }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:md:block", children: t("Slug") }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:md:block", children: t("Entries") }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:md:block", children: t("Created") }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: t("Actions") })
      ] }),
      h.length === 0 ? /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:border-t cms:border-border/60 cms:p-10 cms:text-center cms:text-muted-foreground", children: c ? t("The trash is empty.") : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        t("No terms yet."),
        /* @__PURE__ */ e.jsx(a.Button, { size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs(N.Link, { href: `${k}/create?locale=${encodeURIComponent(i)}`, children: [
          /* @__PURE__ */ e.jsx(J, {}),
          " ",
          t("New term")
        ] }) })
      ] }) }) : w ? w.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:border-t cms:border-border/60 cms:p-8 cms:text-center cms:text-muted-foreground", children: t("No terms match “:search”.", { search: f }) }) : w.map((j) => /* @__PURE__ */ e.jsx(_.Fragment, { children: B(j, null, 0) }, j.id)) : c ? h.map((j) => /* @__PURE__ */ e.jsx(_.Fragment, { children: B(j, null, 0) }, j.id)) : E(-1)
    ] }),
    /* @__PURE__ */ e.jsx(a.Dialog, { open: d !== null, onOpenChange: (j) => {
      j || o(null);
    }, children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
      /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
        /* @__PURE__ */ e.jsx(a.DialogTitle, { children: t("Rename “:title”", { title: d?.fallback }) }),
        /* @__PURE__ */ e.jsx(a.DialogDescription, { children: r.length > 1 ? t("In :language.", { language: H(i) }) : t("Its title and the slug in its address.") })
      ] }),
      d !== null && /* @__PURE__ */ e.jsx(Ql, { term: d, locale: i, terms: n, hierarchical: s.hierarchical, onDone: () => o(null) }, d.id)
    ] }) })
  ] });
}
const vs = "cms:grid cms:items-center cms:gap-3 cms:grid-cols-[1.5rem_1fr_2.5rem] cms:md:grid-cols-[1.5rem_minmax(0,2fr)_minmax(0,1.2fr)_5rem_7rem_2.5rem]";
function Jl(s) {
  if (!s) return "—";
  const l = new Date(s);
  return Number.isNaN(l.getTime()) ? "—" : l.toLocaleDateString(document.documentElement.lang || void 0, { day: "numeric", month: "short", year: "numeric" });
}
function Ql({ locale: s, terms: l, hierarchical: n, term: r, onDone: i }) {
  const c = N.useForm({ title: r.title ?? "", slug: r.slug ?? "", parent_id: r.parentId, locale: s, version: r.version }), u = c.errors, x = /* @__PURE__ */ new Set();
  x.add(r.id);
  const d = l.findIndex((m) => m.id === r.id);
  for (let m = d + 1; m < l.length && (l[m]?.depth ?? 0) > r.depth; m++) x.add(l[m].id);
  const o = (m) => {
    m.preventDefault(), c.put(L(`cms/terms/${r.id}`), { preserveScroll: !0, onSuccess: i });
  }, f = `term-${r.id}`;
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: o, className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${f}-title`, children: t("Title") }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: `${f}-title`,
          value: c.data.title,
          placeholder: r.fallback,
          required: !0,
          autoFocus: !0,
          onChange: (m) => c.setData("title", m.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(A, { message: u.title ?? u.version })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${f}-slug`, children: t("Slug") }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: `${f}-slug`,
          className: "cms:font-mono",
          value: c.data.slug,
          placeholder: t("Made from the title"),
          onChange: (m) => c.setData("slug", m.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(A, { message: u.slug })
    ] }),
    n && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${f}-parent`, children: t("Under") }),
      /* @__PURE__ */ e.jsxs(
        a.Select,
        {
          value: c.data.parent_id === null ? Pe : String(c.data.parent_id),
          onValueChange: (m) => c.setData("parent_id", m === Pe ? null : Number(m)),
          children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: `${f}-parent`, children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(a.SelectItem, { value: Pe, children: t("Top level") }),
              l.filter((m) => !x.has(m.id)).map((m) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: String(m.id), children: [
                "— ".repeat(m.depth),
                m.title ?? m.fallback
              ] }, m.id))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ e.jsx(A, { message: u.parent_id })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", onClick: i, children: t("Cancel") }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "submit", disabled: c.processing, children: t("Save") })
    ] })
  ] });
}
function Zl(s) {
  return function(n) {
    const r = N.usePage().props.cms;
    return Qt(r?.locales), /* @__PURE__ */ e.jsx(s, { ...n });
  };
}
const Xl = {
  "Cms/Blueprints/Index": al,
  "Cms/Blueprints/Edit": hs,
  "Cms/Fieldsets/Index": wl,
  // A fieldset is edited like a blueprint.
  "Cms/Fieldsets/Edit": hs,
  "Cms/Entries/Index": bl,
  "Cms/Entries/Edit": nl,
  "Cms/Listing/Edit": kl,
  "Cms/Terms/Index": Yl,
  "Cms/Terms/Create": Gl,
  "Cms/Terms/Edit": Kl,
  "Cms/Globals/Edit": $l,
  "Cms/Menus/Edit": zl,
  "Cms/Comments/Index": Pl,
  "Cms/Seo/Edit": Vl,
  "Cms/Submissions/Index": ql
};
Yt({
  pages: Object.fromEntries(Object.entries(Xl).map(([s, l]) => [s, Zl(l)]))
});
