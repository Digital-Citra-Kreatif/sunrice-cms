import { j as s } from "./admin-DGcn53md.js";
import { u as o } from "./ui-BzV6lfEf.js";
import { D as A, B as S, F as b, E as x, b as y, G as C, H as w, S as E, z as H, I as p, h as L, J as D, K as G, L as I } from "./FieldInput-jUHNFEOX.js";
import { C as $ } from "./TermsPicker-Dr4AsQhf.js";
import { F as O } from "./FieldError-BL_8-QnZ.js";
const T = (m) => {
  const { hint: t, tooltip: d } = I(m);
  return t !== null || d !== null;
}, k = "cms:flex cms:flex-col cms:gap-1 cms:opacity-60";
function J({ fields: m, values: t, onChange: d, errors: l, storageKey: h, shared: r = [], sharedValues: i = {}, mainLanguage: N = null, disabled: f = !1, changed: g = [] }) {
  const u = [], v = { ...i, ...t };
  for (const a of m.filter((n) => A(n, v))) {
    const n = u[u.length - 1];
    a.type === "group" ? u.push(a) : Array.isArray(n) ? n.push(a) : u.push([a]);
  }
  return u.length === 0 ? null : /* @__PURE__ */ s.jsx(S.Provider, { value: N, children: /* @__PURE__ */ s.jsx(o.CollapsibleCardGroup, { className: "cms:gap-6", children: /* @__PURE__ */ s.jsx("div", { className: C("cms:gap-6"), children: u.map((a) => {
    if (Array.isArray(a))
      return /* @__PURE__ */ s.jsx(o.Card, { className: "cms:col-span-12 cms:min-w-0", children: /* @__PURE__ */ s.jsx(o.CardContent, { children: /* @__PURE__ */ s.jsx("fieldset", { disabled: f, className: "cms:min-w-0", children: /* @__PURE__ */ s.jsx("div", { className: C(), children: a.map((e) => r.includes(e.handle) ? /* @__PURE__ */ s.jsx("fieldset", { disabled: !0, className: `${k} ${x(e)}`, children: /* @__PURE__ */ s.jsx(b, { id: `data-${e.handle}`, field: e, content: !0, value: i[e.handle], errors: {}, onChange: () => {
      }, shared: !0 }) }, e.handle) : /* @__PURE__ */ s.jsx("div", { className: x(e), children: /* @__PURE__ */ s.jsx(
        b,
        {
          id: `data-${e.handle}`,
          field: e,
          content: !0,
          value: t[e.handle],
          errors: y(l, `data.${e.handle}`),
          onChange: (F) => d(e.handle, F),
          marker: g.includes(e.handle) ? /* @__PURE__ */ s.jsx($, {}) : null
        }
      ) }, e.handle)) }) }) }) }, `fields-${a[0]?.handle ?? ""}`);
    const n = r.includes(a.handle), c = (n ? i : t)[a.handle], j = y(l, `data.${a.handle}`);
    return /* @__PURE__ */ s.jsx(
      o.CollapsibleCard,
      {
        className: x(a),
        summary: o.cardSummary(G(a.fields ?? [], c)) || void 0,
        title: g.includes(a.handle) ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
          p(a),
          /* @__PURE__ */ s.jsx($, {})
        ] }) : p(a),
        titleClassName: "cms:text-base",
        headerAction: T(a) ? /* @__PURE__ */ s.jsx(D, { field: a, id: `data-${a.handle}`, label: p(a), maxWidth: "cms:max-w-40 cms:sm:max-w-64" }) : void 0,
        storageKey: `${h}:${a.handle}`,
        hasErrors: !n && L(l, `data.${a.handle}`),
        children: /* @__PURE__ */ s.jsxs("fieldset", { disabled: n || f, role: "group", "aria-label": p(a), className: `cms:flex cms:flex-col cms:gap-2 ${n ? "cms:opacity-60" : ""}`, children: [
          /* @__PURE__ */ s.jsx(w, { text: a.instructions, className: "cms:-mt-1 cms:mb-2" }),
          n && /* @__PURE__ */ s.jsx(E, { className: "cms:-mt-1 cms:mb-2" }),
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
  }) }) }) });
}
function P(m, t, d) {
  return m.map((l, h) => ({
    code: l,
    name: d(l),
    main: h === 0,
    missing: t !== null && !t.includes(l)
  }));
}
function W(m, t, d, l, h) {
  return m.filter((r) => r.status !== null || t).map((r) => {
    const i = { code: r.code, name: r.name ?? h(r.code), main: r.main };
    return r.status === null ? { ...i, missing: !0 } : r.outdated ? { ...i, status: { tone: "warning", label: d("Outdated: the main language changed since") }, description: l(r.status) } : r.status === "published" ? { ...i, status: { tone: "success", label: l(r.status) } } : { ...i, description: l(r.status) };
  });
}
export {
  J as F,
  k as S,
  W as e,
  P as l
};
