import { j as e, t as l, a as M } from "./admin-BtPpLgsG.js";
import { _ as i } from "./createLucideIcon-Ccbp7F45.js";
import { u as x } from "./ui-Dh5wfMwT.js";
import { E as T, X as _, p as F } from "./TermsPicker-BWZIfyFK.js";
import { S as K } from "./search-3zKi7F1_.js";
async function z(n) {
  const m = await fetch(`${M("cms/entries/picker")}?${F(n)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!m.ok) throw new Error(String(m.status));
  const c = await m.json();
  return { items: c.items, unavailable: c.unavailable ?? [] };
}
function L(n) {
  return n.length < 2 ? n[0] ?? "" : l(":items and :last", { items: n.slice(0, -1).join(", "), last: n[n.length - 1] });
}
function Y({ id: n, value: m, multiple: c, max: j, collections: b, invalid: D, onChange: w, emptyHint: N }) {
  const r = m === null ? [] : Array.isArray(m) ? m : [m], [f, v] = i.useState({}), [o, S] = i.useState(""), [h, u] = i.useState(!1), [d, k] = i.useState(null), [y, R] = i.useState([]), [$, p] = i.useState(!1), A = c && j !== null && r.length >= j, g = r.filter((s) => !f[s]).join(",");
  i.useEffect(() => {
    g !== "" && z({ ids: g.split(",").map(Number), collections: b }).then(({ items: s }) => v((a) => ({ ...a, ...Object.fromEntries(s.map((t) => [t.id, t])) }))).catch(() => p(!0));
  }, [g]), i.useEffect(() => {
    if (!h) {
      k(null);
      return;
    }
    const s = window.setTimeout(() => {
      z({ search: o.trim(), collections: b }).then((a) => {
        k(a.items), R(a.unavailable), p(!1);
      }).catch(() => p(!0));
    }, o.trim() === "" ? 0 : 250);
    return () => window.clearTimeout(s);
  }, [o, h]);
  const B = (s) => {
    v((a) => ({ ...a, [s.id]: s })), w(c ? [...r, s.id] : s.id), S("");
  }, E = (s) => w(c ? s : s[0] ?? null);
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    r.length > 0 && /* @__PURE__ */ e.jsx(x.SortableList, { items: r, getId: (s) => s, getLabel: (s) => f[s]?.title ?? `Entry #${s}`, onReorder: (s) => E(s), disabled: !c, className: "cms:grid-cols-[minmax(0,1fr)] cms:gap-1", children: (s, { handle: a }) => {
      const t = f[s];
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-2 cms:rounded-md cms:border cms:bg-card cms:px-2 cms:py-1 cms:text-sm", children: [
        c && /* @__PURE__ */ e.jsx(x.SortableHandle, { ...a, label: l("Move :title", { title: t?.title ?? s }) }),
        /* @__PURE__ */ e.jsxs("div", { className: `cms:flex cms:min-w-0 cms:flex-1 cms:flex-wrap cms:items-center cms:gap-x-2 cms:gap-y-0.5 ${c ? "" : "cms:pl-1"}`, children: [
          /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:max-w-full cms:truncate", title: t?.title, children: t ? t.title : l("Entry #:id", { id: s }) }),
          t && /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:min-w-0 cms:max-w-full cms:flex-wrap cms:items-center cms:gap-1", children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:truncate cms:text-xs cms:text-muted-foreground", children: t.collection }),
            /* @__PURE__ */ e.jsx(T, { status: t.status, changes: t.changes })
          ] })
        ] }),
        /* @__PURE__ */ e.jsx(
          x.Button,
          {
            type: "button",
            variant: "ghost",
            size: "icon",
            className: "cms:size-7 cms:shrink-0",
            "aria-label": l("Remove :title", { title: t?.title ?? s }),
            onClick: () => E(r.filter((C) => C !== s)),
            children: /* @__PURE__ */ e.jsx(_, {})
          }
        )
      ] });
    } }),
    !A && (c || r.length === 0) && /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:max-w-md", children: [
      /* @__PURE__ */ e.jsx(K, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
      /* @__PURE__ */ e.jsx(
        x.Input,
        {
          id: n,
          className: "cms:pl-9",
          placeholder: l("Search entries by title"),
          "aria-invalid": D,
          value: o,
          autoComplete: "off",
          "aria-expanded": d !== null,
          onFocus: () => u(!0),
          onBlur: () => u(!1),
          onKeyDown: (s) => {
            s.key === "Escape" && h && (s.preventDefault(), u(!1));
          },
          onChange: (s) => {
            S(s.target.value), u(!0);
          }
        }
      ),
      d !== null && /* @__PURE__ */ e.jsxs("ul", { role: "listbox", "aria-label": l("Matching entries"), className: "cms:absolute cms:z-10 cms:mt-1 cms:max-h-64 cms:w-full cms:overflow-auto cms:rounded-md cms:border cms:bg-card cms:p-1 cms:shadow-md", children: [
        d.filter((s) => !r.includes(s.id)).length === 0 && /* @__PURE__ */ e.jsxs("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: [
          o.trim() === "" ? l("No entries yet.") : l("No entries match."),
          N && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            " ",
            N
          ] })
        ] }),
        y.length > 0 && /* @__PURE__ */ e.jsx("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: l("Your role can't see entries of :collections: ask an editor to link them.", { collections: L(y) }) }),
        d.filter((s) => !r.includes(s.id)).map((s) => /* @__PURE__ */ e.jsx("li", { role: "option", "aria-selected": !1, children: /* @__PURE__ */ e.jsxs(
          "button",
          {
            type: "button",
            className: "cms:flex cms:w-full cms:items-center cms:gap-2 cms:rounded cms:px-2 cms:py-1.5 cms:text-left cms:text-sm cms:hover:bg-accent",
            onMouseDown: (a) => a.preventDefault(),
            onClick: () => B(s),
            children: [
              /* @__PURE__ */ e.jsx("span", { className: "cms:flex-1 cms:truncate", children: s.title }),
              /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: s.collection })
            ]
          }
        ) }, s.id))
      ] })
    ] }),
    $ && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: l("Entries could not be loaded. Try again.") })
  ] });
}
export {
  Y as E
};
