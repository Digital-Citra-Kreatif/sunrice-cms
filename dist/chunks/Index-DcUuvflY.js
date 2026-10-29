import { j as e, t as a, r as m, a as S, l as V, f as E, s as A } from "./admin-BtPpLgsG.js";
import { c as y, _ as v } from "./createLucideIcon-Ccbp7F45.js";
import { u as Ce, T as Ne } from "./Confirm-CRYwBsnU.js";
import { u as t } from "./ui-Dh5wfMwT.js";
import { E as ee, T as Se, X as se } from "./TermsPicker-BWZIfyFK.js";
import { t as ke, c as I, r as we } from "./tree-B7sRX6dH.js";
import { D as Te } from "./download-DA5N5mq4.js";
import { P as te } from "./plus-COqahUZ2.js";
import { S as ye } from "./search-3zKi7F1_.js";
import { R as $e } from "./rotate-ccw-BcgdCn0y.js";
import { C as _e } from "./chevron-left-usCQl1qw.js";
import { C as Pe } from "./chevron-right-9qVV6b-Q.js";
const ae = {
  name: "arrow-down",
  size: 24,
  node: [
    ["path", { d: "M12 5v14", key: "s699le" }],
    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
  ]
};
ae.node;
const le = y(ae);
const ne = {
  name: "arrow-up-down",
  size: 24,
  node: [
    ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
    ["path", { d: "M17 20V4", key: "1ejh1v" }],
    ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
    ["path", { d: "M7 4v16", key: "1glfcx" }]
  ]
};
ne.node;
const re = y(ne);
const ce = {
  name: "arrow-up",
  size: 24,
  node: [
    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
    ["path", { d: "M12 19V5", key: "x0mq9r" }]
  ]
};
ce.node;
const ie = y(ce);
const oe = {
  name: "columns-3",
  size: 24,
  node: [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M9 3v18", key: "fh3hqa" }],
    ["path", { d: "M15 3v18", key: "14nvp0" }]
  ],
  aliases: ["panels-left-right"]
};
oe.node;
const De = y(oe);
const de = {
  name: "list-filter",
  size: 24,
  node: [
    ["path", { d: "M2 5h20", key: "1fs1ex" }],
    ["path", { d: "M6 12h12", key: "8npq4p" }],
    ["path", { d: "M9 19h6", key: "456am0" }]
  ]
};
de.node;
const Le = y(de);
function Be({ collection: n, rows: c, hierarchical: r = !1 }) {
  const l = v.useCallback(
    (p) => ke(p, (u) => r ? u.parentId : null),
    [r]
  ), [i, d] = v.useState(() => l(c));
  v.useEffect(() => d(l(c)), [c, l]);
  const x = (p, u) => {
    const N = we(i, p, u), h = I(N, p).map((C) => N[C].id);
    d(N), m.router.post(
      S("cms/entries/reorder"),
      { collection: n, ids: h, parent_id: p < 0 ? null : i[p]?.id ?? null },
      { preserveScroll: !0, preserveState: !0, onError: () => d(l(c)) }
    );
  }, $ = (p) => /* @__PURE__ */ e.jsx(
    t.SortableList,
    {
      items: I(i, p),
      getId: (u) => i[u].id,
      getLabel: (u) => i[u].title,
      onReorder: (u) => x(p, u),
      className: p < 0 ? "cms:gap-1" : "cms:mt-1 cms:gap-1 cms:pl-6",
      children: (u, { handle: N }) => {
        const h = i[u];
        return /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-lg cms:border cms:border-border/70 cms:bg-card cms:p-2 cms:text-sm", children: [
            /* @__PURE__ */ e.jsx(t.SortableHandle, { ...N, label: a("Move :title", { title: h.title }) }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium", children: h.title }),
            /* @__PURE__ */ e.jsx(ee, { status: h.status, changes: h.changes })
          ] }),
          I(i, u).length > 0 && $(u)
        ] });
      }
    }
  );
  return /* @__PURE__ */ e.jsxs(t.Card, { className: "cms:p-2", children: [
    r && /* @__PURE__ */ e.jsx("p", { className: "cms:px-1 cms:pb-1 cms:text-xs cms:text-muted-foreground", children: a("Entries move among those at their level, with what's under them. To put one under another, choose its Parent in its Page settings.") }),
    $(-1)
  ] });
}
function Y(n, c, r) {
  const l = { ...n, ...c }, i = Object.fromEntries(Object.entries(l.terms).filter(([, x]) => x !== "")), d = {};
  return l.search && (d.search = l.search), l.status && (d.status = l.status), l.author && (d.author = l.author), Object.keys(i).length > 0 && (d.terms = i), l.locale && l.locale !== r && (d.locale = l.locale), l.sort && (d.sort = l.sort), d.per_page = l.perPage, d;
}
function Me(n) {
  const c = new URLSearchParams();
  for (const [r, l] of Object.entries(n))
    if (typeof l == "object")
      for (const [i, d] of Object.entries(l)) c.set(`${r}[${i}]`, d);
    else
      c.set(r, String(l));
  return c.toString();
}
function ze(n, c) {
  return n === c ? `-${c}` : n === `-${c}` ? "" : c;
}
function Re(n, c) {
  return n === c ? "asc" : n === `-${c}` ? "desc" : null;
}
function Z(n) {
  return [n.search, n.status, n.author, ...Object.values(n.terms)].filter((c) => c !== "").length;
}
const Ee = 2;
function Ie(n, c) {
  return [n.author, ...c.map((r) => n.terms[r] ?? "")].filter((r) => r !== "").length;
}
const F = "__all", Fe = () => [
  { value: "draft", label: a("Drafts") },
  { value: "published", label: a("Live") },
  { value: "scheduled", label: a("Scheduled") },
  { value: "trashed", label: a("Trash") }
];
function ts(n) {
  const { collection: c, entries: r, query: l } = n;
  return t.useBreadcrumbs([{ label: c ? c.title : a("Entries") }]), !c || !r || !l ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(m.Head, { title: a("Entries") }),
    /* @__PURE__ */ e.jsx(t.PageHeader, { title: a("Entries"), description: a("There are no collections yet. Create one under Structure → Collections, then come back to write its entries.") })
  ] }) : /* @__PURE__ */ e.jsx(He, { ...n, collection: c, entries: r, query: l });
}
function He({
  collection: n,
  collections: c,
  entries: r,
  query: l,
  columns: i = [],
  filters: d = { authors: [], taxonomies: [], locales: [] },
  links: x = [],
  manualOrder: $ = !1,
  perPageOptions: p = [10, 25, 50, 100],
  preferencesKey: u,
  trashedCount: N = 0,
  can: h
}) {
  const C = S(`cms/collections/${n.handle}/entries`), _ = d.locales[0] ?? l.locale, [P, O] = v.useState(l.search), [f, M] = v.useState([]), [k, me] = v.useState(!1), [U, ue] = Ce(), { setColumns: he, setPerPage: xe } = t.useTablePreferences(u ?? `table.cms.entries.${n.handle}`, { columns: l.columns, perPage: l.perPage });
  v.useEffect(() => M([]), [r]);
  const b = l.status === "trashed", pe = Z(l) > 0, D = [
    ...d.authors.length > 0 ? [{ key: "author", label: a("Author"), value: l.author, options: d.authors, onChange: (s) => g({ author: s }) }] : [],
    ...d.taxonomies.filter((s) => s.terms.length > 0 || s.search).map((s) => ({
      key: `terms-${s.handle}`,
      label: s.title,
      value: l.terms[s.handle] ?? "",
      options: s.terms.map((o) => ({ value: o.value, label: `${"— ".repeat(o.depth)}${o.label}` })),
      onChange: (o) => g({ terms: { ...l.terms, [s.handle]: o } }),
      ...s.search ? { taxonomy: s.handle } : {}
    }))
  ], ge = D.length > Ee || D.some((s) => s.taxonomy), Q = Ie(l, d.taxonomies.map((s) => s.handle)), z = i.filter((s) => l.columns.includes(s.key)), w = v.useRef(l), K = v.useRef(l);
  K.current !== l && (K.current = l, w.current = l);
  const je = (s = {}) => Y(w.current, s, _), g = (s) => {
    const o = je(s);
    w.current = { ...w.current, ...s }, m.router.get(C, o, { preserveState: !0, preserveScroll: !0, replace: !0 });
  };
  v.useEffect(() => {
    if (P === w.current.search) return;
    const s = window.setTimeout(() => g({ search: P }), 300);
    return () => window.clearTimeout(s);
  }, [P]);
  const T = b ? h?.delete ? [{ action: "restore", label: a("Restore") }, { action: "delete", label: a("Permanently delete"), danger: !0 }] : [] : [
    ...h?.publish ? [{ action: "publish", label: a("Publish") }, { action: "unpublish", label: a("Unpublish") }] : [],
    ...h?.delete ? [{ action: "trash", label: a("Move to the trash"), danger: !0 }] : []
  ], fe = (s, o, j = !1) => {
    const B = () => m.router.post(`${C}/bulk`, { action: s, ids: f }, { preserveScroll: !0 });
    if (j) {
      const be = f.length === 1 ? a(":action: 1 entry?", { action: o }) : a(":action: :count entries?", { action: o, count: f.length });
      U(
        `${be} ${s === "delete" ? a("This can't be undone.") : a("They come off the site; you can restore them.")}`,
        B,
        s === "trash" ? a("Move to trash") : a("Delete")
      );
    } else
      B();
  }, W = async (s) => {
    const o = new Set(l.columns);
    o.has(s) ? o.delete(s) : o.add(s), await he(i.map((j) => j.key).filter((j) => o.has(j))), m.router.reload({ only: ["entries", "query"] });
  }, X = () => {
    O(""), g({ search: "", status: "", author: "", terms: {} });
  }, L = $ && !!h?.update, G = L && r !== null && r.lastPage <= 1 && r.data.length > 1, R = b && !!h?.delete, ve = 1 + z.length + (T.length > 0 ? 1 : 0) + (L ? 1 : 0) + (R ? 1 : 0), J = Me(Y(l, {}, _));
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(m.Head, { title: n.title }),
    ue,
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: b ? /* @__PURE__ */ e.jsx(t.TrashTitle, { children: n.title }) : n.title,
        primary: h?.create && !b && /* @__PURE__ */ e.jsx(t.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(m.Link, { href: `${C}/create`, children: [
          /* @__PURE__ */ e.jsx(te, {}),
          " ",
          a("New entry")
        ] }) }),
        menu: [
          ...r.total > 0 && h?.export ? [{ label: a("Export CSV"), href: `${C}/export${J ? `?${J}` : ""}`, download: !0, icon: /* @__PURE__ */ e.jsx(Te, {}) }] : [],
          ...x.map((s) => ({ label: s.label, href: s.href, external: s.external, group: s.group }))
        ],
        children: c.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: n.handle, onValueChange: (s) => m.router.get(S(`cms/collections/${s}/entries`)), children: [
          /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": a("Collection"), children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(t.SelectContent, { children: c.map((s) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: s.handle, children: s.title }, s.handle)) })
        ] })
      }
    ),
    b && /* @__PURE__ */ e.jsx(t.TrashBanner, { items: a("entries"), onBack: () => g({ status: "" }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:md:flex-row cms:md:items-start", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-wrap cms:items-center cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-xs", children: [
          /* @__PURE__ */ e.jsx(ye, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
          /* @__PURE__ */ e.jsx(
            t.Input,
            {
              className: "cms:pl-9",
              placeholder: a("Search titles, slugs or #id"),
              "aria-label": a("Search entries"),
              value: P,
              onChange: (s) => O(s.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx(H, { label: a("Status"), value: l.status, options: Fe(), onChange: (s) => g({ status: s }) }),
        ge ? /* @__PURE__ */ e.jsxs(t.Popover, { children: [
          /* @__PURE__ */ e.jsx(t.PopoverTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(t.Button, { variant: "outline", children: [
            /* @__PURE__ */ e.jsx(Le, {}),
            " ",
            a("Filters"),
            Q > 0 && /* @__PURE__ */ e.jsx(t.Badge, { variant: "secondary", className: "cms:ml-1 cms:px-1.5", children: Q })
          ] }) }),
          /* @__PURE__ */ e.jsx(t.PopoverContent, { align: "start", className: "cms:flex cms:w-80 cms:flex-col cms:gap-3", children: D.map((s) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
            /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `entry-filter-${s.key}`, children: s.label }),
            s.taxonomy ? /* @__PURE__ */ e.jsx(
              Se,
              {
                id: `entry-filter-${s.key}`,
                taxonomy: s.taxonomy,
                multiple: !1,
                max: null,
                required: !1,
                invalid: !1,
                placeholder: a(":filter: all", { filter: s.label }),
                value: /^\d+$/.test(s.value) ? Number(s.value) : null,
                onChange: (o) => s.onChange(typeof o == "number" ? String(o) : "")
              }
            ) : /* @__PURE__ */ e.jsx(H, { id: `entry-filter-${s.key}`, wide: !0, label: s.label, value: s.value, options: s.options, onChange: s.onChange })
          ] }, s.key)) })
        ] }) : D.map((s) => /* @__PURE__ */ e.jsx(H, { label: s.label, value: s.value, options: s.options, onChange: s.onChange }, s.key)),
        d.locales.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: l.locale, onValueChange: (s) => g({ locale: s }), children: [
          /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-auto cms:min-w-40 cms:max-w-72", "aria-label": a("Language"), children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(t.SelectContent, { children: d.locales.map((s) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: s, children: [
            V(s),
            s === _ ? ` ${a("(main)")}` : ""
          ] }, s)) })
        ] }),
        pe && /* @__PURE__ */ e.jsxs(t.Button, { variant: "ghost", size: "sm", onClick: X, children: [
          /* @__PURE__ */ e.jsx(se, {}),
          " ",
          a("Clear")
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-none cms:flex-wrap cms:items-center cms:gap-2 cms:md:ml-auto", children: [
        f.length > 0 && T.length > 0 && /* @__PURE__ */ e.jsxs("div", { role: "toolbar", "aria-label": a("Selected entries"), className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: a(":count selected", { count: f.length }) }),
          T.map((s) => /* @__PURE__ */ e.jsx(t.Button, { size: "sm", variant: s.danger ? "destructive" : "outline", onClick: () => fe(s.action, s.label, s.danger), children: s.label }, s.action))
        ] }),
        G && /* @__PURE__ */ e.jsxs(t.Button, { variant: k ? "secondary" : "outline", "aria-pressed": k, onClick: () => me(!k), children: [
          /* @__PURE__ */ e.jsx(re, {}),
          " ",
          k ? a("Done") : a("Reorder")
        ] }),
        i.length > 0 && /* @__PURE__ */ e.jsxs(t.DropdownMenu, { children: [
          /* @__PURE__ */ e.jsx(t.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(t.Button, { variant: "outline", children: [
            /* @__PURE__ */ e.jsx(De, {}),
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
                  W(s.key);
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
                    W(s.key);
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
    k && G ? /* @__PURE__ */ e.jsx(Be, { collection: n.handle, rows: r.data, hierarchical: n.hierarchical === !0 }) : /* @__PURE__ */ e.jsxs(t.Card, { className: "cms:gap-0 cms:overflow-hidden cms:py-0", children: [
      /* @__PURE__ */ e.jsxs(t.Table, { children: [
        /* @__PURE__ */ e.jsx(t.TableHeader, { className: "cms:bg-muted/60", children: /* @__PURE__ */ e.jsxs(t.TableRow, { className: "cms:hover:bg-transparent", children: [
          T.length > 0 && /* @__PURE__ */ e.jsx(t.TableHead, { className: "cms:w-10", children: /* @__PURE__ */ e.jsx(
            t.Checkbox,
            {
              "aria-label": a("Select all on this page"),
              checked: r.data.length > 0 && f.length === r.data.length,
              onCheckedChange: (s) => M(s ? r.data.map((o) => o.id) : [])
            }
          ) }),
          /* @__PURE__ */ e.jsx(q, { label: a("Title"), sortKey: "title", sort: l.sort, onSort: (s) => g({ sort: s }) }),
          z.map((s) => s.sortable ? /* @__PURE__ */ e.jsx(q, { label: s.label, sortKey: s.key, sort: l.sort, onSort: (o) => g({ sort: o }) }, s.key) : /* @__PURE__ */ e.jsx(t.TableHead, { children: s.label }, s.key)),
          L && /* @__PURE__ */ e.jsx(t.TableHead, { className: "cms:w-px", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: a("Order") }) }),
          R && /* @__PURE__ */ e.jsx(t.TableHead, { className: "cms:w-px", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: a("Restore") }) })
        ] }) }),
        /* @__PURE__ */ e.jsxs(t.TableBody, { children: [
          r.data.length === 0 && /* @__PURE__ */ e.jsx(t.TableRow, { className: "cms:hover:bg-transparent", children: /* @__PURE__ */ e.jsxs(t.TableCell, { colSpan: ve, className: "cms:h-32 cms:text-center cms:text-muted-foreground", children: [
            /* @__PURE__ */ e.jsx(Oe, { trashed: b, filtered: Z(b ? { ...l, status: "" } : l) > 0, canCreate: !!h?.create, createUrl: `${C}/create`, onClear: X }),
            !b && /* @__PURE__ */ e.jsx("div", { className: "cms:mt-2", children: /* @__PURE__ */ e.jsx(t.TrashHint, { count: N, onShow: () => g({ status: "trashed" }) }) })
          ] }) }),
          r.data.map((s, o) => /* @__PURE__ */ e.jsxs(t.TableRow, { className: b ? "sunrice-row-in cms:text-muted-foreground" : "sunrice-row-in", style: { "--i": o }, "data-state": f.includes(s.id) ? "selected" : void 0, children: [
            T.length > 0 && /* @__PURE__ */ e.jsx(t.TableCell, { children: /* @__PURE__ */ e.jsx(
              t.Checkbox,
              {
                "aria-label": a("Select :title", { title: s.title }),
                checked: f.includes(s.id),
                onCheckedChange: (j) => M(j ? [...f, s.id] : f.filter((B) => B !== s.id))
              }
            ) }),
            /* @__PURE__ */ e.jsxs(t.TableCell, { children: [
              /* @__PURE__ */ e.jsx(
                m.Link,
                {
                  href: S(`cms/collections/${n.handle}/entries/${s.id}/edit${l.locale !== _ ? `?locale=${encodeURIComponent(l.locale)}` : ""}`),
                  className: "cms:font-medium cms:underline-offset-4 cms:hover:underline",
                  children: s.title
                }
              ),
              (!l.columns.includes("slug") && s.path || s.parent) && /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: [l.columns.includes("slug") ? null : s.path, s.parent ? a("under :parent", { parent: s.parent }) : null].filter(Boolean).join(" · ") })
            ] }),
            z.map((j) => /* @__PURE__ */ e.jsx(t.TableCell, { className: j.key === "status" ? "" : "cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx("div", { className: "cms:max-w-72 cms:truncate", children: /* @__PURE__ */ e.jsx(Ve, { row: s, column: j }) }) }, j.key)),
            L && /* @__PURE__ */ e.jsx(t.TableCell, { className: "cms:w-px", children: /* @__PURE__ */ e.jsxs("span", { className: "cms:flex", children: [
              /* @__PURE__ */ e.jsx(t.Button, { variant: "ghost", size: "icon", "aria-label": a("Move :title up", { title: s.title }), onClick: () => m.router.post(S(`cms/entries/${s.id}/move`), { direction: "up" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(ie, {}) }),
              /* @__PURE__ */ e.jsx(t.Button, { variant: "ghost", size: "icon", "aria-label": a("Move :title down", { title: s.title }), onClick: () => m.router.post(S(`cms/entries/${s.id}/move`), { direction: "down" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(le, {}) })
            ] }) }),
            R && /* @__PURE__ */ e.jsx(t.TableCell, { className: "cms:w-px", children: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:justify-end cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs(
                t.Button,
                {
                  variant: "outline",
                  size: "sm",
                  "aria-label": a("Restore :title", { title: s.title }),
                  onClick: () => m.router.post(S(`cms/entries/${s.id}/restore`), {}, { preserveScroll: !0 }),
                  children: [
                    /* @__PURE__ */ e.jsx($e, {}),
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
                  onClick: () => U(
                    a("Permanently delete :title? This can't be undone.", { title: s.title }),
                    () => m.router.post(`${C}/bulk`, { action: "delete", ids: [s.id] }, { preserveScroll: !0 }),
                    a("Delete")
                  ),
                  children: [
                    /* @__PURE__ */ e.jsx(Ne, {}),
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
            xe(Number(s)), g({ perPage: Number(s) });
          }, children: [
            /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:h-8 cms:w-auto", "aria-label": a("Entries per page"), children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(t.SelectContent, { children: p.map((s) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: String(s), children: a(":count per page", { count: s }) }, s)) })
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
              onClick: () => r.prev_page_url && m.router.get(r.prev_page_url, {}, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(_e, {})
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
              onClick: () => r.next_page_url && m.router.get(r.next_page_url, {}, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(Pe, {})
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function H({ id: n, label: c, value: r, options: l, onChange: i, wide: d = !1 }) {
  return /* @__PURE__ */ e.jsxs(t.Select, { value: r === "" ? F : r, onValueChange: (x) => i(x === F ? "" : x), children: [
    /* @__PURE__ */ e.jsx(t.SelectTrigger, { id: n, className: d ? "cms:w-full" : "cms:w-auto cms:min-w-40 cms:max-w-72", title: c, "aria-label": c, children: /* @__PURE__ */ e.jsx(t.SelectValue, { placeholder: c }) }),
    /* @__PURE__ */ e.jsxs(t.SelectContent, { children: [
      /* @__PURE__ */ e.jsx(t.SelectItem, { value: F, children: a(":filter: all", { filter: c }) }),
      l.map((x) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: x.value, children: x.label }, x.value))
    ] })
  ] });
}
function q({ label: n, sortKey: c, sort: r, onSort: l }) {
  const i = Re(r, c);
  return /* @__PURE__ */ e.jsx(t.TableHead, { "aria-sort": i === "asc" ? "ascending" : i === "desc" ? "descending" : void 0, children: /* @__PURE__ */ e.jsxs(
    "button",
    {
      type: "button",
      onClick: () => l(ze(r, c)),
      className: "cms:-ml-2 cms:inline-flex cms:h-8 cms:items-center cms:gap-1 cms:rounded-md cms:px-2 cms:hover:bg-accent cms:hover:text-accent-foreground",
      children: [
        n,
        i === "asc" ? /* @__PURE__ */ e.jsx(ie, { className: "cms:size-3" }) : i === "desc" ? /* @__PURE__ */ e.jsx(le, { className: "cms:size-3" }) : /* @__PURE__ */ e.jsx(re, { className: "cms:size-3 cms:opacity-40" })
      ]
    }
  ) });
}
function Ve({ row: n, column: c }) {
  switch (c.key) {
    case "slug":
      return /* @__PURE__ */ e.jsx("span", { className: "cms:font-mono", children: n.slug });
    case "status":
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-1", children: [
        n.trashed ? /* @__PURE__ */ e.jsx(t.Badge, { variant: "outline", className: "cms:text-destructive", title: a(":status before it was trashed", { status: A(n.status) }), children: a("Trashed") }) : /* @__PURE__ */ e.jsx(ee, { status: n.status, changes: n.changes }),
        n.locales.length > 1 && n.locales.filter((r) => !r.main).map((r) => {
          const l = Ae(r);
          return /* @__PURE__ */ e.jsxs(
            t.Badge,
            {
              variant: l.variant,
              className: l.className,
              title: a(":language: :status", { language: V(r.code), status: l.title }),
              "aria-label": a(":language: :status", { language: V(r.code), status: l.title }),
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
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: E(n.publishedAt) });
    case "updated_at":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: E(n.updatedAt) });
    case "created_at":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: E(n.createdAt) });
    default:
      return /* @__PURE__ */ e.jsx("span", { title: n.cells[c.key] ?? void 0, children: n.cells[c.key] ?? "—" });
  }
}
function Ae(n) {
  return n.status === null ? { variant: "outline", className: "cms:border-dashed cms:text-muted-foreground", word: a("missing"), title: a("not translated") } : n.outdated ? { variant: "warning", className: "", word: a("outdated"), title: a(":status, outdated: the main language changed since", { status: A(n.status) }) } : n.status === "published" ? { variant: "secondary", className: "", word: null, title: a("Live") } : { variant: "outline", className: "", word: n.status === "scheduled" ? a("scheduled") : a("draft"), title: A(n.status) };
}
function Oe({ trashed: n, filtered: c, canCreate: r, createUrl: l, onClear: i }) {
  return c ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: a("Nothing matches these filters.") }),
    /* @__PURE__ */ e.jsxs(t.Button, { variant: "outline", size: "sm", onClick: i, children: [
      /* @__PURE__ */ e.jsx(se, {}),
      " ",
      a("Clear filters")
    ] })
  ] }) : n ? /* @__PURE__ */ e.jsx(e.Fragment, { children: a("The trash is empty.") }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: a("No entries yet.") }),
    r && /* @__PURE__ */ e.jsx(t.Button, { size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs(m.Link, { href: l, children: [
      /* @__PURE__ */ e.jsx(te, {}),
      " ",
      a("Write the first one")
    ] }) })
  ] });
}
export {
  ts as default
};
