import { t, j as e, r as n, a as h, l as V } from "./admin-t_knV6mj.js";
import { c as M, _ as g } from "./createLucideIcon-Ccbp7F45.js";
import { u as r } from "./ui-Dh5wfMwT.js";
import { u as A, T as S } from "./Confirm-C0rNMqlH.js";
import { c as $, r as F } from "./tree-B7sRX6dH.js";
import { S as G } from "./settings-2-0VUe76YZ.js";
import { L as q } from "./layout-template-RwJXNfEY.js";
import { P as k } from "./plus-COqahUZ2.js";
import { S as J } from "./search-3zKi7F1_.js";
import { E as K } from "./external-link-CFxEu4M4.js";
import { R as Q } from "./rotate-ccw-BcgdCn0y.js";
import { P as W } from "./pencil-D-dwWCMx.js";
const D = {
  name: "ellipsis",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
    ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
    ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
  ],
  aliases: ["more-horizontal"]
};
D.node;
const X = M(D);
const _ = {
  name: "list-tree",
  size: 24,
  node: [
    ["path", { d: "M8 5h13", key: "1pao27" }],
    ["path", { d: "M13 12h8", key: "h98zly" }],
    ["path", { d: "M13 19h8", key: "c3s6r1" }],
    ["path", { d: "M3 10a2 2 0 0 0 2 2h3", key: "1npucw" }],
    ["path", { d: "M3 5v12a2 2 0 0 0 2 2h3", key: "x1gjn2" }]
  ]
};
_.node;
const Y = M(_);
function B(c) {
  return c.usedByCount ?? (c.usedBy ?? []).length;
}
function I(c) {
  const m = (c.usedBy ?? []).slice(0, 5), o = Math.max(B(c), m.length);
  if (o === 0) return "";
  const p = m.join("; ");
  return ` ${o > m.length ? t("It's used by :list and :count more.", { list: p, count: o - m.length }) : t("It's used by :list.", { list: p })}`;
}
function de({ taxonomy: c, taxonomies: m, terms: o, locales: p, locale: d, trashed: i = !1, trashedCount: z = 0 }) {
  r.useBreadcrumbs([{ label: c ? c.title : t("Terms") }]);
  const [w, R] = A(), [b, E] = g.useState(""), [a, N] = g.useState(o);
  if (g.useEffect(() => N(o), [o]), !c)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(n.Head, { title: t("Terms") }),
      /* @__PURE__ */ e.jsx(r.PageHeader, { title: t("Terms"), description: t("There are no taxonomies yet. Create one under Structure → Taxonomies (categories, tags…), then add its terms here.") })
    ] });
  const u = h(`cms/taxonomies/${c.handle}/terms`), C = (s) => h(`cms/taxonomies/${c.handle}/terms/${s.id}/edit`) + `?locale=${encodeURIComponent(d)}`, P = (s, l) => {
    const x = l.map((j) => a[j].id);
    N(F(a, s, l)), n.router.post(
      h("cms/terms/reorder"),
      { taxonomy: c.handle, ids: x, parent_id: s < 0 ? null : a[s].id },
      { preserveScroll: !0, preserveState: !0, onError: () => N(o) }
    );
  }, U = (s) => w(
    t('Move ":title" to the trash, with the terms under it? It comes off the site; you can restore it.', { title: s.fallback }) + I(s),
    () => n.router.delete(h(`cms/terms/${s.id}`), { preserveScroll: !0 }),
    t("Move to trash")
  ), y = b.trim().toLowerCase(), f = y === "" ? null : a.filter((s) => `${s.title ?? s.fallback} ${s.slug ?? ""}`.toLowerCase().includes(y)), H = c.collections ?? [], v = (s, l, x) => /* @__PURE__ */ e.jsxs("div", { className: `${L} cms:border-t cms:border-border/60 cms:px-3 cms:py-2`, children: [
    /* @__PURE__ */ e.jsx("span", { className: "cms:flex cms:justify-center", children: l && !i && /* @__PURE__ */ e.jsx(r.SortableHandle, { ...l, label: t("Move :title", { title: s.fallback }) }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-center cms:gap-2", style: { paddingLeft: x * 20 }, children: [
      x > 0 && /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", "aria-hidden": !0, children: "└" }),
      i ? /* @__PURE__ */ e.jsx("span", { className: "cms:truncate cms:font-medium", children: s.title ?? s.fallback }) : (
        // The term's editor, in the language shown (untranslated: give it a title there to add it).
        /* @__PURE__ */ e.jsx(n.Link, { href: C(s), className: "cms:truncate cms:text-left cms:font-medium cms:underline-offset-4 cms:hover:underline", children: s.title ?? /* @__PURE__ */ e.jsx("span", { className: "cms:font-normal cms:text-muted-foreground cms:italic", children: t(":title · not translated", { title: s.fallback }) }) })
      ),
      s.url && /* @__PURE__ */ e.jsx("a", { href: s.url, target: "_blank", rel: "noopener noreferrer", className: "cms:text-muted-foreground cms:hover:text-foreground", "aria-label": t("View page"), title: t("View page"), children: /* @__PURE__ */ e.jsx(K, { className: "cms:size-3.5" }) })
    ] }),
    /* @__PURE__ */ e.jsx("code", { className: "cms:hidden cms:truncate cms:text-xs cms:text-muted-foreground cms:md:block", children: s.slug ?? "—" }),
    /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:text-sm cms:text-muted-foreground cms:tabular-nums cms:md:block", children: s.entries ?? 0 }),
    /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:text-sm cms:text-muted-foreground cms:md:block", children: Z(s.createdAt) }),
    /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:justify-end", children: i ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-1", children: [
      /* @__PURE__ */ e.jsxs(r.Button, { variant: "outline", size: "sm", onClick: () => n.router.post(h(`cms/terms/${s.id}/restore`), {}, { preserveScroll: !0 }), children: [
        /* @__PURE__ */ e.jsx(Q, {}),
        " ",
        t("Restore")
      ] }),
      /* @__PURE__ */ e.jsxs(
        r.Button,
        {
          variant: "ghost",
          size: "sm",
          className: "cms:text-destructive",
          onClick: () => w(
            t('Permanently delete ":title" in every language? Entries lose it.', { title: s.fallback }) + I(s),
            () => n.router.delete(h(`cms/terms/${s.id}/force`), { preserveScroll: !0, data: B(s) > 0 ? { force: 1 } : {} })
          ),
          children: [
            /* @__PURE__ */ e.jsx(S, {}),
            " ",
            t("Permanently delete")
          ]
        }
      )
    ] }) : /* @__PURE__ */ e.jsxs(r.DropdownMenu, { children: [
      /* @__PURE__ */ e.jsx(r.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(r.Button, { variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": t("Actions for :title", { title: s.fallback }), children: /* @__PURE__ */ e.jsx(X, {}) }) }),
      /* @__PURE__ */ e.jsxs(r.DropdownMenuContent, { align: "end", children: [
        /* @__PURE__ */ e.jsx(r.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(n.Link, { href: C(s), children: [
          /* @__PURE__ */ e.jsx(W, {}),
          " ",
          t("Edit")
        ] }) }),
        c.hierarchical && s.title !== null && /* @__PURE__ */ e.jsx(r.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(n.Link, { href: `${u}/create?locale=${encodeURIComponent(d)}&parent=${s.id}`, children: [
          /* @__PURE__ */ e.jsx(k, {}),
          " ",
          t("Add a term under it")
        ] }) }),
        /* @__PURE__ */ e.jsx(r.DropdownMenuSeparator, {}),
        /* @__PURE__ */ e.jsxs(r.DropdownMenuItem, { className: "cms:text-destructive", onSelect: () => U(s), children: [
          /* @__PURE__ */ e.jsx(S, {}),
          " ",
          t("Move to trash")
        ] })
      ] })
    ] }) })
  ] }), T = (s) => /* @__PURE__ */ e.jsx(r.SortableList, { items: $(a, s), getId: (l) => a[l].id, getLabel: (l) => a[l].title ?? a[l].fallback, disabled: i, onReorder: (l) => P(s, l), className: "cms:gap-0", children: (l, { handle: x, isOverlay: j }) => /* @__PURE__ */ e.jsxs("div", { className: j ? "cms:rounded-md cms:bg-card cms:shadow-md" : "", children: [
    v(a[l], x, a[l].depth),
    !j && !i && $(a, l).length > 0 && T(l)
  ] }) });
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
    /* @__PURE__ */ e.jsx(n.Head, { title: c.title }),
    R,
    /* @__PURE__ */ e.jsx(
      r.PageHeader,
      {
        title: i ? /* @__PURE__ */ e.jsx(r.TrashTitle, { children: c.title }) : c.title,
        primary: !i && /* @__PURE__ */ e.jsx(r.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(n.Link, { href: `${u}/create?locale=${encodeURIComponent(d)}`, children: [
          /* @__PURE__ */ e.jsx(k, {}),
          " ",
          t("New term")
        ] }) }),
        menu: [
          ...H.map((s) => ({ label: s.title, href: s.url, group: t("Used by collections") })),
          ...(c.indexPages ?? []).map((s) => ({ label: s.collection === null ? t("Index page") : t("Index page: :collection", { collection: s.title }), href: s.url, icon: /* @__PURE__ */ e.jsx(Y, {}), group: t("Pages") })),
          ...c.settings ? [{ label: t("Taxonomy settings"), href: c.settings, icon: /* @__PURE__ */ e.jsx(G, {}), group: t("Structure") }] : [],
          ...c.blueprint ? [{ label: t("Edit blueprint"), href: c.blueprint, icon: /* @__PURE__ */ e.jsx(q, {}), group: t("Structure") }] : []
        ],
        children: m.length > 1 && /* @__PURE__ */ e.jsxs(r.Select, { value: c.handle, onValueChange: (s) => n.router.get(h(`cms/taxonomies/${s}/terms`)), children: [
          /* @__PURE__ */ e.jsx(r.SelectTrigger, { className: "cms:w-48", "aria-label": t("Taxonomy"), children: /* @__PURE__ */ e.jsx(r.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(r.SelectContent, { children: m.map((s) => /* @__PURE__ */ e.jsx(r.SelectItem, { value: s.handle, children: s.title }, s.handle)) })
        ] })
      }
    ),
    i && /* @__PURE__ */ e.jsx(r.TrashBanner, { items: t("terms"), onBack: () => n.router.get(u, { locale: d }), backLabel: t("Back to terms") }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:max-w-xs", children: [
        /* @__PURE__ */ e.jsx(J, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          r.Input,
          {
            className: "cms:pl-9",
            placeholder: t("Search terms…"),
            "aria-label": t("Search terms"),
            value: b,
            onChange: (s) => E(s.target.value)
          }
        )
      ] }),
      p.length > 1 && /* @__PURE__ */ e.jsxs(r.Select, { value: d, onValueChange: (s) => n.router.get(u, { locale: s, ...i ? { status: "trashed" } : {} }), children: [
        /* @__PURE__ */ e.jsx(r.SelectTrigger, { className: "cms:w-40", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(r.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(r.SelectContent, { children: p.map((s) => /* @__PURE__ */ e.jsx(r.SelectItem, { value: s, children: V(s) }, s)) })
      ] }),
      !i && /* @__PURE__ */ e.jsxs(r.Button, { variant: "ghost", className: "cms:ml-auto cms:order-last", onClick: () => n.router.get(u, { locale: d, status: "trashed" }), children: [
        /* @__PURE__ */ e.jsx(S, {}),
        " ",
        t("Trash")
      ] }),
      !i && a.length > 1 && !f && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: c.hierarchical ? t("Drag terms to set their order; a term's parent is set in its editor (Under).") : t("Drag terms to set their order.") })
    ] }),
    /* @__PURE__ */ e.jsxs(r.Card, { className: "cms:gap-0 cms:overflow-hidden cms:py-0", children: [
      /* @__PURE__ */ e.jsxs("div", { className: `${L} cms:bg-muted/60 cms:px-3 cms:py-2.5 cms:text-sm cms:font-medium cms:text-muted-foreground`, children: [
        /* @__PURE__ */ e.jsx("span", {}),
        /* @__PURE__ */ e.jsx("span", { children: t("Title") }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:md:block", children: t("Slug") }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:md:block", children: t("Entries") }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:hidden cms:md:block", children: t("Created") }),
        /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: t("Actions") })
      ] }),
      a.length === 0 ? /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:border-t cms:border-border/60 cms:p-10 cms:text-center cms:text-muted-foreground", children: i ? t("The trash is empty.") : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        t("No terms yet."),
        /* @__PURE__ */ e.jsx(r.Button, { size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs(n.Link, { href: `${u}/create?locale=${encodeURIComponent(d)}`, children: [
          /* @__PURE__ */ e.jsx(k, {}),
          " ",
          t("New term")
        ] }) }),
        /* @__PURE__ */ e.jsx(r.TrashHint, { count: z, onShow: () => n.router.get(u, { locale: d, status: "trashed" }) })
      ] }) }) : f ? f.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:border-t cms:border-border/60 cms:p-8 cms:text-center cms:text-muted-foreground", children: t("No terms match “:search”.", { search: b }) }) : f.map((s) => /* @__PURE__ */ e.jsx(g.Fragment, { children: v(s, null, 0) }, s.id)) : i ? a.map((s) => /* @__PURE__ */ e.jsx(g.Fragment, { children: v(s, null, 0) }, s.id)) : T(-1)
    ] })
  ] });
}
const L = "cms:grid cms:items-center cms:gap-3 cms:grid-cols-[1.5rem_1fr_2.5rem] cms:md:grid-cols-[1.5rem_minmax(0,2fr)_minmax(0,1.2fr)_5rem_7rem_2.5rem]";
function Z(c) {
  if (!c) return "—";
  const m = new Date(c);
  return Number.isNaN(m.getTime()) ? "—" : m.toLocaleDateString(document.documentElement.lang || void 0, { day: "numeric", month: "short", year: "numeric" });
}
export {
  de as default
};
