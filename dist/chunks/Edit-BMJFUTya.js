import { j as e, t as s, f as y, a as $, r as p, b as de, d as Te, s as Q, l as M, c as Be, e as Me, g as _e } from "./admin-D8w3Ih7q.js";
import { c as V, _ as N } from "./createLucideIcon-Ccbp7F45.js";
import { u as a } from "./ui-Dh5wfMwT.js";
import { u as Pe } from "./Confirm-D-4qtSiN.js";
import { S as Ee, T as Ae } from "./SlugNote-o5OC0159.js";
import { E as Fe } from "./EntriesPicker-BeYNoSdl.js";
import { C as me } from "./check-OeKFYRnl.js";
import { S as ze, M as Ie, U as ne } from "./undo-2-CBzqSKK6.js";
import { F as Le } from "./FieldSections-CIJr-f5c.js";
import { C as Re, w as Oe, x as Ue, b as qe, h as Ke, y as Ve } from "./FieldInput-B0EIykHK.js";
import { s as He } from "./seo-Uu0c2psJ.js";
import { F } from "./FieldError-DGX_mF_G.js";
import { E as We } from "./external-link-CFxEu4M4.js";
import { R as Ye } from "./rotate-ccw-BcgdCn0y.js";
import { T as ie } from "./trash-DHN6ewjn.js";
import { E as Ge, L as Je } from "./layout-template-DgadsRJI.js";
import { C as Qe } from "./copy-BT7TBOUx.js";
import { L as ue } from "./loader-circle-ByksABXO.js";
import { P as Xe } from "./plus-COqahUZ2.js";
const he = {
  name: "calendar-clock",
  size: 24,
  node: [
    ["path", { d: "M16 14v2.2l1.6 1", key: "fo4ql5" }],
    ["path", { d: "M16 2v3", key: "otl347" }],
    ["path", { d: "M21 7.338V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2.338", key: "7hb8p4" }],
    ["path", { d: "M3 9h5.859", key: "numkqi" }],
    ["path", { d: "M8 2v3", key: "1ioesn" }],
    ["circle", { cx: "16", cy: "16", r: "6", key: "qoo3c4" }]
  ]
};
he.node;
const X = V(he);
const pe = {
  name: "eye",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
        key: "1nclc0"
      }
    ],
    ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
  ]
};
pe.node;
const Ze = V(pe);
const xe = {
  name: "languages",
  size: 24,
  node: [
    ["path", { d: "m5 8 6 6", key: "1wu5hv" }],
    ["path", { d: "m4 14 6-6 2-3", key: "1k1g8d" }],
    ["path", { d: "M2 5h12", key: "or177f" }],
    ["path", { d: "M7 2h1", key: "1t2jsx" }],
    ["path", { d: "m22 22-5-10-5 10", key: "don7ne" }],
    ["path", { d: "M14 18h6", key: "1m8k6r" }]
  ]
};
xe.node;
const re = V(xe);
const ge = {
  name: "send",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
        key: "1ffxy3"
      }
    ],
    ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
  ]
};
ge.node;
const es = V(ge), ce = { preserveScroll: !0, preserveState: !0 };
function ss({ entryId: c, comments: n }) {
  const [u, x] = N.useState(null), [h, t] = N.useState(""), [m, g] = N.useState(!1), d = (o, k) => p.router.post($(`cms/comments/${o}/status`), { status: k }, ce), r = (o) => p.router.post($(`cms/comments/${o}/reply`), { body: h }, {
    ...ce,
    onStart: () => g(!0),
    onFinish: () => g(!1),
    onSuccess: () => {
      x(null), t("");
    }
  });
  return /* @__PURE__ */ e.jsx(
    a.CollapsibleCard,
    {
      title: s("Comments"),
      titleClassName: "cms:text-base",
      storageKey: "cms:entry:comments",
      contentClassName: "cms:flex cms:flex-col cms:gap-3 cms:text-sm",
      headerAction: n && n.counts.pending > 0 ? /* @__PURE__ */ e.jsx(a.Badge, { children: s(":count pending", { count: n.counts.pending }) }) : void 0,
      children: n ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: s(":approved approved · :pending pending · :spam spam", { approved: n.counts.approved, pending: n.counts.pending, spam: n.counts.spam }) }),
        n.latest.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: s("No comments yet.") }),
        n.latest.map((o) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5 cms:border-t cms:border-border/70 cms:pt-3 cms:first-of-type:border-t-0 cms:first-of-type:pt-0", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium", children: o.author }),
            o.status === "pending" && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", children: s("Pending") })
          ] }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:line-clamp-3 cms:break-words cms:whitespace-pre-line", children: o.excerpt }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
            y(o.createdAt),
            o.reply ? ` · ${s("a reply")}` : ""
          ] }),
          n.canModerate && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-1", children: [
            o.status === "pending" && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => d(o.id, "approved"), children: [
              /* @__PURE__ */ e.jsx(me, {}),
              " ",
              s("Approve")
            ] }),
            /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => d(o.id, "spam"), children: [
              /* @__PURE__ */ e.jsx(ze, {}),
              " ",
              s("Spam")
            ] }),
            /* @__PURE__ */ e.jsxs(
              a.Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                "aria-expanded": u === o.id,
                onClick: () => {
                  x(u === o.id ? null : o.id), t("");
                },
                children: [
                  /* @__PURE__ */ e.jsx(Ie, {}),
                  " ",
                  s("Reply")
                ]
              }
            )
          ] }),
          u === o.id && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              a.Textarea,
              {
                "aria-label": s("Reply to :author", { author: o.author }),
                rows: 3,
                value: h,
                onChange: (k) => t(k.target.value)
              }
            ),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
              /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "sm", disabled: h.trim() === "" || m, onClick: () => r(o.id), children: s("Post reply") }),
              /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => x(null), children: s("Cancel") })
            ] })
          ] })
        ] }, o.id)),
        /* @__PURE__ */ e.jsx("a", { href: $(`cms/comments?entry=${c}`), className: "cms:text-sm cms:font-medium cms:underline-offset-4 cms:hover:underline", children: s("All comments on this entry") })
      ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-10" }),
        /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-10" })
      ] })
    }
  );
}
function oe(c) {
  if (c.length === 0) return "";
  const n = c.slice(0, 5).map((u) => u.label).join("; ");
  return ` ${c.length > 5 ? s("It's used by :list and :count more: those links will show nothing.", { list: n, count: c.length - 5 }) : s("It's used by :list: those links will show nothing.", { list: n })}`;
}
function Ts(c) {
  const { entry: n } = c;
  return /* @__PURE__ */ e.jsx(ts, { ...c }, n ? `${n.id}:${n.locale}:${n.version}:${n.status}:${n.trashed}:${n.publishedAt}` : "new");
}
function ts({ collection: c, fields: n, locales: u = [], shared: x = [], sharedValues: h = {}, entry: t, values: m, revisions: g, comments: d, termLabels: r, usedBy: o = [], undoRestore: k = null, machineTranslate: T = null, machineTranslateMissing: P = !1, settings: b, blueprints: be = [], blueprintUrl: H = null, homepage: E, redirectsUrl: je = null, templates: ve = null, can: j }) {
  const z = $(`cms/collections/${c.handle}/entries`), v = t ? $(`cms/entries/${t.id}`) : z, W = t ? m.title : s("New entry");
  a.useBreadcrumbs([{ label: c.title, href: z }, { label: W }]);
  const [I, we] = Pe(), [Ne, L] = N.useState(!1), Y = t?.publishedAt ? de(new Date(t.publishedAt)) : "", [Z, ee] = N.useState(Y);
  N.useEffect(() => ee(Y), [Y]);
  const [ke, se] = N.useState(null), [Ce, G] = N.useState(!1), i = p.useForm({
    ...m,
    seo: m.seo ?? {},
    locale: t?.locale ?? null,
    version: t?.version ?? null,
    publish: !1,
    published_at: null,
    parent_id: b?.parentId ?? null,
    template: b?.template ?? "",
    comments_closed: b?.commentsClosed === !0
  }), te = (l) => i.setData((f) => ({ ...f, ...l })), A = t ? { locale: t.locale } : {}, B = u.find((l) => l.main)?.code, w = i.errors, O = p.usePage().props.errors ?? {}, U = (l) => {
    const f = Ve(w, l);
    f.length > 0 && i.clearErrors(...f);
  }, _ = t !== null && t.status !== "draft" && !t.hasUnpublishedChanges && !i.isDirty, q = Te(t?.status ?? "draft", Z, t?.publishedAt ?? null), ae = t === null ? j.create : j.update && !t.trashed, R = t?.status === "scheduled", le = (l) => {
    if (b || t === null) return l;
    const { parent_id: f, template: D, comments_closed: os, ...$e } = l;
    return $e;
  }, J = (l = !1, f = null) => {
    i.transform((D) => ({ ...le(D), publish: l, published_at: f })), t ? i.put(v, { preserveScroll: !0, onSuccess: () => L(!1) }) : i.post(v);
  }, Se = () => {
    i.transform((l) => ({ ...le(l), version: null, publish: !1, published_at: null })), i.put(v, { preserveScroll: !0 });
  }, C = a.useEditLock({
    type: "cms.entry",
    id: t?.id,
    locale: t?.locale,
    enabled: t !== null && ae,
    noun: s("entry"),
    leaveTo: z,
    getUnsaved: () => i.isDirty ? { title: i.data.title, slug: i.data.slug, data: i.data.data, seo: i.data.seo } : null
  }), S = ae && !C.readOnly, De = async (l) => {
    const f = await C.loadKept(l);
    i.setData((D) => ({ ...D, title: f.title ?? D.title, slug: f.slug ?? D.slug, data: f.data ?? D.data, seo: f.seo ?? D.seo }));
  };
  a.useUnsavedChanges(i.isDirty && !C.takenOver, S ? () => i.processing || J() : void 0);
  const ye = () => {
    const l = () => p.router.post(`${v}/review`, A, { preserveScroll: !0 });
    i.isDirty ? (i.transform((f) => ({ ...f, publish: !1, published_at: null })), i.put(v, { preserveScroll: !0, onSuccess: l })) : l();
  }, K = (l = null) => {
    j.update ? J(!0, l) : t && p.router.post(`${v}/publish`, { ...A, published_at: l }, { preserveScroll: !0, onSuccess: () => L(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (l) => {
    l.preventDefault(), J();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(p.Head, { title: W }),
    we,
    C.dialogs,
    /* @__PURE__ */ e.jsxs(
      a.PageHeader,
      {
        title: W,
        back: { href: z, label: s("Back to :title", { title: c.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          t && !t.trashed && c.pages !== !1 && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs(
            "a",
            {
              href: t.previewUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              title: i.isDirty ? s("Shows the saved draft: save first to see your changes.") : s("Shows the saved draft."),
              children: [
                /* @__PURE__ */ e.jsx(Ze, {}),
                " ",
                s("Preview")
              ]
            }
          ) }),
          t?.url && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: t.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(We, {}),
            " ",
            s("View page")
          ] }) }),
          t?.trashed && j.delete && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", onClick: () => p.router.post(`${v}/restore`, {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(Ye, {}),
            " ",
            s("Restore")
          ] }),
          t?.trashed && j.delete && /* @__PURE__ */ e.jsxs(
            a.Button,
            {
              type: "button",
              variant: "outline",
              className: "cms:text-destructive",
              onClick: () => I(
                s(`Permanently delete ":title" in every language, with its revisions? This can't be undone.`, { title: m.title }) + oe(o),
                () => p.router.delete(`${v}/force`, { data: o.length > 0 ? { force: 1 } : {} })
              ),
              children: [
                /* @__PURE__ */ e.jsx(ie, {}),
                " ",
                s("Permanently delete")
              ]
            }
          ),
          t && !t.trashed && (j.create || j.delete && !C.readOnly || S && T !== null || H) && /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "icon", "aria-label": s("More actions"), children: /* @__PURE__ */ e.jsx(Ge, {}) }) }),
            /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", className: "cms:min-w-52", children: [
              S && T !== null && /* @__PURE__ */ e.jsxs(
                a.DropdownMenuItem,
                {
                  disabled: i.processing || i.isDirty,
                  title: i.isDirty ? void 0 : s("Fill in what isn't translated yet, into the draft"),
                  onSelect: () => p.router.post($(`cms/entries/${t.id}/translations/${t.locale}/translate`), { version: t.version }, { preserveScroll: !0 }),
                  children: [
                    /* @__PURE__ */ e.jsx(re, {}),
                    " ",
                    i.isDirty ? s("Save to translate") : s("Translate from :language", { language: u.find((l) => l.main)?.name ?? (B ? M(B) : s("the main language")) })
                  ]
                }
              ),
              j.create && /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { title: s("Copy every language as a new draft"), onSelect: () => p.router.post(`${v}/duplicate`), children: [
                /* @__PURE__ */ e.jsx(Qe, {}),
                " ",
                s("Duplicate")
              ] }),
              H && /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(p.Link, { href: H, children: [
                /* @__PURE__ */ e.jsx(Je, {}),
                " ",
                s("Edit blueprint")
              ] }) }),
              j.delete && !C.readOnly && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
                /* @__PURE__ */ e.jsxs(
                  a.DropdownMenuItem,
                  {
                    className: "cms:text-destructive",
                    onSelect: () => I(s('Move ":title" to the trash? It comes off the site; you can restore it.', { title: m.title }) + oe(o), () => p.router.delete(v), s("Move to trash")),
                    children: [
                      /* @__PURE__ */ e.jsx(ie, {}),
                      " ",
                      s("Move to trash")
                    ]
                  }
                )
              ] })
            ] })
          ] }),
          t && S && P && /* @__PURE__ */ e.jsxs("span", { title: s("Machine translation isn't set up on this site: ask your developer (SUNRICE_TRANSLATE_DRIVER, see Help → Developer docs → Machine translation)."), children: [
            /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", disabled: !0, "aria-describedby": "machine-translate-missing", children: [
              /* @__PURE__ */ e.jsx(re, {}),
              " ",
              s("Translate from :language", { language: u.find((l) => l.main)?.name ?? (B ? M(B) : s("the main language")) })
            ] }),
            /* @__PURE__ */ e.jsx("span", { id: "machine-translate-missing", className: "cms:sr-only", children: s("Machine translation isn't set up on this site: ask your developer.") })
          ] }),
          S && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", variant: t ? "outline" : "default", disabled: i.processing, children: [
            i.processing && /* @__PURE__ */ e.jsx(ue, { className: "cms:animate-spin" }),
            t ? s("Save draft") : s("Create draft")
          ] }),
          t && !t.trashed && S && !j.publish && (t.status === "draft" || t.hasUnpublishedChanges || i.isDirty) && /* @__PURE__ */ e.jsxs(
            a.Button,
            {
              type: "button",
              disabled: i.processing,
              onClick: ye,
              title: t.review ? s("Already sent; sending again tells them again") : s("Ask those who can publish to review it"),
              children: [
                /* @__PURE__ */ e.jsx(es, {}),
                " ",
                t.review ? s("Send for review again") : s("Submit for review")
              ]
            }
          ),
          t && !t.trashed && j.publish && !C.readOnly && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex", children: [
            R && _ ? /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", className: "cms:rounded-r-none", disabled: i.processing, title: s("Change the date"), onClick: () => L(!0), children: [
              /* @__PURE__ */ e.jsx(X, {}),
              " ",
              s("Scheduled for :date", { date: y(t.publishedAt) })
            ] }) : /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: _ ? "outline" : "default", className: "cms:rounded-r-none cms:disabled:opacity-100", disabled: i.processing || _, onClick: () => K(q.at), children: [
              _ && /* @__PURE__ */ e.jsx(me, { className: "cms:text-emerald-600 cms:dark:text-emerald-400" }),
              _ ? s("Published") : q.action === "schedule" ? s("Schedule") : q.action === "backdate" ? s("Publish now, back-dated") : t.status === "draft" ? s("Publish") : s("Publish changes")
            ] }),
            /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
              /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "icon", variant: _ ? "outline" : "default", className: _ ? "cms:-ml-px cms:rounded-l-none" : "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": s("More publishing options"), children: /* @__PURE__ */ e.jsx(Re, {}) }) }),
              /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", children: [
                /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { onSelect: () => L(!0), children: [
                  /* @__PURE__ */ e.jsx(X, {}),
                  " ",
                  R ? s("Change the date…") : s("Publish on a date…")
                ] }),
                R && /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => K((/* @__PURE__ */ new Date()).toISOString()), children: s("Publish now") }),
                t.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
                  /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => p.router.post(`${v}/unpublish`, A, { preserveScroll: !0 }), children: R ? s("Unschedule (back to draft)") : s("Unpublish") })
                ] })
              ] })
            ] })
          ] })
        ] }),
        children: [
          t && /* @__PURE__ */ e.jsx(a.Badge, { variant: t.status === "published" ? "success" : "secondary", children: t.trashed ? s("In the trash") : Q(t.status) }),
          t?.review && !t.trashed && /* @__PURE__ */ e.jsx(a.Badge, { variant: "warning", title: t.review.by ? s(":name sent it on :date", { name: t.review.by, date: y(t.review.requestedAt) }) : s("Sent on :date", { date: y(t.review.requestedAt) }), children: s("Waiting for review") }),
          i.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: s("Unsaved changes") })
        ]
      }
    ),
    t && u.length > 1 && /* @__PURE__ */ e.jsx(
      ls,
      {
        entryUrl: v,
        editUrl: `${z}/${t.id}/edit`,
        current: t.locale,
        locales: u,
        canAdd: (j.create || j.translate === !0) && !t.trashed,
        canRemove: j.delete && !t.isMain && !t.trashed,
        onRemove: () => I(
          s('Remove the :language translation of ":title"? Its revisions go with it.', { language: M(t.locale), title: m.title }),
          () => p.router.delete(`${v}/translations/${t.locale}`)
        )
      }
    ),
    /* @__PURE__ */ e.jsx(a.ViewingNotice, { by: C.viewingBy, onTakeOver: C.requestTakeOver }),
    /* @__PURE__ */ e.jsx(a.KeptEditsNotice, { kept: C.kept, disabled: !S, onLoad: (l) => {
      De(l);
    }, onDiscard: (l) => {
      C.discardKept(l);
    } }),
    w.version && /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: [
      /* @__PURE__ */ e.jsx("span", { children: w.version }),
      /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => p.router.reload(), children: s("Load theirs") }),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            type: "button",
            variant: "destructive",
            size: "sm",
            disabled: i.processing,
            onClick: () => I(s("Save your version over theirs? Their changes are replaced (their earlier published versions stay in the revisions)."), Se),
            children: s("Save mine anyway")
          }
        )
      ] })
    ] }),
    (w.entry || w.published_at || O.published_at || O.homepage) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: w.entry ?? w.published_at ?? O.published_at ?? O.homepage }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_18rem]", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsx(a.CardContent, { children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: !S, className: "cms:grid cms:gap-4 cms:md:grid-cols-[2fr_1fr]", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "title", children: s("Title") }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "title",
                value: i.data.title,
                "aria-invalid": w.title !== void 0,
                onChange: (l) => {
                  const f = l.target.value;
                  i.setData((D) => ({ ...D, title: f, slug: Be(D.slug, D.title, f, t !== null && t.publishedAt === null && t.status === "draft") })), U("title");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(F, { message: w.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "slug", children: s("Slug") }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "slug",
                className: "cms:font-mono",
                value: i.data.slug,
                placeholder: s("Made from the title"),
                "aria-invalid": w.slug !== void 0,
                onChange: (l) => {
                  i.setData("slug", l.target.value), U("slug");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(Ee, { note: Me(t?.publishedSlug, i.data.slug, t !== null && t.status !== "draft"), redirectsUrl: je }),
            /* @__PURE__ */ e.jsx(F, { message: w.slug })
          ] })
        ] }) }) }),
        /* @__PURE__ */ e.jsx(Oe.Provider, { value: Array.isArray(r) || !r ? {} : r, children: /* @__PURE__ */ e.jsx(
          Le,
          {
            disabled: !S,
            fields: n,
            values: i.data.data,
            errors: w,
            storageKey: `cms:entry:${c.handle}`,
            shared: x,
            sharedValues: h,
            sharedNote: B ? s("Shared by all languages: the greyed-out fields are edited in :language.", { language: M(B) }) : s("Shared by all languages: the greyed-out fields are edited in the main language."),
            onChange: (l, f) => {
              i.setData("data", { ...i.data.data, [l]: f }), U(`data.${l}`);
            }
          }
        ) }),
        /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: s("SEO"), description: s("How this entry appears in search results and shared links."), titleClassName: "cms:text-base", storageKey: "cms:entry:seo", hasErrors: Ke(w, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !S, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(
          Ue,
          {
            bare: !0,
            id: "seo",
            fields: He(),
            value: i.data.seo,
            errors: qe(w, "seo"),
            onChange: (l) => {
              i.setData("seo", l), U("seo");
            }
          }
        ) }) })
      ] }),
      !t && c.hierarchical && /* @__PURE__ */ e.jsx("aside", { className: "cms:flex cms:flex-col cms:gap-4", children: /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: "Page settings", titleClassName: "cms:text-base", storageKey: "cms:entry:page-settings", hasErrors: w.parent_id !== void 0, children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !S, className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: /* @__PURE__ */ e.jsx(fe, { collection: c, value: i.data.parent_id, error: w.parent_id, onChange: (l) => te({ parent_id: l }) }) }) }) }),
      t && /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:flex-col cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: s("Status"), titleClassName: "cms:text-base", storageKey: "cms:entry:status", contentClassName: "cms:flex cms:flex-col cms:gap-3 cms:text-sm", children: [
          /* @__PURE__ */ e.jsxs("dl", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-3", children: [
              /* @__PURE__ */ e.jsx("dt", { className: "cms:text-muted-foreground", children: s("Status") }),
              /* @__PURE__ */ e.jsx("dd", { children: /* @__PURE__ */ e.jsx(a.Badge, { variant: t.status === "published" ? "success" : "secondary", children: t.trashed ? s("In the trash") : Q(t.status) }) })
            ] }),
            t.status !== "draft" && t.publishedAt && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:justify-between cms:gap-3", children: [
              /* @__PURE__ */ e.jsx("dt", { className: "cms:text-muted-foreground", children: t.status === "scheduled" ? s("Scheduled for") : s("Published") }),
              /* @__PURE__ */ e.jsx("dd", { className: "cms:text-right cms:tabular-nums", children: y(t.publishedAt) })
            ] })
          ] }),
          t.review && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-muted-foreground", children: [
            t.review.by ? s("Sent for review by :name · :date.", { name: t.review.by, date: y(t.review.requestedAt) }) : s("Sent for review · :date.", { date: y(t.review.requestedAt) }),
            j.publish ? ` ${s("Publishing it answers the request.")}` : ""
          ] }),
          t.review && !t.trashed && (t.review.mine || j.publish && !C.readOnly) && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: [
            j.publish && !C.readOnly && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", disabled: i.processing, onClick: () => G(!0), children: [
              /* @__PURE__ */ e.jsx(ne, {}),
              " ",
              s("Send back…")
            ] }),
            t.review.mine && /* @__PURE__ */ e.jsx(
              a.Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                disabled: i.processing,
                title: s("Take the request back, to keep working on it"),
                onClick: () => p.router.post(`${v}/review/withdraw`, A, { preserveScroll: !0 }),
                children: s("Withdraw the request")
              }
            )
          ] }),
          !t.trashed && j.publish && !C.readOnly && /* @__PURE__ */ e.jsx(
            ns,
            {
              status: t.status,
              value: Z,
              onChange: ee,
              dated: q,
              processing: i.processing,
              onPublish: (l) => K(l),
              onUnpublish: () => p.router.post(`${v}/unpublish`, A, { preserveScroll: !0 })
            }
          ),
          t.status !== "draft" && t.hasUnpublishedChanges && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: s("The draft has changes the site doesn't show yet.") }),
          E?.is && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: s("This is the site's homepage.") }),
          E && !E.is && E.can && t.status === "published" && !t.trashed && /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "cms:mt-1 cms:self-start",
              onClick: () => I(
                (E.current ? s('Make ":title" the homepage? Visitors to / will see it instead of ":current".', { title: m.title, current: E.current }) : s('Make ":title" the homepage? Visitors to / will see it.', { title: m.title })) + " " + s("Its own address will lead to / as well."),
                () => p.router.post(`${v}/homepage`, {}, { preserveScroll: !0 }),
                s("Make this the homepage")
              ),
              children: s("Make this the homepage")
            }
          ),
          u.find((l) => l.code === t.locale)?.outdated && /* @__PURE__ */ e.jsx("p", { className: "cms:text-amber-700 cms:dark:text-amber-400", children: B ? s("The :language version changed since this translation was last saved.", { language: M(B) }) : s("The main version changed since this translation was last saved.") })
        ] }),
        /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: s("Used by"), titleClassName: "cms:text-base", storageKey: "cms:entry:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          o.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: s("No other content links here.") }),
          o.map((l) => /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
            l.url ? /* @__PURE__ */ e.jsx("a", { href: l.url, className: "cms:block cms:truncate cms:underline-offset-4 cms:hover:underline", children: l.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:truncate", children: l.label }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", title: l.field, children: l.fieldLabel ?? l.field })
          ] }, `${l.label}:${l.field}`))
        ] }),
        b && /* @__PURE__ */ e.jsx(
          cs,
          {
            entryUrl: v,
            collection: c,
            settings: b,
            templates: ve,
            blueprints: be,
            disabled: !S,
            values: i.data,
            errors: w,
            onChange: te,
            draftDirty: i.isDirty
          }
        ),
        d !== null && c.comments && /* @__PURE__ */ e.jsx(ss, { entryId: t.id, comments: d }),
        /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: s("Revisions"), titleClassName: "cms:text-base", storageKey: "cms:entry:revisions", contentClassName: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
          k !== null && j.update && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => p.router.post($(`cms/entries/${t.id}/translations/${t.locale}/undo-restore`), {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(ne, {}),
            " ",
            s("Undo the restore")
          ] }),
          /* @__PURE__ */ e.jsx(p.Deferred, { data: "revisions", fallback: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-8" }),
            /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-8" })
          ] }), children: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            (g ?? []).length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: s("Each publish keeps one.") }),
            (g ?? []).map((l) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1 cms:border-b cms:border-border/60 cms:pb-2 cms:last:border-b-0 cms:last:pb-0", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
                /* @__PURE__ */ e.jsx("div", { className: "cms:truncate", children: l.title }),
                /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
                  y(l.createdAt),
                  l.author ? ` · ${l.author}` : ""
                ] }),
                /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: l.changed === null ? s("First kept version") : l.changed.length === 0 ? s("No field changed") : s("Changed: :fields", { fields: l.changed.join(", ") }) })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-1", children: [
                /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => se(l), children: s("Compare") }),
                j.update && !t.trashed && /* @__PURE__ */ e.jsx(
                  a.Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    onClick: () => p.router.post($(`cms/entries/${t.id}/revisions/${l.id}/restore`), {}, { preserveScroll: !0 }),
                    children: s("Restore")
                  }
                )
              ] })
            ] }, l.id))
          ] }) })
        ] })
      ] })
    ] }),
    t?.review && /* @__PURE__ */ e.jsx(
      as,
      {
        open: Ce,
        onClose: () => G(!1),
        by: t.review.by,
        onSend: (l, f) => p.router.post(`${v}/review/send-back`, { ...A, note: l }, { preserveScroll: !0, onSuccess: () => {
          G(!1), f();
        }, onError: f })
      }
    ),
    /* @__PURE__ */ e.jsx(rs, { entryId: t?.id ?? 0, revision: ke, onClose: () => se(null), dirty: i.isDirty }),
    /* @__PURE__ */ e.jsx(
      is,
      {
        open: Ne,
        onClose: () => L(!1),
        processing: i.processing,
        rescheduling: R,
        current: t?.publishedAt ?? null,
        onSchedule: (l) => K(l)
      }
    )
  ] });
}
function as({ open: c, onClose: n, by: u, onSend: x }) {
  const [h, t] = N.useState(""), [m, g] = N.useState(!1), d = p.usePage().props.errors ?? {};
  return N.useEffect(() => {
    c && t("");
  }, [c]), /* @__PURE__ */ e.jsx(a.Dialog, { open: c, onOpenChange: (r) => !r && !m && n(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: s("Send back without publishing") }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: u ? s(":name gets an email with your note, and the request is cleared. The draft stays as it is.", { name: u }) : s("The one who asked gets an email with your note, and the request is cleared. The draft stays as it is.") })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "send-back-note", children: s("Note (optional)") }),
      /* @__PURE__ */ e.jsx(
        a.Textarea,
        {
          id: "send-back-note",
          rows: 4,
          maxLength: 2e3,
          value: h,
          placeholder: s("What to change before it can be published"),
          "aria-invalid": d.note !== void 0,
          onChange: (r) => t(r.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(F, { message: d.note })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", disabled: m, onClick: n, children: s("Cancel") }),
      /* @__PURE__ */ e.jsxs(a.Button, { type: "button", disabled: m, onClick: () => {
        g(!0), x(h, () => g(!1));
      }, children: [
        m && /* @__PURE__ */ e.jsx(ue, { className: "cms:animate-spin" }),
        " ",
        s("Send back")
      ] })
    ] })
  ] }) });
}
function ls({ entryUrl: c, editUrl: n, current: u, locales: x, canAdd: h, canRemove: t, onRemove: m }) {
  const g = x.filter((r) => r.status !== null), d = x.filter((r) => r.status === null);
  return /* @__PURE__ */ e.jsxs("nav", { "aria-label": s("Languages"), className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("div", { className: "cms:inline-flex cms:items-center cms:gap-0.5 cms:rounded-md cms:bg-muted cms:p-0.5", children: g.map((r) => {
      const o = r.code === u, k = r.main ? s(":language (main)", { language: r.name ?? M(r.code) }) : r.name ?? M(r.code), T = r.status ? Q(r.status) : "", P = r.outdated ? s(":language: :status, outdated (the main language changed since)", { language: k, status: T }) : s(":language: :status", { language: k, status: T });
      return /* @__PURE__ */ e.jsxs(
        "button",
        {
          type: "button",
          title: P,
          "aria-label": P,
          "aria-current": o ? "page" : void 0,
          onClick: () => !o && p.router.get(n, { locale: r.code }),
          className: `cms:relative cms:inline-flex cms:h-7 cms:min-w-10 cms:items-center cms:justify-center cms:gap-1.5 cms:rounded cms:px-2.5 cms:text-xs cms:font-semibold cms:tracking-wide cms:uppercase cms:transition-colors ${o ? "cms:bg-card cms:text-foreground cms:shadow-xs" : "cms:text-muted-foreground cms:hover:text-foreground"}`,
          children: [
            r.code,
            (r.outdated || r.status === "published") && /* @__PURE__ */ e.jsx("span", { "aria-hidden": !0, className: `cms:size-1.5 cms:rounded-full ${r.outdated ? "cms:bg-amber-500" : "cms:bg-emerald-500"}` })
          ]
        },
        r.code
      );
    }) }),
    h && d.map((r) => /* @__PURE__ */ e.jsxs(
      a.Button,
      {
        type: "button",
        variant: "outline",
        size: "sm",
        className: "cms:h-8 cms:border-dashed cms:text-xs cms:uppercase",
        title: s("Add :language", { language: r.name ?? M(r.code) }),
        onClick: () => p.router.post(`${c}/translations`, { locale: r.code }),
        children: [
          /* @__PURE__ */ e.jsx(Xe, {}),
          " ",
          r.code
        ]
      },
      r.code
    )),
    t && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:ml-auto cms:text-destructive", onClick: m, children: s("Remove this language") })
  ] });
}
function ns({ status: c, value: n, onChange: u, dated: x, processing: h, onPublish: t, onUnpublish: m }) {
  const g = x.action !== "now", d = {
    now: s("Publish"),
    schedule: c === "scheduled" ? s("Reschedule") : s("Schedule"),
    backdate: s("Publish now, back-dated"),
    redate: s("Change date")
  }[x.action];
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:border-t cms:border-border/60 cms:pt-3", children: [
    /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "entry-published-at", children: s("Publish date") }),
    /* @__PURE__ */ e.jsx(a.DatePicker, { id: "entry-published-at", withTime: !0, className: "cms:max-w-none", value: n || null, onChange: (r) => u(r ?? "") }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: c === "draft" ? s("Empty: now. A date in the future schedules it.") : s("The date shown as published. A date in the future takes it off the site until then.") }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: [
      (c === "draft" || g) && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", size: "sm", disabled: h, onClick: () => t(x.at), children: [
        /* @__PURE__ */ e.jsx(X, {}),
        " ",
        d
      ] }),
      c !== "draft" && /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "sm", variant: "outline", disabled: h, onClick: m, children: s("Unpublish") })
    ] })
  ] });
}
function is({ open: c, onClose: n, onSchedule: u, current: x, processing: h, rescheduling: t }) {
  const [m, g] = N.useState("");
  N.useEffect(() => {
    c && g(de(_e(x)));
  }, [c, x]);
  const d = m === "" ? null : new Date(m), r = d !== null && d.getTime() <= Date.now();
  return /* @__PURE__ */ e.jsx(a.Dialog, { open: c, onOpenChange: (o) => !o && n(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: t ? s("Change the publish date") : s("Publish on a date") }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: s("The entry goes live then.") })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "published-at", children: s("Date and time") }),
      /* @__PURE__ */ e.jsx(a.DatePicker, { id: "published-at", withTime: !0, required: !0, className: "cms:max-w-none", value: m || null, onChange: (o) => g(o ?? "") }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s("In your time zone.") }),
      r && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-amber-700 cms:dark:text-amber-400", children: s("This date has passed: the entry goes live now, dated :date.", { date: y(d.toISOString()) }) })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: n, children: s("Cancel") }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", disabled: d === null || h, onClick: () => d && u(d.toISOString()), children: r ? s("Publish now, back-dated") : t ? s("Change the date") : s("Schedule") })
    ] })
  ] }) });
}
function rs({ entryId: c, revision: n, onClose: u, dirty: x }) {
  const [h, t] = N.useState(null), [m, g] = N.useState(!1);
  return N.useEffect(() => {
    if (t(null), g(!1), !n) return;
    let d = !0;
    return fetch($(`cms/entries/${c}/revisions/${n.id}/compare`), { headers: { Accept: "application/json" }, credentials: "same-origin" }).then((r) => r.ok ? r.json() : Promise.reject(new Error(String(r.status)))).then((r) => {
      d && t(r.fields);
    }).catch(() => {
      d && g(!0);
    }), () => {
      d = !1;
    };
  }, [n, c]), /* @__PURE__ */ e.jsx(a.Dialog, { open: n !== null, onOpenChange: (d) => !d && u(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto cms:sm:max-w-2xl", children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: s("Compare with the draft") }),
      /* @__PURE__ */ e.jsxs(a.DialogDescription, { children: [
        n ? n.author ? s("The version published :date by :name, beside the saved draft.", { date: y(n.createdAt), name: n.author }) : s("The version published :date, beside the saved draft.", { date: y(n.createdAt) }) : "",
        x ? ` ${s("Your unsaved changes aren't included.")}` : ""
      ] })
    ] }),
    m && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: s("The comparison could not be loaded. Try again.") }),
    !m && h === null && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-12" }),
      /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-12" })
    ] }),
    h?.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s("The draft is the same as this version.") }),
    h && h.length > 0 && /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: h.map((d) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
      /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: d.label }),
      /* @__PURE__ */ e.jsxs("dd", { className: "cms:grid cms:gap-2 cms:sm:grid-cols-2", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:rounded-md cms:border cms:border-destructive/30 cms:bg-destructive/5 cms:p-2 cms:break-words cms:whitespace-pre-wrap", children: [
          /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:text-xs cms:text-muted-foreground", children: s("This version") }),
          d.revision || "—"
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:rounded-md cms:border cms:border-emerald-500/30 cms:bg-emerald-500/5 cms:p-2 cms:break-words cms:whitespace-pre-wrap", children: [
          /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:text-xs cms:text-muted-foreground", children: s("Draft") }),
          d.draft || "—"
        ] })
      ] })
    ] }, d.label)) }),
    /* @__PURE__ */ e.jsx(a.DialogFooter, { children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: u, children: s("Close") }) })
  ] }) });
}
function fe({ collection: c, value: n, error: u, onChange: x }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "parent", children: s("Parent") }),
    /* @__PURE__ */ e.jsx(
      Fe,
      {
        id: "parent",
        multiple: !1,
        max: 1,
        collections: [c.handle],
        invalid: u !== void 0,
        value: n,
        onChange: (h) => x(typeof h == "number" ? h : null)
      }
    ),
    /* @__PURE__ */ e.jsx(F, { message: u })
  ] });
}
function cs({ entryUrl: c, collection: n, settings: u, templates: x, blueprints: h, disabled: t, values: m, errors: g, onChange: d, draftDirty: r }) {
  const o = h.length > 1 ? u.blueprint ?? h[0].handle : void 0, k = p.useForm({ blueprint: o ?? "" }), T = k.errors.blueprint, P = ["parent_id", "template", "comments_closed"].some((b) => g[b] !== void 0) || T !== void 0;
  return /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: s("Page settings"), titleClassName: "cms:text-base", storageKey: "cms:entry:page-settings", hasErrors: P, children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: t, className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: [
    n.hierarchical && /* @__PURE__ */ e.jsx(fe, { collection: n, value: m.parent_id, error: g.parent_id, onChange: (b) => d({ parent_id: b }) }),
    h.length > 1 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "blueprint", children: s("Blueprint") }),
      /* @__PURE__ */ e.jsxs(a.Select, { value: k.data.blueprint, onValueChange: (b) => k.setData("blueprint", b), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: "blueprint", "aria-invalid": T !== void 0, children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(a.SelectContent, { children: h.map((b) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: b.handle, children: b.title }, b.handle)) })
      ] }),
      k.data.blueprint !== o && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: s("The fields change in every language; values of fields both blueprints have are kept. The editor reloads.") }),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            type: "button",
            size: "sm",
            disabled: k.processing || r,
            title: r ? s("Save your draft first") : void 0,
            onClick: () => k.put(`${c}/settings`, { preserveScroll: !0 }),
            children: s("Change blueprint")
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(F, { message: T })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "template", children: s("Template") }),
      /* @__PURE__ */ e.jsx(
        a.Input,
        {
          id: "template",
          className: "cms:font-mono",
          placeholder: `cms.${n.handle}-landing`,
          value: m.template,
          onChange: (b) => d({ template: b.target.value }),
          "aria-invalid": g.template !== void 0
        }
      ),
      /* @__PURE__ */ e.jsx(Ae, { example: `cms.${n.handle}-landing`, empty: s("Leave empty to use the collection's template."), value: m.template, lookup: x }),
      /* @__PURE__ */ e.jsx(F, { message: g.template })
    ] }),
    n.comments && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-3", children: [
      /* @__PURE__ */ e.jsx(a.Switch, { id: "comments-open", checked: !m.comments_closed, onCheckedChange: (b) => d({ comments_closed: !b }) }),
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "comments-open", children: s("Accept new comments") }),
      /* @__PURE__ */ e.jsx("a", { href: $(`cms/comments?entry=${c.split("/").slice(-1)[0]}`), className: "cms:ml-auto cms:text-muted-foreground cms:underline-offset-4 hover:cms:underline", children: s("Comments") })
    ] })
  ] }) });
}
export {
  Ts as default
};
