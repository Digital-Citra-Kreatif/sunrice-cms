import { j as e, t as a, r as p, a as w, l as Q, f as A, s as X } from "./admin-DAGzaoYs.js";
import { c as T, _ as j } from "./createLucideIcon-Ccbp7F45.js";
import { u as Le, T as Be } from "./Confirm-BSxcGfBV.js";
import { u as t } from "./ui-Dh5wfMwT.js";
import { E as re, T as ze, X as ce } from "./TermsPicker-BK5YZMp_.js";
import { E as Ee } from "./ellipsis-C7tKJoZ2.js";
import { t as Ie, c as V, m as Fe, r as Re } from "./tree-BdgFD7PS.js";
import { D as He } from "./download-DA5N5mq4.js";
import { P as oe } from "./plus-COqahUZ2.js";
import { S as Ae } from "./search-3zKi7F1_.js";
import { R as Ve } from "./rotate-ccw-BcgdCn0y.js";
import { C as Oe } from "./chevron-left-usCQl1qw.js";
import { C as Ue } from "./chevron-right-9qVV6b-Q.js";
const ie = {
  name: "arrow-down-to-line",
  size: 24,
  node: [
    ["path", { d: "M12 17V3", key: "1cwfxf" }],
    ["path", { d: "m6 11 6 6 6-6", key: "12ii2o" }],
    ["path", { d: "M19 21H5", key: "150jfl" }]
  ]
};
ie.node;
const Qe = T(ie);
const de = {
  name: "arrow-down",
  size: 24,
  node: [
    ["path", { d: "M12 5v14", key: "s699le" }],
    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
  ]
};
de.node;
const me = T(de);
const ue = {
  name: "arrow-up-down",
  size: 24,
  node: [
    ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
    ["path", { d: "M17 20V4", key: "1ejh1v" }],
    ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
    ["path", { d: "M7 4v16", key: "1glfcx" }]
  ]
};
ue.node;
const he = T(ue);
const xe = {
  name: "arrow-up-to-line",
  size: 24,
  node: [
    ["path", { d: "M5 3h14", key: "7usisc" }],
    ["path", { d: "m18 13-6-6-6 6", key: "1kf1n9" }],
    ["path", { d: "M12 7v14", key: "1akyts" }]
  ]
};
xe.node;
const Xe = T(xe);
const pe = {
  name: "arrow-up",
  size: 24,
  node: [
    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
    ["path", { d: "M12 19V5", key: "x0mq9r" }]
  ]
};
pe.node;
const ge = T(pe);
const je = {
  name: "columns-3",
  size: 24,
  node: [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M9 3v18", key: "fh3hqa" }],
    ["path", { d: "M15 3v18", key: "14nvp0" }]
  ],
  aliases: ["panels-left-right"]
};
je.node;
const Ge = T(je);
const fe = {
  name: "list-filter",
  size: 24,
  node: [
    ["path", { d: "M2 5h20", key: "1fs1ex" }],
    ["path", { d: "M6 12h12", key: "8npq4p" }],
    ["path", { d: "M9 19h6", key: "456am0" }]
  ]
};
fe.node;
const Ke = T(fe);
const ve = {
  name: "list-ordered",
  size: 24,
  node: [
    ["path", { d: "M11 5h10", key: "1cz7ny" }],
    ["path", { d: "M11 12h10", key: "1438ji" }],
    ["path", { d: "M11 19h10", key: "11t30w" }],
    ["path", { d: "M4 4h1v5", key: "10yrso" }],
    ["path", { d: "M4 9h2", key: "r1h2o0" }],
    ["path", { d: "M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02", key: "xtkcd5" }]
  ]
};
ve.node;
const We = T(ve);
function be({ title: n, position: c, count: r, onMove: l }) {
  const [d, o] = j.useState(!1), [h, M] = j.useState(""), S = j.useId(), k = /^\d+$/.test(h.trim()) ? Number(h.trim()) : null, x = k !== null && k >= 1, g = (m) => {
    m.preventDefault(), x && (o(!1), l(r !== void 0 ? Math.min(k, r) : k));
  };
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsxs(t.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(t.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(t.Button, { variant: "ghost", size: "icon", "aria-label": a("More ways to move :title", { title: n }), children: /* @__PURE__ */ e.jsx(Ee, {}) }) }),
      /* @__PURE__ */ e.jsxs(t.DropdownMenuContent, { align: "end", children: [
        /* @__PURE__ */ e.jsxs(t.DropdownMenuItem, { disabled: c === 1, onSelect: () => l("top"), children: [
          /* @__PURE__ */ e.jsx(Xe, {}),
          " ",
          a("Move to top")
        ] }),
        /* @__PURE__ */ e.jsxs(t.DropdownMenuItem, { disabled: c !== void 0 && c === r, onSelect: () => l("bottom"), children: [
          /* @__PURE__ */ e.jsx(Qe, {}),
          " ",
          a("Move to bottom")
        ] }),
        /* @__PURE__ */ e.jsxs(t.DropdownMenuItem, { onSelect: () => {
          M(c !== void 0 ? String(c) : ""), o(!0);
        }, children: [
          /* @__PURE__ */ e.jsx(We, {}),
          " ",
          a("Move to position…")
        ] })
      ] })
    ] }),
    d && /* @__PURE__ */ e.jsx(t.Dialog, { open: !0, onOpenChange: (m) => !m && o(!1), children: /* @__PURE__ */ e.jsx(t.DialogContent, { children: /* @__PURE__ */ e.jsxs("form", { onSubmit: g, className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsxs(t.DialogHeader, { children: [
        /* @__PURE__ */ e.jsx(t.DialogTitle, { children: a("Move :title", { title: n }) }),
        /* @__PURE__ */ e.jsx(t.DialogDescription, { children: r !== void 0 && c !== void 0 ? a("It's number :position of :count at its level. 1 puts it first.", { position: c, count: r }) : a("Among the entries at its level: 1 puts it first, a number past the last puts it last.") })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
        /* @__PURE__ */ e.jsx(t.Label, { htmlFor: S, children: a("Position") }),
        /* @__PURE__ */ e.jsx(
          t.Input,
          {
            id: S,
            type: "number",
            inputMode: "numeric",
            min: 1,
            max: r,
            step: 1,
            autoFocus: !0,
            value: h,
            "aria-invalid": h !== "" && !x,
            onChange: (m) => M(m.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ e.jsxs(t.DialogFooter, { children: [
        /* @__PURE__ */ e.jsx(t.Button, { type: "button", variant: "outline", onClick: () => o(!1), children: a("Cancel") }),
        /* @__PURE__ */ e.jsx(t.Button, { type: "submit", disabled: !x, children: a("Move") })
      ] })
    ] }) }) })
  ] });
}
function Je({ collection: n, rows: c, hierarchical: r = !1, onError: l }) {
  const d = j.useCallback(
    (x) => Ie(x, (g) => r ? g.parentId : null),
    [r]
  ), [o, h] = j.useState(() => d(c));
  j.useEffect(() => h(d(c)), [c, d]);
  const M = (x, g) => {
    const m = Re(o, x, g), u = V(m, x).map((C) => m[C].id);
    h(m), p.router.post(
      w("cms/entries/reorder"),
      { collection: n, ids: u, parent_id: x < 0 ? null : o[x]?.id ?? null },
      { preserveScroll: !0, preserveState: !0, onError: () => {
        h(d(c)), l?.();
      } }
    );
  }, S = (x, g) => {
    const m = Fe(o, x, g === "top" ? 1 : g === "bottom" ? Number.MAX_SAFE_INTEGER : g);
    m && M(m.parent, m.order);
  }, k = (x) => {
    const g = V(o, x), m = new Map(g.map((u, C) => [u, C + 1]));
    return /* @__PURE__ */ e.jsx(
      t.SortableList,
      {
        items: g,
        getId: (u) => o[u].id,
        getLabel: (u) => o[u].title,
        onReorder: (u) => M(x, u),
        className: x < 0 ? "cms:gap-1" : "cms:mt-1 cms:gap-1 cms:pl-6",
        children: (u, { handle: C, isOverlay: D }) => {
          const y = o[u], f = m.get(u) ?? 0;
          return /* @__PURE__ */ e.jsxs("div", { children: [
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-lg cms:border cms:border-border/70 cms:bg-card cms:p-2 cms:text-sm", children: [
              /* @__PURE__ */ e.jsx(t.SortableHandle, { ...C, label: a("Move :title", { title: y.title }) }),
              /* @__PURE__ */ e.jsx("span", { className: "cms:w-8 cms:flex-none cms:text-right cms:text-xs cms:tabular-nums cms:text-muted-foreground", "aria-hidden": "true", children: f }),
              /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium", children: y.title }),
              /* @__PURE__ */ e.jsx(re, { status: y.status, changes: y.changes }),
              !D && g.length > 1 && /* @__PURE__ */ e.jsx(be, { title: y.title, position: f, count: g.length, onMove: ($) => S(u, $) })
            ] }),
            !D && V(o, u).length > 0 && k(u)
          ] });
        }
      }
    );
  };
  return /* @__PURE__ */ e.jsxs(t.Card, { className: "cms:p-2", children: [
    r && /* @__PURE__ */ e.jsx("p", { className: "cms:px-1 cms:pb-1 cms:text-xs cms:text-muted-foreground", children: a("Entries move among those at their level, with what's under them. To put one under another, choose its Parent in its Page settings.") }),
    k(-1)
  ] });
}
function ae(n, c, r) {
  const l = { ...n, ...c }, d = Object.fromEntries(Object.entries(l.terms).filter(([, h]) => h !== "")), o = {};
  return l.search && (o.search = l.search), l.status && (o.status = l.status), l.author && (o.author = l.author), Object.keys(d).length > 0 && (o.terms = d), l.locale && l.locale !== r && (o.locale = l.locale), l.sort && (o.sort = l.sort), o.per_page = l.perPage, o;
}
function Ye(n) {
  const c = new URLSearchParams();
  for (const [r, l] of Object.entries(n))
    if (typeof l == "object")
      for (const [d, o] of Object.entries(l)) c.set(`${r}[${d}]`, o);
    else
      c.set(r, String(l));
  return c.toString();
}
function Ze(n, c) {
  return n === c ? `-${c}` : n === `-${c}` ? "" : c;
}
function qe(n, c) {
  return n === c ? "asc" : n === `-${c}` ? "desc" : null;
}
function le(n) {
  return [n.search, n.status, n.author, ...Object.values(n.terms)].filter((c) => c !== "").length;
}
const es = 2;
function ss(n, c) {
  return [n.author, ...c.map((r) => n.terms[r] ?? "")].filter((r) => r !== "").length;
}
const O = "__all", ts = () => [
  { value: "draft", label: a("Drafts") },
  { value: "published", label: a("Live") },
  { value: "scheduled", label: a("Scheduled") },
  { value: "trashed", label: a("Trash") }
];
function bs(n) {
  const { collection: c, entries: r, query: l } = n;
  return t.useBreadcrumbs([{ label: c ? c.title : a("Entries") }]), !c || !r || !l ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(p.Head, { title: a("Entries") }),
    /* @__PURE__ */ e.jsx(t.PageHeader, { title: a("Entries"), description: a("There are no collections yet. Create one under Structure → Collections, then come back to write its entries.") })
  ] }) : /* @__PURE__ */ e.jsx(as, { ...n, collection: c, entries: r, query: l });
}
function as({
  collection: n,
  collections: c,
  entries: r,
  query: l,
  columns: d = [],
  filters: o = { authors: [], taxonomies: [], locales: [] },
  links: h = [],
  manualOrder: M = !1,
  order: S,
  perPageOptions: k = [10, 25, 50, 100],
  preferencesKey: x,
  trashedCount: g = 0,
  can: m
}) {
  const u = w(`cms/collections/${n.handle}/entries`), C = o.locales[0] ?? l.locale, [D, y] = j.useState(l.search), [f, $] = j.useState([]), [_, F] = j.useState(!1), [P, G] = j.useState(void 0);
  j.useEffect(() => {
    S !== void 0 && (G(S), S === null && F(!1));
  }, [S]);
  const K = () => p.router.reload({ only: ["order"] }), [W, Ce] = Le(), { setColumns: Ne, setPerPage: Se } = t.useTablePreferences(x ?? `table.cms.entries.${n.handle}`, { columns: l.columns, perPage: l.perPage });
  j.useEffect(() => $([]), [r]);
  const N = l.status === "trashed", ke = le(l) > 0, E = [
    ...o.authors.length > 0 ? [{ key: "author", label: a("Author"), value: l.author, options: o.authors, onChange: (s) => b({ author: s }) }] : [],
    ...o.taxonomies.filter((s) => s.terms.length > 0 || s.search).map((s) => ({
      key: `terms-${s.handle}`,
      label: s.title,
      value: l.terms[s.handle] ?? "",
      options: s.terms.map((i) => ({ value: i.value, label: `${"— ".repeat(i.depth)}${i.label}` })),
      onChange: (i) => b({ terms: { ...l.terms, [s.handle]: i } }),
      ...s.search ? { taxonomy: s.handle } : {}
    }))
  ], ye = E.length > es || E.some((s) => s.taxonomy), J = ss(l, o.taxonomies.map((s) => s.handle)), R = d.filter((s) => l.columns.includes(s.key)), L = j.useRef(l), Y = j.useRef(l);
  Y.current !== l && (Y.current = l, L.current = l);
  const we = (s = {}) => ae(L.current, s, C), b = (s) => {
    const i = we(s);
    L.current = { ...L.current, ...s }, p.router.get(u, i, { preserveState: !0, preserveScroll: !0, replace: !0 });
  };
  j.useEffect(() => {
    if (D === L.current.search) return;
    const s = window.setTimeout(() => b({ search: D }), 300);
    return () => window.clearTimeout(s);
  }, [D]);
  const B = N ? m?.delete ? [{ action: "restore", label: a("Restore") }, { action: "delete", label: a("Permanently delete"), danger: !0 }] : [] : [
    ...m?.publish ? [{ action: "publish", label: a("Publish") }, { action: "unpublish", label: a("Unpublish") }] : [],
    ...m?.delete ? [{ action: "trash", label: a("Move to the trash"), danger: !0 }] : []
  ], Te = (s, i, v = !1) => {
    const I = () => p.router.post(`${u}/bulk`, { action: s, ids: f }, { preserveScroll: !0 });
    if (v) {
      const Pe = f.length === 1 ? a(":action: 1 entry?", { action: i }) : a(":action: :count entries?", { action: i, count: f.length });
      W(
        `${Pe} ${s === "delete" ? a("This can't be undone.") : a("They come off the site; you can restore them.")}`,
        I,
        s === "trash" ? a("Move to trash") : a("Delete")
      );
    } else
      I();
  }, Z = async (s) => {
    const i = new Set(l.columns);
    i.has(s) ? i.delete(s) : i.add(s), await Ne(d.map((v) => v.key).filter((v) => i.has(v))), p.router.reload({ only: ["entries", "query"] });
  }, q = () => {
    y(""), b({ search: "", status: "", author: "", terms: {} });
  }, z = M && !!m?.update, ee = z && r.total > 1, Me = () => {
    G(void 0), F(!0), K();
  }, se = _ && P?.entries === null, De = !z && n.ordered && !!m?.update && !N && r.total > 1, _e = (s, i) => p.router.post(w(`cms/entries/${s.id}/move`), typeof i == "number" ? { position: i } : { direction: i }, { preserveScroll: !0 }), H = N && !!m?.delete, $e = 1 + R.length + (B.length > 0 ? 1 : 0) + (z ? 1 : 0) + (H ? 1 : 0), te = Ye(ae(l, {}, C));
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(p.Head, { title: n.title }),
    Ce,
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: N ? /* @__PURE__ */ e.jsx(t.TrashTitle, { children: n.title }) : n.title,
        primary: m?.create && !N && /* @__PURE__ */ e.jsx(t.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(p.Link, { href: `${u}/create`, children: [
          /* @__PURE__ */ e.jsx(oe, {}),
          " ",
          a("New entry")
        ] }) }),
        menu: [
          ...r.total > 0 && m?.export ? [{ label: a("Export CSV"), href: `${u}/export${te ? `?${te}` : ""}`, download: !0, icon: /* @__PURE__ */ e.jsx(He, {}) }] : [],
          ...h.map((s) => ({ label: s.label, href: s.href, external: s.external, group: s.group }))
        ],
        children: c.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: n.handle, onValueChange: (s) => p.router.get(w(`cms/collections/${s}/entries`)), children: [
          /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": a("Collection"), children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(t.SelectContent, { children: c.map((s) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: s.handle, children: s.title }, s.handle)) })
        ] })
      }
    ),
    N && /* @__PURE__ */ e.jsx(t.TrashBanner, { items: a("entries"), onBack: () => b({ status: "" }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:md:flex-row cms:md:items-start", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-wrap cms:items-center cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-xs", children: [
          /* @__PURE__ */ e.jsx(Ae, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
          /* @__PURE__ */ e.jsx(
            t.Input,
            {
              className: "cms:pl-9",
              placeholder: a("Search titles, slugs or #id"),
              "aria-label": a("Search entries"),
              value: D,
              onChange: (s) => y(s.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx(U, { label: a("Status"), value: l.status, options: ts(), onChange: (s) => b({ status: s }) }),
        ye ? /* @__PURE__ */ e.jsxs(t.Popover, { children: [
          /* @__PURE__ */ e.jsx(t.PopoverTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(t.Button, { variant: "outline", children: [
            /* @__PURE__ */ e.jsx(Ke, {}),
            " ",
            a("Filters"),
            J > 0 && /* @__PURE__ */ e.jsx(t.Badge, { variant: "secondary", className: "cms:ml-1 cms:px-1.5", children: J })
          ] }) }),
          /* @__PURE__ */ e.jsx(t.PopoverContent, { align: "start", className: "cms:flex cms:w-80 cms:flex-col cms:gap-3", children: E.map((s) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
            /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `entry-filter-${s.key}`, children: s.label }),
            s.taxonomy ? /* @__PURE__ */ e.jsx(
              ze,
              {
                id: `entry-filter-${s.key}`,
                taxonomy: s.taxonomy,
                multiple: !1,
                max: null,
                required: !1,
                invalid: !1,
                placeholder: a(":filter: all", { filter: s.label }),
                value: /^\d+$/.test(s.value) ? Number(s.value) : null,
                onChange: (i) => s.onChange(typeof i == "number" ? String(i) : "")
              }
            ) : /* @__PURE__ */ e.jsx(U, { id: `entry-filter-${s.key}`, wide: !0, label: s.label, value: s.value, options: s.options, onChange: s.onChange })
          ] }, s.key)) })
        ] }) : E.map((s) => /* @__PURE__ */ e.jsx(U, { label: s.label, value: s.value, options: s.options, onChange: s.onChange }, s.key)),
        o.locales.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: l.locale, onValueChange: (s) => b({ locale: s }), children: [
          /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-auto cms:min-w-40 cms:max-w-72", "aria-label": a("Language"), children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(t.SelectContent, { children: o.locales.map((s) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: s, children: [
            Q(s),
            s === C ? ` ${a("(main)")}` : ""
          ] }, s)) })
        ] }),
        ke && /* @__PURE__ */ e.jsxs(t.Button, { variant: "ghost", size: "sm", onClick: q, children: [
          /* @__PURE__ */ e.jsx(ce, {}),
          " ",
          a("Clear")
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-none cms:flex-wrap cms:items-center cms:gap-2 cms:md:ml-auto", children: [
        f.length > 0 && B.length > 0 && /* @__PURE__ */ e.jsxs("div", { role: "toolbar", "aria-label": a("Selected entries"), className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: a(":count selected", { count: f.length }) }),
          B.map((s) => /* @__PURE__ */ e.jsx(t.Button, { size: "sm", variant: s.danger ? "destructive" : "outline", onClick: () => Te(s.action, s.label, s.danger), children: s.label }, s.action))
        ] }),
        ee && /* @__PURE__ */ e.jsxs(t.Button, { variant: _ ? "secondary" : "outline", "aria-pressed": _, onClick: () => _ ? F(!1) : Me(), children: [
          /* @__PURE__ */ e.jsx(he, {}),
          " ",
          _ ? a("Done") : a("Reorder")
        ] }),
        De && /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", children: a("Clear the search, filters and sorting to reorder.") }),
        d.length > 0 && /* @__PURE__ */ e.jsxs(t.DropdownMenu, { children: [
          /* @__PURE__ */ e.jsx(t.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(t.Button, { variant: "outline", children: [
            /* @__PURE__ */ e.jsx(Ge, {}),
            " ",
            a("Columns")
          ] }) }),
          /* @__PURE__ */ e.jsxs(t.DropdownMenuContent, { align: "end", className: "cms:max-h-96 cms:overflow-y-auto", children: [
            /* @__PURE__ */ e.jsx(t.DropdownMenuLabel, { children: a("Columns") }),
            d.filter((s) => !s.field).map((s) => /* @__PURE__ */ e.jsx(
              t.DropdownMenuCheckboxItem,
              {
                checked: l.columns.includes(s.key),
                onSelect: (i) => i.preventDefault(),
                onCheckedChange: () => {
                  Z(s.key);
                },
                children: s.label
              },
              s.key
            )),
            d.some((s) => s.field) && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(t.DropdownMenuSeparator, {}),
              /* @__PURE__ */ e.jsx(t.DropdownMenuLabel, { children: a("Fields") }),
              d.filter((s) => s.field).map((s) => /* @__PURE__ */ e.jsx(
                t.DropdownMenuCheckboxItem,
                {
                  checked: l.columns.includes(s.key),
                  onSelect: (i) => i.preventDefault(),
                  onCheckedChange: () => {
                    Z(s.key);
                  },
                  children: s.label
                },
                s.key
              ))
            ] })
          ] })
        ] })
      ] })
    ] }),
    se && P && /* @__PURE__ */ e.jsx("p", { role: "status", className: "cms:rounded-lg cms:border cms:bg-muted/40 cms:px-4 cms:py-3 cms:text-sm", children: a("This collection has more than :limit entries, too many to drag. Use each row's ⋯ menu to move an entry to the top, the bottom or a position, or its arrows to move it a place.", { limit: P.limit }) }),
    _ && ee && !se ? P?.entries ? /* @__PURE__ */ e.jsx(Je, { collection: n.handle, rows: P.entries, hierarchical: n.hierarchical === !0, onError: K }) : /* @__PURE__ */ e.jsx(t.Card, { className: "cms:p-6 cms:text-center cms:text-sm cms:text-muted-foreground", role: "status", children: a("Loading the order…") }) : /* @__PURE__ */ e.jsxs(t.Card, { className: "cms:gap-0 cms:overflow-hidden cms:py-0", children: [
      /* @__PURE__ */ e.jsxs(t.Table, { children: [
        /* @__PURE__ */ e.jsx(t.TableHeader, { className: "cms:bg-muted/60", children: /* @__PURE__ */ e.jsxs(t.TableRow, { className: "cms:hover:bg-transparent", children: [
          B.length > 0 && /* @__PURE__ */ e.jsx(t.TableHead, { className: "cms:w-10", children: /* @__PURE__ */ e.jsx(
            t.Checkbox,
            {
              "aria-label": a("Select all on this page"),
              checked: r.data.length > 0 && f.length === r.data.length,
              onCheckedChange: (s) => $(s ? r.data.map((i) => i.id) : [])
            }
          ) }),
          /* @__PURE__ */ e.jsx(ne, { label: a("Title"), sortKey: "title", sort: l.sort, onSort: (s) => b({ sort: s }) }),
          R.map((s) => s.sortable ? /* @__PURE__ */ e.jsx(ne, { label: s.label, sortKey: s.key, sort: l.sort, onSort: (i) => b({ sort: i }) }, s.key) : /* @__PURE__ */ e.jsx(t.TableHead, { children: s.label }, s.key)),
          z && /* @__PURE__ */ e.jsx(t.TableHead, { className: "cms:w-px", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: a("Order") }) }),
          H && /* @__PURE__ */ e.jsx(t.TableHead, { className: "cms:w-px", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: a("Restore") }) })
        ] }) }),
        /* @__PURE__ */ e.jsxs(t.TableBody, { children: [
          r.data.length === 0 && /* @__PURE__ */ e.jsx(t.TableRow, { className: "cms:hover:bg-transparent", children: /* @__PURE__ */ e.jsxs(t.TableCell, { colSpan: $e, className: "cms:h-32 cms:text-center cms:text-muted-foreground", children: [
            /* @__PURE__ */ e.jsx(rs, { trashed: N, filtered: le(N ? { ...l, status: "" } : l) > 0, canCreate: !!m?.create, createUrl: `${u}/create`, onClear: q }),
            !N && /* @__PURE__ */ e.jsx("div", { className: "cms:mt-2", children: /* @__PURE__ */ e.jsx(t.TrashHint, { count: g, onShow: () => b({ status: "trashed" }) }) })
          ] }) }),
          r.data.map((s, i) => /* @__PURE__ */ e.jsxs(t.TableRow, { className: N ? "sunrice-row-in cms:text-muted-foreground" : "sunrice-row-in", style: { "--i": i }, "data-state": f.includes(s.id) ? "selected" : void 0, children: [
            B.length > 0 && /* @__PURE__ */ e.jsx(t.TableCell, { children: /* @__PURE__ */ e.jsx(
              t.Checkbox,
              {
                "aria-label": a("Select :title", { title: s.title }),
                checked: f.includes(s.id),
                onCheckedChange: (v) => $(v ? [...f, s.id] : f.filter((I) => I !== s.id))
              }
            ) }),
            /* @__PURE__ */ e.jsxs(t.TableCell, { children: [
              /* @__PURE__ */ e.jsx(
                p.Link,
                {
                  href: w(`cms/collections/${n.handle}/entries/${s.id}/edit${l.locale !== C ? `?locale=${encodeURIComponent(l.locale)}` : ""}`),
                  className: "cms:font-medium cms:underline-offset-4 cms:hover:underline",
                  children: s.title
                }
              ),
              (!l.columns.includes("slug") && s.path || s.parent) && /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: [l.columns.includes("slug") ? null : s.path, s.parent ? a("under :parent", { parent: s.parent }) : null].filter(Boolean).join(" · ") })
            ] }),
            R.map((v) => /* @__PURE__ */ e.jsx(t.TableCell, { className: v.key === "status" ? "" : "cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx("div", { className: "cms:max-w-72 cms:truncate", children: /* @__PURE__ */ e.jsx(ls, { row: s, column: v }) }) }, v.key)),
            z && /* @__PURE__ */ e.jsx(t.TableCell, { className: "cms:w-px", children: /* @__PURE__ */ e.jsxs("span", { className: "cms:flex", children: [
              /* @__PURE__ */ e.jsx(t.Button, { variant: "ghost", size: "icon", "aria-label": a("Move :title up", { title: s.title }), onClick: () => p.router.post(w(`cms/entries/${s.id}/move`), { direction: "up" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(ge, {}) }),
              /* @__PURE__ */ e.jsx(t.Button, { variant: "ghost", size: "icon", "aria-label": a("Move :title down", { title: s.title }), onClick: () => p.router.post(w(`cms/entries/${s.id}/move`), { direction: "down" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(me, {}) }),
              /* @__PURE__ */ e.jsx(be, { title: s.title, ...n.hierarchical ? {} : { position: (r.from ?? 1) + i, count: r.total }, onMove: (v) => _e(s, v) })
            ] }) }),
            H && /* @__PURE__ */ e.jsx(t.TableCell, { className: "cms:w-px", children: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:justify-end cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs(
                t.Button,
                {
                  variant: "outline",
                  size: "sm",
                  "aria-label": a("Restore :title", { title: s.title }),
                  onClick: () => p.router.post(w(`cms/entries/${s.id}/restore`), {}, { preserveScroll: !0 }),
                  children: [
                    /* @__PURE__ */ e.jsx(Ve, {}),
                    " ",
                    a("Restore")
                  ]
                }
              ),
              /* @__PURE__ */ e.jsxs(
                t.Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "cms:text-destructive cms:hover:text-destructive",
                  "aria-label": a("Permanently delete :title", { title: s.title }),
                  onClick: () => W(
                    a("Permanently delete :title? This can't be undone.", { title: s.title }),
                    () => p.router.post(`${u}/bulk`, { action: "delete", ids: [s.id] }, { preserveScroll: !0 }),
                    a("Delete")
                  ),
                  children: [
                    /* @__PURE__ */ e.jsx(Be, {}),
                    " ",
                    a("Permanently delete")
                  ]
                }
              )
            ] }) })
          ] }, s.id))
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4 cms:border-t cms:px-6 cms:py-3 cms:text-sm cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-4", children: [
          /* @__PURE__ */ e.jsx("span", { children: r.total === 0 ? a("No entries") : a(":from–:to of :total", { from: r.from, to: r.to, total: r.total }) }),
          /* @__PURE__ */ e.jsxs(t.Select, { value: String(l.perPage), onValueChange: (s) => {
            Se(Number(s)), b({ perPage: Number(s) });
          }, children: [
            /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:h-8 cms:w-auto", "aria-label": a("Entries per page"), children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(t.SelectContent, { children: k.map((s) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: String(s), children: a(":count per page", { count: s }) }, s)) })
          ] })
        ] }),
        r.lastPage > 1 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsx("span", { children: a("Page :page of :last", { page: r.currentPage, last: r.lastPage }) }),
          /* @__PURE__ */ e.jsx(
            t.Button,
            {
              variant: "outline",
              size: "icon",
              className: "cms:size-8",
              "aria-label": a("Previous page"),
              disabled: !r.prev_page_url,
              onClick: () => r.prev_page_url && p.router.get(r.prev_page_url, {}, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(Oe, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            t.Button,
            {
              variant: "outline",
              size: "icon",
              className: "cms:size-8",
              "aria-label": a("Next page"),
              disabled: !r.next_page_url,
              onClick: () => r.next_page_url && p.router.get(r.next_page_url, {}, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(Ue, {})
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function U({ id: n, label: c, value: r, options: l, onChange: d, wide: o = !1 }) {
  return /* @__PURE__ */ e.jsxs(t.Select, { value: r === "" ? O : r, onValueChange: (h) => d(h === O ? "" : h), children: [
    /* @__PURE__ */ e.jsx(t.SelectTrigger, { id: n, className: o ? "cms:w-full" : "cms:w-auto cms:min-w-40 cms:max-w-72", title: c, "aria-label": c, children: /* @__PURE__ */ e.jsx(t.SelectValue, { placeholder: c }) }),
    /* @__PURE__ */ e.jsxs(t.SelectContent, { children: [
      /* @__PURE__ */ e.jsx(t.SelectItem, { value: O, children: a(":filter: all", { filter: c }) }),
      l.map((h) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: h.value, children: h.label }, h.value))
    ] })
  ] });
}
function ne({ label: n, sortKey: c, sort: r, onSort: l }) {
  const d = qe(r, c);
  return /* @__PURE__ */ e.jsx(t.TableHead, { "aria-sort": d === "asc" ? "ascending" : d === "desc" ? "descending" : void 0, children: /* @__PURE__ */ e.jsxs(
    "button",
    {
      type: "button",
      onClick: () => l(Ze(r, c)),
      className: "cms:-ml-2 cms:inline-flex cms:h-8 cms:items-center cms:gap-1 cms:rounded-md cms:px-2 cms:hover:bg-accent cms:hover:text-accent-foreground",
      children: [
        n,
        d === "asc" ? /* @__PURE__ */ e.jsx(ge, { className: "cms:size-3" }) : d === "desc" ? /* @__PURE__ */ e.jsx(me, { className: "cms:size-3" }) : /* @__PURE__ */ e.jsx(he, { className: "cms:size-3 cms:opacity-40" })
      ]
    }
  ) });
}
function ls({ row: n, column: c }) {
  switch (c.key) {
    case "slug":
      return /* @__PURE__ */ e.jsx("span", { className: "cms:font-mono", children: n.slug });
    case "status":
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-1", children: [
        n.trashed ? /* @__PURE__ */ e.jsx(t.Badge, { variant: "outline", className: "cms:text-destructive", title: a(":status before it was trashed", { status: X(n.status) }), children: a("Trashed") }) : /* @__PURE__ */ e.jsx(re, { status: n.status, changes: n.changes }),
        n.locales.length > 1 && n.locales.filter((r) => !r.main).map((r) => {
          const l = ns(r);
          return /* @__PURE__ */ e.jsxs(
            t.Badge,
            {
              variant: l.variant,
              className: l.className,
              title: a(":language: :status", { language: Q(r.code), status: l.title }),
              "aria-label": a(":language: :status", { language: Q(r.code), status: l.title }),
              children: [
                r.code.toUpperCase(),
                l.word && /* @__PURE__ */ e.jsx("span", { className: "cms:font-normal", children: l.word })
              ]
            },
            r.code
          );
        })
      ] });
    case "author":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: n.author ?? "—" });
    case "published_at":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: A(n.publishedAt) });
    case "updated_at":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: A(n.updatedAt) });
    case "created_at":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: A(n.createdAt) });
    default:
      return /* @__PURE__ */ e.jsx("span", { title: n.cells[c.key] ?? void 0, children: n.cells[c.key] ?? "—" });
  }
}
function ns(n) {
  return n.status === null ? { variant: "outline", className: "cms:border-dashed cms:text-muted-foreground", word: a("missing"), title: a("not translated") } : n.outdated ? { variant: "warning", className: "", word: a("outdated"), title: a(":status, outdated: the main language changed since", { status: X(n.status) }) } : n.status === "published" ? { variant: "secondary", className: "", word: null, title: a("Live") } : { variant: "outline", className: "", word: n.status === "scheduled" ? a("scheduled") : a("draft"), title: X(n.status) };
}
function rs({ trashed: n, filtered: c, canCreate: r, createUrl: l, onClear: d }) {
  return c ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: a("Nothing matches these filters.") }),
    /* @__PURE__ */ e.jsxs(t.Button, { variant: "outline", size: "sm", onClick: d, children: [
      /* @__PURE__ */ e.jsx(ce, {}),
      " ",
      a("Clear filters")
    ] })
  ] }) : n ? /* @__PURE__ */ e.jsx(e.Fragment, { children: a("The trash is empty.") }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: a("No entries yet.") }),
    r && /* @__PURE__ */ e.jsx(t.Button, { size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs(p.Link, { href: l, children: [
      /* @__PURE__ */ e.jsx(oe, {}),
      " ",
      a("Write the first one")
    ] }) })
  ] });
}
export {
  bs as default
};
