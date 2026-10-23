import { j as s, t as f } from "./admin-D8w3Ih7q.js";
import { u as m } from "./ui-Dh5wfMwT.js";
import { z as C, F as g, b as j, x as S, A as y, h as E } from "./FieldInput-B0EIykHK.js";
import { h as v } from "./EntriesPicker-BeYNoSdl.js";
import { F as N } from "./FieldError-DGX_mF_G.js";
const w = "cms:flex cms:flex-col cms:gap-1 cms:opacity-60";
function K({ fields: h, values: n, onChange: i, errors: d, storageKey: b, shared: o = [], sharedValues: c = {}, sharedNote: u, disabled: p = !1 }) {
  const l = [], F = { ...c, ...n };
  for (const a of h.filter((r) => C(r, F))) {
    const r = l[l.length - 1];
    a.type === "group" ? l.push(a) : Array.isArray(r) ? r.push(a) : l.push([a]);
  }
  const $ = u && (o.length > 0 || v(h)) ? /* @__PURE__ */ s.jsx("p", { role: "note", className: "cms:rounded-lg cms:border cms:border-dashed cms:px-3 cms:py-2 cms:text-sm cms:text-muted-foreground", children: u }) : null;
  return /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    $,
    l.map((a) => {
      if (Array.isArray(a))
        return /* @__PURE__ */ s.jsx(m.Card, { children: /* @__PURE__ */ s.jsx(m.CardContent, { children: /* @__PURE__ */ s.jsx("fieldset", { disabled: p, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: a.map((e) => o.includes(e.handle) ? /* @__PURE__ */ s.jsx("fieldset", { disabled: !0, className: w, title: f("Shared by all languages"), children: /* @__PURE__ */ s.jsx(g, { id: `data-${e.handle}`, field: e, content: !0, value: c[e.handle], errors: {}, onChange: () => {
        } }) }, e.handle) : /* @__PURE__ */ s.jsx(
          g,
          {
            id: `data-${e.handle}`,
            field: e,
            content: !0,
            value: n[e.handle],
            errors: j(d, `data.${e.handle}`),
            onChange: (A) => i(e.handle, A)
          },
          e.handle
        )) }) }) }, `fields-${a[0]?.handle ?? ""}`);
      const r = o.includes(a.handle), t = (r ? c : n)[a.handle], x = j(d, `data.${a.handle}`);
      return /* @__PURE__ */ s.jsx(
        m.CollapsibleCard,
        {
          title: y(a),
          titleClassName: "cms:text-base",
          description: a.instructions ?? void 0,
          storageKey: `${b}:${a.handle}`,
          hasErrors: !r && E(d, `data.${a.handle}`),
          children: /* @__PURE__ */ s.jsxs(
            "fieldset",
            {
              disabled: r || p,
              role: "group",
              "aria-label": y(a),
              className: `cms:flex cms:flex-col cms:gap-2 ${r ? "cms:opacity-60" : ""}`,
              title: r ? f("Shared by all languages") : void 0,
              children: [
                /* @__PURE__ */ s.jsx(
                  S,
                  {
                    bare: !0,
                    fields: a.fields ?? [],
                    id: `data-${a.handle}`,
                    content: !0,
                    errors: r ? {} : x,
                    value: t && typeof t == "object" && !Array.isArray(t) ? t : {},
                    onChange: (e) => i(a.handle, e)
                  }
                ),
                /* @__PURE__ */ s.jsx(N, { message: r ? void 0 : x[""] })
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
  K as F,
  w as S
};
