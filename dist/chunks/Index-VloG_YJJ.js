import { a as i, t, j as e, r as o, f } from "./admin-jLkZXlkF.js";
import { c as C, _ as w } from "./createLucideIcon-Ccbp7F45.js";
import { u as l } from "./ui-Dh5wfMwT.js";
import { u as S, T as _ } from "./Confirm-I-sLOJa0.js";
import { P as T } from "./plus-COqahUZ2.js";
import { D as y } from "./download-DA5N5mq4.js";
import { L as D } from "./layout-template-RwJXNfEY.js";
import { C as k } from "./chevron-left-usCQl1qw.js";
import { C as H } from "./chevron-right-9qVV6b-Q.js";
const j = {
  name: "inbox",
  size: 24,
  node: [
    ["polyline", { points: "22 12 16 12 14 15 10 15 8 12 2 12", key: "o97t9d" }],
    [
      "path",
      {
        d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
        key: "oot6mr"
      }
    ]
  ]
};
j.node;
const B = C(j), P = 3;
function E({ form: n, forms: h, submissions: a, can: u, createForm: m = null, blueprint: p = null }) {
  l.useBreadcrumbs([{ label: t("Submissions"), href: i("cms/submissions") }, ...n ? [{ label: n.title }] : []]);
  const [r, d] = w.useState(null), [g, v] = S();
  if (!n || !a)
    return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(o.Head, { title: t("Submissions") }),
      /* @__PURE__ */ e.jsx(l.PageHeader, { title: t("Submissions"), description: t("What visitors send through the site's forms.") }),
      /* @__PURE__ */ e.jsxs(l.Card, { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:px-6 cms:py-14 cms:text-center", children: [
        /* @__PURE__ */ e.jsx(B, { className: "cms:size-8 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
          /* @__PURE__ */ e.jsx("p", { className: "cms:font-medium", children: t("No forms yet") }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:max-w-sm cms:text-sm cms:text-muted-foreground", children: m ? t("Create a form, put it on a page, and what visitors send shows up here.") : t("Once someone creates a form and puts it on a page, what visitors send shows up here.") })
        ] }),
        m && /* @__PURE__ */ e.jsx(l.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(o.Link, { href: m, children: [
          /* @__PURE__ */ e.jsx(T, {}),
          " ",
          t("Create a form")
        ] }) })
      ] })
    ] });
  const x = (a.data[0]?.rows ?? []).slice(0, P), N = (s) => g(
    t("Permanently delete this submission? It can't be restored."),
    () => o.router.delete(i(`cms/submissions/${s.id}`), { preserveScroll: !0, onSuccess: () => d(null) })
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(o.Head, { title: t(":form submissions", { form: n.title }) }),
    /* @__PURE__ */ e.jsx(
      l.PageHeader,
      {
        title: n.title,
        menu: [
          ...a.total > 0 && u.export ? [{ label: t("Export CSV"), href: i(`cms/forms/${n.handle}/submissions/export`), download: !0, icon: /* @__PURE__ */ e.jsx(y, {}) }] : [],
          ...p ? [{ label: t("Edit blueprint"), href: p, icon: /* @__PURE__ */ e.jsx(D, {}) }] : []
        ],
        children: h.length > 1 && /* @__PURE__ */ e.jsxs(l.Select, { value: n.handle, onValueChange: (s) => o.router.get(i(`cms/forms/${s}/submissions`)), children: [
          /* @__PURE__ */ e.jsx(l.SelectTrigger, { className: "cms:w-56", "aria-label": t("Form"), children: /* @__PURE__ */ e.jsx(l.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(l.SelectContent, { children: h.map((s) => /* @__PURE__ */ e.jsxs(l.SelectItem, { value: s.handle, children: [
            s.title,
            " (",
            s.count,
            ")"
          ] }, s.handle)) })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(l.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(l.Table, { children: [
      /* @__PURE__ */ e.jsx(l.TableHeader, { children: /* @__PURE__ */ e.jsxs(l.TableRow, { children: [
        /* @__PURE__ */ e.jsx(l.TableHead, { children: t("Sent") }),
        x.map((s) => /* @__PURE__ */ e.jsx(l.TableHead, { children: s.label }, s.handle))
      ] }) }),
      /* @__PURE__ */ e.jsxs(l.TableBody, { children: [
        a.data.length === 0 && /* @__PURE__ */ e.jsx(l.TableRow, { children: /* @__PURE__ */ e.jsx(l.TableCell, { colSpan: x.length + 1, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: t("Nothing sent yet.") }) }),
        a.data.map((s) => /* @__PURE__ */ e.jsxs(l.TableRow, { children: [
          /* @__PURE__ */ e.jsx(l.TableCell, { className: "cms:whitespace-nowrap", children: /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:font-medium cms:hover:underline", onClick: () => d(s), children: f(s.createdAt) }) }),
          x.map((c) => /* @__PURE__ */ e.jsx(l.TableCell, { className: "cms:max-w-64 cms:truncate", children: s.rows.find((b) => b.handle === c.handle)?.value }, c.handle))
        ] }, s.id))
      ] })
    ] }) }),
    a.total > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:text-sm cms:text-muted-foreground", children: [
      /* @__PURE__ */ e.jsx("span", { children: t(":from–:to of :total", { from: a.from, to: a.to, total: a.total }) }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(
          l.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": t("Previous page"),
            disabled: !a.prev_page_url,
            onClick: () => a.prev_page_url && o.router.get(a.prev_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(k, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": t("Next page"),
            disabled: !a.next_page_url,
            onClick: () => a.next_page_url && o.router.get(a.next_page_url, {}, { preserveScroll: !0 }),
            children: /* @__PURE__ */ e.jsx(H, {})
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(l.Dialog, { open: r !== null, onOpenChange: (s) => !s && d(null), children: /* @__PURE__ */ e.jsxs(l.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto", children: [
      /* @__PURE__ */ e.jsxs(l.DialogHeader, { children: [
        /* @__PURE__ */ e.jsx(l.DialogTitle, { children: n.title }),
        /* @__PURE__ */ e.jsxs(l.DialogDescription, { children: [
          t("Sent :date", { date: f(r?.createdAt ?? null) }),
          " · ",
          r?.locale.toUpperCase()
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-3 cms:text-sm", children: r?.rows.map((s) => /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: s.label }),
        /* @__PURE__ */ e.jsx("dd", { className: "cms:whitespace-pre-wrap cms:break-words cms:text-muted-foreground", children: s.files && s.files.length > 0 ? /* @__PURE__ */ e.jsx("ul", { className: "cms:flex cms:flex-col cms:gap-1", children: s.files.map((c) => /* @__PURE__ */ e.jsx("li", { children: /* @__PURE__ */ e.jsx("a", { href: c.url, className: "cms:underline cms:underline-offset-4 hover:cms:text-foreground", download: !0, children: c.name }) }, c.url)) }) : s.file ? /* @__PURE__ */ e.jsx("a", { href: s.file, className: "cms:underline cms:underline-offset-4 hover:cms:text-foreground", download: !0, children: s.value }) : s.value || "—" })
      ] }, s.handle)) }),
      r && (r.visitor.ip || r.visitor.userAgent || r.visitor.referrer) && /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-3 cms:border-t cms:pt-3 cms:text-sm", children: [[t("IP address"), r.visitor.ip], [t("Browser"), r.visitor.userAgent], [t("Sent from"), r.visitor.referrer]].map(([s, c]) => c && /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: s }),
        /* @__PURE__ */ e.jsx("dd", { className: "cms:break-all cms:text-muted-foreground", children: c })
      ] }, s)) }),
      u.delete && r && /* @__PURE__ */ e.jsx(l.DialogFooter, { children: /* @__PURE__ */ e.jsxs(l.Button, { variant: "destructive", onClick: () => N(r), children: [
        /* @__PURE__ */ e.jsx(_, {}),
        " ",
        t("Delete")
      ] }) })
    ] }) }),
    v
  ] });
}
export {
  E as default
};
