import { j as a, t as b } from "./admin-BXp1g0Oh.js";
import { u as o } from "./ui-Dh5wfMwT.js";
import { D as E, F as $, E as h, b as C, G as F, A as w, I as u, h as D } from "./FieldInput-BSoX_0Vs.js";
import { C as N } from "./EntryStatus-DZSmr1B2.js";
import { h as I } from "./EntriesPicker-BENyeSiq.js";
import { F as k } from "./FieldError-Cn9v3eQ-.js";
const G = "cms:flex cms:flex-col cms:gap-1 cms:opacity-60";
function _({ fields: p, values: d, onChange: x, errors: t, storageKey: v, shared: m = [], sharedValues: c = {}, sharedNote: j, disabled: g = !1, changed: f = [] }) {
  const r = [], A = { ...c, ...d };
  for (const s of p.filter((l) => E(l, A))) {
    const l = r[r.length - 1];
    s.type === "group" ? r.push(s) : Array.isArray(l) ? l.push(s) : r.push([s]);
  }
  const i = j && (m.length > 0 || I(p)) ? /* @__PURE__ */ a.jsx("p", { role: "note", className: "cms:rounded-lg cms:border cms:border-dashed cms:px-3 cms:py-2 cms:text-sm cms:text-muted-foreground", children: j }) : null;
  return i === null && r.length === 0 ? null : /* @__PURE__ */ a.jsxs("div", { className: F("cms:gap-6"), children: [
    i && /* @__PURE__ */ a.jsx("div", { className: "cms:col-span-12", children: i }),
    r.map((s) => {
      if (Array.isArray(s))
        return /* @__PURE__ */ a.jsx(o.Card, { className: "cms:col-span-12 cms:min-w-0", children: /* @__PURE__ */ a.jsx(o.CardContent, { children: /* @__PURE__ */ a.jsx("fieldset", { disabled: g, className: "cms:min-w-0", children: /* @__PURE__ */ a.jsx("div", { className: F(), children: s.map((e) => m.includes(e.handle) ? /* @__PURE__ */ a.jsx("fieldset", { disabled: !0, className: `${G} ${h(e)}`, title: b("Shared by all languages"), children: /* @__PURE__ */ a.jsx($, { id: `data-${e.handle}`, field: e, content: !0, value: c[e.handle], errors: {}, onChange: () => {
        } }) }, e.handle) : /* @__PURE__ */ a.jsx("div", { className: h(e), children: /* @__PURE__ */ a.jsx(
          $,
          {
            id: `data-${e.handle}`,
            field: e,
            content: !0,
            value: d[e.handle],
            errors: C(t, `data.${e.handle}`),
            onChange: (S) => x(e.handle, S),
            marker: f.includes(e.handle) ? /* @__PURE__ */ a.jsx(N, {}) : null
          }
        ) }, e.handle)) }) }) }) }, `fields-${s[0]?.handle ?? ""}`);
      const l = m.includes(s.handle), n = (l ? c : d)[s.handle], y = C(t, `data.${s.handle}`);
      return /* @__PURE__ */ a.jsx(
        o.CollapsibleCard,
        {
          className: h(s),
          title: f.includes(s.handle) ? /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
            u(s),
            /* @__PURE__ */ a.jsx(N, {})
          ] }) : u(s),
          titleClassName: "cms:text-base",
          description: s.instructions ?? void 0,
          storageKey: `${v}:${s.handle}`,
          hasErrors: !l && D(t, `data.${s.handle}`),
          children: /* @__PURE__ */ a.jsxs(
            "fieldset",
            {
              disabled: l || g,
              role: "group",
              "aria-label": u(s),
              className: `cms:flex cms:flex-col cms:gap-2 ${l ? "cms:opacity-60" : ""}`,
              title: l ? b("Shared by all languages") : void 0,
              children: [
                /* @__PURE__ */ a.jsx(
                  w,
                  {
                    bare: !0,
                    fields: s.fields ?? [],
                    id: `data-${s.handle}`,
                    content: !0,
                    errors: l ? {} : y,
                    value: n && typeof n == "object" && !Array.isArray(n) ? n : {},
                    onChange: (e) => x(s.handle, e)
                  }
                ),
                /* @__PURE__ */ a.jsx(k, { message: l ? void 0 : y[""] })
              ]
            }
          )
        },
        s.handle
      );
    })
  ] });
}
export {
  _ as F,
  G as S
};
