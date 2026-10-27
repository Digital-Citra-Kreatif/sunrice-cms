import { j as e, a as z, t as s, r as V, l as F } from "./admin-4vjDOX5A.js";
import { c as A, _ as y } from "./createLucideIcon-Ccbp7F45.js";
import { u as n } from "./ui-Dh5wfMwT.js";
import { e as X, E as Y, p as Z } from "./EntriesPicker-DTMO-o8I.js";
import { F as ee } from "./FieldError-B0vJA9VL.js";
import { V as te } from "./VersionConflict-Cx_Ejz0a.js";
import { c as U, r as se } from "./tree-B7sRX6dH.js";
import { P as le } from "./plus-COqahUZ2.js";
import { L as ne, T as ae } from "./tags-DR5XKR3w.js";
import { L as ie } from "./link-2-BYZeXgi5.js";
import { L as re } from "./loader-circle-ByksABXO.js";
import { S as ce } from "./settings-2-0VUe76YZ.js";
import { T as oe } from "./Confirm-BEM1jBFC.js";
const O = {
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
O.node;
const me = A(O);
const R = {
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
R.node;
const de = A(R);
const Q = {
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
Q.node;
const ue = A(Q);
let W = 0;
function G(t, a = 0) {
  return t.flatMap(({ children: r, ...o }) => [{ ...o, key: `m${++W}`, depth: a }, ...G(r ?? [], a + 1)]);
}
function he(t) {
  const a = [], r = [{ depth: -1, children: a }];
  for (const { key: o, depth: m, ...h } of t) {
    for (; r.length > 1 && r[r.length - 1].depth >= m; ) r.pop();
    const b = { ...h, children: [] };
    r[r.length - 1].children.push(b), r.push({ depth: m, children: b.children });
  }
  return a;
}
function M(t, a) {
  const r = t[a]?.depth ?? 0;
  let o = a + 1;
  for (; o < t.length && t[o].depth > r; ) o++;
  return o;
}
function J(t, a, r) {
  const o = M(t, a);
  return t.map((m, h) => h >= a && h < o ? { ...m, depth: m.depth + r } : m);
}
function ge(t, a, r) {
  const o = t[a], m = t[a - 1];
  return !o || !m || o.depth > m.depth || Math.max(...t.slice(a, M(t, a)).map((b) => b.depth)) + 1 > r - 1 ? t : J(t, a, 1);
}
function pe(t, a) {
  const r = t[a];
  if (!r || r.depth === 0) return t;
  let o = a - 1;
  for (; o > 0 && t[o].depth >= r.depth; ) o--;
  const m = M(t, a), h = M(t, o), b = J(t, a, -1).slice(a, m);
  return [...t.slice(0, a), ...t.slice(m, h), ...b, ...t.slice(h)];
}
function xe(t, a) {
  return [...t.slice(0, a), ...t.slice(M(t, a))];
}
function E(t) {
  return { key: `m${++W}`, depth: 0, entry_id: null, term_id: null, taxonomy_id: null, collection_id: null, target: null, url: null, labels: {}, new_tab: !1, query: null, ...t };
}
function fe(t) {
  return t.url !== null || t.collection_id !== null && (t.query ?? "").trim() !== "" ? "main" : "title";
}
function He(t) {
  return /* @__PURE__ */ e.jsx(be, { ...t }, t.version);
}
function be({ menu: t, items: a, version: r, locales: o, limits: m, terms: h, listings: b, indexes: k = [], can: j, settings: g }) {
  const H = z(`cms/menus/${t.handle}/links`);
  n.useBreadcrumbs([{ label: s("Menus"), href: z("cms/menus") }, { label: t.title }]);
  const [c, $] = y.useState(() => G(a)), [C, v] = y.useState(null), S = V.useForm({ items: a, version: r }), _ = S.errors, [D, L] = y.useState(!1), p = o[0] ?? "en", N = (u) => {
    $(u), L(!0);
  }, f = (u, d) => N(c.map((B, l) => l === u ? { ...B, ...d } : B)), I = (u) => {
    S.processing || (S.transform(() => ({ items: he(c).map(K), version: u ? r : null })), S.put(H, { preserveScroll: !0, onSuccess: () => L(!1) }));
  }, T = () => I(!0), P = (u) => {
    u.preventDefault(), T();
  };
  n.useUnsavedChanges(D, j.update ? T : void 0);
  const w = (u) => /* @__PURE__ */ e.jsx(
    n.SortableList,
    {
      items: U(c, u),
      getId: (d) => c[d].key,
      getLabel: (d) => c[d].labels[p] || c[d].target?.title || c[d].url || "link",
      disabled: !j.update,
      onReorder: (d) => N(se(c, u, d)),
      className: u < 0 ? "cms:gap-1" : "cms:mt-1 cms:gap-1 cms:pl-6",
      children: (d, { handle: B, isOverlay: l }) => {
        const i = c[d];
        return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${l ? "" : "cms:border-border/70"}`, children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2 cms:p-2", children: [
            j.update && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:h-10 cms:shrink-0 cms:items-center", children: /* @__PURE__ */ e.jsx(n.SortableHandle, { ...B, label: s("Move :title", { title: i.labels[p] || i.target?.title || i.url || s("link") }) }) }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
                /* @__PURE__ */ e.jsx(
                  n.Input,
                  {
                    "aria-label": s("Label (:language)", { language: F(p) }),
                    className: "cms:w-full cms:sm:max-w-xs",
                    disabled: !j.update,
                    placeholder: i.target?.title ?? s("Label"),
                    value: i.labels[p] ?? "",
                    onChange: (x) => f(d, { labels: { ...i.labels, [p]: x.target.value } })
                  }
                ),
                /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-32 cms:flex-1 cms:truncate cms:text-sm cms:text-muted-foreground", children: i.url !== null ? i.url : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  i.target ? `${i.target.kind}: ${i.target.title}` : s("Gone"),
                  " ",
                  (!i.target || !i.target.live) && /* @__PURE__ */ e.jsx(n.Badge, { variant: "outline", children: s("Not on the site") })
                ] }) }),
                j.update && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center", children: [
                  /* @__PURE__ */ e.jsxs("label", { className: "cms:mr-2 cms:flex cms:items-center cms:gap-1.5 cms:text-sm", children: [
                    /* @__PURE__ */ e.jsx(n.Checkbox, { checked: i.new_tab, onCheckedChange: (x) => f(d, { new_tab: x }) }),
                    " ",
                    s("New tab")
                  ] }),
                  /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": s("Outdent"), disabled: i.depth === 0, onClick: () => N(pe(c, d)), children: /* @__PURE__ */ e.jsx(me, {}) }),
                  /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": s("Indent"), onClick: () => N(ge(c, d, m.depth)), children: /* @__PURE__ */ e.jsx(de, {}) }),
                  /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": s("Remove, with what's under it"), onClick: () => N(xe(c, d)), children: /* @__PURE__ */ e.jsx(oe, {}) })
                ] })
              ] }),
              i.collection_id !== null && i.term_id === null && !i.taxonomy_id && /* @__PURE__ */ e.jsx(
                n.Input,
                {
                  "aria-label": s("Filters"),
                  className: "cms:w-full cms:sm:max-w-md cms:font-mono",
                  disabled: !j.update,
                  placeholder: s("Filters (optional): :example", { example: "filter=value" }),
                  value: i.query ?? "",
                  onChange: (x) => f(d, { query: x.target.value })
                }
              ),
              o.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: o.slice(1).map((x) => /* @__PURE__ */ e.jsx(
                n.Input,
                {
                  "aria-label": s("Label (:language)", { language: F(x) }),
                  className: "cms:w-full cms:sm:max-w-xs",
                  disabled: !j.update,
                  placeholder: fe(i) === "title" ? s(":language: its title there, else as :main", { language: F(x), main: F(p) }) : s(":language: as :main", { language: F(x), main: F(p) }),
                  value: i.labels[x] ?? "",
                  onChange: (q) => f(d, { labels: { ...i.labels, [x]: q.target.value } })
                },
                x
              )) })
            ] })
          ] }),
          !l && U(c, d).length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:px-2 cms:pb-2", children: w(d) })
        ] });
      }
    }
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: P, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(V.Head, { title: t.title }),
    /* @__PURE__ */ e.jsx(
      n.PageHeader,
      {
        title: t.title,
        menu: g ? [{ label: s("Settings"), href: g, icon: /* @__PURE__ */ e.jsx(ce, {}) }] : [],
        back: { href: z("cms/menus"), label: s("Back to menus") },
        actions: j.update && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", disabled: c.length >= m.items, onClick: () => v("entry"), children: [
            /* @__PURE__ */ e.jsx(le, {}),
            " ",
            s("Entry")
          ] }),
          h.length > 0 && /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", disabled: c.length >= m.items, onClick: () => v("term"), children: [
            /* @__PURE__ */ e.jsx(ue, {}),
            " ",
            s("Term")
          ] }),
          b.length > 0 && /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", disabled: c.length >= m.items, onClick: () => v("listing"), children: [
            /* @__PURE__ */ e.jsx(ne, {}),
            " ",
            s("Listing")
          ] }),
          k.length > 0 && /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", disabled: c.length >= m.items, onClick: () => v("index"), children: [
            /* @__PURE__ */ e.jsx(ae, {}),
            " ",
            s("Taxonomy index")
          ] }),
          /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", disabled: c.length >= m.items, onClick: () => v("url"), children: [
            /* @__PURE__ */ e.jsx(ie, {}),
            " ",
            s("Link")
          ] }),
          /* @__PURE__ */ e.jsxs(n.Button, { type: "submit", disabled: S.processing, children: [
            S.processing && /* @__PURE__ */ e.jsx(re, { className: "cms:animate-spin" }),
            " ",
            s("Save")
          ] })
        ] }),
        children: D && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: s("Unsaved changes") })
      }
    ),
    /* @__PURE__ */ e.jsx(te, { message: _.version, processing: S.processing, onSaveMine: () => I(!1) }),
    /* @__PURE__ */ e.jsx(ee, { message: _.items }),
    Object.keys(_).some((u) => u.startsWith("items.")) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: s("Some links need fixing: :error", { error: Object.values(_).filter(Boolean)[0] }) }),
    /* @__PURE__ */ e.jsx(n.Card, { className: "cms:p-2", children: c.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:p-4 cms:text-center cms:text-muted-foreground", children: s("No links yet. Add an entry or a link.") }) : w(-1) }),
    /* @__PURE__ */ e.jsx(Se, { kind: C, terms: h, listings: b, indexes: k, onClose: () => v(null), onAdd: (u) => {
      N([...c, u]), v(null);
    }, main: p })
  ] });
}
function K({ target: t, children: a, ...r }) {
  return { ...r, children: a.map(K) };
}
const je = () => s("A menu links to entries that already exist: create the page first (Content → Entries), then add it here, or add a web address instead."), ye = () => ({ entry: s("Link to an entry"), term: s("Link to a term's page"), listing: s("Link to a listing page"), index: s("Link to a taxonomy's index page"), url: s("Link to an address") }), ve = () => ({
  entry: s("It follows the entry: its title (unless you give a label) and its address in each language. It shows only while the entry is on the site."),
  term: s("The page listing the term's entries, in each language. Its title is the label unless you give one."),
  listing: s("The collection's listing page, in each language, optionally with filters. The collection's title is the label unless you give one."),
  index: s("The page listing a taxonomy's terms, in each language. The taxonomy's title is the label unless you give one."),
  url: s("A web address, a path on this site (/contact), mailto: or tel:.")
});
function Se({ kind: t, terms: a, listings: r, indexes: o, onClose: m, onAdd: h, main: b }) {
  const [k, j] = y.useState(null), [g, H] = y.useState(""), [c, $] = y.useState(""), [C, v] = y.useState(""), [S, _] = y.useState(""), [D, L] = y.useState("");
  y.useEffect(() => {
    j(null), H(""), $(""), v(""), _(""), L("");
  }, [t]), y.useEffect(() => L(""), [g]);
  const p = t === "term" ? a.find((l) => String(l.id) === g) : void 0, N = p?.pages.find((l) => String(l.collection ?? "") === D) ?? p?.pages[0], f = t === "index" ? o.find((l) => String(l.id) === g) : void 0, I = f?.pages.find((l) => String(l.collection ?? "") === D) ?? f?.pages[0], T = p ?? f, P = p ? N : I, w = c.trim() === "" || X(c.trim()), u = C.trim() ? { [b]: C.trim() } : {}, d = async () => {
    if (t === "entry" && k !== null) {
      const l = await fetch(`${z("cms/entries/picker")}?${Z({ ids: [k], collections: [] })}`, { headers: { Accept: "application/json" }, credentials: "same-origin" }), i = l.ok ? (await l.json()).items[0] : void 0;
      h(E({ entry_id: k, target: i ? { title: i.title, kind: i.collection, live: i.status === "published" } : null, labels: u }));
    } else if (t === "term" && g !== "") {
      const l = a.find((q) => String(q.id) === g), i = N?.collection ?? null, x = i === null ? s("Shared page") : N?.title ?? "";
      h(E({ term_id: Number(g), collection_id: i, target: l ? { title: l.title, kind: `${l.taxonomy} · ${x}`, live: !0 } : null, labels: u }));
    } else if (t === "index" && g !== "" && f) {
      const l = I?.collection ?? null, i = l === null ? s(":taxonomy · Index page", { taxonomy: f.title }) : s(":taxonomy · :collection index", { taxonomy: f.title, collection: I?.title ?? "" });
      h(E({ taxonomy_id: f.id, collection_id: l, target: { title: f.title, kind: i, live: !0 }, labels: u }));
    } else if (t === "listing" && g !== "") {
      const l = r.find((i) => String(i.id) === g);
      h(E({ collection_id: Number(g), target: l ? { title: l.title, kind: s("Listing page"), live: !0 } : null, labels: u, query: S.trim().replace(/^\?/, "") || null }));
    } else t === "url" && c.trim() !== "" && w && C.trim() !== "" && h(E({ url: c.trim(), labels: u }));
  }, B = t === "entry" ? k !== null : t === "url" ? c.trim() !== "" && w && C.trim() !== "" : g !== "";
  return /* @__PURE__ */ e.jsx(n.Dialog, { open: t !== null, onOpenChange: (l) => !l && m(), children: /* @__PURE__ */ e.jsxs(n.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(n.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(n.DialogTitle, { children: t ? ye()[t] : "" }),
      /* @__PURE__ */ e.jsx(n.DialogDescription, { children: t ? ve()[t] : "" })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
      t === "entry" && /* @__PURE__ */ e.jsx(
        Y,
        {
          id: "menu-entry",
          value: k,
          multiple: !1,
          max: null,
          collections: [],
          invalid: !1,
          emptyHint: je(),
          onChange: (l) => j(typeof l == "number" ? l : null)
        }
      ),
      (t === "term" || t === "listing" || t === "index") && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "menu-target", children: t === "term" ? s("Term") : t === "index" ? s("Taxonomy") : s("Collection") }),
        /* @__PURE__ */ e.jsxs(n.Select, { value: g, onValueChange: H, children: [
          /* @__PURE__ */ e.jsx(n.SelectTrigger, { id: "menu-target", children: /* @__PURE__ */ e.jsx(n.SelectValue, { placeholder: s("Choose…") }) }),
          /* @__PURE__ */ e.jsx(n.SelectContent, { children: t === "term" ? a.map((l) => /* @__PURE__ */ e.jsxs(n.SelectItem, { value: String(l.id), children: [
            l.taxonomy,
            ": ",
            l.title
          ] }, l.id)) : (t === "index" ? o : r).map((l) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: String(l.id), children: l.title }, l.id)) })
        ] })
      ] }),
      T && T.pages.length > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "menu-term-page", children: s("Page") }),
        /* @__PURE__ */ e.jsxs(n.Select, { value: String(P?.collection ?? "") || "__all", onValueChange: (l) => L(l === "__all" ? "" : l), children: [
          /* @__PURE__ */ e.jsx(n.SelectTrigger, { id: "menu-term-page", children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(n.SelectContent, { children: T.pages.map((l) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: l.collection === null ? "__all" : String(l.collection), children: l.collection === null ? l.title : s(":collection only", { collection: l.title }) }, l.collection ?? "__all")) })
        ] }),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: p ? s("The shared page lists the term's entries from every collection; a collection's page only its own.") : s("The shared index lists all the taxonomy's terms; a collection's only those its entries have.") })
      ] }),
      t === "listing" && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "menu-query", children: s("Filters (optional)") }),
        /* @__PURE__ */ e.jsx(
          n.Input,
          {
            id: "menu-query",
            className: "cms:font-mono",
            value: S,
            placeholder: "filter=value&other=value",
            onChange: (l) => _(l.target.value)
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s("What the listing page's filters put after the ? in its address. Each language's link gets them, and a term may be named by its slug in any language.") })
      ] }),
      t === "url" && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "menu-url", children: s("Address") }),
        /* @__PURE__ */ e.jsx(
          n.Input,
          {
            id: "menu-url",
            value: c,
            placeholder: s("https://… or /contact"),
            "aria-invalid": !w,
            onChange: (l) => $(l.target.value)
          }
        ),
        !w && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: s("This address could run code; use https://, a path, mailto: or tel:.") })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "menu-label", children: t === "url" ? s("Label") : s("Label (optional)") }),
        /* @__PURE__ */ e.jsx(n.Input, { id: "menu-label", value: C, onChange: (l) => v(l.target.value) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(n.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "outline", onClick: m, children: s("Cancel") }),
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", onClick: () => {
        d();
      }, disabled: !B, children: s("Add") })
    ] })
  ] }) });
}
export {
  He as default
};
