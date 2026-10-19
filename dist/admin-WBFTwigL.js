function hs(s, a) {
  for (var l = 0; l < a.length; l++) {
    const c = a[l];
    if (typeof c != "string" && !Array.isArray(c)) {
      for (const r in c)
        if (r !== "default" && !(r in s)) {
          const n = Object.getOwnPropertyDescriptor(c, r);
          n && Object.defineProperty(s, r, n.get ? n : {
            enumerable: !0,
            get: () => c[r]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(s, Symbol.toStringTag, { value: "Module" }));
}
const de = 1;
function be() {
  const s = globalThis.Sunrice;
  if (!s)
    throw new Error("[sunrice] This script runs outside the Sunrice admin panel (window.Sunrice is missing).");
  return s;
}
function xs(s) {
  const a = be();
  if (a.version !== de)
    throw new Error(`[sunrice] This plugin was built for admin runtime ${de}, but the panel runs ${a.version}. Rebuild it with a matching @sunrice/admin-sdk.`);
  for (const [l, c] of Object.entries(s.pages ?? {}))
    a.registerPage(l, c);
}
function w(s = "") {
  return be().adminUrl(s);
}
const ve = globalThis.Sunrice;
if (!ve) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const e = ve.modules["react/jsx-runtime"], Ne = globalThis.Sunrice;
if (!Ne) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const S = Ne.modules.react, $t = /* @__PURE__ */ hs({
  __proto__: null
}, [S]), ye = globalThis.Sunrice;
if (!ye) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const f = ye.modules["@inertiajs/react"];
const ps = (s) => s?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
function gs(s, a, l = []) {
  if (a == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: ps(s),
    size: 24,
    node: a,
    ...l.length > 0 ? { aliases: l } : {}
  };
}
const js = (s) => {
  let a = "", l = !1;
  for (const c of s) {
    if (c === "-" || c === "_" || c <= " ") {
      l = a.length > 0;
      continue;
    }
    a.length === 0 ? a += c.toLowerCase() : a += l ? c.toUpperCase() : c, l = !1;
  }
  return a;
};
const fs = (s) => {
  const a = js(s);
  return a.charAt(0).toUpperCase() + a.slice(1);
};
const ce = (...s) => s.filter((a, l, c) => !!a && a.trim() !== "" && c.indexOf(a) === l).join(" ").trim();
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
function bs(s, a = {}) {
  const l = a.attributeNames ?? {}, c = (m) => l[m] ?? m, r = s.size ?? s.width ?? P.width, n = s.size ?? s.height ?? P.height, i = s.aliases?.filter((m) => typeof m == "string" && m.trim() !== "").map((m) => `lucide-${m}`) ?? [], u = [...s.name ? [`lucide-${s.name}`] : [], ...i], d = a.className?.split(" ").filter(Boolean) ?? [], x = a.includeDefaultClasses === !1 ? ce(...d) : ce("lucide", ...u, ...d), o = a.absoluteStrokeWidth ? Number(a.strokeWidth ?? P["stroke-width"]) * Number(s.size ?? s.width ?? P.width) / Number(a.size ?? a.width ?? P.width) : a.strokeWidth ?? P["stroke-width"];
  return [
    "svg",
    {
      ...Object.entries(P).reduce((m, [g, j]) => (m[c(g)] = j, m), {}),
      ..."color" in a && a.color && {
        [c("stroke")]: a.color
      },
      ..."size" in a && ae(a.size) && {
        [c("width")]: a.size,
        [c("height")]: a.size
      },
      ..."width" in a && ae(a.width) && {
        [c("width")]: a.width
      },
      ..."height" in a && ae(a.height) && {
        [c("height")]: a.height
      },
      [c("stroke-width")]: o,
      ...x && {
        [c("class")]: x
      },
      [c("viewBox")]: `0 0 ${r} ${n}`,
      ...a.hasA11yProp === !1 ? {
        [c("aria-hidden")]: "true"
      } : {},
      ..."attributes" in a && a.attributes
    },
    s.node.map((m) => {
      const [g, j, h] = m, v = a.nonScalingStroke ? { [c("vector-effect")]: "non-scaling-stroke", ...j } : j;
      return h ? [g, v, h] : [g, v];
    })
  ];
}
function vs(s, a = {}) {
  return bs(s, {
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
const Ns = (s) => {
  for (const a in s)
    if (a.startsWith("aria-") || a === "role" || a === "title")
      return !0;
  return !1;
}, ys = S.createContext({}), Cs = () => S.useContext(ys), ks = S.forwardRef(
  ({
    color: s,
    size: a,
    width: l,
    height: c,
    strokeWidth: r,
    absoluteStrokeWidth: n,
    nonScalingStroke: i,
    className: u = "",
    children: d,
    iconNode: x = [],
    icon: o = {
      node: x,
      aliases: [],
      size: 24
    },
    ...p
  }, m) => {
    const {
      size: g = 24,
      strokeWidth: j = 2,
      absoluteStrokeWidth: h = !1,
      nonScalingStroke: v = !1,
      color: T = "currentColor",
      className: N = ""
    } = Cs() ?? {}, k = !!d || Ns(p), [b, C, $ = []] = vs(o, {
      color: s ?? T,
      width: l ?? a ?? g,
      height: c ?? a ?? g,
      strokeWidth: r ?? j,
      absoluteStrokeWidth: n ?? h,
      nonScalingStroke: i ?? v,
      className: ce(N, u),
      hasA11yProp: k,
      attributes: p
    });
    return S.createElement(
      b,
      {
        ref: m,
        ...C
      },
      [
        ...$.map(([B, L]) => S.createElement(B, L)),
        ...Array.isArray(d) ? d : [d]
      ]
    );
  }
);
function _(s, a = [], l = []) {
  const c = typeof s == "string" ? gs(s, a, l) : s, r = S.forwardRef(
    ({ className: n, ...i }, u) => S.createElement(ks, {
      ref: u,
      icon: c,
      className: n,
      ...i
    })
  );
  return c.name && (r.displayName = fs(c.name)), r;
}
const Ce = {
  name: "arrow-down",
  size: 24,
  node: [
    ["path", { d: "M12 5v14", key: "s699le" }],
    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
  ]
};
Ce.node;
const q = _(Ce);
const ke = {
  name: "arrow-left",
  size: 24,
  node: [
    ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
    ["path", { d: "M19 12H5", key: "x3x0zl" }]
  ]
};
ke.node;
const Q = _(ke);
const we = {
  name: "arrow-up",
  size: 24,
  node: [
    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
    ["path", { d: "M12 19V5", key: "x0mq9r" }]
  ]
};
we.node;
const G = _(we);
const Se = {
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
Se.node;
const ws = _(Se);
const $e = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
$e.node;
const De = _($e);
const _e = {
  name: "chevron-left",
  size: 24,
  node: [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]]
};
_e.node;
const Te = _(_e);
const Be = {
  name: "chevron-right",
  size: 24,
  node: [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]
};
Be.node;
const re = _(Be);
const ze = {
  name: "copy",
  size: 24,
  node: [
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
  ]
};
ze.node;
const Ss = _(ze);
const Le = {
  name: "download",
  size: 24,
  node: [
    ["path", { d: "M12 15V3", key: "m9g1x1" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
  ]
};
Le.node;
const Me = _(Le);
const Ie = {
  name: "external-link",
  size: 24,
  node: [
    ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
    ["path", { d: "M10 14 21 3", key: "gplh6r" }],
    ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
  ]
};
Ie.node;
const Ae = _(Ie);
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
const $s = _(Ee);
const Fe = {
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
Fe.node;
const Ds = _(Fe);
const He = {
  name: "link-2",
  size: 24,
  node: [
    ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
    ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
    ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
  ]
};
He.node;
const _s = _(He);
const Re = {
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
Re.node;
const Ts = _(Re);
const Oe = {
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
Oe.node;
const Bs = _(Oe);
const Pe = {
  name: "loader-circle",
  size: 24,
  node: [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  aliases: ["loader-2"]
};
Pe.node;
const ee = _(Pe);
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
const zs = _(Ue);
const Ve = {
  name: "plus",
  size: 24,
  node: [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ]
};
Ve.node;
const R = _(Ve);
const We = {
  name: "rotate-ccw",
  size: 24,
  node: [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ]
};
We.node;
const Ls = _(We);
const qe = {
  name: "search",
  size: 24,
  node: [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ]
};
qe.node;
const Ge = _(qe);
const Ke = {
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
Ke.node;
const M = _(Ke);
const Je = {
  name: "undo-2",
  size: 24,
  node: [
    ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
    ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
  ]
};
Je.node;
const Ms = _(Je);
const Ze = {
  name: "x",
  size: 24,
  node: [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]
};
Ze.node;
const Is = _(Ze), Xe = globalThis.Sunrice;
if (!Xe) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const t = Xe.modules["@sunrice/admin-sdk/ui"];
function K() {
  const [s, a] = S.useState(null), l = /* @__PURE__ */ e.jsx(t.Dialog, { open: s !== null, onOpenChange: (c) => !c && a(null), children: /* @__PURE__ */ e.jsxs(t.DialogContent, { children: [
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
  return [(c, r) => a({ message: c, onConfirm: r }), l];
}
const As = 5;
let Es = 0;
const Ye = () => `f${++Es}`;
function Qe(s) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function es(s, a) {
  const l = new Set(a.map((n) => n.handle)), c = Qe(s) || "field";
  let r = c;
  for (let n = 2; l.has(r); n++)
    r = `${c}_${n}`;
  return r;
}
function ss(s) {
  return (s ?? []).map(({ fields: a, ...l }) => ({
    ...l,
    key: Ye(),
    fields: ss(a),
    handleTouched: !0
  }));
}
function ts(s, a) {
  return s.map(({ key: l, handleTouched: c, fields: r, ...n }) => ({
    ...n,
    validation: (n.validation ?? []).map((i) => i.trim()).filter((i) => i !== ""),
    ...a(n.type) ? { fields: ts(r, a) } : {}
  }));
}
function Fs(s, a, l) {
  return { key: Ye(), type: s, label: a, handle: es(a, l), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function V(s, a, l) {
  const c = a + l;
  if (a < 0 || a >= s.length || c < 0 || c >= s.length) return s;
  const r = s.slice(), [n] = r.splice(a, 1);
  return r.splice(c, 0, n), r;
}
function Hs(s, a, l) {
  if (s.handleTouched) return { ...s, label: a };
  const c = l.filter((r) => r.key !== s.key);
  return { ...s, label: a, handle: es(a || s.type, c) };
}
function se(s, a) {
  const l = `${a}.`, c = {};
  for (const [r, n] of Object.entries(s))
    r.startsWith(l) && (c[r.slice(l.length)] = n);
  return c;
}
function F(s, a) {
  const l = s[a];
  return { ...se(s, a), ...l !== void 0 ? { "": l } : {} };
}
function me(s, a) {
  return Object.keys(s).some((l) => l === a || l.startsWith(`${a}.`));
}
function Z(s) {
  return s && typeof s == "object" && !Array.isArray(s) ? s : {};
}
function Rs(s, a) {
  if (typeof s != "string" || s === "") return "";
  const l = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(s);
  return l ? a ? `${l[1]}T${l[2] ?? "00:00"}` : l[1] ?? "" : "";
}
function Os(s) {
  return s === "" ? null : s;
}
function Ps() {
  return { _hidden: !1 };
}
function Us(s) {
  return { type: s, hidden: !1, values: {} };
}
function Vs(s) {
  const a = s.replace(/[\u0000- \u007f]+/g, ""), l = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(a);
  return l ? ["http", "https", "mailto", "tel"].includes(l[1].toLowerCase()) : !a.includes("\\");
}
function as({ ids: s, search: a, collections: l }) {
  const c = new URLSearchParams();
  for (const r of s ?? []) c.append("ids[]", String(r));
  a && c.set("search", a);
  for (const r of l) c.append("collections[]", r);
  return c.toString();
}
function W(s) {
  return { draft: "Draft", scheduled: "Scheduled", published: "Published" }[s];
}
function X(s, a) {
  if (!s) return "—";
  const l = new Date(s);
  return Number.isNaN(l.getTime()) ? "—" : l.toLocaleString(a, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
function Ws(s) {
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
async function ue(s) {
  const a = await fetch(`${w("cms/entry-picker")}?${as(s)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!a.ok) throw new Error(String(a.status));
  return (await a.json()).items;
}
function ie({ id: s, value: a, multiple: l, max: c, collections: r, invalid: n, onChange: i }) {
  const u = a === null ? [] : Array.isArray(a) ? a : [a], [d, x] = S.useState({}), [o, p] = S.useState(""), [m, g] = S.useState(null), [j, h] = S.useState(!1), v = l && c !== null && u.length >= c, T = u.filter((b) => !d[b]).join(",");
  S.useEffect(() => {
    T !== "" && ue({ ids: T.split(",").map(Number), collections: r }).then((b) => x((C) => ({ ...C, ...Object.fromEntries(b.map(($) => [$.id, $])) }))).catch(() => h(!0));
  }, [T]), S.useEffect(() => {
    if (o.trim() === "") {
      g(null);
      return;
    }
    const b = window.setTimeout(() => {
      ue({ search: o.trim(), collections: r }).then((C) => {
        g(C), h(!1);
      }).catch(() => h(!0));
    }, 250);
    return () => window.clearTimeout(b);
  }, [o]);
  const N = (b) => {
    x((C) => ({ ...C, [b.id]: b })), i(l ? [...u, b.id] : b.id), p("");
  }, k = (b) => i(l ? b : b[0] ?? null);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    u.length > 0 && /* @__PURE__ */ e.jsx("ul", { className: "cms:flex cms:flex-col cms:gap-1", children: u.map((b, C) => {
      const $ = d[b];
      return /* @__PURE__ */ e.jsxs("li", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-md cms:border cms:px-3 cms:py-1.5 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate", children: $ ? $.title : `Entry #${b}` }),
        $ && /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: $.collection }),
        $ && /* @__PURE__ */ e.jsx(t.Badge, { variant: $.status === "published" ? "default" : "secondary", children: W($.status) }),
        l && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(
            t.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-7",
              "aria-label": `Move ${$?.title ?? b} up`,
              disabled: C === 0,
              onClick: () => k(V(u, C, -1)),
              children: /* @__PURE__ */ e.jsx(G, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            t.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-7",
              "aria-label": `Move ${$?.title ?? b} down`,
              disabled: C === u.length - 1,
              onClick: () => k(V(u, C, 1)),
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
            "aria-label": `Remove ${$?.title ?? b}`,
            onClick: () => k(u.filter((B) => B !== b)),
            children: /* @__PURE__ */ e.jsx(Is, {})
          }
        )
      ] }, b);
    }) }),
    !v && (l || u.length === 0) && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-md", children: [
      /* @__PURE__ */ e.jsx(Ge, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
      /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: s,
          className: "cms:pl-9",
          placeholder: "Search entries by title",
          "aria-invalid": n,
          value: o,
          autoComplete: "off",
          onChange: (b) => p(b.target.value)
        }
      ),
      m !== null && /* @__PURE__ */ e.jsxs("ul", { role: "listbox", "aria-label": "Matching entries", className: "cms:absolute cms:z-10 cms:mt-1 cms:max-h-64 cms:w-full cms:overflow-auto cms:rounded-md cms:border cms:bg-card cms:p-1 cms:shadow-md", children: [
        m.filter((b) => !u.includes(b.id)).length === 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: "No entries match." }),
        m.filter((b) => !u.includes(b.id)).map((b) => /* @__PURE__ */ e.jsx("li", { role: "option", "aria-selected": !1, children: /* @__PURE__ */ e.jsxs(
          "button",
          {
            type: "button",
            className: "cms:flex cms:w-full cms:items-center cms:gap-2 cms:rounded cms:px-2 cms:py-1.5 cms:text-left cms:text-sm cms:hover:bg-accent",
            onClick: () => N(b),
            children: [
              /* @__PURE__ */ e.jsx("span", { className: "cms:flex-1 cms:truncate", children: b.title }),
              /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: b.collection })
            ]
          }
        ) }, b.id))
      ] })
    ] }),
    j && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "Entries could not be loaded. Try again." })
  ] });
}
const qs = S.lazy(() => import("./RichTextEditor-DAcVFVCB.js").then((s) => ({ default: s.RichTextEditor }))), le = "__none";
function D({ message: s }) {
  return s ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: s }) : null;
}
function he(s) {
  const a = s.config?.options;
  return Array.isArray(a) ? a.flatMap((l) => {
    if (typeof l == "string") return [{ value: l, label: l }];
    if (l && typeof l == "object" && typeof l.value == "string") {
      const { value: c, label: r } = l;
      return [{ value: c, label: r || c }];
    }
    return [];
  }) : [];
}
const Gs = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function Ks(s) {
  if (s.label) return s.label;
  const a = s.handle.replace(/_/g, " ");
  return a.charAt(0).toUpperCase() + a.slice(1);
}
function H({ field: s, value: a, onChange: l, errors: c, id: r, content: n = !1 }) {
  const i = Ks(s), u = Gs.includes(s.type) || ["select", "terms"].includes(s.type) && s.config?.multiple === !0;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", ...u ? { role: "group", "aria-labelledby": `${r}-label` } : {}, children: [
    s.type === "toggle" ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(t.Switch, { id: r, checked: a === !0, onCheckedChange: (d) => l(d) }),
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: r, children: i })
    ] }) : /* @__PURE__ */ e.jsxs(t.Label, { id: `${r}-label`, htmlFor: u ? void 0 : r, children: [
      i,
      s.required && /* @__PURE__ */ e.jsx("span", { className: "cms:text-destructive", children: " *" })
    ] }),
    /* @__PURE__ */ e.jsx(Js, { field: s, value: a, onChange: l, errors: c, id: r, content: n }),
    s.instructions && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s.instructions }),
    /* @__PURE__ */ e.jsx(D, { message: c[""] })
  ] });
}
function Js({ field: s, value: a, onChange: l, errors: c, id: r, content: n }) {
  const i = c[""] !== void 0;
  switch (s.type) {
    case "toggle":
      return null;
    case "textarea":
      return /* @__PURE__ */ e.jsx(
        t.Textarea,
        {
          id: r,
          "aria-invalid": i,
          value: typeof a == "string" ? a : "",
          rows: U(s, "rows") ?? 4,
          onChange: (u) => l(u.target.value)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ e.jsx(S.Suspense, { fallback: /* @__PURE__ */ e.jsx(t.Skeleton, { className: "cms:h-48 cms:w-full" }), children: /* @__PURE__ */ e.jsx(qs, { id: r, labelledBy: `${r}-label`, invalid: i, value: typeof a == "string" ? a : "", onChange: l }) });
    case "number":
      return /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: r,
          type: "number",
          className: "cms:max-w-48",
          "aria-invalid": i,
          value: typeof a == "number" ? String(a) : typeof a == "string" ? a : "",
          min: U(s, "min"),
          max: U(s, "max"),
          step: U(s, "step") ?? "any",
          onChange: (u) => l(u.target.value === "" ? null : Number(u.target.value))
        }
      );
    case "date": {
      const u = s.config?.time === !0;
      return /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: r,
          type: u ? "datetime-local" : "date",
          className: "cms:max-w-64",
          "aria-invalid": i,
          value: Rs(a, u),
          onChange: (d) => l(Os(d.target.value))
        }
      );
    }
    case "select":
      return s.config?.multiple === !0 ? /* @__PURE__ */ e.jsx(pe, { options: he(s), value: Array.isArray(a) ? a.map(String) : [], onChange: l }) : /* @__PURE__ */ e.jsx(xe, { options: he(s), value: typeof a == "string" ? a : null, onChange: l, id: r, required: s.required === !0 });
    case "terms": {
      const u = s.terms ?? [];
      if (s.config?.multiple === !0) {
        const d = Array.isArray(a) ? a.map(String) : [];
        return /* @__PURE__ */ e.jsx(pe, { options: u, value: d, onChange: (x) => l(x.map(Number)) });
      }
      return /* @__PURE__ */ e.jsx(
        xe,
        {
          options: u,
          id: r,
          required: s.required === !0,
          value: a == null ? null : String(a),
          onChange: (d) => l(d === null ? null : Number(d))
        }
      );
    }
    case "entries":
      return /* @__PURE__ */ e.jsx(
        ie,
        {
          id: r,
          invalid: i,
          multiple: s.config?.multiple === !0,
          max: U(s, "max") ?? null,
          collections: s.collections ?? [],
          onChange: l,
          value: typeof a == "number" || Array.isArray(a) && a.every((u) => typeof u == "number") ? a : null
        }
      );
    case "link":
      return /* @__PURE__ */ e.jsx(Xs, { value: Z(a), onChange: l, errors: c, id: r });
    case "media":
      return /* @__PURE__ */ e.jsx(
        t.MediaPickerInput,
        {
          id: r,
          invalid: i,
          disabled: !1,
          multiple: s.config?.multiple === !0,
          max: U(s, "max") ?? null,
          types: Array.isArray(s.config?.types) ? s.config.types : [],
          value: typeof a == "number" || Array.isArray(a) && a.every((u) => typeof u == "number") ? a : null,
          onChange: l
        }
      );
    case "group":
      return /* @__PURE__ */ e.jsx(te, { fields: s.fields ?? [], value: Z(a), onChange: l, errors: c, id: r, content: n });
    case "repeater":
      return /* @__PURE__ */ e.jsx(Qs, { field: s, value: Array.isArray(a) ? a : [], onChange: l, errors: c, id: r, content: n });
    case "flexible":
      return /* @__PURE__ */ e.jsx(et, { field: s, value: Array.isArray(a) ? a : [], onChange: l, errors: c, id: r });
    default:
      return /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: r,
          "aria-invalid": i,
          value: typeof a == "string" ? a : "",
          placeholder: Zs(s, "placeholder"),
          maxLength: U(s, "max"),
          onChange: (u) => l(u.target.value)
        }
      );
  }
}
function U(s, a) {
  const l = s.config?.[a];
  return typeof l == "number" ? l : void 0;
}
function Zs(s, a) {
  const l = s.config?.[a];
  return typeof l == "string" ? l : void 0;
}
function te({ fields: s, value: a, onChange: l, errors: c, id: r, content: n }) {
  return /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-4 cms:rounded-lg cms:border cms:p-4", children: s.map((i) => /* @__PURE__ */ e.jsx(
    H,
    {
      id: `${r}-${i.handle}`,
      field: i,
      value: a[i.handle],
      content: n,
      errors: F(c, i.handle),
      onChange: (u) => l({ ...a, [i.handle]: u })
    },
    i.handle
  )) });
}
function xe({ options: s, value: a, onChange: l, id: c, required: r }) {
  return /* @__PURE__ */ e.jsxs(t.Select, { value: a ?? le, onValueChange: (n) => l(n === le ? null : n), children: [
    /* @__PURE__ */ e.jsx(t.SelectTrigger, { id: c, className: "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
    /* @__PURE__ */ e.jsxs(t.SelectContent, { children: [
      !r && /* @__PURE__ */ e.jsx(t.SelectItem, { value: le, children: "None" }),
      s.map((n) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: n.value, children: n.label }, n.value))
    ] })
  ] });
}
function pe({ options: s, value: a, onChange: l }) {
  return s.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Nothing to choose from yet." }) : /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2", children: s.map((c) => /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
    /* @__PURE__ */ e.jsx(
      t.Checkbox,
      {
        checked: a.includes(c.value),
        onCheckedChange: (r) => l(r ? s.map((n) => n.value).filter((n) => n === c.value || a.includes(n)) : a.filter((n) => n !== c.value))
      }
    ),
    c.label
  ] }, c.value)) });
}
function Xs({ value: s, onChange: a, errors: l, id: c }) {
  const r = (n, i) => {
    const u = { ...s, [n]: i };
    a(u.url === "" || u.url === void 0 ? null : u);
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-2 cms:md:grid-cols-[2fr_1fr_auto] cms:md:items-center", children: [
    /* @__PURE__ */ e.jsx(
      t.Input,
      {
        id: c,
        "aria-label": "Address",
        placeholder: "https://… or /about",
        value: typeof s.url == "string" ? s.url : "",
        onChange: (n) => r("url", n.target.value),
        "aria-invalid": l.url !== void 0
      }
    ),
    /* @__PURE__ */ e.jsx(
      t.Input,
      {
        "aria-label": "Link text",
        placeholder: "Link text",
        value: typeof s.label == "string" ? s.label : "",
        onChange: (n) => r("label", n.target.value)
      }
    ),
    /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
      /* @__PURE__ */ e.jsx(t.Checkbox, { checked: s.new_tab === !0, onCheckedChange: (n) => r("new_tab", n) }),
      "New tab"
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ e.jsx(D, { message: l.url ?? l.label }) })
  ] });
}
function Ys(s, a) {
  return !a && (s.fields ?? []).every((l) => l.type === "text");
}
function Qs({ field: s, value: a, onChange: l, errors: c, id: r, content: n = !1 }) {
  const i = s.fields ?? [], u = a.map(Z), d = (p, m) => l(u.map((g, j) => j === p ? m : g)), x = (s.label || "row").toLowerCase().replace(/s$/, ""), o = x.charAt(0).toUpperCase() + x.slice(1);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    u.map((p, m) => Ys(s, n) ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
      i.map((g) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(
          t.Input,
          {
            "aria-label": g.label || g.handle,
            placeholder: g.label || g.handle,
            value: typeof p[g.handle] == "string" ? p[g.handle] : "",
            onChange: (j) => d(m, { ...p, [g.handle]: j.target.value })
          }
        ),
        /* @__PURE__ */ e.jsx(D, { message: c[`${m}.${g.handle}`] })
      ] }, g.handle)),
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": `Remove ${x} ${m + 1}`, onClick: () => l(u.filter((g, j) => j !== m)), children: /* @__PURE__ */ e.jsx(M, {}) })
    ] }, m) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(
        ls,
        {
          label: `${o} ${m + 1}`,
          index: m,
          count: u.length,
          onMove: (g) => l(V(u, m, g)),
          onRemove: () => l(u.filter((g, j) => j !== m)),
          hidden: n ? p._hidden === !0 : void 0,
          onHidden: (g) => d(m, { ...p, _hidden: g })
        }
      ),
      /* @__PURE__ */ e.jsx(te, { fields: i, value: p, onChange: (g) => d(m, g), errors: F(c, String(m)), id: `${r}-${m}`, content: n })
    ] }, typeof p._id == "string" ? p._id : m)),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", size: "sm", onClick: () => l([...u, n ? Ps() : {}]), children: [
      /* @__PURE__ */ e.jsx(R, {}),
      " Add ",
      x
    ] }) })
  ] });
}
function et({ field: s, value: a, onChange: l, errors: c, id: r }) {
  const n = s.blocks ?? [], i = a.map(Z), u = (d, x) => l(i.map((o, p) => p === d ? x : o));
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    i.map((d, x) => {
      const o = n.find((p) => p.type === d.type);
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(
          ls,
          {
            label: o?.label ?? String(d.type),
            badge: !0,
            index: x,
            count: i.length,
            onMove: (p) => l(V(i, x, p)),
            onRemove: () => l(i.filter((p, m) => m !== x)),
            hidden: d.hidden === !0,
            onHidden: (p) => u(x, { ...d, hidden: p })
          }
        ),
        o ? /* @__PURE__ */ e.jsx(
          te,
          {
            fields: o.fields,
            value: Z(d.values),
            onChange: (p) => u(x, { ...d, values: p }),
            errors: F(c, `${x}.values`),
            id: `${r}-${x}`,
            content: !0
          }
        ) : /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: "This kind of block no longer exists. Its values are kept." }),
        /* @__PURE__ */ e.jsx(D, { message: c[`${x}.type`] })
      ] }, typeof d.id == "string" ? d.id : x);
    }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(t.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(t.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", size: "sm", disabled: n.length === 0, children: [
        /* @__PURE__ */ e.jsx(R, {}),
        " Add block"
      ] }) }),
      /* @__PURE__ */ e.jsx(t.DropdownMenuContent, { align: "start", children: n.map((d) => /* @__PURE__ */ e.jsx(t.DropdownMenuItem, { onSelect: () => l([...i, Us(d.type)]), children: d.label }, d.type)) })
    ] }) })
  ] });
}
function ls({ label: s, badge: a = !1, index: l, count: c, onMove: r, onRemove: n, hidden: i, onHidden: u }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    a ? /* @__PURE__ */ e.jsx(t.Badge, { variant: "secondary", children: s }) : /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:font-medium", children: s }),
    i !== void 0 && /* @__PURE__ */ e.jsxs("label", { className: "cms:ml-auto cms:flex cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", children: [
      /* @__PURE__ */ e.jsx(t.Switch, { checked: !i, onCheckedChange: (d) => u(!d), "aria-label": `Show ${s}` }),
      "Show"
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: i === void 0 ? "cms:ml-auto cms:flex" : "cms:flex", children: [
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Move ${s} up`, disabled: l === 0, onClick: () => r(-1), children: /* @__PURE__ */ e.jsx(G, {}) }),
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Move ${s} down`, disabled: l === c - 1, onClick: () => r(1), children: /* @__PURE__ */ e.jsx(q, {}) }),
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": `Remove ${s}`, onClick: n, children: /* @__PURE__ */ e.jsx(M, {}) })
    ] })
  ] });
}
function ns({ fields: s, onChange: a, types: l, errors: c, depth: r = 1, idPrefix: n = "field" }) {
  const [i, u] = S.useState(() => /* @__PURE__ */ new Set()), d = (p) => u((m) => {
    const g = new Set(m);
    return g.has(p) ? g.delete(p) : g.add(p), g;
  }), x = (p, m) => a(s.map((g, j) => j === p ? m : g)), o = (p) => {
    const m = Fs(p.type, p.label, s);
    a([...s, m]), u((g) => new Set(g).add(m.key));
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:border-dashed cms:p-4 cms:text-sm cms:text-muted-foreground", children: "No fields yet." }),
    s.map((p, m) => {
      const g = l.find((v) => v.type === p.type), j = i.has(p.key) || me(c, String(m)), h = `${n}-${p.key}`;
      return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${me(c, String(m)) ? "cms:border-destructive" : ""}`, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:p-2", children: [
          /* @__PURE__ */ e.jsx(
            t.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-expanded": j,
              "aria-controls": h,
              "aria-label": `${j ? "Close" : "Open"} ${p.label || p.handle}`,
              onClick: () => d(p.key),
              children: j ? /* @__PURE__ */ e.jsx(De, {}) : /* @__PURE__ */ e.jsx(re, {})
            }
          ),
          /* @__PURE__ */ e.jsxs("button", { type: "button", className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:text-left", onClick: () => d(p.key), children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: p.label || p.handle }),
            /* @__PURE__ */ e.jsx("code", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", children: p.handle })
          ] }),
          p.required && /* @__PURE__ */ e.jsx(t.Badge, { variant: "outline", children: "Required" }),
          /* @__PURE__ */ e.jsx(t.Badge, { variant: "secondary", children: g?.label ?? p.type }),
          /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move up", disabled: m === 0, onClick: () => a(V(s, m, -1)), children: /* @__PURE__ */ e.jsx(G, {}) }),
          /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move down", disabled: m === s.length - 1, onClick: () => a(V(s, m, 1)), children: /* @__PURE__ */ e.jsx(q, {}) }),
          /* @__PURE__ */ e.jsx(
            t.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Remove ${p.label || p.handle}`,
              onClick: () => a(s.filter((v, T) => T !== m)),
              children: /* @__PURE__ */ e.jsx(M, {})
            }
          )
        ] }),
        j && /* @__PURE__ */ e.jsx(
          st,
          {
            id: h,
            field: p,
            type: g,
            siblings: s,
            onChange: (v) => x(m, v),
            types: l,
            errors: se(c, String(m)),
            depth: r
          }
        )
      ] }, p.key);
    }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(t.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(t.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", size: "sm", children: [
        /* @__PURE__ */ e.jsx(R, {}),
        " Add field"
      ] }) }),
      /* @__PURE__ */ e.jsx(t.DropdownMenuContent, { align: "start", children: l.filter((p) => !p.hasChildren || r < As).map((p) => /* @__PURE__ */ e.jsx(t.DropdownMenuItem, { onSelect: () => o(p), children: p.label }, p.type)) })
    ] }) })
  ] });
}
const E = { default: "__default", yes: "yes", no: "no" };
function st({ id: s, field: a, type: l, siblings: c, onChange: r, types: n, errors: i, depth: u }) {
  const d = a.config ?? {};
  return /* @__PURE__ */ e.jsxs("div", { id: s, className: "cms:flex cms:flex-col cms:gap-4 cms:border-t cms:p-4", children: [
    !l && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-destructive", children: [
      'The field type "',
      a.type,
      `" isn't registered. Its data is kept; register the type or remove the field.`
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${s}-label`, children: "Label" }),
        /* @__PURE__ */ e.jsx(t.Input, { id: `${s}-label`, value: a.label ?? "", onChange: (x) => r(Hs(a, x.target.value, c)) }),
        /* @__PURE__ */ e.jsx(D, { message: i.label })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${s}-handle`, children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          t.Input,
          {
            id: `${s}-handle`,
            className: "cms:font-mono",
            value: a.handle,
            onChange: (x) => r({ ...a, handle: x.target.value, handleTouched: !0 })
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "How templates read it. Renaming it hides values saved under the old one." }),
        /* @__PURE__ */ e.jsx(D, { message: i.handle })
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
          onChange: (x) => r({ ...a, instructions: x.target.value || null })
        }
      ),
      /* @__PURE__ */ e.jsx(D, { message: i.instructions })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-6", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(t.Switch, { id: `${s}-required`, checked: a.required === !0, onCheckedChange: (x) => r({ ...a, required: x }) }),
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${s}-required`, children: "Required" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${s}-translatable`, children: "Per language" }),
        /* @__PURE__ */ e.jsxs(
          t.Select,
          {
            value: a.translatable === !0 ? E.yes : a.translatable === !1 ? E.no : E.default,
            onValueChange: (x) => r({ ...a, translatable: x === E.yes ? !0 : x === E.no ? !1 : null }),
            children: [
              /* @__PURE__ */ e.jsx(t.SelectTrigger, { id: `${s}-translatable`, className: "cms:w-48", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
              /* @__PURE__ */ e.jsxs(t.SelectContent, { children: [
                /* @__PURE__ */ e.jsx(t.SelectItem, { value: E.default, children: "As the type decides" }),
                /* @__PURE__ */ e.jsx(t.SelectItem, { value: E.yes, children: "Yes, translated" }),
                /* @__PURE__ */ e.jsx(t.SelectItem, { value: E.no, children: "No, shared" })
              ] })
            ]
          }
        )
      ] })
    ] }),
    (l?.settings.length ?? 0) > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: l?.settings.map((x) => /* @__PURE__ */ e.jsx(
      H,
      {
        id: `${s}-config-${x.handle}`,
        field: x,
        value: d[x.handle],
        errors: F(i, `config.${x.handle}`),
        onChange: (o) => r({ ...a, config: { ...d, [x.handle]: o } })
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
          onChange: (x) => r({ ...a, validation: x.target.value.split(`
`) })
        }
      ),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Laravel rules, one per line." }),
      /* @__PURE__ */ e.jsx(D, { message: i.validation ?? Object.entries(i).find(([x]) => x.startsWith("validation."))?.[1] })
    ] }),
    l?.hasChildren && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(t.Label, { children: "Fields inside" }),
      /* @__PURE__ */ e.jsx(
        ns,
        {
          fields: a.fields,
          onChange: (x) => r({ ...a, fields: x }),
          types: n,
          errors: se(i, "fields"),
          depth: u + 1,
          idPrefix: s
        }
      ),
      /* @__PURE__ */ e.jsx(D, { message: i.fields })
    ] }),
    /* @__PURE__ */ e.jsx(D, { message: i.type })
  ] });
}
function tt({ kind: s = "blueprint", blueprint: a, fieldTypes: l, usedBy: c = [] }) {
  const r = s === "fieldset" ? "Fieldset" : "Blueprint", n = w(s === "fieldset" ? "cms/fieldsets" : "cms/blueprints"), i = a ? a.title : `New ${r.toLowerCase()}`;
  t.useBreadcrumbs([{ label: `${r}s`, href: n }, { label: i }]);
  const [u, d] = K(), x = f.useForm({ title: a?.title ?? "", handle: a?.handle ?? "" }), [o, p] = S.useState(a !== null), [m, g] = S.useState(() => ss(a?.fields)), j = (B) => l.find((L) => L.type === B)?.hasChildren === !0, h = x.errors, [v, T] = S.useState(() => JSON.stringify(m)), N = x.isDirty || JSON.stringify(m) !== v, k = () => {
    x.setDefaults(), T(JSON.stringify(m));
  }, b = () => {
    x.processing || (x.transform((B) => ({
      ...a ? { title: B.title } : B,
      fields: ts(m, j)
    })), a ? x.put(`${n}/${a.id}`, { preserveScroll: !0, onSuccess: k }) : x.post(n, { onSuccess: k }));
  }, C = (B) => {
    B.preventDefault(), b();
  };
  t.useUnsavedChanges(N, b);
  const $ = () => a && u(
    `Delete the ${r.toLowerCase()} "${a.title}"? Content keeps its values.`,
    () => f.router.delete(`${n}/${a.id}`, { preserveScroll: !0 })
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: C, className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: i }),
    d,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(t.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: n, "aria-label": `Back to ${r.toLowerCase()}s`, children: /* @__PURE__ */ e.jsx(Q, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: i })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        a && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "outline", size: "icon", className: "cms:text-destructive", "aria-label": `Delete ${i}`, onClick: $, children: /* @__PURE__ */ e.jsx(M, {}) }),
        /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", disabled: x.processing, children: [
          x.processing && /* @__PURE__ */ e.jsx(ee, { className: "cms:animate-spin" }),
          a ? "Save" : `Create ${r.toLowerCase()}`
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(D, { message: h.blueprint ?? h.fieldset }),
    /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsxs(t.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "title", children: "Title" }),
        /* @__PURE__ */ e.jsx(t.Input, { id: "title", value: x.data.title, required: !0, onChange: (B) => {
          x.setData((L) => ({ ...L, title: B.target.value, handle: o ? L.handle : Qe(B.target.value) }));
        } }),
        /* @__PURE__ */ e.jsx(D, { message: h.title })
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
              p(!0), x.setData("handle", B.target.value);
            }
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: a ? "Set when it was created." : "Lowercase letters, digits and underscores. It can't change later." }),
        /* @__PURE__ */ e.jsx(D, { message: h.handle })
      ] })
    ] }) }),
    c.length > 0 && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      "Used by ",
      c.join(", "),
      ". Changes show there at once."
    ] }),
    /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-3", "aria-labelledby": "fields-heading", children: [
      /* @__PURE__ */ e.jsx("h2", { id: "fields-heading", className: "cms:text-lg cms:font-medium", children: "Fields" }),
      /* @__PURE__ */ e.jsx(ns, { fields: m, onChange: g, types: l, errors: se(h, "fields") }),
      /* @__PURE__ */ e.jsx(D, { message: h.fields })
    ] })
  ] });
}
function cs({ noun: s, base: a, rows: l, intro: c }) {
  const r = `${s}s`;
  t.useBreadcrumbs([{ label: r }]);
  const [n, i] = K();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: r }),
    i,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: r }),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: c })
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
          r.toLowerCase(),
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
              children: /* @__PURE__ */ e.jsx(M, {})
            }
          ) })
        ] }, u.id))
      ] })
    ] }) })
  ] });
}
function at({ blueprints: s }) {
  const a = f.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(D, { message: a.blueprint }),
    /* @__PURE__ */ e.jsx(
      cs,
      {
        noun: "Blueprint",
        base: w("cms/blueprints"),
        rows: s,
        intro: "The fields editors fill in, for each kind of content."
      }
    )
  ] });
}
const lt = [
  { handle: "title", type: "text", label: "SEO title", instructions: "For search results and tabs. Empty: the title.", config: { max: 255 } },
  { handle: "description", type: "textarea", label: "Description", instructions: "A sentence or two for search results and shared links.", config: { max: 500 } },
  { handle: "image", type: "media", label: "Share image", instructions: "Shown when the page is shared.", config: { types: ["image"] } },
  { handle: "noindex", type: "toggle", label: "Hide from search engines" }
];
function nt(s) {
  const { entry: a } = s;
  return /* @__PURE__ */ e.jsx(ct, { ...s }, a ? `${a.id}:${a.locale}:${a.version}:${a.status}:${a.trashed}:${a.publishedAt}` : "new");
}
function ct({ collection: s, fields: a, locales: l = [], shared: c = [], sharedValues: r = {}, entry: n, values: i, revisions: u, undoRestore: d = null, settings: x, can: o }) {
  const p = w(`cms/collections/${s.handle}/entries`), m = n ? w(`cms/entries/${n.id}`) : p, g = n ? i.title : "New entry";
  t.useBreadcrumbs([{ label: s.title, href: p }, { label: g }]);
  const [j, h] = K(), [v, T] = S.useState(!1), N = f.useForm({ ...i, seo: i.seo ?? {}, locale: n?.locale ?? null, version: n?.version ?? null, publish: !1, published_at: null }), k = n ? { locale: n.locale } : {}, b = l.find((y) => y.main)?.code, C = N.errors, $ = n !== null && n.status !== "draft" && !n.hasUnpublishedChanges && !N.isDirty, B = n === null ? o.create : o.update && !n.trashed, L = (y = !1, A = null) => {
    N.transform((O) => ({ ...O, publish: y, published_at: A })), n ? N.put(m, { preserveScroll: !0, onSuccess: () => T(!1) }) : N.post(m);
  }, ms = () => {
    N.transform((y) => ({ ...y, version: null, publish: !1, published_at: null })), N.put(m, { preserveScroll: !0 });
  }, I = t.useEditLock({
    type: "cms.entry",
    id: n?.id,
    locale: n?.locale,
    enabled: n !== null && B,
    noun: "entry",
    leaveTo: p,
    getUnsaved: () => N.isDirty ? { title: N.data.title, slug: N.data.slug, data: N.data.data, seo: N.data.seo } : null
  }), J = B && !I.readOnly, us = async (y) => {
    const A = await I.loadKept(y);
    N.setData((O) => ({ ...O, title: A.title ?? O.title, slug: A.slug ?? O.slug, data: A.data ?? O.data, seo: A.seo ?? O.seo }));
  };
  t.useUnsavedChanges(N.isDirty && !I.takenOver, J ? () => N.processing || L() : void 0);
  const oe = (y = null) => {
    o.update ? L(!0, y) : n && f.router.post(`${m}/publish`, { ...k, published_at: y }, { preserveScroll: !0, onSuccess: () => T(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (y) => {
    y.preventDefault(), L();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: g }),
    h,
    I.dialogs,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(t.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: p, "aria-label": `Back to ${s.title}`, children: /* @__PURE__ */ e.jsx(Q, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: g }),
        n && /* @__PURE__ */ e.jsx(t.Badge, { variant: n.status === "published" ? "default" : "secondary", children: n.trashed ? "In the trash" : W(n.status) }),
        N.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        n && !n.trashed && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(
          "a",
          {
            href: n.previewUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            title: N.isDirty ? "Shows the saved draft: save first to see your changes." : "Shows the saved draft.",
            children: [
              /* @__PURE__ */ e.jsx($s, {}),
              " Preview"
            ]
          }
        ) }),
        n?.url && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: n.url, target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ e.jsx(Ae, {}),
          " View"
        ] }) }),
        n?.trashed && o.delete && /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", onClick: () => f.router.post(`${m}/restore`, {}, { preserveScroll: !0 }), children: [
          /* @__PURE__ */ e.jsx(Ls, {}),
          " Restore"
        ] }),
        n?.trashed && o.delete && /* @__PURE__ */ e.jsxs(
          t.Button,
          {
            type: "button",
            variant: "outline",
            className: "cms:text-destructive",
            onClick: () => j(`Delete "${i.title}" for good, in every language, with its revisions? This can't be undone.`, () => f.router.delete(`${m}/force`)),
            children: [
              /* @__PURE__ */ e.jsx(M, {}),
              " Delete for good"
            ]
          }
        ),
        n && !n.trashed && o.create && /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "ghost", title: "Copy every language as a new draft", onClick: () => f.router.post(`${m}/duplicate`), children: [
          /* @__PURE__ */ e.jsx(Ss, {}),
          " Duplicate"
        ] }),
        n && !n.trashed && o.delete && !I.readOnly && /* @__PURE__ */ e.jsx(
          t.Button,
          {
            type: "button",
            variant: "outline",
            size: "icon",
            className: "cms:text-destructive",
            "aria-label": "Move to the trash",
            onClick: () => j(`Move "${i.title}" to the trash? It comes off the site; you can restore it.`, () => f.router.delete(m)),
            children: /* @__PURE__ */ e.jsx(M, {})
          }
        ),
        J && /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", variant: n && o.publish ? "outline" : "default", disabled: N.processing, children: [
          N.processing && /* @__PURE__ */ e.jsx(ee, { className: "cms:animate-spin" }),
          n ? "Save draft" : "Create draft"
        ] }),
        n && !n.trashed && o.publish && !I.readOnly && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex", children: [
          /* @__PURE__ */ e.jsx(t.Button, { type: "button", className: "cms:rounded-r-none", disabled: N.processing || $, onClick: () => oe(), children: n.status === "draft" ? "Publish" : $ ? "Published" : "Publish changes" }),
          /* @__PURE__ */ e.jsxs(t.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(t.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(t.Button, { type: "button", size: "icon", className: "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": "More publishing options", children: /* @__PURE__ */ e.jsx(De, {}) }) }),
            /* @__PURE__ */ e.jsxs(t.DropdownMenuContent, { align: "end", children: [
              /* @__PURE__ */ e.jsxs(t.DropdownMenuItem, { onSelect: () => T(!0), children: [
                /* @__PURE__ */ e.jsx(ws, {}),
                " Publish on a date…"
              ] }),
              n.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(t.DropdownMenuSeparator, {}),
                /* @__PURE__ */ e.jsx(t.DropdownMenuItem, { onSelect: () => f.router.post(`${m}/unpublish`, k, { preserveScroll: !0 }), children: "Unpublish" })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }),
    n && l.length > 1 && /* @__PURE__ */ e.jsx(
      rt,
      {
        entryUrl: m,
        current: n.locale,
        locales: l,
        canAdd: o.create && !n.trashed,
        canRemove: o.delete && !n.isMain && !n.trashed,
        onRemove: () => j(
          `Remove the ${z(n.locale)} translation of "${i.title}"? Its revisions go with it.`,
          () => f.router.delete(`${m}/translations/${n.locale}`)
        )
      }
    ),
    /* @__PURE__ */ e.jsx(t.ViewingNotice, { by: I.viewingBy }),
    /* @__PURE__ */ e.jsx(t.KeptEditsNotice, { kept: I.kept, disabled: !J, onLoad: (y) => {
      us(y);
    }, onDiscard: (y) => {
      I.discardKept(y);
    } }),
    C.version && /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: [
      /* @__PURE__ */ e.jsx("span", { children: C.version }),
      /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "outline", size: "sm", onClick: () => f.router.reload(), children: "Load theirs" }),
        /* @__PURE__ */ e.jsx(
          t.Button,
          {
            type: "button",
            variant: "destructive",
            size: "sm",
            disabled: N.processing,
            onClick: () => j("Save your version over theirs? Their changes are replaced (their earlier published versions stay in the revisions).", ms),
            children: "Save mine anyway"
          }
        )
      ] })
    ] }),
    (C.entry || C.published_at) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: C.entry ?? C.published_at }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_18rem]", children: [
      /* @__PURE__ */ e.jsxs("fieldset", { disabled: !J, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsxs(t.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-[2fr_1fr]", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "title", children: "Title" }),
            /* @__PURE__ */ e.jsx(
              t.Input,
              {
                id: "title",
                value: N.data.title,
                "aria-invalid": C.title !== void 0,
                onChange: (y) => N.setData("title", y.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(D, { message: C.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "slug", children: "Slug" }),
            /* @__PURE__ */ e.jsx(
              t.Input,
              {
                id: "slug",
                className: "cms:font-mono",
                value: N.data.slug,
                placeholder: "Made from the title",
                "aria-invalid": C.slug !== void 0,
                onChange: (y) => N.setData("slug", y.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(D, { message: C.slug })
          ] })
        ] }) }),
        a.length > 0 && /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsx(t.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: a.map((y) => c.includes(y.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
          /* @__PURE__ */ e.jsx(H, { id: `data-${y.handle}`, field: y, content: !0, value: r[y.handle], errors: {}, onChange: () => {
          } }),
          /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
            "Shared by all languages: edit it in ",
            b ? z(b) : "the main language",
            "."
          ] })
        ] }, y.handle) : /* @__PURE__ */ e.jsx(
          H,
          {
            id: `data-${y.handle}`,
            field: y,
            content: !0,
            value: N.data.data[y.handle],
            errors: F(C, `data.${y.handle}`),
            onChange: (A) => N.setData("data", { ...N.data.data, [y.handle]: A })
          },
          y.handle
        )) }) }),
        /* @__PURE__ */ e.jsxs(t.Card, { children: [
          /* @__PURE__ */ e.jsx(t.CardHeader, { children: /* @__PURE__ */ e.jsx(t.CardTitle, { className: "cms:text-base", children: "Search and sharing" }) }),
          /* @__PURE__ */ e.jsx(t.CardContent, { children: /* @__PURE__ */ e.jsx(
            te,
            {
              id: "seo",
              fields: lt,
              value: N.data.seo,
              errors: F(C, "seo"),
              onChange: (y) => N.setData("seo", y)
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
              n.status !== "draft" && n.publishedAt ? ` · ${X(n.publishedAt)}` : ""
            ] }),
            n.status !== "draft" && n.hasUnpublishedChanges && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The draft has changes the site doesn't show yet." })
          ] })
        ] }),
        x && /* @__PURE__ */ e.jsx(ot, { entryUrl: m, collection: s, settings: x, disabled: !J }),
        /* @__PURE__ */ e.jsxs(t.Card, { children: [
          /* @__PURE__ */ e.jsx(t.CardHeader, { children: /* @__PURE__ */ e.jsx(t.CardTitle, { className: "cms:text-base", children: "Revisions" }) }),
          /* @__PURE__ */ e.jsxs(t.CardContent, { className: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
            d !== null && o.update && /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", size: "sm", onClick: () => f.router.post(w(`cms/entry-translations/${d}/undo-restore`), {}, { preserveScroll: !0 }), children: [
              /* @__PURE__ */ e.jsx(Ms, {}),
              " Undo the restore"
            ] }),
            u.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "Each publish keeps one." }),
            u.map((y) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
                /* @__PURE__ */ e.jsx("div", { className: "cms:truncate", children: y.title }),
                /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: X(y.createdAt) })
              ] }),
              o.update && !n.trashed && /* @__PURE__ */ e.jsx(
                t.Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  onClick: () => f.router.post(w(`cms/revisions/${y.id}/restore`), {}, { preserveScroll: !0 }),
                  children: "Restore"
                }
              )
            ] }, y.id))
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(
      it,
      {
        open: v,
        onClose: () => T(!1),
        processing: N.processing,
        current: n?.publishedAt ?? null,
        onSchedule: (y) => oe(y)
      }
    )
  ] });
}
function rt({ entryUrl: s, current: a, locales: l, canAdd: c, canRemove: r, onRemove: n }) {
  return /* @__PURE__ */ e.jsxs("nav", { "aria-label": "Languages", className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
    l.map((i) => {
      const u = `${z(i.code)}${i.main ? " (main)" : ""}`;
      return i.status === null ? c ? /* @__PURE__ */ e.jsxs(
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
    r && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:ml-auto cms:text-destructive", onClick: n, children: "Remove this language" })
  ] });
}
function it({ open: s, onClose: a, onSchedule: l, current: c, processing: r }) {
  const [n, i] = S.useState("");
  return S.useEffect(() => {
    s && i(Ws(c ? new Date(c) : new Date(Date.now() + 864e5)));
  }, [s, c]), /* @__PURE__ */ e.jsx(t.Dialog, { open: s, onOpenChange: (u) => !u && a(), children: /* @__PURE__ */ e.jsxs(t.DialogContent, { children: [
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
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", disabled: n === "" || r, onClick: () => l(new Date(n).toISOString()), children: "Publish" })
    ] })
  ] }) });
}
function ot({ entryUrl: s, collection: a, settings: l, disabled: c }) {
  const r = f.useForm({ parent_id: l.parentId, template: l.template ?? "" }), n = r.errors;
  return /* @__PURE__ */ e.jsxs(t.Card, { children: [
    /* @__PURE__ */ e.jsx(t.CardHeader, { children: /* @__PURE__ */ e.jsx(t.CardTitle, { className: "cms:text-base", children: "Page settings" }) }),
    /* @__PURE__ */ e.jsx(t.CardContent, { children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: c, className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: [
      a.hierarchical && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "parent", children: "Parent" }),
        /* @__PURE__ */ e.jsx(
          ie,
          {
            id: "parent",
            multiple: !1,
            max: 1,
            collections: [a.handle],
            invalid: n.parent_id !== void 0,
            value: r.data.parent_id,
            onChange: (i) => r.setData("parent_id", typeof i == "number" ? i : null)
          }
        ),
        /* @__PURE__ */ e.jsx(D, { message: n.parent_id })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "template", children: "Template" }),
        /* @__PURE__ */ e.jsx(
          t.Input,
          {
            id: "template",
            className: "cms:font-mono",
            placeholder: "The collection's",
            value: r.data.template,
            onChange: (i) => r.setData("template", i.target.value),
            "aria-invalid": n.template !== void 0
          }
        ),
        /* @__PURE__ */ e.jsx(D, { message: n.template })
      ] }),
      r.isDirty && /* @__PURE__ */ e.jsx(
        t.Button,
        {
          type: "button",
          size: "sm",
          disabled: r.processing,
          onClick: () => r.put(`${s}/settings`, { preserveScroll: !0, onSuccess: () => r.setDefaults() }),
          children: "Save settings"
        }
      )
    ] }) })
  ] });
}
function dt({ collection: s, collections: a, entries: l, query: c, can: r }) {
  t.useBreadcrumbs([{ label: "Entries", href: w("cms/entries") }, ...s ? [{ label: s.title }] : []]);
  const [n, i] = S.useState(c.search), u = s ? w(`cms/collections/${s.handle}/entries`) : "", [d, x] = S.useState([]), [o, p] = K();
  S.useEffect(() => x([]), [l]);
  const m = c.trashed ? r?.delete ? [{ action: "restore", label: "Restore" }, { action: "delete", label: "Delete for good", danger: !0 }] : [] : [
    ...r?.publish ? [{ action: "publish", label: "Publish" }, { action: "unpublish", label: "Unpublish" }] : [],
    ...r?.delete ? [{ action: "trash", label: "Move to the trash", danger: !0 }] : []
  ], g = (h, v, T = !1) => {
    const N = () => f.router.post(`${u}/bulk`, { action: h, ids: d }, { preserveScroll: !0 });
    T ? o(`${v}: ${d.length} ${d.length === 1 ? "entry" : "entries"}?${h === "delete" ? " This can't be undone." : ""}`, N) : N();
  }, j = (h) => {
    const v = { ...c, ...h };
    f.router.get(
      u,
      { ...v.search ? { search: v.search } : {}, ...v.trashed ? { trashed: 1 } : {} },
      { preserveState: !0, preserveScroll: !0, replace: !0 }
    );
  };
  return S.useEffect(() => {
    if (n === c.search) return;
    const h = window.setTimeout(() => j({ search: n }), 300);
    return () => window.clearTimeout(h);
  }, [n]), !s || !l ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: "Entries" }),
    /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Entries" }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no collections yet. Create one under Structure → Collections, then come back to write its entries." })
  ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: s.title }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
        a.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: s.handle, onValueChange: (h) => f.router.get(w(`cms/collections/${h}/entries`)), children: [
          /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Collection", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(t.SelectContent, { children: a.map((h) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: h.handle, children: h.title }, h.handle)) })
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        s.listing && !c.trashed && /* @__PURE__ */ e.jsx(t.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs(f.Link, { href: w(`cms/collections/${s.handle}/listing`), children: [
          /* @__PURE__ */ e.jsx(Ds, {}),
          " Listing page"
        ] }) }),
        l.total > 0 && !c.trashed && /* @__PURE__ */ e.jsx(t.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: `${u}/export`, children: [
          /* @__PURE__ */ e.jsx(Me, {}),
          " Export CSV"
        ] }) }),
        r?.create && !c.trashed && /* @__PURE__ */ e.jsx(t.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(f.Link, { href: `${u}/create`, children: [
          /* @__PURE__ */ e.jsx(R, {}),
          " New entry"
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-sm", children: [
        /* @__PURE__ */ e.jsx(Ge, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          t.Input,
          {
            className: "cms:pl-9",
            placeholder: "Search titles",
            "aria-label": "Search titles",
            value: n,
            onChange: (h) => i(h.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(t.Button, { variant: c.trashed ? "secondary" : "ghost", size: "sm", onClick: () => j({ trashed: !c.trashed }), children: c.trashed ? "Back to entries" : "Trash" }),
      d.length > 0 && m.length > 0 && /* @__PURE__ */ e.jsxs("div", { role: "toolbar", "aria-label": "Selected entries", className: "cms:ml-auto cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs("span", { className: "cms:text-sm cms:text-muted-foreground", children: [
          d.length,
          " selected"
        ] }),
        m.map((h) => /* @__PURE__ */ e.jsx(t.Button, { size: "sm", variant: h.danger ? "destructive" : "outline", onClick: () => g(h.action, h.label, h.danger), children: h.label }, h.action))
      ] })
    ] }),
    p,
    /* @__PURE__ */ e.jsx(t.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(t.Table, { children: [
      /* @__PURE__ */ e.jsx(t.TableHeader, { children: /* @__PURE__ */ e.jsxs(t.TableRow, { children: [
        m.length > 0 && /* @__PURE__ */ e.jsx(t.TableHead, { className: "cms:w-10", children: /* @__PURE__ */ e.jsx(
          t.Checkbox,
          {
            "aria-label": "Select all on this page",
            checked: l.data.length > 0 && d.length === l.data.length,
            onCheckedChange: (h) => x(h ? l.data.map((v) => v.id) : [])
          }
        ) }),
        /* @__PURE__ */ e.jsx(t.TableHead, { children: "Title" }),
        /* @__PURE__ */ e.jsx(t.TableHead, { children: "Status" }),
        /* @__PURE__ */ e.jsx(t.TableHead, { children: s.dated ? "Date" : "Updated" })
      ] }) }),
      /* @__PURE__ */ e.jsxs(t.TableBody, { children: [
        l.data.length === 0 && /* @__PURE__ */ e.jsx(t.TableRow, { children: /* @__PURE__ */ e.jsx(t.TableCell, { colSpan: m.length > 0 ? 4 : 3, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: c.trashed ? "The trash is empty." : c.search ? "Nothing matches." : "No entries yet." }) }),
        l.data.map((h) => /* @__PURE__ */ e.jsxs(t.TableRow, { "data-state": d.includes(h.id) ? "selected" : void 0, children: [
          m.length > 0 && /* @__PURE__ */ e.jsx(t.TableCell, { children: /* @__PURE__ */ e.jsx(
            t.Checkbox,
            {
              "aria-label": `Select ${h.title}`,
              checked: d.includes(h.id),
              onCheckedChange: (v) => x(v ? [...d, h.id] : d.filter((T) => T !== h.id))
            }
          ) }),
          /* @__PURE__ */ e.jsxs(t.TableCell, { children: [
            /* @__PURE__ */ e.jsx(f.Link, { href: w(`cms/entries/${h.id}/edit`), className: "cms:font-medium cms:hover:underline", children: h.title }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
              "/",
              h.slug,
              h.parent ? ` · under ${h.parent}` : ""
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(t.TableCell, { children: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-1", children: [
            /* @__PURE__ */ e.jsx(t.Badge, { variant: h.status === "published" ? "default" : "secondary", children: W(h.status) }),
            h.locales.length > 1 && h.locales.filter((v) => !v.main).map((v) => /* @__PURE__ */ e.jsx(
              t.Badge,
              {
                variant: v.status === "published" ? "default" : "outline",
                className: v.status === null ? "cms:opacity-50" : "",
                title: `${v.code}: ${v.status === null ? "not translated" : W(v.status)}`,
                children: v.code.toUpperCase()
              },
              v.code
            ))
          ] }) }),
          /* @__PURE__ */ e.jsx(t.TableCell, { className: "cms:text-muted-foreground", children: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-2", children: [
            X(s.dated ? h.publishedAt : h.updatedAt),
            s.ordered && r?.update && !c.trashed && !c.search && /* @__PURE__ */ e.jsxs("span", { className: "cms:flex", children: [
              /* @__PURE__ */ e.jsx(t.Button, { variant: "ghost", size: "icon", "aria-label": `Move ${h.title} up`, onClick: () => f.router.post(w(`cms/entries/${h.id}/move`), { direction: "up" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(G, {}) }),
              /* @__PURE__ */ e.jsx(t.Button, { variant: "ghost", size: "icon", "aria-label": `Move ${h.title} down`, onClick: () => f.router.post(w(`cms/entries/${h.id}/move`), { direction: "down" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(q, {}) })
            ] })
          ] }) })
        ] }, h.id))
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
            children: /* @__PURE__ */ e.jsx(Te, {})
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
function mt(s) {
  return /* @__PURE__ */ e.jsx(ut, { ...s }, `${s.locale}:${JSON.stringify(s.values)}`);
}
function ut({ collection: s, fields: a, locale: l, locales: c, shared: r, values: n, can: i }) {
  const u = w(`cms/collections/${s.handle}/listing`), d = w(`cms/collections/${s.handle}/entries`);
  t.useBreadcrumbs([{ label: s.title, href: d }, { label: "Listing page" }]);
  const x = f.useForm({ locale: l, data: n }), o = x.errors, p = c[0], m = i.update, g = () => x.processing || x.put(u, { preserveScroll: !0 });
  return t.useUnsavedChanges(x.isDirty, m ? g : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: (j) => {
    j.preventDefault(), g();
  }, className: "cms:flex cms:max-w-3xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: `${s.title}: listing page` }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(t.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: d, "aria-label": `Back to ${s.title}`, children: /* @__PURE__ */ e.jsx(Q, {}) }) }),
        /* @__PURE__ */ e.jsxs("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: [
          s.title,
          ": listing page"
        ] }),
        x.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        c.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: l, onValueChange: (j) => f.router.get(u, { locale: j }), children: [
          /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(t.SelectContent, { children: c.map((j, h) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: j, children: [
            z(j),
            h === 0 ? " (main)" : ""
          ] }, j)) })
        ] }),
        s.url && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: s.url, target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ e.jsx(Ae, {}),
          " View"
        ] }) }),
        m && /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", disabled: x.processing, children: [
          x.processing && /* @__PURE__ */ e.jsx(ee, { className: "cms:animate-spin" }),
          " Save"
        ] })
      ] })
    ] }),
    a.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The listing page has no fields of its own: choose a listing blueprint for the collection under Structure → Collections." }) : /* @__PURE__ */ e.jsx("fieldset", { disabled: !m, className: "cms:flex cms:flex-col cms:gap-4", children: /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsx(t.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: a.map((j) => r.includes(j.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(H, { id: `data-${j.handle}`, field: j, content: !0, value: n[j.handle], errors: {}, onChange: () => {
      } }),
      /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
        "Shared by all languages: edit it in ",
        p ? z(p) : "the main language",
        "."
      ] })
    ] }, j.handle) : /* @__PURE__ */ e.jsx(
      H,
      {
        id: `data-${j.handle}`,
        field: j,
        content: !0,
        value: x.data.data[j.handle],
        errors: F(o, `data.${j.handle}`),
        onChange: (h) => x.setData("data", { ...x.data.data, [j.handle]: h })
      },
      j.handle
    )) }) }) })
  ] });
}
function ht({ fieldsets: s }) {
  const a = f.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(D, { message: a.fieldset }),
    /* @__PURE__ */ e.jsx(
      cs,
      {
        noun: "Fieldset",
        base: w("cms/fieldsets"),
        rows: s,
        intro: "Fields shared between blueprints, and the kinds of block of flexible fields."
      }
    )
  ] });
}
function xt(s) {
  return /* @__PURE__ */ e.jsx(pt, { ...s }, `${s.locale}:${JSON.stringify(s.values)}`);
}
function pt({ set: s, fields: a, locale: l, locales: c, shared: r, values: n, can: i }) {
  const u = w(`cms/globals/${s.handle}`);
  t.useBreadcrumbs([{ label: "Globals", href: w("cms/globals") }, { label: s.title }]);
  const d = f.useForm({ locale: l, data: n }), x = d.errors, o = c[0], p = t.useEditLock({
    type: "cms.global",
    id: s.id,
    locale: l,
    enabled: i.update,
    noun: "global set",
    leaveTo: w("cms/globals"),
    getUnsaved: () => d.isDirty ? { data: d.data.data } : null
  }), m = i.update && !p.readOnly, g = () => d.processing || d.put(u, { preserveScroll: !0 }), j = async (h) => {
    const v = await p.loadKept(h);
    v.data && typeof v.data == "object" && d.setData("data", v.data);
  };
  return t.useUnsavedChanges(d.isDirty && !p.takenOver, m ? g : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: (h) => {
    h.preventDefault(), g();
  }, className: "cms:flex cms:max-w-3xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: s.title }),
    p.dialogs,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(t.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: w("cms/globals"), "aria-label": "Back to globals", children: /* @__PURE__ */ e.jsx(Q, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
        d.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        c.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: l, onValueChange: (h) => f.router.get(u, { locale: h }), children: [
          /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(t.SelectContent, { children: c.map((h, v) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: h, children: [
            z(h),
            v === 0 ? " (main)" : ""
          ] }, h)) })
        ] }),
        m && /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", disabled: d.processing, children: [
          d.processing && /* @__PURE__ */ e.jsx(ee, { className: "cms:animate-spin" }),
          " Save"
        ] })
      ] })
    ] }),
    a.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "This global set has no fields: choose a blueprint for it under Structure → Global sets." }) : /* @__PURE__ */ e.jsxs("fieldset", { disabled: !m, className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(t.ViewingNotice, { by: p.viewingBy }),
      /* @__PURE__ */ e.jsx(t.KeptEditsNotice, { kept: p.kept, disabled: !m, onLoad: (h) => {
        j(h);
      }, onDiscard: (h) => {
        p.discardKept(h);
      } }),
      /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsx(t.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: a.map((h) => r.includes(h.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(H, { id: `data-${h.handle}`, field: h, content: !0, value: n[h.handle], errors: {}, onChange: () => {
        } }),
        /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
          "Shared by all languages: edit it in ",
          o ? z(o) : "the main language",
          "."
        ] })
      ] }, h.handle) : /* @__PURE__ */ e.jsx(
        H,
        {
          id: `data-${h.handle}`,
          field: h,
          content: !0,
          value: d.data.data[h.handle],
          errors: F(x, `data.${h.handle}`),
          onChange: (v) => d.setData("data", { ...d.data.data, [h.handle]: v })
        },
        h.handle
      )) }) })
    ] })
  ] });
}
function gt({ sets: s }) {
  return t.useBreadcrumbs([{ label: "Globals" }]), /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: "Globals" }),
    /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Globals" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Values the whole site uses, like contact details and footer text." })
    ] }),
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no global sets yet. Create one under Structure → Global sets." }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:sm:grid-cols-2 cms:lg:grid-cols-3", children: s.map((a) => /* @__PURE__ */ e.jsx(f.Link, { href: w(`cms/globals/${a.handle}`), className: "cms:rounded-xl cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none", children: /* @__PURE__ */ e.jsxs(t.Card, { className: "cms:h-full cms:transition-colors cms:hover:bg-accent", children: [
      /* @__PURE__ */ e.jsxs(t.CardHeader, { children: [
        /* @__PURE__ */ e.jsx(t.CardTitle, { className: "cms:text-base", children: a.title }),
        /* @__PURE__ */ e.jsx(t.CardDescription, { children: a.blueprint ? /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: a.handle }) : "No blueprint yet: choose one under Structure → Global sets." })
      ] }),
      /* @__PURE__ */ e.jsx(t.CardContent, {})
    ] }) }, a.handle)) })
  ] });
}
let rs = 0;
function is(s, a = 0) {
  return s.flatMap(({ children: l, ...c }) => [{ ...c, key: `m${++rs}`, depth: a }, ...is(l ?? [], a + 1)]);
}
function jt(s) {
  const a = [], l = [{ depth: -1, children: a }];
  for (const { key: c, depth: r, ...n } of s) {
    for (; l.length > 1 && l[l.length - 1].depth >= r; ) l.pop();
    const i = { ...n, children: [] };
    l[l.length - 1].children.push(i), l.push({ depth: r, children: i.children });
  }
  return a;
}
function Y(s, a) {
  const l = s[a]?.depth ?? 0;
  let c = a + 1;
  for (; c < s.length && s[c].depth > l; ) c++;
  return c;
}
function os(s, a, l) {
  const c = Y(s, a);
  return s.map((r, n) => n >= a && n < c ? { ...r, depth: r.depth + l } : r);
}
function ft(s, a, l) {
  const c = s[a], r = s[a - 1];
  return !c || !r || c.depth > r.depth || Math.max(...s.slice(a, Y(s, a)).map((i) => i.depth)) + 1 > l - 1 ? s : os(s, a, 1);
}
function bt(s, a) {
  return (s[a]?.depth ?? 0) === 0 ? s : os(s, a, -1);
}
function ge(s, a, l) {
  const c = s[a];
  if (!c) return s;
  const r = Y(s, a), n = s.slice(a, r);
  if (l === -1) {
    let d = a - 1;
    for (; d >= 0 && s[d].depth > c.depth; ) d--;
    return d < 0 || s[d].depth !== c.depth ? s : [...s.slice(0, d), ...n, ...s.slice(d, a), ...s.slice(r)];
  }
  const i = s[r];
  if (!i || i.depth !== c.depth) return s;
  const u = Y(s, r);
  return [...s.slice(0, a), ...s.slice(r, u), ...n, ...s.slice(u)];
}
function vt(s, a) {
  return [...s.slice(0, a), ...s.slice(Y(s, a))];
}
function je(s) {
  return { key: `m${++rs}`, depth: 0, entry_id: null, entry: null, url: null, labels: {}, new_tab: !1, ...s };
}
function Nt({ menu: s, items: a, locales: l, limits: c, can: r }) {
  const n = w(`cms/menus/${s.handle}`);
  t.useBreadcrumbs([{ label: "Menus", href: w("cms/menus") }, { label: s.title }]);
  const [i, u] = S.useState(() => is(a)), [d, x] = S.useState(null), o = f.useForm({ items: a }), p = o.errors, [m, g] = S.useState(!1), j = l[0] ?? "en", h = (k) => {
    u(k), g(!0);
  }, v = (k, b) => h(i.map((C, $) => $ === k ? { ...C, ...b } : C)), T = () => {
    o.processing || (o.transform(() => ({ items: jt(i).map(ds) })), o.put(n, { preserveScroll: !0, onSuccess: () => g(!1) }));
  }, N = (k) => {
    k.preventDefault(), T();
  };
  return t.useUnsavedChanges(m, r.update ? T : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: N, className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: s.title }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(t.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: w("cms/menus"), "aria-label": "Back to menus", children: /* @__PURE__ */ e.jsx(Q, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
        m && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      r.update && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", disabled: i.length >= c.items, onClick: () => x("entry"), children: [
          /* @__PURE__ */ e.jsx(R, {}),
          " Entry"
        ] }),
        /* @__PURE__ */ e.jsxs(t.Button, { type: "button", variant: "outline", disabled: i.length >= c.items, onClick: () => x("url"), children: [
          /* @__PURE__ */ e.jsx(_s, {}),
          " Link"
        ] }),
        /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", disabled: o.processing, children: [
          o.processing && /* @__PURE__ */ e.jsx(ee, { className: "cms:animate-spin" }),
          " Save"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(D, { message: p.items }),
    Object.keys(p).some((k) => k.startsWith("items.")) && /* @__PURE__ */ e.jsxs("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: [
      "Some links need fixing: ",
      Object.values(p).filter(Boolean)[0]
    ] }),
    /* @__PURE__ */ e.jsx(t.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs("ul", { className: "cms:divide-y", children: [
      i.length === 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-6 cms:text-center cms:text-muted-foreground", children: "No links yet. Add an entry or a link." }),
      i.map((k, b) => /* @__PURE__ */ e.jsxs("li", { className: "cms:flex cms:flex-col cms:gap-2 cms:p-3", style: { paddingLeft: `${0.75 + k.depth * 2}rem` }, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(
            t.Input,
            {
              "aria-label": `Label (${z(j)})`,
              className: "cms:max-w-xs",
              disabled: !r.update,
              placeholder: k.entry?.title ?? "Label",
              value: k.labels[j] ?? "",
              onChange: (C) => v(b, { labels: { ...k.labels, [j]: C.target.value } })
            }
          ),
          /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:text-sm cms:text-muted-foreground", children: k.entry_id !== null ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            k.entry?.collection,
            ": ",
            k.entry?.title ?? `Entry #${k.entry_id}`,
            " ",
            k.entry && !k.entry.live && /* @__PURE__ */ e.jsx(t.Badge, { variant: "outline", children: "Not on the site" })
          ] }) : k.url }),
          r.update && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center", children: [
            /* @__PURE__ */ e.jsxs("label", { className: "cms:mr-2 cms:flex cms:items-center cms:gap-1.5 cms:text-sm", children: [
              /* @__PURE__ */ e.jsx(t.Checkbox, { checked: k.new_tab, onCheckedChange: (C) => v(b, { new_tab: C }) }),
              " New tab"
            ] }),
            /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Out a level", disabled: k.depth === 0, onClick: () => h(bt(i, b)), children: /* @__PURE__ */ e.jsx(Ts, {}) }),
            /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "In a level", onClick: () => h(ft(i, b, c.depth)), children: /* @__PURE__ */ e.jsx(Bs, {}) }),
            /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move up", onClick: () => h(ge(i, b, -1)), children: /* @__PURE__ */ e.jsx(G, {}) }),
            /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move down", onClick: () => h(ge(i, b, 1)), children: /* @__PURE__ */ e.jsx(q, {}) }),
            /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": "Remove, with what's under it", onClick: () => h(vt(i, b)), children: /* @__PURE__ */ e.jsx(M, {}) })
          ] })
        ] }),
        l.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: l.slice(1).map((C) => /* @__PURE__ */ e.jsx(
          t.Input,
          {
            "aria-label": `Label (${z(C)})`,
            className: "cms:max-w-xs",
            disabled: !r.update,
            placeholder: `${z(C)}: as ${z(j)}`,
            value: k.labels[C] ?? "",
            onChange: ($) => v(b, { labels: { ...k.labels, [C]: $.target.value } })
          },
          C
        )) })
      ] }, k.key))
    ] }) }),
    /* @__PURE__ */ e.jsx(yt, { kind: d, onClose: () => x(null), onAdd: (k) => {
      h([...i, k]), x(null);
    }, main: j })
  ] });
}
function ds({ entry: s, children: a, ...l }) {
  return { ...l, children: a.map(ds) };
}
function yt({ kind: s, onClose: a, onAdd: l, main: c }) {
  const [r, n] = S.useState(null), [i, u] = S.useState(""), [d, x] = S.useState("");
  S.useEffect(() => {
    n(null), u(""), x("");
  }, [s]);
  const o = i.trim() === "" || Vs(i.trim()), p = async () => {
    if (s === "entry" && r !== null) {
      const m = await fetch(`${w("cms/entry-picker")}?${as({ ids: [r], collections: [] })}`, { headers: { Accept: "application/json" }, credentials: "same-origin" }), g = m.ok ? (await m.json()).items[0] : void 0;
      l(je({ entry_id: r, entry: g ? { title: g.title, collection: g.collection, live: g.status === "published" } : null, labels: d ? { [c]: d } : {} }));
    } else s === "url" && i.trim() !== "" && o && d.trim() !== "" && l(je({ url: i.trim(), labels: { [c]: d.trim() } }));
  };
  return /* @__PURE__ */ e.jsx(t.Dialog, { open: s !== null, onOpenChange: (m) => !m && a(), children: /* @__PURE__ */ e.jsxs(t.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(t.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(t.DialogTitle, { children: s === "entry" ? "Link to an entry" : "Link to an address" }),
      /* @__PURE__ */ e.jsx(t.DialogDescription, { children: s === "entry" ? "It follows the entry: its title (unless you give a label) and its address in each language. It shows only while the entry is on the site." : "A web address, a path on this site (/contact), mailto: or tel:." })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
      s === "entry" ? /* @__PURE__ */ e.jsx(
        ie,
        {
          id: "menu-entry",
          value: r,
          multiple: !1,
          max: null,
          collections: [],
          invalid: !1,
          onChange: (m) => n(typeof m == "number" ? m : null)
        }
      ) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: "menu-url", children: "Address" }),
        /* @__PURE__ */ e.jsx(
          t.Input,
          {
            id: "menu-url",
            value: i,
            placeholder: "https://… or /contact",
            "aria-invalid": !o,
            onChange: (m) => u(m.target.value)
          }
        ),
        !o && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "This address could run code; use https://, a path, mailto: or tel:." })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(t.Label, { htmlFor: "menu-label", children: [
          "Label",
          s === "entry" ? " (optional)" : ""
        ] }),
        /* @__PURE__ */ e.jsx(t.Input, { id: "menu-label", value: d, onChange: (m) => x(m.target.value) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(t.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "outline", onClick: a, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(
        t.Button,
        {
          type: "button",
          onClick: () => {
            p();
          },
          disabled: s === "entry" ? r === null : i.trim() === "" || !o || d.trim() === "",
          children: "Add"
        }
      )
    ] })
  ] }) });
}
function Ct({ menus: s }) {
  return t.useBreadcrumbs([{ label: "Menus" }]), /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: "Menus" }),
    /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Menus" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Navigation for the site: the main menu, the footer…" })
    ] }),
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no menus yet. Create one under Structure → Menus." }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:sm:grid-cols-2 cms:lg:grid-cols-3", children: s.map((a) => /* @__PURE__ */ e.jsx(f.Link, { href: w(`cms/menus/${a.handle}`), className: "cms:rounded-xl cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none", children: /* @__PURE__ */ e.jsxs(t.Card, { className: "cms:h-full cms:transition-colors cms:hover:bg-accent", children: [
      /* @__PURE__ */ e.jsxs(t.CardHeader, { children: [
        /* @__PURE__ */ e.jsx(t.CardTitle, { className: "cms:text-base", children: a.title }),
        /* @__PURE__ */ e.jsx(t.CardDescription, { children: /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: a.handle }) })
      ] }),
      /* @__PURE__ */ e.jsx(t.CardContent, {})
    ] }) }, a.handle)) })
  ] });
}
const kt = 3;
function wt({ form: s, forms: a, submissions: l, can: c }) {
  t.useBreadcrumbs([{ label: "Submissions", href: w("cms/submissions") }, ...s ? [{ label: s.title }] : []]);
  const [r, n] = S.useState(null), [i, u] = K();
  if (!s || !l)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(f.Head, { title: "Submissions" }),
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Submissions" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no forms yet. Create one under Structure → Forms and put it on a page; what visitors send shows up here." })
    ] });
  const d = (l.data[0]?.rows ?? []).slice(0, kt), x = (o) => i(
    "Delete this submission for good? It can't be restored.",
    () => f.router.delete(w(`cms/submissions/${o.id}`), { preserveScroll: !0, onSuccess: () => n(null) })
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: `${s.title} submissions` }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
        a.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: s.handle, onValueChange: (o) => f.router.get(w(`cms/forms/${o}/submissions`)), children: [
          /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-56", "aria-label": "Form", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(t.SelectContent, { children: a.map((o) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: o.handle, children: [
            o.title,
            " (",
            o.count,
            ")"
          ] }, o.handle)) })
        ] })
      ] }),
      l.total > 0 && /* @__PURE__ */ e.jsx(t.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: w(`cms/forms/${s.handle}/submissions/export`), children: [
        /* @__PURE__ */ e.jsx(Me, {}),
        " Export CSV"
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsx(t.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(t.Table, { children: [
      /* @__PURE__ */ e.jsx(t.TableHeader, { children: /* @__PURE__ */ e.jsxs(t.TableRow, { children: [
        /* @__PURE__ */ e.jsx(t.TableHead, { children: "Sent" }),
        d.map((o) => /* @__PURE__ */ e.jsx(t.TableHead, { children: o.label }, o.handle))
      ] }) }),
      /* @__PURE__ */ e.jsxs(t.TableBody, { children: [
        l.data.length === 0 && /* @__PURE__ */ e.jsx(t.TableRow, { children: /* @__PURE__ */ e.jsx(t.TableCell, { colSpan: d.length + 1, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: "Nothing sent yet." }) }),
        l.data.map((o) => /* @__PURE__ */ e.jsxs(t.TableRow, { children: [
          /* @__PURE__ */ e.jsx(t.TableCell, { className: "cms:whitespace-nowrap", children: /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:font-medium cms:hover:underline", onClick: () => n(o), children: X(o.createdAt) }) }),
          d.map((p) => /* @__PURE__ */ e.jsx(t.TableCell, { className: "cms:max-w-64 cms:truncate", children: o.rows.find((m) => m.handle === p.handle)?.value }, p.handle))
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
          t.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Previous page",
            disabled: !l.prev_page_url,
            onClick: () => l.prev_page_url && f.router.get(l.prev_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(Te, {})
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
    /* @__PURE__ */ e.jsx(t.Dialog, { open: r !== null, onOpenChange: (o) => !o && n(null), children: /* @__PURE__ */ e.jsxs(t.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto", children: [
      /* @__PURE__ */ e.jsxs(t.DialogHeader, { children: [
        /* @__PURE__ */ e.jsx(t.DialogTitle, { children: s.title }),
        /* @__PURE__ */ e.jsxs(t.DialogDescription, { children: [
          "Sent ",
          X(r?.createdAt ?? null),
          " · ",
          r?.locale.toUpperCase()
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-3 cms:text-sm", children: r?.rows.map((o) => /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: o.label }),
        /* @__PURE__ */ e.jsx("dd", { className: "cms:whitespace-pre-wrap cms:break-words cms:text-muted-foreground", children: o.value || "—" })
      ] }, o.handle)) }),
      c.delete && r && /* @__PURE__ */ e.jsx(t.DialogFooter, { children: /* @__PURE__ */ e.jsxs(t.Button, { variant: "destructive", onClick: () => x(r), children: [
        /* @__PURE__ */ e.jsx(M, {}),
        " Delete"
      ] }) })
    ] }) }),
    u
  ] });
}
const ne = "__top";
function St({ taxonomy: s, taxonomies: a, terms: l, locales: c, locale: r }) {
  t.useBreadcrumbs([{ label: "Terms", href: w("cms/terms") }, ...s ? [{ label: s.title }] : []]);
  const [n, i] = K(), [u, d] = S.useState(null);
  if (!s)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(f.Head, { title: "Terms" }),
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Terms" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no taxonomies yet. Create one under Structure → Taxonomies (categories, tags…), then add its terms here." })
    ] });
  const x = w(`cms/taxonomies/${s.handle}/terms`);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: s.title }),
    i,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
      a.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: s.handle, onValueChange: (o) => f.router.get(w(`cms/taxonomies/${o}/terms`)), children: [
        /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": "Taxonomy", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(t.SelectContent, { children: a.map((o) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: o.handle, children: o.title }, o.handle)) })
      ] }),
      c.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: r, onValueChange: (o) => f.router.get(x, { locale: o }), children: [
        /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:ml-auto cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(t.SelectContent, { children: c.map((o) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: o, children: z(o) }, o)) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(t.Card, { children: /* @__PURE__ */ e.jsx(t.CardContent, { children: /* @__PURE__ */ e.jsx(
      fe,
      {
        action: x,
        method: "post",
        locale: r,
        terms: l,
        hierarchical: s.hierarchical,
        submitLabel: "Add term"
      },
      `new-${l.length}`
    ) }) }),
    /* @__PURE__ */ e.jsx(t.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs("ul", { className: "cms:divide-y", children: [
      l.length === 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-6 cms:text-center cms:text-muted-foreground", children: "No terms yet." }),
      l.map((o) => {
        const p = l.filter((g) => g.parentId === o.parentId), m = p.findIndex((g) => g.id === o.id);
        return /* @__PURE__ */ e.jsx("li", { className: "cms:p-3", style: { paddingLeft: `${0.75 + o.depth * 1.5}rem` }, children: u === o.id ? /* @__PURE__ */ e.jsx(
          fe,
          {
            action: w(`cms/terms/${o.id}`),
            method: "put",
            locale: r,
            terms: l,
            hierarchical: s.hierarchical,
            term: o,
            submitLabel: "Save",
            onDone: () => d(null)
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
              disabled: m === 0,
              onClick: () => f.router.post(w(`cms/terms/${o.id}/move`), { direction: "up" }, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(G, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            t.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-label": `Move ${o.fallback} down`,
              disabled: m === p.length - 1,
              onClick: () => f.router.post(w(`cms/terms/${o.id}/move`), { direction: "down" }, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(q, {})
            }
          ),
          /* @__PURE__ */ e.jsx(t.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Edit ${o.fallback}`, onClick: () => d(o.id), children: /* @__PURE__ */ e.jsx(zs, {}) }),
          /* @__PURE__ */ e.jsx(
            t.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Delete ${o.fallback}`,
              onClick: () => n(
                `Delete "${o.fallback}" in every language? Terms under it move up a level.`,
                () => f.router.delete(w(`cms/terms/${o.id}`), { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(M, {})
            }
          )
        ] }) }, o.id);
      })
    ] }) })
  ] });
}
function fe({ action: s, method: a, locale: l, terms: c, hierarchical: r, term: n, submitLabel: i, onDone: u }) {
  const d = f.useForm({ title: n?.title ?? "", slug: n?.slug ?? "", parent_id: n?.parentId ?? null, locale: l }), x = d.errors, o = /* @__PURE__ */ new Set();
  if (n) {
    o.add(n.id);
    const g = c.findIndex((j) => j.id === n.id);
    for (let j = g + 1; j < c.length && (c[j]?.depth ?? 0) > n.depth; j++) o.add(c[j].id);
  }
  const p = (g) => {
    g.preventDefault(), d.submit(a, s, { preserveScroll: !0, onSuccess: () => {
      a === "post" && d.reset("title", "slug"), u?.();
    } });
  }, m = n ? `term-${n.id}` : "new-term";
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: p, className: "cms:grid cms:items-start cms:gap-3 cms:md:grid-cols-[2fr_1.5fr_1.5fr_auto]", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${m}-title`, className: n ? "cms:sr-only" : "", children: "Title" }),
      /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: `${m}-title`,
          value: d.data.title,
          placeholder: n?.fallback,
          required: !0,
          onChange: (g) => d.setData("title", g.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(D, { message: x.title })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${m}-slug`, className: n ? "cms:sr-only" : "", children: "Slug" }),
      /* @__PURE__ */ e.jsx(
        t.Input,
        {
          id: `${m}-slug`,
          className: "cms:font-mono",
          value: d.data.slug,
          placeholder: "Made from the title",
          onChange: (g) => d.setData("slug", g.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(D, { message: x.slug })
    ] }),
    r ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `${m}-parent`, className: n ? "cms:sr-only" : "", children: "Under" }),
      /* @__PURE__ */ e.jsxs(
        t.Select,
        {
          value: d.data.parent_id === null ? ne : String(d.data.parent_id),
          onValueChange: (g) => d.setData("parent_id", g === ne ? null : Number(g)),
          children: [
            /* @__PURE__ */ e.jsx(t.SelectTrigger, { id: `${m}-parent`, children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(t.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(t.SelectItem, { value: ne, children: "Top level" }),
              c.filter((g) => !o.has(g.id)).map((g) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: String(g.id), children: [
                "— ".repeat(g.depth),
                g.title ?? g.fallback
              ] }, g.id))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ e.jsx(D, { message: x.parent_id })
    ] }) : /* @__PURE__ */ e.jsx("div", {}),
    /* @__PURE__ */ e.jsxs("div", { className: `cms:flex cms:gap-2 ${n ? "" : "cms:md:mt-6"}`, children: [
      /* @__PURE__ */ e.jsxs(t.Button, { type: "submit", disabled: d.processing, children: [
        !n && /* @__PURE__ */ e.jsx(R, {}),
        " ",
        i
      ] }),
      u && /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "ghost", onClick: u, children: "Cancel" })
    ] })
  ] });
}
xs({
  pages: {
    "Cms/Blueprints/Index": at,
    "Cms/Blueprints/Form": tt,
    "Cms/Fieldsets/Index": ht,
    "Cms/Entries/Index": dt,
    "Cms/Entries/Editor": nt,
    "Cms/Entries/Listing": mt,
    "Cms/Terms/Index": St,
    "Cms/Globals/Index": gt,
    "Cms/Globals/Edit": xt,
    "Cms/Menus/Index": Ct,
    "Cms/Menus/Edit": Nt,
    "Cms/Submissions/Index": wt
  }
});
export {
  _s as L,
  S as R,
  Ms as U,
  $t as _,
  w as a,
  _ as c,
  Vs as i,
  e as j,
  t as u
};
