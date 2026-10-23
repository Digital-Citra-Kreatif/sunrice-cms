import { j as e, t as a, s as T, r as m, a as S, l as V, f as R } from "./admin-D8w3Ih7q.js";
import { c as D, _ as b } from "./createLucideIcon-Ccbp7F45.js";
import { u as he } from "./Confirm-D-4qtSiN.js";
import { u as t } from "./ui-Dh5wfMwT.js";
import { t as xe, c as E, r as pe } from "./tree-B7sRX6dH.js";
import { D as ge } from "./download-DA5N5mq4.js";
import { P as J } from "./plus-COqahUZ2.js";
import { S as je } from "./search-3zKi7F1_.js";
import { X as Y } from "./x-CB4QIx1-.js";
import { R as fe } from "./rotate-ccw-BcgdCn0y.js";
import { T as ve } from "./trash-DHN6ewjn.js";
import { C as be } from "./chevron-left-usCQl1qw.js";
import { C as Ce } from "./chevron-right-9qVV6b-Q.js";
const Z = {
  name: "arrow-down",
  size: 24,
  node: [
    ["path", { d: "M12 5v14", key: "s699le" }],
    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
  ]
};
Z.node;
const q = D(Z);
const ee = {
  name: "arrow-up-down",
  size: 24,
  node: [
    ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
    ["path", { d: "M17 20V4", key: "1ejh1v" }],
    ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
    ["path", { d: "M7 4v16", key: "1glfcx" }]
  ]
};
ee.node;
const se = D(ee);
const te = {
  name: "arrow-up",
  size: 24,
  node: [
    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
    ["path", { d: "M12 19V5", key: "x0mq9r" }]
  ]
};
te.node;
const ae = D(te);
const le = {
  name: "columns-3",
  size: 24,
  node: [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M9 3v18", key: "fh3hqa" }],
    ["path", { d: "M15 3v18", key: "14nvp0" }]
  ],
  aliases: ["panels-left-right"]
};
le.node;
const Se = D(le);
function Ne({ collection: r, rows: c, hierarchical: n = !1 }) {
  const l = b.useCallback(
    (x) => xe(x, (u) => n ? u.parentId : null),
    [n]
  ), [i, d] = b.useState(() => l(c));
  b.useEffect(() => d(l(c)), [c, l]);
  const N = (x, u) => {
    const C = pe(i, x, u), h = E(C, x).map((v) => C[v].id);
    d(C), m.router.post(
      S("cms/entries/reorder"),
      { collection: r, ids: h, parent_id: x < 0 ? null : i[x]?.id ?? null },
      { preserveScroll: !0, preserveState: !0, onError: () => d(l(c)) }
    );
  }, y = (x) => /* @__PURE__ */ e.jsx(
    t.SortableList,
    {
      items: E(i, x),
      getId: (u) => i[u].id,
      getLabel: (u) => i[u].title,
      onReorder: (u) => N(x, u),
      className: x < 0 ? "cms:gap-1" : "cms:mt-1 cms:gap-1 cms:pl-6",
      children: (u, { handle: C }) => {
        const h = i[u];
        return /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-lg cms:border cms:border-border/70 cms:bg-card cms:p-2 cms:text-sm", children: [
            /* @__PURE__ */ e.jsx(t.SortableHandle, { ...C, label: a("Move :title", { title: h.title }) }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium", children: h.title }),
            /* @__PURE__ */ e.jsx(t.Badge, { variant: h.status === "published" ? "success" : "secondary", children: T(h.status) })
          ] }),
          E(i, u).length > 0 && y(u)
        ] });
      }
    }
  );
  return /* @__PURE__ */ e.jsxs(t.Card, { className: "cms:p-2", children: [
    n && /* @__PURE__ */ e.jsx("p", { className: "cms:px-1 cms:pb-1 cms:text-xs cms:text-muted-foreground", children: a("Entries move among those at their level, with what's under them. To put one under another, choose its Parent in its Page settings.") }),
    y(-1)
  ] });
}
function ke(r, c, n) {
  const l = { ...r, ...c }, i = Object.fromEntries(Object.entries(l.terms).filter(([, N]) => N !== "")), d = {};
  return l.search && (d.search = l.search), l.status && (d.status = l.status), l.author && (d.author = l.author), Object.keys(i).length > 0 && (d.terms = i), l.locale && l.locale !== n && (d.locale = l.locale), l.sort && (d.sort = l.sort), d.per_page = l.perPage, d;
}
function we(r) {
  const c = new URLSearchParams();
  for (const [n, l] of Object.entries(r))
    if (typeof l == "object")
      for (const [i, d] of Object.entries(l)) c.set(`${n}[${i}]`, d);
    else
      c.set(n, String(l));
  return c.toString();
}
function Te(r, c) {
  return r === c ? `-${c}` : r === `-${c}` ? "" : c;
}
function ye(r, c) {
  return r === c ? "asc" : r === `-${c}` ? "desc" : null;
}
function X(r) {
  return [r.search, r.status, r.author, ...Object.values(r.terms)].filter((c) => c !== "").length;
}
const I = "__all", _e = () => [
  { value: "draft", label: a("Drafts") },
  { value: "published", label: a("Published") },
  { value: "scheduled", label: a("Scheduled") },
  { value: "trashed", label: a("Trash") }
];
function Ke(r) {
  const { collection: c, entries: n, query: l } = r;
  return t.useBreadcrumbs([{ label: c ? c.title : a("Entries") }]), !c || !n || !l ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(m.Head, { title: a("Entries") }),
    /* @__PURE__ */ e.jsx(t.PageHeader, { title: a("Entries"), description: a("There are no collections yet. Create one under Structure → Collections, then come back to write its entries.") })
  ] }) : /* @__PURE__ */ e.jsx($e, { ...r, collection: c, entries: n, query: l });
}
function $e({
  collection: r,
  collections: c,
  entries: n,
  query: l,
  columns: i = [],
  filters: d = { authors: [], taxonomies: [], locales: [] },
  links: N = [],
  manualOrder: y = !1,
  perPageOptions: x = [10, 25, 50, 100],
  preferencesKey: u,
  trashedCount: C = 0,
  can: h
}) {
  const v = S(`cms/collections/${r.handle}/entries`), B = d.locales[0] ?? l.locale, [_, F] = b.useState(l.search), [j, z] = b.useState([]), [k, re] = b.useState(!1), [A, ne] = he(), { setColumns: ce, setPerPage: ie } = t.useTablePreferences(u ?? `table.cms.entries.${r.handle}`, { columns: l.columns, perPage: l.perPage });
  b.useEffect(() => z([]), [n]);
  const f = l.status === "trashed", oe = X(l) > 0, L = i.filter((s) => l.columns.includes(s.key)), O = (s = {}) => ke(l, s, B), p = (s) => m.router.get(v, O(s), { preserveState: !0, preserveScroll: !0, replace: !0 });
  b.useEffect(() => {
    if (_ === l.search) return;
    const s = window.setTimeout(() => p({ search: _ }), 300);
    return () => window.clearTimeout(s);
  }, [_]);
  const w = f ? h?.delete ? [{ action: "restore", label: a("Restore") }, { action: "delete", label: a("Permanently delete"), danger: !0 }] : [] : [
    ...h?.publish ? [{ action: "publish", label: a("Publish") }, { action: "unpublish", label: a("Unpublish") }] : [],
    ...h?.delete ? [{ action: "trash", label: a("Move to the trash"), danger: !0 }] : []
  ], de = (s, o, g = !1) => {
    const P = () => m.router.post(`${v}/bulk`, { action: s, ids: j }, { preserveScroll: !0 });
    if (g) {
      const ue = j.length === 1 ? a(":action: 1 entry?", { action: o }) : a(":action: :count entries?", { action: o, count: j.length });
      A(
        `${ue} ${s === "delete" ? a("This can't be undone.") : a("They come off the site; you can restore them.")}`,
        P,
        s === "trash" ? a("Move to trash") : a("Delete")
      );
    } else
      P();
  }, U = async (s) => {
    const o = new Set(l.columns);
    o.has(s) ? o.delete(s) : o.add(s), await ce(i.map((g) => g.key).filter((g) => o.has(g))), m.router.reload({ only: ["entries", "query"] });
  }, Q = () => {
    F(""), p({ search: "", status: "", author: "", terms: {} });
  }, $ = y && !!h?.update, K = $ && n !== null && n.lastPage <= 1 && n.data.length > 1, M = f && !!h?.delete, me = 1 + L.length + (w.length > 0 ? 1 : 0) + ($ ? 1 : 0) + (M ? 1 : 0), W = we(O());
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(m.Head, { title: r.title }),
    ne,
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: f ? /* @__PURE__ */ e.jsx(t.TrashTitle, { children: r.title }) : r.title,
        primary: h?.create && !f && /* @__PURE__ */ e.jsx(t.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(m.Link, { href: `${v}/create`, children: [
          /* @__PURE__ */ e.jsx(J, {}),
          " ",
          a("New entry")
        ] }) }),
        menu: [
          ...n.total > 0 && h?.export ? [{ label: a("Export CSV"), href: `${v}/export${W ? `?${W}` : ""}`, download: !0, icon: /* @__PURE__ */ e.jsx(ge, {}) }] : [],
          ...N.map((s) => ({ label: s.label, href: s.href, external: s.external, group: s.group }))
        ],
        children: c.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: r.handle, onValueChange: (s) => m.router.get(S(`cms/collections/${s}/entries`)), children: [
          /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": a("Collection"), children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(t.SelectContent, { children: c.map((s) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: s.handle, children: s.title }, s.handle)) })
        ] })
      }
    ),
    f && /* @__PURE__ */ e.jsx(t.TrashBanner, { items: a("entries"), onBack: () => p({ status: "" }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-xs", children: [
        /* @__PURE__ */ e.jsx(je, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          t.Input,
          {
            className: "cms:pl-9",
            placeholder: a("Search titles, slugs or #id"),
            "aria-label": a("Search entries"),
            value: _,
            onChange: (s) => F(s.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(H, { label: a("Status"), value: l.status, options: _e(), onChange: (s) => p({ status: s }) }),
      d.authors.length > 0 && /* @__PURE__ */ e.jsx(H, { label: a("Author"), value: l.author, options: d.authors, onChange: (s) => p({ author: s }) }),
      d.taxonomies.filter((s) => s.terms.length > 0).map((s) => /* @__PURE__ */ e.jsx(
        H,
        {
          label: s.title,
          value: l.terms[s.handle] ?? "",
          options: s.terms.map((o) => ({ value: o.value, label: `${"— ".repeat(o.depth)}${o.label}` })),
          onChange: (o) => p({ terms: { ...l.terms, [s.handle]: o } })
        },
        s.handle
      )),
      d.locales.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: l.locale, onValueChange: (s) => p({ locale: s }), children: [
        /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-auto cms:min-w-40 cms:max-w-72", "aria-label": a("Language"), children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(t.SelectContent, { children: d.locales.map((s) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: s, children: [
          V(s),
          s === B ? ` ${a("(main)")}` : ""
        ] }, s)) })
      ] }),
      oe && /* @__PURE__ */ e.jsxs(t.Button, { variant: "ghost", size: "sm", onClick: Q, children: [
        /* @__PURE__ */ e.jsx(Y, {}),
        " ",
        a("Clear")
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:ml-auto cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
        j.length > 0 && w.length > 0 && /* @__PURE__ */ e.jsxs("div", { role: "toolbar", "aria-label": a("Selected entries"), className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: a(":count selected", { count: j.length }) }),
          w.map((s) => /* @__PURE__ */ e.jsx(t.Button, { size: "sm", variant: s.danger ? "destructive" : "outline", onClick: () => de(s.action, s.label, s.danger), children: s.label }, s.action))
        ] }),
        K && /* @__PURE__ */ e.jsxs(t.Button, { variant: k ? "secondary" : "outline", "aria-pressed": k, onClick: () => re(!k), children: [
          /* @__PURE__ */ e.jsx(se, {}),
          " ",
          k ? a("Done") : a("Reorder")
        ] }),
        i.length > 0 && /* @__PURE__ */ e.jsxs(t.DropdownMenu, { children: [
          /* @__PURE__ */ e.jsx(t.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(t.Button, { variant: "outline", children: [
            /* @__PURE__ */ e.jsx(Se, {}),
            " ",
            a("Columns")
          ] }) }),
          /* @__PURE__ */ e.jsxs(t.DropdownMenuContent, { align: "end", className: "cms:max-h-96 cms:overflow-y-auto", children: [
            /* @__PURE__ */ e.jsx(t.DropdownMenuLabel, { children: a("Columns") }),
            i.filter((s) => !s.field).map((s) => /* @__PURE__ */ e.jsx(
              t.DropdownMenuCheckboxItem,
              {
                checked: l.columns.includes(s.key),
                onSelect: (o) => o.preventDefault(),
                onCheckedChange: () => {
                  U(s.key);
                },
                children: s.label
              },
              s.key
            )),
            i.some((s) => s.field) && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsx(t.DropdownMenuSeparator, {}),
              /* @__PURE__ */ e.jsx(t.DropdownMenuLabel, { children: a("Fields") }),
              i.filter((s) => s.field).map((s) => /* @__PURE__ */ e.jsx(
                t.DropdownMenuCheckboxItem,
                {
                  checked: l.columns.includes(s.key),
                  onSelect: (o) => o.preventDefault(),
                  onCheckedChange: () => {
                    U(s.key);
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
    k && K ? /* @__PURE__ */ e.jsx(Ne, { collection: r.handle, rows: n.data, hierarchical: r.hierarchical === !0 }) : /* @__PURE__ */ e.jsxs(t.Card, { className: "cms:gap-0 cms:overflow-hidden cms:py-0", children: [
      /* @__PURE__ */ e.jsxs(t.Table, { children: [
        /* @__PURE__ */ e.jsx(t.TableHeader, { className: "cms:bg-muted/60", children: /* @__PURE__ */ e.jsxs(t.TableRow, { className: "cms:hover:bg-transparent", children: [
          w.length > 0 && /* @__PURE__ */ e.jsx(t.TableHead, { className: "cms:w-10", children: /* @__PURE__ */ e.jsx(
            t.Checkbox,
            {
              "aria-label": a("Select all on this page"),
              checked: n.data.length > 0 && j.length === n.data.length,
              onCheckedChange: (s) => z(s ? n.data.map((o) => o.id) : [])
            }
          ) }),
          /* @__PURE__ */ e.jsx(G, { label: a("Title"), sortKey: "title", sort: l.sort, onSort: (s) => p({ sort: s }) }),
          L.map((s) => s.sortable ? /* @__PURE__ */ e.jsx(G, { label: s.label, sortKey: s.key, sort: l.sort, onSort: (o) => p({ sort: o }) }, s.key) : /* @__PURE__ */ e.jsx(t.TableHead, { children: s.label }, s.key)),
          $ && /* @__PURE__ */ e.jsx(t.TableHead, { className: "cms:w-px", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: a("Order") }) }),
          M && /* @__PURE__ */ e.jsx(t.TableHead, { className: "cms:w-px", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: a("Restore") }) })
        ] }) }),
        /* @__PURE__ */ e.jsxs(t.TableBody, { children: [
          n.data.length === 0 && /* @__PURE__ */ e.jsx(t.TableRow, { className: "cms:hover:bg-transparent", children: /* @__PURE__ */ e.jsxs(t.TableCell, { colSpan: me, className: "cms:h-32 cms:text-center cms:text-muted-foreground", children: [
            /* @__PURE__ */ e.jsx(Be, { trashed: f, filtered: X(f ? { ...l, status: "" } : l) > 0, canCreate: !!h?.create, createUrl: `${v}/create`, onClear: Q }),
            !f && /* @__PURE__ */ e.jsx("div", { className: "cms:mt-2", children: /* @__PURE__ */ e.jsx(t.TrashHint, { count: C, onShow: () => p({ status: "trashed" }) }) })
          ] }) }),
          n.data.map((s, o) => /* @__PURE__ */ e.jsxs(t.TableRow, { className: f ? "sunrice-row-in cms:text-muted-foreground" : "sunrice-row-in", style: { "--i": o }, "data-state": j.includes(s.id) ? "selected" : void 0, children: [
            w.length > 0 && /* @__PURE__ */ e.jsx(t.TableCell, { children: /* @__PURE__ */ e.jsx(
              t.Checkbox,
              {
                "aria-label": a("Select :title", { title: s.title }),
                checked: j.includes(s.id),
                onCheckedChange: (g) => z(g ? [...j, s.id] : j.filter((P) => P !== s.id))
              }
            ) }),
            /* @__PURE__ */ e.jsxs(t.TableCell, { children: [
              /* @__PURE__ */ e.jsx(
                m.Link,
                {
                  href: S(`cms/collections/${r.handle}/entries/${s.id}/edit${l.locale !== B ? `?locale=${encodeURIComponent(l.locale)}` : ""}`),
                  className: "cms:font-medium cms:underline-offset-4 cms:hover:underline",
                  children: s.title
                }
              ),
              (!l.columns.includes("slug") && s.path || s.parent) && /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: [l.columns.includes("slug") ? null : s.path, s.parent ? a("under :parent", { parent: s.parent }) : null].filter(Boolean).join(" · ") })
            ] }),
            L.map((g) => /* @__PURE__ */ e.jsx(t.TableCell, { className: g.key === "status" ? "" : "cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx("div", { className: "cms:max-w-72 cms:truncate", children: /* @__PURE__ */ e.jsx(Pe, { row: s, column: g }) }) }, g.key)),
            $ && /* @__PURE__ */ e.jsx(t.TableCell, { className: "cms:w-px", children: /* @__PURE__ */ e.jsxs("span", { className: "cms:flex", children: [
              /* @__PURE__ */ e.jsx(t.Button, { variant: "ghost", size: "icon", "aria-label": a("Move :title up", { title: s.title }), onClick: () => m.router.post(S(`cms/entries/${s.id}/move`), { direction: "up" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(ae, {}) }),
              /* @__PURE__ */ e.jsx(t.Button, { variant: "ghost", size: "icon", "aria-label": a("Move :title down", { title: s.title }), onClick: () => m.router.post(S(`cms/entries/${s.id}/move`), { direction: "down" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(q, {}) })
            ] }) }),
            M && /* @__PURE__ */ e.jsx(t.TableCell, { className: "cms:w-px", children: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:justify-end cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs(
                t.Button,
                {
                  variant: "outline",
                  size: "sm",
                  "aria-label": a("Restore :title", { title: s.title }),
                  onClick: () => m.router.post(S(`cms/entries/${s.id}/restore`), {}, { preserveScroll: !0 }),
                  children: [
                    /* @__PURE__ */ e.jsx(fe, {}),
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
                  onClick: () => A(
                    a("Permanently delete :title? This can't be undone.", { title: s.title }),
                    () => m.router.post(`${v}/bulk`, { action: "delete", ids: [s.id] }, { preserveScroll: !0 }),
                    a("Delete")
                  ),
                  children: [
                    /* @__PURE__ */ e.jsx(ve, {}),
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
          /* @__PURE__ */ e.jsx("span", { children: n.total === 0 ? a("No entries") : a(":from–:to of :total", { from: n.from, to: n.to, total: n.total }) }),
          /* @__PURE__ */ e.jsxs(t.Select, { value: String(l.perPage), onValueChange: (s) => {
            ie(Number(s)), p({ perPage: Number(s) });
          }, children: [
            /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:h-8 cms:w-auto", "aria-label": a("Entries per page"), children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(t.SelectContent, { children: x.map((s) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: String(s), children: a(":count per page", { count: s }) }, s)) })
          ] })
        ] }),
        n.lastPage > 1 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsx("span", { children: a("Page :page of :last", { page: n.currentPage, last: n.lastPage }) }),
          /* @__PURE__ */ e.jsx(
            t.Button,
            {
              variant: "outline",
              size: "icon",
              className: "cms:size-8",
              "aria-label": a("Previous page"),
              disabled: !n.prev_page_url,
              onClick: () => n.prev_page_url && m.router.get(n.prev_page_url, {}, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(be, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            t.Button,
            {
              variant: "outline",
              size: "icon",
              className: "cms:size-8",
              "aria-label": a("Next page"),
              disabled: !n.next_page_url,
              onClick: () => n.next_page_url && m.router.get(n.next_page_url, {}, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(Ce, {})
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function H({ label: r, value: c, options: n, onChange: l }) {
  return /* @__PURE__ */ e.jsxs(t.Select, { value: c === "" ? I : c, onValueChange: (i) => l(i === I ? "" : i), children: [
    /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-auto cms:min-w-40 cms:max-w-72", title: r, "aria-label": r, children: /* @__PURE__ */ e.jsx(t.SelectValue, { placeholder: r }) }),
    /* @__PURE__ */ e.jsxs(t.SelectContent, { children: [
      /* @__PURE__ */ e.jsx(t.SelectItem, { value: I, children: a(":filter: all", { filter: r }) }),
      n.map((i) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: i.value, children: i.label }, i.value))
    ] })
  ] });
}
function G({ label: r, sortKey: c, sort: n, onSort: l }) {
  const i = ye(n, c);
  return /* @__PURE__ */ e.jsx(t.TableHead, { "aria-sort": i === "asc" ? "ascending" : i === "desc" ? "descending" : void 0, children: /* @__PURE__ */ e.jsxs(
    "button",
    {
      type: "button",
      onClick: () => l(Te(n, c)),
      className: "cms:-ml-2 cms:inline-flex cms:h-8 cms:items-center cms:gap-1 cms:rounded-md cms:px-2 cms:hover:bg-accent cms:hover:text-accent-foreground",
      children: [
        r,
        i === "asc" ? /* @__PURE__ */ e.jsx(ae, { className: "cms:size-3" }) : i === "desc" ? /* @__PURE__ */ e.jsx(q, { className: "cms:size-3" }) : /* @__PURE__ */ e.jsx(se, { className: "cms:size-3 cms:opacity-40" })
      ]
    }
  ) });
}
function Pe({ row: r, column: c }) {
  switch (c.key) {
    case "slug":
      return /* @__PURE__ */ e.jsx("span", { className: "cms:font-mono", children: r.slug });
    case "status":
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-1", children: [
        r.trashed ? /* @__PURE__ */ e.jsx(t.Badge, { variant: "outline", className: "cms:text-destructive", title: a(":status before it was trashed", { status: T(r.status) }), children: a("Trashed") }) : /* @__PURE__ */ e.jsx(t.Badge, { variant: r.status === "published" ? "success" : "secondary", children: T(r.status) }),
        r.locales.length > 1 && r.locales.filter((n) => !n.main).map((n) => {
          const l = De(n);
          return /* @__PURE__ */ e.jsxs(
            t.Badge,
            {
              variant: l.variant,
              className: l.className,
              title: a(":language: :status", { language: V(n.code), status: l.title }),
              "aria-label": a(":language: :status", { language: V(n.code), status: l.title }),
              children: [
                n.code.toUpperCase(),
                l.word && /* @__PURE__ */ e.jsx("span", { className: "cms:font-normal", children: l.word })
              ]
            },
            n.code
          );
        })
      ] });
    case "author":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: r.author ?? "—" });
    case "published_at":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: R(r.publishedAt) });
    case "updated_at":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: R(r.updatedAt) });
    case "created_at":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: R(r.createdAt) });
    default:
      return /* @__PURE__ */ e.jsx("span", { title: r.cells[c.key] ?? void 0, children: r.cells[c.key] ?? "—" });
  }
}
function De(r) {
  return r.status === null ? { variant: "outline", className: "cms:border-dashed cms:text-muted-foreground", word: a("missing"), title: a("not translated") } : r.outdated ? { variant: "warning", className: "", word: a("outdated"), title: a(":status, outdated: the main language changed since", { status: T(r.status) }) } : r.status === "published" ? { variant: "secondary", className: "", word: null, title: a("Published") } : { variant: "outline", className: "", word: r.status === "scheduled" ? a("scheduled") : a("draft"), title: T(r.status) };
}
function Be({ trashed: r, filtered: c, canCreate: n, createUrl: l, onClear: i }) {
  return c ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: a("Nothing matches these filters.") }),
    /* @__PURE__ */ e.jsxs(t.Button, { variant: "outline", size: "sm", onClick: i, children: [
      /* @__PURE__ */ e.jsx(Y, {}),
      " ",
      a("Clear filters")
    ] })
  ] }) : r ? /* @__PURE__ */ e.jsx(e.Fragment, { children: a("The trash is empty.") }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: a("No entries yet.") }),
    n && /* @__PURE__ */ e.jsx(t.Button, { size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs(m.Link, { href: l, children: [
      /* @__PURE__ */ e.jsx(J, {}),
      " ",
      a("Write the first one")
    ] }) })
  ] });
}
export {
  Ke as default
};
