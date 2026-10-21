const Ss = globalThis.Sunrice;
if (!Ss) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const e = Ss.modules["react/jsx-runtime"], ks = globalThis.Sunrice;
if (!ks) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const y = ks.modules["@inertiajs/react"], ns = 3;
function Ye() {
  const s = globalThis.Sunrice;
  if (!s)
    throw new Error("[sunrice] This script runs outside the Sunrice admin panel (window.Sunrice is missing).");
  return s;
}
function Qt(s) {
  const l = Ye();
  if (l.version !== ns)
    throw new Error(`[sunrice] This plugin was built for admin runtime ${ns}, but the panel runs ${l.version}. Rebuild it with a matching @sunrice/admin-sdk.`);
  for (const [n, c] of Object.entries(s.pages ?? {}))
    l.registerPage(n, c);
}
function t(s, l = {}) {
  return Ye().t(s, l);
}
function z(s = "") {
  return Ye().adminUrl(s);
}
function ae(s) {
  return { draft: t("Draft"), scheduled: t("Scheduled"), published: t("Published") }[s];
}
function K(s, l) {
  if (!s) return "—";
  const n = new Date(s);
  return Number.isNaN(n.getTime()) ? "—" : n.toLocaleString(document.documentElement.lang || void 0, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
}
function Zt(s, l = /* @__PURE__ */ new Date()) {
  const n = s ? new Date(s) : null;
  if (n && !Number.isNaN(n.getTime()) && n > l) return n;
  const c = new Date(l);
  return c.setDate(c.getDate() + 1), c.setMinutes(0, 0, 0), c;
}
function Cs(s) {
  const l = (n) => String(n).padStart(2, "0");
  return `${s.getFullYear()}-${l(s.getMonth() + 1)}-${l(s.getDate())}T${l(s.getHours())}:${l(s.getMinutes())}`;
}
let Ue = {};
function Xt(s) {
  Ue = s ?? {};
}
function P(s, l) {
  if (Ue[s]) return Ue[s];
  try {
    return new Intl.DisplayNames(l ? [l] : void 0, { type: "language" }).of(s.replace("_", "-")) ?? s;
  } catch {
    return s;
  }
}
function rs(s) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function ea(s, l, n, c) {
  return c && s !== "" && s === rs(l) ? rs(n) : s;
}
function ws(s, l, n) {
  return !s || l.trim() === "" || l.trim() === s ? null : n ? "redirects" : "breaks";
}
const $s = globalThis.Sunrice;
if (!$s) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const D = $s.modules.react;
const sa = (s) => s?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
function ta(s, l, n = []) {
  if (l == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: sa(s),
    size: 24,
    node: l,
    ...n.length > 0 ? { aliases: n } : {}
  };
}
const aa = (s) => {
  let l = "", n = !1;
  for (const c of s) {
    if (c === "-" || c === "_" || c <= " ") {
      n = l.length > 0;
      continue;
    }
    l.length === 0 ? l += c.toLowerCase() : l += n ? c.toUpperCase() : c, n = !1;
  }
  return l;
};
const la = (s) => {
  const l = aa(s);
  return l.charAt(0).toUpperCase() + l.slice(1);
};
const qe = (...s) => s.filter((l, n, c) => !!l && l.trim() !== "" && c.indexOf(l) === n).join(" ").trim();
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
function ze(s) {
  return s != null;
}
function na(s, l = {}) {
  const n = l.attributeNames ?? {}, c = (h) => n[h] ?? h, i = s.size ?? s.width ?? me.width, r = s.size ?? s.height ?? me.height, d = s.aliases?.filter((h) => typeof h == "string" && h.trim() !== "").map((h) => `lucide-${h}`) ?? [], x = [...s.name ? [`lucide-${s.name}`] : [], ...d], u = l.className?.split(" ").filter(Boolean) ?? [], o = l.includeDefaultClasses === !1 ? qe(...u) : qe("lucide", ...x, ...u), p = l.absoluteStrokeWidth ? Number(l.strokeWidth ?? me["stroke-width"]) * Number(s.size ?? s.width ?? me.width) / Number(l.size ?? l.width ?? me.width) : l.strokeWidth ?? me["stroke-width"];
  return [
    "svg",
    {
      ...Object.entries(me).reduce((h, [f, k]) => (h[c(f)] = k, h), {}),
      ..."color" in l && l.color && {
        [c("stroke")]: l.color
      },
      ..."size" in l && ze(l.size) && {
        [c("width")]: l.size,
        [c("height")]: l.size
      },
      ..."width" in l && ze(l.width) && {
        [c("width")]: l.width
      },
      ..."height" in l && ze(l.height) && {
        [c("height")]: l.height
      },
      [c("stroke-width")]: p,
      ...o && {
        [c("class")]: o
      },
      [c("viewBox")]: `0 0 ${i} ${r}`,
      ...l.hasA11yProp === !1 ? {
        [c("aria-hidden")]: "true"
      } : {},
      ..."attributes" in l && l.attributes
    },
    s.node.map((h) => {
      const [f, k, b] = h, N = l.nonScalingStroke ? { [c("vector-effect")]: "non-scaling-stroke", ...k } : k;
      return b ? [f, N, b] : [f, N];
    })
  ];
}
function ra(s, l = {}) {
  return na(s, {
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
const ca = (s) => {
  for (const l in s)
    if (l.startsWith("aria-") || l === "role" || l === "title")
      return !0;
  return !1;
}, ia = D.createContext({}), oa = () => D.useContext(ia), da = D.forwardRef(
  ({
    color: s,
    size: l,
    width: n,
    height: c,
    strokeWidth: i,
    absoluteStrokeWidth: r,
    nonScalingStroke: d,
    className: x = "",
    children: u,
    iconNode: o = [],
    icon: p = {
      node: o,
      aliases: [],
      size: 24
    },
    ...m
  }, h) => {
    const {
      size: f = 24,
      strokeWidth: k = 2,
      absoluteStrokeWidth: b = !1,
      nonScalingStroke: N = !1,
      color: _ = "currentColor",
      className: S = ""
    } = oa() ?? {}, w = !!u || ca(m), [g, B, E = []] = ra(p, {
      color: s ?? _,
      width: n ?? l ?? f,
      height: c ?? l ?? f,
      strokeWidth: i ?? k,
      absoluteStrokeWidth: r ?? b,
      nonScalingStroke: d ?? N,
      className: qe(S, x),
      hasA11yProp: w,
      attributes: m
    });
    return D.createElement(
      g,
      {
        ref: h,
        ...B
      },
      [
        ...E.map(([j, M]) => D.createElement(j, M)),
        ...Array.isArray(u) ? u : [u]
      ]
    );
  }
);
function A(s, l = [], n = []) {
  const c = typeof s == "string" ? ta(s, l, n) : s, i = D.forwardRef(
    ({ className: r, ...d }, x) => D.createElement(da, {
      ref: x,
      icon: c,
      className: r,
      ...d
    })
  );
  return c.name && (i.displayName = la(c.name)), i;
}
const Ds = {
  name: "arrow-down",
  size: 24,
  node: [
    ["path", { d: "M12 5v14", key: "s699le" }],
    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
  ]
};
Ds.node;
const _s = A(Ds);
const Ts = {
  name: "arrow-up-down",
  size: 24,
  node: [
    ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
    ["path", { d: "M17 20V4", key: "1ejh1v" }],
    ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
    ["path", { d: "M7 4v16", key: "1glfcx" }]
  ]
};
Ts.node;
const Bs = A(Ts);
const Ms = {
  name: "arrow-up",
  size: 24,
  node: [
    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
    ["path", { d: "M12 19V5", key: "x0mq9r" }]
  ]
};
Ms.node;
const zs = A(Ms);
const Ls = {
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
Ls.node;
const Ke = A(Ls);
const Is = {
  name: "check",
  size: 24,
  node: [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]
};
Is.node;
const Ce = A(Is);
const As = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
As.node;
const Je = A(As);
const Es = {
  name: "chevron-left",
  size: 24,
  node: [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]]
};
Es.node;
const Qe = A(Es);
const Fs = {
  name: "chevron-right",
  size: 24,
  node: [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]
};
Fs.node;
const ve = A(Fs);
const Hs = {
  name: "chevrons-down-up",
  size: 24,
  node: [
    ["path", { d: "m7 20 5-5 5 5", key: "13a0gw" }],
    ["path", { d: "m7 4 5 5 5-5", key: "1kwcof" }]
  ]
};
Hs.node;
const ma = A(Hs);
const Ps = {
  name: "chevrons-up-down",
  size: 24,
  node: [
    ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
    ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
  ]
};
Ps.node;
const ua = A(Ps);
const Os = {
  name: "columns-3",
  size: 24,
  node: [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M9 3v18", key: "fh3hqa" }],
    ["path", { d: "M15 3v18", key: "14nvp0" }]
  ],
  aliases: ["panels-left-right"]
};
Os.node;
const ha = A(Os);
const Vs = {
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
Vs.node;
const xa = A(Vs);
const Rs = {
  name: "copy",
  size: 24,
  node: [
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
  ]
};
Rs.node;
const pa = A(Rs);
const Us = {
  name: "download",
  size: 24,
  node: [
    ["path", { d: "M12 15V3", key: "m9g1x1" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
  ]
};
Us.node;
const qs = A(Us);
const Ks = {
  name: "ellipsis-vertical",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
    ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
    ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }]
  ],
  aliases: ["more-vertical"]
};
Ks.node;
const ga = A(Ks);
const Ws = {
  name: "ellipsis",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
    ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
    ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
  ],
  aliases: ["more-horizontal"]
};
Ws.node;
const Gs = A(Ws);
const Ys = {
  name: "external-link",
  size: 24,
  node: [
    ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
    ["path", { d: "M10 14 21 3", key: "gplh6r" }],
    ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
  ]
};
Ys.node;
const ge = A(Ys);
const Js = {
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
Js.node;
const fa = A(Js);
const Qs = {
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
Qs.node;
const ja = A(Qs);
const Zs = {
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
Zs.node;
const ba = A(Zs);
const Xs = {
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
Xs.node;
const cs = A(Xs);
const et = {
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
et.node;
const va = A(et);
const st = {
  name: "link-2",
  size: 24,
  node: [
    ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
    ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
    ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
  ]
};
st.node;
const ya = A(st);
const tt = {
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
tt.node;
const Na = A(tt);
const at = {
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
at.node;
const Sa = A(at);
const lt = {
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
lt.node;
const ka = A(lt);
const nt = {
  name: "loader-circle",
  size: 24,
  node: [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  aliases: ["loader-2"]
};
nt.node;
const le = A(nt);
const rt = {
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
rt.node;
const ct = A(rt);
const it = {
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
it.node;
const Ca = A(it);
const ot = {
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
ot.node;
const dt = A(ot);
const mt = {
  name: "plus",
  size: 24,
  node: [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ]
};
mt.node;
const Q = A(mt);
const ut = {
  name: "rotate-ccw",
  size: 24,
  node: [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ]
};
ut.node;
const je = A(ut);
const ht = {
  name: "search",
  size: 24,
  node: [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ]
};
ht.node;
const ye = A(ht);
const xt = {
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
xt.node;
const wa = A(xt);
const pt = {
  name: "settings-2",
  size: 24,
  node: [
    ["path", { d: "M14 17H5", key: "gfn3mx" }],
    ["path", { d: "M19 7h-9", key: "6i9tg" }],
    ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
    ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
  ]
};
pt.node;
const Ze = A(pt);
const gt = {
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
gt.node;
const We = A(gt);
const ft = {
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
ft.node;
const $a = A(ft);
const jt = {
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
jt.node;
const W = A(jt);
const bt = {
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
bt.node;
const Da = A(bt);
const vt = {
  name: "undo-2",
  size: 24,
  node: [
    ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
    ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
  ]
};
vt.node;
const we = A(vt);
const yt = {
  name: "x",
  size: 24,
  node: [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]
};
yt.node;
const _e = A(yt), Nt = globalThis.Sunrice;
if (!Nt) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const a = Nt.modules["@sunrice/admin-sdk/ui"];
function St({ id: s, children: l }) {
  return /* @__PURE__ */ e.jsxs("p", { id: s, className: "cms:flex cms:items-start cms:gap-2 cms:rounded-md cms:border cms:border-amber-500/40 cms:bg-amber-500/10 cms:px-3 cms:py-2 cms:text-sm cms:text-amber-900 cms:dark:text-amber-200", children: [
    /* @__PURE__ */ e.jsx(Da, { className: "cms:mt-0.5 cms:size-4 cms:shrink-0", "aria-hidden": !0 }),
    /* @__PURE__ */ e.jsx("span", { children: l })
  ] });
}
function oe() {
  const [s, l] = D.useState(null), n = /* @__PURE__ */ e.jsx(a.Dialog, { open: s !== null, onOpenChange: (c) => !c && l(null), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
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
  return [(c, i, r = "Delete") => l({ message: c, onConfirm: i, label: r }), n];
}
function ue(s) {
  return s && typeof s == "object" && !Array.isArray(s) ? s : {};
}
function _a(s, l) {
  if (typeof s != "string" || s === "") return "";
  const n = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(s);
  return n ? l ? `${n[1]}T${n[2] ?? "00:00"}` : n[1] ?? "" : "";
}
function is(s) {
  return s === "" ? null : s;
}
function Ta(s) {
  const l = typeof s == "number" ? s : typeof s == "string" && s.trim() !== "" ? Number(s) : NaN;
  return !Number.isFinite(l) || Math.abs(l) < 1e4 ? null : new Intl.NumberFormat("en", { maximumFractionDigits: 20 }).format(l);
}
function Ba(s, l, n, c) {
  return l || s.some((i) => ["none", ""].includes(i.label.trim().toLowerCase()) || i.value.trim().toLowerCase() === "none") ? !1 : !n || !c;
}
function $e(s) {
  return s.some((l) => l.shared === !0 || $e(l.fields ?? []) || (l.blocks ?? []).some((n) => $e(n.fields)));
}
function Ma() {
  return { _hidden: !1 };
}
function Xe(s, l, n = 60) {
  for (const c of s) {
    const i = l[c.handle];
    let r = null;
    ["text", "textarea", "email", "url"].includes(c.type) && typeof i == "string" ? r = i : c.type === "rich_text" && typeof i == "string" ? r = i.replace(/<[^>]*>/g, " ") : c.type === "group" && Array.isArray(c.fields) && (r = Xe(c.fields, ue(i), n));
    const d = (r ?? "").replace(/\s+/g, " ").trim();
    if (d !== "") return d.length > n ? `${d.slice(0, n - 1).trimEnd()}…` : d;
  }
  return null;
}
function za(s) {
  return { type: s, hidden: !1, values: {} };
}
function La(s) {
  const l = s.replace(/[\u0000- \u007f]+/g, ""), n = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(l);
  return n ? ["http", "https", "mailto", "tel"].includes(n[1].toLowerCase()) : !l.includes("\\");
}
function kt({ ids: s, search: l, collections: n }) {
  const c = new URLSearchParams();
  for (const i of s ?? []) c.append("ids[]", String(i));
  l && c.set("search", l);
  for (const i of n) c.append("collections[]", i);
  return c.toString();
}
let Ia = 0;
function Aa(s, l) {
  return s.length === l ? s.slice() : s.length < l ? [...s, ...Array.from({ length: l - s.length }, () => `k${++Ia}`)] : s.slice(0, l);
}
function Ea({ taxonomy: s, q: l, ids: n }) {
  const c = new URLSearchParams({ taxonomy: s });
  l && c.set("q", l);
  for (const i of n ?? []) c.append("ids[]", String(i));
  return c.toString();
}
async function os(s) {
  const l = await fetch(`${z("cms/entries/picker")}?${kt(s)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!l.ok) throw new Error(String(l.status));
  const n = await l.json();
  return { items: n.items, unavailable: n.unavailable ?? [] };
}
function Fa(s) {
  return s.length < 2 ? s[0] ?? "" : t(":items and :last", { items: s.slice(0, -1).join(", "), last: s[s.length - 1] });
}
function Te({ id: s, value: l, multiple: n, max: c, collections: i, invalid: r, onChange: d, emptyHint: x }) {
  const u = l === null ? [] : Array.isArray(l) ? l : [l], [o, p] = D.useState({}), [m, h] = D.useState(""), [f, k] = D.useState(!1), [b, N] = D.useState(null), [_, S] = D.useState([]), [w, g] = D.useState(!1), B = n && c !== null && u.length >= c, E = u.filter(($) => !o[$]).join(",");
  D.useEffect(() => {
    E !== "" && os({ ids: E.split(",").map(Number), collections: i }).then(({ items: $ }) => p((F) => ({ ...F, ...Object.fromEntries($.map((C) => [C.id, C])) }))).catch(() => g(!0));
  }, [E]), D.useEffect(() => {
    if (!f) {
      N(null);
      return;
    }
    const $ = window.setTimeout(() => {
      os({ search: m.trim(), collections: i }).then((F) => {
        N(F.items), S(F.unavailable), g(!1);
      }).catch(() => g(!0));
    }, m.trim() === "" ? 0 : 250);
    return () => window.clearTimeout($);
  }, [m, f]);
  const j = ($) => {
    p((F) => ({ ...F, [$.id]: $ })), d(n ? [...u, $.id] : $.id), h("");
  }, M = ($) => d(n ? $ : $[0] ?? null);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    u.length > 0 && /* @__PURE__ */ e.jsx(a.SortableList, { items: u, getId: ($) => $, getLabel: ($) => o[$]?.title ?? `Entry #${$}`, onReorder: ($) => M($), disabled: !n, className: "cms:gap-1", children: ($, { handle: F }) => {
      const C = o[$];
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-md cms:border cms:bg-card cms:px-2 cms:py-1 cms:text-sm", children: [
        n && /* @__PURE__ */ e.jsx(a.SortableHandle, { ...F, label: t("Move :title", { title: C?.title ?? $ }) }),
        /* @__PURE__ */ e.jsx("span", { className: `cms:min-w-0 cms:flex-1 cms:truncate ${n ? "" : "cms:pl-1"}`, children: C ? C.title : t("Entry #:id", { id: $ }) }),
        C && /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: C.collection }),
        C && /* @__PURE__ */ e.jsx(a.Badge, { variant: C.status === "published" ? "success" : "secondary", children: ae(C.status) }),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            type: "button",
            variant: "ghost",
            size: "icon",
            className: "cms:size-7",
            "aria-label": t("Remove :title", { title: C?.title ?? $ }),
            onClick: () => M(u.filter((H) => H !== $)),
            children: /* @__PURE__ */ e.jsx(_e, {})
          }
        )
      ] });
    } }),
    !B && (n || u.length === 0) && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-md", children: [
      /* @__PURE__ */ e.jsx(ye, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: s,
          className: "cms:pl-9",
          placeholder: t("Search entries by title"),
          "aria-invalid": r,
          value: m,
          autoComplete: "off",
          "aria-expanded": b !== null,
          onFocus: () => k(!0),
          onBlur: () => k(!1),
          onKeyDown: ($) => {
            $.key === "Escape" && f && ($.preventDefault(), k(!1));
          },
          onChange: ($) => {
            h($.target.value), k(!0);
          }
        }
      ),
      b !== null && /* @__PURE__ */ e.jsxs("ul", { role: "listbox", "aria-label": t("Matching entries"), className: "cms:absolute cms:z-10 cms:mt-1 cms:max-h-64 cms:w-full cms:overflow-auto cms:rounded-md cms:border cms:bg-card cms:p-1 cms:shadow-md", children: [
        b.filter(($) => !u.includes($.id)).length === 0 && /* @__PURE__ */ e.jsxs("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: [
          m.trim() === "" ? t("No entries yet.") : t("No entries match."),
          x && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            " ",
            x
          ] })
        ] }),
        _.length > 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: t("Your role can't see entries of :collections: ask an editor to link them.", { collections: Fa(_) }) }),
        b.filter(($) => !u.includes($.id)).map(($) => /* @__PURE__ */ e.jsx("li", { role: "option", "aria-selected": !1, children: /* @__PURE__ */ e.jsxs(
          "button",
          {
            type: "button",
            className: "cms:flex cms:w-full cms:items-center cms:gap-2 cms:rounded cms:px-2 cms:py-1.5 cms:text-left cms:text-sm cms:hover:bg-accent",
            onMouseDown: (F) => F.preventDefault(),
            onClick: () => j($),
            children: [
              /* @__PURE__ */ e.jsx("span", { className: "cms:flex-1 cms:truncate", children: $.title }),
              /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: $.collection })
            ]
          }
        ) }, $.id))
      ] })
    ] }),
    w && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t("Entries could not be loaded. Try again.") })
  ] });
}
const Ct = D.createContext({}), Le = "__none";
async function ds(s) {
  const l = await fetch(`${z("cms/terms/picker")}?${Ea(s)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!l.ok) throw new Error(String(l.status));
  return await l.json();
}
function Ha({ id: s, taxonomy: l, multiple: n, max: c, required: i, invalid: r, value: d, onChange: x }) {
  const u = D.useContext(Ct), o = d === null ? [] : Array.isArray(d) ? d : [d], [p, m] = D.useState(null), [h, f] = D.useState(!1), [k, b] = D.useState(""), [N, _] = D.useState({}), [S, w] = D.useState(!1);
  D.useEffect(() => {
    if (!l) return;
    const C = k.trim(), H = window.setTimeout(() => {
      ds({ taxonomy: l, q: C }).then((V) => {
        m(V.items), V.more && f(!0), w(!1);
      }).catch(() => w(!0));
    }, C === "" ? 0 : 250);
    return () => window.clearTimeout(H);
  }, [l, k]);
  const g = (C) => u[String(C)] ?? N[C] ?? p?.find((H) => H.id === C)?.label, B = p === null ? "" : o.filter((C) => g(C) === void 0).join(",");
  if (D.useEffect(() => {
    !l || B === "" || ds({ taxonomy: l, ids: B.split(",").map(Number) }).then((C) => _((H) => ({ ...H, ...Object.fromEntries(C.items.map((V) => [V.id, V.label])) }))).catch(() => w(!0));
  }, [l, B]), !l) return /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("Choose a taxonomy for this field in its blueprint.") });
  if (p === null) return S ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t("Terms could not be loaded. Try again.") }) : /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-9 cms:w-full cms:max-w-sm" });
  const E = (C) => `${"— ".repeat(C.depth)}${C.label}`, j = n && c !== null && o.length >= c, M = (C) => x(n ? C : C[0] ?? null), $ = h && o.length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-1.5", children: o.map((C) => /* @__PURE__ */ e.jsxs(a.Badge, { variant: "secondary", className: "cms:gap-1 cms:pr-1", children: [
    g(C) ?? t("Term #:id", { id: C }),
    !(i && !n) && /* @__PURE__ */ e.jsx(
      "button",
      {
        type: "button",
        className: "cms:rounded-sm cms:p-0.5 cms:hover:bg-muted",
        "aria-label": t("Remove :title", { title: g(C) ?? C }),
        onClick: () => M(o.filter((H) => H !== C)),
        children: /* @__PURE__ */ e.jsx(_e, { className: "cms:size-3" })
      }
    )
  ] }, C)) }), F = h && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-sm", children: [
    /* @__PURE__ */ e.jsx(ye, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
    /* @__PURE__ */ e.jsx(
      a.Input,
      {
        id: s,
        className: "cms:pl-9",
        placeholder: t("Search terms"),
        autoComplete: "off",
        "aria-invalid": r,
        value: k,
        onChange: (C) => b(C.target.value)
      }
    )
  ] });
  if (!n && !h) {
    const C = o[0], H = C === void 0 || p.some((V) => V.id === C);
    return /* @__PURE__ */ e.jsxs(a.Select, { value: C === void 0 ? Le : String(C), onValueChange: (V) => x(V === Le ? null : Number(V)), children: [
      /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: s, className: "cms:w-full cms:max-w-sm", "aria-invalid": r, children: /* @__PURE__ */ e.jsx(a.SelectValue, { children: C === void 0 ? t("None") : g(C) ?? t("Term #:id", { id: C }) }) }),
      /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
        !i && /* @__PURE__ */ e.jsx(a.SelectItem, { value: Le, children: t("None") }),
        !H && C !== void 0 && /* @__PURE__ */ e.jsx(a.SelectItem, { value: String(C), children: g(C) ?? t("Term #:id", { id: C }) }),
        p.map((V) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: String(V.id), children: E(V) }, V.id))
      ] })
    ] });
  }
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    $,
    F,
    p.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: k.trim() ? t("No terms match.") : t("Nothing to choose from yet.") }) : n ? /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:max-h-72 cms:flex-col cms:gap-2 cms:overflow-auto", children: p.map((C) => {
      const H = o.includes(C.id);
      return /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx(
          a.Checkbox,
          {
            checked: H,
            disabled: !H && j,
            onCheckedChange: (V) => M(V ? [...o, C.id] : o.filter((L) => L !== C.id))
          }
        ),
        E(C)
      ] }, C.id);
    }) }) : /* @__PURE__ */ e.jsx("div", { role: "listbox", "aria-label": t("Terms"), className: "cms:flex cms:max-h-72 cms:flex-col cms:overflow-auto", children: p.map((C) => /* @__PURE__ */ e.jsx(
      a.Button,
      {
        type: "button",
        variant: o[0] === C.id ? "secondary" : "ghost",
        size: "sm",
        className: "cms:justify-start",
        role: "option",
        "aria-selected": o[0] === C.id,
        onClick: () => x(C.id),
        children: E(C)
      },
      C.id
    )) })
  ] });
}
const Pa = (s, l = {}) => s.replace(/:([A-Za-z_]+)/g, (n, c) => l[c] ?? n), Oa = 5;
let Va = 0;
const wt = () => `f${++Va}`;
function $t(s) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function Dt(s) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^[0-9_]+/, "").replace(/_{2,}/g, "_").slice(0, 64);
}
function _t(s, l) {
  const n = new Set(l.map((r) => r.handle)), c = $t(s) || "field";
  let i = c;
  for (let r = 2; n.has(i); r++)
    i = `${c}_${r}`;
  return i;
}
function Tt(s) {
  return (s ?? []).map(({ fields: l, ...n }) => ({
    ...n,
    key: wt(),
    fields: Tt(l),
    handleTouched: !0,
    savedHandle: n.handle
  }));
}
function Bt(s, l) {
  return s.map(({ key: n, handleTouched: c, savedHandle: i, fields: r, ...d }) => ({
    ...d,
    validation: (d.validation ?? []).map((x) => x.trim()).filter((x) => x !== ""),
    ...l(d.type) ? { fields: Bt(r, l) } : {}
  }));
}
function Ra(s, l, n) {
  return { key: wt(), type: s, label: l, handle: _t(l, n), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function ms(s) {
  return s.type !== "fieldset" && s.savedHandle !== void 0 && s.savedHandle !== "" && s.handle !== s.savedHandle ? s.savedHandle : null;
}
function Mt(s) {
  return s.map((l) => ({ ...l, savedHandle: l.handle, fields: Mt(l.fields) }));
}
function us(s, l, n) {
  if (s.handleTouched) return { ...s, label: l };
  const c = n.filter((i) => i.key !== s.key);
  return { ...s, label: l, handle: _t(l || s.type, c) };
}
function pe(s, l) {
  const n = `${l}.`, c = {};
  for (const [i, r] of Object.entries(s))
    i.startsWith(n) && (c[i.slice(n.length)] = r);
  return c;
}
function ee(s, l) {
  const n = s[l];
  return { ...pe(s, l), ...n !== void 0 ? { "": n } : {} };
}
function Be(s, l) {
  return Object.keys(s).filter((n) => n === l || n.startsWith(`${l}.`));
}
function Ne(s, l) {
  return Object.keys(s).some((n) => n === l || n.startsWith(`${l}.`));
}
function Ua(s, l) {
  return l.filter((n) => n.key !== s.key && n.handle !== "" && n.type !== "fieldset");
}
function zt(s, l, n, c = Pa) {
  return s.type === "fieldset" ? null : n?.includes(s.handle) ? c('":handle" is used by the content itself; choose another handle.', { handle: s.handle }) : s.handle !== "" && l.some((i) => i.key !== s.key && i.type !== "fieldset" && i.handle === s.handle) ? c('There is already a field ":handle" here.', { handle: s.handle }) : null;
}
const Ie = [
  { value: "equals", label: "is", needsValue: !0 },
  { value: "not_equals", label: "is not", needsValue: !0 },
  { value: "filled", label: "is filled in", needsValue: !1 },
  { value: "empty", label: "is empty", needsValue: !1 }
];
function hs(s) {
  return s === !0 ? "true" : s === !1 ? "false" : typeof s == "string" || typeof s == "number" ? String(s) : "";
}
function es(s, l) {
  const n = s.condition;
  if (!n) return !0;
  const c = l[n.field], i = c != null && c !== "" && c !== !1 && !(Array.isArray(c) && c.length === 0), r = (Array.isArray(c) ? c : [c]).map(hs).includes(hs(n.value));
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
const Ae = "__none";
function I({ message: s }) {
  return s ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: s }) : null;
}
function Ee(s) {
  const l = s.config?.options;
  return Array.isArray(l) ? l.flatMap((n) => {
    if (typeof n == "string") return [{ value: n, label: n }];
    if (n && typeof n == "object" && typeof n.value == "string") {
      const { value: c, label: i } = n;
      return [{ value: c, label: i || c }];
    }
    return [];
  }) : [];
}
const qa = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function De(s) {
  if (s.label) return s.label;
  const l = s.handle.replace(/_/g, " ");
  return l.charAt(0).toUpperCase() + l.slice(1);
}
function ie({ field: s, value: l, onChange: n, errors: c, id: i, content: r = !1 }) {
  const d = De(s), x = qa.includes(s.type) || ["select", "terms"].includes(s.type) && s.config?.multiple === !0;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", ...x ? { role: "group", "aria-labelledby": `${i}-label` } : {}, children: [
    s.type === "toggle" ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(a.Switch, { id: i, checked: l === !0, onCheckedChange: (u) => n(u) }),
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: i, children: d })
    ] }) : /* @__PURE__ */ e.jsxs(a.Label, { id: `${i}-label`, htmlFor: x ? void 0 : i, children: [
      d,
      s.required && /* @__PURE__ */ e.jsx("span", { className: "cms:text-destructive", children: " *" })
    ] }),
    /* @__PURE__ */ e.jsx(Wa, { field: s, value: l, onChange: n, errors: c, id: i, content: r }),
    ["text", "textarea"].includes(s.type) && te(s, "max") !== void 0 && /* @__PURE__ */ e.jsx(Ka, { length: typeof l == "string" ? [...l].length : 0, max: te(s, "max") ?? 0 }),
    s.instructions && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s.instructions }),
    /* @__PURE__ */ e.jsx(I, { message: c[""] })
  ] });
}
function Ka({ length: s, max: l }) {
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
function Wa({ field: s, value: l, onChange: n, errors: c, id: i, content: r }) {
  const d = c[""] !== void 0;
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
          rows: te(s, "rows") ?? 4,
          onChange: (x) => n(x.target.value)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ e.jsx(a.RichTextEditor, { id: i, labelledBy: `${i}-label`, invalid: d, value: typeof l == "string" ? l : "", onChange: n });
    case "number": {
      const x = Ta(l);
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
            min: te(s, "min"),
            max: te(s, "max"),
            step: te(s, "step") ?? "any",
            onChange: (u) => n(u.target.value === "" ? null : Number(u.target.value))
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
          value: is(_a(l, x)),
          onChange: (u) => n(is(u ?? ""))
        }
      );
    }
    case "select":
      return s.config?.multiple === !0 ? /* @__PURE__ */ e.jsx(
        Ja,
        {
          options: Ee(s),
          value: Array.isArray(l) ? l.map(String) : [],
          onChange: n,
          empty: typeof s.config?.empty == "string" ? s.config.empty : void 0,
          inTickOrder: s.config?.in_tick_order === !0
        }
      ) : /* @__PURE__ */ e.jsx(
        Ya,
        {
          options: Ee(s),
          value: typeof l == "string" ? l : null,
          onChange: n,
          id: i,
          empty: Ba(Ee(s), s.required === !0, typeof s.config?.default == "string" && s.config.default !== "", typeof l == "string" && l !== "")
        }
      );
    case "terms": {
      const x = s.config?.multiple === !0, u = Array.isArray(l) ? l.filter((o) => typeof o == "number") : typeof l == "number" ? l : null;
      return /* @__PURE__ */ e.jsx(
        Ha,
        {
          id: i,
          taxonomy: typeof s.taxonomy == "string" ? s.taxonomy : null,
          multiple: x,
          max: te(s, "max") ?? null,
          required: s.required === !0,
          invalid: d,
          value: x ? Array.isArray(u) ? u : [] : typeof u == "number" ? u : null,
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
          max: te(s, "max") ?? null,
          collections: s.collections ?? [],
          onChange: n,
          value: typeof l == "number" || Array.isArray(l) && l.every((x) => typeof x == "number") ? l : null
        }
      );
    case "link":
      return /* @__PURE__ */ e.jsx(Qa, { label: De(s), value: ue(l), onChange: n, errors: c, id: i, collections: s.collections ?? [] });
    case "media":
      return /* @__PURE__ */ e.jsx(
        a.MediaPickerInput,
        {
          id: i,
          invalid: d,
          disabled: !1,
          multiple: s.config?.multiple === !0,
          max: te(s, "max") ?? null,
          types: Array.isArray(s.config?.types) ? s.config.types : [],
          value: typeof l == "number" || Array.isArray(l) && l.every((x) => typeof x == "number") ? l : null,
          onChange: n
        }
      );
    case "group":
      return /* @__PURE__ */ e.jsx(he, { fields: s.fields ?? [], value: ue(l), onChange: n, errors: c, id: i, content: r });
    case "repeater":
      return /* @__PURE__ */ e.jsx(Za, { field: s, value: Array.isArray(l) ? l : [], onChange: n, errors: c, id: i, content: r });
    case "flexible":
      return /* @__PURE__ */ e.jsx(Xa, { field: s, value: Array.isArray(l) ? l : [], onChange: n, errors: c, id: i });
    default:
      return /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: i,
          "aria-invalid": d,
          value: typeof l == "string" ? l : "",
          placeholder: Ga(s, "placeholder"),
          onChange: (x) => n(x.target.value)
        }
      );
  }
}
function te(s, l) {
  const n = s.config?.[l];
  return typeof n == "number" ? n : void 0;
}
function Ga(s, l) {
  const n = s.config?.[l];
  return typeof n == "string" ? n : void 0;
}
function he({ fields: s, value: l, onChange: n, errors: c, id: i, content: r, bare: d = !1 }) {
  return /* @__PURE__ */ e.jsx("div", { className: d ? "cms:flex cms:flex-col cms:gap-6" : "cms:flex cms:flex-col cms:gap-4 cms:rounded-lg cms:border cms:p-4", children: s.filter((x) => es(x, l)).map((x) => x.shared ? (
    // Greyed out; the form says once, at the top, where to edit shared fields.
    /* @__PURE__ */ e.jsx("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1 cms:opacity-60", title: t("Shared by all languages: edit it in the main language."), children: /* @__PURE__ */ e.jsx(ie, { id: `${i}-${x.handle}`, field: x, value: l[x.handle], content: r, errors: {}, onChange: () => {
    } }) }, x.handle)
  ) : /* @__PURE__ */ e.jsx(
    ie,
    {
      id: `${i}-${x.handle}`,
      field: x,
      value: l[x.handle],
      content: r,
      errors: ee(c, x.handle),
      onChange: (u) => n({ ...l, [x.handle]: u })
    },
    x.handle
  )) });
}
function Ya({ options: s, value: l, onChange: n, id: c, empty: i }) {
  return /* @__PURE__ */ e.jsxs(a.Select, { value: l ?? Ae, onValueChange: (r) => n(r === Ae ? null : r), children: [
    /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: c, className: "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
    /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
      i && /* @__PURE__ */ e.jsx(a.SelectItem, { value: Ae, children: t("None") }),
      s.map((r) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: r.value, children: r.label }, r.value))
    ] })
  ] });
}
function Ja({ options: s, value: l, onChange: n, empty: c, inTickOrder: i = !1 }) {
  return s.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: c ?? t("Nothing to choose from yet.") }) : /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2", children: s.map((r) => /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
    /* @__PURE__ */ e.jsx(
      a.Checkbox,
      {
        checked: l.includes(r.value),
        onCheckedChange: (d) => n(d ? i ? [...l.filter((x) => x !== r.value), r.value] : s.map((x) => x.value).filter((x) => x === r.value || l.includes(x)) : l.filter((x) => x !== r.value))
      }
    ),
    r.label,
    i && l.includes(r.value) && /* @__PURE__ */ e.jsxs("span", { className: "cms:text-xs cms:text-muted-foreground", "aria-label": `number ${l.indexOf(r.value) + 1}`, children: [
      "#",
      l.indexOf(r.value) + 1
    ] })
  ] }, r.value)) });
}
function Qa({ label: s, value: l, onChange: n, errors: c, id: i, collections: r }) {
  const d = l.type === "entry" ? "entry" : "url", x = (u) => {
    const o = { ...l, type: d, ...u }, p = o.type === "entry" ? typeof o.entry_id != "number" : o.url === "" || o.url === void 0 || o.url === null;
    n(p ? o.label || o.new_tab ? o : null : o);
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("div", { role: "radiogroup", "aria-label": t(":field: link to", { field: s }), className: "cms:inline-flex cms:w-fit cms:rounded-md cms:border cms:p-0.5", children: ["url", "entry"].map((u) => /* @__PURE__ */ e.jsx(
      a.Button,
      {
        type: "button",
        size: "sm",
        role: "radio",
        "aria-checked": d === u,
        variant: d === u ? "secondary" : "ghost",
        onClick: () => x({ type: u, url: u === "url" ? l.url : void 0, entry_id: u === "entry" ? l.entry_id : void 0 }),
        children: t(u === "url" ? "Address" : "Entry")
      },
      u
    )) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-2 cms:md:grid-cols-[2fr_1fr_auto] cms:md:items-start", children: [
      d === "url" ? /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: i,
          "aria-label": t(":field: address", { field: s }),
          placeholder: t("https://… or /about"),
          value: typeof l.url == "string" ? l.url : "",
          onChange: (u) => x({ url: u.target.value }),
          "aria-invalid": c.url !== void 0
        }
      ) : /* @__PURE__ */ e.jsx(
        Te,
        {
          id: i,
          invalid: c.entry_id !== void 0,
          multiple: !1,
          max: null,
          collections: r,
          value: typeof l.entry_id == "number" ? l.entry_id : null,
          onChange: (u) => x({ entry_id: typeof u == "number" ? u : void 0 })
        }
      ),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          "aria-label": t(":field: link text", { field: s }),
          placeholder: t(d === "entry" ? "Link text (the entry's title)" : "Link text"),
          value: typeof l.label == "string" ? l.label : "",
          onChange: (u) => x({ label: u.target.value })
        }
      ),
      /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:h-9 cms:items-center cms:gap-2 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx(a.Checkbox, { checked: l.new_tab === !0, onCheckedChange: (u) => x({ new_tab: u }) }),
        t("New tab")
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ e.jsx(I, { message: c.url ?? c.entry_id ?? c.label ?? c.type }) })
    ] })
  ] });
}
function xs(s, l) {
  return !l && (s.fields ?? []).every((n) => n.type === "text");
}
function Lt(s) {
  const l = D.useRef([]);
  return l.current = Aa(l.current, s), {
    keys: l.current,
    remove: (n) => {
      l.current = l.current.filter((c, i) => i !== n);
    },
    move: (n, c) => {
      l.current = a.moveItem(l.current, n, c);
    }
  };
}
function It() {
  const [s, l] = D.useState(() => /* @__PURE__ */ new Set());
  return {
    isCollapsed: (n, c) => !c && s.has(n),
    toggle: (n) => l((c) => {
      const i = new Set(c);
      return i.delete(n) || i.add(n), i;
    }),
    setAll: (n, c) => l(c ? new Set(n) : /* @__PURE__ */ new Set()),
    anyOpen: (n) => n.some((c) => !s.has(c))
  };
}
function At({ keys: s, folding: l }) {
  if (s.length < 2) return null;
  const n = l.anyOpen(s);
  return /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => l.setAll(s, n), children: [
    n ? /* @__PURE__ */ e.jsx(ma, {}) : /* @__PURE__ */ e.jsx(ua, {}),
    " ",
    t(n ? "Collapse all" : "Expand all")
  ] });
}
function Za({ field: s, value: l, onChange: n, errors: c, id: i, content: r = !1 }) {
  const d = s.fields ?? [], x = l.map(ue), u = Lt(x.length), o = (b, N) => n(x.map((_, S) => S === b ? N : _)), p = (b) => {
    u.remove(b), n(x.filter((N, _) => _ !== b));
  }, m = s.label ? s.label.toLowerCase().replace(/s$/, "") : t("row"), h = m.charAt(0).toUpperCase() + m.slice(1), f = x.map((b, N) => ({ row: b, index: N, key: u.keys[N] ?? String(N) })), k = It();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(
      a.SortableList,
      {
        items: f,
        getId: (b) => b.key,
        getLabel: (b) => `${m} ${b.index + 1}`,
        onReorder: (b, N, _) => {
          u.move(N, _), n(b.map((S) => S.row));
        },
        children: ({ row: b, index: N, key: _ }, { handle: S }) => xs(s, r) ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(a.SortableHandle, { ...S, label: t("Move :item :number", { item: m, number: N + 1 }), className: "cms:mt-1" }),
          d.map((w) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                "aria-label": w.label || w.handle,
                placeholder: w.label || w.handle,
                value: typeof b[w.handle] == "string" ? b[w.handle] : "",
                onChange: (g) => o(N, { ...b, [w.handle]: g.target.value })
              }
            ),
            /* @__PURE__ */ e.jsx(I, { message: c[`${N}.${w.handle}`] })
          ] }, w.handle)),
          /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": t("Remove :item :number", { item: m, number: N + 1 }), onClick: () => p(N), children: /* @__PURE__ */ e.jsx(W, {}) })
        ] }) : (() => {
          const w = ee(c, String(N)), g = k.isCollapsed(_, Object.keys(w).length > 0);
          return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              Et,
              {
                label: `${h} ${N + 1}`,
                summary: Xe(d, b),
                handle: S,
                onRemove: () => p(N),
                collapsed: g,
                onToggle: () => k.toggle(_),
                controls: `${i}-${N}-fields`,
                hidden: r ? b._hidden === !0 : void 0,
                onHidden: (B) => o(N, { ...b, _hidden: B })
              }
            ),
            /* @__PURE__ */ e.jsx("div", { id: `${i}-${N}-fields`, hidden: g, children: !g && /* @__PURE__ */ e.jsx(he, { fields: d, value: b, onChange: (B) => o(N, B), errors: w, id: `${i}-${N}`, content: r }) })
          ] });
        })()
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => n([...x, r ? Ma() : {}]), children: [
        /* @__PURE__ */ e.jsx(Q, {}),
        " ",
        t("Add :item", { item: m })
      ] }),
      !xs(s, r) && /* @__PURE__ */ e.jsx(At, { keys: f.map((b) => b.key), folding: k })
    ] })
  ] });
}
function Xa({ field: s, value: l, onChange: n, errors: c, id: i }) {
  const r = s.blocks ?? [], d = l.map(ue), x = Lt(d.length), u = (h, f) => n(d.map((k, b) => b === h ? f : k)), o = (h) => {
    x.remove(h), n(d.filter((f, k) => k !== h));
  }, p = d.map((h, f) => ({ block: h, index: f, key: x.keys[f] ?? String(f) })), m = It();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    /* @__PURE__ */ e.jsx(
      a.SortableList,
      {
        items: p,
        getId: (h) => h.key,
        className: "cms:gap-3",
        getLabel: (h) => t(":type block", { type: r.find((f) => f.type === h.block.type)?.label ?? String(h.block.type) }),
        onReorder: (h, f, k) => {
          x.move(f, k), n(h.map((b) => b.block));
        },
        children: ({ block: h, index: f, key: k }, { handle: b }) => {
          const N = r.find((w) => w.type === h.type), _ = ee(c, `${f}.values`), S = m.isCollapsed(k, Object.keys(_).length > 0 || c[`${f}.type`] !== void 0);
          return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              Et,
              {
                label: N?.label ?? String(h.type),
                summary: N ? Xe(N.fields, ue(h.values)) : null,
                badge: !0,
                handle: b,
                onRemove: () => o(f),
                collapsed: S,
                onToggle: () => m.toggle(k),
                controls: `${i}-${f}-fields`,
                hidden: h.hidden === !0,
                onHidden: (w) => u(f, { ...h, hidden: w })
              }
            ),
            /* @__PURE__ */ e.jsx("div", { id: `${i}-${f}-fields`, hidden: S, children: S ? null : N ? /* @__PURE__ */ e.jsx(
              he,
              {
                fields: N.fields,
                value: ue(h.values),
                onChange: (w) => u(f, { ...h, values: w }),
                errors: _,
                id: `${i}-${f}`,
                content: !0
              }
            ) : /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: t("This kind of block no longer exists. Its values are kept.") }) }),
            /* @__PURE__ */ e.jsx(I, { message: c[`${f}.type`] })
          ] });
        }
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
        /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", disabled: r.length === 0, children: [
          /* @__PURE__ */ e.jsx(Q, {}),
          " ",
          t("Add block")
        ] }) }),
        /* @__PURE__ */ e.jsx(a.DropdownMenuContent, { align: "start", children: r.map((h) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => n([...d, za(h.type)]), children: h.label }, h.type)) })
      ] }),
      /* @__PURE__ */ e.jsx(At, { keys: p.map((h) => h.key), folding: m })
    ] })
  ] });
}
function Et({ label: s, summary: l, badge: n = !1, handle: c, onRemove: i, collapsed: r, onToggle: d, controls: x, hidden: u, onHidden: o }) {
  const p = r ? ve : Je, m = l ? `${s}: ${l}` : s;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(a.SortableHandle, { ...c, label: t("Move :title", { title: m }) }),
    /* @__PURE__ */ e.jsxs(
      "button",
      {
        type: "button",
        onClick: d,
        "aria-expanded": !r,
        "aria-controls": x,
        className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:rounded-md cms:text-left cms:outline-none cms:focus-visible:ring-2 cms:focus-visible:ring-ring",
        children: [
          /* @__PURE__ */ e.jsx(p, { className: "cms:size-4 cms:shrink-0 cms:text-muted-foreground", "aria-hidden": !0 }),
          n ? /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: s }) : /* @__PURE__ */ e.jsx("span", { className: "cms:shrink-0 cms:text-sm cms:font-medium", children: s }),
          l && /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:text-sm cms:text-muted-foreground", children: l }),
          /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: r ? t("(collapsed)") : "" })
        ]
      }
    ),
    u !== void 0 && /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:shrink-0 cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", title: t("Off: kept here, but left out of the page"), children: [
      /* @__PURE__ */ e.jsx(a.Switch, { checked: !u, onCheckedChange: (h) => o(!h), "aria-label": t(":title: visible on site", { title: m }) }),
      t("Visible on site")
    ] }),
    /* @__PURE__ */ e.jsx(
      a.Button,
      {
        type: "button",
        variant: "ghost",
        size: "icon",
        className: "cms:size-8 cms:shrink-0 cms:text-destructive",
        "aria-label": t("Remove :title", { title: m }),
        onClick: i,
        children: /* @__PURE__ */ e.jsx(W, {})
      }
    )
  ] });
}
function Ft({ fields: s, onChange: l, types: n, errors: c, depth: i = 1, idPrefix: r = "field", reserved: d, locales: x = [] }) {
  const [u, o] = D.useState(() => /* @__PURE__ */ new Set()), p = (f) => o((k) => {
    const b = new Set(k);
    return b.has(f) ? b.delete(f) : b.add(f), b;
  }), m = (f, k) => l(s.map((b, N) => N === f ? k : b)), h = (f) => {
    const k = Ra(f.type, f.label, s);
    l([...s, k]), o(/* @__PURE__ */ new Set([k.key]));
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:border-dashed cms:p-4 cms:text-sm cms:text-muted-foreground", children: t("No fields yet.") }),
    s.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:justify-end", children: u.size > 0 ? /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => o(/* @__PURE__ */ new Set()), children: t("Close all") }) : /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => o(new Set(s.map((f) => f.key))), children: t("Open all") }) }),
    /* @__PURE__ */ e.jsx(a.SortableList, { items: s, getId: (f) => f.key, getLabel: (f) => f.label || f.handle, onReorder: (f) => l(f), children: (f, { index: k, handle: b, isOverlay: N }) => {
      const _ = n.find((B) => B.type === f.type), S = Ne(c, String(k)) || zt(f, s, d) !== null, w = !N && (u.has(f.key) || S), g = `${r}-${f.key}`;
      return /* @__PURE__ */ e.jsxs("div", { "data-invalid": S ? "true" : void 0, className: `cms:rounded-lg cms:border cms:bg-card ${S ? "cms:border-destructive" : ""}`, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:p-2", children: [
          /* @__PURE__ */ e.jsx(a.SortableHandle, { ...b, label: t("Move :title", { title: f.label || f.handle }) }),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-expanded": w,
              "aria-controls": g,
              "aria-label": w ? t("Close :title", { title: f.label || f.handle }) : t("Open :title", { title: f.label || f.handle }),
              onClick: () => p(f.key),
              children: w ? /* @__PURE__ */ e.jsx(Je, {}) : /* @__PURE__ */ e.jsx(ve, {})
            }
          ),
          /* @__PURE__ */ e.jsxs("button", { type: "button", className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:text-left", onClick: () => p(f.key), children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: f.label || f.handle }),
            /* @__PURE__ */ e.jsx("code", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", children: f.handle })
          ] }),
          f.required && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", children: t("Required") }),
          /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: _?.label ?? f.type }),
          _?.hasChildren && f.fields.length > 0 && !w && /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: t(":count inside", { count: f.fields.length }) }),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": t("Remove :title", { title: f.label || f.handle }),
              onClick: () => l(s.filter((B, E) => E !== k)),
              children: /* @__PURE__ */ e.jsx(W, {})
            }
          )
        ] }),
        w && /* @__PURE__ */ e.jsx(
          el,
          {
            id: g,
            field: f,
            type: _,
            siblings: s,
            onChange: (B) => m(k, B),
            types: n,
            errors: pe(c, String(k)),
            depth: i,
            reserved: d,
            locales: x
          }
        )
      ] });
    } }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", children: [
        /* @__PURE__ */ e.jsx(Q, {}),
        " ",
        t("Add field")
      ] }) }),
      /* @__PURE__ */ e.jsx(a.DropdownMenuContent, { align: "start", children: n.filter((f) => !f.hasChildren || i < Oa).map((f) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => h(f), children: f.label }, f.type)) })
    ] }) })
  ] });
}
const re = { default: "__default", yes: "yes", no: "no" };
function el({ id: s, field: l, type: n, siblings: c, onChange: i, types: r, errors: d, depth: x, reserved: u, locales: o }) {
  const p = l.config ?? {}, m = zt(l, c, u, t);
  return l.type === "fieldset" ? /* @__PURE__ */ e.jsxs("div", { id: s, className: "cms:flex cms:flex-col cms:gap-4 cms:border-t cms:p-4", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-label`, children: t("Label") }),
        /* @__PURE__ */ e.jsx(a.Input, { id: `${s}-label`, value: l.label ?? "", onChange: (h) => i(us(l, h.target.value, c)) }),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("Only shown here, in the builder.") })
      ] }),
      n?.settings.map((h) => /* @__PURE__ */ e.jsx(
        ie,
        {
          id: `${s}-config-${h.handle}`,
          field: h,
          value: p[h.handle],
          errors: ee(d, `config.${h.handle}`),
          onChange: (f) => i({ ...l, config: { ...p, [h.handle]: f } })
        },
        h.handle
      ))
    ] }),
    /* @__PURE__ */ e.jsx(I, { message: d.handle ?? d.type })
  ] }) : /* @__PURE__ */ e.jsxs("div", { id: s, className: "cms:flex cms:flex-col cms:gap-4 cms:border-t cms:p-4", children: [
    !n && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t(`The field type ":type" isn't registered. Its data is kept; register the type or remove the field.`, { type: l.type }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-label`, children: t("Label") }),
        /* @__PURE__ */ e.jsx(a.Input, { id: `${s}-label`, value: l.label ?? "", onChange: (h) => i(us(l, h.target.value, c)) }),
        /* @__PURE__ */ e.jsx(I, { message: d.label })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-handle`, children: t("Handle") }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: `${s}-handle`,
            className: "cms:font-mono",
            value: l.handle,
            onChange: (h) => i({ ...l, handle: Dt(h.target.value), handleTouched: !0 })
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("How templates read it. Renaming it hides values saved under the old one.") }),
        /* @__PURE__ */ e.jsx("div", { "aria-live": "polite", children: ms(l) !== null && /* @__PURE__ */ e.jsx(St, { children: t(`Content saved under ":old" won't show under the new handle, and templates that read ":old" get nothing. To keep it, put back ":old", save, and run php artisan sunrice:rename-field, which renames the field and moves its values.`, { old: ms(l) ?? "" }) }) }),
        /* @__PURE__ */ e.jsx(I, { message: d.handle ?? m ?? void 0 })
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
      /* @__PURE__ */ e.jsx(I, { message: d.instructions })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-6", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Switch, { id: `${s}-required`, checked: l.required === !0, onCheckedChange: (h) => i({ ...l, required: h }) }),
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-required`, children: t("Required") })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-translatable`, children: t("Per language") }),
        /* @__PURE__ */ e.jsxs(
          a.Select,
          {
            value: l.translatable === !0 ? re.yes : l.translatable === !1 ? re.no : re.default,
            onValueChange: (h) => i({ ...l, translatable: h === re.yes ? !0 : h === re.no ? !1 : null }),
            children: [
              /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: `${s}-translatable`, className: "cms:w-48", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
              /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: re.default, children: t("As the type decides") }),
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: re.yes, children: t("Yes, translated") }),
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: re.no, children: t("No, shared") })
              ] })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(al, { id: s, field: l, siblings: c, onChange: i, errors: pe(d, "condition") }),
    o.length > 0 && /* @__PURE__ */ e.jsx(sl, { id: s, field: l, locales: o, onChange: i, errors: pe(d, "translations") }),
    (n?.settings.length ?? 0) > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: n?.settings.map((h) => /* @__PURE__ */ e.jsx(
      ie,
      {
        id: `${s}-config-${h.handle}`,
        field: h,
        value: p[h.handle],
        errors: ee(d, `config.${h.handle}`),
        onChange: (f) => i({ ...l, config: { ...p, [h.handle]: f } })
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
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: ll(t("Optional checks, one per line, such as :email or :max (for developers: Laravel validation rules)."), { email: "email", max: "max:100" }) }),
      /* @__PURE__ */ e.jsx(I, { message: d.validation ?? Object.entries(d).find(([h]) => h.startsWith("validation."))?.[1] })
    ] }),
    n?.hasChildren && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { children: t("Fields inside") }),
      /* @__PURE__ */ e.jsx(
        Ft,
        {
          fields: l.fields,
          onChange: (h) => i({ ...l, fields: h }),
          types: r,
          errors: pe(d, "fields"),
          depth: x + 1,
          idPrefix: s,
          locales: o
        }
      ),
      /* @__PURE__ */ e.jsx(I, { message: d.fields })
    ] }),
    /* @__PURE__ */ e.jsx(I, { message: d.type })
  ] });
}
function sl({ id: s, field: l, locales: n, onChange: c, errors: i }) {
  const r = l.translations ?? {}, d = l.type === "select" && Array.isArray(l.config?.options) ? l.config.options.filter((o) => typeof o?.value == "string" && o.value !== "") : [], x = (o, p) => {
    const m = { ...r, [o]: { ...r[o], ...p } };
    c({ ...l, translations: m });
  }, u = Object.entries(i).find(([, o]) => o)?.[1];
  return /* @__PURE__ */ e.jsxs("details", { className: "cms:rounded-lg cms:border cms:p-3", open: Object.keys(r).length > 0 || u !== void 0, children: [
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
            value: r[o]?.label ?? "",
            placeholder: l.label ?? "",
            onChange: (m) => x(o, { label: m.target.value })
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
            value: r[o]?.instructions ?? "",
            placeholder: l.instructions ?? "",
            onChange: (m) => x(o, { instructions: m.target.value })
          }
        )
      ] }),
      d.length > 0 && /* @__PURE__ */ e.jsxs("fieldset", { className: "cms:flex cms:flex-col cms:gap-2 cms:md:col-span-2", children: [
        /* @__PURE__ */ e.jsxs("legend", { className: "cms:text-sm cms:font-medium", children: [
          "Options (",
          p,
          ")"
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-2 cms:sm:grid-cols-2", children: d.map((m) => {
          const h = String(m.value);
          return /* @__PURE__ */ e.jsx(
            a.Input,
            {
              "aria-label": `${h} (${p})`,
              value: r[o]?.options?.[h] ?? "",
              placeholder: typeof m.label == "string" && m.label !== "" ? m.label : h,
              onChange: (f) => x(o, { options: { ...r[o]?.options, [h]: f.target.value } })
            },
            h
          );
        }) })
      ] })
    ] }, o)) }),
    /* @__PURE__ */ e.jsx(I, { message: u })
  ] });
}
const Fe = "__always";
function tl(s) {
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
function al({ id: s, field: l, siblings: n, onChange: c, errors: i }) {
  const r = Ua(l, n), d = l.condition ?? null, x = Ie.find((o) => o.value === d?.operator) ?? Ie[0], u = (o) => c({ ...l, condition: o === null ? null : { field: d?.field ?? r[0]?.handle ?? "", operator: d?.operator ?? "equals", value: d?.value ?? "", ...o } });
  return r.length === 0 && d === null ? null : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-condition`, children: t("Show") }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(a.Select, { value: d?.field ?? Fe, onValueChange: (o) => u(o === Fe ? null : { field: o }), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: `${s}-condition`, className: "cms:w-56", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
          /* @__PURE__ */ e.jsx(a.SelectItem, { value: Fe, children: t("Always") }),
          r.map((o) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: o.handle, children: t("When :field", { field: o.label || o.handle }) }, o.key))
        ] })
      ] }),
      d && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(a.Select, { value: x.value, onValueChange: (o) => u({ operator: o }), children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { "aria-label": t("How to compare"), className: "cms:w-36", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: Ie.map((o) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: o.value, children: tl(o.value) }, o.value)) })
        ] }),
        x.needsValue && /* @__PURE__ */ e.jsx(
          a.Input,
          {
            "aria-label": t("Value"),
            className: "cms:w-48",
            placeholder: t("a value, or true / false"),
            value: String(d.value ?? ""),
            onChange: (o) => u({ value: o.target.value })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("A hidden field isn't required, and keeps what it had.") }),
    /* @__PURE__ */ e.jsx(I, { message: i.field ?? i.operator ?? i.value ?? i[""] })
  ] });
}
function ll(s, l) {
  return s.split(/(:[a-z_]+)/).map((n, c) => {
    const i = l[n.slice(1)];
    return n.startsWith(":") && i !== void 0 ? /* @__PURE__ */ e.jsx("code", { children: i }, c) : n;
  });
}
function nl(s, l) {
  return t(s === "fieldset" ? l ? "Set when it was created: flexible blocks keep it with what they hold." : "Lowercase letters, digits and underscores. It can't change later: flexible blocks keep it with what they hold." : l ? "Changing it updates the collections, taxonomies, global sets, forms and entries that use it." : "Lowercase letters, digits and underscores, made from the title until you type one.");
}
function ps({ kind: s = "blueprint", blueprint: l, fieldTypes: n, locales: c = [], usedBy: i = [], reserved: r = [] }) {
  const d = s === "fieldset", x = z(d ? "cms/fieldsets" : "cms/blueprints"), u = l ? l.title : t(d ? "New fieldset" : "New blueprint");
  a.useBreadcrumbs([{ label: t(d ? "Fieldsets" : "Blueprints"), href: x }, { label: u }]);
  const [o, p] = oe(), m = y.useForm({ title: l?.title ?? "", handle: l?.handle ?? "" }), [h, f] = D.useState(l !== null), [k, b] = D.useState(() => Tt(l?.fields)), N = ($) => n.find((F) => F.type === $)?.hasChildren === !0, _ = m.errors, [S, w] = D.useState(() => JSON.stringify(k)), g = m.isDirty || JSON.stringify(k) !== S, B = () => {
    m.setDefaults();
    const $ = Mt(k);
    b($), w(JSON.stringify($));
  }, E = () => {
    if (m.processing) return;
    m.transform((F) => ({
      // A blueprint's handle can change (RenameBlueprint); a fieldset's can't: flexible blocks store it.
      ...l ? s === "blueprint" ? { title: F.title, handle: F.handle } : { title: F.title } : F,
      fields: Bt(k, N)
    }));
    const $ = () => window.requestAnimationFrame(() => document.querySelector('[data-invalid="true"]')?.scrollIntoView({ block: "center", behavior: "smooth" }));
    l ? m.put(`${x}/${l.handle}`, { preserveScroll: !0, onSuccess: B, onError: $ }) : m.post(x, { onSuccess: B, onError: $ });
  }, j = ($) => {
    $.preventDefault(), E();
  };
  a.useUnsavedChanges(g, E);
  const M = () => l && o(
    d ? t('Delete the fieldset ":title"? Content keeps its values.', { title: l.title }) : t('Delete the blueprint ":title"? Content keeps its values.', { title: l.title }),
    () => y.router.delete(`${x}/${l.handle}`, { preserveScroll: !0 })
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: j, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: u }),
    p,
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: u,
        back: { href: x, label: t(d ? "Back to fieldsets" : "Back to blueprints") },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          l && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "icon", className: "cms:text-destructive", "aria-label": t("Delete :title", { title: u }), onClick: M, children: /* @__PURE__ */ e.jsx(W, {}) }),
          /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: m.processing, children: [
            m.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
            t(l ? "Save" : d ? "Create fieldset" : "Create blueprint")
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(I, { message: _.blueprint ?? _.fieldset }),
    /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "title", children: t("Title") }),
        /* @__PURE__ */ e.jsx(a.Input, { id: "title", value: m.data.title, required: !0, onChange: ($) => {
          m.setData((F) => ({ ...F, title: $.target.value, handle: h ? F.handle : $t($.target.value) }));
        } }),
        /* @__PURE__ */ e.jsx(I, { message: _.title })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "handle", children: t("Handle") }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: "handle",
            className: "cms:font-mono",
            value: m.data.handle,
            disabled: l !== null && s === "fieldset",
            required: !0,
            spellCheck: !1,
            onChange: ($) => {
              f(!0), m.setData("handle", Dt($.target.value));
            }
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: nl(s, l !== null) }),
        /* @__PURE__ */ e.jsx("div", { "aria-live": "polite", children: l !== null && s === "blueprint" && m.data.handle !== "" && m.data.handle !== l.handle && /* @__PURE__ */ e.jsx(St, { id: "handle-warning", children: t(`Changing the handle can break code. Sunrice updates the collections, taxonomies, global sets, forms and entries that use ":old". You update code that names it (Blueprint::where('handle', ':old')) and structure exports made before.`, { old: l.handle }) }) }),
        /* @__PURE__ */ e.jsx(I, { message: _.handle })
      ] })
    ] }) }),
    i.length > 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("Used by :list. Changes show there at once.", { list: i.join(", ") }) }),
    /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-3", "aria-labelledby": "fields-heading", children: [
      /* @__PURE__ */ e.jsx("h2", { id: "fields-heading", className: "cms:text-lg cms:font-medium", children: t("Fields") }),
      /* @__PURE__ */ e.jsx(Ft, { fields: k, onChange: b, types: n, errors: pe(_, "fields"), reserved: s === "blueprint" ? r : void 0, locales: c.slice(1) }),
      /* @__PURE__ */ e.jsx(I, { message: _.fields })
    ] })
  ] });
}
function Ht({ kind: s, base: l, rows: n, intro: c }) {
  const i = s === "blueprint", r = t(i ? "Blueprints" : "Fieldsets");
  a.useBreadcrumbs([{ label: r }]);
  const [d, x] = oe();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: r }),
    x,
    /* @__PURE__ */ e.jsx(a.PageHeader, { title: r, description: c, actions: /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(y.Link, { href: `${l}/create`, children: [
      /* @__PURE__ */ e.jsx(Q, {}),
      " ",
      t(i ? "New blueprint" : "New fieldset")
    ] }) }) }),
    /* @__PURE__ */ e.jsx(a.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(a.Table, { children: [
      /* @__PURE__ */ e.jsx(a.TableHeader, { children: /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
        /* @__PURE__ */ e.jsx(a.TableHead, { children: t("Title") }),
        /* @__PURE__ */ e.jsx(a.TableHead, { children: t("Handle") }),
        /* @__PURE__ */ e.jsx(a.TableHead, { children: t("Fields") }),
        n.some((u) => u.usedBy) && /* @__PURE__ */ e.jsx(a.TableHead, { children: t("Used by") }),
        /* @__PURE__ */ e.jsx(a.TableHead, { className: "cms:w-12", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: t("Actions") }) })
      ] }) }),
      /* @__PURE__ */ e.jsxs(a.TableBody, { children: [
        n.length === 0 && /* @__PURE__ */ e.jsx(a.TableRow, { children: /* @__PURE__ */ e.jsx(a.TableCell, { colSpan: 5, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: t(i ? "No blueprints yet." : "No fieldsets yet.") }) }),
        n.map((u) => /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx(y.Link, { href: `${l}/${u.handle}/edit`, className: "cms:font-medium cms:hover:underline", children: u.title }) }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: u.handle }) }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: u.fields }),
          u.usedBy && /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:text-muted-foreground", children: u.usedBy.join(", ") || "—" }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx(
            a.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": t("Delete :title", { title: u.title }),
              onClick: () => d(
                i ? t('Delete the blueprint ":title"? Content keeps its values.', { title: u.title }) : t('Delete the fieldset ":title"? Content keeps its values.', { title: u.title }),
                () => y.router.delete(`${l}/${u.handle}`, { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(W, {})
            }
          ) })
        ] }, u.id))
      ] })
    ] }) })
  ] });
}
function rl({ blueprints: s }) {
  const l = y.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(I, { message: l.blueprint }),
    /* @__PURE__ */ e.jsx(
      Ht,
      {
        kind: "blueprint",
        base: z("cms/blueprints"),
        rows: s,
        intro: t("The fields editors fill in, for each kind of content.")
      }
    )
  ] });
}
const gs = (s) => `resources/views/${s.replace(/\./g, "/")}.blade.php`;
function Pt({ example: s, fallbacks: l }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1 cms:text-xs cms:leading-relaxed cms:text-muted-foreground", children: [
    /* @__PURE__ */ e.jsx("p", { children: t("A Blade view: :example is :file.", { example: "\0", file: "" }).split(/(\u0000|\u0001)/).map((n, c) => n === "\0" ? /* @__PURE__ */ e.jsx("code", { className: "cms:text-foreground", children: s }, c) : n === "" ? /* @__PURE__ */ e.jsx("code", { className: "cms:break-all", children: gs(s) }, c) : n) }),
    /* @__PURE__ */ e.jsx("p", { children: t("Empty: the first that exists of") }),
    /* @__PURE__ */ e.jsxs("ol", { className: "cms:ml-4 cms:list-decimal", children: [
      l.map((n) => /* @__PURE__ */ e.jsx("li", { children: n.includes(" ") ? n : /* @__PURE__ */ e.jsx("code", { className: "cms:break-all", children: gs(n) }) }, n)),
      /* @__PURE__ */ e.jsx("li", { children: t("the built-in template") })
    ] })
  ] });
}
const fs = { preserveScroll: !0, preserveState: !0 };
function cl({ entryId: s, comments: l }) {
  const [n, c] = D.useState(null), [i, r] = D.useState(""), [d, x] = D.useState(!1), u = (p, m) => y.router.post(z(`cms/comments/${p}/status`), { status: m }, fs), o = (p) => y.router.post(z(`cms/comments/${p}/reply`), { body: i }, {
    ...fs,
    onStart: () => x(!0),
    onFinish: () => x(!1),
    onSuccess: () => {
      c(null), r("");
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
            p.status === "pending" && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => u(p.id, "approved"), children: [
              /* @__PURE__ */ e.jsx(Ce, {}),
              " ",
              t("Approve")
            ] }),
            /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => u(p.id, "spam"), children: [
              /* @__PURE__ */ e.jsx(We, {}),
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
                  c(n === p.id ? null : p.id), r("");
                },
                children: [
                  /* @__PURE__ */ e.jsx(ct, {}),
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
                onChange: (m) => r(m.target.value)
              }
            ),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
              /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "sm", disabled: i.trim() === "" || d, onClick: () => o(p.id), children: t("Post reply") }),
              /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => c(null), children: t("Cancel") })
            ] })
          ] })
        ] }, p.id)),
        /* @__PURE__ */ e.jsx("a", { href: z(`cms/comments?entry=${s}`), className: "cms:text-sm cms:font-medium cms:underline-offset-4 cms:hover:underline", children: t("All comments on this entry") })
      ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-10" }),
        /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-10" })
      ] })
    }
  );
}
const Ot = "cms:flex cms:flex-col cms:gap-1 cms:opacity-60";
function ss({ fields: s, values: l, onChange: n, errors: c, storageKey: i, shared: r = [], sharedValues: d = {}, sharedNote: x, disabled: u = !1 }) {
  const o = [], p = { ...d, ...l };
  for (const h of s.filter((f) => es(f, p))) {
    const f = o[o.length - 1];
    h.type === "group" ? o.push(h) : Array.isArray(f) ? f.push(h) : o.push([h]);
  }
  const m = x && (r.length > 0 || $e(s)) ? /* @__PURE__ */ e.jsx("p", { role: "note", className: "cms:rounded-lg cms:border cms:border-dashed cms:px-3 cms:py-2 cms:text-sm cms:text-muted-foreground", children: x }) : null;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    m,
    o.map((h) => {
      if (Array.isArray(h))
        return /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsx(a.CardContent, { children: /* @__PURE__ */ e.jsx("fieldset", { disabled: u, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: h.map((N) => r.includes(N.handle) ? /* @__PURE__ */ e.jsx("fieldset", { disabled: !0, className: Ot, title: t("Shared by all languages"), children: /* @__PURE__ */ e.jsx(ie, { id: `data-${N.handle}`, field: N, content: !0, value: d[N.handle], errors: {}, onChange: () => {
        } }) }, N.handle) : /* @__PURE__ */ e.jsx(
          ie,
          {
            id: `data-${N.handle}`,
            field: N,
            content: !0,
            value: l[N.handle],
            errors: ee(c, `data.${N.handle}`),
            onChange: (_) => n(N.handle, _)
          },
          N.handle
        )) }) }) }, `fields-${h[0]?.handle ?? ""}`);
      const f = r.includes(h.handle), k = (f ? d : l)[h.handle], b = ee(c, `data.${h.handle}`);
      return /* @__PURE__ */ e.jsx(
        a.CollapsibleCard,
        {
          title: De(h),
          titleClassName: "cms:text-base",
          description: h.instructions ?? void 0,
          storageKey: `${i}:${h.handle}`,
          hasErrors: !f && Ne(c, `data.${h.handle}`),
          children: /* @__PURE__ */ e.jsxs(
            "fieldset",
            {
              disabled: f || u,
              role: "group",
              "aria-label": De(h),
              className: `cms:flex cms:flex-col cms:gap-2 ${f ? "cms:opacity-60" : ""}`,
              title: f ? t("Shared by all languages") : void 0,
              children: [
                /* @__PURE__ */ e.jsx(
                  he,
                  {
                    bare: !0,
                    fields: h.fields ?? [],
                    id: `data-${h.handle}`,
                    content: !0,
                    errors: f ? {} : b,
                    value: k && typeof k == "object" && !Array.isArray(k) ? k : {},
                    onChange: (N) => n(h.handle, N)
                  }
                ),
                /* @__PURE__ */ e.jsx(I, { message: f ? void 0 : b[""] })
              ]
            }
          )
        },
        h.handle
      );
    })
  ] });
}
function Vt({ note: s, redirectsUrl: l }) {
  return /* @__PURE__ */ e.jsx("div", { "aria-live": "polite", children: s !== null && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-xs cms:text-muted-foreground", children: [
    t(s === "redirects" ? "Once published, the old address redirects to the new one." : "The old address will stop working (404) unless a redirect is added."),
    s === "breaks" && l && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      " ",
      /* @__PURE__ */ e.jsx("a", { href: l, target: "_blank", rel: "noopener", className: "cms:underline cms:underline-offset-2 cms:hover:text-foreground", children: t("Add a redirect") })
    ] })
  ] }) });
}
function ts() {
  return [
    { handle: "title", type: "text", label: t("Meta title"), instructions: t("Empty: the title."), config: { max: 255 } },
    { handle: "description", type: "textarea", label: t("Meta description"), instructions: t("A sentence or two for search results."), config: { max: 500 } },
    { handle: "canonical", type: "text", label: t("Canonical URL"), instructions: t("Only if this page copies another: that page's address. Empty: this page."), config: { max: 2e3 } },
    { handle: "image", type: "media", label: t("Open Graph image"), instructions: t("Shown when the page is shared."), config: { types: ["image"] } },
    { handle: "noindex", type: "toggle", label: t("Hide from search engines (noindex)") }
  ];
}
function js(s) {
  if (s.length === 0) return "";
  const l = s.slice(0, 5).map((n) => n.label).join("; ");
  return ` ${s.length > 5 ? t("It's used by :list and :count more: those links will show nothing.", { list: l, count: s.length - 5 }) : t("It's used by :list: those links will show nothing.", { list: l })}`;
}
function il(s) {
  const { entry: l } = s;
  return /* @__PURE__ */ e.jsx(ol, { ...s }, l ? `${l.id}:${l.locale}:${l.version}:${l.status}:${l.trashed}:${l.publishedAt}` : "new");
}
function ol({ collection: s, fields: l, locales: n = [], shared: c = [], sharedValues: i = {}, entry: r, values: d, revisions: x, comments: u, termLabels: o, usedBy: p = [], undoRestore: m = null, machineTranslate: h = null, machineTranslateMissing: f = !1, settings: k, blueprints: b = [], homepage: N, redirectsUrl: _ = null, can: S }) {
  const w = z(`cms/collections/${s.handle}/entries`), g = r ? z(`cms/entries/${r.id}`) : w, B = r ? d.title : t("New entry");
  a.useBreadcrumbs([{ label: s.title, href: w }, { label: B }]);
  const [E, j] = oe(), [M, $] = D.useState(!1), [F, C] = D.useState(null), [H, V] = D.useState(!1), L = y.useForm({
    ...d,
    seo: d.seo ?? {},
    locale: r?.locale ?? null,
    version: r?.version ?? null,
    publish: !1,
    published_at: null,
    parent_id: k?.parentId ?? null,
    template: k?.template ?? "",
    comments_closed: k?.commentsClosed === !0
  }), fe = (T) => L.setData((U) => ({ ...U, ...T })), Z = r ? { locale: r.locale } : {}, X = n.find((T) => T.main)?.code, q = L.errors, xe = y.usePage().props.errors ?? {}, de = (T) => {
    const U = Be(q, T);
    U.length > 0 && L.clearErrors(...U);
  }, se = r !== null && r.status !== "draft" && !r.hasUnpublishedChanges && !L.isDirty, v = r === null ? S.create : S.update && !r.trashed, O = r?.status === "scheduled", R = (T) => {
    if (k || r === null) return T;
    const { parent_id: U, template: J, comments_closed: nn, ...Jt } = T;
    return Jt;
  }, ne = (T = !1, U = null) => {
    L.transform((J) => ({ ...R(J), publish: T, published_at: U })), r ? L.put(g, { preserveScroll: !0, onSuccess: () => $(!1) }) : L.post(g);
  }, Me = () => {
    L.transform((T) => ({ ...R(T), version: null, publish: !1, published_at: null })), L.put(g, { preserveScroll: !0 });
  }, G = a.useEditLock({
    type: "cms.entry",
    id: r?.id,
    locale: r?.locale,
    enabled: r !== null && v,
    noun: t("entry"),
    leaveTo: w,
    getUnsaved: () => L.isDirty ? { title: L.data.title, slug: L.data.slug, data: L.data.data, seo: L.data.seo } : null
  }), Y = v && !G.readOnly, Gt = async (T) => {
    const U = await G.loadKept(T);
    L.setData((J) => ({ ...J, title: U.title ?? J.title, slug: U.slug ?? J.slug, data: U.data ?? J.data, seo: U.seo ?? J.seo }));
  };
  a.useUnsavedChanges(L.isDirty && !G.takenOver, Y ? () => L.processing || ne() : void 0);
  const Yt = () => {
    const T = () => y.router.post(`${g}/review`, Z, { preserveScroll: !0 });
    L.isDirty ? (L.transform((U) => ({ ...U, publish: !1, published_at: null })), L.put(g, { preserveScroll: !0, onSuccess: T })) : T();
  }, Se = (T = null) => {
    S.update ? ne(!0, T) : r && y.router.post(`${g}/publish`, { ...Z, published_at: T }, { preserveScroll: !0, onSuccess: () => $(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (T) => {
    T.preventDefault(), ne();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: B }),
    j,
    G.dialogs,
    /* @__PURE__ */ e.jsxs(
      a.PageHeader,
      {
        title: B,
        back: { href: w, label: t("Back to :title", { title: s.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          r && !r.trashed && s.pages !== !1 && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(
            "a",
            {
              href: r.previewUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              title: L.isDirty ? t("Shows the saved draft: save first to see your changes.") : t("Shows the saved draft."),
              children: [
                /* @__PURE__ */ e.jsx(fa, {}),
                " ",
                t("Preview")
              ]
            }
          ) }),
          r?.url && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: r.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(ge, {}),
            " ",
            t("View page")
          ] }) }),
          r?.trashed && S.delete && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", onClick: () => y.router.post(`${g}/restore`, {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(je, {}),
            " ",
            t("Restore")
          ] }),
          r?.trashed && S.delete && /* @__PURE__ */ e.jsxs(
            a.Button,
            {
              type: "button",
              variant: "outline",
              className: "cms:text-destructive",
              onClick: () => E(
                t(`Delete ":title" for good, in every language, with its revisions? This can't be undone.`, { title: d.title }) + js(p),
                () => y.router.delete(`${g}/force`, { data: p.length > 0 ? { force: 1 } : {} })
              ),
              children: [
                /* @__PURE__ */ e.jsx(W, {}),
                " ",
                t("Delete for good")
              ]
            }
          ),
          r && !r.trashed && (S.create || S.delete && !G.readOnly || Y && h !== null) && /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "icon", "aria-label": t("More actions"), children: /* @__PURE__ */ e.jsx(Gs, {}) }) }),
            /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", className: "cms:min-w-52", children: [
              Y && h !== null && /* @__PURE__ */ e.jsxs(
                a.DropdownMenuItem,
                {
                  disabled: L.processing || L.isDirty,
                  title: L.isDirty ? void 0 : t("Fill in what isn't translated yet, into the draft"),
                  onSelect: () => y.router.post(z(`cms/entries/${r.id}/translations/${r.locale}/translate`), { version: r.version }, { preserveScroll: !0 }),
                  children: [
                    /* @__PURE__ */ e.jsx(cs, {}),
                    " ",
                    L.isDirty ? t("Save to translate") : t("Translate from :language", { language: n.find((T) => T.main)?.name ?? (X ? P(X) : t("the main language")) })
                  ]
                }
              ),
              S.create && /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { title: t("Copy every language as a new draft"), onSelect: () => y.router.post(`${g}/duplicate`), children: [
                /* @__PURE__ */ e.jsx(pa, {}),
                " ",
                t("Duplicate")
              ] }),
              S.delete && !G.readOnly && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
                /* @__PURE__ */ e.jsxs(
                  a.DropdownMenuItem,
                  {
                    className: "cms:text-destructive",
                    onSelect: () => E(t('Move ":title" to the trash? It comes off the site; you can restore it.', { title: d.title }) + js(p), () => y.router.delete(g), t("Move to trash")),
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
          r && Y && f && /* @__PURE__ */ e.jsxs("span", { title: t("Machine translation isn't set up on this site: ask your developer (SUNRICE_TRANSLATE_DRIVER, see Help → Developer docs → Machine translation)."), children: [
            /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", disabled: !0, "aria-describedby": "machine-translate-missing", children: [
              /* @__PURE__ */ e.jsx(cs, {}),
              " ",
              t("Translate from :language", { language: n.find((T) => T.main)?.name ?? (X ? P(X) : t("the main language")) })
            ] }),
            /* @__PURE__ */ e.jsx("span", { id: "machine-translate-missing", className: "cms:sr-only", children: t("Machine translation isn't set up on this site: ask your developer.") })
          ] }),
          Y && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", variant: r ? "outline" : "default", disabled: L.processing, children: [
            L.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
            t(r ? "Save draft" : "Create draft")
          ] }),
          r && !r.trashed && Y && !S.publish && (r.status === "draft" || r.hasUnpublishedChanges || L.isDirty) && /* @__PURE__ */ e.jsxs(
            a.Button,
            {
              type: "button",
              disabled: L.processing,
              onClick: Yt,
              title: r.review ? t("Already sent; sending again tells them again") : t("Ask those who can publish to review it"),
              children: [
                /* @__PURE__ */ e.jsx(wa, {}),
                " ",
                r.review ? t("Send for review again") : t("Submit for review")
              ]
            }
          ),
          r && !r.trashed && S.publish && !G.readOnly && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex", children: [
            O && se ? /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", className: "cms:rounded-r-none", disabled: L.processing, title: t("Change the date"), onClick: () => $(!0), children: [
              /* @__PURE__ */ e.jsx(Ke, {}),
              " ",
              t("Scheduled for :date", { date: K(r.publishedAt) })
            ] }) : /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: se ? "outline" : "default", className: "cms:rounded-r-none cms:disabled:opacity-100", disabled: L.processing || se, onClick: () => Se(), children: [
              se && /* @__PURE__ */ e.jsx(Ce, { className: "cms:text-emerald-600 cms:dark:text-emerald-400" }),
              r.status === "draft" ? t("Publish") : t(se ? "Published" : "Publish changes")
            ] }),
            /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
              /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "icon", variant: se ? "outline" : "default", className: se ? "cms:-ml-px cms:rounded-l-none" : "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": t("More publishing options"), children: /* @__PURE__ */ e.jsx(Je, {}) }) }),
              /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", children: [
                /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { onSelect: () => $(!0), children: [
                  /* @__PURE__ */ e.jsx(Ke, {}),
                  " ",
                  t(O ? "Change the date…" : "Publish on a date…")
                ] }),
                O && /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => Se((/* @__PURE__ */ new Date()).toISOString()), children: t("Publish now") }),
                r.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
                  /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => y.router.post(`${g}/unpublish`, Z, { preserveScroll: !0 }), children: t(O ? "Unschedule (back to draft)" : "Unpublish") })
                ] })
              ] })
            ] })
          ] })
        ] }),
        children: [
          r && /* @__PURE__ */ e.jsx(a.Badge, { variant: r.status === "published" ? "success" : "secondary", children: r.trashed ? t("In the trash") : ae(r.status) }),
          r?.review && !r.trashed && /* @__PURE__ */ e.jsx(a.Badge, { variant: "warning", title: r.review.by ? t(":name sent it on :date", { name: r.review.by, date: K(r.review.requestedAt) }) : t("Sent on :date", { date: K(r.review.requestedAt) }), children: t("Waiting for review") }),
          L.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
        ]
      }
    ),
    r && n.length > 1 && /* @__PURE__ */ e.jsx(
      ml,
      {
        entryUrl: g,
        editUrl: `${w}/${r.id}/edit`,
        current: r.locale,
        locales: n,
        canAdd: (S.create || S.translate === !0) && !r.trashed,
        canRemove: S.delete && !r.isMain && !r.trashed,
        onRemove: () => E(
          t('Remove the :language translation of ":title"? Its revisions go with it.', { language: P(r.locale), title: d.title }),
          () => y.router.delete(`${g}/translations/${r.locale}`)
        )
      }
    ),
    /* @__PURE__ */ e.jsx(a.ViewingNotice, { by: G.viewingBy, onTakeOver: G.requestTakeOver }),
    /* @__PURE__ */ e.jsx(a.KeptEditsNotice, { kept: G.kept, disabled: !Y, onLoad: (T) => {
      Gt(T);
    }, onDiscard: (T) => {
      G.discardKept(T);
    } }),
    q.version && /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: [
      /* @__PURE__ */ e.jsx("span", { children: q.version }),
      /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => y.router.reload(), children: t("Load theirs") }),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            type: "button",
            variant: "destructive",
            size: "sm",
            disabled: L.processing,
            onClick: () => E(t("Save your version over theirs? Their changes are replaced (their earlier published versions stay in the revisions)."), Me),
            children: t("Save mine anyway")
          }
        )
      ] })
    ] }),
    (q.entry || q.published_at || xe.published_at || xe.homepage) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: q.entry ?? q.published_at ?? xe.published_at ?? xe.homepage }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_18rem]", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsx(a.CardContent, { children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: !Y, className: "cms:grid cms:gap-4 cms:md:grid-cols-[2fr_1fr]", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "title", children: t("Title") }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "title",
                value: L.data.title,
                "aria-invalid": q.title !== void 0,
                onChange: (T) => {
                  const U = T.target.value;
                  L.setData((J) => ({ ...J, title: U, slug: ea(J.slug, J.title, U, r !== null && r.publishedAt === null && r.status === "draft") })), de("title");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(I, { message: q.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "slug", children: t("Slug") }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "slug",
                className: "cms:font-mono",
                value: L.data.slug,
                placeholder: t("Made from the title"),
                "aria-invalid": q.slug !== void 0,
                onChange: (T) => {
                  L.setData("slug", T.target.value), de("slug");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(Vt, { note: ws(r?.publishedSlug, L.data.slug, r !== null && r.status !== "draft"), redirectsUrl: _ }),
            /* @__PURE__ */ e.jsx(I, { message: q.slug })
          ] })
        ] }) }) }),
        /* @__PURE__ */ e.jsx(Ct.Provider, { value: Array.isArray(o) || !o ? {} : o, children: /* @__PURE__ */ e.jsx(
          ss,
          {
            disabled: !Y,
            fields: l,
            values: L.data.data,
            errors: q,
            storageKey: `cms:entry:${s.handle}`,
            shared: c,
            sharedValues: i,
            sharedNote: X ? t("Shared by all languages: the greyed-out fields are edited in :language.", { language: P(X) }) : t("Shared by all languages: the greyed-out fields are edited in the main language."),
            onChange: (T, U) => {
              L.setData("data", { ...L.data.data, [T]: U }), de(`data.${T}`);
            }
          }
        ) }),
        /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: t("SEO"), description: t("How this entry appears in search results and shared links."), titleClassName: "cms:text-base", storageKey: "cms:entry:seo", hasErrors: Ne(q, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !Y, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(
          he,
          {
            bare: !0,
            id: "seo",
            fields: ts(),
            value: L.data.seo,
            errors: ee(q, "seo"),
            onChange: (T) => {
              L.setData("seo", T), de("seo");
            }
          }
        ) }) })
      ] }),
      !r && s.hierarchical && /* @__PURE__ */ e.jsx("aside", { className: "cms:flex cms:flex-col cms:gap-4", children: /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: "Page settings", titleClassName: "cms:text-base", storageKey: "cms:entry:page-settings", hasErrors: q.parent_id !== void 0, children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !Y, className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: /* @__PURE__ */ e.jsx(Rt, { collection: s, value: L.data.parent_id, error: q.parent_id, onChange: (T) => fe({ parent_id: T }) }) }) }) }),
      r && /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:flex-col cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: t("Status"), titleClassName: "cms:text-base", storageKey: "cms:entry:status", contentClassName: "cms:flex cms:flex-col cms:gap-3 cms:text-sm", children: [
          /* @__PURE__ */ e.jsxs("dl", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-3", children: [
              /* @__PURE__ */ e.jsx("dt", { className: "cms:text-muted-foreground", children: t("Status") }),
              /* @__PURE__ */ e.jsx("dd", { children: /* @__PURE__ */ e.jsx(a.Badge, { variant: r.status === "published" ? "success" : "secondary", children: r.trashed ? t("In the trash") : ae(r.status) }) })
            ] }),
            r.status !== "draft" && r.publishedAt && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:justify-between cms:gap-3", children: [
              /* @__PURE__ */ e.jsx("dt", { className: "cms:text-muted-foreground", children: r.status === "scheduled" ? t("Goes live") : t("Published") }),
              /* @__PURE__ */ e.jsx("dd", { className: "cms:text-right cms:tabular-nums", children: K(r.publishedAt) })
            ] })
          ] }),
          r.review && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-muted-foreground", children: [
            r.review.by ? t("Sent for review by :name · :date.", { name: r.review.by, date: K(r.review.requestedAt) }) : t("Sent for review · :date.", { date: K(r.review.requestedAt) }),
            S.publish ? ` ${t("Publishing it answers the request.")}` : ""
          ] }),
          r.review && !r.trashed && (r.review.mine || S.publish && !G.readOnly) && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: [
            S.publish && !G.readOnly && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", disabled: L.processing, onClick: () => V(!0), children: [
              /* @__PURE__ */ e.jsx(we, {}),
              " ",
              t("Send back…")
            ] }),
            r.review.mine && /* @__PURE__ */ e.jsx(
              a.Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                disabled: L.processing,
                title: t("Take the request back, to keep working on it"),
                onClick: () => y.router.post(`${g}/review/withdraw`, Z, { preserveScroll: !0 }),
                children: t("Withdraw the request")
              }
            )
          ] }),
          !r.trashed && S.publish && !G.readOnly && /* @__PURE__ */ e.jsx(
            ul,
            {
              status: r.status,
              publishedAt: r.publishedAt,
              processing: L.processing,
              onPublish: (T) => Se(T),
              onUnpublish: () => y.router.post(`${g}/unpublish`, Z, { preserveScroll: !0 })
            },
            r.publishedAt ?? "none"
          ),
          r.status !== "draft" && r.hasUnpublishedChanges && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("The draft has changes the site doesn't show yet.") }),
          N?.is && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("This is the site's homepage.") }),
          N && !N.is && N.can && r.status === "published" && !r.trashed && /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "cms:mt-1 cms:self-start",
              onClick: () => E(
                (N.current ? t('Make ":title" the homepage? Visitors to / will see it instead of ":current".', { title: d.title, current: N.current }) : t('Make ":title" the homepage? Visitors to / will see it.', { title: d.title })) + " " + t("Its own address will lead to / as well."),
                () => y.router.post(`${g}/homepage`, {}, { preserveScroll: !0 }),
                t("Make this the homepage")
              ),
              children: t("Make this the homepage")
            }
          ),
          n.find((T) => T.code === r.locale)?.outdated && /* @__PURE__ */ e.jsx("p", { className: "cms:text-amber-700 cms:dark:text-amber-400", children: X ? t("The :language version changed since this translation was last saved.", { language: P(X) }) : t("The main version changed since this translation was last saved.") })
        ] }),
        /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: t("Used by"), titleClassName: "cms:text-base", storageKey: "cms:entry:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          p.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("No other content links here.") }),
          p.map((T) => /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
            T.url ? /* @__PURE__ */ e.jsx("a", { href: T.url, className: "cms:block cms:truncate cms:underline-offset-4 cms:hover:underline", children: T.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:truncate", children: T.label }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", title: T.field, children: T.fieldLabel ?? T.field })
          ] }, `${T.label}:${T.field}`))
        ] }),
        k && /* @__PURE__ */ e.jsx(
          pl,
          {
            entryUrl: g,
            collection: s,
            settings: k,
            blueprints: b,
            disabled: !Y,
            values: L.data,
            errors: q,
            onChange: fe,
            draftDirty: L.isDirty
          }
        ),
        u !== null && s.comments && /* @__PURE__ */ e.jsx(cl, { entryId: r.id, comments: u }),
        /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: t("Revisions"), titleClassName: "cms:text-base", storageKey: "cms:entry:revisions", contentClassName: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
          m !== null && S.update && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => y.router.post(z(`cms/entries/${r.id}/translations/${r.locale}/undo-restore`), {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(we, {}),
            " ",
            t("Undo the restore")
          ] }),
          /* @__PURE__ */ e.jsx(y.Deferred, { data: "revisions", fallback: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-8" }),
            /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-8" })
          ] }), children: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            (x ?? []).length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("Each publish keeps one.") }),
            (x ?? []).map((T) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1 cms:border-b cms:border-border/60 cms:pb-2 cms:last:border-b-0 cms:last:pb-0", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
                /* @__PURE__ */ e.jsx("div", { className: "cms:truncate", children: T.title }),
                /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
                  K(T.createdAt),
                  T.author ? ` · ${T.author}` : ""
                ] }),
                /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: T.changed === null ? t("First kept version") : T.changed.length === 0 ? t("No field changed") : t("Changed: :fields", { fields: T.changed.join(", ") }) })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-1", children: [
                /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => C(T), children: t("Compare") }),
                S.update && !r.trashed && /* @__PURE__ */ e.jsx(
                  a.Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    onClick: () => y.router.post(z(`cms/entries/${r.id}/revisions/${T.id}/restore`), {}, { preserveScroll: !0 }),
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
      dl,
      {
        open: H,
        onClose: () => V(!1),
        by: r.review.by,
        onSend: (T, U) => y.router.post(`${g}/review/send-back`, { ...Z, note: T }, { preserveScroll: !0, onSuccess: () => {
          V(!1), U();
        }, onError: U })
      }
    ),
    /* @__PURE__ */ e.jsx(xl, { entryId: r?.id ?? 0, revision: F, onClose: () => C(null), dirty: L.isDirty }),
    /* @__PURE__ */ e.jsx(
      hl,
      {
        open: M,
        onClose: () => $(!1),
        processing: L.processing,
        rescheduling: O,
        current: r?.publishedAt ?? null,
        onSchedule: (T) => Se(T)
      }
    )
  ] });
}
function dl({ open: s, onClose: l, by: n, onSend: c }) {
  const [i, r] = D.useState(""), [d, x] = D.useState(!1), u = y.usePage().props.errors ?? {};
  return D.useEffect(() => {
    s && r("");
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
          "aria-invalid": u.note !== void 0,
          onChange: (o) => r(o.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(I, { message: u.note })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", disabled: d, onClick: l, children: t("Cancel") }),
      /* @__PURE__ */ e.jsxs(a.Button, { type: "button", disabled: d, onClick: () => {
        x(!0), c(i, () => x(!1));
      }, children: [
        d && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
        " ",
        t("Send back")
      ] })
    ] })
  ] }) });
}
function ml({ entryUrl: s, editUrl: l, current: n, locales: c, canAdd: i, canRemove: r, onRemove: d }) {
  const x = c.filter((o) => o.status !== null), u = c.filter((o) => o.status === null);
  return /* @__PURE__ */ e.jsxs("nav", { "aria-label": t("Languages"), className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("div", { className: "cms:inline-flex cms:items-center cms:gap-0.5 cms:rounded-md cms:bg-muted cms:p-0.5", children: x.map((o) => {
      const p = o.code === n, m = o.main ? t(":language (main)", { language: o.name ?? P(o.code) }) : o.name ?? P(o.code), h = o.status ? ae(o.status) : "", f = o.outdated ? t(":language: :status, outdated (the main language changed since)", { language: m, status: h }) : t(":language: :status", { language: m, status: h });
      return /* @__PURE__ */ e.jsxs(
        "button",
        {
          type: "button",
          title: f,
          "aria-label": f,
          "aria-current": p ? "page" : void 0,
          onClick: () => !p && y.router.get(l, { locale: o.code }),
          className: `cms:relative cms:inline-flex cms:h-7 cms:min-w-10 cms:items-center cms:justify-center cms:gap-1.5 cms:rounded cms:px-2.5 cms:text-xs cms:font-semibold cms:tracking-wide cms:uppercase cms:transition-colors ${p ? "cms:bg-card cms:text-foreground cms:shadow-xs" : "cms:text-muted-foreground cms:hover:text-foreground"}`,
          children: [
            o.code,
            (o.outdated || o.status === "published") && /* @__PURE__ */ e.jsx("span", { "aria-hidden": !0, className: `cms:size-1.5 cms:rounded-full ${o.outdated ? "cms:bg-amber-500" : "cms:bg-emerald-500"}` })
          ]
        },
        o.code
      );
    }) }),
    i && u.map((o) => /* @__PURE__ */ e.jsxs(
      a.Button,
      {
        type: "button",
        variant: "outline",
        size: "sm",
        className: "cms:h-8 cms:border-dashed cms:text-xs cms:uppercase",
        title: t("Add :language", { language: o.name ?? P(o.code) }),
        onClick: () => y.router.post(`${s}/translations`, { locale: o.code }),
        children: [
          /* @__PURE__ */ e.jsx(Q, {}),
          " ",
          o.code
        ]
      },
      o.code
    )),
    r && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:ml-auto cms:text-destructive", onClick: d, children: t("Remove this language") })
  ] });
}
function ul({ status: s, publishedAt: l, processing: n, onPublish: c, onUnpublish: i }) {
  const [r, d] = D.useState(l ? Cs(new Date(l)) : ""), x = r === "" ? null : new Date(r), u = x !== null && x.getTime() > Date.now(), o = (h) => h === null ? null : Math.floor(h.getTime() / 6e4), p = o(x) !== o(l ? new Date(l) : null), m = t(s === "draft" ? u ? "Schedule" : "Publish" : u ? s === "scheduled" ? "Reschedule" : "Schedule" : "Change date");
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:border-t cms:border-border/60 cms:pt-3", children: [
    /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "entry-published-at", children: t("Publish date") }),
    /* @__PURE__ */ e.jsx(a.DatePicker, { id: "entry-published-at", withTime: !0, className: "cms:max-w-none", value: r || null, onChange: (h) => d(h ?? "") }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t(s === "draft" ? "Empty: now. A date in the future schedules it." : "The date shown as published. A date in the future takes it off the site until then.") }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: [
      (s === "draft" || p) && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", size: "sm", disabled: n, onClick: () => c(x?.toISOString() ?? null), children: [
        /* @__PURE__ */ e.jsx(Ke, {}),
        " ",
        m
      ] }),
      s !== "draft" && /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "sm", variant: "outline", disabled: n, onClick: i, children: t("Unpublish") })
    ] })
  ] });
}
function hl({ open: s, onClose: l, onSchedule: n, current: c, processing: i, rescheduling: r }) {
  const [d, x] = D.useState("");
  D.useEffect(() => {
    s && x(Cs(Zt(c)));
  }, [s, c]);
  const u = d === "" ? null : new Date(d), o = u !== null && u.getTime() <= Date.now();
  return /* @__PURE__ */ e.jsx(a.Dialog, { open: s, onOpenChange: (p) => !p && l(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: t(r ? "Change the publish date" : "Publish on a date") }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: t("The entry goes live then.") })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "published-at", children: t("Date and time") }),
      /* @__PURE__ */ e.jsx(a.DatePicker, { id: "published-at", withTime: !0, required: !0, className: "cms:max-w-none", value: d || null, onChange: (p) => x(p ?? "") }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("In your time zone.") }),
      o && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-amber-700 cms:dark:text-amber-400", children: t("This date has passed: the entry goes live now, dated :date.", { date: K(u.toISOString()) }) })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: l, children: t("Cancel") }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", disabled: u === null || i, onClick: () => u && n(u.toISOString()), children: t(o ? "Publish now, back-dated" : r ? "Change the date" : "Schedule") })
    ] })
  ] }) });
}
function xl({ entryId: s, revision: l, onClose: n, dirty: c }) {
  const [i, r] = D.useState(null), [d, x] = D.useState(!1);
  return D.useEffect(() => {
    if (r(null), x(!1), !l) return;
    let u = !0;
    return fetch(z(`cms/entries/${s}/revisions/${l.id}/compare`), { headers: { Accept: "application/json" }, credentials: "same-origin" }).then((o) => o.ok ? o.json() : Promise.reject(new Error(String(o.status)))).then((o) => {
      u && r(o.fields);
    }).catch(() => {
      u && x(!0);
    }), () => {
      u = !1;
    };
  }, [l, s]), /* @__PURE__ */ e.jsx(a.Dialog, { open: l !== null, onOpenChange: (u) => !u && n(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto cms:sm:max-w-2xl", children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: t("Compare with the draft") }),
      /* @__PURE__ */ e.jsxs(a.DialogDescription, { children: [
        l ? l.author ? t("The version published :date by :name, beside the saved draft.", { date: K(l.createdAt), name: l.author }) : t("The version published :date, beside the saved draft.", { date: K(l.createdAt) }) : "",
        c ? ` ${t("Your unsaved changes aren't included.")}` : ""
      ] })
    ] }),
    d && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t("The comparison could not be loaded. Try again.") }),
    !d && i === null && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-12" }),
      /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-12" })
    ] }),
    i?.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("The draft is the same as this version.") }),
    i && i.length > 0 && /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: i.map((u) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: u.label }),
      /* @__PURE__ */ e.jsxs("dd", { className: "cms:grid cms:gap-2 cms:sm:grid-cols-2", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:rounded-md cms:border cms:border-destructive/30 cms:bg-destructive/5 cms:p-2 cms:break-words cms:whitespace-pre-wrap", children: [
          /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:text-xs cms:text-muted-foreground", children: "This version" }),
          u.revision || "—"
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:rounded-md cms:border cms:border-emerald-500/30 cms:bg-emerald-500/5 cms:p-2 cms:break-words cms:whitespace-pre-wrap", children: [
          /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:text-xs cms:text-muted-foreground", children: "Draft" }),
          u.draft || "—"
        ] })
      ] })
    ] }, u.label)) }),
    /* @__PURE__ */ e.jsx(a.DialogFooter, { children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: n, children: t("Close") }) })
  ] }) });
}
function Rt({ collection: s, value: l, error: n, onChange: c }) {
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
        onChange: (i) => c(typeof i == "number" ? i : null)
      }
    ),
    /* @__PURE__ */ e.jsx(I, { message: n })
  ] });
}
function pl({ entryUrl: s, collection: l, settings: n, blueprints: c, disabled: i, values: r, errors: d, onChange: x, draftDirty: u }) {
  const o = c.length > 1 ? n.blueprint ?? c[0].handle : void 0, p = y.useForm({ blueprint: o ?? "" }), m = p.errors.blueprint, h = ["parent_id", "template", "comments_closed"].some((f) => d[f] !== void 0) || m !== void 0;
  return /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: t("Page settings"), titleClassName: "cms:text-base", storageKey: "cms:entry:page-settings", hasErrors: h, children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: i, className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: [
    l.hierarchical && /* @__PURE__ */ e.jsx(Rt, { collection: l, value: r.parent_id, error: d.parent_id, onChange: (f) => x({ parent_id: f }) }),
    c.length > 1 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "blueprint", children: t("Blueprint") }),
      /* @__PURE__ */ e.jsxs(a.Select, { value: p.data.blueprint, onValueChange: (f) => p.setData("blueprint", f), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: "blueprint", "aria-invalid": m !== void 0, children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(a.SelectContent, { children: c.map((f) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: f.handle, children: f.title }, f.handle)) })
      ] }),
      p.data.blueprint !== o && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("The fields change in every language; values of fields both blueprints have are kept. The editor reloads.") }),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            type: "button",
            size: "sm",
            disabled: p.processing || u,
            title: u ? t("Save your draft first") : void 0,
            onClick: () => p.put(`${s}/settings`, { preserveScroll: !0 }),
            children: t("Change blueprint")
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(I, { message: m })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "template", children: t("Template") }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: "template",
          className: "cms:font-mono",
          placeholder: `cms.${l.handle}-landing`,
          value: r.template,
          onChange: (f) => x({ template: f.target.value }),
          "aria-invalid": d.template !== void 0
        }
      ),
      /* @__PURE__ */ e.jsx(Pt, { example: `cms.${l.handle}-landing`, fallbacks: [t("the collection's template, if set"), `cms.${l.handle}`, "cms.entry"] }),
      /* @__PURE__ */ e.jsx(I, { message: d.template })
    ] }),
    l.comments && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(a.Switch, { id: "comments-open", checked: !r.comments_closed, onCheckedChange: (f) => x({ comments_closed: !f }) }),
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "comments-open", children: t("Accept new comments") }),
      /* @__PURE__ */ e.jsx("a", { href: z(`cms/comments?entry=${s.split("/").slice(-1)[0]}`), className: "cms:ml-auto cms:text-muted-foreground cms:underline-offset-4 hover:cms:underline", children: t("Comments") })
    ] })
  ] }) });
}
function Ge(s, l) {
  const n = s[l]?.depth ?? 0;
  let c = l + 1;
  for (; c < s.length && s[c].depth > n; ) c++;
  return c;
}
function ce(s, l) {
  const n = l < 0 ? 0 : l + 1, c = l < 0 ? s.length : Ge(s, l), i = l < 0 ? 0 : (s[l]?.depth ?? 0) + 1, r = [];
  for (let d = n; d < c; d++)
    s[d].depth === i && r.push(d);
  return r;
}
function as(s, l, n) {
  const c = ce(s, l);
  if (n.length !== c.length || [...n].sort((x, u) => x - u).some((x, u) => x !== c[u]) || c.length === 0) return s.slice();
  const i = c[0], r = Ge(s, c[c.length - 1]), d = n.flatMap((x) => s.slice(x, Ge(s, x)));
  return [...s.slice(0, i), ...d, ...s.slice(r)];
}
function gl(s, l) {
  const n = new Set(s.map((x) => x.id)), c = /* @__PURE__ */ new Map();
  for (const x of s) {
    const u = l(x), o = u != null && n.has(u) ? u : null;
    c.set(o, [...c.get(o) ?? [], x]);
  }
  const i = [], r = /* @__PURE__ */ new Set(), d = (x, u) => {
    for (const o of c.get(x) ?? [])
      r.has(o.id) || (r.add(o.id), i.push({ ...o, depth: u }), d(o.id, u + 1));
  };
  d(null, 0);
  for (const x of s)
    r.has(x.id) || (r.add(x.id), i.push({ ...x, depth: 0 }), d(x.id, 1));
  return i;
}
function fl({ collection: s, rows: l, hierarchical: n = !1 }) {
  const c = D.useCallback(
    (u) => gl(u, (o) => n ? o.parentId : null),
    [n]
  ), [i, r] = D.useState(() => c(l));
  D.useEffect(() => r(c(l)), [l, c]);
  const d = (u, o) => {
    const p = as(i, u, o), m = ce(p, u).map((h) => p[h].id);
    r(p), y.router.post(
      z("cms/entries/reorder"),
      { collection: s, ids: m, parent_id: u < 0 ? null : i[u]?.id ?? null },
      { preserveScroll: !0, preserveState: !0, onError: () => r(c(l)) }
    );
  }, x = (u) => /* @__PURE__ */ e.jsx(
    a.SortableList,
    {
      items: ce(i, u),
      getId: (o) => i[o].id,
      getLabel: (o) => i[o].title,
      onReorder: (o) => d(u, o),
      className: u < 0 ? "cms:gap-1" : "cms:mt-1 cms:gap-1 cms:pl-6",
      children: (o, { handle: p }) => {
        const m = i[o];
        return /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-lg cms:border cms:border-border/70 cms:bg-card cms:p-2 cms:text-sm", children: [
            /* @__PURE__ */ e.jsx(a.SortableHandle, { ...p, label: t("Move :title", { title: m.title }) }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium", children: m.title }),
            /* @__PURE__ */ e.jsx(a.Badge, { variant: m.status === "published" ? "success" : "secondary", children: ae(m.status) })
          ] }),
          ce(i, o).length > 0 && x(o)
        ] });
      }
    }
  );
  return /* @__PURE__ */ e.jsxs(a.Card, { className: "cms:p-2", children: [
    n && /* @__PURE__ */ e.jsx("p", { className: "cms:px-1 cms:pb-1 cms:text-xs cms:text-muted-foreground", children: t("Entries move among those at their level, with what's under them. To put one under another, choose its Parent in its Page settings.") }),
    x(-1)
  ] });
}
function jl(s, l, n) {
  const c = { ...s, ...l }, i = Object.fromEntries(Object.entries(c.terms).filter(([, d]) => d !== "")), r = {};
  return c.search && (r.search = c.search), c.status && (r.status = c.status), c.author && (r.author = c.author), Object.keys(i).length > 0 && (r.terms = i), c.locale && c.locale !== n && (r.locale = c.locale), c.sort && (r.sort = c.sort), r.per_page = c.perPage, r;
}
function bl(s) {
  const l = new URLSearchParams();
  for (const [n, c] of Object.entries(s))
    if (typeof c == "object")
      for (const [i, r] of Object.entries(c)) l.set(`${n}[${i}]`, r);
    else
      l.set(n, String(c));
  return l.toString();
}
function vl(s, l) {
  return s === l ? `-${l}` : s === `-${l}` ? "" : l;
}
function yl(s, l) {
  return s === l ? "asc" : s === `-${l}` ? "desc" : null;
}
function bs(s) {
  return [s.search, s.status, s.author, ...Object.values(s.terms)].filter((l) => l !== "").length;
}
const He = "__all", Nl = () => [
  { value: "draft", label: t("Drafts") },
  { value: "published", label: t("Published") },
  { value: "scheduled", label: t("Scheduled") },
  { value: "trashed", label: t("Trash") }
];
function Sl(s) {
  const { collection: l, entries: n, query: c } = s;
  return a.useBreadcrumbs([{ label: l ? l.title : t("Entries") }]), !l || !n || !c ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: t("Entries") }),
    /* @__PURE__ */ e.jsx(a.PageHeader, { title: t("Entries"), description: t("There are no collections yet. Create one under Structure → Collections, then come back to write its entries.") })
  ] }) : /* @__PURE__ */ e.jsx(kl, { ...s, collection: l, entries: n, query: c });
}
function kl({
  collection: s,
  collections: l,
  entries: n,
  query: c,
  columns: i = [],
  filters: r = { authors: [], taxonomies: [], locales: [] },
  links: d = [],
  manualOrder: x = !1,
  perPageOptions: u = [10, 25, 50, 100],
  preferencesKey: o,
  can: p
}) {
  const m = z(`cms/collections/${s.handle}/entries`), h = r.locales[0] ?? c.locale, [f, k] = D.useState(c.search), [b, N] = D.useState([]), [_, S] = D.useState(!1), [w, g] = oe(), { setColumns: B, setPerPage: E } = a.useTablePreferences(o ?? `table.cms.entries.${s.handle}`, { columns: c.columns, perPage: c.perPage });
  D.useEffect(() => N([]), [n]);
  const j = c.status === "trashed", M = bs(c) > 0, $ = i.filter((v) => c.columns.includes(v.key)), F = (v = {}) => jl(c, v, h), C = (v) => y.router.get(m, F(v), { preserveState: !0, preserveScroll: !0, replace: !0 });
  D.useEffect(() => {
    if (f === c.search) return;
    const v = window.setTimeout(() => C({ search: f }), 300);
    return () => window.clearTimeout(v);
  }, [f]);
  const H = j ? p?.delete ? [{ action: "restore", label: t("Restore") }, { action: "delete", label: t("Delete for good"), danger: !0 }] : [] : [
    ...p?.publish ? [{ action: "publish", label: t("Publish") }, { action: "unpublish", label: t("Unpublish") }] : [],
    ...p?.delete ? [{ action: "trash", label: t("Move to the trash"), danger: !0 }] : []
  ], V = (v, O, R = !1) => {
    const ne = () => y.router.post(`${m}/bulk`, { action: v, ids: b }, { preserveScroll: !0 });
    if (R) {
      const Me = b.length === 1 ? t(":action: 1 entry?", { action: O }) : t(":action: :count entries?", { action: O, count: b.length });
      w(
        `${Me} ${t(v === "delete" ? "This can't be undone." : "They come off the site; you can restore them.")}`,
        ne,
        t(v === "trash" ? "Move to trash" : "Delete")
      );
    } else
      ne();
  }, L = async (v) => {
    const O = new Set(c.columns);
    O.has(v) ? O.delete(v) : O.add(v), await B(i.map((R) => R.key).filter((R) => O.has(R))), y.router.reload({ only: ["entries", "query"] });
  }, fe = () => {
    k(""), C({ search: "", status: "", author: "", terms: {} });
  }, Z = x && !!p?.update, X = Z && n !== null && n.lastPage <= 1 && n.data.length > 1, q = j && !!p?.delete, xe = 1 + $.length + (H.length > 0 ? 1 : 0) + (Z ? 1 : 0) + (q ? 1 : 0), de = bl(F()), se = [...new Set(d.map((v) => v.group))];
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: s.title }),
    g,
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: s.title,
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          d.length > 0 && /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(a.Button, { variant: "outline", children: [
              /* @__PURE__ */ e.jsx(xa, {}),
              " ",
              t("Go to")
            ] }) }),
            /* @__PURE__ */ e.jsx(a.DropdownMenuContent, { align: "end", className: "cms:min-w-56", children: se.map((v, O) => /* @__PURE__ */ e.jsxs(D.Fragment, { children: [
              O > 0 && /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
              /* @__PURE__ */ e.jsx(a.DropdownMenuLabel, { children: v }),
              d.filter((R) => R.group === v).map((R) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { asChild: !0, children: R.external ? /* @__PURE__ */ e.jsxs("a", { href: R.href, target: "_blank", rel: "noopener noreferrer", children: [
                R.label,
                " ",
                /* @__PURE__ */ e.jsx(ge, { className: "cms:ml-auto" })
              ] }) : /* @__PURE__ */ e.jsx(y.Link, { href: R.href, children: R.label }) }, R.href))
            ] }, v)) })
          ] }),
          s.listing && !j && /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs(y.Link, { href: z(`cms/collections/${s.handle}/listing/edit`), children: [
            /* @__PURE__ */ e.jsx(va, {}),
            " ",
            t("Listing page")
          ] }) }),
          n.total > 0 && p?.export && /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: `${m}/export${de ? `?${de}` : ""}`, children: [
            /* @__PURE__ */ e.jsx(qs, {}),
            " ",
            t("Export CSV")
          ] }) }),
          p?.create && !j && /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(y.Link, { href: `${m}/create`, children: [
            /* @__PURE__ */ e.jsx(Q, {}),
            " ",
            t("New entry")
          ] }) })
        ] }),
        children: l.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: s.handle, onValueChange: (v) => y.router.get(z(`cms/collections/${v}/entries`)), children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": t("Collection"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: l.map((v) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: v.handle, children: v.title }, v.handle)) })
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
            value: f,
            onChange: (v) => k(v.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(Pe, { label: t("Status"), value: c.status, options: Nl(), onChange: (v) => C({ status: v }) }),
      r.authors.length > 0 && /* @__PURE__ */ e.jsx(Pe, { label: t("Author"), value: c.author, options: r.authors, onChange: (v) => C({ author: v }) }),
      r.taxonomies.filter((v) => v.terms.length > 0).map((v) => /* @__PURE__ */ e.jsx(
        Pe,
        {
          label: v.title,
          value: c.terms[v.handle] ?? "",
          options: v.terms.map((O) => ({ value: O.value, label: `${"— ".repeat(O.depth)}${O.label}` })),
          onChange: (O) => C({ terms: { ...c.terms, [v.handle]: O } })
        },
        v.handle
      )),
      r.locales.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: c.locale, onValueChange: (v) => C({ locale: v }), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-auto cms:min-w-40 cms:max-w-72", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(a.SelectContent, { children: r.locales.map((v) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: v, children: [
          P(v),
          v === h ? ` ${t("(main)")}` : ""
        ] }, v)) })
      ] }),
      M && /* @__PURE__ */ e.jsxs(a.Button, { variant: "ghost", size: "sm", onClick: fe, children: [
        /* @__PURE__ */ e.jsx(_e, {}),
        " ",
        t("Clear")
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:ml-auto cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
        b.length > 0 && H.length > 0 && /* @__PURE__ */ e.jsxs("div", { role: "toolbar", "aria-label": t("Selected entries"), className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t(":count selected", { count: b.length }) }),
          H.map((v) => /* @__PURE__ */ e.jsx(a.Button, { size: "sm", variant: v.danger ? "destructive" : "outline", onClick: () => V(v.action, v.label, v.danger), children: v.label }, v.action))
        ] }),
        X && /* @__PURE__ */ e.jsxs(a.Button, { variant: _ ? "secondary" : "outline", "aria-pressed": _, onClick: () => S(!_), children: [
          /* @__PURE__ */ e.jsx(Bs, {}),
          " ",
          t(_ ? "Done" : "Reorder")
        ] }),
        i.length > 0 && /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
          /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(a.Button, { variant: "outline", children: [
            /* @__PURE__ */ e.jsx(ha, {}),
            " ",
            t("Columns")
          ] }) }),
          /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", className: "cms:max-h-96 cms:overflow-y-auto", children: [
            /* @__PURE__ */ e.jsx(a.DropdownMenuLabel, { children: t("Columns") }),
            i.filter((v) => !v.field).map((v) => /* @__PURE__ */ e.jsx(
              a.DropdownMenuCheckboxItem,
              {
                checked: c.columns.includes(v.key),
                onSelect: (O) => O.preventDefault(),
                onCheckedChange: () => {
                  L(v.key);
                },
                children: v.label
              },
              v.key
            )),
            i.some((v) => v.field) && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
              /* @__PURE__ */ e.jsx(a.DropdownMenuLabel, { children: t("Fields") }),
              i.filter((v) => v.field).map((v) => /* @__PURE__ */ e.jsx(
                a.DropdownMenuCheckboxItem,
                {
                  checked: c.columns.includes(v.key),
                  onSelect: (O) => O.preventDefault(),
                  onCheckedChange: () => {
                    L(v.key);
                  },
                  children: v.label
                },
                v.key
              ))
            ] })
          ] })
        ] })
      ] })
    ] }),
    _ && X ? /* @__PURE__ */ e.jsx(fl, { collection: s.handle, rows: n.data, hierarchical: s.hierarchical === !0 }) : /* @__PURE__ */ e.jsxs(a.Card, { className: "cms:gap-0 cms:overflow-hidden cms:py-0", children: [
      /* @__PURE__ */ e.jsxs(a.Table, { children: [
        /* @__PURE__ */ e.jsx(a.TableHeader, { className: "cms:bg-muted/60", children: /* @__PURE__ */ e.jsxs(a.TableRow, { className: "cms:hover:bg-transparent", children: [
          H.length > 0 && /* @__PURE__ */ e.jsx(a.TableHead, { className: "cms:w-10", children: /* @__PURE__ */ e.jsx(
            a.Checkbox,
            {
              "aria-label": t("Select all on this page"),
              checked: n.data.length > 0 && b.length === n.data.length,
              onCheckedChange: (v) => N(v ? n.data.map((O) => O.id) : [])
            }
          ) }),
          /* @__PURE__ */ e.jsx(vs, { label: t("Title"), sortKey: "title", sort: c.sort, onSort: (v) => C({ sort: v }) }),
          $.map((v) => v.sortable ? /* @__PURE__ */ e.jsx(vs, { label: v.label, sortKey: v.key, sort: c.sort, onSort: (O) => C({ sort: O }) }, v.key) : /* @__PURE__ */ e.jsx(a.TableHead, { children: v.label }, v.key)),
          Z && /* @__PURE__ */ e.jsx(a.TableHead, { className: "cms:w-px", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: t("Order") }) }),
          q && /* @__PURE__ */ e.jsx(a.TableHead, { className: "cms:w-px", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: t("Restore") }) })
        ] }) }),
        /* @__PURE__ */ e.jsxs(a.TableBody, { children: [
          n.data.length === 0 && /* @__PURE__ */ e.jsx(a.TableRow, { className: "cms:hover:bg-transparent", children: /* @__PURE__ */ e.jsx(a.TableCell, { colSpan: xe, className: "cms:h-32 cms:text-center cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx($l, { trashed: j, filtered: bs(j ? { ...c, status: "" } : c) > 0, canCreate: !!p?.create, createUrl: `${m}/create`, onClear: fe }) }) }),
          n.data.map((v, O) => /* @__PURE__ */ e.jsxs(a.TableRow, { className: "sunrice-row-in", style: { "--i": O }, "data-state": b.includes(v.id) ? "selected" : void 0, children: [
            H.length > 0 && /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx(
              a.Checkbox,
              {
                "aria-label": t("Select :title", { title: v.title }),
                checked: b.includes(v.id),
                onCheckedChange: (R) => N(R ? [...b, v.id] : b.filter((ne) => ne !== v.id))
              }
            ) }),
            /* @__PURE__ */ e.jsxs(a.TableCell, { children: [
              /* @__PURE__ */ e.jsx(
                y.Link,
                {
                  href: z(`cms/collections/${s.handle}/entries/${v.id}/edit${c.locale !== h ? `?locale=${encodeURIComponent(c.locale)}` : ""}`),
                  className: "cms:font-medium cms:underline-offset-4 cms:hover:underline",
                  children: v.title
                }
              ),
              (!c.columns.includes("slug") && v.path || v.parent) && /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: [c.columns.includes("slug") ? null : v.path, v.parent ? t("under :parent", { parent: v.parent }) : null].filter(Boolean).join(" · ") })
            ] }),
            $.map((R) => /* @__PURE__ */ e.jsx(a.TableCell, { className: R.key === "status" ? "" : "cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx("div", { className: "cms:max-w-72 cms:truncate", children: /* @__PURE__ */ e.jsx(Cl, { row: v, column: R, mainLocale: h }) }) }, R.key)),
            Z && /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:w-px", children: /* @__PURE__ */ e.jsxs("span", { className: "cms:flex", children: [
              /* @__PURE__ */ e.jsx(a.Button, { variant: "ghost", size: "icon", "aria-label": t("Move :title up", { title: v.title }), onClick: () => y.router.post(z(`cms/entries/${v.id}/move`), { direction: "up" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(zs, {}) }),
              /* @__PURE__ */ e.jsx(a.Button, { variant: "ghost", size: "icon", "aria-label": t("Move :title down", { title: v.title }), onClick: () => y.router.post(z(`cms/entries/${v.id}/move`), { direction: "down" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(_s, {}) })
            ] }) }),
            q && /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:w-px", children: /* @__PURE__ */ e.jsxs(
              a.Button,
              {
                variant: "outline",
                size: "sm",
                "aria-label": `Restore ${v.title}`,
                onClick: () => y.router.post(z(`cms/entries/${v.id}/restore`), {}, { preserveScroll: !0 }),
                children: [
                  /* @__PURE__ */ e.jsx(je, {}),
                  " Restore"
                ]
              }
            ) })
          ] }, v.id))
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4 cms:border-t cms:px-6 cms:py-3 cms:text-sm cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-4", children: [
          /* @__PURE__ */ e.jsx("span", { children: n.total === 0 ? t("No entries") : t(":from–:to of :total", { from: n.from, to: n.to, total: n.total }) }),
          /* @__PURE__ */ e.jsxs(a.Select, { value: String(c.perPage), onValueChange: (v) => {
            E(Number(v)), C({ perPage: Number(v) });
          }, children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:h-8 cms:w-auto", "aria-label": t("Entries per page"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(a.SelectContent, { children: u.map((v) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: String(v), children: t(":count per page", { count: v }) }, v)) })
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
              onClick: () => n.prev_page_url && y.router.get(n.prev_page_url, {}, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(Qe, {})
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
              onClick: () => n.next_page_url && y.router.get(n.next_page_url, {}, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(ve, {})
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function Pe({ label: s, value: l, options: n, onChange: c }) {
  return /* @__PURE__ */ e.jsxs(a.Select, { value: l === "" ? He : l, onValueChange: (i) => c(i === He ? "" : i), children: [
    /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-auto cms:min-w-40 cms:max-w-72", title: s, "aria-label": s, children: /* @__PURE__ */ e.jsx(a.SelectValue, { placeholder: s }) }),
    /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
      /* @__PURE__ */ e.jsx(a.SelectItem, { value: He, children: t(":filter: all", { filter: s }) }),
      n.map((i) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: i.value, children: i.label }, i.value))
    ] })
  ] });
}
function vs({ label: s, sortKey: l, sort: n, onSort: c }) {
  const i = yl(n, l);
  return /* @__PURE__ */ e.jsx(a.TableHead, { "aria-sort": i === "asc" ? "ascending" : i === "desc" ? "descending" : void 0, children: /* @__PURE__ */ e.jsxs(
    "button",
    {
      type: "button",
      onClick: () => c(vl(n, l)),
      className: "cms:-ml-2 cms:inline-flex cms:h-8 cms:items-center cms:gap-1 cms:rounded-md cms:px-2 cms:hover:bg-accent cms:hover:text-accent-foreground",
      children: [
        s,
        i === "asc" ? /* @__PURE__ */ e.jsx(zs, { className: "cms:size-3" }) : i === "desc" ? /* @__PURE__ */ e.jsx(_s, { className: "cms:size-3" }) : /* @__PURE__ */ e.jsx(Bs, { className: "cms:size-3 cms:opacity-40" })
      ]
    }
  ) });
}
function Cl({ row: s, column: l, mainLocale: n }) {
  switch (l.key) {
    case "slug":
      return /* @__PURE__ */ e.jsx("span", { className: "cms:font-mono", children: s.slug });
    case "status":
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-1", children: [
        s.trashed ? /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", className: "cms:text-destructive", title: t(":status before it was trashed", { status: ae(s.status) }), children: t("Trashed") }) : /* @__PURE__ */ e.jsx(a.Badge, { variant: s.status === "published" ? "success" : "secondary", children: ae(s.status) }),
        s.locales.length > 1 && s.locales.filter((c) => !c.main).map((c) => {
          const i = wl(c);
          return /* @__PURE__ */ e.jsxs(
            a.Badge,
            {
              variant: i.variant,
              className: i.className,
              title: t(":language: :status", { language: P(c.code), status: i.title }),
              "aria-label": t(":language: :status", { language: P(c.code), status: i.title }),
              children: [
                c.code.toUpperCase(),
                i.word && /* @__PURE__ */ e.jsx("span", { className: "cms:font-normal", children: i.word })
              ]
            },
            c.code
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
function wl(s) {
  return s.status === null ? { variant: "outline", className: "cms:border-dashed cms:text-muted-foreground", word: t("missing"), title: t("not translated") } : s.outdated ? { variant: "warning", className: "", word: t("outdated"), title: t(":status, outdated: the main language changed since", { status: ae(s.status) }) } : s.status === "published" ? { variant: "secondary", className: "", word: null, title: t("Published") } : { variant: "outline", className: "", word: s.status === "scheduled" ? t("scheduled") : t("draft"), title: ae(s.status) };
}
function $l({ trashed: s, filtered: l, canCreate: n, createUrl: c, onClear: i }) {
  return l ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: t("Nothing matches these filters.") }),
    /* @__PURE__ */ e.jsxs(a.Button, { variant: "outline", size: "sm", onClick: i, children: [
      /* @__PURE__ */ e.jsx(_e, {}),
      " ",
      t("Clear filters")
    ] })
  ] }) : s ? /* @__PURE__ */ e.jsx(e.Fragment, { children: t("The trash is empty.") }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: t("No entries yet.") }),
    n && /* @__PURE__ */ e.jsx(a.Button, { size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs(y.Link, { href: c, children: [
      /* @__PURE__ */ e.jsx(Q, {}),
      " ",
      t("Write the first one")
    ] }) })
  ] });
}
function ls({ message: s, processing: l, onSaveMine: n }) {
  const [c, i] = oe();
  return s ? /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: [
    i,
    /* @__PURE__ */ e.jsx("span", { children: s }),
    /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => y.router.reload(), children: t("Load theirs") }),
      /* @__PURE__ */ e.jsx(
        a.Button,
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
function Dl(s) {
  return /* @__PURE__ */ e.jsx(_l, { ...s }, `${s.locale}:${s.version}:${JSON.stringify([s.values, s.seo])}`);
}
function _l({ collection: s, fields: l, locale: n, locales: c, shared: i, values: r, seo: d, version: x, can: u }) {
  const o = z(`cms/collections/${s.handle}/listing`), p = z(`cms/collections/${s.handle}/entries`);
  a.useBreadcrumbs([{ label: s.title, href: p }, { label: t("Listing page") }]);
  const m = y.useForm({ locale: n, data: r, seo: d ?? {}, version: x }), h = m.errors, f = (S) => {
    const w = Be(h, S);
    w.length > 0 && m.clearErrors(...w);
  }, k = c[0], b = u.update, N = () => m.processing || m.put(o, { preserveScroll: !0 }), _ = () => {
    m.transform((S) => ({ ...S, version: null })), m.put(o, { preserveScroll: !0 });
  };
  return a.useUnsavedChanges(m.isDirty, b ? N : void 0), /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (S) => {
    S.preventDefault(), N();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: t(":title: listing page", { title: s.title }) }),
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: t(":title: listing page", { title: s.title }),
        back: { href: p, label: t("Back to :title", { title: s.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          c.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: n, onValueChange: (S) => y.router.get(o, { locale: S }), children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(a.SelectContent, { children: c.map((S, w) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: S, children: [
              P(S),
              w === 0 ? ` ${t("(main)")}` : ""
            ] }, S)) })
          ] }),
          s.url && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: s.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(ge, {}),
            " ",
            t("View")
          ] }) }),
          b && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: m.processing, children: [
            m.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
            " ",
            t("Save")
          ] })
        ] }),
        children: m.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
      }
    ),
    /* @__PURE__ */ e.jsxs("fieldset", { disabled: !b, className: "cms:flex cms:flex-col cms:gap-6", children: [
      /* @__PURE__ */ e.jsx(ls, { message: h.version, processing: m.processing, onSaveMine: _ }),
      l.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("The listing page has no fields of its own: choose a listing blueprint for the collection under Structure → Collections.") }) : /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: [
        (i.length > 0 || $e(l)) && /* @__PURE__ */ e.jsx("p", { role: "note", className: "cms:rounded-lg cms:border cms:border-dashed cms:px-3 cms:py-2 cms:text-sm cms:text-muted-foreground", children: k ? t("Shared by all languages: the greyed-out fields are edited in :language.", { language: P(k) }) : t("Shared by all languages: the greyed-out fields are edited in the main language.") }),
        l.filter((S) => es(S, { ...r, ...m.data.data })).map((S) => i.includes(S.handle) ? /* @__PURE__ */ e.jsx("fieldset", { disabled: !0, className: Ot, title: t("Shared by all languages"), children: /* @__PURE__ */ e.jsx(ie, { id: `data-${S.handle}`, field: S, content: !0, value: r[S.handle], errors: {}, onChange: () => {
        } }) }, S.handle) : /* @__PURE__ */ e.jsx(
          ie,
          {
            id: `data-${S.handle}`,
            field: S,
            content: !0,
            value: m.data.data[S.handle],
            errors: ee(h, `data.${S.handle}`),
            onChange: (w) => {
              m.setData("data", { ...m.data.data, [S.handle]: w }), f(`data.${S.handle}`);
            }
          },
          S.handle
        ))
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: t("SEO"), description: t("How the listing page appears in search results and shared links."), titleClassName: "cms:text-base", storageKey: "cms:listing:seo", hasErrors: Ne(h, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !b, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(he, { bare: !0, id: "seo", fields: ts(), value: m.data.seo, errors: ee(h, "seo"), onChange: (S) => {
      m.setData("seo", S), f("seo");
    } }) }) })
  ] });
}
function Tl({ fieldsets: s }) {
  const l = y.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(I, { message: l.fieldset }),
    /* @__PURE__ */ e.jsx(
      Ht,
      {
        kind: "fieldset",
        base: z("cms/fieldsets"),
        rows: s,
        intro: t("Fields shared between blueprints, and the kinds of block of flexible fields.")
      }
    )
  ] });
}
function Bl(s) {
  return /* @__PURE__ */ e.jsx(Ml, { ...s }, `${s.locale}:${s.version}:${JSON.stringify(s.values)}`);
}
function Ml({ set: s, fields: l, locale: n, locales: c, shared: i, values: r, version: d, can: x, settings: u }) {
  const o = z(`cms/globals/${s.handle}/values`);
  a.useBreadcrumbs([{ label: t("Globals"), href: z("cms/globals") }, { label: s.title }]);
  const p = y.useForm({ locale: n, data: r, version: d }), m = p.errors, h = (w) => {
    const g = Be(m, w);
    g.length > 0 && p.clearErrors(...g);
  }, f = c[0], k = a.useEditLock({
    type: "cms.global",
    id: s.id,
    locale: n,
    enabled: x.update,
    noun: t("global set"),
    leaveTo: z("cms/globals"),
    getUnsaved: () => p.isDirty ? { data: p.data.data } : null
  }), b = x.update && !k.readOnly, N = () => p.processing || p.put(o, { preserveScroll: !0 }), _ = () => {
    p.transform((w) => ({ ...w, version: null })), p.put(o, { preserveScroll: !0 });
  }, S = async (w) => {
    const g = await k.loadKept(w);
    g.data && typeof g.data == "object" && p.setData("data", g.data);
  };
  return a.useUnsavedChanges(p.isDirty && !k.takenOver, b ? N : void 0), /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (w) => {
    w.preventDefault(), N();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: s.title }),
    k.dialogs,
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: s.title,
        back: { href: z("cms/globals"), label: t("Back to globals") },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          u && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(y.Link, { href: u, children: [
            /* @__PURE__ */ e.jsx(Ze, {}),
            " ",
            t("Settings")
          ] }) }),
          c.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: n, onValueChange: (w) => y.router.get(o, { locale: w }), children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(a.SelectContent, { children: c.map((w, g) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: w, children: [
              P(w),
              g === 0 ? ` ${t("(main)")}` : ""
            ] }, w)) })
          ] }),
          b && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: p.processing, children: [
            p.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
            " ",
            t("Save")
          ] })
        ] }),
        children: p.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
      }
    ),
    l.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("This global set has no fields: choose a blueprint for it in its Settings.") }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(a.ViewingNotice, { by: k.viewingBy, onTakeOver: k.requestTakeOver }),
      f && n !== f && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:bg-muted/40 cms:p-3 cms:text-sm cms:text-muted-foreground", role: "note", children: d === null ? t("Not saved in :language yet: these are the :main values, which the site shows meanwhile. Translate them, then save.", { language: P(n), main: P(f) }) : t("A field left empty shows the :main value on the site.", { main: P(f) }) }),
      /* @__PURE__ */ e.jsx(ls, { message: m.version, processing: p.processing, onSaveMine: _ }),
      /* @__PURE__ */ e.jsx(a.KeptEditsNotice, { kept: k.kept, disabled: !b, onLoad: (w) => {
        S(w);
      }, onDiscard: (w) => {
        k.discardKept(w);
      } }),
      /* @__PURE__ */ e.jsx(
        ss,
        {
          disabled: !b,
          fields: l,
          values: p.data.data,
          errors: m,
          storageKey: `cms:global:${s.handle}`,
          shared: i,
          sharedValues: r,
          sharedNote: f ? t("Shared by all languages: the greyed-out fields are edited in :language.", { language: P(f) }) : t("Shared by all languages: the greyed-out fields are edited in the main language."),
          onChange: (w, g) => {
            p.setData("data", { ...p.data.data, [w]: g }), h(`data.${w}`);
          }
        }
      )
    ] })
  ] });
}
let Ut = 0;
function qt(s, l = 0) {
  return s.flatMap(({ children: n, ...c }) => [{ ...c, key: `m${++Ut}`, depth: l }, ...qt(n ?? [], l + 1)]);
}
function zl(s) {
  const l = [], n = [{ depth: -1, children: l }];
  for (const { key: c, depth: i, ...r } of s) {
    for (; n.length > 1 && n[n.length - 1].depth >= i; ) n.pop();
    const d = { ...r, children: [] };
    n[n.length - 1].children.push(d), n.push({ depth: i, children: d.children });
  }
  return l;
}
function be(s, l) {
  const n = s[l]?.depth ?? 0;
  let c = l + 1;
  for (; c < s.length && s[c].depth > n; ) c++;
  return c;
}
function Kt(s, l, n) {
  const c = be(s, l);
  return s.map((i, r) => r >= l && r < c ? { ...i, depth: i.depth + n } : i);
}
function Ll(s, l, n) {
  const c = s[l], i = s[l - 1];
  return !c || !i || c.depth > i.depth || Math.max(...s.slice(l, be(s, l)).map((d) => d.depth)) + 1 > n - 1 ? s : Kt(s, l, 1);
}
function Il(s, l) {
  const n = s[l];
  if (!n || n.depth === 0) return s;
  let c = l - 1;
  for (; c > 0 && s[c].depth >= n.depth; ) c--;
  const i = be(s, l), r = be(s, c), d = Kt(s, l, -1).slice(l, i);
  return [...s.slice(0, l), ...s.slice(i, r), ...d, ...s.slice(r)];
}
function Al(s, l) {
  return [...s.slice(0, l), ...s.slice(be(s, l))];
}
function ke(s) {
  return { key: `m${++Ut}`, depth: 0, entry_id: null, term_id: null, collection_id: null, target: null, url: null, labels: {}, new_tab: !1, query: null, ...s };
}
function El({ menu: s, items: l, locales: n, limits: c, terms: i, listings: r, can: d, settings: x }) {
  const u = z(`cms/menus/${s.handle}/links`);
  a.useBreadcrumbs([{ label: t("Menus"), href: z("cms/menus") }, { label: s.title }]);
  const [o, p] = D.useState(() => qt(l)), [m, h] = D.useState(null), f = y.useForm({ items: l }), k = f.errors, [b, N] = D.useState(!1), _ = n[0] ?? "en", S = (j) => {
    p(j), N(!0);
  }, w = (j, M) => S(o.map(($, F) => F === j ? { ...$, ...M } : $)), g = () => {
    f.processing || (f.transform(() => ({ items: zl(o).map(Wt) })), f.put(u, { preserveScroll: !0, onSuccess: () => N(!1) }));
  }, B = (j) => {
    j.preventDefault(), g();
  };
  a.useUnsavedChanges(b, d.update ? g : void 0);
  const E = (j) => /* @__PURE__ */ e.jsx(
    a.SortableList,
    {
      items: ce(o, j),
      getId: (M) => o[M].key,
      getLabel: (M) => o[M].labels[_] || o[M].target?.title || o[M].url || "link",
      disabled: !d.update,
      onReorder: (M) => S(as(o, j, M)),
      className: j < 0 ? "cms:gap-1" : "cms:mt-1 cms:gap-1 cms:pl-6",
      children: (M, { handle: $, isOverlay: F }) => {
        const C = o[M];
        return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${F ? "" : "cms:border-border/70"}`, children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2 cms:p-2", children: [
            d.update && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:h-10 cms:shrink-0 cms:items-center", children: /* @__PURE__ */ e.jsx(a.SortableHandle, { ...$, label: t("Move :title", { title: C.labels[_] || C.target?.title || C.url || t("link") }) }) }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
                /* @__PURE__ */ e.jsx(
                  a.Input,
                  {
                    "aria-label": t("Label (:language)", { language: P(_) }),
                    className: "cms:w-full cms:sm:max-w-xs",
                    disabled: !d.update,
                    placeholder: C.target?.title ?? t("Label"),
                    value: C.labels[_] ?? "",
                    onChange: (H) => w(M, { labels: { ...C.labels, [_]: H.target.value } })
                  }
                ),
                /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-32 cms:flex-1 cms:truncate cms:text-sm cms:text-muted-foreground", children: C.url !== null ? C.url : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  C.target ? `${C.target.kind}: ${C.target.title}` : t("Gone"),
                  " ",
                  (!C.target || !C.target.live) && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", children: t("Not on the site") })
                ] }) }),
                d.update && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center", children: [
                  /* @__PURE__ */ e.jsxs("label", { className: "cms:mr-2 cms:flex cms:items-center cms:gap-1.5 cms:text-sm", children: [
                    /* @__PURE__ */ e.jsx(a.Checkbox, { checked: C.new_tab, onCheckedChange: (H) => w(M, { new_tab: H }) }),
                    " ",
                    t("New tab")
                  ] }),
                  /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": t("Out a level"), disabled: C.depth === 0, onClick: () => S(Il(o, M)), children: /* @__PURE__ */ e.jsx(Na, {}) }),
                  /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": t("In a level"), onClick: () => S(Ll(o, M, c.depth)), children: /* @__PURE__ */ e.jsx(Sa, {}) }),
                  /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": t("Remove, with what's under it"), onClick: () => S(Al(o, M)), children: /* @__PURE__ */ e.jsx(W, {}) })
                ] })
              ] }),
              C.collection_id !== null && /* @__PURE__ */ e.jsx(
                a.Input,
                {
                  "aria-label": t("Filters"),
                  className: "cms:w-full cms:sm:max-w-md cms:font-mono",
                  disabled: !d.update,
                  placeholder: t("Filters (optional): :example", { example: "filter=value" }),
                  value: C.query ?? "",
                  onChange: (H) => w(M, { query: H.target.value })
                }
              ),
              n.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: n.slice(1).map((H) => /* @__PURE__ */ e.jsx(
                a.Input,
                {
                  "aria-label": t("Label (:language)", { language: P(H) }),
                  className: "cms:w-full cms:sm:max-w-xs",
                  disabled: !d.update,
                  placeholder: C.url === null ? t(":language: its title there, else as :main", { language: P(H), main: P(_) }) : t(":language: as :main", { language: P(H), main: P(_) }),
                  value: C.labels[H] ?? "",
                  onChange: (V) => w(M, { labels: { ...C.labels, [H]: V.target.value } })
                },
                H
              )) })
            ] })
          ] }),
          !F && ce(o, M).length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:px-2 cms:pb-2", children: E(M) })
        ] });
      }
    }
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: B, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: s.title }),
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: s.title,
        back: { href: z("cms/menus"), label: t("Back to menus") },
        actions: d.update && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          x && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(y.Link, { href: x, children: [
            /* @__PURE__ */ e.jsx(Ze, {}),
            " ",
            t("Settings")
          ] }) }),
          /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", disabled: o.length >= c.items, onClick: () => h("entry"), children: [
            /* @__PURE__ */ e.jsx(Q, {}),
            " ",
            t("Entry")
          ] }),
          i.length > 0 && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", disabled: o.length >= c.items, onClick: () => h("term"), children: [
            /* @__PURE__ */ e.jsx($a, {}),
            " ",
            t("Term")
          ] }),
          r.length > 0 && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", disabled: o.length >= c.items, onClick: () => h("listing"), children: [
            /* @__PURE__ */ e.jsx(ka, {}),
            " ",
            t("Listing")
          ] }),
          /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", disabled: o.length >= c.items, onClick: () => h("url"), children: [
            /* @__PURE__ */ e.jsx(ya, {}),
            " ",
            t("Link")
          ] }),
          /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: f.processing, children: [
            f.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
            " ",
            t("Save")
          ] })
        ] }),
        children: b && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
      }
    ),
    /* @__PURE__ */ e.jsx(I, { message: k.items }),
    Object.keys(k).some((j) => j.startsWith("items.")) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: t("Some links need fixing: :error", { error: Object.values(k).filter(Boolean)[0] }) }),
    /* @__PURE__ */ e.jsx(a.Card, { className: "cms:p-2", children: o.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:p-4 cms:text-center cms:text-muted-foreground", children: t("No links yet. Add an entry or a link.") }) : E(-1) }),
    /* @__PURE__ */ e.jsx(Ol, { kind: m, terms: i, listings: r, onClose: () => h(null), onAdd: (j) => {
      S([...o, j]), h(null);
    }, main: _ })
  ] });
}
function Wt({ target: s, children: l, ...n }) {
  return { ...n, children: l.map(Wt) };
}
const Fl = () => t("A menu links to entries that already exist: create the page first (Content → Entries), then add it here, or add a web address instead."), Hl = () => ({ entry: t("Link to an entry"), term: t("Link to a term's page"), listing: t("Link to a listing page"), url: t("Link to an address") }), Pl = () => ({
  entry: t("It follows the entry: its title (unless you give a label) and its address in each language. It shows only while the entry is on the site."),
  term: t("The page listing the term's entries, in each language. Its title is the label unless you give one."),
  listing: t("The collection's listing page, in each language, optionally with filters. The collection's title is the label unless you give one."),
  url: t("A web address, a path on this site (/contact), mailto: or tel:.")
});
function Ol({ kind: s, terms: l, listings: n, onClose: c, onAdd: i, main: r }) {
  const [d, x] = D.useState(null), [u, o] = D.useState(""), [p, m] = D.useState(""), [h, f] = D.useState(""), [k, b] = D.useState("");
  D.useEffect(() => {
    x(null), o(""), m(""), f(""), b("");
  }, [s]);
  const N = p.trim() === "" || La(p.trim()), _ = h.trim() ? { [r]: h.trim() } : {}, S = async () => {
    if (s === "entry" && d !== null) {
      const g = await fetch(`${z("cms/entries/picker")}?${kt({ ids: [d], collections: [] })}`, { headers: { Accept: "application/json" }, credentials: "same-origin" }), B = g.ok ? (await g.json()).items[0] : void 0;
      i(ke({ entry_id: d, target: B ? { title: B.title, kind: B.collection, live: B.status === "published" } : null, labels: _ }));
    } else if (s === "term" && u !== "") {
      const g = l.find((B) => String(B.id) === u);
      i(ke({ term_id: Number(u), target: g ? { title: g.title, kind: g.taxonomy, live: !0 } : null, labels: _ }));
    } else if (s === "listing" && u !== "") {
      const g = n.find((B) => String(B.id) === u);
      i(ke({ collection_id: Number(u), target: g ? { title: g.title, kind: t("Listing page"), live: !0 } : null, labels: _, query: k.trim().replace(/^\?/, "") || null }));
    } else s === "url" && p.trim() !== "" && N && h.trim() !== "" && i(ke({ url: p.trim(), labels: _ }));
  }, w = s === "entry" ? d !== null : s === "url" ? p.trim() !== "" && N && h.trim() !== "" : u !== "";
  return /* @__PURE__ */ e.jsx(a.Dialog, { open: s !== null, onOpenChange: (g) => !g && c(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: s ? Hl()[s] : "" }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: s ? Pl()[s] : "" })
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
          emptyHint: Fl(),
          onChange: (g) => x(typeof g == "number" ? g : null)
        }
      ),
      (s === "term" || s === "listing") && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "menu-target", children: t(s === "term" ? "Term" : "Collection") }),
        /* @__PURE__ */ e.jsxs(a.Select, { value: u, onValueChange: o, children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: "menu-target", children: /* @__PURE__ */ e.jsx(a.SelectValue, { placeholder: t("Choose…") }) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: s === "term" ? l.map((g) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: String(g.id), children: [
            g.taxonomy,
            ": ",
            g.title
          ] }, g.id)) : n.map((g) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: String(g.id), children: g.title }, g.id)) })
        ] })
      ] }),
      s === "listing" && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "menu-query", children: t("Filters (optional)") }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: "menu-query",
            className: "cms:font-mono",
            value: k,
            placeholder: "filter=value&other=value",
            onChange: (g) => b(g.target.value)
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
            "aria-invalid": !N,
            onChange: (g) => m(g.target.value)
          }
        ),
        !N && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: t("This address could run code; use https://, a path, mailto: or tel:.") })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "menu-label", children: t(s === "url" ? "Label" : "Label (optional)") }),
        /* @__PURE__ */ e.jsx(a.Input, { id: "menu-label", value: h, onChange: (g) => f(g.target.value) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: c, children: t("Cancel") }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", onClick: () => {
        S();
      }, disabled: !w, children: t("Add") })
    ] })
  ] }) });
}
const Vl = () => [
  { value: "all", label: t("All") },
  { value: "pending", label: t("Pending") },
  { value: "approved", label: t("Approved") },
  { value: "spam", label: t("Spam") },
  { value: "trashed", label: t("Trash") }
], Rl = (s) => ({ pending: t("Pending"), approved: t("Approved"), spam: t("Spam") })[s];
function Ul({ tab: s, counts: l, filters: n, collections: c, comments: i, can: r, errors: d = {} }) {
  a.useBreadcrumbs([{ label: t("Comments"), href: z("cms/comments") }]);
  const [x, u] = D.useState(n.search), [o, p] = D.useState([]), [m, h] = D.useState(null), [f, k] = oe(), b = (g) => {
    const B = { status: s, search: n.search, collection: n.collection, ...g };
    y.router.get(z("cms/comments"), {
      ...B.status !== "all" ? { status: B.status } : {},
      ...B.search ? { search: B.search } : {},
      ...B.collection ? { collection: B.collection } : {},
      ...n.entry ? { entry: n.entry } : {}
    }, { preserveState: !0, replace: !0, onSuccess: () => p([]) });
  };
  D.useEffect(() => {
    if (x === n.search) return;
    const g = window.setTimeout(() => b({ search: x }), 300);
    return () => window.clearTimeout(g);
  }, [x]);
  const N = (g, B = {}) => y.router.post(z(g), B, { preserveScroll: !0, onSuccess: () => p([]) }), _ = (g, B) => N(`cms/comments/${g.id}/status`, { status: B }), S = (g) => {
    const B = () => N("cms/comments/bulk", { action: g, ids: o });
    g === "delete" ? f(o.length === 1 ? t("Delete 1 comment for good? This can't be undone.") : t("Delete :count comments for good? This can't be undone.", { count: o.length }), B) : B();
  }, w = i.data.length > 0 && o.length === i.data.length;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: t("Comments") }),
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
                onChange: (g) => u(g.target.value)
              }
            )
          ] }),
          c.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: n.collection ?? "all", onValueChange: (g) => b({ collection: g === "all" ? null : g }), children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": t("Collection"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(a.SelectItem, { value: "all", children: t("Every collection") }),
              c.map((g) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: g.handle, children: g.title }, g.handle))
            ] })
          ] })
        ] })
      }
    ),
    n.entry !== null && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      t("Comments on one entry."),
      " ",
      /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:underline cms:underline-offset-4", onClick: () => y.router.get(z("cms/comments")), children: t("Show all") })
    ] }),
    /* @__PURE__ */ e.jsx(a.Tabs, { value: s, onValueChange: (g) => b({ status: g }), children: /* @__PURE__ */ e.jsx(a.TabsList, { className: "cms:h-auto cms:flex-wrap cms:justify-start", children: Vl().map((g) => /* @__PURE__ */ e.jsxs(a.TabsTrigger, { value: g.value, children: [
      g.label,
      " ",
      /* @__PURE__ */ e.jsx("span", { className: "cms:ml-1 cms:text-muted-foreground", children: l[g.value] })
    ] }, g.value)) }) }),
    o.length > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2 cms:text-sm", role: "toolbar", "aria-label": t("With the selected comments"), children: [
      /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", children: t(":count selected", { count: o.length }) }),
      r.moderate && s !== "trashed" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "outline", onClick: () => S("approve"), children: [
          /* @__PURE__ */ e.jsx(Ce, {}),
          " ",
          t("Approve")
        ] }),
        /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "outline", onClick: () => S("unapprove"), children: [
          /* @__PURE__ */ e.jsx(we, {}),
          " ",
          t("Unapprove")
        ] }),
        /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "outline", onClick: () => S("spam"), children: [
          /* @__PURE__ */ e.jsx(We, {}),
          " ",
          t("Spam")
        ] })
      ] }),
      r.delete && s !== "trashed" && /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "outline", onClick: () => S("trash"), children: [
        /* @__PURE__ */ e.jsx(W, {}),
        " ",
        t("Trash")
      ] }),
      r.delete && s === "trashed" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "outline", onClick: () => S("restore"), children: [
          /* @__PURE__ */ e.jsx(je, {}),
          " ",
          t("Restore")
        ] }),
        /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "destructive", onClick: () => S("delete"), children: [
          /* @__PURE__ */ e.jsx(W, {}),
          " ",
          t("Delete for good")
        ] })
      ] })
    ] }),
    i.data.length === 0 ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:rounded-xl cms:border cms:border-dashed cms:px-6 cms:py-16 cms:text-center", children: [
      /* @__PURE__ */ e.jsx("span", { className: "cms:grid cms:size-10 cms:place-items-center cms:rounded-full cms:bg-muted cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx(Ca, { className: "cms:size-4" }) }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: n.search ? t("No comments match.") : t("No comments here.") })
    ] }) : /* @__PURE__ */ e.jsxs(a.Card, { className: "cms:divide-y cms:p-0", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3 cms:px-4 cms:py-2 cms:text-sm cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsx(a.Checkbox, { checked: w, "aria-label": t("Select all"), onCheckedChange: (g) => p(g ? i.data.map((B) => B.id) : []) }),
        /* @__PURE__ */ e.jsx("span", { children: t(":from–:to of :total", { from: i.from, to: i.to, total: i.total }) })
      ] }),
      i.data.map((g) => /* @__PURE__ */ e.jsxs("article", { className: "cms:flex cms:gap-3 cms:px-4 cms:py-4", "aria-labelledby": `comment-${g.id}-author`, children: [
        /* @__PURE__ */ e.jsx(
          a.Checkbox,
          {
            checked: o.includes(g.id),
            "aria-label": t("Select :author's comment", { author: g.author }),
            onCheckedChange: (B) => p(B ? [...o, g.id] : o.filter((E) => E !== g.id))
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-x-3 cms:gap-y-1 cms:text-sm", children: [
            /* @__PURE__ */ e.jsx("span", { id: `comment-${g.id}-author`, className: "cms:font-medium", children: g.author }),
            g.email && /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", children: g.email }),
            g.member && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", children: t("Signed in") }),
            !g.trashed && /* @__PURE__ */ e.jsx(a.Badge, { variant: g.status === "approved" ? "success" : g.status === "spam" ? "destructive" : "warning", children: Rl(g.status) }),
            /* @__PURE__ */ e.jsxs("span", { className: "cms:text-muted-foreground", children: [
              g.createdAt ? K(g.createdAt) : "",
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
              /* @__PURE__ */ e.jsx(ge, { className: "cms:inline cms:size-3" })
            ] }) : g.entry.title,
            g.parent && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              " · ",
              t("replying to :author: “:excerpt”", { author: g.parent.author, excerpt: g.parent.excerpt })
            ] })
          ] }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:whitespace-pre-wrap cms:break-words", children: g.body }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-1", children: [
            r.moderate && !g.trashed && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              g.status !== "approved" && /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => _(g, "approved"), children: [
                /* @__PURE__ */ e.jsx(Ce, {}),
                " ",
                t("Approve")
              ] }),
              g.status === "approved" && /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => _(g, "pending"), children: [
                /* @__PURE__ */ e.jsx(we, {}),
                " ",
                t("Unapprove")
              ] }),
              g.status !== "spam" && /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => _(g, "spam"), children: [
                /* @__PURE__ */ e.jsx(We, {}),
                " ",
                t("Spam")
              ] }),
              g.status !== "spam" && /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => h({ row: g, mode: "reply" }), children: [
                /* @__PURE__ */ e.jsx(ct, {}),
                " ",
                t("Reply")
              ] }),
              /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => h({ row: g, mode: "edit" }), children: [
                /* @__PURE__ */ e.jsx(dt, {}),
                " ",
                t("Edit")
              ] })
            ] }),
            r.delete && !g.trashed && /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => y.router.delete(z(`cms/comments/${g.id}`), { preserveScroll: !0 }), children: [
              /* @__PURE__ */ e.jsx(W, {}),
              " ",
              t("Trash")
            ] }),
            r.delete && g.trashed && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => N(`cms/comments/${g.id}/restore`), children: [
                /* @__PURE__ */ e.jsx(je, {}),
                " ",
                t("Restore")
              ] }),
              /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => f(
                t("Delete this comment for good? Replies to it stay."),
                () => y.router.delete(z(`cms/comments/${g.id}/force`), { preserveScroll: !0 })
              ), children: [
                /* @__PURE__ */ e.jsx(W, {}),
                " ",
                t("Delete for good")
              ] })
            ] })
          ] })
        ] })
      ] }, g.id))
    ] }),
    (i.prev_page_url || i.next_page_url) && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:justify-end cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(a.Button, { variant: "outline", size: "sm", disabled: !i.prev_page_url, onClick: () => i.prev_page_url && y.router.get(i.prev_page_url), children: [
        /* @__PURE__ */ e.jsx(Qe, {}),
        " ",
        t("Newer")
      ] }),
      /* @__PURE__ */ e.jsxs(a.Button, { variant: "outline", size: "sm", disabled: !i.next_page_url, onClick: () => i.next_page_url && y.router.get(i.next_page_url), children: [
        t("Older"),
        " ",
        /* @__PURE__ */ e.jsx(ve, {})
      ] })
    ] }),
    m && /* @__PURE__ */ e.jsx(ql, { row: m.row, mode: m.mode, error: d.body, onClose: () => h(null) }, `${m.mode}-${m.row.id}`),
    k
  ] });
}
function ql({ row: s, mode: l, error: n, onClose: c }) {
  const [i, r] = D.useState(l === "edit" ? s.body : ""), [d, x] = D.useState(!1), u = () => {
    x(!0);
    const o = { preserveScroll: !0, onSuccess: c, onFinish: () => x(!1) };
    l === "reply" ? y.router.post(z(`cms/comments/${s.id}/reply`), { body: i }, o) : y.router.put(z(`cms/comments/${s.id}`), { body: i }, o);
  };
  return /* @__PURE__ */ e.jsx(a.Dialog, { open: !0, onOpenChange: (o) => !o && c(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
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
        onChange: (o) => r(o.target.value)
      }
    ),
    /* @__PURE__ */ e.jsx(I, { message: n }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: c, children: t("Cancel") }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", disabled: i.trim() === "" || d, onClick: u, children: t(l === "reply" ? "Post reply" : "Save") })
    ] })
  ] }) });
}
const Kl = () => [
  { role: "title", label: t("Meta title"), automatic: t("Automatic (the title)") },
  { role: "description", label: t("Meta description"), automatic: t("Automatic (nothing)") },
  { role: "image", label: t("Share image"), automatic: t("Automatic (nothing)") }
], Oe = "__auto";
function Wl({ site: s, siteName: l, collections: n, taxonomies: c }) {
  a.useBreadcrumbs([{ label: t("Settings"), href: z("settings") }, { label: t("SEO") }]);
  const i = [...n ?? [], ...c ?? []], r = y.useForm({
    site: { ...s },
    mappings: i.map((m) => ({ kind: m.kind, id: m.id, title: m.chosen.title ?? "", description: m.chosen.description ?? "", image: m.chosen.image ?? "" }))
  }), d = r.errors, x = () => r.put(z("cms/seo"), { preserveScroll: !0, onSuccess: () => r.setDefaults() });
  a.useUnsavedChanges(r.isDirty, x);
  const u = (m, h) => r.setData("site", { ...r.data.site, [m]: h }), o = (m, h, f) => r.setData("mappings", r.data.mappings.map((k, b) => b === m ? { ...k, [h]: f } : k)), p = (m, h, f, k, b) => /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: h, description: f, titleClassName: "cms:text-base", storageKey: `cms:seo:${m}`, contentClassName: "cms:flex cms:flex-col cms:divide-y cms:divide-border/60", children: [
    k.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("None yet.") }),
    k.map((N, _) => {
      const S = b + _;
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3 cms:py-4 cms:first:pt-0 cms:last:pb-0", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:justify-between cms:gap-3", children: [
          /* @__PURE__ */ e.jsx("h3", { className: "cms:font-medium", children: N.title }),
          /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: N.blueprint ? t("Blueprint: :name", { name: N.blueprint }) : t("No blueprint") })
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-3 cms:sm:grid-cols-3", children: Kl().map(({ role: w, label: g, automatic: B }) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-1.5", children: [
          /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `seo-${S}-${w}`, className: "cms:text-xs", children: g }),
          /* @__PURE__ */ e.jsxs(a.Select, { value: r.data.mappings[S]?.[w] || Oe, onValueChange: (E) => o(S, w, E === Oe ? "" : E), children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: `seo-${S}-${w}`, className: "cms:w-full", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(a.SelectItem, { value: Oe, children: B }),
              N.options[w].map((E) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: E.value, children: E.label }, E.value))
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(I, { message: d[`mappings.${S}.${w}`] })
        ] }, w)) })
      ] }, `${N.kind}-${N.id}`);
    })
  ] });
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (m) => {
    m.preventDefault(), x();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: t("SEO") }),
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: t("SEO"),
        description: t("What search engines and shared links see of the site."),
        actions: /* @__PURE__ */ e.jsx(a.Button, { type: "submit", disabled: r.processing, children: t("Save SEO settings") })
      }
    ),
    /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: t("Search engines and sharing"), titleClassName: "cms:text-base", storageKey: "cms:seo:site", contentClassName: "cms:flex cms:flex-col cms:gap-5", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Switch, { id: "seo-noindex", checked: r.data.site.noindex, onCheckedChange: (m) => u("noindex", m) }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-0.5", children: [
          /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "seo-noindex", children: t("Hide the whole site from search engines") }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t("Every page asks not to be indexed and the sitemap is empty. For a site still being built, or staging.") })
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-start cms:justify-between cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-3", children: [
          /* @__PURE__ */ e.jsx(a.Switch, { id: "seo-append", checked: r.data.site.appendName, onCheckedChange: (m) => u("appendName", m) }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-0.5", children: [
            /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "seo-append", children: t("Add the site name to page titles") }),
            /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t('The browser tab and search results show ":example". Share previews keep the bare title.', { example: `${t("About")} ${r.data.site.separator || "|"} ${l}` }) })
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
              disabled: !r.data.site.appendName,
              value: r.data.site.separator,
              onChange: (m) => u("separator", m.target.value)
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
            value: r.data.site.twitter,
            onChange: (m) => u("twitter", m.target.value)
          }
        ),
        /* @__PURE__ */ e.jsx(I, { message: d["site.twitter"] })
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
            value: r.data.site.image,
            onChange: (m) => u("image", typeof m == "number" ? m : null)
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t("Shown when a page is shared and has no image of its own.") }),
        /* @__PURE__ */ e.jsx(I, { message: d["site.image"] })
      ] })
    ] }),
    i.length > 0 && /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx("h2", { className: "cms:text-base cms:font-medium", children: t("Fields used for SEO") }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t("When an entry or term leaves its meta title, description or share image empty, the site uses one of its fields instead. A page's own SEO fields always win; after the field come the site's (the description in Settings → Site, the share image above).") })
    ] }),
    n !== null && p("Collections", t("Collections"), t("Entries of each collection."), n, 0),
    c !== null && p("Taxonomies", t("Taxonomies"), t("Term pages of each taxonomy."), c, n?.length ?? 0),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: t("Meta title: a text field. Meta description: a text or textarea field, cut to 300 characters. Share image: the first image of a media field.") })
  ] });
}
const Gl = 3;
function Yl({ form: s, forms: l, submissions: n, can: c, createForm: i = null }) {
  a.useBreadcrumbs([{ label: t("Submissions"), href: z("cms/submissions") }, ...s ? [{ label: s.title }] : []]);
  const [r, d] = D.useState(null), [x, u] = oe();
  if (!s || !n)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(y.Head, { title: t("Submissions") }),
      /* @__PURE__ */ e.jsx(a.PageHeader, { title: t("Submissions"), description: t("What visitors send through the site's forms.") }),
      /* @__PURE__ */ e.jsxs(a.Card, { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:px-6 cms:py-14 cms:text-center", children: [
        /* @__PURE__ */ e.jsx(ba, { className: "cms:size-8 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
          /* @__PURE__ */ e.jsx("p", { className: "cms:font-medium", children: t("No forms yet") }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:max-w-sm cms:text-sm cms:text-muted-foreground", children: t(i ? "Create a form, put it on a page, and what visitors send shows up here." : "Once someone creates a form and puts it on a page, what visitors send shows up here.") })
        ] }),
        i && /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(y.Link, { href: i, children: [
          /* @__PURE__ */ e.jsx(Q, {}),
          " ",
          t("Create a form")
        ] }) })
      ] })
    ] });
  const o = (n.data[0]?.rows ?? []).slice(0, Gl), p = (m) => x(
    t("Delete this submission for good? It can't be restored."),
    () => y.router.delete(z(`cms/submissions/${m.id}`), { preserveScroll: !0, onSuccess: () => d(null) })
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: t(":form submissions", { form: s.title }) }),
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: s.title,
        actions: n.total > 0 && c.export && /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: z(`cms/forms/${s.handle}/submissions/export`), children: [
          /* @__PURE__ */ e.jsx(qs, {}),
          " ",
          t("Export CSV")
        ] }) }),
        children: l.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: s.handle, onValueChange: (m) => y.router.get(z(`cms/forms/${m}/submissions`)), children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-56", "aria-label": t("Form"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: l.map((m) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: m.handle, children: [
            m.title,
            " (",
            m.count,
            ")"
          ] }, m.handle)) })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(a.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(a.Table, { children: [
      /* @__PURE__ */ e.jsx(a.TableHeader, { children: /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
        /* @__PURE__ */ e.jsx(a.TableHead, { children: t("Sent") }),
        o.map((m) => /* @__PURE__ */ e.jsx(a.TableHead, { children: m.label }, m.handle))
      ] }) }),
      /* @__PURE__ */ e.jsxs(a.TableBody, { children: [
        n.data.length === 0 && /* @__PURE__ */ e.jsx(a.TableRow, { children: /* @__PURE__ */ e.jsx(a.TableCell, { colSpan: o.length + 1, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: t("Nothing sent yet.") }) }),
        n.data.map((m) => /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
          /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:whitespace-nowrap", children: /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:font-medium cms:hover:underline", onClick: () => d(m), children: K(m.createdAt) }) }),
          o.map((h) => /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:max-w-64 cms:truncate", children: m.rows.find((f) => f.handle === h.handle)?.value }, h.handle))
        ] }, m.id))
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
            onClick: () => n.prev_page_url && y.router.get(n.prev_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(Qe, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": t("Next page"),
            disabled: !n.next_page_url,
            onClick: () => n.next_page_url && y.router.get(n.next_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(ve, {})
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(a.Dialog, { open: r !== null, onOpenChange: (m) => !m && d(null), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto", children: [
      /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
        /* @__PURE__ */ e.jsx(a.DialogTitle, { children: s.title }),
        /* @__PURE__ */ e.jsxs(a.DialogDescription, { children: [
          t("Sent :date", { date: K(r?.createdAt ?? null) }),
          " · ",
          r?.locale.toUpperCase()
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-3 cms:text-sm", children: r?.rows.map((m) => /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: m.label }),
        /* @__PURE__ */ e.jsx("dd", { className: "cms:whitespace-pre-wrap cms:break-words cms:text-muted-foreground", children: m.files && m.files.length > 0 ? /* @__PURE__ */ e.jsx("ul", { className: "cms:flex cms:flex-col cms:gap-1", children: m.files.map((h) => /* @__PURE__ */ e.jsx("li", { children: /* @__PURE__ */ e.jsx("a", { href: h.url, className: "cms:underline cms:underline-offset-4 hover:cms:text-foreground", download: !0, children: h.name }) }, h.url)) }) : m.file ? /* @__PURE__ */ e.jsx("a", { href: m.file, className: "cms:underline cms:underline-offset-4 hover:cms:text-foreground", download: !0, children: m.value }) : m.value || "—" })
      ] }, m.handle)) }),
      r && (r.visitor.ip || r.visitor.userAgent || r.visitor.referrer) && /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-3 cms:border-t cms:pt-3 cms:text-sm", children: [[t("IP address"), r.visitor.ip], [t("Browser"), r.visitor.userAgent], [t("Sent from"), r.visitor.referrer]].map(([m, h]) => h && /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: m }),
        /* @__PURE__ */ e.jsx("dd", { className: "cms:break-all cms:text-muted-foreground", children: h })
      ] }, m)) }),
      c.delete && r && /* @__PURE__ */ e.jsx(a.DialogFooter, { children: /* @__PURE__ */ e.jsxs(a.Button, { variant: "destructive", onClick: () => p(r), children: [
        /* @__PURE__ */ e.jsx(W, {}),
        " ",
        t("Delete")
      ] }) })
    ] }) }),
    u
  ] });
}
function Jl(s) {
  return /* @__PURE__ */ e.jsx(Ql, { ...s }, `${s.locale}:${s.version}:${JSON.stringify([s.values, s.seo, s.term.template])}`);
}
function Ql({ taxonomy: s, term: l, translated: n, fields: c, locale: i, locales: r, shared: d, sharedValues: x, values: u, seo: o, version: p, usedBy: m = [], redirectsUrl: h = null }) {
  const f = z(`cms/taxonomies/${s.handle}/terms`), k = z(`cms/terms/${l.id}/content`);
  a.useBreadcrumbs([{ label: s.title, href: `${f}?locale=${i}` }, { label: l.title }]);
  const b = y.useForm({
    locale: i,
    title: l.ownTitle ?? "",
    slug: l.slug ?? "",
    data: u,
    seo: o ?? {},
    template: l.template ?? "",
    version: p
  }), N = b.errors, _ = (j) => {
    const M = Be(N, j);
    M.length > 0 && b.clearErrors(...M);
  }, S = () => b.processing || b.put(k, { preserveScroll: !0 }), w = () => {
    b.transform((j) => ({ ...j, version: null })), b.put(k, { preserveScroll: !0 });
  }, g = a.useEditLock({
    type: "cms.term",
    id: l.id,
    locale: i,
    enabled: n,
    noun: t("term"),
    leaveTo: `${f}?locale=${i}`,
    getUnsaved: () => b.isDirty ? { data: b.data.data, seo: b.data.seo, template: b.data.template } : null
  }), B = !g.readOnly, E = async (j) => {
    const M = await g.loadKept(j);
    b.setData(($) => ({
      ...$,
      data: M.data && typeof M.data == "object" ? M.data : $.data,
      seo: M.seo && typeof M.seo == "object" ? M.seo : $.seo,
      template: typeof M.template == "string" ? M.template : $.template
    }));
  };
  return a.useUnsavedChanges(b.isDirty && !g.takenOver, B ? S : void 0), /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (j) => {
    j.preventDefault(), S();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: l.title }),
    g.dialogs,
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: l.title,
        back: { href: `${f}?locale=${i}`, label: t("Back to :title", { title: s.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          l.url && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: l.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(ge, {}),
            " ",
            t("View page")
          ] }) }),
          r.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: i, onValueChange: (j) => y.router.get(`${f}/${l.id}/edit`, { locale: j }), children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(a.SelectContent, { children: r.map((j, M) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: j, children: [
              P(j),
              M === 0 ? ` ${t("(main)")}` : ""
            ] }, j)) })
          ] }),
          B && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: b.processing, children: [
            b.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
            " ",
            t("Save")
          ] })
        ] }),
        children: b.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:items-start cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_20rem]", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(a.ViewingNotice, { by: g.viewingBy, onTakeOver: g.requestTakeOver }),
        !n && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:bg-muted/40 cms:p-3 cms:text-sm cms:text-muted-foreground", role: "note", children: t("Not in :language yet: the site shows the :main term meanwhile. Give it a title in :language and save to add it.", { language: P(i), main: P(r[0] ?? "en") }) }),
        /* @__PURE__ */ e.jsxs("fieldset", { disabled: !B, className: "cms:grid cms:min-w-0 cms:gap-4 cms:sm:grid-cols-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "term-title", children: t("Title") }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "term-title",
                value: b.data.title,
                required: !0,
                placeholder: l.mainTitle ?? "",
                maxLength: 255,
                "aria-invalid": N.title !== void 0,
                onChange: (j) => {
                  b.setData("title", j.target.value), _("title");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(I, { message: N.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "term-slug", children: t("Slug") }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "term-slug",
                className: "cms:font-mono",
                value: b.data.slug,
                placeholder: t("Made from the title"),
                maxLength: 200,
                "aria-invalid": N.slug !== void 0,
                onChange: (j) => {
                  b.setData("slug", j.target.value), _("slug");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(Vt, { note: ws(l.hasPage ? l.slug : null, b.data.slug, !1), redirectsUrl: h }),
            /* @__PURE__ */ e.jsx(I, { message: N.slug })
          ] })
        ] }),
        /* @__PURE__ */ e.jsx(a.KeptEditsNotice, { kept: g.kept, disabled: !B, onLoad: (j) => {
          E(j);
        }, onDiscard: (j) => {
          g.discardKept(j);
        } }),
        /* @__PURE__ */ e.jsx(ls, { message: N.version, processing: b.processing, onSaveMine: w }),
        /* @__PURE__ */ e.jsx(
          ss,
          {
            disabled: !B,
            fields: c,
            values: b.data.data,
            errors: N,
            storageKey: `cms:term:${s.handle}`,
            shared: d,
            sharedValues: x,
            sharedNote: t("Shared by all languages: the greyed-out fields are edited in :language.", { language: P(r[0] ?? "en") }),
            onChange: (j, M) => {
              b.setData("data", { ...b.data.data, [j]: M }), _(`data.${j}`);
            }
          }
        ),
        /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: t("SEO"), description: t("How this term's page appears in search results and shared links."), titleClassName: "cms:text-base", storageKey: "cms:term:seo", hasErrors: Ne(N, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !B, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(he, { bare: !0, id: "seo", fields: ts(), value: b.data.seo, errors: ee(N, "seo"), onChange: (j) => {
          b.setData("seo", j), _("seo");
        } }) }) })
      ] }),
      /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(
          a.CollapsibleCard,
          {
            title: t("Template"),
            titleClassName: "cms:text-base",
            storageKey: "cms:term:page-settings",
            hasErrors: N.template !== void 0,
            contentClassName: "cms:flex cms:flex-col cms:gap-2",
            children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: !B, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: [
              /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "template", className: "cms:sr-only", children: t("Template") }),
              /* @__PURE__ */ e.jsx(
                a.Input,
                {
                  id: "template",
                  className: "cms:font-mono",
                  placeholder: `cms.${s.handle}-special`,
                  value: b.data.template,
                  onChange: (j) => b.setData("template", j.target.value),
                  "aria-invalid": N.template !== void 0
                }
              ),
              /* @__PURE__ */ e.jsx(Pt, { example: `cms.${s.handle}-special`, fallbacks: [t("the taxonomy's template, if set"), `cms.taxonomy-${s.handle}`, "cms.term"] }),
              /* @__PURE__ */ e.jsx(I, { message: N.template })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: t("Used by"), titleClassName: "cms:text-base", storageKey: "cms:term:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          m.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("No content links here through its fields.") }),
          m.map((j) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:gap-2", children: [
            j.url ? /* @__PURE__ */ e.jsx("a", { href: j.url, className: "cms:truncate cms:underline-offset-4 cms:hover:underline", children: j.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:truncate", children: j.label }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", title: j.field, children: j.fieldLabel ?? j.field })
          ] }, `${j.label}:${j.field}`))
        ] })
      ] })
    ] })
  ] });
}
const Ve = "__top";
function Zl({ taxonomy: s, locale: l, locales: n, parent: c, terms: i }) {
  const r = z(`cms/taxonomies/${s.handle}/terms`);
  a.useBreadcrumbs([{ label: s.title, href: `${r}?locale=${l}` }, { label: t("New term") }]);
  const d = y.useForm({ title: "", slug: "", parent_id: c, locale: l }), x = d.errors;
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (u) => {
    u.preventDefault(), d.post(r);
  }, className: "cms:flex cms:max-w-3xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: t("New term · :taxonomy", { taxonomy: s.title }) }),
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: t("New term"),
        back: { href: `${r}?locale=${l}`, label: t("Back to :title", { title: s.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          n.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: l, onValueChange: (u) => y.router.get(`${r}/create`, { locale: u, ...c ? { parent: c } : {} }), children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-40", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(a.SelectContent, { children: n.map((u) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: u, children: P(u) }, u)) })
          ] }),
          /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: d.processing, children: [
            d.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
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
            onChange: (u) => d.setData("title", u.target.value)
          }
        ),
        /* @__PURE__ */ e.jsx(I, { message: x.title })
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
            onChange: (u) => d.setData("slug", u.target.value)
          }
        ),
        /* @__PURE__ */ e.jsx(I, { message: x.slug })
      ] }),
      s.hierarchical && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:md:col-span-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "parent", children: t("Under") }),
        /* @__PURE__ */ e.jsxs(
          a.Select,
          {
            value: d.data.parent_id === null ? Ve : String(d.data.parent_id),
            onValueChange: (u) => d.setData("parent_id", u === Ve ? null : Number(u)),
            children: [
              /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: "parent", className: "cms:md:w-1/2", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
              /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: Ve, children: t("Top level") }),
                i.map((u) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: String(u.id), children: [
                  "— ".repeat(u.depth),
                  u.title
                ] }, u.id))
              ] })
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(I, { message: x.parent_id })
      ] }),
      n.length > 1 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground cms:md:col-span-2", children: t("In :language. Translate it from the list afterwards.", { language: P(l) }) })
    ] }) })
  ] });
}
const Re = "__top";
function ys(s = []) {
  if (s.length === 0) return "";
  const l = s.slice(0, 5).join("; ");
  return ` ${s.length > 5 ? t("It's used by :list and :count more.", { list: l, count: s.length - 5 }) : t("It's used by :list.", { list: l })}`;
}
function Xl({ taxonomy: s, taxonomies: l, terms: n, locales: c, locale: i, trashed: r = !1 }) {
  a.useBreadcrumbs([{ label: s ? s.title : t("Terms") }]);
  const [d, x] = oe(), [u, o] = D.useState(null), [p, m] = D.useState(""), [h, f] = D.useState(n);
  if (D.useEffect(() => f(n), [n]), !s)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(y.Head, { title: t("Terms") }),
      /* @__PURE__ */ e.jsx(a.PageHeader, { title: t("Terms"), description: t("There are no taxonomies yet. Create one under Structure → Taxonomies (categories, tags…), then add its terms here.") })
    ] });
  const k = z(`cms/taxonomies/${s.handle}/terms`), b = (j) => z(`cms/taxonomies/${s.handle}/terms/${j.id}/edit`) + `?locale=${encodeURIComponent(i)}`, N = (j, M) => {
    const $ = M.map((F) => h[F].id);
    f(as(h, j, M)), y.router.post(
      z("cms/terms/reorder"),
      { taxonomy: s.handle, ids: $, parent_id: j < 0 ? null : h[j].id },
      { preserveScroll: !0, preserveState: !0, onError: () => f(n) }
    );
  }, _ = (j) => d(
    t('Move ":title" to the trash, with the terms under it? It comes off the site; you can restore it.', { title: j.fallback }) + ys(j.usedBy),
    () => y.router.delete(z(`cms/terms/${j.id}`), { preserveScroll: !0 }),
    t("Move to trash")
  ), S = p.trim().toLowerCase(), w = S === "" ? null : h.filter((j) => `${j.title ?? j.fallback} ${j.slug ?? ""}`.toLowerCase().includes(S)), g = s.collections ?? [], B = (j, M, $) => /* @__PURE__ */ e.jsxs("div", { className: `${Ns} cms:border-t cms:border-border/60 cms:px-3 cms:py-2`, children: [
    /* @__PURE__ */ e.jsx("span", { className: "cms:flex cms:justify-center", children: M && !r && /* @__PURE__ */ e.jsx(a.SortableHandle, { ...M, label: t("Move :title", { title: j.fallback }) }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-2", style: { paddingLeft: $ * 20 }, children: [
      $ > 0 && /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", "aria-hidden": !0, children: "└" }),
      r ? /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: j.title ?? j.fallback }) : /* @__PURE__ */ e.jsx(
        "button",
        {
          type: "button",
          className: "cms:truncate cms:text-left cms:font-medium cms:underline-offset-4 cms:hover:underline",
          onClick: () => s.pages && j.title !== null ? y.router.get(b(j)) : o(j),
          children: j.title ?? /* @__PURE__ */ e.jsx("span", { className: "cms:font-normal cms:text-muted-foreground cms:italic", children: t(":title · not translated", { title: j.fallback }) })
        }
      ),
      j.url && /* @__PURE__ */ e.jsx("a", { href: j.url, target: "_blank", rel: "noopener noreferrer", className: "cms:text-muted-foreground cms:hover:text-foreground", "aria-label": t("Visit term page"), title: t("Visit term page"), children: /* @__PURE__ */ e.jsx(ge, { className: "cms:size-3.5" }) })
    ] }),
    /* @__PURE__ */ e.jsx("code", { className: "cms:hidden cms:truncate cms:text-xs cms:text-muted-foreground cms:md:block", children: j.slug ?? "—" }),
    /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:text-sm cms:text-muted-foreground cms:tabular-nums cms:md:block", children: j.entries ?? 0 }),
    /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:text-sm cms:text-muted-foreground cms:md:block", children: en(j.createdAt) }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:justify-end", children: r ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-1", children: [
      /* @__PURE__ */ e.jsxs(a.Button, { variant: "outline", size: "sm", onClick: () => y.router.post(z(`cms/terms/${j.id}/restore`), {}, { preserveScroll: !0 }), children: [
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
            t('Delete ":title" for good, in every language? Entries lose it.', { title: j.fallback }) + ys(j.usedBy),
            () => y.router.delete(z(`cms/terms/${j.id}/force`), { preserveScroll: !0, data: (j.usedBy ?? []).length > 0 ? { force: 1 } : {} })
          ),
          children: [
            /* @__PURE__ */ e.jsx(W, {}),
            " ",
            t("Delete for good")
          ]
        }
      )
    ] }) : /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": t("Actions for :title", { title: j.fallback }), children: /* @__PURE__ */ e.jsx(Gs, {}) }) }),
      /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", children: [
        /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { onSelect: () => o(j), children: [
          /* @__PURE__ */ e.jsx(dt, {}),
          " ",
          t("Rename")
        ] }),
        s.hierarchical && j.title !== null && /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(y.Link, { href: `${k}/create?locale=${encodeURIComponent(i)}&parent=${j.id}`, children: [
          /* @__PURE__ */ e.jsx(Q, {}),
          " ",
          t("Add a term under it")
        ] }) }),
        s.pages && j.title !== null && /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(y.Link, { href: b(j), children: [
          /* @__PURE__ */ e.jsx(ja, {}),
          " ",
          t("Edit page")
        ] }) }),
        /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
        /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { className: "cms:text-destructive", onSelect: () => _(j), children: [
          /* @__PURE__ */ e.jsx(W, {}),
          " ",
          t("Move to trash")
        ] })
      ] })
    ] }) })
  ] }), E = (j) => /* @__PURE__ */ e.jsx(a.SortableList, { items: ce(h, j), getId: (M) => h[M].id, getLabel: (M) => h[M].title ?? h[M].fallback, disabled: r, onReorder: (M) => N(j, M), className: "cms:gap-0", children: (M, { handle: $, isOverlay: F }) => /* @__PURE__ */ e.jsxs("div", { className: F ? "cms:rounded-md cms:bg-card cms:shadow-md" : "", children: [
    B(h[M], $, h[M].depth),
    !F && !r && ce(h, M).length > 0 && E(M)
  ] }) });
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: s.title }),
    x,
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: r ? t(":title — trash", { title: s.title }) : s.title,
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          c.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: i, onValueChange: (j) => y.router.get(k, { locale: j, ...r ? { status: "trashed" } : {} }), children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-40", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(a.SelectContent, { children: c.map((j) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: j, children: P(j) }, j)) })
          ] }),
          r ? /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", onClick: () => y.router.get(k, { locale: i }), children: t("Back to terms") }) : /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(y.Link, { href: `${k}/create?locale=${encodeURIComponent(i)}`, children: [
            /* @__PURE__ */ e.jsx(Q, {}),
            " ",
            t("New term")
          ] }) }),
          /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", size: "icon", "aria-label": t("More"), children: /* @__PURE__ */ e.jsx(ga, {}) }) }),
            /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", className: "cms:min-w-56", children: [
              g.length > 0 && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(a.DropdownMenuLabel, { children: t("Used by collections") }),
                g.map((j) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsx(y.Link, { href: j.url, children: j.title }) }, j.url)),
                /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {})
              ] }),
              s.settings && /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(y.Link, { href: s.settings, children: [
                /* @__PURE__ */ e.jsx(Ze, {}),
                " ",
                t("Taxonomy settings")
              ] }) }),
              !r && /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { onSelect: () => y.router.get(k, { locale: i, status: "trashed" }), children: [
                /* @__PURE__ */ e.jsx(W, {}),
                " ",
                t("Trash")
              ] })
            ] })
          ] })
        ] }),
        children: l.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: s.handle, onValueChange: (j) => y.router.get(z(`cms/taxonomies/${j}/terms`)), children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": t("Taxonomy"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: l.map((j) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: j.handle, children: j.title }, j.handle)) })
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
            onChange: (j) => m(j.target.value)
          }
        )
      ] }),
      !r && h.length > 1 && !w && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s.hierarchical ? t("Drag terms to set their order; a term's parent is set when you rename it.") : t("Drag terms to set their order.") })
    ] }),
    /* @__PURE__ */ e.jsxs(a.Card, { className: "cms:gap-0 cms:overflow-hidden cms:py-0", children: [
      /* @__PURE__ */ e.jsxs("div", { className: `${Ns} cms:bg-muted/60 cms:px-3 cms:py-2.5 cms:text-sm cms:font-medium cms:text-muted-foreground`, children: [
        /* @__PURE__ */ e.jsx("span", {}),
        /* @__PURE__ */ e.jsx("span", { children: t("Title") }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:md:block", children: t("Slug") }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:md:block", children: t("Entries") }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:md:block", children: t("Created") }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: t("Actions") })
      ] }),
      h.length === 0 ? /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:border-t cms:border-border/60 cms:p-10 cms:text-center cms:text-muted-foreground", children: r ? t("The trash is empty.") : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        t("No terms yet."),
        /* @__PURE__ */ e.jsx(a.Button, { size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs(y.Link, { href: `${k}/create?locale=${encodeURIComponent(i)}`, children: [
          /* @__PURE__ */ e.jsx(Q, {}),
          " ",
          t("New term")
        ] }) })
      ] }) }) : w ? w.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:border-t cms:border-border/60 cms:p-8 cms:text-center cms:text-muted-foreground", children: t("No terms match “:search”.", { search: p }) }) : w.map((j) => /* @__PURE__ */ e.jsx(D.Fragment, { children: B(j, null, 0) }, j.id)) : r ? h.map((j) => /* @__PURE__ */ e.jsx(D.Fragment, { children: B(j, null, 0) }, j.id)) : E(-1)
    ] }),
    /* @__PURE__ */ e.jsx(a.Dialog, { open: u !== null, onOpenChange: (j) => {
      j || o(null);
    }, children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
      /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
        /* @__PURE__ */ e.jsx(a.DialogTitle, { children: t("Rename “:title”", { title: u?.fallback }) }),
        /* @__PURE__ */ e.jsx(a.DialogDescription, { children: c.length > 1 ? t("In :language.", { language: P(i) }) : t("Its title and the slug in its address.") })
      ] }),
      u !== null && /* @__PURE__ */ e.jsx(sn, { term: u, locale: i, terms: n, hierarchical: s.hierarchical, onDone: () => o(null) }, u.id)
    ] }) })
  ] });
}
const Ns = "cms:grid cms:items-center cms:gap-3 cms:grid-cols-[1.5rem_1fr_2.5rem] cms:md:grid-cols-[1.5rem_minmax(0,2fr)_minmax(0,1.2fr)_5rem_7rem_2.5rem]";
function en(s) {
  if (!s) return "—";
  const l = new Date(s);
  return Number.isNaN(l.getTime()) ? "—" : l.toLocaleDateString(document.documentElement.lang || void 0, { day: "numeric", month: "short", year: "numeric" });
}
function sn({ locale: s, terms: l, hierarchical: n, term: c, onDone: i }) {
  const r = y.useForm({ title: c.title ?? "", slug: c.slug ?? "", parent_id: c.parentId, locale: s, version: c.version }), d = r.errors, x = /* @__PURE__ */ new Set();
  x.add(c.id);
  const u = l.findIndex((m) => m.id === c.id);
  for (let m = u + 1; m < l.length && (l[m]?.depth ?? 0) > c.depth; m++) x.add(l[m].id);
  const o = (m) => {
    m.preventDefault(), r.put(z(`cms/terms/${c.id}`), { preserveScroll: !0, onSuccess: i });
  }, p = `term-${c.id}`;
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: o, className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${p}-title`, children: t("Title") }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: `${p}-title`,
          value: r.data.title,
          placeholder: c.fallback,
          required: !0,
          autoFocus: !0,
          onChange: (m) => r.setData("title", m.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(I, { message: d.title ?? d.version })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${p}-slug`, children: t("Slug") }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: `${p}-slug`,
          className: "cms:font-mono",
          value: r.data.slug,
          placeholder: t("Made from the title"),
          onChange: (m) => r.setData("slug", m.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(I, { message: d.slug })
    ] }),
    n && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${p}-parent`, children: t("Under") }),
      /* @__PURE__ */ e.jsxs(
        a.Select,
        {
          value: r.data.parent_id === null ? Re : String(r.data.parent_id),
          onValueChange: (m) => r.setData("parent_id", m === Re ? null : Number(m)),
          children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: `${p}-parent`, children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(a.SelectItem, { value: Re, children: t("Top level") }),
              l.filter((m) => !x.has(m.id)).map((m) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: String(m.id), children: [
                "— ".repeat(m.depth),
                m.title ?? m.fallback
              ] }, m.id))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ e.jsx(I, { message: d.parent_id })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", onClick: i, children: t("Cancel") }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "submit", disabled: r.processing, children: t("Save") })
    ] })
  ] });
}
function tn({ locale: s, main: l, locales: n, sections: c }) {
  const i = z("cms/translations");
  a.useBreadcrumbs([{ label: t("Translations") }]);
  const r = n.find((p) => p.code === s)?.name ?? P(s), d = y.useForm({
    locale: s,
    texts: Object.fromEntries(c.flatMap((p) => p.texts.map((m) => [m.key, m.value])))
  }), x = d.errors, u = () => d.put(i, { preserveScroll: !0, onSuccess: () => d.setDefaults() });
  a.useUnsavedChanges(d.isDirty, u);
  const o = (p, m) => d.setData("texts", { ...d.data.texts, [p]: m });
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (p) => {
    p.preventDefault(), u();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(y.Head, { title: t("Translations") }),
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: t("Translations"),
        description: t("What visitors read outside entries: forms, listing titles, menus and the site's description. Empty: the :main text shows.", { main: P(l) }),
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          n.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: s, onValueChange: (p) => y.router.get(i, { locale: p }), children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { "aria-label": t("Language"), className: "cms:w-48", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(a.SelectContent, { children: n.map((p) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: p.code, children: p.name }, p.code)) })
          ] }),
          /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: d.processing, children: [
            d.processing && /* @__PURE__ */ e.jsx(le, { className: "cms:animate-spin" }),
            " ",
            t("Save")
          ] })
        ] }),
        children: d.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
      }
    ),
    /* @__PURE__ */ e.jsx(I, { message: x.locale }),
    c.map((p) => /* @__PURE__ */ e.jsx(
      a.CollapsibleCard,
      {
        title: p.title,
        titleClassName: "cms:text-base",
        storageKey: `cms:translations:${p.key}`,
        contentClassName: "cms:flex cms:flex-col cms:divide-y cms:divide-border/60",
        children: p.texts.map((m) => {
          const h = `text-${m.key.replace(/[^A-Za-z0-9_-]/g, "-")}`, f = x[`texts.${m.key}`];
          return /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-2 cms:py-3 cms:first:pt-0 cms:last:pb-0 cms:md:grid-cols-2 cms:md:gap-4", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-1", children: [
              /* @__PURE__ */ e.jsx(a.Label, { htmlFor: h, children: m.label }),
              /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:break-words cms:whitespace-pre-line cms:text-muted-foreground", lang: l, children: m.source || "—" })
            ] }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-1", children: [
              m.multiline ? /* @__PURE__ */ e.jsx(
                a.Textarea,
                {
                  id: h,
                  rows: 2,
                  lang: s,
                  value: d.data.texts[m.key] ?? "",
                  placeholder: m.source,
                  "aria-invalid": f !== void 0,
                  "aria-description": t("In :language", { language: r }),
                  onChange: (k) => o(m.key, k.target.value)
                }
              ) : /* @__PURE__ */ e.jsx(
                a.Input,
                {
                  id: h,
                  lang: s,
                  value: d.data.texts[m.key] ?? "",
                  placeholder: m.source,
                  "aria-invalid": f !== void 0,
                  "aria-description": t("In :language", { language: r }),
                  onChange: (k) => o(m.key, k.target.value)
                }
              ),
              /* @__PURE__ */ e.jsx(I, { message: f })
            ] })
          ] }, m.key);
        })
      },
      p.key
    ))
  ] });
}
function an(s) {
  return function(n) {
    const c = y.usePage().props.cms;
    return Xt(c?.locales), /* @__PURE__ */ e.jsx(s, { ...n });
  };
}
const ln = {
  "Cms/Blueprints/Index": rl,
  "Cms/Blueprints/Edit": ps,
  "Cms/Fieldsets/Index": Tl,
  // A fieldset is edited like a blueprint.
  "Cms/Fieldsets/Edit": ps,
  "Cms/Entries/Index": Sl,
  "Cms/Entries/Edit": il,
  "Cms/Listing/Edit": Dl,
  "Cms/Terms/Index": Xl,
  "Cms/Terms/Create": Zl,
  "Cms/Translations/Edit": tn,
  "Cms/Terms/Edit": Jl,
  "Cms/Globals/Edit": Bl,
  "Cms/Menus/Edit": El,
  "Cms/Comments/Index": Ul,
  "Cms/Seo/Edit": Wl,
  "Cms/Submissions/Index": Yl
};
Qt({
  pages: Object.fromEntries(Object.entries(ln).map(([s, l]) => [s, an(l)]))
});
