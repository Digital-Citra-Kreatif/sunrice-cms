import { j as e, t as j } from "./admin-DHtIIW6o.js";
import { u as c } from "./ui-Dh5wfMwT.js";
import { z as E, F as y, b, x as v, B as h, h as N } from "./FieldInput-BTBWVKy6.js";
import { C as F } from "./EntryStatus-CCbll7lu.js";
import { h as k } from "./EntriesPicker-CiRbK2ZS.js";
import { F as w } from "./FieldError-B75QlVdW.js";
const D = "cms:flex cms:flex-col cms:gap-1 cms:opacity-60";
function L({ fields: i, values: t, onChange: u, errors: d, storageKey: C, shared: o = [], sharedValues: m = {}, sharedNote: x, disabled: p = !1, changed: g = [] }) {
  const l = [], $ = { ...m, ...t };
  for (const a of i.filter((r) => E(r, $))) {
    const r = l[l.length - 1];
    a.type === "group" ? l.push(a) : Array.isArray(r) ? r.push(a) : l.push([a]);
  }
  const A = x && (o.length > 0 || k(i)) ? /* @__PURE__ */ e.jsx("p", { role: "note", className: "cms:rounded-lg cms:border cms:border-dashed cms:px-3 cms:py-2 cms:text-sm cms:text-muted-foreground", children: x }) : null;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    A,
    l.map((a) => {
      if (Array.isArray(a))
        return /* @__PURE__ */ e.jsx(c.Card, { children: /* @__PURE__ */ e.jsx(c.CardContent, { children: /* @__PURE__ */ e.jsx("fieldset", { disabled: p, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: a.map((s) => o.includes(s.handle) ? /* @__PURE__ */ e.jsx("fieldset", { disabled: !0, className: D, title: j("Shared by all languages"), children: /* @__PURE__ */ e.jsx(y, { id: `data-${s.handle}`, field: s, content: !0, value: m[s.handle], errors: {}, onChange: () => {
        } }) }, s.handle) : /* @__PURE__ */ e.jsx(
          y,
          {
            id: `data-${s.handle}`,
            field: s,
            content: !0,
            value: t[s.handle],
            errors: b(d, `data.${s.handle}`),
            onChange: (S) => u(s.handle, S),
            marker: g.includes(s.handle) ? /* @__PURE__ */ e.jsx(F, {}) : null
          },
          s.handle
        )) }) }) }, `fields-${a[0]?.handle ?? ""}`);
      const r = o.includes(a.handle), n = (r ? m : t)[a.handle], f = b(d, `data.${a.handle}`);
      return /* @__PURE__ */ e.jsx(
        c.CollapsibleCard,
        {
          title: g.includes(a.handle) ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            h(a),
            /* @__PURE__ */ e.jsx(F, {})
          ] }) : h(a),
          titleClassName: "cms:text-base",
          description: a.instructions ?? void 0,
          storageKey: `${C}:${a.handle}`,
          hasErrors: !r && N(d, `data.${a.handle}`),
          children: /* @__PURE__ */ e.jsxs(
            "fieldset",
            {
              disabled: r || p,
              role: "group",
              "aria-label": h(a),
              className: `cms:flex cms:flex-col cms:gap-2 ${r ? "cms:opacity-60" : ""}`,
              title: r ? j("Shared by all languages") : void 0,
              children: [
                /* @__PURE__ */ e.jsx(
                  v,
                  {
                    bare: !0,
                    fields: a.fields ?? [],
                    id: `data-${a.handle}`,
                    content: !0,
                    errors: r ? {} : f,
                    value: n && typeof n == "object" && !Array.isArray(n) ? n : {},
                    onChange: (s) => u(a.handle, s)
                  }
                ),
                /* @__PURE__ */ e.jsx(w, { message: r ? void 0 : f[""] })
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
  L as F,
  D as S
};
