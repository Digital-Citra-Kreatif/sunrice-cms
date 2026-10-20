function We() {
  const s = globalThis.Sunrice;
  if (!s)
    throw new Error("[sunrice] This script runs outside the Sunrice admin panel (window.Sunrice is missing).");
  return s;
}
function Zs(s) {
  const a = We();
  if (a.version !== 2)
    throw new Error(`[sunrice] This plugin was built for admin runtime 2, but the panel runs ${a.version}. Rebuild it with a matching @sunrice/admin-sdk.`);
  for (const [l, n] of Object.entries(s.pages ?? {}))
    a.registerPage(l, n);
}
function _(s = "") {
  return We().adminUrl(s);
}
const Ge = globalThis.Sunrice;
if (!Ge) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const t = Ge.modules["@sunrice/admin-sdk/ui"];
function ne(s) {
  return s && typeof s == "object" && !Array.isArray(s) ? s : {};
}
function Xs(s, a) {
  if (typeof s != "string" || s === "") return "";
  const l = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(s);
  return l ? a ? `${l[1]}T${l[2] ?? "00:00"}` : l[1] ?? "" : "";
}
function Ae(s) {
  return s === "" ? null : s;
}
function et() {
  return { _hidden: !1 };
}
function st(s) {
  return { type: s, hidden: !1, values: {} };
}
function tt(s) {
  const a = s.replace(/[\u0000- \u007f]+/g, ""), l = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(a);
  return l ? ["http", "https", "mailto", "tel"].includes(l[1].toLowerCase()) : !a.includes("\\");
}
function Te({ ids: s, search: a, collections: l }) {
  const n = new URLSearchParams();
  for (const r of s ?? []) n.append("ids[]", String(r));
  a && n.set("search", a);
  for (const r of l) n.append("collections[]", r);
  return n.toString();
}
let at = 0;
function lt(s, a) {
  return s.length === a ? s.slice() : s.length < a ? [...s, ...Array.from({ length: a - s.length }, () => `k${++at}`)] : s.slice(0, a);
}
function nt({ taxonomy: s, q: a, ids: l }) {
  const n = new URLSearchParams({ taxonomy: s });
  a && n.set("q", a);
  for (const r of l ?? []) n.append("ids[]", String(r));
  return n.toString();
}
function ct(s, a) {
  return s.map((l) => ({
    id: String(l.id),
    label: l.title,
    description: l.status === "published" ? l.collection : `${l.collection} · ${l.status}`,
    group: "Entries",
    icon: "file-text",
    url: a(`cms/entries/${l.id}/edit`)
  }));
}
async function rt(s, a, l) {
  const n = await fetch(`${l("cms/entry-picker")}?${Te({ search: s.trim(), collections: [] })}`, {
    signal: a,
    headers: { Accept: "application/json" },
    credentials: "same-origin"
  });
  if (!n.ok) return [];
  const { items: r } = await n.json();
  return ct(r, l);
}
const qe = globalThis.Sunrice;
if (!qe) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const e = qe.modules["react/jsx-runtime"], Je = globalThis.Sunrice;
if (!Je) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const D = Je.modules.react, Ye = globalThis.Sunrice;
if (!Ye) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const y = Ye.modules["@inertiajs/react"];
const it = (s) => s?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
function ot(s, a, l = []) {
  if (a == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: it(s),
    size: 24,
    node: a,
    ...l.length > 0 ? { aliases: l } : {}
  };
}
const dt = (s) => {
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
const mt = (s) => {
  const a = dt(s);
  return a.charAt(0).toUpperCase() + a.slice(1);
};
const ke = (...s) => s.filter((a, l, n) => !!a && a.trim() !== "" && n.indexOf(a) === l).join(" ").trim();
const Z = {
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
function be(s) {
  return s != null;
}
function ut(s, a = {}) {
  const l = a.attributeNames ?? {}, n = (p) => l[p] ?? p, r = s.size ?? s.width ?? Z.width, c = s.size ?? s.height ?? Z.height, i = s.aliases?.filter((p) => typeof p == "string" && p.trim() !== "").map((p) => `lucide-${p}`) ?? [], o = [...s.name ? [`lucide-${s.name}`] : [], ...i], u = a.className?.split(" ").filter(Boolean) ?? [], m = a.includeDefaultClasses === !1 ? ke(...u) : ke("lucide", ...o, ...u), x = a.absoluteStrokeWidth ? Number(a.strokeWidth ?? Z["stroke-width"]) * Number(s.size ?? s.width ?? Z.width) / Number(a.size ?? a.width ?? Z.width) : a.strokeWidth ?? Z["stroke-width"];
  return [
    "svg",
    {
      ...Object.entries(Z).reduce((p, [v, b]) => (p[n(v)] = b, p), {}),
      ..."color" in a && a.color && {
        [n("stroke")]: a.color
      },
      ..."size" in a && be(a.size) && {
        [n("width")]: a.size,
        [n("height")]: a.size
      },
      ..."width" in a && be(a.width) && {
        [n("width")]: a.width
      },
      ..."height" in a && be(a.height) && {
        [n("height")]: a.height
      },
      [n("stroke-width")]: x,
      ...m && {
        [n("class")]: m
      },
      [n("viewBox")]: `0 0 ${r} ${c}`,
      ...a.hasA11yProp === !1 ? {
        [n("aria-hidden")]: "true"
      } : {},
      ..."attributes" in a && a.attributes
    },
    s.node.map((p) => {
      const [v, b, h] = p, $ = a.nonScalingStroke ? { [n("vector-effect")]: "non-scaling-stroke", ...b } : b;
      return h ? [v, $, h] : [v, $];
    })
  ];
}
function ht(s, a = {}) {
  return ut(s, {
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
const xt = (s) => {
  for (const a in s)
    if (a.startsWith("aria-") || a === "role" || a === "title")
      return !0;
  return !1;
}, pt = D.createContext({}), gt = () => D.useContext(pt), jt = D.forwardRef(
  ({
    color: s,
    size: a,
    width: l,
    height: n,
    strokeWidth: r,
    absoluteStrokeWidth: c,
    nonScalingStroke: i,
    className: o = "",
    children: u,
    iconNode: m = [],
    icon: x = {
      node: m,
      aliases: [],
      size: 24
    },
    ...d
  }, p) => {
    const {
      size: v = 24,
      strokeWidth: b = 2,
      absoluteStrokeWidth: h = !1,
      nonScalingStroke: $ = !1,
      color: f = "currentColor",
      className: N = ""
    } = gt() ?? {}, w = !!u || xt(d), [g, k, T = []] = ht(x, {
      color: s ?? f,
      width: l ?? a ?? v,
      height: n ?? a ?? v,
      strokeWidth: r ?? b,
      absoluteStrokeWidth: c ?? h,
      nonScalingStroke: i ?? $,
      className: ke(N, o),
      hasA11yProp: w,
      attributes: d
    });
    return D.createElement(
      g,
      {
        ref: p,
        ...k
      },
      [
        ...T.map(([S, H]) => D.createElement(S, H)),
        ...Array.isArray(u) ? u : [u]
      ]
    );
  }
);
function L(s, a = [], l = []) {
  const n = typeof s == "string" ? ot(s, a, l) : s, r = D.forwardRef(
    ({ className: c, ...i }, o) => D.createElement(jt, {
      ref: o,
      icon: n,
      className: c,
      ...i
    })
  );
  return n.name && (r.displayName = mt(n.name)), r;
}
const Qe = {
  name: "arrow-down",
  size: 24,
  node: [
    ["path", { d: "M12 5v14", key: "s699le" }],
    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
  ]
};
Qe.node;
const Ze = L(Qe);
const Xe = {
  name: "arrow-up-down",
  size: 24,
  node: [
    ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
    ["path", { d: "M17 20V4", key: "1ejh1v" }],
    ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
    ["path", { d: "M7 4v16", key: "1glfcx" }]
  ]
};
Xe.node;
const es = L(Xe);
const ss = {
  name: "arrow-up",
  size: 24,
  node: [
    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
    ["path", { d: "M12 19V5", key: "x0mq9r" }]
  ]
};
ss.node;
const ts = L(ss);
const as = {
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
as.node;
const ft = L(as);
const ls = {
  name: "check",
  size: 24,
  node: [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]
};
ls.node;
const ue = L(ls);
const ns = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
ns.node;
const cs = L(ns);
const rs = {
  name: "chevron-left",
  size: 24,
  node: [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]]
};
rs.node;
const Be = L(rs);
const is = {
  name: "chevron-right",
  size: 24,
  node: [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]
};
is.node;
const xe = L(is);
const os = {
  name: "columns-3",
  size: 24,
  node: [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M9 3v18", key: "fh3hqa" }],
    ["path", { d: "M15 3v18", key: "14nvp0" }]
  ],
  aliases: ["panels-left-right"]
};
os.node;
const bt = L(os);
const ds = {
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
ds.node;
const vt = L(ds);
const ms = {
  name: "copy",
  size: 24,
  node: [
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
  ]
};
ms.node;
const yt = L(ms);
const us = {
  name: "download",
  size: 24,
  node: [
    ["path", { d: "M12 15V3", key: "m9g1x1" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
  ]
};
us.node;
const hs = L(us);
const xs = {
  name: "external-link",
  size: 24,
  node: [
    ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
    ["path", { d: "M10 14 21 3", key: "gplh6r" }],
    ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
  ]
};
xs.node;
const re = L(xs);
const ps = {
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
ps.node;
const Nt = L(ps);
const gs = {
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
gs.node;
const St = L(gs);
const js = {
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
js.node;
const Ct = L(js);
const fs = {
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
fs.node;
const kt = L(fs);
const bs = {
  name: "link-2",
  size: 24,
  node: [
    ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
    ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
    ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
  ]
};
bs.node;
const $t = L(bs);
const vs = {
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
vs.node;
const wt = L(vs);
const ys = {
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
ys.node;
const Dt = L(ys);
const Ns = {
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
Ns.node;
const _t = L(Ns);
const Ss = {
  name: "loader-circle",
  size: 24,
  node: [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  aliases: ["loader-2"]
};
Ss.node;
const le = L(Ss);
const Cs = {
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
Cs.node;
const ks = L(Cs);
const $s = {
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
$s.node;
const Tt = L($s);
const ws = {
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
ws.node;
const Ds = L(ws);
const _s = {
  name: "plus",
  size: 24,
  node: [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ]
};
_s.node;
const q = L(_s);
const Ts = {
  name: "rotate-ccw",
  size: 24,
  node: [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ]
};
Ts.node;
const he = L(Ts);
const Bs = {
  name: "search",
  size: 24,
  node: [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ]
};
Bs.node;
const pe = L(Bs);
const zs = {
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
zs.node;
const $e = L(zs);
const Ls = {
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
Ls.node;
const Bt = L(Ls);
const Ms = {
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
Ms.node;
const V = L(Ms);
const Is = {
  name: "undo-2",
  size: 24,
  node: [
    ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
    ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
  ]
};
Is.node;
const we = L(Is);
const As = {
  name: "x",
  size: 24,
  node: [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]
};
As.node;
const ge = L(As);
function Q() {
  const [s, a] = D.useState(null), l = /* @__PURE__ */ e.jsx(t.Dialog, { open: s !== null, onOpenChange: (n) => !n && a(null), children: /* @__PURE__ */ e.jsxs(t.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(t.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(t.DialogTitle, { children: "Are you sure?" }),
      /* @__PURE__ */ e.jsx(t.DialogDescription, { children: s?.message })
    ] }),
    /* @__PURE__ */ e.jsxs(t.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "outline", onClick: () => a(null), children: "Cancel" }),
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "destructive", onClick: () => {
        s?.onConfirm(), a(null);
      }, children: "Delete" })
    ] })
  ] }) });
  return [(n, r) => a({ message: n, onConfirm: r }), l];
}
function X(s) {
  return { draft: "Draft", scheduled: "Scheduled", published: "Published" }[s];
}
function G(s, a) {
  if (!s) return "—";
  const l = new Date(s);
  return Number.isNaN(l.getTime()) ? "—" : l.toLocaleString(a, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
function zt(s) {
  const a = (l) => String(l).padStart(2, "0");
  return `${s.getFullYear()}-${a(s.getMonth() + 1)}-${a(s.getDate())}T${a(s.getHours())}:${a(s.getMinutes())}`;
}
function P(s, a) {
  try {
    return new Intl.DisplayNames(a ? [a] : void 0, { type: "language" }).of(s.replace("_", "-")) ?? s;
  } catch {
    return s;
  }
}
async function Ee(s) {
  const a = await fetch(`${_("cms/entry-picker")}?${Te(s)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!a.ok) throw new Error(String(a.status));
  return (await a.json()).items;
}
function je({ id: s, value: a, multiple: l, max: n, collections: r, invalid: c, onChange: i }) {
  const o = a === null ? [] : Array.isArray(a) ? a : [a], [u, m] = D.useState({}), [x, d] = D.useState(""), [p, v] = D.useState(null), [b, h] = D.useState(!1), $ = l && n !== null && o.length >= n, f = o.filter((g) => !u[g]).join(",");
  D.useEffect(() => {
    f !== "" && Ee({ ids: f.split(",").map(Number), collections: r }).then((g) => m((k) => ({ ...k, ...Object.fromEntries(g.map((T) => [T.id, T])) }))).catch(() => h(!0));
  }, [f]), D.useEffect(() => {
    if (x.trim() === "") {
      v(null);
      return;
    }
    const g = window.setTimeout(() => {
      Ee({ search: x.trim(), collections: r }).then((k) => {
        v(k), h(!1);
      }).catch(() => h(!0));
    }, 250);
    return () => window.clearTimeout(g);
  }, [x]);
  const N = (g) => {
    m((k) => ({ ...k, [g.id]: g })), i(l ? [...o, g.id] : g.id), d("");
  }, w = (g) => i(l ? g : g[0] ?? null);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    o.length > 0 && /* @__PURE__ */ e.jsx(t.SortableList, { items: o, getId: (g) => g, onReorder: (g) => w(g), disabled: !l, className: "cms:gap-1", children: (g, { handle: k }) => {
      const T = u[g];
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-md cms:border cms:bg-card cms:px-2 cms:py-1 cms:text-sm", children: [
        l && /* @__PURE__ */ e.jsx(t.SortableHandle, { ...k, label: `Move ${T?.title ?? g}` }),
        /* @__PURE__ */ e.jsx("span", { className: `cms:min-w-0 cms:flex-1 cms:truncate ${l ? "" : "cms:pl-1"}`, children: T ? T.title : `Entry #${g}` }),
        T && /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: T.collection }),
        T && /* @__PURE__ */ e.jsx(t.Badge, { variant: T.status === "published" ? "success" : "secondary", children: X(T.status) }),
        /* @__PURE__ */ e.jsx(
          t.Button,
          {
            type: "button",
            variant: "ghost",
            size: "icon",
            className: "cms:size-7",
            "aria-label": `Remove ${T?.title ?? g}`,
            onClick: () => w(o.filter((S) => S !== g)),
            children: /* @__PURE__ */ e.jsx(ge, {})
          }
        )
      ] });
    } }),
    !$ && (l || o.length === 0) && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-md", children: [
      /* @__PURE__ */ e.jsx(pe, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
      /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: s,
          className: "cms:pl-9",
          placeholder: "Search entries by title",
          "aria-invalid": c,
          value: x,
          autoComplete: "off",
          onChange: (g) => d(g.target.value)
        }
      ),
      p !== null && /* @__PURE__ */ e.jsxs("ul", { role: "listbox", "aria-label": "Matching entries", className: "cms:absolute cms:z-10 cms:mt-1 cms:max-h-64 cms:w-full cms:overflow-auto cms:rounded-md cms:border cms:bg-card cms:p-1 cms:shadow-md", children: [
        p.filter((g) => !o.includes(g.id)).length === 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: "No entries match." }),
        p.filter((g) => !o.includes(g.id)).map((g) => /* @__PURE__ */ e.jsx("li", { role: "option", "aria-selected": !1, children: /* @__PURE__ */ e.jsxs(
          "button",
          {
            type: "button",
            className: "cms:flex cms:w-full cms:items-center cms:gap-2 cms:rounded cms:px-2 cms:py-1.5 cms:text-left cms:text-sm cms:hover:bg-accent",
            onClick: () => N(g),
            children: [
              /* @__PURE__ */ e.jsx("span", { className: "cms:flex-1 cms:truncate", children: g.title }),
              /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: g.collection })
            ]
          }
        ) }, g.id))
      ] })
    ] }),
    b && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "Entries could not be loaded. Try again." })
  ] });
}
const Es = D.createContext({}), ve = "__none";
async function Fe(s) {
  const a = await fetch(`${_("cms/term-picker")}?${nt(s)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!a.ok) throw new Error(String(a.status));
  return await a.json();
}
function Lt({ id: s, taxonomy: a, multiple: l, max: n, required: r, invalid: c, value: i, onChange: o }) {
  const u = D.useContext(Es), m = i === null ? [] : Array.isArray(i) ? i : [i], [x, d] = D.useState(null), [p, v] = D.useState(!1), [b, h] = D.useState(""), [$, f] = D.useState({}), [N, w] = D.useState(!1);
  D.useEffect(() => {
    if (!a) return;
    const C = b.trim(), A = window.setTimeout(() => {
      Fe({ taxonomy: a, q: C }).then((E) => {
        d(E.items), E.more && v(!0), w(!1);
      }).catch(() => w(!0));
    }, C === "" ? 0 : 250);
    return () => window.clearTimeout(A);
  }, [a, b]);
  const g = (C) => u[String(C)] ?? $[C] ?? x?.find((A) => A.id === C)?.label, k = x === null ? "" : m.filter((C) => g(C) === void 0).join(",");
  if (D.useEffect(() => {
    !a || k === "" || Fe({ taxonomy: a, ids: k.split(",").map(Number) }).then((C) => f((A) => ({ ...A, ...Object.fromEntries(C.items.map((E) => [E.id, E.label])) }))).catch(() => w(!0));
  }, [a, k]), !a) return /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Choose a taxonomy for this field in its blueprint." });
  if (x === null) return N ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "Terms could not be loaded. Try again." }) : /* @__PURE__ */ e.jsx(t.Skeleton, { className: "cms:h-9 cms:w-full cms:max-w-sm" });
  const T = (C) => `${"— ".repeat(C.depth)}${C.label}`, S = l && n !== null && m.length >= n, H = (C) => o(l ? C : C[0] ?? null), R = p && m.length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-1.5", children: m.map((C) => /* @__PURE__ */ e.jsxs(t.Badge, { variant: "secondary", className: "cms:gap-1 cms:pr-1", children: [
    g(C) ?? `Term #${C}`,
    !(r && !l) && /* @__PURE__ */ e.jsx(
      "button",
      {
        type: "button",
        className: "cms:rounded-sm cms:p-0.5 cms:hover:bg-muted",
        "aria-label": `Remove ${g(C) ?? C}`,
        onClick: () => H(m.filter((A) => A !== C)),
        children: /* @__PURE__ */ e.jsx(ge, { className: "cms:size-3" })
      }
    )
  ] }, C)) }), z = p && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-sm", children: [
    /* @__PURE__ */ e.jsx(pe, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
    /* @__PURE__ */ e.jsx(
      t.Input,
      {
        id: s,
        className: "cms:pl-9",
        placeholder: "Search terms",
        autoComplete: "off",
        "aria-invalid": c,
        value: b,
        onChange: (C) => h(C.target.value)
      }
    )
  ] });
  if (!l && !p) {
    const C = m[0], A = C === void 0 || x.some((E) => E.id === C);
    return /* @__PURE__ */ e.jsxs(t.Select, { value: C === void 0 ? ve : String(C), onValueChange: (E) => o(E === ve ? null : Number(E)), children: [
      /* @__PURE__ */ e.jsx(t.SelectTrigger, { id: s, className: "cms:w-full cms:max-w-sm", "aria-invalid": c, children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
      /* @__PURE__ */ e.jsxs(t.SelectContent, { children: [
        !r && /* @__PURE__ */ e.jsx(t.SelectItem, { value: ve, children: "None" }),
        !A && C !== void 0 && /* @__PURE__ */ e.jsx(t.SelectItem, { value: String(C), children: g(C) ?? `Term #${C}` }),
        x.map((E) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: String(E.id), children: T(E) }, E.id))
      ] })
    ] });
  }
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    R,
    z,
    x.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: b.trim() ? "No terms match." : "Nothing to choose from yet." }) : l ? /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:max-h-72 cms:flex-col cms:gap-2 cms:overflow-auto", children: x.map((C) => {
      const A = m.includes(C.id);
      return /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx(
          t.Checkbox,
          {
            checked: A,
            disabled: !A && S,
            onCheckedChange: (E) => H(E ? [...m, C.id] : m.filter((te) => te !== C.id))
          }
        ),
        T(C)
      ] }, C.id);
    }) }) : /* @__PURE__ */ e.jsx("div", { role: "listbox", "aria-label": "Terms", className: "cms:flex cms:max-h-72 cms:flex-col cms:overflow-auto", children: x.map((C) => /* @__PURE__ */ e.jsx(
      t.Button,
      {
        type: "button",
        variant: m[0] === C.id ? "secondary" : "ghost",
        size: "sm",
        className: "cms:justify-start",
        role: "option",
        "aria-selected": m[0] === C.id,
        onClick: () => o(C.id),
        children: T(C)
      },
      C.id
    )) })
  ] });
}
const Mt = 5;
let It = 0;
const Fs = () => `f${++It}`;
function Hs(s) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function Ps(s, a) {
  const l = new Set(a.map((c) => c.handle)), n = Hs(s) || "field";
  let r = n;
  for (let c = 2; l.has(r); c++)
    r = `${n}_${c}`;
  return r;
}
function Rs(s) {
  return (s ?? []).map(({ fields: a, ...l }) => ({
    ...l,
    key: Fs(),
    fields: Rs(a),
    handleTouched: !0
  }));
}
function Vs(s, a) {
  return s.map(({ key: l, handleTouched: n, fields: r, ...c }) => ({
    ...c,
    validation: (c.validation ?? []).map((i) => i.trim()).filter((i) => i !== ""),
    ...a(c.type) ? { fields: Vs(r, a) } : {}
  }));
}
function At(s, a, l) {
  return { key: Fs(), type: s, label: a, handle: Ps(a, l), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function Et(s, a, l) {
  if (s.handleTouched) return { ...s, label: a };
  const n = l.filter((r) => r.key !== s.key);
  return { ...s, label: a, handle: Ps(a || s.type, n) };
}
function fe(s, a) {
  const l = `${a}.`, n = {};
  for (const [r, c] of Object.entries(s))
    r.startsWith(l) && (n[r.slice(l.length)] = c);
  return n;
}
function W(s, a) {
  const l = s[a];
  return { ...fe(s, a), ...l !== void 0 ? { "": l } : {} };
}
function ae(s, a) {
  return Object.keys(s).some((l) => l === a || l.startsWith(`${a}.`));
}
const ye = "__none";
function M({ message: s }) {
  return s ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: s }) : null;
}
function He(s) {
  const a = s.config?.options;
  return Array.isArray(a) ? a.flatMap((l) => {
    if (typeof l == "string") return [{ value: l, label: l }];
    if (l && typeof l == "object" && typeof l.value == "string") {
      const { value: n, label: r } = l;
      return [{ value: n, label: r || n }];
    }
    return [];
  }) : [];
}
const Ft = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function De(s) {
  if (s.label) return s.label;
  const a = s.handle.replace(/_/g, " ");
  return a.charAt(0).toUpperCase() + a.slice(1);
}
function ee({ field: s, value: a, onChange: l, errors: n, id: r, content: c = !1 }) {
  const i = De(s), o = Ft.includes(s.type) || ["select", "terms"].includes(s.type) && s.config?.multiple === !0;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", ...o ? { role: "group", "aria-labelledby": `${r}-label` } : {}, children: [
    s.type === "toggle" ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(t.Switch, { id: r, checked: a === !0, onCheckedChange: (u) => l(u) }),
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: r, children: i })
    ] }) : /* @__PURE__ */ e.jsxs(t.Label, { id: `${r}-label`, htmlFor: o ? void 0 : r, children: [
      i,
      s.required && /* @__PURE__ */ e.jsx("span", { className: "cms:text-destructive", children: " *" })
    ] }),
    /* @__PURE__ */ e.jsx(Ht, { field: s, value: a, onChange: l, errors: n, id: r, content: c }),
    s.instructions && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s.instructions }),
    /* @__PURE__ */ e.jsx(M, { message: n[""] })
  ] });
}
function Ht({ field: s, value: a, onChange: l, errors: n, id: r, content: c }) {
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
          id: r,
          "aria-invalid": i,
          value: typeof a == "string" ? a : "",
          rows: J(s, "rows") ?? 4,
          onChange: (o) => l(o.target.value)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ e.jsx(t.RichTextEditor, { id: r, labelledBy: `${r}-label`, invalid: i, value: typeof a == "string" ? a : "", onChange: l });
    case "number":
      return /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: r,
          type: "number",
          className: "cms:max-w-48",
          "aria-invalid": i,
          value: typeof a == "number" ? String(a) : typeof a == "string" ? a : "",
          min: J(s, "min"),
          max: J(s, "max"),
          step: J(s, "step") ?? "any",
          onChange: (o) => l(o.target.value === "" ? null : Number(o.target.value))
        }
      );
    case "date": {
      const o = s.config?.time === !0;
      return /* @__PURE__ */ e.jsx(
        t.DatePicker,
        {
          id: r,
          withTime: o,
          invalid: i,
          required: s.required === !0,
          value: Ae(Xs(a, o)),
          onChange: (u) => l(Ae(u ?? ""))
        }
      );
    }
    case "select":
      return s.config?.multiple === !0 ? /* @__PURE__ */ e.jsx(Vt, { options: He(s), value: Array.isArray(a) ? a.map(String) : [], onChange: l }) : /* @__PURE__ */ e.jsx(Rt, { options: He(s), value: typeof a == "string" ? a : null, onChange: l, id: r, required: s.required === !0 });
    case "terms": {
      const o = s.config?.multiple === !0, u = Array.isArray(a) ? a.filter((m) => typeof m == "number") : typeof a == "number" ? a : null;
      return /* @__PURE__ */ e.jsx(
        Lt,
        {
          id: r,
          taxonomy: typeof s.taxonomy == "string" ? s.taxonomy : null,
          multiple: o,
          max: J(s, "max") ?? null,
          required: s.required === !0,
          invalid: i,
          value: o ? Array.isArray(u) ? u : [] : typeof u == "number" ? u : null,
          onChange: l
        }
      );
    }
    case "entries":
      return /* @__PURE__ */ e.jsx(
        je,
        {
          id: r,
          invalid: i,
          multiple: s.config?.multiple === !0,
          max: J(s, "max") ?? null,
          collections: s.collections ?? [],
          onChange: l,
          value: typeof a == "number" || Array.isArray(a) && a.every((o) => typeof o == "number") ? a : null
        }
      );
    case "link":
      return /* @__PURE__ */ e.jsx(Ot, { value: ne(a), onChange: l, errors: n, id: r, collections: s.collections ?? [] });
    case "media":
      return /* @__PURE__ */ e.jsx(
        t.MediaPickerInput,
        {
          id: r,
          invalid: i,
          disabled: !1,
          multiple: s.config?.multiple === !0,
          max: J(s, "max") ?? null,
          types: Array.isArray(s.config?.types) ? s.config.types : [],
          value: typeof a == "number" || Array.isArray(a) && a.every((o) => typeof o == "number") ? a : null,
          onChange: l
        }
      );
    case "group":
      return /* @__PURE__ */ e.jsx(se, { fields: s.fields ?? [], value: ne(a), onChange: l, errors: n, id: r, content: c });
    case "repeater":
      return /* @__PURE__ */ e.jsx(Kt, { field: s, value: Array.isArray(a) ? a : [], onChange: l, errors: n, id: r, content: c });
    case "flexible":
      return /* @__PURE__ */ e.jsx(Wt, { field: s, value: Array.isArray(a) ? a : [], onChange: l, errors: n, id: r });
    default:
      return /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: r,
          "aria-invalid": i,
          value: typeof a == "string" ? a : "",
          placeholder: Pt(s, "placeholder"),
          maxLength: J(s, "max"),
          onChange: (o) => l(o.target.value)
        }
      );
  }
}
function J(s, a) {
  const l = s.config?.[a];
  return typeof l == "number" ? l : void 0;
}
function Pt(s, a) {
  const l = s.config?.[a];
  return typeof l == "string" ? l : void 0;
}
function se({ fields: s, value: a, onChange: l, errors: n, id: r, content: c, bare: i = !1 }) {
  return /* @__PURE__ */ e.jsx("div", { className: i ? "cms:flex cms:flex-col cms:gap-6" : "cms:flex cms:flex-col cms:gap-4 cms:rounded-lg cms:border cms:p-4", children: s.map((o) => o.shared ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
    /* @__PURE__ */ e.jsx(ee, { id: `${r}-${o.handle}`, field: o, value: a[o.handle], content: c, errors: {}, onChange: () => {
    } }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Shared by all languages: edit it in the main language." })
  ] }, o.handle) : /* @__PURE__ */ e.jsx(
    ee,
    {
      id: `${r}-${o.handle}`,
      field: o,
      value: a[o.handle],
      content: c,
      errors: W(n, o.handle),
      onChange: (u) => l({ ...a, [o.handle]: u })
    },
    o.handle
  )) });
}
function Rt({ options: s, value: a, onChange: l, id: n, required: r }) {
  return /* @__PURE__ */ e.jsxs(t.Select, { value: a ?? ye, onValueChange: (c) => l(c === ye ? null : c), children: [
    /* @__PURE__ */ e.jsx(t.SelectTrigger, { id: n, className: "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
    /* @__PURE__ */ e.jsxs(t.SelectContent, { children: [
      !r && /* @__PURE__ */ e.jsx(t.SelectItem, { value: ye, children: "None" }),
      s.map((c) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: c.value, children: c.label }, c.value))
    ] })
  ] });
}
function Vt({ options: s, value: a, onChange: l }) {
  return s.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Nothing to choose from yet." }) : /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2", children: s.map((n) => /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
    /* @__PURE__ */ e.jsx(
      t.Checkbox,
      {
        checked: a.includes(n.value),
        onCheckedChange: (r) => l(r ? s.map((c) => c.value).filter((c) => c === n.value || a.includes(c)) : a.filter((c) => c !== n.value))
      }
    ),
    n.label
  ] }, n.value)) });
}
function Ot({ value: s, onChange: a, errors: l, id: n, collections: r }) {
  const c = s.type === "entry" ? "entry" : "url", i = (o) => {
    const u = { ...s, type: c, ...o }, m = u.type === "entry" ? typeof u.entry_id != "number" : u.url === "" || u.url === void 0 || u.url === null;
    a(m ? u.label || u.new_tab ? u : null : u);
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("div", { role: "radiogroup", "aria-label": "Link to", className: "cms:inline-flex cms:w-fit cms:rounded-md cms:border cms:p-0.5", children: ["url", "entry"].map((o) => /* @__PURE__ */ e.jsx(
      t.Button,
      {
        type: "button",
        size: "sm",
        role: "radio",
        "aria-checked": c === o,
        variant: c === o ? "secondary" : "ghost",
        onClick: () => i({ type: o, url: o === "url" ? s.url : void 0, entry_id: o === "entry" ? s.entry_id : void 0 }),
        children: o === "url" ? "Address" : "Entry"
      },
      o
    )) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-2 cms:md:grid-cols-[2fr_1fr_auto] cms:md:items-start", children: [
      c === "url" ? /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: n,
          "aria-label": "Address",
          placeholder: "https://… or /about",
          value: typeof s.url == "string" ? s.url : "",
          onChange: (o) => i({ url: o.target.value }),
          "aria-invalid": l.url !== void 0
        }
      ) : /* @__PURE__ */ e.jsx(
        je,
        {
          id: n,
          invalid: l.entry_id !== void 0,
          multiple: !1,
          max: null,
          collections: r,
          value: typeof s.entry_id == "number" ? s.entry_id : null,
          onChange: (o) => i({ entry_id: typeof o == "number" ? o : void 0 })
        }
      ),
      /* @__PURE__ */ e.jsx(
        t.Input,
        {
          "aria-label": "Link text",
          placeholder: c === "entry" ? "Link text (the entry's title)" : "Link text",
          value: typeof s.label == "string" ? s.label : "",
          onChange: (o) => i({ label: o.target.value })
        }
      ),
      /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:h-9 cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx(t.Checkbox, { checked: s.new_tab === !0, onCheckedChange: (o) => i({ new_tab: o }) }),
        "New tab"
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ e.jsx(M, { message: l.url ?? l.entry_id ?? l.label ?? l.type }) })
    ] })
  ] });
}
function Ut(s, a) {
  return !a && (s.fields ?? []).every((l) => l.type === "text");
}
function Os(s) {
  const a = D.useRef([]);
  return a.current = lt(a.current, s), {
    keys: a.current,
    remove: (l) => {
      a.current = a.current.filter((n, r) => r !== l);
    },
    move: (l, n) => {
      a.current = t.moveItem(a.current, l, n);
    }
  };
}
function Kt({ field: s, value: a, onChange: l, errors: n, id: r, content: c = !1 }) {
  const i = s.fields ?? [], o = a.map(ne), u = Os(o.length), m = (b, h) => l(o.map(($, f) => f === b ? h : $)), x = (b) => {
    u.remove(b), l(o.filter((h, $) => $ !== b));
  }, d = (s.label || "row").toLowerCase().replace(/s$/, ""), p = d.charAt(0).toUpperCase() + d.slice(1), v = o.map((b, h) => ({ row: b, index: h, key: u.keys[h] ?? String(h) }));
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(
      t.SortableList,
      {
        items: v,
        getId: (b) => b.key,
        onReorder: (b, h, $) => {
          u.move(h, $), l(b.map((f) => f.row));
        },
        children: ({ row: b, index: h }, { handle: $ }) => Ut(s, c) ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(t.SortableHandle, { ...$, label: `Move ${d} ${h + 1}`, className: "cms:mt-1" }),
          i.map((f) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
            /* @__PURE__ */ e.jsx(
              t.Input,
              {
                "aria-label": f.label || f.handle,
                placeholder: f.label || f.handle,
                value: typeof b[f.handle] == "string" ? b[f.handle] : "",
                onChange: (N) => m(h, { ...b, [f.handle]: N.target.value })
              }
            ),
            /* @__PURE__ */ e.jsx(M, { message: n[`${h}.${f.handle}`] })
          ] }, f.handle)),
          /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": `Remove ${d} ${h + 1}`, onClick: () => x(h), children: /* @__PURE__ */ e.jsx(V, {}) })
        ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(
            Us,
            {
              label: `${p} ${h + 1}`,
              handle: $,
              onRemove: () => x(h),
              hidden: c ? b._hidden === !0 : void 0,
              onHidden: (f) => m(h, { ...b, _hidden: f })
            }
          ),
          /* @__PURE__ */ e.jsx(se, { fields: i, value: b, onChange: (f) => m(h, f), errors: W(n, String(h)), id: `${r}-${h}`, content: c })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", size: "sm", onClick: () => l([...o, c ? et() : {}]), children: [
      /* @__PURE__ */ e.jsx(q, {}),
      " Add ",
      d
    ] }) })
  ] });
}
function Wt({ field: s, value: a, onChange: l, errors: n, id: r }) {
  const c = s.blocks ?? [], i = a.map(ne), o = Os(i.length), u = (d, p) => l(i.map((v, b) => b === d ? p : v)), m = (d) => {
    o.remove(d), l(i.filter((p, v) => v !== d));
  }, x = i.map((d, p) => ({ block: d, index: p, key: o.keys[p] ?? String(p) }));
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    /* @__PURE__ */ e.jsx(
      t.SortableList,
      {
        items: x,
        getId: (d) => d.key,
        className: "cms:gap-3",
        onReorder: (d, p, v) => {
          o.move(p, v), l(d.map((b) => b.block));
        },
        children: ({ block: d, index: p }, { handle: v }) => {
          const b = c.find((h) => h.type === d.type);
          return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              Us,
              {
                label: b?.label ?? String(d.type),
                badge: !0,
                handle: v,
                onRemove: () => m(p),
                hidden: d.hidden === !0,
                onHidden: (h) => u(p, { ...d, hidden: h })
              }
            ),
            b ? /* @__PURE__ */ e.jsx(
              se,
              {
                fields: b.fields,
                value: ne(d.values),
                onChange: (h) => u(p, { ...d, values: h }),
                errors: W(n, `${p}.values`),
                id: `${r}-${p}`,
                content: !0
              }
            ) : /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: "This kind of block no longer exists. Its values are kept." }),
            /* @__PURE__ */ e.jsx(M, { message: n[`${p}.type`] })
          ] });
        }
      }
    ),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(t.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(t.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", size: "sm", disabled: c.length === 0, children: [
        /* @__PURE__ */ e.jsx(q, {}),
        " Add block"
      ] }) }),
      /* @__PURE__ */ e.jsx(t.DropdownMenuContent, { align: "start", children: c.map((d) => /* @__PURE__ */ e.jsx(t.DropdownMenuItem, { onSelect: () => l([...i, st(d.type)]), children: d.label }, d.type)) })
    ] }) })
  ] });
}
function Us({ label: s, badge: a = !1, handle: l, onRemove: n, hidden: r, onHidden: c }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(t.SortableHandle, { ...l, label: `Move ${s}` }),
    a ? /* @__PURE__ */ e.jsx(t.Badge, { variant: "secondary", children: s }) : /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:font-medium", children: s }),
    r !== void 0 && /* @__PURE__ */ e.jsxs("label", { className: "cms:ml-auto cms:flex cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", children: [
      /* @__PURE__ */ e.jsx(t.Switch, { checked: !r, onCheckedChange: (i) => c(!i), "aria-label": `Show ${s}` }),
      "Show"
    ] }),
    /* @__PURE__ */ e.jsx(
      t.Button,
      {
        type: "button",
        variant: "ghost",
        size: "icon",
        className: `cms:size-8 cms:text-destructive ${r === void 0 ? "cms:ml-auto" : ""}`,
        "aria-label": `Remove ${s}`,
        onClick: n,
        children: /* @__PURE__ */ e.jsx(V, {})
      }
    )
  ] });
}
function Ks({ fields: s, onChange: a, types: l, errors: n, depth: r = 1, idPrefix: c = "field" }) {
  const [i, o] = D.useState(() => /* @__PURE__ */ new Set()), u = (d) => o((p) => {
    const v = new Set(p);
    return v.has(d) ? v.delete(d) : v.add(d), v;
  }), m = (d, p) => a(s.map((v, b) => b === d ? p : v)), x = (d) => {
    const p = At(d.type, d.label, s);
    a([...s, p]), o((v) => new Set(v).add(p.key));
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:border-dashed cms:p-4 cms:text-sm cms:text-muted-foreground", children: "No fields yet." }),
    /* @__PURE__ */ e.jsx(t.SortableList, { items: s, getId: (d) => d.key, onReorder: (d) => a(d), children: (d, { index: p, handle: v, isOverlay: b }) => {
      const h = l.find((N) => N.type === d.type), $ = !b && (i.has(d.key) || ae(n, String(p))), f = `${c}-${d.key}`;
      return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${ae(n, String(p)) ? "cms:border-destructive" : ""}`, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:p-2", children: [
          /* @__PURE__ */ e.jsx(t.SortableHandle, { ...v, label: `Move ${d.label || d.handle}` }),
          /* @__PURE__ */ e.jsx(
            t.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-expanded": $,
              "aria-controls": f,
              "aria-label": `${$ ? "Close" : "Open"} ${d.label || d.handle}`,
              onClick: () => u(d.key),
              children: $ ? /* @__PURE__ */ e.jsx(cs, {}) : /* @__PURE__ */ e.jsx(xe, {})
            }
          ),
          /* @__PURE__ */ e.jsxs("button", { type: "button", className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:text-left", onClick: () => u(d.key), children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: d.label || d.handle }),
            /* @__PURE__ */ e.jsx("code", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", children: d.handle })
          ] }),
          d.required && /* @__PURE__ */ e.jsx(t.Badge, { variant: "outline", children: "Required" }),
          /* @__PURE__ */ e.jsx(t.Badge, { variant: "secondary", children: h?.label ?? d.type }),
          h?.hasChildren && d.fields.length > 0 && !$ && /* @__PURE__ */ e.jsxs("span", { className: "cms:text-xs cms:text-muted-foreground", children: [
            d.fields.length,
            " inside"
          ] }),
          /* @__PURE__ */ e.jsx(
            t.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Remove ${d.label || d.handle}`,
              onClick: () => a(s.filter((N, w) => w !== p)),
              children: /* @__PURE__ */ e.jsx(V, {})
            }
          )
        ] }),
        $ && /* @__PURE__ */ e.jsx(
          Gt,
          {
            id: f,
            field: d,
            type: h,
            siblings: s,
            onChange: (N) => m(p, N),
            types: l,
            errors: fe(n, String(p)),
            depth: r
          }
        )
      ] });
    } }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(t.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(t.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", size: "sm", children: [
        /* @__PURE__ */ e.jsx(q, {}),
        " Add field"
      ] }) }),
      /* @__PURE__ */ e.jsx(t.DropdownMenuContent, { align: "start", children: l.filter((d) => !d.hasChildren || r < Mt).map((d) => /* @__PURE__ */ e.jsx(t.DropdownMenuItem, { onSelect: () => x(d), children: d.label }, d.type)) })
    ] }) })
  ] });
}
const Y = { default: "__default", yes: "yes", no: "no" };
function Gt({ id: s, field: a, type: l, siblings: n, onChange: r, types: c, errors: i, depth: o }) {
  const u = a.config ?? {};
  return /* @__PURE__ */ e.jsxs("div", { id: s, className: "cms:flex cms:flex-col cms:gap-4 cms:border-t cms:p-4", children: [
    !l && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-destructive", children: [
      'The field type "',
      a.type,
      `" isn't registered. Its data is kept; register the type or remove the field.`
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${s}-label`, children: "Label" }),
        /* @__PURE__ */ e.jsx(t.Input, { id: `${s}-label`, value: a.label ?? "", onChange: (m) => r(Et(a, m.target.value, n)) }),
        /* @__PURE__ */ e.jsx(M, { message: i.label })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${s}-handle`, children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          t.Input,
          {
            id: `${s}-handle`,
            className: "cms:font-mono",
            value: a.handle,
            onChange: (m) => r({ ...a, handle: m.target.value, handleTouched: !0 })
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "How templates read it. Renaming it hides values saved under the old one." }),
        /* @__PURE__ */ e.jsx(M, { message: i.handle })
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
          onChange: (m) => r({ ...a, instructions: m.target.value || null })
        }
      ),
      /* @__PURE__ */ e.jsx(M, { message: i.instructions })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-6", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(t.Switch, { id: `${s}-required`, checked: a.required === !0, onCheckedChange: (m) => r({ ...a, required: m }) }),
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${s}-required`, children: "Required" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${s}-translatable`, children: "Per language" }),
        /* @__PURE__ */ e.jsxs(
          t.Select,
          {
            value: a.translatable === !0 ? Y.yes : a.translatable === !1 ? Y.no : Y.default,
            onValueChange: (m) => r({ ...a, translatable: m === Y.yes ? !0 : m === Y.no ? !1 : null }),
            children: [
              /* @__PURE__ */ e.jsx(t.SelectTrigger, { id: `${s}-translatable`, className: "cms:w-48", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
              /* @__PURE__ */ e.jsxs(t.SelectContent, { children: [
                /* @__PURE__ */ e.jsx(t.SelectItem, { value: Y.default, children: "As the type decides" }),
                /* @__PURE__ */ e.jsx(t.SelectItem, { value: Y.yes, children: "Yes, translated" }),
                /* @__PURE__ */ e.jsx(t.SelectItem, { value: Y.no, children: "No, shared" })
              ] })
            ]
          }
        )
      ] })
    ] }),
    (l?.settings.length ?? 0) > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: l?.settings.map((m) => /* @__PURE__ */ e.jsx(
      ee,
      {
        id: `${s}-config-${m.handle}`,
        field: m,
        value: u[m.handle],
        errors: W(i, `config.${m.handle}`),
        onChange: (x) => r({ ...a, config: { ...u, [m.handle]: x } })
      },
      m.handle
    )) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${s}-validation`, children: "Extra rules" }),
      /* @__PURE__ */ e.jsx(
        t.Textarea,
        {
          id: `${s}-validation`,
          rows: 2,
          className: "cms:font-mono",
          placeholder: `min:3
regex:/^[A-Z]/`,
          value: (a.validation ?? []).join(`
`),
          onChange: (m) => r({ ...a, validation: m.target.value.split(`
`) })
        }
      ),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Laravel rules, one per line." }),
      /* @__PURE__ */ e.jsx(M, { message: i.validation ?? Object.entries(i).find(([m]) => m.startsWith("validation."))?.[1] })
    ] }),
    l?.hasChildren && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(t.Label, { children: "Fields inside" }),
      /* @__PURE__ */ e.jsx(
        Ks,
        {
          fields: a.fields,
          onChange: (m) => r({ ...a, fields: m }),
          types: c,
          errors: fe(i, "fields"),
          depth: o + 1,
          idPrefix: s
        }
      ),
      /* @__PURE__ */ e.jsx(M, { message: i.fields })
    ] }),
    /* @__PURE__ */ e.jsx(M, { message: i.type })
  ] });
}
function qt({ kind: s = "blueprint", blueprint: a, fieldTypes: l, usedBy: n = [] }) {
  const r = s === "fieldset" ? "Fieldset" : "Blueprint", c = _(s === "fieldset" ? "cms/fieldsets" : "cms/blueprints"), i = a ? a.title : `New ${r.toLowerCase()}`;
  t.useBreadcrumbs([{ label: `${r}s`, href: c }, { label: i }]);
  const [o, u] = Q(), m = y.useForm({ title: a?.title ?? "", handle: a?.handle ?? "" }), [x, d] = D.useState(a !== null), [p, v] = D.useState(() => Rs(a?.fields)), b = (S) => l.find((H) => H.type === S)?.hasChildren === !0, h = m.errors, [$, f] = D.useState(() => JSON.stringify(p)), N = m.isDirty || JSON.stringify(p) !== $, w = () => {
    m.setDefaults(), f(JSON.stringify(p));
  }, g = () => {
    m.processing || (m.transform((S) => ({
      ...a ? { title: S.title } : S,
      fields: Vs(p, b)
    })), a ? m.put(`${c}/${a.id}`, { preserveScroll: !0, onSuccess: w }) : m.post(c, { onSuccess: w }));
  }, k = (S) => {
    S.preventDefault(), g();
  };
  t.useUnsavedChanges(N, g);
  const T = () => a && o(
    `Delete the ${r.toLowerCase()} "${a.title}"? Content keeps its values.`,
    () => y.router.delete(`${c}/${a.id}`, { preserveScroll: !0 })
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: k, className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: i }),
    u,
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: i,
        back: { href: c, label: `Back to ${r.toLowerCase()}s` },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          a && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "outline", size: "icon", className: "cms:text-destructive", "aria-label": `Delete ${i}`, onClick: T, children: /* @__PURE__ */ e.jsx(V, {}) }),
          /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", disabled: m.processing, children: [
            m.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
            a ? "Save" : `Create ${r.toLowerCase()}`
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(M, { message: h.blueprint ?? h.fieldset }),
    /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsxs(t.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "title", children: "Title" }),
        /* @__PURE__ */ e.jsx(t.Input, { id: "title", value: m.data.title, required: !0, onChange: (S) => {
          m.setData((H) => ({ ...H, title: S.target.value, handle: x ? H.handle : Hs(S.target.value) }));
        } }),
        /* @__PURE__ */ e.jsx(M, { message: h.title })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "handle", children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          t.Input,
          {
            id: "handle",
            className: "cms:font-mono",
            value: m.data.handle,
            disabled: a !== null,
            required: !0,
            onChange: (S) => {
              d(!0), m.setData("handle", S.target.value);
            }
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: a ? "Set when it was created." : "Lowercase letters, digits and underscores. It can't change later." }),
        /* @__PURE__ */ e.jsx(M, { message: h.handle })
      ] })
    ] }) }),
    n.length > 0 && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      "Used by ",
      n.join(", "),
      ". Changes show there at once."
    ] }),
    /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-3", "aria-labelledby": "fields-heading", children: [
      /* @__PURE__ */ e.jsx("h2", { id: "fields-heading", className: "cms:text-lg cms:font-medium", children: "Fields" }),
      /* @__PURE__ */ e.jsx(Ks, { fields: p, onChange: v, types: l, errors: fe(h, "fields") }),
      /* @__PURE__ */ e.jsx(M, { message: h.fields })
    ] })
  ] });
}
function Ws({ noun: s, base: a, rows: l, intro: n }) {
  const r = `${s}s`;
  t.useBreadcrumbs([{ label: r }]);
  const [c, i] = Q();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: r }),
    i,
    /* @__PURE__ */ e.jsx(t.PageHeader, { title: r, description: n, actions: /* @__PURE__ */ e.jsx(t.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(y.Link, { href: `${a}/create`, children: [
      /* @__PURE__ */ e.jsx(q, {}),
      " New ",
      s.toLowerCase()
    ] }) }) }),
    /* @__PURE__ */ e.jsx(t.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(t.Table, { children: [
      /* @__PURE__ */ e.jsx(t.TableHeader, { children: /* @__PURE__ */ e.jsxs(t.TableRow, { children: [
        /* @__PURE__ */ e.jsx(t.TableHead, { children: "Title" }),
        /* @__PURE__ */ e.jsx(t.TableHead, { children: "Handle" }),
        /* @__PURE__ */ e.jsx(t.TableHead, { children: "Fields" }),
        l.some((o) => o.usedBy) && /* @__PURE__ */ e.jsx(t.TableHead, { children: "Used by" }),
        /* @__PURE__ */ e.jsx(t.TableHead, { className: "cms:w-12", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: "Actions" }) })
      ] }) }),
      /* @__PURE__ */ e.jsxs(t.TableBody, { children: [
        l.length === 0 && /* @__PURE__ */ e.jsx(t.TableRow, { children: /* @__PURE__ */ e.jsxs(t.TableCell, { colSpan: 5, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: [
          "No ",
          r.toLowerCase(),
          " yet."
        ] }) }),
        l.map((o) => /* @__PURE__ */ e.jsxs(t.TableRow, { children: [
          /* @__PURE__ */ e.jsx(t.TableCell, { children: /* @__PURE__ */ e.jsx(y.Link, { href: `${a}/${o.id}/edit`, className: "cms:font-medium cms:hover:underline", children: o.title }) }),
          /* @__PURE__ */ e.jsx(t.TableCell, { children: /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: o.handle }) }),
          /* @__PURE__ */ e.jsx(t.TableCell, { children: o.fields }),
          o.usedBy && /* @__PURE__ */ e.jsx(t.TableCell, { className: "cms:text-muted-foreground", children: o.usedBy.join(", ") || "—" }),
          /* @__PURE__ */ e.jsx(t.TableCell, { children: /* @__PURE__ */ e.jsx(
            t.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Delete ${o.title}`,
              onClick: () => c(
                `Delete the ${s.toLowerCase()} "${o.title}"? Content keeps its values.`,
                () => y.router.delete(`${a}/${o.id}`, { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(V, {})
            }
          ) })
        ] }, o.id))
      ] })
    ] }) })
  ] });
}
function Jt({ blueprints: s }) {
  const a = y.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(M, { message: a.blueprint }),
    /* @__PURE__ */ e.jsx(
      Ws,
      {
        noun: "Blueprint",
        base: _("cms/blueprints"),
        rows: s,
        intro: "The fields editors fill in, for each kind of content."
      }
    )
  ] });
}
const Pe = { preserveScroll: !0, preserveState: !0 };
function Yt({ entryId: s, comments: a }) {
  const [l, n] = D.useState(null), [r, c] = D.useState(""), [i, o] = D.useState(!1), u = (x, d) => y.router.post(_(`cms/comments/${x}/status`), { status: d }, Pe), m = (x) => y.router.post(_(`cms/comments/${x}/reply`), { body: r }, {
    ...Pe,
    onStart: () => o(!0),
    onFinish: () => o(!1),
    onSuccess: () => {
      n(null), c("");
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
            G(x.createdAt),
            x.reply ? " · a reply" : ""
          ] }),
          a.canModerate && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-1", children: [
            x.status === "pending" && /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", size: "sm", onClick: () => u(x.id, "approved"), children: [
              /* @__PURE__ */ e.jsx(ue, {}),
              " Approve"
            ] }),
            /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => u(x.id, "spam"), children: [
              /* @__PURE__ */ e.jsx($e, {}),
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
                  n(l === x.id ? null : x.id), c("");
                },
                children: [
                  /* @__PURE__ */ e.jsx(ks, {}),
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
                value: r,
                onChange: (d) => c(d.target.value)
              }
            ),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
              /* @__PURE__ */ e.jsx(t.Button, { type: "button", size: "sm", disabled: r.trim() === "" || i, onClick: () => m(x.id), children: "Post reply" }),
              /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => n(null), children: "Cancel" })
            ] })
          ] })
        ] }, x.id)),
        /* @__PURE__ */ e.jsx("a", { href: _(`cms/comments?entry=${s}`), className: "cms:text-sm cms:font-medium cms:underline-offset-4 cms:hover:underline", children: "All comments on this entry" })
      ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Skeleton, { className: "cms:h-10" }),
        /* @__PURE__ */ e.jsx(t.Skeleton, { className: "cms:h-10" })
      ] })
    }
  );
}
function ze({ fields: s, values: a, onChange: l, errors: n, storageKey: r, shared: c = [], sharedValues: i = {}, sharedNote: o, disabled: u = !1 }) {
  const m = [];
  for (const d of s) {
    const p = m[m.length - 1];
    d.type === "group" ? m.push(d) : Array.isArray(p) ? p.push(d) : m.push([d]);
  }
  const x = o ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: o }) : null;
  return /* @__PURE__ */ e.jsx(e.Fragment, { children: m.map((d) => {
    if (Array.isArray(d))
      return /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsx(t.CardContent, { children: /* @__PURE__ */ e.jsx("fieldset", { disabled: u, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: d.map((h) => c.includes(h.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(ee, { id: `data-${h.handle}`, field: h, content: !0, value: i[h.handle], errors: {}, onChange: () => {
        } }),
        x
      ] }, h.handle) : /* @__PURE__ */ e.jsx(
        ee,
        {
          id: `data-${h.handle}`,
          field: h,
          content: !0,
          value: a[h.handle],
          errors: W(n, `data.${h.handle}`),
          onChange: ($) => l(h.handle, $)
        },
        h.handle
      )) }) }) }, `fields-${d[0]?.handle ?? ""}`);
    const p = c.includes(d.handle), v = (p ? i : a)[d.handle], b = W(n, `data.${d.handle}`);
    return /* @__PURE__ */ e.jsx(
      t.CollapsibleCard,
      {
        title: De(d),
        titleClassName: "cms:text-base",
        description: d.instructions ?? void 0,
        storageKey: `${r}:${d.handle}`,
        hasErrors: !p && ae(n, `data.${d.handle}`),
        children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: p || u, role: "group", "aria-label": De(d), className: "cms:flex cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(
            se,
            {
              bare: !0,
              fields: d.fields ?? [],
              id: `data-${d.handle}`,
              content: !0,
              errors: p ? {} : b,
              value: v && typeof v == "object" && !Array.isArray(v) ? v : {},
              onChange: (h) => l(d.handle, h)
            }
          ),
          p && x,
          /* @__PURE__ */ e.jsx(M, { message: p ? void 0 : b[""] })
        ] })
      },
      d.handle
    );
  }) });
}
const Le = [
  { handle: "title", type: "text", label: "SEO title", instructions: "For search results and tabs. Empty: the title.", config: { max: 255 } },
  { handle: "description", type: "textarea", label: "Description", instructions: "A sentence or two for search results and shared links.", config: { max: 500 } },
  { handle: "image", type: "media", label: "Share image", instructions: "Shown when the page is shared.", config: { types: ["image"] } },
  { handle: "noindex", type: "toggle", label: "Hide from search engines" },
  { handle: "canonical", type: "text", label: "Canonical address", instructions: "Only when this page copies one elsewhere: that page's full address. Empty: this page.", config: { max: 2e3 } }
];
function Re(s) {
  return s.length === 0 ? "" : ` It's used by ${s.slice(0, 5).map((l) => l.label).join("; ")}${s.length > 5 ? ` and ${s.length - 5} more` : ""}: those links will show nothing.`;
}
function Qt(s) {
  const { entry: a } = s;
  return /* @__PURE__ */ e.jsx(Zt, { ...s }, a ? `${a.id}:${a.locale}:${a.version}:${a.status}:${a.trashed}:${a.publishedAt}` : "new");
}
function Zt({ collection: s, fields: a, locales: l = [], shared: n = [], sharedValues: r = {}, entry: c, values: i, revisions: o, comments: u, termLabels: m, usedBy: x = [], undoRestore: d = null, machineTranslate: p = null, settings: v, blueprints: b = [], can: h }) {
  const $ = _(`cms/collections/${s.handle}/entries`), f = c ? _(`cms/entries/${c.id}`) : $, N = c ? i.title : "New entry";
  t.useBreadcrumbs([{ label: s.title, href: $ }, { label: N }]);
  const [w, g] = Q(), [k, T] = D.useState(!1), S = y.useForm({ ...i, seo: i.seo ?? {}, locale: c?.locale ?? null, version: c?.version ?? null, publish: !1, published_at: null }), H = c ? { locale: c.locale } : {}, R = l.find((B) => B.main)?.code, z = S.errors, C = c !== null && c.status !== "draft" && !c.hasUnpublishedChanges && !S.isDirty, A = c === null ? h.create : h.update && !c.trashed, E = (B = !1, K = null) => {
    S.transform((j) => ({ ...j, publish: B, published_at: K })), c ? S.put(f, { preserveScroll: !0, onSuccess: () => T(!1) }) : S.post(f);
  }, te = () => {
    S.transform((B) => ({ ...B, version: null, publish: !1, published_at: null })), S.put(f, { preserveScroll: !0 });
  }, U = t.useEditLock({
    type: "cms.entry",
    id: c?.id,
    locale: c?.locale,
    enabled: c !== null && A,
    noun: "entry",
    leaveTo: $,
    getUnsaved: () => S.isDirty ? { title: S.data.title, slug: S.data.slug, data: S.data.data, seo: S.data.seo } : null
  }), O = A && !U.readOnly, ie = async (B) => {
    const K = await U.loadKept(B);
    S.setData((j) => ({ ...j, title: K.title ?? j.title, slug: K.slug ?? j.slug, data: K.data ?? j.data, seo: K.seo ?? j.seo }));
  };
  t.useUnsavedChanges(S.isDirty && !U.takenOver, O ? () => S.processing || E() : void 0);
  const oe = (B = null) => {
    h.update ? E(!0, B) : c && y.router.post(`${f}/publish`, { ...H, published_at: B }, { preserveScroll: !0, onSuccess: () => T(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (B) => {
    B.preventDefault(), E();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: N }),
    g,
    U.dialogs,
    /* @__PURE__ */ e.jsxs(
      t.PageHeader,
      {
        title: N,
        back: { href: $, label: `Back to ${s.title}` },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          c && !c.trashed && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(
            "a",
            {
              href: c.previewUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              title: S.isDirty ? "Shows the saved draft: save first to see your changes." : "Shows the saved draft.",
              children: [
                /* @__PURE__ */ e.jsx(Nt, {}),
                " Preview"
              ]
            }
          ) }),
          c?.url && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: c.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(re, {}),
            " View"
          ] }) }),
          c?.trashed && h.delete && /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", onClick: () => y.router.post(`${f}/restore`, {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(he, {}),
            " Restore"
          ] }),
          c?.trashed && h.delete && /* @__PURE__ */ e.jsxs(
            t.Button,
            {
              type: "button",
              variant: "outline",
              className: "cms:text-destructive",
              onClick: () => w(
                `Delete "${i.title}" for good, in every language, with its revisions? This can't be undone.${Re(x)}`,
                () => y.router.delete(`${f}/force`, { data: x.length > 0 ? { force: 1 } : {} })
              ),
              children: [
                /* @__PURE__ */ e.jsx(V, {}),
                " Delete for good"
              ]
            }
          ),
          c && !c.trashed && h.create && /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "ghost", title: "Copy every language as a new draft", onClick: () => y.router.post(`${f}/duplicate`), children: [
            /* @__PURE__ */ e.jsx(yt, {}),
            " Duplicate"
          ] }),
          c && !c.trashed && h.delete && !U.readOnly && /* @__PURE__ */ e.jsx(
            t.Button,
            {
              type: "button",
              variant: "outline",
              size: "icon",
              className: "cms:text-destructive",
              "aria-label": "Move to the trash",
              onClick: () => w(`Move "${i.title}" to the trash? It comes off the site; you can restore it.${Re(x)}`, () => y.router.delete(f)),
              children: /* @__PURE__ */ e.jsx(V, {})
            }
          ),
          c && O && p !== null && /* @__PURE__ */ e.jsxs(
            t.Button,
            {
              type: "button",
              variant: "outline",
              disabled: S.processing || S.isDirty,
              title: S.isDirty ? "Save your changes first" : "Fill in what isn't translated yet, into the draft",
              onClick: () => y.router.post(_(`cms/entries/${p}/translate`), { version: c.version }, { preserveScroll: !0 }),
              children: [
                /* @__PURE__ */ e.jsx(Ct, {}),
                " Translate from ",
                l.find((B) => B.main)?.name ?? (R ? P(R) : "the main language")
              ]
            }
          ),
          O && /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", variant: c && h.publish ? "outline" : "default", disabled: S.processing, children: [
            S.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
            c ? "Save draft" : "Create draft"
          ] }),
          c && !c.trashed && h.publish && !U.readOnly && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex", children: [
            /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: C ? "outline" : "default", className: "cms:rounded-r-none cms:disabled:opacity-100", disabled: S.processing || C, onClick: () => oe(), children: [
              C && /* @__PURE__ */ e.jsx(ue, { className: "cms:text-emerald-600 cms:dark:text-emerald-400" }),
              c.status === "draft" ? "Publish" : C ? "Published" : "Publish changes"
            ] }),
            /* @__PURE__ */ e.jsxs(t.DropdownMenu, { children: [
              /* @__PURE__ */ e.jsx(t.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(t.Button, { type: "button", size: "icon", variant: C ? "outline" : "default", className: C ? "cms:-ml-px cms:rounded-l-none" : "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": "More publishing options", children: /* @__PURE__ */ e.jsx(cs, {}) }) }),
              /* @__PURE__ */ e.jsxs(t.DropdownMenuContent, { align: "end", children: [
                /* @__PURE__ */ e.jsxs(t.DropdownMenuItem, { onSelect: () => T(!0), children: [
                  /* @__PURE__ */ e.jsx(ft, {}),
                  " Publish on a date…"
                ] }),
                c.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  /* @__PURE__ */ e.jsx(t.DropdownMenuSeparator, {}),
                  /* @__PURE__ */ e.jsx(t.DropdownMenuItem, { onSelect: () => y.router.post(`${f}/unpublish`, H, { preserveScroll: !0 }), children: "Unpublish" })
                ] })
              ] })
            ] })
          ] })
        ] }),
        children: [
          c && /* @__PURE__ */ e.jsx(t.Badge, { variant: c.status === "published" ? "success" : "secondary", children: c.trashed ? "In the trash" : X(c.status) }),
          S.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
        ]
      }
    ),
    c && l.length > 1 && /* @__PURE__ */ e.jsx(
      Xt,
      {
        entryUrl: f,
        current: c.locale,
        locales: l,
        canAdd: h.create && !c.trashed,
        canRemove: h.delete && !c.isMain && !c.trashed,
        onRemove: () => w(
          `Remove the ${P(c.locale)} translation of "${i.title}"? Its revisions go with it.`,
          () => y.router.delete(`${f}/translations/${c.locale}`)
        )
      }
    ),
    /* @__PURE__ */ e.jsx(t.ViewingNotice, { by: U.viewingBy }),
    /* @__PURE__ */ e.jsx(t.KeptEditsNotice, { kept: U.kept, disabled: !O, onLoad: (B) => {
      ie(B);
    }, onDiscard: (B) => {
      U.discardKept(B);
    } }),
    z.version && /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: [
      /* @__PURE__ */ e.jsx("span", { children: z.version }),
      /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "outline", size: "sm", onClick: () => y.router.reload(), children: "Load theirs" }),
        /* @__PURE__ */ e.jsx(
          t.Button,
          {
            type: "button",
            variant: "destructive",
            size: "sm",
            disabled: S.processing,
            onClick: () => w("Save your version over theirs? Their changes are replaced (their earlier published versions stay in the revisions).", te),
            children: "Save mine anyway"
          }
        )
      ] })
    ] }),
    (z.entry || z.published_at) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: z.entry ?? z.published_at }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_18rem]", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsx(t.CardContent, { children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: !O, className: "cms:grid cms:gap-4 cms:md:grid-cols-[2fr_1fr]", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "title", children: "Title" }),
            /* @__PURE__ */ e.jsx(
              t.Input,
              {
                id: "title",
                value: S.data.title,
                "aria-invalid": z.title !== void 0,
                onChange: (B) => S.setData("title", B.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(M, { message: z.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "slug", children: "Slug" }),
            /* @__PURE__ */ e.jsx(
              t.Input,
              {
                id: "slug",
                className: "cms:font-mono",
                value: S.data.slug,
                placeholder: "Made from the title",
                "aria-invalid": z.slug !== void 0,
                onChange: (B) => S.setData("slug", B.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(M, { message: z.slug })
          ] })
        ] }) }) }),
        /* @__PURE__ */ e.jsx(Es.Provider, { value: Array.isArray(m) || !m ? {} : m, children: /* @__PURE__ */ e.jsx(
          ze,
          {
            disabled: !O,
            fields: a,
            values: S.data.data,
            errors: z,
            storageKey: `cms:entry:${s.handle}`,
            shared: n,
            sharedValues: r,
            sharedNote: `Shared by all languages: edit it in ${R ? P(R) : "the main language"}.`,
            onChange: (B, K) => S.setData("data", { ...S.data.data, [B]: K })
          }
        ) }),
        /* @__PURE__ */ e.jsx(t.CollapsibleCard, { title: "Search and sharing", titleClassName: "cms:text-base", storageKey: "cms:entry:seo", hasErrors: ae(z, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !O, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(
          se,
          {
            bare: !0,
            id: "seo",
            fields: Le,
            value: S.data.seo,
            errors: W(z, "seo"),
            onChange: (B) => S.setData("seo", B)
          }
        ) }) })
      ] }),
      c && /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:flex-col cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs(t.CollapsibleCard, { title: "Status", titleClassName: "cms:text-base", storageKey: "cms:entry:status", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          /* @__PURE__ */ e.jsxs("p", { children: [
            X(c.status),
            c.status !== "draft" && c.publishedAt ? ` · ${G(c.publishedAt)}` : ""
          ] }),
          c.status !== "draft" && c.hasUnpublishedChanges && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The draft has changes the site doesn't show yet." }),
          l.find((B) => B.code === c.locale)?.outdated && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-amber-700 cms:dark:text-amber-400", children: [
            "The ",
            R ? P(R) : "main",
            " version changed since this translation was last saved."
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs(t.CollapsibleCard, { title: "Used by", titleClassName: "cms:text-base", storageKey: "cms:entry:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          x.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "No other content links here." }),
          x.map((B) => /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
            B.url ? /* @__PURE__ */ e.jsx("a", { href: B.url, className: "cms:block cms:truncate cms:underline-offset-4 cms:hover:underline", children: B.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:truncate", children: B.label }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:font-mono cms:text-xs cms:text-muted-foreground", children: B.field })
          ] }, `${B.label}:${B.field}`))
        ] }),
        v && /* @__PURE__ */ e.jsx(sa, { entryUrl: f, collection: s, settings: v, blueprints: b, disabled: !O }),
        u !== null && s.comments && /* @__PURE__ */ e.jsx(Yt, { entryId: c.id, comments: u }),
        /* @__PURE__ */ e.jsxs(t.CollapsibleCard, { title: "Revisions", titleClassName: "cms:text-base", storageKey: "cms:entry:revisions", contentClassName: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
          d !== null && h.update && /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", size: "sm", onClick: () => y.router.post(_(`cms/entry-translations/${d}/undo-restore`), {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(we, {}),
            " Undo the restore"
          ] }),
          /* @__PURE__ */ e.jsx(y.Deferred, { data: "revisions", fallback: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(t.Skeleton, { className: "cms:h-8" }),
            /* @__PURE__ */ e.jsx(t.Skeleton, { className: "cms:h-8" })
          ] }), children: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            (o ?? []).length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "Each publish keeps one." }),
            (o ?? []).map((B) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
                /* @__PURE__ */ e.jsx("div", { className: "cms:truncate", children: B.title }),
                /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: G(B.createdAt) })
              ] }),
              h.update && !c.trashed && /* @__PURE__ */ e.jsx(
                t.Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  onClick: () => y.router.post(_(`cms/revisions/${B.id}/restore`), {}, { preserveScroll: !0 }),
                  children: "Restore"
                }
              )
            ] }, B.id))
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(
      ea,
      {
        open: k,
        onClose: () => T(!1),
        processing: S.processing,
        current: c?.publishedAt ?? null,
        onSchedule: (B) => oe(B)
      }
    )
  ] });
}
function Xt({ entryUrl: s, current: a, locales: l, canAdd: n, canRemove: r, onRemove: c }) {
  return /* @__PURE__ */ e.jsxs("nav", { "aria-label": "Languages", className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
    l.map((i) => {
      const o = `${i.name ?? P(i.code)}${i.main ? " (main)" : ""}`;
      return i.status === null ? n ? /* @__PURE__ */ e.jsxs(
        t.Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "cms:border-dashed",
          onClick: () => y.router.post(`${s}/translations`, { locale: i.code }),
          children: [
            /* @__PURE__ */ e.jsx(q, {}),
            " ",
            o
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
          onClick: () => i.code !== a && y.router.get(`${s}/edit`, { locale: i.code }),
          children: [
            o,
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
    r && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:ml-auto cms:text-destructive", onClick: c, children: "Remove this language" })
  ] });
}
function ea({ open: s, onClose: a, onSchedule: l, current: n, processing: r }) {
  const [c, i] = D.useState("");
  return D.useEffect(() => {
    s && i(zt(n ? new Date(n) : new Date(Date.now() + 864e5)));
  }, [s, n]), /* @__PURE__ */ e.jsx(t.Dialog, { open: s, onOpenChange: (o) => !o && a(), children: /* @__PURE__ */ e.jsxs(t.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(t.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(t.DialogTitle, { children: "Publish on a date" }),
      /* @__PURE__ */ e.jsx(t.DialogDescription, { children: "The entry goes live then; a date in the past publishes it now with that date." })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "published-at", children: "Date and time" }),
      /* @__PURE__ */ e.jsx(t.DatePicker, { id: "published-at", withTime: !0, required: !0, className: "cms:max-w-none", value: c || null, onChange: (o) => i(o ?? "") }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "In your time zone." })
    ] }),
    /* @__PURE__ */ e.jsxs(t.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "outline", onClick: a, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", disabled: c === "" || r, onClick: () => l(new Date(c).toISOString()), children: "Publish" })
    ] })
  ] }) });
}
function sa({ entryUrl: s, collection: a, settings: l, blueprints: n, disabled: r }) {
  const c = n.length > 1 ? l.blueprint ?? n[0].handle : void 0, i = y.useForm({
    parent_id: l.parentId,
    template: l.template ?? "",
    comments_closed: l.commentsClosed === !0,
    ...c !== void 0 ? { blueprint: c } : {}
  }), o = i.errors;
  return /* @__PURE__ */ e.jsx(t.CollapsibleCard, { title: "Page settings", titleClassName: "cms:text-base", storageKey: "cms:entry:page-settings", hasErrors: Object.keys(o).length > 0, children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: r, className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: [
    a.hierarchical && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "parent", children: "Parent" }),
      /* @__PURE__ */ e.jsx(
        je,
        {
          id: "parent",
          multiple: !1,
          max: 1,
          collections: [a.handle],
          invalid: o.parent_id !== void 0,
          value: i.data.parent_id,
          onChange: (u) => i.setData("parent_id", typeof u == "number" ? u : null)
        }
      ),
      /* @__PURE__ */ e.jsx(M, { message: o.parent_id })
    ] }),
    n.length > 1 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "blueprint", children: "Blueprint" }),
      /* @__PURE__ */ e.jsxs(t.Select, { value: i.data.blueprint, onValueChange: (u) => i.setData("blueprint", u), children: [
        /* @__PURE__ */ e.jsx(t.SelectTrigger, { id: "blueprint", "aria-invalid": o.blueprint !== void 0, children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(t.SelectContent, { children: n.map((u) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: u.handle, children: u.title }, u.handle)) })
      ] }),
      i.data.blueprint !== c && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The fields change in every language; values of fields both blueprints have are kept. Save your draft first: the editor reloads." }),
      /* @__PURE__ */ e.jsx(M, { message: o.blueprint })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "template", children: "Template" }),
      /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: "template",
          className: "cms:font-mono",
          placeholder: "The collection's",
          value: i.data.template,
          onChange: (u) => i.setData("template", u.target.value),
          "aria-invalid": o.template !== void 0
        }
      ),
      /* @__PURE__ */ e.jsx(M, { message: o.template })
    ] }),
    a.comments && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(t.Switch, { id: "comments-open", checked: !i.data.comments_closed, onCheckedChange: (u) => i.setData("comments_closed", !u) }),
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "comments-open", children: "Accept new comments" }),
      /* @__PURE__ */ e.jsx("a", { href: _(`cms/comments?entry=${s.split("/").slice(-1)[0]}`), className: "cms:ml-auto cms:text-muted-foreground cms:underline-offset-4 hover:cms:underline", children: "Comments" })
    ] }),
    i.isDirty && /* @__PURE__ */ e.jsx(
      t.Button,
      {
        type: "button",
        size: "sm",
        disabled: i.processing,
        onClick: () => i.put(`${s}/settings`, { preserveScroll: !0, preserveState: i.data.blueprint === c, onSuccess: () => i.setDefaults() }),
        children: "Save settings"
      }
    )
  ] }) });
}
function _e(s, a) {
  const l = s[a]?.depth ?? 0;
  let n = a + 1;
  for (; n < s.length && s[n].depth > l; ) n++;
  return n;
}
function ce(s, a) {
  const l = a < 0 ? 0 : a + 1, n = a < 0 ? s.length : _e(s, a), r = a < 0 ? 0 : (s[a]?.depth ?? 0) + 1, c = [];
  for (let i = l; i < n; i++)
    s[i].depth === r && c.push(i);
  return c;
}
function Gs(s, a, l) {
  const n = ce(s, a);
  if (l.length !== n.length || [...l].sort((o, u) => o - u).some((o, u) => o !== n[u]) || n.length === 0) return s.slice();
  const r = n[0], c = _e(s, n[n.length - 1]), i = l.flatMap((o) => s.slice(o, _e(s, o)));
  return [...s.slice(0, r), ...i, ...s.slice(c)];
}
function ta(s, a, l) {
  const n = s.find((c) => c.id === a);
  if (!n) return [];
  const r = l(n);
  return s.filter((c) => l(c) === r).map((c) => c.id);
}
function aa({ collection: s, rows: a }) {
  const [l, n] = D.useState(a);
  D.useEffect(() => n(a), [a]);
  const r = (c, i) => {
    const o = c[i];
    if (!o) return;
    const u = o.parentId ?? null, m = ta(c, o.id, (x) => x.parentId ?? null);
    n(c), y.router.post(
      _("cms/entries/reorder"),
      { collection: s, ids: m, parent_id: u },
      { preserveScroll: !0, preserveState: !0, onError: () => n(a) }
    );
  };
  return /* @__PURE__ */ e.jsx(t.Card, { className: "cms:p-2", children: /* @__PURE__ */ e.jsx(t.SortableList, { items: l, getId: (c) => c.id, onReorder: (c, i, o) => r(c, o), className: "cms:gap-1", children: (c, { handle: i }) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-lg cms:border cms:border-border/70 cms:bg-card cms:p-2 cms:text-sm", children: [
    /* @__PURE__ */ e.jsx(t.SortableHandle, { ...i, label: `Move ${c.title}` }),
    /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium", children: c.title }),
    c.parent && /* @__PURE__ */ e.jsxs("span", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", children: [
      "under ",
      c.parent
    ] }),
    /* @__PURE__ */ e.jsx(t.Badge, { variant: c.status === "published" ? "success" : "secondary", children: X(c.status) })
  ] }) }) });
}
function la(s, a, l) {
  const n = { ...s, ...a }, r = Object.fromEntries(Object.entries(n.terms).filter(([, i]) => i !== "")), c = {};
  return n.search && (c.search = n.search), n.status && (c.status = n.status), n.author && (c.author = n.author), Object.keys(r).length > 0 && (c.terms = r), n.locale && n.locale !== l && (c.locale = n.locale), n.sort && (c.sort = n.sort), c.per_page = n.perPage, c;
}
function na(s) {
  const a = new URLSearchParams();
  for (const [l, n] of Object.entries(s))
    if (typeof n == "object")
      for (const [r, c] of Object.entries(n)) a.set(`${l}[${r}]`, c);
    else
      a.set(l, String(n));
  return a.toString();
}
function ca(s, a) {
  return s === a ? `-${a}` : s === `-${a}` ? "" : a;
}
function ra(s, a) {
  return s === a ? "asc" : s === `-${a}` ? "desc" : null;
}
function Ve(s) {
  return [s.search, s.status, s.author, ...Object.values(s.terms)].filter((a) => a !== "").length;
}
const Ne = "__all", ia = [
  { value: "draft", label: "Drafts" },
  { value: "published", label: "Published" },
  { value: "scheduled", label: "Scheduled" },
  { value: "trashed", label: "Trash" }
];
function oa(s) {
  const { collection: a, entries: l, query: n } = s;
  return t.useBreadcrumbs([{ label: "Entries", href: _("cms/entries") }, ...a ? [{ label: a.title }] : []]), !a || !l || !n ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: "Entries" }),
    /* @__PURE__ */ e.jsx(t.PageHeader, { title: "Entries", description: "There are no collections yet. Create one under Structure → Collections, then come back to write its entries." })
  ] }) : /* @__PURE__ */ e.jsx(da, { ...s, collection: a, entries: l, query: n });
}
function da({
  collection: s,
  collections: a,
  entries: l,
  query: n,
  columns: r = [],
  filters: c = { authors: [], taxonomies: [], locales: [] },
  links: i = [],
  manualOrder: o = !1,
  perPageOptions: u = [10, 25, 50, 100],
  preferencesKey: m,
  can: x
}) {
  const d = _(`cms/collections/${s.handle}/entries`), p = c.locales[0] ?? n.locale, [v, b] = D.useState(n.search), [h, $] = D.useState([]), [f, N] = D.useState(!1), [w, g] = Q(), { setColumns: k, setPerPage: T } = t.useTablePreferences(m ?? `table.cms.entries.${s.handle}`, { columns: n.columns, perPage: n.perPage });
  D.useEffect(() => $([]), [l]);
  const S = n.status === "trashed", H = Ve(n) > 0, R = r.filter((j) => n.columns.includes(j.key)), z = (j = {}) => la(n, j, p), C = (j) => y.router.get(d, z(j), { preserveState: !0, preserveScroll: !0, replace: !0 });
  D.useEffect(() => {
    if (v === n.search) return;
    const j = window.setTimeout(() => C({ search: v }), 300);
    return () => window.clearTimeout(j);
  }, [v]);
  const A = S ? x?.delete ? [{ action: "restore", label: "Restore" }, { action: "delete", label: "Delete for good", danger: !0 }] : [] : [
    ...x?.publish ? [{ action: "publish", label: "Publish" }, { action: "unpublish", label: "Unpublish" }] : [],
    ...x?.delete ? [{ action: "trash", label: "Move to the trash", danger: !0 }] : []
  ], E = (j, I, F = !1) => {
    const de = () => y.router.post(`${d}/bulk`, { action: j, ids: h }, { preserveScroll: !0 });
    F ? w(`${I}: ${h.length} ${h.length === 1 ? "entry" : "entries"}?${j === "delete" ? " This can't be undone." : ""}`, de) : de();
  }, te = async (j) => {
    const I = new Set(n.columns);
    I.has(j) ? I.delete(j) : I.add(j), await k(r.map((F) => F.key).filter((F) => I.has(F))), y.router.reload({ only: ["entries", "query"] });
  }, U = () => {
    b(""), C({ search: "", status: "", author: "", terms: {} });
  }, O = o && !!x?.update, ie = O && l !== null && l.lastPage <= 1 && l.data.length > 1, oe = 1 + R.length + (A.length > 0 ? 1 : 0) + (O ? 1 : 0), B = na(z()), K = [...new Set(i.map((j) => j.group))];
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: s.title }),
    g,
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: s.title,
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          i.length > 0 && /* @__PURE__ */ e.jsxs(t.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(t.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(t.Button, { variant: "outline", children: [
              /* @__PURE__ */ e.jsx(vt, {}),
              " Go to"
            ] }) }),
            /* @__PURE__ */ e.jsx(t.DropdownMenuContent, { align: "end", className: "cms:min-w-56", children: K.map((j, I) => /* @__PURE__ */ e.jsxs(D.Fragment, { children: [
              I > 0 && /* @__PURE__ */ e.jsx(t.DropdownMenuSeparator, {}),
              /* @__PURE__ */ e.jsx(t.DropdownMenuLabel, { children: j }),
              i.filter((F) => F.group === j).map((F) => /* @__PURE__ */ e.jsx(t.DropdownMenuItem, { asChild: !0, children: F.external ? /* @__PURE__ */ e.jsxs("a", { href: F.href, target: "_blank", rel: "noopener noreferrer", children: [
                F.label,
                " ",
                /* @__PURE__ */ e.jsx(re, { className: "cms:ml-auto" })
              ] }) : /* @__PURE__ */ e.jsx(y.Link, { href: F.href, children: F.label }) }, F.href))
            ] }, j)) })
          ] }),
          s.listing && !S && /* @__PURE__ */ e.jsx(t.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs(y.Link, { href: _(`cms/collections/${s.handle}/listing`), children: [
            /* @__PURE__ */ e.jsx(kt, {}),
            " Listing page"
          ] }) }),
          l.total > 0 && x?.export && /* @__PURE__ */ e.jsx(t.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: `${d}/export${B ? `?${B}` : ""}`, children: [
            /* @__PURE__ */ e.jsx(hs, {}),
            " Export CSV"
          ] }) }),
          x?.create && !S && /* @__PURE__ */ e.jsx(t.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(y.Link, { href: `${d}/create`, children: [
            /* @__PURE__ */ e.jsx(q, {}),
            " New entry"
          ] }) })
        ] }),
        children: a.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: s.handle, onValueChange: (j) => y.router.get(_(`cms/collections/${j}/entries`)), children: [
          /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Collection", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(t.SelectContent, { children: a.map((j) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: j.handle, children: j.title }, j.handle)) })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-xs", children: [
        /* @__PURE__ */ e.jsx(pe, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          t.Input,
          {
            className: "cms:pl-9",
            placeholder: "Search titles, slugs or #id",
            "aria-label": "Search entries",
            value: v,
            onChange: (j) => b(j.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(Se, { label: "Status", value: n.status, options: ia, onChange: (j) => C({ status: j }) }),
      c.authors.length > 0 && /* @__PURE__ */ e.jsx(Se, { label: "Author", value: n.author, options: c.authors, onChange: (j) => C({ author: j }) }),
      c.taxonomies.filter((j) => j.terms.length > 0).map((j) => /* @__PURE__ */ e.jsx(
        Se,
        {
          label: j.title,
          value: n.terms[j.handle] ?? "",
          options: j.terms.map((I) => ({ value: I.value, label: `${"— ".repeat(I.depth)}${I.label}` })),
          onChange: (I) => C({ terms: { ...n.terms, [j.handle]: I } })
        },
        j.handle
      )),
      c.locales.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: n.locale, onValueChange: (j) => C({ locale: j }), children: [
        /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-40", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(t.SelectContent, { children: c.locales.map((j) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: j, children: [
          P(j),
          j === p ? " (main)" : ""
        ] }, j)) })
      ] }),
      H && /* @__PURE__ */ e.jsxs(t.Button, { variant: "ghost", size: "sm", onClick: U, children: [
        /* @__PURE__ */ e.jsx(ge, {}),
        " Clear"
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:ml-auto cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
        h.length > 0 && A.length > 0 && /* @__PURE__ */ e.jsxs("div", { role: "toolbar", "aria-label": "Selected entries", className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsxs("span", { className: "cms:text-sm cms:text-muted-foreground", children: [
            h.length,
            " selected"
          ] }),
          A.map((j) => /* @__PURE__ */ e.jsx(t.Button, { size: "sm", variant: j.danger ? "destructive" : "outline", onClick: () => E(j.action, j.label, j.danger), children: j.label }, j.action))
        ] }),
        ie && /* @__PURE__ */ e.jsxs(t.Button, { variant: f ? "secondary" : "outline", "aria-pressed": f, onClick: () => N(!f), children: [
          /* @__PURE__ */ e.jsx(es, {}),
          " ",
          f ? "Done" : "Reorder"
        ] }),
        r.length > 0 && /* @__PURE__ */ e.jsxs(t.DropdownMenu, { children: [
          /* @__PURE__ */ e.jsx(t.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(t.Button, { variant: "outline", children: [
            /* @__PURE__ */ e.jsx(bt, {}),
            " Columns"
          ] }) }),
          /* @__PURE__ */ e.jsxs(t.DropdownMenuContent, { align: "end", className: "cms:max-h-96 cms:overflow-y-auto", children: [
            /* @__PURE__ */ e.jsx(t.DropdownMenuLabel, { children: "Columns" }),
            r.filter((j) => !j.field).map((j) => /* @__PURE__ */ e.jsx(
              t.DropdownMenuCheckboxItem,
              {
                checked: n.columns.includes(j.key),
                onSelect: (I) => I.preventDefault(),
                onCheckedChange: () => {
                  te(j.key);
                },
                children: j.label
              },
              j.key
            )),
            r.some((j) => j.field) && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(t.DropdownMenuSeparator, {}),
              /* @__PURE__ */ e.jsx(t.DropdownMenuLabel, { children: "Fields" }),
              r.filter((j) => j.field).map((j) => /* @__PURE__ */ e.jsx(
                t.DropdownMenuCheckboxItem,
                {
                  checked: n.columns.includes(j.key),
                  onSelect: (I) => I.preventDefault(),
                  onCheckedChange: () => {
                    te(j.key);
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
    f && ie ? /* @__PURE__ */ e.jsx(aa, { collection: s.handle, rows: l.data }) : /* @__PURE__ */ e.jsxs(t.Card, { className: "cms:gap-0 cms:overflow-hidden cms:py-0", children: [
      /* @__PURE__ */ e.jsxs(t.Table, { children: [
        /* @__PURE__ */ e.jsx(t.TableHeader, { className: "cms:bg-muted/60", children: /* @__PURE__ */ e.jsxs(t.TableRow, { className: "cms:hover:bg-transparent", children: [
          A.length > 0 && /* @__PURE__ */ e.jsx(t.TableHead, { className: "cms:w-10", children: /* @__PURE__ */ e.jsx(
            t.Checkbox,
            {
              "aria-label": "Select all on this page",
              checked: l.data.length > 0 && h.length === l.data.length,
              onCheckedChange: (j) => $(j ? l.data.map((I) => I.id) : [])
            }
          ) }),
          /* @__PURE__ */ e.jsx(Oe, { label: "Title", sortKey: "title", sort: n.sort, onSort: (j) => C({ sort: j }) }),
          R.map((j) => j.sortable ? /* @__PURE__ */ e.jsx(Oe, { label: j.label, sortKey: j.key, sort: n.sort, onSort: (I) => C({ sort: I }) }, j.key) : /* @__PURE__ */ e.jsx(t.TableHead, { children: j.label }, j.key)),
          O && /* @__PURE__ */ e.jsx(t.TableHead, { className: "cms:w-px", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: "Order" }) })
        ] }) }),
        /* @__PURE__ */ e.jsxs(t.TableBody, { children: [
          l.data.length === 0 && /* @__PURE__ */ e.jsx(t.TableRow, { className: "cms:hover:bg-transparent", children: /* @__PURE__ */ e.jsx(t.TableCell, { colSpan: oe, className: "cms:h-32 cms:text-center cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx(ua, { trashed: S, filtered: Ve(S ? { ...n, status: "" } : n) > 0, canCreate: !!x?.create, createUrl: `${d}/create`, onClear: U }) }) }),
          l.data.map((j, I) => /* @__PURE__ */ e.jsxs(t.TableRow, { className: "sunrice-row-in", style: { "--i": I }, "data-state": h.includes(j.id) ? "selected" : void 0, children: [
            A.length > 0 && /* @__PURE__ */ e.jsx(t.TableCell, { children: /* @__PURE__ */ e.jsx(
              t.Checkbox,
              {
                "aria-label": `Select ${j.title}`,
                checked: h.includes(j.id),
                onCheckedChange: (F) => $(F ? [...h, j.id] : h.filter((de) => de !== j.id))
              }
            ) }),
            /* @__PURE__ */ e.jsxs(t.TableCell, { children: [
              /* @__PURE__ */ e.jsx(
                y.Link,
                {
                  href: _(`cms/entries/${j.id}/edit${n.locale !== p ? `?locale=${encodeURIComponent(n.locale)}` : ""}`),
                  className: "cms:font-medium cms:underline-offset-4 cms:hover:underline",
                  children: j.title
                }
              ),
              (!n.columns.includes("slug") || j.parent) && /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
                !n.columns.includes("slug") && `/${j.slug}`,
                j.parent ? `${n.columns.includes("slug") ? "" : " · "}under ${j.parent}` : ""
              ] })
            ] }),
            R.map((F) => /* @__PURE__ */ e.jsx(t.TableCell, { className: F.key === "status" ? "" : "cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx("div", { className: "cms:max-w-72 cms:truncate", children: /* @__PURE__ */ e.jsx(ma, { row: j, column: F, mainLocale: p }) }) }, F.key)),
            O && /* @__PURE__ */ e.jsx(t.TableCell, { className: "cms:w-px", children: /* @__PURE__ */ e.jsxs("span", { className: "cms:flex", children: [
              /* @__PURE__ */ e.jsx(t.Button, { variant: "ghost", size: "icon", "aria-label": `Move ${j.title} up`, onClick: () => y.router.post(_(`cms/entries/${j.id}/move`), { direction: "up" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(ts, {}) }),
              /* @__PURE__ */ e.jsx(t.Button, { variant: "ghost", size: "icon", "aria-label": `Move ${j.title} down`, onClick: () => y.router.post(_(`cms/entries/${j.id}/move`), { direction: "down" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(Ze, {}) })
            ] }) })
          ] }, j.id))
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4 cms:border-t cms:px-6 cms:py-3 cms:text-sm cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-4", children: [
          /* @__PURE__ */ e.jsx("span", { children: l.total === 0 ? "No entries" : `${l.from}–${l.to} of ${l.total}` }),
          /* @__PURE__ */ e.jsxs(t.Select, { value: String(n.perPage), onValueChange: (j) => {
            T(Number(j)), C({ perPage: Number(j) });
          }, children: [
            /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:h-8 cms:w-auto", "aria-label": "Entries per page", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(t.SelectContent, { children: u.map((j) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: String(j), children: [
              j,
              " per page"
            ] }, j)) })
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
              onClick: () => l.prev_page_url && y.router.get(l.prev_page_url, {}, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(Be, {})
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
              onClick: () => l.next_page_url && y.router.get(l.next_page_url, {}, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(xe, {})
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function Se({ label: s, value: a, options: l, onChange: n }) {
  return /* @__PURE__ */ e.jsxs(t.Select, { value: a === "" ? Ne : a, onValueChange: (r) => n(r === Ne ? "" : r), children: [
    /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-40", "aria-label": s, children: /* @__PURE__ */ e.jsx(t.SelectValue, { placeholder: s }) }),
    /* @__PURE__ */ e.jsxs(t.SelectContent, { children: [
      /* @__PURE__ */ e.jsxs(t.SelectItem, { value: Ne, children: [
        s,
        ": all"
      ] }),
      l.map((r) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: r.value, children: r.label }, r.value))
    ] })
  ] });
}
function Oe({ label: s, sortKey: a, sort: l, onSort: n }) {
  const r = ra(l, a);
  return /* @__PURE__ */ e.jsx(t.TableHead, { "aria-sort": r === "asc" ? "ascending" : r === "desc" ? "descending" : void 0, children: /* @__PURE__ */ e.jsxs(
    "button",
    {
      type: "button",
      onClick: () => n(ca(l, a)),
      className: "cms:-ml-2 cms:inline-flex cms:h-8 cms:items-center cms:gap-1 cms:rounded-md cms:px-2 cms:hover:bg-accent cms:hover:text-accent-foreground",
      children: [
        s,
        r === "asc" ? /* @__PURE__ */ e.jsx(ts, { className: "cms:size-3" }) : r === "desc" ? /* @__PURE__ */ e.jsx(Ze, { className: "cms:size-3" }) : /* @__PURE__ */ e.jsx(es, { className: "cms:size-3 cms:opacity-40" })
      ]
    }
  ) });
}
function ma({ row: s, column: a, mainLocale: l }) {
  switch (a.key) {
    case "slug":
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        "/",
        s.slug
      ] });
    case "status":
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(t.Badge, { variant: s.status === "published" ? "success" : "secondary", children: X(s.status) }),
        s.locales.length > 1 && s.locales.filter((n) => !n.main).map((n) => /* @__PURE__ */ e.jsxs(
          t.Badge,
          {
            variant: n.status === "published" ? "secondary" : "outline",
            className: n.status === null ? "cms:opacity-50" : n.outdated ? "cms:ring-2 cms:ring-amber-500/60" : "",
            title: `${P(n.code)}: ${n.status === null ? "not translated" : X(n.status)}${n.outdated ? ", outdated: the main language changed since" : ""}`,
            children: [
              n.code.toUpperCase(),
              n.outdated && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", children: "·!" })
            ]
          },
          n.code
        ))
      ] });
    case "author":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: s.author ?? "—" });
    case "published_at":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: G(s.publishedAt) });
    case "updated_at":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: G(s.updatedAt) });
    case "created_at":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: G(s.createdAt) });
    default:
      return /* @__PURE__ */ e.jsx("span", { title: s.cells[a.key] ?? void 0, children: s.cells[a.key] ?? "—" });
  }
}
function ua({ trashed: s, filtered: a, canCreate: l, createUrl: n, onClear: r }) {
  return a ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: "Nothing matches these filters." }),
    /* @__PURE__ */ e.jsxs(t.Button, { variant: "outline", size: "sm", onClick: r, children: [
      /* @__PURE__ */ e.jsx(ge, {}),
      " Clear filters"
    ] })
  ] }) : s ? /* @__PURE__ */ e.jsx(e.Fragment, { children: "The trash is empty." }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: "No entries yet." }),
    l && /* @__PURE__ */ e.jsx(t.Button, { size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs(y.Link, { href: n, children: [
      /* @__PURE__ */ e.jsx(q, {}),
      " Write the first one"
    ] }) })
  ] });
}
function Me({ message: s, processing: a, onSaveMine: l }) {
  const [n, r] = Q();
  return s ? /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: [
    r,
    /* @__PURE__ */ e.jsx("span", { children: s }),
    /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "outline", size: "sm", onClick: () => y.router.reload(), children: "Load theirs" }),
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
function ha(s) {
  return /* @__PURE__ */ e.jsx(xa, { ...s }, `${s.locale}:${s.version}:${JSON.stringify([s.values, s.seo])}`);
}
function xa({ collection: s, fields: a, locale: l, locales: n, shared: r, values: c, seo: i, version: o, can: u }) {
  const m = _(`cms/collections/${s.handle}/listing`), x = _(`cms/collections/${s.handle}/entries`);
  t.useBreadcrumbs([{ label: s.title, href: x }, { label: "Listing page" }]);
  const d = y.useForm({ locale: l, data: c, seo: i ?? {}, version: o }), p = d.errors, v = n[0], b = u.update, h = () => d.processing || d.put(m, { preserveScroll: !0 }), $ = () => {
    d.transform((f) => ({ ...f, version: null })), d.put(m, { preserveScroll: !0 });
  };
  return t.useUnsavedChanges(d.isDirty, b ? h : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: (f) => {
    f.preventDefault(), h();
  }, className: "cms:flex cms:max-w-3xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: `${s.title}: listing page` }),
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: `${s.title}: listing page`,
        back: { href: x, label: `Back to ${s.title}` },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          n.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: l, onValueChange: (f) => y.router.get(m, { locale: f }), children: [
            /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(t.SelectContent, { children: n.map((f, N) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: f, children: [
              P(f),
              N === 0 ? " (main)" : ""
            ] }, f)) })
          ] }),
          s.url && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: s.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(re, {}),
            " View"
          ] }) }),
          b && /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", disabled: d.processing, children: [
            d.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
            " Save"
          ] })
        ] }),
        children: d.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      }
    ),
    /* @__PURE__ */ e.jsxs("fieldset", { disabled: !b, className: "cms:flex cms:flex-col cms:gap-6", children: [
      /* @__PURE__ */ e.jsx(Me, { message: p.version, processing: d.processing, onSaveMine: $ }),
      a.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The listing page has no fields of its own: choose a listing blueprint for the collection under Structure → Collections." }) : /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsx(t.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: a.map((f) => r.includes(f.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(ee, { id: `data-${f.handle}`, field: f, content: !0, value: c[f.handle], errors: {}, onChange: () => {
        } }),
        /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
          "Shared by all languages: edit it in ",
          v ? P(v) : "the main language",
          "."
        ] })
      ] }, f.handle) : /* @__PURE__ */ e.jsx(
        ee,
        {
          id: `data-${f.handle}`,
          field: f,
          content: !0,
          value: d.data.data[f.handle],
          errors: W(p, `data.${f.handle}`),
          onChange: (N) => d.setData("data", { ...d.data.data, [f.handle]: N })
        },
        f.handle
      )) }) })
    ] }),
    /* @__PURE__ */ e.jsx(t.CollapsibleCard, { title: "Search and sharing", titleClassName: "cms:text-base", storageKey: "cms:listing:seo", hasErrors: ae(p, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !b, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(se, { bare: !0, id: "seo", fields: Le, value: d.data.seo, errors: W(p, "seo"), onChange: (f) => d.setData("seo", f) }) }) })
  ] });
}
function pa({ fieldsets: s }) {
  const a = y.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(M, { message: a.fieldset }),
    /* @__PURE__ */ e.jsx(
      Ws,
      {
        noun: "Fieldset",
        base: _("cms/fieldsets"),
        rows: s,
        intro: "Fields shared between blueprints, and the kinds of block of flexible fields."
      }
    )
  ] });
}
function ga(s) {
  return /* @__PURE__ */ e.jsx(ja, { ...s }, `${s.locale}:${s.version}:${JSON.stringify(s.values)}`);
}
function ja({ set: s, fields: a, locale: l, locales: n, shared: r, values: c, version: i, can: o }) {
  const u = _(`cms/globals/${s.handle}`);
  t.useBreadcrumbs([{ label: "Globals", href: _("cms/globals") }, { label: s.title }]);
  const m = y.useForm({ locale: l, data: c, version: i }), x = m.errors, d = n[0], p = t.useEditLock({
    type: "cms.global",
    id: s.id,
    locale: l,
    enabled: o.update,
    noun: "global set",
    leaveTo: _("cms/globals"),
    getUnsaved: () => m.isDirty ? { data: m.data.data } : null
  }), v = o.update && !p.readOnly, b = () => m.processing || m.put(u, { preserveScroll: !0 }), h = () => {
    m.transform((f) => ({ ...f, version: null })), m.put(u, { preserveScroll: !0 });
  }, $ = async (f) => {
    const N = await p.loadKept(f);
    N.data && typeof N.data == "object" && m.setData("data", N.data);
  };
  return t.useUnsavedChanges(m.isDirty && !p.takenOver, v ? b : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: (f) => {
    f.preventDefault(), b();
  }, className: "cms:flex cms:max-w-3xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: s.title }),
    p.dialogs,
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: s.title,
        back: { href: _("cms/globals"), label: "Back to globals" },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          n.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: l, onValueChange: (f) => y.router.get(u, { locale: f }), children: [
            /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(t.SelectContent, { children: n.map((f, N) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: f, children: [
              P(f),
              N === 0 ? " (main)" : ""
            ] }, f)) })
          ] }),
          v && /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", disabled: m.processing, children: [
            m.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
            " Save"
          ] })
        ] }),
        children: m.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      }
    ),
    a.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "This global set has no fields: choose a blueprint for it under Structure → Global sets." }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(t.ViewingNotice, { by: p.viewingBy }),
      /* @__PURE__ */ e.jsx(Me, { message: x.version, processing: m.processing, onSaveMine: h }),
      /* @__PURE__ */ e.jsx(t.KeptEditsNotice, { kept: p.kept, disabled: !v, onLoad: (f) => {
        $(f);
      }, onDiscard: (f) => {
        p.discardKept(f);
      } }),
      /* @__PURE__ */ e.jsx(
        ze,
        {
          disabled: !v,
          fields: a,
          values: m.data.data,
          errors: x,
          storageKey: `cms:global:${s.handle}`,
          shared: r,
          sharedValues: c,
          sharedNote: `Shared by all languages: edit it in ${d ? P(d) : "the main language"}.`,
          onChange: (f, N) => m.setData("data", { ...m.data.data, [f]: N })
        }
      )
    ] })
  ] });
}
function fa({ sets: s }) {
  return t.useBreadcrumbs([{ label: "Globals" }]), /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: "Globals" }),
    /* @__PURE__ */ e.jsx(t.PageHeader, { title: "Globals", description: "Values the whole site uses, like contact details and footer text." }),
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no global sets yet. Create one under Structure → Global sets." }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:sm:grid-cols-2 cms:lg:grid-cols-3", children: s.map((a) => /* @__PURE__ */ e.jsx(y.Link, { href: _(`cms/globals/${a.handle}`), className: "cms:rounded-xl cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none", children: /* @__PURE__ */ e.jsxs(t.Card, { className: "cms:h-full cms:transition-colors cms:hover:bg-accent", children: [
      /* @__PURE__ */ e.jsxs(t.CardHeader, { children: [
        /* @__PURE__ */ e.jsx(t.CardTitle, { className: "cms:text-base", children: a.title }),
        /* @__PURE__ */ e.jsx(t.CardDescription, { children: a.blueprint ? /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: a.handle }) : "No blueprint yet: choose one under Structure → Global sets." })
      ] }),
      /* @__PURE__ */ e.jsx(t.CardContent, {})
    ] }) }, a.handle)) })
  ] });
}
let qs = 0;
function Js(s, a = 0) {
  return s.flatMap(({ children: l, ...n }) => [{ ...n, key: `m${++qs}`, depth: a }, ...Js(l ?? [], a + 1)]);
}
function ba(s) {
  const a = [], l = [{ depth: -1, children: a }];
  for (const { key: n, depth: r, ...c } of s) {
    for (; l.length > 1 && l[l.length - 1].depth >= r; ) l.pop();
    const i = { ...c, children: [] };
    l[l.length - 1].children.push(i), l.push({ depth: r, children: i.children });
  }
  return a;
}
function Ie(s, a) {
  const l = s[a]?.depth ?? 0;
  let n = a + 1;
  for (; n < s.length && s[n].depth > l; ) n++;
  return n;
}
function Ys(s, a, l) {
  const n = Ie(s, a);
  return s.map((r, c) => c >= a && c < n ? { ...r, depth: r.depth + l } : r);
}
function va(s, a, l) {
  const n = s[a], r = s[a - 1];
  return !n || !r || n.depth > r.depth || Math.max(...s.slice(a, Ie(s, a)).map((i) => i.depth)) + 1 > l - 1 ? s : Ys(s, a, 1);
}
function ya(s, a) {
  return (s[a]?.depth ?? 0) === 0 ? s : Ys(s, a, -1);
}
function Na(s, a) {
  return [...s.slice(0, a), ...s.slice(Ie(s, a))];
}
function me(s) {
  return { key: `m${++qs}`, depth: 0, entry_id: null, term_id: null, collection_id: null, target: null, url: null, labels: {}, new_tab: !1, ...s };
}
function Sa({ menu: s, items: a, locales: l, limits: n, terms: r, listings: c, can: i }) {
  const o = _(`cms/menus/${s.handle}`);
  t.useBreadcrumbs([{ label: "Menus", href: _("cms/menus") }, { label: s.title }]);
  const [u, m] = D.useState(() => Js(a)), [x, d] = D.useState(null), p = y.useForm({ items: a }), v = p.errors, [b, h] = D.useState(!1), $ = l[0] ?? "en", f = (T) => {
    m(T), h(!0);
  }, N = (T, S) => f(u.map((H, R) => R === T ? { ...H, ...S } : H)), w = () => {
    p.processing || (p.transform(() => ({ items: ba(u).map(Qs) })), p.put(o, { preserveScroll: !0, onSuccess: () => h(!1) }));
  }, g = (T) => {
    T.preventDefault(), w();
  };
  t.useUnsavedChanges(b, i.update ? w : void 0);
  const k = (T) => /* @__PURE__ */ e.jsx(
    t.SortableList,
    {
      items: ce(u, T),
      getId: (S) => u[S].key,
      disabled: !i.update,
      onReorder: (S) => f(Gs(u, T, S)),
      className: T < 0 ? "cms:gap-1" : "cms:mt-1 cms:gap-1 cms:pl-6",
      children: (S, { handle: H, isOverlay: R }) => {
        const z = u[S];
        return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${R ? "" : "cms:border-border/70"}`, children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2 cms:p-2", children: [
            i.update && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:h-10 cms:shrink-0 cms:items-center", children: /* @__PURE__ */ e.jsx(t.SortableHandle, { ...H, label: `Move ${z.labels[$] || z.target?.title || z.url || "link"}` }) }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
                /* @__PURE__ */ e.jsx(
                  t.Input,
                  {
                    "aria-label": `Label (${P($)})`,
                    className: "cms:w-full cms:sm:max-w-xs",
                    disabled: !i.update,
                    placeholder: z.target?.title ?? "Label",
                    value: z.labels[$] ?? "",
                    onChange: (C) => N(S, { labels: { ...z.labels, [$]: C.target.value } })
                  }
                ),
                /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-32 cms:flex-1 cms:truncate cms:text-sm cms:text-muted-foreground", children: z.url !== null ? z.url : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  z.target ? `${z.target.kind}: ${z.target.title}` : "Gone",
                  " ",
                  (!z.target || !z.target.live) && /* @__PURE__ */ e.jsx(t.Badge, { variant: "outline", children: "Not on the site" })
                ] }) }),
                i.update && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center", children: [
                  /* @__PURE__ */ e.jsxs("label", { className: "cms:mr-2 cms:flex cms:items-center cms:gap-1.5 cms:text-sm", children: [
                    /* @__PURE__ */ e.jsx(t.Checkbox, { checked: z.new_tab, onCheckedChange: (C) => N(S, { new_tab: C }) }),
                    " New tab"
                  ] }),
                  /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Out a level", disabled: z.depth === 0, onClick: () => f(ya(u, S)), children: /* @__PURE__ */ e.jsx(wt, {}) }),
                  /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "In a level", onClick: () => f(va(u, S, n.depth)), children: /* @__PURE__ */ e.jsx(Dt, {}) }),
                  /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": "Remove, with what's under it", onClick: () => f(Na(u, S)), children: /* @__PURE__ */ e.jsx(V, {}) })
                ] })
              ] }),
              l.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: l.slice(1).map((C) => /* @__PURE__ */ e.jsx(
                t.Input,
                {
                  "aria-label": `Label (${P(C)})`,
                  className: "cms:w-full cms:sm:max-w-xs",
                  disabled: !i.update,
                  placeholder: `${P(C)}: as ${P($)}`,
                  value: z.labels[C] ?? "",
                  onChange: (A) => N(S, { labels: { ...z.labels, [C]: A.target.value } })
                },
                C
              )) })
            ] })
          ] }),
          !R && ce(u, S).length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:px-2 cms:pb-2", children: k(S) })
        ] });
      }
    }
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: g, className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: s.title }),
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: s.title,
        back: { href: _("cms/menus"), label: "Back to menus" },
        actions: i.update && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", disabled: u.length >= n.items, onClick: () => d("entry"), children: [
            /* @__PURE__ */ e.jsx(q, {}),
            " Entry"
          ] }),
          r.length > 0 && /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", disabled: u.length >= n.items, onClick: () => d("term"), children: [
            /* @__PURE__ */ e.jsx(Bt, {}),
            " Term"
          ] }),
          c.length > 0 && /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", disabled: u.length >= n.items, onClick: () => d("listing"), children: [
            /* @__PURE__ */ e.jsx(_t, {}),
            " Listing"
          ] }),
          /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", disabled: u.length >= n.items, onClick: () => d("url"), children: [
            /* @__PURE__ */ e.jsx($t, {}),
            " Link"
          ] }),
          /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", disabled: p.processing, children: [
            p.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
            " Save"
          ] })
        ] }),
        children: b && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      }
    ),
    /* @__PURE__ */ e.jsx(M, { message: v.items }),
    Object.keys(v).some((T) => T.startsWith("items.")) && /* @__PURE__ */ e.jsxs("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: [
      "Some links need fixing: ",
      Object.values(v).filter(Boolean)[0]
    ] }),
    /* @__PURE__ */ e.jsx(t.Card, { className: "cms:p-2", children: u.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:p-4 cms:text-center cms:text-muted-foreground", children: "No links yet. Add an entry or a link." }) : k(-1) }),
    /* @__PURE__ */ e.jsx($a, { kind: x, terms: r, listings: c, onClose: () => d(null), onAdd: (T) => {
      f([...u, T]), d(null);
    }, main: $ })
  ] });
}
function Qs({ target: s, children: a, ...l }) {
  return { ...l, children: a.map(Qs) };
}
const Ca = { entry: "Link to an entry", term: "Link to a term's page", listing: "Link to a listing page", url: "Link to an address" }, ka = {
  entry: "It follows the entry: its title (unless you give a label) and its address in each language. It shows only while the entry is on the site.",
  term: "The page listing the term's entries, in each language. Its title is the label unless you give one.",
  listing: "The collection's listing page, in each language. The collection's title is the label unless you give one.",
  url: "A web address, a path on this site (/contact), mailto: or tel:."
};
function $a({ kind: s, terms: a, listings: l, onClose: n, onAdd: r, main: c }) {
  const [i, o] = D.useState(null), [u, m] = D.useState(""), [x, d] = D.useState(""), [p, v] = D.useState("");
  D.useEffect(() => {
    o(null), m(""), d(""), v("");
  }, [s]);
  const b = x.trim() === "" || tt(x.trim()), h = p.trim() ? { [c]: p.trim() } : {}, $ = async () => {
    if (s === "entry" && i !== null) {
      const N = await fetch(`${_("cms/entry-picker")}?${Te({ ids: [i], collections: [] })}`, { headers: { Accept: "application/json" }, credentials: "same-origin" }), w = N.ok ? (await N.json()).items[0] : void 0;
      r(me({ entry_id: i, target: w ? { title: w.title, kind: w.collection, live: w.status === "published" } : null, labels: h }));
    } else if (s === "term" && u !== "") {
      const N = a.find((w) => String(w.id) === u);
      r(me({ term_id: Number(u), target: N ? { title: N.title, kind: N.taxonomy, live: !0 } : null, labels: h }));
    } else if (s === "listing" && u !== "") {
      const N = l.find((w) => String(w.id) === u);
      r(me({ collection_id: Number(u), target: N ? { title: N.title, kind: "Listing page", live: !0 } : null, labels: h }));
    } else s === "url" && x.trim() !== "" && b && p.trim() !== "" && r(me({ url: x.trim(), labels: h }));
  }, f = s === "entry" ? i !== null : s === "url" ? x.trim() !== "" && b && p.trim() !== "" : u !== "";
  return /* @__PURE__ */ e.jsx(t.Dialog, { open: s !== null, onOpenChange: (N) => !N && n(), children: /* @__PURE__ */ e.jsxs(t.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(t.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(t.DialogTitle, { children: s ? Ca[s] : "" }),
      /* @__PURE__ */ e.jsx(t.DialogDescription, { children: s ? ka[s] : "" })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
      s === "entry" && /* @__PURE__ */ e.jsx(
        je,
        {
          id: "menu-entry",
          value: i,
          multiple: !1,
          max: null,
          collections: [],
          invalid: !1,
          onChange: (N) => o(typeof N == "number" ? N : null)
        }
      ),
      (s === "term" || s === "listing") && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "menu-target", children: s === "term" ? "Term" : "Collection" }),
        /* @__PURE__ */ e.jsxs(t.Select, { value: u, onValueChange: m, children: [
          /* @__PURE__ */ e.jsx(t.SelectTrigger, { id: "menu-target", children: /* @__PURE__ */ e.jsx(t.SelectValue, { placeholder: "Choose…" }) }),
          /* @__PURE__ */ e.jsx(t.SelectContent, { children: s === "term" ? a.map((N) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: String(N.id), children: [
            N.taxonomy,
            ": ",
            N.title
          ] }, N.id)) : l.map((N) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: String(N.id), children: N.title }, N.id)) })
        ] })
      ] }),
      s === "url" && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "menu-url", children: "Address" }),
        /* @__PURE__ */ e.jsx(
          t.Input,
          {
            id: "menu-url",
            value: x,
            placeholder: "https://… or /contact",
            "aria-invalid": !b,
            onChange: (N) => d(N.target.value)
          }
        ),
        !b && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "This address could run code; use https://, a path, mailto: or tel:." })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(t.Label, { htmlFor: "menu-label", children: [
          "Label",
          s === "url" ? "" : " (optional)"
        ] }),
        /* @__PURE__ */ e.jsx(t.Input, { id: "menu-label", value: p, onChange: (N) => v(N.target.value) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(t.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "outline", onClick: n, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", onClick: () => {
        $();
      }, disabled: !f, children: "Add" })
    ] })
  ] }) });
}
function wa({ menus: s }) {
  return t.useBreadcrumbs([{ label: "Menus" }]), /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: "Menus" }),
    /* @__PURE__ */ e.jsx(t.PageHeader, { title: "Menus", description: "Navigation for the site: the main menu, the footer…" }),
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no menus yet. Create one under Structure → Menu settings." }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:sm:grid-cols-2 cms:lg:grid-cols-3", children: s.map((a) => /* @__PURE__ */ e.jsx(y.Link, { href: _(`cms/menus/${a.handle}`), className: "cms:rounded-xl cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none", children: /* @__PURE__ */ e.jsxs(t.Card, { className: "cms:h-full cms:transition-colors cms:hover:bg-accent", children: [
      /* @__PURE__ */ e.jsxs(t.CardHeader, { children: [
        /* @__PURE__ */ e.jsx(t.CardTitle, { className: "cms:text-base", children: a.title }),
        /* @__PURE__ */ e.jsx(t.CardDescription, { children: /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: a.handle }) })
      ] }),
      /* @__PURE__ */ e.jsx(t.CardContent, {})
    ] }) }, a.handle)) })
  ] });
}
const Da = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "spam", label: "Spam" },
  { value: "trash", label: "Trash" }
], _a = { pending: "Pending", approved: "Approved", spam: "Spam" };
function Ta({ tab: s, counts: a, filters: l, collections: n, comments: r, can: c, errors: i = {} }) {
  t.useBreadcrumbs([{ label: "Comments", href: _("cms/comments") }]);
  const [o, u] = D.useState(l.search), [m, x] = D.useState([]), [d, p] = D.useState(null), [v, b] = Q(), h = (g) => {
    const k = { status: s, search: l.search, collection: l.collection, ...g };
    y.router.get(_("cms/comments"), {
      ...k.status !== "all" ? { status: k.status } : {},
      ...k.search ? { search: k.search } : {},
      ...k.collection ? { collection: k.collection } : {},
      ...l.entry ? { entry: l.entry } : {}
    }, { preserveState: !0, replace: !0, onSuccess: () => x([]) });
  };
  D.useEffect(() => {
    if (o === l.search) return;
    const g = window.setTimeout(() => h({ search: o }), 300);
    return () => window.clearTimeout(g);
  }, [o]);
  const $ = (g, k = {}) => y.router.post(_(g), k, { preserveScroll: !0, onSuccess: () => x([]) }), f = (g, k) => $(`cms/comments/${g.id}/status`, { status: k }), N = (g) => {
    const k = () => $("cms/comments/bulk", { action: g, ids: m });
    g === "delete" ? v(`Delete ${m.length} comments for good? This can't be undone.`, k) : k();
  }, w = r.data.length > 0 && m.length === r.data.length;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: "Comments" }),
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: "Comments",
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:sm:w-64", children: [
            /* @__PURE__ */ e.jsx(pe, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
            /* @__PURE__ */ e.jsx(
              t.Input,
              {
                type: "search",
                placeholder: "Search text, name or email",
                "aria-label": "Search comments",
                className: "cms:pl-9",
                value: o,
                onChange: (g) => u(g.target.value)
              }
            )
          ] }),
          n.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: l.collection ?? "all", onValueChange: (g) => h({ collection: g === "all" ? null : g }), children: [
            /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Collection", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(t.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(t.SelectItem, { value: "all", children: "Every collection" }),
              n.map((g) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: g.handle, children: g.title }, g.handle))
            ] })
          ] })
        ] })
      }
    ),
    l.entry !== null && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      "Comments on one entry. ",
      /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:underline cms:underline-offset-4", onClick: () => y.router.get(_("cms/comments")), children: "Show all" })
    ] }),
    /* @__PURE__ */ e.jsx(t.Tabs, { value: s, onValueChange: (g) => h({ status: g }), children: /* @__PURE__ */ e.jsx(t.TabsList, { className: "cms:h-auto cms:flex-wrap cms:justify-start", children: Da.map((g) => /* @__PURE__ */ e.jsxs(t.TabsTrigger, { value: g.value, children: [
      g.label,
      " ",
      /* @__PURE__ */ e.jsx("span", { className: "cms:ml-1 cms:text-muted-foreground", children: a[g.value] })
    ] }, g.value)) }) }),
    m.length > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2 cms:text-sm", role: "toolbar", "aria-label": "With the selected comments", children: [
      /* @__PURE__ */ e.jsxs("span", { className: "cms:text-muted-foreground", children: [
        m.length,
        " selected"
      ] }),
      c.moderate && s !== "trash" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "outline", onClick: () => N("approve"), children: [
          /* @__PURE__ */ e.jsx(ue, {}),
          " Approve"
        ] }),
        /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "outline", onClick: () => N("unapprove"), children: [
          /* @__PURE__ */ e.jsx(we, {}),
          " Unapprove"
        ] }),
        /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "outline", onClick: () => N("spam"), children: [
          /* @__PURE__ */ e.jsx($e, {}),
          " Spam"
        ] })
      ] }),
      c.delete && s !== "trash" && /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "outline", onClick: () => N("trash"), children: [
        /* @__PURE__ */ e.jsx(V, {}),
        " Trash"
      ] }),
      c.delete && s === "trash" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "outline", onClick: () => N("restore"), children: [
          /* @__PURE__ */ e.jsx(he, {}),
          " Restore"
        ] }),
        /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "destructive", onClick: () => N("delete"), children: [
          /* @__PURE__ */ e.jsx(V, {}),
          " Delete for good"
        ] })
      ] })
    ] }),
    r.data.length === 0 ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:rounded-xl cms:border cms:border-dashed cms:px-6 cms:py-16 cms:text-center", children: [
      /* @__PURE__ */ e.jsx("span", { className: "cms:grid cms:size-10 cms:place-items-center cms:rounded-full cms:bg-muted cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx(Tt, { className: "cms:size-4" }) }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: l.search ? "No comments match." : "No comments here." })
    ] }) : /* @__PURE__ */ e.jsxs(t.Card, { className: "cms:divide-y cms:p-0", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3 cms:px-4 cms:py-2 cms:text-sm cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsx(t.Checkbox, { checked: w, "aria-label": "Select all", onCheckedChange: (g) => x(g ? r.data.map((k) => k.id) : []) }),
        /* @__PURE__ */ e.jsxs("span", { children: [
          r.from,
          "–",
          r.to,
          " of ",
          r.total
        ] })
      ] }),
      r.data.map((g) => /* @__PURE__ */ e.jsxs("article", { className: "cms:flex cms:gap-3 cms:px-4 cms:py-4", "aria-labelledby": `comment-${g.id}-author`, children: [
        /* @__PURE__ */ e.jsx(
          t.Checkbox,
          {
            checked: m.includes(g.id),
            "aria-label": `Select ${g.author}'s comment`,
            onCheckedChange: (k) => x(k ? [...m, g.id] : m.filter((T) => T !== g.id))
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-x-3 cms:gap-y-1 cms:text-sm", children: [
            /* @__PURE__ */ e.jsx("span", { id: `comment-${g.id}-author`, className: "cms:font-medium", children: g.author }),
            g.email && /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", children: g.email }),
            g.member && /* @__PURE__ */ e.jsx(t.Badge, { variant: "outline", children: "Signed in" }),
            !g.trashed && /* @__PURE__ */ e.jsx(t.Badge, { variant: g.status === "approved" ? "success" : g.status === "spam" ? "destructive" : "warning", children: _a[g.status] }),
            /* @__PURE__ */ e.jsxs("span", { className: "cms:text-muted-foreground", children: [
              g.createdAt ? G(g.createdAt) : "",
              " · ",
              g.locale.toUpperCase()
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
            "On ",
            g.entry.url ? /* @__PURE__ */ e.jsxs("a", { href: g.entry.url, target: "_blank", rel: "noreferrer", className: "cms:underline-offset-4 hover:cms:underline", children: [
              g.entry.title,
              " ",
              /* @__PURE__ */ e.jsx(re, { className: "cms:inline cms:size-3" })
            ] }) : g.entry.title,
            g.parent && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              " · replying to ",
              g.parent.author,
              ": “",
              g.parent.excerpt,
              "”"
            ] })
          ] }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:whitespace-pre-wrap cms:break-words", children: g.body }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-1", children: [
            c.moderate && !g.trashed && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              g.status !== "approved" && /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "ghost", onClick: () => f(g, "approved"), children: [
                /* @__PURE__ */ e.jsx(ue, {}),
                " Approve"
              ] }),
              g.status === "approved" && /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "ghost", onClick: () => f(g, "pending"), children: [
                /* @__PURE__ */ e.jsx(we, {}),
                " Unapprove"
              ] }),
              g.status !== "spam" && /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "ghost", onClick: () => f(g, "spam"), children: [
                /* @__PURE__ */ e.jsx($e, {}),
                " Spam"
              ] }),
              g.status !== "spam" && /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "ghost", onClick: () => p({ row: g, mode: "reply" }), children: [
                /* @__PURE__ */ e.jsx(ks, {}),
                " Reply"
              ] }),
              /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "ghost", onClick: () => p({ row: g, mode: "edit" }), children: [
                /* @__PURE__ */ e.jsx(Ds, {}),
                " Edit"
              ] })
            ] }),
            c.delete && !g.trashed && /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "ghost", onClick: () => y.router.delete(_(`cms/comments/${g.id}`), { preserveScroll: !0 }), children: [
              /* @__PURE__ */ e.jsx(V, {}),
              " Trash"
            ] }),
            c.delete && g.trashed && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "ghost", onClick: () => $(`cms/comments/${g.id}/restore`), children: [
                /* @__PURE__ */ e.jsx(he, {}),
                " Restore"
              ] }),
              /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "ghost", onClick: () => v(
                "Delete this comment for good? Replies to it stay.",
                () => y.router.delete(_(`cms/comments/${g.id}/force`), { preserveScroll: !0 })
              ), children: [
                /* @__PURE__ */ e.jsx(V, {}),
                " Delete for good"
              ] })
            ] })
          ] })
        ] })
      ] }, g.id))
    ] }),
    (r.prev_page_url || r.next_page_url) && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:justify-end cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(t.Button, { variant: "outline", size: "sm", disabled: !r.prev_page_url, onClick: () => r.prev_page_url && y.router.get(r.prev_page_url), children: [
        /* @__PURE__ */ e.jsx(Be, {}),
        " Newer"
      ] }),
      /* @__PURE__ */ e.jsxs(t.Button, { variant: "outline", size: "sm", disabled: !r.next_page_url, onClick: () => r.next_page_url && y.router.get(r.next_page_url), children: [
        "Older ",
        /* @__PURE__ */ e.jsx(xe, {})
      ] })
    ] }),
    d && /* @__PURE__ */ e.jsx(Ba, { row: d.row, mode: d.mode, error: i.body, onClose: () => p(null) }, `${d.mode}-${d.row.id}`),
    b
  ] });
}
function Ba({ row: s, mode: a, error: l, onClose: n }) {
  const [r, c] = D.useState(a === "edit" ? s.body : ""), [i, o] = D.useState(!1), u = () => {
    o(!0);
    const m = { preserveScroll: !0, onSuccess: n, onFinish: () => o(!1) };
    a === "reply" ? y.router.post(_(`cms/comments/${s.id}/reply`), { body: r }, m) : y.router.put(_(`cms/comments/${s.id}`), { body: r }, m);
  };
  return /* @__PURE__ */ e.jsx(t.Dialog, { open: !0, onOpenChange: (m) => !m && n(), children: /* @__PURE__ */ e.jsxs(t.DialogContent, { children: [
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
        value: r,
        "aria-invalid": l !== void 0,
        onChange: (m) => c(m.target.value)
      }
    ),
    /* @__PURE__ */ e.jsx(M, { message: l }),
    /* @__PURE__ */ e.jsxs(t.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "outline", onClick: n, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", disabled: r.trim() === "" || i, onClick: u, children: a === "reply" ? "Post reply" : "Save" })
    ] })
  ] }) });
}
const za = 3;
function La({ form: s, forms: a, submissions: l, can: n }) {
  t.useBreadcrumbs([{ label: "Submissions", href: _("cms/submissions") }, ...s ? [{ label: s.title }] : []]);
  const [r, c] = D.useState(null), [i, o] = Q();
  if (!s || !l)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(y.Head, { title: "Submissions" }),
      /* @__PURE__ */ e.jsx(t.PageHeader, { title: "Submissions", description: "There are no forms yet. Create one under Structure → Forms and put it on a page; what visitors send shows up here." })
    ] });
  const u = (l.data[0]?.rows ?? []).slice(0, za), m = (x) => i(
    "Delete this submission for good? It can't be restored.",
    () => y.router.delete(_(`cms/submissions/${x.id}`), { preserveScroll: !0, onSuccess: () => c(null) })
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: `${s.title} submissions` }),
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: s.title,
        actions: l.total > 0 && n.export && /* @__PURE__ */ e.jsx(t.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: _(`cms/forms/${s.handle}/submissions/export`), children: [
          /* @__PURE__ */ e.jsx(hs, {}),
          " Export CSV"
        ] }) }),
        children: a.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: s.handle, onValueChange: (x) => y.router.get(_(`cms/forms/${x}/submissions`)), children: [
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
        u.map((x) => /* @__PURE__ */ e.jsx(t.TableHead, { children: x.label }, x.handle))
      ] }) }),
      /* @__PURE__ */ e.jsxs(t.TableBody, { children: [
        l.data.length === 0 && /* @__PURE__ */ e.jsx(t.TableRow, { children: /* @__PURE__ */ e.jsx(t.TableCell, { colSpan: u.length + 1, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: "Nothing sent yet." }) }),
        l.data.map((x) => /* @__PURE__ */ e.jsxs(t.TableRow, { children: [
          /* @__PURE__ */ e.jsx(t.TableCell, { className: "cms:whitespace-nowrap", children: /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:font-medium cms:hover:underline", onClick: () => c(x), children: G(x.createdAt) }) }),
          u.map((d) => /* @__PURE__ */ e.jsx(t.TableCell, { className: "cms:max-w-64 cms:truncate", children: x.rows.find((p) => p.handle === d.handle)?.value }, d.handle))
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
            onClick: () => l.prev_page_url && y.router.get(l.prev_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(Be, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          t.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Next page",
            disabled: !l.next_page_url,
            onClick: () => l.next_page_url && y.router.get(l.next_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(xe, {})
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(t.Dialog, { open: r !== null, onOpenChange: (x) => !x && c(null), children: /* @__PURE__ */ e.jsxs(t.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto", children: [
      /* @__PURE__ */ e.jsxs(t.DialogHeader, { children: [
        /* @__PURE__ */ e.jsx(t.DialogTitle, { children: s.title }),
        /* @__PURE__ */ e.jsxs(t.DialogDescription, { children: [
          "Sent ",
          G(r?.createdAt ?? null),
          " · ",
          r?.locale.toUpperCase()
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-3 cms:text-sm", children: r?.rows.map((x) => /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: x.label }),
        /* @__PURE__ */ e.jsx("dd", { className: "cms:whitespace-pre-wrap cms:break-words cms:text-muted-foreground", children: x.file ? /* @__PURE__ */ e.jsx("a", { href: x.file, className: "cms:underline cms:underline-offset-4 hover:cms:text-foreground", download: !0, children: x.value }) : x.value || "—" })
      ] }, x.handle)) }),
      r && (r.visitor.ip || r.visitor.userAgent || r.visitor.referrer) && /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-3 cms:border-t cms:pt-3 cms:text-sm", children: [["IP address", r.visitor.ip], ["Browser", r.visitor.userAgent], ["Sent from", r.visitor.referrer]].map(([x, d]) => d && /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: x }),
        /* @__PURE__ */ e.jsx("dd", { className: "cms:break-all cms:text-muted-foreground", children: d })
      ] }, x)) }),
      n.delete && r && /* @__PURE__ */ e.jsx(t.DialogFooter, { children: /* @__PURE__ */ e.jsxs(t.Button, { variant: "destructive", onClick: () => m(r), children: [
        /* @__PURE__ */ e.jsx(V, {}),
        " Delete"
      ] }) })
    ] }) }),
    o
  ] });
}
function Ma(s) {
  return /* @__PURE__ */ e.jsx(Ia, { ...s }, `${s.locale}:${s.version}:${JSON.stringify([s.values, s.seo, s.term.template])}`);
}
function Ia({ taxonomy: s, term: a, translated: l, fields: n, locale: r, locales: c, shared: i, sharedValues: o, values: u, seo: m, version: x, usedBy: d = [] }) {
  const p = _(`cms/taxonomies/${s.handle}/terms`), v = _(`cms/terms/${a.id}/content`);
  t.useBreadcrumbs([{ label: s.title, href: `${p}?locale=${r}` }, { label: a.title }]);
  const b = y.useForm({ locale: r, data: u, seo: m ?? {}, template: a.template ?? "", version: x }), h = b.errors, $ = () => b.processing || b.put(v, { preserveScroll: !0 }), f = () => {
    b.transform((k) => ({ ...k, version: null })), b.put(v, { preserveScroll: !0 });
  }, N = t.useEditLock({
    type: "cms.term",
    id: a.id,
    locale: r,
    enabled: l,
    noun: "term",
    leaveTo: `${p}?locale=${r}`,
    getUnsaved: () => b.isDirty ? { data: b.data.data, seo: b.data.seo, template: b.data.template } : null
  }), w = l && !N.readOnly, g = async (k) => {
    const T = await N.loadKept(k);
    b.setData((S) => ({
      ...S,
      data: T.data && typeof T.data == "object" ? T.data : S.data,
      seo: T.seo && typeof T.seo == "object" ? T.seo : S.seo,
      template: typeof T.template == "string" ? T.template : S.template
    }));
  };
  return t.useUnsavedChanges(b.isDirty && !N.takenOver, w ? $ : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: (k) => {
    k.preventDefault(), $();
  }, className: "cms:flex cms:max-w-3xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: a.title }),
    N.dialogs,
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: a.title,
        back: { href: `${p}?locale=${r}`, label: `Back to ${s.title}` },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          a.url && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: a.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(re, {}),
            " View"
          ] }) }),
          c.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: r, onValueChange: (k) => y.router.get(_(`cms/terms/${a.id}/edit`), { locale: k }), children: [
            /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(t.SelectContent, { children: c.map((k, T) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: k, children: [
              P(k),
              T === 0 ? " (main)" : ""
            ] }, k)) })
          ] }),
          w && /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", disabled: b.processing, children: [
            b.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
            " Save"
          ] })
        ] }),
        children: b.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      }
    ),
    l ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
      /* @__PURE__ */ e.jsx(t.ViewingNotice, { by: N.viewingBy }),
      /* @__PURE__ */ e.jsx(t.KeptEditsNotice, { kept: N.kept, disabled: !w, onLoad: (k) => {
        g(k);
      }, onDiscard: (k) => {
        N.discardKept(k);
      } }),
      /* @__PURE__ */ e.jsx(Me, { message: h.version, processing: b.processing, onSaveMine: f }),
      /* @__PURE__ */ e.jsx(
        ze,
        {
          disabled: !w,
          fields: n,
          values: b.data.data,
          errors: h,
          storageKey: `cms:term:${s.handle}`,
          shared: i,
          sharedValues: o,
          sharedNote: `Shared by all languages: edit it in ${P(c[0] ?? "en")}.`,
          onChange: (k, T) => b.setData("data", { ...b.data.data, [k]: T })
        }
      ),
      /* @__PURE__ */ e.jsx(t.CollapsibleCard, { title: "Search and sharing", titleClassName: "cms:text-base", storageKey: "cms:term:seo", hasErrors: ae(h, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !w, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(se, { bare: !0, id: "seo", fields: Le, value: b.data.seo, errors: W(h, "seo"), onChange: (k) => b.setData("seo", k) }) }) }),
      /* @__PURE__ */ e.jsxs(t.CollapsibleCard, { title: "Used by", titleClassName: "cms:text-base", storageKey: "cms:term:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
        d.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "No content links here through its fields." }),
        d.map((k) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:gap-2", children: [
          k.url ? /* @__PURE__ */ e.jsx("a", { href: k.url, className: "cms:truncate cms:underline-offset-4 cms:hover:underline", children: k.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:truncate", children: k.label }),
          /* @__PURE__ */ e.jsx("span", { className: "cms:font-mono cms:text-xs cms:text-muted-foreground", children: k.field })
        ] }, `${k.label}:${k.field}`))
      ] }),
      /* @__PURE__ */ e.jsx(
        t.CollapsibleCard,
        {
          title: "Page settings",
          titleClassName: "cms:text-base",
          storageKey: "cms:term:page-settings",
          hasErrors: h.template !== void 0,
          contentClassName: "cms:flex cms:flex-col cms:gap-2",
          children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: !w, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "template", children: "Template" }),
            /* @__PURE__ */ e.jsx(
              t.Input,
              {
                id: "template",
                className: "cms:font-mono",
                placeholder: "The taxonomy's",
                value: b.data.template,
                onChange: (k) => b.setData("template", k.target.value),
                "aria-invalid": h.template !== void 0
              }
            ),
            /* @__PURE__ */ e.jsx(M, { message: h.template })
          ] })
        }
      )
    ] }) : /* @__PURE__ */ e.jsxs("p", { className: "cms:text-muted-foreground", children: [
      "This term has no title in ",
      P(r),
      " yet: give it one in the list first."
    ] })
  ] });
}
const Ce = "__top";
function Ue(s = []) {
  return s.length === 0 ? "" : ` It's used by ${s.slice(0, 5).join("; ")}${s.length > 5 ? ` and ${s.length - 5} more` : ""}.`;
}
function Aa({ taxonomy: s, taxonomies: a, terms: l, locales: n, locale: r, trashed: c = !1 }) {
  t.useBreadcrumbs([{ label: "Terms", href: _("cms/terms") }, ...s ? [{ label: s.title }] : []]);
  const [i, o] = Q(), [u, m] = D.useState(null), [x, d] = D.useState(l);
  if (D.useEffect(() => d(l), [l]), !s)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(y.Head, { title: "Terms" }),
      /* @__PURE__ */ e.jsx(t.PageHeader, { title: "Terms", description: "There are no taxonomies yet. Create one under Structure → Taxonomies (categories, tags…), then add its terms here." })
    ] });
  const p = _(`cms/taxonomies/${s.handle}/terms`), v = (h, $) => {
    const f = $.map((N) => x[N].id);
    d(Gs(x, h, $)), y.router.post(
      _("cms/terms/reorder"),
      { taxonomy: s.handle, ids: f, parent_id: h < 0 ? null : x[h].id },
      { preserveScroll: !0, preserveState: !0, onError: () => d(l) }
    );
  }, b = (h) => /* @__PURE__ */ e.jsx(
    t.SortableList,
    {
      items: ce(x, h),
      getId: ($) => x[$].id,
      disabled: c,
      onReorder: ($) => v(h, $),
      className: h < 0 ? "cms:gap-1" : "cms:mt-1 cms:gap-1 cms:pl-6",
      children: ($, { handle: f, isOverlay: N }) => {
        const w = x[$];
        return /* @__PURE__ */ e.jsxs("div", { className: "cms:rounded-lg cms:border cms:border-border/70 cms:bg-card", children: [
          /* @__PURE__ */ e.jsx("div", { className: "cms:p-2", children: c ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3 cms:pl-1", children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:flex-1 cms:font-medium", children: w.title ?? w.fallback }),
            /* @__PURE__ */ e.jsxs(t.Button, { variant: "outline", size: "sm", onClick: () => y.router.post(_(`cms/terms/${w.id}/restore`), {}, { preserveScroll: !0 }), children: [
              /* @__PURE__ */ e.jsx(he, {}),
              " Restore"
            ] }),
            /* @__PURE__ */ e.jsxs(
              t.Button,
              {
                variant: "ghost",
                size: "sm",
                className: "cms:text-destructive",
                onClick: () => i(
                  `Delete "${w.fallback}" for good, in every language? Entries lose it.${Ue(w.usedBy)}`,
                  () => y.router.delete(_(`cms/terms/${w.id}/force`), { preserveScroll: !0, data: (w.usedBy ?? []).length > 0 ? { force: 1 } : {} })
                ),
                children: [
                  /* @__PURE__ */ e.jsx(V, {}),
                  " Delete for good"
                ]
              }
            )
          ] }) : u === w.id && !N ? /* @__PURE__ */ e.jsx(
            Ke,
            {
              action: _(`cms/terms/${w.id}`),
              method: "put",
              locale: r,
              terms: l,
              hierarchical: s.hierarchical,
              term: w,
              submitLabel: "Save",
              onDone: () => m(null)
            }
          ) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(t.SortableHandle, { ...f, label: `Move ${w.fallback}` }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0 cms:flex-1", children: [
              w.title !== null ? /* @__PURE__ */ e.jsx("span", { className: "cms:font-medium", children: w.title }) : /* @__PURE__ */ e.jsxs("span", { className: "cms:text-muted-foreground cms:italic", children: [
                w.fallback,
                " · not translated"
              ] }),
              w.slug && /* @__PURE__ */ e.jsxs("span", { className: "cms:ml-2 cms:text-xs cms:text-muted-foreground", children: [
                "/",
                w.slug
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(t.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Rename ${w.fallback}`, onClick: () => m(w.id), children: /* @__PURE__ */ e.jsx(Ds, {}) }),
            s.pages && w.title !== null && /* @__PURE__ */ e.jsx(t.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Edit ${w.fallback}'s page`, asChild: !0, children: /* @__PURE__ */ e.jsx(y.Link, { href: _(`cms/terms/${w.id}/edit`) + `?locale=${r}`, children: /* @__PURE__ */ e.jsx(St, {}) }) }),
            /* @__PURE__ */ e.jsx(
              t.Button,
              {
                variant: "ghost",
                size: "icon",
                className: "cms:size-8 cms:text-destructive",
                "aria-label": `Move ${w.fallback} to the trash`,
                onClick: () => i(
                  `Move "${w.fallback}" to the trash, with the terms under it? It comes off the site; you can restore it.${Ue(w.usedBy)}`,
                  () => y.router.delete(_(`cms/terms/${w.id}`), { preserveScroll: !0 })
                ),
                children: /* @__PURE__ */ e.jsx(V, {})
              }
            )
          ] }) }),
          !N && !c && ce(x, $).length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:px-2 cms:pb-2", children: b($) })
        ] });
      }
    }
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: s.title }),
    o,
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: s.title,
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(t.Button, { variant: c ? "secondary" : "ghost", size: "sm", onClick: () => y.router.get(p, { locale: r, ...c ? {} : { trashed: 1 } }), children: c ? "Back to terms" : "Trash" }),
          n.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: r, onValueChange: (h) => y.router.get(p, { locale: h, ...c ? { trashed: 1 } : {} }), children: [
            /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(t.SelectContent, { children: n.map((h) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: h, children: P(h) }, h)) })
          ] })
        ] }),
        children: a.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: s.handle, onValueChange: (h) => y.router.get(_(`cms/taxonomies/${h}/terms`)), children: [
          /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Taxonomy", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(t.SelectContent, { children: a.map((h) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: h.handle, children: h.title }, h.handle)) })
        ] })
      }
    ),
    !c && /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsx(t.CardContent, { children: /* @__PURE__ */ e.jsx(
      Ke,
      {
        action: p,
        method: "post",
        locale: r,
        terms: l,
        hierarchical: s.hierarchical,
        submitLabel: "Add term"
      },
      `new-${l.length}`
    ) }) }),
    /* @__PURE__ */ e.jsx(t.Card, { className: "cms:p-2", children: x.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:p-4 cms:text-center cms:text-muted-foreground", children: c ? "The trash is empty." : "No terms yet." }) : b(-1) })
  ] });
}
function Ke({ action: s, method: a, locale: l, terms: n, hierarchical: r, term: c, submitLabel: i, onDone: o }) {
  const u = y.useForm({ title: c?.title ?? "", slug: c?.slug ?? "", parent_id: c?.parentId ?? null, locale: l, version: c?.version ?? null }), m = u.errors, x = /* @__PURE__ */ new Set();
  if (c) {
    x.add(c.id);
    const v = n.findIndex((b) => b.id === c.id);
    for (let b = v + 1; b < n.length && (n[b]?.depth ?? 0) > c.depth; b++) x.add(n[b].id);
  }
  const d = (v) => {
    v.preventDefault(), u.submit(a, s, { preserveScroll: !0, onSuccess: () => {
      a === "post" && u.reset("title", "slug"), o?.();
    } });
  }, p = c ? `term-${c.id}` : "new-term";
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: d, className: "cms:grid cms:items-start cms:gap-3 cms:md:grid-cols-[2fr_1.5fr_1.5fr_auto]", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${p}-title`, className: c ? "cms:sr-only" : "", children: "Title" }),
      /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: `${p}-title`,
          value: u.data.title,
          placeholder: c?.fallback,
          required: !0,
          onChange: (v) => u.setData("title", v.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(M, { message: m.title ?? m.version })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${p}-slug`, className: c ? "cms:sr-only" : "", children: "Slug" }),
      /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: `${p}-slug`,
          className: "cms:font-mono",
          value: u.data.slug,
          placeholder: "Made from the title",
          onChange: (v) => u.setData("slug", v.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(M, { message: m.slug })
    ] }),
    r ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${p}-parent`, className: c ? "cms:sr-only" : "", children: "Under" }),
      /* @__PURE__ */ e.jsxs(
        t.Select,
        {
          value: u.data.parent_id === null ? Ce : String(u.data.parent_id),
          onValueChange: (v) => u.setData("parent_id", v === Ce ? null : Number(v)),
          children: [
            /* @__PURE__ */ e.jsx(t.SelectTrigger, { id: `${p}-parent`, children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(t.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(t.SelectItem, { value: Ce, children: "Top level" }),
              n.filter((v) => !x.has(v.id)).map((v) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: String(v.id), children: [
                "— ".repeat(v.depth),
                v.title ?? v.fallback
              ] }, v.id))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ e.jsx(M, { message: m.parent_id })
    ] }) : /* @__PURE__ */ e.jsx("div", {}),
    /* @__PURE__ */ e.jsxs("div", { className: `cms:flex cms:gap-2 ${c ? "" : "cms:md:mt-[17px]"}`, children: [
      /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", disabled: u.processing, children: [
        !c && /* @__PURE__ */ e.jsx(q, {}),
        " ",
        i
      ] }),
      o && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", onClick: o, children: "Cancel" })
    ] })
  ] });
}
Zs({
  pages: {
    "Cms/Blueprints/Index": Jt,
    "Cms/Blueprints/Form": qt,
    "Cms/Fieldsets/Index": pa,
    "Cms/Entries/Index": oa,
    "Cms/Entries/Editor": Qt,
    "Cms/Entries/Listing": ha,
    "Cms/Terms/Index": Aa,
    "Cms/Terms/Edit": Ma,
    "Cms/Globals/Index": fa,
    "Cms/Globals/Edit": ga,
    "Cms/Menus/Index": wa,
    "Cms/Menus/Edit": Sa,
    "Cms/Comments/Index": Ta,
    "Cms/Submissions/Index": La
  }
});
t.registerCommandSource((s, a) => rt(s, a, _));
