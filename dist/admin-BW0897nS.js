function es(s, t) {
  for (var n = 0; n < t.length; n++) {
    const c = t[n];
    if (typeof c != "string" && !Array.isArray(c)) {
      for (const r in c)
        if (r !== "default" && !(r in s)) {
          const l = Object.getOwnPropertyDescriptor(c, r);
          l && Object.defineProperty(s, r, l.get ? l : {
            enumerable: !0,
            get: () => c[r]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(s, Symbol.toStringTag, { value: "Module" }));
}
const ae = 1;
function ue() {
  const s = globalThis.Sunrice;
  if (!s)
    throw new Error("[sunrice] This script runs outside the Sunrice admin panel (window.Sunrice is missing).");
  return s;
}
function ss(s) {
  const t = ue();
  if (t.version !== ae)
    throw new Error(`[sunrice] This plugin was built for admin runtime ${ae}, but the panel runs ${t.version}. Rebuild it with a matching @sunrice/admin-sdk.`);
  for (const [n, c] of Object.entries(s.pages ?? {}))
    t.registerPage(n, c);
}
function C(s = "") {
  return ue().adminUrl(s);
}
const he = globalThis.Sunrice;
if (!he) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const e = he.modules["react/jsx-runtime"], xe = globalThis.Sunrice;
if (!xe) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const k = xe.modules.react, rt = /* @__PURE__ */ es({
  __proto__: null
}, [k]), pe = globalThis.Sunrice;
if (!pe) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const f = pe.modules["@inertiajs/react"];
const ts = (s) => s?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
function as(s, t, n = []) {
  if (t == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: ts(s),
    size: 24,
    node: t,
    ...n.length > 0 ? { aliases: n } : {}
  };
}
const ns = (s) => {
  let t = "", n = !1;
  for (const c of s) {
    if (c === "-" || c === "_" || c <= " ") {
      n = t.length > 0;
      continue;
    }
    t.length === 0 ? t += c.toLowerCase() : t += n ? c.toUpperCase() : c, n = !1;
  }
  return t;
};
const ls = (s) => {
  const t = ns(s);
  return t.charAt(0).toUpperCase() + t.slice(1);
};
const ee = (...s) => s.filter((t, n, c) => !!t && t.trim() !== "" && c.indexOf(t) === n).join(" ").trim();
const M = {
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
function Y(s) {
  return s != null;
}
function cs(s, t = {}) {
  const n = t.attributeNames ?? {}, c = (x) => n[x] ?? x, r = s.size ?? s.width ?? M.width, l = s.size ?? s.height ?? M.height, i = s.aliases?.filter((x) => typeof x == "string" && x.trim() !== "").map((x) => `lucide-${x}`) ?? [], o = [...s.name ? [`lucide-${s.name}`] : [], ...i], m = t.className?.split(" ").filter(Boolean) ?? [], d = t.includeDefaultClasses === !1 ? ee(...m) : ee("lucide", ...o, ...m), u = t.absoluteStrokeWidth ? Number(t.strokeWidth ?? M["stroke-width"]) * Number(s.size ?? s.width ?? M.width) / Number(t.size ?? t.width ?? M.width) : t.strokeWidth ?? M["stroke-width"];
  return [
    "svg",
    {
      ...Object.entries(M).reduce((x, [p, b]) => (x[c(p)] = b, x), {}),
      ..."color" in t && t.color && {
        [c("stroke")]: t.color
      },
      ..."size" in t && Y(t.size) && {
        [c("width")]: t.size,
        [c("height")]: t.size
      },
      ..."width" in t && Y(t.width) && {
        [c("width")]: t.width
      },
      ..."height" in t && Y(t.height) && {
        [c("height")]: t.height
      },
      [c("stroke-width")]: u,
      ...d && {
        [c("class")]: d
      },
      [c("viewBox")]: `0 0 ${r} ${l}`,
      ...t.hasA11yProp === !1 ? {
        [c("aria-hidden")]: "true"
      } : {},
      ..."attributes" in t && t.attributes
    },
    s.node.map((x) => {
      const [p, b, w] = x, v = t.nonScalingStroke ? { [c("vector-effect")]: "non-scaling-stroke", ...b } : b;
      return w ? [p, v, w] : [p, v];
    })
  ];
}
function rs(s, t = {}) {
  return cs(s, {
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
const is = (s) => {
  for (const t in s)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
  return !1;
}, os = k.createContext({}), ds = () => k.useContext(os), ms = k.forwardRef(
  ({
    color: s,
    size: t,
    width: n,
    height: c,
    strokeWidth: r,
    absoluteStrokeWidth: l,
    nonScalingStroke: i,
    className: o = "",
    children: m,
    iconNode: d = [],
    icon: u = {
      node: d,
      aliases: [],
      size: 24
    },
    ...h
  }, x) => {
    const {
      size: p = 24,
      strokeWidth: b = 2,
      absoluteStrokeWidth: w = !1,
      nonScalingStroke: v = !1,
      color: D = "currentColor",
      className: j = ""
    } = ds() ?? {}, N = !!m || is(h), [g, $, T = []] = rs(u, {
      color: s ?? D,
      width: n ?? t ?? p,
      height: c ?? t ?? p,
      strokeWidth: r ?? b,
      absoluteStrokeWidth: l ?? w,
      nonScalingStroke: i ?? v,
      className: ee(j, o),
      hasA11yProp: N,
      attributes: h
    });
    return k.createElement(
      g,
      {
        ref: x,
        ...$
      },
      [
        ...T.map(([E, y]) => k.createElement(E, y)),
        ...Array.isArray(m) ? m : [m]
      ]
    );
  }
);
function _(s, t = [], n = []) {
  const c = typeof s == "string" ? as(s, t, n) : s, r = k.forwardRef(
    ({ className: l, ...i }, o) => k.createElement(ms, {
      ref: o,
      icon: c,
      className: l,
      ...i
    })
  );
  return c.name && (r.displayName = ls(c.name)), r;
}
const ge = {
  name: "arrow-down",
  size: 24,
  node: [
    ["path", { d: "M12 5v14", key: "s699le" }],
    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
  ]
};
ge.node;
const U = _(ge);
const fe = {
  name: "arrow-left",
  size: 24,
  node: [
    ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
    ["path", { d: "M19 12H5", key: "x3x0zl" }]
  ]
};
fe.node;
const W = _(fe);
const je = {
  name: "arrow-up",
  size: 24,
  node: [
    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
    ["path", { d: "M12 19V5", key: "x0mq9r" }]
  ]
};
je.node;
const q = _(je);
const be = {
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
be.node;
const us = _(be);
const ve = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
ve.node;
const Ne = _(ve);
const ye = {
  name: "chevron-left",
  size: 24,
  node: [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]]
};
ye.node;
const hs = _(ye);
const ke = {
  name: "chevron-right",
  size: 24,
  node: [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]
};
ke.node;
const we = _(ke);
const Ce = {
  name: "external-link",
  size: 24,
  node: [
    ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
    ["path", { d: "M10 14 21 3", key: "gplh6r" }],
    ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
  ]
};
Ce.node;
const xs = _(Ce);
const Se = {
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
Se.node;
const ps = _(Se);
const $e = {
  name: "link-2",
  size: 24,
  node: [
    ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
    ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
    ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
  ]
};
$e.node;
const gs = _($e);
const _e = {
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
_e.node;
const fs = _(_e);
const Te = {
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
Te.node;
const js = _(Te);
const De = {
  name: "loader-circle",
  size: 24,
  node: [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  aliases: ["loader-2"]
};
De.node;
const G = _(De);
const ze = {
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
ze.node;
const bs = _(ze);
const Be = {
  name: "plus",
  size: 24,
  node: [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ]
};
Be.node;
const L = _(Be);
const Le = {
  name: "rotate-ccw",
  size: 24,
  node: [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ]
};
Le.node;
const vs = _(Le);
const Ie = {
  name: "search",
  size: 24,
  node: [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ]
};
Ie.node;
const Me = _(Ie);
const Ae = {
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
Ae.node;
const I = _(Ae);
const Ee = {
  name: "x",
  size: 24,
  node: [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]
};
Ee.node;
const Ns = _(Ee), Fe = globalThis.Sunrice;
if (!Fe) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const a = Fe.modules["@sunrice/admin-sdk/ui"];
function K() {
  const [s, t] = k.useState(null), n = /* @__PURE__ */ e.jsx(a.Dialog, { open: s !== null, onOpenChange: (c) => !c && t(null), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
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
  return [(c, r) => t({ message: c, onConfirm: r }), n];
}
const ys = 5;
let ks = 0;
const He = () => `f${++ks}`;
function Re(s) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function Pe(s, t) {
  const n = new Set(t.map((l) => l.handle)), c = Re(s) || "field";
  let r = c;
  for (let l = 2; n.has(r); l++)
    r = `${c}_${l}`;
  return r;
}
function Oe(s) {
  return (s ?? []).map(({ fields: t, ...n }) => ({
    ...n,
    key: He(),
    fields: Oe(t),
    handleTouched: !0
  }));
}
function Ve(s, t) {
  return s.map(({ key: n, handleTouched: c, fields: r, ...l }) => ({
    ...l,
    validation: (l.validation ?? []).map((i) => i.trim()).filter((i) => i !== ""),
    ...t(l.type) ? { fields: Ve(r, t) } : {}
  }));
}
function ws(s, t, n) {
  return { key: He(), type: s, label: t, handle: Pe(t, n), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function F(s, t, n) {
  const c = t + n;
  if (t < 0 || t >= s.length || c < 0 || c >= s.length) return s;
  const r = s.slice(), [l] = r.splice(t, 1);
  return r.splice(c, 0, l), r;
}
function Cs(s, t, n) {
  if (s.handleTouched) return { ...s, label: t };
  const c = n.filter((r) => r.key !== s.key);
  return { ...s, label: t, handle: Pe(t || s.type, c) };
}
function Z(s, t) {
  const n = `${t}.`, c = {};
  for (const [r, l] of Object.entries(s))
    r.startsWith(n) && (c[r.slice(n.length)] = l);
  return c;
}
function P(s, t) {
  const n = s[t];
  return { ...Z(s, t), ...n !== void 0 ? { "": n } : {} };
}
function ne(s, t) {
  return Object.keys(s).some((n) => n === t || n.startsWith(`${t}.`));
}
function O(s) {
  return s && typeof s == "object" && !Array.isArray(s) ? s : {};
}
function Ss(s, t) {
  if (typeof s != "string" || s === "") return "";
  const n = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(s);
  return n ? t ? `${n[1]}T${n[2] ?? "00:00"}` : n[1] ?? "" : "";
}
function $s(s) {
  return s === "" ? null : s;
}
function _s() {
  return { _hidden: !1 };
}
function Ts(s) {
  return { type: s, hidden: !1, values: {} };
}
function Ds(s) {
  const t = s.replace(/[\u0000- \u007f]+/g, ""), n = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(t);
  return n ? ["http", "https", "mailto", "tel"].includes(n[1].toLowerCase()) : !t.includes("\\");
}
function Ue({ ids: s, search: t, collections: n }) {
  const c = new URLSearchParams();
  for (const r of s ?? []) c.append("ids[]", String(r));
  t && c.set("search", t);
  for (const r of n) c.append("collections[]", r);
  return c.toString();
}
function H(s) {
  return { draft: "Draft", scheduled: "Scheduled", published: "Published" }[s];
}
function se(s, t) {
  if (!s) return "—";
  const n = new Date(s);
  return Number.isNaN(n.getTime()) ? "—" : n.toLocaleString(t, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
function zs(s) {
  const t = (n) => String(n).padStart(2, "0");
  return `${s.getFullYear()}-${t(s.getMonth() + 1)}-${t(s.getDate())}T${t(s.getHours())}:${t(s.getMinutes())}`;
}
function z(s, t) {
  try {
    return new Intl.DisplayNames(t ? [t] : void 0, { type: "language" }).of(s.replace("_", "-")) ?? s;
  } catch {
    return s;
  }
}
async function le(s) {
  const t = await fetch(`${C("cms/entry-picker")}?${Ue(s)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!t.ok) throw new Error(String(t.status));
  return (await t.json()).items;
}
function qe({ id: s, value: t, multiple: n, max: c, collections: r, invalid: l, onChange: i }) {
  const o = t === null ? [] : Array.isArray(t) ? t : [t], [m, d] = k.useState({}), [u, h] = k.useState(""), [x, p] = k.useState(null), [b, w] = k.useState(!1), v = n && c !== null && o.length >= c, D = o.filter((g) => !m[g]).join(",");
  k.useEffect(() => {
    D !== "" && le({ ids: D.split(",").map(Number), collections: r }).then((g) => d(($) => ({ ...$, ...Object.fromEntries(g.map((T) => [T.id, T])) }))).catch(() => w(!0));
  }, [D]), k.useEffect(() => {
    if (u.trim() === "") {
      p(null);
      return;
    }
    const g = window.setTimeout(() => {
      le({ search: u.trim(), collections: r }).then(($) => {
        p($), w(!1);
      }).catch(() => w(!0));
    }, 250);
    return () => window.clearTimeout(g);
  }, [u]);
  const j = (g) => {
    d(($) => ({ ...$, [g.id]: g })), i(n ? [...o, g.id] : g.id), h("");
  }, N = (g) => i(n ? g : g[0] ?? null);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    o.length > 0 && /* @__PURE__ */ e.jsx("ul", { className: "cms:flex cms:flex-col cms:gap-1", children: o.map((g, $) => {
      const T = m[g];
      return /* @__PURE__ */ e.jsxs("li", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-md cms:border cms:px-3 cms:py-1.5 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate", children: T ? T.title : `Entry #${g}` }),
        T && /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: T.collection }),
        T && /* @__PURE__ */ e.jsx(a.Badge, { variant: T.status === "published" ? "default" : "secondary", children: H(T.status) }),
        n && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-7",
              "aria-label": `Move ${T?.title ?? g} up`,
              disabled: $ === 0,
              onClick: () => N(F(o, $, -1)),
              children: /* @__PURE__ */ e.jsx(q, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-7",
              "aria-label": `Move ${T?.title ?? g} down`,
              disabled: $ === o.length - 1,
              onClick: () => N(F(o, $, 1)),
              children: /* @__PURE__ */ e.jsx(U, {})
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
            "aria-label": `Remove ${T?.title ?? g}`,
            onClick: () => N(o.filter((E) => E !== g)),
            children: /* @__PURE__ */ e.jsx(Ns, {})
          }
        )
      ] }, g);
    }) }),
    !v && (n || o.length === 0) && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-md", children: [
      /* @__PURE__ */ e.jsx(Me, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: s,
          className: "cms:pl-9",
          placeholder: "Search entries by title",
          "aria-invalid": l,
          value: u,
          autoComplete: "off",
          onChange: (g) => h(g.target.value)
        }
      ),
      x !== null && /* @__PURE__ */ e.jsxs("ul", { role: "listbox", "aria-label": "Matching entries", className: "cms:absolute cms:z-10 cms:mt-1 cms:max-h-64 cms:w-full cms:overflow-auto cms:rounded-md cms:border cms:bg-card cms:p-1 cms:shadow-md", children: [
        x.filter((g) => !o.includes(g.id)).length === 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: "No entries match." }),
        x.filter((g) => !o.includes(g.id)).map((g) => /* @__PURE__ */ e.jsx("li", { role: "option", "aria-selected": !1, children: /* @__PURE__ */ e.jsxs(
          "button",
          {
            type: "button",
            className: "cms:flex cms:w-full cms:items-center cms:gap-2 cms:rounded cms:px-2 cms:py-1.5 cms:text-left cms:text-sm cms:hover:bg-accent",
            onClick: () => j(g),
            children: [
              /* @__PURE__ */ e.jsx("span", { className: "cms:flex-1 cms:truncate", children: g.title }),
              /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: g.collection })
            ]
          }
        ) }, g.id))
      ] })
    ] }),
    b && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "Entries could not be loaded. Try again." })
  ] });
}
const Bs = k.lazy(() => import("./RichTextEditor-8EJRP7Mm.js").then((s) => ({ default: s.RichTextEditor }))), J = "__none";
function S({ message: s }) {
  return s ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: s }) : null;
}
function ce(s) {
  const t = s.config?.options;
  return Array.isArray(t) ? t.flatMap((n) => {
    if (typeof n == "string") return [{ value: n, label: n }];
    if (n && typeof n == "object" && typeof n.value == "string") {
      const { value: c, label: r } = n;
      return [{ value: c, label: r || c }];
    }
    return [];
  }) : [];
}
const Ls = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function Is(s) {
  if (s.label) return s.label;
  const t = s.handle.replace(/_/g, " ");
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function R({ field: s, value: t, onChange: n, errors: c, id: r, content: l = !1 }) {
  const i = Is(s), o = Ls.includes(s.type) || ["select", "terms"].includes(s.type) && s.config?.multiple === !0;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", ...o ? { role: "group", "aria-labelledby": `${r}-label` } : {}, children: [
    s.type === "toggle" ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(a.Switch, { id: r, checked: t === !0, onCheckedChange: (m) => n(m) }),
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: r, children: i })
    ] }) : /* @__PURE__ */ e.jsxs(a.Label, { id: `${r}-label`, htmlFor: o ? void 0 : r, children: [
      i,
      s.required && /* @__PURE__ */ e.jsx("span", { className: "cms:text-destructive", children: " *" })
    ] }),
    /* @__PURE__ */ e.jsx(Ms, { field: s, value: t, onChange: n, errors: c, id: r, content: l }),
    s.instructions && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s.instructions }),
    /* @__PURE__ */ e.jsx(S, { message: c[""] })
  ] });
}
function Ms({ field: s, value: t, onChange: n, errors: c, id: r, content: l }) {
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
          rows: A(s, "rows") ?? 4,
          onChange: (o) => n(o.target.value)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ e.jsx(k.Suspense, { fallback: /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-48 cms:w-full" }), children: /* @__PURE__ */ e.jsx(Bs, { id: r, labelledBy: `${r}-label`, invalid: i, value: typeof t == "string" ? t : "", onChange: n }) });
    case "number":
      return /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: r,
          type: "number",
          className: "cms:max-w-48",
          "aria-invalid": i,
          value: typeof t == "number" ? String(t) : typeof t == "string" ? t : "",
          min: A(s, "min"),
          max: A(s, "max"),
          step: A(s, "step") ?? "any",
          onChange: (o) => n(o.target.value === "" ? null : Number(o.target.value))
        }
      );
    case "date": {
      const o = s.config?.time === !0;
      return /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: r,
          type: o ? "datetime-local" : "date",
          className: "cms:max-w-64",
          "aria-invalid": i,
          value: Ss(t, o),
          onChange: (m) => n($s(m.target.value))
        }
      );
    }
    case "select":
      return s.config?.multiple === !0 ? /* @__PURE__ */ e.jsx(ie, { options: ce(s), value: Array.isArray(t) ? t.map(String) : [], onChange: n }) : /* @__PURE__ */ e.jsx(re, { options: ce(s), value: typeof t == "string" ? t : null, onChange: n, id: r, required: s.required === !0 });
    case "terms": {
      const o = s.terms ?? [];
      if (s.config?.multiple === !0) {
        const m = Array.isArray(t) ? t.map(String) : [];
        return /* @__PURE__ */ e.jsx(ie, { options: o, value: m, onChange: (d) => n(d.map(Number)) });
      }
      return /* @__PURE__ */ e.jsx(
        re,
        {
          options: o,
          id: r,
          required: s.required === !0,
          value: t == null ? null : String(t),
          onChange: (m) => n(m === null ? null : Number(m))
        }
      );
    }
    case "entries":
      return /* @__PURE__ */ e.jsx(
        qe,
        {
          id: r,
          invalid: i,
          multiple: s.config?.multiple === !0,
          max: A(s, "max") ?? null,
          collections: s.collections ?? [],
          onChange: n,
          value: typeof t == "number" || Array.isArray(t) && t.every((o) => typeof o == "number") ? t : null
        }
      );
    case "link":
      return /* @__PURE__ */ e.jsx(Es, { value: O(t), onChange: n, errors: c, id: r });
    case "media":
      return /* @__PURE__ */ e.jsx(
        a.MediaPickerInput,
        {
          id: r,
          invalid: i,
          disabled: !1,
          multiple: s.config?.multiple === !0,
          max: A(s, "max") ?? null,
          types: Array.isArray(s.config?.types) ? s.config.types : [],
          value: typeof t == "number" || Array.isArray(t) && t.every((o) => typeof o == "number") ? t : null,
          onChange: n
        }
      );
    case "group":
      return /* @__PURE__ */ e.jsx(te, { fields: s.fields ?? [], value: O(t), onChange: n, errors: c, id: r, content: l });
    case "repeater":
      return /* @__PURE__ */ e.jsx(Hs, { field: s, value: Array.isArray(t) ? t : [], onChange: n, errors: c, id: r, content: l });
    case "flexible":
      return /* @__PURE__ */ e.jsx(Rs, { field: s, value: Array.isArray(t) ? t : [], onChange: n, errors: c, id: r });
    default:
      return /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: r,
          "aria-invalid": i,
          value: typeof t == "string" ? t : "",
          placeholder: As(s, "placeholder"),
          maxLength: A(s, "max"),
          onChange: (o) => n(o.target.value)
        }
      );
  }
}
function A(s, t) {
  const n = s.config?.[t];
  return typeof n == "number" ? n : void 0;
}
function As(s, t) {
  const n = s.config?.[t];
  return typeof n == "string" ? n : void 0;
}
function te({ fields: s, value: t, onChange: n, errors: c, id: r, content: l }) {
  return /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-4 cms:rounded-lg cms:border cms:p-4", children: s.map((i) => /* @__PURE__ */ e.jsx(
    R,
    {
      id: `${r}-${i.handle}`,
      field: i,
      value: t[i.handle],
      content: l,
      errors: P(c, i.handle),
      onChange: (o) => n({ ...t, [i.handle]: o })
    },
    i.handle
  )) });
}
function re({ options: s, value: t, onChange: n, id: c, required: r }) {
  return /* @__PURE__ */ e.jsxs(a.Select, { value: t ?? J, onValueChange: (l) => n(l === J ? null : l), children: [
    /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: c, className: "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
    /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
      !r && /* @__PURE__ */ e.jsx(a.SelectItem, { value: J, children: "None" }),
      s.map((l) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: l.value, children: l.label }, l.value))
    ] })
  ] });
}
function ie({ options: s, value: t, onChange: n }) {
  return s.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Nothing to choose from yet." }) : /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2", children: s.map((c) => /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
    /* @__PURE__ */ e.jsx(
      a.Checkbox,
      {
        checked: t.includes(c.value),
        onCheckedChange: (r) => n(r ? s.map((l) => l.value).filter((l) => l === c.value || t.includes(l)) : t.filter((l) => l !== c.value))
      }
    ),
    c.label
  ] }, c.value)) });
}
function Es({ value: s, onChange: t, errors: n, id: c }) {
  const r = (l, i) => {
    const o = { ...s, [l]: i };
    t(o.url === "" || o.url === void 0 ? null : o);
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-2 cms:md:grid-cols-[2fr_1fr_auto] cms:md:items-center", children: [
    /* @__PURE__ */ e.jsx(
      a.Input,
      {
        id: c,
        "aria-label": "Address",
        placeholder: "https://… or /about",
        value: typeof s.url == "string" ? s.url : "",
        onChange: (l) => r("url", l.target.value),
        "aria-invalid": n.url !== void 0
      }
    ),
    /* @__PURE__ */ e.jsx(
      a.Input,
      {
        "aria-label": "Link text",
        placeholder: "Link text",
        value: typeof s.label == "string" ? s.label : "",
        onChange: (l) => r("label", l.target.value)
      }
    ),
    /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
      /* @__PURE__ */ e.jsx(a.Checkbox, { checked: s.new_tab === !0, onCheckedChange: (l) => r("new_tab", l) }),
      "New tab"
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ e.jsx(S, { message: n.url ?? n.label }) })
  ] });
}
function Fs(s, t) {
  return !t && (s.fields ?? []).every((n) => n.type === "text");
}
function Hs({ field: s, value: t, onChange: n, errors: c, id: r, content: l = !1 }) {
  const i = s.fields ?? [], o = t.map(O), m = (h, x) => n(o.map((p, b) => b === h ? x : p)), d = (s.label || "row").toLowerCase().replace(/s$/, ""), u = d.charAt(0).toUpperCase() + d.slice(1);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    o.map((h, x) => Fs(s, l) ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
      i.map((p) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            "aria-label": p.label || p.handle,
            placeholder: p.label || p.handle,
            value: typeof h[p.handle] == "string" ? h[p.handle] : "",
            onChange: (b) => m(x, { ...h, [p.handle]: b.target.value })
          }
        ),
        /* @__PURE__ */ e.jsx(S, { message: c[`${x}.${p.handle}`] })
      ] }, p.handle)),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": `Remove ${d} ${x + 1}`, onClick: () => n(o.filter((p, b) => b !== x)), children: /* @__PURE__ */ e.jsx(I, {}) })
    ] }, x) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(
        We,
        {
          label: `${u} ${x + 1}`,
          index: x,
          count: o.length,
          onMove: (p) => n(F(o, x, p)),
          onRemove: () => n(o.filter((p, b) => b !== x)),
          hidden: l ? h._hidden === !0 : void 0,
          onHidden: (p) => m(x, { ...h, _hidden: p })
        }
      ),
      /* @__PURE__ */ e.jsx(te, { fields: i, value: h, onChange: (p) => m(x, p), errors: P(c, String(x)), id: `${r}-${x}`, content: l })
    ] }, typeof h._id == "string" ? h._id : x)),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => n([...o, l ? _s() : {}]), children: [
      /* @__PURE__ */ e.jsx(L, {}),
      " Add ",
      d
    ] }) })
  ] });
}
function Rs({ field: s, value: t, onChange: n, errors: c, id: r }) {
  const l = s.blocks ?? [], i = t.map(O), o = (m, d) => n(i.map((u, h) => h === m ? d : u));
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    i.map((m, d) => {
      const u = l.find((h) => h.type === m.type);
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(
          We,
          {
            label: u?.label ?? String(m.type),
            badge: !0,
            index: d,
            count: i.length,
            onMove: (h) => n(F(i, d, h)),
            onRemove: () => n(i.filter((h, x) => x !== d)),
            hidden: m.hidden === !0,
            onHidden: (h) => o(d, { ...m, hidden: h })
          }
        ),
        u ? /* @__PURE__ */ e.jsx(
          te,
          {
            fields: u.fields,
            value: O(m.values),
            onChange: (h) => o(d, { ...m, values: h }),
            errors: P(c, `${d}.values`),
            id: `${r}-${d}`,
            content: !0
          }
        ) : /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: "This kind of block no longer exists. Its values are kept." }),
        /* @__PURE__ */ e.jsx(S, { message: c[`${d}.type`] })
      ] }, typeof m.id == "string" ? m.id : d);
    }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", disabled: l.length === 0, children: [
        /* @__PURE__ */ e.jsx(L, {}),
        " Add block"
      ] }) }),
      /* @__PURE__ */ e.jsx(a.DropdownMenuContent, { align: "start", children: l.map((m) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => n([...i, Ts(m.type)]), children: m.label }, m.type)) })
    ] }) })
  ] });
}
function We({ label: s, badge: t = !1, index: n, count: c, onMove: r, onRemove: l, hidden: i, onHidden: o }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    t ? /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: s }) : /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:font-medium", children: s }),
    i !== void 0 && /* @__PURE__ */ e.jsxs("label", { className: "cms:ml-auto cms:flex cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", children: [
      /* @__PURE__ */ e.jsx(a.Switch, { checked: !i, onCheckedChange: (m) => o(!m), "aria-label": `Show ${s}` }),
      "Show"
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: i === void 0 ? "cms:ml-auto cms:flex" : "cms:flex", children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Move ${s} up`, disabled: n === 0, onClick: () => r(-1), children: /* @__PURE__ */ e.jsx(q, {}) }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Move ${s} down`, disabled: n === c - 1, onClick: () => r(1), children: /* @__PURE__ */ e.jsx(U, {}) }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": `Remove ${s}`, onClick: l, children: /* @__PURE__ */ e.jsx(I, {}) })
    ] })
  ] });
}
function Ge({ fields: s, onChange: t, types: n, errors: c, depth: r = 1, idPrefix: l = "field" }) {
  const [i, o] = k.useState(() => /* @__PURE__ */ new Set()), m = (h) => o((x) => {
    const p = new Set(x);
    return p.has(h) ? p.delete(h) : p.add(h), p;
  }), d = (h, x) => t(s.map((p, b) => b === h ? x : p)), u = (h) => {
    const x = ws(h.type, h.label, s);
    t([...s, x]), o((p) => new Set(p).add(x.key));
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:border-dashed cms:p-4 cms:text-sm cms:text-muted-foreground", children: "No fields yet." }),
    s.map((h, x) => {
      const p = n.find((v) => v.type === h.type), b = i.has(h.key) || ne(c, String(x)), w = `${l}-${h.key}`;
      return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${ne(c, String(x)) ? "cms:border-destructive" : ""}`, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:p-2", children: [
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-expanded": b,
              "aria-controls": w,
              "aria-label": `${b ? "Close" : "Open"} ${h.label || h.handle}`,
              onClick: () => m(h.key),
              children: b ? /* @__PURE__ */ e.jsx(Ne, {}) : /* @__PURE__ */ e.jsx(we, {})
            }
          ),
          /* @__PURE__ */ e.jsxs("button", { type: "button", className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:text-left", onClick: () => m(h.key), children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: h.label || h.handle }),
            /* @__PURE__ */ e.jsx("code", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", children: h.handle })
          ] }),
          h.required && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", children: "Required" }),
          /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: p?.label ?? h.type }),
          /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move up", disabled: x === 0, onClick: () => t(F(s, x, -1)), children: /* @__PURE__ */ e.jsx(q, {}) }),
          /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move down", disabled: x === s.length - 1, onClick: () => t(F(s, x, 1)), children: /* @__PURE__ */ e.jsx(U, {}) }),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Remove ${h.label || h.handle}`,
              onClick: () => t(s.filter((v, D) => D !== x)),
              children: /* @__PURE__ */ e.jsx(I, {})
            }
          )
        ] }),
        b && /* @__PURE__ */ e.jsx(
          Ps,
          {
            id: w,
            field: h,
            type: p,
            siblings: s,
            onChange: (v) => d(x, v),
            types: n,
            errors: Z(c, String(x)),
            depth: r
          }
        )
      ] }, h.key);
    }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", children: [
        /* @__PURE__ */ e.jsx(L, {}),
        " Add field"
      ] }) }),
      /* @__PURE__ */ e.jsx(a.DropdownMenuContent, { align: "start", children: n.filter((h) => !h.hasChildren || r < ys).map((h) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => u(h), children: h.label }, h.type)) })
    ] }) })
  ] });
}
const B = { default: "__default", yes: "yes", no: "no" };
function Ps({ id: s, field: t, type: n, siblings: c, onChange: r, types: l, errors: i, depth: o }) {
  const m = t.config ?? {};
  return /* @__PURE__ */ e.jsxs("div", { id: s, className: "cms:flex cms:flex-col cms:gap-4 cms:border-t cms:p-4", children: [
    !n && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-destructive", children: [
      'The field type "',
      t.type,
      `" isn't registered. Its data is kept; register the type or remove the field.`
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-label`, children: "Label" }),
        /* @__PURE__ */ e.jsx(a.Input, { id: `${s}-label`, value: t.label ?? "", onChange: (d) => r(Cs(t, d.target.value, c)) }),
        /* @__PURE__ */ e.jsx(S, { message: i.label })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-handle`, children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: `${s}-handle`,
            className: "cms:font-mono",
            value: t.handle,
            onChange: (d) => r({ ...t, handle: d.target.value, handleTouched: !0 })
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "How templates read it. Renaming it hides values saved under the old one." }),
        /* @__PURE__ */ e.jsx(S, { message: i.handle })
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
          onChange: (d) => r({ ...t, instructions: d.target.value || null })
        }
      ),
      /* @__PURE__ */ e.jsx(S, { message: i.instructions })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-6", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Switch, { id: `${s}-required`, checked: t.required === !0, onCheckedChange: (d) => r({ ...t, required: d }) }),
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-required`, children: "Required" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-translatable`, children: "Per language" }),
        /* @__PURE__ */ e.jsxs(
          a.Select,
          {
            value: t.translatable === !0 ? B.yes : t.translatable === !1 ? B.no : B.default,
            onValueChange: (d) => r({ ...t, translatable: d === B.yes ? !0 : d === B.no ? !1 : null }),
            children: [
              /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: `${s}-translatable`, className: "cms:w-48", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
              /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: B.default, children: "As the type decides" }),
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: B.yes, children: "Yes, translated" }),
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: B.no, children: "No, shared" })
              ] })
            ]
          }
        )
      ] })
    ] }),
    (n?.settings.length ?? 0) > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: n?.settings.map((d) => /* @__PURE__ */ e.jsx(
      R,
      {
        id: `${s}-config-${d.handle}`,
        field: d,
        value: m[d.handle],
        errors: P(i, `config.${d.handle}`),
        onChange: (u) => r({ ...t, config: { ...m, [d.handle]: u } })
      },
      d.handle
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
          onChange: (d) => r({ ...t, validation: d.target.value.split(`
`) })
        }
      ),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Laravel rules, one per line." }),
      /* @__PURE__ */ e.jsx(S, { message: i.validation ?? Object.entries(i).find(([d]) => d.startsWith("validation."))?.[1] })
    ] }),
    n?.hasChildren && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { children: "Fields inside" }),
      /* @__PURE__ */ e.jsx(
        Ge,
        {
          fields: t.fields,
          onChange: (d) => r({ ...t, fields: d }),
          types: l,
          errors: Z(i, "fields"),
          depth: o + 1,
          idPrefix: s
        }
      ),
      /* @__PURE__ */ e.jsx(S, { message: i.fields })
    ] }),
    /* @__PURE__ */ e.jsx(S, { message: i.type })
  ] });
}
function Os({ kind: s = "blueprint", blueprint: t, fieldTypes: n, usedBy: c = [] }) {
  const r = s === "fieldset" ? "Fieldset" : "Blueprint", l = C(s === "fieldset" ? "cms/fieldsets" : "cms/blueprints"), i = t ? t.title : `New ${r.toLowerCase()}`;
  a.useBreadcrumbs([{ label: `${r}s`, href: l }, { label: i }]);
  const [o, m] = K(), d = f.useForm({ title: t?.title ?? "", handle: t?.handle ?? "" }), [u, h] = k.useState(t !== null), [x, p] = k.useState(() => Oe(t?.fields)), b = (j) => n.find((N) => N.type === j)?.hasChildren === !0, w = d.errors, v = (j) => {
    j.preventDefault(), d.transform((N) => ({
      ...t ? { title: N.title } : N,
      fields: Ve(x, b)
    })), t ? d.put(`${l}/${t.id}`, { preserveScroll: !0 }) : d.post(l);
  }, D = () => t && o(
    `Delete the ${r.toLowerCase()} "${t.title}"? Content keeps its values.`,
    () => f.router.delete(`${l}/${t.id}`, { preserveScroll: !0 })
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: v, className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: i }),
    m,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: l, "aria-label": `Back to ${r.toLowerCase()}s`, children: /* @__PURE__ */ e.jsx(W, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: i })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        t && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "icon", className: "cms:text-destructive", "aria-label": `Delete ${i}`, onClick: D, children: /* @__PURE__ */ e.jsx(I, {}) }),
        /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: d.processing, children: [
          d.processing && /* @__PURE__ */ e.jsx(G, { className: "cms:animate-spin" }),
          t ? "Save" : `Create ${r.toLowerCase()}`
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(S, { message: w.blueprint ?? w.fieldset }),
    /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "title", children: "Title" }),
        /* @__PURE__ */ e.jsx(a.Input, { id: "title", value: d.data.title, required: !0, onChange: (j) => {
          d.setData((N) => ({ ...N, title: j.target.value, handle: u ? N.handle : Re(j.target.value) }));
        } }),
        /* @__PURE__ */ e.jsx(S, { message: w.title })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "handle", children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: "handle",
            className: "cms:font-mono",
            value: d.data.handle,
            disabled: t !== null,
            required: !0,
            onChange: (j) => {
              h(!0), d.setData("handle", j.target.value);
            }
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t ? "Set when it was created." : "Lowercase letters, digits and underscores. It can't change later." }),
        /* @__PURE__ */ e.jsx(S, { message: w.handle })
      ] })
    ] }) }),
    c.length > 0 && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      "Used by ",
      c.join(", "),
      ". Changes show there at once."
    ] }),
    /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-3", "aria-labelledby": "fields-heading", children: [
      /* @__PURE__ */ e.jsx("h2", { id: "fields-heading", className: "cms:text-lg cms:font-medium", children: "Fields" }),
      /* @__PURE__ */ e.jsx(Ge, { fields: x, onChange: p, types: n, errors: Z(w, "fields") }),
      /* @__PURE__ */ e.jsx(S, { message: w.fields })
    ] })
  ] });
}
function Ke({ noun: s, base: t, rows: n, intro: c }) {
  const r = `${s}s`;
  a.useBreadcrumbs([{ label: r }]);
  const [l, i] = K();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: r }),
    i,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: r }),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: c })
      ] }),
      /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(f.Link, { href: `${t}/create`, children: [
        /* @__PURE__ */ e.jsx(L, {}),
        " New ",
        s.toLowerCase()
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsx(a.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(a.Table, { children: [
      /* @__PURE__ */ e.jsx(a.TableHeader, { children: /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Title" }),
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Handle" }),
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Fields" }),
        n.some((o) => o.usedBy) && /* @__PURE__ */ e.jsx(a.TableHead, { children: "Used by" }),
        /* @__PURE__ */ e.jsx(a.TableHead, { className: "cms:w-12", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: "Actions" }) })
      ] }) }),
      /* @__PURE__ */ e.jsxs(a.TableBody, { children: [
        n.length === 0 && /* @__PURE__ */ e.jsx(a.TableRow, { children: /* @__PURE__ */ e.jsxs(a.TableCell, { colSpan: 5, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: [
          "No ",
          r.toLowerCase(),
          " yet."
        ] }) }),
        n.map((o) => /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx(f.Link, { href: `${t}/${o.id}/edit`, className: "cms:font-medium cms:hover:underline", children: o.title }) }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: o.handle }) }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: o.fields }),
          o.usedBy && /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:text-muted-foreground", children: o.usedBy.join(", ") || "—" }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx(
            a.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Delete ${o.title}`,
              onClick: () => l(
                `Delete the ${s.toLowerCase()} "${o.title}"? Content keeps its values.`,
                () => f.router.delete(`${t}/${o.id}`, { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(I, {})
            }
          ) })
        ] }, o.id))
      ] })
    ] }) })
  ] });
}
function Vs({ blueprints: s }) {
  const t = f.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(S, { message: t.blueprint }),
    /* @__PURE__ */ e.jsx(
      Ke,
      {
        noun: "Blueprint",
        base: C("cms/blueprints"),
        rows: s,
        intro: "The fields editors fill in, for each kind of content."
      }
    )
  ] });
}
function Us(s) {
  const { entry: t } = s;
  return /* @__PURE__ */ e.jsx(qs, { ...s }, t ? `${t.id}:${t.locale}:${t.version}:${t.status}:${t.trashed}:${t.publishedAt}` : "new");
}
function qs({ collection: s, fields: t, locales: n = [], shared: c = [], sharedValues: r = {}, entry: l, values: i, revisions: o, can: m }) {
  const d = C(`cms/collections/${s.handle}/entries`), u = l ? C(`cms/entries/${l.id}`) : d, h = l ? i.title : "New entry";
  a.useBreadcrumbs([{ label: s.title, href: d }, { label: h }]);
  const [x, p] = K(), [b, w] = k.useState(!1), v = f.useForm({ ...i, locale: l?.locale ?? null, version: l?.version ?? null, publish: !1, published_at: null }), D = l ? { locale: l.locale } : {}, j = n.find((y) => y.main)?.code, N = v.errors, g = l !== null && l.status !== "draft" && !l.hasUnpublishedChanges && !v.isDirty, $ = l === null ? m.create : m.update && !l.trashed, T = (y = !1, X = null) => {
    v.transform((Qe) => ({ ...Qe, publish: y, published_at: X })), l ? v.put(u, { preserveScroll: !0, onSuccess: () => w(!1) }) : v.post(u);
  }, E = (y = null) => {
    m.update ? T(!0, y) : l && f.router.post(`${u}/publish`, { ...D, published_at: y }, { preserveScroll: !0, onSuccess: () => w(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (y) => {
    y.preventDefault(), T();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: h }),
    p,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: d, "aria-label": `Back to ${s.title}`, children: /* @__PURE__ */ e.jsx(W, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: h }),
        l && /* @__PURE__ */ e.jsx(a.Badge, { variant: l.status === "published" ? "default" : "secondary", children: l.trashed ? "In the trash" : H(l.status) }),
        v.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        l && !l.trashed && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(
          "a",
          {
            href: l.previewUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            title: v.isDirty ? "Shows the saved draft: save first to see your changes." : "Shows the saved draft.",
            children: [
              /* @__PURE__ */ e.jsx(ps, {}),
              " Preview"
            ]
          }
        ) }),
        l?.url && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: l.url, target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ e.jsx(xs, {}),
          " View"
        ] }) }),
        l?.trashed && m.delete && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", onClick: () => f.router.post(`${u}/restore`, {}, { preserveScroll: !0 }), children: [
          /* @__PURE__ */ e.jsx(vs, {}),
          " Restore"
        ] }),
        l && !l.trashed && m.delete && /* @__PURE__ */ e.jsx(
          a.Button,
          {
            type: "button",
            variant: "outline",
            size: "icon",
            className: "cms:text-destructive",
            "aria-label": "Move to the trash",
            onClick: () => x(`Move "${i.title}" to the trash? It comes off the site; you can restore it.`, () => f.router.delete(u)),
            children: /* @__PURE__ */ e.jsx(I, {})
          }
        ),
        $ && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", variant: l && m.publish ? "outline" : "default", disabled: v.processing, children: [
          v.processing && /* @__PURE__ */ e.jsx(G, { className: "cms:animate-spin" }),
          l ? "Save draft" : "Create draft"
        ] }),
        l && !l.trashed && m.publish && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex", children: [
          /* @__PURE__ */ e.jsx(a.Button, { type: "button", className: "cms:rounded-r-none", disabled: v.processing || g, onClick: () => E(), children: l.status === "draft" ? "Publish" : g ? "Published" : "Publish changes" }),
          /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "icon", className: "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": "More publishing options", children: /* @__PURE__ */ e.jsx(Ne, {}) }) }),
            /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", children: [
              /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { onSelect: () => w(!0), children: [
                /* @__PURE__ */ e.jsx(us, {}),
                " Publish on a date…"
              ] }),
              l.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
                /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => f.router.post(`${u}/unpublish`, D, { preserveScroll: !0 }), children: "Unpublish" })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }),
    l && n.length > 1 && /* @__PURE__ */ e.jsx(
      Ws,
      {
        entryUrl: u,
        current: l.locale,
        locales: n,
        canAdd: m.create && !l.trashed,
        canRemove: m.delete && !l.isMain && !l.trashed,
        onRemove: () => x(
          `Remove the ${z(l.locale)} translation of "${i.title}"? Its revisions go with it.`,
          () => f.router.delete(`${u}/translations/${l.locale}`)
        )
      }
    ),
    N.version && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: N.version }),
    (N.entry || N.published_at) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: N.entry ?? N.published_at }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_18rem]", children: [
      /* @__PURE__ */ e.jsxs("fieldset", { disabled: !$, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-[2fr_1fr]", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "title", children: "Title" }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "title",
                value: v.data.title,
                "aria-invalid": N.title !== void 0,
                onChange: (y) => v.setData("title", y.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(S, { message: N.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "slug", children: "Slug" }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "slug",
                className: "cms:font-mono",
                value: v.data.slug,
                placeholder: "Made from the title",
                "aria-invalid": N.slug !== void 0,
                onChange: (y) => v.setData("slug", y.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(S, { message: N.slug })
          ] })
        ] }) }),
        t.length > 0 && /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsx(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: t.map((y) => c.includes(y.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
          /* @__PURE__ */ e.jsx(R, { id: `data-${y.handle}`, field: y, content: !0, value: r[y.handle], errors: {}, onChange: () => {
          } }),
          /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
            "Shared by all languages: edit it in ",
            j ? z(j) : "the main language",
            "."
          ] })
        ] }, y.handle) : /* @__PURE__ */ e.jsx(
          R,
          {
            id: `data-${y.handle}`,
            field: y,
            content: !0,
            value: v.data.data[y.handle],
            errors: P(N, `data.${y.handle}`),
            onChange: (X) => v.setData("data", { ...v.data.data, [y.handle]: X })
          },
          y.handle
        )) }) })
      ] }),
      l && /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:flex-col cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs(a.Card, { children: [
          /* @__PURE__ */ e.jsx(a.CardHeader, { children: /* @__PURE__ */ e.jsx(a.CardTitle, { className: "cms:text-base", children: "Status" }) }),
          /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
            /* @__PURE__ */ e.jsxs("p", { children: [
              H(l.status),
              l.status !== "draft" && l.publishedAt ? ` · ${se(l.publishedAt)}` : ""
            ] }),
            l.status !== "draft" && l.hasUnpublishedChanges && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The draft has changes the site doesn't show yet." })
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs(a.Card, { children: [
          /* @__PURE__ */ e.jsx(a.CardHeader, { children: /* @__PURE__ */ e.jsx(a.CardTitle, { className: "cms:text-base", children: "Revisions" }) }),
          /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
            o.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "Each publish keeps one." }),
            o.map((y) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
                /* @__PURE__ */ e.jsx("div", { className: "cms:truncate", children: y.title }),
                /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: se(y.createdAt) })
              ] }),
              m.update && !l.trashed && /* @__PURE__ */ e.jsx(
                a.Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  onClick: () => f.router.post(C(`cms/revisions/${y.id}/restore`), {}, { preserveScroll: !0 }),
                  children: "Restore"
                }
              )
            ] }, y.id))
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(
      Gs,
      {
        open: b,
        onClose: () => w(!1),
        processing: v.processing,
        current: l?.publishedAt ?? null,
        onSchedule: (y) => E(y)
      }
    )
  ] });
}
function Ws({ entryUrl: s, current: t, locales: n, canAdd: c, canRemove: r, onRemove: l }) {
  return /* @__PURE__ */ e.jsxs("nav", { "aria-label": "Languages", className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
    n.map((i) => {
      const o = `${z(i.code)}${i.main ? " (main)" : ""}`;
      return i.status === null ? c ? /* @__PURE__ */ e.jsxs(
        a.Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "cms:border-dashed",
          onClick: () => f.router.post(`${s}/translations`, { locale: i.code }),
          children: [
            /* @__PURE__ */ e.jsx(L, {}),
            " ",
            o
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
            o,
            /* @__PURE__ */ e.jsx(a.Badge, { variant: i.status === "published" ? "default" : "outline", className: "cms:ml-1", children: H(i.status) })
          ]
        },
        i.code
      );
    }),
    r && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:ml-auto cms:text-destructive", onClick: l, children: "Remove this language" })
  ] });
}
function Gs({ open: s, onClose: t, onSchedule: n, current: c, processing: r }) {
  const [l, i] = k.useState("");
  return k.useEffect(() => {
    s && i(zs(c ? new Date(c) : new Date(Date.now() + 864e5)));
  }, [s, c]), /* @__PURE__ */ e.jsx(a.Dialog, { open: s, onOpenChange: (o) => !o && t(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: "Publish on a date" }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: "The entry goes live then; a date in the past publishes it now with that date." })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "published-at", children: "Date and time" }),
      /* @__PURE__ */ e.jsx(a.Input, { id: "published-at", type: "datetime-local", value: l, onChange: (o) => i(o.target.value) }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "In your time zone." })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: t, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", disabled: l === "" || r, onClick: () => n(new Date(l).toISOString()), children: "Publish" })
    ] })
  ] }) });
}
function Ks({ collection: s, collections: t, entries: n, query: c, can: r }) {
  a.useBreadcrumbs([{ label: "Entries", href: C("cms/entries") }, ...s ? [{ label: s.title }] : []]);
  const [l, i] = k.useState(c.search), o = s ? C(`cms/collections/${s.handle}/entries`) : "", m = (d) => {
    const u = { ...c, ...d };
    f.router.get(
      o,
      { ...u.search ? { search: u.search } : {}, ...u.trashed ? { trashed: 1 } : {} },
      { preserveState: !0, preserveScroll: !0, replace: !0 }
    );
  };
  return k.useEffect(() => {
    if (l === c.search) return;
    const d = window.setTimeout(() => m({ search: l }), 300);
    return () => window.clearTimeout(d);
  }, [l]), !s || !n ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: "Entries" }),
    /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Entries" }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no collections yet. Create one under Structure → Collections, then come back to write its entries." })
  ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: s.title }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
        t.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: s.handle, onValueChange: (d) => f.router.get(C(`cms/collections/${d}/entries`)), children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": "Collection", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: t.map((d) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: d.handle, children: d.title }, d.handle)) })
        ] })
      ] }),
      r?.create && !c.trashed && /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(f.Link, { href: `${o}/create`, children: [
        /* @__PURE__ */ e.jsx(L, {}),
        " New entry"
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-sm", children: [
        /* @__PURE__ */ e.jsx(Me, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            className: "cms:pl-9",
            placeholder: "Search titles",
            "aria-label": "Search titles",
            value: l,
            onChange: (d) => i(d.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(a.Button, { variant: c.trashed ? "secondary" : "ghost", size: "sm", onClick: () => m({ trashed: !c.trashed }), children: c.trashed ? "Back to entries" : "Trash" })
    ] }),
    /* @__PURE__ */ e.jsx(a.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(a.Table, { children: [
      /* @__PURE__ */ e.jsx(a.TableHeader, { children: /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Title" }),
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Status" }),
        /* @__PURE__ */ e.jsx(a.TableHead, { children: s.dated ? "Date" : "Updated" })
      ] }) }),
      /* @__PURE__ */ e.jsxs(a.TableBody, { children: [
        n.data.length === 0 && /* @__PURE__ */ e.jsx(a.TableRow, { children: /* @__PURE__ */ e.jsx(a.TableCell, { colSpan: 3, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: c.trashed ? "The trash is empty." : c.search ? "Nothing matches." : "No entries yet." }) }),
        n.data.map((d) => /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
          /* @__PURE__ */ e.jsxs(a.TableCell, { children: [
            /* @__PURE__ */ e.jsx(f.Link, { href: C(`cms/entries/${d.id}/edit`), className: "cms:font-medium cms:hover:underline", children: d.title }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
              "/",
              d.slug
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-1", children: [
            /* @__PURE__ */ e.jsx(a.Badge, { variant: d.status === "published" ? "default" : "secondary", children: H(d.status) }),
            d.locales.length > 1 && d.locales.filter((u) => !u.main).map((u) => /* @__PURE__ */ e.jsx(
              a.Badge,
              {
                variant: u.status === "published" ? "default" : "outline",
                className: u.status === null ? "cms:opacity-50" : "",
                title: `${u.code}: ${u.status === null ? "not translated" : H(u.status)}`,
                children: u.code.toUpperCase()
              },
              u.code
            ))
          ] }) }),
          /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:text-muted-foreground", children: se(s.dated ? d.publishedAt : d.updatedAt) })
        ] }, d.id))
      ] })
    ] }) }),
    n.total > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:text-sm cms:text-muted-foreground", children: [
      /* @__PURE__ */ e.jsxs("span", { children: [
        n.from,
        "–",
        n.to,
        " of ",
        n.total
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Previous page",
            disabled: !n.prev_page_url,
            onClick: () => n.prev_page_url && f.router.get(n.prev_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(hs, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Next page",
            disabled: !n.next_page_url,
            onClick: () => n.next_page_url && f.router.get(n.next_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(we, {})
          }
        )
      ] })
    ] })
  ] });
}
function Zs({ fieldsets: s }) {
  const t = f.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(S, { message: t.fieldset }),
    /* @__PURE__ */ e.jsx(
      Ke,
      {
        noun: "Fieldset",
        base: C("cms/fieldsets"),
        rows: s,
        intro: "Fields shared between blueprints, and the kinds of block of flexible fields."
      }
    )
  ] });
}
function Xs(s) {
  return /* @__PURE__ */ e.jsx(Ys, { ...s }, `${s.locale}:${JSON.stringify(s.values)}`);
}
function Ys({ set: s, fields: t, locale: n, locales: c, shared: r, values: l, can: i }) {
  const o = C(`cms/globals/${s.handle}`);
  a.useBreadcrumbs([{ label: "Globals", href: C("cms/globals") }, { label: s.title }]);
  const m = f.useForm({ locale: n, data: l }), d = m.errors, u = c[0];
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (h) => {
    h.preventDefault(), m.put(o, { preserveScroll: !0 });
  }, className: "cms:flex cms:max-w-3xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: s.title }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: C("cms/globals"), "aria-label": "Back to globals", children: /* @__PURE__ */ e.jsx(W, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
        m.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        c.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: n, onValueChange: (h) => f.router.get(o, { locale: h }), children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: c.map((h, x) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: h, children: [
            z(h),
            x === 0 ? " (main)" : ""
          ] }, h)) })
        ] }),
        i.update && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: m.processing, children: [
          m.processing && /* @__PURE__ */ e.jsx(G, { className: "cms:animate-spin" }),
          " Save"
        ] })
      ] })
    ] }),
    t.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "This global set has no fields: choose a blueprint for it under Structure → Global sets." }) : /* @__PURE__ */ e.jsx("fieldset", { disabled: !i.update, children: /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsx(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: t.map((h) => r.includes(h.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(R, { id: `data-${h.handle}`, field: h, content: !0, value: l[h.handle], errors: {}, onChange: () => {
      } }),
      /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
        "Shared by all languages: edit it in ",
        u ? z(u) : "the main language",
        "."
      ] })
    ] }, h.handle) : /* @__PURE__ */ e.jsx(
      R,
      {
        id: `data-${h.handle}`,
        field: h,
        content: !0,
        value: m.data.data[h.handle],
        errors: P(d, `data.${h.handle}`),
        onChange: (x) => m.setData("data", { ...m.data.data, [h.handle]: x })
      },
      h.handle
    )) }) }) })
  ] });
}
function Js({ sets: s }) {
  return a.useBreadcrumbs([{ label: "Globals" }]), /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: "Globals" }),
    /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Globals" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Values the whole site uses, like contact details and footer text." })
    ] }),
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no global sets yet. Create one under Structure → Global sets." }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:sm:grid-cols-2 cms:lg:grid-cols-3", children: s.map((t) => /* @__PURE__ */ e.jsx(f.Link, { href: C(`cms/globals/${t.handle}`), className: "cms:rounded-xl cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none", children: /* @__PURE__ */ e.jsxs(a.Card, { className: "cms:h-full cms:transition-colors cms:hover:bg-accent", children: [
      /* @__PURE__ */ e.jsxs(a.CardHeader, { children: [
        /* @__PURE__ */ e.jsx(a.CardTitle, { className: "cms:text-base", children: t.title }),
        /* @__PURE__ */ e.jsx(a.CardDescription, { children: t.blueprint ? /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: t.handle }) : "No blueprint yet: choose one under Structure → Global sets." })
      ] }),
      /* @__PURE__ */ e.jsx(a.CardContent, {})
    ] }) }, t.handle)) })
  ] });
}
let Ze = 0;
function Xe(s, t = 0) {
  return s.flatMap(({ children: n, ...c }) => [{ ...c, key: `m${++Ze}`, depth: t }, ...Xe(n ?? [], t + 1)]);
}
function Qs(s) {
  const t = [], n = [{ depth: -1, children: t }];
  for (const { key: c, depth: r, ...l } of s) {
    for (; n.length > 1 && n[n.length - 1].depth >= r; ) n.pop();
    const i = { ...l, children: [] };
    n[n.length - 1].children.push(i), n.push({ depth: r, children: i.children });
  }
  return t;
}
function V(s, t) {
  const n = s[t]?.depth ?? 0;
  let c = t + 1;
  for (; c < s.length && s[c].depth > n; ) c++;
  return c;
}
function Ye(s, t, n) {
  const c = V(s, t);
  return s.map((r, l) => l >= t && l < c ? { ...r, depth: r.depth + n } : r);
}
function et(s, t, n) {
  const c = s[t], r = s[t - 1];
  return !c || !r || c.depth > r.depth || Math.max(...s.slice(t, V(s, t)).map((i) => i.depth)) + 1 > n - 1 ? s : Ye(s, t, 1);
}
function st(s, t) {
  return (s[t]?.depth ?? 0) === 0 ? s : Ye(s, t, -1);
}
function oe(s, t, n) {
  const c = s[t];
  if (!c) return s;
  const r = V(s, t), l = s.slice(t, r);
  if (n === -1) {
    let m = t - 1;
    for (; m >= 0 && s[m].depth > c.depth; ) m--;
    return m < 0 || s[m].depth !== c.depth ? s : [...s.slice(0, m), ...l, ...s.slice(m, t), ...s.slice(r)];
  }
  const i = s[r];
  if (!i || i.depth !== c.depth) return s;
  const o = V(s, r);
  return [...s.slice(0, t), ...s.slice(r, o), ...l, ...s.slice(o)];
}
function tt(s, t) {
  return [...s.slice(0, t), ...s.slice(V(s, t))];
}
function de(s) {
  return { key: `m${++Ze}`, depth: 0, entry_id: null, entry: null, url: null, labels: {}, new_tab: !1, ...s };
}
function at({ menu: s, items: t, locales: n, limits: c, can: r }) {
  const l = C(`cms/menus/${s.handle}`);
  a.useBreadcrumbs([{ label: "Menus", href: C("cms/menus") }, { label: s.title }]);
  const [i, o] = k.useState(() => Xe(t)), [m, d] = k.useState(null), u = f.useForm({ items: t }), h = u.errors, [x, p] = k.useState(!1), b = n[0] ?? "en", w = (j) => {
    o(j), p(!0);
  }, v = (j, N) => w(i.map((g, $) => $ === j ? { ...g, ...N } : g)), D = (j) => {
    j.preventDefault(), u.transform(() => ({ items: Qs(i).map(Je) })), u.put(l, { preserveScroll: !0, onSuccess: () => p(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: D, className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: s.title }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: C("cms/menus"), "aria-label": "Back to menus", children: /* @__PURE__ */ e.jsx(W, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
        x && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      r.update && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", disabled: i.length >= c.items, onClick: () => d("entry"), children: [
          /* @__PURE__ */ e.jsx(L, {}),
          " Entry"
        ] }),
        /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", disabled: i.length >= c.items, onClick: () => d("url"), children: [
          /* @__PURE__ */ e.jsx(gs, {}),
          " Link"
        ] }),
        /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: u.processing, children: [
          u.processing && /* @__PURE__ */ e.jsx(G, { className: "cms:animate-spin" }),
          " Save"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(S, { message: h.items }),
    Object.keys(h).some((j) => j.startsWith("items.")) && /* @__PURE__ */ e.jsxs("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: [
      "Some links need fixing: ",
      Object.values(h).filter(Boolean)[0]
    ] }),
    /* @__PURE__ */ e.jsx(a.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs("ul", { className: "cms:divide-y", children: [
      i.length === 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-6 cms:text-center cms:text-muted-foreground", children: "No links yet. Add an entry or a link." }),
      i.map((j, N) => /* @__PURE__ */ e.jsxs("li", { className: "cms:flex cms:flex-col cms:gap-2 cms:p-3", style: { paddingLeft: `${0.75 + j.depth * 2}rem` }, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(
            a.Input,
            {
              "aria-label": `Label (${z(b)})`,
              className: "cms:max-w-xs",
              disabled: !r.update,
              placeholder: j.entry?.title ?? "Label",
              value: j.labels[b] ?? "",
              onChange: (g) => v(N, { labels: { ...j.labels, [b]: g.target.value } })
            }
          ),
          /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:text-sm cms:text-muted-foreground", children: j.entry_id !== null ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            j.entry?.collection,
            ": ",
            j.entry?.title ?? `Entry #${j.entry_id}`,
            " ",
            j.entry && !j.entry.live && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", children: "Not on the site" })
          ] }) : j.url }),
          r.update && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center", children: [
            /* @__PURE__ */ e.jsxs("label", { className: "cms:mr-2 cms:flex cms:items-center cms:gap-1.5 cms:text-sm", children: [
              /* @__PURE__ */ e.jsx(a.Checkbox, { checked: j.new_tab, onCheckedChange: (g) => v(N, { new_tab: g }) }),
              " New tab"
            ] }),
            /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Out a level", disabled: j.depth === 0, onClick: () => w(st(i, N)), children: /* @__PURE__ */ e.jsx(fs, {}) }),
            /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "In a level", onClick: () => w(et(i, N, c.depth)), children: /* @__PURE__ */ e.jsx(js, {}) }),
            /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move up", onClick: () => w(oe(i, N, -1)), children: /* @__PURE__ */ e.jsx(q, {}) }),
            /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move down", onClick: () => w(oe(i, N, 1)), children: /* @__PURE__ */ e.jsx(U, {}) }),
            /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": "Remove, with what's under it", onClick: () => w(tt(i, N)), children: /* @__PURE__ */ e.jsx(I, {}) })
          ] })
        ] }),
        n.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: n.slice(1).map((g) => /* @__PURE__ */ e.jsx(
          a.Input,
          {
            "aria-label": `Label (${z(g)})`,
            className: "cms:max-w-xs",
            disabled: !r.update,
            placeholder: `${z(g)}: as ${z(b)}`,
            value: j.labels[g] ?? "",
            onChange: ($) => v(N, { labels: { ...j.labels, [g]: $.target.value } })
          },
          g
        )) })
      ] }, j.key))
    ] }) }),
    /* @__PURE__ */ e.jsx(nt, { kind: m, onClose: () => d(null), onAdd: (j) => {
      w([...i, j]), d(null);
    }, main: b })
  ] });
}
function Je({ entry: s, children: t, ...n }) {
  return { ...n, children: t.map(Je) };
}
function nt({ kind: s, onClose: t, onAdd: n, main: c }) {
  const [r, l] = k.useState(null), [i, o] = k.useState(""), [m, d] = k.useState("");
  k.useEffect(() => {
    l(null), o(""), d("");
  }, [s]);
  const u = i.trim() === "" || Ds(i.trim()), h = async () => {
    if (s === "entry" && r !== null) {
      const x = await fetch(`${C("cms/entry-picker")}?${Ue({ ids: [r], collections: [] })}`, { headers: { Accept: "application/json" }, credentials: "same-origin" }), p = x.ok ? (await x.json()).items[0] : void 0;
      n(de({ entry_id: r, entry: p ? { title: p.title, collection: p.collection, live: p.status === "published" } : null, labels: m ? { [c]: m } : {} }));
    } else s === "url" && i.trim() !== "" && u && m.trim() !== "" && n(de({ url: i.trim(), labels: { [c]: m.trim() } }));
  };
  return /* @__PURE__ */ e.jsx(a.Dialog, { open: s !== null, onOpenChange: (x) => !x && t(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: s === "entry" ? "Link to an entry" : "Link to an address" }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: s === "entry" ? "It follows the entry: its title (unless you give a label) and its address in each language. It shows only while the entry is on the site." : "A web address, a path on this site (/contact), mailto: or tel:." })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
      s === "entry" ? /* @__PURE__ */ e.jsx(
        qe,
        {
          id: "menu-entry",
          value: r,
          multiple: !1,
          max: null,
          collections: [],
          invalid: !1,
          onChange: (x) => l(typeof x == "number" ? x : null)
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
            onChange: (x) => o(x.target.value)
          }
        ),
        !u && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "This address could run code; use https://, a path, mailto: or tel:." })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(a.Label, { htmlFor: "menu-label", children: [
          "Label",
          s === "entry" ? " (optional)" : ""
        ] }),
        /* @__PURE__ */ e.jsx(a.Input, { id: "menu-label", value: m, onChange: (x) => d(x.target.value) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: t, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(
        a.Button,
        {
          type: "button",
          onClick: () => {
            h();
          },
          disabled: s === "entry" ? r === null : i.trim() === "" || !u || m.trim() === "",
          children: "Add"
        }
      )
    ] })
  ] }) });
}
function lt({ menus: s }) {
  return a.useBreadcrumbs([{ label: "Menus" }]), /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: "Menus" }),
    /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Menus" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Navigation for the site: the main menu, the footer…" })
    ] }),
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no menus yet. Create one under Structure → Menus." }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:sm:grid-cols-2 cms:lg:grid-cols-3", children: s.map((t) => /* @__PURE__ */ e.jsx(f.Link, { href: C(`cms/menus/${t.handle}`), className: "cms:rounded-xl cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none", children: /* @__PURE__ */ e.jsxs(a.Card, { className: "cms:h-full cms:transition-colors cms:hover:bg-accent", children: [
      /* @__PURE__ */ e.jsxs(a.CardHeader, { children: [
        /* @__PURE__ */ e.jsx(a.CardTitle, { className: "cms:text-base", children: t.title }),
        /* @__PURE__ */ e.jsx(a.CardDescription, { children: /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: t.handle }) })
      ] }),
      /* @__PURE__ */ e.jsx(a.CardContent, {})
    ] }) }, t.handle)) })
  ] });
}
const Q = "__top";
function ct({ taxonomy: s, taxonomies: t, terms: n, locales: c, locale: r }) {
  a.useBreadcrumbs([{ label: "Terms", href: C("cms/terms") }, ...s ? [{ label: s.title }] : []]);
  const [l, i] = K(), [o, m] = k.useState(null);
  if (!s)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(f.Head, { title: "Terms" }),
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Terms" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no taxonomies yet. Create one under Structure → Taxonomies (categories, tags…), then add its terms here." })
    ] });
  const d = C(`cms/taxonomies/${s.handle}/terms`);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: s.title }),
    i,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
      t.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: s.handle, onValueChange: (u) => f.router.get(C(`cms/taxonomies/${u}/terms`)), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": "Taxonomy", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(a.SelectContent, { children: t.map((u) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: u.handle, children: u.title }, u.handle)) })
      ] }),
      c.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: r, onValueChange: (u) => f.router.get(d, { locale: u }), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:ml-auto cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(a.SelectContent, { children: c.map((u) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: u, children: z(u) }, u)) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsx(a.CardContent, { children: /* @__PURE__ */ e.jsx(
      me,
      {
        action: d,
        method: "post",
        locale: r,
        terms: n,
        hierarchical: s.hierarchical,
        submitLabel: "Add term"
      },
      `new-${n.length}`
    ) }) }),
    /* @__PURE__ */ e.jsx(a.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs("ul", { className: "cms:divide-y", children: [
      n.length === 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-6 cms:text-center cms:text-muted-foreground", children: "No terms yet." }),
      n.map((u) => {
        const h = n.filter((p) => p.parentId === u.parentId), x = h.findIndex((p) => p.id === u.id);
        return /* @__PURE__ */ e.jsx("li", { className: "cms:p-3", style: { paddingLeft: `${0.75 + u.depth * 1.5}rem` }, children: o === u.id ? /* @__PURE__ */ e.jsx(
          me,
          {
            action: C(`cms/terms/${u.id}`),
            method: "put",
            locale: r,
            terms: n,
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
              disabled: x === 0,
              onClick: () => f.router.post(C(`cms/terms/${u.id}/move`), { direction: "up" }, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(q, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-label": `Move ${u.fallback} down`,
              disabled: x === h.length - 1,
              onClick: () => f.router.post(C(`cms/terms/${u.id}/move`), { direction: "down" }, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(U, {})
            }
          ),
          /* @__PURE__ */ e.jsx(a.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Edit ${u.fallback}`, onClick: () => m(u.id), children: /* @__PURE__ */ e.jsx(bs, {}) }),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Delete ${u.fallback}`,
              onClick: () => l(
                `Delete "${u.fallback}" in every language? Terms under it move up a level.`,
                () => f.router.delete(C(`cms/terms/${u.id}`), { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(I, {})
            }
          )
        ] }) }, u.id);
      })
    ] }) })
  ] });
}
function me({ action: s, method: t, locale: n, terms: c, hierarchical: r, term: l, submitLabel: i, onDone: o }) {
  const m = f.useForm({ title: l?.title ?? "", slug: l?.slug ?? "", parent_id: l?.parentId ?? null, locale: n }), d = m.errors, u = /* @__PURE__ */ new Set();
  if (l) {
    u.add(l.id);
    const p = c.findIndex((b) => b.id === l.id);
    for (let b = p + 1; b < c.length && (c[b]?.depth ?? 0) > l.depth; b++) u.add(c[b].id);
  }
  const h = (p) => {
    p.preventDefault(), m.submit(t, s, { preserveScroll: !0, onSuccess: () => {
      t === "post" && m.reset("title", "slug"), o?.();
    } });
  }, x = l ? `term-${l.id}` : "new-term";
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: h, className: "cms:grid cms:items-start cms:gap-3 cms:md:grid-cols-[2fr_1.5fr_1.5fr_auto]", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${x}-title`, className: l ? "cms:sr-only" : "", children: "Title" }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: `${x}-title`,
          value: m.data.title,
          placeholder: l?.fallback,
          required: !0,
          onChange: (p) => m.setData("title", p.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(S, { message: d.title })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${x}-slug`, className: l ? "cms:sr-only" : "", children: "Slug" }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: `${x}-slug`,
          className: "cms:font-mono",
          value: m.data.slug,
          placeholder: "Made from the title",
          onChange: (p) => m.setData("slug", p.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(S, { message: d.slug })
    ] }),
    r ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${x}-parent`, className: l ? "cms:sr-only" : "", children: "Under" }),
      /* @__PURE__ */ e.jsxs(
        a.Select,
        {
          value: m.data.parent_id === null ? Q : String(m.data.parent_id),
          onValueChange: (p) => m.setData("parent_id", p === Q ? null : Number(p)),
          children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: `${x}-parent`, children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(a.SelectItem, { value: Q, children: "Top level" }),
              c.filter((p) => !u.has(p.id)).map((p) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: String(p.id), children: [
                "— ".repeat(p.depth),
                p.title ?? p.fallback
              ] }, p.id))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ e.jsx(S, { message: d.parent_id })
    ] }) : /* @__PURE__ */ e.jsx("div", {}),
    /* @__PURE__ */ e.jsxs("div", { className: `cms:flex cms:gap-2 ${l ? "" : "cms:md:mt-6"}`, children: [
      /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: m.processing, children: [
        !l && /* @__PURE__ */ e.jsx(L, {}),
        " ",
        i
      ] }),
      o && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", onClick: o, children: "Cancel" })
    ] })
  ] });
}
ss({
  pages: {
    "Cms/Blueprints/Index": Vs,
    "Cms/Blueprints/Form": Os,
    "Cms/Fieldsets/Index": Zs,
    "Cms/Entries/Index": Ks,
    "Cms/Entries/Editor": Us,
    "Cms/Terms/Index": ct,
    "Cms/Globals/Index": Js,
    "Cms/Globals/Edit": Xs,
    "Cms/Menus/Index": lt,
    "Cms/Menus/Edit": at
  }
});
export {
  gs as L,
  k as R,
  rt as _,
  C as a,
  _ as c,
  Ds as i,
  e as j,
  a as u
};
