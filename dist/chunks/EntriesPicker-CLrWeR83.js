import { j as a, t as m, a as D } from "./admin-DOytNhi-.js";
import { _ as d } from "./createLucideIcon-Ccbp7F45.js";
import { u as g } from "./ui-Dh5wfMwT.js";
import { E as F, X as I } from "./EntryStatus-Duw-1dIJ.js";
import { S as M } from "./search-3zKi7F1_.js";
function N(e) {
  return e && typeof e == "object" && !Array.isArray(e) ? e : {};
}
function H(e, t) {
  if (typeof e != "string" || e === "") return "";
  const s = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(e);
  return s ? t ? `${s[1]}T${s[2] ?? "00:00"}` : s[1] ?? "" : "";
}
function J(e) {
  return e === "" ? null : e;
}
function W(e) {
  const t = typeof e == "number" ? e : typeof e == "string" && e.trim() !== "" ? Number(e) : NaN;
  return !Number.isFinite(t) || Math.abs(t) < 1e4 ? null : new Intl.NumberFormat("en", { maximumFractionDigits: 20 }).format(t);
}
function ee(e, t, s, n) {
  return t || e.some((c) => ["none", ""].includes(c.label.trim().toLowerCase()) || c.value.trim().toLowerCase() === "none") ? !1 : !s || !n;
}
function te(e) {
  return { ...structuredClone(N(e)), _hidden: !1 };
}
function P(e, t, s = 60) {
  for (const n of e) {
    const c = t[n.handle];
    let l = null;
    ["text", "textarea", "email", "url"].includes(n.type) && typeof c == "string" ? l = c : n.type === "rich_text" && typeof c == "string" ? l = B(c.replace(/<[^>]*>/g, " ")) : n.type === "group" && Array.isArray(n.fields) && (l = P(n.fields, N(c), s));
    const f = (l ?? "").replace(/\s+/g, " ").trim();
    if (f !== "") return f.length > s ? `${f.slice(0, s - 1).trimEnd()}…` : f;
  }
  return null;
}
const U = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
function B(e) {
  return e.replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi, (t, s) => {
    if (s[0] === "#") {
      const n = s[1] === "x" || s[1] === "X" ? parseInt(s.slice(2), 16) : parseInt(s.slice(1), 10);
      return Number.isInteger(n) && n > 0 && n <= 1114111 && (n < 55296 || n > 57343) ? String.fromCodePoint(n) : t;
    }
    return U[s.toLowerCase()] ?? t;
  });
}
function se(e, t) {
  return { type: e, hidden: !1, values: structuredClone(N(t)) };
}
function re(e) {
  const t = e.replace(/[\u0000- \u007f]+/g, ""), s = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(t);
  return s ? ["http", "https", "mailto", "tel"].includes(s[1].toLowerCase()) : !t.includes("\\");
}
function K({ ids: e, search: t, collections: s }) {
  const n = new URLSearchParams();
  for (const c of e ?? []) n.append("ids[]", String(c));
  t && n.set("search", t);
  for (const c of s) n.append("collections[]", c);
  return n.toString();
}
let V = 0;
function ne(e, t) {
  return e.length === t ? e.slice() : e.length < t ? [...e, ...Array.from({ length: t - e.length }, () => `k${++V}`)] : e.slice(0, t);
}
function ce({ taxonomy: e, q: t, offset: s, ids: n }) {
  const c = new URLSearchParams({ taxonomy: e });
  t && c.set("q", t), s && c.set("offset", String(s));
  for (const l of n ?? []) c.append("ids[]", String(l));
  return c.toString();
}
function O(e) {
  return (e.type === "entry" ? typeof e.entry_id != "number" : e.url === "" || e.url === void 0 || e.url === null) ? e.label || e.new_tab ? e : null : e;
}
function ae(e, t, s, n) {
  const c = t === "url" ? { ...n, url: e.url } : { ...n, entry_id: e.entry_id }, l = { ...e, type: s, url: s === "url" ? c.url : void 0, entry_id: s === "entry" ? c.entry_id : void 0 };
  return { value: O(l), remembered: c };
}
async function L(e) {
  const t = await fetch(`${D("cms/entries/picker")}?${K(e)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!t.ok) throw new Error(String(t.status));
  const s = await t.json();
  return { items: s.items, unavailable: s.unavailable ?? [] };
}
function Q(e) {
  return e.length < 2 ? e[0] ?? "" : m(":items and :last", { items: e.slice(0, -1).join(", "), last: e[e.length - 1] });
}
function ie({ id: e, value: t, multiple: s, max: n, collections: c, invalid: l, onChange: f, emptyHint: S }) {
  const u = t === null ? [] : Array.isArray(t) ? t : [t], [b, E] = d.useState({}), [p, v] = d.useState(""), [y, h] = d.useState(!1), [x, _] = d.useState(null), [A, R] = d.useState([]), [$, w] = d.useState(!1), k = s && n !== null && u.length >= n, j = u.filter((r) => !b[r]).join(",");
  d.useEffect(() => {
    j !== "" && L({ ids: j.split(",").map(Number), collections: c }).then(({ items: r }) => E((o) => ({ ...o, ...Object.fromEntries(r.map((i) => [i.id, i])) }))).catch(() => w(!0));
  }, [j]), d.useEffect(() => {
    if (!y) {
      _(null);
      return;
    }
    const r = window.setTimeout(() => {
      L({ search: p.trim(), collections: c }).then((o) => {
        _(o.items), R(o.unavailable), w(!1);
      }).catch(() => w(!0));
    }, p.trim() === "" ? 0 : 250);
    return () => window.clearTimeout(r);
  }, [p, y]);
  const z = (r) => {
    E((o) => ({ ...o, [r.id]: r })), f(s ? [...u, r.id] : r.id), v("");
  }, C = (r) => f(s ? r : r[0] ?? null);
  return /* @__PURE__ */ a.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    u.length > 0 && /* @__PURE__ */ a.jsx(g.SortableList, { items: u, getId: (r) => r, getLabel: (r) => b[r]?.title ?? `Entry #${r}`, onReorder: (r) => C(r), disabled: !s, className: "cms:grid-cols-[minmax(0,1fr)] cms:gap-1", children: (r, { handle: o }) => {
      const i = b[r];
      return /* @__PURE__ */ a.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-2 cms:rounded-md cms:border cms:bg-card cms:px-2 cms:py-1 cms:text-sm", children: [
        s && /* @__PURE__ */ a.jsx(g.SortableHandle, { ...o, label: m("Move :title", { title: i?.title ?? r }) }),
        /* @__PURE__ */ a.jsxs("div", { className: `cms:flex cms:min-w-0 cms:flex-1 cms:flex-wrap cms:items-center cms:gap-x-2 cms:gap-y-0.5 ${s ? "" : "cms:pl-1"}`, children: [
          /* @__PURE__ */ a.jsx("span", { className: "cms:min-w-0 cms:max-w-full cms:truncate", title: i?.title, children: i ? i.title : m("Entry #:id", { id: r }) }),
          i && /* @__PURE__ */ a.jsxs("span", { className: "cms:flex cms:min-w-0 cms:max-w-full cms:flex-wrap cms:items-center cms:gap-1", children: [
            /* @__PURE__ */ a.jsx("span", { className: "cms:min-w-0 cms:truncate cms:text-xs cms:text-muted-foreground", children: i.collection }),
            /* @__PURE__ */ a.jsx(F, { status: i.status, changes: i.changes })
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
            onClick: () => C(u.filter((T) => T !== r)),
            children: /* @__PURE__ */ a.jsx(I, {})
          }
        )
      ] });
    } }),
    !k && (s || u.length === 0) && /* @__PURE__ */ a.jsxs("div", { className: "cms:relative cms:max-w-md", children: [
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
            v(r.target.value), h(!0);
          }
        }
      ),
      x !== null && /* @__PURE__ */ a.jsxs("ul", { role: "listbox", "aria-label": m("Matching entries"), className: "cms:absolute cms:z-10 cms:mt-1 cms:max-h-64 cms:w-full cms:overflow-auto cms:rounded-md cms:border cms:bg-card cms:p-1 cms:shadow-md", children: [
        x.filter((r) => !u.includes(r.id)).length === 0 && /* @__PURE__ */ a.jsxs("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: [
          p.trim() === "" ? m("No entries yet.") : m("No entries match."),
          S && /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
            " ",
            S
          ] })
        ] }),
        A.length > 0 && /* @__PURE__ */ a.jsx("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: m("Your role can't see entries of :collections: ask an editor to link them.", { collections: Q(A) }) }),
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
    $ && /* @__PURE__ */ a.jsx("p", { className: "cms:text-sm cms:text-destructive", children: m("Entries could not be loaded. Try again.") })
  ] });
}
export {
  ie as E,
  N as a,
  H as b,
  te as c,
  J as d,
  ae as e,
  re as f,
  W as g,
  P as i,
  O as l,
  se as n,
  ee as o,
  K as p,
  ne as s,
  ce as t
};
