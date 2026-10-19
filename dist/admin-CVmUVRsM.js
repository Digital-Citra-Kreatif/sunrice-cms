function rs(s, t) {
  for (var l = 0; l < t.length; l++) {
    const c = t[l];
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
const ce = 1;
function pe() {
  const s = globalThis.Sunrice;
  if (!s)
    throw new Error("[sunrice] This script runs outside the Sunrice admin panel (window.Sunrice is missing).");
  return s;
}
function is(s) {
  const t = pe();
  if (t.version !== ce)
    throw new Error(`[sunrice] This plugin was built for admin runtime ${ce}, but the panel runs ${t.version}. Rebuild it with a matching @sunrice/admin-sdk.`);
  for (const [l, c] of Object.entries(s.pages ?? {}))
    t.registerPage(l, c);
}
function w(s = "") {
  return pe().adminUrl(s);
}
const ge = globalThis.Sunrice;
if (!ge) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const e = ge.modules["react/jsx-runtime"], je = globalThis.Sunrice;
if (!je) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const C = je.modules.react, ft = /* @__PURE__ */ rs({
  __proto__: null
}, [C]), fe = globalThis.Sunrice;
if (!fe) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const f = fe.modules["@inertiajs/react"];
const os = (s) => s?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
function ds(s, t, l = []) {
  if (t == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: os(s),
    size: 24,
    node: t,
    ...l.length > 0 ? { aliases: l } : {}
  };
}
const ms = (s) => {
  let t = "", l = !1;
  for (const c of s) {
    if (c === "-" || c === "_" || c <= " ") {
      l = t.length > 0;
      continue;
    }
    t.length === 0 ? t += c.toLowerCase() : t += l ? c.toUpperCase() : c, l = !1;
  }
  return t;
};
const us = (s) => {
  const t = ms(s);
  return t.charAt(0).toUpperCase() + t.slice(1);
};
const ae = (...s) => s.filter((t, l, c) => !!t && t.trim() !== "" && c.indexOf(t) === l).join(" ").trim();
const E = {
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
function ee(s) {
  return s != null;
}
function hs(s, t = {}) {
  const l = t.attributeNames ?? {}, c = (o) => l[o] ?? o, r = s.size ?? s.width ?? E.width, n = s.size ?? s.height ?? E.height, i = s.aliases?.filter((o) => typeof o == "string" && o.trim() !== "").map((o) => `lucide-${o}`) ?? [], d = [...s.name ? [`lucide-${s.name}`] : [], ...i], m = t.className?.split(" ").filter(Boolean) ?? [], h = t.includeDefaultClasses === !1 ? ae(...m) : ae("lucide", ...d, ...m), u = t.absoluteStrokeWidth ? Number(t.strokeWidth ?? E["stroke-width"]) * Number(s.size ?? s.width ?? E.width) / Number(t.size ?? t.width ?? E.width) : t.strokeWidth ?? E["stroke-width"];
  return [
    "svg",
    {
      ...Object.entries(E).reduce((o, [p, b]) => (o[c(p)] = b, o), {}),
      ..."color" in t && t.color && {
        [c("stroke")]: t.color
      },
      ..."size" in t && ee(t.size) && {
        [c("width")]: t.size,
        [c("height")]: t.size
      },
      ..."width" in t && ee(t.width) && {
        [c("width")]: t.width
      },
      ..."height" in t && ee(t.height) && {
        [c("height")]: t.height
      },
      [c("stroke-width")]: u,
      ...h && {
        [c("class")]: h
      },
      [c("viewBox")]: `0 0 ${r} ${n}`,
      ...t.hasA11yProp === !1 ? {
        [c("aria-hidden")]: "true"
      } : {},
      ..."attributes" in t && t.attributes
    },
    s.node.map((o) => {
      const [p, b, g] = o, v = t.nonScalingStroke ? { [c("vector-effect")]: "non-scaling-stroke", ...b } : b;
      return g ? [p, v, g] : [p, v];
    })
  ];
}
function xs(s, t = {}) {
  return hs(s, {
    ...t,
    attributeNames: {
      ...t.attributeNames,
      class: "className",
      "stroke-width": "strokeWidth",
      "stroke-linecap": "strokeLinecap",
      "stroke-linejoin": "strokeLinejoin",
      "vector-effect": "vectorEffect"
    }
  });
}
const ps = (s) => {
  for (const t in s)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
  return !1;
}, gs = C.createContext({}), js = () => C.useContext(gs), fs = C.forwardRef(
  ({
    color: s,
    size: t,
    width: l,
    height: c,
    strokeWidth: r,
    absoluteStrokeWidth: n,
    nonScalingStroke: i,
    className: d = "",
    children: m,
    iconNode: h = [],
    icon: u = {
      node: h,
      aliases: [],
      size: 24
    },
    ...x
  }, o) => {
    const {
      size: p = 24,
      strokeWidth: b = 2,
      absoluteStrokeWidth: g = !1,
      nonScalingStroke: v = !1,
      color: N = "currentColor",
      className: B = ""
    } = js() ?? {}, y = !!m || ps(x), [j, S, $ = []] = xs(u, {
      color: s ?? N,
      width: l ?? t ?? p,
      height: c ?? t ?? p,
      strokeWidth: r ?? b,
      absoluteStrokeWidth: n ?? g,
      nonScalingStroke: i ?? v,
      className: ae(B, d),
      hasA11yProp: y,
      attributes: x
    });
    return C.createElement(
      j,
      {
        ref: o,
        ...S
      },
      [
        ...$.map(([T, I]) => C.createElement(T, I)),
        ...Array.isArray(m) ? m : [m]
      ]
    );
  }
);
function D(s, t = [], l = []) {
  const c = typeof s == "string" ? ds(s, t, l) : s, r = C.forwardRef(
    ({ className: n, ...i }, d) => C.createElement(fs, {
      ref: d,
      icon: c,
      className: n,
      ...i
    })
  );
  return c.name && (r.displayName = us(c.name)), r;
}
const be = {
  name: "arrow-down",
  size: 24,
  node: [
    ["path", { d: "M12 5v14", key: "s699le" }],
    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
  ]
};
be.node;
const G = D(be);
const ve = {
  name: "arrow-left",
  size: 24,
  node: [
    ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
    ["path", { d: "M19 12H5", key: "x3x0zl" }]
  ]
};
ve.node;
const J = D(ve);
const Ne = {
  name: "arrow-up",
  size: 24,
  node: [
    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
    ["path", { d: "M12 19V5", key: "x0mq9r" }]
  ]
};
Ne.node;
const K = D(Ne);
const ye = {
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
ye.node;
const bs = D(ye);
const Ce = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
Ce.node;
const ke = D(Ce);
const we = {
  name: "chevron-left",
  size: 24,
  node: [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]]
};
we.node;
const Se = D(we);
const $e = {
  name: "chevron-right",
  size: 24,
  node: [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]
};
$e.node;
const le = D($e);
const _e = {
  name: "copy",
  size: 24,
  node: [
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
  ]
};
_e.node;
const vs = D(_e);
const De = {
  name: "download",
  size: 24,
  node: [
    ["path", { d: "M12 15V3", key: "m9g1x1" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
  ]
};
De.node;
const Te = D(De);
const Be = {
  name: "external-link",
  size: 24,
  node: [
    ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
    ["path", { d: "M10 14 21 3", key: "gplh6r" }],
    ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
  ]
};
Be.node;
const Ns = D(Be);
const ze = {
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
ze.node;
const ys = D(ze);
const Le = {
  name: "link-2",
  size: 24,
  node: [
    ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
    ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
    ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
  ]
};
Le.node;
const Cs = D(Le);
const Ie = {
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
Ie.node;
const ks = D(Ie);
const Me = {
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
Me.node;
const ws = D(Me);
const Ae = {
  name: "loader-circle",
  size: 24,
  node: [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  aliases: ["loader-2"]
};
Ae.node;
const Z = D(Ae);
const Ee = {
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
Ee.node;
const Ss = D(Ee);
const Fe = {
  name: "plus",
  size: 24,
  node: [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ]
};
Fe.node;
const A = D(Fe);
const He = {
  name: "rotate-ccw",
  size: 24,
  node: [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ]
};
He.node;
const $s = D(He);
const Re = {
  name: "search",
  size: 24,
  node: [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ]
};
Re.node;
const Pe = D(Re);
const Oe = {
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
Oe.node;
const L = D(Oe);
const Ue = {
  name: "undo-2",
  size: 24,
  node: [
    ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
    ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
  ]
};
Ue.node;
const _s = D(Ue);
const Ve = {
  name: "x",
  size: 24,
  node: [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]
};
Ve.node;
const Ds = D(Ve), qe = globalThis.Sunrice;
if (!qe) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const a = qe.modules["@sunrice/admin-sdk/ui"];
function U() {
  const [s, t] = C.useState(null), l = /* @__PURE__ */ e.jsx(a.Dialog, { open: s !== null, onOpenChange: (c) => !c && t(null), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: "Are you sure?" }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: s?.message })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: () => t(null), children: "Cancel" }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "destructive", onClick: () => {
        s?.onConfirm(), t(null);
      }, children: "Delete" })
    ] })
  ] }) });
  return [(c, r) => t({ message: c, onConfirm: r }), l];
}
const Ts = 5;
let Bs = 0;
const We = () => `f${++Bs}`;
function Ge(s) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function Ke(s, t) {
  const l = new Set(t.map((n) => n.handle)), c = Ge(s) || "field";
  let r = c;
  for (let n = 2; l.has(r); n++)
    r = `${c}_${n}`;
  return r;
}
function Je(s) {
  return (s ?? []).map(({ fields: t, ...l }) => ({
    ...l,
    key: We(),
    fields: Je(t),
    handleTouched: !0
  }));
}
function Ze(s, t) {
  return s.map(({ key: l, handleTouched: c, fields: r, ...n }) => ({
    ...n,
    validation: (n.validation ?? []).map((i) => i.trim()).filter((i) => i !== ""),
    ...t(n.type) ? { fields: Ze(r, t) } : {}
  }));
}
function zs(s, t, l) {
  return { key: We(), type: s, label: t, handle: Ke(t, l), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function R(s, t, l) {
  const c = t + l;
  if (t < 0 || t >= s.length || c < 0 || c >= s.length) return s;
  const r = s.slice(), [n] = r.splice(t, 1);
  return r.splice(c, 0, n), r;
}
function Ls(s, t, l) {
  if (s.handleTouched) return { ...s, label: t };
  const c = l.filter((r) => r.key !== s.key);
  return { ...s, label: t, handle: Ke(t || s.type, c) };
}
function X(s, t) {
  const l = `${t}.`, c = {};
  for (const [r, n] of Object.entries(s))
    r.startsWith(l) && (c[r.slice(l.length)] = n);
  return c;
}
function H(s, t) {
  const l = s[t];
  return { ...X(s, t), ...l !== void 0 ? { "": l } : {} };
}
function re(s, t) {
  return Object.keys(s).some((l) => l === t || l.startsWith(`${t}.`));
}
function V(s) {
  return s && typeof s == "object" && !Array.isArray(s) ? s : {};
}
function Is(s, t) {
  if (typeof s != "string" || s === "") return "";
  const l = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(s);
  return l ? t ? `${l[1]}T${l[2] ?? "00:00"}` : l[1] ?? "" : "";
}
function Ms(s) {
  return s === "" ? null : s;
}
function As() {
  return { _hidden: !1 };
}
function Es(s) {
  return { type: s, hidden: !1, values: {} };
}
function Fs(s) {
  const t = s.replace(/[\u0000- \u007f]+/g, ""), l = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(t);
  return l ? ["http", "https", "mailto", "tel"].includes(l[1].toLowerCase()) : !t.includes("\\");
}
function Xe({ ids: s, search: t, collections: l }) {
  const c = new URLSearchParams();
  for (const r of s ?? []) c.append("ids[]", String(r));
  t && c.set("search", t);
  for (const r of l) c.append("collections[]", r);
  return c.toString();
}
function P(s) {
  return { draft: "Draft", scheduled: "Scheduled", published: "Published" }[s];
}
function q(s, t) {
  if (!s) return "—";
  const l = new Date(s);
  return Number.isNaN(l.getTime()) ? "—" : l.toLocaleString(t, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
function Hs(s) {
  const t = (l) => String(l).padStart(2, "0");
  return `${s.getFullYear()}-${t(s.getMonth() + 1)}-${t(s.getDate())}T${t(s.getHours())}:${t(s.getMinutes())}`;
}
function z(s, t) {
  try {
    return new Intl.DisplayNames(t ? [t] : void 0, { type: "language" }).of(s.replace("_", "-")) ?? s;
  } catch {
    return s;
  }
}
async function ie(s) {
  const t = await fetch(`${w("cms/entry-picker")}?${Xe(s)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!t.ok) throw new Error(String(t.status));
  return (await t.json()).items;
}
function Ye({ id: s, value: t, multiple: l, max: c, collections: r, invalid: n, onChange: i }) {
  const d = t === null ? [] : Array.isArray(t) ? t : [t], [m, h] = C.useState({}), [u, x] = C.useState(""), [o, p] = C.useState(null), [b, g] = C.useState(!1), v = l && c !== null && d.length >= c, N = d.filter((j) => !m[j]).join(",");
  C.useEffect(() => {
    N !== "" && ie({ ids: N.split(",").map(Number), collections: r }).then((j) => h((S) => ({ ...S, ...Object.fromEntries(j.map(($) => [$.id, $])) }))).catch(() => g(!0));
  }, [N]), C.useEffect(() => {
    if (u.trim() === "") {
      p(null);
      return;
    }
    const j = window.setTimeout(() => {
      ie({ search: u.trim(), collections: r }).then((S) => {
        p(S), g(!1);
      }).catch(() => g(!0));
    }, 250);
    return () => window.clearTimeout(j);
  }, [u]);
  const B = (j) => {
    h((S) => ({ ...S, [j.id]: j })), i(l ? [...d, j.id] : j.id), x("");
  }, y = (j) => i(l ? j : j[0] ?? null);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    d.length > 0 && /* @__PURE__ */ e.jsx("ul", { className: "cms:flex cms:flex-col cms:gap-1", children: d.map((j, S) => {
      const $ = m[j];
      return /* @__PURE__ */ e.jsxs("li", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-md cms:border cms:px-3 cms:py-1.5 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate", children: $ ? $.title : `Entry #${j}` }),
        $ && /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: $.collection }),
        $ && /* @__PURE__ */ e.jsx(a.Badge, { variant: $.status === "published" ? "default" : "secondary", children: P($.status) }),
        l && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-7",
              "aria-label": `Move ${$?.title ?? j} up`,
              disabled: S === 0,
              onClick: () => y(R(d, S, -1)),
              children: /* @__PURE__ */ e.jsx(K, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-7",
              "aria-label": `Move ${$?.title ?? j} down`,
              disabled: S === d.length - 1,
              onClick: () => y(R(d, S, 1)),
              children: /* @__PURE__ */ e.jsx(G, {})
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            type: "button",
            variant: "ghost",
            size: "icon",
            className: "cms:size-7",
            "aria-label": `Remove ${$?.title ?? j}`,
            onClick: () => y(d.filter((T) => T !== j)),
            children: /* @__PURE__ */ e.jsx(Ds, {})
          }
        )
      ] }, j);
    }) }),
    !v && (l || d.length === 0) && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-md", children: [
      /* @__PURE__ */ e.jsx(Pe, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: s,
          className: "cms:pl-9",
          placeholder: "Search entries by title",
          "aria-invalid": n,
          value: u,
          autoComplete: "off",
          onChange: (j) => x(j.target.value)
        }
      ),
      o !== null && /* @__PURE__ */ e.jsxs("ul", { role: "listbox", "aria-label": "Matching entries", className: "cms:absolute cms:z-10 cms:mt-1 cms:max-h-64 cms:w-full cms:overflow-auto cms:rounded-md cms:border cms:bg-card cms:p-1 cms:shadow-md", children: [
        o.filter((j) => !d.includes(j.id)).length === 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: "No entries match." }),
        o.filter((j) => !d.includes(j.id)).map((j) => /* @__PURE__ */ e.jsx("li", { role: "option", "aria-selected": !1, children: /* @__PURE__ */ e.jsxs(
          "button",
          {
            type: "button",
            className: "cms:flex cms:w-full cms:items-center cms:gap-2 cms:rounded cms:px-2 cms:py-1.5 cms:text-left cms:text-sm cms:hover:bg-accent",
            onClick: () => B(j),
            children: [
              /* @__PURE__ */ e.jsx("span", { className: "cms:flex-1 cms:truncate", children: j.title }),
              /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: j.collection })
            ]
          }
        ) }, j.id))
      ] })
    ] }),
    b && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "Entries could not be loaded. Try again." })
  ] });
}
const Rs = C.lazy(() => import("./RichTextEditor-Ct2rhR5F.js").then((s) => ({ default: s.RichTextEditor }))), se = "__none";
function _({ message: s }) {
  return s ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: s }) : null;
}
function oe(s) {
  const t = s.config?.options;
  return Array.isArray(t) ? t.flatMap((l) => {
    if (typeof l == "string") return [{ value: l, label: l }];
    if (l && typeof l == "object" && typeof l.value == "string") {
      const { value: c, label: r } = l;
      return [{ value: c, label: r || c }];
    }
    return [];
  }) : [];
}
const Ps = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function Os(s) {
  if (s.label) return s.label;
  const t = s.handle.replace(/_/g, " ");
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function O({ field: s, value: t, onChange: l, errors: c, id: r, content: n = !1 }) {
  const i = Os(s), d = Ps.includes(s.type) || ["select", "terms"].includes(s.type) && s.config?.multiple === !0;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", ...d ? { role: "group", "aria-labelledby": `${r}-label` } : {}, children: [
    s.type === "toggle" ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(a.Switch, { id: r, checked: t === !0, onCheckedChange: (m) => l(m) }),
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: r, children: i })
    ] }) : /* @__PURE__ */ e.jsxs(a.Label, { id: `${r}-label`, htmlFor: d ? void 0 : r, children: [
      i,
      s.required && /* @__PURE__ */ e.jsx("span", { className: "cms:text-destructive", children: " *" })
    ] }),
    /* @__PURE__ */ e.jsx(Us, { field: s, value: t, onChange: l, errors: c, id: r, content: n }),
    s.instructions && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s.instructions }),
    /* @__PURE__ */ e.jsx(_, { message: c[""] })
  ] });
}
function Us({ field: s, value: t, onChange: l, errors: c, id: r, content: n }) {
  const i = c[""] !== void 0;
  switch (s.type) {
    case "toggle":
      return null;
    case "textarea":
      return /* @__PURE__ */ e.jsx(
        a.Textarea,
        {
          id: r,
          "aria-invalid": i,
          value: typeof t == "string" ? t : "",
          rows: F(s, "rows") ?? 4,
          onChange: (d) => l(d.target.value)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ e.jsx(C.Suspense, { fallback: /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-48 cms:w-full" }), children: /* @__PURE__ */ e.jsx(Rs, { id: r, labelledBy: `${r}-label`, invalid: i, value: typeof t == "string" ? t : "", onChange: l }) });
    case "number":
      return /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: r,
          type: "number",
          className: "cms:max-w-48",
          "aria-invalid": i,
          value: typeof t == "number" ? String(t) : typeof t == "string" ? t : "",
          min: F(s, "min"),
          max: F(s, "max"),
          step: F(s, "step") ?? "any",
          onChange: (d) => l(d.target.value === "" ? null : Number(d.target.value))
        }
      );
    case "date": {
      const d = s.config?.time === !0;
      return /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: r,
          type: d ? "datetime-local" : "date",
          className: "cms:max-w-64",
          "aria-invalid": i,
          value: Is(t, d),
          onChange: (m) => l(Ms(m.target.value))
        }
      );
    }
    case "select":
      return s.config?.multiple === !0 ? /* @__PURE__ */ e.jsx(me, { options: oe(s), value: Array.isArray(t) ? t.map(String) : [], onChange: l }) : /* @__PURE__ */ e.jsx(de, { options: oe(s), value: typeof t == "string" ? t : null, onChange: l, id: r, required: s.required === !0 });
    case "terms": {
      const d = s.terms ?? [];
      if (s.config?.multiple === !0) {
        const m = Array.isArray(t) ? t.map(String) : [];
        return /* @__PURE__ */ e.jsx(me, { options: d, value: m, onChange: (h) => l(h.map(Number)) });
      }
      return /* @__PURE__ */ e.jsx(
        de,
        {
          options: d,
          id: r,
          required: s.required === !0,
          value: t == null ? null : String(t),
          onChange: (m) => l(m === null ? null : Number(m))
        }
      );
    }
    case "entries":
      return /* @__PURE__ */ e.jsx(
        Ye,
        {
          id: r,
          invalid: i,
          multiple: s.config?.multiple === !0,
          max: F(s, "max") ?? null,
          collections: s.collections ?? [],
          onChange: l,
          value: typeof t == "number" || Array.isArray(t) && t.every((d) => typeof d == "number") ? t : null
        }
      );
    case "link":
      return /* @__PURE__ */ e.jsx(qs, { value: V(t), onChange: l, errors: c, id: r });
    case "media":
      return /* @__PURE__ */ e.jsx(
        a.MediaPickerInput,
        {
          id: r,
          invalid: i,
          disabled: !1,
          multiple: s.config?.multiple === !0,
          max: F(s, "max") ?? null,
          types: Array.isArray(s.config?.types) ? s.config.types : [],
          value: typeof t == "number" || Array.isArray(t) && t.every((d) => typeof d == "number") ? t : null,
          onChange: l
        }
      );
    case "group":
      return /* @__PURE__ */ e.jsx(Y, { fields: s.fields ?? [], value: V(t), onChange: l, errors: c, id: r, content: n });
    case "repeater":
      return /* @__PURE__ */ e.jsx(Gs, { field: s, value: Array.isArray(t) ? t : [], onChange: l, errors: c, id: r, content: n });
    case "flexible":
      return /* @__PURE__ */ e.jsx(Ks, { field: s, value: Array.isArray(t) ? t : [], onChange: l, errors: c, id: r });
    default:
      return /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: r,
          "aria-invalid": i,
          value: typeof t == "string" ? t : "",
          placeholder: Vs(s, "placeholder"),
          maxLength: F(s, "max"),
          onChange: (d) => l(d.target.value)
        }
      );
  }
}
function F(s, t) {
  const l = s.config?.[t];
  return typeof l == "number" ? l : void 0;
}
function Vs(s, t) {
  const l = s.config?.[t];
  return typeof l == "string" ? l : void 0;
}
function Y({ fields: s, value: t, onChange: l, errors: c, id: r, content: n }) {
  return /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-4 cms:rounded-lg cms:border cms:p-4", children: s.map((i) => /* @__PURE__ */ e.jsx(
    O,
    {
      id: `${r}-${i.handle}`,
      field: i,
      value: t[i.handle],
      content: n,
      errors: H(c, i.handle),
      onChange: (d) => l({ ...t, [i.handle]: d })
    },
    i.handle
  )) });
}
function de({ options: s, value: t, onChange: l, id: c, required: r }) {
  return /* @__PURE__ */ e.jsxs(a.Select, { value: t ?? se, onValueChange: (n) => l(n === se ? null : n), children: [
    /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: c, className: "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
    /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
      !r && /* @__PURE__ */ e.jsx(a.SelectItem, { value: se, children: "None" }),
      s.map((n) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: n.value, children: n.label }, n.value))
    ] })
  ] });
}
function me({ options: s, value: t, onChange: l }) {
  return s.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Nothing to choose from yet." }) : /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2", children: s.map((c) => /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
    /* @__PURE__ */ e.jsx(
      a.Checkbox,
      {
        checked: t.includes(c.value),
        onCheckedChange: (r) => l(r ? s.map((n) => n.value).filter((n) => n === c.value || t.includes(n)) : t.filter((n) => n !== c.value))
      }
    ),
    c.label
  ] }, c.value)) });
}
function qs({ value: s, onChange: t, errors: l, id: c }) {
  const r = (n, i) => {
    const d = { ...s, [n]: i };
    t(d.url === "" || d.url === void 0 ? null : d);
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-2 cms:md:grid-cols-[2fr_1fr_auto] cms:md:items-center", children: [
    /* @__PURE__ */ e.jsx(
      a.Input,
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
      a.Input,
      {
        "aria-label": "Link text",
        placeholder: "Link text",
        value: typeof s.label == "string" ? s.label : "",
        onChange: (n) => r("label", n.target.value)
      }
    ),
    /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
      /* @__PURE__ */ e.jsx(a.Checkbox, { checked: s.new_tab === !0, onCheckedChange: (n) => r("new_tab", n) }),
      "New tab"
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ e.jsx(_, { message: l.url ?? l.label }) })
  ] });
}
function Ws(s, t) {
  return !t && (s.fields ?? []).every((l) => l.type === "text");
}
function Gs({ field: s, value: t, onChange: l, errors: c, id: r, content: n = !1 }) {
  const i = s.fields ?? [], d = t.map(V), m = (x, o) => l(d.map((p, b) => b === x ? o : p)), h = (s.label || "row").toLowerCase().replace(/s$/, ""), u = h.charAt(0).toUpperCase() + h.slice(1);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    d.map((x, o) => Ws(s, n) ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
      i.map((p) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            "aria-label": p.label || p.handle,
            placeholder: p.label || p.handle,
            value: typeof x[p.handle] == "string" ? x[p.handle] : "",
            onChange: (b) => m(o, { ...x, [p.handle]: b.target.value })
          }
        ),
        /* @__PURE__ */ e.jsx(_, { message: c[`${o}.${p.handle}`] })
      ] }, p.handle)),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": `Remove ${h} ${o + 1}`, onClick: () => l(d.filter((p, b) => b !== o)), children: /* @__PURE__ */ e.jsx(L, {}) })
    ] }, o) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(
        Qe,
        {
          label: `${u} ${o + 1}`,
          index: o,
          count: d.length,
          onMove: (p) => l(R(d, o, p)),
          onRemove: () => l(d.filter((p, b) => b !== o)),
          hidden: n ? x._hidden === !0 : void 0,
          onHidden: (p) => m(o, { ...x, _hidden: p })
        }
      ),
      /* @__PURE__ */ e.jsx(Y, { fields: i, value: x, onChange: (p) => m(o, p), errors: H(c, String(o)), id: `${r}-${o}`, content: n })
    ] }, typeof x._id == "string" ? x._id : o)),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => l([...d, n ? As() : {}]), children: [
      /* @__PURE__ */ e.jsx(A, {}),
      " Add ",
      h
    ] }) })
  ] });
}
function Ks({ field: s, value: t, onChange: l, errors: c, id: r }) {
  const n = s.blocks ?? [], i = t.map(V), d = (m, h) => l(i.map((u, x) => x === m ? h : u));
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    i.map((m, h) => {
      const u = n.find((x) => x.type === m.type);
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(
          Qe,
          {
            label: u?.label ?? String(m.type),
            badge: !0,
            index: h,
            count: i.length,
            onMove: (x) => l(R(i, h, x)),
            onRemove: () => l(i.filter((x, o) => o !== h)),
            hidden: m.hidden === !0,
            onHidden: (x) => d(h, { ...m, hidden: x })
          }
        ),
        u ? /* @__PURE__ */ e.jsx(
          Y,
          {
            fields: u.fields,
            value: V(m.values),
            onChange: (x) => d(h, { ...m, values: x }),
            errors: H(c, `${h}.values`),
            id: `${r}-${h}`,
            content: !0
          }
        ) : /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: "This kind of block no longer exists. Its values are kept." }),
        /* @__PURE__ */ e.jsx(_, { message: c[`${h}.type`] })
      ] }, typeof m.id == "string" ? m.id : h);
    }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", disabled: n.length === 0, children: [
        /* @__PURE__ */ e.jsx(A, {}),
        " Add block"
      ] }) }),
      /* @__PURE__ */ e.jsx(a.DropdownMenuContent, { align: "start", children: n.map((m) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => l([...i, Es(m.type)]), children: m.label }, m.type)) })
    ] }) })
  ] });
}
function Qe({ label: s, badge: t = !1, index: l, count: c, onMove: r, onRemove: n, hidden: i, onHidden: d }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    t ? /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: s }) : /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:font-medium", children: s }),
    i !== void 0 && /* @__PURE__ */ e.jsxs("label", { className: "cms:ml-auto cms:flex cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", children: [
      /* @__PURE__ */ e.jsx(a.Switch, { checked: !i, onCheckedChange: (m) => d(!m), "aria-label": `Show ${s}` }),
      "Show"
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: i === void 0 ? "cms:ml-auto cms:flex" : "cms:flex", children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Move ${s} up`, disabled: l === 0, onClick: () => r(-1), children: /* @__PURE__ */ e.jsx(K, {}) }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Move ${s} down`, disabled: l === c - 1, onClick: () => r(1), children: /* @__PURE__ */ e.jsx(G, {}) }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": `Remove ${s}`, onClick: n, children: /* @__PURE__ */ e.jsx(L, {}) })
    ] })
  ] });
}
function es({ fields: s, onChange: t, types: l, errors: c, depth: r = 1, idPrefix: n = "field" }) {
  const [i, d] = C.useState(() => /* @__PURE__ */ new Set()), m = (x) => d((o) => {
    const p = new Set(o);
    return p.has(x) ? p.delete(x) : p.add(x), p;
  }), h = (x, o) => t(s.map((p, b) => b === x ? o : p)), u = (x) => {
    const o = zs(x.type, x.label, s);
    t([...s, o]), d((p) => new Set(p).add(o.key));
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:border-dashed cms:p-4 cms:text-sm cms:text-muted-foreground", children: "No fields yet." }),
    s.map((x, o) => {
      const p = l.find((v) => v.type === x.type), b = i.has(x.key) || re(c, String(o)), g = `${n}-${x.key}`;
      return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${re(c, String(o)) ? "cms:border-destructive" : ""}`, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:p-2", children: [
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-expanded": b,
              "aria-controls": g,
              "aria-label": `${b ? "Close" : "Open"} ${x.label || x.handle}`,
              onClick: () => m(x.key),
              children: b ? /* @__PURE__ */ e.jsx(ke, {}) : /* @__PURE__ */ e.jsx(le, {})
            }
          ),
          /* @__PURE__ */ e.jsxs("button", { type: "button", className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:text-left", onClick: () => m(x.key), children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: x.label || x.handle }),
            /* @__PURE__ */ e.jsx("code", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", children: x.handle })
          ] }),
          x.required && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", children: "Required" }),
          /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: p?.label ?? x.type }),
          /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move up", disabled: o === 0, onClick: () => t(R(s, o, -1)), children: /* @__PURE__ */ e.jsx(K, {}) }),
          /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move down", disabled: o === s.length - 1, onClick: () => t(R(s, o, 1)), children: /* @__PURE__ */ e.jsx(G, {}) }),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Remove ${x.label || x.handle}`,
              onClick: () => t(s.filter((v, N) => N !== o)),
              children: /* @__PURE__ */ e.jsx(L, {})
            }
          )
        ] }),
        b && /* @__PURE__ */ e.jsx(
          Js,
          {
            id: g,
            field: x,
            type: p,
            siblings: s,
            onChange: (v) => h(o, v),
            types: l,
            errors: X(c, String(o)),
            depth: r
          }
        )
      ] }, x.key);
    }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", children: [
        /* @__PURE__ */ e.jsx(A, {}),
        " Add field"
      ] }) }),
      /* @__PURE__ */ e.jsx(a.DropdownMenuContent, { align: "start", children: l.filter((x) => !x.hasChildren || r < Ts).map((x) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => u(x), children: x.label }, x.type)) })
    ] }) })
  ] });
}
const M = { default: "__default", yes: "yes", no: "no" };
function Js({ id: s, field: t, type: l, siblings: c, onChange: r, types: n, errors: i, depth: d }) {
  const m = t.config ?? {};
  return /* @__PURE__ */ e.jsxs("div", { id: s, className: "cms:flex cms:flex-col cms:gap-4 cms:border-t cms:p-4", children: [
    !l && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-destructive", children: [
      'The field type "',
      t.type,
      `" isn't registered. Its data is kept; register the type or remove the field.`
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-label`, children: "Label" }),
        /* @__PURE__ */ e.jsx(a.Input, { id: `${s}-label`, value: t.label ?? "", onChange: (h) => r(Ls(t, h.target.value, c)) }),
        /* @__PURE__ */ e.jsx(_, { message: i.label })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-handle`, children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: `${s}-handle`,
            className: "cms:font-mono",
            value: t.handle,
            onChange: (h) => r({ ...t, handle: h.target.value, handleTouched: !0 })
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "How templates read it. Renaming it hides values saved under the old one." }),
        /* @__PURE__ */ e.jsx(_, { message: i.handle })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-instructions`, children: "Instructions" }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: `${s}-instructions`,
          value: t.instructions ?? "",
          placeholder: "Shown under the field to editors",
          onChange: (h) => r({ ...t, instructions: h.target.value || null })
        }
      ),
      /* @__PURE__ */ e.jsx(_, { message: i.instructions })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-6", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Switch, { id: `${s}-required`, checked: t.required === !0, onCheckedChange: (h) => r({ ...t, required: h }) }),
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-required`, children: "Required" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-translatable`, children: "Per language" }),
        /* @__PURE__ */ e.jsxs(
          a.Select,
          {
            value: t.translatable === !0 ? M.yes : t.translatable === !1 ? M.no : M.default,
            onValueChange: (h) => r({ ...t, translatable: h === M.yes ? !0 : h === M.no ? !1 : null }),
            children: [
              /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: `${s}-translatable`, className: "cms:w-48", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
              /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: M.default, children: "As the type decides" }),
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: M.yes, children: "Yes, translated" }),
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: M.no, children: "No, shared" })
              ] })
            ]
          }
        )
      ] })
    ] }),
    (l?.settings.length ?? 0) > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: l?.settings.map((h) => /* @__PURE__ */ e.jsx(
      O,
      {
        id: `${s}-config-${h.handle}`,
        field: h,
        value: m[h.handle],
        errors: H(i, `config.${h.handle}`),
        onChange: (u) => r({ ...t, config: { ...m, [h.handle]: u } })
      },
      h.handle
    )) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-validation`, children: "Extra rules" }),
      /* @__PURE__ */ e.jsx(
        a.Textarea,
        {
          id: `${s}-validation`,
          rows: 2,
          className: "cms:font-mono",
          placeholder: `min:3
regex:/^[A-Z]/`,
          value: (t.validation ?? []).join(`
`),
          onChange: (h) => r({ ...t, validation: h.target.value.split(`
`) })
        }
      ),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Laravel rules, one per line." }),
      /* @__PURE__ */ e.jsx(_, { message: i.validation ?? Object.entries(i).find(([h]) => h.startsWith("validation."))?.[1] })
    ] }),
    l?.hasChildren && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { children: "Fields inside" }),
      /* @__PURE__ */ e.jsx(
        es,
        {
          fields: t.fields,
          onChange: (h) => r({ ...t, fields: h }),
          types: n,
          errors: X(i, "fields"),
          depth: d + 1,
          idPrefix: s
        }
      ),
      /* @__PURE__ */ e.jsx(_, { message: i.fields })
    ] }),
    /* @__PURE__ */ e.jsx(_, { message: i.type })
  ] });
}
function Zs({ kind: s = "blueprint", blueprint: t, fieldTypes: l, usedBy: c = [] }) {
  const r = s === "fieldset" ? "Fieldset" : "Blueprint", n = w(s === "fieldset" ? "cms/fieldsets" : "cms/blueprints"), i = t ? t.title : `New ${r.toLowerCase()}`;
  a.useBreadcrumbs([{ label: `${r}s`, href: n }, { label: i }]);
  const [d, m] = U(), h = f.useForm({ title: t?.title ?? "", handle: t?.handle ?? "" }), [u, x] = C.useState(t !== null), [o, p] = C.useState(() => Je(t?.fields)), b = (T) => l.find((I) => I.type === T)?.hasChildren === !0, g = h.errors, [v, N] = C.useState(() => JSON.stringify(o)), B = h.isDirty || JSON.stringify(o) !== v, y = () => {
    h.setDefaults(), N(JSON.stringify(o));
  }, j = () => {
    h.processing || (h.transform((T) => ({
      ...t ? { title: T.title } : T,
      fields: Ze(o, b)
    })), t ? h.put(`${n}/${t.id}`, { preserveScroll: !0, onSuccess: y }) : h.post(n, { onSuccess: y }));
  }, S = (T) => {
    T.preventDefault(), j();
  };
  a.useUnsavedChanges(B, j);
  const $ = () => t && d(
    `Delete the ${r.toLowerCase()} "${t.title}"? Content keeps its values.`,
    () => f.router.delete(`${n}/${t.id}`, { preserveScroll: !0 })
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: S, className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: i }),
    m,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: n, "aria-label": `Back to ${r.toLowerCase()}s`, children: /* @__PURE__ */ e.jsx(J, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: i })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        t && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "icon", className: "cms:text-destructive", "aria-label": `Delete ${i}`, onClick: $, children: /* @__PURE__ */ e.jsx(L, {}) }),
        /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: h.processing, children: [
          h.processing && /* @__PURE__ */ e.jsx(Z, { className: "cms:animate-spin" }),
          t ? "Save" : `Create ${r.toLowerCase()}`
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(_, { message: g.blueprint ?? g.fieldset }),
    /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "title", children: "Title" }),
        /* @__PURE__ */ e.jsx(a.Input, { id: "title", value: h.data.title, required: !0, onChange: (T) => {
          h.setData((I) => ({ ...I, title: T.target.value, handle: u ? I.handle : Ge(T.target.value) }));
        } }),
        /* @__PURE__ */ e.jsx(_, { message: g.title })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "handle", children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: "handle",
            className: "cms:font-mono",
            value: h.data.handle,
            disabled: t !== null,
            required: !0,
            onChange: (T) => {
              x(!0), h.setData("handle", T.target.value);
            }
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t ? "Set when it was created." : "Lowercase letters, digits and underscores. It can't change later." }),
        /* @__PURE__ */ e.jsx(_, { message: g.handle })
      ] })
    ] }) }),
    c.length > 0 && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      "Used by ",
      c.join(", "),
      ". Changes show there at once."
    ] }),
    /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-3", "aria-labelledby": "fields-heading", children: [
      /* @__PURE__ */ e.jsx("h2", { id: "fields-heading", className: "cms:text-lg cms:font-medium", children: "Fields" }),
      /* @__PURE__ */ e.jsx(es, { fields: o, onChange: p, types: l, errors: X(g, "fields") }),
      /* @__PURE__ */ e.jsx(_, { message: g.fields })
    ] })
  ] });
}
function ss({ noun: s, base: t, rows: l, intro: c }) {
  const r = `${s}s`;
  a.useBreadcrumbs([{ label: r }]);
  const [n, i] = U();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: r }),
    i,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: r }),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: c })
      ] }),
      /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(f.Link, { href: `${t}/create`, children: [
        /* @__PURE__ */ e.jsx(A, {}),
        " New ",
        s.toLowerCase()
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsx(a.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(a.Table, { children: [
      /* @__PURE__ */ e.jsx(a.TableHeader, { children: /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Title" }),
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Handle" }),
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Fields" }),
        l.some((d) => d.usedBy) && /* @__PURE__ */ e.jsx(a.TableHead, { children: "Used by" }),
        /* @__PURE__ */ e.jsx(a.TableHead, { className: "cms:w-12", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: "Actions" }) })
      ] }) }),
      /* @__PURE__ */ e.jsxs(a.TableBody, { children: [
        l.length === 0 && /* @__PURE__ */ e.jsx(a.TableRow, { children: /* @__PURE__ */ e.jsxs(a.TableCell, { colSpan: 5, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: [
          "No ",
          r.toLowerCase(),
          " yet."
        ] }) }),
        l.map((d) => /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx(f.Link, { href: `${t}/${d.id}/edit`, className: "cms:font-medium cms:hover:underline", children: d.title }) }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: d.handle }) }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: d.fields }),
          d.usedBy && /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:text-muted-foreground", children: d.usedBy.join(", ") || "—" }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx(
            a.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Delete ${d.title}`,
              onClick: () => n(
                `Delete the ${s.toLowerCase()} "${d.title}"? Content keeps its values.`,
                () => f.router.delete(`${t}/${d.id}`, { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(L, {})
            }
          ) })
        ] }, d.id))
      ] })
    ] }) })
  ] });
}
function Xs({ blueprints: s }) {
  const t = f.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(_, { message: t.blueprint }),
    /* @__PURE__ */ e.jsx(
      ss,
      {
        noun: "Blueprint",
        base: w("cms/blueprints"),
        rows: s,
        intro: "The fields editors fill in, for each kind of content."
      }
    )
  ] });
}
const Ys = [
  { handle: "title", type: "text", label: "SEO title", instructions: "For search results and tabs. Empty: the title.", config: { max: 255 } },
  { handle: "description", type: "textarea", label: "Description", instructions: "A sentence or two for search results and shared links.", config: { max: 500 } },
  { handle: "image", type: "media", label: "Share image", instructions: "Shown when the page is shared.", config: { types: ["image"] } },
  { handle: "noindex", type: "toggle", label: "Hide from search engines" }
];
function Qs(s) {
  const { entry: t } = s;
  return /* @__PURE__ */ e.jsx(et, { ...s }, t ? `${t.id}:${t.locale}:${t.version}:${t.status}:${t.trashed}:${t.publishedAt}` : "new");
}
function et({ collection: s, fields: t, locales: l = [], shared: c = [], sharedValues: r = {}, entry: n, values: i, revisions: d, undoRestore: m = null, can: h }) {
  const u = w(`cms/collections/${s.handle}/entries`), x = n ? w(`cms/entries/${n.id}`) : u, o = n ? i.title : "New entry";
  a.useBreadcrumbs([{ label: s.title, href: u }, { label: o }]);
  const [p, b] = U(), [g, v] = C.useState(!1), N = f.useForm({ ...i, seo: i.seo ?? {}, locale: n?.locale ?? null, version: n?.version ?? null, publish: !1, published_at: null }), B = n ? { locale: n.locale } : {}, y = l.find((k) => k.main)?.code, j = N.errors, S = n !== null && n.status !== "draft" && !n.hasUnpublishedChanges && !N.isDirty, $ = n === null ? h.create : h.update && !n.trashed, T = (k = !1, Q = null) => {
    N.transform((cs) => ({ ...cs, publish: k, published_at: Q })), n ? N.put(x, { preserveScroll: !0, onSuccess: () => v(!1) }) : N.post(x);
  }, I = () => {
    N.transform((k) => ({ ...k, version: null, publish: !1, published_at: null })), N.put(x, { preserveScroll: !0 });
  };
  a.useUnsavedChanges(N.isDirty, $ ? () => N.processing || T() : void 0);
  const ne = (k = null) => {
    h.update ? T(!0, k) : n && f.router.post(`${x}/publish`, { ...B, published_at: k }, { preserveScroll: !0, onSuccess: () => v(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (k) => {
    k.preventDefault(), T();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: o }),
    b,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: u, "aria-label": `Back to ${s.title}`, children: /* @__PURE__ */ e.jsx(J, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: o }),
        n && /* @__PURE__ */ e.jsx(a.Badge, { variant: n.status === "published" ? "default" : "secondary", children: n.trashed ? "In the trash" : P(n.status) }),
        N.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        n && !n.trashed && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(
          "a",
          {
            href: n.previewUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            title: N.isDirty ? "Shows the saved draft: save first to see your changes." : "Shows the saved draft.",
            children: [
              /* @__PURE__ */ e.jsx(ys, {}),
              " Preview"
            ]
          }
        ) }),
        n?.url && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: n.url, target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ e.jsx(Ns, {}),
          " View"
        ] }) }),
        n?.trashed && h.delete && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", onClick: () => f.router.post(`${x}/restore`, {}, { preserveScroll: !0 }), children: [
          /* @__PURE__ */ e.jsx($s, {}),
          " Restore"
        ] }),
        n?.trashed && h.delete && /* @__PURE__ */ e.jsxs(
          a.Button,
          {
            type: "button",
            variant: "outline",
            className: "cms:text-destructive",
            onClick: () => p(`Delete "${i.title}" for good, in every language, with its revisions? This can't be undone.`, () => f.router.delete(`${x}/force`)),
            children: [
              /* @__PURE__ */ e.jsx(L, {}),
              " Delete for good"
            ]
          }
        ),
        n && !n.trashed && h.create && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "ghost", title: "Copy every language as a new draft", onClick: () => f.router.post(`${x}/duplicate`), children: [
          /* @__PURE__ */ e.jsx(vs, {}),
          " Duplicate"
        ] }),
        n && !n.trashed && h.delete && /* @__PURE__ */ e.jsx(
          a.Button,
          {
            type: "button",
            variant: "outline",
            size: "icon",
            className: "cms:text-destructive",
            "aria-label": "Move to the trash",
            onClick: () => p(`Move "${i.title}" to the trash? It comes off the site; you can restore it.`, () => f.router.delete(x)),
            children: /* @__PURE__ */ e.jsx(L, {})
          }
        ),
        $ && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", variant: n && h.publish ? "outline" : "default", disabled: N.processing, children: [
          N.processing && /* @__PURE__ */ e.jsx(Z, { className: "cms:animate-spin" }),
          n ? "Save draft" : "Create draft"
        ] }),
        n && !n.trashed && h.publish && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex", children: [
          /* @__PURE__ */ e.jsx(a.Button, { type: "button", className: "cms:rounded-r-none", disabled: N.processing || S, onClick: () => ne(), children: n.status === "draft" ? "Publish" : S ? "Published" : "Publish changes" }),
          /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "icon", className: "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": "More publishing options", children: /* @__PURE__ */ e.jsx(ke, {}) }) }),
            /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", children: [
              /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { onSelect: () => v(!0), children: [
                /* @__PURE__ */ e.jsx(bs, {}),
                " Publish on a date…"
              ] }),
              n.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
                /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => f.router.post(`${x}/unpublish`, B, { preserveScroll: !0 }), children: "Unpublish" })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }),
    n && l.length > 1 && /* @__PURE__ */ e.jsx(
      st,
      {
        entryUrl: x,
        current: n.locale,
        locales: l,
        canAdd: h.create && !n.trashed,
        canRemove: h.delete && !n.isMain && !n.trashed,
        onRemove: () => p(
          `Remove the ${z(n.locale)} translation of "${i.title}"? Its revisions go with it.`,
          () => f.router.delete(`${x}/translations/${n.locale}`)
        )
      }
    ),
    j.version && /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: [
      /* @__PURE__ */ e.jsx("span", { children: j.version }),
      /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => f.router.reload(), children: "Load theirs" }),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            type: "button",
            variant: "destructive",
            size: "sm",
            disabled: N.processing,
            onClick: () => p("Save your version over theirs? Their changes are replaced (their earlier published versions stay in the revisions).", I),
            children: "Save mine anyway"
          }
        )
      ] })
    ] }),
    (j.entry || j.published_at) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: j.entry ?? j.published_at }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_18rem]", children: [
      /* @__PURE__ */ e.jsxs("fieldset", { disabled: !$, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-[2fr_1fr]", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "title", children: "Title" }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "title",
                value: N.data.title,
                "aria-invalid": j.title !== void 0,
                onChange: (k) => N.setData("title", k.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(_, { message: j.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "slug", children: "Slug" }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "slug",
                className: "cms:font-mono",
                value: N.data.slug,
                placeholder: "Made from the title",
                "aria-invalid": j.slug !== void 0,
                onChange: (k) => N.setData("slug", k.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(_, { message: j.slug })
          ] })
        ] }) }),
        t.length > 0 && /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsx(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: t.map((k) => c.includes(k.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
          /* @__PURE__ */ e.jsx(O, { id: `data-${k.handle}`, field: k, content: !0, value: r[k.handle], errors: {}, onChange: () => {
          } }),
          /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
            "Shared by all languages: edit it in ",
            y ? z(y) : "the main language",
            "."
          ] })
        ] }, k.handle) : /* @__PURE__ */ e.jsx(
          O,
          {
            id: `data-${k.handle}`,
            field: k,
            content: !0,
            value: N.data.data[k.handle],
            errors: H(j, `data.${k.handle}`),
            onChange: (Q) => N.setData("data", { ...N.data.data, [k.handle]: Q })
          },
          k.handle
        )) }) }),
        /* @__PURE__ */ e.jsxs(a.Card, { children: [
          /* @__PURE__ */ e.jsx(a.CardHeader, { children: /* @__PURE__ */ e.jsx(a.CardTitle, { className: "cms:text-base", children: "Search and sharing" }) }),
          /* @__PURE__ */ e.jsx(a.CardContent, { children: /* @__PURE__ */ e.jsx(
            Y,
            {
              id: "seo",
              fields: Ys,
              value: N.data.seo,
              errors: H(j, "seo"),
              onChange: (k) => N.setData("seo", k)
            }
          ) })
        ] })
      ] }),
      n && /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:flex-col cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs(a.Card, { children: [
          /* @__PURE__ */ e.jsx(a.CardHeader, { children: /* @__PURE__ */ e.jsx(a.CardTitle, { className: "cms:text-base", children: "Status" }) }),
          /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
            /* @__PURE__ */ e.jsxs("p", { children: [
              P(n.status),
              n.status !== "draft" && n.publishedAt ? ` · ${q(n.publishedAt)}` : ""
            ] }),
            n.status !== "draft" && n.hasUnpublishedChanges && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The draft has changes the site doesn't show yet." })
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs(a.Card, { children: [
          /* @__PURE__ */ e.jsx(a.CardHeader, { children: /* @__PURE__ */ e.jsx(a.CardTitle, { className: "cms:text-base", children: "Revisions" }) }),
          /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
            m !== null && h.update && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => f.router.post(w(`cms/entry-translations/${m}/undo-restore`), {}, { preserveScroll: !0 }), children: [
              /* @__PURE__ */ e.jsx(_s, {}),
              " Undo the restore"
            ] }),
            d.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "Each publish keeps one." }),
            d.map((k) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
                /* @__PURE__ */ e.jsx("div", { className: "cms:truncate", children: k.title }),
                /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: q(k.createdAt) })
              ] }),
              h.update && !n.trashed && /* @__PURE__ */ e.jsx(
                a.Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  onClick: () => f.router.post(w(`cms/revisions/${k.id}/restore`), {}, { preserveScroll: !0 }),
                  children: "Restore"
                }
              )
            ] }, k.id))
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(
      tt,
      {
        open: g,
        onClose: () => v(!1),
        processing: N.processing,
        current: n?.publishedAt ?? null,
        onSchedule: (k) => ne(k)
      }
    )
  ] });
}
function st({ entryUrl: s, current: t, locales: l, canAdd: c, canRemove: r, onRemove: n }) {
  return /* @__PURE__ */ e.jsxs("nav", { "aria-label": "Languages", className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
    l.map((i) => {
      const d = `${z(i.code)}${i.main ? " (main)" : ""}`;
      return i.status === null ? c ? /* @__PURE__ */ e.jsxs(
        a.Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "cms:border-dashed",
          onClick: () => f.router.post(`${s}/translations`, { locale: i.code }),
          children: [
            /* @__PURE__ */ e.jsx(A, {}),
            " ",
            d
          ]
        },
        i.code
      ) : null : /* @__PURE__ */ e.jsxs(
        a.Button,
        {
          type: "button",
          size: "sm",
          variant: i.code === t ? "secondary" : "ghost",
          "aria-current": i.code === t ? "page" : void 0,
          onClick: () => i.code !== t && f.router.get(`${s}/edit`, { locale: i.code }),
          children: [
            d,
            /* @__PURE__ */ e.jsx(a.Badge, { variant: i.status === "published" ? "default" : "outline", className: "cms:ml-1", children: P(i.status) })
          ]
        },
        i.code
      );
    }),
    r && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:ml-auto cms:text-destructive", onClick: n, children: "Remove this language" })
  ] });
}
function tt({ open: s, onClose: t, onSchedule: l, current: c, processing: r }) {
  const [n, i] = C.useState("");
  return C.useEffect(() => {
    s && i(Hs(c ? new Date(c) : new Date(Date.now() + 864e5)));
  }, [s, c]), /* @__PURE__ */ e.jsx(a.Dialog, { open: s, onOpenChange: (d) => !d && t(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: "Publish on a date" }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: "The entry goes live then; a date in the past publishes it now with that date." })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "published-at", children: "Date and time" }),
      /* @__PURE__ */ e.jsx(a.Input, { id: "published-at", type: "datetime-local", value: n, onChange: (d) => i(d.target.value) }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "In your time zone." })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: t, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", disabled: n === "" || r, onClick: () => l(new Date(n).toISOString()), children: "Publish" })
    ] })
  ] }) });
}
function at({ collection: s, collections: t, entries: l, query: c, can: r }) {
  a.useBreadcrumbs([{ label: "Entries", href: w("cms/entries") }, ...s ? [{ label: s.title }] : []]);
  const [n, i] = C.useState(c.search), d = s ? w(`cms/collections/${s.handle}/entries`) : "", [m, h] = C.useState([]), [u, x] = U();
  C.useEffect(() => h([]), [l]);
  const o = c.trashed ? r?.delete ? [{ action: "restore", label: "Restore" }, { action: "delete", label: "Delete for good", danger: !0 }] : [] : [
    ...r?.publish ? [{ action: "publish", label: "Publish" }, { action: "unpublish", label: "Unpublish" }] : [],
    ...r?.delete ? [{ action: "trash", label: "Move to the trash", danger: !0 }] : []
  ], p = (g, v, N = !1) => {
    const B = () => f.router.post(`${d}/bulk`, { action: g, ids: m }, { preserveScroll: !0 });
    N ? u(`${v}: ${m.length} ${m.length === 1 ? "entry" : "entries"}?${g === "delete" ? " This can't be undone." : ""}`, B) : B();
  }, b = (g) => {
    const v = { ...c, ...g };
    f.router.get(
      d,
      { ...v.search ? { search: v.search } : {}, ...v.trashed ? { trashed: 1 } : {} },
      { preserveState: !0, preserveScroll: !0, replace: !0 }
    );
  };
  return C.useEffect(() => {
    if (n === c.search) return;
    const g = window.setTimeout(() => b({ search: n }), 300);
    return () => window.clearTimeout(g);
  }, [n]), !s || !l ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: "Entries" }),
    /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Entries" }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no collections yet. Create one under Structure → Collections, then come back to write its entries." })
  ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: s.title }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
        t.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: s.handle, onValueChange: (g) => f.router.get(w(`cms/collections/${g}/entries`)), children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": "Collection", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: t.map((g) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: g.handle, children: g.title }, g.handle)) })
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        l.total > 0 && !c.trashed && /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: `${d}/export`, children: [
          /* @__PURE__ */ e.jsx(Te, {}),
          " Export CSV"
        ] }) }),
        r?.create && !c.trashed && /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(f.Link, { href: `${d}/create`, children: [
          /* @__PURE__ */ e.jsx(A, {}),
          " New entry"
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-sm", children: [
        /* @__PURE__ */ e.jsx(Pe, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            className: "cms:pl-9",
            placeholder: "Search titles",
            "aria-label": "Search titles",
            value: n,
            onChange: (g) => i(g.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(a.Button, { variant: c.trashed ? "secondary" : "ghost", size: "sm", onClick: () => b({ trashed: !c.trashed }), children: c.trashed ? "Back to entries" : "Trash" }),
      m.length > 0 && o.length > 0 && /* @__PURE__ */ e.jsxs("div", { role: "toolbar", "aria-label": "Selected entries", className: "cms:ml-auto cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs("span", { className: "cms:text-sm cms:text-muted-foreground", children: [
          m.length,
          " selected"
        ] }),
        o.map((g) => /* @__PURE__ */ e.jsx(a.Button, { size: "sm", variant: g.danger ? "destructive" : "outline", onClick: () => p(g.action, g.label, g.danger), children: g.label }, g.action))
      ] })
    ] }),
    x,
    /* @__PURE__ */ e.jsx(a.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(a.Table, { children: [
      /* @__PURE__ */ e.jsx(a.TableHeader, { children: /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
        o.length > 0 && /* @__PURE__ */ e.jsx(a.TableHead, { className: "cms:w-10", children: /* @__PURE__ */ e.jsx(
          a.Checkbox,
          {
            "aria-label": "Select all on this page",
            checked: l.data.length > 0 && m.length === l.data.length,
            onCheckedChange: (g) => h(g ? l.data.map((v) => v.id) : [])
          }
        ) }),
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Title" }),
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Status" }),
        /* @__PURE__ */ e.jsx(a.TableHead, { children: s.dated ? "Date" : "Updated" })
      ] }) }),
      /* @__PURE__ */ e.jsxs(a.TableBody, { children: [
        l.data.length === 0 && /* @__PURE__ */ e.jsx(a.TableRow, { children: /* @__PURE__ */ e.jsx(a.TableCell, { colSpan: o.length > 0 ? 4 : 3, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: c.trashed ? "The trash is empty." : c.search ? "Nothing matches." : "No entries yet." }) }),
        l.data.map((g) => /* @__PURE__ */ e.jsxs(a.TableRow, { "data-state": m.includes(g.id) ? "selected" : void 0, children: [
          o.length > 0 && /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx(
            a.Checkbox,
            {
              "aria-label": `Select ${g.title}`,
              checked: m.includes(g.id),
              onCheckedChange: (v) => h(v ? [...m, g.id] : m.filter((N) => N !== g.id))
            }
          ) }),
          /* @__PURE__ */ e.jsxs(a.TableCell, { children: [
            /* @__PURE__ */ e.jsx(f.Link, { href: w(`cms/entries/${g.id}/edit`), className: "cms:font-medium cms:hover:underline", children: g.title }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
              "/",
              g.slug
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-1", children: [
            /* @__PURE__ */ e.jsx(a.Badge, { variant: g.status === "published" ? "default" : "secondary", children: P(g.status) }),
            g.locales.length > 1 && g.locales.filter((v) => !v.main).map((v) => /* @__PURE__ */ e.jsx(
              a.Badge,
              {
                variant: v.status === "published" ? "default" : "outline",
                className: v.status === null ? "cms:opacity-50" : "",
                title: `${v.code}: ${v.status === null ? "not translated" : P(v.status)}`,
                children: v.code.toUpperCase()
              },
              v.code
            ))
          ] }) }),
          /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:text-muted-foreground", children: q(s.dated ? g.publishedAt : g.updatedAt) })
        ] }, g.id))
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
          a.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Previous page",
            disabled: !l.prev_page_url,
            onClick: () => l.prev_page_url && f.router.get(l.prev_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(Se, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Next page",
            disabled: !l.next_page_url,
            onClick: () => l.next_page_url && f.router.get(l.next_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(le, {})
          }
        )
      ] })
    ] })
  ] });
}
function lt({ fieldsets: s }) {
  const t = f.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(_, { message: t.fieldset }),
    /* @__PURE__ */ e.jsx(
      ss,
      {
        noun: "Fieldset",
        base: w("cms/fieldsets"),
        rows: s,
        intro: "Fields shared between blueprints, and the kinds of block of flexible fields."
      }
    )
  ] });
}
function nt(s) {
  return /* @__PURE__ */ e.jsx(ct, { ...s }, `${s.locale}:${JSON.stringify(s.values)}`);
}
function ct({ set: s, fields: t, locale: l, locales: c, shared: r, values: n, can: i }) {
  const d = w(`cms/globals/${s.handle}`);
  a.useBreadcrumbs([{ label: "Globals", href: w("cms/globals") }, { label: s.title }]);
  const m = f.useForm({ locale: l, data: n }), h = m.errors, u = c[0], x = () => m.processing || m.put(d, { preserveScroll: !0 });
  return a.useUnsavedChanges(m.isDirty, i.update ? x : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: (o) => {
    o.preventDefault(), x();
  }, className: "cms:flex cms:max-w-3xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: s.title }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: w("cms/globals"), "aria-label": "Back to globals", children: /* @__PURE__ */ e.jsx(J, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
        m.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        c.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: l, onValueChange: (o) => f.router.get(d, { locale: o }), children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: c.map((o, p) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: o, children: [
            z(o),
            p === 0 ? " (main)" : ""
          ] }, o)) })
        ] }),
        i.update && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: m.processing, children: [
          m.processing && /* @__PURE__ */ e.jsx(Z, { className: "cms:animate-spin" }),
          " Save"
        ] })
      ] })
    ] }),
    t.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "This global set has no fields: choose a blueprint for it under Structure → Global sets." }) : /* @__PURE__ */ e.jsx("fieldset", { disabled: !i.update, children: /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsx(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: t.map((o) => r.includes(o.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(O, { id: `data-${o.handle}`, field: o, content: !0, value: n[o.handle], errors: {}, onChange: () => {
      } }),
      /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
        "Shared by all languages: edit it in ",
        u ? z(u) : "the main language",
        "."
      ] })
    ] }, o.handle) : /* @__PURE__ */ e.jsx(
      O,
      {
        id: `data-${o.handle}`,
        field: o,
        content: !0,
        value: m.data.data[o.handle],
        errors: H(h, `data.${o.handle}`),
        onChange: (p) => m.setData("data", { ...m.data.data, [o.handle]: p })
      },
      o.handle
    )) }) }) })
  ] });
}
function rt({ sets: s }) {
  return a.useBreadcrumbs([{ label: "Globals" }]), /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: "Globals" }),
    /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Globals" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Values the whole site uses, like contact details and footer text." })
    ] }),
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no global sets yet. Create one under Structure → Global sets." }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:sm:grid-cols-2 cms:lg:grid-cols-3", children: s.map((t) => /* @__PURE__ */ e.jsx(f.Link, { href: w(`cms/globals/${t.handle}`), className: "cms:rounded-xl cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none", children: /* @__PURE__ */ e.jsxs(a.Card, { className: "cms:h-full cms:transition-colors cms:hover:bg-accent", children: [
      /* @__PURE__ */ e.jsxs(a.CardHeader, { children: [
        /* @__PURE__ */ e.jsx(a.CardTitle, { className: "cms:text-base", children: t.title }),
        /* @__PURE__ */ e.jsx(a.CardDescription, { children: t.blueprint ? /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: t.handle }) : "No blueprint yet: choose one under Structure → Global sets." })
      ] }),
      /* @__PURE__ */ e.jsx(a.CardContent, {})
    ] }) }, t.handle)) })
  ] });
}
let ts = 0;
function as(s, t = 0) {
  return s.flatMap(({ children: l, ...c }) => [{ ...c, key: `m${++ts}`, depth: t }, ...as(l ?? [], t + 1)]);
}
function it(s) {
  const t = [], l = [{ depth: -1, children: t }];
  for (const { key: c, depth: r, ...n } of s) {
    for (; l.length > 1 && l[l.length - 1].depth >= r; ) l.pop();
    const i = { ...n, children: [] };
    l[l.length - 1].children.push(i), l.push({ depth: r, children: i.children });
  }
  return t;
}
function W(s, t) {
  const l = s[t]?.depth ?? 0;
  let c = t + 1;
  for (; c < s.length && s[c].depth > l; ) c++;
  return c;
}
function ls(s, t, l) {
  const c = W(s, t);
  return s.map((r, n) => n >= t && n < c ? { ...r, depth: r.depth + l } : r);
}
function ot(s, t, l) {
  const c = s[t], r = s[t - 1];
  return !c || !r || c.depth > r.depth || Math.max(...s.slice(t, W(s, t)).map((i) => i.depth)) + 1 > l - 1 ? s : ls(s, t, 1);
}
function dt(s, t) {
  return (s[t]?.depth ?? 0) === 0 ? s : ls(s, t, -1);
}
function ue(s, t, l) {
  const c = s[t];
  if (!c) return s;
  const r = W(s, t), n = s.slice(t, r);
  if (l === -1) {
    let m = t - 1;
    for (; m >= 0 && s[m].depth > c.depth; ) m--;
    return m < 0 || s[m].depth !== c.depth ? s : [...s.slice(0, m), ...n, ...s.slice(m, t), ...s.slice(r)];
  }
  const i = s[r];
  if (!i || i.depth !== c.depth) return s;
  const d = W(s, r);
  return [...s.slice(0, t), ...s.slice(r, d), ...n, ...s.slice(d)];
}
function mt(s, t) {
  return [...s.slice(0, t), ...s.slice(W(s, t))];
}
function he(s) {
  return { key: `m${++ts}`, depth: 0, entry_id: null, entry: null, url: null, labels: {}, new_tab: !1, ...s };
}
function ut({ menu: s, items: t, locales: l, limits: c, can: r }) {
  const n = w(`cms/menus/${s.handle}`);
  a.useBreadcrumbs([{ label: "Menus", href: w("cms/menus") }, { label: s.title }]);
  const [i, d] = C.useState(() => as(t)), [m, h] = C.useState(null), u = f.useForm({ items: t }), x = u.errors, [o, p] = C.useState(!1), b = l[0] ?? "en", g = (y) => {
    d(y), p(!0);
  }, v = (y, j) => g(i.map((S, $) => $ === y ? { ...S, ...j } : S)), N = () => {
    u.processing || (u.transform(() => ({ items: it(i).map(ns) })), u.put(n, { preserveScroll: !0, onSuccess: () => p(!1) }));
  }, B = (y) => {
    y.preventDefault(), N();
  };
  return a.useUnsavedChanges(o, r.update ? N : void 0), /* @__PURE__ */ e.jsxs("form", { onSubmit: B, className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: s.title }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: w("cms/menus"), "aria-label": "Back to menus", children: /* @__PURE__ */ e.jsx(J, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
        o && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      r.update && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", disabled: i.length >= c.items, onClick: () => h("entry"), children: [
          /* @__PURE__ */ e.jsx(A, {}),
          " Entry"
        ] }),
        /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", disabled: i.length >= c.items, onClick: () => h("url"), children: [
          /* @__PURE__ */ e.jsx(Cs, {}),
          " Link"
        ] }),
        /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: u.processing, children: [
          u.processing && /* @__PURE__ */ e.jsx(Z, { className: "cms:animate-spin" }),
          " Save"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(_, { message: x.items }),
    Object.keys(x).some((y) => y.startsWith("items.")) && /* @__PURE__ */ e.jsxs("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: [
      "Some links need fixing: ",
      Object.values(x).filter(Boolean)[0]
    ] }),
    /* @__PURE__ */ e.jsx(a.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs("ul", { className: "cms:divide-y", children: [
      i.length === 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-6 cms:text-center cms:text-muted-foreground", children: "No links yet. Add an entry or a link." }),
      i.map((y, j) => /* @__PURE__ */ e.jsxs("li", { className: "cms:flex cms:flex-col cms:gap-2 cms:p-3", style: { paddingLeft: `${0.75 + y.depth * 2}rem` }, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(
            a.Input,
            {
              "aria-label": `Label (${z(b)})`,
              className: "cms:max-w-xs",
              disabled: !r.update,
              placeholder: y.entry?.title ?? "Label",
              value: y.labels[b] ?? "",
              onChange: (S) => v(j, { labels: { ...y.labels, [b]: S.target.value } })
            }
          ),
          /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:text-sm cms:text-muted-foreground", children: y.entry_id !== null ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            y.entry?.collection,
            ": ",
            y.entry?.title ?? `Entry #${y.entry_id}`,
            " ",
            y.entry && !y.entry.live && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", children: "Not on the site" })
          ] }) : y.url }),
          r.update && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center", children: [
            /* @__PURE__ */ e.jsxs("label", { className: "cms:mr-2 cms:flex cms:items-center cms:gap-1.5 cms:text-sm", children: [
              /* @__PURE__ */ e.jsx(a.Checkbox, { checked: y.new_tab, onCheckedChange: (S) => v(j, { new_tab: S }) }),
              " New tab"
            ] }),
            /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Out a level", disabled: y.depth === 0, onClick: () => g(dt(i, j)), children: /* @__PURE__ */ e.jsx(ks, {}) }),
            /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "In a level", onClick: () => g(ot(i, j, c.depth)), children: /* @__PURE__ */ e.jsx(ws, {}) }),
            /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move up", onClick: () => g(ue(i, j, -1)), children: /* @__PURE__ */ e.jsx(K, {}) }),
            /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move down", onClick: () => g(ue(i, j, 1)), children: /* @__PURE__ */ e.jsx(G, {}) }),
            /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": "Remove, with what's under it", onClick: () => g(mt(i, j)), children: /* @__PURE__ */ e.jsx(L, {}) })
          ] })
        ] }),
        l.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: l.slice(1).map((S) => /* @__PURE__ */ e.jsx(
          a.Input,
          {
            "aria-label": `Label (${z(S)})`,
            className: "cms:max-w-xs",
            disabled: !r.update,
            placeholder: `${z(S)}: as ${z(b)}`,
            value: y.labels[S] ?? "",
            onChange: ($) => v(j, { labels: { ...y.labels, [S]: $.target.value } })
          },
          S
        )) })
      ] }, y.key))
    ] }) }),
    /* @__PURE__ */ e.jsx(ht, { kind: m, onClose: () => h(null), onAdd: (y) => {
      g([...i, y]), h(null);
    }, main: b })
  ] });
}
function ns({ entry: s, children: t, ...l }) {
  return { ...l, children: t.map(ns) };
}
function ht({ kind: s, onClose: t, onAdd: l, main: c }) {
  const [r, n] = C.useState(null), [i, d] = C.useState(""), [m, h] = C.useState("");
  C.useEffect(() => {
    n(null), d(""), h("");
  }, [s]);
  const u = i.trim() === "" || Fs(i.trim()), x = async () => {
    if (s === "entry" && r !== null) {
      const o = await fetch(`${w("cms/entry-picker")}?${Xe({ ids: [r], collections: [] })}`, { headers: { Accept: "application/json" }, credentials: "same-origin" }), p = o.ok ? (await o.json()).items[0] : void 0;
      l(he({ entry_id: r, entry: p ? { title: p.title, collection: p.collection, live: p.status === "published" } : null, labels: m ? { [c]: m } : {} }));
    } else s === "url" && i.trim() !== "" && u && m.trim() !== "" && l(he({ url: i.trim(), labels: { [c]: m.trim() } }));
  };
  return /* @__PURE__ */ e.jsx(a.Dialog, { open: s !== null, onOpenChange: (o) => !o && t(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: s === "entry" ? "Link to an entry" : "Link to an address" }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: s === "entry" ? "It follows the entry: its title (unless you give a label) and its address in each language. It shows only while the entry is on the site." : "A web address, a path on this site (/contact), mailto: or tel:." })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
      s === "entry" ? /* @__PURE__ */ e.jsx(
        Ye,
        {
          id: "menu-entry",
          value: r,
          multiple: !1,
          max: null,
          collections: [],
          invalid: !1,
          onChange: (o) => n(typeof o == "number" ? o : null)
        }
      ) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "menu-url", children: "Address" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: "menu-url",
            value: i,
            placeholder: "https://… or /contact",
            "aria-invalid": !u,
            onChange: (o) => d(o.target.value)
          }
        ),
        !u && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "This address could run code; use https://, a path, mailto: or tel:." })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(a.Label, { htmlFor: "menu-label", children: [
          "Label",
          s === "entry" ? " (optional)" : ""
        ] }),
        /* @__PURE__ */ e.jsx(a.Input, { id: "menu-label", value: m, onChange: (o) => h(o.target.value) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: t, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(
        a.Button,
        {
          type: "button",
          onClick: () => {
            x();
          },
          disabled: s === "entry" ? r === null : i.trim() === "" || !u || m.trim() === "",
          children: "Add"
        }
      )
    ] })
  ] }) });
}
function xt({ menus: s }) {
  return a.useBreadcrumbs([{ label: "Menus" }]), /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: "Menus" }),
    /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Menus" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Navigation for the site: the main menu, the footer…" })
    ] }),
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no menus yet. Create one under Structure → Menus." }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:sm:grid-cols-2 cms:lg:grid-cols-3", children: s.map((t) => /* @__PURE__ */ e.jsx(f.Link, { href: w(`cms/menus/${t.handle}`), className: "cms:rounded-xl cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none", children: /* @__PURE__ */ e.jsxs(a.Card, { className: "cms:h-full cms:transition-colors cms:hover:bg-accent", children: [
      /* @__PURE__ */ e.jsxs(a.CardHeader, { children: [
        /* @__PURE__ */ e.jsx(a.CardTitle, { className: "cms:text-base", children: t.title }),
        /* @__PURE__ */ e.jsx(a.CardDescription, { children: /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: t.handle }) })
      ] }),
      /* @__PURE__ */ e.jsx(a.CardContent, {})
    ] }) }, t.handle)) })
  ] });
}
const pt = 3;
function gt({ form: s, forms: t, submissions: l, can: c }) {
  a.useBreadcrumbs([{ label: "Submissions", href: w("cms/submissions") }, ...s ? [{ label: s.title }] : []]);
  const [r, n] = C.useState(null), [i, d] = U();
  if (!s || !l)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(f.Head, { title: "Submissions" }),
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Submissions" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no forms yet. Create one under Structure → Forms and put it on a page; what visitors send shows up here." })
    ] });
  const m = (l.data[0]?.rows ?? []).slice(0, pt), h = (u) => i(
    "Delete this submission for good? It can't be restored.",
    () => f.router.delete(w(`cms/submissions/${u.id}`), { preserveScroll: !0, onSuccess: () => n(null) })
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: `${s.title} submissions` }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
        t.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: s.handle, onValueChange: (u) => f.router.get(w(`cms/forms/${u}/submissions`)), children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-56", "aria-label": "Form", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: t.map((u) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: u.handle, children: [
            u.title,
            " (",
            u.count,
            ")"
          ] }, u.handle)) })
        ] })
      ] }),
      l.total > 0 && /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: w(`cms/forms/${s.handle}/submissions/export`), children: [
        /* @__PURE__ */ e.jsx(Te, {}),
        " Export CSV"
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsx(a.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(a.Table, { children: [
      /* @__PURE__ */ e.jsx(a.TableHeader, { children: /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Sent" }),
        m.map((u) => /* @__PURE__ */ e.jsx(a.TableHead, { children: u.label }, u.handle))
      ] }) }),
      /* @__PURE__ */ e.jsxs(a.TableBody, { children: [
        l.data.length === 0 && /* @__PURE__ */ e.jsx(a.TableRow, { children: /* @__PURE__ */ e.jsx(a.TableCell, { colSpan: m.length + 1, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: "Nothing sent yet." }) }),
        l.data.map((u) => /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
          /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:whitespace-nowrap", children: /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:font-medium cms:hover:underline", onClick: () => n(u), children: q(u.createdAt) }) }),
          m.map((x) => /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:max-w-64 cms:truncate", children: u.rows.find((o) => o.handle === x.handle)?.value }, x.handle))
        ] }, u.id))
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
          a.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Previous page",
            disabled: !l.prev_page_url,
            onClick: () => l.prev_page_url && f.router.get(l.prev_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(Se, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Next page",
            disabled: !l.next_page_url,
            onClick: () => l.next_page_url && f.router.get(l.next_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(le, {})
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(a.Dialog, { open: r !== null, onOpenChange: (u) => !u && n(null), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto", children: [
      /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
        /* @__PURE__ */ e.jsx(a.DialogTitle, { children: s.title }),
        /* @__PURE__ */ e.jsxs(a.DialogDescription, { children: [
          "Sent ",
          q(r?.createdAt ?? null),
          " · ",
          r?.locale.toUpperCase()
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-3 cms:text-sm", children: r?.rows.map((u) => /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: u.label }),
        /* @__PURE__ */ e.jsx("dd", { className: "cms:whitespace-pre-wrap cms:break-words cms:text-muted-foreground", children: u.value || "—" })
      ] }, u.handle)) }),
      c.delete && r && /* @__PURE__ */ e.jsx(a.DialogFooter, { children: /* @__PURE__ */ e.jsxs(a.Button, { variant: "destructive", onClick: () => h(r), children: [
        /* @__PURE__ */ e.jsx(L, {}),
        " Delete"
      ] }) })
    ] }) }),
    d
  ] });
}
const te = "__top";
function jt({ taxonomy: s, taxonomies: t, terms: l, locales: c, locale: r }) {
  a.useBreadcrumbs([{ label: "Terms", href: w("cms/terms") }, ...s ? [{ label: s.title }] : []]);
  const [n, i] = U(), [d, m] = C.useState(null);
  if (!s)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(f.Head, { title: "Terms" }),
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Terms" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no taxonomies yet. Create one under Structure → Taxonomies (categories, tags…), then add its terms here." })
    ] });
  const h = w(`cms/taxonomies/${s.handle}/terms`);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: s.title }),
    i,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
      t.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: s.handle, onValueChange: (u) => f.router.get(w(`cms/taxonomies/${u}/terms`)), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": "Taxonomy", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(a.SelectContent, { children: t.map((u) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: u.handle, children: u.title }, u.handle)) })
      ] }),
      c.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: r, onValueChange: (u) => f.router.get(h, { locale: u }), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:ml-auto cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(a.SelectContent, { children: c.map((u) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: u, children: z(u) }, u)) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsx(a.CardContent, { children: /* @__PURE__ */ e.jsx(
      xe,
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
    /* @__PURE__ */ e.jsx(a.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs("ul", { className: "cms:divide-y", children: [
      l.length === 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-6 cms:text-center cms:text-muted-foreground", children: "No terms yet." }),
      l.map((u) => {
        const x = l.filter((p) => p.parentId === u.parentId), o = x.findIndex((p) => p.id === u.id);
        return /* @__PURE__ */ e.jsx("li", { className: "cms:p-3", style: { paddingLeft: `${0.75 + u.depth * 1.5}rem` }, children: d === u.id ? /* @__PURE__ */ e.jsx(
          xe,
          {
            action: w(`cms/terms/${u.id}`),
            method: "put",
            locale: r,
            terms: l,
            hierarchical: s.hierarchical,
            term: u,
            submitLabel: "Save",
            onDone: () => m(null)
          }
        ) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0 cms:flex-1", children: [
            u.title !== null ? /* @__PURE__ */ e.jsx("span", { className: "cms:font-medium", children: u.title }) : /* @__PURE__ */ e.jsxs("span", { className: "cms:text-muted-foreground cms:italic", children: [
              u.fallback,
              " · not translated"
            ] }),
            u.slug && /* @__PURE__ */ e.jsxs("span", { className: "cms:ml-2 cms:text-xs cms:text-muted-foreground", children: [
              "/",
              u.slug
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-label": `Move ${u.fallback} up`,
              disabled: o === 0,
              onClick: () => f.router.post(w(`cms/terms/${u.id}/move`), { direction: "up" }, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(K, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-label": `Move ${u.fallback} down`,
              disabled: o === x.length - 1,
              onClick: () => f.router.post(w(`cms/terms/${u.id}/move`), { direction: "down" }, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(G, {})
            }
          ),
          /* @__PURE__ */ e.jsx(a.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Edit ${u.fallback}`, onClick: () => m(u.id), children: /* @__PURE__ */ e.jsx(Ss, {}) }),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Delete ${u.fallback}`,
              onClick: () => n(
                `Delete "${u.fallback}" in every language? Terms under it move up a level.`,
                () => f.router.delete(w(`cms/terms/${u.id}`), { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(L, {})
            }
          )
        ] }) }, u.id);
      })
    ] }) })
  ] });
}
function xe({ action: s, method: t, locale: l, terms: c, hierarchical: r, term: n, submitLabel: i, onDone: d }) {
  const m = f.useForm({ title: n?.title ?? "", slug: n?.slug ?? "", parent_id: n?.parentId ?? null, locale: l }), h = m.errors, u = /* @__PURE__ */ new Set();
  if (n) {
    u.add(n.id);
    const p = c.findIndex((b) => b.id === n.id);
    for (let b = p + 1; b < c.length && (c[b]?.depth ?? 0) > n.depth; b++) u.add(c[b].id);
  }
  const x = (p) => {
    p.preventDefault(), m.submit(t, s, { preserveScroll: !0, onSuccess: () => {
      t === "post" && m.reset("title", "slug"), d?.();
    } });
  }, o = n ? `term-${n.id}` : "new-term";
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: x, className: "cms:grid cms:items-start cms:gap-3 cms:md:grid-cols-[2fr_1.5fr_1.5fr_auto]", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${o}-title`, className: n ? "cms:sr-only" : "", children: "Title" }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: `${o}-title`,
          value: m.data.title,
          placeholder: n?.fallback,
          required: !0,
          onChange: (p) => m.setData("title", p.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(_, { message: h.title })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${o}-slug`, className: n ? "cms:sr-only" : "", children: "Slug" }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: `${o}-slug`,
          className: "cms:font-mono",
          value: m.data.slug,
          placeholder: "Made from the title",
          onChange: (p) => m.setData("slug", p.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(_, { message: h.slug })
    ] }),
    r ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${o}-parent`, className: n ? "cms:sr-only" : "", children: "Under" }),
      /* @__PURE__ */ e.jsxs(
        a.Select,
        {
          value: m.data.parent_id === null ? te : String(m.data.parent_id),
          onValueChange: (p) => m.setData("parent_id", p === te ? null : Number(p)),
          children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: `${o}-parent`, children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(a.SelectItem, { value: te, children: "Top level" }),
              c.filter((p) => !u.has(p.id)).map((p) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: String(p.id), children: [
                "— ".repeat(p.depth),
                p.title ?? p.fallback
              ] }, p.id))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ e.jsx(_, { message: h.parent_id })
    ] }) : /* @__PURE__ */ e.jsx("div", {}),
    /* @__PURE__ */ e.jsxs("div", { className: `cms:flex cms:gap-2 ${n ? "" : "cms:md:mt-6"}`, children: [
      /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: m.processing, children: [
        !n && /* @__PURE__ */ e.jsx(A, {}),
        " ",
        i
      ] }),
      d && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", onClick: d, children: "Cancel" })
    ] })
  ] });
}
is({
  pages: {
    "Cms/Blueprints/Index": Xs,
    "Cms/Blueprints/Form": Zs,
    "Cms/Fieldsets/Index": lt,
    "Cms/Entries/Index": at,
    "Cms/Entries/Editor": Qs,
    "Cms/Terms/Index": jt,
    "Cms/Globals/Index": rt,
    "Cms/Globals/Edit": nt,
    "Cms/Menus/Index": xt,
    "Cms/Menus/Edit": ut,
    "Cms/Submissions/Index": gt
  }
});
export {
  Cs as L,
  C as R,
  _s as U,
  ft as _,
  w as a,
  D as c,
  Fs as i,
  e as j,
  a as u
};
