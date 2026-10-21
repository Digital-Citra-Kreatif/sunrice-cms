function Ie() {
  const a = globalThis.Sunrice;
  if (!a)
    throw new Error("[sunrice] This script runs outside the Sunrice admin panel (window.Sunrice is missing).");
  return a;
}
function bt(a) {
  const l = Ie();
  if (l.version !== 3)
    throw new Error(`[sunrice] This plugin was built for admin runtime 3, but the panel runs ${l.version}. Rebuild it with a matching @sunrice/admin-sdk.`);
  for (const [n, c] of Object.entries(a.pages ?? {}))
    l.registerPage(n, c);
}
function t(a, l = {}) {
  return Ie().t(a, l);
}
function T(a = "") {
  return Ie().adminUrl(a);
}
const ls = globalThis.Sunrice;
if (!ls) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const s = ls.modules["@sunrice/admin-sdk/ui"];
function ie(a) {
  return a && typeof a == "object" && !Array.isArray(a) ? a : {};
}
function vt(a, l) {
  if (typeof a != "string" || a === "") return "";
  const n = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(a);
  return n ? l ? `${n[1]}T${n[2] ?? "00:00"}` : n[1] ?? "" : "";
}
function Ke(a) {
  return a === "" ? null : a;
}
function yt() {
  return { _hidden: !1 };
}
function Nt(a) {
  return { type: a, hidden: !1, values: {} };
}
function St(a) {
  const l = a.replace(/[\u0000- \u007f]+/g, ""), n = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(l);
  return n ? ["http", "https", "mailto", "tel"].includes(n[1].toLowerCase()) : !l.includes("\\");
}
function Ae({ ids: a, search: l, collections: n }) {
  const c = new URLSearchParams();
  for (const i of a ?? []) c.append("ids[]", String(i));
  l && c.set("search", l);
  for (const i of n) c.append("collections[]", i);
  return c.toString();
}
let Ct = 0;
function kt(a, l) {
  return a.length === l ? a.slice() : a.length < l ? [...a, ...Array.from({ length: l - a.length }, () => `k${++Ct}`)] : a.slice(0, l);
}
function wt({ taxonomy: a, q: l, ids: n }) {
  const c = new URLSearchParams({ taxonomy: a });
  l && c.set("q", l);
  for (const i of n ?? []) c.append("ids[]", String(i));
  return c.toString();
}
const ns = (a) => a;
function $t(a, l, n = ns) {
  return a.map((c) => ({
    id: String(c.id),
    label: c.title,
    description: c.status === "published" ? c.collection : `${c.collection} · ${n(c.status)}`,
    group: n("Entries"),
    icon: "file-text",
    url: l(`cms/collections/${c.collectionHandle}/entries/${c.id}/edit`)
  }));
}
async function Dt(a, l, n, c = ns) {
  const i = await fetch(`${n("cms/entries/picker")}?${Ae({ search: a.trim(), collections: [] })}`, {
    signal: l,
    headers: { Accept: "application/json" },
    credentials: "same-origin"
  });
  if (!i.ok) return [];
  const { items: r } = await i.json();
  return $t(r, n, c);
}
const cs = globalThis.Sunrice;
if (!cs) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const e = cs.modules["react/jsx-runtime"], rs = globalThis.Sunrice;
if (!rs) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const D = rs.modules.react, is = globalThis.Sunrice;
if (!is) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const S = is.modules["@inertiajs/react"];
const _t = (a) => a?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
function Tt(a, l, n = []) {
  if (l == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: _t(a),
    size: 24,
    node: l,
    ...n.length > 0 ? { aliases: n } : {}
  };
}
const Bt = (a) => {
  let l = "", n = !1;
  for (const c of a) {
    if (c === "-" || c === "_" || c <= " ") {
      n = l.length > 0;
      continue;
    }
    l.length === 0 ? l += c.toLowerCase() : l += n ? c.toUpperCase() : c, n = !1;
  }
  return l;
};
const Mt = (a) => {
  const l = Bt(a);
  return l.charAt(0).toUpperCase() + l.slice(1);
};
const Te = (...a) => a.filter((l, n, c) => !!l && l.trim() !== "" && c.indexOf(l) === n).join(" ").trim();
const ee = {
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
function ve(a) {
  return a != null;
}
function zt(a, l = {}) {
  const n = l.attributeNames ?? {}, c = (x) => n[x] ?? x, i = a.size ?? a.width ?? ee.width, r = a.size ?? a.height ?? ee.height, m = a.aliases?.filter((x) => typeof x == "string" && x.trim() !== "").map((x) => `lucide-${x}`) ?? [], u = [...a.name ? [`lucide-${a.name}`] : [], ...m], h = l.className?.split(" ").filter(Boolean) ?? [], d = l.includeDefaultClasses === !1 ? Te(...h) : Te("lucide", ...u, ...h), f = l.absoluteStrokeWidth ? Number(l.strokeWidth ?? ee["stroke-width"]) * Number(a.size ?? a.width ?? ee.width) / Number(l.size ?? l.width ?? ee.width) : l.strokeWidth ?? ee["stroke-width"];
  return [
    "svg",
    {
      ...Object.entries(ee).reduce((x, [C, b]) => (x[c(C)] = b, x), {}),
      ..."color" in l && l.color && {
        [c("stroke")]: l.color
      },
      ..."size" in l && ve(l.size) && {
        [c("width")]: l.size,
        [c("height")]: l.size
      },
      ..."width" in l && ve(l.width) && {
        [c("width")]: l.width
      },
      ..."height" in l && ve(l.height) && {
        [c("height")]: l.height
      },
      [c("stroke-width")]: f,
      ...d && {
        [c("class")]: d
      },
      [c("viewBox")]: `0 0 ${i} ${r}`,
      ...l.hasA11yProp === !1 ? {
        [c("aria-hidden")]: "true"
      } : {},
      ..."attributes" in l && l.attributes
    },
    a.node.map((x) => {
      const [C, b, v] = x, $ = l.nonScalingStroke ? { [c("vector-effect")]: "non-scaling-stroke", ...b } : b;
      return v ? [C, $, v] : [C, $];
    })
  ];
}
function Lt(a, l = {}) {
  return zt(a, {
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
const It = (a) => {
  for (const l in a)
    if (l.startsWith("aria-") || l === "role" || l === "title")
      return !0;
  return !1;
}, At = D.createContext({}), Ft = () => D.useContext(At), Et = D.forwardRef(
  ({
    color: a,
    size: l,
    width: n,
    height: c,
    strokeWidth: i,
    absoluteStrokeWidth: r,
    nonScalingStroke: m,
    className: u = "",
    children: h,
    iconNode: d = [],
    icon: f = {
      node: d,
      aliases: [],
      size: 24
    },
    ...o
  }, x) => {
    const {
      size: C = 24,
      strokeWidth: b = 2,
      absoluteStrokeWidth: v = !1,
      nonScalingStroke: $ = !1,
      color: N = "currentColor",
      className: y = ""
    } = Ft() ?? {}, _ = !!h || It(o), [g, w, B = []] = Lt(f, {
      color: a ?? N,
      width: n ?? l ?? C,
      height: c ?? l ?? C,
      strokeWidth: i ?? b,
      absoluteStrokeWidth: r ?? v,
      nonScalingStroke: m ?? $,
      className: Te(y, u),
      hasA11yProp: _,
      attributes: o
    });
    return D.createElement(
      g,
      {
        ref: x,
        ...w
      },
      [
        ...B.map(([p, z]) => D.createElement(p, z)),
        ...Array.isArray(h) ? h : [h]
      ]
    );
  }
);
function L(a, l = [], n = []) {
  const c = typeof a == "string" ? Tt(a, l, n) : a, i = D.forwardRef(
    ({ className: r, ...m }, u) => D.createElement(Et, {
      ref: u,
      icon: c,
      className: r,
      ...m
    })
  );
  return c.name && (i.displayName = Mt(c.name)), i;
}
const os = {
  name: "arrow-down",
  size: 24,
  node: [
    ["path", { d: "M12 5v14", key: "s699le" }],
    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
  ]
};
os.node;
const ds = L(os);
const ms = {
  name: "arrow-up-down",
  size: 24,
  node: [
    ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
    ["path", { d: "M17 20V4", key: "1ejh1v" }],
    ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
    ["path", { d: "M7 4v16", key: "1glfcx" }]
  ]
};
ms.node;
const us = L(ms);
const hs = {
  name: "arrow-up",
  size: 24,
  node: [
    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
    ["path", { d: "M12 19V5", key: "x0mq9r" }]
  ]
};
hs.node;
const xs = L(hs);
const ps = {
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
ps.node;
const gs = L(ps);
const fs = {
  name: "check",
  size: 24,
  node: [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]
};
fs.node;
const pe = L(fs);
const js = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
js.node;
const bs = L(js);
const vs = {
  name: "chevron-left",
  size: 24,
  node: [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]]
};
vs.node;
const Fe = L(vs);
const ys = {
  name: "chevron-right",
  size: 24,
  node: [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]
};
ys.node;
const fe = L(ys);
const Ns = {
  name: "columns-3",
  size: 24,
  node: [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M9 3v18", key: "fh3hqa" }],
    ["path", { d: "M15 3v18", key: "14nvp0" }]
  ],
  aliases: ["panels-left-right"]
};
Ns.node;
const Ht = L(Ns);
const Ss = {
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
Ss.node;
const Pt = L(Ss);
const Cs = {
  name: "copy",
  size: 24,
  node: [
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
  ]
};
Cs.node;
const Vt = L(Cs);
const ks = {
  name: "download",
  size: 24,
  node: [
    ["path", { d: "M12 15V3", key: "m9g1x1" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
  ]
};
ks.node;
const ws = L(ks);
const $s = {
  name: "ellipsis-vertical",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
    ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
    ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }]
  ],
  aliases: ["more-vertical"]
};
$s.node;
const Rt = L($s);
const Ds = {
  name: "ellipsis",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
    ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
    ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
  ],
  aliases: ["more-horizontal"]
};
Ds.node;
const _s = L(Ds);
const Ts = {
  name: "external-link",
  size: 24,
  node: [
    ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
    ["path", { d: "M10 14 21 3", key: "gplh6r" }],
    ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
  ]
};
Ts.node;
const ce = L(Ts);
const Bs = {
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
Bs.node;
const Ot = L(Bs);
const Ms = {
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
Ms.node;
const Ut = L(Ms);
const zs = {
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
zs.node;
const Kt = L(zs);
const Ls = {
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
Ls.node;
const qt = L(Ls);
const Is = {
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
Is.node;
const Wt = L(Is);
const As = {
  name: "link-2",
  size: 24,
  node: [
    ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
    ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
    ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
  ]
};
As.node;
const Gt = L(As);
const Fs = {
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
Fs.node;
const Jt = L(Fs);
const Es = {
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
Es.node;
const Yt = L(Es);
const Hs = {
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
Hs.node;
const Qt = L(Hs);
const Ps = {
  name: "loader-circle",
  size: 24,
  node: [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  aliases: ["loader-2"]
};
Ps.node;
const te = L(Ps);
const Vs = {
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
Vs.node;
const Rs = L(Vs);
const Os = {
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
Os.node;
const Zt = L(Os);
const Us = {
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
Us.node;
const Ks = L(Us);
const qs = {
  name: "plus",
  size: 24,
  node: [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ]
};
qs.node;
const q = L(qs);
const Ws = {
  name: "rotate-ccw",
  size: 24,
  node: [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ]
};
Ws.node;
const ge = L(Ws);
const Gs = {
  name: "search",
  size: 24,
  node: [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ]
};
Gs.node;
const me = L(Gs);
const Js = {
  name: "settings-2",
  size: 24,
  node: [
    ["path", { d: "M14 17H5", key: "gfn3mx" }],
    ["path", { d: "M19 7h-9", key: "6i9tg" }],
    ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
    ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
  ]
};
Js.node;
const Ee = L(Js);
const Ys = {
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
Ys.node;
const Be = L(Ys);
const Qs = {
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
Qs.node;
const Xt = L(Qs);
const Zs = {
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
Zs.node;
const O = L(Zs);
const Xs = {
  name: "undo-2",
  size: 24,
  node: [
    ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
    ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
  ]
};
Xs.node;
const Me = L(Xs);
const et = {
  name: "x",
  size: 24,
  node: [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]
};
et.node;
const je = L(et);
function X() {
  const [a, l] = D.useState(null), n = /* @__PURE__ */ e.jsx(s.Dialog, { open: a !== null, onOpenChange: (c) => !c && l(null), children: /* @__PURE__ */ e.jsxs(s.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(s.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(s.DialogTitle, { children: t("Are you sure?") }),
      /* @__PURE__ */ e.jsx(s.DialogDescription, { children: a?.message })
    ] }),
    /* @__PURE__ */ e.jsxs(s.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", onClick: () => l(null), children: t("Cancel") }),
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "destructive", onClick: () => {
        a?.onConfirm(), l(null);
      }, children: t("Delete") })
    ] })
  ] }) });
  return [(c, i) => l({ message: c, onConfirm: i }), n];
}
function Z(a) {
  return { draft: t("Draft"), scheduled: t("Scheduled"), published: t("Published") }[a];
}
function J(a, l) {
  if (!a) return "—";
  const n = new Date(a);
  return Number.isNaN(n.getTime()) ? "—" : n.toLocaleString(document.documentElement.lang || void 0, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
function st(a) {
  const l = (n) => String(n).padStart(2, "0");
  return `${a.getFullYear()}-${l(a.getMonth() + 1)}-${l(a.getDate())}T${l(a.getHours())}:${l(a.getMinutes())}`;
}
function H(a, l) {
  try {
    return new Intl.DisplayNames(l ? [l] : void 0, { type: "language" }).of(a.replace("_", "-")) ?? a;
  } catch {
    return a;
  }
}
async function qe(a) {
  const l = await fetch(`${T("cms/entries/picker")}?${Ae(a)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!l.ok) throw new Error(String(l.status));
  return (await l.json()).items;
}
function be({ id: a, value: l, multiple: n, max: c, collections: i, invalid: r, onChange: m }) {
  const u = l === null ? [] : Array.isArray(l) ? l : [l], [h, d] = D.useState({}), [f, o] = D.useState(""), [x, C] = D.useState(null), [b, v] = D.useState(!1), $ = n && c !== null && u.length >= c, N = u.filter((g) => !h[g]).join(",");
  D.useEffect(() => {
    N !== "" && qe({ ids: N.split(",").map(Number), collections: i }).then((g) => d((w) => ({ ...w, ...Object.fromEntries(g.map((B) => [B.id, B])) }))).catch(() => v(!0));
  }, [N]), D.useEffect(() => {
    if (f.trim() === "") {
      C(null);
      return;
    }
    const g = window.setTimeout(() => {
      qe({ search: f.trim(), collections: i }).then((w) => {
        C(w), v(!1);
      }).catch(() => v(!0));
    }, 250);
    return () => window.clearTimeout(g);
  }, [f]);
  const y = (g) => {
    d((w) => ({ ...w, [g.id]: g })), m(n ? [...u, g.id] : g.id), o("");
  }, _ = (g) => m(n ? g : g[0] ?? null);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    u.length > 0 && /* @__PURE__ */ e.jsx(s.SortableList, { items: u, getId: (g) => g, onReorder: (g) => _(g), disabled: !n, className: "cms:gap-1", children: (g, { handle: w }) => {
      const B = h[g];
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-md cms:border cms:bg-card cms:px-2 cms:py-1 cms:text-sm", children: [
        n && /* @__PURE__ */ e.jsx(s.SortableHandle, { ...w, label: t("Move :title", { title: B?.title ?? g }) }),
        /* @__PURE__ */ e.jsx("span", { className: `cms:min-w-0 cms:flex-1 cms:truncate ${n ? "" : "cms:pl-1"}`, children: B ? B.title : t("Entry #:id", { id: g }) }),
        B && /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: B.collection }),
        B && /* @__PURE__ */ e.jsx(s.Badge, { variant: B.status === "published" ? "success" : "secondary", children: Z(B.status) }),
        /* @__PURE__ */ e.jsx(
          s.Button,
          {
            type: "button",
            variant: "ghost",
            size: "icon",
            className: "cms:size-7",
            "aria-label": t("Remove :title", { title: B?.title ?? g }),
            onClick: () => _(u.filter((p) => p !== g)),
            children: /* @__PURE__ */ e.jsx(je, {})
          }
        )
      ] });
    } }),
    !$ && (n || u.length === 0) && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-md", children: [
      /* @__PURE__ */ e.jsx(me, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
      /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: a,
          className: "cms:pl-9",
          placeholder: t("Search entries by title"),
          "aria-invalid": r,
          value: f,
          autoComplete: "off",
          onChange: (g) => o(g.target.value)
        }
      ),
      x !== null && /* @__PURE__ */ e.jsxs("ul", { role: "listbox", "aria-label": t("Matching entries"), className: "cms:absolute cms:z-10 cms:mt-1 cms:max-h-64 cms:w-full cms:overflow-auto cms:rounded-md cms:border cms:bg-card cms:p-1 cms:shadow-md", children: [
        x.filter((g) => !u.includes(g.id)).length === 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: t("No entries match.") }),
        x.filter((g) => !u.includes(g.id)).map((g) => /* @__PURE__ */ e.jsx("li", { role: "option", "aria-selected": !1, children: /* @__PURE__ */ e.jsxs(
          "button",
          {
            type: "button",
            className: "cms:flex cms:w-full cms:items-center cms:gap-2 cms:rounded cms:px-2 cms:py-1.5 cms:text-left cms:text-sm cms:hover:bg-accent",
            onClick: () => y(g),
            children: [
              /* @__PURE__ */ e.jsx("span", { className: "cms:flex-1 cms:truncate", children: g.title }),
              /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: g.collection })
            ]
          }
        ) }, g.id))
      ] })
    ] }),
    b && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t("Entries could not be loaded. Try again.") })
  ] });
}
const tt = D.createContext({}), ye = "__none";
async function We(a) {
  const l = await fetch(`${T("cms/terms/picker")}?${wt(a)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!l.ok) throw new Error(String(l.status));
  return await l.json();
}
function ea({ id: a, taxonomy: l, multiple: n, max: c, required: i, invalid: r, value: m, onChange: u }) {
  const h = D.useContext(tt), d = m === null ? [] : Array.isArray(m) ? m : [m], [f, o] = D.useState(null), [x, C] = D.useState(!1), [b, v] = D.useState(""), [$, N] = D.useState({}), [y, _] = D.useState(!1);
  D.useEffect(() => {
    if (!l) return;
    const k = b.trim(), A = window.setTimeout(() => {
      We({ taxonomy: l, q: k }).then((V) => {
        o(V.items), V.more && C(!0), _(!1);
      }).catch(() => _(!0));
    }, k === "" ? 0 : 250);
    return () => window.clearTimeout(A);
  }, [l, b]);
  const g = (k) => h[String(k)] ?? $[k] ?? f?.find((A) => A.id === k)?.label, w = f === null ? "" : d.filter((k) => g(k) === void 0).join(",");
  if (D.useEffect(() => {
    !l || w === "" || We({ taxonomy: l, ids: w.split(",").map(Number) }).then((k) => N((A) => ({ ...A, ...Object.fromEntries(k.items.map((V) => [V.id, V.label])) }))).catch(() => _(!0));
  }, [l, w]), !l) return /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("Choose a taxonomy for this field in its blueprint.") });
  if (f === null) return y ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t("Terms could not be loaded. Try again.") }) : /* @__PURE__ */ e.jsx(s.Skeleton, { className: "cms:h-9 cms:w-full cms:max-w-sm" });
  const B = (k) => `${"— ".repeat(k.depth)}${k.label}`, p = n && c !== null && d.length >= c, z = (k) => u(n ? k : k[0] ?? null), P = x && d.length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-1.5", children: d.map((k) => /* @__PURE__ */ e.jsxs(s.Badge, { variant: "secondary", className: "cms:gap-1 cms:pr-1", children: [
    g(k) ?? t("Term #:id", { id: k }),
    !(i && !n) && /* @__PURE__ */ e.jsx(
      "button",
      {
        type: "button",
        className: "cms:rounded-sm cms:p-0.5 cms:hover:bg-muted",
        "aria-label": t("Remove :title", { title: g(k) ?? k }),
        onClick: () => z(d.filter((A) => A !== k)),
        children: /* @__PURE__ */ e.jsx(je, { className: "cms:size-3" })
      }
    )
  ] }, k)) }), F = x && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-sm", children: [
    /* @__PURE__ */ e.jsx(me, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
    /* @__PURE__ */ e.jsx(
      s.Input,
      {
        id: a,
        className: "cms:pl-9",
        placeholder: t("Search terms"),
        autoComplete: "off",
        "aria-invalid": r,
        value: b,
        onChange: (k) => v(k.target.value)
      }
    )
  ] });
  if (!n && !x) {
    const k = d[0], A = k === void 0 || f.some((V) => V.id === k);
    return /* @__PURE__ */ e.jsxs(s.Select, { value: k === void 0 ? ye : String(k), onValueChange: (V) => u(V === ye ? null : Number(V)), children: [
      /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: a, className: "cms:w-full cms:max-w-sm", "aria-invalid": r, children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
      /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
        !i && /* @__PURE__ */ e.jsx(s.SelectItem, { value: ye, children: t("None") }),
        !A && k !== void 0 && /* @__PURE__ */ e.jsx(s.SelectItem, { value: String(k), children: g(k) ?? t("Term #:id", { id: k }) }),
        f.map((V) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: String(V.id), children: B(V) }, V.id))
      ] })
    ] });
  }
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    P,
    F,
    f.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: b.trim() ? t("No terms match.") : t("Nothing to choose from yet.") }) : n ? /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:max-h-72 cms:flex-col cms:gap-2 cms:overflow-auto", children: f.map((k) => {
      const A = d.includes(k.id);
      return /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx(
          s.Checkbox,
          {
            checked: A,
            disabled: !A && p,
            onCheckedChange: (V) => z(V ? [...d, k.id] : d.filter((le) => le !== k.id))
          }
        ),
        B(k)
      ] }, k.id);
    }) }) : /* @__PURE__ */ e.jsx("div", { role: "listbox", "aria-label": t("Terms"), className: "cms:flex cms:max-h-72 cms:flex-col cms:overflow-auto", children: f.map((k) => /* @__PURE__ */ e.jsx(
      s.Button,
      {
        type: "button",
        variant: d[0] === k.id ? "secondary" : "ghost",
        size: "sm",
        className: "cms:justify-start",
        role: "option",
        "aria-selected": d[0] === k.id,
        onClick: () => u(k.id),
        children: B(k)
      },
      k.id
    )) })
  ] });
}
const sa = 5;
let ta = 0;
const at = () => `f${++ta}`;
function lt(a) {
  return a.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function nt(a) {
  return a.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^[0-9_]+/, "").replace(/_{2,}/g, "_").slice(0, 64);
}
function ct(a, l) {
  const n = new Set(l.map((r) => r.handle)), c = lt(a) || "field";
  let i = c;
  for (let r = 2; n.has(i); r++)
    i = `${c}_${r}`;
  return i;
}
function rt(a) {
  return (a ?? []).map(({ fields: l, ...n }) => ({
    ...n,
    key: at(),
    fields: rt(l),
    handleTouched: !0
  }));
}
function it(a, l) {
  return a.map(({ key: n, handleTouched: c, fields: i, ...r }) => ({
    ...r,
    validation: (r.validation ?? []).map((m) => m.trim()).filter((m) => m !== ""),
    ...l(r.type) ? { fields: it(i, l) } : {}
  }));
}
function aa(a, l, n) {
  return { key: at(), type: a, label: l, handle: ct(l, n), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function la(a, l, n) {
  if (a.handleTouched) return { ...a, label: l };
  const c = n.filter((i) => i.key !== a.key);
  return { ...a, label: l, handle: ct(l || a.type, c) };
}
function oe(a, l) {
  const n = `${l}.`, c = {};
  for (const [i, r] of Object.entries(a))
    i.startsWith(n) && (c[i.slice(n.length)] = r);
  return c;
}
function G(a, l) {
  const n = a[l];
  return { ...oe(a, l), ...n !== void 0 ? { "": n } : {} };
}
function ne(a, l) {
  return Object.keys(a).some((n) => n === l || n.startsWith(`${l}.`));
}
const Ne = [
  { value: "equals", label: "is", needsValue: !0 },
  { value: "not_equals", label: "is not", needsValue: !0 },
  { value: "filled", label: "is filled in", needsValue: !1 },
  { value: "empty", label: "is empty", needsValue: !1 }
];
function Ge(a) {
  return a === !0 ? "true" : a === !1 ? "false" : typeof a == "string" || typeof a == "number" ? String(a) : "";
}
function He(a, l) {
  const n = a.condition;
  if (!n) return !0;
  const c = l[n.field], i = c != null && c !== "" && c !== !1 && !(Array.isArray(c) && c.length === 0), r = (Array.isArray(c) ? c : [c]).map(Ge).includes(Ge(n.value));
  switch (n.operator) {
    case "equals":
      return r;
    case "not_equals":
      return !r;
    case "filled":
      return i;
    default:
      return !i;
  }
}
const Se = "__none";
function I({ message: a }) {
  return a ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: a }) : null;
}
function Je(a) {
  const l = a.config?.options;
  return Array.isArray(l) ? l.flatMap((n) => {
    if (typeof n == "string") return [{ value: n, label: n }];
    if (n && typeof n == "object" && typeof n.value == "string") {
      const { value: c, label: i } = n;
      return [{ value: c, label: i || c }];
    }
    return [];
  }) : [];
}
const na = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function ze(a) {
  if (a.label) return a.label;
  const l = a.handle.replace(/_/g, " ");
  return l.charAt(0).toUpperCase() + l.slice(1);
}
function se({ field: a, value: l, onChange: n, errors: c, id: i, content: r = !1 }) {
  const m = ze(a), u = na.includes(a.type) || ["select", "terms"].includes(a.type) && a.config?.multiple === !0;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", ...u ? { role: "group", "aria-labelledby": `${i}-label` } : {}, children: [
    a.type === "toggle" ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(s.Switch, { id: i, checked: l === !0, onCheckedChange: (h) => n(h) }),
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: i, children: m })
    ] }) : /* @__PURE__ */ e.jsxs(s.Label, { id: `${i}-label`, htmlFor: u ? void 0 : i, children: [
      m,
      a.required && /* @__PURE__ */ e.jsx("span", { className: "cms:text-destructive", children: " *" })
    ] }),
    /* @__PURE__ */ e.jsx(ca, { field: a, value: l, onChange: n, errors: c, id: i, content: r }),
    a.instructions && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: a.instructions }),
    /* @__PURE__ */ e.jsx(I, { message: c[""] })
  ] });
}
function ca({ field: a, value: l, onChange: n, errors: c, id: i, content: r }) {
  const m = c[""] !== void 0;
  switch (a.type) {
    case "toggle":
      return null;
    case "file":
      return /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("Visitors attach a file here when they send a form.") });
    case "textarea":
      return /* @__PURE__ */ e.jsx(
        s.Textarea,
        {
          id: i,
          "aria-invalid": m,
          value: typeof l == "string" ? l : "",
          rows: Y(a, "rows") ?? 4,
          onChange: (u) => n(u.target.value)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ e.jsx(s.RichTextEditor, { id: i, labelledBy: `${i}-label`, invalid: m, value: typeof l == "string" ? l : "", onChange: n });
    case "number":
      return /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: i,
          type: "number",
          className: "cms:max-w-48",
          "aria-invalid": m,
          value: typeof l == "number" ? String(l) : typeof l == "string" ? l : "",
          min: Y(a, "min"),
          max: Y(a, "max"),
          step: Y(a, "step") ?? "any",
          onChange: (u) => n(u.target.value === "" ? null : Number(u.target.value))
        }
      );
    case "date": {
      const u = a.config?.time === !0;
      return /* @__PURE__ */ e.jsx(
        s.DatePicker,
        {
          id: i,
          withTime: u,
          invalid: m,
          required: a.required === !0,
          value: Ke(vt(l, u)),
          onChange: (h) => n(Ke(h ?? ""))
        }
      );
    }
    case "select":
      return a.config?.multiple === !0 ? /* @__PURE__ */ e.jsx(oa, { options: Je(a), value: Array.isArray(l) ? l.map(String) : [], onChange: n }) : /* @__PURE__ */ e.jsx(ia, { options: Je(a), value: typeof l == "string" ? l : null, onChange: n, id: i, required: a.required === !0 });
    case "terms": {
      const u = a.config?.multiple === !0, h = Array.isArray(l) ? l.filter((d) => typeof d == "number") : typeof l == "number" ? l : null;
      return /* @__PURE__ */ e.jsx(
        ea,
        {
          id: i,
          taxonomy: typeof a.taxonomy == "string" ? a.taxonomy : null,
          multiple: u,
          max: Y(a, "max") ?? null,
          required: a.required === !0,
          invalid: m,
          value: u ? Array.isArray(h) ? h : [] : typeof h == "number" ? h : null,
          onChange: n
        }
      );
    }
    case "entries":
      return /* @__PURE__ */ e.jsx(
        be,
        {
          id: i,
          invalid: m,
          multiple: a.config?.multiple === !0,
          max: Y(a, "max") ?? null,
          collections: a.collections ?? [],
          onChange: n,
          value: typeof l == "number" || Array.isArray(l) && l.every((u) => typeof u == "number") ? l : null
        }
      );
    case "link":
      return /* @__PURE__ */ e.jsx(da, { value: ie(l), onChange: n, errors: c, id: i, collections: a.collections ?? [] });
    case "media":
      return /* @__PURE__ */ e.jsx(
        s.MediaPickerInput,
        {
          id: i,
          invalid: m,
          disabled: !1,
          multiple: a.config?.multiple === !0,
          max: Y(a, "max") ?? null,
          types: Array.isArray(a.config?.types) ? a.config.types : [],
          value: typeof l == "number" || Array.isArray(l) && l.every((u) => typeof u == "number") ? l : null,
          onChange: n
        }
      );
    case "group":
      return /* @__PURE__ */ e.jsx(ae, { fields: a.fields ?? [], value: ie(l), onChange: n, errors: c, id: i, content: r });
    case "repeater":
      return /* @__PURE__ */ e.jsx(ua, { field: a, value: Array.isArray(l) ? l : [], onChange: n, errors: c, id: i, content: r });
    case "flexible":
      return /* @__PURE__ */ e.jsx(ha, { field: a, value: Array.isArray(l) ? l : [], onChange: n, errors: c, id: i });
    default:
      return /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: i,
          "aria-invalid": m,
          value: typeof l == "string" ? l : "",
          placeholder: ra(a, "placeholder"),
          maxLength: Y(a, "max"),
          onChange: (u) => n(u.target.value)
        }
      );
  }
}
function Y(a, l) {
  const n = a.config?.[l];
  return typeof n == "number" ? n : void 0;
}
function ra(a, l) {
  const n = a.config?.[l];
  return typeof n == "string" ? n : void 0;
}
function ae({ fields: a, value: l, onChange: n, errors: c, id: i, content: r, bare: m = !1 }) {
  return /* @__PURE__ */ e.jsx("div", { className: m ? "cms:flex cms:flex-col cms:gap-6" : "cms:flex cms:flex-col cms:gap-4 cms:rounded-lg cms:border cms:p-4", children: a.filter((u) => He(u, l)).map((u) => u.shared ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
    /* @__PURE__ */ e.jsx(se, { id: `${i}-${u.handle}`, field: u, value: l[u.handle], content: r, errors: {}, onChange: () => {
    } }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("Shared by all languages: edit it in the main language.") })
  ] }, u.handle) : /* @__PURE__ */ e.jsx(
    se,
    {
      id: `${i}-${u.handle}`,
      field: u,
      value: l[u.handle],
      content: r,
      errors: G(c, u.handle),
      onChange: (h) => n({ ...l, [u.handle]: h })
    },
    u.handle
  )) });
}
function ia({ options: a, value: l, onChange: n, id: c, required: i }) {
  return /* @__PURE__ */ e.jsxs(s.Select, { value: l ?? Se, onValueChange: (r) => n(r === Se ? null : r), children: [
    /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: c, className: "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
    /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
      !i && /* @__PURE__ */ e.jsx(s.SelectItem, { value: Se, children: t("None") }),
      a.map((r) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: r.value, children: r.label }, r.value))
    ] })
  ] });
}
function oa({ options: a, value: l, onChange: n }) {
  return a.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("Nothing to choose from yet.") }) : /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2", children: a.map((c) => /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
    /* @__PURE__ */ e.jsx(
      s.Checkbox,
      {
        checked: l.includes(c.value),
        onCheckedChange: (i) => n(i ? a.map((r) => r.value).filter((r) => r === c.value || l.includes(r)) : l.filter((r) => r !== c.value))
      }
    ),
    c.label
  ] }, c.value)) });
}
function da({ value: a, onChange: l, errors: n, id: c, collections: i }) {
  const r = a.type === "entry" ? "entry" : "url", m = (u) => {
    const h = { ...a, type: r, ...u }, d = h.type === "entry" ? typeof h.entry_id != "number" : h.url === "" || h.url === void 0 || h.url === null;
    l(d ? h.label || h.new_tab ? h : null : h);
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("div", { role: "radiogroup", "aria-label": t("Link to"), className: "cms:inline-flex cms:w-fit cms:rounded-md cms:border cms:p-0.5", children: ["url", "entry"].map((u) => /* @__PURE__ */ e.jsx(
      s.Button,
      {
        type: "button",
        size: "sm",
        role: "radio",
        "aria-checked": r === u,
        variant: r === u ? "secondary" : "ghost",
        onClick: () => m({ type: u, url: u === "url" ? a.url : void 0, entry_id: u === "entry" ? a.entry_id : void 0 }),
        children: t(u === "url" ? "Address" : "Entry")
      },
      u
    )) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-2 cms:md:grid-cols-[2fr_1fr_auto] cms:md:items-start", children: [
      r === "url" ? /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: c,
          "aria-label": t("Address"),
          placeholder: t("https://… or /about"),
          value: typeof a.url == "string" ? a.url : "",
          onChange: (u) => m({ url: u.target.value }),
          "aria-invalid": n.url !== void 0
        }
      ) : /* @__PURE__ */ e.jsx(
        be,
        {
          id: c,
          invalid: n.entry_id !== void 0,
          multiple: !1,
          max: null,
          collections: i,
          value: typeof a.entry_id == "number" ? a.entry_id : null,
          onChange: (u) => m({ entry_id: typeof u == "number" ? u : void 0 })
        }
      ),
      /* @__PURE__ */ e.jsx(
        s.Input,
        {
          "aria-label": t("Link text"),
          placeholder: t(r === "entry" ? "Link text (the entry's title)" : "Link text"),
          value: typeof a.label == "string" ? a.label : "",
          onChange: (u) => m({ label: u.target.value })
        }
      ),
      /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:h-9 cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx(s.Checkbox, { checked: a.new_tab === !0, onCheckedChange: (u) => m({ new_tab: u }) }),
        t("New tab")
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ e.jsx(I, { message: n.url ?? n.entry_id ?? n.label ?? n.type }) })
    ] })
  ] });
}
function ma(a, l) {
  return !l && (a.fields ?? []).every((n) => n.type === "text");
}
function ot(a) {
  const l = D.useRef([]);
  return l.current = kt(l.current, a), {
    keys: l.current,
    remove: (n) => {
      l.current = l.current.filter((c, i) => i !== n);
    },
    move: (n, c) => {
      l.current = s.moveItem(l.current, n, c);
    }
  };
}
function ua({ field: a, value: l, onChange: n, errors: c, id: i, content: r = !1 }) {
  const m = a.fields ?? [], u = l.map(ie), h = ot(u.length), d = (b, v) => n(u.map(($, N) => N === b ? v : $)), f = (b) => {
    h.remove(b), n(u.filter((v, $) => $ !== b));
  }, o = a.label ? a.label.toLowerCase().replace(/s$/, "") : t("row"), x = o.charAt(0).toUpperCase() + o.slice(1), C = u.map((b, v) => ({ row: b, index: v, key: h.keys[v] ?? String(v) }));
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(
      s.SortableList,
      {
        items: C,
        getId: (b) => b.key,
        onReorder: (b, v, $) => {
          h.move(v, $), n(b.map((N) => N.row));
        },
        children: ({ row: b, index: v }, { handle: $ }) => ma(a, r) ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(s.SortableHandle, { ...$, label: t("Move :item :number", { item: o, number: v + 1 }), className: "cms:mt-1" }),
          m.map((N) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
            /* @__PURE__ */ e.jsx(
              s.Input,
              {
                "aria-label": N.label || N.handle,
                placeholder: N.label || N.handle,
                value: typeof b[N.handle] == "string" ? b[N.handle] : "",
                onChange: (y) => d(v, { ...b, [N.handle]: y.target.value })
              }
            ),
            /* @__PURE__ */ e.jsx(I, { message: c[`${v}.${N.handle}`] })
          ] }, N.handle)),
          /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": t("Remove :item :number", { item: o, number: v + 1 }), onClick: () => f(v), children: /* @__PURE__ */ e.jsx(O, {}) })
        ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(
            dt,
            {
              label: `${x} ${v + 1}`,
              handle: $,
              onRemove: () => f(v),
              hidden: r ? b._hidden === !0 : void 0,
              onHidden: (N) => d(v, { ...b, _hidden: N })
            }
          ),
          /* @__PURE__ */ e.jsx(ae, { fields: m, value: b, onChange: (N) => d(v, N), errors: G(c, String(v)), id: `${i}-${v}`, content: r })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", size: "sm", onClick: () => n([...u, r ? yt() : {}]), children: [
      /* @__PURE__ */ e.jsx(q, {}),
      " ",
      t("Add :item", { item: o })
    ] }) })
  ] });
}
function ha({ field: a, value: l, onChange: n, errors: c, id: i }) {
  const r = a.blocks ?? [], m = l.map(ie), u = ot(m.length), h = (o, x) => n(m.map((C, b) => b === o ? x : C)), d = (o) => {
    u.remove(o), n(m.filter((x, C) => C !== o));
  }, f = m.map((o, x) => ({ block: o, index: x, key: u.keys[x] ?? String(x) }));
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    /* @__PURE__ */ e.jsx(
      s.SortableList,
      {
        items: f,
        getId: (o) => o.key,
        className: "cms:gap-3",
        onReorder: (o, x, C) => {
          u.move(x, C), n(o.map((b) => b.block));
        },
        children: ({ block: o, index: x }, { handle: C }) => {
          const b = r.find((v) => v.type === o.type);
          return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              dt,
              {
                label: b?.label ?? String(o.type),
                badge: !0,
                handle: C,
                onRemove: () => d(x),
                hidden: o.hidden === !0,
                onHidden: (v) => h(x, { ...o, hidden: v })
              }
            ),
            b ? /* @__PURE__ */ e.jsx(
              ae,
              {
                fields: b.fields,
                value: ie(o.values),
                onChange: (v) => h(x, { ...o, values: v }),
                errors: G(c, `${x}.values`),
                id: `${i}-${x}`,
                content: !0
              }
            ) : /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: t("This kind of block no longer exists. Its values are kept.") }),
            /* @__PURE__ */ e.jsx(I, { message: c[`${x}.type`] })
          ] });
        }
      }
    ),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(s.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(s.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", size: "sm", disabled: r.length === 0, children: [
        /* @__PURE__ */ e.jsx(q, {}),
        " ",
        t("Add block")
      ] }) }),
      /* @__PURE__ */ e.jsx(s.DropdownMenuContent, { align: "start", children: r.map((o) => /* @__PURE__ */ e.jsx(s.DropdownMenuItem, { onSelect: () => n([...m, Nt(o.type)]), children: o.label }, o.type)) })
    ] }) })
  ] });
}
function dt({ label: a, badge: l = !1, handle: n, onRemove: c, hidden: i, onHidden: r }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(s.SortableHandle, { ...n, label: t("Move :title", { title: a }) }),
    l ? /* @__PURE__ */ e.jsx(s.Badge, { variant: "secondary", children: a }) : /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:font-medium", children: a }),
    i !== void 0 && /* @__PURE__ */ e.jsxs("label", { className: "cms:ml-auto cms:flex cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", children: [
      /* @__PURE__ */ e.jsx(s.Switch, { checked: !i, onCheckedChange: (m) => r(!m), "aria-label": t("Show :title", { title: a }) }),
      t("Show")
    ] }),
    /* @__PURE__ */ e.jsx(
      s.Button,
      {
        type: "button",
        variant: "ghost",
        size: "icon",
        className: `cms:size-8 cms:text-destructive ${i === void 0 ? "cms:ml-auto" : ""}`,
        "aria-label": t("Remove :title", { title: a }),
        onClick: c,
        children: /* @__PURE__ */ e.jsx(O, {})
      }
    )
  ] });
}
function mt({ fields: a, onChange: l, types: n, errors: c, depth: i = 1, idPrefix: r = "field" }) {
  const [m, u] = D.useState(() => /* @__PURE__ */ new Set()), h = (o) => u((x) => {
    const C = new Set(x);
    return C.has(o) ? C.delete(o) : C.add(o), C;
  }), d = (o, x) => l(a.map((C, b) => b === o ? x : C)), f = (o) => {
    const x = aa(o.type, o.label, a);
    l([...a, x]), u((C) => new Set(C).add(x.key));
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    a.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:border-dashed cms:p-4 cms:text-sm cms:text-muted-foreground", children: t("No fields yet.") }),
    /* @__PURE__ */ e.jsx(s.SortableList, { items: a, getId: (o) => o.key, onReorder: (o) => l(o), children: (o, { index: x, handle: C, isOverlay: b }) => {
      const v = n.find((y) => y.type === o.type), $ = !b && (m.has(o.key) || ne(c, String(x))), N = `${r}-${o.key}`;
      return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${ne(c, String(x)) ? "cms:border-destructive" : ""}`, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:p-2", children: [
          /* @__PURE__ */ e.jsx(s.SortableHandle, { ...C, label: t("Move :title", { title: o.label || o.handle }) }),
          /* @__PURE__ */ e.jsx(
            s.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-expanded": $,
              "aria-controls": N,
              "aria-label": $ ? t("Close :title", { title: o.label || o.handle }) : t("Open :title", { title: o.label || o.handle }),
              onClick: () => h(o.key),
              children: $ ? /* @__PURE__ */ e.jsx(bs, {}) : /* @__PURE__ */ e.jsx(fe, {})
            }
          ),
          /* @__PURE__ */ e.jsxs("button", { type: "button", className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:text-left", onClick: () => h(o.key), children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: o.label || o.handle }),
            /* @__PURE__ */ e.jsx("code", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", children: o.handle })
          ] }),
          o.required && /* @__PURE__ */ e.jsx(s.Badge, { variant: "outline", children: t("Required") }),
          /* @__PURE__ */ e.jsx(s.Badge, { variant: "secondary", children: v?.label ?? o.type }),
          v?.hasChildren && o.fields.length > 0 && !$ && /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: t(":count inside", { count: o.fields.length }) }),
          /* @__PURE__ */ e.jsx(
            s.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": t("Remove :title", { title: o.label || o.handle }),
              onClick: () => l(a.filter((y, _) => _ !== x)),
              children: /* @__PURE__ */ e.jsx(O, {})
            }
          )
        ] }),
        $ && /* @__PURE__ */ e.jsx(
          xa,
          {
            id: N,
            field: o,
            type: v,
            siblings: a,
            onChange: (y) => d(x, y),
            types: n,
            errors: oe(c, String(x)),
            depth: i
          }
        )
      ] });
    } }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(s.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(s.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", size: "sm", children: [
        /* @__PURE__ */ e.jsx(q, {}),
        " ",
        t("Add field")
      ] }) }),
      /* @__PURE__ */ e.jsx(s.DropdownMenuContent, { align: "start", children: n.filter((o) => !o.hasChildren || i < sa).map((o) => /* @__PURE__ */ e.jsx(s.DropdownMenuItem, { onSelect: () => f(o), children: o.label }, o.type)) })
    ] }) })
  ] });
}
const Q = { default: "__default", yes: "yes", no: "no" };
function xa({ id: a, field: l, type: n, siblings: c, onChange: i, types: r, errors: m, depth: u }) {
  const h = l.config ?? {};
  return /* @__PURE__ */ e.jsxs("div", { id: a, className: "cms:flex cms:flex-col cms:gap-4 cms:border-t cms:p-4", children: [
    !n && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t(`The field type ":type" isn't registered. Its data is kept; register the type or remove the field.`, { type: l.type }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${a}-label`, children: t("Label") }),
        /* @__PURE__ */ e.jsx(s.Input, { id: `${a}-label`, value: l.label ?? "", onChange: (d) => i(la(l, d.target.value, c)) }),
        /* @__PURE__ */ e.jsx(I, { message: m.label })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${a}-handle`, children: t("Handle") }),
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            id: `${a}-handle`,
            className: "cms:font-mono",
            value: l.handle,
            onChange: (d) => i({ ...l, handle: nt(d.target.value), handleTouched: !0 })
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("How templates read it. Renaming it hides values saved under the old one.") }),
        /* @__PURE__ */ e.jsx(I, { message: m.handle })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${a}-instructions`, children: t("Instructions") }),
      /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: `${a}-instructions`,
          value: l.instructions ?? "",
          placeholder: t("Shown under the field to editors"),
          onChange: (d) => i({ ...l, instructions: d.target.value || null })
        }
      ),
      /* @__PURE__ */ e.jsx(I, { message: m.instructions })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-6", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(s.Switch, { id: `${a}-required`, checked: l.required === !0, onCheckedChange: (d) => i({ ...l, required: d }) }),
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${a}-required`, children: t("Required") })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${a}-translatable`, children: t("Per language") }),
        /* @__PURE__ */ e.jsxs(
          s.Select,
          {
            value: l.translatable === !0 ? Q.yes : l.translatable === !1 ? Q.no : Q.default,
            onValueChange: (d) => i({ ...l, translatable: d === Q.yes ? !0 : d === Q.no ? !1 : null }),
            children: [
              /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: `${a}-translatable`, className: "cms:w-48", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
              /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
                /* @__PURE__ */ e.jsx(s.SelectItem, { value: Q.default, children: t("As the type decides") }),
                /* @__PURE__ */ e.jsx(s.SelectItem, { value: Q.yes, children: t("Yes, translated") }),
                /* @__PURE__ */ e.jsx(s.SelectItem, { value: Q.no, children: t("No, shared") })
              ] })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(ga, { id: a, field: l, siblings: c, onChange: i, errors: oe(m, "condition") }),
    (n?.settings.length ?? 0) > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: n?.settings.map((d) => /* @__PURE__ */ e.jsx(
      se,
      {
        id: `${a}-config-${d.handle}`,
        field: d,
        value: h[d.handle],
        errors: G(m, `config.${d.handle}`),
        onChange: (f) => i({ ...l, config: { ...h, [d.handle]: f } })
      },
      d.handle
    )) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${a}-validation`, children: t("Extra rules") }),
      /* @__PURE__ */ e.jsx(
        s.Textarea,
        {
          id: `${a}-validation`,
          rows: 2,
          className: "cms:font-mono",
          placeholder: `min:3
regex:/^[A-Z]/`,
          value: (l.validation ?? []).join(`
`),
          onChange: (d) => i({ ...l, validation: d.target.value.split(`
`) })
        }
      ),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("Laravel rules, one per line.") }),
      /* @__PURE__ */ e.jsx(I, { message: m.validation ?? Object.entries(m).find(([d]) => d.startsWith("validation."))?.[1] })
    ] }),
    n?.hasChildren && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(s.Label, { children: t("Fields inside") }),
      /* @__PURE__ */ e.jsx(
        mt,
        {
          fields: l.fields,
          onChange: (d) => i({ ...l, fields: d }),
          types: r,
          errors: oe(m, "fields"),
          depth: u + 1,
          idPrefix: a
        }
      ),
      /* @__PURE__ */ e.jsx(I, { message: m.fields })
    ] }),
    /* @__PURE__ */ e.jsx(I, { message: m.type })
  ] });
}
const Ce = "__always";
function pa(a) {
  switch (a) {
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
function ga({ id: a, field: l, siblings: n, onChange: c, errors: i }) {
  const r = n.filter((d) => d.key !== l.key && d.handle !== ""), m = l.condition ?? null, u = Ne.find((d) => d.value === m?.operator) ?? Ne[0], h = (d) => c({ ...l, condition: d === null ? null : { field: m?.field ?? r[0]?.handle ?? "", operator: m?.operator ?? "equals", value: m?.value ?? "", ...d } });
  return r.length === 0 && m === null ? null : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${a}-condition`, children: t("Show") }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(s.Select, { value: m?.field ?? Ce, onValueChange: (d) => h(d === Ce ? null : { field: d }), children: [
        /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: `${a}-condition`, className: "cms:w-56", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
        /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
          /* @__PURE__ */ e.jsx(s.SelectItem, { value: Ce, children: t("Always") }),
          r.map((d) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: d.handle, children: t("When :field", { field: d.label || d.handle }) }, d.key))
        ] })
      ] }),
      m && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(s.Select, { value: u.value, onValueChange: (d) => h({ operator: d }), children: [
          /* @__PURE__ */ e.jsx(s.SelectTrigger, { "aria-label": t("How to compare"), className: "cms:w-36", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(s.SelectContent, { children: Ne.map((d) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: d.value, children: pa(d.value) }, d.value)) })
        ] }),
        u.needsValue && /* @__PURE__ */ e.jsx(
          s.Input,
          {
            "aria-label": t("Value"),
            className: "cms:w-48",
            placeholder: t("a value, or true / false"),
            value: String(m.value ?? ""),
            onChange: (d) => h({ value: d.target.value })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("A hidden field isn't required, and keeps what it had.") }),
    /* @__PURE__ */ e.jsx(I, { message: i.field ?? i.operator ?? i.value ?? i[""] })
  ] });
}
function Ye({ kind: a = "blueprint", blueprint: l, fieldTypes: n, usedBy: c = [] }) {
  const i = a === "fieldset", r = T(i ? "cms/fieldsets" : "cms/blueprints"), m = l ? l.title : t(i ? "New fieldset" : "New blueprint");
  s.useBreadcrumbs([{ label: t(i ? "Fieldsets" : "Blueprints"), href: r }, { label: m }]);
  const [u, h] = X(), d = S.useForm({ title: l?.title ?? "", handle: l?.handle ?? "" }), [f, o] = D.useState(l !== null), [x, C] = D.useState(() => rt(l?.fields)), b = (p) => n.find((z) => z.type === p)?.hasChildren === !0, v = d.errors, [$, N] = D.useState(() => JSON.stringify(x)), y = d.isDirty || JSON.stringify(x) !== $, _ = () => {
    d.setDefaults(), N(JSON.stringify(x));
  }, g = () => {
    d.processing || (d.transform((p) => ({
      ...l ? { title: p.title } : p,
      fields: it(x, b)
    })), l ? d.put(`${r}/${l.handle}`, { preserveScroll: !0, onSuccess: _ }) : d.post(r, { onSuccess: _ }));
  }, w = (p) => {
    p.preventDefault(), g();
  };
  s.useUnsavedChanges(y, g);
  const B = () => l && u(
    i ? t('Delete the fieldset ":title"? Content keeps its values.', { title: l.title }) : t('Delete the blueprint ":title"? Content keeps its values.', { title: l.title }),
    () => S.router.delete(`${r}/${l.handle}`, { preserveScroll: !0 })
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: w, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: m }),
    h,
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: m,
        back: { href: r, label: t(i ? "Back to fieldsets" : "Back to blueprints") },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          l && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", size: "icon", className: "cms:text-destructive", "aria-label": t("Delete :title", { title: m }), onClick: B, children: /* @__PURE__ */ e.jsx(O, {}) }),
          /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: d.processing, children: [
            d.processing && /* @__PURE__ */ e.jsx(te, { className: "cms:animate-spin" }),
            t(l ? "Save" : i ? "Create fieldset" : "Create blueprint")
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(I, { message: v.blueprint ?? v.fieldset }),
    /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsxs(s.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "title", children: t("Title") }),
        /* @__PURE__ */ e.jsx(s.Input, { id: "title", value: d.data.title, required: !0, onChange: (p) => {
          d.setData((z) => ({ ...z, title: p.target.value, handle: f ? z.handle : lt(p.target.value) }));
        } }),
        /* @__PURE__ */ e.jsx(I, { message: v.title })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "handle", children: t("Handle") }),
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            id: "handle",
            className: "cms:font-mono",
            value: d.data.handle,
            disabled: l !== null,
            required: !0,
            onChange: (p) => {
              o(!0), d.setData("handle", nt(p.target.value));
            }
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t(l ? "Set when it was created." : "Lowercase letters, digits and underscores. It can't change later.") }),
        /* @__PURE__ */ e.jsx(I, { message: v.handle })
      ] })
    ] }) }),
    c.length > 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("Used by :list. Changes show there at once.", { list: c.join(", ") }) }),
    /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-3", "aria-labelledby": "fields-heading", children: [
      /* @__PURE__ */ e.jsx("h2", { id: "fields-heading", className: "cms:text-lg cms:font-medium", children: t("Fields") }),
      /* @__PURE__ */ e.jsx(mt, { fields: x, onChange: C, types: n, errors: oe(v, "fields") }),
      /* @__PURE__ */ e.jsx(I, { message: v.fields })
    ] })
  ] });
}
function ut({ kind: a, base: l, rows: n, intro: c }) {
  const i = a === "blueprint", r = t(i ? "Blueprints" : "Fieldsets");
  s.useBreadcrumbs([{ label: r }]);
  const [m, u] = X();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: r }),
    u,
    /* @__PURE__ */ e.jsx(s.PageHeader, { title: r, description: c, actions: /* @__PURE__ */ e.jsx(s.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(S.Link, { href: `${l}/create`, children: [
      /* @__PURE__ */ e.jsx(q, {}),
      " ",
      t(i ? "New blueprint" : "New fieldset")
    ] }) }) }),
    /* @__PURE__ */ e.jsx(s.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(s.Table, { children: [
      /* @__PURE__ */ e.jsx(s.TableHeader, { children: /* @__PURE__ */ e.jsxs(s.TableRow, { children: [
        /* @__PURE__ */ e.jsx(s.TableHead, { children: t("Title") }),
        /* @__PURE__ */ e.jsx(s.TableHead, { children: t("Handle") }),
        /* @__PURE__ */ e.jsx(s.TableHead, { children: t("Fields") }),
        n.some((h) => h.usedBy) && /* @__PURE__ */ e.jsx(s.TableHead, { children: t("Used by") }),
        /* @__PURE__ */ e.jsx(s.TableHead, { className: "cms:w-12", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: t("Actions") }) })
      ] }) }),
      /* @__PURE__ */ e.jsxs(s.TableBody, { children: [
        n.length === 0 && /* @__PURE__ */ e.jsx(s.TableRow, { children: /* @__PURE__ */ e.jsx(s.TableCell, { colSpan: 5, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: t(i ? "No blueprints yet." : "No fieldsets yet.") }) }),
        n.map((h) => /* @__PURE__ */ e.jsxs(s.TableRow, { children: [
          /* @__PURE__ */ e.jsx(s.TableCell, { children: /* @__PURE__ */ e.jsx(S.Link, { href: `${l}/${h.handle}/edit`, className: "cms:font-medium cms:hover:underline", children: h.title }) }),
          /* @__PURE__ */ e.jsx(s.TableCell, { children: /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: h.handle }) }),
          /* @__PURE__ */ e.jsx(s.TableCell, { children: h.fields }),
          h.usedBy && /* @__PURE__ */ e.jsx(s.TableCell, { className: "cms:text-muted-foreground", children: h.usedBy.join(", ") || "—" }),
          /* @__PURE__ */ e.jsx(s.TableCell, { children: /* @__PURE__ */ e.jsx(
            s.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": t("Delete :title", { title: h.title }),
              onClick: () => m(
                i ? t('Delete the blueprint ":title"? Content keeps its values.', { title: h.title }) : t('Delete the fieldset ":title"? Content keeps its values.', { title: h.title }),
                () => S.router.delete(`${l}/${h.handle}`, { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(O, {})
            }
          ) })
        ] }, h.id))
      ] })
    ] }) })
  ] });
}
function fa({ blueprints: a }) {
  const l = S.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(I, { message: l.blueprint }),
    /* @__PURE__ */ e.jsx(
      ut,
      {
        kind: "blueprint",
        base: T("cms/blueprints"),
        rows: a,
        intro: t("The fields editors fill in, for each kind of content.")
      }
    )
  ] });
}
const Qe = (a) => `resources/views/${a.replace(/\./g, "/")}.blade.php`;
function ht({ example: a, fallbacks: l }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1 cms:text-xs cms:leading-relaxed cms:text-muted-foreground", children: [
    /* @__PURE__ */ e.jsx("p", { children: t("A Blade view: :example is :file.", { example: "\0", file: "" }).split(/(\u0000|\u0001)/).map((n, c) => n === "\0" ? /* @__PURE__ */ e.jsx("code", { className: "cms:text-foreground", children: a }, c) : n === "" ? /* @__PURE__ */ e.jsx("code", { className: "cms:break-all", children: Qe(a) }, c) : n) }),
    /* @__PURE__ */ e.jsx("p", { children: t("Empty: the first that exists of") }),
    /* @__PURE__ */ e.jsxs("ol", { className: "cms:ml-4 cms:list-decimal", children: [
      l.map((n) => /* @__PURE__ */ e.jsx("li", { children: n.includes(" ") ? n : /* @__PURE__ */ e.jsx("code", { className: "cms:break-all", children: Qe(n) }) }, n)),
      /* @__PURE__ */ e.jsx("li", { children: t("the built-in template") })
    ] })
  ] });
}
const Ze = { preserveScroll: !0, preserveState: !0 };
function ja({ entryId: a, comments: l }) {
  const [n, c] = D.useState(null), [i, r] = D.useState(""), [m, u] = D.useState(!1), h = (f, o) => S.router.post(T(`cms/comments/${f}/status`), { status: o }, Ze), d = (f) => S.router.post(T(`cms/comments/${f}/reply`), { body: i }, {
    ...Ze,
    onStart: () => u(!0),
    onFinish: () => u(!1),
    onSuccess: () => {
      c(null), r("");
    }
  });
  return /* @__PURE__ */ e.jsx(
    s.CollapsibleCard,
    {
      title: t("Comments"),
      titleClassName: "cms:text-base",
      storageKey: "cms:entry:comments",
      contentClassName: "cms:flex cms:flex-col cms:gap-3 cms:text-sm",
      headerAction: l && l.counts.pending > 0 ? /* @__PURE__ */ e.jsx(s.Badge, { children: t(":count pending", { count: l.counts.pending }) }) : void 0,
      children: l ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t(":approved approved · :pending pending · :spam spam", { approved: l.counts.approved, pending: l.counts.pending, spam: l.counts.spam }) }),
        l.latest.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("No comments yet.") }),
        l.latest.map((f) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5 cms:border-t cms:border-border/70 cms:pt-3 cms:first-of-type:border-t-0 cms:first-of-type:pt-0", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium", children: f.author }),
            f.status === "pending" && /* @__PURE__ */ e.jsx(s.Badge, { variant: "outline", children: t("Pending") })
          ] }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:line-clamp-3 cms:break-words cms:whitespace-pre-line", children: f.excerpt }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
            J(f.createdAt),
            f.reply ? ` · ${t("a reply")}` : ""
          ] }),
          l.canModerate && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-1", children: [
            f.status === "pending" && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", size: "sm", onClick: () => h(f.id, "approved"), children: [
              /* @__PURE__ */ e.jsx(pe, {}),
              " ",
              t("Approve")
            ] }),
            /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => h(f.id, "spam"), children: [
              /* @__PURE__ */ e.jsx(Be, {}),
              " ",
              t("Spam")
            ] }),
            /* @__PURE__ */ e.jsxs(
              s.Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                "aria-expanded": n === f.id,
                onClick: () => {
                  c(n === f.id ? null : f.id), r("");
                },
                children: [
                  /* @__PURE__ */ e.jsx(Rs, {}),
                  " ",
                  t("Reply")
                ]
              }
            )
          ] }),
          n === f.id && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              s.Textarea,
              {
                "aria-label": t("Reply to :author", { author: f.author }),
                rows: 3,
                value: i,
                onChange: (o) => r(o.target.value)
              }
            ),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
              /* @__PURE__ */ e.jsx(s.Button, { type: "button", size: "sm", disabled: i.trim() === "" || m, onClick: () => d(f.id), children: t("Post reply") }),
              /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => c(null), children: t("Cancel") })
            ] })
          ] })
        ] }, f.id)),
        /* @__PURE__ */ e.jsx("a", { href: T(`cms/comments?entry=${a}`), className: "cms:text-sm cms:font-medium cms:underline-offset-4 cms:hover:underline", children: t("All comments on this entry") })
      ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Skeleton, { className: "cms:h-10" }),
        /* @__PURE__ */ e.jsx(s.Skeleton, { className: "cms:h-10" })
      ] })
    }
  );
}
function Pe({ fields: a, values: l, onChange: n, errors: c, storageKey: i, shared: r = [], sharedValues: m = {}, sharedNote: u, disabled: h = !1 }) {
  const d = [], f = { ...m, ...l };
  for (const x of a.filter((C) => He(C, f))) {
    const C = d[d.length - 1];
    x.type === "group" ? d.push(x) : Array.isArray(C) ? C.push(x) : d.push([x]);
  }
  const o = u ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: u }) : null;
  return /* @__PURE__ */ e.jsx(e.Fragment, { children: d.map((x) => {
    if (Array.isArray(x))
      return /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsx(s.CardContent, { children: /* @__PURE__ */ e.jsx("fieldset", { disabled: h, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: x.map(($) => r.includes($.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(se, { id: `data-${$.handle}`, field: $, content: !0, value: m[$.handle], errors: {}, onChange: () => {
        } }),
        o
      ] }, $.handle) : /* @__PURE__ */ e.jsx(
        se,
        {
          id: `data-${$.handle}`,
          field: $,
          content: !0,
          value: l[$.handle],
          errors: G(c, `data.${$.handle}`),
          onChange: (N) => n($.handle, N)
        },
        $.handle
      )) }) }) }, `fields-${x[0]?.handle ?? ""}`);
    const C = r.includes(x.handle), b = (C ? m : l)[x.handle], v = G(c, `data.${x.handle}`);
    return /* @__PURE__ */ e.jsx(
      s.CollapsibleCard,
      {
        title: ze(x),
        titleClassName: "cms:text-base",
        description: x.instructions ?? void 0,
        storageKey: `${i}:${x.handle}`,
        hasErrors: !C && ne(c, `data.${x.handle}`),
        children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: C || h, role: "group", "aria-label": ze(x), className: "cms:flex cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(
            ae,
            {
              bare: !0,
              fields: x.fields ?? [],
              id: `data-${x.handle}`,
              content: !0,
              errors: C ? {} : v,
              value: b && typeof b == "object" && !Array.isArray(b) ? b : {},
              onChange: ($) => n(x.handle, $)
            }
          ),
          C && o,
          /* @__PURE__ */ e.jsx(I, { message: C ? void 0 : v[""] })
        ] })
      },
      x.handle
    );
  }) });
}
function Ve() {
  return [
    { handle: "title", type: "text", label: t("Meta title"), instructions: t("Empty: the title."), config: { max: 255 } },
    { handle: "description", type: "textarea", label: t("Meta description"), instructions: t("A sentence or two for search results."), config: { max: 500 } },
    { handle: "canonical", type: "text", label: t("Canonical URL"), instructions: t("Only if this page copies another: that page's address. Empty: this page."), config: { max: 2e3 } },
    { handle: "image", type: "media", label: t("Open Graph image"), instructions: t("Shown when the page is shared."), config: { types: ["image"] } },
    { handle: "noindex", type: "toggle", label: t("Hide from search engines (noindex)") }
  ];
}
function Xe(a) {
  if (a.length === 0) return "";
  const l = a.slice(0, 5).map((n) => n.label).join("; ");
  return ` ${a.length > 5 ? t("It's used by :list and :count more: those links will show nothing.", { list: l, count: a.length - 5 }) : t("It's used by :list: those links will show nothing.", { list: l })}`;
}
function ba(a) {
  const { entry: l } = a;
  return /* @__PURE__ */ e.jsx(va, { ...a }, l ? `${l.id}:${l.locale}:${l.version}:${l.status}:${l.trashed}:${l.publishedAt}` : "new");
}
function va({ collection: a, fields: l, locales: n = [], shared: c = [], sharedValues: i = {}, entry: r, values: m, revisions: u, comments: h, termLabels: d, usedBy: f = [], undoRestore: o = null, machineTranslate: x = null, settings: C, blueprints: b = [], can: v }) {
  const $ = T(`cms/collections/${a.handle}/entries`), N = r ? T(`cms/entries/${r.id}`) : $, y = r ? m.title : t("New entry");
  s.useBreadcrumbs([{ label: a.title, href: $ }, { label: y }]);
  const [_, g] = X(), [w, B] = D.useState(!1), p = S.useForm({ ...m, seo: m.seo ?? {}, locale: r?.locale ?? null, version: r?.version ?? null, publish: !1, published_at: null }), z = r ? { locale: r.locale } : {}, P = n.find((M) => M.main)?.code, F = p.errors, k = r !== null && r.status !== "draft" && !r.hasUnpublishedChanges && !p.isDirty, A = r === null ? v.create : v.update && !r.trashed, V = (M = !1, W = null) => {
    p.transform((j) => ({ ...j, publish: M, published_at: W })), r ? p.put(N, { preserveScroll: !0, onSuccess: () => B(!1) }) : p.post(N);
  }, le = () => {
    p.transform((M) => ({ ...M, version: null, publish: !1, published_at: null })), p.put(N, { preserveScroll: !0 });
  }, U = s.useEditLock({
    type: "cms.entry",
    id: r?.id,
    locale: r?.locale,
    enabled: r !== null && A,
    noun: t("entry"),
    leaveTo: $,
    getUnsaved: () => p.isDirty ? { title: p.data.title, slug: p.data.slug, data: p.data.data, seo: p.data.seo } : null
  }), K = A && !U.readOnly, ue = async (M) => {
    const W = await U.loadKept(M);
    p.setData((j) => ({ ...j, title: W.title ?? j.title, slug: W.slug ?? j.slug, data: W.data ?? j.data, seo: W.seo ?? j.seo }));
  };
  s.useUnsavedChanges(p.isDirty && !U.takenOver, K ? () => p.processing || V() : void 0);
  const re = (M = null) => {
    v.update ? V(!0, M) : r && S.router.post(`${N}/publish`, { ...z, published_at: M }, { preserveScroll: !0, onSuccess: () => B(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (M) => {
    M.preventDefault(), V();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: y }),
    g,
    U.dialogs,
    /* @__PURE__ */ e.jsxs(
      s.PageHeader,
      {
        title: y,
        back: { href: $, label: t("Back to :title", { title: a.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          r && !r.trashed && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(
            "a",
            {
              href: r.previewUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              title: p.isDirty ? t("Shows the saved draft: save first to see your changes.") : t("Shows the saved draft."),
              children: [
                /* @__PURE__ */ e.jsx(Ot, {}),
                " ",
                t("Preview")
              ]
            }
          ) }),
          r?.url && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: r.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(ce, {}),
            " ",
            t("View page")
          ] }) }),
          r?.trashed && v.delete && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", onClick: () => S.router.post(`${N}/restore`, {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(ge, {}),
            " ",
            t("Restore")
          ] }),
          r?.trashed && v.delete && /* @__PURE__ */ e.jsxs(
            s.Button,
            {
              type: "button",
              variant: "outline",
              className: "cms:text-destructive",
              onClick: () => _(
                t(`Delete ":title" for good, in every language, with its revisions? This can't be undone.`, { title: m.title }) + Xe(f),
                () => S.router.delete(`${N}/force`, { data: f.length > 0 ? { force: 1 } : {} })
              ),
              children: [
                /* @__PURE__ */ e.jsx(O, {}),
                " ",
                t("Delete for good")
              ]
            }
          ),
          r && !r.trashed && (v.create || v.delete && !U.readOnly || K && x !== null) && /* @__PURE__ */ e.jsxs(s.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(s.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", size: "icon", "aria-label": t("More actions"), children: /* @__PURE__ */ e.jsx(_s, {}) }) }),
            /* @__PURE__ */ e.jsxs(s.DropdownMenuContent, { align: "end", className: "cms:min-w-52", children: [
              K && x !== null && /* @__PURE__ */ e.jsxs(
                s.DropdownMenuItem,
                {
                  disabled: p.processing || p.isDirty,
                  onSelect: () => S.router.post(T(`cms/entries/${r.id}/translations/${r.locale}/translate`), { version: r.version }, { preserveScroll: !0 }),
                  children: [
                    /* @__PURE__ */ e.jsx(qt, {}),
                    " ",
                    p.isDirty ? t("Save to translate") : t("Translate from :language", { language: n.find((M) => M.main)?.name ?? (P ? H(P) : t("the main language")) })
                  ]
                }
              ),
              v.create && /* @__PURE__ */ e.jsxs(s.DropdownMenuItem, { onSelect: () => S.router.post(`${N}/duplicate`), children: [
                /* @__PURE__ */ e.jsx(Vt, {}),
                " ",
                t("Duplicate")
              ] }),
              v.delete && !U.readOnly && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(s.DropdownMenuSeparator, {}),
                /* @__PURE__ */ e.jsxs(
                  s.DropdownMenuItem,
                  {
                    className: "cms:text-destructive",
                    onSelect: () => _(t('Move ":title" to the trash? It comes off the site; you can restore it.', { title: m.title }) + Xe(f), () => S.router.delete(N)),
                    children: [
                      /* @__PURE__ */ e.jsx(O, {}),
                      " ",
                      t("Move to trash")
                    ]
                  }
                )
              ] })
            ] })
          ] }),
          K && /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", variant: r && v.publish ? "outline" : "default", disabled: p.processing, children: [
            p.processing && /* @__PURE__ */ e.jsx(te, { className: "cms:animate-spin" }),
            t(r ? "Save draft" : "Create draft")
          ] }),
          r && !r.trashed && v.publish && !U.readOnly && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex", children: [
            /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: k ? "outline" : "default", className: "cms:rounded-r-none cms:disabled:opacity-100", disabled: p.processing || k, onClick: () => re(), children: [
              k && /* @__PURE__ */ e.jsx(pe, { className: "cms:text-emerald-600 cms:dark:text-emerald-400" }),
              r.status === "draft" ? t("Publish") : t(k ? "Published" : "Publish changes")
            ] }),
            /* @__PURE__ */ e.jsxs(s.DropdownMenu, { children: [
              /* @__PURE__ */ e.jsx(s.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(s.Button, { type: "button", size: "icon", variant: k ? "outline" : "default", className: k ? "cms:-ml-px cms:rounded-l-none" : "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": t("More publishing options"), children: /* @__PURE__ */ e.jsx(bs, {}) }) }),
              /* @__PURE__ */ e.jsxs(s.DropdownMenuContent, { align: "end", children: [
                /* @__PURE__ */ e.jsxs(s.DropdownMenuItem, { onSelect: () => B(!0), children: [
                  /* @__PURE__ */ e.jsx(gs, {}),
                  " ",
                  t("Publish on a date…")
                ] }),
                r.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  /* @__PURE__ */ e.jsx(s.DropdownMenuSeparator, {}),
                  /* @__PURE__ */ e.jsx(s.DropdownMenuItem, { onSelect: () => S.router.post(`${N}/unpublish`, z, { preserveScroll: !0 }), children: t("Unpublish") })
                ] })
              ] })
            ] })
          ] })
        ] }),
        children: [
          r && /* @__PURE__ */ e.jsx(s.Badge, { variant: r.status === "published" ? "success" : "secondary", children: r.trashed ? t("In the trash") : Z(r.status) }),
          p.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
        ]
      }
    ),
    r && n.length > 1 && /* @__PURE__ */ e.jsx(
      ya,
      {
        entryUrl: N,
        editUrl: `${$}/${r.id}/edit`,
        current: r.locale,
        locales: n,
        canAdd: v.create && !r.trashed,
        canRemove: v.delete && !r.isMain && !r.trashed,
        onRemove: () => _(
          t('Remove the :language translation of ":title"? Its revisions go with it.', { language: H(r.locale), title: m.title }),
          () => S.router.delete(`${N}/translations/${r.locale}`)
        )
      }
    ),
    /* @__PURE__ */ e.jsx(s.ViewingNotice, { by: U.viewingBy }),
    /* @__PURE__ */ e.jsx(s.KeptEditsNotice, { kept: U.kept, disabled: !K, onLoad: (M) => {
      ue(M);
    }, onDiscard: (M) => {
      U.discardKept(M);
    } }),
    F.version && /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: [
      /* @__PURE__ */ e.jsx("span", { children: F.version }),
      /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", size: "sm", onClick: () => S.router.reload(), children: t("Load theirs") }),
        /* @__PURE__ */ e.jsx(
          s.Button,
          {
            type: "button",
            variant: "destructive",
            size: "sm",
            disabled: p.processing,
            onClick: () => _(t("Save your version over theirs? Their changes are replaced (their earlier published versions stay in the revisions)."), le),
            children: t("Save mine anyway")
          }
        )
      ] })
    ] }),
    (F.entry || F.published_at) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: F.entry ?? F.published_at }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_18rem]", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsx(s.CardContent, { children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: !K, className: "cms:grid cms:gap-4 cms:md:grid-cols-[2fr_1fr]", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "title", children: t("Title") }),
            /* @__PURE__ */ e.jsx(
              s.Input,
              {
                id: "title",
                value: p.data.title,
                "aria-invalid": F.title !== void 0,
                onChange: (M) => p.setData("title", M.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(I, { message: F.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "slug", children: t("Slug") }),
            /* @__PURE__ */ e.jsx(
              s.Input,
              {
                id: "slug",
                className: "cms:font-mono",
                value: p.data.slug,
                placeholder: t("Made from the title"),
                "aria-invalid": F.slug !== void 0,
                onChange: (M) => p.setData("slug", M.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(I, { message: F.slug })
          ] })
        ] }) }) }),
        /* @__PURE__ */ e.jsx(tt.Provider, { value: Array.isArray(d) || !d ? {} : d, children: /* @__PURE__ */ e.jsx(
          Pe,
          {
            disabled: !K,
            fields: l,
            values: p.data.data,
            errors: F,
            storageKey: `cms:entry:${a.handle}`,
            shared: c,
            sharedValues: i,
            sharedNote: P ? t("Shared by all languages: edit it in :language.", { language: H(P) }) : t("Shared by all languages: edit it in the main language."),
            onChange: (M, W) => p.setData("data", { ...p.data.data, [M]: W })
          }
        ) }),
        /* @__PURE__ */ e.jsx(s.CollapsibleCard, { title: t("SEO"), description: t("How this entry appears in search results and shared links."), titleClassName: "cms:text-base", storageKey: "cms:entry:seo", hasErrors: ne(F, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !K, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(
          ae,
          {
            bare: !0,
            id: "seo",
            fields: Ve(),
            value: p.data.seo,
            errors: G(F, "seo"),
            onChange: (M) => p.setData("seo", M)
          }
        ) }) })
      ] }),
      r && /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:flex-col cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs(s.CollapsibleCard, { title: t("Status"), titleClassName: "cms:text-base", storageKey: "cms:entry:status", contentClassName: "cms:flex cms:flex-col cms:gap-3 cms:text-sm", children: [
          /* @__PURE__ */ e.jsxs("dl", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-3", children: [
              /* @__PURE__ */ e.jsx("dt", { className: "cms:text-muted-foreground", children: t("Status") }),
              /* @__PURE__ */ e.jsx("dd", { children: /* @__PURE__ */ e.jsx(s.Badge, { variant: r.status === "published" ? "success" : "secondary", children: r.trashed ? t("In the trash") : Z(r.status) }) })
            ] }),
            r.status !== "draft" && r.publishedAt && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:justify-between cms:gap-3", children: [
              /* @__PURE__ */ e.jsx("dt", { className: "cms:text-muted-foreground", children: r.status === "scheduled" ? t("Goes live") : t("Published") }),
              /* @__PURE__ */ e.jsx("dd", { className: "cms:text-right cms:tabular-nums", children: J(r.publishedAt) })
            ] })
          ] }),
          !r.trashed && v.publish && !U.readOnly && /* @__PURE__ */ e.jsx(
            Na,
            {
              status: r.status,
              publishedAt: r.publishedAt,
              processing: p.processing,
              onPublish: (M) => re(M),
              onUnpublish: () => S.router.post(`${N}/unpublish`, z, { preserveScroll: !0 })
            },
            r.publishedAt ?? "none"
          ),
          r.status !== "draft" && r.hasUnpublishedChanges && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("The draft has changes the site doesn't show yet.") }),
          n.find((M) => M.code === r.locale)?.outdated && /* @__PURE__ */ e.jsx("p", { className: "cms:text-amber-700 cms:dark:text-amber-400", children: P ? t("The :language version changed since this translation was last saved.", { language: H(P) }) : t("The main version changed since this translation was last saved.") })
        ] }),
        /* @__PURE__ */ e.jsxs(s.CollapsibleCard, { title: t("Used by"), titleClassName: "cms:text-base", storageKey: "cms:entry:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          f.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("No other content links here.") }),
          f.map((M) => /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
            M.url ? /* @__PURE__ */ e.jsx("a", { href: M.url, className: "cms:block cms:truncate cms:underline-offset-4 cms:hover:underline", children: M.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:truncate", children: M.label }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:font-mono cms:text-xs cms:text-muted-foreground", children: M.field })
          ] }, `${M.label}:${M.field}`))
        ] }),
        C && /* @__PURE__ */ e.jsx(Ca, { entryUrl: N, collection: a, settings: C, blueprints: b, disabled: !K }),
        h !== null && a.comments && /* @__PURE__ */ e.jsx(ja, { entryId: r.id, comments: h }),
        /* @__PURE__ */ e.jsxs(s.CollapsibleCard, { title: t("Revisions"), titleClassName: "cms:text-base", storageKey: "cms:entry:revisions", contentClassName: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
          o !== null && v.update && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", size: "sm", onClick: () => S.router.post(T(`cms/entries/${r.id}/translations/${r.locale}/undo-restore`), {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(Me, {}),
            " ",
            t("Undo the restore")
          ] }),
          /* @__PURE__ */ e.jsx(S.Deferred, { data: "revisions", fallback: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(s.Skeleton, { className: "cms:h-8" }),
            /* @__PURE__ */ e.jsx(s.Skeleton, { className: "cms:h-8" })
          ] }), children: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            (u ?? []).length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("Each publish keeps one.") }),
            (u ?? []).map((M) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
                /* @__PURE__ */ e.jsx("div", { className: "cms:truncate", children: M.title }),
                /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: J(M.createdAt) })
              ] }),
              v.update && !r.trashed && /* @__PURE__ */ e.jsx(
                s.Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  onClick: () => S.router.post(T(`cms/entries/${r.id}/revisions/${M.id}/restore`), {}, { preserveScroll: !0 }),
                  children: t("Restore")
                }
              )
            ] }, M.id))
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(
      Sa,
      {
        open: w,
        onClose: () => B(!1),
        processing: p.processing,
        current: r?.publishedAt ?? null,
        onSchedule: (M) => re(M)
      }
    )
  ] });
}
function ya({ entryUrl: a, editUrl: l, current: n, locales: c, canAdd: i, canRemove: r, onRemove: m }) {
  const u = c.filter((d) => d.status !== null), h = c.filter((d) => d.status === null);
  return /* @__PURE__ */ e.jsxs("nav", { "aria-label": t("Languages"), className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("div", { className: "cms:inline-flex cms:items-center cms:gap-0.5 cms:rounded-md cms:bg-muted cms:p-0.5", children: u.map((d) => {
      const f = d.code === n, o = d.main ? t(":language (main)", { language: d.name ?? H(d.code) }) : d.name ?? H(d.code), x = d.status ? Z(d.status) : "", C = d.outdated ? t(":language: :status, outdated (the main language changed since)", { language: o, status: x }) : t(":language: :status", { language: o, status: x });
      return /* @__PURE__ */ e.jsxs(
        "button",
        {
          type: "button",
          title: C,
          "aria-label": C,
          "aria-current": f ? "page" : void 0,
          onClick: () => !f && S.router.get(l, { locale: d.code }),
          className: `cms:relative cms:inline-flex cms:h-7 cms:min-w-10 cms:items-center cms:justify-center cms:gap-1.5 cms:rounded cms:px-2.5 cms:text-xs cms:font-semibold cms:tracking-wide cms:uppercase cms:transition-colors ${f ? "cms:bg-card cms:text-foreground cms:shadow-xs" : "cms:text-muted-foreground cms:hover:text-foreground"}`,
          children: [
            d.code,
            (d.outdated || d.status === "published") && /* @__PURE__ */ e.jsx("span", { "aria-hidden": !0, className: `cms:size-1.5 cms:rounded-full ${d.outdated ? "cms:bg-amber-500" : "cms:bg-emerald-500"}` })
          ]
        },
        d.code
      );
    }) }),
    i && h.map((d) => /* @__PURE__ */ e.jsxs(
      s.Button,
      {
        type: "button",
        variant: "outline",
        size: "sm",
        className: "cms:h-8 cms:border-dashed cms:text-xs cms:uppercase",
        title: t("Add :language", { language: d.name ?? H(d.code) }),
        onClick: () => S.router.post(`${a}/translations`, { locale: d.code }),
        children: [
          /* @__PURE__ */ e.jsx(q, {}),
          " ",
          d.code
        ]
      },
      d.code
    )),
    r && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:ml-auto cms:text-destructive", onClick: m, children: t("Remove this language") })
  ] });
}
function Na({ status: a, publishedAt: l, processing: n, onPublish: c, onUnpublish: i }) {
  const [r, m] = D.useState(l ? st(new Date(l)) : ""), u = r === "" ? null : new Date(r), h = u !== null && u.getTime() > Date.now(), d = (x) => x === null ? null : Math.floor(x.getTime() / 6e4), f = d(u) !== d(l ? new Date(l) : null), o = t(a === "draft" ? h ? "Schedule" : "Publish" : h ? a === "scheduled" ? "Reschedule" : "Schedule" : "Change date");
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:border-t cms:border-border/60 cms:pt-3", children: [
    /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "entry-published-at", children: t("Publish date") }),
    /* @__PURE__ */ e.jsx(s.DatePicker, { id: "entry-published-at", withTime: !0, className: "cms:max-w-none", value: r || null, onChange: (x) => m(x ?? "") }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t(a === "draft" ? "Empty: now. A date in the future schedules it." : "The date shown as published. A date in the future takes it off the site until then.") }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: [
      (a === "draft" || f) && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", size: "sm", disabled: n, onClick: () => c(u?.toISOString() ?? null), children: [
        /* @__PURE__ */ e.jsx(gs, {}),
        " ",
        o
      ] }),
      a !== "draft" && /* @__PURE__ */ e.jsx(s.Button, { type: "button", size: "sm", variant: "outline", disabled: n, onClick: i, children: t("Unpublish") })
    ] })
  ] });
}
function Sa({ open: a, onClose: l, onSchedule: n, current: c, processing: i }) {
  const [r, m] = D.useState("");
  return D.useEffect(() => {
    a && m(st(c ? new Date(c) : new Date(Date.now() + 864e5)));
  }, [a, c]), /* @__PURE__ */ e.jsx(s.Dialog, { open: a, onOpenChange: (u) => !u && l(), children: /* @__PURE__ */ e.jsxs(s.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(s.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(s.DialogTitle, { children: t("Publish on a date") }),
      /* @__PURE__ */ e.jsx(s.DialogDescription, { children: t("The entry goes live then; a date in the past publishes it now with that date.") })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "published-at", children: t("Date and time") }),
      /* @__PURE__ */ e.jsx(s.DatePicker, { id: "published-at", withTime: !0, required: !0, className: "cms:max-w-none", value: r || null, onChange: (u) => m(u ?? "") }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("In your time zone.") })
    ] }),
    /* @__PURE__ */ e.jsxs(s.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", onClick: l, children: t("Cancel") }),
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", disabled: r === "" || i, onClick: () => n(new Date(r).toISOString()), children: t("Publish") })
    ] })
  ] }) });
}
function Ca({ entryUrl: a, collection: l, settings: n, blueprints: c, disabled: i }) {
  const r = c.length > 1 ? n.blueprint ?? c[0].handle : void 0, m = S.useForm({
    parent_id: n.parentId,
    template: n.template ?? "",
    comments_closed: n.commentsClosed === !0,
    ...r !== void 0 ? { blueprint: r } : {}
  }), u = m.errors;
  return /* @__PURE__ */ e.jsx(s.CollapsibleCard, { title: t("Page settings"), titleClassName: "cms:text-base", storageKey: "cms:entry:page-settings", hasErrors: Object.keys(u).length > 0, children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: i, className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: [
    l.hierarchical && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "parent", children: t("Parent") }),
      /* @__PURE__ */ e.jsx(
        be,
        {
          id: "parent",
          multiple: !1,
          max: 1,
          collections: [l.handle],
          invalid: u.parent_id !== void 0,
          value: m.data.parent_id,
          onChange: (h) => m.setData("parent_id", typeof h == "number" ? h : null)
        }
      ),
      /* @__PURE__ */ e.jsx(I, { message: u.parent_id })
    ] }),
    c.length > 1 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "blueprint", children: t("Blueprint") }),
      /* @__PURE__ */ e.jsxs(s.Select, { value: m.data.blueprint, onValueChange: (h) => m.setData("blueprint", h), children: [
        /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: "blueprint", "aria-invalid": u.blueprint !== void 0, children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(s.SelectContent, { children: c.map((h) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: h.handle, children: h.title }, h.handle)) })
      ] }),
      m.data.blueprint !== r && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("The fields change in every language; values of fields both blueprints have are kept. Save your draft first: the editor reloads.") }),
      /* @__PURE__ */ e.jsx(I, { message: u.blueprint })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "template", children: t("Template") }),
      /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: "template",
          className: "cms:font-mono",
          placeholder: `cms.${l.handle}-landing`,
          value: m.data.template,
          onChange: (h) => m.setData("template", h.target.value),
          "aria-invalid": u.template !== void 0
        }
      ),
      /* @__PURE__ */ e.jsx(ht, { example: `cms.${l.handle}-landing`, fallbacks: [t("the collection's template, if set"), `cms.${l.handle}`, "cms.entry"] }),
      /* @__PURE__ */ e.jsx(I, { message: u.template })
    ] }),
    l.comments && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(s.Switch, { id: "comments-open", checked: !m.data.comments_closed, onCheckedChange: (h) => m.setData("comments_closed", !h) }),
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "comments-open", children: t("Accept new comments") }),
      /* @__PURE__ */ e.jsx("a", { href: T(`cms/comments?entry=${a.split("/").slice(-1)[0]}`), className: "cms:ml-auto cms:text-muted-foreground cms:underline-offset-4 hover:cms:underline", children: t("Comments") })
    ] }),
    m.isDirty && /* @__PURE__ */ e.jsx(
      s.Button,
      {
        type: "button",
        size: "sm",
        disabled: m.processing,
        onClick: () => m.put(`${a}/settings`, { preserveScroll: !0, preserveState: m.data.blueprint === r, onSuccess: () => m.setDefaults() }),
        children: t("Save settings")
      }
    )
  ] }) });
}
function Le(a, l) {
  const n = a[l]?.depth ?? 0;
  let c = l + 1;
  for (; c < a.length && a[c].depth > n; ) c++;
  return c;
}
function de(a, l) {
  const n = l < 0 ? 0 : l + 1, c = l < 0 ? a.length : Le(a, l), i = l < 0 ? 0 : (a[l]?.depth ?? 0) + 1, r = [];
  for (let m = n; m < c; m++)
    a[m].depth === i && r.push(m);
  return r;
}
function xt(a, l, n) {
  const c = de(a, l);
  if (n.length !== c.length || [...n].sort((u, h) => u - h).some((u, h) => u !== c[h]) || c.length === 0) return a.slice();
  const i = c[0], r = Le(a, c[c.length - 1]), m = n.flatMap((u) => a.slice(u, Le(a, u)));
  return [...a.slice(0, i), ...m, ...a.slice(r)];
}
function ka(a, l, n) {
  const c = a.find((r) => r.id === l);
  if (!c) return [];
  const i = n(c);
  return a.filter((r) => n(r) === i).map((r) => r.id);
}
function wa({ collection: a, rows: l }) {
  const [n, c] = D.useState(l);
  D.useEffect(() => c(l), [l]);
  const i = (r, m) => {
    const u = r[m];
    if (!u) return;
    const h = u.parentId ?? null, d = ka(r, u.id, (f) => f.parentId ?? null);
    c(r), S.router.post(
      T("cms/entries/reorder"),
      { collection: a, ids: d, parent_id: h },
      { preserveScroll: !0, preserveState: !0, onError: () => c(l) }
    );
  };
  return /* @__PURE__ */ e.jsx(s.Card, { className: "cms:p-2", children: /* @__PURE__ */ e.jsx(s.SortableList, { items: n, getId: (r) => r.id, onReorder: (r, m, u) => i(r, u), className: "cms:gap-1", children: (r, { handle: m }) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-lg cms:border cms:border-border/70 cms:bg-card cms:p-2 cms:text-sm", children: [
    /* @__PURE__ */ e.jsx(s.SortableHandle, { ...m, label: t("Move :title", { title: r.title }) }),
    /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium", children: r.title }),
    r.parent && /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", children: t("under :parent", { parent: r.parent }) }),
    /* @__PURE__ */ e.jsx(s.Badge, { variant: r.status === "published" ? "success" : "secondary", children: Z(r.status) })
  ] }) }) });
}
function $a(a, l, n) {
  const c = { ...a, ...l }, i = Object.fromEntries(Object.entries(c.terms).filter(([, m]) => m !== "")), r = {};
  return c.search && (r.search = c.search), c.status && (r.status = c.status), c.author && (r.author = c.author), Object.keys(i).length > 0 && (r.terms = i), c.locale && c.locale !== n && (r.locale = c.locale), c.sort && (r.sort = c.sort), r.per_page = c.perPage, r;
}
function Da(a) {
  const l = new URLSearchParams();
  for (const [n, c] of Object.entries(a))
    if (typeof c == "object")
      for (const [i, r] of Object.entries(c)) l.set(`${n}[${i}]`, r);
    else
      l.set(n, String(c));
  return l.toString();
}
function _a(a, l) {
  return a === l ? `-${l}` : a === `-${l}` ? "" : l;
}
function Ta(a, l) {
  return a === l ? "asc" : a === `-${l}` ? "desc" : null;
}
function es(a) {
  return [a.search, a.status, a.author, ...Object.values(a.terms)].filter((l) => l !== "").length;
}
const ke = "__all", Ba = () => [
  { value: "draft", label: t("Drafts") },
  { value: "published", label: t("Published") },
  { value: "scheduled", label: t("Scheduled") },
  { value: "trashed", label: t("Trash") }
];
function Ma(a) {
  const { collection: l, entries: n, query: c } = a;
  return s.useBreadcrumbs([{ label: l ? l.title : t("Entries") }]), !l || !n || !c ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: t("Entries") }),
    /* @__PURE__ */ e.jsx(s.PageHeader, { title: t("Entries"), description: t("There are no collections yet. Create one under Structure → Collections, then come back to write its entries.") })
  ] }) : /* @__PURE__ */ e.jsx(za, { ...a, collection: l, entries: n, query: c });
}
function za({
  collection: a,
  collections: l,
  entries: n,
  query: c,
  columns: i = [],
  filters: r = { authors: [], taxonomies: [], locales: [] },
  links: m = [],
  manualOrder: u = !1,
  perPageOptions: h = [10, 25, 50, 100],
  preferencesKey: d,
  can: f
}) {
  const o = T(`cms/collections/${a.handle}/entries`), x = r.locales[0] ?? c.locale, [C, b] = D.useState(c.search), [v, $] = D.useState([]), [N, y] = D.useState(!1), [_, g] = X(), { setColumns: w, setPerPage: B } = s.useTablePreferences(d ?? `table.cms.entries.${a.handle}`, { columns: c.columns, perPage: c.perPage });
  D.useEffect(() => $([]), [n]);
  const p = c.status === "trashed", z = es(c) > 0, P = i.filter((j) => c.columns.includes(j.key)), F = (j = {}) => $a(c, j, x), k = (j) => S.router.get(o, F(j), { preserveState: !0, preserveScroll: !0, replace: !0 });
  D.useEffect(() => {
    if (C === c.search) return;
    const j = window.setTimeout(() => k({ search: C }), 300);
    return () => window.clearTimeout(j);
  }, [C]);
  const A = p ? f?.delete ? [{ action: "restore", label: t("Restore") }, { action: "delete", label: t("Delete for good"), danger: !0 }] : [] : [
    ...f?.publish ? [{ action: "publish", label: t("Publish") }, { action: "unpublish", label: t("Unpublish") }] : [],
    ...f?.delete ? [{ action: "trash", label: t("Move to the trash"), danger: !0 }] : []
  ], V = (j, E, R = !1) => {
    const he = () => S.router.post(`${o}/bulk`, { action: j, ids: v }, { preserveScroll: !0 });
    if (R) {
      const Ue = v.length === 1 ? t(":action: 1 entry?", { action: E }) : t(":action: :count entries?", { action: E, count: v.length });
      _(j === "delete" ? `${Ue} ${t("This can't be undone.")}` : Ue, he);
    } else
      he();
  }, le = async (j) => {
    const E = new Set(c.columns);
    E.has(j) ? E.delete(j) : E.add(j), await w(i.map((R) => R.key).filter((R) => E.has(R))), S.router.reload({ only: ["entries", "query"] });
  }, U = () => {
    b(""), k({ search: "", status: "", author: "", terms: {} });
  }, K = u && !!f?.update, ue = K && n !== null && n.lastPage <= 1 && n.data.length > 1, re = 1 + P.length + (A.length > 0 ? 1 : 0) + (K ? 1 : 0), M = Da(F()), W = [...new Set(m.map((j) => j.group))];
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: a.title }),
    g,
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: a.title,
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          m.length > 0 && /* @__PURE__ */ e.jsxs(s.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(s.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(s.Button, { variant: "outline", children: [
              /* @__PURE__ */ e.jsx(Pt, {}),
              " ",
              t("Go to")
            ] }) }),
            /* @__PURE__ */ e.jsx(s.DropdownMenuContent, { align: "end", className: "cms:min-w-56", children: W.map((j, E) => /* @__PURE__ */ e.jsxs(D.Fragment, { children: [
              E > 0 && /* @__PURE__ */ e.jsx(s.DropdownMenuSeparator, {}),
              /* @__PURE__ */ e.jsx(s.DropdownMenuLabel, { children: j }),
              m.filter((R) => R.group === j).map((R) => /* @__PURE__ */ e.jsx(s.DropdownMenuItem, { asChild: !0, children: R.external ? /* @__PURE__ */ e.jsxs("a", { href: R.href, target: "_blank", rel: "noopener noreferrer", children: [
                R.label,
                " ",
                /* @__PURE__ */ e.jsx(ce, { className: "cms:ml-auto" })
              ] }) : /* @__PURE__ */ e.jsx(S.Link, { href: R.href, children: R.label }) }, R.href))
            ] }, j)) })
          ] }),
          a.listing && !p && /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs(S.Link, { href: T(`cms/collections/${a.handle}/listing/edit`), children: [
            /* @__PURE__ */ e.jsx(Wt, {}),
            " ",
            t("Listing page")
          ] }) }),
          n.total > 0 && f?.export && /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: `${o}/export${M ? `?${M}` : ""}`, children: [
            /* @__PURE__ */ e.jsx(ws, {}),
            " ",
            t("Export CSV")
          ] }) }),
          f?.create && !p && /* @__PURE__ */ e.jsx(s.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(S.Link, { href: `${o}/create`, children: [
            /* @__PURE__ */ e.jsx(q, {}),
            " ",
            t("New entry")
          ] }) })
        ] }),
        children: l.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: a.handle, onValueChange: (j) => S.router.get(T(`cms/collections/${j}/entries`)), children: [
          /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": t("Collection"), children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(s.SelectContent, { children: l.map((j) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: j.handle, children: j.title }, j.handle)) })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-xs", children: [
        /* @__PURE__ */ e.jsx(me, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            className: "cms:pl-9",
            placeholder: t("Search titles, slugs or #id"),
            "aria-label": t("Search entries"),
            value: C,
            onChange: (j) => b(j.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(we, { label: t("Status"), value: c.status, options: Ba(), onChange: (j) => k({ status: j }) }),
      r.authors.length > 0 && /* @__PURE__ */ e.jsx(we, { label: t("Author"), value: c.author, options: r.authors, onChange: (j) => k({ author: j }) }),
      r.taxonomies.filter((j) => j.terms.length > 0).map((j) => /* @__PURE__ */ e.jsx(
        we,
        {
          label: j.title,
          value: c.terms[j.handle] ?? "",
          options: j.terms.map((E) => ({ value: E.value, label: `${"— ".repeat(E.depth)}${E.label}` })),
          onChange: (E) => k({ terms: { ...c.terms, [j.handle]: E } })
        },
        j.handle
      )),
      r.locales.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: c.locale, onValueChange: (j) => k({ locale: j }), children: [
        /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-40", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(s.SelectContent, { children: r.locales.map((j) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: j, children: [
          H(j),
          j === x ? ` ${t("(main)")}` : ""
        ] }, j)) })
      ] }),
      z && /* @__PURE__ */ e.jsxs(s.Button, { variant: "ghost", size: "sm", onClick: U, children: [
        /* @__PURE__ */ e.jsx(je, {}),
        " ",
        t("Clear")
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:ml-auto cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
        v.length > 0 && A.length > 0 && /* @__PURE__ */ e.jsxs("div", { role: "toolbar", "aria-label": t("Selected entries"), className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t(":count selected", { count: v.length }) }),
          A.map((j) => /* @__PURE__ */ e.jsx(s.Button, { size: "sm", variant: j.danger ? "destructive" : "outline", onClick: () => V(j.action, j.label, j.danger), children: j.label }, j.action))
        ] }),
        ue && /* @__PURE__ */ e.jsxs(s.Button, { variant: N ? "secondary" : "outline", "aria-pressed": N, onClick: () => y(!N), children: [
          /* @__PURE__ */ e.jsx(us, {}),
          " ",
          t(N ? "Done" : "Reorder")
        ] }),
        i.length > 0 && /* @__PURE__ */ e.jsxs(s.DropdownMenu, { children: [
          /* @__PURE__ */ e.jsx(s.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(s.Button, { variant: "outline", children: [
            /* @__PURE__ */ e.jsx(Ht, {}),
            " ",
            t("Columns")
          ] }) }),
          /* @__PURE__ */ e.jsxs(s.DropdownMenuContent, { align: "end", className: "cms:max-h-96 cms:overflow-y-auto", children: [
            /* @__PURE__ */ e.jsx(s.DropdownMenuLabel, { children: t("Columns") }),
            i.filter((j) => !j.field).map((j) => /* @__PURE__ */ e.jsx(
              s.DropdownMenuCheckboxItem,
              {
                checked: c.columns.includes(j.key),
                onSelect: (E) => E.preventDefault(),
                onCheckedChange: () => {
                  le(j.key);
                },
                children: j.label
              },
              j.key
            )),
            i.some((j) => j.field) && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(s.DropdownMenuSeparator, {}),
              /* @__PURE__ */ e.jsx(s.DropdownMenuLabel, { children: t("Fields") }),
              i.filter((j) => j.field).map((j) => /* @__PURE__ */ e.jsx(
                s.DropdownMenuCheckboxItem,
                {
                  checked: c.columns.includes(j.key),
                  onSelect: (E) => E.preventDefault(),
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
    N && ue ? /* @__PURE__ */ e.jsx(wa, { collection: a.handle, rows: n.data }) : /* @__PURE__ */ e.jsxs(s.Card, { className: "cms:gap-0 cms:overflow-hidden cms:py-0", children: [
      /* @__PURE__ */ e.jsxs(s.Table, { children: [
        /* @__PURE__ */ e.jsx(s.TableHeader, { className: "cms:bg-muted/60", children: /* @__PURE__ */ e.jsxs(s.TableRow, { className: "cms:hover:bg-transparent", children: [
          A.length > 0 && /* @__PURE__ */ e.jsx(s.TableHead, { className: "cms:w-10", children: /* @__PURE__ */ e.jsx(
            s.Checkbox,
            {
              "aria-label": t("Select all on this page"),
              checked: n.data.length > 0 && v.length === n.data.length,
              onCheckedChange: (j) => $(j ? n.data.map((E) => E.id) : [])
            }
          ) }),
          /* @__PURE__ */ e.jsx(ss, { label: t("Title"), sortKey: "title", sort: c.sort, onSort: (j) => k({ sort: j }) }),
          P.map((j) => j.sortable ? /* @__PURE__ */ e.jsx(ss, { label: j.label, sortKey: j.key, sort: c.sort, onSort: (E) => k({ sort: E }) }, j.key) : /* @__PURE__ */ e.jsx(s.TableHead, { children: j.label }, j.key)),
          K && /* @__PURE__ */ e.jsx(s.TableHead, { className: "cms:w-px", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: t("Order") }) })
        ] }) }),
        /* @__PURE__ */ e.jsxs(s.TableBody, { children: [
          n.data.length === 0 && /* @__PURE__ */ e.jsx(s.TableRow, { className: "cms:hover:bg-transparent", children: /* @__PURE__ */ e.jsx(s.TableCell, { colSpan: re, className: "cms:h-32 cms:text-center cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx(Ia, { trashed: p, filtered: es(p ? { ...c, status: "" } : c) > 0, canCreate: !!f?.create, createUrl: `${o}/create`, onClear: U }) }) }),
          n.data.map((j, E) => /* @__PURE__ */ e.jsxs(s.TableRow, { className: "sunrice-row-in", style: { "--i": E }, "data-state": v.includes(j.id) ? "selected" : void 0, children: [
            A.length > 0 && /* @__PURE__ */ e.jsx(s.TableCell, { children: /* @__PURE__ */ e.jsx(
              s.Checkbox,
              {
                "aria-label": t("Select :title", { title: j.title }),
                checked: v.includes(j.id),
                onCheckedChange: (R) => $(R ? [...v, j.id] : v.filter((he) => he !== j.id))
              }
            ) }),
            /* @__PURE__ */ e.jsxs(s.TableCell, { children: [
              /* @__PURE__ */ e.jsx(
                S.Link,
                {
                  href: T(`cms/collections/${a.handle}/entries/${j.id}/edit${c.locale !== x ? `?locale=${encodeURIComponent(c.locale)}` : ""}`),
                  className: "cms:font-medium cms:underline-offset-4 cms:hover:underline",
                  children: j.title
                }
              ),
              (!c.columns.includes("slug") || j.parent) && /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
                !c.columns.includes("slug") && `/${j.slug}`,
                j.parent ? `${c.columns.includes("slug") ? "" : " · "}${t("under :parent", { parent: j.parent })}` : ""
              ] })
            ] }),
            P.map((R) => /* @__PURE__ */ e.jsx(s.TableCell, { className: R.key === "status" ? "" : "cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx("div", { className: "cms:max-w-72 cms:truncate", children: /* @__PURE__ */ e.jsx(La, { row: j, column: R, mainLocale: x }) }) }, R.key)),
            K && /* @__PURE__ */ e.jsx(s.TableCell, { className: "cms:w-px", children: /* @__PURE__ */ e.jsxs("span", { className: "cms:flex", children: [
              /* @__PURE__ */ e.jsx(s.Button, { variant: "ghost", size: "icon", "aria-label": t("Move :title up", { title: j.title }), onClick: () => S.router.post(T(`cms/entries/${j.id}/move`), { direction: "up" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(xs, {}) }),
              /* @__PURE__ */ e.jsx(s.Button, { variant: "ghost", size: "icon", "aria-label": t("Move :title down", { title: j.title }), onClick: () => S.router.post(T(`cms/entries/${j.id}/move`), { direction: "down" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(ds, {}) })
            ] }) })
          ] }, j.id))
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4 cms:border-t cms:px-6 cms:py-3 cms:text-sm cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-4", children: [
          /* @__PURE__ */ e.jsx("span", { children: n.total === 0 ? t("No entries") : t(":from–:to of :total", { from: n.from, to: n.to, total: n.total }) }),
          /* @__PURE__ */ e.jsxs(s.Select, { value: String(c.perPage), onValueChange: (j) => {
            B(Number(j)), k({ perPage: Number(j) });
          }, children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:h-8 cms:w-auto", "aria-label": t("Entries per page"), children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(s.SelectContent, { children: h.map((j) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: String(j), children: t(":count per page", { count: j }) }, j)) })
          ] })
        ] }),
        n.lastPage > 1 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsx("span", { children: t("Page :page of :last", { page: n.currentPage, last: n.lastPage }) }),
          /* @__PURE__ */ e.jsx(
            s.Button,
            {
              variant: "outline",
              size: "icon",
              className: "cms:size-8",
              "aria-label": t("Previous page"),
              disabled: !n.prev_page_url,
              onClick: () => n.prev_page_url && S.router.get(n.prev_page_url, {}, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(Fe, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            s.Button,
            {
              variant: "outline",
              size: "icon",
              className: "cms:size-8",
              "aria-label": t("Next page"),
              disabled: !n.next_page_url,
              onClick: () => n.next_page_url && S.router.get(n.next_page_url, {}, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(fe, {})
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function we({ label: a, value: l, options: n, onChange: c }) {
  return /* @__PURE__ */ e.jsxs(s.Select, { value: l === "" ? ke : l, onValueChange: (i) => c(i === ke ? "" : i), children: [
    /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-40", "aria-label": a, children: /* @__PURE__ */ e.jsx(s.SelectValue, { placeholder: a }) }),
    /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
      /* @__PURE__ */ e.jsx(s.SelectItem, { value: ke, children: t(":filter: all", { filter: a }) }),
      n.map((i) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: i.value, children: i.label }, i.value))
    ] })
  ] });
}
function ss({ label: a, sortKey: l, sort: n, onSort: c }) {
  const i = Ta(n, l);
  return /* @__PURE__ */ e.jsx(s.TableHead, { "aria-sort": i === "asc" ? "ascending" : i === "desc" ? "descending" : void 0, children: /* @__PURE__ */ e.jsxs(
    "button",
    {
      type: "button",
      onClick: () => c(_a(n, l)),
      className: "cms:-ml-2 cms:inline-flex cms:h-8 cms:items-center cms:gap-1 cms:rounded-md cms:px-2 cms:hover:bg-accent cms:hover:text-accent-foreground",
      children: [
        a,
        i === "asc" ? /* @__PURE__ */ e.jsx(xs, { className: "cms:size-3" }) : i === "desc" ? /* @__PURE__ */ e.jsx(ds, { className: "cms:size-3" }) : /* @__PURE__ */ e.jsx(us, { className: "cms:size-3 cms:opacity-40" })
      ]
    }
  ) });
}
function La({ row: a, column: l, mainLocale: n }) {
  switch (l.key) {
    case "slug":
      return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        "/",
        a.slug
      ] });
    case "status":
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(s.Badge, { variant: a.status === "published" ? "success" : "secondary", children: Z(a.status) }),
        a.locales.length > 1 && a.locales.filter((c) => !c.main).map((c) => /* @__PURE__ */ e.jsxs(
          s.Badge,
          {
            variant: c.status === "published" ? "secondary" : "outline",
            className: c.status === null ? "cms:opacity-50" : c.outdated ? "cms:ring-2 cms:ring-amber-500/60" : "",
            title: c.outdated ? t(":language: :status, outdated: the main language changed since", { language: H(c.code), status: c.status === null ? t("not translated") : Z(c.status) }) : t(":language: :status", { language: H(c.code), status: c.status === null ? t("not translated") : Z(c.status) }),
            children: [
              c.code.toUpperCase(),
              c.outdated && /* @__PURE__ */ e.jsx("span", { "aria-hidden": "true", children: "·!" })
            ]
          },
          c.code
        ))
      ] });
    case "author":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: a.author ?? "—" });
    case "published_at":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: J(a.publishedAt) });
    case "updated_at":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: J(a.updatedAt) });
    case "created_at":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: J(a.createdAt) });
    default:
      return /* @__PURE__ */ e.jsx("span", { title: a.cells[l.key] ?? void 0, children: a.cells[l.key] ?? "—" });
  }
}
function Ia({ trashed: a, filtered: l, canCreate: n, createUrl: c, onClear: i }) {
  return l ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: t("Nothing matches these filters.") }),
    /* @__PURE__ */ e.jsxs(s.Button, { variant: "outline", size: "sm", onClick: i, children: [
      /* @__PURE__ */ e.jsx(je, {}),
      " ",
      t("Clear filters")
    ] })
  ] }) : a ? /* @__PURE__ */ e.jsx(e.Fragment, { children: t("The trash is empty.") }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: t("No entries yet.") }),
    n && /* @__PURE__ */ e.jsx(s.Button, { size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs(S.Link, { href: c, children: [
      /* @__PURE__ */ e.jsx(q, {}),
      " ",
      t("Write the first one")
    ] }) })
  ] });
}
function Re({ message: a, processing: l, onSaveMine: n }) {
  const [c, i] = X();
  return a ? /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: [
    i,
    /* @__PURE__ */ e.jsx("span", { children: a }),
    /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", size: "sm", onClick: () => S.router.reload(), children: t("Load theirs") }),
      /* @__PURE__ */ e.jsx(
        s.Button,
        {
          type: "button",
          variant: "destructive",
          size: "sm",
          disabled: l,
          onClick: () => c(t("Save your version over theirs? Their changes are replaced."), n),
          children: t("Save mine anyway")
        }
      )
    ] })
  ] }) : null;
}
function Aa(a) {
  return /* @__PURE__ */ e.jsx(Fa, { ...a }, `${a.locale}:${a.version}:${JSON.stringify([a.values, a.seo])}`);
}
function Fa({ collection: a, fields: l, locale: n, locales: c, shared: i, values: r, seo: m, version: u, can: h }) {
  const d = T(`cms/collections/${a.handle}/listing`), f = T(`cms/collections/${a.handle}/entries`);
  s.useBreadcrumbs([{ label: a.title, href: f }, { label: t("Listing page") }]);
  const o = S.useForm({ locale: n, data: r, seo: m ?? {}, version: u }), x = o.errors, C = c[0], b = h.update, v = () => o.processing || o.put(d, { preserveScroll: !0 }), $ = () => {
    o.transform((N) => ({ ...N, version: null })), o.put(d, { preserveScroll: !0 });
  };
  return s.useUnsavedChanges(o.isDirty, b ? v : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: (N) => {
    N.preventDefault(), v();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: t(":title: listing page", { title: a.title }) }),
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: t(":title: listing page", { title: a.title }),
        back: { href: f, label: t("Back to :title", { title: a.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          c.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: n, onValueChange: (N) => S.router.get(d, { locale: N }), children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(s.SelectContent, { children: c.map((N, y) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: N, children: [
              H(N),
              y === 0 ? ` ${t("(main)")}` : ""
            ] }, N)) })
          ] }),
          a.url && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: a.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(ce, {}),
            " ",
            t("View")
          ] }) }),
          b && /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: o.processing, children: [
            o.processing && /* @__PURE__ */ e.jsx(te, { className: "cms:animate-spin" }),
            " ",
            t("Save")
          ] })
        ] }),
        children: o.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
      }
    ),
    /* @__PURE__ */ e.jsxs("fieldset", { disabled: !b, className: "cms:flex cms:flex-col cms:gap-6", children: [
      /* @__PURE__ */ e.jsx(Re, { message: x.version, processing: o.processing, onSaveMine: $ }),
      l.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("The listing page has no fields of its own: choose a listing blueprint for the collection under Structure → Collections.") }) : /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsx(s.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: l.filter((N) => He(N, { ...r, ...o.data.data })).map((N) => i.includes(N.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(se, { id: `data-${N.handle}`, field: N, content: !0, value: r[N.handle], errors: {}, onChange: () => {
        } }),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: C ? t("Shared by all languages: edit it in :language.", { language: H(C) }) : t("Shared by all languages: edit it in the main language.") })
      ] }, N.handle) : /* @__PURE__ */ e.jsx(
        se,
        {
          id: `data-${N.handle}`,
          field: N,
          content: !0,
          value: o.data.data[N.handle],
          errors: G(x, `data.${N.handle}`),
          onChange: (y) => o.setData("data", { ...o.data.data, [N.handle]: y })
        },
        N.handle
      )) }) })
    ] }),
    /* @__PURE__ */ e.jsx(s.CollapsibleCard, { title: t("SEO"), description: t("How the listing page appears in search results and shared links."), titleClassName: "cms:text-base", storageKey: "cms:listing:seo", hasErrors: ne(x, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !b, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(ae, { bare: !0, id: "seo", fields: Ve(), value: o.data.seo, errors: G(x, "seo"), onChange: (N) => o.setData("seo", N) }) }) })
  ] });
}
function Ea({ fieldsets: a }) {
  const l = S.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(I, { message: l.fieldset }),
    /* @__PURE__ */ e.jsx(
      ut,
      {
        kind: "fieldset",
        base: T("cms/fieldsets"),
        rows: a,
        intro: t("Fields shared between blueprints, and the kinds of block of flexible fields.")
      }
    )
  ] });
}
function Ha(a) {
  return /* @__PURE__ */ e.jsx(Pa, { ...a }, `${a.locale}:${a.version}:${JSON.stringify(a.values)}`);
}
function Pa({ set: a, fields: l, locale: n, locales: c, shared: i, values: r, version: m, can: u, settings: h }) {
  const d = T(`cms/globals/${a.handle}/values`);
  s.useBreadcrumbs([{ label: t("Globals"), href: T("cms/globals") }, { label: a.title }]);
  const f = S.useForm({ locale: n, data: r, version: m }), o = f.errors, x = c[0], C = s.useEditLock({
    type: "cms.global",
    id: a.id,
    locale: n,
    enabled: u.update,
    noun: t("global set"),
    leaveTo: T("cms/globals"),
    getUnsaved: () => f.isDirty ? { data: f.data.data } : null
  }), b = u.update && !C.readOnly, v = () => f.processing || f.put(d, { preserveScroll: !0 }), $ = () => {
    f.transform((y) => ({ ...y, version: null })), f.put(d, { preserveScroll: !0 });
  }, N = async (y) => {
    const _ = await C.loadKept(y);
    _.data && typeof _.data == "object" && f.setData("data", _.data);
  };
  return s.useUnsavedChanges(f.isDirty && !C.takenOver, b ? v : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: (y) => {
    y.preventDefault(), v();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: a.title }),
    C.dialogs,
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: a.title,
        back: { href: T("cms/globals"), label: t("Back to globals") },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          h && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(S.Link, { href: h, children: [
            /* @__PURE__ */ e.jsx(Ee, {}),
            " ",
            t("Settings")
          ] }) }),
          c.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: n, onValueChange: (y) => S.router.get(d, { locale: y }), children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(s.SelectContent, { children: c.map((y, _) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: y, children: [
              H(y),
              _ === 0 ? ` ${t("(main)")}` : ""
            ] }, y)) })
          ] }),
          b && /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: f.processing, children: [
            f.processing && /* @__PURE__ */ e.jsx(te, { className: "cms:animate-spin" }),
            " ",
            t("Save")
          ] })
        ] }),
        children: f.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
      }
    ),
    l.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("This global set has no fields: choose a blueprint for it under Structure → Global sets.") }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(s.ViewingNotice, { by: C.viewingBy }),
      /* @__PURE__ */ e.jsx(Re, { message: o.version, processing: f.processing, onSaveMine: $ }),
      /* @__PURE__ */ e.jsx(s.KeptEditsNotice, { kept: C.kept, disabled: !b, onLoad: (y) => {
        N(y);
      }, onDiscard: (y) => {
        C.discardKept(y);
      } }),
      /* @__PURE__ */ e.jsx(
        Pe,
        {
          disabled: !b,
          fields: l,
          values: f.data.data,
          errors: o,
          storageKey: `cms:global:${a.handle}`,
          shared: i,
          sharedValues: r,
          sharedNote: x ? t("Shared by all languages: edit it in :language.", { language: H(x) }) : t("Shared by all languages: edit it in the main language."),
          onChange: (y, _) => f.setData("data", { ...f.data.data, [y]: _ })
        }
      )
    ] })
  ] });
}
let pt = 0;
function gt(a, l = 0) {
  return a.flatMap(({ children: n, ...c }) => [{ ...c, key: `m${++pt}`, depth: l }, ...gt(n ?? [], l + 1)]);
}
function Va(a) {
  const l = [], n = [{ depth: -1, children: l }];
  for (const { key: c, depth: i, ...r } of a) {
    for (; n.length > 1 && n[n.length - 1].depth >= i; ) n.pop();
    const m = { ...r, children: [] };
    n[n.length - 1].children.push(m), n.push({ depth: i, children: m.children });
  }
  return l;
}
function Oe(a, l) {
  const n = a[l]?.depth ?? 0;
  let c = l + 1;
  for (; c < a.length && a[c].depth > n; ) c++;
  return c;
}
function ft(a, l, n) {
  const c = Oe(a, l);
  return a.map((i, r) => r >= l && r < c ? { ...i, depth: i.depth + n } : i);
}
function Ra(a, l, n) {
  const c = a[l], i = a[l - 1];
  return !c || !i || c.depth > i.depth || Math.max(...a.slice(l, Oe(a, l)).map((m) => m.depth)) + 1 > n - 1 ? a : ft(a, l, 1);
}
function Oa(a, l) {
  return (a[l]?.depth ?? 0) === 0 ? a : ft(a, l, -1);
}
function Ua(a, l) {
  return [...a.slice(0, l), ...a.slice(Oe(a, l))];
}
function xe(a) {
  return { key: `m${++pt}`, depth: 0, entry_id: null, term_id: null, collection_id: null, target: null, url: null, labels: {}, new_tab: !1, ...a };
}
function Ka({ menu: a, items: l, locales: n, limits: c, terms: i, listings: r, can: m, settings: u }) {
  const h = T(`cms/menus/${a.handle}/links`);
  s.useBreadcrumbs([{ label: t("Menus"), href: T("cms/menus") }, { label: a.title }]);
  const [d, f] = D.useState(() => gt(l)), [o, x] = D.useState(null), C = S.useForm({ items: l }), b = C.errors, [v, $] = D.useState(!1), N = n[0] ?? "en", y = (p) => {
    f(p), $(!0);
  }, _ = (p, z) => y(d.map((P, F) => F === p ? { ...P, ...z } : P)), g = () => {
    C.processing || (C.transform(() => ({ items: Va(d).map(jt) })), C.put(h, { preserveScroll: !0, onSuccess: () => $(!1) }));
  }, w = (p) => {
    p.preventDefault(), g();
  };
  s.useUnsavedChanges(v, m.update ? g : void 0);
  const B = (p) => /* @__PURE__ */ e.jsx(
    s.SortableList,
    {
      items: de(d, p),
      getId: (z) => d[z].key,
      disabled: !m.update,
      onReorder: (z) => y(xt(d, p, z)),
      className: p < 0 ? "cms:gap-1" : "cms:mt-1 cms:gap-1 cms:pl-6",
      children: (z, { handle: P, isOverlay: F }) => {
        const k = d[z];
        return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${F ? "" : "cms:border-border/70"}`, children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2 cms:p-2", children: [
            m.update && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:h-10 cms:shrink-0 cms:items-center", children: /* @__PURE__ */ e.jsx(s.SortableHandle, { ...P, label: t("Move :title", { title: k.labels[N] || k.target?.title || k.url || t("link") }) }) }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
                /* @__PURE__ */ e.jsx(
                  s.Input,
                  {
                    "aria-label": t("Label (:language)", { language: H(N) }),
                    className: "cms:w-full cms:sm:max-w-xs",
                    disabled: !m.update,
                    placeholder: k.target?.title ?? t("Label"),
                    value: k.labels[N] ?? "",
                    onChange: (A) => _(z, { labels: { ...k.labels, [N]: A.target.value } })
                  }
                ),
                /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-32 cms:flex-1 cms:truncate cms:text-sm cms:text-muted-foreground", children: k.url !== null ? k.url : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  k.target ? `${k.target.kind}: ${k.target.title}` : t("Gone"),
                  " ",
                  (!k.target || !k.target.live) && /* @__PURE__ */ e.jsx(s.Badge, { variant: "outline", children: t("Not on the site") })
                ] }) }),
                m.update && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center", children: [
                  /* @__PURE__ */ e.jsxs("label", { className: "cms:mr-2 cms:flex cms:items-center cms:gap-1.5 cms:text-sm", children: [
                    /* @__PURE__ */ e.jsx(s.Checkbox, { checked: k.new_tab, onCheckedChange: (A) => _(z, { new_tab: A }) }),
                    " ",
                    t("New tab")
                  ] }),
                  /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": t("Out a level"), disabled: k.depth === 0, onClick: () => y(Oa(d, z)), children: /* @__PURE__ */ e.jsx(Jt, {}) }),
                  /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": t("In a level"), onClick: () => y(Ra(d, z, c.depth)), children: /* @__PURE__ */ e.jsx(Yt, {}) }),
                  /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": t("Remove, with what's under it"), onClick: () => y(Ua(d, z)), children: /* @__PURE__ */ e.jsx(O, {}) })
                ] })
              ] }),
              n.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: n.slice(1).map((A) => /* @__PURE__ */ e.jsx(
                s.Input,
                {
                  "aria-label": t("Label (:language)", { language: H(A) }),
                  className: "cms:w-full cms:sm:max-w-xs",
                  disabled: !m.update,
                  placeholder: t(":language: as :main", { language: H(A), main: H(N) }),
                  value: k.labels[A] ?? "",
                  onChange: (V) => _(z, { labels: { ...k.labels, [A]: V.target.value } })
                },
                A
              )) })
            ] })
          ] }),
          !F && de(d, z).length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:px-2 cms:pb-2", children: B(z) })
        ] });
      }
    }
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: w, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: a.title }),
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: a.title,
        back: { href: T("cms/menus"), label: t("Back to menus") },
        actions: m.update && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          u && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(S.Link, { href: u, children: [
            /* @__PURE__ */ e.jsx(Ee, {}),
            " ",
            t("Settings")
          ] }) }),
          /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", disabled: d.length >= c.items, onClick: () => x("entry"), children: [
            /* @__PURE__ */ e.jsx(q, {}),
            " ",
            t("Entry")
          ] }),
          i.length > 0 && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", disabled: d.length >= c.items, onClick: () => x("term"), children: [
            /* @__PURE__ */ e.jsx(Xt, {}),
            " ",
            t("Term")
          ] }),
          r.length > 0 && /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", disabled: d.length >= c.items, onClick: () => x("listing"), children: [
            /* @__PURE__ */ e.jsx(Qt, {}),
            " ",
            t("Listing")
          ] }),
          /* @__PURE__ */ e.jsxs(s.Button, { type: "button", variant: "outline", disabled: d.length >= c.items, onClick: () => x("url"), children: [
            /* @__PURE__ */ e.jsx(Gt, {}),
            " ",
            t("Link")
          ] }),
          /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: C.processing, children: [
            C.processing && /* @__PURE__ */ e.jsx(te, { className: "cms:animate-spin" }),
            " ",
            t("Save")
          ] })
        ] }),
        children: v && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
      }
    ),
    /* @__PURE__ */ e.jsx(I, { message: b.items }),
    Object.keys(b).some((p) => p.startsWith("items.")) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: t("Some links need fixing: :error", { error: Object.values(b).filter(Boolean)[0] }) }),
    /* @__PURE__ */ e.jsx(s.Card, { className: "cms:p-2", children: d.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:p-4 cms:text-center cms:text-muted-foreground", children: t("No links yet. Add an entry or a link.") }) : B(-1) }),
    /* @__PURE__ */ e.jsx(Ga, { kind: o, terms: i, listings: r, onClose: () => x(null), onAdd: (p) => {
      y([...d, p]), x(null);
    }, main: N })
  ] });
}
function jt({ target: a, children: l, ...n }) {
  return { ...n, children: l.map(jt) };
}
const qa = () => ({ entry: t("Link to an entry"), term: t("Link to a term's page"), listing: t("Link to a listing page"), url: t("Link to an address") }), Wa = () => ({
  entry: t("It follows the entry: its title (unless you give a label) and its address in each language. It shows only while the entry is on the site."),
  term: t("The page listing the term's entries, in each language. Its title is the label unless you give one."),
  listing: t("The collection's listing page, in each language. The collection's title is the label unless you give one."),
  url: t("A web address, a path on this site (/contact), mailto: or tel:.")
});
function Ga({ kind: a, terms: l, listings: n, onClose: c, onAdd: i, main: r }) {
  const [m, u] = D.useState(null), [h, d] = D.useState(""), [f, o] = D.useState(""), [x, C] = D.useState("");
  D.useEffect(() => {
    u(null), d(""), o(""), C("");
  }, [a]);
  const b = f.trim() === "" || St(f.trim()), v = x.trim() ? { [r]: x.trim() } : {}, $ = async () => {
    if (a === "entry" && m !== null) {
      const y = await fetch(`${T("cms/entries/picker")}?${Ae({ ids: [m], collections: [] })}`, { headers: { Accept: "application/json" }, credentials: "same-origin" }), _ = y.ok ? (await y.json()).items[0] : void 0;
      i(xe({ entry_id: m, target: _ ? { title: _.title, kind: _.collection, live: _.status === "published" } : null, labels: v }));
    } else if (a === "term" && h !== "") {
      const y = l.find((_) => String(_.id) === h);
      i(xe({ term_id: Number(h), target: y ? { title: y.title, kind: y.taxonomy, live: !0 } : null, labels: v }));
    } else if (a === "listing" && h !== "") {
      const y = n.find((_) => String(_.id) === h);
      i(xe({ collection_id: Number(h), target: y ? { title: y.title, kind: t("Listing page"), live: !0 } : null, labels: v }));
    } else a === "url" && f.trim() !== "" && b && x.trim() !== "" && i(xe({ url: f.trim(), labels: v }));
  }, N = a === "entry" ? m !== null : a === "url" ? f.trim() !== "" && b && x.trim() !== "" : h !== "";
  return /* @__PURE__ */ e.jsx(s.Dialog, { open: a !== null, onOpenChange: (y) => !y && c(), children: /* @__PURE__ */ e.jsxs(s.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(s.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(s.DialogTitle, { children: a ? qa()[a] : "" }),
      /* @__PURE__ */ e.jsx(s.DialogDescription, { children: a ? Wa()[a] : "" })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
      a === "entry" && /* @__PURE__ */ e.jsx(
        be,
        {
          id: "menu-entry",
          value: m,
          multiple: !1,
          max: null,
          collections: [],
          invalid: !1,
          onChange: (y) => u(typeof y == "number" ? y : null)
        }
      ),
      (a === "term" || a === "listing") && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "menu-target", children: t(a === "term" ? "Term" : "Collection") }),
        /* @__PURE__ */ e.jsxs(s.Select, { value: h, onValueChange: d, children: [
          /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: "menu-target", children: /* @__PURE__ */ e.jsx(s.SelectValue, { placeholder: t("Choose…") }) }),
          /* @__PURE__ */ e.jsx(s.SelectContent, { children: a === "term" ? l.map((y) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: String(y.id), children: [
            y.taxonomy,
            ": ",
            y.title
          ] }, y.id)) : n.map((y) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: String(y.id), children: y.title }, y.id)) })
        ] })
      ] }),
      a === "url" && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "menu-url", children: t("Address") }),
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            id: "menu-url",
            value: f,
            placeholder: t("https://… or /contact"),
            "aria-invalid": !b,
            onChange: (y) => o(y.target.value)
          }
        ),
        !b && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t("This address could run code; use https://, a path, mailto: or tel:.") })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "menu-label", children: t(a === "url" ? "Label" : "Label (optional)") }),
        /* @__PURE__ */ e.jsx(s.Input, { id: "menu-label", value: x, onChange: (y) => C(y.target.value) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(s.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", onClick: c, children: t("Cancel") }),
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", onClick: () => {
        $();
      }, disabled: !N, children: t("Add") })
    ] })
  ] }) });
}
const Ja = () => [
  { value: "all", label: t("All") },
  { value: "pending", label: t("Pending") },
  { value: "approved", label: t("Approved") },
  { value: "spam", label: t("Spam") },
  { value: "trashed", label: t("Trash") }
], Ya = (a) => ({ pending: t("Pending"), approved: t("Approved"), spam: t("Spam") })[a];
function Qa({ tab: a, counts: l, filters: n, collections: c, comments: i, can: r, errors: m = {} }) {
  s.useBreadcrumbs([{ label: t("Comments"), href: T("cms/comments") }]);
  const [u, h] = D.useState(n.search), [d, f] = D.useState([]), [o, x] = D.useState(null), [C, b] = X(), v = (g) => {
    const w = { status: a, search: n.search, collection: n.collection, ...g };
    S.router.get(T("cms/comments"), {
      ...w.status !== "all" ? { status: w.status } : {},
      ...w.search ? { search: w.search } : {},
      ...w.collection ? { collection: w.collection } : {},
      ...n.entry ? { entry: n.entry } : {}
    }, { preserveState: !0, replace: !0, onSuccess: () => f([]) });
  };
  D.useEffect(() => {
    if (u === n.search) return;
    const g = window.setTimeout(() => v({ search: u }), 300);
    return () => window.clearTimeout(g);
  }, [u]);
  const $ = (g, w = {}) => S.router.post(T(g), w, { preserveScroll: !0, onSuccess: () => f([]) }), N = (g, w) => $(`cms/comments/${g.id}/status`, { status: w }), y = (g) => {
    const w = () => $("cms/comments/bulk", { action: g, ids: d });
    g === "delete" ? C(d.length === 1 ? t("Delete 1 comment for good? This can't be undone.") : t("Delete :count comments for good? This can't be undone.", { count: d.length }), w) : w();
  }, _ = i.data.length > 0 && d.length === i.data.length;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: t("Comments") }),
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: t("Comments"),
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:sm:w-64", children: [
            /* @__PURE__ */ e.jsx(me, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
            /* @__PURE__ */ e.jsx(
              s.Input,
              {
                type: "search",
                placeholder: t("Search text, name or email"),
                "aria-label": t("Search comments"),
                className: "cms:pl-9",
                value: u,
                onChange: (g) => h(g.target.value)
              }
            )
          ] }),
          c.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: n.collection ?? "all", onValueChange: (g) => v({ collection: g === "all" ? null : g }), children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": t("Collection"), children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(s.SelectItem, { value: "all", children: t("Every collection") }),
              c.map((g) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: g.handle, children: g.title }, g.handle))
            ] })
          ] })
        ] })
      }
    ),
    n.entry !== null && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      t("Comments on one entry."),
      " ",
      /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:underline cms:underline-offset-4", onClick: () => S.router.get(T("cms/comments")), children: t("Show all") })
    ] }),
    /* @__PURE__ */ e.jsx(s.Tabs, { value: a, onValueChange: (g) => v({ status: g }), children: /* @__PURE__ */ e.jsx(s.TabsList, { className: "cms:h-auto cms:flex-wrap cms:justify-start", children: Ja().map((g) => /* @__PURE__ */ e.jsxs(s.TabsTrigger, { value: g.value, children: [
      g.label,
      " ",
      /* @__PURE__ */ e.jsx("span", { className: "cms:ml-1 cms:text-muted-foreground", children: l[g.value] })
    ] }, g.value)) }) }),
    d.length > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2 cms:text-sm", role: "toolbar", "aria-label": t("With the selected comments"), children: [
      /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", children: t(":count selected", { count: d.length }) }),
      r.moderate && a !== "trashed" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "outline", onClick: () => y("approve"), children: [
          /* @__PURE__ */ e.jsx(pe, {}),
          " ",
          t("Approve")
        ] }),
        /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "outline", onClick: () => y("unapprove"), children: [
          /* @__PURE__ */ e.jsx(Me, {}),
          " ",
          t("Unapprove")
        ] }),
        /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "outline", onClick: () => y("spam"), children: [
          /* @__PURE__ */ e.jsx(Be, {}),
          " ",
          t("Spam")
        ] })
      ] }),
      r.delete && a !== "trashed" && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "outline", onClick: () => y("trash"), children: [
        /* @__PURE__ */ e.jsx(O, {}),
        " ",
        t("Trash")
      ] }),
      r.delete && a === "trashed" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "outline", onClick: () => y("restore"), children: [
          /* @__PURE__ */ e.jsx(ge, {}),
          " ",
          t("Restore")
        ] }),
        /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "destructive", onClick: () => y("delete"), children: [
          /* @__PURE__ */ e.jsx(O, {}),
          " ",
          t("Delete for good")
        ] })
      ] })
    ] }),
    i.data.length === 0 ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:rounded-xl cms:border cms:border-dashed cms:px-6 cms:py-16 cms:text-center", children: [
      /* @__PURE__ */ e.jsx("span", { className: "cms:grid cms:size-10 cms:place-items-center cms:rounded-full cms:bg-muted cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx(Zt, { className: "cms:size-4" }) }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: n.search ? t("No comments match.") : t("No comments here.") })
    ] }) : /* @__PURE__ */ e.jsxs(s.Card, { className: "cms:divide-y cms:p-0", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3 cms:px-4 cms:py-2 cms:text-sm cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsx(s.Checkbox, { checked: _, "aria-label": t("Select all"), onCheckedChange: (g) => f(g ? i.data.map((w) => w.id) : []) }),
        /* @__PURE__ */ e.jsx("span", { children: t(":from–:to of :total", { from: i.from, to: i.to, total: i.total }) })
      ] }),
      i.data.map((g) => /* @__PURE__ */ e.jsxs("article", { className: "cms:flex cms:gap-3 cms:px-4 cms:py-4", "aria-labelledby": `comment-${g.id}-author`, children: [
        /* @__PURE__ */ e.jsx(
          s.Checkbox,
          {
            checked: d.includes(g.id),
            "aria-label": t("Select :author's comment", { author: g.author }),
            onCheckedChange: (w) => f(w ? [...d, g.id] : d.filter((B) => B !== g.id))
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-x-3 cms:gap-y-1 cms:text-sm", children: [
            /* @__PURE__ */ e.jsx("span", { id: `comment-${g.id}-author`, className: "cms:font-medium", children: g.author }),
            g.email && /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", children: g.email }),
            g.member && /* @__PURE__ */ e.jsx(s.Badge, { variant: "outline", children: t("Signed in") }),
            !g.trashed && /* @__PURE__ */ e.jsx(s.Badge, { variant: g.status === "approved" ? "success" : g.status === "spam" ? "destructive" : "warning", children: Ya(g.status) }),
            /* @__PURE__ */ e.jsxs("span", { className: "cms:text-muted-foreground", children: [
              g.createdAt ? J(g.createdAt) : "",
              " · ",
              g.locale.toUpperCase()
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
            t("On"),
            " ",
            g.entry.url ? /* @__PURE__ */ e.jsxs("a", { href: g.entry.url, target: "_blank", rel: "noreferrer", className: "cms:underline-offset-4 hover:cms:underline", children: [
              g.entry.title,
              " ",
              /* @__PURE__ */ e.jsx(ce, { className: "cms:inline cms:size-3" })
            ] }) : g.entry.title,
            g.parent && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              " · ",
              t("replying to :author: “:excerpt”", { author: g.parent.author, excerpt: g.parent.excerpt })
            ] })
          ] }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:whitespace-pre-wrap cms:break-words", children: g.body }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-1", children: [
            r.moderate && !g.trashed && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              g.status !== "approved" && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => N(g, "approved"), children: [
                /* @__PURE__ */ e.jsx(pe, {}),
                " ",
                t("Approve")
              ] }),
              g.status === "approved" && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => N(g, "pending"), children: [
                /* @__PURE__ */ e.jsx(Me, {}),
                " ",
                t("Unapprove")
              ] }),
              g.status !== "spam" && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => N(g, "spam"), children: [
                /* @__PURE__ */ e.jsx(Be, {}),
                " ",
                t("Spam")
              ] }),
              g.status !== "spam" && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => x({ row: g, mode: "reply" }), children: [
                /* @__PURE__ */ e.jsx(Rs, {}),
                " ",
                t("Reply")
              ] }),
              /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => x({ row: g, mode: "edit" }), children: [
                /* @__PURE__ */ e.jsx(Ks, {}),
                " ",
                t("Edit")
              ] })
            ] }),
            r.delete && !g.trashed && /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => S.router.delete(T(`cms/comments/${g.id}`), { preserveScroll: !0 }), children: [
              /* @__PURE__ */ e.jsx(O, {}),
              " ",
              t("Trash")
            ] }),
            r.delete && g.trashed && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => $(`cms/comments/${g.id}/restore`), children: [
                /* @__PURE__ */ e.jsx(ge, {}),
                " ",
                t("Restore")
              ] }),
              /* @__PURE__ */ e.jsxs(s.Button, { size: "sm", variant: "ghost", onClick: () => C(
                t("Delete this comment for good? Replies to it stay."),
                () => S.router.delete(T(`cms/comments/${g.id}/force`), { preserveScroll: !0 })
              ), children: [
                /* @__PURE__ */ e.jsx(O, {}),
                " ",
                t("Delete for good")
              ] })
            ] })
          ] })
        ] })
      ] }, g.id))
    ] }),
    (i.prev_page_url || i.next_page_url) && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:justify-end cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(s.Button, { variant: "outline", size: "sm", disabled: !i.prev_page_url, onClick: () => i.prev_page_url && S.router.get(i.prev_page_url), children: [
        /* @__PURE__ */ e.jsx(Fe, {}),
        " ",
        t("Newer")
      ] }),
      /* @__PURE__ */ e.jsxs(s.Button, { variant: "outline", size: "sm", disabled: !i.next_page_url, onClick: () => i.next_page_url && S.router.get(i.next_page_url), children: [
        t("Older"),
        " ",
        /* @__PURE__ */ e.jsx(fe, {})
      ] })
    ] }),
    o && /* @__PURE__ */ e.jsx(Za, { row: o.row, mode: o.mode, error: m.body, onClose: () => x(null) }, `${o.mode}-${o.row.id}`),
    b
  ] });
}
function Za({ row: a, mode: l, error: n, onClose: c }) {
  const [i, r] = D.useState(l === "edit" ? a.body : ""), [m, u] = D.useState(!1), h = () => {
    u(!0);
    const d = { preserveScroll: !0, onSuccess: c, onFinish: () => u(!1) };
    l === "reply" ? S.router.post(T(`cms/comments/${a.id}/reply`), { body: i }, d) : S.router.put(T(`cms/comments/${a.id}`), { body: i }, d);
  };
  return /* @__PURE__ */ e.jsx(s.Dialog, { open: !0, onOpenChange: (d) => !d && c(), children: /* @__PURE__ */ e.jsxs(s.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(s.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(s.DialogTitle, { children: l === "reply" ? t("Reply to :author", { author: a.author }) : t("Edit :author's comment", { author: a.author }) }),
      /* @__PURE__ */ e.jsx(s.DialogDescription, { children: l === "reply" ? a.status === "pending" ? t("Your reply is published at once, and approves this comment.") : t("Your reply is published at once, under your name.") : t("Fix a typo or remove a link.") })
    ] }),
    l === "reply" && /* @__PURE__ */ e.jsx("p", { className: "cms:max-h-32 cms:overflow-auto cms:whitespace-pre-wrap cms:text-sm cms:text-muted-foreground", children: a.body }),
    /* @__PURE__ */ e.jsx(
      s.Textarea,
      {
        "aria-label": t(l === "reply" ? "Your reply" : "Comment"),
        rows: 5,
        value: i,
        "aria-invalid": n !== void 0,
        onChange: (d) => r(d.target.value)
      }
    ),
    /* @__PURE__ */ e.jsx(I, { message: n }),
    /* @__PURE__ */ e.jsxs(s.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "outline", onClick: c, children: t("Cancel") }),
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", disabled: i.trim() === "" || m, onClick: h, children: t(l === "reply" ? "Post reply" : "Save") })
    ] })
  ] }) });
}
const Xa = () => [
  { role: "title", label: t("Meta title"), automatic: t("Automatic (the title)") },
  { role: "description", label: t("Meta description"), automatic: t("Automatic (nothing)") },
  { role: "image", label: t("Share image"), automatic: t("Automatic (nothing)") }
], $e = "__auto";
function el({ site: a, siteName: l, collections: n, taxonomies: c }) {
  s.useBreadcrumbs([{ label: t("Settings"), href: T("settings") }, { label: t("SEO") }]);
  const i = [...n ?? [], ...c ?? []], r = S.useForm({
    site: { ...a },
    mappings: i.map((o) => ({ kind: o.kind, id: o.id, title: o.chosen.title ?? "", description: o.chosen.description ?? "", image: o.chosen.image ?? "" }))
  }), m = r.errors, u = () => r.put(T("cms/seo"), { preserveScroll: !0, onSuccess: () => r.setDefaults() });
  s.useUnsavedChanges(r.isDirty, u);
  const h = (o, x) => r.setData("site", { ...r.data.site, [o]: x }), d = (o, x, C) => r.setData("mappings", r.data.mappings.map((b, v) => v === o ? { ...b, [x]: C } : b)), f = (o, x, C, b, v) => /* @__PURE__ */ e.jsxs(s.CollapsibleCard, { title: x, description: C, titleClassName: "cms:text-base", storageKey: `cms:seo:${o}`, contentClassName: "cms:flex cms:flex-col cms:divide-y cms:divide-border/60", children: [
    b.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("None yet.") }),
    b.map(($, N) => {
      const y = v + N;
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3 cms:py-4 cms:first:pt-0 cms:last:pb-0", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:justify-between cms:gap-3", children: [
          /* @__PURE__ */ e.jsx("h3", { className: "cms:font-medium", children: $.title }),
          /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: $.blueprint ? t("Blueprint: :name", { name: $.blueprint }) : t("No blueprint") })
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-3 cms:sm:grid-cols-3", children: Xa().map(({ role: _, label: g, automatic: w }) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-1.5", children: [
          /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `seo-${y}-${_}`, className: "cms:text-xs", children: g }),
          /* @__PURE__ */ e.jsxs(s.Select, { value: r.data.mappings[y]?.[_] || $e, onValueChange: (B) => d(y, _, B === $e ? "" : B), children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: `seo-${y}-${_}`, className: "cms:w-full", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(s.SelectItem, { value: $e, children: w }),
              $.options[_].map((B) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: B.value, children: B.label }, B.value))
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(I, { message: m[`mappings.${y}.${_}`] })
        ] }, _)) })
      ] }, `${$.kind}-${$.id}`);
    })
  ] });
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (o) => {
    o.preventDefault(), u();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: t("SEO") }),
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: t("SEO"),
        description: t("What search engines and shared links see of the site."),
        actions: /* @__PURE__ */ e.jsx(s.Button, { type: "submit", disabled: r.processing, children: t("Save SEO settings") })
      }
    ),
    /* @__PURE__ */ e.jsxs(s.CollapsibleCard, { title: t("Search engines and sharing"), titleClassName: "cms:text-base", storageKey: "cms:seo:site", contentClassName: "cms:flex cms:flex-col cms:gap-5", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(s.Switch, { id: "seo-noindex", checked: r.data.site.noindex, onCheckedChange: (o) => h("noindex", o) }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-0.5", children: [
          /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "seo-noindex", children: t("Hide the whole site from search engines") }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t("Every page asks not to be indexed and the sitemap is empty. For a site still being built, or staging.") })
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-start cms:justify-between cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-3", children: [
          /* @__PURE__ */ e.jsx(s.Switch, { id: "seo-append", checked: r.data.site.appendName, onCheckedChange: (o) => h("appendName", o) }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-0.5", children: [
            /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "seo-append", children: t("Add the site name to page titles") }),
            /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t('The browser tab and search results show ":example". Share previews keep the bare title.', { example: `${t("About")} ${r.data.site.separator || "|"} ${l}` }) })
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
          /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "seo-separator", className: "cms:text-xs", children: t("Separator") }),
          /* @__PURE__ */ e.jsx(
            s.Input,
            {
              id: "seo-separator",
              className: "cms:w-20",
              maxLength: 5,
              disabled: !r.data.site.appendName,
              value: r.data.site.separator,
              onChange: (o) => h("separator", o.target.value)
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:max-w-xs cms:flex-col cms:gap-1.5", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "seo-twitter", children: t("X (Twitter) account") }),
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            id: "seo-twitter",
            placeholder: "@acme",
            maxLength: 16,
            value: r.data.site.twitter,
            onChange: (o) => h("twitter", o.target.value)
          }
        ),
        /* @__PURE__ */ e.jsx(I, { message: m["site.twitter"] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "seo-image", children: t("Default share image") }),
        /* @__PURE__ */ e.jsx(
          s.MediaPickerInput,
          {
            id: "seo-image",
            invalid: m["site.image"] !== void 0,
            disabled: !1,
            multiple: !1,
            max: null,
            types: ["image"],
            value: r.data.site.image,
            onChange: (o) => h("image", typeof o == "number" ? o : null)
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t("Shown when a page is shared and has no image of its own.") }),
        /* @__PURE__ */ e.jsx(I, { message: m["site.image"] })
      ] })
    ] }),
    i.length > 0 && /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx("h2", { className: "cms:text-base cms:font-medium", children: t("Fields used for SEO") }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("When an entry or term leaves its meta title, description or share image empty, the site uses one of its fields instead. A page's own SEO fields always win; after the field come the site's (the description in Settings → Site, the share image above).") })
    ] }),
    n !== null && f("Collections", t("Collections"), t("Entries of each collection."), n, 0),
    c !== null && f("Taxonomies", t("Taxonomies"), t("Term pages of each taxonomy."), c, n?.length ?? 0),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t("Meta title: a text field. Meta description: a text or textarea field, cut to 300 characters. Share image: the first image of a media field.") })
  ] });
}
const sl = 3;
function tl({ form: a, forms: l, submissions: n, can: c, createForm: i = null }) {
  s.useBreadcrumbs([{ label: t("Submissions"), href: T("cms/submissions") }, ...a ? [{ label: a.title }] : []]);
  const [r, m] = D.useState(null), [u, h] = X();
  if (!a || !n)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(S.Head, { title: t("Submissions") }),
      /* @__PURE__ */ e.jsx(s.PageHeader, { title: t("Submissions"), description: t("What visitors send through the site's forms.") }),
      /* @__PURE__ */ e.jsxs(s.Card, { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:px-6 cms:py-14 cms:text-center", children: [
        /* @__PURE__ */ e.jsx(Kt, { className: "cms:size-8 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
          /* @__PURE__ */ e.jsx("p", { className: "cms:font-medium", children: t("No forms yet") }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:max-w-sm cms:text-sm cms:text-muted-foreground", children: t(i ? "Create a form, put it on a page, and what visitors send shows up here." : "Once someone creates a form and puts it on a page, what visitors send shows up here.") })
        ] }),
        i && /* @__PURE__ */ e.jsx(s.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(S.Link, { href: i, children: [
          /* @__PURE__ */ e.jsx(q, {}),
          " ",
          t("Create a form")
        ] }) })
      ] })
    ] });
  const d = (n.data[0]?.rows ?? []).slice(0, sl), f = (o) => u(
    t("Delete this submission for good? It can't be restored."),
    () => S.router.delete(T(`cms/submissions/${o.id}`), { preserveScroll: !0, onSuccess: () => m(null) })
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: t(":form submissions", { form: a.title }) }),
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: a.title,
        actions: n.total > 0 && c.export && /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: T(`cms/forms/${a.handle}/submissions/export`), children: [
          /* @__PURE__ */ e.jsx(ws, {}),
          " ",
          t("Export CSV")
        ] }) }),
        children: l.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: a.handle, onValueChange: (o) => S.router.get(T(`cms/forms/${o}/submissions`)), children: [
          /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-56", "aria-label": t("Form"), children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(s.SelectContent, { children: l.map((o) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: o.handle, children: [
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
        /* @__PURE__ */ e.jsx(s.TableHead, { children: t("Sent") }),
        d.map((o) => /* @__PURE__ */ e.jsx(s.TableHead, { children: o.label }, o.handle))
      ] }) }),
      /* @__PURE__ */ e.jsxs(s.TableBody, { children: [
        n.data.length === 0 && /* @__PURE__ */ e.jsx(s.TableRow, { children: /* @__PURE__ */ e.jsx(s.TableCell, { colSpan: d.length + 1, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: t("Nothing sent yet.") }) }),
        n.data.map((o) => /* @__PURE__ */ e.jsxs(s.TableRow, { children: [
          /* @__PURE__ */ e.jsx(s.TableCell, { className: "cms:whitespace-nowrap", children: /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:font-medium cms:hover:underline", onClick: () => m(o), children: J(o.createdAt) }) }),
          d.map((x) => /* @__PURE__ */ e.jsx(s.TableCell, { className: "cms:max-w-64 cms:truncate", children: o.rows.find((C) => C.handle === x.handle)?.value }, x.handle))
        ] }, o.id))
      ] })
    ] }) }),
    n.total > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:text-sm cms:text-muted-foreground", children: [
      /* @__PURE__ */ e.jsx("span", { children: t(":from–:to of :total", { from: n.from, to: n.to, total: n.total }) }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(
          s.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": t("Previous page"),
            disabled: !n.prev_page_url,
            onClick: () => n.prev_page_url && S.router.get(n.prev_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(Fe, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          s.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": t("Next page"),
            disabled: !n.next_page_url,
            onClick: () => n.next_page_url && S.router.get(n.next_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(fe, {})
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(s.Dialog, { open: r !== null, onOpenChange: (o) => !o && m(null), children: /* @__PURE__ */ e.jsxs(s.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto", children: [
      /* @__PURE__ */ e.jsxs(s.DialogHeader, { children: [
        /* @__PURE__ */ e.jsx(s.DialogTitle, { children: a.title }),
        /* @__PURE__ */ e.jsxs(s.DialogDescription, { children: [
          t("Sent :date", { date: J(r?.createdAt ?? null) }),
          " · ",
          r?.locale.toUpperCase()
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-3 cms:text-sm", children: r?.rows.map((o) => /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: o.label }),
        /* @__PURE__ */ e.jsx("dd", { className: "cms:whitespace-pre-wrap cms:break-words cms:text-muted-foreground", children: o.file ? /* @__PURE__ */ e.jsx("a", { href: o.file, className: "cms:underline cms:underline-offset-4 hover:cms:text-foreground", download: !0, children: o.value }) : o.value || "—" })
      ] }, o.handle)) }),
      r && (r.visitor.ip || r.visitor.userAgent || r.visitor.referrer) && /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-3 cms:border-t cms:pt-3 cms:text-sm", children: [[t("IP address"), r.visitor.ip], [t("Browser"), r.visitor.userAgent], [t("Sent from"), r.visitor.referrer]].map(([o, x]) => x && /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: o }),
        /* @__PURE__ */ e.jsx("dd", { className: "cms:break-all cms:text-muted-foreground", children: x })
      ] }, o)) }),
      c.delete && r && /* @__PURE__ */ e.jsx(s.DialogFooter, { children: /* @__PURE__ */ e.jsxs(s.Button, { variant: "destructive", onClick: () => f(r), children: [
        /* @__PURE__ */ e.jsx(O, {}),
        " ",
        t("Delete")
      ] }) })
    ] }) }),
    h
  ] });
}
function al(a) {
  return /* @__PURE__ */ e.jsx(ll, { ...a }, `${a.locale}:${a.version}:${JSON.stringify([a.values, a.seo, a.term.template])}`);
}
function ll({ taxonomy: a, term: l, translated: n, fields: c, locale: i, locales: r, shared: m, sharedValues: u, values: h, seo: d, version: f, usedBy: o = [] }) {
  const x = T(`cms/taxonomies/${a.handle}/terms`), C = T(`cms/terms/${l.id}/content`);
  s.useBreadcrumbs([{ label: a.title, href: `${x}?locale=${i}` }, { label: l.title }]);
  const b = S.useForm({ locale: i, data: h, seo: d ?? {}, template: l.template ?? "", version: f }), v = b.errors, $ = () => b.processing || b.put(C, { preserveScroll: !0 }), N = () => {
    b.transform((w) => ({ ...w, version: null })), b.put(C, { preserveScroll: !0 });
  }, y = s.useEditLock({
    type: "cms.term",
    id: l.id,
    locale: i,
    enabled: n,
    noun: t("term"),
    leaveTo: `${x}?locale=${i}`,
    getUnsaved: () => b.isDirty ? { data: b.data.data, seo: b.data.seo, template: b.data.template } : null
  }), _ = n && !y.readOnly, g = async (w) => {
    const B = await y.loadKept(w);
    b.setData((p) => ({
      ...p,
      data: B.data && typeof B.data == "object" ? B.data : p.data,
      seo: B.seo && typeof B.seo == "object" ? B.seo : p.seo,
      template: typeof B.template == "string" ? B.template : p.template
    }));
  };
  return s.useUnsavedChanges(b.isDirty && !y.takenOver, _ ? $ : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: (w) => {
    w.preventDefault(), $();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: l.title }),
    y.dialogs,
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: l.title,
        back: { href: `${x}?locale=${i}`, label: t("Back to :title", { title: a.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          l.url && /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: l.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(ce, {}),
            " ",
            t("View page")
          ] }) }),
          r.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: i, onValueChange: (w) => S.router.get(`${x}/${l.id}/edit`, { locale: w }), children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(s.SelectContent, { children: r.map((w, B) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: w, children: [
              H(w),
              B === 0 ? ` ${t("(main)")}` : ""
            ] }, w)) })
          ] }),
          _ && /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: b.processing, children: [
            b.processing && /* @__PURE__ */ e.jsx(te, { className: "cms:animate-spin" }),
            " ",
            t("Save")
          ] })
        ] }),
        children: b.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
      }
    ),
    n ? /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:items-start cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_20rem]", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(s.ViewingNotice, { by: y.viewingBy }),
        /* @__PURE__ */ e.jsx(s.KeptEditsNotice, { kept: y.kept, disabled: !_, onLoad: (w) => {
          g(w);
        }, onDiscard: (w) => {
          y.discardKept(w);
        } }),
        /* @__PURE__ */ e.jsx(Re, { message: v.version, processing: b.processing, onSaveMine: N }),
        /* @__PURE__ */ e.jsx(
          Pe,
          {
            disabled: !_,
            fields: c,
            values: b.data.data,
            errors: v,
            storageKey: `cms:term:${a.handle}`,
            shared: m,
            sharedValues: u,
            sharedNote: t("Shared by all languages: edit it in :language.", { language: H(r[0] ?? "en") }),
            onChange: (w, B) => b.setData("data", { ...b.data.data, [w]: B })
          }
        ),
        /* @__PURE__ */ e.jsx(s.CollapsibleCard, { title: t("SEO"), description: t("How this term's page appears in search results and shared links."), titleClassName: "cms:text-base", storageKey: "cms:term:seo", hasErrors: ne(v, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !_, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(ae, { bare: !0, id: "seo", fields: Ve(), value: b.data.seo, errors: G(v, "seo"), onChange: (w) => b.setData("seo", w) }) }) })
      ] }),
      /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(
          s.CollapsibleCard,
          {
            title: t("Template"),
            titleClassName: "cms:text-base",
            storageKey: "cms:term:page-settings",
            hasErrors: v.template !== void 0,
            contentClassName: "cms:flex cms:flex-col cms:gap-2",
            children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: !_, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: [
              /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "template", className: "cms:sr-only", children: t("Template") }),
              /* @__PURE__ */ e.jsx(
                s.Input,
                {
                  id: "template",
                  className: "cms:font-mono",
                  placeholder: `cms.${a.handle}-special`,
                  value: b.data.template,
                  onChange: (w) => b.setData("template", w.target.value),
                  "aria-invalid": v.template !== void 0
                }
              ),
              /* @__PURE__ */ e.jsx(ht, { example: `cms.${a.handle}-special`, fallbacks: [t("the taxonomy's template, if set"), `cms.taxonomy-${a.handle}`, "cms.term"] }),
              /* @__PURE__ */ e.jsx(I, { message: v.template })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsxs(s.CollapsibleCard, { title: t("Used by"), titleClassName: "cms:text-base", storageKey: "cms:term:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          o.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("No content links here through its fields.") }),
          o.map((w) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:gap-2", children: [
            w.url ? /* @__PURE__ */ e.jsx("a", { href: w.url, className: "cms:truncate cms:underline-offset-4 cms:hover:underline", children: w.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:truncate", children: w.label }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:font-mono cms:text-xs cms:text-muted-foreground", children: w.field })
          ] }, `${w.label}:${w.field}`))
        ] })
      ] })
    ] }) : /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("This term has no title in :language yet: give it one in the list first.", { language: H(i) }) })
  ] });
}
const De = "__top";
function nl({ taxonomy: a, locale: l, locales: n, parent: c, terms: i }) {
  const r = T(`cms/taxonomies/${a.handle}/terms`);
  s.useBreadcrumbs([{ label: a.title, href: `${r}?locale=${l}` }, { label: t("New term") }]);
  const m = S.useForm({ title: "", slug: "", parent_id: c, locale: l }), u = m.errors;
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (h) => {
    h.preventDefault(), m.post(r);
  }, className: "cms:flex cms:max-w-3xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: t("New term · :taxonomy", { taxonomy: a.title }) }),
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: t("New term"),
        back: { href: `${r}?locale=${l}`, label: t("Back to :title", { title: a.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          n.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: l, onValueChange: (h) => S.router.get(`${r}/create`, { locale: h, ...c ? { parent: c } : {} }), children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-40", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(s.SelectContent, { children: n.map((h) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: h, children: H(h) }, h)) })
          ] }),
          /* @__PURE__ */ e.jsxs(s.Button, { type: "submit", disabled: m.processing, children: [
            m.processing && /* @__PURE__ */ e.jsx(te, { className: "cms:animate-spin" }),
            " ",
            t("Create term")
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(s.Card, { children: /* @__PURE__ */ e.jsxs(s.CardContent, { className: "cms:grid cms:gap-5 cms:md:grid-cols-[3fr_2fr]", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "title", children: t("Title") }),
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            id: "title",
            value: m.data.title,
            required: !0,
            autoFocus: !0,
            "aria-invalid": u.title !== void 0,
            onChange: (h) => m.setData("title", h.target.value)
          }
        ),
        /* @__PURE__ */ e.jsx(I, { message: u.title })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "slug", children: t("Slug") }),
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            id: "slug",
            className: "cms:font-mono",
            value: m.data.slug,
            placeholder: t("Made from the title"),
            "aria-invalid": u.slug !== void 0,
            onChange: (h) => m.setData("slug", h.target.value)
          }
        ),
        /* @__PURE__ */ e.jsx(I, { message: u.slug })
      ] }),
      a.hierarchical && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:md:col-span-2", children: [
        /* @__PURE__ */ e.jsx(s.Label, { htmlFor: "parent", children: t("Under") }),
        /* @__PURE__ */ e.jsxs(
          s.Select,
          {
            value: m.data.parent_id === null ? De : String(m.data.parent_id),
            onValueChange: (h) => m.setData("parent_id", h === De ? null : Number(h)),
            children: [
              /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: "parent", className: "cms:md:w-1/2", children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
              /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
                /* @__PURE__ */ e.jsx(s.SelectItem, { value: De, children: t("Top level") }),
                i.map((h) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: String(h.id), children: [
                  "— ".repeat(h.depth),
                  h.title
                ] }, h.id))
              ] })
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(I, { message: u.parent_id })
      ] }),
      n.length > 1 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground cms:md:col-span-2", children: t("In :language. Translate it from the list afterwards.", { language: H(l) }) })
    ] }) })
  ] });
}
const _e = "__top";
function ts(a = []) {
  if (a.length === 0) return "";
  const l = a.slice(0, 5).join("; ");
  return ` ${a.length > 5 ? t("It's used by :list and :count more.", { list: l, count: a.length - 5 }) : t("It's used by :list.", { list: l })}`;
}
function cl({ taxonomy: a, taxonomies: l, terms: n, locales: c, locale: i, trashed: r = !1 }) {
  s.useBreadcrumbs([{ label: a ? a.title : t("Terms") }]);
  const [m, u] = X(), [h, d] = D.useState(null), [f, o] = D.useState(""), [x, C] = D.useState(n);
  if (D.useEffect(() => C(n), [n]), !a)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(S.Head, { title: t("Terms") }),
      /* @__PURE__ */ e.jsx(s.PageHeader, { title: t("Terms"), description: t("There are no taxonomies yet. Create one under Structure → Taxonomies (categories, tags…), then add its terms here.") })
    ] });
  const b = T(`cms/taxonomies/${a.handle}/terms`), v = (p) => T(`cms/taxonomies/${a.handle}/terms/${p.id}/edit`) + `?locale=${encodeURIComponent(i)}`, $ = (p, z) => {
    const P = z.map((F) => x[F].id);
    C(xt(x, p, z)), S.router.post(
      T("cms/terms/reorder"),
      { taxonomy: a.handle, ids: P, parent_id: p < 0 ? null : x[p].id },
      { preserveScroll: !0, preserveState: !0, onError: () => C(n) }
    );
  }, N = (p) => m(
    t('Move ":title" to the trash, with the terms under it? It comes off the site; you can restore it.', { title: p.fallback }) + ts(p.usedBy),
    () => S.router.delete(T(`cms/terms/${p.id}`), { preserveScroll: !0 })
  ), y = f.trim().toLowerCase(), _ = y === "" ? null : x.filter((p) => `${p.title ?? p.fallback} ${p.slug ?? ""}`.toLowerCase().includes(y)), g = a.collections ?? [], w = (p, z, P) => /* @__PURE__ */ e.jsxs("div", { className: `${as} cms:border-t cms:border-border/60 cms:px-3 cms:py-2`, children: [
    /* @__PURE__ */ e.jsx("span", { className: "cms:flex cms:justify-center", children: z && !r && /* @__PURE__ */ e.jsx(s.SortableHandle, { ...z, label: t("Move :title", { title: p.fallback }) }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-2", style: { paddingLeft: P * 20 }, children: [
      P > 0 && /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", "aria-hidden": !0, children: "└" }),
      r ? /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: p.title ?? p.fallback }) : /* @__PURE__ */ e.jsx(
        "button",
        {
          type: "button",
          className: "cms:truncate cms:text-left cms:font-medium cms:underline-offset-4 cms:hover:underline",
          onClick: () => a.pages && p.title !== null ? S.router.get(v(p)) : d(p),
          children: p.title ?? /* @__PURE__ */ e.jsx("span", { className: "cms:font-normal cms:text-muted-foreground cms:italic", children: t(":title · not translated", { title: p.fallback }) })
        }
      ),
      p.url && /* @__PURE__ */ e.jsx("a", { href: p.url, target: "_blank", rel: "noopener noreferrer", className: "cms:text-muted-foreground cms:hover:text-foreground", "aria-label": t("Visit term page"), title: t("Visit term page"), children: /* @__PURE__ */ e.jsx(ce, { className: "cms:size-3.5" }) })
    ] }),
    /* @__PURE__ */ e.jsx("code", { className: "cms:hidden cms:truncate cms:text-xs cms:text-muted-foreground cms:md:block", children: p.slug ?? "—" }),
    /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:text-sm cms:text-muted-foreground cms:tabular-nums cms:md:block", children: p.entries ?? 0 }),
    /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:text-sm cms:text-muted-foreground cms:md:block", children: rl(p.createdAt) }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:justify-end", children: r ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-1", children: [
      /* @__PURE__ */ e.jsxs(s.Button, { variant: "outline", size: "sm", onClick: () => S.router.post(T(`cms/terms/${p.id}/restore`), {}, { preserveScroll: !0 }), children: [
        /* @__PURE__ */ e.jsx(ge, {}),
        " ",
        t("Restore")
      ] }),
      /* @__PURE__ */ e.jsxs(
        s.Button,
        {
          variant: "ghost",
          size: "sm",
          className: "cms:text-destructive",
          onClick: () => m(
            t('Delete ":title" for good, in every language? Entries lose it.', { title: p.fallback }) + ts(p.usedBy),
            () => S.router.delete(T(`cms/terms/${p.id}/force`), { preserveScroll: !0, data: (p.usedBy ?? []).length > 0 ? { force: 1 } : {} })
          ),
          children: [
            /* @__PURE__ */ e.jsx(O, {}),
            " ",
            t("Delete for good")
          ]
        }
      )
    ] }) : /* @__PURE__ */ e.jsxs(s.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(s.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(s.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": t("Actions for :title", { title: p.fallback }), children: /* @__PURE__ */ e.jsx(_s, {}) }) }),
      /* @__PURE__ */ e.jsxs(s.DropdownMenuContent, { align: "end", children: [
        /* @__PURE__ */ e.jsxs(s.DropdownMenuItem, { onSelect: () => d(p), children: [
          /* @__PURE__ */ e.jsx(Ks, {}),
          " ",
          t("Rename")
        ] }),
        a.hierarchical && p.title !== null && /* @__PURE__ */ e.jsx(s.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(S.Link, { href: `${b}/create?locale=${encodeURIComponent(i)}&parent=${p.id}`, children: [
          /* @__PURE__ */ e.jsx(q, {}),
          " ",
          t("Add a term under it")
        ] }) }),
        a.pages && p.title !== null && /* @__PURE__ */ e.jsx(s.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(S.Link, { href: v(p), children: [
          /* @__PURE__ */ e.jsx(Ut, {}),
          " ",
          t("Edit page")
        ] }) }),
        /* @__PURE__ */ e.jsx(s.DropdownMenuSeparator, {}),
        /* @__PURE__ */ e.jsxs(s.DropdownMenuItem, { className: "cms:text-destructive", onSelect: () => N(p), children: [
          /* @__PURE__ */ e.jsx(O, {}),
          " ",
          t("Move to trash")
        ] })
      ] })
    ] }) })
  ] }), B = (p) => /* @__PURE__ */ e.jsx(s.SortableList, { items: de(x, p), getId: (z) => x[z].id, disabled: r, onReorder: (z) => $(p, z), className: "cms:gap-0", children: (z, { handle: P, isOverlay: F }) => /* @__PURE__ */ e.jsxs("div", { className: F ? "cms:rounded-md cms:bg-card cms:shadow-md" : "", children: [
    w(x[z], P, x[z].depth),
    !F && !r && de(x, z).length > 0 && B(z)
  ] }) });
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(S.Head, { title: a.title }),
    u,
    /* @__PURE__ */ e.jsx(
      s.PageHeader,
      {
        title: r ? t(":title — trash", { title: a.title }) : a.title,
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          c.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: i, onValueChange: (p) => S.router.get(b, { locale: p, ...r ? { status: "trashed" } : {} }), children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-40", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(s.SelectContent, { children: c.map((p) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: p, children: H(p) }, p)) })
          ] }),
          r ? /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", onClick: () => S.router.get(b, { locale: i }), children: t("Back to terms") }) : /* @__PURE__ */ e.jsx(s.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(S.Link, { href: `${b}/create?locale=${encodeURIComponent(i)}`, children: [
            /* @__PURE__ */ e.jsx(q, {}),
            " ",
            t("New term")
          ] }) }),
          /* @__PURE__ */ e.jsxs(s.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(s.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(s.Button, { variant: "outline", size: "icon", "aria-label": t("More"), children: /* @__PURE__ */ e.jsx(Rt, {}) }) }),
            /* @__PURE__ */ e.jsxs(s.DropdownMenuContent, { align: "end", className: "cms:min-w-56", children: [
              g.length > 0 && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(s.DropdownMenuLabel, { children: t("Used by collections") }),
                g.map((p) => /* @__PURE__ */ e.jsx(s.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsx(S.Link, { href: p.url, children: p.title }) }, p.url)),
                /* @__PURE__ */ e.jsx(s.DropdownMenuSeparator, {})
              ] }),
              a.settings && /* @__PURE__ */ e.jsx(s.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(S.Link, { href: a.settings, children: [
                /* @__PURE__ */ e.jsx(Ee, {}),
                " ",
                t("Taxonomy settings")
              ] }) }),
              !r && /* @__PURE__ */ e.jsxs(s.DropdownMenuItem, { onSelect: () => S.router.get(b, { locale: i, status: "trashed" }), children: [
                /* @__PURE__ */ e.jsx(O, {}),
                " ",
                t("Trash")
              ] })
            ] })
          ] })
        ] }),
        children: l.length > 1 && /* @__PURE__ */ e.jsxs(s.Select, { value: a.handle, onValueChange: (p) => S.router.get(T(`cms/taxonomies/${p}/terms`)), children: [
          /* @__PURE__ */ e.jsx(s.SelectTrigger, { className: "cms:w-48", "aria-label": t("Taxonomy"), children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(s.SelectContent, { children: l.map((p) => /* @__PURE__ */ e.jsx(s.SelectItem, { value: p.handle, children: p.title }, p.handle)) })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-xs", children: [
        /* @__PURE__ */ e.jsx(me, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          s.Input,
          {
            className: "cms:pl-9",
            placeholder: t("Search terms…"),
            "aria-label": t("Search terms"),
            value: f,
            onChange: (p) => o(p.target.value)
          }
        )
      ] }),
      !r && x.length > 1 && !_ && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: a.hierarchical ? t("Drag terms to set their order; a term's parent is set when you rename it.") : t("Drag terms to set their order.") })
    ] }),
    /* @__PURE__ */ e.jsxs(s.Card, { className: "cms:gap-0 cms:overflow-hidden cms:py-0", children: [
      /* @__PURE__ */ e.jsxs("div", { className: `${as} cms:bg-muted/60 cms:px-3 cms:py-2.5 cms:text-sm cms:font-medium cms:text-muted-foreground`, children: [
        /* @__PURE__ */ e.jsx("span", {}),
        /* @__PURE__ */ e.jsx("span", { children: t("Title") }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:md:block", children: t("Slug") }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:md:block", children: t("Entries") }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:md:block", children: t("Created") }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: t("Actions") })
      ] }),
      x.length === 0 ? /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:border-t cms:border-border/60 cms:p-10 cms:text-center cms:text-muted-foreground", children: r ? t("The trash is empty.") : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        t("No terms yet."),
        /* @__PURE__ */ e.jsx(s.Button, { size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs(S.Link, { href: `${b}/create?locale=${encodeURIComponent(i)}`, children: [
          /* @__PURE__ */ e.jsx(q, {}),
          " ",
          t("New term")
        ] }) })
      ] }) }) : _ ? _.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:border-t cms:border-border/60 cms:p-8 cms:text-center cms:text-muted-foreground", children: t("No terms match “:search”.", { search: f }) }) : _.map((p) => /* @__PURE__ */ e.jsx(D.Fragment, { children: w(p, null, 0) }, p.id)) : r ? x.map((p) => /* @__PURE__ */ e.jsx(D.Fragment, { children: w(p, null, 0) }, p.id)) : B(-1)
    ] }),
    /* @__PURE__ */ e.jsx(s.Dialog, { open: h !== null, onOpenChange: (p) => {
      p || d(null);
    }, children: /* @__PURE__ */ e.jsxs(s.DialogContent, { children: [
      /* @__PURE__ */ e.jsxs(s.DialogHeader, { children: [
        /* @__PURE__ */ e.jsx(s.DialogTitle, { children: t("Rename “:title”", { title: h?.fallback }) }),
        /* @__PURE__ */ e.jsx(s.DialogDescription, { children: c.length > 1 ? t("In :language.", { language: H(i) }) : t("Its title and the slug in its address.") })
      ] }),
      h !== null && /* @__PURE__ */ e.jsx(il, { term: h, locale: i, terms: n, hierarchical: a.hierarchical, onDone: () => d(null) }, h.id)
    ] }) })
  ] });
}
const as = "cms:grid cms:items-center cms:gap-3 cms:grid-cols-[1.5rem_1fr_2.5rem] cms:md:grid-cols-[1.5rem_minmax(0,2fr)_minmax(0,1.2fr)_5rem_7rem_2.5rem]";
function rl(a) {
  if (!a) return "—";
  const l = new Date(a);
  return Number.isNaN(l.getTime()) ? "—" : l.toLocaleDateString(document.documentElement.lang || void 0, { day: "numeric", month: "short", year: "numeric" });
}
function il({ locale: a, terms: l, hierarchical: n, term: c, onDone: i }) {
  const r = S.useForm({ title: c.title ?? "", slug: c.slug ?? "", parent_id: c.parentId, locale: a, version: c.version }), m = r.errors, u = /* @__PURE__ */ new Set();
  u.add(c.id);
  const h = l.findIndex((o) => o.id === c.id);
  for (let o = h + 1; o < l.length && (l[o]?.depth ?? 0) > c.depth; o++) u.add(l[o].id);
  const d = (o) => {
    o.preventDefault(), r.put(T(`cms/terms/${c.id}`), { preserveScroll: !0, onSuccess: i });
  }, f = `term-${c.id}`;
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: d, className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${f}-title`, children: t("Title") }),
      /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: `${f}-title`,
          value: r.data.title,
          placeholder: c.fallback,
          required: !0,
          autoFocus: !0,
          onChange: (o) => r.setData("title", o.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(I, { message: m.title ?? m.version })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${f}-slug`, children: t("Slug") }),
      /* @__PURE__ */ e.jsx(
        s.Input,
        {
          id: `${f}-slug`,
          className: "cms:font-mono",
          value: r.data.slug,
          placeholder: t("Made from the title"),
          onChange: (o) => r.setData("slug", o.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(I, { message: m.slug })
    ] }),
    n && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
      /* @__PURE__ */ e.jsx(s.Label, { htmlFor: `${f}-parent`, children: t("Under") }),
      /* @__PURE__ */ e.jsxs(
        s.Select,
        {
          value: r.data.parent_id === null ? _e : String(r.data.parent_id),
          onValueChange: (o) => r.setData("parent_id", o === _e ? null : Number(o)),
          children: [
            /* @__PURE__ */ e.jsx(s.SelectTrigger, { id: `${f}-parent`, children: /* @__PURE__ */ e.jsx(s.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(s.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(s.SelectItem, { value: _e, children: t("Top level") }),
              l.filter((o) => !u.has(o.id)).map((o) => /* @__PURE__ */ e.jsxs(s.SelectItem, { value: String(o.id), children: [
                "— ".repeat(o.depth),
                o.title ?? o.fallback
              ] }, o.id))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ e.jsx(I, { message: m.parent_id })
    ] }),
    /* @__PURE__ */ e.jsxs(s.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(s.Button, { type: "button", variant: "ghost", onClick: i, children: t("Cancel") }),
      /* @__PURE__ */ e.jsx(s.Button, { type: "submit", disabled: r.processing, children: t("Save") })
    ] })
  ] });
}
bt({
  pages: {
    "Cms/Blueprints/Index": fa,
    "Cms/Blueprints/Edit": Ye,
    "Cms/Fieldsets/Index": Ea,
    // A fieldset is edited like a blueprint.
    "Cms/Fieldsets/Edit": Ye,
    "Cms/Entries/Index": Ma,
    "Cms/Entries/Edit": ba,
    "Cms/Listing/Edit": Aa,
    "Cms/Terms/Index": cl,
    "Cms/Terms/Create": nl,
    "Cms/Terms/Edit": al,
    "Cms/Globals/Edit": Ha,
    "Cms/Menus/Edit": Ka,
    "Cms/Comments/Index": Qa,
    "Cms/Seo/Edit": el,
    "Cms/Submissions/Index": tl
  }
});
s.registerCommandSource((a, l) => Dt(a, l, T, (n) => t(n)));
