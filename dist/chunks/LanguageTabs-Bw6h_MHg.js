import { j as l, t as u, l as o } from "./admin-CYfPJLU2.js";
import { C as x } from "./check-OeKFYRnl.js";
function p(e, a, n, t, m) {
  const s = a[0], c = e === s ? t(":language (main)", { language: m(e) }) : m(e), i = a.filter((g) => g !== e).map(m).join(", ");
  return n !== null && !n.includes(e) ? t("Editing: :language, not translated yet", { language: c }) : i === "" ? t("Editing: :language", { language: c }) : t("Editing: :language — switch to edit :others", { language: c, others: i });
}
function j({ current: e, locales: a, translated: n, onSwitch: t }) {
  if (a.length < 2) return null;
  const m = p(e, a, n, u, o);
  return /* @__PURE__ */ l.jsxs("nav", { "aria-label": u("Languages"), className: "cms:flex cms:flex-wrap cms:items-center cms:gap-x-3 cms:gap-y-2", children: [
    /* @__PURE__ */ l.jsx("div", { className: "cms:inline-flex cms:items-center cms:gap-0.5 cms:rounded-md cms:bg-muted cms:p-0.5", children: a.map((s, c) => {
      const i = s === e, g = n === null || n.includes(s), r = c === 0 ? u(":language (main)", { language: o(s) }) : o(s), d = g ? r : u(":language: not translated yet", { language: r });
      return /* @__PURE__ */ l.jsxs(
        "button",
        {
          type: "button",
          title: d,
          "aria-label": d,
          "aria-current": i ? "page" : void 0,
          onClick: () => !i && t(s),
          className: `cms:inline-flex cms:h-7 cms:min-w-10 cms:items-center cms:justify-center cms:gap-1 cms:rounded cms:px-2.5 cms:text-xs cms:font-semibold cms:tracking-wide cms:uppercase cms:transition-colors ${i ? "cms:bg-card cms:text-foreground cms:shadow-xs" : "cms:text-muted-foreground cms:hover:text-foreground"} ${g ? "" : "cms:italic cms:opacity-70"}`,
          children: [
            s,
            g && n !== null && /* @__PURE__ */ l.jsx(x, { "aria-hidden": !0, className: "cms:size-3 cms:text-emerald-600" })
          ]
        },
        s
      );
    }) }),
    /* @__PURE__ */ l.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", "aria-live": "polite", children: m })
  ] });
}
export {
  j as L
};
