function Ye() {
  const s = globalThis.Sunrice;
  if (!s)
    throw new Error("[sunrice] This script runs outside the Sunrice admin panel (window.Sunrice is missing).");
  return s;
}
function lt(s) {
  const a = Ye();
  if (a.version !== 2)
    throw new Error(`[sunrice] This plugin was built for admin runtime 2, but the panel runs ${a.version}. Rebuild it with a matching @sunrice/admin-sdk.`);
  for (const [l, n] of Object.entries(s.pages ?? {}))
    a.registerPage(l, n);
}
function T(s = "") {
  return Ye().adminUrl(s);
}
const Qe = globalThis.Sunrice;
if (!Qe) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const t = Qe.modules["@sunrice/admin-sdk/ui"];
function ne(s) {
  return s && typeof s == "object" && !Array.isArray(s) ? s : {};
}
function nt(s, a) {
  if (typeof s != "string" || s === "") return "";
  const l = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(s);
  return l ? a ? `${l[1]}T${l[2] ?? "00:00"}` : l[1] ?? "" : "";
}
function He(s) {
  return s === "" ? null : s;
}
function ct() {
  return { _hidden: !1 };
}
function rt(s) {
  return { type: s, hidden: !1, values: {} };
}
function it(s) {
  const a = s.replace(/[\u0000- \u007f]+/g, ""), l = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(a);
  return l ? ["http", "https", "mailto", "tel"].includes(l[1].toLowerCase()) : !a.includes("\\");
}
function ze({ ids: s, search: a, collections: l }) {
  const n = new URLSearchParams();
  for (const r of s ?? []) n.append("ids[]", String(r));
  a && n.set("search", a);
  for (const r of l) n.append("collections[]", r);
  return n.toString();
}
let ot = 0;
function dt(s, a) {
  return s.length === a ? s.slice() : s.length < a ? [...s, ...Array.from({ length: a - s.length }, () => `k${++ot}`)] : s.slice(0, a);
}
function mt({ taxonomy: s, q: a, ids: l }) {
  const n = new URLSearchParams({ taxonomy: s });
  a && n.set("q", a);
  for (const r of l ?? []) n.append("ids[]", String(r));
  return n.toString();
}
function ut(s, a) {
  return s.map((l) => ({
    id: String(l.id),
    label: l.title,
    description: l.status === "published" ? l.collection : `${l.collection} · ${l.status}`,
    group: "Entries",
    icon: "file-text",
    url: a(`cms/collections/${l.collectionHandle}/entries/${l.id}/edit`)
  }));
}
async function ht(s, a, l) {
  const n = await fetch(`${l("cms/entry-picker")}?${ze({ search: s.trim(), collections: [] })}`, {
    signal: a,
    headers: { Accept: "application/json" },
    credentials: "same-origin"
  });
  if (!n.ok) return [];
  const { items: r } = await n.json();
  return ut(r, l);
}
const Ze = globalThis.Sunrice;
if (!Ze) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const e = Ze.modules["react/jsx-runtime"], Xe = globalThis.Sunrice;
if (!Xe) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const _ = Xe.modules.react, es = globalThis.Sunrice;
if (!es) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const y = es.modules["@inertiajs/react"];
const xt = (s) => s?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
function pt(s, a, l = []) {
  if (a == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: xt(s),
    size: 24,
    node: a,
    ...l.length > 0 ? { aliases: l } : {}
  };
}
const gt = (s) => {
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
const ft = (s) => {
  const a = gt(s);
  return a.charAt(0).toUpperCase() + a.slice(1);
};
const we = (...s) => s.filter((a, l, n) => !!a && a.trim() !== "" && n.indexOf(a) === l).join(" ").trim();
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
function jt(s, a = {}) {
  const l = a.attributeNames ?? {}, n = (u) => l[u] ?? u, r = s.size ?? s.width ?? Z.width, c = s.size ?? s.height ?? Z.height, m = s.aliases?.filter((u) => typeof u == "string" && u.trim() !== "").map((u) => `lucide-${u}`) ?? [], o = [...s.name ? [`lucide-${s.name}`] : [], ...m], h = a.className?.split(" ").filter(Boolean) ?? [], i = a.includeDefaultClasses === !1 ? we(...h) : we("lucide", ...o, ...h), j = a.absoluteStrokeWidth ? Number(a.strokeWidth ?? Z["stroke-width"]) * Number(s.size ?? s.width ?? Z.width) / Number(a.size ?? a.width ?? Z.width) : a.strokeWidth ?? Z["stroke-width"];
  return [
    "svg",
    {
      ...Object.entries(Z).reduce((u, [v, b]) => (u[n(v)] = b, u), {}),
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
      [n("stroke-width")]: j,
      ...i && {
        [n("class")]: i
      },
      [n("viewBox")]: `0 0 ${r} ${c}`,
      ...a.hasA11yProp === !1 ? {
        [n("aria-hidden")]: "true"
      } : {},
      ..."attributes" in a && a.attributes
    },
    s.node.map((u) => {
      const [v, b, p] = u, S = a.nonScalingStroke ? { [n("vector-effect")]: "non-scaling-stroke", ...b } : b;
      return p ? [v, S, p] : [v, S];
    })
  ];
}
function bt(s, a = {}) {
  return jt(s, {
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
const vt = (s) => {
  for (const a in s)
    if (a.startsWith("aria-") || a === "role" || a === "title")
      return !0;
  return !1;
}, yt = _.createContext({}), Nt = () => _.useContext(yt), St = _.forwardRef(
  ({
    color: s,
    size: a,
    width: l,
    height: n,
    strokeWidth: r,
    absoluteStrokeWidth: c,
    nonScalingStroke: m,
    className: o = "",
    children: h,
    iconNode: i = [],
    icon: j = {
      node: i,
      aliases: [],
      size: 24
    },
    ...d
  }, u) => {
    const {
      size: v = 24,
      strokeWidth: b = 2,
      absoluteStrokeWidth: p = !1,
      nonScalingStroke: S = !1,
      color: g = "currentColor",
      className: N = ""
    } = Nt() ?? {}, w = !!h || vt(d), [x, $, D = []] = bt(j, {
      color: s ?? g,
      width: l ?? a ?? v,
      height: n ?? a ?? v,
      strokeWidth: r ?? b,
      absoluteStrokeWidth: c ?? p,
      nonScalingStroke: m ?? S,
      className: we(N, o),
      hasA11yProp: w,
      attributes: d
    });
    return _.createElement(
      x,
      {
        ref: u,
        ...$
      },
      [
        ...D.map(([C, P]) => _.createElement(C, P)),
        ...Array.isArray(h) ? h : [h]
      ]
    );
  }
);
function L(s, a = [], l = []) {
  const n = typeof s == "string" ? pt(s, a, l) : s, r = _.forwardRef(
    ({ className: c, ...m }, o) => _.createElement(St, {
      ref: o,
      icon: n,
      className: c,
      ...m
    })
  );
  return n.name && (r.displayName = ft(n.name)), r;
}
const ss = {
  name: "arrow-down",
  size: 24,
  node: [
    ["path", { d: "M12 5v14", key: "s699le" }],
    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
  ]
};
ss.node;
const ts = L(ss);
const as = {
  name: "arrow-up-down",
  size: 24,
  node: [
    ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
    ["path", { d: "M17 20V4", key: "1ejh1v" }],
    ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
    ["path", { d: "M7 4v16", key: "1glfcx" }]
  ]
};
as.node;
const ls = L(as);
const ns = {
  name: "arrow-up",
  size: 24,
  node: [
    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
    ["path", { d: "M12 19V5", key: "x0mq9r" }]
  ]
};
ns.node;
const cs = L(ns);
const rs = {
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
rs.node;
const Ct = L(rs);
const is = {
  name: "check",
  size: 24,
  node: [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]
};
is.node;
const he = L(is);
const os = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
os.node;
const ds = L(os);
const ms = {
  name: "chevron-left",
  size: 24,
  node: [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]]
};
ms.node;
const Le = L(ms);
const us = {
  name: "chevron-right",
  size: 24,
  node: [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]
};
us.node;
const pe = L(us);
const hs = {
  name: "columns-3",
  size: 24,
  node: [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M9 3v18", key: "fh3hqa" }],
    ["path", { d: "M15 3v18", key: "14nvp0" }]
  ],
  aliases: ["panels-left-right"]
};
hs.node;
const kt = L(hs);
const xs = {
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
xs.node;
const $t = L(xs);
const ps = {
  name: "copy",
  size: 24,
  node: [
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
  ]
};
ps.node;
const wt = L(ps);
const gs = {
  name: "download",
  size: 24,
  node: [
    ["path", { d: "M12 15V3", key: "m9g1x1" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
  ]
};
gs.node;
const fs = L(gs);
const js = {
  name: "external-link",
  size: 24,
  node: [
    ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
    ["path", { d: "M10 14 21 3", key: "gplh6r" }],
    ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
  ]
};
js.node;
const ie = L(js);
const bs = {
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
bs.node;
const _t = L(bs);
const vs = {
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
vs.node;
const Dt = L(vs);
const ys = {
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
ys.node;
const Tt = L(ys);
const Ns = {
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
Ns.node;
const Bt = L(Ns);
const Ss = {
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
Ss.node;
const zt = L(Ss);
const Cs = {
  name: "link-2",
  size: 24,
  node: [
    ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
    ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
    ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
  ]
};
Cs.node;
const Lt = L(Cs);
const ks = {
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
ks.node;
const Mt = L(ks);
const $s = {
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
$s.node;
const It = L($s);
const ws = {
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
ws.node;
const At = L(ws);
const _s = {
  name: "loader-circle",
  size: 24,
  node: [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  aliases: ["loader-2"]
};
_s.node;
const le = L(_s);
const Ds = {
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
Ds.node;
const Ts = L(Ds);
const Bs = {
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
Bs.node;
const Et = L(Bs);
const zs = {
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
zs.node;
const Ls = L(zs);
const Ms = {
  name: "plus",
  size: 24,
  node: [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ]
};
Ms.node;
const q = L(Ms);
const Is = {
  name: "rotate-ccw",
  size: 24,
  node: [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ]
};
Is.node;
const xe = L(Is);
const As = {
  name: "search",
  size: 24,
  node: [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ]
};
As.node;
const ge = L(As);
const Es = {
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
Es.node;
const _e = L(Es);
const Fs = {
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
Fs.node;
const Ft = L(Fs);
const Hs = {
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
Hs.node;
const R = L(Hs);
const Ps = {
  name: "undo-2",
  size: 24,
  node: [
    ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
    ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
  ]
};
Ps.node;
const De = L(Ps);
const Vs = {
  name: "x",
  size: 24,
  node: [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]
};
Vs.node;
const fe = L(Vs);
function Q() {
  const [s, a] = _.useState(null), l = /* @__PURE__ */ e.jsx(t.Dialog, { open: s !== null, onOpenChange: (n) => !n && a(null), children: /* @__PURE__ */ e.jsxs(t.DialogContent, { children: [
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
function Ht(s) {
  const a = (l) => String(l).padStart(2, "0");
  return `${s.getFullYear()}-${a(s.getMonth() + 1)}-${a(s.getDate())}T${a(s.getHours())}:${a(s.getMinutes())}`;
}
function H(s, a) {
  try {
    return new Intl.DisplayNames(a ? [a] : void 0, { type: "language" }).of(s.replace("_", "-")) ?? s;
  } catch {
    return s;
  }
}
async function Pe(s) {
  const a = await fetch(`${T("cms/entry-picker")}?${ze(s)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!a.ok) throw new Error(String(a.status));
  return (await a.json()).items;
}
function je({ id: s, value: a, multiple: l, max: n, collections: r, invalid: c, onChange: m }) {
  const o = a === null ? [] : Array.isArray(a) ? a : [a], [h, i] = _.useState({}), [j, d] = _.useState(""), [u, v] = _.useState(null), [b, p] = _.useState(!1), S = l && n !== null && o.length >= n, g = o.filter((x) => !h[x]).join(",");
  _.useEffect(() => {
    g !== "" && Pe({ ids: g.split(",").map(Number), collections: r }).then((x) => i(($) => ({ ...$, ...Object.fromEntries(x.map((D) => [D.id, D])) }))).catch(() => p(!0));
  }, [g]), _.useEffect(() => {
    if (j.trim() === "") {
      v(null);
      return;
    }
    const x = window.setTimeout(() => {
      Pe({ search: j.trim(), collections: r }).then(($) => {
        v($), p(!1);
      }).catch(() => p(!0));
    }, 250);
    return () => window.clearTimeout(x);
  }, [j]);
  const N = (x) => {
    i(($) => ({ ...$, [x.id]: x })), m(l ? [...o, x.id] : x.id), d("");
  }, w = (x) => m(l ? x : x[0] ?? null);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    o.length > 0 && /* @__PURE__ */ e.jsx(t.SortableList, { items: o, getId: (x) => x, onReorder: (x) => w(x), disabled: !l, className: "cms:gap-1", children: (x, { handle: $ }) => {
      const D = h[x];
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-md cms:border cms:bg-card cms:px-2 cms:py-1 cms:text-sm", children: [
        l && /* @__PURE__ */ e.jsx(t.SortableHandle, { ...$, label: `Move ${D?.title ?? x}` }),
        /* @__PURE__ */ e.jsx("span", { className: `cms:min-w-0 cms:flex-1 cms:truncate ${l ? "" : "cms:pl-1"}`, children: D ? D.title : `Entry #${x}` }),
        D && /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: D.collection }),
        D && /* @__PURE__ */ e.jsx(t.Badge, { variant: D.status === "published" ? "success" : "secondary", children: X(D.status) }),
        /* @__PURE__ */ e.jsx(
          t.Button,
          {
            type: "button",
            variant: "ghost",
            size: "icon",
            className: "cms:size-7",
            "aria-label": `Remove ${D?.title ?? x}`,
            onClick: () => w(o.filter((C) => C !== x)),
            children: /* @__PURE__ */ e.jsx(fe, {})
          }
        )
      ] });
    } }),
    !S && (l || o.length === 0) && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-md", children: [
      /* @__PURE__ */ e.jsx(ge, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
      /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: s,
          className: "cms:pl-9",
          placeholder: "Search entries by title",
          "aria-invalid": c,
          value: j,
          autoComplete: "off",
          onChange: (x) => d(x.target.value)
        }
      ),
      u !== null && /* @__PURE__ */ e.jsxs("ul", { role: "listbox", "aria-label": "Matching entries", className: "cms:absolute cms:z-10 cms:mt-1 cms:max-h-64 cms:w-full cms:overflow-auto cms:rounded-md cms:border cms:bg-card cms:p-1 cms:shadow-md", children: [
        u.filter((x) => !o.includes(x.id)).length === 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: "No entries match." }),
        u.filter((x) => !o.includes(x.id)).map((x) => /* @__PURE__ */ e.jsx("li", { role: "option", "aria-selected": !1, children: /* @__PURE__ */ e.jsxs(
          "button",
          {
            type: "button",
            className: "cms:flex cms:w-full cms:items-center cms:gap-2 cms:rounded cms:px-2 cms:py-1.5 cms:text-left cms:text-sm cms:hover:bg-accent",
            onClick: () => N(x),
            children: [
              /* @__PURE__ */ e.jsx("span", { className: "cms:flex-1 cms:truncate", children: x.title }),
              /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: x.collection })
            ]
          }
        ) }, x.id))
      ] })
    ] }),
    b && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "Entries could not be loaded. Try again." })
  ] });
}
const Rs = _.createContext({}), ve = "__none";
async function Ve(s) {
  const a = await fetch(`${T("cms/term-picker")}?${mt(s)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!a.ok) throw new Error(String(a.status));
  return await a.json();
}
function Pt({ id: s, taxonomy: a, multiple: l, max: n, required: r, invalid: c, value: m, onChange: o }) {
  const h = _.useContext(Rs), i = m === null ? [] : Array.isArray(m) ? m : [m], [j, d] = _.useState(null), [u, v] = _.useState(!1), [b, p] = _.useState(""), [S, g] = _.useState({}), [N, w] = _.useState(!1);
  _.useEffect(() => {
    if (!a) return;
    const k = b.trim(), A = window.setTimeout(() => {
      Ve({ taxonomy: a, q: k }).then((E) => {
        d(E.items), E.more && v(!0), w(!1);
      }).catch(() => w(!0));
    }, k === "" ? 0 : 250);
    return () => window.clearTimeout(A);
  }, [a, b]);
  const x = (k) => h[String(k)] ?? S[k] ?? j?.find((A) => A.id === k)?.label, $ = j === null ? "" : i.filter((k) => x(k) === void 0).join(",");
  if (_.useEffect(() => {
    !a || $ === "" || Ve({ taxonomy: a, ids: $.split(",").map(Number) }).then((k) => g((A) => ({ ...A, ...Object.fromEntries(k.items.map((E) => [E.id, E.label])) }))).catch(() => w(!0));
  }, [a, $]), !a) return /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Choose a taxonomy for this field in its blueprint." });
  if (j === null) return N ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "Terms could not be loaded. Try again." }) : /* @__PURE__ */ e.jsx(t.Skeleton, { className: "cms:h-9 cms:w-full cms:max-w-sm" });
  const D = (k) => `${"— ".repeat(k.depth)}${k.label}`, C = l && n !== null && i.length >= n, P = (k) => o(l ? k : k[0] ?? null), V = u && i.length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-1.5", children: i.map((k) => /* @__PURE__ */ e.jsxs(t.Badge, { variant: "secondary", className: "cms:gap-1 cms:pr-1", children: [
    x(k) ?? `Term #${k}`,
    !(r && !l) && /* @__PURE__ */ e.jsx(
      "button",
      {
        type: "button",
        className: "cms:rounded-sm cms:p-0.5 cms:hover:bg-muted",
        "aria-label": `Remove ${x(k) ?? k}`,
        onClick: () => P(i.filter((A) => A !== k)),
        children: /* @__PURE__ */ e.jsx(fe, { className: "cms:size-3" })
      }
    )
  ] }, k)) }), z = u && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-sm", children: [
    /* @__PURE__ */ e.jsx(ge, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
    /* @__PURE__ */ e.jsx(
      t.Input,
      {
        id: s,
        className: "cms:pl-9",
        placeholder: "Search terms",
        autoComplete: "off",
        "aria-invalid": c,
        value: b,
        onChange: (k) => p(k.target.value)
      }
    )
  ] });
  if (!l && !u) {
    const k = i[0], A = k === void 0 || j.some((E) => E.id === k);
    return /* @__PURE__ */ e.jsxs(t.Select, { value: k === void 0 ? ve : String(k), onValueChange: (E) => o(E === ve ? null : Number(E)), children: [
      /* @__PURE__ */ e.jsx(t.SelectTrigger, { id: s, className: "cms:w-full cms:max-w-sm", "aria-invalid": c, children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
      /* @__PURE__ */ e.jsxs(t.SelectContent, { children: [
        !r && /* @__PURE__ */ e.jsx(t.SelectItem, { value: ve, children: "None" }),
        !A && k !== void 0 && /* @__PURE__ */ e.jsx(t.SelectItem, { value: String(k), children: x(k) ?? `Term #${k}` }),
        j.map((E) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: String(E.id), children: D(E) }, E.id))
      ] })
    ] });
  }
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    V,
    z,
    j.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: b.trim() ? "No terms match." : "Nothing to choose from yet." }) : l ? /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:max-h-72 cms:flex-col cms:gap-2 cms:overflow-auto", children: j.map((k) => {
      const A = i.includes(k.id);
      return /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx(
          t.Checkbox,
          {
            checked: A,
            disabled: !A && C,
            onCheckedChange: (E) => P(E ? [...i, k.id] : i.filter((te) => te !== k.id))
          }
        ),
        D(k)
      ] }, k.id);
    }) }) : /* @__PURE__ */ e.jsx("div", { role: "listbox", "aria-label": "Terms", className: "cms:flex cms:max-h-72 cms:flex-col cms:overflow-auto", children: j.map((k) => /* @__PURE__ */ e.jsx(
      t.Button,
      {
        type: "button",
        variant: i[0] === k.id ? "secondary" : "ghost",
        size: "sm",
        className: "cms:justify-start",
        role: "option",
        "aria-selected": i[0] === k.id,
        onClick: () => o(k.id),
        children: D(k)
      },
      k.id
    )) })
  ] });
}
const Vt = 5;
let Rt = 0;
const Os = () => `f${++Rt}`;
function Us(s) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function Ks(s) {
  return s.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^[0-9_]+/, "").replace(/_{2,}/g, "_").slice(0, 64);
}
function Ws(s, a) {
  const l = new Set(a.map((c) => c.handle)), n = Us(s) || "field";
  let r = n;
  for (let c = 2; l.has(r); c++)
    r = `${n}_${c}`;
  return r;
}
function qs(s) {
  return (s ?? []).map(({ fields: a, ...l }) => ({
    ...l,
    key: Os(),
    fields: qs(a),
    handleTouched: !0
  }));
}
function Gs(s, a) {
  return s.map(({ key: l, handleTouched: n, fields: r, ...c }) => ({
    ...c,
    validation: (c.validation ?? []).map((m) => m.trim()).filter((m) => m !== ""),
    ...a(c.type) ? { fields: Gs(r, a) } : {}
  }));
}
function Ot(s, a, l) {
  return { key: Os(), type: s, label: a, handle: Ws(a, l), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function Ut(s, a, l) {
  if (s.handleTouched) return { ...s, label: a };
  const n = l.filter((r) => r.key !== s.key);
  return { ...s, label: a, handle: Ws(a || s.type, n) };
}
function ce(s, a) {
  const l = `${a}.`, n = {};
  for (const [r, c] of Object.entries(s))
    r.startsWith(l) && (n[r.slice(l.length)] = c);
  return n;
}
function W(s, a) {
  const l = s[a];
  return { ...ce(s, a), ...l !== void 0 ? { "": l } : {} };
}
function ae(s, a) {
  return Object.keys(s).some((l) => l === a || l.startsWith(`${a}.`));
}
const ye = [
  { value: "equals", label: "is", needsValue: !0 },
  { value: "not_equals", label: "is not", needsValue: !0 },
  { value: "filled", label: "is filled in", needsValue: !1 },
  { value: "empty", label: "is empty", needsValue: !1 }
];
function Re(s) {
  return s === !0 ? "true" : s === !1 ? "false" : typeof s == "string" || typeof s == "number" ? String(s) : "";
}
function Me(s, a) {
  const l = s.condition;
  if (!l) return !0;
  const n = a[l.field], r = n != null && n !== "" && n !== !1 && !(Array.isArray(n) && n.length === 0), c = (Array.isArray(n) ? n : [n]).map(Re).includes(Re(l.value));
  switch (l.operator) {
    case "equals":
      return c;
    case "not_equals":
      return !c;
    case "filled":
      return r;
    default:
      return !r;
  }
}
const Ne = "__none";
function M({ message: s }) {
  return s ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: s }) : null;
}
function Oe(s) {
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
const Kt = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function Te(s) {
  if (s.label) return s.label;
  const a = s.handle.replace(/_/g, " ");
  return a.charAt(0).toUpperCase() + a.slice(1);
}
function ee({ field: s, value: a, onChange: l, errors: n, id: r, content: c = !1 }) {
  const m = Te(s), o = Kt.includes(s.type) || ["select", "terms"].includes(s.type) && s.config?.multiple === !0;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", ...o ? { role: "group", "aria-labelledby": `${r}-label` } : {}, children: [
    s.type === "toggle" ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(t.Switch, { id: r, checked: a === !0, onCheckedChange: (h) => l(h) }),
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: r, children: m })
    ] }) : /* @__PURE__ */ e.jsxs(t.Label, { id: `${r}-label`, htmlFor: o ? void 0 : r, children: [
      m,
      s.required && /* @__PURE__ */ e.jsx("span", { className: "cms:text-destructive", children: " *" })
    ] }),
    /* @__PURE__ */ e.jsx(Wt, { field: s, value: a, onChange: l, errors: n, id: r, content: c }),
    s.instructions && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s.instructions }),
    /* @__PURE__ */ e.jsx(M, { message: n[""] })
  ] });
}
function Wt({ field: s, value: a, onChange: l, errors: n, id: r, content: c }) {
  const m = n[""] !== void 0;
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
          "aria-invalid": m,
          value: typeof a == "string" ? a : "",
          rows: J(s, "rows") ?? 4,
          onChange: (o) => l(o.target.value)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ e.jsx(t.RichTextEditor, { id: r, labelledBy: `${r}-label`, invalid: m, value: typeof a == "string" ? a : "", onChange: l });
    case "number":
      return /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: r,
          type: "number",
          className: "cms:max-w-48",
          "aria-invalid": m,
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
          invalid: m,
          required: s.required === !0,
          value: He(nt(a, o)),
          onChange: (h) => l(He(h ?? ""))
        }
      );
    }
    case "select":
      return s.config?.multiple === !0 ? /* @__PURE__ */ e.jsx(Jt, { options: Oe(s), value: Array.isArray(a) ? a.map(String) : [], onChange: l }) : /* @__PURE__ */ e.jsx(Gt, { options: Oe(s), value: typeof a == "string" ? a : null, onChange: l, id: r, required: s.required === !0 });
    case "terms": {
      const o = s.config?.multiple === !0, h = Array.isArray(a) ? a.filter((i) => typeof i == "number") : typeof a == "number" ? a : null;
      return /* @__PURE__ */ e.jsx(
        Pt,
        {
          id: r,
          taxonomy: typeof s.taxonomy == "string" ? s.taxonomy : null,
          multiple: o,
          max: J(s, "max") ?? null,
          required: s.required === !0,
          invalid: m,
          value: o ? Array.isArray(h) ? h : [] : typeof h == "number" ? h : null,
          onChange: l
        }
      );
    }
    case "entries":
      return /* @__PURE__ */ e.jsx(
        je,
        {
          id: r,
          invalid: m,
          multiple: s.config?.multiple === !0,
          max: J(s, "max") ?? null,
          collections: s.collections ?? [],
          onChange: l,
          value: typeof a == "number" || Array.isArray(a) && a.every((o) => typeof o == "number") ? a : null
        }
      );
    case "link":
      return /* @__PURE__ */ e.jsx(Yt, { value: ne(a), onChange: l, errors: n, id: r, collections: s.collections ?? [] });
    case "media":
      return /* @__PURE__ */ e.jsx(
        t.MediaPickerInput,
        {
          id: r,
          invalid: m,
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
      return /* @__PURE__ */ e.jsx(Zt, { field: s, value: Array.isArray(a) ? a : [], onChange: l, errors: n, id: r, content: c });
    case "flexible":
      return /* @__PURE__ */ e.jsx(Xt, { field: s, value: Array.isArray(a) ? a : [], onChange: l, errors: n, id: r });
    default:
      return /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: r,
          "aria-invalid": m,
          value: typeof a == "string" ? a : "",
          placeholder: qt(s, "placeholder"),
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
function qt(s, a) {
  const l = s.config?.[a];
  return typeof l == "string" ? l : void 0;
}
function se({ fields: s, value: a, onChange: l, errors: n, id: r, content: c, bare: m = !1 }) {
  return /* @__PURE__ */ e.jsx("div", { className: m ? "cms:flex cms:flex-col cms:gap-6" : "cms:flex cms:flex-col cms:gap-4 cms:rounded-lg cms:border cms:p-4", children: s.filter((o) => Me(o, a)).map((o) => o.shared ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
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
      onChange: (h) => l({ ...a, [o.handle]: h })
    },
    o.handle
  )) });
}
function Gt({ options: s, value: a, onChange: l, id: n, required: r }) {
  return /* @__PURE__ */ e.jsxs(t.Select, { value: a ?? Ne, onValueChange: (c) => l(c === Ne ? null : c), children: [
    /* @__PURE__ */ e.jsx(t.SelectTrigger, { id: n, className: "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
    /* @__PURE__ */ e.jsxs(t.SelectContent, { children: [
      !r && /* @__PURE__ */ e.jsx(t.SelectItem, { value: Ne, children: "None" }),
      s.map((c) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: c.value, children: c.label }, c.value))
    ] })
  ] });
}
function Jt({ options: s, value: a, onChange: l }) {
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
function Yt({ value: s, onChange: a, errors: l, id: n, collections: r }) {
  const c = s.type === "entry" ? "entry" : "url", m = (o) => {
    const h = { ...s, type: c, ...o }, i = h.type === "entry" ? typeof h.entry_id != "number" : h.url === "" || h.url === void 0 || h.url === null;
    a(i ? h.label || h.new_tab ? h : null : h);
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
        onClick: () => m({ type: o, url: o === "url" ? s.url : void 0, entry_id: o === "entry" ? s.entry_id : void 0 }),
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
          onChange: (o) => m({ url: o.target.value }),
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
          onChange: (o) => m({ entry_id: typeof o == "number" ? o : void 0 })
        }
      ),
      /* @__PURE__ */ e.jsx(
        t.Input,
        {
          "aria-label": "Link text",
          placeholder: c === "entry" ? "Link text (the entry's title)" : "Link text",
          value: typeof s.label == "string" ? s.label : "",
          onChange: (o) => m({ label: o.target.value })
        }
      ),
      /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:h-9 cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx(t.Checkbox, { checked: s.new_tab === !0, onCheckedChange: (o) => m({ new_tab: o }) }),
        "New tab"
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ e.jsx(M, { message: l.url ?? l.entry_id ?? l.label ?? l.type }) })
    ] })
  ] });
}
function Qt(s, a) {
  return !a && (s.fields ?? []).every((l) => l.type === "text");
}
function Js(s) {
  const a = _.useRef([]);
  return a.current = dt(a.current, s), {
    keys: a.current,
    remove: (l) => {
      a.current = a.current.filter((n, r) => r !== l);
    },
    move: (l, n) => {
      a.current = t.moveItem(a.current, l, n);
    }
  };
}
function Zt({ field: s, value: a, onChange: l, errors: n, id: r, content: c = !1 }) {
  const m = s.fields ?? [], o = a.map(ne), h = Js(o.length), i = (b, p) => l(o.map((S, g) => g === b ? p : S)), j = (b) => {
    h.remove(b), l(o.filter((p, S) => S !== b));
  }, d = (s.label || "row").toLowerCase().replace(/s$/, ""), u = d.charAt(0).toUpperCase() + d.slice(1), v = o.map((b, p) => ({ row: b, index: p, key: h.keys[p] ?? String(p) }));
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(
      t.SortableList,
      {
        items: v,
        getId: (b) => b.key,
        onReorder: (b, p, S) => {
          h.move(p, S), l(b.map((g) => g.row));
        },
        children: ({ row: b, index: p }, { handle: S }) => Qt(s, c) ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(t.SortableHandle, { ...S, label: `Move ${d} ${p + 1}`, className: "cms:mt-1" }),
          m.map((g) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
            /* @__PURE__ */ e.jsx(
              t.Input,
              {
                "aria-label": g.label || g.handle,
                placeholder: g.label || g.handle,
                value: typeof b[g.handle] == "string" ? b[g.handle] : "",
                onChange: (N) => i(p, { ...b, [g.handle]: N.target.value })
              }
            ),
            /* @__PURE__ */ e.jsx(M, { message: n[`${p}.${g.handle}`] })
          ] }, g.handle)),
          /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": `Remove ${d} ${p + 1}`, onClick: () => j(p), children: /* @__PURE__ */ e.jsx(R, {}) })
        ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(
            Ys,
            {
              label: `${u} ${p + 1}`,
              handle: S,
              onRemove: () => j(p),
              hidden: c ? b._hidden === !0 : void 0,
              onHidden: (g) => i(p, { ...b, _hidden: g })
            }
          ),
          /* @__PURE__ */ e.jsx(se, { fields: m, value: b, onChange: (g) => i(p, g), errors: W(n, String(p)), id: `${r}-${p}`, content: c })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", size: "sm", onClick: () => l([...o, c ? ct() : {}]), children: [
      /* @__PURE__ */ e.jsx(q, {}),
      " Add ",
      d
    ] }) })
  ] });
}
function Xt({ field: s, value: a, onChange: l, errors: n, id: r }) {
  const c = s.blocks ?? [], m = a.map(ne), o = Js(m.length), h = (d, u) => l(m.map((v, b) => b === d ? u : v)), i = (d) => {
    o.remove(d), l(m.filter((u, v) => v !== d));
  }, j = m.map((d, u) => ({ block: d, index: u, key: o.keys[u] ?? String(u) }));
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    /* @__PURE__ */ e.jsx(
      t.SortableList,
      {
        items: j,
        getId: (d) => d.key,
        className: "cms:gap-3",
        onReorder: (d, u, v) => {
          o.move(u, v), l(d.map((b) => b.block));
        },
        children: ({ block: d, index: u }, { handle: v }) => {
          const b = c.find((p) => p.type === d.type);
          return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              Ys,
              {
                label: b?.label ?? String(d.type),
                badge: !0,
                handle: v,
                onRemove: () => i(u),
                hidden: d.hidden === !0,
                onHidden: (p) => h(u, { ...d, hidden: p })
              }
            ),
            b ? /* @__PURE__ */ e.jsx(
              se,
              {
                fields: b.fields,
                value: ne(d.values),
                onChange: (p) => h(u, { ...d, values: p }),
                errors: W(n, `${u}.values`),
                id: `${r}-${u}`,
                content: !0
              }
            ) : /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: "This kind of block no longer exists. Its values are kept." }),
            /* @__PURE__ */ e.jsx(M, { message: n[`${u}.type`] })
          ] });
        }
      }
    ),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(t.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(t.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", size: "sm", disabled: c.length === 0, children: [
        /* @__PURE__ */ e.jsx(q, {}),
        " Add block"
      ] }) }),
      /* @__PURE__ */ e.jsx(t.DropdownMenuContent, { align: "start", children: c.map((d) => /* @__PURE__ */ e.jsx(t.DropdownMenuItem, { onSelect: () => l([...m, rt(d.type)]), children: d.label }, d.type)) })
    ] }) })
  ] });
}
function Ys({ label: s, badge: a = !1, handle: l, onRemove: n, hidden: r, onHidden: c }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(t.SortableHandle, { ...l, label: `Move ${s}` }),
    a ? /* @__PURE__ */ e.jsx(t.Badge, { variant: "secondary", children: s }) : /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:font-medium", children: s }),
    r !== void 0 && /* @__PURE__ */ e.jsxs("label", { className: "cms:ml-auto cms:flex cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", children: [
      /* @__PURE__ */ e.jsx(t.Switch, { checked: !r, onCheckedChange: (m) => c(!m), "aria-label": `Show ${s}` }),
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
        children: /* @__PURE__ */ e.jsx(R, {})
      }
    )
  ] });
}
function Qs({ fields: s, onChange: a, types: l, errors: n, depth: r = 1, idPrefix: c = "field" }) {
  const [m, o] = _.useState(() => /* @__PURE__ */ new Set()), h = (d) => o((u) => {
    const v = new Set(u);
    return v.has(d) ? v.delete(d) : v.add(d), v;
  }), i = (d, u) => a(s.map((v, b) => b === d ? u : v)), j = (d) => {
    const u = Ot(d.type, d.label, s);
    a([...s, u]), o((v) => new Set(v).add(u.key));
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:border-dashed cms:p-4 cms:text-sm cms:text-muted-foreground", children: "No fields yet." }),
    /* @__PURE__ */ e.jsx(t.SortableList, { items: s, getId: (d) => d.key, onReorder: (d) => a(d), children: (d, { index: u, handle: v, isOverlay: b }) => {
      const p = l.find((N) => N.type === d.type), S = !b && (m.has(d.key) || ae(n, String(u))), g = `${c}-${d.key}`;
      return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${ae(n, String(u)) ? "cms:border-destructive" : ""}`, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:p-2", children: [
          /* @__PURE__ */ e.jsx(t.SortableHandle, { ...v, label: `Move ${d.label || d.handle}` }),
          /* @__PURE__ */ e.jsx(
            t.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-expanded": S,
              "aria-controls": g,
              "aria-label": `${S ? "Close" : "Open"} ${d.label || d.handle}`,
              onClick: () => h(d.key),
              children: S ? /* @__PURE__ */ e.jsx(ds, {}) : /* @__PURE__ */ e.jsx(pe, {})
            }
          ),
          /* @__PURE__ */ e.jsxs("button", { type: "button", className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:text-left", onClick: () => h(d.key), children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: d.label || d.handle }),
            /* @__PURE__ */ e.jsx("code", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", children: d.handle })
          ] }),
          d.required && /* @__PURE__ */ e.jsx(t.Badge, { variant: "outline", children: "Required" }),
          /* @__PURE__ */ e.jsx(t.Badge, { variant: "secondary", children: p?.label ?? d.type }),
          p?.hasChildren && d.fields.length > 0 && !S && /* @__PURE__ */ e.jsxs("span", { className: "cms:text-xs cms:text-muted-foreground", children: [
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
              onClick: () => a(s.filter((N, w) => w !== u)),
              children: /* @__PURE__ */ e.jsx(R, {})
            }
          )
        ] }),
        S && /* @__PURE__ */ e.jsx(
          ea,
          {
            id: g,
            field: d,
            type: p,
            siblings: s,
            onChange: (N) => i(u, N),
            types: l,
            errors: ce(n, String(u)),
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
      /* @__PURE__ */ e.jsx(t.DropdownMenuContent, { align: "start", children: l.filter((d) => !d.hasChildren || r < Vt).map((d) => /* @__PURE__ */ e.jsx(t.DropdownMenuItem, { onSelect: () => j(d), children: d.label }, d.type)) })
    ] }) })
  ] });
}
const Y = { default: "__default", yes: "yes", no: "no" };
function ea({ id: s, field: a, type: l, siblings: n, onChange: r, types: c, errors: m, depth: o }) {
  const h = a.config ?? {};
  return /* @__PURE__ */ e.jsxs("div", { id: s, className: "cms:flex cms:flex-col cms:gap-4 cms:border-t cms:p-4", children: [
    !l && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-destructive", children: [
      'The field type "',
      a.type,
      `" isn't registered. Its data is kept; register the type or remove the field.`
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${s}-label`, children: "Label" }),
        /* @__PURE__ */ e.jsx(t.Input, { id: `${s}-label`, value: a.label ?? "", onChange: (i) => r(Ut(a, i.target.value, n)) }),
        /* @__PURE__ */ e.jsx(M, { message: m.label })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${s}-handle`, children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          t.Input,
          {
            id: `${s}-handle`,
            className: "cms:font-mono",
            value: a.handle,
            onChange: (i) => r({ ...a, handle: Ks(i.target.value), handleTouched: !0 })
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "How templates read it. Renaming it hides values saved under the old one." }),
        /* @__PURE__ */ e.jsx(M, { message: m.handle })
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
          onChange: (i) => r({ ...a, instructions: i.target.value || null })
        }
      ),
      /* @__PURE__ */ e.jsx(M, { message: m.instructions })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-6", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(t.Switch, { id: `${s}-required`, checked: a.required === !0, onCheckedChange: (i) => r({ ...a, required: i }) }),
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${s}-required`, children: "Required" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${s}-translatable`, children: "Per language" }),
        /* @__PURE__ */ e.jsxs(
          t.Select,
          {
            value: a.translatable === !0 ? Y.yes : a.translatable === !1 ? Y.no : Y.default,
            onValueChange: (i) => r({ ...a, translatable: i === Y.yes ? !0 : i === Y.no ? !1 : null }),
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
    /* @__PURE__ */ e.jsx(sa, { id: s, field: a, siblings: n, onChange: r, errors: ce(m, "condition") }),
    (l?.settings.length ?? 0) > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: l?.settings.map((i) => /* @__PURE__ */ e.jsx(
      ee,
      {
        id: `${s}-config-${i.handle}`,
        field: i,
        value: h[i.handle],
        errors: W(m, `config.${i.handle}`),
        onChange: (j) => r({ ...a, config: { ...h, [i.handle]: j } })
      },
      i.handle
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
          onChange: (i) => r({ ...a, validation: i.target.value.split(`
`) })
        }
      ),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Laravel rules, one per line." }),
      /* @__PURE__ */ e.jsx(M, { message: m.validation ?? Object.entries(m).find(([i]) => i.startsWith("validation."))?.[1] })
    ] }),
    l?.hasChildren && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(t.Label, { children: "Fields inside" }),
      /* @__PURE__ */ e.jsx(
        Qs,
        {
          fields: a.fields,
          onChange: (i) => r({ ...a, fields: i }),
          types: c,
          errors: ce(m, "fields"),
          depth: o + 1,
          idPrefix: s
        }
      ),
      /* @__PURE__ */ e.jsx(M, { message: m.fields })
    ] }),
    /* @__PURE__ */ e.jsx(M, { message: m.type })
  ] });
}
const Se = "__always";
function sa({ id: s, field: a, siblings: l, onChange: n, errors: r }) {
  const c = l.filter((i) => i.key !== a.key && i.handle !== ""), m = a.condition ?? null, o = ye.find((i) => i.value === m?.operator) ?? ye[0], h = (i) => n({ ...a, condition: i === null ? null : { field: m?.field ?? c[0]?.handle ?? "", operator: m?.operator ?? "equals", value: m?.value ?? "", ...i } });
  return c.length === 0 && m === null ? null : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${s}-condition`, children: "Show" }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(t.Select, { value: m?.field ?? Se, onValueChange: (i) => h(i === Se ? null : { field: i }), children: [
        /* @__PURE__ */ e.jsx(t.SelectTrigger, { id: `${s}-condition`, className: "cms:w-56", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
        /* @__PURE__ */ e.jsxs(t.SelectContent, { children: [
          /* @__PURE__ */ e.jsx(t.SelectItem, { value: Se, children: "Always" }),
          c.map((i) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: i.handle, children: [
            "When ",
            i.label || i.handle
          ] }, i.key))
        ] })
      ] }),
      m && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(t.Select, { value: o.value, onValueChange: (i) => h({ operator: i }), children: [
          /* @__PURE__ */ e.jsx(t.SelectTrigger, { "aria-label": "How to compare", className: "cms:w-36", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(t.SelectContent, { children: ye.map((i) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: i.value, children: i.label }, i.value)) })
        ] }),
        o.needsValue && /* @__PURE__ */ e.jsx(
          t.Input,
          {
            "aria-label": "Value",
            className: "cms:w-48",
            placeholder: "a value, or true / false",
            value: String(m.value ?? ""),
            onChange: (i) => h({ value: i.target.value })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "A hidden field isn't required, and keeps what it had." }),
    /* @__PURE__ */ e.jsx(M, { message: r.field ?? r.operator ?? r.value ?? r[""] })
  ] });
}
function ta({ kind: s = "blueprint", blueprint: a, fieldTypes: l, usedBy: n = [] }) {
  const r = s === "fieldset" ? "Fieldset" : "Blueprint", c = T(s === "fieldset" ? "cms/fieldsets" : "cms/blueprints"), m = a ? a.title : `New ${r.toLowerCase()}`;
  t.useBreadcrumbs([{ label: `${r}s`, href: c }, { label: m }]);
  const [o, h] = Q(), i = y.useForm({ title: a?.title ?? "", handle: a?.handle ?? "" }), [j, d] = _.useState(a !== null), [u, v] = _.useState(() => qs(a?.fields)), b = (C) => l.find((P) => P.type === C)?.hasChildren === !0, p = i.errors, [S, g] = _.useState(() => JSON.stringify(u)), N = i.isDirty || JSON.stringify(u) !== S, w = () => {
    i.setDefaults(), g(JSON.stringify(u));
  }, x = () => {
    i.processing || (i.transform((C) => ({
      ...a ? { title: C.title } : C,
      fields: Gs(u, b)
    })), a ? i.put(`${c}/${a.id}`, { preserveScroll: !0, onSuccess: w }) : i.post(c, { onSuccess: w }));
  }, $ = (C) => {
    C.preventDefault(), x();
  };
  t.useUnsavedChanges(N, x);
  const D = () => a && o(
    `Delete the ${r.toLowerCase()} "${a.title}"? Content keeps its values.`,
    () => y.router.delete(`${c}/${a.id}`, { preserveScroll: !0 })
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: $, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: m }),
    h,
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: m,
        back: { href: c, label: `Back to ${r.toLowerCase()}s` },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          a && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "outline", size: "icon", className: "cms:text-destructive", "aria-label": `Delete ${m}`, onClick: D, children: /* @__PURE__ */ e.jsx(R, {}) }),
          /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", disabled: i.processing, children: [
            i.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
            a ? "Save" : `Create ${r.toLowerCase()}`
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(M, { message: p.blueprint ?? p.fieldset }),
    /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsxs(t.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "title", children: "Title" }),
        /* @__PURE__ */ e.jsx(t.Input, { id: "title", value: i.data.title, required: !0, onChange: (C) => {
          i.setData((P) => ({ ...P, title: C.target.value, handle: j ? P.handle : Us(C.target.value) }));
        } }),
        /* @__PURE__ */ e.jsx(M, { message: p.title })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "handle", children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          t.Input,
          {
            id: "handle",
            className: "cms:font-mono",
            value: i.data.handle,
            disabled: a !== null,
            required: !0,
            onChange: (C) => {
              d(!0), i.setData("handle", Ks(C.target.value));
            }
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: a ? "Set when it was created." : "Lowercase letters, digits and underscores. It can't change later." }),
        /* @__PURE__ */ e.jsx(M, { message: p.handle })
      ] })
    ] }) }),
    n.length > 0 && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      "Used by ",
      n.join(", "),
      ". Changes show there at once."
    ] }),
    /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-3", "aria-labelledby": "fields-heading", children: [
      /* @__PURE__ */ e.jsx("h2", { id: "fields-heading", className: "cms:text-lg cms:font-medium", children: "Fields" }),
      /* @__PURE__ */ e.jsx(Qs, { fields: u, onChange: v, types: l, errors: ce(p, "fields") }),
      /* @__PURE__ */ e.jsx(M, { message: p.fields })
    ] })
  ] });
}
function Zs({ noun: s, base: a, rows: l, intro: n }) {
  const r = `${s}s`;
  t.useBreadcrumbs([{ label: r }]);
  const [c, m] = Q();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: r }),
    m,
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
              children: /* @__PURE__ */ e.jsx(R, {})
            }
          ) })
        ] }, o.id))
      ] })
    ] }) })
  ] });
}
function aa({ blueprints: s }) {
  const a = y.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(M, { message: a.blueprint }),
    /* @__PURE__ */ e.jsx(
      Zs,
      {
        noun: "Blueprint",
        base: T("cms/blueprints"),
        rows: s,
        intro: "The fields editors fill in, for each kind of content."
      }
    )
  ] });
}
const Ue = { preserveScroll: !0, preserveState: !0 };
function la({ entryId: s, comments: a }) {
  const [l, n] = _.useState(null), [r, c] = _.useState(""), [m, o] = _.useState(!1), h = (j, d) => y.router.post(T(`cms/comments/${j}/status`), { status: d }, Ue), i = (j) => y.router.post(T(`cms/comments/${j}/reply`), { body: r }, {
    ...Ue,
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
        a.latest.map((j) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5 cms:border-t cms:border-border/70 cms:pt-3 cms:first-of-type:border-t-0 cms:first-of-type:pt-0", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium", children: j.author }),
            j.status === "pending" && /* @__PURE__ */ e.jsx(t.Badge, { variant: "outline", children: "Pending" })
          ] }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:line-clamp-3 cms:break-words cms:whitespace-pre-line", children: j.excerpt }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
            G(j.createdAt),
            j.reply ? " · a reply" : ""
          ] }),
          a.canModerate && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-1", children: [
            j.status === "pending" && /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", size: "sm", onClick: () => h(j.id, "approved"), children: [
              /* @__PURE__ */ e.jsx(he, {}),
              " Approve"
            ] }),
            /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => h(j.id, "spam"), children: [
              /* @__PURE__ */ e.jsx(_e, {}),
              " Spam"
            ] }),
            /* @__PURE__ */ e.jsxs(
              t.Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                "aria-expanded": l === j.id,
                onClick: () => {
                  n(l === j.id ? null : j.id), c("");
                },
                children: [
                  /* @__PURE__ */ e.jsx(Ts, {}),
                  " Reply"
                ]
              }
            )
          ] }),
          l === j.id && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              t.Textarea,
              {
                "aria-label": `Reply to ${j.author}`,
                rows: 3,
                value: r,
                onChange: (d) => c(d.target.value)
              }
            ),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
              /* @__PURE__ */ e.jsx(t.Button, { type: "button", size: "sm", disabled: r.trim() === "" || m, onClick: () => i(j.id), children: "Post reply" }),
              /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => n(null), children: "Cancel" })
            ] })
          ] })
        ] }, j.id)),
        /* @__PURE__ */ e.jsx("a", { href: T(`cms/comments?entry=${s}`), className: "cms:text-sm cms:font-medium cms:underline-offset-4 cms:hover:underline", children: "All comments on this entry" })
      ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Skeleton, { className: "cms:h-10" }),
        /* @__PURE__ */ e.jsx(t.Skeleton, { className: "cms:h-10" })
      ] })
    }
  );
}
function Ie({ fields: s, values: a, onChange: l, errors: n, storageKey: r, shared: c = [], sharedValues: m = {}, sharedNote: o, disabled: h = !1 }) {
  const i = [], j = { ...m, ...a };
  for (const u of s.filter((v) => Me(v, j))) {
    const v = i[i.length - 1];
    u.type === "group" ? i.push(u) : Array.isArray(v) ? v.push(u) : i.push([u]);
  }
  const d = o ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: o }) : null;
  return /* @__PURE__ */ e.jsx(e.Fragment, { children: i.map((u) => {
    if (Array.isArray(u))
      return /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsx(t.CardContent, { children: /* @__PURE__ */ e.jsx("fieldset", { disabled: h, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: u.map((S) => c.includes(S.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(ee, { id: `data-${S.handle}`, field: S, content: !0, value: m[S.handle], errors: {}, onChange: () => {
        } }),
        d
      ] }, S.handle) : /* @__PURE__ */ e.jsx(
        ee,
        {
          id: `data-${S.handle}`,
          field: S,
          content: !0,
          value: a[S.handle],
          errors: W(n, `data.${S.handle}`),
          onChange: (g) => l(S.handle, g)
        },
        S.handle
      )) }) }) }, `fields-${u[0]?.handle ?? ""}`);
    const v = c.includes(u.handle), b = (v ? m : a)[u.handle], p = W(n, `data.${u.handle}`);
    return /* @__PURE__ */ e.jsx(
      t.CollapsibleCard,
      {
        title: Te(u),
        titleClassName: "cms:text-base",
        description: u.instructions ?? void 0,
        storageKey: `${r}:${u.handle}`,
        hasErrors: !v && ae(n, `data.${u.handle}`),
        children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: v || h, role: "group", "aria-label": Te(u), className: "cms:flex cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(
            se,
            {
              bare: !0,
              fields: u.fields ?? [],
              id: `data-${u.handle}`,
              content: !0,
              errors: v ? {} : p,
              value: b && typeof b == "object" && !Array.isArray(b) ? b : {},
              onChange: (S) => l(u.handle, S)
            }
          ),
          v && d,
          /* @__PURE__ */ e.jsx(M, { message: v ? void 0 : p[""] })
        ] })
      },
      u.handle
    );
  }) });
}
const Ae = [
  { handle: "title", type: "text", label: "SEO title", instructions: "For search results and tabs. Empty: the title.", config: { max: 255 } },
  { handle: "description", type: "textarea", label: "Description", instructions: "A sentence or two for search results and shared links.", config: { max: 500 } },
  { handle: "image", type: "media", label: "Share image", instructions: "Shown when the page is shared.", config: { types: ["image"] } },
  { handle: "noindex", type: "toggle", label: "Hide from search engines" },
  { handle: "canonical", type: "text", label: "Canonical address", instructions: "Only when this page copies one elsewhere: that page's full address. Empty: this page.", config: { max: 2e3 } }
];
function Ke(s) {
  return s.length === 0 ? "" : ` It's used by ${s.slice(0, 5).map((l) => l.label).join("; ")}${s.length > 5 ? ` and ${s.length - 5} more` : ""}: those links will show nothing.`;
}
function na(s) {
  const { entry: a } = s;
  return /* @__PURE__ */ e.jsx(ca, { ...s }, a ? `${a.id}:${a.locale}:${a.version}:${a.status}:${a.trashed}:${a.publishedAt}` : "new");
}
function ca({ collection: s, fields: a, locales: l = [], shared: n = [], sharedValues: r = {}, entry: c, values: m, revisions: o, comments: h, termLabels: i, usedBy: j = [], undoRestore: d = null, machineTranslate: u = null, settings: v, blueprints: b = [], can: p }) {
  const S = T(`cms/collections/${s.handle}/entries`), g = c ? T(`cms/entries/${c.id}`) : S, N = c ? m.title : "New entry";
  t.useBreadcrumbs([{ label: s.title, href: S }, { label: N }]);
  const [w, x] = Q(), [$, D] = _.useState(!1), C = y.useForm({ ...m, seo: m.seo ?? {}, locale: c?.locale ?? null, version: c?.version ?? null, publish: !1, published_at: null }), P = c ? { locale: c.locale } : {}, V = l.find((B) => B.main)?.code, z = C.errors, k = c !== null && c.status !== "draft" && !c.hasUnpublishedChanges && !C.isDirty, A = c === null ? p.create : p.update && !c.trashed, E = (B = !1, K = null) => {
    C.transform((f) => ({ ...f, publish: B, published_at: K })), c ? C.put(g, { preserveScroll: !0, onSuccess: () => D(!1) }) : C.post(g);
  }, te = () => {
    C.transform((B) => ({ ...B, version: null, publish: !1, published_at: null })), C.put(g, { preserveScroll: !0 });
  }, U = t.useEditLock({
    type: "cms.entry",
    id: c?.id,
    locale: c?.locale,
    enabled: c !== null && A,
    noun: "entry",
    leaveTo: S,
    getUnsaved: () => C.isDirty ? { title: C.data.title, slug: C.data.slug, data: C.data.data, seo: C.data.seo } : null
  }), O = A && !U.readOnly, oe = async (B) => {
    const K = await U.loadKept(B);
    C.setData((f) => ({ ...f, title: K.title ?? f.title, slug: K.slug ?? f.slug, data: K.data ?? f.data, seo: K.seo ?? f.seo }));
  };
  t.useUnsavedChanges(C.isDirty && !U.takenOver, O ? () => C.processing || E() : void 0);
  const de = (B = null) => {
    p.update ? E(!0, B) : c && y.router.post(`${g}/publish`, { ...P, published_at: B }, { preserveScroll: !0, onSuccess: () => D(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (B) => {
    B.preventDefault(), E();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: N }),
    x,
    U.dialogs,
    /* @__PURE__ */ e.jsxs(
      t.PageHeader,
      {
        title: N,
        back: { href: S, label: `Back to ${s.title}` },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          c && !c.trashed && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(
            "a",
            {
              href: c.previewUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              title: C.isDirty ? "Shows the saved draft: save first to see your changes." : "Shows the saved draft.",
              children: [
                /* @__PURE__ */ e.jsx(_t, {}),
                " Preview"
              ]
            }
          ) }),
          c?.url && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: c.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(ie, {}),
            " View"
          ] }) }),
          c?.trashed && p.delete && /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", onClick: () => y.router.post(`${g}/restore`, {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(xe, {}),
            " Restore"
          ] }),
          c?.trashed && p.delete && /* @__PURE__ */ e.jsxs(
            t.Button,
            {
              type: "button",
              variant: "outline",
              className: "cms:text-destructive",
              onClick: () => w(
                `Delete "${m.title}" for good, in every language, with its revisions? This can't be undone.${Ke(j)}`,
                () => y.router.delete(`${g}/force`, { data: j.length > 0 ? { force: 1 } : {} })
              ),
              children: [
                /* @__PURE__ */ e.jsx(R, {}),
                " Delete for good"
              ]
            }
          ),
          c && !c.trashed && p.create && /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "ghost", title: "Copy every language as a new draft", onClick: () => y.router.post(`${g}/duplicate`), children: [
            /* @__PURE__ */ e.jsx(wt, {}),
            " Duplicate"
          ] }),
          c && !c.trashed && p.delete && !U.readOnly && /* @__PURE__ */ e.jsx(
            t.Button,
            {
              type: "button",
              variant: "outline",
              size: "icon",
              className: "cms:text-destructive",
              "aria-label": "Move to the trash",
              onClick: () => w(`Move "${m.title}" to the trash? It comes off the site; you can restore it.${Ke(j)}`, () => y.router.delete(g)),
              children: /* @__PURE__ */ e.jsx(R, {})
            }
          ),
          c && O && u !== null && /* @__PURE__ */ e.jsxs(
            t.Button,
            {
              type: "button",
              variant: "outline",
              disabled: C.processing || C.isDirty,
              title: C.isDirty ? "Save your changes first" : "Fill in what isn't translated yet, into the draft",
              onClick: () => y.router.post(T(`cms/entries/${u}/translate`), { version: c.version }, { preserveScroll: !0 }),
              children: [
                /* @__PURE__ */ e.jsx(Bt, {}),
                " Translate from ",
                l.find((B) => B.main)?.name ?? (V ? H(V) : "the main language")
              ]
            }
          ),
          O && /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", variant: c && p.publish ? "outline" : "default", disabled: C.processing, children: [
            C.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
            c ? "Save draft" : "Create draft"
          ] }),
          c && !c.trashed && p.publish && !U.readOnly && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex", children: [
            /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: k ? "outline" : "default", className: "cms:rounded-r-none cms:disabled:opacity-100", disabled: C.processing || k, onClick: () => de(), children: [
              k && /* @__PURE__ */ e.jsx(he, { className: "cms:text-emerald-600 cms:dark:text-emerald-400" }),
              c.status === "draft" ? "Publish" : k ? "Published" : "Publish changes"
            ] }),
            /* @__PURE__ */ e.jsxs(t.DropdownMenu, { children: [
              /* @__PURE__ */ e.jsx(t.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(t.Button, { type: "button", size: "icon", variant: k ? "outline" : "default", className: k ? "cms:-ml-px cms:rounded-l-none" : "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": "More publishing options", children: /* @__PURE__ */ e.jsx(ds, {}) }) }),
              /* @__PURE__ */ e.jsxs(t.DropdownMenuContent, { align: "end", children: [
                /* @__PURE__ */ e.jsxs(t.DropdownMenuItem, { onSelect: () => D(!0), children: [
                  /* @__PURE__ */ e.jsx(Ct, {}),
                  " Publish on a date…"
                ] }),
                c.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  /* @__PURE__ */ e.jsx(t.DropdownMenuSeparator, {}),
                  /* @__PURE__ */ e.jsx(t.DropdownMenuItem, { onSelect: () => y.router.post(`${g}/unpublish`, P, { preserveScroll: !0 }), children: "Unpublish" })
                ] })
              ] })
            ] })
          ] })
        ] }),
        children: [
          c && /* @__PURE__ */ e.jsx(t.Badge, { variant: c.status === "published" ? "success" : "secondary", children: c.trashed ? "In the trash" : X(c.status) }),
          C.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
        ]
      }
    ),
    c && l.length > 1 && /* @__PURE__ */ e.jsx(
      ra,
      {
        entryUrl: g,
        editUrl: `${S}/${c.id}/edit`,
        current: c.locale,
        locales: l,
        canAdd: p.create && !c.trashed,
        canRemove: p.delete && !c.isMain && !c.trashed,
        onRemove: () => w(
          `Remove the ${H(c.locale)} translation of "${m.title}"? Its revisions go with it.`,
          () => y.router.delete(`${g}/translations/${c.locale}`)
        )
      }
    ),
    /* @__PURE__ */ e.jsx(t.ViewingNotice, { by: U.viewingBy }),
    /* @__PURE__ */ e.jsx(t.KeptEditsNotice, { kept: U.kept, disabled: !O, onLoad: (B) => {
      oe(B);
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
            disabled: C.processing,
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
                value: C.data.title,
                "aria-invalid": z.title !== void 0,
                onChange: (B) => C.setData("title", B.target.value)
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
                value: C.data.slug,
                placeholder: "Made from the title",
                "aria-invalid": z.slug !== void 0,
                onChange: (B) => C.setData("slug", B.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(M, { message: z.slug })
          ] })
        ] }) }) }),
        /* @__PURE__ */ e.jsx(Rs.Provider, { value: Array.isArray(i) || !i ? {} : i, children: /* @__PURE__ */ e.jsx(
          Ie,
          {
            disabled: !O,
            fields: a,
            values: C.data.data,
            errors: z,
            storageKey: `cms:entry:${s.handle}`,
            shared: n,
            sharedValues: r,
            sharedNote: `Shared by all languages: edit it in ${V ? H(V) : "the main language"}.`,
            onChange: (B, K) => C.setData("data", { ...C.data.data, [B]: K })
          }
        ) }),
        /* @__PURE__ */ e.jsx(t.CollapsibleCard, { title: "Search and sharing", titleClassName: "cms:text-base", storageKey: "cms:entry:seo", hasErrors: ae(z, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !O, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(
          se,
          {
            bare: !0,
            id: "seo",
            fields: Ae,
            value: C.data.seo,
            errors: W(z, "seo"),
            onChange: (B) => C.setData("seo", B)
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
            V ? H(V) : "main",
            " version changed since this translation was last saved."
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs(t.CollapsibleCard, { title: "Used by", titleClassName: "cms:text-base", storageKey: "cms:entry:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          j.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "No other content links here." }),
          j.map((B) => /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
            B.url ? /* @__PURE__ */ e.jsx("a", { href: B.url, className: "cms:block cms:truncate cms:underline-offset-4 cms:hover:underline", children: B.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:truncate", children: B.label }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:font-mono cms:text-xs cms:text-muted-foreground", children: B.field })
          ] }, `${B.label}:${B.field}`))
        ] }),
        v && /* @__PURE__ */ e.jsx(oa, { entryUrl: g, collection: s, settings: v, blueprints: b, disabled: !O }),
        h !== null && s.comments && /* @__PURE__ */ e.jsx(la, { entryId: c.id, comments: h }),
        /* @__PURE__ */ e.jsxs(t.CollapsibleCard, { title: "Revisions", titleClassName: "cms:text-base", storageKey: "cms:entry:revisions", contentClassName: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
          d !== null && p.update && /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", size: "sm", onClick: () => y.router.post(T(`cms/entry-translations/${d}/undo-restore`), {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(De, {}),
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
              p.update && !c.trashed && /* @__PURE__ */ e.jsx(
                t.Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  onClick: () => y.router.post(T(`cms/revisions/${B.id}/restore`), {}, { preserveScroll: !0 }),
                  children: "Restore"
                }
              )
            ] }, B.id))
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(
      ia,
      {
        open: $,
        onClose: () => D(!1),
        processing: C.processing,
        current: c?.publishedAt ?? null,
        onSchedule: (B) => de(B)
      }
    )
  ] });
}
function ra({ entryUrl: s, editUrl: a, current: l, locales: n, canAdd: r, canRemove: c, onRemove: m }) {
  const o = n.filter((i) => i.status !== null), h = n.filter((i) => i.status === null);
  return /* @__PURE__ */ e.jsxs("nav", { "aria-label": "Languages", className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("div", { className: "cms:inline-flex cms:items-center cms:gap-0.5 cms:rounded-md cms:bg-muted cms:p-0.5", children: o.map((i) => {
      const j = i.code === l, d = `${i.name ?? H(i.code)}${i.main ? " (main)" : ""}: ${i.status ? X(i.status) : ""}${i.outdated ? ", outdated (the main language changed since)" : ""}`;
      return /* @__PURE__ */ e.jsxs(
        "button",
        {
          type: "button",
          title: d,
          "aria-label": d,
          "aria-current": j ? "page" : void 0,
          onClick: () => !j && y.router.get(a, { locale: i.code }),
          className: `cms:relative cms:inline-flex cms:h-7 cms:min-w-10 cms:items-center cms:justify-center cms:gap-1.5 cms:rounded cms:px-2.5 cms:text-xs cms:font-semibold cms:tracking-wide cms:uppercase cms:transition-colors ${j ? "cms:bg-card cms:text-foreground cms:shadow-xs" : "cms:text-muted-foreground cms:hover:text-foreground"}`,
          children: [
            i.code,
            (i.outdated || i.status === "published") && /* @__PURE__ */ e.jsx("span", { "aria-hidden": !0, className: `cms:size-1.5 cms:rounded-full ${i.outdated ? "cms:bg-amber-500" : "cms:bg-emerald-500"}` })
          ]
        },
        i.code
      );
    }) }),
    r && h.map((i) => /* @__PURE__ */ e.jsxs(
      t.Button,
      {
        type: "button",
        variant: "outline",
        size: "sm",
        className: "cms:h-8 cms:border-dashed cms:text-xs cms:uppercase",
        title: `Add ${i.name ?? H(i.code)}`,
        onClick: () => y.router.post(`${s}/translations`, { locale: i.code }),
        children: [
          /* @__PURE__ */ e.jsx(q, {}),
          " ",
          i.code
        ]
      },
      i.code
    )),
    c && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:ml-auto cms:text-destructive", onClick: m, children: "Remove this language" })
  ] });
}
function ia({ open: s, onClose: a, onSchedule: l, current: n, processing: r }) {
  const [c, m] = _.useState("");
  return _.useEffect(() => {
    s && m(Ht(n ? new Date(n) : new Date(Date.now() + 864e5)));
  }, [s, n]), /* @__PURE__ */ e.jsx(t.Dialog, { open: s, onOpenChange: (o) => !o && a(), children: /* @__PURE__ */ e.jsxs(t.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(t.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(t.DialogTitle, { children: "Publish on a date" }),
      /* @__PURE__ */ e.jsx(t.DialogDescription, { children: "The entry goes live then; a date in the past publishes it now with that date." })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "published-at", children: "Date and time" }),
      /* @__PURE__ */ e.jsx(t.DatePicker, { id: "published-at", withTime: !0, required: !0, className: "cms:max-w-none", value: c || null, onChange: (o) => m(o ?? "") }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "In your time zone." })
    ] }),
    /* @__PURE__ */ e.jsxs(t.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "outline", onClick: a, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", disabled: c === "" || r, onClick: () => l(new Date(c).toISOString()), children: "Publish" })
    ] })
  ] }) });
}
function oa({ entryUrl: s, collection: a, settings: l, blueprints: n, disabled: r }) {
  const c = n.length > 1 ? l.blueprint ?? n[0].handle : void 0, m = y.useForm({
    parent_id: l.parentId,
    template: l.template ?? "",
    comments_closed: l.commentsClosed === !0,
    ...c !== void 0 ? { blueprint: c } : {}
  }), o = m.errors;
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
          value: m.data.parent_id,
          onChange: (h) => m.setData("parent_id", typeof h == "number" ? h : null)
        }
      ),
      /* @__PURE__ */ e.jsx(M, { message: o.parent_id })
    ] }),
    n.length > 1 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "blueprint", children: "Blueprint" }),
      /* @__PURE__ */ e.jsxs(t.Select, { value: m.data.blueprint, onValueChange: (h) => m.setData("blueprint", h), children: [
        /* @__PURE__ */ e.jsx(t.SelectTrigger, { id: "blueprint", "aria-invalid": o.blueprint !== void 0, children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(t.SelectContent, { children: n.map((h) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: h.handle, children: h.title }, h.handle)) })
      ] }),
      m.data.blueprint !== c && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The fields change in every language; values of fields both blueprints have are kept. Save your draft first: the editor reloads." }),
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
          value: m.data.template,
          onChange: (h) => m.setData("template", h.target.value),
          "aria-invalid": o.template !== void 0
        }
      ),
      /* @__PURE__ */ e.jsx(M, { message: o.template })
    ] }),
    a.comments && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(t.Switch, { id: "comments-open", checked: !m.data.comments_closed, onCheckedChange: (h) => m.setData("comments_closed", !h) }),
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "comments-open", children: "Accept new comments" }),
      /* @__PURE__ */ e.jsx("a", { href: T(`cms/comments?entry=${s.split("/").slice(-1)[0]}`), className: "cms:ml-auto cms:text-muted-foreground cms:underline-offset-4 hover:cms:underline", children: "Comments" })
    ] }),
    m.isDirty && /* @__PURE__ */ e.jsx(
      t.Button,
      {
        type: "button",
        size: "sm",
        disabled: m.processing,
        onClick: () => m.put(`${s}/settings`, { preserveScroll: !0, preserveState: m.data.blueprint === c, onSuccess: () => m.setDefaults() }),
        children: "Save settings"
      }
    )
  ] }) });
}
function Be(s, a) {
  const l = s[a]?.depth ?? 0;
  let n = a + 1;
  for (; n < s.length && s[n].depth > l; ) n++;
  return n;
}
function re(s, a) {
  const l = a < 0 ? 0 : a + 1, n = a < 0 ? s.length : Be(s, a), r = a < 0 ? 0 : (s[a]?.depth ?? 0) + 1, c = [];
  for (let m = l; m < n; m++)
    s[m].depth === r && c.push(m);
  return c;
}
function Xs(s, a, l) {
  const n = re(s, a);
  if (l.length !== n.length || [...l].sort((o, h) => o - h).some((o, h) => o !== n[h]) || n.length === 0) return s.slice();
  const r = n[0], c = Be(s, n[n.length - 1]), m = l.flatMap((o) => s.slice(o, Be(s, o)));
  return [...s.slice(0, r), ...m, ...s.slice(c)];
}
function da(s, a, l) {
  const n = s.find((c) => c.id === a);
  if (!n) return [];
  const r = l(n);
  return s.filter((c) => l(c) === r).map((c) => c.id);
}
function ma({ collection: s, rows: a }) {
  const [l, n] = _.useState(a);
  _.useEffect(() => n(a), [a]);
  const r = (c, m) => {
    const o = c[m];
    if (!o) return;
    const h = o.parentId ?? null, i = da(c, o.id, (j) => j.parentId ?? null);
    n(c), y.router.post(
      T("cms/entries/reorder"),
      { collection: s, ids: i, parent_id: h },
      { preserveScroll: !0, preserveState: !0, onError: () => n(a) }
    );
  };
  return /* @__PURE__ */ e.jsx(t.Card, { className: "cms:p-2", children: /* @__PURE__ */ e.jsx(t.SortableList, { items: l, getId: (c) => c.id, onReorder: (c, m, o) => r(c, o), className: "cms:gap-1", children: (c, { handle: m }) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-lg cms:border cms:border-border/70 cms:bg-card cms:p-2 cms:text-sm", children: [
    /* @__PURE__ */ e.jsx(t.SortableHandle, { ...m, label: `Move ${c.title}` }),
    /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium", children: c.title }),
    c.parent && /* @__PURE__ */ e.jsxs("span", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", children: [
      "under ",
      c.parent
    ] }),
    /* @__PURE__ */ e.jsx(t.Badge, { variant: c.status === "published" ? "success" : "secondary", children: X(c.status) })
  ] }) }) });
}
function ua(s, a, l) {
  const n = { ...s, ...a }, r = Object.fromEntries(Object.entries(n.terms).filter(([, m]) => m !== "")), c = {};
  return n.search && (c.search = n.search), n.status && (c.status = n.status), n.author && (c.author = n.author), Object.keys(r).length > 0 && (c.terms = r), n.locale && n.locale !== l && (c.locale = n.locale), n.sort && (c.sort = n.sort), c.per_page = n.perPage, c;
}
function ha(s) {
  const a = new URLSearchParams();
  for (const [l, n] of Object.entries(s))
    if (typeof n == "object")
      for (const [r, c] of Object.entries(n)) a.set(`${l}[${r}]`, c);
    else
      a.set(l, String(n));
  return a.toString();
}
function xa(s, a) {
  return s === a ? `-${a}` : s === `-${a}` ? "" : a;
}
function pa(s, a) {
  return s === a ? "asc" : s === `-${a}` ? "desc" : null;
}
function We(s) {
  return [s.search, s.status, s.author, ...Object.values(s.terms)].filter((a) => a !== "").length;
}
const Ce = "__all", ga = [
  { value: "draft", label: "Drafts" },
  { value: "published", label: "Published" },
  { value: "scheduled", label: "Scheduled" },
  { value: "trashed", label: "Trash" }
];
function fa(s) {
  const { collection: a, entries: l, query: n } = s;
  return t.useBreadcrumbs([{ label: a ? a.title : "Entries" }]), !a || !l || !n ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: "Entries" }),
    /* @__PURE__ */ e.jsx(t.PageHeader, { title: "Entries", description: "There are no collections yet. Create one under Structure → Collections, then come back to write its entries." })
  ] }) : /* @__PURE__ */ e.jsx(ja, { ...s, collection: a, entries: l, query: n });
}
function ja({
  collection: s,
  collections: a,
  entries: l,
  query: n,
  columns: r = [],
  filters: c = { authors: [], taxonomies: [], locales: [] },
  links: m = [],
  manualOrder: o = !1,
  perPageOptions: h = [10, 25, 50, 100],
  preferencesKey: i,
  can: j
}) {
  const d = T(`cms/collections/${s.handle}/entries`), u = c.locales[0] ?? n.locale, [v, b] = _.useState(n.search), [p, S] = _.useState([]), [g, N] = _.useState(!1), [w, x] = Q(), { setColumns: $, setPerPage: D } = t.useTablePreferences(i ?? `table.cms.entries.${s.handle}`, { columns: n.columns, perPage: n.perPage });
  _.useEffect(() => S([]), [l]);
  const C = n.status === "trashed", P = We(n) > 0, V = r.filter((f) => n.columns.includes(f.key)), z = (f = {}) => ua(n, f, u), k = (f) => y.router.get(d, z(f), { preserveState: !0, preserveScroll: !0, replace: !0 });
  _.useEffect(() => {
    if (v === n.search) return;
    const f = window.setTimeout(() => k({ search: v }), 300);
    return () => window.clearTimeout(f);
  }, [v]);
  const A = C ? j?.delete ? [{ action: "restore", label: "Restore" }, { action: "delete", label: "Delete for good", danger: !0 }] : [] : [
    ...j?.publish ? [{ action: "publish", label: "Publish" }, { action: "unpublish", label: "Unpublish" }] : [],
    ...j?.delete ? [{ action: "trash", label: "Move to the trash", danger: !0 }] : []
  ], E = (f, I, F = !1) => {
    const me = () => y.router.post(`${d}/bulk`, { action: f, ids: p }, { preserveScroll: !0 });
    F ? w(`${I}: ${p.length} ${p.length === 1 ? "entry" : "entries"}?${f === "delete" ? " This can't be undone." : ""}`, me) : me();
  }, te = async (f) => {
    const I = new Set(n.columns);
    I.has(f) ? I.delete(f) : I.add(f), await $(r.map((F) => F.key).filter((F) => I.has(F))), y.router.reload({ only: ["entries", "query"] });
  }, U = () => {
    b(""), k({ search: "", status: "", author: "", terms: {} });
  }, O = o && !!j?.update, oe = O && l !== null && l.lastPage <= 1 && l.data.length > 1, de = 1 + V.length + (A.length > 0 ? 1 : 0) + (O ? 1 : 0), B = ha(z()), K = [...new Set(m.map((f) => f.group))];
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: s.title }),
    x,
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: s.title,
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          m.length > 0 && /* @__PURE__ */ e.jsxs(t.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(t.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(t.Button, { variant: "outline", children: [
              /* @__PURE__ */ e.jsx($t, {}),
              " Go to"
            ] }) }),
            /* @__PURE__ */ e.jsx(t.DropdownMenuContent, { align: "end", className: "cms:min-w-56", children: K.map((f, I) => /* @__PURE__ */ e.jsxs(_.Fragment, { children: [
              I > 0 && /* @__PURE__ */ e.jsx(t.DropdownMenuSeparator, {}),
              /* @__PURE__ */ e.jsx(t.DropdownMenuLabel, { children: f }),
              m.filter((F) => F.group === f).map((F) => /* @__PURE__ */ e.jsx(t.DropdownMenuItem, { asChild: !0, children: F.external ? /* @__PURE__ */ e.jsxs("a", { href: F.href, target: "_blank", rel: "noopener noreferrer", children: [
                F.label,
                " ",
                /* @__PURE__ */ e.jsx(ie, { className: "cms:ml-auto" })
              ] }) : /* @__PURE__ */ e.jsx(y.Link, { href: F.href, children: F.label }) }, F.href))
            ] }, f)) })
          ] }),
          s.listing && !C && /* @__PURE__ */ e.jsx(t.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs(y.Link, { href: T(`cms/collections/${s.handle}/listing`), children: [
            /* @__PURE__ */ e.jsx(zt, {}),
            " Listing page"
          ] }) }),
          l.total > 0 && j?.export && /* @__PURE__ */ e.jsx(t.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: `${d}/export${B ? `?${B}` : ""}`, children: [
            /* @__PURE__ */ e.jsx(fs, {}),
            " Export CSV"
          ] }) }),
          j?.create && !C && /* @__PURE__ */ e.jsx(t.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(y.Link, { href: `${d}/create`, children: [
            /* @__PURE__ */ e.jsx(q, {}),
            " New entry"
          ] }) })
        ] }),
        children: a.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: s.handle, onValueChange: (f) => y.router.get(T(`cms/collections/${f}/entries`)), children: [
          /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Collection", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(t.SelectContent, { children: a.map((f) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: f.handle, children: f.title }, f.handle)) })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-xs", children: [
        /* @__PURE__ */ e.jsx(ge, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          t.Input,
          {
            className: "cms:pl-9",
            placeholder: "Search titles, slugs or #id",
            "aria-label": "Search entries",
            value: v,
            onChange: (f) => b(f.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(ke, { label: "Status", value: n.status, options: ga, onChange: (f) => k({ status: f }) }),
      c.authors.length > 0 && /* @__PURE__ */ e.jsx(ke, { label: "Author", value: n.author, options: c.authors, onChange: (f) => k({ author: f }) }),
      c.taxonomies.filter((f) => f.terms.length > 0).map((f) => /* @__PURE__ */ e.jsx(
        ke,
        {
          label: f.title,
          value: n.terms[f.handle] ?? "",
          options: f.terms.map((I) => ({ value: I.value, label: `${"— ".repeat(I.depth)}${I.label}` })),
          onChange: (I) => k({ terms: { ...n.terms, [f.handle]: I } })
        },
        f.handle
      )),
      c.locales.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: n.locale, onValueChange: (f) => k({ locale: f }), children: [
        /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-40", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(t.SelectContent, { children: c.locales.map((f) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: f, children: [
          H(f),
          f === u ? " (main)" : ""
        ] }, f)) })
      ] }),
      P && /* @__PURE__ */ e.jsxs(t.Button, { variant: "ghost", size: "sm", onClick: U, children: [
        /* @__PURE__ */ e.jsx(fe, {}),
        " Clear"
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:ml-auto cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
        p.length > 0 && A.length > 0 && /* @__PURE__ */ e.jsxs("div", { role: "toolbar", "aria-label": "Selected entries", className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsxs("span", { className: "cms:text-sm cms:text-muted-foreground", children: [
            p.length,
            " selected"
          ] }),
          A.map((f) => /* @__PURE__ */ e.jsx(t.Button, { size: "sm", variant: f.danger ? "destructive" : "outline", onClick: () => E(f.action, f.label, f.danger), children: f.label }, f.action))
        ] }),
        oe && /* @__PURE__ */ e.jsxs(t.Button, { variant: g ? "secondary" : "outline", "aria-pressed": g, onClick: () => N(!g), children: [
          /* @__PURE__ */ e.jsx(ls, {}),
          " ",
          g ? "Done" : "Reorder"
        ] }),
        r.length > 0 && /* @__PURE__ */ e.jsxs(t.DropdownMenu, { children: [
          /* @__PURE__ */ e.jsx(t.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(t.Button, { variant: "outline", children: [
            /* @__PURE__ */ e.jsx(kt, {}),
            " Columns"
          ] }) }),
          /* @__PURE__ */ e.jsxs(t.DropdownMenuContent, { align: "end", className: "cms:max-h-96 cms:overflow-y-auto", children: [
            /* @__PURE__ */ e.jsx(t.DropdownMenuLabel, { children: "Columns" }),
            r.filter((f) => !f.field).map((f) => /* @__PURE__ */ e.jsx(
              t.DropdownMenuCheckboxItem,
              {
                checked: n.columns.includes(f.key),
                onSelect: (I) => I.preventDefault(),
                onCheckedChange: () => {
                  te(f.key);
                },
                children: f.label
              },
              f.key
            )),
            r.some((f) => f.field) && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(t.DropdownMenuSeparator, {}),
              /* @__PURE__ */ e.jsx(t.DropdownMenuLabel, { children: "Fields" }),
              r.filter((f) => f.field).map((f) => /* @__PURE__ */ e.jsx(
                t.DropdownMenuCheckboxItem,
                {
                  checked: n.columns.includes(f.key),
                  onSelect: (I) => I.preventDefault(),
                  onCheckedChange: () => {
                    te(f.key);
                  },
                  children: f.label
                },
                f.key
              ))
            ] })
          ] })
        ] })
      ] })
    ] }),
    g && oe ? /* @__PURE__ */ e.jsx(ma, { collection: s.handle, rows: l.data }) : /* @__PURE__ */ e.jsxs(t.Card, { className: "cms:gap-0 cms:overflow-hidden cms:py-0", children: [
      /* @__PURE__ */ e.jsxs(t.Table, { children: [
        /* @__PURE__ */ e.jsx(t.TableHeader, { className: "cms:bg-muted/60", children: /* @__PURE__ */ e.jsxs(t.TableRow, { className: "cms:hover:bg-transparent", children: [
          A.length > 0 && /* @__PURE__ */ e.jsx(t.TableHead, { className: "cms:w-10", children: /* @__PURE__ */ e.jsx(
            t.Checkbox,
            {
              "aria-label": "Select all on this page",
              checked: l.data.length > 0 && p.length === l.data.length,
              onCheckedChange: (f) => S(f ? l.data.map((I) => I.id) : [])
            }
          ) }),
          /* @__PURE__ */ e.jsx(qe, { label: "Title", sortKey: "title", sort: n.sort, onSort: (f) => k({ sort: f }) }),
          V.map((f) => f.sortable ? /* @__PURE__ */ e.jsx(qe, { label: f.label, sortKey: f.key, sort: n.sort, onSort: (I) => k({ sort: I }) }, f.key) : /* @__PURE__ */ e.jsx(t.TableHead, { children: f.label }, f.key)),
          O && /* @__PURE__ */ e.jsx(t.TableHead, { className: "cms:w-px", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: "Order" }) })
        ] }) }),
        /* @__PURE__ */ e.jsxs(t.TableBody, { children: [
          l.data.length === 0 && /* @__PURE__ */ e.jsx(t.TableRow, { className: "cms:hover:bg-transparent", children: /* @__PURE__ */ e.jsx(t.TableCell, { colSpan: de, className: "cms:h-32 cms:text-center cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx(va, { trashed: C, filtered: We(C ? { ...n, status: "" } : n) > 0, canCreate: !!j?.create, createUrl: `${d}/create`, onClear: U }) }) }),
          l.data.map((f, I) => /* @__PURE__ */ e.jsxs(t.TableRow, { className: "sunrice-row-in", style: { "--i": I }, "data-state": p.includes(f.id) ? "selected" : void 0, children: [
            A.length > 0 && /* @__PURE__ */ e.jsx(t.TableCell, { children: /* @__PURE__ */ e.jsx(
              t.Checkbox,
              {
                "aria-label": `Select ${f.title}`,
                checked: p.includes(f.id),
                onCheckedChange: (F) => S(F ? [...p, f.id] : p.filter((me) => me !== f.id))
              }
            ) }),
            /* @__PURE__ */ e.jsxs(t.TableCell, { children: [
              /* @__PURE__ */ e.jsx(
                y.Link,
                {
                  href: T(`cms/collections/${s.handle}/entries/${f.id}/edit${n.locale !== u ? `?locale=${encodeURIComponent(n.locale)}` : ""}`),
                  className: "cms:font-medium cms:underline-offset-4 cms:hover:underline",
                  children: f.title
                }
              ),
              (!n.columns.includes("slug") || f.parent) && /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
                !n.columns.includes("slug") && `/${f.slug}`,
                f.parent ? `${n.columns.includes("slug") ? "" : " · "}under ${f.parent}` : ""
              ] })
            ] }),
            V.map((F) => /* @__PURE__ */ e.jsx(t.TableCell, { className: F.key === "status" ? "" : "cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx("div", { className: "cms:max-w-72 cms:truncate", children: /* @__PURE__ */ e.jsx(ba, { row: f, column: F, mainLocale: u }) }) }, F.key)),
            O && /* @__PURE__ */ e.jsx(t.TableCell, { className: "cms:w-px", children: /* @__PURE__ */ e.jsxs("span", { className: "cms:flex", children: [
              /* @__PURE__ */ e.jsx(t.Button, { variant: "ghost", size: "icon", "aria-label": `Move ${f.title} up`, onClick: () => y.router.post(T(`cms/entries/${f.id}/move`), { direction: "up" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(cs, {}) }),
              /* @__PURE__ */ e.jsx(t.Button, { variant: "ghost", size: "icon", "aria-label": `Move ${f.title} down`, onClick: () => y.router.post(T(`cms/entries/${f.id}/move`), { direction: "down" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(ts, {}) })
            ] }) })
          ] }, f.id))
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4 cms:border-t cms:px-6 cms:py-3 cms:text-sm cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-4", children: [
          /* @__PURE__ */ e.jsx("span", { children: l.total === 0 ? "No entries" : `${l.from}–${l.to} of ${l.total}` }),
          /* @__PURE__ */ e.jsxs(t.Select, { value: String(n.perPage), onValueChange: (f) => {
            D(Number(f)), k({ perPage: Number(f) });
          }, children: [
            /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:h-8 cms:w-auto", "aria-label": "Entries per page", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(t.SelectContent, { children: h.map((f) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: String(f), children: [
              f,
              " per page"
            ] }, f)) })
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
              children: /* @__PURE__ */ e.jsx(Le, {})
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
              children: /* @__PURE__ */ e.jsx(pe, {})
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function ke({ label: s, value: a, options: l, onChange: n }) {
  return /* @__PURE__ */ e.jsxs(t.Select, { value: a === "" ? Ce : a, onValueChange: (r) => n(r === Ce ? "" : r), children: [
    /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-40", "aria-label": s, children: /* @__PURE__ */ e.jsx(t.SelectValue, { placeholder: s }) }),
    /* @__PURE__ */ e.jsxs(t.SelectContent, { children: [
      /* @__PURE__ */ e.jsxs(t.SelectItem, { value: Ce, children: [
        s,
        ": all"
      ] }),
      l.map((r) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: r.value, children: r.label }, r.value))
    ] })
  ] });
}
function qe({ label: s, sortKey: a, sort: l, onSort: n }) {
  const r = pa(l, a);
  return /* @__PURE__ */ e.jsx(t.TableHead, { "aria-sort": r === "asc" ? "ascending" : r === "desc" ? "descending" : void 0, children: /* @__PURE__ */ e.jsxs(
    "button",
    {
      type: "button",
      onClick: () => n(xa(l, a)),
      className: "cms:-ml-2 cms:inline-flex cms:h-8 cms:items-center cms:gap-1 cms:rounded-md cms:px-2 cms:hover:bg-accent cms:hover:text-accent-foreground",
      children: [
        s,
        r === "asc" ? /* @__PURE__ */ e.jsx(cs, { className: "cms:size-3" }) : r === "desc" ? /* @__PURE__ */ e.jsx(ts, { className: "cms:size-3" }) : /* @__PURE__ */ e.jsx(ls, { className: "cms:size-3 cms:opacity-40" })
      ]
    }
  ) });
}
function ba({ row: s, column: a, mainLocale: l }) {
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
            title: `${H(n.code)}: ${n.status === null ? "not translated" : X(n.status)}${n.outdated ? ", outdated: the main language changed since" : ""}`,
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
function va({ trashed: s, filtered: a, canCreate: l, createUrl: n, onClear: r }) {
  return a ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: "Nothing matches these filters." }),
    /* @__PURE__ */ e.jsxs(t.Button, { variant: "outline", size: "sm", onClick: r, children: [
      /* @__PURE__ */ e.jsx(fe, {}),
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
function Ee({ message: s, processing: a, onSaveMine: l }) {
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
function ya(s) {
  return /* @__PURE__ */ e.jsx(Na, { ...s }, `${s.locale}:${s.version}:${JSON.stringify([s.values, s.seo])}`);
}
function Na({ collection: s, fields: a, locale: l, locales: n, shared: r, values: c, seo: m, version: o, can: h }) {
  const i = T(`cms/collections/${s.handle}/listing`), j = T(`cms/collections/${s.handle}/entries`);
  t.useBreadcrumbs([{ label: s.title, href: j }, { label: "Listing page" }]);
  const d = y.useForm({ locale: l, data: c, seo: m ?? {}, version: o }), u = d.errors, v = n[0], b = h.update, p = () => d.processing || d.put(i, { preserveScroll: !0 }), S = () => {
    d.transform((g) => ({ ...g, version: null })), d.put(i, { preserveScroll: !0 });
  };
  return t.useUnsavedChanges(d.isDirty, b ? p : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: (g) => {
    g.preventDefault(), p();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: `${s.title}: listing page` }),
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: `${s.title}: listing page`,
        back: { href: j, label: `Back to ${s.title}` },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          n.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: l, onValueChange: (g) => y.router.get(i, { locale: g }), children: [
            /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(t.SelectContent, { children: n.map((g, N) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: g, children: [
              H(g),
              N === 0 ? " (main)" : ""
            ] }, g)) })
          ] }),
          s.url && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: s.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(ie, {}),
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
      /* @__PURE__ */ e.jsx(Ee, { message: u.version, processing: d.processing, onSaveMine: S }),
      a.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The listing page has no fields of its own: choose a listing blueprint for the collection under Structure → Collections." }) : /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsx(t.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: a.filter((g) => Me(g, { ...c, ...d.data.data })).map((g) => r.includes(g.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(ee, { id: `data-${g.handle}`, field: g, content: !0, value: c[g.handle], errors: {}, onChange: () => {
        } }),
        /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
          "Shared by all languages: edit it in ",
          v ? H(v) : "the main language",
          "."
        ] })
      ] }, g.handle) : /* @__PURE__ */ e.jsx(
        ee,
        {
          id: `data-${g.handle}`,
          field: g,
          content: !0,
          value: d.data.data[g.handle],
          errors: W(u, `data.${g.handle}`),
          onChange: (N) => d.setData("data", { ...d.data.data, [g.handle]: N })
        },
        g.handle
      )) }) })
    ] }),
    /* @__PURE__ */ e.jsx(t.CollapsibleCard, { title: "Search and sharing", titleClassName: "cms:text-base", storageKey: "cms:listing:seo", hasErrors: ae(u, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !b, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(se, { bare: !0, id: "seo", fields: Ae, value: d.data.seo, errors: W(u, "seo"), onChange: (g) => d.setData("seo", g) }) }) })
  ] });
}
function Sa({ fieldsets: s }) {
  const a = y.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(M, { message: a.fieldset }),
    /* @__PURE__ */ e.jsx(
      Zs,
      {
        noun: "Fieldset",
        base: T("cms/fieldsets"),
        rows: s,
        intro: "Fields shared between blueprints, and the kinds of block of flexible fields."
      }
    )
  ] });
}
function Ca(s) {
  return /* @__PURE__ */ e.jsx(ka, { ...s }, `${s.locale}:${s.version}:${JSON.stringify(s.values)}`);
}
function ka({ set: s, fields: a, locale: l, locales: n, shared: r, values: c, version: m, can: o }) {
  const h = T(`cms/globals/${s.handle}`);
  t.useBreadcrumbs([{ label: "Globals", href: T("cms/globals") }, { label: s.title }]);
  const i = y.useForm({ locale: l, data: c, version: m }), j = i.errors, d = n[0], u = t.useEditLock({
    type: "cms.global",
    id: s.id,
    locale: l,
    enabled: o.update,
    noun: "global set",
    leaveTo: T("cms/globals"),
    getUnsaved: () => i.isDirty ? { data: i.data.data } : null
  }), v = o.update && !u.readOnly, b = () => i.processing || i.put(h, { preserveScroll: !0 }), p = () => {
    i.transform((g) => ({ ...g, version: null })), i.put(h, { preserveScroll: !0 });
  }, S = async (g) => {
    const N = await u.loadKept(g);
    N.data && typeof N.data == "object" && i.setData("data", N.data);
  };
  return t.useUnsavedChanges(i.isDirty && !u.takenOver, v ? b : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: (g) => {
    g.preventDefault(), b();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: s.title }),
    u.dialogs,
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: s.title,
        back: { href: T("cms/globals"), label: "Back to globals" },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          n.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: l, onValueChange: (g) => y.router.get(h, { locale: g }), children: [
            /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(t.SelectContent, { children: n.map((g, N) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: g, children: [
              H(g),
              N === 0 ? " (main)" : ""
            ] }, g)) })
          ] }),
          v && /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", disabled: i.processing, children: [
            i.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
            " Save"
          ] })
        ] }),
        children: i.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      }
    ),
    a.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "This global set has no fields: choose a blueprint for it under Structure → Global sets." }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(t.ViewingNotice, { by: u.viewingBy }),
      /* @__PURE__ */ e.jsx(Ee, { message: j.version, processing: i.processing, onSaveMine: p }),
      /* @__PURE__ */ e.jsx(t.KeptEditsNotice, { kept: u.kept, disabled: !v, onLoad: (g) => {
        S(g);
      }, onDiscard: (g) => {
        u.discardKept(g);
      } }),
      /* @__PURE__ */ e.jsx(
        Ie,
        {
          disabled: !v,
          fields: a,
          values: i.data.data,
          errors: j,
          storageKey: `cms:global:${s.handle}`,
          shared: r,
          sharedValues: c,
          sharedNote: `Shared by all languages: edit it in ${d ? H(d) : "the main language"}.`,
          onChange: (g, N) => i.setData("data", { ...i.data.data, [g]: N })
        }
      )
    ] })
  ] });
}
function $a({ sets: s }) {
  return t.useBreadcrumbs([{ label: "Globals" }]), /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: "Globals" }),
    /* @__PURE__ */ e.jsx(t.PageHeader, { title: "Globals", description: "Values the whole site uses, like contact details and footer text." }),
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no global sets yet. Create one under Structure → Global sets." }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:sm:grid-cols-2 cms:lg:grid-cols-3", children: s.map((a) => /* @__PURE__ */ e.jsx(y.Link, { href: T(`cms/globals/${a.handle}`), className: "cms:rounded-xl cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none", children: /* @__PURE__ */ e.jsxs(t.Card, { className: "cms:h-full cms:transition-colors cms:hover:bg-accent", children: [
      /* @__PURE__ */ e.jsxs(t.CardHeader, { children: [
        /* @__PURE__ */ e.jsx(t.CardTitle, { className: "cms:text-base", children: a.title }),
        /* @__PURE__ */ e.jsx(t.CardDescription, { children: a.blueprint ? /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: a.handle }) : "No blueprint yet: choose one under Structure → Global sets." })
      ] }),
      /* @__PURE__ */ e.jsx(t.CardContent, {})
    ] }) }, a.handle)) })
  ] });
}
let et = 0;
function st(s, a = 0) {
  return s.flatMap(({ children: l, ...n }) => [{ ...n, key: `m${++et}`, depth: a }, ...st(l ?? [], a + 1)]);
}
function wa(s) {
  const a = [], l = [{ depth: -1, children: a }];
  for (const { key: n, depth: r, ...c } of s) {
    for (; l.length > 1 && l[l.length - 1].depth >= r; ) l.pop();
    const m = { ...c, children: [] };
    l[l.length - 1].children.push(m), l.push({ depth: r, children: m.children });
  }
  return a;
}
function Fe(s, a) {
  const l = s[a]?.depth ?? 0;
  let n = a + 1;
  for (; n < s.length && s[n].depth > l; ) n++;
  return n;
}
function tt(s, a, l) {
  const n = Fe(s, a);
  return s.map((r, c) => c >= a && c < n ? { ...r, depth: r.depth + l } : r);
}
function _a(s, a, l) {
  const n = s[a], r = s[a - 1];
  return !n || !r || n.depth > r.depth || Math.max(...s.slice(a, Fe(s, a)).map((m) => m.depth)) + 1 > l - 1 ? s : tt(s, a, 1);
}
function Da(s, a) {
  return (s[a]?.depth ?? 0) === 0 ? s : tt(s, a, -1);
}
function Ta(s, a) {
  return [...s.slice(0, a), ...s.slice(Fe(s, a))];
}
function ue(s) {
  return { key: `m${++et}`, depth: 0, entry_id: null, term_id: null, collection_id: null, target: null, url: null, labels: {}, new_tab: !1, ...s };
}
function Ba({ menu: s, items: a, locales: l, limits: n, terms: r, listings: c, can: m }) {
  const o = T(`cms/menus/${s.handle}`);
  t.useBreadcrumbs([{ label: "Menus", href: T("cms/menus") }, { label: s.title }]);
  const [h, i] = _.useState(() => st(a)), [j, d] = _.useState(null), u = y.useForm({ items: a }), v = u.errors, [b, p] = _.useState(!1), S = l[0] ?? "en", g = (D) => {
    i(D), p(!0);
  }, N = (D, C) => g(h.map((P, V) => V === D ? { ...P, ...C } : P)), w = () => {
    u.processing || (u.transform(() => ({ items: wa(h).map(at) })), u.put(o, { preserveScroll: !0, onSuccess: () => p(!1) }));
  }, x = (D) => {
    D.preventDefault(), w();
  };
  t.useUnsavedChanges(b, m.update ? w : void 0);
  const $ = (D) => /* @__PURE__ */ e.jsx(
    t.SortableList,
    {
      items: re(h, D),
      getId: (C) => h[C].key,
      disabled: !m.update,
      onReorder: (C) => g(Xs(h, D, C)),
      className: D < 0 ? "cms:gap-1" : "cms:mt-1 cms:gap-1 cms:pl-6",
      children: (C, { handle: P, isOverlay: V }) => {
        const z = h[C];
        return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${V ? "" : "cms:border-border/70"}`, children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2 cms:p-2", children: [
            m.update && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:h-10 cms:shrink-0 cms:items-center", children: /* @__PURE__ */ e.jsx(t.SortableHandle, { ...P, label: `Move ${z.labels[S] || z.target?.title || z.url || "link"}` }) }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
                /* @__PURE__ */ e.jsx(
                  t.Input,
                  {
                    "aria-label": `Label (${H(S)})`,
                    className: "cms:w-full cms:sm:max-w-xs",
                    disabled: !m.update,
                    placeholder: z.target?.title ?? "Label",
                    value: z.labels[S] ?? "",
                    onChange: (k) => N(C, { labels: { ...z.labels, [S]: k.target.value } })
                  }
                ),
                /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-32 cms:flex-1 cms:truncate cms:text-sm cms:text-muted-foreground", children: z.url !== null ? z.url : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  z.target ? `${z.target.kind}: ${z.target.title}` : "Gone",
                  " ",
                  (!z.target || !z.target.live) && /* @__PURE__ */ e.jsx(t.Badge, { variant: "outline", children: "Not on the site" })
                ] }) }),
                m.update && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center", children: [
                  /* @__PURE__ */ e.jsxs("label", { className: "cms:mr-2 cms:flex cms:items-center cms:gap-1.5 cms:text-sm", children: [
                    /* @__PURE__ */ e.jsx(t.Checkbox, { checked: z.new_tab, onCheckedChange: (k) => N(C, { new_tab: k }) }),
                    " New tab"
                  ] }),
                  /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Out a level", disabled: z.depth === 0, onClick: () => g(Da(h, C)), children: /* @__PURE__ */ e.jsx(Mt, {}) }),
                  /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "In a level", onClick: () => g(_a(h, C, n.depth)), children: /* @__PURE__ */ e.jsx(It, {}) }),
                  /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": "Remove, with what's under it", onClick: () => g(Ta(h, C)), children: /* @__PURE__ */ e.jsx(R, {}) })
                ] })
              ] }),
              l.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: l.slice(1).map((k) => /* @__PURE__ */ e.jsx(
                t.Input,
                {
                  "aria-label": `Label (${H(k)})`,
                  className: "cms:w-full cms:sm:max-w-xs",
                  disabled: !m.update,
                  placeholder: `${H(k)}: as ${H(S)}`,
                  value: z.labels[k] ?? "",
                  onChange: (A) => N(C, { labels: { ...z.labels, [k]: A.target.value } })
                },
                k
              )) })
            ] })
          ] }),
          !V && re(h, C).length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:px-2 cms:pb-2", children: $(C) })
        ] });
      }
    }
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: x, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: s.title }),
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: s.title,
        back: { href: T("cms/menus"), label: "Back to menus" },
        actions: m.update && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", disabled: h.length >= n.items, onClick: () => d("entry"), children: [
            /* @__PURE__ */ e.jsx(q, {}),
            " Entry"
          ] }),
          r.length > 0 && /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", disabled: h.length >= n.items, onClick: () => d("term"), children: [
            /* @__PURE__ */ e.jsx(Ft, {}),
            " Term"
          ] }),
          c.length > 0 && /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", disabled: h.length >= n.items, onClick: () => d("listing"), children: [
            /* @__PURE__ */ e.jsx(At, {}),
            " Listing"
          ] }),
          /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", disabled: h.length >= n.items, onClick: () => d("url"), children: [
            /* @__PURE__ */ e.jsx(Lt, {}),
            " Link"
          ] }),
          /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", disabled: u.processing, children: [
            u.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
            " Save"
          ] })
        ] }),
        children: b && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      }
    ),
    /* @__PURE__ */ e.jsx(M, { message: v.items }),
    Object.keys(v).some((D) => D.startsWith("items.")) && /* @__PURE__ */ e.jsxs("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: [
      "Some links need fixing: ",
      Object.values(v).filter(Boolean)[0]
    ] }),
    /* @__PURE__ */ e.jsx(t.Card, { className: "cms:p-2", children: h.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:p-4 cms:text-center cms:text-muted-foreground", children: "No links yet. Add an entry or a link." }) : $(-1) }),
    /* @__PURE__ */ e.jsx(Ma, { kind: j, terms: r, listings: c, onClose: () => d(null), onAdd: (D) => {
      g([...h, D]), d(null);
    }, main: S })
  ] });
}
function at({ target: s, children: a, ...l }) {
  return { ...l, children: a.map(at) };
}
const za = { entry: "Link to an entry", term: "Link to a term's page", listing: "Link to a listing page", url: "Link to an address" }, La = {
  entry: "It follows the entry: its title (unless you give a label) and its address in each language. It shows only while the entry is on the site.",
  term: "The page listing the term's entries, in each language. Its title is the label unless you give one.",
  listing: "The collection's listing page, in each language. The collection's title is the label unless you give one.",
  url: "A web address, a path on this site (/contact), mailto: or tel:."
};
function Ma({ kind: s, terms: a, listings: l, onClose: n, onAdd: r, main: c }) {
  const [m, o] = _.useState(null), [h, i] = _.useState(""), [j, d] = _.useState(""), [u, v] = _.useState("");
  _.useEffect(() => {
    o(null), i(""), d(""), v("");
  }, [s]);
  const b = j.trim() === "" || it(j.trim()), p = u.trim() ? { [c]: u.trim() } : {}, S = async () => {
    if (s === "entry" && m !== null) {
      const N = await fetch(`${T("cms/entry-picker")}?${ze({ ids: [m], collections: [] })}`, { headers: { Accept: "application/json" }, credentials: "same-origin" }), w = N.ok ? (await N.json()).items[0] : void 0;
      r(ue({ entry_id: m, target: w ? { title: w.title, kind: w.collection, live: w.status === "published" } : null, labels: p }));
    } else if (s === "term" && h !== "") {
      const N = a.find((w) => String(w.id) === h);
      r(ue({ term_id: Number(h), target: N ? { title: N.title, kind: N.taxonomy, live: !0 } : null, labels: p }));
    } else if (s === "listing" && h !== "") {
      const N = l.find((w) => String(w.id) === h);
      r(ue({ collection_id: Number(h), target: N ? { title: N.title, kind: "Listing page", live: !0 } : null, labels: p }));
    } else s === "url" && j.trim() !== "" && b && u.trim() !== "" && r(ue({ url: j.trim(), labels: p }));
  }, g = s === "entry" ? m !== null : s === "url" ? j.trim() !== "" && b && u.trim() !== "" : h !== "";
  return /* @__PURE__ */ e.jsx(t.Dialog, { open: s !== null, onOpenChange: (N) => !N && n(), children: /* @__PURE__ */ e.jsxs(t.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(t.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(t.DialogTitle, { children: s ? za[s] : "" }),
      /* @__PURE__ */ e.jsx(t.DialogDescription, { children: s ? La[s] : "" })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
      s === "entry" && /* @__PURE__ */ e.jsx(
        je,
        {
          id: "menu-entry",
          value: m,
          multiple: !1,
          max: null,
          collections: [],
          invalid: !1,
          onChange: (N) => o(typeof N == "number" ? N : null)
        }
      ),
      (s === "term" || s === "listing") && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "menu-target", children: s === "term" ? "Term" : "Collection" }),
        /* @__PURE__ */ e.jsxs(t.Select, { value: h, onValueChange: i, children: [
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
            value: j,
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
        /* @__PURE__ */ e.jsx(t.Input, { id: "menu-label", value: u, onChange: (N) => v(N.target.value) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(t.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "outline", onClick: n, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", onClick: () => {
        S();
      }, disabled: !g, children: "Add" })
    ] })
  ] }) });
}
function Ia({ menus: s }) {
  return t.useBreadcrumbs([{ label: "Menus" }]), /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: "Menus" }),
    /* @__PURE__ */ e.jsx(t.PageHeader, { title: "Menus", description: "Navigation for the site: the main menu, the footer…" }),
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no menus yet. Create one under Structure → Menu settings." }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:sm:grid-cols-2 cms:lg:grid-cols-3", children: s.map((a) => /* @__PURE__ */ e.jsx(y.Link, { href: T(`cms/menus/${a.handle}`), className: "cms:rounded-xl cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none", children: /* @__PURE__ */ e.jsxs(t.Card, { className: "cms:h-full cms:transition-colors cms:hover:bg-accent", children: [
      /* @__PURE__ */ e.jsxs(t.CardHeader, { children: [
        /* @__PURE__ */ e.jsx(t.CardTitle, { className: "cms:text-base", children: a.title }),
        /* @__PURE__ */ e.jsx(t.CardDescription, { children: /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: a.handle }) })
      ] }),
      /* @__PURE__ */ e.jsx(t.CardContent, {})
    ] }) }, a.handle)) })
  ] });
}
const Aa = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "spam", label: "Spam" },
  { value: "trash", label: "Trash" }
], Ea = { pending: "Pending", approved: "Approved", spam: "Spam" };
function Fa({ tab: s, counts: a, filters: l, collections: n, comments: r, can: c, errors: m = {} }) {
  t.useBreadcrumbs([{ label: "Comments", href: T("cms/comments") }]);
  const [o, h] = _.useState(l.search), [i, j] = _.useState([]), [d, u] = _.useState(null), [v, b] = Q(), p = (x) => {
    const $ = { status: s, search: l.search, collection: l.collection, ...x };
    y.router.get(T("cms/comments"), {
      ...$.status !== "all" ? { status: $.status } : {},
      ...$.search ? { search: $.search } : {},
      ...$.collection ? { collection: $.collection } : {},
      ...l.entry ? { entry: l.entry } : {}
    }, { preserveState: !0, replace: !0, onSuccess: () => j([]) });
  };
  _.useEffect(() => {
    if (o === l.search) return;
    const x = window.setTimeout(() => p({ search: o }), 300);
    return () => window.clearTimeout(x);
  }, [o]);
  const S = (x, $ = {}) => y.router.post(T(x), $, { preserveScroll: !0, onSuccess: () => j([]) }), g = (x, $) => S(`cms/comments/${x.id}/status`, { status: $ }), N = (x) => {
    const $ = () => S("cms/comments/bulk", { action: x, ids: i });
    x === "delete" ? v(`Delete ${i.length} comments for good? This can't be undone.`, $) : $();
  }, w = r.data.length > 0 && i.length === r.data.length;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: "Comments" }),
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: "Comments",
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:sm:w-64", children: [
            /* @__PURE__ */ e.jsx(ge, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
            /* @__PURE__ */ e.jsx(
              t.Input,
              {
                type: "search",
                placeholder: "Search text, name or email",
                "aria-label": "Search comments",
                className: "cms:pl-9",
                value: o,
                onChange: (x) => h(x.target.value)
              }
            )
          ] }),
          n.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: l.collection ?? "all", onValueChange: (x) => p({ collection: x === "all" ? null : x }), children: [
            /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Collection", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(t.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(t.SelectItem, { value: "all", children: "Every collection" }),
              n.map((x) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: x.handle, children: x.title }, x.handle))
            ] })
          ] })
        ] })
      }
    ),
    l.entry !== null && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      "Comments on one entry. ",
      /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:underline cms:underline-offset-4", onClick: () => y.router.get(T("cms/comments")), children: "Show all" })
    ] }),
    /* @__PURE__ */ e.jsx(t.Tabs, { value: s, onValueChange: (x) => p({ status: x }), children: /* @__PURE__ */ e.jsx(t.TabsList, { className: "cms:h-auto cms:flex-wrap cms:justify-start", children: Aa.map((x) => /* @__PURE__ */ e.jsxs(t.TabsTrigger, { value: x.value, children: [
      x.label,
      " ",
      /* @__PURE__ */ e.jsx("span", { className: "cms:ml-1 cms:text-muted-foreground", children: a[x.value] })
    ] }, x.value)) }) }),
    i.length > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2 cms:text-sm", role: "toolbar", "aria-label": "With the selected comments", children: [
      /* @__PURE__ */ e.jsxs("span", { className: "cms:text-muted-foreground", children: [
        i.length,
        " selected"
      ] }),
      c.moderate && s !== "trash" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "outline", onClick: () => N("approve"), children: [
          /* @__PURE__ */ e.jsx(he, {}),
          " Approve"
        ] }),
        /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "outline", onClick: () => N("unapprove"), children: [
          /* @__PURE__ */ e.jsx(De, {}),
          " Unapprove"
        ] }),
        /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "outline", onClick: () => N("spam"), children: [
          /* @__PURE__ */ e.jsx(_e, {}),
          " Spam"
        ] })
      ] }),
      c.delete && s !== "trash" && /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "outline", onClick: () => N("trash"), children: [
        /* @__PURE__ */ e.jsx(R, {}),
        " Trash"
      ] }),
      c.delete && s === "trash" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "outline", onClick: () => N("restore"), children: [
          /* @__PURE__ */ e.jsx(xe, {}),
          " Restore"
        ] }),
        /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "destructive", onClick: () => N("delete"), children: [
          /* @__PURE__ */ e.jsx(R, {}),
          " Delete for good"
        ] })
      ] })
    ] }),
    r.data.length === 0 ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:rounded-xl cms:border cms:border-dashed cms:px-6 cms:py-16 cms:text-center", children: [
      /* @__PURE__ */ e.jsx("span", { className: "cms:grid cms:size-10 cms:place-items-center cms:rounded-full cms:bg-muted cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx(Et, { className: "cms:size-4" }) }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: l.search ? "No comments match." : "No comments here." })
    ] }) : /* @__PURE__ */ e.jsxs(t.Card, { className: "cms:divide-y cms:p-0", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3 cms:px-4 cms:py-2 cms:text-sm cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsx(t.Checkbox, { checked: w, "aria-label": "Select all", onCheckedChange: (x) => j(x ? r.data.map(($) => $.id) : []) }),
        /* @__PURE__ */ e.jsxs("span", { children: [
          r.from,
          "–",
          r.to,
          " of ",
          r.total
        ] })
      ] }),
      r.data.map((x) => /* @__PURE__ */ e.jsxs("article", { className: "cms:flex cms:gap-3 cms:px-4 cms:py-4", "aria-labelledby": `comment-${x.id}-author`, children: [
        /* @__PURE__ */ e.jsx(
          t.Checkbox,
          {
            checked: i.includes(x.id),
            "aria-label": `Select ${x.author}'s comment`,
            onCheckedChange: ($) => j($ ? [...i, x.id] : i.filter((D) => D !== x.id))
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-x-3 cms:gap-y-1 cms:text-sm", children: [
            /* @__PURE__ */ e.jsx("span", { id: `comment-${x.id}-author`, className: "cms:font-medium", children: x.author }),
            x.email && /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", children: x.email }),
            x.member && /* @__PURE__ */ e.jsx(t.Badge, { variant: "outline", children: "Signed in" }),
            !x.trashed && /* @__PURE__ */ e.jsx(t.Badge, { variant: x.status === "approved" ? "success" : x.status === "spam" ? "destructive" : "warning", children: Ea[x.status] }),
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
              /* @__PURE__ */ e.jsx(ie, { className: "cms:inline cms:size-3" })
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
            c.moderate && !x.trashed && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              x.status !== "approved" && /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "ghost", onClick: () => g(x, "approved"), children: [
                /* @__PURE__ */ e.jsx(he, {}),
                " Approve"
              ] }),
              x.status === "approved" && /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "ghost", onClick: () => g(x, "pending"), children: [
                /* @__PURE__ */ e.jsx(De, {}),
                " Unapprove"
              ] }),
              x.status !== "spam" && /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "ghost", onClick: () => g(x, "spam"), children: [
                /* @__PURE__ */ e.jsx(_e, {}),
                " Spam"
              ] }),
              x.status !== "spam" && /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "ghost", onClick: () => u({ row: x, mode: "reply" }), children: [
                /* @__PURE__ */ e.jsx(Ts, {}),
                " Reply"
              ] }),
              /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "ghost", onClick: () => u({ row: x, mode: "edit" }), children: [
                /* @__PURE__ */ e.jsx(Ls, {}),
                " Edit"
              ] })
            ] }),
            c.delete && !x.trashed && /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "ghost", onClick: () => y.router.delete(T(`cms/comments/${x.id}`), { preserveScroll: !0 }), children: [
              /* @__PURE__ */ e.jsx(R, {}),
              " Trash"
            ] }),
            c.delete && x.trashed && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "ghost", onClick: () => S(`cms/comments/${x.id}/restore`), children: [
                /* @__PURE__ */ e.jsx(xe, {}),
                " Restore"
              ] }),
              /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "ghost", onClick: () => v(
                "Delete this comment for good? Replies to it stay.",
                () => y.router.delete(T(`cms/comments/${x.id}/force`), { preserveScroll: !0 })
              ), children: [
                /* @__PURE__ */ e.jsx(R, {}),
                " Delete for good"
              ] })
            ] })
          ] })
        ] })
      ] }, x.id))
    ] }),
    (r.prev_page_url || r.next_page_url) && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:justify-end cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(t.Button, { variant: "outline", size: "sm", disabled: !r.prev_page_url, onClick: () => r.prev_page_url && y.router.get(r.prev_page_url), children: [
        /* @__PURE__ */ e.jsx(Le, {}),
        " Newer"
      ] }),
      /* @__PURE__ */ e.jsxs(t.Button, { variant: "outline", size: "sm", disabled: !r.next_page_url, onClick: () => r.next_page_url && y.router.get(r.next_page_url), children: [
        "Older ",
        /* @__PURE__ */ e.jsx(pe, {})
      ] })
    ] }),
    d && /* @__PURE__ */ e.jsx(Ha, { row: d.row, mode: d.mode, error: m.body, onClose: () => u(null) }, `${d.mode}-${d.row.id}`),
    b
  ] });
}
function Ha({ row: s, mode: a, error: l, onClose: n }) {
  const [r, c] = _.useState(a === "edit" ? s.body : ""), [m, o] = _.useState(!1), h = () => {
    o(!0);
    const i = { preserveScroll: !0, onSuccess: n, onFinish: () => o(!1) };
    a === "reply" ? y.router.post(T(`cms/comments/${s.id}/reply`), { body: r }, i) : y.router.put(T(`cms/comments/${s.id}`), { body: r }, i);
  };
  return /* @__PURE__ */ e.jsx(t.Dialog, { open: !0, onOpenChange: (i) => !i && n(), children: /* @__PURE__ */ e.jsxs(t.DialogContent, { children: [
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
        onChange: (i) => c(i.target.value)
      }
    ),
    /* @__PURE__ */ e.jsx(M, { message: l }),
    /* @__PURE__ */ e.jsxs(t.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "outline", onClick: n, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", disabled: r.trim() === "" || m, onClick: h, children: a === "reply" ? "Post reply" : "Save" })
    ] })
  ] }) });
}
const Pa = 3;
function Va({ form: s, forms: a, submissions: l, can: n, createForm: r = null }) {
  t.useBreadcrumbs([{ label: "Submissions", href: T("cms/submissions") }, ...s ? [{ label: s.title }] : []]);
  const [c, m] = _.useState(null), [o, h] = Q();
  if (!s || !l)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(y.Head, { title: "Submissions" }),
      /* @__PURE__ */ e.jsx(t.PageHeader, { title: "Submissions", description: "What visitors send through the site's forms." }),
      /* @__PURE__ */ e.jsxs(t.Card, { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:px-6 cms:py-14 cms:text-center", children: [
        /* @__PURE__ */ e.jsx(Tt, { className: "cms:size-8 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
          /* @__PURE__ */ e.jsx("p", { className: "cms:font-medium", children: "No forms yet" }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:max-w-sm cms:text-sm cms:text-muted-foreground", children: r ? "Create a form, put it on a page, and what visitors send shows up here." : "Once someone creates a form and puts it on a page, what visitors send shows up here." })
        ] }),
        r && /* @__PURE__ */ e.jsx(t.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(y.Link, { href: r, children: [
          /* @__PURE__ */ e.jsx(q, {}),
          " Create a form"
        ] }) })
      ] })
    ] });
  const i = (l.data[0]?.rows ?? []).slice(0, Pa), j = (d) => o(
    "Delete this submission for good? It can't be restored.",
    () => y.router.delete(T(`cms/submissions/${d.id}`), { preserveScroll: !0, onSuccess: () => m(null) })
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: `${s.title} submissions` }),
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: s.title,
        actions: l.total > 0 && n.export && /* @__PURE__ */ e.jsx(t.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: T(`cms/forms/${s.handle}/submissions/export`), children: [
          /* @__PURE__ */ e.jsx(fs, {}),
          " Export CSV"
        ] }) }),
        children: a.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: s.handle, onValueChange: (d) => y.router.get(T(`cms/forms/${d}/submissions`)), children: [
          /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-56", "aria-label": "Form", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(t.SelectContent, { children: a.map((d) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: d.handle, children: [
            d.title,
            " (",
            d.count,
            ")"
          ] }, d.handle)) })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(t.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(t.Table, { children: [
      /* @__PURE__ */ e.jsx(t.TableHeader, { children: /* @__PURE__ */ e.jsxs(t.TableRow, { children: [
        /* @__PURE__ */ e.jsx(t.TableHead, { children: "Sent" }),
        i.map((d) => /* @__PURE__ */ e.jsx(t.TableHead, { children: d.label }, d.handle))
      ] }) }),
      /* @__PURE__ */ e.jsxs(t.TableBody, { children: [
        l.data.length === 0 && /* @__PURE__ */ e.jsx(t.TableRow, { children: /* @__PURE__ */ e.jsx(t.TableCell, { colSpan: i.length + 1, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: "Nothing sent yet." }) }),
        l.data.map((d) => /* @__PURE__ */ e.jsxs(t.TableRow, { children: [
          /* @__PURE__ */ e.jsx(t.TableCell, { className: "cms:whitespace-nowrap", children: /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:font-medium cms:hover:underline", onClick: () => m(d), children: G(d.createdAt) }) }),
          i.map((u) => /* @__PURE__ */ e.jsx(t.TableCell, { className: "cms:max-w-64 cms:truncate", children: d.rows.find((v) => v.handle === u.handle)?.value }, u.handle))
        ] }, d.id))
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
            children: /* @__PURE__ */ e.jsx(Le, {})
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
            children: /* @__PURE__ */ e.jsx(pe, {})
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(t.Dialog, { open: c !== null, onOpenChange: (d) => !d && m(null), children: /* @__PURE__ */ e.jsxs(t.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto", children: [
      /* @__PURE__ */ e.jsxs(t.DialogHeader, { children: [
        /* @__PURE__ */ e.jsx(t.DialogTitle, { children: s.title }),
        /* @__PURE__ */ e.jsxs(t.DialogDescription, { children: [
          "Sent ",
          G(c?.createdAt ?? null),
          " · ",
          c?.locale.toUpperCase()
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-3 cms:text-sm", children: c?.rows.map((d) => /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: d.label }),
        /* @__PURE__ */ e.jsx("dd", { className: "cms:whitespace-pre-wrap cms:break-words cms:text-muted-foreground", children: d.file ? /* @__PURE__ */ e.jsx("a", { href: d.file, className: "cms:underline cms:underline-offset-4 hover:cms:text-foreground", download: !0, children: d.value }) : d.value || "—" })
      ] }, d.handle)) }),
      c && (c.visitor.ip || c.visitor.userAgent || c.visitor.referrer) && /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-3 cms:border-t cms:pt-3 cms:text-sm", children: [["IP address", c.visitor.ip], ["Browser", c.visitor.userAgent], ["Sent from", c.visitor.referrer]].map(([d, u]) => u && /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: d }),
        /* @__PURE__ */ e.jsx("dd", { className: "cms:break-all cms:text-muted-foreground", children: u })
      ] }, d)) }),
      n.delete && c && /* @__PURE__ */ e.jsx(t.DialogFooter, { children: /* @__PURE__ */ e.jsxs(t.Button, { variant: "destructive", onClick: () => j(c), children: [
        /* @__PURE__ */ e.jsx(R, {}),
        " Delete"
      ] }) })
    ] }) }),
    h
  ] });
}
function Ra(s) {
  return /* @__PURE__ */ e.jsx(Oa, { ...s }, `${s.locale}:${s.version}:${JSON.stringify([s.values, s.seo, s.term.template])}`);
}
function Oa({ taxonomy: s, term: a, translated: l, fields: n, locale: r, locales: c, shared: m, sharedValues: o, values: h, seo: i, version: j, usedBy: d = [] }) {
  const u = T(`cms/taxonomies/${s.handle}/terms`), v = T(`cms/terms/${a.id}/content`);
  t.useBreadcrumbs([{ label: s.title, href: `${u}?locale=${r}` }, { label: a.title }]);
  const b = y.useForm({ locale: r, data: h, seo: i ?? {}, template: a.template ?? "", version: j }), p = b.errors, S = () => b.processing || b.put(v, { preserveScroll: !0 }), g = () => {
    b.transform(($) => ({ ...$, version: null })), b.put(v, { preserveScroll: !0 });
  }, N = t.useEditLock({
    type: "cms.term",
    id: a.id,
    locale: r,
    enabled: l,
    noun: "term",
    leaveTo: `${u}?locale=${r}`,
    getUnsaved: () => b.isDirty ? { data: b.data.data, seo: b.data.seo, template: b.data.template } : null
  }), w = l && !N.readOnly, x = async ($) => {
    const D = await N.loadKept($);
    b.setData((C) => ({
      ...C,
      data: D.data && typeof D.data == "object" ? D.data : C.data,
      seo: D.seo && typeof D.seo == "object" ? D.seo : C.seo,
      template: typeof D.template == "string" ? D.template : C.template
    }));
  };
  return t.useUnsavedChanges(b.isDirty && !N.takenOver, w ? S : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: ($) => {
    $.preventDefault(), S();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: a.title }),
    N.dialogs,
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: a.title,
        back: { href: `${u}?locale=${r}`, label: `Back to ${s.title}` },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          a.url && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: a.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(ie, {}),
            " View"
          ] }) }),
          c.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: r, onValueChange: ($) => y.router.get(`${u}/${a.id}/edit`, { locale: $ }), children: [
            /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(t.SelectContent, { children: c.map(($, D) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: $, children: [
              H($),
              D === 0 ? " (main)" : ""
            ] }, $)) })
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
      /* @__PURE__ */ e.jsx(t.KeptEditsNotice, { kept: N.kept, disabled: !w, onLoad: ($) => {
        x($);
      }, onDiscard: ($) => {
        N.discardKept($);
      } }),
      /* @__PURE__ */ e.jsx(Ee, { message: p.version, processing: b.processing, onSaveMine: g }),
      /* @__PURE__ */ e.jsx(
        Ie,
        {
          disabled: !w,
          fields: n,
          values: b.data.data,
          errors: p,
          storageKey: `cms:term:${s.handle}`,
          shared: m,
          sharedValues: o,
          sharedNote: `Shared by all languages: edit it in ${H(c[0] ?? "en")}.`,
          onChange: ($, D) => b.setData("data", { ...b.data.data, [$]: D })
        }
      ),
      /* @__PURE__ */ e.jsx(t.CollapsibleCard, { title: "Search and sharing", titleClassName: "cms:text-base", storageKey: "cms:term:seo", hasErrors: ae(p, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !w, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(se, { bare: !0, id: "seo", fields: Ae, value: b.data.seo, errors: W(p, "seo"), onChange: ($) => b.setData("seo", $) }) }) }),
      /* @__PURE__ */ e.jsxs(t.CollapsibleCard, { title: "Used by", titleClassName: "cms:text-base", storageKey: "cms:term:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
        d.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "No content links here through its fields." }),
        d.map(($) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:gap-2", children: [
          $.url ? /* @__PURE__ */ e.jsx("a", { href: $.url, className: "cms:truncate cms:underline-offset-4 cms:hover:underline", children: $.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:truncate", children: $.label }),
          /* @__PURE__ */ e.jsx("span", { className: "cms:font-mono cms:text-xs cms:text-muted-foreground", children: $.field })
        ] }, `${$.label}:${$.field}`))
      ] }),
      /* @__PURE__ */ e.jsx(
        t.CollapsibleCard,
        {
          title: "Page settings",
          titleClassName: "cms:text-base",
          storageKey: "cms:term:page-settings",
          hasErrors: p.template !== void 0,
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
                onChange: ($) => b.setData("template", $.target.value),
                "aria-invalid": p.template !== void 0
              }
            ),
            /* @__PURE__ */ e.jsx(M, { message: p.template })
          ] })
        }
      )
    ] }) : /* @__PURE__ */ e.jsxs("p", { className: "cms:text-muted-foreground", children: [
      "This term has no title in ",
      H(r),
      " yet: give it one in the list first."
    ] })
  ] });
}
const $e = "__top";
function Ge(s = []) {
  return s.length === 0 ? "" : ` It's used by ${s.slice(0, 5).join("; ")}${s.length > 5 ? ` and ${s.length - 5} more` : ""}.`;
}
function Ua({ taxonomy: s, taxonomies: a, terms: l, locales: n, locale: r, trashed: c = !1 }) {
  t.useBreadcrumbs([{ label: s ? s.title : "Terms" }]);
  const [m, o] = Q(), [h, i] = _.useState(null), [j, d] = _.useState(l);
  if (_.useEffect(() => d(l), [l]), !s)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(y.Head, { title: "Terms" }),
      /* @__PURE__ */ e.jsx(t.PageHeader, { title: "Terms", description: "There are no taxonomies yet. Create one under Structure → Taxonomies (categories, tags…), then add its terms here." })
    ] });
  const u = T(`cms/taxonomies/${s.handle}/terms`), v = (p, S) => {
    const g = S.map((N) => j[N].id);
    d(Xs(j, p, S)), y.router.post(
      T("cms/terms/reorder"),
      { taxonomy: s.handle, ids: g, parent_id: p < 0 ? null : j[p].id },
      { preserveScroll: !0, preserveState: !0, onError: () => d(l) }
    );
  }, b = (p) => /* @__PURE__ */ e.jsx(
    t.SortableList,
    {
      items: re(j, p),
      getId: (S) => j[S].id,
      disabled: c,
      onReorder: (S) => v(p, S),
      className: p < 0 ? "cms:gap-1" : "cms:mt-1 cms:gap-1 cms:pl-6",
      children: (S, { handle: g, isOverlay: N }) => {
        const w = j[S];
        return /* @__PURE__ */ e.jsxs("div", { className: "cms:rounded-lg cms:border cms:border-border/70 cms:bg-card", children: [
          /* @__PURE__ */ e.jsx("div", { className: "cms:p-2", children: c ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3 cms:pl-1", children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:flex-1 cms:font-medium", children: w.title ?? w.fallback }),
            /* @__PURE__ */ e.jsxs(t.Button, { variant: "outline", size: "sm", onClick: () => y.router.post(T(`cms/terms/${w.id}/restore`), {}, { preserveScroll: !0 }), children: [
              /* @__PURE__ */ e.jsx(xe, {}),
              " Restore"
            ] }),
            /* @__PURE__ */ e.jsxs(
              t.Button,
              {
                variant: "ghost",
                size: "sm",
                className: "cms:text-destructive",
                onClick: () => m(
                  `Delete "${w.fallback}" for good, in every language? Entries lose it.${Ge(w.usedBy)}`,
                  () => y.router.delete(T(`cms/terms/${w.id}/force`), { preserveScroll: !0, data: (w.usedBy ?? []).length > 0 ? { force: 1 } : {} })
                ),
                children: [
                  /* @__PURE__ */ e.jsx(R, {}),
                  " Delete for good"
                ]
              }
            )
          ] }) : h === w.id && !N ? /* @__PURE__ */ e.jsx(
            Je,
            {
              action: T(`cms/terms/${w.id}`),
              method: "put",
              locale: r,
              terms: l,
              hierarchical: s.hierarchical,
              term: w,
              submitLabel: "Save",
              onDone: () => i(null)
            }
          ) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(t.SortableHandle, { ...g, label: `Move ${w.fallback}` }),
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
            /* @__PURE__ */ e.jsx(t.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Rename ${w.fallback}`, onClick: () => i(w.id), children: /* @__PURE__ */ e.jsx(Ls, {}) }),
            s.pages && w.title !== null && /* @__PURE__ */ e.jsx(t.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Edit ${w.fallback}'s page`, asChild: !0, children: /* @__PURE__ */ e.jsx(y.Link, { href: T(`cms/taxonomies/${s.handle}/terms/${w.id}/edit`) + `?locale=${r}`, children: /* @__PURE__ */ e.jsx(Dt, {}) }) }),
            /* @__PURE__ */ e.jsx(
              t.Button,
              {
                variant: "ghost",
                size: "icon",
                className: "cms:size-8 cms:text-destructive",
                "aria-label": `Move ${w.fallback} to the trash`,
                onClick: () => m(
                  `Move "${w.fallback}" to the trash, with the terms under it? It comes off the site; you can restore it.${Ge(w.usedBy)}`,
                  () => y.router.delete(T(`cms/terms/${w.id}`), { preserveScroll: !0 })
                ),
                children: /* @__PURE__ */ e.jsx(R, {})
              }
            )
          ] }) }),
          !N && !c && re(j, S).length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:px-2 cms:pb-2", children: b(S) })
        ] });
      }
    }
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: s.title }),
    o,
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: s.title,
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(t.Button, { variant: c ? "secondary" : "ghost", size: "sm", onClick: () => y.router.get(u, { locale: r, ...c ? {} : { trashed: 1 } }), children: c ? "Back to terms" : "Trash" }),
          n.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: r, onValueChange: (p) => y.router.get(u, { locale: p, ...c ? { trashed: 1 } : {} }), children: [
            /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(t.SelectContent, { children: n.map((p) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: p, children: H(p) }, p)) })
          ] })
        ] }),
        children: a.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: s.handle, onValueChange: (p) => y.router.get(T(`cms/taxonomies/${p}/terms`)), children: [
          /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Taxonomy", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(t.SelectContent, { children: a.map((p) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: p.handle, children: p.title }, p.handle)) })
        ] })
      }
    ),
    !c && /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsx(t.CardContent, { children: /* @__PURE__ */ e.jsx(
      Je,
      {
        action: u,
        method: "post",
        locale: r,
        terms: l,
        hierarchical: s.hierarchical,
        submitLabel: "Add term"
      },
      `new-${l.length}`
    ) }) }),
    /* @__PURE__ */ e.jsx(t.Card, { className: "cms:p-2", children: j.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:p-4 cms:text-center cms:text-muted-foreground", children: c ? "The trash is empty." : "No terms yet." }) : b(-1) })
  ] });
}
function Je({ action: s, method: a, locale: l, terms: n, hierarchical: r, term: c, submitLabel: m, onDone: o }) {
  const h = y.useForm({ title: c?.title ?? "", slug: c?.slug ?? "", parent_id: c?.parentId ?? null, locale: l, version: c?.version ?? null }), i = h.errors, j = /* @__PURE__ */ new Set();
  if (c) {
    j.add(c.id);
    const v = n.findIndex((b) => b.id === c.id);
    for (let b = v + 1; b < n.length && (n[b]?.depth ?? 0) > c.depth; b++) j.add(n[b].id);
  }
  const d = (v) => {
    v.preventDefault(), h.submit(a, s, { preserveScroll: !0, onSuccess: () => {
      a === "post" && h.reset("title", "slug"), o?.();
    } });
  }, u = c ? `term-${c.id}` : "new-term";
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: d, className: "cms:grid cms:items-start cms:gap-3 cms:md:grid-cols-[2fr_1.5fr_1.5fr_auto]", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${u}-title`, className: c ? "cms:sr-only" : "", children: "Title" }),
      /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: `${u}-title`,
          value: h.data.title,
          placeholder: c?.fallback,
          required: !0,
          onChange: (v) => h.setData("title", v.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(M, { message: i.title ?? i.version })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${u}-slug`, className: c ? "cms:sr-only" : "", children: "Slug" }),
      /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: `${u}-slug`,
          className: "cms:font-mono",
          value: h.data.slug,
          placeholder: "Made from the title",
          onChange: (v) => h.setData("slug", v.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(M, { message: i.slug })
    ] }),
    r ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${u}-parent`, className: c ? "cms:sr-only" : "", children: "Under" }),
      /* @__PURE__ */ e.jsxs(
        t.Select,
        {
          value: h.data.parent_id === null ? $e : String(h.data.parent_id),
          onValueChange: (v) => h.setData("parent_id", v === $e ? null : Number(v)),
          children: [
            /* @__PURE__ */ e.jsx(t.SelectTrigger, { id: `${u}-parent`, children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(t.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(t.SelectItem, { value: $e, children: "Top level" }),
              n.filter((v) => !j.has(v.id)).map((v) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: String(v.id), children: [
                "— ".repeat(v.depth),
                v.title ?? v.fallback
              ] }, v.id))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ e.jsx(M, { message: i.parent_id })
    ] }) : /* @__PURE__ */ e.jsx("div", {}),
    /* @__PURE__ */ e.jsxs("div", { className: `cms:flex cms:gap-2 ${c ? "" : "cms:md:mt-[17px]"}`, children: [
      /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", disabled: h.processing, children: [
        !c && /* @__PURE__ */ e.jsx(q, {}),
        " ",
        m
      ] }),
      o && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", onClick: o, children: "Cancel" })
    ] })
  ] });
}
lt({
  pages: {
    "Cms/Blueprints/Index": aa,
    "Cms/Blueprints/Form": ta,
    "Cms/Fieldsets/Index": Sa,
    "Cms/Entries/Index": fa,
    "Cms/Entries/Editor": na,
    "Cms/Entries/Listing": ya,
    "Cms/Terms/Index": Ua,
    "Cms/Terms/Edit": Ra,
    "Cms/Globals/Index": $a,
    "Cms/Globals/Edit": Ca,
    "Cms/Menus/Index": Ia,
    "Cms/Menus/Edit": Ba,
    "Cms/Comments/Index": Fa,
    "Cms/Submissions/Index": Va
  }
});
t.registerCommandSource((s, a) => ht(s, a, T));
