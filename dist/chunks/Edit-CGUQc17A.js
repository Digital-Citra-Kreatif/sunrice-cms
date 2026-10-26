import { a as z, t as l, r as P, j as e, l as T } from "./admin-CQrIqXPu.js";
import { c as q, _ as S } from "./createLucideIcon-Ccbp7F45.js";
import { u as n } from "./ui-Dh5wfMwT.js";
import { e as X, E as Y, p as Z } from "./EntriesPicker-DZ2n_tm-.js";
import { F as ee } from "./FieldError-DB-u7pB2.js";
import { c as A, r as te } from "./tree-B7sRX6dH.js";
import { P as se } from "./plus-COqahUZ2.js";
import { L as le, T as ne } from "./tags-DR5XKR3w.js";
import { L as ae } from "./link-2-BYZeXgi5.js";
import { L as ie } from "./loader-circle-ByksABXO.js";
import { S as ce } from "./settings-2-0VUe76YZ.js";
import { T as re } from "./trash-DHN6ewjn.js";
const U = {
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
U.node;
const oe = q(U);
const V = {
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
V.node;
const me = q(V);
const O = {
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
O.node;
const de = q(O);
let R = 0;
function Q(t, a = 0) {
  return t.flatMap(({ children: i, ...c }) => [{ ...c, key: `m${++R}`, depth: a }, ...Q(i ?? [], a + 1)]);
}
function ue(t) {
  const a = [], i = [{ depth: -1, children: a }];
  for (const { key: c, depth: d, ...u } of t) {
    for (; i.length > 1 && i[i.length - 1].depth >= d; ) i.pop();
    const y = { ...u, children: [] };
    i[i.length - 1].children.push(y), i.push({ depth: d, children: y.children });
  }
  return a;
}
function M(t, a) {
  const i = t[a]?.depth ?? 0;
  let c = a + 1;
  for (; c < t.length && t[c].depth > i; ) c++;
  return c;
}
function W(t, a, i) {
  const c = M(t, a);
  return t.map((d, u) => u >= a && u < c ? { ...d, depth: d.depth + i } : d);
}
function he(t, a, i) {
  const c = t[a], d = t[a - 1];
  return !c || !d || c.depth > d.depth || Math.max(...t.slice(a, M(t, a)).map((y) => y.depth)) + 1 > i - 1 ? t : W(t, a, 1);
}
function ge(t, a) {
  const i = t[a];
  if (!i || i.depth === 0) return t;
  let c = a - 1;
  for (; c > 0 && t[c].depth >= i.depth; ) c--;
  const d = M(t, a), u = M(t, c), y = W(t, a, -1).slice(a, d);
  return [...t.slice(0, a), ...t.slice(d, u), ...y, ...t.slice(u)];
}
function pe(t, a) {
  return [...t.slice(0, a), ...t.slice(M(t, a))];
}
function H(t) {
  return { key: `m${++R}`, depth: 0, entry_id: null, term_id: null, taxonomy_id: null, collection_id: null, target: null, url: null, labels: {}, new_tab: !1, query: null, ...t };
}
function xe(t) {
  return t.url !== null || t.collection_id !== null && (t.query ?? "").trim() !== "" ? "main" : "title";
}
function De({ menu: t, items: a, locales: i, limits: c, terms: d, listings: u, indexes: y = [], can: g, settings: B }) {
  const p = z(`cms/menus/${t.handle}/links`);
  n.useBreadcrumbs([{ label: l("Menus"), href: z("cms/menus") }, { label: t.title }]);
  const [m, _] = S.useState(() => Q(a)), [$, x] = S.useState(null), k = P.useForm({ items: a }), w = k.errors, [F, D] = S.useState(!1), b = i[0] ?? "en", j = (h) => {
    _(h), D(!0);
  }, C = (h, r) => j(m.map((N, I) => I === h ? { ...N, ...r } : N)), v = () => {
    k.processing || (k.transform(() => ({ items: ue(m).map(G) })), k.put(p, { preserveScroll: !0, onSuccess: () => D(!1) }));
  }, E = (h) => {
    h.preventDefault(), v();
  };
  n.useUnsavedChanges(F, g.update ? v : void 0);
  const L = (h) => /* @__PURE__ */ e.jsx(
    n.SortableList,
    {
      items: A(m, h),
      getId: (r) => m[r].key,
      getLabel: (r) => m[r].labels[b] || m[r].target?.title || m[r].url || "link",
      disabled: !g.update,
      onReorder: (r) => j(te(m, h, r)),
      className: h < 0 ? "cms:gap-1" : "cms:mt-1 cms:gap-1 cms:pl-6",
      children: (r, { handle: N, isOverlay: I }) => {
        const o = m[r];
        return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${I ? "" : "cms:border-border/70"}`, children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2 cms:p-2", children: [
            g.update && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:h-10 cms:shrink-0 cms:items-center", children: /* @__PURE__ */ e.jsx(n.SortableHandle, { ...N, label: l("Move :title", { title: o.labels[b] || o.target?.title || o.url || l("link") }) }) }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
                /* @__PURE__ */ e.jsx(
                  n.Input,
                  {
                    "aria-label": l("Label (:language)", { language: T(b) }),
                    className: "cms:w-full cms:sm:max-w-xs",
                    disabled: !g.update,
                    placeholder: o.target?.title ?? l("Label"),
                    value: o.labels[b] ?? "",
                    onChange: (s) => C(r, { labels: { ...o.labels, [b]: s.target.value } })
                  }
                ),
                /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-32 cms:flex-1 cms:truncate cms:text-sm cms:text-muted-foreground", children: o.url !== null ? o.url : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  o.target ? `${o.target.kind}: ${o.target.title}` : l("Gone"),
                  " ",
                  (!o.target || !o.target.live) && /* @__PURE__ */ e.jsx(n.Badge, { variant: "outline", children: l("Not on the site") })
                ] }) }),
                g.update && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center", children: [
                  /* @__PURE__ */ e.jsxs("label", { className: "cms:mr-2 cms:flex cms:items-center cms:gap-1.5 cms:text-sm", children: [
                    /* @__PURE__ */ e.jsx(n.Checkbox, { checked: o.new_tab, onCheckedChange: (s) => C(r, { new_tab: s }) }),
                    " ",
                    l("New tab")
                  ] }),
                  /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": l("Outdent"), disabled: o.depth === 0, onClick: () => j(ge(m, r)), children: /* @__PURE__ */ e.jsx(oe, {}) }),
                  /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": l("Indent"), onClick: () => j(he(m, r, c.depth)), children: /* @__PURE__ */ e.jsx(me, {}) }),
                  /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": l("Remove, with what's under it"), onClick: () => j(pe(m, r)), children: /* @__PURE__ */ e.jsx(re, {}) })
                ] })
              ] }),
              o.collection_id !== null && o.term_id === null && !o.taxonomy_id && /* @__PURE__ */ e.jsx(
                n.Input,
                {
                  "aria-label": l("Filters"),
                  className: "cms:w-full cms:sm:max-w-md cms:font-mono",
                  disabled: !g.update,
                  placeholder: l("Filters (optional): :example", { example: "filter=value" }),
                  value: o.query ?? "",
                  onChange: (s) => C(r, { query: s.target.value })
                }
              ),
              i.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: i.slice(1).map((s) => /* @__PURE__ */ e.jsx(
                n.Input,
                {
                  "aria-label": l("Label (:language)", { language: T(s) }),
                  className: "cms:w-full cms:sm:max-w-xs",
                  disabled: !g.update,
                  placeholder: xe(o) === "title" ? l(":language: its title there, else as :main", { language: T(s), main: T(b) }) : l(":language: as :main", { language: T(s), main: T(b) }),
                  value: o.labels[s] ?? "",
                  onChange: (f) => C(r, { labels: { ...o.labels, [s]: f.target.value } })
                },
                s
              )) })
            ] })
          ] }),
          !I && A(m, r).length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:px-2 cms:pb-2", children: L(r) })
        ] });
      }
    }
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: E, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(P.Head, { title: t.title }),
    /* @__PURE__ */ e.jsx(
      n.PageHeader,
      {
        title: t.title,
        menu: B ? [{ label: l("Settings"), href: B, icon: /* @__PURE__ */ e.jsx(ce, {}) }] : [],
        back: { href: z("cms/menus"), label: l("Back to menus") },
        actions: g.update && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", disabled: m.length >= c.items, onClick: () => x("entry"), children: [
            /* @__PURE__ */ e.jsx(se, {}),
            " ",
            l("Entry")
          ] }),
          d.length > 0 && /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", disabled: m.length >= c.items, onClick: () => x("term"), children: [
            /* @__PURE__ */ e.jsx(de, {}),
            " ",
            l("Term")
          ] }),
          u.length > 0 && /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", disabled: m.length >= c.items, onClick: () => x("listing"), children: [
            /* @__PURE__ */ e.jsx(le, {}),
            " ",
            l("Listing")
          ] }),
          y.length > 0 && /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", disabled: m.length >= c.items, onClick: () => x("index"), children: [
            /* @__PURE__ */ e.jsx(ne, {}),
            " ",
            l("Taxonomy index")
          ] }),
          /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", disabled: m.length >= c.items, onClick: () => x("url"), children: [
            /* @__PURE__ */ e.jsx(ae, {}),
            " ",
            l("Link")
          ] }),
          /* @__PURE__ */ e.jsxs(n.Button, { type: "submit", disabled: k.processing, children: [
            k.processing && /* @__PURE__ */ e.jsx(ie, { className: "cms:animate-spin" }),
            " ",
            l("Save")
          ] })
        ] }),
        children: F && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: l("Unsaved changes") })
      }
    ),
    /* @__PURE__ */ e.jsx(ee, { message: w.items }),
    Object.keys(w).some((h) => h.startsWith("items.")) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: l("Some links need fixing: :error", { error: Object.values(w).filter(Boolean)[0] }) }),
    /* @__PURE__ */ e.jsx(n.Card, { className: "cms:p-2", children: m.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:p-4 cms:text-center cms:text-muted-foreground", children: l("No links yet. Add an entry or a link.") }) : L(-1) }),
    /* @__PURE__ */ e.jsx(ye, { kind: $, terms: d, listings: u, indexes: y, onClose: () => x(null), onAdd: (h) => {
      j([...m, h]), x(null);
    }, main: b })
  ] });
}
function G({ target: t, children: a, ...i }) {
  return { ...i, children: a.map(G) };
}
const fe = () => l("A menu links to entries that already exist: create the page first (Content → Entries), then add it here, or add a web address instead."), be = () => ({ entry: l("Link to an entry"), term: l("Link to a term's page"), listing: l("Link to a listing page"), index: l("Link to a taxonomy's index page"), url: l("Link to an address") }), je = () => ({
  entry: l("It follows the entry: its title (unless you give a label) and its address in each language. It shows only while the entry is on the site."),
  term: l("The page listing the term's entries, in each language. Its title is the label unless you give one."),
  listing: l("The collection's listing page, in each language, optionally with filters. The collection's title is the label unless you give one."),
  index: l("The page listing a taxonomy's terms, in each language. The taxonomy's title is the label unless you give one."),
  url: l("A web address, a path on this site (/contact), mailto: or tel:.")
});
function ye({ kind: t, terms: a, listings: i, indexes: c, onClose: d, onAdd: u, main: y }) {
  const [g, B] = S.useState(null), [p, m] = S.useState(""), [_, $] = S.useState(""), [x, k] = S.useState(""), [w, F] = S.useState(""), [D, b] = S.useState("");
  S.useEffect(() => {
    B(null), m(""), $(""), k(""), F(""), b("");
  }, [t]), S.useEffect(() => b(""), [p]);
  const j = t === "term" ? a.find((s) => String(s.id) === p) : void 0, C = j?.pages.find((s) => String(s.collection ?? "") === D) ?? j?.pages[0], v = t === "index" ? c.find((s) => String(s.id) === p) : void 0, E = v?.pages.find((s) => String(s.collection ?? "") === D) ?? v?.pages[0], L = j ?? v, h = j ? C : E, r = _.trim() === "" || X(_.trim()), N = x.trim() ? { [y]: x.trim() } : {}, I = async () => {
    if (t === "entry" && g !== null) {
      const s = await fetch(`${z("cms/entries/picker")}?${Z({ ids: [g], collections: [] })}`, { headers: { Accept: "application/json" }, credentials: "same-origin" }), f = s.ok ? (await s.json()).items[0] : void 0;
      u(H({ entry_id: g, target: f ? { title: f.title, kind: f.collection, live: f.status === "published" } : null, labels: N }));
    } else if (t === "term" && p !== "") {
      const s = a.find((K) => String(K.id) === p), f = C?.collection ?? null, J = f === null ? l("Shared page") : C?.title ?? "";
      u(H({ term_id: Number(p), collection_id: f, target: s ? { title: s.title, kind: `${s.taxonomy} · ${J}`, live: !0 } : null, labels: N }));
    } else if (t === "index" && p !== "" && v) {
      const s = E?.collection ?? null, f = s === null ? l(":taxonomy · Index page", { taxonomy: v.title }) : l(":taxonomy · :collection index", { taxonomy: v.title, collection: E?.title ?? "" });
      u(H({ taxonomy_id: v.id, collection_id: s, target: { title: v.title, kind: f, live: !0 }, labels: N }));
    } else if (t === "listing" && p !== "") {
      const s = i.find((f) => String(f.id) === p);
      u(H({ collection_id: Number(p), target: s ? { title: s.title, kind: l("Listing page"), live: !0 } : null, labels: N, query: w.trim().replace(/^\?/, "") || null }));
    } else t === "url" && _.trim() !== "" && r && x.trim() !== "" && u(H({ url: _.trim(), labels: N }));
  }, o = t === "entry" ? g !== null : t === "url" ? _.trim() !== "" && r && x.trim() !== "" : p !== "";
  return /* @__PURE__ */ e.jsx(n.Dialog, { open: t !== null, onOpenChange: (s) => !s && d(), children: /* @__PURE__ */ e.jsxs(n.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(n.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(n.DialogTitle, { children: t ? be()[t] : "" }),
      /* @__PURE__ */ e.jsx(n.DialogDescription, { children: t ? je()[t] : "" })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
      t === "entry" && /* @__PURE__ */ e.jsx(
        Y,
        {
          id: "menu-entry",
          value: g,
          multiple: !1,
          max: null,
          collections: [],
          invalid: !1,
          emptyHint: fe(),
          onChange: (s) => B(typeof s == "number" ? s : null)
        }
      ),
      (t === "term" || t === "listing" || t === "index") && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "menu-target", children: t === "term" ? l("Term") : t === "index" ? l("Taxonomy") : l("Collection") }),
        /* @__PURE__ */ e.jsxs(n.Select, { value: p, onValueChange: m, children: [
          /* @__PURE__ */ e.jsx(n.SelectTrigger, { id: "menu-target", children: /* @__PURE__ */ e.jsx(n.SelectValue, { placeholder: l("Choose…") }) }),
          /* @__PURE__ */ e.jsx(n.SelectContent, { children: t === "term" ? a.map((s) => /* @__PURE__ */ e.jsxs(n.SelectItem, { value: String(s.id), children: [
            s.taxonomy,
            ": ",
            s.title
          ] }, s.id)) : (t === "index" ? c : i).map((s) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: String(s.id), children: s.title }, s.id)) })
        ] })
      ] }),
      L && L.pages.length > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "menu-term-page", children: l("Page") }),
        /* @__PURE__ */ e.jsxs(n.Select, { value: String(h?.collection ?? "") || "__all", onValueChange: (s) => b(s === "__all" ? "" : s), children: [
          /* @__PURE__ */ e.jsx(n.SelectTrigger, { id: "menu-term-page", children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(n.SelectContent, { children: L.pages.map((s) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: s.collection === null ? "__all" : String(s.collection), children: s.collection === null ? s.title : l(":collection only", { collection: s.title }) }, s.collection ?? "__all")) })
        ] }),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: j ? l("The shared page lists the term's entries from every collection; a collection's page only its own.") : l("The shared index lists all the taxonomy's terms; a collection's only those its entries have.") })
      ] }),
      t === "listing" && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "menu-query", children: l("Filters (optional)") }),
        /* @__PURE__ */ e.jsx(
          n.Input,
          {
            id: "menu-query",
            className: "cms:font-mono",
            value: w,
            placeholder: "filter=value&other=value",
            onChange: (s) => F(s.target.value)
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: l("What the listing page's filters put after the ? in its address. Each language's link gets them, and a term may be named by its slug in any language.") })
      ] }),
      t === "url" && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "menu-url", children: l("Address") }),
        /* @__PURE__ */ e.jsx(
          n.Input,
          {
            id: "menu-url",
            value: _,
            placeholder: l("https://… or /contact"),
            "aria-invalid": !r,
            onChange: (s) => $(s.target.value)
          }
        ),
        !r && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: l("This address could run code; use https://, a path, mailto: or tel:.") })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "menu-label", children: t === "url" ? l("Label") : l("Label (optional)") }),
        /* @__PURE__ */ e.jsx(n.Input, { id: "menu-label", value: x, onChange: (s) => k(s.target.value) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(n.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "outline", onClick: d, children: l("Cancel") }),
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", onClick: () => {
        I();
      }, disabled: !o, children: l("Add") })
    ] })
  ] }) });
}
export {
  De as default
};
