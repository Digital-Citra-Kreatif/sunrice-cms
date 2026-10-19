function He(s, t) {
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
const ee = 1;
function re() {
  const s = globalThis.Sunrice;
  if (!s)
    throw new Error("[sunrice] This script runs outside the Sunrice admin panel (window.Sunrice is missing).");
  return s;
}
function Pe(s) {
  const t = re();
  if (t.version !== ee)
    throw new Error(`[sunrice] This plugin was built for admin runtime ${ee}, but the panel runs ${t.version}. Rebuild it with a matching @sunrice/admin-sdk.`);
  for (const [n, c] of Object.entries(s.pages ?? {}))
    t.registerPage(n, c);
}
function S(s = "") {
  return re().adminUrl(s);
}
const ie = globalThis.Sunrice;
if (!ie) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const e = ie.modules["react/jsx-runtime"], oe = globalThis.Sunrice;
if (!oe) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const N = oe.modules.react, Ls = /* @__PURE__ */ He({
  __proto__: null
}, [N]), de = globalThis.Sunrice;
if (!de) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const f = de.modules["@inertiajs/react"];
const Oe = (s) => s?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
function Ue(s, t, n = []) {
  if (t == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: Oe(s),
    size: 24,
    node: t,
    ...n.length > 0 ? { aliases: n } : {}
  };
}
const Ve = (s) => {
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
const qe = (s) => {
  const t = Ve(s);
  return t.charAt(0).toUpperCase() + t.slice(1);
};
const Y = (...s) => s.filter((t, n, c) => !!t && t.trim() !== "" && c.indexOf(t) === n).join(" ").trim();
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
function Z(s) {
  return s != null;
}
function We(s, t = {}) {
  const n = t.attributeNames ?? {}, c = (x) => n[x] ?? x, r = s.size ?? s.width ?? B.width, l = s.size ?? s.height ?? B.height, d = s.aliases?.filter((x) => typeof x == "string" && x.trim() !== "").map((x) => `lucide-${x}`) ?? [], o = [...s.name ? [`lucide-${s.name}`] : [], ...d], u = t.className?.split(" ").filter(Boolean) ?? [], i = t.includeDefaultClasses === !1 ? Y(...u) : Y("lucide", ...o, ...u), m = t.absoluteStrokeWidth ? Number(t.strokeWidth ?? B["stroke-width"]) * Number(s.size ?? s.width ?? B.width) / Number(t.size ?? t.width ?? B.width) : t.strokeWidth ?? B["stroke-width"];
  return [
    "svg",
    {
      ...Object.entries(B).reduce((x, [p, j]) => (x[c(p)] = j, x), {}),
      ..."color" in t && t.color && {
        [c("stroke")]: t.color
      },
      ..."size" in t && Z(t.size) && {
        [c("width")]: t.size,
        [c("height")]: t.size
      },
      ..."width" in t && Z(t.width) && {
        [c("width")]: t.width
      },
      ..."height" in t && Z(t.height) && {
        [c("height")]: t.height
      },
      [c("stroke-width")]: m,
      ...i && {
        [c("class")]: i
      },
      [c("viewBox")]: `0 0 ${r} ${l}`,
      ...t.hasA11yProp === !1 ? {
        [c("aria-hidden")]: "true"
      } : {},
      ..."attributes" in t && t.attributes
    },
    s.node.map((x) => {
      const [p, j, y] = x, v = t.nonScalingStroke ? { [c("vector-effect")]: "non-scaling-stroke", ...j } : j;
      return y ? [p, v, y] : [p, v];
    })
  ];
}
function Ke(s, t = {}) {
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
const Ze = (s) => {
  for (const t in s)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
  return !1;
}, Ge = N.createContext({}), Xe = () => N.useContext(Ge), Ye = N.forwardRef(
  ({
    color: s,
    size: t,
    width: n,
    height: c,
    strokeWidth: r,
    absoluteStrokeWidth: l,
    nonScalingStroke: d,
    className: o = "",
    children: u,
    iconNode: i = [],
    icon: m = {
      node: i,
      aliases: [],
      size: 24
    },
    ...h
  }, x) => {
    const {
      size: p = 24,
      strokeWidth: j = 2,
      absoluteStrokeWidth: y = !1,
      nonScalingStroke: v = !1,
      color: z = "currentColor",
      className: $ = ""
    } = Xe() ?? {}, w = !!u || Ze(h), [g, T, k = []] = Ke(m, {
      color: s ?? z,
      width: n ?? t ?? p,
      height: c ?? t ?? p,
      strokeWidth: r ?? j,
      absoluteStrokeWidth: l ?? y,
      nonScalingStroke: d ?? v,
      className: Y($, o),
      hasA11yProp: w,
      attributes: h
    });
    return N.createElement(
      g,
      {
        ref: x,
        ...T
      },
      [
        ...k.map(([M, b]) => N.createElement(M, b)),
        ...Array.isArray(u) ? u : [u]
      ]
    );
  }
);
function _(s, t = [], n = []) {
  const c = typeof s == "string" ? Ue(s, t, n) : s, r = N.forwardRef(
    ({ className: l, ...d }, o) => N.createElement(Ye, {
      ref: o,
      icon: c,
      className: l,
      ...d
    })
  );
  return c.name && (r.displayName = qe(c.name)), r;
}
const me = {
  name: "arrow-down",
  size: 24,
  node: [
    ["path", { d: "M12 5v14", key: "s699le" }],
    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
  ]
};
me.node;
const U = _(me);
const ue = {
  name: "arrow-left",
  size: 24,
  node: [
    ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
    ["path", { d: "M19 12H5", key: "x3x0zl" }]
  ]
};
ue.node;
const he = _(ue);
const xe = {
  name: "arrow-up",
  size: 24,
  node: [
    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
    ["path", { d: "M12 19V5", key: "x0mq9r" }]
  ]
};
xe.node;
const V = _(xe);
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
const Qe = _(pe);
const ge = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
ge.node;
const fe = _(ge);
const je = {
  name: "chevron-left",
  size: 24,
  node: [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]]
};
je.node;
const Je = _(je);
const be = {
  name: "chevron-right",
  size: 24,
  node: [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]
};
be.node;
const ve = _(be);
const Ne = {
  name: "loader-circle",
  size: 24,
  node: [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  aliases: ["loader-2"]
};
Ne.node;
const we = _(Ne);
const ye = {
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
ye.node;
const es = _(ye);
const Ce = {
  name: "plus",
  size: 24,
  node: [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ]
};
Ce.node;
const I = _(Ce);
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
const ts = _(_e), ze = globalThis.Sunrice;
if (!ze) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const a = ze.modules["@sunrice/admin-sdk/ui"];
function q() {
  const [s, t] = N.useState(null), n = /* @__PURE__ */ e.jsx(a.Dialog, { open: s !== null, onOpenChange: (c) => !c && t(null), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
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
const as = 5;
let ns = 0;
const De = () => `f${++ns}`;
function Be(s) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^[0-9_]+/, "").slice(0, 64);
}
function Le(s, t) {
  const n = new Set(t.map((l) => l.handle)), c = Be(s) || "field";
  let r = c;
  for (let l = 2; n.has(r); l++)
    r = `${c}_${l}`;
  return r;
}
function Ie(s) {
  return (s ?? []).map(({ fields: t, ...n }) => ({
    ...n,
    key: De(),
    fields: Ie(t),
    handleTouched: !0
  }));
}
function Ae(s, t) {
  return s.map(({ key: n, handleTouched: c, fields: r, ...l }) => ({
    ...l,
    validation: (l.validation ?? []).map((d) => d.trim()).filter((d) => d !== ""),
    ...t(l.type) ? { fields: Ae(r, t) } : {}
  }));
}
function ls(s, t, n) {
  return { key: De(), type: s, label: t, handle: Le(t, n), required: !1, config: {}, fields: [], handleTouched: !1 };
}
function F(s, t, n) {
  const c = t + n;
  if (t < 0 || t >= s.length || c < 0 || c >= s.length) return s;
  const r = s.slice(), [l] = r.splice(t, 1);
  return r.splice(c, 0, l), r;
}
function cs(s, t, n) {
  if (s.handleTouched) return { ...s, label: t };
  const c = n.filter((r) => r.key !== s.key);
  return { ...s, label: t, handle: Le(t || s.type, c) };
}
function W(s, t) {
  const n = `${t}.`, c = {};
  for (const [r, l] of Object.entries(s))
    r.startsWith(n) && (c[r.slice(n.length)] = l);
  return c;
}
function H(s, t) {
  const n = s[t];
  return { ...W(s, t), ...n !== void 0 ? { "": n } : {} };
}
function se(s, t) {
  return Object.keys(s).some((n) => n === t || n.startsWith(`${t}.`));
}
function R(s) {
  return s && typeof s == "object" && !Array.isArray(s) ? s : {};
}
function rs(s, t) {
  if (typeof s != "string" || s === "") return "";
  const n = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(s);
  return n ? t ? `${n[1]}T${n[2] ?? "00:00"}` : n[1] ?? "" : "";
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
function Is(s) {
  const t = s.replace(/[\u0000- \u007f]+/g, ""), n = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(t);
  return n ? ["http", "https", "mailto", "tel"].includes(n[1].toLowerCase()) : !t.includes("\\");
}
function ms({ ids: s, search: t, collections: n }) {
  const c = new URLSearchParams();
  for (const r of s ?? []) c.append("ids[]", String(r));
  t && c.set("search", t);
  for (const r of n) c.append("collections[]", r);
  return c.toString();
}
function E(s) {
  return { draft: "Draft", scheduled: "Scheduled", published: "Published" }[s];
}
function Q(s, t) {
  if (!s) return "—";
  const n = new Date(s);
  return Number.isNaN(n.getTime()) ? "—" : n.toLocaleString(t, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
function us(s) {
  const t = (n) => String(n).padStart(2, "0");
  return `${s.getFullYear()}-${t(s.getMonth() + 1)}-${t(s.getDate())}T${t(s.getHours())}:${t(s.getMinutes())}`;
}
function P(s, t) {
  try {
    return new Intl.DisplayNames(t ? [t] : void 0, { type: "language" }).of(s.replace("_", "-")) ?? s;
  } catch {
    return s;
  }
}
async function te(s) {
  const t = await fetch(`${S("cms/entry-picker")}?${ms(s)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!t.ok) throw new Error(String(t.status));
  return (await t.json()).items;
}
function hs({ id: s, value: t, multiple: n, max: c, collections: r, invalid: l, onChange: d }) {
  const o = t === null ? [] : Array.isArray(t) ? t : [t], [u, i] = N.useState({}), [m, h] = N.useState(""), [x, p] = N.useState(null), [j, y] = N.useState(!1), v = n && c !== null && o.length >= c, z = o.filter((g) => !u[g]).join(",");
  N.useEffect(() => {
    z !== "" && te({ ids: z.split(",").map(Number), collections: r }).then((g) => i((T) => ({ ...T, ...Object.fromEntries(g.map((k) => [k.id, k])) }))).catch(() => y(!0));
  }, [z]), N.useEffect(() => {
    if (m.trim() === "") {
      p(null);
      return;
    }
    const g = window.setTimeout(() => {
      te({ search: m.trim(), collections: r }).then((T) => {
        p(T), y(!1);
      }).catch(() => y(!0));
    }, 250);
    return () => window.clearTimeout(g);
  }, [m]);
  const $ = (g) => {
    i((T) => ({ ...T, [g.id]: g })), d(n ? [...o, g.id] : g.id), h("");
  }, w = (g) => d(n ? g : g[0] ?? null);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    o.length > 0 && /* @__PURE__ */ e.jsx("ul", { className: "cms:flex cms:flex-col cms:gap-1", children: o.map((g, T) => {
      const k = u[g];
      return /* @__PURE__ */ e.jsxs("li", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-md cms:border cms:px-3 cms:py-1.5 cms:text-sm", children: [
        /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate", children: k ? k.title : `Entry #${g}` }),
        k && /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: k.collection }),
        k && /* @__PURE__ */ e.jsx(a.Badge, { variant: k.status === "published" ? "default" : "secondary", children: E(k.status) }),
        n && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-7",
              "aria-label": `Move ${k?.title ?? g} up`,
              disabled: T === 0,
              onClick: () => w(F(o, T, -1)),
              children: /* @__PURE__ */ e.jsx(V, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-7",
              "aria-label": `Move ${k?.title ?? g} down`,
              disabled: T === o.length - 1,
              onClick: () => w(F(o, T, 1)),
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
            "aria-label": `Remove ${k?.title ?? g}`,
            onClick: () => w(o.filter((M) => M !== g)),
            children: /* @__PURE__ */ e.jsx(ts, {})
          }
        )
      ] }, g);
    }) }),
    !v && (n || o.length === 0) && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-md", children: [
      /* @__PURE__ */ e.jsx($e, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: s,
          className: "cms:pl-9",
          placeholder: "Search entries by title",
          "aria-invalid": l,
          value: m,
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
            onClick: () => $(g),
            children: [
              /* @__PURE__ */ e.jsx("span", { className: "cms:flex-1 cms:truncate", children: g.title }),
              /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: g.collection })
            ]
          }
        ) }, g.id))
      ] })
    ] }),
    j && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: "Entries could not be loaded. Try again." })
  ] });
}
const xs = N.lazy(() => import("./RichTextEditor-BFossVaF.js").then((s) => ({ default: s.RichTextEditor }))), G = "__none";
function C({ message: s }) {
  return s ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: s }) : null;
}
function ae(s) {
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
const ps = ["repeater", "group", "flexible", "link", "media", "rich_text", "entries"];
function gs(s) {
  if (s.label) return s.label;
  const t = s.handle.replace(/_/g, " ");
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function O({ field: s, value: t, onChange: n, errors: c, id: r, content: l = !1 }) {
  const d = gs(s), o = ps.includes(s.type) || ["select", "terms"].includes(s.type) && s.config?.multiple === !0;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", ...o ? { role: "group", "aria-labelledby": `${r}-label` } : {}, children: [
    s.type === "toggle" ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(a.Switch, { id: r, checked: t === !0, onCheckedChange: (u) => n(u) }),
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: r, children: d })
    ] }) : /* @__PURE__ */ e.jsxs(a.Label, { id: `${r}-label`, htmlFor: o ? void 0 : r, children: [
      d,
      s.required && /* @__PURE__ */ e.jsx("span", { className: "cms:text-destructive", children: " *" })
    ] }),
    /* @__PURE__ */ e.jsx(fs, { field: s, value: t, onChange: n, errors: c, id: r, content: l }),
    s.instructions && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s.instructions }),
    /* @__PURE__ */ e.jsx(C, { message: c[""] })
  ] });
}
function fs({ field: s, value: t, onChange: n, errors: c, id: r, content: l }) {
  const d = c[""] !== void 0;
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
          onChange: (o) => n(o.target.value)
        }
      );
    case "rich_text":
      return /* @__PURE__ */ e.jsx(N.Suspense, { fallback: /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-48 cms:w-full" }), children: /* @__PURE__ */ e.jsx(xs, { id: r, labelledBy: `${r}-label`, invalid: d, value: typeof t == "string" ? t : "", onChange: n }) });
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
          "aria-invalid": d,
          value: rs(t, o),
          onChange: (u) => n(is(u.target.value))
        }
      );
    }
    case "select":
      return s.config?.multiple === !0 ? /* @__PURE__ */ e.jsx(le, { options: ae(s), value: Array.isArray(t) ? t.map(String) : [], onChange: n }) : /* @__PURE__ */ e.jsx(ne, { options: ae(s), value: typeof t == "string" ? t : null, onChange: n, id: r, required: s.required === !0 });
    case "terms": {
      const o = s.terms ?? [];
      if (s.config?.multiple === !0) {
        const u = Array.isArray(t) ? t.map(String) : [];
        return /* @__PURE__ */ e.jsx(le, { options: o, value: u, onChange: (i) => n(i.map(Number)) });
      }
      return /* @__PURE__ */ e.jsx(
        ne,
        {
          options: o,
          id: r,
          required: s.required === !0,
          value: t == null ? null : String(t),
          onChange: (u) => n(u === null ? null : Number(u))
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
          onChange: n,
          value: typeof t == "number" || Array.isArray(t) && t.every((o) => typeof o == "number") ? t : null
        }
      );
    case "link":
      return /* @__PURE__ */ e.jsx(bs, { value: R(t), onChange: n, errors: c, id: r });
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
          value: typeof t == "number" || Array.isArray(t) && t.every((o) => typeof o == "number") ? t : null,
          onChange: n
        }
      );
    case "group":
      return /* @__PURE__ */ e.jsx(J, { fields: s.fields ?? [], value: R(t), onChange: n, errors: c, id: r, content: l });
    case "repeater":
      return /* @__PURE__ */ e.jsx(Ns, { field: s, value: Array.isArray(t) ? t : [], onChange: n, errors: c, id: r, content: l });
    case "flexible":
      return /* @__PURE__ */ e.jsx(ws, { field: s, value: Array.isArray(t) ? t : [], onChange: n, errors: c, id: r });
    default:
      return /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: r,
          "aria-invalid": d,
          value: typeof t == "string" ? t : "",
          placeholder: js(s, "placeholder"),
          maxLength: L(s, "max"),
          onChange: (o) => n(o.target.value)
        }
      );
  }
}
function L(s, t) {
  const n = s.config?.[t];
  return typeof n == "number" ? n : void 0;
}
function js(s, t) {
  const n = s.config?.[t];
  return typeof n == "string" ? n : void 0;
}
function J({ fields: s, value: t, onChange: n, errors: c, id: r, content: l }) {
  return /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:gap-4 cms:rounded-lg cms:border cms:p-4", children: s.map((d) => /* @__PURE__ */ e.jsx(
    O,
    {
      id: `${r}-${d.handle}`,
      field: d,
      value: t[d.handle],
      content: l,
      errors: H(c, d.handle),
      onChange: (o) => n({ ...t, [d.handle]: o })
    },
    d.handle
  )) });
}
function ne({ options: s, value: t, onChange: n, id: c, required: r }) {
  return /* @__PURE__ */ e.jsxs(a.Select, { value: t ?? G, onValueChange: (l) => n(l === G ? null : l), children: [
    /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: c, className: "cms:w-full cms:max-w-sm", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
    /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
      !r && /* @__PURE__ */ e.jsx(a.SelectItem, { value: G, children: "None" }),
      s.map((l) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: l.value, children: l.label }, l.value))
    ] })
  ] });
}
function le({ options: s, value: t, onChange: n }) {
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
function bs({ value: s, onChange: t, errors: n, id: c }) {
  const r = (l, d) => {
    const o = { ...s, [l]: d };
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
    /* @__PURE__ */ e.jsx("div", { className: "cms:md:col-span-3", children: /* @__PURE__ */ e.jsx(C, { message: n.url ?? n.label }) })
  ] });
}
function vs(s, t) {
  return !t && (s.fields ?? []).every((n) => n.type === "text");
}
function Ns({ field: s, value: t, onChange: n, errors: c, id: r, content: l = !1 }) {
  const d = s.fields ?? [], o = t.map(R), u = (h, x) => n(o.map((p, j) => j === h ? x : p)), i = (s.label || "row").toLowerCase().replace(/s$/, ""), m = i.charAt(0).toUpperCase() + i.slice(1);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    o.map((h, x) => vs(s, l) ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2", children: [
      d.map((p) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-1 cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            "aria-label": p.label || p.handle,
            placeholder: p.label || p.handle,
            value: typeof h[p.handle] == "string" ? h[p.handle] : "",
            onChange: (j) => u(x, { ...h, [p.handle]: j.target.value })
          }
        ),
        /* @__PURE__ */ e.jsx(C, { message: c[`${x}.${p.handle}`] })
      ] }, p.handle)),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", "aria-label": `Remove ${i} ${x + 1}`, onClick: () => n(o.filter((p, j) => j !== x)), children: /* @__PURE__ */ e.jsx(A, {}) })
    ] }, x) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(
        Me,
        {
          label: `${m} ${x + 1}`,
          index: x,
          count: o.length,
          onMove: (p) => n(F(o, x, p)),
          onRemove: () => n(o.filter((p, j) => j !== x)),
          hidden: l ? h._hidden === !0 : void 0,
          onHidden: (p) => u(x, { ...h, _hidden: p })
        }
      ),
      /* @__PURE__ */ e.jsx(J, { fields: d, value: h, onChange: (p) => u(x, p), errors: H(c, String(x)), id: `${r}-${x}`, content: l })
    ] }, typeof h._id == "string" ? h._id : x)),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => n([...o, l ? os() : {}]), children: [
      /* @__PURE__ */ e.jsx(I, {}),
      " Add ",
      i
    ] }) })
  ] });
}
function ws({ field: s, value: t, onChange: n, errors: c, id: r }) {
  const l = s.blocks ?? [], d = t.map(R), o = (u, i) => n(d.map((m, h) => h === u ? i : m));
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
    d.map((u, i) => {
      const m = l.find((h) => h.type === u.type);
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(
          Me,
          {
            label: m?.label ?? String(u.type),
            badge: !0,
            index: i,
            count: d.length,
            onMove: (h) => n(F(d, i, h)),
            onRemove: () => n(d.filter((h, x) => x !== i)),
            hidden: u.hidden === !0,
            onHidden: (h) => o(i, { ...u, hidden: h })
          }
        ),
        m ? /* @__PURE__ */ e.jsx(
          J,
          {
            fields: m.fields,
            value: R(u.values),
            onChange: (h) => o(i, { ...u, values: h }),
            errors: H(c, `${i}.values`),
            id: `${r}-${i}`,
            content: !0
          }
        ) : /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground", children: "This kind of block no longer exists. Its values are kept." }),
        /* @__PURE__ */ e.jsx(C, { message: c[`${i}.type`] })
      ] }, typeof u.id == "string" ? u.id : i);
    }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", disabled: l.length === 0, children: [
        /* @__PURE__ */ e.jsx(I, {}),
        " Add block"
      ] }) }),
      /* @__PURE__ */ e.jsx(a.DropdownMenuContent, { align: "start", children: l.map((u) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => n([...d, ds(u.type)]), children: u.label }, u.type)) })
    ] }) })
  ] });
}
function Me({ label: s, badge: t = !1, index: n, count: c, onMove: r, onRemove: l, hidden: d, onHidden: o }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
    t ? /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: s }) : /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:font-medium", children: s }),
    d !== void 0 && /* @__PURE__ */ e.jsxs("label", { className: "cms:ml-auto cms:flex cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground", children: [
      /* @__PURE__ */ e.jsx(a.Switch, { checked: !d, onCheckedChange: (u) => o(!u), "aria-label": `Show ${s}` }),
      "Show"
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: d === void 0 ? "cms:ml-auto cms:flex" : "cms:flex", children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Move ${s} up`, disabled: n === 0, onClick: () => r(-1), children: /* @__PURE__ */ e.jsx(V, {}) }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Move ${s} down`, disabled: n === c - 1, onClick: () => r(1), children: /* @__PURE__ */ e.jsx(U, {}) }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": `Remove ${s}`, onClick: l, children: /* @__PURE__ */ e.jsx(A, {}) })
    ] })
  ] });
}
function Fe({ fields: s, onChange: t, types: n, errors: c, depth: r = 1, idPrefix: l = "field" }) {
  const [d, o] = N.useState(() => /* @__PURE__ */ new Set()), u = (h) => o((x) => {
    const p = new Set(x);
    return p.has(h) ? p.delete(h) : p.add(h), p;
  }), i = (h, x) => t(s.map((p, j) => j === h ? x : p)), m = (h) => {
    const x = ls(h.type, h.label, s);
    t([...s, x]), o((p) => new Set(p).add(x.key));
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    s.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:border-dashed cms:p-4 cms:text-sm cms:text-muted-foreground", children: "No fields yet." }),
    s.map((h, x) => {
      const p = n.find((v) => v.type === h.type), j = d.has(h.key) || se(c, String(x)), y = `${l}-${h.key}`;
      return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${se(c, String(x)) ? "cms:border-destructive" : ""}`, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:p-2", children: [
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-expanded": j,
              "aria-controls": y,
              "aria-label": `${j ? "Close" : "Open"} ${h.label || h.handle}`,
              onClick: () => u(h.key),
              children: j ? /* @__PURE__ */ e.jsx(fe, {}) : /* @__PURE__ */ e.jsx(ve, {})
            }
          ),
          /* @__PURE__ */ e.jsxs("button", { type: "button", className: "cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:text-left", onClick: () => u(h.key), children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: h.label || h.handle }),
            /* @__PURE__ */ e.jsx("code", { className: "cms:truncate cms:text-xs cms:text-muted-foreground", children: h.handle })
          ] }),
          h.required && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", children: "Required" }),
          /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: p?.label ?? h.type }),
          /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move up", disabled: x === 0, onClick: () => t(F(s, x, -1)), children: /* @__PURE__ */ e.jsx(V, {}) }),
          /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": "Move down", disabled: x === s.length - 1, onClick: () => t(F(s, x, 1)), children: /* @__PURE__ */ e.jsx(U, {}) }),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Remove ${h.label || h.handle}`,
              onClick: () => t(s.filter((v, z) => z !== x)),
              children: /* @__PURE__ */ e.jsx(A, {})
            }
          )
        ] }),
        j && /* @__PURE__ */ e.jsx(
          ys,
          {
            id: y,
            field: h,
            type: p,
            siblings: s,
            onChange: (v) => i(x, v),
            types: n,
            errors: W(c, String(x)),
            depth: r
          }
        )
      ] }, h.key);
    }),
    /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", children: [
        /* @__PURE__ */ e.jsx(I, {}),
        " Add field"
      ] }) }),
      /* @__PURE__ */ e.jsx(a.DropdownMenuContent, { align: "start", children: n.filter((h) => !h.hasChildren || r < as).map((h) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => m(h), children: h.label }, h.type)) })
    ] }) })
  ] });
}
const D = { default: "__default", yes: "yes", no: "no" };
function ys({ id: s, field: t, type: n, siblings: c, onChange: r, types: l, errors: d, depth: o }) {
  const u = t.config ?? {};
  return /* @__PURE__ */ e.jsxs("div", { id: s, className: "cms:flex cms:flex-col cms:gap-4 cms:border-t cms:p-4", children: [
    !n && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-destructive", children: [
      'The field type "',
      t.type,
      `" isn't registered. Its data is kept; register the type or remove the field.`
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-label`, children: "Label" }),
        /* @__PURE__ */ e.jsx(a.Input, { id: `${s}-label`, value: t.label ?? "", onChange: (i) => r(cs(t, i.target.value, c)) }),
        /* @__PURE__ */ e.jsx(C, { message: d.label })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-handle`, children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: `${s}-handle`,
            className: "cms:font-mono",
            value: t.handle,
            onChange: (i) => r({ ...t, handle: i.target.value, handleTouched: !0 })
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "How templates read it. Renaming it hides values saved under the old one." }),
        /* @__PURE__ */ e.jsx(C, { message: d.handle })
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
          onChange: (i) => r({ ...t, instructions: i.target.value || null })
        }
      ),
      /* @__PURE__ */ e.jsx(C, { message: d.instructions })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-6", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Switch, { id: `${s}-required`, checked: t.required === !0, onCheckedChange: (i) => r({ ...t, required: i }) }),
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-required`, children: "Required" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${s}-translatable`, children: "Per language" }),
        /* @__PURE__ */ e.jsxs(
          a.Select,
          {
            value: t.translatable === !0 ? D.yes : t.translatable === !1 ? D.no : D.default,
            onValueChange: (i) => r({ ...t, translatable: i === D.yes ? !0 : i === D.no ? !1 : null }),
            children: [
              /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: `${s}-translatable`, className: "cms:w-48", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
              /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: D.default, children: "As the type decides" }),
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: D.yes, children: "Yes, translated" }),
                /* @__PURE__ */ e.jsx(a.SelectItem, { value: D.no, children: "No, shared" })
              ] })
            ]
          }
        )
      ] })
    ] }),
    (n?.settings.length ?? 0) > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: n?.settings.map((i) => /* @__PURE__ */ e.jsx(
      O,
      {
        id: `${s}-config-${i.handle}`,
        field: i,
        value: u[i.handle],
        errors: H(d, `config.${i.handle}`),
        onChange: (m) => r({ ...t, config: { ...u, [i.handle]: m } })
      },
      i.handle
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
          onChange: (i) => r({ ...t, validation: i.target.value.split(`
`) })
        }
      ),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "Laravel rules, one per line." }),
      /* @__PURE__ */ e.jsx(C, { message: d.validation ?? Object.entries(d).find(([i]) => i.startsWith("validation."))?.[1] })
    ] }),
    n?.hasChildren && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { children: "Fields inside" }),
      /* @__PURE__ */ e.jsx(
        Fe,
        {
          fields: t.fields,
          onChange: (i) => r({ ...t, fields: i }),
          types: l,
          errors: W(d, "fields"),
          depth: o + 1,
          idPrefix: s
        }
      ),
      /* @__PURE__ */ e.jsx(C, { message: d.fields })
    ] }),
    /* @__PURE__ */ e.jsx(C, { message: d.type })
  ] });
}
function Cs({ kind: s = "blueprint", blueprint: t, fieldTypes: n, usedBy: c = [] }) {
  const r = s === "fieldset" ? "Fieldset" : "Blueprint", l = S(s === "fieldset" ? "cms/fieldsets" : "cms/blueprints"), d = t ? t.title : `New ${r.toLowerCase()}`;
  a.useBreadcrumbs([{ label: `${r}s`, href: l }, { label: d }]);
  const [o, u] = q(), i = f.useForm({ title: t?.title ?? "", handle: t?.handle ?? "" }), [m, h] = N.useState(t !== null), [x, p] = N.useState(() => Ie(t?.fields)), j = ($) => n.find((w) => w.type === $)?.hasChildren === !0, y = i.errors, v = ($) => {
    $.preventDefault(), i.transform((w) => ({
      ...t ? { title: w.title } : w,
      fields: Ae(x, j)
    })), t ? i.put(`${l}/${t.id}`, { preserveScroll: !0 }) : i.post(l);
  }, z = () => t && o(
    `Delete the ${r.toLowerCase()} "${t.title}"? Content keeps its values.`,
    () => f.router.delete(`${l}/${t.id}`, { preserveScroll: !0 })
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: v, className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: d }),
    u,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: l, "aria-label": `Back to ${r.toLowerCase()}s`, children: /* @__PURE__ */ e.jsx(he, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: d })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        t && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "icon", className: "cms:text-destructive", "aria-label": `Delete ${d}`, onClick: z, children: /* @__PURE__ */ e.jsx(A, {}) }),
        /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: i.processing, children: [
          i.processing && /* @__PURE__ */ e.jsx(we, { className: "cms:animate-spin" }),
          t ? "Save" : `Create ${r.toLowerCase()}`
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(C, { message: y.blueprint ?? y.fieldset }),
    /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:grid cms:gap-4 cms:md:grid-cols-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "title", children: "Title" }),
        /* @__PURE__ */ e.jsx(a.Input, { id: "title", value: i.data.title, required: !0, onChange: ($) => {
          i.setData((w) => ({ ...w, title: $.target.value, handle: m ? w.handle : Be($.target.value) }));
        } }),
        /* @__PURE__ */ e.jsx(C, { message: y.title })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "handle", children: "Handle" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: "handle",
            className: "cms:font-mono",
            value: i.data.handle,
            disabled: t !== null,
            required: !0,
            onChange: ($) => {
              h(!0), i.setData("handle", $.target.value);
            }
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: t ? "Set when it was created." : "Lowercase letters, digits and underscores. It can't change later." }),
        /* @__PURE__ */ e.jsx(C, { message: y.handle })
      ] })
    ] }) }),
    c.length > 0 && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      "Used by ",
      c.join(", "),
      ". Changes show there at once."
    ] }),
    /* @__PURE__ */ e.jsxs("section", { className: "cms:flex cms:flex-col cms:gap-3", "aria-labelledby": "fields-heading", children: [
      /* @__PURE__ */ e.jsx("h2", { id: "fields-heading", className: "cms:text-lg cms:font-medium", children: "Fields" }),
      /* @__PURE__ */ e.jsx(Fe, { fields: x, onChange: p, types: n, errors: W(y, "fields") }),
      /* @__PURE__ */ e.jsx(C, { message: y.fields })
    ] })
  ] });
}
function Ee({ noun: s, base: t, rows: n, intro: c }) {
  const r = `${s}s`;
  a.useBreadcrumbs([{ label: r }]);
  const [l, d] = q();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: r }),
    d,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: r }),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: c })
      ] }),
      /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(f.Link, { href: `${t}/create`, children: [
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
              children: /* @__PURE__ */ e.jsx(A, {})
            }
          ) })
        ] }, o.id))
      ] })
    ] }) })
  ] });
}
function ks({ blueprints: s }) {
  const t = f.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(C, { message: t.blueprint }),
    /* @__PURE__ */ e.jsx(
      Ee,
      {
        noun: "Blueprint",
        base: S("cms/blueprints"),
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
function $s({ collection: s, fields: t, locales: n = [], shared: c = [], sharedValues: r = {}, entry: l, values: d, revisions: o, can: u }) {
  const i = S(`cms/collections/${s.handle}/entries`), m = l ? S(`cms/entries/${l.id}`) : i, h = l ? d.title : "New entry";
  a.useBreadcrumbs([{ label: s.title, href: i }, { label: h }]);
  const [x, p] = q(), [j, y] = N.useState(!1), v = f.useForm({ ...d, locale: l?.locale ?? null, version: l?.version ?? null, publish: !1, published_at: null }), z = l ? { locale: l.locale } : {}, $ = n.find((b) => b.main)?.code, w = v.errors, g = l !== null && l.status !== "draft" && !l.hasUnpublishedChanges && !v.isDirty, T = l === null ? u.create : u.update && !l.trashed, k = (b = !1, K = null) => {
    v.transform((Re) => ({ ...Re, publish: b, published_at: K })), l ? v.put(m, { preserveScroll: !0, onSuccess: () => y(!1) }) : v.post(m);
  }, M = (b = null) => {
    u.update ? k(!0, b) : l && f.router.post(`${m}/publish`, { ...z, published_at: b }, { preserveScroll: !0, onSuccess: () => y(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: (b) => {
    b.preventDefault(), k();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: h }),
    p,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Button, { variant: "outline", size: "icon", className: "cms:size-8 cms:shrink-0", asChild: !0, children: /* @__PURE__ */ e.jsx(f.Link, { href: i, "aria-label": `Back to ${s.title}`, children: /* @__PURE__ */ e.jsx(he, {}) }) }),
        /* @__PURE__ */ e.jsx("h1", { className: "cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight", children: h }),
        l && /* @__PURE__ */ e.jsx(a.Badge, { variant: l.status === "published" ? "default" : "secondary", children: l.trashed ? "In the trash" : E(l.status) }),
        v.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: "Unsaved changes" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
        l?.trashed && u.delete && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", onClick: () => f.router.post(`${m}/restore`, {}, { preserveScroll: !0 }), children: [
          /* @__PURE__ */ e.jsx(ss, {}),
          " Restore"
        ] }),
        l && !l.trashed && u.delete && /* @__PURE__ */ e.jsx(
          a.Button,
          {
            type: "button",
            variant: "outline",
            size: "icon",
            className: "cms:text-destructive",
            "aria-label": "Move to the trash",
            onClick: () => x(`Move "${d.title}" to the trash? It comes off the site; you can restore it.`, () => f.router.delete(m)),
            children: /* @__PURE__ */ e.jsx(A, {})
          }
        ),
        T && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", variant: l && u.publish ? "outline" : "default", disabled: v.processing, children: [
          v.processing && /* @__PURE__ */ e.jsx(we, { className: "cms:animate-spin" }),
          l ? "Save draft" : "Create draft"
        ] }),
        l && !l.trashed && u.publish && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex", children: [
          /* @__PURE__ */ e.jsx(a.Button, { type: "button", className: "cms:rounded-r-none", disabled: v.processing || g, onClick: () => M(), children: l.status === "draft" ? "Publish" : g ? "Published" : "Publish changes" }),
          /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "icon", className: "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": "More publishing options", children: /* @__PURE__ */ e.jsx(fe, {}) }) }),
            /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", children: [
              /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { onSelect: () => y(!0), children: [
                /* @__PURE__ */ e.jsx(Qe, {}),
                " Publish on a date…"
              ] }),
              l.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
                /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => f.router.post(`${m}/unpublish`, z, { preserveScroll: !0 }), children: "Unpublish" })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }),
    l && n.length > 1 && /* @__PURE__ */ e.jsx(
      Ts,
      {
        entryUrl: m,
        current: l.locale,
        locales: n,
        canAdd: u.create && !l.trashed,
        canRemove: u.delete && !l.isMain && !l.trashed,
        onRemove: () => x(
          `Remove the ${P(l.locale)} translation of "${d.title}"? Its revisions go with it.`,
          () => f.router.delete(`${m}/translations/${l.locale}`)
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
            /* @__PURE__ */ e.jsx(C, { message: w.title })
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
            /* @__PURE__ */ e.jsx(C, { message: w.slug })
          ] })
        ] }) }),
        t.length > 0 && /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsx(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-6", children: t.map((b) => c.includes(b.handle) ? /* @__PURE__ */ e.jsxs("fieldset", { disabled: !0, className: "cms:flex cms:flex-col cms:gap-1", children: [
          /* @__PURE__ */ e.jsx(O, { id: `data-${b.handle}`, field: b, content: !0, value: r[b.handle], errors: {}, onChange: () => {
          } }),
          /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
            "Shared by all languages: edit it in ",
            $ ? P($) : "the main language",
            "."
          ] })
        ] }, b.handle) : /* @__PURE__ */ e.jsx(
          O,
          {
            id: `data-${b.handle}`,
            field: b,
            content: !0,
            value: v.data.data[b.handle],
            errors: H(w, `data.${b.handle}`),
            onChange: (K) => v.setData("data", { ...v.data.data, [b.handle]: K })
          },
          b.handle
        )) }) })
      ] }),
      l && /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:flex-col cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs(a.Card, { children: [
          /* @__PURE__ */ e.jsx(a.CardHeader, { children: /* @__PURE__ */ e.jsx(a.CardTitle, { className: "cms:text-base", children: "Status" }) }),
          /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
            /* @__PURE__ */ e.jsxs("p", { children: [
              E(l.status),
              l.status !== "draft" && l.publishedAt ? ` · ${Q(l.publishedAt)}` : ""
            ] }),
            l.status !== "draft" && l.hasUnpublishedChanges && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "The draft has changes the site doesn't show yet." })
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs(a.Card, { children: [
          /* @__PURE__ */ e.jsx(a.CardHeader, { children: /* @__PURE__ */ e.jsx(a.CardTitle, { className: "cms:text-base", children: "Revisions" }) }),
          /* @__PURE__ */ e.jsxs(a.CardContent, { className: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
            o.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "Each publish keeps one." }),
            o.map((b) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
                /* @__PURE__ */ e.jsx("div", { className: "cms:truncate", children: b.title }),
                /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: Q(b.createdAt) })
              ] }),
              u.update && !l.trashed && /* @__PURE__ */ e.jsx(
                a.Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  onClick: () => f.router.post(S(`cms/revisions/${b.id}/restore`), {}, { preserveScroll: !0 }),
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
        onClose: () => y(!1),
        processing: v.processing,
        current: l?.publishedAt ?? null,
        onSchedule: (b) => M(b)
      }
    )
  ] });
}
function Ts({ entryUrl: s, current: t, locales: n, canAdd: c, canRemove: r, onRemove: l }) {
  return /* @__PURE__ */ e.jsxs("nav", { "aria-label": "Languages", className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
    n.map((d) => {
      const o = `${P(d.code)}${d.main ? " (main)" : ""}`;
      return d.status === null ? c ? /* @__PURE__ */ e.jsxs(
        a.Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "cms:border-dashed",
          onClick: () => f.router.post(`${s}/translations`, { locale: d.code }),
          children: [
            /* @__PURE__ */ e.jsx(I, {}),
            " ",
            o
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
          onClick: () => d.code !== t && f.router.get(`${s}/edit`, { locale: d.code }),
          children: [
            o,
            /* @__PURE__ */ e.jsx(a.Badge, { variant: d.status === "published" ? "default" : "outline", className: "cms:ml-1", children: E(d.status) })
          ]
        },
        d.code
      );
    }),
    r && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:ml-auto cms:text-destructive", onClick: l, children: "Remove this language" })
  ] });
}
function _s({ open: s, onClose: t, onSchedule: n, current: c, processing: r }) {
  const [l, d] = N.useState("");
  return N.useEffect(() => {
    s && d(us(c ? new Date(c) : new Date(Date.now() + 864e5)));
  }, [s, c]), /* @__PURE__ */ e.jsx(a.Dialog, { open: s, onOpenChange: (o) => !o && t(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: "Publish on a date" }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: "The entry goes live then; a date in the past publishes it now with that date." })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "published-at", children: "Date and time" }),
      /* @__PURE__ */ e.jsx(a.Input, { id: "published-at", type: "datetime-local", value: l, onChange: (o) => d(o.target.value) }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: "In your time zone." })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: t, children: "Cancel" }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", disabled: l === "" || r, onClick: () => n(new Date(l).toISOString()), children: "Publish" })
    ] })
  ] }) });
}
function zs({ collection: s, collections: t, entries: n, query: c, can: r }) {
  a.useBreadcrumbs([{ label: "Entries", href: S("cms/entries") }, ...s ? [{ label: s.title }] : []]);
  const [l, d] = N.useState(c.search), o = s ? S(`cms/collections/${s.handle}/entries`) : "", u = (i) => {
    const m = { ...c, ...i };
    f.router.get(
      o,
      { ...m.search ? { search: m.search } : {}, ...m.trashed ? { trashed: 1 } : {} },
      { preserveState: !0, preserveScroll: !0, replace: !0 }
    );
  };
  return N.useEffect(() => {
    if (l === c.search) return;
    const i = window.setTimeout(() => u({ search: l }), 300);
    return () => window.clearTimeout(i);
  }, [l]), !s || !n ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: "Entries" }),
    /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Entries" }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no collections yet. Create one under Structure → Collections, then come back to write its entries." })
  ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: s.title }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
        /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
        t.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: s.handle, onValueChange: (i) => f.router.get(S(`cms/collections/${i}/entries`)), children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": "Collection", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: t.map((i) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: i.handle, children: i.title }, i.handle)) })
        ] })
      ] }),
      r?.create && !c.trashed && /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(f.Link, { href: `${o}/create`, children: [
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
            value: l,
            onChange: (i) => d(i.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(a.Button, { variant: c.trashed ? "secondary" : "ghost", size: "sm", onClick: () => u({ trashed: !c.trashed }), children: c.trashed ? "Back to entries" : "Trash" })
    ] }),
    /* @__PURE__ */ e.jsx(a.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(a.Table, { children: [
      /* @__PURE__ */ e.jsx(a.TableHeader, { children: /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Title" }),
        /* @__PURE__ */ e.jsx(a.TableHead, { children: "Status" }),
        /* @__PURE__ */ e.jsx(a.TableHead, { children: s.dated ? "Date" : "Updated" })
      ] }) }),
      /* @__PURE__ */ e.jsxs(a.TableBody, { children: [
        n.data.length === 0 && /* @__PURE__ */ e.jsx(a.TableRow, { children: /* @__PURE__ */ e.jsx(a.TableCell, { colSpan: 3, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: c.trashed ? "The trash is empty." : c.search ? "Nothing matches." : "No entries yet." }) }),
        n.data.map((i) => /* @__PURE__ */ e.jsxs(a.TableRow, { children: [
          /* @__PURE__ */ e.jsxs(a.TableCell, { children: [
            /* @__PURE__ */ e.jsx(f.Link, { href: S(`cms/entries/${i.id}/edit`), className: "cms:font-medium cms:hover:underline", children: i.title }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
              "/",
              i.slug
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-1", children: [
            /* @__PURE__ */ e.jsx(a.Badge, { variant: i.status === "published" ? "default" : "secondary", children: E(i.status) }),
            i.locales.length > 1 && i.locales.filter((m) => !m.main).map((m) => /* @__PURE__ */ e.jsx(
              a.Badge,
              {
                variant: m.status === "published" ? "default" : "outline",
                className: m.status === null ? "cms:opacity-50" : "",
                title: `${m.code}: ${m.status === null ? "not translated" : E(m.status)}`,
                children: m.code.toUpperCase()
              },
              m.code
            ))
          ] }) }),
          /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:text-muted-foreground", children: Q(s.dated ? i.publishedAt : i.updatedAt) })
        ] }, i.id))
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
            children: /* @__PURE__ */ e.jsx(Je, {})
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
            children: /* @__PURE__ */ e.jsx(ve, {})
          }
        )
      ] })
    ] })
  ] });
}
function Ds({ fieldsets: s }) {
  const t = f.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(C, { message: t.fieldset }),
    /* @__PURE__ */ e.jsx(
      Ee,
      {
        noun: "Fieldset",
        base: S("cms/fieldsets"),
        rows: s,
        intro: "Fields shared between blueprints, and the kinds of block of flexible fields."
      }
    )
  ] });
}
const X = "__top";
function Bs({ taxonomy: s, taxonomies: t, terms: n, locales: c, locale: r }) {
  a.useBreadcrumbs([{ label: "Terms", href: S("cms/terms") }, ...s ? [{ label: s.title }] : []]);
  const [l, d] = q(), [o, u] = N.useState(null);
  if (!s)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(f.Head, { title: "Terms" }),
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: "Terms" }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: "There are no taxonomies yet. Create one under Structure → Taxonomies (categories, tags…), then add its terms here." })
    ] });
  const i = S(`cms/taxonomies/${s.handle}/terms`);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:max-w-4xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: s.title }),
    d,
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx("h1", { className: "cms:text-2xl cms:font-medium cms:tracking-tight", children: s.title }),
      t.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: s.handle, onValueChange: (m) => f.router.get(S(`cms/taxonomies/${m}/terms`)), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": "Taxonomy", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(a.SelectContent, { children: t.map((m) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: m.handle, children: m.title }, m.handle)) })
      ] }),
      c.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: r, onValueChange: (m) => f.router.get(i, { locale: m }), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:ml-auto cms:w-48", "aria-label": "Language", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(a.SelectContent, { children: c.map((m) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: m, children: P(m) }, m)) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsx(a.CardContent, { children: /* @__PURE__ */ e.jsx(
      ce,
      {
        action: i,
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
      n.map((m) => {
        const h = n.filter((p) => p.parentId === m.parentId), x = h.findIndex((p) => p.id === m.id);
        return /* @__PURE__ */ e.jsx("li", { className: "cms:p-3", style: { paddingLeft: `${0.75 + m.depth * 1.5}rem` }, children: o === m.id ? /* @__PURE__ */ e.jsx(
          ce,
          {
            action: S(`cms/terms/${m.id}`),
            method: "put",
            locale: r,
            terms: n,
            hierarchical: s.hierarchical,
            term: m,
            submitLabel: "Save",
            onDone: () => u(null)
          }
        ) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0 cms:flex-1", children: [
            m.title !== null ? /* @__PURE__ */ e.jsx("span", { className: "cms:font-medium", children: m.title }) : /* @__PURE__ */ e.jsxs("span", { className: "cms:text-muted-foreground cms:italic", children: [
              m.fallback,
              " · not translated"
            ] }),
            m.slug && /* @__PURE__ */ e.jsxs("span", { className: "cms:ml-2 cms:text-xs cms:text-muted-foreground", children: [
              "/",
              m.slug
            ] })
          ] }),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-label": `Move ${m.fallback} up`,
              disabled: x === 0,
              onClick: () => f.router.post(S(`cms/terms/${m.id}/move`), { direction: "up" }, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(V, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8",
              "aria-label": `Move ${m.fallback} down`,
              disabled: x === h.length - 1,
              onClick: () => f.router.post(S(`cms/terms/${m.id}/move`), { direction: "down" }, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(U, {})
            }
          ),
          /* @__PURE__ */ e.jsx(a.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": `Edit ${m.fallback}`, onClick: () => u(m.id), children: /* @__PURE__ */ e.jsx(es, {}) }),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": `Delete ${m.fallback}`,
              onClick: () => l(
                `Delete "${m.fallback}" in every language? Terms under it move up a level.`,
                () => f.router.delete(S(`cms/terms/${m.id}`), { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(A, {})
            }
          )
        ] }) }, m.id);
      })
    ] }) })
  ] });
}
function ce({ action: s, method: t, locale: n, terms: c, hierarchical: r, term: l, submitLabel: d, onDone: o }) {
  const u = f.useForm({ title: l?.title ?? "", slug: l?.slug ?? "", parent_id: l?.parentId ?? null, locale: n }), i = u.errors, m = /* @__PURE__ */ new Set();
  if (l) {
    m.add(l.id);
    const p = c.findIndex((j) => j.id === l.id);
    for (let j = p + 1; j < c.length && (c[j]?.depth ?? 0) > l.depth; j++) m.add(c[j].id);
  }
  const h = (p) => {
    p.preventDefault(), u.submit(t, s, { preserveScroll: !0, onSuccess: () => {
      t === "post" && u.reset("title", "slug"), o?.();
    } });
  }, x = l ? `term-${l.id}` : "new-term";
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: h, className: "cms:grid cms:items-start cms:gap-3 cms:md:grid-cols-[2fr_1.5fr_1.5fr_auto]", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${x}-title`, className: l ? "cms:sr-only" : "", children: "Title" }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: `${x}-title`,
          value: u.data.title,
          placeholder: l?.fallback,
          required: !0,
          onChange: (p) => u.setData("title", p.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(C, { message: i.title })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${x}-slug`, className: l ? "cms:sr-only" : "", children: "Slug" }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: `${x}-slug`,
          className: "cms:font-mono",
          value: u.data.slug,
          placeholder: "Made from the title",
          onChange: (p) => u.setData("slug", p.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(C, { message: i.slug })
    ] }),
    r ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: `${x}-parent`, className: l ? "cms:sr-only" : "", children: "Under" }),
      /* @__PURE__ */ e.jsxs(
        a.Select,
        {
          value: u.data.parent_id === null ? X : String(u.data.parent_id),
          onValueChange: (p) => u.setData("parent_id", p === X ? null : Number(p)),
          children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: `${x}-parent`, children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
              /* @__PURE__ */ e.jsx(a.SelectItem, { value: X, children: "Top level" }),
              c.filter((p) => !m.has(p.id)).map((p) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: String(p.id), children: [
                "— ".repeat(p.depth),
                p.title ?? p.fallback
              ] }, p.id))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ e.jsx(C, { message: i.parent_id })
    ] }) : /* @__PURE__ */ e.jsx("div", {}),
    /* @__PURE__ */ e.jsxs("div", { className: `cms:flex cms:gap-2 ${l ? "" : "cms:md:mt-6"}`, children: [
      /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: u.processing, children: [
        !l && /* @__PURE__ */ e.jsx(I, {}),
        " ",
        d
      ] }),
      o && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", onClick: o, children: "Cancel" })
    ] })
  ] });
}
Pe({
  pages: {
    "Cms/Blueprints/Index": ks,
    "Cms/Blueprints/Form": Cs,
    "Cms/Fieldsets/Index": Ds,
    "Cms/Entries/Index": zs,
    "Cms/Entries/Editor": Ss,
    "Cms/Terms/Index": Bs
  }
});
export {
  N as R,
  Ls as _,
  S as a,
  _ as c,
  Is as i,
  e as j,
  a as u
};
