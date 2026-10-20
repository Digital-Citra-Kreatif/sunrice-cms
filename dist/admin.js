function Ze() {
  const t = globalThis.Sunrice;
  if (!t)
    throw new Error("[sunrice] This script runs outside the Sunrice admin panel (window.Sunrice is missing).");
  return t;
}
function ht(t) {
  const a = Ze();
  if (a.version !== 2)
    throw new Error(`[sunrice] This plugin was built for admin runtime 2, but the panel runs ${a.version}. Rebuild it with a matching @sunrice/admin-sdk.`);
  for (const [l, c] of Object.entries(t.pages ?? {}))
    a.registerPage(l, c);
}
function _(t = "") {
  return Ze().adminUrl(t);
}
const Xe = globalThis.Sunrice;
if (!Xe) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const s = Xe.modules["@sunrice/admin-sdk/ui"];
function re(t) {
  return t && typeof t == "object" && !Array.isArray(t) ? t : {};
}
function xt(t, a) {
  if (typeof t != "string" || t === "") return "";
  const l = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(t);
  return l ? a ? `${l[1]}T${l[2] ?? "00:00"}` : l[1] ?? "" : "";
}
function Pe(t) {
  return t === "" ? null : t;
}
function pt() {
  return { _hidden: !1 };
}
function gt(t) {
  return { type: t, hidden: !1, values: {} };
}
function ft(t) {
  const a = t.replace(/[\u0000- \u007f]+/g, ""), l = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(a);
  return l ? ["http", "https", "mailto", "tel"].includes(l[1].toLowerCase()) : !a.includes("\\");
}
function ze({ ids: t, search: a, collections: l }) {
  const c = new URLSearchParams();
  for (const r of t ?? []) c.append("ids[]", String(r));
  a && c.set("search", a);
  for (const r of l) c.append("collections[]", r);
  return c.toString();
}
let jt = 0;
function bt(t, a) {
  return t.length === a ? t.slice() : t.length < a ? [...t, ...Array.from({ length: a - t.length }, () => `k${++jt}`)] : t.slice(0, a);
}
function vt({ taxonomy: t, q: a, ids: l }) {
  const c = new URLSearchParams({ taxonomy: t });
  a && c.set("q", a);
  for (const r of l ?? []) c.append("ids[]", String(r));
  return c.toString();
}
function yt(t, a) {
  return t.map((l) => ({
    id: String(l.id),
    label: l.title,
    description: l.status === "published" ? l.collection : `${l.collection} · ${l.status}`,
    group: "Entries",
    icon: "file-text",
    url: a(`cms/collections/${l.collectionHandle}/entries/${l.id}/edit`)
  }));
}
async function Nt(t, a, l) {
  const c = await fetch(`${l("cms/entry-picker")}?${ze({ search: t.trim(), collections: [] })}`, {
    signal: a,
    headers: { Accept: "application/json" },
    credentials: "same-origin"
  });
  if (!c.ok) return [];
  const { items: r } = await c.json();
  return yt(r, l);
}
const es = globalThis.Sunrice;
if (!es) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const e = es.modules["react/jsx-runtime"], ss = globalThis.Sunrice;
if (!ss) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const $ = ss.modules.react, ts = globalThis.Sunrice;
if (!ts) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const N = ts.modules["@inertiajs/react"];
const St = (t) => t?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
function Ct(t, a, l = []) {
  if (a == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: St(t),
    size: 24,
    node: a,
    ...l.length > 0 ? { aliases: l } : {}
  };
}
const kt = (t) => {
  let a = "", l = !1;
  for (const c of t) {
    if (c === "-" || c === "_" || c <= " ") {
      l = a.length > 0;
      continue;
    }
    a.length === 0 ? a += c.toLowerCase() : a += l ? c.toUpperCase() : c, l = !1;
  }
  return a;
};
const wt = (t) => {
  const a = kt(t);
  return a.charAt(0).toUpperCase() + a.slice(1);
};
const De = (...t) => t.filter((a, l, c) => !!a && a.trim() !== "" && c.indexOf(a) === l).join(" ").trim();
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
function be(t) {
  return t != null;
}
function $t(t, a = {}) {
  const l = a.attributeNames ?? {}, c = (u) => l[u] ?? u, r = t.size ?? t.width ?? Z.width, n = t.size ?? t.height ?? Z.height, m = t.aliases?.filter((u) => typeof u == "string" && u.trim() !== "").map((u) => `lucide-${u}`) ?? [], d = [...t.name ? [`lucide-${t.name}`] : [], ...m], h = a.className?.split(" ").filter(Boolean) ?? [], i = a.includeDefaultClasses === !1 ? De(...h) : De("lucide", ...d, ...h), v = a.absoluteStrokeWidth ? Number(a.strokeWidth ?? Z["stroke-width"]) * Number(t.size ?? t.width ?? Z.width) / Number(a.size ?? a.width ?? Z.width) : a.strokeWidth ?? Z["stroke-width"];
  return [
    "svg",
    {
      ...Object.entries(Z).reduce((u, [y, b]) => (u[c(y)] = b, u), {}),
      ..."color" in a && a.color && {
        [c("stroke")]: a.color
      },
      ..."size" in a && be(a.size) && {
        [c("width")]: a.size,
        [c("height")]: a.size
      },
      ..."width" in a && be(a.width) && {
        [c("width")]: a.width
      },
      ..."height" in a && be(a.height) && {
        [c("height")]: a.height
      },
      [c("stroke-width")]: v,
      ...i && {
        [c("class")]: i
      },
      [c("viewBox")]: `0 0 ${r} ${n}`,
      ...a.hasA11yProp === !1 ? {
        [c("aria-hidden")]: "true"
      } : {},
      ..."attributes" in a && a.attributes
    },
    t.node.map((u) => {
      const [y, b, f] = u, k = a.nonScalingStroke ? { [c("vector-effect")]: "non-scaling-stroke", ...b } : b;
      return f ? [y, k, f] : [y, k];
    })
  ];
}
function Dt(t, a = {}) {
  return $t(t, {
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
const _t = (t) => {
  for (const a in t)
    if (a.startsWith("aria-") || a === "role" || a === "title")
      return !0;
  return !1;
}, Tt = $.createContext({}), Mt = () => $.useContext(Tt), Bt = $.forwardRef(
  ({
    color: t,
    size: a,
    width: l,
    height: c,
    strokeWidth: r,
    absoluteStrokeWidth: n,
    nonScalingStroke: m,
    className: d = "",
    children: h,
    iconNode: i = [],
    icon: v = {
      node: i,
      aliases: [],
      size: 24
    },
    ...o
  }, u) => {
    const {
      size: y = 24,
      strokeWidth: b = 2,
      absoluteStrokeWidth: f = !1,
      nonScalingStroke: k = !1,
      color: g = "currentColor",
      className: S = ""
    } = Mt() ?? {}, T = !!h || _t(o), [p, C, D = []] = Dt(v, {
      color: t ?? g,
      width: l ?? a ?? y,
      height: c ?? a ?? y,
      strokeWidth: r ?? b,
      absoluteStrokeWidth: n ?? f,
      nonScalingStroke: m ?? k,
      className: De(S, d),
      hasA11yProp: T,
      attributes: o
    });
    return $.createElement(
      p,
      {
        ref: u,
        ...C
      },
      [
        ...D.map(([x, L]) => $.createElement(x, L)),
        ...Array.isArray(h) ? h : [h]
      ]
    );
  }
);
function z(t, a = [], l = []) {
  const c = typeof t == "string" ? Ct(t, a, l) : t, r = $.forwardRef(
    ({ className: n, ...m }, d) => $.createElement(Bt, {
      ref: d,
      icon: c,
      className: n,
      ...m
    })
  );
  return c.name && (r.displayName = wt(c.name)), r;
}
const as = {
  name: "arrow-down",
  size: 24,
  node: [
    ["path", { d: "M12 5v14", key: "s699le" }],
    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
  ]
};
as.node;
const ls = z(as);
const ns = {
  name: "arrow-up-down",
  size: 24,
  node: [
    ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
    ["path", { d: "M17 20V4", key: "1ejh1v" }],
    ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
    ["path", { d: "M7 4v16", key: "1glfcx" }]
  ]
};
ns.node;
const cs = z(ns);
const rs = {
  name: "arrow-up",
  size: 24,
  node: [
    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
    ["path", { d: "M12 19V5", key: "x0mq9r" }]
  ]
};
rs.node;
const is = z(rs);
const os = {
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
os.node;
const ds = z(os);
const ms = {
  name: "check",
  size: 24,
  node: [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]
};
ms.node;
const xe = z(ms);
const us = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
us.node;
const hs = z(us);
const xs = {
  name: "chevron-left",
  size: 24,
  node: [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]]
};
xs.node;
const Le = z(xs);
const ps = {
  name: "chevron-right",
  size: 24,
  node: [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]
};
ps.node;
const ge = z(ps);
const gs = {
  name: "columns-3",
  size: 24,
  node: [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M9 3v18", key: "fh3hqa" }],
    ["path", { d: "M15 3v18", key: "14nvp0" }]
  ],
  aliases: ["panels-left-right"]
};
gs.node;
const zt = z(gs);
const fs = {
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
fs.node;
const Lt = z(fs);
const js = {
  name: "copy",
  size: 24,
  node: [
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
  ]
};
js.node;
const It = z(js);
const bs = {
  name: "download",
  size: 24,
  node: [
    ["path", { d: "M12 15V3", key: "m9g1x1" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
  ]
};
bs.node;
const vs = z(bs);
const ys = {
  name: "ellipsis-vertical",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
    ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
    ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }]
  ],
  aliases: ["more-vertical"]
};
ys.node;
const At = z(ys);
const Ns = {
  name: "ellipsis",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
    ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
    ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
  ],
  aliases: ["more-horizontal"]
};
Ns.node;
const Ss = z(Ns);
const Cs = {
  name: "external-link",
  size: 24,
  node: [
    ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
    ["path", { d: "M10 14 21 3", key: "gplh6r" }],
    ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
  ]
};
Cs.node;
const le = z(Cs);
const ks = {
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
ks.node;
const Et = z(ks);
const ws = {
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
ws.node;
const Ft = z(ws);
const $s = {
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
$s.node;
const Ht = z($s);
const Ds = {
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
Ds.node;
const Pt = z(Ds);
const _s = {
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
_s.node;
const Vt = z(_s);
const Ts = {
  name: "link-2",
  size: 24,
  node: [
    ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
    ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
    ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
  ]
};
Ts.node;
const Rt = z(Ts);
const Ms = {
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
Ms.node;
const Ot = z(Ms);
const Bs = {
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
Bs.node;
const Ut = z(Bs);
const zs = {
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
zs.node;
const Kt = z(zs);
const Ls = {
  name: "loader-circle",
  size: 24,
  node: [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  aliases: ["loader-2"]
};
Ls.node;
const ne = z(Ls);
const Is = {
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
Is.node;
const As = z(Is);
const Es = {
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
Es.node;
const Wt = z(Es);
const Fs = {
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
Fs.node;
const Hs = z(Fs);
const Ps = {
  name: "plus",
  size: 24,
  node: [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ]
};
Ps.node;
const K = z(Ps);
const Vs = {
  name: "rotate-ccw",
  size: 24,
  node: [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ]
};
Vs.node;
const pe = z(Vs);
const Rs = {
  name: "search",
  size: 24,
  node: [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ]
};
Rs.node;
const de = z(Rs);
const Os = {
  name: "settings-2",
  size: 24,
  node: [
    ["path", { d: "M14 17H5", key: "gfn3mx" }],
    ["path", { d: "M19 7h-9", key: "6i9tg" }],
    ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
    ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
  ]
};
Os.node;
const qt = z(Os);
const Us = {
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
Us.node;
const _e = z(Us);
const Ks = {
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
Ks.node;
const Gt = z(Ks);
const Ws = {
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
Ws.node;
const R = z(Ws);
const qs = {
  name: "undo-2",
  size: 24,
  node: [
    ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
    ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
  ]
};
qs.node;
const Te = z(qs);
const Gs = {
  name: "x",
  size: 24,
  node: [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]
};
Gs.node;
const fe = z(Gs);
function Q() {
  const [t, a] = $.useState(null), l = /* @__PURE__ */ e.jsx(s.Dialog, { open: t !== null, onOpenChange: (c) => !c && a(null), children: /* @__PURE__ */ e.jsxs(s.DialogContent, { children: [
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
  return [(c, r) => a({ message: c, onConfirm: r }), l];
}
function X(t) {
  return { draft: "Draft", scheduled: "Scheduled", published: "Published" }[t];
}
function G(t, a) {
  if (!t) return "—";
  const l = new Date(t);
  return Number.isNaN(l.getTime()) ? "—" : l.toLocaleString(a, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
function Js(t) {
  const a = (l) => String(l).padStart(2, "0");
  return `${t.getFullYear()}-${a(t.getMonth() + 1)}-${a(t.getDate())}T${a(t.getHours())}:${a(t.getMinutes())}`;
}
function P(t, a) {
  try {
    return new Intl.DisplayNames(a ? [a] : void 0, { type: "language" }).of(t.replace("_", "-")) ?? t;
  } catch {
    return t;
  }
}
async function Ve(t) {
  const a = await fetch(`${_("cms/entry-picker")}?${ze(t)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!a.ok) throw new Error(String(a.status));
  return (await a.json()).items;
}
function je({ id: t, value: a, multiple: l, max: c, collections: r, invalid: n, onChange: m }) {
  const d = a === null ? [] : Array.isArray(a) ? a : [a], [h, i] = $.useState({}), [v, o] = $.useState(""), [u, y] = $.useState(null), [b, f] = $.useState(!1), k = l && c !== null && d.length >= c, g = d.filter((p) => !h[p]).join(",");
  $.useEffect(() => {
    g !== "" && Ve({ ids: g.split(",").map(Number), collections: r }).then((p) => i((C) => ({ ...C, ...Object.fromEntries(p.map((D) => [D.id, D])) }))).catch(() => f(!0));
  }, [g]), $.useEffect(() => {
    if (v.trim() === "") {
      y(null);
      return;
    }
    const p = window.setTimeout(() => {
      Ve({ search: v.trim(), collections: r }).then((C) => {
        y(C), f(!1);
      }).catch(() => f(!0));
    }, 250);
    return () => window.clearTimeout(p);
  }, [v]);
  const S = (p) => {
    i((C) => ({ ...C, [p.id]: p })), m(l ? [...d, p.id] : p.id), o("");
  }, T = (p) => m(l ? p : p[0] ?? null);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    d.length > 0 && /* @__PURE__ */ e.jsx(s.SortableList, { items: d, getId: (p) => p, onReorder: (p) => T(p), disabled: !l, className: "cms:gap-1", children: (p, { handle: C }) => {
      const D = h[p];
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-md cms:border cms:bg-card cms:px-2 cms:py-1 cms:text-sm", children: [
        l && /* @__PURE__ */ e.jsx(s.SortableHandle, { ...C, label: `Move ${D?.title ?? p}` }),
        /* @__PURE__ */ e.jsx("span", { className: `cms:min-w-0 cms:flex-1 cms:truncate ${l ? "" : "cms:pl-1"}`, children: D ? D.title : `Entry #${p}` }),
        D && /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: D.collection }),
        D && /* @__PURE__ */ e.jsx(s.Badge, { variant: D.status === "published" ? "success" : "secondary", children: X(D.status) }),
        /* @__PURE__ */ e.jsx(
          s.Button,
          {
            type: "button",
            variant: "ghost",
            size: "icon",
            className: "cms:size-7",
            "aria-label": `Remove ${D?.title ?? p}`,
            onClick: () => T(d.filter((x) => x !== p)),
            children: /* @__PURE__ */ e.jsx(fe, {})
          }
        )
      ] });
    } }),
    !k && (l || d.length === 0) && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-md", children: [
      /* @__PURE__ */ e.jsx(de, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
      /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: t,
          className: "cms:pl-9",
          placeholder: "Search entries by title",
          "aria-invalid": n,
          value: v,
          autoComplete: "off",
          onChange: (p) => o(p.target.value)
        }
      ),
      u !== null && /* @__PURE__ */ e.jsxs("ul", { role: "listbox", "aria-label": "Matching entries", className: "cms:absolute cms:z-10 cms:mt-1 cms:max-h-64 cms:w-full cms:overflow-auto cms:rounded-md cms:border cms:bg-card cms:p-1 cms:shadow-md", children: [
        u.filter((p) => !d.includes(p.id)).length === 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: "No entries match." }),
        u.filter((p) => !d.includes(p.id)).map((p) => /* @__PURE__ */ e.jsx("li", { role: "option", "aria-selected": !1, children: /* @__PURE__ */ e.jsxs(
          "button",
          {
            type: "button",
            className: "cms:flex cms:w-full cms:items-center cms:gap-2 cms:rounded cms:px-2 cms:py-1.5 cms:text-left cms:text-sm cms:hover:bg-accent",
            onClick: () => S(p),
            children: [
              /* @__PURE__ */ e.jsx("span", { className: "cms:flex-1 cms:truncate", children: p.title }),
              /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: p.collection })
            ]
          }
        ) }, p.id))
      ] })
    ] }),
    b && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "Entries could not be loaded. Try again." })
  ] });
}
const Ys = $.createContext({}), ve = "__none";
async function Re(t) {
  const a = await fetch(`${_("cms/term-picker")}?${vt(t)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!a.ok) throw new Error(String(a.status));
  return await a.json();
}
function Jt({ id: t, taxonomy: a, multiple: l, max: c, required: r, invalid: n, value: m, onChange: d }) {
  const h = $.useContext(Ys), i = m === null ? [] : Array.isArray(m) ? m : [m], [v, o] = $.useState(null), [u, y] = $.useState(!1), [b, f] = $.useState(""), [k, g] = $.useState({}), [S, T] = $.useState(!1);
  $.useEffect(() => {
    if (!a) return;
    const w = b.trim(), F = window.setTimeout(() => {
      Re({ taxonomy: a, q: w }).then((H) => {
        o(H.items), H.more && y(!0), T(!1);
      }).catch(() => T(!0));
    }, w === "" ? 0 : 250);
    return () => window.clearTimeout(F);
  }, [a, b]);
  const p = (w) => h[String(w)] ?? k[w] ?? v?.find((F) => F.id === w)?.label, C = v === null ? "" : i.filter((w) => p(w) === void 0).join(",");
  if ($.useEffect(() => {
    !a || C === "" || Re({ taxonomy: a, ids: C.split(",").map(Number) }).then((w) => g((F) => ({ ...F, ...Object.fromEntries(w.items.map((H) => [H.id, H.label])) }))).catch(() => T(!0));
  }, [a, C]), !a) return /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Choose a taxonomy for this field in its blueprint." });
  if (v === null) return S ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "Terms could not be loaded. Try again." }) : /* @__PURE__ */ e.jsx(s.Skeleton, { className: "cms:h-9 cms:w-full cms:max-w-sm" });
  const D = (w) => `${"— ".repeat(w.depth)}${w.label}`, x = l && c !== null && i.length >= c, L = (w) => d(l ? w : w[0] ?? null), A = u && i.length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-1.5", children: i.map((w) => /* @__PURE__ */ e.jsxs(s.Badge, { variant: "secondary", className: "cms:gap-1 cms:pr-1", children: [
    p(w) ?? `Term #${w}`,
    !(r && !l) && /* @__PURE__ */ e.jsx(
      "button",
      {
        type: "button",
        className: "cms:rounded-sm cms:p-0.5 cms:hover:bg-muted",
        "aria-label": `Remove ${p(w) ?? w}`,
        onClick: () => L(i.filter((F) => F !== w)),
        children: /* @__PURE__ */ e.jsx(fe, { className: "cms:size-3" })
      }
    )
  ] }, w)) }), B = u && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-sm", children: [
    /* @__PURE__ */ e.jsx(de, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
    /* @__PURE__ */ e.jsx(
      s.Input,
      {
        id: t,
        className: "cms:pl-9",
        placeholder: "Search terms",
        autoComplete: "off",
        "aria-invalid": n,
        value: b,
        onChange: (w) => f(w.target.value)
      }
    )
  ] });
  if (!l && !u) {
    const w = i[0], F = w === void 0 || v.some((H) => H.id === w);
    return /* @__PURE__ */ e.jsxs(s.Select, { value: w === void 0 ? ve : String(w), onValueChange: (H) => d(H === ve ? null : Number(H)), children: [
      /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: t, className: "cms:w-full cms:max-w-sm", "aria-invalid": n, children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
      /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
        !r && /* @__PURE__ */ e.jsx(s.SelectItem, { value: ve, children: "None" }),
        !F && w !== void 0 && /* @__PURE__ */ e.jsx(s.SelectItem, { value: String(w), children: p(w) ?? `Term #${w}` }),
        v.map((H) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: String(H.id), children: D(H) }, H.id))
      ] })
    ] });
  }
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    A,
    B,
    v.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: b.trim() ? "No terms match." : "Nothing to choose from yet." }) : l ? /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:max-h-72 cms:flex-col cms:gap-2 cms:overflow-auto", children: v.map((w) => {
      const F = i.includes(w.id);
      return /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx(
          s.Checkbox,
          {
            checked: F,
            disabled: !F && x,
            onCheckedChange: (H) => L(H ? [...i, w.id] : i.filter((te) => te !== w.id))
          }
        ),
        D(w)
      ] }, w.id);
    }) }) : /* @__PURE__ */ e.jsx("div", { role: "listbox", "aria-label": "Terms", className: "cms:flex cms:max-h-72 cms:flex-col cms:overflow-auto", children: v.map((w) => /* @__PURE__ */ e.jsx(
      s.Button,
      {
        type: "button",
        variant: i[0] === w.id ? "secondary" : "ghost",
        size: "sm",
        className: "cms:justify-start",
        role: "option",
        "aria-selected": i[0] === w.id,
        onClick: () => d(w.id),
        children: D(w)
      },
      w.id
    )) })
  ] });
}
const Yt = 5;
let Qt = 0;
const Qs = () => `f${++Qt}`;
function Zs(t) {
  return t.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function Xs(t) {
  return t.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^[0-9_]+/, "").replace(/_{2,}/g, "_").slice(0, 64);
}
function et(t, a) {
  const l = new Set(a.map((n) => n.handle)), c = Zs(t) || "field";
  let r = c;
  for (let n = 2; l.has(r); n++)
    r = `${c}_${n}`;
  return r;
}
function st(t) {
  return (t ?? []).map(({ fields: a, ...l }) => ({
    ...l,
    key: Qs(),
    fields: st(a),
    handleTouched: !0
  }));
}
function tt(t, a) {
  return t.map(({ key: l, handleTouched: c, fields: r, ...n }) => ({
    ...n,
    validation: (n.validation ?? []).map((m) => m.trim()).filter((m) => m !== ""),
    ...a(n.type) ? { fields: tt(r, a) } : {}
  }));
}
function Zt(t, a, l) {
  return { key: Qs(), type: t, label: a, handle: et(a, l), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function Xt(t, a, l) {
  if (t.handleTouched) return { ...t, label: a };
  const c = l.filter((r) => r.key !== t.key);
  return { ...t, label: a, handle: et(a || t.type, c) };
}
function ie(t, a) {
  const l = `${a}.`, c = {};
  for (const [r, n] of Object.entries(t))
    r.startsWith(l) && (c[r.slice(l.length)] = n);
  return c;
}
function q(t, a) {
  const l = t[a];
  return { ...ie(t, a), ...l !== void 0 ? { "": l } : {} };
}
function ae(t, a) {
  return Object.keys(t).some((l) => l === a || l.startsWith(`${a}.`));
}
const ye = [
  { value: "equals", label: "is", needsValue: !0 },
  { value: "not_equals", label: "is not", needsValue: !0 },
  { value: "filled", label: "is filled in", needsValue: !1 },
  { value: "empty", label: "is empty", needsValue: !1 }
];
function Oe(t) {
  return t === !0 ? "true" : t === !1 ? "false" : typeof t == "string" || typeof t == "number" ? String(t) : "";
}
function Ie(t, a) {
  const l = t.condition;
  if (!l) return !0;
  const c = a[l.field], r = c != null && c !== "" && c !== !1 && !(Array.isArray(c) && c.length === 0), n = (Array.isArray(c) ? c : [c]).map(Oe).includes(Oe(l.value));
  switch (l.operator) {
    case "equals":
      return n;
    case "not_equals":
      return !n;
    case "filled":
      return r;
    default:
      return !r;
  }
}
const Ne = "__none";
function I({ message: t }) {
  return t ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t }) : null;
}
function Ue(t) {
  const a = t.config?.options;
  return Array.isArray(a) ? a.flatMap((l) => {
    if (typeof l == "string") return [{ value: l, label: l }];
    if (l && typeof l == "object" && typeof l.value == "string") {
      const { value: c, label: r } = l;
      return [{ value: c, label: r || c }];
    }
    return [];
  }) : [];
}
const ea = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function Me(t) {
  if (t.label) return t.label;
  const a = t.handle.replace(/_/g, " ");
  return a.charAt(0).toUpperCase() + a.slice(1);
}
function ee({ field: t, value: a, onChange: l, errors: c, id: r, content: n = !1 }) {
  const m = Me(t), d = ea.includes(t.type) || ["select", "terms"].includes(t.type) && t.config?.multiple === !0;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", ...d ? { role: "group", "aria-labelledby": `${r}-label` } : {}, children: [
    t.type === "toggle" ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(s.Switch, { id: r, checked: a === !0, onCheckedChange: (h) => l(h) }),
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: r, children: m })
    ] }) : /* @__PURE__ */ e.jsxs(s.Label, { id: `${r}-label`, htmlFor: d ? void 0 : r, children: [
      m,
      t.required && /* @__PURE__ */ e.jsx("span", { className: "cms:text-destructive", children: " *" })
    ] }),
    /* @__PURE__ */ e.jsx(sa, { field: t, value: a, onChange: l, errors: c, id: r, content: n }),
    t.instructions && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t.instructions }),
    /* @__PURE__ */ e.jsx(I, { message: c[""] })
  ] });
}
function sa({ field: t, value: a, onChange: l, errors: c, id: r, content: n }) {
  const m = c[""] !== void 0;
  switch (t.type) {
    case "toggle":
      return null;
    case "file":
      return /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Visitors attach a file here when they send a form." });
    case "textarea":
      return /* @__PURE__ */ e.jsx(
        s.Textarea,
        {
          id: r,
          "aria-invalid": m,
          value: typeof a == "string" ? a : "",
          rows: J(t, "rows") ?? 4,
          onChange: (d) => l(d.target.value)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ e.jsx(s.RichTextEditor, { id: r, labelledBy: `${r}-label`, invalid: m, value: typeof a == "string" ? a : "", onChange: l });
    case "number":
      return /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: r,
          type: "number",
          className: "cms:max-w-48",
          "aria-invalid": m,
          value: typeof a == "number" ? String(a) : typeof a == "string" ? a : "",
          min: J(t, "min"),
          max: J(t, "max"),
          step: J(t, "step") ?? "any",
          onChange: (d) => l(d.target.value === "" ? null : Number(d.target.value))
        }
      );
    case "date": {
      const d = t.config?.time === !0;
      return /* @__PURE__ */ e.jsx(
        s.DatePicker,
        {
          id: r,
          withTime: d,
          invalid: m,
          required: t.required === !0,
          value: Pe(xt(a, d)),
          onChange: (h) => l(Pe(h ?? ""))
        }
      );
    }
    case "select":
      return t.config?.multiple === !0 ? /* @__PURE__ */ e.jsx(la, { options: Ue(t), value: Array.isArray(a) ? a.map(String) : [], onChange: l }) : /* @__PURE__ */ e.jsx(aa, { options: Ue(t), value: typeof a == "string" ? a : null, onChange: l, id: r, required: t.required === !0 });
    case "terms": {
      const d = t.config?.multiple === !0, h = Array.isArray(a) ? a.filter((i) => typeof i == "number") : typeof a == "number" ? a : null;
      return /* @__PURE__ */ e.jsx(
        Jt,
        {
          id: r,
          taxonomy: typeof t.taxonomy == "string" ? t.taxonomy : null,
          multiple: d,
          max: J(t, "max") ?? null,
          required: t.required === !0,
          invalid: m,
          value: d ? Array.isArray(h) ? h : [] : typeof h == "number" ? h : null,
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
          multiple: t.config?.multiple === !0,
          max: J(t, "max") ?? null,
          collections: t.collections ?? [],
          onChange: l,
          value: typeof a == "number" || Array.isArray(a) && a.every((d) => typeof d == "number") ? a : null
        }
      );
    case "link":
      return /* @__PURE__ */ e.jsx(na, { value: re(a), onChange: l, errors: c, id: r, collections: t.collections ?? [] });
    case "media":
      return /* @__PURE__ */ e.jsx(
        s.MediaPickerInput,
        {
          id: r,
          invalid: m,
          disabled: !1,
          multiple: t.config?.multiple === !0,
          max: J(t, "max") ?? null,
          types: Array.isArray(t.config?.types) ? t.config.types : [],
          value: typeof a == "number" || Array.isArray(a) && a.every((d) => typeof d == "number") ? a : null,
          onChange: l
        }
      );
    case "group":
      return /* @__PURE__ */ e.jsx(se, { fields: t.fields ?? [], value: re(a), onChange: l, errors: c, id: r, content: n });
    case "repeater":
      return /* @__PURE__ */ e.jsx(ra, { field: t, value: Array.isArray(a) ? a : [], onChange: l, errors: c, id: r, content: n });
    case "flexible":
      return /* @__PURE__ */ e.jsx(ia, { field: t, value: Array.isArray(a) ? a : [], onChange: l, errors: c, id: r });
    default:
      return /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: r,
          "aria-invalid": m,
          value: typeof a == "string" ? a : "",
          placeholder: ta(t, "placeholder"),
          maxLength: J(t, "max"),
          onChange: (d) => l(d.target.value)
        }
      );
  }
}
function J(t, a) {
  const l = t.config?.[a];
  return typeof l == "number" ? l : void 0;
}
function ta(t, a) {
  const l = t.config?.[a];
  return typeof l == "string" ? l : void 0;
}
function se({ fields: t, value: a, onChange: l, errors: c, id: r, content: n, bare: m = !1 }) {
  return /* @__PURE__ */ e.jsx("div", { className: m ? "cms:flex cms:flex-col cms:gap-6" : "cms:flex cms:flex-col cms:gap-4 cms:rounded-lg cms:border cms:p-4", children: t.filter((d) => Ie(d, a)).map((d) => d.shared ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
    /* @__PURE__ */ e.jsx(ee, { id: `${r}-${d.handle}`, field: d, value: a[d.handle], content: n, errors: {}, onChange: () => {
    } }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Shared by all languages: edit it in the main language." })
  ] }, d.handle) : /* @__PURE__ */ e.jsx(
    ee,
    {
      id: `${r}-${d.handle}`,
      field: d,
      value: a[d.handle],
      content: n,
      errors: q(c, d.handle),
      onChange: (h) => l({ ...a, [d.handle]: h })
    },
    d.handle
  )) });
}
function aa({ options: t, value: a, onChange: l, id: c, required: r }) {
  return /* @__PURE__ */ e.jsxs(s.Select, { value: a ?? Ne, onValueChange: (n) => l(n === Ne ? null : n), children: [
    /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: c, className: "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
    /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
      !r && /* @__PURE__ */ e.jsx(s.SelectItem, { value: Ne, children: "None" }),
      t.map((n) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: n.value, children: n.label }, n.value))
    ] })
  ] });
}
function la({ options: t, value: a, onChange: l }) {
  return t.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Nothing to choose from yet." }) : /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2", children: t.map((c) => /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
    /* @__PURE__ */ e.jsx(
      s.Checkbox,
      {
        checked: a.includes(c.value),
        onCheckedChange: (r) => l(r ? t.map((n) => n.value).filter((n) => n === c.value || a.includes(n)) : a.filter((n) => n !== c.value))
      }
    ),
    c.label
  ] }, c.value)) });
}
function na({ value: t, onChange: a, errors: l, id: c, collections: r }) {
  const n = t.type === "entry" ? "entry" : "url", m = (d) => {
    const h = { ...t, type: n, ...d }, i = h.type === "entry" ? typeof h.entry_id != "number" : h.url === "" || h.url === void 0 || h.url === null;
    a(i ? h.label || h.new_tab ? h : null : h);
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("div", { role: "radiogroup", "aria-label": "Link to", className: "cms:inline-flex cms:w-fit cms:rounded-md cms:border cms:p-0.5", children: ["url", "entry"].map((d) => /* @__PURE__ */ e.jsx(
      s.Button,
      {
        type: "button",
        size: "sm",
        role: "radio",
        "aria-checked": n === d,
        variant: n === d ? "secondary" : "ghost",
        onClick: () => m({ type: d, url: d === "url" ? t.url : void 0, entry_id: d === "entry" ? t.entry_id : void 0 }),
        children: d === "url" ? "Address" : "Entry"
      },
      d
    )) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-2 cms:md:grid-cols-[2fr_1fr_auto] cms:md:items-start", children: [
      n === "url" ? /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: c,
          "aria-label": "Address",
          placeholder: "https://… or /about",
          value: typeof t.url == "string" ? t.url : "",
          onChange: (d) => m({ url: d.target.value }),
          "aria-invalid": l.url !== void 0
        }
      ) : /* @__PURE__ */ e.jsx(
        je,
        {
          id: c,
          invalid: l.entry_id !== void 0,
          multiple: !1,
          max: null,
          collections: r,
          value: typeof t.entry_id == "number" ? t.entry_id : null,
          onChange: (d) => m({ entry_id: typeof d == "number" ? d : void 0 })
        }
      ),
      /* @__PURE__ */ e.jsx(
        s.Input,
        {
          "aria-label": "Link text",
          placeholder: n === "entry" ? "Link text (the entry's title)" : "Link text",
          value: typeof t.label == "string" ? t.label : "",
          onChange: (d) => m({ label: d.target.value })
        }
      ),
      /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:h-9 cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx(s.Checkbox, { checked: t.new_tab === !0, onCheckedChange: (d) => m({ new_tab: d }) }),
        "New tab"
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ e.jsx(I, { message: l.url ?? l.entry_id ?? l.label ?? l.type }) })
    ] })
  ] });
}
function ca(t, a) {
  return !a && (t.fields ?? []).every((l) => l.type === "text");
}
function at(t) {
  const a = $.useRef([]);
  return a.current = bt(a.current, t), {
    keys: a.current,
    remove: (l) => {
      a.current = a.current.filter((c, r) => r !== l);
    },
    move: (l, c) => {
      a.current = s.moveItem(a.current, l, c);
    }
  };
}
function ra({ field: t, value: a, onChange: l, errors: c, id: r, content: n = !1 }) {
  const m = t.fields ?? [], d = a.map(re), h = at(d.length), i = (b, f) => l(d.map((k, g) => g === b ? f : k)), v = (b) => {
    h.remove(b), l(d.filter((f, k) => k !== b));
  }, o = (t.label || "row").toLowerCase().replace(/s$/, ""), u = o.charAt(0).toUpperCase() + o.slice(1), y = d.map((b, f) => ({ row: b, index: f, key: h.keys[f] ?? String(f) }));
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(
      s.SortableList,
      {
        items: y,
        getId: (b) => b.key,
        onReorder: (b, f, k) => {
          h.move(f, k), l(b.map((g) => g.row));
        },
        children: ({ row: b, index: f }, { handle: k }) => ca(t, n) ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(s.SortableHandle, { ...k, label: `Move ${o} ${f + 1}`, className: "cms:mt-1" }),
          m.map((g) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
            /* @__PURE__ */ e.jsx(
              s.Input,
              {
                "aria-label": g.label || g.handle,
                placeholder: g.label || g.handle,
                value: typeof b[g.handle] == "string" ? b[g.handle] : "",
                onChange: (S) => i(f, { ...b, [g.handle]: S.target.value })
              }
            ),
            /* @__PURE__ */ e.jsx(I, { message: c[`${f}.${g.handle}`] })
          ] }, g.handle)),
          /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": `Remove ${o} ${f + 1}`, onClick: () => v(f), children: /* @__PURE__ */ e.jsx(R, {}) })
        ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(
            lt,
            {
              label: `${u} ${f + 1}`,
              handle: k,
              onRemove: () => v(f),
              hidden: n ? b._hidden === !0 : void 0,
              onHidden: (g) => i(f, { ...b, _hidden: g })
            }
          ),
          /* @__PURE__ */ e.jsx(se, { fields: m, value: b, onChange: (g) => i(f, g), errors: q(c, String(f)), id: `${r}-${f}`, content: n })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", size: "sm", onClick: () => l([...d, n ? pt() : {}]), children: [
      /* @__PURE__ */ e.jsx(K, {}),
      " Add ",
      o
    ] }) })
  ] });
}
function ia({ field: t, value: a, onChange: l, errors: c, id: r }) {
  const n = t.blocks ?? [], m = a.map(re), d = at(m.length), h = (o, u) => l(m.map((y, b) => b === o ? u : y)), i = (o) => {
    d.remove(o), l(m.filter((u, y) => y !== o));
  }, v = m.map((o, u) => ({ block: o, index: u, key: d.keys[u] ?? String(u) }));
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    /* @__PURE__ */ e.jsx(
      s.SortableList,
      {
        items: v,
        getId: (o) => o.key,
        className: "cms:gap-3",
        onReorder: (o, u, y) => {
          d.move(u, y), l(o.map((b) => b.block));
        },
        children: ({ block: o, index: u }, { handle: y }) => {
          const b = n.find((f) => f.type === o.type);
          return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              lt,
              {
                label: b?.label ?? String(o.type),
                badge: !0,
                handle: y,
                onRemove: () => i(u),
                hidden: o.hidden === !0,
                onHidden: (f) => h(u, { ...o, hidden: f })
              }
            ),
            b ? /* @__PURE__ */ e.jsx(
              se,
              {
                fields: b.fields,
                value: re(o.values),
                onChange: (f) => h(u, { ...o, values: f }),
                errors: q(c, `${u}.values`),
                id: `${r}-${u}`,
                content: !0
              }
            ) : /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: "This kind of block no longer exists. Its values are kept." }),
            /* @__PURE__ */ e.jsx(I, { message: c[`${u}.type`] })
          ] });
        }
      }
    ),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(s.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(s.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", size: "sm", disabled: n.length === 0, children: [
        /* @__PURE__ */ e.jsx(K, {}),
        " Add block"
      ] }) }),
      /* @__PURE__ */ e.jsx(s.DropdownMenuContent, { align: "start", children: n.map((o) => /* @__PURE__ */ e.jsx(s.DropdownMenuItem, { onSelect: () => l([...m, gt(o.type)]), children: o.label }, o.type)) })
    ] }) })
  ] });
}
function lt({ label: t, badge: a = !1, handle: l, onRemove: c, hidden: r, onHidden: n }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(s.SortableHandle, { ...l, label: `Move ${t}` }),
    a ? /* @__PURE__ */ e.jsx(s.Badge, { variant: "secondary", children: t }) : /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:font-medium", children: t }),
    r !== void 0 && /* @__PURE__ */ e.jsxs("label", { className: "cms:ml-auto cms:flex cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", children: [
      /* @__PURE__ */ e.jsx(s.Switch, { checked: !r, onCheckedChange: (m) => n(!m), "aria-label": `Show ${t}` }),
      "Show"
    ] }),
    /* @__PURE__ */ e.jsx(
      s.Button,
      {
        type: "button",
        variant: "ghost",
        size: "icon",
        className: `cms:size-8 cms:text-destructive ${r === void 0 ? "cms:ml-auto" : ""}`,
        "aria-label": `Remove ${t}`,
        onClick: c,
        children: /* @__PURE__ */ e.jsx(R, {})
      }
    )
  ] });
}
function nt({ fields: t, onChange: a, types: l, errors: c, depth: r = 1, idPrefix: n = "field" }) {
  const [m, d] = $.useState(() => /* @__PURE__ */ new Set()), h = (o) => d((u) => {
    const y = new Set(u);
    return y.has(o) ? y.delete(o) : y.add(o), y;
  }), i = (o, u) => a(t.map((y, b) => b === o ? u : y)), v = (o) => {
    const u = Zt(o.type, o.label, t);
    a([...t, u]), d((y) => new Set(y).add(u.key));
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    t.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:border-dashed cms:p-4 cms:text-sm cms:text-muted-foreground", children: "No fields yet." }),
    /* @__PURE__ */ e.jsx(s.SortableList, { items: t, getId: (o) => o.key, onReorder: (o) => a(o), children: (o, { index: u, handle: y, isOverlay: b }) => {
      const f = l.find((S) => S.type === o.type), k = !b && (m.has(o.key) || ae(c, String(u))), g = `${n}-${o.key}`;
      return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${ae(c, String(u)) ? "cms:border-destructive" : ""}`, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:p-2", children: [
          /* @__PURE__ */ e.jsx(s.SortableHandle, { ...y, label: `Move ${o.label || o.handle}` }),
          /* @__PURE__ */ e.jsx(
            s.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-expanded": k,
              "aria-controls": g,
              "aria-label": `${k ? "Close" : "Open"} ${o.label || o.handle}`,
              onClick: () => h(o.key),
              children: k ? /* @__PURE__ */ e.jsx(hs, {}) : /* @__PURE__ */ e.jsx(ge, {})
            }
          ),
          /* @__PURE__ */ e.jsxs("button", { type: "button", className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:text-left", onClick: () => h(o.key), children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: o.label || o.handle }),
            /* @__PURE__ */ e.jsx("code", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", children: o.handle })
          ] }),
          o.required && /* @__PURE__ */ e.jsx(s.Badge, { variant: "outline", children: "Required" }),
          /* @__PURE__ */ e.jsx(s.Badge, { variant: "secondary", children: f?.label ?? o.type }),
          f?.hasChildren && o.fields.length > 0 && !k && /* @__PURE__ */ e.jsxs("span", { className: "cms:text-xs cms:text-muted-foreground", children: [
            o.fields.length,
            " inside"
          ] }),
          /* @__PURE__ */ e.jsx(
            s.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Remove ${o.label || o.handle}`,
              onClick: () => a(t.filter((S, T) => T !== u)),
              children: /* @__PURE__ */ e.jsx(R, {})
            }
          )
        ] }),
        k && /* @__PURE__ */ e.jsx(
          oa,
          {
            id: g,
            field: o,
            type: f,
            siblings: t,
            onChange: (S) => i(u, S),
            types: l,
            errors: ie(c, String(u)),
            depth: r
          }
        )
      ] });
    } }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(s.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(s.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", size: "sm", children: [
        /* @__PURE__ */ e.jsx(K, {}),
        " Add field"
      ] }) }),
      /* @__PURE__ */ e.jsx(s.DropdownMenuContent, { align: "start", children: l.filter((o) => !o.hasChildren || r < Yt).map((o) => /* @__PURE__ */ e.jsx(s.DropdownMenuItem, { onSelect: () => v(o), children: o.label }, o.type)) })
    ] }) })
  ] });
}
const Y = { default: "__default", yes: "yes", no: "no" };
function oa({ id: t, field: a, type: l, siblings: c, onChange: r, types: n, errors: m, depth: d }) {
  const h = a.config ?? {};
  return /* @__PURE__ */ e.jsxs("div", { id: t, className: "cms:flex cms:flex-col cms:gap-4 cms:border-t cms:p-4", children: [
    !l && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-destructive", children: [
      'The field type "',
      a.type,
      `" isn't registered. Its data is kept; register the type or remove the field.`
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${t}-label`, children: "Label" }),
        /* @__PURE__ */ e.jsx(s.Input, { id: `${t}-label`, value: a.label ?? "", onChange: (i) => r(Xt(a, i.target.value, c)) }),
        /* @__PURE__ */ e.jsx(I, { message: m.label })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${t}-handle`, children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            id: `${t}-handle`,
            className: "cms:font-mono",
            value: a.handle,
            onChange: (i) => r({ ...a, handle: Xs(i.target.value), handleTouched: !0 })
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "How templates read it. Renaming it hides values saved under the old one." }),
        /* @__PURE__ */ e.jsx(I, { message: m.handle })
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
          onChange: (i) => r({ ...a, instructions: i.target.value || null })
        }
      ),
      /* @__PURE__ */ e.jsx(I, { message: m.instructions })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-6", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(s.Switch, { id: `${t}-required`, checked: a.required === !0, onCheckedChange: (i) => r({ ...a, required: i }) }),
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${t}-required`, children: "Required" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${t}-translatable`, children: "Per language" }),
        /* @__PURE__ */ e.jsxs(
          s.Select,
          {
            value: a.translatable === !0 ? Y.yes : a.translatable === !1 ? Y.no : Y.default,
            onValueChange: (i) => r({ ...a, translatable: i === Y.yes ? !0 : i === Y.no ? !1 : null }),
            children: [
              /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: `${t}-translatable`, className: "cms:w-48", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
              /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
                /* @__PURE__ */ e.jsx(s.SelectItem, { value: Y.default, children: "As the type decides" }),
                /* @__PURE__ */ e.jsx(s.SelectItem, { value: Y.yes, children: "Yes, translated" }),
                /* @__PURE__ */ e.jsx(s.SelectItem, { value: Y.no, children: "No, shared" })
              ] })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(da, { id: t, field: a, siblings: c, onChange: r, errors: ie(m, "condition") }),
    (l?.settings.length ?? 0) > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: l?.settings.map((i) => /* @__PURE__ */ e.jsx(
      ee,
      {
        id: `${t}-config-${i.handle}`,
        field: i,
        value: h[i.handle],
        errors: q(m, `config.${i.handle}`),
        onChange: (v) => r({ ...a, config: { ...h, [i.handle]: v } })
      },
      i.handle
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
          onChange: (i) => r({ ...a, validation: i.target.value.split(`
`) })
        }
      ),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Laravel rules, one per line." }),
      /* @__PURE__ */ e.jsx(I, { message: m.validation ?? Object.entries(m).find(([i]) => i.startsWith("validation."))?.[1] })
    ] }),
    l?.hasChildren && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(s.Label, { children: "Fields inside" }),
      /* @__PURE__ */ e.jsx(
        nt,
        {
          fields: a.fields,
          onChange: (i) => r({ ...a, fields: i }),
          types: n,
          errors: ie(m, "fields"),
          depth: d + 1,
          idPrefix: t
        }
      ),
      /* @__PURE__ */ e.jsx(I, { message: m.fields })
    ] }),
    /* @__PURE__ */ e.jsx(I, { message: m.type })
  ] });
}
const Se = "__always";
function da({ id: t, field: a, siblings: l, onChange: c, errors: r }) {
  const n = l.filter((i) => i.key !== a.key && i.handle !== ""), m = a.condition ?? null, d = ye.find((i) => i.value === m?.operator) ?? ye[0], h = (i) => c({ ...a, condition: i === null ? null : { field: m?.field ?? n[0]?.handle ?? "", operator: m?.operator ?? "equals", value: m?.value ?? "", ...i } });
  return n.length === 0 && m === null ? null : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${t}-condition`, children: "Show" }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(s.Select, { value: m?.field ?? Se, onValueChange: (i) => h(i === Se ? null : { field: i }), children: [
        /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: `${t}-condition`, className: "cms:w-56", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
        /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
          /* @__PURE__ */ e.jsx(s.SelectItem, { value: Se, children: "Always" }),
          n.map((i) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: i.handle, children: [
            "When ",
            i.label || i.handle
          ] }, i.key))
        ] })
      ] }),
      m && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(s.Select, { value: d.value, onValueChange: (i) => h({ operator: i }), children: [
          /* @__PURE__ */ e.jsx(s.SelectTrigger, { "aria-label": "How to compare", className: "cms:w-36", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(s.SelectContent, { children: ye.map((i) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: i.value, children: i.label }, i.value)) })
        ] }),
        d.needsValue && /* @__PURE__ */ e.jsx(
          s.Input,
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
    /* @__PURE__ */ e.jsx(I, { message: r.field ?? r.operator ?? r.value ?? r[""] })
  ] });
}
function ma({ kind: t = "blueprint", blueprint: a, fieldTypes: l, usedBy: c = [] }) {
  const r = t === "fieldset" ? "Fieldset" : "Blueprint", n = _(t === "fieldset" ? "cms/fieldsets" : "cms/blueprints"), m = a ? a.title : `New ${r.toLowerCase()}`;
  s.useBreadcrumbs([{ label: `${r}s`, href: n }, { label: m }]);
  const [d, h] = Q(), i = N.useForm({ title: a?.title ?? "", handle: a?.handle ?? "" }), [v, o] = $.useState(a !== null), [u, y] = $.useState(() => st(a?.fields)), b = (x) => l.find((L) => L.type === x)?.hasChildren === !0, f = i.errors, [k, g] = $.useState(() => JSON.stringify(u)), S = i.isDirty || JSON.stringify(u) !== k, T = () => {
    i.setDefaults(), g(JSON.stringify(u));
  }, p = () => {
    i.processing || (i.transform((x) => ({
      ...a ? { title: x.title } : x,
      fields: tt(u, b)
    })), a ? i.put(`${n}/${a.id}`, { preserveScroll: !0, onSuccess: T }) : i.post(n, { onSuccess: T }));
  }, C = (x) => {
    x.preventDefault(), p();
  };
  s.useUnsavedChanges(S, p);
  const D = () => a && d(
    `Delete the ${r.toLowerCase()} "${a.title}"? Content keeps its values.`,
    () => N.router.delete(`${n}/${a.id}`, { preserveScroll: !0 })
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: C, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: m }),
    h,
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: m,
        back: { href: n, label: `Back to ${r.toLowerCase()}s` },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          a && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", size: "icon", className: "cms:text-destructive", "aria-label": `Delete ${m}`, onClick: D, children: /* @__PURE__ */ e.jsx(R, {}) }),
          /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: i.processing, children: [
            i.processing && /* @__PURE__ */ e.jsx(ne, { className: "cms:animate-spin" }),
            a ? "Save" : `Create ${r.toLowerCase()}`
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(I, { message: f.blueprint ?? f.fieldset }),
    /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsxs(s.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "title", children: "Title" }),
        /* @__PURE__ */ e.jsx(s.Input, { id: "title", value: i.data.title, required: !0, onChange: (x) => {
          i.setData((L) => ({ ...L, title: x.target.value, handle: v ? L.handle : Zs(x.target.value) }));
        } }),
        /* @__PURE__ */ e.jsx(I, { message: f.title })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "handle", children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            id: "handle",
            className: "cms:font-mono",
            value: i.data.handle,
            disabled: a !== null,
            required: !0,
            onChange: (x) => {
              o(!0), i.setData("handle", Xs(x.target.value));
            }
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: a ? "Set when it was created." : "Lowercase letters, digits and underscores. It can't change later." }),
        /* @__PURE__ */ e.jsx(I, { message: f.handle })
      ] })
    ] }) }),
    c.length > 0 && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      "Used by ",
      c.join(", "),
      ". Changes show there at once."
    ] }),
    /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-3", "aria-labelledby": "fields-heading", children: [
      /* @__PURE__ */ e.jsx("h2", { id: "fields-heading", className: "cms:text-lg cms:font-medium", children: "Fields" }),
      /* @__PURE__ */ e.jsx(nt, { fields: u, onChange: y, types: l, errors: ie(f, "fields") }),
      /* @__PURE__ */ e.jsx(I, { message: f.fields })
    ] })
  ] });
}
function ct({ noun: t, base: a, rows: l, intro: c }) {
  const r = `${t}s`;
  s.useBreadcrumbs([{ label: r }]);
  const [n, m] = Q();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: r }),
    m,
    /* @__PURE__ */ e.jsx(s.PageHeader, { title: r, description: c, actions: /* @__PURE__ */ e.jsx(s.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(N.Link, { href: `${a}/create`, children: [
      /* @__PURE__ */ e.jsx(K, {}),
      " New ",
      t.toLowerCase()
    ] }) }) }),
    /* @__PURE__ */ e.jsx(s.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(s.Table, { children: [
      /* @__PURE__ */ e.jsx(s.TableHeader, { children: /* @__PURE__ */ e.jsxs(s.TableRow, { children: [
        /* @__PURE__ */ e.jsx(s.TableHead, { children: "Title" }),
        /* @__PURE__ */ e.jsx(s.TableHead, { children: "Handle" }),
        /* @__PURE__ */ e.jsx(s.TableHead, { children: "Fields" }),
        l.some((d) => d.usedBy) && /* @__PURE__ */ e.jsx(s.TableHead, { children: "Used by" }),
        /* @__PURE__ */ e.jsx(s.TableHead, { className: "cms:w-12", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: "Actions" }) })
      ] }) }),
      /* @__PURE__ */ e.jsxs(s.TableBody, { children: [
        l.length === 0 && /* @__PURE__ */ e.jsx(s.TableRow, { children: /* @__PURE__ */ e.jsxs(s.TableCell, { colSpan: 5, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: [
          "No ",
          r.toLowerCase(),
          " yet."
        ] }) }),
        l.map((d) => /* @__PURE__ */ e.jsxs(s.TableRow, { children: [
          /* @__PURE__ */ e.jsx(s.TableCell, { children: /* @__PURE__ */ e.jsx(N.Link, { href: `${a}/${d.id}/edit`, className: "cms:font-medium cms:hover:underline", children: d.title }) }),
          /* @__PURE__ */ e.jsx(s.TableCell, { children: /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: d.handle }) }),
          /* @__PURE__ */ e.jsx(s.TableCell, { children: d.fields }),
          d.usedBy && /* @__PURE__ */ e.jsx(s.TableCell, { className: "cms:text-muted-foreground", children: d.usedBy.join(", ") || "—" }),
          /* @__PURE__ */ e.jsx(s.TableCell, { children: /* @__PURE__ */ e.jsx(
            s.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Delete ${d.title}`,
              onClick: () => n(
                `Delete the ${t.toLowerCase()} "${d.title}"? Content keeps its values.`,
                () => N.router.delete(`${a}/${d.id}`, { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(R, {})
            }
          ) })
        ] }, d.id))
      ] })
    ] }) })
  ] });
}
function ua({ blueprints: t }) {
  const a = N.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(I, { message: a.blueprint }),
    /* @__PURE__ */ e.jsx(
      ct,
      {
        noun: "Blueprint",
        base: _("cms/blueprints"),
        rows: t,
        intro: "The fields editors fill in, for each kind of content."
      }
    )
  ] });
}
const Ke = (t) => `resources/views/${t.replace(/\./g, "/")}.blade.php`;
function rt({ example: t, fallbacks: a }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1 cms:text-xs cms:leading-relaxed cms:text-muted-foreground", children: [
    /* @__PURE__ */ e.jsxs("p", { children: [
      "A Blade view: ",
      /* @__PURE__ */ e.jsx("code", { className: "cms:text-foreground", children: t }),
      " is ",
      /* @__PURE__ */ e.jsx("code", { className: "cms:break-all", children: Ke(t) }),
      "."
    ] }),
    /* @__PURE__ */ e.jsx("p", { children: "Empty: the first that exists of" }),
    /* @__PURE__ */ e.jsxs("ol", { className: "cms:ml-4 cms:list-decimal", children: [
      a.map((l) => /* @__PURE__ */ e.jsx("li", { children: l.includes(" ") ? l : /* @__PURE__ */ e.jsx("code", { className: "cms:break-all", children: Ke(l) }) }, l)),
      /* @__PURE__ */ e.jsx("li", { children: "the built-in template" })
    ] })
  ] });
}
const We = { preserveScroll: !0, preserveState: !0 };
function ha({ entryId: t, comments: a }) {
  const [l, c] = $.useState(null), [r, n] = $.useState(""), [m, d] = $.useState(!1), h = (v, o) => N.router.post(_(`cms/comments/${v}/status`), { status: o }, We), i = (v) => N.router.post(_(`cms/comments/${v}/reply`), { body: r }, {
    ...We,
    onStart: () => d(!0),
    onFinish: () => d(!1),
    onSuccess: () => {
      c(null), n("");
    }
  });
  return /* @__PURE__ */ e.jsx(
    s.CollapsibleCard,
    {
      title: "Comments",
      titleClassName: "cms:text-base",
      storageKey: "cms:entry:comments",
      contentClassName: "cms:flex cms:flex-col cms:gap-3 cms:text-sm",
      headerAction: a && a.counts.pending > 0 ? /* @__PURE__ */ e.jsxs(s.Badge, { children: [
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
        a.latest.map((v) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5 cms:border-t cms:border-border/70 cms:pt-3 cms:first-of-type:border-t-0 cms:first-of-type:pt-0", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium", children: v.author }),
            v.status === "pending" && /* @__PURE__ */ e.jsx(s.Badge, { variant: "outline", children: "Pending" })
          ] }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:line-clamp-3 cms:break-words cms:whitespace-pre-line", children: v.excerpt }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
            G(v.createdAt),
            v.reply ? " · a reply" : ""
          ] }),
          a.canModerate && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-1", children: [
            v.status === "pending" && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", size: "sm", onClick: () => h(v.id, "approved"), children: [
              /* @__PURE__ */ e.jsx(xe, {}),
              " Approve"
            ] }),
            /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => h(v.id, "spam"), children: [
              /* @__PURE__ */ e.jsx(_e, {}),
              " Spam"
            ] }),
            /* @__PURE__ */ e.jsxs(
              s.Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                "aria-expanded": l === v.id,
                onClick: () => {
                  c(l === v.id ? null : v.id), n("");
                },
                children: [
                  /* @__PURE__ */ e.jsx(As, {}),
                  " Reply"
                ]
              }
            )
          ] }),
          l === v.id && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              s.Textarea,
              {
                "aria-label": `Reply to ${v.author}`,
                rows: 3,
                value: r,
                onChange: (o) => n(o.target.value)
              }
            ),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
              /* @__PURE__ */ e.jsx(s.Button, { type: "button", size: "sm", disabled: r.trim() === "" || m, onClick: () => i(v.id), children: "Post reply" }),
              /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => c(null), children: "Cancel" })
            ] })
          ] })
        ] }, v.id)),
        /* @__PURE__ */ e.jsx("a", { href: _(`cms/comments?entry=${t}`), className: "cms:text-sm cms:font-medium cms:underline-offset-4 cms:hover:underline", children: "All comments on this entry" })
      ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Skeleton, { className: "cms:h-10" }),
        /* @__PURE__ */ e.jsx(s.Skeleton, { className: "cms:h-10" })
      ] })
    }
  );
}
function Ae({ fields: t, values: a, onChange: l, errors: c, storageKey: r, shared: n = [], sharedValues: m = {}, sharedNote: d, disabled: h = !1 }) {
  const i = [], v = { ...m, ...a };
  for (const u of t.filter((y) => Ie(y, v))) {
    const y = i[i.length - 1];
    u.type === "group" ? i.push(u) : Array.isArray(y) ? y.push(u) : i.push([u]);
  }
  const o = d ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: d }) : null;
  return /* @__PURE__ */ e.jsx(e.Fragment, { children: i.map((u) => {
    if (Array.isArray(u))
      return /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsx(s.CardContent, { children: /* @__PURE__ */ e.jsx("fieldset", { disabled: h, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: u.map((k) => n.includes(k.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(ee, { id: `data-${k.handle}`, field: k, content: !0, value: m[k.handle], errors: {}, onChange: () => {
        } }),
        o
      ] }, k.handle) : /* @__PURE__ */ e.jsx(
        ee,
        {
          id: `data-${k.handle}`,
          field: k,
          content: !0,
          value: a[k.handle],
          errors: q(c, `data.${k.handle}`),
          onChange: (g) => l(k.handle, g)
        },
        k.handle
      )) }) }) }, `fields-${u[0]?.handle ?? ""}`);
    const y = n.includes(u.handle), b = (y ? m : a)[u.handle], f = q(c, `data.${u.handle}`);
    return /* @__PURE__ */ e.jsx(
      s.CollapsibleCard,
      {
        title: Me(u),
        titleClassName: "cms:text-base",
        description: u.instructions ?? void 0,
        storageKey: `${r}:${u.handle}`,
        hasErrors: !y && ae(c, `data.${u.handle}`),
        children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: y || h, role: "group", "aria-label": Me(u), className: "cms:flex cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(
            se,
            {
              bare: !0,
              fields: u.fields ?? [],
              id: `data-${u.handle}`,
              content: !0,
              errors: y ? {} : f,
              value: b && typeof b == "object" && !Array.isArray(b) ? b : {},
              onChange: (k) => l(u.handle, k)
            }
          ),
          y && o,
          /* @__PURE__ */ e.jsx(I, { message: y ? void 0 : f[""] })
        ] })
      },
      u.handle
    );
  }) });
}
const Ee = [
  { handle: "title", type: "text", label: "Meta title", instructions: "Empty: the title.", config: { max: 255 } },
  { handle: "description", type: "textarea", label: "Meta description", instructions: "A sentence or two for search results.", config: { max: 500 } },
  { handle: "canonical", type: "text", label: "Canonical URL", instructions: "Only if this page copies another: that page's address. Empty: this page.", config: { max: 2e3 } },
  { handle: "image", type: "media", label: "Open Graph image", instructions: "Shown when the page is shared.", config: { types: ["image"] } },
  { handle: "noindex", type: "toggle", label: "Hide from search engines (noindex)" }
];
function qe(t) {
  return t.length === 0 ? "" : ` It's used by ${t.slice(0, 5).map((l) => l.label).join("; ")}${t.length > 5 ? ` and ${t.length - 5} more` : ""}: those links will show nothing.`;
}
function xa(t) {
  const { entry: a } = t;
  return /* @__PURE__ */ e.jsx(pa, { ...t }, a ? `${a.id}:${a.locale}:${a.version}:${a.status}:${a.trashed}:${a.publishedAt}` : "new");
}
function pa({ collection: t, fields: a, locales: l = [], shared: c = [], sharedValues: r = {}, entry: n, values: m, revisions: d, comments: h, termLabels: i, usedBy: v = [], undoRestore: o = null, machineTranslate: u = null, settings: y, blueprints: b = [], can: f }) {
  const k = _(`cms/collections/${t.handle}/entries`), g = n ? _(`cms/entries/${n.id}`) : k, S = n ? m.title : "New entry";
  s.useBreadcrumbs([{ label: t.title, href: k }, { label: S }]);
  const [T, p] = Q(), [C, D] = $.useState(!1), x = N.useForm({ ...m, seo: m.seo ?? {}, locale: n?.locale ?? null, version: n?.version ?? null, publish: !1, published_at: null }), L = n ? { locale: n.locale } : {}, A = l.find((M) => M.main)?.code, B = x.errors, w = n !== null && n.status !== "draft" && !n.hasUnpublishedChanges && !x.isDirty, F = n === null ? f.create : f.update && !n.trashed, H = (M = !1, W = null) => {
    x.transform((j) => ({ ...j, publish: M, published_at: W })), n ? x.put(g, { preserveScroll: !0, onSuccess: () => D(!1) }) : x.post(g);
  }, te = () => {
    x.transform((M) => ({ ...M, version: null, publish: !1, published_at: null })), x.put(g, { preserveScroll: !0 });
  }, O = s.useEditLock({
    type: "cms.entry",
    id: n?.id,
    locale: n?.locale,
    enabled: n !== null && F,
    noun: "entry",
    leaveTo: k,
    getUnsaved: () => x.isDirty ? { title: x.data.title, slug: x.data.slug, data: x.data.data, seo: x.data.seo } : null
  }), U = F && !O.readOnly, me = async (M) => {
    const W = await O.loadKept(M);
    x.setData((j) => ({ ...j, title: W.title ?? j.title, slug: W.slug ?? j.slug, data: W.data ?? j.data, seo: W.seo ?? j.seo }));
  };
  s.useUnsavedChanges(x.isDirty && !O.takenOver, U ? () => x.processing || H() : void 0);
  const ce = (M = null) => {
    f.update ? H(!0, M) : n && N.router.post(`${g}/publish`, { ...L, published_at: M }, { preserveScroll: !0, onSuccess: () => D(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (M) => {
    M.preventDefault(), H();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: S }),
    p,
    O.dialogs,
    /* @__PURE__ */ e.jsxs(
      s.PageHeader,
      {
        title: S,
        back: { href: k, label: `Back to ${t.title}` },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          n && !n.trashed && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(
            "a",
            {
              href: n.previewUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              title: x.isDirty ? "Shows the saved draft: save first to see your changes." : "Shows the saved draft.",
              children: [
                /* @__PURE__ */ e.jsx(Et, {}),
                " Preview"
              ]
            }
          ) }),
          n?.url && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: n.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(le, {}),
            " View page"
          ] }) }),
          n?.trashed && f.delete && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", onClick: () => N.router.post(`${g}/restore`, {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(pe, {}),
            " Restore"
          ] }),
          n?.trashed && f.delete && /* @__PURE__ */ e.jsxs(
            s.Button,
            {
              type: "button",
              variant: "outline",
              className: "cms:text-destructive",
              onClick: () => T(
                `Delete "${m.title}" for good, in every language, with its revisions? This can't be undone.${qe(v)}`,
                () => N.router.delete(`${g}/force`, { data: v.length > 0 ? { force: 1 } : {} })
              ),
              children: [
                /* @__PURE__ */ e.jsx(R, {}),
                " Delete for good"
              ]
            }
          ),
          n && !n.trashed && (f.create || f.delete && !O.readOnly || U && u !== null) && /* @__PURE__ */ e.jsxs(s.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(s.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", size: "icon", "aria-label": "More actions", children: /* @__PURE__ */ e.jsx(Ss, {}) }) }),
            /* @__PURE__ */ e.jsxs(s.DropdownMenuContent, { align: "end", className: "cms:min-w-52", children: [
              U && u !== null && /* @__PURE__ */ e.jsxs(
                s.DropdownMenuItem,
                {
                  disabled: x.processing || x.isDirty,
                  onSelect: () => N.router.post(_(`cms/entries/${u}/translate`), { version: n.version }, { preserveScroll: !0 }),
                  children: [
                    /* @__PURE__ */ e.jsx(Pt, {}),
                    " ",
                    x.isDirty ? "Save to translate" : `Translate from ${l.find((M) => M.main)?.name ?? (A ? P(A) : "the main language")}`
                  ]
                }
              ),
              f.create && /* @__PURE__ */ e.jsxs(s.DropdownMenuItem, { onSelect: () => N.router.post(`${g}/duplicate`), children: [
                /* @__PURE__ */ e.jsx(It, {}),
                " Duplicate"
              ] }),
              f.delete && !O.readOnly && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(s.DropdownMenuSeparator, {}),
                /* @__PURE__ */ e.jsxs(
                  s.DropdownMenuItem,
                  {
                    className: "cms:text-destructive",
                    onSelect: () => T(`Move "${m.title}" to the trash? It comes off the site; you can restore it.${qe(v)}`, () => N.router.delete(g)),
                    children: [
                      /* @__PURE__ */ e.jsx(R, {}),
                      " Move to trash"
                    ]
                  }
                )
              ] })
            ] })
          ] }),
          U && /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", variant: n && f.publish ? "outline" : "default", disabled: x.processing, children: [
            x.processing && /* @__PURE__ */ e.jsx(ne, { className: "cms:animate-spin" }),
            n ? "Save draft" : "Create draft"
          ] }),
          n && !n.trashed && f.publish && !O.readOnly && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex", children: [
            /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: w ? "outline" : "default", className: "cms:rounded-r-none cms:disabled:opacity-100", disabled: x.processing || w, onClick: () => ce(), children: [
              w && /* @__PURE__ */ e.jsx(xe, { className: "cms:text-emerald-600 cms:dark:text-emerald-400" }),
              n.status === "draft" ? "Publish" : w ? "Published" : "Publish changes"
            ] }),
            /* @__PURE__ */ e.jsxs(s.DropdownMenu, { children: [
              /* @__PURE__ */ e.jsx(s.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(s.Button, { type: "button", size: "icon", variant: w ? "outline" : "default", className: w ? "cms:-ml-px cms:rounded-l-none" : "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": "More publishing options", children: /* @__PURE__ */ e.jsx(hs, {}) }) }),
              /* @__PURE__ */ e.jsxs(s.DropdownMenuContent, { align: "end", children: [
                /* @__PURE__ */ e.jsxs(s.DropdownMenuItem, { onSelect: () => D(!0), children: [
                  /* @__PURE__ */ e.jsx(ds, {}),
                  " Publish on a date…"
                ] }),
                n.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  /* @__PURE__ */ e.jsx(s.DropdownMenuSeparator, {}),
                  /* @__PURE__ */ e.jsx(s.DropdownMenuItem, { onSelect: () => N.router.post(`${g}/unpublish`, L, { preserveScroll: !0 }), children: "Unpublish" })
                ] })
              ] })
            ] })
          ] })
        ] }),
        children: [
          n && /* @__PURE__ */ e.jsx(s.Badge, { variant: n.status === "published" ? "success" : "secondary", children: n.trashed ? "In the trash" : X(n.status) }),
          x.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
        ]
      }
    ),
    n && l.length > 1 && /* @__PURE__ */ e.jsx(
      ga,
      {
        entryUrl: g,
        editUrl: `${k}/${n.id}/edit`,
        current: n.locale,
        locales: l,
        canAdd: f.create && !n.trashed,
        canRemove: f.delete && !n.isMain && !n.trashed,
        onRemove: () => T(
          `Remove the ${P(n.locale)} translation of "${m.title}"? Its revisions go with it.`,
          () => N.router.delete(`${g}/translations/${n.locale}`)
        )
      }
    ),
    /* @__PURE__ */ e.jsx(s.ViewingNotice, { by: O.viewingBy }),
    /* @__PURE__ */ e.jsx(s.KeptEditsNotice, { kept: O.kept, disabled: !U, onLoad: (M) => {
      me(M);
    }, onDiscard: (M) => {
      O.discardKept(M);
    } }),
    B.version && /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: [
      /* @__PURE__ */ e.jsx("span", { children: B.version }),
      /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", size: "sm", onClick: () => N.router.reload(), children: "Load theirs" }),
        /* @__PURE__ */ e.jsx(
          s.Button,
          {
            type: "button",
            variant: "destructive",
            size: "sm",
            disabled: x.processing,
            onClick: () => T("Save your version over theirs? Their changes are replaced (their earlier published versions stay in the revisions).", te),
            children: "Save mine anyway"
          }
        )
      ] })
    ] }),
    (B.entry || B.published_at) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: B.entry ?? B.published_at }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_18rem]", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsx(s.CardContent, { children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: !U, className: "cms:grid cms:gap-4 cms:md:grid-cols-[2fr_1fr]", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "title", children: "Title" }),
            /* @__PURE__ */ e.jsx(
              s.Input,
              {
                id: "title",
                value: x.data.title,
                "aria-invalid": B.title !== void 0,
                onChange: (M) => x.setData("title", M.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(I, { message: B.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "slug", children: "Slug" }),
            /* @__PURE__ */ e.jsx(
              s.Input,
              {
                id: "slug",
                className: "cms:font-mono",
                value: x.data.slug,
                placeholder: "Made from the title",
                "aria-invalid": B.slug !== void 0,
                onChange: (M) => x.setData("slug", M.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(I, { message: B.slug })
          ] })
        ] }) }) }),
        /* @__PURE__ */ e.jsx(Ys.Provider, { value: Array.isArray(i) || !i ? {} : i, children: /* @__PURE__ */ e.jsx(
          Ae,
          {
            disabled: !U,
            fields: a,
            values: x.data.data,
            errors: B,
            storageKey: `cms:entry:${t.handle}`,
            shared: c,
            sharedValues: r,
            sharedNote: `Shared by all languages: edit it in ${A ? P(A) : "the main language"}.`,
            onChange: (M, W) => x.setData("data", { ...x.data.data, [M]: W })
          }
        ) }),
        /* @__PURE__ */ e.jsx(s.CollapsibleCard, { title: "SEO", description: "How this entry appears in search results and shared links.", titleClassName: "cms:text-base", storageKey: "cms:entry:seo", hasErrors: ae(B, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !U, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(
          se,
          {
            bare: !0,
            id: "seo",
            fields: Ee,
            value: x.data.seo,
            errors: q(B, "seo"),
            onChange: (M) => x.setData("seo", M)
          }
        ) }) })
      ] }),
      n && /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:flex-col cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs(s.CollapsibleCard, { title: "Status", titleClassName: "cms:text-base", storageKey: "cms:entry:status", contentClassName: "cms:flex cms:flex-col cms:gap-3 cms:text-sm", children: [
          /* @__PURE__ */ e.jsxs("dl", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-3", children: [
              /* @__PURE__ */ e.jsx("dt", { className: "cms:text-muted-foreground", children: "Status" }),
              /* @__PURE__ */ e.jsx("dd", { children: /* @__PURE__ */ e.jsx(s.Badge, { variant: n.status === "published" ? "success" : "secondary", children: n.trashed ? "In the trash" : X(n.status) }) })
            ] }),
            n.status !== "draft" && n.publishedAt && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:justify-between cms:gap-3", children: [
              /* @__PURE__ */ e.jsx("dt", { className: "cms:text-muted-foreground", children: n.status === "scheduled" ? "Goes live" : "Published" }),
              /* @__PURE__ */ e.jsx("dd", { className: "cms:text-right cms:tabular-nums", children: G(n.publishedAt) })
            ] })
          ] }),
          !n.trashed && f.publish && !O.readOnly && /* @__PURE__ */ e.jsx(
            fa,
            {
              status: n.status,
              publishedAt: n.publishedAt,
              processing: x.processing,
              onPublish: (M) => ce(M),
              onUnpublish: () => N.router.post(`${g}/unpublish`, L, { preserveScroll: !0 })
            },
            n.publishedAt ?? "none"
          ),
          n.status !== "draft" && n.hasUnpublishedChanges && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The draft has changes the site doesn't show yet." }),
          l.find((M) => M.code === n.locale)?.outdated && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-amber-700 cms:dark:text-amber-400", children: [
            "The ",
            A ? P(A) : "main",
            " version changed since this translation was last saved."
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs(s.CollapsibleCard, { title: "Used by", titleClassName: "cms:text-base", storageKey: "cms:entry:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          v.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "No other content links here." }),
          v.map((M) => /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
            M.url ? /* @__PURE__ */ e.jsx("a", { href: M.url, className: "cms:block cms:truncate cms:underline-offset-4 cms:hover:underline", children: M.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:truncate", children: M.label }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:font-mono cms:text-xs cms:text-muted-foreground", children: M.field })
          ] }, `${M.label}:${M.field}`))
        ] }),
        y && /* @__PURE__ */ e.jsx(ba, { entryUrl: g, collection: t, settings: y, blueprints: b, disabled: !U }),
        h !== null && t.comments && /* @__PURE__ */ e.jsx(ha, { entryId: n.id, comments: h }),
        /* @__PURE__ */ e.jsxs(s.CollapsibleCard, { title: "Revisions", titleClassName: "cms:text-base", storageKey: "cms:entry:revisions", contentClassName: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
          o !== null && f.update && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", size: "sm", onClick: () => N.router.post(_(`cms/entry-translations/${o}/undo-restore`), {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(Te, {}),
            " Undo the restore"
          ] }),
          /* @__PURE__ */ e.jsx(N.Deferred, { data: "revisions", fallback: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(s.Skeleton, { className: "cms:h-8" }),
            /* @__PURE__ */ e.jsx(s.Skeleton, { className: "cms:h-8" })
          ] }), children: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            (d ?? []).length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "Each publish keeps one." }),
            (d ?? []).map((M) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
                /* @__PURE__ */ e.jsx("div", { className: "cms:truncate", children: M.title }),
                /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: G(M.createdAt) })
              ] }),
              f.update && !n.trashed && /* @__PURE__ */ e.jsx(
                s.Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  onClick: () => N.router.post(_(`cms/revisions/${M.id}/restore`), {}, { preserveScroll: !0 }),
                  children: "Restore"
                }
              )
            ] }, M.id))
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(
      ja,
      {
        open: C,
        onClose: () => D(!1),
        processing: x.processing,
        current: n?.publishedAt ?? null,
        onSchedule: (M) => ce(M)
      }
    )
  ] });
}
function ga({ entryUrl: t, editUrl: a, current: l, locales: c, canAdd: r, canRemove: n, onRemove: m }) {
  const d = c.filter((i) => i.status !== null), h = c.filter((i) => i.status === null);
  return /* @__PURE__ */ e.jsxs("nav", { "aria-label": "Languages", className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("div", { className: "cms:inline-flex cms:items-center cms:gap-0.5 cms:rounded-md cms:bg-muted cms:p-0.5", children: d.map((i) => {
      const v = i.code === l, o = `${i.name ?? P(i.code)}${i.main ? " (main)" : ""}: ${i.status ? X(i.status) : ""}${i.outdated ? ", outdated (the main language changed since)" : ""}`;
      return /* @__PURE__ */ e.jsxs(
        "button",
        {
          type: "button",
          title: o,
          "aria-label": o,
          "aria-current": v ? "page" : void 0,
          onClick: () => !v && N.router.get(a, { locale: i.code }),
          className: `cms:relative cms:inline-flex cms:h-7 cms:min-w-10 cms:items-center cms:justify-center cms:gap-1.5 cms:rounded cms:px-2.5 cms:text-xs cms:font-semibold cms:tracking-wide cms:uppercase cms:transition-colors ${v ? "cms:bg-card cms:text-foreground cms:shadow-xs" : "cms:text-muted-foreground cms:hover:text-foreground"}`,
          children: [
            i.code,
            (i.outdated || i.status === "published") && /* @__PURE__ */ e.jsx("span", { "aria-hidden": !0, className: `cms:size-1.5 cms:rounded-full ${i.outdated ? "cms:bg-amber-500" : "cms:bg-emerald-500"}` })
          ]
        },
        i.code
      );
    }) }),
    r && h.map((i) => /* @__PURE__ */ e.jsxs(
      s.Button,
      {
        type: "button",
        variant: "outline",
        size: "sm",
        className: "cms:h-8 cms:border-dashed cms:text-xs cms:uppercase",
        title: `Add ${i.name ?? P(i.code)}`,
        onClick: () => N.router.post(`${t}/translations`, { locale: i.code }),
        children: [
          /* @__PURE__ */ e.jsx(K, {}),
          " ",
          i.code
        ]
      },
      i.code
    )),
    n && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:ml-auto cms:text-destructive", onClick: m, children: "Remove this language" })
  ] });
}
function fa({ status: t, publishedAt: a, processing: l, onPublish: c, onUnpublish: r }) {
  const [n, m] = $.useState(a ? Js(new Date(a)) : ""), d = n === "" ? null : new Date(n), h = d !== null && d.getTime() > Date.now(), i = (u) => u === null ? null : Math.floor(u.getTime() / 6e4), v = i(d) !== i(a ? new Date(a) : null), o = t === "draft" ? h ? "Schedule" : "Publish" : h ? t === "scheduled" ? "Reschedule" : "Schedule" : "Change date";
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:border-t cms:border-border/60 cms:pt-3", children: [
    /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "entry-published-at", children: "Publish date" }),
    /* @__PURE__ */ e.jsx(s.DatePicker, { id: "entry-published-at", withTime: !0, className: "cms:max-w-none", value: n || null, onChange: (u) => m(u ?? "") }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t === "draft" ? "Empty: now. A date in the future schedules it." : "The date shown as published. A date in the future takes it off the site until then." }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: [
      (t === "draft" || v) && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", size: "sm", disabled: l, onClick: () => c(d?.toISOString() ?? null), children: [
        /* @__PURE__ */ e.jsx(ds, {}),
        " ",
        o
      ] }),
      t !== "draft" && /* @__PURE__ */ e.jsx(s.Button, { type: "button", size: "sm", variant: "outline", disabled: l, onClick: r, children: "Unpublish" })
    ] })
  ] });
}
function ja({ open: t, onClose: a, onSchedule: l, current: c, processing: r }) {
  const [n, m] = $.useState("");
  return $.useEffect(() => {
    t && m(Js(c ? new Date(c) : new Date(Date.now() + 864e5)));
  }, [t, c]), /* @__PURE__ */ e.jsx(s.Dialog, { open: t, onOpenChange: (d) => !d && a(), children: /* @__PURE__ */ e.jsxs(s.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(s.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(s.DialogTitle, { children: "Publish on a date" }),
      /* @__PURE__ */ e.jsx(s.DialogDescription, { children: "The entry goes live then; a date in the past publishes it now with that date." })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "published-at", children: "Date and time" }),
      /* @__PURE__ */ e.jsx(s.DatePicker, { id: "published-at", withTime: !0, required: !0, className: "cms:max-w-none", value: n || null, onChange: (d) => m(d ?? "") }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "In your time zone." })
    ] }),
    /* @__PURE__ */ e.jsxs(s.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", onClick: a, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", disabled: n === "" || r, onClick: () => l(new Date(n).toISOString()), children: "Publish" })
    ] })
  ] }) });
}
function ba({ entryUrl: t, collection: a, settings: l, blueprints: c, disabled: r }) {
  const n = c.length > 1 ? l.blueprint ?? c[0].handle : void 0, m = N.useForm({
    parent_id: l.parentId,
    template: l.template ?? "",
    comments_closed: l.commentsClosed === !0,
    ...n !== void 0 ? { blueprint: n } : {}
  }), d = m.errors;
  return /* @__PURE__ */ e.jsx(s.CollapsibleCard, { title: "Page settings", titleClassName: "cms:text-base", storageKey: "cms:entry:page-settings", hasErrors: Object.keys(d).length > 0, children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: r, className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: [
    a.hierarchical && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "parent", children: "Parent" }),
      /* @__PURE__ */ e.jsx(
        je,
        {
          id: "parent",
          multiple: !1,
          max: 1,
          collections: [a.handle],
          invalid: d.parent_id !== void 0,
          value: m.data.parent_id,
          onChange: (h) => m.setData("parent_id", typeof h == "number" ? h : null)
        }
      ),
      /* @__PURE__ */ e.jsx(I, { message: d.parent_id })
    ] }),
    c.length > 1 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "blueprint", children: "Blueprint" }),
      /* @__PURE__ */ e.jsxs(s.Select, { value: m.data.blueprint, onValueChange: (h) => m.setData("blueprint", h), children: [
        /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: "blueprint", "aria-invalid": d.blueprint !== void 0, children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(s.SelectContent, { children: c.map((h) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: h.handle, children: h.title }, h.handle)) })
      ] }),
      m.data.blueprint !== n && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The fields change in every language; values of fields both blueprints have are kept. Save your draft first: the editor reloads." }),
      /* @__PURE__ */ e.jsx(I, { message: d.blueprint })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "template", children: "Template" }),
      /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: "template",
          className: "cms:font-mono",
          placeholder: `cms.${a.handle}-landing`,
          value: m.data.template,
          onChange: (h) => m.setData("template", h.target.value),
          "aria-invalid": d.template !== void 0
        }
      ),
      /* @__PURE__ */ e.jsx(rt, { example: `cms.${a.handle}-landing`, fallbacks: ["the collection's template, if set", `cms.${a.handle}`, "cms.entry"] }),
      /* @__PURE__ */ e.jsx(I, { message: d.template })
    ] }),
    a.comments && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(s.Switch, { id: "comments-open", checked: !m.data.comments_closed, onCheckedChange: (h) => m.setData("comments_closed", !h) }),
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "comments-open", children: "Accept new comments" }),
      /* @__PURE__ */ e.jsx("a", { href: _(`cms/comments?entry=${t.split("/").slice(-1)[0]}`), className: "cms:ml-auto cms:text-muted-foreground cms:underline-offset-4 hover:cms:underline", children: "Comments" })
    ] }),
    m.isDirty && /* @__PURE__ */ e.jsx(
      s.Button,
      {
        type: "button",
        size: "sm",
        disabled: m.processing,
        onClick: () => m.put(`${t}/settings`, { preserveScroll: !0, preserveState: m.data.blueprint === n, onSuccess: () => m.setDefaults() }),
        children: "Save settings"
      }
    )
  ] }) });
}
function Be(t, a) {
  const l = t[a]?.depth ?? 0;
  let c = a + 1;
  for (; c < t.length && t[c].depth > l; ) c++;
  return c;
}
function oe(t, a) {
  const l = a < 0 ? 0 : a + 1, c = a < 0 ? t.length : Be(t, a), r = a < 0 ? 0 : (t[a]?.depth ?? 0) + 1, n = [];
  for (let m = l; m < c; m++)
    t[m].depth === r && n.push(m);
  return n;
}
function it(t, a, l) {
  const c = oe(t, a);
  if (l.length !== c.length || [...l].sort((d, h) => d - h).some((d, h) => d !== c[h]) || c.length === 0) return t.slice();
  const r = c[0], n = Be(t, c[c.length - 1]), m = l.flatMap((d) => t.slice(d, Be(t, d)));
  return [...t.slice(0, r), ...m, ...t.slice(n)];
}
function va(t, a, l) {
  const c = t.find((n) => n.id === a);
  if (!c) return [];
  const r = l(c);
  return t.filter((n) => l(n) === r).map((n) => n.id);
}
function ya({ collection: t, rows: a }) {
  const [l, c] = $.useState(a);
  $.useEffect(() => c(a), [a]);
  const r = (n, m) => {
    const d = n[m];
    if (!d) return;
    const h = d.parentId ?? null, i = va(n, d.id, (v) => v.parentId ?? null);
    c(n), N.router.post(
      _("cms/entries/reorder"),
      { collection: t, ids: i, parent_id: h },
      { preserveScroll: !0, preserveState: !0, onError: () => c(a) }
    );
  };
  return /* @__PURE__ */ e.jsx(s.Card, { className: "cms:p-2", children: /* @__PURE__ */ e.jsx(s.SortableList, { items: l, getId: (n) => n.id, onReorder: (n, m, d) => r(n, d), className: "cms:gap-1", children: (n, { handle: m }) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-lg cms:border cms:border-border/70 cms:bg-card cms:p-2 cms:text-sm", children: [
    /* @__PURE__ */ e.jsx(s.SortableHandle, { ...m, label: `Move ${n.title}` }),
    /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium", children: n.title }),
    n.parent && /* @__PURE__ */ e.jsxs("span", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", children: [
      "under ",
      n.parent
    ] }),
    /* @__PURE__ */ e.jsx(s.Badge, { variant: n.status === "published" ? "success" : "secondary", children: X(n.status) })
  ] }) }) });
}
function Na(t, a, l) {
  const c = { ...t, ...a }, r = Object.fromEntries(Object.entries(c.terms).filter(([, m]) => m !== "")), n = {};
  return c.search && (n.search = c.search), c.status && (n.status = c.status), c.author && (n.author = c.author), Object.keys(r).length > 0 && (n.terms = r), c.locale && c.locale !== l && (n.locale = c.locale), c.sort && (n.sort = c.sort), n.per_page = c.perPage, n;
}
function Sa(t) {
  const a = new URLSearchParams();
  for (const [l, c] of Object.entries(t))
    if (typeof c == "object")
      for (const [r, n] of Object.entries(c)) a.set(`${l}[${r}]`, n);
    else
      a.set(l, String(c));
  return a.toString();
}
function Ca(t, a) {
  return t === a ? `-${a}` : t === `-${a}` ? "" : a;
}
function ka(t, a) {
  return t === a ? "asc" : t === `-${a}` ? "desc" : null;
}
function Ge(t) {
  return [t.search, t.status, t.author, ...Object.values(t.terms)].filter((a) => a !== "").length;
}
const Ce = "__all", wa = [
  { value: "draft", label: "Drafts" },
  { value: "published", label: "Published" },
  { value: "scheduled", label: "Scheduled" },
  { value: "trashed", label: "Trash" }
];
function $a(t) {
  const { collection: a, entries: l, query: c } = t;
  return s.useBreadcrumbs([{ label: a ? a.title : "Entries" }]), !a || !l || !c ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: "Entries" }),
    /* @__PURE__ */ e.jsx(s.PageHeader, { title: "Entries", description: "There are no collections yet. Create one under Structure → Collections, then come back to write its entries." })
  ] }) : /* @__PURE__ */ e.jsx(Da, { ...t, collection: a, entries: l, query: c });
}
function Da({
  collection: t,
  collections: a,
  entries: l,
  query: c,
  columns: r = [],
  filters: n = { authors: [], taxonomies: [], locales: [] },
  links: m = [],
  manualOrder: d = !1,
  perPageOptions: h = [10, 25, 50, 100],
  preferencesKey: i,
  can: v
}) {
  const o = _(`cms/collections/${t.handle}/entries`), u = n.locales[0] ?? c.locale, [y, b] = $.useState(c.search), [f, k] = $.useState([]), [g, S] = $.useState(!1), [T, p] = Q(), { setColumns: C, setPerPage: D } = s.useTablePreferences(i ?? `table.cms.entries.${t.handle}`, { columns: c.columns, perPage: c.perPage });
  $.useEffect(() => k([]), [l]);
  const x = c.status === "trashed", L = Ge(c) > 0, A = r.filter((j) => c.columns.includes(j.key)), B = (j = {}) => Na(c, j, u), w = (j) => N.router.get(o, B(j), { preserveState: !0, preserveScroll: !0, replace: !0 });
  $.useEffect(() => {
    if (y === c.search) return;
    const j = window.setTimeout(() => w({ search: y }), 300);
    return () => window.clearTimeout(j);
  }, [y]);
  const F = x ? v?.delete ? [{ action: "restore", label: "Restore" }, { action: "delete", label: "Delete for good", danger: !0 }] : [] : [
    ...v?.publish ? [{ action: "publish", label: "Publish" }, { action: "unpublish", label: "Unpublish" }] : [],
    ...v?.delete ? [{ action: "trash", label: "Move to the trash", danger: !0 }] : []
  ], H = (j, E, V = !1) => {
    const ue = () => N.router.post(`${o}/bulk`, { action: j, ids: f }, { preserveScroll: !0 });
    V ? T(`${E}: ${f.length} ${f.length === 1 ? "entry" : "entries"}?${j === "delete" ? " This can't be undone." : ""}`, ue) : ue();
  }, te = async (j) => {
    const E = new Set(c.columns);
    E.has(j) ? E.delete(j) : E.add(j), await C(r.map((V) => V.key).filter((V) => E.has(V))), N.router.reload({ only: ["entries", "query"] });
  }, O = () => {
    b(""), w({ search: "", status: "", author: "", terms: {} });
  }, U = d && !!v?.update, me = U && l !== null && l.lastPage <= 1 && l.data.length > 1, ce = 1 + A.length + (F.length > 0 ? 1 : 0) + (U ? 1 : 0), M = Sa(B()), W = [...new Set(m.map((j) => j.group))];
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: t.title }),
    p,
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: t.title,
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          m.length > 0 && /* @__PURE__ */ e.jsxs(s.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(s.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(s.Button, { variant: "outline", children: [
              /* @__PURE__ */ e.jsx(Lt, {}),
              " Go to"
            ] }) }),
            /* @__PURE__ */ e.jsx(s.DropdownMenuContent, { align: "end", className: "cms:min-w-56", children: W.map((j, E) => /* @__PURE__ */ e.jsxs($.Fragment, { children: [
              E > 0 && /* @__PURE__ */ e.jsx(s.DropdownMenuSeparator, {}),
              /* @__PURE__ */ e.jsx(s.DropdownMenuLabel, { children: j }),
              m.filter((V) => V.group === j).map((V) => /* @__PURE__ */ e.jsx(s.DropdownMenuItem, { asChild: !0, children: V.external ? /* @__PURE__ */ e.jsxs("a", { href: V.href, target: "_blank", rel: "noopener noreferrer", children: [
                V.label,
                " ",
                /* @__PURE__ */ e.jsx(le, { className: "cms:ml-auto" })
              ] }) : /* @__PURE__ */ e.jsx(N.Link, { href: V.href, children: V.label }) }, V.href))
            ] }, j)) })
          ] }),
          t.listing && !x && /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs(N.Link, { href: _(`cms/collections/${t.handle}/listing`), children: [
            /* @__PURE__ */ e.jsx(Vt, {}),
            " Listing page"
          ] }) }),
          l.total > 0 && v?.export && /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: `${o}/export${M ? `?${M}` : ""}`, children: [
            /* @__PURE__ */ e.jsx(vs, {}),
            " Export CSV"
          ] }) }),
          v?.create && !x && /* @__PURE__ */ e.jsx(s.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(N.Link, { href: `${o}/create`, children: [
            /* @__PURE__ */ e.jsx(K, {}),
            " New entry"
          ] }) })
        ] }),
        children: a.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: t.handle, onValueChange: (j) => N.router.get(_(`cms/collections/${j}/entries`)), children: [
          /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": "Collection", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(s.SelectContent, { children: a.map((j) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: j.handle, children: j.title }, j.handle)) })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-xs", children: [
        /* @__PURE__ */ e.jsx(de, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            className: "cms:pl-9",
            placeholder: "Search titles, slugs or #id",
            "aria-label": "Search entries",
            value: y,
            onChange: (j) => b(j.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(ke, { label: "Status", value: c.status, options: wa, onChange: (j) => w({ status: j }) }),
      n.authors.length > 0 && /* @__PURE__ */ e.jsx(ke, { label: "Author", value: c.author, options: n.authors, onChange: (j) => w({ author: j }) }),
      n.taxonomies.filter((j) => j.terms.length > 0).map((j) => /* @__PURE__ */ e.jsx(
        ke,
        {
          label: j.title,
          value: c.terms[j.handle] ?? "",
          options: j.terms.map((E) => ({ value: E.value, label: `${"— ".repeat(E.depth)}${E.label}` })),
          onChange: (E) => w({ terms: { ...c.terms, [j.handle]: E } })
        },
        j.handle
      )),
      n.locales.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: c.locale, onValueChange: (j) => w({ locale: j }), children: [
        /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-40", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(s.SelectContent, { children: n.locales.map((j) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: j, children: [
          P(j),
          j === u ? " (main)" : ""
        ] }, j)) })
      ] }),
      L && /* @__PURE__ */ e.jsxs(s.Button, { variant: "ghost", size: "sm", onClick: O, children: [
        /* @__PURE__ */ e.jsx(fe, {}),
        " Clear"
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:ml-auto cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
        f.length > 0 && F.length > 0 && /* @__PURE__ */ e.jsxs("div", { role: "toolbar", "aria-label": "Selected entries", className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsxs("span", { className: "cms:text-sm cms:text-muted-foreground", children: [
            f.length,
            " selected"
          ] }),
          F.map((j) => /* @__PURE__ */ e.jsx(s.Button, { size: "sm", variant: j.danger ? "destructive" : "outline", onClick: () => H(j.action, j.label, j.danger), children: j.label }, j.action))
        ] }),
        me && /* @__PURE__ */ e.jsxs(s.Button, { variant: g ? "secondary" : "outline", "aria-pressed": g, onClick: () => S(!g), children: [
          /* @__PURE__ */ e.jsx(cs, {}),
          " ",
          g ? "Done" : "Reorder"
        ] }),
        r.length > 0 && /* @__PURE__ */ e.jsxs(s.DropdownMenu, { children: [
          /* @__PURE__ */ e.jsx(s.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(s.Button, { variant: "outline", children: [
            /* @__PURE__ */ e.jsx(zt, {}),
            " Columns"
          ] }) }),
          /* @__PURE__ */ e.jsxs(s.DropdownMenuContent, { align: "end", className: "cms:max-h-96 cms:overflow-y-auto", children: [
            /* @__PURE__ */ e.jsx(s.DropdownMenuLabel, { children: "Columns" }),
            r.filter((j) => !j.field).map((j) => /* @__PURE__ */ e.jsx(
              s.DropdownMenuCheckboxItem,
              {
                checked: c.columns.includes(j.key),
                onSelect: (E) => E.preventDefault(),
                onCheckedChange: () => {
                  te(j.key);
                },
                children: j.label
              },
              j.key
            )),
            r.some((j) => j.field) && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(s.DropdownMenuSeparator, {}),
              /* @__PURE__ */ e.jsx(s.DropdownMenuLabel, { children: "Fields" }),
              r.filter((j) => j.field).map((j) => /* @__PURE__ */ e.jsx(
                s.DropdownMenuCheckboxItem,
                {
                  checked: c.columns.includes(j.key),
                  onSelect: (E) => E.preventDefault(),
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
    g && me ? /* @__PURE__ */ e.jsx(ya, { collection: t.handle, rows: l.data }) : /* @__PURE__ */ e.jsxs(s.Card, { className: "cms:gap-0 cms:overflow-hidden cms:py-0", children: [
      /* @__PURE__ */ e.jsxs(s.Table, { children: [
        /* @__PURE__ */ e.jsx(s.TableHeader, { className: "cms:bg-muted/60", children: /* @__PURE__ */ e.jsxs(s.TableRow, { className: "cms:hover:bg-transparent", children: [
          F.length > 0 && /* @__PURE__ */ e.jsx(s.TableHead, { className: "cms:w-10", children: /* @__PURE__ */ e.jsx(
            s.Checkbox,
            {
              "aria-label": "Select all on this page",
              checked: l.data.length > 0 && f.length === l.data.length,
              onCheckedChange: (j) => k(j ? l.data.map((E) => E.id) : [])
            }
          ) }),
          /* @__PURE__ */ e.jsx(Je, { label: "Title", sortKey: "title", sort: c.sort, onSort: (j) => w({ sort: j }) }),
          A.map((j) => j.sortable ? /* @__PURE__ */ e.jsx(Je, { label: j.label, sortKey: j.key, sort: c.sort, onSort: (E) => w({ sort: E }) }, j.key) : /* @__PURE__ */ e.jsx(s.TableHead, { children: j.label }, j.key)),
          U && /* @__PURE__ */ e.jsx(s.TableHead, { className: "cms:w-px", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: "Order" }) })
        ] }) }),
        /* @__PURE__ */ e.jsxs(s.TableBody, { children: [
          l.data.length === 0 && /* @__PURE__ */ e.jsx(s.TableRow, { className: "cms:hover:bg-transparent", children: /* @__PURE__ */ e.jsx(s.TableCell, { colSpan: ce, className: "cms:h-32 cms:text-center cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx(Ta, { trashed: x, filtered: Ge(x ? { ...c, status: "" } : c) > 0, canCreate: !!v?.create, createUrl: `${o}/create`, onClear: O }) }) }),
          l.data.map((j, E) => /* @__PURE__ */ e.jsxs(s.TableRow, { className: "sunrice-row-in", style: { "--i": E }, "data-state": f.includes(j.id) ? "selected" : void 0, children: [
            F.length > 0 && /* @__PURE__ */ e.jsx(s.TableCell, { children: /* @__PURE__ */ e.jsx(
              s.Checkbox,
              {
                "aria-label": `Select ${j.title}`,
                checked: f.includes(j.id),
                onCheckedChange: (V) => k(V ? [...f, j.id] : f.filter((ue) => ue !== j.id))
              }
            ) }),
            /* @__PURE__ */ e.jsxs(s.TableCell, { children: [
              /* @__PURE__ */ e.jsx(
                N.Link,
                {
                  href: _(`cms/collections/${t.handle}/entries/${j.id}/edit${c.locale !== u ? `?locale=${encodeURIComponent(c.locale)}` : ""}`),
                  className: "cms:font-medium cms:underline-offset-4 cms:hover:underline",
                  children: j.title
                }
              ),
              (!c.columns.includes("slug") || j.parent) && /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
                !c.columns.includes("slug") && `/${j.slug}`,
                j.parent ? `${c.columns.includes("slug") ? "" : " · "}under ${j.parent}` : ""
              ] })
            ] }),
            A.map((V) => /* @__PURE__ */ e.jsx(s.TableCell, { className: V.key === "status" ? "" : "cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx("div", { className: "cms:max-w-72 cms:truncate", children: /* @__PURE__ */ e.jsx(_a, { row: j, column: V, mainLocale: u }) }) }, V.key)),
            U && /* @__PURE__ */ e.jsx(s.TableCell, { className: "cms:w-px", children: /* @__PURE__ */ e.jsxs("span", { className: "cms:flex", children: [
              /* @__PURE__ */ e.jsx(s.Button, { variant: "ghost", size: "icon", "aria-label": `Move ${j.title} up`, onClick: () => N.router.post(_(`cms/entries/${j.id}/move`), { direction: "up" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(is, {}) }),
              /* @__PURE__ */ e.jsx(s.Button, { variant: "ghost", size: "icon", "aria-label": `Move ${j.title} down`, onClick: () => N.router.post(_(`cms/entries/${j.id}/move`), { direction: "down" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(ls, {}) })
            ] }) })
          ] }, j.id))
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4 cms:border-t cms:px-6 cms:py-3 cms:text-sm cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-4", children: [
          /* @__PURE__ */ e.jsx("span", { children: l.total === 0 ? "No entries" : `${l.from}–${l.to} of ${l.total}` }),
          /* @__PURE__ */ e.jsxs(s.Select, { value: String(c.perPage), onValueChange: (j) => {
            D(Number(j)), w({ perPage: Number(j) });
          }, children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:h-8 cms:w-auto", "aria-label": "Entries per page", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(s.SelectContent, { children: h.map((j) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: String(j), children: [
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
            s.Button,
            {
              variant: "outline",
              size: "icon",
              className: "cms:size-8",
              "aria-label": "Previous page",
              disabled: !l.prev_page_url,
              onClick: () => l.prev_page_url && N.router.get(l.prev_page_url, {}, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(Le, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            s.Button,
            {
              variant: "outline",
              size: "icon",
              className: "cms:size-8",
              "aria-label": "Next page",
              disabled: !l.next_page_url,
              onClick: () => l.next_page_url && N.router.get(l.next_page_url, {}, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(ge, {})
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function ke({ label: t, value: a, options: l, onChange: c }) {
  return /* @__PURE__ */ e.jsxs(s.Select, { value: a === "" ? Ce : a, onValueChange: (r) => c(r === Ce ? "" : r), children: [
    /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-40", "aria-label": t, children: /* @__PURE__ */ e.jsx(s.SelectValue, { placeholder: t }) }),
    /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
      /* @__PURE__ */ e.jsxs(s.SelectItem, { value: Ce, children: [
        t,
        ": all"
      ] }),
      l.map((r) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: r.value, children: r.label }, r.value))
    ] })
  ] });
}
function Je({ label: t, sortKey: a, sort: l, onSort: c }) {
  const r = ka(l, a);
  return /* @__PURE__ */ e.jsx(s.TableHead, { "aria-sort": r === "asc" ? "ascending" : r === "desc" ? "descending" : void 0, children: /* @__PURE__ */ e.jsxs(
    "button",
    {
      type: "button",
      onClick: () => c(Ca(l, a)),
      className: "cms:-ml-2 cms:inline-flex cms:h-8 cms:items-center cms:gap-1 cms:rounded-md cms:px-2 cms:hover:bg-accent cms:hover:text-accent-foreground",
      children: [
        t,
        r === "asc" ? /* @__PURE__ */ e.jsx(is, { className: "cms:size-3" }) : r === "desc" ? /* @__PURE__ */ e.jsx(ls, { className: "cms:size-3" }) : /* @__PURE__ */ e.jsx(cs, { className: "cms:size-3 cms:opacity-40" })
      ]
    }
  ) });
}
function _a({ row: t, column: a, mainLocale: l }) {
  switch (a.key) {
    case "slug":
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        "/",
        t.slug
      ] });
    case "status":
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(s.Badge, { variant: t.status === "published" ? "success" : "secondary", children: X(t.status) }),
        t.locales.length > 1 && t.locales.filter((c) => !c.main).map((c) => /* @__PURE__ */ e.jsxs(
          s.Badge,
          {
            variant: c.status === "published" ? "secondary" : "outline",
            className: c.status === null ? "cms:opacity-50" : c.outdated ? "cms:ring-2 cms:ring-amber-500/60" : "",
            title: `${P(c.code)}: ${c.status === null ? "not translated" : X(c.status)}${c.outdated ? ", outdated: the main language changed since" : ""}`,
            children: [
              c.code.toUpperCase(),
              c.outdated && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", children: "·!" })
            ]
          },
          c.code
        ))
      ] });
    case "author":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: t.author ?? "—" });
    case "published_at":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: G(t.publishedAt) });
    case "updated_at":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: G(t.updatedAt) });
    case "created_at":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: G(t.createdAt) });
    default:
      return /* @__PURE__ */ e.jsx("span", { title: t.cells[a.key] ?? void 0, children: t.cells[a.key] ?? "—" });
  }
}
function Ta({ trashed: t, filtered: a, canCreate: l, createUrl: c, onClear: r }) {
  return a ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: "Nothing matches these filters." }),
    /* @__PURE__ */ e.jsxs(s.Button, { variant: "outline", size: "sm", onClick: r, children: [
      /* @__PURE__ */ e.jsx(fe, {}),
      " Clear filters"
    ] })
  ] }) : t ? /* @__PURE__ */ e.jsx(e.Fragment, { children: "The trash is empty." }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: "No entries yet." }),
    l && /* @__PURE__ */ e.jsx(s.Button, { size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs(N.Link, { href: c, children: [
      /* @__PURE__ */ e.jsx(K, {}),
      " Write the first one"
    ] }) })
  ] });
}
function Fe({ message: t, processing: a, onSaveMine: l }) {
  const [c, r] = Q();
  return t ? /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: [
    r,
    /* @__PURE__ */ e.jsx("span", { children: t }),
    /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", size: "sm", onClick: () => N.router.reload(), children: "Load theirs" }),
      /* @__PURE__ */ e.jsx(
        s.Button,
        {
          type: "button",
          variant: "destructive",
          size: "sm",
          disabled: a,
          onClick: () => c("Save your version over theirs? Their changes are replaced.", l),
          children: "Save mine anyway"
        }
      )
    ] })
  ] }) : null;
}
function Ma(t) {
  return /* @__PURE__ */ e.jsx(Ba, { ...t }, `${t.locale}:${t.version}:${JSON.stringify([t.values, t.seo])}`);
}
function Ba({ collection: t, fields: a, locale: l, locales: c, shared: r, values: n, seo: m, version: d, can: h }) {
  const i = _(`cms/collections/${t.handle}/listing`), v = _(`cms/collections/${t.handle}/entries`);
  s.useBreadcrumbs([{ label: t.title, href: v }, { label: "Listing page" }]);
  const o = N.useForm({ locale: l, data: n, seo: m ?? {}, version: d }), u = o.errors, y = c[0], b = h.update, f = () => o.processing || o.put(i, { preserveScroll: !0 }), k = () => {
    o.transform((g) => ({ ...g, version: null })), o.put(i, { preserveScroll: !0 });
  };
  return s.useUnsavedChanges(o.isDirty, b ? f : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: (g) => {
    g.preventDefault(), f();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: `${t.title}: listing page` }),
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: `${t.title}: listing page`,
        back: { href: v, label: `Back to ${t.title}` },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          c.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: l, onValueChange: (g) => N.router.get(i, { locale: g }), children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(s.SelectContent, { children: c.map((g, S) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: g, children: [
              P(g),
              S === 0 ? " (main)" : ""
            ] }, g)) })
          ] }),
          t.url && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: t.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(le, {}),
            " View"
          ] }) }),
          b && /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: o.processing, children: [
            o.processing && /* @__PURE__ */ e.jsx(ne, { className: "cms:animate-spin" }),
            " Save"
          ] })
        ] }),
        children: o.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      }
    ),
    /* @__PURE__ */ e.jsxs("fieldset", { disabled: !b, className: "cms:flex cms:flex-col cms:gap-6", children: [
      /* @__PURE__ */ e.jsx(Fe, { message: u.version, processing: o.processing, onSaveMine: k }),
      a.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The listing page has no fields of its own: choose a listing blueprint for the collection under Structure → Collections." }) : /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsx(s.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: a.filter((g) => Ie(g, { ...n, ...o.data.data })).map((g) => r.includes(g.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(ee, { id: `data-${g.handle}`, field: g, content: !0, value: n[g.handle], errors: {}, onChange: () => {
        } }),
        /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
          "Shared by all languages: edit it in ",
          y ? P(y) : "the main language",
          "."
        ] })
      ] }, g.handle) : /* @__PURE__ */ e.jsx(
        ee,
        {
          id: `data-${g.handle}`,
          field: g,
          content: !0,
          value: o.data.data[g.handle],
          errors: q(u, `data.${g.handle}`),
          onChange: (S) => o.setData("data", { ...o.data.data, [g.handle]: S })
        },
        g.handle
      )) }) })
    ] }),
    /* @__PURE__ */ e.jsx(s.CollapsibleCard, { title: "SEO", description: "How the listing page appears in search results and shared links.", titleClassName: "cms:text-base", storageKey: "cms:listing:seo", hasErrors: ae(u, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !b, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(se, { bare: !0, id: "seo", fields: Ee, value: o.data.seo, errors: q(u, "seo"), onChange: (g) => o.setData("seo", g) }) }) })
  ] });
}
function za({ fieldsets: t }) {
  const a = N.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(I, { message: a.fieldset }),
    /* @__PURE__ */ e.jsx(
      ct,
      {
        noun: "Fieldset",
        base: _("cms/fieldsets"),
        rows: t,
        intro: "Fields shared between blueprints, and the kinds of block of flexible fields."
      }
    )
  ] });
}
function La(t) {
  return /* @__PURE__ */ e.jsx(Ia, { ...t }, `${t.locale}:${t.version}:${JSON.stringify(t.values)}`);
}
function Ia({ set: t, fields: a, locale: l, locales: c, shared: r, values: n, version: m, can: d }) {
  const h = _(`cms/globals/${t.handle}`);
  s.useBreadcrumbs([{ label: "Globals", href: _("cms/globals") }, { label: t.title }]);
  const i = N.useForm({ locale: l, data: n, version: m }), v = i.errors, o = c[0], u = s.useEditLock({
    type: "cms.global",
    id: t.id,
    locale: l,
    enabled: d.update,
    noun: "global set",
    leaveTo: _("cms/globals"),
    getUnsaved: () => i.isDirty ? { data: i.data.data } : null
  }), y = d.update && !u.readOnly, b = () => i.processing || i.put(h, { preserveScroll: !0 }), f = () => {
    i.transform((g) => ({ ...g, version: null })), i.put(h, { preserveScroll: !0 });
  }, k = async (g) => {
    const S = await u.loadKept(g);
    S.data && typeof S.data == "object" && i.setData("data", S.data);
  };
  return s.useUnsavedChanges(i.isDirty && !u.takenOver, y ? b : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: (g) => {
    g.preventDefault(), b();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: t.title }),
    u.dialogs,
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: t.title,
        back: { href: _("cms/globals"), label: "Back to globals" },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          c.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: l, onValueChange: (g) => N.router.get(h, { locale: g }), children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(s.SelectContent, { children: c.map((g, S) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: g, children: [
              P(g),
              S === 0 ? " (main)" : ""
            ] }, g)) })
          ] }),
          y && /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: i.processing, children: [
            i.processing && /* @__PURE__ */ e.jsx(ne, { className: "cms:animate-spin" }),
            " Save"
          ] })
        ] }),
        children: i.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      }
    ),
    a.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "This global set has no fields: choose a blueprint for it under Structure → Global sets." }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(s.ViewingNotice, { by: u.viewingBy }),
      /* @__PURE__ */ e.jsx(Fe, { message: v.version, processing: i.processing, onSaveMine: f }),
      /* @__PURE__ */ e.jsx(s.KeptEditsNotice, { kept: u.kept, disabled: !y, onLoad: (g) => {
        k(g);
      }, onDiscard: (g) => {
        u.discardKept(g);
      } }),
      /* @__PURE__ */ e.jsx(
        Ae,
        {
          disabled: !y,
          fields: a,
          values: i.data.data,
          errors: v,
          storageKey: `cms:global:${t.handle}`,
          shared: r,
          sharedValues: n,
          sharedNote: `Shared by all languages: edit it in ${o ? P(o) : "the main language"}.`,
          onChange: (g, S) => i.setData("data", { ...i.data.data, [g]: S })
        }
      )
    ] })
  ] });
}
function Aa({ sets: t }) {
  return s.useBreadcrumbs([{ label: "Globals" }]), /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: "Globals" }),
    /* @__PURE__ */ e.jsx(s.PageHeader, { title: "Globals", description: "Values the whole site uses, like contact details and footer text." }),
    t.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no global sets yet. Create one under Structure → Global sets." }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:sm:grid-cols-2 cms:lg:grid-cols-3", children: t.map((a) => /* @__PURE__ */ e.jsx(N.Link, { href: _(`cms/globals/${a.handle}`), className: "cms:rounded-xl cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none", children: /* @__PURE__ */ e.jsxs(s.Card, { className: "cms:h-full cms:transition-colors cms:hover:bg-accent", children: [
      /* @__PURE__ */ e.jsxs(s.CardHeader, { children: [
        /* @__PURE__ */ e.jsx(s.CardTitle, { className: "cms:text-base", children: a.title }),
        /* @__PURE__ */ e.jsx(s.CardDescription, { children: a.blueprint ? /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: a.handle }) : "No blueprint yet: choose one under Structure → Global sets." })
      ] }),
      /* @__PURE__ */ e.jsx(s.CardContent, {})
    ] }) }, a.handle)) })
  ] });
}
let ot = 0;
function dt(t, a = 0) {
  return t.flatMap(({ children: l, ...c }) => [{ ...c, key: `m${++ot}`, depth: a }, ...dt(l ?? [], a + 1)]);
}
function Ea(t) {
  const a = [], l = [{ depth: -1, children: a }];
  for (const { key: c, depth: r, ...n } of t) {
    for (; l.length > 1 && l[l.length - 1].depth >= r; ) l.pop();
    const m = { ...n, children: [] };
    l[l.length - 1].children.push(m), l.push({ depth: r, children: m.children });
  }
  return a;
}
function He(t, a) {
  const l = t[a]?.depth ?? 0;
  let c = a + 1;
  for (; c < t.length && t[c].depth > l; ) c++;
  return c;
}
function mt(t, a, l) {
  const c = He(t, a);
  return t.map((r, n) => n >= a && n < c ? { ...r, depth: r.depth + l } : r);
}
function Fa(t, a, l) {
  const c = t[a], r = t[a - 1];
  return !c || !r || c.depth > r.depth || Math.max(...t.slice(a, He(t, a)).map((m) => m.depth)) + 1 > l - 1 ? t : mt(t, a, 1);
}
function Ha(t, a) {
  return (t[a]?.depth ?? 0) === 0 ? t : mt(t, a, -1);
}
function Pa(t, a) {
  return [...t.slice(0, a), ...t.slice(He(t, a))];
}
function he(t) {
  return { key: `m${++ot}`, depth: 0, entry_id: null, term_id: null, collection_id: null, target: null, url: null, labels: {}, new_tab: !1, ...t };
}
function Va({ menu: t, items: a, locales: l, limits: c, terms: r, listings: n, can: m }) {
  const d = _(`cms/menus/${t.handle}`);
  s.useBreadcrumbs([{ label: "Menus", href: _("cms/menus") }, { label: t.title }]);
  const [h, i] = $.useState(() => dt(a)), [v, o] = $.useState(null), u = N.useForm({ items: a }), y = u.errors, [b, f] = $.useState(!1), k = l[0] ?? "en", g = (D) => {
    i(D), f(!0);
  }, S = (D, x) => g(h.map((L, A) => A === D ? { ...L, ...x } : L)), T = () => {
    u.processing || (u.transform(() => ({ items: Ea(h).map(ut) })), u.put(d, { preserveScroll: !0, onSuccess: () => f(!1) }));
  }, p = (D) => {
    D.preventDefault(), T();
  };
  s.useUnsavedChanges(b, m.update ? T : void 0);
  const C = (D) => /* @__PURE__ */ e.jsx(
    s.SortableList,
    {
      items: oe(h, D),
      getId: (x) => h[x].key,
      disabled: !m.update,
      onReorder: (x) => g(it(h, D, x)),
      className: D < 0 ? "cms:gap-1" : "cms:mt-1 cms:gap-1 cms:pl-6",
      children: (x, { handle: L, isOverlay: A }) => {
        const B = h[x];
        return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${A ? "" : "cms:border-border/70"}`, children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2 cms:p-2", children: [
            m.update && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:h-10 cms:shrink-0 cms:items-center", children: /* @__PURE__ */ e.jsx(s.SortableHandle, { ...L, label: `Move ${B.labels[k] || B.target?.title || B.url || "link"}` }) }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
                /* @__PURE__ */ e.jsx(
                  s.Input,
                  {
                    "aria-label": `Label (${P(k)})`,
                    className: "cms:w-full cms:sm:max-w-xs",
                    disabled: !m.update,
                    placeholder: B.target?.title ?? "Label",
                    value: B.labels[k] ?? "",
                    onChange: (w) => S(x, { labels: { ...B.labels, [k]: w.target.value } })
                  }
                ),
                /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-32 cms:flex-1 cms:truncate cms:text-sm cms:text-muted-foreground", children: B.url !== null ? B.url : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  B.target ? `${B.target.kind}: ${B.target.title}` : "Gone",
                  " ",
                  (!B.target || !B.target.live) && /* @__PURE__ */ e.jsx(s.Badge, { variant: "outline", children: "Not on the site" })
                ] }) }),
                m.update && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center", children: [
                  /* @__PURE__ */ e.jsxs("label", { className: "cms:mr-2 cms:flex cms:items-center cms:gap-1.5 cms:text-sm", children: [
                    /* @__PURE__ */ e.jsx(s.Checkbox, { checked: B.new_tab, onCheckedChange: (w) => S(x, { new_tab: w }) }),
                    " New tab"
                  ] }),
                  /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Out a level", disabled: B.depth === 0, onClick: () => g(Ha(h, x)), children: /* @__PURE__ */ e.jsx(Ot, {}) }),
                  /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "In a level", onClick: () => g(Fa(h, x, c.depth)), children: /* @__PURE__ */ e.jsx(Ut, {}) }),
                  /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": "Remove, with what's under it", onClick: () => g(Pa(h, x)), children: /* @__PURE__ */ e.jsx(R, {}) })
                ] })
              ] }),
              l.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: l.slice(1).map((w) => /* @__PURE__ */ e.jsx(
                s.Input,
                {
                  "aria-label": `Label (${P(w)})`,
                  className: "cms:w-full cms:sm:max-w-xs",
                  disabled: !m.update,
                  placeholder: `${P(w)}: as ${P(k)}`,
                  value: B.labels[w] ?? "",
                  onChange: (F) => S(x, { labels: { ...B.labels, [w]: F.target.value } })
                },
                w
              )) })
            ] })
          ] }),
          !A && oe(h, x).length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:px-2 cms:pb-2", children: C(x) })
        ] });
      }
    }
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: p, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: t.title }),
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: t.title,
        back: { href: _("cms/menus"), label: "Back to menus" },
        actions: m.update && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", disabled: h.length >= c.items, onClick: () => o("entry"), children: [
            /* @__PURE__ */ e.jsx(K, {}),
            " Entry"
          ] }),
          r.length > 0 && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", disabled: h.length >= c.items, onClick: () => o("term"), children: [
            /* @__PURE__ */ e.jsx(Gt, {}),
            " Term"
          ] }),
          n.length > 0 && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", disabled: h.length >= c.items, onClick: () => o("listing"), children: [
            /* @__PURE__ */ e.jsx(Kt, {}),
            " Listing"
          ] }),
          /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", disabled: h.length >= c.items, onClick: () => o("url"), children: [
            /* @__PURE__ */ e.jsx(Rt, {}),
            " Link"
          ] }),
          /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: u.processing, children: [
            u.processing && /* @__PURE__ */ e.jsx(ne, { className: "cms:animate-spin" }),
            " Save"
          ] })
        ] }),
        children: b && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      }
    ),
    /* @__PURE__ */ e.jsx(I, { message: y.items }),
    Object.keys(y).some((D) => D.startsWith("items.")) && /* @__PURE__ */ e.jsxs("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: [
      "Some links need fixing: ",
      Object.values(y).filter(Boolean)[0]
    ] }),
    /* @__PURE__ */ e.jsx(s.Card, { className: "cms:p-2", children: h.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:p-4 cms:text-center cms:text-muted-foreground", children: "No links yet. Add an entry or a link." }) : C(-1) }),
    /* @__PURE__ */ e.jsx(Ua, { kind: v, terms: r, listings: n, onClose: () => o(null), onAdd: (D) => {
      g([...h, D]), o(null);
    }, main: k })
  ] });
}
function ut({ target: t, children: a, ...l }) {
  return { ...l, children: a.map(ut) };
}
const Ra = { entry: "Link to an entry", term: "Link to a term's page", listing: "Link to a listing page", url: "Link to an address" }, Oa = {
  entry: "It follows the entry: its title (unless you give a label) and its address in each language. It shows only while the entry is on the site.",
  term: "The page listing the term's entries, in each language. Its title is the label unless you give one.",
  listing: "The collection's listing page, in each language. The collection's title is the label unless you give one.",
  url: "A web address, a path on this site (/contact), mailto: or tel:."
};
function Ua({ kind: t, terms: a, listings: l, onClose: c, onAdd: r, main: n }) {
  const [m, d] = $.useState(null), [h, i] = $.useState(""), [v, o] = $.useState(""), [u, y] = $.useState("");
  $.useEffect(() => {
    d(null), i(""), o(""), y("");
  }, [t]);
  const b = v.trim() === "" || ft(v.trim()), f = u.trim() ? { [n]: u.trim() } : {}, k = async () => {
    if (t === "entry" && m !== null) {
      const S = await fetch(`${_("cms/entry-picker")}?${ze({ ids: [m], collections: [] })}`, { headers: { Accept: "application/json" }, credentials: "same-origin" }), T = S.ok ? (await S.json()).items[0] : void 0;
      r(he({ entry_id: m, target: T ? { title: T.title, kind: T.collection, live: T.status === "published" } : null, labels: f }));
    } else if (t === "term" && h !== "") {
      const S = a.find((T) => String(T.id) === h);
      r(he({ term_id: Number(h), target: S ? { title: S.title, kind: S.taxonomy, live: !0 } : null, labels: f }));
    } else if (t === "listing" && h !== "") {
      const S = l.find((T) => String(T.id) === h);
      r(he({ collection_id: Number(h), target: S ? { title: S.title, kind: "Listing page", live: !0 } : null, labels: f }));
    } else t === "url" && v.trim() !== "" && b && u.trim() !== "" && r(he({ url: v.trim(), labels: f }));
  }, g = t === "entry" ? m !== null : t === "url" ? v.trim() !== "" && b && u.trim() !== "" : h !== "";
  return /* @__PURE__ */ e.jsx(s.Dialog, { open: t !== null, onOpenChange: (S) => !S && c(), children: /* @__PURE__ */ e.jsxs(s.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(s.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(s.DialogTitle, { children: t ? Ra[t] : "" }),
      /* @__PURE__ */ e.jsx(s.DialogDescription, { children: t ? Oa[t] : "" })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
      t === "entry" && /* @__PURE__ */ e.jsx(
        je,
        {
          id: "menu-entry",
          value: m,
          multiple: !1,
          max: null,
          collections: [],
          invalid: !1,
          onChange: (S) => d(typeof S == "number" ? S : null)
        }
      ),
      (t === "term" || t === "listing") && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "menu-target", children: t === "term" ? "Term" : "Collection" }),
        /* @__PURE__ */ e.jsxs(s.Select, { value: h, onValueChange: i, children: [
          /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: "menu-target", children: /* @__PURE__ */ e.jsx(s.SelectValue, { placeholder: "Choose…" }) }),
          /* @__PURE__ */ e.jsx(s.SelectContent, { children: t === "term" ? a.map((S) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: String(S.id), children: [
            S.taxonomy,
            ": ",
            S.title
          ] }, S.id)) : l.map((S) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: String(S.id), children: S.title }, S.id)) })
        ] })
      ] }),
      t === "url" && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "menu-url", children: "Address" }),
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            id: "menu-url",
            value: v,
            placeholder: "https://… or /contact",
            "aria-invalid": !b,
            onChange: (S) => o(S.target.value)
          }
        ),
        !b && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "This address could run code; use https://, a path, mailto: or tel:." })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(s.Label, { htmlFor: "menu-label", children: [
          "Label",
          t === "url" ? "" : " (optional)"
        ] }),
        /* @__PURE__ */ e.jsx(s.Input, { id: "menu-label", value: u, onChange: (S) => y(S.target.value) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(s.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", onClick: c, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", onClick: () => {
        k();
      }, disabled: !g, children: "Add" })
    ] })
  ] }) });
}
function Ka({ menus: t }) {
  return s.useBreadcrumbs([{ label: "Menus" }]), /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: "Menus" }),
    /* @__PURE__ */ e.jsx(s.PageHeader, { title: "Menus", description: "Navigation for the site: the main menu, the footer…" }),
    t.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no menus yet. Create one under Structure → Menu settings." }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:sm:grid-cols-2 cms:lg:grid-cols-3", children: t.map((a) => /* @__PURE__ */ e.jsx(N.Link, { href: _(`cms/menus/${a.handle}`), className: "cms:rounded-xl cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none", children: /* @__PURE__ */ e.jsxs(s.Card, { className: "cms:h-full cms:transition-colors cms:hover:bg-accent", children: [
      /* @__PURE__ */ e.jsxs(s.CardHeader, { children: [
        /* @__PURE__ */ e.jsx(s.CardTitle, { className: "cms:text-base", children: a.title }),
        /* @__PURE__ */ e.jsx(s.CardDescription, { children: /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: a.handle }) })
      ] }),
      /* @__PURE__ */ e.jsx(s.CardContent, {})
    ] }) }, a.handle)) })
  ] });
}
const Wa = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "spam", label: "Spam" },
  { value: "trash", label: "Trash" }
], qa = { pending: "Pending", approved: "Approved", spam: "Spam" };
function Ga({ tab: t, counts: a, filters: l, collections: c, comments: r, can: n, errors: m = {} }) {
  s.useBreadcrumbs([{ label: "Comments", href: _("cms/comments") }]);
  const [d, h] = $.useState(l.search), [i, v] = $.useState([]), [o, u] = $.useState(null), [y, b] = Q(), f = (p) => {
    const C = { status: t, search: l.search, collection: l.collection, ...p };
    N.router.get(_("cms/comments"), {
      ...C.status !== "all" ? { status: C.status } : {},
      ...C.search ? { search: C.search } : {},
      ...C.collection ? { collection: C.collection } : {},
      ...l.entry ? { entry: l.entry } : {}
    }, { preserveState: !0, replace: !0, onSuccess: () => v([]) });
  };
  $.useEffect(() => {
    if (d === l.search) return;
    const p = window.setTimeout(() => f({ search: d }), 300);
    return () => window.clearTimeout(p);
  }, [d]);
  const k = (p, C = {}) => N.router.post(_(p), C, { preserveScroll: !0, onSuccess: () => v([]) }), g = (p, C) => k(`cms/comments/${p.id}/status`, { status: C }), S = (p) => {
    const C = () => k("cms/comments/bulk", { action: p, ids: i });
    p === "delete" ? y(`Delete ${i.length} comments for good? This can't be undone.`, C) : C();
  }, T = r.data.length > 0 && i.length === r.data.length;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: "Comments" }),
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: "Comments",
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:sm:w-64", children: [
            /* @__PURE__ */ e.jsx(de, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
            /* @__PURE__ */ e.jsx(
              s.Input,
              {
                type: "search",
                placeholder: "Search text, name or email",
                "aria-label": "Search comments",
                className: "cms:pl-9",
                value: d,
                onChange: (p) => h(p.target.value)
              }
            )
          ] }),
          c.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: l.collection ?? "all", onValueChange: (p) => f({ collection: p === "all" ? null : p }), children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": "Collection", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(s.SelectItem, { value: "all", children: "Every collection" }),
              c.map((p) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: p.handle, children: p.title }, p.handle))
            ] })
          ] })
        ] })
      }
    ),
    l.entry !== null && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      "Comments on one entry. ",
      /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:underline cms:underline-offset-4", onClick: () => N.router.get(_("cms/comments")), children: "Show all" })
    ] }),
    /* @__PURE__ */ e.jsx(s.Tabs, { value: t, onValueChange: (p) => f({ status: p }), children: /* @__PURE__ */ e.jsx(s.TabsList, { className: "cms:h-auto cms:flex-wrap cms:justify-start", children: Wa.map((p) => /* @__PURE__ */ e.jsxs(s.TabsTrigger, { value: p.value, children: [
      p.label,
      " ",
      /* @__PURE__ */ e.jsx("span", { className: "cms:ml-1 cms:text-muted-foreground", children: a[p.value] })
    ] }, p.value)) }) }),
    i.length > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2 cms:text-sm", role: "toolbar", "aria-label": "With the selected comments", children: [
      /* @__PURE__ */ e.jsxs("span", { className: "cms:text-muted-foreground", children: [
        i.length,
        " selected"
      ] }),
      n.moderate && t !== "trash" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "outline", onClick: () => S("approve"), children: [
          /* @__PURE__ */ e.jsx(xe, {}),
          " Approve"
        ] }),
        /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "outline", onClick: () => S("unapprove"), children: [
          /* @__PURE__ */ e.jsx(Te, {}),
          " Unapprove"
        ] }),
        /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "outline", onClick: () => S("spam"), children: [
          /* @__PURE__ */ e.jsx(_e, {}),
          " Spam"
        ] })
      ] }),
      n.delete && t !== "trash" && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "outline", onClick: () => S("trash"), children: [
        /* @__PURE__ */ e.jsx(R, {}),
        " Trash"
      ] }),
      n.delete && t === "trash" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "outline", onClick: () => S("restore"), children: [
          /* @__PURE__ */ e.jsx(pe, {}),
          " Restore"
        ] }),
        /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "destructive", onClick: () => S("delete"), children: [
          /* @__PURE__ */ e.jsx(R, {}),
          " Delete for good"
        ] })
      ] })
    ] }),
    r.data.length === 0 ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:rounded-xl cms:border cms:border-dashed cms:px-6 cms:py-16 cms:text-center", children: [
      /* @__PURE__ */ e.jsx("span", { className: "cms:grid cms:size-10 cms:place-items-center cms:rounded-full cms:bg-muted cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx(Wt, { className: "cms:size-4" }) }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: l.search ? "No comments match." : "No comments here." })
    ] }) : /* @__PURE__ */ e.jsxs(s.Card, { className: "cms:divide-y cms:p-0", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3 cms:px-4 cms:py-2 cms:text-sm cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsx(s.Checkbox, { checked: T, "aria-label": "Select all", onCheckedChange: (p) => v(p ? r.data.map((C) => C.id) : []) }),
        /* @__PURE__ */ e.jsxs("span", { children: [
          r.from,
          "–",
          r.to,
          " of ",
          r.total
        ] })
      ] }),
      r.data.map((p) => /* @__PURE__ */ e.jsxs("article", { className: "cms:flex cms:gap-3 cms:px-4 cms:py-4", "aria-labelledby": `comment-${p.id}-author`, children: [
        /* @__PURE__ */ e.jsx(
          s.Checkbox,
          {
            checked: i.includes(p.id),
            "aria-label": `Select ${p.author}'s comment`,
            onCheckedChange: (C) => v(C ? [...i, p.id] : i.filter((D) => D !== p.id))
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-x-3 cms:gap-y-1 cms:text-sm", children: [
            /* @__PURE__ */ e.jsx("span", { id: `comment-${p.id}-author`, className: "cms:font-medium", children: p.author }),
            p.email && /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", children: p.email }),
            p.member && /* @__PURE__ */ e.jsx(s.Badge, { variant: "outline", children: "Signed in" }),
            !p.trashed && /* @__PURE__ */ e.jsx(s.Badge, { variant: p.status === "approved" ? "success" : p.status === "spam" ? "destructive" : "warning", children: qa[p.status] }),
            /* @__PURE__ */ e.jsxs("span", { className: "cms:text-muted-foreground", children: [
              p.createdAt ? G(p.createdAt) : "",
              " · ",
              p.locale.toUpperCase()
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
            "On ",
            p.entry.url ? /* @__PURE__ */ e.jsxs("a", { href: p.entry.url, target: "_blank", rel: "noreferrer", className: "cms:underline-offset-4 hover:cms:underline", children: [
              p.entry.title,
              " ",
              /* @__PURE__ */ e.jsx(le, { className: "cms:inline cms:size-3" })
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
            n.moderate && !p.trashed && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              p.status !== "approved" && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => g(p, "approved"), children: [
                /* @__PURE__ */ e.jsx(xe, {}),
                " Approve"
              ] }),
              p.status === "approved" && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => g(p, "pending"), children: [
                /* @__PURE__ */ e.jsx(Te, {}),
                " Unapprove"
              ] }),
              p.status !== "spam" && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => g(p, "spam"), children: [
                /* @__PURE__ */ e.jsx(_e, {}),
                " Spam"
              ] }),
              p.status !== "spam" && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => u({ row: p, mode: "reply" }), children: [
                /* @__PURE__ */ e.jsx(As, {}),
                " Reply"
              ] }),
              /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => u({ row: p, mode: "edit" }), children: [
                /* @__PURE__ */ e.jsx(Hs, {}),
                " Edit"
              ] })
            ] }),
            n.delete && !p.trashed && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => N.router.delete(_(`cms/comments/${p.id}`), { preserveScroll: !0 }), children: [
              /* @__PURE__ */ e.jsx(R, {}),
              " Trash"
            ] }),
            n.delete && p.trashed && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => k(`cms/comments/${p.id}/restore`), children: [
                /* @__PURE__ */ e.jsx(pe, {}),
                " Restore"
              ] }),
              /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => y(
                "Delete this comment for good? Replies to it stay.",
                () => N.router.delete(_(`cms/comments/${p.id}/force`), { preserveScroll: !0 })
              ), children: [
                /* @__PURE__ */ e.jsx(R, {}),
                " Delete for good"
              ] })
            ] })
          ] })
        ] })
      ] }, p.id))
    ] }),
    (r.prev_page_url || r.next_page_url) && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:justify-end cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(s.Button, { variant: "outline", size: "sm", disabled: !r.prev_page_url, onClick: () => r.prev_page_url && N.router.get(r.prev_page_url), children: [
        /* @__PURE__ */ e.jsx(Le, {}),
        " Newer"
      ] }),
      /* @__PURE__ */ e.jsxs(s.Button, { variant: "outline", size: "sm", disabled: !r.next_page_url, onClick: () => r.next_page_url && N.router.get(r.next_page_url), children: [
        "Older ",
        /* @__PURE__ */ e.jsx(ge, {})
      ] })
    ] }),
    o && /* @__PURE__ */ e.jsx(Ja, { row: o.row, mode: o.mode, error: m.body, onClose: () => u(null) }, `${o.mode}-${o.row.id}`),
    b
  ] });
}
function Ja({ row: t, mode: a, error: l, onClose: c }) {
  const [r, n] = $.useState(a === "edit" ? t.body : ""), [m, d] = $.useState(!1), h = () => {
    d(!0);
    const i = { preserveScroll: !0, onSuccess: c, onFinish: () => d(!1) };
    a === "reply" ? N.router.post(_(`cms/comments/${t.id}/reply`), { body: r }, i) : N.router.put(_(`cms/comments/${t.id}`), { body: r }, i);
  };
  return /* @__PURE__ */ e.jsx(s.Dialog, { open: !0, onOpenChange: (i) => !i && c(), children: /* @__PURE__ */ e.jsxs(s.DialogContent, { children: [
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
        value: r,
        "aria-invalid": l !== void 0,
        onChange: (i) => n(i.target.value)
      }
    ),
    /* @__PURE__ */ e.jsx(I, { message: l }),
    /* @__PURE__ */ e.jsxs(s.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", onClick: c, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", disabled: r.trim() === "" || m, onClick: h, children: a === "reply" ? "Post reply" : "Save" })
    ] })
  ] }) });
}
const Ya = [
  { role: "title", label: "Meta title", automatic: "the title" },
  { role: "description", label: "Meta description", automatic: "nothing" },
  { role: "image", label: "Share image", automatic: "nothing" }
], we = "__auto";
function Qa({ site: t, siteName: a, collections: l, taxonomies: c }) {
  s.useBreadcrumbs([{ label: "Settings", href: _("settings") }, { label: "SEO" }]);
  const r = [...l ?? [], ...c ?? []], n = N.useForm({
    site: { ...t },
    mappings: r.map((o) => ({ kind: o.kind, id: o.id, title: o.chosen.title ?? "", description: o.chosen.description ?? "", image: o.chosen.image ?? "" }))
  }), m = n.errors, d = () => n.put(_("cms/seo"), { preserveScroll: !0, onSuccess: () => n.setDefaults() });
  s.useUnsavedChanges(n.isDirty, d);
  const h = (o, u) => n.setData("site", { ...n.data.site, [o]: u }), i = (o, u, y) => n.setData("mappings", n.data.mappings.map((b, f) => f === o ? { ...b, [u]: y } : b)), v = (o, u, y, b) => /* @__PURE__ */ e.jsxs(s.CollapsibleCard, { title: o, description: u, titleClassName: "cms:text-base", storageKey: `cms:seo:${o}`, contentClassName: "cms:flex cms:flex-col cms:divide-y cms:divide-border/60", children: [
    y.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "None yet." }),
    y.map((f, k) => {
      const g = b + k;
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3 cms:py-4 cms:first:pt-0 cms:last:pb-0", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:justify-between cms:gap-3", children: [
          /* @__PURE__ */ e.jsx("h3", { className: "cms:font-medium", children: f.title }),
          /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: f.blueprint ? `Blueprint: ${f.blueprint}` : "No blueprint" })
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-3 cms:sm:grid-cols-3", children: Ya.map(({ role: S, label: T, automatic: p }) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-1.5", children: [
          /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `seo-${g}-${S}`, className: "cms:text-xs", children: T }),
          /* @__PURE__ */ e.jsxs(s.Select, { value: n.data.mappings[g]?.[S] || we, onValueChange: (C) => i(g, S, C === we ? "" : C), children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: `seo-${g}-${S}`, className: "cms:w-full", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
              /* @__PURE__ */ e.jsxs(s.SelectItem, { value: we, children: [
                "Automatic (",
                p,
                ")"
              ] }),
              f.options[S].map((C) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: C.value, children: C.label }, C.value))
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(I, { message: m[`mappings.${g}.${S}`] })
        ] }, S)) })
      ] }, `${f.kind}-${f.id}`);
    })
  ] });
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (o) => {
    o.preventDefault(), d();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: "SEO" }),
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: "SEO",
        description: "What search engines and shared links see of the site.",
        actions: /* @__PURE__ */ e.jsx(s.Button, { type: "submit", disabled: n.processing, children: "Save SEO settings" })
      }
    ),
    /* @__PURE__ */ e.jsxs(s.CollapsibleCard, { title: "Search engines and sharing", titleClassName: "cms:text-base", storageKey: "cms:seo:site", contentClassName: "cms:flex cms:flex-col cms:gap-5", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(s.Switch, { id: "seo-noindex", checked: n.data.site.noindex, onCheckedChange: (o) => h("noindex", o) }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-0.5", children: [
          /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "seo-noindex", children: "Hide the whole site from search engines" }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: "Every page asks not to be indexed and the sitemap is empty. For a site still being built, or staging." })
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-start cms:justify-between cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-3", children: [
          /* @__PURE__ */ e.jsx(s.Switch, { id: "seo-append", checked: n.data.site.appendName, onCheckedChange: (o) => h("appendName", o) }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-0.5", children: [
            /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "seo-append", children: "Add the site name to page titles" }),
            /* @__PURE__ */ e.jsxs("p", { className: "cms:text-xs cms:text-muted-foreground", children: [
              'The browser tab and search results show "About ',
              n.data.site.separator || "|",
              " ",
              a,
              '". Share previews keep the bare title.'
            ] })
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
          /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "seo-separator", className: "cms:text-xs", children: "Separator" }),
          /* @__PURE__ */ e.jsx(
            s.Input,
            {
              id: "seo-separator",
              className: "cms:w-20",
              maxLength: 5,
              disabled: !n.data.site.appendName,
              value: n.data.site.separator,
              onChange: (o) => h("separator", o.target.value)
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:max-w-xs cms:flex-col cms:gap-1.5", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "seo-twitter", children: "X (Twitter) account" }),
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            id: "seo-twitter",
            placeholder: "@acme",
            maxLength: 16,
            value: n.data.site.twitter,
            onChange: (o) => h("twitter", o.target.value)
          }
        ),
        /* @__PURE__ */ e.jsx(I, { message: m["site.twitter"] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "seo-image", children: "Default share image" }),
        /* @__PURE__ */ e.jsx(
          s.MediaPickerInput,
          {
            id: "seo-image",
            invalid: m["site.image"] !== void 0,
            disabled: !1,
            multiple: !1,
            max: null,
            types: ["image"],
            value: n.data.site.image,
            onChange: (o) => h("image", typeof o == "number" ? o : null)
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: "Shown when a page is shared and has no image of its own." }),
        /* @__PURE__ */ e.jsx(I, { message: m["site.image"] })
      ] })
    ] }),
    r.length > 0 && /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx("h2", { className: "cms:text-base cms:font-medium", children: "Fields used for SEO" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "When an entry or term leaves its meta title, description or share image empty, the site uses one of its fields instead. A page's own SEO fields always win; after the field come the site's (the description in Settings → Site, the share image above)." })
    ] }),
    l !== null && v("Collections", "Entries of each collection.", l, 0),
    c !== null && v("Taxonomies", "Term pages of each taxonomy.", c, l?.length ?? 0),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: "Meta title: a text field. Meta description: a text or textarea field, cut to 300 characters. Share image: the first image of a media field." })
  ] });
}
const Za = 3;
function Xa({ form: t, forms: a, submissions: l, can: c, createForm: r = null }) {
  s.useBreadcrumbs([{ label: "Submissions", href: _("cms/submissions") }, ...t ? [{ label: t.title }] : []]);
  const [n, m] = $.useState(null), [d, h] = Q();
  if (!t || !l)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(N.Head, { title: "Submissions" }),
      /* @__PURE__ */ e.jsx(s.PageHeader, { title: "Submissions", description: "What visitors send through the site's forms." }),
      /* @__PURE__ */ e.jsxs(s.Card, { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:px-6 cms:py-14 cms:text-center", children: [
        /* @__PURE__ */ e.jsx(Ht, { className: "cms:size-8 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
          /* @__PURE__ */ e.jsx("p", { className: "cms:font-medium", children: "No forms yet" }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:max-w-sm cms:text-sm cms:text-muted-foreground", children: r ? "Create a form, put it on a page, and what visitors send shows up here." : "Once someone creates a form and puts it on a page, what visitors send shows up here." })
        ] }),
        r && /* @__PURE__ */ e.jsx(s.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(N.Link, { href: r, children: [
          /* @__PURE__ */ e.jsx(K, {}),
          " Create a form"
        ] }) })
      ] })
    ] });
  const i = (l.data[0]?.rows ?? []).slice(0, Za), v = (o) => d(
    "Delete this submission for good? It can't be restored.",
    () => N.router.delete(_(`cms/submissions/${o.id}`), { preserveScroll: !0, onSuccess: () => m(null) })
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: `${t.title} submissions` }),
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: t.title,
        actions: l.total > 0 && c.export && /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: _(`cms/forms/${t.handle}/submissions/export`), children: [
          /* @__PURE__ */ e.jsx(vs, {}),
          " Export CSV"
        ] }) }),
        children: a.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: t.handle, onValueChange: (o) => N.router.get(_(`cms/forms/${o}/submissions`)), children: [
          /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-56", "aria-label": "Form", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(s.SelectContent, { children: a.map((o) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: o.handle, children: [
            o.title,
            " (",
            o.count,
            ")"
          ] }, o.handle)) })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(s.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(s.Table, { children: [
      /* @__PURE__ */ e.jsx(s.TableHeader, { children: /* @__PURE__ */ e.jsxs(s.TableRow, { children: [
        /* @__PURE__ */ e.jsx(s.TableHead, { children: "Sent" }),
        i.map((o) => /* @__PURE__ */ e.jsx(s.TableHead, { children: o.label }, o.handle))
      ] }) }),
      /* @__PURE__ */ e.jsxs(s.TableBody, { children: [
        l.data.length === 0 && /* @__PURE__ */ e.jsx(s.TableRow, { children: /* @__PURE__ */ e.jsx(s.TableCell, { colSpan: i.length + 1, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: "Nothing sent yet." }) }),
        l.data.map((o) => /* @__PURE__ */ e.jsxs(s.TableRow, { children: [
          /* @__PURE__ */ e.jsx(s.TableCell, { className: "cms:whitespace-nowrap", children: /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:font-medium cms:hover:underline", onClick: () => m(o), children: G(o.createdAt) }) }),
          i.map((u) => /* @__PURE__ */ e.jsx(s.TableCell, { className: "cms:max-w-64 cms:truncate", children: o.rows.find((y) => y.handle === u.handle)?.value }, u.handle))
        ] }, o.id))
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
            onClick: () => l.prev_page_url && N.router.get(l.prev_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(Le, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          s.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Next page",
            disabled: !l.next_page_url,
            onClick: () => l.next_page_url && N.router.get(l.next_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(ge, {})
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(s.Dialog, { open: n !== null, onOpenChange: (o) => !o && m(null), children: /* @__PURE__ */ e.jsxs(s.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto", children: [
      /* @__PURE__ */ e.jsxs(s.DialogHeader, { children: [
        /* @__PURE__ */ e.jsx(s.DialogTitle, { children: t.title }),
        /* @__PURE__ */ e.jsxs(s.DialogDescription, { children: [
          "Sent ",
          G(n?.createdAt ?? null),
          " · ",
          n?.locale.toUpperCase()
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-3 cms:text-sm", children: n?.rows.map((o) => /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: o.label }),
        /* @__PURE__ */ e.jsx("dd", { className: "cms:whitespace-pre-wrap cms:break-words cms:text-muted-foreground", children: o.file ? /* @__PURE__ */ e.jsx("a", { href: o.file, className: "cms:underline cms:underline-offset-4 hover:cms:text-foreground", download: !0, children: o.value }) : o.value || "—" })
      ] }, o.handle)) }),
      n && (n.visitor.ip || n.visitor.userAgent || n.visitor.referrer) && /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-3 cms:border-t cms:pt-3 cms:text-sm", children: [["IP address", n.visitor.ip], ["Browser", n.visitor.userAgent], ["Sent from", n.visitor.referrer]].map(([o, u]) => u && /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: o }),
        /* @__PURE__ */ e.jsx("dd", { className: "cms:break-all cms:text-muted-foreground", children: u })
      ] }, o)) }),
      c.delete && n && /* @__PURE__ */ e.jsx(s.DialogFooter, { children: /* @__PURE__ */ e.jsxs(s.Button, { variant: "destructive", onClick: () => v(n), children: [
        /* @__PURE__ */ e.jsx(R, {}),
        " Delete"
      ] }) })
    ] }) }),
    h
  ] });
}
function el(t) {
  return /* @__PURE__ */ e.jsx(sl, { ...t }, `${t.locale}:${t.version}:${JSON.stringify([t.values, t.seo, t.term.template])}`);
}
function sl({ taxonomy: t, term: a, translated: l, fields: c, locale: r, locales: n, shared: m, sharedValues: d, values: h, seo: i, version: v, usedBy: o = [] }) {
  const u = _(`cms/taxonomies/${t.handle}/terms`), y = _(`cms/terms/${a.id}/content`);
  s.useBreadcrumbs([{ label: t.title, href: `${u}?locale=${r}` }, { label: a.title }]);
  const b = N.useForm({ locale: r, data: h, seo: i ?? {}, template: a.template ?? "", version: v }), f = b.errors, k = () => b.processing || b.put(y, { preserveScroll: !0 }), g = () => {
    b.transform((C) => ({ ...C, version: null })), b.put(y, { preserveScroll: !0 });
  }, S = s.useEditLock({
    type: "cms.term",
    id: a.id,
    locale: r,
    enabled: l,
    noun: "term",
    leaveTo: `${u}?locale=${r}`,
    getUnsaved: () => b.isDirty ? { data: b.data.data, seo: b.data.seo, template: b.data.template } : null
  }), T = l && !S.readOnly, p = async (C) => {
    const D = await S.loadKept(C);
    b.setData((x) => ({
      ...x,
      data: D.data && typeof D.data == "object" ? D.data : x.data,
      seo: D.seo && typeof D.seo == "object" ? D.seo : x.seo,
      template: typeof D.template == "string" ? D.template : x.template
    }));
  };
  return s.useUnsavedChanges(b.isDirty && !S.takenOver, T ? k : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: (C) => {
    C.preventDefault(), k();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: a.title }),
    S.dialogs,
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: a.title,
        back: { href: `${u}?locale=${r}`, label: `Back to ${t.title}` },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          a.url && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: a.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(le, {}),
            " View page"
          ] }) }),
          n.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: r, onValueChange: (C) => N.router.get(`${u}/${a.id}/edit`, { locale: C }), children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(s.SelectContent, { children: n.map((C, D) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: C, children: [
              P(C),
              D === 0 ? " (main)" : ""
            ] }, C)) })
          ] }),
          T && /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: b.processing, children: [
            b.processing && /* @__PURE__ */ e.jsx(ne, { className: "cms:animate-spin" }),
            " Save"
          ] })
        ] }),
        children: b.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      }
    ),
    l ? /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:items-start cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_20rem]", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(s.ViewingNotice, { by: S.viewingBy }),
        /* @__PURE__ */ e.jsx(s.KeptEditsNotice, { kept: S.kept, disabled: !T, onLoad: (C) => {
          p(C);
        }, onDiscard: (C) => {
          S.discardKept(C);
        } }),
        /* @__PURE__ */ e.jsx(Fe, { message: f.version, processing: b.processing, onSaveMine: g }),
        /* @__PURE__ */ e.jsx(
          Ae,
          {
            disabled: !T,
            fields: c,
            values: b.data.data,
            errors: f,
            storageKey: `cms:term:${t.handle}`,
            shared: m,
            sharedValues: d,
            sharedNote: `Shared by all languages: edit it in ${P(n[0] ?? "en")}.`,
            onChange: (C, D) => b.setData("data", { ...b.data.data, [C]: D })
          }
        ),
        /* @__PURE__ */ e.jsx(s.CollapsibleCard, { title: "SEO", description: "How this term's page appears in search results and shared links.", titleClassName: "cms:text-base", storageKey: "cms:term:seo", hasErrors: ae(f, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !T, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(se, { bare: !0, id: "seo", fields: Ee, value: b.data.seo, errors: q(f, "seo"), onChange: (C) => b.setData("seo", C) }) }) })
      ] }),
      /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(
          s.CollapsibleCard,
          {
            title: "Template",
            titleClassName: "cms:text-base",
            storageKey: "cms:term:page-settings",
            hasErrors: f.template !== void 0,
            contentClassName: "cms:flex cms:flex-col cms:gap-2",
            children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: !T, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: [
              /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "template", className: "cms:sr-only", children: "Template" }),
              /* @__PURE__ */ e.jsx(
                s.Input,
                {
                  id: "template",
                  className: "cms:font-mono",
                  placeholder: `cms.${t.handle}-special`,
                  value: b.data.template,
                  onChange: (C) => b.setData("template", C.target.value),
                  "aria-invalid": f.template !== void 0
                }
              ),
              /* @__PURE__ */ e.jsx(rt, { example: `cms.${t.handle}-special`, fallbacks: ["the taxonomy's template, if set", `cms.taxonomy-${t.handle}`, "cms.term"] }),
              /* @__PURE__ */ e.jsx(I, { message: f.template })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsxs(s.CollapsibleCard, { title: "Used by", titleClassName: "cms:text-base", storageKey: "cms:term:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          o.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "No content links here through its fields." }),
          o.map((C) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:gap-2", children: [
            C.url ? /* @__PURE__ */ e.jsx("a", { href: C.url, className: "cms:truncate cms:underline-offset-4 cms:hover:underline", children: C.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:truncate", children: C.label }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:font-mono cms:text-xs cms:text-muted-foreground", children: C.field })
          ] }, `${C.label}:${C.field}`))
        ] })
      ] })
    ] }) : /* @__PURE__ */ e.jsxs("p", { className: "cms:text-muted-foreground", children: [
      "This term has no title in ",
      P(r),
      " yet: give it one in the list first."
    ] })
  ] });
}
const $e = "__top";
function Ye(t = []) {
  return t.length === 0 ? "" : ` It's used by ${t.slice(0, 5).join("; ")}${t.length > 5 ? ` and ${t.length - 5} more` : ""}.`;
}
function tl({ taxonomy: t, taxonomies: a, terms: l, locales: c, locale: r, trashed: n = !1 }) {
  s.useBreadcrumbs([{ label: t ? t.title : "Terms" }]);
  const [m, d] = Q(), [h, i] = $.useState(null), [v, o] = $.useState(""), [u, y] = $.useState(l);
  if ($.useEffect(() => y(l), [l]), !t)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(N.Head, { title: "Terms" }),
      /* @__PURE__ */ e.jsx(s.PageHeader, { title: "Terms", description: "There are no taxonomies yet. Create one under Structure → Taxonomies (categories, tags…), then add its terms here." })
    ] });
  const b = _(`cms/taxonomies/${t.handle}/terms`), f = (x) => _(`cms/taxonomies/${t.handle}/terms/${x.id}/edit`) + `?locale=${encodeURIComponent(r)}`, k = (x, L) => {
    const A = L.map((B) => u[B].id);
    y(it(u, x, L)), N.router.post(
      _("cms/terms/reorder"),
      { taxonomy: t.handle, ids: A, parent_id: x < 0 ? null : u[x].id },
      { preserveScroll: !0, preserveState: !0, onError: () => y(l) }
    );
  }, g = (x) => m(
    `Move "${x.fallback}" to the trash, with the terms under it? It comes off the site; you can restore it.${Ye(x.usedBy)}`,
    () => N.router.delete(_(`cms/terms/${x.id}`), { preserveScroll: !0 })
  ), S = v.trim().toLowerCase(), T = S === "" ? null : u.filter((x) => `${x.title ?? x.fallback} ${x.slug ?? ""}`.toLowerCase().includes(S)), p = t.collections ?? [], C = (x, L, A) => /* @__PURE__ */ e.jsxs("div", { className: `${Qe} cms:border-t cms:border-border/60 cms:px-3 cms:py-2`, children: [
    /* @__PURE__ */ e.jsx("span", { className: "cms:flex cms:justify-center", children: L && !n && /* @__PURE__ */ e.jsx(s.SortableHandle, { ...L, label: `Move ${x.fallback}` }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-2", style: { paddingLeft: A * 20 }, children: [
      A > 0 && /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", "aria-hidden": !0, children: "└" }),
      n ? /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: x.title ?? x.fallback }) : /* @__PURE__ */ e.jsx(
        "button",
        {
          type: "button",
          className: "cms:truncate cms:text-left cms:font-medium cms:underline-offset-4 cms:hover:underline",
          onClick: () => t.pages && x.title !== null ? N.router.get(f(x)) : i(x),
          children: x.title ?? /* @__PURE__ */ e.jsxs("span", { className: "cms:font-normal cms:text-muted-foreground cms:italic", children: [
            x.fallback,
            " · not translated"
          ] })
        }
      ),
      x.url && /* @__PURE__ */ e.jsx("a", { href: x.url, target: "_blank", rel: "noopener noreferrer", className: "cms:text-muted-foreground cms:hover:text-foreground", "aria-label": "Visit term page", title: "Visit term page", children: /* @__PURE__ */ e.jsx(le, { className: "cms:size-3.5" }) })
    ] }),
    /* @__PURE__ */ e.jsx("code", { className: "cms:hidden cms:truncate cms:text-xs cms:text-muted-foreground cms:md:block", children: x.slug ?? "—" }),
    /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:text-sm cms:text-muted-foreground cms:tabular-nums cms:md:block", children: x.entries ?? 0 }),
    /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:text-sm cms:text-muted-foreground cms:md:block", children: al(x.createdAt) }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:justify-end", children: n ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-1", children: [
      /* @__PURE__ */ e.jsxs(s.Button, { variant: "outline", size: "sm", onClick: () => N.router.post(_(`cms/terms/${x.id}/restore`), {}, { preserveScroll: !0 }), children: [
        /* @__PURE__ */ e.jsx(pe, {}),
        " Restore"
      ] }),
      /* @__PURE__ */ e.jsxs(
        s.Button,
        {
          variant: "ghost",
          size: "sm",
          className: "cms:text-destructive",
          onClick: () => m(
            `Delete "${x.fallback}" for good, in every language? Entries lose it.${Ye(x.usedBy)}`,
            () => N.router.delete(_(`cms/terms/${x.id}/force`), { preserveScroll: !0, data: (x.usedBy ?? []).length > 0 ? { force: 1 } : {} })
          ),
          children: [
            /* @__PURE__ */ e.jsx(R, {}),
            " Delete for good"
          ]
        }
      )
    ] }) : /* @__PURE__ */ e.jsxs(s.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(s.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(s.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Actions for ${x.fallback}`, children: /* @__PURE__ */ e.jsx(Ss, {}) }) }),
      /* @__PURE__ */ e.jsxs(s.DropdownMenuContent, { align: "end", children: [
        /* @__PURE__ */ e.jsxs(s.DropdownMenuItem, { onSelect: () => i(x), children: [
          /* @__PURE__ */ e.jsx(Hs, {}),
          " Rename"
        ] }),
        t.pages && x.title !== null && /* @__PURE__ */ e.jsx(s.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(N.Link, { href: f(x), children: [
          /* @__PURE__ */ e.jsx(Ft, {}),
          " Edit page"
        ] }) }),
        /* @__PURE__ */ e.jsx(s.DropdownMenuSeparator, {}),
        /* @__PURE__ */ e.jsxs(s.DropdownMenuItem, { className: "cms:text-destructive", onSelect: () => g(x), children: [
          /* @__PURE__ */ e.jsx(R, {}),
          " Move to trash"
        ] })
      ] })
    ] }) })
  ] }), D = (x) => /* @__PURE__ */ e.jsx(s.SortableList, { items: oe(u, x), getId: (L) => u[L].id, disabled: n, onReorder: (L) => k(x, L), className: "cms:gap-0", children: (L, { handle: A, isOverlay: B }) => /* @__PURE__ */ e.jsxs("div", { className: B ? "cms:rounded-md cms:bg-card cms:shadow-md" : "", children: [
    C(u[L], A, u[L].depth),
    !B && !n && oe(u, L).length > 0 && D(L)
  ] }) });
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: t.title }),
    d,
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: n ? `${t.title} — trash` : t.title,
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          c.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: r, onValueChange: (x) => N.router.get(b, { locale: x, ...n ? { trashed: 1 } : {} }), children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-40", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(s.SelectContent, { children: c.map((x) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: x, children: P(x) }, x)) })
          ] }),
          n ? /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", onClick: () => N.router.get(b, { locale: r }), children: "Back to terms" }) : /* @__PURE__ */ e.jsxs(s.Button, { onClick: () => i("new"), children: [
            /* @__PURE__ */ e.jsx(K, {}),
            " New term"
          ] }),
          /* @__PURE__ */ e.jsxs(s.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(s.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", size: "icon", "aria-label": "More", children: /* @__PURE__ */ e.jsx(At, {}) }) }),
            /* @__PURE__ */ e.jsxs(s.DropdownMenuContent, { align: "end", className: "cms:min-w-56", children: [
              p.length > 0 && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(s.DropdownMenuLabel, { children: "Used by collections" }),
                p.map((x) => /* @__PURE__ */ e.jsx(s.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsx(N.Link, { href: x.url, children: x.title }) }, x.url)),
                /* @__PURE__ */ e.jsx(s.DropdownMenuSeparator, {})
              ] }),
              t.settings && /* @__PURE__ */ e.jsx(s.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(N.Link, { href: t.settings, children: [
                /* @__PURE__ */ e.jsx(qt, {}),
                " Taxonomy settings"
              ] }) }),
              !n && /* @__PURE__ */ e.jsxs(s.DropdownMenuItem, { onSelect: () => N.router.get(b, { locale: r, trashed: 1 }), children: [
                /* @__PURE__ */ e.jsx(R, {}),
                " Trash"
              ] })
            ] })
          ] })
        ] }),
        children: a.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: t.handle, onValueChange: (x) => N.router.get(_(`cms/taxonomies/${x}/terms`)), children: [
          /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": "Taxonomy", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(s.SelectContent, { children: a.map((x) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: x.handle, children: x.title }, x.handle)) })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-xs", children: [
        /* @__PURE__ */ e.jsx(de, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            className: "cms:pl-9",
            placeholder: "Search terms…",
            "aria-label": "Search terms",
            value: v,
            onChange: (x) => o(x.target.value)
          }
        )
      ] }),
      !n && u.length > 1 && !T && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
        "Drag terms to set their order",
        t.hierarchical ? "; a term's parent is set when you rename it" : "",
        "."
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(s.Card, { className: "cms:gap-0 cms:overflow-hidden cms:py-0", children: [
      /* @__PURE__ */ e.jsxs("div", { className: `${Qe} cms:bg-muted/60 cms:px-3 cms:py-2.5 cms:text-sm cms:font-medium cms:text-muted-foreground`, children: [
        /* @__PURE__ */ e.jsx("span", {}),
        /* @__PURE__ */ e.jsx("span", { children: "Title" }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:md:block", children: "Slug" }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:md:block", children: "Entries" }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:md:block", children: "Created" }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: "Actions" })
      ] }),
      u.length === 0 ? /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:border-t cms:border-border/60 cms:p-10 cms:text-center cms:text-muted-foreground", children: n ? "The trash is empty." : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        "No terms yet.",
        /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", onClick: () => i("new"), children: [
          /* @__PURE__ */ e.jsx(K, {}),
          " New term"
        ] })
      ] }) }) : T ? T.length === 0 ? /* @__PURE__ */ e.jsxs("p", { className: "cms:border-t cms:border-border/60 cms:p-8 cms:text-center cms:text-muted-foreground", children: [
        "No terms match “",
        v,
        "”."
      ] }) : T.map((x) => /* @__PURE__ */ e.jsx($.Fragment, { children: C(x, null, 0) }, x.id)) : n ? u.map((x) => /* @__PURE__ */ e.jsx($.Fragment, { children: C(x, null, 0) }, x.id)) : D(-1)
    ] }),
    /* @__PURE__ */ e.jsx(s.Dialog, { open: h !== null, onOpenChange: (x) => {
      x || i(null);
    }, children: /* @__PURE__ */ e.jsxs(s.DialogContent, { children: [
      /* @__PURE__ */ e.jsxs(s.DialogHeader, { children: [
        /* @__PURE__ */ e.jsx(s.DialogTitle, { children: h === "new" ? "New term" : `Rename “${h?.fallback ?? ""}”` }),
        /* @__PURE__ */ e.jsx(s.DialogDescription, { children: c.length > 1 ? `In ${P(r)}.` : "Its title and the slug in its address." })
      ] }),
      h !== null && /* @__PURE__ */ e.jsx(
        ll,
        {
          action: h === "new" ? b : _(`cms/terms/${h.id}`),
          method: h === "new" ? "post" : "put",
          locale: r,
          terms: l,
          hierarchical: t.hierarchical,
          term: h === "new" ? void 0 : h,
          submitLabel: h === "new" ? "Add term" : "Save",
          onDone: () => i(null)
        },
        h === "new" ? "new" : h.id
      )
    ] }) })
  ] });
}
const Qe = "cms:grid cms:items-center cms:gap-3 cms:grid-cols-[1.5rem_1fr_2.5rem] cms:md:grid-cols-[1.5rem_minmax(0,2fr)_minmax(0,1.2fr)_5rem_7rem_2.5rem]";
function al(t) {
  if (!t) return "—";
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? "—" : a.toLocaleDateString(void 0, { day: "numeric", month: "short", year: "numeric" });
}
function ll({ action: t, method: a, locale: l, terms: c, hierarchical: r, term: n, submitLabel: m, onDone: d }) {
  const h = N.useForm({ title: n?.title ?? "", slug: n?.slug ?? "", parent_id: n?.parentId ?? null, locale: l, version: n?.version ?? null }), i = h.errors, v = /* @__PURE__ */ new Set();
  if (n) {
    v.add(n.id);
    const y = c.findIndex((b) => b.id === n.id);
    for (let b = y + 1; b < c.length && (c[b]?.depth ?? 0) > n.depth; b++) v.add(c[b].id);
  }
  const o = (y) => {
    y.preventDefault(), h.submit(a, t, { preserveScroll: !0, onSuccess: () => d?.() });
  }, u = n ? `term-${n.id}` : "new-term";
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: o, className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${u}-title`, children: "Title" }),
      /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: `${u}-title`,
          value: h.data.title,
          placeholder: n?.fallback,
          required: !0,
          autoFocus: !0,
          onChange: (y) => h.setData("title", y.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(I, { message: i.title ?? i.version })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${u}-slug`, children: "Slug" }),
      /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: `${u}-slug`,
          className: "cms:font-mono",
          value: h.data.slug,
          placeholder: "Made from the title",
          onChange: (y) => h.setData("slug", y.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(I, { message: i.slug })
    ] }),
    r && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${u}-parent`, children: "Under" }),
      /* @__PURE__ */ e.jsxs(
        s.Select,
        {
          value: h.data.parent_id === null ? $e : String(h.data.parent_id),
          onValueChange: (y) => h.setData("parent_id", y === $e ? null : Number(y)),
          children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: `${u}-parent`, children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(s.SelectItem, { value: $e, children: "Top level" }),
              c.filter((y) => !v.has(y.id)).map((y) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: String(y.id), children: [
                "— ".repeat(y.depth),
                y.title ?? y.fallback
              ] }, y.id))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ e.jsx(I, { message: i.parent_id })
    ] }),
    /* @__PURE__ */ e.jsxs(s.DialogFooter, { children: [
      d && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", onClick: d, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(s.Button, { type: "submit", disabled: h.processing, children: m })
    ] })
  ] });
}
ht({
  pages: {
    "Cms/Blueprints/Index": ua,
    "Cms/Blueprints/Form": ma,
    "Cms/Fieldsets/Index": za,
    "Cms/Entries/Index": $a,
    "Cms/Entries/Editor": xa,
    "Cms/Entries/Listing": Ma,
    "Cms/Terms/Index": tl,
    "Cms/Terms/Edit": el,
    "Cms/Globals/Index": Aa,
    "Cms/Globals/Edit": La,
    "Cms/Menus/Index": Ka,
    "Cms/Menus/Edit": Va,
    "Cms/Comments/Index": Ga,
    "Cms/Seo/Edit": Qa,
    "Cms/Submissions/Index": Xa
  }
});
s.registerCommandSource((t, a) => Nt(t, a, _));
