import { j as e, t, r as m, a as C, l as H, f as M, s as V } from "./admin-AwfaNzsU.js";
import { c as P, _ as b } from "./createLucideIcon-Ccbp7F45.js";
import { u as xe } from "./Confirm-Dy8jz4Je.js";
import { u as a } from "./ui-Dh5wfMwT.js";
import { E as J, X as Y } from "./EntryStatus-D9z0E-cZ.js";
import { t as pe, c as E, r as ge } from "./tree-B7sRX6dH.js";
import { D as je } from "./download-DA5N5mq4.js";
import { P as Z } from "./plus-COqahUZ2.js";
import { S as fe } from "./search-3zKi7F1_.js";
import { R as ve } from "./rotate-ccw-BcgdCn0y.js";
import { T as be } from "./trash-DHN6ewjn.js";
import { C as Se } from "./chevron-left-usCQl1qw.js";
import { C as Ce } from "./chevron-right-9qVV6b-Q.js";
const q = {
  name: "arrow-down",
  size: 24,
  node: [
    ["path", { d: "M12 5v14", key: "s699le" }],
    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
  ]
};
q.node;
const ee = P(q);
const se = {
  name: "arrow-up-down",
  size: 24,
  node: [
    ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
    ["path", { d: "M17 20V4", key: "1ejh1v" }],
    ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
    ["path", { d: "M7 4v16", key: "1glfcx" }]
  ]
};
se.node;
const te = P(se);
const ae = {
  name: "arrow-up",
  size: 24,
  node: [
    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
    ["path", { d: "M12 19V5", key: "x0mq9r" }]
  ]
};
ae.node;
const le = P(ae);
const re = {
  name: "columns-3",
  size: 24,
  node: [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M9 3v18", key: "fh3hqa" }],
    ["path", { d: "M15 3v18", key: "14nvp0" }]
  ],
  aliases: ["panels-left-right"]
};
re.node;
const Ne = P(re);
function ke({ collection: r, rows: c, hierarchical: n = !1 }) {
  const l = b.useCallback(
    (x) => pe(x, (u) => n ? u.parentId : null),
    [n]
  ), [i, d] = b.useState(() => l(c));
  b.useEffect(() => d(l(c)), [c, l]);
  const N = (x, u) => {
    const S = ge(i, x, u), h = E(S, x).map((v) => S[v].id);
    d(S), m.router.post(
      C("cms/entries/reorder"),
      { collection: r, ids: h, parent_id: x < 0 ? null : i[x]?.id ?? null },
      { preserveScroll: !0, preserveState: !0, onError: () => d(l(c)) }
    );
  }, T = (x) => /* @__PURE__ */ e.jsx(
    a.SortableList,
    {
      items: E(i, x),
      getId: (u) => i[u].id,
      getLabel: (u) => i[u].title,
      onReorder: (u) => N(x, u),
      className: x < 0 ? "cms:gap-1" : "cms:mt-1 cms:gap-1 cms:pl-6",
      children: (u, { handle: S }) => {
        const h = i[u];
        return /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2 cms:rounded-lg cms:border cms:border-border/70 cms:bg-card cms:p-2 cms:text-sm", children: [
            /* @__PURE__ */ e.jsx(a.SortableHandle, { ...S, label: t("Move :title", { title: h.title }) }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium", children: h.title }),
            /* @__PURE__ */ e.jsx(J, { status: h.status, changes: h.changes })
          ] }),
          E(i, u).length > 0 && T(u)
        ] });
      }
    }
  );
  return /* @__PURE__ */ e.jsxs(a.Card, { className: "cms:p-2", children: [
    n && /* @__PURE__ */ e.jsx("p", { className: "cms:px-1 cms:pb-1 cms:text-xs cms:text-muted-foreground", children: t("Entries move among those at their level, with what's under them. To put one under another, choose its Parent in its Page settings.") }),
    T(-1)
  ] });
}
function we(r, c, n) {
  const l = { ...r, ...c }, i = Object.fromEntries(Object.entries(l.terms).filter(([, N]) => N !== "")), d = {};
  return l.search && (d.search = l.search), l.status && (d.status = l.status), l.author && (d.author = l.author), Object.keys(i).length > 0 && (d.terms = i), l.locale && l.locale !== n && (d.locale = l.locale), l.sort && (d.sort = l.sort), d.per_page = l.perPage, d;
}
function Te(r) {
  const c = new URLSearchParams();
  for (const [n, l] of Object.entries(r))
    if (typeof l == "object")
      for (const [i, d] of Object.entries(l)) c.set(`${n}[${i}]`, d);
    else
      c.set(n, String(l));
  return c.toString();
}
function ye(r, c) {
  return r === c ? `-${c}` : r === `-${c}` ? "" : c;
}
function _e(r, c) {
  return r === c ? "asc" : r === `-${c}` ? "desc" : null;
}
function X(r) {
  return [r.search, r.status, r.author, ...Object.values(r.terms)].filter((c) => c !== "").length;
}
const R = "__all", $e = () => [
  { value: "draft", label: t("Drafts") },
  { value: "published", label: t("Live") },
  { value: "scheduled", label: t("Scheduled") },
  { value: "trashed", label: t("Trash") }
];
function We(r) {
  const { collection: c, entries: n, query: l } = r;
  return a.useBreadcrumbs([{ label: c ? c.title : t("Entries") }]), !c || !n || !l ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(m.Head, { title: t("Entries") }),
    /* @__PURE__ */ e.jsx(a.PageHeader, { title: t("Entries"), description: t("There are no collections yet. Create one under Structure → Collections, then come back to write its entries.") })
  ] }) : /* @__PURE__ */ e.jsx(Pe, { ...r, collection: c, entries: n, query: l });
}
function Pe({
  collection: r,
  collections: c,
  entries: n,
  query: l,
  columns: i = [],
  filters: d = { authors: [], taxonomies: [], locales: [] },
  links: N = [],
  manualOrder: T = !1,
  perPageOptions: x = [10, 25, 50, 100],
  preferencesKey: u,
  trashedCount: S = 0,
  can: h
}) {
  const v = C(`cms/collections/${r.handle}/entries`), D = d.locales[0] ?? l.locale, [y, F] = b.useState(l.search), [j, B] = b.useState([]), [k, ne] = b.useState(!1), [A, ce] = xe(), { setColumns: ie, setPerPage: oe } = a.useTablePreferences(u ?? `table.cms.entries.${r.handle}`, { columns: l.columns, perPage: l.perPage });
  b.useEffect(() => B([]), [n]);
  const f = l.status === "trashed", de = X(l) > 0, L = i.filter((s) => l.columns.includes(s.key)), O = (s = {}) => we(l, s, D), p = (s) => m.router.get(v, O(s), { preserveState: !0, preserveScroll: !0, replace: !0 });
  b.useEffect(() => {
    if (y === l.search) return;
    const s = window.setTimeout(() => p({ search: y }), 300);
    return () => window.clearTimeout(s);
  }, [y]);
  const w = f ? h?.delete ? [{ action: "restore", label: t("Restore") }, { action: "delete", label: t("Permanently delete"), danger: !0 }] : [] : [
    ...h?.publish ? [{ action: "publish", label: t("Publish") }, { action: "unpublish", label: t("Unpublish") }] : [],
    ...h?.delete ? [{ action: "trash", label: t("Move to the trash"), danger: !0 }] : []
  ], me = (s, o, g = !1) => {
    const $ = () => m.router.post(`${v}/bulk`, { action: s, ids: j }, { preserveScroll: !0 });
    if (g) {
      const he = j.length === 1 ? t(":action: 1 entry?", { action: o }) : t(":action: :count entries?", { action: o, count: j.length });
      A(
        `${he} ${s === "delete" ? t("This can't be undone.") : t("They come off the site; you can restore them.")}`,
        $,
        s === "trash" ? t("Move to trash") : t("Delete")
      );
    } else
      $();
  }, U = async (s) => {
    const o = new Set(l.columns);
    o.has(s) ? o.delete(s) : o.add(s), await ie(i.map((g) => g.key).filter((g) => o.has(g))), m.router.reload({ only: ["entries", "query"] });
  }, Q = () => {
    F(""), p({ search: "", status: "", author: "", terms: {} });
  }, _ = T && !!h?.update, K = _ && n !== null && n.lastPage <= 1 && n.data.length > 1, z = f && !!h?.delete, ue = 1 + L.length + (w.length > 0 ? 1 : 0) + (_ ? 1 : 0) + (z ? 1 : 0), W = Te(O());
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(m.Head, { title: r.title }),
    ce,
    /* @__PURE__ */ e.jsx(
      a.PageHeader,
      {
        title: f ? /* @__PURE__ */ e.jsx(a.TrashTitle, { children: r.title }) : r.title,
        primary: h?.create && !f && /* @__PURE__ */ e.jsx(a.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(m.Link, { href: `${v}/create`, children: [
          /* @__PURE__ */ e.jsx(Z, {}),
          " ",
          t("New entry")
        ] }) }),
        menu: [
          ...n.total > 0 && h?.export ? [{ label: t("Export CSV"), href: `${v}/export${W ? `?${W}` : ""}`, download: !0, icon: /* @__PURE__ */ e.jsx(je, {}) }] : [],
          ...N.map((s) => ({ label: s.label, href: s.href, external: s.external, group: s.group }))
        ],
        children: c.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: r.handle, onValueChange: (s) => m.router.get(C(`cms/collections/${s}/entries`)), children: [
          /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": t("Collection"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(a.SelectContent, { children: c.map((s) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: s.handle, children: s.title }, s.handle)) })
        ] })
      }
    ),
    f && /* @__PURE__ */ e.jsx(a.TrashBanner, { items: t("entries"), onBack: () => p({ status: "" }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-xs", children: [
        /* @__PURE__ */ e.jsx(fe, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            className: "cms:pl-9",
            placeholder: t("Search titles, slugs or #id"),
            "aria-label": t("Search entries"),
            value: y,
            onChange: (s) => F(s.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(I, { label: t("Status"), value: l.status, options: $e(), onChange: (s) => p({ status: s }) }),
      d.authors.length > 0 && /* @__PURE__ */ e.jsx(I, { label: t("Author"), value: l.author, options: d.authors, onChange: (s) => p({ author: s }) }),
      d.taxonomies.filter((s) => s.terms.length > 0).map((s) => /* @__PURE__ */ e.jsx(
        I,
        {
          label: s.title,
          value: l.terms[s.handle] ?? "",
          options: s.terms.map((o) => ({ value: o.value, label: `${"— ".repeat(o.depth)}${o.label}` })),
          onChange: (o) => p({ terms: { ...l.terms, [s.handle]: o } })
        },
        s.handle
      )),
      d.locales.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: l.locale, onValueChange: (s) => p({ locale: s }), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-auto cms:min-w-40 cms:max-w-72", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(a.SelectContent, { children: d.locales.map((s) => /* @__PURE__ */ e.jsxs(a.SelectItem, { value: s, children: [
          H(s),
          s === D ? ` ${t("(main)")}` : ""
        ] }, s)) })
      ] }),
      de && /* @__PURE__ */ e.jsxs(a.Button, { variant: "ghost", size: "sm", onClick: Q, children: [
        /* @__PURE__ */ e.jsx(Y, {}),
        " ",
        t("Clear")
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:ml-auto cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
        j.length > 0 && w.length > 0 && /* @__PURE__ */ e.jsxs("div", { role: "toolbar", "aria-label": t("Selected entries"), className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t(":count selected", { count: j.length }) }),
          w.map((s) => /* @__PURE__ */ e.jsx(a.Button, { size: "sm", variant: s.danger ? "destructive" : "outline", onClick: () => me(s.action, s.label, s.danger), children: s.label }, s.action))
        ] }),
        K && /* @__PURE__ */ e.jsxs(a.Button, { variant: k ? "secondary" : "outline", "aria-pressed": k, onClick: () => ne(!k), children: [
          /* @__PURE__ */ e.jsx(te, {}),
          " ",
          k ? t("Done") : t("Reorder")
        ] }),
        i.length > 0 && /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
          /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsxs(a.Button, { variant: "outline", children: [
            /* @__PURE__ */ e.jsx(Ne, {}),
            " ",
            t("Columns")
          ] }) }),
          /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", className: "cms:max-h-96 cms:overflow-y-auto", children: [
            /* @__PURE__ */ e.jsx(a.DropdownMenuLabel, { children: t("Columns") }),
            i.filter((s) => !s.field).map((s) => /* @__PURE__ */ e.jsx(
              a.DropdownMenuCheckboxItem,
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
              /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
              /* @__PURE__ */ e.jsx(a.DropdownMenuLabel, { children: t("Fields") }),
              i.filter((s) => s.field).map((s) => /* @__PURE__ */ e.jsx(
                a.DropdownMenuCheckboxItem,
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
    k && K ? /* @__PURE__ */ e.jsx(ke, { collection: r.handle, rows: n.data, hierarchical: r.hierarchical === !0 }) : /* @__PURE__ */ e.jsxs(a.Card, { className: "cms:gap-0 cms:overflow-hidden cms:py-0", children: [
      /* @__PURE__ */ e.jsxs(a.Table, { children: [
        /* @__PURE__ */ e.jsx(a.TableHeader, { className: "cms:bg-muted/60", children: /* @__PURE__ */ e.jsxs(a.TableRow, { className: "cms:hover:bg-transparent", children: [
          w.length > 0 && /* @__PURE__ */ e.jsx(a.TableHead, { className: "cms:w-10", children: /* @__PURE__ */ e.jsx(
            a.Checkbox,
            {
              "aria-label": t("Select all on this page"),
              checked: n.data.length > 0 && j.length === n.data.length,
              onCheckedChange: (s) => B(s ? n.data.map((o) => o.id) : [])
            }
          ) }),
          /* @__PURE__ */ e.jsx(G, { label: t("Title"), sortKey: "title", sort: l.sort, onSort: (s) => p({ sort: s }) }),
          L.map((s) => s.sortable ? /* @__PURE__ */ e.jsx(G, { label: s.label, sortKey: s.key, sort: l.sort, onSort: (o) => p({ sort: o }) }, s.key) : /* @__PURE__ */ e.jsx(a.TableHead, { children: s.label }, s.key)),
          _ && /* @__PURE__ */ e.jsx(a.TableHead, { className: "cms:w-px", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: t("Order") }) }),
          z && /* @__PURE__ */ e.jsx(a.TableHead, { className: "cms:w-px", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: t("Restore") }) })
        ] }) }),
        /* @__PURE__ */ e.jsxs(a.TableBody, { children: [
          n.data.length === 0 && /* @__PURE__ */ e.jsx(a.TableRow, { className: "cms:hover:bg-transparent", children: /* @__PURE__ */ e.jsxs(a.TableCell, { colSpan: ue, className: "cms:h-32 cms:text-center cms:text-muted-foreground", children: [
            /* @__PURE__ */ e.jsx(Le, { trashed: f, filtered: X(f ? { ...l, status: "" } : l) > 0, canCreate: !!h?.create, createUrl: `${v}/create`, onClear: Q }),
            !f && /* @__PURE__ */ e.jsx("div", { className: "cms:mt-2", children: /* @__PURE__ */ e.jsx(a.TrashHint, { count: S, onShow: () => p({ status: "trashed" }) }) })
          ] }) }),
          n.data.map((s, o) => /* @__PURE__ */ e.jsxs(a.TableRow, { className: f ? "sunrice-row-in cms:text-muted-foreground" : "sunrice-row-in", style: { "--i": o }, "data-state": j.includes(s.id) ? "selected" : void 0, children: [
            w.length > 0 && /* @__PURE__ */ e.jsx(a.TableCell, { children: /* @__PURE__ */ e.jsx(
              a.Checkbox,
              {
                "aria-label": t("Select :title", { title: s.title }),
                checked: j.includes(s.id),
                onCheckedChange: (g) => B(g ? [...j, s.id] : j.filter(($) => $ !== s.id))
              }
            ) }),
            /* @__PURE__ */ e.jsxs(a.TableCell, { children: [
              /* @__PURE__ */ e.jsx(
                m.Link,
                {
                  href: C(`cms/collections/${r.handle}/entries/${s.id}/edit${l.locale !== D ? `?locale=${encodeURIComponent(l.locale)}` : ""}`),
                  className: "cms:font-medium cms:underline-offset-4 cms:hover:underline",
                  children: s.title
                }
              ),
              (!l.columns.includes("slug") && s.path || s.parent) && /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: [l.columns.includes("slug") ? null : s.path, s.parent ? t("under :parent", { parent: s.parent }) : null].filter(Boolean).join(" · ") })
            ] }),
            L.map((g) => /* @__PURE__ */ e.jsx(a.TableCell, { className: g.key === "status" ? "" : "cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx("div", { className: "cms:max-w-72 cms:truncate", children: /* @__PURE__ */ e.jsx(De, { row: s, column: g }) }) }, g.key)),
            _ && /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:w-px", children: /* @__PURE__ */ e.jsxs("span", { className: "cms:flex", children: [
              /* @__PURE__ */ e.jsx(a.Button, { variant: "ghost", size: "icon", "aria-label": t("Move :title up", { title: s.title }), onClick: () => m.router.post(C(`cms/entries/${s.id}/move`), { direction: "up" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(le, {}) }),
              /* @__PURE__ */ e.jsx(a.Button, { variant: "ghost", size: "icon", "aria-label": t("Move :title down", { title: s.title }), onClick: () => m.router.post(C(`cms/entries/${s.id}/move`), { direction: "down" }, { preserveScroll: !0 }), children: /* @__PURE__ */ e.jsx(ee, {}) })
            ] }) }),
            z && /* @__PURE__ */ e.jsx(a.TableCell, { className: "cms:w-px", children: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:justify-end cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs(
                a.Button,
                {
                  variant: "outline",
                  size: "sm",
                  "aria-label": t("Restore :title", { title: s.title }),
                  onClick: () => m.router.post(C(`cms/entries/${s.id}/restore`), {}, { preserveScroll: !0 }),
                  children: [
                    /* @__PURE__ */ e.jsx(ve, {}),
                    " ",
                    t("Restore")
                  ]
                }
              ),
              /* @__PURE__ */ e.jsxs(
                a.Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "cms:text-destructive cms:hover:text-destructive",
                  "aria-label": t("Permanently delete :title", { title: s.title }),
                  onClick: () => A(
                    t("Permanently delete :title? This can't be undone.", { title: s.title }),
                    () => m.router.post(`${v}/bulk`, { action: "delete", ids: [s.id] }, { preserveScroll: !0 }),
                    t("Delete")
                  ),
                  children: [
                    /* @__PURE__ */ e.jsx(be, {}),
                    " ",
                    t("Permanently delete")
                  ]
                }
              )
            ] }) })
          ] }, s.id))
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4 cms:border-t cms:px-6 cms:py-3 cms:text-sm cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-4", children: [
          /* @__PURE__ */ e.jsx("span", { children: n.total === 0 ? t("No entries") : t(":from–:to of :total", { from: n.from, to: n.to, total: n.total }) }),
          /* @__PURE__ */ e.jsxs(a.Select, { value: String(l.perPage), onValueChange: (s) => {
            oe(Number(s)), p({ perPage: Number(s) });
          }, children: [
            /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:h-8 cms:w-auto", "aria-label": t("Entries per page"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(a.SelectContent, { children: x.map((s) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: String(s), children: t(":count per page", { count: s }) }, s)) })
          ] })
        ] }),
        n.lastPage > 1 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
          /* @__PURE__ */ e.jsx("span", { children: t("Page :page of :last", { page: n.currentPage, last: n.lastPage }) }),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              variant: "outline",
              size: "icon",
              className: "cms:size-8",
              "aria-label": t("Previous page"),
              disabled: !n.prev_page_url,
              onClick: () => n.prev_page_url && m.router.get(n.prev_page_url, {}, { preserveScroll: !0 }),
              children: /* @__PURE__ */ e.jsx(Se, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Button,
            {
              variant: "outline",
              size: "icon",
              className: "cms:size-8",
              "aria-label": t("Next page"),
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
function I({ label: r, value: c, options: n, onChange: l }) {
  return /* @__PURE__ */ e.jsxs(a.Select, { value: c === "" ? R : c, onValueChange: (i) => l(i === R ? "" : i), children: [
    /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-auto cms:min-w-40 cms:max-w-72", title: r, "aria-label": r, children: /* @__PURE__ */ e.jsx(a.SelectValue, { placeholder: r }) }),
    /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
      /* @__PURE__ */ e.jsx(a.SelectItem, { value: R, children: t(":filter: all", { filter: r }) }),
      n.map((i) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: i.value, children: i.label }, i.value))
    ] })
  ] });
}
function G({ label: r, sortKey: c, sort: n, onSort: l }) {
  const i = _e(n, c);
  return /* @__PURE__ */ e.jsx(a.TableHead, { "aria-sort": i === "asc" ? "ascending" : i === "desc" ? "descending" : void 0, children: /* @__PURE__ */ e.jsxs(
    "button",
    {
      type: "button",
      onClick: () => l(ye(n, c)),
      className: "cms:-ml-2 cms:inline-flex cms:h-8 cms:items-center cms:gap-1 cms:rounded-md cms:px-2 cms:hover:bg-accent cms:hover:text-accent-foreground",
      children: [
        r,
        i === "asc" ? /* @__PURE__ */ e.jsx(le, { className: "cms:size-3" }) : i === "desc" ? /* @__PURE__ */ e.jsx(ee, { className: "cms:size-3" }) : /* @__PURE__ */ e.jsx(te, { className: "cms:size-3 cms:opacity-40" })
      ]
    }
  ) });
}
function De({ row: r, column: c }) {
  switch (c.key) {
    case "slug":
      return /* @__PURE__ */ e.jsx("span", { className: "cms:font-mono", children: r.slug });
    case "status":
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-1", children: [
        r.trashed ? /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", className: "cms:text-destructive", title: t(":status before it was trashed", { status: V(r.status) }), children: t("Trashed") }) : /* @__PURE__ */ e.jsx(J, { status: r.status, changes: r.changes }),
        r.locales.length > 1 && r.locales.filter((n) => !n.main).map((n) => {
          const l = Be(n);
          return /* @__PURE__ */ e.jsxs(
            a.Badge,
            {
              variant: l.variant,
              className: l.className,
              title: t(":language: :status", { language: H(n.code), status: l.title }),
              "aria-label": t(":language: :status", { language: H(n.code), status: l.title }),
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
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: M(r.publishedAt) });
    case "updated_at":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: M(r.updatedAt) });
    case "created_at":
      return /* @__PURE__ */ e.jsx(e.Fragment, { children: M(r.createdAt) });
    default:
      return /* @__PURE__ */ e.jsx("span", { title: r.cells[c.key] ?? void 0, children: r.cells[c.key] ?? "—" });
  }
}
function Be(r) {
  return r.status === null ? { variant: "outline", className: "cms:border-dashed cms:text-muted-foreground", word: t("missing"), title: t("not translated") } : r.outdated ? { variant: "warning", className: "", word: t("outdated"), title: t(":status, outdated: the main language changed since", { status: V(r.status) }) } : r.status === "published" ? { variant: "secondary", className: "", word: null, title: t("Live") } : { variant: "outline", className: "", word: r.status === "scheduled" ? t("scheduled") : t("draft"), title: V(r.status) };
}
function Le({ trashed: r, filtered: c, canCreate: n, createUrl: l, onClear: i }) {
  return c ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: t("Nothing matches these filters.") }),
    /* @__PURE__ */ e.jsxs(a.Button, { variant: "outline", size: "sm", onClick: i, children: [
      /* @__PURE__ */ e.jsx(Y, {}),
      " ",
      t("Clear filters")
    ] })
  ] }) : r ? /* @__PURE__ */ e.jsx(e.Fragment, { children: t("The trash is empty.") }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("span", { children: t("No entries yet.") }),
    n && /* @__PURE__ */ e.jsx(a.Button, { size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs(m.Link, { href: l, children: [
      /* @__PURE__ */ e.jsx(Z, {}),
      " ",
      t("Write the first one")
    ] }) })
  ] });
}
export {
  We as default
};
