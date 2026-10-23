import { j as e, t as s, f as N, a as M, r as v, b as Ne, d as Ke, e as He, l as L, c as Ye, g as We, h as Ge, s as Je, i as Qe, k as Xe } from "./admin-AwfaNzsU.js";
import { c as V, _ as k } from "./createLucideIcon-Ccbp7F45.js";
import { u as a } from "./ui-Dh5wfMwT.js";
import { u as Ze } from "./Confirm-Dy8jz4Je.js";
import { S as es, T as ss } from "./SlugNote-AnzpnY2G.js";
import { E as he, C as pe } from "./EntryStatus-D9z0E-cZ.js";
import { E as ts } from "./EntriesPicker-B9rLvnsr.js";
import { C as Ce } from "./check-OeKFYRnl.js";
import { S as as, M as ls, U as te } from "./undo-2-CBzqSKK6.js";
import { F as ns } from "./FieldSections-BKp60Le6.js";
import { C as is, w as rs, x as cs, b as os, h as ds, y as ms } from "./FieldInput-CXFpAw9T.js";
import { s as us } from "./seo-CpNaxZMX.js";
import { F as K } from "./FieldError-BD5SRSF-.js";
import { R as hs } from "./rotate-ccw-BcgdCn0y.js";
import { T as xe } from "./trash-DHN6ewjn.js";
import { L as ps } from "./link-2-BYZeXgi5.js";
import { C as Se } from "./copy-BT7TBOUx.js";
import { L as xs } from "./layout-template-RwJXNfEY.js";
import { L as ye } from "./loader-circle-ByksABXO.js";
import { E as gs } from "./external-link-CFxEu4M4.js";
import { P as fs } from "./plus-COqahUZ2.js";
const De = {
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
De.node;
const ae = V(De);
const $e = {
  name: "ellipsis-vertical",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
    ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
    ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }]
  ],
  aliases: ["more-vertical"]
};
$e.node;
const bs = V($e);
const Ae = {
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
Ae.node;
const vs = V(Ae);
const Be = {
  name: "git-compare",
  size: 24,
  node: [
    ["circle", { cx: "18", cy: "18", r: "3", key: "1xkwt0" }],
    ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
    ["path", { d: "M13 6h3a2 2 0 0 1 2 2v7", key: "1yeb86" }],
    ["path", { d: "M11 18H8a2 2 0 0 1-2-2V9", key: "19pyzm" }]
  ]
};
Be.node;
const js = V(Be);
const Me = {
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
Me.node;
const ge = V(Me);
const Te = {
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
Te.node;
const ws = V(Te);
function fe(l) {
  return l.match(/\n|[^\s]+[^\S\n]*|[^\S\n]+/g) ?? [];
}
const ks = 25e4;
function Ns(l, i) {
  if (l === i) return l === "" ? [] : [{ text: l, op: "same" }];
  const o = fe(l), u = fe(i);
  if (o.length * u.length > ks)
    return [...l ? [{ text: l, op: "removed" }] : [], ...i ? [{ text: i, op: "added" }] : []];
  const p = o.length + 1, t = u.length + 1, m = new Uint32Array(p * t);
  for (let g = o.length - 1; g >= 0; g--)
    for (let f = u.length - 1; f >= 0; f--)
      m[g * t + f] = o[g].trimEnd() === u[f].trimEnd() ? m[(g + 1) * t + f + 1] + 1 : Math.max(m[(g + 1) * t + f], m[g * t + f + 1]);
  const x = [], h = (g, f) => {
    const S = x[x.length - 1];
    S && S.op === f ? S.text += g : x.push({ text: g, op: f });
  };
  let r = 0, c = 0;
  for (; r < o.length && c < u.length; )
    o[r].trimEnd() === u[c].trimEnd() ? (h(u[c], "same"), r++, c++) : m[(r + 1) * t + c] >= m[r * t + c + 1] ? h(o[r++], "removed") : h(u[c++], "added");
  for (; r < o.length; ) h(o[r++], "removed");
  for (; c < u.length; ) h(u[c++], "added");
  return x;
}
function Cs(l, i) {
  return l.filter((o) => o.op === "same" || o.op === (i === "old" ? "removed" : "added"));
}
const be = { preserveScroll: !0, preserveState: !0 };
function Ss({ entryId: l, comments: i }) {
  const [o, u] = k.useState(null), [p, t] = k.useState(""), [m, x] = k.useState(!1), h = (c, g) => v.router.post(M(`cms/comments/${c}/status`), { status: g }, be), r = (c) => v.router.post(M(`cms/comments/${c}/reply`), { body: p }, {
    ...be,
    onStart: () => x(!0),
    onFinish: () => x(!1),
    onSuccess: () => {
      u(null), t("");
    }
  });
  return /* @__PURE__ */ e.jsx(
    a.CollapsibleCard,
    {
      title: s("Comments"),
      titleClassName: "cms:text-base",
      storageKey: "cms:entry:comments",
      contentClassName: "cms:flex cms:flex-col cms:gap-3 cms:text-sm",
      headerAction: i && i.counts.pending > 0 ? /* @__PURE__ */ e.jsx(a.Badge, { children: s(":count pending", { count: i.counts.pending }) }) : void 0,
      children: i ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: s(":approved approved · :pending pending · :spam spam", { approved: i.counts.approved, pending: i.counts.pending, spam: i.counts.spam }) }),
        i.latest.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: s("No comments yet.") }),
        i.latest.map((c) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5 cms:border-t cms:border-border/70 cms:pt-3 cms:first-of-type:border-t-0 cms:first-of-type:pt-0", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium", children: c.author }),
            c.status === "pending" && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", children: s("Pending") })
          ] }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:line-clamp-3 cms:break-words cms:whitespace-pre-line", children: c.excerpt }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
            N(c.createdAt),
            c.reply ? ` · ${s("a reply")}` : ""
          ] }),
          i.canModerate && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-1", children: [
            c.status === "pending" && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => h(c.id, "approved"), children: [
              /* @__PURE__ */ e.jsx(Ce, {}),
              " ",
              s("Approve")
            ] }),
            /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => h(c.id, "spam"), children: [
              /* @__PURE__ */ e.jsx(as, {}),
              " ",
              s("Spam")
            ] }),
            /* @__PURE__ */ e.jsxs(
              a.Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                "aria-expanded": o === c.id,
                onClick: () => {
                  u(o === c.id ? null : c.id), t("");
                },
                children: [
                  /* @__PURE__ */ e.jsx(ls, {}),
                  " ",
                  s("Reply")
                ]
              }
            )
          ] }),
          o === c.id && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              a.Textarea,
              {
                "aria-label": s("Reply to :author", { author: c.author }),
                rows: 3,
                value: p,
                onChange: (g) => t(g.target.value)
              }
            ),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
              /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "sm", disabled: p.trim() === "" || m, onClick: () => r(c.id), children: s("Post reply") }),
              /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => u(null), children: s("Cancel") })
            ] })
          ] })
        ] }, c.id)),
        /* @__PURE__ */ e.jsx("a", { href: M(`cms/comments?entry=${l}`), className: "cms:text-sm cms:font-medium cms:underline-offset-4 cms:hover:underline", children: s("All comments on this entry") })
      ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-10" }),
        /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-10" })
      ] })
    }
  );
}
function ve(l) {
  if (l.length === 0) return "";
  const i = l.slice(0, 5).map((o) => o.label).join("; ");
  return ` ${l.length > 5 ? s("It's used by :list and :count more: those links will show nothing.", { list: i, count: l.length - 5 }) : s("It's used by :list: those links will show nothing.", { list: i })}`;
}
function nt(l) {
  const { entry: i } = l;
  return /* @__PURE__ */ e.jsx(ys, { ...l }, i ? `${i.id}:${i.locale}:${i.version}:${i.status}:${i.trashed}:${i.publishedAt}` : "new");
}
function ys({ collection: l, fields: i, locales: o = [], shared: u = [], sharedValues: p = {}, entry: t, values: m, revisions: x, comments: h, termLabels: r, usedBy: c = [], undoRestore: g = null, machineTranslate: f = null, machineTranslateMissing: S = !1, settings: $, blueprints: b = [], blueprintUrl: T = null, homepage: _, redirectsUrl: Ee = null, templates: Le = null, can: w }) {
  const O = M(`cms/collections/${l.handle}/entries`), C = t ? M(`cms/entries/${t.id}`) : O, Q = t ? m.title : s("New entry");
  a.useBreadcrumbs([{ label: l.title, href: O }, { label: Q }]);
  const [z, Pe] = Ze(), [Fe, U] = k.useState(!1), X = t?.publishedAt ? Ne(new Date(t.publishedAt)) : "", [le, ne] = k.useState(X);
  k.useEffect(() => ne(X), [X]);
  const [I, ie] = k.useState(null), [ze, re] = k.useState(!1), [Ie, ce] = k.useState(!1), [Re, Z] = k.useState(!1), d = v.useForm({
    ...m,
    seo: m.seo ?? {},
    locale: t?.locale ?? null,
    version: t?.version ?? null,
    publish: !1,
    published_at: null,
    parent_id: $?.parentId ?? null,
    template: $?.template ?? "",
    comments_closed: $?.commentsClosed === !0
  }), oe = (n) => d.setData((j) => ({ ...j, ...n })), R = t ? { locale: t.locale } : {}, E = o.find((n) => n.main)?.code, y = d.errors, H = v.usePage().props.errors ?? {}, Y = (n) => {
    const j = ms(y, n);
    j.length > 0 && d.clearErrors(...j);
  }, P = t !== null && t.status !== "draft" && !t.hasUnpublishedChanges && !d.isDirty, W = Ke(t?.status ?? "draft", le, t?.publishedAt ?? null), de = t === null ? w.create : w.update && !t.trashed, q = t?.status === "scheduled", F = t ? He(t) : null, ee = t?.live?.changed ?? [], me = (n) => ee.includes(n) ? /* @__PURE__ */ e.jsx(pe, {}) : null, G = l.pages !== !1, ue = (n) => {
    if ($ || t === null) return n;
    const { parent_id: j, template: B, comments_closed: Fs, ...qe } = n;
    return qe;
  }, se = (n = !1, j = null) => {
    d.transform((B) => ({ ...ue(B), publish: n, published_at: j })), t ? d.put(C, { preserveScroll: !0, onSuccess: () => U(!1) }) : d.post(C);
  }, Ve = () => {
    d.transform((n) => ({ ...ue(n), version: null, publish: !1, published_at: null })), d.put(C, { preserveScroll: !0 });
  }, D = a.useEditLock({
    type: "cms.entry",
    id: t?.id,
    locale: t?.locale,
    enabled: t !== null && de,
    noun: s("entry"),
    leaveTo: O,
    getUnsaved: () => d.isDirty ? { title: d.data.title, slug: d.data.slug, data: d.data.data, seo: d.data.seo } : null
  }), A = de && !D.readOnly, Oe = async (n) => {
    const j = await D.loadKept(n);
    d.setData((B) => ({ ...B, title: j.title ?? B.title, slug: j.slug ?? B.slug, data: j.data ?? B.data, seo: j.seo ?? B.seo }));
  };
  a.useUnsavedChanges(d.isDirty && !D.takenOver, A ? () => d.processing || se() : void 0);
  const Ue = () => {
    const n = () => v.router.post(`${C}/review`, R, { preserveScroll: !0 });
    d.isDirty ? (d.transform((j) => ({ ...j, publish: !1, published_at: null })), d.put(C, { preserveScroll: !0, onSuccess: n })) : n();
  }, J = (n = null) => {
    w.update ? se(!0, n) : t && v.router.post(`${C}/publish`, { ...R, published_at: n }, { preserveScroll: !0, onSuccess: () => U(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (n) => {
    n.preventDefault(), se();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(v.Head, { title: Q }),
    Pe,
    D.dialogs,
    /* @__PURE__ */ e.jsxs(
      a.PageHeader,
      {
        title: Q,
        back: { href: O, label: s("Back to :title", { title: l.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          t?.trashed && w.delete && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", onClick: () => v.router.post(`${C}/restore`, {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(hs, {}),
            " ",
            s("Restore")
          ] }),
          t?.trashed && w.delete && /* @__PURE__ */ e.jsxs(
            a.Button,
            {
              type: "button",
              variant: "outline",
              className: "cms:text-destructive",
              onClick: () => z(
                s(`Permanently delete ":title" in every language, with its revisions? This can't be undone.`, { title: m.title }) + ve(c),
                () => v.router.delete(`${C}/force`, { data: c.length > 0 ? { force: 1 } : {} })
              ),
              children: [
                /* @__PURE__ */ e.jsx(xe, {}),
                " ",
                s("Permanently delete")
              ]
            }
          ),
          t && !t.trashed && (G || w.create || w.delete && !D.readOnly || A && f !== null || T) && /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "icon", "aria-label": s("More actions"), children: /* @__PURE__ */ e.jsx(bs, {}) }) }),
            /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", className: "cms:min-w-52", children: [
              A && f !== null && /* @__PURE__ */ e.jsxs(
                a.DropdownMenuItem,
                {
                  disabled: d.processing || d.isDirty,
                  title: d.isDirty ? void 0 : s("Fill in what isn't translated yet, into the draft"),
                  onSelect: () => v.router.post(M(`cms/entries/${t.id}/translations/${t.locale}/translate`), { version: t.version }, { preserveScroll: !0 }),
                  children: [
                    /* @__PURE__ */ e.jsx(ge, {}),
                    " ",
                    d.isDirty ? s("Save to translate") : s("Translate from :language", { language: o.find((n) => n.main)?.name ?? (E ? L(E) : s("the main language")) })
                  ]
                }
              ),
              G && /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { title: s("A link that shows the saved draft to anyone, without signing in, for a while"), onSelect: () => ce(!0), children: [
                /* @__PURE__ */ e.jsx(ps, {}),
                " ",
                s("Share preview link…")
              ] }),
              w.create && /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { title: s("Copy every language as a new draft"), onSelect: () => v.router.post(`${C}/duplicate`), children: [
                /* @__PURE__ */ e.jsx(Se, {}),
                " ",
                s("Duplicate")
              ] }),
              T && /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(v.Link, { href: T, children: [
                /* @__PURE__ */ e.jsx(xs, {}),
                " ",
                s("Edit blueprint")
              ] }) }),
              w.delete && !D.readOnly && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
                /* @__PURE__ */ e.jsxs(
                  a.DropdownMenuItem,
                  {
                    className: "cms:text-destructive",
                    onSelect: () => z(s('Move ":title" to the trash? It comes off the site; you can restore it.', { title: m.title }) + ve(c), () => v.router.delete(C), s("Move to trash")),
                    children: [
                      /* @__PURE__ */ e.jsx(xe, {}),
                      " ",
                      s("Move to trash")
                    ]
                  }
                )
              ] })
            ] })
          ] }),
          t && A && S && /* @__PURE__ */ e.jsxs("span", { title: s("Machine translation isn't set up on this site: ask your developer (SUNRICE_TRANSLATE_DRIVER, see Help → Developer docs → Machine translation)."), children: [
            /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", disabled: !0, "aria-describedby": "machine-translate-missing", children: [
              /* @__PURE__ */ e.jsx(ge, {}),
              " ",
              s("Translate from :language", { language: o.find((n) => n.main)?.name ?? (E ? L(E) : s("the main language")) })
            ] }),
            /* @__PURE__ */ e.jsx("span", { id: "machine-translate-missing", className: "cms:sr-only", children: s("Machine translation isn't set up on this site: ask your developer.") })
          ] }),
          A && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", variant: t ? "outline" : "default", disabled: d.processing, children: [
            d.processing && /* @__PURE__ */ e.jsx(ye, { className: "cms:animate-spin" }),
            t ? s("Save draft") : s("Create draft")
          ] }),
          t && !t.trashed && A && !w.publish && (t.status === "draft" || t.hasUnpublishedChanges || d.isDirty) && /* @__PURE__ */ e.jsxs(
            a.Button,
            {
              type: "button",
              disabled: d.processing,
              onClick: Ue,
              title: t.review ? s("Already sent; sending again tells them again") : s("Ask those who can publish to review it"),
              children: [
                /* @__PURE__ */ e.jsx(ws, {}),
                " ",
                t.review ? s("Send for review again") : s("Submit for review")
              ]
            }
          ),
          t && !t.trashed && w.publish && !D.readOnly && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex", children: [
            q && P ? /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", className: "cms:rounded-r-none", disabled: d.processing, title: s("Change the date"), onClick: () => U(!0), children: [
              /* @__PURE__ */ e.jsx(ae, {}),
              " ",
              s("Scheduled for :date", { date: N(t.publishedAt) })
            ] }) : /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: P ? "outline" : "default", className: "cms:rounded-r-none cms:disabled:opacity-100", disabled: d.processing || P, onClick: () => J(W.at), children: [
              P && /* @__PURE__ */ e.jsx(Ce, { className: "cms:text-emerald-600 cms:dark:text-emerald-400" }),
              P ? s("Published") : W.action === "schedule" ? s("Schedule") : W.action === "backdate" ? s("Publish now, back-dated") : t.status === "draft" ? s("Publish") : s("Publish changes")
            ] }),
            /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
              /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "icon", variant: P ? "outline" : "default", className: P ? "cms:-ml-px cms:rounded-l-none" : "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": s("More publishing options"), children: /* @__PURE__ */ e.jsx(is, {}) }) }),
              /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", children: [
                /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { onSelect: () => U(!0), children: [
                  /* @__PURE__ */ e.jsx(ae, {}),
                  " ",
                  q ? s("Change the date…") : s("Publish on a date…")
                ] }),
                q && /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => J((/* @__PURE__ */ new Date()).toISOString()), children: s("Publish now") }),
                t.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
                  /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => v.router.post(`${C}/unpublish`, R, { preserveScroll: !0 }), children: q ? s("Unschedule (back to draft)") : s("Unpublish") })
                ] })
              ] })
            ] })
          ] })
        ] }),
        children: [
          t && (t.trashed ? /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: s("In the trash") }) : /* @__PURE__ */ e.jsx(he, { status: t.status, changes: t.status !== "draft" && t.hasUnpublishedChanges })),
          t?.review && !t.trashed && /* @__PURE__ */ e.jsx(a.Badge, { variant: "warning", title: t.review.by ? s(":name sent it on :date", { name: t.review.by, date: N(t.review.requestedAt) }) : s("Sent on :date", { date: N(t.review.requestedAt) }), children: s("Waiting for review") })
        ]
      }
    ),
    t && F && /* @__PURE__ */ e.jsx(
      Es,
      {
        state: F,
        entry: t,
        dirty: d.isDirty,
        actions: Ye(F, { liveUrl: t.url !== null, pages: G, canUpdate: A }),
        onCompare: () => re(!0),
        onDiscard: () => z(
          s(`Discard the unpublished changes to ":title"? The editor goes back to the live version, as visitors see it. This can't be undone.`, { title: m.title }) + (d.isDirty ? ` ${s("Your unsaved edits are lost too.")}` : ""),
          () => v.router.post(M(`cms/entries/${t.id}/translations/${t.locale}/discard`), { version: t.version }, { preserveScroll: !0 }),
          s("Discard changes")
        )
      }
    ),
    t && o.length > 1 && /* @__PURE__ */ e.jsx(
      $s,
      {
        entryUrl: C,
        editUrl: `${O}/${t.id}/edit`,
        current: t.locale,
        locales: o,
        canAdd: (w.create || w.translate === !0) && !t.trashed,
        canRemove: w.delete && !t.isMain && !t.trashed,
        onRemove: () => z(
          s('Remove the :language translation of ":title"? Its revisions go with it.', { language: L(t.locale), title: m.title }),
          () => v.router.delete(`${C}/translations/${t.locale}`)
        )
      }
    ),
    /* @__PURE__ */ e.jsx(a.ViewingNotice, { by: D.viewingBy, onTakeOver: D.requestTakeOver }),
    /* @__PURE__ */ e.jsx(a.KeptEditsNotice, { kept: D.kept, disabled: !A, onLoad: (n) => {
      Oe(n);
    }, onDiscard: (n) => {
      D.discardKept(n);
    } }),
    y.version && /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: [
      /* @__PURE__ */ e.jsx("span", { children: y.version }),
      /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => v.router.reload(), children: s("Load theirs") }),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            type: "button",
            variant: "destructive",
            size: "sm",
            disabled: d.processing,
            onClick: () => z(s("Save your version over theirs? Their changes are replaced (their earlier published versions stay in the revisions)."), Ve),
            children: s("Save mine anyway")
          }
        )
      ] })
    ] }),
    (y.entry || y.published_at || H.published_at || H.homepage) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: y.entry ?? y.published_at ?? H.published_at ?? H.homepage }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_18rem]", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsx(a.CardContent, { children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: !A, className: "cms:grid cms:gap-4 cms:md:grid-cols-[2fr_1fr]", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsxs(a.Label, { htmlFor: "title", children: [
              s("Title"),
              me("title")
            ] }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "title",
                value: d.data.title,
                "aria-invalid": y.title !== void 0,
                onChange: (n) => {
                  const j = n.target.value;
                  d.setData((B) => ({ ...B, title: j, slug: We(B.slug, B.title, j, t !== null && t.publishedAt === null && t.status === "draft") })), Y("title");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(K, { message: y.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsxs(a.Label, { htmlFor: "slug", children: [
              s("Slug"),
              me("slug")
            ] }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "slug",
                className: "cms:font-mono",
                value: d.data.slug,
                placeholder: s("Made from the title"),
                "aria-invalid": y.slug !== void 0,
                onChange: (n) => {
                  d.setData("slug", n.target.value), Y("slug");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(es, { note: Ge(t?.publishedSlug, d.data.slug, t !== null && t.status !== "draft"), redirectsUrl: Ee }),
            /* @__PURE__ */ e.jsx(K, { message: y.slug })
          ] })
        ] }) }) }),
        /* @__PURE__ */ e.jsx(rs.Provider, { value: Array.isArray(r) || !r ? {} : r, children: /* @__PURE__ */ e.jsx(
          ns,
          {
            disabled: !A,
            fields: i,
            values: d.data.data,
            errors: y,
            storageKey: `cms:entry:${l.handle}`,
            shared: u,
            sharedValues: p,
            changed: ee,
            sharedNote: E ? s("Shared by all languages: the greyed-out fields are edited in :language.", { language: L(E) }) : s("Shared by all languages: the greyed-out fields are edited in the main language."),
            onChange: (n, j) => {
              d.setData("data", { ...d.data.data, [n]: j }), Y(`data.${n}`);
            }
          }
        ) }),
        /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: ee.some((n) => n.startsWith("seo.")) ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          s("SEO"),
          /* @__PURE__ */ e.jsx(pe, {})
        ] }) : s("SEO"), description: s("How this entry appears in search results and shared links."), titleClassName: "cms:text-base", storageKey: "cms:entry:seo", hasErrors: ds(y, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !A, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(
          cs,
          {
            bare: !0,
            id: "seo",
            fields: us(),
            value: d.data.seo,
            errors: os(y, "seo"),
            onChange: (n) => {
              d.setData("seo", n), Y("seo");
            }
          }
        ) }) })
      ] }),
      !t && l.hierarchical && /* @__PURE__ */ e.jsx("aside", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-4", children: /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: "Page settings", titleClassName: "cms:text-base", storageKey: "cms:entry:page-settings", hasErrors: y.parent_id !== void 0, children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !A, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-4 cms:text-sm", children: /* @__PURE__ */ e.jsx(_e, { collection: l, value: d.data.parent_id, error: y.parent_id, onChange: (n) => oe({ parent_id: n }) }) }) }) }),
      t && /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: s("Status"), titleClassName: "cms:text-base", storageKey: "cms:entry:status", contentClassName: "cms:flex cms:flex-col cms:gap-3 cms:text-sm", children: [
          /* @__PURE__ */ e.jsxs("dl", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-3", children: [
              /* @__PURE__ */ e.jsx("dt", { className: "cms:text-muted-foreground", children: s("Status") }),
              /* @__PURE__ */ e.jsx("dd", { className: "cms:flex cms:flex-wrap cms:justify-end cms:gap-1", children: t.trashed ? /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: s("In the trash") }) : /* @__PURE__ */ e.jsx(he, { status: t.status, changes: t.status !== "draft" && t.hasUnpublishedChanges }) })
            ] }),
            t.status !== "draft" && t.publishedAt && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:justify-between cms:gap-3", children: [
              /* @__PURE__ */ e.jsx("dt", { className: "cms:text-muted-foreground", children: t.status === "scheduled" ? s("Scheduled for") : s("Published") }),
              /* @__PURE__ */ e.jsx("dd", { className: "cms:text-right cms:tabular-nums", children: N(t.publishedAt) })
            ] })
          ] }),
          t.review && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-muted-foreground", children: [
            t.review.by ? s("Sent for review by :name · :date.", { name: t.review.by, date: N(t.review.requestedAt) }) : s("Sent for review · :date.", { date: N(t.review.requestedAt) }),
            w.publish ? ` ${s("Publishing it answers the request.")}` : ""
          ] }),
          t.review && !t.trashed && (t.review.mine || w.publish && !D.readOnly) && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: [
            w.publish && !D.readOnly && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", disabled: d.processing, onClick: () => Z(!0), children: [
              /* @__PURE__ */ e.jsx(te, {}),
              " ",
              s("Send back…")
            ] }),
            t.review.mine && /* @__PURE__ */ e.jsx(
              a.Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                disabled: d.processing,
                title: s("Take the request back, to keep working on it"),
                onClick: () => v.router.post(`${C}/review/withdraw`, R, { preserveScroll: !0 }),
                children: s("Withdraw the request")
              }
            )
          ] }),
          !t.trashed && w.publish && !D.readOnly && /* @__PURE__ */ e.jsx(
            As,
            {
              status: t.status,
              value: le,
              onChange: ne,
              dated: W,
              processing: d.processing,
              onPublish: (n) => J(n),
              onUnpublish: () => v.router.post(`${C}/unpublish`, R, { preserveScroll: !0 })
            }
          ),
          _?.is && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: s("This is the site's homepage.") }),
          _ && !_.is && _.can && t.status === "published" && !t.trashed && /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "cms:mt-1 cms:self-start",
              onClick: () => z(
                (_.current ? s('Make ":title" the homepage? Visitors to / will see it instead of ":current".', { title: m.title, current: _.current }) : s('Make ":title" the homepage? Visitors to / will see it.', { title: m.title })) + " " + s("Its own address will lead to / as well."),
                () => v.router.post(`${C}/homepage`, {}, { preserveScroll: !0 }),
                s("Make this the homepage")
              ),
              children: s("Make this the homepage")
            }
          ),
          o.find((n) => n.code === t.locale)?.outdated && /* @__PURE__ */ e.jsx("p", { className: "cms:text-amber-700 cms:dark:text-amber-400", children: E ? s("The :language version changed since this translation was last saved.", { language: L(E) }) : s("The main version changed since this translation was last saved.") })
        ] }),
        /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: s("Used by"), titleClassName: "cms:text-base", storageKey: "cms:entry:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          c.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: s("No other content links here.") }),
          c.map((n) => /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
            n.url ? /* @__PURE__ */ e.jsx("a", { href: n.url, className: "cms:block cms:truncate cms:underline-offset-4 cms:hover:underline", children: n.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:truncate", children: n.label }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", title: n.field, children: n.fieldLabel ?? n.field })
          ] }, `${n.label}:${n.field}`))
        ] }),
        $ && /* @__PURE__ */ e.jsx(
          Ps,
          {
            entryUrl: C,
            collection: l,
            settings: $,
            templates: Le,
            blueprints: b,
            disabled: !A,
            values: d.data,
            errors: y,
            onChange: oe,
            draftDirty: d.isDirty,
            commentCount: h ? h.counts.pending + h.counts.approved : null
          }
        ),
        h !== null && l.comments && /* @__PURE__ */ e.jsx(Ss, { entryId: t.id, comments: h }),
        /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: s("Revisions"), titleClassName: "cms:text-base", storageKey: "cms:entry:revisions", contentClassName: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
          g !== null && w.update && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => v.router.post(M(`cms/entries/${t.id}/translations/${t.locale}/undo-restore`), {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(te, {}),
            " ",
            s("Undo the restore")
          ] }),
          /* @__PURE__ */ e.jsx(v.Deferred, { data: "revisions", fallback: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-8" }),
            /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-8" })
          ] }), children: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            (x ?? []).length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: s("Each publish keeps one.") }),
            (x ?? []).map((n) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1 cms:border-b cms:border-border/60 cms:pb-2 cms:last:border-b-0 cms:last:pb-0", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
                /* @__PURE__ */ e.jsx("div", { className: "cms:truncate", children: n.title }),
                /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
                  N(n.createdAt),
                  n.author ? ` · ${n.author}` : ""
                ] }),
                /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: n.changed === null ? s("First kept version") : n.changed.length === 0 ? s("No field changed") : s("Changed: :fields", { fields: n.changed.join(", ") }) })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-1", children: [
                /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => ie(n), children: s("Compare") }),
                w.update && !t.trashed && /* @__PURE__ */ e.jsx(
                  a.Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    onClick: () => v.router.post(M(`cms/entries/${t.id}/revisions/${n.id}/restore`), {}, { preserveScroll: !0 }),
                    children: s("Restore")
                  }
                )
              ] })
            ] }, n.id))
          ] }) })
        ] })
      ] })
    ] }),
    t?.review && /* @__PURE__ */ e.jsx(
      Ds,
      {
        open: Re,
        onClose: () => Z(!1),
        by: t.review.by,
        onSend: (n, j) => v.router.post(`${C}/review/send-back`, { ...R, note: n }, { preserveScroll: !0, onSuccess: () => {
          Z(!1), j();
        }, onError: j })
      }
    ),
    t && F && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      /* @__PURE__ */ e.jsx(
        ke,
        {
          open: ze,
          onClose: () => re(!1),
          dirty: d.isDirty,
          url: M(`cms/entries/${t.id}/translations/${t.locale}/compare-live`),
          read: (n) => ({ label: String(n.label), old: String(n.live ?? ""), new: String(n.draft ?? "") }),
          title: s("Your changes compared with the live version"),
          description: s("What visitors see, beside your saved changes. Removed words are struck through, added ones highlighted."),
          oldLabel: Ms(t.live),
          newLabel: s("Your changes (not published)"),
          same: s("Your changes are the same as the live version.")
        }
      ),
      /* @__PURE__ */ e.jsx(
        ke,
        {
          open: I !== null,
          onClose: () => ie(null),
          dirty: d.isDirty,
          url: I ? M(`cms/entries/${t.id}/revisions/${I.id}/compare`) : null,
          read: (n) => ({ label: String(n.label), old: String(n.revision ?? ""), new: String(n.draft ?? "") }),
          title: s("Version of :date compared with :current", { date: N(I?.createdAt), current: je(F) }),
          description: s("A version published earlier, beside :current. Removed words are struck through, added ones highlighted.", { current: je(F) }),
          oldLabel: I ? Ts(I) : "",
          newLabel: _s(F),
          same: s("The two versions are the same.")
        }
      ),
      G && /* @__PURE__ */ e.jsx(Ls, { open: Ie, onClose: () => ce(!1), url: t.previewUrl, expiresAt: t.previewExpiresAt ?? null })
    ] }),
    /* @__PURE__ */ e.jsx(
      Bs,
      {
        open: Fe,
        onClose: () => U(!1),
        processing: d.processing,
        rescheduling: q,
        current: t?.publishedAt ?? null,
        onSchedule: (n) => J(n)
      }
    )
  ] });
}
function Ds({ open: l, onClose: i, by: o, onSend: u }) {
  const [p, t] = k.useState(""), [m, x] = k.useState(!1), h = v.usePage().props.errors ?? {};
  return k.useEffect(() => {
    l && t("");
  }, [l]), /* @__PURE__ */ e.jsx(a.Dialog, { open: l, onOpenChange: (r) => !r && !m && i(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: s("Send back without publishing") }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: o ? s(":name gets an email with your note, and the request is cleared. The draft stays as it is.", { name: o }) : s("The one who asked gets an email with your note, and the request is cleared. The draft stays as it is.") })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "send-back-note", children: s("Note (optional)") }),
      /* @__PURE__ */ e.jsx(
        a.Textarea,
        {
          id: "send-back-note",
          rows: 4,
          maxLength: 2e3,
          value: p,
          placeholder: s("What to change before it can be published"),
          "aria-invalid": h.note !== void 0,
          onChange: (r) => t(r.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(K, { message: h.note })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", disabled: m, onClick: i, children: s("Cancel") }),
      /* @__PURE__ */ e.jsxs(a.Button, { type: "button", disabled: m, onClick: () => {
        x(!0), u(p, () => x(!1));
      }, children: [
        m && /* @__PURE__ */ e.jsx(ye, { className: "cms:animate-spin" }),
        " ",
        s("Send back")
      ] })
    ] })
  ] }) });
}
function $s({ entryUrl: l, editUrl: i, current: o, locales: u, canAdd: p, canRemove: t, onRemove: m }) {
  const x = u.filter((r) => r.status !== null), h = u.filter((r) => r.status === null);
  return /* @__PURE__ */ e.jsxs("nav", { "aria-label": s("Languages"), className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("div", { className: "cms:inline-flex cms:items-center cms:gap-0.5 cms:rounded-md cms:bg-muted cms:p-0.5", children: x.map((r) => {
      const c = r.code === o, g = r.main ? s(":language (main)", { language: r.name ?? L(r.code) }) : r.name ?? L(r.code), f = r.status ? Je(r.status) : "", S = r.outdated ? s(":language: :status, outdated (the main language changed since)", { language: g, status: f }) : s(":language: :status", { language: g, status: f });
      return /* @__PURE__ */ e.jsxs(
        "button",
        {
          type: "button",
          title: S,
          "aria-label": S,
          "aria-current": c ? "page" : void 0,
          onClick: () => !c && v.router.get(i, { locale: r.code }),
          className: `cms:relative cms:inline-flex cms:h-7 cms:min-w-10 cms:items-center cms:justify-center cms:gap-1.5 cms:rounded cms:px-2.5 cms:text-xs cms:font-semibold cms:tracking-wide cms:uppercase cms:transition-colors ${c ? "cms:bg-card cms:text-foreground cms:shadow-xs" : "cms:text-muted-foreground cms:hover:text-foreground"}`,
          children: [
            r.code,
            (r.outdated || r.status === "published") && /* @__PURE__ */ e.jsx("span", { "aria-hidden": !0, className: `cms:size-1.5 cms:rounded-full ${r.outdated ? "cms:bg-amber-500" : "cms:bg-emerald-500"}` })
          ]
        },
        r.code
      );
    }) }),
    p && h.map((r) => /* @__PURE__ */ e.jsxs(
      a.Button,
      {
        type: "button",
        variant: "outline",
        size: "sm",
        className: "cms:h-8 cms:border-dashed cms:text-xs cms:uppercase",
        title: s("Add :language", { language: r.name ?? L(r.code) }),
        onClick: () => v.router.post(`${l}/translations`, { locale: r.code }),
        children: [
          /* @__PURE__ */ e.jsx(fs, {}),
          " ",
          r.code
        ]
      },
      r.code
    )),
    t && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:ml-auto cms:text-destructive", onClick: m, children: s("Remove this language") })
  ] });
}
function As({ status: l, value: i, onChange: o, dated: u, processing: p, onPublish: t, onUnpublish: m }) {
  const x = u.action !== "now", h = {
    now: s("Publish"),
    schedule: l === "scheduled" ? s("Reschedule") : s("Schedule"),
    backdate: s("Publish now, back-dated"),
    redate: s("Change date")
  }[u.action];
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:border-t cms:border-border/60 cms:pt-3", children: [
    /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "entry-published-at", children: s("Publish date") }),
    /* @__PURE__ */ e.jsx(a.DatePicker, { id: "entry-published-at", withTime: !0, className: "cms:max-w-none", value: i || null, onChange: (r) => o(r ?? "") }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: l === "draft" ? s("Empty: now. A date in the future schedules it.") : s("The date shown as published. A date in the future takes it off the site until then.") }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: [
      (l === "draft" || x) && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", size: "sm", disabled: p, onClick: () => t(u.at), children: [
        /* @__PURE__ */ e.jsx(ae, {}),
        " ",
        h
      ] }),
      l !== "draft" && /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "sm", variant: "outline", disabled: p, onClick: m, children: s("Unpublish") })
    ] })
  ] });
}
function Bs({ open: l, onClose: i, onSchedule: o, current: u, processing: p, rescheduling: t }) {
  const [m, x] = k.useState("");
  k.useEffect(() => {
    l && x(Ne(Qe(u)));
  }, [l, u]);
  const h = m === "" ? null : new Date(m), r = h !== null && h.getTime() <= Date.now();
  return /* @__PURE__ */ e.jsx(a.Dialog, { open: l, onOpenChange: (c) => !c && i(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: t ? s("Change the publish date") : s("Publish on a date") }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: s("The entry goes live then.") })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "published-at", children: s("Date and time") }),
      /* @__PURE__ */ e.jsx(a.DatePicker, { id: "published-at", withTime: !0, required: !0, className: "cms:max-w-none", value: m || null, onChange: (c) => x(c ?? "") }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s("In your time zone.") }),
      r && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-amber-700 cms:dark:text-amber-400", children: s("This date has passed: the entry goes live now, dated :date.", { date: N(h.toISOString()) }) })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: i, children: s("Cancel") }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", disabled: h === null || p, onClick: () => h && o(h.toISOString()), children: r ? s("Publish now, back-dated") : t ? s("Change the date") : s("Schedule") })
    ] })
  ] }) });
}
function Ms(l) {
  return l?.publishedAt ? l.by ? s("Live (published :date by :name)", { date: N(l.publishedAt), name: l.by }) : s("Live (published :date)", { date: N(l.publishedAt) }) : s("Live");
}
function Ts(l) {
  return l.author ? s("Version of :date by :name", { date: N(l.createdAt), name: l.author }) : s("Version of :date", { date: N(l.createdAt) });
}
function _s(l) {
  return l === "live" ? s("Live") : l === "scheduled" ? s("Published (scheduled)") : l === "draft" || l === "trashed" ? s("Draft (not published)") : s("Your changes (not published)");
}
function je(l) {
  return l === "live" ? s("the live version") : l === "scheduled" ? s("the scheduled version") : l === "draft" || l === "trashed" ? s("the draft") : s("your changes");
}
function Es({ state: l, entry: i, dirty: o, actions: u, onCompare: p, onDiscard: t }) {
  const m = i.live, x = m?.publishedAt ? m.by ? s("the version published on :date by :name", { date: N(m.publishedAt), name: m.by }) : s("the version published on :date", { date: N(m.publishedAt) }) : s("the version last published"), h = {
    draft: { title: s("Not published yet"), text: s("Only people who can edit see it."), tone: "muted" },
    offline: { title: s("Not published yet"), text: s("Taken off the site: only people who can edit see it."), tone: "muted" },
    scheduled: { title: s("Scheduled"), text: s("Goes live on :date.", { date: N(i.publishedAt) }), tone: "scheduled" },
    "scheduled-changes": { title: s("Scheduled, with unpublished changes"), text: s("Goes live on :date with :version; your changes since aren't in it.", { date: N(i.publishedAt), version: x }), tone: "pending" },
    live: { title: s("Live"), text: o ? s("Visitors see what was last published.") : s("Visitors see exactly this."), tone: "live" },
    "live-changes": { title: s("Live, with unpublished changes"), text: s("Visitors still see :version.", { version: x }), tone: "pending" },
    trashed: { title: s("In the trash"), text: s("It's off the site. Restore it to edit it again."), tone: "trash" }
  }, { title: r, text: c, tone: g } = h[l], f = { muted: "cms:bg-muted-foreground/50", live: "cms:bg-emerald-500", pending: "cms:bg-amber-500", scheduled: "cms:bg-sky-500", trash: "cms:bg-destructive" }[g], S = g === "pending" ? "cms:border-amber-500/40 cms:bg-amber-500/5" : g === "live" ? "cms:border-emerald-500/30 cms:bg-emerald-500/5" : "cms:border-border cms:bg-card", $ = Xe(l);
  return /* @__PURE__ */ e.jsxs(
    "section",
    {
      "aria-label": s("Publishing status"),
      "data-state": l,
      className: `cms:flex cms:flex-col cms:gap-3 cms:rounded-lg cms:border cms:px-4 cms:py-3 cms:md:flex-row cms:md:items-center cms:md:justify-between ${S}`,
      children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-start cms:gap-3", children: [
          /* @__PURE__ */ e.jsx("span", { "aria-hidden": !0, className: `cms:mt-1.5 cms:size-2.5 cms:shrink-0 cms:rounded-full ${f}` }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0 cms:text-sm", children: [
            /* @__PURE__ */ e.jsx("p", { className: "cms:font-medium", children: r }),
            /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: c }),
            o && /* @__PURE__ */ e.jsx("p", { className: "cms:text-amber-700 cms:dark:text-amber-400", children: s("You have unsaved edits.") })
          ] })
        ] }),
        (u.viewLive || u.compare || u.preview || u.discard) && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-2 cms:md:justify-end", children: [
          u.viewLive && i.url && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: i.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(gs, {}),
            " ",
            s("View live page")
          ] }) }),
          u.compare && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: p, children: [
            /* @__PURE__ */ e.jsx(js, {}),
            " ",
            s("Compare with live")
          ] }),
          u.preview && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs(
            "a",
            {
              href: i.previewUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              title: o ? s("Shows what's saved: save first to see your unsaved edits.") : s("Shows what's saved, as visitors would see it once published."),
              children: [
                /* @__PURE__ */ e.jsx(vs, {}),
                " ",
                $ ? s("Preview changes") : s("Preview")
              ]
            }
          ) }),
          u.discard && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:text-destructive", onClick: t, children: [
            /* @__PURE__ */ e.jsx(te, {}),
            " ",
            s("Discard changes")
          ] })
        ] })
      ]
    }
  );
}
function we({ old: l, next: i, side: o }) {
  if ((o === "old" ? l : i).trim() === "") return /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground cms:italic", children: s("(empty)") });
  const p = Cs(Ns(l, i), o);
  return /* @__PURE__ */ e.jsx(e.Fragment, { children: p.map((t, m) => t.op === "same" ? /* @__PURE__ */ e.jsx(k.Fragment, { children: t.text }, m) : t.op === "removed" ? /* @__PURE__ */ e.jsx("del", { className: "cms:rounded-sm cms:bg-red-500/15 cms:text-red-900 cms:decoration-red-500/60 cms:dark:text-red-200", children: t.text }, m) : /* @__PURE__ */ e.jsx("ins", { className: "cms:rounded-sm cms:bg-emerald-500/20 cms:text-emerald-900 cms:no-underline cms:dark:text-emerald-200", children: t.text }, m)) });
}
function ke({ open: l, url: i, read: o, title: u, description: p, oldLabel: t, newLabel: m, same: x, onClose: h, dirty: r }) {
  const [c, g] = k.useState(null), [f, S] = k.useState(!1), $ = k.useRef(o);
  return $.current = o, k.useEffect(() => {
    if (g(null), S(!1), !l || !i) return;
    let b = !0;
    return fetch(i, { headers: { Accept: "application/json" }, credentials: "same-origin" }).then((T) => T.ok ? T.json() : Promise.reject(new Error(String(T.status)))).then((T) => {
      b && g(T.fields.map((_) => $.current(_)));
    }).catch(() => {
      b && S(!0);
    }), () => {
      b = !1;
    };
  }, [l, i]), /* @__PURE__ */ e.jsx(a.Dialog, { open: l, onOpenChange: (b) => !b && h(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto cms:sm:max-w-3xl", children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: u }),
      /* @__PURE__ */ e.jsxs(a.DialogDescription, { children: [
        p,
        r ? ` ${s("Your unsaved edits aren't included.")}` : ""
      ] })
    ] }),
    f && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: s("The comparison could not be loaded. Try again.") }),
    !f && c === null && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-12" }),
      /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-12" })
    ] }),
    c?.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: x }),
    c && c.length > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: [
      /* @__PURE__ */ e.jsxs("div", { "aria-hidden": !0, className: "cms:hidden cms:gap-2 cms:text-xs cms:font-medium cms:text-muted-foreground cms:sm:grid cms:sm:grid-cols-2", children: [
        /* @__PURE__ */ e.jsx("span", { children: t }),
        /* @__PURE__ */ e.jsx("span", { children: m })
      ] }),
      /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-4", children: c.map((b) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: b.label }),
        /* @__PURE__ */ e.jsxs("dd", { className: "cms:grid cms:gap-2 cms:sm:grid-cols-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:rounded-md cms:border cms:bg-muted/30 cms:p-2 cms:break-words cms:whitespace-pre-wrap", children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:text-xs cms:text-muted-foreground cms:sm:sr-only", children: t }),
            /* @__PURE__ */ e.jsx(we, { old: b.old, next: b.new, side: "old" })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:rounded-md cms:border cms:bg-muted/30 cms:p-2 cms:break-words cms:whitespace-pre-wrap", children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:text-xs cms:text-muted-foreground cms:sm:sr-only", children: m }),
            /* @__PURE__ */ e.jsx(we, { old: b.old, next: b.new, side: "new" })
          ] })
        ] })
      ] }, b.label)) })
    ] }),
    /* @__PURE__ */ e.jsx(a.DialogFooter, { children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: h, children: s("Close") }) })
  ] }) });
}
function Ls({ open: l, onClose: i, url: o, expiresAt: u }) {
  const p = () => {
    navigator.clipboard?.writeText(o).then(() => a.toast.success(s("Link copied.")), () => a.toast.error(s("Couldn't copy: select the link and copy it.")));
  };
  return /* @__PURE__ */ e.jsx(a.Dialog, { open: l, onOpenChange: (t) => !t && i(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: s("Share preview link") }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: s("Anyone with this link sees what's saved, as the page would look published, without signing in. Visitors of the site don't see it.") })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "preview-link", children: s("Preview link") }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Input, { id: "preview-link", readOnly: !0, value: o, className: "cms:font-mono cms:text-xs", onFocus: (t) => t.target.select() }),
        /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", onClick: p, children: [
          /* @__PURE__ */ e.jsx(Se, {}),
          " ",
          s("Copy")
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
        u ? s("It stops working at :time. Reload the editor for a new one.", { time: N(u) }) : s("It stops working after a while. Reload the editor for a new one."),
        " ",
        s("It shows changes saved after you share it too.")
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(a.DialogFooter, { children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: i, children: s("Close") }) })
  ] }) });
}
function _e({ collection: l, value: i, error: o, onChange: u }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "parent", children: s("Parent") }),
    /* @__PURE__ */ e.jsx(
      ts,
      {
        id: "parent",
        multiple: !1,
        max: 1,
        collections: [l.handle],
        invalid: o !== void 0,
        value: i,
        onChange: (p) => u(typeof p == "number" ? p : null)
      }
    ),
    /* @__PURE__ */ e.jsx(K, { message: o })
  ] });
}
function Ps({ entryUrl: l, collection: i, settings: o, templates: u, blueprints: p, disabled: t, values: m, errors: x, onChange: h, draftDirty: r, commentCount: c = null }) {
  const g = p.length > 1 ? o.blueprint ?? p[0].handle : void 0, f = v.useForm({ blueprint: g ?? "" }), S = f.errors.blueprint, $ = ["parent_id", "template", "comments_closed"].some((b) => x[b] !== void 0) || S !== void 0;
  return /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: s("Page settings"), titleClassName: "cms:text-base", storageKey: "cms:entry:page-settings", hasErrors: $, children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: t, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-4 cms:text-sm", children: [
    i.hierarchical && /* @__PURE__ */ e.jsx(_e, { collection: i, value: m.parent_id, error: x.parent_id, onChange: (b) => h({ parent_id: b }) }),
    p.length > 1 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "blueprint", children: s("Blueprint") }),
      /* @__PURE__ */ e.jsxs(a.Select, { value: f.data.blueprint, onValueChange: (b) => f.setData("blueprint", b), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: "blueprint", className: "cms:w-full cms:min-w-0", "aria-invalid": S !== void 0, children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(a.SelectContent, { children: p.map((b) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: b.handle, children: b.title }, b.handle)) })
      ] }),
      f.data.blueprint !== g && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: s("The fields change in every language. Values of fields the new blueprint doesn't have stay saved and come back if you switch back. The editor reloads.") }),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            type: "button",
            size: "sm",
            disabled: f.processing || r,
            title: r ? s("Save your draft first") : void 0,
            onClick: () => f.put(`${l}/settings`, { preserveScroll: !0 }),
            children: s("Change blueprint")
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(K, { message: S })
    ] }),
    /* @__PURE__ */ e.jsx(
      ss,
      {
        id: "template",
        value: m.template,
        onChange: (b) => h({ template: b }),
        lookup: u,
        example: `cms.${i.handle}-landing`,
        automatic: s("Automatic uses the collection's template."),
        error: x.template,
        disabled: t
      }
    ),
    i.comments && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1 cms:border-t cms:border-border/60 cms:pt-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "comments-open", className: "cms:whitespace-nowrap", children: s("Accept new comments") }),
        /* @__PURE__ */ e.jsx(a.Switch, { id: "comments-open", checked: !m.comments_closed, onCheckedChange: (b) => h({ comments_closed: !b }) })
      ] }),
      /* @__PURE__ */ e.jsx("a", { href: M(`cms/comments?entry=${l.split("/").slice(-1)[0]}`), className: "cms:w-fit cms:text-xs cms:text-muted-foreground cms:underline-offset-4 cms:hover:text-foreground cms:hover:underline", children: c === null ? s("View comments") : s("View comments (:count)", { count: c }) })
    ] })
  ] }) });
}
export {
  nt as default
};
