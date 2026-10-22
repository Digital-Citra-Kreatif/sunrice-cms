const Ls = globalThis.Sunrice;
if (!Ls) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const e = Ls.modules["react/jsx-runtime"], Is = globalThis.Sunrice;
if (!Is) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const C = Is.modules["@inertiajs/react"], xs = 3;
function ts() {
  const s = globalThis.Sunrice;
  if (!s)
    throw new Error("[sunrice] This script runs outside the Sunrice admin panel (window.Sunrice is missing).");
  return s;
}
function La(s) {
  const a = ts();
  if (a.version !== xs)
    throw new Error(`[sunrice] This plugin was built for admin runtime ${xs}, but the panel runs ${a.version}. Rebuild it with a matching @imajiner/admin-sdk.`);
  for (const [l, c] of Object.entries(s.pages ?? {}))
    a.registerPage(l, c);
}
function t(s, a = {}) {
  return ts().t(s, a);
}
function I(s = "") {
  return ts().adminUrl(s);
}
function ae(s) {
  return { draft: t("Draft"), scheduled: t("Scheduled"), published: t("Published") }[s];
}
function q(s, a) {
  if (!s) return "—";
  const l = new Date(s);
  return Number.isNaN(l.getTime()) ? "—" : l.toLocaleString(document.documentElement.lang || void 0, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
}
function Ia(s, a = /* @__PURE__ */ new Date()) {
  const l = s ? new Date(s) : null;
  if (l && !Number.isNaN(l.getTime()) && l > a) return l;
  const c = new Date(a);
  return c.setDate(c.getDate() + 1), c.setMinutes(0, 0, 0), c;
}
function As(s) {
  const a = (l) => String(l).padStart(2, "0");
  return `${s.getFullYear()}-${a(s.getMonth() + 1)}-${a(s.getDate())}T${a(s.getHours())}:${a(s.getMinutes())}`;
}
function Aa(s, a, l, c = Date.now()) {
  const i = a === "" ? null : new Date(a);
  if (i === null || Number.isNaN(i.getTime())) return { action: "now", at: null };
  const r = (m) => Math.floor(m / 6e4), d = l ? new Date(l).getTime() : null;
  if (s !== "draft" && d !== null && r(d) === r(i.getTime())) return { action: "now", at: null };
  const u = i.toISOString();
  return i.getTime() > c ? { action: "schedule", at: u } : { action: s === "draft" ? "backdate" : "redate", at: u };
}
let Qe = {};
function Ea(s) {
  Qe = s ?? {};
}
function V(s, a) {
  if (a === void 0 && Qe[s]) return Qe[s];
  try {
    return new Intl.DisplayNames(a ? [a] : void 0, { type: "language" }).of(s.replace("_", "-")) ?? s;
  } catch {
    return s;
  }
}
function ps(s) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function Fa(s, a, l, c) {
  const i = ps(a), r = s === i || s.startsWith(`${i}-`) && /^\d+$/.test(s.slice(i.length + 1));
  return c && i !== "" && r ? ps(l) : s;
}
function Es(s, a, l) {
  return !s || a.trim() === "" || a.trim() === s ? null : l ? "redirects" : "breaks";
}
const Fs = globalThis.Sunrice;
if (!Fs) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const M = Fs.modules.react;
const Pa = (s) => s?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
function Ha(s, a, l = []) {
  if (a == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: Pa(s),
    size: 24,
    node: a,
    ...l.length > 0 ? { aliases: l } : {}
  };
}
const Oa = (s) => {
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
const Va = (s) => {
  const a = Oa(s);
  return a.charAt(0).toUpperCase() + a.slice(1);
};
const Ze = (...s) => s.filter((a, l, c) => !!a && a.trim() !== "" && c.indexOf(a) === l).join(" ").trim();
const oe = {
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
function Fe(s) {
  return s != null;
}
function Ra(s, a = {}) {
  const l = a.attributeNames ?? {}, c = (h) => l[h] ?? h, i = s.size ?? s.width ?? oe.width, r = s.size ?? s.height ?? oe.height, d = s.aliases?.filter((h) => typeof h == "string" && h.trim() !== "").map((h) => `lucide-${h}`) ?? [], u = [...s.name ? [`lucide-${s.name}`] : [], ...d], m = a.className?.split(" ").filter(Boolean) ?? [], o = a.includeDefaultClasses === !1 ? Ze(...m) : Ze("lucide", ...u, ...m), g = a.absoluteStrokeWidth ? Number(a.strokeWidth ?? oe["stroke-width"]) * Number(s.size ?? s.width ?? oe.width) / Number(a.size ?? a.width ?? oe.width) : a.strokeWidth ?? oe["stroke-width"];
  return [
    "svg",
    {
      ...Object.entries(oe).reduce((h, [b, v]) => (h[c(b)] = v, h), {}),
      ..."color" in a && a.color && {
        [c("stroke")]: a.color
      },
      ..."size" in a && Fe(a.size) && {
        [c("width")]: a.size,
        [c("height")]: a.size
      },
      ..."width" in a && Fe(a.width) && {
        [c("width")]: a.width
      },
      ..."height" in a && Fe(a.height) && {
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
    s.node.map((h) => {
      const [b, v, f] = h, j = a.nonScalingStroke ? { [c("vector-effect")]: "non-scaling-stroke", ...v } : v;
      return f ? [b, j, f] : [b, j];
    })
  ];
}
function Ua(s, a = {}) {
  return Ra(s, {
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
const qa = (s) => {
  for (const a in s)
    if (a.startsWith("aria-") || a === "role" || a === "title")
      return !0;
  return !1;
}, Ka = M.createContext({}), Wa = () => M.useContext(Ka), Ga = M.forwardRef(
  ({
    color: s,
    size: a,
    width: l,
    height: c,
    strokeWidth: i,
    absoluteStrokeWidth: r,
    nonScalingStroke: d,
    className: u = "",
    children: m,
    iconNode: o = [],
    icon: g = {
      node: o,
      aliases: [],
      size: 24
    },
    ...x
  }, h) => {
    const {
      size: b = 24,
      strokeWidth: v = 2,
      absoluteStrokeWidth: f = !1,
      nonScalingStroke: j = !1,
      color: _ = "currentColor",
      className: T = ""
    } = Wa() ?? {}, y = !!m || qa(x), [p, z, k = []] = Ua(g, {
      color: s ?? _,
      width: l ?? a ?? b,
      height: c ?? a ?? b,
      strokeWidth: i ?? v,
      absoluteStrokeWidth: r ?? f,
      nonScalingStroke: d ?? j,
      className: Ze(T, u),
      hasA11yProp: y,
      attributes: x
    });
    return M.createElement(
      p,
      {
        ref: h,
        ...z
      },
      [
        ...k.map(([F, L]) => M.createElement(F, L)),
        ...Array.isArray(m) ? m : [m]
      ]
    );
  }
);
function E(s, a = [], l = []) {
  const c = typeof s == "string" ? Ha(s, a, l) : s, i = M.forwardRef(
    ({ className: r, ...d }, u) => M.createElement(Ga, {
      ref: u,
      icon: c,
      className: r,
      ...d
    })
  );
  return c.name && (i.displayName = Va(c.name)), i;
}
const Ps = {
  name: "arrow-down",
  size: 24,
  node: [
    ["path", { d: "M12 5v14", key: "s699le" }],
    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
  ]
};
Ps.node;
const Hs = E(Ps);
const Os = {
  name: "arrow-up-down",
  size: 24,
  node: [
    ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
    ["path", { d: "M17 20V4", key: "1ejh1v" }],
    ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
    ["path", { d: "M7 4v16", key: "1glfcx" }]
  ]
};
Os.node;
const Vs = E(Os);
const Rs = {
  name: "arrow-up",
  size: 24,
  node: [
    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
    ["path", { d: "M12 19V5", key: "x0mq9r" }]
  ]
};
Rs.node;
const Us = E(Rs);
const qs = {
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
qs.node;
const Ja = E(qs);
const Ks = {
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
Ks.node;
const Xe = E(Ks);
const Ws = {
  name: "calendar",
  size: 24,
  node: [
    ["path", { d: "M8 2v3", key: "1ioesn" }],
    ["path", { d: "M16 2v3", key: "otl347" }],
    ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", key: "h1oib" }],
    ["path", { d: "M3 9h18", key: "1pudct" }]
  ]
};
Ws.node;
const Ya = E(Ws);
const Gs = {
  name: "check",
  size: 24,
  node: [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]
};
Gs.node;
const be = E(Gs);
const Js = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
Js.node;
const Ys = E(Js);
const Qs = {
  name: "chevron-left",
  size: 24,
  node: [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]]
};
Qs.node;
const as = E(Qs);
const Zs = {
  name: "chevron-right",
  size: 24,
  node: [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]
};
Zs.node;
const Ne = E(Zs);
const Xs = {
  name: "chevrons-down-up",
  size: 24,
  node: [
    ["path", { d: "m7 20 5-5 5 5", key: "13a0gw" }],
    ["path", { d: "m7 4 5 5 5-5", key: "1kwcof" }]
  ]
};
Xs.node;
const Qa = E(Xs);
const et = {
  name: "chevrons-up-down",
  size: 24,
  node: [
    ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
    ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
  ]
};
et.node;
const Za = E(et);
const st = {
  name: "columns-3",
  size: 24,
  node: [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M9 3v18", key: "fh3hqa" }],
    ["path", { d: "M15 3v18", key: "14nvp0" }]
  ],
  aliases: ["panels-left-right"]
};
st.node;
const Xa = E(st);
const tt = {
  name: "copy",
  size: 24,
  node: [
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
  ]
};
tt.node;
const at = E(tt);
const nt = {
  name: "download",
  size: 24,
  node: [
    ["path", { d: "M12 15V3", key: "m9g1x1" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
  ]
};
nt.node;
const lt = E(nt);
const ct = {
  name: "ellipsis",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
    ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
    ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
  ],
  aliases: ["more-horizontal"]
};
ct.node;
const rt = E(ct);
const it = {
  name: "external-link",
  size: 24,
  node: [
    ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
    ["path", { d: "M10 14 21 3", key: "gplh6r" }],
    ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
  ]
};
it.node;
const ge = E(it);
const ot = {
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
ot.node;
const en = E(ot);
const dt = {
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
dt.node;
const sn = E(dt);
const mt = {
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
mt.node;
const tn = E(mt);
const ut = {
  name: "hash",
  size: 24,
  node: [
    ["line", { x1: "4", x2: "20", y1: "9", y2: "9", key: "4lhtct" }],
    ["line", { x1: "4", x2: "20", y1: "15", y2: "15", key: "vyu0kd" }],
    ["line", { x1: "10", x2: "8", y1: "3", y2: "21", key: "1ggp8o" }],
    ["line", { x1: "16", x2: "14", y1: "3", y2: "21", key: "weycgp" }]
  ]
};
ut.node;
const an = E(ut);
const ht = {
  name: "image",
  size: 24,
  node: [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
    ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
    ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
  ]
};
ht.node;
const nn = E(ht);
const xt = {
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
xt.node;
const ln = E(xt);
const pt = {
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
pt.node;
const gs = E(pt);
const gt = {
  name: "layout-template",
  size: 24,
  node: [
    ["rect", { width: "18", height: "7", x: "3", y: "3", rx: "1", key: "f1a2em" }],
    ["rect", { width: "9", height: "7", x: "3", y: "14", rx: "1", key: "jqznyg" }],
    ["rect", { width: "5", height: "7", x: "16", y: "14", rx: "1", key: "q5h2i8" }]
  ]
};
gt.node;
const ft = E(gt);
const jt = {
  name: "link-2",
  size: 24,
  node: [
    ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
    ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
    ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
  ]
};
jt.node;
const bt = E(jt);
const vt = {
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
vt.node;
const cn = E(vt);
const yt = {
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
yt.node;
const rn = E(yt);
const Nt = {
  name: "list-tree",
  size: 24,
  node: [
    ["path", { d: "M8 5h13", key: "1pao27" }],
    ["path", { d: "M13 12h8", key: "h98zly" }],
    ["path", { d: "M13 19h8", key: "c3s6r1" }],
    ["path", { d: "M3 10a2 2 0 0 0 2 2h3", key: "1npucw" }],
    ["path", { d: "M3 5v12a2 2 0 0 0 2 2h3", key: "x1gjn2" }]
  ]
};
Nt.node;
const on = E(Nt);
const kt = {
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
kt.node;
const wt = E(kt);
const St = {
  name: "loader-circle",
  size: 24,
  node: [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  aliases: ["loader-2"]
};
St.node;
const ce = E(St);
const Ct = {
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
Ct.node;
const $t = E(Ct);
const _t = {
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
_t.node;
const dn = E(_t);
const Dt = {
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
Dt.node;
const mn = E(Dt);
const Tt = {
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
Tt.node;
const un = E(Tt);
const zt = {
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
zt.node;
const Mt = E(zt);
const Bt = {
  name: "plus",
  size: 24,
  node: [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ]
};
Bt.node;
const J = E(Bt);
const Lt = {
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
Lt.node;
const hn = E(Lt);
const It = {
  name: "repeat",
  size: 24,
  node: [
    ["path", { d: "m17 2 4 4-4 4", key: "nntrym" }],
    ["path", { d: "M3 11v-1a4 4 0 0 1 4-4h14", key: "84bu3i" }],
    ["path", { d: "m7 22-4-4 4-4", key: "1wqhfi" }],
    ["path", { d: "M21 13v1a4 4 0 0 1-4 4H3", key: "1rx37r" }]
  ]
};
It.node;
const xn = E(It);
const At = {
  name: "rotate-ccw",
  size: 24,
  node: [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ]
};
At.node;
const ve = E(At);
const Et = {
  name: "search",
  size: 24,
  node: [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ]
};
Et.node;
const ke = E(Et);
const Ft = {
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
Ft.node;
const pn = E(Ft);
const Pt = {
  name: "settings-2",
  size: 24,
  node: [
    ["path", { d: "M14 17H5", key: "gfn3mx" }],
    ["path", { d: "M19 7h-9", key: "6i9tg" }],
    ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
    ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
  ]
};
Pt.node;
const Ie = E(Pt);
const Ht = {
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
Ht.node;
const gn = E(Ht);
const Ot = {
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
Ot.node;
const es = E(Ot);
const Vt = {
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
Vt.node;
const fn = E(Vt);
const Rt = {
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
Rt.node;
const Ut = E(Rt);
const qt = {
  name: "text-align-start",
  size: 24,
  node: [
    ["path", { d: "M21 5H3", key: "1fi0y6" }],
    ["path", { d: "M15 12H3", key: "6jk70r" }],
    ["path", { d: "M17 19H3", key: "z6ezky" }]
  ],
  aliases: ["text", "align-left"]
};
qt.node;
const jn = E(qt);
const Kt = {
  name: "toggle-left",
  size: 24,
  node: [
    ["circle", { cx: "9", cy: "12", r: "3", key: "u3jwor" }],
    ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "7", key: "g7kal2" }]
  ]
};
Kt.node;
const bn = E(Kt);
const Wt = {
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
Wt.node;
const K = E(Wt);
const Gt = {
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
Gt.node;
const vn = E(Gt);
const Jt = {
  name: "type",
  size: 24,
  node: [
    ["path", { d: "M12 4v16", key: "1654pz" }],
    ["path", { d: "M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2", key: "e0r10z" }],
    ["path", { d: "M9 20h6", key: "s66wpe" }]
  ]
};
Jt.node;
const yn = E(Jt);
const Yt = {
  name: "undo-2",
  size: 24,
  node: [
    ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
    ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
  ]
};
Yt.node;
const Me = E(Yt);
const Qt = {
  name: "x",
  size: 24,
  node: [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]
};
Qt.node;
const we = E(Qt), Zt = globalThis.Sunrice;
if (!Zt) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const n = Zt.modules["@imajiner/admin-sdk/ui"];
function Xt({ id: s, children: a }) {
  return /* @__PURE__ */ e.jsxs("p", { id: s, className: "cms:flex cms:items-start cms:gap-2 cms:rounded-md cms:border cms:border-amber-500/40 cms:bg-amber-500/10 cms:px-3 cms:py-2 cms:text-sm cms:text-amber-900 cms:dark:text-amber-200", children: [
    /* @__PURE__ */ e.jsx(vn, { className: "cms:mt-0.5 cms:size-4 cms:shrink-0", "aria-hidden": !0 }),
    /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:[overflow-wrap:anywhere] cms:[&_code]:rounded cms:[&_code]:bg-amber-500/15 cms:[&_code]:px-1 cms:[&_code]:font-mono cms:[&_code]:text-[0.8125rem]", children: a })
  ] });
}
function re() {
  const [s, a] = M.useState(null), l = /* @__PURE__ */ e.jsx(n.Dialog, { open: s !== null, onOpenChange: (c) => !c && a(null), children: /* @__PURE__ */ e.jsxs(n.DialogContent, { children: [
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
function de(s) {
  return s && typeof s == "object" && !Array.isArray(s) ? s : {};
}
function Nn(s, a) {
  if (typeof s != "string" || s === "") return "";
  const l = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(s);
  return l ? a ? `${l[1]}T${l[2] ?? "00:00"}` : l[1] ?? "" : "";
}
function fs(s) {
  return s === "" ? null : s;
}
function kn(s) {
  const a = typeof s == "number" ? s : typeof s == "string" && s.trim() !== "" ? Number(s) : NaN;
  return !Number.isFinite(a) || Math.abs(a) < 1e4 ? null : new Intl.NumberFormat("en", { maximumFractionDigits: 20 }).format(a);
}
function wn(s, a, l, c) {
  return a || s.some((i) => ["none", ""].includes(i.label.trim().toLowerCase()) || i.value.trim().toLowerCase() === "none") ? !1 : !l || !c;
}
function Be(s) {
  return s.some((a) => a.shared === !0 || Be(a.fields ?? []) || (a.blocks ?? []).some((l) => Be(l.fields)));
}
function Sn() {
  return { _hidden: !1 };
}
function ns(s, a, l = 60) {
  for (const c of s) {
    const i = a[c.handle];
    let r = null;
    ["text", "textarea", "email", "url"].includes(c.type) && typeof i == "string" ? r = i : c.type === "rich_text" && typeof i == "string" ? r = i.replace(/<[^>]*>/g, " ") : c.type === "group" && Array.isArray(c.fields) && (r = ns(c.fields, de(i), l));
    const d = (r ?? "").replace(/\s+/g, " ").trim();
    if (d !== "") return d.length > l ? `${d.slice(0, l - 1).trimEnd()}…` : d;
  }
  return null;
}
function Cn(s) {
  return { type: s, hidden: !1, values: {} };
}
function $n(s) {
  const a = s.replace(/[\u0000- \u007f]+/g, ""), l = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(a);
  return l ? ["http", "https", "mailto", "tel"].includes(l[1].toLowerCase()) : !a.includes("\\");
}
function ea({ ids: s, search: a, collections: l }) {
  const c = new URLSearchParams();
  for (const i of s ?? []) c.append("ids[]", String(i));
  a && c.set("search", a);
  for (const i of l) c.append("collections[]", i);
  return c.toString();
}
let _n = 0;
function Dn(s, a) {
  return s.length === a ? s.slice() : s.length < a ? [...s, ...Array.from({ length: a - s.length }, () => `k${++_n}`)] : s.slice(0, a);
}
function Tn({ taxonomy: s, q: a, ids: l }) {
  const c = new URLSearchParams({ taxonomy: s });
  a && c.set("q", a);
  for (const i of l ?? []) c.append("ids[]", String(i));
  return c.toString();
}
async function js(s) {
  const a = await fetch(`${I("cms/entries/picker")}?${ea(s)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!a.ok) throw new Error(String(a.status));
  const l = await a.json();
  return { items: l.items, unavailable: l.unavailable ?? [] };
}
function zn(s) {
  return s.length < 2 ? s[0] ?? "" : t(":items and :last", { items: s.slice(0, -1).join(", "), last: s[s.length - 1] });
}
function Se({ id: s, value: a, multiple: l, max: c, collections: i, invalid: r, onChange: d, emptyHint: u }) {
  const m = a === null ? [] : Array.isArray(a) ? a : [a], [o, g] = M.useState({}), [x, h] = M.useState(""), [b, v] = M.useState(!1), [f, j] = M.useState(null), [_, T] = M.useState([]), [y, p] = M.useState(!1), z = l && c !== null && m.length >= c, k = m.filter((S) => !o[S]).join(",");
  M.useEffect(() => {
    k !== "" && js({ ids: k.split(",").map(Number), collections: i }).then(({ items: S }) => g((P) => ({ ...P, ...Object.fromEntries(S.map((N) => [N.id, N])) }))).catch(() => p(!0));
  }, [k]), M.useEffect(() => {
    if (!b) {
      j(null);
      return;
    }
    const S = window.setTimeout(() => {
      js({ search: x.trim(), collections: i }).then((P) => {
        j(P.items), T(P.unavailable), p(!1);
      }).catch(() => p(!0));
    }, x.trim() === "" ? 0 : 250);
    return () => window.clearTimeout(S);
  }, [x, b]);
  const F = (S) => {
    g((P) => ({ ...P, [S.id]: S })), d(l ? [...m, S.id] : S.id), h("");
  }, L = (S) => d(l ? S : S[0] ?? null);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    m.length > 0 && /* @__PURE__ */ e.jsx(n.SortableList, { items: m, getId: (S) => S, getLabel: (S) => o[S]?.title ?? `Entry #${S}`, onReorder: (S) => L(S), disabled: !l, className: "cms:gap-1", children: (S, { handle: P }) => {
      const N = o[S];
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-md cms:border cms:bg-card cms:px-2 cms:py-1 cms:text-sm", children: [
        l && /* @__PURE__ */ e.jsx(n.SortableHandle, { ...P, label: t("Move :title", { title: N?.title ?? S }) }),
        /* @__PURE__ */ e.jsx("span", { className: `cms:min-w-0 cms:flex-1 cms:truncate ${l ? "" : "cms:pl-1"}`, children: N ? N.title : t("Entry #:id", { id: S }) }),
        N && /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: N.collection }),
        N && /* @__PURE__ */ e.jsx(n.Badge, { variant: N.status === "published" ? "success" : "secondary", children: ae(N.status) }),
        /* @__PURE__ */ e.jsx(
          n.Button,
          {
            type: "button",
            variant: "ghost",
            size: "icon",
            className: "cms:size-7",
            "aria-label": t("Remove :title", { title: N?.title ?? S }),
            onClick: () => L(m.filter((D) => D !== S)),
            children: /* @__PURE__ */ e.jsx(we, {})
          }
        )
      ] });
    } }),
    !z && (l || m.length === 0) && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-md", children: [
      /* @__PURE__ */ e.jsx(ke, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
      /* @__PURE__ */ e.jsx(
        n.Input,
        {
          id: s,
          className: "cms:pl-9",
          placeholder: t("Search entries by title"),
          "aria-invalid": r,
          value: x,
          autoComplete: "off",
          "aria-expanded": f !== null,
          onFocus: () => v(!0),
          onBlur: () => v(!1),
          onKeyDown: (S) => {
            S.key === "Escape" && b && (S.preventDefault(), v(!1));
          },
          onChange: (S) => {
            h(S.target.value), v(!0);
          }
        }
      ),
      f !== null && /* @__PURE__ */ e.jsxs("ul", { role: "listbox", "aria-label": t("Matching entries"), className: "cms:absolute cms:z-10 cms:mt-1 cms:max-h-64 cms:w-full cms:overflow-auto cms:rounded-md cms:border cms:bg-card cms:p-1 cms:shadow-md", children: [
        f.filter((S) => !m.includes(S.id)).length === 0 && /* @__PURE__ */ e.jsxs("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: [
          x.trim() === "" ? t("No entries yet.") : t("No entries match."),
          u && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            " ",
            u
          ] })
        ] }),
        _.length > 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: t("Your role can't see entries of :collections: ask an editor to link them.", { collections: zn(_) }) }),
        f.filter((S) => !m.includes(S.id)).map((S) => /* @__PURE__ */ e.jsx("li", { role: "option", "aria-selected": !1, children: /* @__PURE__ */ e.jsxs(
          "button",
          {
            type: "button",
            className: "cms:flex cms:w-full cms:items-center cms:gap-2 cms:rounded cms:px-2 cms:py-1.5 cms:text-left cms:text-sm cms:hover:bg-accent",
            onMouseDown: (P) => P.preventDefault(),
            onClick: () => F(S),
            children: [
              /* @__PURE__ */ e.jsx("span", { className: "cms:flex-1 cms:truncate", children: S.title }),
              /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: S.collection })
            ]
          }
        ) }, S.id))
      ] })
    ] }),
    y && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t("Entries could not be loaded. Try again.") })
  ] });
}
const sa = M.createContext({}), Pe = "__none";
async function bs(s) {
  const a = await fetch(`${I("cms/terms/picker")}?${Tn(s)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!a.ok) throw new Error(String(a.status));
  return await a.json();
}
function ta({ id: s, taxonomy: a, multiple: l, max: c, required: i, invalid: r, value: d, onChange: u }) {
  const m = M.useContext(sa), o = d === null ? [] : Array.isArray(d) ? d : [d], [g, x] = M.useState(null), [h, b] = M.useState(!1), [v, f] = M.useState(""), [j, _] = M.useState({}), [T, y] = M.useState(!1);
  M.useEffect(() => {
    if (!a) return;
    const N = v.trim(), D = window.setTimeout(() => {
      bs({ taxonomy: a, q: N }).then(($) => {
        x($.items), $.more && b(!0), y(!1);
      }).catch(() => y(!0));
    }, N === "" ? 0 : 250);
    return () => window.clearTimeout(D);
  }, [a, v]);
  const p = (N) => m[String(N)] ?? j[N] ?? g?.find((D) => D.id === N)?.label, z = g === null ? "" : o.filter((N) => p(N) === void 0).join(",");
  if (M.useEffect(() => {
    !a || z === "" || bs({ taxonomy: a, ids: z.split(",").map(Number) }).then((N) => _((D) => ({ ...D, ...Object.fromEntries(N.items.map(($) => [$.id, $.label])) }))).catch(() => y(!0));
  }, [a, z]), !a) return /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("Choose a taxonomy for this field in its blueprint.") });
  if (g === null) return T ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t("Terms could not be loaded. Try again.") }) : /* @__PURE__ */ e.jsx(n.Skeleton, { className: "cms:h-9 cms:w-full cms:max-w-sm" });
  const k = (N) => `${"— ".repeat(N.depth)}${N.label}`, F = l && c !== null && o.length >= c, L = (N) => u(l ? N : N[0] ?? null), S = h && o.length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-1.5", children: o.map((N) => /* @__PURE__ */ e.jsxs(n.Badge, { variant: "secondary", className: "cms:gap-1 cms:pr-1", children: [
    p(N) ?? t("Term #:id", { id: N }),
    !(i && !l) && /* @__PURE__ */ e.jsx(
      "button",
      {
        type: "button",
        className: "cms:rounded-sm cms:p-0.5 cms:hover:bg-muted",
        "aria-label": t("Remove :title", { title: p(N) ?? N }),
        onClick: () => L(o.filter((D) => D !== N)),
        children: /* @__PURE__ */ e.jsx(we, { className: "cms:size-3" })
      }
    )
  ] }, N)) }), P = h && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-sm", children: [
    /* @__PURE__ */ e.jsx(ke, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
    /* @__PURE__ */ e.jsx(
      n.Input,
      {
        id: s,
        className: "cms:pl-9",
        placeholder: t("Search terms"),
        autoComplete: "off",
        "aria-invalid": r,
        value: v,
        onChange: (N) => f(N.target.value)
      }
    )
  ] });
  if (!l && !h) {
    const N = o[0], D = N === void 0 || g.some(($) => $.id === N);
    return /* @__PURE__ */ e.jsxs(n.Select, { value: N === void 0 ? Pe : String(N), onValueChange: ($) => u($ === Pe ? null : Number($)), children: [
      /* @__PURE__ */ e.jsx(n.SelectTrigger, { id: s, className: "cms:w-full cms:max-w-sm", "aria-invalid": r, children: /* @__PURE__ */ e.jsx(n.SelectValue, { children: N === void 0 ? t("None") : p(N) ?? t("Term #:id", { id: N }) }) }),
      /* @__PURE__ */ e.jsxs(n.SelectContent, { children: [
        !i && /* @__PURE__ */ e.jsx(n.SelectItem, { value: Pe, children: t("None") }),
        !D && N !== void 0 && /* @__PURE__ */ e.jsx(n.SelectItem, { value: String(N), children: p(N) ?? t("Term #:id", { id: N }) }),
        g.map(($) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: String($.id), children: k($) }, $.id))
      ] })
    ] });
  }
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    S,
    P,
    g.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: v.trim() ? t("No terms match.") : t("Nothing to choose from yet.") }) : l ? /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:max-h-72 cms:flex-col cms:gap-2 cms:overflow-auto", children: g.map((N) => {
      const D = o.includes(N.id);
      return /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx(
          n.Checkbox,
          {
            checked: D,
            disabled: !D && F,
            onCheckedChange: ($) => L($ ? [...o, N.id] : o.filter((U) => U !== N.id))
          }
        ),
        k(N)
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
        onClick: () => u(N.id),
        children: k(N)
      },
      N.id
    )) })
  ] });
}
const aa = (s, a = {}) => s.replace(/:([A-Za-z_]+)/g, (l, c) => a[c] ?? l), Mn = 5;
let Bn = 0;
const ls = () => `f${++Bn}`;
function na(s) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function cs(s) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^[0-9_]+/, "").replace(/_{2,}/g, "_").slice(0, 64);
}
function la(s, a) {
  const l = new Set(a.map((r) => r.handle)), c = na(s) || "field";
  let i = c;
  for (let r = 2; l.has(i); r++)
    i = `${c}_${r}`;
  return i;
}
function ca(s) {
  return (s ?? []).map(({ fields: a, ...l }) => ({
    ...l,
    key: ls(),
    fields: ca(a),
    handleTouched: !0,
    savedHandle: l.handle
  }));
}
function ra(s, a) {
  return s.map(({ key: l, handleTouched: c, savedHandle: i, fields: r, ...d }) => ({
    ...d,
    validation: (d.validation ?? []).map((u) => u.trim()).filter((u) => u !== ""),
    ...a(d.type) ? { fields: ra(r, a) } : {}
  }));
}
function Ln(s, a, l) {
  return { key: ls(), type: s, label: a, handle: la(a, l), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function He(s) {
  return s.type !== "fieldset" && s.savedHandle !== void 0 && s.savedHandle !== "" && s.handle !== s.savedHandle ? s.savedHandle : null;
}
function ia(s) {
  return s.map((a) => ({ ...a, savedHandle: a.handle, fields: ia(a.fields) }));
}
function vs(s, a, l) {
  if (s.handleTouched) return { ...s, label: a };
  const c = l.filter((i) => i.key !== s.key);
  return { ...s, label: a, handle: la(a || s.type, c) };
}
function me(s, a) {
  const l = `${a}.`, c = {};
  for (const [i, r] of Object.entries(s))
    i.startsWith(l) && (c[i.slice(l.length)] = r);
  return c;
}
function Y(s, a) {
  const l = s[a];
  return { ...me(s, a), ...l !== void 0 ? { "": l } : {} };
}
function Ae(s, a) {
  return Object.keys(s).filter((l) => l === a || l.startsWith(`${a}.`));
}
function Ce(s, a) {
  return Object.keys(s).some((l) => l === a || l.startsWith(`${a}.`));
}
function In(s, a) {
  return a.filter((l) => l.key !== s.key && l.handle !== "" && l.type !== "fieldset");
}
function oa(s, a, l, c = aa) {
  return s.type === "fieldset" ? null : l?.includes(s.handle) ? c('":handle" is used by the content itself; choose another handle.', { handle: s.handle }) : s.handle !== "" && a.some((i) => i.key !== s.key && i.type !== "fieldset" && i.handle === s.handle) ? c('There is already a field ":handle" here.', { handle: s.handle }) : null;
}
function da(s, a) {
  return typeof s.translatable == "boolean" ? s.translatable : a;
}
function An(s, a, l) {
  return { ...s, translatable: a === l ? null : a };
}
function En(s, a, l = []) {
  const c = /* @__PURE__ */ new Set([...a.map((d) => d.handle), ...l]), i = `${(cs(s) || "field").slice(0, 56)}_copy`;
  let r = i;
  for (let d = 2; c.has(r); d++)
    r = `${i}_${d}`;
  return r;
}
function ma(s) {
  const { key: a, savedHandle: l, fields: c, ...i } = s;
  return { ...structuredClone(i), key: ls(), fields: c.map(ma) };
}
function Fn(s, a, l = [], c = aa) {
  const i = s[a];
  if (i === void 0) return null;
  const r = i.label || i.handle, d = {
    ...ma(i),
    label: c(":label (copy)", { label: r }),
    handle: i.type === "fieldset" ? i.handle : En(i.handle, s, l),
    handleTouched: !0
  };
  return { fields: [...s.slice(0, a + 1), d, ...s.slice(a + 1)], copy: d };
}
function Pn(s, a) {
  const l = s.condition;
  return !l || "rules" in l ? null : (l.operator === "filled" || l.operator === "equals" && (l.value === !0 || l.value === "true")) && a.some((i) => i.handle === l.field && i.type === "toggle") ? l.field : null;
}
function Hn(s) {
  const a = (i) => i.type === "number" || i.type === "text" && (i.instructions ?? "").length <= 60, l = {}, c = [];
  for (const i of s) {
    const r = Pn(i, s);
    r === null ? c.push(i) : (l[r] ??= []).push(i);
  }
  return { options: c.filter((i) => !a(i)), limits: c.filter(a), dependents: l };
}
const Oe = [
  { value: "equals", label: "is", needsValue: !0 },
  { value: "not_equals", label: "is not", needsValue: !0 },
  { value: "filled", label: "is filled in", needsValue: !1 },
  { value: "empty", label: "is empty", needsValue: !1 }
];
function ys(s) {
  return s === !0 ? "true" : s === !1 ? "false" : typeof s == "string" || typeof s == "number" ? String(s) : "";
}
function ua(s) {
  return s ? "rules" in s ? Array.isArray(s.rules) ? s.rules : [] : [s] : [];
}
function ha(s) {
  return s && "rules" in s && s.match === "any" ? "any" : "all";
}
function On(s, a) {
  return s.length === 0 ? null : s.length === 1 ? s[0] : { match: a, rules: s };
}
function Ns(s, a) {
  const l = a[s.field], c = l != null && l !== "" && l !== !1 && !(Array.isArray(l) && l.length === 0), i = (Array.isArray(l) ? l : [l]).map(ys).includes(ys(s.value));
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
function rs(s, a) {
  const l = ua(s.condition);
  return l.length === 0 ? !0 : ha(s.condition) === "any" ? l.some((c) => Ns(c, a)) : l.every((c) => Ns(c, a));
}
function Ve(s) {
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
function ks(s) {
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
const Re = "__none";
function O({ message: s, id: a }) {
  return s ? /* @__PURE__ */ e.jsx("p", { id: a, className: "cms:text-sm cms:text-destructive", children: s }) : null;
}
function Ue(s) {
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
const Vn = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function Le(s) {
  if (s.label) return s.label;
  const a = s.handle.replace(/_/g, " ");
  return a.charAt(0).toUpperCase() + a.slice(1);
}
function ne({ field: s, value: a, onChange: l, errors: c, id: i, content: r = !1, fill: d = !1 }) {
  const u = Le(s), m = Vn.includes(s.type) || ["select", "terms"].includes(s.type) && s.config?.multiple === !0, o = c[""] !== void 0;
  return /* @__PURE__ */ e.jsxs(
    "div",
    {
      className: "cms:flex cms:flex-col cms:gap-2",
      ...m ? { role: "group", "aria-labelledby": `${i}-label`, ...o ? { "aria-invalid": !0, "aria-describedby": `${i}-error` } : {} } : {},
      children: [
        s.type === "toggle" ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
          /* @__PURE__ */ e.jsx(n.Switch, { id: i, checked: a === !0, onCheckedChange: (g) => l(g) }),
          /* @__PURE__ */ e.jsx(n.Label, { htmlFor: i, children: u })
        ] }) : /* @__PURE__ */ e.jsxs(n.Label, { id: `${i}-label`, htmlFor: m ? void 0 : i, children: [
          u,
          s.required && /* @__PURE__ */ e.jsx("span", { className: "cms:text-destructive", children: " *" })
        ] }),
        /* @__PURE__ */ e.jsx(Un, { field: s, value: a, onChange: l, errors: c, id: i, content: r, fill: d }),
        ["text", "textarea"].includes(s.type) && te(s, "max") !== void 0 && /* @__PURE__ */ e.jsx(Rn, { length: typeof a == "string" ? [...a].length : 0, max: te(s, "max") ?? 0 }),
        s.instructions && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s.instructions }),
        /* @__PURE__ */ e.jsx(O, { message: c[""], id: `${i}-error` })
      ]
    }
  );
}
function Rn({ length: s, max: a }) {
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
function Un({ field: s, value: a, onChange: l, errors: c, id: i, content: r, fill: d = !1 }) {
  const u = c[""] !== void 0;
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
          "aria-invalid": u,
          value: typeof a == "string" ? a : "",
          rows: te(s, "rows") ?? 4,
          onChange: (m) => l(m.target.value)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ e.jsx(n.RichTextEditor, { id: i, labelledBy: `${i}-label`, invalid: u, value: typeof a == "string" ? a : "", onChange: l });
    case "number": {
      const m = kn(a);
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(
          n.Input,
          {
            id: i,
            type: "number",
            className: d ? "cms:w-full" : "cms:max-w-48",
            placeholder: ws(s, "placeholder"),
            "aria-invalid": u,
            "aria-describedby": m ? `${i}-grouped` : void 0,
            value: typeof a == "number" ? String(a) : typeof a == "string" ? a : "",
            min: te(s, "min"),
            max: te(s, "max"),
            step: te(s, "step") ?? "any",
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
          invalid: u,
          required: s.required === !0,
          value: fs(Nn(a, m)),
          onChange: (o) => l(fs(o ?? ""))
        }
      );
    }
    case "select":
      return s.config?.multiple === !0 ? /* @__PURE__ */ e.jsx(
        Kn,
        {
          options: Ue(s),
          value: Array.isArray(a) ? a.map(String) : [],
          onChange: l,
          invalid: u,
          empty: typeof s.config?.empty == "string" ? s.config.empty : void 0,
          inTickOrder: s.config?.in_tick_order === !0
        }
      ) : /* @__PURE__ */ e.jsx(
        qn,
        {
          options: Ue(s),
          value: typeof a == "string" ? a : null,
          onChange: l,
          id: i,
          fill: d,
          empty: wn(Ue(s), s.required === !0, typeof s.config?.default == "string" && s.config.default !== "", typeof a == "string" && a !== "")
        }
      );
    case "terms": {
      const m = s.config?.multiple === !0, o = Array.isArray(a) ? a.filter((g) => typeof g == "number") : typeof a == "number" ? a : null;
      return /* @__PURE__ */ e.jsx(
        ta,
        {
          id: i,
          taxonomy: typeof s.taxonomy == "string" ? s.taxonomy : null,
          multiple: m,
          max: te(s, "max") ?? null,
          required: s.required === !0,
          invalid: u,
          value: m ? Array.isArray(o) ? o : [] : typeof o == "number" ? o : null,
          onChange: l
        }
      );
    }
    case "entries":
      return /* @__PURE__ */ e.jsx(
        Se,
        {
          id: i,
          invalid: u,
          multiple: s.config?.multiple === !0,
          max: te(s, "max") ?? null,
          collections: s.collections ?? [],
          onChange: l,
          value: typeof a == "number" || Array.isArray(a) && a.every((m) => typeof m == "number") ? a : null
        }
      );
    case "link":
      return /* @__PURE__ */ e.jsx(Wn, { label: Le(s), value: de(a), onChange: l, errors: c, id: i, collections: s.collections ?? [] });
    case "media":
      return /* @__PURE__ */ e.jsx(
        n.MediaPickerInput,
        {
          id: i,
          invalid: u,
          disabled: !1,
          multiple: s.config?.multiple === !0,
          max: te(s, "max") ?? null,
          types: Array.isArray(s.config?.types) ? s.config.types : [],
          value: typeof a == "number" || Array.isArray(a) && a.every((m) => typeof m == "number") ? a : null,
          onChange: l
        }
      );
    case "group":
      return /* @__PURE__ */ e.jsx(ue, { fields: s.fields ?? [], value: de(a), onChange: l, errors: c, id: i, content: r });
    case "repeater":
      return /* @__PURE__ */ e.jsx(Gn, { field: s, value: Array.isArray(a) ? a : [], onChange: l, errors: c, id: i, content: r });
    case "flexible":
      return /* @__PURE__ */ e.jsx(Jn, { field: s, value: Array.isArray(a) ? a : [], onChange: l, errors: c, id: i });
    default:
      return /* @__PURE__ */ e.jsx(
        n.Input,
        {
          id: i,
          "aria-invalid": u,
          value: typeof a == "string" ? a : "",
          placeholder: ws(s, "placeholder"),
          onChange: (m) => l(m.target.value)
        }
      );
  }
}
function te(s, a) {
  const l = s.config?.[a];
  return typeof l == "number" ? l : void 0;
}
function ws(s, a) {
  const l = s.config?.[a];
  return typeof l == "string" ? l : void 0;
}
function ue({ fields: s, value: a, onChange: l, errors: c, id: i, content: r, bare: d = !1 }) {
  return /* @__PURE__ */ e.jsx("div", { className: d ? "cms:flex cms:flex-col cms:gap-6" : "cms:flex cms:flex-col cms:gap-4 cms:rounded-lg cms:border cms:p-4", children: s.filter((u) => rs(u, a)).map((u) => u.shared ? (
    // Greyed out; the form says once, at the top, where to edit shared fields.
    /* @__PURE__ */ e.jsx("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1 cms:opacity-60", title: t("Shared by all languages: edit it in the main language."), children: /* @__PURE__ */ e.jsx(ne, { id: `${i}-${u.handle}`, field: u, value: a[u.handle], content: r, errors: {}, onChange: () => {
    } }) }, u.handle)
  ) : /* @__PURE__ */ e.jsx(
    ne,
    {
      id: `${i}-${u.handle}`,
      field: u,
      value: a[u.handle],
      content: r,
      errors: Y(c, u.handle),
      onChange: (m) => l({ ...a, [u.handle]: m })
    },
    u.handle
  )) });
}
function qn({ options: s, value: a, onChange: l, id: c, empty: i, fill: r = !1 }) {
  return /* @__PURE__ */ e.jsxs(n.Select, { value: a ?? Re, onValueChange: (d) => l(d === Re ? null : d), children: [
    /* @__PURE__ */ e.jsx(n.SelectTrigger, { id: c, className: r ? "cms:w-full" : "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
    /* @__PURE__ */ e.jsxs(n.SelectContent, { children: [
      i && /* @__PURE__ */ e.jsx(n.SelectItem, { value: Re, children: t("None") }),
      s.map((d) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: d.value, children: d.label }, d.value))
    ] })
  ] });
}
function Kn({ options: s, value: a, onChange: l, empty: c, inTickOrder: i = !1, invalid: r = !1 }) {
  return s.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: c ?? t("Nothing to choose from yet.") }) : /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2", children: s.map((d) => /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
    /* @__PURE__ */ e.jsx(
      n.Checkbox,
      {
        checked: a.includes(d.value),
        "aria-invalid": r || void 0,
        onCheckedChange: (u) => l(u ? i ? [...a.filter((m) => m !== d.value), d.value] : s.map((m) => m.value).filter((m) => m === d.value || a.includes(m)) : a.filter((m) => m !== d.value))
      }
    ),
    d.label,
    i && a.includes(d.value) && /* @__PURE__ */ e.jsxs("span", { className: "cms:text-xs cms:text-muted-foreground", "aria-label": `number ${a.indexOf(d.value) + 1}`, children: [
      "#",
      a.indexOf(d.value) + 1
    ] })
  ] }, d.value)) });
}
function Wn({ label: s, value: a, onChange: l, errors: c, id: i, collections: r }) {
  const d = a.type === "entry" ? "entry" : "url", u = (m) => {
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
        onClick: () => u({ type: m, url: m === "url" ? a.url : void 0, entry_id: m === "entry" ? a.entry_id : void 0 }),
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
          onChange: (m) => u({ url: m.target.value }),
          "aria-invalid": c.url !== void 0
        }
      ) : /* @__PURE__ */ e.jsx(
        Se,
        {
          id: i,
          invalid: c.entry_id !== void 0,
          multiple: !1,
          max: null,
          collections: r,
          value: typeof a.entry_id == "number" ? a.entry_id : null,
          onChange: (m) => u({ entry_id: typeof m == "number" ? m : void 0 })
        }
      ),
      /* @__PURE__ */ e.jsx(
        n.Input,
        {
          "aria-label": t(":field: link text", { field: s }),
          placeholder: t(d === "entry" ? "Link text (the entry's title)" : "Link text"),
          value: typeof a.label == "string" ? a.label : "",
          onChange: (m) => u({ label: m.target.value })
        }
      ),
      /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:h-9 cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx(n.Checkbox, { checked: a.new_tab === !0, onCheckedChange: (m) => u({ new_tab: m }) }),
        t("New tab")
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ e.jsx(O, { message: c.url ?? c.entry_id ?? c.label ?? c.type }) })
    ] })
  ] });
}
function Ss(s, a) {
  return !a && (s.fields ?? []).every((l) => l.type === "text");
}
function xa(s) {
  const a = M.useRef([]);
  return a.current = Dn(a.current, s), {
    keys: a.current,
    remove: (l) => {
      a.current = a.current.filter((c, i) => i !== l);
    },
    move: (l, c) => {
      a.current = n.moveItem(a.current, l, c);
    }
  };
}
function pa() {
  const [s, a] = M.useState(() => /* @__PURE__ */ new Set());
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
function ga({ keys: s, folding: a }) {
  if (s.length < 2) return null;
  const l = a.anyOpen(s);
  return /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => a.setAll(s, l), children: [
    l ? /* @__PURE__ */ e.jsx(Qa, {}) : /* @__PURE__ */ e.jsx(Za, {}),
    " ",
    t(l ? "Collapse all" : "Expand all")
  ] });
}
function Gn({ field: s, value: a, onChange: l, errors: c, id: i, content: r = !1 }) {
  const d = s.fields ?? [], u = a.map(de), m = xa(u.length), o = (f, j) => l(u.map((_, T) => T === f ? j : _)), g = (f) => {
    m.remove(f), l(u.filter((j, _) => _ !== f));
  }, x = s.label ? s.label.toLowerCase().replace(/s$/, "") : t("row"), h = x.charAt(0).toUpperCase() + x.slice(1), b = u.map((f, j) => ({ row: f, index: j, key: m.keys[j] ?? String(j) })), v = pa();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(
      n.SortableList,
      {
        items: b,
        getId: (f) => f.key,
        getLabel: (f) => `${x} ${f.index + 1}`,
        onReorder: (f, j, _) => {
          m.move(j, _), l(f.map((T) => T.row));
        },
        children: ({ row: f, index: j, key: _ }, { handle: T }) => Ss(s, r) ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(n.SortableHandle, { ...T, label: t("Move :item :number", { item: x, number: j + 1 }), className: "cms:mt-1" }),
          d.map((y) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
            /* @__PURE__ */ e.jsx(
              n.Input,
              {
                "aria-label": y.label || y.handle,
                placeholder: y.label || y.handle,
                value: typeof f[y.handle] == "string" ? f[y.handle] : "",
                onChange: (p) => o(j, { ...f, [y.handle]: p.target.value })
              }
            ),
            /* @__PURE__ */ e.jsx(O, { message: c[`${j}.${y.handle}`] })
          ] }, y.handle)),
          /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": t("Remove :item :number", { item: x, number: j + 1 }), onClick: () => g(j), children: /* @__PURE__ */ e.jsx(K, {}) })
        ] }) : (() => {
          const y = Y(c, String(j)), p = v.isCollapsed(_, Object.keys(y).length > 0);
          return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              fa,
              {
                label: `${h} ${j + 1}`,
                summary: ns(d, f),
                handle: T,
                onRemove: () => g(j),
                collapsed: p,
                onToggle: () => v.toggle(_),
                controls: `${i}-${j}-fields`,
                hidden: r ? f._hidden === !0 : void 0,
                onHidden: (z) => o(j, { ...f, _hidden: z })
              }
            ),
            /* @__PURE__ */ e.jsx("div", { id: `${i}-${j}-fields`, hidden: p, children: !p && /* @__PURE__ */ e.jsx(ue, { fields: d, value: f, onChange: (z) => o(j, z), errors: y, id: `${i}-${j}`, content: r }) })
          ] });
        })()
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", size: "sm", onClick: () => l([...u, r ? Sn() : {}]), children: [
        /* @__PURE__ */ e.jsx(J, {}),
        " ",
        t("Add :item", { item: x })
      ] }),
      !Ss(s, r) && /* @__PURE__ */ e.jsx(ga, { keys: b.map((f) => f.key), folding: v })
    ] })
  ] });
}
function Jn({ field: s, value: a, onChange: l, errors: c, id: i }) {
  const r = s.blocks ?? [], d = a.map(de), u = xa(d.length), m = (h, b) => l(d.map((v, f) => f === h ? b : v)), o = (h) => {
    u.remove(h), l(d.filter((b, v) => v !== h));
  }, g = d.map((h, b) => ({ block: h, index: b, key: u.keys[b] ?? String(b) })), x = pa();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    /* @__PURE__ */ e.jsx(
      n.SortableList,
      {
        items: g,
        getId: (h) => h.key,
        className: "cms:gap-3",
        getLabel: (h) => t(":type block", { type: r.find((b) => b.type === h.block.type)?.label ?? String(h.block.type) }),
        onReorder: (h, b, v) => {
          u.move(b, v), l(h.map((f) => f.block));
        },
        children: ({ block: h, index: b, key: v }, { handle: f }) => {
          const j = r.find((y) => y.type === h.type), _ = Y(c, `${b}.values`), T = x.isCollapsed(v, Object.keys(_).length > 0 || c[`${b}.type`] !== void 0);
          return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              fa,
              {
                label: j?.label ?? String(h.type),
                summary: j ? ns(j.fields, de(h.values)) : null,
                badge: !0,
                handle: f,
                onRemove: () => o(b),
                collapsed: T,
                onToggle: () => x.toggle(v),
                controls: `${i}-${b}-fields`,
                hidden: h.hidden === !0,
                onHidden: (y) => m(b, { ...h, hidden: y })
              }
            ),
            /* @__PURE__ */ e.jsx("div", { id: `${i}-${b}-fields`, hidden: T, children: T ? null : j ? /* @__PURE__ */ e.jsx(
              ue,
              {
                fields: j.fields,
                value: de(h.values),
                onChange: (y) => m(b, { ...h, values: y }),
                errors: _,
                id: `${i}-${b}`,
                content: !0
              }
            ) : /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: t("This kind of block no longer exists. Its values are kept.") }) }),
            /* @__PURE__ */ e.jsx(O, { message: c[`${b}.type`] })
          ] });
        }
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(n.DropdownMenu, { children: [
        /* @__PURE__ */ e.jsx(n.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", size: "sm", disabled: r.length === 0, children: [
          /* @__PURE__ */ e.jsx(J, {}),
          " ",
          t("Add block")
        ] }) }),
        /* @__PURE__ */ e.jsx(n.DropdownMenuContent, { align: "start", children: r.map((h) => /* @__PURE__ */ e.jsx(n.DropdownMenuItem, { onSelect: () => l([...d, Cn(h.type)]), children: h.label }, h.type)) })
      ] }),
      /* @__PURE__ */ e.jsx(ga, { keys: g.map((h) => h.key), folding: x })
    ] })
  ] });
}
function fa({ label: s, summary: a, badge: l = !1, handle: c, onRemove: i, collapsed: r, onToggle: d, controls: u, hidden: m, onHidden: o }) {
  const g = r ? Ne : Ys, x = a ? `${s}: ${a}` : s;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(n.SortableHandle, { ...c, label: t("Move :title", { title: x }) }),
    /* @__PURE__ */ e.jsxs(
      "button",
      {
        type: "button",
        onClick: d,
        "aria-expanded": !r,
        "aria-controls": u,
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
      /* @__PURE__ */ e.jsx(n.Switch, { checked: !m, onCheckedChange: (h) => o(!h), "aria-label": t(":title: visible on site", { title: x }) }),
      t("Visible on site")
    ] }),
    /* @__PURE__ */ e.jsx(
      n.Button,
      {
        type: "button",
        variant: "ghost",
        size: "icon",
        className: "cms:size-8 cms:shrink-0 cms:text-destructive",
        "aria-label": t("Remove :title", { title: x }),
        onClick: i,
        children: /* @__PURE__ */ e.jsx(K, {})
      }
    )
  ] });
}
function ja({ fields: s, onChange: a, types: l, errors: c, depth: i = 1, idPrefix: r = "field", reserved: d, locales: u = [] }) {
  const [m, o] = M.useState(() => /* @__PURE__ */ new Set()), g = (j) => o((_) => {
    const T = new Set(_);
    return T.has(j) ? T.delete(j) : T.add(j), T;
  }), x = (j, _) => a(s.map((T, y) => y === j ? _ : T)), h = (j) => {
    const _ = Ln(j.type, j.label, s);
    a([...s, _]), o(/* @__PURE__ */ new Set([_.key]));
  }, [b, v] = M.useState(""), f = (j) => {
    const _ = Fn(s, j, d, t);
    _ && (a(_.fields), o(/* @__PURE__ */ new Set([_.copy.key])), v(t(":title duplicated as :copy, below it.", { title: s[j]?.label || s[j]?.handle || "", copy: _.copy.label ?? _.copy.handle })));
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:border-dashed cms:p-4 cms:text-sm cms:text-muted-foreground", children: t("No fields yet.") }),
    s.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:justify-end", children: m.size > 0 ? /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => o(/* @__PURE__ */ new Set()), children: t("Close all") }) : /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => o(new Set(s.map((j) => j.key))), children: t("Open all") }) }),
    /* @__PURE__ */ e.jsx(n.SortableList, { items: s, getId: (j) => j.key, getLabel: (j) => j.label || j.handle, onReorder: (j) => a(j), children: (j, { index: _, handle: T, isOverlay: y }) => {
      const p = l.find((L) => L.type === j.type), z = Ce(c, String(_)) || oa(j, s, d) !== null, k = !y && (m.has(j.key) || z), F = `${r}-${j.key}`;
      return /* @__PURE__ */ e.jsxs("div", { "data-invalid": z ? "true" : void 0, className: `cms:rounded-lg cms:border cms:bg-card ${z ? "cms:border-destructive" : ""}`, children: [
        /* @__PURE__ */ e.jsx(
          Qn,
          {
            field: j,
            type: p,
            index: _,
            expanded: k,
            controls: F,
            handle: T,
            shared: u.length > 0,
            onToggle: () => g(j.key),
            onDuplicate: () => f(_),
            onRemove: () => a(s.filter((L, S) => S !== _))
          }
        ),
        k && /* @__PURE__ */ e.jsx(
          Zn,
          {
            id: F,
            field: j,
            type: p,
            siblings: s,
            onChange: (L) => x(_, L),
            types: l,
            errors: me(c, String(_)),
            depth: i,
            reserved: d,
            locales: u
          }
        )
      ] });
    } }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:sr-only", "aria-live": "polite", children: b }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(n.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(n.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", size: "sm", children: [
        /* @__PURE__ */ e.jsx(J, {}),
        " ",
        t("Add field")
      ] }) }),
      /* @__PURE__ */ e.jsx(n.DropdownMenuContent, { align: "start", children: l.filter((j) => !j.hasChildren || i < Mn).map((j) => /* @__PURE__ */ e.jsx(n.DropdownMenuItem, { onSelect: () => h(j), children: j.label }, j.type)) })
    ] }) })
  ] });
}
const Yn = {
  text: yn,
  textarea: jn,
  rich_text: sn,
  number: an,
  toggle: bn,
  date: Ya,
  select: wt,
  media: nn,
  entries: mn,
  terms: Ut,
  link: bt,
  group: tn,
  repeater: xn,
  flexible: Ja,
  fieldset: hn,
  file: un
};
function Qn({ field: s, type: a, expanded: l, controls: c, handle: i, shared: r, onToggle: d, onDuplicate: u, onRemove: m }) {
  const o = s.label || s.handle, g = Yn[s.type] ?? gn, x = s.type === "fieldset", h = x ? typeof s.config?.fieldset == "string" ? s.config.fieldset : "" : s.handle, b = r && !x && !da(s, a?.translatable ?? !1);
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
        children: /* @__PURE__ */ e.jsx(Ne, { "aria-hidden": !0, className: `cms:size-4 cms:transition-transform cms:duration-200 ${l ? "cms:rotate-90" : ""}` })
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { role: "presentation", onClick: d, className: "cms:flex cms:min-w-0 cms:flex-1 cms:cursor-pointer cms:flex-wrap cms:items-center cms:gap-x-2.5 cms:gap-y-1 cms:py-0.5", children: [
      /* @__PURE__ */ e.jsxs("span", { className: "cms:inline-flex cms:shrink-0 cms:items-center cms:gap-1 cms:rounded-md cms:bg-muted cms:px-1.5 cms:py-0.5 cms:text-xs cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsx(g, { "aria-hidden": !0, className: "cms:size-3.5" }),
        a?.label ?? s.type
      ] }),
      /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:min-w-0 cms:max-w-full cms:flex-col cms:gap-x-2 cms:sm:flex-row cms:sm:items-baseline", children: [
        /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: o }),
        h !== "" && h !== o && /* @__PURE__ */ e.jsx("code", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", title: t(x ? "Fieldset" : "Handle"), children: h })
      ] }),
      (s.required || b || s.condition || a?.hasChildren && s.fields.length > 0 && !l) && /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-1", children: [
        s.required && /* @__PURE__ */ e.jsx(n.Badge, { variant: "outline", className: "cms:font-normal", children: t("Required") }),
        b && /* @__PURE__ */ e.jsx(n.Badge, { variant: "outline", className: "cms:font-normal", title: t("One value shared by every language."), children: t("Shared") }),
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
        onClick: u,
        children: /* @__PURE__ */ e.jsx(at, {})
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
        children: /* @__PURE__ */ e.jsx(K, {})
      }
    )
  ] });
}
function Zn({ id: s, field: a, type: l, siblings: c, onChange: i, types: r, errors: d, depth: u, reserved: m, locales: o }) {
  const g = a.config ?? {}, x = oa(a, c, m, t);
  if (a.type === "fieldset")
    return /* @__PURE__ */ e.jsxs("div", { id: s, className: "cms:flex cms:flex-col cms:gap-4 cms:border-t cms:p-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(n.Label, { htmlFor: `${s}-label`, children: t("Label") }),
          /* @__PURE__ */ e.jsx(n.Input, { id: `${s}-label`, value: a.label ?? "", onChange: (f) => i(vs(a, f.target.value, c)) }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("Only shown here, in the builder.") })
        ] }),
        l?.settings.map((f) => /* @__PURE__ */ e.jsx(
          ne,
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
      /* @__PURE__ */ e.jsx(O, { message: d.handle ?? d.type })
    ] });
  const h = Hn(l?.settings ?? []), b = (f, j = !1) => /* @__PURE__ */ e.jsx(
    ne,
    {
      id: `${s}-config-${f.handle}`,
      field: f,
      value: g[f.handle],
      fill: j,
      errors: Y(d, `config.${f.handle}`),
      onChange: (_) => i({ ...a, config: { ...g, [f.handle]: _ } })
    },
    f.handle
  ), v = d.validation ?? Object.entries(d).find(([f]) => f.startsWith("validation."))?.[1];
  return /* @__PURE__ */ e.jsxs("div", { id: s, className: "cms:flex cms:flex-col cms:gap-5 cms:border-t cms:p-4", children: [
    !l && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t(`The field type ":type" isn't registered. Its data is kept; register the type or remove the field.`, { type: a.type }) }),
    /* @__PURE__ */ e.jsxs(ze, { title: t("Basics"), children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:items-start cms:gap-4 cms:md:grid-cols-2", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(n.Label, { htmlFor: `${s}-label`, children: t("Label") }),
          /* @__PURE__ */ e.jsx(n.Input, { id: `${s}-label`, value: a.label ?? "", onChange: (f) => i(vs(a, f.target.value, c)) }),
          /* @__PURE__ */ e.jsx(O, { message: d.label })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(n.Label, { htmlFor: `${s}-handle`, children: t("Handle") }),
          /* @__PURE__ */ e.jsx(
            n.Input,
            {
              id: `${s}-handle`,
              className: "cms:font-mono",
              value: a.handle,
              onChange: (f) => i({ ...a, handle: cs(f.target.value), handleTouched: !0 })
            }
          ),
          He(a) === null && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("How templates read it. Renaming it hides values saved under the old one.") }),
          /* @__PURE__ */ e.jsx("div", { "aria-live": "polite", children: He(a) !== null && /* @__PURE__ */ e.jsx(Xt, { children: Cs(
            t("Content saved under :old won't show under :new, and templates reading :old get nothing. To rename it with its content: put back :old, save, then run :command."),
            { old: He(a) ?? "", new: a.handle || "…", command: "php artisan sunrice:rename-field" }
          ) }) }),
          /* @__PURE__ */ e.jsx(O, { message: d.handle ?? x ?? void 0 })
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
        /* @__PURE__ */ e.jsx(O, { message: d.instructions })
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
                checked: da(a, l?.translatable ?? !1),
                "aria-describedby": `${s}-translatable-help`,
                onCheckedChange: (f) => i(An(a, f, l?.translatable ?? !1))
              }
            ),
            /* @__PURE__ */ e.jsx(n.Label, { htmlFor: `${s}-translatable`, children: t("Translatable") })
          ] }),
          /* @__PURE__ */ e.jsx("p", { id: `${s}-translatable-help`, className: "cms:text-sm cms:text-muted-foreground", children: t("Each language gets its own value. Off: one value shared by every language.") })
        ] })
      ] })
    ] }),
    h.options.length > 0 && /* @__PURE__ */ e.jsx(ze, { title: t("Options"), children: h.options.map((f) => (h.dependents[f.handle]?.length ?? 0) > 0 ? /* @__PURE__ */ e.jsx(
      Xn,
      {
        id: s,
        toggle: f,
        dependents: h.dependents[f.handle] ?? [],
        config: g,
        errors: d,
        onChange: (j) => i({ ...a, config: { ...g, ...j } })
      },
      f.handle
    ) : b(f, !0)) }),
    h.limits.length > 0 && /* @__PURE__ */ e.jsx(ze, { title: t("Limits and defaults"), children: /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:grid-cols-1 cms:items-start cms:gap-4 cms:min-[420px]:grid-cols-2 cms:lg:grid-cols-4", children: h.limits.map((f) => /* @__PURE__ */ e.jsx("div", { className: "cms:min-w-0", children: b(f, !0) }, f.handle)) }) }),
    /* @__PURE__ */ e.jsx(tl, { id: s, field: a, siblings: c, onChange: i, errors: me(d, "condition") }),
    o.length > 0 && /* @__PURE__ */ e.jsx(el, { id: s, field: a, locales: o, onChange: i, errors: me(d, "translations") }),
    /* @__PURE__ */ e.jsxs("details", { className: "cms:group cms:rounded-lg cms:border cms:p-3", open: (a.validation ?? []).some((f) => f.trim() !== "") || v !== void 0, children: [
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
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: Cs(t("Optional checks, one per line, such as :email or :max (for developers: Laravel validation rules)."), { email: "email", max: "max:100" }) }),
        /* @__PURE__ */ e.jsx(O, { message: v })
      ] })
    ] }),
    l?.hasChildren && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(n.Label, { children: t("Fields inside") }),
      /* @__PURE__ */ e.jsx(
        ja,
        {
          fields: a.fields,
          onChange: (f) => i({ ...a, fields: f }),
          types: r,
          errors: me(d, "fields"),
          depth: u + 1,
          idPrefix: s,
          locales: o
        }
      ),
      /* @__PURE__ */ e.jsx(O, { message: d.fields })
    ] }),
    /* @__PURE__ */ e.jsx(O, { message: d.type })
  ] });
}
function Xn({ id: s, toggle: a, dependents: l, config: c, errors: i, onChange: r }) {
  const d = c[a.handle] === !0, u = `${s}-config-${a.handle}`, m = [a, ...l].map((o) => Y(i, `config.${o.handle}`)[""]).filter((o) => o !== void 0);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-h-9 cms:flex-wrap cms:items-center cms:gap-x-6 cms:gap-y-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(n.Switch, { id: u, checked: d, onCheckedChange: (o) => r({ [a.handle]: o }) }),
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: u, children: a.label || a.handle })
      ] }),
      d && l.map((o) => {
        const g = `${s}-config-${o.handle}`, x = c[o.handle];
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
              value: typeof x == "number" || typeof x == "string" ? String(x) : "",
              onChange: (h) => r({ [o.handle]: h.target.value === "" ? null : Number(h.target.value) })
            }
          ),
          o.instructions && /* @__PURE__ */ e.jsx("span", { id: `${g}-help`, className: "cms:text-sm cms:text-muted-foreground", children: o.instructions })
        ] }, o.handle) : /* @__PURE__ */ e.jsx("div", { className: "cms:basis-full", children: /* @__PURE__ */ e.jsx(ne, { id: g, field: o, value: x, fill: !0, errors: Y(i, `config.${o.handle}`), onChange: (h) => r({ [o.handle]: h }) }) }, o.handle);
      })
    ] }),
    a.instructions && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: a.instructions }),
    m.map((o) => /* @__PURE__ */ e.jsx(O, { message: o }, o))
  ] });
}
function ze({ title: s, children: a }) {
  const l = M.useId();
  return /* @__PURE__ */ e.jsxs("section", { "aria-labelledby": l, className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx("h4", { id: l, className: "cms:text-xs cms:font-semibold cms:uppercase cms:tracking-wide cms:text-muted-foreground", children: s }),
    a
  ] });
}
function el({ id: s, field: a, locales: l, onChange: c, errors: i }) {
  const r = a.translations ?? {}, d = a.type === "select" && Array.isArray(a.config?.options) ? a.config.options.filter((o) => typeof o?.value == "string" && o.value !== "") : [], u = (o, g) => {
    const x = { ...r, [o]: { ...r[o], ...g } };
    c({ ...a, translations: x });
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
            onChange: (x) => u(o, { label: x.target.value })
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
            onChange: (x) => u(o, { instructions: x.target.value })
          }
        )
      ] }),
      d.length > 0 && /* @__PURE__ */ e.jsxs("fieldset", { className: "cms:flex cms:flex-col cms:gap-2 cms:md:col-span-2", children: [
        /* @__PURE__ */ e.jsxs("legend", { className: "cms:text-sm cms:font-medium", children: [
          "Options (",
          g,
          ")"
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-2 cms:sm:grid-cols-2", children: d.map((x) => {
          const h = String(x.value);
          return /* @__PURE__ */ e.jsx(
            n.Input,
            {
              "aria-label": `${h} (${g})`,
              value: r[o]?.options?.[h] ?? "",
              placeholder: typeof x.label == "string" && x.label !== "" ? x.label : h,
              onChange: (b) => u(o, { options: { ...r[o]?.options, [h]: b.target.value } })
            },
            h
          );
        }) })
      ] })
    ] }, o)) }),
    /* @__PURE__ */ e.jsx(O, { message: m })
  ] });
}
function sl(s) {
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
function tl({ id: s, field: a, siblings: l, onChange: c, errors: i }) {
  const r = In(a, l), d = ua(a.condition), u = ha(a.condition), m = (h, b = u) => c({ ...a, condition: On(h, b) }), o = (h, b) => m(d.map((v, f) => f === h ? { ...v, ...b } : v)), g = () => {
    const h = r.find((b) => !d.some((v) => v.field === b.handle)) ?? r[0];
    h && m([...d, { field: h.handle, operator: "equals", value: ks(Ve(h)) }]);
  }, x = (h) => {
    const b = d.length > 1 || "rules" in (a.condition ?? {}) ? me(i, `rules.${h}`) : i;
    return b.field ?? b.operator ?? b.value;
  };
  return r.length === 0 && d.length === 0 ? null : /* @__PURE__ */ e.jsxs(ze, { title: t("Visibility"), children: [
    d.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("Always shown.") }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      d.length > 1 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx("span", { id: `${s}-match-label`, children: t("Show when") }),
        /* @__PURE__ */ e.jsxs(n.Select, { value: u, onValueChange: (h) => m(d, h === "any" ? "any" : "all"), children: [
          /* @__PURE__ */ e.jsx(n.SelectTrigger, { "aria-labelledby": `${s}-match-label`, className: "cms:h-8 cms:w-auto", children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
          /* @__PURE__ */ e.jsxs(n.SelectContent, { children: [
            /* @__PURE__ */ e.jsx(n.SelectItem, { value: "all", children: t("All of these") }),
            /* @__PURE__ */ e.jsx(n.SelectItem, { value: "any", children: t("Any of these") })
          ] })
        ] }),
        /* @__PURE__ */ e.jsx("span", { children: t("are true:") })
      ] }),
      /* @__PURE__ */ e.jsx("ul", { className: "cms:flex cms:flex-col cms:gap-2", children: d.map((h, b) => {
        const v = l.find((T) => T.handle === h.field && T.key !== a.key), f = Oe.find((T) => T.value === h.operator) ?? Oe[0], j = Ve(v), _ = x(b);
        return /* @__PURE__ */ e.jsxs("li", { className: "cms:flex cms:flex-col cms:gap-1", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-start cms:gap-2", children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:flex cms:h-9 cms:w-20 cms:shrink-0 cms:items-center cms:text-sm cms:text-muted-foreground", children: t(b === 0 ? "Only when" : u === "any" ? "or" : "and") }),
            /* @__PURE__ */ e.jsxs(n.Select, { value: h.field, onValueChange: (T) => {
              const y = l.find((p) => p.handle === T);
              o(b, { field: T, value: ks(Ve(y)) });
            }, children: [
              /* @__PURE__ */ e.jsx(n.SelectTrigger, { id: b === 0 ? `${s}-condition` : void 0, "aria-label": t("Field"), className: "cms:w-48", children: /* @__PURE__ */ e.jsx(n.SelectValue, { placeholder: h.field }) }),
              /* @__PURE__ */ e.jsx(n.SelectContent, { children: r.map((T) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: T.handle, children: T.label || T.handle }, T.key)) })
            ] }),
            /* @__PURE__ */ e.jsxs(n.Select, { value: f.value, onValueChange: (T) => o(b, { operator: T }), children: [
              /* @__PURE__ */ e.jsx(n.SelectTrigger, { "aria-label": t("How to compare"), className: "cms:w-36", children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
              /* @__PURE__ */ e.jsx(n.SelectContent, { children: Oe.map((T) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: T.value, children: sl(T.value) }, T.value)) })
            ] }),
            f.needsValue && /* @__PURE__ */ e.jsx("div", { className: "cms:min-w-48 cms:flex-1 cms:sm:max-w-72", children: /* @__PURE__ */ e.jsx(
              al,
              {
                id: `${s}-rule-${b}-value`,
                input: j,
                value: h.value ?? null,
                invalid: _ !== void 0,
                onChange: (T) => o(b, { value: T })
              }
            ) }),
            /* @__PURE__ */ e.jsx(
              n.Button,
              {
                type: "button",
                variant: "ghost",
                size: "icon",
                className: "cms:ml-auto cms:size-9 cms:text-muted-foreground hover:cms:text-destructive",
                "aria-label": t("Remove condition :number", { number: String(b + 1) }),
                title: t("Remove condition"),
                onClick: () => m(d.filter((T, y) => y !== b)),
                children: /* @__PURE__ */ e.jsx(we, {})
              }
            )
          ] }),
          /* @__PURE__ */ e.jsx(O, { message: _ })
        ] }, b);
      }) })
    ] }),
    r.length > 0 && /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", size: "sm", onClick: g, children: [
      /* @__PURE__ */ e.jsx(J, {}),
      " ",
      t("Add condition")
    ] }) }),
    d.length > 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("A hidden field isn't required, and keeps what it had.") }),
    /* @__PURE__ */ e.jsx(O, { message: i[""] ?? i.rules ?? i.match })
  ] });
}
function al({ id: s, input: a, value: l, invalid: c, onChange: i }) {
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
        ta,
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
        Se,
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
function Cs(s, a) {
  return s.split(/(:[a-z_]+)/).map((l, c) => {
    const i = a[l.slice(1)];
    return l.startsWith(":") && i !== void 0 ? /* @__PURE__ */ e.jsx("code", { children: i }, c) : l;
  });
}
function nl(s, a) {
  return t(s === "fieldset" ? a ? "A short name for this fieldset, set when it was created: flexible blocks keep it with what they hold." : "A short name for this fieldset. It can't change later: flexible blocks keep it with what they hold." : a ? "A short name for this blueprint. Changing it updates the collections, taxonomies, global sets, forms and entries that use it." : "A short name for this blueprint, used by the collections, taxonomies, global sets and forms that pick it.");
}
function ll({ kind: s, handle: a }) {
  const l = a !== "" ? a : s === "fieldset" ? "address" : "article", c = s === "fieldset" ? `['type' => 'fieldset', 'config' => ['fieldset' => '${l}']]` : `Blueprint::where('handle', '${l}')`;
  return /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
    /* @__PURE__ */ e.jsx("span", { className: "cms:font-medium", children: t("For developers:") }),
    " ",
    t(s === "fieldset" ? "In a blueprint definition:" : "In code:"),
    " ",
    /* @__PURE__ */ e.jsx("code", { className: "cms:rounded cms:bg-muted cms:px-1 cms:py-0.5 cms:font-mono cms:text-[0.8125rem] cms:break-words cms:text-foreground", children: c })
  ] });
}
function $s({ kind: s = "blueprint", blueprint: a, fieldTypes: l, locales: c = [], usedBy: i = [], reserved: r = [] }) {
  const d = s === "fieldset", u = I(d ? "cms/fieldsets" : "cms/blueprints"), m = a ? a.title : t(d ? "New fieldset" : "New blueprint");
  n.useBreadcrumbs([{ label: t(d ? "Fieldsets" : "Blueprints"), href: u }, { label: m }]);
  const [o, g] = re(), x = C.useForm({ title: a?.title ?? "", handle: a?.handle ?? "" }), [h, b] = M.useState(a !== null), [v, f] = M.useState(() => ca(a?.fields)), j = (S) => l.find((P) => P.type === S)?.hasChildren === !0, _ = x.errors, [T, y] = M.useState(() => JSON.stringify(v)), p = x.isDirty || JSON.stringify(v) !== T, z = () => {
    x.setDefaults();
    const S = ia(v);
    f(S), y(JSON.stringify(S));
  }, k = () => {
    if (x.processing) return;
    x.transform((P) => ({
      // A blueprint's handle can change (RenameBlueprint); a fieldset's can't: flexible blocks store it.
      ...a ? s === "blueprint" ? { title: P.title, handle: P.handle } : { title: P.title } : P,
      fields: ra(v, j)
    }));
    const S = () => window.requestAnimationFrame(() => document.querySelector('[data-invalid="true"]')?.scrollIntoView({ block: "center", behavior: "smooth" }));
    a ? x.put(`${u}/${a.handle}`, { preserveScroll: !0, onSuccess: z, onError: S }) : x.post(u, { onSuccess: z, onError: S });
  }, F = (S) => {
    S.preventDefault(), k();
  };
  n.useUnsavedChanges(p, k);
  const L = () => a && o(
    d ? t('Delete the fieldset ":title"? Content keeps its values.', { title: a.title }) : t('Delete the blueprint ":title"? Content keeps its values.', { title: a.title }),
    () => C.router.delete(`${u}/${a.handle}`, { preserveScroll: !0 })
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: F, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: m }),
    g,
    /* @__PURE__ */ e.jsx(
      n.PageHeader,
      {
        title: m,
        back: { href: u, label: t(d ? "Back to fieldsets" : "Back to blueprints") },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          a && /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "outline", size: "icon", className: "cms:text-destructive", "aria-label": t("Delete :title", { title: m }), onClick: L, children: /* @__PURE__ */ e.jsx(K, {}) }),
          /* @__PURE__ */ e.jsxs(n.Button, { type: "submit", disabled: x.processing, children: [
            x.processing && /* @__PURE__ */ e.jsx(ce, { className: "cms:animate-spin" }),
            t(a ? "Save" : d ? "Create fieldset" : "Create blueprint")
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(O, { message: _.blueprint ?? _.fieldset }),
    /* @__PURE__ */ e.jsx(n.Card, { children: /* @__PURE__ */ e.jsxs(n.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "title", children: t("Title") }),
        /* @__PURE__ */ e.jsx(n.Input, { id: "title", value: x.data.title, required: !0, onChange: (S) => {
          x.setData((P) => ({ ...P, title: S.target.value, handle: h ? P.handle : na(S.target.value) }));
        } }),
        /* @__PURE__ */ e.jsx(O, { message: _.title })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "handle", children: t("Handle") }),
        /* @__PURE__ */ e.jsx(
          n.Input,
          {
            id: "handle",
            className: "cms:font-mono",
            value: x.data.handle,
            disabled: a !== null && s === "fieldset",
            required: !0,
            spellCheck: !1,
            onChange: (S) => {
              b(!0), x.setData("handle", cs(S.target.value));
            }
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: nl(s, a !== null) }),
        /* @__PURE__ */ e.jsx(ll, { kind: s, handle: x.data.handle }),
        /* @__PURE__ */ e.jsx("div", { "aria-live": "polite", children: a !== null && s === "blueprint" && x.data.handle !== "" && x.data.handle !== a.handle && /* @__PURE__ */ e.jsx(Xt, { id: "handle-warning", children: t(`Changing the handle can break code. Sunrice updates the collections, taxonomies, global sets, forms and entries that use ":old". You update code that names it (Blueprint::where('handle', ':old')) and structure exports made before.`, { old: a.handle }) }) }),
        /* @__PURE__ */ e.jsx(O, { message: _.handle })
      ] })
    ] }) }),
    i.length > 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("Used by :list. Changes show there at once.", { list: i.join(", ") }) }),
    /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-3", "aria-labelledby": "fields-heading", children: [
      /* @__PURE__ */ e.jsx("h2", { id: "fields-heading", className: "cms:text-lg cms:font-medium", children: t("Fields") }),
      /* @__PURE__ */ e.jsx(ja, { fields: v, onChange: f, types: l, errors: me(_, "fields"), reserved: s === "blueprint" ? r : void 0, locales: c.slice(1) }),
      /* @__PURE__ */ e.jsx(O, { message: _.fields })
    ] })
  ] });
}
function ba({ kind: s, base: a, rows: l, intro: c }) {
  const i = s === "blueprint", r = t(i ? "Blueprints" : "Fieldsets");
  n.useBreadcrumbs([{ label: r }]);
  const [d, u] = re();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: r }),
    u,
    /* @__PURE__ */ e.jsx(n.PageHeader, { title: r, description: c, actions: /* @__PURE__ */ e.jsx(n.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(C.Link, { href: `${a}/create`, children: [
      /* @__PURE__ */ e.jsx(J, {}),
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
              children: /* @__PURE__ */ e.jsx(K, {})
            }
          ) })
        ] }, m.id))
      ] })
    ] }) })
  ] });
}
function cl({ blueprints: s }) {
  const a = C.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(O, { message: a.blueprint }),
    /* @__PURE__ */ e.jsx(
      ba,
      {
        kind: "blueprint",
        base: I("cms/blueprints"),
        rows: s,
        intro: t("The fields editors fill in, for each kind of content.")
      }
    )
  ] });
}
const qe = (s) => s.includes("::") ? s : `${s.replace(/\./g, "/")}.blade.php`;
function rl(s, a) {
  const l = s.trim();
  return l !== "" ? a?.own?.view === l && !a.own.exists ? null : l : a?.fallbacks.find((c) => c.exists)?.view ?? null;
}
function Ke({ file: s }) {
  const a = s.split("/");
  return /* @__PURE__ */ e.jsx("code", { className: "cms:whitespace-normal cms:break-normal", children: a.map((l, c) => /* @__PURE__ */ e.jsxs(M.Fragment, { children: [
    l,
    c < a.length - 1 && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      "/",
      /* @__PURE__ */ e.jsx("wbr", {})
    ] })
  ] }, c)) });
}
function va({ example: s, empty: a, value: l = "", lookup: c = null }) {
  const i = l.trim(), r = rl(l, c), d = c?.fallbacks ?? [], u = /* @__PURE__ */ e.jsx("span", { className: "cms:ml-1 cms:rounded cms:bg-muted cms:px-1 cms:text-[0.65rem] cms:font-medium cms:text-foreground", children: t("in use") });
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1 cms:text-xs cms:leading-relaxed cms:text-muted-foreground", children: [
    /* @__PURE__ */ e.jsx("p", { children: a }),
    /* @__PURE__ */ e.jsxs("details", { className: "cms:group", children: [
      /* @__PURE__ */ e.jsx("summary", { className: "cms:w-fit cms:cursor-pointer cms:select-none cms:rounded-sm cms:underline-offset-4 hover:cms:underline focus-visible:cms:outline-2 focus-visible:cms:outline-ring", children: t("Which file?") }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:mt-1.5 cms:flex cms:flex-col cms:gap-1.5", children: [
        i !== "" && /* @__PURE__ */ e.jsxs("p", { children: [
          /* @__PURE__ */ e.jsx(Ke, { file: qe(i) }),
          c?.own?.view === i ? c.own.exists ? u : /* @__PURE__ */ e.jsx("span", { className: "cms:ml-1 cms:text-destructive", children: t("not found") }) : null
        ] }),
        /* @__PURE__ */ e.jsx("p", { children: t(i !== "" ? "Without it, the first that exists:" : "The first that exists:") }),
        /* @__PURE__ */ e.jsxs("ol", { className: "cms:ml-4 cms:list-decimal cms:space-y-0.5", children: [
          d.map((m) => /* @__PURE__ */ e.jsxs("li", { children: [
            /* @__PURE__ */ e.jsx(Ke, { file: qe(m.view) }),
            r === m.view && i === "" && u
          ] }, m.view)),
          /* @__PURE__ */ e.jsxs("li", { children: [
            t("the built-in template"),
            r === null && u
          ] })
        ] }),
        /* @__PURE__ */ e.jsx("p", { children: t("Files are under resources/views; a name like :example is :file.", { example: "\0", file: "" }).split(/(\u0000|\u0001)/).map((m, o) => m === "\0" ? /* @__PURE__ */ e.jsx("code", { children: s }, o) : m === "" ? /* @__PURE__ */ e.jsx(Ke, { file: qe(s) }, o) : m) })
      ] })
    ] })
  ] });
}
const _s = { preserveScroll: !0, preserveState: !0 };
function il({ entryId: s, comments: a }) {
  const [l, c] = M.useState(null), [i, r] = M.useState(""), [d, u] = M.useState(!1), m = (g, x) => C.router.post(I(`cms/comments/${g}/status`), { status: x }, _s), o = (g) => C.router.post(I(`cms/comments/${g}/reply`), { body: i }, {
    ..._s,
    onStart: () => u(!0),
    onFinish: () => u(!1),
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
            q(g.createdAt),
            g.reply ? ` · ${t("a reply")}` : ""
          ] }),
          a.canModerate && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-1", children: [
            g.status === "pending" && /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", size: "sm", onClick: () => m(g.id, "approved"), children: [
              /* @__PURE__ */ e.jsx(be, {}),
              " ",
              t("Approve")
            ] }),
            /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => m(g.id, "spam"), children: [
              /* @__PURE__ */ e.jsx(es, {}),
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
                  /* @__PURE__ */ e.jsx($t, {}),
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
                onChange: (x) => r(x.target.value)
              }
            ),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
              /* @__PURE__ */ e.jsx(n.Button, { type: "button", size: "sm", disabled: i.trim() === "" || d, onClick: () => o(g.id), children: t("Post reply") }),
              /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => c(null), children: t("Cancel") })
            ] })
          ] })
        ] }, g.id)),
        /* @__PURE__ */ e.jsx("a", { href: I(`cms/comments?entry=${s}`), className: "cms:text-sm cms:font-medium cms:underline-offset-4 cms:hover:underline", children: t("All comments on this entry") })
      ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Skeleton, { className: "cms:h-10" }),
        /* @__PURE__ */ e.jsx(n.Skeleton, { className: "cms:h-10" })
      ] })
    }
  );
}
const ya = "cms:flex cms:flex-col cms:gap-1 cms:opacity-60";
function is({ fields: s, values: a, onChange: l, errors: c, storageKey: i, shared: r = [], sharedValues: d = {}, sharedNote: u, disabled: m = !1 }) {
  const o = [], g = { ...d, ...a };
  for (const h of s.filter((b) => rs(b, g))) {
    const b = o[o.length - 1];
    h.type === "group" ? o.push(h) : Array.isArray(b) ? b.push(h) : o.push([h]);
  }
  const x = u && (r.length > 0 || Be(s)) ? /* @__PURE__ */ e.jsx("p", { role: "note", className: "cms:rounded-lg cms:border cms:border-dashed cms:px-3 cms:py-2 cms:text-sm cms:text-muted-foreground", children: u }) : null;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    x,
    o.map((h) => {
      if (Array.isArray(h))
        return /* @__PURE__ */ e.jsx(n.Card, { children: /* @__PURE__ */ e.jsx(n.CardContent, { children: /* @__PURE__ */ e.jsx("fieldset", { disabled: m, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: h.map((j) => r.includes(j.handle) ? /* @__PURE__ */ e.jsx("fieldset", { disabled: !0, className: ya, title: t("Shared by all languages"), children: /* @__PURE__ */ e.jsx(ne, { id: `data-${j.handle}`, field: j, content: !0, value: d[j.handle], errors: {}, onChange: () => {
        } }) }, j.handle) : /* @__PURE__ */ e.jsx(
          ne,
          {
            id: `data-${j.handle}`,
            field: j,
            content: !0,
            value: a[j.handle],
            errors: Y(c, `data.${j.handle}`),
            onChange: (_) => l(j.handle, _)
          },
          j.handle
        )) }) }) }, `fields-${h[0]?.handle ?? ""}`);
      const b = r.includes(h.handle), v = (b ? d : a)[h.handle], f = Y(c, `data.${h.handle}`);
      return /* @__PURE__ */ e.jsx(
        n.CollapsibleCard,
        {
          title: Le(h),
          titleClassName: "cms:text-base",
          description: h.instructions ?? void 0,
          storageKey: `${i}:${h.handle}`,
          hasErrors: !b && Ce(c, `data.${h.handle}`),
          children: /* @__PURE__ */ e.jsxs(
            "fieldset",
            {
              disabled: b || m,
              role: "group",
              "aria-label": Le(h),
              className: `cms:flex cms:flex-col cms:gap-2 ${b ? "cms:opacity-60" : ""}`,
              title: b ? t("Shared by all languages") : void 0,
              children: [
                /* @__PURE__ */ e.jsx(
                  ue,
                  {
                    bare: !0,
                    fields: h.fields ?? [],
                    id: `data-${h.handle}`,
                    content: !0,
                    errors: b ? {} : f,
                    value: v && typeof v == "object" && !Array.isArray(v) ? v : {},
                    onChange: (j) => l(h.handle, j)
                  }
                ),
                /* @__PURE__ */ e.jsx(O, { message: b ? void 0 : f[""] })
              ]
            }
          )
        },
        h.handle
      );
    })
  ] });
}
function Na({ note: s, redirectsUrl: a }) {
  return /* @__PURE__ */ e.jsx("div", { "aria-live": "polite", children: s !== null && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-xs cms:text-muted-foreground", children: [
    t(s === "redirects" ? "Once published, the old address redirects to the new one." : "The old address will stop working (404) unless a redirect is added."),
    s === "breaks" && a && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      " ",
      /* @__PURE__ */ e.jsx("a", { href: a, target: "_blank", rel: "noopener", className: "cms:underline cms:underline-offset-2 cms:hover:text-foreground", children: t("Add a redirect") })
    ] })
  ] }) });
}
function os() {
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
function ol(s) {
  const { entry: a } = s;
  return /* @__PURE__ */ e.jsx(dl, { ...s }, a ? `${a.id}:${a.locale}:${a.version}:${a.status}:${a.trashed}:${a.publishedAt}` : "new");
}
function dl({ collection: s, fields: a, locales: l = [], shared: c = [], sharedValues: i = {}, entry: r, values: d, revisions: u, comments: m, termLabels: o, usedBy: g = [], undoRestore: x = null, machineTranslate: h = null, machineTranslateMissing: b = !1, settings: v, blueprints: f = [], blueprintUrl: j = null, homepage: _, redirectsUrl: T = null, templates: y = null, can: p }) {
  const z = I(`cms/collections/${s.handle}/entries`), k = r ? I(`cms/entries/${r.id}`) : z, F = r ? d.title : t("New entry");
  n.useBreadcrumbs([{ label: s.title, href: z }, { label: F }]);
  const [L, S] = re(), [P, N] = M.useState(!1), D = r?.publishedAt ? As(new Date(r.publishedAt)) : "", [$, U] = M.useState(D);
  M.useEffect(() => U(D), [D]);
  const [he, ie] = M.useState(null), [xe, pe] = M.useState(!1), A = C.useForm({
    ...d,
    seo: d.seo ?? {},
    locale: r?.locale ?? null,
    version: r?.version ?? null,
    publish: !1,
    published_at: null,
    parent_id: v?.parentId ?? null,
    template: v?.template ?? "",
    comments_closed: v?.commentsClosed === !0
  }), $e = (B) => A.setData((R) => ({ ...R, ...B })), X = r ? { locale: r.locale } : {}, w = l.find((B) => B.main)?.code, H = A.errors, W = C.usePage().props.errors ?? {}, ee = (B) => {
    const R = Ae(H, B);
    R.length > 0 && A.clearErrors(...R);
  }, se = r !== null && r.status !== "draft" && !r.hasUnpublishedChanges && !A.isDirty, _e = Aa(r?.status ?? "draft", $, r?.publishedAt ?? null), us = r === null ? p.create : p.update && !r.trashed, fe = r?.status === "scheduled", hs = (B) => {
    if (v || r === null) return B;
    const { parent_id: R, template: Z, comments_closed: ic, ...Ba } = B;
    return Ba;
  }, Ee = (B = !1, R = null) => {
    A.transform((Z) => ({ ...hs(Z), publish: B, published_at: R })), r ? A.put(k, { preserveScroll: !0, onSuccess: () => N(!1) }) : A.post(k);
  }, Ta = () => {
    A.transform((B) => ({ ...hs(B), version: null, publish: !1, published_at: null })), A.put(k, { preserveScroll: !0 });
  }, G = n.useEditLock({
    type: "cms.entry",
    id: r?.id,
    locale: r?.locale,
    enabled: r !== null && us,
    noun: t("entry"),
    leaveTo: z,
    getUnsaved: () => A.isDirty ? { title: A.data.title, slug: A.data.slug, data: A.data.data, seo: A.data.seo } : null
  }), Q = us && !G.readOnly, za = async (B) => {
    const R = await G.loadKept(B);
    A.setData((Z) => ({ ...Z, title: R.title ?? Z.title, slug: R.slug ?? Z.slug, data: R.data ?? Z.data, seo: R.seo ?? Z.seo }));
  };
  n.useUnsavedChanges(A.isDirty && !G.takenOver, Q ? () => A.processing || Ee() : void 0);
  const Ma = () => {
    const B = () => C.router.post(`${k}/review`, X, { preserveScroll: !0 });
    A.isDirty ? (A.transform((R) => ({ ...R, publish: !1, published_at: null })), A.put(k, { preserveScroll: !0, onSuccess: B })) : B();
  }, De = (B = null) => {
    p.update ? Ee(!0, B) : r && C.router.post(`${k}/publish`, { ...X, published_at: B }, { preserveScroll: !0, onSuccess: () => N(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (B) => {
    B.preventDefault(), Ee();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: F }),
    S,
    G.dialogs,
    /* @__PURE__ */ e.jsxs(
      n.PageHeader,
      {
        title: F,
        back: { href: z, label: t("Back to :title", { title: s.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          r && !r.trashed && s.pages !== !1 && /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(
            "a",
            {
              href: r.previewUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              title: A.isDirty ? t("Shows the saved draft: save first to see your changes.") : t("Shows the saved draft."),
              children: [
                /* @__PURE__ */ e.jsx(en, {}),
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
          r?.trashed && p.delete && /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", onClick: () => C.router.post(`${k}/restore`, {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(ve, {}),
            " ",
            t("Restore")
          ] }),
          r?.trashed && p.delete && /* @__PURE__ */ e.jsxs(
            n.Button,
            {
              type: "button",
              variant: "outline",
              className: "cms:text-destructive",
              onClick: () => L(
                t(`Permanently delete ":title" in every language, with its revisions? This can't be undone.`, { title: d.title }) + Ds(g),
                () => C.router.delete(`${k}/force`, { data: g.length > 0 ? { force: 1 } : {} })
              ),
              children: [
                /* @__PURE__ */ e.jsx(K, {}),
                " ",
                t("Permanently delete")
              ]
            }
          ),
          r && !r.trashed && (p.create || p.delete && !G.readOnly || Q && h !== null || j) && /* @__PURE__ */ e.jsxs(n.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(n.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "outline", size: "icon", "aria-label": t("More actions"), children: /* @__PURE__ */ e.jsx(rt, {}) }) }),
            /* @__PURE__ */ e.jsxs(n.DropdownMenuContent, { align: "end", className: "cms:min-w-52", children: [
              Q && h !== null && /* @__PURE__ */ e.jsxs(
                n.DropdownMenuItem,
                {
                  disabled: A.processing || A.isDirty,
                  title: A.isDirty ? void 0 : t("Fill in what isn't translated yet, into the draft"),
                  onSelect: () => C.router.post(I(`cms/entries/${r.id}/translations/${r.locale}/translate`), { version: r.version }, { preserveScroll: !0 }),
                  children: [
                    /* @__PURE__ */ e.jsx(gs, {}),
                    " ",
                    A.isDirty ? t("Save to translate") : t("Translate from :language", { language: l.find((B) => B.main)?.name ?? (w ? V(w) : t("the main language")) })
                  ]
                }
              ),
              p.create && /* @__PURE__ */ e.jsxs(n.DropdownMenuItem, { title: t("Copy every language as a new draft"), onSelect: () => C.router.post(`${k}/duplicate`), children: [
                /* @__PURE__ */ e.jsx(at, {}),
                " ",
                t("Duplicate")
              ] }),
              j && /* @__PURE__ */ e.jsx(n.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(C.Link, { href: j, children: [
                /* @__PURE__ */ e.jsx(ft, {}),
                " ",
                t("Edit blueprint")
              ] }) }),
              p.delete && !G.readOnly && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(n.DropdownMenuSeparator, {}),
                /* @__PURE__ */ e.jsxs(
                  n.DropdownMenuItem,
                  {
                    className: "cms:text-destructive",
                    onSelect: () => L(t('Move ":title" to the trash? It comes off the site; you can restore it.', { title: d.title }) + Ds(g), () => C.router.delete(k), t("Move to trash")),
                    children: [
                      /* @__PURE__ */ e.jsx(K, {}),
                      " ",
                      t("Move to trash")
                    ]
                  }
                )
              ] })
            ] })
          ] }),
          r && Q && b && /* @__PURE__ */ e.jsxs("span", { title: t("Machine translation isn't set up on this site: ask your developer (SUNRICE_TRANSLATE_DRIVER, see Help → Developer docs → Machine translation)."), children: [
            /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", disabled: !0, "aria-describedby": "machine-translate-missing", children: [
              /* @__PURE__ */ e.jsx(gs, {}),
              " ",
              t("Translate from :language", { language: l.find((B) => B.main)?.name ?? (w ? V(w) : t("the main language")) })
            ] }),
            /* @__PURE__ */ e.jsx("span", { id: "machine-translate-missing", className: "cms:sr-only", children: t("Machine translation isn't set up on this site: ask your developer.") })
          ] }),
          Q && /* @__PURE__ */ e.jsxs(n.Button, { type: "submit", variant: r ? "outline" : "default", disabled: A.processing, children: [
            A.processing && /* @__PURE__ */ e.jsx(ce, { className: "cms:animate-spin" }),
            t(r ? "Save draft" : "Create draft")
          ] }),
          r && !r.trashed && Q && !p.publish && (r.status === "draft" || r.hasUnpublishedChanges || A.isDirty) && /* @__PURE__ */ e.jsxs(
            n.Button,
            {
              type: "button",
              disabled: A.processing,
              onClick: Ma,
              title: r.review ? t("Already sent; sending again tells them again") : t("Ask those who can publish to review it"),
              children: [
                /* @__PURE__ */ e.jsx(pn, {}),
                " ",
                r.review ? t("Send for review again") : t("Submit for review")
              ]
            }
          ),
          r && !r.trashed && p.publish && !G.readOnly && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex", children: [
            fe && se ? /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", className: "cms:rounded-r-none", disabled: A.processing, title: t("Change the date"), onClick: () => N(!0), children: [
              /* @__PURE__ */ e.jsx(Xe, {}),
              " ",
              t("Scheduled for :date", { date: q(r.publishedAt) })
            ] }) : /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: se ? "outline" : "default", className: "cms:rounded-r-none cms:disabled:opacity-100", disabled: A.processing || se, onClick: () => De(_e.at), children: [
              se && /* @__PURE__ */ e.jsx(be, { className: "cms:text-emerald-600 cms:dark:text-emerald-400" }),
              se ? t("Published") : _e.action === "schedule" ? t("Schedule") : _e.action === "backdate" ? t("Publish now, back-dated") : r.status === "draft" ? t("Publish") : t("Publish changes")
            ] }),
            /* @__PURE__ */ e.jsxs(n.DropdownMenu, { children: [
              /* @__PURE__ */ e.jsx(n.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(n.Button, { type: "button", size: "icon", variant: se ? "outline" : "default", className: se ? "cms:-ml-px cms:rounded-l-none" : "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": t("More publishing options"), children: /* @__PURE__ */ e.jsx(Ys, {}) }) }),
              /* @__PURE__ */ e.jsxs(n.DropdownMenuContent, { align: "end", children: [
                /* @__PURE__ */ e.jsxs(n.DropdownMenuItem, { onSelect: () => N(!0), children: [
                  /* @__PURE__ */ e.jsx(Xe, {}),
                  " ",
                  t(fe ? "Change the date…" : "Publish on a date…")
                ] }),
                fe && /* @__PURE__ */ e.jsx(n.DropdownMenuItem, { onSelect: () => De((/* @__PURE__ */ new Date()).toISOString()), children: t("Publish now") }),
                r.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  /* @__PURE__ */ e.jsx(n.DropdownMenuSeparator, {}),
                  /* @__PURE__ */ e.jsx(n.DropdownMenuItem, { onSelect: () => C.router.post(`${k}/unpublish`, X, { preserveScroll: !0 }), children: t(fe ? "Unschedule (back to draft)" : "Unpublish") })
                ] })
              ] })
            ] })
          ] })
        ] }),
        children: [
          r && /* @__PURE__ */ e.jsx(n.Badge, { variant: r.status === "published" ? "success" : "secondary", children: r.trashed ? t("In the trash") : ae(r.status) }),
          r?.review && !r.trashed && /* @__PURE__ */ e.jsx(n.Badge, { variant: "warning", title: r.review.by ? t(":name sent it on :date", { name: r.review.by, date: q(r.review.requestedAt) }) : t("Sent on :date", { date: q(r.review.requestedAt) }), children: t("Waiting for review") }),
          A.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
        ]
      }
    ),
    r && l.length > 1 && /* @__PURE__ */ e.jsx(
      ul,
      {
        entryUrl: k,
        editUrl: `${z}/${r.id}/edit`,
        current: r.locale,
        locales: l,
        canAdd: (p.create || p.translate === !0) && !r.trashed,
        canRemove: p.delete && !r.isMain && !r.trashed,
        onRemove: () => L(
          t('Remove the :language translation of ":title"? Its revisions go with it.', { language: V(r.locale), title: d.title }),
          () => C.router.delete(`${k}/translations/${r.locale}`)
        )
      }
    ),
    /* @__PURE__ */ e.jsx(n.ViewingNotice, { by: G.viewingBy, onTakeOver: G.requestTakeOver }),
    /* @__PURE__ */ e.jsx(n.KeptEditsNotice, { kept: G.kept, disabled: !Q, onLoad: (B) => {
      za(B);
    }, onDiscard: (B) => {
      G.discardKept(B);
    } }),
    H.version && /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: [
      /* @__PURE__ */ e.jsx("span", { children: H.version }),
      /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "outline", size: "sm", onClick: () => C.router.reload(), children: t("Load theirs") }),
        /* @__PURE__ */ e.jsx(
          n.Button,
          {
            type: "button",
            variant: "destructive",
            size: "sm",
            disabled: A.processing,
            onClick: () => L(t("Save your version over theirs? Their changes are replaced (their earlier published versions stay in the revisions)."), Ta),
            children: t("Save mine anyway")
          }
        )
      ] })
    ] }),
    (H.entry || H.published_at || W.published_at || W.homepage) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: H.entry ?? H.published_at ?? W.published_at ?? W.homepage }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_18rem]", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(n.Card, { children: /* @__PURE__ */ e.jsx(n.CardContent, { children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: !Q, className: "cms:grid cms:gap-4 cms:md:grid-cols-[2fr_1fr]", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "title", children: t("Title") }),
            /* @__PURE__ */ e.jsx(
              n.Input,
              {
                id: "title",
                value: A.data.title,
                "aria-invalid": H.title !== void 0,
                onChange: (B) => {
                  const R = B.target.value;
                  A.setData((Z) => ({ ...Z, title: R, slug: Fa(Z.slug, Z.title, R, r !== null && r.publishedAt === null && r.status === "draft") })), ee("title");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(O, { message: H.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "slug", children: t("Slug") }),
            /* @__PURE__ */ e.jsx(
              n.Input,
              {
                id: "slug",
                className: "cms:font-mono",
                value: A.data.slug,
                placeholder: t("Made from the title"),
                "aria-invalid": H.slug !== void 0,
                onChange: (B) => {
                  A.setData("slug", B.target.value), ee("slug");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(Na, { note: Es(r?.publishedSlug, A.data.slug, r !== null && r.status !== "draft"), redirectsUrl: T }),
            /* @__PURE__ */ e.jsx(O, { message: H.slug })
          ] })
        ] }) }) }),
        /* @__PURE__ */ e.jsx(sa.Provider, { value: Array.isArray(o) || !o ? {} : o, children: /* @__PURE__ */ e.jsx(
          is,
          {
            disabled: !Q,
            fields: a,
            values: A.data.data,
            errors: H,
            storageKey: `cms:entry:${s.handle}`,
            shared: c,
            sharedValues: i,
            sharedNote: w ? t("Shared by all languages: the greyed-out fields are edited in :language.", { language: V(w) }) : t("Shared by all languages: the greyed-out fields are edited in the main language."),
            onChange: (B, R) => {
              A.setData("data", { ...A.data.data, [B]: R }), ee(`data.${B}`);
            }
          }
        ) }),
        /* @__PURE__ */ e.jsx(n.CollapsibleCard, { title: t("SEO"), description: t("How this entry appears in search results and shared links."), titleClassName: "cms:text-base", storageKey: "cms:entry:seo", hasErrors: Ce(H, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !Q, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(
          ue,
          {
            bare: !0,
            id: "seo",
            fields: os(),
            value: A.data.seo,
            errors: Y(H, "seo"),
            onChange: (B) => {
              A.setData("seo", B), ee("seo");
            }
          }
        ) }) })
      ] }),
      !r && s.hierarchical && /* @__PURE__ */ e.jsx("aside", { className: "cms:flex cms:flex-col cms:gap-4", children: /* @__PURE__ */ e.jsx(n.CollapsibleCard, { title: "Page settings", titleClassName: "cms:text-base", storageKey: "cms:entry:page-settings", hasErrors: H.parent_id !== void 0, children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !Q, className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: /* @__PURE__ */ e.jsx(ka, { collection: s, value: A.data.parent_id, error: H.parent_id, onChange: (B) => $e({ parent_id: B }) }) }) }) }),
      r && /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:flex-col cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs(n.CollapsibleCard, { title: t("Status"), titleClassName: "cms:text-base", storageKey: "cms:entry:status", contentClassName: "cms:flex cms:flex-col cms:gap-3 cms:text-sm", children: [
          /* @__PURE__ */ e.jsxs("dl", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-3", children: [
              /* @__PURE__ */ e.jsx("dt", { className: "cms:text-muted-foreground", children: t("Status") }),
              /* @__PURE__ */ e.jsx("dd", { children: /* @__PURE__ */ e.jsx(n.Badge, { variant: r.status === "published" ? "success" : "secondary", children: r.trashed ? t("In the trash") : ae(r.status) }) })
            ] }),
            r.status !== "draft" && r.publishedAt && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:justify-between cms:gap-3", children: [
              /* @__PURE__ */ e.jsx("dt", { className: "cms:text-muted-foreground", children: r.status === "scheduled" ? t("Scheduled for") : t("Published") }),
              /* @__PURE__ */ e.jsx("dd", { className: "cms:text-right cms:tabular-nums", children: q(r.publishedAt) })
            ] })
          ] }),
          r.review && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-muted-foreground", children: [
            r.review.by ? t("Sent for review by :name · :date.", { name: r.review.by, date: q(r.review.requestedAt) }) : t("Sent for review · :date.", { date: q(r.review.requestedAt) }),
            p.publish ? ` ${t("Publishing it answers the request.")}` : ""
          ] }),
          r.review && !r.trashed && (r.review.mine || p.publish && !G.readOnly) && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: [
            p.publish && !G.readOnly && /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", size: "sm", disabled: A.processing, onClick: () => pe(!0), children: [
              /* @__PURE__ */ e.jsx(Me, {}),
              " ",
              t("Send back…")
            ] }),
            r.review.mine && /* @__PURE__ */ e.jsx(
              n.Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                disabled: A.processing,
                title: t("Take the request back, to keep working on it"),
                onClick: () => C.router.post(`${k}/review/withdraw`, X, { preserveScroll: !0 }),
                children: t("Withdraw the request")
              }
            )
          ] }),
          !r.trashed && p.publish && !G.readOnly && /* @__PURE__ */ e.jsx(
            hl,
            {
              status: r.status,
              value: $,
              onChange: U,
              dated: _e,
              processing: A.processing,
              onPublish: (B) => De(B),
              onUnpublish: () => C.router.post(`${k}/unpublish`, X, { preserveScroll: !0 })
            }
          ),
          r.status !== "draft" && r.hasUnpublishedChanges && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("The draft has changes the site doesn't show yet.") }),
          _?.is && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("This is the site's homepage.") }),
          _ && !_.is && _.can && r.status === "published" && !r.trashed && /* @__PURE__ */ e.jsx(
            n.Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "cms:mt-1 cms:self-start",
              onClick: () => L(
                (_.current ? t('Make ":title" the homepage? Visitors to / will see it instead of ":current".', { title: d.title, current: _.current }) : t('Make ":title" the homepage? Visitors to / will see it.', { title: d.title })) + " " + t("Its own address will lead to / as well."),
                () => C.router.post(`${k}/homepage`, {}, { preserveScroll: !0 }),
                t("Make this the homepage")
              ),
              children: t("Make this the homepage")
            }
          ),
          l.find((B) => B.code === r.locale)?.outdated && /* @__PURE__ */ e.jsx("p", { className: "cms:text-amber-700 cms:dark:text-amber-400", children: w ? t("The :language version changed since this translation was last saved.", { language: V(w) }) : t("The main version changed since this translation was last saved.") })
        ] }),
        /* @__PURE__ */ e.jsxs(n.CollapsibleCard, { title: t("Used by"), titleClassName: "cms:text-base", storageKey: "cms:entry:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          g.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("No other content links here.") }),
          g.map((B) => /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
            B.url ? /* @__PURE__ */ e.jsx("a", { href: B.url, className: "cms:block cms:truncate cms:underline-offset-4 cms:hover:underline", children: B.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:truncate", children: B.label }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", title: B.field, children: B.fieldLabel ?? B.field })
          ] }, `${B.label}:${B.field}`))
        ] }),
        v && /* @__PURE__ */ e.jsx(
          gl,
          {
            entryUrl: k,
            collection: s,
            settings: v,
            templates: y,
            blueprints: f,
            disabled: !Q,
            values: A.data,
            errors: H,
            onChange: $e,
            draftDirty: A.isDirty
          }
        ),
        m !== null && s.comments && /* @__PURE__ */ e.jsx(il, { entryId: r.id, comments: m }),
        /* @__PURE__ */ e.jsxs(n.CollapsibleCard, { title: t("Revisions"), titleClassName: "cms:text-base", storageKey: "cms:entry:revisions", contentClassName: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
          x !== null && p.update && /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", size: "sm", onClick: () => C.router.post(I(`cms/entries/${r.id}/translations/${r.locale}/undo-restore`), {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(Me, {}),
            " ",
            t("Undo the restore")
          ] }),
          /* @__PURE__ */ e.jsx(C.Deferred, { data: "revisions", fallback: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(n.Skeleton, { className: "cms:h-8" }),
            /* @__PURE__ */ e.jsx(n.Skeleton, { className: "cms:h-8" })
          ] }), children: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            (u ?? []).length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("Each publish keeps one.") }),
            (u ?? []).map((B) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1 cms:border-b cms:border-border/60 cms:pb-2 cms:last:border-b-0 cms:last:pb-0", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
                /* @__PURE__ */ e.jsx("div", { className: "cms:truncate", children: B.title }),
                /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
                  q(B.createdAt),
                  B.author ? ` · ${B.author}` : ""
                ] }),
                /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: B.changed === null ? t("First kept version") : B.changed.length === 0 ? t("No field changed") : t("Changed: :fields", { fields: B.changed.join(", ") }) })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-1", children: [
                /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => ie(B), children: t("Compare") }),
                p.update && !r.trashed && /* @__PURE__ */ e.jsx(
                  n.Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    onClick: () => C.router.post(I(`cms/entries/${r.id}/revisions/${B.id}/restore`), {}, { preserveScroll: !0 }),
                    children: t("Restore")
                  }
                )
              ] })
            ] }, B.id))
          ] }) })
        ] })
      ] })
    ] }),
    r?.review && /* @__PURE__ */ e.jsx(
      ml,
      {
        open: xe,
        onClose: () => pe(!1),
        by: r.review.by,
        onSend: (B, R) => C.router.post(`${k}/review/send-back`, { ...X, note: B }, { preserveScroll: !0, onSuccess: () => {
          pe(!1), R();
        }, onError: R })
      }
    ),
    /* @__PURE__ */ e.jsx(pl, { entryId: r?.id ?? 0, revision: he, onClose: () => ie(null), dirty: A.isDirty }),
    /* @__PURE__ */ e.jsx(
      xl,
      {
        open: P,
        onClose: () => N(!1),
        processing: A.processing,
        rescheduling: fe,
        current: r?.publishedAt ?? null,
        onSchedule: (B) => De(B)
      }
    )
  ] });
}
function ml({ open: s, onClose: a, by: l, onSend: c }) {
  const [i, r] = M.useState(""), [d, u] = M.useState(!1), m = C.usePage().props.errors ?? {};
  return M.useEffect(() => {
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
      /* @__PURE__ */ e.jsx(O, { message: m.note })
    ] }),
    /* @__PURE__ */ e.jsxs(n.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "outline", disabled: d, onClick: a, children: t("Cancel") }),
      /* @__PURE__ */ e.jsxs(n.Button, { type: "button", disabled: d, onClick: () => {
        u(!0), c(i, () => u(!1));
      }, children: [
        d && /* @__PURE__ */ e.jsx(ce, { className: "cms:animate-spin" }),
        " ",
        t("Send back")
      ] })
    ] })
  ] }) });
}
function ul({ entryUrl: s, editUrl: a, current: l, locales: c, canAdd: i, canRemove: r, onRemove: d }) {
  const u = c.filter((o) => o.status !== null), m = c.filter((o) => o.status === null);
  return /* @__PURE__ */ e.jsxs("nav", { "aria-label": t("Languages"), className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("div", { className: "cms:inline-flex cms:items-center cms:gap-0.5 cms:rounded-md cms:bg-muted cms:p-0.5", children: u.map((o) => {
      const g = o.code === l, x = o.main ? t(":language (main)", { language: o.name ?? V(o.code) }) : o.name ?? V(o.code), h = o.status ? ae(o.status) : "", b = o.outdated ? t(":language: :status, outdated (the main language changed since)", { language: x, status: h }) : t(":language: :status", { language: x, status: h });
      return /* @__PURE__ */ e.jsxs(
        "button",
        {
          type: "button",
          title: b,
          "aria-label": b,
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
        title: t("Add :language", { language: o.name ?? V(o.code) }),
        onClick: () => C.router.post(`${s}/translations`, { locale: o.code }),
        children: [
          /* @__PURE__ */ e.jsx(J, {}),
          " ",
          o.code
        ]
      },
      o.code
    )),
    r && /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:ml-auto cms:text-destructive", onClick: d, children: t("Remove this language") })
  ] });
}
function hl({ status: s, value: a, onChange: l, dated: c, processing: i, onPublish: r, onUnpublish: d }) {
  const u = c.action !== "now", m = {
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
      (s === "draft" || u) && /* @__PURE__ */ e.jsxs(n.Button, { type: "button", size: "sm", disabled: i, onClick: () => r(c.at), children: [
        /* @__PURE__ */ e.jsx(Xe, {}),
        " ",
        m
      ] }),
      s !== "draft" && /* @__PURE__ */ e.jsx(n.Button, { type: "button", size: "sm", variant: "outline", disabled: i, onClick: d, children: t("Unpublish") })
    ] })
  ] });
}
function xl({ open: s, onClose: a, onSchedule: l, current: c, processing: i, rescheduling: r }) {
  const [d, u] = M.useState("");
  M.useEffect(() => {
    s && u(As(Ia(c)));
  }, [s, c]);
  const m = d === "" ? null : new Date(d), o = m !== null && m.getTime() <= Date.now();
  return /* @__PURE__ */ e.jsx(n.Dialog, { open: s, onOpenChange: (g) => !g && a(), children: /* @__PURE__ */ e.jsxs(n.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(n.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(n.DialogTitle, { children: t(r ? "Change the publish date" : "Publish on a date") }),
      /* @__PURE__ */ e.jsx(n.DialogDescription, { children: t("The entry goes live then.") })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "published-at", children: t("Date and time") }),
      /* @__PURE__ */ e.jsx(n.DatePicker, { id: "published-at", withTime: !0, required: !0, className: "cms:max-w-none", value: d || null, onChange: (g) => u(g ?? "") }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("In your time zone.") }),
      o && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-amber-700 cms:dark:text-amber-400", children: t("This date has passed: the entry goes live now, dated :date.", { date: q(m.toISOString()) }) })
    ] }),
    /* @__PURE__ */ e.jsxs(n.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "outline", onClick: a, children: t("Cancel") }),
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", disabled: m === null || i, onClick: () => m && l(m.toISOString()), children: t(o ? "Publish now, back-dated" : r ? "Change the date" : "Schedule") })
    ] })
  ] }) });
}
function pl({ entryId: s, revision: a, onClose: l, dirty: c }) {
  const [i, r] = M.useState(null), [d, u] = M.useState(!1);
  return M.useEffect(() => {
    if (r(null), u(!1), !a) return;
    let m = !0;
    return fetch(I(`cms/entries/${s}/revisions/${a.id}/compare`), { headers: { Accept: "application/json" }, credentials: "same-origin" }).then((o) => o.ok ? o.json() : Promise.reject(new Error(String(o.status)))).then((o) => {
      m && r(o.fields);
    }).catch(() => {
      m && u(!0);
    }), () => {
      m = !1;
    };
  }, [a, s]), /* @__PURE__ */ e.jsx(n.Dialog, { open: a !== null, onOpenChange: (m) => !m && l(), children: /* @__PURE__ */ e.jsxs(n.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto cms:sm:max-w-2xl", children: [
    /* @__PURE__ */ e.jsxs(n.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(n.DialogTitle, { children: t("Compare with the draft") }),
      /* @__PURE__ */ e.jsxs(n.DialogDescription, { children: [
        a ? a.author ? t("The version published :date by :name, beside the saved draft.", { date: q(a.createdAt), name: a.author }) : t("The version published :date, beside the saved draft.", { date: q(a.createdAt) }) : "",
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
function ka({ collection: s, value: a, error: l, onChange: c }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "parent", children: t("Parent") }),
    /* @__PURE__ */ e.jsx(
      Se,
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
    /* @__PURE__ */ e.jsx(O, { message: l })
  ] });
}
function gl({ entryUrl: s, collection: a, settings: l, templates: c, blueprints: i, disabled: r, values: d, errors: u, onChange: m, draftDirty: o }) {
  const g = i.length > 1 ? l.blueprint ?? i[0].handle : void 0, x = C.useForm({ blueprint: g ?? "" }), h = x.errors.blueprint, b = ["parent_id", "template", "comments_closed"].some((v) => u[v] !== void 0) || h !== void 0;
  return /* @__PURE__ */ e.jsx(n.CollapsibleCard, { title: t("Page settings"), titleClassName: "cms:text-base", storageKey: "cms:entry:page-settings", hasErrors: b, children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: r, className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: [
    a.hierarchical && /* @__PURE__ */ e.jsx(ka, { collection: a, value: d.parent_id, error: u.parent_id, onChange: (v) => m({ parent_id: v }) }),
    i.length > 1 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "blueprint", children: t("Blueprint") }),
      /* @__PURE__ */ e.jsxs(n.Select, { value: x.data.blueprint, onValueChange: (v) => x.setData("blueprint", v), children: [
        /* @__PURE__ */ e.jsx(n.SelectTrigger, { id: "blueprint", "aria-invalid": h !== void 0, children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(n.SelectContent, { children: i.map((v) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: v.handle, children: v.title }, v.handle)) })
      ] }),
      x.data.blueprint !== g && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("The fields change in every language; values of fields both blueprints have are kept. The editor reloads.") }),
        /* @__PURE__ */ e.jsx(
          n.Button,
          {
            type: "button",
            size: "sm",
            disabled: x.processing || o,
            title: o ? t("Save your draft first") : void 0,
            onClick: () => x.put(`${s}/settings`, { preserveScroll: !0 }),
            children: t("Change blueprint")
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(O, { message: h })
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
          onChange: (v) => m({ template: v.target.value }),
          "aria-invalid": u.template !== void 0
        }
      ),
      /* @__PURE__ */ e.jsx(va, { example: `cms.${a.handle}-landing`, empty: t("Leave empty to use the collection's template."), value: d.template, lookup: c }),
      /* @__PURE__ */ e.jsx(O, { message: u.template })
    ] }),
    a.comments && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(n.Switch, { id: "comments-open", checked: !d.comments_closed, onCheckedChange: (v) => m({ comments_closed: !v }) }),
      /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "comments-open", children: t("Accept new comments") }),
      /* @__PURE__ */ e.jsx("a", { href: I(`cms/comments?entry=${s.split("/").slice(-1)[0]}`), className: "cms:ml-auto cms:text-muted-foreground cms:underline-offset-4 hover:cms:underline", children: t("Comments") })
    ] })
  ] }) });
}
function ss(s, a) {
  const l = s[a]?.depth ?? 0;
  let c = a + 1;
  for (; c < s.length && s[c].depth > l; ) c++;
  return c;
}
function le(s, a) {
  const l = a < 0 ? 0 : a + 1, c = a < 0 ? s.length : ss(s, a), i = a < 0 ? 0 : (s[a]?.depth ?? 0) + 1, r = [];
  for (let d = l; d < c; d++)
    s[d].depth === i && r.push(d);
  return r;
}
function ds(s, a, l) {
  const c = le(s, a);
  if (l.length !== c.length || [...l].sort((u, m) => u - m).some((u, m) => u !== c[m]) || c.length === 0) return s.slice();
  const i = c[0], r = ss(s, c[c.length - 1]), d = l.flatMap((u) => s.slice(u, ss(s, u)));
  return [...s.slice(0, i), ...d, ...s.slice(r)];
}
function fl(s, a) {
  const l = new Set(s.map((u) => u.id)), c = /* @__PURE__ */ new Map();
  for (const u of s) {
    const m = a(u), o = m != null && l.has(m) ? m : null;
    c.set(o, [...c.get(o) ?? [], u]);
  }
  const i = [], r = /* @__PURE__ */ new Set(), d = (u, m) => {
    for (const o of c.get(u) ?? [])
      r.has(o.id) || (r.add(o.id), i.push({ ...o, depth: m }), d(o.id, m + 1));
  };
  d(null, 0);
  for (const u of s)
    r.has(u.id) || (r.add(u.id), i.push({ ...u, depth: 0 }), d(u.id, 1));
  return i;
}
function jl({ collection: s, rows: a, hierarchical: l = !1 }) {
  const c = M.useCallback(
    (m) => fl(m, (o) => l ? o.parentId : null),
    [l]
  ), [i, r] = M.useState(() => c(a));
  M.useEffect(() => r(c(a)), [a, c]);
  const d = (m, o) => {
    const g = ds(i, m, o), x = le(g, m).map((h) => g[h].id);
    r(g), C.router.post(
      I("cms/entries/reorder"),
      { collection: s, ids: x, parent_id: m < 0 ? null : i[m]?.id ?? null },
      { preserveScroll: !0, preserveState: !0, onError: () => r(c(a)) }
    );
  }, u = (m) => /* @__PURE__ */ e.jsx(
    n.SortableList,
    {
      items: le(i, m),
      getId: (o) => i[o].id,
      getLabel: (o) => i[o].title,
      onReorder: (o) => d(m, o),
      className: m < 0 ? "cms:gap-1" : "cms:mt-1 cms:gap-1 cms:pl-6",
      children: (o, { handle: g }) => {
        const x = i[o];
        return /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-lg cms:border cms:border-border/70 cms:bg-card cms:p-2 cms:text-sm", children: [
            /* @__PURE__ */ e.jsx(n.SortableHandle, { ...g, label: t("Move :title", { title: x.title }) }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium", children: x.title }),
            /* @__PURE__ */ e.jsx(n.Badge, { variant: x.status === "published" ? "success" : "secondary", children: ae(x.status) })
          ] }),
          le(i, o).length > 0 && u(o)
        ] });
      }
    }
  );
  return /* @__PURE__ */ e.jsxs(n.Card, { className: "cms:p-2", children: [
    l && /* @__PURE__ */ e.jsx("p", { className: "cms:px-1 cms:pb-1 cms:text-xs cms:text-muted-foreground", children: t("Entries move among those at their level, with what's under them. To put one under another, choose its Parent in its Page settings.") }),
    u(-1)
  ] });
}
function bl(s, a, l) {
  const c = { ...s, ...a }, i = Object.fromEntries(Object.entries(c.terms).filter(([, d]) => d !== "")), r = {};
  return c.search && (r.search = c.search), c.status && (r.status = c.status), c.author && (r.author = c.author), Object.keys(i).length > 0 && (r.terms = i), c.locale && c.locale !== l && (r.locale = c.locale), c.sort && (r.sort = c.sort), r.per_page = c.perPage, r;
}
function vl(s) {
  const a = new URLSearchParams();
  for (const [l, c] of Object.entries(s))
    if (typeof c == "object")
      for (const [i, r] of Object.entries(c)) a.set(`${l}[${i}]`, r);
    else
      a.set(l, String(c));
  return a.toString();
}
function yl(s, a) {
  return s === a ? `-${a}` : s === `-${a}` ? "" : a;
}
function Nl(s, a) {
  return s === a ? "asc" : s === `-${a}` ? "desc" : null;
}
function Ts(s) {
  return [s.search, s.status, s.author, ...Object.values(s.terms)].filter((a) => a !== "").length;
}
const We = "__all", kl = () => [
  { value: "draft", label: t("Drafts") },
  { value: "published", label: t("Published") },
  { value: "scheduled", label: t("Scheduled") },
  { value: "trashed", label: t("Trash") }
];
function wl(s) {
  const { collection: a, entries: l, query: c } = s;
  return n.useBreadcrumbs([{ label: a ? a.title : t("Entries") }]), !a || !l || !c ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: t("Entries") }),
    /* @__PURE__ */ e.jsx(n.PageHeader, { title: t("Entries"), description: t("There are no collections yet. Create one under Structure → Collections, then come back to write its entries.") })
  ] }) : /* @__PURE__ */ e.jsx(Sl, { ...s, collection: a, entries: l, query: c });
}
function Sl({
  collection: s,
  collections: a,
  entries: l,
  query: c,
  columns: i = [],
  filters: r = { authors: [], taxonomies: [], locales: [] },
  links: d = [],
  manualOrder: u = !1,
  perPageOptions: m = [10, 25, 50, 100],
  preferencesKey: o,
  trashedCount: g = 0,
  can: x
}) {
  const h = I(`cms/collections/${s.handle}/entries`), b = r.locales[0] ?? c.locale, [v, f] = M.useState(c.search), [j, _] = M.useState([]), [T, y] = M.useState(!1), [p, z] = re(), { setColumns: k, setPerPage: F } = n.useTablePreferences(o ?? `table.cms.entries.${s.handle}`, { columns: c.columns, perPage: c.perPage });
  M.useEffect(() => _([]), [l]);
  const L = c.status === "trashed", S = Ts(c) > 0, P = i.filter((w) => c.columns.includes(w.key)), N = (w = {}) => bl(c, w, b), D = (w) => C.router.get(h, N(w), { preserveState: !0, preserveScroll: !0, replace: !0 });
  M.useEffect(() => {
    if (v === c.search) return;
    const w = window.setTimeout(() => D({ search: v }), 300);
    return () => window.clearTimeout(w);
  }, [v]);
  const $ = L ? x?.delete ? [{ action: "restore", label: t("Restore") }, { action: "delete", label: t("Permanently delete"), danger: !0 }] : [] : [
    ...x?.publish ? [{ action: "publish", label: t("Publish") }, { action: "unpublish", label: t("Unpublish") }] : [],
    ...x?.delete ? [{ action: "trash", label: t("Move to the trash"), danger: !0 }] : []
  ], U = (w, H, W = !1) => {
    const ee = () => C.router.post(`${h}/bulk`, { action: w, ids: j }, { preserveScroll: !0 });
    if (W) {
      const se = j.length === 1 ? t(":action: 1 entry?", { action: H }) : t(":action: :count entries?", { action: H, count: j.length });
      p(
        `${se} ${t(w === "delete" ? "This can't be undone." : "They come off the site; you can restore them.")}`,
        ee,
        t(w === "trash" ? "Move to trash" : "Delete")
      );
    } else
      ee();
  }, he = async (w) => {
    const H = new Set(c.columns);
    H.has(w) ? H.delete(w) : H.add(w), await k(i.map((W) => W.key).filter((W) => H.has(W))), C.router.reload({ only: ["entries", "query"] });
  }, ie = () => {
    f(""), D({ search: "", status: "", author: "", terms: {} });
  }, xe = u && !!x?.update, pe = xe && l !== null && l.lastPage <= 1 && l.data.length > 1, A = L && !!x?.delete, $e = 1 + P.length + ($.length > 0 ? 1 : 0) + (xe ? 1 : 0) + (A ? 1 : 0), X = vl(N());
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: s.title }),
    z,
    /* @__PURE__ */ e.jsx(
      n.PageHeader,
      {
        title: L ? /* @__PURE__ */ e.jsx(n.TrashTitle, { children: s.title }) : s.title,
        primary: x?.create && !L && /* @__PURE__ */ e.jsx(n.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(C.Link, { href: `${h}/create`, children: [
          /* @__PURE__ */ e.jsx(J, {}),
          " ",
          t("New entry")
        ] }) }),
        menu: [
          ...l.total > 0 && x?.export ? [{ label: t("Export CSV"), href: `${h}/export${X ? `?${X}` : ""}`, download: !0, icon: /* @__PURE__ */ e.jsx(lt, {}) }] : [],
          ...d.map((w) => ({ label: w.label, href: w.href, external: w.external, group: w.group }))
        ],
        children: a.length > 1 && /* @__PURE__ */ e.jsxs(n.Select, { value: s.handle, onValueChange: (w) => C.router.get(I(`cms/collections/${w}/entries`)), children: [
          /* @__PURE__ */ e.jsx(n.SelectTrigger, { className: "cms:w-48", "aria-label": t("Collection"), children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(n.SelectContent, { children: a.map((w) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: w.handle, children: w.title }, w.handle)) })
        ] })
      }
    ),
    L && /* @__PURE__ */ e.jsx(n.TrashBanner, { items: t("entries"), onBack: () => D({ status: "" }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-xs", children: [
        /* @__PURE__ */ e.jsx(ke, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          n.Input,
          {
            className: "cms:pl-9",
            placeholder: t("Search titles, slugs or #id"),
            "aria-label": t("Search entries"),
            value: v,
            onChange: (w) => f(w.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(Ge, { label: t("Status"), value: c.status, options: kl(), onChange: (w) => D({ status: w }) }),
      r.authors.length > 0 && /* @__PURE__ */ e.jsx(Ge, { label: t("Author"), value: c.author, options: r.authors, onChange: (w) => D({ author: w }) }),
      r.taxonomies.filter((w) => w.terms.length > 0).map((w) => /* @__PURE__ */ e.jsx(
        Ge,
        {
          label: w.title,
          value: c.terms[w.handle] ?? "",
          options: w.terms.map((H) => ({ value: H.value, label: `${"— ".repeat(H.depth)}${H.label}` })),
          onChange: (H) => D({ terms: { ...c.terms, [w.handle]: H } })
        },
        w.handle
      )),
      r.locales.length > 1 && /* @__PURE__ */ e.jsxs(n.Select, { value: c.locale, onValueChange: (w) => D({ locale: w }), children: [
        /* @__PURE__ */ e.jsx(n.SelectTrigger, { className: "cms:w-auto cms:min-w-40 cms:max-w-72", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(n.SelectContent, { children: r.locales.map((w) => /* @__PURE__ */ e.jsxs(n.SelectItem, { value: w, children: [
          V(w),
          w === b ? ` ${t("(main)")}` : ""
        ] }, w)) })
      ] }),
      S && /* @__PURE__ */ e.jsxs(n.Button, { variant: "ghost", size: "sm", onClick: ie, children: [
        /* @__PURE__ */ e.jsx(we, {}),
        " ",
        t("Clear")
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:ml-auto cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
        j.length > 0 && $.length > 0 && /* @__PURE__ */ e.jsxs("div", { role: "toolbar", "aria-label": t("Selected entries"), className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t(":count selected", { count: j.length }) }),
          $.map((w) => /* @__PURE__ */ e.jsx(n.Button, { size: "sm", variant: w.danger ? "destructive" : "outline", onClick: () => U(w.action, w.label, w.danger), children: w.label }, w.action))
        ] }),
        pe && /* @__PURE__ */ e.jsxs(n.Button, { variant: T ? "secondary" : "outline", "aria-pressed": T, onClick: () => y(!T), children: [
          /* @__PURE__ */ e.jsx(Vs, {}),
          " ",
          t(T ? "Done" : "Reorder")
        ] }),
        i.length > 0 && /* @__PURE__ */ e.jsxs(n.DropdownMenu, { children: [
          /* @__PURE__ */ e.jsx(n.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(n.Button, { variant: "outline", children: [
            /* @__PURE__ */ e.jsx(Xa, {}),
            " ",
            t("Columns")
          ] }) }),
          /* @__PURE__ */ e.jsxs(n.DropdownMenuContent, { align: "end", className: "cms:max-h-96 cms:overflow-y-auto", children: [
            /* @__PURE__ */ e.jsx(n.DropdownMenuLabel, { children: t("Columns") }),
            i.filter((w) => !w.field).map((w) => /* @__PURE__ */ e.jsx(
              n.DropdownMenuCheckboxItem,
              {
                checked: c.columns.includes(w.key),
                onSelect: (H) => H.preventDefault(),
                onCheckedChange: () => {
                  he(w.key);
                },
                children: w.label
              },
              w.key
            )),
            i.some((w) => w.field) && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(n.DropdownMenuSeparator, {}),
              /* @__PURE__ */ e.jsx(n.DropdownMenuLabel, { children: t("Fields") }),
              i.filter((w) => w.field).map((w) => /* @__PURE__ */ e.jsx(
                n.DropdownMenuCheckboxItem,
                {
                  checked: c.columns.includes(w.key),
                  onSelect: (H) => H.preventDefault(),
                  onCheckedChange: () => {
                    he(w.key);
                  },
                  children: w.label
                },
                w.key
              ))
            ] })
          ] })
        ] })
      ] })
    ] }),
    T && pe ? /* @__PURE__ */ e.jsx(jl, { collection: s.handle, rows: l.data, hierarchical: s.hierarchical === !0 }) : /* @__PURE__ */ e.jsxs(n.Card, { className: "cms:gap-0 cms:overflow-hidden cms:py-0", children: [
      /* @__PURE__ */ e.jsxs(n.Table, { children: [
        /* @__PURE__ */ e.jsx(n.TableHeader, { className: "cms:bg-muted/60", children: /* @__PURE__ */ e.jsxs(n.TableRow, { className: "cms:hover:bg-transparent", children: [
          $.length > 0 && /* @__PURE__ */ e.jsx(n.TableHead, { className: "cms:w-10", children: /* @__PURE__ */ e.jsx(
            n.Checkbox,
            {
              "aria-label": t("Select all on this page"),
              checked: l.data.length > 0 && j.length === l.data.length,
              onCheckedChange: (w) => _(w ? l.data.map((H) => H.id) : [])
            }
          ) }),
          /* @__PURE__ */ e.jsx(zs, { label: t("Title"), sortKey: "title", sort: c.sort, onSort: (w) => D({ sort: w }) }),
          P.map((w) => w.sortable ? /* @__PURE__ */ e.jsx(zs, { label: w.label, sortKey: w.key, sort: c.sort, onSort: (H) => D({ sort: H }) }, w.key) : /* @__PURE__ */ e.jsx(n.TableHead, { children: w.label }, w.key)),
          xe && /* @__PURE__ */ e.jsx(n.TableHead, { className: "cms:w-px", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: t("Order") }) }),
          A && /* @__PURE__ */ e.jsx(n.TableHead, { className: "cms:w-px", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: t("Restore") }) })
        ] }) }),
        /* @__PURE__ */ e.jsxs(n.TableBody, { children: [
          l.data.length === 0 && /* @__PURE__ */ e.jsx(n.TableRow, { className: "cms:hover:bg-transparent", children: /* @__PURE__ */ e.jsxs(n.TableCell, { colSpan: $e, className: "cms:h-32 cms:text-center cms:text-muted-foreground", children: [
            /* @__PURE__ */ e.jsx(_l, { trashed: L, filtered: Ts(L ? { ...c, status: "" } : c) > 0, canCreate: !!x?.create, createUrl: `${h}/create`, onClear: ie }),
            !L && /* @__PURE__ */ e.jsx("div", { className: "cms:mt-2", children: /* @__PURE__ */ e.jsx(n.TrashHint, { count: g, onShow: () => D({ status: "trashed" }) }) })
          ] }) }),
          l.data.map((w, H) => /* @__PURE__ */ e.jsxs(n.TableRow, { className: L ? "sunrice-row-in cms:text-muted-foreground" : "sunrice-row-in", style: { "--i": H }, "data-state": j.includes(w.id) ? "selected" : void 0, children: [
            $.length > 0 && /* @__PURE__ */ e.jsx(n.TableCell, { children: /* @__PURE__ */ e.jsx(
              n.Checkbox,
              {
                "aria-label": t("Select :title", { title: w.title }),
                checked: j.includes(w.id),
                onCheckedChange: (W) => _(W ? [...j, w.id] : j.filter((ee) => ee !== w.id))
              }
            ) }),
            /* @__PURE__ */ e.jsxs(n.TableCell, { children: [
              /* @__PURE__ */ e.jsx(
                C.Link,
                {
                  href: I(`cms/collections/${s.handle}/entries/${w.id}/edit${c.locale !== b ? `?locale=${encodeURIComponent(c.locale)}` : ""}`),
                  className: "cms:font-medium cms:underline-offset-4 cms:hover:underline",
                  children: w.title
                }
              ),
              (!c.columns.includes("slug") && w.path || w.parent) && /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: [c.columns.includes("slug") ? null : w.path, w.parent ? t("under :parent", { parent: w.parent }) : null].filter(Boolean).join(" · ") })
            ] }),
            P.map((W) => /* @__PURE__ */ e.jsx(n.TableCell, { className: W.key === "status" ? "" : "cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx("div", { className: "cms:max-w-72 cms:truncate", children: /* @__PURE__ */ e.jsx(Cl, { row: w, column: W }) }) }, W.key)),
            xe && /* @__PURE__ */ e.jsx(n.TableCell, { className: "cms:w-px", children: /* @__PURE__ */ e.jsxs("span", { className: "cms:flex", children: [
              /* @__PURE__ */ e.jsx(n.Button, { variant: "ghost", size: "icon", "aria-label": t("Move :title up", { title: w.title }), onClick: () => C.router.post(I(`cms/entries/${w.id}/move`), { direction: "up" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(Us, {}) }),
              /* @__PURE__ */ e.jsx(n.Button, { variant: "ghost", size: "icon", "aria-label": t("Move :title down", { title: w.title }), onClick: () => C.router.post(I(`cms/entries/${w.id}/move`), { direction: "down" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(Hs, {}) })
            ] }) }),
            A && /* @__PURE__ */ e.jsx(n.TableCell, { className: "cms:w-px", children: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:justify-end cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs(
                n.Button,
                {
                  variant: "outline",
                  size: "sm",
                  "aria-label": t("Restore :title", { title: w.title }),
                  onClick: () => C.router.post(I(`cms/entries/${w.id}/restore`), {}, { preserveScroll: !0 }),
                  children: [
                    /* @__PURE__ */ e.jsx(ve, {}),
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
                  "aria-label": t("Permanently delete :title", { title: w.title }),
                  onClick: () => p(
                    t("Permanently delete :title? This can't be undone.", { title: w.title }),
                    () => C.router.post(`${h}/bulk`, { action: "delete", ids: [w.id] }, { preserveScroll: !0 }),
                    t("Delete")
                  ),
                  children: [
                    /* @__PURE__ */ e.jsx(K, {}),
                    " ",
                    t("Permanently delete")
                  ]
                }
              )
            ] }) })
          ] }, w.id))
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4 cms:border-t cms:px-6 cms:py-3 cms:text-sm cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-4", children: [
          /* @__PURE__ */ e.jsx("span", { children: l.total === 0 ? t("No entries") : t(":from–:to of :total", { from: l.from, to: l.to, total: l.total }) }),
          /* @__PURE__ */ e.jsxs(n.Select, { value: String(c.perPage), onValueChange: (w) => {
            F(Number(w)), D({ perPage: Number(w) });
          }, children: [
            /* @__PURE__ */ e.jsx(n.SelectTrigger, { className: "cms:h-8 cms:w-auto", "aria-label": t("Entries per page"), children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(n.SelectContent, { children: m.map((w) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: String(w), children: t(":count per page", { count: w }) }, w)) })
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
              children: /* @__PURE__ */ e.jsx(as, {})
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
              children: /* @__PURE__ */ e.jsx(Ne, {})
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function Ge({ label: s, value: a, options: l, onChange: c }) {
  return /* @__PURE__ */ e.jsxs(n.Select, { value: a === "" ? We : a, onValueChange: (i) => c(i === We ? "" : i), children: [
    /* @__PURE__ */ e.jsx(n.SelectTrigger, { className: "cms:w-auto cms:min-w-40 cms:max-w-72", title: s, "aria-label": s, children: /* @__PURE__ */ e.jsx(n.SelectValue, { placeholder: s }) }),
    /* @__PURE__ */ e.jsxs(n.SelectContent, { children: [
      /* @__PURE__ */ e.jsx(n.SelectItem, { value: We, children: t(":filter: all", { filter: s }) }),
      l.map((i) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: i.value, children: i.label }, i.value))
    ] })
  ] });
}
function zs({ label: s, sortKey: a, sort: l, onSort: c }) {
  const i = Nl(l, a);
  return /* @__PURE__ */ e.jsx(n.TableHead, { "aria-sort": i === "asc" ? "ascending" : i === "desc" ? "descending" : void 0, children: /* @__PURE__ */ e.jsxs(
    "button",
    {
      type: "button",
      onClick: () => c(yl(l, a)),
      className: "cms:-ml-2 cms:inline-flex cms:h-8 cms:items-center cms:gap-1 cms:rounded-md cms:px-2 cms:hover:bg-accent cms:hover:text-accent-foreground",
      children: [
        s,
        i === "asc" ? /* @__PURE__ */ e.jsx(Us, { className: "cms:size-3" }) : i === "desc" ? /* @__PURE__ */ e.jsx(Hs, { className: "cms:size-3" }) : /* @__PURE__ */ e.jsx(Vs, { className: "cms:size-3 cms:opacity-40" })
      ]
    }
  ) });
}
function Cl({ row: s, column: a }) {
  switch (a.key) {
    case "slug":
      return /* @__PURE__ */ e.jsx("span", { className: "cms:font-mono", children: s.slug });
    case "status":
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-1", children: [
        s.trashed ? /* @__PURE__ */ e.jsx(n.Badge, { variant: "outline", className: "cms:text-destructive", title: t(":status before it was trashed", { status: ae(s.status) }), children: t("Trashed") }) : /* @__PURE__ */ e.jsx(n.Badge, { variant: s.status === "published" ? "success" : "secondary", children: ae(s.status) }),
        s.locales.length > 1 && s.locales.filter((l) => !l.main).map((l) => {
          const c = $l(l);
          return /* @__PURE__ */ e.jsxs(
            n.Badge,
            {
              variant: c.variant,
              className: c.className,
              title: t(":language: :status", { language: V(l.code), status: c.title }),
              "aria-label": t(":language: :status", { language: V(l.code), status: c.title }),
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
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: q(s.publishedAt) });
    case "updated_at":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: q(s.updatedAt) });
    case "created_at":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: q(s.createdAt) });
    default:
      return /* @__PURE__ */ e.jsx("span", { title: s.cells[a.key] ?? void 0, children: s.cells[a.key] ?? "—" });
  }
}
function $l(s) {
  return s.status === null ? { variant: "outline", className: "cms:border-dashed cms:text-muted-foreground", word: t("missing"), title: t("not translated") } : s.outdated ? { variant: "warning", className: "", word: t("outdated"), title: t(":status, outdated: the main language changed since", { status: ae(s.status) }) } : s.status === "published" ? { variant: "secondary", className: "", word: null, title: t("Published") } : { variant: "outline", className: "", word: s.status === "scheduled" ? t("scheduled") : t("draft"), title: ae(s.status) };
}
function _l({ trashed: s, filtered: a, canCreate: l, createUrl: c, onClear: i }) {
  return a ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: t("Nothing matches these filters.") }),
    /* @__PURE__ */ e.jsxs(n.Button, { variant: "outline", size: "sm", onClick: i, children: [
      /* @__PURE__ */ e.jsx(we, {}),
      " ",
      t("Clear filters")
    ] })
  ] }) : s ? /* @__PURE__ */ e.jsx(e.Fragment, { children: t("The trash is empty.") }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: t("No entries yet.") }),
    l && /* @__PURE__ */ e.jsx(n.Button, { size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs(C.Link, { href: c, children: [
      /* @__PURE__ */ e.jsx(J, {}),
      " ",
      t("Write the first one")
    ] }) })
  ] });
}
function ms({ message: s, processing: a, onSaveMine: l }) {
  const [c, i] = re();
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
function Dl(s, a, l, c, i) {
  const r = a[0], d = s === r ? c(":language (main)", { language: i(s) }) : i(s), u = a.filter((m) => m !== s).map(i).join(", ");
  return l !== null && !l.includes(s) ? c("Editing: :language, not translated yet", { language: d }) : u === "" ? c("Editing: :language", { language: d }) : c("Editing: :language — switch to edit :others", { language: d, others: u });
}
function wa({ current: s, locales: a, translated: l, onSwitch: c }) {
  if (a.length < 2) return null;
  const i = Dl(s, a, l, t, V);
  return /* @__PURE__ */ e.jsxs("nav", { "aria-label": t("Languages"), className: "cms:flex cms:flex-wrap cms:items-center cms:gap-x-3 cms:gap-y-2", children: [
    /* @__PURE__ */ e.jsx("div", { className: "cms:inline-flex cms:items-center cms:gap-0.5 cms:rounded-md cms:bg-muted cms:p-0.5", children: a.map((r, d) => {
      const u = r === s, m = l === null || l.includes(r), o = d === 0 ? t(":language (main)", { language: V(r) }) : V(r), g = m ? o : t(":language: not translated yet", { language: o });
      return /* @__PURE__ */ e.jsxs(
        "button",
        {
          type: "button",
          title: g,
          "aria-label": g,
          "aria-current": u ? "page" : void 0,
          onClick: () => !u && c(r),
          className: `cms:inline-flex cms:h-7 cms:min-w-10 cms:items-center cms:justify-center cms:gap-1 cms:rounded cms:px-2.5 cms:text-xs cms:font-semibold cms:tracking-wide cms:uppercase cms:transition-colors ${u ? "cms:bg-card cms:text-foreground cms:shadow-xs" : "cms:text-muted-foreground cms:hover:text-foreground"} ${m ? "" : "cms:italic cms:opacity-70"}`,
          children: [
            r,
            m && l !== null && /* @__PURE__ */ e.jsx(be, { "aria-hidden": !0, className: "cms:size-3 cms:text-emerald-600" })
          ]
        },
        r
      );
    }) }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", "aria-live": "polite", children: i })
  ] });
}
function Sa(s) {
  return /* @__PURE__ */ e.jsx(Tl, { ...s }, `${s.editUrl}:${JSON.stringify(s.params ?? {})}:${s.locale}:${s.version}:${JSON.stringify([s.values, s.seo])}`);
}
function Tl({
  title: s,
  breadcrumbs: a,
  back: l,
  saveUrl: c,
  editUrl: i,
  params: r = {},
  viewUrl: d,
  empty: u,
  seoDescription: m,
  storageKey: o,
  menu: g,
  children: x,
  fields: h,
  locale: b,
  locales: v,
  translated: f = [],
  shared: j,
  values: _,
  seo: T,
  version: y,
  can: p
}) {
  n.useBreadcrumbs(a);
  const z = C.useForm({ locale: b, data: _, seo: T ?? {}, version: y }), k = z.errors, F = (D) => {
    const $ = Ae(k, D);
    $.length > 0 && z.clearErrors(...$);
  }, L = v[0], S = p.update, P = () => {
    z.processing || (z.transform((D) => ({ ...D, ...r })), z.put(c, { preserveScroll: !0 }));
  }, N = () => {
    z.transform((D) => ({ ...D, ...r, version: null })), z.put(c, { preserveScroll: !0 });
  };
  return n.useUnsavedChanges(z.isDirty, S ? P : void 0), /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (D) => {
    D.preventDefault(), P();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: s }),
    /* @__PURE__ */ e.jsx(
      n.PageHeader,
      {
        title: s,
        back: l,
        menu: g,
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          d && /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: d, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(ge, {}),
            " ",
            t("View")
          ] }) }),
          S && /* @__PURE__ */ e.jsxs(n.Button, { type: "submit", disabled: z.processing, children: [
            z.processing && /* @__PURE__ */ e.jsx(ce, { className: "cms:animate-spin" }),
            " ",
            t("Save")
          ] })
        ] }),
        children: z.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
      }
    ),
    x,
    /* @__PURE__ */ e.jsx(wa, { current: b, locales: v, translated: f, onSwitch: (D) => C.router.get(i, { ...r, locale: D }) }),
    /* @__PURE__ */ e.jsxs("fieldset", { disabled: !S, className: "cms:flex cms:flex-col cms:gap-6", children: [
      /* @__PURE__ */ e.jsx(ms, { message: k.version, processing: z.processing, onSaveMine: N }),
      h.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: u }) : /* @__PURE__ */ e.jsx(n.Card, { children: /* @__PURE__ */ e.jsxs(n.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: [
        (j.length > 0 || Be(h)) && /* @__PURE__ */ e.jsx("p", { role: "note", className: "cms:rounded-lg cms:border cms:border-dashed cms:px-3 cms:py-2 cms:text-sm cms:text-muted-foreground", children: L ? t("Shared by all languages: the greyed-out fields are edited in :language.", { language: V(L) }) : t("Shared by all languages: the greyed-out fields are edited in the main language.") }),
        h.filter((D) => rs(D, { ..._, ...z.data.data })).map((D) => j.includes(D.handle) ? /* @__PURE__ */ e.jsx("fieldset", { disabled: !0, className: ya, title: t("Shared by all languages"), children: /* @__PURE__ */ e.jsx(ne, { id: `data-${D.handle}`, field: D, content: !0, value: _[D.handle], errors: {}, onChange: () => {
        } }) }, D.handle) : /* @__PURE__ */ e.jsx(
          ne,
          {
            id: `data-${D.handle}`,
            field: D,
            content: !0,
            value: z.data.data[D.handle],
            errors: Y(k, `data.${D.handle}`),
            onChange: ($) => {
              z.setData("data", { ...z.data.data, [D.handle]: $ }), F(`data.${D.handle}`);
            }
          },
          D.handle
        ))
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsx(n.CollapsibleCard, { title: t("SEO"), description: m, titleClassName: "cms:text-base", storageKey: o, hasErrors: Ce(k, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !S, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(ue, { bare: !0, id: "seo", fields: os(), value: z.data.seo, errors: Y(k, "seo"), onChange: (D) => {
      z.setData("seo", D), F("seo");
    } }) }) })
  ] });
}
function zl({ collection: s, ...a }) {
  const l = I(`cms/collections/${s.handle}/entries`);
  return /* @__PURE__ */ e.jsx(
    Sa,
    {
      ...a,
      title: t(":title: listing page", { title: s.title }),
      breadcrumbs: [{ label: s.title, href: l }, { label: t("Listing page") }],
      back: { href: l, label: t("Back to :title", { title: s.title }) },
      saveUrl: I(`cms/collections/${s.handle}/listing`),
      editUrl: I(`cms/collections/${s.handle}/listing/edit`),
      viewUrl: s.url,
      empty: t("The listing page has no fields of its own: choose a listing blueprint for the collection under Structure → Collections."),
      seoDescription: t("How the listing page appears in search results and shared links."),
      storageKey: "cms:listing:seo"
    }
  );
}
function Ml({ fieldsets: s }) {
  const a = C.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(O, { message: a.fieldset }),
    /* @__PURE__ */ e.jsx(
      ba,
      {
        kind: "fieldset",
        base: I("cms/fieldsets"),
        rows: s,
        intro: t("Fields shared between blueprints, and the kinds of block of flexible fields.")
      }
    )
  ] });
}
function Bl(s) {
  return /* @__PURE__ */ e.jsx(Ll, { ...s }, `${s.locale}:${s.version}:${JSON.stringify(s.values)}`);
}
function Ll({ set: s, fields: a, locale: l, locales: c, shared: i, values: r, version: d, can: u, settings: m }) {
  const o = I(`cms/globals/${s.handle}/values`);
  n.useBreadcrumbs([{ label: t("Globals"), href: I("cms/globals") }, { label: s.title }]);
  const g = C.useForm({ locale: l, data: r, version: d }), x = g.errors, h = (y) => {
    const p = Ae(x, y);
    p.length > 0 && g.clearErrors(...p);
  }, b = c[0], v = n.useEditLock({
    type: "cms.global",
    id: s.id,
    locale: l,
    enabled: u.update,
    noun: t("global set"),
    leaveTo: I("cms/globals"),
    getUnsaved: () => g.isDirty ? { data: g.data.data } : null
  }), f = u.update && !v.readOnly, j = () => g.processing || g.put(o, { preserveScroll: !0 }), _ = () => {
    g.transform((y) => ({ ...y, version: null })), g.put(o, { preserveScroll: !0 });
  }, T = async (y) => {
    const p = await v.loadKept(y);
    p.data && typeof p.data == "object" && g.setData("data", p.data);
  };
  return n.useUnsavedChanges(g.isDirty && !v.takenOver, f ? j : void 0), /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (y) => {
    y.preventDefault(), j();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: s.title }),
    v.dialogs,
    /* @__PURE__ */ e.jsx(
      n.PageHeader,
      {
        title: s.title,
        menu: m ? [{ label: t("Settings"), href: m, icon: /* @__PURE__ */ e.jsx(Ie, {}) }] : [],
        back: { href: I("cms/globals"), label: t("Back to globals") },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          c.length > 1 && /* @__PURE__ */ e.jsxs(n.Select, { value: l, onValueChange: (y) => C.router.get(o, { locale: y }), children: [
            /* @__PURE__ */ e.jsx(n.SelectTrigger, { className: "cms:w-48", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(n.SelectContent, { children: c.map((y, p) => /* @__PURE__ */ e.jsxs(n.SelectItem, { value: y, children: [
              V(y),
              p === 0 ? ` ${t("(main)")}` : ""
            ] }, y)) })
          ] }),
          f && /* @__PURE__ */ e.jsxs(n.Button, { type: "submit", disabled: g.processing, children: [
            g.processing && /* @__PURE__ */ e.jsx(ce, { className: "cms:animate-spin" }),
            " ",
            t("Save")
          ] })
        ] }),
        children: g.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
      }
    ),
    a.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("This global set has no fields: choose a blueprint for it in its Settings.") }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(n.ViewingNotice, { by: v.viewingBy, onTakeOver: v.requestTakeOver }),
      b && l !== b && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:bg-muted/40 cms:p-3 cms:text-sm cms:text-muted-foreground", role: "note", children: d === null ? t("Not saved in :language yet: these are the :main values, which the site shows meanwhile. Translate them, then save.", { language: V(l), main: V(b) }) : t("A field left empty shows the :main value on the site.", { main: V(b) }) }),
      /* @__PURE__ */ e.jsx(ms, { message: x.version, processing: g.processing, onSaveMine: _ }),
      /* @__PURE__ */ e.jsx(n.KeptEditsNotice, { kept: v.kept, disabled: !f, onLoad: (y) => {
        T(y);
      }, onDiscard: (y) => {
        v.discardKept(y);
      } }),
      /* @__PURE__ */ e.jsx(
        is,
        {
          disabled: !f,
          fields: a,
          values: g.data.data,
          errors: x,
          storageKey: `cms:global:${s.handle}`,
          shared: i,
          sharedValues: r,
          sharedNote: b ? t("Shared by all languages: the greyed-out fields are edited in :language.", { language: V(b) }) : t("Shared by all languages: the greyed-out fields are edited in the main language."),
          onChange: (y, p) => {
            g.setData("data", { ...g.data.data, [y]: p }), h(`data.${y}`);
          }
        }
      )
    ] })
  ] });
}
let Ca = 0;
function $a(s, a = 0) {
  return s.flatMap(({ children: l, ...c }) => [{ ...c, key: `m${++Ca}`, depth: a }, ...$a(l ?? [], a + 1)]);
}
function Il(s) {
  const a = [], l = [{ depth: -1, children: a }];
  for (const { key: c, depth: i, ...r } of s) {
    for (; l.length > 1 && l[l.length - 1].depth >= i; ) l.pop();
    const d = { ...r, children: [] };
    l[l.length - 1].children.push(d), l.push({ depth: i, children: d.children });
  }
  return a;
}
function ye(s, a) {
  const l = s[a]?.depth ?? 0;
  let c = a + 1;
  for (; c < s.length && s[c].depth > l; ) c++;
  return c;
}
function _a(s, a, l) {
  const c = ye(s, a);
  return s.map((i, r) => r >= a && r < c ? { ...i, depth: i.depth + l } : i);
}
function Al(s, a, l) {
  const c = s[a], i = s[a - 1];
  return !c || !i || c.depth > i.depth || Math.max(...s.slice(a, ye(s, a)).map((d) => d.depth)) + 1 > l - 1 ? s : _a(s, a, 1);
}
function El(s, a) {
  const l = s[a];
  if (!l || l.depth === 0) return s;
  let c = a - 1;
  for (; c > 0 && s[c].depth >= l.depth; ) c--;
  const i = ye(s, a), r = ye(s, c), d = _a(s, a, -1).slice(a, i);
  return [...s.slice(0, a), ...s.slice(i, r), ...d, ...s.slice(r)];
}
function Fl(s, a) {
  return [...s.slice(0, a), ...s.slice(ye(s, a))];
}
function je(s) {
  return { key: `m${++Ca}`, depth: 0, entry_id: null, term_id: null, taxonomy_id: null, collection_id: null, target: null, url: null, labels: {}, new_tab: !1, query: null, ...s };
}
function Pl(s) {
  return s.url !== null || s.collection_id !== null && (s.query ?? "").trim() !== "" ? "main" : "title";
}
function Hl({ menu: s, items: a, locales: l, limits: c, terms: i, listings: r, indexes: d = [], can: u, settings: m }) {
  const o = I(`cms/menus/${s.handle}/links`);
  n.useBreadcrumbs([{ label: t("Menus"), href: I("cms/menus") }, { label: s.title }]);
  const [g, x] = M.useState(() => $a(a)), [h, b] = M.useState(null), v = C.useForm({ items: a }), f = v.errors, [j, _] = M.useState(!1), T = l[0] ?? "en", y = (L) => {
    x(L), _(!0);
  }, p = (L, S) => y(g.map((P, N) => N === L ? { ...P, ...S } : P)), z = () => {
    v.processing || (v.transform(() => ({ items: Il(g).map(Da) })), v.put(o, { preserveScroll: !0, onSuccess: () => _(!1) }));
  }, k = (L) => {
    L.preventDefault(), z();
  };
  n.useUnsavedChanges(j, u.update ? z : void 0);
  const F = (L) => /* @__PURE__ */ e.jsx(
    n.SortableList,
    {
      items: le(g, L),
      getId: (S) => g[S].key,
      getLabel: (S) => g[S].labels[T] || g[S].target?.title || g[S].url || "link",
      disabled: !u.update,
      onReorder: (S) => y(ds(g, L, S)),
      className: L < 0 ? "cms:gap-1" : "cms:mt-1 cms:gap-1 cms:pl-6",
      children: (S, { handle: P, isOverlay: N }) => {
        const D = g[S];
        return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${N ? "" : "cms:border-border/70"}`, children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2 cms:p-2", children: [
            u.update && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:h-10 cms:shrink-0 cms:items-center", children: /* @__PURE__ */ e.jsx(n.SortableHandle, { ...P, label: t("Move :title", { title: D.labels[T] || D.target?.title || D.url || t("link") }) }) }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
                /* @__PURE__ */ e.jsx(
                  n.Input,
                  {
                    "aria-label": t("Label (:language)", { language: V(T) }),
                    className: "cms:w-full cms:sm:max-w-xs",
                    disabled: !u.update,
                    placeholder: D.target?.title ?? t("Label"),
                    value: D.labels[T] ?? "",
                    onChange: ($) => p(S, { labels: { ...D.labels, [T]: $.target.value } })
                  }
                ),
                /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-32 cms:flex-1 cms:truncate cms:text-sm cms:text-muted-foreground", children: D.url !== null ? D.url : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  D.target ? `${D.target.kind}: ${D.target.title}` : t("Gone"),
                  " ",
                  (!D.target || !D.target.live) && /* @__PURE__ */ e.jsx(n.Badge, { variant: "outline", children: t("Not on the site") })
                ] }) }),
                u.update && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center", children: [
                  /* @__PURE__ */ e.jsxs("label", { className: "cms:mr-2 cms:flex cms:items-center cms:gap-1.5 cms:text-sm", children: [
                    /* @__PURE__ */ e.jsx(n.Checkbox, { checked: D.new_tab, onCheckedChange: ($) => p(S, { new_tab: $ }) }),
                    " ",
                    t("New tab")
                  ] }),
                  /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": t("Outdent"), disabled: D.depth === 0, onClick: () => y(El(g, S)), children: /* @__PURE__ */ e.jsx(cn, {}) }),
                  /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": t("Indent"), onClick: () => y(Al(g, S, c.depth)), children: /* @__PURE__ */ e.jsx(rn, {}) }),
                  /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": t("Remove, with what's under it"), onClick: () => y(Fl(g, S)), children: /* @__PURE__ */ e.jsx(K, {}) })
                ] })
              ] }),
              D.collection_id !== null && D.term_id === null && !D.taxonomy_id && /* @__PURE__ */ e.jsx(
                n.Input,
                {
                  "aria-label": t("Filters"),
                  className: "cms:w-full cms:sm:max-w-md cms:font-mono",
                  disabled: !u.update,
                  placeholder: t("Filters (optional): :example", { example: "filter=value" }),
                  value: D.query ?? "",
                  onChange: ($) => p(S, { query: $.target.value })
                }
              ),
              l.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: l.slice(1).map(($) => /* @__PURE__ */ e.jsx(
                n.Input,
                {
                  "aria-label": t("Label (:language)", { language: V($) }),
                  className: "cms:w-full cms:sm:max-w-xs",
                  disabled: !u.update,
                  placeholder: Pl(D) === "title" ? t(":language: its title there, else as :main", { language: V($), main: V(T) }) : t(":language: as :main", { language: V($), main: V(T) }),
                  value: D.labels[$] ?? "",
                  onChange: (U) => p(S, { labels: { ...D.labels, [$]: U.target.value } })
                },
                $
              )) })
            ] })
          ] }),
          !N && le(g, S).length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:px-2 cms:pb-2", children: F(S) })
        ] });
      }
    }
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: k, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: s.title }),
    /* @__PURE__ */ e.jsx(
      n.PageHeader,
      {
        title: s.title,
        menu: m ? [{ label: t("Settings"), href: m, icon: /* @__PURE__ */ e.jsx(Ie, {}) }] : [],
        back: { href: I("cms/menus"), label: t("Back to menus") },
        actions: u.update && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", disabled: g.length >= c.items, onClick: () => b("entry"), children: [
            /* @__PURE__ */ e.jsx(J, {}),
            " ",
            t("Entry")
          ] }),
          i.length > 0 && /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", disabled: g.length >= c.items, onClick: () => b("term"), children: [
            /* @__PURE__ */ e.jsx(fn, {}),
            " ",
            t("Term")
          ] }),
          r.length > 0 && /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", disabled: g.length >= c.items, onClick: () => b("listing"), children: [
            /* @__PURE__ */ e.jsx(wt, {}),
            " ",
            t("Listing")
          ] }),
          d.length > 0 && /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", disabled: g.length >= c.items, onClick: () => b("index"), children: [
            /* @__PURE__ */ e.jsx(Ut, {}),
            " ",
            t("Taxonomy index")
          ] }),
          /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", disabled: g.length >= c.items, onClick: () => b("url"), children: [
            /* @__PURE__ */ e.jsx(bt, {}),
            " ",
            t("Link")
          ] }),
          /* @__PURE__ */ e.jsxs(n.Button, { type: "submit", disabled: v.processing, children: [
            v.processing && /* @__PURE__ */ e.jsx(ce, { className: "cms:animate-spin" }),
            " ",
            t("Save")
          ] })
        ] }),
        children: j && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
      }
    ),
    /* @__PURE__ */ e.jsx(O, { message: f.items }),
    Object.keys(f).some((L) => L.startsWith("items.")) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: t("Some links need fixing: :error", { error: Object.values(f).filter(Boolean)[0] }) }),
    /* @__PURE__ */ e.jsx(n.Card, { className: "cms:p-2", children: g.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:p-4 cms:text-center cms:text-muted-foreground", children: t("No links yet. Add an entry or a link.") }) : F(-1) }),
    /* @__PURE__ */ e.jsx(Ul, { kind: h, terms: i, listings: r, indexes: d, onClose: () => b(null), onAdd: (L) => {
      y([...g, L]), b(null);
    }, main: T })
  ] });
}
function Da({ target: s, children: a, ...l }) {
  return { ...l, children: a.map(Da) };
}
const Ol = () => t("A menu links to entries that already exist: create the page first (Content → Entries), then add it here, or add a web address instead."), Vl = () => ({ entry: t("Link to an entry"), term: t("Link to a term's page"), listing: t("Link to a listing page"), index: t("Link to a taxonomy's index page"), url: t("Link to an address") }), Rl = () => ({
  entry: t("It follows the entry: its title (unless you give a label) and its address in each language. It shows only while the entry is on the site."),
  term: t("The page listing the term's entries, in each language. Its title is the label unless you give one."),
  listing: t("The collection's listing page, in each language, optionally with filters. The collection's title is the label unless you give one."),
  index: t("The page listing a taxonomy's terms, in each language. The taxonomy's title is the label unless you give one."),
  url: t("A web address, a path on this site (/contact), mailto: or tel:.")
});
function Ul({ kind: s, terms: a, listings: l, indexes: c, onClose: i, onAdd: r, main: d }) {
  const [u, m] = M.useState(null), [o, g] = M.useState(""), [x, h] = M.useState(""), [b, v] = M.useState(""), [f, j] = M.useState(""), [_, T] = M.useState("");
  M.useEffect(() => {
    m(null), g(""), h(""), v(""), j(""), T("");
  }, [s]), M.useEffect(() => T(""), [o]);
  const y = s === "term" ? a.find(($) => String($.id) === o) : void 0, p = y?.pages.find(($) => String($.collection ?? "") === _) ?? y?.pages[0], z = s === "index" ? c.find(($) => String($.id) === o) : void 0, k = z?.pages.find(($) => String($.collection ?? "") === _) ?? z?.pages[0], F = y ?? z, L = y ? p : k, S = x.trim() === "" || $n(x.trim()), P = b.trim() ? { [d]: b.trim() } : {}, N = async () => {
    if (s === "entry" && u !== null) {
      const $ = await fetch(`${I("cms/entries/picker")}?${ea({ ids: [u], collections: [] })}`, { headers: { Accept: "application/json" }, credentials: "same-origin" }), U = $.ok ? (await $.json()).items[0] : void 0;
      r(je({ entry_id: u, target: U ? { title: U.title, kind: U.collection, live: U.status === "published" } : null, labels: P }));
    } else if (s === "term" && o !== "") {
      const $ = a.find((ie) => String(ie.id) === o), U = p?.collection ?? null, he = U === null ? t("Shared page") : p?.title ?? "";
      r(je({ term_id: Number(o), collection_id: U, target: $ ? { title: $.title, kind: `${$.taxonomy} · ${he}`, live: !0 } : null, labels: P }));
    } else if (s === "index" && o !== "" && z) {
      const $ = k?.collection ?? null, U = $ === null ? t(":taxonomy · Index page", { taxonomy: z.title }) : t(":taxonomy · :collection index", { taxonomy: z.title, collection: k?.title ?? "" });
      r(je({ taxonomy_id: z.id, collection_id: $, target: { title: z.title, kind: U, live: !0 }, labels: P }));
    } else if (s === "listing" && o !== "") {
      const $ = l.find((U) => String(U.id) === o);
      r(je({ collection_id: Number(o), target: $ ? { title: $.title, kind: t("Listing page"), live: !0 } : null, labels: P, query: f.trim().replace(/^\?/, "") || null }));
    } else s === "url" && x.trim() !== "" && S && b.trim() !== "" && r(je({ url: x.trim(), labels: P }));
  }, D = s === "entry" ? u !== null : s === "url" ? x.trim() !== "" && S && b.trim() !== "" : o !== "";
  return /* @__PURE__ */ e.jsx(n.Dialog, { open: s !== null, onOpenChange: ($) => !$ && i(), children: /* @__PURE__ */ e.jsxs(n.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(n.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(n.DialogTitle, { children: s ? Vl()[s] : "" }),
      /* @__PURE__ */ e.jsx(n.DialogDescription, { children: s ? Rl()[s] : "" })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
      s === "entry" && /* @__PURE__ */ e.jsx(
        Se,
        {
          id: "menu-entry",
          value: u,
          multiple: !1,
          max: null,
          collections: [],
          invalid: !1,
          emptyHint: Ol(),
          onChange: ($) => m(typeof $ == "number" ? $ : null)
        }
      ),
      (s === "term" || s === "listing" || s === "index") && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "menu-target", children: t(s === "term" ? "Term" : s === "index" ? "Taxonomy" : "Collection") }),
        /* @__PURE__ */ e.jsxs(n.Select, { value: o, onValueChange: g, children: [
          /* @__PURE__ */ e.jsx(n.SelectTrigger, { id: "menu-target", children: /* @__PURE__ */ e.jsx(n.SelectValue, { placeholder: t("Choose…") }) }),
          /* @__PURE__ */ e.jsx(n.SelectContent, { children: s === "term" ? a.map(($) => /* @__PURE__ */ e.jsxs(n.SelectItem, { value: String($.id), children: [
            $.taxonomy,
            ": ",
            $.title
          ] }, $.id)) : (s === "index" ? c : l).map(($) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: String($.id), children: $.title }, $.id)) })
        ] })
      ] }),
      F && F.pages.length > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "menu-term-page", children: t("Page") }),
        /* @__PURE__ */ e.jsxs(n.Select, { value: String(L?.collection ?? "") || "__all", onValueChange: ($) => T($ === "__all" ? "" : $), children: [
          /* @__PURE__ */ e.jsx(n.SelectTrigger, { id: "menu-term-page", children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(n.SelectContent, { children: F.pages.map(($) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: $.collection === null ? "__all" : String($.collection), children: $.collection === null ? $.title : t(":collection only", { collection: $.title }) }, $.collection ?? "__all")) })
        ] }),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t(y ? "The shared page lists the term's entries from every collection; a collection's page only its own." : "The shared index lists all the taxonomy's terms; a collection's only those its entries have.") })
      ] }),
      s === "listing" && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "menu-query", children: t("Filters (optional)") }),
        /* @__PURE__ */ e.jsx(
          n.Input,
          {
            id: "menu-query",
            className: "cms:font-mono",
            value: f,
            placeholder: "filter=value&other=value",
            onChange: ($) => j($.target.value)
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
            "aria-invalid": !S,
            onChange: ($) => h($.target.value)
          }
        ),
        !S && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t("This address could run code; use https://, a path, mailto: or tel:.") })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "menu-label", children: t(s === "url" ? "Label" : "Label (optional)") }),
        /* @__PURE__ */ e.jsx(n.Input, { id: "menu-label", value: b, onChange: ($) => v($.target.value) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(n.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "outline", onClick: i, children: t("Cancel") }),
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", onClick: () => {
        N();
      }, disabled: !D, children: t("Add") })
    ] })
  ] }) });
}
const ql = () => [
  { value: "all", label: t("All") },
  { value: "pending", label: t("Pending") },
  { value: "approved", label: t("Approved") },
  { value: "spam", label: t("Spam") },
  { value: "trashed", label: t("Trash") }
], Kl = (s) => ({ pending: t("Pending"), approved: t("Approved"), spam: t("Spam") })[s];
function Wl({ tab: s, counts: a, filters: l, collections: c, comments: i, can: r, errors: d = {} }) {
  n.useBreadcrumbs([{ label: t("Comments"), href: I("cms/comments") }]);
  const [u, m] = M.useState(l.search), [o, g] = M.useState([]), [x, h] = M.useState(null), [b, v] = re(), f = (p) => {
    const z = { status: s, search: l.search, collection: l.collection, ...p };
    C.router.get(I("cms/comments"), {
      ...z.status !== "all" ? { status: z.status } : {},
      ...z.search ? { search: z.search } : {},
      ...z.collection ? { collection: z.collection } : {},
      ...l.entry ? { entry: l.entry } : {}
    }, { preserveState: !0, replace: !0, onSuccess: () => g([]) });
  };
  M.useEffect(() => {
    if (u === l.search) return;
    const p = window.setTimeout(() => f({ search: u }), 300);
    return () => window.clearTimeout(p);
  }, [u]);
  const j = (p, z = {}) => C.router.post(I(p), z, { preserveScroll: !0, onSuccess: () => g([]) }), _ = (p, z) => j(`cms/comments/${p.id}/status`, { status: z }), T = (p) => {
    const z = () => j("cms/comments/bulk", { action: p, ids: o });
    p === "delete" ? b(o.length === 1 ? t("Permanently delete 1 comment? This can't be undone.") : t("Permanently delete :count comments? This can't be undone.", { count: o.length }), z) : z();
  }, y = i.data.length > 0 && o.length === i.data.length;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: t("Comments") }),
    /* @__PURE__ */ e.jsx(n.PageHeader, { title: t("Comments") }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:sm:w-64", children: [
        /* @__PURE__ */ e.jsx(ke, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          n.Input,
          {
            type: "search",
            placeholder: t("Search text, name or email"),
            "aria-label": t("Search comments"),
            className: "cms:pl-9",
            value: u,
            onChange: (p) => m(p.target.value)
          }
        )
      ] }),
      c.length > 1 && /* @__PURE__ */ e.jsxs(n.Select, { value: l.collection ?? "all", onValueChange: (p) => f({ collection: p === "all" ? null : p }), children: [
        /* @__PURE__ */ e.jsx(n.SelectTrigger, { className: "cms:w-48", "aria-label": t("Collection"), children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
        /* @__PURE__ */ e.jsxs(n.SelectContent, { children: [
          /* @__PURE__ */ e.jsx(n.SelectItem, { value: "all", children: t("Every collection") }),
          c.map((p) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: p.handle, children: p.title }, p.handle))
        ] })
      ] })
    ] }),
    l.entry !== null && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      t("Comments on one entry."),
      " ",
      /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:underline cms:underline-offset-4", onClick: () => C.router.get(I("cms/comments")), children: t("Show all") })
    ] }),
    /* @__PURE__ */ e.jsx(n.Tabs, { value: s, onValueChange: (p) => f({ status: p }), children: /* @__PURE__ */ e.jsx(n.TabsList, { className: "cms:h-auto cms:flex-wrap cms:justify-start", children: ql().map((p) => /* @__PURE__ */ e.jsxs(n.TabsTrigger, { value: p.value, title: p.value === "all" ? t("Everything but the trash") : void 0, children: [
      p.label,
      " ",
      /* @__PURE__ */ e.jsx("span", { className: "cms:ml-1 cms:text-muted-foreground", children: a[p.value] })
    ] }, p.value)) }) }),
    o.length > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2 cms:text-sm", role: "toolbar", "aria-label": t("With the selected comments"), children: [
      /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", children: t(":count selected", { count: o.length }) }),
      r.moderate && s !== "trashed" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "outline", onClick: () => T("approve"), children: [
          /* @__PURE__ */ e.jsx(be, {}),
          " ",
          t("Approve")
        ] }),
        /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "outline", onClick: () => T("unapprove"), children: [
          /* @__PURE__ */ e.jsx(Me, {}),
          " ",
          t("Unapprove")
        ] }),
        /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "outline", onClick: () => T("spam"), children: [
          /* @__PURE__ */ e.jsx(es, {}),
          " ",
          t("Spam")
        ] })
      ] }),
      r.delete && s !== "trashed" && /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "outline", onClick: () => T("trash"), children: [
        /* @__PURE__ */ e.jsx(K, {}),
        " ",
        t("Move to trash")
      ] }),
      r.delete && s === "trashed" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "outline", onClick: () => T("restore"), children: [
          /* @__PURE__ */ e.jsx(ve, {}),
          " ",
          t("Restore")
        ] }),
        /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "destructive", onClick: () => T("delete"), children: [
          /* @__PURE__ */ e.jsx(K, {}),
          " ",
          t("Permanently delete")
        ] })
      ] })
    ] }),
    i.data.length === 0 ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:rounded-xl cms:border cms:border-dashed cms:px-6 cms:py-16 cms:text-center", children: [
      /* @__PURE__ */ e.jsx("span", { className: "cms:grid cms:size-10 cms:place-items-center cms:rounded-full cms:bg-muted cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx(dn, { className: "cms:size-4" }) }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: l.search ? t("No comments match.") : t("No comments here.") }),
      s !== "trashed" && /* @__PURE__ */ e.jsx(n.TrashHint, { count: a.trashed ?? 0, onShow: () => f({ status: "trashed" }) })
    ] }) : /* @__PURE__ */ e.jsxs(n.Card, { className: "cms:divide-y cms:p-0", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3 cms:px-4 cms:py-2 cms:text-sm cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsx(n.Checkbox, { checked: y, "aria-label": t("Select all"), onCheckedChange: (p) => g(p ? i.data.map((z) => z.id) : []) }),
        /* @__PURE__ */ e.jsx("span", { children: t(":from–:to of :total", { from: i.from, to: i.to, total: i.total }) })
      ] }),
      i.data.map((p) => /* @__PURE__ */ e.jsxs("article", { className: "cms:flex cms:gap-3 cms:px-4 cms:py-4", "aria-labelledby": `comment-${p.id}-author`, children: [
        /* @__PURE__ */ e.jsx(
          n.Checkbox,
          {
            checked: o.includes(p.id),
            "aria-label": t("Select :author's comment", { author: p.author }),
            onCheckedChange: (z) => g(z ? [...o, p.id] : o.filter((k) => k !== p.id))
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-x-3 cms:gap-y-1 cms:text-sm", children: [
            /* @__PURE__ */ e.jsx("span", { id: `comment-${p.id}-author`, className: "cms:font-medium", children: p.author }),
            p.email && /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", children: p.email }),
            p.member && /* @__PURE__ */ e.jsx(n.Badge, { variant: "outline", children: t("Signed in") }),
            !p.trashed && /* @__PURE__ */ e.jsx(n.Badge, { variant: p.status === "approved" ? "success" : p.status === "spam" ? "destructive" : "warning", children: Kl(p.status) }),
            /* @__PURE__ */ e.jsxs("span", { className: "cms:text-muted-foreground", children: [
              p.createdAt ? q(p.createdAt) : "",
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
              /* @__PURE__ */ e.jsx(ge, { className: "cms:inline cms:size-3" })
            ] }) : p.entry.title,
            p.parent && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              " · ",
              t("replying to :author: “:excerpt”", { author: p.parent.author, excerpt: p.parent.excerpt })
            ] })
          ] }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:whitespace-pre-wrap cms:break-words", children: p.body }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-1", children: [
            r.moderate && !p.trashed && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              p.status !== "approved" && /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "ghost", onClick: () => _(p, "approved"), children: [
                /* @__PURE__ */ e.jsx(be, {}),
                " ",
                t("Approve")
              ] }),
              p.status === "approved" && /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "ghost", onClick: () => _(p, "pending"), children: [
                /* @__PURE__ */ e.jsx(Me, {}),
                " ",
                t("Unapprove")
              ] }),
              p.status !== "spam" && /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "ghost", onClick: () => _(p, "spam"), children: [
                /* @__PURE__ */ e.jsx(es, {}),
                " ",
                t("Spam")
              ] }),
              p.status !== "spam" && /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "ghost", onClick: () => h({ row: p, mode: "reply" }), children: [
                /* @__PURE__ */ e.jsx($t, {}),
                " ",
                t("Reply")
              ] }),
              /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "ghost", onClick: () => h({ row: p, mode: "edit" }), children: [
                /* @__PURE__ */ e.jsx(Mt, {}),
                " ",
                t("Edit")
              ] })
            ] }),
            r.delete && !p.trashed && /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "ghost", onClick: () => C.router.delete(I(`cms/comments/${p.id}`), { preserveScroll: !0 }), children: [
              /* @__PURE__ */ e.jsx(K, {}),
              " ",
              t("Move to trash")
            ] }),
            r.delete && p.trashed && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "ghost", onClick: () => j(`cms/comments/${p.id}/restore`), children: [
                /* @__PURE__ */ e.jsx(ve, {}),
                " ",
                t("Restore")
              ] }),
              /* @__PURE__ */ e.jsxs(n.Button, { size: "sm", variant: "ghost", onClick: () => b(
                t("Permanently delete this comment? Replies to it stay."),
                () => C.router.delete(I(`cms/comments/${p.id}/force`), { preserveScroll: !0 })
              ), children: [
                /* @__PURE__ */ e.jsx(K, {}),
                " ",
                t("Permanently delete")
              ] })
            ] })
          ] })
        ] })
      ] }, p.id))
    ] }),
    (i.prev_page_url || i.next_page_url) && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:justify-end cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(n.Button, { variant: "outline", size: "sm", disabled: !i.prev_page_url, onClick: () => i.prev_page_url && C.router.get(i.prev_page_url), children: [
        /* @__PURE__ */ e.jsx(as, {}),
        " ",
        t("Newer")
      ] }),
      /* @__PURE__ */ e.jsxs(n.Button, { variant: "outline", size: "sm", disabled: !i.next_page_url, onClick: () => i.next_page_url && C.router.get(i.next_page_url), children: [
        t("Older"),
        " ",
        /* @__PURE__ */ e.jsx(Ne, {})
      ] })
    ] }),
    x && /* @__PURE__ */ e.jsx(Gl, { row: x.row, mode: x.mode, error: d.body, onClose: () => h(null) }, `${x.mode}-${x.row.id}`),
    v
  ] });
}
function Gl({ row: s, mode: a, error: l, onClose: c }) {
  const [i, r] = M.useState(a === "edit" ? s.body : ""), [d, u] = M.useState(!1), m = () => {
    u(!0);
    const o = { preserveScroll: !0, onSuccess: c, onFinish: () => u(!1) };
    a === "reply" ? C.router.post(I(`cms/comments/${s.id}/reply`), { body: i }, o) : C.router.put(I(`cms/comments/${s.id}`), { body: i }, o);
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
    /* @__PURE__ */ e.jsx(O, { message: l }),
    /* @__PURE__ */ e.jsxs(n.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "outline", onClick: c, children: t("Cancel") }),
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", disabled: i.trim() === "" || d, onClick: m, children: t(a === "reply" ? "Post reply" : "Save") })
    ] })
  ] }) });
}
const Jl = () => [
  { role: "title", label: t("Meta title"), automatic: t("Automatic (the title)") },
  { role: "description", label: t("Meta description"), automatic: t("Automatic (nothing)") },
  { role: "image", label: t("Share image"), automatic: t("Automatic (nothing)") }
], Je = "__auto";
function Yl({ site: s, siteName: a, collections: l, taxonomies: c, settingsNav: i }) {
  n.useBreadcrumbs([{ label: t("Settings"), href: I("settings") }, { label: t("SEO") }]);
  const r = [...l ?? [], ...c ?? []], d = C.useForm({
    site: { ...s },
    mappings: r.map((h) => ({ kind: h.kind, id: h.id, title: h.chosen.title ?? "", description: h.chosen.description ?? "", image: h.chosen.image ?? "" }))
  }), u = d.errors, m = () => d.put(I("cms/seo"), { preserveScroll: !0, onSuccess: () => d.setDefaults() });
  n.useUnsavedChanges(d.isDirty, m);
  const o = (h, b) => d.setData("site", { ...d.data.site, [h]: b }), g = (h, b, v) => d.setData("mappings", d.data.mappings.map((f, j) => j === h ? { ...f, [b]: v } : f)), x = (h, b, v, f, j) => /* @__PURE__ */ e.jsxs(n.CollapsibleCard, { title: b, description: v, titleClassName: "cms:text-base", storageKey: `cms:seo:${h}`, contentClassName: "cms:flex cms:flex-col cms:divide-y cms:divide-border/60", children: [
    f.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("None yet.") }),
    f.map((_, T) => {
      const y = j + T;
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3 cms:py-4 cms:first:pt-0 cms:last:pb-0", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:justify-between cms:gap-3", children: [
          /* @__PURE__ */ e.jsx("h3", { className: "cms:font-medium", children: _.title }),
          /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: _.blueprint ? t("Blueprint: :name", { name: _.blueprint }) : t("No blueprint") })
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-3 cms:sm:grid-cols-3", children: Jl().map(({ role: p, label: z, automatic: k }) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-1.5", children: [
          /* @__PURE__ */ e.jsx(n.Label, { htmlFor: `seo-${y}-${p}`, className: "cms:text-xs", children: z }),
          /* @__PURE__ */ e.jsxs(n.Select, { value: d.data.mappings[y]?.[p] || Je, onValueChange: (F) => g(y, p, F === Je ? "" : F), children: [
            /* @__PURE__ */ e.jsx(n.SelectTrigger, { id: `seo-${y}-${p}`, className: "cms:w-full", children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(n.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(n.SelectItem, { value: Je, children: k }),
              _.options[p].map((F) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: F.value, children: F.label }, F.value))
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(O, { message: u[`mappings.${y}.${p}`] })
        ] }, p)) })
      ] }, `${_.kind}-${_.id}`);
    })
  ] });
  return /* @__PURE__ */ e.jsx(n.SettingsLayout, { items: i, current: "cms-seo", children: /* @__PURE__ */ e.jsxs("form", { onSubmit: (h) => {
    h.preventDefault(), m();
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
        /* @__PURE__ */ e.jsx(n.Switch, { id: "seo-noindex", checked: d.data.site.noindex, onCheckedChange: (h) => o("noindex", h) }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-0.5", children: [
          /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "seo-noindex", children: t("Hide the whole site from search engines") }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t("Every page asks not to be indexed and the sitemap is empty. For a site still being built, or staging.") })
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-start cms:justify-between cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-3", children: [
          /* @__PURE__ */ e.jsx(n.Switch, { id: "seo-append", checked: d.data.site.appendName, onCheckedChange: (h) => o("appendName", h) }),
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
              onChange: (h) => o("separator", h.target.value)
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
            onChange: (h) => o("twitter", h.target.value)
          }
        ),
        /* @__PURE__ */ e.jsx(O, { message: u["site.twitter"] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "seo-image", children: t("Default share image") }),
        /* @__PURE__ */ e.jsx(
          n.MediaPickerInput,
          {
            id: "seo-image",
            invalid: u["site.image"] !== void 0,
            disabled: !1,
            multiple: !1,
            max: null,
            types: ["image"],
            value: d.data.site.image,
            onChange: (h) => o("image", typeof h == "number" ? h : null)
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t("Shown when a page is shared and has no image of its own.") }),
        /* @__PURE__ */ e.jsx(O, { message: u["site.image"] })
      ] })
    ] }),
    r.length > 0 && /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx("h2", { className: "cms:text-base cms:font-medium", children: t("Fields used for SEO") }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("When an entry or term leaves its meta title, description or share image empty, the site uses one of its fields instead. A page's own SEO fields always win; after the field come the site's (the description in Settings → Site, the share image above).") })
    ] }),
    l !== null && x("Collections", t("Collections"), t("Entries of each collection."), l, 0),
    c !== null && x("Taxonomies", t("Taxonomies"), t("Term pages of each taxonomy."), c, l?.length ?? 0),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t("Meta title: a text field. Meta description: a text or textarea field, cut to 300 characters. Share image: the first image of a media field.") })
  ] }) });
}
const Ql = 3;
function Zl({ form: s, forms: a, submissions: l, can: c, createForm: i = null }) {
  n.useBreadcrumbs([{ label: t("Submissions"), href: I("cms/submissions") }, ...s ? [{ label: s.title }] : []]);
  const [r, d] = M.useState(null), [u, m] = re();
  if (!s || !l)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(C.Head, { title: t("Submissions") }),
      /* @__PURE__ */ e.jsx(n.PageHeader, { title: t("Submissions"), description: t("What visitors send through the site's forms.") }),
      /* @__PURE__ */ e.jsxs(n.Card, { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:px-6 cms:py-14 cms:text-center", children: [
        /* @__PURE__ */ e.jsx(ln, { className: "cms:size-8 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
          /* @__PURE__ */ e.jsx("p", { className: "cms:font-medium", children: t("No forms yet") }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:max-w-sm cms:text-sm cms:text-muted-foreground", children: t(i ? "Create a form, put it on a page, and what visitors send shows up here." : "Once someone creates a form and puts it on a page, what visitors send shows up here.") })
        ] }),
        i && /* @__PURE__ */ e.jsx(n.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(C.Link, { href: i, children: [
          /* @__PURE__ */ e.jsx(J, {}),
          " ",
          t("Create a form")
        ] }) })
      ] })
    ] });
  const o = (l.data[0]?.rows ?? []).slice(0, Ql), g = (x) => u(
    t("Permanently delete this submission? It can't be restored."),
    () => C.router.delete(I(`cms/submissions/${x.id}`), { preserveScroll: !0, onSuccess: () => d(null) })
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: t(":form submissions", { form: s.title }) }),
    /* @__PURE__ */ e.jsx(
      n.PageHeader,
      {
        title: s.title,
        menu: l.total > 0 && c.export ? [{ label: t("Export CSV"), href: I(`cms/forms/${s.handle}/submissions/export`), download: !0, icon: /* @__PURE__ */ e.jsx(lt, {}) }] : [],
        children: a.length > 1 && /* @__PURE__ */ e.jsxs(n.Select, { value: s.handle, onValueChange: (x) => C.router.get(I(`cms/forms/${x}/submissions`)), children: [
          /* @__PURE__ */ e.jsx(n.SelectTrigger, { className: "cms:w-56", "aria-label": t("Form"), children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(n.SelectContent, { children: a.map((x) => /* @__PURE__ */ e.jsxs(n.SelectItem, { value: x.handle, children: [
            x.title,
            " (",
            x.count,
            ")"
          ] }, x.handle)) })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(n.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(n.Table, { children: [
      /* @__PURE__ */ e.jsx(n.TableHeader, { children: /* @__PURE__ */ e.jsxs(n.TableRow, { children: [
        /* @__PURE__ */ e.jsx(n.TableHead, { children: t("Sent") }),
        o.map((x) => /* @__PURE__ */ e.jsx(n.TableHead, { children: x.label }, x.handle))
      ] }) }),
      /* @__PURE__ */ e.jsxs(n.TableBody, { children: [
        l.data.length === 0 && /* @__PURE__ */ e.jsx(n.TableRow, { children: /* @__PURE__ */ e.jsx(n.TableCell, { colSpan: o.length + 1, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: t("Nothing sent yet.") }) }),
        l.data.map((x) => /* @__PURE__ */ e.jsxs(n.TableRow, { children: [
          /* @__PURE__ */ e.jsx(n.TableCell, { className: "cms:whitespace-nowrap", children: /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:font-medium cms:hover:underline", onClick: () => d(x), children: q(x.createdAt) }) }),
          o.map((h) => /* @__PURE__ */ e.jsx(n.TableCell, { className: "cms:max-w-64 cms:truncate", children: x.rows.find((b) => b.handle === h.handle)?.value }, h.handle))
        ] }, x.id))
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
            children: /* @__PURE__ */ e.jsx(as, {})
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
            children: /* @__PURE__ */ e.jsx(Ne, {})
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(n.Dialog, { open: r !== null, onOpenChange: (x) => !x && d(null), children: /* @__PURE__ */ e.jsxs(n.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto", children: [
      /* @__PURE__ */ e.jsxs(n.DialogHeader, { children: [
        /* @__PURE__ */ e.jsx(n.DialogTitle, { children: s.title }),
        /* @__PURE__ */ e.jsxs(n.DialogDescription, { children: [
          t("Sent :date", { date: q(r?.createdAt ?? null) }),
          " · ",
          r?.locale.toUpperCase()
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-3 cms:text-sm", children: r?.rows.map((x) => /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: x.label }),
        /* @__PURE__ */ e.jsx("dd", { className: "cms:whitespace-pre-wrap cms:break-words cms:text-muted-foreground", children: x.files && x.files.length > 0 ? /* @__PURE__ */ e.jsx("ul", { className: "cms:flex cms:flex-col cms:gap-1", children: x.files.map((h) => /* @__PURE__ */ e.jsx("li", { children: /* @__PURE__ */ e.jsx("a", { href: h.url, className: "cms:underline cms:underline-offset-4 hover:cms:text-foreground", download: !0, children: h.name }) }, h.url)) }) : x.file ? /* @__PURE__ */ e.jsx("a", { href: x.file, className: "cms:underline cms:underline-offset-4 hover:cms:text-foreground", download: !0, children: x.value }) : x.value || "—" })
      ] }, x.handle)) }),
      r && (r.visitor.ip || r.visitor.userAgent || r.visitor.referrer) && /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-3 cms:border-t cms:pt-3 cms:text-sm", children: [[t("IP address"), r.visitor.ip], [t("Browser"), r.visitor.userAgent], [t("Sent from"), r.visitor.referrer]].map(([x, h]) => h && /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: x }),
        /* @__PURE__ */ e.jsx("dd", { className: "cms:break-all cms:text-muted-foreground", children: h })
      ] }, x)) }),
      c.delete && r && /* @__PURE__ */ e.jsx(n.DialogFooter, { children: /* @__PURE__ */ e.jsxs(n.Button, { variant: "destructive", onClick: () => g(r), children: [
        /* @__PURE__ */ e.jsx(K, {}),
        " ",
        t("Delete")
      ] }) })
    ] }) }),
    m
  ] });
}
const Ye = "__top";
function Xl(s) {
  return /* @__PURE__ */ e.jsx(ec, { ...s }, `${s.term?.id ?? "new"}:${s.locale}:${s.version}:${JSON.stringify([s.values, s.seo, s.term?.template, s.parentId])}`);
}
function ec({ taxonomy: s, term: a, parentId: l = null, terms: c = [], translated: i, fields: r, locale: d, locales: u, shared: m, sharedValues: o, values: g, seo: x, version: h, usedBy: b = [], redirectsUrl: v = null, templates: f = null }) {
  const j = I(`cms/taxonomies/${s.handle}/terms`), _ = a ? I(`cms/terms/${a.id}/content`) : j, T = a ? a.title : t("New term");
  n.useBreadcrumbs([{ label: s.title, href: `${j}?locale=${d}` }, { label: T }]);
  const y = C.useForm({
    locale: d,
    title: a?.ownTitle ?? "",
    slug: a?.slug ?? "",
    parent_id: l,
    data: g,
    seo: x ?? {},
    template: a?.template ?? "",
    version: h
  }), p = y.errors, z = (N) => {
    const D = Ae(p, N);
    D.length > 0 && y.clearErrors(...D);
  }, k = () => y.processing || (a ? y.put(_, { preserveScroll: !0 }) : y.post(_)), F = () => {
    y.transform((N) => ({ ...N, version: null })), y.put(_, { preserveScroll: !0 });
  }, L = n.useEditLock({
    type: "cms.term",
    id: a?.id,
    locale: d,
    enabled: a !== null && i,
    noun: t("term"),
    leaveTo: `${j}?locale=${d}`,
    getUnsaved: () => y.isDirty ? { data: y.data.data, seo: y.data.seo, template: y.data.template } : null
  }), S = !L.readOnly, P = async (N) => {
    const D = await L.loadKept(N);
    y.setData(($) => ({
      ...$,
      data: D.data && typeof D.data == "object" ? D.data : $.data,
      seo: D.seo && typeof D.seo == "object" ? D.seo : $.seo,
      template: typeof D.template == "string" ? D.template : $.template
    }));
  };
  return n.useUnsavedChanges(y.isDirty && !L.takenOver, S ? k : void 0), /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (N) => {
    N.preventDefault(), k();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: a ? a.title : t("New term · :taxonomy", { taxonomy: s.title }) }),
    L.dialogs,
    /* @__PURE__ */ e.jsx(
      n.PageHeader,
      {
        title: T,
        back: { href: `${j}?locale=${d}`, label: t("Back to :title", { title: s.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          a?.url && /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: a.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(ge, {}),
            " ",
            t("View page")
          ] }) }),
          S && /* @__PURE__ */ e.jsxs(n.Button, { type: "submit", disabled: y.processing, children: [
            y.processing && /* @__PURE__ */ e.jsx(ce, { className: "cms:animate-spin" }),
            " ",
            t(a ? "Save" : "Create term")
          ] })
        ] }),
        children: y.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:items-start cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_20rem]", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(
          wa,
          {
            current: d,
            locales: u,
            translated: a ? a.translatedIn ?? null : [d],
            onSwitch: (N) => C.router.get(a ? `${j}/${a.id}/edit` : `${j}/create`, { locale: N, ...a === null && y.data.parent_id !== null ? { parent: y.data.parent_id } : {} })
          }
        ),
        /* @__PURE__ */ e.jsx(n.ViewingNotice, { by: L.viewingBy, onTakeOver: L.requestTakeOver }),
        a === null && u.length > 1 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("In :language. Translate it here afterwards: switch the language and give it a title there.", { language: V(d) }) }),
        !i && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:bg-muted/40 cms:p-3 cms:text-sm cms:text-muted-foreground", role: "note", children: t("Not in :language yet: the site shows the :main term meanwhile. Give it a title in :language and save to add it.", { language: V(d), main: V(u[0] ?? "en") }) }),
        /* @__PURE__ */ e.jsxs("fieldset", { disabled: !S, className: "cms:grid cms:min-w-0 cms:gap-4 cms:sm:grid-cols-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "term-title", children: t("Title") }),
            /* @__PURE__ */ e.jsx(
              n.Input,
              {
                id: "term-title",
                value: y.data.title,
                required: !0,
                autoFocus: a === null,
                placeholder: a?.mainTitle ?? "",
                maxLength: 255,
                "aria-invalid": p.title !== void 0,
                onChange: (N) => {
                  y.setData("title", N.target.value), z("title");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(O, { message: p.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "term-slug", children: t("Slug") }),
            /* @__PURE__ */ e.jsx(
              n.Input,
              {
                id: "term-slug",
                className: "cms:font-mono",
                value: y.data.slug,
                placeholder: t("Made from the title"),
                maxLength: 200,
                "aria-invalid": p.slug !== void 0,
                onChange: (N) => {
                  y.setData("slug", N.target.value), z("slug");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(Na, { note: Es(a?.hasPage ? a.slug : null, y.data.slug, !1), redirectsUrl: v }),
            /* @__PURE__ */ e.jsx(O, { message: p.slug })
          ] }),
          s.hierarchical && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:sm:col-span-2", children: [
            /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "term-parent", children: t("Under") }),
            /* @__PURE__ */ e.jsxs(
              n.Select,
              {
                value: y.data.parent_id === null ? Ye : String(y.data.parent_id),
                onValueChange: (N) => {
                  y.setData("parent_id", N === Ye ? null : Number(N)), z("parent_id");
                },
                children: [
                  /* @__PURE__ */ e.jsx(n.SelectTrigger, { id: "term-parent", className: "cms:sm:w-1/2", "aria-invalid": p.parent_id !== void 0, children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
                  /* @__PURE__ */ e.jsxs(n.SelectContent, { children: [
                    /* @__PURE__ */ e.jsx(n.SelectItem, { value: Ye, children: t("Top level") }),
                    c.map((N) => /* @__PURE__ */ e.jsxs(n.SelectItem, { value: String(N.id), children: [
                      "— ".repeat(N.depth),
                      N.title
                    ] }, N.id))
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ e.jsx(O, { message: p.parent_id })
          ] })
        ] }),
        /* @__PURE__ */ e.jsx(n.KeptEditsNotice, { kept: L.kept, disabled: !S, onLoad: (N) => {
          P(N);
        }, onDiscard: (N) => {
          L.discardKept(N);
        } }),
        /* @__PURE__ */ e.jsx(ms, { message: p.version, processing: y.processing, onSaveMine: F }),
        /* @__PURE__ */ e.jsx(
          is,
          {
            disabled: !S,
            fields: r,
            values: y.data.data,
            errors: p,
            storageKey: `cms:term:${s.handle}`,
            shared: m,
            sharedValues: o,
            sharedNote: t("Shared by all languages: the greyed-out fields are edited in :language.", { language: V(u[0] ?? "en") }),
            onChange: (N, D) => {
              y.setData("data", { ...y.data.data, [N]: D }), z(`data.${N}`);
            }
          }
        ),
        /* @__PURE__ */ e.jsx(n.CollapsibleCard, { title: t("SEO"), description: t("How this term's page appears in search results and shared links."), titleClassName: "cms:text-base", storageKey: "cms:term:seo", hasErrors: Ce(p, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !S, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(ue, { bare: !0, id: "seo", fields: os(), value: y.data.seo, errors: Y(p, "seo"), onChange: (N) => {
          y.setData("seo", N), z("seo");
        } }) }) })
      ] }),
      /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(
          n.CollapsibleCard,
          {
            title: t("Page settings"),
            titleClassName: "cms:text-base",
            storageKey: "cms:term:page-settings",
            hasErrors: p.template !== void 0,
            contentClassName: "cms:flex cms:flex-col cms:gap-2",
            children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: !S, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: [
              /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "template", children: t("Template") }),
              /* @__PURE__ */ e.jsx(
                n.Input,
                {
                  id: "template",
                  className: "cms:font-mono",
                  placeholder: `cms.${s.handle}-special`,
                  value: y.data.template,
                  onChange: (N) => y.setData("template", N.target.value),
                  "aria-invalid": p.template !== void 0
                }
              ),
              /* @__PURE__ */ e.jsx(va, { example: `cms.${s.handle}-special`, empty: t("Leave empty to use the taxonomy's template."), value: y.data.template, lookup: f }),
              /* @__PURE__ */ e.jsx(O, { message: p.template })
            ] })
          }
        ),
        a && /* @__PURE__ */ e.jsxs(n.CollapsibleCard, { title: t("Used by"), titleClassName: "cms:text-base", storageKey: "cms:term:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          b.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("No content links here through its fields.") }),
          b.map((N) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:gap-2", children: [
            N.url ? /* @__PURE__ */ e.jsx("a", { href: N.url, className: "cms:truncate cms:underline-offset-4 cms:hover:underline", children: N.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:truncate", children: N.label }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", title: N.field, children: N.fieldLabel ?? N.field })
          ] }, `${N.label}:${N.field}`))
        ] })
      ] })
    ] })
  ] });
}
function Ms(s = []) {
  if (s.length === 0) return "";
  const a = s.slice(0, 5).join("; ");
  return ` ${s.length > 5 ? t("It's used by :list and :count more.", { list: a, count: s.length - 5 }) : t("It's used by :list.", { list: a })}`;
}
function sc({ taxonomy: s, taxonomies: a, terms: l, locales: c, locale: i, trashed: r = !1, trashedCount: d = 0 }) {
  n.useBreadcrumbs([{ label: s ? s.title : t("Terms") }]);
  const [u, m] = re(), [o, g] = M.useState(""), [x, h] = M.useState(l);
  if (M.useEffect(() => h(l), [l]), !s)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(C.Head, { title: t("Terms") }),
      /* @__PURE__ */ e.jsx(n.PageHeader, { title: t("Terms"), description: t("There are no taxonomies yet. Create one under Structure → Taxonomies (categories, tags…), then add its terms here.") })
    ] });
  const b = I(`cms/taxonomies/${s.handle}/terms`), v = (k) => I(`cms/taxonomies/${s.handle}/terms/${k.id}/edit`) + `?locale=${encodeURIComponent(i)}`, f = (k, F) => {
    const L = F.map((S) => x[S].id);
    h(ds(x, k, F)), C.router.post(
      I("cms/terms/reorder"),
      { taxonomy: s.handle, ids: L, parent_id: k < 0 ? null : x[k].id },
      { preserveScroll: !0, preserveState: !0, onError: () => h(l) }
    );
  }, j = (k) => u(
    t('Move ":title" to the trash, with the terms under it? It comes off the site; you can restore it.', { title: k.fallback }) + Ms(k.usedBy),
    () => C.router.delete(I(`cms/terms/${k.id}`), { preserveScroll: !0 }),
    t("Move to trash")
  ), _ = o.trim().toLowerCase(), T = _ === "" ? null : x.filter((k) => `${k.title ?? k.fallback} ${k.slug ?? ""}`.toLowerCase().includes(_)), y = s.collections ?? [], p = (k, F, L) => /* @__PURE__ */ e.jsxs("div", { className: `${Bs} cms:border-t cms:border-border/60 cms:px-3 cms:py-2`, children: [
    /* @__PURE__ */ e.jsx("span", { className: "cms:flex cms:justify-center", children: F && !r && /* @__PURE__ */ e.jsx(n.SortableHandle, { ...F, label: t("Move :title", { title: k.fallback }) }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-2", style: { paddingLeft: L * 20 }, children: [
      L > 0 && /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", "aria-hidden": !0, children: "└" }),
      r ? /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: k.title ?? k.fallback }) : (
        // The term's editor, in the language shown (untranslated: give it a title there to add it).
        /* @__PURE__ */ e.jsx(C.Link, { href: v(k), className: "cms:truncate cms:text-left cms:font-medium cms:underline-offset-4 cms:hover:underline", children: k.title ?? /* @__PURE__ */ e.jsx("span", { className: "cms:font-normal cms:text-muted-foreground cms:italic", children: t(":title · not translated", { title: k.fallback }) }) })
      ),
      k.url && /* @__PURE__ */ e.jsx("a", { href: k.url, target: "_blank", rel: "noopener noreferrer", className: "cms:text-muted-foreground cms:hover:text-foreground", "aria-label": t("View page"), title: t("View page"), children: /* @__PURE__ */ e.jsx(ge, { className: "cms:size-3.5" }) })
    ] }),
    /* @__PURE__ */ e.jsx("code", { className: "cms:hidden cms:truncate cms:text-xs cms:text-muted-foreground cms:md:block", children: k.slug ?? "—" }),
    /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:text-sm cms:text-muted-foreground cms:tabular-nums cms:md:block", children: k.entries ?? 0 }),
    /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:text-sm cms:text-muted-foreground cms:md:block", children: tc(k.createdAt) }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:justify-end", children: r ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-1", children: [
      /* @__PURE__ */ e.jsxs(n.Button, { variant: "outline", size: "sm", onClick: () => C.router.post(I(`cms/terms/${k.id}/restore`), {}, { preserveScroll: !0 }), children: [
        /* @__PURE__ */ e.jsx(ve, {}),
        " ",
        t("Restore")
      ] }),
      /* @__PURE__ */ e.jsxs(
        n.Button,
        {
          variant: "ghost",
          size: "sm",
          className: "cms:text-destructive",
          onClick: () => u(
            t('Permanently delete ":title" in every language? Entries lose it.', { title: k.fallback }) + Ms(k.usedBy),
            () => C.router.delete(I(`cms/terms/${k.id}/force`), { preserveScroll: !0, data: (k.usedBy ?? []).length > 0 ? { force: 1 } : {} })
          ),
          children: [
            /* @__PURE__ */ e.jsx(K, {}),
            " ",
            t("Permanently delete")
          ]
        }
      )
    ] }) : /* @__PURE__ */ e.jsxs(n.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(n.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(n.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": t("Actions for :title", { title: k.fallback }), children: /* @__PURE__ */ e.jsx(rt, {}) }) }),
      /* @__PURE__ */ e.jsxs(n.DropdownMenuContent, { align: "end", children: [
        /* @__PURE__ */ e.jsx(n.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(C.Link, { href: v(k), children: [
          /* @__PURE__ */ e.jsx(Mt, {}),
          " ",
          t("Edit")
        ] }) }),
        s.hierarchical && k.title !== null && /* @__PURE__ */ e.jsx(n.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(C.Link, { href: `${b}/create?locale=${encodeURIComponent(i)}&parent=${k.id}`, children: [
          /* @__PURE__ */ e.jsx(J, {}),
          " ",
          t("Add a term under it")
        ] }) }),
        /* @__PURE__ */ e.jsx(n.DropdownMenuSeparator, {}),
        /* @__PURE__ */ e.jsxs(n.DropdownMenuItem, { className: "cms:text-destructive", onSelect: () => j(k), children: [
          /* @__PURE__ */ e.jsx(K, {}),
          " ",
          t("Move to trash")
        ] })
      ] })
    ] }) })
  ] }), z = (k) => /* @__PURE__ */ e.jsx(n.SortableList, { items: le(x, k), getId: (F) => x[F].id, getLabel: (F) => x[F].title ?? x[F].fallback, disabled: r, onReorder: (F) => f(k, F), className: "cms:gap-0", children: (F, { handle: L, isOverlay: S }) => /* @__PURE__ */ e.jsxs("div", { className: S ? "cms:rounded-md cms:bg-card cms:shadow-md" : "", children: [
    p(x[F], L, x[F].depth),
    !S && !r && le(x, F).length > 0 && z(F)
  ] }) });
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: s.title }),
    m,
    /* @__PURE__ */ e.jsx(
      n.PageHeader,
      {
        title: r ? /* @__PURE__ */ e.jsx(n.TrashTitle, { children: s.title }) : s.title,
        primary: !r && /* @__PURE__ */ e.jsx(n.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(C.Link, { href: `${b}/create?locale=${encodeURIComponent(i)}`, children: [
          /* @__PURE__ */ e.jsx(J, {}),
          " ",
          t("New term")
        ] }) }),
        menu: [
          ...y.map((k) => ({ label: k.title, href: k.url, group: t("Used by collections") })),
          ...(s.indexPages ?? []).map((k) => ({ label: k.collection === null ? t("Index page") : t("Index page: :collection", { collection: k.title }), href: k.url, icon: /* @__PURE__ */ e.jsx(on, {}), group: t("Pages") })),
          ...s.settings ? [{ label: t("Taxonomy settings"), href: s.settings, icon: /* @__PURE__ */ e.jsx(Ie, {}), group: t("Structure") }] : [],
          ...s.blueprint ? [{ label: t("Edit blueprint"), href: s.blueprint, icon: /* @__PURE__ */ e.jsx(ft, {}), group: t("Structure") }] : []
        ],
        children: a.length > 1 && /* @__PURE__ */ e.jsxs(n.Select, { value: s.handle, onValueChange: (k) => C.router.get(I(`cms/taxonomies/${k}/terms`)), children: [
          /* @__PURE__ */ e.jsx(n.SelectTrigger, { className: "cms:w-48", "aria-label": t("Taxonomy"), children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(n.SelectContent, { children: a.map((k) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: k.handle, children: k.title }, k.handle)) })
        ] })
      }
    ),
    r && /* @__PURE__ */ e.jsx(n.TrashBanner, { items: t("terms"), onBack: () => C.router.get(b, { locale: i }), backLabel: t("Back to terms") }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-xs", children: [
        /* @__PURE__ */ e.jsx(ke, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          n.Input,
          {
            className: "cms:pl-9",
            placeholder: t("Search terms…"),
            "aria-label": t("Search terms"),
            value: o,
            onChange: (k) => g(k.target.value)
          }
        )
      ] }),
      c.length > 1 && /* @__PURE__ */ e.jsxs(n.Select, { value: i, onValueChange: (k) => C.router.get(b, { locale: k, ...r ? { status: "trashed" } : {} }), children: [
        /* @__PURE__ */ e.jsx(n.SelectTrigger, { className: "cms:w-40", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(n.SelectContent, { children: c.map((k) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: k, children: V(k) }, k)) })
      ] }),
      !r && /* @__PURE__ */ e.jsxs(n.Button, { variant: "ghost", className: "cms:ml-auto cms:order-last", onClick: () => C.router.get(b, { locale: i, status: "trashed" }), children: [
        /* @__PURE__ */ e.jsx(K, {}),
        " ",
        t("Trash")
      ] }),
      !r && x.length > 1 && !T && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s.hierarchical ? t("Drag terms to set their order; a term's parent is set in its editor (Under).") : t("Drag terms to set their order.") })
    ] }),
    /* @__PURE__ */ e.jsxs(n.Card, { className: "cms:gap-0 cms:overflow-hidden cms:py-0", children: [
      /* @__PURE__ */ e.jsxs("div", { className: `${Bs} cms:bg-muted/60 cms:px-3 cms:py-2.5 cms:text-sm cms:font-medium cms:text-muted-foreground`, children: [
        /* @__PURE__ */ e.jsx("span", {}),
        /* @__PURE__ */ e.jsx("span", { children: t("Title") }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:md:block", children: t("Slug") }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:md:block", children: t("Entries") }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:md:block", children: t("Created") }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: t("Actions") })
      ] }),
      x.length === 0 ? /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:border-t cms:border-border/60 cms:p-10 cms:text-center cms:text-muted-foreground", children: r ? t("The trash is empty.") : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        t("No terms yet."),
        /* @__PURE__ */ e.jsx(n.Button, { size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs(C.Link, { href: `${b}/create?locale=${encodeURIComponent(i)}`, children: [
          /* @__PURE__ */ e.jsx(J, {}),
          " ",
          t("New term")
        ] }) }),
        /* @__PURE__ */ e.jsx(n.TrashHint, { count: d, onShow: () => C.router.get(b, { locale: i, status: "trashed" }) })
      ] }) }) : T ? T.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:border-t cms:border-border/60 cms:p-8 cms:text-center cms:text-muted-foreground", children: t("No terms match “:search”.", { search: o }) }) : T.map((k) => /* @__PURE__ */ e.jsx(M.Fragment, { children: p(k, null, 0) }, k.id)) : r ? x.map((k) => /* @__PURE__ */ e.jsx(M.Fragment, { children: p(k, null, 0) }, k.id)) : z(-1)
    ] })
  ] });
}
const Bs = "cms:grid cms:items-center cms:gap-3 cms:grid-cols-[1.5rem_1fr_2.5rem] cms:md:grid-cols-[1.5rem_minmax(0,2fr)_minmax(0,1.2fr)_5rem_7rem_2.5rem]";
function tc(s) {
  if (!s) return "—";
  const a = new Date(s);
  return Number.isNaN(a.getTime()) ? "—" : a.toLocaleDateString(document.documentElement.lang || void 0, { day: "numeric", month: "short", year: "numeric" });
}
const Te = "__shared";
function ac({ taxonomy: s, collection: a, url: l, pages: c, settings: i, ...r }) {
  const d = I(`cms/taxonomies/${s.handle}/terms`), u = I(`cms/taxonomies/${s.handle}/index-page/edit`), m = a ? t("Index page: :collection", { collection: a.title }) : t("Index page");
  return /* @__PURE__ */ e.jsx(
    Sa,
    {
      ...r,
      title: `${s.title}: ${m}`,
      breadcrumbs: [{ label: s.title, href: d }, { label: m }],
      back: { href: d, label: t("Back to :title", { title: s.title }) },
      saveUrl: I(`cms/taxonomies/${s.handle}/index-page`),
      editUrl: u,
      params: a ? { collection: a.handle } : {},
      viewUrl: l,
      empty: t("The index page has no fields of its own: choose its fields (Index page fields) in the taxonomy's settings under Structure → Taxonomies."),
      seoDescription: t("How the index page appears in search results and shared links."),
      storageKey: "cms:taxonomy-index:seo",
      menu: i ? [{ label: t("Taxonomy settings"), href: i, icon: /* @__PURE__ */ e.jsx(Ie, {}) }] : [],
      children: c.length > 1 && /* @__PURE__ */ e.jsxs(n.Select, { value: a?.handle ?? Te, onValueChange: (o) => C.router.get(u, { ...o === Te ? {} : { collection: o }, locale: r.locale }), children: [
        /* @__PURE__ */ e.jsx(n.SelectTrigger, { className: "cms:w-64", "aria-label": t("Page"), children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(n.SelectContent, { children: c.map((o) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: o.collection ?? Te, children: o.collection === null ? t("Shared index (all collections)") : t(":collection only", { collection: o.title }) }, o.collection ?? Te)) })
      ] })
    }
  );
}
function nc(s) {
  return { done: s.filter((a) => a.trim() !== "").length, total: s.length };
}
function lc({ locale: s, main: a, locales: l, sections: c }) {
  const i = I("cms/translations");
  n.useBreadcrumbs([{ label: t("Translations") }]);
  const r = l.find((v) => v.code === s)?.name ?? V(s), d = C.useForm({
    locale: s,
    texts: Object.fromEntries(c.flatMap((v) => v.texts.map((f) => [f.key, f.value])))
  }), [u, m] = M.useState(!1), o = d.errors, g = () => d.put(i, { preserveScroll: !0, onSuccess: () => d.setDefaults() });
  n.useUnsavedChanges(d.isDirty, g);
  const x = (v, f) => d.setData("texts", { ...d.data.texts, [v]: f }), h = nc(c.flatMap((v) => v.texts.map((f) => d.data.texts[f.key] ?? ""))), b = c.map((v) => ({ ...v, texts: u ? v.texts.filter((f) => f.value.trim() === "") : v.texts })).filter((v) => v.texts.length > 0);
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (v) => {
    v.preventDefault(), g();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(C.Head, { title: t("Translations") }),
    /* @__PURE__ */ e.jsx(
      n.PageHeader,
      {
        title: t("Translations"),
        description: t("Translate the site's own texts that aren't entries: they show on listing pages, forms and menus. Left empty, the :main text shows.", { main: V(a) })
      }
    ),
    /* @__PURE__ */ e.jsx(n.Card, { className: "cms:sticky cms:top-16 cms:z-10 cms:py-3 cms:shadow-sm", children: /* @__PURE__ */ e.jsxs(n.CardContent, { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-x-4 cms:gap-y-2", children: [
      l.length > 1 ? /* @__PURE__ */ e.jsxs(n.Select, { value: s, onValueChange: (v) => C.router.get(i, { locale: v }), children: [
        /* @__PURE__ */ e.jsx(n.SelectTrigger, { "aria-label": t("Language"), className: "cms:w-48", children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(n.SelectContent, { children: l.map((v) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: v.code, children: v.name }, v.code)) })
      ] }) : /* @__PURE__ */ e.jsx("span", { className: "cms:font-medium", children: r }),
      /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", "aria-live": "polite", children: t(":done of :total translated into :language", { done: h.done, total: h.total, language: r }) }),
      /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:items-center cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Switch, { id: "untranslated-only", checked: u, onCheckedChange: (v) => m(v) }),
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "untranslated-only", className: "cms:font-normal", children: t("Only untranslated") })
      ] }),
      /* @__PURE__ */ e.jsxs("span", { className: "cms:ml-auto cms:flex cms:items-center cms:gap-3", children: [
        d.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") }),
        /* @__PURE__ */ e.jsxs(n.Button, { type: "submit", disabled: d.processing, children: [
          d.processing && /* @__PURE__ */ e.jsx(ce, { className: "cms:animate-spin" }),
          " ",
          t("Save")
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ e.jsx(O, { message: o.locale }),
    b.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:py-8 cms:text-center cms:text-sm cms:text-muted-foreground", children: u ? t("Everything is translated into :language.", { language: r }) : t("Nothing to translate yet.") }),
    b.map((v) => /* @__PURE__ */ e.jsx(
      n.CollapsibleCard,
      {
        title: v.hint ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          v.title,
          " ",
          /* @__PURE__ */ e.jsxs("span", { className: "cms:font-normal cms:text-muted-foreground", children: [
            "· ",
            v.hint
          ] })
        ] }) : v.title,
        titleClassName: "cms:text-base",
        storageKey: `cms:translations:${v.key}`,
        contentClassName: "cms:flex cms:flex-col cms:divide-y cms:divide-border/60",
        children: v.texts.map((f) => {
          const j = `text-${f.key.replace(/[^A-Za-z0-9_-]/g, "-")}`, _ = o[`texts.${f.key}`], T = d.data.texts[f.key] ?? "";
          return /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-2 cms:py-3 cms:first:pt-0 cms:last:pb-0 cms:md:grid-cols-2 cms:md:gap-4", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-0.5", children: [
              /* @__PURE__ */ e.jsx(n.Label, { htmlFor: j, lang: a, className: "cms:break-words cms:whitespace-pre-line", children: f.source }),
              (f.label || f.url) && /* @__PURE__ */ e.jsxs("p", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-x-2 cms:text-xs cms:text-muted-foreground", children: [
                f.label && /* @__PURE__ */ e.jsx("span", { children: f.label }),
                f.url && /* @__PURE__ */ e.jsxs("a", { href: f.url, target: "_blank", rel: "noopener noreferrer", className: "cms:inline-flex cms:items-center cms:gap-1 cms:underline-offset-4 cms:hover:text-foreground cms:hover:underline", children: [
                  t("View"),
                  /* @__PURE__ */ e.jsx(ge, { className: "cms:size-3", "aria-hidden": !0 })
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
                  value: T,
                  "aria-invalid": _ !== void 0,
                  "aria-description": t("In :language", { language: r }),
                  onChange: (y) => x(f.key, y.target.value)
                }
              ) : /* @__PURE__ */ e.jsx(
                n.Input,
                {
                  id: j,
                  lang: s,
                  value: T,
                  "aria-invalid": _ !== void 0,
                  "aria-description": t("In :language", { language: r }),
                  onChange: (y) => x(f.key, y.target.value)
                }
              ),
              /* @__PURE__ */ e.jsx(O, { message: _ })
            ] })
          ] }, f.key);
        })
      },
      v.key
    ))
  ] });
}
function cc(s) {
  return function(l) {
    const c = C.usePage().props.cms;
    return Ea(c?.locales), /* @__PURE__ */ e.jsx(s, { ...l });
  };
}
const rc = {
  "Cms/Blueprints/Index": cl,
  "Cms/Blueprints/Edit": $s,
  "Cms/Fieldsets/Index": Ml,
  // A fieldset is edited like a blueprint.
  "Cms/Fieldsets/Edit": $s,
  "Cms/Entries/Index": wl,
  "Cms/Entries/Edit": ol,
  "Cms/Listing/Edit": zl,
  "Cms/Terms/Index": sc,
  "Cms/TaxonomyIndex/Edit": ac,
  "Cms/Translations/Edit": lc,
  "Cms/Terms/Edit": Xl,
  "Cms/Globals/Edit": Bl,
  "Cms/Menus/Edit": Hl,
  "Cms/Comments/Index": Wl,
  "Cms/Seo/Edit": Yl,
  "Cms/Submissions/Index": Zl
};
La({
  pages: Object.fromEntries(Object.entries(rc).map(([s, a]) => [s, cc(a)]))
});
