import { j as a, t as m, a as T } from "./admin-C3qsRD_x.js";
import { _ as d } from "./createLucideIcon-Ccbp7F45.js";
import { u as g } from "./ui-Dh5wfMwT.js";
import { E as D, X as I } from "./EntryStatus-CidS-Rk9.js";
import { S as M } from "./search-3zKi7F1_.js";
function P(e) {
  return e && typeof e == "object" && !Array.isArray(e) ? e : {};
}
function J(e, t) {
  if (typeof e != "string" || e === "") return "";
  const s = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(e);
  return s ? t ? `${s[1]}T${s[2] ?? "00:00"}` : s[1] ?? "" : "";
}
function W(e) {
  return e === "" ? null : e;
}
function ee(e) {
  const t = typeof e == "number" ? e : typeof e == "string" && e.trim() !== "" ? Number(e) : NaN;
  return !Number.isFinite(t) || Math.abs(t) < 1e4 ? null : new Intl.NumberFormat("en", { maximumFractionDigits: 20 }).format(t);
}
function te(e, t, s, n) {
  return t || e.some((c) => ["none", ""].includes(c.label.trim().toLowerCase()) || c.value.trim().toLowerCase() === "none") ? !1 : !s || !n;
}
function C(e) {
  return e.some((t) => t.shared === !0 || C(t.fields ?? []) || (t.blocks ?? []).some((s) => C(s.fields)));
}
function se() {
  return { _hidden: !1 };
}
function U(e, t, s = 60) {
  for (const n of e) {
    const c = t[n.handle];
    let l = null;
    ["text", "textarea", "email", "url"].includes(n.type) && typeof c == "string" ? l = c : n.type === "rich_text" && typeof c == "string" ? l = K(c.replace(/<[^>]*>/g, " ")) : n.type === "group" && Array.isArray(n.fields) && (l = U(n.fields, P(c), s));
    const f = (l ?? "").replace(/\s+/g, " ").trim();
    if (f !== "") return f.length > s ? `${f.slice(0, s - 1).trimEnd()}…` : f;
  }
  return null;
}
const B = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
function K(e) {
  return e.replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi, (t, s) => {
    if (s[0] === "#") {
      const n = s[1] === "x" || s[1] === "X" ? parseInt(s.slice(2), 16) : parseInt(s.slice(1), 10);
      return Number.isInteger(n) && n > 0 && n <= 1114111 && (n < 55296 || n > 57343) ? String.fromCodePoint(n) : t;
    }
    return B[s.toLowerCase()] ?? t;
  });
}
function re(e) {
  return { type: e, hidden: !1, values: {} };
}
function ne(e) {
  const t = e.replace(/[\u0000- \u007f]+/g, ""), s = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(t);
  return s ? ["http", "https", "mailto", "tel"].includes(s[1].toLowerCase()) : !t.includes("\\");
}
function V({ ids: e, search: t, collections: s }) {
  const n = new URLSearchParams();
  for (const c of e ?? []) n.append("ids[]", String(c));
  t && n.set("search", t);
  for (const c of s) n.append("collections[]", c);
  return n.toString();
}
let O = 0;
function ce(e, t) {
  return e.length === t ? e.slice() : e.length < t ? [...e, ...Array.from({ length: t - e.length }, () => `k${++O}`)] : e.slice(0, t);
}
function ae({ taxonomy: e, q: t, offset: s, ids: n }) {
  const c = new URLSearchParams({ taxonomy: e });
  t && c.set("q", t), s && c.set("offset", String(s));
  for (const l of n ?? []) c.append("ids[]", String(l));
  return c.toString();
}
function Q(e) {
  return (e.type === "entry" ? typeof e.entry_id != "number" : e.url === "" || e.url === void 0 || e.url === null) ? e.label || e.new_tab ? e : null : e;
}
function ie(e, t, s, n) {
  const c = t === "url" ? { ...n, url: e.url } : { ...n, entry_id: e.entry_id }, l = { ...e, type: s, url: s === "url" ? c.url : void 0, entry_id: s === "entry" ? c.entry_id : void 0 };
  return { value: Q(l), remembered: c };
}
async function L(e) {
  const t = await fetch(`${T("cms/entries/picker")}?${V(e)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!t.ok) throw new Error(String(t.status));
  const s = await t.json();
  return { items: s.items, unavailable: s.unavailable ?? [] };
}
function X(e) {
  return e.length < 2 ? e[0] ?? "" : m(":items and :last", { items: e.slice(0, -1).join(", "), last: e[e.length - 1] });
}
function le({ id: e, value: t, multiple: s, max: n, collections: c, invalid: l, onChange: f, emptyHint: N }) {
  const u = t === null ? [] : Array.isArray(t) ? t : [t], [b, S] = d.useState({}), [p, E] = d.useState(""), [y, h] = d.useState(!1), [x, v] = d.useState(null), [_, k] = d.useState([]), [R, w] = d.useState(!1), $ = s && n !== null && u.length >= n, j = u.filter((r) => !b[r]).join(",");
  d.useEffect(() => {
    j !== "" && L({ ids: j.split(",").map(Number), collections: c }).then(({ items: r }) => S((o) => ({ ...o, ...Object.fromEntries(r.map((i) => [i.id, i])) }))).catch(() => w(!0));
  }, [j]), d.useEffect(() => {
    if (!y) {
      v(null);
      return;
    }
    const r = window.setTimeout(() => {
      L({ search: p.trim(), collections: c }).then((o) => {
        v(o.items), k(o.unavailable), w(!1);
      }).catch(() => w(!0));
    }, p.trim() === "" ? 0 : 250);
    return () => window.clearTimeout(r);
  }, [p, y]);
  const z = (r) => {
    S((o) => ({ ...o, [r.id]: r })), f(s ? [...u, r.id] : r.id), E("");
  }, A = (r) => f(s ? r : r[0] ?? null);
  return /* @__PURE__ */ a.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    u.length > 0 && /* @__PURE__ */ a.jsx(g.SortableList, { items: u, getId: (r) => r, getLabel: (r) => b[r]?.title ?? `Entry #${r}`, onReorder: (r) => A(r), disabled: !s, className: "cms:grid-cols-[minmax(0,1fr)] cms:gap-1", children: (r, { handle: o }) => {
      const i = b[r];
      return /* @__PURE__ */ a.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-2 cms:rounded-md cms:border cms:bg-card cms:px-2 cms:py-1 cms:text-sm", children: [
        s && /* @__PURE__ */ a.jsx(g.SortableHandle, { ...o, label: m("Move :title", { title: i?.title ?? r }) }),
        /* @__PURE__ */ a.jsxs("div", { className: `cms:flex cms:min-w-0 cms:flex-1 cms:flex-wrap cms:items-center cms:gap-x-2 cms:gap-y-0.5 ${s ? "" : "cms:pl-1"}`, children: [
          /* @__PURE__ */ a.jsx("span", { className: "cms:min-w-0 cms:max-w-full cms:truncate", title: i?.title, children: i ? i.title : m("Entry #:id", { id: r }) }),
          i && /* @__PURE__ */ a.jsxs("span", { className: "cms:flex cms:min-w-0 cms:max-w-full cms:flex-wrap cms:items-center cms:gap-1", children: [
            /* @__PURE__ */ a.jsx("span", { className: "cms:min-w-0 cms:truncate cms:text-xs cms:text-muted-foreground", children: i.collection }),
            /* @__PURE__ */ a.jsx(D, { status: i.status, changes: i.changes })
          ] })
        ] }),
        /* @__PURE__ */ a.jsx(
          g.Button,
          {
            type: "button",
            variant: "ghost",
            size: "icon",
            className: "cms:size-7 cms:shrink-0",
            "aria-label": m("Remove :title", { title: i?.title ?? r }),
            onClick: () => A(u.filter((F) => F !== r)),
            children: /* @__PURE__ */ a.jsx(I, {})
          }
        )
      ] });
    } }),
    !$ && (s || u.length === 0) && /* @__PURE__ */ a.jsxs("div", { className: "cms:relative cms:max-w-md", children: [
      /* @__PURE__ */ a.jsx(M, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
      /* @__PURE__ */ a.jsx(
        g.Input,
        {
          id: e,
          className: "cms:pl-9",
          placeholder: m("Search entries by title"),
          "aria-invalid": l,
          value: p,
          autoComplete: "off",
          "aria-expanded": x !== null,
          onFocus: () => h(!0),
          onBlur: () => h(!1),
          onKeyDown: (r) => {
            r.key === "Escape" && y && (r.preventDefault(), h(!1));
          },
          onChange: (r) => {
            E(r.target.value), h(!0);
          }
        }
      ),
      x !== null && /* @__PURE__ */ a.jsxs("ul", { role: "listbox", "aria-label": m("Matching entries"), className: "cms:absolute cms:z-10 cms:mt-1 cms:max-h-64 cms:w-full cms:overflow-auto cms:rounded-md cms:border cms:bg-card cms:p-1 cms:shadow-md", children: [
        x.filter((r) => !u.includes(r.id)).length === 0 && /* @__PURE__ */ a.jsxs("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: [
          p.trim() === "" ? m("No entries yet.") : m("No entries match."),
          N && /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
            " ",
            N
          ] })
        ] }),
        _.length > 0 && /* @__PURE__ */ a.jsx("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: m("Your role can't see entries of :collections: ask an editor to link them.", { collections: X(_) }) }),
        x.filter((r) => !u.includes(r.id)).map((r) => /* @__PURE__ */ a.jsx("li", { role: "option", "aria-selected": !1, children: /* @__PURE__ */ a.jsxs(
          "button",
          {
            type: "button",
            className: "cms:flex cms:w-full cms:items-center cms:gap-2 cms:rounded cms:px-2 cms:py-1.5 cms:text-left cms:text-sm cms:hover:bg-accent",
            onMouseDown: (o) => o.preventDefault(),
            onClick: () => z(r),
            children: [
              /* @__PURE__ */ a.jsx("span", { className: "cms:flex-1 cms:truncate", children: r.title }),
              /* @__PURE__ */ a.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: r.collection })
            ]
          }
        ) }, r.id))
      ] })
    ] }),
    R && /* @__PURE__ */ a.jsx("p", { className: "cms:text-sm cms:text-destructive", children: m("Entries could not be loaded. Try again.") })
  ] });
}
export {
  le as E,
  P as a,
  J as b,
  se as c,
  W as d,
  ie as e,
  ne as f,
  ee as g,
  C as h,
  U as i,
  Q as l,
  re as n,
  te as o,
  V as p,
  ce as s,
  ae as t
};
