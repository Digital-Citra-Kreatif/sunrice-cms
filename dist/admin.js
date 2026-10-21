const Ss = globalThis.Sunrice;
if (!Ss) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const e = Ss.modules["react/jsx-runtime"], Cs = globalThis.Sunrice;
if (!Cs) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const v = Cs.modules["@inertiajs/react"], is = 3;
function Qe() {
  const s = globalThis.Sunrice;
  if (!s)
    throw new Error("[sunrice] This script runs outside the Sunrice admin panel (window.Sunrice is missing).");
  return s;
}
function va(s) {
  const l = Qe();
  if (l.version !== is)
    throw new Error(`[sunrice] This plugin was built for admin runtime ${is}, but the panel runs ${l.version}. Rebuild it with a matching @sunrice/admin-sdk.`);
  for (const [n, r] of Object.entries(s.pages ?? {}))
    l.registerPage(n, r);
}
function t(s, l = {}) {
  return Qe().t(s, l);
}
function B(s = "") {
  return Qe().adminUrl(s);
}
function te(s) {
  return { draft: t("Draft"), scheduled: t("Scheduled"), published: t("Published") }[s];
}
function K(s, l) {
  if (!s) return "—";
  const n = new Date(s);
  return Number.isNaN(n.getTime()) ? "—" : n.toLocaleString(document.documentElement.lang || void 0, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
}
function ya(s, l = /* @__PURE__ */ new Date()) {
  const n = s ? new Date(s) : null;
  if (n && !Number.isNaN(n.getTime()) && n > l) return n;
  const r = new Date(l);
  return r.setDate(r.getDate() + 1), r.setMinutes(0, 0, 0), r;
}
function $s(s) {
  const l = (n) => String(n).padStart(2, "0");
  return `${s.getFullYear()}-${l(s.getMonth() + 1)}-${l(s.getDate())}T${l(s.getHours())}:${l(s.getMinutes())}`;
}
let Ke = {};
function Na(s) {
  Ke = s ?? {};
}
function P(s, l) {
  if (Ke[s]) return Ke[s];
  try {
    return new Intl.DisplayNames(l ? [l] : void 0, { type: "language" }).of(s.replace("_", "-")) ?? s;
  } catch {
    return s;
  }
}
function os(s) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function ka(s, l, n, r) {
  return r && s !== "" && s === os(l) ? os(n) : s;
}
function Ds(s, l, n) {
  return !s || l.trim() === "" || l.trim() === s ? null : n ? "redirects" : "breaks";
}
const _s = globalThis.Sunrice;
if (!_s) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const z = _s.modules.react;
const wa = (s) => s?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
function Sa(s, l, n = []) {
  if (l == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: wa(s),
    size: 24,
    node: l,
    ...n.length > 0 ? { aliases: n } : {}
  };
}
const Ca = (s) => {
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
const $a = (s) => {
  const l = Ca(s);
  return l.charAt(0).toUpperCase() + l.slice(1);
};
const We = (...s) => s.filter((l, n, r) => !!l && l.trim() !== "" && r.indexOf(l) === n).join(" ").trim();
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
function Me(s) {
  return s != null;
}
function Da(s, l = {}) {
  const n = l.attributeNames ?? {}, r = (h) => n[h] ?? h, i = s.size ?? s.width ?? me.width, c = s.size ?? s.height ?? me.height, d = s.aliases?.filter((h) => typeof h == "string" && h.trim() !== "").map((h) => `lucide-${h}`) ?? [], x = [...s.name ? [`lucide-${s.name}`] : [], ...d], m = l.className?.split(" ").filter(Boolean) ?? [], o = l.includeDefaultClasses === !1 ? We(...m) : We("lucide", ...x, ...m), p = l.absoluteStrokeWidth ? Number(l.strokeWidth ?? me["stroke-width"]) * Number(s.size ?? s.width ?? me.width) / Number(l.size ?? l.width ?? me.width) : l.strokeWidth ?? me["stroke-width"];
  return [
    "svg",
    {
      ...Object.entries(me).reduce((h, [b, y]) => (h[r(b)] = y, h), {}),
      ..."color" in l && l.color && {
        [r("stroke")]: l.color
      },
      ..."size" in l && Me(l.size) && {
        [r("width")]: l.size,
        [r("height")]: l.size
      },
      ..."width" in l && Me(l.width) && {
        [r("width")]: l.width
      },
      ..."height" in l && Me(l.height) && {
        [r("height")]: l.height
      },
      [r("stroke-width")]: p,
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
      const [b, y, _] = h, g = l.nonScalingStroke ? { [r("vector-effect")]: "non-scaling-stroke", ...y } : y;
      return _ ? [b, g, _] : [b, g];
    })
  ];
}
function _a(s, l = {}) {
  return Da(s, {
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
const Ta = (s) => {
  for (const l in s)
    if (l.startsWith("aria-") || l === "role" || l === "title")
      return !0;
  return !1;
}, za = z.createContext({}), Ma = () => z.useContext(za), Ba = z.forwardRef(
  ({
    color: s,
    size: l,
    width: n,
    height: r,
    strokeWidth: i,
    absoluteStrokeWidth: c,
    nonScalingStroke: d,
    className: x = "",
    children: m,
    iconNode: o = [],
    icon: p = {
      node: o,
      aliases: [],
      size: 24
    },
    ...u
  }, h) => {
    const {
      size: b = 24,
      strokeWidth: y = 2,
      absoluteStrokeWidth: _ = !1,
      nonScalingStroke: g = !1,
      color: C = "currentColor",
      className: D = ""
    } = Ma() ?? {}, N = !!m || Ta(u), [f, T, A = []] = _a(p, {
      color: s ?? C,
      width: n ?? l ?? b,
      height: r ?? l ?? b,
      strokeWidth: i ?? y,
      absoluteStrokeWidth: c ?? _,
      nonScalingStroke: d ?? g,
      className: We(D, x),
      hasA11yProp: N,
      attributes: u
    });
    return z.createElement(
      f,
      {
        ref: h,
        ...T
      },
      [
        ...A.map(([k, w]) => z.createElement(k, w)),
        ...Array.isArray(m) ? m : [m]
      ]
    );
  }
);
function L(s, l = [], n = []) {
  const r = typeof s == "string" ? Sa(s, l, n) : s, i = z.forwardRef(
    ({ className: c, ...d }, x) => z.createElement(Ba, {
      ref: x,
      icon: r,
      className: c,
      ...d
    })
  );
  return r.name && (i.displayName = $a(r.name)), i;
}
const Ts = {
  name: "arrow-down",
  size: 24,
  node: [
    ["path", { d: "M12 5v14", key: "s699le" }],
    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
  ]
};
Ts.node;
const zs = L(Ts);
const Ms = {
  name: "arrow-up-down",
  size: 24,
  node: [
    ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
    ["path", { d: "M17 20V4", key: "1ejh1v" }],
    ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
    ["path", { d: "M7 4v16", key: "1glfcx" }]
  ]
};
Ms.node;
const Bs = L(Ms);
const Ls = {
  name: "arrow-up",
  size: 24,
  node: [
    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
    ["path", { d: "M12 19V5", key: "x0mq9r" }]
  ]
};
Ls.node;
const Is = L(Ls);
const Fs = {
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
Fs.node;
const La = L(Fs);
const As = {
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
As.node;
const Ge = L(As);
const Es = {
  name: "calendar",
  size: 24,
  node: [
    ["path", { d: "M8 2v3", key: "1ioesn" }],
    ["path", { d: "M16 2v3", key: "otl347" }],
    ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", key: "h1oib" }],
    ["path", { d: "M3 9h18", key: "1pudct" }]
  ]
};
Es.node;
const Ia = L(Es);
const Hs = {
  name: "check",
  size: 24,
  node: [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]
};
Hs.node;
const Se = L(Hs);
const Ps = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
Ps.node;
const Os = L(Ps);
const Vs = {
  name: "chevron-left",
  size: 24,
  node: [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]]
};
Vs.node;
const Ze = L(Vs);
const Rs = {
  name: "chevron-right",
  size: 24,
  node: [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]
};
Rs.node;
const ve = L(Rs);
const Us = {
  name: "chevrons-down-up",
  size: 24,
  node: [
    ["path", { d: "m7 20 5-5 5 5", key: "13a0gw" }],
    ["path", { d: "m7 4 5 5 5-5", key: "1kwcof" }]
  ]
};
Us.node;
const Fa = L(Us);
const qs = {
  name: "chevrons-up-down",
  size: 24,
  node: [
    ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
    ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
  ]
};
qs.node;
const Aa = L(qs);
const Ks = {
  name: "columns-3",
  size: 24,
  node: [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M9 3v18", key: "fh3hqa" }],
    ["path", { d: "M15 3v18", key: "14nvp0" }]
  ],
  aliases: ["panels-left-right"]
};
Ks.node;
const Ea = L(Ks);
const Ws = {
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
Ws.node;
const Ha = L(Ws);
const Gs = {
  name: "copy",
  size: 24,
  node: [
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
  ]
};
Gs.node;
const Ys = L(Gs);
const Js = {
  name: "download",
  size: 24,
  node: [
    ["path", { d: "M12 15V3", key: "m9g1x1" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
  ]
};
Js.node;
const Qs = L(Js);
const Zs = {
  name: "ellipsis-vertical",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
    ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
    ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }]
  ],
  aliases: ["more-vertical"]
};
Zs.node;
const Pa = L(Zs);
const Xs = {
  name: "ellipsis",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
    ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
    ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
  ],
  aliases: ["more-horizontal"]
};
Xs.node;
const et = L(Xs);
const st = {
  name: "external-link",
  size: 24,
  node: [
    ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
    ["path", { d: "M10 14 21 3", key: "gplh6r" }],
    ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
  ]
};
st.node;
const ge = L(st);
const tt = {
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
tt.node;
const Oa = L(tt);
const at = {
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
at.node;
const lt = L(at);
const nt = {
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
nt.node;
const Va = L(nt);
const ct = {
  name: "hash",
  size: 24,
  node: [
    ["line", { x1: "4", x2: "20", y1: "9", y2: "9", key: "4lhtct" }],
    ["line", { x1: "4", x2: "20", y1: "15", y2: "15", key: "vyu0kd" }],
    ["line", { x1: "10", x2: "8", y1: "3", y2: "21", key: "1ggp8o" }],
    ["line", { x1: "16", x2: "14", y1: "3", y2: "21", key: "weycgp" }]
  ]
};
ct.node;
const Ra = L(ct);
const rt = {
  name: "image",
  size: 24,
  node: [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
    ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
    ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
  ]
};
rt.node;
const Ua = L(rt);
const it = {
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
it.node;
const qa = L(it);
const ot = {
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
ot.node;
const ds = L(ot);
const dt = {
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
dt.node;
const Ka = L(dt);
const mt = {
  name: "link-2",
  size: 24,
  node: [
    ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
    ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
    ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
  ]
};
mt.node;
const ut = L(mt);
const ht = {
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
ht.node;
const Wa = L(ht);
const xt = {
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
xt.node;
const Ga = L(xt);
const pt = {
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
pt.node;
const gt = L(pt);
const ft = {
  name: "loader-circle",
  size: 24,
  node: [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  aliases: ["loader-2"]
};
ft.node;
const ae = L(ft);
const jt = {
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
jt.node;
const bt = L(jt);
const vt = {
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
vt.node;
const Ya = L(vt);
const yt = {
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
yt.node;
const Ja = L(yt);
const Nt = {
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
Nt.node;
const Qa = L(Nt);
const kt = {
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
kt.node;
const wt = L(kt);
const St = {
  name: "plus",
  size: 24,
  node: [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ]
};
St.node;
const Z = L(St);
const Ct = {
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
Ct.node;
const Za = L(Ct);
const $t = {
  name: "repeat",
  size: 24,
  node: [
    ["path", { d: "m17 2 4 4-4 4", key: "nntrym" }],
    ["path", { d: "M3 11v-1a4 4 0 0 1 4-4h14", key: "84bu3i" }],
    ["path", { d: "m7 22-4-4 4-4", key: "1wqhfi" }],
    ["path", { d: "M21 13v1a4 4 0 0 1-4 4H3", key: "1rx37r" }]
  ]
};
$t.node;
const Xa = L($t);
const Dt = {
  name: "rotate-ccw",
  size: 24,
  node: [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ]
};
Dt.node;
const je = L(Dt);
const _t = {
  name: "search",
  size: 24,
  node: [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ]
};
_t.node;
const ye = L(_t);
const Tt = {
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
Tt.node;
const el = L(Tt);
const zt = {
  name: "settings-2",
  size: 24,
  node: [
    ["path", { d: "M14 17H5", key: "gfn3mx" }],
    ["path", { d: "M19 7h-9", key: "6i9tg" }],
    ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
    ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
  ]
};
zt.node;
const Xe = L(zt);
const Mt = {
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
Mt.node;
const sl = L(Mt);
const Bt = {
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
Bt.node;
const Ye = L(Bt);
const Lt = {
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
Lt.node;
const tl = L(Lt);
const It = {
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
It.node;
const al = L(It);
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
const ll = L(Ft);
const At = {
  name: "toggle-left",
  size: 24,
  node: [
    ["circle", { cx: "9", cy: "12", r: "3", key: "u3jwor" }],
    ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "7", key: "g7kal2" }]
  ]
};
At.node;
const nl = L(At);
const Et = {
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
Et.node;
const W = L(Et);
const Ht = {
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
Ht.node;
const cl = L(Ht);
const Pt = {
  name: "type",
  size: 24,
  node: [
    ["path", { d: "M12 4v16", key: "1654pz" }],
    ["path", { d: "M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2", key: "e0r10z" }],
    ["path", { d: "M9 20h6", key: "s66wpe" }]
  ]
};
Pt.node;
const rl = L(Pt);
const Ot = {
  name: "undo-2",
  size: 24,
  node: [
    ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
    ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
  ]
};
Ot.node;
const Ce = L(Ot);
const Vt = {
  name: "x",
  size: 24,
  node: [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]
};
Vt.node;
const _e = L(Vt), Rt = globalThis.Sunrice;
if (!Rt) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const a = Rt.modules["@sunrice/admin-sdk/ui"];
function Ut({ id: s, children: l }) {
  return /* @__PURE__ */ e.jsxs("p", { id: s, className: "cms:flex cms:items-start cms:gap-2 cms:rounded-md cms:border cms:border-amber-500/40 cms:bg-amber-500/10 cms:px-3 cms:py-2 cms:text-sm cms:text-amber-900 cms:dark:text-amber-200", children: [
    /* @__PURE__ */ e.jsx(cl, { className: "cms:mt-0.5 cms:size-4 cms:shrink-0", "aria-hidden": !0 }),
    /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:[overflow-wrap:anywhere] cms:[&_code]:rounded cms:[&_code]:bg-amber-500/15 cms:[&_code]:px-1 cms:[&_code]:font-mono cms:[&_code]:text-[0.8125rem]", children: l })
  ] });
}
function re() {
  const [s, l] = z.useState(null), n = /* @__PURE__ */ e.jsx(a.Dialog, { open: s !== null, onOpenChange: (r) => !r && l(null), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
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
function ue(s) {
  return s && typeof s == "object" && !Array.isArray(s) ? s : {};
}
function il(s, l) {
  if (typeof s != "string" || s === "") return "";
  const n = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(s);
  return n ? l ? `${n[1]}T${n[2] ?? "00:00"}` : n[1] ?? "" : "";
}
function ms(s) {
  return s === "" ? null : s;
}
function ol(s) {
  const l = typeof s == "number" ? s : typeof s == "string" && s.trim() !== "" ? Number(s) : NaN;
  return !Number.isFinite(l) || Math.abs(l) < 1e4 ? null : new Intl.NumberFormat("en", { maximumFractionDigits: 20 }).format(l);
}
function dl(s, l, n, r) {
  return l || s.some((i) => ["none", ""].includes(i.label.trim().toLowerCase()) || i.value.trim().toLowerCase() === "none") ? !1 : !n || !r;
}
function $e(s) {
  return s.some((l) => l.shared === !0 || $e(l.fields ?? []) || (l.blocks ?? []).some((n) => $e(n.fields)));
}
function ml() {
  return { _hidden: !1 };
}
function es(s, l, n = 60) {
  for (const r of s) {
    const i = l[r.handle];
    let c = null;
    ["text", "textarea", "email", "url"].includes(r.type) && typeof i == "string" ? c = i : r.type === "rich_text" && typeof i == "string" ? c = i.replace(/<[^>]*>/g, " ") : r.type === "group" && Array.isArray(r.fields) && (c = es(r.fields, ue(i), n));
    const d = (c ?? "").replace(/\s+/g, " ").trim();
    if (d !== "") return d.length > n ? `${d.slice(0, n - 1).trimEnd()}…` : d;
  }
  return null;
}
function ul(s) {
  return { type: s, hidden: !1, values: {} };
}
function hl(s) {
  const l = s.replace(/[\u0000- \u007f]+/g, ""), n = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(l);
  return n ? ["http", "https", "mailto", "tel"].includes(n[1].toLowerCase()) : !l.includes("\\");
}
function qt({ ids: s, search: l, collections: n }) {
  const r = new URLSearchParams();
  for (const i of s ?? []) r.append("ids[]", String(i));
  l && r.set("search", l);
  for (const i of n) r.append("collections[]", i);
  return r.toString();
}
let xl = 0;
function pl(s, l) {
  return s.length === l ? s.slice() : s.length < l ? [...s, ...Array.from({ length: l - s.length }, () => `k${++xl}`)] : s.slice(0, l);
}
function gl({ taxonomy: s, q: l, ids: n }) {
  const r = new URLSearchParams({ taxonomy: s });
  l && r.set("q", l);
  for (const i of n ?? []) r.append("ids[]", String(i));
  return r.toString();
}
async function us(s) {
  const l = await fetch(`${B("cms/entries/picker")}?${qt(s)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!l.ok) throw new Error(String(l.status));
  const n = await l.json();
  return { items: n.items, unavailable: n.unavailable ?? [] };
}
function fl(s) {
  return s.length < 2 ? s[0] ?? "" : t(":items and :last", { items: s.slice(0, -1).join(", "), last: s[s.length - 1] });
}
function Te({ id: s, value: l, multiple: n, max: r, collections: i, invalid: c, onChange: d, emptyHint: x }) {
  const m = l === null ? [] : Array.isArray(l) ? l : [l], [o, p] = z.useState({}), [u, h] = z.useState(""), [b, y] = z.useState(!1), [_, g] = z.useState(null), [C, D] = z.useState([]), [N, f] = z.useState(!1), T = n && r !== null && m.length >= r, A = m.filter(($) => !o[$]).join(",");
  z.useEffect(() => {
    A !== "" && us({ ids: A.split(",").map(Number), collections: i }).then(({ items: $ }) => p((F) => ({ ...F, ...Object.fromEntries($.map((S) => [S.id, S])) }))).catch(() => f(!0));
  }, [A]), z.useEffect(() => {
    if (!b) {
      g(null);
      return;
    }
    const $ = window.setTimeout(() => {
      us({ search: u.trim(), collections: i }).then((F) => {
        g(F.items), D(F.unavailable), f(!1);
      }).catch(() => f(!0));
    }, u.trim() === "" ? 0 : 250);
    return () => window.clearTimeout($);
  }, [u, b]);
  const k = ($) => {
    p((F) => ({ ...F, [$.id]: $ })), d(n ? [...m, $.id] : $.id), h("");
  }, w = ($) => d(n ? $ : $[0] ?? null);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    m.length > 0 && /* @__PURE__ */ e.jsx(a.SortableList, { items: m, getId: ($) => $, getLabel: ($) => o[$]?.title ?? `Entry #${$}`, onReorder: ($) => w($), disabled: !n, className: "cms:gap-1", children: ($, { handle: F }) => {
      const S = o[$];
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-md cms:border cms:bg-card cms:px-2 cms:py-1 cms:text-sm", children: [
        n && /* @__PURE__ */ e.jsx(a.SortableHandle, { ...F, label: t("Move :title", { title: S?.title ?? $ }) }),
        /* @__PURE__ */ e.jsx("span", { className: `cms:min-w-0 cms:flex-1 cms:truncate ${n ? "" : "cms:pl-1"}`, children: S ? S.title : t("Entry #:id", { id: $ }) }),
        S && /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: S.collection }),
        S && /* @__PURE__ */ e.jsx(a.Badge, { variant: S.status === "published" ? "success" : "secondary", children: te(S.status) }),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            type: "button",
            variant: "ghost",
            size: "icon",
            className: "cms:size-7",
            "aria-label": t("Remove :title", { title: S?.title ?? $ }),
            onClick: () => w(m.filter((H) => H !== $)),
            children: /* @__PURE__ */ e.jsx(_e, {})
          }
        )
      ] });
    } }),
    !T && (n || m.length === 0) && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-md", children: [
      /* @__PURE__ */ e.jsx(ye, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: s,
          className: "cms:pl-9",
          placeholder: t("Search entries by title"),
          "aria-invalid": c,
          value: u,
          autoComplete: "off",
          "aria-expanded": _ !== null,
          onFocus: () => y(!0),
          onBlur: () => y(!1),
          onKeyDown: ($) => {
            $.key === "Escape" && b && ($.preventDefault(), y(!1));
          },
          onChange: ($) => {
            h($.target.value), y(!0);
          }
        }
      ),
      _ !== null && /* @__PURE__ */ e.jsxs("ul", { role: "listbox", "aria-label": t("Matching entries"), className: "cms:absolute cms:z-10 cms:mt-1 cms:max-h-64 cms:w-full cms:overflow-auto cms:rounded-md cms:border cms:bg-card cms:p-1 cms:shadow-md", children: [
        _.filter(($) => !m.includes($.id)).length === 0 && /* @__PURE__ */ e.jsxs("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: [
          u.trim() === "" ? t("No entries yet.") : t("No entries match."),
          x && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            " ",
            x
          ] })
        ] }),
        C.length > 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: t("Your role can't see entries of :collections: ask an editor to link them.", { collections: fl(C) }) }),
        _.filter(($) => !m.includes($.id)).map(($) => /* @__PURE__ */ e.jsx("li", { role: "option", "aria-selected": !1, children: /* @__PURE__ */ e.jsxs(
          "button",
          {
            type: "button",
            className: "cms:flex cms:w-full cms:items-center cms:gap-2 cms:rounded cms:px-2 cms:py-1.5 cms:text-left cms:text-sm cms:hover:bg-accent",
            onMouseDown: (F) => F.preventDefault(),
            onClick: () => k($),
            children: [
              /* @__PURE__ */ e.jsx("span", { className: "cms:flex-1 cms:truncate", children: $.title }),
              /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: $.collection })
            ]
          }
        ) }, $.id))
      ] })
    ] }),
    N && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t("Entries could not be loaded. Try again.") })
  ] });
}
const Kt = z.createContext({}), Be = "__none";
async function hs(s) {
  const l = await fetch(`${B("cms/terms/picker")}?${gl(s)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!l.ok) throw new Error(String(l.status));
  return await l.json();
}
function jl({ id: s, taxonomy: l, multiple: n, max: r, required: i, invalid: c, value: d, onChange: x }) {
  const m = z.useContext(Kt), o = d === null ? [] : Array.isArray(d) ? d : [d], [p, u] = z.useState(null), [h, b] = z.useState(!1), [y, _] = z.useState(""), [g, C] = z.useState({}), [D, N] = z.useState(!1);
  z.useEffect(() => {
    if (!l) return;
    const S = y.trim(), H = window.setTimeout(() => {
      hs({ taxonomy: l, q: S }).then((R) => {
        u(R.items), R.more && b(!0), N(!1);
      }).catch(() => N(!0));
    }, S === "" ? 0 : 250);
    return () => window.clearTimeout(H);
  }, [l, y]);
  const f = (S) => m[String(S)] ?? g[S] ?? p?.find((H) => H.id === S)?.label, T = p === null ? "" : o.filter((S) => f(S) === void 0).join(",");
  if (z.useEffect(() => {
    !l || T === "" || hs({ taxonomy: l, ids: T.split(",").map(Number) }).then((S) => C((H) => ({ ...H, ...Object.fromEntries(S.items.map((R) => [R.id, R.label])) }))).catch(() => N(!0));
  }, [l, T]), !l) return /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("Choose a taxonomy for this field in its blueprint.") });
  if (p === null) return D ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t("Terms could not be loaded. Try again.") }) : /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-9 cms:w-full cms:max-w-sm" });
  const A = (S) => `${"— ".repeat(S.depth)}${S.label}`, k = n && r !== null && o.length >= r, w = (S) => x(n ? S : S[0] ?? null), $ = h && o.length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-1.5", children: o.map((S) => /* @__PURE__ */ e.jsxs(a.Badge, { variant: "secondary", className: "cms:gap-1 cms:pr-1", children: [
    f(S) ?? t("Term #:id", { id: S }),
    !(i && !n) && /* @__PURE__ */ e.jsx(
      "button",
      {
        type: "button",
        className: "cms:rounded-sm cms:p-0.5 cms:hover:bg-muted",
        "aria-label": t("Remove :title", { title: f(S) ?? S }),
        onClick: () => w(o.filter((H) => H !== S)),
        children: /* @__PURE__ */ e.jsx(_e, { className: "cms:size-3" })
      }
    )
  ] }, S)) }), F = h && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-sm", children: [
    /* @__PURE__ */ e.jsx(ye, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
    /* @__PURE__ */ e.jsx(
      a.Input,
      {
        id: s,
        className: "cms:pl-9",
        placeholder: t("Search terms"),
        autoComplete: "off",
        "aria-invalid": c,
        value: y,
        onChange: (S) => _(S.target.value)
      }
    )
  ] });
  if (!n && !h) {
    const S = o[0], H = S === void 0 || p.some((R) => R.id === S);
    return /* @__PURE__ */ e.jsxs(a.Select, { value: S === void 0 ? Be : String(S), onValueChange: (R) => x(R === Be ? null : Number(R)), children: [
      /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: s, className: "cms:w-full cms:max-w-sm", "aria-invalid": c, children: /* @__PURE__ */ e.jsx(a.SelectValue, { children: S === void 0 ? t("None") : f(S) ?? t("Term #:id", { id: S }) }) }),
      /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
        !i && /* @__PURE__ */ e.jsx(a.SelectItem, { value: Be, children: t("None") }),
        !H && S !== void 0 && /* @__PURE__ */ e.jsx(a.SelectItem, { value: String(S), children: f(S) ?? t("Term #:id", { id: S }) }),
        p.map((R) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: String(R.id), children: A(R) }, R.id))
      ] })
    ] });
  }
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    $,
    F,
    p.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: y.trim() ? t("No terms match.") : t("Nothing to choose from yet.") }) : n ? /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:max-h-72 cms:flex-col cms:gap-2 cms:overflow-auto", children: p.map((S) => {
      const H = o.includes(S.id);
      return /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx(
          a.Checkbox,
          {
            checked: H,
            disabled: !H && k,
            onCheckedChange: (R) => w(R ? [...o, S.id] : o.filter((le) => le !== S.id))
          }
        ),
        A(S)
      ] }, S.id);
    }) }) : /* @__PURE__ */ e.jsx("div", { role: "listbox", "aria-label": t("Terms"), className: "cms:flex cms:max-h-72 cms:flex-col cms:overflow-auto", children: p.map((S) => /* @__PURE__ */ e.jsx(
      a.Button,
      {
        type: "button",
        variant: o[0] === S.id ? "secondary" : "ghost",
        size: "sm",
        className: "cms:justify-start",
        role: "option",
        "aria-selected": o[0] === S.id,
        onClick: () => x(S.id),
        children: A(S)
      },
      S.id
    )) })
  ] });
}
const Wt = (s, l = {}) => s.replace(/:([A-Za-z_]+)/g, (n, r) => l[r] ?? n), bl = 5;
let vl = 0;
const ss = () => `f${++vl}`;
function Gt(s) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function ts(s) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^[0-9_]+/, "").replace(/_{2,}/g, "_").slice(0, 64);
}
function Yt(s, l) {
  const n = new Set(l.map((c) => c.handle)), r = Gt(s) || "field";
  let i = r;
  for (let c = 2; n.has(i); c++)
    i = `${r}_${c}`;
  return i;
}
function Jt(s) {
  return (s ?? []).map(({ fields: l, ...n }) => ({
    ...n,
    key: ss(),
    fields: Jt(l),
    handleTouched: !0,
    savedHandle: n.handle
  }));
}
function Qt(s, l) {
  return s.map(({ key: n, handleTouched: r, savedHandle: i, fields: c, ...d }) => ({
    ...d,
    validation: (d.validation ?? []).map((x) => x.trim()).filter((x) => x !== ""),
    ...l(d.type) ? { fields: Qt(c, l) } : {}
  }));
}
function yl(s, l, n) {
  return { key: ss(), type: s, label: l, handle: Yt(l, n), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function Le(s) {
  return s.type !== "fieldset" && s.savedHandle !== void 0 && s.savedHandle !== "" && s.handle !== s.savedHandle ? s.savedHandle : null;
}
function Zt(s) {
  return s.map((l) => ({ ...l, savedHandle: l.handle, fields: Zt(l.fields) }));
}
function xs(s, l, n) {
  if (s.handleTouched) return { ...s, label: l };
  const r = n.filter((i) => i.key !== s.key);
  return { ...s, label: l, handle: Yt(l || s.type, r) };
}
function pe(s, l) {
  const n = `${l}.`, r = {};
  for (const [i, c] of Object.entries(s))
    i.startsWith(n) && (r[i.slice(n.length)] = c);
  return r;
}
function X(s, l) {
  const n = s[l];
  return { ...pe(s, l), ...n !== void 0 ? { "": n } : {} };
}
function ze(s, l) {
  return Object.keys(s).filter((n) => n === l || n.startsWith(`${l}.`));
}
function Ne(s, l) {
  return Object.keys(s).some((n) => n === l || n.startsWith(`${l}.`));
}
function Nl(s, l) {
  return l.filter((n) => n.key !== s.key && n.handle !== "" && n.type !== "fieldset");
}
function Xt(s, l, n, r = Wt) {
  return s.type === "fieldset" ? null : n?.includes(s.handle) ? r('":handle" is used by the content itself; choose another handle.', { handle: s.handle }) : s.handle !== "" && l.some((i) => i.key !== s.key && i.type !== "fieldset" && i.handle === s.handle) ? r('There is already a field ":handle" here.', { handle: s.handle }) : null;
}
function ea(s, l) {
  return typeof s.translatable == "boolean" ? s.translatable : l;
}
function kl(s, l, n) {
  return { ...s, translatable: l === n ? null : l };
}
function wl(s, l, n = []) {
  const r = /* @__PURE__ */ new Set([...l.map((d) => d.handle), ...n]), i = `${(ts(s) || "field").slice(0, 56)}_copy`;
  let c = i;
  for (let d = 2; r.has(c); d++)
    c = `${i}_${d}`;
  return c;
}
function sa(s) {
  const { key: l, savedHandle: n, fields: r, ...i } = s;
  return { ...structuredClone(i), key: ss(), fields: r.map(sa) };
}
function Sl(s, l, n = [], r = Wt) {
  const i = s[l];
  if (i === void 0) return null;
  const c = i.label || i.handle, d = {
    ...sa(i),
    label: r(":label (copy)", { label: c }),
    handle: i.type === "fieldset" ? i.handle : wl(i.handle, s, n),
    handleTouched: !0
  };
  return { fields: [...s.slice(0, l + 1), d, ...s.slice(l + 1)], copy: d };
}
const Ie = [
  { value: "equals", label: "is", needsValue: !0 },
  { value: "not_equals", label: "is not", needsValue: !0 },
  { value: "filled", label: "is filled in", needsValue: !1 },
  { value: "empty", label: "is empty", needsValue: !1 }
];
function ps(s) {
  return s === !0 ? "true" : s === !1 ? "false" : typeof s == "string" || typeof s == "number" ? String(s) : "";
}
function as(s, l) {
  const n = s.condition;
  if (!n) return !0;
  const r = l[n.field], i = r != null && r !== "" && r !== !1 && !(Array.isArray(r) && r.length === 0), c = (Array.isArray(r) ? r : [r]).map(ps).includes(ps(n.value));
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
const Fe = "__none";
function E({ message: s, id: l }) {
  return s ? /* @__PURE__ */ e.jsx("p", { id: l, className: "cms:text-sm cms:text-destructive", children: s }) : null;
}
function Ae(s) {
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
const Cl = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function De(s) {
  if (s.label) return s.label;
  const l = s.handle.replace(/_/g, " ");
  return l.charAt(0).toUpperCase() + l.slice(1);
}
function ce({ field: s, value: l, onChange: n, errors: r, id: i, content: c = !1 }) {
  const d = De(s), x = Cl.includes(s.type) || ["select", "terms"].includes(s.type) && s.config?.multiple === !0, m = r[""] !== void 0;
  return /* @__PURE__ */ e.jsxs(
    "div",
    {
      className: "cms:flex cms:flex-col cms:gap-2",
      ...x ? { role: "group", "aria-labelledby": `${i}-label`, ...m ? { "aria-invalid": !0, "aria-describedby": `${i}-error` } : {} } : {},
      children: [
        s.type === "toggle" ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
          /* @__PURE__ */ e.jsx(a.Switch, { id: i, checked: l === !0, onCheckedChange: (o) => n(o) }),
          /* @__PURE__ */ e.jsx(a.Label, { htmlFor: i, children: d })
        ] }) : /* @__PURE__ */ e.jsxs(a.Label, { id: `${i}-label`, htmlFor: x ? void 0 : i, children: [
          d,
          s.required && /* @__PURE__ */ e.jsx("span", { className: "cms:text-destructive", children: " *" })
        ] }),
        /* @__PURE__ */ e.jsx(Dl, { field: s, value: l, onChange: n, errors: r, id: i, content: c }),
        ["text", "textarea"].includes(s.type) && se(s, "max") !== void 0 && /* @__PURE__ */ e.jsx($l, { length: typeof l == "string" ? [...l].length : 0, max: se(s, "max") ?? 0 }),
        s.instructions && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s.instructions }),
        /* @__PURE__ */ e.jsx(E, { message: r[""], id: `${i}-error` })
      ]
    }
  );
}
function $l({ length: s, max: l }) {
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
function Dl({ field: s, value: l, onChange: n, errors: r, id: i, content: c }) {
  const d = r[""] !== void 0;
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
          "aria-invalid": d,
          value: typeof l == "string" ? l : "",
          rows: se(s, "rows") ?? 4,
          onChange: (x) => n(x.target.value)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ e.jsx(a.RichTextEditor, { id: i, labelledBy: `${i}-label`, invalid: d, value: typeof l == "string" ? l : "", onChange: n });
    case "number": {
      const x = ol(l);
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: i,
            type: "number",
            className: "cms:max-w-48",
            "aria-invalid": d,
            "aria-describedby": x ? `${i}-grouped` : void 0,
            value: typeof l == "number" ? String(l) : typeof l == "string" ? l : "",
            min: se(s, "min"),
            max: se(s, "max"),
            step: se(s, "step") ?? "any",
            onChange: (m) => n(m.target.value === "" ? null : Number(m.target.value))
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
          invalid: d,
          required: s.required === !0,
          value: ms(il(l, x)),
          onChange: (m) => n(ms(m ?? ""))
        }
      );
    }
    case "select":
      return s.config?.multiple === !0 ? /* @__PURE__ */ e.jsx(
        zl,
        {
          options: Ae(s),
          value: Array.isArray(l) ? l.map(String) : [],
          onChange: n,
          invalid: d,
          empty: typeof s.config?.empty == "string" ? s.config.empty : void 0,
          inTickOrder: s.config?.in_tick_order === !0
        }
      ) : /* @__PURE__ */ e.jsx(
        Tl,
        {
          options: Ae(s),
          value: typeof l == "string" ? l : null,
          onChange: n,
          id: i,
          empty: dl(Ae(s), s.required === !0, typeof s.config?.default == "string" && s.config.default !== "", typeof l == "string" && l !== "")
        }
      );
    case "terms": {
      const x = s.config?.multiple === !0, m = Array.isArray(l) ? l.filter((o) => typeof o == "number") : typeof l == "number" ? l : null;
      return /* @__PURE__ */ e.jsx(
        jl,
        {
          id: i,
          taxonomy: typeof s.taxonomy == "string" ? s.taxonomy : null,
          multiple: x,
          max: se(s, "max") ?? null,
          required: s.required === !0,
          invalid: d,
          value: x ? Array.isArray(m) ? m : [] : typeof m == "number" ? m : null,
          onChange: n
        }
      );
    }
    case "entries":
      return /* @__PURE__ */ e.jsx(
        Te,
        {
          id: i,
          invalid: d,
          multiple: s.config?.multiple === !0,
          max: se(s, "max") ?? null,
          collections: s.collections ?? [],
          onChange: n,
          value: typeof l == "number" || Array.isArray(l) && l.every((x) => typeof x == "number") ? l : null
        }
      );
    case "link":
      return /* @__PURE__ */ e.jsx(Ml, { label: De(s), value: ue(l), onChange: n, errors: r, id: i, collections: s.collections ?? [] });
    case "media":
      return /* @__PURE__ */ e.jsx(
        a.MediaPickerInput,
        {
          id: i,
          invalid: d,
          disabled: !1,
          multiple: s.config?.multiple === !0,
          max: se(s, "max") ?? null,
          types: Array.isArray(s.config?.types) ? s.config.types : [],
          value: typeof l == "number" || Array.isArray(l) && l.every((x) => typeof x == "number") ? l : null,
          onChange: n
        }
      );
    case "group":
      return /* @__PURE__ */ e.jsx(he, { fields: s.fields ?? [], value: ue(l), onChange: n, errors: r, id: i, content: c });
    case "repeater":
      return /* @__PURE__ */ e.jsx(Bl, { field: s, value: Array.isArray(l) ? l : [], onChange: n, errors: r, id: i, content: c });
    case "flexible":
      return /* @__PURE__ */ e.jsx(Ll, { field: s, value: Array.isArray(l) ? l : [], onChange: n, errors: r, id: i });
    default:
      return /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: i,
          "aria-invalid": d,
          value: typeof l == "string" ? l : "",
          placeholder: _l(s, "placeholder"),
          onChange: (x) => n(x.target.value)
        }
      );
  }
}
function se(s, l) {
  const n = s.config?.[l];
  return typeof n == "number" ? n : void 0;
}
function _l(s, l) {
  const n = s.config?.[l];
  return typeof n == "string" ? n : void 0;
}
function he({ fields: s, value: l, onChange: n, errors: r, id: i, content: c, bare: d = !1 }) {
  return /* @__PURE__ */ e.jsx("div", { className: d ? "cms:flex cms:flex-col cms:gap-6" : "cms:flex cms:flex-col cms:gap-4 cms:rounded-lg cms:border cms:p-4", children: s.filter((x) => as(x, l)).map((x) => x.shared ? (
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
      errors: X(r, x.handle),
      onChange: (m) => n({ ...l, [x.handle]: m })
    },
    x.handle
  )) });
}
function Tl({ options: s, value: l, onChange: n, id: r, empty: i }) {
  return /* @__PURE__ */ e.jsxs(a.Select, { value: l ?? Fe, onValueChange: (c) => n(c === Fe ? null : c), children: [
    /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: r, className: "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
    /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
      i && /* @__PURE__ */ e.jsx(a.SelectItem, { value: Fe, children: t("None") }),
      s.map((c) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: c.value, children: c.label }, c.value))
    ] })
  ] });
}
function zl({ options: s, value: l, onChange: n, empty: r, inTickOrder: i = !1, invalid: c = !1 }) {
  return s.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: r ?? t("Nothing to choose from yet.") }) : /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2", children: s.map((d) => /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
    /* @__PURE__ */ e.jsx(
      a.Checkbox,
      {
        checked: l.includes(d.value),
        "aria-invalid": c || void 0,
        onCheckedChange: (x) => n(x ? i ? [...l.filter((m) => m !== d.value), d.value] : s.map((m) => m.value).filter((m) => m === d.value || l.includes(m)) : l.filter((m) => m !== d.value))
      }
    ),
    d.label,
    i && l.includes(d.value) && /* @__PURE__ */ e.jsxs("span", { className: "cms:text-xs cms:text-muted-foreground", "aria-label": `number ${l.indexOf(d.value) + 1}`, children: [
      "#",
      l.indexOf(d.value) + 1
    ] })
  ] }, d.value)) });
}
function Ml({ label: s, value: l, onChange: n, errors: r, id: i, collections: c }) {
  const d = l.type === "entry" ? "entry" : "url", x = (m) => {
    const o = { ...l, type: d, ...m }, p = o.type === "entry" ? typeof o.entry_id != "number" : o.url === "" || o.url === void 0 || o.url === null;
    n(p ? o.label || o.new_tab ? o : null : o);
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("div", { role: "radiogroup", "aria-label": t(":field: link to", { field: s }), className: "cms:inline-flex cms:w-fit cms:rounded-md cms:border cms:p-0.5", children: ["url", "entry"].map((m) => /* @__PURE__ */ e.jsx(
      a.Button,
      {
        type: "button",
        size: "sm",
        role: "radio",
        "aria-checked": d === m,
        variant: d === m ? "secondary" : "ghost",
        onClick: () => x({ type: m, url: m === "url" ? l.url : void 0, entry_id: m === "entry" ? l.entry_id : void 0 }),
        children: t(m === "url" ? "Address" : "Entry")
      },
      m
    )) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-2 cms:md:grid-cols-[2fr_1fr_auto] cms:md:items-start", children: [
      d === "url" ? /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: i,
          "aria-label": t(":field: address", { field: s }),
          placeholder: t("https://… or /about"),
          value: typeof l.url == "string" ? l.url : "",
          onChange: (m) => x({ url: m.target.value }),
          "aria-invalid": r.url !== void 0
        }
      ) : /* @__PURE__ */ e.jsx(
        Te,
        {
          id: i,
          invalid: r.entry_id !== void 0,
          multiple: !1,
          max: null,
          collections: c,
          value: typeof l.entry_id == "number" ? l.entry_id : null,
          onChange: (m) => x({ entry_id: typeof m == "number" ? m : void 0 })
        }
      ),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          "aria-label": t(":field: link text", { field: s }),
          placeholder: t(d === "entry" ? "Link text (the entry's title)" : "Link text"),
          value: typeof l.label == "string" ? l.label : "",
          onChange: (m) => x({ label: m.target.value })
        }
      ),
      /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:h-9 cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx(a.Checkbox, { checked: l.new_tab === !0, onCheckedChange: (m) => x({ new_tab: m }) }),
        t("New tab")
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ e.jsx(E, { message: r.url ?? r.entry_id ?? r.label ?? r.type }) })
    ] })
  ] });
}
function gs(s, l) {
  return !l && (s.fields ?? []).every((n) => n.type === "text");
}
function ta(s) {
  const l = z.useRef([]);
  return l.current = pl(l.current, s), {
    keys: l.current,
    remove: (n) => {
      l.current = l.current.filter((r, i) => i !== n);
    },
    move: (n, r) => {
      l.current = a.moveItem(l.current, n, r);
    }
  };
}
function aa() {
  const [s, l] = z.useState(() => /* @__PURE__ */ new Set());
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
function la({ keys: s, folding: l }) {
  if (s.length < 2) return null;
  const n = l.anyOpen(s);
  return /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => l.setAll(s, n), children: [
    n ? /* @__PURE__ */ e.jsx(Fa, {}) : /* @__PURE__ */ e.jsx(Aa, {}),
    " ",
    t(n ? "Collapse all" : "Expand all")
  ] });
}
function Bl({ field: s, value: l, onChange: n, errors: r, id: i, content: c = !1 }) {
  const d = s.fields ?? [], x = l.map(ue), m = ta(x.length), o = (_, g) => n(x.map((C, D) => D === _ ? g : C)), p = (_) => {
    m.remove(_), n(x.filter((g, C) => C !== _));
  }, u = s.label ? s.label.toLowerCase().replace(/s$/, "") : t("row"), h = u.charAt(0).toUpperCase() + u.slice(1), b = x.map((_, g) => ({ row: _, index: g, key: m.keys[g] ?? String(g) })), y = aa();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(
      a.SortableList,
      {
        items: b,
        getId: (_) => _.key,
        getLabel: (_) => `${u} ${_.index + 1}`,
        onReorder: (_, g, C) => {
          m.move(g, C), n(_.map((D) => D.row));
        },
        children: ({ row: _, index: g, key: C }, { handle: D }) => gs(s, c) ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(a.SortableHandle, { ...D, label: t("Move :item :number", { item: u, number: g + 1 }), className: "cms:mt-1" }),
          d.map((N) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                "aria-label": N.label || N.handle,
                placeholder: N.label || N.handle,
                value: typeof _[N.handle] == "string" ? _[N.handle] : "",
                onChange: (f) => o(g, { ..._, [N.handle]: f.target.value })
              }
            ),
            /* @__PURE__ */ e.jsx(E, { message: r[`${g}.${N.handle}`] })
          ] }, N.handle)),
          /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": t("Remove :item :number", { item: u, number: g + 1 }), onClick: () => p(g), children: /* @__PURE__ */ e.jsx(W, {}) })
        ] }) : (() => {
          const N = X(r, String(g)), f = y.isCollapsed(C, Object.keys(N).length > 0);
          return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              na,
              {
                label: `${h} ${g + 1}`,
                summary: es(d, _),
                handle: D,
                onRemove: () => p(g),
                collapsed: f,
                onToggle: () => y.toggle(C),
                controls: `${i}-${g}-fields`,
                hidden: c ? _._hidden === !0 : void 0,
                onHidden: (T) => o(g, { ..._, _hidden: T })
              }
            ),
            /* @__PURE__ */ e.jsx("div", { id: `${i}-${g}-fields`, hidden: f, children: !f && /* @__PURE__ */ e.jsx(he, { fields: d, value: _, onChange: (T) => o(g, T), errors: N, id: `${i}-${g}`, content: c }) })
          ] });
        })()
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => n([...x, c ? ml() : {}]), children: [
        /* @__PURE__ */ e.jsx(Z, {}),
        " ",
        t("Add :item", { item: u })
      ] }),
      !gs(s, c) && /* @__PURE__ */ e.jsx(la, { keys: b.map((_) => _.key), folding: y })
    ] })
  ] });
}
function Ll({ field: s, value: l, onChange: n, errors: r, id: i }) {
  const c = s.blocks ?? [], d = l.map(ue), x = ta(d.length), m = (h, b) => n(d.map((y, _) => _ === h ? b : y)), o = (h) => {
    x.remove(h), n(d.filter((b, y) => y !== h));
  }, p = d.map((h, b) => ({ block: h, index: b, key: x.keys[b] ?? String(b) })), u = aa();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    /* @__PURE__ */ e.jsx(
      a.SortableList,
      {
        items: p,
        getId: (h) => h.key,
        className: "cms:gap-3",
        getLabel: (h) => t(":type block", { type: c.find((b) => b.type === h.block.type)?.label ?? String(h.block.type) }),
        onReorder: (h, b, y) => {
          x.move(b, y), n(h.map((_) => _.block));
        },
        children: ({ block: h, index: b, key: y }, { handle: _ }) => {
          const g = c.find((N) => N.type === h.type), C = X(r, `${b}.values`), D = u.isCollapsed(y, Object.keys(C).length > 0 || r[`${b}.type`] !== void 0);
          return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              na,
              {
                label: g?.label ?? String(h.type),
                summary: g ? es(g.fields, ue(h.values)) : null,
                badge: !0,
                handle: _,
                onRemove: () => o(b),
                collapsed: D,
                onToggle: () => u.toggle(y),
                controls: `${i}-${b}-fields`,
                hidden: h.hidden === !0,
                onHidden: (N) => m(b, { ...h, hidden: N })
              }
            ),
            /* @__PURE__ */ e.jsx("div", { id: `${i}-${b}-fields`, hidden: D, children: D ? null : g ? /* @__PURE__ */ e.jsx(
              he,
              {
                fields: g.fields,
                value: ue(h.values),
                onChange: (N) => m(b, { ...h, values: N }),
                errors: C,
                id: `${i}-${b}`,
                content: !0
              }
            ) : /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: t("This kind of block no longer exists. Its values are kept.") }) }),
            /* @__PURE__ */ e.jsx(E, { message: r[`${b}.type`] })
          ] });
        }
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
        /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", disabled: c.length === 0, children: [
          /* @__PURE__ */ e.jsx(Z, {}),
          " ",
          t("Add block")
        ] }) }),
        /* @__PURE__ */ e.jsx(a.DropdownMenuContent, { align: "start", children: c.map((h) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => n([...d, ul(h.type)]), children: h.label }, h.type)) })
      ] }),
      /* @__PURE__ */ e.jsx(la, { keys: p.map((h) => h.key), folding: u })
    ] })
  ] });
}
function na({ label: s, summary: l, badge: n = !1, handle: r, onRemove: i, collapsed: c, onToggle: d, controls: x, hidden: m, onHidden: o }) {
  const p = c ? ve : Os, u = l ? `${s}: ${l}` : s;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(a.SortableHandle, { ...r, label: t("Move :title", { title: u }) }),
    /* @__PURE__ */ e.jsxs(
      "button",
      {
        type: "button",
        onClick: d,
        "aria-expanded": !c,
        "aria-controls": x,
        className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:rounded-md cms:text-left cms:outline-none cms:focus-visible:ring-2 cms:focus-visible:ring-ring",
        children: [
          /* @__PURE__ */ e.jsx(p, { className: "cms:size-4 cms:shrink-0 cms:text-muted-foreground", "aria-hidden": !0 }),
          n ? /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: s }) : /* @__PURE__ */ e.jsx("span", { className: "cms:shrink-0 cms:text-sm cms:font-medium", children: s }),
          l && /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:text-sm cms:text-muted-foreground", children: l }),
          /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: c ? t("(collapsed)") : "" })
        ]
      }
    ),
    m !== void 0 && /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:shrink-0 cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", title: t("Off: kept here, but left out of the page"), children: [
      /* @__PURE__ */ e.jsx(a.Switch, { checked: !m, onCheckedChange: (h) => o(!h), "aria-label": t(":title: visible on site", { title: u }) }),
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
function ca({ fields: s, onChange: l, types: n, errors: r, depth: i = 1, idPrefix: c = "field", reserved: d, locales: x = [] }) {
  const [m, o] = z.useState(() => /* @__PURE__ */ new Set()), p = (g) => o((C) => {
    const D = new Set(C);
    return D.has(g) ? D.delete(g) : D.add(g), D;
  }), u = (g, C) => l(s.map((D, N) => N === g ? C : D)), h = (g) => {
    const C = yl(g.type, g.label, s);
    l([...s, C]), o(/* @__PURE__ */ new Set([C.key]));
  }, [b, y] = z.useState(""), _ = (g) => {
    const C = Sl(s, g, d, t);
    C && (l(C.fields), o(/* @__PURE__ */ new Set([C.copy.key])), y(t(":title duplicated as :copy, below it.", { title: s[g]?.label || s[g]?.handle || "", copy: C.copy.label ?? C.copy.handle })));
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:border-dashed cms:p-4 cms:text-sm cms:text-muted-foreground", children: t("No fields yet.") }),
    s.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:justify-end", children: m.size > 0 ? /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => o(/* @__PURE__ */ new Set()), children: t("Close all") }) : /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => o(new Set(s.map((g) => g.key))), children: t("Open all") }) }),
    /* @__PURE__ */ e.jsx(a.SortableList, { items: s, getId: (g) => g.key, getLabel: (g) => g.label || g.handle, onReorder: (g) => l(g), children: (g, { index: C, handle: D, isOverlay: N }) => {
      const f = n.find((w) => w.type === g.type), T = Ne(r, String(C)) || Xt(g, s, d) !== null, A = !N && (m.has(g.key) || T), k = `${c}-${g.key}`;
      return /* @__PURE__ */ e.jsxs("div", { "data-invalid": T ? "true" : void 0, className: `cms:rounded-lg cms:border cms:bg-card ${T ? "cms:border-destructive" : ""}`, children: [
        /* @__PURE__ */ e.jsx(
          Fl,
          {
            field: g,
            type: f,
            index: C,
            expanded: A,
            controls: k,
            handle: D,
            shared: x.length > 0,
            onToggle: () => p(g.key),
            onDuplicate: () => _(C),
            onRemove: () => l(s.filter((w, $) => $ !== C))
          }
        ),
        A && /* @__PURE__ */ e.jsx(
          Al,
          {
            id: k,
            field: g,
            type: f,
            siblings: s,
            onChange: (w) => u(C, w),
            types: n,
            errors: pe(r, String(C)),
            depth: i,
            reserved: d,
            locales: x
          }
        )
      ] });
    } }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:sr-only", "aria-live": "polite", children: b }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", children: [
        /* @__PURE__ */ e.jsx(Z, {}),
        " ",
        t("Add field")
      ] }) }),
      /* @__PURE__ */ e.jsx(a.DropdownMenuContent, { align: "start", children: n.filter((g) => !g.hasChildren || i < bl).map((g) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => h(g), children: g.label }, g.type)) })
    ] }) })
  ] });
}
const Il = {
  text: rl,
  textarea: ll,
  rich_text: lt,
  number: Ra,
  toggle: nl,
  date: Ia,
  select: gt,
  media: Ua,
  entries: Ja,
  terms: al,
  link: ut,
  group: Va,
  repeater: Xa,
  flexible: La,
  fieldset: Za,
  file: Qa
};
function Fl({ field: s, type: l, expanded: n, controls: r, handle: i, shared: c, onToggle: d, onDuplicate: x, onRemove: m }) {
  const o = s.label || s.handle, p = Il[s.type] ?? sl, u = s.type === "fieldset", h = u ? typeof s.config?.fieldset == "string" ? s.config.fieldset : "" : s.handle, b = c && !u && !ea(s, l?.translatable ?? !1);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-1 cms:py-1.5 cms:pr-1.5 cms:pl-2", children: [
    /* @__PURE__ */ e.jsx(a.SortableHandle, { ...i, label: t("Move :title", { title: o }) }),
    /* @__PURE__ */ e.jsx(
      "button",
      {
        type: "button",
        "aria-expanded": n,
        "aria-controls": r,
        onClick: d,
        "aria-label": n ? t("Close :title", { title: o }) : t("Open :title", { title: o }),
        className: "cms:inline-flex cms:size-7 cms:shrink-0 cms:items-center cms:justify-center cms:rounded-md cms:text-muted-foreground cms:transition-colors hover:cms:bg-accent hover:cms:text-foreground focus-visible:cms:outline-none focus-visible:cms:ring-2 focus-visible:cms:ring-ring",
        children: /* @__PURE__ */ e.jsx(ve, { "aria-hidden": !0, className: `cms:size-4 cms:transition-transform cms:duration-200 ${n ? "cms:rotate-90" : ""}` })
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { role: "presentation", onClick: d, className: "cms:flex cms:min-w-0 cms:flex-1 cms:cursor-pointer cms:flex-wrap cms:items-center cms:gap-x-2.5 cms:gap-y-1 cms:py-0.5", children: [
      /* @__PURE__ */ e.jsxs("span", { className: "cms:inline-flex cms:shrink-0 cms:items-center cms:gap-1 cms:rounded-md cms:bg-muted cms:px-1.5 cms:py-0.5 cms:text-xs cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsx(p, { "aria-hidden": !0, className: "cms:size-3.5" }),
        l?.label ?? s.type
      ] }),
      /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:min-w-0 cms:max-w-full cms:flex-col cms:gap-x-2 cms:sm:flex-row cms:sm:items-baseline", children: [
        /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: o }),
        h !== "" && h !== o && /* @__PURE__ */ e.jsx("code", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", title: t(u ? "Fieldset" : "Handle"), children: h })
      ] }),
      (s.required || b || s.condition || l?.hasChildren && s.fields.length > 0 && !n) && /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-1", children: [
        s.required && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", className: "cms:font-normal", children: t("Required") }),
        b && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", className: "cms:font-normal", title: t("One value shared by every language."), children: t("Shared") }),
        s.condition && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", className: "cms:font-normal", children: t("Conditional") }),
        l?.hasChildren && s.fields.length > 0 && !n && /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: t(":count inside", { count: s.fields.length }) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(
      a.Button,
      {
        type: "button",
        variant: "ghost",
        size: "icon",
        className: "cms:size-8 cms:text-muted-foreground hover:cms:text-foreground",
        "aria-label": t("Duplicate :title", { title: o }),
        title: t("Duplicate :title", { title: o }),
        onClick: x,
        children: /* @__PURE__ */ e.jsx(Ys, {})
      }
    ),
    /* @__PURE__ */ e.jsx(
      a.Button,
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
function Al({ id: s, field: l, type: n, siblings: r, onChange: i, types: c, errors: d, depth: x, reserved: m, locales: o }) {
  const p = l.config ?? {}, u = Xt(l, r, m, t);
  return l.type === "fieldset" ? /* @__PURE__ */ e.jsxs("div", { id: s, className: "cms:flex cms:flex-col cms:gap-4 cms:border-t cms:p-4", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-label`, children: t("Label") }),
        /* @__PURE__ */ e.jsx(a.Input, { id: `${s}-label`, value: l.label ?? "", onChange: (h) => i(xs(l, h.target.value, r)) }),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("Only shown here, in the builder.") })
      ] }),
      n?.settings.map((h) => /* @__PURE__ */ e.jsx(
        ce,
        {
          id: `${s}-config-${h.handle}`,
          field: h,
          value: p[h.handle],
          errors: X(d, `config.${h.handle}`),
          onChange: (b) => i({ ...l, config: { ...p, [h.handle]: b } })
        },
        h.handle
      ))
    ] }),
    /* @__PURE__ */ e.jsx(E, { message: d.handle ?? d.type })
  ] }) : /* @__PURE__ */ e.jsxs("div", { id: s, className: "cms:flex cms:flex-col cms:gap-4 cms:border-t cms:p-4", children: [
    !n && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t(`The field type ":type" isn't registered. Its data is kept; register the type or remove the field.`, { type: l.type }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-label`, children: t("Label") }),
        /* @__PURE__ */ e.jsx(a.Input, { id: `${s}-label`, value: l.label ?? "", onChange: (h) => i(xs(l, h.target.value, r)) }),
        /* @__PURE__ */ e.jsx(E, { message: d.label })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-handle`, children: t("Handle") }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: `${s}-handle`,
            className: "cms:font-mono",
            value: l.handle,
            onChange: (h) => i({ ...l, handle: ts(h.target.value), handleTouched: !0 })
          }
        ),
        Le(l) === null && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("How templates read it. Renaming it hides values saved under the old one.") }),
        /* @__PURE__ */ e.jsx("div", { "aria-live": "polite", children: Le(l) !== null && /* @__PURE__ */ e.jsx(Ut, { children: fs(
          t("Content saved under :old won't show under :new, and templates reading :old get nothing. To rename it with its content: put back :old, save, then run :command."),
          { old: Le(l) ?? "", new: l.handle || "…", command: "php artisan sunrice:rename-field" }
        ) }) }),
        /* @__PURE__ */ e.jsx(E, { message: d.handle ?? u ?? void 0 })
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
      /* @__PURE__ */ e.jsx(E, { message: d.instructions })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-start cms:gap-x-8 cms:gap-y-3", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Switch, { id: `${s}-required`, checked: l.required === !0, onCheckedChange: (h) => i({ ...l, required: h }) }),
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-required`, children: t("Required") })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
          /* @__PURE__ */ e.jsx(
            a.Switch,
            {
              id: `${s}-translatable`,
              checked: ea(l, n?.translatable ?? !1),
              "aria-describedby": `${s}-translatable-help`,
              onCheckedChange: (h) => i(kl(l, h, n?.translatable ?? !1))
            }
          ),
          /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-translatable`, children: t("Translatable") })
        ] }),
        /* @__PURE__ */ e.jsx("p", { id: `${s}-translatable-help`, className: "cms:text-sm cms:text-muted-foreground", children: t("Each language gets its own value. Off: one value shared by every language.") })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(Pl, { id: s, field: l, siblings: r, onChange: i, errors: pe(d, "condition") }),
    o.length > 0 && /* @__PURE__ */ e.jsx(El, { id: s, field: l, locales: o, onChange: i, errors: pe(d, "translations") }),
    (n?.settings.length ?? 0) > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: n?.settings.map((h) => /* @__PURE__ */ e.jsx(
      ce,
      {
        id: `${s}-config-${h.handle}`,
        field: h,
        value: p[h.handle],
        errors: X(d, `config.${h.handle}`),
        onChange: (b) => i({ ...l, config: { ...p, [h.handle]: b } })
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
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: fs(t("Optional checks, one per line, such as :email or :max (for developers: Laravel validation rules)."), { email: "email", max: "max:100" }) }),
      /* @__PURE__ */ e.jsx(E, { message: d.validation ?? Object.entries(d).find(([h]) => h.startsWith("validation."))?.[1] })
    ] }),
    n?.hasChildren && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { children: t("Fields inside") }),
      /* @__PURE__ */ e.jsx(
        ca,
        {
          fields: l.fields,
          onChange: (h) => i({ ...l, fields: h }),
          types: c,
          errors: pe(d, "fields"),
          depth: x + 1,
          idPrefix: s,
          locales: o
        }
      ),
      /* @__PURE__ */ e.jsx(E, { message: d.fields })
    ] }),
    /* @__PURE__ */ e.jsx(E, { message: d.type })
  ] });
}
function El({ id: s, field: l, locales: n, onChange: r, errors: i }) {
  const c = l.translations ?? {}, d = l.type === "select" && Array.isArray(l.config?.options) ? l.config.options.filter((o) => typeof o?.value == "string" && o.value !== "") : [], x = (o, p) => {
    const u = { ...c, [o]: { ...c[o], ...p } };
    r({ ...l, translations: u });
  }, m = Object.entries(i).find(([, o]) => o)?.[1];
  return /* @__PURE__ */ e.jsxs("details", { className: "cms:rounded-lg cms:border cms:p-3", open: Object.keys(c).length > 0 || m !== void 0, children: [
    /* @__PURE__ */ e.jsx("summary", { className: "cms:cursor-pointer cms:text-sm cms:font-medium", children: t("In other languages") }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:mt-2 cms:text-sm cms:text-muted-foreground", children: t("What visitors read in each language, as forms show it. Empty: as above.") }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:mt-3 cms:flex cms:flex-col cms:gap-4", children: n.map(({ code: o, name: p }) => /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-3 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(a.Label, { htmlFor: `${s}-label-${o}`, children: [
          "Label (",
          p,
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
          p,
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
      d.length > 0 && /* @__PURE__ */ e.jsxs("fieldset", { className: "cms:flex cms:flex-col cms:gap-2 cms:md:col-span-2", children: [
        /* @__PURE__ */ e.jsxs("legend", { className: "cms:text-sm cms:font-medium", children: [
          "Options (",
          p,
          ")"
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-2 cms:sm:grid-cols-2", children: d.map((u) => {
          const h = String(u.value);
          return /* @__PURE__ */ e.jsx(
            a.Input,
            {
              "aria-label": `${h} (${p})`,
              value: c[o]?.options?.[h] ?? "",
              placeholder: typeof u.label == "string" && u.label !== "" ? u.label : h,
              onChange: (b) => x(o, { options: { ...c[o]?.options, [h]: b.target.value } })
            },
            h
          );
        }) })
      ] })
    ] }, o)) }),
    /* @__PURE__ */ e.jsx(E, { message: m })
  ] });
}
const Ee = "__always";
function Hl(s) {
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
function Pl({ id: s, field: l, siblings: n, onChange: r, errors: i }) {
  const c = Nl(l, n), d = l.condition ?? null, x = Ie.find((o) => o.value === d?.operator) ?? Ie[0], m = (o) => r({ ...l, condition: o === null ? null : { field: d?.field ?? c[0]?.handle ?? "", operator: d?.operator ?? "equals", value: d?.value ?? "", ...o } });
  return c.length === 0 && d === null ? null : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-condition`, children: t("Show") }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(a.Select, { value: d?.field ?? Ee, onValueChange: (o) => m(o === Ee ? null : { field: o }), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: `${s}-condition`, className: "cms:w-56", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
          /* @__PURE__ */ e.jsx(a.SelectItem, { value: Ee, children: t("Always") }),
          c.map((o) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: o.handle, children: t("When :field", { field: o.label || o.handle }) }, o.key))
        ] })
      ] }),
      d && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(a.Select, { value: x.value, onValueChange: (o) => m({ operator: o }), children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { "aria-label": t("How to compare"), className: "cms:w-36", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: Ie.map((o) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: o.value, children: Hl(o.value) }, o.value)) })
        ] }),
        x.needsValue && /* @__PURE__ */ e.jsx(
          a.Input,
          {
            "aria-label": t("Value"),
            className: "cms:w-48",
            placeholder: t("a value, or true / false"),
            value: String(d.value ?? ""),
            onChange: (o) => m({ value: o.target.value })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("A hidden field isn't required, and keeps what it had.") }),
    /* @__PURE__ */ e.jsx(E, { message: i.field ?? i.operator ?? i.value ?? i[""] })
  ] });
}
function fs(s, l) {
  return s.split(/(:[a-z_]+)/).map((n, r) => {
    const i = l[n.slice(1)];
    return n.startsWith(":") && i !== void 0 ? /* @__PURE__ */ e.jsx("code", { children: i }, r) : n;
  });
}
function Ol(s, l) {
  return t(s === "fieldset" ? l ? "Set when it was created: flexible blocks keep it with what they hold." : "Lowercase letters, digits and underscores. It can't change later: flexible blocks keep it with what they hold." : l ? "Changing it updates the collections, taxonomies, global sets, forms and entries that use it." : "Lowercase letters, digits and underscores, made from the title until you type one.");
}
function js({ kind: s = "blueprint", blueprint: l, fieldTypes: n, locales: r = [], usedBy: i = [], reserved: c = [] }) {
  const d = s === "fieldset", x = B(d ? "cms/fieldsets" : "cms/blueprints"), m = l ? l.title : t(d ? "New fieldset" : "New blueprint");
  a.useBreadcrumbs([{ label: t(d ? "Fieldsets" : "Blueprints"), href: x }, { label: m }]);
  const [o, p] = re(), u = v.useForm({ title: l?.title ?? "", handle: l?.handle ?? "" }), [h, b] = z.useState(l !== null), [y, _] = z.useState(() => Jt(l?.fields)), g = ($) => n.find((F) => F.type === $)?.hasChildren === !0, C = u.errors, [D, N] = z.useState(() => JSON.stringify(y)), f = u.isDirty || JSON.stringify(y) !== D, T = () => {
    u.setDefaults();
    const $ = Zt(y);
    _($), N(JSON.stringify($));
  }, A = () => {
    if (u.processing) return;
    u.transform((F) => ({
      // A blueprint's handle can change (RenameBlueprint); a fieldset's can't: flexible blocks store it.
      ...l ? s === "blueprint" ? { title: F.title, handle: F.handle } : { title: F.title } : F,
      fields: Qt(y, g)
    }));
    const $ = () => window.requestAnimationFrame(() => document.querySelector('[data-invalid="true"]')?.scrollIntoView({ block: "center", behavior: "smooth" }));
    l ? u.put(`${x}/${l.handle}`, { preserveScroll: !0, onSuccess: T, onError: $ }) : u.post(x, { onSuccess: T, onError: $ });
  }, k = ($) => {
    $.preventDefault(), A();
  };
  a.useUnsavedChanges(f, A);
  const w = () => l && o(
    d ? t('Delete the fieldset ":title"? Content keeps its values.', { title: l.title }) : t('Delete the blueprint ":title"? Content keeps its values.', { title: l.title }),
    () => v.router.delete(`${x}/${l.handle}`, { preserveScroll: !0 })
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: k, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(v.Head, { title: m }),
    p,
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: m,
        back: { href: x, label: t(d ? "Back to fieldsets" : "Back to blueprints") },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          l && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "icon", className: "cms:text-destructive", "aria-label": t("Delete :title", { title: m }), onClick: w, children: /* @__PURE__ */ e.jsx(W, {}) }),
          /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: u.processing, children: [
            u.processing && /* @__PURE__ */ e.jsx(ae, { className: "cms:animate-spin" }),
            t(l ? "Save" : d ? "Create fieldset" : "Create blueprint")
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(E, { message: C.blueprint ?? C.fieldset }),
    /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "title", children: t("Title") }),
        /* @__PURE__ */ e.jsx(a.Input, { id: "title", value: u.data.title, required: !0, onChange: ($) => {
          u.setData((F) => ({ ...F, title: $.target.value, handle: h ? F.handle : Gt($.target.value) }));
        } }),
        /* @__PURE__ */ e.jsx(E, { message: C.title })
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
            onChange: ($) => {
              b(!0), u.setData("handle", ts($.target.value));
            }
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: Ol(s, l !== null) }),
        /* @__PURE__ */ e.jsx("div", { "aria-live": "polite", children: l !== null && s === "blueprint" && u.data.handle !== "" && u.data.handle !== l.handle && /* @__PURE__ */ e.jsx(Ut, { id: "handle-warning", children: t(`Changing the handle can break code. Sunrice updates the collections, taxonomies, global sets, forms and entries that use ":old". You update code that names it (Blueprint::where('handle', ':old')) and structure exports made before.`, { old: l.handle }) }) }),
        /* @__PURE__ */ e.jsx(E, { message: C.handle })
      ] })
    ] }) }),
    i.length > 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("Used by :list. Changes show there at once.", { list: i.join(", ") }) }),
    /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-3", "aria-labelledby": "fields-heading", children: [
      /* @__PURE__ */ e.jsx("h2", { id: "fields-heading", className: "cms:text-lg cms:font-medium", children: t("Fields") }),
      /* @__PURE__ */ e.jsx(ca, { fields: y, onChange: _, types: n, errors: pe(C, "fields"), reserved: s === "blueprint" ? c : void 0, locales: r.slice(1) }),
      /* @__PURE__ */ e.jsx(E, { message: C.fields })
    ] })
  ] });
}
function ra({ kind: s, base: l, rows: n, intro: r }) {
  const i = s === "blueprint", c = t(i ? "Blueprints" : "Fieldsets");
  a.useBreadcrumbs([{ label: c }]);
  const [d, x] = re();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(v.Head, { title: c }),
    x,
    /* @__PURE__ */ e.jsx(a.PageHeader, { title: c, description: r, actions: /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(v.Link, { href: `${l}/create`, children: [
      /* @__PURE__ */ e.jsx(Z, {}),
      " ",
      t(i ? "New blueprint" : "New fieldset")
    ] }) }) }),
    /* @__PURE__ */ e.jsx(a.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(a.Table, { children: [
      /* @__PURE__ */ e.jsx(a.TableHeader, { children: /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
        /* @__PURE__ */ e.jsx(a.TableHead, { children: t("Title") }),
        /* @__PURE__ */ e.jsx(a.TableHead, { children: t("Handle") }),
        /* @__PURE__ */ e.jsx(a.TableHead, { children: t("Fields") }),
        n.some((m) => m.usedBy) && /* @__PURE__ */ e.jsx(a.TableHead, { children: t("Used by") }),
        /* @__PURE__ */ e.jsx(a.TableHead, { className: "cms:w-12", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: t("Actions") }) })
      ] }) }),
      /* @__PURE__ */ e.jsxs(a.TableBody, { children: [
        n.length === 0 && /* @__PURE__ */ e.jsx(a.TableRow, { children: /* @__PURE__ */ e.jsx(a.TableCell, { colSpan: 5, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: t(i ? "No blueprints yet." : "No fieldsets yet.") }) }),
        n.map((m) => /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx(v.Link, { href: `${l}/${m.handle}/edit`, className: "cms:font-medium cms:hover:underline", children: m.title }) }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: m.handle }) }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: m.fields }),
          m.usedBy && /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:text-muted-foreground", children: m.usedBy.join(", ") || "—" }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx(
            a.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": t("Delete :title", { title: m.title }),
              onClick: () => d(
                i ? t('Delete the blueprint ":title"? Content keeps its values.', { title: m.title }) : t('Delete the fieldset ":title"? Content keeps its values.', { title: m.title }),
                () => v.router.delete(`${l}/${m.handle}`, { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(W, {})
            }
          ) })
        ] }, m.id))
      ] })
    ] }) })
  ] });
}
function Vl({ blueprints: s }) {
  const l = v.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(E, { message: l.blueprint }),
    /* @__PURE__ */ e.jsx(
      ra,
      {
        kind: "blueprint",
        base: B("cms/blueprints"),
        rows: s,
        intro: t("The fields editors fill in, for each kind of content.")
      }
    )
  ] });
}
const He = (s) => s.includes("::") ? s : `${s.replace(/\./g, "/")}.blade.php`;
function Rl(s, l) {
  const n = s.trim();
  return n !== "" ? l?.own?.view === n && !l.own.exists ? null : n : l?.fallbacks.find((r) => r.exists)?.view ?? null;
}
function Pe({ file: s }) {
  const l = s.split("/");
  return /* @__PURE__ */ e.jsx("code", { className: "cms:whitespace-normal cms:break-normal", children: l.map((n, r) => /* @__PURE__ */ e.jsxs(z.Fragment, { children: [
    n,
    r < l.length - 1 && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      "/",
      /* @__PURE__ */ e.jsx("wbr", {})
    ] })
  ] }, r)) });
}
function ia({ example: s, empty: l, value: n = "", lookup: r = null }) {
  const i = n.trim(), c = Rl(n, r), d = r?.fallbacks ?? [], x = /* @__PURE__ */ e.jsx("span", { className: "cms:ml-1 cms:rounded cms:bg-muted cms:px-1 cms:text-[0.65rem] cms:font-medium cms:text-foreground", children: t("in use") });
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1 cms:text-xs cms:leading-relaxed cms:text-muted-foreground", children: [
    /* @__PURE__ */ e.jsx("p", { children: l }),
    /* @__PURE__ */ e.jsxs("details", { className: "cms:group", children: [
      /* @__PURE__ */ e.jsx("summary", { className: "cms:w-fit cms:cursor-pointer cms:select-none cms:rounded-sm cms:underline-offset-4 hover:cms:underline focus-visible:cms:outline-2 focus-visible:cms:outline-ring", children: t("Which file?") }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:mt-1.5 cms:flex cms:flex-col cms:gap-1.5", children: [
        i !== "" && /* @__PURE__ */ e.jsxs("p", { children: [
          /* @__PURE__ */ e.jsx(Pe, { file: He(i) }),
          r?.own?.view === i ? r.own.exists ? x : /* @__PURE__ */ e.jsx("span", { className: "cms:ml-1 cms:text-destructive", children: t("not found") }) : null
        ] }),
        /* @__PURE__ */ e.jsx("p", { children: t(i !== "" ? "Without it, the first that exists:" : "The first that exists:") }),
        /* @__PURE__ */ e.jsxs("ol", { className: "cms:ml-4 cms:list-decimal cms:space-y-0.5", children: [
          d.map((m) => /* @__PURE__ */ e.jsxs("li", { children: [
            /* @__PURE__ */ e.jsx(Pe, { file: He(m.view) }),
            c === m.view && i === "" && x
          ] }, m.view)),
          /* @__PURE__ */ e.jsxs("li", { children: [
            t("the built-in template"),
            c === null && x
          ] })
        ] }),
        /* @__PURE__ */ e.jsx("p", { children: t("Files are under resources/views; a name like :example is :file.", { example: "\0", file: "" }).split(/(\u0000|\u0001)/).map((m, o) => m === "\0" ? /* @__PURE__ */ e.jsx("code", { children: s }, o) : m === "" ? /* @__PURE__ */ e.jsx(Pe, { file: He(s) }, o) : m) })
      ] })
    ] })
  ] });
}
const bs = { preserveScroll: !0, preserveState: !0 };
function Ul({ entryId: s, comments: l }) {
  const [n, r] = z.useState(null), [i, c] = z.useState(""), [d, x] = z.useState(!1), m = (p, u) => v.router.post(B(`cms/comments/${p}/status`), { status: u }, bs), o = (p) => v.router.post(B(`cms/comments/${p}/reply`), { body: i }, {
    ...bs,
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
        l.latest.map((p) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5 cms:border-t cms:border-border/70 cms:pt-3 cms:first-of-type:border-t-0 cms:first-of-type:pt-0", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium", children: p.author }),
            p.status === "pending" && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", children: t("Pending") })
          ] }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:line-clamp-3 cms:break-words cms:whitespace-pre-line", children: p.excerpt }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
            K(p.createdAt),
            p.reply ? ` · ${t("a reply")}` : ""
          ] }),
          l.canModerate && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-1", children: [
            p.status === "pending" && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => m(p.id, "approved"), children: [
              /* @__PURE__ */ e.jsx(Se, {}),
              " ",
              t("Approve")
            ] }),
            /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => m(p.id, "spam"), children: [
              /* @__PURE__ */ e.jsx(Ye, {}),
              " ",
              t("Spam")
            ] }),
            /* @__PURE__ */ e.jsxs(
              a.Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                "aria-expanded": n === p.id,
                onClick: () => {
                  r(n === p.id ? null : p.id), c("");
                },
                children: [
                  /* @__PURE__ */ e.jsx(bt, {}),
                  " ",
                  t("Reply")
                ]
              }
            )
          ] }),
          n === p.id && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              a.Textarea,
              {
                "aria-label": t("Reply to :author", { author: p.author }),
                rows: 3,
                value: i,
                onChange: (u) => c(u.target.value)
              }
            ),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
              /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "sm", disabled: i.trim() === "" || d, onClick: () => o(p.id), children: t("Post reply") }),
              /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => r(null), children: t("Cancel") })
            ] })
          ] })
        ] }, p.id)),
        /* @__PURE__ */ e.jsx("a", { href: B(`cms/comments?entry=${s}`), className: "cms:text-sm cms:font-medium cms:underline-offset-4 cms:hover:underline", children: t("All comments on this entry") })
      ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-10" }),
        /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-10" })
      ] })
    }
  );
}
const oa = "cms:flex cms:flex-col cms:gap-1 cms:opacity-60";
function ls({ fields: s, values: l, onChange: n, errors: r, storageKey: i, shared: c = [], sharedValues: d = {}, sharedNote: x, disabled: m = !1 }) {
  const o = [], p = { ...d, ...l };
  for (const h of s.filter((b) => as(b, p))) {
    const b = o[o.length - 1];
    h.type === "group" ? o.push(h) : Array.isArray(b) ? b.push(h) : o.push([h]);
  }
  const u = x && (c.length > 0 || $e(s)) ? /* @__PURE__ */ e.jsx("p", { role: "note", className: "cms:rounded-lg cms:border cms:border-dashed cms:px-3 cms:py-2 cms:text-sm cms:text-muted-foreground", children: x }) : null;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    u,
    o.map((h) => {
      if (Array.isArray(h))
        return /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsx(a.CardContent, { children: /* @__PURE__ */ e.jsx("fieldset", { disabled: m, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: h.map((g) => c.includes(g.handle) ? /* @__PURE__ */ e.jsx("fieldset", { disabled: !0, className: oa, title: t("Shared by all languages"), children: /* @__PURE__ */ e.jsx(ce, { id: `data-${g.handle}`, field: g, content: !0, value: d[g.handle], errors: {}, onChange: () => {
        } }) }, g.handle) : /* @__PURE__ */ e.jsx(
          ce,
          {
            id: `data-${g.handle}`,
            field: g,
            content: !0,
            value: l[g.handle],
            errors: X(r, `data.${g.handle}`),
            onChange: (C) => n(g.handle, C)
          },
          g.handle
        )) }) }) }, `fields-${h[0]?.handle ?? ""}`);
      const b = c.includes(h.handle), y = (b ? d : l)[h.handle], _ = X(r, `data.${h.handle}`);
      return /* @__PURE__ */ e.jsx(
        a.CollapsibleCard,
        {
          title: De(h),
          titleClassName: "cms:text-base",
          description: h.instructions ?? void 0,
          storageKey: `${i}:${h.handle}`,
          hasErrors: !b && Ne(r, `data.${h.handle}`),
          children: /* @__PURE__ */ e.jsxs(
            "fieldset",
            {
              disabled: b || m,
              role: "group",
              "aria-label": De(h),
              className: `cms:flex cms:flex-col cms:gap-2 ${b ? "cms:opacity-60" : ""}`,
              title: b ? t("Shared by all languages") : void 0,
              children: [
                /* @__PURE__ */ e.jsx(
                  he,
                  {
                    bare: !0,
                    fields: h.fields ?? [],
                    id: `data-${h.handle}`,
                    content: !0,
                    errors: b ? {} : _,
                    value: y && typeof y == "object" && !Array.isArray(y) ? y : {},
                    onChange: (g) => n(h.handle, g)
                  }
                ),
                /* @__PURE__ */ e.jsx(E, { message: b ? void 0 : _[""] })
              ]
            }
          )
        },
        h.handle
      );
    })
  ] });
}
function da({ note: s, redirectsUrl: l }) {
  return /* @__PURE__ */ e.jsx("div", { "aria-live": "polite", children: s !== null && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-xs cms:text-muted-foreground", children: [
    t(s === "redirects" ? "Once published, the old address redirects to the new one." : "The old address will stop working (404) unless a redirect is added."),
    s === "breaks" && l && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      " ",
      /* @__PURE__ */ e.jsx("a", { href: l, target: "_blank", rel: "noopener", className: "cms:underline cms:underline-offset-2 cms:hover:text-foreground", children: t("Add a redirect") })
    ] })
  ] }) });
}
function ns() {
  return [
    { handle: "title", type: "text", label: t("Meta title"), instructions: t("Empty: the title."), config: { max: 255 } },
    { handle: "description", type: "textarea", label: t("Meta description"), instructions: t("A sentence or two for search results."), config: { max: 500 } },
    { handle: "canonical", type: "text", label: t("Canonical URL"), instructions: t("Only if this page copies another: that page's address. Empty: this page."), config: { max: 2e3 } },
    { handle: "image", type: "media", label: t("Open Graph image"), instructions: t("Shown when the page is shared."), config: { types: ["image"] } },
    { handle: "noindex", type: "toggle", label: t("Hide from search engines (noindex)") }
  ];
}
function vs(s) {
  if (s.length === 0) return "";
  const l = s.slice(0, 5).map((n) => n.label).join("; ");
  return ` ${s.length > 5 ? t("It's used by :list and :count more: those links will show nothing.", { list: l, count: s.length - 5 }) : t("It's used by :list: those links will show nothing.", { list: l })}`;
}
function ql(s) {
  const { entry: l } = s;
  return /* @__PURE__ */ e.jsx(Kl, { ...s }, l ? `${l.id}:${l.locale}:${l.version}:${l.status}:${l.trashed}:${l.publishedAt}` : "new");
}
function Kl({ collection: s, fields: l, locales: n = [], shared: r = [], sharedValues: i = {}, entry: c, values: d, revisions: x, comments: m, termLabels: o, usedBy: p = [], undoRestore: u = null, machineTranslate: h = null, machineTranslateMissing: b = !1, settings: y, blueprints: _ = [], homepage: g, redirectsUrl: C = null, templates: D = null, can: N }) {
  const f = B(`cms/collections/${s.handle}/entries`), T = c ? B(`cms/entries/${c.id}`) : f, A = c ? d.title : t("New entry");
  a.useBreadcrumbs([{ label: s.title, href: f }, { label: A }]);
  const [k, w] = re(), [$, F] = z.useState(!1), [S, H] = z.useState(null), [R, le] = z.useState(!1), I = v.useForm({
    ...d,
    seo: d.seo ?? {},
    locale: c?.locale ?? null,
    version: c?.version ?? null,
    publish: !1,
    published_at: null,
    parent_id: y?.parentId ?? null,
    template: y?.template ?? "",
    comments_closed: y?.commentsClosed === !0
  }), ie = (M) => I.setData((U) => ({ ...U, ...M })), ee = c ? { locale: c.locale } : {}, Y = n.find((M) => M.main)?.code, q = I.errors, oe = v.usePage().props.errors ?? {}, xe = (M) => {
    const U = ze(q, M);
    U.length > 0 && I.clearErrors(...U);
  }, j = c !== null && c.status !== "draft" && !c.hasUnpublishedChanges && !I.isDirty, O = c === null ? N.create : N.update && !c.trashed, V = c?.status === "scheduled", de = (M) => {
    if (y || c === null) return M;
    const { parent_id: U, template: Q, comments_closed: Un, ...ba } = M;
    return ba;
  }, fe = (M = !1, U = null) => {
    I.transform((Q) => ({ ...de(Q), publish: M, published_at: U })), c ? I.put(T, { preserveScroll: !0, onSuccess: () => F(!1) }) : I.post(T);
  }, ga = () => {
    I.transform((M) => ({ ...de(M), version: null, publish: !1, published_at: null })), I.put(T, { preserveScroll: !0 });
  }, G = a.useEditLock({
    type: "cms.entry",
    id: c?.id,
    locale: c?.locale,
    enabled: c !== null && O,
    noun: t("entry"),
    leaveTo: f,
    getUnsaved: () => I.isDirty ? { title: I.data.title, slug: I.data.slug, data: I.data.data, seo: I.data.seo } : null
  }), J = O && !G.readOnly, fa = async (M) => {
    const U = await G.loadKept(M);
    I.setData((Q) => ({ ...Q, title: U.title ?? Q.title, slug: U.slug ?? Q.slug, data: U.data ?? Q.data, seo: U.seo ?? Q.seo }));
  };
  a.useUnsavedChanges(I.isDirty && !G.takenOver, J ? () => I.processing || fe() : void 0);
  const ja = () => {
    const M = () => v.router.post(`${T}/review`, ee, { preserveScroll: !0 });
    I.isDirty ? (I.transform((U) => ({ ...U, publish: !1, published_at: null })), I.put(T, { preserveScroll: !0, onSuccess: M })) : M();
  }, ke = (M = null) => {
    N.update ? fe(!0, M) : c && v.router.post(`${T}/publish`, { ...ee, published_at: M }, { preserveScroll: !0, onSuccess: () => F(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (M) => {
    M.preventDefault(), fe();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(v.Head, { title: A }),
    w,
    G.dialogs,
    /* @__PURE__ */ e.jsxs(
      a.PageHeader,
      {
        title: A,
        back: { href: f, label: t("Back to :title", { title: s.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          c && !c.trashed && s.pages !== !1 && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(
            "a",
            {
              href: c.previewUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              title: I.isDirty ? t("Shows the saved draft: save first to see your changes.") : t("Shows the saved draft."),
              children: [
                /* @__PURE__ */ e.jsx(Oa, {}),
                " ",
                t("Preview")
              ]
            }
          ) }),
          c?.url && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: c.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(ge, {}),
            " ",
            t("View page")
          ] }) }),
          c?.trashed && N.delete && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", onClick: () => v.router.post(`${T}/restore`, {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(je, {}),
            " ",
            t("Restore")
          ] }),
          c?.trashed && N.delete && /* @__PURE__ */ e.jsxs(
            a.Button,
            {
              type: "button",
              variant: "outline",
              className: "cms:text-destructive",
              onClick: () => k(
                t(`Delete ":title" for good, in every language, with its revisions? This can't be undone.`, { title: d.title }) + vs(p),
                () => v.router.delete(`${T}/force`, { data: p.length > 0 ? { force: 1 } : {} })
              ),
              children: [
                /* @__PURE__ */ e.jsx(W, {}),
                " ",
                t("Delete for good")
              ]
            }
          ),
          c && !c.trashed && (N.create || N.delete && !G.readOnly || J && h !== null) && /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "icon", "aria-label": t("More actions"), children: /* @__PURE__ */ e.jsx(et, {}) }) }),
            /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", className: "cms:min-w-52", children: [
              J && h !== null && /* @__PURE__ */ e.jsxs(
                a.DropdownMenuItem,
                {
                  disabled: I.processing || I.isDirty,
                  title: I.isDirty ? void 0 : t("Fill in what isn't translated yet, into the draft"),
                  onSelect: () => v.router.post(B(`cms/entries/${c.id}/translations/${c.locale}/translate`), { version: c.version }, { preserveScroll: !0 }),
                  children: [
                    /* @__PURE__ */ e.jsx(ds, {}),
                    " ",
                    I.isDirty ? t("Save to translate") : t("Translate from :language", { language: n.find((M) => M.main)?.name ?? (Y ? P(Y) : t("the main language")) })
                  ]
                }
              ),
              N.create && /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { title: t("Copy every language as a new draft"), onSelect: () => v.router.post(`${T}/duplicate`), children: [
                /* @__PURE__ */ e.jsx(Ys, {}),
                " ",
                t("Duplicate")
              ] }),
              N.delete && !G.readOnly && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
                /* @__PURE__ */ e.jsxs(
                  a.DropdownMenuItem,
                  {
                    className: "cms:text-destructive",
                    onSelect: () => k(t('Move ":title" to the trash? It comes off the site; you can restore it.', { title: d.title }) + vs(p), () => v.router.delete(T), t("Move to trash")),
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
          c && J && b && /* @__PURE__ */ e.jsxs("span", { title: t("Machine translation isn't set up on this site: ask your developer (SUNRICE_TRANSLATE_DRIVER, see Help → Developer docs → Machine translation)."), children: [
            /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", disabled: !0, "aria-describedby": "machine-translate-missing", children: [
              /* @__PURE__ */ e.jsx(ds, {}),
              " ",
              t("Translate from :language", { language: n.find((M) => M.main)?.name ?? (Y ? P(Y) : t("the main language")) })
            ] }),
            /* @__PURE__ */ e.jsx("span", { id: "machine-translate-missing", className: "cms:sr-only", children: t("Machine translation isn't set up on this site: ask your developer.") })
          ] }),
          J && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", variant: c ? "outline" : "default", disabled: I.processing, children: [
            I.processing && /* @__PURE__ */ e.jsx(ae, { className: "cms:animate-spin" }),
            t(c ? "Save draft" : "Create draft")
          ] }),
          c && !c.trashed && J && !N.publish && (c.status === "draft" || c.hasUnpublishedChanges || I.isDirty) && /* @__PURE__ */ e.jsxs(
            a.Button,
            {
              type: "button",
              disabled: I.processing,
              onClick: ja,
              title: c.review ? t("Already sent; sending again tells them again") : t("Ask those who can publish to review it"),
              children: [
                /* @__PURE__ */ e.jsx(el, {}),
                " ",
                c.review ? t("Send for review again") : t("Submit for review")
              ]
            }
          ),
          c && !c.trashed && N.publish && !G.readOnly && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex", children: [
            V && j ? /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", className: "cms:rounded-r-none", disabled: I.processing, title: t("Change the date"), onClick: () => F(!0), children: [
              /* @__PURE__ */ e.jsx(Ge, {}),
              " ",
              t("Scheduled for :date", { date: K(c.publishedAt) })
            ] }) : /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: j ? "outline" : "default", className: "cms:rounded-r-none cms:disabled:opacity-100", disabled: I.processing || j, onClick: () => ke(), children: [
              j && /* @__PURE__ */ e.jsx(Se, { className: "cms:text-emerald-600 cms:dark:text-emerald-400" }),
              c.status === "draft" ? t("Publish") : t(j ? "Published" : "Publish changes")
            ] }),
            /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
              /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "icon", variant: j ? "outline" : "default", className: j ? "cms:-ml-px cms:rounded-l-none" : "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": t("More publishing options"), children: /* @__PURE__ */ e.jsx(Os, {}) }) }),
              /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", children: [
                /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { onSelect: () => F(!0), children: [
                  /* @__PURE__ */ e.jsx(Ge, {}),
                  " ",
                  t(V ? "Change the date…" : "Publish on a date…")
                ] }),
                V && /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => ke((/* @__PURE__ */ new Date()).toISOString()), children: t("Publish now") }),
                c.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
                  /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => v.router.post(`${T}/unpublish`, ee, { preserveScroll: !0 }), children: t(V ? "Unschedule (back to draft)" : "Unpublish") })
                ] })
              ] })
            ] })
          ] })
        ] }),
        children: [
          c && /* @__PURE__ */ e.jsx(a.Badge, { variant: c.status === "published" ? "success" : "secondary", children: c.trashed ? t("In the trash") : te(c.status) }),
          c?.review && !c.trashed && /* @__PURE__ */ e.jsx(a.Badge, { variant: "warning", title: c.review.by ? t(":name sent it on :date", { name: c.review.by, date: K(c.review.requestedAt) }) : t("Sent on :date", { date: K(c.review.requestedAt) }), children: t("Waiting for review") }),
          I.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
        ]
      }
    ),
    c && n.length > 1 && /* @__PURE__ */ e.jsx(
      Gl,
      {
        entryUrl: T,
        editUrl: `${f}/${c.id}/edit`,
        current: c.locale,
        locales: n,
        canAdd: (N.create || N.translate === !0) && !c.trashed,
        canRemove: N.delete && !c.isMain && !c.trashed,
        onRemove: () => k(
          t('Remove the :language translation of ":title"? Its revisions go with it.', { language: P(c.locale), title: d.title }),
          () => v.router.delete(`${T}/translations/${c.locale}`)
        )
      }
    ),
    /* @__PURE__ */ e.jsx(a.ViewingNotice, { by: G.viewingBy, onTakeOver: G.requestTakeOver }),
    /* @__PURE__ */ e.jsx(a.KeptEditsNotice, { kept: G.kept, disabled: !J, onLoad: (M) => {
      fa(M);
    }, onDiscard: (M) => {
      G.discardKept(M);
    } }),
    q.version && /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: [
      /* @__PURE__ */ e.jsx("span", { children: q.version }),
      /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => v.router.reload(), children: t("Load theirs") }),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            type: "button",
            variant: "destructive",
            size: "sm",
            disabled: I.processing,
            onClick: () => k(t("Save your version over theirs? Their changes are replaced (their earlier published versions stay in the revisions)."), ga),
            children: t("Save mine anyway")
          }
        )
      ] })
    ] }),
    (q.entry || q.published_at || oe.published_at || oe.homepage) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: q.entry ?? q.published_at ?? oe.published_at ?? oe.homepage }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_18rem]", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsx(a.CardContent, { children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: !J, className: "cms:grid cms:gap-4 cms:md:grid-cols-[2fr_1fr]", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "title", children: t("Title") }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "title",
                value: I.data.title,
                "aria-invalid": q.title !== void 0,
                onChange: (M) => {
                  const U = M.target.value;
                  I.setData((Q) => ({ ...Q, title: U, slug: ka(Q.slug, Q.title, U, c !== null && c.publishedAt === null && c.status === "draft") })), xe("title");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(E, { message: q.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "slug", children: t("Slug") }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "slug",
                className: "cms:font-mono",
                value: I.data.slug,
                placeholder: t("Made from the title"),
                "aria-invalid": q.slug !== void 0,
                onChange: (M) => {
                  I.setData("slug", M.target.value), xe("slug");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(da, { note: Ds(c?.publishedSlug, I.data.slug, c !== null && c.status !== "draft"), redirectsUrl: C }),
            /* @__PURE__ */ e.jsx(E, { message: q.slug })
          ] })
        ] }) }) }),
        /* @__PURE__ */ e.jsx(Kt.Provider, { value: Array.isArray(o) || !o ? {} : o, children: /* @__PURE__ */ e.jsx(
          ls,
          {
            disabled: !J,
            fields: l,
            values: I.data.data,
            errors: q,
            storageKey: `cms:entry:${s.handle}`,
            shared: r,
            sharedValues: i,
            sharedNote: Y ? t("Shared by all languages: the greyed-out fields are edited in :language.", { language: P(Y) }) : t("Shared by all languages: the greyed-out fields are edited in the main language."),
            onChange: (M, U) => {
              I.setData("data", { ...I.data.data, [M]: U }), xe(`data.${M}`);
            }
          }
        ) }),
        /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: t("SEO"), description: t("How this entry appears in search results and shared links."), titleClassName: "cms:text-base", storageKey: "cms:entry:seo", hasErrors: Ne(q, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !J, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(
          he,
          {
            bare: !0,
            id: "seo",
            fields: ns(),
            value: I.data.seo,
            errors: X(q, "seo"),
            onChange: (M) => {
              I.setData("seo", M), xe("seo");
            }
          }
        ) }) })
      ] }),
      !c && s.hierarchical && /* @__PURE__ */ e.jsx("aside", { className: "cms:flex cms:flex-col cms:gap-4", children: /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: "Page settings", titleClassName: "cms:text-base", storageKey: "cms:entry:page-settings", hasErrors: q.parent_id !== void 0, children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !J, className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: /* @__PURE__ */ e.jsx(ma, { collection: s, value: I.data.parent_id, error: q.parent_id, onChange: (M) => ie({ parent_id: M }) }) }) }) }),
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
            N.publish ? ` ${t("Publishing it answers the request.")}` : ""
          ] }),
          c.review && !c.trashed && (c.review.mine || N.publish && !G.readOnly) && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: [
            N.publish && !G.readOnly && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", disabled: I.processing, onClick: () => le(!0), children: [
              /* @__PURE__ */ e.jsx(Ce, {}),
              " ",
              t("Send back…")
            ] }),
            c.review.mine && /* @__PURE__ */ e.jsx(
              a.Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                disabled: I.processing,
                title: t("Take the request back, to keep working on it"),
                onClick: () => v.router.post(`${T}/review/withdraw`, ee, { preserveScroll: !0 }),
                children: t("Withdraw the request")
              }
            )
          ] }),
          !c.trashed && N.publish && !G.readOnly && /* @__PURE__ */ e.jsx(
            Yl,
            {
              status: c.status,
              publishedAt: c.publishedAt,
              processing: I.processing,
              onPublish: (M) => ke(M),
              onUnpublish: () => v.router.post(`${T}/unpublish`, ee, { preserveScroll: !0 })
            },
            c.publishedAt ?? "none"
          ),
          c.status !== "draft" && c.hasUnpublishedChanges && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("The draft has changes the site doesn't show yet.") }),
          g?.is && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("This is the site's homepage.") }),
          g && !g.is && g.can && c.status === "published" && !c.trashed && /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "cms:mt-1 cms:self-start",
              onClick: () => k(
                (g.current ? t('Make ":title" the homepage? Visitors to / will see it instead of ":current".', { title: d.title, current: g.current }) : t('Make ":title" the homepage? Visitors to / will see it.', { title: d.title })) + " " + t("Its own address will lead to / as well."),
                () => v.router.post(`${T}/homepage`, {}, { preserveScroll: !0 }),
                t("Make this the homepage")
              ),
              children: t("Make this the homepage")
            }
          ),
          n.find((M) => M.code === c.locale)?.outdated && /* @__PURE__ */ e.jsx("p", { className: "cms:text-amber-700 cms:dark:text-amber-400", children: Y ? t("The :language version changed since this translation was last saved.", { language: P(Y) }) : t("The main version changed since this translation was last saved.") })
        ] }),
        /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: t("Used by"), titleClassName: "cms:text-base", storageKey: "cms:entry:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          p.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("No other content links here.") }),
          p.map((M) => /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
            M.url ? /* @__PURE__ */ e.jsx("a", { href: M.url, className: "cms:block cms:truncate cms:underline-offset-4 cms:hover:underline", children: M.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:truncate", children: M.label }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", title: M.field, children: M.fieldLabel ?? M.field })
          ] }, `${M.label}:${M.field}`))
        ] }),
        y && /* @__PURE__ */ e.jsx(
          Zl,
          {
            entryUrl: T,
            collection: s,
            settings: y,
            templates: D,
            blueprints: _,
            disabled: !J,
            values: I.data,
            errors: q,
            onChange: ie,
            draftDirty: I.isDirty
          }
        ),
        m !== null && s.comments && /* @__PURE__ */ e.jsx(Ul, { entryId: c.id, comments: m }),
        /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: t("Revisions"), titleClassName: "cms:text-base", storageKey: "cms:entry:revisions", contentClassName: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
          u !== null && N.update && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => v.router.post(B(`cms/entries/${c.id}/translations/${c.locale}/undo-restore`), {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(Ce, {}),
            " ",
            t("Undo the restore")
          ] }),
          /* @__PURE__ */ e.jsx(v.Deferred, { data: "revisions", fallback: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-8" }),
            /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-8" })
          ] }), children: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            (x ?? []).length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("Each publish keeps one.") }),
            (x ?? []).map((M) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1 cms:border-b cms:border-border/60 cms:pb-2 cms:last:border-b-0 cms:last:pb-0", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
                /* @__PURE__ */ e.jsx("div", { className: "cms:truncate", children: M.title }),
                /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
                  K(M.createdAt),
                  M.author ? ` · ${M.author}` : ""
                ] }),
                /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: M.changed === null ? t("First kept version") : M.changed.length === 0 ? t("No field changed") : t("Changed: :fields", { fields: M.changed.join(", ") }) })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-1", children: [
                /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => H(M), children: t("Compare") }),
                N.update && !c.trashed && /* @__PURE__ */ e.jsx(
                  a.Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    onClick: () => v.router.post(B(`cms/entries/${c.id}/revisions/${M.id}/restore`), {}, { preserveScroll: !0 }),
                    children: t("Restore")
                  }
                )
              ] })
            ] }, M.id))
          ] }) })
        ] })
      ] })
    ] }),
    c?.review && /* @__PURE__ */ e.jsx(
      Wl,
      {
        open: R,
        onClose: () => le(!1),
        by: c.review.by,
        onSend: (M, U) => v.router.post(`${T}/review/send-back`, { ...ee, note: M }, { preserveScroll: !0, onSuccess: () => {
          le(!1), U();
        }, onError: U })
      }
    ),
    /* @__PURE__ */ e.jsx(Ql, { entryId: c?.id ?? 0, revision: S, onClose: () => H(null), dirty: I.isDirty }),
    /* @__PURE__ */ e.jsx(
      Jl,
      {
        open: $,
        onClose: () => F(!1),
        processing: I.processing,
        rescheduling: V,
        current: c?.publishedAt ?? null,
        onSchedule: (M) => ke(M)
      }
    )
  ] });
}
function Wl({ open: s, onClose: l, by: n, onSend: r }) {
  const [i, c] = z.useState(""), [d, x] = z.useState(!1), m = v.usePage().props.errors ?? {};
  return z.useEffect(() => {
    s && c("");
  }, [s]), /* @__PURE__ */ e.jsx(a.Dialog, { open: s, onOpenChange: (o) => !o && !d && l(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: t("Send back without publishing") }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: n ? t(":name gets an email with your note, and the request is cleared. The draft stays as it is.", { name: n }) : t("The one who asked gets an email with your note, and the request is cleared. The draft stays as it is.") })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "send-back-note", children: t("Note (optional)") }),
      /* @__PURE__ */ e.jsx(
        a.Textarea,
        {
          id: "send-back-note",
          rows: 4,
          maxLength: 2e3,
          value: i,
          placeholder: t("What to change before it can go live"),
          "aria-invalid": m.note !== void 0,
          onChange: (o) => c(o.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(E, { message: m.note })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", disabled: d, onClick: l, children: t("Cancel") }),
      /* @__PURE__ */ e.jsxs(a.Button, { type: "button", disabled: d, onClick: () => {
        x(!0), r(i, () => x(!1));
      }, children: [
        d && /* @__PURE__ */ e.jsx(ae, { className: "cms:animate-spin" }),
        " ",
        t("Send back")
      ] })
    ] })
  ] }) });
}
function Gl({ entryUrl: s, editUrl: l, current: n, locales: r, canAdd: i, canRemove: c, onRemove: d }) {
  const x = r.filter((o) => o.status !== null), m = r.filter((o) => o.status === null);
  return /* @__PURE__ */ e.jsxs("nav", { "aria-label": t("Languages"), className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("div", { className: "cms:inline-flex cms:items-center cms:gap-0.5 cms:rounded-md cms:bg-muted cms:p-0.5", children: x.map((o) => {
      const p = o.code === n, u = o.main ? t(":language (main)", { language: o.name ?? P(o.code) }) : o.name ?? P(o.code), h = o.status ? te(o.status) : "", b = o.outdated ? t(":language: :status, outdated (the main language changed since)", { language: u, status: h }) : t(":language: :status", { language: u, status: h });
      return /* @__PURE__ */ e.jsxs(
        "button",
        {
          type: "button",
          title: b,
          "aria-label": b,
          "aria-current": p ? "page" : void 0,
          onClick: () => !p && v.router.get(l, { locale: o.code }),
          className: `cms:relative cms:inline-flex cms:h-7 cms:min-w-10 cms:items-center cms:justify-center cms:gap-1.5 cms:rounded cms:px-2.5 cms:text-xs cms:font-semibold cms:tracking-wide cms:uppercase cms:transition-colors ${p ? "cms:bg-card cms:text-foreground cms:shadow-xs" : "cms:text-muted-foreground cms:hover:text-foreground"}`,
          children: [
            o.code,
            (o.outdated || o.status === "published") && /* @__PURE__ */ e.jsx("span", { "aria-hidden": !0, className: `cms:size-1.5 cms:rounded-full ${o.outdated ? "cms:bg-amber-500" : "cms:bg-emerald-500"}` })
          ]
        },
        o.code
      );
    }) }),
    i && m.map((o) => /* @__PURE__ */ e.jsxs(
      a.Button,
      {
        type: "button",
        variant: "outline",
        size: "sm",
        className: "cms:h-8 cms:border-dashed cms:text-xs cms:uppercase",
        title: t("Add :language", { language: o.name ?? P(o.code) }),
        onClick: () => v.router.post(`${s}/translations`, { locale: o.code }),
        children: [
          /* @__PURE__ */ e.jsx(Z, {}),
          " ",
          o.code
        ]
      },
      o.code
    )),
    c && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:ml-auto cms:text-destructive", onClick: d, children: t("Remove this language") })
  ] });
}
function Yl({ status: s, publishedAt: l, processing: n, onPublish: r, onUnpublish: i }) {
  const [c, d] = z.useState(l ? $s(new Date(l)) : ""), x = c === "" ? null : new Date(c), m = x !== null && x.getTime() > Date.now(), o = (h) => h === null ? null : Math.floor(h.getTime() / 6e4), p = o(x) !== o(l ? new Date(l) : null), u = t(s === "draft" ? m ? "Schedule" : "Publish" : m ? s === "scheduled" ? "Reschedule" : "Schedule" : "Change date");
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:border-t cms:border-border/60 cms:pt-3", children: [
    /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "entry-published-at", children: t("Publish date") }),
    /* @__PURE__ */ e.jsx(a.DatePicker, { id: "entry-published-at", withTime: !0, className: "cms:max-w-none", value: c || null, onChange: (h) => d(h ?? "") }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t(s === "draft" ? "Empty: now. A date in the future schedules it." : "The date shown as published. A date in the future takes it off the site until then.") }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: [
      (s === "draft" || p) && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", size: "sm", disabled: n, onClick: () => r(x?.toISOString() ?? null), children: [
        /* @__PURE__ */ e.jsx(Ge, {}),
        " ",
        u
      ] }),
      s !== "draft" && /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "sm", variant: "outline", disabled: n, onClick: i, children: t("Unpublish") })
    ] })
  ] });
}
function Jl({ open: s, onClose: l, onSchedule: n, current: r, processing: i, rescheduling: c }) {
  const [d, x] = z.useState("");
  z.useEffect(() => {
    s && x($s(ya(r)));
  }, [s, r]);
  const m = d === "" ? null : new Date(d), o = m !== null && m.getTime() <= Date.now();
  return /* @__PURE__ */ e.jsx(a.Dialog, { open: s, onOpenChange: (p) => !p && l(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: t(c ? "Change the publish date" : "Publish on a date") }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: t("The entry goes live then.") })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "published-at", children: t("Date and time") }),
      /* @__PURE__ */ e.jsx(a.DatePicker, { id: "published-at", withTime: !0, required: !0, className: "cms:max-w-none", value: d || null, onChange: (p) => x(p ?? "") }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("In your time zone.") }),
      o && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-amber-700 cms:dark:text-amber-400", children: t("This date has passed: the entry goes live now, dated :date.", { date: K(m.toISOString()) }) })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: l, children: t("Cancel") }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", disabled: m === null || i, onClick: () => m && n(m.toISOString()), children: t(o ? "Publish now, back-dated" : c ? "Change the date" : "Schedule") })
    ] })
  ] }) });
}
function Ql({ entryId: s, revision: l, onClose: n, dirty: r }) {
  const [i, c] = z.useState(null), [d, x] = z.useState(!1);
  return z.useEffect(() => {
    if (c(null), x(!1), !l) return;
    let m = !0;
    return fetch(B(`cms/entries/${s}/revisions/${l.id}/compare`), { headers: { Accept: "application/json" }, credentials: "same-origin" }).then((o) => o.ok ? o.json() : Promise.reject(new Error(String(o.status)))).then((o) => {
      m && c(o.fields);
    }).catch(() => {
      m && x(!0);
    }), () => {
      m = !1;
    };
  }, [l, s]), /* @__PURE__ */ e.jsx(a.Dialog, { open: l !== null, onOpenChange: (m) => !m && n(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto cms:sm:max-w-2xl", children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: t("Compare with the draft") }),
      /* @__PURE__ */ e.jsxs(a.DialogDescription, { children: [
        l ? l.author ? t("The version published :date by :name, beside the saved draft.", { date: K(l.createdAt), name: l.author }) : t("The version published :date, beside the saved draft.", { date: K(l.createdAt) }) : "",
        r ? ` ${t("Your unsaved changes aren't included.")}` : ""
      ] })
    ] }),
    d && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t("The comparison could not be loaded. Try again.") }),
    !d && i === null && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-12" }),
      /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-12" })
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
    /* @__PURE__ */ e.jsx(a.DialogFooter, { children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: n, children: t("Close") }) })
  ] }) });
}
function ma({ collection: s, value: l, error: n, onChange: r }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "parent", children: t("Parent") }),
    /* @__PURE__ */ e.jsx(
      Te,
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
    /* @__PURE__ */ e.jsx(E, { message: n })
  ] });
}
function Zl({ entryUrl: s, collection: l, settings: n, templates: r, blueprints: i, disabled: c, values: d, errors: x, onChange: m, draftDirty: o }) {
  const p = i.length > 1 ? n.blueprint ?? i[0].handle : void 0, u = v.useForm({ blueprint: p ?? "" }), h = u.errors.blueprint, b = ["parent_id", "template", "comments_closed"].some((y) => x[y] !== void 0) || h !== void 0;
  return /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: t("Page settings"), titleClassName: "cms:text-base", storageKey: "cms:entry:page-settings", hasErrors: b, children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: c, className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: [
    l.hierarchical && /* @__PURE__ */ e.jsx(ma, { collection: l, value: d.parent_id, error: x.parent_id, onChange: (y) => m({ parent_id: y }) }),
    i.length > 1 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "blueprint", children: t("Blueprint") }),
      /* @__PURE__ */ e.jsxs(a.Select, { value: u.data.blueprint, onValueChange: (y) => u.setData("blueprint", y), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: "blueprint", "aria-invalid": h !== void 0, children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(a.SelectContent, { children: i.map((y) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: y.handle, children: y.title }, y.handle)) })
      ] }),
      u.data.blueprint !== p && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("The fields change in every language; values of fields both blueprints have are kept. The editor reloads.") }),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            type: "button",
            size: "sm",
            disabled: u.processing || o,
            title: o ? t("Save your draft first") : void 0,
            onClick: () => u.put(`${s}/settings`, { preserveScroll: !0 }),
            children: t("Change blueprint")
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(E, { message: h })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "template", children: t("Template") }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: "template",
          className: "cms:font-mono",
          placeholder: `cms.${l.handle}-landing`,
          value: d.template,
          onChange: (y) => m({ template: y.target.value }),
          "aria-invalid": x.template !== void 0
        }
      ),
      /* @__PURE__ */ e.jsx(ia, { example: `cms.${l.handle}-landing`, empty: t("Leave empty to use the collection's template."), value: d.template, lookup: r }),
      /* @__PURE__ */ e.jsx(E, { message: x.template })
    ] }),
    l.comments && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(a.Switch, { id: "comments-open", checked: !d.comments_closed, onCheckedChange: (y) => m({ comments_closed: !y }) }),
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "comments-open", children: t("Accept new comments") }),
      /* @__PURE__ */ e.jsx("a", { href: B(`cms/comments?entry=${s.split("/").slice(-1)[0]}`), className: "cms:ml-auto cms:text-muted-foreground cms:underline-offset-4 hover:cms:underline", children: t("Comments") })
    ] })
  ] }) });
}
function Je(s, l) {
  const n = s[l]?.depth ?? 0;
  let r = l + 1;
  for (; r < s.length && s[r].depth > n; ) r++;
  return r;
}
function ne(s, l) {
  const n = l < 0 ? 0 : l + 1, r = l < 0 ? s.length : Je(s, l), i = l < 0 ? 0 : (s[l]?.depth ?? 0) + 1, c = [];
  for (let d = n; d < r; d++)
    s[d].depth === i && c.push(d);
  return c;
}
function cs(s, l, n) {
  const r = ne(s, l);
  if (n.length !== r.length || [...n].sort((x, m) => x - m).some((x, m) => x !== r[m]) || r.length === 0) return s.slice();
  const i = r[0], c = Je(s, r[r.length - 1]), d = n.flatMap((x) => s.slice(x, Je(s, x)));
  return [...s.slice(0, i), ...d, ...s.slice(c)];
}
function Xl(s, l) {
  const n = new Set(s.map((x) => x.id)), r = /* @__PURE__ */ new Map();
  for (const x of s) {
    const m = l(x), o = m != null && n.has(m) ? m : null;
    r.set(o, [...r.get(o) ?? [], x]);
  }
  const i = [], c = /* @__PURE__ */ new Set(), d = (x, m) => {
    for (const o of r.get(x) ?? [])
      c.has(o.id) || (c.add(o.id), i.push({ ...o, depth: m }), d(o.id, m + 1));
  };
  d(null, 0);
  for (const x of s)
    c.has(x.id) || (c.add(x.id), i.push({ ...x, depth: 0 }), d(x.id, 1));
  return i;
}
function en({ collection: s, rows: l, hierarchical: n = !1 }) {
  const r = z.useCallback(
    (m) => Xl(m, (o) => n ? o.parentId : null),
    [n]
  ), [i, c] = z.useState(() => r(l));
  z.useEffect(() => c(r(l)), [l, r]);
  const d = (m, o) => {
    const p = cs(i, m, o), u = ne(p, m).map((h) => p[h].id);
    c(p), v.router.post(
      B("cms/entries/reorder"),
      { collection: s, ids: u, parent_id: m < 0 ? null : i[m]?.id ?? null },
      { preserveScroll: !0, preserveState: !0, onError: () => c(r(l)) }
    );
  }, x = (m) => /* @__PURE__ */ e.jsx(
    a.SortableList,
    {
      items: ne(i, m),
      getId: (o) => i[o].id,
      getLabel: (o) => i[o].title,
      onReorder: (o) => d(m, o),
      className: m < 0 ? "cms:gap-1" : "cms:mt-1 cms:gap-1 cms:pl-6",
      children: (o, { handle: p }) => {
        const u = i[o];
        return /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-lg cms:border cms:border-border/70 cms:bg-card cms:p-2 cms:text-sm", children: [
            /* @__PURE__ */ e.jsx(a.SortableHandle, { ...p, label: t("Move :title", { title: u.title }) }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium", children: u.title }),
            /* @__PURE__ */ e.jsx(a.Badge, { variant: u.status === "published" ? "success" : "secondary", children: te(u.status) })
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
function sn(s, l, n) {
  const r = { ...s, ...l }, i = Object.fromEntries(Object.entries(r.terms).filter(([, d]) => d !== "")), c = {};
  return r.search && (c.search = r.search), r.status && (c.status = r.status), r.author && (c.author = r.author), Object.keys(i).length > 0 && (c.terms = i), r.locale && r.locale !== n && (c.locale = r.locale), r.sort && (c.sort = r.sort), c.per_page = r.perPage, c;
}
function tn(s) {
  const l = new URLSearchParams();
  for (const [n, r] of Object.entries(s))
    if (typeof r == "object")
      for (const [i, c] of Object.entries(r)) l.set(`${n}[${i}]`, c);
    else
      l.set(n, String(r));
  return l.toString();
}
function an(s, l) {
  return s === l ? `-${l}` : s === `-${l}` ? "" : l;
}
function ln(s, l) {
  return s === l ? "asc" : s === `-${l}` ? "desc" : null;
}
function ys(s) {
  return [s.search, s.status, s.author, ...Object.values(s.terms)].filter((l) => l !== "").length;
}
const Oe = "__all", nn = () => [
  { value: "draft", label: t("Drafts") },
  { value: "published", label: t("Published") },
  { value: "scheduled", label: t("Scheduled") },
  { value: "trashed", label: t("Trash") }
];
function cn(s) {
  const { collection: l, entries: n, query: r } = s;
  return a.useBreadcrumbs([{ label: l ? l.title : t("Entries") }]), !l || !n || !r ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(v.Head, { title: t("Entries") }),
    /* @__PURE__ */ e.jsx(a.PageHeader, { title: t("Entries"), description: t("There are no collections yet. Create one under Structure → Collections, then come back to write its entries.") })
  ] }) : /* @__PURE__ */ e.jsx(rn, { ...s, collection: l, entries: n, query: r });
}
function rn({
  collection: s,
  collections: l,
  entries: n,
  query: r,
  columns: i = [],
  filters: c = { authors: [], taxonomies: [], locales: [] },
  links: d = [],
  manualOrder: x = !1,
  perPageOptions: m = [10, 25, 50, 100],
  preferencesKey: o,
  can: p
}) {
  const u = B(`cms/collections/${s.handle}/entries`), h = c.locales[0] ?? r.locale, [b, y] = z.useState(r.search), [_, g] = z.useState([]), [C, D] = z.useState(!1), [N, f] = re(), { setColumns: T, setPerPage: A } = a.useTablePreferences(o ?? `table.cms.entries.${s.handle}`, { columns: r.columns, perPage: r.perPage });
  z.useEffect(() => g([]), [n]);
  const k = r.status === "trashed", w = ys(r) > 0, $ = i.filter((j) => r.columns.includes(j.key)), F = (j = {}) => sn(r, j, h), S = (j) => v.router.get(u, F(j), { preserveState: !0, preserveScroll: !0, replace: !0 });
  z.useEffect(() => {
    if (b === r.search) return;
    const j = window.setTimeout(() => S({ search: b }), 300);
    return () => window.clearTimeout(j);
  }, [b]);
  const H = k ? p?.delete ? [{ action: "restore", label: t("Restore") }, { action: "delete", label: t("Delete for good"), danger: !0 }] : [] : [
    ...p?.publish ? [{ action: "publish", label: t("Publish") }, { action: "unpublish", label: t("Unpublish") }] : [],
    ...p?.delete ? [{ action: "trash", label: t("Move to the trash"), danger: !0 }] : []
  ], R = (j, O, V = !1) => {
    const de = () => v.router.post(`${u}/bulk`, { action: j, ids: _ }, { preserveScroll: !0 });
    if (V) {
      const fe = _.length === 1 ? t(":action: 1 entry?", { action: O }) : t(":action: :count entries?", { action: O, count: _.length });
      N(
        `${fe} ${t(j === "delete" ? "This can't be undone." : "They come off the site; you can restore them.")}`,
        de,
        t(j === "trash" ? "Move to trash" : "Delete")
      );
    } else
      de();
  }, le = async (j) => {
    const O = new Set(r.columns);
    O.has(j) ? O.delete(j) : O.add(j), await T(i.map((V) => V.key).filter((V) => O.has(V))), v.router.reload({ only: ["entries", "query"] });
  }, I = () => {
    y(""), S({ search: "", status: "", author: "", terms: {} });
  }, ie = x && !!p?.update, ee = ie && n !== null && n.lastPage <= 1 && n.data.length > 1, Y = k && !!p?.delete, q = 1 + $.length + (H.length > 0 ? 1 : 0) + (ie ? 1 : 0) + (Y ? 1 : 0), oe = tn(F()), xe = [...new Set(d.map((j) => j.group))];
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(v.Head, { title: s.title }),
    f,
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: s.title,
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          d.length > 0 && /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(a.Button, { variant: "outline", children: [
              /* @__PURE__ */ e.jsx(Ha, {}),
              " ",
              t("Go to")
            ] }) }),
            /* @__PURE__ */ e.jsx(a.DropdownMenuContent, { align: "end", className: "cms:min-w-56", children: xe.map((j, O) => /* @__PURE__ */ e.jsxs(z.Fragment, { children: [
              O > 0 && /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
              /* @__PURE__ */ e.jsx(a.DropdownMenuLabel, { children: j }),
              d.filter((V) => V.group === j).map((V) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { asChild: !0, children: V.external ? /* @__PURE__ */ e.jsxs("a", { href: V.href, target: "_blank", rel: "noopener noreferrer", children: [
                V.label,
                " ",
                /* @__PURE__ */ e.jsx(ge, { className: "cms:ml-auto" })
              ] }) : /* @__PURE__ */ e.jsx(v.Link, { href: V.href, children: V.label }) }, V.href))
            ] }, j)) })
          ] }),
          s.listing && !k && /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs(v.Link, { href: B(`cms/collections/${s.handle}/listing/edit`), children: [
            /* @__PURE__ */ e.jsx(Ka, {}),
            " ",
            t("Listing page")
          ] }) }),
          n.total > 0 && p?.export && /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: `${u}/export${oe ? `?${oe}` : ""}`, children: [
            /* @__PURE__ */ e.jsx(Qs, {}),
            " ",
            t("Export CSV")
          ] }) }),
          p?.create && !k && /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(v.Link, { href: `${u}/create`, children: [
            /* @__PURE__ */ e.jsx(Z, {}),
            " ",
            t("New entry")
          ] }) })
        ] }),
        children: l.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: s.handle, onValueChange: (j) => v.router.get(B(`cms/collections/${j}/entries`)), children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": t("Collection"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: l.map((j) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: j.handle, children: j.title }, j.handle)) })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-xs", children: [
        /* @__PURE__ */ e.jsx(ye, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            className: "cms:pl-9",
            placeholder: t("Search titles, slugs or #id"),
            "aria-label": t("Search entries"),
            value: b,
            onChange: (j) => y(j.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(Ve, { label: t("Status"), value: r.status, options: nn(), onChange: (j) => S({ status: j }) }),
      c.authors.length > 0 && /* @__PURE__ */ e.jsx(Ve, { label: t("Author"), value: r.author, options: c.authors, onChange: (j) => S({ author: j }) }),
      c.taxonomies.filter((j) => j.terms.length > 0).map((j) => /* @__PURE__ */ e.jsx(
        Ve,
        {
          label: j.title,
          value: r.terms[j.handle] ?? "",
          options: j.terms.map((O) => ({ value: O.value, label: `${"— ".repeat(O.depth)}${O.label}` })),
          onChange: (O) => S({ terms: { ...r.terms, [j.handle]: O } })
        },
        j.handle
      )),
      c.locales.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: r.locale, onValueChange: (j) => S({ locale: j }), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-auto cms:min-w-40 cms:max-w-72", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(a.SelectContent, { children: c.locales.map((j) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: j, children: [
          P(j),
          j === h ? ` ${t("(main)")}` : ""
        ] }, j)) })
      ] }),
      w && /* @__PURE__ */ e.jsxs(a.Button, { variant: "ghost", size: "sm", onClick: I, children: [
        /* @__PURE__ */ e.jsx(_e, {}),
        " ",
        t("Clear")
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:ml-auto cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
        _.length > 0 && H.length > 0 && /* @__PURE__ */ e.jsxs("div", { role: "toolbar", "aria-label": t("Selected entries"), className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t(":count selected", { count: _.length }) }),
          H.map((j) => /* @__PURE__ */ e.jsx(a.Button, { size: "sm", variant: j.danger ? "destructive" : "outline", onClick: () => R(j.action, j.label, j.danger), children: j.label }, j.action))
        ] }),
        ee && /* @__PURE__ */ e.jsxs(a.Button, { variant: C ? "secondary" : "outline", "aria-pressed": C, onClick: () => D(!C), children: [
          /* @__PURE__ */ e.jsx(Bs, {}),
          " ",
          t(C ? "Done" : "Reorder")
        ] }),
        i.length > 0 && /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
          /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(a.Button, { variant: "outline", children: [
            /* @__PURE__ */ e.jsx(Ea, {}),
            " ",
            t("Columns")
          ] }) }),
          /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", className: "cms:max-h-96 cms:overflow-y-auto", children: [
            /* @__PURE__ */ e.jsx(a.DropdownMenuLabel, { children: t("Columns") }),
            i.filter((j) => !j.field).map((j) => /* @__PURE__ */ e.jsx(
              a.DropdownMenuCheckboxItem,
              {
                checked: r.columns.includes(j.key),
                onSelect: (O) => O.preventDefault(),
                onCheckedChange: () => {
                  le(j.key);
                },
                children: j.label
              },
              j.key
            )),
            i.some((j) => j.field) && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
              /* @__PURE__ */ e.jsx(a.DropdownMenuLabel, { children: t("Fields") }),
              i.filter((j) => j.field).map((j) => /* @__PURE__ */ e.jsx(
                a.DropdownMenuCheckboxItem,
                {
                  checked: r.columns.includes(j.key),
                  onSelect: (O) => O.preventDefault(),
                  onCheckedChange: () => {
                    le(j.key);
                  },
                  children: j.label
                },
                j.key
              ))
            ] })
          ] })
        ] })
      ] })
    ] }),
    C && ee ? /* @__PURE__ */ e.jsx(en, { collection: s.handle, rows: n.data, hierarchical: s.hierarchical === !0 }) : /* @__PURE__ */ e.jsxs(a.Card, { className: "cms:gap-0 cms:overflow-hidden cms:py-0", children: [
      /* @__PURE__ */ e.jsxs(a.Table, { children: [
        /* @__PURE__ */ e.jsx(a.TableHeader, { className: "cms:bg-muted/60", children: /* @__PURE__ */ e.jsxs(a.TableRow, { className: "cms:hover:bg-transparent", children: [
          H.length > 0 && /* @__PURE__ */ e.jsx(a.TableHead, { className: "cms:w-10", children: /* @__PURE__ */ e.jsx(
            a.Checkbox,
            {
              "aria-label": t("Select all on this page"),
              checked: n.data.length > 0 && _.length === n.data.length,
              onCheckedChange: (j) => g(j ? n.data.map((O) => O.id) : [])
            }
          ) }),
          /* @__PURE__ */ e.jsx(Ns, { label: t("Title"), sortKey: "title", sort: r.sort, onSort: (j) => S({ sort: j }) }),
          $.map((j) => j.sortable ? /* @__PURE__ */ e.jsx(Ns, { label: j.label, sortKey: j.key, sort: r.sort, onSort: (O) => S({ sort: O }) }, j.key) : /* @__PURE__ */ e.jsx(a.TableHead, { children: j.label }, j.key)),
          ie && /* @__PURE__ */ e.jsx(a.TableHead, { className: "cms:w-px", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: t("Order") }) }),
          Y && /* @__PURE__ */ e.jsx(a.TableHead, { className: "cms:w-px", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: t("Restore") }) })
        ] }) }),
        /* @__PURE__ */ e.jsxs(a.TableBody, { children: [
          n.data.length === 0 && /* @__PURE__ */ e.jsx(a.TableRow, { className: "cms:hover:bg-transparent", children: /* @__PURE__ */ e.jsx(a.TableCell, { colSpan: q, className: "cms:h-32 cms:text-center cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx(mn, { trashed: k, filtered: ys(k ? { ...r, status: "" } : r) > 0, canCreate: !!p?.create, createUrl: `${u}/create`, onClear: I }) }) }),
          n.data.map((j, O) => /* @__PURE__ */ e.jsxs(a.TableRow, { className: "sunrice-row-in", style: { "--i": O }, "data-state": _.includes(j.id) ? "selected" : void 0, children: [
            H.length > 0 && /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx(
              a.Checkbox,
              {
                "aria-label": t("Select :title", { title: j.title }),
                checked: _.includes(j.id),
                onCheckedChange: (V) => g(V ? [..._, j.id] : _.filter((de) => de !== j.id))
              }
            ) }),
            /* @__PURE__ */ e.jsxs(a.TableCell, { children: [
              /* @__PURE__ */ e.jsx(
                v.Link,
                {
                  href: B(`cms/collections/${s.handle}/entries/${j.id}/edit${r.locale !== h ? `?locale=${encodeURIComponent(r.locale)}` : ""}`),
                  className: "cms:font-medium cms:underline-offset-4 cms:hover:underline",
                  children: j.title
                }
              ),
              (!r.columns.includes("slug") && j.path || j.parent) && /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: [r.columns.includes("slug") ? null : j.path, j.parent ? t("under :parent", { parent: j.parent }) : null].filter(Boolean).join(" · ") })
            ] }),
            $.map((V) => /* @__PURE__ */ e.jsx(a.TableCell, { className: V.key === "status" ? "" : "cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx("div", { className: "cms:max-w-72 cms:truncate", children: /* @__PURE__ */ e.jsx(on, { row: j, column: V, mainLocale: h }) }) }, V.key)),
            ie && /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:w-px", children: /* @__PURE__ */ e.jsxs("span", { className: "cms:flex", children: [
              /* @__PURE__ */ e.jsx(a.Button, { variant: "ghost", size: "icon", "aria-label": t("Move :title up", { title: j.title }), onClick: () => v.router.post(B(`cms/entries/${j.id}/move`), { direction: "up" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(Is, {}) }),
              /* @__PURE__ */ e.jsx(a.Button, { variant: "ghost", size: "icon", "aria-label": t("Move :title down", { title: j.title }), onClick: () => v.router.post(B(`cms/entries/${j.id}/move`), { direction: "down" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(zs, {}) })
            ] }) }),
            Y && /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:w-px", children: /* @__PURE__ */ e.jsxs(
              a.Button,
              {
                variant: "outline",
                size: "sm",
                "aria-label": `Restore ${j.title}`,
                onClick: () => v.router.post(B(`cms/entries/${j.id}/restore`), {}, { preserveScroll: !0 }),
                children: [
                  /* @__PURE__ */ e.jsx(je, {}),
                  " Restore"
                ]
              }
            ) })
          ] }, j.id))
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4 cms:border-t cms:px-6 cms:py-3 cms:text-sm cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-4", children: [
          /* @__PURE__ */ e.jsx("span", { children: n.total === 0 ? t("No entries") : t(":from–:to of :total", { from: n.from, to: n.to, total: n.total }) }),
          /* @__PURE__ */ e.jsxs(a.Select, { value: String(r.perPage), onValueChange: (j) => {
            A(Number(j)), S({ perPage: Number(j) });
          }, children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:h-8 cms:w-auto", "aria-label": t("Entries per page"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(a.SelectContent, { children: m.map((j) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: String(j), children: t(":count per page", { count: j }) }, j)) })
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
              onClick: () => n.prev_page_url && v.router.get(n.prev_page_url, {}, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(Ze, {})
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
              onClick: () => n.next_page_url && v.router.get(n.next_page_url, {}, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(ve, {})
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function Ve({ label: s, value: l, options: n, onChange: r }) {
  return /* @__PURE__ */ e.jsxs(a.Select, { value: l === "" ? Oe : l, onValueChange: (i) => r(i === Oe ? "" : i), children: [
    /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-auto cms:min-w-40 cms:max-w-72", title: s, "aria-label": s, children: /* @__PURE__ */ e.jsx(a.SelectValue, { placeholder: s }) }),
    /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
      /* @__PURE__ */ e.jsx(a.SelectItem, { value: Oe, children: t(":filter: all", { filter: s }) }),
      n.map((i) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: i.value, children: i.label }, i.value))
    ] })
  ] });
}
function Ns({ label: s, sortKey: l, sort: n, onSort: r }) {
  const i = ln(n, l);
  return /* @__PURE__ */ e.jsx(a.TableHead, { "aria-sort": i === "asc" ? "ascending" : i === "desc" ? "descending" : void 0, children: /* @__PURE__ */ e.jsxs(
    "button",
    {
      type: "button",
      onClick: () => r(an(n, l)),
      className: "cms:-ml-2 cms:inline-flex cms:h-8 cms:items-center cms:gap-1 cms:rounded-md cms:px-2 cms:hover:bg-accent cms:hover:text-accent-foreground",
      children: [
        s,
        i === "asc" ? /* @__PURE__ */ e.jsx(Is, { className: "cms:size-3" }) : i === "desc" ? /* @__PURE__ */ e.jsx(zs, { className: "cms:size-3" }) : /* @__PURE__ */ e.jsx(Bs, { className: "cms:size-3 cms:opacity-40" })
      ]
    }
  ) });
}
function on({ row: s, column: l, mainLocale: n }) {
  switch (l.key) {
    case "slug":
      return /* @__PURE__ */ e.jsx("span", { className: "cms:font-mono", children: s.slug });
    case "status":
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-1", children: [
        s.trashed ? /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", className: "cms:text-destructive", title: t(":status before it was trashed", { status: te(s.status) }), children: t("Trashed") }) : /* @__PURE__ */ e.jsx(a.Badge, { variant: s.status === "published" ? "success" : "secondary", children: te(s.status) }),
        s.locales.length > 1 && s.locales.filter((r) => !r.main).map((r) => {
          const i = dn(r);
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
function dn(s) {
  return s.status === null ? { variant: "outline", className: "cms:border-dashed cms:text-muted-foreground", word: t("missing"), title: t("not translated") } : s.outdated ? { variant: "warning", className: "", word: t("outdated"), title: t(":status, outdated: the main language changed since", { status: te(s.status) }) } : s.status === "published" ? { variant: "secondary", className: "", word: null, title: t("Published") } : { variant: "outline", className: "", word: s.status === "scheduled" ? t("scheduled") : t("draft"), title: te(s.status) };
}
function mn({ trashed: s, filtered: l, canCreate: n, createUrl: r, onClear: i }) {
  return l ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: t("Nothing matches these filters.") }),
    /* @__PURE__ */ e.jsxs(a.Button, { variant: "outline", size: "sm", onClick: i, children: [
      /* @__PURE__ */ e.jsx(_e, {}),
      " ",
      t("Clear filters")
    ] })
  ] }) : s ? /* @__PURE__ */ e.jsx(e.Fragment, { children: t("The trash is empty.") }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: t("No entries yet.") }),
    n && /* @__PURE__ */ e.jsx(a.Button, { size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs(v.Link, { href: r, children: [
      /* @__PURE__ */ e.jsx(Z, {}),
      " ",
      t("Write the first one")
    ] }) })
  ] });
}
function rs({ message: s, processing: l, onSaveMine: n }) {
  const [r, i] = re();
  return s ? /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: [
    i,
    /* @__PURE__ */ e.jsx("span", { children: s }),
    /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => v.router.reload(), children: t("Load theirs") }),
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
function un(s) {
  return /* @__PURE__ */ e.jsx(hn, { ...s }, `${s.locale}:${s.version}:${JSON.stringify([s.values, s.seo])}`);
}
function hn({ collection: s, fields: l, locale: n, locales: r, shared: i, values: c, seo: d, version: x, can: m }) {
  const o = B(`cms/collections/${s.handle}/listing`), p = B(`cms/collections/${s.handle}/entries`);
  a.useBreadcrumbs([{ label: s.title, href: p }, { label: t("Listing page") }]);
  const u = v.useForm({ locale: n, data: c, seo: d ?? {}, version: x }), h = u.errors, b = (D) => {
    const N = ze(h, D);
    N.length > 0 && u.clearErrors(...N);
  }, y = r[0], _ = m.update, g = () => u.processing || u.put(o, { preserveScroll: !0 }), C = () => {
    u.transform((D) => ({ ...D, version: null })), u.put(o, { preserveScroll: !0 });
  };
  return a.useUnsavedChanges(u.isDirty, _ ? g : void 0), /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (D) => {
    D.preventDefault(), g();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(v.Head, { title: t(":title: listing page", { title: s.title }) }),
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: t(":title: listing page", { title: s.title }),
        back: { href: p, label: t("Back to :title", { title: s.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          r.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: n, onValueChange: (D) => v.router.get(o, { locale: D }), children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(a.SelectContent, { children: r.map((D, N) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: D, children: [
              P(D),
              N === 0 ? ` ${t("(main)")}` : ""
            ] }, D)) })
          ] }),
          s.url && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: s.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(ge, {}),
            " ",
            t("View")
          ] }) }),
          _ && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: u.processing, children: [
            u.processing && /* @__PURE__ */ e.jsx(ae, { className: "cms:animate-spin" }),
            " ",
            t("Save")
          ] })
        ] }),
        children: u.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
      }
    ),
    /* @__PURE__ */ e.jsxs("fieldset", { disabled: !_, className: "cms:flex cms:flex-col cms:gap-6", children: [
      /* @__PURE__ */ e.jsx(rs, { message: h.version, processing: u.processing, onSaveMine: C }),
      l.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("The listing page has no fields of its own: choose a listing blueprint for the collection under Structure → Collections.") }) : /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: [
        (i.length > 0 || $e(l)) && /* @__PURE__ */ e.jsx("p", { role: "note", className: "cms:rounded-lg cms:border cms:border-dashed cms:px-3 cms:py-2 cms:text-sm cms:text-muted-foreground", children: y ? t("Shared by all languages: the greyed-out fields are edited in :language.", { language: P(y) }) : t("Shared by all languages: the greyed-out fields are edited in the main language.") }),
        l.filter((D) => as(D, { ...c, ...u.data.data })).map((D) => i.includes(D.handle) ? /* @__PURE__ */ e.jsx("fieldset", { disabled: !0, className: oa, title: t("Shared by all languages"), children: /* @__PURE__ */ e.jsx(ce, { id: `data-${D.handle}`, field: D, content: !0, value: c[D.handle], errors: {}, onChange: () => {
        } }) }, D.handle) : /* @__PURE__ */ e.jsx(
          ce,
          {
            id: `data-${D.handle}`,
            field: D,
            content: !0,
            value: u.data.data[D.handle],
            errors: X(h, `data.${D.handle}`),
            onChange: (N) => {
              u.setData("data", { ...u.data.data, [D.handle]: N }), b(`data.${D.handle}`);
            }
          },
          D.handle
        ))
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: t("SEO"), description: t("How the listing page appears in search results and shared links."), titleClassName: "cms:text-base", storageKey: "cms:listing:seo", hasErrors: Ne(h, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !_, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(he, { bare: !0, id: "seo", fields: ns(), value: u.data.seo, errors: X(h, "seo"), onChange: (D) => {
      u.setData("seo", D), b("seo");
    } }) }) })
  ] });
}
function xn({ fieldsets: s }) {
  const l = v.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(E, { message: l.fieldset }),
    /* @__PURE__ */ e.jsx(
      ra,
      {
        kind: "fieldset",
        base: B("cms/fieldsets"),
        rows: s,
        intro: t("Fields shared between blueprints, and the kinds of block of flexible fields.")
      }
    )
  ] });
}
function pn(s) {
  return /* @__PURE__ */ e.jsx(gn, { ...s }, `${s.locale}:${s.version}:${JSON.stringify(s.values)}`);
}
function gn({ set: s, fields: l, locale: n, locales: r, shared: i, values: c, version: d, can: x, settings: m }) {
  const o = B(`cms/globals/${s.handle}/values`);
  a.useBreadcrumbs([{ label: t("Globals"), href: B("cms/globals") }, { label: s.title }]);
  const p = v.useForm({ locale: n, data: c, version: d }), u = p.errors, h = (N) => {
    const f = ze(u, N);
    f.length > 0 && p.clearErrors(...f);
  }, b = r[0], y = a.useEditLock({
    type: "cms.global",
    id: s.id,
    locale: n,
    enabled: x.update,
    noun: t("global set"),
    leaveTo: B("cms/globals"),
    getUnsaved: () => p.isDirty ? { data: p.data.data } : null
  }), _ = x.update && !y.readOnly, g = () => p.processing || p.put(o, { preserveScroll: !0 }), C = () => {
    p.transform((N) => ({ ...N, version: null })), p.put(o, { preserveScroll: !0 });
  }, D = async (N) => {
    const f = await y.loadKept(N);
    f.data && typeof f.data == "object" && p.setData("data", f.data);
  };
  return a.useUnsavedChanges(p.isDirty && !y.takenOver, _ ? g : void 0), /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (N) => {
    N.preventDefault(), g();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(v.Head, { title: s.title }),
    y.dialogs,
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: s.title,
        back: { href: B("cms/globals"), label: t("Back to globals") },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          m && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(v.Link, { href: m, children: [
            /* @__PURE__ */ e.jsx(Xe, {}),
            " ",
            t("Settings")
          ] }) }),
          r.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: n, onValueChange: (N) => v.router.get(o, { locale: N }), children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(a.SelectContent, { children: r.map((N, f) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: N, children: [
              P(N),
              f === 0 ? ` ${t("(main)")}` : ""
            ] }, N)) })
          ] }),
          _ && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: p.processing, children: [
            p.processing && /* @__PURE__ */ e.jsx(ae, { className: "cms:animate-spin" }),
            " ",
            t("Save")
          ] })
        ] }),
        children: p.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
      }
    ),
    l.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("This global set has no fields: choose a blueprint for it in its Settings.") }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(a.ViewingNotice, { by: y.viewingBy, onTakeOver: y.requestTakeOver }),
      b && n !== b && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:bg-muted/40 cms:p-3 cms:text-sm cms:text-muted-foreground", role: "note", children: d === null ? t("Not saved in :language yet: these are the :main values, which the site shows meanwhile. Translate them, then save.", { language: P(n), main: P(b) }) : t("A field left empty shows the :main value on the site.", { main: P(b) }) }),
      /* @__PURE__ */ e.jsx(rs, { message: u.version, processing: p.processing, onSaveMine: C }),
      /* @__PURE__ */ e.jsx(a.KeptEditsNotice, { kept: y.kept, disabled: !_, onLoad: (N) => {
        D(N);
      }, onDiscard: (N) => {
        y.discardKept(N);
      } }),
      /* @__PURE__ */ e.jsx(
        ls,
        {
          disabled: !_,
          fields: l,
          values: p.data.data,
          errors: u,
          storageKey: `cms:global:${s.handle}`,
          shared: i,
          sharedValues: c,
          sharedNote: b ? t("Shared by all languages: the greyed-out fields are edited in :language.", { language: P(b) }) : t("Shared by all languages: the greyed-out fields are edited in the main language."),
          onChange: (N, f) => {
            p.setData("data", { ...p.data.data, [N]: f }), h(`data.${N}`);
          }
        }
      )
    ] })
  ] });
}
let ua = 0;
function ha(s, l = 0) {
  return s.flatMap(({ children: n, ...r }) => [{ ...r, key: `m${++ua}`, depth: l }, ...ha(n ?? [], l + 1)]);
}
function fn(s) {
  const l = [], n = [{ depth: -1, children: l }];
  for (const { key: r, depth: i, ...c } of s) {
    for (; n.length > 1 && n[n.length - 1].depth >= i; ) n.pop();
    const d = { ...c, children: [] };
    n[n.length - 1].children.push(d), n.push({ depth: i, children: d.children });
  }
  return l;
}
function be(s, l) {
  const n = s[l]?.depth ?? 0;
  let r = l + 1;
  for (; r < s.length && s[r].depth > n; ) r++;
  return r;
}
function xa(s, l, n) {
  const r = be(s, l);
  return s.map((i, c) => c >= l && c < r ? { ...i, depth: i.depth + n } : i);
}
function jn(s, l, n) {
  const r = s[l], i = s[l - 1];
  return !r || !i || r.depth > i.depth || Math.max(...s.slice(l, be(s, l)).map((d) => d.depth)) + 1 > n - 1 ? s : xa(s, l, 1);
}
function bn(s, l) {
  const n = s[l];
  if (!n || n.depth === 0) return s;
  let r = l - 1;
  for (; r > 0 && s[r].depth >= n.depth; ) r--;
  const i = be(s, l), c = be(s, r), d = xa(s, l, -1).slice(l, i);
  return [...s.slice(0, l), ...s.slice(i, c), ...d, ...s.slice(c)];
}
function vn(s, l) {
  return [...s.slice(0, l), ...s.slice(be(s, l))];
}
function we(s) {
  return { key: `m${++ua}`, depth: 0, entry_id: null, term_id: null, collection_id: null, target: null, url: null, labels: {}, new_tab: !1, query: null, ...s };
}
function yn(s) {
  return s.url !== null || s.collection_id !== null && (s.query ?? "").trim() !== "" ? "main" : "title";
}
function Nn({ menu: s, items: l, locales: n, limits: r, terms: i, listings: c, can: d, settings: x }) {
  const m = B(`cms/menus/${s.handle}/links`);
  a.useBreadcrumbs([{ label: t("Menus"), href: B("cms/menus") }, { label: s.title }]);
  const [o, p] = z.useState(() => ha(l)), [u, h] = z.useState(null), b = v.useForm({ items: l }), y = b.errors, [_, g] = z.useState(!1), C = n[0] ?? "en", D = (k) => {
    p(k), g(!0);
  }, N = (k, w) => D(o.map(($, F) => F === k ? { ...$, ...w } : $)), f = () => {
    b.processing || (b.transform(() => ({ items: fn(o).map(pa) })), b.put(m, { preserveScroll: !0, onSuccess: () => g(!1) }));
  }, T = (k) => {
    k.preventDefault(), f();
  };
  a.useUnsavedChanges(_, d.update ? f : void 0);
  const A = (k) => /* @__PURE__ */ e.jsx(
    a.SortableList,
    {
      items: ne(o, k),
      getId: (w) => o[w].key,
      getLabel: (w) => o[w].labels[C] || o[w].target?.title || o[w].url || "link",
      disabled: !d.update,
      onReorder: (w) => D(cs(o, k, w)),
      className: k < 0 ? "cms:gap-1" : "cms:mt-1 cms:gap-1 cms:pl-6",
      children: (w, { handle: $, isOverlay: F }) => {
        const S = o[w];
        return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${F ? "" : "cms:border-border/70"}`, children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2 cms:p-2", children: [
            d.update && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:h-10 cms:shrink-0 cms:items-center", children: /* @__PURE__ */ e.jsx(a.SortableHandle, { ...$, label: t("Move :title", { title: S.labels[C] || S.target?.title || S.url || t("link") }) }) }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
                /* @__PURE__ */ e.jsx(
                  a.Input,
                  {
                    "aria-label": t("Label (:language)", { language: P(C) }),
                    className: "cms:w-full cms:sm:max-w-xs",
                    disabled: !d.update,
                    placeholder: S.target?.title ?? t("Label"),
                    value: S.labels[C] ?? "",
                    onChange: (H) => N(w, { labels: { ...S.labels, [C]: H.target.value } })
                  }
                ),
                /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-32 cms:flex-1 cms:truncate cms:text-sm cms:text-muted-foreground", children: S.url !== null ? S.url : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  S.target ? `${S.target.kind}: ${S.target.title}` : t("Gone"),
                  " ",
                  (!S.target || !S.target.live) && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", children: t("Not on the site") })
                ] }) }),
                d.update && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center", children: [
                  /* @__PURE__ */ e.jsxs("label", { className: "cms:mr-2 cms:flex cms:items-center cms:gap-1.5 cms:text-sm", children: [
                    /* @__PURE__ */ e.jsx(a.Checkbox, { checked: S.new_tab, onCheckedChange: (H) => N(w, { new_tab: H }) }),
                    " ",
                    t("New tab")
                  ] }),
                  /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": t("Out a level"), disabled: S.depth === 0, onClick: () => D(bn(o, w)), children: /* @__PURE__ */ e.jsx(Wa, {}) }),
                  /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": t("In a level"), onClick: () => D(jn(o, w, r.depth)), children: /* @__PURE__ */ e.jsx(Ga, {}) }),
                  /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": t("Remove, with what's under it"), onClick: () => D(vn(o, w)), children: /* @__PURE__ */ e.jsx(W, {}) })
                ] })
              ] }),
              S.collection_id !== null && /* @__PURE__ */ e.jsx(
                a.Input,
                {
                  "aria-label": t("Filters"),
                  className: "cms:w-full cms:sm:max-w-md cms:font-mono",
                  disabled: !d.update,
                  placeholder: t("Filters (optional): :example", { example: "filter=value" }),
                  value: S.query ?? "",
                  onChange: (H) => N(w, { query: H.target.value })
                }
              ),
              n.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: n.slice(1).map((H) => /* @__PURE__ */ e.jsx(
                a.Input,
                {
                  "aria-label": t("Label (:language)", { language: P(H) }),
                  className: "cms:w-full cms:sm:max-w-xs",
                  disabled: !d.update,
                  placeholder: yn(S) === "title" ? t(":language: its title there, else as :main", { language: P(H), main: P(C) }) : t(":language: as :main", { language: P(H), main: P(C) }),
                  value: S.labels[H] ?? "",
                  onChange: (R) => N(w, { labels: { ...S.labels, [H]: R.target.value } })
                },
                H
              )) })
            ] })
          ] }),
          !F && ne(o, w).length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:px-2 cms:pb-2", children: A(w) })
        ] });
      }
    }
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: T, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(v.Head, { title: s.title }),
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: s.title,
        back: { href: B("cms/menus"), label: t("Back to menus") },
        actions: d.update && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          x && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(v.Link, { href: x, children: [
            /* @__PURE__ */ e.jsx(Xe, {}),
            " ",
            t("Settings")
          ] }) }),
          /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", disabled: o.length >= r.items, onClick: () => h("entry"), children: [
            /* @__PURE__ */ e.jsx(Z, {}),
            " ",
            t("Entry")
          ] }),
          i.length > 0 && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", disabled: o.length >= r.items, onClick: () => h("term"), children: [
            /* @__PURE__ */ e.jsx(tl, {}),
            " ",
            t("Term")
          ] }),
          c.length > 0 && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", disabled: o.length >= r.items, onClick: () => h("listing"), children: [
            /* @__PURE__ */ e.jsx(gt, {}),
            " ",
            t("Listing")
          ] }),
          /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", disabled: o.length >= r.items, onClick: () => h("url"), children: [
            /* @__PURE__ */ e.jsx(ut, {}),
            " ",
            t("Link")
          ] }),
          /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: b.processing, children: [
            b.processing && /* @__PURE__ */ e.jsx(ae, { className: "cms:animate-spin" }),
            " ",
            t("Save")
          ] })
        ] }),
        children: _ && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
      }
    ),
    /* @__PURE__ */ e.jsx(E, { message: y.items }),
    Object.keys(y).some((k) => k.startsWith("items.")) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: t("Some links need fixing: :error", { error: Object.values(y).filter(Boolean)[0] }) }),
    /* @__PURE__ */ e.jsx(a.Card, { className: "cms:p-2", children: o.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:p-4 cms:text-center cms:text-muted-foreground", children: t("No links yet. Add an entry or a link.") }) : A(-1) }),
    /* @__PURE__ */ e.jsx(Cn, { kind: u, terms: i, listings: c, onClose: () => h(null), onAdd: (k) => {
      D([...o, k]), h(null);
    }, main: C })
  ] });
}
function pa({ target: s, children: l, ...n }) {
  return { ...n, children: l.map(pa) };
}
const kn = () => t("A menu links to entries that already exist: create the page first (Content → Entries), then add it here, or add a web address instead."), wn = () => ({ entry: t("Link to an entry"), term: t("Link to a term's page"), listing: t("Link to a listing page"), url: t("Link to an address") }), Sn = () => ({
  entry: t("It follows the entry: its title (unless you give a label) and its address in each language. It shows only while the entry is on the site."),
  term: t("The page listing the term's entries, in each language. Its title is the label unless you give one."),
  listing: t("The collection's listing page, in each language, optionally with filters. The collection's title is the label unless you give one."),
  url: t("A web address, a path on this site (/contact), mailto: or tel:.")
});
function Cn({ kind: s, terms: l, listings: n, onClose: r, onAdd: i, main: c }) {
  const [d, x] = z.useState(null), [m, o] = z.useState(""), [p, u] = z.useState(""), [h, b] = z.useState(""), [y, _] = z.useState("");
  z.useEffect(() => {
    x(null), o(""), u(""), b(""), _("");
  }, [s]);
  const g = p.trim() === "" || hl(p.trim()), C = h.trim() ? { [c]: h.trim() } : {}, D = async () => {
    if (s === "entry" && d !== null) {
      const f = await fetch(`${B("cms/entries/picker")}?${qt({ ids: [d], collections: [] })}`, { headers: { Accept: "application/json" }, credentials: "same-origin" }), T = f.ok ? (await f.json()).items[0] : void 0;
      i(we({ entry_id: d, target: T ? { title: T.title, kind: T.collection, live: T.status === "published" } : null, labels: C }));
    } else if (s === "term" && m !== "") {
      const f = l.find((T) => String(T.id) === m);
      i(we({ term_id: Number(m), target: f ? { title: f.title, kind: f.taxonomy, live: !0 } : null, labels: C }));
    } else if (s === "listing" && m !== "") {
      const f = n.find((T) => String(T.id) === m);
      i(we({ collection_id: Number(m), target: f ? { title: f.title, kind: t("Listing page"), live: !0 } : null, labels: C, query: y.trim().replace(/^\?/, "") || null }));
    } else s === "url" && p.trim() !== "" && g && h.trim() !== "" && i(we({ url: p.trim(), labels: C }));
  }, N = s === "entry" ? d !== null : s === "url" ? p.trim() !== "" && g && h.trim() !== "" : m !== "";
  return /* @__PURE__ */ e.jsx(a.Dialog, { open: s !== null, onOpenChange: (f) => !f && r(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: s ? wn()[s] : "" }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: s ? Sn()[s] : "" })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
      s === "entry" && /* @__PURE__ */ e.jsx(
        Te,
        {
          id: "menu-entry",
          value: d,
          multiple: !1,
          max: null,
          collections: [],
          invalid: !1,
          emptyHint: kn(),
          onChange: (f) => x(typeof f == "number" ? f : null)
        }
      ),
      (s === "term" || s === "listing") && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "menu-target", children: t(s === "term" ? "Term" : "Collection") }),
        /* @__PURE__ */ e.jsxs(a.Select, { value: m, onValueChange: o, children: [
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
            value: y,
            placeholder: "filter=value&other=value",
            onChange: (f) => _(f.target.value)
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
            value: p,
            placeholder: t("https://… or /contact"),
            "aria-invalid": !g,
            onChange: (f) => u(f.target.value)
          }
        ),
        !g && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t("This address could run code; use https://, a path, mailto: or tel:.") })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "menu-label", children: t(s === "url" ? "Label" : "Label (optional)") }),
        /* @__PURE__ */ e.jsx(a.Input, { id: "menu-label", value: h, onChange: (f) => b(f.target.value) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: r, children: t("Cancel") }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", onClick: () => {
        D();
      }, disabled: !N, children: t("Add") })
    ] })
  ] }) });
}
const $n = () => [
  { value: "all", label: t("All") },
  { value: "pending", label: t("Pending") },
  { value: "approved", label: t("Approved") },
  { value: "spam", label: t("Spam") },
  { value: "trashed", label: t("Trash") }
], Dn = (s) => ({ pending: t("Pending"), approved: t("Approved"), spam: t("Spam") })[s];
function _n({ tab: s, counts: l, filters: n, collections: r, comments: i, can: c, errors: d = {} }) {
  a.useBreadcrumbs([{ label: t("Comments"), href: B("cms/comments") }]);
  const [x, m] = z.useState(n.search), [o, p] = z.useState([]), [u, h] = z.useState(null), [b, y] = re(), _ = (f) => {
    const T = { status: s, search: n.search, collection: n.collection, ...f };
    v.router.get(B("cms/comments"), {
      ...T.status !== "all" ? { status: T.status } : {},
      ...T.search ? { search: T.search } : {},
      ...T.collection ? { collection: T.collection } : {},
      ...n.entry ? { entry: n.entry } : {}
    }, { preserveState: !0, replace: !0, onSuccess: () => p([]) });
  };
  z.useEffect(() => {
    if (x === n.search) return;
    const f = window.setTimeout(() => _({ search: x }), 300);
    return () => window.clearTimeout(f);
  }, [x]);
  const g = (f, T = {}) => v.router.post(B(f), T, { preserveScroll: !0, onSuccess: () => p([]) }), C = (f, T) => g(`cms/comments/${f.id}/status`, { status: T }), D = (f) => {
    const T = () => g("cms/comments/bulk", { action: f, ids: o });
    f === "delete" ? b(o.length === 1 ? t("Delete 1 comment for good? This can't be undone.") : t("Delete :count comments for good? This can't be undone.", { count: o.length }), T) : T();
  }, N = i.data.length > 0 && o.length === i.data.length;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(v.Head, { title: t("Comments") }),
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: t("Comments"),
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:sm:w-64", children: [
            /* @__PURE__ */ e.jsx(ye, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                type: "search",
                placeholder: t("Search text, name or email"),
                "aria-label": t("Search comments"),
                className: "cms:pl-9",
                value: x,
                onChange: (f) => m(f.target.value)
              }
            )
          ] }),
          r.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: n.collection ?? "all", onValueChange: (f) => _({ collection: f === "all" ? null : f }), children: [
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
      /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:underline cms:underline-offset-4", onClick: () => v.router.get(B("cms/comments")), children: t("Show all") })
    ] }),
    /* @__PURE__ */ e.jsx(a.Tabs, { value: s, onValueChange: (f) => _({ status: f }), children: /* @__PURE__ */ e.jsx(a.TabsList, { className: "cms:h-auto cms:flex-wrap cms:justify-start", children: $n().map((f) => /* @__PURE__ */ e.jsxs(a.TabsTrigger, { value: f.value, children: [
      f.label,
      " ",
      /* @__PURE__ */ e.jsx("span", { className: "cms:ml-1 cms:text-muted-foreground", children: l[f.value] })
    ] }, f.value)) }) }),
    o.length > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2 cms:text-sm", role: "toolbar", "aria-label": t("With the selected comments"), children: [
      /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", children: t(":count selected", { count: o.length }) }),
      c.moderate && s !== "trashed" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "outline", onClick: () => D("approve"), children: [
          /* @__PURE__ */ e.jsx(Se, {}),
          " ",
          t("Approve")
        ] }),
        /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "outline", onClick: () => D("unapprove"), children: [
          /* @__PURE__ */ e.jsx(Ce, {}),
          " ",
          t("Unapprove")
        ] }),
        /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "outline", onClick: () => D("spam"), children: [
          /* @__PURE__ */ e.jsx(Ye, {}),
          " ",
          t("Spam")
        ] })
      ] }),
      c.delete && s !== "trashed" && /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "outline", onClick: () => D("trash"), children: [
        /* @__PURE__ */ e.jsx(W, {}),
        " ",
        t("Trash")
      ] }),
      c.delete && s === "trashed" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "outline", onClick: () => D("restore"), children: [
          /* @__PURE__ */ e.jsx(je, {}),
          " ",
          t("Restore")
        ] }),
        /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "destructive", onClick: () => D("delete"), children: [
          /* @__PURE__ */ e.jsx(W, {}),
          " ",
          t("Delete for good")
        ] })
      ] })
    ] }),
    i.data.length === 0 ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:rounded-xl cms:border cms:border-dashed cms:px-6 cms:py-16 cms:text-center", children: [
      /* @__PURE__ */ e.jsx("span", { className: "cms:grid cms:size-10 cms:place-items-center cms:rounded-full cms:bg-muted cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx(Ya, { className: "cms:size-4" }) }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: n.search ? t("No comments match.") : t("No comments here.") })
    ] }) : /* @__PURE__ */ e.jsxs(a.Card, { className: "cms:divide-y cms:p-0", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3 cms:px-4 cms:py-2 cms:text-sm cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsx(a.Checkbox, { checked: N, "aria-label": t("Select all"), onCheckedChange: (f) => p(f ? i.data.map((T) => T.id) : []) }),
        /* @__PURE__ */ e.jsx("span", { children: t(":from–:to of :total", { from: i.from, to: i.to, total: i.total }) })
      ] }),
      i.data.map((f) => /* @__PURE__ */ e.jsxs("article", { className: "cms:flex cms:gap-3 cms:px-4 cms:py-4", "aria-labelledby": `comment-${f.id}-author`, children: [
        /* @__PURE__ */ e.jsx(
          a.Checkbox,
          {
            checked: o.includes(f.id),
            "aria-label": t("Select :author's comment", { author: f.author }),
            onCheckedChange: (T) => p(T ? [...o, f.id] : o.filter((A) => A !== f.id))
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-x-3 cms:gap-y-1 cms:text-sm", children: [
            /* @__PURE__ */ e.jsx("span", { id: `comment-${f.id}-author`, className: "cms:font-medium", children: f.author }),
            f.email && /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", children: f.email }),
            f.member && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", children: t("Signed in") }),
            !f.trashed && /* @__PURE__ */ e.jsx(a.Badge, { variant: f.status === "approved" ? "success" : f.status === "spam" ? "destructive" : "warning", children: Dn(f.status) }),
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
              /* @__PURE__ */ e.jsx(ge, { className: "cms:inline cms:size-3" })
            ] }) : f.entry.title,
            f.parent && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              " · ",
              t("replying to :author: “:excerpt”", { author: f.parent.author, excerpt: f.parent.excerpt })
            ] })
          ] }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:whitespace-pre-wrap cms:break-words", children: f.body }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-1", children: [
            c.moderate && !f.trashed && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              f.status !== "approved" && /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => C(f, "approved"), children: [
                /* @__PURE__ */ e.jsx(Se, {}),
                " ",
                t("Approve")
              ] }),
              f.status === "approved" && /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => C(f, "pending"), children: [
                /* @__PURE__ */ e.jsx(Ce, {}),
                " ",
                t("Unapprove")
              ] }),
              f.status !== "spam" && /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => C(f, "spam"), children: [
                /* @__PURE__ */ e.jsx(Ye, {}),
                " ",
                t("Spam")
              ] }),
              f.status !== "spam" && /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => h({ row: f, mode: "reply" }), children: [
                /* @__PURE__ */ e.jsx(bt, {}),
                " ",
                t("Reply")
              ] }),
              /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => h({ row: f, mode: "edit" }), children: [
                /* @__PURE__ */ e.jsx(wt, {}),
                " ",
                t("Edit")
              ] })
            ] }),
            c.delete && !f.trashed && /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => v.router.delete(B(`cms/comments/${f.id}`), { preserveScroll: !0 }), children: [
              /* @__PURE__ */ e.jsx(W, {}),
              " ",
              t("Trash")
            ] }),
            c.delete && f.trashed && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => g(`cms/comments/${f.id}/restore`), children: [
                /* @__PURE__ */ e.jsx(je, {}),
                " ",
                t("Restore")
              ] }),
              /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => b(
                t("Delete this comment for good? Replies to it stay."),
                () => v.router.delete(B(`cms/comments/${f.id}/force`), { preserveScroll: !0 })
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
      /* @__PURE__ */ e.jsxs(a.Button, { variant: "outline", size: "sm", disabled: !i.prev_page_url, onClick: () => i.prev_page_url && v.router.get(i.prev_page_url), children: [
        /* @__PURE__ */ e.jsx(Ze, {}),
        " ",
        t("Newer")
      ] }),
      /* @__PURE__ */ e.jsxs(a.Button, { variant: "outline", size: "sm", disabled: !i.next_page_url, onClick: () => i.next_page_url && v.router.get(i.next_page_url), children: [
        t("Older"),
        " ",
        /* @__PURE__ */ e.jsx(ve, {})
      ] })
    ] }),
    u && /* @__PURE__ */ e.jsx(Tn, { row: u.row, mode: u.mode, error: d.body, onClose: () => h(null) }, `${u.mode}-${u.row.id}`),
    y
  ] });
}
function Tn({ row: s, mode: l, error: n, onClose: r }) {
  const [i, c] = z.useState(l === "edit" ? s.body : ""), [d, x] = z.useState(!1), m = () => {
    x(!0);
    const o = { preserveScroll: !0, onSuccess: r, onFinish: () => x(!1) };
    l === "reply" ? v.router.post(B(`cms/comments/${s.id}/reply`), { body: i }, o) : v.router.put(B(`cms/comments/${s.id}`), { body: i }, o);
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
    /* @__PURE__ */ e.jsx(E, { message: n }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: r, children: t("Cancel") }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", disabled: i.trim() === "" || d, onClick: m, children: t(l === "reply" ? "Post reply" : "Save") })
    ] })
  ] }) });
}
const zn = () => [
  { role: "title", label: t("Meta title"), automatic: t("Automatic (the title)") },
  { role: "description", label: t("Meta description"), automatic: t("Automatic (nothing)") },
  { role: "image", label: t("Share image"), automatic: t("Automatic (nothing)") }
], Re = "__auto";
function Mn({ site: s, siteName: l, collections: n, taxonomies: r }) {
  a.useBreadcrumbs([{ label: t("Settings"), href: B("settings") }, { label: t("SEO") }]);
  const i = [...n ?? [], ...r ?? []], c = v.useForm({
    site: { ...s },
    mappings: i.map((u) => ({ kind: u.kind, id: u.id, title: u.chosen.title ?? "", description: u.chosen.description ?? "", image: u.chosen.image ?? "" }))
  }), d = c.errors, x = () => c.put(B("cms/seo"), { preserveScroll: !0, onSuccess: () => c.setDefaults() });
  a.useUnsavedChanges(c.isDirty, x);
  const m = (u, h) => c.setData("site", { ...c.data.site, [u]: h }), o = (u, h, b) => c.setData("mappings", c.data.mappings.map((y, _) => _ === u ? { ...y, [h]: b } : y)), p = (u, h, b, y, _) => /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: h, description: b, titleClassName: "cms:text-base", storageKey: `cms:seo:${u}`, contentClassName: "cms:flex cms:flex-col cms:divide-y cms:divide-border/60", children: [
    y.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("None yet.") }),
    y.map((g, C) => {
      const D = _ + C;
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3 cms:py-4 cms:first:pt-0 cms:last:pb-0", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:justify-between cms:gap-3", children: [
          /* @__PURE__ */ e.jsx("h3", { className: "cms:font-medium", children: g.title }),
          /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: g.blueprint ? t("Blueprint: :name", { name: g.blueprint }) : t("No blueprint") })
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-3 cms:sm:grid-cols-3", children: zn().map(({ role: N, label: f, automatic: T }) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-1.5", children: [
          /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `seo-${D}-${N}`, className: "cms:text-xs", children: f }),
          /* @__PURE__ */ e.jsxs(a.Select, { value: c.data.mappings[D]?.[N] || Re, onValueChange: (A) => o(D, N, A === Re ? "" : A), children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: `seo-${D}-${N}`, className: "cms:w-full", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(a.SelectItem, { value: Re, children: T }),
              g.options[N].map((A) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: A.value, children: A.label }, A.value))
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(E, { message: d[`mappings.${D}.${N}`] })
        ] }, N)) })
      ] }, `${g.kind}-${g.id}`);
    })
  ] });
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (u) => {
    u.preventDefault(), x();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(v.Head, { title: t("SEO") }),
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
        /* @__PURE__ */ e.jsx(a.Switch, { id: "seo-noindex", checked: c.data.site.noindex, onCheckedChange: (u) => m("noindex", u) }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-0.5", children: [
          /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "seo-noindex", children: t("Hide the whole site from search engines") }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t("Every page asks not to be indexed and the sitemap is empty. For a site still being built, or staging.") })
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-start cms:justify-between cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-3", children: [
          /* @__PURE__ */ e.jsx(a.Switch, { id: "seo-append", checked: c.data.site.appendName, onCheckedChange: (u) => m("appendName", u) }),
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
              onChange: (u) => m("separator", u.target.value)
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
            onChange: (u) => m("twitter", u.target.value)
          }
        ),
        /* @__PURE__ */ e.jsx(E, { message: d["site.twitter"] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "seo-image", children: t("Default share image") }),
        /* @__PURE__ */ e.jsx(
          a.MediaPickerInput,
          {
            id: "seo-image",
            invalid: d["site.image"] !== void 0,
            disabled: !1,
            multiple: !1,
            max: null,
            types: ["image"],
            value: c.data.site.image,
            onChange: (u) => m("image", typeof u == "number" ? u : null)
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t("Shown when a page is shared and has no image of its own.") }),
        /* @__PURE__ */ e.jsx(E, { message: d["site.image"] })
      ] })
    ] }),
    i.length > 0 && /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx("h2", { className: "cms:text-base cms:font-medium", children: t("Fields used for SEO") }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("When an entry or term leaves its meta title, description or share image empty, the site uses one of its fields instead. A page's own SEO fields always win; after the field come the site's (the description in Settings → Site, the share image above).") })
    ] }),
    n !== null && p("Collections", t("Collections"), t("Entries of each collection."), n, 0),
    r !== null && p("Taxonomies", t("Taxonomies"), t("Term pages of each taxonomy."), r, n?.length ?? 0),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t("Meta title: a text field. Meta description: a text or textarea field, cut to 300 characters. Share image: the first image of a media field.") })
  ] });
}
const Bn = 3;
function Ln({ form: s, forms: l, submissions: n, can: r, createForm: i = null }) {
  a.useBreadcrumbs([{ label: t("Submissions"), href: B("cms/submissions") }, ...s ? [{ label: s.title }] : []]);
  const [c, d] = z.useState(null), [x, m] = re();
  if (!s || !n)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(v.Head, { title: t("Submissions") }),
      /* @__PURE__ */ e.jsx(a.PageHeader, { title: t("Submissions"), description: t("What visitors send through the site's forms.") }),
      /* @__PURE__ */ e.jsxs(a.Card, { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:px-6 cms:py-14 cms:text-center", children: [
        /* @__PURE__ */ e.jsx(qa, { className: "cms:size-8 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
          /* @__PURE__ */ e.jsx("p", { className: "cms:font-medium", children: t("No forms yet") }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:max-w-sm cms:text-sm cms:text-muted-foreground", children: t(i ? "Create a form, put it on a page, and what visitors send shows up here." : "Once someone creates a form and puts it on a page, what visitors send shows up here.") })
        ] }),
        i && /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(v.Link, { href: i, children: [
          /* @__PURE__ */ e.jsx(Z, {}),
          " ",
          t("Create a form")
        ] }) })
      ] })
    ] });
  const o = (n.data[0]?.rows ?? []).slice(0, Bn), p = (u) => x(
    t("Delete this submission for good? It can't be restored."),
    () => v.router.delete(B(`cms/submissions/${u.id}`), { preserveScroll: !0, onSuccess: () => d(null) })
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(v.Head, { title: t(":form submissions", { form: s.title }) }),
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: s.title,
        actions: n.total > 0 && r.export && /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: B(`cms/forms/${s.handle}/submissions/export`), children: [
          /* @__PURE__ */ e.jsx(Qs, {}),
          " ",
          t("Export CSV")
        ] }) }),
        children: l.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: s.handle, onValueChange: (u) => v.router.get(B(`cms/forms/${u}/submissions`)), children: [
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
          /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:whitespace-nowrap", children: /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:font-medium cms:hover:underline", onClick: () => d(u), children: K(u.createdAt) }) }),
          o.map((h) => /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:max-w-64 cms:truncate", children: u.rows.find((b) => b.handle === h.handle)?.value }, h.handle))
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
            onClick: () => n.prev_page_url && v.router.get(n.prev_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(Ze, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": t("Next page"),
            disabled: !n.next_page_url,
            onClick: () => n.next_page_url && v.router.get(n.next_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(ve, {})
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(a.Dialog, { open: c !== null, onOpenChange: (u) => !u && d(null), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto", children: [
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
      r.delete && c && /* @__PURE__ */ e.jsx(a.DialogFooter, { children: /* @__PURE__ */ e.jsxs(a.Button, { variant: "destructive", onClick: () => p(c), children: [
        /* @__PURE__ */ e.jsx(W, {}),
        " ",
        t("Delete")
      ] }) })
    ] }) }),
    m
  ] });
}
function In(s) {
  return /* @__PURE__ */ e.jsx(Fn, { ...s }, `${s.locale}:${s.version}:${JSON.stringify([s.values, s.seo, s.term.template])}`);
}
function Fn({ taxonomy: s, term: l, translated: n, fields: r, locale: i, locales: c, shared: d, sharedValues: x, values: m, seo: o, version: p, usedBy: u = [], redirectsUrl: h = null, templates: b = null }) {
  const y = B(`cms/taxonomies/${s.handle}/terms`), _ = B(`cms/terms/${l.id}/content`);
  a.useBreadcrumbs([{ label: s.title, href: `${y}?locale=${i}` }, { label: l.title }]);
  const g = v.useForm({
    locale: i,
    title: l.ownTitle ?? "",
    slug: l.slug ?? "",
    data: m,
    seo: o ?? {},
    template: l.template ?? "",
    version: p
  }), C = g.errors, D = (w) => {
    const $ = ze(C, w);
    $.length > 0 && g.clearErrors(...$);
  }, N = () => g.processing || g.put(_, { preserveScroll: !0 }), f = () => {
    g.transform((w) => ({ ...w, version: null })), g.put(_, { preserveScroll: !0 });
  }, T = a.useEditLock({
    type: "cms.term",
    id: l.id,
    locale: i,
    enabled: n,
    noun: t("term"),
    leaveTo: `${y}?locale=${i}`,
    getUnsaved: () => g.isDirty ? { data: g.data.data, seo: g.data.seo, template: g.data.template } : null
  }), A = !T.readOnly, k = async (w) => {
    const $ = await T.loadKept(w);
    g.setData((F) => ({
      ...F,
      data: $.data && typeof $.data == "object" ? $.data : F.data,
      seo: $.seo && typeof $.seo == "object" ? $.seo : F.seo,
      template: typeof $.template == "string" ? $.template : F.template
    }));
  };
  return a.useUnsavedChanges(g.isDirty && !T.takenOver, A ? N : void 0), /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (w) => {
    w.preventDefault(), N();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(v.Head, { title: l.title }),
    T.dialogs,
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: l.title,
        back: { href: `${y}?locale=${i}`, label: t("Back to :title", { title: s.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          l.url && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: l.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(ge, {}),
            " ",
            t("View page")
          ] }) }),
          c.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: i, onValueChange: (w) => v.router.get(`${y}/${l.id}/edit`, { locale: w }), children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(a.SelectContent, { children: c.map((w, $) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: w, children: [
              P(w),
              $ === 0 ? ` ${t("(main)")}` : ""
            ] }, w)) })
          ] }),
          A && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: g.processing, children: [
            g.processing && /* @__PURE__ */ e.jsx(ae, { className: "cms:animate-spin" }),
            " ",
            t("Save")
          ] })
        ] }),
        children: g.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:items-start cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_20rem]", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(a.ViewingNotice, { by: T.viewingBy, onTakeOver: T.requestTakeOver }),
        !n && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:bg-muted/40 cms:p-3 cms:text-sm cms:text-muted-foreground", role: "note", children: t("Not in :language yet: the site shows the :main term meanwhile. Give it a title in :language and save to add it.", { language: P(i), main: P(c[0] ?? "en") }) }),
        /* @__PURE__ */ e.jsxs("fieldset", { disabled: !A, className: "cms:grid cms:min-w-0 cms:gap-4 cms:sm:grid-cols-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "term-title", children: t("Title") }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "term-title",
                value: g.data.title,
                required: !0,
                placeholder: l.mainTitle ?? "",
                maxLength: 255,
                "aria-invalid": C.title !== void 0,
                onChange: (w) => {
                  g.setData("title", w.target.value), D("title");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(E, { message: C.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "term-slug", children: t("Slug") }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "term-slug",
                className: "cms:font-mono",
                value: g.data.slug,
                placeholder: t("Made from the title"),
                maxLength: 200,
                "aria-invalid": C.slug !== void 0,
                onChange: (w) => {
                  g.setData("slug", w.target.value), D("slug");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(da, { note: Ds(l.hasPage ? l.slug : null, g.data.slug, !1), redirectsUrl: h }),
            /* @__PURE__ */ e.jsx(E, { message: C.slug })
          ] })
        ] }),
        /* @__PURE__ */ e.jsx(a.KeptEditsNotice, { kept: T.kept, disabled: !A, onLoad: (w) => {
          k(w);
        }, onDiscard: (w) => {
          T.discardKept(w);
        } }),
        /* @__PURE__ */ e.jsx(rs, { message: C.version, processing: g.processing, onSaveMine: f }),
        /* @__PURE__ */ e.jsx(
          ls,
          {
            disabled: !A,
            fields: r,
            values: g.data.data,
            errors: C,
            storageKey: `cms:term:${s.handle}`,
            shared: d,
            sharedValues: x,
            sharedNote: t("Shared by all languages: the greyed-out fields are edited in :language.", { language: P(c[0] ?? "en") }),
            onChange: (w, $) => {
              g.setData("data", { ...g.data.data, [w]: $ }), D(`data.${w}`);
            }
          }
        ),
        /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: t("SEO"), description: t("How this term's page appears in search results and shared links."), titleClassName: "cms:text-base", storageKey: "cms:term:seo", hasErrors: Ne(C, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !A, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(he, { bare: !0, id: "seo", fields: ns(), value: g.data.seo, errors: X(C, "seo"), onChange: (w) => {
          g.setData("seo", w), D("seo");
        } }) }) })
      ] }),
      /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(
          a.CollapsibleCard,
          {
            title: t("Template"),
            titleClassName: "cms:text-base",
            storageKey: "cms:term:page-settings",
            hasErrors: C.template !== void 0,
            contentClassName: "cms:flex cms:flex-col cms:gap-2",
            children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: !A, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: [
              /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "template", className: "cms:sr-only", children: t("Template") }),
              /* @__PURE__ */ e.jsx(
                a.Input,
                {
                  id: "template",
                  className: "cms:font-mono",
                  placeholder: `cms.${s.handle}-special`,
                  value: g.data.template,
                  onChange: (w) => g.setData("template", w.target.value),
                  "aria-invalid": C.template !== void 0
                }
              ),
              /* @__PURE__ */ e.jsx(ia, { example: `cms.${s.handle}-special`, empty: t("Leave empty to use the taxonomy's template."), value: g.data.template, lookup: b }),
              /* @__PURE__ */ e.jsx(E, { message: C.template })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: t("Used by"), titleClassName: "cms:text-base", storageKey: "cms:term:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          u.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("No content links here through its fields.") }),
          u.map((w) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:gap-2", children: [
            w.url ? /* @__PURE__ */ e.jsx("a", { href: w.url, className: "cms:truncate cms:underline-offset-4 cms:hover:underline", children: w.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:truncate", children: w.label }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", title: w.field, children: w.fieldLabel ?? w.field })
          ] }, `${w.label}:${w.field}`))
        ] })
      ] })
    ] })
  ] });
}
const Ue = "__top";
function An({ taxonomy: s, locale: l, locales: n, parent: r, terms: i }) {
  const c = B(`cms/taxonomies/${s.handle}/terms`);
  a.useBreadcrumbs([{ label: s.title, href: `${c}?locale=${l}` }, { label: t("New term") }]);
  const d = v.useForm({ title: "", slug: "", parent_id: r, locale: l }), x = d.errors;
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (m) => {
    m.preventDefault(), d.post(c);
  }, className: "cms:flex cms:max-w-3xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(v.Head, { title: t("New term · :taxonomy", { taxonomy: s.title }) }),
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: t("New term"),
        back: { href: `${c}?locale=${l}`, label: t("Back to :title", { title: s.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          n.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: l, onValueChange: (m) => v.router.get(`${c}/create`, { locale: m, ...r ? { parent: r } : {} }), children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-40", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(a.SelectContent, { children: n.map((m) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: m, children: P(m) }, m)) })
          ] }),
          /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: d.processing, children: [
            d.processing && /* @__PURE__ */ e.jsx(ae, { className: "cms:animate-spin" }),
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
            value: d.data.title,
            required: !0,
            autoFocus: !0,
            "aria-invalid": x.title !== void 0,
            onChange: (m) => d.setData("title", m.target.value)
          }
        ),
        /* @__PURE__ */ e.jsx(E, { message: x.title })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "slug", children: t("Slug") }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: "slug",
            className: "cms:font-mono",
            value: d.data.slug,
            placeholder: t("Made from the title"),
            "aria-invalid": x.slug !== void 0,
            onChange: (m) => d.setData("slug", m.target.value)
          }
        ),
        /* @__PURE__ */ e.jsx(E, { message: x.slug })
      ] }),
      s.hierarchical && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:md:col-span-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "parent", children: t("Under") }),
        /* @__PURE__ */ e.jsxs(
          a.Select,
          {
            value: d.data.parent_id === null ? Ue : String(d.data.parent_id),
            onValueChange: (m) => d.setData("parent_id", m === Ue ? null : Number(m)),
            children: [
              /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: "parent", className: "cms:md:w-1/2", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
              /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: Ue, children: t("Top level") }),
                i.map((m) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: String(m.id), children: [
                  "— ".repeat(m.depth),
                  m.title
                ] }, m.id))
              ] })
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(E, { message: x.parent_id })
      ] }),
      n.length > 1 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground cms:md:col-span-2", children: t("In :language. Translate it from the list afterwards.", { language: P(l) }) })
    ] }) })
  ] });
}
const qe = "__top";
function ks(s = []) {
  if (s.length === 0) return "";
  const l = s.slice(0, 5).join("; ");
  return ` ${s.length > 5 ? t("It's used by :list and :count more.", { list: l, count: s.length - 5 }) : t("It's used by :list.", { list: l })}`;
}
function En({ taxonomy: s, taxonomies: l, terms: n, locales: r, locale: i, trashed: c = !1 }) {
  a.useBreadcrumbs([{ label: s ? s.title : t("Terms") }]);
  const [d, x] = re(), [m, o] = z.useState(null), [p, u] = z.useState(""), [h, b] = z.useState(n);
  if (z.useEffect(() => b(n), [n]), !s)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(v.Head, { title: t("Terms") }),
      /* @__PURE__ */ e.jsx(a.PageHeader, { title: t("Terms"), description: t("There are no taxonomies yet. Create one under Structure → Taxonomies (categories, tags…), then add its terms here.") })
    ] });
  const y = B(`cms/taxonomies/${s.handle}/terms`), _ = (k) => B(`cms/taxonomies/${s.handle}/terms/${k.id}/edit`) + `?locale=${encodeURIComponent(i)}`, g = (k, w) => {
    const $ = w.map((F) => h[F].id);
    b(cs(h, k, w)), v.router.post(
      B("cms/terms/reorder"),
      { taxonomy: s.handle, ids: $, parent_id: k < 0 ? null : h[k].id },
      { preserveScroll: !0, preserveState: !0, onError: () => b(n) }
    );
  }, C = (k) => d(
    t('Move ":title" to the trash, with the terms under it? It comes off the site; you can restore it.', { title: k.fallback }) + ks(k.usedBy),
    () => v.router.delete(B(`cms/terms/${k.id}`), { preserveScroll: !0 }),
    t("Move to trash")
  ), D = p.trim().toLowerCase(), N = D === "" ? null : h.filter((k) => `${k.title ?? k.fallback} ${k.slug ?? ""}`.toLowerCase().includes(D)), f = s.collections ?? [], T = (k, w, $) => /* @__PURE__ */ e.jsxs("div", { className: `${ws} cms:border-t cms:border-border/60 cms:px-3 cms:py-2`, children: [
    /* @__PURE__ */ e.jsx("span", { className: "cms:flex cms:justify-center", children: w && !c && /* @__PURE__ */ e.jsx(a.SortableHandle, { ...w, label: t("Move :title", { title: k.fallback }) }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-2", style: { paddingLeft: $ * 20 }, children: [
      $ > 0 && /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", "aria-hidden": !0, children: "└" }),
      c ? /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: k.title ?? k.fallback }) : /* @__PURE__ */ e.jsx(
        "button",
        {
          type: "button",
          className: "cms:truncate cms:text-left cms:font-medium cms:underline-offset-4 cms:hover:underline",
          onClick: () => s.pages && k.title !== null ? v.router.get(_(k)) : o(k),
          children: k.title ?? /* @__PURE__ */ e.jsx("span", { className: "cms:font-normal cms:text-muted-foreground cms:italic", children: t(":title · not translated", { title: k.fallback }) })
        }
      ),
      k.url && /* @__PURE__ */ e.jsx("a", { href: k.url, target: "_blank", rel: "noopener noreferrer", className: "cms:text-muted-foreground cms:hover:text-foreground", "aria-label": t("Visit term page"), title: t("Visit term page"), children: /* @__PURE__ */ e.jsx(ge, { className: "cms:size-3.5" }) })
    ] }),
    /* @__PURE__ */ e.jsx("code", { className: "cms:hidden cms:truncate cms:text-xs cms:text-muted-foreground cms:md:block", children: k.slug ?? "—" }),
    /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:text-sm cms:text-muted-foreground cms:tabular-nums cms:md:block", children: k.entries ?? 0 }),
    /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:text-sm cms:text-muted-foreground cms:md:block", children: Hn(k.createdAt) }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:justify-end", children: c ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-1", children: [
      /* @__PURE__ */ e.jsxs(a.Button, { variant: "outline", size: "sm", onClick: () => v.router.post(B(`cms/terms/${k.id}/restore`), {}, { preserveScroll: !0 }), children: [
        /* @__PURE__ */ e.jsx(je, {}),
        " ",
        t("Restore")
      ] }),
      /* @__PURE__ */ e.jsxs(
        a.Button,
        {
          variant: "ghost",
          size: "sm",
          className: "cms:text-destructive",
          onClick: () => d(
            t('Delete ":title" for good, in every language? Entries lose it.', { title: k.fallback }) + ks(k.usedBy),
            () => v.router.delete(B(`cms/terms/${k.id}/force`), { preserveScroll: !0, data: (k.usedBy ?? []).length > 0 ? { force: 1 } : {} })
          ),
          children: [
            /* @__PURE__ */ e.jsx(W, {}),
            " ",
            t("Delete for good")
          ]
        }
      )
    ] }) : /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": t("Actions for :title", { title: k.fallback }), children: /* @__PURE__ */ e.jsx(et, {}) }) }),
      /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", children: [
        /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { onSelect: () => o(k), children: [
          /* @__PURE__ */ e.jsx(wt, {}),
          " ",
          t("Rename")
        ] }),
        s.hierarchical && k.title !== null && /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(v.Link, { href: `${y}/create?locale=${encodeURIComponent(i)}&parent=${k.id}`, children: [
          /* @__PURE__ */ e.jsx(Z, {}),
          " ",
          t("Add a term under it")
        ] }) }),
        s.pages && k.title !== null && /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(v.Link, { href: _(k), children: [
          /* @__PURE__ */ e.jsx(lt, {}),
          " ",
          t("Edit page")
        ] }) }),
        /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
        /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { className: "cms:text-destructive", onSelect: () => C(k), children: [
          /* @__PURE__ */ e.jsx(W, {}),
          " ",
          t("Move to trash")
        ] })
      ] })
    ] }) })
  ] }), A = (k) => /* @__PURE__ */ e.jsx(a.SortableList, { items: ne(h, k), getId: (w) => h[w].id, getLabel: (w) => h[w].title ?? h[w].fallback, disabled: c, onReorder: (w) => g(k, w), className: "cms:gap-0", children: (w, { handle: $, isOverlay: F }) => /* @__PURE__ */ e.jsxs("div", { className: F ? "cms:rounded-md cms:bg-card cms:shadow-md" : "", children: [
    T(h[w], $, h[w].depth),
    !F && !c && ne(h, w).length > 0 && A(w)
  ] }) });
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(v.Head, { title: s.title }),
    x,
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: c ? t(":title — trash", { title: s.title }) : s.title,
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          r.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: i, onValueChange: (k) => v.router.get(y, { locale: k, ...c ? { status: "trashed" } : {} }), children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-40", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(a.SelectContent, { children: r.map((k) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: k, children: P(k) }, k)) })
          ] }),
          c ? /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", onClick: () => v.router.get(y, { locale: i }), children: t("Back to terms") }) : /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(v.Link, { href: `${y}/create?locale=${encodeURIComponent(i)}`, children: [
            /* @__PURE__ */ e.jsx(Z, {}),
            " ",
            t("New term")
          ] }) }),
          /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", size: "icon", "aria-label": t("More"), children: /* @__PURE__ */ e.jsx(Pa, {}) }) }),
            /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", className: "cms:min-w-56", children: [
              f.length > 0 && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(a.DropdownMenuLabel, { children: t("Used by collections") }),
                f.map((k) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsx(v.Link, { href: k.url, children: k.title }) }, k.url)),
                /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {})
              ] }),
              s.settings && /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(v.Link, { href: s.settings, children: [
                /* @__PURE__ */ e.jsx(Xe, {}),
                " ",
                t("Taxonomy settings")
              ] }) }),
              !c && /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { onSelect: () => v.router.get(y, { locale: i, status: "trashed" }), children: [
                /* @__PURE__ */ e.jsx(W, {}),
                " ",
                t("Trash")
              ] })
            ] })
          ] })
        ] }),
        children: l.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: s.handle, onValueChange: (k) => v.router.get(B(`cms/taxonomies/${k}/terms`)), children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": t("Taxonomy"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: l.map((k) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: k.handle, children: k.title }, k.handle)) })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-xs", children: [
        /* @__PURE__ */ e.jsx(ye, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            className: "cms:pl-9",
            placeholder: t("Search terms…"),
            "aria-label": t("Search terms"),
            value: p,
            onChange: (k) => u(k.target.value)
          }
        )
      ] }),
      !c && h.length > 1 && !N && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s.hierarchical ? t("Drag terms to set their order; a term's parent is set when you rename it.") : t("Drag terms to set their order.") })
    ] }),
    /* @__PURE__ */ e.jsxs(a.Card, { className: "cms:gap-0 cms:overflow-hidden cms:py-0", children: [
      /* @__PURE__ */ e.jsxs("div", { className: `${ws} cms:bg-muted/60 cms:px-3 cms:py-2.5 cms:text-sm cms:font-medium cms:text-muted-foreground`, children: [
        /* @__PURE__ */ e.jsx("span", {}),
        /* @__PURE__ */ e.jsx("span", { children: t("Title") }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:md:block", children: t("Slug") }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:md:block", children: t("Entries") }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:md:block", children: t("Created") }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: t("Actions") })
      ] }),
      h.length === 0 ? /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:border-t cms:border-border/60 cms:p-10 cms:text-center cms:text-muted-foreground", children: c ? t("The trash is empty.") : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        t("No terms yet."),
        /* @__PURE__ */ e.jsx(a.Button, { size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs(v.Link, { href: `${y}/create?locale=${encodeURIComponent(i)}`, children: [
          /* @__PURE__ */ e.jsx(Z, {}),
          " ",
          t("New term")
        ] }) })
      ] }) }) : N ? N.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:border-t cms:border-border/60 cms:p-8 cms:text-center cms:text-muted-foreground", children: t("No terms match “:search”.", { search: p }) }) : N.map((k) => /* @__PURE__ */ e.jsx(z.Fragment, { children: T(k, null, 0) }, k.id)) : c ? h.map((k) => /* @__PURE__ */ e.jsx(z.Fragment, { children: T(k, null, 0) }, k.id)) : A(-1)
    ] }),
    /* @__PURE__ */ e.jsx(a.Dialog, { open: m !== null, onOpenChange: (k) => {
      k || o(null);
    }, children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
      /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
        /* @__PURE__ */ e.jsx(a.DialogTitle, { children: t("Rename “:title”", { title: m?.fallback }) }),
        /* @__PURE__ */ e.jsx(a.DialogDescription, { children: r.length > 1 ? t("In :language.", { language: P(i) }) : t("Its title and the slug in its address.") })
      ] }),
      m !== null && /* @__PURE__ */ e.jsx(Pn, { term: m, locale: i, terms: n, hierarchical: s.hierarchical, onDone: () => o(null) }, m.id)
    ] }) })
  ] });
}
const ws = "cms:grid cms:items-center cms:gap-3 cms:grid-cols-[1.5rem_1fr_2.5rem] cms:md:grid-cols-[1.5rem_minmax(0,2fr)_minmax(0,1.2fr)_5rem_7rem_2.5rem]";
function Hn(s) {
  if (!s) return "—";
  const l = new Date(s);
  return Number.isNaN(l.getTime()) ? "—" : l.toLocaleDateString(document.documentElement.lang || void 0, { day: "numeric", month: "short", year: "numeric" });
}
function Pn({ locale: s, terms: l, hierarchical: n, term: r, onDone: i }) {
  const c = v.useForm({ title: r.title ?? "", slug: r.slug ?? "", parent_id: r.parentId, locale: s, version: r.version }), d = c.errors, x = /* @__PURE__ */ new Set();
  x.add(r.id);
  const m = l.findIndex((u) => u.id === r.id);
  for (let u = m + 1; u < l.length && (l[u]?.depth ?? 0) > r.depth; u++) x.add(l[u].id);
  const o = (u) => {
    u.preventDefault(), c.put(B(`cms/terms/${r.id}`), { preserveScroll: !0, onSuccess: i });
  }, p = `term-${r.id}`;
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: o, className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${p}-title`, children: t("Title") }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: `${p}-title`,
          value: c.data.title,
          placeholder: r.fallback,
          required: !0,
          autoFocus: !0,
          onChange: (u) => c.setData("title", u.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(E, { message: d.title ?? d.version })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${p}-slug`, children: t("Slug") }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: `${p}-slug`,
          className: "cms:font-mono",
          value: c.data.slug,
          placeholder: t("Made from the title"),
          onChange: (u) => c.setData("slug", u.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(E, { message: d.slug })
    ] }),
    n && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${p}-parent`, children: t("Under") }),
      /* @__PURE__ */ e.jsxs(
        a.Select,
        {
          value: c.data.parent_id === null ? qe : String(c.data.parent_id),
          onValueChange: (u) => c.setData("parent_id", u === qe ? null : Number(u)),
          children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: `${p}-parent`, children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(a.SelectItem, { value: qe, children: t("Top level") }),
              l.filter((u) => !x.has(u.id)).map((u) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: String(u.id), children: [
                "— ".repeat(u.depth),
                u.title ?? u.fallback
              ] }, u.id))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ e.jsx(E, { message: d.parent_id })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", onClick: i, children: t("Cancel") }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "submit", disabled: c.processing, children: t("Save") })
    ] })
  ] });
}
function On({ locale: s, main: l, locales: n, sections: r }) {
  const i = B("cms/translations");
  a.useBreadcrumbs([{ label: t("Translations") }]);
  const c = n.find((p) => p.code === s)?.name ?? P(s), d = v.useForm({
    locale: s,
    texts: Object.fromEntries(r.flatMap((p) => p.texts.map((u) => [u.key, u.value])))
  }), x = d.errors, m = () => d.put(i, { preserveScroll: !0, onSuccess: () => d.setDefaults() });
  a.useUnsavedChanges(d.isDirty, m);
  const o = (p, u) => d.setData("texts", { ...d.data.texts, [p]: u });
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (p) => {
    p.preventDefault(), m();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(v.Head, { title: t("Translations") }),
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: t("Translations"),
        description: t("What visitors read outside entries: forms, listing titles, menus and the site's description. Empty: the :main text shows.", { main: P(l) }),
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          n.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: s, onValueChange: (p) => v.router.get(i, { locale: p }), children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { "aria-label": t("Language"), className: "cms:w-48", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(a.SelectContent, { children: n.map((p) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: p.code, children: p.name }, p.code)) })
          ] }),
          /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: d.processing, children: [
            d.processing && /* @__PURE__ */ e.jsx(ae, { className: "cms:animate-spin" }),
            " ",
            t("Save")
          ] })
        ] }),
        children: d.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
      }
    ),
    /* @__PURE__ */ e.jsx(E, { message: x.locale }),
    r.map((p) => /* @__PURE__ */ e.jsx(
      a.CollapsibleCard,
      {
        title: p.title,
        titleClassName: "cms:text-base",
        storageKey: `cms:translations:${p.key}`,
        contentClassName: "cms:flex cms:flex-col cms:divide-y cms:divide-border/60",
        children: p.texts.map((u) => {
          const h = `text-${u.key.replace(/[^A-Za-z0-9_-]/g, "-")}`, b = x[`texts.${u.key}`];
          return /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-2 cms:py-3 cms:first:pt-0 cms:last:pb-0 cms:md:grid-cols-2 cms:md:gap-4", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-1", children: [
              /* @__PURE__ */ e.jsx(a.Label, { htmlFor: h, children: u.label }),
              /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:break-words cms:whitespace-pre-line cms:text-muted-foreground", lang: l, children: u.source || "—" })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-1", children: [
              u.multiline ? /* @__PURE__ */ e.jsx(
                a.Textarea,
                {
                  id: h,
                  rows: 2,
                  lang: s,
                  value: d.data.texts[u.key] ?? "",
                  placeholder: u.source,
                  "aria-invalid": b !== void 0,
                  "aria-description": t("In :language", { language: c }),
                  onChange: (y) => o(u.key, y.target.value)
                }
              ) : /* @__PURE__ */ e.jsx(
                a.Input,
                {
                  id: h,
                  lang: s,
                  value: d.data.texts[u.key] ?? "",
                  placeholder: u.source,
                  "aria-invalid": b !== void 0,
                  "aria-description": t("In :language", { language: c }),
                  onChange: (y) => o(u.key, y.target.value)
                }
              ),
              /* @__PURE__ */ e.jsx(E, { message: b })
            ] })
          ] }, u.key);
        })
      },
      p.key
    ))
  ] });
}
function Vn(s) {
  return function(n) {
    const r = v.usePage().props.cms;
    return Na(r?.locales), /* @__PURE__ */ e.jsx(s, { ...n });
  };
}
const Rn = {
  "Cms/Blueprints/Index": Vl,
  "Cms/Blueprints/Edit": js,
  "Cms/Fieldsets/Index": xn,
  // A fieldset is edited like a blueprint.
  "Cms/Fieldsets/Edit": js,
  "Cms/Entries/Index": cn,
  "Cms/Entries/Edit": ql,
  "Cms/Listing/Edit": un,
  "Cms/Terms/Index": En,
  "Cms/Terms/Create": An,
  "Cms/Translations/Edit": On,
  "Cms/Terms/Edit": In,
  "Cms/Globals/Edit": pn,
  "Cms/Menus/Edit": Nn,
  "Cms/Comments/Index": _n,
  "Cms/Seo/Edit": Mn,
  "Cms/Submissions/Index": Ln
};
va({
  pages: Object.fromEntries(Object.entries(Rn).map(([s, l]) => [s, Vn(l)]))
});
