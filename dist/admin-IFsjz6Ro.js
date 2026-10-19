function He(s, t) {
  for (var l = 0; l < t.length; l++) {
    const n = t[l];
    if (typeof n != "string" && !Array.isArray(n)) {
      for (const r in n)
        if (r !== "default" && !(r in s)) {
          const c = Object.getOwnPropertyDescriptor(n, r);
          c && Object.defineProperty(s, r, c.get ? c : {
            enumerable: !0,
            get: () => n[r]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(s, Symbol.toStringTag, { value: "Module" }));
}
const te = 1;
function oe() {
  const s = globalThis.Sunrice;
  if (!s)
    throw new Error("[sunrice] This script runs outside the Sunrice admin panel (window.Sunrice is missing).");
  return s;
}
function Pe(s) {
  const t = oe();
  if (t.version !== te)
    throw new Error(`[sunrice] This plugin was built for admin runtime ${te}, but the panel runs ${t.version}. Rebuild it with a matching @sunrice/admin-sdk.`);
  for (const [l, n] of Object.entries(s.pages ?? {}))
    t.registerPage(l, n);
}
function y(s = "") {
  return oe().adminUrl(s);
}
const de = globalThis.Sunrice;
if (!de) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const e = de.modules["react/jsx-runtime"], me = globalThis.Sunrice;
if (!me) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const N = me.modules.react, Ms = /* @__PURE__ */ He({
  __proto__: null
}, [N]), ue = globalThis.Sunrice;
if (!ue) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const p = ue.modules["@inertiajs/react"];
const Ve = (s) => s?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
function Oe(s, t, l = []) {
  if (t == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: Ve(s),
    size: 24,
    node: t,
    ...l.length > 0 ? { aliases: l } : {}
  };
}
const Ue = (s) => {
  let t = "", l = !1;
  for (const n of s) {
    if (n === "-" || n === "_" || n <= " ") {
      l = t.length > 0;
      continue;
    }
    t.length === 0 ? t += n.toLowerCase() : t += l ? n.toUpperCase() : n, l = !1;
  }
  return t;
};
const qe = (s) => {
  const t = Ue(s);
  return t.charAt(0).toUpperCase() + t.slice(1);
};
const Y = (...s) => s.filter((t, l, n) => !!t && t.trim() !== "" && n.indexOf(t) === l).join(" ").trim();
const B = {
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
function K(s) {
  return s != null;
}
function We(s, t = {}) {
  const l = t.attributeNames ?? {}, n = (x) => l[x] ?? x, r = s.size ?? s.width ?? B.width, c = s.size ?? s.height ?? B.height, d = s.aliases?.filter((x) => typeof x == "string" && x.trim() !== "").map((x) => `lucide-${x}`) ?? [], i = [...s.name ? [`lucide-${s.name}`] : [], ...d], u = t.className?.split(" ").filter(Boolean) ?? [], o = t.includeDefaultClasses === !1 ? Y(...u) : Y("lucide", ...i, ...u), h = t.absoluteStrokeWidth ? Number(t.strokeWidth ?? B["stroke-width"]) * Number(s.size ?? s.width ?? B.width) / Number(t.size ?? t.width ?? B.width) : t.strokeWidth ?? B["stroke-width"];
  return [
    "svg",
    {
      ...Object.entries(B).reduce((x, [g, j]) => (x[n(g)] = j, x), {}),
      ..."color" in t && t.color && {
        [n("stroke")]: t.color
      },
      ..."size" in t && K(t.size) && {
        [n("width")]: t.size,
        [n("height")]: t.size
      },
      ..."width" in t && K(t.width) && {
        [n("width")]: t.width
      },
      ..."height" in t && K(t.height) && {
        [n("height")]: t.height
      },
      [n("stroke-width")]: h,
      ...o && {
        [n("class")]: o
      },
      [n("viewBox")]: `0 0 ${r} ${c}`,
      ...t.hasA11yProp === !1 ? {
        [n("aria-hidden")]: "true"
      } : {},
      ..."attributes" in t && t.attributes
    },
    s.node.map((x) => {
      const [g, j, C] = x, v = t.nonScalingStroke ? { [n("vector-effect")]: "non-scaling-stroke", ...j } : j;
      return C ? [g, v, C] : [g, v];
    })
  ];
}
function Ge(s, t = {}) {
  return We(s, {
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
const Ke = (s) => {
  for (const t in s)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
  return !1;
}, Ze = N.createContext({}), Xe = () => N.useContext(Ze), Ye = N.forwardRef(
  ({
    color: s,
    size: t,
    width: l,
    height: n,
    strokeWidth: r,
    absoluteStrokeWidth: c,
    nonScalingStroke: d,
    className: i = "",
    children: u,
    iconNode: o = [],
    icon: h = {
      node: o,
      aliases: [],
      size: 24
    },
    ...m
  }, x) => {
    const {
      size: g = 24,
      strokeWidth: j = 2,
      absoluteStrokeWidth: C = !1,
      nonScalingStroke: v = !1,
      color: D = "currentColor",
      className: $ = ""
    } = Xe() ?? {}, w = !!u || Ke(m), [f, T, S = []] = Ge(h, {
      color: s ?? D,
      width: l ?? t ?? g,
      height: n ?? t ?? g,
      strokeWidth: r ?? j,
      absoluteStrokeWidth: c ?? C,
      nonScalingStroke: d ?? v,
      className: Y($, i),
      hasA11yProp: w,
      attributes: m
    });
    return N.createElement(
      f,
      {
        ref: x,
        ...T
      },
      [
        ...S.map(([M, b]) => N.createElement(M, b)),
        ...Array.isArray(u) ? u : [u]
      ]
    );
  }
);
function _(s, t = [], l = []) {
  const n = typeof s == "string" ? Oe(s, t, l) : s, r = N.forwardRef(
    ({ className: c, ...d }, i) => N.createElement(Ye, {
      ref: i,
      icon: n,
      className: c,
      ...d
    })
  );
  return n.name && (r.displayName = qe(n.name)), r;
}
const he = {
  name: "arrow-down",
  size: 24,
  node: [
    ["path", { d: "M12 5v14", key: "s699le" }],
    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
  ]
};
he.node;
const O = _(he);
const xe = {
  name: "arrow-left",
  size: 24,
  node: [
    ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
    ["path", { d: "M19 12H5", key: "x3x0zl" }]
  ]
};
xe.node;
const Q = _(xe);
const ge = {
  name: "arrow-up",
  size: 24,
  node: [
    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
    ["path", { d: "M12 19V5", key: "x0mq9r" }]
  ]
};
ge.node;
const U = _(ge);
const pe = {
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
pe.node;
const Je = _(pe);
const fe = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
fe.node;
const je = _(fe);
const be = {
  name: "chevron-left",
  size: 24,
  node: [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]]
};
be.node;
const Qe = _(be);
const ve = {
  name: "chevron-right",
  size: 24,
  node: [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]
};
ve.node;
const Ne = _(ve);
const we = {
  name: "loader-circle",
  size: 24,
  node: [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  aliases: ["loader-2"]
};
we.node;
const ee = _(we);
const Ce = {
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
Ce.node;
const es = _(Ce);
const ye = {
  name: "plus",
  size: 24,
  node: [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ]
};
ye.node;
const I = _(ye);
const ke = {
  name: "rotate-ccw",
  size: 24,
  node: [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ]
};
ke.node;
const ss = _(ke);
const Se = {
  name: "search",
  size: 24,
  node: [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ]
};
Se.node;
const $e = _(Se);
const Te = {
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
Te.node;
const A = _(Te);
const _e = {
  name: "x",
  size: 24,
  node: [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]
};
_e.node;
const ts = _(_e), De = globalThis.Sunrice;
if (!De) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const a = De.modules["@sunrice/admin-sdk/ui"];
function q() {
  const [s, t] = N.useState(null), l = /* @__PURE__ */ e.jsx(a.Dialog, { open: s !== null, onOpenChange: (n) => !n && t(null), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
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
  return [(n, r) => t({ message: n, onConfirm: r }), l];
}
const as = 5;
let ls = 0;
const ze = () => `f${++ls}`;
function Be(s) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function Le(s, t) {
  const l = new Set(t.map((c) => c.handle)), n = Be(s) || "field";
  let r = n;
  for (let c = 2; l.has(r); c++)
    r = `${n}_${c}`;
  return r;
}
function Ie(s) {
  return (s ?? []).map(({ fields: t, ...l }) => ({
    ...l,
    key: ze(),
    fields: Ie(t),
    handleTouched: !0
  }));
}
function Ae(s, t) {
  return s.map(({ key: l, handleTouched: n, fields: r, ...c }) => ({
    ...c,
    validation: (c.validation ?? []).map((d) => d.trim()).filter((d) => d !== ""),
    ...t(c.type) ? { fields: Ae(r, t) } : {}
  }));
}
function cs(s, t, l) {
  return { key: ze(), type: s, label: t, handle: Le(t, l), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function F(s, t, l) {
  const n = t + l;
  if (t < 0 || t >= s.length || n < 0 || n >= s.length) return s;
  const r = s.slice(), [c] = r.splice(t, 1);
  return r.splice(n, 0, c), r;
}
function ns(s, t, l) {
  if (s.handleTouched) return { ...s, label: t };
  const n = l.filter((r) => r.key !== s.key);
  return { ...s, label: t, handle: Le(t || s.type, n) };
}
function W(s, t) {
  const l = `${t}.`, n = {};
  for (const [r, c] of Object.entries(s))
    r.startsWith(l) && (n[r.slice(l.length)] = c);
  return n;
}
function P(s, t) {
  const l = s[t];
  return { ...W(s, t), ...l !== void 0 ? { "": l } : {} };
}
function ae(s, t) {
  return Object.keys(s).some((l) => l === t || l.startsWith(`${t}.`));
}
function V(s) {
  return s && typeof s == "object" && !Array.isArray(s) ? s : {};
}
function rs(s, t) {
  if (typeof s != "string" || s === "") return "";
  const l = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(s);
  return l ? t ? `${l[1]}T${l[2] ?? "00:00"}` : l[1] ?? "" : "";
}
function is(s) {
  return s === "" ? null : s;
}
function os() {
  return { _hidden: !1 };
}
function ds(s) {
  return { type: s, hidden: !1, values: {} };
}
function Fs(s) {
  const t = s.replace(/[\u0000- \u007f]+/g, ""), l = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(t);
  return l ? ["http", "https", "mailto", "tel"].includes(l[1].toLowerCase()) : !t.includes("\\");
}
function ms({ ids: s, search: t, collections: l }) {
  const n = new URLSearchParams();
  for (const r of s ?? []) n.append("ids[]", String(r));
  t && n.set("search", t);
  for (const r of l) n.append("collections[]", r);
  return n.toString();
}
function E(s) {
  return { draft: "Draft", scheduled: "Scheduled", published: "Published" }[s];
}
function J(s, t) {
  if (!s) return "—";
  const l = new Date(s);
  return Number.isNaN(l.getTime()) ? "—" : l.toLocaleString(t, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
function us(s) {
  const t = (l) => String(l).padStart(2, "0");
  return `${s.getFullYear()}-${t(s.getMonth() + 1)}-${t(s.getDate())}T${t(s.getHours())}:${t(s.getMinutes())}`;
}
function R(s, t) {
  try {
    return new Intl.DisplayNames(t ? [t] : void 0, { type: "language" }).of(s.replace("_", "-")) ?? s;
  } catch {
    return s;
  }
}
async function le(s) {
  const t = await fetch(`${y("cms/entry-picker")}?${ms(s)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!t.ok) throw new Error(String(t.status));
  return (await t.json()).items;
}
function hs({ id: s, value: t, multiple: l, max: n, collections: r, invalid: c, onChange: d }) {
  const i = t === null ? [] : Array.isArray(t) ? t : [t], [u, o] = N.useState({}), [h, m] = N.useState(""), [x, g] = N.useState(null), [j, C] = N.useState(!1), v = l && n !== null && i.length >= n, D = i.filter((f) => !u[f]).join(",");
  N.useEffect(() => {
    D !== "" && le({ ids: D.split(",").map(Number), collections: r }).then((f) => o((T) => ({ ...T, ...Object.fromEntries(f.map((S) => [S.id, S])) }))).catch(() => C(!0));
  }, [D]), N.useEffect(() => {
    if (h.trim() === "") {
      g(null);
      return;
    }
    const f = window.setTimeout(() => {
      le({ search: h.trim(), collections: r }).then((T) => {
        g(T), C(!1);
      }).catch(() => C(!0));
    }, 250);
    return () => window.clearTimeout(f);
  }, [h]);
  const $ = (f) => {
    o((T) => ({ ...T, [f.id]: f })), d(l ? [...i, f.id] : f.id), m("");
  }, w = (f) => d(l ? f : f[0] ?? null);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    i.length > 0 && /* @__PURE__ */ e.jsx("ul", { className: "cms:flex cms:flex-col cms:gap-1", children: i.map((f, T) => {
      const S = u[f];
      return /* @__PURE__ */ e.jsxs("li", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-md cms:border cms:px-3 cms:py-1.5 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate", children: S ? S.title : `Entry #${f}` }),
        S && /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: S.collection }),
        S && /* @__PURE__ */ e.jsx(a.Badge, { variant: S.status === "published" ? "default" : "secondary", children: E(S.status) }),
        l && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-7",
              "aria-label": `Move ${S?.title ?? f} up`,
              disabled: T === 0,
              onClick: () => w(F(i, T, -1)),
              children: /* @__PURE__ */ e.jsx(U, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-7",
              "aria-label": `Move ${S?.title ?? f} down`,
              disabled: T === i.length - 1,
              onClick: () => w(F(i, T, 1)),
              children: /* @__PURE__ */ e.jsx(O, {})
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
            "aria-label": `Remove ${S?.title ?? f}`,
            onClick: () => w(i.filter((M) => M !== f)),
            children: /* @__PURE__ */ e.jsx(ts, {})
          }
        )
      ] }, f);
    }) }),
    !v && (l || i.length === 0) && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-md", children: [
      /* @__PURE__ */ e.jsx($e, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: s,
          className: "cms:pl-9",
          placeholder: "Search entries by title",
          "aria-invalid": c,
          value: h,
          autoComplete: "off",
          onChange: (f) => m(f.target.value)
        }
      ),
      x !== null && /* @__PURE__ */ e.jsxs("ul", { role: "listbox", "aria-label": "Matching entries", className: "cms:absolute cms:z-10 cms:mt-1 cms:max-h-64 cms:w-full cms:overflow-auto cms:rounded-md cms:border cms:bg-card cms:p-1 cms:shadow-md", children: [
        x.filter((f) => !i.includes(f.id)).length === 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: "No entries match." }),
        x.filter((f) => !i.includes(f.id)).map((f) => /* @__PURE__ */ e.jsx("li", { role: "option", "aria-selected": !1, children: /* @__PURE__ */ e.jsxs(
          "button",
          {
            type: "button",
            className: "cms:flex cms:w-full cms:items-center cms:gap-2 cms:rounded cms:px-2 cms:py-1.5 cms:text-left cms:text-sm cms:hover:bg-accent",
            onClick: () => $(f),
            children: [
              /* @__PURE__ */ e.jsx("span", { className: "cms:flex-1 cms:truncate", children: f.title }),
              /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: f.collection })
            ]
          }
        ) }, f.id))
      ] })
    ] }),
    j && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "Entries could not be loaded. Try again." })
  ] });
}
const xs = N.lazy(() => import("./RichTextEditor-cORRzYFJ.js").then((s) => ({ default: s.RichTextEditor }))), Z = "__none";
function k({ message: s }) {
  return s ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: s }) : null;
}
function ce(s) {
  const t = s.config?.options;
  return Array.isArray(t) ? t.flatMap((l) => {
    if (typeof l == "string") return [{ value: l, label: l }];
    if (l && typeof l == "object" && typeof l.value == "string") {
      const { value: n, label: r } = l;
      return [{ value: n, label: r || n }];
    }
    return [];
  }) : [];
}
const gs = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function ps(s) {
  if (s.label) return s.label;
  const t = s.handle.replace(/_/g, " ");
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function H({ field: s, value: t, onChange: l, errors: n, id: r, content: c = !1 }) {
  const d = ps(s), i = gs.includes(s.type) || ["select", "terms"].includes(s.type) && s.config?.multiple === !0;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", ...i ? { role: "group", "aria-labelledby": `${r}-label` } : {}, children: [
    s.type === "toggle" ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(a.Switch, { id: r, checked: t === !0, onCheckedChange: (u) => l(u) }),
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: r, children: d })
    ] }) : /* @__PURE__ */ e.jsxs(a.Label, { id: `${r}-label`, htmlFor: i ? void 0 : r, children: [
      d,
      s.required && /* @__PURE__ */ e.jsx("span", { className: "cms:text-destructive", children: " *" })
    ] }),
    /* @__PURE__ */ e.jsx(fs, { field: s, value: t, onChange: l, errors: n, id: r, content: c }),
    s.instructions && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s.instructions }),
    /* @__PURE__ */ e.jsx(k, { message: n[""] })
  ] });
}
function fs({ field: s, value: t, onChange: l, errors: n, id: r, content: c }) {
  const d = n[""] !== void 0;
  switch (s.type) {
    case "toggle":
      return null;
    case "textarea":
      return /* @__PURE__ */ e.jsx(
        a.Textarea,
        {
          id: r,
          "aria-invalid": d,
          value: typeof t == "string" ? t : "",
          rows: L(s, "rows") ?? 4,
          onChange: (i) => l(i.target.value)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ e.jsx(N.Suspense, { fallback: /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-48 cms:w-full" }), children: /* @__PURE__ */ e.jsx(xs, { id: r, labelledBy: `${r}-label`, invalid: d, value: typeof t == "string" ? t : "", onChange: l }) });
    case "number":
      return /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: r,
          type: "number",
          className: "cms:max-w-48",
          "aria-invalid": d,
          value: typeof t == "number" ? String(t) : typeof t == "string" ? t : "",
          min: L(s, "min"),
          max: L(s, "max"),
          step: L(s, "step") ?? "any",
          onChange: (i) => l(i.target.value === "" ? null : Number(i.target.value))
        }
      );
    case "date": {
      const i = s.config?.time === !0;
      return /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: r,
          type: i ? "datetime-local" : "date",
          className: "cms:max-w-64",
          "aria-invalid": d,
          value: rs(t, i),
          onChange: (u) => l(is(u.target.value))
        }
      );
    }
    case "select":
      return s.config?.multiple === !0 ? /* @__PURE__ */ e.jsx(re, { options: ce(s), value: Array.isArray(t) ? t.map(String) : [], onChange: l }) : /* @__PURE__ */ e.jsx(ne, { options: ce(s), value: typeof t == "string" ? t : null, onChange: l, id: r, required: s.required === !0 });
    case "terms": {
      const i = s.terms ?? [];
      if (s.config?.multiple === !0) {
        const u = Array.isArray(t) ? t.map(String) : [];
        return /* @__PURE__ */ e.jsx(re, { options: i, value: u, onChange: (o) => l(o.map(Number)) });
      }
      return /* @__PURE__ */ e.jsx(
        ne,
        {
          options: i,
          id: r,
          required: s.required === !0,
          value: t == null ? null : String(t),
          onChange: (u) => l(u === null ? null : Number(u))
        }
      );
    }
    case "entries":
      return /* @__PURE__ */ e.jsx(
        hs,
        {
          id: r,
          invalid: d,
          multiple: s.config?.multiple === !0,
          max: L(s, "max") ?? null,
          collections: s.collections ?? [],
          onChange: l,
          value: typeof t == "number" || Array.isArray(t) && t.every((i) => typeof i == "number") ? t : null
        }
      );
    case "link":
      return /* @__PURE__ */ e.jsx(bs, { value: V(t), onChange: l, errors: n, id: r });
    case "media":
      return /* @__PURE__ */ e.jsx(
        a.MediaPickerInput,
        {
          id: r,
          invalid: d,
          disabled: !1,
          multiple: s.config?.multiple === !0,
          max: L(s, "max") ?? null,
          types: Array.isArray(s.config?.types) ? s.config.types : [],
          value: typeof t == "number" || Array.isArray(t) && t.every((i) => typeof i == "number") ? t : null,
          onChange: l
        }
      );
    case "group":
      return /* @__PURE__ */ e.jsx(se, { fields: s.fields ?? [], value: V(t), onChange: l, errors: n, id: r, content: c });
    case "repeater":
      return /* @__PURE__ */ e.jsx(Ns, { field: s, value: Array.isArray(t) ? t : [], onChange: l, errors: n, id: r, content: c });
    case "flexible":
      return /* @__PURE__ */ e.jsx(ws, { field: s, value: Array.isArray(t) ? t : [], onChange: l, errors: n, id: r });
    default:
      return /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: r,
          "aria-invalid": d,
          value: typeof t == "string" ? t : "",
          placeholder: js(s, "placeholder"),
          maxLength: L(s, "max"),
          onChange: (i) => l(i.target.value)
        }
      );
  }
}
function L(s, t) {
  const l = s.config?.[t];
  return typeof l == "number" ? l : void 0;
}
function js(s, t) {
  const l = s.config?.[t];
  return typeof l == "string" ? l : void 0;
}
function se({ fields: s, value: t, onChange: l, errors: n, id: r, content: c }) {
  return /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-4 cms:rounded-lg cms:border cms:p-4", children: s.map((d) => /* @__PURE__ */ e.jsx(
    H,
    {
      id: `${r}-${d.handle}`,
      field: d,
      value: t[d.handle],
      content: c,
      errors: P(n, d.handle),
      onChange: (i) => l({ ...t, [d.handle]: i })
    },
    d.handle
  )) });
}
function ne({ options: s, value: t, onChange: l, id: n, required: r }) {
  return /* @__PURE__ */ e.jsxs(a.Select, { value: t ?? Z, onValueChange: (c) => l(c === Z ? null : c), children: [
    /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: n, className: "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
    /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
      !r && /* @__PURE__ */ e.jsx(a.SelectItem, { value: Z, children: "None" }),
      s.map((c) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: c.value, children: c.label }, c.value))
    ] })
  ] });
}
function re({ options: s, value: t, onChange: l }) {
  return s.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Nothing to choose from yet." }) : /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2", children: s.map((n) => /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
    /* @__PURE__ */ e.jsx(
      a.Checkbox,
      {
        checked: t.includes(n.value),
        onCheckedChange: (r) => l(r ? s.map((c) => c.value).filter((c) => c === n.value || t.includes(c)) : t.filter((c) => c !== n.value))
      }
    ),
    n.label
  ] }, n.value)) });
}
function bs({ value: s, onChange: t, errors: l, id: n }) {
  const r = (c, d) => {
    const i = { ...s, [c]: d };
    t(i.url === "" || i.url === void 0 ? null : i);
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-2 cms:md:grid-cols-[2fr_1fr_auto] cms:md:items-center", children: [
    /* @__PURE__ */ e.jsx(
      a.Input,
      {
        id: n,
        "aria-label": "Address",
        placeholder: "https://… or /about",
        value: typeof s.url == "string" ? s.url : "",
        onChange: (c) => r("url", c.target.value),
        "aria-invalid": l.url !== void 0
      }
    ),
    /* @__PURE__ */ e.jsx(
      a.Input,
      {
        "aria-label": "Link text",
        placeholder: "Link text",
        value: typeof s.label == "string" ? s.label : "",
        onChange: (c) => r("label", c.target.value)
      }
    ),
    /* @__PURE__ */ e.jsxs("label", { className: "cms:flex cms:items-center cms:gap-2 cms:text-sm", children: [
      /* @__PURE__ */ e.jsx(a.Checkbox, { checked: s.new_tab === !0, onCheckedChange: (c) => r("new_tab", c) }),
      "New tab"
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ e.jsx(k, { message: l.url ?? l.label }) })
  ] });
}
function vs(s, t) {
  return !t && (s.fields ?? []).every((l) => l.type === "text");
}
function Ns({ field: s, value: t, onChange: l, errors: n, id: r, content: c = !1 }) {
  const d = s.fields ?? [], i = t.map(V), u = (m, x) => l(i.map((g, j) => j === m ? x : g)), o = (s.label || "row").toLowerCase().replace(/s$/, ""), h = o.charAt(0).toUpperCase() + o.slice(1);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    i.map((m, x) => vs(s, c) ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
      d.map((g) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            "aria-label": g.label || g.handle,
            placeholder: g.label || g.handle,
            value: typeof m[g.handle] == "string" ? m[g.handle] : "",
            onChange: (j) => u(x, { ...m, [g.handle]: j.target.value })
          }
        ),
        /* @__PURE__ */ e.jsx(k, { message: n[`${x}.${g.handle}`] })
      ] }, g.handle)),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": `Remove ${o} ${x + 1}`, onClick: () => l(i.filter((g, j) => j !== x)), children: /* @__PURE__ */ e.jsx(A, {}) })
    ] }, x) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(
        Me,
        {
          label: `${h} ${x + 1}`,
          index: x,
          count: i.length,
          onMove: (g) => l(F(i, x, g)),
          onRemove: () => l(i.filter((g, j) => j !== x)),
          hidden: c ? m._hidden === !0 : void 0,
          onHidden: (g) => u(x, { ...m, _hidden: g })
        }
      ),
      /* @__PURE__ */ e.jsx(se, { fields: d, value: m, onChange: (g) => u(x, g), errors: P(n, String(x)), id: `${r}-${x}`, content: c })
    ] }, typeof m._id == "string" ? m._id : x)),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => l([...i, c ? os() : {}]), children: [
      /* @__PURE__ */ e.jsx(I, {}),
      " Add ",
      o
    ] }) })
  ] });
}
function ws({ field: s, value: t, onChange: l, errors: n, id: r }) {
  const c = s.blocks ?? [], d = t.map(V), i = (u, o) => l(d.map((h, m) => m === u ? o : h));
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    d.map((u, o) => {
      const h = c.find((m) => m.type === u.type);
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(
          Me,
          {
            label: h?.label ?? String(u.type),
            badge: !0,
            index: o,
            count: d.length,
            onMove: (m) => l(F(d, o, m)),
            onRemove: () => l(d.filter((m, x) => x !== o)),
            hidden: u.hidden === !0,
            onHidden: (m) => i(o, { ...u, hidden: m })
          }
        ),
        h ? /* @__PURE__ */ e.jsx(
          se,
          {
            fields: h.fields,
            value: V(u.values),
            onChange: (m) => i(o, { ...u, values: m }),
            errors: P(n, `${o}.values`),
            id: `${r}-${o}`,
            content: !0
          }
        ) : /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: "This kind of block no longer exists. Its values are kept." }),
        /* @__PURE__ */ e.jsx(k, { message: n[`${o}.type`] })
      ] }, typeof u.id == "string" ? u.id : o);
    }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", disabled: c.length === 0, children: [
        /* @__PURE__ */ e.jsx(I, {}),
        " Add block"
      ] }) }),
      /* @__PURE__ */ e.jsx(a.DropdownMenuContent, { align: "start", children: c.map((u) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => l([...d, ds(u.type)]), children: u.label }, u.type)) })
    ] }) })
  ] });
}
function Me({ label: s, badge: t = !1, index: l, count: n, onMove: r, onRemove: c, hidden: d, onHidden: i }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    t ? /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: s }) : /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:font-medium", children: s }),
    d !== void 0 && /* @__PURE__ */ e.jsxs("label", { className: "cms:ml-auto cms:flex cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", children: [
      /* @__PURE__ */ e.jsx(a.Switch, { checked: !d, onCheckedChange: (u) => i(!u), "aria-label": `Show ${s}` }),
      "Show"
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: d === void 0 ? "cms:ml-auto cms:flex" : "cms:flex", children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Move ${s} up`, disabled: l === 0, onClick: () => r(-1), children: /* @__PURE__ */ e.jsx(U, {}) }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Move ${s} down`, disabled: l === n - 1, onClick: () => r(1), children: /* @__PURE__ */ e.jsx(O, {}) }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": `Remove ${s}`, onClick: c, children: /* @__PURE__ */ e.jsx(A, {}) })
    ] })
  ] });
}
function Fe({ fields: s, onChange: t, types: l, errors: n, depth: r = 1, idPrefix: c = "field" }) {
  const [d, i] = N.useState(() => /* @__PURE__ */ new Set()), u = (m) => i((x) => {
    const g = new Set(x);
    return g.has(m) ? g.delete(m) : g.add(m), g;
  }), o = (m, x) => t(s.map((g, j) => j === m ? x : g)), h = (m) => {
    const x = cs(m.type, m.label, s);
    t([...s, x]), i((g) => new Set(g).add(x.key));
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:border-dashed cms:p-4 cms:text-sm cms:text-muted-foreground", children: "No fields yet." }),
    s.map((m, x) => {
      const g = l.find((v) => v.type === m.type), j = d.has(m.key) || ae(n, String(x)), C = `${c}-${m.key}`;
      return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${ae(n, String(x)) ? "cms:border-destructive" : ""}`, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:p-2", children: [
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-expanded": j,
              "aria-controls": C,
              "aria-label": `${j ? "Close" : "Open"} ${m.label || m.handle}`,
              onClick: () => u(m.key),
              children: j ? /* @__PURE__ */ e.jsx(je, {}) : /* @__PURE__ */ e.jsx(Ne, {})
            }
          ),
          /* @__PURE__ */ e.jsxs("button", { type: "button", className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:text-left", onClick: () => u(m.key), children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: m.label || m.handle }),
            /* @__PURE__ */ e.jsx("code", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", children: m.handle })
          ] }),
          m.required && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", children: "Required" }),
          /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: g?.label ?? m.type }),
          /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move up", disabled: x === 0, onClick: () => t(F(s, x, -1)), children: /* @__PURE__ */ e.jsx(U, {}) }),
          /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move down", disabled: x === s.length - 1, onClick: () => t(F(s, x, 1)), children: /* @__PURE__ */ e.jsx(O, {}) }),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Remove ${m.label || m.handle}`,
              onClick: () => t(s.filter((v, D) => D !== x)),
              children: /* @__PURE__ */ e.jsx(A, {})
            }
          )
        ] }),
        j && /* @__PURE__ */ e.jsx(
          Cs,
          {
            id: C,
            field: m,
            type: g,
            siblings: s,
            onChange: (v) => o(x, v),
            types: l,
            errors: W(n, String(x)),
            depth: r
          }
        )
      ] }, m.key);
    }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", children: [
        /* @__PURE__ */ e.jsx(I, {}),
        " Add field"
      ] }) }),
      /* @__PURE__ */ e.jsx(a.DropdownMenuContent, { align: "start", children: l.filter((m) => !m.hasChildren || r < as).map((m) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => h(m), children: m.label }, m.type)) })
    ] }) })
  ] });
}
const z = { default: "__default", yes: "yes", no: "no" };
function Cs({ id: s, field: t, type: l, siblings: n, onChange: r, types: c, errors: d, depth: i }) {
  const u = t.config ?? {};
  return /* @__PURE__ */ e.jsxs("div", { id: s, className: "cms:flex cms:flex-col cms:gap-4 cms:border-t cms:p-4", children: [
    !l && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-destructive", children: [
      'The field type "',
      t.type,
      `" isn't registered. Its data is kept; register the type or remove the field.`
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-label`, children: "Label" }),
        /* @__PURE__ */ e.jsx(a.Input, { id: `${s}-label`, value: t.label ?? "", onChange: (o) => r(ns(t, o.target.value, n)) }),
        /* @__PURE__ */ e.jsx(k, { message: d.label })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-handle`, children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: `${s}-handle`,
            className: "cms:font-mono",
            value: t.handle,
            onChange: (o) => r({ ...t, handle: o.target.value, handleTouched: !0 })
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "How templates read it. Renaming it hides values saved under the old one." }),
        /* @__PURE__ */ e.jsx(k, { message: d.handle })
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
          onChange: (o) => r({ ...t, instructions: o.target.value || null })
        }
      ),
      /* @__PURE__ */ e.jsx(k, { message: d.instructions })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-6", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Switch, { id: `${s}-required`, checked: t.required === !0, onCheckedChange: (o) => r({ ...t, required: o }) }),
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-required`, children: "Required" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-translatable`, children: "Per language" }),
        /* @__PURE__ */ e.jsxs(
          a.Select,
          {
            value: t.translatable === !0 ? z.yes : t.translatable === !1 ? z.no : z.default,
            onValueChange: (o) => r({ ...t, translatable: o === z.yes ? !0 : o === z.no ? !1 : null }),
            children: [
              /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: `${s}-translatable`, className: "cms:w-48", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
              /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: z.default, children: "As the type decides" }),
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: z.yes, children: "Yes, translated" }),
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: z.no, children: "No, shared" })
              ] })
            ]
          }
        )
      ] })
    ] }),
    (l?.settings.length ?? 0) > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: l?.settings.map((o) => /* @__PURE__ */ e.jsx(
      H,
      {
        id: `${s}-config-${o.handle}`,
        field: o,
        value: u[o.handle],
        errors: P(d, `config.${o.handle}`),
        onChange: (h) => r({ ...t, config: { ...u, [o.handle]: h } })
      },
      o.handle
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
          onChange: (o) => r({ ...t, validation: o.target.value.split(`
`) })
        }
      ),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Laravel rules, one per line." }),
      /* @__PURE__ */ e.jsx(k, { message: d.validation ?? Object.entries(d).find(([o]) => o.startsWith("validation."))?.[1] })
    ] }),
    l?.hasChildren && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { children: "Fields inside" }),
      /* @__PURE__ */ e.jsx(
        Fe,
        {
          fields: t.fields,
          onChange: (o) => r({ ...t, fields: o }),
          types: c,
          errors: W(d, "fields"),
          depth: i + 1,
          idPrefix: s
        }
      ),
      /* @__PURE__ */ e.jsx(k, { message: d.fields })
    ] }),
    /* @__PURE__ */ e.jsx(k, { message: d.type })
  ] });
}
function ys({ kind: s = "blueprint", blueprint: t, fieldTypes: l, usedBy: n = [] }) {
  const r = s === "fieldset" ? "Fieldset" : "Blueprint", c = y(s === "fieldset" ? "cms/fieldsets" : "cms/blueprints"), d = t ? t.title : `New ${r.toLowerCase()}`;
  a.useBreadcrumbs([{ label: `${r}s`, href: c }, { label: d }]);
  const [i, u] = q(), o = p.useForm({ title: t?.title ?? "", handle: t?.handle ?? "" }), [h, m] = N.useState(t !== null), [x, g] = N.useState(() => Ie(t?.fields)), j = ($) => l.find((w) => w.type === $)?.hasChildren === !0, C = o.errors, v = ($) => {
    $.preventDefault(), o.transform((w) => ({
      ...t ? { title: w.title } : w,
      fields: Ae(x, j)
    })), t ? o.put(`${c}/${t.id}`, { preserveScroll: !0 }) : o.post(c);
  }, D = () => t && i(
    `Delete the ${r.toLowerCase()} "${t.title}"? Content keeps its values.`,
    () => p.router.delete(`${c}/${t.id}`, { preserveScroll: !0 })
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: v, className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(p.Head, { title: d }),
    u,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(p.Link, { href: c, "aria-label": `Back to ${r.toLowerCase()}s`, children: /* @__PURE__ */ e.jsx(Q, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: d })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        t && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "icon", className: "cms:text-destructive", "aria-label": `Delete ${d}`, onClick: D, children: /* @__PURE__ */ e.jsx(A, {}) }),
        /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: o.processing, children: [
          o.processing && /* @__PURE__ */ e.jsx(ee, { className: "cms:animate-spin" }),
          t ? "Save" : `Create ${r.toLowerCase()}`
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(k, { message: C.blueprint ?? C.fieldset }),
    /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "title", children: "Title" }),
        /* @__PURE__ */ e.jsx(a.Input, { id: "title", value: o.data.title, required: !0, onChange: ($) => {
          o.setData((w) => ({ ...w, title: $.target.value, handle: h ? w.handle : Be($.target.value) }));
        } }),
        /* @__PURE__ */ e.jsx(k, { message: C.title })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "handle", children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: "handle",
            className: "cms:font-mono",
            value: o.data.handle,
            disabled: t !== null,
            required: !0,
            onChange: ($) => {
              m(!0), o.setData("handle", $.target.value);
            }
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t ? "Set when it was created." : "Lowercase letters, digits and underscores. It can't change later." }),
        /* @__PURE__ */ e.jsx(k, { message: C.handle })
      ] })
    ] }) }),
    n.length > 0 && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      "Used by ",
      n.join(", "),
      ". Changes show there at once."
    ] }),
    /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-3", "aria-labelledby": "fields-heading", children: [
      /* @__PURE__ */ e.jsx("h2", { id: "fields-heading", className: "cms:text-lg cms:font-medium", children: "Fields" }),
      /* @__PURE__ */ e.jsx(Fe, { fields: x, onChange: g, types: l, errors: W(C, "fields") }),
      /* @__PURE__ */ e.jsx(k, { message: C.fields })
    ] })
  ] });
}
function Ee({ noun: s, base: t, rows: l, intro: n }) {
  const r = `${s}s`;
  a.useBreadcrumbs([{ label: r }]);
  const [c, d] = q();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(p.Head, { title: r }),
    d,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: r }),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: n })
      ] }),
      /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(p.Link, { href: `${t}/create`, children: [
        /* @__PURE__ */ e.jsx(I, {}),
        " New ",
        s.toLowerCase()
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsx(a.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(a.Table, { children: [
      /* @__PURE__ */ e.jsx(a.TableHeader, { children: /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Title" }),
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Handle" }),
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Fields" }),
        l.some((i) => i.usedBy) && /* @__PURE__ */ e.jsx(a.TableHead, { children: "Used by" }),
        /* @__PURE__ */ e.jsx(a.TableHead, { className: "cms:w-12", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: "Actions" }) })
      ] }) }),
      /* @__PURE__ */ e.jsxs(a.TableBody, { children: [
        l.length === 0 && /* @__PURE__ */ e.jsx(a.TableRow, { children: /* @__PURE__ */ e.jsxs(a.TableCell, { colSpan: 5, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: [
          "No ",
          r.toLowerCase(),
          " yet."
        ] }) }),
        l.map((i) => /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx(p.Link, { href: `${t}/${i.id}/edit`, className: "cms:font-medium cms:hover:underline", children: i.title }) }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: i.handle }) }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: i.fields }),
          i.usedBy && /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:text-muted-foreground", children: i.usedBy.join(", ") || "—" }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx(
            a.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Delete ${i.title}`,
              onClick: () => c(
                `Delete the ${s.toLowerCase()} "${i.title}"? Content keeps its values.`,
                () => p.router.delete(`${t}/${i.id}`, { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(A, {})
            }
          ) })
        ] }, i.id))
      ] })
    ] }) })
  ] });
}
function ks({ blueprints: s }) {
  const t = p.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(k, { message: t.blueprint }),
    /* @__PURE__ */ e.jsx(
      Ee,
      {
        noun: "Blueprint",
        base: y("cms/blueprints"),
        rows: s,
        intro: "The fields editors fill in, for each kind of content."
      }
    )
  ] });
}
function Ss(s) {
  const { entry: t } = s;
  return /* @__PURE__ */ e.jsx($s, { ...s }, t ? `${t.id}:${t.locale}:${t.version}:${t.status}:${t.trashed}:${t.publishedAt}` : "new");
}
function $s({ collection: s, fields: t, locales: l = [], shared: n = [], sharedValues: r = {}, entry: c, values: d, revisions: i, can: u }) {
  const o = y(`cms/collections/${s.handle}/entries`), h = c ? y(`cms/entries/${c.id}`) : o, m = c ? d.title : "New entry";
  a.useBreadcrumbs([{ label: s.title, href: o }, { label: m }]);
  const [x, g] = q(), [j, C] = N.useState(!1), v = p.useForm({ ...d, locale: c?.locale ?? null, version: c?.version ?? null, publish: !1, published_at: null }), D = c ? { locale: c.locale } : {}, $ = l.find((b) => b.main)?.code, w = v.errors, f = c !== null && c.status !== "draft" && !c.hasUnpublishedChanges && !v.isDirty, T = c === null ? u.create : u.update && !c.trashed, S = (b = !1, G = null) => {
    v.transform((Re) => ({ ...Re, publish: b, published_at: G })), c ? v.put(h, { preserveScroll: !0, onSuccess: () => C(!1) }) : v.post(h);
  }, M = (b = null) => {
    u.update ? S(!0, b) : c && p.router.post(`${h}/publish`, { ...D, published_at: b }, { preserveScroll: !0, onSuccess: () => C(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (b) => {
    b.preventDefault(), S();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(p.Head, { title: m }),
    g,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(p.Link, { href: o, "aria-label": `Back to ${s.title}`, children: /* @__PURE__ */ e.jsx(Q, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: m }),
        c && /* @__PURE__ */ e.jsx(a.Badge, { variant: c.status === "published" ? "default" : "secondary", children: c.trashed ? "In the trash" : E(c.status) }),
        v.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        c?.trashed && u.delete && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", onClick: () => p.router.post(`${h}/restore`, {}, { preserveScroll: !0 }), children: [
          /* @__PURE__ */ e.jsx(ss, {}),
          " Restore"
        ] }),
        c && !c.trashed && u.delete && /* @__PURE__ */ e.jsx(
          a.Button,
          {
            type: "button",
            variant: "outline",
            size: "icon",
            className: "cms:text-destructive",
            "aria-label": "Move to the trash",
            onClick: () => x(`Move "${d.title}" to the trash? It comes off the site; you can restore it.`, () => p.router.delete(h)),
            children: /* @__PURE__ */ e.jsx(A, {})
          }
        ),
        T && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", variant: c && u.publish ? "outline" : "default", disabled: v.processing, children: [
          v.processing && /* @__PURE__ */ e.jsx(ee, { className: "cms:animate-spin" }),
          c ? "Save draft" : "Create draft"
        ] }),
        c && !c.trashed && u.publish && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex", children: [
          /* @__PURE__ */ e.jsx(a.Button, { type: "button", className: "cms:rounded-r-none", disabled: v.processing || f, onClick: () => M(), children: c.status === "draft" ? "Publish" : f ? "Published" : "Publish changes" }),
          /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "icon", className: "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": "More publishing options", children: /* @__PURE__ */ e.jsx(je, {}) }) }),
            /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", children: [
              /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { onSelect: () => C(!0), children: [
                /* @__PURE__ */ e.jsx(Je, {}),
                " Publish on a date…"
              ] }),
              c.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
                /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => p.router.post(`${h}/unpublish`, D, { preserveScroll: !0 }), children: "Unpublish" })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }),
    c && l.length > 1 && /* @__PURE__ */ e.jsx(
      Ts,
      {
        entryUrl: h,
        current: c.locale,
        locales: l,
        canAdd: u.create && !c.trashed,
        canRemove: u.delete && !c.isMain && !c.trashed,
        onRemove: () => x(
          `Remove the ${R(c.locale)} translation of "${d.title}"? Its revisions go with it.`,
          () => p.router.delete(`${h}/translations/${c.locale}`)
        )
      }
    ),
    w.version && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: w.version }),
    (w.entry || w.published_at) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: w.entry ?? w.published_at }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_18rem]", children: [
      /* @__PURE__ */ e.jsxs("fieldset", { disabled: !T, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-[2fr_1fr]", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "title", children: "Title" }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "title",
                value: v.data.title,
                "aria-invalid": w.title !== void 0,
                onChange: (b) => v.setData("title", b.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(k, { message: w.title })
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
                "aria-invalid": w.slug !== void 0,
                onChange: (b) => v.setData("slug", b.target.value)
              }
            ),
            /* @__PURE__ */ e.jsx(k, { message: w.slug })
          ] })
        ] }) }),
        t.length > 0 && /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsx(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: t.map((b) => n.includes(b.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
          /* @__PURE__ */ e.jsx(H, { id: `data-${b.handle}`, field: b, content: !0, value: r[b.handle], errors: {}, onChange: () => {
          } }),
          /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
            "Shared by all languages: edit it in ",
            $ ? R($) : "the main language",
            "."
          ] })
        ] }, b.handle) : /* @__PURE__ */ e.jsx(
          H,
          {
            id: `data-${b.handle}`,
            field: b,
            content: !0,
            value: v.data.data[b.handle],
            errors: P(w, `data.${b.handle}`),
            onChange: (G) => v.setData("data", { ...v.data.data, [b.handle]: G })
          },
          b.handle
        )) }) })
      ] }),
      c && /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:flex-col cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs(a.Card, { children: [
          /* @__PURE__ */ e.jsx(a.CardHeader, { children: /* @__PURE__ */ e.jsx(a.CardTitle, { className: "cms:text-base", children: "Status" }) }),
          /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
            /* @__PURE__ */ e.jsxs("p", { children: [
              E(c.status),
              c.status !== "draft" && c.publishedAt ? ` · ${J(c.publishedAt)}` : ""
            ] }),
            c.status !== "draft" && c.hasUnpublishedChanges && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The draft has changes the site doesn't show yet." })
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs(a.Card, { children: [
          /* @__PURE__ */ e.jsx(a.CardHeader, { children: /* @__PURE__ */ e.jsx(a.CardTitle, { className: "cms:text-base", children: "Revisions" }) }),
          /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
            i.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "Each publish keeps one." }),
            i.map((b) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
                /* @__PURE__ */ e.jsx("div", { className: "cms:truncate", children: b.title }),
                /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: J(b.createdAt) })
              ] }),
              u.update && !c.trashed && /* @__PURE__ */ e.jsx(
                a.Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  onClick: () => p.router.post(y(`cms/revisions/${b.id}/restore`), {}, { preserveScroll: !0 }),
                  children: "Restore"
                }
              )
            ] }, b.id))
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(
      _s,
      {
        open: j,
        onClose: () => C(!1),
        processing: v.processing,
        current: c?.publishedAt ?? null,
        onSchedule: (b) => M(b)
      }
    )
  ] });
}
function Ts({ entryUrl: s, current: t, locales: l, canAdd: n, canRemove: r, onRemove: c }) {
  return /* @__PURE__ */ e.jsxs("nav", { "aria-label": "Languages", className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
    l.map((d) => {
      const i = `${R(d.code)}${d.main ? " (main)" : ""}`;
      return d.status === null ? n ? /* @__PURE__ */ e.jsxs(
        a.Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "cms:border-dashed",
          onClick: () => p.router.post(`${s}/translations`, { locale: d.code }),
          children: [
            /* @__PURE__ */ e.jsx(I, {}),
            " ",
            i
          ]
        },
        d.code
      ) : null : /* @__PURE__ */ e.jsxs(
        a.Button,
        {
          type: "button",
          size: "sm",
          variant: d.code === t ? "secondary" : "ghost",
          "aria-current": d.code === t ? "page" : void 0,
          onClick: () => d.code !== t && p.router.get(`${s}/edit`, { locale: d.code }),
          children: [
            i,
            /* @__PURE__ */ e.jsx(a.Badge, { variant: d.status === "published" ? "default" : "outline", className: "cms:ml-1", children: E(d.status) })
          ]
        },
        d.code
      );
    }),
    r && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:ml-auto cms:text-destructive", onClick: c, children: "Remove this language" })
  ] });
}
function _s({ open: s, onClose: t, onSchedule: l, current: n, processing: r }) {
  const [c, d] = N.useState("");
  return N.useEffect(() => {
    s && d(us(n ? new Date(n) : new Date(Date.now() + 864e5)));
  }, [s, n]), /* @__PURE__ */ e.jsx(a.Dialog, { open: s, onOpenChange: (i) => !i && t(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: "Publish on a date" }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: "The entry goes live then; a date in the past publishes it now with that date." })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "published-at", children: "Date and time" }),
      /* @__PURE__ */ e.jsx(a.Input, { id: "published-at", type: "datetime-local", value: c, onChange: (i) => d(i.target.value) }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "In your time zone." })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: t, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", disabled: c === "" || r, onClick: () => l(new Date(c).toISOString()), children: "Publish" })
    ] })
  ] }) });
}
function Ds({ collection: s, collections: t, entries: l, query: n, can: r }) {
  a.useBreadcrumbs([{ label: "Entries", href: y("cms/entries") }, ...s ? [{ label: s.title }] : []]);
  const [c, d] = N.useState(n.search), i = s ? y(`cms/collections/${s.handle}/entries`) : "", u = (o) => {
    const h = { ...n, ...o };
    p.router.get(
      i,
      { ...h.search ? { search: h.search } : {}, ...h.trashed ? { trashed: 1 } : {} },
      { preserveState: !0, preserveScroll: !0, replace: !0 }
    );
  };
  return N.useEffect(() => {
    if (c === n.search) return;
    const o = window.setTimeout(() => u({ search: c }), 300);
    return () => window.clearTimeout(o);
  }, [c]), !s || !l ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(p.Head, { title: "Entries" }),
    /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Entries" }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no collections yet. Create one under Structure → Collections, then come back to write its entries." })
  ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(p.Head, { title: s.title }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
        t.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: s.handle, onValueChange: (o) => p.router.get(y(`cms/collections/${o}/entries`)), children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": "Collection", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: t.map((o) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: o.handle, children: o.title }, o.handle)) })
        ] })
      ] }),
      r?.create && !n.trashed && /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(p.Link, { href: `${i}/create`, children: [
        /* @__PURE__ */ e.jsx(I, {}),
        " New entry"
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-sm", children: [
        /* @__PURE__ */ e.jsx($e, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            className: "cms:pl-9",
            placeholder: "Search titles",
            "aria-label": "Search titles",
            value: c,
            onChange: (o) => d(o.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(a.Button, { variant: n.trashed ? "secondary" : "ghost", size: "sm", onClick: () => u({ trashed: !n.trashed }), children: n.trashed ? "Back to entries" : "Trash" })
    ] }),
    /* @__PURE__ */ e.jsx(a.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(a.Table, { children: [
      /* @__PURE__ */ e.jsx(a.TableHeader, { children: /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Title" }),
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Status" }),
        /* @__PURE__ */ e.jsx(a.TableHead, { children: s.dated ? "Date" : "Updated" })
      ] }) }),
      /* @__PURE__ */ e.jsxs(a.TableBody, { children: [
        l.data.length === 0 && /* @__PURE__ */ e.jsx(a.TableRow, { children: /* @__PURE__ */ e.jsx(a.TableCell, { colSpan: 3, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: n.trashed ? "The trash is empty." : n.search ? "Nothing matches." : "No entries yet." }) }),
        l.data.map((o) => /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
          /* @__PURE__ */ e.jsxs(a.TableCell, { children: [
            /* @__PURE__ */ e.jsx(p.Link, { href: y(`cms/entries/${o.id}/edit`), className: "cms:font-medium cms:hover:underline", children: o.title }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
              "/",
              o.slug
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-1", children: [
            /* @__PURE__ */ e.jsx(a.Badge, { variant: o.status === "published" ? "default" : "secondary", children: E(o.status) }),
            o.locales.length > 1 && o.locales.filter((h) => !h.main).map((h) => /* @__PURE__ */ e.jsx(
              a.Badge,
              {
                variant: h.status === "published" ? "default" : "outline",
                className: h.status === null ? "cms:opacity-50" : "",
                title: `${h.code}: ${h.status === null ? "not translated" : E(h.status)}`,
                children: h.code.toUpperCase()
              },
              h.code
            ))
          ] }) }),
          /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:text-muted-foreground", children: J(s.dated ? o.publishedAt : o.updatedAt) })
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
          a.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Previous page",
            disabled: !l.prev_page_url,
            onClick: () => l.prev_page_url && p.router.get(l.prev_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(Qe, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Next page",
            disabled: !l.next_page_url,
            onClick: () => l.next_page_url && p.router.get(l.next_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(Ne, {})
          }
        )
      ] })
    ] })
  ] });
}
function zs({ fieldsets: s }) {
  const t = p.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(k, { message: t.fieldset }),
    /* @__PURE__ */ e.jsx(
      Ee,
      {
        noun: "Fieldset",
        base: y("cms/fieldsets"),
        rows: s,
        intro: "Fields shared between blueprints, and the kinds of block of flexible fields."
      }
    )
  ] });
}
function Bs(s) {
  return /* @__PURE__ */ e.jsx(Ls, { ...s }, `${s.locale}:${JSON.stringify(s.values)}`);
}
function Ls({ set: s, fields: t, locale: l, locales: n, shared: r, values: c, can: d }) {
  const i = y(`cms/globals/${s.handle}`);
  a.useBreadcrumbs([{ label: "Globals", href: y("cms/globals") }, { label: s.title }]);
  const u = p.useForm({ locale: l, data: c }), o = u.errors, h = n[0];
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (m) => {
    m.preventDefault(), u.put(i, { preserveScroll: !0 });
  }, className: "cms:flex cms:max-w-3xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(p.Head, { title: s.title }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(p.Link, { href: y("cms/globals"), "aria-label": "Back to globals", children: /* @__PURE__ */ e.jsx(Q, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
        u.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        n.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: l, onValueChange: (m) => p.router.get(i, { locale: m }), children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: n.map((m, x) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: m, children: [
            R(m),
            x === 0 ? " (main)" : ""
          ] }, m)) })
        ] }),
        d.update && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: u.processing, children: [
          u.processing && /* @__PURE__ */ e.jsx(ee, { className: "cms:animate-spin" }),
          " Save"
        ] })
      ] })
    ] }),
    t.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "This global set has no fields: choose a blueprint for it under Structure → Global sets." }) : /* @__PURE__ */ e.jsx("fieldset", { disabled: !d.update, children: /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsx(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: t.map((m) => r.includes(m.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(H, { id: `data-${m.handle}`, field: m, content: !0, value: c[m.handle], errors: {}, onChange: () => {
      } }),
      /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
        "Shared by all languages: edit it in ",
        h ? R(h) : "the main language",
        "."
      ] })
    ] }, m.handle) : /* @__PURE__ */ e.jsx(
      H,
      {
        id: `data-${m.handle}`,
        field: m,
        content: !0,
        value: u.data.data[m.handle],
        errors: P(o, `data.${m.handle}`),
        onChange: (x) => u.setData("data", { ...u.data.data, [m.handle]: x })
      },
      m.handle
    )) }) }) })
  ] });
}
function Is({ sets: s }) {
  return a.useBreadcrumbs([{ label: "Globals" }]), /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(p.Head, { title: "Globals" }),
    /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Globals" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Values the whole site uses, like contact details and footer text." })
    ] }),
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no global sets yet. Create one under Structure → Global sets." }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:sm:grid-cols-2 cms:lg:grid-cols-3", children: s.map((t) => /* @__PURE__ */ e.jsx(p.Link, { href: y(`cms/globals/${t.handle}`), className: "cms:rounded-xl cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none", children: /* @__PURE__ */ e.jsxs(a.Card, { className: "cms:h-full cms:transition-colors cms:hover:bg-accent", children: [
      /* @__PURE__ */ e.jsxs(a.CardHeader, { children: [
        /* @__PURE__ */ e.jsx(a.CardTitle, { className: "cms:text-base", children: t.title }),
        /* @__PURE__ */ e.jsx(a.CardDescription, { children: t.blueprint ? /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: t.handle }) : "No blueprint yet: choose one under Structure → Global sets." })
      ] }),
      /* @__PURE__ */ e.jsx(a.CardContent, {})
    ] }) }, t.handle)) })
  ] });
}
const X = "__top";
function As({ taxonomy: s, taxonomies: t, terms: l, locales: n, locale: r }) {
  a.useBreadcrumbs([{ label: "Terms", href: y("cms/terms") }, ...s ? [{ label: s.title }] : []]);
  const [c, d] = q(), [i, u] = N.useState(null);
  if (!s)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(p.Head, { title: "Terms" }),
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Terms" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no taxonomies yet. Create one under Structure → Taxonomies (categories, tags…), then add its terms here." })
    ] });
  const o = y(`cms/taxonomies/${s.handle}/terms`);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(p.Head, { title: s.title }),
    d,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
      t.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: s.handle, onValueChange: (h) => p.router.get(y(`cms/taxonomies/${h}/terms`)), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": "Taxonomy", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(a.SelectContent, { children: t.map((h) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: h.handle, children: h.title }, h.handle)) })
      ] }),
      n.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: r, onValueChange: (h) => p.router.get(o, { locale: h }), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:ml-auto cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(a.SelectContent, { children: n.map((h) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: h, children: R(h) }, h)) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsx(a.CardContent, { children: /* @__PURE__ */ e.jsx(
      ie,
      {
        action: o,
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
      l.map((h) => {
        const m = l.filter((g) => g.parentId === h.parentId), x = m.findIndex((g) => g.id === h.id);
        return /* @__PURE__ */ e.jsx("li", { className: "cms:p-3", style: { paddingLeft: `${0.75 + h.depth * 1.5}rem` }, children: i === h.id ? /* @__PURE__ */ e.jsx(
          ie,
          {
            action: y(`cms/terms/${h.id}`),
            method: "put",
            locale: r,
            terms: l,
            hierarchical: s.hierarchical,
            term: h,
            submitLabel: "Save",
            onDone: () => u(null)
          }
        ) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0 cms:flex-1", children: [
            h.title !== null ? /* @__PURE__ */ e.jsx("span", { className: "cms:font-medium", children: h.title }) : /* @__PURE__ */ e.jsxs("span", { className: "cms:text-muted-foreground cms:italic", children: [
              h.fallback,
              " · not translated"
            ] }),
            h.slug && /* @__PURE__ */ e.jsxs("span", { className: "cms:ml-2 cms:text-xs cms:text-muted-foreground", children: [
              "/",
              h.slug
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-label": `Move ${h.fallback} up`,
              disabled: x === 0,
              onClick: () => p.router.post(y(`cms/terms/${h.id}/move`), { direction: "up" }, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(U, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-label": `Move ${h.fallback} down`,
              disabled: x === m.length - 1,
              onClick: () => p.router.post(y(`cms/terms/${h.id}/move`), { direction: "down" }, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(O, {})
            }
          ),
          /* @__PURE__ */ e.jsx(a.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Edit ${h.fallback}`, onClick: () => u(h.id), children: /* @__PURE__ */ e.jsx(es, {}) }),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Delete ${h.fallback}`,
              onClick: () => c(
                `Delete "${h.fallback}" in every language? Terms under it move up a level.`,
                () => p.router.delete(y(`cms/terms/${h.id}`), { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(A, {})
            }
          )
        ] }) }, h.id);
      })
    ] }) })
  ] });
}
function ie({ action: s, method: t, locale: l, terms: n, hierarchical: r, term: c, submitLabel: d, onDone: i }) {
  const u = p.useForm({ title: c?.title ?? "", slug: c?.slug ?? "", parent_id: c?.parentId ?? null, locale: l }), o = u.errors, h = /* @__PURE__ */ new Set();
  if (c) {
    h.add(c.id);
    const g = n.findIndex((j) => j.id === c.id);
    for (let j = g + 1; j < n.length && (n[j]?.depth ?? 0) > c.depth; j++) h.add(n[j].id);
  }
  const m = (g) => {
    g.preventDefault(), u.submit(t, s, { preserveScroll: !0, onSuccess: () => {
      t === "post" && u.reset("title", "slug"), i?.();
    } });
  }, x = c ? `term-${c.id}` : "new-term";
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: m, className: "cms:grid cms:items-start cms:gap-3 cms:md:grid-cols-[2fr_1.5fr_1.5fr_auto]", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${x}-title`, className: c ? "cms:sr-only" : "", children: "Title" }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: `${x}-title`,
          value: u.data.title,
          placeholder: c?.fallback,
          required: !0,
          onChange: (g) => u.setData("title", g.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(k, { message: o.title })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${x}-slug`, className: c ? "cms:sr-only" : "", children: "Slug" }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: `${x}-slug`,
          className: "cms:font-mono",
          value: u.data.slug,
          placeholder: "Made from the title",
          onChange: (g) => u.setData("slug", g.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(k, { message: o.slug })
    ] }),
    r ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${x}-parent`, className: c ? "cms:sr-only" : "", children: "Under" }),
      /* @__PURE__ */ e.jsxs(
        a.Select,
        {
          value: u.data.parent_id === null ? X : String(u.data.parent_id),
          onValueChange: (g) => u.setData("parent_id", g === X ? null : Number(g)),
          children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: `${x}-parent`, children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(a.SelectItem, { value: X, children: "Top level" }),
              n.filter((g) => !h.has(g.id)).map((g) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: String(g.id), children: [
                "— ".repeat(g.depth),
                g.title ?? g.fallback
              ] }, g.id))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ e.jsx(k, { message: o.parent_id })
    ] }) : /* @__PURE__ */ e.jsx("div", {}),
    /* @__PURE__ */ e.jsxs("div", { className: `cms:flex cms:gap-2 ${c ? "" : "cms:md:mt-6"}`, children: [
      /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: u.processing, children: [
        !c && /* @__PURE__ */ e.jsx(I, {}),
        " ",
        d
      ] }),
      i && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", onClick: i, children: "Cancel" })
    ] })
  ] });
}
Pe({
  pages: {
    "Cms/Blueprints/Index": ks,
    "Cms/Blueprints/Form": ys,
    "Cms/Fieldsets/Index": zs,
    "Cms/Entries/Index": Ds,
    "Cms/Entries/Editor": Ss,
    "Cms/Terms/Index": As,
    "Cms/Globals/Index": Is,
    "Cms/Globals/Edit": Bs
  }
});
export {
  N as R,
  Ms as _,
  y as a,
  _ as c,
  Fs as i,
  e as j,
  a as u
};
