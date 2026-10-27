import { j as c, t as o, a as D } from "./admin-DgMI81wH.js";
import { _ as d } from "./createLucideIcon-Ccbp7F45.js";
import { u as g } from "./ui-Dh5wfMwT.js";
import { E as I, X as _ } from "./EntryStatus-Cse8Y5gG.js";
import { S as M } from "./search-3zKi7F1_.js";
function P(e) {
  return e && typeof e == "object" && !Array.isArray(e) ? e : {};
}
function H(e, t) {
  if (typeof e != "string" || e === "") return "";
  const r = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(e);
  return r ? t ? `${r[1]}T${r[2] ?? "00:00"}` : r[1] ?? "" : "";
}
function J(e) {
  return e === "" ? null : e;
}
function W(e) {
  const t = typeof e == "number" ? e : typeof e == "string" && e.trim() !== "" ? Number(e) : NaN;
  return !Number.isFinite(t) || Math.abs(t) < 1e4 ? null : new Intl.NumberFormat("en", { maximumFractionDigits: 20 }).format(t);
}
function ee(e, t, r, n) {
  return t || e.some((a) => ["none", ""].includes(a.label.trim().toLowerCase()) || a.value.trim().toLowerCase() === "none") ? !1 : !r || !n;
}
function C(e) {
  return e.some((t) => t.shared === !0 || C(t.fields ?? []) || (t.blocks ?? []).some((r) => C(r.fields)));
}
function se() {
  return { _hidden: !1 };
}
function U(e, t, r = 60) {
  for (const n of e) {
    const a = t[n.handle];
    let u = null;
    ["text", "textarea", "email", "url"].includes(n.type) && typeof a == "string" ? u = a : n.type === "rich_text" && typeof a == "string" ? u = K(a.replace(/<[^>]*>/g, " ")) : n.type === "group" && Array.isArray(n.fields) && (u = U(n.fields, P(a), r));
    const f = (u ?? "").replace(/\s+/g, " ").trim();
    if (f !== "") return f.length > r ? `${f.slice(0, r - 1).trimEnd()}…` : f;
  }
  return null;
}
const B = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
function K(e) {
  return e.replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi, (t, r) => {
    if (r[0] === "#") {
      const n = r[1] === "x" || r[1] === "X" ? parseInt(r.slice(2), 16) : parseInt(r.slice(1), 10);
      return Number.isInteger(n) && n > 0 && n <= 1114111 && (n < 55296 || n > 57343) ? String.fromCodePoint(n) : t;
    }
    return B[r.toLowerCase()] ?? t;
  });
}
function te(e) {
  return { type: e, hidden: !1, values: {} };
}
function re(e) {
  const t = e.replace(/[\u0000- \u007f]+/g, ""), r = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(t);
  return r ? ["http", "https", "mailto", "tel"].includes(r[1].toLowerCase()) : !t.includes("\\");
}
function O({ ids: e, search: t, collections: r }) {
  const n = new URLSearchParams();
  for (const a of e ?? []) n.append("ids[]", String(a));
  t && n.set("search", t);
  for (const a of r) n.append("collections[]", a);
  return n.toString();
}
let Q = 0;
function ne(e, t) {
  return e.length === t ? e.slice() : e.length < t ? [...e, ...Array.from({ length: t - e.length }, () => `k${++Q}`)] : e.slice(0, t);
}
function ce({ taxonomy: e, q: t, offset: r, ids: n }) {
  const a = new URLSearchParams({ taxonomy: e });
  t && a.set("q", t), r && a.set("offset", String(r));
  for (const u of n ?? []) a.append("ids[]", String(u));
  return a.toString();
}
async function L(e) {
  const t = await fetch(`${D("cms/entries/picker")}?${O(e)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!t.ok) throw new Error(String(t.status));
  const r = await t.json();
  return { items: r.items, unavailable: r.unavailable ?? [] };
}
function V(e) {
  return e.length < 2 ? e[0] ?? "" : o(":items and :last", { items: e.slice(0, -1).join(", "), last: e[e.length - 1] });
}
function ae({ id: e, value: t, multiple: r, max: n, collections: a, invalid: u, onChange: f, emptyHint: y }) {
  const m = t === null ? [] : Array.isArray(t) ? t : [t], [b, S] = d.useState({}), [p, E] = d.useState(""), [w, h] = d.useState(!1), [x, k] = d.useState(null), [v, R] = d.useState([]), [$, j] = d.useState(!1), z = r && n !== null && m.length >= n, N = m.filter((s) => !b[s]).join(",");
  d.useEffect(() => {
    N !== "" && L({ ids: N.split(",").map(Number), collections: a }).then(({ items: s }) => S((l) => ({ ...l, ...Object.fromEntries(s.map((i) => [i.id, i])) }))).catch(() => j(!0));
  }, [N]), d.useEffect(() => {
    if (!w) {
      k(null);
      return;
    }
    const s = window.setTimeout(() => {
      L({ search: p.trim(), collections: a }).then((l) => {
        k(l.items), R(l.unavailable), j(!1);
      }).catch(() => j(!0));
    }, p.trim() === "" ? 0 : 250);
    return () => window.clearTimeout(s);
  }, [p, w]);
  const F = (s) => {
    S((l) => ({ ...l, [s.id]: s })), f(r ? [...m, s.id] : s.id), E("");
  }, A = (s) => f(r ? s : s[0] ?? null);
  return /* @__PURE__ */ c.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    m.length > 0 && /* @__PURE__ */ c.jsx(g.SortableList, { items: m, getId: (s) => s, getLabel: (s) => b[s]?.title ?? `Entry #${s}`, onReorder: (s) => A(s), disabled: !r, className: "cms:grid-cols-[minmax(0,1fr)] cms:gap-1", children: (s, { handle: l }) => {
      const i = b[s];
      return /* @__PURE__ */ c.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-2 cms:rounded-md cms:border cms:bg-card cms:px-2 cms:py-1 cms:text-sm", children: [
        r && /* @__PURE__ */ c.jsx(g.SortableHandle, { ...l, label: o("Move :title", { title: i?.title ?? s }) }),
        /* @__PURE__ */ c.jsxs("div", { className: `cms:flex cms:min-w-0 cms:flex-1 cms:flex-wrap cms:items-center cms:gap-x-2 cms:gap-y-0.5 ${r ? "" : "cms:pl-1"}`, children: [
          /* @__PURE__ */ c.jsx("span", { className: "cms:min-w-0 cms:max-w-full cms:truncate", title: i?.title, children: i ? i.title : o("Entry #:id", { id: s }) }),
          i && /* @__PURE__ */ c.jsxs("span", { className: "cms:flex cms:min-w-0 cms:max-w-full cms:flex-wrap cms:items-center cms:gap-1", children: [
            /* @__PURE__ */ c.jsx("span", { className: "cms:min-w-0 cms:truncate cms:text-xs cms:text-muted-foreground", children: i.collection }),
            /* @__PURE__ */ c.jsx(I, { status: i.status, changes: i.changes })
          ] })
        ] }),
        /* @__PURE__ */ c.jsx(
          g.Button,
          {
            type: "button",
            variant: "ghost",
            size: "icon",
            className: "cms:size-7 cms:shrink-0",
            "aria-label": o("Remove :title", { title: i?.title ?? s }),
            onClick: () => A(m.filter((T) => T !== s)),
            children: /* @__PURE__ */ c.jsx(_, {})
          }
        )
      ] });
    } }),
    !z && (r || m.length === 0) && /* @__PURE__ */ c.jsxs("div", { className: "cms:relative cms:max-w-md", children: [
      /* @__PURE__ */ c.jsx(M, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
      /* @__PURE__ */ c.jsx(
        g.Input,
        {
          id: e,
          className: "cms:pl-9",
          placeholder: o("Search entries by title"),
          "aria-invalid": u,
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
      x !== null && /* @__PURE__ */ c.jsxs("ul", { role: "listbox", "aria-label": o("Matching entries"), className: "cms:absolute cms:z-10 cms:mt-1 cms:max-h-64 cms:w-full cms:overflow-auto cms:rounded-md cms:border cms:bg-card cms:p-1 cms:shadow-md", children: [
        x.filter((s) => !m.includes(s.id)).length === 0 && /* @__PURE__ */ c.jsxs("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: [
          p.trim() === "" ? o("No entries yet.") : o("No entries match."),
          y && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
            " ",
            y
          ] })
        ] }),
        v.length > 0 && /* @__PURE__ */ c.jsx("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: o("Your role can't see entries of :collections: ask an editor to link them.", { collections: V(v) }) }),
        x.filter((s) => !m.includes(s.id)).map((s) => /* @__PURE__ */ c.jsx("li", { role: "option", "aria-selected": !1, children: /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: "cms:flex cms:w-full cms:items-center cms:gap-2 cms:rounded cms:px-2 cms:py-1.5 cms:text-left cms:text-sm cms:hover:bg-accent",
            onMouseDown: (l) => l.preventDefault(),
            onClick: () => F(s),
            children: [
              /* @__PURE__ */ c.jsx("span", { className: "cms:flex-1 cms:truncate", children: s.title }),
              /* @__PURE__ */ c.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: s.collection })
            ]
          }
        ) }, s.id))
      ] })
    ] }),
    $ && /* @__PURE__ */ c.jsx("p", { className: "cms:text-sm cms:text-destructive", children: o("Entries could not be loaded. Try again.") })
  ] });
}
export {
  ae as E,
  P as a,
  H as b,
  se as c,
  J as d,
  re as e,
  W as g,
  C as h,
  U as i,
  te as n,
  ee as o,
  O as p,
  ne as s,
  ce as t
};
