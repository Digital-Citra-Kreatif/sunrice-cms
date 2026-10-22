const Bs = globalThis.Sunrice;
if (!Bs) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const e = Bs.modules["react/jsx-runtime"], Ls = globalThis.Sunrice;
if (!Ls) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const C = Ls.modules["@inertiajs/react"], hs = 3;
function es() {
  const s = globalThis.Sunrice;
  if (!s)
    throw new Error("[sunrice] This script runs outside the Sunrice admin panel (window.Sunrice is missing).");
  return s;
}
function Ta(s) {
  const a = es();
  if (a.version !== hs)
    throw new Error(`[sunrice] This plugin was built for admin runtime ${hs}, but the panel runs ${a.version}. Rebuild it with a matching @imajiner/admin-sdk.`);
  for (const [l, c] of Object.entries(s.pages ?? {}))
    a.registerPage(l, c);
}
function t(s, a = {}) {
  return es().t(s, a);
}
function A(s = "") {
  return es().adminUrl(s);
}
function te(s) {
  return { draft: t("Draft"), scheduled: t("Scheduled"), published: t("Published") }[s];
}
function U(s, a) {
  if (!s) return "—";
  const l = new Date(s);
  return Number.isNaN(l.getTime()) ? "—" : l.toLocaleString(document.documentElement.lang || void 0, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
}
function za(s, a = /* @__PURE__ */ new Date()) {
  const l = s ? new Date(s) : null;
  if (l && !Number.isNaN(l.getTime()) && l > a) return l;
  const c = new Date(a);
  return c.setDate(c.getDate() + 1), c.setMinutes(0, 0, 0), c;
}
function As(s) {
  const a = (l) => String(l).padStart(2, "0");
  return `${s.getFullYear()}-${a(s.getMonth() + 1)}-${a(s.getDate())}T${a(s.getHours())}:${a(s.getMinutes())}`;
}
function Ma(s, a, l, c = Date.now()) {
  const i = a === "" ? null : new Date(a);
  if (i === null || Number.isNaN(i.getTime())) return { action: "now", at: null };
  const r = (m) => Math.floor(m / 6e4), d = l ? new Date(l).getTime() : null;
  if (s !== "draft" && d !== null && r(d) === r(i.getTime())) return { action: "now", at: null };
  const x = i.toISOString();
  return i.getTime() > c ? { action: "schedule", at: x } : { action: s === "draft" ? "backdate" : "redate", at: x };
}
let Ye = {};
function Ba(s) {
  Ye = s ?? {};
}
function O(s, a) {
  if (a === void 0 && Ye[s]) return Ye[s];
  try {
    return new Intl.DisplayNames(a ? [a] : void 0, { type: "language" }).of(s.replace("_", "-")) ?? s;
  } catch {
    return s;
  }
}
function xs(s) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function La(s, a, l, c) {
  const i = xs(a), r = s === i || s.startsWith(`${i}-`) && /^\d+$/.test(s.slice(i.length + 1));
  return c && i !== "" && r ? xs(l) : s;
}
function Is(s, a, l) {
  return !s || a.trim() === "" || a.trim() === s ? null : l ? "redirects" : "breaks";
}
const Es = globalThis.Sunrice;
if (!Es) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const _ = Es.modules.react;
const Aa = (s) => s?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
function Ia(s, a, l = []) {
  if (a == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: Aa(s),
    size: 24,
    node: a,
    ...l.length > 0 ? { aliases: l } : {}
  };
}
const Ea = (s) => {
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
const Fa = (s) => {
  const a = Ea(s);
  return a.charAt(0).toUpperCase() + a.slice(1);
};
const Je = (...s) => s.filter((a, l, c) => !!a && a.trim() !== "" && c.indexOf(a) === l).join(" ").trim();
const re = {
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
function Ie(s) {
  return s != null;
}
function Ha(s, a = {}) {
  const l = a.attributeNames ?? {}, c = (u) => l[u] ?? u, i = s.size ?? s.width ?? re.width, r = s.size ?? s.height ?? re.height, d = s.aliases?.filter((u) => typeof u == "string" && u.trim() !== "").map((u) => `lucide-${u}`) ?? [], x = [...s.name ? [`lucide-${s.name}`] : [], ...d], m = a.className?.split(" ").filter(Boolean) ?? [], o = a.includeDefaultClasses === !1 ? Je(...m) : Je("lucide", ...x, ...m), g = a.absoluteStrokeWidth ? Number(a.strokeWidth ?? re["stroke-width"]) * Number(s.size ?? s.width ?? re.width) / Number(a.size ?? a.width ?? re.width) : a.strokeWidth ?? re["stroke-width"];
  return [
    "svg",
    {
      ...Object.entries(re).reduce((u, [v, y]) => (u[c(v)] = y, u), {}),
      ..."color" in a && a.color && {
        [c("stroke")]: a.color
      },
      ..."size" in a && Ie(a.size) && {
        [c("width")]: a.size,
        [c("height")]: a.size
      },
      ..."width" in a && Ie(a.width) && {
        [c("width")]: a.width
      },
      ..."height" in a && Ie(a.height) && {
        [c("height")]: a.height
      },
      [c("stroke-width")]: g,
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
      const [v, y, f] = u, j = a.nonScalingStroke ? { [c("vector-effect")]: "non-scaling-stroke", ...y } : y;
      return f ? [v, j, f] : [v, j];
    })
  ];
}
function Pa(s, a = {}) {
  return Ha(s, {
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
const Oa = (s) => {
  for (const a in s)
    if (a.startsWith("aria-") || a === "role" || a === "title")
      return !0;
  return !1;
}, Va = _.createContext({}), Ra = () => _.useContext(Va), Ua = _.forwardRef(
  ({
    color: s,
    size: a,
    width: l,
    height: c,
    strokeWidth: i,
    absoluteStrokeWidth: r,
    nonScalingStroke: d,
    className: x = "",
    children: m,
    iconNode: o = [],
    icon: g = {
      node: o,
      aliases: [],
      size: 24
    },
    ...p
  }, u) => {
    const {
      size: v = 24,
      strokeWidth: y = 2,
      absoluteStrokeWidth: f = !1,
      nonScalingStroke: j = !1,
      color: S = "currentColor",
      className: $ = ""
    } = Ra() ?? {}, b = !!m || Oa(p), [h, M, w = []] = Pa(g, {
      color: s ?? S,
      width: l ?? a ?? v,
      height: c ?? a ?? v,
      strokeWidth: i ?? y,
      absoluteStrokeWidth: r ?? f,
      nonScalingStroke: d ?? j,
      className: Je($, x),
      hasA11yProp: b,
      attributes: p
    });
    return _.createElement(
      h,
      {
        ref: u,
        ...M
      },
      [
        ...w.map(([B, z]) => _.createElement(B, z)),
        ...Array.isArray(m) ? m : [m]
      ]
    );
  }
);
function E(s, a = [], l = []) {
  const c = typeof s == "string" ? Ia(s, a, l) : s, i = _.forwardRef(
    ({ className: r, ...d }, x) => _.createElement(Ua, {
      ref: x,
      icon: c,
      className: r,
      ...d
    })
  );
  return c.name && (i.displayName = Fa(c.name)), i;
}
const Fs = {
  name: "arrow-down",
  size: 24,
  node: [
    ["path", { d: "M12 5v14", key: "s699le" }],
    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
  ]
};
Fs.node;
const Hs = E(Fs);
const Ps = {
  name: "arrow-up-down",
  size: 24,
  node: [
    ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
    ["path", { d: "M17 20V4", key: "1ejh1v" }],
    ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
    ["path", { d: "M7 4v16", key: "1glfcx" }]
  ]
};
Ps.node;
const Os = E(Ps);
const Vs = {
  name: "arrow-up",
  size: 24,
  node: [
    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
    ["path", { d: "M12 19V5", key: "x0mq9r" }]
  ]
};
Vs.node;
const Rs = E(Vs);
const Us = {
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
Us.node;
const qa = E(Us);
const qs = {
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
qs.node;
const Qe = E(qs);
const Ks = {
  name: "calendar",
  size: 24,
  node: [
    ["path", { d: "M8 2v3", key: "1ioesn" }],
    ["path", { d: "M16 2v3", key: "otl347" }],
    ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", key: "h1oib" }],
    ["path", { d: "M3 9h18", key: "1pudct" }]
  ]
};
Ks.node;
const Ka = E(Ks);
const Ws = {
  name: "check",
  size: 24,
  node: [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]
};
Ws.node;
const fe = E(Ws);
const Gs = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
Gs.node;
const Ys = E(Gs);
const Js = {
  name: "chevron-left",
  size: 24,
  node: [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]]
};
Js.node;
const ss = E(Js);
const Qs = {
  name: "chevron-right",
  size: 24,
  node: [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]
};
Qs.node;
const ve = E(Qs);
const Zs = {
  name: "chevrons-down-up",
  size: 24,
  node: [
    ["path", { d: "m7 20 5-5 5 5", key: "13a0gw" }],
    ["path", { d: "m7 4 5 5 5-5", key: "1kwcof" }]
  ]
};
Zs.node;
const Wa = E(Zs);
const Xs = {
  name: "chevrons-up-down",
  size: 24,
  node: [
    ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
    ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
  ]
};
Xs.node;
const Ga = E(Xs);
const et = {
  name: "columns-3",
  size: 24,
  node: [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M9 3v18", key: "fh3hqa" }],
    ["path", { d: "M15 3v18", key: "14nvp0" }]
  ],
  aliases: ["panels-left-right"]
};
et.node;
const Ya = E(et);
const st = {
  name: "copy",
  size: 24,
  node: [
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
  ]
};
st.node;
const tt = E(st);
const at = {
  name: "download",
  size: 24,
  node: [
    ["path", { d: "M12 15V3", key: "m9g1x1" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
  ]
};
at.node;
const nt = E(at);
const lt = {
  name: "ellipsis",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
    ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
    ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
  ],
  aliases: ["more-horizontal"]
};
lt.node;
const ct = E(lt);
const rt = {
  name: "external-link",
  size: 24,
  node: [
    ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
    ["path", { d: "M10 14 21 3", key: "gplh6r" }],
    ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
  ]
};
rt.node;
const xe = E(rt);
const it = {
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
it.node;
const Ja = E(it);
const ot = {
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
ot.node;
const Qa = E(ot);
const dt = {
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
dt.node;
const Za = E(dt);
const mt = {
  name: "hash",
  size: 24,
  node: [
    ["line", { x1: "4", x2: "20", y1: "9", y2: "9", key: "4lhtct" }],
    ["line", { x1: "4", x2: "20", y1: "15", y2: "15", key: "vyu0kd" }],
    ["line", { x1: "10", x2: "8", y1: "3", y2: "21", key: "1ggp8o" }],
    ["line", { x1: "16", x2: "14", y1: "3", y2: "21", key: "weycgp" }]
  ]
};
mt.node;
const Xa = E(mt);
const ut = {
  name: "image",
  size: 24,
  node: [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
    ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
    ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
  ]
};
ut.node;
const en = E(ut);
const ht = {
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
ht.node;
const sn = E(ht);
const xt = {
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
xt.node;
const ps = E(xt);
const pt = {
  name: "layout-template",
  size: 24,
  node: [
    ["rect", { width: "18", height: "7", x: "3", y: "3", rx: "1", key: "f1a2em" }],
    ["rect", { width: "9", height: "7", x: "3", y: "14", rx: "1", key: "jqznyg" }],
    ["rect", { width: "5", height: "7", x: "16", y: "14", rx: "1", key: "q5h2i8" }]
  ]
};
pt.node;
const gt = E(pt);
const ft = {
  name: "link-2",
  size: 24,
  node: [
    ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
    ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
    ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
  ]
};
ft.node;
const jt = E(ft);
const bt = {
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
bt.node;
const tn = E(bt);
const vt = {
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
vt.node;
const an = E(vt);
const yt = {
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
yt.node;
const Nt = E(yt);
const kt = {
  name: "loader-circle",
  size: 24,
  node: [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  aliases: ["loader-2"]
};
kt.node;
const le = E(kt);
const wt = {
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
wt.node;
const St = E(wt);
const Ct = {
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
Ct.node;
const nn = E(Ct);
const $t = {
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
$t.node;
const ln = E($t);
const Dt = {
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
Dt.node;
const cn = E(Dt);
const _t = {
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
_t.node;
const Tt = E(_t);
const zt = {
  name: "plus",
  size: 24,
  node: [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ]
};
zt.node;
const G = E(zt);
const Mt = {
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
Mt.node;
const rn = E(Mt);
const Bt = {
  name: "repeat",
  size: 24,
  node: [
    ["path", { d: "m17 2 4 4-4 4", key: "nntrym" }],
    ["path", { d: "M3 11v-1a4 4 0 0 1 4-4h14", key: "84bu3i" }],
    ["path", { d: "m7 22-4-4 4-4", key: "1wqhfi" }],
    ["path", { d: "M21 13v1a4 4 0 0 1-4 4H3", key: "1rx37r" }]
  ]
};
Bt.node;
const on = E(Bt);
const Lt = {
  name: "rotate-ccw",
  size: 24,
  node: [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ]
};
Lt.node;
const je = E(Lt);
const At = {
  name: "search",
  size: 24,
  node: [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ]
};
At.node;
const ye = E(At);
const It = {
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
It.node;
const dn = E(It);
const Et = {
  name: "settings-2",
  size: 24,
  node: [
    ["path", { d: "M14 17H5", key: "gfn3mx" }],
    ["path", { d: "M19 7h-9", key: "6i9tg" }],
    ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
    ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
  ]
};
Et.node;
const ts = E(Et);
const Ft = {
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
Ft.node;
const mn = E(Ft);
const Ht = {
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
Ht.node;
const Ze = E(Ht);
const Pt = {
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
Pt.node;
const un = E(Pt);
const Ot = {
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
Ot.node;
const hn = E(Ot);
const Vt = {
  name: "text-align-start",
  size: 24,
  node: [
    ["path", { d: "M21 5H3", key: "1fi0y6" }],
    ["path", { d: "M15 12H3", key: "6jk70r" }],
    ["path", { d: "M17 19H3", key: "z6ezky" }]
  ],
  aliases: ["text", "align-left"]
};
Vt.node;
const xn = E(Vt);
const Rt = {
  name: "toggle-left",
  size: 24,
  node: [
    ["circle", { cx: "9", cy: "12", r: "3", key: "u3jwor" }],
    ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "7", key: "g7kal2" }]
  ]
};
Rt.node;
const pn = E(Rt);
const Ut = {
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
Ut.node;
const q = E(Ut);
const qt = {
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
qt.node;
const gn = E(qt);
const Kt = {
  name: "type",
  size: 24,
  node: [
    ["path", { d: "M12 4v16", key: "1654pz" }],
    ["path", { d: "M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2", key: "e0r10z" }],
    ["path", { d: "M9 20h6", key: "s66wpe" }]
  ]
};
Kt.node;
const fn = E(Kt);
const Wt = {
  name: "undo-2",
  size: 24,
  node: [
    ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
    ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
  ]
};
Wt.node;
const ze = E(Wt);
const Gt = {
  name: "x",
  size: 24,
  node: [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]
};
Gt.node;
const Ne = E(Gt), Yt = globalThis.Sunrice;
if (!Yt) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const n = Yt.modules["@imajiner/admin-sdk/ui"];
function Jt({ id: s, children: a }) {
  return /* @__PURE__ */ e.jsxs("p", { id: s, className: "cms:flex cms:items-start cms:gap-2 cms:rounded-md cms:border cms:border-amber-500/40 cms:bg-amber-500/10 cms:px-3 cms:py-2 cms:text-sm cms:text-amber-900 cms:dark:text-amber-200", children: [
    /* @__PURE__ */ e.jsx(gn, { className: "cms:mt-0.5 cms:size-4 cms:shrink-0", "aria-hidden": !0 }),
    /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:[overflow-wrap:anywhere] cms:[&_code]:rounded cms:[&_code]:bg-amber-500/15 cms:[&_code]:px-1 cms:[&_code]:font-mono cms:[&_code]:text-[0.8125rem]", children: a })
  ] });
}
function ce() {
  const [s, a] = _.useState(null), l = /* @__PURE__ */ e.jsx(n.Dialog, { open: s !== null, onOpenChange: (c) => !c && a(null), children: /* @__PURE__ */ e.jsxs(n.DialogContent, { children: [
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
function ie(s) {
  return s && typeof s == "object" && !Array.isArray(s) ? s : {};
}
function jn(s, a) {
  if (typeof s != "string" || s === "") return "";
  const l = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(s);
  return l ? a ? `${l[1]}T${l[2] ?? "00:00"}` : l[1] ?? "" : "";
}
function gs(s) {
  return s === "" ? null : s;
}
function bn(s) {
  const a = typeof s == "number" ? s : typeof s == "string" && s.trim() !== "" ? Number(s) : NaN;
  return !Number.isFinite(a) || Math.abs(a) < 1e4 ? null : new Intl.NumberFormat("en", { maximumFractionDigits: 20 }).format(a);
}
function vn(s, a, l, c) {
  return a || s.some((i) => ["none", ""].includes(i.label.trim().toLowerCase()) || i.value.trim().toLowerCase() === "none") ? !1 : !l || !c;
}
function Me(s) {
  return s.some((a) => a.shared === !0 || Me(a.fields ?? []) || (a.blocks ?? []).some((l) => Me(l.fields)));
}
function yn() {
  return { _hidden: !1 };
}
function as(s, a, l = 60) {
  for (const c of s) {
    const i = a[c.handle];
    let r = null;
    ["text", "textarea", "email", "url"].includes(c.type) && typeof i == "string" ? r = i : c.type === "rich_text" && typeof i == "string" ? r = i.replace(/<[^>]*>/g, " ") : c.type === "group" && Array.isArray(c.fields) && (r = as(c.fields, ie(i), l));
    const d = (r ?? "").replace(/\s+/g, " ").trim();
    if (d !== "") return d.length > l ? `${d.slice(0, l - 1).trimEnd()}…` : d;
  }
  return null;
}
function Nn(s) {
  return { type: s, hidden: !1, values: {} };
}
function kn(s) {
  const a = s.replace(/[\u0000- \u007f]+/g, ""), l = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(a);
  return l ? ["http", "https", "mailto", "tel"].includes(l[1].toLowerCase()) : !a.includes("\\");
}
function Qt({ ids: s, search: a, collections: l }) {
  const c = new URLSearchParams();
  for (const i of s ?? []) c.append("ids[]", String(i));
  a && c.set("search", a);
  for (const i of l) c.append("collections[]", i);
  return c.toString();
}
let wn = 0;
function Sn(s, a) {
  return s.length === a ? s.slice() : s.length < a ? [...s, ...Array.from({ length: a - s.length }, () => `k${++wn}`)] : s.slice(0, a);
}
function Cn({ taxonomy: s, q: a, ids: l }) {
  const c = new URLSearchParams({ taxonomy: s });
  a && c.set("q", a);
  for (const i of l ?? []) c.append("ids[]", String(i));
  return c.toString();
}
async function fs(s) {
  const a = await fetch(`${A("cms/entries/picker")}?${Qt(s)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!a.ok) throw new Error(String(a.status));
  const l = await a.json();
  return { items: l.items, unavailable: l.unavailable ?? [] };
}
function $n(s) {
  return s.length < 2 ? s[0] ?? "" : t(":items and :last", { items: s.slice(0, -1).join(", "), last: s[s.length - 1] });
}
function ke({ id: s, value: a, multiple: l, max: c, collections: i, invalid: r, onChange: d, emptyHint: x }) {
  const m = a === null ? [] : Array.isArray(a) ? a : [a], [o, g] = _.useState({}), [p, u] = _.useState(""), [v, y] = _.useState(!1), [f, j] = _.useState(null), [S, $] = _.useState([]), [b, h] = _.useState(!1), M = l && c !== null && m.length >= c, w = m.filter((D) => !o[D]).join(",");
  _.useEffect(() => {
    w !== "" && fs({ ids: w.split(",").map(Number), collections: i }).then(({ items: D }) => g((P) => ({ ...P, ...Object.fromEntries(D.map((N) => [N.id, N])) }))).catch(() => h(!0));
  }, [w]), _.useEffect(() => {
    if (!v) {
      j(null);
      return;
    }
    const D = window.setTimeout(() => {
      fs({ search: p.trim(), collections: i }).then((P) => {
        j(P.items), $(P.unavailable), h(!1);
      }).catch(() => h(!0));
    }, p.trim() === "" ? 0 : 250);
    return () => window.clearTimeout(D);
  }, [p, v]);
  const B = (D) => {
    g((P) => ({ ...P, [D.id]: D })), d(l ? [...m, D.id] : D.id), u("");
  }, z = (D) => d(l ? D : D[0] ?? null);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    m.length > 0 && /* @__PURE__ */ e.jsx(n.SortableList, { items: m, getId: (D) => D, getLabel: (D) => o[D]?.title ?? `Entry #${D}`, onReorder: (D) => z(D), disabled: !l, className: "cms:gap-1", children: (D, { handle: P }) => {
      const N = o[D];
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-md cms:border cms:bg-card cms:px-2 cms:py-1 cms:text-sm", children: [
        l && /* @__PURE__ */ e.jsx(n.SortableHandle, { ...P, label: t("Move :title", { title: N?.title ?? D }) }),
        /* @__PURE__ */ e.jsx("span", { className: `cms:min-w-0 cms:flex-1 cms:truncate ${l ? "" : "cms:pl-1"}`, children: N ? N.title : t("Entry #:id", { id: D }) }),
        N && /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: N.collection }),
        N && /* @__PURE__ */ e.jsx(n.Badge, { variant: N.status === "published" ? "success" : "secondary", children: te(N.status) }),
        /* @__PURE__ */ e.jsx(
          n.Button,
          {
            type: "button",
            variant: "ghost",
            size: "icon",
            className: "cms:size-7",
            "aria-label": t("Remove :title", { title: N?.title ?? D }),
            onClick: () => z(m.filter((L) => L !== D)),
            children: /* @__PURE__ */ e.jsx(Ne, {})
          }
        )
      ] });
    } }),
    !M && (l || m.length === 0) && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-md", children: [
      /* @__PURE__ */ e.jsx(ye, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
      /* @__PURE__ */ e.jsx(
        n.Input,
        {
          id: s,
          className: "cms:pl-9",
          placeholder: t("Search entries by title"),
          "aria-invalid": r,
          value: p,
          autoComplete: "off",
          "aria-expanded": f !== null,
          onFocus: () => y(!0),
          onBlur: () => y(!1),
          onKeyDown: (D) => {
            D.key === "Escape" && v && (D.preventDefault(), y(!1));
          },
          onChange: (D) => {
            u(D.target.value), y(!0);
          }
        }
      ),
      f !== null && /* @__PURE__ */ e.jsxs("ul", { role: "listbox", "aria-label": t("Matching entries"), className: "cms:absolute cms:z-10 cms:mt-1 cms:max-h-64 cms:w-full cms:overflow-auto cms:rounded-md cms:border cms:bg-card cms:p-1 cms:shadow-md", children: [
        f.filter((D) => !m.includes(D.id)).length === 0 && /* @__PURE__ */ e.jsxs("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: [
          p.trim() === "" ? t("No entries yet.") : t("No entries match."),
          x && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            " ",
            x
          ] })
        ] }),
        S.length > 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: t("Your role can't see entries of :collections: ask an editor to link them.", { collections: $n(S) }) }),
        f.filter((D) => !m.includes(D.id)).map((D) => /* @__PURE__ */ e.jsx("li", { role: "option", "aria-selected": !1, children: /* @__PURE__ */ e.jsxs(
          "button",
          {
            type: "button",
            className: "cms:flex cms:w-full cms:items-center cms:gap-2 cms:rounded cms:px-2 cms:py-1.5 cms:text-left cms:text-sm cms:hover:bg-accent",
            onMouseDown: (P) => P.preventDefault(),
            onClick: () => B(D),
            children: [
              /* @__PURE__ */ e.jsx("span", { className: "cms:flex-1 cms:truncate", children: D.title }),
              /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: D.collection })
            ]
          }
        ) }, D.id))
      ] })
    ] }),
    b && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t("Entries could not be loaded. Try again.") })
  ] });
}
const Zt = _.createContext({}), Ee = "__none";
async function js(s) {
  const a = await fetch(`${A("cms/terms/picker")}?${Cn(s)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!a.ok) throw new Error(String(a.status));
  return await a.json();
}
function Xt({ id: s, taxonomy: a, multiple: l, max: c, required: i, invalid: r, value: d, onChange: x }) {
  const m = _.useContext(Zt), o = d === null ? [] : Array.isArray(d) ? d : [d], [g, p] = _.useState(null), [u, v] = _.useState(!1), [y, f] = _.useState(""), [j, S] = _.useState({}), [$, b] = _.useState(!1);
  _.useEffect(() => {
    if (!a) return;
    const N = y.trim(), L = window.setTimeout(() => {
      js({ taxonomy: a, q: N }).then((V) => {
        p(V.items), V.more && v(!0), b(!1);
      }).catch(() => b(!0));
    }, N === "" ? 0 : 250);
    return () => window.clearTimeout(L);
  }, [a, y]);
  const h = (N) => m[String(N)] ?? j[N] ?? g?.find((L) => L.id === N)?.label, M = g === null ? "" : o.filter((N) => h(N) === void 0).join(",");
  if (_.useEffect(() => {
    !a || M === "" || js({ taxonomy: a, ids: M.split(",").map(Number) }).then((N) => S((L) => ({ ...L, ...Object.fromEntries(N.items.map((V) => [V.id, V.label])) }))).catch(() => b(!0));
  }, [a, M]), !a) return /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("Choose a taxonomy for this field in its blueprint.") });
  if (g === null) return $ ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t("Terms could not be loaded. Try again.") }) : /* @__PURE__ */ e.jsx(n.Skeleton, { className: "cms:h-9 cms:w-full cms:max-w-sm" });
  const w = (N) => `${"— ".repeat(N.depth)}${N.label}`, B = l && c !== null && o.length >= c, z = (N) => x(l ? N : N[0] ?? null), D = u && o.length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-1.5", children: o.map((N) => /* @__PURE__ */ e.jsxs(n.Badge, { variant: "secondary", className: "cms:gap-1 cms:pr-1", children: [
    h(N) ?? t("Term #:id", { id: N }),
    !(i && !l) && /* @__PURE__ */ e.jsx(
      "button",
      {
        type: "button",
        className: "cms:rounded-sm cms:p-0.5 cms:hover:bg-muted",
        "aria-label": t("Remove :title", { title: h(N) ?? N }),
        onClick: () => z(o.filter((L) => L !== N)),
        children: /* @__PURE__ */ e.jsx(Ne, { className: "cms:size-3" })
      }
    )
  ] }, N)) }), P = u && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-sm", children: [
    /* @__PURE__ */ e.jsx(ye, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
    /* @__PURE__ */ e.jsx(
      n.Input,
      {
        id: s,
        className: "cms:pl-9",
        placeholder: t("Search terms"),
        autoComplete: "off",
        "aria-invalid": r,
        value: y,
        onChange: (N) => f(N.target.value)
      }
    )
  ] });
  if (!l && !u) {
    const N = o[0], L = N === void 0 || g.some((V) => V.id === N);
    return /* @__PURE__ */ e.jsxs(n.Select, { value: N === void 0 ? Ee : String(N), onValueChange: (V) => x(V === Ee ? null : Number(V)), children: [
      /* @__PURE__ */ e.jsx(n.SelectTrigger, { id: s, className: "cms:w-full cms:max-w-sm", "aria-invalid": r, children: /* @__PURE__ */ e.jsx(n.SelectValue, { children: N === void 0 ? t("None") : h(N) ?? t("Term #:id", { id: N }) }) }),
      /* @__PURE__ */ e.jsxs(n.SelectContent, { children: [
        !i && /* @__PURE__ */ e.jsx(n.SelectItem, { value: Ee, children: t("None") }),
        !L && N !== void 0 && /* @__PURE__ */ e.jsx(n.SelectItem, { value: String(N), children: h(N) ?? t("Term #:id", { id: N }) }),
        g.map((V) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: String(V.id), children: w(V) }, V.id))
      ] })
    ] });
  }
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    D,
    P,
    g.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: y.trim() ? t("No terms match.") : t("Nothing to choose from yet.") }) : l ? /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:max-h-72 cms:flex-col cms:gap-2 cms:overflow-auto", children: g.map((N) => {
      const L = o.includes(N.id);
      return /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx(
          n.Checkbox,
          {
            checked: L,
            disabled: !L && B,
            onCheckedChange: (V) => z(V ? [...o, N.id] : o.filter((me) => me !== N.id))
          }
        ),
        w(N)
      ] }, N.id);
    }) }) : /* @__PURE__ */ e.jsx("div", { role: "listbox", "aria-label": t("Terms"), className: "cms:flex cms:max-h-72 cms:flex-col cms:overflow-auto", children: g.map((N) => /* @__PURE__ */ e.jsx(
      n.Button,
      {
        type: "button",
        variant: o[0] === N.id ? "secondary" : "ghost",
        size: "sm",
        className: "cms:justify-start",
        role: "option",
        "aria-selected": o[0] === N.id,
        onClick: () => x(N.id),
        children: w(N)
      },
      N.id
    )) })
  ] });
}
const ea = (s, a = {}) => s.replace(/:([A-Za-z_]+)/g, (l, c) => a[c] ?? l), Dn = 5;
let _n = 0;
const ns = () => `f${++_n}`;
function sa(s) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function ls(s) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^[0-9_]+/, "").replace(/_{2,}/g, "_").slice(0, 64);
}
function ta(s, a) {
  const l = new Set(a.map((r) => r.handle)), c = sa(s) || "field";
  let i = c;
  for (let r = 2; l.has(i); r++)
    i = `${c}_${r}`;
  return i;
}
function aa(s) {
  return (s ?? []).map(({ fields: a, ...l }) => ({
    ...l,
    key: ns(),
    fields: aa(a),
    handleTouched: !0,
    savedHandle: l.handle
  }));
}
function na(s, a) {
  return s.map(({ key: l, handleTouched: c, savedHandle: i, fields: r, ...d }) => ({
    ...d,
    validation: (d.validation ?? []).map((x) => x.trim()).filter((x) => x !== ""),
    ...a(d.type) ? { fields: na(r, a) } : {}
  }));
}
function Tn(s, a, l) {
  return { key: ns(), type: s, label: a, handle: ta(a, l), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function Fe(s) {
  return s.type !== "fieldset" && s.savedHandle !== void 0 && s.savedHandle !== "" && s.handle !== s.savedHandle ? s.savedHandle : null;
}
function la(s) {
  return s.map((a) => ({ ...a, savedHandle: a.handle, fields: la(a.fields) }));
}
function bs(s, a, l) {
  if (s.handleTouched) return { ...s, label: a };
  const c = l.filter((i) => i.key !== s.key);
  return { ...s, label: a, handle: ta(a || s.type, c) };
}
function oe(s, a) {
  const l = `${a}.`, c = {};
  for (const [i, r] of Object.entries(s))
    i.startsWith(l) && (c[i.slice(l.length)] = r);
  return c;
}
function Y(s, a) {
  const l = s[a];
  return { ...oe(s, a), ...l !== void 0 ? { "": l } : {} };
}
function Le(s, a) {
  return Object.keys(s).filter((l) => l === a || l.startsWith(`${a}.`));
}
function we(s, a) {
  return Object.keys(s).some((l) => l === a || l.startsWith(`${a}.`));
}
function zn(s, a) {
  return a.filter((l) => l.key !== s.key && l.handle !== "" && l.type !== "fieldset");
}
function ca(s, a, l, c = ea) {
  return s.type === "fieldset" ? null : l?.includes(s.handle) ? c('":handle" is used by the content itself; choose another handle.', { handle: s.handle }) : s.handle !== "" && a.some((i) => i.key !== s.key && i.type !== "fieldset" && i.handle === s.handle) ? c('There is already a field ":handle" here.', { handle: s.handle }) : null;
}
function ra(s, a) {
  return typeof s.translatable == "boolean" ? s.translatable : a;
}
function Mn(s, a, l) {
  return { ...s, translatable: a === l ? null : a };
}
function Bn(s, a, l = []) {
  const c = /* @__PURE__ */ new Set([...a.map((d) => d.handle), ...l]), i = `${(ls(s) || "field").slice(0, 56)}_copy`;
  let r = i;
  for (let d = 2; c.has(r); d++)
    r = `${i}_${d}`;
  return r;
}
function ia(s) {
  const { key: a, savedHandle: l, fields: c, ...i } = s;
  return { ...structuredClone(i), key: ns(), fields: c.map(ia) };
}
function Ln(s, a, l = [], c = ea) {
  const i = s[a];
  if (i === void 0) return null;
  const r = i.label || i.handle, d = {
    ...ia(i),
    label: c(":label (copy)", { label: r }),
    handle: i.type === "fieldset" ? i.handle : Bn(i.handle, s, l),
    handleTouched: !0
  };
  return { fields: [...s.slice(0, a + 1), d, ...s.slice(a + 1)], copy: d };
}
function An(s, a) {
  const l = s.condition;
  return !l || "rules" in l ? null : (l.operator === "filled" || l.operator === "equals" && (l.value === !0 || l.value === "true")) && a.some((i) => i.handle === l.field && i.type === "toggle") ? l.field : null;
}
function In(s) {
  const a = (i) => i.type === "number" || i.type === "text" && (i.instructions ?? "").length <= 60, l = {}, c = [];
  for (const i of s) {
    const r = An(i, s);
    r === null ? c.push(i) : (l[r] ??= []).push(i);
  }
  return { options: c.filter((i) => !a(i)), limits: c.filter(a), dependents: l };
}
const He = [
  { value: "equals", label: "is", needsValue: !0 },
  { value: "not_equals", label: "is not", needsValue: !0 },
  { value: "filled", label: "is filled in", needsValue: !1 },
  { value: "empty", label: "is empty", needsValue: !1 }
];
function vs(s) {
  return s === !0 ? "true" : s === !1 ? "false" : typeof s == "string" || typeof s == "number" ? String(s) : "";
}
function oa(s) {
  return s ? "rules" in s ? Array.isArray(s.rules) ? s.rules : [] : [s] : [];
}
function da(s) {
  return s && "rules" in s && s.match === "any" ? "any" : "all";
}
function En(s, a) {
  return s.length === 0 ? null : s.length === 1 ? s[0] : { match: a, rules: s };
}
function ys(s, a) {
  const l = a[s.field], c = l != null && l !== "" && l !== !1 && !(Array.isArray(l) && l.length === 0), i = (Array.isArray(l) ? l : [l]).map(vs).includes(vs(s.value));
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
function cs(s, a) {
  const l = oa(s.condition);
  return l.length === 0 ? !0 : da(s.condition) === "any" ? l.some((c) => ys(c, a)) : l.every((c) => ys(c, a));
}
function Pe(s) {
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
function Ns(s) {
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
const Oe = "__none";
function H({ message: s, id: a }) {
  return s ? /* @__PURE__ */ e.jsx("p", { id: a, className: "cms:text-sm cms:text-destructive", children: s }) : null;
}
function Ve(s) {
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
const Fn = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function Be(s) {
  if (s.label) return s.label;
  const a = s.handle.replace(/_/g, " ");
  return a.charAt(0).toUpperCase() + a.slice(1);
}
function ae({ field: s, value: a, onChange: l, errors: c, id: i, content: r = !1, fill: d = !1 }) {
  const x = Be(s), m = Fn.includes(s.type) || ["select", "terms"].includes(s.type) && s.config?.multiple === !0, o = c[""] !== void 0;
  return /* @__PURE__ */ e.jsxs(
    "div",
    {
      className: "cms:flex cms:flex-col cms:gap-2",
      ...m ? { role: "group", "aria-labelledby": `${i}-label`, ...o ? { "aria-invalid": !0, "aria-describedby": `${i}-error` } : {} } : {},
      children: [
        s.type === "toggle" ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
          /* @__PURE__ */ e.jsx(n.Switch, { id: i, checked: a === !0, onCheckedChange: (g) => l(g) }),
          /* @__PURE__ */ e.jsx(n.Label, { htmlFor: i, children: x })
        ] }) : /* @__PURE__ */ e.jsxs(n.Label, { id: `${i}-label`, htmlFor: m ? void 0 : i, children: [
          x,
          s.required && /* @__PURE__ */ e.jsx("span", { className: "cms:text-destructive", children: " *" })
        ] }),
        /* @__PURE__ */ e.jsx(Pn, { field: s, value: a, onChange: l, errors: c, id: i, content: r, fill: d }),
        ["text", "textarea"].includes(s.type) && se(s, "max") !== void 0 && /* @__PURE__ */ e.jsx(Hn, { length: typeof a == "string" ? [...a].length : 0, max: se(s, "max") ?? 0 }),
        s.instructions && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s.instructions }),
        /* @__PURE__ */ e.jsx(H, { message: c[""], id: `${i}-error` })
      ]
    }
  );
}
function Hn({ length: s, max: a }) {
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
function Pn({ field: s, value: a, onChange: l, errors: c, id: i, content: r, fill: d = !1 }) {
  const x = c[""] !== void 0;
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
          "aria-invalid": x,
          value: typeof a == "string" ? a : "",
          rows: se(s, "rows") ?? 4,
          onChange: (m) => l(m.target.value)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ e.jsx(n.RichTextEditor, { id: i, labelledBy: `${i}-label`, invalid: x, value: typeof a == "string" ? a : "", onChange: l });
    case "number": {
      const m = bn(a);
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(
          n.Input,
          {
            id: i,
            type: "number",
            className: d ? "cms:w-full" : "cms:max-w-48",
            placeholder: ks(s, "placeholder"),
            "aria-invalid": x,
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
          invalid: x,
          required: s.required === !0,
          value: gs(jn(a, m)),
          onChange: (o) => l(gs(o ?? ""))
        }
      );
    }
    case "select":
      return s.config?.multiple === !0 ? /* @__PURE__ */ e.jsx(
        Vn,
        {
          options: Ve(s),
          value: Array.isArray(a) ? a.map(String) : [],
          onChange: l,
          invalid: x,
          empty: typeof s.config?.empty == "string" ? s.config.empty : void 0,
          inTickOrder: s.config?.in_tick_order === !0
        }
      ) : /* @__PURE__ */ e.jsx(
        On,
        {
          options: Ve(s),
          value: typeof a == "string" ? a : null,
          onChange: l,
          id: i,
          fill: d,
          empty: vn(Ve(s), s.required === !0, typeof s.config?.default == "string" && s.config.default !== "", typeof a == "string" && a !== "")
        }
      );
    case "terms": {
      const m = s.config?.multiple === !0, o = Array.isArray(a) ? a.filter((g) => typeof g == "number") : typeof a == "number" ? a : null;
      return /* @__PURE__ */ e.jsx(
        Xt,
        {
          id: i,
          taxonomy: typeof s.taxonomy == "string" ? s.taxonomy : null,
          multiple: m,
          max: se(s, "max") ?? null,
          required: s.required === !0,
          invalid: x,
          value: m ? Array.isArray(o) ? o : [] : typeof o == "number" ? o : null,
          onChange: l
        }
      );
    }
    case "entries":
      return /* @__PURE__ */ e.jsx(
        ke,
        {
          id: i,
          invalid: x,
          multiple: s.config?.multiple === !0,
          max: se(s, "max") ?? null,
          collections: s.collections ?? [],
          onChange: l,
          value: typeof a == "number" || Array.isArray(a) && a.every((m) => typeof m == "number") ? a : null
        }
      );
    case "link":
      return /* @__PURE__ */ e.jsx(Rn, { label: Be(s), value: ie(a), onChange: l, errors: c, id: i, collections: s.collections ?? [] });
    case "media":
      return /* @__PURE__ */ e.jsx(
        n.MediaPickerInput,
        {
          id: i,
          invalid: x,
          disabled: !1,
          multiple: s.config?.multiple === !0,
          max: se(s, "max") ?? null,
          types: Array.isArray(s.config?.types) ? s.config.types : [],
          value: typeof a == "number" || Array.isArray(a) && a.every((m) => typeof m == "number") ? a : null,
          onChange: l
        }
      );
    case "group":
      return /* @__PURE__ */ e.jsx(de, { fields: s.fields ?? [], value: ie(a), onChange: l, errors: c, id: i, content: r });
    case "repeater":
      return /* @__PURE__ */ e.jsx(Un, { field: s, value: Array.isArray(a) ? a : [], onChange: l, errors: c, id: i, content: r });
    case "flexible":
      return /* @__PURE__ */ e.jsx(qn, { field: s, value: Array.isArray(a) ? a : [], onChange: l, errors: c, id: i });
    default:
      return /* @__PURE__ */ e.jsx(
        n.Input,
        {
          id: i,
          "aria-invalid": x,
          value: typeof a == "string" ? a : "",
          placeholder: ks(s, "placeholder"),
          onChange: (m) => l(m.target.value)
        }
      );
  }
}
function se(s, a) {
  const l = s.config?.[a];
  return typeof l == "number" ? l : void 0;
}
function ks(s, a) {
  const l = s.config?.[a];
  return typeof l == "string" ? l : void 0;
}
function de({ fields: s, value: a, onChange: l, errors: c, id: i, content: r, bare: d = !1 }) {
  return /* @__PURE__ */ e.jsx("div", { className: d ? "cms:flex cms:flex-col cms:gap-6" : "cms:flex cms:flex-col cms:gap-4 cms:rounded-lg cms:border cms:p-4", children: s.filter((x) => cs(x, a)).map((x) => x.shared ? (
    // Greyed out; the form says once, at the top, where to edit shared fields.
    /* @__PURE__ */ e.jsx("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1 cms:opacity-60", title: t("Shared by all languages: edit it in the main language."), children: /* @__PURE__ */ e.jsx(ae, { id: `${i}-${x.handle}`, field: x, value: a[x.handle], content: r, errors: {}, onChange: () => {
    } }) }, x.handle)
  ) : /* @__PURE__ */ e.jsx(
    ae,
    {
      id: `${i}-${x.handle}`,
      field: x,
      value: a[x.handle],
      content: r,
      errors: Y(c, x.handle),
      onChange: (m) => l({ ...a, [x.handle]: m })
    },
    x.handle
  )) });
}
function On({ options: s, value: a, onChange: l, id: c, empty: i, fill: r = !1 }) {
  return /* @__PURE__ */ e.jsxs(n.Select, { value: a ?? Oe, onValueChange: (d) => l(d === Oe ? null : d), children: [
    /* @__PURE__ */ e.jsx(n.SelectTrigger, { id: c, className: r ? "cms:w-full" : "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
    /* @__PURE__ */ e.jsxs(n.SelectContent, { children: [
      i && /* @__PURE__ */ e.jsx(n.SelectItem, { value: Oe, children: t("None") }),
      s.map((d) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: d.value, children: d.label }, d.value))
    ] })
  ] });
}
function Vn({ options: s, value: a, onChange: l, empty: c, inTickOrder: i = !1, invalid: r = !1 }) {
  return s.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: c ?? t("Nothing to choose from yet.") }) : /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2", children: s.map((d) => /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
    /* @__PURE__ */ e.jsx(
      n.Checkbox,
      {
        checked: a.includes(d.value),
        "aria-invalid": r || void 0,
        onCheckedChange: (x) => l(x ? i ? [...a.filter((m) => m !== d.value), d.value] : s.map((m) => m.value).filter((m) => m === d.value || a.includes(m)) : a.filter((m) => m !== d.value))
      }
    ),
    d.label,
    i && a.includes(d.value) && /* @__PURE__ */ e.jsxs("span", { className: "cms:text-xs cms:text-muted-foreground", "aria-label": `number ${a.indexOf(d.value) + 1}`, children: [
      "#",
      a.indexOf(d.value) + 1
    ] })
  ] }, d.value)) });
}
function Rn({ label: s, value: a, onChange: l, errors: c, id: i, collections: r }) {
  const d = a.type === "entry" ? "entry" : "url", x = (m) => {
    const o = { ...a, type: d, ...m }, g = o.type === "entry" ? typeof o.entry_id != "number" : o.url === "" || o.url === void 0 || o.url === null;
    l(g ? o.label || o.new_tab ? o : null : o);
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
        onClick: () => x({ type: m, url: m === "url" ? a.url : void 0, entry_id: m === "entry" ? a.entry_id : void 0 }),
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
          onChange: (m) => x({ url: m.target.value }),
          "aria-invalid": c.url !== void 0
        }
      ) : /* @__PURE__ */ e.jsx(
        ke,
        {
          id: i,
          invalid: c.entry_id !== void 0,
          multiple: !1,
          max: null,
          collections: r,
          value: typeof a.entry_id == "number" ? a.entry_id : null,
          onChange: (m) => x({ entry_id: typeof m == "number" ? m : void 0 })
        }
      ),
      /* @__PURE__ */ e.jsx(
        n.Input,
        {
          "aria-label": t(":field: link text", { field: s }),
          placeholder: t(d === "entry" ? "Link text (the entry's title)" : "Link text"),
          value: typeof a.label == "string" ? a.label : "",
          onChange: (m) => x({ label: m.target.value })
        }
      ),
      /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:h-9 cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx(n.Checkbox, { checked: a.new_tab === !0, onCheckedChange: (m) => x({ new_tab: m }) }),
        t("New tab")
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ e.jsx(H, { message: c.url ?? c.entry_id ?? c.label ?? c.type }) })
    ] })
  ] });
}
function ws(s, a) {
  return !a && (s.fields ?? []).every((l) => l.type === "text");
}
function ma(s) {
  const a = _.useRef([]);
  return a.current = Sn(a.current, s), {
    keys: a.current,
    remove: (l) => {
      a.current = a.current.filter((c, i) => i !== l);
    },
    move: (l, c) => {
      a.current = n.moveItem(a.current, l, c);
    }
  };
}
function ua() {
  const [s, a] = _.useState(() => /* @__PURE__ */ new Set());
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
function ha({ keys: s, folding: a }) {
  if (s.length < 2) return null;
  const l = a.anyOpen(s);
  return /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => a.setAll(s, l), children: [
    l ? /* @__PURE__ */ e.jsx(Wa, {}) : /* @__PURE__ */ e.jsx(Ga, {}),
    " ",
    t(l ? "Collapse all" : "Expand all")
  ] });
}
function Un({ field: s, value: a, onChange: l, errors: c, id: i, content: r = !1 }) {
  const d = s.fields ?? [], x = a.map(ie), m = ma(x.length), o = (f, j) => l(x.map((S, $) => $ === f ? j : S)), g = (f) => {
    m.remove(f), l(x.filter((j, S) => S !== f));
  }, p = s.label ? s.label.toLowerCase().replace(/s$/, "") : t("row"), u = p.charAt(0).toUpperCase() + p.slice(1), v = x.map((f, j) => ({ row: f, index: j, key: m.keys[j] ?? String(j) })), y = ua();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(
      n.SortableList,
      {
        items: v,
        getId: (f) => f.key,
        getLabel: (f) => `${p} ${f.index + 1}`,
        onReorder: (f, j, S) => {
          m.move(j, S), l(f.map(($) => $.row));
        },
        children: ({ row: f, index: j, key: S }, { handle: $ }) => ws(s, r) ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(n.SortableHandle, { ...$, label: t("Move :item :number", { item: p, number: j + 1 }), className: "cms:mt-1" }),
          d.map((b) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
            /* @__PURE__ */ e.jsx(
              n.Input,
              {
                "aria-label": b.label || b.handle,
                placeholder: b.label || b.handle,
                value: typeof f[b.handle] == "string" ? f[b.handle] : "",
                onChange: (h) => o(j, { ...f, [b.handle]: h.target.value })
              }
            ),
            /* @__PURE__ */ e.jsx(H, { message: c[`${j}.${b.handle}`] })
          ] }, b.handle)),
          /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": t("Remove :item :number", { item: p, number: j + 1 }), onClick: () => g(j), children: /* @__PURE__ */ e.jsx(q, {}) })
        ] }) : (() => {
          const b = Y(c, String(j)), h = y.isCollapsed(S, Object.keys(b).length > 0);
          return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              xa,
              {
                label: `${u} ${j + 1}`,
                summary: as(d, f),
                handle: $,
                onRemove: () => g(j),
                collapsed: h,
                onToggle: () => y.toggle(S),
                controls: `${i}-${j}-fields`,
                hidden: r ? f._hidden === !0 : void 0,
                onHidden: (M) => o(j, { ...f, _hidden: M })
              }
            ),
            /* @__PURE__ */ e.jsx("div", { id: `${i}-${j}-fields`, hidden: h, children: !h && /* @__PURE__ */ e.jsx(de, { fields: d, value: f, onChange: (M) => o(j, M), errors: b, id: `${i}-${j}`, content: r }) })
          ] });
        })()
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", size: "sm", onClick: () => l([...x, r ? yn() : {}]), children: [
        /* @__PURE__ */ e.jsx(G, {}),
        " ",
        t("Add :item", { item: p })
      ] }),
      !ws(s, r) && /* @__PURE__ */ e.jsx(ha, { keys: v.map((f) => f.key), folding: y })
    ] })
  ] });
}
function qn({ field: s, value: a, onChange: l, errors: c, id: i }) {
  const r = s.blocks ?? [], d = a.map(ie), x = ma(d.length), m = (u, v) => l(d.map((y, f) => f === u ? v : y)), o = (u) => {
    x.remove(u), l(d.filter((v, y) => y !== u));
  }, g = d.map((u, v) => ({ block: u, index: v, key: x.keys[v] ?? String(v) })), p = ua();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    /* @__PURE__ */ e.jsx(
      n.SortableList,
      {
        items: g,
        getId: (u) => u.key,
        className: "cms:gap-3",
        getLabel: (u) => t(":type block", { type: r.find((v) => v.type === u.block.type)?.label ?? String(u.block.type) }),
        onReorder: (u, v, y) => {
          x.move(v, y), l(u.map((f) => f.block));
        },
        children: ({ block: u, index: v, key: y }, { handle: f }) => {
          const j = r.find((b) => b.type === u.type), S = Y(c, `${v}.values`), $ = p.isCollapsed(y, Object.keys(S).length > 0 || c[`${v}.type`] !== void 0);
          return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              xa,
              {
                label: j?.label ?? String(u.type),
                summary: j ? as(j.fields, ie(u.values)) : null,
                badge: !0,
                handle: f,
                onRemove: () => o(v),
                collapsed: $,
                onToggle: () => p.toggle(y),
                controls: `${i}-${v}-fields`,
                hidden: u.hidden === !0,
                onHidden: (b) => m(v, { ...u, hidden: b })
              }
            ),
            /* @__PURE__ */ e.jsx("div", { id: `${i}-${v}-fields`, hidden: $, children: $ ? null : j ? /* @__PURE__ */ e.jsx(
              de,
              {
                fields: j.fields,
                value: ie(u.values),
                onChange: (b) => m(v, { ...u, values: b }),
                errors: S,
                id: `${i}-${v}`,
                content: !0
              }
            ) : /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: t("This kind of block no longer exists. Its values are kept.") }) }),
            /* @__PURE__ */ e.jsx(H, { message: c[`${v}.type`] })
          ] });
        }
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(n.DropdownMenu, { children: [
        /* @__PURE__ */ e.jsx(n.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", size: "sm", disabled: r.length === 0, children: [
          /* @__PURE__ */ e.jsx(G, {}),
          " ",
          t("Add block")
        ] }) }),
        /* @__PURE__ */ e.jsx(n.DropdownMenuContent, { align: "start", children: r.map((u) => /* @__PURE__ */ e.jsx(n.DropdownMenuItem, { onSelect: () => l([...d, Nn(u.type)]), children: u.label }, u.type)) })
      ] }),
      /* @__PURE__ */ e.jsx(ha, { keys: g.map((u) => u.key), folding: p })
    ] })
  ] });
}
function xa({ label: s, summary: a, badge: l = !1, handle: c, onRemove: i, collapsed: r, onToggle: d, controls: x, hidden: m, onHidden: o }) {
  const g = r ? ve : Ys, p = a ? `${s}: ${a}` : s;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(n.SortableHandle, { ...c, label: t("Move :title", { title: p }) }),
    /* @__PURE__ */ e.jsxs(
      "button",
      {
        type: "button",
        onClick: d,
        "aria-expanded": !r,
        "aria-controls": x,
        className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:rounded-md cms:text-left cms:outline-none cms:focus-visible:ring-2 cms:focus-visible:ring-ring",
        children: [
          /* @__PURE__ */ e.jsx(g, { className: "cms:size-4 cms:shrink-0 cms:text-muted-foreground", "aria-hidden": !0 }),
          l ? /* @__PURE__ */ e.jsx(n.Badge, { variant: "secondary", children: s }) : /* @__PURE__ */ e.jsx("span", { className: "cms:shrink-0 cms:text-sm cms:font-medium", children: s }),
          a && /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:text-sm cms:text-muted-foreground", children: a }),
          /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: r ? t("(collapsed)") : "" })
        ]
      }
    ),
    m !== void 0 && /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:shrink-0 cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", title: t("Off: kept here, but left out of the page"), children: [
      /* @__PURE__ */ e.jsx(n.Switch, { checked: !m, onCheckedChange: (u) => o(!u), "aria-label": t(":title: visible on site", { title: p }) }),
      t("Visible on site")
    ] }),
    /* @__PURE__ */ e.jsx(
      n.Button,
      {
        type: "button",
        variant: "ghost",
        size: "icon",
        className: "cms:size-8 cms:shrink-0 cms:text-destructive",
        "aria-label": t("Remove :title", { title: p }),
        onClick: i,
        children: /* @__PURE__ */ e.jsx(q, {})
      }
    )
  ] });
}
function pa({ fields: s, onChange: a, types: l, errors: c, depth: i = 1, idPrefix: r = "field", reserved: d, locales: x = [] }) {
  const [m, o] = _.useState(() => /* @__PURE__ */ new Set()), g = (j) => o((S) => {
    const $ = new Set(S);
    return $.has(j) ? $.delete(j) : $.add(j), $;
  }), p = (j, S) => a(s.map(($, b) => b === j ? S : $)), u = (j) => {
    const S = Tn(j.type, j.label, s);
    a([...s, S]), o(/* @__PURE__ */ new Set([S.key]));
  }, [v, y] = _.useState(""), f = (j) => {
    const S = Ln(s, j, d, t);
    S && (a(S.fields), o(/* @__PURE__ */ new Set([S.copy.key])), y(t(":title duplicated as :copy, below it.", { title: s[j]?.label || s[j]?.handle || "", copy: S.copy.label ?? S.copy.handle })));
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:border-dashed cms:p-4 cms:text-sm cms:text-muted-foreground", children: t("No fields yet.") }),
    s.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:justify-end", children: m.size > 0 ? /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => o(/* @__PURE__ */ new Set()), children: t("Close all") }) : /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => o(new Set(s.map((j) => j.key))), children: t("Open all") }) }),
    /* @__PURE__ */ e.jsx(n.SortableList, { items: s, getId: (j) => j.key, getLabel: (j) => j.label || j.handle, onReorder: (j) => a(j), children: (j, { index: S, handle: $, isOverlay: b }) => {
      const h = l.find((z) => z.type === j.type), M = we(c, String(S)) || ca(j, s, d) !== null, w = !b && (m.has(j.key) || M), B = `${r}-${j.key}`;
      return /* @__PURE__ */ e.jsxs("div", { "data-invalid": M ? "true" : void 0, className: `cms:rounded-lg cms:border cms:bg-card ${M ? "cms:border-destructive" : ""}`, children: [
        /* @__PURE__ */ e.jsx(
          Wn,
          {
            field: j,
            type: h,
            index: S,
            expanded: w,
            controls: B,
            handle: $,
            shared: x.length > 0,
            onToggle: () => g(j.key),
            onDuplicate: () => f(S),
            onRemove: () => a(s.filter((z, D) => D !== S))
          }
        ),
        w && /* @__PURE__ */ e.jsx(
          Gn,
          {
            id: B,
            field: j,
            type: h,
            siblings: s,
            onChange: (z) => p(S, z),
            types: l,
            errors: oe(c, String(S)),
            depth: i,
            reserved: d,
            locales: x
          }
        )
      ] });
    } }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:sr-only", "aria-live": "polite", children: v }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(n.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(n.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", size: "sm", children: [
        /* @__PURE__ */ e.jsx(G, {}),
        " ",
        t("Add field")
      ] }) }),
      /* @__PURE__ */ e.jsx(n.DropdownMenuContent, { align: "start", children: l.filter((j) => !j.hasChildren || i < Dn).map((j) => /* @__PURE__ */ e.jsx(n.DropdownMenuItem, { onSelect: () => u(j), children: j.label }, j.type)) })
    ] }) })
  ] });
}
const Kn = {
  text: fn,
  textarea: xn,
  rich_text: Qa,
  number: Xa,
  toggle: pn,
  date: Ka,
  select: Nt,
  media: en,
  entries: ln,
  terms: hn,
  link: jt,
  group: Za,
  repeater: on,
  flexible: qa,
  fieldset: rn,
  file: cn
};
function Wn({ field: s, type: a, expanded: l, controls: c, handle: i, shared: r, onToggle: d, onDuplicate: x, onRemove: m }) {
  const o = s.label || s.handle, g = Kn[s.type] ?? mn, p = s.type === "fieldset", u = p ? typeof s.config?.fieldset == "string" ? s.config.fieldset : "" : s.handle, v = r && !p && !ra(s, a?.translatable ?? !1);
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
        children: /* @__PURE__ */ e.jsx(ve, { "aria-hidden": !0, className: `cms:size-4 cms:transition-transform cms:duration-200 ${l ? "cms:rotate-90" : ""}` })
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { role: "presentation", onClick: d, className: "cms:flex cms:min-w-0 cms:flex-1 cms:cursor-pointer cms:flex-wrap cms:items-center cms:gap-x-2.5 cms:gap-y-1 cms:py-0.5", children: [
      /* @__PURE__ */ e.jsxs("span", { className: "cms:inline-flex cms:shrink-0 cms:items-center cms:gap-1 cms:rounded-md cms:bg-muted cms:px-1.5 cms:py-0.5 cms:text-xs cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsx(g, { "aria-hidden": !0, className: "cms:size-3.5" }),
        a?.label ?? s.type
      ] }),
      /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:min-w-0 cms:max-w-full cms:flex-col cms:gap-x-2 cms:sm:flex-row cms:sm:items-baseline", children: [
        /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: o }),
        u !== "" && u !== o && /* @__PURE__ */ e.jsx("code", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", title: t(p ? "Fieldset" : "Handle"), children: u })
      ] }),
      (s.required || v || s.condition || a?.hasChildren && s.fields.length > 0 && !l) && /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-1", children: [
        s.required && /* @__PURE__ */ e.jsx(n.Badge, { variant: "outline", className: "cms:font-normal", children: t("Required") }),
        v && /* @__PURE__ */ e.jsx(n.Badge, { variant: "outline", className: "cms:font-normal", title: t("One value shared by every language."), children: t("Shared") }),
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
        onClick: x,
        children: /* @__PURE__ */ e.jsx(tt, {})
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
        children: /* @__PURE__ */ e.jsx(q, {})
      }
    )
  ] });
}
function Gn({ id: s, field: a, type: l, siblings: c, onChange: i, types: r, errors: d, depth: x, reserved: m, locales: o }) {
  const g = a.config ?? {}, p = ca(a, c, m, t);
  if (a.type === "fieldset")
    return /* @__PURE__ */ e.jsxs("div", { id: s, className: "cms:flex cms:flex-col cms:gap-4 cms:border-t cms:p-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(n.Label, { htmlFor: `${s}-label`, children: t("Label") }),
          /* @__PURE__ */ e.jsx(n.Input, { id: `${s}-label`, value: a.label ?? "", onChange: (f) => i(bs(a, f.target.value, c)) }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("Only shown here, in the builder.") })
        ] }),
        l?.settings.map((f) => /* @__PURE__ */ e.jsx(
          ae,
          {
            id: `${s}-config-${f.handle}`,
            field: f,
            value: g[f.handle],
            errors: Y(d, `config.${f.handle}`),
            onChange: (j) => i({ ...a, config: { ...g, [f.handle]: j } })
          },
          f.handle
        ))
      ] }),
      /* @__PURE__ */ e.jsx(H, { message: d.handle ?? d.type })
    ] });
  const u = In(l?.settings ?? []), v = (f, j = !1) => /* @__PURE__ */ e.jsx(
    ae,
    {
      id: `${s}-config-${f.handle}`,
      field: f,
      value: g[f.handle],
      fill: j,
      errors: Y(d, `config.${f.handle}`),
      onChange: (S) => i({ ...a, config: { ...g, [f.handle]: S } })
    },
    f.handle
  ), y = d.validation ?? Object.entries(d).find(([f]) => f.startsWith("validation."))?.[1];
  return /* @__PURE__ */ e.jsxs("div", { id: s, className: "cms:flex cms:flex-col cms:gap-5 cms:border-t cms:p-4", children: [
    !l && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t(`The field type ":type" isn't registered. Its data is kept; register the type or remove the field.`, { type: a.type }) }),
    /* @__PURE__ */ e.jsxs(Te, { title: t("Basics"), children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:items-start cms:gap-4 cms:md:grid-cols-2", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(n.Label, { htmlFor: `${s}-label`, children: t("Label") }),
          /* @__PURE__ */ e.jsx(n.Input, { id: `${s}-label`, value: a.label ?? "", onChange: (f) => i(bs(a, f.target.value, c)) }),
          /* @__PURE__ */ e.jsx(H, { message: d.label })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(n.Label, { htmlFor: `${s}-handle`, children: t("Handle") }),
          /* @__PURE__ */ e.jsx(
            n.Input,
            {
              id: `${s}-handle`,
              className: "cms:font-mono",
              value: a.handle,
              onChange: (f) => i({ ...a, handle: ls(f.target.value), handleTouched: !0 })
            }
          ),
          Fe(a) === null && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("How templates read it. Renaming it hides values saved under the old one.") }),
          /* @__PURE__ */ e.jsx("div", { "aria-live": "polite", children: Fe(a) !== null && /* @__PURE__ */ e.jsx(Jt, { children: Ss(
            t("Content saved under :old won't show under :new, and templates reading :old get nothing. To rename it with its content: put back :old, save, then run :command."),
            { old: Fe(a) ?? "", new: a.handle || "…", command: "php artisan sunrice:rename-field" }
          ) }) }),
          /* @__PURE__ */ e.jsx(H, { message: d.handle ?? p ?? void 0 })
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
            onChange: (f) => i({ ...a, instructions: f.target.value || null })
          }
        ),
        /* @__PURE__ */ e.jsx(H, { message: d.instructions })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:items-start cms:gap-4 cms:md:grid-cols-2", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:h-9 cms:items-center cms:gap-3 cms:md:h-auto", children: [
          /* @__PURE__ */ e.jsx(n.Switch, { id: `${s}-required`, checked: a.required === !0, onCheckedChange: (f) => i({ ...a, required: f }) }),
          /* @__PURE__ */ e.jsx(n.Label, { htmlFor: `${s}-required`, children: t("Required") })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-1", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
            /* @__PURE__ */ e.jsx(
              n.Switch,
              {
                id: `${s}-translatable`,
                checked: ra(a, l?.translatable ?? !1),
                "aria-describedby": `${s}-translatable-help`,
                onCheckedChange: (f) => i(Mn(a, f, l?.translatable ?? !1))
              }
            ),
            /* @__PURE__ */ e.jsx(n.Label, { htmlFor: `${s}-translatable`, children: t("Translatable") })
          ] }),
          /* @__PURE__ */ e.jsx("p", { id: `${s}-translatable-help`, className: "cms:text-sm cms:text-muted-foreground", children: t("Each language gets its own value. Off: one value shared by every language.") })
        ] })
      ] })
    ] }),
    u.options.length > 0 && /* @__PURE__ */ e.jsx(Te, { title: t("Options"), children: u.options.map((f) => (u.dependents[f.handle]?.length ?? 0) > 0 ? /* @__PURE__ */ e.jsx(
      Yn,
      {
        id: s,
        toggle: f,
        dependents: u.dependents[f.handle] ?? [],
        config: g,
        errors: d,
        onChange: (j) => i({ ...a, config: { ...g, ...j } })
      },
      f.handle
    ) : v(f, !0)) }),
    u.limits.length > 0 && /* @__PURE__ */ e.jsx(Te, { title: t("Limits and defaults"), children: /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:grid-cols-1 cms:items-start cms:gap-4 cms:min-[420px]:grid-cols-2 cms:lg:grid-cols-4", children: u.limits.map((f) => /* @__PURE__ */ e.jsx("div", { className: "cms:min-w-0", children: v(f, !0) }, f.handle)) }) }),
    /* @__PURE__ */ e.jsx(Zn, { id: s, field: a, siblings: c, onChange: i, errors: oe(d, "condition") }),
    o.length > 0 && /* @__PURE__ */ e.jsx(Jn, { id: s, field: a, locales: o, onChange: i, errors: oe(d, "translations") }),
    /* @__PURE__ */ e.jsxs("details", { className: "cms:group cms:rounded-lg cms:border cms:p-3", open: (a.validation ?? []).some((f) => f.trim() !== "") || y !== void 0, children: [
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
            onChange: (f) => i({ ...a, validation: f.target.value.split(`
`) })
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: Ss(t("Optional checks, one per line, such as :email or :max (for developers: Laravel validation rules)."), { email: "email", max: "max:100" }) }),
        /* @__PURE__ */ e.jsx(H, { message: y })
      ] })
    ] }),
    l?.hasChildren && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(n.Label, { children: t("Fields inside") }),
      /* @__PURE__ */ e.jsx(
        pa,
        {
          fields: a.fields,
          onChange: (f) => i({ ...a, fields: f }),
          types: r,
          errors: oe(d, "fields"),
          depth: x + 1,
          idPrefix: s,
          locales: o
        }
      ),
      /* @__PURE__ */ e.jsx(H, { message: d.fields })
    ] }),
    /* @__PURE__ */ e.jsx(H, { message: d.type })
  ] });
}
function Yn({ id: s, toggle: a, dependents: l, config: c, errors: i, onChange: r }) {
  const d = c[a.handle] === !0, x = `${s}-config-${a.handle}`, m = [a, ...l].map((o) => Y(i, `config.${o.handle}`)[""]).filter((o) => o !== void 0);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-h-9 cms:flex-wrap cms:items-center cms:gap-x-6 cms:gap-y-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(n.Switch, { id: x, checked: d, onCheckedChange: (o) => r({ [a.handle]: o }) }),
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: x, children: a.label || a.handle })
      ] }),
      d && l.map((o) => {
        const g = `${s}-config-${o.handle}`, p = c[o.handle];
        return o.type === "number" ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(n.Label, { htmlFor: g, className: "cms:font-normal", children: o.label || o.handle }),
          /* @__PURE__ */ e.jsx(
            n.Input,
            {
              id: g,
              type: "number",
              className: "cms:w-28",
              "aria-describedby": o.instructions ? `${g}-help` : void 0,
              placeholder: typeof o.config?.placeholder == "string" ? o.config.placeholder : void 0,
              min: typeof o.config?.min == "number" ? o.config.min : void 0,
              max: typeof o.config?.max == "number" ? o.config.max : void 0,
              step: typeof o.config?.step == "number" ? o.config.step : "any",
              value: typeof p == "number" || typeof p == "string" ? String(p) : "",
              onChange: (u) => r({ [o.handle]: u.target.value === "" ? null : Number(u.target.value) })
            }
          ),
          o.instructions && /* @__PURE__ */ e.jsx("span", { id: `${g}-help`, className: "cms:text-sm cms:text-muted-foreground", children: o.instructions })
        ] }, o.handle) : /* @__PURE__ */ e.jsx("div", { className: "cms:basis-full", children: /* @__PURE__ */ e.jsx(ae, { id: g, field: o, value: p, fill: !0, errors: Y(i, `config.${o.handle}`), onChange: (u) => r({ [o.handle]: u }) }) }, o.handle);
      })
    ] }),
    a.instructions && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: a.instructions }),
    m.map((o) => /* @__PURE__ */ e.jsx(H, { message: o }, o))
  ] });
}
function Te({ title: s, children: a }) {
  const l = _.useId();
  return /* @__PURE__ */ e.jsxs("section", { "aria-labelledby": l, className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx("h4", { id: l, className: "cms:text-xs cms:font-semibold cms:uppercase cms:tracking-wide cms:text-muted-foreground", children: s }),
    a
  ] });
}
function Jn({ id: s, field: a, locales: l, onChange: c, errors: i }) {
  const r = a.translations ?? {}, d = a.type === "select" && Array.isArray(a.config?.options) ? a.config.options.filter((o) => typeof o?.value == "string" && o.value !== "") : [], x = (o, g) => {
    const p = { ...r, [o]: { ...r[o], ...g } };
    c({ ...a, translations: p });
  }, m = Object.entries(i).find(([, o]) => o)?.[1];
  return /* @__PURE__ */ e.jsxs("details", { className: "cms:rounded-lg cms:border cms:p-3", open: Object.keys(r).length > 0 || m !== void 0, children: [
    /* @__PURE__ */ e.jsx("summary", { className: "cms:cursor-pointer cms:text-sm cms:font-medium", children: t("In other languages") }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:mt-2 cms:text-sm cms:text-muted-foreground", children: t("What visitors read in each language, as forms show it. Empty: as above.") }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:mt-3 cms:flex cms:flex-col cms:gap-4", children: l.map(({ code: o, name: g }) => /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-3 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(n.Label, { htmlFor: `${s}-label-${o}`, children: [
          "Label (",
          g,
          ")"
        ] }),
        /* @__PURE__ */ e.jsx(
          n.Input,
          {
            id: `${s}-label-${o}`,
            value: r[o]?.label ?? "",
            placeholder: a.label ?? "",
            onChange: (p) => x(o, { label: p.target.value })
          }
        )
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(n.Label, { htmlFor: `${s}-instructions-${o}`, children: [
          "Instructions (",
          g,
          ")"
        ] }),
        /* @__PURE__ */ e.jsx(
          n.Input,
          {
            id: `${s}-instructions-${o}`,
            value: r[o]?.instructions ?? "",
            placeholder: a.instructions ?? "",
            onChange: (p) => x(o, { instructions: p.target.value })
          }
        )
      ] }),
      d.length > 0 && /* @__PURE__ */ e.jsxs("fieldset", { className: "cms:flex cms:flex-col cms:gap-2 cms:md:col-span-2", children: [
        /* @__PURE__ */ e.jsxs("legend", { className: "cms:text-sm cms:font-medium", children: [
          "Options (",
          g,
          ")"
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-2 cms:sm:grid-cols-2", children: d.map((p) => {
          const u = String(p.value);
          return /* @__PURE__ */ e.jsx(
            n.Input,
            {
              "aria-label": `${u} (${g})`,
              value: r[o]?.options?.[u] ?? "",
              placeholder: typeof p.label == "string" && p.label !== "" ? p.label : u,
              onChange: (v) => x(o, { options: { ...r[o]?.options, [u]: v.target.value } })
            },
            u
          );
        }) })
      ] })
    ] }, o)) }),
    /* @__PURE__ */ e.jsx(H, { message: m })
  ] });
}
function Qn(s) {
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
function Zn({ id: s, field: a, siblings: l, onChange: c, errors: i }) {
  const r = zn(a, l), d = oa(a.condition), x = da(a.condition), m = (u, v = x) => c({ ...a, condition: En(u, v) }), o = (u, v) => m(d.map((y, f) => f === u ? { ...y, ...v } : y)), g = () => {
    const u = r.find((v) => !d.some((y) => y.field === v.handle)) ?? r[0];
    u && m([...d, { field: u.handle, operator: "equals", value: Ns(Pe(u)) }]);
  }, p = (u) => {
    const v = d.length > 1 || "rules" in (a.condition ?? {}) ? oe(i, `rules.${u}`) : i;
    return v.field ?? v.operator ?? v.value;
  };
  return r.length === 0 && d.length === 0 ? null : /* @__PURE__ */ e.jsxs(Te, { title: t("Visibility"), children: [
    d.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("Always shown.") }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      d.length > 1 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx("span", { id: `${s}-match-label`, children: t("Show when") }),
        /* @__PURE__ */ e.jsxs(n.Select, { value: x, onValueChange: (u) => m(d, u === "any" ? "any" : "all"), children: [
          /* @__PURE__ */ e.jsx(n.SelectTrigger, { "aria-labelledby": `${s}-match-label`, className: "cms:h-8 cms:w-auto", children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
          /* @__PURE__ */ e.jsxs(n.SelectContent, { children: [
            /* @__PURE__ */ e.jsx(n.SelectItem, { value: "all", children: t("All of these") }),
            /* @__PURE__ */ e.jsx(n.SelectItem, { value: "any", children: t("Any of these") })
          ] })
        ] }),
        /* @__PURE__ */ e.jsx("span", { children: t("are true:") })
      ] }),
      /* @__PURE__ */ e.jsx("ul", { className: "cms:flex cms:flex-col cms:gap-2", children: d.map((u, v) => {
        const y = l.find(($) => $.handle === u.field && $.key !== a.key), f = He.find(($) => $.value === u.operator) ?? He[0], j = Pe(y), S = p(v);
        return /* @__PURE__ */ e.jsxs("li", { className: "cms:flex cms:flex-col cms:gap-1", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-start cms:gap-2", children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:flex cms:h-9 cms:w-20 cms:shrink-0 cms:items-center cms:text-sm cms:text-muted-foreground", children: t(v === 0 ? "Only when" : x === "any" ? "or" : "and") }),
            /* @__PURE__ */ e.jsxs(n.Select, { value: u.field, onValueChange: ($) => {
              const b = l.find((h) => h.handle === $);
              o(v, { field: $, value: Ns(Pe(b)) });
            }, children: [
              /* @__PURE__ */ e.jsx(n.SelectTrigger, { id: v === 0 ? `${s}-condition` : void 0, "aria-label": t("Field"), className: "cms:w-48", children: /* @__PURE__ */ e.jsx(n.SelectValue, { placeholder: u.field }) }),
              /* @__PURE__ */ e.jsx(n.SelectContent, { children: r.map(($) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: $.handle, children: $.label || $.handle }, $.key)) })
            ] }),
            /* @__PURE__ */ e.jsxs(n.Select, { value: f.value, onValueChange: ($) => o(v, { operator: $ }), children: [
              /* @__PURE__ */ e.jsx(n.SelectTrigger, { "aria-label": t("How to compare"), className: "cms:w-36", children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
              /* @__PURE__ */ e.jsx(n.SelectContent, { children: He.map(($) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: $.value, children: Qn($.value) }, $.value)) })
            ] }),
            f.needsValue && /* @__PURE__ */ e.jsx("div", { className: "cms:min-w-48 cms:flex-1 cms:sm:max-w-72", children: /* @__PURE__ */ e.jsx(
              Xn,
              {
                id: `${s}-rule-${v}-value`,
                input: j,
                value: u.value ?? null,
                invalid: S !== void 0,
                onChange: ($) => o(v, { value: $ })
              }
            ) }),
            /* @__PURE__ */ e.jsx(
              n.Button,
              {
                type: "button",
                variant: "ghost",
                size: "icon",
                className: "cms:ml-auto cms:size-9 cms:text-muted-foreground hover:cms:text-destructive",
                "aria-label": t("Remove condition :number", { number: String(v + 1) }),
                title: t("Remove condition"),
                onClick: () => m(d.filter(($, b) => b !== v)),
                children: /* @__PURE__ */ e.jsx(Ne, {})
              }
            )
          ] }),
          /* @__PURE__ */ e.jsx(H, { message: S })
        ] }, v);
      }) })
    ] }),
    r.length > 0 && /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", size: "sm", onClick: g, children: [
      /* @__PURE__ */ e.jsx(G, {}),
      " ",
      t("Add condition")
    ] }) }),
    d.length > 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("A hidden field isn't required, and keeps what it had.") }),
    /* @__PURE__ */ e.jsx(H, { message: i[""] ?? i.rules ?? i.match })
  ] });
}
function Xn({ id: s, input: a, value: l, invalid: c, onChange: i }) {
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
        Xt,
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
        ke,
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
function Ss(s, a) {
  return s.split(/(:[a-z_]+)/).map((l, c) => {
    const i = a[l.slice(1)];
    return l.startsWith(":") && i !== void 0 ? /* @__PURE__ */ e.jsx("code", { children: i }, c) : l;
  });
}
function el(s, a) {
  return t(s === "fieldset" ? a ? "A short name for this fieldset, set when it was created: flexible blocks keep it with what they hold." : "A short name for this fieldset. It can't change later: flexible blocks keep it with what they hold." : a ? "A short name for this blueprint. Changing it updates the collections, taxonomies, global sets, forms and entries that use it." : "A short name for this blueprint, used by the collections, taxonomies, global sets and forms that pick it.");
}
function sl({ kind: s, handle: a }) {
  const l = a !== "" ? a : s === "fieldset" ? "address" : "article", c = s === "fieldset" ? `['type' => 'fieldset', 'config' => ['fieldset' => '${l}']]` : `Blueprint::where('handle', '${l}')`;
  return /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
    /* @__PURE__ */ e.jsx("span", { className: "cms:font-medium", children: t("For developers:") }),
    " ",
    t(s === "fieldset" ? "In a blueprint definition:" : "In code:"),
    " ",
    /* @__PURE__ */ e.jsx("code", { className: "cms:rounded cms:bg-muted cms:px-1 cms:py-0.5 cms:font-mono cms:text-[0.8125rem] cms:break-words cms:text-foreground", children: c })
  ] });
}
function Cs({ kind: s = "blueprint", blueprint: a, fieldTypes: l, locales: c = [], usedBy: i = [], reserved: r = [] }) {
  const d = s === "fieldset", x = A(d ? "cms/fieldsets" : "cms/blueprints"), m = a ? a.title : t(d ? "New fieldset" : "New blueprint");
  n.useBreadcrumbs([{ label: t(d ? "Fieldsets" : "Blueprints"), href: x }, { label: m }]);
  const [o, g] = ce(), p = C.useForm({ title: a?.title ?? "", handle: a?.handle ?? "" }), [u, v] = _.useState(a !== null), [y, f] = _.useState(() => aa(a?.fields)), j = (D) => l.find((P) => P.type === D)?.hasChildren === !0, S = p.errors, [$, b] = _.useState(() => JSON.stringify(y)), h = p.isDirty || JSON.stringify(y) !== $, M = () => {
    p.setDefaults();
    const D = la(y);
    f(D), b(JSON.stringify(D));
  }, w = () => {
    if (p.processing) return;
    p.transform((P) => ({
      // A blueprint's handle can change (RenameBlueprint); a fieldset's can't: flexible blocks store it.
      ...a ? s === "blueprint" ? { title: P.title, handle: P.handle } : { title: P.title } : P,
      fields: na(y, j)
    }));
    const D = () => window.requestAnimationFrame(() => document.querySelector('[data-invalid="true"]')?.scrollIntoView({ block: "center", behavior: "smooth" }));
    a ? p.put(`${x}/${a.handle}`, { preserveScroll: !0, onSuccess: M, onError: D }) : p.post(x, { onSuccess: M, onError: D });
  }, B = (D) => {
    D.preventDefault(), w();
  };
  n.useUnsavedChanges(h, w);
  const z = () => a && o(
    d ? t('Delete the fieldset ":title"? Content keeps its values.', { title: a.title }) : t('Delete the blueprint ":title"? Content keeps its values.', { title: a.title }),
    () => C.router.delete(`${x}/${a.handle}`, { preserveScroll: !0 })
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: B, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: m }),
    g,
    /* @__PURE__ */ e.jsx(
      n.PageHeader,
      {
        title: m,
        back: { href: x, label: t(d ? "Back to fieldsets" : "Back to blueprints") },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          a && /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "outline", size: "icon", className: "cms:text-destructive", "aria-label": t("Delete :title", { title: m }), onClick: z, children: /* @__PURE__ */ e.jsx(q, {}) }),
          /* @__PURE__ */ e.jsxs(n.Button, { type: "submit", disabled: p.processing, children: [
            p.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
            t(a ? "Save" : d ? "Create fieldset" : "Create blueprint")
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(H, { message: S.blueprint ?? S.fieldset }),
    /* @__PURE__ */ e.jsx(n.Card, { children: /* @__PURE__ */ e.jsxs(n.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "title", children: t("Title") }),
        /* @__PURE__ */ e.jsx(n.Input, { id: "title", value: p.data.title, required: !0, onChange: (D) => {
          p.setData((P) => ({ ...P, title: D.target.value, handle: u ? P.handle : sa(D.target.value) }));
        } }),
        /* @__PURE__ */ e.jsx(H, { message: S.title })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "handle", children: t("Handle") }),
        /* @__PURE__ */ e.jsx(
          n.Input,
          {
            id: "handle",
            className: "cms:font-mono",
            value: p.data.handle,
            disabled: a !== null && s === "fieldset",
            required: !0,
            spellCheck: !1,
            onChange: (D) => {
              v(!0), p.setData("handle", ls(D.target.value));
            }
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: el(s, a !== null) }),
        /* @__PURE__ */ e.jsx(sl, { kind: s, handle: p.data.handle }),
        /* @__PURE__ */ e.jsx("div", { "aria-live": "polite", children: a !== null && s === "blueprint" && p.data.handle !== "" && p.data.handle !== a.handle && /* @__PURE__ */ e.jsx(Jt, { id: "handle-warning", children: t(`Changing the handle can break code. Sunrice updates the collections, taxonomies, global sets, forms and entries that use ":old". You update code that names it (Blueprint::where('handle', ':old')) and structure exports made before.`, { old: a.handle }) }) }),
        /* @__PURE__ */ e.jsx(H, { message: S.handle })
      ] })
    ] }) }),
    i.length > 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("Used by :list. Changes show there at once.", { list: i.join(", ") }) }),
    /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-3", "aria-labelledby": "fields-heading", children: [
      /* @__PURE__ */ e.jsx("h2", { id: "fields-heading", className: "cms:text-lg cms:font-medium", children: t("Fields") }),
      /* @__PURE__ */ e.jsx(pa, { fields: y, onChange: f, types: l, errors: oe(S, "fields"), reserved: s === "blueprint" ? r : void 0, locales: c.slice(1) }),
      /* @__PURE__ */ e.jsx(H, { message: S.fields })
    ] })
  ] });
}
function ga({ kind: s, base: a, rows: l, intro: c }) {
  const i = s === "blueprint", r = t(i ? "Blueprints" : "Fieldsets");
  n.useBreadcrumbs([{ label: r }]);
  const [d, x] = ce();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: r }),
    x,
    /* @__PURE__ */ e.jsx(n.PageHeader, { title: r, description: c, actions: /* @__PURE__ */ e.jsx(n.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(C.Link, { href: `${a}/create`, children: [
      /* @__PURE__ */ e.jsx(G, {}),
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
          /* @__PURE__ */ e.jsx(n.TableCell, { children: /* @__PURE__ */ e.jsx(C.Link, { href: `${a}/${m.handle}/edit`, className: "cms:font-medium cms:hover:underline", children: m.title }) }),
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
                () => C.router.delete(`${a}/${m.handle}`, { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(q, {})
            }
          ) })
        ] }, m.id))
      ] })
    ] }) })
  ] });
}
function tl({ blueprints: s }) {
  const a = C.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(H, { message: a.blueprint }),
    /* @__PURE__ */ e.jsx(
      ga,
      {
        kind: "blueprint",
        base: A("cms/blueprints"),
        rows: s,
        intro: t("The fields editors fill in, for each kind of content.")
      }
    )
  ] });
}
const Re = (s) => s.includes("::") ? s : `${s.replace(/\./g, "/")}.blade.php`;
function al(s, a) {
  const l = s.trim();
  return l !== "" ? a?.own?.view === l && !a.own.exists ? null : l : a?.fallbacks.find((c) => c.exists)?.view ?? null;
}
function Ue({ file: s }) {
  const a = s.split("/");
  return /* @__PURE__ */ e.jsx("code", { className: "cms:whitespace-normal cms:break-normal", children: a.map((l, c) => /* @__PURE__ */ e.jsxs(_.Fragment, { children: [
    l,
    c < a.length - 1 && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      "/",
      /* @__PURE__ */ e.jsx("wbr", {})
    ] })
  ] }, c)) });
}
function fa({ example: s, empty: a, value: l = "", lookup: c = null }) {
  const i = l.trim(), r = al(l, c), d = c?.fallbacks ?? [], x = /* @__PURE__ */ e.jsx("span", { className: "cms:ml-1 cms:rounded cms:bg-muted cms:px-1 cms:text-[0.65rem] cms:font-medium cms:text-foreground", children: t("in use") });
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1 cms:text-xs cms:leading-relaxed cms:text-muted-foreground", children: [
    /* @__PURE__ */ e.jsx("p", { children: a }),
    /* @__PURE__ */ e.jsxs("details", { className: "cms:group", children: [
      /* @__PURE__ */ e.jsx("summary", { className: "cms:w-fit cms:cursor-pointer cms:select-none cms:rounded-sm cms:underline-offset-4 hover:cms:underline focus-visible:cms:outline-2 focus-visible:cms:outline-ring", children: t("Which file?") }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:mt-1.5 cms:flex cms:flex-col cms:gap-1.5", children: [
        i !== "" && /* @__PURE__ */ e.jsxs("p", { children: [
          /* @__PURE__ */ e.jsx(Ue, { file: Re(i) }),
          c?.own?.view === i ? c.own.exists ? x : /* @__PURE__ */ e.jsx("span", { className: "cms:ml-1 cms:text-destructive", children: t("not found") }) : null
        ] }),
        /* @__PURE__ */ e.jsx("p", { children: t(i !== "" ? "Without it, the first that exists:" : "The first that exists:") }),
        /* @__PURE__ */ e.jsxs("ol", { className: "cms:ml-4 cms:list-decimal cms:space-y-0.5", children: [
          d.map((m) => /* @__PURE__ */ e.jsxs("li", { children: [
            /* @__PURE__ */ e.jsx(Ue, { file: Re(m.view) }),
            r === m.view && i === "" && x
          ] }, m.view)),
          /* @__PURE__ */ e.jsxs("li", { children: [
            t("the built-in template"),
            r === null && x
          ] })
        ] }),
        /* @__PURE__ */ e.jsx("p", { children: t("Files are under resources/views; a name like :example is :file.", { example: "\0", file: "" }).split(/(\u0000|\u0001)/).map((m, o) => m === "\0" ? /* @__PURE__ */ e.jsx("code", { children: s }, o) : m === "" ? /* @__PURE__ */ e.jsx(Ue, { file: Re(s) }, o) : m) })
      ] })
    ] })
  ] });
}
const $s = { preserveScroll: !0, preserveState: !0 };
function nl({ entryId: s, comments: a }) {
  const [l, c] = _.useState(null), [i, r] = _.useState(""), [d, x] = _.useState(!1), m = (g, p) => C.router.post(A(`cms/comments/${g}/status`), { status: p }, $s), o = (g) => C.router.post(A(`cms/comments/${g}/reply`), { body: i }, {
    ...$s,
    onStart: () => x(!0),
    onFinish: () => x(!1),
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
        a.latest.map((g) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5 cms:border-t cms:border-border/70 cms:pt-3 cms:first-of-type:border-t-0 cms:first-of-type:pt-0", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium", children: g.author }),
            g.status === "pending" && /* @__PURE__ */ e.jsx(n.Badge, { variant: "outline", children: t("Pending") })
          ] }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:line-clamp-3 cms:break-words cms:whitespace-pre-line", children: g.excerpt }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
            U(g.createdAt),
            g.reply ? ` · ${t("a reply")}` : ""
          ] }),
          a.canModerate && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-1", children: [
            g.status === "pending" && /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", size: "sm", onClick: () => m(g.id, "approved"), children: [
              /* @__PURE__ */ e.jsx(fe, {}),
              " ",
              t("Approve")
            ] }),
            /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => m(g.id, "spam"), children: [
              /* @__PURE__ */ e.jsx(Ze, {}),
              " ",
              t("Spam")
            ] }),
            /* @__PURE__ */ e.jsxs(
              n.Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                "aria-expanded": l === g.id,
                onClick: () => {
                  c(l === g.id ? null : g.id), r("");
                },
                children: [
                  /* @__PURE__ */ e.jsx(St, {}),
                  " ",
                  t("Reply")
                ]
              }
            )
          ] }),
          l === g.id && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              n.Textarea,
              {
                "aria-label": t("Reply to :author", { author: g.author }),
                rows: 3,
                value: i,
                onChange: (p) => r(p.target.value)
              }
            ),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
              /* @__PURE__ */ e.jsx(n.Button, { type: "button", size: "sm", disabled: i.trim() === "" || d, onClick: () => o(g.id), children: t("Post reply") }),
              /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => c(null), children: t("Cancel") })
            ] })
          ] })
        ] }, g.id)),
        /* @__PURE__ */ e.jsx("a", { href: A(`cms/comments?entry=${s}`), className: "cms:text-sm cms:font-medium cms:underline-offset-4 cms:hover:underline", children: t("All comments on this entry") })
      ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Skeleton, { className: "cms:h-10" }),
        /* @__PURE__ */ e.jsx(n.Skeleton, { className: "cms:h-10" })
      ] })
    }
  );
}
const ja = "cms:flex cms:flex-col cms:gap-1 cms:opacity-60";
function rs({ fields: s, values: a, onChange: l, errors: c, storageKey: i, shared: r = [], sharedValues: d = {}, sharedNote: x, disabled: m = !1 }) {
  const o = [], g = { ...d, ...a };
  for (const u of s.filter((v) => cs(v, g))) {
    const v = o[o.length - 1];
    u.type === "group" ? o.push(u) : Array.isArray(v) ? v.push(u) : o.push([u]);
  }
  const p = x && (r.length > 0 || Me(s)) ? /* @__PURE__ */ e.jsx("p", { role: "note", className: "cms:rounded-lg cms:border cms:border-dashed cms:px-3 cms:py-2 cms:text-sm cms:text-muted-foreground", children: x }) : null;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    p,
    o.map((u) => {
      if (Array.isArray(u))
        return /* @__PURE__ */ e.jsx(n.Card, { children: /* @__PURE__ */ e.jsx(n.CardContent, { children: /* @__PURE__ */ e.jsx("fieldset", { disabled: m, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: u.map((j) => r.includes(j.handle) ? /* @__PURE__ */ e.jsx("fieldset", { disabled: !0, className: ja, title: t("Shared by all languages"), children: /* @__PURE__ */ e.jsx(ae, { id: `data-${j.handle}`, field: j, content: !0, value: d[j.handle], errors: {}, onChange: () => {
        } }) }, j.handle) : /* @__PURE__ */ e.jsx(
          ae,
          {
            id: `data-${j.handle}`,
            field: j,
            content: !0,
            value: a[j.handle],
            errors: Y(c, `data.${j.handle}`),
            onChange: (S) => l(j.handle, S)
          },
          j.handle
        )) }) }) }, `fields-${u[0]?.handle ?? ""}`);
      const v = r.includes(u.handle), y = (v ? d : a)[u.handle], f = Y(c, `data.${u.handle}`);
      return /* @__PURE__ */ e.jsx(
        n.CollapsibleCard,
        {
          title: Be(u),
          titleClassName: "cms:text-base",
          description: u.instructions ?? void 0,
          storageKey: `${i}:${u.handle}`,
          hasErrors: !v && we(c, `data.${u.handle}`),
          children: /* @__PURE__ */ e.jsxs(
            "fieldset",
            {
              disabled: v || m,
              role: "group",
              "aria-label": Be(u),
              className: `cms:flex cms:flex-col cms:gap-2 ${v ? "cms:opacity-60" : ""}`,
              title: v ? t("Shared by all languages") : void 0,
              children: [
                /* @__PURE__ */ e.jsx(
                  de,
                  {
                    bare: !0,
                    fields: u.fields ?? [],
                    id: `data-${u.handle}`,
                    content: !0,
                    errors: v ? {} : f,
                    value: y && typeof y == "object" && !Array.isArray(y) ? y : {},
                    onChange: (j) => l(u.handle, j)
                  }
                ),
                /* @__PURE__ */ e.jsx(H, { message: v ? void 0 : f[""] })
              ]
            }
          )
        },
        u.handle
      );
    })
  ] });
}
function ba({ note: s, redirectsUrl: a }) {
  return /* @__PURE__ */ e.jsx("div", { "aria-live": "polite", children: s !== null && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-xs cms:text-muted-foreground", children: [
    t(s === "redirects" ? "Once published, the old address redirects to the new one." : "The old address will stop working (404) unless a redirect is added."),
    s === "breaks" && a && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      " ",
      /* @__PURE__ */ e.jsx("a", { href: a, target: "_blank", rel: "noopener", className: "cms:underline cms:underline-offset-2 cms:hover:text-foreground", children: t("Add a redirect") })
    ] })
  ] }) });
}
function is() {
  return [
    { handle: "title", type: "text", label: t("Meta title"), instructions: t("Empty: the title."), config: { max: 255 } },
    { handle: "description", type: "textarea", label: t("Meta description"), instructions: t("A sentence or two for search results."), config: { max: 500 } },
    { handle: "canonical", type: "text", label: t("Canonical URL"), instructions: t("Only if this page copies another: that page's address. Empty: this page."), config: { max: 2e3 } },
    { handle: "image", type: "media", label: t("Open Graph image"), instructions: t("Shown when the page is shared."), config: { types: ["image"] } },
    { handle: "noindex", type: "toggle", label: t("Hide from search engines (noindex)") }
  ];
}
function Ds(s) {
  if (s.length === 0) return "";
  const a = s.slice(0, 5).map((l) => l.label).join("; ");
  return ` ${s.length > 5 ? t("It's used by :list and :count more: those links will show nothing.", { list: a, count: s.length - 5 }) : t("It's used by :list: those links will show nothing.", { list: a })}`;
}
function ll(s) {
  const { entry: a } = s;
  return /* @__PURE__ */ e.jsx(cl, { ...s }, a ? `${a.id}:${a.locale}:${a.version}:${a.status}:${a.trashed}:${a.publishedAt}` : "new");
}
function cl({ collection: s, fields: a, locales: l = [], shared: c = [], sharedValues: i = {}, entry: r, values: d, revisions: x, comments: m, termLabels: o, usedBy: g = [], undoRestore: p = null, machineTranslate: u = null, machineTranslateMissing: v = !1, settings: y, blueprints: f = [], blueprintUrl: j = null, homepage: S, redirectsUrl: $ = null, templates: b = null, can: h }) {
  const M = A(`cms/collections/${s.handle}/entries`), w = r ? A(`cms/entries/${r.id}`) : M, B = r ? d.title : t("New entry");
  n.useBreadcrumbs([{ label: s.title, href: M }, { label: B }]);
  const [z, D] = ce(), [P, N] = _.useState(!1), L = r?.publishedAt ? As(new Date(r.publishedAt)) : "", [V, me] = _.useState(L);
  _.useEffect(() => me(L), [L]);
  const [Se, pe] = _.useState(null), [ue, he] = _.useState(!1), I = C.useForm({
    ...d,
    seo: d.seo ?? {},
    locale: r?.locale ?? null,
    version: r?.version ?? null,
    publish: !1,
    published_at: null,
    parent_id: y?.parentId ?? null,
    template: y?.template ?? "",
    comments_closed: y?.commentsClosed === !0
  }), Ce = (T) => I.setData((R) => ({ ...R, ...T })), Z = r ? { locale: r.locale } : {}, k = l.find((T) => T.main)?.code, F = I.errors, K = C.usePage().props.errors ?? {}, X = (T) => {
    const R = Le(F, T);
    R.length > 0 && I.clearErrors(...R);
  }, ee = r !== null && r.status !== "draft" && !r.hasUnpublishedChanges && !I.isDirty, $e = Ma(r?.status ?? "draft", V, r?.publishedAt ?? null), ms = r === null ? h.create : h.update && !r.trashed, ge = r?.status === "scheduled", us = (T) => {
    if (y || r === null) return T;
    const { parent_id: R, template: Q, comments_closed: ac, ..._a } = T;
    return _a;
  }, Ae = (T = !1, R = null) => {
    I.transform((Q) => ({ ...us(Q), publish: T, published_at: R })), r ? I.put(w, { preserveScroll: !0, onSuccess: () => N(!1) }) : I.post(w);
  }, Ca = () => {
    I.transform((T) => ({ ...us(T), version: null, publish: !1, published_at: null })), I.put(w, { preserveScroll: !0 });
  }, W = n.useEditLock({
    type: "cms.entry",
    id: r?.id,
    locale: r?.locale,
    enabled: r !== null && ms,
    noun: t("entry"),
    leaveTo: M,
    getUnsaved: () => I.isDirty ? { title: I.data.title, slug: I.data.slug, data: I.data.data, seo: I.data.seo } : null
  }), J = ms && !W.readOnly, $a = async (T) => {
    const R = await W.loadKept(T);
    I.setData((Q) => ({ ...Q, title: R.title ?? Q.title, slug: R.slug ?? Q.slug, data: R.data ?? Q.data, seo: R.seo ?? Q.seo }));
  };
  n.useUnsavedChanges(I.isDirty && !W.takenOver, J ? () => I.processing || Ae() : void 0);
  const Da = () => {
    const T = () => C.router.post(`${w}/review`, Z, { preserveScroll: !0 });
    I.isDirty ? (I.transform((R) => ({ ...R, publish: !1, published_at: null })), I.put(w, { preserveScroll: !0, onSuccess: T })) : T();
  }, De = (T = null) => {
    h.update ? Ae(!0, T) : r && C.router.post(`${w}/publish`, { ...Z, published_at: T }, { preserveScroll: !0, onSuccess: () => N(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (T) => {
    T.preventDefault(), Ae();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: B }),
    D,
    W.dialogs,
    /* @__PURE__ */ e.jsxs(
      n.PageHeader,
      {
        title: B,
        back: { href: M, label: t("Back to :title", { title: s.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          r && !r.trashed && s.pages !== !1 && /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(
            "a",
            {
              href: r.previewUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              title: I.isDirty ? t("Shows the saved draft: save first to see your changes.") : t("Shows the saved draft."),
              children: [
                /* @__PURE__ */ e.jsx(Ja, {}),
                " ",
                t("Preview")
              ]
            }
          ) }),
          r?.url && /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: r.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(xe, {}),
            " ",
            t("View page")
          ] }) }),
          r?.trashed && h.delete && /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", onClick: () => C.router.post(`${w}/restore`, {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(je, {}),
            " ",
            t("Restore")
          ] }),
          r?.trashed && h.delete && /* @__PURE__ */ e.jsxs(
            n.Button,
            {
              type: "button",
              variant: "outline",
              className: "cms:text-destructive",
              onClick: () => z(
                t(`Permanently delete ":title" in every language, with its revisions? This can't be undone.`, { title: d.title }) + Ds(g),
                () => C.router.delete(`${w}/force`, { data: g.length > 0 ? { force: 1 } : {} })
              ),
              children: [
                /* @__PURE__ */ e.jsx(q, {}),
                " ",
                t("Permanently delete")
              ]
            }
          ),
          r && !r.trashed && (h.create || h.delete && !W.readOnly || J && u !== null || j) && /* @__PURE__ */ e.jsxs(n.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(n.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "outline", size: "icon", "aria-label": t("More actions"), children: /* @__PURE__ */ e.jsx(ct, {}) }) }),
            /* @__PURE__ */ e.jsxs(n.DropdownMenuContent, { align: "end", className: "cms:min-w-52", children: [
              J && u !== null && /* @__PURE__ */ e.jsxs(
                n.DropdownMenuItem,
                {
                  disabled: I.processing || I.isDirty,
                  title: I.isDirty ? void 0 : t("Fill in what isn't translated yet, into the draft"),
                  onSelect: () => C.router.post(A(`cms/entries/${r.id}/translations/${r.locale}/translate`), { version: r.version }, { preserveScroll: !0 }),
                  children: [
                    /* @__PURE__ */ e.jsx(ps, {}),
                    " ",
                    I.isDirty ? t("Save to translate") : t("Translate from :language", { language: l.find((T) => T.main)?.name ?? (k ? O(k) : t("the main language")) })
                  ]
                }
              ),
              h.create && /* @__PURE__ */ e.jsxs(n.DropdownMenuItem, { title: t("Copy every language as a new draft"), onSelect: () => C.router.post(`${w}/duplicate`), children: [
                /* @__PURE__ */ e.jsx(tt, {}),
                " ",
                t("Duplicate")
              ] }),
              j && /* @__PURE__ */ e.jsx(n.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(C.Link, { href: j, children: [
                /* @__PURE__ */ e.jsx(gt, {}),
                " ",
                t("Edit blueprint")
              ] }) }),
              h.delete && !W.readOnly && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(n.DropdownMenuSeparator, {}),
                /* @__PURE__ */ e.jsxs(
                  n.DropdownMenuItem,
                  {
                    className: "cms:text-destructive",
                    onSelect: () => z(t('Move ":title" to the trash? It comes off the site; you can restore it.', { title: d.title }) + Ds(g), () => C.router.delete(w), t("Move to trash")),
                    children: [
                      /* @__PURE__ */ e.jsx(q, {}),
                      " ",
                      t("Move to trash")
                    ]
                  }
                )
              ] })
            ] })
          ] }),
          r && J && v && /* @__PURE__ */ e.jsxs("span", { title: t("Machine translation isn't set up on this site: ask your developer (SUNRICE_TRANSLATE_DRIVER, see Help → Developer docs → Machine translation)."), children: [
            /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", disabled: !0, "aria-describedby": "machine-translate-missing", children: [
              /* @__PURE__ */ e.jsx(ps, {}),
              " ",
              t("Translate from :language", { language: l.find((T) => T.main)?.name ?? (k ? O(k) : t("the main language")) })
            ] }),
            /* @__PURE__ */ e.jsx("span", { id: "machine-translate-missing", className: "cms:sr-only", children: t("Machine translation isn't set up on this site: ask your developer.") })
          ] }),
          J && /* @__PURE__ */ e.jsxs(n.Button, { type: "submit", variant: r ? "outline" : "default", disabled: I.processing, children: [
            I.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
            t(r ? "Save draft" : "Create draft")
          ] }),
          r && !r.trashed && J && !h.publish && (r.status === "draft" || r.hasUnpublishedChanges || I.isDirty) && /* @__PURE__ */ e.jsxs(
            n.Button,
            {
              type: "button",
              disabled: I.processing,
              onClick: Da,
              title: r.review ? t("Already sent; sending again tells them again") : t("Ask those who can publish to review it"),
              children: [
                /* @__PURE__ */ e.jsx(dn, {}),
                " ",
                r.review ? t("Send for review again") : t("Submit for review")
              ]
            }
          ),
          r && !r.trashed && h.publish && !W.readOnly && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex", children: [
            ge && ee ? /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", className: "cms:rounded-r-none", disabled: I.processing, title: t("Change the date"), onClick: () => N(!0), children: [
              /* @__PURE__ */ e.jsx(Qe, {}),
              " ",
              t("Scheduled for :date", { date: U(r.publishedAt) })
            ] }) : /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: ee ? "outline" : "default", className: "cms:rounded-r-none cms:disabled:opacity-100", disabled: I.processing || ee, onClick: () => De($e.at), children: [
              ee && /* @__PURE__ */ e.jsx(fe, { className: "cms:text-emerald-600 cms:dark:text-emerald-400" }),
              ee ? t("Published") : $e.action === "schedule" ? t("Schedule") : $e.action === "backdate" ? t("Publish now, back-dated") : r.status === "draft" ? t("Publish") : t("Publish changes")
            ] }),
            /* @__PURE__ */ e.jsxs(n.DropdownMenu, { children: [
              /* @__PURE__ */ e.jsx(n.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(n.Button, { type: "button", size: "icon", variant: ee ? "outline" : "default", className: ee ? "cms:-ml-px cms:rounded-l-none" : "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": t("More publishing options"), children: /* @__PURE__ */ e.jsx(Ys, {}) }) }),
              /* @__PURE__ */ e.jsxs(n.DropdownMenuContent, { align: "end", children: [
                /* @__PURE__ */ e.jsxs(n.DropdownMenuItem, { onSelect: () => N(!0), children: [
                  /* @__PURE__ */ e.jsx(Qe, {}),
                  " ",
                  t(ge ? "Change the date…" : "Publish on a date…")
                ] }),
                ge && /* @__PURE__ */ e.jsx(n.DropdownMenuItem, { onSelect: () => De((/* @__PURE__ */ new Date()).toISOString()), children: t("Publish now") }),
                r.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  /* @__PURE__ */ e.jsx(n.DropdownMenuSeparator, {}),
                  /* @__PURE__ */ e.jsx(n.DropdownMenuItem, { onSelect: () => C.router.post(`${w}/unpublish`, Z, { preserveScroll: !0 }), children: t(ge ? "Unschedule (back to draft)" : "Unpublish") })
                ] })
              ] })
            ] })
          ] })
        ] }),
        children: [
          r && /* @__PURE__ */ e.jsx(n.Badge, { variant: r.status === "published" ? "success" : "secondary", children: r.trashed ? t("In the trash") : te(r.status) }),
          r?.review && !r.trashed && /* @__PURE__ */ e.jsx(n.Badge, { variant: "warning", title: r.review.by ? t(":name sent it on :date", { name: r.review.by, date: U(r.review.requestedAt) }) : t("Sent on :date", { date: U(r.review.requestedAt) }), children: t("Waiting for review") }),
          I.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
        ]
      }
    ),
    r && l.length > 1 && /* @__PURE__ */ e.jsx(
      il,
      {
        entryUrl: w,
        editUrl: `${M}/${r.id}/edit`,
        current: r.locale,
        locales: l,
        canAdd: (h.create || h.translate === !0) && !r.trashed,
        canRemove: h.delete && !r.isMain && !r.trashed,
        onRemove: () => z(
          t('Remove the :language translation of ":title"? Its revisions go with it.', { language: O(r.locale), title: d.title }),
          () => C.router.delete(`${w}/translations/${r.locale}`)
        )
      }
    ),
    /* @__PURE__ */ e.jsx(n.ViewingNotice, { by: W.viewingBy, onTakeOver: W.requestTakeOver }),
    /* @__PURE__ */ e.jsx(n.KeptEditsNotice, { kept: W.kept, disabled: !J, onLoad: (T) => {
      $a(T);
    }, onDiscard: (T) => {
      W.discardKept(T);
    } }),
    F.version && /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: [
      /* @__PURE__ */ e.jsx("span", { children: F.version }),
      /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "outline", size: "sm", onClick: () => C.router.reload(), children: t("Load theirs") }),
        /* @__PURE__ */ e.jsx(
          n.Button,
          {
            type: "button",
            variant: "destructive",
            size: "sm",
            disabled: I.processing,
            onClick: () => z(t("Save your version over theirs? Their changes are replaced (their earlier published versions stay in the revisions)."), Ca),
            children: t("Save mine anyway")
          }
        )
      ] })
    ] }),
    (F.entry || F.published_at || K.published_at || K.homepage) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: F.entry ?? F.published_at ?? K.published_at ?? K.homepage }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_18rem]", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(n.Card, { children: /* @__PURE__ */ e.jsx(n.CardContent, { children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: !J, className: "cms:grid cms:gap-4 cms:md:grid-cols-[2fr_1fr]", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "title", children: t("Title") }),
            /* @__PURE__ */ e.jsx(
              n.Input,
              {
                id: "title",
                value: I.data.title,
                "aria-invalid": F.title !== void 0,
                onChange: (T) => {
                  const R = T.target.value;
                  I.setData((Q) => ({ ...Q, title: R, slug: La(Q.slug, Q.title, R, r !== null && r.publishedAt === null && r.status === "draft") })), X("title");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(H, { message: F.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "slug", children: t("Slug") }),
            /* @__PURE__ */ e.jsx(
              n.Input,
              {
                id: "slug",
                className: "cms:font-mono",
                value: I.data.slug,
                placeholder: t("Made from the title"),
                "aria-invalid": F.slug !== void 0,
                onChange: (T) => {
                  I.setData("slug", T.target.value), X("slug");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(ba, { note: Is(r?.publishedSlug, I.data.slug, r !== null && r.status !== "draft"), redirectsUrl: $ }),
            /* @__PURE__ */ e.jsx(H, { message: F.slug })
          ] })
        ] }) }) }),
        /* @__PURE__ */ e.jsx(Zt.Provider, { value: Array.isArray(o) || !o ? {} : o, children: /* @__PURE__ */ e.jsx(
          rs,
          {
            disabled: !J,
            fields: a,
            values: I.data.data,
            errors: F,
            storageKey: `cms:entry:${s.handle}`,
            shared: c,
            sharedValues: i,
            sharedNote: k ? t("Shared by all languages: the greyed-out fields are edited in :language.", { language: O(k) }) : t("Shared by all languages: the greyed-out fields are edited in the main language."),
            onChange: (T, R) => {
              I.setData("data", { ...I.data.data, [T]: R }), X(`data.${T}`);
            }
          }
        ) }),
        /* @__PURE__ */ e.jsx(n.CollapsibleCard, { title: t("SEO"), description: t("How this entry appears in search results and shared links."), titleClassName: "cms:text-base", storageKey: "cms:entry:seo", hasErrors: we(F, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !J, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(
          de,
          {
            bare: !0,
            id: "seo",
            fields: is(),
            value: I.data.seo,
            errors: Y(F, "seo"),
            onChange: (T) => {
              I.setData("seo", T), X("seo");
            }
          }
        ) }) })
      ] }),
      !r && s.hierarchical && /* @__PURE__ */ e.jsx("aside", { className: "cms:flex cms:flex-col cms:gap-4", children: /* @__PURE__ */ e.jsx(n.CollapsibleCard, { title: "Page settings", titleClassName: "cms:text-base", storageKey: "cms:entry:page-settings", hasErrors: F.parent_id !== void 0, children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !J, className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: /* @__PURE__ */ e.jsx(va, { collection: s, value: I.data.parent_id, error: F.parent_id, onChange: (T) => Ce({ parent_id: T }) }) }) }) }),
      r && /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:flex-col cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs(n.CollapsibleCard, { title: t("Status"), titleClassName: "cms:text-base", storageKey: "cms:entry:status", contentClassName: "cms:flex cms:flex-col cms:gap-3 cms:text-sm", children: [
          /* @__PURE__ */ e.jsxs("dl", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-3", children: [
              /* @__PURE__ */ e.jsx("dt", { className: "cms:text-muted-foreground", children: t("Status") }),
              /* @__PURE__ */ e.jsx("dd", { children: /* @__PURE__ */ e.jsx(n.Badge, { variant: r.status === "published" ? "success" : "secondary", children: r.trashed ? t("In the trash") : te(r.status) }) })
            ] }),
            r.status !== "draft" && r.publishedAt && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:justify-between cms:gap-3", children: [
              /* @__PURE__ */ e.jsx("dt", { className: "cms:text-muted-foreground", children: r.status === "scheduled" ? t("Scheduled for") : t("Published") }),
              /* @__PURE__ */ e.jsx("dd", { className: "cms:text-right cms:tabular-nums", children: U(r.publishedAt) })
            ] })
          ] }),
          r.review && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-muted-foreground", children: [
            r.review.by ? t("Sent for review by :name · :date.", { name: r.review.by, date: U(r.review.requestedAt) }) : t("Sent for review · :date.", { date: U(r.review.requestedAt) }),
            h.publish ? ` ${t("Publishing it answers the request.")}` : ""
          ] }),
          r.review && !r.trashed && (r.review.mine || h.publish && !W.readOnly) && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: [
            h.publish && !W.readOnly && /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", size: "sm", disabled: I.processing, onClick: () => he(!0), children: [
              /* @__PURE__ */ e.jsx(ze, {}),
              " ",
              t("Send back…")
            ] }),
            r.review.mine && /* @__PURE__ */ e.jsx(
              n.Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                disabled: I.processing,
                title: t("Take the request back, to keep working on it"),
                onClick: () => C.router.post(`${w}/review/withdraw`, Z, { preserveScroll: !0 }),
                children: t("Withdraw the request")
              }
            )
          ] }),
          !r.trashed && h.publish && !W.readOnly && /* @__PURE__ */ e.jsx(
            ol,
            {
              status: r.status,
              value: V,
              onChange: me,
              dated: $e,
              processing: I.processing,
              onPublish: (T) => De(T),
              onUnpublish: () => C.router.post(`${w}/unpublish`, Z, { preserveScroll: !0 })
            }
          ),
          r.status !== "draft" && r.hasUnpublishedChanges && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("The draft has changes the site doesn't show yet.") }),
          S?.is && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("This is the site's homepage.") }),
          S && !S.is && S.can && r.status === "published" && !r.trashed && /* @__PURE__ */ e.jsx(
            n.Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "cms:mt-1 cms:self-start",
              onClick: () => z(
                (S.current ? t('Make ":title" the homepage? Visitors to / will see it instead of ":current".', { title: d.title, current: S.current }) : t('Make ":title" the homepage? Visitors to / will see it.', { title: d.title })) + " " + t("Its own address will lead to / as well."),
                () => C.router.post(`${w}/homepage`, {}, { preserveScroll: !0 }),
                t("Make this the homepage")
              ),
              children: t("Make this the homepage")
            }
          ),
          l.find((T) => T.code === r.locale)?.outdated && /* @__PURE__ */ e.jsx("p", { className: "cms:text-amber-700 cms:dark:text-amber-400", children: k ? t("The :language version changed since this translation was last saved.", { language: O(k) }) : t("The main version changed since this translation was last saved.") })
        ] }),
        /* @__PURE__ */ e.jsxs(n.CollapsibleCard, { title: t("Used by"), titleClassName: "cms:text-base", storageKey: "cms:entry:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          g.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("No other content links here.") }),
          g.map((T) => /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
            T.url ? /* @__PURE__ */ e.jsx("a", { href: T.url, className: "cms:block cms:truncate cms:underline-offset-4 cms:hover:underline", children: T.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:truncate", children: T.label }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", title: T.field, children: T.fieldLabel ?? T.field })
          ] }, `${T.label}:${T.field}`))
        ] }),
        y && /* @__PURE__ */ e.jsx(
          ul,
          {
            entryUrl: w,
            collection: s,
            settings: y,
            templates: b,
            blueprints: f,
            disabled: !J,
            values: I.data,
            errors: F,
            onChange: Ce,
            draftDirty: I.isDirty
          }
        ),
        m !== null && s.comments && /* @__PURE__ */ e.jsx(nl, { entryId: r.id, comments: m }),
        /* @__PURE__ */ e.jsxs(n.CollapsibleCard, { title: t("Revisions"), titleClassName: "cms:text-base", storageKey: "cms:entry:revisions", contentClassName: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
          p !== null && h.update && /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", size: "sm", onClick: () => C.router.post(A(`cms/entries/${r.id}/translations/${r.locale}/undo-restore`), {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(ze, {}),
            " ",
            t("Undo the restore")
          ] }),
          /* @__PURE__ */ e.jsx(C.Deferred, { data: "revisions", fallback: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(n.Skeleton, { className: "cms:h-8" }),
            /* @__PURE__ */ e.jsx(n.Skeleton, { className: "cms:h-8" })
          ] }), children: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            (x ?? []).length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("Each publish keeps one.") }),
            (x ?? []).map((T) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1 cms:border-b cms:border-border/60 cms:pb-2 cms:last:border-b-0 cms:last:pb-0", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
                /* @__PURE__ */ e.jsx("div", { className: "cms:truncate", children: T.title }),
                /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
                  U(T.createdAt),
                  T.author ? ` · ${T.author}` : ""
                ] }),
                /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: T.changed === null ? t("First kept version") : T.changed.length === 0 ? t("No field changed") : t("Changed: :fields", { fields: T.changed.join(", ") }) })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-1", children: [
                /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => pe(T), children: t("Compare") }),
                h.update && !r.trashed && /* @__PURE__ */ e.jsx(
                  n.Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    onClick: () => C.router.post(A(`cms/entries/${r.id}/revisions/${T.id}/restore`), {}, { preserveScroll: !0 }),
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
      rl,
      {
        open: ue,
        onClose: () => he(!1),
        by: r.review.by,
        onSend: (T, R) => C.router.post(`${w}/review/send-back`, { ...Z, note: T }, { preserveScroll: !0, onSuccess: () => {
          he(!1), R();
        }, onError: R })
      }
    ),
    /* @__PURE__ */ e.jsx(ml, { entryId: r?.id ?? 0, revision: Se, onClose: () => pe(null), dirty: I.isDirty }),
    /* @__PURE__ */ e.jsx(
      dl,
      {
        open: P,
        onClose: () => N(!1),
        processing: I.processing,
        rescheduling: ge,
        current: r?.publishedAt ?? null,
        onSchedule: (T) => De(T)
      }
    )
  ] });
}
function rl({ open: s, onClose: a, by: l, onSend: c }) {
  const [i, r] = _.useState(""), [d, x] = _.useState(!1), m = C.usePage().props.errors ?? {};
  return _.useEffect(() => {
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
          placeholder: t("What to change before it can be published"),
          "aria-invalid": m.note !== void 0,
          onChange: (o) => r(o.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(H, { message: m.note })
    ] }),
    /* @__PURE__ */ e.jsxs(n.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "outline", disabled: d, onClick: a, children: t("Cancel") }),
      /* @__PURE__ */ e.jsxs(n.Button, { type: "button", disabled: d, onClick: () => {
        x(!0), c(i, () => x(!1));
      }, children: [
        d && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
        " ",
        t("Send back")
      ] })
    ] })
  ] }) });
}
function il({ entryUrl: s, editUrl: a, current: l, locales: c, canAdd: i, canRemove: r, onRemove: d }) {
  const x = c.filter((o) => o.status !== null), m = c.filter((o) => o.status === null);
  return /* @__PURE__ */ e.jsxs("nav", { "aria-label": t("Languages"), className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("div", { className: "cms:inline-flex cms:items-center cms:gap-0.5 cms:rounded-md cms:bg-muted cms:p-0.5", children: x.map((o) => {
      const g = o.code === l, p = o.main ? t(":language (main)", { language: o.name ?? O(o.code) }) : o.name ?? O(o.code), u = o.status ? te(o.status) : "", v = o.outdated ? t(":language: :status, outdated (the main language changed since)", { language: p, status: u }) : t(":language: :status", { language: p, status: u });
      return /* @__PURE__ */ e.jsxs(
        "button",
        {
          type: "button",
          title: v,
          "aria-label": v,
          "aria-current": g ? "page" : void 0,
          onClick: () => !g && C.router.get(a, { locale: o.code }),
          className: `cms:relative cms:inline-flex cms:h-7 cms:min-w-10 cms:items-center cms:justify-center cms:gap-1.5 cms:rounded cms:px-2.5 cms:text-xs cms:font-semibold cms:tracking-wide cms:uppercase cms:transition-colors ${g ? "cms:bg-card cms:text-foreground cms:shadow-xs" : "cms:text-muted-foreground cms:hover:text-foreground"}`,
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
        title: t("Add :language", { language: o.name ?? O(o.code) }),
        onClick: () => C.router.post(`${s}/translations`, { locale: o.code }),
        children: [
          /* @__PURE__ */ e.jsx(G, {}),
          " ",
          o.code
        ]
      },
      o.code
    )),
    r && /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:ml-auto cms:text-destructive", onClick: d, children: t("Remove this language") })
  ] });
}
function ol({ status: s, value: a, onChange: l, dated: c, processing: i, onPublish: r, onUnpublish: d }) {
  const x = c.action !== "now", m = {
    now: t("Publish"),
    schedule: t(s === "scheduled" ? "Reschedule" : "Schedule"),
    backdate: t("Publish now, back-dated"),
    redate: t("Change date")
  }[c.action];
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:border-t cms:border-border/60 cms:pt-3", children: [
    /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "entry-published-at", children: t("Publish date") }),
    /* @__PURE__ */ e.jsx(n.DatePicker, { id: "entry-published-at", withTime: !0, className: "cms:max-w-none", value: a || null, onChange: (o) => l(o ?? "") }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t(s === "draft" ? "Empty: now. A date in the future schedules it." : "The date shown as published. A date in the future takes it off the site until then.") }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: [
      (s === "draft" || x) && /* @__PURE__ */ e.jsxs(n.Button, { type: "button", size: "sm", disabled: i, onClick: () => r(c.at), children: [
        /* @__PURE__ */ e.jsx(Qe, {}),
        " ",
        m
      ] }),
      s !== "draft" && /* @__PURE__ */ e.jsx(n.Button, { type: "button", size: "sm", variant: "outline", disabled: i, onClick: d, children: t("Unpublish") })
    ] })
  ] });
}
function dl({ open: s, onClose: a, onSchedule: l, current: c, processing: i, rescheduling: r }) {
  const [d, x] = _.useState("");
  _.useEffect(() => {
    s && x(As(za(c)));
  }, [s, c]);
  const m = d === "" ? null : new Date(d), o = m !== null && m.getTime() <= Date.now();
  return /* @__PURE__ */ e.jsx(n.Dialog, { open: s, onOpenChange: (g) => !g && a(), children: /* @__PURE__ */ e.jsxs(n.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(n.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(n.DialogTitle, { children: t(r ? "Change the publish date" : "Publish on a date") }),
      /* @__PURE__ */ e.jsx(n.DialogDescription, { children: t("The entry goes live then.") })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "published-at", children: t("Date and time") }),
      /* @__PURE__ */ e.jsx(n.DatePicker, { id: "published-at", withTime: !0, required: !0, className: "cms:max-w-none", value: d || null, onChange: (g) => x(g ?? "") }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("In your time zone.") }),
      o && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-amber-700 cms:dark:text-amber-400", children: t("This date has passed: the entry goes live now, dated :date.", { date: U(m.toISOString()) }) })
    ] }),
    /* @__PURE__ */ e.jsxs(n.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "outline", onClick: a, children: t("Cancel") }),
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", disabled: m === null || i, onClick: () => m && l(m.toISOString()), children: t(o ? "Publish now, back-dated" : r ? "Change the date" : "Schedule") })
    ] })
  ] }) });
}
function ml({ entryId: s, revision: a, onClose: l, dirty: c }) {
  const [i, r] = _.useState(null), [d, x] = _.useState(!1);
  return _.useEffect(() => {
    if (r(null), x(!1), !a) return;
    let m = !0;
    return fetch(A(`cms/entries/${s}/revisions/${a.id}/compare`), { headers: { Accept: "application/json" }, credentials: "same-origin" }).then((o) => o.ok ? o.json() : Promise.reject(new Error(String(o.status)))).then((o) => {
      m && r(o.fields);
    }).catch(() => {
      m && x(!0);
    }), () => {
      m = !1;
    };
  }, [a, s]), /* @__PURE__ */ e.jsx(n.Dialog, { open: a !== null, onOpenChange: (m) => !m && l(), children: /* @__PURE__ */ e.jsxs(n.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto cms:sm:max-w-2xl", children: [
    /* @__PURE__ */ e.jsxs(n.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(n.DialogTitle, { children: t("Compare with the draft") }),
      /* @__PURE__ */ e.jsxs(n.DialogDescription, { children: [
        a ? a.author ? t("The version published :date by :name, beside the saved draft.", { date: U(a.createdAt), name: a.author }) : t("The version published :date, beside the saved draft.", { date: U(a.createdAt) }) : "",
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
function va({ collection: s, value: a, error: l, onChange: c }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "parent", children: t("Parent") }),
    /* @__PURE__ */ e.jsx(
      ke,
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
    /* @__PURE__ */ e.jsx(H, { message: l })
  ] });
}
function ul({ entryUrl: s, collection: a, settings: l, templates: c, blueprints: i, disabled: r, values: d, errors: x, onChange: m, draftDirty: o }) {
  const g = i.length > 1 ? l.blueprint ?? i[0].handle : void 0, p = C.useForm({ blueprint: g ?? "" }), u = p.errors.blueprint, v = ["parent_id", "template", "comments_closed"].some((y) => x[y] !== void 0) || u !== void 0;
  return /* @__PURE__ */ e.jsx(n.CollapsibleCard, { title: t("Page settings"), titleClassName: "cms:text-base", storageKey: "cms:entry:page-settings", hasErrors: v, children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: r, className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: [
    a.hierarchical && /* @__PURE__ */ e.jsx(va, { collection: a, value: d.parent_id, error: x.parent_id, onChange: (y) => m({ parent_id: y }) }),
    i.length > 1 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "blueprint", children: t("Blueprint") }),
      /* @__PURE__ */ e.jsxs(n.Select, { value: p.data.blueprint, onValueChange: (y) => p.setData("blueprint", y), children: [
        /* @__PURE__ */ e.jsx(n.SelectTrigger, { id: "blueprint", "aria-invalid": u !== void 0, children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(n.SelectContent, { children: i.map((y) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: y.handle, children: y.title }, y.handle)) })
      ] }),
      p.data.blueprint !== g && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("The fields change in every language; values of fields both blueprints have are kept. The editor reloads.") }),
        /* @__PURE__ */ e.jsx(
          n.Button,
          {
            type: "button",
            size: "sm",
            disabled: p.processing || o,
            title: o ? t("Save your draft first") : void 0,
            onClick: () => p.put(`${s}/settings`, { preserveScroll: !0 }),
            children: t("Change blueprint")
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(H, { message: u })
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
          onChange: (y) => m({ template: y.target.value }),
          "aria-invalid": x.template !== void 0
        }
      ),
      /* @__PURE__ */ e.jsx(fa, { example: `cms.${a.handle}-landing`, empty: t("Leave empty to use the collection's template."), value: d.template, lookup: c }),
      /* @__PURE__ */ e.jsx(H, { message: x.template })
    ] }),
    a.comments && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(n.Switch, { id: "comments-open", checked: !d.comments_closed, onCheckedChange: (y) => m({ comments_closed: !y }) }),
      /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "comments-open", children: t("Accept new comments") }),
      /* @__PURE__ */ e.jsx("a", { href: A(`cms/comments?entry=${s.split("/").slice(-1)[0]}`), className: "cms:ml-auto cms:text-muted-foreground cms:underline-offset-4 hover:cms:underline", children: t("Comments") })
    ] })
  ] }) });
}
function Xe(s, a) {
  const l = s[a]?.depth ?? 0;
  let c = a + 1;
  for (; c < s.length && s[c].depth > l; ) c++;
  return c;
}
function ne(s, a) {
  const l = a < 0 ? 0 : a + 1, c = a < 0 ? s.length : Xe(s, a), i = a < 0 ? 0 : (s[a]?.depth ?? 0) + 1, r = [];
  for (let d = l; d < c; d++)
    s[d].depth === i && r.push(d);
  return r;
}
function os(s, a, l) {
  const c = ne(s, a);
  if (l.length !== c.length || [...l].sort((x, m) => x - m).some((x, m) => x !== c[m]) || c.length === 0) return s.slice();
  const i = c[0], r = Xe(s, c[c.length - 1]), d = l.flatMap((x) => s.slice(x, Xe(s, x)));
  return [...s.slice(0, i), ...d, ...s.slice(r)];
}
function hl(s, a) {
  const l = new Set(s.map((x) => x.id)), c = /* @__PURE__ */ new Map();
  for (const x of s) {
    const m = a(x), o = m != null && l.has(m) ? m : null;
    c.set(o, [...c.get(o) ?? [], x]);
  }
  const i = [], r = /* @__PURE__ */ new Set(), d = (x, m) => {
    for (const o of c.get(x) ?? [])
      r.has(o.id) || (r.add(o.id), i.push({ ...o, depth: m }), d(o.id, m + 1));
  };
  d(null, 0);
  for (const x of s)
    r.has(x.id) || (r.add(x.id), i.push({ ...x, depth: 0 }), d(x.id, 1));
  return i;
}
function xl({ collection: s, rows: a, hierarchical: l = !1 }) {
  const c = _.useCallback(
    (m) => hl(m, (o) => l ? o.parentId : null),
    [l]
  ), [i, r] = _.useState(() => c(a));
  _.useEffect(() => r(c(a)), [a, c]);
  const d = (m, o) => {
    const g = os(i, m, o), p = ne(g, m).map((u) => g[u].id);
    r(g), C.router.post(
      A("cms/entries/reorder"),
      { collection: s, ids: p, parent_id: m < 0 ? null : i[m]?.id ?? null },
      { preserveScroll: !0, preserveState: !0, onError: () => r(c(a)) }
    );
  }, x = (m) => /* @__PURE__ */ e.jsx(
    n.SortableList,
    {
      items: ne(i, m),
      getId: (o) => i[o].id,
      getLabel: (o) => i[o].title,
      onReorder: (o) => d(m, o),
      className: m < 0 ? "cms:gap-1" : "cms:mt-1 cms:gap-1 cms:pl-6",
      children: (o, { handle: g }) => {
        const p = i[o];
        return /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-lg cms:border cms:border-border/70 cms:bg-card cms:p-2 cms:text-sm", children: [
            /* @__PURE__ */ e.jsx(n.SortableHandle, { ...g, label: t("Move :title", { title: p.title }) }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium", children: p.title }),
            /* @__PURE__ */ e.jsx(n.Badge, { variant: p.status === "published" ? "success" : "secondary", children: te(p.status) })
          ] }),
          ne(i, o).length > 0 && x(o)
        ] });
      }
    }
  );
  return /* @__PURE__ */ e.jsxs(n.Card, { className: "cms:p-2", children: [
    l && /* @__PURE__ */ e.jsx("p", { className: "cms:px-1 cms:pb-1 cms:text-xs cms:text-muted-foreground", children: t("Entries move among those at their level, with what's under them. To put one under another, choose its Parent in its Page settings.") }),
    x(-1)
  ] });
}
function pl(s, a, l) {
  const c = { ...s, ...a }, i = Object.fromEntries(Object.entries(c.terms).filter(([, d]) => d !== "")), r = {};
  return c.search && (r.search = c.search), c.status && (r.status = c.status), c.author && (r.author = c.author), Object.keys(i).length > 0 && (r.terms = i), c.locale && c.locale !== l && (r.locale = c.locale), c.sort && (r.sort = c.sort), r.per_page = c.perPage, r;
}
function gl(s) {
  const a = new URLSearchParams();
  for (const [l, c] of Object.entries(s))
    if (typeof c == "object")
      for (const [i, r] of Object.entries(c)) a.set(`${l}[${i}]`, r);
    else
      a.set(l, String(c));
  return a.toString();
}
function fl(s, a) {
  return s === a ? `-${a}` : s === `-${a}` ? "" : a;
}
function jl(s, a) {
  return s === a ? "asc" : s === `-${a}` ? "desc" : null;
}
function _s(s) {
  return [s.search, s.status, s.author, ...Object.values(s.terms)].filter((a) => a !== "").length;
}
const qe = "__all", bl = () => [
  { value: "draft", label: t("Drafts") },
  { value: "published", label: t("Published") },
  { value: "scheduled", label: t("Scheduled") },
  { value: "trashed", label: t("Trash") }
];
function vl(s) {
  const { collection: a, entries: l, query: c } = s;
  return n.useBreadcrumbs([{ label: a ? a.title : t("Entries") }]), !a || !l || !c ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: t("Entries") }),
    /* @__PURE__ */ e.jsx(n.PageHeader, { title: t("Entries"), description: t("There are no collections yet. Create one under Structure → Collections, then come back to write its entries.") })
  ] }) : /* @__PURE__ */ e.jsx(yl, { ...s, collection: a, entries: l, query: c });
}
function yl({
  collection: s,
  collections: a,
  entries: l,
  query: c,
  columns: i = [],
  filters: r = { authors: [], taxonomies: [], locales: [] },
  links: d = [],
  manualOrder: x = !1,
  perPageOptions: m = [10, 25, 50, 100],
  preferencesKey: o,
  trashedCount: g = 0,
  can: p
}) {
  const u = A(`cms/collections/${s.handle}/entries`), v = r.locales[0] ?? c.locale, [y, f] = _.useState(c.search), [j, S] = _.useState([]), [$, b] = _.useState(!1), [h, M] = ce(), { setColumns: w, setPerPage: B } = n.useTablePreferences(o ?? `table.cms.entries.${s.handle}`, { columns: c.columns, perPage: c.perPage });
  _.useEffect(() => S([]), [l]);
  const z = c.status === "trashed", D = _s(c) > 0, P = i.filter((k) => c.columns.includes(k.key)), N = (k = {}) => pl(c, k, v), L = (k) => C.router.get(u, N(k), { preserveState: !0, preserveScroll: !0, replace: !0 });
  _.useEffect(() => {
    if (y === c.search) return;
    const k = window.setTimeout(() => L({ search: y }), 300);
    return () => window.clearTimeout(k);
  }, [y]);
  const V = z ? p?.delete ? [{ action: "restore", label: t("Restore") }, { action: "delete", label: t("Permanently delete"), danger: !0 }] : [] : [
    ...p?.publish ? [{ action: "publish", label: t("Publish") }, { action: "unpublish", label: t("Unpublish") }] : [],
    ...p?.delete ? [{ action: "trash", label: t("Move to the trash"), danger: !0 }] : []
  ], me = (k, F, K = !1) => {
    const X = () => C.router.post(`${u}/bulk`, { action: k, ids: j }, { preserveScroll: !0 });
    if (K) {
      const ee = j.length === 1 ? t(":action: 1 entry?", { action: F }) : t(":action: :count entries?", { action: F, count: j.length });
      h(
        `${ee} ${t(k === "delete" ? "This can't be undone." : "They come off the site; you can restore them.")}`,
        X,
        t(k === "trash" ? "Move to trash" : "Delete")
      );
    } else
      X();
  }, Se = async (k) => {
    const F = new Set(c.columns);
    F.has(k) ? F.delete(k) : F.add(k), await w(i.map((K) => K.key).filter((K) => F.has(K))), C.router.reload({ only: ["entries", "query"] });
  }, pe = () => {
    f(""), L({ search: "", status: "", author: "", terms: {} });
  }, ue = x && !!p?.update, he = ue && l !== null && l.lastPage <= 1 && l.data.length > 1, I = z && !!p?.delete, Ce = 1 + P.length + (V.length > 0 ? 1 : 0) + (ue ? 1 : 0) + (I ? 1 : 0), Z = gl(N());
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: s.title }),
    M,
    /* @__PURE__ */ e.jsx(
      n.PageHeader,
      {
        title: z ? /* @__PURE__ */ e.jsx(n.TrashTitle, { children: s.title }) : s.title,
        primary: p?.create && !z && /* @__PURE__ */ e.jsx(n.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(C.Link, { href: `${u}/create`, children: [
          /* @__PURE__ */ e.jsx(G, {}),
          " ",
          t("New entry")
        ] }) }),
        menu: [
          ...l.total > 0 && p?.export ? [{ label: t("Export CSV"), href: `${u}/export${Z ? `?${Z}` : ""}`, download: !0, icon: /* @__PURE__ */ e.jsx(nt, {}) }] : [],
          ...d.map((k) => ({ label: k.label, href: k.href, external: k.external, group: k.group }))
        ],
        children: a.length > 1 && /* @__PURE__ */ e.jsxs(n.Select, { value: s.handle, onValueChange: (k) => C.router.get(A(`cms/collections/${k}/entries`)), children: [
          /* @__PURE__ */ e.jsx(n.SelectTrigger, { className: "cms:w-48", "aria-label": t("Collection"), children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(n.SelectContent, { children: a.map((k) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: k.handle, children: k.title }, k.handle)) })
        ] })
      }
    ),
    z && /* @__PURE__ */ e.jsx(n.TrashBanner, { items: t("entries"), onBack: () => L({ status: "" }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-xs", children: [
        /* @__PURE__ */ e.jsx(ye, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          n.Input,
          {
            className: "cms:pl-9",
            placeholder: t("Search titles, slugs or #id"),
            "aria-label": t("Search entries"),
            value: y,
            onChange: (k) => f(k.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(Ke, { label: t("Status"), value: c.status, options: bl(), onChange: (k) => L({ status: k }) }),
      r.authors.length > 0 && /* @__PURE__ */ e.jsx(Ke, { label: t("Author"), value: c.author, options: r.authors, onChange: (k) => L({ author: k }) }),
      r.taxonomies.filter((k) => k.terms.length > 0).map((k) => /* @__PURE__ */ e.jsx(
        Ke,
        {
          label: k.title,
          value: c.terms[k.handle] ?? "",
          options: k.terms.map((F) => ({ value: F.value, label: `${"— ".repeat(F.depth)}${F.label}` })),
          onChange: (F) => L({ terms: { ...c.terms, [k.handle]: F } })
        },
        k.handle
      )),
      r.locales.length > 1 && /* @__PURE__ */ e.jsxs(n.Select, { value: c.locale, onValueChange: (k) => L({ locale: k }), children: [
        /* @__PURE__ */ e.jsx(n.SelectTrigger, { className: "cms:w-auto cms:min-w-40 cms:max-w-72", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(n.SelectContent, { children: r.locales.map((k) => /* @__PURE__ */ e.jsxs(n.SelectItem, { value: k, children: [
          O(k),
          k === v ? ` ${t("(main)")}` : ""
        ] }, k)) })
      ] }),
      D && /* @__PURE__ */ e.jsxs(n.Button, { variant: "ghost", size: "sm", onClick: pe, children: [
        /* @__PURE__ */ e.jsx(Ne, {}),
        " ",
        t("Clear")
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:ml-auto cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
        j.length > 0 && V.length > 0 && /* @__PURE__ */ e.jsxs("div", { role: "toolbar", "aria-label": t("Selected entries"), className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t(":count selected", { count: j.length }) }),
          V.map((k) => /* @__PURE__ */ e.jsx(n.Button, { size: "sm", variant: k.danger ? "destructive" : "outline", onClick: () => me(k.action, k.label, k.danger), children: k.label }, k.action))
        ] }),
        he && /* @__PURE__ */ e.jsxs(n.Button, { variant: $ ? "secondary" : "outline", "aria-pressed": $, onClick: () => b(!$), children: [
          /* @__PURE__ */ e.jsx(Os, {}),
          " ",
          t($ ? "Done" : "Reorder")
        ] }),
        i.length > 0 && /* @__PURE__ */ e.jsxs(n.DropdownMenu, { children: [
          /* @__PURE__ */ e.jsx(n.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(n.Button, { variant: "outline", children: [
            /* @__PURE__ */ e.jsx(Ya, {}),
            " ",
            t("Columns")
          ] }) }),
          /* @__PURE__ */ e.jsxs(n.DropdownMenuContent, { align: "end", className: "cms:max-h-96 cms:overflow-y-auto", children: [
            /* @__PURE__ */ e.jsx(n.DropdownMenuLabel, { children: t("Columns") }),
            i.filter((k) => !k.field).map((k) => /* @__PURE__ */ e.jsx(
              n.DropdownMenuCheckboxItem,
              {
                checked: c.columns.includes(k.key),
                onSelect: (F) => F.preventDefault(),
                onCheckedChange: () => {
                  Se(k.key);
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
                  onSelect: (F) => F.preventDefault(),
                  onCheckedChange: () => {
                    Se(k.key);
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
    $ && he ? /* @__PURE__ */ e.jsx(xl, { collection: s.handle, rows: l.data, hierarchical: s.hierarchical === !0 }) : /* @__PURE__ */ e.jsxs(n.Card, { className: "cms:gap-0 cms:overflow-hidden cms:py-0", children: [
      /* @__PURE__ */ e.jsxs(n.Table, { children: [
        /* @__PURE__ */ e.jsx(n.TableHeader, { className: "cms:bg-muted/60", children: /* @__PURE__ */ e.jsxs(n.TableRow, { className: "cms:hover:bg-transparent", children: [
          V.length > 0 && /* @__PURE__ */ e.jsx(n.TableHead, { className: "cms:w-10", children: /* @__PURE__ */ e.jsx(
            n.Checkbox,
            {
              "aria-label": t("Select all on this page"),
              checked: l.data.length > 0 && j.length === l.data.length,
              onCheckedChange: (k) => S(k ? l.data.map((F) => F.id) : [])
            }
          ) }),
          /* @__PURE__ */ e.jsx(Ts, { label: t("Title"), sortKey: "title", sort: c.sort, onSort: (k) => L({ sort: k }) }),
          P.map((k) => k.sortable ? /* @__PURE__ */ e.jsx(Ts, { label: k.label, sortKey: k.key, sort: c.sort, onSort: (F) => L({ sort: F }) }, k.key) : /* @__PURE__ */ e.jsx(n.TableHead, { children: k.label }, k.key)),
          ue && /* @__PURE__ */ e.jsx(n.TableHead, { className: "cms:w-px", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: t("Order") }) }),
          I && /* @__PURE__ */ e.jsx(n.TableHead, { className: "cms:w-px", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: t("Restore") }) })
        ] }) }),
        /* @__PURE__ */ e.jsxs(n.TableBody, { children: [
          l.data.length === 0 && /* @__PURE__ */ e.jsx(n.TableRow, { className: "cms:hover:bg-transparent", children: /* @__PURE__ */ e.jsxs(n.TableCell, { colSpan: Ce, className: "cms:h-32 cms:text-center cms:text-muted-foreground", children: [
            /* @__PURE__ */ e.jsx(wl, { trashed: z, filtered: _s(z ? { ...c, status: "" } : c) > 0, canCreate: !!p?.create, createUrl: `${u}/create`, onClear: pe }),
            !z && /* @__PURE__ */ e.jsx("div", { className: "cms:mt-2", children: /* @__PURE__ */ e.jsx(n.TrashHint, { count: g, onShow: () => L({ status: "trashed" }) }) })
          ] }) }),
          l.data.map((k, F) => /* @__PURE__ */ e.jsxs(n.TableRow, { className: z ? "sunrice-row-in cms:text-muted-foreground" : "sunrice-row-in", style: { "--i": F }, "data-state": j.includes(k.id) ? "selected" : void 0, children: [
            V.length > 0 && /* @__PURE__ */ e.jsx(n.TableCell, { children: /* @__PURE__ */ e.jsx(
              n.Checkbox,
              {
                "aria-label": t("Select :title", { title: k.title }),
                checked: j.includes(k.id),
                onCheckedChange: (K) => S(K ? [...j, k.id] : j.filter((X) => X !== k.id))
              }
            ) }),
            /* @__PURE__ */ e.jsxs(n.TableCell, { children: [
              /* @__PURE__ */ e.jsx(
                C.Link,
                {
                  href: A(`cms/collections/${s.handle}/entries/${k.id}/edit${c.locale !== v ? `?locale=${encodeURIComponent(c.locale)}` : ""}`),
                  className: "cms:font-medium cms:underline-offset-4 cms:hover:underline",
                  children: k.title
                }
              ),
              (!c.columns.includes("slug") && k.path || k.parent) && /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: [c.columns.includes("slug") ? null : k.path, k.parent ? t("under :parent", { parent: k.parent }) : null].filter(Boolean).join(" · ") })
            ] }),
            P.map((K) => /* @__PURE__ */ e.jsx(n.TableCell, { className: K.key === "status" ? "" : "cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx("div", { className: "cms:max-w-72 cms:truncate", children: /* @__PURE__ */ e.jsx(Nl, { row: k, column: K }) }) }, K.key)),
            ue && /* @__PURE__ */ e.jsx(n.TableCell, { className: "cms:w-px", children: /* @__PURE__ */ e.jsxs("span", { className: "cms:flex", children: [
              /* @__PURE__ */ e.jsx(n.Button, { variant: "ghost", size: "icon", "aria-label": t("Move :title up", { title: k.title }), onClick: () => C.router.post(A(`cms/entries/${k.id}/move`), { direction: "up" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(Rs, {}) }),
              /* @__PURE__ */ e.jsx(n.Button, { variant: "ghost", size: "icon", "aria-label": t("Move :title down", { title: k.title }), onClick: () => C.router.post(A(`cms/entries/${k.id}/move`), { direction: "down" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(Hs, {}) })
            ] }) }),
            I && /* @__PURE__ */ e.jsx(n.TableCell, { className: "cms:w-px", children: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:justify-end cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs(
                n.Button,
                {
                  variant: "outline",
                  size: "sm",
                  "aria-label": t("Restore :title", { title: k.title }),
                  onClick: () => C.router.post(A(`cms/entries/${k.id}/restore`), {}, { preserveScroll: !0 }),
                  children: [
                    /* @__PURE__ */ e.jsx(je, {}),
                    " ",
                    t("Restore")
                  ]
                }
              ),
              /* @__PURE__ */ e.jsxs(
                n.Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "cms:text-destructive cms:hover:text-destructive",
                  "aria-label": t("Permanently delete :title", { title: k.title }),
                  onClick: () => h(
                    t("Permanently delete :title? This can't be undone.", { title: k.title }),
                    () => C.router.post(`${u}/bulk`, { action: "delete", ids: [k.id] }, { preserveScroll: !0 }),
                    t("Delete")
                  ),
                  children: [
                    /* @__PURE__ */ e.jsx(q, {}),
                    " ",
                    t("Permanently delete")
                  ]
                }
              )
            ] }) })
          ] }, k.id))
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4 cms:border-t cms:px-6 cms:py-3 cms:text-sm cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-4", children: [
          /* @__PURE__ */ e.jsx("span", { children: l.total === 0 ? t("No entries") : t(":from–:to of :total", { from: l.from, to: l.to, total: l.total }) }),
          /* @__PURE__ */ e.jsxs(n.Select, { value: String(c.perPage), onValueChange: (k) => {
            B(Number(k)), L({ perPage: Number(k) });
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
              onClick: () => l.prev_page_url && C.router.get(l.prev_page_url, {}, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(ss, {})
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
              onClick: () => l.next_page_url && C.router.get(l.next_page_url, {}, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(ve, {})
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function Ke({ label: s, value: a, options: l, onChange: c }) {
  return /* @__PURE__ */ e.jsxs(n.Select, { value: a === "" ? qe : a, onValueChange: (i) => c(i === qe ? "" : i), children: [
    /* @__PURE__ */ e.jsx(n.SelectTrigger, { className: "cms:w-auto cms:min-w-40 cms:max-w-72", title: s, "aria-label": s, children: /* @__PURE__ */ e.jsx(n.SelectValue, { placeholder: s }) }),
    /* @__PURE__ */ e.jsxs(n.SelectContent, { children: [
      /* @__PURE__ */ e.jsx(n.SelectItem, { value: qe, children: t(":filter: all", { filter: s }) }),
      l.map((i) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: i.value, children: i.label }, i.value))
    ] })
  ] });
}
function Ts({ label: s, sortKey: a, sort: l, onSort: c }) {
  const i = jl(l, a);
  return /* @__PURE__ */ e.jsx(n.TableHead, { "aria-sort": i === "asc" ? "ascending" : i === "desc" ? "descending" : void 0, children: /* @__PURE__ */ e.jsxs(
    "button",
    {
      type: "button",
      onClick: () => c(fl(l, a)),
      className: "cms:-ml-2 cms:inline-flex cms:h-8 cms:items-center cms:gap-1 cms:rounded-md cms:px-2 cms:hover:bg-accent cms:hover:text-accent-foreground",
      children: [
        s,
        i === "asc" ? /* @__PURE__ */ e.jsx(Rs, { className: "cms:size-3" }) : i === "desc" ? /* @__PURE__ */ e.jsx(Hs, { className: "cms:size-3" }) : /* @__PURE__ */ e.jsx(Os, { className: "cms:size-3 cms:opacity-40" })
      ]
    }
  ) });
}
function Nl({ row: s, column: a }) {
  switch (a.key) {
    case "slug":
      return /* @__PURE__ */ e.jsx("span", { className: "cms:font-mono", children: s.slug });
    case "status":
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-1", children: [
        s.trashed ? /* @__PURE__ */ e.jsx(n.Badge, { variant: "outline", className: "cms:text-destructive", title: t(":status before it was trashed", { status: te(s.status) }), children: t("Trashed") }) : /* @__PURE__ */ e.jsx(n.Badge, { variant: s.status === "published" ? "success" : "secondary", children: te(s.status) }),
        s.locales.length > 1 && s.locales.filter((l) => !l.main).map((l) => {
          const c = kl(l);
          return /* @__PURE__ */ e.jsxs(
            n.Badge,
            {
              variant: c.variant,
              className: c.className,
              title: t(":language: :status", { language: O(l.code), status: c.title }),
              "aria-label": t(":language: :status", { language: O(l.code), status: c.title }),
              children: [
                l.code.toUpperCase(),
                c.word && /* @__PURE__ */ e.jsx("span", { className: "cms:font-normal", children: c.word })
              ]
            },
            l.code
          );
        })
      ] });
    case "author":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: s.author ?? "—" });
    case "published_at":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: U(s.publishedAt) });
    case "updated_at":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: U(s.updatedAt) });
    case "created_at":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: U(s.createdAt) });
    default:
      return /* @__PURE__ */ e.jsx("span", { title: s.cells[a.key] ?? void 0, children: s.cells[a.key] ?? "—" });
  }
}
function kl(s) {
  return s.status === null ? { variant: "outline", className: "cms:border-dashed cms:text-muted-foreground", word: t("missing"), title: t("not translated") } : s.outdated ? { variant: "warning", className: "", word: t("outdated"), title: t(":status, outdated: the main language changed since", { status: te(s.status) }) } : s.status === "published" ? { variant: "secondary", className: "", word: null, title: t("Published") } : { variant: "outline", className: "", word: s.status === "scheduled" ? t("scheduled") : t("draft"), title: te(s.status) };
}
function wl({ trashed: s, filtered: a, canCreate: l, createUrl: c, onClear: i }) {
  return a ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: t("Nothing matches these filters.") }),
    /* @__PURE__ */ e.jsxs(n.Button, { variant: "outline", size: "sm", onClick: i, children: [
      /* @__PURE__ */ e.jsx(Ne, {}),
      " ",
      t("Clear filters")
    ] })
  ] }) : s ? /* @__PURE__ */ e.jsx(e.Fragment, { children: t("The trash is empty.") }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: t("No entries yet.") }),
    l && /* @__PURE__ */ e.jsx(n.Button, { size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs(C.Link, { href: c, children: [
      /* @__PURE__ */ e.jsx(G, {}),
      " ",
      t("Write the first one")
    ] }) })
  ] });
}
function ds({ message: s, processing: a, onSaveMine: l }) {
  const [c, i] = ce();
  return s ? /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: [
    i,
    /* @__PURE__ */ e.jsx("span", { children: s }),
    /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "outline", size: "sm", onClick: () => C.router.reload(), children: t("Load theirs") }),
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
function Sl(s, a, l, c, i) {
  const r = a[0], d = s === r ? c(":language (main)", { language: i(s) }) : i(s), x = a.filter((m) => m !== s).map(i).join(", ");
  return l !== null && !l.includes(s) ? c("Editing: :language, not translated yet", { language: d }) : x === "" ? c("Editing: :language", { language: d }) : c("Editing: :language — switch to edit :others", { language: d, others: x });
}
function ya({ current: s, locales: a, translated: l, onSwitch: c }) {
  if (a.length < 2) return null;
  const i = Sl(s, a, l, t, O);
  return /* @__PURE__ */ e.jsxs("nav", { "aria-label": t("Languages"), className: "cms:flex cms:flex-wrap cms:items-center cms:gap-x-3 cms:gap-y-2", children: [
    /* @__PURE__ */ e.jsx("div", { className: "cms:inline-flex cms:items-center cms:gap-0.5 cms:rounded-md cms:bg-muted cms:p-0.5", children: a.map((r, d) => {
      const x = r === s, m = l === null || l.includes(r), o = d === 0 ? t(":language (main)", { language: O(r) }) : O(r), g = m ? o : t(":language: not translated yet", { language: o });
      return /* @__PURE__ */ e.jsxs(
        "button",
        {
          type: "button",
          title: g,
          "aria-label": g,
          "aria-current": x ? "page" : void 0,
          onClick: () => !x && c(r),
          className: `cms:inline-flex cms:h-7 cms:min-w-10 cms:items-center cms:justify-center cms:gap-1 cms:rounded cms:px-2.5 cms:text-xs cms:font-semibold cms:tracking-wide cms:uppercase cms:transition-colors ${x ? "cms:bg-card cms:text-foreground cms:shadow-xs" : "cms:text-muted-foreground cms:hover:text-foreground"} ${m ? "" : "cms:italic cms:opacity-70"}`,
          children: [
            r,
            m && l !== null && /* @__PURE__ */ e.jsx(fe, { "aria-hidden": !0, className: "cms:size-3 cms:text-emerald-600" })
          ]
        },
        r
      );
    }) }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", "aria-live": "polite", children: i })
  ] });
}
function Cl(s) {
  return /* @__PURE__ */ e.jsx($l, { ...s }, `${s.locale}:${s.version}:${JSON.stringify([s.values, s.seo])}`);
}
function $l({ collection: s, fields: a, locale: l, locales: c, translated: i = [], shared: r, values: d, seo: x, version: m, can: o }) {
  const g = A(`cms/collections/${s.handle}/listing`), p = A(`cms/collections/${s.handle}/entries`);
  n.useBreadcrumbs([{ label: s.title, href: p }, { label: t("Listing page") }]);
  const u = C.useForm({ locale: l, data: d, seo: x ?? {}, version: m }), v = u.errors, y = (b) => {
    const h = Le(v, b);
    h.length > 0 && u.clearErrors(...h);
  }, f = c[0], j = o.update, S = () => u.processing || u.put(g, { preserveScroll: !0 }), $ = () => {
    u.transform((b) => ({ ...b, version: null })), u.put(g, { preserveScroll: !0 });
  };
  return n.useUnsavedChanges(u.isDirty, j ? S : void 0), /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (b) => {
    b.preventDefault(), S();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: t(":title: listing page", { title: s.title }) }),
    /* @__PURE__ */ e.jsx(
      n.PageHeader,
      {
        title: t(":title: listing page", { title: s.title }),
        back: { href: p, label: t("Back to :title", { title: s.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          s.url && /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: s.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(xe, {}),
            " ",
            t("View")
          ] }) }),
          j && /* @__PURE__ */ e.jsxs(n.Button, { type: "submit", disabled: u.processing, children: [
            u.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
            " ",
            t("Save")
          ] })
        ] }),
        children: u.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
      }
    ),
    /* @__PURE__ */ e.jsx(ya, { current: l, locales: c, translated: i, onSwitch: (b) => C.router.get(g, { locale: b }) }),
    /* @__PURE__ */ e.jsxs("fieldset", { disabled: !j, className: "cms:flex cms:flex-col cms:gap-6", children: [
      /* @__PURE__ */ e.jsx(ds, { message: v.version, processing: u.processing, onSaveMine: $ }),
      a.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("The listing page has no fields of its own: choose a listing blueprint for the collection under Structure → Collections.") }) : /* @__PURE__ */ e.jsx(n.Card, { children: /* @__PURE__ */ e.jsxs(n.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: [
        (r.length > 0 || Me(a)) && /* @__PURE__ */ e.jsx("p", { role: "note", className: "cms:rounded-lg cms:border cms:border-dashed cms:px-3 cms:py-2 cms:text-sm cms:text-muted-foreground", children: f ? t("Shared by all languages: the greyed-out fields are edited in :language.", { language: O(f) }) : t("Shared by all languages: the greyed-out fields are edited in the main language.") }),
        a.filter((b) => cs(b, { ...d, ...u.data.data })).map((b) => r.includes(b.handle) ? /* @__PURE__ */ e.jsx("fieldset", { disabled: !0, className: ja, title: t("Shared by all languages"), children: /* @__PURE__ */ e.jsx(ae, { id: `data-${b.handle}`, field: b, content: !0, value: d[b.handle], errors: {}, onChange: () => {
        } }) }, b.handle) : /* @__PURE__ */ e.jsx(
          ae,
          {
            id: `data-${b.handle}`,
            field: b,
            content: !0,
            value: u.data.data[b.handle],
            errors: Y(v, `data.${b.handle}`),
            onChange: (h) => {
              u.setData("data", { ...u.data.data, [b.handle]: h }), y(`data.${b.handle}`);
            }
          },
          b.handle
        ))
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsx(n.CollapsibleCard, { title: t("SEO"), description: t("How the listing page appears in search results and shared links."), titleClassName: "cms:text-base", storageKey: "cms:listing:seo", hasErrors: we(v, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !j, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(de, { bare: !0, id: "seo", fields: is(), value: u.data.seo, errors: Y(v, "seo"), onChange: (b) => {
      u.setData("seo", b), y("seo");
    } }) }) })
  ] });
}
function Dl({ fieldsets: s }) {
  const a = C.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(H, { message: a.fieldset }),
    /* @__PURE__ */ e.jsx(
      ga,
      {
        kind: "fieldset",
        base: A("cms/fieldsets"),
        rows: s,
        intro: t("Fields shared between blueprints, and the kinds of block of flexible fields.")
      }
    )
  ] });
}
function _l(s) {
  return /* @__PURE__ */ e.jsx(Tl, { ...s }, `${s.locale}:${s.version}:${JSON.stringify(s.values)}`);
}
function Tl({ set: s, fields: a, locale: l, locales: c, shared: i, values: r, version: d, can: x, settings: m }) {
  const o = A(`cms/globals/${s.handle}/values`);
  n.useBreadcrumbs([{ label: t("Globals"), href: A("cms/globals") }, { label: s.title }]);
  const g = C.useForm({ locale: l, data: r, version: d }), p = g.errors, u = (b) => {
    const h = Le(p, b);
    h.length > 0 && g.clearErrors(...h);
  }, v = c[0], y = n.useEditLock({
    type: "cms.global",
    id: s.id,
    locale: l,
    enabled: x.update,
    noun: t("global set"),
    leaveTo: A("cms/globals"),
    getUnsaved: () => g.isDirty ? { data: g.data.data } : null
  }), f = x.update && !y.readOnly, j = () => g.processing || g.put(o, { preserveScroll: !0 }), S = () => {
    g.transform((b) => ({ ...b, version: null })), g.put(o, { preserveScroll: !0 });
  }, $ = async (b) => {
    const h = await y.loadKept(b);
    h.data && typeof h.data == "object" && g.setData("data", h.data);
  };
  return n.useUnsavedChanges(g.isDirty && !y.takenOver, f ? j : void 0), /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (b) => {
    b.preventDefault(), j();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: s.title }),
    y.dialogs,
    /* @__PURE__ */ e.jsx(
      n.PageHeader,
      {
        title: s.title,
        menu: m ? [{ label: t("Settings"), href: m, icon: /* @__PURE__ */ e.jsx(ts, {}) }] : [],
        back: { href: A("cms/globals"), label: t("Back to globals") },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          c.length > 1 && /* @__PURE__ */ e.jsxs(n.Select, { value: l, onValueChange: (b) => C.router.get(o, { locale: b }), children: [
            /* @__PURE__ */ e.jsx(n.SelectTrigger, { className: "cms:w-48", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(n.SelectContent, { children: c.map((b, h) => /* @__PURE__ */ e.jsxs(n.SelectItem, { value: b, children: [
              O(b),
              h === 0 ? ` ${t("(main)")}` : ""
            ] }, b)) })
          ] }),
          f && /* @__PURE__ */ e.jsxs(n.Button, { type: "submit", disabled: g.processing, children: [
            g.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
            " ",
            t("Save")
          ] })
        ] }),
        children: g.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
      }
    ),
    a.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("This global set has no fields: choose a blueprint for it in its Settings.") }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(n.ViewingNotice, { by: y.viewingBy, onTakeOver: y.requestTakeOver }),
      v && l !== v && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:bg-muted/40 cms:p-3 cms:text-sm cms:text-muted-foreground", role: "note", children: d === null ? t("Not saved in :language yet: these are the :main values, which the site shows meanwhile. Translate them, then save.", { language: O(l), main: O(v) }) : t("A field left empty shows the :main value on the site.", { main: O(v) }) }),
      /* @__PURE__ */ e.jsx(ds, { message: p.version, processing: g.processing, onSaveMine: S }),
      /* @__PURE__ */ e.jsx(n.KeptEditsNotice, { kept: y.kept, disabled: !f, onLoad: (b) => {
        $(b);
      }, onDiscard: (b) => {
        y.discardKept(b);
      } }),
      /* @__PURE__ */ e.jsx(
        rs,
        {
          disabled: !f,
          fields: a,
          values: g.data.data,
          errors: p,
          storageKey: `cms:global:${s.handle}`,
          shared: i,
          sharedValues: r,
          sharedNote: v ? t("Shared by all languages: the greyed-out fields are edited in :language.", { language: O(v) }) : t("Shared by all languages: the greyed-out fields are edited in the main language."),
          onChange: (b, h) => {
            g.setData("data", { ...g.data.data, [b]: h }), u(`data.${b}`);
          }
        }
      )
    ] })
  ] });
}
let Na = 0;
function ka(s, a = 0) {
  return s.flatMap(({ children: l, ...c }) => [{ ...c, key: `m${++Na}`, depth: a }, ...ka(l ?? [], a + 1)]);
}
function zl(s) {
  const a = [], l = [{ depth: -1, children: a }];
  for (const { key: c, depth: i, ...r } of s) {
    for (; l.length > 1 && l[l.length - 1].depth >= i; ) l.pop();
    const d = { ...r, children: [] };
    l[l.length - 1].children.push(d), l.push({ depth: i, children: d.children });
  }
  return a;
}
function be(s, a) {
  const l = s[a]?.depth ?? 0;
  let c = a + 1;
  for (; c < s.length && s[c].depth > l; ) c++;
  return c;
}
function wa(s, a, l) {
  const c = be(s, a);
  return s.map((i, r) => r >= a && r < c ? { ...i, depth: i.depth + l } : i);
}
function Ml(s, a, l) {
  const c = s[a], i = s[a - 1];
  return !c || !i || c.depth > i.depth || Math.max(...s.slice(a, be(s, a)).map((d) => d.depth)) + 1 > l - 1 ? s : wa(s, a, 1);
}
function Bl(s, a) {
  const l = s[a];
  if (!l || l.depth === 0) return s;
  let c = a - 1;
  for (; c > 0 && s[c].depth >= l.depth; ) c--;
  const i = be(s, a), r = be(s, c), d = wa(s, a, -1).slice(a, i);
  return [...s.slice(0, a), ...s.slice(i, r), ...d, ...s.slice(r)];
}
function Ll(s, a) {
  return [...s.slice(0, a), ...s.slice(be(s, a))];
}
function _e(s) {
  return { key: `m${++Na}`, depth: 0, entry_id: null, term_id: null, collection_id: null, target: null, url: null, labels: {}, new_tab: !1, query: null, ...s };
}
function Al(s) {
  return s.url !== null || s.collection_id !== null && (s.query ?? "").trim() !== "" ? "main" : "title";
}
function Il({ menu: s, items: a, locales: l, limits: c, terms: i, listings: r, can: d, settings: x }) {
  const m = A(`cms/menus/${s.handle}/links`);
  n.useBreadcrumbs([{ label: t("Menus"), href: A("cms/menus") }, { label: s.title }]);
  const [o, g] = _.useState(() => ka(a)), [p, u] = _.useState(null), v = C.useForm({ items: a }), y = v.errors, [f, j] = _.useState(!1), S = l[0] ?? "en", $ = (B) => {
    g(B), j(!0);
  }, b = (B, z) => $(o.map((D, P) => P === B ? { ...D, ...z } : D)), h = () => {
    v.processing || (v.transform(() => ({ items: zl(o).map(Sa) })), v.put(m, { preserveScroll: !0, onSuccess: () => j(!1) }));
  }, M = (B) => {
    B.preventDefault(), h();
  };
  n.useUnsavedChanges(f, d.update ? h : void 0);
  const w = (B) => /* @__PURE__ */ e.jsx(
    n.SortableList,
    {
      items: ne(o, B),
      getId: (z) => o[z].key,
      getLabel: (z) => o[z].labels[S] || o[z].target?.title || o[z].url || "link",
      disabled: !d.update,
      onReorder: (z) => $(os(o, B, z)),
      className: B < 0 ? "cms:gap-1" : "cms:mt-1 cms:gap-1 cms:pl-6",
      children: (z, { handle: D, isOverlay: P }) => {
        const N = o[z];
        return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${P ? "" : "cms:border-border/70"}`, children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2 cms:p-2", children: [
            d.update && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:h-10 cms:shrink-0 cms:items-center", children: /* @__PURE__ */ e.jsx(n.SortableHandle, { ...D, label: t("Move :title", { title: N.labels[S] || N.target?.title || N.url || t("link") }) }) }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
                /* @__PURE__ */ e.jsx(
                  n.Input,
                  {
                    "aria-label": t("Label (:language)", { language: O(S) }),
                    className: "cms:w-full cms:sm:max-w-xs",
                    disabled: !d.update,
                    placeholder: N.target?.title ?? t("Label"),
                    value: N.labels[S] ?? "",
                    onChange: (L) => b(z, { labels: { ...N.labels, [S]: L.target.value } })
                  }
                ),
                /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-32 cms:flex-1 cms:truncate cms:text-sm cms:text-muted-foreground", children: N.url !== null ? N.url : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  N.target ? `${N.target.kind}: ${N.target.title}` : t("Gone"),
                  " ",
                  (!N.target || !N.target.live) && /* @__PURE__ */ e.jsx(n.Badge, { variant: "outline", children: t("Not on the site") })
                ] }) }),
                d.update && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center", children: [
                  /* @__PURE__ */ e.jsxs("label", { className: "cms:mr-2 cms:flex cms:items-center cms:gap-1.5 cms:text-sm", children: [
                    /* @__PURE__ */ e.jsx(n.Checkbox, { checked: N.new_tab, onCheckedChange: (L) => b(z, { new_tab: L }) }),
                    " ",
                    t("New tab")
                  ] }),
                  /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": t("Outdent"), disabled: N.depth === 0, onClick: () => $(Bl(o, z)), children: /* @__PURE__ */ e.jsx(tn, {}) }),
                  /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": t("Indent"), onClick: () => $(Ml(o, z, c.depth)), children: /* @__PURE__ */ e.jsx(an, {}) }),
                  /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": t("Remove, with what's under it"), onClick: () => $(Ll(o, z)), children: /* @__PURE__ */ e.jsx(q, {}) })
                ] })
              ] }),
              N.collection_id !== null && /* @__PURE__ */ e.jsx(
                n.Input,
                {
                  "aria-label": t("Filters"),
                  className: "cms:w-full cms:sm:max-w-md cms:font-mono",
                  disabled: !d.update,
                  placeholder: t("Filters (optional): :example", { example: "filter=value" }),
                  value: N.query ?? "",
                  onChange: (L) => b(z, { query: L.target.value })
                }
              ),
              l.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: l.slice(1).map((L) => /* @__PURE__ */ e.jsx(
                n.Input,
                {
                  "aria-label": t("Label (:language)", { language: O(L) }),
                  className: "cms:w-full cms:sm:max-w-xs",
                  disabled: !d.update,
                  placeholder: Al(N) === "title" ? t(":language: its title there, else as :main", { language: O(L), main: O(S) }) : t(":language: as :main", { language: O(L), main: O(S) }),
                  value: N.labels[L] ?? "",
                  onChange: (V) => b(z, { labels: { ...N.labels, [L]: V.target.value } })
                },
                L
              )) })
            ] })
          ] }),
          !P && ne(o, z).length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:px-2 cms:pb-2", children: w(z) })
        ] });
      }
    }
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: M, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: s.title }),
    /* @__PURE__ */ e.jsx(
      n.PageHeader,
      {
        title: s.title,
        menu: x ? [{ label: t("Settings"), href: x, icon: /* @__PURE__ */ e.jsx(ts, {}) }] : [],
        back: { href: A("cms/menus"), label: t("Back to menus") },
        actions: d.update && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", disabled: o.length >= c.items, onClick: () => u("entry"), children: [
            /* @__PURE__ */ e.jsx(G, {}),
            " ",
            t("Entry")
          ] }),
          i.length > 0 && /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", disabled: o.length >= c.items, onClick: () => u("term"), children: [
            /* @__PURE__ */ e.jsx(un, {}),
            " ",
            t("Term")
          ] }),
          r.length > 0 && /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", disabled: o.length >= c.items, onClick: () => u("listing"), children: [
            /* @__PURE__ */ e.jsx(Nt, {}),
            " ",
            t("Listing")
          ] }),
          /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", disabled: o.length >= c.items, onClick: () => u("url"), children: [
            /* @__PURE__ */ e.jsx(jt, {}),
            " ",
            t("Link")
          ] }),
          /* @__PURE__ */ e.jsxs(n.Button, { type: "submit", disabled: v.processing, children: [
            v.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
            " ",
            t("Save")
          ] })
        ] }),
        children: f && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
      }
    ),
    /* @__PURE__ */ e.jsx(H, { message: y.items }),
    Object.keys(y).some((B) => B.startsWith("items.")) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: t("Some links need fixing: :error", { error: Object.values(y).filter(Boolean)[0] }) }),
    /* @__PURE__ */ e.jsx(n.Card, { className: "cms:p-2", children: o.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:p-4 cms:text-center cms:text-muted-foreground", children: t("No links yet. Add an entry or a link.") }) : w(-1) }),
    /* @__PURE__ */ e.jsx(Pl, { kind: p, terms: i, listings: r, onClose: () => u(null), onAdd: (B) => {
      $([...o, B]), u(null);
    }, main: S })
  ] });
}
function Sa({ target: s, children: a, ...l }) {
  return { ...l, children: a.map(Sa) };
}
const El = () => t("A menu links to entries that already exist: create the page first (Content → Entries), then add it here, or add a web address instead."), Fl = () => ({ entry: t("Link to an entry"), term: t("Link to a term's page"), listing: t("Link to a listing page"), url: t("Link to an address") }), Hl = () => ({
  entry: t("It follows the entry: its title (unless you give a label) and its address in each language. It shows only while the entry is on the site."),
  term: t("The page listing the term's entries, in each language. Its title is the label unless you give one."),
  listing: t("The collection's listing page, in each language, optionally with filters. The collection's title is the label unless you give one."),
  url: t("A web address, a path on this site (/contact), mailto: or tel:.")
});
function Pl({ kind: s, terms: a, listings: l, onClose: c, onAdd: i, main: r }) {
  const [d, x] = _.useState(null), [m, o] = _.useState(""), [g, p] = _.useState(""), [u, v] = _.useState(""), [y, f] = _.useState("");
  _.useEffect(() => {
    x(null), o(""), p(""), v(""), f("");
  }, [s]);
  const j = g.trim() === "" || kn(g.trim()), S = u.trim() ? { [r]: u.trim() } : {}, $ = async () => {
    if (s === "entry" && d !== null) {
      const h = await fetch(`${A("cms/entries/picker")}?${Qt({ ids: [d], collections: [] })}`, { headers: { Accept: "application/json" }, credentials: "same-origin" }), M = h.ok ? (await h.json()).items[0] : void 0;
      i(_e({ entry_id: d, target: M ? { title: M.title, kind: M.collection, live: M.status === "published" } : null, labels: S }));
    } else if (s === "term" && m !== "") {
      const h = a.find((M) => String(M.id) === m);
      i(_e({ term_id: Number(m), target: h ? { title: h.title, kind: h.taxonomy, live: !0 } : null, labels: S }));
    } else if (s === "listing" && m !== "") {
      const h = l.find((M) => String(M.id) === m);
      i(_e({ collection_id: Number(m), target: h ? { title: h.title, kind: t("Listing page"), live: !0 } : null, labels: S, query: y.trim().replace(/^\?/, "") || null }));
    } else s === "url" && g.trim() !== "" && j && u.trim() !== "" && i(_e({ url: g.trim(), labels: S }));
  }, b = s === "entry" ? d !== null : s === "url" ? g.trim() !== "" && j && u.trim() !== "" : m !== "";
  return /* @__PURE__ */ e.jsx(n.Dialog, { open: s !== null, onOpenChange: (h) => !h && c(), children: /* @__PURE__ */ e.jsxs(n.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(n.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(n.DialogTitle, { children: s ? Fl()[s] : "" }),
      /* @__PURE__ */ e.jsx(n.DialogDescription, { children: s ? Hl()[s] : "" })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
      s === "entry" && /* @__PURE__ */ e.jsx(
        ke,
        {
          id: "menu-entry",
          value: d,
          multiple: !1,
          max: null,
          collections: [],
          invalid: !1,
          emptyHint: El(),
          onChange: (h) => x(typeof h == "number" ? h : null)
        }
      ),
      (s === "term" || s === "listing") && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "menu-target", children: t(s === "term" ? "Term" : "Collection") }),
        /* @__PURE__ */ e.jsxs(n.Select, { value: m, onValueChange: o, children: [
          /* @__PURE__ */ e.jsx(n.SelectTrigger, { id: "menu-target", children: /* @__PURE__ */ e.jsx(n.SelectValue, { placeholder: t("Choose…") }) }),
          /* @__PURE__ */ e.jsx(n.SelectContent, { children: s === "term" ? a.map((h) => /* @__PURE__ */ e.jsxs(n.SelectItem, { value: String(h.id), children: [
            h.taxonomy,
            ": ",
            h.title
          ] }, h.id)) : l.map((h) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: String(h.id), children: h.title }, h.id)) })
        ] })
      ] }),
      s === "listing" && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "menu-query", children: t("Filters (optional)") }),
        /* @__PURE__ */ e.jsx(
          n.Input,
          {
            id: "menu-query",
            className: "cms:font-mono",
            value: y,
            placeholder: "filter=value&other=value",
            onChange: (h) => f(h.target.value)
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
            value: g,
            placeholder: t("https://… or /contact"),
            "aria-invalid": !j,
            onChange: (h) => p(h.target.value)
          }
        ),
        !j && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t("This address could run code; use https://, a path, mailto: or tel:.") })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "menu-label", children: t(s === "url" ? "Label" : "Label (optional)") }),
        /* @__PURE__ */ e.jsx(n.Input, { id: "menu-label", value: u, onChange: (h) => v(h.target.value) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(n.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "outline", onClick: c, children: t("Cancel") }),
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", onClick: () => {
        $();
      }, disabled: !b, children: t("Add") })
    ] })
  ] }) });
}
const Ol = () => [
  { value: "all", label: t("All") },
  { value: "pending", label: t("Pending") },
  { value: "approved", label: t("Approved") },
  { value: "spam", label: t("Spam") },
  { value: "trashed", label: t("Trash") }
], Vl = (s) => ({ pending: t("Pending"), approved: t("Approved"), spam: t("Spam") })[s];
function Rl({ tab: s, counts: a, filters: l, collections: c, comments: i, can: r, errors: d = {} }) {
  n.useBreadcrumbs([{ label: t("Comments"), href: A("cms/comments") }]);
  const [x, m] = _.useState(l.search), [o, g] = _.useState([]), [p, u] = _.useState(null), [v, y] = ce(), f = (h) => {
    const M = { status: s, search: l.search, collection: l.collection, ...h };
    C.router.get(A("cms/comments"), {
      ...M.status !== "all" ? { status: M.status } : {},
      ...M.search ? { search: M.search } : {},
      ...M.collection ? { collection: M.collection } : {},
      ...l.entry ? { entry: l.entry } : {}
    }, { preserveState: !0, replace: !0, onSuccess: () => g([]) });
  };
  _.useEffect(() => {
    if (x === l.search) return;
    const h = window.setTimeout(() => f({ search: x }), 300);
    return () => window.clearTimeout(h);
  }, [x]);
  const j = (h, M = {}) => C.router.post(A(h), M, { preserveScroll: !0, onSuccess: () => g([]) }), S = (h, M) => j(`cms/comments/${h.id}/status`, { status: M }), $ = (h) => {
    const M = () => j("cms/comments/bulk", { action: h, ids: o });
    h === "delete" ? v(o.length === 1 ? t("Permanently delete 1 comment? This can't be undone.") : t("Permanently delete :count comments? This can't be undone.", { count: o.length }), M) : M();
  }, b = i.data.length > 0 && o.length === i.data.length;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: t("Comments") }),
    /* @__PURE__ */ e.jsx(n.PageHeader, { title: t("Comments") }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:sm:w-64", children: [
        /* @__PURE__ */ e.jsx(ye, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          n.Input,
          {
            type: "search",
            placeholder: t("Search text, name or email"),
            "aria-label": t("Search comments"),
            className: "cms:pl-9",
            value: x,
            onChange: (h) => m(h.target.value)
          }
        )
      ] }),
      c.length > 1 && /* @__PURE__ */ e.jsxs(n.Select, { value: l.collection ?? "all", onValueChange: (h) => f({ collection: h === "all" ? null : h }), children: [
        /* @__PURE__ */ e.jsx(n.SelectTrigger, { className: "cms:w-48", "aria-label": t("Collection"), children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
        /* @__PURE__ */ e.jsxs(n.SelectContent, { children: [
          /* @__PURE__ */ e.jsx(n.SelectItem, { value: "all", children: t("Every collection") }),
          c.map((h) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: h.handle, children: h.title }, h.handle))
        ] })
      ] })
    ] }),
    l.entry !== null && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      t("Comments on one entry."),
      " ",
      /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:underline cms:underline-offset-4", onClick: () => C.router.get(A("cms/comments")), children: t("Show all") })
    ] }),
    /* @__PURE__ */ e.jsx(n.Tabs, { value: s, onValueChange: (h) => f({ status: h }), children: /* @__PURE__ */ e.jsx(n.TabsList, { className: "cms:h-auto cms:flex-wrap cms:justify-start", children: Ol().map((h) => /* @__PURE__ */ e.jsxs(n.TabsTrigger, { value: h.value, title: h.value === "all" ? t("Everything but the trash") : void 0, children: [
      h.label,
      " ",
      /* @__PURE__ */ e.jsx("span", { className: "cms:ml-1 cms:text-muted-foreground", children: a[h.value] })
    ] }, h.value)) }) }),
    o.length > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2 cms:text-sm", role: "toolbar", "aria-label": t("With the selected comments"), children: [
      /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", children: t(":count selected", { count: o.length }) }),
      r.moderate && s !== "trashed" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "outline", onClick: () => $("approve"), children: [
          /* @__PURE__ */ e.jsx(fe, {}),
          " ",
          t("Approve")
        ] }),
        /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "outline", onClick: () => $("unapprove"), children: [
          /* @__PURE__ */ e.jsx(ze, {}),
          " ",
          t("Unapprove")
        ] }),
        /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "outline", onClick: () => $("spam"), children: [
          /* @__PURE__ */ e.jsx(Ze, {}),
          " ",
          t("Spam")
        ] })
      ] }),
      r.delete && s !== "trashed" && /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "outline", onClick: () => $("trash"), children: [
        /* @__PURE__ */ e.jsx(q, {}),
        " ",
        t("Move to trash")
      ] }),
      r.delete && s === "trashed" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "outline", onClick: () => $("restore"), children: [
          /* @__PURE__ */ e.jsx(je, {}),
          " ",
          t("Restore")
        ] }),
        /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "destructive", onClick: () => $("delete"), children: [
          /* @__PURE__ */ e.jsx(q, {}),
          " ",
          t("Permanently delete")
        ] })
      ] })
    ] }),
    i.data.length === 0 ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:rounded-xl cms:border cms:border-dashed cms:px-6 cms:py-16 cms:text-center", children: [
      /* @__PURE__ */ e.jsx("span", { className: "cms:grid cms:size-10 cms:place-items-center cms:rounded-full cms:bg-muted cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx(nn, { className: "cms:size-4" }) }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: l.search ? t("No comments match.") : t("No comments here.") }),
      s !== "trashed" && /* @__PURE__ */ e.jsx(n.TrashHint, { count: a.trashed ?? 0, onShow: () => f({ status: "trashed" }) })
    ] }) : /* @__PURE__ */ e.jsxs(n.Card, { className: "cms:divide-y cms:p-0", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3 cms:px-4 cms:py-2 cms:text-sm cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsx(n.Checkbox, { checked: b, "aria-label": t("Select all"), onCheckedChange: (h) => g(h ? i.data.map((M) => M.id) : []) }),
        /* @__PURE__ */ e.jsx("span", { children: t(":from–:to of :total", { from: i.from, to: i.to, total: i.total }) })
      ] }),
      i.data.map((h) => /* @__PURE__ */ e.jsxs("article", { className: "cms:flex cms:gap-3 cms:px-4 cms:py-4", "aria-labelledby": `comment-${h.id}-author`, children: [
        /* @__PURE__ */ e.jsx(
          n.Checkbox,
          {
            checked: o.includes(h.id),
            "aria-label": t("Select :author's comment", { author: h.author }),
            onCheckedChange: (M) => g(M ? [...o, h.id] : o.filter((w) => w !== h.id))
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-x-3 cms:gap-y-1 cms:text-sm", children: [
            /* @__PURE__ */ e.jsx("span", { id: `comment-${h.id}-author`, className: "cms:font-medium", children: h.author }),
            h.email && /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", children: h.email }),
            h.member && /* @__PURE__ */ e.jsx(n.Badge, { variant: "outline", children: t("Signed in") }),
            !h.trashed && /* @__PURE__ */ e.jsx(n.Badge, { variant: h.status === "approved" ? "success" : h.status === "spam" ? "destructive" : "warning", children: Vl(h.status) }),
            /* @__PURE__ */ e.jsxs("span", { className: "cms:text-muted-foreground", children: [
              h.createdAt ? U(h.createdAt) : "",
              " · ",
              h.locale.toUpperCase()
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
            t("On"),
            " ",
            h.entry.url ? /* @__PURE__ */ e.jsxs("a", { href: h.entry.url, target: "_blank", rel: "noreferrer", className: "cms:underline-offset-4 hover:cms:underline", children: [
              h.entry.title,
              " ",
              /* @__PURE__ */ e.jsx(xe, { className: "cms:inline cms:size-3" })
            ] }) : h.entry.title,
            h.parent && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              " · ",
              t("replying to :author: “:excerpt”", { author: h.parent.author, excerpt: h.parent.excerpt })
            ] })
          ] }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:whitespace-pre-wrap cms:break-words", children: h.body }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-1", children: [
            r.moderate && !h.trashed && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              h.status !== "approved" && /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "ghost", onClick: () => S(h, "approved"), children: [
                /* @__PURE__ */ e.jsx(fe, {}),
                " ",
                t("Approve")
              ] }),
              h.status === "approved" && /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "ghost", onClick: () => S(h, "pending"), children: [
                /* @__PURE__ */ e.jsx(ze, {}),
                " ",
                t("Unapprove")
              ] }),
              h.status !== "spam" && /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "ghost", onClick: () => S(h, "spam"), children: [
                /* @__PURE__ */ e.jsx(Ze, {}),
                " ",
                t("Spam")
              ] }),
              h.status !== "spam" && /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "ghost", onClick: () => u({ row: h, mode: "reply" }), children: [
                /* @__PURE__ */ e.jsx(St, {}),
                " ",
                t("Reply")
              ] }),
              /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "ghost", onClick: () => u({ row: h, mode: "edit" }), children: [
                /* @__PURE__ */ e.jsx(Tt, {}),
                " ",
                t("Edit")
              ] })
            ] }),
            r.delete && !h.trashed && /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "ghost", onClick: () => C.router.delete(A(`cms/comments/${h.id}`), { preserveScroll: !0 }), children: [
              /* @__PURE__ */ e.jsx(q, {}),
              " ",
              t("Move to trash")
            ] }),
            r.delete && h.trashed && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "ghost", onClick: () => j(`cms/comments/${h.id}/restore`), children: [
                /* @__PURE__ */ e.jsx(je, {}),
                " ",
                t("Restore")
              ] }),
              /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "ghost", onClick: () => v(
                t("Permanently delete this comment? Replies to it stay."),
                () => C.router.delete(A(`cms/comments/${h.id}/force`), { preserveScroll: !0 })
              ), children: [
                /* @__PURE__ */ e.jsx(q, {}),
                " ",
                t("Permanently delete")
              ] })
            ] })
          ] })
        ] })
      ] }, h.id))
    ] }),
    (i.prev_page_url || i.next_page_url) && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:justify-end cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(n.Button, { variant: "outline", size: "sm", disabled: !i.prev_page_url, onClick: () => i.prev_page_url && C.router.get(i.prev_page_url), children: [
        /* @__PURE__ */ e.jsx(ss, {}),
        " ",
        t("Newer")
      ] }),
      /* @__PURE__ */ e.jsxs(n.Button, { variant: "outline", size: "sm", disabled: !i.next_page_url, onClick: () => i.next_page_url && C.router.get(i.next_page_url), children: [
        t("Older"),
        " ",
        /* @__PURE__ */ e.jsx(ve, {})
      ] })
    ] }),
    p && /* @__PURE__ */ e.jsx(Ul, { row: p.row, mode: p.mode, error: d.body, onClose: () => u(null) }, `${p.mode}-${p.row.id}`),
    y
  ] });
}
function Ul({ row: s, mode: a, error: l, onClose: c }) {
  const [i, r] = _.useState(a === "edit" ? s.body : ""), [d, x] = _.useState(!1), m = () => {
    x(!0);
    const o = { preserveScroll: !0, onSuccess: c, onFinish: () => x(!1) };
    a === "reply" ? C.router.post(A(`cms/comments/${s.id}/reply`), { body: i }, o) : C.router.put(A(`cms/comments/${s.id}`), { body: i }, o);
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
    /* @__PURE__ */ e.jsx(H, { message: l }),
    /* @__PURE__ */ e.jsxs(n.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "outline", onClick: c, children: t("Cancel") }),
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", disabled: i.trim() === "" || d, onClick: m, children: t(a === "reply" ? "Post reply" : "Save") })
    ] })
  ] }) });
}
const ql = () => [
  { role: "title", label: t("Meta title"), automatic: t("Automatic (the title)") },
  { role: "description", label: t("Meta description"), automatic: t("Automatic (nothing)") },
  { role: "image", label: t("Share image"), automatic: t("Automatic (nothing)") }
], We = "__auto";
function Kl({ site: s, siteName: a, collections: l, taxonomies: c, settingsNav: i }) {
  n.useBreadcrumbs([{ label: t("Settings"), href: A("settings") }, { label: t("SEO") }]);
  const r = [...l ?? [], ...c ?? []], d = C.useForm({
    site: { ...s },
    mappings: r.map((u) => ({ kind: u.kind, id: u.id, title: u.chosen.title ?? "", description: u.chosen.description ?? "", image: u.chosen.image ?? "" }))
  }), x = d.errors, m = () => d.put(A("cms/seo"), { preserveScroll: !0, onSuccess: () => d.setDefaults() });
  n.useUnsavedChanges(d.isDirty, m);
  const o = (u, v) => d.setData("site", { ...d.data.site, [u]: v }), g = (u, v, y) => d.setData("mappings", d.data.mappings.map((f, j) => j === u ? { ...f, [v]: y } : f)), p = (u, v, y, f, j) => /* @__PURE__ */ e.jsxs(n.CollapsibleCard, { title: v, description: y, titleClassName: "cms:text-base", storageKey: `cms:seo:${u}`, contentClassName: "cms:flex cms:flex-col cms:divide-y cms:divide-border/60", children: [
    f.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("None yet.") }),
    f.map((S, $) => {
      const b = j + $;
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3 cms:py-4 cms:first:pt-0 cms:last:pb-0", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:justify-between cms:gap-3", children: [
          /* @__PURE__ */ e.jsx("h3", { className: "cms:font-medium", children: S.title }),
          /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: S.blueprint ? t("Blueprint: :name", { name: S.blueprint }) : t("No blueprint") })
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-3 cms:sm:grid-cols-3", children: ql().map(({ role: h, label: M, automatic: w }) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-1.5", children: [
          /* @__PURE__ */ e.jsx(n.Label, { htmlFor: `seo-${b}-${h}`, className: "cms:text-xs", children: M }),
          /* @__PURE__ */ e.jsxs(n.Select, { value: d.data.mappings[b]?.[h] || We, onValueChange: (B) => g(b, h, B === We ? "" : B), children: [
            /* @__PURE__ */ e.jsx(n.SelectTrigger, { id: `seo-${b}-${h}`, className: "cms:w-full", children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(n.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(n.SelectItem, { value: We, children: w }),
              S.options[h].map((B) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: B.value, children: B.label }, B.value))
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(H, { message: x[`mappings.${b}.${h}`] })
        ] }, h)) })
      ] }, `${S.kind}-${S.id}`);
    })
  ] });
  return /* @__PURE__ */ e.jsx(n.SettingsLayout, { items: i, current: "cms-seo", children: /* @__PURE__ */ e.jsxs("form", { onSubmit: (u) => {
    u.preventDefault(), m();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: t("SEO") }),
    /* @__PURE__ */ e.jsx(
      n.PageHeader,
      {
        title: t("SEO"),
        description: t("What search engines and shared links see of the site."),
        actions: /* @__PURE__ */ e.jsx(n.Button, { type: "submit", disabled: d.processing, children: t("Save") })
      }
    ),
    /* @__PURE__ */ e.jsxs(n.CollapsibleCard, { title: t("Search engines and sharing"), titleClassName: "cms:text-base", storageKey: "cms:seo:site", contentClassName: "cms:flex cms:flex-col cms:gap-5", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(n.Switch, { id: "seo-noindex", checked: d.data.site.noindex, onCheckedChange: (u) => o("noindex", u) }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-0.5", children: [
          /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "seo-noindex", children: t("Hide the whole site from search engines") }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t("Every page asks not to be indexed and the sitemap is empty. For a site still being built, or staging.") })
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-start cms:justify-between cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-3", children: [
          /* @__PURE__ */ e.jsx(n.Switch, { id: "seo-append", checked: d.data.site.appendName, onCheckedChange: (u) => o("appendName", u) }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-0.5", children: [
            /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "seo-append", children: t("Add the site name to page titles") }),
            /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t('The browser tab and search results show ":example". Share previews keep the bare title.', { example: `${t("About")} ${d.data.site.separator || "|"} ${a}` }) })
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
              disabled: !d.data.site.appendName,
              value: d.data.site.separator,
              onChange: (u) => o("separator", u.target.value)
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
            value: d.data.site.twitter,
            onChange: (u) => o("twitter", u.target.value)
          }
        ),
        /* @__PURE__ */ e.jsx(H, { message: x["site.twitter"] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "seo-image", children: t("Default share image") }),
        /* @__PURE__ */ e.jsx(
          n.MediaPickerInput,
          {
            id: "seo-image",
            invalid: x["site.image"] !== void 0,
            disabled: !1,
            multiple: !1,
            max: null,
            types: ["image"],
            value: d.data.site.image,
            onChange: (u) => o("image", typeof u == "number" ? u : null)
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t("Shown when a page is shared and has no image of its own.") }),
        /* @__PURE__ */ e.jsx(H, { message: x["site.image"] })
      ] })
    ] }),
    r.length > 0 && /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx("h2", { className: "cms:text-base cms:font-medium", children: t("Fields used for SEO") }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("When an entry or term leaves its meta title, description or share image empty, the site uses one of its fields instead. A page's own SEO fields always win; after the field come the site's (the description in Settings → Site, the share image above).") })
    ] }),
    l !== null && p("Collections", t("Collections"), t("Entries of each collection."), l, 0),
    c !== null && p("Taxonomies", t("Taxonomies"), t("Term pages of each taxonomy."), c, l?.length ?? 0),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t("Meta title: a text field. Meta description: a text or textarea field, cut to 300 characters. Share image: the first image of a media field.") })
  ] }) });
}
const Wl = 3;
function Gl({ form: s, forms: a, submissions: l, can: c, createForm: i = null }) {
  n.useBreadcrumbs([{ label: t("Submissions"), href: A("cms/submissions") }, ...s ? [{ label: s.title }] : []]);
  const [r, d] = _.useState(null), [x, m] = ce();
  if (!s || !l)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(C.Head, { title: t("Submissions") }),
      /* @__PURE__ */ e.jsx(n.PageHeader, { title: t("Submissions"), description: t("What visitors send through the site's forms.") }),
      /* @__PURE__ */ e.jsxs(n.Card, { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:px-6 cms:py-14 cms:text-center", children: [
        /* @__PURE__ */ e.jsx(sn, { className: "cms:size-8 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
          /* @__PURE__ */ e.jsx("p", { className: "cms:font-medium", children: t("No forms yet") }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:max-w-sm cms:text-sm cms:text-muted-foreground", children: t(i ? "Create a form, put it on a page, and what visitors send shows up here." : "Once someone creates a form and puts it on a page, what visitors send shows up here.") })
        ] }),
        i && /* @__PURE__ */ e.jsx(n.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(C.Link, { href: i, children: [
          /* @__PURE__ */ e.jsx(G, {}),
          " ",
          t("Create a form")
        ] }) })
      ] })
    ] });
  const o = (l.data[0]?.rows ?? []).slice(0, Wl), g = (p) => x(
    t("Permanently delete this submission? It can't be restored."),
    () => C.router.delete(A(`cms/submissions/${p.id}`), { preserveScroll: !0, onSuccess: () => d(null) })
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: t(":form submissions", { form: s.title }) }),
    /* @__PURE__ */ e.jsx(
      n.PageHeader,
      {
        title: s.title,
        menu: l.total > 0 && c.export ? [{ label: t("Export CSV"), href: A(`cms/forms/${s.handle}/submissions/export`), download: !0, icon: /* @__PURE__ */ e.jsx(nt, {}) }] : [],
        children: a.length > 1 && /* @__PURE__ */ e.jsxs(n.Select, { value: s.handle, onValueChange: (p) => C.router.get(A(`cms/forms/${p}/submissions`)), children: [
          /* @__PURE__ */ e.jsx(n.SelectTrigger, { className: "cms:w-56", "aria-label": t("Form"), children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(n.SelectContent, { children: a.map((p) => /* @__PURE__ */ e.jsxs(n.SelectItem, { value: p.handle, children: [
            p.title,
            " (",
            p.count,
            ")"
          ] }, p.handle)) })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(n.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(n.Table, { children: [
      /* @__PURE__ */ e.jsx(n.TableHeader, { children: /* @__PURE__ */ e.jsxs(n.TableRow, { children: [
        /* @__PURE__ */ e.jsx(n.TableHead, { children: t("Sent") }),
        o.map((p) => /* @__PURE__ */ e.jsx(n.TableHead, { children: p.label }, p.handle))
      ] }) }),
      /* @__PURE__ */ e.jsxs(n.TableBody, { children: [
        l.data.length === 0 && /* @__PURE__ */ e.jsx(n.TableRow, { children: /* @__PURE__ */ e.jsx(n.TableCell, { colSpan: o.length + 1, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: t("Nothing sent yet.") }) }),
        l.data.map((p) => /* @__PURE__ */ e.jsxs(n.TableRow, { children: [
          /* @__PURE__ */ e.jsx(n.TableCell, { className: "cms:whitespace-nowrap", children: /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:font-medium cms:hover:underline", onClick: () => d(p), children: U(p.createdAt) }) }),
          o.map((u) => /* @__PURE__ */ e.jsx(n.TableCell, { className: "cms:max-w-64 cms:truncate", children: p.rows.find((v) => v.handle === u.handle)?.value }, u.handle))
        ] }, p.id))
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
            onClick: () => l.prev_page_url && C.router.get(l.prev_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(ss, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          n.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": t("Next page"),
            disabled: !l.next_page_url,
            onClick: () => l.next_page_url && C.router.get(l.next_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(ve, {})
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(n.Dialog, { open: r !== null, onOpenChange: (p) => !p && d(null), children: /* @__PURE__ */ e.jsxs(n.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto", children: [
      /* @__PURE__ */ e.jsxs(n.DialogHeader, { children: [
        /* @__PURE__ */ e.jsx(n.DialogTitle, { children: s.title }),
        /* @__PURE__ */ e.jsxs(n.DialogDescription, { children: [
          t("Sent :date", { date: U(r?.createdAt ?? null) }),
          " · ",
          r?.locale.toUpperCase()
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-3 cms:text-sm", children: r?.rows.map((p) => /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: p.label }),
        /* @__PURE__ */ e.jsx("dd", { className: "cms:whitespace-pre-wrap cms:break-words cms:text-muted-foreground", children: p.files && p.files.length > 0 ? /* @__PURE__ */ e.jsx("ul", { className: "cms:flex cms:flex-col cms:gap-1", children: p.files.map((u) => /* @__PURE__ */ e.jsx("li", { children: /* @__PURE__ */ e.jsx("a", { href: u.url, className: "cms:underline cms:underline-offset-4 hover:cms:text-foreground", download: !0, children: u.name }) }, u.url)) }) : p.file ? /* @__PURE__ */ e.jsx("a", { href: p.file, className: "cms:underline cms:underline-offset-4 hover:cms:text-foreground", download: !0, children: p.value }) : p.value || "—" })
      ] }, p.handle)) }),
      r && (r.visitor.ip || r.visitor.userAgent || r.visitor.referrer) && /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-3 cms:border-t cms:pt-3 cms:text-sm", children: [[t("IP address"), r.visitor.ip], [t("Browser"), r.visitor.userAgent], [t("Sent from"), r.visitor.referrer]].map(([p, u]) => u && /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: p }),
        /* @__PURE__ */ e.jsx("dd", { className: "cms:break-all cms:text-muted-foreground", children: u })
      ] }, p)) }),
      c.delete && r && /* @__PURE__ */ e.jsx(n.DialogFooter, { children: /* @__PURE__ */ e.jsxs(n.Button, { variant: "destructive", onClick: () => g(r), children: [
        /* @__PURE__ */ e.jsx(q, {}),
        " ",
        t("Delete")
      ] }) })
    ] }) }),
    m
  ] });
}
const Ge = "__top";
function Yl(s) {
  return /* @__PURE__ */ e.jsx(Jl, { ...s }, `${s.term?.id ?? "new"}:${s.locale}:${s.version}:${JSON.stringify([s.values, s.seo, s.term?.template, s.parentId])}`);
}
function Jl({ taxonomy: s, term: a, parentId: l = null, terms: c = [], translated: i, fields: r, locale: d, locales: x, shared: m, sharedValues: o, values: g, seo: p, version: u, usedBy: v = [], redirectsUrl: y = null, templates: f = null }) {
  const j = A(`cms/taxonomies/${s.handle}/terms`), S = a ? A(`cms/terms/${a.id}/content`) : j, $ = a ? a.title : t("New term");
  n.useBreadcrumbs([{ label: s.title, href: `${j}?locale=${d}` }, { label: $ }]);
  const b = C.useForm({
    locale: d,
    title: a?.ownTitle ?? "",
    slug: a?.slug ?? "",
    parent_id: l,
    data: g,
    seo: p ?? {},
    template: a?.template ?? "",
    version: u
  }), h = b.errors, M = (N) => {
    const L = Le(h, N);
    L.length > 0 && b.clearErrors(...L);
  }, w = () => b.processing || (a ? b.put(S, { preserveScroll: !0 }) : b.post(S)), B = () => {
    b.transform((N) => ({ ...N, version: null })), b.put(S, { preserveScroll: !0 });
  }, z = n.useEditLock({
    type: "cms.term",
    id: a?.id,
    locale: d,
    enabled: a !== null && i,
    noun: t("term"),
    leaveTo: `${j}?locale=${d}`,
    getUnsaved: () => b.isDirty ? { data: b.data.data, seo: b.data.seo, template: b.data.template } : null
  }), D = !z.readOnly, P = async (N) => {
    const L = await z.loadKept(N);
    b.setData((V) => ({
      ...V,
      data: L.data && typeof L.data == "object" ? L.data : V.data,
      seo: L.seo && typeof L.seo == "object" ? L.seo : V.seo,
      template: typeof L.template == "string" ? L.template : V.template
    }));
  };
  return n.useUnsavedChanges(b.isDirty && !z.takenOver, D ? w : void 0), /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (N) => {
    N.preventDefault(), w();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: a ? a.title : t("New term · :taxonomy", { taxonomy: s.title }) }),
    z.dialogs,
    /* @__PURE__ */ e.jsx(
      n.PageHeader,
      {
        title: $,
        back: { href: `${j}?locale=${d}`, label: t("Back to :title", { title: s.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          a?.url && /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: a.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(xe, {}),
            " ",
            t("View page")
          ] }) }),
          D && /* @__PURE__ */ e.jsxs(n.Button, { type: "submit", disabled: b.processing, children: [
            b.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
            " ",
            t(a ? "Save" : "Create term")
          ] })
        ] }),
        children: b.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:items-start cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_20rem]", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(
          ya,
          {
            current: d,
            locales: x,
            translated: a ? a.translatedIn ?? null : [d],
            onSwitch: (N) => C.router.get(a ? `${j}/${a.id}/edit` : `${j}/create`, { locale: N, ...a === null && b.data.parent_id !== null ? { parent: b.data.parent_id } : {} })
          }
        ),
        /* @__PURE__ */ e.jsx(n.ViewingNotice, { by: z.viewingBy, onTakeOver: z.requestTakeOver }),
        a === null && x.length > 1 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("In :language. Translate it here afterwards: switch the language and give it a title there.", { language: O(d) }) }),
        !i && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:bg-muted/40 cms:p-3 cms:text-sm cms:text-muted-foreground", role: "note", children: t("Not in :language yet: the site shows the :main term meanwhile. Give it a title in :language and save to add it.", { language: O(d), main: O(x[0] ?? "en") }) }),
        /* @__PURE__ */ e.jsxs("fieldset", { disabled: !D, className: "cms:grid cms:min-w-0 cms:gap-4 cms:sm:grid-cols-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "term-title", children: t("Title") }),
            /* @__PURE__ */ e.jsx(
              n.Input,
              {
                id: "term-title",
                value: b.data.title,
                required: !0,
                autoFocus: a === null,
                placeholder: a?.mainTitle ?? "",
                maxLength: 255,
                "aria-invalid": h.title !== void 0,
                onChange: (N) => {
                  b.setData("title", N.target.value), M("title");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(H, { message: h.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "term-slug", children: t("Slug") }),
            /* @__PURE__ */ e.jsx(
              n.Input,
              {
                id: "term-slug",
                className: "cms:font-mono",
                value: b.data.slug,
                placeholder: t("Made from the title"),
                maxLength: 200,
                "aria-invalid": h.slug !== void 0,
                onChange: (N) => {
                  b.setData("slug", N.target.value), M("slug");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(ba, { note: Is(a?.hasPage ? a.slug : null, b.data.slug, !1), redirectsUrl: y }),
            /* @__PURE__ */ e.jsx(H, { message: h.slug })
          ] }),
          s.hierarchical && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:sm:col-span-2", children: [
            /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "term-parent", children: t("Under") }),
            /* @__PURE__ */ e.jsxs(
              n.Select,
              {
                value: b.data.parent_id === null ? Ge : String(b.data.parent_id),
                onValueChange: (N) => {
                  b.setData("parent_id", N === Ge ? null : Number(N)), M("parent_id");
                },
                children: [
                  /* @__PURE__ */ e.jsx(n.SelectTrigger, { id: "term-parent", className: "cms:sm:w-1/2", "aria-invalid": h.parent_id !== void 0, children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
                  /* @__PURE__ */ e.jsxs(n.SelectContent, { children: [
                    /* @__PURE__ */ e.jsx(n.SelectItem, { value: Ge, children: t("Top level") }),
                    c.map((N) => /* @__PURE__ */ e.jsxs(n.SelectItem, { value: String(N.id), children: [
                      "— ".repeat(N.depth),
                      N.title
                    ] }, N.id))
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ e.jsx(H, { message: h.parent_id })
          ] })
        ] }),
        /* @__PURE__ */ e.jsx(n.KeptEditsNotice, { kept: z.kept, disabled: !D, onLoad: (N) => {
          P(N);
        }, onDiscard: (N) => {
          z.discardKept(N);
        } }),
        /* @__PURE__ */ e.jsx(ds, { message: h.version, processing: b.processing, onSaveMine: B }),
        /* @__PURE__ */ e.jsx(
          rs,
          {
            disabled: !D,
            fields: r,
            values: b.data.data,
            errors: h,
            storageKey: `cms:term:${s.handle}`,
            shared: m,
            sharedValues: o,
            sharedNote: t("Shared by all languages: the greyed-out fields are edited in :language.", { language: O(x[0] ?? "en") }),
            onChange: (N, L) => {
              b.setData("data", { ...b.data.data, [N]: L }), M(`data.${N}`);
            }
          }
        ),
        /* @__PURE__ */ e.jsx(n.CollapsibleCard, { title: t("SEO"), description: t("How this term's page appears in search results and shared links."), titleClassName: "cms:text-base", storageKey: "cms:term:seo", hasErrors: we(h, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !D, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(de, { bare: !0, id: "seo", fields: is(), value: b.data.seo, errors: Y(h, "seo"), onChange: (N) => {
          b.setData("seo", N), M("seo");
        } }) }) })
      ] }),
      /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(
          n.CollapsibleCard,
          {
            title: t("Page settings"),
            titleClassName: "cms:text-base",
            storageKey: "cms:term:page-settings",
            hasErrors: h.template !== void 0,
            contentClassName: "cms:flex cms:flex-col cms:gap-2",
            children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: !D, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: [
              /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "template", children: t("Template") }),
              /* @__PURE__ */ e.jsx(
                n.Input,
                {
                  id: "template",
                  className: "cms:font-mono",
                  placeholder: `cms.${s.handle}-special`,
                  value: b.data.template,
                  onChange: (N) => b.setData("template", N.target.value),
                  "aria-invalid": h.template !== void 0
                }
              ),
              /* @__PURE__ */ e.jsx(fa, { example: `cms.${s.handle}-special`, empty: t("Leave empty to use the taxonomy's template."), value: b.data.template, lookup: f }),
              /* @__PURE__ */ e.jsx(H, { message: h.template })
            ] })
          }
        ),
        a && /* @__PURE__ */ e.jsxs(n.CollapsibleCard, { title: t("Used by"), titleClassName: "cms:text-base", storageKey: "cms:term:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          v.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("No content links here through its fields.") }),
          v.map((N) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:gap-2", children: [
            N.url ? /* @__PURE__ */ e.jsx("a", { href: N.url, className: "cms:truncate cms:underline-offset-4 cms:hover:underline", children: N.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:truncate", children: N.label }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", title: N.field, children: N.fieldLabel ?? N.field })
          ] }, `${N.label}:${N.field}`))
        ] })
      ] })
    ] })
  ] });
}
function zs(s = []) {
  if (s.length === 0) return "";
  const a = s.slice(0, 5).join("; ");
  return ` ${s.length > 5 ? t("It's used by :list and :count more.", { list: a, count: s.length - 5 }) : t("It's used by :list.", { list: a })}`;
}
function Ql({ taxonomy: s, taxonomies: a, terms: l, locales: c, locale: i, trashed: r = !1, trashedCount: d = 0 }) {
  n.useBreadcrumbs([{ label: s ? s.title : t("Terms") }]);
  const [x, m] = ce(), [o, g] = _.useState(""), [p, u] = _.useState(l);
  if (_.useEffect(() => u(l), [l]), !s)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(C.Head, { title: t("Terms") }),
      /* @__PURE__ */ e.jsx(n.PageHeader, { title: t("Terms"), description: t("There are no taxonomies yet. Create one under Structure → Taxonomies (categories, tags…), then add its terms here.") })
    ] });
  const v = A(`cms/taxonomies/${s.handle}/terms`), y = (w) => A(`cms/taxonomies/${s.handle}/terms/${w.id}/edit`) + `?locale=${encodeURIComponent(i)}`, f = (w, B) => {
    const z = B.map((D) => p[D].id);
    u(os(p, w, B)), C.router.post(
      A("cms/terms/reorder"),
      { taxonomy: s.handle, ids: z, parent_id: w < 0 ? null : p[w].id },
      { preserveScroll: !0, preserveState: !0, onError: () => u(l) }
    );
  }, j = (w) => x(
    t('Move ":title" to the trash, with the terms under it? It comes off the site; you can restore it.', { title: w.fallback }) + zs(w.usedBy),
    () => C.router.delete(A(`cms/terms/${w.id}`), { preserveScroll: !0 }),
    t("Move to trash")
  ), S = o.trim().toLowerCase(), $ = S === "" ? null : p.filter((w) => `${w.title ?? w.fallback} ${w.slug ?? ""}`.toLowerCase().includes(S)), b = s.collections ?? [], h = (w, B, z) => /* @__PURE__ */ e.jsxs("div", { className: `${Ms} cms:border-t cms:border-border/60 cms:px-3 cms:py-2`, children: [
    /* @__PURE__ */ e.jsx("span", { className: "cms:flex cms:justify-center", children: B && !r && /* @__PURE__ */ e.jsx(n.SortableHandle, { ...B, label: t("Move :title", { title: w.fallback }) }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-2", style: { paddingLeft: z * 20 }, children: [
      z > 0 && /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", "aria-hidden": !0, children: "└" }),
      r ? /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: w.title ?? w.fallback }) : (
        // The term's editor, in the language shown (untranslated: give it a title there to add it).
        /* @__PURE__ */ e.jsx(C.Link, { href: y(w), className: "cms:truncate cms:text-left cms:font-medium cms:underline-offset-4 cms:hover:underline", children: w.title ?? /* @__PURE__ */ e.jsx("span", { className: "cms:font-normal cms:text-muted-foreground cms:italic", children: t(":title · not translated", { title: w.fallback }) }) })
      ),
      w.url && /* @__PURE__ */ e.jsx("a", { href: w.url, target: "_blank", rel: "noopener noreferrer", className: "cms:text-muted-foreground cms:hover:text-foreground", "aria-label": t("View page"), title: t("View page"), children: /* @__PURE__ */ e.jsx(xe, { className: "cms:size-3.5" }) })
    ] }),
    /* @__PURE__ */ e.jsx("code", { className: "cms:hidden cms:truncate cms:text-xs cms:text-muted-foreground cms:md:block", children: w.slug ?? "—" }),
    /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:text-sm cms:text-muted-foreground cms:tabular-nums cms:md:block", children: w.entries ?? 0 }),
    /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:text-sm cms:text-muted-foreground cms:md:block", children: Zl(w.createdAt) }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:justify-end", children: r ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-1", children: [
      /* @__PURE__ */ e.jsxs(n.Button, { variant: "outline", size: "sm", onClick: () => C.router.post(A(`cms/terms/${w.id}/restore`), {}, { preserveScroll: !0 }), children: [
        /* @__PURE__ */ e.jsx(je, {}),
        " ",
        t("Restore")
      ] }),
      /* @__PURE__ */ e.jsxs(
        n.Button,
        {
          variant: "ghost",
          size: "sm",
          className: "cms:text-destructive",
          onClick: () => x(
            t('Permanently delete ":title" in every language? Entries lose it.', { title: w.fallback }) + zs(w.usedBy),
            () => C.router.delete(A(`cms/terms/${w.id}/force`), { preserveScroll: !0, data: (w.usedBy ?? []).length > 0 ? { force: 1 } : {} })
          ),
          children: [
            /* @__PURE__ */ e.jsx(q, {}),
            " ",
            t("Permanently delete")
          ]
        }
      )
    ] }) : /* @__PURE__ */ e.jsxs(n.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(n.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(n.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": t("Actions for :title", { title: w.fallback }), children: /* @__PURE__ */ e.jsx(ct, {}) }) }),
      /* @__PURE__ */ e.jsxs(n.DropdownMenuContent, { align: "end", children: [
        /* @__PURE__ */ e.jsx(n.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(C.Link, { href: y(w), children: [
          /* @__PURE__ */ e.jsx(Tt, {}),
          " ",
          t("Edit")
        ] }) }),
        s.hierarchical && w.title !== null && /* @__PURE__ */ e.jsx(n.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(C.Link, { href: `${v}/create?locale=${encodeURIComponent(i)}&parent=${w.id}`, children: [
          /* @__PURE__ */ e.jsx(G, {}),
          " ",
          t("Add a term under it")
        ] }) }),
        /* @__PURE__ */ e.jsx(n.DropdownMenuSeparator, {}),
        /* @__PURE__ */ e.jsxs(n.DropdownMenuItem, { className: "cms:text-destructive", onSelect: () => j(w), children: [
          /* @__PURE__ */ e.jsx(q, {}),
          " ",
          t("Move to trash")
        ] })
      ] })
    ] }) })
  ] }), M = (w) => /* @__PURE__ */ e.jsx(n.SortableList, { items: ne(p, w), getId: (B) => p[B].id, getLabel: (B) => p[B].title ?? p[B].fallback, disabled: r, onReorder: (B) => f(w, B), className: "cms:gap-0", children: (B, { handle: z, isOverlay: D }) => /* @__PURE__ */ e.jsxs("div", { className: D ? "cms:rounded-md cms:bg-card cms:shadow-md" : "", children: [
    h(p[B], z, p[B].depth),
    !D && !r && ne(p, B).length > 0 && M(B)
  ] }) });
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: s.title }),
    m,
    /* @__PURE__ */ e.jsx(
      n.PageHeader,
      {
        title: r ? /* @__PURE__ */ e.jsx(n.TrashTitle, { children: s.title }) : s.title,
        primary: !r && /* @__PURE__ */ e.jsx(n.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(C.Link, { href: `${v}/create?locale=${encodeURIComponent(i)}`, children: [
          /* @__PURE__ */ e.jsx(G, {}),
          " ",
          t("New term")
        ] }) }),
        menu: [
          ...b.map((w) => ({ label: w.title, href: w.url, group: t("Used by collections") })),
          ...s.settings ? [{ label: t("Taxonomy settings"), href: s.settings, icon: /* @__PURE__ */ e.jsx(ts, {}), group: t("Structure") }] : [],
          ...s.blueprint ? [{ label: t("Edit blueprint"), href: s.blueprint, icon: /* @__PURE__ */ e.jsx(gt, {}), group: t("Structure") }] : []
        ],
        children: a.length > 1 && /* @__PURE__ */ e.jsxs(n.Select, { value: s.handle, onValueChange: (w) => C.router.get(A(`cms/taxonomies/${w}/terms`)), children: [
          /* @__PURE__ */ e.jsx(n.SelectTrigger, { className: "cms:w-48", "aria-label": t("Taxonomy"), children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(n.SelectContent, { children: a.map((w) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: w.handle, children: w.title }, w.handle)) })
        ] })
      }
    ),
    r && /* @__PURE__ */ e.jsx(n.TrashBanner, { items: t("terms"), onBack: () => C.router.get(v, { locale: i }), backLabel: t("Back to terms") }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-xs", children: [
        /* @__PURE__ */ e.jsx(ye, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          n.Input,
          {
            className: "cms:pl-9",
            placeholder: t("Search terms…"),
            "aria-label": t("Search terms"),
            value: o,
            onChange: (w) => g(w.target.value)
          }
        )
      ] }),
      c.length > 1 && /* @__PURE__ */ e.jsxs(n.Select, { value: i, onValueChange: (w) => C.router.get(v, { locale: w, ...r ? { status: "trashed" } : {} }), children: [
        /* @__PURE__ */ e.jsx(n.SelectTrigger, { className: "cms:w-40", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(n.SelectContent, { children: c.map((w) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: w, children: O(w) }, w)) })
      ] }),
      !r && /* @__PURE__ */ e.jsxs(n.Button, { variant: "ghost", className: "cms:ml-auto cms:order-last", onClick: () => C.router.get(v, { locale: i, status: "trashed" }), children: [
        /* @__PURE__ */ e.jsx(q, {}),
        " ",
        t("Trash")
      ] }),
      !r && p.length > 1 && !$ && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s.hierarchical ? t("Drag terms to set their order; a term's parent is set in its editor (Under).") : t("Drag terms to set their order.") })
    ] }),
    /* @__PURE__ */ e.jsxs(n.Card, { className: "cms:gap-0 cms:overflow-hidden cms:py-0", children: [
      /* @__PURE__ */ e.jsxs("div", { className: `${Ms} cms:bg-muted/60 cms:px-3 cms:py-2.5 cms:text-sm cms:font-medium cms:text-muted-foreground`, children: [
        /* @__PURE__ */ e.jsx("span", {}),
        /* @__PURE__ */ e.jsx("span", { children: t("Title") }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:md:block", children: t("Slug") }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:md:block", children: t("Entries") }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:md:block", children: t("Created") }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: t("Actions") })
      ] }),
      p.length === 0 ? /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:border-t cms:border-border/60 cms:p-10 cms:text-center cms:text-muted-foreground", children: r ? t("The trash is empty.") : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        t("No terms yet."),
        /* @__PURE__ */ e.jsx(n.Button, { size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs(C.Link, { href: `${v}/create?locale=${encodeURIComponent(i)}`, children: [
          /* @__PURE__ */ e.jsx(G, {}),
          " ",
          t("New term")
        ] }) }),
        /* @__PURE__ */ e.jsx(n.TrashHint, { count: d, onShow: () => C.router.get(v, { locale: i, status: "trashed" }) })
      ] }) }) : $ ? $.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:border-t cms:border-border/60 cms:p-8 cms:text-center cms:text-muted-foreground", children: t("No terms match “:search”.", { search: o }) }) : $.map((w) => /* @__PURE__ */ e.jsx(_.Fragment, { children: h(w, null, 0) }, w.id)) : r ? p.map((w) => /* @__PURE__ */ e.jsx(_.Fragment, { children: h(w, null, 0) }, w.id)) : M(-1)
    ] })
  ] });
}
const Ms = "cms:grid cms:items-center cms:gap-3 cms:grid-cols-[1.5rem_1fr_2.5rem] cms:md:grid-cols-[1.5rem_minmax(0,2fr)_minmax(0,1.2fr)_5rem_7rem_2.5rem]";
function Zl(s) {
  if (!s) return "—";
  const a = new Date(s);
  return Number.isNaN(a.getTime()) ? "—" : a.toLocaleDateString(document.documentElement.lang || void 0, { day: "numeric", month: "short", year: "numeric" });
}
function Xl(s) {
  return { done: s.filter((a) => a.trim() !== "").length, total: s.length };
}
function ec({ locale: s, main: a, locales: l, sections: c }) {
  const i = A("cms/translations");
  n.useBreadcrumbs([{ label: t("Translations") }]);
  const r = l.find((y) => y.code === s)?.name ?? O(s), d = C.useForm({
    locale: s,
    texts: Object.fromEntries(c.flatMap((y) => y.texts.map((f) => [f.key, f.value])))
  }), [x, m] = _.useState(!1), o = d.errors, g = () => d.put(i, { preserveScroll: !0, onSuccess: () => d.setDefaults() });
  n.useUnsavedChanges(d.isDirty, g);
  const p = (y, f) => d.setData("texts", { ...d.data.texts, [y]: f }), u = Xl(c.flatMap((y) => y.texts.map((f) => d.data.texts[f.key] ?? ""))), v = c.map((y) => ({ ...y, texts: x ? y.texts.filter((f) => f.value.trim() === "") : y.texts })).filter((y) => y.texts.length > 0);
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (y) => {
    y.preventDefault(), g();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: t("Translations") }),
    /* @__PURE__ */ e.jsx(
      n.PageHeader,
      {
        title: t("Translations"),
        description: t("Translate the site's own texts that aren't entries: they show on listing pages, forms and menus. Left empty, the :main text shows.", { main: O(a) })
      }
    ),
    /* @__PURE__ */ e.jsx(n.Card, { className: "cms:sticky cms:top-16 cms:z-10 cms:py-3 cms:shadow-sm", children: /* @__PURE__ */ e.jsxs(n.CardContent, { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-x-4 cms:gap-y-2", children: [
      l.length > 1 ? /* @__PURE__ */ e.jsxs(n.Select, { value: s, onValueChange: (y) => C.router.get(i, { locale: y }), children: [
        /* @__PURE__ */ e.jsx(n.SelectTrigger, { "aria-label": t("Language"), className: "cms:w-48", children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(n.SelectContent, { children: l.map((y) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: y.code, children: y.name }, y.code)) })
      ] }) : /* @__PURE__ */ e.jsx("span", { className: "cms:font-medium", children: r }),
      /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", "aria-live": "polite", children: t(":done of :total translated into :language", { done: u.done, total: u.total, language: r }) }),
      /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:items-center cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Switch, { id: "untranslated-only", checked: x, onCheckedChange: (y) => m(y) }),
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "untranslated-only", className: "cms:font-normal", children: t("Only untranslated") })
      ] }),
      /* @__PURE__ */ e.jsxs("span", { className: "cms:ml-auto cms:flex cms:items-center cms:gap-3", children: [
        d.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") }),
        /* @__PURE__ */ e.jsxs(n.Button, { type: "submit", disabled: d.processing, children: [
          d.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
          " ",
          t("Save")
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ e.jsx(H, { message: o.locale }),
    v.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:py-8 cms:text-center cms:text-sm cms:text-muted-foreground", children: x ? t("Everything is translated into :language.", { language: r }) : t("Nothing to translate yet.") }),
    v.map((y) => /* @__PURE__ */ e.jsx(
      n.CollapsibleCard,
      {
        title: y.hint ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          y.title,
          " ",
          /* @__PURE__ */ e.jsxs("span", { className: "cms:font-normal cms:text-muted-foreground", children: [
            "· ",
            y.hint
          ] })
        ] }) : y.title,
        titleClassName: "cms:text-base",
        storageKey: `cms:translations:${y.key}`,
        contentClassName: "cms:flex cms:flex-col cms:divide-y cms:divide-border/60",
        children: y.texts.map((f) => {
          const j = `text-${f.key.replace(/[^A-Za-z0-9_-]/g, "-")}`, S = o[`texts.${f.key}`], $ = d.data.texts[f.key] ?? "";
          return /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-2 cms:py-3 cms:first:pt-0 cms:last:pb-0 cms:md:grid-cols-2 cms:md:gap-4", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-0.5", children: [
              /* @__PURE__ */ e.jsx(n.Label, { htmlFor: j, lang: a, className: "cms:break-words cms:whitespace-pre-line", children: f.source }),
              (f.label || f.url) && /* @__PURE__ */ e.jsxs("p", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-x-2 cms:text-xs cms:text-muted-foreground", children: [
                f.label && /* @__PURE__ */ e.jsx("span", { children: f.label }),
                f.url && /* @__PURE__ */ e.jsxs("a", { href: f.url, target: "_blank", rel: "noopener noreferrer", className: "cms:inline-flex cms:items-center cms:gap-1 cms:underline-offset-4 cms:hover:text-foreground cms:hover:underline", children: [
                  t("View"),
                  /* @__PURE__ */ e.jsx(xe, { className: "cms:size-3", "aria-hidden": !0 })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-1", children: [
              f.multiline ? /* @__PURE__ */ e.jsx(
                n.Textarea,
                {
                  id: j,
                  rows: 2,
                  lang: s,
                  value: $,
                  "aria-invalid": S !== void 0,
                  "aria-description": t("In :language", { language: r }),
                  onChange: (b) => p(f.key, b.target.value)
                }
              ) : /* @__PURE__ */ e.jsx(
                n.Input,
                {
                  id: j,
                  lang: s,
                  value: $,
                  "aria-invalid": S !== void 0,
                  "aria-description": t("In :language", { language: r }),
                  onChange: (b) => p(f.key, b.target.value)
                }
              ),
              /* @__PURE__ */ e.jsx(H, { message: S })
            ] })
          ] }, f.key);
        })
      },
      y.key
    ))
  ] });
}
function sc(s) {
  return function(l) {
    const c = C.usePage().props.cms;
    return Ba(c?.locales), /* @__PURE__ */ e.jsx(s, { ...l });
  };
}
const tc = {
  "Cms/Blueprints/Index": tl,
  "Cms/Blueprints/Edit": Cs,
  "Cms/Fieldsets/Index": Dl,
  // A fieldset is edited like a blueprint.
  "Cms/Fieldsets/Edit": Cs,
  "Cms/Entries/Index": vl,
  "Cms/Entries/Edit": ll,
  "Cms/Listing/Edit": Cl,
  "Cms/Terms/Index": Ql,
  "Cms/Translations/Edit": ec,
  "Cms/Terms/Edit": Yl,
  "Cms/Globals/Edit": _l,
  "Cms/Menus/Edit": Il,
  "Cms/Comments/Index": Rl,
  "Cms/Seo/Edit": Kl,
  "Cms/Submissions/Index": Gl
};
Ta({
  pages: Object.fromEntries(Object.entries(tc).map(([s, a]) => [s, sc(a)]))
});
