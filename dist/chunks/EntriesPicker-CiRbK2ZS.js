import { j as r, t as o, a as T } from "./admin-DHtIIW6o.js";
import { _ as u } from "./createLucideIcon-Ccbp7F45.js";
import { u as g } from "./ui-Dh5wfMwT.js";
import { E as U, X as _ } from "./EntryStatus-CCbll7lu.js";
import { S as B } from "./search-3zKi7F1_.js";
function K(e) {
  return e && typeof e == "object" && !Array.isArray(e) ? e : {};
}
function q(e, t) {
  if (typeof e != "string" || e === "") return "";
  const n = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(e);
  return n ? t ? `${n[1]}T${n[2] ?? "00:00"}` : n[1] ?? "" : "";
}
function G(e) {
  return e === "" ? null : e;
}
function H(e) {
  const t = typeof e == "number" ? e : typeof e == "string" && e.trim() !== "" ? Number(e) : NaN;
  return !Number.isFinite(t) || Math.abs(t) < 1e4 ? null : new Intl.NumberFormat("en", { maximumFractionDigits: 20 }).format(t);
}
function J(e, t, n, c) {
  return t || e.some((a) => ["none", ""].includes(a.label.trim().toLowerCase()) || a.value.trim().toLowerCase() === "none") ? !1 : !n || !c;
}
function R(e) {
  return e.some((t) => t.shared === !0 || R(t.fields ?? []) || (t.blocks ?? []).some((n) => R(n.fields)));
}
function W() {
  return { _hidden: !1 };
}
function M(e, t, n = 60) {
  for (const c of e) {
    const a = t[c.handle];
    let f = null;
    ["text", "textarea", "email", "url"].includes(c.type) && typeof a == "string" ? f = a : c.type === "rich_text" && typeof a == "string" ? f = a.replace(/<[^>]*>/g, " ") : c.type === "group" && Array.isArray(c.fields) && (f = M(c.fields, K(a), n));
    const d = (f ?? "").replace(/\s+/g, " ").trim();
    if (d !== "") return d.length > n ? `${d.slice(0, n - 1).trimEnd()}…` : d;
  }
  return null;
}
function ee(e) {
  return { type: e, hidden: !1, values: {} };
}
function se(e) {
  const t = e.replace(/[\u0000- \u007f]+/g, ""), n = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(t);
  return n ? ["http", "https", "mailto", "tel"].includes(n[1].toLowerCase()) : !t.includes("\\");
}
function P({ ids: e, search: t, collections: n }) {
  const c = new URLSearchParams();
  for (const a of e ?? []) c.append("ids[]", String(a));
  t && c.set("search", t);
  for (const a of n) c.append("collections[]", a);
  return c.toString();
}
let O = 0;
function te(e, t) {
  return e.length === t ? e.slice() : e.length < t ? [...e, ...Array.from({ length: t - e.length }, () => `k${++O}`)] : e.slice(0, t);
}
function ne({ taxonomy: e, q: t, ids: n }) {
  const c = new URLSearchParams({ taxonomy: e });
  t && c.set("q", t);
  for (const a of n ?? []) c.append("ids[]", String(a));
  return c.toString();
}
async function $(e) {
  const t = await fetch(`${T("cms/entries/picker")}?${P(e)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!t.ok) throw new Error(String(t.status));
  const n = await t.json();
  return { items: n.items, unavailable: n.unavailable ?? [] };
}
function Q(e) {
  return e.length < 2 ? e[0] ?? "" : o(":items and :last", { items: e.slice(0, -1).join(", "), last: e[e.length - 1] });
}
function re({ id: e, value: t, multiple: n, max: c, collections: a, invalid: f, onChange: d, emptyHint: N }) {
  const m = t === null ? [] : Array.isArray(t) ? t : [t], [b, S] = u.useState({}), [p, E] = u.useState(""), [w, h] = u.useState(!1), [x, k] = u.useState(null), [v, C] = u.useState([]), [F, j] = u.useState(!1), L = n && c !== null && m.length >= c, y = m.filter((s) => !b[s]).join(",");
  u.useEffect(() => {
    y !== "" && $({ ids: y.split(",").map(Number), collections: a }).then(({ items: s }) => S((l) => ({ ...l, ...Object.fromEntries(s.map((i) => [i.id, i])) }))).catch(() => j(!0));
  }, [y]), u.useEffect(() => {
    if (!w) {
      k(null);
      return;
    }
    const s = window.setTimeout(() => {
      $({ search: p.trim(), collections: a }).then((l) => {
        k(l.items), C(l.unavailable), j(!1);
      }).catch(() => j(!0));
    }, p.trim() === "" ? 0 : 250);
    return () => window.clearTimeout(s);
  }, [p, w]);
  const z = (s) => {
    S((l) => ({ ...l, [s.id]: s })), d(n ? [...m, s.id] : s.id), E("");
  }, A = (s) => d(n ? s : s[0] ?? null);
  return /* @__PURE__ */ r.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    m.length > 0 && /* @__PURE__ */ r.jsx(g.SortableList, { items: m, getId: (s) => s, getLabel: (s) => b[s]?.title ?? `Entry #${s}`, onReorder: (s) => A(s), disabled: !n, className: "cms:grid-cols-[minmax(0,1fr)] cms:gap-1", children: (s, { handle: l }) => {
      const i = b[s];
      return /* @__PURE__ */ r.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-2 cms:rounded-md cms:border cms:bg-card cms:px-2 cms:py-1 cms:text-sm", children: [
        n && /* @__PURE__ */ r.jsx(g.SortableHandle, { ...l, label: o("Move :title", { title: i?.title ?? s }) }),
        /* @__PURE__ */ r.jsxs("div", { className: `cms:flex cms:min-w-0 cms:flex-1 cms:flex-wrap cms:items-center cms:gap-x-2 cms:gap-y-0.5 ${n ? "" : "cms:pl-1"}`, children: [
          /* @__PURE__ */ r.jsx("span", { className: "cms:min-w-0 cms:max-w-full cms:truncate", title: i?.title, children: i ? i.title : o("Entry #:id", { id: s }) }),
          i && /* @__PURE__ */ r.jsxs("span", { className: "cms:flex cms:min-w-0 cms:max-w-full cms:flex-wrap cms:items-center cms:gap-1", children: [
            /* @__PURE__ */ r.jsx("span", { className: "cms:min-w-0 cms:truncate cms:text-xs cms:text-muted-foreground", children: i.collection }),
            /* @__PURE__ */ r.jsx(U, { status: i.status, changes: i.changes })
          ] })
        ] }),
        /* @__PURE__ */ r.jsx(
          g.Button,
          {
            type: "button",
            variant: "ghost",
            size: "icon",
            className: "cms:size-7 cms:shrink-0",
            "aria-label": o("Remove :title", { title: i?.title ?? s }),
            onClick: () => A(m.filter((D) => D !== s)),
            children: /* @__PURE__ */ r.jsx(_, {})
          }
        )
      ] });
    } }),
    !L && (n || m.length === 0) && /* @__PURE__ */ r.jsxs("div", { className: "cms:relative cms:max-w-md", children: [
      /* @__PURE__ */ r.jsx(B, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
      /* @__PURE__ */ r.jsx(
        g.Input,
        {
          id: e,
          className: "cms:pl-9",
          placeholder: o("Search entries by title"),
          "aria-invalid": f,
          value: p,
          autoComplete: "off",
          "aria-expanded": x !== null,
          onFocus: () => h(!0),
          onBlur: () => h(!1),
          onKeyDown: (s) => {
            s.key === "Escape" && w && (s.preventDefault(), h(!1));
          },
          onChange: (s) => {
            E(s.target.value), h(!0);
          }
        }
      ),
      x !== null && /* @__PURE__ */ r.jsxs("ul", { role: "listbox", "aria-label": o("Matching entries"), className: "cms:absolute cms:z-10 cms:mt-1 cms:max-h-64 cms:w-full cms:overflow-auto cms:rounded-md cms:border cms:bg-card cms:p-1 cms:shadow-md", children: [
        x.filter((s) => !m.includes(s.id)).length === 0 && /* @__PURE__ */ r.jsxs("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: [
          p.trim() === "" ? o("No entries yet.") : o("No entries match."),
          N && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
            " ",
            N
          ] })
        ] }),
        v.length > 0 && /* @__PURE__ */ r.jsx("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: o("Your role can't see entries of :collections: ask an editor to link them.", { collections: Q(v) }) }),
        x.filter((s) => !m.includes(s.id)).map((s) => /* @__PURE__ */ r.jsx("li", { role: "option", "aria-selected": !1, children: /* @__PURE__ */ r.jsxs(
          "button",
          {
            type: "button",
            className: "cms:flex cms:w-full cms:items-center cms:gap-2 cms:rounded cms:px-2 cms:py-1.5 cms:text-left cms:text-sm cms:hover:bg-accent",
            onMouseDown: (l) => l.preventDefault(),
            onClick: () => z(s),
            children: [
              /* @__PURE__ */ r.jsx("span", { className: "cms:flex-1 cms:truncate", children: s.title }),
              /* @__PURE__ */ r.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: s.collection })
            ]
          }
        ) }, s.id))
      ] })
    ] }),
    F && /* @__PURE__ */ r.jsx("p", { className: "cms:text-sm cms:text-destructive", children: o("Entries could not be loaded. Try again.") })
  ] });
}
export {
  re as E,
  K as a,
  q as b,
  W as c,
  G as d,
  se as e,
  H as g,
  R as h,
  M as i,
  ee as n,
  J as o,
  P as p,
  te as s,
  ne as t
};
