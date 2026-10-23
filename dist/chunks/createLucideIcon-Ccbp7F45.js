const N = globalThis.Sunrice;
if (!N) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const l = N.modules.react;
const E = (t) => t?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
function I(t, e, n = []) {
  if (e == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: E(t),
    size: 24,
    node: e,
    ...n.length > 0 ? { aliases: n } : {}
  };
}
const $ = (t) => {
  let e = "", n = !1;
  for (const o of t) {
    if (o === "-" || o === "_" || o <= " ") {
      n = e.length > 0;
      continue;
    }
    e.length === 0 ? e += o.toLowerCase() : e += n ? o.toUpperCase() : o, n = !1;
  }
  return e;
};
const j = (t) => {
  const e = $(t);
  return e.charAt(0).toUpperCase() + e.slice(1);
};
const S = (...t) => t.filter((e, n, o) => !!e && e.trim() !== "" && o.indexOf(e) === n).join(" ").trim();
const c = {
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
function x(t) {
  return t != null;
}
function P(t, e = {}) {
  const n = e.attributeNames ?? {}, o = (i) => n[i] ?? i, u = t.size ?? t.width ?? c.width, h = t.size ?? t.height ?? c.height, a = t.aliases?.filter((i) => typeof i == "string" && i.trim() !== "").map((i) => `lucide-${i}`) ?? [], f = [...t.name ? [`lucide-${t.name}`] : [], ...a], s = e.className?.split(" ").filter(Boolean) ?? [], w = e.includeDefaultClasses === !1 ? S(...s) : S("lucide", ...f, ...s), b = e.absoluteStrokeWidth ? Number(e.strokeWidth ?? c["stroke-width"]) * Number(t.size ?? t.width ?? c.width) / Number(e.size ?? e.width ?? c.width) : e.strokeWidth ?? c["stroke-width"];
  return [
    "svg",
    {
      ...Object.entries(c).reduce((i, [r, d]) => (i[o(r)] = d, i), {}),
      ..."color" in e && e.color && {
        [o("stroke")]: e.color
      },
      ..."size" in e && x(e.size) && {
        [o("width")]: e.size,
        [o("height")]: e.size
      },
      ..."width" in e && x(e.width) && {
        [o("width")]: e.width
      },
      ..."height" in e && x(e.height) && {
        [o("height")]: e.height
      },
      [o("stroke-width")]: b,
      ...w && {
        [o("class")]: w
      },
      [o("viewBox")]: `0 0 ${u} ${h}`,
      ...e.hasA11yProp === !1 ? {
        [o("aria-hidden")]: "true"
      } : {},
      ..."attributes" in e && e.attributes
    },
    t.node.map((i) => {
      const [r, d, g] = i, k = e.nonScalingStroke ? { [o("vector-effect")]: "non-scaling-stroke", ...d } : d;
      return g ? [r, k, g] : [r, k];
    })
  ];
}
function _(t, e = {}) {
  return P(t, {
    ...e,
    attributeNames: {
      ...e.attributeNames,
      class: "className",
      "stroke-width": "strokeWidth",
      "stroke-linecap": "strokeLinecap",
      "stroke-linejoin": "strokeLinejoin",
      "vector-effect": "vectorEffect"
    }
  });
}
const R = (t) => {
  for (const e in t)
    if (e.startsWith("aria-") || e === "role" || e === "title")
      return !0;
  return !1;
}, p = l.createContext({}), D = () => l.useContext(p), F = l.forwardRef(
  ({
    color: t,
    size: e,
    width: n,
    height: o,
    strokeWidth: u,
    absoluteStrokeWidth: h,
    nonScalingStroke: a,
    className: f = "",
    children: s,
    iconNode: w = [],
    icon: b = {
      node: w,
      aliases: [],
      size: 24
    },
    ...C
  }, i) => {
    const {
      size: r = 24,
      strokeWidth: d = 2,
      absoluteStrokeWidth: g = !1,
      nonScalingStroke: k = !1,
      color: m = "currentColor",
      className: A = ""
    } = D() ?? {}, W = !!s || R(C), [z, v, L = []] = _(b, {
      color: t ?? m,
      width: n ?? e ?? r,
      height: o ?? e ?? r,
      strokeWidth: u ?? d,
      absoluteStrokeWidth: h ?? g,
      nonScalingStroke: a ?? k,
      className: S(A, f),
      hasA11yProp: W,
      attributes: C
    });
    return l.createElement(
      z,
      {
        ref: i,
        ...v
      },
      [
        ...L.map(([y, B]) => l.createElement(y, B)),
        ...Array.isArray(s) ? s : [s]
      ]
    );
  }
);
function T(t, e = [], n = []) {
  const o = typeof t == "string" ? I(t, e, n) : t, u = l.forwardRef(
    ({ className: h, ...a }, f) => l.createElement(F, {
      ref: f,
      icon: o,
      className: h,
      ...a
    })
  );
  return o.name && (u.displayName = j(o.name)), u;
}
export {
  l as _,
  T as c
};
