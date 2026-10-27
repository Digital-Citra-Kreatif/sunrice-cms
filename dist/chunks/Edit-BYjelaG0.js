import { j as e, a as V, t as s, r as R, l as E } from "./admin-DwAcAKS1.js";
import { c as U, _ } from "./createLucideIcon-Ccbp7F45.js";
import { u as a } from "./ui-Dh5wfMwT.js";
import { f as le, E as se, p as ne } from "./EntriesPicker-Dk3_ykf3.js";
import { F as ae } from "./FieldError-BvV3_4Ej.js";
import { V as ie } from "./VersionConflict-BMdejaJy.js";
import { c as Q, r as re } from "./tree-B7sRX6dH.js";
import { P as ce } from "./plus-COqahUZ2.js";
import { L as oe, T as ue } from "./tags-DR5XKR3w.js";
import { L as me } from "./link-2-BYZeXgi5.js";
import { L as de } from "./loader-circle-ByksABXO.js";
import { S as he } from "./settings-2-0VUe76YZ.js";
import { P as ge } from "./pencil-D-dwWCMx.js";
import { T as pe } from "./Confirm-BjpyN9gz.js";
const W = {
  name: "list-indent-decrease",
  size: 24,
  node: [
    ["path", { d: "M21 5H11", key: "us1j55" }],
    ["path", { d: "M21 12H11", key: "wd7e0v" }],
    ["path", { d: "M21 19H11", key: "saa85w" }],
    ["path", { d: "m7 8-4 4 4 4", key: "o5hrat" }]
  ],
  aliases: ["outdent", "indent-decrease"]
};
W.node;
const xe = U(W);
const G = {
  name: "list-indent-increase",
  size: 24,
  node: [
    ["path", { d: "M21 5H11", key: "us1j55" }],
    ["path", { d: "M21 12H11", key: "wd7e0v" }],
    ["path", { d: "M21 19H11", key: "saa85w" }],
    ["path", { d: "m3 8 4 4-4 4", key: "1a3j6y" }]
  ],
  aliases: ["indent", "indent-increase"]
};
G.node;
const fe = U(G);
const J = {
  name: "tag",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
        key: "vktsd0"
      }
    ],
    ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
  ]
};
J.node;
const ye = U(J);
let K = 0;
function X(t, n = 0) {
  return t.flatMap(({ children: r, ...c }) => [{ ...c, key: `m${++K}`, depth: n }, ...X(r ?? [], n + 1)]);
}
function be(t) {
  const n = [], r = [{ depth: -1, children: n }];
  for (const { key: c, depth: m, ...p } of t) {
    for (; r.length > 1 && r[r.length - 1].depth >= m; ) r.pop();
    const g = { ...p, children: [] };
    r[r.length - 1].children.push(g), r.push({ depth: m, children: g.children });
  }
  return n;
}
function P(t, n) {
  const r = t[n]?.depth ?? 0;
  let c = n + 1;
  for (; c < t.length && t[c].depth > r; ) c++;
  return c;
}
function Y(t, n, r) {
  const c = P(t, n);
  return t.map((m, p) => p >= n && p < c ? { ...m, depth: m.depth + r } : m);
}
function je(t, n, r) {
  const c = t[n], m = t[n - 1];
  return !c || !m || c.depth > m.depth || Math.max(...t.slice(n, P(t, n)).map((g) => g.depth)) + 1 > r - 1 ? t : Y(t, n, 1);
}
function ve(t, n) {
  const r = t[n];
  if (!r || r.depth === 0) return t;
  let c = n - 1;
  for (; c > 0 && t[c].depth >= r.depth; ) c--;
  const m = P(t, n), p = P(t, c), g = Y(t, n, -1).slice(n, m);
  return [...t.slice(0, n), ...t.slice(m, p), ...g, ...t.slice(p)];
}
function _e(t, n) {
  return [...t.slice(0, n), ...t.slice(P(t, n))];
}
function z(t) {
  return { key: `m${++K}`, depth: 0, entry_id: null, term_id: null, taxonomy_id: null, collection_id: null, target: null, url: null, labels: {}, new_tab: !1, query: null, ...t };
}
function Se(t) {
  return t.url !== null || t.collection_id !== null && (t.query ?? "").trim() !== "" ? "main" : "title";
}
function Z(t) {
  return t.url !== null ? "url" : t.term_id !== null ? "term" : (t.taxonomy_id ?? null) !== null ? "index" : t.entry_id === null && t.collection_id !== null ? "listing" : "entry";
}
function ke(t, n, r) {
  return t.map((c, m) => m === n ? { ...c, entry_id: null, term_id: null, taxonomy_id: null, collection_id: null, url: null, query: null, target: null, ...r } : c);
}
function Ue(t) {
  return /* @__PURE__ */ e.jsx(Ce, { ...t }, t.version);
}
function Ce({ menu: t, items: n, version: r, locales: c, limits: m, terms: p, listings: g, indexes: $ = [], can: x, settings: M }) {
  const y = V(`cms/menus/${t.handle}/links`);
  a.useBreadcrumbs([{ label: s("Menus"), href: V("cms/menus") }, { label: t.title }]);
  const [o, k] = _.useState(() => X(n)), [I, b] = _.useState(null), [w, T] = _.useState(null), B = w === null ? null : o[w] ?? null, S = R.useForm({ items: n, version: r }), C = S.errors, [A, H] = _.useState(!1), f = c[0] ?? "en", v = (d) => {
    k(d), H(!0);
  }, j = (d, u) => v(o.map((N, l) => l === d ? { ...N, ...u } : N)), F = (d) => {
    S.processing || (S.transform(() => ({ items: be(o).map(ee), version: d ? r : null })), S.put(y, { preserveScroll: !0, onSuccess: () => H(!1) }));
  }, D = () => F(!0), O = (d) => {
    d.preventDefault(), D();
  };
  a.useUnsavedChanges(A, x.update ? D : void 0);
  const L = (d) => /* @__PURE__ */ e.jsx(
    a.SortableList,
    {
      items: Q(o, d),
      getId: (u) => o[u].key,
      getLabel: (u) => o[u].labels[f] || o[u].target?.title || o[u].url || "link",
      disabled: !x.update,
      onReorder: (u) => v(re(o, d, u)),
      className: d < 0 ? "cms:gap-1" : "cms:mt-1 cms:gap-1 cms:pl-6",
      children: (u, { handle: N, isOverlay: l }) => {
        const i = o[u];
        return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${l ? "" : "cms:border-border/70"}`, children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2 cms:p-2", children: [
            x.update && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:h-10 cms:shrink-0 cms:items-center", children: /* @__PURE__ */ e.jsx(a.SortableHandle, { ...N, label: s("Move :title", { title: i.labels[f] || i.target?.title || i.url || s("link") }) }) }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
                /* @__PURE__ */ e.jsx(
                  a.Input,
                  {
                    "aria-label": s("Label (:language)", { language: E(f) }),
                    className: "cms:w-full cms:sm:max-w-xs",
                    disabled: !x.update,
                    placeholder: i.target?.title ?? s("Label"),
                    value: i.labels[f] ?? "",
                    onChange: (h) => j(u, { labels: { ...i.labels, [f]: h.target.value } })
                  }
                ),
                /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-32 cms:flex-1 cms:truncate cms:text-sm cms:text-muted-foreground", children: i.url !== null ? i.url : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  i.target ? `${i.target.kind}: ${i.target.title}` : s("Gone"),
                  " ",
                  (!i.target || !i.target.live) && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", children: s("Not on the site") })
                ] }) }),
                x.update && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center", children: [
                  /* @__PURE__ */ e.jsxs("label", { className: "cms:mr-2 cms:flex cms:items-center cms:gap-1.5 cms:text-sm", children: [
                    /* @__PURE__ */ e.jsx(a.Checkbox, { checked: i.new_tab, onCheckedChange: (h) => j(u, { new_tab: h }) }),
                    " ",
                    s("New tab")
                  ] }),
                  /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": s("Change where it links"), title: s("Change where it links"), onClick: () => T(u), children: /* @__PURE__ */ e.jsx(ge, {}) }),
                  /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": s("Outdent"), disabled: i.depth === 0, onClick: () => v(ve(o, u)), children: /* @__PURE__ */ e.jsx(xe, {}) }),
                  /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": s("Indent"), onClick: () => v(je(o, u, m.depth)), children: /* @__PURE__ */ e.jsx(fe, {}) }),
                  /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": s("Remove, with what's under it"), onClick: () => v(_e(o, u)), children: /* @__PURE__ */ e.jsx(pe, {}) })
                ] })
              ] }),
              i.collection_id !== null && i.term_id === null && !i.taxonomy_id && /* @__PURE__ */ e.jsx(
                a.Input,
                {
                  "aria-label": s("Filters"),
                  className: "cms:w-full cms:sm:max-w-md cms:font-mono",
                  disabled: !x.update,
                  placeholder: s("Filters (optional): :example", { example: "filter=value" }),
                  value: i.query ?? "",
                  onChange: (h) => j(u, { query: h.target.value })
                }
              ),
              c.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: c.slice(1).map((h) => /* @__PURE__ */ e.jsx(
                a.Input,
                {
                  "aria-label": s("Label (:language)", { language: E(h) }),
                  className: "cms:w-full cms:sm:max-w-xs",
                  disabled: !x.update,
                  placeholder: Se(i) === "title" ? s(":language: its title there, else as :main", { language: E(h), main: E(f) }) : s(":language: as :main", { language: E(h), main: E(f) }),
                  value: i.labels[h] ?? "",
                  onChange: (q) => j(u, { labels: { ...i.labels, [h]: q.target.value } })
                },
                h
              )) })
            ] })
          ] }),
          !l && Q(o, u).length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:px-2 cms:pb-2", children: L(u) })
        ] });
      }
    }
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: O, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(R.Head, { title: t.title }),
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: t.title,
        menu: M ? [{ label: s("Settings"), href: M, icon: /* @__PURE__ */ e.jsx(he, {}) }] : [],
        back: { href: V("cms/menus"), label: s("Back to menus") },
        actions: x.update && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", disabled: o.length >= m.items, onClick: () => b("entry"), children: [
            /* @__PURE__ */ e.jsx(ce, {}),
            " ",
            s("Entry")
          ] }),
          p.length > 0 && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", disabled: o.length >= m.items, onClick: () => b("term"), children: [
            /* @__PURE__ */ e.jsx(ye, {}),
            " ",
            s("Term")
          ] }),
          g.length > 0 && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", disabled: o.length >= m.items, onClick: () => b("listing"), children: [
            /* @__PURE__ */ e.jsx(oe, {}),
            " ",
            s("Listing")
          ] }),
          $.length > 0 && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", disabled: o.length >= m.items, onClick: () => b("index"), children: [
            /* @__PURE__ */ e.jsx(ue, {}),
            " ",
            s("Taxonomy index")
          ] }),
          /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", disabled: o.length >= m.items, onClick: () => b("url"), children: [
            /* @__PURE__ */ e.jsx(me, {}),
            " ",
            s("Link")
          ] }),
          /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", disabled: S.processing, children: [
            S.processing && /* @__PURE__ */ e.jsx(de, { className: "cms:animate-spin" }),
            " ",
            s("Save")
          ] })
        ] }),
        children: A && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: s("Unsaved changes") })
      }
    ),
    /* @__PURE__ */ e.jsx(ie, { message: C.version, processing: S.processing, onSaveMine: () => F(!1) }),
    /* @__PURE__ */ e.jsx(ae, { message: C.items }),
    Object.keys(C).some((d) => d.startsWith("items.")) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: s("Some links need fixing: :error", { error: Object.values(C).filter(Boolean)[0] }) }),
    /* @__PURE__ */ e.jsx(a.Card, { className: "cms:p-2", children: o.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:p-4 cms:text-center cms:text-muted-foreground", children: s("No links yet. Add an entry or a link.") }) : L(-1) }),
    /* @__PURE__ */ e.jsx(
      Ie,
      {
        kind: I ?? (B ? Z(B) : null),
        editing: I ? null : B,
        terms: p,
        listings: g,
        indexes: $,
        onClose: () => {
          b(null), T(null);
        },
        main: f,
        onAdd: (d) => {
          if (w !== null && !I) {
            const { entry_id: u, term_id: N, taxonomy_id: l, collection_id: i, url: h, query: q, target: te } = d;
            v(ke(o, w, { entry_id: u, term_id: N, taxonomy_id: l, collection_id: i, url: h, query: q, target: te }));
          } else
            v([...o, d]);
          b(null), T(null);
        }
      }
    )
  ] });
}
function ee({ target: t, children: n, ...r }) {
  return { ...r, children: n.map(ee) };
}
const Ne = () => s("A menu links to entries that already exist: create the page first (Content → Entries), then add it here, or add a web address instead."), we = () => ({ entry: s("Link to an entry"), term: s("Link to a term's page"), listing: s("Link to a listing page"), index: s("Link to a taxonomy's index page"), url: s("Link to an address") }), Le = () => ({
  entry: s("It follows the entry: its title (unless you give a label) and its address in each language. It shows only while the entry is on the site."),
  term: s("The page listing the term's entries, in each language. Its title is the label unless you give one."),
  listing: s("The collection's listing page, in each language, optionally with filters. The collection's title is the label unless you give one."),
  index: s("The page listing a taxonomy's terms, in each language. The taxonomy's title is the label unless you give one."),
  url: s("A web address, a path on this site (/contact), mailto: or tel:.")
});
function Ie({ kind: t, editing: n = null, terms: r, listings: c, indexes: m, onClose: p, onAdd: g, main: $ }) {
  const [x, M] = _.useState(null), [y, o] = _.useState(""), [k, I] = _.useState(""), [b, w] = _.useState(""), [T, B] = _.useState(""), [S, C] = _.useState("");
  _.useEffect(() => {
    const l = n ? Z(n) : null;
    M(n?.entry_id ?? null), o(l === "term" ? String(n?.term_id ?? "") : l === "index" ? String(n?.taxonomy_id ?? "") : l === "listing" ? String(n?.collection_id ?? "") : ""), C(l === "term" || l === "index" ? String(n?.collection_id ?? "") : ""), I(n?.url ?? ""), w(""), B(n?.query ?? "");
  }, [t, n]);
  const A = (l) => {
    o(l), C("");
  }, H = t === "url" && !n, f = t === "term" ? r.find((l) => String(l.id) === y) : void 0, v = f?.pages.find((l) => String(l.collection ?? "") === S) ?? f?.pages[0], j = t === "index" ? m.find((l) => String(l.id) === y) : void 0, F = j?.pages.find((l) => String(l.collection ?? "") === S) ?? j?.pages[0], D = f ?? j, O = f ? v : F, L = k.trim() === "" || le(k.trim()), d = b.trim() ? { [$]: b.trim() } : {}, u = async () => {
    if (t === "entry" && x !== null) {
      const l = await fetch(`${V("cms/entries/picker")}?${ne({ ids: [x], collections: [] })}`, { headers: { Accept: "application/json" }, credentials: "same-origin" }), i = l.ok ? (await l.json()).items[0] : void 0;
      g(z({ entry_id: x, target: i ? { title: i.title, kind: i.collection, live: i.status === "published" } : null, labels: d }));
    } else if (t === "term" && y !== "") {
      const l = r.find((q) => String(q.id) === y), i = v?.collection ?? null, h = i === null ? s("Shared page") : v?.title ?? "";
      g(z({ term_id: Number(y), collection_id: i, target: l ? { title: l.title, kind: `${l.taxonomy} · ${h}`, live: !0 } : null, labels: d }));
    } else if (t === "index" && y !== "" && j) {
      const l = F?.collection ?? null, i = l === null ? s(":taxonomy · Index page", { taxonomy: j.title }) : s(":taxonomy · :collection index", { taxonomy: j.title, collection: F?.title ?? "" });
      g(z({ taxonomy_id: j.id, collection_id: l, target: { title: j.title, kind: i, live: !0 }, labels: d }));
    } else if (t === "listing" && y !== "") {
      const l = c.find((i) => String(i.id) === y);
      g(z({ collection_id: Number(y), target: l ? { title: l.title, kind: s("Listing page"), live: !0 } : null, labels: d, query: T.trim().replace(/^\?/, "") || null }));
    } else t === "url" && k.trim() !== "" && L && (b.trim() !== "" || !H) && g(z({ url: k.trim(), labels: d }));
  }, N = t === "entry" ? x !== null : t === "url" ? k.trim() !== "" && L && (b.trim() !== "" || !H) : y !== "";
  return /* @__PURE__ */ e.jsx(a.Dialog, { open: t !== null, onOpenChange: (l) => !l && p(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: n ? s("Change where it links") : t ? we()[t] : "" }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: t ? Le()[t] : "" })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
      t === "entry" && /* @__PURE__ */ e.jsx(
        se,
        {
          id: "menu-entry",
          value: x,
          multiple: !1,
          max: null,
          collections: [],
          invalid: !1,
          emptyHint: Ne(),
          onChange: (l) => M(typeof l == "number" ? l : null)
        }
      ),
      (t === "term" || t === "listing" || t === "index") && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "menu-target", children: t === "term" ? s("Term") : t === "index" ? s("Taxonomy") : s("Collection") }),
        /* @__PURE__ */ e.jsxs(a.Select, { value: y, onValueChange: A, children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: "menu-target", children: /* @__PURE__ */ e.jsx(a.SelectValue, { placeholder: s("Choose…") }) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: t === "term" ? r.map((l) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: String(l.id), children: [
            l.taxonomy,
            ": ",
            l.title
          ] }, l.id)) : (t === "index" ? m : c).map((l) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: String(l.id), children: l.title }, l.id)) })
        ] })
      ] }),
      D && D.pages.length > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "menu-term-page", children: s("Page") }),
        /* @__PURE__ */ e.jsxs(a.Select, { value: String(O?.collection ?? "") || "__all", onValueChange: (l) => C(l === "__all" ? "" : l), children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: "menu-term-page", children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: D.pages.map((l) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: l.collection === null ? "__all" : String(l.collection), children: l.collection === null ? l.title : s(":collection only", { collection: l.title }) }, l.collection ?? "__all")) })
        ] }),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: f ? s("The shared page lists the term's entries from every collection; a collection's page only its own.") : s("The shared index lists all the taxonomy's terms; a collection's only those its entries have.") })
      ] }),
      t === "listing" && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "menu-query", children: s("Filters (optional)") }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: "menu-query",
            className: "cms:font-mono",
            value: T,
            placeholder: "filter=value&other=value",
            onChange: (l) => B(l.target.value)
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s("What the listing page's filters put after the ? in its address. Each language's link gets them, and a term may be named by its slug in any language.") })
      ] }),
      t === "url" && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "menu-url", children: s("Address") }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            id: "menu-url",
            value: k,
            placeholder: s("https://… or /contact"),
            "aria-invalid": !L,
            onChange: (l) => I(l.target.value)
          }
        ),
        !L && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: s("This address could run code; use https://, a path, mailto: or tel:.") })
      ] }),
      !n && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "menu-label", children: t === "url" ? s("Label") : s("Label (optional)") }),
        /* @__PURE__ */ e.jsx(a.Input, { id: "menu-label", value: b, onChange: (l) => w(l.target.value) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: p, children: s("Cancel") }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", onClick: () => {
        u();
      }, disabled: !N, children: n ? s("Change") : s("Add") })
    ] })
  ] }) });
}
export {
  Ue as default
};
