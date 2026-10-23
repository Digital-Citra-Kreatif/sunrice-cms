import { j as n, t as o, s as T, a as U } from "./admin-D8w3Ih7q.js";
import { _ as u } from "./createLucideIcon-Ccbp7F45.js";
import { u as p } from "./ui-Dh5wfMwT.js";
import { X as _ } from "./x-CB4QIx1-.js";
import { S as B } from "./search-3zKi7F1_.js";
function K(e) {
  return e && typeof e == "object" && !Array.isArray(e) ? e : {};
}
function q(e, s) {
  if (typeof e != "string" || e === "") return "";
  const r = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(e);
  return r ? s ? `${r[1]}T${r[2] ?? "00:00"}` : r[1] ?? "" : "";
}
function G(e) {
  return e === "" ? null : e;
}
function H(e) {
  const s = typeof e == "number" ? e : typeof e == "string" && e.trim() !== "" ? Number(e) : NaN;
  return !Number.isFinite(s) || Math.abs(s) < 1e4 ? null : new Intl.NumberFormat("en", { maximumFractionDigits: 20 }).format(s);
}
function J(e, s, r, c) {
  return s || e.some((a) => ["none", ""].includes(a.label.trim().toLowerCase()) || a.value.trim().toLowerCase() === "none") ? !1 : !r || !c;
}
function L(e) {
  return e.some((s) => s.shared === !0 || L(s.fields ?? []) || (s.blocks ?? []).some((r) => L(r.fields)));
}
function W() {
  return { _hidden: !1 };
}
function M(e, s, r = 60) {
  for (const c of e) {
    const a = s[c.handle];
    let f = null;
    ["text", "textarea", "email", "url"].includes(c.type) && typeof a == "string" ? f = a : c.type === "rich_text" && typeof a == "string" ? f = a.replace(/<[^>]*>/g, " ") : c.type === "group" && Array.isArray(c.fields) && (f = M(c.fields, K(a), r));
    const d = (f ?? "").replace(/\s+/g, " ").trim();
    if (d !== "") return d.length > r ? `${d.slice(0, r - 1).trimEnd()}…` : d;
  }
  return null;
}
function ee(e) {
  return { type: e, hidden: !1, values: {} };
}
function te(e) {
  const s = e.replace(/[\u0000- \u007f]+/g, ""), r = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(s);
  return r ? ["http", "https", "mailto", "tel"].includes(r[1].toLowerCase()) : !s.includes("\\");
}
function P({ ids: e, search: s, collections: r }) {
  const c = new URLSearchParams();
  for (const a of e ?? []) c.append("ids[]", String(a));
  s && c.set("search", s);
  for (const a of r) c.append("collections[]", a);
  return c.toString();
}
let O = 0;
function se(e, s) {
  return e.length === s ? e.slice() : e.length < s ? [...e, ...Array.from({ length: s - e.length }, () => `k${++O}`)] : e.slice(0, s);
}
function re({ taxonomy: e, q: s, ids: r }) {
  const c = new URLSearchParams({ taxonomy: e });
  s && c.set("q", s);
  for (const a of r ?? []) c.append("ids[]", String(a));
  return c.toString();
}
async function R(e) {
  const s = await fetch(`${U("cms/entries/picker")}?${P(e)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!s.ok) throw new Error(String(s.status));
  const r = await s.json();
  return { items: r.items, unavailable: r.unavailable ?? [] };
}
function Q(e) {
  return e.length < 2 ? e[0] ?? "" : o(":items and :last", { items: e.slice(0, -1).join(", "), last: e[e.length - 1] });
}
function ne({ id: e, value: s, multiple: r, max: c, collections: a, invalid: f, onChange: d, emptyHint: N }) {
  const m = s === null ? [] : Array.isArray(s) ? s : [s], [b, S] = u.useState({}), [h, E] = u.useState(""), [j, x] = u.useState(!1), [g, v] = u.useState(null), [k, $] = u.useState([]), [C, w] = u.useState(!1), F = r && c !== null && m.length >= c, y = m.filter((t) => !b[t]).join(",");
  u.useEffect(() => {
    y !== "" && R({ ids: y.split(",").map(Number), collections: a }).then(({ items: t }) => S((l) => ({ ...l, ...Object.fromEntries(t.map((i) => [i.id, i])) }))).catch(() => w(!0));
  }, [y]), u.useEffect(() => {
    if (!j) {
      v(null);
      return;
    }
    const t = window.setTimeout(() => {
      R({ search: h.trim(), collections: a }).then((l) => {
        v(l.items), $(l.unavailable), w(!1);
      }).catch(() => w(!0));
    }, h.trim() === "" ? 0 : 250);
    return () => window.clearTimeout(t);
  }, [h, j]);
  const z = (t) => {
    S((l) => ({ ...l, [t.id]: t })), d(r ? [...m, t.id] : t.id), E("");
  }, A = (t) => d(r ? t : t[0] ?? null);
  return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    m.length > 0 && /* @__PURE__ */ n.jsx(p.SortableList, { items: m, getId: (t) => t, getLabel: (t) => b[t]?.title ?? `Entry #${t}`, onReorder: (t) => A(t), disabled: !r, className: "cms:gap-1", children: (t, { handle: l }) => {
      const i = b[t];
      return /* @__PURE__ */ n.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-md cms:border cms:bg-card cms:px-2 cms:py-1 cms:text-sm", children: [
        r && /* @__PURE__ */ n.jsx(p.SortableHandle, { ...l, label: o("Move :title", { title: i?.title ?? t }) }),
        /* @__PURE__ */ n.jsx("span", { className: `cms:min-w-0 cms:flex-1 cms:truncate ${r ? "" : "cms:pl-1"}`, children: i ? i.title : o("Entry #:id", { id: t }) }),
        i && /* @__PURE__ */ n.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: i.collection }),
        i && /* @__PURE__ */ n.jsx(p.Badge, { variant: i.status === "published" ? "success" : "secondary", children: T(i.status) }),
        /* @__PURE__ */ n.jsx(
          p.Button,
          {
            type: "button",
            variant: "ghost",
            size: "icon",
            className: "cms:size-7",
            "aria-label": o("Remove :title", { title: i?.title ?? t }),
            onClick: () => A(m.filter((D) => D !== t)),
            children: /* @__PURE__ */ n.jsx(_, {})
          }
        )
      ] });
    } }),
    !F && (r || m.length === 0) && /* @__PURE__ */ n.jsxs("div", { className: "cms:relative cms:max-w-md", children: [
      /* @__PURE__ */ n.jsx(B, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
      /* @__PURE__ */ n.jsx(
        p.Input,
        {
          id: e,
          className: "cms:pl-9",
          placeholder: o("Search entries by title"),
          "aria-invalid": f,
          value: h,
          autoComplete: "off",
          "aria-expanded": g !== null,
          onFocus: () => x(!0),
          onBlur: () => x(!1),
          onKeyDown: (t) => {
            t.key === "Escape" && j && (t.preventDefault(), x(!1));
          },
          onChange: (t) => {
            E(t.target.value), x(!0);
          }
        }
      ),
      g !== null && /* @__PURE__ */ n.jsxs("ul", { role: "listbox", "aria-label": o("Matching entries"), className: "cms:absolute cms:z-10 cms:mt-1 cms:max-h-64 cms:w-full cms:overflow-auto cms:rounded-md cms:border cms:bg-card cms:p-1 cms:shadow-md", children: [
        g.filter((t) => !m.includes(t.id)).length === 0 && /* @__PURE__ */ n.jsxs("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: [
          h.trim() === "" ? o("No entries yet.") : o("No entries match."),
          N && /* @__PURE__ */ n.jsxs(n.Fragment, { children: [
            " ",
            N
          ] })
        ] }),
        k.length > 0 && /* @__PURE__ */ n.jsx("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: o("Your role can't see entries of :collections: ask an editor to link them.", { collections: Q(k) }) }),
        g.filter((t) => !m.includes(t.id)).map((t) => /* @__PURE__ */ n.jsx("li", { role: "option", "aria-selected": !1, children: /* @__PURE__ */ n.jsxs(
          "button",
          {
            type: "button",
            className: "cms:flex cms:w-full cms:items-center cms:gap-2 cms:rounded cms:px-2 cms:py-1.5 cms:text-left cms:text-sm cms:hover:bg-accent",
            onMouseDown: (l) => l.preventDefault(),
            onClick: () => z(t),
            children: [
              /* @__PURE__ */ n.jsx("span", { className: "cms:flex-1 cms:truncate", children: t.title }),
              /* @__PURE__ */ n.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: t.collection })
            ]
          }
        ) }, t.id))
      ] })
    ] }),
    C && /* @__PURE__ */ n.jsx("p", { className: "cms:text-sm cms:text-destructive", children: o("Entries could not be loaded. Try again.") })
  ] });
}
export {
  ne as E,
  K as a,
  q as b,
  W as c,
  G as d,
  te as e,
  H as g,
  L as h,
  M as i,
  ee as n,
  J as o,
  P as p,
  se as s,
  re as t
};
