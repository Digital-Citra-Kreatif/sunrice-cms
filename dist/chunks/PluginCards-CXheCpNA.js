import { j as s, t as o, r as p } from "./admin-DkIqfqBq.js";
import { _ as a, u } from "./ui-BzV6lfEf.js";
function b({ note: e, redirectsUrl: r }) {
  return /* @__PURE__ */ s.jsx("div", { "aria-live": "polite", children: e !== null && /* @__PURE__ */ s.jsxs("p", { className: "cms:text-xs cms:text-muted-foreground", children: [
    e === "redirects" ? o("Once published, the old address redirects to the new one.") : o("The old address will stop working (404) unless a redirect is added."),
    e === "breaks" && r && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      " ",
      /* @__PURE__ */ s.jsx("a", { href: r, target: "_blank", rel: "noopener", className: "cms:underline cms:underline-offset-2 cms:hover:text-foreground", children: o("Add a redirect") })
    ] })
  ] }) });
}
function N({ cards: e, disabled: r, storageKey: n }) {
  return e.map((t) => /* @__PURE__ */ s.jsx(v, { card: t, disabled: r, storageKey: `${n}:${t.key}` }, t.key));
}
function v({ card: e, disabled: r, storageKey: n }) {
  const [t, d] = a.useState(e.values), [l, c] = a.useState({}), [m, f] = a.useState(!1);
  a.useEffect(() => d(e.values), [e.values]);
  const h = JSON.stringify(t) !== JSON.stringify(e.values), x = () => p.router.put(e.url, { values: t }, {
    preserveScroll: !0,
    preserveState: !0,
    // Its errors apart from the editor's own fields (which may share a name).
    errorBag: `card-${e.key}`,
    onStart: () => f(!0),
    onFinish: () => f(!1),
    onSuccess: () => c({}),
    onError: (i) => c(i)
  });
  return /* @__PURE__ */ s.jsxs(
    u.CollapsibleCard,
    {
      title: e.title,
      description: e.description ?? void 0,
      titleClassName: "cms:text-base",
      storageKey: n,
      hasErrors: Object.keys(l).length > 0,
      contentClassName: "cms:flex cms:flex-col cms:gap-4 cms:text-sm",
      children: [
        /* @__PURE__ */ s.jsx("fieldset", { disabled: r || m, className: "cms:min-w-0", children: /* @__PURE__ */ s.jsx(
          u.FormSections,
          {
            bare: !0,
            sections: e.sections,
            data: t,
            errors: l,
            storageKey: n,
            onChange: (i, g) => {
              d({ ...t, [i]: g }), c({ ...l, [i]: void 0 });
            }
          }
        ) }),
        /* @__PURE__ */ s.jsx(u.Button, { type: "button", size: "sm", className: "cms:w-fit", disabled: r || m || !h, onClick: x, children: o("Save") })
      ]
    }
  );
}
export {
  N as P,
  b as S
};
