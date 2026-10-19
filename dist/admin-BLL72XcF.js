function gs(s, a) {
  for (var l = 0; l < a.length; l++) {
    const r = a[l];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const c in r)
        if (c !== "default" && !(c in s)) {
          const n = Object.getOwnPropertyDescriptor(r, c);
          n && Object.defineProperty(s, c, n.get ? n : {
            enumerable: !0,
            get: () => r[c]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(s, Symbol.toStringTag, { value: "Module" }));
}
const me = 1;
function ve() {
  const s = globalThis.Sunrice;
  if (!s)
    throw new Error("[sunrice] This script runs outside the Sunrice admin panel (window.Sunrice is missing).");
  return s;
}
function js(s) {
  const a = ve();
  if (a.version !== me)
    throw new Error(`[sunrice] This plugin was built for admin runtime ${me}, but the panel runs ${a.version}. Rebuild it with a matching @sunrice/admin-sdk.`);
  for (const [l, r] of Object.entries(s.pages ?? {}))
    a.registerPage(l, r);
}
function N(s = "") {
  return ve().adminUrl(s);
}
const Ne = globalThis.Sunrice;
if (!Ne) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const e = Ne.modules["react/jsx-runtime"], ye = globalThis.Sunrice;
if (!ye) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const S = ye.modules.react, Bt = /* @__PURE__ */ gs({
  __proto__: null
}, [S]), Ce = globalThis.Sunrice;
if (!Ce) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const f = Ce.modules["@inertiajs/react"];
const fs = (s) => s?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
function bs(s, a, l = []) {
  if (a == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: fs(s),
    size: 24,
    node: a,
    ...l.length > 0 ? { aliases: l } : {}
  };
}
const vs = (s) => {
  let a = "", l = !1;
  for (const r of s) {
    if (r === "-" || r === "_" || r <= " ") {
      l = a.length > 0;
      continue;
    }
    a.length === 0 ? a += r.toLowerCase() : a += l ? r.toUpperCase() : r, l = !1;
  }
  return a;
};
const Ns = (s) => {
  const a = vs(s);
  return a.charAt(0).toUpperCase() + a.slice(1);
};
const ce = (...s) => s.filter((a, l, r) => !!a && a.trim() !== "" && r.indexOf(a) === l).join(" ").trim();
const P = {
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
function ae(s) {
  return s != null;
}
function ys(s, a = {}) {
  const l = a.attributeNames ?? {}, r = (d) => l[d] ?? d, c = s.size ?? s.width ?? P.width, n = s.size ?? s.height ?? P.height, i = s.aliases?.filter((d) => typeof d == "string" && d.trim() !== "").map((d) => `lucide-${d}`) ?? [], u = [...s.name ? [`lucide-${s.name}`] : [], ...i], h = a.className?.split(" ").filter(Boolean) ?? [], x = a.includeDefaultClasses === !1 ? ce(...h) : ce("lucide", ...u, ...h), p = a.absoluteStrokeWidth ? Number(a.strokeWidth ?? P["stroke-width"]) * Number(s.size ?? s.width ?? P.width) / Number(a.size ?? a.width ?? P.width) : a.strokeWidth ?? P["stroke-width"];
  return [
    "svg",
    {
      ...Object.entries(P).reduce((d, [g, j]) => (d[r(g)] = j, d), {}),
      ..."color" in a && a.color && {
        [r("stroke")]: a.color
      },
      ..."size" in a && ae(a.size) && {
        [r("width")]: a.size,
        [r("height")]: a.size
      },
      ..."width" in a && ae(a.width) && {
        [r("width")]: a.width
      },
      ..."height" in a && ae(a.height) && {
        [r("height")]: a.height
      },
      [r("stroke-width")]: p,
      ...x && {
        [r("class")]: x
      },
      [r("viewBox")]: `0 0 ${c} ${n}`,
      ...a.hasA11yProp === !1 ? {
        [r("aria-hidden")]: "true"
      } : {},
      ..."attributes" in a && a.attributes
    },
    s.node.map((d) => {
      const [g, j, m] = d, b = a.nonScalingStroke ? { [r("vector-effect")]: "non-scaling-stroke", ...j } : j;
      return m ? [g, b, m] : [g, b];
    })
  ];
}
function Cs(s, a = {}) {
  return ys(s, {
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
const ks = (s) => {
  for (const a in s)
    if (a.startsWith("aria-") || a === "role" || a === "title")
      return !0;
  return !1;
}, ws = S.createContext({}), Ss = () => S.useContext(ws), $s = S.forwardRef(
  ({
    color: s,
    size: a,
    width: l,
    height: r,
    strokeWidth: c,
    absoluteStrokeWidth: n,
    nonScalingStroke: i,
    className: u = "",
    children: h,
    iconNode: x = [],
    icon: p = {
      node: x,
      aliases: [],
      size: 24
    },
    ...o
  }, d) => {
    const {
      size: g = 24,
      strokeWidth: j = 2,
      absoluteStrokeWidth: m = !1,
      nonScalingStroke: b = !1,
      color: T = "currentColor",
      className: y = ""
    } = Ss() ?? {}, w = !!h || ks(o), [v, k, D = []] = Cs(p, {
      color: s ?? T,
      width: l ?? a ?? g,
      height: r ?? a ?? g,
      strokeWidth: c ?? j,
      absoluteStrokeWidth: n ?? m,
      nonScalingStroke: i ?? b,
      className: ce(y, u),
      hasA11yProp: w,
      attributes: o
    });
    return S.createElement(
      v,
      {
        ref: d,
        ...k
      },
      [
        ...D.map(([B, M]) => S.createElement(B, M)),
        ...Array.isArray(h) ? h : [h]
      ]
    );
  }
);
function _(s, a = [], l = []) {
  const r = typeof s == "string" ? bs(s, a, l) : s, c = S.forwardRef(
    ({ className: n, ...i }, u) => S.createElement($s, {
      ref: u,
      icon: r,
      className: n,
      ...i
    })
  );
  return r.name && (c.displayName = Ns(r.name)), c;
}
const ke = {
  name: "arrow-down",
  size: 24,
  node: [
    ["path", { d: "M12 5v14", key: "s699le" }],
    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
  ]
};
ke.node;
const q = _(ke);
const we = {
  name: "arrow-left",
  size: 24,
  node: [
    ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
    ["path", { d: "M19 12H5", key: "x3x0zl" }]
  ]
};
we.node;
const G = _(we);
const Se = {
  name: "arrow-up",
  size: 24,
  node: [
    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
    ["path", { d: "M12 19V5", key: "x0mq9r" }]
  ]
};
Se.node;
const K = _(Se);
const $e = {
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
$e.node;
const Ds = _($e);
const De = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
De.node;
const _e = _(De);
const Te = {
  name: "chevron-left",
  size: 24,
  node: [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]]
};
Te.node;
const Be = _(Te);
const ze = {
  name: "chevron-right",
  size: 24,
  node: [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]
};
ze.node;
const re = _(ze);
const Le = {
  name: "copy",
  size: 24,
  node: [
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
  ]
};
Le.node;
const _s = _(Le);
const Me = {
  name: "download",
  size: 24,
  node: [
    ["path", { d: "M12 15V3", key: "m9g1x1" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
  ]
};
Me.node;
const Ie = _(Me);
const Ae = {
  name: "external-link",
  size: 24,
  node: [
    ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
    ["path", { d: "M10 14 21 3", key: "gplh6r" }],
    ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
  ]
};
Ae.node;
const ie = _(Ae);
const Ee = {
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
Ee.node;
const Ts = _(Ee);
const Fe = {
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
Fe.node;
const Bs = _(Fe);
const He = {
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
He.node;
const zs = _(He);
const Re = {
  name: "link-2",
  size: 24,
  node: [
    ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
    ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
    ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
  ]
};
Re.node;
const Ls = _(Re);
const Oe = {
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
Oe.node;
const Ms = _(Oe);
const Pe = {
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
Pe.node;
const Is = _(Pe);
const Ve = {
  name: "loader-circle",
  size: 24,
  node: [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  aliases: ["loader-2"]
};
Ve.node;
const J = _(Ve);
const Ue = {
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
Ue.node;
const As = _(Ue);
const We = {
  name: "plus",
  size: 24,
  node: [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ]
};
We.node;
const R = _(We);
const qe = {
  name: "rotate-ccw",
  size: 24,
  node: [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ]
};
qe.node;
const Ge = _(qe);
const Ke = {
  name: "search",
  size: 24,
  node: [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ]
};
Ke.node;
const Je = _(Ke);
const Ze = {
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
Ze.node;
const L = _(Ze);
const Xe = {
  name: "undo-2",
  size: 24,
  node: [
    ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
    ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
  ]
};
Xe.node;
const Es = _(Xe);
const Ye = {
  name: "x",
  size: 24,
  node: [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]
};
Ye.node;
const Fs = _(Ye), Qe = globalThis.Sunrice;
if (!Qe) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const t = Qe.modules["@sunrice/admin-sdk/ui"];
function Z() {
  const [s, a] = S.useState(null), l = /* @__PURE__ */ e.jsx(t.Dialog, { open: s !== null, onOpenChange: (r) => !r && a(null), children: /* @__PURE__ */ e.jsxs(t.DialogContent, { children: [
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
  return [(r, c) => a({ message: r, onConfirm: c }), l];
}
const Hs = 5;
let Rs = 0;
const es = () => `f${++Rs}`;
function ss(s) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function ts(s, a) {
  const l = new Set(a.map((n) => n.handle)), r = ss(s) || "field";
  let c = r;
  for (let n = 2; l.has(c); n++)
    c = `${r}_${n}`;
  return c;
}
function as(s) {
  return (s ?? []).map(({ fields: a, ...l }) => ({
    ...l,
    key: es(),
    fields: as(a),
    handleTouched: !0
  }));
}
function ls(s, a) {
  return s.map(({ key: l, handleTouched: r, fields: c, ...n }) => ({
    ...n,
    validation: (n.validation ?? []).map((i) => i.trim()).filter((i) => i !== ""),
    ...a(n.type) ? { fields: ls(c, a) } : {}
  }));
}
function Os(s, a, l) {
  return { key: es(), type: s, label: a, handle: ts(a, l), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function U(s, a, l) {
  const r = a + l;
  if (a < 0 || a >= s.length || r < 0 || r >= s.length) return s;
  const c = s.slice(), [n] = c.splice(a, 1);
  return c.splice(r, 0, n), c;
}
function Ps(s, a, l) {
  if (s.handleTouched) return { ...s, label: a };
  const r = l.filter((c) => c.key !== s.key);
  return { ...s, label: a, handle: ts(a || s.type, r) };
}
function te(s, a) {
  const l = `${a}.`, r = {};
  for (const [c, n] of Object.entries(s))
    c.startsWith(l) && (r[c.slice(l.length)] = n);
  return r;
}
function I(s, a) {
  const l = s[a];
  return { ...te(s, a), ...l !== void 0 ? { "": l } : {} };
}
function ue(s, a) {
  return Object.keys(s).some((l) => l === a || l.startsWith(`${a}.`));
}
function Y(s) {
  return s && typeof s == "object" && !Array.isArray(s) ? s : {};
}
function Vs(s, a) {
  if (typeof s != "string" || s === "") return "";
  const l = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(s);
  return l ? a ? `${l[1]}T${l[2] ?? "00:00"}` : l[1] ?? "" : "";
}
function Us(s) {
  return s === "" ? null : s;
}
function Ws() {
  return { _hidden: !1 };
}
function qs(s) {
  return { type: s, hidden: !1, values: {} };
}
function Gs(s) {
  const a = s.replace(/[\u0000- \u007f]+/g, ""), l = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(a);
  return l ? ["http", "https", "mailto", "tel"].includes(l[1].toLowerCase()) : !a.includes("\\");
}
function ns({ ids: s, search: a, collections: l }) {
  const r = new URLSearchParams();
  for (const c of s ?? []) r.append("ids[]", String(c));
  a && r.set("search", a);
  for (const c of l) r.append("collections[]", c);
  return r.toString();
}
function W(s) {
  return { draft: "Draft", scheduled: "Scheduled", published: "Published" }[s];
}
function Q(s, a) {
  if (!s) return "—";
  const l = new Date(s);
  return Number.isNaN(l.getTime()) ? "—" : l.toLocaleString(a, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
function Ks(s) {
  const a = (l) => String(l).padStart(2, "0");
  return `${s.getFullYear()}-${a(s.getMonth() + 1)}-${a(s.getDate())}T${a(s.getHours())}:${a(s.getMinutes())}`;
}
function z(s, a) {
  try {
    return new Intl.DisplayNames(a ? [a] : void 0, { type: "language" }).of(s.replace("_", "-")) ?? s;
  } catch {
    return s;
  }
}
async function he(s) {
  const a = await fetch(`${N("cms/entry-picker")}?${ns(s)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!a.ok) throw new Error(String(a.status));
  return (await a.json()).items;
}
function oe({ id: s, value: a, multiple: l, max: r, collections: c, invalid: n, onChange: i }) {
  const u = a === null ? [] : Array.isArray(a) ? a : [a], [h, x] = S.useState({}), [p, o] = S.useState(""), [d, g] = S.useState(null), [j, m] = S.useState(!1), b = l && r !== null && u.length >= r, T = u.filter((v) => !h[v]).join(",");
  S.useEffect(() => {
    T !== "" && he({ ids: T.split(",").map(Number), collections: c }).then((v) => x((k) => ({ ...k, ...Object.fromEntries(v.map((D) => [D.id, D])) }))).catch(() => m(!0));
  }, [T]), S.useEffect(() => {
    if (p.trim() === "") {
      g(null);
      return;
    }
    const v = window.setTimeout(() => {
      he({ search: p.trim(), collections: c }).then((k) => {
        g(k), m(!1);
      }).catch(() => m(!0));
    }, 250);
    return () => window.clearTimeout(v);
  }, [p]);
  const y = (v) => {
    x((k) => ({ ...k, [v.id]: v })), i(l ? [...u, v.id] : v.id), o("");
  }, w = (v) => i(l ? v : v[0] ?? null);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    u.length > 0 && /* @__PURE__ */ e.jsx("ul", { className: "cms:flex cms:flex-col cms:gap-1", children: u.map((v, k) => {
      const D = h[v];
      return /* @__PURE__ */ e.jsxs("li", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-md cms:border cms:px-3 cms:py-1.5 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate", children: D ? D.title : `Entry #${v}` }),
        D && /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: D.collection }),
        D && /* @__PURE__ */ e.jsx(t.Badge, { variant: D.status === "published" ? "default" : "secondary", children: W(D.status) }),
        l && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(
            t.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-7",
              "aria-label": `Move ${D?.title ?? v} up`,
              disabled: k === 0,
              onClick: () => w(U(u, k, -1)),
              children: /* @__PURE__ */ e.jsx(K, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            t.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-7",
              "aria-label": `Move ${D?.title ?? v} down`,
              disabled: k === u.length - 1,
              onClick: () => w(U(u, k, 1)),
              children: /* @__PURE__ */ e.jsx(q, {})
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx(
          t.Button,
          {
            type: "button",
            variant: "ghost",
            size: "icon",
            className: "cms:size-7",
            "aria-label": `Remove ${D?.title ?? v}`,
            onClick: () => w(u.filter((B) => B !== v)),
            children: /* @__PURE__ */ e.jsx(Fs, {})
          }
        )
      ] }, v);
    }) }),
    !b && (l || u.length === 0) && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-md", children: [
      /* @__PURE__ */ e.jsx(Je, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
      /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: s,
          className: "cms:pl-9",
          placeholder: "Search entries by title",
          "aria-invalid": n,
          value: p,
          autoComplete: "off",
          onChange: (v) => o(v.target.value)
        }
      ),
      d !== null && /* @__PURE__ */ e.jsxs("ul", { role: "listbox", "aria-label": "Matching entries", className: "cms:absolute cms:z-10 cms:mt-1 cms:max-h-64 cms:w-full cms:overflow-auto cms:rounded-md cms:border cms:bg-card cms:p-1 cms:shadow-md", children: [
        d.filter((v) => !u.includes(v.id)).length === 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: "No entries match." }),
        d.filter((v) => !u.includes(v.id)).map((v) => /* @__PURE__ */ e.jsx("li", { role: "option", "aria-selected": !1, children: /* @__PURE__ */ e.jsxs(
          "button",
          {
            type: "button",
            className: "cms:flex cms:w-full cms:items-center cms:gap-2 cms:rounded cms:px-2 cms:py-1.5 cms:text-left cms:text-sm cms:hover:bg-accent",
            onClick: () => y(v),
            children: [
              /* @__PURE__ */ e.jsx("span", { className: "cms:flex-1 cms:truncate", children: v.title }),
              /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: v.collection })
            ]
          }
        ) }, v.id))
      ] })
    ] }),
    j && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "Entries could not be loaded. Try again." })
  ] });
}
const Js = S.lazy(() => import("./RichTextEditor-BrM8d1Ki.js").then((s) => ({ default: s.RichTextEditor }))), le = "__none";
function $({ message: s }) {
  return s ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: s }) : null;
}
function xe(s) {
  const a = s.config?.options;
  return Array.isArray(a) ? a.flatMap((l) => {
    if (typeof l == "string") return [{ value: l, label: l }];
    if (l && typeof l == "object" && typeof l.value == "string") {
      const { value: r, label: c } = l;
      return [{ value: r, label: c || r }];
    }
    return [];
  }) : [];
}
const Zs = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function Xs(s) {
  if (s.label) return s.label;
  const a = s.handle.replace(/_/g, " ");
  return a.charAt(0).toUpperCase() + a.slice(1);
}
function A({ field: s, value: a, onChange: l, errors: r, id: c, content: n = !1 }) {
  const i = Xs(s), u = Zs.includes(s.type) || ["select", "terms"].includes(s.type) && s.config?.multiple === !0;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", ...u ? { role: "group", "aria-labelledby": `${c}-label` } : {}, children: [
    s.type === "toggle" ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(t.Switch, { id: c, checked: a === !0, onCheckedChange: (h) => l(h) }),
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: c, children: i })
    ] }) : /* @__PURE__ */ e.jsxs(t.Label, { id: `${c}-label`, htmlFor: u ? void 0 : c, children: [
      i,
      s.required && /* @__PURE__ */ e.jsx("span", { className: "cms:text-destructive", children: " *" })
    ] }),
    /* @__PURE__ */ e.jsx(Ys, { field: s, value: a, onChange: l, errors: r, id: c, content: n }),
    s.instructions && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s.instructions }),
    /* @__PURE__ */ e.jsx($, { message: r[""] })
  ] });
}
function Ys({ field: s, value: a, onChange: l, errors: r, id: c, content: n }) {
  const i = r[""] !== void 0;
  switch (s.type) {
    case "toggle":
      return null;
    case "file":
      return /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Visitors attach a file here when they send a form." });
    case "textarea":
      return /* @__PURE__ */ e.jsx(
        t.Textarea,
        {
          id: c,
          "aria-invalid": i,
          value: typeof a == "string" ? a : "",
          rows: V(s, "rows") ?? 4,
          onChange: (u) => l(u.target.value)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ e.jsx(S.Suspense, { fallback: /* @__PURE__ */ e.jsx(t.Skeleton, { className: "cms:h-48 cms:w-full" }), children: /* @__PURE__ */ e.jsx(Js, { id: c, labelledBy: `${c}-label`, invalid: i, value: typeof a == "string" ? a : "", onChange: l }) });
    case "number":
      return /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: c,
          type: "number",
          className: "cms:max-w-48",
          "aria-invalid": i,
          value: typeof a == "number" ? String(a) : typeof a == "string" ? a : "",
          min: V(s, "min"),
          max: V(s, "max"),
          step: V(s, "step") ?? "any",
          onChange: (u) => l(u.target.value === "" ? null : Number(u.target.value))
        }
      );
    case "date": {
      const u = s.config?.time === !0;
      return /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: c,
          type: u ? "datetime-local" : "date",
          className: "cms:max-w-64",
          "aria-invalid": i,
          value: Vs(a, u),
          onChange: (h) => l(Us(h.target.value))
        }
      );
    }
    case "select":
      return s.config?.multiple === !0 ? /* @__PURE__ */ e.jsx(ge, { options: xe(s), value: Array.isArray(a) ? a.map(String) : [], onChange: l }) : /* @__PURE__ */ e.jsx(pe, { options: xe(s), value: typeof a == "string" ? a : null, onChange: l, id: c, required: s.required === !0 });
    case "terms": {
      const u = s.terms ?? [];
      if (s.config?.multiple === !0) {
        const h = Array.isArray(a) ? a.map(String) : [];
        return /* @__PURE__ */ e.jsx(ge, { options: u, value: h, onChange: (x) => l(x.map(Number)) });
      }
      return /* @__PURE__ */ e.jsx(
        pe,
        {
          options: u,
          id: c,
          required: s.required === !0,
          value: a == null ? null : String(a),
          onChange: (h) => l(h === null ? null : Number(h))
        }
      );
    }
    case "entries":
      return /* @__PURE__ */ e.jsx(
        oe,
        {
          id: c,
          invalid: i,
          multiple: s.config?.multiple === !0,
          max: V(s, "max") ?? null,
          collections: s.collections ?? [],
          onChange: l,
          value: typeof a == "number" || Array.isArray(a) && a.every((u) => typeof u == "number") ? a : null
        }
      );
    case "link":
      return /* @__PURE__ */ e.jsx(et, { value: Y(a), onChange: l, errors: r, id: c });
    case "media":
      return /* @__PURE__ */ e.jsx(
        t.MediaPickerInput,
        {
          id: c,
          invalid: i,
          disabled: !1,
          multiple: s.config?.multiple === !0,
          max: V(s, "max") ?? null,
          types: Array.isArray(s.config?.types) ? s.config.types : [],
          value: typeof a == "number" || Array.isArray(a) && a.every((u) => typeof u == "number") ? a : null,
          onChange: l
        }
      );
    case "group":
      return /* @__PURE__ */ e.jsx(se, { fields: s.fields ?? [], value: Y(a), onChange: l, errors: r, id: c, content: n });
    case "repeater":
      return /* @__PURE__ */ e.jsx(tt, { field: s, value: Array.isArray(a) ? a : [], onChange: l, errors: r, id: c, content: n });
    case "flexible":
      return /* @__PURE__ */ e.jsx(at, { field: s, value: Array.isArray(a) ? a : [], onChange: l, errors: r, id: c });
    default:
      return /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: c,
          "aria-invalid": i,
          value: typeof a == "string" ? a : "",
          placeholder: Qs(s, "placeholder"),
          maxLength: V(s, "max"),
          onChange: (u) => l(u.target.value)
        }
      );
  }
}
function V(s, a) {
  const l = s.config?.[a];
  return typeof l == "number" ? l : void 0;
}
function Qs(s, a) {
  const l = s.config?.[a];
  return typeof l == "string" ? l : void 0;
}
function se({ fields: s, value: a, onChange: l, errors: r, id: c, content: n }) {
  return /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-4 cms:rounded-lg cms:border cms:p-4", children: s.map((i) => /* @__PURE__ */ e.jsx(
    A,
    {
      id: `${c}-${i.handle}`,
      field: i,
      value: a[i.handle],
      content: n,
      errors: I(r, i.handle),
      onChange: (u) => l({ ...a, [i.handle]: u })
    },
    i.handle
  )) });
}
function pe({ options: s, value: a, onChange: l, id: r, required: c }) {
  return /* @__PURE__ */ e.jsxs(t.Select, { value: a ?? le, onValueChange: (n) => l(n === le ? null : n), children: [
    /* @__PURE__ */ e.jsx(t.SelectTrigger, { id: r, className: "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
    /* @__PURE__ */ e.jsxs(t.SelectContent, { children: [
      !c && /* @__PURE__ */ e.jsx(t.SelectItem, { value: le, children: "None" }),
      s.map((n) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: n.value, children: n.label }, n.value))
    ] })
  ] });
}
function ge({ options: s, value: a, onChange: l }) {
  return s.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Nothing to choose from yet." }) : /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2", children: s.map((r) => /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
    /* @__PURE__ */ e.jsx(
      t.Checkbox,
      {
        checked: a.includes(r.value),
        onCheckedChange: (c) => l(c ? s.map((n) => n.value).filter((n) => n === r.value || a.includes(n)) : a.filter((n) => n !== r.value))
      }
    ),
    r.label
  ] }, r.value)) });
}
function et({ value: s, onChange: a, errors: l, id: r }) {
  const c = (n, i) => {
    const u = { ...s, [n]: i };
    a(u.url === "" || u.url === void 0 ? null : u);
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-2 cms:md:grid-cols-[2fr_1fr_auto] cms:md:items-center", children: [
    /* @__PURE__ */ e.jsx(
      t.Input,
      {
        id: r,
        "aria-label": "Address",
        placeholder: "https://… or /about",
        value: typeof s.url == "string" ? s.url : "",
        onChange: (n) => c("url", n.target.value),
        "aria-invalid": l.url !== void 0
      }
    ),
    /* @__PURE__ */ e.jsx(
      t.Input,
      {
        "aria-label": "Link text",
        placeholder: "Link text",
        value: typeof s.label == "string" ? s.label : "",
        onChange: (n) => c("label", n.target.value)
      }
    ),
    /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
      /* @__PURE__ */ e.jsx(t.Checkbox, { checked: s.new_tab === !0, onCheckedChange: (n) => c("new_tab", n) }),
      "New tab"
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ e.jsx($, { message: l.url ?? l.label }) })
  ] });
}
function st(s, a) {
  return !a && (s.fields ?? []).every((l) => l.type === "text");
}
function tt({ field: s, value: a, onChange: l, errors: r, id: c, content: n = !1 }) {
  const i = s.fields ?? [], u = a.map(Y), h = (o, d) => l(u.map((g, j) => j === o ? d : g)), x = (s.label || "row").toLowerCase().replace(/s$/, ""), p = x.charAt(0).toUpperCase() + x.slice(1);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    u.map((o, d) => st(s, n) ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
      i.map((g) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(
          t.Input,
          {
            "aria-label": g.label || g.handle,
            placeholder: g.label || g.handle,
            value: typeof o[g.handle] == "string" ? o[g.handle] : "",
            onChange: (j) => h(d, { ...o, [g.handle]: j.target.value })
          }
        ),
        /* @__PURE__ */ e.jsx($, { message: r[`${d}.${g.handle}`] })
      ] }, g.handle)),
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": `Remove ${x} ${d + 1}`, onClick: () => l(u.filter((g, j) => j !== d)), children: /* @__PURE__ */ e.jsx(L, {}) })
    ] }, d) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(
        cs,
        {
          label: `${p} ${d + 1}`,
          index: d,
          count: u.length,
          onMove: (g) => l(U(u, d, g)),
          onRemove: () => l(u.filter((g, j) => j !== d)),
          hidden: n ? o._hidden === !0 : void 0,
          onHidden: (g) => h(d, { ...o, _hidden: g })
        }
      ),
      /* @__PURE__ */ e.jsx(se, { fields: i, value: o, onChange: (g) => h(d, g), errors: I(r, String(d)), id: `${c}-${d}`, content: n })
    ] }, typeof o._id == "string" ? o._id : d)),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", size: "sm", onClick: () => l([...u, n ? Ws() : {}]), children: [
      /* @__PURE__ */ e.jsx(R, {}),
      " Add ",
      x
    ] }) })
  ] });
}
function at({ field: s, value: a, onChange: l, errors: r, id: c }) {
  const n = s.blocks ?? [], i = a.map(Y), u = (h, x) => l(i.map((p, o) => o === h ? x : p));
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    i.map((h, x) => {
      const p = n.find((o) => o.type === h.type);
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(
          cs,
          {
            label: p?.label ?? String(h.type),
            badge: !0,
            index: x,
            count: i.length,
            onMove: (o) => l(U(i, x, o)),
            onRemove: () => l(i.filter((o, d) => d !== x)),
            hidden: h.hidden === !0,
            onHidden: (o) => u(x, { ...h, hidden: o })
          }
        ),
        p ? /* @__PURE__ */ e.jsx(
          se,
          {
            fields: p.fields,
            value: Y(h.values),
            onChange: (o) => u(x, { ...h, values: o }),
            errors: I(r, `${x}.values`),
            id: `${c}-${x}`,
            content: !0
          }
        ) : /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: "This kind of block no longer exists. Its values are kept." }),
        /* @__PURE__ */ e.jsx($, { message: r[`${x}.type`] })
      ] }, typeof h.id == "string" ? h.id : x);
    }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(t.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(t.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", size: "sm", disabled: n.length === 0, children: [
        /* @__PURE__ */ e.jsx(R, {}),
        " Add block"
      ] }) }),
      /* @__PURE__ */ e.jsx(t.DropdownMenuContent, { align: "start", children: n.map((h) => /* @__PURE__ */ e.jsx(t.DropdownMenuItem, { onSelect: () => l([...i, qs(h.type)]), children: h.label }, h.type)) })
    ] }) })
  ] });
}
function cs({ label: s, badge: a = !1, index: l, count: r, onMove: c, onRemove: n, hidden: i, onHidden: u }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    a ? /* @__PURE__ */ e.jsx(t.Badge, { variant: "secondary", children: s }) : /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:font-medium", children: s }),
    i !== void 0 && /* @__PURE__ */ e.jsxs("label", { className: "cms:ml-auto cms:flex cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", children: [
      /* @__PURE__ */ e.jsx(t.Switch, { checked: !i, onCheckedChange: (h) => u(!h), "aria-label": `Show ${s}` }),
      "Show"
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: i === void 0 ? "cms:ml-auto cms:flex" : "cms:flex", children: [
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Move ${s} up`, disabled: l === 0, onClick: () => c(-1), children: /* @__PURE__ */ e.jsx(K, {}) }),
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Move ${s} down`, disabled: l === r - 1, onClick: () => c(1), children: /* @__PURE__ */ e.jsx(q, {}) }),
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": `Remove ${s}`, onClick: n, children: /* @__PURE__ */ e.jsx(L, {}) })
    ] })
  ] });
}
function rs({ fields: s, onChange: a, types: l, errors: r, depth: c = 1, idPrefix: n = "field" }) {
  const [i, u] = S.useState(() => /* @__PURE__ */ new Set()), h = (o) => u((d) => {
    const g = new Set(d);
    return g.has(o) ? g.delete(o) : g.add(o), g;
  }), x = (o, d) => a(s.map((g, j) => j === o ? d : g)), p = (o) => {
    const d = Os(o.type, o.label, s);
    a([...s, d]), u((g) => new Set(g).add(d.key));
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:border-dashed cms:p-4 cms:text-sm cms:text-muted-foreground", children: "No fields yet." }),
    s.map((o, d) => {
      const g = l.find((b) => b.type === o.type), j = i.has(o.key) || ue(r, String(d)), m = `${n}-${o.key}`;
      return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${ue(r, String(d)) ? "cms:border-destructive" : ""}`, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:p-2", children: [
          /* @__PURE__ */ e.jsx(
            t.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-expanded": j,
              "aria-controls": m,
              "aria-label": `${j ? "Close" : "Open"} ${o.label || o.handle}`,
              onClick: () => h(o.key),
              children: j ? /* @__PURE__ */ e.jsx(_e, {}) : /* @__PURE__ */ e.jsx(re, {})
            }
          ),
          /* @__PURE__ */ e.jsxs("button", { type: "button", className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:text-left", onClick: () => h(o.key), children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: o.label || o.handle }),
            /* @__PURE__ */ e.jsx("code", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", children: o.handle })
          ] }),
          o.required && /* @__PURE__ */ e.jsx(t.Badge, { variant: "outline", children: "Required" }),
          /* @__PURE__ */ e.jsx(t.Badge, { variant: "secondary", children: g?.label ?? o.type }),
          /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move up", disabled: d === 0, onClick: () => a(U(s, d, -1)), children: /* @__PURE__ */ e.jsx(K, {}) }),
          /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move down", disabled: d === s.length - 1, onClick: () => a(U(s, d, 1)), children: /* @__PURE__ */ e.jsx(q, {}) }),
          /* @__PURE__ */ e.jsx(
            t.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Remove ${o.label || o.handle}`,
              onClick: () => a(s.filter((b, T) => T !== d)),
              children: /* @__PURE__ */ e.jsx(L, {})
            }
          )
        ] }),
        j && /* @__PURE__ */ e.jsx(
          lt,
          {
            id: m,
            field: o,
            type: g,
            siblings: s,
            onChange: (b) => x(d, b),
            types: l,
            errors: te(r, String(d)),
            depth: c
          }
        )
      ] }, o.key);
    }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(t.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(t.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", size: "sm", children: [
        /* @__PURE__ */ e.jsx(R, {}),
        " Add field"
      ] }) }),
      /* @__PURE__ */ e.jsx(t.DropdownMenuContent, { align: "start", children: l.filter((o) => !o.hasChildren || c < Hs).map((o) => /* @__PURE__ */ e.jsx(t.DropdownMenuItem, { onSelect: () => p(o), children: o.label }, o.type)) })
    ] }) })
  ] });
}
const H = { default: "__default", yes: "yes", no: "no" };
function lt({ id: s, field: a, type: l, siblings: r, onChange: c, types: n, errors: i, depth: u }) {
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
        /* @__PURE__ */ e.jsx(t.Input, { id: `${s}-label`, value: a.label ?? "", onChange: (x) => c(Ps(a, x.target.value, r)) }),
        /* @__PURE__ */ e.jsx($, { message: i.label })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${s}-handle`, children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          t.Input,
          {
            id: `${s}-handle`,
            className: "cms:font-mono",
            value: a.handle,
            onChange: (x) => c({ ...a, handle: x.target.value, handleTouched: !0 })
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "How templates read it. Renaming it hides values saved under the old one." }),
        /* @__PURE__ */ e.jsx($, { message: i.handle })
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
          onChange: (x) => c({ ...a, instructions: x.target.value || null })
        }
      ),
      /* @__PURE__ */ e.jsx($, { message: i.instructions })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-6", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(t.Switch, { id: `${s}-required`, checked: a.required === !0, onCheckedChange: (x) => c({ ...a, required: x }) }),
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${s}-required`, children: "Required" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${s}-translatable`, children: "Per language" }),
        /* @__PURE__ */ e.jsxs(
          t.Select,
          {
            value: a.translatable === !0 ? H.yes : a.translatable === !1 ? H.no : H.default,
            onValueChange: (x) => c({ ...a, translatable: x === H.yes ? !0 : x === H.no ? !1 : null }),
            children: [
              /* @__PURE__ */ e.jsx(t.SelectTrigger, { id: `${s}-translatable`, className: "cms:w-48", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
              /* @__PURE__ */ e.jsxs(t.SelectContent, { children: [
                /* @__PURE__ */ e.jsx(t.SelectItem, { value: H.default, children: "As the type decides" }),
                /* @__PURE__ */ e.jsx(t.SelectItem, { value: H.yes, children: "Yes, translated" }),
                /* @__PURE__ */ e.jsx(t.SelectItem, { value: H.no, children: "No, shared" })
              ] })
            ]
          }
        )
      ] })
    ] }),
    (l?.settings.length ?? 0) > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: l?.settings.map((x) => /* @__PURE__ */ e.jsx(
      A,
      {
        id: `${s}-config-${x.handle}`,
        field: x,
        value: h[x.handle],
        errors: I(i, `config.${x.handle}`),
        onChange: (p) => c({ ...a, config: { ...h, [x.handle]: p } })
      },
      x.handle
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
          onChange: (x) => c({ ...a, validation: x.target.value.split(`
`) })
        }
      ),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Laravel rules, one per line." }),
      /* @__PURE__ */ e.jsx($, { message: i.validation ?? Object.entries(i).find(([x]) => x.startsWith("validation."))?.[1] })
    ] }),
    l?.hasChildren && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(t.Label, { children: "Fields inside" }),
      /* @__PURE__ */ e.jsx(
        rs,
        {
          fields: a.fields,
          onChange: (x) => c({ ...a, fields: x }),
          types: n,
          errors: te(i, "fields"),
          depth: u + 1,
          idPrefix: s
        }
      ),
      /* @__PURE__ */ e.jsx($, { message: i.fields })
    ] }),
    /* @__PURE__ */ e.jsx($, { message: i.type })
  ] });
}
function nt({ kind: s = "blueprint", blueprint: a, fieldTypes: l, usedBy: r = [] }) {
  const c = s === "fieldset" ? "Fieldset" : "Blueprint", n = N(s === "fieldset" ? "cms/fieldsets" : "cms/blueprints"), i = a ? a.title : `New ${c.toLowerCase()}`;
  t.useBreadcrumbs([{ label: `${c}s`, href: n }, { label: i }]);
  const [u, h] = Z(), x = f.useForm({ title: a?.title ?? "", handle: a?.handle ?? "" }), [p, o] = S.useState(a !== null), [d, g] = S.useState(() => as(a?.fields)), j = (B) => l.find((M) => M.type === B)?.hasChildren === !0, m = x.errors, [b, T] = S.useState(() => JSON.stringify(d)), y = x.isDirty || JSON.stringify(d) !== b, w = () => {
    x.setDefaults(), T(JSON.stringify(d));
  }, v = () => {
    x.processing || (x.transform((B) => ({
      ...a ? { title: B.title } : B,
      fields: ls(d, j)
    })), a ? x.put(`${n}/${a.id}`, { preserveScroll: !0, onSuccess: w }) : x.post(n, { onSuccess: w }));
  }, k = (B) => {
    B.preventDefault(), v();
  };
  t.useUnsavedChanges(y, v);
  const D = () => a && u(
    `Delete the ${c.toLowerCase()} "${a.title}"? Content keeps its values.`,
    () => f.router.delete(`${n}/${a.id}`, { preserveScroll: !0 })
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: k, className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: i }),
    h,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(t.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: n, "aria-label": `Back to ${c.toLowerCase()}s`, children: /* @__PURE__ */ e.jsx(G, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: i })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        a && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "outline", size: "icon", className: "cms:text-destructive", "aria-label": `Delete ${i}`, onClick: D, children: /* @__PURE__ */ e.jsx(L, {}) }),
        /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", disabled: x.processing, children: [
          x.processing && /* @__PURE__ */ e.jsx(J, { className: "cms:animate-spin" }),
          a ? "Save" : `Create ${c.toLowerCase()}`
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx($, { message: m.blueprint ?? m.fieldset }),
    /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsxs(t.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "title", children: "Title" }),
        /* @__PURE__ */ e.jsx(t.Input, { id: "title", value: x.data.title, required: !0, onChange: (B) => {
          x.setData((M) => ({ ...M, title: B.target.value, handle: p ? M.handle : ss(B.target.value) }));
        } }),
        /* @__PURE__ */ e.jsx($, { message: m.title })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "handle", children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          t.Input,
          {
            id: "handle",
            className: "cms:font-mono",
            value: x.data.handle,
            disabled: a !== null,
            required: !0,
            onChange: (B) => {
              o(!0), x.setData("handle", B.target.value);
            }
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: a ? "Set when it was created." : "Lowercase letters, digits and underscores. It can't change later." }),
        /* @__PURE__ */ e.jsx($, { message: m.handle })
      ] })
    ] }) }),
    r.length > 0 && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      "Used by ",
      r.join(", "),
      ". Changes show there at once."
    ] }),
    /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-3", "aria-labelledby": "fields-heading", children: [
      /* @__PURE__ */ e.jsx("h2", { id: "fields-heading", className: "cms:text-lg cms:font-medium", children: "Fields" }),
      /* @__PURE__ */ e.jsx(rs, { fields: d, onChange: g, types: l, errors: te(m, "fields") }),
      /* @__PURE__ */ e.jsx($, { message: m.fields })
    ] })
  ] });
}
function is({ noun: s, base: a, rows: l, intro: r }) {
  const c = `${s}s`;
  t.useBreadcrumbs([{ label: c }]);
  const [n, i] = Z();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: c }),
    i,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: c }),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: r })
      ] }),
      /* @__PURE__ */ e.jsx(t.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(f.Link, { href: `${a}/create`, children: [
        /* @__PURE__ */ e.jsx(R, {}),
        " New ",
        s.toLowerCase()
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsx(t.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(t.Table, { children: [
      /* @__PURE__ */ e.jsx(t.TableHeader, { children: /* @__PURE__ */ e.jsxs(t.TableRow, { children: [
        /* @__PURE__ */ e.jsx(t.TableHead, { children: "Title" }),
        /* @__PURE__ */ e.jsx(t.TableHead, { children: "Handle" }),
        /* @__PURE__ */ e.jsx(t.TableHead, { children: "Fields" }),
        l.some((u) => u.usedBy) && /* @__PURE__ */ e.jsx(t.TableHead, { children: "Used by" }),
        /* @__PURE__ */ e.jsx(t.TableHead, { className: "cms:w-12", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: "Actions" }) })
      ] }) }),
      /* @__PURE__ */ e.jsxs(t.TableBody, { children: [
        l.length === 0 && /* @__PURE__ */ e.jsx(t.TableRow, { children: /* @__PURE__ */ e.jsxs(t.TableCell, { colSpan: 5, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: [
          "No ",
          c.toLowerCase(),
          " yet."
        ] }) }),
        l.map((u) => /* @__PURE__ */ e.jsxs(t.TableRow, { children: [
          /* @__PURE__ */ e.jsx(t.TableCell, { children: /* @__PURE__ */ e.jsx(f.Link, { href: `${a}/${u.id}/edit`, className: "cms:font-medium cms:hover:underline", children: u.title }) }),
          /* @__PURE__ */ e.jsx(t.TableCell, { children: /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: u.handle }) }),
          /* @__PURE__ */ e.jsx(t.TableCell, { children: u.fields }),
          u.usedBy && /* @__PURE__ */ e.jsx(t.TableCell, { className: "cms:text-muted-foreground", children: u.usedBy.join(", ") || "—" }),
          /* @__PURE__ */ e.jsx(t.TableCell, { children: /* @__PURE__ */ e.jsx(
            t.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Delete ${u.title}`,
              onClick: () => n(
                `Delete the ${s.toLowerCase()} "${u.title}"? Content keeps its values.`,
                () => f.router.delete(`${a}/${u.id}`, { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(L, {})
            }
          ) })
        ] }, u.id))
      ] })
    ] }) })
  ] });
}
function ct({ blueprints: s }) {
  const a = f.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx($, { message: a.blueprint }),
    /* @__PURE__ */ e.jsx(
      is,
      {
        noun: "Blueprint",
        base: N("cms/blueprints"),
        rows: s,
        intro: "The fields editors fill in, for each kind of content."
      }
    )
  ] });
}
const os = [
  { handle: "title", type: "text", label: "SEO title", instructions: "For search results and tabs. Empty: the title.", config: { max: 255 } },
  { handle: "description", type: "textarea", label: "Description", instructions: "A sentence or two for search results and shared links.", config: { max: 500 } },
  { handle: "image", type: "media", label: "Share image", instructions: "Shown when the page is shared.", config: { types: ["image"] } },
  { handle: "noindex", type: "toggle", label: "Hide from search engines" },
  { handle: "canonical", type: "text", label: "Canonical address", instructions: "Only when this page copies one elsewhere: that page's full address. Empty: this page.", config: { max: 2e3 } }
];
function rt(s) {
  const { entry: a } = s;
  return /* @__PURE__ */ e.jsx(it, { ...s }, a ? `${a.id}:${a.locale}:${a.version}:${a.status}:${a.trashed}:${a.publishedAt}` : "new");
}
function it({ collection: s, fields: a, locales: l = [], shared: r = [], sharedValues: c = {}, entry: n, values: i, revisions: u, undoRestore: h = null, settings: x, can: p }) {
  const o = N(`cms/collections/${s.handle}/entries`), d = n ? N(`cms/entries/${n.id}`) : o, g = n ? i.title : "New entry";
  t.useBreadcrumbs([{ label: s.title, href: o }, { label: g }]);
  const [j, m] = Z(), [b, T] = S.useState(!1), y = f.useForm({ ...i, seo: i.seo ?? {}, locale: n?.locale ?? null, version: n?.version ?? null, publish: !1, published_at: null }), w = n ? { locale: n.locale } : {}, v = l.find((C) => C.main)?.code, k = y.errors, D = n !== null && n.status !== "draft" && !n.hasUnpublishedChanges && !y.isDirty, B = n === null ? p.create : p.update && !n.trashed, M = (C = !1, F = null) => {
    y.transform((O) => ({ ...O, publish: C, published_at: F })), n ? y.put(d, { preserveScroll: !0, onSuccess: () => T(!1) }) : y.post(d);
  }, xs = () => {
    y.transform((C) => ({ ...C, version: null, publish: !1, published_at: null })), y.put(d, { preserveScroll: !0 });
  }, E = t.useEditLock({
    type: "cms.entry",
    id: n?.id,
    locale: n?.locale,
    enabled: n !== null && B,
    noun: "entry",
    leaveTo: o,
    getUnsaved: () => y.isDirty ? { title: y.data.title, slug: y.data.slug, data: y.data.data, seo: y.data.seo } : null
  }), X = B && !E.readOnly, ps = async (C) => {
    const F = await E.loadKept(C);
    y.setData((O) => ({ ...O, title: F.title ?? O.title, slug: F.slug ?? O.slug, data: F.data ?? O.data, seo: F.seo ?? O.seo }));
  };
  t.useUnsavedChanges(y.isDirty && !E.takenOver, X ? () => y.processing || M() : void 0);
  const de = (C = null) => {
    p.update ? M(!0, C) : n && f.router.post(`${d}/publish`, { ...w, published_at: C }, { preserveScroll: !0, onSuccess: () => T(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (C) => {
    C.preventDefault(), M();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: g }),
    m,
    E.dialogs,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(t.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: o, "aria-label": `Back to ${s.title}`, children: /* @__PURE__ */ e.jsx(G, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: g }),
        n && /* @__PURE__ */ e.jsx(t.Badge, { variant: n.status === "published" ? "default" : "secondary", children: n.trashed ? "In the trash" : W(n.status) }),
        y.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        n && !n.trashed && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(
          "a",
          {
            href: n.previewUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            title: y.isDirty ? "Shows the saved draft: save first to see your changes." : "Shows the saved draft.",
            children: [
              /* @__PURE__ */ e.jsx(Ts, {}),
              " Preview"
            ]
          }
        ) }),
        n?.url && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: n.url, target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ e.jsx(ie, {}),
          " View"
        ] }) }),
        n?.trashed && p.delete && /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", onClick: () => f.router.post(`${d}/restore`, {}, { preserveScroll: !0 }), children: [
          /* @__PURE__ */ e.jsx(Ge, {}),
          " Restore"
        ] }),
        n?.trashed && p.delete && /* @__PURE__ */ e.jsxs(
          t.Button,
          {
            type: "button",
            variant: "outline",
            className: "cms:text-destructive",
            onClick: () => j(`Delete "${i.title}" for good, in every language, with its revisions? This can't be undone.`, () => f.router.delete(`${d}/force`)),
            children: [
              /* @__PURE__ */ e.jsx(L, {}),
              " Delete for good"
            ]
          }
        ),
        n && !n.trashed && p.create && /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "ghost", title: "Copy every language as a new draft", onClick: () => f.router.post(`${d}/duplicate`), children: [
          /* @__PURE__ */ e.jsx(_s, {}),
          " Duplicate"
        ] }),
        n && !n.trashed && p.delete && !E.readOnly && /* @__PURE__ */ e.jsx(
          t.Button,
          {
            type: "button",
            variant: "outline",
            size: "icon",
            className: "cms:text-destructive",
            "aria-label": "Move to the trash",
            onClick: () => j(`Move "${i.title}" to the trash? It comes off the site; you can restore it.`, () => f.router.delete(d)),
            children: /* @__PURE__ */ e.jsx(L, {})
          }
        ),
        X && /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", variant: n && p.publish ? "outline" : "default", disabled: y.processing, children: [
          y.processing && /* @__PURE__ */ e.jsx(J, { className: "cms:animate-spin" }),
          n ? "Save draft" : "Create draft"
        ] }),
        n && !n.trashed && p.publish && !E.readOnly && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex", children: [
          /* @__PURE__ */ e.jsx(t.Button, { type: "button", className: "cms:rounded-r-none", disabled: y.processing || D, onClick: () => de(), children: n.status === "draft" ? "Publish" : D ? "Published" : "Publish changes" }),
          /* @__PURE__ */ e.jsxs(t.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(t.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(t.Button, { type: "button", size: "icon", className: "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": "More publishing options", children: /* @__PURE__ */ e.jsx(_e, {}) }) }),
            /* @__PURE__ */ e.jsxs(t.DropdownMenuContent, { align: "end", children: [
              /* @__PURE__ */ e.jsxs(t.DropdownMenuItem, { onSelect: () => T(!0), children: [
                /* @__PURE__ */ e.jsx(Ds, {}),
                " Publish on a date…"
              ] }),
              n.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(t.DropdownMenuSeparator, {}),
                /* @__PURE__ */ e.jsx(t.DropdownMenuItem, { onSelect: () => f.router.post(`${d}/unpublish`, w, { preserveScroll: !0 }), children: "Unpublish" })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }),
    n && l.length > 1 && /* @__PURE__ */ e.jsx(
      ot,
      {
        entryUrl: d,
        current: n.locale,
        locales: l,
        canAdd: p.create && !n.trashed,
        canRemove: p.delete && !n.isMain && !n.trashed,
        onRemove: () => j(
          `Remove the ${z(n.locale)} translation of "${i.title}"? Its revisions go with it.`,
          () => f.router.delete(`${d}/translations/${n.locale}`)
        )
      }
    ),
    /* @__PURE__ */ e.jsx(t.ViewingNotice, { by: E.viewingBy }),
    /* @__PURE__ */ e.jsx(t.KeptEditsNotice, { kept: E.kept, disabled: !X, onLoad: (C) => {
      ps(C);
    }, onDiscard: (C) => {
      E.discardKept(C);
    } }),
    k.version && /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: [
      /* @__PURE__ */ e.jsx("span", { children: k.version }),
      /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "outline", size: "sm", onClick: () => f.router.reload(), children: "Load theirs" }),
        /* @__PURE__ */ e.jsx(
          t.Button,
          {
            type: "button",
            variant: "destructive",
            size: "sm",
            disabled: y.processing,
            onClick: () => j("Save your version over theirs? Their changes are replaced (their earlier published versions stay in the revisions).", xs),
            children: "Save mine anyway"
          }
        )
      ] })
    ] }),
    (k.entry || k.published_at) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: k.entry ?? k.published_at }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_18rem]", children: [
      /* @__PURE__ */ e.jsxs("fieldset", { disabled: !X, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsxs(t.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-[2fr_1fr]", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "title", children: "Title" }),
            /* @__PURE__ */ e.jsx(
              t.Input,
              {
                id: "title",
                value: y.data.title,
                "aria-invalid": k.title !== void 0,
                onChange: (C) => y.setData("title", C.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx($, { message: k.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "slug", children: "Slug" }),
            /* @__PURE__ */ e.jsx(
              t.Input,
              {
                id: "slug",
                className: "cms:font-mono",
                value: y.data.slug,
                placeholder: "Made from the title",
                "aria-invalid": k.slug !== void 0,
                onChange: (C) => y.setData("slug", C.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx($, { message: k.slug })
          ] })
        ] }) }),
        a.length > 0 && /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsx(t.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: a.map((C) => r.includes(C.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
          /* @__PURE__ */ e.jsx(A, { id: `data-${C.handle}`, field: C, content: !0, value: c[C.handle], errors: {}, onChange: () => {
          } }),
          /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
            "Shared by all languages: edit it in ",
            v ? z(v) : "the main language",
            "."
          ] })
        ] }, C.handle) : /* @__PURE__ */ e.jsx(
          A,
          {
            id: `data-${C.handle}`,
            field: C,
            content: !0,
            value: y.data.data[C.handle],
            errors: I(k, `data.${C.handle}`),
            onChange: (F) => y.setData("data", { ...y.data.data, [C.handle]: F })
          },
          C.handle
        )) }) }),
        /* @__PURE__ */ e.jsxs(t.Card, { children: [
          /* @__PURE__ */ e.jsx(t.CardHeader, { children: /* @__PURE__ */ e.jsx(t.CardTitle, { className: "cms:text-base", children: "Search and sharing" }) }),
          /* @__PURE__ */ e.jsx(t.CardContent, { children: /* @__PURE__ */ e.jsx(
            se,
            {
              id: "seo",
              fields: os,
              value: y.data.seo,
              errors: I(k, "seo"),
              onChange: (C) => y.setData("seo", C)
            }
          ) })
        ] })
      ] }),
      n && /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:flex-col cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs(t.Card, { children: [
          /* @__PURE__ */ e.jsx(t.CardHeader, { children: /* @__PURE__ */ e.jsx(t.CardTitle, { className: "cms:text-base", children: "Status" }) }),
          /* @__PURE__ */ e.jsxs(t.CardContent, { className: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
            /* @__PURE__ */ e.jsxs("p", { children: [
              W(n.status),
              n.status !== "draft" && n.publishedAt ? ` · ${Q(n.publishedAt)}` : ""
            ] }),
            n.status !== "draft" && n.hasUnpublishedChanges && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The draft has changes the site doesn't show yet." })
          ] })
        ] }),
        x && /* @__PURE__ */ e.jsx(mt, { entryUrl: d, collection: s, settings: x, disabled: !X }),
        /* @__PURE__ */ e.jsxs(t.Card, { children: [
          /* @__PURE__ */ e.jsx(t.CardHeader, { children: /* @__PURE__ */ e.jsx(t.CardTitle, { className: "cms:text-base", children: "Revisions" }) }),
          /* @__PURE__ */ e.jsxs(t.CardContent, { className: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
            h !== null && p.update && /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", size: "sm", onClick: () => f.router.post(N(`cms/entry-translations/${h}/undo-restore`), {}, { preserveScroll: !0 }), children: [
              /* @__PURE__ */ e.jsx(Es, {}),
              " Undo the restore"
            ] }),
            u.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "Each publish keeps one." }),
            u.map((C) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
                /* @__PURE__ */ e.jsx("div", { className: "cms:truncate", children: C.title }),
                /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: Q(C.createdAt) })
              ] }),
              p.update && !n.trashed && /* @__PURE__ */ e.jsx(
                t.Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  onClick: () => f.router.post(N(`cms/revisions/${C.id}/restore`), {}, { preserveScroll: !0 }),
                  children: "Restore"
                }
              )
            ] }, C.id))
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(
      dt,
      {
        open: b,
        onClose: () => T(!1),
        processing: y.processing,
        current: n?.publishedAt ?? null,
        onSchedule: (C) => de(C)
      }
    )
  ] });
}
function ot({ entryUrl: s, current: a, locales: l, canAdd: r, canRemove: c, onRemove: n }) {
  return /* @__PURE__ */ e.jsxs("nav", { "aria-label": "Languages", className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
    l.map((i) => {
      const u = `${z(i.code)}${i.main ? " (main)" : ""}`;
      return i.status === null ? r ? /* @__PURE__ */ e.jsxs(
        t.Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "cms:border-dashed",
          onClick: () => f.router.post(`${s}/translations`, { locale: i.code }),
          children: [
            /* @__PURE__ */ e.jsx(R, {}),
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
          variant: i.code === a ? "secondary" : "ghost",
          "aria-current": i.code === a ? "page" : void 0,
          onClick: () => i.code !== a && f.router.get(`${s}/edit`, { locale: i.code }),
          children: [
            u,
            /* @__PURE__ */ e.jsx(t.Badge, { variant: i.status === "published" ? "default" : "outline", className: "cms:ml-1", children: W(i.status) })
          ]
        },
        i.code
      );
    }),
    c && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:ml-auto cms:text-destructive", onClick: n, children: "Remove this language" })
  ] });
}
function dt({ open: s, onClose: a, onSchedule: l, current: r, processing: c }) {
  const [n, i] = S.useState("");
  return S.useEffect(() => {
    s && i(Ks(r ? new Date(r) : new Date(Date.now() + 864e5)));
  }, [s, r]), /* @__PURE__ */ e.jsx(t.Dialog, { open: s, onOpenChange: (u) => !u && a(), children: /* @__PURE__ */ e.jsxs(t.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(t.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(t.DialogTitle, { children: "Publish on a date" }),
      /* @__PURE__ */ e.jsx(t.DialogDescription, { children: "The entry goes live then; a date in the past publishes it now with that date." })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "published-at", children: "Date and time" }),
      /* @__PURE__ */ e.jsx(t.Input, { id: "published-at", type: "datetime-local", value: n, onChange: (u) => i(u.target.value) }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "In your time zone." })
    ] }),
    /* @__PURE__ */ e.jsxs(t.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "outline", onClick: a, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", disabled: n === "" || c, onClick: () => l(new Date(n).toISOString()), children: "Publish" })
    ] })
  ] }) });
}
function mt({ entryUrl: s, collection: a, settings: l, disabled: r }) {
  const c = f.useForm({ parent_id: l.parentId, template: l.template ?? "" }), n = c.errors;
  return /* @__PURE__ */ e.jsxs(t.Card, { children: [
    /* @__PURE__ */ e.jsx(t.CardHeader, { children: /* @__PURE__ */ e.jsx(t.CardTitle, { className: "cms:text-base", children: "Page settings" }) }),
    /* @__PURE__ */ e.jsx(t.CardContent, { children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: r, className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: [
      a.hierarchical && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "parent", children: "Parent" }),
        /* @__PURE__ */ e.jsx(
          oe,
          {
            id: "parent",
            multiple: !1,
            max: 1,
            collections: [a.handle],
            invalid: n.parent_id !== void 0,
            value: c.data.parent_id,
            onChange: (i) => c.setData("parent_id", typeof i == "number" ? i : null)
          }
        ),
        /* @__PURE__ */ e.jsx($, { message: n.parent_id })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "template", children: "Template" }),
        /* @__PURE__ */ e.jsx(
          t.Input,
          {
            id: "template",
            className: "cms:font-mono",
            placeholder: "The collection's",
            value: c.data.template,
            onChange: (i) => c.setData("template", i.target.value),
            "aria-invalid": n.template !== void 0
          }
        ),
        /* @__PURE__ */ e.jsx($, { message: n.template })
      ] }),
      c.isDirty && /* @__PURE__ */ e.jsx(
        t.Button,
        {
          type: "button",
          size: "sm",
          disabled: c.processing,
          onClick: () => c.put(`${s}/settings`, { preserveScroll: !0, onSuccess: () => c.setDefaults() }),
          children: "Save settings"
        }
      )
    ] }) })
  ] });
}
function ut({ collection: s, collections: a, entries: l, query: r, can: c }) {
  t.useBreadcrumbs([{ label: "Entries", href: N("cms/entries") }, ...s ? [{ label: s.title }] : []]);
  const [n, i] = S.useState(r.search), u = s ? N(`cms/collections/${s.handle}/entries`) : "", [h, x] = S.useState([]), [p, o] = Z();
  S.useEffect(() => x([]), [l]);
  const d = r.trashed ? c?.delete ? [{ action: "restore", label: "Restore" }, { action: "delete", label: "Delete for good", danger: !0 }] : [] : [
    ...c?.publish ? [{ action: "publish", label: "Publish" }, { action: "unpublish", label: "Unpublish" }] : [],
    ...c?.delete ? [{ action: "trash", label: "Move to the trash", danger: !0 }] : []
  ], g = (m, b, T = !1) => {
    const y = () => f.router.post(`${u}/bulk`, { action: m, ids: h }, { preserveScroll: !0 });
    T ? p(`${b}: ${h.length} ${h.length === 1 ? "entry" : "entries"}?${m === "delete" ? " This can't be undone." : ""}`, y) : y();
  }, j = (m) => {
    const b = { ...r, ...m };
    f.router.get(
      u,
      { ...b.search ? { search: b.search } : {}, ...b.trashed ? { trashed: 1 } : {} },
      { preserveState: !0, preserveScroll: !0, replace: !0 }
    );
  };
  return S.useEffect(() => {
    if (n === r.search) return;
    const m = window.setTimeout(() => j({ search: n }), 300);
    return () => window.clearTimeout(m);
  }, [n]), !s || !l ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: "Entries" }),
    /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Entries" }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no collections yet. Create one under Structure → Collections, then come back to write its entries." })
  ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: s.title }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
        a.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: s.handle, onValueChange: (m) => f.router.get(N(`cms/collections/${m}/entries`)), children: [
          /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Collection", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(t.SelectContent, { children: a.map((m) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: m.handle, children: m.title }, m.handle)) })
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        s.listing && !r.trashed && /* @__PURE__ */ e.jsx(t.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs(f.Link, { href: N(`cms/collections/${s.handle}/listing`), children: [
          /* @__PURE__ */ e.jsx(zs, {}),
          " Listing page"
        ] }) }),
        l.total > 0 && !r.trashed && /* @__PURE__ */ e.jsx(t.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: `${u}/export`, children: [
          /* @__PURE__ */ e.jsx(Ie, {}),
          " Export CSV"
        ] }) }),
        c?.create && !r.trashed && /* @__PURE__ */ e.jsx(t.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(f.Link, { href: `${u}/create`, children: [
          /* @__PURE__ */ e.jsx(R, {}),
          " New entry"
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-sm", children: [
        /* @__PURE__ */ e.jsx(Je, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          t.Input,
          {
            className: "cms:pl-9",
            placeholder: "Search titles",
            "aria-label": "Search titles",
            value: n,
            onChange: (m) => i(m.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(t.Button, { variant: r.trashed ? "secondary" : "ghost", size: "sm", onClick: () => j({ trashed: !r.trashed }), children: r.trashed ? "Back to entries" : "Trash" }),
      h.length > 0 && d.length > 0 && /* @__PURE__ */ e.jsxs("div", { role: "toolbar", "aria-label": "Selected entries", className: "cms:ml-auto cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs("span", { className: "cms:text-sm cms:text-muted-foreground", children: [
          h.length,
          " selected"
        ] }),
        d.map((m) => /* @__PURE__ */ e.jsx(t.Button, { size: "sm", variant: m.danger ? "destructive" : "outline", onClick: () => g(m.action, m.label, m.danger), children: m.label }, m.action))
      ] })
    ] }),
    o,
    /* @__PURE__ */ e.jsx(t.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(t.Table, { children: [
      /* @__PURE__ */ e.jsx(t.TableHeader, { children: /* @__PURE__ */ e.jsxs(t.TableRow, { children: [
        d.length > 0 && /* @__PURE__ */ e.jsx(t.TableHead, { className: "cms:w-10", children: /* @__PURE__ */ e.jsx(
          t.Checkbox,
          {
            "aria-label": "Select all on this page",
            checked: l.data.length > 0 && h.length === l.data.length,
            onCheckedChange: (m) => x(m ? l.data.map((b) => b.id) : [])
          }
        ) }),
        /* @__PURE__ */ e.jsx(t.TableHead, { children: "Title" }),
        /* @__PURE__ */ e.jsx(t.TableHead, { children: "Status" }),
        /* @__PURE__ */ e.jsx(t.TableHead, { children: s.dated ? "Date" : "Updated" })
      ] }) }),
      /* @__PURE__ */ e.jsxs(t.TableBody, { children: [
        l.data.length === 0 && /* @__PURE__ */ e.jsx(t.TableRow, { children: /* @__PURE__ */ e.jsx(t.TableCell, { colSpan: d.length > 0 ? 4 : 3, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: r.trashed ? "The trash is empty." : r.search ? "Nothing matches." : "No entries yet." }) }),
        l.data.map((m) => /* @__PURE__ */ e.jsxs(t.TableRow, { "data-state": h.includes(m.id) ? "selected" : void 0, children: [
          d.length > 0 && /* @__PURE__ */ e.jsx(t.TableCell, { children: /* @__PURE__ */ e.jsx(
            t.Checkbox,
            {
              "aria-label": `Select ${m.title}`,
              checked: h.includes(m.id),
              onCheckedChange: (b) => x(b ? [...h, m.id] : h.filter((T) => T !== m.id))
            }
          ) }),
          /* @__PURE__ */ e.jsxs(t.TableCell, { children: [
            /* @__PURE__ */ e.jsx(f.Link, { href: N(`cms/entries/${m.id}/edit`), className: "cms:font-medium cms:hover:underline", children: m.title }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
              "/",
              m.slug,
              m.parent ? ` · under ${m.parent}` : ""
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(t.TableCell, { children: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-1", children: [
            /* @__PURE__ */ e.jsx(t.Badge, { variant: m.status === "published" ? "default" : "secondary", children: W(m.status) }),
            m.locales.length > 1 && m.locales.filter((b) => !b.main).map((b) => /* @__PURE__ */ e.jsx(
              t.Badge,
              {
                variant: b.status === "published" ? "default" : "outline",
                className: b.status === null ? "cms:opacity-50" : "",
                title: `${b.code}: ${b.status === null ? "not translated" : W(b.status)}`,
                children: b.code.toUpperCase()
              },
              b.code
            ))
          ] }) }),
          /* @__PURE__ */ e.jsx(t.TableCell, { className: "cms:text-muted-foreground", children: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-2", children: [
            Q(s.dated ? m.publishedAt : m.updatedAt),
            s.ordered && c?.update && !r.trashed && !r.search && /* @__PURE__ */ e.jsxs("span", { className: "cms:flex", children: [
              /* @__PURE__ */ e.jsx(t.Button, { variant: "ghost", size: "icon", "aria-label": `Move ${m.title} up`, onClick: () => f.router.post(N(`cms/entries/${m.id}/move`), { direction: "up" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(K, {}) }),
              /* @__PURE__ */ e.jsx(t.Button, { variant: "ghost", size: "icon", "aria-label": `Move ${m.title} down`, onClick: () => f.router.post(N(`cms/entries/${m.id}/move`), { direction: "down" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(q, {}) })
            ] })
          ] }) })
        ] }, m.id))
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
            onClick: () => l.prev_page_url && f.router.get(l.prev_page_url, {}, { preserveScroll: !0 }),
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
            onClick: () => l.next_page_url && f.router.get(l.next_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(re, {})
          }
        )
      ] })
    ] })
  ] });
}
function ht(s) {
  return /* @__PURE__ */ e.jsx(xt, { ...s }, `${s.locale}:${JSON.stringify(s.values)}`);
}
function xt({ collection: s, fields: a, locale: l, locales: r, shared: c, values: n, can: i }) {
  const u = N(`cms/collections/${s.handle}/listing`), h = N(`cms/collections/${s.handle}/entries`);
  t.useBreadcrumbs([{ label: s.title, href: h }, { label: "Listing page" }]);
  const x = f.useForm({ locale: l, data: n }), p = x.errors, o = r[0], d = i.update, g = () => x.processing || x.put(u, { preserveScroll: !0 });
  return t.useUnsavedChanges(x.isDirty, d ? g : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: (j) => {
    j.preventDefault(), g();
  }, className: "cms:flex cms:max-w-3xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: `${s.title}: listing page` }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(t.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: h, "aria-label": `Back to ${s.title}`, children: /* @__PURE__ */ e.jsx(G, {}) }) }),
        /* @__PURE__ */ e.jsxs("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: [
          s.title,
          ": listing page"
        ] }),
        x.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        r.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: l, onValueChange: (j) => f.router.get(u, { locale: j }), children: [
          /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(t.SelectContent, { children: r.map((j, m) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: j, children: [
            z(j),
            m === 0 ? " (main)" : ""
          ] }, j)) })
        ] }),
        s.url && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: s.url, target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ e.jsx(ie, {}),
          " View"
        ] }) }),
        d && /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", disabled: x.processing, children: [
          x.processing && /* @__PURE__ */ e.jsx(J, { className: "cms:animate-spin" }),
          " Save"
        ] })
      ] })
    ] }),
    a.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The listing page has no fields of its own: choose a listing blueprint for the collection under Structure → Collections." }) : /* @__PURE__ */ e.jsx("fieldset", { disabled: !d, className: "cms:flex cms:flex-col cms:gap-4", children: /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsx(t.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: a.map((j) => c.includes(j.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(A, { id: `data-${j.handle}`, field: j, content: !0, value: n[j.handle], errors: {}, onChange: () => {
      } }),
      /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
        "Shared by all languages: edit it in ",
        o ? z(o) : "the main language",
        "."
      ] })
    ] }, j.handle) : /* @__PURE__ */ e.jsx(
      A,
      {
        id: `data-${j.handle}`,
        field: j,
        content: !0,
        value: x.data.data[j.handle],
        errors: I(p, `data.${j.handle}`),
        onChange: (m) => x.setData("data", { ...x.data.data, [j.handle]: m })
      },
      j.handle
    )) }) }) })
  ] });
}
function pt({ fieldsets: s }) {
  const a = f.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx($, { message: a.fieldset }),
    /* @__PURE__ */ e.jsx(
      is,
      {
        noun: "Fieldset",
        base: N("cms/fieldsets"),
        rows: s,
        intro: "Fields shared between blueprints, and the kinds of block of flexible fields."
      }
    )
  ] });
}
function gt(s) {
  return /* @__PURE__ */ e.jsx(jt, { ...s }, `${s.locale}:${JSON.stringify(s.values)}`);
}
function jt({ set: s, fields: a, locale: l, locales: r, shared: c, values: n, can: i }) {
  const u = N(`cms/globals/${s.handle}`);
  t.useBreadcrumbs([{ label: "Globals", href: N("cms/globals") }, { label: s.title }]);
  const h = f.useForm({ locale: l, data: n }), x = h.errors, p = r[0], o = t.useEditLock({
    type: "cms.global",
    id: s.id,
    locale: l,
    enabled: i.update,
    noun: "global set",
    leaveTo: N("cms/globals"),
    getUnsaved: () => h.isDirty ? { data: h.data.data } : null
  }), d = i.update && !o.readOnly, g = () => h.processing || h.put(u, { preserveScroll: !0 }), j = async (m) => {
    const b = await o.loadKept(m);
    b.data && typeof b.data == "object" && h.setData("data", b.data);
  };
  return t.useUnsavedChanges(h.isDirty && !o.takenOver, d ? g : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: (m) => {
    m.preventDefault(), g();
  }, className: "cms:flex cms:max-w-3xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: s.title }),
    o.dialogs,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(t.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: N("cms/globals"), "aria-label": "Back to globals", children: /* @__PURE__ */ e.jsx(G, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
        h.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        r.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: l, onValueChange: (m) => f.router.get(u, { locale: m }), children: [
          /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(t.SelectContent, { children: r.map((m, b) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: m, children: [
            z(m),
            b === 0 ? " (main)" : ""
          ] }, m)) })
        ] }),
        d && /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", disabled: h.processing, children: [
          h.processing && /* @__PURE__ */ e.jsx(J, { className: "cms:animate-spin" }),
          " Save"
        ] })
      ] })
    ] }),
    a.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "This global set has no fields: choose a blueprint for it under Structure → Global sets." }) : /* @__PURE__ */ e.jsxs("fieldset", { disabled: !d, className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(t.ViewingNotice, { by: o.viewingBy }),
      /* @__PURE__ */ e.jsx(t.KeptEditsNotice, { kept: o.kept, disabled: !d, onLoad: (m) => {
        j(m);
      }, onDiscard: (m) => {
        o.discardKept(m);
      } }),
      /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsx(t.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: a.map((m) => c.includes(m.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(A, { id: `data-${m.handle}`, field: m, content: !0, value: n[m.handle], errors: {}, onChange: () => {
        } }),
        /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
          "Shared by all languages: edit it in ",
          p ? z(p) : "the main language",
          "."
        ] })
      ] }, m.handle) : /* @__PURE__ */ e.jsx(
        A,
        {
          id: `data-${m.handle}`,
          field: m,
          content: !0,
          value: h.data.data[m.handle],
          errors: I(x, `data.${m.handle}`),
          onChange: (b) => h.setData("data", { ...h.data.data, [m.handle]: b })
        },
        m.handle
      )) }) })
    ] })
  ] });
}
function ft({ sets: s }) {
  return t.useBreadcrumbs([{ label: "Globals" }]), /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: "Globals" }),
    /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Globals" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Values the whole site uses, like contact details and footer text." })
    ] }),
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no global sets yet. Create one under Structure → Global sets." }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:sm:grid-cols-2 cms:lg:grid-cols-3", children: s.map((a) => /* @__PURE__ */ e.jsx(f.Link, { href: N(`cms/globals/${a.handle}`), className: "cms:rounded-xl cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none", children: /* @__PURE__ */ e.jsxs(t.Card, { className: "cms:h-full cms:transition-colors cms:hover:bg-accent", children: [
      /* @__PURE__ */ e.jsxs(t.CardHeader, { children: [
        /* @__PURE__ */ e.jsx(t.CardTitle, { className: "cms:text-base", children: a.title }),
        /* @__PURE__ */ e.jsx(t.CardDescription, { children: a.blueprint ? /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: a.handle }) : "No blueprint yet: choose one under Structure → Global sets." })
      ] }),
      /* @__PURE__ */ e.jsx(t.CardContent, {})
    ] }) }, a.handle)) })
  ] });
}
let ds = 0;
function ms(s, a = 0) {
  return s.flatMap(({ children: l, ...r }) => [{ ...r, key: `m${++ds}`, depth: a }, ...ms(l ?? [], a + 1)]);
}
function bt(s) {
  const a = [], l = [{ depth: -1, children: a }];
  for (const { key: r, depth: c, ...n } of s) {
    for (; l.length > 1 && l[l.length - 1].depth >= c; ) l.pop();
    const i = { ...n, children: [] };
    l[l.length - 1].children.push(i), l.push({ depth: c, children: i.children });
  }
  return a;
}
function ee(s, a) {
  const l = s[a]?.depth ?? 0;
  let r = a + 1;
  for (; r < s.length && s[r].depth > l; ) r++;
  return r;
}
function us(s, a, l) {
  const r = ee(s, a);
  return s.map((c, n) => n >= a && n < r ? { ...c, depth: c.depth + l } : c);
}
function vt(s, a, l) {
  const r = s[a], c = s[a - 1];
  return !r || !c || r.depth > c.depth || Math.max(...s.slice(a, ee(s, a)).map((i) => i.depth)) + 1 > l - 1 ? s : us(s, a, 1);
}
function Nt(s, a) {
  return (s[a]?.depth ?? 0) === 0 ? s : us(s, a, -1);
}
function je(s, a, l) {
  const r = s[a];
  if (!r) return s;
  const c = ee(s, a), n = s.slice(a, c);
  if (l === -1) {
    let h = a - 1;
    for (; h >= 0 && s[h].depth > r.depth; ) h--;
    return h < 0 || s[h].depth !== r.depth ? s : [...s.slice(0, h), ...n, ...s.slice(h, a), ...s.slice(c)];
  }
  const i = s[c];
  if (!i || i.depth !== r.depth) return s;
  const u = ee(s, c);
  return [...s.slice(0, a), ...s.slice(c, u), ...n, ...s.slice(u)];
}
function yt(s, a) {
  return [...s.slice(0, a), ...s.slice(ee(s, a))];
}
function fe(s) {
  return { key: `m${++ds}`, depth: 0, entry_id: null, entry: null, url: null, labels: {}, new_tab: !1, ...s };
}
function Ct({ menu: s, items: a, locales: l, limits: r, can: c }) {
  const n = N(`cms/menus/${s.handle}`);
  t.useBreadcrumbs([{ label: "Menus", href: N("cms/menus") }, { label: s.title }]);
  const [i, u] = S.useState(() => ms(a)), [h, x] = S.useState(null), p = f.useForm({ items: a }), o = p.errors, [d, g] = S.useState(!1), j = l[0] ?? "en", m = (w) => {
    u(w), g(!0);
  }, b = (w, v) => m(i.map((k, D) => D === w ? { ...k, ...v } : k)), T = () => {
    p.processing || (p.transform(() => ({ items: bt(i).map(hs) })), p.put(n, { preserveScroll: !0, onSuccess: () => g(!1) }));
  }, y = (w) => {
    w.preventDefault(), T();
  };
  return t.useUnsavedChanges(d, c.update ? T : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: y, className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: s.title }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(t.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: N("cms/menus"), "aria-label": "Back to menus", children: /* @__PURE__ */ e.jsx(G, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
        d && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      c.update && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", disabled: i.length >= r.items, onClick: () => x("entry"), children: [
          /* @__PURE__ */ e.jsx(R, {}),
          " Entry"
        ] }),
        /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", disabled: i.length >= r.items, onClick: () => x("url"), children: [
          /* @__PURE__ */ e.jsx(Ls, {}),
          " Link"
        ] }),
        /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", disabled: p.processing, children: [
          p.processing && /* @__PURE__ */ e.jsx(J, { className: "cms:animate-spin" }),
          " Save"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx($, { message: o.items }),
    Object.keys(o).some((w) => w.startsWith("items.")) && /* @__PURE__ */ e.jsxs("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: [
      "Some links need fixing: ",
      Object.values(o).filter(Boolean)[0]
    ] }),
    /* @__PURE__ */ e.jsx(t.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs("ul", { className: "cms:divide-y", children: [
      i.length === 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-6 cms:text-center cms:text-muted-foreground", children: "No links yet. Add an entry or a link." }),
      i.map((w, v) => /* @__PURE__ */ e.jsxs("li", { className: "cms:flex cms:flex-col cms:gap-2 cms:p-3", style: { paddingLeft: `${0.75 + w.depth * 2}rem` }, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(
            t.Input,
            {
              "aria-label": `Label (${z(j)})`,
              className: "cms:max-w-xs",
              disabled: !c.update,
              placeholder: w.entry?.title ?? "Label",
              value: w.labels[j] ?? "",
              onChange: (k) => b(v, { labels: { ...w.labels, [j]: k.target.value } })
            }
          ),
          /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:text-sm cms:text-muted-foreground", children: w.entry_id !== null ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            w.entry?.collection,
            ": ",
            w.entry?.title ?? `Entry #${w.entry_id}`,
            " ",
            w.entry && !w.entry.live && /* @__PURE__ */ e.jsx(t.Badge, { variant: "outline", children: "Not on the site" })
          ] }) : w.url }),
          c.update && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center", children: [
            /* @__PURE__ */ e.jsxs("label", { className: "cms:mr-2 cms:flex cms:items-center cms:gap-1.5 cms:text-sm", children: [
              /* @__PURE__ */ e.jsx(t.Checkbox, { checked: w.new_tab, onCheckedChange: (k) => b(v, { new_tab: k }) }),
              " New tab"
            ] }),
            /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Out a level", disabled: w.depth === 0, onClick: () => m(Nt(i, v)), children: /* @__PURE__ */ e.jsx(Ms, {}) }),
            /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "In a level", onClick: () => m(vt(i, v, r.depth)), children: /* @__PURE__ */ e.jsx(Is, {}) }),
            /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move up", onClick: () => m(je(i, v, -1)), children: /* @__PURE__ */ e.jsx(K, {}) }),
            /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move down", onClick: () => m(je(i, v, 1)), children: /* @__PURE__ */ e.jsx(q, {}) }),
            /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": "Remove, with what's under it", onClick: () => m(yt(i, v)), children: /* @__PURE__ */ e.jsx(L, {}) })
          ] })
        ] }),
        l.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: l.slice(1).map((k) => /* @__PURE__ */ e.jsx(
          t.Input,
          {
            "aria-label": `Label (${z(k)})`,
            className: "cms:max-w-xs",
            disabled: !c.update,
            placeholder: `${z(k)}: as ${z(j)}`,
            value: w.labels[k] ?? "",
            onChange: (D) => b(v, { labels: { ...w.labels, [k]: D.target.value } })
          },
          k
        )) })
      ] }, w.key))
    ] }) }),
    /* @__PURE__ */ e.jsx(kt, { kind: h, onClose: () => x(null), onAdd: (w) => {
      m([...i, w]), x(null);
    }, main: j })
  ] });
}
function hs({ entry: s, children: a, ...l }) {
  return { ...l, children: a.map(hs) };
}
function kt({ kind: s, onClose: a, onAdd: l, main: r }) {
  const [c, n] = S.useState(null), [i, u] = S.useState(""), [h, x] = S.useState("");
  S.useEffect(() => {
    n(null), u(""), x("");
  }, [s]);
  const p = i.trim() === "" || Gs(i.trim()), o = async () => {
    if (s === "entry" && c !== null) {
      const d = await fetch(`${N("cms/entry-picker")}?${ns({ ids: [c], collections: [] })}`, { headers: { Accept: "application/json" }, credentials: "same-origin" }), g = d.ok ? (await d.json()).items[0] : void 0;
      l(fe({ entry_id: c, entry: g ? { title: g.title, collection: g.collection, live: g.status === "published" } : null, labels: h ? { [r]: h } : {} }));
    } else s === "url" && i.trim() !== "" && p && h.trim() !== "" && l(fe({ url: i.trim(), labels: { [r]: h.trim() } }));
  };
  return /* @__PURE__ */ e.jsx(t.Dialog, { open: s !== null, onOpenChange: (d) => !d && a(), children: /* @__PURE__ */ e.jsxs(t.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(t.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(t.DialogTitle, { children: s === "entry" ? "Link to an entry" : "Link to an address" }),
      /* @__PURE__ */ e.jsx(t.DialogDescription, { children: s === "entry" ? "It follows the entry: its title (unless you give a label) and its address in each language. It shows only while the entry is on the site." : "A web address, a path on this site (/contact), mailto: or tel:." })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
      s === "entry" ? /* @__PURE__ */ e.jsx(
        oe,
        {
          id: "menu-entry",
          value: c,
          multiple: !1,
          max: null,
          collections: [],
          invalid: !1,
          onChange: (d) => n(typeof d == "number" ? d : null)
        }
      ) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "menu-url", children: "Address" }),
        /* @__PURE__ */ e.jsx(
          t.Input,
          {
            id: "menu-url",
            value: i,
            placeholder: "https://… or /contact",
            "aria-invalid": !p,
            onChange: (d) => u(d.target.value)
          }
        ),
        !p && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "This address could run code; use https://, a path, mailto: or tel:." })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(t.Label, { htmlFor: "menu-label", children: [
          "Label",
          s === "entry" ? " (optional)" : ""
        ] }),
        /* @__PURE__ */ e.jsx(t.Input, { id: "menu-label", value: h, onChange: (d) => x(d.target.value) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(t.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "outline", onClick: a, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(
        t.Button,
        {
          type: "button",
          onClick: () => {
            o();
          },
          disabled: s === "entry" ? c === null : i.trim() === "" || !p || h.trim() === "",
          children: "Add"
        }
      )
    ] })
  ] }) });
}
function wt({ menus: s }) {
  return t.useBreadcrumbs([{ label: "Menus" }]), /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: "Menus" }),
    /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Menus" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Navigation for the site: the main menu, the footer…" })
    ] }),
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no menus yet. Create one under Structure → Menus." }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:sm:grid-cols-2 cms:lg:grid-cols-3", children: s.map((a) => /* @__PURE__ */ e.jsx(f.Link, { href: N(`cms/menus/${a.handle}`), className: "cms:rounded-xl cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none", children: /* @__PURE__ */ e.jsxs(t.Card, { className: "cms:h-full cms:transition-colors cms:hover:bg-accent", children: [
      /* @__PURE__ */ e.jsxs(t.CardHeader, { children: [
        /* @__PURE__ */ e.jsx(t.CardTitle, { className: "cms:text-base", children: a.title }),
        /* @__PURE__ */ e.jsx(t.CardDescription, { children: /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: a.handle }) })
      ] }),
      /* @__PURE__ */ e.jsx(t.CardContent, {})
    ] }) }, a.handle)) })
  ] });
}
const St = 3;
function $t({ form: s, forms: a, submissions: l, can: r }) {
  t.useBreadcrumbs([{ label: "Submissions", href: N("cms/submissions") }, ...s ? [{ label: s.title }] : []]);
  const [c, n] = S.useState(null), [i, u] = Z();
  if (!s || !l)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(f.Head, { title: "Submissions" }),
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Submissions" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no forms yet. Create one under Structure → Forms and put it on a page; what visitors send shows up here." })
    ] });
  const h = (l.data[0]?.rows ?? []).slice(0, St), x = (p) => i(
    "Delete this submission for good? It can't be restored.",
    () => f.router.delete(N(`cms/submissions/${p.id}`), { preserveScroll: !0, onSuccess: () => n(null) })
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: `${s.title} submissions` }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
        a.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: s.handle, onValueChange: (p) => f.router.get(N(`cms/forms/${p}/submissions`)), children: [
          /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-56", "aria-label": "Form", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(t.SelectContent, { children: a.map((p) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: p.handle, children: [
            p.title,
            " (",
            p.count,
            ")"
          ] }, p.handle)) })
        ] })
      ] }),
      l.total > 0 && /* @__PURE__ */ e.jsx(t.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: N(`cms/forms/${s.handle}/submissions/export`), children: [
        /* @__PURE__ */ e.jsx(Ie, {}),
        " Export CSV"
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsx(t.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(t.Table, { children: [
      /* @__PURE__ */ e.jsx(t.TableHeader, { children: /* @__PURE__ */ e.jsxs(t.TableRow, { children: [
        /* @__PURE__ */ e.jsx(t.TableHead, { children: "Sent" }),
        h.map((p) => /* @__PURE__ */ e.jsx(t.TableHead, { children: p.label }, p.handle))
      ] }) }),
      /* @__PURE__ */ e.jsxs(t.TableBody, { children: [
        l.data.length === 0 && /* @__PURE__ */ e.jsx(t.TableRow, { children: /* @__PURE__ */ e.jsx(t.TableCell, { colSpan: h.length + 1, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: "Nothing sent yet." }) }),
        l.data.map((p) => /* @__PURE__ */ e.jsxs(t.TableRow, { children: [
          /* @__PURE__ */ e.jsx(t.TableCell, { className: "cms:whitespace-nowrap", children: /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:font-medium cms:hover:underline", onClick: () => n(p), children: Q(p.createdAt) }) }),
          h.map((o) => /* @__PURE__ */ e.jsx(t.TableCell, { className: "cms:max-w-64 cms:truncate", children: p.rows.find((d) => d.handle === o.handle)?.value }, o.handle))
        ] }, p.id))
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
            onClick: () => l.prev_page_url && f.router.get(l.prev_page_url, {}, { preserveScroll: !0 }),
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
            onClick: () => l.next_page_url && f.router.get(l.next_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(re, {})
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(t.Dialog, { open: c !== null, onOpenChange: (p) => !p && n(null), children: /* @__PURE__ */ e.jsxs(t.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto", children: [
      /* @__PURE__ */ e.jsxs(t.DialogHeader, { children: [
        /* @__PURE__ */ e.jsx(t.DialogTitle, { children: s.title }),
        /* @__PURE__ */ e.jsxs(t.DialogDescription, { children: [
          "Sent ",
          Q(c?.createdAt ?? null),
          " · ",
          c?.locale.toUpperCase()
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-3 cms:text-sm", children: c?.rows.map((p) => /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: p.label }),
        /* @__PURE__ */ e.jsx("dd", { className: "cms:whitespace-pre-wrap cms:break-words cms:text-muted-foreground", children: p.file ? /* @__PURE__ */ e.jsx("a", { href: p.file, className: "cms:underline cms:underline-offset-4 hover:cms:text-foreground", download: !0, children: p.value }) : p.value || "—" })
      ] }, p.handle)) }),
      r.delete && c && /* @__PURE__ */ e.jsx(t.DialogFooter, { children: /* @__PURE__ */ e.jsxs(t.Button, { variant: "destructive", onClick: () => x(c), children: [
        /* @__PURE__ */ e.jsx(L, {}),
        " Delete"
      ] }) })
    ] }) }),
    u
  ] });
}
function Dt(s) {
  return /* @__PURE__ */ e.jsx(_t, { ...s }, `${s.locale}:${JSON.stringify([s.values, s.seo, s.term.template])}`);
}
function _t({ taxonomy: s, term: a, translated: l, fields: r, locale: c, locales: n, shared: i, sharedValues: u, values: h, seo: x }) {
  const p = N(`cms/taxonomies/${s.handle}/terms`), o = N(`cms/terms/${a.id}/content`);
  t.useBreadcrumbs([{ label: s.title, href: `${p}?locale=${c}` }, { label: a.title }]);
  const d = f.useForm({ locale: c, data: h, seo: x ?? {}, template: a.template ?? "" }), g = d.errors, j = () => d.processing || d.put(o, { preserveScroll: !0 });
  return t.useUnsavedChanges(d.isDirty, l ? j : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: (m) => {
    m.preventDefault(), j();
  }, className: "cms:flex cms:max-w-3xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: a.title }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(t.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: `${p}?locale=${c}`, "aria-label": `Back to ${s.title}`, children: /* @__PURE__ */ e.jsx(G, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: a.title }),
        d.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        a.url && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: a.url, target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ e.jsx(ie, {}),
          " View"
        ] }) }),
        n.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: c, onValueChange: (m) => f.router.get(N(`cms/terms/${a.id}/edit`), { locale: m }), children: [
          /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(t.SelectContent, { children: n.map((m, b) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: m, children: [
            z(m),
            b === 0 ? " (main)" : ""
          ] }, m)) })
        ] }),
        l && /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", disabled: d.processing, children: [
          d.processing && /* @__PURE__ */ e.jsx(J, { className: "cms:animate-spin" }),
          " Save"
        ] })
      ] })
    ] }),
    l ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      r.length > 0 && /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsx(t.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: r.map((m) => i.includes(m.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(A, { id: `data-${m.handle}`, field: m, content: !0, value: u[m.handle], errors: {}, onChange: () => {
        } }),
        /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
          "Shared by all languages: edit it in ",
          z(n[0] ?? "en"),
          "."
        ] })
      ] }, m.handle) : /* @__PURE__ */ e.jsx(
        A,
        {
          id: `data-${m.handle}`,
          field: m,
          content: !0,
          value: d.data.data[m.handle],
          errors: I(g, `data.${m.handle}`),
          onChange: (b) => d.setData("data", { ...d.data.data, [m.handle]: b })
        },
        m.handle
      )) }) }),
      /* @__PURE__ */ e.jsxs(t.Card, { children: [
        /* @__PURE__ */ e.jsx(t.CardHeader, { children: /* @__PURE__ */ e.jsx(t.CardTitle, { className: "cms:text-base", children: "Search and sharing" }) }),
        /* @__PURE__ */ e.jsx(t.CardContent, { children: /* @__PURE__ */ e.jsx(se, { id: "seo", fields: os, value: d.data.seo, errors: I(g, "seo"), onChange: (m) => d.setData("seo", m) }) })
      ] }),
      /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsxs(t.CardContent, { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "template", children: "Template" }),
        /* @__PURE__ */ e.jsx(
          t.Input,
          {
            id: "template",
            className: "cms:font-mono",
            placeholder: "The taxonomy's",
            value: d.data.template,
            onChange: (m) => d.setData("template", m.target.value),
            "aria-invalid": g.template !== void 0
          }
        ),
        /* @__PURE__ */ e.jsx($, { message: g.template })
      ] }) })
    ] }) : /* @__PURE__ */ e.jsxs("p", { className: "cms:text-muted-foreground", children: [
      "This term has no title in ",
      z(c),
      " yet: give it one in the list first."
    ] })
  ] });
}
const ne = "__top";
function Tt({ taxonomy: s, taxonomies: a, terms: l, locales: r, locale: c, trashed: n = !1 }) {
  t.useBreadcrumbs([{ label: "Terms", href: N("cms/terms") }, ...s ? [{ label: s.title }] : []]);
  const [i, u] = Z(), [h, x] = S.useState(null);
  if (!s)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(f.Head, { title: "Terms" }),
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Terms" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no taxonomies yet. Create one under Structure → Taxonomies (categories, tags…), then add its terms here." })
    ] });
  const p = N(`cms/taxonomies/${s.handle}/terms`);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: s.title }),
    u,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
      a.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: s.handle, onValueChange: (o) => f.router.get(N(`cms/taxonomies/${o}/terms`)), children: [
        /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Taxonomy", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(t.SelectContent, { children: a.map((o) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: o.handle, children: o.title }, o.handle)) })
      ] }),
      /* @__PURE__ */ e.jsx(t.Button, { variant: n ? "secondary" : "ghost", size: "sm", className: "cms:ml-auto", onClick: () => f.router.get(p, { locale: c, ...n ? {} : { trashed: 1 } }), children: n ? "Back to terms" : "Trash" }),
      r.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: c, onValueChange: (o) => f.router.get(p, { locale: o, ...n ? { trashed: 1 } : {} }), children: [
        /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(t.SelectContent, { children: r.map((o) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: o, children: z(o) }, o)) })
      ] })
    ] }),
    !n && /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsx(t.CardContent, { children: /* @__PURE__ */ e.jsx(
      be,
      {
        action: p,
        method: "post",
        locale: c,
        terms: l,
        hierarchical: s.hierarchical,
        submitLabel: "Add term"
      },
      `new-${l.length}`
    ) }) }),
    /* @__PURE__ */ e.jsx(t.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs("ul", { className: "cms:divide-y", children: [
      l.length === 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-6 cms:text-center cms:text-muted-foreground", children: n ? "The trash is empty." : "No terms yet." }),
      l.map((o) => {
        const d = l.filter((j) => j.parentId === o.parentId), g = d.findIndex((j) => j.id === o.id);
        return /* @__PURE__ */ e.jsx("li", { className: "cms:p-3", style: { paddingLeft: `${0.75 + o.depth * 1.5}rem` }, children: n ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
          /* @__PURE__ */ e.jsx("span", { className: "cms:flex-1 cms:font-medium", children: o.title ?? o.fallback }),
          /* @__PURE__ */ e.jsxs(t.Button, { variant: "outline", size: "sm", onClick: () => f.router.post(N(`cms/terms/${o.id}/restore`), {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(Ge, {}),
            " Restore"
          ] }),
          /* @__PURE__ */ e.jsxs(
            t.Button,
            {
              variant: "ghost",
              size: "sm",
              className: "cms:text-destructive",
              onClick: () => i(
                `Delete "${o.fallback}" for good, in every language? Entries lose it.`,
                () => f.router.delete(N(`cms/terms/${o.id}/force`), { preserveScroll: !0 })
              ),
              children: [
                /* @__PURE__ */ e.jsx(L, {}),
                " Delete for good"
              ]
            }
          )
        ] }) : h === o.id ? /* @__PURE__ */ e.jsx(
          be,
          {
            action: N(`cms/terms/${o.id}`),
            method: "put",
            locale: c,
            terms: l,
            hierarchical: s.hierarchical,
            term: o,
            submitLabel: "Save",
            onDone: () => x(null)
          }
        ) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0 cms:flex-1", children: [
            o.title !== null ? /* @__PURE__ */ e.jsx("span", { className: "cms:font-medium", children: o.title }) : /* @__PURE__ */ e.jsxs("span", { className: "cms:text-muted-foreground cms:italic", children: [
              o.fallback,
              " · not translated"
            ] }),
            o.slug && /* @__PURE__ */ e.jsxs("span", { className: "cms:ml-2 cms:text-xs cms:text-muted-foreground", children: [
              "/",
              o.slug
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(
            t.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-label": `Move ${o.fallback} up`,
              disabled: g === 0,
              onClick: () => f.router.post(N(`cms/terms/${o.id}/move`), { direction: "up" }, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(K, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            t.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-label": `Move ${o.fallback} down`,
              disabled: g === d.length - 1,
              onClick: () => f.router.post(N(`cms/terms/${o.id}/move`), { direction: "down" }, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(q, {})
            }
          ),
          /* @__PURE__ */ e.jsx(t.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Rename ${o.fallback}`, onClick: () => x(o.id), children: /* @__PURE__ */ e.jsx(As, {}) }),
          s.pages && o.title !== null && /* @__PURE__ */ e.jsx(t.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Edit ${o.fallback}'s page`, asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: N(`cms/terms/${o.id}/edit`) + `?locale=${c}`, children: /* @__PURE__ */ e.jsx(Bs, {}) }) }),
          /* @__PURE__ */ e.jsx(
            t.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Move ${o.fallback} to the trash`,
              onClick: () => i(
                `Move "${o.fallback}" to the trash, with the terms under it? It comes off the site; you can restore it.`,
                () => f.router.delete(N(`cms/terms/${o.id}`), { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(L, {})
            }
          )
        ] }) }, o.id);
      })
    ] }) })
  ] });
}
function be({ action: s, method: a, locale: l, terms: r, hierarchical: c, term: n, submitLabel: i, onDone: u }) {
  const h = f.useForm({ title: n?.title ?? "", slug: n?.slug ?? "", parent_id: n?.parentId ?? null, locale: l }), x = h.errors, p = /* @__PURE__ */ new Set();
  if (n) {
    p.add(n.id);
    const g = r.findIndex((j) => j.id === n.id);
    for (let j = g + 1; j < r.length && (r[j]?.depth ?? 0) > n.depth; j++) p.add(r[j].id);
  }
  const o = (g) => {
    g.preventDefault(), h.submit(a, s, { preserveScroll: !0, onSuccess: () => {
      a === "post" && h.reset("title", "slug"), u?.();
    } });
  }, d = n ? `term-${n.id}` : "new-term";
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: o, className: "cms:grid cms:items-start cms:gap-3 cms:md:grid-cols-[2fr_1.5fr_1.5fr_auto]", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${d}-title`, className: n ? "cms:sr-only" : "", children: "Title" }),
      /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: `${d}-title`,
          value: h.data.title,
          placeholder: n?.fallback,
          required: !0,
          onChange: (g) => h.setData("title", g.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx($, { message: x.title })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${d}-slug`, className: n ? "cms:sr-only" : "", children: "Slug" }),
      /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: `${d}-slug`,
          className: "cms:font-mono",
          value: h.data.slug,
          placeholder: "Made from the title",
          onChange: (g) => h.setData("slug", g.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx($, { message: x.slug })
    ] }),
    c ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${d}-parent`, className: n ? "cms:sr-only" : "", children: "Under" }),
      /* @__PURE__ */ e.jsxs(
        t.Select,
        {
          value: h.data.parent_id === null ? ne : String(h.data.parent_id),
          onValueChange: (g) => h.setData("parent_id", g === ne ? null : Number(g)),
          children: [
            /* @__PURE__ */ e.jsx(t.SelectTrigger, { id: `${d}-parent`, children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(t.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(t.SelectItem, { value: ne, children: "Top level" }),
              r.filter((g) => !p.has(g.id)).map((g) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: String(g.id), children: [
                "— ".repeat(g.depth),
                g.title ?? g.fallback
              ] }, g.id))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ e.jsx($, { message: x.parent_id })
    ] }) : /* @__PURE__ */ e.jsx("div", {}),
    /* @__PURE__ */ e.jsxs("div", { className: `cms:flex cms:gap-2 ${n ? "" : "cms:md:mt-6"}`, children: [
      /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", disabled: h.processing, children: [
        !n && /* @__PURE__ */ e.jsx(R, {}),
        " ",
        i
      ] }),
      u && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", onClick: u, children: "Cancel" })
    ] })
  ] });
}
js({
  pages: {
    "Cms/Blueprints/Index": ct,
    "Cms/Blueprints/Form": nt,
    "Cms/Fieldsets/Index": pt,
    "Cms/Entries/Index": ut,
    "Cms/Entries/Editor": rt,
    "Cms/Entries/Listing": ht,
    "Cms/Terms/Index": Tt,
    "Cms/Terms/Edit": Dt,
    "Cms/Globals/Index": ft,
    "Cms/Globals/Edit": gt,
    "Cms/Menus/Index": wt,
    "Cms/Menus/Edit": Ct,
    "Cms/Submissions/Index": $t
  }
});
export {
  Ls as L,
  S as R,
  Es as U,
  Bt as _,
  N as a,
  _ as c,
  Gs as i,
  e as j,
  t as u
};
