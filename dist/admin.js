function Qe() {
  const t = globalThis.Sunrice;
  if (!t)
    throw new Error("[sunrice] This script runs outside the Sunrice admin panel (window.Sunrice is missing).");
  return t;
}
function rt(t) {
  const a = Qe();
  if (a.version !== 2)
    throw new Error(`[sunrice] This plugin was built for admin runtime 2, but the panel runs ${a.version}. Rebuild it with a matching @sunrice/admin-sdk.`);
  for (const [l, c] of Object.entries(t.pages ?? {}))
    a.registerPage(l, c);
}
function _(t = "") {
  return Qe().adminUrl(t);
}
const Ze = globalThis.Sunrice;
if (!Ze) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const s = Ze.modules["@sunrice/admin-sdk/ui"];
function ce(t) {
  return t && typeof t == "object" && !Array.isArray(t) ? t : {};
}
function it(t, a) {
  if (typeof t != "string" || t === "") return "";
  const l = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(t);
  return l ? a ? `${l[1]}T${l[2] ?? "00:00"}` : l[1] ?? "" : "";
}
function Pe(t) {
  return t === "" ? null : t;
}
function ot() {
  return { _hidden: !1 };
}
function dt(t) {
  return { type: t, hidden: !1, values: {} };
}
function mt(t) {
  const a = t.replace(/[\u0000- \u007f]+/g, ""), l = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(a);
  return l ? ["http", "https", "mailto", "tel"].includes(l[1].toLowerCase()) : !a.includes("\\");
}
function Le({ ids: t, search: a, collections: l }) {
  const c = new URLSearchParams();
  for (const r of t ?? []) c.append("ids[]", String(r));
  a && c.set("search", a);
  for (const r of l) c.append("collections[]", r);
  return c.toString();
}
let ut = 0;
function ht(t, a) {
  return t.length === a ? t.slice() : t.length < a ? [...t, ...Array.from({ length: a - t.length }, () => `k${++ut}`)] : t.slice(0, a);
}
function xt({ taxonomy: t, q: a, ids: l }) {
  const c = new URLSearchParams({ taxonomy: t });
  a && c.set("q", a);
  for (const r of l ?? []) c.append("ids[]", String(r));
  return c.toString();
}
function pt(t, a) {
  return t.map((l) => ({
    id: String(l.id),
    label: l.title,
    description: l.status === "published" ? l.collection : `${l.collection} · ${l.status}`,
    group: "Entries",
    icon: "file-text",
    url: a(`cms/collections/${l.collectionHandle}/entries/${l.id}/edit`)
  }));
}
async function gt(t, a, l) {
  const c = await fetch(`${l("cms/entry-picker")}?${Le({ search: t.trim(), collections: [] })}`, {
    signal: a,
    headers: { Accept: "application/json" },
    credentials: "same-origin"
  });
  if (!c.ok) return [];
  const { items: r } = await c.json();
  return pt(r, l);
}
const Xe = globalThis.Sunrice;
if (!Xe) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const e = Xe.modules["react/jsx-runtime"], es = globalThis.Sunrice;
if (!es) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const D = es.modules.react, ss = globalThis.Sunrice;
if (!ss) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const N = ss.modules["@inertiajs/react"];
const ft = (t) => t?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
function jt(t, a, l = []) {
  if (a == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: ft(t),
    size: 24,
    node: a,
    ...l.length > 0 ? { aliases: l } : {}
  };
}
const bt = (t) => {
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
const vt = (t) => {
  const a = bt(t);
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
function yt(t, a = {}) {
  const l = a.attributeNames ?? {}, c = (u) => l[u] ?? u, r = t.size ?? t.width ?? Z.width, n = t.size ?? t.height ?? Z.height, m = t.aliases?.filter((u) => typeof u == "string" && u.trim() !== "").map((u) => `lucide-${u}`) ?? [], d = [...t.name ? [`lucide-${t.name}`] : [], ...m], h = a.className?.split(" ").filter(Boolean) ?? [], o = a.includeDefaultClasses === !1 ? De(...h) : De("lucide", ...d, ...h), j = a.absoluteStrokeWidth ? Number(a.strokeWidth ?? Z["stroke-width"]) * Number(t.size ?? t.width ?? Z.width) / Number(a.size ?? a.width ?? Z.width) : a.strokeWidth ?? Z["stroke-width"];
  return [
    "svg",
    {
      ...Object.entries(Z).reduce((u, [v, b]) => (u[c(v)] = b, u), {}),
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
      [c("stroke-width")]: j,
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
      const [v, b, x] = u, S = a.nonScalingStroke ? { [c("vector-effect")]: "non-scaling-stroke", ...b } : b;
      return x ? [v, S, x] : [v, S];
    })
  ];
}
function Nt(t, a = {}) {
  return yt(t, {
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
const St = (t) => {
  for (const a in t)
    if (a.startsWith("aria-") || a === "role" || a === "title")
      return !0;
  return !1;
}, Ct = D.createContext({}), kt = () => D.useContext(Ct), wt = D.forwardRef(
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
    iconNode: o = [],
    icon: j = {
      node: o,
      aliases: [],
      size: 24
    },
    ...i
  }, u) => {
    const {
      size: v = 24,
      strokeWidth: b = 2,
      absoluteStrokeWidth: x = !1,
      nonScalingStroke: S = !1,
      color: g = "currentColor",
      className: y = ""
    } = kt() ?? {}, $ = !!h || St(i), [p, k, T = []] = Nt(j, {
      color: t ?? g,
      width: l ?? a ?? v,
      height: c ?? a ?? v,
      strokeWidth: r ?? b,
      absoluteStrokeWidth: n ?? x,
      nonScalingStroke: m ?? S,
      className: De(y, d),
      hasA11yProp: $,
      attributes: i
    });
    return D.createElement(
      p,
      {
        ref: u,
        ...k
      },
      [
        ...T.map(([C, F]) => D.createElement(C, F)),
        ...Array.isArray(h) ? h : [h]
      ]
    );
  }
);
function L(t, a = [], l = []) {
  const c = typeof t == "string" ? jt(t, a, l) : t, r = D.forwardRef(
    ({ className: n, ...m }, d) => D.createElement(wt, {
      ref: d,
      icon: c,
      className: n,
      ...m
    })
  );
  return c.name && (r.displayName = vt(c.name)), r;
}
const ts = {
  name: "arrow-down",
  size: 24,
  node: [
    ["path", { d: "M12 5v14", key: "s699le" }],
    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
  ]
};
ts.node;
const as = L(ts);
const ls = {
  name: "arrow-up-down",
  size: 24,
  node: [
    ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
    ["path", { d: "M17 20V4", key: "1ejh1v" }],
    ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
    ["path", { d: "M7 4v16", key: "1glfcx" }]
  ]
};
ls.node;
const ns = L(ls);
const cs = {
  name: "arrow-up",
  size: 24,
  node: [
    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
    ["path", { d: "M12 19V5", key: "x0mq9r" }]
  ]
};
cs.node;
const rs = L(cs);
const is = {
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
is.node;
const os = L(is);
const ds = {
  name: "check",
  size: 24,
  node: [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]
};
ds.node;
const he = L(ds);
const ms = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
ms.node;
const us = L(ms);
const hs = {
  name: "chevron-left",
  size: 24,
  node: [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]]
};
hs.node;
const Me = L(hs);
const xs = {
  name: "chevron-right",
  size: 24,
  node: [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]
};
xs.node;
const pe = L(xs);
const ps = {
  name: "columns-3",
  size: 24,
  node: [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M9 3v18", key: "fh3hqa" }],
    ["path", { d: "M15 3v18", key: "14nvp0" }]
  ],
  aliases: ["panels-left-right"]
};
ps.node;
const $t = L(ps);
const gs = {
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
gs.node;
const Dt = L(gs);
const fs = {
  name: "copy",
  size: 24,
  node: [
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
  ]
};
fs.node;
const _t = L(fs);
const js = {
  name: "download",
  size: 24,
  node: [
    ["path", { d: "M12 15V3", key: "m9g1x1" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
  ]
};
js.node;
const bs = L(js);
const vs = {
  name: "external-link",
  size: 24,
  node: [
    ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
    ["path", { d: "M10 14 21 3", key: "gplh6r" }],
    ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
  ]
};
vs.node;
const oe = L(vs);
const ys = {
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
ys.node;
const Tt = L(ys);
const Ns = {
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
Ns.node;
const Bt = L(Ns);
const Ss = {
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
Ss.node;
const zt = L(Ss);
const Cs = {
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
Cs.node;
const Lt = L(Cs);
const ks = {
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
ks.node;
const Mt = L(ks);
const ws = {
  name: "link-2",
  size: 24,
  node: [
    ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
    ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
    ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
  ]
};
ws.node;
const It = L(ws);
const $s = {
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
$s.node;
const At = L($s);
const Ds = {
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
Ds.node;
const Et = L(Ds);
const _s = {
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
_s.node;
const Ft = L(_s);
const Ts = {
  name: "loader-circle",
  size: 24,
  node: [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  aliases: ["loader-2"]
};
Ts.node;
const le = L(Ts);
const Bs = {
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
Bs.node;
const zs = L(Bs);
const Ls = {
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
Ls.node;
const Ht = L(Ls);
const Ms = {
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
Ms.node;
const Is = L(Ms);
const As = {
  name: "plus",
  size: 24,
  node: [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ]
};
As.node;
const q = L(As);
const Es = {
  name: "rotate-ccw",
  size: 24,
  node: [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ]
};
Es.node;
const xe = L(Es);
const Fs = {
  name: "search",
  size: 24,
  node: [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ]
};
Fs.node;
const ge = L(Fs);
const Hs = {
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
Hs.node;
const _e = L(Hs);
const Ps = {
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
Ps.node;
const Pt = L(Ps);
const Vs = {
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
Vs.node;
const R = L(Vs);
const Rs = {
  name: "undo-2",
  size: 24,
  node: [
    ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
    ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
  ]
};
Rs.node;
const Te = L(Rs);
const Os = {
  name: "x",
  size: 24,
  node: [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]
};
Os.node;
const fe = L(Os);
function Q() {
  const [t, a] = D.useState(null), l = /* @__PURE__ */ e.jsx(s.Dialog, { open: t !== null, onOpenChange: (c) => !c && a(null), children: /* @__PURE__ */ e.jsxs(s.DialogContent, { children: [
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
function Us(t) {
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
  const a = await fetch(`${_("cms/entry-picker")}?${Le(t)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!a.ok) throw new Error(String(a.status));
  return (await a.json()).items;
}
function je({ id: t, value: a, multiple: l, max: c, collections: r, invalid: n, onChange: m }) {
  const d = a === null ? [] : Array.isArray(a) ? a : [a], [h, o] = D.useState({}), [j, i] = D.useState(""), [u, v] = D.useState(null), [b, x] = D.useState(!1), S = l && c !== null && d.length >= c, g = d.filter((p) => !h[p]).join(",");
  D.useEffect(() => {
    g !== "" && Ve({ ids: g.split(",").map(Number), collections: r }).then((p) => o((k) => ({ ...k, ...Object.fromEntries(p.map((T) => [T.id, T])) }))).catch(() => x(!0));
  }, [g]), D.useEffect(() => {
    if (j.trim() === "") {
      v(null);
      return;
    }
    const p = window.setTimeout(() => {
      Ve({ search: j.trim(), collections: r }).then((k) => {
        v(k), x(!1);
      }).catch(() => x(!0));
    }, 250);
    return () => window.clearTimeout(p);
  }, [j]);
  const y = (p) => {
    o((k) => ({ ...k, [p.id]: p })), m(l ? [...d, p.id] : p.id), i("");
  }, $ = (p) => m(l ? p : p[0] ?? null);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    d.length > 0 && /* @__PURE__ */ e.jsx(s.SortableList, { items: d, getId: (p) => p, onReorder: (p) => $(p), disabled: !l, className: "cms:gap-1", children: (p, { handle: k }) => {
      const T = h[p];
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
            onClick: () => $(d.filter((C) => C !== p)),
            children: /* @__PURE__ */ e.jsx(fe, {})
          }
        )
      ] });
    } }),
    !S && (l || d.length === 0) && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-md", children: [
      /* @__PURE__ */ e.jsx(ge, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
      /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: t,
          className: "cms:pl-9",
          placeholder: "Search entries by title",
          "aria-invalid": n,
          value: j,
          autoComplete: "off",
          onChange: (p) => i(p.target.value)
        }
      ),
      u !== null && /* @__PURE__ */ e.jsxs("ul", { role: "listbox", "aria-label": "Matching entries", className: "cms:absolute cms:z-10 cms:mt-1 cms:max-h-64 cms:w-full cms:overflow-auto cms:rounded-md cms:border cms:bg-card cms:p-1 cms:shadow-md", children: [
        u.filter((p) => !d.includes(p.id)).length === 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: "No entries match." }),
        u.filter((p) => !d.includes(p.id)).map((p) => /* @__PURE__ */ e.jsx("li", { role: "option", "aria-selected": !1, children: /* @__PURE__ */ e.jsxs(
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
const Ks = D.createContext({}), ve = "__none";
async function Re(t) {
  const a = await fetch(`${_("cms/term-picker")}?${xt(t)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!a.ok) throw new Error(String(a.status));
  return await a.json();
}
function Vt({ id: t, taxonomy: a, multiple: l, max: c, required: r, invalid: n, value: m, onChange: d }) {
  const h = D.useContext(Ks), o = m === null ? [] : Array.isArray(m) ? m : [m], [j, i] = D.useState(null), [u, v] = D.useState(!1), [b, x] = D.useState(""), [S, g] = D.useState({}), [y, $] = D.useState(!1);
  D.useEffect(() => {
    if (!a) return;
    const w = b.trim(), A = window.setTimeout(() => {
      Re({ taxonomy: a, q: w }).then((E) => {
        i(E.items), E.more && v(!0), $(!1);
      }).catch(() => $(!0));
    }, w === "" ? 0 : 250);
    return () => window.clearTimeout(A);
  }, [a, b]);
  const p = (w) => h[String(w)] ?? S[w] ?? j?.find((A) => A.id === w)?.label, k = j === null ? "" : o.filter((w) => p(w) === void 0).join(",");
  if (D.useEffect(() => {
    !a || k === "" || Re({ taxonomy: a, ids: k.split(",").map(Number) }).then((w) => g((A) => ({ ...A, ...Object.fromEntries(w.items.map((E) => [E.id, E.label])) }))).catch(() => $(!0));
  }, [a, k]), !a) return /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Choose a taxonomy for this field in its blueprint." });
  if (j === null) return y ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "Terms could not be loaded. Try again." }) : /* @__PURE__ */ e.jsx(s.Skeleton, { className: "cms:h-9 cms:w-full cms:max-w-sm" });
  const T = (w) => `${"— ".repeat(w.depth)}${w.label}`, C = l && c !== null && o.length >= c, F = (w) => d(l ? w : w[0] ?? null), V = u && o.length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-1.5", children: o.map((w) => /* @__PURE__ */ e.jsxs(s.Badge, { variant: "secondary", className: "cms:gap-1 cms:pr-1", children: [
    p(w) ?? `Term #${w}`,
    !(r && !l) && /* @__PURE__ */ e.jsx(
      "button",
      {
        type: "button",
        className: "cms:rounded-sm cms:p-0.5 cms:hover:bg-muted",
        "aria-label": `Remove ${p(w) ?? w}`,
        onClick: () => F(o.filter((A) => A !== w)),
        children: /* @__PURE__ */ e.jsx(fe, { className: "cms:size-3" })
      }
    )
  ] }, w)) }), z = u && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-sm", children: [
    /* @__PURE__ */ e.jsx(ge, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
    /* @__PURE__ */ e.jsx(
      s.Input,
      {
        id: t,
        className: "cms:pl-9",
        placeholder: "Search terms",
        autoComplete: "off",
        "aria-invalid": n,
        value: b,
        onChange: (w) => x(w.target.value)
      }
    )
  ] });
  if (!l && !u) {
    const w = o[0], A = w === void 0 || j.some((E) => E.id === w);
    return /* @__PURE__ */ e.jsxs(s.Select, { value: w === void 0 ? ve : String(w), onValueChange: (E) => d(E === ve ? null : Number(E)), children: [
      /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: t, className: "cms:w-full cms:max-w-sm", "aria-invalid": n, children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
      /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
        !r && /* @__PURE__ */ e.jsx(s.SelectItem, { value: ve, children: "None" }),
        !A && w !== void 0 && /* @__PURE__ */ e.jsx(s.SelectItem, { value: String(w), children: p(w) ?? `Term #${w}` }),
        j.map((E) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: String(E.id), children: T(E) }, E.id))
      ] })
    ] });
  }
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    V,
    z,
    j.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: b.trim() ? "No terms match." : "Nothing to choose from yet." }) : l ? /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:max-h-72 cms:flex-col cms:gap-2 cms:overflow-auto", children: j.map((w) => {
      const A = o.includes(w.id);
      return /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx(
          s.Checkbox,
          {
            checked: A,
            disabled: !A && C,
            onCheckedChange: (E) => F(E ? [...o, w.id] : o.filter((te) => te !== w.id))
          }
        ),
        T(w)
      ] }, w.id);
    }) }) : /* @__PURE__ */ e.jsx("div", { role: "listbox", "aria-label": "Terms", className: "cms:flex cms:max-h-72 cms:flex-col cms:overflow-auto", children: j.map((w) => /* @__PURE__ */ e.jsx(
      s.Button,
      {
        type: "button",
        variant: o[0] === w.id ? "secondary" : "ghost",
        size: "sm",
        className: "cms:justify-start",
        role: "option",
        "aria-selected": o[0] === w.id,
        onClick: () => d(w.id),
        children: T(w)
      },
      w.id
    )) })
  ] });
}
const Rt = 5;
let Ot = 0;
const Ws = () => `f${++Ot}`;
function qs(t) {
  return t.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function Gs(t) {
  return t.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^[0-9_]+/, "").replace(/_{2,}/g, "_").slice(0, 64);
}
function Js(t, a) {
  const l = new Set(a.map((n) => n.handle)), c = qs(t) || "field";
  let r = c;
  for (let n = 2; l.has(r); n++)
    r = `${c}_${n}`;
  return r;
}
function Ys(t) {
  return (t ?? []).map(({ fields: a, ...l }) => ({
    ...l,
    key: Ws(),
    fields: Ys(a),
    handleTouched: !0
  }));
}
function Qs(t, a) {
  return t.map(({ key: l, handleTouched: c, fields: r, ...n }) => ({
    ...n,
    validation: (n.validation ?? []).map((m) => m.trim()).filter((m) => m !== ""),
    ...a(n.type) ? { fields: Qs(r, a) } : {}
  }));
}
function Ut(t, a, l) {
  return { key: Ws(), type: t, label: a, handle: Js(a, l), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function Kt(t, a, l) {
  if (t.handleTouched) return { ...t, label: a };
  const c = l.filter((r) => r.key !== t.key);
  return { ...t, label: a, handle: Js(a || t.type, c) };
}
function re(t, a) {
  const l = `${a}.`, c = {};
  for (const [r, n] of Object.entries(t))
    r.startsWith(l) && (c[r.slice(l.length)] = n);
  return c;
}
function W(t, a) {
  const l = t[a];
  return { ...re(t, a), ...l !== void 0 ? { "": l } : {} };
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
function M({ message: t }) {
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
const Wt = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function Be(t) {
  if (t.label) return t.label;
  const a = t.handle.replace(/_/g, " ");
  return a.charAt(0).toUpperCase() + a.slice(1);
}
function ee({ field: t, value: a, onChange: l, errors: c, id: r, content: n = !1 }) {
  const m = Be(t), d = Wt.includes(t.type) || ["select", "terms"].includes(t.type) && t.config?.multiple === !0;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", ...d ? { role: "group", "aria-labelledby": `${r}-label` } : {}, children: [
    t.type === "toggle" ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(s.Switch, { id: r, checked: a === !0, onCheckedChange: (h) => l(h) }),
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: r, children: m })
    ] }) : /* @__PURE__ */ e.jsxs(s.Label, { id: `${r}-label`, htmlFor: d ? void 0 : r, children: [
      m,
      t.required && /* @__PURE__ */ e.jsx("span", { className: "cms:text-destructive", children: " *" })
    ] }),
    /* @__PURE__ */ e.jsx(qt, { field: t, value: a, onChange: l, errors: c, id: r, content: n }),
    t.instructions && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t.instructions }),
    /* @__PURE__ */ e.jsx(M, { message: c[""] })
  ] });
}
function qt({ field: t, value: a, onChange: l, errors: c, id: r, content: n }) {
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
          value: Pe(it(a, d)),
          onChange: (h) => l(Pe(h ?? ""))
        }
      );
    }
    case "select":
      return t.config?.multiple === !0 ? /* @__PURE__ */ e.jsx(Yt, { options: Ue(t), value: Array.isArray(a) ? a.map(String) : [], onChange: l }) : /* @__PURE__ */ e.jsx(Jt, { options: Ue(t), value: typeof a == "string" ? a : null, onChange: l, id: r, required: t.required === !0 });
    case "terms": {
      const d = t.config?.multiple === !0, h = Array.isArray(a) ? a.filter((o) => typeof o == "number") : typeof a == "number" ? a : null;
      return /* @__PURE__ */ e.jsx(
        Vt,
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
      return /* @__PURE__ */ e.jsx(Qt, { value: ce(a), onChange: l, errors: c, id: r, collections: t.collections ?? [] });
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
      return /* @__PURE__ */ e.jsx(se, { fields: t.fields ?? [], value: ce(a), onChange: l, errors: c, id: r, content: n });
    case "repeater":
      return /* @__PURE__ */ e.jsx(Xt, { field: t, value: Array.isArray(a) ? a : [], onChange: l, errors: c, id: r, content: n });
    case "flexible":
      return /* @__PURE__ */ e.jsx(ea, { field: t, value: Array.isArray(a) ? a : [], onChange: l, errors: c, id: r });
    default:
      return /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: r,
          "aria-invalid": m,
          value: typeof a == "string" ? a : "",
          placeholder: Gt(t, "placeholder"),
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
function Gt(t, a) {
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
      errors: W(c, d.handle),
      onChange: (h) => l({ ...a, [d.handle]: h })
    },
    d.handle
  )) });
}
function Jt({ options: t, value: a, onChange: l, id: c, required: r }) {
  return /* @__PURE__ */ e.jsxs(s.Select, { value: a ?? Ne, onValueChange: (n) => l(n === Ne ? null : n), children: [
    /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: c, className: "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
    /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
      !r && /* @__PURE__ */ e.jsx(s.SelectItem, { value: Ne, children: "None" }),
      t.map((n) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: n.value, children: n.label }, n.value))
    ] })
  ] });
}
function Yt({ options: t, value: a, onChange: l }) {
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
function Qt({ value: t, onChange: a, errors: l, id: c, collections: r }) {
  const n = t.type === "entry" ? "entry" : "url", m = (d) => {
    const h = { ...t, type: n, ...d }, o = h.type === "entry" ? typeof h.entry_id != "number" : h.url === "" || h.url === void 0 || h.url === null;
    a(o ? h.label || h.new_tab ? h : null : h);
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
      /* @__PURE__ */ e.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ e.jsx(M, { message: l.url ?? l.entry_id ?? l.label ?? l.type }) })
    ] })
  ] });
}
function Zt(t, a) {
  return !a && (t.fields ?? []).every((l) => l.type === "text");
}
function Zs(t) {
  const a = D.useRef([]);
  return a.current = ht(a.current, t), {
    keys: a.current,
    remove: (l) => {
      a.current = a.current.filter((c, r) => r !== l);
    },
    move: (l, c) => {
      a.current = s.moveItem(a.current, l, c);
    }
  };
}
function Xt({ field: t, value: a, onChange: l, errors: c, id: r, content: n = !1 }) {
  const m = t.fields ?? [], d = a.map(ce), h = Zs(d.length), o = (b, x) => l(d.map((S, g) => g === b ? x : S)), j = (b) => {
    h.remove(b), l(d.filter((x, S) => S !== b));
  }, i = (t.label || "row").toLowerCase().replace(/s$/, ""), u = i.charAt(0).toUpperCase() + i.slice(1), v = d.map((b, x) => ({ row: b, index: x, key: h.keys[x] ?? String(x) }));
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(
      s.SortableList,
      {
        items: v,
        getId: (b) => b.key,
        onReorder: (b, x, S) => {
          h.move(x, S), l(b.map((g) => g.row));
        },
        children: ({ row: b, index: x }, { handle: S }) => Zt(t, n) ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(s.SortableHandle, { ...S, label: `Move ${i} ${x + 1}`, className: "cms:mt-1" }),
          m.map((g) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
            /* @__PURE__ */ e.jsx(
              s.Input,
              {
                "aria-label": g.label || g.handle,
                placeholder: g.label || g.handle,
                value: typeof b[g.handle] == "string" ? b[g.handle] : "",
                onChange: (y) => o(x, { ...b, [g.handle]: y.target.value })
              }
            ),
            /* @__PURE__ */ e.jsx(M, { message: c[`${x}.${g.handle}`] })
          ] }, g.handle)),
          /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": `Remove ${i} ${x + 1}`, onClick: () => j(x), children: /* @__PURE__ */ e.jsx(R, {}) })
        ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(
            Xs,
            {
              label: `${u} ${x + 1}`,
              handle: S,
              onRemove: () => j(x),
              hidden: n ? b._hidden === !0 : void 0,
              onHidden: (g) => o(x, { ...b, _hidden: g })
            }
          ),
          /* @__PURE__ */ e.jsx(se, { fields: m, value: b, onChange: (g) => o(x, g), errors: W(c, String(x)), id: `${r}-${x}`, content: n })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", size: "sm", onClick: () => l([...d, n ? ot() : {}]), children: [
      /* @__PURE__ */ e.jsx(q, {}),
      " Add ",
      i
    ] }) })
  ] });
}
function ea({ field: t, value: a, onChange: l, errors: c, id: r }) {
  const n = t.blocks ?? [], m = a.map(ce), d = Zs(m.length), h = (i, u) => l(m.map((v, b) => b === i ? u : v)), o = (i) => {
    d.remove(i), l(m.filter((u, v) => v !== i));
  }, j = m.map((i, u) => ({ block: i, index: u, key: d.keys[u] ?? String(u) }));
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    /* @__PURE__ */ e.jsx(
      s.SortableList,
      {
        items: j,
        getId: (i) => i.key,
        className: "cms:gap-3",
        onReorder: (i, u, v) => {
          d.move(u, v), l(i.map((b) => b.block));
        },
        children: ({ block: i, index: u }, { handle: v }) => {
          const b = n.find((x) => x.type === i.type);
          return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              Xs,
              {
                label: b?.label ?? String(i.type),
                badge: !0,
                handle: v,
                onRemove: () => o(u),
                hidden: i.hidden === !0,
                onHidden: (x) => h(u, { ...i, hidden: x })
              }
            ),
            b ? /* @__PURE__ */ e.jsx(
              se,
              {
                fields: b.fields,
                value: ce(i.values),
                onChange: (x) => h(u, { ...i, values: x }),
                errors: W(c, `${u}.values`),
                id: `${r}-${u}`,
                content: !0
              }
            ) : /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: "This kind of block no longer exists. Its values are kept." }),
            /* @__PURE__ */ e.jsx(M, { message: c[`${u}.type`] })
          ] });
        }
      }
    ),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(s.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(s.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", size: "sm", disabled: n.length === 0, children: [
        /* @__PURE__ */ e.jsx(q, {}),
        " Add block"
      ] }) }),
      /* @__PURE__ */ e.jsx(s.DropdownMenuContent, { align: "start", children: n.map((i) => /* @__PURE__ */ e.jsx(s.DropdownMenuItem, { onSelect: () => l([...m, dt(i.type)]), children: i.label }, i.type)) })
    ] }) })
  ] });
}
function Xs({ label: t, badge: a = !1, handle: l, onRemove: c, hidden: r, onHidden: n }) {
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
function et({ fields: t, onChange: a, types: l, errors: c, depth: r = 1, idPrefix: n = "field" }) {
  const [m, d] = D.useState(() => /* @__PURE__ */ new Set()), h = (i) => d((u) => {
    const v = new Set(u);
    return v.has(i) ? v.delete(i) : v.add(i), v;
  }), o = (i, u) => a(t.map((v, b) => b === i ? u : v)), j = (i) => {
    const u = Ut(i.type, i.label, t);
    a([...t, u]), d((v) => new Set(v).add(u.key));
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    t.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:border-dashed cms:p-4 cms:text-sm cms:text-muted-foreground", children: "No fields yet." }),
    /* @__PURE__ */ e.jsx(s.SortableList, { items: t, getId: (i) => i.key, onReorder: (i) => a(i), children: (i, { index: u, handle: v, isOverlay: b }) => {
      const x = l.find((y) => y.type === i.type), S = !b && (m.has(i.key) || ae(c, String(u))), g = `${n}-${i.key}`;
      return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${ae(c, String(u)) ? "cms:border-destructive" : ""}`, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:p-2", children: [
          /* @__PURE__ */ e.jsx(s.SortableHandle, { ...v, label: `Move ${i.label || i.handle}` }),
          /* @__PURE__ */ e.jsx(
            s.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-expanded": S,
              "aria-controls": g,
              "aria-label": `${S ? "Close" : "Open"} ${i.label || i.handle}`,
              onClick: () => h(i.key),
              children: S ? /* @__PURE__ */ e.jsx(us, {}) : /* @__PURE__ */ e.jsx(pe, {})
            }
          ),
          /* @__PURE__ */ e.jsxs("button", { type: "button", className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:text-left", onClick: () => h(i.key), children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: i.label || i.handle }),
            /* @__PURE__ */ e.jsx("code", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", children: i.handle })
          ] }),
          i.required && /* @__PURE__ */ e.jsx(s.Badge, { variant: "outline", children: "Required" }),
          /* @__PURE__ */ e.jsx(s.Badge, { variant: "secondary", children: x?.label ?? i.type }),
          x?.hasChildren && i.fields.length > 0 && !S && /* @__PURE__ */ e.jsxs("span", { className: "cms:text-xs cms:text-muted-foreground", children: [
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
              onClick: () => a(t.filter((y, $) => $ !== u)),
              children: /* @__PURE__ */ e.jsx(R, {})
            }
          )
        ] }),
        S && /* @__PURE__ */ e.jsx(
          sa,
          {
            id: g,
            field: i,
            type: x,
            siblings: t,
            onChange: (y) => o(u, y),
            types: l,
            errors: re(c, String(u)),
            depth: r
          }
        )
      ] });
    } }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(s.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(s.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", size: "sm", children: [
        /* @__PURE__ */ e.jsx(q, {}),
        " Add field"
      ] }) }),
      /* @__PURE__ */ e.jsx(s.DropdownMenuContent, { align: "start", children: l.filter((i) => !i.hasChildren || r < Rt).map((i) => /* @__PURE__ */ e.jsx(s.DropdownMenuItem, { onSelect: () => j(i), children: i.label }, i.type)) })
    ] }) })
  ] });
}
const Y = { default: "__default", yes: "yes", no: "no" };
function sa({ id: t, field: a, type: l, siblings: c, onChange: r, types: n, errors: m, depth: d }) {
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
        /* @__PURE__ */ e.jsx(s.Input, { id: `${t}-label`, value: a.label ?? "", onChange: (o) => r(Kt(a, o.target.value, c)) }),
        /* @__PURE__ */ e.jsx(M, { message: m.label })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${t}-handle`, children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            id: `${t}-handle`,
            className: "cms:font-mono",
            value: a.handle,
            onChange: (o) => r({ ...a, handle: Gs(o.target.value), handleTouched: !0 })
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "How templates read it. Renaming it hides values saved under the old one." }),
        /* @__PURE__ */ e.jsx(M, { message: m.handle })
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
      /* @__PURE__ */ e.jsx(M, { message: m.instructions })
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
    /* @__PURE__ */ e.jsx(ta, { id: t, field: a, siblings: c, onChange: r, errors: re(m, "condition") }),
    (l?.settings.length ?? 0) > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: l?.settings.map((o) => /* @__PURE__ */ e.jsx(
      ee,
      {
        id: `${t}-config-${o.handle}`,
        field: o,
        value: h[o.handle],
        errors: W(m, `config.${o.handle}`),
        onChange: (j) => r({ ...a, config: { ...h, [o.handle]: j } })
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
      /* @__PURE__ */ e.jsx(M, { message: m.validation ?? Object.entries(m).find(([o]) => o.startsWith("validation."))?.[1] })
    ] }),
    l?.hasChildren && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(s.Label, { children: "Fields inside" }),
      /* @__PURE__ */ e.jsx(
        et,
        {
          fields: a.fields,
          onChange: (o) => r({ ...a, fields: o }),
          types: n,
          errors: re(m, "fields"),
          depth: d + 1,
          idPrefix: t
        }
      ),
      /* @__PURE__ */ e.jsx(M, { message: m.fields })
    ] }),
    /* @__PURE__ */ e.jsx(M, { message: m.type })
  ] });
}
const Se = "__always";
function ta({ id: t, field: a, siblings: l, onChange: c, errors: r }) {
  const n = l.filter((o) => o.key !== a.key && o.handle !== ""), m = a.condition ?? null, d = ye.find((o) => o.value === m?.operator) ?? ye[0], h = (o) => c({ ...a, condition: o === null ? null : { field: m?.field ?? n[0]?.handle ?? "", operator: m?.operator ?? "equals", value: m?.value ?? "", ...o } });
  return n.length === 0 && m === null ? null : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${t}-condition`, children: "Show" }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(s.Select, { value: m?.field ?? Se, onValueChange: (o) => h(o === Se ? null : { field: o }), children: [
        /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: `${t}-condition`, className: "cms:w-56", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
        /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
          /* @__PURE__ */ e.jsx(s.SelectItem, { value: Se, children: "Always" }),
          n.map((o) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: o.handle, children: [
            "When ",
            o.label || o.handle
          ] }, o.key))
        ] })
      ] }),
      m && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(s.Select, { value: d.value, onValueChange: (o) => h({ operator: o }), children: [
          /* @__PURE__ */ e.jsx(s.SelectTrigger, { "aria-label": "How to compare", className: "cms:w-36", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(s.SelectContent, { children: ye.map((o) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: o.value, children: o.label }, o.value)) })
        ] }),
        d.needsValue && /* @__PURE__ */ e.jsx(
          s.Input,
          {
            "aria-label": "Value",
            className: "cms:w-48",
            placeholder: "a value, or true / false",
            value: String(m.value ?? ""),
            onChange: (o) => h({ value: o.target.value })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "A hidden field isn't required, and keeps what it had." }),
    /* @__PURE__ */ e.jsx(M, { message: r.field ?? r.operator ?? r.value ?? r[""] })
  ] });
}
function aa({ kind: t = "blueprint", blueprint: a, fieldTypes: l, usedBy: c = [] }) {
  const r = t === "fieldset" ? "Fieldset" : "Blueprint", n = _(t === "fieldset" ? "cms/fieldsets" : "cms/blueprints"), m = a ? a.title : `New ${r.toLowerCase()}`;
  s.useBreadcrumbs([{ label: `${r}s`, href: n }, { label: m }]);
  const [d, h] = Q(), o = N.useForm({ title: a?.title ?? "", handle: a?.handle ?? "" }), [j, i] = D.useState(a !== null), [u, v] = D.useState(() => Ys(a?.fields)), b = (C) => l.find((F) => F.type === C)?.hasChildren === !0, x = o.errors, [S, g] = D.useState(() => JSON.stringify(u)), y = o.isDirty || JSON.stringify(u) !== S, $ = () => {
    o.setDefaults(), g(JSON.stringify(u));
  }, p = () => {
    o.processing || (o.transform((C) => ({
      ...a ? { title: C.title } : C,
      fields: Qs(u, b)
    })), a ? o.put(`${n}/${a.id}`, { preserveScroll: !0, onSuccess: $ }) : o.post(n, { onSuccess: $ }));
  }, k = (C) => {
    C.preventDefault(), p();
  };
  s.useUnsavedChanges(y, p);
  const T = () => a && d(
    `Delete the ${r.toLowerCase()} "${a.title}"? Content keeps its values.`,
    () => N.router.delete(`${n}/${a.id}`, { preserveScroll: !0 })
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: k, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: m }),
    h,
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: m,
        back: { href: n, label: `Back to ${r.toLowerCase()}s` },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          a && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", size: "icon", className: "cms:text-destructive", "aria-label": `Delete ${m}`, onClick: T, children: /* @__PURE__ */ e.jsx(R, {}) }),
          /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: o.processing, children: [
            o.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
            a ? "Save" : `Create ${r.toLowerCase()}`
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(M, { message: x.blueprint ?? x.fieldset }),
    /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsxs(s.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "title", children: "Title" }),
        /* @__PURE__ */ e.jsx(s.Input, { id: "title", value: o.data.title, required: !0, onChange: (C) => {
          o.setData((F) => ({ ...F, title: C.target.value, handle: j ? F.handle : qs(C.target.value) }));
        } }),
        /* @__PURE__ */ e.jsx(M, { message: x.title })
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
            onChange: (C) => {
              i(!0), o.setData("handle", Gs(C.target.value));
            }
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: a ? "Set when it was created." : "Lowercase letters, digits and underscores. It can't change later." }),
        /* @__PURE__ */ e.jsx(M, { message: x.handle })
      ] })
    ] }) }),
    c.length > 0 && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      "Used by ",
      c.join(", "),
      ". Changes show there at once."
    ] }),
    /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-3", "aria-labelledby": "fields-heading", children: [
      /* @__PURE__ */ e.jsx("h2", { id: "fields-heading", className: "cms:text-lg cms:font-medium", children: "Fields" }),
      /* @__PURE__ */ e.jsx(et, { fields: u, onChange: v, types: l, errors: re(x, "fields") }),
      /* @__PURE__ */ e.jsx(M, { message: x.fields })
    ] })
  ] });
}
function st({ noun: t, base: a, rows: l, intro: c }) {
  const r = `${t}s`;
  s.useBreadcrumbs([{ label: r }]);
  const [n, m] = Q();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: r }),
    m,
    /* @__PURE__ */ e.jsx(s.PageHeader, { title: r, description: c, actions: /* @__PURE__ */ e.jsx(s.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(N.Link, { href: `${a}/create`, children: [
      /* @__PURE__ */ e.jsx(q, {}),
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
function la({ blueprints: t }) {
  const a = N.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(M, { message: a.blueprint }),
    /* @__PURE__ */ e.jsx(
      st,
      {
        noun: "Blueprint",
        base: _("cms/blueprints"),
        rows: t,
        intro: "The fields editors fill in, for each kind of content."
      }
    )
  ] });
}
const Ke = { preserveScroll: !0, preserveState: !0 };
function na({ entryId: t, comments: a }) {
  const [l, c] = D.useState(null), [r, n] = D.useState(""), [m, d] = D.useState(!1), h = (j, i) => N.router.post(_(`cms/comments/${j}/status`), { status: i }, Ke), o = (j) => N.router.post(_(`cms/comments/${j}/reply`), { body: r }, {
    ...Ke,
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
        a.latest.map((j) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5 cms:border-t cms:border-border/70 cms:pt-3 cms:first-of-type:border-t-0 cms:first-of-type:pt-0", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium", children: j.author }),
            j.status === "pending" && /* @__PURE__ */ e.jsx(s.Badge, { variant: "outline", children: "Pending" })
          ] }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:line-clamp-3 cms:break-words cms:whitespace-pre-line", children: j.excerpt }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
            G(j.createdAt),
            j.reply ? " · a reply" : ""
          ] }),
          a.canModerate && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-1", children: [
            j.status === "pending" && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", size: "sm", onClick: () => h(j.id, "approved"), children: [
              /* @__PURE__ */ e.jsx(he, {}),
              " Approve"
            ] }),
            /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => h(j.id, "spam"), children: [
              /* @__PURE__ */ e.jsx(_e, {}),
              " Spam"
            ] }),
            /* @__PURE__ */ e.jsxs(
              s.Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                "aria-expanded": l === j.id,
                onClick: () => {
                  c(l === j.id ? null : j.id), n("");
                },
                children: [
                  /* @__PURE__ */ e.jsx(zs, {}),
                  " Reply"
                ]
              }
            )
          ] }),
          l === j.id && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              s.Textarea,
              {
                "aria-label": `Reply to ${j.author}`,
                rows: 3,
                value: r,
                onChange: (i) => n(i.target.value)
              }
            ),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
              /* @__PURE__ */ e.jsx(s.Button, { type: "button", size: "sm", disabled: r.trim() === "" || m, onClick: () => o(j.id), children: "Post reply" }),
              /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => c(null), children: "Cancel" })
            ] })
          ] })
        ] }, j.id)),
        /* @__PURE__ */ e.jsx("a", { href: _(`cms/comments?entry=${t}`), className: "cms:text-sm cms:font-medium cms:underline-offset-4 cms:hover:underline", children: "All comments on this entry" })
      ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Skeleton, { className: "cms:h-10" }),
        /* @__PURE__ */ e.jsx(s.Skeleton, { className: "cms:h-10" })
      ] })
    }
  );
}
function Ae({ fields: t, values: a, onChange: l, errors: c, storageKey: r, shared: n = [], sharedValues: m = {}, sharedNote: d, disabled: h = !1 }) {
  const o = [], j = { ...m, ...a };
  for (const u of t.filter((v) => Ie(v, j))) {
    const v = o[o.length - 1];
    u.type === "group" ? o.push(u) : Array.isArray(v) ? v.push(u) : o.push([u]);
  }
  const i = d ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: d }) : null;
  return /* @__PURE__ */ e.jsx(e.Fragment, { children: o.map((u) => {
    if (Array.isArray(u))
      return /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsx(s.CardContent, { children: /* @__PURE__ */ e.jsx("fieldset", { disabled: h, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: u.map((S) => n.includes(S.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(ee, { id: `data-${S.handle}`, field: S, content: !0, value: m[S.handle], errors: {}, onChange: () => {
        } }),
        i
      ] }, S.handle) : /* @__PURE__ */ e.jsx(
        ee,
        {
          id: `data-${S.handle}`,
          field: S,
          content: !0,
          value: a[S.handle],
          errors: W(c, `data.${S.handle}`),
          onChange: (g) => l(S.handle, g)
        },
        S.handle
      )) }) }) }, `fields-${u[0]?.handle ?? ""}`);
    const v = n.includes(u.handle), b = (v ? m : a)[u.handle], x = W(c, `data.${u.handle}`);
    return /* @__PURE__ */ e.jsx(
      s.CollapsibleCard,
      {
        title: Be(u),
        titleClassName: "cms:text-base",
        description: u.instructions ?? void 0,
        storageKey: `${r}:${u.handle}`,
        hasErrors: !v && ae(c, `data.${u.handle}`),
        children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: v || h, role: "group", "aria-label": Be(u), className: "cms:flex cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(
            se,
            {
              bare: !0,
              fields: u.fields ?? [],
              id: `data-${u.handle}`,
              content: !0,
              errors: v ? {} : x,
              value: b && typeof b == "object" && !Array.isArray(b) ? b : {},
              onChange: (S) => l(u.handle, S)
            }
          ),
          v && i,
          /* @__PURE__ */ e.jsx(M, { message: v ? void 0 : x[""] })
        ] })
      },
      u.handle
    );
  }) });
}
const Ee = [
  { handle: "title", type: "text", label: "SEO title", instructions: "For search results and tabs. Empty: the title.", config: { max: 255 } },
  { handle: "description", type: "textarea", label: "Description", instructions: "A sentence or two for search results and shared links.", config: { max: 500 } },
  { handle: "image", type: "media", label: "Share image", instructions: "Shown when the page is shared.", config: { types: ["image"] } },
  { handle: "noindex", type: "toggle", label: "Hide from search engines" },
  { handle: "canonical", type: "text", label: "Canonical address", instructions: "Only when this page copies one elsewhere: that page's full address. Empty: this page.", config: { max: 2e3 } }
];
function We(t) {
  return t.length === 0 ? "" : ` It's used by ${t.slice(0, 5).map((l) => l.label).join("; ")}${t.length > 5 ? ` and ${t.length - 5} more` : ""}: those links will show nothing.`;
}
function ca(t) {
  const { entry: a } = t;
  return /* @__PURE__ */ e.jsx(ra, { ...t }, a ? `${a.id}:${a.locale}:${a.version}:${a.status}:${a.trashed}:${a.publishedAt}` : "new");
}
function ra({ collection: t, fields: a, locales: l = [], shared: c = [], sharedValues: r = {}, entry: n, values: m, revisions: d, comments: h, termLabels: o, usedBy: j = [], undoRestore: i = null, machineTranslate: u = null, settings: v, blueprints: b = [], can: x }) {
  const S = _(`cms/collections/${t.handle}/entries`), g = n ? _(`cms/entries/${n.id}`) : S, y = n ? m.title : "New entry";
  s.useBreadcrumbs([{ label: t.title, href: S }, { label: y }]);
  const [$, p] = Q(), [k, T] = D.useState(!1), C = N.useForm({ ...m, seo: m.seo ?? {}, locale: n?.locale ?? null, version: n?.version ?? null, publish: !1, published_at: null }), F = n ? { locale: n.locale } : {}, V = l.find((B) => B.main)?.code, z = C.errors, w = n !== null && n.status !== "draft" && !n.hasUnpublishedChanges && !C.isDirty, A = n === null ? x.create : x.update && !n.trashed, E = (B = !1, K = null) => {
    C.transform((f) => ({ ...f, publish: B, published_at: K })), n ? C.put(g, { preserveScroll: !0, onSuccess: () => T(!1) }) : C.post(g);
  }, te = () => {
    C.transform((B) => ({ ...B, version: null, publish: !1, published_at: null })), C.put(g, { preserveScroll: !0 });
  }, O = s.useEditLock({
    type: "cms.entry",
    id: n?.id,
    locale: n?.locale,
    enabled: n !== null && A,
    noun: "entry",
    leaveTo: S,
    getUnsaved: () => C.isDirty ? { title: C.data.title, slug: C.data.slug, data: C.data.data, seo: C.data.seo } : null
  }), U = A && !O.readOnly, de = async (B) => {
    const K = await O.loadKept(B);
    C.setData((f) => ({ ...f, title: K.title ?? f.title, slug: K.slug ?? f.slug, data: K.data ?? f.data, seo: K.seo ?? f.seo }));
  };
  s.useUnsavedChanges(C.isDirty && !O.takenOver, U ? () => C.processing || E() : void 0);
  const ne = (B = null) => {
    x.update ? E(!0, B) : n && N.router.post(`${g}/publish`, { ...F, published_at: B }, { preserveScroll: !0, onSuccess: () => T(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (B) => {
    B.preventDefault(), E();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: y }),
    p,
    O.dialogs,
    /* @__PURE__ */ e.jsxs(
      s.PageHeader,
      {
        title: y,
        back: { href: S, label: `Back to ${t.title}` },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          n && !n.trashed && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(
            "a",
            {
              href: n.previewUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              title: C.isDirty ? "Shows the saved draft: save first to see your changes." : "Shows the saved draft.",
              children: [
                /* @__PURE__ */ e.jsx(Tt, {}),
                " Preview"
              ]
            }
          ) }),
          n?.url && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: n.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(oe, {}),
            " View"
          ] }) }),
          n?.trashed && x.delete && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", onClick: () => N.router.post(`${g}/restore`, {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(xe, {}),
            " Restore"
          ] }),
          n?.trashed && x.delete && /* @__PURE__ */ e.jsxs(
            s.Button,
            {
              type: "button",
              variant: "outline",
              className: "cms:text-destructive",
              onClick: () => $(
                `Delete "${m.title}" for good, in every language, with its revisions? This can't be undone.${We(j)}`,
                () => N.router.delete(`${g}/force`, { data: j.length > 0 ? { force: 1 } : {} })
              ),
              children: [
                /* @__PURE__ */ e.jsx(R, {}),
                " Delete for good"
              ]
            }
          ),
          n && !n.trashed && x.create && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "ghost", title: "Copy every language as a new draft", onClick: () => N.router.post(`${g}/duplicate`), children: [
            /* @__PURE__ */ e.jsx(_t, {}),
            " Duplicate"
          ] }),
          n && !n.trashed && x.delete && !O.readOnly && /* @__PURE__ */ e.jsx(
            s.Button,
            {
              type: "button",
              variant: "outline",
              size: "icon",
              className: "cms:text-destructive",
              "aria-label": "Move to the trash",
              onClick: () => $(`Move "${m.title}" to the trash? It comes off the site; you can restore it.${We(j)}`, () => N.router.delete(g)),
              children: /* @__PURE__ */ e.jsx(R, {})
            }
          ),
          n && U && u !== null && /* @__PURE__ */ e.jsxs(
            s.Button,
            {
              type: "button",
              variant: "outline",
              disabled: C.processing || C.isDirty,
              title: C.isDirty ? "Save your changes first" : "Fill in what isn't translated yet, into the draft",
              onClick: () => N.router.post(_(`cms/entries/${u}/translate`), { version: n.version }, { preserveScroll: !0 }),
              children: [
                /* @__PURE__ */ e.jsx(Lt, {}),
                " Translate from ",
                l.find((B) => B.main)?.name ?? (V ? P(V) : "the main language")
              ]
            }
          ),
          U && /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", variant: n && x.publish ? "outline" : "default", disabled: C.processing, children: [
            C.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
            n ? "Save draft" : "Create draft"
          ] }),
          n && !n.trashed && x.publish && !O.readOnly && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex", children: [
            /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: w ? "outline" : "default", className: "cms:rounded-r-none cms:disabled:opacity-100", disabled: C.processing || w, onClick: () => ne(), children: [
              w && /* @__PURE__ */ e.jsx(he, { className: "cms:text-emerald-600 cms:dark:text-emerald-400" }),
              n.status === "draft" ? "Publish" : w ? "Published" : "Publish changes"
            ] }),
            /* @__PURE__ */ e.jsxs(s.DropdownMenu, { children: [
              /* @__PURE__ */ e.jsx(s.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(s.Button, { type: "button", size: "icon", variant: w ? "outline" : "default", className: w ? "cms:-ml-px cms:rounded-l-none" : "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": "More publishing options", children: /* @__PURE__ */ e.jsx(us, {}) }) }),
              /* @__PURE__ */ e.jsxs(s.DropdownMenuContent, { align: "end", children: [
                /* @__PURE__ */ e.jsxs(s.DropdownMenuItem, { onSelect: () => T(!0), children: [
                  /* @__PURE__ */ e.jsx(os, {}),
                  " Publish on a date…"
                ] }),
                n.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  /* @__PURE__ */ e.jsx(s.DropdownMenuSeparator, {}),
                  /* @__PURE__ */ e.jsx(s.DropdownMenuItem, { onSelect: () => N.router.post(`${g}/unpublish`, F, { preserveScroll: !0 }), children: "Unpublish" })
                ] })
              ] })
            ] })
          ] })
        ] }),
        children: [
          n && /* @__PURE__ */ e.jsx(s.Badge, { variant: n.status === "published" ? "success" : "secondary", children: n.trashed ? "In the trash" : X(n.status) }),
          C.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
        ]
      }
    ),
    n && l.length > 1 && /* @__PURE__ */ e.jsx(
      ia,
      {
        entryUrl: g,
        editUrl: `${S}/${n.id}/edit`,
        current: n.locale,
        locales: l,
        canAdd: x.create && !n.trashed,
        canRemove: x.delete && !n.isMain && !n.trashed,
        onRemove: () => $(
          `Remove the ${P(n.locale)} translation of "${m.title}"? Its revisions go with it.`,
          () => N.router.delete(`${g}/translations/${n.locale}`)
        )
      }
    ),
    /* @__PURE__ */ e.jsx(s.ViewingNotice, { by: O.viewingBy }),
    /* @__PURE__ */ e.jsx(s.KeptEditsNotice, { kept: O.kept, disabled: !U, onLoad: (B) => {
      de(B);
    }, onDiscard: (B) => {
      O.discardKept(B);
    } }),
    z.version && /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: [
      /* @__PURE__ */ e.jsx("span", { children: z.version }),
      /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", size: "sm", onClick: () => N.router.reload(), children: "Load theirs" }),
        /* @__PURE__ */ e.jsx(
          s.Button,
          {
            type: "button",
            variant: "destructive",
            size: "sm",
            disabled: C.processing,
            onClick: () => $("Save your version over theirs? Their changes are replaced (their earlier published versions stay in the revisions).", te),
            children: "Save mine anyway"
          }
        )
      ] })
    ] }),
    (z.entry || z.published_at) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: z.entry ?? z.published_at }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_18rem]", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsx(s.CardContent, { children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: !U, className: "cms:grid cms:gap-4 cms:md:grid-cols-[2fr_1fr]", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "title", children: "Title" }),
            /* @__PURE__ */ e.jsx(
              s.Input,
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
            /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "slug", children: "Slug" }),
            /* @__PURE__ */ e.jsx(
              s.Input,
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
        /* @__PURE__ */ e.jsx(Ks.Provider, { value: Array.isArray(o) || !o ? {} : o, children: /* @__PURE__ */ e.jsx(
          Ae,
          {
            disabled: !U,
            fields: a,
            values: C.data.data,
            errors: z,
            storageKey: `cms:entry:${t.handle}`,
            shared: c,
            sharedValues: r,
            sharedNote: `Shared by all languages: edit it in ${V ? P(V) : "the main language"}.`,
            onChange: (B, K) => C.setData("data", { ...C.data.data, [B]: K })
          }
        ) }),
        /* @__PURE__ */ e.jsx(s.CollapsibleCard, { title: "Search and sharing", titleClassName: "cms:text-base", storageKey: "cms:entry:seo", hasErrors: ae(z, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !U, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(
          se,
          {
            bare: !0,
            id: "seo",
            fields: Ee,
            value: C.data.seo,
            errors: W(z, "seo"),
            onChange: (B) => C.setData("seo", B)
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
          !n.trashed && x.publish && !O.readOnly && /* @__PURE__ */ e.jsx(
            oa,
            {
              status: n.status,
              publishedAt: n.publishedAt,
              processing: C.processing,
              onPublish: (B) => ne(B),
              onUnpublish: () => N.router.post(`${g}/unpublish`, F, { preserveScroll: !0 })
            },
            n.publishedAt ?? "none"
          ),
          n.status !== "draft" && n.hasUnpublishedChanges && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The draft has changes the site doesn't show yet." }),
          l.find((B) => B.code === n.locale)?.outdated && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-amber-700 cms:dark:text-amber-400", children: [
            "The ",
            V ? P(V) : "main",
            " version changed since this translation was last saved."
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs(s.CollapsibleCard, { title: "Used by", titleClassName: "cms:text-base", storageKey: "cms:entry:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          j.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "No other content links here." }),
          j.map((B) => /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
            B.url ? /* @__PURE__ */ e.jsx("a", { href: B.url, className: "cms:block cms:truncate cms:underline-offset-4 cms:hover:underline", children: B.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:truncate", children: B.label }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:font-mono cms:text-xs cms:text-muted-foreground", children: B.field })
          ] }, `${B.label}:${B.field}`))
        ] }),
        v && /* @__PURE__ */ e.jsx(ma, { entryUrl: g, collection: t, settings: v, blueprints: b, disabled: !U }),
        h !== null && t.comments && /* @__PURE__ */ e.jsx(na, { entryId: n.id, comments: h }),
        /* @__PURE__ */ e.jsxs(s.CollapsibleCard, { title: "Revisions", titleClassName: "cms:text-base", storageKey: "cms:entry:revisions", contentClassName: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
          i !== null && x.update && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", size: "sm", onClick: () => N.router.post(_(`cms/entry-translations/${i}/undo-restore`), {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(Te, {}),
            " Undo the restore"
          ] }),
          /* @__PURE__ */ e.jsx(N.Deferred, { data: "revisions", fallback: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(s.Skeleton, { className: "cms:h-8" }),
            /* @__PURE__ */ e.jsx(s.Skeleton, { className: "cms:h-8" })
          ] }), children: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            (d ?? []).length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "Each publish keeps one." }),
            (d ?? []).map((B) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
                /* @__PURE__ */ e.jsx("div", { className: "cms:truncate", children: B.title }),
                /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: G(B.createdAt) })
              ] }),
              x.update && !n.trashed && /* @__PURE__ */ e.jsx(
                s.Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  onClick: () => N.router.post(_(`cms/revisions/${B.id}/restore`), {}, { preserveScroll: !0 }),
                  children: "Restore"
                }
              )
            ] }, B.id))
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(
      da,
      {
        open: k,
        onClose: () => T(!1),
        processing: C.processing,
        current: n?.publishedAt ?? null,
        onSchedule: (B) => ne(B)
      }
    )
  ] });
}
function ia({ entryUrl: t, editUrl: a, current: l, locales: c, canAdd: r, canRemove: n, onRemove: m }) {
  const d = c.filter((o) => o.status !== null), h = c.filter((o) => o.status === null);
  return /* @__PURE__ */ e.jsxs("nav", { "aria-label": "Languages", className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("div", { className: "cms:inline-flex cms:items-center cms:gap-0.5 cms:rounded-md cms:bg-muted cms:p-0.5", children: d.map((o) => {
      const j = o.code === l, i = `${o.name ?? P(o.code)}${o.main ? " (main)" : ""}: ${o.status ? X(o.status) : ""}${o.outdated ? ", outdated (the main language changed since)" : ""}`;
      return /* @__PURE__ */ e.jsxs(
        "button",
        {
          type: "button",
          title: i,
          "aria-label": i,
          "aria-current": j ? "page" : void 0,
          onClick: () => !j && N.router.get(a, { locale: o.code }),
          className: `cms:relative cms:inline-flex cms:h-7 cms:min-w-10 cms:items-center cms:justify-center cms:gap-1.5 cms:rounded cms:px-2.5 cms:text-xs cms:font-semibold cms:tracking-wide cms:uppercase cms:transition-colors ${j ? "cms:bg-card cms:text-foreground cms:shadow-xs" : "cms:text-muted-foreground cms:hover:text-foreground"}`,
          children: [
            o.code,
            (o.outdated || o.status === "published") && /* @__PURE__ */ e.jsx("span", { "aria-hidden": !0, className: `cms:size-1.5 cms:rounded-full ${o.outdated ? "cms:bg-amber-500" : "cms:bg-emerald-500"}` })
          ]
        },
        o.code
      );
    }) }),
    r && h.map((o) => /* @__PURE__ */ e.jsxs(
      s.Button,
      {
        type: "button",
        variant: "outline",
        size: "sm",
        className: "cms:h-8 cms:border-dashed cms:text-xs cms:uppercase",
        title: `Add ${o.name ?? P(o.code)}`,
        onClick: () => N.router.post(`${t}/translations`, { locale: o.code }),
        children: [
          /* @__PURE__ */ e.jsx(q, {}),
          " ",
          o.code
        ]
      },
      o.code
    )),
    n && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:ml-auto cms:text-destructive", onClick: m, children: "Remove this language" })
  ] });
}
function oa({ status: t, publishedAt: a, processing: l, onPublish: c, onUnpublish: r }) {
  const [n, m] = D.useState(a ? Us(new Date(a)) : ""), d = n === "" ? null : new Date(n), h = d !== null && d.getTime() > Date.now(), o = (u) => u === null ? null : Math.floor(u.getTime() / 6e4), j = o(d) !== o(a ? new Date(a) : null), i = t === "draft" ? h ? "Schedule" : "Publish" : h ? t === "scheduled" ? "Reschedule" : "Schedule" : "Change date";
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:border-t cms:border-border/60 cms:pt-3", children: [
    /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "entry-published-at", children: "Publish date" }),
    /* @__PURE__ */ e.jsx(s.DatePicker, { id: "entry-published-at", withTime: !0, className: "cms:max-w-none", value: n || null, onChange: (u) => m(u ?? "") }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t === "draft" ? "Empty: now. A date in the future schedules it." : "The date shown as published. A date in the future takes it off the site until then." }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: [
      (t === "draft" || j) && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", size: "sm", disabled: l, onClick: () => c(d?.toISOString() ?? null), children: [
        /* @__PURE__ */ e.jsx(os, {}),
        " ",
        i
      ] }),
      t !== "draft" && /* @__PURE__ */ e.jsx(s.Button, { type: "button", size: "sm", variant: "outline", disabled: l, onClick: r, children: "Unpublish" })
    ] })
  ] });
}
function da({ open: t, onClose: a, onSchedule: l, current: c, processing: r }) {
  const [n, m] = D.useState("");
  return D.useEffect(() => {
    t && m(Us(c ? new Date(c) : new Date(Date.now() + 864e5)));
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
function ma({ entryUrl: t, collection: a, settings: l, blueprints: c, disabled: r }) {
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
      /* @__PURE__ */ e.jsx(M, { message: d.parent_id })
    ] }),
    c.length > 1 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "blueprint", children: "Blueprint" }),
      /* @__PURE__ */ e.jsxs(s.Select, { value: m.data.blueprint, onValueChange: (h) => m.setData("blueprint", h), children: [
        /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: "blueprint", "aria-invalid": d.blueprint !== void 0, children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(s.SelectContent, { children: c.map((h) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: h.handle, children: h.title }, h.handle)) })
      ] }),
      m.data.blueprint !== n && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The fields change in every language; values of fields both blueprints have are kept. Save your draft first: the editor reloads." }),
      /* @__PURE__ */ e.jsx(M, { message: d.blueprint })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "template", children: "Template" }),
      /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: "template",
          className: "cms:font-mono",
          placeholder: "The collection's",
          value: m.data.template,
          onChange: (h) => m.setData("template", h.target.value),
          "aria-invalid": d.template !== void 0
        }
      ),
      /* @__PURE__ */ e.jsx(M, { message: d.template })
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
function ze(t, a) {
  const l = t[a]?.depth ?? 0;
  let c = a + 1;
  for (; c < t.length && t[c].depth > l; ) c++;
  return c;
}
function ie(t, a) {
  const l = a < 0 ? 0 : a + 1, c = a < 0 ? t.length : ze(t, a), r = a < 0 ? 0 : (t[a]?.depth ?? 0) + 1, n = [];
  for (let m = l; m < c; m++)
    t[m].depth === r && n.push(m);
  return n;
}
function tt(t, a, l) {
  const c = ie(t, a);
  if (l.length !== c.length || [...l].sort((d, h) => d - h).some((d, h) => d !== c[h]) || c.length === 0) return t.slice();
  const r = c[0], n = ze(t, c[c.length - 1]), m = l.flatMap((d) => t.slice(d, ze(t, d)));
  return [...t.slice(0, r), ...m, ...t.slice(n)];
}
function ua(t, a, l) {
  const c = t.find((n) => n.id === a);
  if (!c) return [];
  const r = l(c);
  return t.filter((n) => l(n) === r).map((n) => n.id);
}
function ha({ collection: t, rows: a }) {
  const [l, c] = D.useState(a);
  D.useEffect(() => c(a), [a]);
  const r = (n, m) => {
    const d = n[m];
    if (!d) return;
    const h = d.parentId ?? null, o = ua(n, d.id, (j) => j.parentId ?? null);
    c(n), N.router.post(
      _("cms/entries/reorder"),
      { collection: t, ids: o, parent_id: h },
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
function xa(t, a, l) {
  const c = { ...t, ...a }, r = Object.fromEntries(Object.entries(c.terms).filter(([, m]) => m !== "")), n = {};
  return c.search && (n.search = c.search), c.status && (n.status = c.status), c.author && (n.author = c.author), Object.keys(r).length > 0 && (n.terms = r), c.locale && c.locale !== l && (n.locale = c.locale), c.sort && (n.sort = c.sort), n.per_page = c.perPage, n;
}
function pa(t) {
  const a = new URLSearchParams();
  for (const [l, c] of Object.entries(t))
    if (typeof c == "object")
      for (const [r, n] of Object.entries(c)) a.set(`${l}[${r}]`, n);
    else
      a.set(l, String(c));
  return a.toString();
}
function ga(t, a) {
  return t === a ? `-${a}` : t === `-${a}` ? "" : a;
}
function fa(t, a) {
  return t === a ? "asc" : t === `-${a}` ? "desc" : null;
}
function qe(t) {
  return [t.search, t.status, t.author, ...Object.values(t.terms)].filter((a) => a !== "").length;
}
const Ce = "__all", ja = [
  { value: "draft", label: "Drafts" },
  { value: "published", label: "Published" },
  { value: "scheduled", label: "Scheduled" },
  { value: "trashed", label: "Trash" }
];
function ba(t) {
  const { collection: a, entries: l, query: c } = t;
  return s.useBreadcrumbs([{ label: a ? a.title : "Entries" }]), !a || !l || !c ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: "Entries" }),
    /* @__PURE__ */ e.jsx(s.PageHeader, { title: "Entries", description: "There are no collections yet. Create one under Structure → Collections, then come back to write its entries." })
  ] }) : /* @__PURE__ */ e.jsx(va, { ...t, collection: a, entries: l, query: c });
}
function va({
  collection: t,
  collections: a,
  entries: l,
  query: c,
  columns: r = [],
  filters: n = { authors: [], taxonomies: [], locales: [] },
  links: m = [],
  manualOrder: d = !1,
  perPageOptions: h = [10, 25, 50, 100],
  preferencesKey: o,
  can: j
}) {
  const i = _(`cms/collections/${t.handle}/entries`), u = n.locales[0] ?? c.locale, [v, b] = D.useState(c.search), [x, S] = D.useState([]), [g, y] = D.useState(!1), [$, p] = Q(), { setColumns: k, setPerPage: T } = s.useTablePreferences(o ?? `table.cms.entries.${t.handle}`, { columns: c.columns, perPage: c.perPage });
  D.useEffect(() => S([]), [l]);
  const C = c.status === "trashed", F = qe(c) > 0, V = r.filter((f) => c.columns.includes(f.key)), z = (f = {}) => xa(c, f, u), w = (f) => N.router.get(i, z(f), { preserveState: !0, preserveScroll: !0, replace: !0 });
  D.useEffect(() => {
    if (v === c.search) return;
    const f = window.setTimeout(() => w({ search: v }), 300);
    return () => window.clearTimeout(f);
  }, [v]);
  const A = C ? j?.delete ? [{ action: "restore", label: "Restore" }, { action: "delete", label: "Delete for good", danger: !0 }] : [] : [
    ...j?.publish ? [{ action: "publish", label: "Publish" }, { action: "unpublish", label: "Unpublish" }] : [],
    ...j?.delete ? [{ action: "trash", label: "Move to the trash", danger: !0 }] : []
  ], E = (f, I, H = !1) => {
    const me = () => N.router.post(`${i}/bulk`, { action: f, ids: x }, { preserveScroll: !0 });
    H ? $(`${I}: ${x.length} ${x.length === 1 ? "entry" : "entries"}?${f === "delete" ? " This can't be undone." : ""}`, me) : me();
  }, te = async (f) => {
    const I = new Set(c.columns);
    I.has(f) ? I.delete(f) : I.add(f), await k(r.map((H) => H.key).filter((H) => I.has(H))), N.router.reload({ only: ["entries", "query"] });
  }, O = () => {
    b(""), w({ search: "", status: "", author: "", terms: {} });
  }, U = d && !!j?.update, de = U && l !== null && l.lastPage <= 1 && l.data.length > 1, ne = 1 + V.length + (A.length > 0 ? 1 : 0) + (U ? 1 : 0), B = pa(z()), K = [...new Set(m.map((f) => f.group))];
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
              /* @__PURE__ */ e.jsx(Dt, {}),
              " Go to"
            ] }) }),
            /* @__PURE__ */ e.jsx(s.DropdownMenuContent, { align: "end", className: "cms:min-w-56", children: K.map((f, I) => /* @__PURE__ */ e.jsxs(D.Fragment, { children: [
              I > 0 && /* @__PURE__ */ e.jsx(s.DropdownMenuSeparator, {}),
              /* @__PURE__ */ e.jsx(s.DropdownMenuLabel, { children: f }),
              m.filter((H) => H.group === f).map((H) => /* @__PURE__ */ e.jsx(s.DropdownMenuItem, { asChild: !0, children: H.external ? /* @__PURE__ */ e.jsxs("a", { href: H.href, target: "_blank", rel: "noopener noreferrer", children: [
                H.label,
                " ",
                /* @__PURE__ */ e.jsx(oe, { className: "cms:ml-auto" })
              ] }) : /* @__PURE__ */ e.jsx(N.Link, { href: H.href, children: H.label }) }, H.href))
            ] }, f)) })
          ] }),
          t.listing && !C && /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs(N.Link, { href: _(`cms/collections/${t.handle}/listing`), children: [
            /* @__PURE__ */ e.jsx(Mt, {}),
            " Listing page"
          ] }) }),
          l.total > 0 && j?.export && /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: `${i}/export${B ? `?${B}` : ""}`, children: [
            /* @__PURE__ */ e.jsx(bs, {}),
            " Export CSV"
          ] }) }),
          j?.create && !C && /* @__PURE__ */ e.jsx(s.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(N.Link, { href: `${i}/create`, children: [
            /* @__PURE__ */ e.jsx(q, {}),
            " New entry"
          ] }) })
        ] }),
        children: a.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: t.handle, onValueChange: (f) => N.router.get(_(`cms/collections/${f}/entries`)), children: [
          /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": "Collection", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(s.SelectContent, { children: a.map((f) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: f.handle, children: f.title }, f.handle)) })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-xs", children: [
        /* @__PURE__ */ e.jsx(ge, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            className: "cms:pl-9",
            placeholder: "Search titles, slugs or #id",
            "aria-label": "Search entries",
            value: v,
            onChange: (f) => b(f.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(ke, { label: "Status", value: c.status, options: ja, onChange: (f) => w({ status: f }) }),
      n.authors.length > 0 && /* @__PURE__ */ e.jsx(ke, { label: "Author", value: c.author, options: n.authors, onChange: (f) => w({ author: f }) }),
      n.taxonomies.filter((f) => f.terms.length > 0).map((f) => /* @__PURE__ */ e.jsx(
        ke,
        {
          label: f.title,
          value: c.terms[f.handle] ?? "",
          options: f.terms.map((I) => ({ value: I.value, label: `${"— ".repeat(I.depth)}${I.label}` })),
          onChange: (I) => w({ terms: { ...c.terms, [f.handle]: I } })
        },
        f.handle
      )),
      n.locales.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: c.locale, onValueChange: (f) => w({ locale: f }), children: [
        /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-40", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(s.SelectContent, { children: n.locales.map((f) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: f, children: [
          P(f),
          f === u ? " (main)" : ""
        ] }, f)) })
      ] }),
      F && /* @__PURE__ */ e.jsxs(s.Button, { variant: "ghost", size: "sm", onClick: O, children: [
        /* @__PURE__ */ e.jsx(fe, {}),
        " Clear"
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:ml-auto cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
        x.length > 0 && A.length > 0 && /* @__PURE__ */ e.jsxs("div", { role: "toolbar", "aria-label": "Selected entries", className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsxs("span", { className: "cms:text-sm cms:text-muted-foreground", children: [
            x.length,
            " selected"
          ] }),
          A.map((f) => /* @__PURE__ */ e.jsx(s.Button, { size: "sm", variant: f.danger ? "destructive" : "outline", onClick: () => E(f.action, f.label, f.danger), children: f.label }, f.action))
        ] }),
        de && /* @__PURE__ */ e.jsxs(s.Button, { variant: g ? "secondary" : "outline", "aria-pressed": g, onClick: () => y(!g), children: [
          /* @__PURE__ */ e.jsx(ns, {}),
          " ",
          g ? "Done" : "Reorder"
        ] }),
        r.length > 0 && /* @__PURE__ */ e.jsxs(s.DropdownMenu, { children: [
          /* @__PURE__ */ e.jsx(s.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(s.Button, { variant: "outline", children: [
            /* @__PURE__ */ e.jsx($t, {}),
            " Columns"
          ] }) }),
          /* @__PURE__ */ e.jsxs(s.DropdownMenuContent, { align: "end", className: "cms:max-h-96 cms:overflow-y-auto", children: [
            /* @__PURE__ */ e.jsx(s.DropdownMenuLabel, { children: "Columns" }),
            r.filter((f) => !f.field).map((f) => /* @__PURE__ */ e.jsx(
              s.DropdownMenuCheckboxItem,
              {
                checked: c.columns.includes(f.key),
                onSelect: (I) => I.preventDefault(),
                onCheckedChange: () => {
                  te(f.key);
                },
                children: f.label
              },
              f.key
            )),
            r.some((f) => f.field) && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(s.DropdownMenuSeparator, {}),
              /* @__PURE__ */ e.jsx(s.DropdownMenuLabel, { children: "Fields" }),
              r.filter((f) => f.field).map((f) => /* @__PURE__ */ e.jsx(
                s.DropdownMenuCheckboxItem,
                {
                  checked: c.columns.includes(f.key),
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
    g && de ? /* @__PURE__ */ e.jsx(ha, { collection: t.handle, rows: l.data }) : /* @__PURE__ */ e.jsxs(s.Card, { className: "cms:gap-0 cms:overflow-hidden cms:py-0", children: [
      /* @__PURE__ */ e.jsxs(s.Table, { children: [
        /* @__PURE__ */ e.jsx(s.TableHeader, { className: "cms:bg-muted/60", children: /* @__PURE__ */ e.jsxs(s.TableRow, { className: "cms:hover:bg-transparent", children: [
          A.length > 0 && /* @__PURE__ */ e.jsx(s.TableHead, { className: "cms:w-10", children: /* @__PURE__ */ e.jsx(
            s.Checkbox,
            {
              "aria-label": "Select all on this page",
              checked: l.data.length > 0 && x.length === l.data.length,
              onCheckedChange: (f) => S(f ? l.data.map((I) => I.id) : [])
            }
          ) }),
          /* @__PURE__ */ e.jsx(Ge, { label: "Title", sortKey: "title", sort: c.sort, onSort: (f) => w({ sort: f }) }),
          V.map((f) => f.sortable ? /* @__PURE__ */ e.jsx(Ge, { label: f.label, sortKey: f.key, sort: c.sort, onSort: (I) => w({ sort: I }) }, f.key) : /* @__PURE__ */ e.jsx(s.TableHead, { children: f.label }, f.key)),
          U && /* @__PURE__ */ e.jsx(s.TableHead, { className: "cms:w-px", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: "Order" }) })
        ] }) }),
        /* @__PURE__ */ e.jsxs(s.TableBody, { children: [
          l.data.length === 0 && /* @__PURE__ */ e.jsx(s.TableRow, { className: "cms:hover:bg-transparent", children: /* @__PURE__ */ e.jsx(s.TableCell, { colSpan: ne, className: "cms:h-32 cms:text-center cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx(Na, { trashed: C, filtered: qe(C ? { ...c, status: "" } : c) > 0, canCreate: !!j?.create, createUrl: `${i}/create`, onClear: O }) }) }),
          l.data.map((f, I) => /* @__PURE__ */ e.jsxs(s.TableRow, { className: "sunrice-row-in", style: { "--i": I }, "data-state": x.includes(f.id) ? "selected" : void 0, children: [
            A.length > 0 && /* @__PURE__ */ e.jsx(s.TableCell, { children: /* @__PURE__ */ e.jsx(
              s.Checkbox,
              {
                "aria-label": `Select ${f.title}`,
                checked: x.includes(f.id),
                onCheckedChange: (H) => S(H ? [...x, f.id] : x.filter((me) => me !== f.id))
              }
            ) }),
            /* @__PURE__ */ e.jsxs(s.TableCell, { children: [
              /* @__PURE__ */ e.jsx(
                N.Link,
                {
                  href: _(`cms/collections/${t.handle}/entries/${f.id}/edit${c.locale !== u ? `?locale=${encodeURIComponent(c.locale)}` : ""}`),
                  className: "cms:font-medium cms:underline-offset-4 cms:hover:underline",
                  children: f.title
                }
              ),
              (!c.columns.includes("slug") || f.parent) && /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
                !c.columns.includes("slug") && `/${f.slug}`,
                f.parent ? `${c.columns.includes("slug") ? "" : " · "}under ${f.parent}` : ""
              ] })
            ] }),
            V.map((H) => /* @__PURE__ */ e.jsx(s.TableCell, { className: H.key === "status" ? "" : "cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx("div", { className: "cms:max-w-72 cms:truncate", children: /* @__PURE__ */ e.jsx(ya, { row: f, column: H, mainLocale: u }) }) }, H.key)),
            U && /* @__PURE__ */ e.jsx(s.TableCell, { className: "cms:w-px", children: /* @__PURE__ */ e.jsxs("span", { className: "cms:flex", children: [
              /* @__PURE__ */ e.jsx(s.Button, { variant: "ghost", size: "icon", "aria-label": `Move ${f.title} up`, onClick: () => N.router.post(_(`cms/entries/${f.id}/move`), { direction: "up" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(rs, {}) }),
              /* @__PURE__ */ e.jsx(s.Button, { variant: "ghost", size: "icon", "aria-label": `Move ${f.title} down`, onClick: () => N.router.post(_(`cms/entries/${f.id}/move`), { direction: "down" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(as, {}) })
            ] }) })
          ] }, f.id))
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4 cms:border-t cms:px-6 cms:py-3 cms:text-sm cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-4", children: [
          /* @__PURE__ */ e.jsx("span", { children: l.total === 0 ? "No entries" : `${l.from}–${l.to} of ${l.total}` }),
          /* @__PURE__ */ e.jsxs(s.Select, { value: String(c.perPage), onValueChange: (f) => {
            T(Number(f)), w({ perPage: Number(f) });
          }, children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:h-8 cms:w-auto", "aria-label": "Entries per page", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(s.SelectContent, { children: h.map((f) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: String(f), children: [
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
            s.Button,
            {
              variant: "outline",
              size: "icon",
              className: "cms:size-8",
              "aria-label": "Previous page",
              disabled: !l.prev_page_url,
              onClick: () => l.prev_page_url && N.router.get(l.prev_page_url, {}, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(Me, {})
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
              children: /* @__PURE__ */ e.jsx(pe, {})
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
function Ge({ label: t, sortKey: a, sort: l, onSort: c }) {
  const r = fa(l, a);
  return /* @__PURE__ */ e.jsx(s.TableHead, { "aria-sort": r === "asc" ? "ascending" : r === "desc" ? "descending" : void 0, children: /* @__PURE__ */ e.jsxs(
    "button",
    {
      type: "button",
      onClick: () => c(ga(l, a)),
      className: "cms:-ml-2 cms:inline-flex cms:h-8 cms:items-center cms:gap-1 cms:rounded-md cms:px-2 cms:hover:bg-accent cms:hover:text-accent-foreground",
      children: [
        t,
        r === "asc" ? /* @__PURE__ */ e.jsx(rs, { className: "cms:size-3" }) : r === "desc" ? /* @__PURE__ */ e.jsx(as, { className: "cms:size-3" }) : /* @__PURE__ */ e.jsx(ns, { className: "cms:size-3 cms:opacity-40" })
      ]
    }
  ) });
}
function ya({ row: t, column: a, mainLocale: l }) {
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
function Na({ trashed: t, filtered: a, canCreate: l, createUrl: c, onClear: r }) {
  return a ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: "Nothing matches these filters." }),
    /* @__PURE__ */ e.jsxs(s.Button, { variant: "outline", size: "sm", onClick: r, children: [
      /* @__PURE__ */ e.jsx(fe, {}),
      " Clear filters"
    ] })
  ] }) : t ? /* @__PURE__ */ e.jsx(e.Fragment, { children: "The trash is empty." }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: "No entries yet." }),
    l && /* @__PURE__ */ e.jsx(s.Button, { size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs(N.Link, { href: c, children: [
      /* @__PURE__ */ e.jsx(q, {}),
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
function Sa(t) {
  return /* @__PURE__ */ e.jsx(Ca, { ...t }, `${t.locale}:${t.version}:${JSON.stringify([t.values, t.seo])}`);
}
function Ca({ collection: t, fields: a, locale: l, locales: c, shared: r, values: n, seo: m, version: d, can: h }) {
  const o = _(`cms/collections/${t.handle}/listing`), j = _(`cms/collections/${t.handle}/entries`);
  s.useBreadcrumbs([{ label: t.title, href: j }, { label: "Listing page" }]);
  const i = N.useForm({ locale: l, data: n, seo: m ?? {}, version: d }), u = i.errors, v = c[0], b = h.update, x = () => i.processing || i.put(o, { preserveScroll: !0 }), S = () => {
    i.transform((g) => ({ ...g, version: null })), i.put(o, { preserveScroll: !0 });
  };
  return s.useUnsavedChanges(i.isDirty, b ? x : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: (g) => {
    g.preventDefault(), x();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: `${t.title}: listing page` }),
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: `${t.title}: listing page`,
        back: { href: j, label: `Back to ${t.title}` },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          c.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: l, onValueChange: (g) => N.router.get(o, { locale: g }), children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(s.SelectContent, { children: c.map((g, y) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: g, children: [
              P(g),
              y === 0 ? " (main)" : ""
            ] }, g)) })
          ] }),
          t.url && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: t.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(oe, {}),
            " View"
          ] }) }),
          b && /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: i.processing, children: [
            i.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
            " Save"
          ] })
        ] }),
        children: i.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      }
    ),
    /* @__PURE__ */ e.jsxs("fieldset", { disabled: !b, className: "cms:flex cms:flex-col cms:gap-6", children: [
      /* @__PURE__ */ e.jsx(Fe, { message: u.version, processing: i.processing, onSaveMine: S }),
      a.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The listing page has no fields of its own: choose a listing blueprint for the collection under Structure → Collections." }) : /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsx(s.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: a.filter((g) => Ie(g, { ...n, ...i.data.data })).map((g) => r.includes(g.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(ee, { id: `data-${g.handle}`, field: g, content: !0, value: n[g.handle], errors: {}, onChange: () => {
        } }),
        /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
          "Shared by all languages: edit it in ",
          v ? P(v) : "the main language",
          "."
        ] })
      ] }, g.handle) : /* @__PURE__ */ e.jsx(
        ee,
        {
          id: `data-${g.handle}`,
          field: g,
          content: !0,
          value: i.data.data[g.handle],
          errors: W(u, `data.${g.handle}`),
          onChange: (y) => i.setData("data", { ...i.data.data, [g.handle]: y })
        },
        g.handle
      )) }) })
    ] }),
    /* @__PURE__ */ e.jsx(s.CollapsibleCard, { title: "Search and sharing", titleClassName: "cms:text-base", storageKey: "cms:listing:seo", hasErrors: ae(u, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !b, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(se, { bare: !0, id: "seo", fields: Ee, value: i.data.seo, errors: W(u, "seo"), onChange: (g) => i.setData("seo", g) }) }) })
  ] });
}
function ka({ fieldsets: t }) {
  const a = N.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(M, { message: a.fieldset }),
    /* @__PURE__ */ e.jsx(
      st,
      {
        noun: "Fieldset",
        base: _("cms/fieldsets"),
        rows: t,
        intro: "Fields shared between blueprints, and the kinds of block of flexible fields."
      }
    )
  ] });
}
function wa(t) {
  return /* @__PURE__ */ e.jsx($a, { ...t }, `${t.locale}:${t.version}:${JSON.stringify(t.values)}`);
}
function $a({ set: t, fields: a, locale: l, locales: c, shared: r, values: n, version: m, can: d }) {
  const h = _(`cms/globals/${t.handle}`);
  s.useBreadcrumbs([{ label: "Globals", href: _("cms/globals") }, { label: t.title }]);
  const o = N.useForm({ locale: l, data: n, version: m }), j = o.errors, i = c[0], u = s.useEditLock({
    type: "cms.global",
    id: t.id,
    locale: l,
    enabled: d.update,
    noun: "global set",
    leaveTo: _("cms/globals"),
    getUnsaved: () => o.isDirty ? { data: o.data.data } : null
  }), v = d.update && !u.readOnly, b = () => o.processing || o.put(h, { preserveScroll: !0 }), x = () => {
    o.transform((g) => ({ ...g, version: null })), o.put(h, { preserveScroll: !0 });
  }, S = async (g) => {
    const y = await u.loadKept(g);
    y.data && typeof y.data == "object" && o.setData("data", y.data);
  };
  return s.useUnsavedChanges(o.isDirty && !u.takenOver, v ? b : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: (g) => {
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
            /* @__PURE__ */ e.jsx(s.SelectContent, { children: c.map((g, y) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: g, children: [
              P(g),
              y === 0 ? " (main)" : ""
            ] }, g)) })
          ] }),
          v && /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: o.processing, children: [
            o.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
            " Save"
          ] })
        ] }),
        children: o.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      }
    ),
    a.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "This global set has no fields: choose a blueprint for it under Structure → Global sets." }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(s.ViewingNotice, { by: u.viewingBy }),
      /* @__PURE__ */ e.jsx(Fe, { message: j.version, processing: o.processing, onSaveMine: x }),
      /* @__PURE__ */ e.jsx(s.KeptEditsNotice, { kept: u.kept, disabled: !v, onLoad: (g) => {
        S(g);
      }, onDiscard: (g) => {
        u.discardKept(g);
      } }),
      /* @__PURE__ */ e.jsx(
        Ae,
        {
          disabled: !v,
          fields: a,
          values: o.data.data,
          errors: j,
          storageKey: `cms:global:${t.handle}`,
          shared: r,
          sharedValues: n,
          sharedNote: `Shared by all languages: edit it in ${i ? P(i) : "the main language"}.`,
          onChange: (g, y) => o.setData("data", { ...o.data.data, [g]: y })
        }
      )
    ] })
  ] });
}
function Da({ sets: t }) {
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
let at = 0;
function lt(t, a = 0) {
  return t.flatMap(({ children: l, ...c }) => [{ ...c, key: `m${++at}`, depth: a }, ...lt(l ?? [], a + 1)]);
}
function _a(t) {
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
function nt(t, a, l) {
  const c = He(t, a);
  return t.map((r, n) => n >= a && n < c ? { ...r, depth: r.depth + l } : r);
}
function Ta(t, a, l) {
  const c = t[a], r = t[a - 1];
  return !c || !r || c.depth > r.depth || Math.max(...t.slice(a, He(t, a)).map((m) => m.depth)) + 1 > l - 1 ? t : nt(t, a, 1);
}
function Ba(t, a) {
  return (t[a]?.depth ?? 0) === 0 ? t : nt(t, a, -1);
}
function za(t, a) {
  return [...t.slice(0, a), ...t.slice(He(t, a))];
}
function ue(t) {
  return { key: `m${++at}`, depth: 0, entry_id: null, term_id: null, collection_id: null, target: null, url: null, labels: {}, new_tab: !1, ...t };
}
function La({ menu: t, items: a, locales: l, limits: c, terms: r, listings: n, can: m }) {
  const d = _(`cms/menus/${t.handle}`);
  s.useBreadcrumbs([{ label: "Menus", href: _("cms/menus") }, { label: t.title }]);
  const [h, o] = D.useState(() => lt(a)), [j, i] = D.useState(null), u = N.useForm({ items: a }), v = u.errors, [b, x] = D.useState(!1), S = l[0] ?? "en", g = (T) => {
    o(T), x(!0);
  }, y = (T, C) => g(h.map((F, V) => V === T ? { ...F, ...C } : F)), $ = () => {
    u.processing || (u.transform(() => ({ items: _a(h).map(ct) })), u.put(d, { preserveScroll: !0, onSuccess: () => x(!1) }));
  }, p = (T) => {
    T.preventDefault(), $();
  };
  s.useUnsavedChanges(b, m.update ? $ : void 0);
  const k = (T) => /* @__PURE__ */ e.jsx(
    s.SortableList,
    {
      items: ie(h, T),
      getId: (C) => h[C].key,
      disabled: !m.update,
      onReorder: (C) => g(tt(h, T, C)),
      className: T < 0 ? "cms:gap-1" : "cms:mt-1 cms:gap-1 cms:pl-6",
      children: (C, { handle: F, isOverlay: V }) => {
        const z = h[C];
        return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${V ? "" : "cms:border-border/70"}`, children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2 cms:p-2", children: [
            m.update && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:h-10 cms:shrink-0 cms:items-center", children: /* @__PURE__ */ e.jsx(s.SortableHandle, { ...F, label: `Move ${z.labels[S] || z.target?.title || z.url || "link"}` }) }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
                /* @__PURE__ */ e.jsx(
                  s.Input,
                  {
                    "aria-label": `Label (${P(S)})`,
                    className: "cms:w-full cms:sm:max-w-xs",
                    disabled: !m.update,
                    placeholder: z.target?.title ?? "Label",
                    value: z.labels[S] ?? "",
                    onChange: (w) => y(C, { labels: { ...z.labels, [S]: w.target.value } })
                  }
                ),
                /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-32 cms:flex-1 cms:truncate cms:text-sm cms:text-muted-foreground", children: z.url !== null ? z.url : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  z.target ? `${z.target.kind}: ${z.target.title}` : "Gone",
                  " ",
                  (!z.target || !z.target.live) && /* @__PURE__ */ e.jsx(s.Badge, { variant: "outline", children: "Not on the site" })
                ] }) }),
                m.update && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center", children: [
                  /* @__PURE__ */ e.jsxs("label", { className: "cms:mr-2 cms:flex cms:items-center cms:gap-1.5 cms:text-sm", children: [
                    /* @__PURE__ */ e.jsx(s.Checkbox, { checked: z.new_tab, onCheckedChange: (w) => y(C, { new_tab: w }) }),
                    " New tab"
                  ] }),
                  /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Out a level", disabled: z.depth === 0, onClick: () => g(Ba(h, C)), children: /* @__PURE__ */ e.jsx(At, {}) }),
                  /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "In a level", onClick: () => g(Ta(h, C, c.depth)), children: /* @__PURE__ */ e.jsx(Et, {}) }),
                  /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": "Remove, with what's under it", onClick: () => g(za(h, C)), children: /* @__PURE__ */ e.jsx(R, {}) })
                ] })
              ] }),
              l.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: l.slice(1).map((w) => /* @__PURE__ */ e.jsx(
                s.Input,
                {
                  "aria-label": `Label (${P(w)})`,
                  className: "cms:w-full cms:sm:max-w-xs",
                  disabled: !m.update,
                  placeholder: `${P(w)}: as ${P(S)}`,
                  value: z.labels[w] ?? "",
                  onChange: (A) => y(C, { labels: { ...z.labels, [w]: A.target.value } })
                },
                w
              )) })
            ] })
          ] }),
          !V && ie(h, C).length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:px-2 cms:pb-2", children: k(C) })
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
          /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", disabled: h.length >= c.items, onClick: () => i("entry"), children: [
            /* @__PURE__ */ e.jsx(q, {}),
            " Entry"
          ] }),
          r.length > 0 && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", disabled: h.length >= c.items, onClick: () => i("term"), children: [
            /* @__PURE__ */ e.jsx(Pt, {}),
            " Term"
          ] }),
          n.length > 0 && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", disabled: h.length >= c.items, onClick: () => i("listing"), children: [
            /* @__PURE__ */ e.jsx(Ft, {}),
            " Listing"
          ] }),
          /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", disabled: h.length >= c.items, onClick: () => i("url"), children: [
            /* @__PURE__ */ e.jsx(It, {}),
            " Link"
          ] }),
          /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: u.processing, children: [
            u.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
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
    /* @__PURE__ */ e.jsx(s.Card, { className: "cms:p-2", children: h.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:p-4 cms:text-center cms:text-muted-foreground", children: "No links yet. Add an entry or a link." }) : k(-1) }),
    /* @__PURE__ */ e.jsx(Aa, { kind: j, terms: r, listings: n, onClose: () => i(null), onAdd: (T) => {
      g([...h, T]), i(null);
    }, main: S })
  ] });
}
function ct({ target: t, children: a, ...l }) {
  return { ...l, children: a.map(ct) };
}
const Ma = { entry: "Link to an entry", term: "Link to a term's page", listing: "Link to a listing page", url: "Link to an address" }, Ia = {
  entry: "It follows the entry: its title (unless you give a label) and its address in each language. It shows only while the entry is on the site.",
  term: "The page listing the term's entries, in each language. Its title is the label unless you give one.",
  listing: "The collection's listing page, in each language. The collection's title is the label unless you give one.",
  url: "A web address, a path on this site (/contact), mailto: or tel:."
};
function Aa({ kind: t, terms: a, listings: l, onClose: c, onAdd: r, main: n }) {
  const [m, d] = D.useState(null), [h, o] = D.useState(""), [j, i] = D.useState(""), [u, v] = D.useState("");
  D.useEffect(() => {
    d(null), o(""), i(""), v("");
  }, [t]);
  const b = j.trim() === "" || mt(j.trim()), x = u.trim() ? { [n]: u.trim() } : {}, S = async () => {
    if (t === "entry" && m !== null) {
      const y = await fetch(`${_("cms/entry-picker")}?${Le({ ids: [m], collections: [] })}`, { headers: { Accept: "application/json" }, credentials: "same-origin" }), $ = y.ok ? (await y.json()).items[0] : void 0;
      r(ue({ entry_id: m, target: $ ? { title: $.title, kind: $.collection, live: $.status === "published" } : null, labels: x }));
    } else if (t === "term" && h !== "") {
      const y = a.find(($) => String($.id) === h);
      r(ue({ term_id: Number(h), target: y ? { title: y.title, kind: y.taxonomy, live: !0 } : null, labels: x }));
    } else if (t === "listing" && h !== "") {
      const y = l.find(($) => String($.id) === h);
      r(ue({ collection_id: Number(h), target: y ? { title: y.title, kind: "Listing page", live: !0 } : null, labels: x }));
    } else t === "url" && j.trim() !== "" && b && u.trim() !== "" && r(ue({ url: j.trim(), labels: x }));
  }, g = t === "entry" ? m !== null : t === "url" ? j.trim() !== "" && b && u.trim() !== "" : h !== "";
  return /* @__PURE__ */ e.jsx(s.Dialog, { open: t !== null, onOpenChange: (y) => !y && c(), children: /* @__PURE__ */ e.jsxs(s.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(s.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(s.DialogTitle, { children: t ? Ma[t] : "" }),
      /* @__PURE__ */ e.jsx(s.DialogDescription, { children: t ? Ia[t] : "" })
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
          onChange: (y) => d(typeof y == "number" ? y : null)
        }
      ),
      (t === "term" || t === "listing") && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "menu-target", children: t === "term" ? "Term" : "Collection" }),
        /* @__PURE__ */ e.jsxs(s.Select, { value: h, onValueChange: o, children: [
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
            value: j,
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
        /* @__PURE__ */ e.jsx(s.Input, { id: "menu-label", value: u, onChange: (y) => v(y.target.value) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(s.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", onClick: c, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", onClick: () => {
        S();
      }, disabled: !g, children: "Add" })
    ] })
  ] }) });
}
function Ea({ menus: t }) {
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
const Fa = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "spam", label: "Spam" },
  { value: "trash", label: "Trash" }
], Ha = { pending: "Pending", approved: "Approved", spam: "Spam" };
function Pa({ tab: t, counts: a, filters: l, collections: c, comments: r, can: n, errors: m = {} }) {
  s.useBreadcrumbs([{ label: "Comments", href: _("cms/comments") }]);
  const [d, h] = D.useState(l.search), [o, j] = D.useState([]), [i, u] = D.useState(null), [v, b] = Q(), x = (p) => {
    const k = { status: t, search: l.search, collection: l.collection, ...p };
    N.router.get(_("cms/comments"), {
      ...k.status !== "all" ? { status: k.status } : {},
      ...k.search ? { search: k.search } : {},
      ...k.collection ? { collection: k.collection } : {},
      ...l.entry ? { entry: l.entry } : {}
    }, { preserveState: !0, replace: !0, onSuccess: () => j([]) });
  };
  D.useEffect(() => {
    if (d === l.search) return;
    const p = window.setTimeout(() => x({ search: d }), 300);
    return () => window.clearTimeout(p);
  }, [d]);
  const S = (p, k = {}) => N.router.post(_(p), k, { preserveScroll: !0, onSuccess: () => j([]) }), g = (p, k) => S(`cms/comments/${p.id}/status`, { status: k }), y = (p) => {
    const k = () => S("cms/comments/bulk", { action: p, ids: o });
    p === "delete" ? v(`Delete ${o.length} comments for good? This can't be undone.`, k) : k();
  }, $ = r.data.length > 0 && o.length === r.data.length;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: "Comments" }),
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: "Comments",
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:sm:w-64", children: [
            /* @__PURE__ */ e.jsx(ge, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
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
          c.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: l.collection ?? "all", onValueChange: (p) => x({ collection: p === "all" ? null : p }), children: [
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
    /* @__PURE__ */ e.jsx(s.Tabs, { value: t, onValueChange: (p) => x({ status: p }), children: /* @__PURE__ */ e.jsx(s.TabsList, { className: "cms:h-auto cms:flex-wrap cms:justify-start", children: Fa.map((p) => /* @__PURE__ */ e.jsxs(s.TabsTrigger, { value: p.value, children: [
      p.label,
      " ",
      /* @__PURE__ */ e.jsx("span", { className: "cms:ml-1 cms:text-muted-foreground", children: a[p.value] })
    ] }, p.value)) }) }),
    o.length > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2 cms:text-sm", role: "toolbar", "aria-label": "With the selected comments", children: [
      /* @__PURE__ */ e.jsxs("span", { className: "cms:text-muted-foreground", children: [
        o.length,
        " selected"
      ] }),
      n.moderate && t !== "trash" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "outline", onClick: () => y("approve"), children: [
          /* @__PURE__ */ e.jsx(he, {}),
          " Approve"
        ] }),
        /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "outline", onClick: () => y("unapprove"), children: [
          /* @__PURE__ */ e.jsx(Te, {}),
          " Unapprove"
        ] }),
        /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "outline", onClick: () => y("spam"), children: [
          /* @__PURE__ */ e.jsx(_e, {}),
          " Spam"
        ] })
      ] }),
      n.delete && t !== "trash" && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "outline", onClick: () => y("trash"), children: [
        /* @__PURE__ */ e.jsx(R, {}),
        " Trash"
      ] }),
      n.delete && t === "trash" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "outline", onClick: () => y("restore"), children: [
          /* @__PURE__ */ e.jsx(xe, {}),
          " Restore"
        ] }),
        /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "destructive", onClick: () => y("delete"), children: [
          /* @__PURE__ */ e.jsx(R, {}),
          " Delete for good"
        ] })
      ] })
    ] }),
    r.data.length === 0 ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:rounded-xl cms:border cms:border-dashed cms:px-6 cms:py-16 cms:text-center", children: [
      /* @__PURE__ */ e.jsx("span", { className: "cms:grid cms:size-10 cms:place-items-center cms:rounded-full cms:bg-muted cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx(Ht, { className: "cms:size-4" }) }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: l.search ? "No comments match." : "No comments here." })
    ] }) : /* @__PURE__ */ e.jsxs(s.Card, { className: "cms:divide-y cms:p-0", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3 cms:px-4 cms:py-2 cms:text-sm cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsx(s.Checkbox, { checked: $, "aria-label": "Select all", onCheckedChange: (p) => j(p ? r.data.map((k) => k.id) : []) }),
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
            onCheckedChange: (k) => j(k ? [...o, p.id] : o.filter((T) => T !== p.id))
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-x-3 cms:gap-y-1 cms:text-sm", children: [
            /* @__PURE__ */ e.jsx("span", { id: `comment-${p.id}-author`, className: "cms:font-medium", children: p.author }),
            p.email && /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", children: p.email }),
            p.member && /* @__PURE__ */ e.jsx(s.Badge, { variant: "outline", children: "Signed in" }),
            !p.trashed && /* @__PURE__ */ e.jsx(s.Badge, { variant: p.status === "approved" ? "success" : p.status === "spam" ? "destructive" : "warning", children: Ha[p.status] }),
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
              /* @__PURE__ */ e.jsx(oe, { className: "cms:inline cms:size-3" })
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
                /* @__PURE__ */ e.jsx(he, {}),
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
                /* @__PURE__ */ e.jsx(zs, {}),
                " Reply"
              ] }),
              /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => u({ row: p, mode: "edit" }), children: [
                /* @__PURE__ */ e.jsx(Is, {}),
                " Edit"
              ] })
            ] }),
            n.delete && !p.trashed && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => N.router.delete(_(`cms/comments/${p.id}`), { preserveScroll: !0 }), children: [
              /* @__PURE__ */ e.jsx(R, {}),
              " Trash"
            ] }),
            n.delete && p.trashed && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => S(`cms/comments/${p.id}/restore`), children: [
                /* @__PURE__ */ e.jsx(xe, {}),
                " Restore"
              ] }),
              /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => v(
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
        /* @__PURE__ */ e.jsx(Me, {}),
        " Newer"
      ] }),
      /* @__PURE__ */ e.jsxs(s.Button, { variant: "outline", size: "sm", disabled: !r.next_page_url, onClick: () => r.next_page_url && N.router.get(r.next_page_url), children: [
        "Older ",
        /* @__PURE__ */ e.jsx(pe, {})
      ] })
    ] }),
    i && /* @__PURE__ */ e.jsx(Va, { row: i.row, mode: i.mode, error: m.body, onClose: () => u(null) }, `${i.mode}-${i.row.id}`),
    b
  ] });
}
function Va({ row: t, mode: a, error: l, onClose: c }) {
  const [r, n] = D.useState(a === "edit" ? t.body : ""), [m, d] = D.useState(!1), h = () => {
    d(!0);
    const o = { preserveScroll: !0, onSuccess: c, onFinish: () => d(!1) };
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
    /* @__PURE__ */ e.jsx(M, { message: l }),
    /* @__PURE__ */ e.jsxs(s.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", onClick: c, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", disabled: r.trim() === "" || m, onClick: h, children: a === "reply" ? "Post reply" : "Save" })
    ] })
  ] }) });
}
const Ra = [
  { role: "title", label: "Meta title", automatic: "the title" },
  { role: "description", label: "Meta description", automatic: "nothing" },
  { role: "image", label: "Share image", automatic: "nothing" }
], we = "__auto";
function Oa({ site: t, siteName: a, collections: l, taxonomies: c }) {
  s.useBreadcrumbs([{ label: "Settings", href: _("settings") }, { label: "SEO" }]);
  const r = [...l ?? [], ...c ?? []], n = N.useForm({
    site: { ...t },
    mappings: r.map((i) => ({ kind: i.kind, id: i.id, title: i.chosen.title ?? "", description: i.chosen.description ?? "", image: i.chosen.image ?? "" }))
  }), m = n.errors, d = () => n.put(_("cms/seo"), { preserveScroll: !0, onSuccess: () => n.setDefaults() });
  s.useUnsavedChanges(n.isDirty, d);
  const h = (i, u) => n.setData("site", { ...n.data.site, [i]: u }), o = (i, u, v) => n.setData("mappings", n.data.mappings.map((b, x) => x === i ? { ...b, [u]: v } : b)), j = (i, u, v, b) => /* @__PURE__ */ e.jsxs(s.CollapsibleCard, { title: i, description: u, titleClassName: "cms:text-base", storageKey: `cms:seo:${i}`, contentClassName: "cms:flex cms:flex-col cms:divide-y cms:divide-border/60", children: [
    v.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "None yet." }),
    v.map((x, S) => {
      const g = b + S;
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3 cms:py-4 cms:first:pt-0 cms:last:pb-0", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:justify-between cms:gap-3", children: [
          /* @__PURE__ */ e.jsx("h3", { className: "cms:font-medium", children: x.title }),
          /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: x.blueprint ? `Blueprint: ${x.blueprint}` : "No blueprint" })
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-3 cms:sm:grid-cols-3", children: Ra.map(({ role: y, label: $, automatic: p }) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-1.5", children: [
          /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `seo-${g}-${y}`, className: "cms:text-xs", children: $ }),
          /* @__PURE__ */ e.jsxs(s.Select, { value: n.data.mappings[g]?.[y] || we, onValueChange: (k) => o(g, y, k === we ? "" : k), children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: `seo-${g}-${y}`, className: "cms:w-full", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
              /* @__PURE__ */ e.jsxs(s.SelectItem, { value: we, children: [
                "Automatic (",
                p,
                ")"
              ] }),
              x.options[y].map((k) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: k.value, children: k.label }, k.value))
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(M, { message: m[`mappings.${g}.${y}`] })
        ] }, y)) })
      ] }, `${x.kind}-${x.id}`);
    })
  ] });
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (i) => {
    i.preventDefault(), d();
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
        /* @__PURE__ */ e.jsx(s.Switch, { id: "seo-noindex", checked: n.data.site.noindex, onCheckedChange: (i) => h("noindex", i) }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-0.5", children: [
          /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "seo-noindex", children: "Hide the whole site from search engines" }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: "Every page asks not to be indexed and the sitemap is empty. For a site still being built, or staging." })
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-start cms:justify-between cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-3", children: [
          /* @__PURE__ */ e.jsx(s.Switch, { id: "seo-append", checked: n.data.site.appendName, onCheckedChange: (i) => h("appendName", i) }),
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
              onChange: (i) => h("separator", i.target.value)
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
            onChange: (i) => h("twitter", i.target.value)
          }
        ),
        /* @__PURE__ */ e.jsx(M, { message: m["site.twitter"] })
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
            onChange: (i) => h("image", typeof i == "number" ? i : null)
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: "Shown when a page is shared and has no image of its own." }),
        /* @__PURE__ */ e.jsx(M, { message: m["site.image"] })
      ] })
    ] }),
    r.length > 0 && /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx("h2", { className: "cms:text-base cms:font-medium", children: "Fields used for SEO" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "When an entry or term leaves its meta title, description or share image empty, the site uses one of its fields instead. A page's own SEO fields always win; after the field come the site's (the description in Settings → Site, the share image above)." })
    ] }),
    l !== null && j("Collections", "Entries of each collection.", l, 0),
    c !== null && j("Taxonomies", "Term pages of each taxonomy.", c, l?.length ?? 0),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: "Meta title: a text field. Meta description: a text or textarea field, cut to 300 characters. Share image: the first image of a media field." })
  ] });
}
const Ua = 3;
function Ka({ form: t, forms: a, submissions: l, can: c, createForm: r = null }) {
  s.useBreadcrumbs([{ label: "Submissions", href: _("cms/submissions") }, ...t ? [{ label: t.title }] : []]);
  const [n, m] = D.useState(null), [d, h] = Q();
  if (!t || !l)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(N.Head, { title: "Submissions" }),
      /* @__PURE__ */ e.jsx(s.PageHeader, { title: "Submissions", description: "What visitors send through the site's forms." }),
      /* @__PURE__ */ e.jsxs(s.Card, { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:px-6 cms:py-14 cms:text-center", children: [
        /* @__PURE__ */ e.jsx(zt, { className: "cms:size-8 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
          /* @__PURE__ */ e.jsx("p", { className: "cms:font-medium", children: "No forms yet" }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:max-w-sm cms:text-sm cms:text-muted-foreground", children: r ? "Create a form, put it on a page, and what visitors send shows up here." : "Once someone creates a form and puts it on a page, what visitors send shows up here." })
        ] }),
        r && /* @__PURE__ */ e.jsx(s.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(N.Link, { href: r, children: [
          /* @__PURE__ */ e.jsx(q, {}),
          " Create a form"
        ] }) })
      ] })
    ] });
  const o = (l.data[0]?.rows ?? []).slice(0, Ua), j = (i) => d(
    "Delete this submission for good? It can't be restored.",
    () => N.router.delete(_(`cms/submissions/${i.id}`), { preserveScroll: !0, onSuccess: () => m(null) })
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: `${t.title} submissions` }),
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: t.title,
        actions: l.total > 0 && c.export && /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: _(`cms/forms/${t.handle}/submissions/export`), children: [
          /* @__PURE__ */ e.jsx(bs, {}),
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
          /* @__PURE__ */ e.jsx(s.TableCell, { className: "cms:whitespace-nowrap", children: /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:font-medium cms:hover:underline", onClick: () => m(i), children: G(i.createdAt) }) }),
          o.map((u) => /* @__PURE__ */ e.jsx(s.TableCell, { className: "cms:max-w-64 cms:truncate", children: i.rows.find((v) => v.handle === u.handle)?.value }, u.handle))
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
            children: /* @__PURE__ */ e.jsx(Me, {})
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
            children: /* @__PURE__ */ e.jsx(pe, {})
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(s.Dialog, { open: n !== null, onOpenChange: (i) => !i && m(null), children: /* @__PURE__ */ e.jsxs(s.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto", children: [
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
      c.delete && n && /* @__PURE__ */ e.jsx(s.DialogFooter, { children: /* @__PURE__ */ e.jsxs(s.Button, { variant: "destructive", onClick: () => j(n), children: [
        /* @__PURE__ */ e.jsx(R, {}),
        " Delete"
      ] }) })
    ] }) }),
    h
  ] });
}
function Wa(t) {
  return /* @__PURE__ */ e.jsx(qa, { ...t }, `${t.locale}:${t.version}:${JSON.stringify([t.values, t.seo, t.term.template])}`);
}
function qa({ taxonomy: t, term: a, translated: l, fields: c, locale: r, locales: n, shared: m, sharedValues: d, values: h, seo: o, version: j, usedBy: i = [] }) {
  const u = _(`cms/taxonomies/${t.handle}/terms`), v = _(`cms/terms/${a.id}/content`);
  s.useBreadcrumbs([{ label: t.title, href: `${u}?locale=${r}` }, { label: a.title }]);
  const b = N.useForm({ locale: r, data: h, seo: o ?? {}, template: a.template ?? "", version: j }), x = b.errors, S = () => b.processing || b.put(v, { preserveScroll: !0 }), g = () => {
    b.transform((k) => ({ ...k, version: null })), b.put(v, { preserveScroll: !0 });
  }, y = s.useEditLock({
    type: "cms.term",
    id: a.id,
    locale: r,
    enabled: l,
    noun: "term",
    leaveTo: `${u}?locale=${r}`,
    getUnsaved: () => b.isDirty ? { data: b.data.data, seo: b.data.seo, template: b.data.template } : null
  }), $ = l && !y.readOnly, p = async (k) => {
    const T = await y.loadKept(k);
    b.setData((C) => ({
      ...C,
      data: T.data && typeof T.data == "object" ? T.data : C.data,
      seo: T.seo && typeof T.seo == "object" ? T.seo : C.seo,
      template: typeof T.template == "string" ? T.template : C.template
    }));
  };
  return s.useUnsavedChanges(b.isDirty && !y.takenOver, $ ? S : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: (k) => {
    k.preventDefault(), S();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: a.title }),
    y.dialogs,
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: a.title,
        back: { href: `${u}?locale=${r}`, label: `Back to ${t.title}` },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          a.url && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: a.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(oe, {}),
            " View"
          ] }) }),
          n.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: r, onValueChange: (k) => N.router.get(`${u}/${a.id}/edit`, { locale: k }), children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(s.SelectContent, { children: n.map((k, T) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: k, children: [
              P(k),
              T === 0 ? " (main)" : ""
            ] }, k)) })
          ] }),
          $ && /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: b.processing, children: [
            b.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
            " Save"
          ] })
        ] }),
        children: b.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      }
    ),
    l ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
      /* @__PURE__ */ e.jsx(s.ViewingNotice, { by: y.viewingBy }),
      /* @__PURE__ */ e.jsx(s.KeptEditsNotice, { kept: y.kept, disabled: !$, onLoad: (k) => {
        p(k);
      }, onDiscard: (k) => {
        y.discardKept(k);
      } }),
      /* @__PURE__ */ e.jsx(Fe, { message: x.version, processing: b.processing, onSaveMine: g }),
      /* @__PURE__ */ e.jsx(
        Ae,
        {
          disabled: !$,
          fields: c,
          values: b.data.data,
          errors: x,
          storageKey: `cms:term:${t.handle}`,
          shared: m,
          sharedValues: d,
          sharedNote: `Shared by all languages: edit it in ${P(n[0] ?? "en")}.`,
          onChange: (k, T) => b.setData("data", { ...b.data.data, [k]: T })
        }
      ),
      /* @__PURE__ */ e.jsx(s.CollapsibleCard, { title: "Search and sharing", titleClassName: "cms:text-base", storageKey: "cms:term:seo", hasErrors: ae(x, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !$, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(se, { bare: !0, id: "seo", fields: Ee, value: b.data.seo, errors: W(x, "seo"), onChange: (k) => b.setData("seo", k) }) }) }),
      /* @__PURE__ */ e.jsxs(s.CollapsibleCard, { title: "Used by", titleClassName: "cms:text-base", storageKey: "cms:term:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
        i.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "No content links here through its fields." }),
        i.map((k) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:gap-2", children: [
          k.url ? /* @__PURE__ */ e.jsx("a", { href: k.url, className: "cms:truncate cms:underline-offset-4 cms:hover:underline", children: k.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:truncate", children: k.label }),
          /* @__PURE__ */ e.jsx("span", { className: "cms:font-mono cms:text-xs cms:text-muted-foreground", children: k.field })
        ] }, `${k.label}:${k.field}`))
      ] }),
      /* @__PURE__ */ e.jsx(
        s.CollapsibleCard,
        {
          title: "Page settings",
          titleClassName: "cms:text-base",
          storageKey: "cms:term:page-settings",
          hasErrors: x.template !== void 0,
          contentClassName: "cms:flex cms:flex-col cms:gap-2",
          children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: !$, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "template", children: "Template" }),
            /* @__PURE__ */ e.jsx(
              s.Input,
              {
                id: "template",
                className: "cms:font-mono",
                placeholder: "The taxonomy's",
                value: b.data.template,
                onChange: (k) => b.setData("template", k.target.value),
                "aria-invalid": x.template !== void 0
              }
            ),
            /* @__PURE__ */ e.jsx(M, { message: x.template })
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
const $e = "__top";
function Je(t = []) {
  return t.length === 0 ? "" : ` It's used by ${t.slice(0, 5).join("; ")}${t.length > 5 ? ` and ${t.length - 5} more` : ""}.`;
}
function Ga({ taxonomy: t, taxonomies: a, terms: l, locales: c, locale: r, trashed: n = !1 }) {
  s.useBreadcrumbs([{ label: t ? t.title : "Terms" }]);
  const [m, d] = Q(), [h, o] = D.useState(null), [j, i] = D.useState(l);
  if (D.useEffect(() => i(l), [l]), !t)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(N.Head, { title: "Terms" }),
      /* @__PURE__ */ e.jsx(s.PageHeader, { title: "Terms", description: "There are no taxonomies yet. Create one under Structure → Taxonomies (categories, tags…), then add its terms here." })
    ] });
  const u = _(`cms/taxonomies/${t.handle}/terms`), v = (x, S) => {
    const g = S.map((y) => j[y].id);
    i(tt(j, x, S)), N.router.post(
      _("cms/terms/reorder"),
      { taxonomy: t.handle, ids: g, parent_id: x < 0 ? null : j[x].id },
      { preserveScroll: !0, preserveState: !0, onError: () => i(l) }
    );
  }, b = (x) => /* @__PURE__ */ e.jsx(
    s.SortableList,
    {
      items: ie(j, x),
      getId: (S) => j[S].id,
      disabled: n,
      onReorder: (S) => v(x, S),
      className: x < 0 ? "cms:gap-1" : "cms:mt-1 cms:gap-1 cms:pl-6",
      children: (S, { handle: g, isOverlay: y }) => {
        const $ = j[S];
        return /* @__PURE__ */ e.jsxs("div", { className: "cms:rounded-lg cms:border cms:border-border/70 cms:bg-card", children: [
          /* @__PURE__ */ e.jsx("div", { className: "cms:p-2", children: n ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3 cms:pl-1", children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:flex-1 cms:font-medium", children: $.title ?? $.fallback }),
            /* @__PURE__ */ e.jsxs(s.Button, { variant: "outline", size: "sm", onClick: () => N.router.post(_(`cms/terms/${$.id}/restore`), {}, { preserveScroll: !0 }), children: [
              /* @__PURE__ */ e.jsx(xe, {}),
              " Restore"
            ] }),
            /* @__PURE__ */ e.jsxs(
              s.Button,
              {
                variant: "ghost",
                size: "sm",
                className: "cms:text-destructive",
                onClick: () => m(
                  `Delete "${$.fallback}" for good, in every language? Entries lose it.${Je($.usedBy)}`,
                  () => N.router.delete(_(`cms/terms/${$.id}/force`), { preserveScroll: !0, data: ($.usedBy ?? []).length > 0 ? { force: 1 } : {} })
                ),
                children: [
                  /* @__PURE__ */ e.jsx(R, {}),
                  " Delete for good"
                ]
              }
            )
          ] }) : h === $.id && !y ? /* @__PURE__ */ e.jsx(
            Ye,
            {
              action: _(`cms/terms/${$.id}`),
              method: "put",
              locale: r,
              terms: l,
              hierarchical: t.hierarchical,
              term: $,
              submitLabel: "Save",
              onDone: () => o(null)
            }
          ) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(s.SortableHandle, { ...g, label: `Move ${$.fallback}` }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0 cms:flex-1", children: [
              $.title !== null ? /* @__PURE__ */ e.jsx("span", { className: "cms:font-medium", children: $.title }) : /* @__PURE__ */ e.jsxs("span", { className: "cms:text-muted-foreground cms:italic", children: [
                $.fallback,
                " · not translated"
              ] }),
              $.slug && /* @__PURE__ */ e.jsxs("span", { className: "cms:ml-2 cms:text-xs cms:text-muted-foreground", children: [
                "/",
                $.slug
              ] })
            ] }),
            /* @__PURE__ */ e.jsx(s.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Rename ${$.fallback}`, onClick: () => o($.id), children: /* @__PURE__ */ e.jsx(Is, {}) }),
            t.pages && $.title !== null && /* @__PURE__ */ e.jsx(s.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Edit ${$.fallback}'s page`, asChild: !0, children: /* @__PURE__ */ e.jsx(N.Link, { href: _(`cms/taxonomies/${t.handle}/terms/${$.id}/edit`) + `?locale=${r}`, children: /* @__PURE__ */ e.jsx(Bt, {}) }) }),
            /* @__PURE__ */ e.jsx(
              s.Button,
              {
                variant: "ghost",
                size: "icon",
                className: "cms:size-8 cms:text-destructive",
                "aria-label": `Move ${$.fallback} to the trash`,
                onClick: () => m(
                  `Move "${$.fallback}" to the trash, with the terms under it? It comes off the site; you can restore it.${Je($.usedBy)}`,
                  () => N.router.delete(_(`cms/terms/${$.id}`), { preserveScroll: !0 })
                ),
                children: /* @__PURE__ */ e.jsx(R, {})
              }
            )
          ] }) }),
          !y && !n && ie(j, S).length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:px-2 cms:pb-2", children: b(S) })
        ] });
      }
    }
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(N.Head, { title: t.title }),
    d,
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: t.title,
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(s.Button, { variant: n ? "secondary" : "ghost", size: "sm", onClick: () => N.router.get(u, { locale: r, ...n ? {} : { trashed: 1 } }), children: n ? "Back to terms" : "Trash" }),
          c.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: r, onValueChange: (x) => N.router.get(u, { locale: x, ...n ? { trashed: 1 } : {} }), children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(s.SelectContent, { children: c.map((x) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: x, children: P(x) }, x)) })
          ] })
        ] }),
        children: a.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: t.handle, onValueChange: (x) => N.router.get(_(`cms/taxonomies/${x}/terms`)), children: [
          /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": "Taxonomy", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(s.SelectContent, { children: a.map((x) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: x.handle, children: x.title }, x.handle)) })
        ] })
      }
    ),
    !n && /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsx(s.CardContent, { children: /* @__PURE__ */ e.jsx(
      Ye,
      {
        action: u,
        method: "post",
        locale: r,
        terms: l,
        hierarchical: t.hierarchical,
        submitLabel: "Add term"
      },
      `new-${l.length}`
    ) }) }),
    /* @__PURE__ */ e.jsx(s.Card, { className: "cms:p-2", children: j.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:p-4 cms:text-center cms:text-muted-foreground", children: n ? "The trash is empty." : "No terms yet." }) : b(-1) })
  ] });
}
function Ye({ action: t, method: a, locale: l, terms: c, hierarchical: r, term: n, submitLabel: m, onDone: d }) {
  const h = N.useForm({ title: n?.title ?? "", slug: n?.slug ?? "", parent_id: n?.parentId ?? null, locale: l, version: n?.version ?? null }), o = h.errors, j = /* @__PURE__ */ new Set();
  if (n) {
    j.add(n.id);
    const v = c.findIndex((b) => b.id === n.id);
    for (let b = v + 1; b < c.length && (c[b]?.depth ?? 0) > n.depth; b++) j.add(c[b].id);
  }
  const i = (v) => {
    v.preventDefault(), h.submit(a, t, { preserveScroll: !0, onSuccess: () => {
      a === "post" && h.reset("title", "slug"), d?.();
    } });
  }, u = n ? `term-${n.id}` : "new-term";
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: i, className: "cms:grid cms:items-start cms:gap-3 cms:md:grid-cols-[2fr_1.5fr_1.5fr_auto]", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${u}-title`, className: n ? "cms:sr-only" : "", children: "Title" }),
      /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: `${u}-title`,
          value: h.data.title,
          placeholder: n?.fallback,
          required: !0,
          onChange: (v) => h.setData("title", v.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(M, { message: o.title ?? o.version })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${u}-slug`, className: n ? "cms:sr-only" : "", children: "Slug" }),
      /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: `${u}-slug`,
          className: "cms:font-mono",
          value: h.data.slug,
          placeholder: "Made from the title",
          onChange: (v) => h.setData("slug", v.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(M, { message: o.slug })
    ] }),
    r ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${u}-parent`, className: n ? "cms:sr-only" : "", children: "Under" }),
      /* @__PURE__ */ e.jsxs(
        s.Select,
        {
          value: h.data.parent_id === null ? $e : String(h.data.parent_id),
          onValueChange: (v) => h.setData("parent_id", v === $e ? null : Number(v)),
          children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: `${u}-parent`, children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(s.SelectItem, { value: $e, children: "Top level" }),
              c.filter((v) => !j.has(v.id)).map((v) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: String(v.id), children: [
                "— ".repeat(v.depth),
                v.title ?? v.fallback
              ] }, v.id))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ e.jsx(M, { message: o.parent_id })
    ] }) : /* @__PURE__ */ e.jsx("div", {}),
    /* @__PURE__ */ e.jsxs("div", { className: `cms:flex cms:gap-2 ${n ? "" : "cms:md:mt-[17px]"}`, children: [
      /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: h.processing, children: [
        !n && /* @__PURE__ */ e.jsx(q, {}),
        " ",
        m
      ] }),
      d && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", onClick: d, children: "Cancel" })
    ] })
  ] });
}
rt({
  pages: {
    "Cms/Blueprints/Index": la,
    "Cms/Blueprints/Form": aa,
    "Cms/Fieldsets/Index": ka,
    "Cms/Entries/Index": ba,
    "Cms/Entries/Editor": ca,
    "Cms/Entries/Listing": Sa,
    "Cms/Terms/Index": Ga,
    "Cms/Terms/Edit": Wa,
    "Cms/Globals/Index": Da,
    "Cms/Globals/Edit": wa,
    "Cms/Menus/Index": Ea,
    "Cms/Menus/Edit": La,
    "Cms/Comments/Index": Pa,
    "Cms/Seo/Edit": Oa,
    "Cms/Submissions/Index": Ka
  }
});
s.registerCommandSource((t, a) => gt(t, a, _));
