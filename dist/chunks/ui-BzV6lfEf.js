const x = globalThis.Sunrice;
if (!x) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const l = x.modules.react;
const $ = (t) => t?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
function j(t, e, i = []) {
  if (e == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: $(t),
    size: 24,
    node: e,
    ...i.length > 0 ? { aliases: i } : {}
  };
}
const I = (t) => {
  let e = "", i = !1;
  for (const o of t) {
    if (o === "-" || o === "_" || o <= " ") {
      i = e.length > 0;
      continue;
    }
    e.length === 0 ? e += o.toLowerCase() : e += i ? o.toUpperCase() : o, i = !1;
  }
  return e;
};
const P = (t) => {
  const e = I(t);
  return e.charAt(0).toUpperCase() + e.slice(1);
};
const m = (...t) => t.filter((e, i, o) => !!e && e.trim() !== "" && o.indexOf(e) === i).join(" ").trim();
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
function S(t) {
  return t != null;
}
function T(t, e = {}) {
  const i = e.attributeNames ?? {}, o = (n) => i[n] ?? n, u = t.size ?? t.width ?? c.width, h = t.size ?? t.height ?? c.height, a = t.aliases?.filter((n) => typeof n == "string" && n.trim() !== "").map((n) => `lucide-${n}`) ?? [], f = [...t.name ? [`lucide-${t.name}`] : [], ...a], s = e.className?.split(" ").filter(Boolean) ?? [], w = e.includeDefaultClasses === !1 ? m(...s) : m("lucide", ...f, ...s), b = e.absoluteStrokeWidth ? Number(e.strokeWidth ?? c["stroke-width"]) * Number(t.size ?? t.width ?? c.width) / Number(e.size ?? e.width ?? c.width) : e.strokeWidth ?? c["stroke-width"];
  return [
    "svg",
    {
      ...Object.entries(c).reduce((n, [r, d]) => (n[o(r)] = d, n), {}),
      ..."color" in e && e.color && {
        [o("stroke")]: e.color
      },
      ..."size" in e && S(e.size) && {
        [o("width")]: e.size,
        [o("height")]: e.size
      },
      ..."width" in e && S(e.width) && {
        [o("width")]: e.width
      },
      ..."height" in e && S(e.height) && {
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
    t.node.map((n) => {
      const [r, d, g] = n, k = e.nonScalingStroke ? { [o("vector-effect")]: "non-scaling-stroke", ...d } : d;
      return g ? [r, k, g] : [r, k];
    })
  ];
}
function _(t, e = {}) {
  return T(t, {
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
const p = (t) => {
  for (const e in t)
    if (e.startsWith("aria-") || e === "role" || e === "title")
      return !0;
  return !1;
}, R = l.createContext({}), D = () => l.useContext(R), F = l.forwardRef(
  ({
    color: t,
    size: e,
    width: i,
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
  }, n) => {
    const {
      size: r = 24,
      strokeWidth: d = 2,
      absoluteStrokeWidth: g = !1,
      nonScalingStroke: k = !1,
      color: A = "currentColor",
      className: W = ""
    } = D() ?? {}, z = !!s || p(C), [v, L, y = []] = _(b, {
      color: t ?? A,
      width: i ?? e ?? r,
      height: o ?? e ?? r,
      strokeWidth: u ?? d,
      absoluteStrokeWidth: h ?? g,
      nonScalingStroke: a ?? k,
      className: m(W, f),
      hasA11yProp: z,
      attributes: C
    });
    return l.createElement(
      v,
      {
        ref: n,
        ...L
      },
      [
        ...y.map(([B, E]) => l.createElement(B, E)),
        ...Array.isArray(s) ? s : [s]
      ]
    );
  }
);
function U(t, e = [], i = []) {
  const o = typeof t == "string" ? j(t, e, i) : t, u = l.forwardRef(
    ({ className: h, ...a }, f) => l.createElement(F, {
      ref: f,
      icon: o,
      className: h,
      ...a
    })
  );
  return o.name && (u.displayName = P(o.name)), u;
}
const N = globalThis.Sunrice;
if (!N) throw new Error("[sunrice] This bundle needs the Sunrice admin panel (window.Sunrice is missing).");
const q = N.modules["@imajiner/admin-sdk/ui"];
export {
  l as _,
  U as c,
  q as u
};
