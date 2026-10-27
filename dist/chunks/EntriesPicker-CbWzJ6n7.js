import { j as a, t as m, a as T } from "./admin-IqhaZhDI.js";
import { _ as d } from "./createLucideIcon-Ccbp7F45.js";
import { u as g } from "./ui-Dh5wfMwT.js";
import { E as D, X as F } from "./EntryStatus-B9Rew89u.js";
import { S as I } from "./search-3zKi7F1_.js";
function M(e) {
  return e && typeof e == "object" && !Array.isArray(e) ? e : {};
}
function H(e, r) {
  if (typeof e != "string" || e === "") return "";
  const t = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(e);
  return t ? r ? `${t[1]}T${t[2] ?? "00:00"}` : t[1] ?? "" : "";
}
function J(e) {
  return e === "" ? null : e;
}
function W(e) {
  const r = typeof e == "number" ? e : typeof e == "string" && e.trim() !== "" ? Number(e) : NaN;
  return !Number.isFinite(r) || Math.abs(r) < 1e4 ? null : new Intl.NumberFormat("en", { maximumFractionDigits: 20 }).format(r);
}
function ee(e, r, t, n) {
  return r || e.some((c) => ["none", ""].includes(c.label.trim().toLowerCase()) || c.value.trim().toLowerCase() === "none") ? !1 : !t || !n;
}
function te() {
  return { _hidden: !1 };
}
function P(e, r, t = 60) {
  for (const n of e) {
    const c = r[n.handle];
    let l = null;
    ["text", "textarea", "email", "url"].includes(n.type) && typeof c == "string" ? l = c : n.type === "rich_text" && typeof c == "string" ? l = B(c.replace(/<[^>]*>/g, " ")) : n.type === "group" && Array.isArray(n.fields) && (l = P(n.fields, M(c), t));
    const f = (l ?? "").replace(/\s+/g, " ").trim();
    if (f !== "") return f.length > t ? `${f.slice(0, t - 1).trimEnd()}…` : f;
  }
  return null;
}
const U = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
function B(e) {
  return e.replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi, (r, t) => {
    if (t[0] === "#") {
      const n = t[1] === "x" || t[1] === "X" ? parseInt(t.slice(2), 16) : parseInt(t.slice(1), 10);
      return Number.isInteger(n) && n > 0 && n <= 1114111 && (n < 55296 || n > 57343) ? String.fromCodePoint(n) : r;
    }
    return U[t.toLowerCase()] ?? r;
  });
}
function se(e) {
  return { type: e, hidden: !1, values: {} };
}
function re(e) {
  const r = e.replace(/[\u0000- \u007f]+/g, ""), t = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(r);
  return t ? ["http", "https", "mailto", "tel"].includes(t[1].toLowerCase()) : !r.includes("\\");
}
function K({ ids: e, search: r, collections: t }) {
  const n = new URLSearchParams();
  for (const c of e ?? []) n.append("ids[]", String(c));
  r && n.set("search", r);
  for (const c of t) n.append("collections[]", c);
  return n.toString();
}
let V = 0;
function ne(e, r) {
  return e.length === r ? e.slice() : e.length < r ? [...e, ...Array.from({ length: r - e.length }, () => `k${++V}`)] : e.slice(0, r);
}
function ce({ taxonomy: e, q: r, offset: t, ids: n }) {
  const c = new URLSearchParams({ taxonomy: e });
  r && c.set("q", r), t && c.set("offset", String(t));
  for (const l of n ?? []) c.append("ids[]", String(l));
  return c.toString();
}
function O(e) {
  return (e.type === "entry" ? typeof e.entry_id != "number" : e.url === "" || e.url === void 0 || e.url === null) ? e.label || e.new_tab ? e : null : e;
}
function ae(e, r, t, n) {
  const c = r === "url" ? { ...n, url: e.url } : { ...n, entry_id: e.entry_id }, l = { ...e, type: t, url: t === "url" ? c.url : void 0, entry_id: t === "entry" ? c.entry_id : void 0 };
  return { value: O(l), remembered: c };
}
async function C(e) {
  const r = await fetch(`${T("cms/entries/picker")}?${K(e)}`, { headers: { Accept: "application/json" }, credentials: "same-origin" });
  if (!r.ok) throw new Error(String(r.status));
  const t = await r.json();
  return { items: t.items, unavailable: t.unavailable ?? [] };
}
function Q(e) {
  return e.length < 2 ? e[0] ?? "" : m(":items and :last", { items: e.slice(0, -1).join(", "), last: e[e.length - 1] });
}
function ie({ id: e, value: r, multiple: t, max: n, collections: c, invalid: l, onChange: f, emptyHint: N }) {
  const u = r === null ? [] : Array.isArray(r) ? r : [r], [b, S] = d.useState({}), [p, E] = d.useState(""), [y, h] = d.useState(!1), [x, v] = d.useState(null), [_, L] = d.useState([]), [R, w] = d.useState(!1), $ = t && n !== null && u.length >= n, j = u.filter((s) => !b[s]).join(",");
  d.useEffect(() => {
    j !== "" && C({ ids: j.split(",").map(Number), collections: c }).then(({ items: s }) => S((o) => ({ ...o, ...Object.fromEntries(s.map((i) => [i.id, i])) }))).catch(() => w(!0));
  }, [j]), d.useEffect(() => {
    if (!y) {
      v(null);
      return;
    }
    const s = window.setTimeout(() => {
      C({ search: p.trim(), collections: c }).then((o) => {
        v(o.items), L(o.unavailable), w(!1);
      }).catch(() => w(!0));
    }, p.trim() === "" ? 0 : 250);
    return () => window.clearTimeout(s);
  }, [p, y]);
  const k = (s) => {
    S((o) => ({ ...o, [s.id]: s })), f(t ? [...u, s.id] : s.id), E("");
  }, A = (s) => f(t ? s : s[0] ?? null);
  return /* @__PURE__ */ a.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    u.length > 0 && /* @__PURE__ */ a.jsx(g.SortableList, { items: u, getId: (s) => s, getLabel: (s) => b[s]?.title ?? `Entry #${s}`, onReorder: (s) => A(s), disabled: !t, className: "cms:grid-cols-[minmax(0,1fr)] cms:gap-1", children: (s, { handle: o }) => {
      const i = b[s];
      return /* @__PURE__ */ a.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-2 cms:rounded-md cms:border cms:bg-card cms:px-2 cms:py-1 cms:text-sm", children: [
        t && /* @__PURE__ */ a.jsx(g.SortableHandle, { ...o, label: m("Move :title", { title: i?.title ?? s }) }),
        /* @__PURE__ */ a.jsxs("div", { className: `cms:flex cms:min-w-0 cms:flex-1 cms:flex-wrap cms:items-center cms:gap-x-2 cms:gap-y-0.5 ${t ? "" : "cms:pl-1"}`, children: [
          /* @__PURE__ */ a.jsx("span", { className: "cms:min-w-0 cms:max-w-full cms:truncate", title: i?.title, children: i ? i.title : m("Entry #:id", { id: s }) }),
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
            "aria-label": m("Remove :title", { title: i?.title ?? s }),
            onClick: () => A(u.filter((z) => z !== s)),
            children: /* @__PURE__ */ a.jsx(F, {})
          }
        )
      ] });
    } }),
    !$ && (t || u.length === 0) && /* @__PURE__ */ a.jsxs("div", { className: "cms:relative cms:max-w-md", children: [
      /* @__PURE__ */ a.jsx(I, { className: "cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
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
          onKeyDown: (s) => {
            s.key === "Escape" && y && (s.preventDefault(), h(!1));
          },
          onChange: (s) => {
            E(s.target.value), h(!0);
          }
        }
      ),
      x !== null && /* @__PURE__ */ a.jsxs("ul", { role: "listbox", "aria-label": m("Matching entries"), className: "cms:absolute cms:z-10 cms:mt-1 cms:max-h-64 cms:w-full cms:overflow-auto cms:rounded-md cms:border cms:bg-card cms:p-1 cms:shadow-md", children: [
        x.filter((s) => !u.includes(s.id)).length === 0 && /* @__PURE__ */ a.jsxs("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: [
          p.trim() === "" ? m("No entries yet.") : m("No entries match."),
          N && /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
            " ",
            N
          ] })
        ] }),
        _.length > 0 && /* @__PURE__ */ a.jsx("li", { className: "cms:p-2 cms:text-sm cms:text-muted-foreground", children: m("Your role can't see entries of :collections: ask an editor to link them.", { collections: Q(_) }) }),
        x.filter((s) => !u.includes(s.id)).map((s) => /* @__PURE__ */ a.jsx("li", { role: "option", "aria-selected": !1, children: /* @__PURE__ */ a.jsxs(
          "button",
          {
            type: "button",
            className: "cms:flex cms:w-full cms:items-center cms:gap-2 cms:rounded cms:px-2 cms:py-1.5 cms:text-left cms:text-sm cms:hover:bg-accent",
            onMouseDown: (o) => o.preventDefault(),
            onClick: () => k(s),
            children: [
              /* @__PURE__ */ a.jsx("span", { className: "cms:flex-1 cms:truncate", children: s.title }),
              /* @__PURE__ */ a.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: s.collection })
            ]
          }
        ) }, s.id))
      ] })
    ] }),
    R && /* @__PURE__ */ a.jsx("p", { className: "cms:text-sm cms:text-destructive", children: m("Entries could not be loaded. Try again.") })
  ] });
}
export {
  ie as E,
  M as a,
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
