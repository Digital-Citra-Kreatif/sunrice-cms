function ss() {
  const t = globalThis.Sunrice;
  if (!t)
    throw new Error("[sunrice] This script runs outside the Sunrice admin panel (window.Sunrice is missing).");
  return t;
}
function gt(t) {
  const a = ss();
  if (a.version !== 3)
    throw new Error(`[sunrice] This plugin was built for admin runtime 3, but the panel runs ${a.version}. Rebuild it with a matching @sunrice/admin-sdk.`);
  for (const [l, c] of Object.entries(t.pages ?? {}))
    a.registerPage(l, c);
}
function _(t = "") {
  return ss().adminUrl(t);
}
const ts = globalThis.Sunrice;
if (!ts) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const s = ts.modules["@sunrice/admin-sdk/ui"];
function re(t) {
  return t && typeof t == "object" && !Array.isArray(t) ? t : {};
}
function ft(t, a) {
  if (typeof t != "string" || t === "") return "";
  const l = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(t);
  return l ? a ? `${l[1]}T${l[2] ?? "00:00"}` : l[1] ?? "" : "";
}
function Ve(t) {
  return t === "" ? null : t;
}
function jt() {
  return { _hidden: !1 };
}
function bt(t) {
  return { type: t, hidden: !1, values: {} };
}
function vt(t) {
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
let yt = 0;
function Nt(t, a) {
  return t.length === a ? t.slice() : t.length < a ? [...t, ...Array.from({ length: a - t.length }, () => `k${++yt}`)] : t.slice(0, a);
}
function St({ taxonomy: t, q: a, ids: l }) {
  const c = new URLSearchParams({ taxonomy: t });
  a && c.set("q", a);
  for (const r of l ?? []) c.append("ids[]", String(r));
  return c.toString();
}
function Ct(t, a) {
  return t.map((l) => ({
    id: String(l.id),
    label: l.title,
    description: l.status === "published" ? l.collection : `${l.collection} · ${l.status}`,
    group: "Entries",
    icon: "file-text",
    url: a(`cms/collections/${l.collectionHandle}/entries/${l.id}/edit`)
  }));
}
async function kt(t, a, l) {
  const c = await fetch(`${l("cms/entries/picker")}?${ze({ search: t.trim(), collections: [] })}`, {
    signal: a,
    headers: { Accept: "application/json" },
    credentials: "same-origin"
  });
  if (!c.ok) return [];
  const { items: r } = await c.json();
  return Ct(r, l);
}
const as = globalThis.Sunrice;
if (!as) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const e = as.modules["react/jsx-runtime"], ls = globalThis.Sunrice;
if (!ls) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const $ = ls.modules.react, ns = globalThis.Sunrice;
if (!ns) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const N = ns.modules["@inertiajs/react"];
const wt = (t) => t?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
function $t(t, a, l = []) {
  if (a == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: wt(t),
    size: 24,
    node: a,
    ...l.length > 0 ? { aliases: l } : {}
  };
}
const Dt = (t) => {
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
const _t = (t) => {
  const a = Dt(t);
  return a.charAt(0).toUpperCase() + a.slice(1);
};
const _e = (...t) => t.filter((a, l, c) => !!a && a.trim() !== "" && c.indexOf(a) === l).join(" ").trim();
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
function Tt(t, a = {}) {
  const l = a.attributeNames ?? {}, c = (u) => l[u] ?? u, r = t.size ?? t.width ?? Z.width, n = t.size ?? t.height ?? Z.height, d = t.aliases?.filter((u) => typeof u == "string" && u.trim() !== "").map((u) => `lucide-${u}`) ?? [], m = [...t.name ? [`lucide-${t.name}`] : [], ...d], x = a.className?.split(" ").filter(Boolean) ?? [], o = a.includeDefaultClasses === !1 ? _e(...x) : _e("lucide", ...m, ...x), g = a.absoluteStrokeWidth ? Number(a.strokeWidth ?? Z["stroke-width"]) * Number(t.size ?? t.width ?? Z.width) / Number(a.size ?? a.width ?? Z.width) : a.strokeWidth ?? Z["stroke-width"];
  return [
    "svg",
    {
      ...Object.entries(Z).reduce((u, [S, b]) => (u[c(S)] = b, u), {}),
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
      [c("stroke-width")]: g,
      ...o && {
        [c("class")]: o
      },
      [c("viewBox")]: `0 0 ${r} ${n}`,
      ...a.hasA11yProp === !1 ? {
        [c("aria-hidden")]: "true"
      } : {},
      ..."attributes" in a && a.attributes
    },
    t.node.map((u) => {
      const [S, b, f] = u, w = a.nonScalingStroke ? { [c("vector-effect")]: "non-scaling-stroke", ...b } : b;
      return f ? [S, w, f] : [S, w];
    })
  ];
}
function Bt(t, a = {}) {
  return Tt(t, {
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
const Mt = (t) => {
  for (const a in t)
    if (a.startsWith("aria-") || a === "role" || a === "title")
      return !0;
  return !1;
}, Lt = $.createContext({}), zt = () => $.useContext(Lt), It = $.forwardRef(
  ({
    color: t,
    size: a,
    width: l,
    height: c,
    strokeWidth: r,
    absoluteStrokeWidth: n,
    nonScalingStroke: d,
    className: m = "",
    children: x,
    iconNode: o = [],
    icon: g = {
      node: o,
      aliases: [],
      size: 24
    },
    ...i
  }, u) => {
    const {
      size: S = 24,
      strokeWidth: b = 2,
      absoluteStrokeWidth: f = !1,
      nonScalingStroke: w = !1,
      color: v = "currentColor",
      className: y = ""
    } = zt() ?? {}, D = !!x || Mt(i), [p, k, T = []] = Bt(g, {
      color: t ?? v,
      width: l ?? a ?? S,
      height: c ?? a ?? S,
      strokeWidth: r ?? b,
      absoluteStrokeWidth: n ?? f,
      nonScalingStroke: d ?? w,
      className: _e(y, m),
      hasA11yProp: D,
      attributes: i
    });
    return $.createElement(
      p,
      {
        ref: u,
        ...k
      },
      [
        ...T.map(([h, M]) => $.createElement(h, M)),
        ...Array.isArray(x) ? x : [x]
      ]
    );
  }
);
function L(t, a = [], l = []) {
  const c = typeof t == "string" ? $t(t, a, l) : t, r = $.forwardRef(
    ({ className: n, ...d }, m) => $.createElement(It, {
      ref: m,
      icon: c,
      className: n,
      ...d
    })
  );
  return c.name && (r.displayName = _t(c.name)), r;
}
const cs = {
  name: "arrow-down",
  size: 24,
  node: [
    ["path", { d: "M12 5v14", key: "s699le" }],
    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
  ]
};
cs.node;
const rs = L(cs);
const is = {
  name: "arrow-up-down",
  size: 24,
  node: [
    ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
    ["path", { d: "M17 20V4", key: "1ejh1v" }],
    ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
    ["path", { d: "M7 4v16", key: "1glfcx" }]
  ]
};
is.node;
const os = L(is);
const ds = {
  name: "arrow-up",
  size: 24,
  node: [
    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
    ["path", { d: "M12 19V5", key: "x0mq9r" }]
  ]
};
ds.node;
const ms = L(ds);
const us = {
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
us.node;
const hs = L(us);
const xs = {
  name: "check",
  size: 24,
  node: [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]
};
xs.node;
const xe = L(xs);
const ps = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
ps.node;
const gs = L(ps);
const fs = {
  name: "chevron-left",
  size: 24,
  node: [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]]
};
fs.node;
const Ie = L(fs);
const js = {
  name: "chevron-right",
  size: 24,
  node: [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]
};
js.node;
const ge = L(js);
const bs = {
  name: "columns-3",
  size: 24,
  node: [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M9 3v18", key: "fh3hqa" }],
    ["path", { d: "M15 3v18", key: "14nvp0" }]
  ],
  aliases: ["panels-left-right"]
};
bs.node;
const At = L(bs);
const vs = {
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
vs.node;
const Et = L(vs);
const ys = {
  name: "copy",
  size: 24,
  node: [
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
  ]
};
ys.node;
const Ft = L(ys);
const Ns = {
  name: "download",
  size: 24,
  node: [
    ["path", { d: "M12 15V3", key: "m9g1x1" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
  ]
};
Ns.node;
const Ss = L(Ns);
const Cs = {
  name: "ellipsis-vertical",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
    ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
    ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }]
  ],
  aliases: ["more-vertical"]
};
Cs.node;
const Ht = L(Cs);
const ks = {
  name: "ellipsis",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
    ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
    ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
  ],
  aliases: ["more-horizontal"]
};
ks.node;
const ws = L(ks);
const $s = {
  name: "external-link",
  size: 24,
  node: [
    ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
    ["path", { d: "M10 14 21 3", key: "gplh6r" }],
    ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
  ]
};
$s.node;
const ne = L($s);
const Ds = {
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
Ds.node;
const Pt = L(Ds);
const _s = {
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
_s.node;
const Rt = L(_s);
const Ts = {
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
Ts.node;
const Vt = L(Ts);
const Bs = {
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
Bs.node;
const Ot = L(Bs);
const Ms = {
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
Ms.node;
const Ut = L(Ms);
const Ls = {
  name: "link-2",
  size: 24,
  node: [
    ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
    ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
    ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
  ]
};
Ls.node;
const Kt = L(Ls);
const zs = {
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
zs.node;
const Wt = L(zs);
const Is = {
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
Is.node;
const qt = L(Is);
const As = {
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
As.node;
const Gt = L(As);
const Es = {
  name: "loader-circle",
  size: 24,
  node: [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  aliases: ["loader-2"]
};
Es.node;
const se = L(Es);
const Fs = {
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
Fs.node;
const Hs = L(Fs);
const Ps = {
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
Ps.node;
const Jt = L(Ps);
const Rs = {
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
Rs.node;
const Vs = L(Rs);
const Os = {
  name: "plus",
  size: 24,
  node: [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ]
};
Os.node;
const K = L(Os);
const Us = {
  name: "rotate-ccw",
  size: 24,
  node: [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ]
};
Us.node;
const pe = L(Us);
const Ks = {
  name: "search",
  size: 24,
  node: [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ]
};
Ks.node;
const de = L(Ks);
const Ws = {
  name: "settings-2",
  size: 24,
  node: [
    ["path", { d: "M14 17H5", key: "gfn3mx" }],
    ["path", { d: "M19 7h-9", key: "6i9tg" }],
    ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
    ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
  ]
};
Ws.node;
const Ae = L(Ws);
const qs = {
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
qs.node;
const Te = L(qs);
const Gs = {
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
Gs.node;
const Yt = L(Gs);
const Js = {
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
Js.node;
const V = L(Js);
const Ys = {
  name: "undo-2",
  size: 24,
  node: [
    ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
    ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
  ]
};
Ys.node;
const Be = L(Ys);
const Qs = {
  name: "x",
  size: 24,
  node: [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]
};
Qs.node;
const fe = L(Qs);
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
function Zs(t) {
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
async function Oe(t) {
  const a = await fetch(`${_("cms/entries/picker")}?${ze(t)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!a.ok) throw new Error(String(a.status));
  return (await a.json()).items;
}
function je({ id: t, value: a, multiple: l, max: c, collections: r, invalid: n, onChange: d }) {
  const m = a === null ? [] : Array.isArray(a) ? a : [a], [x, o] = $.useState({}), [g, i] = $.useState(""), [u, S] = $.useState(null), [b, f] = $.useState(!1), w = l && c !== null && m.length >= c, v = m.filter((p) => !x[p]).join(",");
  $.useEffect(() => {
    v !== "" && Oe({ ids: v.split(",").map(Number), collections: r }).then((p) => o((k) => ({ ...k, ...Object.fromEntries(p.map((T) => [T.id, T])) }))).catch(() => f(!0));
  }, [v]), $.useEffect(() => {
    if (g.trim() === "") {
      S(null);
      return;
    }
    const p = window.setTimeout(() => {
      Oe({ search: g.trim(), collections: r }).then((k) => {
        S(k), f(!1);
      }).catch(() => f(!0));
    }, 250);
    return () => window.clearTimeout(p);
  }, [g]);
  const y = (p) => {
    o((k) => ({ ...k, [p.id]: p })), d(l ? [...m, p.id] : p.id), i("");
  }, D = (p) => d(l ? p : p[0] ?? null);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    m.length > 0 && /* @__PURE__ */ e.jsx(s.SortableList, { items: m, getId: (p) => p, onReorder: (p) => D(p), disabled: !l, className: "cms:gap-1", children: (p, { handle: k }) => {
      const T = x[p];
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-md cms:border cms:bg-card cms:px-2 cms:py-1 cms:text-sm", children: [
        l && /* @__PURE__ */ e.jsx(s.SortableHandle, { ...k, label: `Move ${T?.title ?? p}` }),
        /* @__PURE__ */ e.jsx("span", { className: `cms:min-w-0 cms:flex-1 cms:truncate ${l ? "" : "cms:pl-1"}`, children: T ? T.title : `Entry #${p}` }),
        T && /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: T.collection }),
        T && /* @__PURE__ */ e.jsx(s.Badge, { variant: T.status === "published" ? "success" : "secondary", children: X(T.status) }),
        /* @__PURE__ */ e.jsx(
          s.Button,
          {
            type: "button",
            variant: "ghost",
            size: "icon",
            className: "cms:size-7",
            "aria-label": `Remove ${T?.title ?? p}`,
            onClick: () => D(m.filter((h) => h !== p)),
            children: /* @__PURE__ */ e.jsx(fe, {})
          }
        )
      ] });
    } }),
    !w && (l || m.length === 0) && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-md", children: [
      /* @__PURE__ */ e.jsx(de, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
      /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: t,
          className: "cms:pl-9",
          placeholder: "Search entries by title",
          "aria-invalid": n,
          value: g,
          autoComplete: "off",
          onChange: (p) => i(p.target.value)
        }
      ),
      u !== null && /* @__PURE__ */ e.jsxs("ul", { role: "listbox", "aria-label": "Matching entries", className: "cms:absolute cms:z-10 cms:mt-1 cms:max-h-64 cms:w-full cms:overflow-auto cms:rounded-md cms:border cms:bg-card cms:p-1 cms:shadow-md", children: [
        u.filter((p) => !m.includes(p.id)).length === 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: "No entries match." }),
        u.filter((p) => !m.includes(p.id)).map((p) => /* @__PURE__ */ e.jsx("li", { role: "option", "aria-selected": !1, children: /* @__PURE__ */ e.jsxs(
          "button",
          {
            type: "button",
            className: "cms:flex cms:w-full cms:items-center cms:gap-2 cms:rounded cms:px-2 cms:py-1.5 cms:text-left cms:text-sm cms:hover:bg-accent",
            onClick: () => y(p),
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
const Xs = $.createContext({}), ve = "__none";
async function Ue(t) {
  const a = await fetch(`${_("cms/terms/picker")}?${St(t)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!a.ok) throw new Error(String(a.status));
  return await a.json();
}
function Qt({ id: t, taxonomy: a, multiple: l, max: c, required: r, invalid: n, value: d, onChange: m }) {
  const x = $.useContext(Xs), o = d === null ? [] : Array.isArray(d) ? d : [d], [g, i] = $.useState(null), [u, S] = $.useState(!1), [b, f] = $.useState(""), [w, v] = $.useState({}), [y, D] = $.useState(!1);
  $.useEffect(() => {
    if (!a) return;
    const C = b.trim(), I = window.setTimeout(() => {
      Ue({ taxonomy: a, q: C }).then((F) => {
        i(F.items), F.more && S(!0), D(!1);
      }).catch(() => D(!0));
    }, C === "" ? 0 : 250);
    return () => window.clearTimeout(I);
  }, [a, b]);
  const p = (C) => x[String(C)] ?? w[C] ?? g?.find((I) => I.id === C)?.label, k = g === null ? "" : o.filter((C) => p(C) === void 0).join(",");
  if ($.useEffect(() => {
    !a || k === "" || Ue({ taxonomy: a, ids: k.split(",").map(Number) }).then((C) => v((I) => ({ ...I, ...Object.fromEntries(C.items.map((F) => [F.id, F.label])) }))).catch(() => D(!0));
  }, [a, k]), !a) return /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Choose a taxonomy for this field in its blueprint." });
  if (g === null) return y ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "Terms could not be loaded. Try again." }) : /* @__PURE__ */ e.jsx(s.Skeleton, { className: "cms:h-9 cms:w-full cms:max-w-sm" });
  const T = (C) => `${"— ".repeat(C.depth)}${C.label}`, h = l && c !== null && o.length >= c, M = (C) => m(l ? C : C[0] ?? null), E = u && o.length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-1.5", children: o.map((C) => /* @__PURE__ */ e.jsxs(s.Badge, { variant: "secondary", className: "cms:gap-1 cms:pr-1", children: [
    p(C) ?? `Term #${C}`,
    !(r && !l) && /* @__PURE__ */ e.jsx(
      "button",
      {
        type: "button",
        className: "cms:rounded-sm cms:p-0.5 cms:hover:bg-muted",
        "aria-label": `Remove ${p(C) ?? C}`,
        onClick: () => M(o.filter((I) => I !== C)),
        children: /* @__PURE__ */ e.jsx(fe, { className: "cms:size-3" })
      }
    )
  ] }, C)) }), A = u && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-sm", children: [
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
        onChange: (C) => f(C.target.value)
      }
    )
  ] });
  if (!l && !u) {
    const C = o[0], I = C === void 0 || g.some((F) => F.id === C);
    return /* @__PURE__ */ e.jsxs(s.Select, { value: C === void 0 ? ve : String(C), onValueChange: (F) => m(F === ve ? null : Number(F)), children: [
      /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: t, className: "cms:w-full cms:max-w-sm", "aria-invalid": n, children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
      /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
        !r && /* @__PURE__ */ e.jsx(s.SelectItem, { value: ve, children: "None" }),
        !I && C !== void 0 && /* @__PURE__ */ e.jsx(s.SelectItem, { value: String(C), children: p(C) ?? `Term #${C}` }),
        g.map((F) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: String(F.id), children: T(F) }, F.id))
      ] })
    ] });
  }
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    E,
    A,
    g.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: b.trim() ? "No terms match." : "Nothing to choose from yet." }) : l ? /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:max-h-72 cms:flex-col cms:gap-2 cms:overflow-auto", children: g.map((C) => {
      const I = o.includes(C.id);
      return /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx(
          s.Checkbox,
          {
            checked: I,
            disabled: !I && h,
            onCheckedChange: (F) => M(F ? [...o, C.id] : o.filter((ae) => ae !== C.id))
          }
        ),
        T(C)
      ] }, C.id);
    }) }) : /* @__PURE__ */ e.jsx("div", { role: "listbox", "aria-label": "Terms", className: "cms:flex cms:max-h-72 cms:flex-col cms:overflow-auto", children: g.map((C) => /* @__PURE__ */ e.jsx(
      s.Button,
      {
        type: "button",
        variant: o[0] === C.id ? "secondary" : "ghost",
        size: "sm",
        className: "cms:justify-start",
        role: "option",
        "aria-selected": o[0] === C.id,
        onClick: () => m(C.id),
        children: T(C)
      },
      C.id
    )) })
  ] });
}
const Zt = 5;
let Xt = 0;
const et = () => `f${++Xt}`;
function st(t) {
  return t.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function tt(t) {
  return t.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^[0-9_]+/, "").replace(/_{2,}/g, "_").slice(0, 64);
}
function at(t, a) {
  const l = new Set(a.map((n) => n.handle)), c = st(t) || "field";
  let r = c;
  for (let n = 2; l.has(r); n++)
    r = `${c}_${n}`;
  return r;
}
function lt(t) {
  return (t ?? []).map(({ fields: a, ...l }) => ({
    ...l,
    key: et(),
    fields: lt(a),
    handleTouched: !0
  }));
}
function nt(t, a) {
  return t.map(({ key: l, handleTouched: c, fields: r, ...n }) => ({
    ...n,
    validation: (n.validation ?? []).map((d) => d.trim()).filter((d) => d !== ""),
    ...a(n.type) ? { fields: nt(r, a) } : {}
  }));
}
function ea(t, a, l) {
  return { key: et(), type: t, label: a, handle: at(a, l), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function sa(t, a, l) {
  if (t.handleTouched) return { ...t, label: a };
  const c = l.filter((r) => r.key !== t.key);
  return { ...t, label: a, handle: at(a || t.type, c) };
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
function le(t, a) {
  return Object.keys(t).some((l) => l === a || l.startsWith(`${a}.`));
}
const ye = [
  { value: "equals", label: "is", needsValue: !0 },
  { value: "not_equals", label: "is not", needsValue: !0 },
  { value: "filled", label: "is filled in", needsValue: !1 },
  { value: "empty", label: "is empty", needsValue: !1 }
];
function Ke(t) {
  return t === !0 ? "true" : t === !1 ? "false" : typeof t == "string" || typeof t == "number" ? String(t) : "";
}
function Ee(t, a) {
  const l = t.condition;
  if (!l) return !0;
  const c = a[l.field], r = c != null && c !== "" && c !== !1 && !(Array.isArray(c) && c.length === 0), n = (Array.isArray(c) ? c : [c]).map(Ke).includes(Ke(l.value));
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
function z({ message: t }) {
  return t ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t }) : null;
}
function We(t) {
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
const ta = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function Me(t) {
  if (t.label) return t.label;
  const a = t.handle.replace(/_/g, " ");
  return a.charAt(0).toUpperCase() + a.slice(1);
}
function ee({ field: t, value: a, onChange: l, errors: c, id: r, content: n = !1 }) {
  const d = Me(t), m = ta.includes(t.type) || ["select", "terms"].includes(t.type) && t.config?.multiple === !0;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", ...m ? { role: "group", "aria-labelledby": `${r}-label` } : {}, children: [
    t.type === "toggle" ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(s.Switch, { id: r, checked: a === !0, onCheckedChange: (x) => l(x) }),
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: r, children: d })
    ] }) : /* @__PURE__ */ e.jsxs(s.Label, { id: `${r}-label`, htmlFor: m ? void 0 : r, children: [
      d,
      t.required && /* @__PURE__ */ e.jsx("span", { className: "cms:text-destructive", children: " *" })
    ] }),
    /* @__PURE__ */ e.jsx(aa, { field: t, value: a, onChange: l, errors: c, id: r, content: n }),
    t.instructions && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t.instructions }),
    /* @__PURE__ */ e.jsx(z, { message: c[""] })
  ] });
}
function aa({ field: t, value: a, onChange: l, errors: c, id: r, content: n }) {
  const d = c[""] !== void 0;
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
          "aria-invalid": d,
          value: typeof a == "string" ? a : "",
          rows: J(t, "rows") ?? 4,
          onChange: (m) => l(m.target.value)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ e.jsx(s.RichTextEditor, { id: r, labelledBy: `${r}-label`, invalid: d, value: typeof a == "string" ? a : "", onChange: l });
    case "number":
      return /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: r,
          type: "number",
          className: "cms:max-w-48",
          "aria-invalid": d,
          value: typeof a == "number" ? String(a) : typeof a == "string" ? a : "",
          min: J(t, "min"),
          max: J(t, "max"),
          step: J(t, "step") ?? "any",
          onChange: (m) => l(m.target.value === "" ? null : Number(m.target.value))
        }
      );
    case "date": {
      const m = t.config?.time === !0;
      return /* @__PURE__ */ e.jsx(
        s.DatePicker,
        {
          id: r,
          withTime: m,
          invalid: d,
          required: t.required === !0,
          value: Ve(ft(a, m)),
          onChange: (x) => l(Ve(x ?? ""))
        }
      );
    }
    case "select":
      return t.config?.multiple === !0 ? /* @__PURE__ */ e.jsx(ca, { options: We(t), value: Array.isArray(a) ? a.map(String) : [], onChange: l }) : /* @__PURE__ */ e.jsx(na, { options: We(t), value: typeof a == "string" ? a : null, onChange: l, id: r, required: t.required === !0 });
    case "terms": {
      const m = t.config?.multiple === !0, x = Array.isArray(a) ? a.filter((o) => typeof o == "number") : typeof a == "number" ? a : null;
      return /* @__PURE__ */ e.jsx(
        Qt,
        {
          id: r,
          taxonomy: typeof t.taxonomy == "string" ? t.taxonomy : null,
          multiple: m,
          max: J(t, "max") ?? null,
          required: t.required === !0,
          invalid: d,
          value: m ? Array.isArray(x) ? x : [] : typeof x == "number" ? x : null,
          onChange: l
        }
      );
    }
    case "entries":
      return /* @__PURE__ */ e.jsx(
        je,
        {
          id: r,
          invalid: d,
          multiple: t.config?.multiple === !0,
          max: J(t, "max") ?? null,
          collections: t.collections ?? [],
          onChange: l,
          value: typeof a == "number" || Array.isArray(a) && a.every((m) => typeof m == "number") ? a : null
        }
      );
    case "link":
      return /* @__PURE__ */ e.jsx(ra, { value: re(a), onChange: l, errors: c, id: r, collections: t.collections ?? [] });
    case "media":
      return /* @__PURE__ */ e.jsx(
        s.MediaPickerInput,
        {
          id: r,
          invalid: d,
          disabled: !1,
          multiple: t.config?.multiple === !0,
          max: J(t, "max") ?? null,
          types: Array.isArray(t.config?.types) ? t.config.types : [],
          value: typeof a == "number" || Array.isArray(a) && a.every((m) => typeof m == "number") ? a : null,
          onChange: l
        }
      );
    case "group":
      return /* @__PURE__ */ e.jsx(te, { fields: t.fields ?? [], value: re(a), onChange: l, errors: c, id: r, content: n });
    case "repeater":
      return /* @__PURE__ */ e.jsx(oa, { field: t, value: Array.isArray(a) ? a : [], onChange: l, errors: c, id: r, content: n });
    case "flexible":
      return /* @__PURE__ */ e.jsx(da, { field: t, value: Array.isArray(a) ? a : [], onChange: l, errors: c, id: r });
    default:
      return /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: r,
          "aria-invalid": d,
          value: typeof a == "string" ? a : "",
          placeholder: la(t, "placeholder"),
          maxLength: J(t, "max"),
          onChange: (m) => l(m.target.value)
        }
      );
  }
}
function J(t, a) {
  const l = t.config?.[a];
  return typeof l == "number" ? l : void 0;
}
function la(t, a) {
  const l = t.config?.[a];
  return typeof l == "string" ? l : void 0;
}
function te({ fields: t, value: a, onChange: l, errors: c, id: r, content: n, bare: d = !1 }) {
  return /* @__PURE__ */ e.jsx("div", { className: d ? "cms:flex cms:flex-col cms:gap-6" : "cms:flex cms:flex-col cms:gap-4 cms:rounded-lg cms:border cms:p-4", children: t.filter((m) => Ee(m, a)).map((m) => m.shared ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
    /* @__PURE__ */ e.jsx(ee, { id: `${r}-${m.handle}`, field: m, value: a[m.handle], content: n, errors: {}, onChange: () => {
    } }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Shared by all languages: edit it in the main language." })
  ] }, m.handle) : /* @__PURE__ */ e.jsx(
    ee,
    {
      id: `${r}-${m.handle}`,
      field: m,
      value: a[m.handle],
      content: n,
      errors: q(c, m.handle),
      onChange: (x) => l({ ...a, [m.handle]: x })
    },
    m.handle
  )) });
}
function na({ options: t, value: a, onChange: l, id: c, required: r }) {
  return /* @__PURE__ */ e.jsxs(s.Select, { value: a ?? Ne, onValueChange: (n) => l(n === Ne ? null : n), children: [
    /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: c, className: "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
    /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
      !r && /* @__PURE__ */ e.jsx(s.SelectItem, { value: Ne, children: "None" }),
      t.map((n) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: n.value, children: n.label }, n.value))
    ] })
  ] });
}
function ca({ options: t, value: a, onChange: l }) {
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
function ra({ value: t, onChange: a, errors: l, id: c, collections: r }) {
  const n = t.type === "entry" ? "entry" : "url", d = (m) => {
    const x = { ...t, type: n, ...m }, o = x.type === "entry" ? typeof x.entry_id != "number" : x.url === "" || x.url === void 0 || x.url === null;
    a(o ? x.label || x.new_tab ? x : null : x);
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("div", { role: "radiogroup", "aria-label": "Link to", className: "cms:inline-flex cms:w-fit cms:rounded-md cms:border cms:p-0.5", children: ["url", "entry"].map((m) => /* @__PURE__ */ e.jsx(
      s.Button,
      {
        type: "button",
        size: "sm",
        role: "radio",
        "aria-checked": n === m,
        variant: n === m ? "secondary" : "ghost",
        onClick: () => d({ type: m, url: m === "url" ? t.url : void 0, entry_id: m === "entry" ? t.entry_id : void 0 }),
        children: m === "url" ? "Address" : "Entry"
      },
      m
    )) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-2 cms:md:grid-cols-[2fr_1fr_auto] cms:md:items-start", children: [
      n === "url" ? /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: c,
          "aria-label": "Address",
          placeholder: "https://… or /about",
          value: typeof t.url == "string" ? t.url : "",
          onChange: (m) => d({ url: m.target.value }),
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
          onChange: (m) => d({ entry_id: typeof m == "number" ? m : void 0 })
        }
      ),
      /* @__PURE__ */ e.jsx(
        s.Input,
        {
          "aria-label": "Link text",
          placeholder: n === "entry" ? "Link text (the entry's title)" : "Link text",
          value: typeof t.label == "string" ? t.label : "",
          onChange: (m) => d({ label: m.target.value })
        }
      ),
      /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:h-9 cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx(s.Checkbox, { checked: t.new_tab === !0, onCheckedChange: (m) => d({ new_tab: m }) }),
        "New tab"
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ e.jsx(z, { message: l.url ?? l.entry_id ?? l.label ?? l.type }) })
    ] })
  ] });
}
function ia(t, a) {
  return !a && (t.fields ?? []).every((l) => l.type === "text");
}
function ct(t) {
  const a = $.useRef([]);
  return a.current = Nt(a.current, t), {
    keys: a.current,
    remove: (l) => {
      a.current = a.current.filter((c, r) => r !== l);
    },
    move: (l, c) => {
      a.current = s.moveItem(a.current, l, c);
    }
  };
}
function oa({ field: t, value: a, onChange: l, errors: c, id: r, content: n = !1 }) {
  const d = t.fields ?? [], m = a.map(re), x = ct(m.length), o = (b, f) => l(m.map((w, v) => v === b ? f : w)), g = (b) => {
    x.remove(b), l(m.filter((f, w) => w !== b));
  }, i = (t.label || "row").toLowerCase().replace(/s$/, ""), u = i.charAt(0).toUpperCase() + i.slice(1), S = m.map((b, f) => ({ row: b, index: f, key: x.keys[f] ?? String(f) }));
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(
      s.SortableList,
      {
        items: S,
        getId: (b) => b.key,
        onReorder: (b, f, w) => {
          x.move(f, w), l(b.map((v) => v.row));
        },
        children: ({ row: b, index: f }, { handle: w }) => ia(t, n) ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(s.SortableHandle, { ...w, label: `Move ${i} ${f + 1}`, className: "cms:mt-1" }),
          d.map((v) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
            /* @__PURE__ */ e.jsx(
              s.Input,
              {
                "aria-label": v.label || v.handle,
                placeholder: v.label || v.handle,
                value: typeof b[v.handle] == "string" ? b[v.handle] : "",
                onChange: (y) => o(f, { ...b, [v.handle]: y.target.value })
              }
            ),
            /* @__PURE__ */ e.jsx(z, { message: c[`${f}.${v.handle}`] })
          ] }, v.handle)),
          /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": `Remove ${i} ${f + 1}`, onClick: () => g(f), children: /* @__PURE__ */ e.jsx(V, {}) })
        ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(
            rt,
            {
              label: `${u} ${f + 1}`,
              handle: w,
              onRemove: () => g(f),
              hidden: n ? b._hidden === !0 : void 0,
              onHidden: (v) => o(f, { ...b, _hidden: v })
            }
          ),
          /* @__PURE__ */ e.jsx(te, { fields: d, value: b, onChange: (v) => o(f, v), errors: q(c, String(f)), id: `${r}-${f}`, content: n })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", size: "sm", onClick: () => l([...m, n ? jt() : {}]), children: [
      /* @__PURE__ */ e.jsx(K, {}),
      " Add ",
      i
    ] }) })
  ] });
}
function da({ field: t, value: a, onChange: l, errors: c, id: r }) {
  const n = t.blocks ?? [], d = a.map(re), m = ct(d.length), x = (i, u) => l(d.map((S, b) => b === i ? u : S)), o = (i) => {
    m.remove(i), l(d.filter((u, S) => S !== i));
  }, g = d.map((i, u) => ({ block: i, index: u, key: m.keys[u] ?? String(u) }));
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    /* @__PURE__ */ e.jsx(
      s.SortableList,
      {
        items: g,
        getId: (i) => i.key,
        className: "cms:gap-3",
        onReorder: (i, u, S) => {
          m.move(u, S), l(i.map((b) => b.block));
        },
        children: ({ block: i, index: u }, { handle: S }) => {
          const b = n.find((f) => f.type === i.type);
          return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              rt,
              {
                label: b?.label ?? String(i.type),
                badge: !0,
                handle: S,
                onRemove: () => o(u),
                hidden: i.hidden === !0,
                onHidden: (f) => x(u, { ...i, hidden: f })
              }
            ),
            b ? /* @__PURE__ */ e.jsx(
              te,
              {
                fields: b.fields,
                value: re(i.values),
                onChange: (f) => x(u, { ...i, values: f }),
                errors: q(c, `${u}.values`),
                id: `${r}-${u}`,
                content: !0
              }
            ) : /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: "This kind of block no longer exists. Its values are kept." }),
            /* @__PURE__ */ e.jsx(z, { message: c[`${u}.type`] })
          ] });
        }
      }
    ),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(s.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(s.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", size: "sm", disabled: n.length === 0, children: [
        /* @__PURE__ */ e.jsx(K, {}),
        " Add block"
      ] }) }),
      /* @__PURE__ */ e.jsx(s.DropdownMenuContent, { align: "start", children: n.map((i) => /* @__PURE__ */ e.jsx(s.DropdownMenuItem, { onSelect: () => l([...d, bt(i.type)]), children: i.label }, i.type)) })
    ] }) })
  ] });
}
function rt({ label: t, badge: a = !1, handle: l, onRemove: c, hidden: r, onHidden: n }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(s.SortableHandle, { ...l, label: `Move ${t}` }),
    a ? /* @__PURE__ */ e.jsx(s.Badge, { variant: "secondary", children: t }) : /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:font-medium", children: t }),
    r !== void 0 && /* @__PURE__ */ e.jsxs("label", { className: "cms:ml-auto cms:flex cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", children: [
      /* @__PURE__ */ e.jsx(s.Switch, { checked: !r, onCheckedChange: (d) => n(!d), "aria-label": `Show ${t}` }),
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
        children: /* @__PURE__ */ e.jsx(V, {})
      }
    )
  ] });
}
function it({ fields: t, onChange: a, types: l, errors: c, depth: r = 1, idPrefix: n = "field" }) {
  const [d, m] = $.useState(() => /* @__PURE__ */ new Set()), x = (i) => m((u) => {
    const S = new Set(u);
    return S.has(i) ? S.delete(i) : S.add(i), S;
  }), o = (i, u) => a(t.map((S, b) => b === i ? u : S)), g = (i) => {
    const u = ea(i.type, i.label, t);
    a([...t, u]), m((S) => new Set(S).add(u.key));
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    t.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:border-dashed cms:p-4 cms:text-sm cms:text-muted-foreground", children: "No fields yet." }),
    /* @__PURE__ */ e.jsx(s.SortableList, { items: t, getId: (i) => i.key, onReorder: (i) => a(i), children: (i, { index: u, handle: S, isOverlay: b }) => {
      const f = l.find((y) => y.type === i.type), w = !b && (d.has(i.key) || le(c, String(u))), v = `${n}-${i.key}`;
      return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${le(c, String(u)) ? "cms:border-destructive" : ""}`, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:p-2", children: [
          /* @__PURE__ */ e.jsx(s.SortableHandle, { ...S, label: `Move ${i.label || i.handle}` }),
          /* @__PURE__ */ e.jsx(
            s.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-expanded": w,
              "aria-controls": v,
              "aria-label": `${w ? "Close" : "Open"} ${i.label || i.handle}`,
              onClick: () => x(i.key),
              children: w ? /* @__PURE__ */ e.jsx(gs, {}) : /* @__PURE__ */ e.jsx(ge, {})
            }
          ),
          /* @__PURE__ */ e.jsxs("button", { type: "button", className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:text-left", onClick: () => x(i.key), children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: i.label || i.handle }),
            /* @__PURE__ */ e.jsx("code", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", children: i.handle })
          ] }),
          i.required && /* @__PURE__ */ e.jsx(s.Badge, { variant: "outline", children: "Required" }),
          /* @__PURE__ */ e.jsx(s.Badge, { variant: "secondary", children: f?.label ?? i.type }),
          f?.hasChildren && i.fields.length > 0 && !w && /* @__PURE__ */ e.jsxs("span", { className: "cms:text-xs cms:text-muted-foreground", children: [
            i.fields.length,
            " inside"
          ] }),
          /* @__PURE__ */ e.jsx(
            s.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Remove ${i.label || i.handle}`,
              onClick: () => a(t.filter((y, D) => D !== u)),
              children: /* @__PURE__ */ e.jsx(V, {})
            }
          )
        ] }),
        w && /* @__PURE__ */ e.jsx(
          ma,
          {
            id: v,
            field: i,
            type: f,
            siblings: t,
            onChange: (y) => o(u, y),
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
      /* @__PURE__ */ e.jsx(s.DropdownMenuContent, { align: "start", children: l.filter((i) => !i.hasChildren || r < Zt).map((i) => /* @__PURE__ */ e.jsx(s.DropdownMenuItem, { onSelect: () => g(i), children: i.label }, i.type)) })
    ] }) })
  ] });
}
const Y = { default: "__default", yes: "yes", no: "no" };
function ma({ id: t, field: a, type: l, siblings: c, onChange: r, types: n, errors: d, depth: m }) {
  const x = a.config ?? {};
  return /* @__PURE__ */ e.jsxs("div", { id: t, className: "cms:flex cms:flex-col cms:gap-4 cms:border-t cms:p-4", children: [
    !l && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-destructive", children: [
      'The field type "',
      a.type,
      `" isn't registered. Its data is kept; register the type or remove the field.`
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${t}-label`, children: "Label" }),
        /* @__PURE__ */ e.jsx(s.Input, { id: `${t}-label`, value: a.label ?? "", onChange: (o) => r(sa(a, o.target.value, c)) }),
        /* @__PURE__ */ e.jsx(z, { message: d.label })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${t}-handle`, children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            id: `${t}-handle`,
            className: "cms:font-mono",
            value: a.handle,
            onChange: (o) => r({ ...a, handle: tt(o.target.value), handleTouched: !0 })
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "How templates read it. Renaming it hides values saved under the old one." }),
        /* @__PURE__ */ e.jsx(z, { message: d.handle })
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
          onChange: (o) => r({ ...a, instructions: o.target.value || null })
        }
      ),
      /* @__PURE__ */ e.jsx(z, { message: d.instructions })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-6", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(s.Switch, { id: `${t}-required`, checked: a.required === !0, onCheckedChange: (o) => r({ ...a, required: o }) }),
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${t}-required`, children: "Required" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${t}-translatable`, children: "Per language" }),
        /* @__PURE__ */ e.jsxs(
          s.Select,
          {
            value: a.translatable === !0 ? Y.yes : a.translatable === !1 ? Y.no : Y.default,
            onValueChange: (o) => r({ ...a, translatable: o === Y.yes ? !0 : o === Y.no ? !1 : null }),
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
    /* @__PURE__ */ e.jsx(ua, { id: t, field: a, siblings: c, onChange: r, errors: ie(d, "condition") }),
    (l?.settings.length ?? 0) > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: l?.settings.map((o) => /* @__PURE__ */ e.jsx(
      ee,
      {
        id: `${t}-config-${o.handle}`,
        field: o,
        value: x[o.handle],
        errors: q(d, `config.${o.handle}`),
        onChange: (g) => r({ ...a, config: { ...x, [o.handle]: g } })
      },
      o.handle
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
          onChange: (o) => r({ ...a, validation: o.target.value.split(`
`) })
        }
      ),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Laravel rules, one per line." }),
      /* @__PURE__ */ e.jsx(z, { message: d.validation ?? Object.entries(d).find(([o]) => o.startsWith("validation."))?.[1] })
    ] }),
    l?.hasChildren && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(s.Label, { children: "Fields inside" }),
      /* @__PURE__ */ e.jsx(
        it,
        {
          fields: a.fields,
          onChange: (o) => r({ ...a, fields: o }),
          types: n,
          errors: ie(d, "fields"),
          depth: m + 1,
          idPrefix: t
        }
      ),
      /* @__PURE__ */ e.jsx(z, { message: d.fields })
    ] }),
    /* @__PURE__ */ e.jsx(z, { message: d.type })
  ] });
}
const Se = "__always";
function ua({ id: t, field: a, siblings: l, onChange: c, errors: r }) {
  const n = l.filter((o) => o.key !== a.key && o.handle !== ""), d = a.condition ?? null, m = ye.find((o) => o.value === d?.operator) ?? ye[0], x = (o) => c({ ...a, condition: o === null ? null : { field: d?.field ?? n[0]?.handle ?? "", operator: d?.operator ?? "equals", value: d?.value ?? "", ...o } });
  return n.length === 0 && d === null ? null : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${t}-condition`, children: "Show" }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(s.Select, { value: d?.field ?? Se, onValueChange: (o) => x(o === Se ? null : { field: o }), children: [
        /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: `${t}-condition`, className: "cms:w-56", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
        /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
          /* @__PURE__ */ e.jsx(s.SelectItem, { value: Se, children: "Always" }),
          n.map((o) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: o.handle, children: [
            "When ",
            o.label || o.handle
          ] }, o.key))
        ] })
      ] }),
      d && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(s.Select, { value: m.value, onValueChange: (o) => x({ operator: o }), children: [
          /* @__PURE__ */ e.jsx(s.SelectTrigger, { "aria-label": "How to compare", className: "cms:w-36", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(s.SelectContent, { children: ye.map((o) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: o.value, children: o.label }, o.value)) })
        ] }),
        m.needsValue && /* @__PURE__ */ e.jsx(
          s.Input,
          {
            "aria-label": "Value",
            className: "cms:w-48",
            placeholder: "a value, or true / false",
            value: String(d.value ?? ""),
            onChange: (o) => x({ value: o.target.value })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "A hidden field isn't required, and keeps what it had." }),
    /* @__PURE__ */ e.jsx(z, { message: r.field ?? r.operator ?? r.value ?? r[""] })
  ] });
}
function qe({ kind: t = "blueprint", blueprint: a, fieldTypes: l, usedBy: c = [] }) {
  const r = t === "fieldset" ? "Fieldset" : "Blueprint", n = _(t === "fieldset" ? "cms/fieldsets" : "cms/blueprints"), d = a ? a.title : `New ${r.toLowerCase()}`;
  s.useBreadcrumbs([{ label: `${r}s`, href: n }, { label: d }]);
  const [m, x] = Q(), o = N.useForm({ title: a?.title ?? "", handle: a?.handle ?? "" }), [g, i] = $.useState(a !== null), [u, S] = $.useState(() => lt(a?.fields)), b = (h) => l.find((M) => M.type === h)?.hasChildren === !0, f = o.errors, [w, v] = $.useState(() => JSON.stringify(u)), y = o.isDirty || JSON.stringify(u) !== w, D = () => {
    o.setDefaults(), v(JSON.stringify(u));
  }, p = () => {
    o.processing || (o.transform((h) => ({
      ...a ? { title: h.title } : h,
      fields: nt(u, b)
    })), a ? o.put(`${n}/${a.handle}`, { preserveScroll: !0, onSuccess: D }) : o.post(n, { onSuccess: D }));
  }, k = (h) => {
    h.preventDefault(), p();
  };
  s.useUnsavedChanges(y, p);
  const T = () => a && m(
    `Delete the ${r.toLowerCase()} "${a.title}"? Content keeps its values.`,
    () => N.router.delete(`${n}/${a.handle}`, { preserveScroll: !0 })
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: k, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: d }),
    x,
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: d,
        back: { href: n, label: `Back to ${r.toLowerCase()}s` },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          a && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", size: "icon", className: "cms:text-destructive", "aria-label": `Delete ${d}`, onClick: T, children: /* @__PURE__ */ e.jsx(V, {}) }),
          /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: o.processing, children: [
            o.processing && /* @__PURE__ */ e.jsx(se, { className: "cms:animate-spin" }),
            a ? "Save" : `Create ${r.toLowerCase()}`
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(z, { message: f.blueprint ?? f.fieldset }),
    /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsxs(s.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "title", children: "Title" }),
        /* @__PURE__ */ e.jsx(s.Input, { id: "title", value: o.data.title, required: !0, onChange: (h) => {
          o.setData((M) => ({ ...M, title: h.target.value, handle: g ? M.handle : st(h.target.value) }));
        } }),
        /* @__PURE__ */ e.jsx(z, { message: f.title })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "handle", children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            id: "handle",
            className: "cms:font-mono",
            value: o.data.handle,
            disabled: a !== null,
            required: !0,
            onChange: (h) => {
              i(!0), o.setData("handle", tt(h.target.value));
            }
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: a ? "Set when it was created." : "Lowercase letters, digits and underscores. It can't change later." }),
        /* @__PURE__ */ e.jsx(z, { message: f.handle })
      ] })
    ] }) }),
    c.length > 0 && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      "Used by ",
      c.join(", "),
      ". Changes show there at once."
    ] }),
    /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-3", "aria-labelledby": "fields-heading", children: [
      /* @__PURE__ */ e.jsx("h2", { id: "fields-heading", className: "cms:text-lg cms:font-medium", children: "Fields" }),
      /* @__PURE__ */ e.jsx(it, { fields: u, onChange: S, types: l, errors: ie(f, "fields") }),
      /* @__PURE__ */ e.jsx(z, { message: f.fields })
    ] })
  ] });
}
function ot({ noun: t, base: a, rows: l, intro: c }) {
  const r = `${t}s`;
  s.useBreadcrumbs([{ label: r }]);
  const [n, d] = Q();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: r }),
    d,
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
        l.some((m) => m.usedBy) && /* @__PURE__ */ e.jsx(s.TableHead, { children: "Used by" }),
        /* @__PURE__ */ e.jsx(s.TableHead, { className: "cms:w-12", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: "Actions" }) })
      ] }) }),
      /* @__PURE__ */ e.jsxs(s.TableBody, { children: [
        l.length === 0 && /* @__PURE__ */ e.jsx(s.TableRow, { children: /* @__PURE__ */ e.jsxs(s.TableCell, { colSpan: 5, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: [
          "No ",
          r.toLowerCase(),
          " yet."
        ] }) }),
        l.map((m) => /* @__PURE__ */ e.jsxs(s.TableRow, { children: [
          /* @__PURE__ */ e.jsx(s.TableCell, { children: /* @__PURE__ */ e.jsx(N.Link, { href: `${a}/${m.handle}/edit`, className: "cms:font-medium cms:hover:underline", children: m.title }) }),
          /* @__PURE__ */ e.jsx(s.TableCell, { children: /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: m.handle }) }),
          /* @__PURE__ */ e.jsx(s.TableCell, { children: m.fields }),
          m.usedBy && /* @__PURE__ */ e.jsx(s.TableCell, { className: "cms:text-muted-foreground", children: m.usedBy.join(", ") || "—" }),
          /* @__PURE__ */ e.jsx(s.TableCell, { children: /* @__PURE__ */ e.jsx(
            s.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Delete ${m.title}`,
              onClick: () => n(
                `Delete the ${t.toLowerCase()} "${m.title}"? Content keeps its values.`,
                () => N.router.delete(`${a}/${m.handle}`, { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(V, {})
            }
          ) })
        ] }, m.id))
      ] })
    ] }) })
  ] });
}
function ha({ blueprints: t }) {
  const a = N.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(z, { message: a.blueprint }),
    /* @__PURE__ */ e.jsx(
      ot,
      {
        noun: "Blueprint",
        base: _("cms/blueprints"),
        rows: t,
        intro: "The fields editors fill in, for each kind of content."
      }
    )
  ] });
}
const Ge = (t) => `resources/views/${t.replace(/\./g, "/")}.blade.php`;
function dt({ example: t, fallbacks: a }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1 cms:text-xs cms:leading-relaxed cms:text-muted-foreground", children: [
    /* @__PURE__ */ e.jsxs("p", { children: [
      "A Blade view: ",
      /* @__PURE__ */ e.jsx("code", { className: "cms:text-foreground", children: t }),
      " is ",
      /* @__PURE__ */ e.jsx("code", { className: "cms:break-all", children: Ge(t) }),
      "."
    ] }),
    /* @__PURE__ */ e.jsx("p", { children: "Empty: the first that exists of" }),
    /* @__PURE__ */ e.jsxs("ol", { className: "cms:ml-4 cms:list-decimal", children: [
      a.map((l) => /* @__PURE__ */ e.jsx("li", { children: l.includes(" ") ? l : /* @__PURE__ */ e.jsx("code", { className: "cms:break-all", children: Ge(l) }) }, l)),
      /* @__PURE__ */ e.jsx("li", { children: "the built-in template" })
    ] })
  ] });
}
const Je = { preserveScroll: !0, preserveState: !0 };
function xa({ entryId: t, comments: a }) {
  const [l, c] = $.useState(null), [r, n] = $.useState(""), [d, m] = $.useState(!1), x = (g, i) => N.router.post(_(`cms/comments/${g}/status`), { status: i }, Je), o = (g) => N.router.post(_(`cms/comments/${g}/reply`), { body: r }, {
    ...Je,
    onStart: () => m(!0),
    onFinish: () => m(!1),
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
        a.latest.map((g) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5 cms:border-t cms:border-border/70 cms:pt-3 cms:first-of-type:border-t-0 cms:first-of-type:pt-0", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium", children: g.author }),
            g.status === "pending" && /* @__PURE__ */ e.jsx(s.Badge, { variant: "outline", children: "Pending" })
          ] }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:line-clamp-3 cms:break-words cms:whitespace-pre-line", children: g.excerpt }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
            G(g.createdAt),
            g.reply ? " · a reply" : ""
          ] }),
          a.canModerate && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-1", children: [
            g.status === "pending" && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", size: "sm", onClick: () => x(g.id, "approved"), children: [
              /* @__PURE__ */ e.jsx(xe, {}),
              " Approve"
            ] }),
            /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => x(g.id, "spam"), children: [
              /* @__PURE__ */ e.jsx(Te, {}),
              " Spam"
            ] }),
            /* @__PURE__ */ e.jsxs(
              s.Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                "aria-expanded": l === g.id,
                onClick: () => {
                  c(l === g.id ? null : g.id), n("");
                },
                children: [
                  /* @__PURE__ */ e.jsx(Hs, {}),
                  " Reply"
                ]
              }
            )
          ] }),
          l === g.id && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              s.Textarea,
              {
                "aria-label": `Reply to ${g.author}`,
                rows: 3,
                value: r,
                onChange: (i) => n(i.target.value)
              }
            ),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
              /* @__PURE__ */ e.jsx(s.Button, { type: "button", size: "sm", disabled: r.trim() === "" || d, onClick: () => o(g.id), children: "Post reply" }),
              /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => c(null), children: "Cancel" })
            ] })
          ] })
        ] }, g.id)),
        /* @__PURE__ */ e.jsx("a", { href: _(`cms/comments?entry=${t}`), className: "cms:text-sm cms:font-medium cms:underline-offset-4 cms:hover:underline", children: "All comments on this entry" })
      ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Skeleton, { className: "cms:h-10" }),
        /* @__PURE__ */ e.jsx(s.Skeleton, { className: "cms:h-10" })
      ] })
    }
  );
}
function Fe({ fields: t, values: a, onChange: l, errors: c, storageKey: r, shared: n = [], sharedValues: d = {}, sharedNote: m, disabled: x = !1 }) {
  const o = [], g = { ...d, ...a };
  for (const u of t.filter((S) => Ee(S, g))) {
    const S = o[o.length - 1];
    u.type === "group" ? o.push(u) : Array.isArray(S) ? S.push(u) : o.push([u]);
  }
  const i = m ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: m }) : null;
  return /* @__PURE__ */ e.jsx(e.Fragment, { children: o.map((u) => {
    if (Array.isArray(u))
      return /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsx(s.CardContent, { children: /* @__PURE__ */ e.jsx("fieldset", { disabled: x, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: u.map((w) => n.includes(w.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(ee, { id: `data-${w.handle}`, field: w, content: !0, value: d[w.handle], errors: {}, onChange: () => {
        } }),
        i
      ] }, w.handle) : /* @__PURE__ */ e.jsx(
        ee,
        {
          id: `data-${w.handle}`,
          field: w,
          content: !0,
          value: a[w.handle],
          errors: q(c, `data.${w.handle}`),
          onChange: (v) => l(w.handle, v)
        },
        w.handle
      )) }) }) }, `fields-${u[0]?.handle ?? ""}`);
    const S = n.includes(u.handle), b = (S ? d : a)[u.handle], f = q(c, `data.${u.handle}`);
    return /* @__PURE__ */ e.jsx(
      s.CollapsibleCard,
      {
        title: Me(u),
        titleClassName: "cms:text-base",
        description: u.instructions ?? void 0,
        storageKey: `${r}:${u.handle}`,
        hasErrors: !S && le(c, `data.${u.handle}`),
        children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: S || x, role: "group", "aria-label": Me(u), className: "cms:flex cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(
            te,
            {
              bare: !0,
              fields: u.fields ?? [],
              id: `data-${u.handle}`,
              content: !0,
              errors: S ? {} : f,
              value: b && typeof b == "object" && !Array.isArray(b) ? b : {},
              onChange: (w) => l(u.handle, w)
            }
          ),
          S && i,
          /* @__PURE__ */ e.jsx(z, { message: S ? void 0 : f[""] })
        ] })
      },
      u.handle
    );
  }) });
}
const He = [
  { handle: "title", type: "text", label: "Meta title", instructions: "Empty: the title.", config: { max: 255 } },
  { handle: "description", type: "textarea", label: "Meta description", instructions: "A sentence or two for search results.", config: { max: 500 } },
  { handle: "canonical", type: "text", label: "Canonical URL", instructions: "Only if this page copies another: that page's address. Empty: this page.", config: { max: 2e3 } },
  { handle: "image", type: "media", label: "Open Graph image", instructions: "Shown when the page is shared.", config: { types: ["image"] } },
  { handle: "noindex", type: "toggle", label: "Hide from search engines (noindex)" }
];
function Ye(t) {
  return t.length === 0 ? "" : ` It's used by ${t.slice(0, 5).map((l) => l.label).join("; ")}${t.length > 5 ? ` and ${t.length - 5} more` : ""}: those links will show nothing.`;
}
function pa(t) {
  const { entry: a } = t;
  return /* @__PURE__ */ e.jsx(ga, { ...t }, a ? `${a.id}:${a.locale}:${a.version}:${a.status}:${a.trashed}:${a.publishedAt}` : "new");
}
function ga({ collection: t, fields: a, locales: l = [], shared: c = [], sharedValues: r = {}, entry: n, values: d, revisions: m, comments: x, termLabels: o, usedBy: g = [], undoRestore: i = null, machineTranslate: u = null, settings: S, blueprints: b = [], can: f }) {
  const w = _(`cms/collections/${t.handle}/entries`), v = n ? _(`cms/entries/${n.id}`) : w, y = n ? d.title : "New entry";
  s.useBreadcrumbs([{ label: t.title, href: w }, { label: y }]);
  const [D, p] = Q(), [k, T] = $.useState(!1), h = N.useForm({ ...d, seo: d.seo ?? {}, locale: n?.locale ?? null, version: n?.version ?? null, publish: !1, published_at: null }), M = n ? { locale: n.locale } : {}, E = l.find((B) => B.main)?.code, A = h.errors, C = n !== null && n.status !== "draft" && !n.hasUnpublishedChanges && !h.isDirty, I = n === null ? f.create : f.update && !n.trashed, F = (B = !1, W = null) => {
    h.transform((j) => ({ ...j, publish: B, published_at: W })), n ? h.put(v, { preserveScroll: !0, onSuccess: () => T(!1) }) : h.post(v);
  }, ae = () => {
    h.transform((B) => ({ ...B, version: null, publish: !1, published_at: null })), h.put(v, { preserveScroll: !0 });
  }, O = s.useEditLock({
    type: "cms.entry",
    id: n?.id,
    locale: n?.locale,
    enabled: n !== null && I,
    noun: "entry",
    leaveTo: w,
    getUnsaved: () => h.isDirty ? { title: h.data.title, slug: h.data.slug, data: h.data.data, seo: h.data.seo } : null
  }), U = I && !O.readOnly, me = async (B) => {
    const W = await O.loadKept(B);
    h.setData((j) => ({ ...j, title: W.title ?? j.title, slug: W.slug ?? j.slug, data: W.data ?? j.data, seo: W.seo ?? j.seo }));
  };
  s.useUnsavedChanges(h.isDirty && !O.takenOver, U ? () => h.processing || F() : void 0);
  const ce = (B = null) => {
    f.update ? F(!0, B) : n && N.router.post(`${v}/publish`, { ...M, published_at: B }, { preserveScroll: !0, onSuccess: () => T(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (B) => {
    B.preventDefault(), F();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: y }),
    p,
    O.dialogs,
    /* @__PURE__ */ e.jsxs(
      s.PageHeader,
      {
        title: y,
        back: { href: w, label: `Back to ${t.title}` },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          n && !n.trashed && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(
            "a",
            {
              href: n.previewUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              title: h.isDirty ? "Shows the saved draft: save first to see your changes." : "Shows the saved draft.",
              children: [
                /* @__PURE__ */ e.jsx(Pt, {}),
                " Preview"
              ]
            }
          ) }),
          n?.url && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: n.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(ne, {}),
            " View page"
          ] }) }),
          n?.trashed && f.delete && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", onClick: () => N.router.post(`${v}/restore`, {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(pe, {}),
            " Restore"
          ] }),
          n?.trashed && f.delete && /* @__PURE__ */ e.jsxs(
            s.Button,
            {
              type: "button",
              variant: "outline",
              className: "cms:text-destructive",
              onClick: () => D(
                `Delete "${d.title}" for good, in every language, with its revisions? This can't be undone.${Ye(g)}`,
                () => N.router.delete(`${v}/force`, { data: g.length > 0 ? { force: 1 } : {} })
              ),
              children: [
                /* @__PURE__ */ e.jsx(V, {}),
                " Delete for good"
              ]
            }
          ),
          n && !n.trashed && (f.create || f.delete && !O.readOnly || U && u !== null) && /* @__PURE__ */ e.jsxs(s.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(s.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", size: "icon", "aria-label": "More actions", children: /* @__PURE__ */ e.jsx(ws, {}) }) }),
            /* @__PURE__ */ e.jsxs(s.DropdownMenuContent, { align: "end", className: "cms:min-w-52", children: [
              U && u !== null && /* @__PURE__ */ e.jsxs(
                s.DropdownMenuItem,
                {
                  disabled: h.processing || h.isDirty,
                  onSelect: () => N.router.post(_(`cms/entries/${n.id}/translations/${n.locale}/translate`), { version: n.version }, { preserveScroll: !0 }),
                  children: [
                    /* @__PURE__ */ e.jsx(Ot, {}),
                    " ",
                    h.isDirty ? "Save to translate" : `Translate from ${l.find((B) => B.main)?.name ?? (E ? P(E) : "the main language")}`
                  ]
                }
              ),
              f.create && /* @__PURE__ */ e.jsxs(s.DropdownMenuItem, { onSelect: () => N.router.post(`${v}/duplicate`), children: [
                /* @__PURE__ */ e.jsx(Ft, {}),
                " Duplicate"
              ] }),
              f.delete && !O.readOnly && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(s.DropdownMenuSeparator, {}),
                /* @__PURE__ */ e.jsxs(
                  s.DropdownMenuItem,
                  {
                    className: "cms:text-destructive",
                    onSelect: () => D(`Move "${d.title}" to the trash? It comes off the site; you can restore it.${Ye(g)}`, () => N.router.delete(v)),
                    children: [
                      /* @__PURE__ */ e.jsx(V, {}),
                      " Move to trash"
                    ]
                  }
                )
              ] })
            ] })
          ] }),
          U && /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", variant: n && f.publish ? "outline" : "default", disabled: h.processing, children: [
            h.processing && /* @__PURE__ */ e.jsx(se, { className: "cms:animate-spin" }),
            n ? "Save draft" : "Create draft"
          ] }),
          n && !n.trashed && f.publish && !O.readOnly && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex", children: [
            /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: C ? "outline" : "default", className: "cms:rounded-r-none cms:disabled:opacity-100", disabled: h.processing || C, onClick: () => ce(), children: [
              C && /* @__PURE__ */ e.jsx(xe, { className: "cms:text-emerald-600 cms:dark:text-emerald-400" }),
              n.status === "draft" ? "Publish" : C ? "Published" : "Publish changes"
            ] }),
            /* @__PURE__ */ e.jsxs(s.DropdownMenu, { children: [
              /* @__PURE__ */ e.jsx(s.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(s.Button, { type: "button", size: "icon", variant: C ? "outline" : "default", className: C ? "cms:-ml-px cms:rounded-l-none" : "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": "More publishing options", children: /* @__PURE__ */ e.jsx(gs, {}) }) }),
              /* @__PURE__ */ e.jsxs(s.DropdownMenuContent, { align: "end", children: [
                /* @__PURE__ */ e.jsxs(s.DropdownMenuItem, { onSelect: () => T(!0), children: [
                  /* @__PURE__ */ e.jsx(hs, {}),
                  " Publish on a date…"
                ] }),
                n.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  /* @__PURE__ */ e.jsx(s.DropdownMenuSeparator, {}),
                  /* @__PURE__ */ e.jsx(s.DropdownMenuItem, { onSelect: () => N.router.post(`${v}/unpublish`, M, { preserveScroll: !0 }), children: "Unpublish" })
                ] })
              ] })
            ] })
          ] })
        ] }),
        children: [
          n && /* @__PURE__ */ e.jsx(s.Badge, { variant: n.status === "published" ? "success" : "secondary", children: n.trashed ? "In the trash" : X(n.status) }),
          h.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
        ]
      }
    ),
    n && l.length > 1 && /* @__PURE__ */ e.jsx(
      fa,
      {
        entryUrl: v,
        editUrl: `${w}/${n.id}/edit`,
        current: n.locale,
        locales: l,
        canAdd: f.create && !n.trashed,
        canRemove: f.delete && !n.isMain && !n.trashed,
        onRemove: () => D(
          `Remove the ${P(n.locale)} translation of "${d.title}"? Its revisions go with it.`,
          () => N.router.delete(`${v}/translations/${n.locale}`)
        )
      }
    ),
    /* @__PURE__ */ e.jsx(s.ViewingNotice, { by: O.viewingBy }),
    /* @__PURE__ */ e.jsx(s.KeptEditsNotice, { kept: O.kept, disabled: !U, onLoad: (B) => {
      me(B);
    }, onDiscard: (B) => {
      O.discardKept(B);
    } }),
    A.version && /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: [
      /* @__PURE__ */ e.jsx("span", { children: A.version }),
      /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", size: "sm", onClick: () => N.router.reload(), children: "Load theirs" }),
        /* @__PURE__ */ e.jsx(
          s.Button,
          {
            type: "button",
            variant: "destructive",
            size: "sm",
            disabled: h.processing,
            onClick: () => D("Save your version over theirs? Their changes are replaced (their earlier published versions stay in the revisions).", ae),
            children: "Save mine anyway"
          }
        )
      ] })
    ] }),
    (A.entry || A.published_at) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: A.entry ?? A.published_at }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_18rem]", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsx(s.CardContent, { children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: !U, className: "cms:grid cms:gap-4 cms:md:grid-cols-[2fr_1fr]", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "title", children: "Title" }),
            /* @__PURE__ */ e.jsx(
              s.Input,
              {
                id: "title",
                value: h.data.title,
                "aria-invalid": A.title !== void 0,
                onChange: (B) => h.setData("title", B.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(z, { message: A.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "slug", children: "Slug" }),
            /* @__PURE__ */ e.jsx(
              s.Input,
              {
                id: "slug",
                className: "cms:font-mono",
                value: h.data.slug,
                placeholder: "Made from the title",
                "aria-invalid": A.slug !== void 0,
                onChange: (B) => h.setData("slug", B.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(z, { message: A.slug })
          ] })
        ] }) }) }),
        /* @__PURE__ */ e.jsx(Xs.Provider, { value: Array.isArray(o) || !o ? {} : o, children: /* @__PURE__ */ e.jsx(
          Fe,
          {
            disabled: !U,
            fields: a,
            values: h.data.data,
            errors: A,
            storageKey: `cms:entry:${t.handle}`,
            shared: c,
            sharedValues: r,
            sharedNote: `Shared by all languages: edit it in ${E ? P(E) : "the main language"}.`,
            onChange: (B, W) => h.setData("data", { ...h.data.data, [B]: W })
          }
        ) }),
        /* @__PURE__ */ e.jsx(s.CollapsibleCard, { title: "SEO", description: "How this entry appears in search results and shared links.", titleClassName: "cms:text-base", storageKey: "cms:entry:seo", hasErrors: le(A, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !U, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(
          te,
          {
            bare: !0,
            id: "seo",
            fields: He,
            value: h.data.seo,
            errors: q(A, "seo"),
            onChange: (B) => h.setData("seo", B)
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
            ja,
            {
              status: n.status,
              publishedAt: n.publishedAt,
              processing: h.processing,
              onPublish: (B) => ce(B),
              onUnpublish: () => N.router.post(`${v}/unpublish`, M, { preserveScroll: !0 })
            },
            n.publishedAt ?? "none"
          ),
          n.status !== "draft" && n.hasUnpublishedChanges && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The draft has changes the site doesn't show yet." }),
          l.find((B) => B.code === n.locale)?.outdated && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-amber-700 cms:dark:text-amber-400", children: [
            "The ",
            E ? P(E) : "main",
            " version changed since this translation was last saved."
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs(s.CollapsibleCard, { title: "Used by", titleClassName: "cms:text-base", storageKey: "cms:entry:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          g.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "No other content links here." }),
          g.map((B) => /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
            B.url ? /* @__PURE__ */ e.jsx("a", { href: B.url, className: "cms:block cms:truncate cms:underline-offset-4 cms:hover:underline", children: B.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:truncate", children: B.label }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:font-mono cms:text-xs cms:text-muted-foreground", children: B.field })
          ] }, `${B.label}:${B.field}`))
        ] }),
        S && /* @__PURE__ */ e.jsx(va, { entryUrl: v, collection: t, settings: S, blueprints: b, disabled: !U }),
        x !== null && t.comments && /* @__PURE__ */ e.jsx(xa, { entryId: n.id, comments: x }),
        /* @__PURE__ */ e.jsxs(s.CollapsibleCard, { title: "Revisions", titleClassName: "cms:text-base", storageKey: "cms:entry:revisions", contentClassName: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
          i !== null && f.update && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", size: "sm", onClick: () => N.router.post(_(`cms/entries/${n.id}/translations/${n.locale}/undo-restore`), {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(Be, {}),
            " Undo the restore"
          ] }),
          /* @__PURE__ */ e.jsx(N.Deferred, { data: "revisions", fallback: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(s.Skeleton, { className: "cms:h-8" }),
            /* @__PURE__ */ e.jsx(s.Skeleton, { className: "cms:h-8" })
          ] }), children: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            (m ?? []).length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "Each publish keeps one." }),
            (m ?? []).map((B) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
                /* @__PURE__ */ e.jsx("div", { className: "cms:truncate", children: B.title }),
                /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: G(B.createdAt) })
              ] }),
              f.update && !n.trashed && /* @__PURE__ */ e.jsx(
                s.Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  onClick: () => N.router.post(_(`cms/entries/${n.id}/revisions/${B.id}/restore`), {}, { preserveScroll: !0 }),
                  children: "Restore"
                }
              )
            ] }, B.id))
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(
      ba,
      {
        open: k,
        onClose: () => T(!1),
        processing: h.processing,
        current: n?.publishedAt ?? null,
        onSchedule: (B) => ce(B)
      }
    )
  ] });
}
function fa({ entryUrl: t, editUrl: a, current: l, locales: c, canAdd: r, canRemove: n, onRemove: d }) {
  const m = c.filter((o) => o.status !== null), x = c.filter((o) => o.status === null);
  return /* @__PURE__ */ e.jsxs("nav", { "aria-label": "Languages", className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("div", { className: "cms:inline-flex cms:items-center cms:gap-0.5 cms:rounded-md cms:bg-muted cms:p-0.5", children: m.map((o) => {
      const g = o.code === l, i = `${o.name ?? P(o.code)}${o.main ? " (main)" : ""}: ${o.status ? X(o.status) : ""}${o.outdated ? ", outdated (the main language changed since)" : ""}`;
      return /* @__PURE__ */ e.jsxs(
        "button",
        {
          type: "button",
          title: i,
          "aria-label": i,
          "aria-current": g ? "page" : void 0,
          onClick: () => !g && N.router.get(a, { locale: o.code }),
          className: `cms:relative cms:inline-flex cms:h-7 cms:min-w-10 cms:items-center cms:justify-center cms:gap-1.5 cms:rounded cms:px-2.5 cms:text-xs cms:font-semibold cms:tracking-wide cms:uppercase cms:transition-colors ${g ? "cms:bg-card cms:text-foreground cms:shadow-xs" : "cms:text-muted-foreground cms:hover:text-foreground"}`,
          children: [
            o.code,
            (o.outdated || o.status === "published") && /* @__PURE__ */ e.jsx("span", { "aria-hidden": !0, className: `cms:size-1.5 cms:rounded-full ${o.outdated ? "cms:bg-amber-500" : "cms:bg-emerald-500"}` })
          ]
        },
        o.code
      );
    }) }),
    r && x.map((o) => /* @__PURE__ */ e.jsxs(
      s.Button,
      {
        type: "button",
        variant: "outline",
        size: "sm",
        className: "cms:h-8 cms:border-dashed cms:text-xs cms:uppercase",
        title: `Add ${o.name ?? P(o.code)}`,
        onClick: () => N.router.post(`${t}/translations`, { locale: o.code }),
        children: [
          /* @__PURE__ */ e.jsx(K, {}),
          " ",
          o.code
        ]
      },
      o.code
    )),
    n && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:ml-auto cms:text-destructive", onClick: d, children: "Remove this language" })
  ] });
}
function ja({ status: t, publishedAt: a, processing: l, onPublish: c, onUnpublish: r }) {
  const [n, d] = $.useState(a ? Zs(new Date(a)) : ""), m = n === "" ? null : new Date(n), x = m !== null && m.getTime() > Date.now(), o = (u) => u === null ? null : Math.floor(u.getTime() / 6e4), g = o(m) !== o(a ? new Date(a) : null), i = t === "draft" ? x ? "Schedule" : "Publish" : x ? t === "scheduled" ? "Reschedule" : "Schedule" : "Change date";
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:border-t cms:border-border/60 cms:pt-3", children: [
    /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "entry-published-at", children: "Publish date" }),
    /* @__PURE__ */ e.jsx(s.DatePicker, { id: "entry-published-at", withTime: !0, className: "cms:max-w-none", value: n || null, onChange: (u) => d(u ?? "") }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t === "draft" ? "Empty: now. A date in the future schedules it." : "The date shown as published. A date in the future takes it off the site until then." }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: [
      (t === "draft" || g) && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", size: "sm", disabled: l, onClick: () => c(m?.toISOString() ?? null), children: [
        /* @__PURE__ */ e.jsx(hs, {}),
        " ",
        i
      ] }),
      t !== "draft" && /* @__PURE__ */ e.jsx(s.Button, { type: "button", size: "sm", variant: "outline", disabled: l, onClick: r, children: "Unpublish" })
    ] })
  ] });
}
function ba({ open: t, onClose: a, onSchedule: l, current: c, processing: r }) {
  const [n, d] = $.useState("");
  return $.useEffect(() => {
    t && d(Zs(c ? new Date(c) : new Date(Date.now() + 864e5)));
  }, [t, c]), /* @__PURE__ */ e.jsx(s.Dialog, { open: t, onOpenChange: (m) => !m && a(), children: /* @__PURE__ */ e.jsxs(s.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(s.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(s.DialogTitle, { children: "Publish on a date" }),
      /* @__PURE__ */ e.jsx(s.DialogDescription, { children: "The entry goes live then; a date in the past publishes it now with that date." })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "published-at", children: "Date and time" }),
      /* @__PURE__ */ e.jsx(s.DatePicker, { id: "published-at", withTime: !0, required: !0, className: "cms:max-w-none", value: n || null, onChange: (m) => d(m ?? "") }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "In your time zone." })
    ] }),
    /* @__PURE__ */ e.jsxs(s.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", onClick: a, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", disabled: n === "" || r, onClick: () => l(new Date(n).toISOString()), children: "Publish" })
    ] })
  ] }) });
}
function va({ entryUrl: t, collection: a, settings: l, blueprints: c, disabled: r }) {
  const n = c.length > 1 ? l.blueprint ?? c[0].handle : void 0, d = N.useForm({
    parent_id: l.parentId,
    template: l.template ?? "",
    comments_closed: l.commentsClosed === !0,
    ...n !== void 0 ? { blueprint: n } : {}
  }), m = d.errors;
  return /* @__PURE__ */ e.jsx(s.CollapsibleCard, { title: "Page settings", titleClassName: "cms:text-base", storageKey: "cms:entry:page-settings", hasErrors: Object.keys(m).length > 0, children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: r, className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: [
    a.hierarchical && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "parent", children: "Parent" }),
      /* @__PURE__ */ e.jsx(
        je,
        {
          id: "parent",
          multiple: !1,
          max: 1,
          collections: [a.handle],
          invalid: m.parent_id !== void 0,
          value: d.data.parent_id,
          onChange: (x) => d.setData("parent_id", typeof x == "number" ? x : null)
        }
      ),
      /* @__PURE__ */ e.jsx(z, { message: m.parent_id })
    ] }),
    c.length > 1 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "blueprint", children: "Blueprint" }),
      /* @__PURE__ */ e.jsxs(s.Select, { value: d.data.blueprint, onValueChange: (x) => d.setData("blueprint", x), children: [
        /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: "blueprint", "aria-invalid": m.blueprint !== void 0, children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(s.SelectContent, { children: c.map((x) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: x.handle, children: x.title }, x.handle)) })
      ] }),
      d.data.blueprint !== n && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The fields change in every language; values of fields both blueprints have are kept. Save your draft first: the editor reloads." }),
      /* @__PURE__ */ e.jsx(z, { message: m.blueprint })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "template", children: "Template" }),
      /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: "template",
          className: "cms:font-mono",
          placeholder: `cms.${a.handle}-landing`,
          value: d.data.template,
          onChange: (x) => d.setData("template", x.target.value),
          "aria-invalid": m.template !== void 0
        }
      ),
      /* @__PURE__ */ e.jsx(dt, { example: `cms.${a.handle}-landing`, fallbacks: ["the collection's template, if set", `cms.${a.handle}`, "cms.entry"] }),
      /* @__PURE__ */ e.jsx(z, { message: m.template })
    ] }),
    a.comments && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(s.Switch, { id: "comments-open", checked: !d.data.comments_closed, onCheckedChange: (x) => d.setData("comments_closed", !x) }),
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "comments-open", children: "Accept new comments" }),
      /* @__PURE__ */ e.jsx("a", { href: _(`cms/comments?entry=${t.split("/").slice(-1)[0]}`), className: "cms:ml-auto cms:text-muted-foreground cms:underline-offset-4 hover:cms:underline", children: "Comments" })
    ] }),
    d.isDirty && /* @__PURE__ */ e.jsx(
      s.Button,
      {
        type: "button",
        size: "sm",
        disabled: d.processing,
        onClick: () => d.put(`${t}/settings`, { preserveScroll: !0, preserveState: d.data.blueprint === n, onSuccess: () => d.setDefaults() }),
        children: "Save settings"
      }
    )
  ] }) });
}
function Le(t, a) {
  const l = t[a]?.depth ?? 0;
  let c = a + 1;
  for (; c < t.length && t[c].depth > l; ) c++;
  return c;
}
function oe(t, a) {
  const l = a < 0 ? 0 : a + 1, c = a < 0 ? t.length : Le(t, a), r = a < 0 ? 0 : (t[a]?.depth ?? 0) + 1, n = [];
  for (let d = l; d < c; d++)
    t[d].depth === r && n.push(d);
  return n;
}
function mt(t, a, l) {
  const c = oe(t, a);
  if (l.length !== c.length || [...l].sort((m, x) => m - x).some((m, x) => m !== c[x]) || c.length === 0) return t.slice();
  const r = c[0], n = Le(t, c[c.length - 1]), d = l.flatMap((m) => t.slice(m, Le(t, m)));
  return [...t.slice(0, r), ...d, ...t.slice(n)];
}
function ya(t, a, l) {
  const c = t.find((n) => n.id === a);
  if (!c) return [];
  const r = l(c);
  return t.filter((n) => l(n) === r).map((n) => n.id);
}
function Na({ collection: t, rows: a }) {
  const [l, c] = $.useState(a);
  $.useEffect(() => c(a), [a]);
  const r = (n, d) => {
    const m = n[d];
    if (!m) return;
    const x = m.parentId ?? null, o = ya(n, m.id, (g) => g.parentId ?? null);
    c(n), N.router.post(
      _("cms/entries/reorder"),
      { collection: t, ids: o, parent_id: x },
      { preserveScroll: !0, preserveState: !0, onError: () => c(a) }
    );
  };
  return /* @__PURE__ */ e.jsx(s.Card, { className: "cms:p-2", children: /* @__PURE__ */ e.jsx(s.SortableList, { items: l, getId: (n) => n.id, onReorder: (n, d, m) => r(n, m), className: "cms:gap-1", children: (n, { handle: d }) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-lg cms:border cms:border-border/70 cms:bg-card cms:p-2 cms:text-sm", children: [
    /* @__PURE__ */ e.jsx(s.SortableHandle, { ...d, label: `Move ${n.title}` }),
    /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium", children: n.title }),
    n.parent && /* @__PURE__ */ e.jsxs("span", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", children: [
      "under ",
      n.parent
    ] }),
    /* @__PURE__ */ e.jsx(s.Badge, { variant: n.status === "published" ? "success" : "secondary", children: X(n.status) })
  ] }) }) });
}
function Sa(t, a, l) {
  const c = { ...t, ...a }, r = Object.fromEntries(Object.entries(c.terms).filter(([, d]) => d !== "")), n = {};
  return c.search && (n.search = c.search), c.status && (n.status = c.status), c.author && (n.author = c.author), Object.keys(r).length > 0 && (n.terms = r), c.locale && c.locale !== l && (n.locale = c.locale), c.sort && (n.sort = c.sort), n.per_page = c.perPage, n;
}
function Ca(t) {
  const a = new URLSearchParams();
  for (const [l, c] of Object.entries(t))
    if (typeof c == "object")
      for (const [r, n] of Object.entries(c)) a.set(`${l}[${r}]`, n);
    else
      a.set(l, String(c));
  return a.toString();
}
function ka(t, a) {
  return t === a ? `-${a}` : t === `-${a}` ? "" : a;
}
function wa(t, a) {
  return t === a ? "asc" : t === `-${a}` ? "desc" : null;
}
function Qe(t) {
  return [t.search, t.status, t.author, ...Object.values(t.terms)].filter((a) => a !== "").length;
}
const Ce = "__all", $a = [
  { value: "draft", label: "Drafts" },
  { value: "published", label: "Published" },
  { value: "scheduled", label: "Scheduled" },
  { value: "trashed", label: "Trash" }
];
function Da(t) {
  const { collection: a, entries: l, query: c } = t;
  return s.useBreadcrumbs([{ label: a ? a.title : "Entries" }]), !a || !l || !c ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: "Entries" }),
    /* @__PURE__ */ e.jsx(s.PageHeader, { title: "Entries", description: "There are no collections yet. Create one under Structure → Collections, then come back to write its entries." })
  ] }) : /* @__PURE__ */ e.jsx(_a, { ...t, collection: a, entries: l, query: c });
}
function _a({
  collection: t,
  collections: a,
  entries: l,
  query: c,
  columns: r = [],
  filters: n = { authors: [], taxonomies: [], locales: [] },
  links: d = [],
  manualOrder: m = !1,
  perPageOptions: x = [10, 25, 50, 100],
  preferencesKey: o,
  can: g
}) {
  const i = _(`cms/collections/${t.handle}/entries`), u = n.locales[0] ?? c.locale, [S, b] = $.useState(c.search), [f, w] = $.useState([]), [v, y] = $.useState(!1), [D, p] = Q(), { setColumns: k, setPerPage: T } = s.useTablePreferences(o ?? `table.cms.entries.${t.handle}`, { columns: c.columns, perPage: c.perPage });
  $.useEffect(() => w([]), [l]);
  const h = c.status === "trashed", M = Qe(c) > 0, E = r.filter((j) => c.columns.includes(j.key)), A = (j = {}) => Sa(c, j, u), C = (j) => N.router.get(i, A(j), { preserveState: !0, preserveScroll: !0, replace: !0 });
  $.useEffect(() => {
    if (S === c.search) return;
    const j = window.setTimeout(() => C({ search: S }), 300);
    return () => window.clearTimeout(j);
  }, [S]);
  const I = h ? g?.delete ? [{ action: "restore", label: "Restore" }, { action: "delete", label: "Delete for good", danger: !0 }] : [] : [
    ...g?.publish ? [{ action: "publish", label: "Publish" }, { action: "unpublish", label: "Unpublish" }] : [],
    ...g?.delete ? [{ action: "trash", label: "Move to the trash", danger: !0 }] : []
  ], F = (j, H, R = !1) => {
    const ue = () => N.router.post(`${i}/bulk`, { action: j, ids: f }, { preserveScroll: !0 });
    R ? D(`${H}: ${f.length} ${f.length === 1 ? "entry" : "entries"}?${j === "delete" ? " This can't be undone." : ""}`, ue) : ue();
  }, ae = async (j) => {
    const H = new Set(c.columns);
    H.has(j) ? H.delete(j) : H.add(j), await k(r.map((R) => R.key).filter((R) => H.has(R))), N.router.reload({ only: ["entries", "query"] });
  }, O = () => {
    b(""), C({ search: "", status: "", author: "", terms: {} });
  }, U = m && !!g?.update, me = U && l !== null && l.lastPage <= 1 && l.data.length > 1, ce = 1 + E.length + (I.length > 0 ? 1 : 0) + (U ? 1 : 0), B = Ca(A()), W = [...new Set(d.map((j) => j.group))];
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: t.title }),
    p,
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: t.title,
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          d.length > 0 && /* @__PURE__ */ e.jsxs(s.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(s.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(s.Button, { variant: "outline", children: [
              /* @__PURE__ */ e.jsx(Et, {}),
              " Go to"
            ] }) }),
            /* @__PURE__ */ e.jsx(s.DropdownMenuContent, { align: "end", className: "cms:min-w-56", children: W.map((j, H) => /* @__PURE__ */ e.jsxs($.Fragment, { children: [
              H > 0 && /* @__PURE__ */ e.jsx(s.DropdownMenuSeparator, {}),
              /* @__PURE__ */ e.jsx(s.DropdownMenuLabel, { children: j }),
              d.filter((R) => R.group === j).map((R) => /* @__PURE__ */ e.jsx(s.DropdownMenuItem, { asChild: !0, children: R.external ? /* @__PURE__ */ e.jsxs("a", { href: R.href, target: "_blank", rel: "noopener noreferrer", children: [
                R.label,
                " ",
                /* @__PURE__ */ e.jsx(ne, { className: "cms:ml-auto" })
              ] }) : /* @__PURE__ */ e.jsx(N.Link, { href: R.href, children: R.label }) }, R.href))
            ] }, j)) })
          ] }),
          t.listing && !h && /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs(N.Link, { href: _(`cms/collections/${t.handle}/listing/edit`), children: [
            /* @__PURE__ */ e.jsx(Ut, {}),
            " Listing page"
          ] }) }),
          l.total > 0 && g?.export && /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: `${i}/export${B ? `?${B}` : ""}`, children: [
            /* @__PURE__ */ e.jsx(Ss, {}),
            " Export CSV"
          ] }) }),
          g?.create && !h && /* @__PURE__ */ e.jsx(s.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(N.Link, { href: `${i}/create`, children: [
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
            value: S,
            onChange: (j) => b(j.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(ke, { label: "Status", value: c.status, options: $a, onChange: (j) => C({ status: j }) }),
      n.authors.length > 0 && /* @__PURE__ */ e.jsx(ke, { label: "Author", value: c.author, options: n.authors, onChange: (j) => C({ author: j }) }),
      n.taxonomies.filter((j) => j.terms.length > 0).map((j) => /* @__PURE__ */ e.jsx(
        ke,
        {
          label: j.title,
          value: c.terms[j.handle] ?? "",
          options: j.terms.map((H) => ({ value: H.value, label: `${"— ".repeat(H.depth)}${H.label}` })),
          onChange: (H) => C({ terms: { ...c.terms, [j.handle]: H } })
        },
        j.handle
      )),
      n.locales.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: c.locale, onValueChange: (j) => C({ locale: j }), children: [
        /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-40", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(s.SelectContent, { children: n.locales.map((j) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: j, children: [
          P(j),
          j === u ? " (main)" : ""
        ] }, j)) })
      ] }),
      M && /* @__PURE__ */ e.jsxs(s.Button, { variant: "ghost", size: "sm", onClick: O, children: [
        /* @__PURE__ */ e.jsx(fe, {}),
        " Clear"
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:ml-auto cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
        f.length > 0 && I.length > 0 && /* @__PURE__ */ e.jsxs("div", { role: "toolbar", "aria-label": "Selected entries", className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsxs("span", { className: "cms:text-sm cms:text-muted-foreground", children: [
            f.length,
            " selected"
          ] }),
          I.map((j) => /* @__PURE__ */ e.jsx(s.Button, { size: "sm", variant: j.danger ? "destructive" : "outline", onClick: () => F(j.action, j.label, j.danger), children: j.label }, j.action))
        ] }),
        me && /* @__PURE__ */ e.jsxs(s.Button, { variant: v ? "secondary" : "outline", "aria-pressed": v, onClick: () => y(!v), children: [
          /* @__PURE__ */ e.jsx(os, {}),
          " ",
          v ? "Done" : "Reorder"
        ] }),
        r.length > 0 && /* @__PURE__ */ e.jsxs(s.DropdownMenu, { children: [
          /* @__PURE__ */ e.jsx(s.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(s.Button, { variant: "outline", children: [
            /* @__PURE__ */ e.jsx(At, {}),
            " Columns"
          ] }) }),
          /* @__PURE__ */ e.jsxs(s.DropdownMenuContent, { align: "end", className: "cms:max-h-96 cms:overflow-y-auto", children: [
            /* @__PURE__ */ e.jsx(s.DropdownMenuLabel, { children: "Columns" }),
            r.filter((j) => !j.field).map((j) => /* @__PURE__ */ e.jsx(
              s.DropdownMenuCheckboxItem,
              {
                checked: c.columns.includes(j.key),
                onSelect: (H) => H.preventDefault(),
                onCheckedChange: () => {
                  ae(j.key);
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
                  onSelect: (H) => H.preventDefault(),
                  onCheckedChange: () => {
                    ae(j.key);
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
    v && me ? /* @__PURE__ */ e.jsx(Na, { collection: t.handle, rows: l.data }) : /* @__PURE__ */ e.jsxs(s.Card, { className: "cms:gap-0 cms:overflow-hidden cms:py-0", children: [
      /* @__PURE__ */ e.jsxs(s.Table, { children: [
        /* @__PURE__ */ e.jsx(s.TableHeader, { className: "cms:bg-muted/60", children: /* @__PURE__ */ e.jsxs(s.TableRow, { className: "cms:hover:bg-transparent", children: [
          I.length > 0 && /* @__PURE__ */ e.jsx(s.TableHead, { className: "cms:w-10", children: /* @__PURE__ */ e.jsx(
            s.Checkbox,
            {
              "aria-label": "Select all on this page",
              checked: l.data.length > 0 && f.length === l.data.length,
              onCheckedChange: (j) => w(j ? l.data.map((H) => H.id) : [])
            }
          ) }),
          /* @__PURE__ */ e.jsx(Ze, { label: "Title", sortKey: "title", sort: c.sort, onSort: (j) => C({ sort: j }) }),
          E.map((j) => j.sortable ? /* @__PURE__ */ e.jsx(Ze, { label: j.label, sortKey: j.key, sort: c.sort, onSort: (H) => C({ sort: H }) }, j.key) : /* @__PURE__ */ e.jsx(s.TableHead, { children: j.label }, j.key)),
          U && /* @__PURE__ */ e.jsx(s.TableHead, { className: "cms:w-px", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: "Order" }) })
        ] }) }),
        /* @__PURE__ */ e.jsxs(s.TableBody, { children: [
          l.data.length === 0 && /* @__PURE__ */ e.jsx(s.TableRow, { className: "cms:hover:bg-transparent", children: /* @__PURE__ */ e.jsx(s.TableCell, { colSpan: ce, className: "cms:h-32 cms:text-center cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx(Ba, { trashed: h, filtered: Qe(h ? { ...c, status: "" } : c) > 0, canCreate: !!g?.create, createUrl: `${i}/create`, onClear: O }) }) }),
          l.data.map((j, H) => /* @__PURE__ */ e.jsxs(s.TableRow, { className: "sunrice-row-in", style: { "--i": H }, "data-state": f.includes(j.id) ? "selected" : void 0, children: [
            I.length > 0 && /* @__PURE__ */ e.jsx(s.TableCell, { children: /* @__PURE__ */ e.jsx(
              s.Checkbox,
              {
                "aria-label": `Select ${j.title}`,
                checked: f.includes(j.id),
                onCheckedChange: (R) => w(R ? [...f, j.id] : f.filter((ue) => ue !== j.id))
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
            E.map((R) => /* @__PURE__ */ e.jsx(s.TableCell, { className: R.key === "status" ? "" : "cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx("div", { className: "cms:max-w-72 cms:truncate", children: /* @__PURE__ */ e.jsx(Ta, { row: j, column: R, mainLocale: u }) }) }, R.key)),
            U && /* @__PURE__ */ e.jsx(s.TableCell, { className: "cms:w-px", children: /* @__PURE__ */ e.jsxs("span", { className: "cms:flex", children: [
              /* @__PURE__ */ e.jsx(s.Button, { variant: "ghost", size: "icon", "aria-label": `Move ${j.title} up`, onClick: () => N.router.post(_(`cms/entries/${j.id}/move`), { direction: "up" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(ms, {}) }),
              /* @__PURE__ */ e.jsx(s.Button, { variant: "ghost", size: "icon", "aria-label": `Move ${j.title} down`, onClick: () => N.router.post(_(`cms/entries/${j.id}/move`), { direction: "down" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(rs, {}) })
            ] }) })
          ] }, j.id))
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4 cms:border-t cms:px-6 cms:py-3 cms:text-sm cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-4", children: [
          /* @__PURE__ */ e.jsx("span", { children: l.total === 0 ? "No entries" : `${l.from}–${l.to} of ${l.total}` }),
          /* @__PURE__ */ e.jsxs(s.Select, { value: String(c.perPage), onValueChange: (j) => {
            T(Number(j)), C({ perPage: Number(j) });
          }, children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:h-8 cms:w-auto", "aria-label": "Entries per page", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(s.SelectContent, { children: x.map((j) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: String(j), children: [
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
              children: /* @__PURE__ */ e.jsx(Ie, {})
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
function Ze({ label: t, sortKey: a, sort: l, onSort: c }) {
  const r = wa(l, a);
  return /* @__PURE__ */ e.jsx(s.TableHead, { "aria-sort": r === "asc" ? "ascending" : r === "desc" ? "descending" : void 0, children: /* @__PURE__ */ e.jsxs(
    "button",
    {
      type: "button",
      onClick: () => c(ka(l, a)),
      className: "cms:-ml-2 cms:inline-flex cms:h-8 cms:items-center cms:gap-1 cms:rounded-md cms:px-2 cms:hover:bg-accent cms:hover:text-accent-foreground",
      children: [
        t,
        r === "asc" ? /* @__PURE__ */ e.jsx(ms, { className: "cms:size-3" }) : r === "desc" ? /* @__PURE__ */ e.jsx(rs, { className: "cms:size-3" }) : /* @__PURE__ */ e.jsx(os, { className: "cms:size-3 cms:opacity-40" })
      ]
    }
  ) });
}
function Ta({ row: t, column: a, mainLocale: l }) {
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
function Ba({ trashed: t, filtered: a, canCreate: l, createUrl: c, onClear: r }) {
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
function Pe({ message: t, processing: a, onSaveMine: l }) {
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
  return /* @__PURE__ */ e.jsx(La, { ...t }, `${t.locale}:${t.version}:${JSON.stringify([t.values, t.seo])}`);
}
function La({ collection: t, fields: a, locale: l, locales: c, shared: r, values: n, seo: d, version: m, can: x }) {
  const o = _(`cms/collections/${t.handle}/listing`), g = _(`cms/collections/${t.handle}/entries`);
  s.useBreadcrumbs([{ label: t.title, href: g }, { label: "Listing page" }]);
  const i = N.useForm({ locale: l, data: n, seo: d ?? {}, version: m }), u = i.errors, S = c[0], b = x.update, f = () => i.processing || i.put(o, { preserveScroll: !0 }), w = () => {
    i.transform((v) => ({ ...v, version: null })), i.put(o, { preserveScroll: !0 });
  };
  return s.useUnsavedChanges(i.isDirty, b ? f : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: (v) => {
    v.preventDefault(), f();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: `${t.title}: listing page` }),
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: `${t.title}: listing page`,
        back: { href: g, label: `Back to ${t.title}` },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          c.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: l, onValueChange: (v) => N.router.get(o, { locale: v }), children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(s.SelectContent, { children: c.map((v, y) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: v, children: [
              P(v),
              y === 0 ? " (main)" : ""
            ] }, v)) })
          ] }),
          t.url && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: t.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(ne, {}),
            " View"
          ] }) }),
          b && /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: i.processing, children: [
            i.processing && /* @__PURE__ */ e.jsx(se, { className: "cms:animate-spin" }),
            " Save"
          ] })
        ] }),
        children: i.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      }
    ),
    /* @__PURE__ */ e.jsxs("fieldset", { disabled: !b, className: "cms:flex cms:flex-col cms:gap-6", children: [
      /* @__PURE__ */ e.jsx(Pe, { message: u.version, processing: i.processing, onSaveMine: w }),
      a.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The listing page has no fields of its own: choose a listing blueprint for the collection under Structure → Collections." }) : /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsx(s.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: a.filter((v) => Ee(v, { ...n, ...i.data.data })).map((v) => r.includes(v.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(ee, { id: `data-${v.handle}`, field: v, content: !0, value: n[v.handle], errors: {}, onChange: () => {
        } }),
        /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
          "Shared by all languages: edit it in ",
          S ? P(S) : "the main language",
          "."
        ] })
      ] }, v.handle) : /* @__PURE__ */ e.jsx(
        ee,
        {
          id: `data-${v.handle}`,
          field: v,
          content: !0,
          value: i.data.data[v.handle],
          errors: q(u, `data.${v.handle}`),
          onChange: (y) => i.setData("data", { ...i.data.data, [v.handle]: y })
        },
        v.handle
      )) }) })
    ] }),
    /* @__PURE__ */ e.jsx(s.CollapsibleCard, { title: "SEO", description: "How the listing page appears in search results and shared links.", titleClassName: "cms:text-base", storageKey: "cms:listing:seo", hasErrors: le(u, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !b, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(te, { bare: !0, id: "seo", fields: He, value: i.data.seo, errors: q(u, "seo"), onChange: (v) => i.setData("seo", v) }) }) })
  ] });
}
function za({ fieldsets: t }) {
  const a = N.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(z, { message: a.fieldset }),
    /* @__PURE__ */ e.jsx(
      ot,
      {
        noun: "Fieldset",
        base: _("cms/fieldsets"),
        rows: t,
        intro: "Fields shared between blueprints, and the kinds of block of flexible fields."
      }
    )
  ] });
}
function Ia(t) {
  return /* @__PURE__ */ e.jsx(Aa, { ...t }, `${t.locale}:${t.version}:${JSON.stringify(t.values)}`);
}
function Aa({ set: t, fields: a, locale: l, locales: c, shared: r, values: n, version: d, can: m, settings: x }) {
  const o = _(`cms/globals/${t.handle}/values`);
  s.useBreadcrumbs([{ label: "Globals", href: _("cms/globals") }, { label: t.title }]);
  const g = N.useForm({ locale: l, data: n, version: d }), i = g.errors, u = c[0], S = s.useEditLock({
    type: "cms.global",
    id: t.id,
    locale: l,
    enabled: m.update,
    noun: "global set",
    leaveTo: _("cms/globals"),
    getUnsaved: () => g.isDirty ? { data: g.data.data } : null
  }), b = m.update && !S.readOnly, f = () => g.processing || g.put(o, { preserveScroll: !0 }), w = () => {
    g.transform((y) => ({ ...y, version: null })), g.put(o, { preserveScroll: !0 });
  }, v = async (y) => {
    const D = await S.loadKept(y);
    D.data && typeof D.data == "object" && g.setData("data", D.data);
  };
  return s.useUnsavedChanges(g.isDirty && !S.takenOver, b ? f : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: (y) => {
    y.preventDefault(), f();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: t.title }),
    S.dialogs,
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: t.title,
        back: { href: _("cms/globals"), label: "Back to globals" },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          x && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(N.Link, { href: x, children: [
            /* @__PURE__ */ e.jsx(Ae, {}),
            " Settings"
          ] }) }),
          c.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: l, onValueChange: (y) => N.router.get(o, { locale: y }), children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(s.SelectContent, { children: c.map((y, D) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: y, children: [
              P(y),
              D === 0 ? " (main)" : ""
            ] }, y)) })
          ] }),
          b && /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: g.processing, children: [
            g.processing && /* @__PURE__ */ e.jsx(se, { className: "cms:animate-spin" }),
            " Save"
          ] })
        ] }),
        children: g.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      }
    ),
    a.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "This global set has no fields: choose a blueprint for it under Structure → Global sets." }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(s.ViewingNotice, { by: S.viewingBy }),
      /* @__PURE__ */ e.jsx(Pe, { message: i.version, processing: g.processing, onSaveMine: w }),
      /* @__PURE__ */ e.jsx(s.KeptEditsNotice, { kept: S.kept, disabled: !b, onLoad: (y) => {
        v(y);
      }, onDiscard: (y) => {
        S.discardKept(y);
      } }),
      /* @__PURE__ */ e.jsx(
        Fe,
        {
          disabled: !b,
          fields: a,
          values: g.data.data,
          errors: i,
          storageKey: `cms:global:${t.handle}`,
          shared: r,
          sharedValues: n,
          sharedNote: `Shared by all languages: edit it in ${u ? P(u) : "the main language"}.`,
          onChange: (y, D) => g.setData("data", { ...g.data.data, [y]: D })
        }
      )
    ] })
  ] });
}
let ut = 0;
function ht(t, a = 0) {
  return t.flatMap(({ children: l, ...c }) => [{ ...c, key: `m${++ut}`, depth: a }, ...ht(l ?? [], a + 1)]);
}
function Ea(t) {
  const a = [], l = [{ depth: -1, children: a }];
  for (const { key: c, depth: r, ...n } of t) {
    for (; l.length > 1 && l[l.length - 1].depth >= r; ) l.pop();
    const d = { ...n, children: [] };
    l[l.length - 1].children.push(d), l.push({ depth: r, children: d.children });
  }
  return a;
}
function Re(t, a) {
  const l = t[a]?.depth ?? 0;
  let c = a + 1;
  for (; c < t.length && t[c].depth > l; ) c++;
  return c;
}
function xt(t, a, l) {
  const c = Re(t, a);
  return t.map((r, n) => n >= a && n < c ? { ...r, depth: r.depth + l } : r);
}
function Fa(t, a, l) {
  const c = t[a], r = t[a - 1];
  return !c || !r || c.depth > r.depth || Math.max(...t.slice(a, Re(t, a)).map((d) => d.depth)) + 1 > l - 1 ? t : xt(t, a, 1);
}
function Ha(t, a) {
  return (t[a]?.depth ?? 0) === 0 ? t : xt(t, a, -1);
}
function Pa(t, a) {
  return [...t.slice(0, a), ...t.slice(Re(t, a))];
}
function he(t) {
  return { key: `m${++ut}`, depth: 0, entry_id: null, term_id: null, collection_id: null, target: null, url: null, labels: {}, new_tab: !1, ...t };
}
function Ra({ menu: t, items: a, locales: l, limits: c, terms: r, listings: n, can: d, settings: m }) {
  const x = _(`cms/menus/${t.handle}/links`);
  s.useBreadcrumbs([{ label: "Menus", href: _("cms/menus") }, { label: t.title }]);
  const [o, g] = $.useState(() => ht(a)), [i, u] = $.useState(null), S = N.useForm({ items: a }), b = S.errors, [f, w] = $.useState(!1), v = l[0] ?? "en", y = (h) => {
    g(h), w(!0);
  }, D = (h, M) => y(o.map((E, A) => A === h ? { ...E, ...M } : E)), p = () => {
    S.processing || (S.transform(() => ({ items: Ea(o).map(pt) })), S.put(x, { preserveScroll: !0, onSuccess: () => w(!1) }));
  }, k = (h) => {
    h.preventDefault(), p();
  };
  s.useUnsavedChanges(f, d.update ? p : void 0);
  const T = (h) => /* @__PURE__ */ e.jsx(
    s.SortableList,
    {
      items: oe(o, h),
      getId: (M) => o[M].key,
      disabled: !d.update,
      onReorder: (M) => y(mt(o, h, M)),
      className: h < 0 ? "cms:gap-1" : "cms:mt-1 cms:gap-1 cms:pl-6",
      children: (M, { handle: E, isOverlay: A }) => {
        const C = o[M];
        return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${A ? "" : "cms:border-border/70"}`, children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2 cms:p-2", children: [
            d.update && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:h-10 cms:shrink-0 cms:items-center", children: /* @__PURE__ */ e.jsx(s.SortableHandle, { ...E, label: `Move ${C.labels[v] || C.target?.title || C.url || "link"}` }) }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
                /* @__PURE__ */ e.jsx(
                  s.Input,
                  {
                    "aria-label": `Label (${P(v)})`,
                    className: "cms:w-full cms:sm:max-w-xs",
                    disabled: !d.update,
                    placeholder: C.target?.title ?? "Label",
                    value: C.labels[v] ?? "",
                    onChange: (I) => D(M, { labels: { ...C.labels, [v]: I.target.value } })
                  }
                ),
                /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-32 cms:flex-1 cms:truncate cms:text-sm cms:text-muted-foreground", children: C.url !== null ? C.url : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  C.target ? `${C.target.kind}: ${C.target.title}` : "Gone",
                  " ",
                  (!C.target || !C.target.live) && /* @__PURE__ */ e.jsx(s.Badge, { variant: "outline", children: "Not on the site" })
                ] }) }),
                d.update && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center", children: [
                  /* @__PURE__ */ e.jsxs("label", { className: "cms:mr-2 cms:flex cms:items-center cms:gap-1.5 cms:text-sm", children: [
                    /* @__PURE__ */ e.jsx(s.Checkbox, { checked: C.new_tab, onCheckedChange: (I) => D(M, { new_tab: I }) }),
                    " New tab"
                  ] }),
                  /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Out a level", disabled: C.depth === 0, onClick: () => y(Ha(o, M)), children: /* @__PURE__ */ e.jsx(Wt, {}) }),
                  /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "In a level", onClick: () => y(Fa(o, M, c.depth)), children: /* @__PURE__ */ e.jsx(qt, {}) }),
                  /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": "Remove, with what's under it", onClick: () => y(Pa(o, M)), children: /* @__PURE__ */ e.jsx(V, {}) })
                ] })
              ] }),
              l.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: l.slice(1).map((I) => /* @__PURE__ */ e.jsx(
                s.Input,
                {
                  "aria-label": `Label (${P(I)})`,
                  className: "cms:w-full cms:sm:max-w-xs",
                  disabled: !d.update,
                  placeholder: `${P(I)}: as ${P(v)}`,
                  value: C.labels[I] ?? "",
                  onChange: (F) => D(M, { labels: { ...C.labels, [I]: F.target.value } })
                },
                I
              )) })
            ] })
          ] }),
          !A && oe(o, M).length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:px-2 cms:pb-2", children: T(M) })
        ] });
      }
    }
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: k, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: t.title }),
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: t.title,
        back: { href: _("cms/menus"), label: "Back to menus" },
        actions: d.update && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          m && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(N.Link, { href: m, children: [
            /* @__PURE__ */ e.jsx(Ae, {}),
            " Settings"
          ] }) }),
          /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", disabled: o.length >= c.items, onClick: () => u("entry"), children: [
            /* @__PURE__ */ e.jsx(K, {}),
            " Entry"
          ] }),
          r.length > 0 && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", disabled: o.length >= c.items, onClick: () => u("term"), children: [
            /* @__PURE__ */ e.jsx(Yt, {}),
            " Term"
          ] }),
          n.length > 0 && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", disabled: o.length >= c.items, onClick: () => u("listing"), children: [
            /* @__PURE__ */ e.jsx(Gt, {}),
            " Listing"
          ] }),
          /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", disabled: o.length >= c.items, onClick: () => u("url"), children: [
            /* @__PURE__ */ e.jsx(Kt, {}),
            " Link"
          ] }),
          /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: S.processing, children: [
            S.processing && /* @__PURE__ */ e.jsx(se, { className: "cms:animate-spin" }),
            " Save"
          ] })
        ] }),
        children: f && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      }
    ),
    /* @__PURE__ */ e.jsx(z, { message: b.items }),
    Object.keys(b).some((h) => h.startsWith("items.")) && /* @__PURE__ */ e.jsxs("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: [
      "Some links need fixing: ",
      Object.values(b).filter(Boolean)[0]
    ] }),
    /* @__PURE__ */ e.jsx(s.Card, { className: "cms:p-2", children: o.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:p-4 cms:text-center cms:text-muted-foreground", children: "No links yet. Add an entry or a link." }) : T(-1) }),
    /* @__PURE__ */ e.jsx(Ua, { kind: i, terms: r, listings: n, onClose: () => u(null), onAdd: (h) => {
      y([...o, h]), u(null);
    }, main: v })
  ] });
}
function pt({ target: t, children: a, ...l }) {
  return { ...l, children: a.map(pt) };
}
const Va = { entry: "Link to an entry", term: "Link to a term's page", listing: "Link to a listing page", url: "Link to an address" }, Oa = {
  entry: "It follows the entry: its title (unless you give a label) and its address in each language. It shows only while the entry is on the site.",
  term: "The page listing the term's entries, in each language. Its title is the label unless you give one.",
  listing: "The collection's listing page, in each language. The collection's title is the label unless you give one.",
  url: "A web address, a path on this site (/contact), mailto: or tel:."
};
function Ua({ kind: t, terms: a, listings: l, onClose: c, onAdd: r, main: n }) {
  const [d, m] = $.useState(null), [x, o] = $.useState(""), [g, i] = $.useState(""), [u, S] = $.useState("");
  $.useEffect(() => {
    m(null), o(""), i(""), S("");
  }, [t]);
  const b = g.trim() === "" || vt(g.trim()), f = u.trim() ? { [n]: u.trim() } : {}, w = async () => {
    if (t === "entry" && d !== null) {
      const y = await fetch(`${_("cms/entries/picker")}?${ze({ ids: [d], collections: [] })}`, { headers: { Accept: "application/json" }, credentials: "same-origin" }), D = y.ok ? (await y.json()).items[0] : void 0;
      r(he({ entry_id: d, target: D ? { title: D.title, kind: D.collection, live: D.status === "published" } : null, labels: f }));
    } else if (t === "term" && x !== "") {
      const y = a.find((D) => String(D.id) === x);
      r(he({ term_id: Number(x), target: y ? { title: y.title, kind: y.taxonomy, live: !0 } : null, labels: f }));
    } else if (t === "listing" && x !== "") {
      const y = l.find((D) => String(D.id) === x);
      r(he({ collection_id: Number(x), target: y ? { title: y.title, kind: "Listing page", live: !0 } : null, labels: f }));
    } else t === "url" && g.trim() !== "" && b && u.trim() !== "" && r(he({ url: g.trim(), labels: f }));
  }, v = t === "entry" ? d !== null : t === "url" ? g.trim() !== "" && b && u.trim() !== "" : x !== "";
  return /* @__PURE__ */ e.jsx(s.Dialog, { open: t !== null, onOpenChange: (y) => !y && c(), children: /* @__PURE__ */ e.jsxs(s.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(s.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(s.DialogTitle, { children: t ? Va[t] : "" }),
      /* @__PURE__ */ e.jsx(s.DialogDescription, { children: t ? Oa[t] : "" })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
      t === "entry" && /* @__PURE__ */ e.jsx(
        je,
        {
          id: "menu-entry",
          value: d,
          multiple: !1,
          max: null,
          collections: [],
          invalid: !1,
          onChange: (y) => m(typeof y == "number" ? y : null)
        }
      ),
      (t === "term" || t === "listing") && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "menu-target", children: t === "term" ? "Term" : "Collection" }),
        /* @__PURE__ */ e.jsxs(s.Select, { value: x, onValueChange: o, children: [
          /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: "menu-target", children: /* @__PURE__ */ e.jsx(s.SelectValue, { placeholder: "Choose…" }) }),
          /* @__PURE__ */ e.jsx(s.SelectContent, { children: t === "term" ? a.map((y) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: String(y.id), children: [
            y.taxonomy,
            ": ",
            y.title
          ] }, y.id)) : l.map((y) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: String(y.id), children: y.title }, y.id)) })
        ] })
      ] }),
      t === "url" && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "menu-url", children: "Address" }),
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            id: "menu-url",
            value: g,
            placeholder: "https://… or /contact",
            "aria-invalid": !b,
            onChange: (y) => i(y.target.value)
          }
        ),
        !b && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "This address could run code; use https://, a path, mailto: or tel:." })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(s.Label, { htmlFor: "menu-label", children: [
          "Label",
          t === "url" ? "" : " (optional)"
        ] }),
        /* @__PURE__ */ e.jsx(s.Input, { id: "menu-label", value: u, onChange: (y) => S(y.target.value) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(s.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", onClick: c, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", onClick: () => {
        w();
      }, disabled: !v, children: "Add" })
    ] })
  ] }) });
}
const Ka = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "spam", label: "Spam" },
  { value: "trashed", label: "Trash" }
], Wa = { pending: "Pending", approved: "Approved", spam: "Spam" };
function qa({ tab: t, counts: a, filters: l, collections: c, comments: r, can: n, errors: d = {} }) {
  s.useBreadcrumbs([{ label: "Comments", href: _("cms/comments") }]);
  const [m, x] = $.useState(l.search), [o, g] = $.useState([]), [i, u] = $.useState(null), [S, b] = Q(), f = (p) => {
    const k = { status: t, search: l.search, collection: l.collection, ...p };
    N.router.get(_("cms/comments"), {
      ...k.status !== "all" ? { status: k.status } : {},
      ...k.search ? { search: k.search } : {},
      ...k.collection ? { collection: k.collection } : {},
      ...l.entry ? { entry: l.entry } : {}
    }, { preserveState: !0, replace: !0, onSuccess: () => g([]) });
  };
  $.useEffect(() => {
    if (m === l.search) return;
    const p = window.setTimeout(() => f({ search: m }), 300);
    return () => window.clearTimeout(p);
  }, [m]);
  const w = (p, k = {}) => N.router.post(_(p), k, { preserveScroll: !0, onSuccess: () => g([]) }), v = (p, k) => w(`cms/comments/${p.id}/status`, { status: k }), y = (p) => {
    const k = () => w("cms/comments/bulk", { action: p, ids: o });
    p === "delete" ? S(`Delete ${o.length} comments for good? This can't be undone.`, k) : k();
  }, D = r.data.length > 0 && o.length === r.data.length;
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
                value: m,
                onChange: (p) => x(p.target.value)
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
    /* @__PURE__ */ e.jsx(s.Tabs, { value: t, onValueChange: (p) => f({ status: p }), children: /* @__PURE__ */ e.jsx(s.TabsList, { className: "cms:h-auto cms:flex-wrap cms:justify-start", children: Ka.map((p) => /* @__PURE__ */ e.jsxs(s.TabsTrigger, { value: p.value, children: [
      p.label,
      " ",
      /* @__PURE__ */ e.jsx("span", { className: "cms:ml-1 cms:text-muted-foreground", children: a[p.value] })
    ] }, p.value)) }) }),
    o.length > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2 cms:text-sm", role: "toolbar", "aria-label": "With the selected comments", children: [
      /* @__PURE__ */ e.jsxs("span", { className: "cms:text-muted-foreground", children: [
        o.length,
        " selected"
      ] }),
      n.moderate && t !== "trashed" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "outline", onClick: () => y("approve"), children: [
          /* @__PURE__ */ e.jsx(xe, {}),
          " Approve"
        ] }),
        /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "outline", onClick: () => y("unapprove"), children: [
          /* @__PURE__ */ e.jsx(Be, {}),
          " Unapprove"
        ] }),
        /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "outline", onClick: () => y("spam"), children: [
          /* @__PURE__ */ e.jsx(Te, {}),
          " Spam"
        ] })
      ] }),
      n.delete && t !== "trashed" && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "outline", onClick: () => y("trash"), children: [
        /* @__PURE__ */ e.jsx(V, {}),
        " Trash"
      ] }),
      n.delete && t === "trashed" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "outline", onClick: () => y("restore"), children: [
          /* @__PURE__ */ e.jsx(pe, {}),
          " Restore"
        ] }),
        /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "destructive", onClick: () => y("delete"), children: [
          /* @__PURE__ */ e.jsx(V, {}),
          " Delete for good"
        ] })
      ] })
    ] }),
    r.data.length === 0 ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:rounded-xl cms:border cms:border-dashed cms:px-6 cms:py-16 cms:text-center", children: [
      /* @__PURE__ */ e.jsx("span", { className: "cms:grid cms:size-10 cms:place-items-center cms:rounded-full cms:bg-muted cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx(Jt, { className: "cms:size-4" }) }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: l.search ? "No comments match." : "No comments here." })
    ] }) : /* @__PURE__ */ e.jsxs(s.Card, { className: "cms:divide-y cms:p-0", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3 cms:px-4 cms:py-2 cms:text-sm cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsx(s.Checkbox, { checked: D, "aria-label": "Select all", onCheckedChange: (p) => g(p ? r.data.map((k) => k.id) : []) }),
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
            checked: o.includes(p.id),
            "aria-label": `Select ${p.author}'s comment`,
            onCheckedChange: (k) => g(k ? [...o, p.id] : o.filter((T) => T !== p.id))
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-x-3 cms:gap-y-1 cms:text-sm", children: [
            /* @__PURE__ */ e.jsx("span", { id: `comment-${p.id}-author`, className: "cms:font-medium", children: p.author }),
            p.email && /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", children: p.email }),
            p.member && /* @__PURE__ */ e.jsx(s.Badge, { variant: "outline", children: "Signed in" }),
            !p.trashed && /* @__PURE__ */ e.jsx(s.Badge, { variant: p.status === "approved" ? "success" : p.status === "spam" ? "destructive" : "warning", children: Wa[p.status] }),
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
              /* @__PURE__ */ e.jsx(ne, { className: "cms:inline cms:size-3" })
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
              p.status !== "approved" && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => v(p, "approved"), children: [
                /* @__PURE__ */ e.jsx(xe, {}),
                " Approve"
              ] }),
              p.status === "approved" && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => v(p, "pending"), children: [
                /* @__PURE__ */ e.jsx(Be, {}),
                " Unapprove"
              ] }),
              p.status !== "spam" && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => v(p, "spam"), children: [
                /* @__PURE__ */ e.jsx(Te, {}),
                " Spam"
              ] }),
              p.status !== "spam" && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => u({ row: p, mode: "reply" }), children: [
                /* @__PURE__ */ e.jsx(Hs, {}),
                " Reply"
              ] }),
              /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => u({ row: p, mode: "edit" }), children: [
                /* @__PURE__ */ e.jsx(Vs, {}),
                " Edit"
              ] })
            ] }),
            n.delete && !p.trashed && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => N.router.delete(_(`cms/comments/${p.id}`), { preserveScroll: !0 }), children: [
              /* @__PURE__ */ e.jsx(V, {}),
              " Trash"
            ] }),
            n.delete && p.trashed && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => w(`cms/comments/${p.id}/restore`), children: [
                /* @__PURE__ */ e.jsx(pe, {}),
                " Restore"
              ] }),
              /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => S(
                "Delete this comment for good? Replies to it stay.",
                () => N.router.delete(_(`cms/comments/${p.id}/force`), { preserveScroll: !0 })
              ), children: [
                /* @__PURE__ */ e.jsx(V, {}),
                " Delete for good"
              ] })
            ] })
          ] })
        ] })
      ] }, p.id))
    ] }),
    (r.prev_page_url || r.next_page_url) && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:justify-end cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(s.Button, { variant: "outline", size: "sm", disabled: !r.prev_page_url, onClick: () => r.prev_page_url && N.router.get(r.prev_page_url), children: [
        /* @__PURE__ */ e.jsx(Ie, {}),
        " Newer"
      ] }),
      /* @__PURE__ */ e.jsxs(s.Button, { variant: "outline", size: "sm", disabled: !r.next_page_url, onClick: () => r.next_page_url && N.router.get(r.next_page_url), children: [
        "Older ",
        /* @__PURE__ */ e.jsx(ge, {})
      ] })
    ] }),
    i && /* @__PURE__ */ e.jsx(Ga, { row: i.row, mode: i.mode, error: d.body, onClose: () => u(null) }, `${i.mode}-${i.row.id}`),
    b
  ] });
}
function Ga({ row: t, mode: a, error: l, onClose: c }) {
  const [r, n] = $.useState(a === "edit" ? t.body : ""), [d, m] = $.useState(!1), x = () => {
    m(!0);
    const o = { preserveScroll: !0, onSuccess: c, onFinish: () => m(!1) };
    a === "reply" ? N.router.post(_(`cms/comments/${t.id}/reply`), { body: r }, o) : N.router.put(_(`cms/comments/${t.id}`), { body: r }, o);
  };
  return /* @__PURE__ */ e.jsx(s.Dialog, { open: !0, onOpenChange: (o) => !o && c(), children: /* @__PURE__ */ e.jsxs(s.DialogContent, { children: [
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
        onChange: (o) => n(o.target.value)
      }
    ),
    /* @__PURE__ */ e.jsx(z, { message: l }),
    /* @__PURE__ */ e.jsxs(s.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", onClick: c, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", disabled: r.trim() === "" || d, onClick: x, children: a === "reply" ? "Post reply" : "Save" })
    ] })
  ] }) });
}
const Ja = [
  { role: "title", label: "Meta title", automatic: "the title" },
  { role: "description", label: "Meta description", automatic: "nothing" },
  { role: "image", label: "Share image", automatic: "nothing" }
], we = "__auto";
function Ya({ site: t, siteName: a, collections: l, taxonomies: c }) {
  s.useBreadcrumbs([{ label: "Settings", href: _("settings") }, { label: "SEO" }]);
  const r = [...l ?? [], ...c ?? []], n = N.useForm({
    site: { ...t },
    mappings: r.map((i) => ({ kind: i.kind, id: i.id, title: i.chosen.title ?? "", description: i.chosen.description ?? "", image: i.chosen.image ?? "" }))
  }), d = n.errors, m = () => n.put(_("cms/seo"), { preserveScroll: !0, onSuccess: () => n.setDefaults() });
  s.useUnsavedChanges(n.isDirty, m);
  const x = (i, u) => n.setData("site", { ...n.data.site, [i]: u }), o = (i, u, S) => n.setData("mappings", n.data.mappings.map((b, f) => f === i ? { ...b, [u]: S } : b)), g = (i, u, S, b) => /* @__PURE__ */ e.jsxs(s.CollapsibleCard, { title: i, description: u, titleClassName: "cms:text-base", storageKey: `cms:seo:${i}`, contentClassName: "cms:flex cms:flex-col cms:divide-y cms:divide-border/60", children: [
    S.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "None yet." }),
    S.map((f, w) => {
      const v = b + w;
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3 cms:py-4 cms:first:pt-0 cms:last:pb-0", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:justify-between cms:gap-3", children: [
          /* @__PURE__ */ e.jsx("h3", { className: "cms:font-medium", children: f.title }),
          /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: f.blueprint ? `Blueprint: ${f.blueprint}` : "No blueprint" })
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-3 cms:sm:grid-cols-3", children: Ja.map(({ role: y, label: D, automatic: p }) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-1.5", children: [
          /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `seo-${v}-${y}`, className: "cms:text-xs", children: D }),
          /* @__PURE__ */ e.jsxs(s.Select, { value: n.data.mappings[v]?.[y] || we, onValueChange: (k) => o(v, y, k === we ? "" : k), children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: `seo-${v}-${y}`, className: "cms:w-full", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
              /* @__PURE__ */ e.jsxs(s.SelectItem, { value: we, children: [
                "Automatic (",
                p,
                ")"
              ] }),
              f.options[y].map((k) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: k.value, children: k.label }, k.value))
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(z, { message: d[`mappings.${v}.${y}`] })
        ] }, y)) })
      ] }, `${f.kind}-${f.id}`);
    })
  ] });
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (i) => {
    i.preventDefault(), m();
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
        /* @__PURE__ */ e.jsx(s.Switch, { id: "seo-noindex", checked: n.data.site.noindex, onCheckedChange: (i) => x("noindex", i) }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-0.5", children: [
          /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "seo-noindex", children: "Hide the whole site from search engines" }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: "Every page asks not to be indexed and the sitemap is empty. For a site still being built, or staging." })
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-start cms:justify-between cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-3", children: [
          /* @__PURE__ */ e.jsx(s.Switch, { id: "seo-append", checked: n.data.site.appendName, onCheckedChange: (i) => x("appendName", i) }),
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
              onChange: (i) => x("separator", i.target.value)
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
            onChange: (i) => x("twitter", i.target.value)
          }
        ),
        /* @__PURE__ */ e.jsx(z, { message: d["site.twitter"] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "seo-image", children: "Default share image" }),
        /* @__PURE__ */ e.jsx(
          s.MediaPickerInput,
          {
            id: "seo-image",
            invalid: d["site.image"] !== void 0,
            disabled: !1,
            multiple: !1,
            max: null,
            types: ["image"],
            value: n.data.site.image,
            onChange: (i) => x("image", typeof i == "number" ? i : null)
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: "Shown when a page is shared and has no image of its own." }),
        /* @__PURE__ */ e.jsx(z, { message: d["site.image"] })
      ] })
    ] }),
    r.length > 0 && /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx("h2", { className: "cms:text-base cms:font-medium", children: "Fields used for SEO" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "When an entry or term leaves its meta title, description or share image empty, the site uses one of its fields instead. A page's own SEO fields always win; after the field come the site's (the description in Settings → Site, the share image above)." })
    ] }),
    l !== null && g("Collections", "Entries of each collection.", l, 0),
    c !== null && g("Taxonomies", "Term pages of each taxonomy.", c, l?.length ?? 0),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: "Meta title: a text field. Meta description: a text or textarea field, cut to 300 characters. Share image: the first image of a media field." })
  ] });
}
const Qa = 3;
function Za({ form: t, forms: a, submissions: l, can: c, createForm: r = null }) {
  s.useBreadcrumbs([{ label: "Submissions", href: _("cms/submissions") }, ...t ? [{ label: t.title }] : []]);
  const [n, d] = $.useState(null), [m, x] = Q();
  if (!t || !l)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(N.Head, { title: "Submissions" }),
      /* @__PURE__ */ e.jsx(s.PageHeader, { title: "Submissions", description: "What visitors send through the site's forms." }),
      /* @__PURE__ */ e.jsxs(s.Card, { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:px-6 cms:py-14 cms:text-center", children: [
        /* @__PURE__ */ e.jsx(Vt, { className: "cms:size-8 cms:text-muted-foreground" }),
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
  const o = (l.data[0]?.rows ?? []).slice(0, Qa), g = (i) => m(
    "Delete this submission for good? It can't be restored.",
    () => N.router.delete(_(`cms/submissions/${i.id}`), { preserveScroll: !0, onSuccess: () => d(null) })
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: `${t.title} submissions` }),
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: t.title,
        actions: l.total > 0 && c.export && /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: _(`cms/forms/${t.handle}/submissions/export`), children: [
          /* @__PURE__ */ e.jsx(Ss, {}),
          " Export CSV"
        ] }) }),
        children: a.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: t.handle, onValueChange: (i) => N.router.get(_(`cms/forms/${i}/submissions`)), children: [
          /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-56", "aria-label": "Form", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(s.SelectContent, { children: a.map((i) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: i.handle, children: [
            i.title,
            " (",
            i.count,
            ")"
          ] }, i.handle)) })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(s.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(s.Table, { children: [
      /* @__PURE__ */ e.jsx(s.TableHeader, { children: /* @__PURE__ */ e.jsxs(s.TableRow, { children: [
        /* @__PURE__ */ e.jsx(s.TableHead, { children: "Sent" }),
        o.map((i) => /* @__PURE__ */ e.jsx(s.TableHead, { children: i.label }, i.handle))
      ] }) }),
      /* @__PURE__ */ e.jsxs(s.TableBody, { children: [
        l.data.length === 0 && /* @__PURE__ */ e.jsx(s.TableRow, { children: /* @__PURE__ */ e.jsx(s.TableCell, { colSpan: o.length + 1, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: "Nothing sent yet." }) }),
        l.data.map((i) => /* @__PURE__ */ e.jsxs(s.TableRow, { children: [
          /* @__PURE__ */ e.jsx(s.TableCell, { className: "cms:whitespace-nowrap", children: /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:font-medium cms:hover:underline", onClick: () => d(i), children: G(i.createdAt) }) }),
          o.map((u) => /* @__PURE__ */ e.jsx(s.TableCell, { className: "cms:max-w-64 cms:truncate", children: i.rows.find((S) => S.handle === u.handle)?.value }, u.handle))
        ] }, i.id))
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
            children: /* @__PURE__ */ e.jsx(Ie, {})
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
    /* @__PURE__ */ e.jsx(s.Dialog, { open: n !== null, onOpenChange: (i) => !i && d(null), children: /* @__PURE__ */ e.jsxs(s.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto", children: [
      /* @__PURE__ */ e.jsxs(s.DialogHeader, { children: [
        /* @__PURE__ */ e.jsx(s.DialogTitle, { children: t.title }),
        /* @__PURE__ */ e.jsxs(s.DialogDescription, { children: [
          "Sent ",
          G(n?.createdAt ?? null),
          " · ",
          n?.locale.toUpperCase()
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-3 cms:text-sm", children: n?.rows.map((i) => /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: i.label }),
        /* @__PURE__ */ e.jsx("dd", { className: "cms:whitespace-pre-wrap cms:break-words cms:text-muted-foreground", children: i.file ? /* @__PURE__ */ e.jsx("a", { href: i.file, className: "cms:underline cms:underline-offset-4 hover:cms:text-foreground", download: !0, children: i.value }) : i.value || "—" })
      ] }, i.handle)) }),
      n && (n.visitor.ip || n.visitor.userAgent || n.visitor.referrer) && /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-3 cms:border-t cms:pt-3 cms:text-sm", children: [["IP address", n.visitor.ip], ["Browser", n.visitor.userAgent], ["Sent from", n.visitor.referrer]].map(([i, u]) => u && /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: i }),
        /* @__PURE__ */ e.jsx("dd", { className: "cms:break-all cms:text-muted-foreground", children: u })
      ] }, i)) }),
      c.delete && n && /* @__PURE__ */ e.jsx(s.DialogFooter, { children: /* @__PURE__ */ e.jsxs(s.Button, { variant: "destructive", onClick: () => g(n), children: [
        /* @__PURE__ */ e.jsx(V, {}),
        " Delete"
      ] }) })
    ] }) }),
    x
  ] });
}
function Xa(t) {
  return /* @__PURE__ */ e.jsx(el, { ...t }, `${t.locale}:${t.version}:${JSON.stringify([t.values, t.seo, t.term.template])}`);
}
function el({ taxonomy: t, term: a, translated: l, fields: c, locale: r, locales: n, shared: d, sharedValues: m, values: x, seo: o, version: g, usedBy: i = [] }) {
  const u = _(`cms/taxonomies/${t.handle}/terms`), S = _(`cms/terms/${a.id}/content`);
  s.useBreadcrumbs([{ label: t.title, href: `${u}?locale=${r}` }, { label: a.title }]);
  const b = N.useForm({ locale: r, data: x, seo: o ?? {}, template: a.template ?? "", version: g }), f = b.errors, w = () => b.processing || b.put(S, { preserveScroll: !0 }), v = () => {
    b.transform((k) => ({ ...k, version: null })), b.put(S, { preserveScroll: !0 });
  }, y = s.useEditLock({
    type: "cms.term",
    id: a.id,
    locale: r,
    enabled: l,
    noun: "term",
    leaveTo: `${u}?locale=${r}`,
    getUnsaved: () => b.isDirty ? { data: b.data.data, seo: b.data.seo, template: b.data.template } : null
  }), D = l && !y.readOnly, p = async (k) => {
    const T = await y.loadKept(k);
    b.setData((h) => ({
      ...h,
      data: T.data && typeof T.data == "object" ? T.data : h.data,
      seo: T.seo && typeof T.seo == "object" ? T.seo : h.seo,
      template: typeof T.template == "string" ? T.template : h.template
    }));
  };
  return s.useUnsavedChanges(b.isDirty && !y.takenOver, D ? w : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: (k) => {
    k.preventDefault(), w();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: a.title }),
    y.dialogs,
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: a.title,
        back: { href: `${u}?locale=${r}`, label: `Back to ${t.title}` },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          a.url && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: a.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(ne, {}),
            " View page"
          ] }) }),
          n.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: r, onValueChange: (k) => N.router.get(`${u}/${a.id}/edit`, { locale: k }), children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(s.SelectContent, { children: n.map((k, T) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: k, children: [
              P(k),
              T === 0 ? " (main)" : ""
            ] }, k)) })
          ] }),
          D && /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: b.processing, children: [
            b.processing && /* @__PURE__ */ e.jsx(se, { className: "cms:animate-spin" }),
            " Save"
          ] })
        ] }),
        children: b.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      }
    ),
    l ? /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:items-start cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_20rem]", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(s.ViewingNotice, { by: y.viewingBy }),
        /* @__PURE__ */ e.jsx(s.KeptEditsNotice, { kept: y.kept, disabled: !D, onLoad: (k) => {
          p(k);
        }, onDiscard: (k) => {
          y.discardKept(k);
        } }),
        /* @__PURE__ */ e.jsx(Pe, { message: f.version, processing: b.processing, onSaveMine: v }),
        /* @__PURE__ */ e.jsx(
          Fe,
          {
            disabled: !D,
            fields: c,
            values: b.data.data,
            errors: f,
            storageKey: `cms:term:${t.handle}`,
            shared: d,
            sharedValues: m,
            sharedNote: `Shared by all languages: edit it in ${P(n[0] ?? "en")}.`,
            onChange: (k, T) => b.setData("data", { ...b.data.data, [k]: T })
          }
        ),
        /* @__PURE__ */ e.jsx(s.CollapsibleCard, { title: "SEO", description: "How this term's page appears in search results and shared links.", titleClassName: "cms:text-base", storageKey: "cms:term:seo", hasErrors: le(f, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !D, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(te, { bare: !0, id: "seo", fields: He, value: b.data.seo, errors: q(f, "seo"), onChange: (k) => b.setData("seo", k) }) }) })
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
            children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: !D, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: [
              /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "template", className: "cms:sr-only", children: "Template" }),
              /* @__PURE__ */ e.jsx(
                s.Input,
                {
                  id: "template",
                  className: "cms:font-mono",
                  placeholder: `cms.${t.handle}-special`,
                  value: b.data.template,
                  onChange: (k) => b.setData("template", k.target.value),
                  "aria-invalid": f.template !== void 0
                }
              ),
              /* @__PURE__ */ e.jsx(dt, { example: `cms.${t.handle}-special`, fallbacks: ["the taxonomy's template, if set", `cms.taxonomy-${t.handle}`, "cms.term"] }),
              /* @__PURE__ */ e.jsx(z, { message: f.template })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsxs(s.CollapsibleCard, { title: "Used by", titleClassName: "cms:text-base", storageKey: "cms:term:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          i.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "No content links here through its fields." }),
          i.map((k) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:gap-2", children: [
            k.url ? /* @__PURE__ */ e.jsx("a", { href: k.url, className: "cms:truncate cms:underline-offset-4 cms:hover:underline", children: k.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:truncate", children: k.label }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:font-mono cms:text-xs cms:text-muted-foreground", children: k.field })
          ] }, `${k.label}:${k.field}`))
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
function sl({ taxonomy: t, locale: a, locales: l, parent: c, terms: r }) {
  const n = _(`cms/taxonomies/${t.handle}/terms`);
  s.useBreadcrumbs([{ label: t.title, href: `${n}?locale=${a}` }, { label: "New term" }]);
  const d = N.useForm({ title: "", slug: "", parent_id: c, locale: a }), m = d.errors;
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (x) => {
    x.preventDefault(), d.post(n);
  }, className: "cms:flex cms:max-w-3xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: `New term · ${t.title}` }),
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: "New term",
        back: { href: `${n}?locale=${a}`, label: `Back to ${t.title}` },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          l.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: a, onValueChange: (x) => N.router.get(`${n}/create`, { locale: x, ...c ? { parent: c } : {} }), children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-40", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(s.SelectContent, { children: l.map((x) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: x, children: P(x) }, x)) })
          ] }),
          /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: d.processing, children: [
            d.processing && /* @__PURE__ */ e.jsx(se, { className: "cms:animate-spin" }),
            " Create term"
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsxs(s.CardContent, { className: "cms:grid cms:gap-5 cms:md:grid-cols-[3fr_2fr]", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "title", children: "Title" }),
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            id: "title",
            value: d.data.title,
            required: !0,
            autoFocus: !0,
            "aria-invalid": m.title !== void 0,
            onChange: (x) => d.setData("title", x.target.value)
          }
        ),
        /* @__PURE__ */ e.jsx(z, { message: m.title })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "slug", children: "Slug" }),
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            id: "slug",
            className: "cms:font-mono",
            value: d.data.slug,
            placeholder: "Made from the title",
            "aria-invalid": m.slug !== void 0,
            onChange: (x) => d.setData("slug", x.target.value)
          }
        ),
        /* @__PURE__ */ e.jsx(z, { message: m.slug })
      ] }),
      t.hierarchical && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:md:col-span-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "parent", children: "Under" }),
        /* @__PURE__ */ e.jsxs(
          s.Select,
          {
            value: d.data.parent_id === null ? $e : String(d.data.parent_id),
            onValueChange: (x) => d.setData("parent_id", x === $e ? null : Number(x)),
            children: [
              /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: "parent", className: "cms:md:w-1/2", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
              /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
                /* @__PURE__ */ e.jsx(s.SelectItem, { value: $e, children: "Top level" }),
                r.map((x) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: String(x.id), children: [
                  "— ".repeat(x.depth),
                  x.title
                ] }, x.id))
              ] })
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(z, { message: m.parent_id })
      ] }),
      l.length > 1 && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground cms:md:col-span-2", children: [
        "In ",
        P(a),
        ". Translate it from the list afterwards."
      ] })
    ] }) })
  ] });
}
const De = "__top";
function Xe(t = []) {
  return t.length === 0 ? "" : ` It's used by ${t.slice(0, 5).join("; ")}${t.length > 5 ? ` and ${t.length - 5} more` : ""}.`;
}
function tl({ taxonomy: t, taxonomies: a, terms: l, locales: c, locale: r, trashed: n = !1 }) {
  s.useBreadcrumbs([{ label: t ? t.title : "Terms" }]);
  const [d, m] = Q(), [x, o] = $.useState(null), [g, i] = $.useState(""), [u, S] = $.useState(l);
  if ($.useEffect(() => S(l), [l]), !t)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(N.Head, { title: "Terms" }),
      /* @__PURE__ */ e.jsx(s.PageHeader, { title: "Terms", description: "There are no taxonomies yet. Create one under Structure → Taxonomies (categories, tags…), then add its terms here." })
    ] });
  const b = _(`cms/taxonomies/${t.handle}/terms`), f = (h) => _(`cms/taxonomies/${t.handle}/terms/${h.id}/edit`) + `?locale=${encodeURIComponent(r)}`, w = (h, M) => {
    const E = M.map((A) => u[A].id);
    S(mt(u, h, M)), N.router.post(
      _("cms/terms/reorder"),
      { taxonomy: t.handle, ids: E, parent_id: h < 0 ? null : u[h].id },
      { preserveScroll: !0, preserveState: !0, onError: () => S(l) }
    );
  }, v = (h) => d(
    `Move "${h.fallback}" to the trash, with the terms under it? It comes off the site; you can restore it.${Xe(h.usedBy)}`,
    () => N.router.delete(_(`cms/terms/${h.id}`), { preserveScroll: !0 })
  ), y = g.trim().toLowerCase(), D = y === "" ? null : u.filter((h) => `${h.title ?? h.fallback} ${h.slug ?? ""}`.toLowerCase().includes(y)), p = t.collections ?? [], k = (h, M, E) => /* @__PURE__ */ e.jsxs("div", { className: `${es} cms:border-t cms:border-border/60 cms:px-3 cms:py-2`, children: [
    /* @__PURE__ */ e.jsx("span", { className: "cms:flex cms:justify-center", children: M && !n && /* @__PURE__ */ e.jsx(s.SortableHandle, { ...M, label: `Move ${h.fallback}` }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-2", style: { paddingLeft: E * 20 }, children: [
      E > 0 && /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", "aria-hidden": !0, children: "└" }),
      n ? /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: h.title ?? h.fallback }) : /* @__PURE__ */ e.jsx(
        "button",
        {
          type: "button",
          className: "cms:truncate cms:text-left cms:font-medium cms:underline-offset-4 cms:hover:underline",
          onClick: () => t.pages && h.title !== null ? N.router.get(f(h)) : o(h),
          children: h.title ?? /* @__PURE__ */ e.jsxs("span", { className: "cms:font-normal cms:text-muted-foreground cms:italic", children: [
            h.fallback,
            " · not translated"
          ] })
        }
      ),
      h.url && /* @__PURE__ */ e.jsx("a", { href: h.url, target: "_blank", rel: "noopener noreferrer", className: "cms:text-muted-foreground cms:hover:text-foreground", "aria-label": "Visit term page", title: "Visit term page", children: /* @__PURE__ */ e.jsx(ne, { className: "cms:size-3.5" }) })
    ] }),
    /* @__PURE__ */ e.jsx("code", { className: "cms:hidden cms:truncate cms:text-xs cms:text-muted-foreground cms:md:block", children: h.slug ?? "—" }),
    /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:text-sm cms:text-muted-foreground cms:tabular-nums cms:md:block", children: h.entries ?? 0 }),
    /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:text-sm cms:text-muted-foreground cms:md:block", children: al(h.createdAt) }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:justify-end", children: n ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-1", children: [
      /* @__PURE__ */ e.jsxs(s.Button, { variant: "outline", size: "sm", onClick: () => N.router.post(_(`cms/terms/${h.id}/restore`), {}, { preserveScroll: !0 }), children: [
        /* @__PURE__ */ e.jsx(pe, {}),
        " Restore"
      ] }),
      /* @__PURE__ */ e.jsxs(
        s.Button,
        {
          variant: "ghost",
          size: "sm",
          className: "cms:text-destructive",
          onClick: () => d(
            `Delete "${h.fallback}" for good, in every language? Entries lose it.${Xe(h.usedBy)}`,
            () => N.router.delete(_(`cms/terms/${h.id}/force`), { preserveScroll: !0, data: (h.usedBy ?? []).length > 0 ? { force: 1 } : {} })
          ),
          children: [
            /* @__PURE__ */ e.jsx(V, {}),
            " Delete for good"
          ]
        }
      )
    ] }) : /* @__PURE__ */ e.jsxs(s.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(s.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(s.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Actions for ${h.fallback}`, children: /* @__PURE__ */ e.jsx(ws, {}) }) }),
      /* @__PURE__ */ e.jsxs(s.DropdownMenuContent, { align: "end", children: [
        /* @__PURE__ */ e.jsxs(s.DropdownMenuItem, { onSelect: () => o(h), children: [
          /* @__PURE__ */ e.jsx(Vs, {}),
          " Rename"
        ] }),
        t.hierarchical && h.title !== null && /* @__PURE__ */ e.jsx(s.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(N.Link, { href: `${b}/create?locale=${encodeURIComponent(r)}&parent=${h.id}`, children: [
          /* @__PURE__ */ e.jsx(K, {}),
          " Add a term under it"
        ] }) }),
        t.pages && h.title !== null && /* @__PURE__ */ e.jsx(s.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(N.Link, { href: f(h), children: [
          /* @__PURE__ */ e.jsx(Rt, {}),
          " Edit page"
        ] }) }),
        /* @__PURE__ */ e.jsx(s.DropdownMenuSeparator, {}),
        /* @__PURE__ */ e.jsxs(s.DropdownMenuItem, { className: "cms:text-destructive", onSelect: () => v(h), children: [
          /* @__PURE__ */ e.jsx(V, {}),
          " Move to trash"
        ] })
      ] })
    ] }) })
  ] }), T = (h) => /* @__PURE__ */ e.jsx(s.SortableList, { items: oe(u, h), getId: (M) => u[M].id, disabled: n, onReorder: (M) => w(h, M), className: "cms:gap-0", children: (M, { handle: E, isOverlay: A }) => /* @__PURE__ */ e.jsxs("div", { className: A ? "cms:rounded-md cms:bg-card cms:shadow-md" : "", children: [
    k(u[M], E, u[M].depth),
    !A && !n && oe(u, M).length > 0 && T(M)
  ] }) });
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: t.title }),
    m,
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: n ? `${t.title} — trash` : t.title,
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          c.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: r, onValueChange: (h) => N.router.get(b, { locale: h, ...n ? { status: "trashed" } : {} }), children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-40", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(s.SelectContent, { children: c.map((h) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: h, children: P(h) }, h)) })
          ] }),
          n ? /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", onClick: () => N.router.get(b, { locale: r }), children: "Back to terms" }) : /* @__PURE__ */ e.jsx(s.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(N.Link, { href: `${b}/create?locale=${encodeURIComponent(r)}`, children: [
            /* @__PURE__ */ e.jsx(K, {}),
            " New term"
          ] }) }),
          /* @__PURE__ */ e.jsxs(s.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(s.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", size: "icon", "aria-label": "More", children: /* @__PURE__ */ e.jsx(Ht, {}) }) }),
            /* @__PURE__ */ e.jsxs(s.DropdownMenuContent, { align: "end", className: "cms:min-w-56", children: [
              p.length > 0 && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(s.DropdownMenuLabel, { children: "Used by collections" }),
                p.map((h) => /* @__PURE__ */ e.jsx(s.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsx(N.Link, { href: h.url, children: h.title }) }, h.url)),
                /* @__PURE__ */ e.jsx(s.DropdownMenuSeparator, {})
              ] }),
              t.settings && /* @__PURE__ */ e.jsx(s.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(N.Link, { href: t.settings, children: [
                /* @__PURE__ */ e.jsx(Ae, {}),
                " Taxonomy settings"
              ] }) }),
              !n && /* @__PURE__ */ e.jsxs(s.DropdownMenuItem, { onSelect: () => N.router.get(b, { locale: r, status: "trashed" }), children: [
                /* @__PURE__ */ e.jsx(V, {}),
                " Trash"
              ] })
            ] })
          ] })
        ] }),
        children: a.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: t.handle, onValueChange: (h) => N.router.get(_(`cms/taxonomies/${h}/terms`)), children: [
          /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": "Taxonomy", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(s.SelectContent, { children: a.map((h) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: h.handle, children: h.title }, h.handle)) })
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
            value: g,
            onChange: (h) => i(h.target.value)
          }
        )
      ] }),
      !n && u.length > 1 && !D && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
        "Drag terms to set their order",
        t.hierarchical ? "; a term's parent is set when you rename it" : "",
        "."
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(s.Card, { className: "cms:gap-0 cms:overflow-hidden cms:py-0", children: [
      /* @__PURE__ */ e.jsxs("div", { className: `${es} cms:bg-muted/60 cms:px-3 cms:py-2.5 cms:text-sm cms:font-medium cms:text-muted-foreground`, children: [
        /* @__PURE__ */ e.jsx("span", {}),
        /* @__PURE__ */ e.jsx("span", { children: "Title" }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:md:block", children: "Slug" }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:md:block", children: "Entries" }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:md:block", children: "Created" }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: "Actions" })
      ] }),
      u.length === 0 ? /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:border-t cms:border-border/60 cms:p-10 cms:text-center cms:text-muted-foreground", children: n ? "The trash is empty." : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        "No terms yet.",
        /* @__PURE__ */ e.jsx(s.Button, { size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs(N.Link, { href: `${b}/create?locale=${encodeURIComponent(r)}`, children: [
          /* @__PURE__ */ e.jsx(K, {}),
          " New term"
        ] }) })
      ] }) }) : D ? D.length === 0 ? /* @__PURE__ */ e.jsxs("p", { className: "cms:border-t cms:border-border/60 cms:p-8 cms:text-center cms:text-muted-foreground", children: [
        "No terms match “",
        g,
        "”."
      ] }) : D.map((h) => /* @__PURE__ */ e.jsx($.Fragment, { children: k(h, null, 0) }, h.id)) : n ? u.map((h) => /* @__PURE__ */ e.jsx($.Fragment, { children: k(h, null, 0) }, h.id)) : T(-1)
    ] }),
    /* @__PURE__ */ e.jsx(s.Dialog, { open: x !== null, onOpenChange: (h) => {
      h || o(null);
    }, children: /* @__PURE__ */ e.jsxs(s.DialogContent, { children: [
      /* @__PURE__ */ e.jsxs(s.DialogHeader, { children: [
        /* @__PURE__ */ e.jsxs(s.DialogTitle, { children: [
          "Rename “",
          x?.fallback,
          "”"
        ] }),
        /* @__PURE__ */ e.jsx(s.DialogDescription, { children: c.length > 1 ? `In ${P(r)}.` : "Its title and the slug in its address." })
      ] }),
      x !== null && /* @__PURE__ */ e.jsx(ll, { term: x, locale: r, terms: l, hierarchical: t.hierarchical, onDone: () => o(null) }, x.id)
    ] }) })
  ] });
}
const es = "cms:grid cms:items-center cms:gap-3 cms:grid-cols-[1.5rem_1fr_2.5rem] cms:md:grid-cols-[1.5rem_minmax(0,2fr)_minmax(0,1.2fr)_5rem_7rem_2.5rem]";
function al(t) {
  if (!t) return "—";
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? "—" : a.toLocaleDateString(void 0, { day: "numeric", month: "short", year: "numeric" });
}
function ll({ locale: t, terms: a, hierarchical: l, term: c, onDone: r }) {
  const n = N.useForm({ title: c.title ?? "", slug: c.slug ?? "", parent_id: c.parentId, locale: t, version: c.version }), d = n.errors, m = /* @__PURE__ */ new Set();
  m.add(c.id);
  const x = a.findIndex((i) => i.id === c.id);
  for (let i = x + 1; i < a.length && (a[i]?.depth ?? 0) > c.depth; i++) m.add(a[i].id);
  const o = (i) => {
    i.preventDefault(), n.put(_(`cms/terms/${c.id}`), { preserveScroll: !0, onSuccess: r });
  }, g = `term-${c.id}`;
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: o, className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${g}-title`, children: "Title" }),
      /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: `${g}-title`,
          value: n.data.title,
          placeholder: c.fallback,
          required: !0,
          autoFocus: !0,
          onChange: (i) => n.setData("title", i.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(z, { message: d.title ?? d.version })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${g}-slug`, children: "Slug" }),
      /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: `${g}-slug`,
          className: "cms:font-mono",
          value: n.data.slug,
          placeholder: "Made from the title",
          onChange: (i) => n.setData("slug", i.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(z, { message: d.slug })
    ] }),
    l && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${g}-parent`, children: "Under" }),
      /* @__PURE__ */ e.jsxs(
        s.Select,
        {
          value: n.data.parent_id === null ? De : String(n.data.parent_id),
          onValueChange: (i) => n.setData("parent_id", i === De ? null : Number(i)),
          children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: `${g}-parent`, children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(s.SelectItem, { value: De, children: "Top level" }),
              a.filter((i) => !m.has(i.id)).map((i) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: String(i.id), children: [
                "— ".repeat(i.depth),
                i.title ?? i.fallback
              ] }, i.id))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ e.jsx(z, { message: d.parent_id })
    ] }),
    /* @__PURE__ */ e.jsxs(s.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", onClick: r, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(s.Button, { type: "submit", disabled: n.processing, children: "Save" })
    ] })
  ] });
}
gt({
  pages: {
    "Cms/Blueprints/Index": ha,
    "Cms/Blueprints/Edit": qe,
    "Cms/Fieldsets/Index": za,
    // A fieldset is edited like a blueprint.
    "Cms/Fieldsets/Edit": qe,
    "Cms/Entries/Index": Da,
    "Cms/Entries/Edit": pa,
    "Cms/Listing/Edit": Ma,
    "Cms/Terms/Index": tl,
    "Cms/Terms/Create": sl,
    "Cms/Terms/Edit": Xa,
    "Cms/Globals/Edit": Ia,
    "Cms/Menus/Edit": Ra,
    "Cms/Comments/Index": qa,
    "Cms/Seo/Edit": Ya,
    "Cms/Submissions/Index": Za
  }
});
s.registerCommandSource((t, a) => kt(t, a, _));
