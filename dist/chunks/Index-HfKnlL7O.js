import { a as u, t, j as e, r as o, f as A } from "./admin-CtU9_6Av.js";
import { c as E, _ as g } from "./createLucideIcon-Ccbp7F45.js";
import { u as a } from "./ui-Dh5wfMwT.js";
import { u as M, T as y } from "./Confirm-Wmgv4eCv.js";
import { F as U } from "./FieldError-Bao8rVy4.js";
import { S as H } from "./search-3zKi7F1_.js";
import { C as B } from "./check-OeKFYRnl.js";
import { U as _, S as T, M as I } from "./undo-2-CBzqSKK6.js";
import { R as P } from "./rotate-ccw-BcgdCn0y.js";
import { E as L } from "./external-link-CFxEu4M4.js";
import { P as V } from "./pencil-D-dwWCMx.js";
import { C as q } from "./chevron-left-usCQl1qw.js";
import { C as O } from "./chevron-right-9qVV6b-Q.js";
const D = {
  name: "message-square",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
        key: "18887p"
      }
    ]
  ]
};
D.node;
const Y = E(D), W = () => [
  { value: "all", label: t("All") },
  { value: "pending", label: t("Pending") },
  { value: "approved", label: t("Approved") },
  { value: "spam", label: t("Spam") },
  { value: "trashed", label: t("Trash") }
], G = (n) => ({ pending: t("Pending"), approved: t("Approved"), spam: t("Spam") })[n];
function ie({ tab: n, counts: m, filters: i, collections: p, comments: l, can: d, errors: C = {} }) {
  a.useBreadcrumbs([{ label: t("Comments"), href: u("cms/comments") }]);
  const [h, b] = g.useState(i.search), [c, v] = g.useState([]), [j, S] = g.useState(null), [z, F] = M(), f = (s) => {
    const r = { status: n, search: i.search, collection: i.collection, ...s };
    o.router.get(u("cms/comments"), {
      ...r.status !== "all" ? { status: r.status } : {},
      ...r.search ? { search: r.search } : {},
      ...r.collection ? { collection: r.collection } : {},
      ...i.entry ? { entry: i.entry } : {}
    }, { preserveState: !0, replace: !0, onSuccess: () => v([]) });
  };
  g.useEffect(() => {
    if (h === i.search) return;
    const s = window.setTimeout(() => f({ search: h }), 300);
    return () => window.clearTimeout(s);
  }, [h]);
  const N = (s, r = {}) => o.router.post(u(s), r, { preserveScroll: !0, onSuccess: () => v([]) }), k = (s, r) => N(`cms/comments/${s.id}/status`, { status: r }), x = (s) => {
    const r = () => N("cms/comments/bulk", { action: s, ids: c });
    s === "delete" ? z(c.length === 1 ? t("Permanently delete 1 comment? This can't be undone.") : t("Permanently delete :count comments? This can't be undone.", { count: c.length }), r) : r();
  }, R = l.data.length > 0 && c.length === l.data.length;
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(o.Head, { title: t("Comments") }),
    /* @__PURE__ */ e.jsx(a.PageHeader, { title: t("Comments") }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:relative cms:w-full cms:sm:w-64", children: [
        /* @__PURE__ */ e.jsx(H, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" }),
        /* @__PURE__ */ e.jsx(
          a.Input,
          {
            type: "search",
            placeholder: t("Search text, name or email"),
            "aria-label": t("Search comments"),
            className: "cms:pl-9",
            value: h,
            onChange: (s) => b(s.target.value)
          }
        )
      ] }),
      p.length > 1 && /* @__PURE__ */ e.jsxs(a.Select, { value: i.collection ?? "all", onValueChange: (s) => f({ collection: s === "all" ? null : s }), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { className: "cms:w-48", "aria-label": t("Collection"), children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsxs(a.SelectContent, { children: [
          /* @__PURE__ */ e.jsx(a.SelectItem, { value: "all", children: t("Every collection") }),
          p.map((s) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: s.handle, children: s.title }, s.handle))
        ] })
      ] })
    ] }),
    i.entry !== null && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
      t("Comments on one entry."),
      " ",
      /* @__PURE__ */ e.jsx("button", { type: "button", className: "cms:underline cms:underline-offset-4", onClick: () => o.router.get(u("cms/comments")), children: t("Show all") })
    ] }),
    /* @__PURE__ */ e.jsx(a.Tabs, { value: n, onValueChange: (s) => f({ status: s }), children: /* @__PURE__ */ e.jsx(a.TabsList, { className: "cms:h-auto cms:flex-wrap cms:justify-start", children: W().map((s) => /* @__PURE__ */ e.jsxs(a.TabsTrigger, { value: s.value, title: s.value === "all" ? t("Everything but the trash") : void 0, children: [
      s.label,
      " ",
      /* @__PURE__ */ e.jsx("span", { className: "cms:ml-1 cms:text-muted-foreground", children: m[s.value] })
    ] }, s.value)) }) }),
    c.length > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2 cms:text-sm", role: "toolbar", "aria-label": t("With the selected comments"), children: [
      /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", children: t(":count selected", { count: c.length }) }),
      d.moderate && n !== "trashed" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "outline", onClick: () => x("approve"), children: [
          /* @__PURE__ */ e.jsx(B, {}),
          " ",
          t("Approve")
        ] }),
        /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "outline", onClick: () => x("unapprove"), children: [
          /* @__PURE__ */ e.jsx(_, {}),
          " ",
          t("Unapprove")
        ] }),
        /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "outline", onClick: () => x("spam"), children: [
          /* @__PURE__ */ e.jsx(T, {}),
          " ",
          t("Spam")
        ] })
      ] }),
      d.delete && n !== "trashed" && /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "outline", onClick: () => x("trash"), children: [
        /* @__PURE__ */ e.jsx(y, {}),
        " ",
        t("Move to trash")
      ] }),
      d.delete && n === "trashed" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "outline", onClick: () => x("restore"), children: [
          /* @__PURE__ */ e.jsx(P, {}),
          " ",
          t("Restore")
        ] }),
        /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "destructive", onClick: () => x("delete"), children: [
          /* @__PURE__ */ e.jsx(y, {}),
          " ",
          t("Permanently delete")
        ] })
      ] })
    ] }),
    l.data.length === 0 ? /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:items-center cms:gap-3 cms:rounded-xl cms:border cms:border-dashed cms:px-6 cms:py-16 cms:text-center", children: [
      /* @__PURE__ */ e.jsx("span", { className: "cms:grid cms:size-10 cms:place-items-center cms:rounded-full cms:bg-muted cms:text-muted-foreground", children: /* @__PURE__ */ e.jsx(Y, { className: "cms:size-4" }) }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: i.search ? t("No comments match.") : t("No comments here.") }),
      n !== "trashed" && /* @__PURE__ */ e.jsx(a.TrashHint, { count: m.trashed ?? 0, onShow: () => f({ status: "trashed" }) })
    ] }) : /* @__PURE__ */ e.jsxs(a.Card, { className: "cms:divide-y cms:p-0", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3 cms:px-4 cms:py-2 cms:text-sm cms:text-muted-foreground", children: [
        /* @__PURE__ */ e.jsx(a.Checkbox, { checked: R, "aria-label": t("Select all"), onCheckedChange: (s) => v(s ? l.data.map((r) => r.id) : []) }),
        /* @__PURE__ */ e.jsx("span", { children: t(":from–:to of :total", { from: l.from, to: l.to, total: l.total }) })
      ] }),
      l.data.map((s) => /* @__PURE__ */ e.jsxs("article", { className: "cms:flex cms:gap-3 cms:px-4 cms:py-4", "aria-labelledby": `comment-${s.id}-author`, children: [
        /* @__PURE__ */ e.jsx(
          a.Checkbox,
          {
            checked: c.includes(s.id),
            "aria-label": t("Select :author's comment", { author: s.author }),
            onCheckedChange: (r) => v(r ? [...c, s.id] : c.filter(($) => $ !== s.id))
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-x-3 cms:gap-y-1 cms:text-sm", children: [
            /* @__PURE__ */ e.jsx("span", { id: `comment-${s.id}-author`, className: "cms:font-medium", children: s.author }),
            s.email && /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground", children: s.email }),
            s.member && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", children: t("Signed in") }),
            !s.trashed && /* @__PURE__ */ e.jsx(a.Badge, { variant: s.status === "approved" ? "success" : s.status === "spam" ? "destructive" : "warning", children: G(s.status) }),
            /* @__PURE__ */ e.jsxs("span", { className: "cms:text-muted-foreground", children: [
              s.createdAt ? A(s.createdAt) : "",
              " · ",
              s.locale.toUpperCase()
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
            t("On"),
            " ",
            s.entry.url ? /* @__PURE__ */ e.jsxs("a", { href: s.entry.url, target: "_blank", rel: "noreferrer", className: "cms:underline-offset-4 hover:cms:underline", children: [
              s.entry.title,
              " ",
              /* @__PURE__ */ e.jsx(L, { className: "cms:inline cms:size-3" })
            ] }) : s.entry.title,
            s.parent && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              " · ",
              t("replying to :author: “:excerpt”", { author: s.parent.author, excerpt: s.parent.excerpt })
            ] })
          ] }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:whitespace-pre-wrap cms:break-words", children: s.body }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-1", children: [
            d.moderate && !s.trashed && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              s.status !== "approved" && /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => k(s, "approved"), children: [
                /* @__PURE__ */ e.jsx(B, {}),
                " ",
                t("Approve")
              ] }),
              s.status === "approved" && /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => k(s, "pending"), children: [
                /* @__PURE__ */ e.jsx(_, {}),
                " ",
                t("Unapprove")
              ] }),
              s.status !== "spam" && /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => k(s, "spam"), children: [
                /* @__PURE__ */ e.jsx(T, {}),
                " ",
                t("Spam")
              ] }),
              s.status !== "spam" && /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => S({ row: s, mode: "reply" }), children: [
                /* @__PURE__ */ e.jsx(I, {}),
                " ",
                t("Reply")
              ] }),
              /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => S({ row: s, mode: "edit" }), children: [
                /* @__PURE__ */ e.jsx(V, {}),
                " ",
                t("Edit")
              ] })
            ] }),
            d.delete && !s.trashed && /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => o.router.delete(u(`cms/comments/${s.id}`), { preserveScroll: !0 }), children: [
              /* @__PURE__ */ e.jsx(y, {}),
              " ",
              t("Move to trash")
            ] }),
            d.delete && s.trashed && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => N(`cms/comments/${s.id}/restore`), children: [
                /* @__PURE__ */ e.jsx(P, {}),
                " ",
                t("Restore")
              ] }),
              /* @__PURE__ */ e.jsxs(a.Button, { size: "sm", variant: "ghost", onClick: () => z(
                t("Permanently delete this comment? Replies to it stay."),
                () => o.router.delete(u(`cms/comments/${s.id}/force`), { preserveScroll: !0 })
              ), children: [
                /* @__PURE__ */ e.jsx(y, {}),
                " ",
                t("Permanently delete")
              ] })
            ] })
          ] })
        ] })
      ] }, s.id))
    ] }),
    (l.prev_page_url || l.next_page_url) && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:justify-end cms:gap-2", children: [
      /* @__PURE__ */ e.jsxs(a.Button, { variant: "outline", size: "sm", disabled: !l.prev_page_url, onClick: () => l.prev_page_url && o.router.get(l.prev_page_url), children: [
        /* @__PURE__ */ e.jsx(q, {}),
        " ",
        t("Newer")
      ] }),
      /* @__PURE__ */ e.jsxs(a.Button, { variant: "outline", size: "sm", disabled: !l.next_page_url, onClick: () => l.next_page_url && o.router.get(l.next_page_url), children: [
        t("Older"),
        " ",
        /* @__PURE__ */ e.jsx(O, {})
      ] })
    ] }),
    j && /* @__PURE__ */ e.jsx(J, { row: j.row, mode: j.mode, error: C.body, onClose: () => S(null) }, `${j.mode}-${j.row.id}`),
    F
  ] });
}
function J({ row: n, mode: m, error: i, onClose: p }) {
  const [l, d] = g.useState(m === "edit" ? n.body : ""), [C, h] = g.useState(!1), b = () => {
    h(!0);
    const c = { preserveScroll: !0, onSuccess: p, onFinish: () => h(!1) };
    m === "reply" ? o.router.post(u(`cms/comments/${n.id}/reply`), { body: l }, c) : o.router.put(u(`cms/comments/${n.id}`), { body: l }, c);
  };
  return /* @__PURE__ */ e.jsx(a.Dialog, { open: !0, onOpenChange: (c) => !c && p(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: m === "reply" ? t("Reply to :author", { author: n.author }) : t("Edit :author's comment", { author: n.author }) }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: m === "reply" ? n.status === "pending" ? t("Your reply is published at once, and approves this comment.") : t("Your reply is published at once, under your name.") : t("Fix a typo or remove a link.") })
    ] }),
    m === "reply" && /* @__PURE__ */ e.jsx("p", { className: "cms:max-h-32 cms:overflow-auto cms:whitespace-pre-wrap cms:text-sm cms:text-muted-foreground", children: n.body }),
    /* @__PURE__ */ e.jsx(
      a.Textarea,
      {
        "aria-label": m === "reply" ? t("Your reply") : t("Comment"),
        rows: 5,
        value: l,
        "aria-invalid": i !== void 0,
        onChange: (c) => d(c.target.value)
      }
    ),
    /* @__PURE__ */ e.jsx(U, { message: i }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: p, children: t("Cancel") }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", disabled: l.trim() === "" || C, onClick: b, children: m === "reply" ? t("Post reply") : t("Save") })
    ] })
  ] }) });
}
export {
  ie as default
};
