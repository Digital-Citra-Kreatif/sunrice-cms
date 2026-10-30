import { j as s } from "./admin-DAGzaoYs.js";
import { u as x } from "./ui-Dh5wfMwT.js";
import { D as A, B as w, F as b, E as p, b as $, G as y, H as E, S, z as H, I as o, h as D, J as I, K as L } from "./FieldInput-mGQAw7Z2.js";
import { C } from "./TermsPicker-BK5YZMp_.js";
import { F as O } from "./FieldError-D00wjzOP.js";
const T = (m) => {
  const { hint: l, tooltip: d } = L(m);
  return l !== null || d !== null;
}, k = "cms:flex cms:flex-col cms:gap-1 cms:opacity-60";
function B({ fields: m, values: l, onChange: d, errors: t, storageKey: h, shared: r = [], sharedValues: i = {}, mainLanguage: N = null, disabled: f = !1, changed: g = [] }) {
  const u = [], F = { ...i, ...l };
  for (const a of m.filter((n) => A(n, F))) {
    const n = u[u.length - 1];
    a.type === "group" ? u.push(a) : Array.isArray(n) ? n.push(a) : u.push([a]);
  }
  return u.length === 0 ? null : /* @__PURE__ */ s.jsx(w.Provider, { value: N, children: /* @__PURE__ */ s.jsx("div", { className: y("cms:gap-6"), children: u.map((a) => {
    if (Array.isArray(a))
      return /* @__PURE__ */ s.jsx(x.Card, { className: "cms:col-span-12 cms:min-w-0", children: /* @__PURE__ */ s.jsx(x.CardContent, { children: /* @__PURE__ */ s.jsx("fieldset", { disabled: f, className: "cms:min-w-0", children: /* @__PURE__ */ s.jsx("div", { className: y(), children: a.map((e) => r.includes(e.handle) ? /* @__PURE__ */ s.jsx("fieldset", { disabled: !0, className: `${k} ${p(e)}`, children: /* @__PURE__ */ s.jsx(b, { id: `data-${e.handle}`, field: e, content: !0, value: i[e.handle], errors: {}, onChange: () => {
      }, shared: !0 }) }, e.handle) : /* @__PURE__ */ s.jsx("div", { className: p(e), children: /* @__PURE__ */ s.jsx(
        b,
        {
          id: `data-${e.handle}`,
          field: e,
          content: !0,
          value: l[e.handle],
          errors: $(t, `data.${e.handle}`),
          onChange: (v) => d(e.handle, v),
          marker: g.includes(e.handle) ? /* @__PURE__ */ s.jsx(C, {}) : null
        }
      ) }, e.handle)) }) }) }) }, `fields-${a[0]?.handle ?? ""}`);
    const n = r.includes(a.handle), c = (n ? i : l)[a.handle], j = $(t, `data.${a.handle}`);
    return /* @__PURE__ */ s.jsx(
      x.CollapsibleCard,
      {
        className: p(a),
        title: g.includes(a.handle) ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
          o(a),
          /* @__PURE__ */ s.jsx(C, {})
        ] }) : o(a),
        titleClassName: "cms:text-base",
        headerAction: T(a) ? /* @__PURE__ */ s.jsx(I, { field: a, id: `data-${a.handle}`, label: o(a), maxWidth: "cms:max-w-40 cms:sm:max-w-64" }) : void 0,
        storageKey: `${h}:${a.handle}`,
        hasErrors: !n && D(t, `data.${a.handle}`),
        children: /* @__PURE__ */ s.jsxs("fieldset", { disabled: n || f, role: "group", "aria-label": o(a), className: `cms:flex cms:flex-col cms:gap-2 ${n ? "cms:opacity-60" : ""}`, children: [
          /* @__PURE__ */ s.jsx(E, { text: a.instructions, className: "cms:-mt-1 cms:mb-2" }),
          n && /* @__PURE__ */ s.jsx(S, { className: "cms:-mt-1 cms:mb-2" }),
          /* @__PURE__ */ s.jsx(
            H,
            {
              bare: !0,
              fields: a.fields ?? [],
              id: `data-${a.handle}`,
              content: !0,
              errors: n ? {} : j,
              value: c && typeof c == "object" && !Array.isArray(c) ? c : {},
              onChange: (e) => d(a.handle, e)
            }
          ),
          /* @__PURE__ */ s.jsx(O, { message: n ? void 0 : j[""] })
        ] })
      },
      a.handle
    );
  }) }) });
}
function J(m, l, d) {
  return m.map((t, h) => ({
    code: t,
    name: d(t),
    main: h === 0,
    missing: l !== null && !l.includes(t)
  }));
}
function P(m, l, d, t, h) {
  return m.filter((r) => r.status !== null || l).map((r) => {
    const i = { code: r.code, name: r.name ?? h(r.code), main: r.main };
    return r.status === null ? { ...i, missing: !0 } : r.outdated ? { ...i, status: { tone: "warning", label: d("Outdated: the main language changed since") }, description: t(r.status) } : r.status === "published" ? { ...i, status: { tone: "success", label: t(r.status) } } : { ...i, description: t(r.status) };
  });
}
export {
  B as F,
  k as S,
  P as e,
  J as l
};
