import { j as a, t as $ } from "./admin-DCThpc9t.js";
import { u as x } from "./ui-Dh5wfMwT.js";
import { D as w, F as C, E as g, b as F, G as N, I as E, A as H, J as o, h as D, K as I, L } from "./FieldInput-C3H3znTN.js";
import { C as A } from "./EntryStatus-Dmf-Fvt4.js";
import { h as O } from "./EntriesPicker-B2JoqUav.js";
import { F as T } from "./FieldError-BkOAaOKr.js";
const k = (d) => {
  const { hint: l, tooltip: m } = L(d);
  return l !== null || m !== null;
}, G = "cms:flex cms:flex-col cms:gap-1 cms:opacity-60";
function q({ fields: d, values: l, onChange: m, errors: t, storageKey: c, shared: e = [], sharedValues: i = {}, sharedNote: f, disabled: j = !1, changed: b = [] }) {
  const u = [], v = { ...i, ...l };
  for (const s of d.filter((r) => w(r, v))) {
    const r = u[u.length - 1];
    s.type === "group" ? u.push(s) : Array.isArray(r) ? r.push(s) : u.push([s]);
  }
  const p = f && (e.length > 0 || O(d)) ? /* @__PURE__ */ a.jsx("p", { role: "note", className: "cms:rounded-lg cms:border cms:border-dashed cms:px-3 cms:py-2 cms:text-sm cms:text-muted-foreground", children: f }) : null;
  return p === null && u.length === 0 ? null : /* @__PURE__ */ a.jsxs("div", { className: N("cms:gap-6"), children: [
    p && /* @__PURE__ */ a.jsx("div", { className: "cms:col-span-12", children: p }),
    u.map((s) => {
      if (Array.isArray(s))
        return /* @__PURE__ */ a.jsx(x.Card, { className: "cms:col-span-12 cms:min-w-0", children: /* @__PURE__ */ a.jsx(x.CardContent, { children: /* @__PURE__ */ a.jsx("fieldset", { disabled: j, className: "cms:min-w-0", children: /* @__PURE__ */ a.jsx("div", { className: N(), children: s.map((n) => e.includes(n.handle) ? /* @__PURE__ */ a.jsx("fieldset", { disabled: !0, className: `${G} ${g(n)}`, title: $("Shared by all languages"), children: /* @__PURE__ */ a.jsx(C, { id: `data-${n.handle}`, field: n, content: !0, value: i[n.handle], errors: {}, onChange: () => {
        } }) }, n.handle) : /* @__PURE__ */ a.jsx("div", { className: g(n), children: /* @__PURE__ */ a.jsx(
          C,
          {
            id: `data-${n.handle}`,
            field: n,
            content: !0,
            value: l[n.handle],
            errors: F(t, `data.${n.handle}`),
            onChange: (S) => m(n.handle, S),
            marker: b.includes(n.handle) ? /* @__PURE__ */ a.jsx(A, {}) : null
          }
        ) }, n.handle)) }) }) }) }, `fields-${s[0]?.handle ?? ""}`);
      const r = e.includes(s.handle), h = (r ? i : l)[s.handle], y = F(t, `data.${s.handle}`);
      return /* @__PURE__ */ a.jsx(
        x.CollapsibleCard,
        {
          className: g(s),
          title: b.includes(s.handle) ? /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
            o(s),
            /* @__PURE__ */ a.jsx(A, {})
          ] }) : o(s),
          titleClassName: "cms:text-base",
          headerAction: k(s) ? /* @__PURE__ */ a.jsx(I, { field: s, id: `data-${s.handle}`, label: o(s), maxWidth: "cms:max-w-40 cms:sm:max-w-64" }) : void 0,
          storageKey: `${c}:${s.handle}`,
          hasErrors: !r && D(t, `data.${s.handle}`),
          children: /* @__PURE__ */ a.jsxs(
            "fieldset",
            {
              disabled: r || j,
              role: "group",
              "aria-label": o(s),
              className: `cms:flex cms:flex-col cms:gap-2 ${r ? "cms:opacity-60" : ""}`,
              title: r ? $("Shared by all languages") : void 0,
              children: [
                /* @__PURE__ */ a.jsx(E, { text: s.instructions, className: "cms:-mt-1 cms:mb-2" }),
                /* @__PURE__ */ a.jsx(
                  H,
                  {
                    bare: !0,
                    fields: s.fields ?? [],
                    id: `data-${s.handle}`,
                    content: !0,
                    errors: r ? {} : y,
                    value: h && typeof h == "object" && !Array.isArray(h) ? h : {},
                    onChange: (n) => m(s.handle, n)
                  }
                ),
                /* @__PURE__ */ a.jsx(T, { message: r ? void 0 : y[""] })
              ]
            }
          )
        },
        s.handle
      );
    })
  ] });
}
function z(d, l, m) {
  return d.map((t, c) => ({
    code: t,
    name: m(t),
    main: c === 0,
    missing: l !== null && !l.includes(t)
  }));
}
function B(d, l, m, t, c) {
  return d.filter((e) => e.status !== null || l).map((e) => {
    const i = { code: e.code, name: e.name ?? c(e.code), main: e.main };
    return e.status === null ? { ...i, missing: !0 } : e.outdated ? { ...i, status: { tone: "warning", label: m("Outdated: the main language changed since") }, description: t(e.status) } : e.status === "published" ? { ...i, status: { tone: "success", label: t(e.status) } } : { ...i, description: t(e.status) };
  });
}
export {
  q as F,
  G as S,
  B as e,
  z as l
};
