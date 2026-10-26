import { j as s, t as y } from "./admin-CQrIqXPu.js";
import { u as x } from "./ui-Dh5wfMwT.js";
import { D as E, F as $, E as p, b as C, G as F, I as w, A as H, J as c, h as D, K as I, L as k } from "./FieldInput-DrKWQcNq.js";
import { C as N } from "./EntryStatus-BgzGOETB.js";
import { h as G } from "./EntriesPicker-DZ2n_tm-.js";
import { F as K } from "./FieldError-DB-u7pB2.js";
const L = (t) => {
  const { hint: n, tooltip: d } = k(t);
  return n !== null || d !== null;
}, O = "cms:flex cms:flex-col cms:gap-1 cms:opacity-60";
function q({ fields: t, values: n, onChange: d, errors: h, storageKey: A, shared: i = [], sharedValues: o = {}, sharedNote: j, disabled: g = !1, changed: f = [] }) {
  const r = [], v = { ...o, ...n };
  for (const a of t.filter((l) => E(l, v))) {
    const l = r[r.length - 1];
    a.type === "group" ? r.push(a) : Array.isArray(l) ? l.push(a) : r.push([a]);
  }
  const u = j && (i.length > 0 || G(t)) ? /* @__PURE__ */ s.jsx("p", { role: "note", className: "cms:rounded-lg cms:border cms:border-dashed cms:px-3 cms:py-2 cms:text-sm cms:text-muted-foreground", children: j }) : null;
  return u === null && r.length === 0 ? null : /* @__PURE__ */ s.jsxs("div", { className: F("cms:gap-6"), children: [
    u && /* @__PURE__ */ s.jsx("div", { className: "cms:col-span-12", children: u }),
    r.map((a) => {
      if (Array.isArray(a))
        return /* @__PURE__ */ s.jsx(x.Card, { className: "cms:col-span-12 cms:min-w-0", children: /* @__PURE__ */ s.jsx(x.CardContent, { children: /* @__PURE__ */ s.jsx("fieldset", { disabled: g, className: "cms:min-w-0", children: /* @__PURE__ */ s.jsx("div", { className: F(), children: a.map((e) => i.includes(e.handle) ? /* @__PURE__ */ s.jsx("fieldset", { disabled: !0, className: `${O} ${p(e)}`, title: y("Shared by all languages"), children: /* @__PURE__ */ s.jsx($, { id: `data-${e.handle}`, field: e, content: !0, value: o[e.handle], errors: {}, onChange: () => {
        } }) }, e.handle) : /* @__PURE__ */ s.jsx("div", { className: p(e), children: /* @__PURE__ */ s.jsx(
          $,
          {
            id: `data-${e.handle}`,
            field: e,
            content: !0,
            value: n[e.handle],
            errors: C(h, `data.${e.handle}`),
            onChange: (S) => d(e.handle, S),
            marker: f.includes(e.handle) ? /* @__PURE__ */ s.jsx(N, {}) : null
          }
        ) }, e.handle)) }) }) }) }, `fields-${a[0]?.handle ?? ""}`);
      const l = i.includes(a.handle), m = (l ? o : n)[a.handle], b = C(h, `data.${a.handle}`);
      return /* @__PURE__ */ s.jsx(
        x.CollapsibleCard,
        {
          className: p(a),
          title: f.includes(a.handle) ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
            c(a),
            /* @__PURE__ */ s.jsx(N, {})
          ] }) : c(a),
          titleClassName: "cms:text-base",
          headerAction: L(a) ? /* @__PURE__ */ s.jsx(I, { field: a, id: `data-${a.handle}`, label: c(a), maxWidth: "cms:max-w-40 cms:sm:max-w-64" }) : void 0,
          storageKey: `${A}:${a.handle}`,
          hasErrors: !l && D(h, `data.${a.handle}`),
          children: /* @__PURE__ */ s.jsxs(
            "fieldset",
            {
              disabled: l || g,
              role: "group",
              "aria-label": c(a),
              className: `cms:flex cms:flex-col cms:gap-2 ${l ? "cms:opacity-60" : ""}`,
              title: l ? y("Shared by all languages") : void 0,
              children: [
                /* @__PURE__ */ s.jsx(w, { text: a.instructions, className: "cms:-mt-1 cms:mb-2" }),
                /* @__PURE__ */ s.jsx(
                  H,
                  {
                    bare: !0,
                    fields: a.fields ?? [],
                    id: `data-${a.handle}`,
                    content: !0,
                    errors: l ? {} : b,
                    value: m && typeof m == "object" && !Array.isArray(m) ? m : {},
                    onChange: (e) => d(a.handle, e)
                  }
                ),
                /* @__PURE__ */ s.jsx(K, { message: l ? void 0 : b[""] })
              ]
            }
          )
        },
        a.handle
      );
    })
  ] });
}
export {
  q as F,
  O as S
};
