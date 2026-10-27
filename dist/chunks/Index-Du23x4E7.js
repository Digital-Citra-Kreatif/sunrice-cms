import { j as e, t as a, r as m, a as S, l as H, f as E, s as V } from "./admin-DnUS3JhT.js";
import { c as y, _ as C } from "./createLucideIcon-Ccbp7F45.js";
import { u as fe, T as ve } from "./Confirm-B8nvQo5-.js";
import { u as t } from "./ui-Dh5wfMwT.js";
import { E as Z, X as q } from "./EntryStatus-DFbELiEH.js";
import { t as be, c as I, r as Ce } from "./tree-B7sRX6dH.js";
import { D as Ne } from "./download-DA5N5mq4.js";
import { P as ee } from "./plus-COqahUZ2.js";
import { S as Se } from "./search-3zKi7F1_.js";
import { R as ke } from "./rotate-ccw-BcgdCn0y.js";
import { C as we } from "./chevron-left-usCQl1qw.js";
import { C as ye } from "./chevron-right-9qVV6b-Q.js";
const se = {
  name: "arrow-down",
  size: 24,
  node: [
    ["path", { d: "M12 5v14", key: "s699le" }],
    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
  ]
};
se.node;
const te = y(se);
const ae = {
  name: "arrow-up-down",
  size: 24,
  node: [
    ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
    ["path", { d: "M17 20V4", key: "1ejh1v" }],
    ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
    ["path", { d: "M7 4v16", key: "1glfcx" }]
  ]
};
ae.node;
const le = y(ae);
const ne = {
  name: "arrow-up",
  size: 24,
  node: [
    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
    ["path", { d: "M12 19V5", key: "x0mq9r" }]
  ]
};
ne.node;
const re = y(ne);
const ce = {
  name: "columns-3",
  size: 24,
  node: [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M9 3v18", key: "fh3hqa" }],
    ["path", { d: "M15 3v18", key: "14nvp0" }]
  ],
  aliases: ["panels-left-right"]
};
ce.node;
const Te = y(ce);
const ie = {
  name: "list-filter",
  size: 24,
  node: [
    ["path", { d: "M2 5h20", key: "1fs1ex" }],
    ["path", { d: "M6 12h12", key: "8npq4p" }],
    ["path", { d: "M9 19h6", key: "456am0" }]
  ]
};
ie.node;
const $e = y(ie);
function _e({ collection: n, rows: c, hierarchical: r = !1 }) {
  const l = C.useCallback(
    (p) => be(p, (u) => r ? u.parentId : null),
    [r]
  ), [i, o] = C.useState(() => l(c));
  C.useEffect(() => o(l(c)), [c, l]);
  const x = (p, u) => {
    const N = Ce(i, p, u), h = I(N, p).map((b) => N[b].id);
    o(N), m.router.post(
      S("cms/entries/reorder"),
      { collection: n, ids: h, parent_id: p < 0 ? null : i[p]?.id ?? null },
      { preserveScroll: !0, preserveState: !0, onError: () => o(l(c)) }
    );
  }, T = (p) => /* @__PURE__ */ e.jsx(
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
            /* @__PURE__ */ e.jsx(Z, { status: h.status, changes: h.changes })
          ] }),
          I(i, u).length > 0 && T(u)
        ] });
      }
    }
  );
  return /* @__PURE__ */ e.jsxs(t.Card, { className: "cms:p-2", children: [
    r && /* @__PURE__ */ e.jsx("p", { className: "cms:px-1 cms:pb-1 cms:text-xs cms:text-muted-foreground", children: a("Entries move among those at their level, with what's under them. To put one under another, choose its Parent in its Page settings.") }),
    T(-1)
  ] });
}
function Pe(n, c, r) {
  const l = { ...n, ...c }, i = Object.fromEntries(Object.entries(l.terms).filter(([, x]) => x !== "")), o = {};
  return l.search && (o.search = l.search), l.status && (o.status = l.status), l.author && (o.author = l.author), Object.keys(i).length > 0 && (o.terms = i), l.locale && l.locale !== r && (o.locale = l.locale), l.sort && (o.sort = l.sort), o.per_page = l.perPage, o;
}
function De(n) {
  const c = new URLSearchParams();
  for (const [r, l] of Object.entries(n))
    if (typeof l == "object")
      for (const [i, o] of Object.entries(l)) c.set(`${r}[${i}]`, o);
    else
      c.set(r, String(l));
  return c.toString();
}
function Le(n, c) {
  return n === c ? `-${c}` : n === `-${c}` ? "" : c;
}
function Be(n, c) {
  return n === c ? "asc" : n === `-${c}` ? "desc" : null;
}
function J(n) {
  return [n.search, n.status, n.author, ...Object.values(n.terms)].filter((c) => c !== "").length;
}
const Me = 2;
function ze(n, c) {
  return [n.author, ...c.map((r) => n.terms[r] ?? "")].filter((r) => r !== "").length;
}
const R = "__all", Ee = () => [
  { value: "draft", label: a("Drafts") },
  { value: "published", label: a("Live") },
  { value: "scheduled", label: a("Scheduled") },
  { value: "trashed", label: a("Trash") }
];
function qe(n) {
  const { collection: c, entries: r, query: l } = n;
  return t.useBreadcrumbs([{ label: c ? c.title : a("Entries") }]), !c || !r || !l ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(m.Head, { title: a("Entries") }),
    /* @__PURE__ */ e.jsx(t.PageHeader, { title: a("Entries"), description: a("There are no collections yet. Create one under Structure → Collections, then come back to write its entries.") })
  ] }) : /* @__PURE__ */ e.jsx(Ie, { ...n, collection: c, entries: r, query: l });
}
function Ie({
  collection: n,
  collections: c,
  entries: r,
  query: l,
  columns: i = [],
  filters: o = { authors: [], taxonomies: [], locales: [] },
  links: x = [],
  manualOrder: T = !1,
  perPageOptions: p = [10, 25, 50, 100],
  preferencesKey: u,
  trashedCount: N = 0,
  can: h
}) {
  const b = S(`cms/collections/${n.handle}/entries`), D = o.locales[0] ?? l.locale, [$, A] = C.useState(l.search), [f, L] = C.useState([]), [k, oe] = C.useState(!1), [O, de] = fe(), { setColumns: me, setPerPage: ue } = t.useTablePreferences(u ?? `table.cms.entries.${n.handle}`, { columns: l.columns, perPage: l.perPage });
  C.useEffect(() => L([]), [r]);
  const v = l.status === "trashed", he = J(l) > 0, B = [
    ...o.authors.length > 0 ? [{ key: "author", label: a("Author"), value: l.author, options: o.authors, onChange: (s) => g({ author: s }) }] : [],
    ...o.taxonomies.filter((s) => s.terms.length > 0).map((s) => ({
      key: `terms-${s.handle}`,
      label: s.title,
      value: l.terms[s.handle] ?? "",
      options: s.terms.map((d) => ({ value: d.value, label: `${"— ".repeat(d.depth)}${d.label}` })),
      onChange: (d) => g({ terms: { ...l.terms, [s.handle]: d } })
    }))
  ], xe = B.length > Me, U = ze(l, o.taxonomies.map((s) => s.handle)), M = i.filter((s) => l.columns.includes(s.key)), Q = (s = {}) => Pe(l, s, D), g = (s) => m.router.get(b, Q(s), { preserveState: !0, preserveScroll: !0, replace: !0 });
  C.useEffect(() => {
    if ($ === l.search) return;
    const s = window.setTimeout(() => g({ search: $ }), 300);
    return () => window.clearTimeout(s);
  }, [$]);
  const w = v ? h?.delete ? [{ action: "restore", label: a("Restore") }, { action: "delete", label: a("Permanently delete"), danger: !0 }] : [] : [
    ...h?.publish ? [{ action: "publish", label: a("Publish") }, { action: "unpublish", label: a("Unpublish") }] : [],
    ...h?.delete ? [{ action: "trash", label: a("Move to the trash"), danger: !0 }] : []
  ], pe = (s, d, j = !1) => {
    const P = () => m.router.post(`${b}/bulk`, { action: s, ids: f }, { preserveScroll: !0 });
    if (j) {
      const je = f.length === 1 ? a(":action: 1 entry?", { action: d }) : a(":action: :count entries?", { action: d, count: f.length });
      O(
        `${je} ${s === "delete" ? a("This can't be undone.") : a("They come off the site; you can restore them.")}`,
        P,
        s === "trash" ? a("Move to trash") : a("Delete")
      );
    } else
      P();
  }, K = async (s) => {
    const d = new Set(l.columns);
    d.has(s) ? d.delete(s) : d.add(s), await me(i.map((j) => j.key).filter((j) => d.has(j))), m.router.reload({ only: ["entries", "query"] });
  }, W = () => {
    A(""), g({ search: "", status: "", author: "", terms: {} });
  }, _ = T && !!h?.update, X = _ && r !== null && r.lastPage <= 1 && r.data.length > 1, z = v && !!h?.delete, ge = 1 + M.length + (w.length > 0 ? 1 : 0) + (_ ? 1 : 0) + (z ? 1 : 0), G = De(Q());
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(m.Head, { title: n.title }),
    de,
    /* @__PURE__ */ e.jsx(
      t.PageHeader,
      {
        title: v ? /* @__PURE__ */ e.jsx(t.TrashTitle, { children: n.title }) : n.title,
        primary: h?.create && !v && /* @__PURE__ */ e.jsx(t.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(m.Link, { href: `${b}/create`, children: [
          /* @__PURE__ */ e.jsx(ee, {}),
          " ",
          a("New entry")
        ] }) }),
        menu: [
          ...r.total > 0 && h?.export ? [{ label: a("Export CSV"), href: `${b}/export${G ? `?${G}` : ""}`, download: !0, icon: /* @__PURE__ */ e.jsx(Ne, {}) }] : [],
          ...x.map((s) => ({ label: s.label, href: s.href, external: s.external, group: s.group }))
        ],
        children: c.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: n.handle, onValueChange: (s) => m.router.get(S(`cms/collections/${s}/entries`)), children: [
          /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-48", "aria-label": a("Collection"), children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(t.SelectContent, { children: c.map((s) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: s.handle, children: s.title }, s.handle)) })
        ] })
      }
    ),
    v && /* @__PURE__ */ e.jsx(t.TrashBanner, { items: a("entries"), onBack: () => g({ status: "" }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:md:flex-row cms:md:items-start", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-wrap cms:items-center cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-xs", children: [
          /* @__PURE__ */ e.jsx(Se, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
          /* @__PURE__ */ e.jsx(
            t.Input,
            {
              className: "cms:pl-9",
              placeholder: a("Search titles, slugs or #id"),
              "aria-label": a("Search entries"),
              value: $,
              onChange: (s) => A(s.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx(F, { label: a("Status"), value: l.status, options: Ee(), onChange: (s) => g({ status: s }) }),
        xe ? /* @__PURE__ */ e.jsxs(t.Popover, { children: [
          /* @__PURE__ */ e.jsx(t.PopoverTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(t.Button, { variant: "outline", children: [
            /* @__PURE__ */ e.jsx($e, {}),
            " ",
            a("Filters"),
            U > 0 && /* @__PURE__ */ e.jsx(t.Badge, { variant: "secondary", className: "cms:ml-1 cms:px-1.5", children: U })
          ] }) }),
          /* @__PURE__ */ e.jsx(t.PopoverContent, { align: "start", className: "cms:flex cms:w-80 cms:flex-col cms:gap-3", children: B.map((s) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5", children: [
            /* @__PURE__ */ e.jsx(t.Label, { htmlFor: `entry-filter-${s.key}`, children: s.label }),
            /* @__PURE__ */ e.jsx(F, { id: `entry-filter-${s.key}`, wide: !0, label: s.label, value: s.value, options: s.options, onChange: s.onChange })
          ] }, s.key)) })
        ] }) : B.map((s) => /* @__PURE__ */ e.jsx(F, { label: s.label, value: s.value, options: s.options, onChange: s.onChange }, s.key)),
        o.locales.length > 1 && /* @__PURE__ */ e.jsxs(t.Select, { value: l.locale, onValueChange: (s) => g({ locale: s }), children: [
          /* @__PURE__ */ e.jsx(t.SelectTrigger, { className: "cms:w-auto cms:min-w-40 cms:max-w-72", "aria-label": a("Language"), children: /* @__PURE__ */ e.jsx(t.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(t.SelectContent, { children: o.locales.map((s) => /* @__PURE__ */ e.jsxs(t.SelectItem, { value: s, children: [
            H(s),
            s === D ? ` ${a("(main)")}` : ""
          ] }, s)) })
        ] }),
        he && /* @__PURE__ */ e.jsxs(t.Button, { variant: "ghost", size: "sm", onClick: W, children: [
          /* @__PURE__ */ e.jsx(q, {}),
          " ",
          a("Clear")
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-none cms:flex-wrap cms:items-center cms:gap-2 cms:md:ml-auto", children: [
        f.length > 0 && w.length > 0 && /* @__PURE__ */ e.jsxs("div", { role: "toolbar", "aria-label": a("Selected entries"), className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: a(":count selected", { count: f.length }) }),
          w.map((s) => /* @__PURE__ */ e.jsx(t.Button, { size: "sm", variant: s.danger ? "destructive" : "outline", onClick: () => pe(s.action, s.label, s.danger), children: s.label }, s.action))
        ] }),
        X && /* @__PURE__ */ e.jsxs(t.Button, { variant: k ? "secondary" : "outline", "aria-pressed": k, onClick: () => oe(!k), children: [
          /* @__PURE__ */ e.jsx(le, {}),
          " ",
          k ? a("Done") : a("Reorder")
        ] }),
        i.length > 0 && /* @__PURE__ */ e.jsxs(t.DropdownMenu, { children: [
          /* @__PURE__ */ e.jsx(t.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(t.Button, { variant: "outline", children: [
            /* @__PURE__ */ e.jsx(Te, {}),
            " ",
            a("Columns")
          ] }) }),
          /* @__PURE__ */ e.jsxs(t.DropdownMenuContent, { align: "end", className: "cms:max-h-96 cms:overflow-y-auto", children: [
            /* @__PURE__ */ e.jsx(t.DropdownMenuLabel, { children: a("Columns") }),
            i.filter((s) => !s.field).map((s) => /* @__PURE__ */ e.jsx(
              t.DropdownMenuCheckboxItem,
              {
                checked: l.columns.includes(s.key),
                onSelect: (d) => d.preventDefault(),
                onCheckedChange: () => {
                  K(s.key);
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
                  onSelect: (d) => d.preventDefault(),
                  onCheckedChange: () => {
                    K(s.key);
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
    k && X ? /* @__PURE__ */ e.jsx(_e, { collection: n.handle, rows: r.data, hierarchical: n.hierarchical === !0 }) : /* @__PURE__ */ e.jsxs(t.Card, { className: "cms:gap-0 cms:overflow-hidden cms:py-0", children: [
      /* @__PURE__ */ e.jsxs(t.Table, { children: [
        /* @__PURE__ */ e.jsx(t.TableHeader, { className: "cms:bg-muted/60", children: /* @__PURE__ */ e.jsxs(t.TableRow, { className: "cms:hover:bg-transparent", children: [
          w.length > 0 && /* @__PURE__ */ e.jsx(t.TableHead, { className: "cms:w-10", children: /* @__PURE__ */ e.jsx(
            t.Checkbox,
            {
              "aria-label": a("Select all on this page"),
              checked: r.data.length > 0 && f.length === r.data.length,
              onCheckedChange: (s) => L(s ? r.data.map((d) => d.id) : [])
            }
          ) }),
          /* @__PURE__ */ e.jsx(Y, { label: a("Title"), sortKey: "title", sort: l.sort, onSort: (s) => g({ sort: s }) }),
          M.map((s) => s.sortable ? /* @__PURE__ */ e.jsx(Y, { label: s.label, sortKey: s.key, sort: l.sort, onSort: (d) => g({ sort: d }) }, s.key) : /* @__PURE__ */ e.jsx(t.TableHead, { children: s.label }, s.key)),
          _ && /* @__PURE__ */ e.jsx(t.TableHead, { className: "cms:w-px", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: a("Order") }) }),
          z && /* @__PURE__ */ e.jsx(t.TableHead, { className: "cms:w-px", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: a("Restore") }) })
        ] }) }),
        /* @__PURE__ */ e.jsxs(t.TableBody, { children: [
          r.data.length === 0 && /* @__PURE__ */ e.jsx(t.TableRow, { className: "cms:hover:bg-transparent", children: /* @__PURE__ */ e.jsxs(t.TableCell, { colSpan: ge, className: "cms:h-32 cms:text-center cms:text-muted-foreground", children: [
            /* @__PURE__ */ e.jsx(He, { trashed: v, filtered: J(v ? { ...l, status: "" } : l) > 0, canCreate: !!h?.create, createUrl: `${b}/create`, onClear: W }),
            !v && /* @__PURE__ */ e.jsx("div", { className: "cms:mt-2", children: /* @__PURE__ */ e.jsx(t.TrashHint, { count: N, onShow: () => g({ status: "trashed" }) }) })
          ] }) }),
          r.data.map((s, d) => /* @__PURE__ */ e.jsxs(t.TableRow, { className: v ? "sunrice-row-in cms:text-muted-foreground" : "sunrice-row-in", style: { "--i": d }, "data-state": f.includes(s.id) ? "selected" : void 0, children: [
            w.length > 0 && /* @__PURE__ */ e.jsx(t.TableCell, { children: /* @__PURE__ */ e.jsx(
              t.Checkbox,
              {
                "aria-label": a("Select :title", { title: s.title }),
                checked: f.includes(s.id),
                onCheckedChange: (j) => L(j ? [...f, s.id] : f.filter((P) => P !== s.id))
              }
            ) }),
            /* @__PURE__ */ e.jsxs(t.TableCell, { children: [
              /* @__PURE__ */ e.jsx(
                m.Link,
                {
                  href: S(`cms/collections/${n.handle}/entries/${s.id}/edit${l.locale !== D ? `?locale=${encodeURIComponent(l.locale)}` : ""}`),
                  className: "cms:font-medium cms:underline-offset-4 cms:hover:underline",
                  children: s.title
                }
              ),
              (!l.columns.includes("slug") && s.path || s.parent) && /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: [l.columns.includes("slug") ? null : s.path, s.parent ? a("under :parent", { parent: s.parent }) : null].filter(Boolean).join(" · ") })
            ] }),
            M.map((j) => /* @__PURE__ */ e.jsx(t.TableCell, { className: j.key === "status" ? "" : "cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx("div", { className: "cms:max-w-72 cms:truncate", children: /* @__PURE__ */ e.jsx(Re, { row: s, column: j }) }) }, j.key)),
            _ && /* @__PURE__ */ e.jsx(t.TableCell, { className: "cms:w-px", children: /* @__PURE__ */ e.jsxs("span", { className: "cms:flex", children: [
              /* @__PURE__ */ e.jsx(t.Button, { variant: "ghost", size: "icon", "aria-label": a("Move :title up", { title: s.title }), onClick: () => m.router.post(S(`cms/entries/${s.id}/move`), { direction: "up" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(re, {}) }),
              /* @__PURE__ */ e.jsx(t.Button, { variant: "ghost", size: "icon", "aria-label": a("Move :title down", { title: s.title }), onClick: () => m.router.post(S(`cms/entries/${s.id}/move`), { direction: "down" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(te, {}) })
            ] }) }),
            z && /* @__PURE__ */ e.jsx(t.TableCell, { className: "cms:w-px", children: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:justify-end cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs(
                t.Button,
                {
                  variant: "outline",
                  size: "sm",
                  "aria-label": a("Restore :title", { title: s.title }),
                  onClick: () => m.router.post(S(`cms/entries/${s.id}/restore`), {}, { preserveScroll: !0 }),
                  children: [
                    /* @__PURE__ */ e.jsx(ke, {}),
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
                  onClick: () => O(
                    a("Permanently delete :title? This can't be undone.", { title: s.title }),
                    () => m.router.post(`${b}/bulk`, { action: "delete", ids: [s.id] }, { preserveScroll: !0 }),
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
          /* @__PURE__ */ e.jsx("span", { children: r.total === 0 ? a("No entries") : a(":from–:to of :total", { from: r.from, to: r.to, total: r.total }) }),
          /* @__PURE__ */ e.jsxs(t.Select, { value: String(l.perPage), onValueChange: (s) => {
            ue(Number(s)), g({ perPage: Number(s) });
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
              children: /* @__PURE__ */ e.jsx(we, {})
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
              children: /* @__PURE__ */ e.jsx(ye, {})
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function F({ id: n, label: c, value: r, options: l, onChange: i, wide: o = !1 }) {
  return /* @__PURE__ */ e.jsxs(t.Select, { value: r === "" ? R : r, onValueChange: (x) => i(x === R ? "" : x), children: [
    /* @__PURE__ */ e.jsx(t.SelectTrigger, { id: n, className: o ? "cms:w-full" : "cms:w-auto cms:min-w-40 cms:max-w-72", title: c, "aria-label": c, children: /* @__PURE__ */ e.jsx(t.SelectValue, { placeholder: c }) }),
    /* @__PURE__ */ e.jsxs(t.SelectContent, { children: [
      /* @__PURE__ */ e.jsx(t.SelectItem, { value: R, children: a(":filter: all", { filter: c }) }),
      l.map((x) => /* @__PURE__ */ e.jsx(t.SelectItem, { value: x.value, children: x.label }, x.value))
    ] })
  ] });
}
function Y({ label: n, sortKey: c, sort: r, onSort: l }) {
  const i = Be(r, c);
  return /* @__PURE__ */ e.jsx(t.TableHead, { "aria-sort": i === "asc" ? "ascending" : i === "desc" ? "descending" : void 0, children: /* @__PURE__ */ e.jsxs(
    "button",
    {
      type: "button",
      onClick: () => l(Le(r, c)),
      className: "cms:-ml-2 cms:inline-flex cms:h-8 cms:items-center cms:gap-1 cms:rounded-md cms:px-2 cms:hover:bg-accent cms:hover:text-accent-foreground",
      children: [
        n,
        i === "asc" ? /* @__PURE__ */ e.jsx(re, { className: "cms:size-3" }) : i === "desc" ? /* @__PURE__ */ e.jsx(te, { className: "cms:size-3" }) : /* @__PURE__ */ e.jsx(le, { className: "cms:size-3 cms:opacity-40" })
      ]
    }
  ) });
}
function Re({ row: n, column: c }) {
  switch (c.key) {
    case "slug":
      return /* @__PURE__ */ e.jsx("span", { className: "cms:font-mono", children: n.slug });
    case "status":
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-1", children: [
        n.trashed ? /* @__PURE__ */ e.jsx(t.Badge, { variant: "outline", className: "cms:text-destructive", title: a(":status before it was trashed", { status: V(n.status) }), children: a("Trashed") }) : /* @__PURE__ */ e.jsx(Z, { status: n.status, changes: n.changes }),
        n.locales.length > 1 && n.locales.filter((r) => !r.main).map((r) => {
          const l = Fe(r);
          return /* @__PURE__ */ e.jsxs(
            t.Badge,
            {
              variant: l.variant,
              className: l.className,
              title: a(":language: :status", { language: H(r.code), status: l.title }),
              "aria-label": a(":language: :status", { language: H(r.code), status: l.title }),
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
function Fe(n) {
  return n.status === null ? { variant: "outline", className: "cms:border-dashed cms:text-muted-foreground", word: a("missing"), title: a("not translated") } : n.outdated ? { variant: "warning", className: "", word: a("outdated"), title: a(":status, outdated: the main language changed since", { status: V(n.status) }) } : n.status === "published" ? { variant: "secondary", className: "", word: null, title: a("Live") } : { variant: "outline", className: "", word: n.status === "scheduled" ? a("scheduled") : a("draft"), title: V(n.status) };
}
function He({ trashed: n, filtered: c, canCreate: r, createUrl: l, onClear: i }) {
  return c ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: a("Nothing matches these filters.") }),
    /* @__PURE__ */ e.jsxs(t.Button, { variant: "outline", size: "sm", onClick: i, children: [
      /* @__PURE__ */ e.jsx(q, {}),
      " ",
      a("Clear filters")
    ] })
  ] }) : n ? /* @__PURE__ */ e.jsx(e.Fragment, { children: a("The trash is empty.") }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: a("No entries yet.") }),
    r && /* @__PURE__ */ e.jsx(t.Button, { size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs(m.Link, { href: l, children: [
      /* @__PURE__ */ e.jsx(ee, {}),
      " ",
      a("Write the first one")
    ] }) })
  ] });
}
export {
  qe as default
};
