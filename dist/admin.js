function Ye() {
  const s = globalThis.Sunrice;
  if (!s)
    throw new Error("[sunrice] This script runs outside the Sunrice admin panel (window.Sunrice is missing).");
  return s;
}
function tt(s) {
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
function at(s, a) {
  if (typeof s != "string" || s === "") return "";
  const l = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(s);
  return l ? a ? `${l[1]}T${l[2] ?? "00:00"}` : l[1] ?? "" : "";
}
function He(s) {
  return s === "" ? null : s;
}
function lt() {
  return { _hidden: !1 };
}
function nt(s) {
  return { type: s, hidden: !1, values: {} };
}
function ct(s) {
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
let rt = 0;
function it(s, a) {
  return s.length === a ? s.slice() : s.length < a ? [...s, ...Array.from({ length: a - s.length }, () => `k${++rt}`)] : s.slice(0, a);
}
function ot({ taxonomy: s, q: a, ids: l }) {
  const n = new URLSearchParams({ taxonomy: s });
  a && n.set("q", a);
  for (const r of l ?? []) n.append("ids[]", String(r));
  return n.toString();
}
function dt(s, a) {
  return s.map((l) => ({
    id: String(l.id),
    label: l.title,
    description: l.status === "published" ? l.collection : `${l.collection} · ${l.status}`,
    group: "Entries",
    icon: "file-text",
    url: a(`cms/collections/${l.collectionHandle}/entries/${l.id}/edit`)
  }));
}
async function mt(s, a, l) {
  const n = await fetch(`${l("cms/entry-picker")}?${ze({ search: s.trim(), collections: [] })}`, {
    signal: a,
    headers: { Accept: "application/json" },
    credentials: "same-origin"
  });
  if (!n.ok) return [];
  const { items: r } = await n.json();
  return dt(r, l);
}
const Ze = globalThis.Sunrice;
if (!Ze) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const e = Ze.modules["react/jsx-runtime"], Xe = globalThis.Sunrice;
if (!Xe) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const D = Xe.modules.react, es = globalThis.Sunrice;
if (!es) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const y = es.modules["@inertiajs/react"];
const ut = (s) => s?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
function ht(s, a, l = []) {
  if (a == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: ut(s),
    size: 24,
    node: a,
    ...l.length > 0 ? { aliases: l } : {}
  };
}
const xt = (s) => {
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
const pt = (s) => {
  const a = xt(s);
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
function gt(s, a = {}) {
  const l = a.attributeNames ?? {}, n = (h) => l[h] ?? h, r = s.size ?? s.width ?? Z.width, c = s.size ?? s.height ?? Z.height, o = s.aliases?.filter((h) => typeof h == "string" && h.trim() !== "").map((h) => `lucide-${h}`) ?? [], i = [...s.name ? [`lucide-${s.name}`] : [], ...o], u = a.className?.split(" ").filter(Boolean) ?? [], d = a.includeDefaultClasses === !1 ? we(...u) : we("lucide", ...i, ...u), x = a.absoluteStrokeWidth ? Number(a.strokeWidth ?? Z["stroke-width"]) * Number(s.size ?? s.width ?? Z.width) / Number(a.size ?? a.width ?? Z.width) : a.strokeWidth ?? Z["stroke-width"];
  return [
    "svg",
    {
      ...Object.entries(Z).reduce((h, [v, b]) => (h[n(v)] = b, h), {}),
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
      ...d && {
        [n("class")]: d
      },
      [n("viewBox")]: `0 0 ${r} ${c}`,
      ...a.hasA11yProp === !1 ? {
        [n("aria-hidden")]: "true"
      } : {},
      ..."attributes" in a && a.attributes
    },
    s.node.map((h) => {
      const [v, b, g] = h, S = a.nonScalingStroke ? { [n("vector-effect")]: "non-scaling-stroke", ...b } : b;
      return g ? [v, S, g] : [v, S];
    })
  ];
}
function ft(s, a = {}) {
  return gt(s, {
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
const jt = (s) => {
  for (const a in s)
    if (a.startsWith("aria-") || a === "role" || a === "title")
      return !0;
  return !1;
}, bt = D.createContext({}), vt = () => D.useContext(bt), yt = D.forwardRef(
  ({
    color: s,
    size: a,
    width: l,
    height: n,
    strokeWidth: r,
    absoluteStrokeWidth: c,
    nonScalingStroke: o,
    className: i = "",
    children: u,
    iconNode: d = [],
    icon: x = {
      node: d,
      aliases: [],
      size: 24
    },
    ...m
  }, h) => {
    const {
      size: v = 24,
      strokeWidth: b = 2,
      absoluteStrokeWidth: g = !1,
      nonScalingStroke: S = !1,
      color: f = "currentColor",
      className: N = ""
    } = vt() ?? {}, w = !!u || jt(m), [p, $, _ = []] = ft(x, {
      color: s ?? f,
      width: l ?? a ?? v,
      height: n ?? a ?? v,
      strokeWidth: r ?? b,
      absoluteStrokeWidth: c ?? g,
      nonScalingStroke: o ?? S,
      className: we(N, i),
      hasA11yProp: w,
      attributes: m
    });
    return D.createElement(
      p,
      {
        ref: h,
        ...$
      },
      [
        ..._.map(([C, H]) => D.createElement(C, H)),
        ...Array.isArray(u) ? u : [u]
      ]
    );
  }
);
function L(s, a = [], l = []) {
  const n = typeof s == "string" ? ht(s, a, l) : s, r = D.forwardRef(
    ({ className: c, ...o }, i) => D.createElement(yt, {
      ref: i,
      icon: n,
      className: c,
      ...o
    })
  );
  return n.name && (r.displayName = pt(n.name)), r;
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
const Nt = L(rs);
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
const St = L(hs);
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
const Ct = L(xs);
const ps = {
  name: "copy",
  size: 24,
  node: [
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
  ]
};
ps.node;
const kt = L(ps);
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
const $t = L(bs);
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
const wt = L(vs);
const ys = {
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
ys.node;
const Dt = L(ys);
const Ns = {
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
Ns.node;
const _t = L(Ns);
const Ss = {
  name: "link-2",
  size: 24,
  node: [
    ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
    ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
    ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
  ]
};
Ss.node;
const Tt = L(Ss);
const Cs = {
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
Cs.node;
const Bt = L(Cs);
const ks = {
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
ks.node;
const zt = L(ks);
const $s = {
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
$s.node;
const Lt = L($s);
const ws = {
  name: "loader-circle",
  size: 24,
  node: [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  aliases: ["loader-2"]
};
ws.node;
const le = L(ws);
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
const _s = L(Ds);
const Ts = {
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
Ts.node;
const Mt = L(Ts);
const Bs = {
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
Bs.node;
const zs = L(Bs);
const Ls = {
  name: "plus",
  size: 24,
  node: [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ]
};
Ls.node;
const G = L(Ls);
const Ms = {
  name: "rotate-ccw",
  size: 24,
  node: [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ]
};
Ms.node;
const xe = L(Ms);
const Is = {
  name: "search",
  size: 24,
  node: [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ]
};
Is.node;
const ge = L(Is);
const As = {
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
As.node;
const De = L(As);
const Es = {
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
Es.node;
const It = L(Es);
const Fs = {
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
Fs.node;
const R = L(Fs);
const Hs = {
  name: "undo-2",
  size: 24,
  node: [
    ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
    ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
  ]
};
Hs.node;
const _e = L(Hs);
const Ps = {
  name: "x",
  size: 24,
  node: [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]
};
Ps.node;
const fe = L(Ps);
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
function q(s, a) {
  if (!s) return "—";
  const l = new Date(s);
  return Number.isNaN(l.getTime()) ? "—" : l.toLocaleString(a, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
function At(s) {
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
async function Pe(s) {
  const a = await fetch(`${T("cms/entry-picker")}?${ze(s)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!a.ok) throw new Error(String(a.status));
  return (await a.json()).items;
}
function je({ id: s, value: a, multiple: l, max: n, collections: r, invalid: c, onChange: o }) {
  const i = a === null ? [] : Array.isArray(a) ? a : [a], [u, d] = D.useState({}), [x, m] = D.useState(""), [h, v] = D.useState(null), [b, g] = D.useState(!1), S = l && n !== null && i.length >= n, f = i.filter((p) => !u[p]).join(",");
  D.useEffect(() => {
    f !== "" && Pe({ ids: f.split(",").map(Number), collections: r }).then((p) => d(($) => ({ ...$, ...Object.fromEntries(p.map((_) => [_.id, _])) }))).catch(() => g(!0));
  }, [f]), D.useEffect(() => {
    if (x.trim() === "") {
      v(null);
      return;
    }
    const p = window.setTimeout(() => {
      Pe({ search: x.trim(), collections: r }).then(($) => {
        v($), g(!1);
      }).catch(() => g(!0));
    }, 250);
    return () => window.clearTimeout(p);
  }, [x]);
  const N = (p) => {
    d(($) => ({ ...$, [p.id]: p })), o(l ? [...i, p.id] : p.id), m("");
  }, w = (p) => o(l ? p : p[0] ?? null);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    i.length > 0 && /* @__PURE__ */ e.jsx(t.SortableList, { items: i, getId: (p) => p, onReorder: (p) => w(p), disabled: !l, className: "cms:gap-1", children: (p, { handle: $ }) => {
      const _ = u[p];
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-md cms:border cms:bg-card cms:px-2 cms:py-1 cms:text-sm", children: [
        l && /* @__PURE__ */ e.jsx(t.SortableHandle, { ...$, label: `Move ${_?.title ?? p}` }),
        /* @__PURE__ */ e.jsx("span", { className: `cms:min-w-0 cms:flex-1 cms:truncate ${l ? "" : "cms:pl-1"}`, children: _ ? _.title : `Entry #${p}` }),
        _ && /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: _.collection }),
        _ && /* @__PURE__ */ e.jsx(t.Badge, { variant: _.status === "published" ? "success" : "secondary", children: X(_.status) }),
        /* @__PURE__ */ e.jsx(
          t.Button,
          {
            type: "button",
            variant: "ghost",
            size: "icon",
            className: "cms:size-7",
            "aria-label": `Remove ${_?.title ?? p}`,
            onClick: () => w(i.filter((C) => C !== p)),
            children: /* @__PURE__ */ e.jsx(fe, {})
          }
        )
      ] });
    } }),
    !S && (l || i.length === 0) && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-md", children: [
      /* @__PURE__ */ e.jsx(ge, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
      /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: s,
          className: "cms:pl-9",
          placeholder: "Search entries by title",
          "aria-invalid": c,
          value: x,
          autoComplete: "off",
          onChange: (p) => m(p.target.value)
        }
      ),
      h !== null && /* @__PURE__ */ e.jsxs("ul", { role: "listbox", "aria-label": "Matching entries", className: "cms:absolute cms:z-10 cms:mt-1 cms:max-h-64 cms:w-full cms:overflow-auto cms:rounded-md cms:border cms:bg-card cms:p-1 cms:shadow-md", children: [
        h.filter((p) => !i.includes(p.id)).length === 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: "No entries match." }),
        h.filter((p) => !i.includes(p.id)).map((p) => /* @__PURE__ */ e.jsx("li", { role: "option", "aria-selected": !1, children: /* @__PURE__ */ e.jsxs(
          "button",
          {
            type: "button",
            className: "cms:flex cms:w-full cms:items-center cms:gap-2 cms:rounded cms:px-2 cms:py-1.5 cms:text-left cms:text-sm cms:hover:bg-accent",
            onClick: () => N(p),
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
const Vs = D.createContext({}), ve = "__none";
async function Ve(s) {
  const a = await fetch(`${T("cms/term-picker")}?${ot(s)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!a.ok) throw new Error(String(a.status));
  return await a.json();
}
function Et({ id: s, taxonomy: a, multiple: l, max: n, required: r, invalid: c, value: o, onChange: i }) {
  const u = D.useContext(Vs), d = o === null ? [] : Array.isArray(o) ? o : [o], [x, m] = D.useState(null), [h, v] = D.useState(!1), [b, g] = D.useState(""), [S, f] = D.useState({}), [N, w] = D.useState(!1);
  D.useEffect(() => {
    if (!a) return;
    const k = b.trim(), A = window.setTimeout(() => {
      Ve({ taxonomy: a, q: k }).then((E) => {
        m(E.items), E.more && v(!0), w(!1);
      }).catch(() => w(!0));
    }, k === "" ? 0 : 250);
    return () => window.clearTimeout(A);
  }, [a, b]);
  const p = (k) => u[String(k)] ?? S[k] ?? x?.find((A) => A.id === k)?.label, $ = x === null ? "" : d.filter((k) => p(k) === void 0).join(",");
  if (D.useEffect(() => {
    !a || $ === "" || Ve({ taxonomy: a, ids: $.split(",").map(Number) }).then((k) => f((A) => ({ ...A, ...Object.fromEntries(k.items.map((E) => [E.id, E.label])) }))).catch(() => w(!0));
  }, [a, $]), !a) return /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Choose a taxonomy for this field in its blueprint." });
  if (x === null) return N ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "Terms could not be loaded. Try again." }) : /* @__PURE__ */ e.jsx(t.Skeleton, { className: "cms:h-9 cms:w-full cms:max-w-sm" });
  const _ = (k) => `${"— ".repeat(k.depth)}${k.label}`, C = l && n !== null && d.length >= n, H = (k) => i(l ? k : k[0] ?? null), V = h && d.length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-1.5", children: d.map((k) => /* @__PURE__ */ e.jsxs(t.Badge, { variant: "secondary", className: "cms:gap-1 cms:pr-1", children: [
    p(k) ?? `Term #${k}`,
    !(r && !l) && /* @__PURE__ */ e.jsx(
      "button",
      {
        type: "button",
        className: "cms:rounded-sm cms:p-0.5 cms:hover:bg-muted",
        "aria-label": `Remove ${p(k) ?? k}`,
        onClick: () => H(d.filter((A) => A !== k)),
        children: /* @__PURE__ */ e.jsx(fe, { className: "cms:size-3" })
      }
    )
  ] }, k)) }), z = h && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-sm", children: [
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
        onChange: (k) => g(k.target.value)
      }
    )
  ] });
  if (!l && !h) {
    const k = d[0], A = k === void 0 || x.some((E) => E.id === k);
    return /* @__PURE__ */ e.jsxs(t.Select, { value: k === void 0 ? ve : String(k), onValueChange: (E) => i(E === ve ? null : Number(E)), children: [
      /* @__PURE__ */ e.jsx(t.SelectTrigger, { id: s, className: "cms:w-full cms:max-w-sm", "aria-invalid": c, children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
      /* @__PURE__ */ e.jsxs(t.SelectContent, { children: [
        !r && /* @__PURE__ */ e.jsx(t.SelectItem, { value: ve, children: "None" }),
        !A && k !== void 0 && /* @__PURE__ */ e.jsx(t.SelectItem, { value: String(k), children: p(k) ?? `Term #${k}` }),
        x.map((E) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: String(E.id), children: _(E) }, E.id))
      ] })
    ] });
  }
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    V,
    z,
    x.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: b.trim() ? "No terms match." : "Nothing to choose from yet." }) : l ? /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:max-h-72 cms:flex-col cms:gap-2 cms:overflow-auto", children: x.map((k) => {
      const A = d.includes(k.id);
      return /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx(
          t.Checkbox,
          {
            checked: A,
            disabled: !A && C,
            onCheckedChange: (E) => H(E ? [...d, k.id] : d.filter((te) => te !== k.id))
          }
        ),
        _(k)
      ] }, k.id);
    }) }) : /* @__PURE__ */ e.jsx("div", { role: "listbox", "aria-label": "Terms", className: "cms:flex cms:max-h-72 cms:flex-col cms:overflow-auto", children: x.map((k) => /* @__PURE__ */ e.jsx(
      t.Button,
      {
        type: "button",
        variant: d[0] === k.id ? "secondary" : "ghost",
        size: "sm",
        className: "cms:justify-start",
        role: "option",
        "aria-selected": d[0] === k.id,
        onClick: () => i(k.id),
        children: _(k)
      },
      k.id
    )) })
  ] });
}
const Ft = 5;
let Ht = 0;
const Rs = () => `f${++Ht}`;
function Os(s) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function Us(s, a) {
  const l = new Set(a.map((c) => c.handle)), n = Os(s) || "field";
  let r = n;
  for (let c = 2; l.has(r); c++)
    r = `${n}_${c}`;
  return r;
}
function Ks(s) {
  return (s ?? []).map(({ fields: a, ...l }) => ({
    ...l,
    key: Rs(),
    fields: Ks(a),
    handleTouched: !0
  }));
}
function Ws(s, a) {
  return s.map(({ key: l, handleTouched: n, fields: r, ...c }) => ({
    ...c,
    validation: (c.validation ?? []).map((o) => o.trim()).filter((o) => o !== ""),
    ...a(c.type) ? { fields: Ws(r, a) } : {}
  }));
}
function Pt(s, a, l) {
  return { key: Rs(), type: s, label: a, handle: Us(a, l), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function Vt(s, a, l) {
  if (s.handleTouched) return { ...s, label: a };
  const n = l.filter((r) => r.key !== s.key);
  return { ...s, label: a, handle: Us(a || s.type, n) };
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
const Rt = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function Te(s) {
  if (s.label) return s.label;
  const a = s.handle.replace(/_/g, " ");
  return a.charAt(0).toUpperCase() + a.slice(1);
}
function ee({ field: s, value: a, onChange: l, errors: n, id: r, content: c = !1 }) {
  const o = Te(s), i = Rt.includes(s.type) || ["select", "terms"].includes(s.type) && s.config?.multiple === !0;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", ...i ? { role: "group", "aria-labelledby": `${r}-label` } : {}, children: [
    s.type === "toggle" ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(t.Switch, { id: r, checked: a === !0, onCheckedChange: (u) => l(u) }),
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: r, children: o })
    ] }) : /* @__PURE__ */ e.jsxs(t.Label, { id: `${r}-label`, htmlFor: i ? void 0 : r, children: [
      o,
      s.required && /* @__PURE__ */ e.jsx("span", { className: "cms:text-destructive", children: " *" })
    ] }),
    /* @__PURE__ */ e.jsx(Ot, { field: s, value: a, onChange: l, errors: n, id: r, content: c }),
    s.instructions && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s.instructions }),
    /* @__PURE__ */ e.jsx(M, { message: n[""] })
  ] });
}
function Ot({ field: s, value: a, onChange: l, errors: n, id: r, content: c }) {
  const o = n[""] !== void 0;
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
          "aria-invalid": o,
          value: typeof a == "string" ? a : "",
          rows: J(s, "rows") ?? 4,
          onChange: (i) => l(i.target.value)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ e.jsx(t.RichTextEditor, { id: r, labelledBy: `${r}-label`, invalid: o, value: typeof a == "string" ? a : "", onChange: l });
    case "number":
      return /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: r,
          type: "number",
          className: "cms:max-w-48",
          "aria-invalid": o,
          value: typeof a == "number" ? String(a) : typeof a == "string" ? a : "",
          min: J(s, "min"),
          max: J(s, "max"),
          step: J(s, "step") ?? "any",
          onChange: (i) => l(i.target.value === "" ? null : Number(i.target.value))
        }
      );
    case "date": {
      const i = s.config?.time === !0;
      return /* @__PURE__ */ e.jsx(
        t.DatePicker,
        {
          id: r,
          withTime: i,
          invalid: o,
          required: s.required === !0,
          value: He(at(a, i)),
          onChange: (u) => l(He(u ?? ""))
        }
      );
    }
    case "select":
      return s.config?.multiple === !0 ? /* @__PURE__ */ e.jsx(Wt, { options: Oe(s), value: Array.isArray(a) ? a.map(String) : [], onChange: l }) : /* @__PURE__ */ e.jsx(Kt, { options: Oe(s), value: typeof a == "string" ? a : null, onChange: l, id: r, required: s.required === !0 });
    case "terms": {
      const i = s.config?.multiple === !0, u = Array.isArray(a) ? a.filter((d) => typeof d == "number") : typeof a == "number" ? a : null;
      return /* @__PURE__ */ e.jsx(
        Et,
        {
          id: r,
          taxonomy: typeof s.taxonomy == "string" ? s.taxonomy : null,
          multiple: i,
          max: J(s, "max") ?? null,
          required: s.required === !0,
          invalid: o,
          value: i ? Array.isArray(u) ? u : [] : typeof u == "number" ? u : null,
          onChange: l
        }
      );
    }
    case "entries":
      return /* @__PURE__ */ e.jsx(
        je,
        {
          id: r,
          invalid: o,
          multiple: s.config?.multiple === !0,
          max: J(s, "max") ?? null,
          collections: s.collections ?? [],
          onChange: l,
          value: typeof a == "number" || Array.isArray(a) && a.every((i) => typeof i == "number") ? a : null
        }
      );
    case "link":
      return /* @__PURE__ */ e.jsx(qt, { value: ne(a), onChange: l, errors: n, id: r, collections: s.collections ?? [] });
    case "media":
      return /* @__PURE__ */ e.jsx(
        t.MediaPickerInput,
        {
          id: r,
          invalid: o,
          disabled: !1,
          multiple: s.config?.multiple === !0,
          max: J(s, "max") ?? null,
          types: Array.isArray(s.config?.types) ? s.config.types : [],
          value: typeof a == "number" || Array.isArray(a) && a.every((i) => typeof i == "number") ? a : null,
          onChange: l
        }
      );
    case "group":
      return /* @__PURE__ */ e.jsx(se, { fields: s.fields ?? [], value: ne(a), onChange: l, errors: n, id: r, content: c });
    case "repeater":
      return /* @__PURE__ */ e.jsx(Jt, { field: s, value: Array.isArray(a) ? a : [], onChange: l, errors: n, id: r, content: c });
    case "flexible":
      return /* @__PURE__ */ e.jsx(Yt, { field: s, value: Array.isArray(a) ? a : [], onChange: l, errors: n, id: r });
    default:
      return /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: r,
          "aria-invalid": o,
          value: typeof a == "string" ? a : "",
          placeholder: Ut(s, "placeholder"),
          maxLength: J(s, "max"),
          onChange: (i) => l(i.target.value)
        }
      );
  }
}
function J(s, a) {
  const l = s.config?.[a];
  return typeof l == "number" ? l : void 0;
}
function Ut(s, a) {
  const l = s.config?.[a];
  return typeof l == "string" ? l : void 0;
}
function se({ fields: s, value: a, onChange: l, errors: n, id: r, content: c, bare: o = !1 }) {
  return /* @__PURE__ */ e.jsx("div", { className: o ? "cms:flex cms:flex-col cms:gap-6" : "cms:flex cms:flex-col cms:gap-4 cms:rounded-lg cms:border cms:p-4", children: s.filter((i) => Me(i, a)).map((i) => i.shared ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
    /* @__PURE__ */ e.jsx(ee, { id: `${r}-${i.handle}`, field: i, value: a[i.handle], content: c, errors: {}, onChange: () => {
    } }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Shared by all languages: edit it in the main language." })
  ] }, i.handle) : /* @__PURE__ */ e.jsx(
    ee,
    {
      id: `${r}-${i.handle}`,
      field: i,
      value: a[i.handle],
      content: c,
      errors: W(n, i.handle),
      onChange: (u) => l({ ...a, [i.handle]: u })
    },
    i.handle
  )) });
}
function Kt({ options: s, value: a, onChange: l, id: n, required: r }) {
  return /* @__PURE__ */ e.jsxs(t.Select, { value: a ?? Ne, onValueChange: (c) => l(c === Ne ? null : c), children: [
    /* @__PURE__ */ e.jsx(t.SelectTrigger, { id: n, className: "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
    /* @__PURE__ */ e.jsxs(t.SelectContent, { children: [
      !r && /* @__PURE__ */ e.jsx(t.SelectItem, { value: Ne, children: "None" }),
      s.map((c) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: c.value, children: c.label }, c.value))
    ] })
  ] });
}
function Wt({ options: s, value: a, onChange: l }) {
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
function qt({ value: s, onChange: a, errors: l, id: n, collections: r }) {
  const c = s.type === "entry" ? "entry" : "url", o = (i) => {
    const u = { ...s, type: c, ...i }, d = u.type === "entry" ? typeof u.entry_id != "number" : u.url === "" || u.url === void 0 || u.url === null;
    a(d ? u.label || u.new_tab ? u : null : u);
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("div", { role: "radiogroup", "aria-label": "Link to", className: "cms:inline-flex cms:w-fit cms:rounded-md cms:border cms:p-0.5", children: ["url", "entry"].map((i) => /* @__PURE__ */ e.jsx(
      t.Button,
      {
        type: "button",
        size: "sm",
        role: "radio",
        "aria-checked": c === i,
        variant: c === i ? "secondary" : "ghost",
        onClick: () => o({ type: i, url: i === "url" ? s.url : void 0, entry_id: i === "entry" ? s.entry_id : void 0 }),
        children: i === "url" ? "Address" : "Entry"
      },
      i
    )) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-2 cms:md:grid-cols-[2fr_1fr_auto] cms:md:items-start", children: [
      c === "url" ? /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: n,
          "aria-label": "Address",
          placeholder: "https://… or /about",
          value: typeof s.url == "string" ? s.url : "",
          onChange: (i) => o({ url: i.target.value }),
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
          onChange: (i) => o({ entry_id: typeof i == "number" ? i : void 0 })
        }
      ),
      /* @__PURE__ */ e.jsx(
        t.Input,
        {
          "aria-label": "Link text",
          placeholder: c === "entry" ? "Link text (the entry's title)" : "Link text",
          value: typeof s.label == "string" ? s.label : "",
          onChange: (i) => o({ label: i.target.value })
        }
      ),
      /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:h-9 cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx(t.Checkbox, { checked: s.new_tab === !0, onCheckedChange: (i) => o({ new_tab: i }) }),
        "New tab"
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ e.jsx(M, { message: l.url ?? l.entry_id ?? l.label ?? l.type }) })
    ] })
  ] });
}
function Gt(s, a) {
  return !a && (s.fields ?? []).every((l) => l.type === "text");
}
function qs(s) {
  const a = D.useRef([]);
  return a.current = it(a.current, s), {
    keys: a.current,
    remove: (l) => {
      a.current = a.current.filter((n, r) => r !== l);
    },
    move: (l, n) => {
      a.current = t.moveItem(a.current, l, n);
    }
  };
}
function Jt({ field: s, value: a, onChange: l, errors: n, id: r, content: c = !1 }) {
  const o = s.fields ?? [], i = a.map(ne), u = qs(i.length), d = (b, g) => l(i.map((S, f) => f === b ? g : S)), x = (b) => {
    u.remove(b), l(i.filter((g, S) => S !== b));
  }, m = (s.label || "row").toLowerCase().replace(/s$/, ""), h = m.charAt(0).toUpperCase() + m.slice(1), v = i.map((b, g) => ({ row: b, index: g, key: u.keys[g] ?? String(g) }));
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(
      t.SortableList,
      {
        items: v,
        getId: (b) => b.key,
        onReorder: (b, g, S) => {
          u.move(g, S), l(b.map((f) => f.row));
        },
        children: ({ row: b, index: g }, { handle: S }) => Gt(s, c) ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(t.SortableHandle, { ...S, label: `Move ${m} ${g + 1}`, className: "cms:mt-1" }),
          o.map((f) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
            /* @__PURE__ */ e.jsx(
              t.Input,
              {
                "aria-label": f.label || f.handle,
                placeholder: f.label || f.handle,
                value: typeof b[f.handle] == "string" ? b[f.handle] : "",
                onChange: (N) => d(g, { ...b, [f.handle]: N.target.value })
              }
            ),
            /* @__PURE__ */ e.jsx(M, { message: n[`${g}.${f.handle}`] })
          ] }, f.handle)),
          /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": `Remove ${m} ${g + 1}`, onClick: () => x(g), children: /* @__PURE__ */ e.jsx(R, {}) })
        ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(
            Gs,
            {
              label: `${h} ${g + 1}`,
              handle: S,
              onRemove: () => x(g),
              hidden: c ? b._hidden === !0 : void 0,
              onHidden: (f) => d(g, { ...b, _hidden: f })
            }
          ),
          /* @__PURE__ */ e.jsx(se, { fields: o, value: b, onChange: (f) => d(g, f), errors: W(n, String(g)), id: `${r}-${g}`, content: c })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", size: "sm", onClick: () => l([...i, c ? lt() : {}]), children: [
      /* @__PURE__ */ e.jsx(G, {}),
      " Add ",
      m
    ] }) })
  ] });
}
function Yt({ field: s, value: a, onChange: l, errors: n, id: r }) {
  const c = s.blocks ?? [], o = a.map(ne), i = qs(o.length), u = (m, h) => l(o.map((v, b) => b === m ? h : v)), d = (m) => {
    i.remove(m), l(o.filter((h, v) => v !== m));
  }, x = o.map((m, h) => ({ block: m, index: h, key: i.keys[h] ?? String(h) }));
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    /* @__PURE__ */ e.jsx(
      t.SortableList,
      {
        items: x,
        getId: (m) => m.key,
        className: "cms:gap-3",
        onReorder: (m, h, v) => {
          i.move(h, v), l(m.map((b) => b.block));
        },
        children: ({ block: m, index: h }, { handle: v }) => {
          const b = c.find((g) => g.type === m.type);
          return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              Gs,
              {
                label: b?.label ?? String(m.type),
                badge: !0,
                handle: v,
                onRemove: () => d(h),
                hidden: m.hidden === !0,
                onHidden: (g) => u(h, { ...m, hidden: g })
              }
            ),
            b ? /* @__PURE__ */ e.jsx(
              se,
              {
                fields: b.fields,
                value: ne(m.values),
                onChange: (g) => u(h, { ...m, values: g }),
                errors: W(n, `${h}.values`),
                id: `${r}-${h}`,
                content: !0
              }
            ) : /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: "This kind of block no longer exists. Its values are kept." }),
            /* @__PURE__ */ e.jsx(M, { message: n[`${h}.type`] })
          ] });
        }
      }
    ),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(t.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(t.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", size: "sm", disabled: c.length === 0, children: [
        /* @__PURE__ */ e.jsx(G, {}),
        " Add block"
      ] }) }),
      /* @__PURE__ */ e.jsx(t.DropdownMenuContent, { align: "start", children: c.map((m) => /* @__PURE__ */ e.jsx(t.DropdownMenuItem, { onSelect: () => l([...o, nt(m.type)]), children: m.label }, m.type)) })
    ] }) })
  ] });
}
function Gs({ label: s, badge: a = !1, handle: l, onRemove: n, hidden: r, onHidden: c }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(t.SortableHandle, { ...l, label: `Move ${s}` }),
    a ? /* @__PURE__ */ e.jsx(t.Badge, { variant: "secondary", children: s }) : /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:font-medium", children: s }),
    r !== void 0 && /* @__PURE__ */ e.jsxs("label", { className: "cms:ml-auto cms:flex cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", children: [
      /* @__PURE__ */ e.jsx(t.Switch, { checked: !r, onCheckedChange: (o) => c(!o), "aria-label": `Show ${s}` }),
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
function Js({ fields: s, onChange: a, types: l, errors: n, depth: r = 1, idPrefix: c = "field" }) {
  const [o, i] = D.useState(() => /* @__PURE__ */ new Set()), u = (m) => i((h) => {
    const v = new Set(h);
    return v.has(m) ? v.delete(m) : v.add(m), v;
  }), d = (m, h) => a(s.map((v, b) => b === m ? h : v)), x = (m) => {
    const h = Pt(m.type, m.label, s);
    a([...s, h]), i((v) => new Set(v).add(h.key));
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:border-dashed cms:p-4 cms:text-sm cms:text-muted-foreground", children: "No fields yet." }),
    /* @__PURE__ */ e.jsx(t.SortableList, { items: s, getId: (m) => m.key, onReorder: (m) => a(m), children: (m, { index: h, handle: v, isOverlay: b }) => {
      const g = l.find((N) => N.type === m.type), S = !b && (o.has(m.key) || ae(n, String(h))), f = `${c}-${m.key}`;
      return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${ae(n, String(h)) ? "cms:border-destructive" : ""}`, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:p-2", children: [
          /* @__PURE__ */ e.jsx(t.SortableHandle, { ...v, label: `Move ${m.label || m.handle}` }),
          /* @__PURE__ */ e.jsx(
            t.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-expanded": S,
              "aria-controls": f,
              "aria-label": `${S ? "Close" : "Open"} ${m.label || m.handle}`,
              onClick: () => u(m.key),
              children: S ? /* @__PURE__ */ e.jsx(ds, {}) : /* @__PURE__ */ e.jsx(pe, {})
            }
          ),
          /* @__PURE__ */ e.jsxs("button", { type: "button", className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:text-left", onClick: () => u(m.key), children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: m.label || m.handle }),
            /* @__PURE__ */ e.jsx("code", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", children: m.handle })
          ] }),
          m.required && /* @__PURE__ */ e.jsx(t.Badge, { variant: "outline", children: "Required" }),
          /* @__PURE__ */ e.jsx(t.Badge, { variant: "secondary", children: g?.label ?? m.type }),
          g?.hasChildren && m.fields.length > 0 && !S && /* @__PURE__ */ e.jsxs("span", { className: "cms:text-xs cms:text-muted-foreground", children: [
            m.fields.length,
            " inside"
          ] }),
          /* @__PURE__ */ e.jsx(
            t.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Remove ${m.label || m.handle}`,
              onClick: () => a(s.filter((N, w) => w !== h)),
              children: /* @__PURE__ */ e.jsx(R, {})
            }
          )
        ] }),
        S && /* @__PURE__ */ e.jsx(
          Qt,
          {
            id: f,
            field: m,
            type: g,
            siblings: s,
            onChange: (N) => d(h, N),
            types: l,
            errors: ce(n, String(h)),
            depth: r
          }
        )
      ] });
    } }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(t.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(t.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", size: "sm", children: [
        /* @__PURE__ */ e.jsx(G, {}),
        " Add field"
      ] }) }),
      /* @__PURE__ */ e.jsx(t.DropdownMenuContent, { align: "start", children: l.filter((m) => !m.hasChildren || r < Ft).map((m) => /* @__PURE__ */ e.jsx(t.DropdownMenuItem, { onSelect: () => x(m), children: m.label }, m.type)) })
    ] }) })
  ] });
}
const Y = { default: "__default", yes: "yes", no: "no" };
function Qt({ id: s, field: a, type: l, siblings: n, onChange: r, types: c, errors: o, depth: i }) {
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
        /* @__PURE__ */ e.jsx(t.Input, { id: `${s}-label`, value: a.label ?? "", onChange: (d) => r(Vt(a, d.target.value, n)) }),
        /* @__PURE__ */ e.jsx(M, { message: o.label })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${s}-handle`, children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          t.Input,
          {
            id: `${s}-handle`,
            className: "cms:font-mono",
            value: a.handle,
            onChange: (d) => r({ ...a, handle: d.target.value, handleTouched: !0 })
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "How templates read it. Renaming it hides values saved under the old one." }),
        /* @__PURE__ */ e.jsx(M, { message: o.handle })
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
          onChange: (d) => r({ ...a, instructions: d.target.value || null })
        }
      ),
      /* @__PURE__ */ e.jsx(M, { message: o.instructions })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-6", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(t.Switch, { id: `${s}-required`, checked: a.required === !0, onCheckedChange: (d) => r({ ...a, required: d }) }),
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${s}-required`, children: "Required" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${s}-translatable`, children: "Per language" }),
        /* @__PURE__ */ e.jsxs(
          t.Select,
          {
            value: a.translatable === !0 ? Y.yes : a.translatable === !1 ? Y.no : Y.default,
            onValueChange: (d) => r({ ...a, translatable: d === Y.yes ? !0 : d === Y.no ? !1 : null }),
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
    /* @__PURE__ */ e.jsx(Zt, { id: s, field: a, siblings: n, onChange: r, errors: ce(o, "condition") }),
    (l?.settings.length ?? 0) > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: l?.settings.map((d) => /* @__PURE__ */ e.jsx(
      ee,
      {
        id: `${s}-config-${d.handle}`,
        field: d,
        value: u[d.handle],
        errors: W(o, `config.${d.handle}`),
        onChange: (x) => r({ ...a, config: { ...u, [d.handle]: x } })
      },
      d.handle
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
          onChange: (d) => r({ ...a, validation: d.target.value.split(`
`) })
        }
      ),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Laravel rules, one per line." }),
      /* @__PURE__ */ e.jsx(M, { message: o.validation ?? Object.entries(o).find(([d]) => d.startsWith("validation."))?.[1] })
    ] }),
    l?.hasChildren && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(t.Label, { children: "Fields inside" }),
      /* @__PURE__ */ e.jsx(
        Js,
        {
          fields: a.fields,
          onChange: (d) => r({ ...a, fields: d }),
          types: c,
          errors: ce(o, "fields"),
          depth: i + 1,
          idPrefix: s
        }
      ),
      /* @__PURE__ */ e.jsx(M, { message: o.fields })
    ] }),
    /* @__PURE__ */ e.jsx(M, { message: o.type })
  ] });
}
const Se = "__always";
function Zt({ id: s, field: a, siblings: l, onChange: n, errors: r }) {
  const c = l.filter((d) => d.key !== a.key && d.handle !== ""), o = a.condition ?? null, i = ye.find((d) => d.value === o?.operator) ?? ye[0], u = (d) => n({ ...a, condition: d === null ? null : { field: o?.field ?? c[0]?.handle ?? "", operator: o?.operator ?? "equals", value: o?.value ?? "", ...d } });
  return c.length === 0 && o === null ? null : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${s}-condition`, children: "Show" }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(t.Select, { value: o?.field ?? Se, onValueChange: (d) => u(d === Se ? null : { field: d }), children: [
        /* @__PURE__ */ e.jsx(t.SelectTrigger, { id: `${s}-condition`, className: "cms:w-56", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
        /* @__PURE__ */ e.jsxs(t.SelectContent, { children: [
          /* @__PURE__ */ e.jsx(t.SelectItem, { value: Se, children: "Always" }),
          c.map((d) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: d.handle, children: [
            "When ",
            d.label || d.handle
          ] }, d.key))
        ] })
      ] }),
      o && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(t.Select, { value: i.value, onValueChange: (d) => u({ operator: d }), children: [
          /* @__PURE__ */ e.jsx(t.SelectTrigger, { "aria-label": "How to compare", className: "cms:w-36", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(t.SelectContent, { children: ye.map((d) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: d.value, children: d.label }, d.value)) })
        ] }),
        i.needsValue && /* @__PURE__ */ e.jsx(
          t.Input,
          {
            "aria-label": "Value",
            className: "cms:w-48",
            placeholder: "a value, or true / false",
            value: String(o.value ?? ""),
            onChange: (d) => u({ value: d.target.value })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "A hidden field isn't required, and keeps what it had." }),
    /* @__PURE__ */ e.jsx(M, { message: r.field ?? r.operator ?? r.value ?? r[""] })
  ] });
}
function Xt({ kind: s = "blueprint", blueprint: a, fieldTypes: l, usedBy: n = [] }) {
  const r = s === "fieldset" ? "Fieldset" : "Blueprint", c = T(s === "fieldset" ? "cms/fieldsets" : "cms/blueprints"), o = a ? a.title : `New ${r.toLowerCase()}`;
  t.useBreadcrumbs([{ label: `${r}s`, href: c }, { label: o }]);
  const [i, u] = Q(), d = y.useForm({ title: a?.title ?? "", handle: a?.handle ?? "" }), [x, m] = D.useState(a !== null), [h, v] = D.useState(() => Ks(a?.fields)), b = (C) => l.find((H) => H.type === C)?.hasChildren === !0, g = d.errors, [S, f] = D.useState(() => JSON.stringify(h)), N = d.isDirty || JSON.stringify(h) !== S, w = () => {
    d.setDefaults(), f(JSON.stringify(h));
  }, p = () => {
    d.processing || (d.transform((C) => ({
      ...a ? { title: C.title } : C,
      fields: Ws(h, b)
    })), a ? d.put(`${c}/${a.id}`, { preserveScroll: !0, onSuccess: w }) : d.post(c, { onSuccess: w }));
  }, $ = (C) => {
    C.preventDefault(), p();
  };
  t.useUnsavedChanges(N, p);
  const _ = () => a && i(
    `Delete the ${r.toLowerCase()} "${a.title}"? Content keeps its values.`,
    () => y.router.delete(`${c}/${a.id}`, { preserveScroll: !0 })
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: $, className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: o }),
    u,
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: o,
        back: { href: c, label: `Back to ${r.toLowerCase()}s` },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          a && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "outline", size: "icon", className: "cms:text-destructive", "aria-label": `Delete ${o}`, onClick: _, children: /* @__PURE__ */ e.jsx(R, {}) }),
          /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", disabled: d.processing, children: [
            d.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
            a ? "Save" : `Create ${r.toLowerCase()}`
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(M, { message: g.blueprint ?? g.fieldset }),
    /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsxs(t.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "title", children: "Title" }),
        /* @__PURE__ */ e.jsx(t.Input, { id: "title", value: d.data.title, required: !0, onChange: (C) => {
          d.setData((H) => ({ ...H, title: C.target.value, handle: x ? H.handle : Os(C.target.value) }));
        } }),
        /* @__PURE__ */ e.jsx(M, { message: g.title })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "handle", children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          t.Input,
          {
            id: "handle",
            className: "cms:font-mono",
            value: d.data.handle,
            disabled: a !== null,
            required: !0,
            onChange: (C) => {
              m(!0), d.setData("handle", C.target.value);
            }
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: a ? "Set when it was created." : "Lowercase letters, digits and underscores. It can't change later." }),
        /* @__PURE__ */ e.jsx(M, { message: g.handle })
      ] })
    ] }) }),
    n.length > 0 && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      "Used by ",
      n.join(", "),
      ". Changes show there at once."
    ] }),
    /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-3", "aria-labelledby": "fields-heading", children: [
      /* @__PURE__ */ e.jsx("h2", { id: "fields-heading", className: "cms:text-lg cms:font-medium", children: "Fields" }),
      /* @__PURE__ */ e.jsx(Js, { fields: h, onChange: v, types: l, errors: ce(g, "fields") }),
      /* @__PURE__ */ e.jsx(M, { message: g.fields })
    ] })
  ] });
}
function Ys({ noun: s, base: a, rows: l, intro: n }) {
  const r = `${s}s`;
  t.useBreadcrumbs([{ label: r }]);
  const [c, o] = Q();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: r }),
    o,
    /* @__PURE__ */ e.jsx(t.PageHeader, { title: r, description: n, actions: /* @__PURE__ */ e.jsx(t.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(y.Link, { href: `${a}/create`, children: [
      /* @__PURE__ */ e.jsx(G, {}),
      " New ",
      s.toLowerCase()
    ] }) }) }),
    /* @__PURE__ */ e.jsx(t.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(t.Table, { children: [
      /* @__PURE__ */ e.jsx(t.TableHeader, { children: /* @__PURE__ */ e.jsxs(t.TableRow, { children: [
        /* @__PURE__ */ e.jsx(t.TableHead, { children: "Title" }),
        /* @__PURE__ */ e.jsx(t.TableHead, { children: "Handle" }),
        /* @__PURE__ */ e.jsx(t.TableHead, { children: "Fields" }),
        l.some((i) => i.usedBy) && /* @__PURE__ */ e.jsx(t.TableHead, { children: "Used by" }),
        /* @__PURE__ */ e.jsx(t.TableHead, { className: "cms:w-12", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: "Actions" }) })
      ] }) }),
      /* @__PURE__ */ e.jsxs(t.TableBody, { children: [
        l.length === 0 && /* @__PURE__ */ e.jsx(t.TableRow, { children: /* @__PURE__ */ e.jsxs(t.TableCell, { colSpan: 5, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: [
          "No ",
          r.toLowerCase(),
          " yet."
        ] }) }),
        l.map((i) => /* @__PURE__ */ e.jsxs(t.TableRow, { children: [
          /* @__PURE__ */ e.jsx(t.TableCell, { children: /* @__PURE__ */ e.jsx(y.Link, { href: `${a}/${i.id}/edit`, className: "cms:font-medium cms:hover:underline", children: i.title }) }),
          /* @__PURE__ */ e.jsx(t.TableCell, { children: /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: i.handle }) }),
          /* @__PURE__ */ e.jsx(t.TableCell, { children: i.fields }),
          i.usedBy && /* @__PURE__ */ e.jsx(t.TableCell, { className: "cms:text-muted-foreground", children: i.usedBy.join(", ") || "—" }),
          /* @__PURE__ */ e.jsx(t.TableCell, { children: /* @__PURE__ */ e.jsx(
            t.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Delete ${i.title}`,
              onClick: () => c(
                `Delete the ${s.toLowerCase()} "${i.title}"? Content keeps its values.`,
                () => y.router.delete(`${a}/${i.id}`, { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(R, {})
            }
          ) })
        ] }, i.id))
      ] })
    ] }) })
  ] });
}
function ea({ blueprints: s }) {
  const a = y.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(M, { message: a.blueprint }),
    /* @__PURE__ */ e.jsx(
      Ys,
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
function sa({ entryId: s, comments: a }) {
  const [l, n] = D.useState(null), [r, c] = D.useState(""), [o, i] = D.useState(!1), u = (x, m) => y.router.post(T(`cms/comments/${x}/status`), { status: m }, Ue), d = (x) => y.router.post(T(`cms/comments/${x}/reply`), { body: r }, {
    ...Ue,
    onStart: () => i(!0),
    onFinish: () => i(!1),
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
            q(x.createdAt),
            x.reply ? " · a reply" : ""
          ] }),
          a.canModerate && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-1", children: [
            x.status === "pending" && /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", size: "sm", onClick: () => u(x.id, "approved"), children: [
              /* @__PURE__ */ e.jsx(he, {}),
              " Approve"
            ] }),
            /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => u(x.id, "spam"), children: [
              /* @__PURE__ */ e.jsx(De, {}),
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
                  /* @__PURE__ */ e.jsx(_s, {}),
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
                onChange: (m) => c(m.target.value)
              }
            ),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
              /* @__PURE__ */ e.jsx(t.Button, { type: "button", size: "sm", disabled: r.trim() === "" || o, onClick: () => d(x.id), children: "Post reply" }),
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
function Ie({ fields: s, values: a, onChange: l, errors: n, storageKey: r, shared: c = [], sharedValues: o = {}, sharedNote: i, disabled: u = !1 }) {
  const d = [], x = { ...o, ...a };
  for (const h of s.filter((v) => Me(v, x))) {
    const v = d[d.length - 1];
    h.type === "group" ? d.push(h) : Array.isArray(v) ? v.push(h) : d.push([h]);
  }
  const m = i ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: i }) : null;
  return /* @__PURE__ */ e.jsx(e.Fragment, { children: d.map((h) => {
    if (Array.isArray(h))
      return /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsx(t.CardContent, { children: /* @__PURE__ */ e.jsx("fieldset", { disabled: u, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: h.map((S) => c.includes(S.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(ee, { id: `data-${S.handle}`, field: S, content: !0, value: o[S.handle], errors: {}, onChange: () => {
        } }),
        m
      ] }, S.handle) : /* @__PURE__ */ e.jsx(
        ee,
        {
          id: `data-${S.handle}`,
          field: S,
          content: !0,
          value: a[S.handle],
          errors: W(n, `data.${S.handle}`),
          onChange: (f) => l(S.handle, f)
        },
        S.handle
      )) }) }) }, `fields-${h[0]?.handle ?? ""}`);
    const v = c.includes(h.handle), b = (v ? o : a)[h.handle], g = W(n, `data.${h.handle}`);
    return /* @__PURE__ */ e.jsx(
      t.CollapsibleCard,
      {
        title: Te(h),
        titleClassName: "cms:text-base",
        description: h.instructions ?? void 0,
        storageKey: `${r}:${h.handle}`,
        hasErrors: !v && ae(n, `data.${h.handle}`),
        children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: v || u, role: "group", "aria-label": Te(h), className: "cms:flex cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(
            se,
            {
              bare: !0,
              fields: h.fields ?? [],
              id: `data-${h.handle}`,
              content: !0,
              errors: v ? {} : g,
              value: b && typeof b == "object" && !Array.isArray(b) ? b : {},
              onChange: (S) => l(h.handle, S)
            }
          ),
          v && m,
          /* @__PURE__ */ e.jsx(M, { message: v ? void 0 : g[""] })
        ] })
      },
      h.handle
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
function ta(s) {
  const { entry: a } = s;
  return /* @__PURE__ */ e.jsx(aa, { ...s }, a ? `${a.id}:${a.locale}:${a.version}:${a.status}:${a.trashed}:${a.publishedAt}` : "new");
}
function aa({ collection: s, fields: a, locales: l = [], shared: n = [], sharedValues: r = {}, entry: c, values: o, revisions: i, comments: u, termLabels: d, usedBy: x = [], undoRestore: m = null, machineTranslate: h = null, settings: v, blueprints: b = [], can: g }) {
  const S = T(`cms/collections/${s.handle}/entries`), f = c ? T(`cms/entries/${c.id}`) : S, N = c ? o.title : "New entry";
  t.useBreadcrumbs([{ label: s.title, href: S }, { label: N }]);
  const [w, p] = Q(), [$, _] = D.useState(!1), C = y.useForm({ ...o, seo: o.seo ?? {}, locale: c?.locale ?? null, version: c?.version ?? null, publish: !1, published_at: null }), H = c ? { locale: c.locale } : {}, V = l.find((B) => B.main)?.code, z = C.errors, k = c !== null && c.status !== "draft" && !c.hasUnpublishedChanges && !C.isDirty, A = c === null ? g.create : g.update && !c.trashed, E = (B = !1, K = null) => {
    C.transform((j) => ({ ...j, publish: B, published_at: K })), c ? C.put(f, { preserveScroll: !0, onSuccess: () => _(!1) }) : C.post(f);
  }, te = () => {
    C.transform((B) => ({ ...B, version: null, publish: !1, published_at: null })), C.put(f, { preserveScroll: !0 });
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
    C.setData((j) => ({ ...j, title: K.title ?? j.title, slug: K.slug ?? j.slug, data: K.data ?? j.data, seo: K.seo ?? j.seo }));
  };
  t.useUnsavedChanges(C.isDirty && !U.takenOver, O ? () => C.processing || E() : void 0);
  const de = (B = null) => {
    g.update ? E(!0, B) : c && y.router.post(`${f}/publish`, { ...H, published_at: B }, { preserveScroll: !0, onSuccess: () => _(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (B) => {
    B.preventDefault(), E();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: N }),
    p,
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
                /* @__PURE__ */ e.jsx($t, {}),
                " Preview"
              ]
            }
          ) }),
          c?.url && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: c.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(ie, {}),
            " View"
          ] }) }),
          c?.trashed && g.delete && /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", onClick: () => y.router.post(`${f}/restore`, {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(xe, {}),
            " Restore"
          ] }),
          c?.trashed && g.delete && /* @__PURE__ */ e.jsxs(
            t.Button,
            {
              type: "button",
              variant: "outline",
              className: "cms:text-destructive",
              onClick: () => w(
                `Delete "${o.title}" for good, in every language, with its revisions? This can't be undone.${Ke(x)}`,
                () => y.router.delete(`${f}/force`, { data: x.length > 0 ? { force: 1 } : {} })
              ),
              children: [
                /* @__PURE__ */ e.jsx(R, {}),
                " Delete for good"
              ]
            }
          ),
          c && !c.trashed && g.create && /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "ghost", title: "Copy every language as a new draft", onClick: () => y.router.post(`${f}/duplicate`), children: [
            /* @__PURE__ */ e.jsx(kt, {}),
            " Duplicate"
          ] }),
          c && !c.trashed && g.delete && !U.readOnly && /* @__PURE__ */ e.jsx(
            t.Button,
            {
              type: "button",
              variant: "outline",
              size: "icon",
              className: "cms:text-destructive",
              "aria-label": "Move to the trash",
              onClick: () => w(`Move "${o.title}" to the trash? It comes off the site; you can restore it.${Ke(x)}`, () => y.router.delete(f)),
              children: /* @__PURE__ */ e.jsx(R, {})
            }
          ),
          c && O && h !== null && /* @__PURE__ */ e.jsxs(
            t.Button,
            {
              type: "button",
              variant: "outline",
              disabled: C.processing || C.isDirty,
              title: C.isDirty ? "Save your changes first" : "Fill in what isn't translated yet, into the draft",
              onClick: () => y.router.post(T(`cms/entries/${h}/translate`), { version: c.version }, { preserveScroll: !0 }),
              children: [
                /* @__PURE__ */ e.jsx(Dt, {}),
                " Translate from ",
                l.find((B) => B.main)?.name ?? (V ? P(V) : "the main language")
              ]
            }
          ),
          O && /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", variant: c && g.publish ? "outline" : "default", disabled: C.processing, children: [
            C.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
            c ? "Save draft" : "Create draft"
          ] }),
          c && !c.trashed && g.publish && !U.readOnly && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex", children: [
            /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: k ? "outline" : "default", className: "cms:rounded-r-none cms:disabled:opacity-100", disabled: C.processing || k, onClick: () => de(), children: [
              k && /* @__PURE__ */ e.jsx(he, { className: "cms:text-emerald-600 cms:dark:text-emerald-400" }),
              c.status === "draft" ? "Publish" : k ? "Published" : "Publish changes"
            ] }),
            /* @__PURE__ */ e.jsxs(t.DropdownMenu, { children: [
              /* @__PURE__ */ e.jsx(t.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(t.Button, { type: "button", size: "icon", variant: k ? "outline" : "default", className: k ? "cms:-ml-px cms:rounded-l-none" : "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": "More publishing options", children: /* @__PURE__ */ e.jsx(ds, {}) }) }),
              /* @__PURE__ */ e.jsxs(t.DropdownMenuContent, { align: "end", children: [
                /* @__PURE__ */ e.jsxs(t.DropdownMenuItem, { onSelect: () => _(!0), children: [
                  /* @__PURE__ */ e.jsx(Nt, {}),
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
          C.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
        ]
      }
    ),
    c && l.length > 1 && /* @__PURE__ */ e.jsx(
      la,
      {
        entryUrl: f,
        editUrl: `${S}/${c.id}/edit`,
        current: c.locale,
        locales: l,
        canAdd: g.create && !c.trashed,
        canRemove: g.delete && !c.isMain && !c.trashed,
        onRemove: () => w(
          `Remove the ${P(c.locale)} translation of "${o.title}"? Its revisions go with it.`,
          () => y.router.delete(`${f}/translations/${c.locale}`)
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
        /* @__PURE__ */ e.jsx(Vs.Provider, { value: Array.isArray(d) || !d ? {} : d, children: /* @__PURE__ */ e.jsx(
          Ie,
          {
            disabled: !O,
            fields: a,
            values: C.data.data,
            errors: z,
            storageKey: `cms:entry:${s.handle}`,
            shared: n,
            sharedValues: r,
            sharedNote: `Shared by all languages: edit it in ${V ? P(V) : "the main language"}.`,
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
            c.status !== "draft" && c.publishedAt ? ` · ${q(c.publishedAt)}` : ""
          ] }),
          c.status !== "draft" && c.hasUnpublishedChanges && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The draft has changes the site doesn't show yet." }),
          l.find((B) => B.code === c.locale)?.outdated && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-amber-700 cms:dark:text-amber-400", children: [
            "The ",
            V ? P(V) : "main",
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
        v && /* @__PURE__ */ e.jsx(ca, { entryUrl: f, collection: s, settings: v, blueprints: b, disabled: !O }),
        u !== null && s.comments && /* @__PURE__ */ e.jsx(sa, { entryId: c.id, comments: u }),
        /* @__PURE__ */ e.jsxs(t.CollapsibleCard, { title: "Revisions", titleClassName: "cms:text-base", storageKey: "cms:entry:revisions", contentClassName: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
          m !== null && g.update && /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", size: "sm", onClick: () => y.router.post(T(`cms/entry-translations/${m}/undo-restore`), {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(_e, {}),
            " Undo the restore"
          ] }),
          /* @__PURE__ */ e.jsx(y.Deferred, { data: "revisions", fallback: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(t.Skeleton, { className: "cms:h-8" }),
            /* @__PURE__ */ e.jsx(t.Skeleton, { className: "cms:h-8" })
          ] }), children: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            (i ?? []).length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "Each publish keeps one." }),
            (i ?? []).map((B) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
                /* @__PURE__ */ e.jsx("div", { className: "cms:truncate", children: B.title }),
                /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: q(B.createdAt) })
              ] }),
              g.update && !c.trashed && /* @__PURE__ */ e.jsx(
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
      na,
      {
        open: $,
        onClose: () => _(!1),
        processing: C.processing,
        current: c?.publishedAt ?? null,
        onSchedule: (B) => de(B)
      }
    )
  ] });
}
function la({ entryUrl: s, editUrl: a, current: l, locales: n, canAdd: r, canRemove: c, onRemove: o }) {
  return /* @__PURE__ */ e.jsxs("nav", { "aria-label": "Languages", className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
    n.map((i) => {
      const u = `${i.name ?? P(i.code)}${i.main ? " (main)" : ""}`;
      return i.status === null ? r ? /* @__PURE__ */ e.jsxs(
        t.Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "cms:border-dashed",
          onClick: () => y.router.post(`${s}/translations`, { locale: i.code }),
          children: [
            /* @__PURE__ */ e.jsx(G, {}),
            " ",
            u
          ]
        },
        i.code
      ) : null : /* @__PURE__ */ e.jsxs(
        t.Button,
        {
          type: "button",
          size: "sm",
          variant: i.code === l ? "secondary" : "ghost",
          "aria-current": i.code === l ? "page" : void 0,
          onClick: () => i.code !== l && y.router.get(a, { locale: i.code }),
          children: [
            u,
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
    c && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:ml-auto cms:text-destructive", onClick: o, children: "Remove this language" })
  ] });
}
function na({ open: s, onClose: a, onSchedule: l, current: n, processing: r }) {
  const [c, o] = D.useState("");
  return D.useEffect(() => {
    s && o(At(n ? new Date(n) : new Date(Date.now() + 864e5)));
  }, [s, n]), /* @__PURE__ */ e.jsx(t.Dialog, { open: s, onOpenChange: (i) => !i && a(), children: /* @__PURE__ */ e.jsxs(t.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(t.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(t.DialogTitle, { children: "Publish on a date" }),
      /* @__PURE__ */ e.jsx(t.DialogDescription, { children: "The entry goes live then; a date in the past publishes it now with that date." })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "published-at", children: "Date and time" }),
      /* @__PURE__ */ e.jsx(t.DatePicker, { id: "published-at", withTime: !0, required: !0, className: "cms:max-w-none", value: c || null, onChange: (i) => o(i ?? "") }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "In your time zone." })
    ] }),
    /* @__PURE__ */ e.jsxs(t.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "outline", onClick: a, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", disabled: c === "" || r, onClick: () => l(new Date(c).toISOString()), children: "Publish" })
    ] })
  ] }) });
}
function ca({ entryUrl: s, collection: a, settings: l, blueprints: n, disabled: r }) {
  const c = n.length > 1 ? l.blueprint ?? n[0].handle : void 0, o = y.useForm({
    parent_id: l.parentId,
    template: l.template ?? "",
    comments_closed: l.commentsClosed === !0,
    ...c !== void 0 ? { blueprint: c } : {}
  }), i = o.errors;
  return /* @__PURE__ */ e.jsx(t.CollapsibleCard, { title: "Page settings", titleClassName: "cms:text-base", storageKey: "cms:entry:page-settings", hasErrors: Object.keys(i).length > 0, children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: r, className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: [
    a.hierarchical && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "parent", children: "Parent" }),
      /* @__PURE__ */ e.jsx(
        je,
        {
          id: "parent",
          multiple: !1,
          max: 1,
          collections: [a.handle],
          invalid: i.parent_id !== void 0,
          value: o.data.parent_id,
          onChange: (u) => o.setData("parent_id", typeof u == "number" ? u : null)
        }
      ),
      /* @__PURE__ */ e.jsx(M, { message: i.parent_id })
    ] }),
    n.length > 1 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "blueprint", children: "Blueprint" }),
      /* @__PURE__ */ e.jsxs(t.Select, { value: o.data.blueprint, onValueChange: (u) => o.setData("blueprint", u), children: [
        /* @__PURE__ */ e.jsx(t.SelectTrigger, { id: "blueprint", "aria-invalid": i.blueprint !== void 0, children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(t.SelectContent, { children: n.map((u) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: u.handle, children: u.title }, u.handle)) })
      ] }),
      o.data.blueprint !== c && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The fields change in every language; values of fields both blueprints have are kept. Save your draft first: the editor reloads." }),
      /* @__PURE__ */ e.jsx(M, { message: i.blueprint })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "template", children: "Template" }),
      /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: "template",
          className: "cms:font-mono",
          placeholder: "The collection's",
          value: o.data.template,
          onChange: (u) => o.setData("template", u.target.value),
          "aria-invalid": i.template !== void 0
        }
      ),
      /* @__PURE__ */ e.jsx(M, { message: i.template })
    ] }),
    a.comments && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(t.Switch, { id: "comments-open", checked: !o.data.comments_closed, onCheckedChange: (u) => o.setData("comments_closed", !u) }),
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "comments-open", children: "Accept new comments" }),
      /* @__PURE__ */ e.jsx("a", { href: T(`cms/comments?entry=${s.split("/").slice(-1)[0]}`), className: "cms:ml-auto cms:text-muted-foreground cms:underline-offset-4 hover:cms:underline", children: "Comments" })
    ] }),
    o.isDirty && /* @__PURE__ */ e.jsx(
      t.Button,
      {
        type: "button",
        size: "sm",
        disabled: o.processing,
        onClick: () => o.put(`${s}/settings`, { preserveScroll: !0, preserveState: o.data.blueprint === c, onSuccess: () => o.setDefaults() }),
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
  for (let o = l; o < n; o++)
    s[o].depth === r && c.push(o);
  return c;
}
function Qs(s, a, l) {
  const n = re(s, a);
  if (l.length !== n.length || [...l].sort((i, u) => i - u).some((i, u) => i !== n[u]) || n.length === 0) return s.slice();
  const r = n[0], c = Be(s, n[n.length - 1]), o = l.flatMap((i) => s.slice(i, Be(s, i)));
  return [...s.slice(0, r), ...o, ...s.slice(c)];
}
function ra(s, a, l) {
  const n = s.find((c) => c.id === a);
  if (!n) return [];
  const r = l(n);
  return s.filter((c) => l(c) === r).map((c) => c.id);
}
function ia({ collection: s, rows: a }) {
  const [l, n] = D.useState(a);
  D.useEffect(() => n(a), [a]);
  const r = (c, o) => {
    const i = c[o];
    if (!i) return;
    const u = i.parentId ?? null, d = ra(c, i.id, (x) => x.parentId ?? null);
    n(c), y.router.post(
      T("cms/entries/reorder"),
      { collection: s, ids: d, parent_id: u },
      { preserveScroll: !0, preserveState: !0, onError: () => n(a) }
    );
  };
  return /* @__PURE__ */ e.jsx(t.Card, { className: "cms:p-2", children: /* @__PURE__ */ e.jsx(t.SortableList, { items: l, getId: (c) => c.id, onReorder: (c, o, i) => r(c, i), className: "cms:gap-1", children: (c, { handle: o }) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-lg cms:border cms:border-border/70 cms:bg-card cms:p-2 cms:text-sm", children: [
    /* @__PURE__ */ e.jsx(t.SortableHandle, { ...o, label: `Move ${c.title}` }),
    /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium", children: c.title }),
    c.parent && /* @__PURE__ */ e.jsxs("span", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", children: [
      "under ",
      c.parent
    ] }),
    /* @__PURE__ */ e.jsx(t.Badge, { variant: c.status === "published" ? "success" : "secondary", children: X(c.status) })
  ] }) }) });
}
function oa(s, a, l) {
  const n = { ...s, ...a }, r = Object.fromEntries(Object.entries(n.terms).filter(([, o]) => o !== "")), c = {};
  return n.search && (c.search = n.search), n.status && (c.status = n.status), n.author && (c.author = n.author), Object.keys(r).length > 0 && (c.terms = r), n.locale && n.locale !== l && (c.locale = n.locale), n.sort && (c.sort = n.sort), c.per_page = n.perPage, c;
}
function da(s) {
  const a = new URLSearchParams();
  for (const [l, n] of Object.entries(s))
    if (typeof n == "object")
      for (const [r, c] of Object.entries(n)) a.set(`${l}[${r}]`, c);
    else
      a.set(l, String(n));
  return a.toString();
}
function ma(s, a) {
  return s === a ? `-${a}` : s === `-${a}` ? "" : a;
}
function ua(s, a) {
  return s === a ? "asc" : s === `-${a}` ? "desc" : null;
}
function We(s) {
  return [s.search, s.status, s.author, ...Object.values(s.terms)].filter((a) => a !== "").length;
}
const Ce = "__all", ha = [
  { value: "draft", label: "Drafts" },
  { value: "published", label: "Published" },
  { value: "scheduled", label: "Scheduled" },
  { value: "trashed", label: "Trash" }
];
function xa(s) {
  const { collection: a, entries: l, query: n } = s;
  return t.useBreadcrumbs([{ label: a ? a.title : "Entries" }]), !a || !l || !n ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: "Entries" }),
    /* @__PURE__ */ e.jsx(t.PageHeader, { title: "Entries", description: "There are no collections yet. Create one under Structure → Collections, then come back to write its entries." })
  ] }) : /* @__PURE__ */ e.jsx(pa, { ...s, collection: a, entries: l, query: n });
}
function pa({
  collection: s,
  collections: a,
  entries: l,
  query: n,
  columns: r = [],
  filters: c = { authors: [], taxonomies: [], locales: [] },
  links: o = [],
  manualOrder: i = !1,
  perPageOptions: u = [10, 25, 50, 100],
  preferencesKey: d,
  can: x
}) {
  const m = T(`cms/collections/${s.handle}/entries`), h = c.locales[0] ?? n.locale, [v, b] = D.useState(n.search), [g, S] = D.useState([]), [f, N] = D.useState(!1), [w, p] = Q(), { setColumns: $, setPerPage: _ } = t.useTablePreferences(d ?? `table.cms.entries.${s.handle}`, { columns: n.columns, perPage: n.perPage });
  D.useEffect(() => S([]), [l]);
  const C = n.status === "trashed", H = We(n) > 0, V = r.filter((j) => n.columns.includes(j.key)), z = (j = {}) => oa(n, j, h), k = (j) => y.router.get(m, z(j), { preserveState: !0, preserveScroll: !0, replace: !0 });
  D.useEffect(() => {
    if (v === n.search) return;
    const j = window.setTimeout(() => k({ search: v }), 300);
    return () => window.clearTimeout(j);
  }, [v]);
  const A = C ? x?.delete ? [{ action: "restore", label: "Restore" }, { action: "delete", label: "Delete for good", danger: !0 }] : [] : [
    ...x?.publish ? [{ action: "publish", label: "Publish" }, { action: "unpublish", label: "Unpublish" }] : [],
    ...x?.delete ? [{ action: "trash", label: "Move to the trash", danger: !0 }] : []
  ], E = (j, I, F = !1) => {
    const me = () => y.router.post(`${m}/bulk`, { action: j, ids: g }, { preserveScroll: !0 });
    F ? w(`${I}: ${g.length} ${g.length === 1 ? "entry" : "entries"}?${j === "delete" ? " This can't be undone." : ""}`, me) : me();
  }, te = async (j) => {
    const I = new Set(n.columns);
    I.has(j) ? I.delete(j) : I.add(j), await $(r.map((F) => F.key).filter((F) => I.has(F))), y.router.reload({ only: ["entries", "query"] });
  }, U = () => {
    b(""), k({ search: "", status: "", author: "", terms: {} });
  }, O = i && !!x?.update, oe = O && l !== null && l.lastPage <= 1 && l.data.length > 1, de = 1 + V.length + (A.length > 0 ? 1 : 0) + (O ? 1 : 0), B = da(z()), K = [...new Set(o.map((j) => j.group))];
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: s.title }),
    p,
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: s.title,
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          o.length > 0 && /* @__PURE__ */ e.jsxs(t.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(t.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(t.Button, { variant: "outline", children: [
              /* @__PURE__ */ e.jsx(Ct, {}),
              " Go to"
            ] }) }),
            /* @__PURE__ */ e.jsx(t.DropdownMenuContent, { align: "end", className: "cms:min-w-56", children: K.map((j, I) => /* @__PURE__ */ e.jsxs(D.Fragment, { children: [
              I > 0 && /* @__PURE__ */ e.jsx(t.DropdownMenuSeparator, {}),
              /* @__PURE__ */ e.jsx(t.DropdownMenuLabel, { children: j }),
              o.filter((F) => F.group === j).map((F) => /* @__PURE__ */ e.jsx(t.DropdownMenuItem, { asChild: !0, children: F.external ? /* @__PURE__ */ e.jsxs("a", { href: F.href, target: "_blank", rel: "noopener noreferrer", children: [
                F.label,
                " ",
                /* @__PURE__ */ e.jsx(ie, { className: "cms:ml-auto" })
              ] }) : /* @__PURE__ */ e.jsx(y.Link, { href: F.href, children: F.label }) }, F.href))
            ] }, j)) })
          ] }),
          s.listing && !C && /* @__PURE__ */ e.jsx(t.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs(y.Link, { href: T(`cms/collections/${s.handle}/listing`), children: [
            /* @__PURE__ */ e.jsx(_t, {}),
            " Listing page"
          ] }) }),
          l.total > 0 && x?.export && /* @__PURE__ */ e.jsx(t.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: `${m}/export${B ? `?${B}` : ""}`, children: [
            /* @__PURE__ */ e.jsx(fs, {}),
            " Export CSV"
          ] }) }),
          x?.create && !C && /* @__PURE__ */ e.jsx(t.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(y.Link, { href: `${m}/create`, children: [
            /* @__PURE__ */ e.jsx(G, {}),
            " New entry"
          ] }) })
        ] }),
        children: a.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: s.handle, onValueChange: (j) => y.router.get(T(`cms/collections/${j}/entries`)), children: [
          /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Collection", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(t.SelectContent, { children: a.map((j) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: j.handle, children: j.title }, j.handle)) })
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
            onChange: (j) => b(j.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(ke, { label: "Status", value: n.status, options: ha, onChange: (j) => k({ status: j }) }),
      c.authors.length > 0 && /* @__PURE__ */ e.jsx(ke, { label: "Author", value: n.author, options: c.authors, onChange: (j) => k({ author: j }) }),
      c.taxonomies.filter((j) => j.terms.length > 0).map((j) => /* @__PURE__ */ e.jsx(
        ke,
        {
          label: j.title,
          value: n.terms[j.handle] ?? "",
          options: j.terms.map((I) => ({ value: I.value, label: `${"— ".repeat(I.depth)}${I.label}` })),
          onChange: (I) => k({ terms: { ...n.terms, [j.handle]: I } })
        },
        j.handle
      )),
      c.locales.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: n.locale, onValueChange: (j) => k({ locale: j }), children: [
        /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-40", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(t.SelectContent, { children: c.locales.map((j) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: j, children: [
          P(j),
          j === h ? " (main)" : ""
        ] }, j)) })
      ] }),
      H && /* @__PURE__ */ e.jsxs(t.Button, { variant: "ghost", size: "sm", onClick: U, children: [
        /* @__PURE__ */ e.jsx(fe, {}),
        " Clear"
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:ml-auto cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
        g.length > 0 && A.length > 0 && /* @__PURE__ */ e.jsxs("div", { role: "toolbar", "aria-label": "Selected entries", className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsxs("span", { className: "cms:text-sm cms:text-muted-foreground", children: [
            g.length,
            " selected"
          ] }),
          A.map((j) => /* @__PURE__ */ e.jsx(t.Button, { size: "sm", variant: j.danger ? "destructive" : "outline", onClick: () => E(j.action, j.label, j.danger), children: j.label }, j.action))
        ] }),
        oe && /* @__PURE__ */ e.jsxs(t.Button, { variant: f ? "secondary" : "outline", "aria-pressed": f, onClick: () => N(!f), children: [
          /* @__PURE__ */ e.jsx(ls, {}),
          " ",
          f ? "Done" : "Reorder"
        ] }),
        r.length > 0 && /* @__PURE__ */ e.jsxs(t.DropdownMenu, { children: [
          /* @__PURE__ */ e.jsx(t.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(t.Button, { variant: "outline", children: [
            /* @__PURE__ */ e.jsx(St, {}),
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
    f && oe ? /* @__PURE__ */ e.jsx(ia, { collection: s.handle, rows: l.data }) : /* @__PURE__ */ e.jsxs(t.Card, { className: "cms:gap-0 cms:overflow-hidden cms:py-0", children: [
      /* @__PURE__ */ e.jsxs(t.Table, { children: [
        /* @__PURE__ */ e.jsx(t.TableHeader, { className: "cms:bg-muted/60", children: /* @__PURE__ */ e.jsxs(t.TableRow, { className: "cms:hover:bg-transparent", children: [
          A.length > 0 && /* @__PURE__ */ e.jsx(t.TableHead, { className: "cms:w-10", children: /* @__PURE__ */ e.jsx(
            t.Checkbox,
            {
              "aria-label": "Select all on this page",
              checked: l.data.length > 0 && g.length === l.data.length,
              onCheckedChange: (j) => S(j ? l.data.map((I) => I.id) : [])
            }
          ) }),
          /* @__PURE__ */ e.jsx(qe, { label: "Title", sortKey: "title", sort: n.sort, onSort: (j) => k({ sort: j }) }),
          V.map((j) => j.sortable ? /* @__PURE__ */ e.jsx(qe, { label: j.label, sortKey: j.key, sort: n.sort, onSort: (I) => k({ sort: I }) }, j.key) : /* @__PURE__ */ e.jsx(t.TableHead, { children: j.label }, j.key)),
          O && /* @__PURE__ */ e.jsx(t.TableHead, { className: "cms:w-px", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: "Order" }) })
        ] }) }),
        /* @__PURE__ */ e.jsxs(t.TableBody, { children: [
          l.data.length === 0 && /* @__PURE__ */ e.jsx(t.TableRow, { className: "cms:hover:bg-transparent", children: /* @__PURE__ */ e.jsx(t.TableCell, { colSpan: de, className: "cms:h-32 cms:text-center cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx(fa, { trashed: C, filtered: We(C ? { ...n, status: "" } : n) > 0, canCreate: !!x?.create, createUrl: `${m}/create`, onClear: U }) }) }),
          l.data.map((j, I) => /* @__PURE__ */ e.jsxs(t.TableRow, { className: "sunrice-row-in", style: { "--i": I }, "data-state": g.includes(j.id) ? "selected" : void 0, children: [
            A.length > 0 && /* @__PURE__ */ e.jsx(t.TableCell, { children: /* @__PURE__ */ e.jsx(
              t.Checkbox,
              {
                "aria-label": `Select ${j.title}`,
                checked: g.includes(j.id),
                onCheckedChange: (F) => S(F ? [...g, j.id] : g.filter((me) => me !== j.id))
              }
            ) }),
            /* @__PURE__ */ e.jsxs(t.TableCell, { children: [
              /* @__PURE__ */ e.jsx(
                y.Link,
                {
                  href: T(`cms/collections/${s.handle}/entries/${j.id}/edit${n.locale !== h ? `?locale=${encodeURIComponent(n.locale)}` : ""}`),
                  className: "cms:font-medium cms:underline-offset-4 cms:hover:underline",
                  children: j.title
                }
              ),
              (!n.columns.includes("slug") || j.parent) && /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
                !n.columns.includes("slug") && `/${j.slug}`,
                j.parent ? `${n.columns.includes("slug") ? "" : " · "}under ${j.parent}` : ""
              ] })
            ] }),
            V.map((F) => /* @__PURE__ */ e.jsx(t.TableCell, { className: F.key === "status" ? "" : "cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx("div", { className: "cms:max-w-72 cms:truncate", children: /* @__PURE__ */ e.jsx(ga, { row: j, column: F, mainLocale: h }) }) }, F.key)),
            O && /* @__PURE__ */ e.jsx(t.TableCell, { className: "cms:w-px", children: /* @__PURE__ */ e.jsxs("span", { className: "cms:flex", children: [
              /* @__PURE__ */ e.jsx(t.Button, { variant: "ghost", size: "icon", "aria-label": `Move ${j.title} up`, onClick: () => y.router.post(T(`cms/entries/${j.id}/move`), { direction: "up" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(cs, {}) }),
              /* @__PURE__ */ e.jsx(t.Button, { variant: "ghost", size: "icon", "aria-label": `Move ${j.title} down`, onClick: () => y.router.post(T(`cms/entries/${j.id}/move`), { direction: "down" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(ts, {}) })
            ] }) })
          ] }, j.id))
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4 cms:border-t cms:px-6 cms:py-3 cms:text-sm cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-4", children: [
          /* @__PURE__ */ e.jsx("span", { children: l.total === 0 ? "No entries" : `${l.from}–${l.to} of ${l.total}` }),
          /* @__PURE__ */ e.jsxs(t.Select, { value: String(n.perPage), onValueChange: (j) => {
            _(Number(j)), k({ perPage: Number(j) });
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
  const r = ua(l, a);
  return /* @__PURE__ */ e.jsx(t.TableHead, { "aria-sort": r === "asc" ? "ascending" : r === "desc" ? "descending" : void 0, children: /* @__PURE__ */ e.jsxs(
    "button",
    {
      type: "button",
      onClick: () => n(ma(l, a)),
      className: "cms:-ml-2 cms:inline-flex cms:h-8 cms:items-center cms:gap-1 cms:rounded-md cms:px-2 cms:hover:bg-accent cms:hover:text-accent-foreground",
      children: [
        s,
        r === "asc" ? /* @__PURE__ */ e.jsx(cs, { className: "cms:size-3" }) : r === "desc" ? /* @__PURE__ */ e.jsx(ts, { className: "cms:size-3" }) : /* @__PURE__ */ e.jsx(ls, { className: "cms:size-3 cms:opacity-40" })
      ]
    }
  ) });
}
function ga({ row: s, column: a, mainLocale: l }) {
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
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: q(s.publishedAt) });
    case "updated_at":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: q(s.updatedAt) });
    case "created_at":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: q(s.createdAt) });
    default:
      return /* @__PURE__ */ e.jsx("span", { title: s.cells[a.key] ?? void 0, children: s.cells[a.key] ?? "—" });
  }
}
function fa({ trashed: s, filtered: a, canCreate: l, createUrl: n, onClear: r }) {
  return a ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: "Nothing matches these filters." }),
    /* @__PURE__ */ e.jsxs(t.Button, { variant: "outline", size: "sm", onClick: r, children: [
      /* @__PURE__ */ e.jsx(fe, {}),
      " Clear filters"
    ] })
  ] }) : s ? /* @__PURE__ */ e.jsx(e.Fragment, { children: "The trash is empty." }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: "No entries yet." }),
    l && /* @__PURE__ */ e.jsx(t.Button, { size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs(y.Link, { href: n, children: [
      /* @__PURE__ */ e.jsx(G, {}),
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
function ja(s) {
  return /* @__PURE__ */ e.jsx(ba, { ...s }, `${s.locale}:${s.version}:${JSON.stringify([s.values, s.seo])}`);
}
function ba({ collection: s, fields: a, locale: l, locales: n, shared: r, values: c, seo: o, version: i, can: u }) {
  const d = T(`cms/collections/${s.handle}/listing`), x = T(`cms/collections/${s.handle}/entries`);
  t.useBreadcrumbs([{ label: s.title, href: x }, { label: "Listing page" }]);
  const m = y.useForm({ locale: l, data: c, seo: o ?? {}, version: i }), h = m.errors, v = n[0], b = u.update, g = () => m.processing || m.put(d, { preserveScroll: !0 }), S = () => {
    m.transform((f) => ({ ...f, version: null })), m.put(d, { preserveScroll: !0 });
  };
  return t.useUnsavedChanges(m.isDirty, b ? g : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: (f) => {
    f.preventDefault(), g();
  }, className: "cms:flex cms:max-w-3xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: `${s.title}: listing page` }),
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: `${s.title}: listing page`,
        back: { href: x, label: `Back to ${s.title}` },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          n.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: l, onValueChange: (f) => y.router.get(d, { locale: f }), children: [
            /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(t.SelectContent, { children: n.map((f, N) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: f, children: [
              P(f),
              N === 0 ? " (main)" : ""
            ] }, f)) })
          ] }),
          s.url && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: s.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(ie, {}),
            " View"
          ] }) }),
          b && /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", disabled: m.processing, children: [
            m.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
            " Save"
          ] })
        ] }),
        children: m.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      }
    ),
    /* @__PURE__ */ e.jsxs("fieldset", { disabled: !b, className: "cms:flex cms:flex-col cms:gap-6", children: [
      /* @__PURE__ */ e.jsx(Ee, { message: h.version, processing: m.processing, onSaveMine: S }),
      a.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The listing page has no fields of its own: choose a listing blueprint for the collection under Structure → Collections." }) : /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsx(t.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: a.filter((f) => Me(f, { ...c, ...m.data.data })).map((f) => r.includes(f.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
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
          value: m.data.data[f.handle],
          errors: W(h, `data.${f.handle}`),
          onChange: (N) => m.setData("data", { ...m.data.data, [f.handle]: N })
        },
        f.handle
      )) }) })
    ] }),
    /* @__PURE__ */ e.jsx(t.CollapsibleCard, { title: "Search and sharing", titleClassName: "cms:text-base", storageKey: "cms:listing:seo", hasErrors: ae(h, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !b, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(se, { bare: !0, id: "seo", fields: Ae, value: m.data.seo, errors: W(h, "seo"), onChange: (f) => m.setData("seo", f) }) }) })
  ] });
}
function va({ fieldsets: s }) {
  const a = y.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(M, { message: a.fieldset }),
    /* @__PURE__ */ e.jsx(
      Ys,
      {
        noun: "Fieldset",
        base: T("cms/fieldsets"),
        rows: s,
        intro: "Fields shared between blueprints, and the kinds of block of flexible fields."
      }
    )
  ] });
}
function ya(s) {
  return /* @__PURE__ */ e.jsx(Na, { ...s }, `${s.locale}:${s.version}:${JSON.stringify(s.values)}`);
}
function Na({ set: s, fields: a, locale: l, locales: n, shared: r, values: c, version: o, can: i }) {
  const u = T(`cms/globals/${s.handle}`);
  t.useBreadcrumbs([{ label: "Globals", href: T("cms/globals") }, { label: s.title }]);
  const d = y.useForm({ locale: l, data: c, version: o }), x = d.errors, m = n[0], h = t.useEditLock({
    type: "cms.global",
    id: s.id,
    locale: l,
    enabled: i.update,
    noun: "global set",
    leaveTo: T("cms/globals"),
    getUnsaved: () => d.isDirty ? { data: d.data.data } : null
  }), v = i.update && !h.readOnly, b = () => d.processing || d.put(u, { preserveScroll: !0 }), g = () => {
    d.transform((f) => ({ ...f, version: null })), d.put(u, { preserveScroll: !0 });
  }, S = async (f) => {
    const N = await h.loadKept(f);
    N.data && typeof N.data == "object" && d.setData("data", N.data);
  };
  return t.useUnsavedChanges(d.isDirty && !h.takenOver, v ? b : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: (f) => {
    f.preventDefault(), b();
  }, className: "cms:flex cms:max-w-3xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: s.title }),
    h.dialogs,
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: s.title,
        back: { href: T("cms/globals"), label: "Back to globals" },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          n.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: l, onValueChange: (f) => y.router.get(u, { locale: f }), children: [
            /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(t.SelectContent, { children: n.map((f, N) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: f, children: [
              P(f),
              N === 0 ? " (main)" : ""
            ] }, f)) })
          ] }),
          v && /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", disabled: d.processing, children: [
            d.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
            " Save"
          ] })
        ] }),
        children: d.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      }
    ),
    a.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "This global set has no fields: choose a blueprint for it under Structure → Global sets." }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(t.ViewingNotice, { by: h.viewingBy }),
      /* @__PURE__ */ e.jsx(Ee, { message: x.version, processing: d.processing, onSaveMine: g }),
      /* @__PURE__ */ e.jsx(t.KeptEditsNotice, { kept: h.kept, disabled: !v, onLoad: (f) => {
        S(f);
      }, onDiscard: (f) => {
        h.discardKept(f);
      } }),
      /* @__PURE__ */ e.jsx(
        Ie,
        {
          disabled: !v,
          fields: a,
          values: d.data.data,
          errors: x,
          storageKey: `cms:global:${s.handle}`,
          shared: r,
          sharedValues: c,
          sharedNote: `Shared by all languages: edit it in ${m ? P(m) : "the main language"}.`,
          onChange: (f, N) => d.setData("data", { ...d.data.data, [f]: N })
        }
      )
    ] })
  ] });
}
function Sa({ sets: s }) {
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
let Zs = 0;
function Xs(s, a = 0) {
  return s.flatMap(({ children: l, ...n }) => [{ ...n, key: `m${++Zs}`, depth: a }, ...Xs(l ?? [], a + 1)]);
}
function Ca(s) {
  const a = [], l = [{ depth: -1, children: a }];
  for (const { key: n, depth: r, ...c } of s) {
    for (; l.length > 1 && l[l.length - 1].depth >= r; ) l.pop();
    const o = { ...c, children: [] };
    l[l.length - 1].children.push(o), l.push({ depth: r, children: o.children });
  }
  return a;
}
function Fe(s, a) {
  const l = s[a]?.depth ?? 0;
  let n = a + 1;
  for (; n < s.length && s[n].depth > l; ) n++;
  return n;
}
function et(s, a, l) {
  const n = Fe(s, a);
  return s.map((r, c) => c >= a && c < n ? { ...r, depth: r.depth + l } : r);
}
function ka(s, a, l) {
  const n = s[a], r = s[a - 1];
  return !n || !r || n.depth > r.depth || Math.max(...s.slice(a, Fe(s, a)).map((o) => o.depth)) + 1 > l - 1 ? s : et(s, a, 1);
}
function $a(s, a) {
  return (s[a]?.depth ?? 0) === 0 ? s : et(s, a, -1);
}
function wa(s, a) {
  return [...s.slice(0, a), ...s.slice(Fe(s, a))];
}
function ue(s) {
  return { key: `m${++Zs}`, depth: 0, entry_id: null, term_id: null, collection_id: null, target: null, url: null, labels: {}, new_tab: !1, ...s };
}
function Da({ menu: s, items: a, locales: l, limits: n, terms: r, listings: c, can: o }) {
  const i = T(`cms/menus/${s.handle}`);
  t.useBreadcrumbs([{ label: "Menus", href: T("cms/menus") }, { label: s.title }]);
  const [u, d] = D.useState(() => Xs(a)), [x, m] = D.useState(null), h = y.useForm({ items: a }), v = h.errors, [b, g] = D.useState(!1), S = l[0] ?? "en", f = (_) => {
    d(_), g(!0);
  }, N = (_, C) => f(u.map((H, V) => V === _ ? { ...H, ...C } : H)), w = () => {
    h.processing || (h.transform(() => ({ items: Ca(u).map(st) })), h.put(i, { preserveScroll: !0, onSuccess: () => g(!1) }));
  }, p = (_) => {
    _.preventDefault(), w();
  };
  t.useUnsavedChanges(b, o.update ? w : void 0);
  const $ = (_) => /* @__PURE__ */ e.jsx(
    t.SortableList,
    {
      items: re(u, _),
      getId: (C) => u[C].key,
      disabled: !o.update,
      onReorder: (C) => f(Qs(u, _, C)),
      className: _ < 0 ? "cms:gap-1" : "cms:mt-1 cms:gap-1 cms:pl-6",
      children: (C, { handle: H, isOverlay: V }) => {
        const z = u[C];
        return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${V ? "" : "cms:border-border/70"}`, children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2 cms:p-2", children: [
            o.update && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:h-10 cms:shrink-0 cms:items-center", children: /* @__PURE__ */ e.jsx(t.SortableHandle, { ...H, label: `Move ${z.labels[S] || z.target?.title || z.url || "link"}` }) }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
                /* @__PURE__ */ e.jsx(
                  t.Input,
                  {
                    "aria-label": `Label (${P(S)})`,
                    className: "cms:w-full cms:sm:max-w-xs",
                    disabled: !o.update,
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
                o.update && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center", children: [
                  /* @__PURE__ */ e.jsxs("label", { className: "cms:mr-2 cms:flex cms:items-center cms:gap-1.5 cms:text-sm", children: [
                    /* @__PURE__ */ e.jsx(t.Checkbox, { checked: z.new_tab, onCheckedChange: (k) => N(C, { new_tab: k }) }),
                    " New tab"
                  ] }),
                  /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Out a level", disabled: z.depth === 0, onClick: () => f($a(u, C)), children: /* @__PURE__ */ e.jsx(Bt, {}) }),
                  /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "In a level", onClick: () => f(ka(u, C, n.depth)), children: /* @__PURE__ */ e.jsx(zt, {}) }),
                  /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": "Remove, with what's under it", onClick: () => f(wa(u, C)), children: /* @__PURE__ */ e.jsx(R, {}) })
                ] })
              ] }),
              l.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: l.slice(1).map((k) => /* @__PURE__ */ e.jsx(
                t.Input,
                {
                  "aria-label": `Label (${P(k)})`,
                  className: "cms:w-full cms:sm:max-w-xs",
                  disabled: !o.update,
                  placeholder: `${P(k)}: as ${P(S)}`,
                  value: z.labels[k] ?? "",
                  onChange: (A) => N(C, { labels: { ...z.labels, [k]: A.target.value } })
                },
                k
              )) })
            ] })
          ] }),
          !V && re(u, C).length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:px-2 cms:pb-2", children: $(C) })
        ] });
      }
    }
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: p, className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: s.title }),
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: s.title,
        back: { href: T("cms/menus"), label: "Back to menus" },
        actions: o.update && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", disabled: u.length >= n.items, onClick: () => m("entry"), children: [
            /* @__PURE__ */ e.jsx(G, {}),
            " Entry"
          ] }),
          r.length > 0 && /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", disabled: u.length >= n.items, onClick: () => m("term"), children: [
            /* @__PURE__ */ e.jsx(It, {}),
            " Term"
          ] }),
          c.length > 0 && /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", disabled: u.length >= n.items, onClick: () => m("listing"), children: [
            /* @__PURE__ */ e.jsx(Lt, {}),
            " Listing"
          ] }),
          /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", disabled: u.length >= n.items, onClick: () => m("url"), children: [
            /* @__PURE__ */ e.jsx(Tt, {}),
            " Link"
          ] }),
          /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", disabled: h.processing, children: [
            h.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
            " Save"
          ] })
        ] }),
        children: b && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      }
    ),
    /* @__PURE__ */ e.jsx(M, { message: v.items }),
    Object.keys(v).some((_) => _.startsWith("items.")) && /* @__PURE__ */ e.jsxs("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: [
      "Some links need fixing: ",
      Object.values(v).filter(Boolean)[0]
    ] }),
    /* @__PURE__ */ e.jsx(t.Card, { className: "cms:p-2", children: u.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:p-4 cms:text-center cms:text-muted-foreground", children: "No links yet. Add an entry or a link." }) : $(-1) }),
    /* @__PURE__ */ e.jsx(Ba, { kind: x, terms: r, listings: c, onClose: () => m(null), onAdd: (_) => {
      f([...u, _]), m(null);
    }, main: S })
  ] });
}
function st({ target: s, children: a, ...l }) {
  return { ...l, children: a.map(st) };
}
const _a = { entry: "Link to an entry", term: "Link to a term's page", listing: "Link to a listing page", url: "Link to an address" }, Ta = {
  entry: "It follows the entry: its title (unless you give a label) and its address in each language. It shows only while the entry is on the site.",
  term: "The page listing the term's entries, in each language. Its title is the label unless you give one.",
  listing: "The collection's listing page, in each language. The collection's title is the label unless you give one.",
  url: "A web address, a path on this site (/contact), mailto: or tel:."
};
function Ba({ kind: s, terms: a, listings: l, onClose: n, onAdd: r, main: c }) {
  const [o, i] = D.useState(null), [u, d] = D.useState(""), [x, m] = D.useState(""), [h, v] = D.useState("");
  D.useEffect(() => {
    i(null), d(""), m(""), v("");
  }, [s]);
  const b = x.trim() === "" || ct(x.trim()), g = h.trim() ? { [c]: h.trim() } : {}, S = async () => {
    if (s === "entry" && o !== null) {
      const N = await fetch(`${T("cms/entry-picker")}?${ze({ ids: [o], collections: [] })}`, { headers: { Accept: "application/json" }, credentials: "same-origin" }), w = N.ok ? (await N.json()).items[0] : void 0;
      r(ue({ entry_id: o, target: w ? { title: w.title, kind: w.collection, live: w.status === "published" } : null, labels: g }));
    } else if (s === "term" && u !== "") {
      const N = a.find((w) => String(w.id) === u);
      r(ue({ term_id: Number(u), target: N ? { title: N.title, kind: N.taxonomy, live: !0 } : null, labels: g }));
    } else if (s === "listing" && u !== "") {
      const N = l.find((w) => String(w.id) === u);
      r(ue({ collection_id: Number(u), target: N ? { title: N.title, kind: "Listing page", live: !0 } : null, labels: g }));
    } else s === "url" && x.trim() !== "" && b && h.trim() !== "" && r(ue({ url: x.trim(), labels: g }));
  }, f = s === "entry" ? o !== null : s === "url" ? x.trim() !== "" && b && h.trim() !== "" : u !== "";
  return /* @__PURE__ */ e.jsx(t.Dialog, { open: s !== null, onOpenChange: (N) => !N && n(), children: /* @__PURE__ */ e.jsxs(t.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(t.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(t.DialogTitle, { children: s ? _a[s] : "" }),
      /* @__PURE__ */ e.jsx(t.DialogDescription, { children: s ? Ta[s] : "" })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
      s === "entry" && /* @__PURE__ */ e.jsx(
        je,
        {
          id: "menu-entry",
          value: o,
          multiple: !1,
          max: null,
          collections: [],
          invalid: !1,
          onChange: (N) => i(typeof N == "number" ? N : null)
        }
      ),
      (s === "term" || s === "listing") && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "menu-target", children: s === "term" ? "Term" : "Collection" }),
        /* @__PURE__ */ e.jsxs(t.Select, { value: u, onValueChange: d, children: [
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
            onChange: (N) => m(N.target.value)
          }
        ),
        !b && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "This address could run code; use https://, a path, mailto: or tel:." })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(t.Label, { htmlFor: "menu-label", children: [
          "Label",
          s === "url" ? "" : " (optional)"
        ] }),
        /* @__PURE__ */ e.jsx(t.Input, { id: "menu-label", value: h, onChange: (N) => v(N.target.value) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(t.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "outline", onClick: n, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", onClick: () => {
        S();
      }, disabled: !f, children: "Add" })
    ] })
  ] }) });
}
function za({ menus: s }) {
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
const La = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "spam", label: "Spam" },
  { value: "trash", label: "Trash" }
], Ma = { pending: "Pending", approved: "Approved", spam: "Spam" };
function Ia({ tab: s, counts: a, filters: l, collections: n, comments: r, can: c, errors: o = {} }) {
  t.useBreadcrumbs([{ label: "Comments", href: T("cms/comments") }]);
  const [i, u] = D.useState(l.search), [d, x] = D.useState([]), [m, h] = D.useState(null), [v, b] = Q(), g = (p) => {
    const $ = { status: s, search: l.search, collection: l.collection, ...p };
    y.router.get(T("cms/comments"), {
      ...$.status !== "all" ? { status: $.status } : {},
      ...$.search ? { search: $.search } : {},
      ...$.collection ? { collection: $.collection } : {},
      ...l.entry ? { entry: l.entry } : {}
    }, { preserveState: !0, replace: !0, onSuccess: () => x([]) });
  };
  D.useEffect(() => {
    if (i === l.search) return;
    const p = window.setTimeout(() => g({ search: i }), 300);
    return () => window.clearTimeout(p);
  }, [i]);
  const S = (p, $ = {}) => y.router.post(T(p), $, { preserveScroll: !0, onSuccess: () => x([]) }), f = (p, $) => S(`cms/comments/${p.id}/status`, { status: $ }), N = (p) => {
    const $ = () => S("cms/comments/bulk", { action: p, ids: d });
    p === "delete" ? v(`Delete ${d.length} comments for good? This can't be undone.`, $) : $();
  }, w = r.data.length > 0 && d.length === r.data.length;
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
                value: i,
                onChange: (p) => u(p.target.value)
              }
            )
          ] }),
          n.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: l.collection ?? "all", onValueChange: (p) => g({ collection: p === "all" ? null : p }), children: [
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
      /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:underline cms:underline-offset-4", onClick: () => y.router.get(T("cms/comments")), children: "Show all" })
    ] }),
    /* @__PURE__ */ e.jsx(t.Tabs, { value: s, onValueChange: (p) => g({ status: p }), children: /* @__PURE__ */ e.jsx(t.TabsList, { className: "cms:h-auto cms:flex-wrap cms:justify-start", children: La.map((p) => /* @__PURE__ */ e.jsxs(t.TabsTrigger, { value: p.value, children: [
      p.label,
      " ",
      /* @__PURE__ */ e.jsx("span", { className: "cms:ml-1 cms:text-muted-foreground", children: a[p.value] })
    ] }, p.value)) }) }),
    d.length > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2 cms:text-sm", role: "toolbar", "aria-label": "With the selected comments", children: [
      /* @__PURE__ */ e.jsxs("span", { className: "cms:text-muted-foreground", children: [
        d.length,
        " selected"
      ] }),
      c.moderate && s !== "trash" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "outline", onClick: () => N("approve"), children: [
          /* @__PURE__ */ e.jsx(he, {}),
          " Approve"
        ] }),
        /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "outline", onClick: () => N("unapprove"), children: [
          /* @__PURE__ */ e.jsx(_e, {}),
          " Unapprove"
        ] }),
        /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "outline", onClick: () => N("spam"), children: [
          /* @__PURE__ */ e.jsx(De, {}),
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
      /* @__PURE__ */ e.jsx("span", { className: "cms:grid cms:size-10 cms:place-items-center cms:rounded-full cms:bg-muted cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx(Mt, { className: "cms:size-4" }) }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: l.search ? "No comments match." : "No comments here." })
    ] }) : /* @__PURE__ */ e.jsxs(t.Card, { className: "cms:divide-y cms:p-0", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3 cms:px-4 cms:py-2 cms:text-sm cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsx(t.Checkbox, { checked: w, "aria-label": "Select all", onCheckedChange: (p) => x(p ? r.data.map(($) => $.id) : []) }),
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
          t.Checkbox,
          {
            checked: d.includes(p.id),
            "aria-label": `Select ${p.author}'s comment`,
            onCheckedChange: ($) => x($ ? [...d, p.id] : d.filter((_) => _ !== p.id))
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-x-3 cms:gap-y-1 cms:text-sm", children: [
            /* @__PURE__ */ e.jsx("span", { id: `comment-${p.id}-author`, className: "cms:font-medium", children: p.author }),
            p.email && /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", children: p.email }),
            p.member && /* @__PURE__ */ e.jsx(t.Badge, { variant: "outline", children: "Signed in" }),
            !p.trashed && /* @__PURE__ */ e.jsx(t.Badge, { variant: p.status === "approved" ? "success" : p.status === "spam" ? "destructive" : "warning", children: Ma[p.status] }),
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
              /* @__PURE__ */ e.jsx(ie, { className: "cms:inline cms:size-3" })
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
            c.moderate && !p.trashed && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              p.status !== "approved" && /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "ghost", onClick: () => f(p, "approved"), children: [
                /* @__PURE__ */ e.jsx(he, {}),
                " Approve"
              ] }),
              p.status === "approved" && /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "ghost", onClick: () => f(p, "pending"), children: [
                /* @__PURE__ */ e.jsx(_e, {}),
                " Unapprove"
              ] }),
              p.status !== "spam" && /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "ghost", onClick: () => f(p, "spam"), children: [
                /* @__PURE__ */ e.jsx(De, {}),
                " Spam"
              ] }),
              p.status !== "spam" && /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "ghost", onClick: () => h({ row: p, mode: "reply" }), children: [
                /* @__PURE__ */ e.jsx(_s, {}),
                " Reply"
              ] }),
              /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "ghost", onClick: () => h({ row: p, mode: "edit" }), children: [
                /* @__PURE__ */ e.jsx(zs, {}),
                " Edit"
              ] })
            ] }),
            c.delete && !p.trashed && /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "ghost", onClick: () => y.router.delete(T(`cms/comments/${p.id}`), { preserveScroll: !0 }), children: [
              /* @__PURE__ */ e.jsx(R, {}),
              " Trash"
            ] }),
            c.delete && p.trashed && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "ghost", onClick: () => S(`cms/comments/${p.id}/restore`), children: [
                /* @__PURE__ */ e.jsx(xe, {}),
                " Restore"
              ] }),
              /* @__PURE__ */ e.jsxs(t.Button, { size: "sm", variant: "ghost", onClick: () => v(
                "Delete this comment for good? Replies to it stay.",
                () => y.router.delete(T(`cms/comments/${p.id}/force`), { preserveScroll: !0 })
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
      /* @__PURE__ */ e.jsxs(t.Button, { variant: "outline", size: "sm", disabled: !r.prev_page_url, onClick: () => r.prev_page_url && y.router.get(r.prev_page_url), children: [
        /* @__PURE__ */ e.jsx(Le, {}),
        " Newer"
      ] }),
      /* @__PURE__ */ e.jsxs(t.Button, { variant: "outline", size: "sm", disabled: !r.next_page_url, onClick: () => r.next_page_url && y.router.get(r.next_page_url), children: [
        "Older ",
        /* @__PURE__ */ e.jsx(pe, {})
      ] })
    ] }),
    m && /* @__PURE__ */ e.jsx(Aa, { row: m.row, mode: m.mode, error: o.body, onClose: () => h(null) }, `${m.mode}-${m.row.id}`),
    b
  ] });
}
function Aa({ row: s, mode: a, error: l, onClose: n }) {
  const [r, c] = D.useState(a === "edit" ? s.body : ""), [o, i] = D.useState(!1), u = () => {
    i(!0);
    const d = { preserveScroll: !0, onSuccess: n, onFinish: () => i(!1) };
    a === "reply" ? y.router.post(T(`cms/comments/${s.id}/reply`), { body: r }, d) : y.router.put(T(`cms/comments/${s.id}`), { body: r }, d);
  };
  return /* @__PURE__ */ e.jsx(t.Dialog, { open: !0, onOpenChange: (d) => !d && n(), children: /* @__PURE__ */ e.jsxs(t.DialogContent, { children: [
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
        onChange: (d) => c(d.target.value)
      }
    ),
    /* @__PURE__ */ e.jsx(M, { message: l }),
    /* @__PURE__ */ e.jsxs(t.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "outline", onClick: n, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", disabled: r.trim() === "" || o, onClick: u, children: a === "reply" ? "Post reply" : "Save" })
    ] })
  ] }) });
}
const Ea = 3;
function Fa({ form: s, forms: a, submissions: l, can: n }) {
  t.useBreadcrumbs([{ label: "Submissions", href: T("cms/submissions") }, ...s ? [{ label: s.title }] : []]);
  const [r, c] = D.useState(null), [o, i] = Q();
  if (!s || !l)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(y.Head, { title: "Submissions" }),
      /* @__PURE__ */ e.jsx(t.PageHeader, { title: "Submissions", description: "There are no forms yet. Create one under Structure → Forms and put it on a page; what visitors send shows up here." })
    ] });
  const u = (l.data[0]?.rows ?? []).slice(0, Ea), d = (x) => o(
    "Delete this submission for good? It can't be restored.",
    () => y.router.delete(T(`cms/submissions/${x.id}`), { preserveScroll: !0, onSuccess: () => c(null) })
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
        children: a.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: s.handle, onValueChange: (x) => y.router.get(T(`cms/forms/${x}/submissions`)), children: [
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
          /* @__PURE__ */ e.jsx(t.TableCell, { className: "cms:whitespace-nowrap", children: /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:font-medium cms:hover:underline", onClick: () => c(x), children: q(x.createdAt) }) }),
          u.map((m) => /* @__PURE__ */ e.jsx(t.TableCell, { className: "cms:max-w-64 cms:truncate", children: x.rows.find((h) => h.handle === m.handle)?.value }, m.handle))
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
    /* @__PURE__ */ e.jsx(t.Dialog, { open: r !== null, onOpenChange: (x) => !x && c(null), children: /* @__PURE__ */ e.jsxs(t.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto", children: [
      /* @__PURE__ */ e.jsxs(t.DialogHeader, { children: [
        /* @__PURE__ */ e.jsx(t.DialogTitle, { children: s.title }),
        /* @__PURE__ */ e.jsxs(t.DialogDescription, { children: [
          "Sent ",
          q(r?.createdAt ?? null),
          " · ",
          r?.locale.toUpperCase()
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-3 cms:text-sm", children: r?.rows.map((x) => /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: x.label }),
        /* @__PURE__ */ e.jsx("dd", { className: "cms:whitespace-pre-wrap cms:break-words cms:text-muted-foreground", children: x.file ? /* @__PURE__ */ e.jsx("a", { href: x.file, className: "cms:underline cms:underline-offset-4 hover:cms:text-foreground", download: !0, children: x.value }) : x.value || "—" })
      ] }, x.handle)) }),
      r && (r.visitor.ip || r.visitor.userAgent || r.visitor.referrer) && /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-3 cms:border-t cms:pt-3 cms:text-sm", children: [["IP address", r.visitor.ip], ["Browser", r.visitor.userAgent], ["Sent from", r.visitor.referrer]].map(([x, m]) => m && /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: x }),
        /* @__PURE__ */ e.jsx("dd", { className: "cms:break-all cms:text-muted-foreground", children: m })
      ] }, x)) }),
      n.delete && r && /* @__PURE__ */ e.jsx(t.DialogFooter, { children: /* @__PURE__ */ e.jsxs(t.Button, { variant: "destructive", onClick: () => d(r), children: [
        /* @__PURE__ */ e.jsx(R, {}),
        " Delete"
      ] }) })
    ] }) }),
    i
  ] });
}
function Ha(s) {
  return /* @__PURE__ */ e.jsx(Pa, { ...s }, `${s.locale}:${s.version}:${JSON.stringify([s.values, s.seo, s.term.template])}`);
}
function Pa({ taxonomy: s, term: a, translated: l, fields: n, locale: r, locales: c, shared: o, sharedValues: i, values: u, seo: d, version: x, usedBy: m = [] }) {
  const h = T(`cms/taxonomies/${s.handle}/terms`), v = T(`cms/terms/${a.id}/content`);
  t.useBreadcrumbs([{ label: s.title, href: `${h}?locale=${r}` }, { label: a.title }]);
  const b = y.useForm({ locale: r, data: u, seo: d ?? {}, template: a.template ?? "", version: x }), g = b.errors, S = () => b.processing || b.put(v, { preserveScroll: !0 }), f = () => {
    b.transform(($) => ({ ...$, version: null })), b.put(v, { preserveScroll: !0 });
  }, N = t.useEditLock({
    type: "cms.term",
    id: a.id,
    locale: r,
    enabled: l,
    noun: "term",
    leaveTo: `${h}?locale=${r}`,
    getUnsaved: () => b.isDirty ? { data: b.data.data, seo: b.data.seo, template: b.data.template } : null
  }), w = l && !N.readOnly, p = async ($) => {
    const _ = await N.loadKept($);
    b.setData((C) => ({
      ...C,
      data: _.data && typeof _.data == "object" ? _.data : C.data,
      seo: _.seo && typeof _.seo == "object" ? _.seo : C.seo,
      template: typeof _.template == "string" ? _.template : C.template
    }));
  };
  return t.useUnsavedChanges(b.isDirty && !N.takenOver, w ? S : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: ($) => {
    $.preventDefault(), S();
  }, className: "cms:flex cms:max-w-3xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: a.title }),
    N.dialogs,
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: a.title,
        back: { href: `${h}?locale=${r}`, label: `Back to ${s.title}` },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          a.url && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: a.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(ie, {}),
            " View"
          ] }) }),
          c.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: r, onValueChange: ($) => y.router.get(`${h}/${a.id}/edit`, { locale: $ }), children: [
            /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(t.SelectContent, { children: c.map(($, _) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: $, children: [
              P($),
              _ === 0 ? " (main)" : ""
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
        p($);
      }, onDiscard: ($) => {
        N.discardKept($);
      } }),
      /* @__PURE__ */ e.jsx(Ee, { message: g.version, processing: b.processing, onSaveMine: f }),
      /* @__PURE__ */ e.jsx(
        Ie,
        {
          disabled: !w,
          fields: n,
          values: b.data.data,
          errors: g,
          storageKey: `cms:term:${s.handle}`,
          shared: o,
          sharedValues: i,
          sharedNote: `Shared by all languages: edit it in ${P(c[0] ?? "en")}.`,
          onChange: ($, _) => b.setData("data", { ...b.data.data, [$]: _ })
        }
      ),
      /* @__PURE__ */ e.jsx(t.CollapsibleCard, { title: "Search and sharing", titleClassName: "cms:text-base", storageKey: "cms:term:seo", hasErrors: ae(g, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !w, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(se, { bare: !0, id: "seo", fields: Ae, value: b.data.seo, errors: W(g, "seo"), onChange: ($) => b.setData("seo", $) }) }) }),
      /* @__PURE__ */ e.jsxs(t.CollapsibleCard, { title: "Used by", titleClassName: "cms:text-base", storageKey: "cms:term:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
        m.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "No content links here through its fields." }),
        m.map(($) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:gap-2", children: [
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
          hasErrors: g.template !== void 0,
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
                "aria-invalid": g.template !== void 0
              }
            ),
            /* @__PURE__ */ e.jsx(M, { message: g.template })
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
function Ge(s = []) {
  return s.length === 0 ? "" : ` It's used by ${s.slice(0, 5).join("; ")}${s.length > 5 ? ` and ${s.length - 5} more` : ""}.`;
}
function Va({ taxonomy: s, taxonomies: a, terms: l, locales: n, locale: r, trashed: c = !1 }) {
  t.useBreadcrumbs([{ label: s ? s.title : "Terms" }]);
  const [o, i] = Q(), [u, d] = D.useState(null), [x, m] = D.useState(l);
  if (D.useEffect(() => m(l), [l]), !s)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(y.Head, { title: "Terms" }),
      /* @__PURE__ */ e.jsx(t.PageHeader, { title: "Terms", description: "There are no taxonomies yet. Create one under Structure → Taxonomies (categories, tags…), then add its terms here." })
    ] });
  const h = T(`cms/taxonomies/${s.handle}/terms`), v = (g, S) => {
    const f = S.map((N) => x[N].id);
    m(Qs(x, g, S)), y.router.post(
      T("cms/terms/reorder"),
      { taxonomy: s.handle, ids: f, parent_id: g < 0 ? null : x[g].id },
      { preserveScroll: !0, preserveState: !0, onError: () => m(l) }
    );
  }, b = (g) => /* @__PURE__ */ e.jsx(
    t.SortableList,
    {
      items: re(x, g),
      getId: (S) => x[S].id,
      disabled: c,
      onReorder: (S) => v(g, S),
      className: g < 0 ? "cms:gap-1" : "cms:mt-1 cms:gap-1 cms:pl-6",
      children: (S, { handle: f, isOverlay: N }) => {
        const w = x[S];
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
                onClick: () => o(
                  `Delete "${w.fallback}" for good, in every language? Entries lose it.${Ge(w.usedBy)}`,
                  () => y.router.delete(T(`cms/terms/${w.id}/force`), { preserveScroll: !0, data: (w.usedBy ?? []).length > 0 ? { force: 1 } : {} })
                ),
                children: [
                  /* @__PURE__ */ e.jsx(R, {}),
                  " Delete for good"
                ]
              }
            )
          ] }) : u === w.id && !N ? /* @__PURE__ */ e.jsx(
            Je,
            {
              action: T(`cms/terms/${w.id}`),
              method: "put",
              locale: r,
              terms: l,
              hierarchical: s.hierarchical,
              term: w,
              submitLabel: "Save",
              onDone: () => d(null)
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
            /* @__PURE__ */ e.jsx(t.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Rename ${w.fallback}`, onClick: () => d(w.id), children: /* @__PURE__ */ e.jsx(zs, {}) }),
            s.pages && w.title !== null && /* @__PURE__ */ e.jsx(t.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Edit ${w.fallback}'s page`, asChild: !0, children: /* @__PURE__ */ e.jsx(y.Link, { href: T(`cms/taxonomies/${s.handle}/terms/${w.id}/edit`) + `?locale=${r}`, children: /* @__PURE__ */ e.jsx(wt, {}) }) }),
            /* @__PURE__ */ e.jsx(
              t.Button,
              {
                variant: "ghost",
                size: "icon",
                className: "cms:size-8 cms:text-destructive",
                "aria-label": `Move ${w.fallback} to the trash`,
                onClick: () => o(
                  `Move "${w.fallback}" to the trash, with the terms under it? It comes off the site; you can restore it.${Ge(w.usedBy)}`,
                  () => y.router.delete(T(`cms/terms/${w.id}`), { preserveScroll: !0 })
                ),
                children: /* @__PURE__ */ e.jsx(R, {})
              }
            )
          ] }) }),
          !N && !c && re(x, S).length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:px-2 cms:pb-2", children: b(S) })
        ] });
      }
    }
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: s.title }),
    i,
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: s.title,
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(t.Button, { variant: c ? "secondary" : "ghost", size: "sm", onClick: () => y.router.get(h, { locale: r, ...c ? {} : { trashed: 1 } }), children: c ? "Back to terms" : "Trash" }),
          n.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: r, onValueChange: (g) => y.router.get(h, { locale: g, ...c ? { trashed: 1 } : {} }), children: [
            /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(t.SelectContent, { children: n.map((g) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: g, children: P(g) }, g)) })
          ] })
        ] }),
        children: a.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: s.handle, onValueChange: (g) => y.router.get(T(`cms/taxonomies/${g}/terms`)), children: [
          /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Taxonomy", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(t.SelectContent, { children: a.map((g) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: g.handle, children: g.title }, g.handle)) })
        ] })
      }
    ),
    !c && /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsx(t.CardContent, { children: /* @__PURE__ */ e.jsx(
      Je,
      {
        action: h,
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
function Je({ action: s, method: a, locale: l, terms: n, hierarchical: r, term: c, submitLabel: o, onDone: i }) {
  const u = y.useForm({ title: c?.title ?? "", slug: c?.slug ?? "", parent_id: c?.parentId ?? null, locale: l, version: c?.version ?? null }), d = u.errors, x = /* @__PURE__ */ new Set();
  if (c) {
    x.add(c.id);
    const v = n.findIndex((b) => b.id === c.id);
    for (let b = v + 1; b < n.length && (n[b]?.depth ?? 0) > c.depth; b++) x.add(n[b].id);
  }
  const m = (v) => {
    v.preventDefault(), u.submit(a, s, { preserveScroll: !0, onSuccess: () => {
      a === "post" && u.reset("title", "slug"), i?.();
    } });
  }, h = c ? `term-${c.id}` : "new-term";
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: m, className: "cms:grid cms:items-start cms:gap-3 cms:md:grid-cols-[2fr_1.5fr_1.5fr_auto]", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${h}-title`, className: c ? "cms:sr-only" : "", children: "Title" }),
      /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: `${h}-title`,
          value: u.data.title,
          placeholder: c?.fallback,
          required: !0,
          onChange: (v) => u.setData("title", v.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(M, { message: d.title ?? d.version })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${h}-slug`, className: c ? "cms:sr-only" : "", children: "Slug" }),
      /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: `${h}-slug`,
          className: "cms:font-mono",
          value: u.data.slug,
          placeholder: "Made from the title",
          onChange: (v) => u.setData("slug", v.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(M, { message: d.slug })
    ] }),
    r ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${h}-parent`, className: c ? "cms:sr-only" : "", children: "Under" }),
      /* @__PURE__ */ e.jsxs(
        t.Select,
        {
          value: u.data.parent_id === null ? $e : String(u.data.parent_id),
          onValueChange: (v) => u.setData("parent_id", v === $e ? null : Number(v)),
          children: [
            /* @__PURE__ */ e.jsx(t.SelectTrigger, { id: `${h}-parent`, children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(t.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(t.SelectItem, { value: $e, children: "Top level" }),
              n.filter((v) => !x.has(v.id)).map((v) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: String(v.id), children: [
                "— ".repeat(v.depth),
                v.title ?? v.fallback
              ] }, v.id))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ e.jsx(M, { message: d.parent_id })
    ] }) : /* @__PURE__ */ e.jsx("div", {}),
    /* @__PURE__ */ e.jsxs("div", { className: `cms:flex cms:gap-2 ${c ? "" : "cms:md:mt-[17px]"}`, children: [
      /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", disabled: u.processing, children: [
        !c && /* @__PURE__ */ e.jsx(G, {}),
        " ",
        o
      ] }),
      i && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", onClick: i, children: "Cancel" })
    ] })
  ] });
}
tt({
  pages: {
    "Cms/Blueprints/Index": ea,
    "Cms/Blueprints/Form": Xt,
    "Cms/Fieldsets/Index": va,
    "Cms/Entries/Index": xa,
    "Cms/Entries/Editor": ta,
    "Cms/Entries/Listing": ja,
    "Cms/Terms/Index": Va,
    "Cms/Terms/Edit": Ha,
    "Cms/Globals/Index": Sa,
    "Cms/Globals/Edit": ya,
    "Cms/Menus/Index": za,
    "Cms/Menus/Edit": Da,
    "Cms/Comments/Index": Ia,
    "Cms/Submissions/Index": Fa
  }
});
t.registerCommandSource((s, a) => mt(s, a, T));
