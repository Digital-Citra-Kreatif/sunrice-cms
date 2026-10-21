const us = globalThis.Sunrice;
if (!us) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const e = us.modules["react/jsx-runtime"], hs = globalThis.Sunrice;
if (!hs) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const S = hs.modules["@inertiajs/react"], Je = 2;
function xs() {
  const s = globalThis.Sunrice;
  if (!s)
    throw new Error("[sunrice] This script runs outside the Sunrice admin panel (window.Sunrice is missing).");
  return s;
}
function Tt(s) {
  const a = xs();
  if (a.version !== Je)
    throw new Error(`[sunrice] This plugin was built for admin runtime ${Je}, but the panel runs ${a.version}. Rebuild it with a matching @sunrice/admin-sdk.`);
  for (const [l, n] of Object.entries(s.pages ?? {}))
    a.registerPage(l, n);
}
function T(s = "") {
  return xs().adminUrl(s);
}
function X(s) {
  return { draft: "Draft", scheduled: "Scheduled", published: "Published" }[s];
}
function q(s, a) {
  if (!s) return "—";
  const l = new Date(s);
  return Number.isNaN(l.getTime()) ? "—" : l.toLocaleString(a, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
}
function Bt(s, a = /* @__PURE__ */ new Date()) {
  const l = s ? new Date(s) : null;
  if (l && !Number.isNaN(l.getTime()) && l > a) return l;
  const n = new Date(a);
  return n.setDate(n.getDate() + 1), n.setMinutes(0, 0, 0), n;
}
function ps(s) {
  const a = (l) => String(l).padStart(2, "0");
  return `${s.getFullYear()}-${a(s.getMonth() + 1)}-${a(s.getDate())}T${a(s.getHours())}:${a(s.getMinutes())}`;
}
let Ee = {};
function zt(s) {
  Ee = s ?? {};
}
function P(s, a) {
  if (Ee[s]) return Ee[s];
  try {
    return new Intl.DisplayNames(a ? [a] : void 0, { type: "language" }).of(s.replace("_", "-")) ?? s;
  } catch {
    return s;
  }
}
function Qe(s) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function Lt(s, a, l, n) {
  return n && s !== "" && s === Qe(a) ? Qe(l) : s;
}
const gs = globalThis.Sunrice;
if (!gs) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const $ = gs.modules.react;
const Mt = (s) => s?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
function It(s, a, l = []) {
  if (a == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: Mt(s),
    size: 24,
    node: a,
    ...l.length > 0 ? { aliases: l } : {}
  };
}
const At = (s) => {
  let a = "", l = !1;
  for (const n of s) {
    if (n === "-" || n === "_" || n <= " ") {
      l = a.length > 0;
      continue;
    }
    a.length === 0 ? a += n.toLowerCase() : a += l ? n.toUpperCase() : n, l = !1;
  }
  return a;
};
const Et = (s) => {
  const a = At(s);
  return a.charAt(0).toUpperCase() + a.slice(1);
};
const Fe = (...s) => s.filter((a, l, n) => !!a && a.trim() !== "" && n.indexOf(a) === l).join(" ").trim();
const ce = {
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
function De(s) {
  return s != null;
}
function Ft(s, a = {}) {
  const l = a.attributeNames ?? {}, n = (u) => l[u] ?? u, c = s.size ?? s.width ?? ce.width, r = s.size ?? s.height ?? ce.height, i = s.aliases?.filter((u) => typeof u == "string" && u.trim() !== "").map((u) => `lucide-${u}`) ?? [], m = [...s.name ? [`lucide-${s.name}`] : [], ...i], d = a.className?.split(" ").filter(Boolean) ?? [], o = a.includeDefaultClasses === !1 ? Fe(...d) : Fe("lucide", ...m, ...d), x = a.absoluteStrokeWidth ? Number(a.strokeWidth ?? ce["stroke-width"]) * Number(s.size ?? s.width ?? ce.width) / Number(a.size ?? a.width ?? ce.width) : a.strokeWidth ?? ce["stroke-width"];
  return [
    "svg",
    {
      ...Object.entries(ce).reduce((u, [h, b]) => (u[n(h)] = b, u), {}),
      ..."color" in a && a.color && {
        [n("stroke")]: a.color
      },
      ..."size" in a && De(a.size) && {
        [n("width")]: a.size,
        [n("height")]: a.size
      },
      ..."width" in a && De(a.width) && {
        [n("width")]: a.width
      },
      ..."height" in a && De(a.height) && {
        [n("height")]: a.height
      },
      [n("stroke-width")]: x,
      ...o && {
        [n("class")]: o
      },
      [n("viewBox")]: `0 0 ${c} ${r}`,
      ...a.hasA11yProp === !1 ? {
        [n("aria-hidden")]: "true"
      } : {},
      ..."attributes" in a && a.attributes
    },
    s.node.map((u) => {
      const [h, b, j] = u, N = a.nonScalingStroke ? { [n("vector-effect")]: "non-scaling-stroke", ...b } : b;
      return j ? [h, N, j] : [h, N];
    })
  ];
}
function Pt(s, a = {}) {
  return Ft(s, {
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
const Ht = (s) => {
  for (const a in s)
    if (a.startsWith("aria-") || a === "role" || a === "title")
      return !0;
  return !1;
}, Ot = $.createContext({}), Rt = () => $.useContext(Ot), Vt = $.forwardRef(
  ({
    color: s,
    size: a,
    width: l,
    height: n,
    strokeWidth: c,
    absoluteStrokeWidth: r,
    nonScalingStroke: i,
    className: m = "",
    children: d,
    iconNode: o = [],
    icon: x = {
      node: o,
      aliases: [],
      size: 24
    },
    ...g
  }, u) => {
    const {
      size: h = 24,
      strokeWidth: b = 2,
      absoluteStrokeWidth: j = !1,
      nonScalingStroke: N = !1,
      color: k = "currentColor",
      className: C = ""
    } = Rt() ?? {}, y = !!d || Ht(g), [p, B, w = []] = Pt(x, {
      color: s ?? k,
      width: l ?? a ?? h,
      height: n ?? a ?? h,
      strokeWidth: c ?? b,
      absoluteStrokeWidth: r ?? j,
      nonScalingStroke: i ?? N,
      className: Fe(C, m),
      hasA11yProp: y,
      attributes: g
    });
    return $.createElement(
      p,
      {
        ref: u,
        ...B
      },
      [
        ...w.map(([z, E]) => $.createElement(z, E)),
        ...Array.isArray(d) ? d : [d]
      ]
    );
  }
);
function M(s, a = [], l = []) {
  const n = typeof s == "string" ? It(s, a, l) : s, c = $.forwardRef(
    ({ className: r, ...i }, m) => $.createElement(Vt, {
      ref: m,
      icon: n,
      className: r,
      ...i
    })
  );
  return n.name && (c.displayName = Et(n.name)), c;
}
const fs = {
  name: "arrow-down",
  size: 24,
  node: [
    ["path", { d: "M12 5v14", key: "s699le" }],
    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
  ]
};
fs.node;
const js = M(fs);
const bs = {
  name: "arrow-up-down",
  size: 24,
  node: [
    ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
    ["path", { d: "M17 20V4", key: "1ejh1v" }],
    ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
    ["path", { d: "M7 4v16", key: "1glfcx" }]
  ]
};
bs.node;
const vs = M(bs);
const ys = {
  name: "arrow-up",
  size: 24,
  node: [
    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
    ["path", { d: "M12 19V5", key: "x0mq9r" }]
  ]
};
ys.node;
const Ns = M(ys);
const Cs = {
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
Cs.node;
const Ze = M(Cs);
const Ss = {
  name: "check",
  size: 24,
  node: [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]
};
Ss.node;
const ve = M(Ss);
const ks = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
ks.node;
const Re = M(ks);
const ws = {
  name: "chevron-left",
  size: 24,
  node: [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]]
};
ws.node;
const Ve = M(ws);
const $s = {
  name: "chevron-right",
  size: 24,
  node: [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]
};
$s.node;
const xe = M($s);
const Ds = {
  name: "chevrons-down-up",
  size: 24,
  node: [
    ["path", { d: "m7 20 5-5 5 5", key: "13a0gw" }],
    ["path", { d: "m7 4 5 5 5-5", key: "1kwcof" }]
  ]
};
Ds.node;
const Ut = M(Ds);
const _s = {
  name: "chevrons-up-down",
  size: 24,
  node: [
    ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
    ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
  ]
};
_s.node;
const Kt = M(_s);
const Ts = {
  name: "columns-3",
  size: 24,
  node: [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M9 3v18", key: "fh3hqa" }],
    ["path", { d: "M15 3v18", key: "14nvp0" }]
  ],
  aliases: ["panels-left-right"]
};
Ts.node;
const qt = M(Ts);
const Bs = {
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
Bs.node;
const Wt = M(Bs);
const zs = {
  name: "copy",
  size: 24,
  node: [
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
  ]
};
zs.node;
const Gt = M(zs);
const Ls = {
  name: "download",
  size: 24,
  node: [
    ["path", { d: "M12 15V3", key: "m9g1x1" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
  ]
};
Ls.node;
const Ms = M(Ls);
const Is = {
  name: "external-link",
  size: 24,
  node: [
    ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
    ["path", { d: "M10 14 21 3", key: "gplh6r" }],
    ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
  ]
};
Is.node;
const pe = M(Is);
const As = {
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
As.node;
const Yt = M(As);
const Es = {
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
Es.node;
const Jt = M(Es);
const Fs = {
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
Fs.node;
const Xe = M(Fs);
const Ps = {
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
Ps.node;
const Qt = M(Ps);
const Hs = {
  name: "link-2",
  size: 24,
  node: [
    ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
    ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
    ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
  ]
};
Hs.node;
const Zt = M(Hs);
const Os = {
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
Os.node;
const Xt = M(Os);
const Rs = {
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
Rs.node;
const ea = M(Rs);
const Vs = {
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
Vs.node;
const sa = M(Vs);
const Us = {
  name: "loader-circle",
  size: 24,
  node: [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  aliases: ["loader-2"]
};
Us.node;
const me = M(Us);
const Ks = {
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
Ks.node;
const qs = M(Ks);
const Ws = {
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
Ws.node;
const ta = M(Ws);
const Gs = {
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
Gs.node;
const Ys = M(Gs);
const Js = {
  name: "plus",
  size: 24,
  node: [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ]
};
Js.node;
const ee = M(Js);
const Qs = {
  name: "rotate-ccw",
  size: 24,
  node: [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ]
};
Qs.node;
const ue = M(Qs);
const Zs = {
  name: "search",
  size: 24,
  node: [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ]
};
Zs.node;
const Ce = M(Zs);
const Xs = {
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
Xs.node;
const aa = M(Xs);
const et = {
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
et.node;
const Pe = M(et);
const st = {
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
st.node;
const la = M(st);
const tt = {
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
tt.node;
const K = M(tt);
const at = {
  name: "undo-2",
  size: 24,
  node: [
    ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
    ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
  ]
};
at.node;
const He = M(at);
const lt = {
  name: "x",
  size: 24,
  node: [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]
};
lt.node;
const Se = M(lt), nt = globalThis.Sunrice;
if (!nt) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const t = nt.modules["@sunrice/admin-sdk/ui"];
function ne() {
  const [s, a] = $.useState(null), l = /* @__PURE__ */ e.jsx(t.Dialog, { open: s !== null, onOpenChange: (n) => !n && a(null), children: /* @__PURE__ */ e.jsxs(t.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(t.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(t.DialogTitle, { children: "Are you sure?" }),
      /* @__PURE__ */ e.jsx(t.DialogDescription, { children: s?.message })
    ] }),
    /* @__PURE__ */ e.jsxs(t.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "outline", onClick: () => a(null), children: "Cancel" }),
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "destructive", onClick: () => {
        s?.onConfirm(), a(null);
      }, children: s?.label ?? "Delete" })
    ] })
  ] }) });
  return [(n, c, r = "Delete") => a({ message: n, onConfirm: c, label: r }), l];
}
function ie(s) {
  return s && typeof s == "object" && !Array.isArray(s) ? s : {};
}
function na(s, a) {
  if (typeof s != "string" || s === "") return "";
  const l = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(s);
  return l ? a ? `${l[1]}T${l[2] ?? "00:00"}` : l[1] ?? "" : "";
}
function es(s) {
  return s === "" ? null : s;
}
function ra(s) {
  const a = typeof s == "number" ? s : typeof s == "string" && s.trim() !== "" ? Number(s) : NaN;
  return !Number.isFinite(a) || Math.abs(a) < 1e4 ? null : new Intl.NumberFormat("en", { maximumFractionDigits: 20 }).format(a);
}
function ca(s, a, l, n) {
  return a || s.some((c) => ["none", ""].includes(c.label.trim().toLowerCase()) || c.value.trim().toLowerCase() === "none") ? !1 : !l || !n;
}
function ye(s) {
  return s.some((a) => a.shared === !0 || ye(a.fields ?? []) || (a.blocks ?? []).some((l) => ye(l.fields)));
}
function ia() {
  return { _hidden: !1 };
}
function Ue(s, a, l = 60) {
  for (const n of s) {
    const c = a[n.handle];
    let r = null;
    ["text", "textarea", "email", "url"].includes(n.type) && typeof c == "string" ? r = c : n.type === "rich_text" && typeof c == "string" ? r = c.replace(/<[^>]*>/g, " ") : n.type === "group" && Array.isArray(n.fields) && (r = Ue(n.fields, ie(c), l));
    const i = (r ?? "").replace(/\s+/g, " ").trim();
    if (i !== "") return i.length > l ? `${i.slice(0, l - 1).trimEnd()}…` : i;
  }
  return null;
}
function oa(s) {
  return { type: s, hidden: !1, values: {} };
}
function da(s) {
  const a = s.replace(/[\u0000- \u007f]+/g, ""), l = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(a);
  return l ? ["http", "https", "mailto", "tel"].includes(l[1].toLowerCase()) : !a.includes("\\");
}
function rt({ ids: s, search: a, collections: l }) {
  const n = new URLSearchParams();
  for (const c of s ?? []) n.append("ids[]", String(c));
  a && n.set("search", a);
  for (const c of l) n.append("collections[]", c);
  return n.toString();
}
let ma = 0;
function ua(s, a) {
  return s.length === a ? s.slice() : s.length < a ? [...s, ...Array.from({ length: a - s.length }, () => `k${++ma}`)] : s.slice(0, a);
}
function ha({ taxonomy: s, q: a, ids: l }) {
  const n = new URLSearchParams({ taxonomy: s });
  a && n.set("q", a);
  for (const c of l ?? []) n.append("ids[]", String(c));
  return n.toString();
}
async function ss(s) {
  const a = await fetch(`${T("cms/entry-picker")}?${rt(s)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!a.ok) throw new Error(String(a.status));
  const l = await a.json();
  return { items: l.items, unavailable: l.unavailable ?? [] };
}
function xa(s) {
  return s.length < 2 ? s[0] ?? "" : `${s.slice(0, -1).join(", ")} and ${s[s.length - 1]}`;
}
function ke({ id: s, value: a, multiple: l, max: n, collections: c, invalid: r, onChange: i, emptyHint: m }) {
  const d = a === null ? [] : Array.isArray(a) ? a : [a], [o, x] = $.useState({}), [g, u] = $.useState(""), [h, b] = $.useState(!1), [j, N] = $.useState(null), [k, C] = $.useState([]), [y, p] = $.useState(!1), B = l && n !== null && d.length >= n, w = d.filter((D) => !o[D]).join(",");
  $.useEffect(() => {
    w !== "" && ss({ ids: w.split(",").map(Number), collections: c }).then(({ items: D }) => x((L) => ({ ...L, ...Object.fromEntries(D.map((f) => [f.id, f])) }))).catch(() => p(!0));
  }, [w]), $.useEffect(() => {
    if (!h) {
      N(null);
      return;
    }
    const D = window.setTimeout(() => {
      ss({ search: g.trim(), collections: c }).then((L) => {
        N(L.items), C(L.unavailable), p(!1);
      }).catch(() => p(!0));
    }, g.trim() === "" ? 0 : 250);
    return () => window.clearTimeout(D);
  }, [g, h]);
  const z = (D) => {
    x((L) => ({ ...L, [D.id]: D })), i(l ? [...d, D.id] : D.id), u("");
  }, E = (D) => i(l ? D : D[0] ?? null);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    d.length > 0 && /* @__PURE__ */ e.jsx(t.SortableList, { items: d, getId: (D) => D, getLabel: (D) => o[D]?.title ?? `Entry #${D}`, onReorder: (D) => E(D), disabled: !l, className: "cms:gap-1", children: (D, { handle: L }) => {
      const f = o[D];
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-md cms:border cms:bg-card cms:px-2 cms:py-1 cms:text-sm", children: [
        l && /* @__PURE__ */ e.jsx(t.SortableHandle, { ...L, label: `Move ${f?.title ?? D}` }),
        /* @__PURE__ */ e.jsx("span", { className: `cms:min-w-0 cms:flex-1 cms:truncate ${l ? "" : "cms:pl-1"}`, children: f ? f.title : `Entry #${D}` }),
        f && /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: f.collection }),
        f && /* @__PURE__ */ e.jsx(t.Badge, { variant: f.status === "published" ? "success" : "secondary", children: X(f.status) }),
        /* @__PURE__ */ e.jsx(
          t.Button,
          {
            type: "button",
            variant: "ghost",
            size: "icon",
            className: "cms:size-7",
            "aria-label": `Remove ${f?.title ?? D}`,
            onClick: () => E(d.filter((H) => H !== D)),
            children: /* @__PURE__ */ e.jsx(Se, {})
          }
        )
      ] });
    } }),
    !B && (l || d.length === 0) && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-md", children: [
      /* @__PURE__ */ e.jsx(Ce, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
      /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: s,
          className: "cms:pl-9",
          placeholder: "Search entries by title",
          "aria-invalid": r,
          value: g,
          autoComplete: "off",
          "aria-expanded": j !== null,
          onFocus: () => b(!0),
          onBlur: () => b(!1),
          onKeyDown: (D) => {
            D.key === "Escape" && h && (D.preventDefault(), b(!1));
          },
          onChange: (D) => {
            u(D.target.value), b(!0);
          }
        }
      ),
      j !== null && /* @__PURE__ */ e.jsxs("ul", { role: "listbox", "aria-label": "Matching entries", className: "cms:absolute cms:z-10 cms:mt-1 cms:max-h-64 cms:w-full cms:overflow-auto cms:rounded-md cms:border cms:bg-card cms:p-1 cms:shadow-md", children: [
        j.filter((D) => !d.includes(D.id)).length === 0 && /* @__PURE__ */ e.jsxs("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: [
          g.trim() === "" ? "No entries yet." : "No entries match.",
          m && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            " ",
            m
          ] })
        ] }),
        k.length > 0 && /* @__PURE__ */ e.jsxs("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: [
          "Your role can't see entries of ",
          xa(k),
          ": ask an editor to link them."
        ] }),
        j.filter((D) => !d.includes(D.id)).map((D) => /* @__PURE__ */ e.jsx("li", { role: "option", "aria-selected": !1, children: /* @__PURE__ */ e.jsxs(
          "button",
          {
            type: "button",
            className: "cms:flex cms:w-full cms:items-center cms:gap-2 cms:rounded cms:px-2 cms:py-1.5 cms:text-left cms:text-sm cms:hover:bg-accent",
            onMouseDown: (L) => L.preventDefault(),
            onClick: () => z(D),
            children: [
              /* @__PURE__ */ e.jsx("span", { className: "cms:flex-1 cms:truncate", children: D.title }),
              /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: D.collection })
            ]
          }
        ) }, D.id))
      ] })
    ] }),
    y && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "Entries could not be loaded. Try again." })
  ] });
}
const ct = $.createContext({}), _e = "__none";
async function ts(s) {
  const a = await fetch(`${T("cms/term-picker")}?${ha(s)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!a.ok) throw new Error(String(a.status));
  return await a.json();
}
function pa({ id: s, taxonomy: a, multiple: l, max: n, required: c, invalid: r, value: i, onChange: m }) {
  const d = $.useContext(ct), o = i === null ? [] : Array.isArray(i) ? i : [i], [x, g] = $.useState(null), [u, h] = $.useState(!1), [b, j] = $.useState(""), [N, k] = $.useState({}), [C, y] = $.useState(!1);
  $.useEffect(() => {
    if (!a) return;
    const f = b.trim(), H = window.setTimeout(() => {
      ts({ taxonomy: a, q: f }).then((O) => {
        g(O.items), O.more && h(!0), y(!1);
      }).catch(() => y(!0));
    }, f === "" ? 0 : 250);
    return () => window.clearTimeout(H);
  }, [a, b]);
  const p = (f) => d[String(f)] ?? N[f] ?? x?.find((H) => H.id === f)?.label, B = x === null ? "" : o.filter((f) => p(f) === void 0).join(",");
  if ($.useEffect(() => {
    !a || B === "" || ts({ taxonomy: a, ids: B.split(",").map(Number) }).then((f) => k((H) => ({ ...H, ...Object.fromEntries(f.items.map((O) => [O.id, O.label])) }))).catch(() => y(!0));
  }, [a, B]), !a) return /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Choose a taxonomy for this field in its blueprint." });
  if (x === null) return C ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "Terms could not be loaded. Try again." }) : /* @__PURE__ */ e.jsx(t.Skeleton, { className: "cms:h-9 cms:w-full cms:max-w-sm" });
  const w = (f) => `${"— ".repeat(f.depth)}${f.label}`, z = l && n !== null && o.length >= n, E = (f) => m(l ? f : f[0] ?? null), D = u && o.length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-1.5", children: o.map((f) => /* @__PURE__ */ e.jsxs(t.Badge, { variant: "secondary", className: "cms:gap-1 cms:pr-1", children: [
    p(f) ?? `Term #${f}`,
    !(c && !l) && /* @__PURE__ */ e.jsx(
      "button",
      {
        type: "button",
        className: "cms:rounded-sm cms:p-0.5 cms:hover:bg-muted",
        "aria-label": `Remove ${p(f) ?? f}`,
        onClick: () => E(o.filter((H) => H !== f)),
        children: /* @__PURE__ */ e.jsx(Se, { className: "cms:size-3" })
      }
    )
  ] }, f)) }), L = u && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-sm", children: [
    /* @__PURE__ */ e.jsx(Ce, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
    /* @__PURE__ */ e.jsx(
      t.Input,
      {
        id: s,
        className: "cms:pl-9",
        placeholder: "Search terms",
        autoComplete: "off",
        "aria-invalid": r,
        value: b,
        onChange: (f) => j(f.target.value)
      }
    )
  ] });
  if (!l && !u) {
    const f = o[0], H = f === void 0 || x.some((O) => O.id === f);
    return /* @__PURE__ */ e.jsxs(t.Select, { value: f === void 0 ? _e : String(f), onValueChange: (O) => m(O === _e ? null : Number(O)), children: [
      /* @__PURE__ */ e.jsx(t.SelectTrigger, { id: s, className: "cms:w-full cms:max-w-sm", "aria-invalid": r, children: /* @__PURE__ */ e.jsx(t.SelectValue, { children: f === void 0 ? "None" : p(f) ?? `Term #${f}` }) }),
      /* @__PURE__ */ e.jsxs(t.SelectContent, { children: [
        !c && /* @__PURE__ */ e.jsx(t.SelectItem, { value: _e, children: "None" }),
        !H && f !== void 0 && /* @__PURE__ */ e.jsx(t.SelectItem, { value: String(f), children: p(f) ?? `Term #${f}` }),
        x.map((O) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: String(O.id), children: w(O) }, O.id))
      ] })
    ] });
  }
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    D,
    L,
    x.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: b.trim() ? "No terms match." : "Nothing to choose from yet." }) : l ? /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:max-h-72 cms:flex-col cms:gap-2 cms:overflow-auto", children: x.map((f) => {
      const H = o.includes(f.id);
      return /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx(
          t.Checkbox,
          {
            checked: H,
            disabled: !H && z,
            onCheckedChange: (O) => E(O ? [...o, f.id] : o.filter((W) => W !== f.id))
          }
        ),
        w(f)
      ] }, f.id);
    }) }) : /* @__PURE__ */ e.jsx("div", { role: "listbox", "aria-label": "Terms", className: "cms:flex cms:max-h-72 cms:flex-col cms:overflow-auto", children: x.map((f) => /* @__PURE__ */ e.jsx(
      t.Button,
      {
        type: "button",
        variant: o[0] === f.id ? "secondary" : "ghost",
        size: "sm",
        className: "cms:justify-start",
        role: "option",
        "aria-selected": o[0] === f.id,
        onClick: () => m(f.id),
        children: w(f)
      },
      f.id
    )) })
  ] });
}
const ga = 5;
let fa = 0;
const it = () => `f${++fa}`;
function ot(s) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function dt(s) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^[0-9_]+/, "").slice(0, 64);
}
function mt(s, a) {
  const l = new Set(a.map((r) => r.handle)), n = ot(s) || "field";
  let c = n;
  for (let r = 2; l.has(c); r++)
    c = `${n}_${r}`;
  return c;
}
function ut(s) {
  return (s ?? []).map(({ fields: a, ...l }) => ({
    ...l,
    key: it(),
    fields: ut(a),
    handleTouched: !0
  }));
}
function ht(s, a) {
  return s.map(({ key: l, handleTouched: n, fields: c, ...r }) => ({
    ...r,
    validation: (r.validation ?? []).map((i) => i.trim()).filter((i) => i !== ""),
    ...a(r.type) ? { fields: ht(c, a) } : {}
  }));
}
function ja(s, a, l) {
  return { key: it(), type: s, label: a, handle: mt(a, l), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function as(s, a, l) {
  if (s.handleTouched) return { ...s, label: a };
  const n = l.filter((c) => c.key !== s.key);
  return { ...s, label: a, handle: mt(a || s.type, n) };
}
function de(s, a) {
  const l = `${a}.`, n = {};
  for (const [c, r] of Object.entries(s))
    c.startsWith(l) && (n[c.slice(l.length)] = r);
  return n;
}
function J(s, a) {
  const l = s[a];
  return { ...de(s, a), ...l !== void 0 ? { "": l } : {} };
}
function we(s, a) {
  return Object.keys(s).filter((l) => l === a || l.startsWith(`${a}.`));
}
function ge(s, a) {
  return Object.keys(s).some((l) => l === a || l.startsWith(`${a}.`));
}
function xt(s, a, l) {
  return s.type === "fieldset" ? null : l?.includes(s.handle) ? `"${s.handle}" is used by the content itself; choose another handle.` : s.handle !== "" && a.some((n) => n.key !== s.key && n.type !== "fieldset" && n.handle === s.handle) ? `There is already a field "${s.handle}" here.` : null;
}
const Te = [
  { value: "equals", label: "is", needsValue: !0 },
  { value: "not_equals", label: "is not", needsValue: !0 },
  { value: "filled", label: "is filled in", needsValue: !1 },
  { value: "empty", label: "is empty", needsValue: !1 }
];
function ls(s) {
  return s === !0 ? "true" : s === !1 ? "false" : typeof s == "string" || typeof s == "number" ? String(s) : "";
}
function Ke(s, a) {
  const l = s.condition;
  if (!l) return !0;
  const n = a[l.field], c = n != null && n !== "" && n !== !1 && !(Array.isArray(n) && n.length === 0), r = (Array.isArray(n) ? n : [n]).map(ls).includes(ls(l.value));
  switch (l.operator) {
    case "equals":
      return r;
    case "not_equals":
      return !r;
    case "filled":
      return c;
    default:
      return !c;
  }
}
const Be = "__none";
function I({ message: s }) {
  return s ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: s }) : null;
}
function ze(s) {
  const a = s.config?.options;
  return Array.isArray(a) ? a.flatMap((l) => {
    if (typeof l == "string") return [{ value: l, label: l }];
    if (l && typeof l == "object" && typeof l.value == "string") {
      const { value: n, label: c } = l;
      return [{ value: n, label: c || n }];
    }
    return [];
  }) : [];
}
const ba = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function Ne(s) {
  if (s.label) return s.label;
  const a = s.handle.replace(/_/g, " ");
  return a.charAt(0).toUpperCase() + a.slice(1);
}
function le({ field: s, value: a, onChange: l, errors: n, id: c, content: r = !1 }) {
  const i = Ne(s), m = ba.includes(s.type) || ["select", "terms"].includes(s.type) && s.config?.multiple === !0;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", ...m ? { role: "group", "aria-labelledby": `${c}-label` } : {}, children: [
    s.type === "toggle" ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(t.Switch, { id: c, checked: a === !0, onCheckedChange: (d) => l(d) }),
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: c, children: i })
    ] }) : /* @__PURE__ */ e.jsxs(t.Label, { id: `${c}-label`, htmlFor: m ? void 0 : c, children: [
      i,
      s.required && /* @__PURE__ */ e.jsx("span", { className: "cms:text-destructive", children: " *" })
    ] }),
    /* @__PURE__ */ e.jsx(ya, { field: s, value: a, onChange: l, errors: n, id: c, content: r }),
    ["text", "textarea"].includes(s.type) && Z(s, "max") !== void 0 && /* @__PURE__ */ e.jsx(va, { length: typeof a == "string" ? [...a].length : 0, max: Z(s, "max") ?? 0 }),
    s.instructions && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s.instructions }),
    /* @__PURE__ */ e.jsx(I, { message: n[""] })
  ] });
}
function va({ length: s, max: a }) {
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
function ya({ field: s, value: a, onChange: l, errors: n, id: c, content: r }) {
  const i = n[""] !== void 0;
  switch (s.type) {
    case "toggle":
      return null;
    case "file":
      return /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Visitors attach a file here when they send a form." });
    case "textarea":
      return /* @__PURE__ */ e.jsx(
        t.Textarea,
        {
          id: c,
          "aria-invalid": i,
          value: typeof a == "string" ? a : "",
          rows: Z(s, "rows") ?? 4,
          onChange: (m) => l(m.target.value)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ e.jsx(t.RichTextEditor, { id: c, labelledBy: `${c}-label`, invalid: i, value: typeof a == "string" ? a : "", onChange: l });
    case "number": {
      const m = ra(a);
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(
          t.Input,
          {
            id: c,
            type: "number",
            className: "cms:max-w-48",
            "aria-invalid": i,
            "aria-describedby": m ? `${c}-grouped` : void 0,
            value: typeof a == "number" ? String(a) : typeof a == "string" ? a : "",
            min: Z(s, "min"),
            max: Z(s, "max"),
            step: Z(s, "step") ?? "any",
            onChange: (d) => l(d.target.value === "" ? null : Number(d.target.value))
          }
        ),
        m && /* @__PURE__ */ e.jsx("span", { id: `${c}-grouped`, className: "cms:text-sm cms:tabular-nums cms:text-muted-foreground", children: m })
      ] });
    }
    case "date": {
      const m = s.config?.time === !0;
      return /* @__PURE__ */ e.jsx(
        t.DatePicker,
        {
          id: c,
          withTime: m,
          invalid: i,
          required: s.required === !0,
          value: es(na(a, m)),
          onChange: (d) => l(es(d ?? ""))
        }
      );
    }
    case "select":
      return s.config?.multiple === !0 ? /* @__PURE__ */ e.jsx(
        Sa,
        {
          options: ze(s),
          value: Array.isArray(a) ? a.map(String) : [],
          onChange: l,
          empty: typeof s.config?.empty == "string" ? s.config.empty : void 0,
          inTickOrder: s.config?.in_tick_order === !0
        }
      ) : /* @__PURE__ */ e.jsx(
        Ca,
        {
          options: ze(s),
          value: typeof a == "string" ? a : null,
          onChange: l,
          id: c,
          empty: ca(ze(s), s.required === !0, typeof s.config?.default == "string" && s.config.default !== "", typeof a == "string" && a !== "")
        }
      );
    case "terms": {
      const m = s.config?.multiple === !0, d = Array.isArray(a) ? a.filter((o) => typeof o == "number") : typeof a == "number" ? a : null;
      return /* @__PURE__ */ e.jsx(
        pa,
        {
          id: c,
          taxonomy: typeof s.taxonomy == "string" ? s.taxonomy : null,
          multiple: m,
          max: Z(s, "max") ?? null,
          required: s.required === !0,
          invalid: i,
          value: m ? Array.isArray(d) ? d : [] : typeof d == "number" ? d : null,
          onChange: l
        }
      );
    }
    case "entries":
      return /* @__PURE__ */ e.jsx(
        ke,
        {
          id: c,
          invalid: i,
          multiple: s.config?.multiple === !0,
          max: Z(s, "max") ?? null,
          collections: s.collections ?? [],
          onChange: l,
          value: typeof a == "number" || Array.isArray(a) && a.every((m) => typeof m == "number") ? a : null
        }
      );
    case "link":
      return /* @__PURE__ */ e.jsx(ka, { label: Ne(s), value: ie(a), onChange: l, errors: n, id: c, collections: s.collections ?? [] });
    case "media":
      return /* @__PURE__ */ e.jsx(
        t.MediaPickerInput,
        {
          id: c,
          invalid: i,
          disabled: !1,
          multiple: s.config?.multiple === !0,
          max: Z(s, "max") ?? null,
          types: Array.isArray(s.config?.types) ? s.config.types : [],
          value: typeof a == "number" || Array.isArray(a) && a.every((m) => typeof m == "number") ? a : null,
          onChange: l
        }
      );
    case "group":
      return /* @__PURE__ */ e.jsx(oe, { fields: s.fields ?? [], value: ie(a), onChange: l, errors: n, id: c, content: r });
    case "repeater":
      return /* @__PURE__ */ e.jsx(wa, { field: s, value: Array.isArray(a) ? a : [], onChange: l, errors: n, id: c, content: r });
    case "flexible":
      return /* @__PURE__ */ e.jsx($a, { field: s, value: Array.isArray(a) ? a : [], onChange: l, errors: n, id: c });
    default:
      return /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: c,
          "aria-invalid": i,
          value: typeof a == "string" ? a : "",
          placeholder: Na(s, "placeholder"),
          onChange: (m) => l(m.target.value)
        }
      );
  }
}
function Z(s, a) {
  const l = s.config?.[a];
  return typeof l == "number" ? l : void 0;
}
function Na(s, a) {
  const l = s.config?.[a];
  return typeof l == "string" ? l : void 0;
}
function oe({ fields: s, value: a, onChange: l, errors: n, id: c, content: r, bare: i = !1 }) {
  return /* @__PURE__ */ e.jsx("div", { className: i ? "cms:flex cms:flex-col cms:gap-6" : "cms:flex cms:flex-col cms:gap-4 cms:rounded-lg cms:border cms:p-4", children: s.filter((m) => Ke(m, a)).map((m) => m.shared ? (
    // Greyed out; the form says once, at the top, where to edit shared fields.
    /* @__PURE__ */ e.jsx("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1 cms:opacity-60", title: "Shared by all languages: edit it in the main language", children: /* @__PURE__ */ e.jsx(le, { id: `${c}-${m.handle}`, field: m, value: a[m.handle], content: r, errors: {}, onChange: () => {
    } }) }, m.handle)
  ) : /* @__PURE__ */ e.jsx(
    le,
    {
      id: `${c}-${m.handle}`,
      field: m,
      value: a[m.handle],
      content: r,
      errors: J(n, m.handle),
      onChange: (d) => l({ ...a, [m.handle]: d })
    },
    m.handle
  )) });
}
function Ca({ options: s, value: a, onChange: l, id: n, empty: c }) {
  return /* @__PURE__ */ e.jsxs(t.Select, { value: a ?? Be, onValueChange: (r) => l(r === Be ? null : r), children: [
    /* @__PURE__ */ e.jsx(t.SelectTrigger, { id: n, className: "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
    /* @__PURE__ */ e.jsxs(t.SelectContent, { children: [
      c && /* @__PURE__ */ e.jsx(t.SelectItem, { value: Be, children: "None" }),
      s.map((r) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: r.value, children: r.label }, r.value))
    ] })
  ] });
}
function Sa({ options: s, value: a, onChange: l, empty: n, inTickOrder: c = !1 }) {
  return s.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: n ?? "Nothing to choose from yet." }) : /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2", children: s.map((r) => /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
    /* @__PURE__ */ e.jsx(
      t.Checkbox,
      {
        checked: a.includes(r.value),
        onCheckedChange: (i) => l(i ? c ? [...a.filter((m) => m !== r.value), r.value] : s.map((m) => m.value).filter((m) => m === r.value || a.includes(m)) : a.filter((m) => m !== r.value))
      }
    ),
    r.label,
    c && a.includes(r.value) && /* @__PURE__ */ e.jsxs("span", { className: "cms:text-xs cms:text-muted-foreground", "aria-label": `number ${a.indexOf(r.value) + 1}`, children: [
      "#",
      a.indexOf(r.value) + 1
    ] })
  ] }, r.value)) });
}
function ka({ label: s, value: a, onChange: l, errors: n, id: c, collections: r }) {
  const i = a.type === "entry" ? "entry" : "url", m = (d) => {
    const o = { ...a, type: i, ...d }, x = o.type === "entry" ? typeof o.entry_id != "number" : o.url === "" || o.url === void 0 || o.url === null;
    l(x ? o.label || o.new_tab ? o : null : o);
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("div", { role: "radiogroup", "aria-label": `${s}: link to`, className: "cms:inline-flex cms:w-fit cms:rounded-md cms:border cms:p-0.5", children: ["url", "entry"].map((d) => /* @__PURE__ */ e.jsx(
      t.Button,
      {
        type: "button",
        size: "sm",
        role: "radio",
        "aria-checked": i === d,
        variant: i === d ? "secondary" : "ghost",
        onClick: () => m({ type: d, url: d === "url" ? a.url : void 0, entry_id: d === "entry" ? a.entry_id : void 0 }),
        children: d === "url" ? "Address" : "Entry"
      },
      d
    )) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-2 cms:md:grid-cols-[2fr_1fr_auto] cms:md:items-start", children: [
      i === "url" ? /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: c,
          "aria-label": `${s}: address`,
          placeholder: "https://… or /about",
          value: typeof a.url == "string" ? a.url : "",
          onChange: (d) => m({ url: d.target.value }),
          "aria-invalid": n.url !== void 0
        }
      ) : /* @__PURE__ */ e.jsx(
        ke,
        {
          id: c,
          invalid: n.entry_id !== void 0,
          multiple: !1,
          max: null,
          collections: r,
          value: typeof a.entry_id == "number" ? a.entry_id : null,
          onChange: (d) => m({ entry_id: typeof d == "number" ? d : void 0 })
        }
      ),
      /* @__PURE__ */ e.jsx(
        t.Input,
        {
          "aria-label": `${s}: link text`,
          placeholder: i === "entry" ? "Link text (the entry's title)" : "Link text",
          value: typeof a.label == "string" ? a.label : "",
          onChange: (d) => m({ label: d.target.value })
        }
      ),
      /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:h-9 cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx(t.Checkbox, { checked: a.new_tab === !0, onCheckedChange: (d) => m({ new_tab: d }) }),
        "New tab"
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ e.jsx(I, { message: n.url ?? n.entry_id ?? n.label ?? n.type }) })
    ] })
  ] });
}
function ns(s, a) {
  return !a && (s.fields ?? []).every((l) => l.type === "text");
}
function pt(s) {
  const a = $.useRef([]);
  return a.current = ua(a.current, s), {
    keys: a.current,
    remove: (l) => {
      a.current = a.current.filter((n, c) => c !== l);
    },
    move: (l, n) => {
      a.current = t.moveItem(a.current, l, n);
    }
  };
}
function gt() {
  const [s, a] = $.useState(() => /* @__PURE__ */ new Set());
  return {
    isCollapsed: (l, n) => !n && s.has(l),
    toggle: (l) => a((n) => {
      const c = new Set(n);
      return c.delete(l) || c.add(l), c;
    }),
    setAll: (l, n) => a(n ? new Set(l) : /* @__PURE__ */ new Set()),
    anyOpen: (l) => l.some((n) => !s.has(n))
  };
}
function ft({ keys: s, folding: a }) {
  if (s.length < 2) return null;
  const l = a.anyOpen(s);
  return /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => a.setAll(s, l), children: [
    l ? /* @__PURE__ */ e.jsx(Ut, {}) : /* @__PURE__ */ e.jsx(Kt, {}),
    " ",
    l ? "Collapse all" : "Expand all"
  ] });
}
function wa({ field: s, value: a, onChange: l, errors: n, id: c, content: r = !1 }) {
  const i = s.fields ?? [], m = a.map(ie), d = pt(m.length), o = (j, N) => l(m.map((k, C) => C === j ? N : k)), x = (j) => {
    d.remove(j), l(m.filter((N, k) => k !== j));
  }, g = (s.label || "row").toLowerCase().replace(/s$/, ""), u = g.charAt(0).toUpperCase() + g.slice(1), h = m.map((j, N) => ({ row: j, index: N, key: d.keys[N] ?? String(N) })), b = gt();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(
      t.SortableList,
      {
        items: h,
        getId: (j) => j.key,
        getLabel: (j) => `${g} ${j.index + 1}`,
        onReorder: (j, N, k) => {
          d.move(N, k), l(j.map((C) => C.row));
        },
        children: ({ row: j, index: N, key: k }, { handle: C }) => ns(s, r) ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(t.SortableHandle, { ...C, label: `Move ${g} ${N + 1}`, className: "cms:mt-1" }),
          i.map((y) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
            /* @__PURE__ */ e.jsx(
              t.Input,
              {
                "aria-label": y.label || y.handle,
                placeholder: y.label || y.handle,
                value: typeof j[y.handle] == "string" ? j[y.handle] : "",
                onChange: (p) => o(N, { ...j, [y.handle]: p.target.value })
              }
            ),
            /* @__PURE__ */ e.jsx(I, { message: n[`${N}.${y.handle}`] })
          ] }, y.handle)),
          /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": `Remove ${g} ${N + 1}`, onClick: () => x(N), children: /* @__PURE__ */ e.jsx(K, {}) })
        ] }) : (() => {
          const y = J(n, String(N)), p = b.isCollapsed(k, Object.keys(y).length > 0);
          return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              jt,
              {
                label: `${u} ${N + 1}`,
                summary: Ue(i, j),
                handle: C,
                onRemove: () => x(N),
                collapsed: p,
                onToggle: () => b.toggle(k),
                controls: `${c}-${N}-fields`,
                hidden: r ? j._hidden === !0 : void 0,
                onHidden: (B) => o(N, { ...j, _hidden: B })
              }
            ),
            /* @__PURE__ */ e.jsx("div", { id: `${c}-${N}-fields`, hidden: p, children: !p && /* @__PURE__ */ e.jsx(oe, { fields: i, value: j, onChange: (B) => o(N, B), errors: y, id: `${c}-${N}`, content: r }) })
          ] });
        })()
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", size: "sm", onClick: () => l([...m, r ? ia() : {}]), children: [
        /* @__PURE__ */ e.jsx(ee, {}),
        " Add ",
        g
      ] }),
      !ns(s, r) && /* @__PURE__ */ e.jsx(ft, { keys: h.map((j) => j.key), folding: b })
    ] })
  ] });
}
function $a({ field: s, value: a, onChange: l, errors: n, id: c }) {
  const r = s.blocks ?? [], i = a.map(ie), m = pt(i.length), d = (u, h) => l(i.map((b, j) => j === u ? h : b)), o = (u) => {
    m.remove(u), l(i.filter((h, b) => b !== u));
  }, x = i.map((u, h) => ({ block: u, index: h, key: m.keys[h] ?? String(h) })), g = gt();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    /* @__PURE__ */ e.jsx(
      t.SortableList,
      {
        items: x,
        getId: (u) => u.key,
        className: "cms:gap-3",
        getLabel: (u) => `${r.find((h) => h.type === u.block.type)?.label ?? String(u.block.type)} block`,
        onReorder: (u, h, b) => {
          m.move(h, b), l(u.map((j) => j.block));
        },
        children: ({ block: u, index: h, key: b }, { handle: j }) => {
          const N = r.find((y) => y.type === u.type), k = J(n, `${h}.values`), C = g.isCollapsed(b, Object.keys(k).length > 0 || n[`${h}.type`] !== void 0);
          return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              jt,
              {
                label: N?.label ?? String(u.type),
                summary: N ? Ue(N.fields, ie(u.values)) : null,
                badge: !0,
                handle: j,
                onRemove: () => o(h),
                collapsed: C,
                onToggle: () => g.toggle(b),
                controls: `${c}-${h}-fields`,
                hidden: u.hidden === !0,
                onHidden: (y) => d(h, { ...u, hidden: y })
              }
            ),
            /* @__PURE__ */ e.jsx("div", { id: `${c}-${h}-fields`, hidden: C, children: C ? null : N ? /* @__PURE__ */ e.jsx(
              oe,
              {
                fields: N.fields,
                value: ie(u.values),
                onChange: (y) => d(h, { ...u, values: y }),
                errors: k,
                id: `${c}-${h}`,
                content: !0
              }
            ) : /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: "This kind of block no longer exists. Its values are kept." }) }),
            /* @__PURE__ */ e.jsx(I, { message: n[`${h}.type`] })
          ] });
        }
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(t.DropdownMenu, { children: [
        /* @__PURE__ */ e.jsx(t.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", size: "sm", disabled: r.length === 0, children: [
          /* @__PURE__ */ e.jsx(ee, {}),
          " Add block"
        ] }) }),
        /* @__PURE__ */ e.jsx(t.DropdownMenuContent, { align: "start", children: r.map((u) => /* @__PURE__ */ e.jsx(t.DropdownMenuItem, { onSelect: () => l([...i, oa(u.type)]), children: u.label }, u.type)) })
      ] }),
      /* @__PURE__ */ e.jsx(ft, { keys: x.map((u) => u.key), folding: g })
    ] })
  ] });
}
function jt({ label: s, summary: a, badge: l = !1, handle: n, onRemove: c, collapsed: r, onToggle: i, controls: m, hidden: d, onHidden: o }) {
  const x = r ? xe : Re, g = a ? `${s}: ${a}` : s;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(t.SortableHandle, { ...n, label: `Move ${g}` }),
    /* @__PURE__ */ e.jsxs(
      "button",
      {
        type: "button",
        onClick: i,
        "aria-expanded": !r,
        "aria-controls": m,
        className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:rounded-md cms:text-left cms:outline-none cms:focus-visible:ring-2 cms:focus-visible:ring-ring",
        children: [
          /* @__PURE__ */ e.jsx(x, { className: "cms:size-4 cms:shrink-0 cms:text-muted-foreground", "aria-hidden": !0 }),
          l ? /* @__PURE__ */ e.jsx(t.Badge, { variant: "secondary", children: s }) : /* @__PURE__ */ e.jsx("span", { className: "cms:shrink-0 cms:text-sm cms:font-medium", children: s }),
          a && /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:text-sm cms:text-muted-foreground", children: a }),
          /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: r ? "(collapsed)" : "" })
        ]
      }
    ),
    d !== void 0 && /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:shrink-0 cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", title: "Off: kept here, but left out of the page", children: [
      /* @__PURE__ */ e.jsx(t.Switch, { checked: !d, onCheckedChange: (u) => o(!u), "aria-label": `${g}: visible on site` }),
      "Visible on site"
    ] }),
    /* @__PURE__ */ e.jsx(
      t.Button,
      {
        type: "button",
        variant: "ghost",
        size: "icon",
        className: "cms:size-8 cms:shrink-0 cms:text-destructive",
        "aria-label": `Remove ${g}`,
        onClick: c,
        children: /* @__PURE__ */ e.jsx(K, {})
      }
    )
  ] });
}
function bt({ fields: s, onChange: a, types: l, errors: n, depth: c = 1, idPrefix: r = "field", reserved: i, locales: m = [] }) {
  const [d, o] = $.useState(() => /* @__PURE__ */ new Set()), x = (h) => o((b) => {
    const j = new Set(b);
    return j.has(h) ? j.delete(h) : j.add(h), j;
  }), g = (h, b) => a(s.map((j, N) => N === h ? b : j)), u = (h) => {
    const b = ja(h.type, h.label, s);
    a([...s, b]), o(/* @__PURE__ */ new Set([b.key]));
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:border-dashed cms:p-4 cms:text-sm cms:text-muted-foreground", children: "No fields yet." }),
    s.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:justify-end", children: d.size > 0 ? /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => o(/* @__PURE__ */ new Set()), children: "Close all" }) : /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => o(new Set(s.map((h) => h.key))), children: "Open all" }) }),
    /* @__PURE__ */ e.jsx(t.SortableList, { items: s, getId: (h) => h.key, getLabel: (h) => h.label || h.handle, onReorder: (h) => a(h), children: (h, { index: b, handle: j, isOverlay: N }) => {
      const k = l.find((B) => B.type === h.type), C = ge(n, String(b)) || xt(h, s, i) !== null, y = !N && (d.has(h.key) || C), p = `${r}-${h.key}`;
      return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${C ? "cms:border-destructive" : ""}`, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:p-2", children: [
          /* @__PURE__ */ e.jsx(t.SortableHandle, { ...j, label: `Move ${h.label || h.handle}` }),
          /* @__PURE__ */ e.jsx(
            t.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-expanded": y,
              "aria-controls": p,
              "aria-label": `${y ? "Close" : "Open"} ${h.label || h.handle}`,
              onClick: () => x(h.key),
              children: y ? /* @__PURE__ */ e.jsx(Re, {}) : /* @__PURE__ */ e.jsx(xe, {})
            }
          ),
          /* @__PURE__ */ e.jsxs("button", { type: "button", className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:text-left", onClick: () => x(h.key), children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: h.label || h.handle }),
            /* @__PURE__ */ e.jsx("code", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", children: h.handle })
          ] }),
          h.required && /* @__PURE__ */ e.jsx(t.Badge, { variant: "outline", children: "Required" }),
          /* @__PURE__ */ e.jsx(t.Badge, { variant: "secondary", children: k?.label ?? h.type }),
          k?.hasChildren && h.fields.length > 0 && !y && /* @__PURE__ */ e.jsxs("span", { className: "cms:text-xs cms:text-muted-foreground", children: [
            h.fields.length,
            " inside"
          ] }),
          /* @__PURE__ */ e.jsx(
            t.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Remove ${h.label || h.handle}`,
              onClick: () => a(s.filter((B, w) => w !== b)),
              children: /* @__PURE__ */ e.jsx(K, {})
            }
          )
        ] }),
        y && /* @__PURE__ */ e.jsx(
          Da,
          {
            id: p,
            field: h,
            type: k,
            siblings: s,
            onChange: (B) => g(b, B),
            types: l,
            errors: de(n, String(b)),
            depth: c,
            reserved: i,
            locales: m
          }
        )
      ] });
    } }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(t.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(t.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", size: "sm", children: [
        /* @__PURE__ */ e.jsx(ee, {}),
        " Add field"
      ] }) }),
      /* @__PURE__ */ e.jsx(t.DropdownMenuContent, { align: "start", children: l.filter((h) => !h.hasChildren || c < ga).map((h) => /* @__PURE__ */ e.jsx(t.DropdownMenuItem, { onSelect: () => u(h), children: h.label }, h.type)) })
    ] }) })
  ] });
}
const te = { default: "__default", yes: "yes", no: "no" };
function Da({ id: s, field: a, type: l, siblings: n, onChange: c, types: r, errors: i, depth: m, reserved: d, locales: o }) {
  const x = a.config ?? {}, g = xt(a, n, d);
  return a.type === "fieldset" ? /* @__PURE__ */ e.jsxs("div", { id: s, className: "cms:flex cms:flex-col cms:gap-4 cms:border-t cms:p-4", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${s}-label`, children: "Label" }),
        /* @__PURE__ */ e.jsx(t.Input, { id: `${s}-label`, value: a.label ?? "", onChange: (u) => c(as(a, u.target.value, n)) }),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Only shown here, in the builder." })
      ] }),
      l?.settings.map((u) => /* @__PURE__ */ e.jsx(
        le,
        {
          id: `${s}-config-${u.handle}`,
          field: u,
          value: x[u.handle],
          errors: J(i, `config.${u.handle}`),
          onChange: (h) => c({ ...a, config: { ...x, [u.handle]: h } })
        },
        u.handle
      ))
    ] }),
    /* @__PURE__ */ e.jsx(I, { message: i.handle ?? i.type })
  ] }) : /* @__PURE__ */ e.jsxs("div", { id: s, className: "cms:flex cms:flex-col cms:gap-4 cms:border-t cms:p-4", children: [
    !l && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-destructive", children: [
      'The field type "',
      a.type,
      `" isn't registered. Its data is kept; register the type or remove the field.`
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${s}-label`, children: "Label" }),
        /* @__PURE__ */ e.jsx(t.Input, { id: `${s}-label`, value: a.label ?? "", onChange: (u) => c(as(a, u.target.value, n)) }),
        /* @__PURE__ */ e.jsx(I, { message: i.label })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${s}-handle`, children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          t.Input,
          {
            id: `${s}-handle`,
            className: "cms:font-mono",
            value: a.handle,
            onChange: (u) => c({ ...a, handle: dt(u.target.value), handleTouched: !0 })
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "How templates read it. Renaming it hides values saved under the old one." }),
        /* @__PURE__ */ e.jsx(I, { message: i.handle ?? g ?? void 0 })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${s}-instructions`, children: "Instructions" }),
      /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: `${s}-instructions`,
          value: a.instructions ?? "",
          placeholder: "Shown under the field to editors",
          onChange: (u) => c({ ...a, instructions: u.target.value || null })
        }
      ),
      /* @__PURE__ */ e.jsx(I, { message: i.instructions })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-6", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(t.Switch, { id: `${s}-required`, checked: a.required === !0, onCheckedChange: (u) => c({ ...a, required: u }) }),
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${s}-required`, children: "Required" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${s}-translatable`, children: "Per language" }),
        /* @__PURE__ */ e.jsxs(
          t.Select,
          {
            value: a.translatable === !0 ? te.yes : a.translatable === !1 ? te.no : te.default,
            onValueChange: (u) => c({ ...a, translatable: u === te.yes ? !0 : u === te.no ? !1 : null }),
            children: [
              /* @__PURE__ */ e.jsx(t.SelectTrigger, { id: `${s}-translatable`, className: "cms:w-48", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
              /* @__PURE__ */ e.jsxs(t.SelectContent, { children: [
                /* @__PURE__ */ e.jsx(t.SelectItem, { value: te.default, children: "As the type decides" }),
                /* @__PURE__ */ e.jsx(t.SelectItem, { value: te.yes, children: "Yes, translated" }),
                /* @__PURE__ */ e.jsx(t.SelectItem, { value: te.no, children: "No, shared" })
              ] })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(Ta, { id: s, field: a, siblings: n, onChange: c, errors: de(i, "condition") }),
    o.length > 0 && /* @__PURE__ */ e.jsx(_a, { id: s, field: a, locales: o, onChange: c, errors: de(i, "translations") }),
    (l?.settings.length ?? 0) > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: l?.settings.map((u) => /* @__PURE__ */ e.jsx(
      le,
      {
        id: `${s}-config-${u.handle}`,
        field: u,
        value: x[u.handle],
        errors: J(i, `config.${u.handle}`),
        onChange: (h) => c({ ...a, config: { ...x, [u.handle]: h } })
      },
      u.handle
    )) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${s}-validation`, children: "Extra rules" }),
      /* @__PURE__ */ e.jsx(
        t.Textarea,
        {
          id: `${s}-validation`,
          rows: 2,
          className: "cms:font-mono",
          value: (a.validation ?? []).join(`
`),
          onChange: (u) => c({ ...a, validation: u.target.value.split(`
`) })
        }
      ),
      /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
        "Optional checks, one per line, such as ",
        /* @__PURE__ */ e.jsx("code", { children: "email" }),
        " or ",
        /* @__PURE__ */ e.jsx("code", { children: "max:100" }),
        " (for developers: Laravel validation rules)."
      ] }),
      /* @__PURE__ */ e.jsx(I, { message: i.validation ?? Object.entries(i).find(([u]) => u.startsWith("validation."))?.[1] })
    ] }),
    l?.hasChildren && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(t.Label, { children: "Fields inside" }),
      /* @__PURE__ */ e.jsx(
        bt,
        {
          fields: a.fields,
          onChange: (u) => c({ ...a, fields: u }),
          types: r,
          errors: de(i, "fields"),
          depth: m + 1,
          idPrefix: s,
          locales: o
        }
      ),
      /* @__PURE__ */ e.jsx(I, { message: i.fields })
    ] }),
    /* @__PURE__ */ e.jsx(I, { message: i.type })
  ] });
}
function _a({ id: s, field: a, locales: l, onChange: n, errors: c }) {
  const r = a.translations ?? {}, i = a.type === "select" && Array.isArray(a.config?.options) ? a.config.options.filter((o) => typeof o?.value == "string" && o.value !== "") : [], m = (o, x) => {
    const g = { ...r, [o]: { ...r[o], ...x } };
    n({ ...a, translations: g });
  }, d = Object.entries(c).find(([, o]) => o)?.[1];
  return /* @__PURE__ */ e.jsxs("details", { className: "cms:rounded-lg cms:border cms:p-3", open: Object.keys(r).length > 0 || d !== void 0, children: [
    /* @__PURE__ */ e.jsx("summary", { className: "cms:cursor-pointer cms:text-sm cms:font-medium", children: "In other languages" }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:mt-2 cms:text-sm cms:text-muted-foreground", children: "What visitors read in each language, as forms show it. Empty: as above." }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:mt-3 cms:flex cms:flex-col cms:gap-4", children: l.map(({ code: o, name: x }) => /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-3 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(t.Label, { htmlFor: `${s}-label-${o}`, children: [
          "Label (",
          x,
          ")"
        ] }),
        /* @__PURE__ */ e.jsx(
          t.Input,
          {
            id: `${s}-label-${o}`,
            value: r[o]?.label ?? "",
            placeholder: a.label ?? "",
            onChange: (g) => m(o, { label: g.target.value })
          }
        )
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(t.Label, { htmlFor: `${s}-instructions-${o}`, children: [
          "Instructions (",
          x,
          ")"
        ] }),
        /* @__PURE__ */ e.jsx(
          t.Input,
          {
            id: `${s}-instructions-${o}`,
            value: r[o]?.instructions ?? "",
            placeholder: a.instructions ?? "",
            onChange: (g) => m(o, { instructions: g.target.value })
          }
        )
      ] }),
      i.length > 0 && /* @__PURE__ */ e.jsxs("fieldset", { className: "cms:flex cms:flex-col cms:gap-2 cms:md:col-span-2", children: [
        /* @__PURE__ */ e.jsxs("legend", { className: "cms:text-sm cms:font-medium", children: [
          "Options (",
          x,
          ")"
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-2 cms:sm:grid-cols-2", children: i.map((g) => {
          const u = String(g.value);
          return /* @__PURE__ */ e.jsx(
            t.Input,
            {
              "aria-label": `${u} (${x})`,
              value: r[o]?.options?.[u] ?? "",
              placeholder: typeof g.label == "string" && g.label !== "" ? g.label : u,
              onChange: (h) => m(o, { options: { ...r[o]?.options, [u]: h.target.value } })
            },
            u
          );
        }) })
      ] })
    ] }, o)) }),
    /* @__PURE__ */ e.jsx(I, { message: d })
  ] });
}
const Le = "__always";
function Ta({ id: s, field: a, siblings: l, onChange: n, errors: c }) {
  const r = l.filter((o) => o.key !== a.key && o.handle !== ""), i = a.condition ?? null, m = Te.find((o) => o.value === i?.operator) ?? Te[0], d = (o) => n({ ...a, condition: o === null ? null : { field: i?.field ?? r[0]?.handle ?? "", operator: i?.operator ?? "equals", value: i?.value ?? "", ...o } });
  return r.length === 0 && i === null ? null : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${s}-condition`, children: "Show" }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(t.Select, { value: i?.field ?? Le, onValueChange: (o) => d(o === Le ? null : { field: o }), children: [
        /* @__PURE__ */ e.jsx(t.SelectTrigger, { id: `${s}-condition`, className: "cms:w-56", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
        /* @__PURE__ */ e.jsxs(t.SelectContent, { children: [
          /* @__PURE__ */ e.jsx(t.SelectItem, { value: Le, children: "Always" }),
          r.map((o) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: o.handle, children: [
            "When ",
            o.label || o.handle
          ] }, o.key))
        ] })
      ] }),
      i && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(t.Select, { value: m.value, onValueChange: (o) => d({ operator: o }), children: [
          /* @__PURE__ */ e.jsx(t.SelectTrigger, { "aria-label": "How to compare", className: "cms:w-36", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(t.SelectContent, { children: Te.map((o) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: o.value, children: o.label }, o.value)) })
        ] }),
        m.needsValue && /* @__PURE__ */ e.jsx(
          t.Input,
          {
            "aria-label": "Value",
            className: "cms:w-48",
            placeholder: "a value, or true / false",
            value: String(i.value ?? ""),
            onChange: (o) => d({ value: o.target.value })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "A hidden field isn't required, and keeps what it had." }),
    /* @__PURE__ */ e.jsx(I, { message: c.field ?? c.operator ?? c.value ?? c[""] })
  ] });
}
function Ba(s, a) {
  return s === "fieldset" ? a ? "Set when it was created: flexible blocks keep it with what they hold." : "Lowercase letters, digits and underscores. It can't change later: flexible blocks keep it with what they hold." : a ? "Changing it updates the collections, taxonomies, global sets, forms and entries that use it." : "Lowercase letters, digits and underscores, made from the title until you type one.";
}
function za({ kind: s = "blueprint", blueprint: a, fieldTypes: l, locales: n = [], usedBy: c = [], reserved: r = [] }) {
  const i = s === "fieldset" ? "Fieldset" : "Blueprint", m = T(s === "fieldset" ? "cms/fieldsets" : "cms/blueprints"), d = a ? a.title : `New ${i.toLowerCase()}`;
  t.useBreadcrumbs([{ label: `${i}s`, href: m }, { label: d }]);
  const [o, x] = ne(), g = S.useForm({ title: a?.title ?? "", handle: a?.handle ?? "" }), [u, h] = $.useState(a !== null), [b, j] = $.useState(() => ut(a?.fields)), N = (D) => l.find((L) => L.type === D)?.hasChildren === !0, k = g.errors, [C, y] = $.useState(() => JSON.stringify(b)), p = g.isDirty || JSON.stringify(b) !== C, B = () => {
    g.setDefaults(), y(JSON.stringify(b));
  }, w = () => {
    g.processing || (g.transform((D) => ({
      // A blueprint's handle can change (RenameBlueprint); a fieldset's can't: flexible blocks store it.
      ...a ? s === "blueprint" ? { title: D.title, handle: D.handle } : { title: D.title } : D,
      fields: ht(b, N)
    })), a ? g.put(`${m}/${a.id}`, { preserveScroll: !0, onSuccess: B }) : g.post(m, { onSuccess: B }));
  }, z = (D) => {
    D.preventDefault(), w();
  };
  t.useUnsavedChanges(p, w);
  const E = () => a && o(
    `Delete the ${i.toLowerCase()} "${a.title}"? Content keeps its values.`,
    () => S.router.delete(`${m}/${a.id}`, { preserveScroll: !0 })
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: z, className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: d }),
    x,
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: d,
        back: { href: m, label: `Back to ${i.toLowerCase()}s` },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          a && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "outline", size: "icon", className: "cms:text-destructive", "aria-label": `Delete ${d}`, onClick: E, children: /* @__PURE__ */ e.jsx(K, {}) }),
          /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", disabled: g.processing, children: [
            g.processing && /* @__PURE__ */ e.jsx(me, { className: "cms:animate-spin" }),
            a ? "Save" : `Create ${i.toLowerCase()}`
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(I, { message: k.blueprint ?? k.fieldset }),
    /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsxs(t.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "title", children: "Title" }),
        /* @__PURE__ */ e.jsx(t.Input, { id: "title", value: g.data.title, required: !0, onChange: (D) => {
          g.setData((L) => ({ ...L, title: D.target.value, handle: u ? L.handle : ot(D.target.value) }));
        } }),
        /* @__PURE__ */ e.jsx(I, { message: k.title })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "handle", children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          t.Input,
          {
            id: "handle",
            className: "cms:font-mono",
            value: g.data.handle,
            disabled: a !== null && s === "fieldset",
            required: !0,
            spellCheck: !1,
            onChange: (D) => {
              h(!0), g.setData("handle", dt(D.target.value));
            }
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: Ba(s, a !== null) }),
        /* @__PURE__ */ e.jsx(I, { message: k.handle })
      ] })
    ] }) }),
    c.length > 0 && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      "Used by ",
      c.join(", "),
      ". Changes show there at once."
    ] }),
    /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-3", "aria-labelledby": "fields-heading", children: [
      /* @__PURE__ */ e.jsx("h2", { id: "fields-heading", className: "cms:text-lg cms:font-medium", children: "Fields" }),
      /* @__PURE__ */ e.jsx(bt, { fields: b, onChange: j, types: l, errors: de(k, "fields"), reserved: s === "blueprint" ? r : void 0, locales: n.slice(1) }),
      /* @__PURE__ */ e.jsx(I, { message: k.fields })
    ] })
  ] });
}
function vt({ noun: s, base: a, rows: l, intro: n }) {
  const c = `${s}s`;
  t.useBreadcrumbs([{ label: c }]);
  const [r, i] = ne();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: c }),
    i,
    /* @__PURE__ */ e.jsx(t.PageHeader, { title: c, description: n, actions: /* @__PURE__ */ e.jsx(t.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(S.Link, { href: `${a}/create`, children: [
      /* @__PURE__ */ e.jsx(ee, {}),
      " New ",
      s.toLowerCase()
    ] }) }) }),
    /* @__PURE__ */ e.jsx(t.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(t.Table, { children: [
      /* @__PURE__ */ e.jsx(t.TableHeader, { children: /* @__PURE__ */ e.jsxs(t.TableRow, { children: [
        /* @__PURE__ */ e.jsx(t.TableHead, { children: "Title" }),
        /* @__PURE__ */ e.jsx(t.TableHead, { children: "Handle" }),
        /* @__PURE__ */ e.jsx(t.TableHead, { children: "Fields" }),
        l.some((m) => m.usedBy) && /* @__PURE__ */ e.jsx(t.TableHead, { children: "Used by" }),
        /* @__PURE__ */ e.jsx(t.TableHead, { className: "cms:w-12", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: "Actions" }) })
      ] }) }),
      /* @__PURE__ */ e.jsxs(t.TableBody, { children: [
        l.length === 0 && /* @__PURE__ */ e.jsx(t.TableRow, { children: /* @__PURE__ */ e.jsxs(t.TableCell, { colSpan: 5, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: [
          "No ",
          c.toLowerCase(),
          " yet."
        ] }) }),
        l.map((m) => /* @__PURE__ */ e.jsxs(t.TableRow, { children: [
          /* @__PURE__ */ e.jsx(t.TableCell, { children: /* @__PURE__ */ e.jsx(S.Link, { href: `${a}/${m.id}/edit`, className: "cms:font-medium cms:hover:underline", children: m.title }) }),
          /* @__PURE__ */ e.jsx(t.TableCell, { children: /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: m.handle }) }),
          /* @__PURE__ */ e.jsx(t.TableCell, { children: m.fields }),
          m.usedBy && /* @__PURE__ */ e.jsx(t.TableCell, { className: "cms:text-muted-foreground", children: m.usedBy.join(", ") || "—" }),
          /* @__PURE__ */ e.jsx(t.TableCell, { children: /* @__PURE__ */ e.jsx(
            t.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Delete ${m.title}`,
              onClick: () => r(
                `Delete the ${s.toLowerCase()} "${m.title}"? Content keeps its values.`,
                () => S.router.delete(`${a}/${m.id}`, { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(K, {})
            }
          ) })
        ] }, m.id))
      ] })
    ] }) })
  ] });
}
function La({ blueprints: s }) {
  const a = S.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(I, { message: a.blueprint }),
    /* @__PURE__ */ e.jsx(
      vt,
      {
        noun: "Blueprint",
        base: T("cms/blueprints"),
        rows: s,
        intro: "The fields editors fill in, for each kind of content."
      }
    )
  ] });
}
const rs = { preserveScroll: !0, preserveState: !0 };
function Ma({ entryId: s, comments: a }) {
  const [l, n] = $.useState(null), [c, r] = $.useState(""), [i, m] = $.useState(!1), d = (x, g) => S.router.post(T(`cms/comments/${x}/status`), { status: g }, rs), o = (x) => S.router.post(T(`cms/comments/${x}/reply`), { body: c }, {
    ...rs,
    onStart: () => m(!0),
    onFinish: () => m(!1),
    onSuccess: () => {
      n(null), r("");
    }
  });
  return /* @__PURE__ */ e.jsx(
    t.CollapsibleCard,
    {
      title: "Comments",
      titleClassName: "cms:text-base",
      storageKey: "cms:entry:comments",
      contentClassName: "cms:flex cms:flex-col cms:gap-3 cms:text-sm",
      headerAction: a && a.counts.pending > 0 ? /* @__PURE__ */ e.jsxs(t.Badge, { children: [
        a.counts.pending,
        " pending"
      ] }) : void 0,
      children: a ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs("p", { className: "cms:text-muted-foreground", children: [
          a.counts.approved,
          " approved · ",
          a.counts.pending,
          " pending · ",
          a.counts.spam,
          " spam"
        ] }),
        a.latest.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "No comments yet." }),
        a.latest.map((x) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5 cms:border-t cms:border-border/70 cms:pt-3 cms:first-of-type:border-t-0 cms:first-of-type:pt-0", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium", children: x.author }),
            x.status === "pending" && /* @__PURE__ */ e.jsx(t.Badge, { variant: "outline", children: "Pending" })
          ] }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:line-clamp-3 cms:break-words cms:whitespace-pre-line", children: x.excerpt }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
            q(x.createdAt),
            x.reply ? " · a reply" : ""
          ] }),
          a.canModerate && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-1", children: [
            x.status === "pending" && /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", size: "sm", onClick: () => d(x.id, "approved"), children: [
              /* @__PURE__ */ e.jsx(ve, {}),
              " Approve"
            ] }),
            /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => d(x.id, "spam"), children: [
              /* @__PURE__ */ e.jsx(Pe, {}),
              " Spam"
            ] }),
            /* @__PURE__ */ e.jsxs(
              t.Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                "aria-expanded": l === x.id,
                onClick: () => {
                  n(l === x.id ? null : x.id), r("");
                },
                children: [
                  /* @__PURE__ */ e.jsx(qs, {}),
                  " Reply"
                ]
              }
            )
          ] }),
          l === x.id && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              t.Textarea,
              {
                "aria-label": `Reply to ${x.author}`,
                rows: 3,
                value: c,
                onChange: (g) => r(g.target.value)
              }
            ),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
              /* @__PURE__ */ e.jsx(t.Button, { type: "button", size: "sm", disabled: c.trim() === "" || i, onClick: () => o(x.id), children: "Post reply" }),
              /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => n(null), children: "Cancel" })
            ] })
          ] })
        ] }, x.id)),
        /* @__PURE__ */ e.jsx("a", { href: T(`cms/comments?entry=${s}`), className: "cms:text-sm cms:font-medium cms:underline-offset-4 cms:hover:underline", children: "All comments on this entry" })
      ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Skeleton, { className: "cms:h-10" }),
        /* @__PURE__ */ e.jsx(t.Skeleton, { className: "cms:h-10" })
      ] })
    }
  );
}
const yt = "cms:flex cms:flex-col cms:gap-1 cms:opacity-60";
function qe({ fields: s, values: a, onChange: l, errors: n, storageKey: c, shared: r = [], sharedValues: i = {}, sharedNote: m, disabled: d = !1 }) {
  const o = [], x = { ...i, ...a };
  for (const u of s.filter((h) => Ke(h, x))) {
    const h = o[o.length - 1];
    u.type === "group" ? o.push(u) : Array.isArray(h) ? h.push(u) : o.push([u]);
  }
  const g = m && (r.length > 0 || ye(s)) ? /* @__PURE__ */ e.jsx("p", { role: "note", className: "cms:rounded-lg cms:border cms:border-dashed cms:px-3 cms:py-2 cms:text-sm cms:text-muted-foreground", children: m }) : null;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    g,
    o.map((u) => {
      if (Array.isArray(u))
        return /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsx(t.CardContent, { children: /* @__PURE__ */ e.jsx("fieldset", { disabled: d, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: u.map((N) => r.includes(N.handle) ? /* @__PURE__ */ e.jsx("fieldset", { disabled: !0, className: yt, title: "Shared by all languages", children: /* @__PURE__ */ e.jsx(le, { id: `data-${N.handle}`, field: N, content: !0, value: i[N.handle], errors: {}, onChange: () => {
        } }) }, N.handle) : /* @__PURE__ */ e.jsx(
          le,
          {
            id: `data-${N.handle}`,
            field: N,
            content: !0,
            value: a[N.handle],
            errors: J(n, `data.${N.handle}`),
            onChange: (k) => l(N.handle, k)
          },
          N.handle
        )) }) }) }, `fields-${u[0]?.handle ?? ""}`);
      const h = r.includes(u.handle), b = (h ? i : a)[u.handle], j = J(n, `data.${u.handle}`);
      return /* @__PURE__ */ e.jsx(
        t.CollapsibleCard,
        {
          title: Ne(u),
          titleClassName: "cms:text-base",
          description: u.instructions ?? void 0,
          storageKey: `${c}:${u.handle}`,
          hasErrors: !h && ge(n, `data.${u.handle}`),
          children: /* @__PURE__ */ e.jsxs(
            "fieldset",
            {
              disabled: h || d,
              role: "group",
              "aria-label": Ne(u),
              className: `cms:flex cms:flex-col cms:gap-2 ${h ? "cms:opacity-60" : ""}`,
              title: h ? "Shared by all languages" : void 0,
              children: [
                /* @__PURE__ */ e.jsx(
                  oe,
                  {
                    bare: !0,
                    fields: u.fields ?? [],
                    id: `data-${u.handle}`,
                    content: !0,
                    errors: h ? {} : j,
                    value: b && typeof b == "object" && !Array.isArray(b) ? b : {},
                    onChange: (N) => l(u.handle, N)
                  }
                ),
                /* @__PURE__ */ e.jsx(I, { message: h ? void 0 : j[""] })
              ]
            }
          )
        },
        u.handle
      );
    })
  ] });
}
const We = [
  { handle: "title", type: "text", label: "SEO title", instructions: "For search results and tabs. Empty: the title.", config: { max: 255 } },
  { handle: "description", type: "textarea", label: "Description", instructions: "A sentence or two for search results and shared links.", config: { max: 500 } },
  { handle: "image", type: "media", label: "Share image", instructions: "Shown when the page is shared.", config: { types: ["image"] } },
  { handle: "noindex", type: "toggle", label: "Hide from search engines" },
  { handle: "canonical", type: "text", label: "Canonical address", instructions: "Only when this page copies one elsewhere: that page's full address. Empty: this page.", config: { max: 2e3 } }
];
function cs(s) {
  return s.length === 0 ? "" : ` It's used by ${s.slice(0, 5).map((l) => l.label).join("; ")}${s.length > 5 ? ` and ${s.length - 5} more` : ""}: those links will show nothing.`;
}
function Ia(s) {
  const { entry: a } = s;
  return /* @__PURE__ */ e.jsx(Aa, { ...s }, a ? `${a.id}:${a.locale}:${a.version}:${a.status}:${a.trashed}:${a.publishedAt}` : "new");
}
function Aa({ collection: s, fields: a, locales: l = [], shared: n = [], sharedValues: c = {}, entry: r, values: i, revisions: m, comments: d, termLabels: o, usedBy: x = [], undoRestore: g = null, machineTranslate: u = null, machineTranslateMissing: h = !1, settings: b, blueprints: j = [], homepage: N, can: k }) {
  const C = T(`cms/collections/${s.handle}/entries`), y = r ? T(`cms/entries/${r.id}`) : C, p = r ? i.title : "New entry";
  t.useBreadcrumbs([{ label: s.title, href: C }, { label: p }]);
  const [B, w] = ne(), [z, E] = $.useState(!1), [D, L] = $.useState(null), f = S.useForm({
    ...i,
    seo: i.seo ?? {},
    locale: r?.locale ?? null,
    version: r?.version ?? null,
    publish: !1,
    published_at: null,
    parent_id: b?.parentId ?? null,
    template: b?.template ?? "",
    comments_closed: b?.commentsClosed === !0
  }), H = (_) => f.setData((V) => ({ ...V, ..._ })), O = r ? { locale: r.locale } : {}, W = l.find((_) => _.main)?.code, R = f.errors, Q = S.usePage().props.errors ?? {}, re = (_) => {
    const V = we(R, _);
    V.length > 0 && f.clearErrors(...V);
  }, Y = r !== null && r.status !== "draft" && !r.hasUnpublishedChanges && !f.isDirty, fe = r === null ? k.create : k.update && !r.trashed, se = r?.status === "scheduled", je = (_) => {
    if (b || r === null) return _;
    const { parent_id: V, template: G, comments_closed: $l, ..._t } = _;
    return _t;
  }, v = (_ = !1, V = null) => {
    f.transform((G) => ({ ...je(G), publish: _, published_at: V })), r ? f.put(y, { preserveScroll: !0, onSuccess: () => E(!1) }) : f.post(y);
  }, F = () => {
    f.transform((_) => ({ ...je(_), version: null, publish: !1, published_at: null })), f.put(y, { preserveScroll: !0 });
  }, A = t.useEditLock({
    type: "cms.entry",
    id: r?.id,
    locale: r?.locale,
    enabled: r !== null && fe,
    noun: "entry",
    leaveTo: C,
    getUnsaved: () => f.isDirty ? { title: f.data.title, slug: f.data.slug, data: f.data.data, seo: f.data.seo } : null
  }), U = fe && !A.readOnly, $t = async (_) => {
    const V = await A.loadKept(_);
    f.setData((G) => ({ ...G, title: V.title ?? G.title, slug: V.slug ?? G.slug, data: V.data ?? G.data, seo: V.seo ?? G.seo }));
  };
  t.useUnsavedChanges(f.isDirty && !A.takenOver, U ? () => f.processing || v() : void 0);
  const Dt = () => {
    const _ = () => S.router.post(`${y}/review`, O, { preserveScroll: !0 });
    f.isDirty ? (f.transform((V) => ({ ...V, publish: !1, published_at: null })), f.put(y, { preserveScroll: !0, onSuccess: _ })) : _();
  }, $e = (_ = null) => {
    k.update ? v(!0, _) : r && S.router.post(`${y}/publish`, { ...O, published_at: _ }, { preserveScroll: !0, onSuccess: () => E(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (_) => {
    _.preventDefault(), v();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: p }),
    w,
    A.dialogs,
    /* @__PURE__ */ e.jsxs(
      t.PageHeader,
      {
        title: p,
        back: { href: C, label: `Back to ${s.title}` },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          r && !r.trashed && s.pages !== !1 && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(
            "a",
            {
              href: r.previewUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              title: f.isDirty ? "Shows the saved draft: save first to see your changes." : "Shows the saved draft.",
              children: [
                /* @__PURE__ */ e.jsx(Yt, {}),
                " Preview"
              ]
            }
          ) }),
          r?.url && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: r.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(pe, {}),
            " View"
          ] }) }),
          r?.trashed && k.delete && /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", onClick: () => S.router.post(`${y}/restore`, {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(ue, {}),
            " Restore"
          ] }),
          r?.trashed && k.delete && /* @__PURE__ */ e.jsxs(
            t.Button,
            {
              type: "button",
              variant: "outline",
              className: "cms:text-destructive",
              onClick: () => B(
                `Delete "${i.title}" for good, in every language, with its revisions? This can't be undone.${cs(x)}`,
                () => S.router.delete(`${y}/force`, { data: x.length > 0 ? { force: 1 } : {} })
              ),
              children: [
                /* @__PURE__ */ e.jsx(K, {}),
                " Delete for good"
              ]
            }
          ),
          r && !r.trashed && k.create && /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "ghost", title: "Copy every language as a new draft", onClick: () => S.router.post(`${y}/duplicate`), children: [
            /* @__PURE__ */ e.jsx(Gt, {}),
            " Duplicate"
          ] }),
          r && !r.trashed && k.delete && !A.readOnly && /* @__PURE__ */ e.jsx(
            t.Button,
            {
              type: "button",
              variant: "outline",
              size: "icon",
              className: "cms:text-destructive",
              "aria-label": "Move to the trash",
              onClick: () => B(`Move "${i.title}" to the trash? It comes off the site; you can restore it.${cs(x)}`, () => S.router.delete(y), "Move to trash"),
              children: /* @__PURE__ */ e.jsx(K, {})
            }
          ),
          r && U && u !== null && /* @__PURE__ */ e.jsxs(
            t.Button,
            {
              type: "button",
              variant: "outline",
              disabled: f.processing || f.isDirty,
              title: f.isDirty ? "Save your changes first" : "Fill in what isn't translated yet, into the draft",
              onClick: () => S.router.post(T(`cms/entries/${u}/translate`), { version: r.version }, { preserveScroll: !0 }),
              children: [
                /* @__PURE__ */ e.jsx(Xe, {}),
                " Translate from ",
                l.find((_) => _.main)?.name ?? (W ? P(W) : "the main language")
              ]
            }
          ),
          r && U && h && /* @__PURE__ */ e.jsxs("span", { title: "Machine translation isn't set up on this site: ask your developer (SUNRICE_TRANSLATE_DRIVER, see Help → Developer docs → Machine translation).", children: [
            /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", disabled: !0, "aria-describedby": "machine-translate-missing", children: [
              /* @__PURE__ */ e.jsx(Xe, {}),
              " Translate from ",
              l.find((_) => _.main)?.name ?? (W ? P(W) : "the main language")
            ] }),
            /* @__PURE__ */ e.jsx("span", { id: "machine-translate-missing", className: "cms:sr-only", children: "Machine translation isn't set up on this site: ask your developer." })
          ] }),
          U && /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", variant: r ? "outline" : "default", disabled: f.processing, children: [
            f.processing && /* @__PURE__ */ e.jsx(me, { className: "cms:animate-spin" }),
            r ? "Save draft" : "Create draft"
          ] }),
          r && !r.trashed && U && !k.publish && (r.status === "draft" || r.hasUnpublishedChanges || f.isDirty) && /* @__PURE__ */ e.jsxs(
            t.Button,
            {
              type: "button",
              disabled: f.processing,
              onClick: Dt,
              title: r.review ? "Already sent; sending again tells them again" : "Ask those who can publish to review it",
              children: [
                /* @__PURE__ */ e.jsx(aa, {}),
                " ",
                r.review ? "Send for review again" : "Submit for review"
              ]
            }
          ),
          r && !r.trashed && k.publish && !A.readOnly && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex", children: [
            se && Y ? /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", className: "cms:rounded-r-none", disabled: f.processing, title: "Change the date", onClick: () => E(!0), children: [
              /* @__PURE__ */ e.jsx(Ze, {}),
              " Scheduled for ",
              q(r.publishedAt)
            ] }) : /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: Y ? "outline" : "default", className: "cms:rounded-r-none cms:disabled:opacity-100", disabled: f.processing || Y, onClick: () => $e(), children: [
              Y && /* @__PURE__ */ e.jsx(ve, { className: "cms:text-emerald-600 cms:dark:text-emerald-400" }),
              r.status === "draft" ? "Publish" : Y ? "Published" : "Publish changes"
            ] }),
            /* @__PURE__ */ e.jsxs(t.DropdownMenu, { children: [
              /* @__PURE__ */ e.jsx(t.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(t.Button, { type: "button", size: "icon", variant: Y ? "outline" : "default", className: Y ? "cms:-ml-px cms:rounded-l-none" : "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": "More publishing options", children: /* @__PURE__ */ e.jsx(Re, {}) }) }),
              /* @__PURE__ */ e.jsxs(t.DropdownMenuContent, { align: "end", children: [
                /* @__PURE__ */ e.jsxs(t.DropdownMenuItem, { onSelect: () => E(!0), children: [
                  /* @__PURE__ */ e.jsx(Ze, {}),
                  " ",
                  se ? "Change the date…" : "Publish on a date…"
                ] }),
                se && /* @__PURE__ */ e.jsx(t.DropdownMenuItem, { onSelect: () => $e((/* @__PURE__ */ new Date()).toISOString()), children: "Publish now" }),
                r.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  /* @__PURE__ */ e.jsx(t.DropdownMenuSeparator, {}),
                  /* @__PURE__ */ e.jsx(t.DropdownMenuItem, { onSelect: () => S.router.post(`${y}/unpublish`, O, { preserveScroll: !0 }), children: se ? "Unschedule (back to draft)" : "Unpublish" })
                ] })
              ] })
            ] })
          ] })
        ] }),
        children: [
          r && /* @__PURE__ */ e.jsx(t.Badge, { variant: r.status === "published" ? "success" : "secondary", children: r.trashed ? "In the trash" : X(r.status) }),
          r?.review && !r.trashed && /* @__PURE__ */ e.jsx(t.Badge, { variant: "warning", title: `${r.review.by ? `${r.review.by} sent it` : "Sent"} on ${q(r.review.requestedAt)}`, children: "Waiting for review" }),
          f.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
        ]
      }
    ),
    r && l.length > 1 && /* @__PURE__ */ e.jsx(
      Ea,
      {
        entryUrl: y,
        current: r.locale,
        locales: l,
        canAdd: k.create && !r.trashed,
        canRemove: k.delete && !r.isMain && !r.trashed,
        onRemove: () => B(
          `Remove the ${P(r.locale)} translation of "${i.title}"? Its revisions go with it.`,
          () => S.router.delete(`${y}/translations/${r.locale}`)
        )
      }
    ),
    /* @__PURE__ */ e.jsx(t.ViewingNotice, { by: A.viewingBy, onTakeOver: A.requestTakeOver }),
    /* @__PURE__ */ e.jsx(t.KeptEditsNotice, { kept: A.kept, disabled: !U, onLoad: (_) => {
      $t(_);
    }, onDiscard: (_) => {
      A.discardKept(_);
    } }),
    R.version && /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: [
      /* @__PURE__ */ e.jsx("span", { children: R.version }),
      /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "outline", size: "sm", onClick: () => S.router.reload(), children: "Load theirs" }),
        /* @__PURE__ */ e.jsx(
          t.Button,
          {
            type: "button",
            variant: "destructive",
            size: "sm",
            disabled: f.processing,
            onClick: () => B("Save your version over theirs? Their changes are replaced (their earlier published versions stay in the revisions).", F),
            children: "Save mine anyway"
          }
        )
      ] })
    ] }),
    (R.entry || R.published_at || Q.published_at || Q.homepage) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: R.entry ?? R.published_at ?? Q.published_at ?? Q.homepage }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_18rem]", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsx(t.CardContent, { children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: !U, className: "cms:grid cms:gap-4 cms:md:grid-cols-[2fr_1fr]", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "title", children: "Title" }),
            /* @__PURE__ */ e.jsx(
              t.Input,
              {
                id: "title",
                value: f.data.title,
                "aria-invalid": R.title !== void 0,
                onChange: (_) => {
                  const V = _.target.value;
                  f.setData((G) => ({ ...G, title: V, slug: Lt(G.slug, G.title, V, r !== null && r.publishedAt === null && r.status === "draft") })), re("title");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(I, { message: R.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "slug", children: "Slug" }),
            /* @__PURE__ */ e.jsx(
              t.Input,
              {
                id: "slug",
                className: "cms:font-mono",
                value: f.data.slug,
                placeholder: "Made from the title",
                "aria-invalid": R.slug !== void 0,
                onChange: (_) => {
                  f.setData("slug", _.target.value), re("slug");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(I, { message: R.slug })
          ] })
        ] }) }) }),
        /* @__PURE__ */ e.jsx(ct.Provider, { value: Array.isArray(o) || !o ? {} : o, children: /* @__PURE__ */ e.jsx(
          qe,
          {
            disabled: !U,
            fields: a,
            values: f.data.data,
            errors: R,
            storageKey: `cms:entry:${s.handle}`,
            shared: n,
            sharedValues: c,
            sharedNote: `Shared by all languages: the greyed-out fields are edited in ${W ? P(W) : "the main language"}.`,
            onChange: (_, V) => {
              f.setData("data", { ...f.data.data, [_]: V }), re(`data.${_}`);
            }
          }
        ) }),
        /* @__PURE__ */ e.jsx(t.CollapsibleCard, { title: "Search and sharing", titleClassName: "cms:text-base", storageKey: "cms:entry:seo", hasErrors: ge(R, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !U, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(
          oe,
          {
            bare: !0,
            id: "seo",
            fields: We,
            value: f.data.seo,
            errors: J(R, "seo"),
            onChange: (_) => {
              f.setData("seo", _), re("seo");
            }
          }
        ) }) })
      ] }),
      !r && s.hierarchical && /* @__PURE__ */ e.jsx("aside", { className: "cms:flex cms:flex-col cms:gap-4", children: /* @__PURE__ */ e.jsx(t.CollapsibleCard, { title: "Page settings", titleClassName: "cms:text-base", storageKey: "cms:entry:page-settings", hasErrors: R.parent_id !== void 0, children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !U, className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: /* @__PURE__ */ e.jsx(Nt, { collection: s, value: f.data.parent_id, error: R.parent_id, onChange: (_) => H({ parent_id: _ }) }) }) }) }),
      r && /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:flex-col cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs(t.CollapsibleCard, { title: "Status", titleClassName: "cms:text-base", storageKey: "cms:entry:status", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          /* @__PURE__ */ e.jsxs("p", { children: [
            X(r.status),
            r.status !== "draft" && r.publishedAt ? ` · ${q(r.publishedAt)}` : ""
          ] }),
          r.review && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-muted-foreground", children: [
            "Sent for review",
            r.review.by ? ` by ${r.review.by}` : "",
            " · ",
            q(r.review.requestedAt),
            ".",
            k.publish ? " Publishing it answers the request." : ""
          ] }),
          r.status !== "draft" && r.hasUnpublishedChanges && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The draft has changes the site doesn't show yet." }),
          N?.is && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "This is the site's homepage." }),
          N && !N.is && N.can && r.status === "published" && !r.trashed && /* @__PURE__ */ e.jsx(
            t.Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "cms:mt-1 cms:self-start",
              onClick: () => S.router.post(`${y}/homepage`, {}, { preserveScroll: !0 }),
              children: "Make this the homepage"
            }
          ),
          s.dated && k.publish && !r.trashed && !A.readOnly && (r.status === "draft" ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "To give it an earlier date, use Publish ▾ → Publish on a date… with that date." }) : /* @__PURE__ */ e.jsx(Ha, { entryUrl: y, locale: r.locale, publishedAt: r.publishedAt })),
          l.find((_) => _.code === r.locale)?.outdated && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-amber-700 cms:dark:text-amber-400", children: [
            "The ",
            W ? P(W) : "main",
            " version changed since this translation was last saved."
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs(t.CollapsibleCard, { title: "Used by", titleClassName: "cms:text-base", storageKey: "cms:entry:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          x.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "No other content links here." }),
          x.map((_) => /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
            _.url ? /* @__PURE__ */ e.jsx("a", { href: _.url, className: "cms:block cms:truncate cms:underline-offset-4 cms:hover:underline", children: _.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:truncate", children: _.label }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", title: _.field, children: _.fieldLabel ?? _.field })
          ] }, `${_.label}:${_.field}`))
        ] }),
        b && /* @__PURE__ */ e.jsx(
          Oa,
          {
            entryUrl: y,
            collection: s,
            settings: b,
            blueprints: j,
            disabled: !U,
            values: f.data,
            errors: R,
            onChange: H,
            draftDirty: f.isDirty
          }
        ),
        d !== null && s.comments && /* @__PURE__ */ e.jsx(Ma, { entryId: r.id, comments: d }),
        /* @__PURE__ */ e.jsxs(t.CollapsibleCard, { title: "Revisions", titleClassName: "cms:text-base", storageKey: "cms:entry:revisions", contentClassName: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
          g !== null && k.update && /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", size: "sm", onClick: () => S.router.post(T(`cms/entry-translations/${g}/undo-restore`), {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(He, {}),
            " Undo the restore"
          ] }),
          /* @__PURE__ */ e.jsx(S.Deferred, { data: "revisions", fallback: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(t.Skeleton, { className: "cms:h-8" }),
            /* @__PURE__ */ e.jsx(t.Skeleton, { className: "cms:h-8" })
          ] }), children: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            (m ?? []).length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "Each publish keeps one." }),
            (m ?? []).map((_) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1 cms:border-b cms:border-border/60 cms:pb-2 cms:last:border-b-0 cms:last:pb-0", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
                /* @__PURE__ */ e.jsx("div", { className: "cms:truncate", children: _.title }),
                /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
                  q(_.createdAt),
                  _.author ? ` · ${_.author}` : ""
                ] }),
                /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: _.changed === null ? "First kept version" : _.changed.length === 0 ? "No field changed" : `Changed: ${_.changed.join(", ")}` })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-1", children: [
                /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => L(_), children: "Compare" }),
                k.update && !r.trashed && /* @__PURE__ */ e.jsx(
                  t.Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    onClick: () => S.router.post(T(`cms/revisions/${_.id}/restore`), {}, { preserveScroll: !0 }),
                    children: "Restore"
                  }
                )
              ] })
            ] }, _.id))
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(Pa, { revision: D, onClose: () => L(null), dirty: f.isDirty }),
    /* @__PURE__ */ e.jsx(
      Fa,
      {
        open: z,
        onClose: () => E(!1),
        processing: f.processing,
        rescheduling: se,
        current: r?.publishedAt ?? null,
        onSchedule: (_) => $e(_)
      }
    )
  ] });
}
function Ea({ entryUrl: s, current: a, locales: l, canAdd: n, canRemove: c, onRemove: r }) {
  return /* @__PURE__ */ e.jsxs("nav", { "aria-label": "Languages", className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
    l.map((i) => {
      const m = `${i.name ?? P(i.code)}${i.main ? " (main)" : ""}`;
      return i.status === null ? n ? /* @__PURE__ */ e.jsxs(
        t.Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "cms:border-dashed",
          onClick: () => S.router.post(`${s}/translations`, { locale: i.code }),
          children: [
            /* @__PURE__ */ e.jsx(ee, {}),
            " ",
            m
          ]
        },
        i.code
      ) : null : /* @__PURE__ */ e.jsxs(
        t.Button,
        {
          type: "button",
          size: "sm",
          variant: i.code === a ? "secondary" : "ghost",
          "aria-current": i.code === a ? "page" : void 0,
          onClick: () => i.code !== a && S.router.get(`${s}/edit`, { locale: i.code }),
          children: [
            m,
            /* @__PURE__ */ e.jsx(t.Badge, { variant: i.status === "published" ? "success" : "outline", className: "cms:ml-1", children: X(i.status) }),
            i.outdated && /* @__PURE__ */ e.jsx(
              t.Badge,
              {
                variant: "outline",
                className: "cms:border-amber-500/60 cms:text-amber-700 cms:dark:text-amber-400",
                title: "The main language changed since this translation was last saved.",
                children: "Outdated"
              }
            )
          ]
        },
        i.code
      );
    }),
    c && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:ml-auto cms:text-destructive", onClick: r, children: "Remove this language" })
  ] });
}
function Fa({ open: s, onClose: a, onSchedule: l, current: n, processing: c, rescheduling: r }) {
  const [i, m] = $.useState("");
  $.useEffect(() => {
    s && m(ps(Bt(n)));
  }, [s, n]);
  const d = i === "" ? null : new Date(i), o = d !== null && d.getTime() <= Date.now();
  return /* @__PURE__ */ e.jsx(t.Dialog, { open: s, onOpenChange: (x) => !x && a(), children: /* @__PURE__ */ e.jsxs(t.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(t.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(t.DialogTitle, { children: r ? "Change the publish date" : "Publish on a date" }),
      /* @__PURE__ */ e.jsx(t.DialogDescription, { children: "The entry goes live then." })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "published-at", children: "Date and time" }),
      /* @__PURE__ */ e.jsx(t.DatePicker, { id: "published-at", withTime: !0, required: !0, className: "cms:max-w-none", value: i || null, onChange: (x) => m(x ?? "") }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "In your time zone." }),
      o && /* @__PURE__ */ e.jsxs("p", { role: "alert", className: "cms:text-sm cms:text-amber-700 cms:dark:text-amber-400", children: [
        "This date has passed: the entry goes live now, dated ",
        q(d.toISOString()),
        "."
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(t.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "outline", onClick: a, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", disabled: d === null || c, onClick: () => d && l(d.toISOString()), children: o ? "Publish now, back-dated" : r ? "Change the date" : "Schedule" })
    ] })
  ] }) });
}
function Pa({ revision: s, onClose: a, dirty: l }) {
  const [n, c] = $.useState(null), [r, i] = $.useState(!1);
  return $.useEffect(() => {
    if (c(null), i(!1), !s) return;
    let m = !0;
    return fetch(T(`cms/revisions/${s.id}/compare`), { headers: { Accept: "application/json" }, credentials: "same-origin" }).then((d) => d.ok ? d.json() : Promise.reject(new Error(String(d.status)))).then((d) => {
      m && c(d.fields);
    }).catch(() => {
      m && i(!0);
    }), () => {
      m = !1;
    };
  }, [s]), /* @__PURE__ */ e.jsx(t.Dialog, { open: s !== null, onOpenChange: (m) => !m && a(), children: /* @__PURE__ */ e.jsxs(t.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto cms:sm:max-w-2xl", children: [
    /* @__PURE__ */ e.jsxs(t.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(t.DialogTitle, { children: "Compare with the draft" }),
      /* @__PURE__ */ e.jsxs(t.DialogDescription, { children: [
        s ? `The version published ${q(s.createdAt)}${s.author ? ` by ${s.author}` : ""}, beside the saved draft.` : "",
        l ? " Your unsaved changes aren't included." : ""
      ] })
    ] }),
    r && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "The comparison could not be loaded. Try again." }),
    !r && n === null && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(t.Skeleton, { className: "cms:h-12" }),
      /* @__PURE__ */ e.jsx(t.Skeleton, { className: "cms:h-12" })
    ] }),
    n?.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "The draft is the same as this version." }),
    n && n.length > 0 && /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: n.map((m) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: m.label }),
      /* @__PURE__ */ e.jsxs("dd", { className: "cms:grid cms:gap-2 cms:sm:grid-cols-2", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:rounded-md cms:border cms:border-destructive/30 cms:bg-destructive/5 cms:p-2 cms:break-words cms:whitespace-pre-wrap", children: [
          /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:text-xs cms:text-muted-foreground", children: "This version" }),
          m.revision || "—"
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:rounded-md cms:border cms:border-emerald-500/30 cms:bg-emerald-500/5 cms:p-2 cms:break-words cms:whitespace-pre-wrap", children: [
          /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:text-xs cms:text-muted-foreground", children: "Draft" }),
          m.draft || "—"
        ] })
      ] })
    ] }, m.label)) }),
    /* @__PURE__ */ e.jsx(t.DialogFooter, { children: /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "outline", onClick: a, children: "Close" }) })
  ] }) });
}
function Ha({ entryUrl: s, locale: a, publishedAt: l }) {
  const n = l ? ps(new Date(l)) : "", [c, r] = $.useState(n), [i, m] = $.useState(!1);
  return $.useEffect(() => r(n), [n]), /* @__PURE__ */ e.jsxs("div", { className: "cms:mt-2 cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "entry-date", children: "Date" }),
    /* @__PURE__ */ e.jsx(t.DatePicker, { id: "entry-date", withTime: !0, required: !0, className: "cms:max-w-none", value: c || null, onChange: (d) => r(d ?? "") }),
    c !== n && c !== "" && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(
        t.Button,
        {
          type: "button",
          size: "sm",
          disabled: i,
          onClick: () => S.router.post(
            `${s}/date`,
            { locale: a, published_at: new Date(c).toISOString() },
            { preserveScroll: !0, onStart: () => m(!0), onFinish: () => m(!1) }
          ),
          children: "Change the date"
        }
      ),
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", size: "sm", variant: "ghost", onClick: () => r(n), children: "Cancel" })
    ] }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: "Changes only the date; a date to come takes it off the site until then." })
  ] });
}
function Nt({ collection: s, value: a, error: l, onChange: n }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "parent", children: "Parent" }),
    /* @__PURE__ */ e.jsx(
      ke,
      {
        id: "parent",
        multiple: !1,
        max: 1,
        collections: [s.handle],
        invalid: l !== void 0,
        value: a,
        onChange: (c) => n(typeof c == "number" ? c : null)
      }
    ),
    /* @__PURE__ */ e.jsx(I, { message: l })
  ] });
}
function Oa({ entryUrl: s, collection: a, settings: l, blueprints: n, disabled: c, values: r, errors: i, onChange: m, draftDirty: d }) {
  const o = n.length > 1 ? l.blueprint ?? n[0].handle : void 0, x = S.useForm({ blueprint: o ?? "" }), g = x.errors.blueprint, u = ["parent_id", "template", "comments_closed"].some((h) => i[h] !== void 0) || g !== void 0;
  return /* @__PURE__ */ e.jsx(t.CollapsibleCard, { title: "Page settings", titleClassName: "cms:text-base", storageKey: "cms:entry:page-settings", hasErrors: u, children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: c, className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: [
    a.hierarchical && /* @__PURE__ */ e.jsx(Nt, { collection: a, value: r.parent_id, error: i.parent_id, onChange: (h) => m({ parent_id: h }) }),
    n.length > 1 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "blueprint", children: "Blueprint" }),
      /* @__PURE__ */ e.jsxs(t.Select, { value: x.data.blueprint, onValueChange: (h) => x.setData("blueprint", h), children: [
        /* @__PURE__ */ e.jsx(t.SelectTrigger, { id: "blueprint", "aria-invalid": g !== void 0, children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(t.SelectContent, { children: n.map((h) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: h.handle, children: h.title }, h.handle)) })
      ] }),
      x.data.blueprint !== o && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The fields change in every language; values of fields both blueprints have are kept. The editor reloads." }),
        /* @__PURE__ */ e.jsx(
          t.Button,
          {
            type: "button",
            size: "sm",
            disabled: x.processing || d,
            title: d ? "Save your draft first" : void 0,
            onClick: () => x.put(`${s}/settings`, { preserveScroll: !0 }),
            children: "Change blueprint"
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(I, { message: g })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "template", children: "Template" }),
      /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: "template",
          className: "cms:font-mono",
          placeholder: "The collection's",
          value: r.template,
          onChange: (h) => m({ template: h.target.value }),
          "aria-invalid": i.template !== void 0
        }
      ),
      /* @__PURE__ */ e.jsx(I, { message: i.template })
    ] }),
    a.comments && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(t.Switch, { id: "comments-open", checked: !r.comments_closed, onCheckedChange: (h) => m({ comments_closed: !h }) }),
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "comments-open", children: "Accept new comments" }),
      /* @__PURE__ */ e.jsx("a", { href: T(`cms/comments?entry=${s.split("/").slice(-1)[0]}`), className: "cms:ml-auto cms:text-muted-foreground cms:underline-offset-4 hover:cms:underline", children: "Comments" })
    ] })
  ] }) });
}
function Oe(s, a) {
  const l = s[a]?.depth ?? 0;
  let n = a + 1;
  for (; n < s.length && s[n].depth > l; ) n++;
  return n;
}
function ae(s, a) {
  const l = a < 0 ? 0 : a + 1, n = a < 0 ? s.length : Oe(s, a), c = a < 0 ? 0 : (s[a]?.depth ?? 0) + 1, r = [];
  for (let i = l; i < n; i++)
    s[i].depth === c && r.push(i);
  return r;
}
function Ge(s, a, l) {
  const n = ae(s, a);
  if (l.length !== n.length || [...l].sort((m, d) => m - d).some((m, d) => m !== n[d]) || n.length === 0) return s.slice();
  const c = n[0], r = Oe(s, n[n.length - 1]), i = l.flatMap((m) => s.slice(m, Oe(s, m)));
  return [...s.slice(0, c), ...i, ...s.slice(r)];
}
function Ra(s, a) {
  const l = new Set(s.map((m) => m.id)), n = /* @__PURE__ */ new Map();
  for (const m of s) {
    const d = a(m), o = d != null && l.has(d) ? d : null;
    n.set(o, [...n.get(o) ?? [], m]);
  }
  const c = [], r = /* @__PURE__ */ new Set(), i = (m, d) => {
    for (const o of n.get(m) ?? [])
      r.has(o.id) || (r.add(o.id), c.push({ ...o, depth: d }), i(o.id, d + 1));
  };
  i(null, 0);
  for (const m of s)
    r.has(m.id) || (r.add(m.id), c.push({ ...m, depth: 0 }), i(m.id, 1));
  return c;
}
function Va({ collection: s, rows: a, hierarchical: l = !1 }) {
  const n = $.useCallback(
    (d) => Ra(d, (o) => l ? o.parentId : null),
    [l]
  ), [c, r] = $.useState(() => n(a));
  $.useEffect(() => r(n(a)), [a, n]);
  const i = (d, o) => {
    const x = Ge(c, d, o), g = ae(x, d).map((u) => x[u].id);
    r(x), S.router.post(
      T("cms/entries/reorder"),
      { collection: s, ids: g, parent_id: d < 0 ? null : c[d]?.id ?? null },
      { preserveScroll: !0, preserveState: !0, onError: () => r(n(a)) }
    );
  }, m = (d) => /* @__PURE__ */ e.jsx(
    t.SortableList,
    {
      items: ae(c, d),
      getId: (o) => c[o].id,
      getLabel: (o) => c[o].title,
      onReorder: (o) => i(d, o),
      className: d < 0 ? "cms:gap-1" : "cms:mt-1 cms:gap-1 cms:pl-6",
      children: (o, { handle: x }) => {
        const g = c[o];
        return /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-lg cms:border cms:border-border/70 cms:bg-card cms:p-2 cms:text-sm", children: [
            /* @__PURE__ */ e.jsx(t.SortableHandle, { ...x, label: `Move ${g.title}` }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium", children: g.title }),
            /* @__PURE__ */ e.jsx(t.Badge, { variant: g.status === "published" ? "success" : "secondary", children: X(g.status) })
          ] }),
          ae(c, o).length > 0 && m(o)
        ] });
      }
    }
  );
  return /* @__PURE__ */ e.jsxs(t.Card, { className: "cms:p-2", children: [
    l && /* @__PURE__ */ e.jsx("p", { className: "cms:px-1 cms:pb-1 cms:text-xs cms:text-muted-foreground", children: "Entries move among those at their level, with what's under them. To put one under another, choose its Parent in its Page settings." }),
    m(-1)
  ] });
}
function Ua(s, a, l) {
  const n = { ...s, ...a }, c = Object.fromEntries(Object.entries(n.terms).filter(([, i]) => i !== "")), r = {};
  return n.search && (r.search = n.search), n.status && (r.status = n.status), n.author && (r.author = n.author), Object.keys(c).length > 0 && (r.terms = c), n.locale && n.locale !== l && (r.locale = n.locale), n.sort && (r.sort = n.sort), r.per_page = n.perPage, r;
}
function Ka(s) {
  const a = new URLSearchParams();
  for (const [l, n] of Object.entries(s))
    if (typeof n == "object")
      for (const [c, r] of Object.entries(n)) a.set(`${l}[${c}]`, r);
    else
      a.set(l, String(n));
  return a.toString();
}
function qa(s, a) {
  return s === a ? `-${a}` : s === `-${a}` ? "" : a;
}
function Wa(s, a) {
  return s === a ? "asc" : s === `-${a}` ? "desc" : null;
}
function is(s) {
  return [s.search, s.status, s.author, ...Object.values(s.terms)].filter((a) => a !== "").length;
}
const Me = "__all", Ga = [
  { value: "draft", label: "Drafts" },
  { value: "published", label: "Published" },
  { value: "scheduled", label: "Scheduled" },
  { value: "trashed", label: "Trash" }
];
function Ya(s) {
  const { collection: a, entries: l, query: n } = s;
  return t.useBreadcrumbs([{ label: "Entries", href: T("cms/entries") }, ...a ? [{ label: a.title }] : []]), !a || !l || !n ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: "Entries" }),
    /* @__PURE__ */ e.jsx(t.PageHeader, { title: "Entries", description: "There are no collections yet. Create one under Structure → Collections, then come back to write its entries." })
  ] }) : /* @__PURE__ */ e.jsx(Ja, { ...s, collection: a, entries: l, query: n });
}
function Ja({
  collection: s,
  collections: a,
  entries: l,
  query: n,
  columns: c = [],
  filters: r = { authors: [], taxonomies: [], locales: [] },
  links: i = [],
  manualOrder: m = !1,
  perPageOptions: d = [10, 25, 50, 100],
  preferencesKey: o,
  can: x
}) {
  const g = T(`cms/collections/${s.handle}/entries`), u = r.locales[0] ?? n.locale, [h, b] = $.useState(n.search), [j, N] = $.useState([]), [k, C] = $.useState(!1), [y, p] = ne(), { setColumns: B, setPerPage: w } = t.useTablePreferences(o ?? `table.cms.entries.${s.handle}`, { columns: n.columns, perPage: n.perPage });
  $.useEffect(() => N([]), [l]);
  const z = n.status === "trashed", E = is(n) > 0, D = c.filter((v) => n.columns.includes(v.key)), L = (v = {}) => Ua(n, v, u), f = (v) => S.router.get(g, L(v), { preserveState: !0, preserveScroll: !0, replace: !0 });
  $.useEffect(() => {
    if (h === n.search) return;
    const v = window.setTimeout(() => f({ search: h }), 300);
    return () => window.clearTimeout(v);
  }, [h]);
  const H = z ? x?.delete ? [{ action: "restore", label: "Restore" }, { action: "delete", label: "Delete for good", danger: !0 }] : [] : [
    ...x?.publish ? [{ action: "publish", label: "Publish" }, { action: "unpublish", label: "Unpublish" }] : [],
    ...x?.delete ? [{ action: "trash", label: "Move to the trash", danger: !0 }] : []
  ], O = (v, F, A = !1) => {
    const U = () => S.router.post(`${g}/bulk`, { action: v, ids: j }, { preserveScroll: !0 });
    A ? y(
      `${F}: ${j.length} ${j.length === 1 ? "entry" : "entries"}?${v === "delete" ? " This can't be undone." : " They come off the site; you can restore them."}`,
      U,
      v === "trash" ? "Move to trash" : "Delete"
    ) : U();
  }, W = async (v) => {
    const F = new Set(n.columns);
    F.has(v) ? F.delete(v) : F.add(v), await B(c.map((A) => A.key).filter((A) => F.has(A))), S.router.reload({ only: ["entries", "query"] });
  }, R = () => {
    b(""), f({ search: "", status: "", author: "", terms: {} });
  }, Q = m && !!x?.update, re = Q && l !== null && l.lastPage <= 1 && l.data.length > 1, Y = z && !!x?.delete, fe = 1 + D.length + (H.length > 0 ? 1 : 0) + (Q ? 1 : 0) + (Y ? 1 : 0), se = Ka(L()), je = [...new Set(i.map((v) => v.group))];
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: s.title }),
    p,
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: s.title,
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          i.length > 0 && /* @__PURE__ */ e.jsxs(t.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(t.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(t.Button, { variant: "outline", children: [
              /* @__PURE__ */ e.jsx(Wt, {}),
              " Go to"
            ] }) }),
            /* @__PURE__ */ e.jsx(t.DropdownMenuContent, { align: "end", className: "cms:min-w-56", children: je.map((v, F) => /* @__PURE__ */ e.jsxs($.Fragment, { children: [
              F > 0 && /* @__PURE__ */ e.jsx(t.DropdownMenuSeparator, {}),
              /* @__PURE__ */ e.jsx(t.DropdownMenuLabel, { children: v }),
              i.filter((A) => A.group === v).map((A) => /* @__PURE__ */ e.jsx(t.DropdownMenuItem, { asChild: !0, children: A.external ? /* @__PURE__ */ e.jsxs("a", { href: A.href, target: "_blank", rel: "noopener noreferrer", children: [
                A.label,
                " ",
                /* @__PURE__ */ e.jsx(pe, { className: "cms:ml-auto" })
              ] }) : /* @__PURE__ */ e.jsx(S.Link, { href: A.href, children: A.label }) }, A.href))
            ] }, v)) })
          ] }),
          s.listing && !z && /* @__PURE__ */ e.jsx(t.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs(S.Link, { href: T(`cms/collections/${s.handle}/listing`), children: [
            /* @__PURE__ */ e.jsx(Qt, {}),
            " Listing page"
          ] }) }),
          l.total > 0 && x?.export && /* @__PURE__ */ e.jsx(t.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: `${g}/export${se ? `?${se}` : ""}`, children: [
            /* @__PURE__ */ e.jsx(Ms, {}),
            " Export CSV"
          ] }) }),
          x?.create && !z && /* @__PURE__ */ e.jsx(t.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(S.Link, { href: `${g}/create`, children: [
            /* @__PURE__ */ e.jsx(ee, {}),
            " New entry"
          ] }) })
        ] }),
        children: a.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: s.handle, onValueChange: (v) => S.router.get(T(`cms/collections/${v}/entries`)), children: [
          /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Collection", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(t.SelectContent, { children: a.map((v) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: v.handle, children: v.title }, v.handle)) })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-xs", children: [
        /* @__PURE__ */ e.jsx(Ce, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          t.Input,
          {
            className: "cms:pl-9",
            placeholder: "Search titles, slugs or #id",
            "aria-label": "Search entries",
            value: h,
            onChange: (v) => b(v.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(Ie, { label: "Status", value: n.status, options: Ga, onChange: (v) => f({ status: v }) }),
      r.authors.length > 0 && /* @__PURE__ */ e.jsx(Ie, { label: "Author", value: n.author, options: r.authors, onChange: (v) => f({ author: v }) }),
      r.taxonomies.filter((v) => v.terms.length > 0).map((v) => /* @__PURE__ */ e.jsx(
        Ie,
        {
          label: v.title,
          value: n.terms[v.handle] ?? "",
          options: v.terms.map((F) => ({ value: F.value, label: `${"— ".repeat(F.depth)}${F.label}` })),
          onChange: (F) => f({ terms: { ...n.terms, [v.handle]: F } })
        },
        v.handle
      )),
      r.locales.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: n.locale, onValueChange: (v) => f({ locale: v }), children: [
        /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-auto cms:min-w-40 cms:max-w-72", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(t.SelectContent, { children: r.locales.map((v) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: v, children: [
          P(v),
          v === u ? " (main)" : ""
        ] }, v)) })
      ] }),
      E && /* @__PURE__ */ e.jsxs(t.Button, { variant: "ghost", size: "sm", onClick: R, children: [
        /* @__PURE__ */ e.jsx(Se, {}),
        " Clear"
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:ml-auto cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
        j.length > 0 && H.length > 0 && /* @__PURE__ */ e.jsxs("div", { role: "toolbar", "aria-label": "Selected entries", className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsxs("span", { className: "cms:text-sm cms:text-muted-foreground", children: [
            j.length,
            " selected"
          ] }),
          H.map((v) => /* @__PURE__ */ e.jsx(t.Button, { size: "sm", variant: v.danger ? "destructive" : "outline", onClick: () => O(v.action, v.label, v.danger), children: v.label }, v.action))
        ] }),
        re && /* @__PURE__ */ e.jsxs(t.Button, { variant: k ? "secondary" : "outline", "aria-pressed": k, onClick: () => C(!k), children: [
          /* @__PURE__ */ e.jsx(vs, {}),
          " ",
          k ? "Done" : "Reorder"
        ] }),
        c.length > 0 && /* @__PURE__ */ e.jsxs(t.DropdownMenu, { children: [
          /* @__PURE__ */ e.jsx(t.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(t.Button, { variant: "outline", children: [
            /* @__PURE__ */ e.jsx(qt, {}),
            " Columns"
          ] }) }),
          /* @__PURE__ */ e.jsxs(t.DropdownMenuContent, { align: "end", className: "cms:max-h-96 cms:overflow-y-auto", children: [
            /* @__PURE__ */ e.jsx(t.DropdownMenuLabel, { children: "Columns" }),
            c.filter((v) => !v.field).map((v) => /* @__PURE__ */ e.jsx(
              t.DropdownMenuCheckboxItem,
              {
                checked: n.columns.includes(v.key),
                onSelect: (F) => F.preventDefault(),
                onCheckedChange: () => {
                  W(v.key);
                },
                children: v.label
              },
              v.key
            )),
            c.some((v) => v.field) && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(t.DropdownMenuSeparator, {}),
              /* @__PURE__ */ e.jsx(t.DropdownMenuLabel, { children: "Fields" }),
              c.filter((v) => v.field).map((v) => /* @__PURE__ */ e.jsx(
                t.DropdownMenuCheckboxItem,
                {
                  checked: n.columns.includes(v.key),
                  onSelect: (F) => F.preventDefault(),
                  onCheckedChange: () => {
                    W(v.key);
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
    k && re ? /* @__PURE__ */ e.jsx(Va, { collection: s.handle, rows: l.data, hierarchical: s.hierarchical === !0 }) : /* @__PURE__ */ e.jsxs(t.Card, { className: "cms:gap-0 cms:overflow-hidden cms:py-0", children: [
      /* @__PURE__ */ e.jsxs(t.Table, { children: [
        /* @__PURE__ */ e.jsx(t.TableHeader, { className: "cms:bg-muted/60", children: /* @__PURE__ */ e.jsxs(t.TableRow, { className: "cms:hover:bg-transparent", children: [
          H.length > 0 && /* @__PURE__ */ e.jsx(t.TableHead, { className: "cms:w-10", children: /* @__PURE__ */ e.jsx(
            t.Checkbox,
            {
              "aria-label": "Select all on this page",
              checked: l.data.length > 0 && j.length === l.data.length,
              onCheckedChange: (v) => N(v ? l.data.map((F) => F.id) : [])
            }
          ) }),
          /* @__PURE__ */ e.jsx(os, { label: "Title", sortKey: "title", sort: n.sort, onSort: (v) => f({ sort: v }) }),
          D.map((v) => v.sortable ? /* @__PURE__ */ e.jsx(os, { label: v.label, sortKey: v.key, sort: n.sort, onSort: (F) => f({ sort: F }) }, v.key) : /* @__PURE__ */ e.jsx(t.TableHead, { children: v.label }, v.key)),
          Q && /* @__PURE__ */ e.jsx(t.TableHead, { className: "cms:w-px", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: "Order" }) }),
          Y && /* @__PURE__ */ e.jsx(t.TableHead, { className: "cms:w-px", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: "Restore" }) })
        ] }) }),
        /* @__PURE__ */ e.jsxs(t.TableBody, { children: [
          l.data.length === 0 && /* @__PURE__ */ e.jsx(t.TableRow, { className: "cms:hover:bg-transparent", children: /* @__PURE__ */ e.jsx(t.TableCell, { colSpan: fe, className: "cms:h-32 cms:text-center cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx(Xa, { trashed: z, filtered: is(z ? { ...n, status: "" } : n) > 0, canCreate: !!x?.create, createUrl: `${g}/create`, onClear: R }) }) }),
          l.data.map((v, F) => /* @__PURE__ */ e.jsxs(t.TableRow, { className: "sunrice-row-in", style: { "--i": F }, "data-state": j.includes(v.id) ? "selected" : void 0, children: [
            H.length > 0 && /* @__PURE__ */ e.jsx(t.TableCell, { children: /* @__PURE__ */ e.jsx(
              t.Checkbox,
              {
                "aria-label": `Select ${v.title}`,
                checked: j.includes(v.id),
                onCheckedChange: (A) => N(A ? [...j, v.id] : j.filter((U) => U !== v.id))
              }
            ) }),
            /* @__PURE__ */ e.jsxs(t.TableCell, { children: [
              /* @__PURE__ */ e.jsx(
                S.Link,
                {
                  href: T(`cms/entries/${v.id}/edit${n.locale !== u ? `?locale=${encodeURIComponent(n.locale)}` : ""}`),
                  className: "cms:font-medium cms:underline-offset-4 cms:hover:underline",
                  children: v.title
                }
              ),
              (!n.columns.includes("slug") && v.path || v.parent) && /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: [n.columns.includes("slug") ? null : v.path, v.parent ? `under ${v.parent}` : null].filter(Boolean).join(" · ") })
            ] }),
            D.map((A) => /* @__PURE__ */ e.jsx(t.TableCell, { className: A.key === "status" ? "" : "cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx("div", { className: "cms:max-w-72 cms:truncate", children: /* @__PURE__ */ e.jsx(Qa, { row: v, column: A, mainLocale: u }) }) }, A.key)),
            Q && /* @__PURE__ */ e.jsx(t.TableCell, { className: "cms:w-px", children: /* @__PURE__ */ e.jsxs("span", { className: "cms:flex", children: [
              /* @__PURE__ */ e.jsx(t.Button, { variant: "ghost", size: "icon", "aria-label": `Move ${v.title} up`, onClick: () => S.router.post(T(`cms/entries/${v.id}/move`), { direction: "up" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(Ns, {}) }),
              /* @__PURE__ */ e.jsx(t.Button, { variant: "ghost", size: "icon", "aria-label": `Move ${v.title} down`, onClick: () => S.router.post(T(`cms/entries/${v.id}/move`), { direction: "down" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(js, {}) })
            ] }) }),
            Y && /* @__PURE__ */ e.jsx(t.TableCell, { className: "cms:w-px", children: /* @__PURE__ */ e.jsxs(
              t.Button,
              {
                variant: "outline",
                size: "sm",
                "aria-label": `Restore ${v.title}`,
                onClick: () => S.router.post(T(`cms/entries/${v.id}/restore`), {}, { preserveScroll: !0 }),
                children: [
                  /* @__PURE__ */ e.jsx(ue, {}),
                  " Restore"
                ]
              }
            ) })
          ] }, v.id))
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4 cms:border-t cms:px-6 cms:py-3 cms:text-sm cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-4", children: [
          /* @__PURE__ */ e.jsx("span", { children: l.total === 0 ? "No entries" : `${l.from}–${l.to} of ${l.total}` }),
          /* @__PURE__ */ e.jsxs(t.Select, { value: String(n.perPage), onValueChange: (v) => {
            w(Number(v)), f({ perPage: Number(v) });
          }, children: [
            /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:h-8 cms:w-auto", "aria-label": "Entries per page", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(t.SelectContent, { children: d.map((v) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: String(v), children: [
              v,
              " per page"
            ] }, v)) })
          ] })
        ] }),
        l.lastPage > 1 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsxs("span", { children: [
            "Page ",
            l.currentPage,
            " of ",
            l.lastPage
          ] }),
          /* @__PURE__ */ e.jsx(
            t.Button,
            {
              variant: "outline",
              size: "icon",
              className: "cms:size-8",
              "aria-label": "Previous page",
              disabled: !l.prev_page_url,
              onClick: () => l.prev_page_url && S.router.get(l.prev_page_url, {}, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(Ve, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            t.Button,
            {
              variant: "outline",
              size: "icon",
              className: "cms:size-8",
              "aria-label": "Next page",
              disabled: !l.next_page_url,
              onClick: () => l.next_page_url && S.router.get(l.next_page_url, {}, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(xe, {})
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function Ie({ label: s, value: a, options: l, onChange: n }) {
  return /* @__PURE__ */ e.jsxs(t.Select, { value: a === "" ? Me : a, onValueChange: (c) => n(c === Me ? "" : c), children: [
    /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-auto cms:min-w-40 cms:max-w-72", title: s, "aria-label": s, children: /* @__PURE__ */ e.jsx(t.SelectValue, { placeholder: s }) }),
    /* @__PURE__ */ e.jsxs(t.SelectContent, { children: [
      /* @__PURE__ */ e.jsxs(t.SelectItem, { value: Me, children: [
        s,
        ": all"
      ] }),
      l.map((c) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: c.value, children: c.label }, c.value))
    ] })
  ] });
}
function os({ label: s, sortKey: a, sort: l, onSort: n }) {
  const c = Wa(l, a);
  return /* @__PURE__ */ e.jsx(t.TableHead, { "aria-sort": c === "asc" ? "ascending" : c === "desc" ? "descending" : void 0, children: /* @__PURE__ */ e.jsxs(
    "button",
    {
      type: "button",
      onClick: () => n(qa(l, a)),
      className: "cms:-ml-2 cms:inline-flex cms:h-8 cms:items-center cms:gap-1 cms:rounded-md cms:px-2 cms:hover:bg-accent cms:hover:text-accent-foreground",
      children: [
        s,
        c === "asc" ? /* @__PURE__ */ e.jsx(Ns, { className: "cms:size-3" }) : c === "desc" ? /* @__PURE__ */ e.jsx(js, { className: "cms:size-3" }) : /* @__PURE__ */ e.jsx(vs, { className: "cms:size-3 cms:opacity-40" })
      ]
    }
  ) });
}
function Qa({ row: s, column: a, mainLocale: l }) {
  switch (a.key) {
    case "slug":
      return /* @__PURE__ */ e.jsx("span", { className: "cms:font-mono", children: s.slug });
    case "status":
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-1", children: [
        s.trashed ? /* @__PURE__ */ e.jsx(t.Badge, { variant: "outline", className: "cms:text-destructive", title: `${X(s.status)} before it was trashed`, children: "Trashed" }) : /* @__PURE__ */ e.jsx(t.Badge, { variant: s.status === "published" ? "success" : "secondary", children: X(s.status) }),
        s.locales.length > 1 && s.locales.filter((n) => !n.main).map((n) => {
          const c = Za(n);
          return /* @__PURE__ */ e.jsxs(
            t.Badge,
            {
              variant: c.variant,
              className: c.className,
              title: `${P(n.code)}: ${c.title}`,
              "aria-label": `${P(n.code)}: ${c.title}`,
              children: [
                n.code.toUpperCase(),
                c.word && /* @__PURE__ */ e.jsx("span", { className: "cms:font-normal", children: c.word })
              ]
            },
            n.code
          );
        })
      ] });
    case "author":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: s.author ?? "—" });
    case "published_at":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: q(s.publishedAt) });
    case "updated_at":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: q(s.updatedAt) });
    case "created_at":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: q(s.createdAt) });
    default:
      return /* @__PURE__ */ e.jsx("span", { title: s.cells[a.key] ?? void 0, children: s.cells[a.key] ?? "—" });
  }
}
function Za(s) {
  return s.status === null ? { variant: "outline", className: "cms:border-dashed cms:text-muted-foreground", word: "missing", title: "not translated" } : s.outdated ? { variant: "warning", className: "", word: "outdated", title: `${X(s.status)}, outdated: the main language changed since` } : s.status === "published" ? { variant: "secondary", className: "", word: null, title: "Published" } : { variant: "outline", className: "", word: s.status === "scheduled" ? "scheduled" : "draft", title: X(s.status) };
}
function Xa({ trashed: s, filtered: a, canCreate: l, createUrl: n, onClear: c }) {
  return a ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: "Nothing matches these filters." }),
    /* @__PURE__ */ e.jsxs(t.Button, { variant: "outline", size: "sm", onClick: c, children: [
      /* @__PURE__ */ e.jsx(Se, {}),
      " Clear filters"
    ] })
  ] }) : s ? /* @__PURE__ */ e.jsx(e.Fragment, { children: "The trash is empty." }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: "No entries yet." }),
    l && /* @__PURE__ */ e.jsx(t.Button, { size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs(S.Link, { href: n, children: [
      /* @__PURE__ */ e.jsx(ee, {}),
      " Write the first one"
    ] }) })
  ] });
}
function Ye({ message: s, processing: a, onSaveMine: l }) {
  const [n, c] = ne();
  return s ? /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: [
    c,
    /* @__PURE__ */ e.jsx("span", { children: s }),
    /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "outline", size: "sm", onClick: () => S.router.reload(), children: "Load theirs" }),
      /* @__PURE__ */ e.jsx(
        t.Button,
        {
          type: "button",
          variant: "destructive",
          size: "sm",
          disabled: a,
          onClick: () => n("Save your version over theirs? Their changes are replaced.", l),
          children: "Save mine anyway"
        }
      )
    ] })
  ] }) : null;
}
function el(s) {
  return /* @__PURE__ */ e.jsx(sl, { ...s }, `${s.locale}:${s.version}:${JSON.stringify([s.values, s.seo])}`);
}
function sl({ collection: s, fields: a, locale: l, locales: n, shared: c, values: r, seo: i, version: m, can: d }) {
  const o = T(`cms/collections/${s.handle}/listing`), x = T(`cms/collections/${s.handle}/entries`);
  t.useBreadcrumbs([{ label: s.title, href: x }, { label: "Listing page" }]);
  const g = S.useForm({ locale: l, data: r, seo: i ?? {}, version: m }), u = g.errors, h = (C) => {
    const y = we(u, C);
    y.length > 0 && g.clearErrors(...y);
  }, b = n[0], j = d.update, N = () => g.processing || g.put(o, { preserveScroll: !0 }), k = () => {
    g.transform((C) => ({ ...C, version: null })), g.put(o, { preserveScroll: !0 });
  };
  return t.useUnsavedChanges(g.isDirty, j ? N : void 0), /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (C) => {
    C.preventDefault(), N();
  }, className: "cms:flex cms:max-w-3xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: `${s.title}: listing page` }),
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: `${s.title}: listing page`,
        back: { href: x, label: `Back to ${s.title}` },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          n.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: l, onValueChange: (C) => S.router.get(o, { locale: C }), children: [
            /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(t.SelectContent, { children: n.map((C, y) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: C, children: [
              P(C),
              y === 0 ? " (main)" : ""
            ] }, C)) })
          ] }),
          s.url && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: s.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(pe, {}),
            " View"
          ] }) }),
          j && /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", disabled: g.processing, children: [
            g.processing && /* @__PURE__ */ e.jsx(me, { className: "cms:animate-spin" }),
            " Save"
          ] })
        ] }),
        children: g.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      }
    ),
    /* @__PURE__ */ e.jsxs("fieldset", { disabled: !j, className: "cms:flex cms:flex-col cms:gap-6", children: [
      /* @__PURE__ */ e.jsx(Ye, { message: u.version, processing: g.processing, onSaveMine: k }),
      a.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The listing page has no fields of its own: choose a listing blueprint for the collection under Structure → Collections." }) : /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsxs(t.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: [
        (c.length > 0 || ye(a)) && /* @__PURE__ */ e.jsxs("p", { role: "note", className: "cms:rounded-lg cms:border cms:border-dashed cms:px-3 cms:py-2 cms:text-sm cms:text-muted-foreground", children: [
          "Shared by all languages: the greyed-out fields are edited in ",
          b ? P(b) : "the main language",
          "."
        ] }),
        a.filter((C) => Ke(C, { ...r, ...g.data.data })).map((C) => c.includes(C.handle) ? /* @__PURE__ */ e.jsx("fieldset", { disabled: !0, className: yt, title: "Shared by all languages", children: /* @__PURE__ */ e.jsx(le, { id: `data-${C.handle}`, field: C, content: !0, value: r[C.handle], errors: {}, onChange: () => {
        } }) }, C.handle) : /* @__PURE__ */ e.jsx(
          le,
          {
            id: `data-${C.handle}`,
            field: C,
            content: !0,
            value: g.data.data[C.handle],
            errors: J(u, `data.${C.handle}`),
            onChange: (y) => {
              g.setData("data", { ...g.data.data, [C.handle]: y }), h(`data.${C.handle}`);
            }
          },
          C.handle
        ))
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsx(t.CollapsibleCard, { title: "Search and sharing", titleClassName: "cms:text-base", storageKey: "cms:listing:seo", hasErrors: ge(u, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !j, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(oe, { bare: !0, id: "seo", fields: We, value: g.data.seo, errors: J(u, "seo"), onChange: (C) => {
      g.setData("seo", C), h("seo");
    } }) }) })
  ] });
}
function tl({ fieldsets: s }) {
  const a = S.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(I, { message: a.fieldset }),
    /* @__PURE__ */ e.jsx(
      vt,
      {
        noun: "Fieldset",
        base: T("cms/fieldsets"),
        rows: s,
        intro: "Fields shared between blueprints, and the kinds of block of flexible fields."
      }
    )
  ] });
}
function al(s) {
  return /* @__PURE__ */ e.jsx(ll, { ...s }, `${s.locale}:${s.version}:${JSON.stringify(s.values)}`);
}
function ll({ set: s, fields: a, locale: l, locales: n, shared: c, values: r, version: i, can: m }) {
  const d = T(`cms/globals/${s.handle}`);
  t.useBreadcrumbs([{ label: "Globals", href: T("cms/globals") }, { label: s.title }]);
  const o = S.useForm({ locale: l, data: r, version: i }), x = o.errors, g = (C) => {
    const y = we(x, C);
    y.length > 0 && o.clearErrors(...y);
  }, u = n[0], h = t.useEditLock({
    type: "cms.global",
    id: s.id,
    locale: l,
    enabled: m.update,
    noun: "global set",
    leaveTo: T("cms/globals"),
    getUnsaved: () => o.isDirty ? { data: o.data.data } : null
  }), b = m.update && !h.readOnly, j = () => o.processing || o.put(d, { preserveScroll: !0 }), N = () => {
    o.transform((C) => ({ ...C, version: null })), o.put(d, { preserveScroll: !0 });
  }, k = async (C) => {
    const y = await h.loadKept(C);
    y.data && typeof y.data == "object" && o.setData("data", y.data);
  };
  return t.useUnsavedChanges(o.isDirty && !h.takenOver, b ? j : void 0), /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (C) => {
    C.preventDefault(), j();
  }, className: "cms:flex cms:max-w-3xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: s.title }),
    h.dialogs,
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: s.title,
        back: { href: T("cms/globals"), label: "Back to globals" },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          n.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: l, onValueChange: (C) => S.router.get(d, { locale: C }), children: [
            /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(t.SelectContent, { children: n.map((C, y) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: C, children: [
              P(C),
              y === 0 ? " (main)" : ""
            ] }, C)) })
          ] }),
          b && /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", disabled: o.processing, children: [
            o.processing && /* @__PURE__ */ e.jsx(me, { className: "cms:animate-spin" }),
            " Save"
          ] })
        ] }),
        children: o.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      }
    ),
    a.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "This global set has no fields: choose a blueprint for it under Structure → Global sets." }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(t.ViewingNotice, { by: h.viewingBy, onTakeOver: h.requestTakeOver }),
      u && l !== u && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:bg-muted/40 cms:p-3 cms:text-sm cms:text-muted-foreground", role: "note", children: i === null ? `Not saved in ${P(l)} yet: these are the ${P(u)} values, which the site shows meanwhile. Translate them, then save.` : `A field left empty shows the ${P(u)} value on the site.` }),
      /* @__PURE__ */ e.jsx(Ye, { message: x.version, processing: o.processing, onSaveMine: N }),
      /* @__PURE__ */ e.jsx(t.KeptEditsNotice, { kept: h.kept, disabled: !b, onLoad: (C) => {
        k(C);
      }, onDiscard: (C) => {
        h.discardKept(C);
      } }),
      /* @__PURE__ */ e.jsx(
        qe,
        {
          disabled: !b,
          fields: a,
          values: o.data.data,
          errors: x,
          storageKey: `cms:global:${s.handle}`,
          shared: c,
          sharedValues: r,
          sharedNote: `Shared by all languages: the greyed-out fields are edited in ${u ? P(u) : "the main language"}.`,
          onChange: (C, y) => {
            o.setData("data", { ...o.data.data, [C]: y }), g(`data.${C}`);
          }
        }
      )
    ] })
  ] });
}
function nl({ sets: s }) {
  return t.useBreadcrumbs([{ label: "Globals" }]), /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: "Globals" }),
    /* @__PURE__ */ e.jsx(t.PageHeader, { title: "Globals", description: "Values the whole site uses, like contact details and footer text." }),
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no global sets yet. Create one under Structure → Global sets." }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:sm:grid-cols-2 cms:lg:grid-cols-3", children: s.map((a) => /* @__PURE__ */ e.jsx(S.Link, { href: T(`cms/globals/${a.handle}`), className: "cms:rounded-xl cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none", children: /* @__PURE__ */ e.jsxs(t.Card, { className: "cms:h-full cms:transition-colors cms:hover:bg-accent", children: [
      /* @__PURE__ */ e.jsxs(t.CardHeader, { children: [
        /* @__PURE__ */ e.jsx(t.CardTitle, { className: "cms:text-base", children: a.title }),
        /* @__PURE__ */ e.jsx(t.CardDescription, { children: a.blueprint ? /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: a.handle }) : "No blueprint yet: choose one under Structure → Global sets." })
      ] }),
      /* @__PURE__ */ e.jsx(t.CardContent, {})
    ] }) }, a.handle)) })
  ] });
}
let Ct = 0;
function St(s, a = 0) {
  return s.flatMap(({ children: l, ...n }) => [{ ...n, key: `m${++Ct}`, depth: a }, ...St(l ?? [], a + 1)]);
}
function rl(s) {
  const a = [], l = [{ depth: -1, children: a }];
  for (const { key: n, depth: c, ...r } of s) {
    for (; l.length > 1 && l[l.length - 1].depth >= c; ) l.pop();
    const i = { ...r, children: [] };
    l[l.length - 1].children.push(i), l.push({ depth: c, children: i.children });
  }
  return a;
}
function he(s, a) {
  const l = s[a]?.depth ?? 0;
  let n = a + 1;
  for (; n < s.length && s[n].depth > l; ) n++;
  return n;
}
function kt(s, a, l) {
  const n = he(s, a);
  return s.map((c, r) => r >= a && r < n ? { ...c, depth: c.depth + l } : c);
}
function cl(s, a, l) {
  const n = s[a], c = s[a - 1];
  return !n || !c || n.depth > c.depth || Math.max(...s.slice(a, he(s, a)).map((i) => i.depth)) + 1 > l - 1 ? s : kt(s, a, 1);
}
function il(s, a) {
  const l = s[a];
  if (!l || l.depth === 0) return s;
  let n = a - 1;
  for (; n > 0 && s[n].depth >= l.depth; ) n--;
  const c = he(s, a), r = he(s, n), i = kt(s, a, -1).slice(a, c);
  return [...s.slice(0, a), ...s.slice(c, r), ...i, ...s.slice(r)];
}
function ol(s, a) {
  return [...s.slice(0, a), ...s.slice(he(s, a))];
}
function be(s) {
  return { key: `m${++Ct}`, depth: 0, entry_id: null, term_id: null, collection_id: null, target: null, url: null, labels: {}, new_tab: !1, query: null, ...s };
}
function dl({ menu: s, items: a, locales: l, limits: n, terms: c, listings: r, can: i }) {
  const m = T(`cms/menus/${s.handle}`);
  t.useBreadcrumbs([{ label: "Menus", href: T("cms/menus") }, { label: s.title }]);
  const [d, o] = $.useState(() => St(a)), [x, g] = $.useState(null), u = S.useForm({ items: a }), h = u.errors, [b, j] = $.useState(!1), N = l[0] ?? "en", k = (w) => {
    o(w), j(!0);
  }, C = (w, z) => k(d.map((E, D) => D === w ? { ...E, ...z } : E)), y = () => {
    u.processing || (u.transform(() => ({ items: rl(d).map(wt) })), u.put(m, { preserveScroll: !0, onSuccess: () => j(!1) }));
  }, p = (w) => {
    w.preventDefault(), y();
  };
  t.useUnsavedChanges(b, i.update ? y : void 0);
  const B = (w) => /* @__PURE__ */ e.jsx(
    t.SortableList,
    {
      items: ae(d, w),
      getId: (z) => d[z].key,
      getLabel: (z) => d[z].labels[N] || d[z].target?.title || d[z].url || "link",
      disabled: !i.update,
      onReorder: (z) => k(Ge(d, w, z)),
      className: w < 0 ? "cms:gap-1" : "cms:mt-1 cms:gap-1 cms:pl-6",
      children: (z, { handle: E, isOverlay: D }) => {
        const L = d[z];
        return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${D ? "" : "cms:border-border/70"}`, children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2 cms:p-2", children: [
            i.update && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:h-10 cms:shrink-0 cms:items-center", children: /* @__PURE__ */ e.jsx(t.SortableHandle, { ...E, label: `Move ${L.labels[N] || L.target?.title || L.url || "link"}` }) }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
                /* @__PURE__ */ e.jsx(
                  t.Input,
                  {
                    "aria-label": `Label (${P(N)})`,
                    className: "cms:w-full cms:sm:max-w-xs",
                    disabled: !i.update,
                    placeholder: L.target?.title ?? "Label",
                    value: L.labels[N] ?? "",
                    onChange: (f) => C(z, { labels: { ...L.labels, [N]: f.target.value } })
                  }
                ),
                /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-32 cms:flex-1 cms:truncate cms:text-sm cms:text-muted-foreground", children: L.url !== null ? L.url : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  L.target ? `${L.target.kind}: ${L.target.title}` : "Gone",
                  " ",
                  (!L.target || !L.target.live) && /* @__PURE__ */ e.jsx(t.Badge, { variant: "outline", children: "Not on the site" })
                ] }) }),
                i.update && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center", children: [
                  /* @__PURE__ */ e.jsxs("label", { className: "cms:mr-2 cms:flex cms:items-center cms:gap-1.5 cms:text-sm", children: [
                    /* @__PURE__ */ e.jsx(t.Checkbox, { checked: L.new_tab, onCheckedChange: (f) => C(z, { new_tab: f }) }),
                    " New tab"
                  ] }),
                  /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Out a level", disabled: L.depth === 0, onClick: () => k(il(d, z)), children: /* @__PURE__ */ e.jsx(Xt, {}) }),
                  /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "In a level", onClick: () => k(cl(d, z, n.depth)), children: /* @__PURE__ */ e.jsx(ea, {}) }),
                  /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": "Remove, with what's under it", onClick: () => k(ol(d, z)), children: /* @__PURE__ */ e.jsx(K, {}) })
                ] })
              ] }),
              L.collection_id !== null && /* @__PURE__ */ e.jsx(
                t.Input,
                {
                  "aria-label": "Filters",
                  className: "cms:w-full cms:sm:max-w-md cms:font-mono",
                  disabled: !i.update,
                  placeholder: "Filters (optional): listing_type=for-sale",
                  value: L.query ?? "",
                  onChange: (f) => C(z, { query: f.target.value })
                }
              ),
              l.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: l.slice(1).map((f) => /* @__PURE__ */ e.jsx(
                t.Input,
                {
                  "aria-label": `Label (${P(f)})`,
                  className: "cms:w-full cms:sm:max-w-xs",
                  disabled: !i.update,
                  placeholder: `${P(f)}: as ${P(N)}`,
                  value: L.labels[f] ?? "",
                  onChange: (H) => C(z, { labels: { ...L.labels, [f]: H.target.value } })
                },
                f
              )) })
            ] })
          ] }),
          !D && ae(d, z).length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:px-2 cms:pb-2", children: B(z) })
        ] });
      }
    }
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: p, className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: s.title }),
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: s.title,
        back: { href: T("cms/menus"), label: "Back to menus" },
        actions: i.update && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", disabled: d.length >= n.items, onClick: () => g("entry"), children: [
            /* @__PURE__ */ e.jsx(ee, {}),
            " Entry"
          ] }),
          c.length > 0 && /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", disabled: d.length >= n.items, onClick: () => g("term"), children: [
            /* @__PURE__ */ e.jsx(la, {}),
            " Term"
          ] }),
          r.length > 0 && /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", disabled: d.length >= n.items, onClick: () => g("listing"), children: [
            /* @__PURE__ */ e.jsx(sa, {}),
            " Listing"
          ] }),
          /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", disabled: d.length >= n.items, onClick: () => g("url"), children: [
            /* @__PURE__ */ e.jsx(Zt, {}),
            " Link"
          ] }),
          /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", disabled: u.processing, children: [
            u.processing && /* @__PURE__ */ e.jsx(me, { className: "cms:animate-spin" }),
            " Save"
          ] })
        ] }),
        children: b && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      }
    ),
    /* @__PURE__ */ e.jsx(I, { message: h.items }),
    Object.keys(h).some((w) => w.startsWith("items.")) && /* @__PURE__ */ e.jsxs("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: [
      "Some links need fixing: ",
      Object.values(h).filter(Boolean)[0]
    ] }),
    /* @__PURE__ */ e.jsx(t.Card, { className: "cms:p-2", children: d.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:p-4 cms:text-center cms:text-muted-foreground", children: "No links yet. Add an entry or a link." }) : B(-1) }),
    /* @__PURE__ */ e.jsx(xl, { kind: x, terms: c, listings: r, onClose: () => g(null), onAdd: (w) => {
      k([...d, w]), g(null);
    }, main: N })
  ] });
}
function wt({ target: s, children: a, ...l }) {
  return { ...l, children: a.map(wt) };
}
const ml = "A menu links to entries that already exist: create the page first (Content → Entries), then add it here, or add a web address instead.", ul = { entry: "Link to an entry", term: "Link to a term's page", listing: "Link to a listing page", url: "Link to an address" }, hl = {
  entry: "It follows the entry: its title (unless you give a label) and its address in each language. It shows only while the entry is on the site.",
  term: "The page listing the term's entries, in each language. Its title is the label unless you give one.",
  listing: "The collection's listing page, in each language, optionally with filters. The collection's title is the label unless you give one.",
  url: "A web address, a path on this site (/contact), mailto: or tel:."
};
function xl({ kind: s, terms: a, listings: l, onClose: n, onAdd: c, main: r }) {
  const [i, m] = $.useState(null), [d, o] = $.useState(""), [x, g] = $.useState(""), [u, h] = $.useState(""), [b, j] = $.useState("");
  $.useEffect(() => {
    m(null), o(""), g(""), h(""), j("");
  }, [s]);
  const N = x.trim() === "" || da(x.trim()), k = u.trim() ? { [r]: u.trim() } : {}, C = async () => {
    if (s === "entry" && i !== null) {
      const p = await fetch(`${T("cms/entry-picker")}?${rt({ ids: [i], collections: [] })}`, { headers: { Accept: "application/json" }, credentials: "same-origin" }), B = p.ok ? (await p.json()).items[0] : void 0;
      c(be({ entry_id: i, target: B ? { title: B.title, kind: B.collection, live: B.status === "published" } : null, labels: k }));
    } else if (s === "term" && d !== "") {
      const p = a.find((B) => String(B.id) === d);
      c(be({ term_id: Number(d), target: p ? { title: p.title, kind: p.taxonomy, live: !0 } : null, labels: k }));
    } else if (s === "listing" && d !== "") {
      const p = l.find((B) => String(B.id) === d);
      c(be({ collection_id: Number(d), target: p ? { title: p.title, kind: "Listing page", live: !0 } : null, labels: k, query: b.trim().replace(/^\?/, "") || null }));
    } else s === "url" && x.trim() !== "" && N && u.trim() !== "" && c(be({ url: x.trim(), labels: k }));
  }, y = s === "entry" ? i !== null : s === "url" ? x.trim() !== "" && N && u.trim() !== "" : d !== "";
  return /* @__PURE__ */ e.jsx(t.Dialog, { open: s !== null, onOpenChange: (p) => !p && n(), children: /* @__PURE__ */ e.jsxs(t.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(t.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(t.DialogTitle, { children: s ? ul[s] : "" }),
      /* @__PURE__ */ e.jsx(t.DialogDescription, { children: s ? hl[s] : "" })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
      s === "entry" && /* @__PURE__ */ e.jsx(
        ke,
        {
          id: "menu-entry",
          value: i,
          multiple: !1,
          max: null,
          collections: [],
          invalid: !1,
          emptyHint: ml,
          onChange: (p) => m(typeof p == "number" ? p : null)
        }
      ),
      (s === "term" || s === "listing") && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "menu-target", children: s === "term" ? "Term" : "Collection" }),
        /* @__PURE__ */ e.jsxs(t.Select, { value: d, onValueChange: o, children: [
          /* @__PURE__ */ e.jsx(t.SelectTrigger, { id: "menu-target", children: /* @__PURE__ */ e.jsx(t.SelectValue, { placeholder: "Choose…" }) }),
          /* @__PURE__ */ e.jsx(t.SelectContent, { children: s === "term" ? a.map((p) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: String(p.id), children: [
            p.taxonomy,
            ": ",
            p.title
          ] }, p.id)) : l.map((p) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: String(p.id), children: p.title }, p.id)) })
        ] })
      ] }),
      s === "listing" && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "menu-query", children: "Filters (optional)" }),
        /* @__PURE__ */ e.jsx(
          t.Input,
          {
            id: "menu-query",
            className: "cms:font-mono",
            value: b,
            placeholder: "listing_type=for-sale",
            onChange: (p) => j(p.target.value)
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "What the listing page's filters put after the ? in its address. Each language's link gets them, and a term may be named by its slug in any language." })
      ] }),
      s === "url" && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "menu-url", children: "Address" }),
        /* @__PURE__ */ e.jsx(
          t.Input,
          {
            id: "menu-url",
            value: x,
            placeholder: "https://… or /contact",
            "aria-invalid": !N,
            onChange: (p) => g(p.target.value)
          }
        ),
        !N && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "This address could run code; use https://, a path, mailto: or tel:." })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(t.Label, { htmlFor: "menu-label", children: [
          "Label",
          s === "url" ? "" : " (optional)"
        ] }),
        /* @__PURE__ */ e.jsx(t.Input, { id: "menu-label", value: u, onChange: (p) => h(p.target.value) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(t.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "outline", onClick: n, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", onClick: () => {
        C();
      }, disabled: !y, children: "Add" })
    ] })
  ] }) });
}
function pl({ menus: s }) {
  return t.useBreadcrumbs([{ label: "Menus" }]), /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: "Menus" }),
    /* @__PURE__ */ e.jsx(t.PageHeader, { title: "Menus", description: "Navigation for the site: the main menu, the footer…" }),
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no menus yet. Create one under Structure → Menu settings." }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:sm:grid-cols-2 cms:lg:grid-cols-3", children: s.map((a) => /* @__PURE__ */ e.jsx(S.Link, { href: T(`cms/menus/${a.handle}`), className: "cms:rounded-xl cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none", children: /* @__PURE__ */ e.jsxs(t.Card, { className: "cms:h-full cms:transition-colors cms:hover:bg-accent", children: [
      /* @__PURE__ */ e.jsxs(t.CardHeader, { children: [
        /* @__PURE__ */ e.jsx(t.CardTitle, { className: "cms:text-base", children: a.title }),
        /* @__PURE__ */ e.jsx(t.CardDescription, { children: /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: a.handle }) })
      ] }),
      /* @__PURE__ */ e.jsx(t.CardContent, {})
    ] }) }, a.handle)) })
  ] });
}
const gl = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "spam", label: "Spam" },
  { value: "trash", label: "Trash" }
], fl = { pending: "Pending", approved: "Approved", spam: "Spam" };
function jl({ tab: s, counts: a, filters: l, collections: n, comments: c, can: r, errors: i = {} }) {
  t.useBreadcrumbs([{ label: "Comments", href: T("cms/comments") }]);
  const [m, d] = $.useState(l.search), [o, x] = $.useState([]), [g, u] = $.useState(null), [h, b] = ne(), j = (p) => {
    const B = { status: s, search: l.search, collection: l.collection, ...p };
    S.router.get(T("cms/comments"), {
      ...B.status !== "all" ? { status: B.status } : {},
      ...B.search ? { search: B.search } : {},
      ...B.collection ? { collection: B.collection } : {},
      ...l.entry ? { entry: l.entry } : {}
    }, { preserveState: !0, replace: !0, onSuccess: () => x([]) });
  };
  $.useEffect(() => {
    if (m === l.search) return;
    const p = window.setTimeout(() => j({ search: m }), 300);
    return () => window.clearTimeout(p);
  }, [m]);
  const N = (p, B = {}) => S.router.post(T(p), B, { preserveScroll: !0, onSuccess: () => x([]) }), k = (p, B) => N(`cms/comments/${p.id}/status`, { status: B }), C = (p) => {
    const B = () => N("cms/comments/bulk", { action: p, ids: o });
    p === "delete" ? h(`Delete ${o.length} comments for good? This can't be undone.`, B) : B();
  }, y = c.data.length > 0 && o.length === c.data.length;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: "Comments" }),
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: "Comments",
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:sm:w-64", children: [
            /* @__PURE__ */ e.jsx(Ce, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
            /* @__PURE__ */ e.jsx(
              t.Input,
              {
                type: "search",
                placeholder: "Search text, name or email",
                "aria-label": "Search comments",
                className: "cms:pl-9",
                value: m,
                onChange: (p) => d(p.target.value)
              }
            )
          ] }),
          n.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: l.collection ?? "all", onValueChange: (p) => j({ collection: p === "all" ? null : p }), children: [
            /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Collection", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(t.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(t.SelectItem, { value: "all", children: "Every collection" }),
              n.map((p) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: p.handle, children: p.title }, p.handle))
            ] })
          ] })
        ] })
      }
    ),
    l.entry !== null && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      "Comments on one entry. ",
      /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:underline cms:underline-offset-4", onClick: () => S.router.get(T("cms/comments")), children: "Show all" })
    ] }),
    /* @__PURE__ */ e.jsx(t.Tabs, { value: s, onValueChange: (p) => j({ status: p }), children: /* @__PURE__ */ e.jsx(t.TabsList, { className: "cms:h-auto cms:flex-wrap cms:justify-start", children: gl.map((p) => /* @__PURE__ */ e.jsxs(t.TabsTrigger, { value: p.value, children: [
      p.label,
      " ",
      /* @__PURE__ */ e.jsx("span", { className: "cms:ml-1 cms:text-muted-foreground", children: a[p.value] })
    ] }, p.value)) }) }),
    o.length > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2 cms:text-sm", role: "toolbar", "aria-label": "With the selected comments", children: [
      /* @__PURE__ */ e.jsxs("span", { className: "cms:text-muted-foreground", children: [
        o.length,
        " selected"
      ] }),
      r.moderate && s !== "trash" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "outline", onClick: () => C("approve"), children: [
          /* @__PURE__ */ e.jsx(ve, {}),
          " Approve"
        ] }),
        /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "outline", onClick: () => C("unapprove"), children: [
          /* @__PURE__ */ e.jsx(He, {}),
          " Unapprove"
        ] }),
        /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "outline", onClick: () => C("spam"), children: [
          /* @__PURE__ */ e.jsx(Pe, {}),
          " Spam"
        ] })
      ] }),
      r.delete && s !== "trash" && /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "outline", onClick: () => C("trash"), children: [
        /* @__PURE__ */ e.jsx(K, {}),
        " Trash"
      ] }),
      r.delete && s === "trash" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "outline", onClick: () => C("restore"), children: [
          /* @__PURE__ */ e.jsx(ue, {}),
          " Restore"
        ] }),
        /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "destructive", onClick: () => C("delete"), children: [
          /* @__PURE__ */ e.jsx(K, {}),
          " Delete for good"
        ] })
      ] })
    ] }),
    c.data.length === 0 ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:rounded-xl cms:border cms:border-dashed cms:px-6 cms:py-16 cms:text-center", children: [
      /* @__PURE__ */ e.jsx("span", { className: "cms:grid cms:size-10 cms:place-items-center cms:rounded-full cms:bg-muted cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx(ta, { className: "cms:size-4" }) }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: l.search ? "No comments match." : "No comments here." })
    ] }) : /* @__PURE__ */ e.jsxs(t.Card, { className: "cms:divide-y cms:p-0", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3 cms:px-4 cms:py-2 cms:text-sm cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsx(t.Checkbox, { checked: y, "aria-label": "Select all", onCheckedChange: (p) => x(p ? c.data.map((B) => B.id) : []) }),
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
          t.Checkbox,
          {
            checked: o.includes(p.id),
            "aria-label": `Select ${p.author}'s comment`,
            onCheckedChange: (B) => x(B ? [...o, p.id] : o.filter((w) => w !== p.id))
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-x-3 cms:gap-y-1 cms:text-sm", children: [
            /* @__PURE__ */ e.jsx("span", { id: `comment-${p.id}-author`, className: "cms:font-medium", children: p.author }),
            p.email && /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", children: p.email }),
            p.member && /* @__PURE__ */ e.jsx(t.Badge, { variant: "outline", children: "Signed in" }),
            !p.trashed && /* @__PURE__ */ e.jsx(t.Badge, { variant: p.status === "approved" ? "success" : p.status === "spam" ? "destructive" : "warning", children: fl[p.status] }),
            /* @__PURE__ */ e.jsxs("span", { className: "cms:text-muted-foreground", children: [
              p.createdAt ? q(p.createdAt) : "",
              " · ",
              p.locale.toUpperCase()
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
            "On ",
            p.entry.url ? /* @__PURE__ */ e.jsxs("a", { href: p.entry.url, target: "_blank", rel: "noreferrer", className: "cms:underline-offset-4 hover:cms:underline", children: [
              p.entry.title,
              " ",
              /* @__PURE__ */ e.jsx(pe, { className: "cms:inline cms:size-3" })
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
            r.moderate && !p.trashed && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              p.status !== "approved" && /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "ghost", onClick: () => k(p, "approved"), children: [
                /* @__PURE__ */ e.jsx(ve, {}),
                " Approve"
              ] }),
              p.status === "approved" && /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "ghost", onClick: () => k(p, "pending"), children: [
                /* @__PURE__ */ e.jsx(He, {}),
                " Unapprove"
              ] }),
              p.status !== "spam" && /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "ghost", onClick: () => k(p, "spam"), children: [
                /* @__PURE__ */ e.jsx(Pe, {}),
                " Spam"
              ] }),
              p.status !== "spam" && /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "ghost", onClick: () => u({ row: p, mode: "reply" }), children: [
                /* @__PURE__ */ e.jsx(qs, {}),
                " Reply"
              ] }),
              /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "ghost", onClick: () => u({ row: p, mode: "edit" }), children: [
                /* @__PURE__ */ e.jsx(Ys, {}),
                " Edit"
              ] })
            ] }),
            r.delete && !p.trashed && /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "ghost", onClick: () => S.router.delete(T(`cms/comments/${p.id}`), { preserveScroll: !0 }), children: [
              /* @__PURE__ */ e.jsx(K, {}),
              " Trash"
            ] }),
            r.delete && p.trashed && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "ghost", onClick: () => N(`cms/comments/${p.id}/restore`), children: [
                /* @__PURE__ */ e.jsx(ue, {}),
                " Restore"
              ] }),
              /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "ghost", onClick: () => h(
                "Delete this comment for good? Replies to it stay.",
                () => S.router.delete(T(`cms/comments/${p.id}/force`), { preserveScroll: !0 })
              ), children: [
                /* @__PURE__ */ e.jsx(K, {}),
                " Delete for good"
              ] })
            ] })
          ] })
        ] })
      ] }, p.id))
    ] }),
    (c.prev_page_url || c.next_page_url) && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:justify-end cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(t.Button, { variant: "outline", size: "sm", disabled: !c.prev_page_url, onClick: () => c.prev_page_url && S.router.get(c.prev_page_url), children: [
        /* @__PURE__ */ e.jsx(Ve, {}),
        " Newer"
      ] }),
      /* @__PURE__ */ e.jsxs(t.Button, { variant: "outline", size: "sm", disabled: !c.next_page_url, onClick: () => c.next_page_url && S.router.get(c.next_page_url), children: [
        "Older ",
        /* @__PURE__ */ e.jsx(xe, {})
      ] })
    ] }),
    g && /* @__PURE__ */ e.jsx(bl, { row: g.row, mode: g.mode, error: i.body, onClose: () => u(null) }, `${g.mode}-${g.row.id}`),
    b
  ] });
}
function bl({ row: s, mode: a, error: l, onClose: n }) {
  const [c, r] = $.useState(a === "edit" ? s.body : ""), [i, m] = $.useState(!1), d = () => {
    m(!0);
    const o = { preserveScroll: !0, onSuccess: n, onFinish: () => m(!1) };
    a === "reply" ? S.router.post(T(`cms/comments/${s.id}/reply`), { body: c }, o) : S.router.put(T(`cms/comments/${s.id}`), { body: c }, o);
  };
  return /* @__PURE__ */ e.jsx(t.Dialog, { open: !0, onOpenChange: (o) => !o && n(), children: /* @__PURE__ */ e.jsxs(t.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(t.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(t.DialogTitle, { children: a === "reply" ? `Reply to ${s.author}` : `Edit ${s.author}'s comment` }),
      /* @__PURE__ */ e.jsx(t.DialogDescription, { children: a === "reply" ? s.status === "pending" ? "Your reply is published at once, and approves this comment." : "Your reply is published at once, under your name." : "Fix a typo or remove a link." })
    ] }),
    a === "reply" && /* @__PURE__ */ e.jsx("p", { className: "cms:max-h-32 cms:overflow-auto cms:whitespace-pre-wrap cms:text-sm cms:text-muted-foreground", children: s.body }),
    /* @__PURE__ */ e.jsx(
      t.Textarea,
      {
        "aria-label": a === "reply" ? "Your reply" : "Comment",
        rows: 5,
        value: c,
        "aria-invalid": l !== void 0,
        onChange: (o) => r(o.target.value)
      }
    ),
    /* @__PURE__ */ e.jsx(I, { message: l }),
    /* @__PURE__ */ e.jsxs(t.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "outline", onClick: n, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", disabled: c.trim() === "" || i, onClick: d, children: a === "reply" ? "Post reply" : "Save" })
    ] })
  ] }) });
}
const vl = 3;
function yl({ form: s, forms: a, submissions: l, can: n }) {
  t.useBreadcrumbs([{ label: "Submissions", href: T("cms/submissions") }, ...s ? [{ label: s.title }] : []]);
  const [c, r] = $.useState(null), [i, m] = ne();
  if (!s || !l)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(S.Head, { title: "Submissions" }),
      /* @__PURE__ */ e.jsx(t.PageHeader, { title: "Submissions", description: "There are no forms yet. Create one under Structure → Forms and put it on a page; what visitors send shows up here." })
    ] });
  const d = (l.data[0]?.rows ?? []).slice(0, vl), o = (x) => i(
    "Delete this submission for good? It can't be restored.",
    () => S.router.delete(T(`cms/submissions/${x.id}`), { preserveScroll: !0, onSuccess: () => r(null) })
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: `${s.title} submissions` }),
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: s.title,
        actions: l.total > 0 && n.export && /* @__PURE__ */ e.jsx(t.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: T(`cms/forms/${s.handle}/submissions/export`), children: [
          /* @__PURE__ */ e.jsx(Ms, {}),
          " Export CSV"
        ] }) }),
        children: a.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: s.handle, onValueChange: (x) => S.router.get(T(`cms/forms/${x}/submissions`)), children: [
          /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-56", "aria-label": "Form", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(t.SelectContent, { children: a.map((x) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: x.handle, children: [
            x.title,
            " (",
            x.count,
            ")"
          ] }, x.handle)) })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(t.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(t.Table, { children: [
      /* @__PURE__ */ e.jsx(t.TableHeader, { children: /* @__PURE__ */ e.jsxs(t.TableRow, { children: [
        /* @__PURE__ */ e.jsx(t.TableHead, { children: "Sent" }),
        d.map((x) => /* @__PURE__ */ e.jsx(t.TableHead, { children: x.label }, x.handle))
      ] }) }),
      /* @__PURE__ */ e.jsxs(t.TableBody, { children: [
        l.data.length === 0 && /* @__PURE__ */ e.jsx(t.TableRow, { children: /* @__PURE__ */ e.jsx(t.TableCell, { colSpan: d.length + 1, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: "Nothing sent yet." }) }),
        l.data.map((x) => /* @__PURE__ */ e.jsxs(t.TableRow, { children: [
          /* @__PURE__ */ e.jsx(t.TableCell, { className: "cms:whitespace-nowrap", children: /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:font-medium cms:hover:underline", onClick: () => r(x), children: q(x.createdAt) }) }),
          d.map((g) => /* @__PURE__ */ e.jsx(t.TableCell, { className: "cms:max-w-64 cms:truncate", children: x.rows.find((u) => u.handle === g.handle)?.value }, g.handle))
        ] }, x.id))
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
          t.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Previous page",
            disabled: !l.prev_page_url,
            onClick: () => l.prev_page_url && S.router.get(l.prev_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(Ve, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          t.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Next page",
            disabled: !l.next_page_url,
            onClick: () => l.next_page_url && S.router.get(l.next_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(xe, {})
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(t.Dialog, { open: c !== null, onOpenChange: (x) => !x && r(null), children: /* @__PURE__ */ e.jsxs(t.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto", children: [
      /* @__PURE__ */ e.jsxs(t.DialogHeader, { children: [
        /* @__PURE__ */ e.jsx(t.DialogTitle, { children: s.title }),
        /* @__PURE__ */ e.jsxs(t.DialogDescription, { children: [
          "Sent ",
          q(c?.createdAt ?? null),
          " · ",
          c?.locale.toUpperCase()
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-3 cms:text-sm", children: c?.rows.map((x) => /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: x.label }),
        /* @__PURE__ */ e.jsx("dd", { className: "cms:whitespace-pre-wrap cms:break-words cms:text-muted-foreground", children: x.files && x.files.length > 0 ? /* @__PURE__ */ e.jsx("ul", { className: "cms:flex cms:flex-col cms:gap-1", children: x.files.map((g) => /* @__PURE__ */ e.jsx("li", { children: /* @__PURE__ */ e.jsx("a", { href: g.url, className: "cms:underline cms:underline-offset-4 hover:cms:text-foreground", download: !0, children: g.name }) }, g.url)) }) : x.file ? /* @__PURE__ */ e.jsx("a", { href: x.file, className: "cms:underline cms:underline-offset-4 hover:cms:text-foreground", download: !0, children: x.value }) : x.value || "—" })
      ] }, x.handle)) }),
      c && (c.visitor.ip || c.visitor.userAgent || c.visitor.referrer) && /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-3 cms:border-t cms:pt-3 cms:text-sm", children: [["IP address", c.visitor.ip], ["Browser", c.visitor.userAgent], ["Sent from", c.visitor.referrer]].map(([x, g]) => g && /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: x }),
        /* @__PURE__ */ e.jsx("dd", { className: "cms:break-all cms:text-muted-foreground", children: g })
      ] }, x)) }),
      n.delete && c && /* @__PURE__ */ e.jsx(t.DialogFooter, { children: /* @__PURE__ */ e.jsxs(t.Button, { variant: "destructive", onClick: () => o(c), children: [
        /* @__PURE__ */ e.jsx(K, {}),
        " Delete"
      ] }) })
    ] }) }),
    m
  ] });
}
function Nl(s) {
  return /* @__PURE__ */ e.jsx(Cl, { ...s }, `${s.locale}:${s.version}:${JSON.stringify([s.values, s.seo, s.term.template])}`);
}
function Cl({ taxonomy: s, term: a, translated: l, fields: n, locale: c, locales: r, shared: i, sharedValues: m, values: d, seo: o, version: x, usedBy: g = [] }) {
  const u = T(`cms/taxonomies/${s.handle}/terms`), h = T(`cms/terms/${a.id}/content`);
  t.useBreadcrumbs([{ label: s.title, href: `${u}?locale=${c}` }, { label: a.title }]);
  const b = S.useForm({
    locale: c,
    title: a.ownTitle ?? "",
    slug: a.slug ?? "",
    data: d,
    seo: o ?? {},
    template: a.template ?? "",
    version: x
  }), j = b.errors, N = (w) => {
    const z = we(j, w);
    z.length > 0 && b.clearErrors(...z);
  }, k = () => b.processing || b.put(h, { preserveScroll: !0 }), C = () => {
    b.transform((w) => ({ ...w, version: null })), b.put(h, { preserveScroll: !0 });
  }, y = t.useEditLock({
    type: "cms.term",
    id: a.id,
    locale: c,
    enabled: l,
    noun: "term",
    leaveTo: `${u}?locale=${c}`,
    getUnsaved: () => b.isDirty ? { data: b.data.data, seo: b.data.seo, template: b.data.template } : null
  }), p = !y.readOnly, B = async (w) => {
    const z = await y.loadKept(w);
    b.setData((E) => ({
      ...E,
      data: z.data && typeof z.data == "object" ? z.data : E.data,
      seo: z.seo && typeof z.seo == "object" ? z.seo : E.seo,
      template: typeof z.template == "string" ? z.template : E.template
    }));
  };
  return t.useUnsavedChanges(b.isDirty && !y.takenOver, p ? k : void 0), /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (w) => {
    w.preventDefault(), k();
  }, className: "cms:flex cms:max-w-3xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: a.title }),
    y.dialogs,
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: a.title,
        back: { href: `${u}?locale=${c}`, label: `Back to ${s.title}` },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          a.url && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: a.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(pe, {}),
            " View"
          ] }) }),
          r.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: c, onValueChange: (w) => S.router.get(T(`cms/terms/${a.id}/edit`), { locale: w }), children: [
            /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(t.SelectContent, { children: r.map((w, z) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: w, children: [
              P(w),
              z === 0 ? " (main)" : ""
            ] }, w)) })
          ] }),
          p && /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", disabled: b.processing, children: [
            b.processing && /* @__PURE__ */ e.jsx(me, { className: "cms:animate-spin" }),
            " Save"
          ] })
        ] }),
        children: b.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
      /* @__PURE__ */ e.jsx(t.ViewingNotice, { by: y.viewingBy, onTakeOver: y.requestTakeOver }),
      !l && /* @__PURE__ */ e.jsxs("p", { className: "cms:rounded-lg cms:border cms:bg-muted/40 cms:p-3 cms:text-sm cms:text-muted-foreground", role: "note", children: [
        "Not in ",
        P(c),
        " yet: the site shows the ",
        P(r[0] ?? "en"),
        " term meanwhile. Give it a title in ",
        P(c),
        " and save to add it."
      ] }),
      /* @__PURE__ */ e.jsxs("fieldset", { disabled: !p, className: "cms:grid cms:min-w-0 cms:gap-4 cms:sm:grid-cols-2", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "term-title", children: "Title" }),
          /* @__PURE__ */ e.jsx(
            t.Input,
            {
              id: "term-title",
              value: b.data.title,
              required: !0,
              placeholder: a.mainTitle ?? "",
              maxLength: 255,
              "aria-invalid": j.title !== void 0,
              onChange: (w) => {
                b.setData("title", w.target.value), N("title");
              }
            }
          ),
          /* @__PURE__ */ e.jsx(I, { message: j.title })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "term-slug", children: "Slug" }),
          /* @__PURE__ */ e.jsx(
            t.Input,
            {
              id: "term-slug",
              className: "cms:font-mono",
              value: b.data.slug,
              placeholder: "Made from the title",
              maxLength: 200,
              "aria-invalid": j.slug !== void 0,
              onChange: (w) => {
                b.setData("slug", w.target.value), N("slug");
              }
            }
          ),
          /* @__PURE__ */ e.jsx(I, { message: j.slug })
        ] })
      ] }),
      /* @__PURE__ */ e.jsx(t.KeptEditsNotice, { kept: y.kept, disabled: !p, onLoad: (w) => {
        B(w);
      }, onDiscard: (w) => {
        y.discardKept(w);
      } }),
      /* @__PURE__ */ e.jsx(Ye, { message: j.version, processing: b.processing, onSaveMine: C }),
      /* @__PURE__ */ e.jsx(
        qe,
        {
          disabled: !p,
          fields: n,
          values: b.data.data,
          errors: j,
          storageKey: `cms:term:${s.handle}`,
          shared: i,
          sharedValues: m,
          sharedNote: `Shared by all languages: the greyed-out fields are edited in ${P(r[0] ?? "en")}.`,
          onChange: (w, z) => {
            b.setData("data", { ...b.data.data, [w]: z }), N(`data.${w}`);
          }
        }
      ),
      /* @__PURE__ */ e.jsx(t.CollapsibleCard, { title: "Search and sharing", titleClassName: "cms:text-base", storageKey: "cms:term:seo", hasErrors: ge(j, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !p, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(oe, { bare: !0, id: "seo", fields: We, value: b.data.seo, errors: J(j, "seo"), onChange: (w) => {
        b.setData("seo", w), N("seo");
      } }) }) }),
      /* @__PURE__ */ e.jsxs(t.CollapsibleCard, { title: "Used by", titleClassName: "cms:text-base", storageKey: "cms:term:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
        g.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "No content links here through its fields." }),
        g.map((w) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:gap-2", children: [
          w.url ? /* @__PURE__ */ e.jsx("a", { href: w.url, className: "cms:truncate cms:underline-offset-4 cms:hover:underline", children: w.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:truncate", children: w.label }),
          /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", title: w.field, children: w.fieldLabel ?? w.field })
        ] }, `${w.label}:${w.field}`))
      ] }),
      /* @__PURE__ */ e.jsx(
        t.CollapsibleCard,
        {
          title: "Page settings",
          titleClassName: "cms:text-base",
          storageKey: "cms:term:page-settings",
          hasErrors: j.template !== void 0,
          contentClassName: "cms:flex cms:flex-col cms:gap-2",
          children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: !p, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "template", children: "Template" }),
            /* @__PURE__ */ e.jsx(
              t.Input,
              {
                id: "template",
                className: "cms:font-mono",
                placeholder: "The taxonomy's",
                value: b.data.template,
                onChange: (w) => b.setData("template", w.target.value),
                "aria-invalid": j.template !== void 0
              }
            ),
            /* @__PURE__ */ e.jsx(I, { message: j.template })
          ] })
        }
      )
    ] })
  ] });
}
const Ae = "__top";
function ds(s = []) {
  return s.length === 0 ? "" : ` It's used by ${s.slice(0, 5).join("; ")}${s.length > 5 ? ` and ${s.length - 5} more` : ""}.`;
}
function Sl({ taxonomy: s, taxonomies: a, terms: l, locales: n, locale: c, trashed: r = !1 }) {
  t.useBreadcrumbs([{ label: "Terms", href: T("cms/terms") }, ...s ? [{ label: s.title }] : []]);
  const [i, m] = ne(), [d, o] = $.useState(null), [x, g] = $.useState(l);
  if ($.useEffect(() => g(l), [l]), !s)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(S.Head, { title: "Terms" }),
      /* @__PURE__ */ e.jsx(t.PageHeader, { title: "Terms", description: "There are no taxonomies yet. Create one under Structure → Taxonomies (categories, tags…), then add its terms here." })
    ] });
  const u = T(`cms/taxonomies/${s.handle}/terms`), h = (j, N) => {
    const k = N.map((C) => x[C].id);
    g(Ge(x, j, N)), S.router.post(
      T("cms/terms/reorder"),
      { taxonomy: s.handle, ids: k, parent_id: j < 0 ? null : x[j].id },
      { preserveScroll: !0, preserveState: !0, onError: () => g(l) }
    );
  }, b = (j) => /* @__PURE__ */ e.jsx(
    t.SortableList,
    {
      items: ae(x, j),
      getId: (N) => x[N].id,
      getLabel: (N) => x[N].title ?? x[N].fallback,
      disabled: r,
      onReorder: (N) => h(j, N),
      className: j < 0 ? "cms:gap-1" : "cms:mt-1 cms:gap-1 cms:pl-6",
      children: (N, { handle: k, isOverlay: C }) => {
        const y = x[N];
        return /* @__PURE__ */ e.jsxs("div", { className: "cms:rounded-lg cms:border cms:border-border/70 cms:bg-card", children: [
          /* @__PURE__ */ e.jsx("div", { className: "cms:p-2", children: r ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3 cms:pl-1", children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:flex-1 cms:font-medium", children: y.title ?? y.fallback }),
            /* @__PURE__ */ e.jsxs(t.Button, { variant: "outline", size: "sm", onClick: () => S.router.post(T(`cms/terms/${y.id}/restore`), {}, { preserveScroll: !0 }), children: [
              /* @__PURE__ */ e.jsx(ue, {}),
              " Restore"
            ] }),
            /* @__PURE__ */ e.jsxs(
              t.Button,
              {
                variant: "ghost",
                size: "sm",
                className: "cms:text-destructive",
                onClick: () => i(
                  `Delete "${y.fallback}" for good, in every language? Entries lose it.${ds(y.usedBy)}`,
                  () => S.router.delete(T(`cms/terms/${y.id}/force`), { preserveScroll: !0, data: (y.usedBy ?? []).length > 0 ? { force: 1 } : {} })
                ),
                children: [
                  /* @__PURE__ */ e.jsx(K, {}),
                  " Delete for good"
                ]
              }
            )
          ] }) : d === y.id && !C ? /* @__PURE__ */ e.jsx(
            ms,
            {
              action: T(`cms/terms/${y.id}`),
              method: "put",
              locale: c,
              terms: l,
              hierarchical: s.hierarchical,
              term: y,
              submitLabel: "Save",
              onDone: () => o(null)
            }
          ) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(t.SortableHandle, { ...k, label: `Move ${y.fallback}` }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0 cms:flex-1", children: [
              y.title !== null ? /* @__PURE__ */ e.jsx("span", { className: "cms:font-medium", children: y.title }) : /* @__PURE__ */ e.jsxs("span", { className: "cms:text-muted-foreground cms:italic", children: [
                y.fallback,
                " · not translated"
              ] }),
              y.slug && /* @__PURE__ */ e.jsxs("span", { className: "cms:ml-2 cms:text-xs cms:text-muted-foreground", children: [
                "/",
                y.slug
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(t.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Rename ${y.fallback}`, onClick: () => o(y.id), children: /* @__PURE__ */ e.jsx(Ys, {}) }),
            s.pages && y.title !== null && /* @__PURE__ */ e.jsx(t.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Edit ${y.fallback}'s page`, asChild: !0, children: /* @__PURE__ */ e.jsx(S.Link, { href: T(`cms/terms/${y.id}/edit`) + `?locale=${c}`, children: /* @__PURE__ */ e.jsx(Jt, {}) }) }),
            /* @__PURE__ */ e.jsx(
              t.Button,
              {
                variant: "ghost",
                size: "icon",
                className: "cms:size-8 cms:text-destructive",
                "aria-label": `Move ${y.fallback} to the trash`,
                onClick: () => i(
                  `Move "${y.fallback}" to the trash, with the terms under it? It comes off the site; you can restore it.${ds(y.usedBy)}`,
                  () => S.router.delete(T(`cms/terms/${y.id}`), { preserveScroll: !0 }),
                  "Move to trash"
                ),
                children: /* @__PURE__ */ e.jsx(K, {})
              }
            )
          ] }) }),
          !C && !r && ae(x, N).length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:px-2 cms:pb-2", children: b(N) })
        ] });
      }
    }
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: s.title }),
    m,
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: s.title,
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(t.Button, { variant: r ? "secondary" : "ghost", size: "sm", onClick: () => S.router.get(u, { locale: c, ...r ? {} : { trashed: 1 } }), children: r ? "Back to terms" : "Trash" }),
          n.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: c, onValueChange: (j) => S.router.get(u, { locale: j, ...r ? { trashed: 1 } : {} }), children: [
            /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(t.SelectContent, { children: n.map((j) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: j, children: P(j) }, j)) })
          ] })
        ] }),
        children: a.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: s.handle, onValueChange: (j) => S.router.get(T(`cms/taxonomies/${j}/terms`)), children: [
          /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Taxonomy", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(t.SelectContent, { children: a.map((j) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: j.handle, children: j.title }, j.handle)) })
        ] })
      }
    ),
    !r && /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsx(t.CardContent, { children: /* @__PURE__ */ e.jsx(
      ms,
      {
        action: u,
        method: "post",
        locale: c,
        terms: l,
        hierarchical: s.hierarchical,
        submitLabel: "Add term"
      },
      `new-${l.length}`
    ) }) }),
    /* @__PURE__ */ e.jsx(t.Card, { className: "cms:p-2", children: x.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:p-4 cms:text-center cms:text-muted-foreground", children: r ? "The trash is empty." : "No terms yet." }) : b(-1) })
  ] });
}
function ms({ action: s, method: a, locale: l, terms: n, hierarchical: c, term: r, submitLabel: i, onDone: m }) {
  const d = S.useForm({ title: r?.title ?? "", slug: r?.slug ?? "", parent_id: r?.parentId ?? null, locale: l, version: r?.version ?? null }), o = d.errors, x = /* @__PURE__ */ new Set();
  if (r) {
    x.add(r.id);
    const h = n.findIndex((b) => b.id === r.id);
    for (let b = h + 1; b < n.length && (n[b]?.depth ?? 0) > r.depth; b++) x.add(n[b].id);
  }
  const g = (h) => {
    h.preventDefault(), d.submit(a, s, { preserveScroll: !0, onSuccess: () => {
      a === "post" && d.reset("title", "slug"), m?.();
    } });
  }, u = r ? `term-${r.id}` : "new-term";
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: g, className: "cms:grid cms:items-start cms:gap-3 cms:md:grid-cols-[2fr_1.5fr_1.5fr_auto]", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${u}-title`, className: r ? "cms:sr-only" : "", children: "Title" }),
      /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: `${u}-title`,
          value: d.data.title,
          placeholder: r?.fallback,
          required: !0,
          onChange: (h) => d.setData("title", h.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(I, { message: o.title ?? o.version })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${u}-slug`, className: r ? "cms:sr-only" : "", children: "Slug" }),
      /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: `${u}-slug`,
          className: "cms:font-mono",
          value: d.data.slug,
          placeholder: "Made from the title",
          onChange: (h) => d.setData("slug", h.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(I, { message: o.slug })
    ] }),
    c ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${u}-parent`, className: r ? "cms:sr-only" : "", children: "Under" }),
      /* @__PURE__ */ e.jsxs(
        t.Select,
        {
          value: d.data.parent_id === null ? Ae : String(d.data.parent_id),
          onValueChange: (h) => d.setData("parent_id", h === Ae ? null : Number(h)),
          children: [
            /* @__PURE__ */ e.jsx(t.SelectTrigger, { id: `${u}-parent`, children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(t.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(t.SelectItem, { value: Ae, children: "Top level" }),
              n.filter((h) => !x.has(h.id)).map((h) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: String(h.id), children: [
                "— ".repeat(h.depth),
                h.title ?? h.fallback
              ] }, h.id))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ e.jsx(I, { message: o.parent_id })
    ] }) : /* @__PURE__ */ e.jsx("div", {}),
    /* @__PURE__ */ e.jsxs("div", { className: `cms:flex cms:gap-2 ${r ? "" : "cms:md:mt-[17px]"}`, children: [
      /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", disabled: d.processing, children: [
        !r && /* @__PURE__ */ e.jsx(ee, {}),
        " ",
        i
      ] }),
      m && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", onClick: m, children: "Cancel" })
    ] })
  ] });
}
function kl(s) {
  return function(l) {
    const n = S.usePage().props.cms;
    return zt(n?.locales), /* @__PURE__ */ e.jsx(s, { ...l });
  };
}
const wl = {
  "Cms/Blueprints/Index": La,
  "Cms/Blueprints/Form": za,
  "Cms/Fieldsets/Index": tl,
  "Cms/Entries/Index": Ya,
  "Cms/Entries/Editor": Ia,
  "Cms/Entries/Listing": el,
  "Cms/Terms/Index": Sl,
  "Cms/Terms/Edit": Nl,
  "Cms/Globals/Index": nl,
  "Cms/Globals/Edit": al,
  "Cms/Menus/Index": pl,
  "Cms/Menus/Edit": dl,
  "Cms/Comments/Index": jl,
  "Cms/Submissions/Index": yl
};
Tt({
  pages: Object.fromEntries(Object.entries(wl).map(([s, a]) => [s, kl(a)]))
});
