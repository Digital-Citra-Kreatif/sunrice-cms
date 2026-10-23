import { j as e, t as s, f as S, a as B, r as j, b as De, d as Je, e as Qe, l as E, c as Xe, g as Ze, h as es, s as ss, i as ts, k as as } from "./admin-CBkX-z7V.js";
import { c as U, _ as N } from "./createLucideIcon-Ccbp7F45.js";
import { u as a } from "./ui-Dh5wfMwT.js";
import { u as ls } from "./Confirm-DrwEla-d.js";
import { S as ns, T as is } from "./SlugNote-BEltF-DD.js";
import { E as fe, C as Z } from "./EntryStatus-CAdx5wKB.js";
import { E as rs } from "./EntriesPicker-C9EtCaFB.js";
import { C as $e } from "./check-OeKFYRnl.js";
import { S as cs, M as os, U as ie } from "./undo-2-CBzqSKK6.js";
import { F as ds } from "./FieldSections-tYCdbYiI.js";
import { C as ms, z as Ae, A as us, b as hs, h as ps, B as xs, T as gs } from "./FieldInput-D1cpUCqB.js";
import { s as fs } from "./seo-DWmQ5Nea.js";
import { F } from "./FieldError-DuMp-ZS3.js";
import { R as bs } from "./rotate-ccw-BcgdCn0y.js";
import { T as be } from "./trash-DHN6ewjn.js";
import { L as vs } from "./link-2-BYZeXgi5.js";
import { C as Te } from "./copy-BT7TBOUx.js";
import { L as js } from "./layout-template-RwJXNfEY.js";
import { L as Be } from "./loader-circle-ByksABXO.js";
import { E as ws } from "./external-link-CFxEu4M4.js";
import { P as ks } from "./plus-COqahUZ2.js";
const Me = {
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
Me.node;
const re = U(Me);
const Ee = {
  name: "ellipsis-vertical",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
    ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
    ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }]
  ],
  aliases: ["more-vertical"]
};
Ee.node;
const Ns = U(Ee);
const Pe = {
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
Pe.node;
const Cs = U(Pe);
const _e = {
  name: "git-compare",
  size: 24,
  node: [
    ["circle", { cx: "18", cy: "18", r: "3", key: "1xkwt0" }],
    ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
    ["path", { d: "M13 6h3a2 2 0 0 1 2 2v7", key: "1yeb86" }],
    ["path", { d: "M11 18H8a2 2 0 0 1-2-2V9", key: "19pyzm" }]
  ]
};
_e.node;
const Ss = U(_e);
const Le = {
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
Le.node;
const ve = U(Le);
const Fe = {
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
Fe.node;
const ys = U(Fe);
function je(l) {
  return l.match(/\n|[^\s]+[^\S\n]*|[^\S\n]+/g) ?? [];
}
const Ds = 25e4;
function $s(l, r) {
  if (l === r) return l === "" ? [] : [{ text: l, op: "same" }];
  const d = je(l), u = je(r);
  if (d.length * u.length > Ds)
    return [...l ? [{ text: l, op: "removed" }] : [], ...r ? [{ text: r, op: "added" }] : []];
  const p = d.length + 1, t = u.length + 1, m = new Uint32Array(p * t);
  for (let x = d.length - 1; x >= 0; x--)
    for (let f = u.length - 1; f >= 0; f--)
      m[x * t + f] = d[x].trimEnd() === u[f].trimEnd() ? m[(x + 1) * t + f + 1] + 1 : Math.max(m[(x + 1) * t + f], m[x * t + f + 1]);
  const g = [], h = (x, f) => {
    const k = g[g.length - 1];
    k && k.op === f ? k.text += x : g.push({ text: x, op: f });
  };
  let i = 0, o = 0;
  for (; i < d.length && o < u.length; )
    d[i].trimEnd() === u[o].trimEnd() ? (h(u[o], "same"), i++, o++) : m[(i + 1) * t + o] >= m[i * t + o + 1] ? h(d[i++], "removed") : h(u[o++], "added");
  for (; i < d.length; ) h(d[i++], "removed");
  for (; o < u.length; ) h(u[o++], "added");
  return g;
}
function As(l, r) {
  return l.filter((d) => d.op === "same" || d.op === (r === "old" ? "removed" : "added"));
}
const we = { preserveScroll: !0, preserveState: !0 };
function Ts({ entryId: l, comments: r }) {
  const [d, u] = N.useState(null), [p, t] = N.useState(""), [m, g] = N.useState(!1), h = (o, x) => j.router.post(B(`cms/comments/${o}/status`), { status: x }, we), i = (o) => j.router.post(B(`cms/comments/${o}/reply`), { body: p }, {
    ...we,
    onStart: () => g(!0),
    onFinish: () => g(!1),
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
      headerAction: r && r.counts.pending > 0 ? /* @__PURE__ */ e.jsx(a.Badge, { children: s(":count pending", { count: r.counts.pending }) }) : void 0,
      children: r ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: s(":approved approved · :pending pending · :spam spam", { approved: r.counts.approved, pending: r.counts.pending, spam: r.counts.spam }) }),
        r.latest.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: s("No comments yet.") }),
        r.latest.map((o) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5 cms:border-t cms:border-border/70 cms:pt-3 cms:first-of-type:border-t-0 cms:first-of-type:pt-0", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium", children: o.author }),
            o.status === "pending" && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", children: s("Pending") })
          ] }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:line-clamp-3 cms:break-words cms:whitespace-pre-line", children: o.excerpt }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
            S(o.createdAt),
            o.reply ? ` · ${s("a reply")}` : ""
          ] }),
          r.canModerate && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-1", children: [
            o.status === "pending" && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => h(o.id, "approved"), children: [
              /* @__PURE__ */ e.jsx($e, {}),
              " ",
              s("Approve")
            ] }),
            /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => h(o.id, "spam"), children: [
              /* @__PURE__ */ e.jsx(cs, {}),
              " ",
              s("Spam")
            ] }),
            /* @__PURE__ */ e.jsxs(
              a.Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                "aria-expanded": d === o.id,
                onClick: () => {
                  u(d === o.id ? null : o.id), t("");
                },
                children: [
                  /* @__PURE__ */ e.jsx(os, {}),
                  " ",
                  s("Reply")
                ]
              }
            )
          ] }),
          d === o.id && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              a.Textarea,
              {
                "aria-label": s("Reply to :author", { author: o.author }),
                rows: 3,
                value: p,
                onChange: (x) => t(x.target.value)
              }
            ),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
              /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "sm", disabled: p.trim() === "" || m, onClick: () => i(o.id), children: s("Post reply") }),
              /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => u(null), children: s("Cancel") })
            ] })
          ] })
        ] }, o.id)),
        /* @__PURE__ */ e.jsx("a", { href: B(`cms/comments?entry=${l}`), className: "cms:text-sm cms:font-medium cms:underline-offset-4 cms:hover:underline", children: s("All comments on this entry") })
      ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-10" }),
        /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-10" })
      ] })
    }
  );
}
function ke(l) {
  if (l.length === 0) return "";
  const r = l.slice(0, 5).map((d) => d.label).join("; ");
  return ` ${l.length > 5 ? s("It's used by :list and :count more: those links will show nothing.", { list: r, count: l.length - 5 }) : s("It's used by :list: those links will show nothing.", { list: r })}`;
}
function ut(l) {
  const { entry: r } = l;
  return /* @__PURE__ */ e.jsx(Bs, { ...l }, r ? `${r.id}:${r.locale}:${r.version}:${r.status}:${r.trashed}:${r.publishedAt}` : "new");
}
function Bs({ collection: l, fields: r, locales: d = [], shared: u = [], sharedValues: p = {}, entry: t, values: m, revisions: g, comments: h, termLabels: i, usedBy: o = [], undoRestore: x = null, machineTranslate: f = null, machineTranslateMissing: k = !1, settings: T, taxonomies: b = [], blueprints: P = [], blueprintUrl: q = null, homepage: z, redirectsUrl: Ie = null, templates: Re = null, can: w }) {
  const K = B(`cms/collections/${l.handle}/entries`), y = t ? B(`cms/entries/${t.id}`) : K, ee = t ? m.title : s("New entry");
  a.useBreadcrumbs([{ label: l.title, href: K }, { label: ee }]);
  const [I, Ve] = ls(), [Oe, H] = N.useState(!1), se = t?.publishedAt ? De(new Date(t.publishedAt)) : "", [ce, oe] = N.useState(se);
  N.useEffect(() => oe(se), [se]);
  const [R, de] = N.useState(null), [Ue, me] = N.useState(!1), [qe, ue] = N.useState(!1), [Ke, te] = N.useState(!1), c = j.useForm({
    ...m,
    seo: m.seo ?? {},
    terms: Array.isArray(m.terms) || !m.terms ? {} : m.terms,
    locale: t?.locale ?? null,
    version: t?.version ?? null,
    publish: !1,
    published_at: null,
    parent_id: T?.parentId ?? null,
    template: T?.template ?? "",
    comments_closed: T?.commentsClosed === !0
  }), he = (n) => c.setData((v) => ({ ...v, ...n })), V = t ? { locale: t.locale } : {}, M = d.find((n) => n.main)?.code, C = c.errors, G = j.usePage().props.errors ?? {}, O = (n) => {
    const v = xs(C, n);
    v.length > 0 && c.clearErrors(...v);
  }, _ = t !== null && t.status !== "draft" && !t.hasUnpublishedChanges && !c.isDirty, J = Je(t?.status ?? "draft", ce, t?.publishedAt ?? null), pe = t === null ? w.create : w.update && !t.trashed, Y = t?.status === "scheduled", L = t ? Qe(t) : null, W = t?.live?.changed ?? [], xe = (n) => W.includes(n) ? /* @__PURE__ */ e.jsx(Z, {}) : null, Q = l.pages !== !1, ae = (n) => {
    const { terms: v, ...$ } = n, ge = w.terms === !0 && b.length > 0 ? { ...$, terms: v } : $;
    if (T || t === null) return ge;
    const { parent_id: Os, template: Us, comments_closed: qs, ...Ge } = ge;
    return Ge;
  }, le = Array.isArray(i) || !i ? {} : i, ne = (n = !1, v = null) => {
    c.transform(($) => ({ ...ae($), publish: n, published_at: v })), t ? c.put(y, { preserveScroll: !0, onSuccess: () => H(!1) }) : c.post(y);
  }, He = () => {
    c.transform((n) => ({ ...ae(n), version: null, publish: !1, published_at: null })), c.put(y, { preserveScroll: !0 });
  }, A = a.useEditLock({
    type: "cms.entry",
    id: t?.id,
    locale: t?.locale,
    enabled: t !== null && pe,
    noun: s("entry"),
    leaveTo: K,
    getUnsaved: () => c.isDirty ? { title: c.data.title, slug: c.data.slug, data: c.data.data, seo: c.data.seo, terms: c.data.terms } : null
  }), D = pe && !A.readOnly, Ye = async (n) => {
    const v = await A.loadKept(n);
    c.setData(($) => ({ ...$, title: v.title ?? $.title, slug: v.slug ?? $.slug, data: v.data ?? $.data, seo: v.seo ?? $.seo, terms: v.terms ?? $.terms }));
  };
  a.useUnsavedChanges(c.isDirty && !A.takenOver, D ? () => c.processing || ne() : void 0);
  const We = () => {
    const n = () => j.router.post(`${y}/review`, V, { preserveScroll: !0 });
    c.isDirty ? (c.transform((v) => ({ ...ae(v), publish: !1, published_at: null })), c.put(y, { preserveScroll: !0, onSuccess: n })) : n();
  }, X = (n = null) => {
    w.update ? ne(!0, n) : t && j.router.post(`${y}/publish`, { ...V, published_at: n }, { preserveScroll: !0, onSuccess: () => H(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (n) => {
    n.preventDefault(), ne();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(j.Head, { title: ee }),
    Ve,
    A.dialogs,
    /* @__PURE__ */ e.jsxs(
      a.PageHeader,
      {
        title: ee,
        back: { href: K, label: s("Back to :title", { title: l.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          t?.trashed && w.delete && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", onClick: () => j.router.post(`${y}/restore`, {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(bs, {}),
            " ",
            s("Restore")
          ] }),
          t?.trashed && w.delete && /* @__PURE__ */ e.jsxs(
            a.Button,
            {
              type: "button",
              variant: "outline",
              className: "cms:text-destructive",
              onClick: () => I(
                s(`Permanently delete ":title" in every language, with its revisions? This can't be undone.`, { title: m.title }) + ke(o),
                () => j.router.delete(`${y}/force`, { data: o.length > 0 ? { force: 1 } : {} })
              ),
              children: [
                /* @__PURE__ */ e.jsx(be, {}),
                " ",
                s("Permanently delete")
              ]
            }
          ),
          t && !t.trashed && (Q || w.create || w.delete && !A.readOnly || D && f !== null || q) && /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "icon", "aria-label": s("More actions"), children: /* @__PURE__ */ e.jsx(Ns, {}) }) }),
            /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", className: "cms:min-w-52", children: [
              D && f !== null && /* @__PURE__ */ e.jsxs(
                a.DropdownMenuItem,
                {
                  disabled: c.processing || c.isDirty,
                  title: c.isDirty ? void 0 : s("Fill in what isn't translated yet, into the draft"),
                  onSelect: () => j.router.post(B(`cms/entries/${t.id}/translations/${t.locale}/translate`), { version: t.version }, { preserveScroll: !0 }),
                  children: [
                    /* @__PURE__ */ e.jsx(ve, {}),
                    " ",
                    c.isDirty ? s("Save to translate") : s("Translate from :language", { language: d.find((n) => n.main)?.name ?? (M ? E(M) : s("the main language")) })
                  ]
                }
              ),
              Q && /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { title: s("A link that shows the saved draft to anyone, without signing in, for a while"), onSelect: () => ue(!0), children: [
                /* @__PURE__ */ e.jsx(vs, {}),
                " ",
                s("Share preview link…")
              ] }),
              w.create && /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { title: s("Copy every language as a new draft"), onSelect: () => j.router.post(`${y}/duplicate`), children: [
                /* @__PURE__ */ e.jsx(Te, {}),
                " ",
                s("Duplicate")
              ] }),
              q && /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(j.Link, { href: q, children: [
                /* @__PURE__ */ e.jsx(js, {}),
                " ",
                s("Edit blueprint")
              ] }) }),
              w.delete && !A.readOnly && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
                /* @__PURE__ */ e.jsxs(
                  a.DropdownMenuItem,
                  {
                    className: "cms:text-destructive",
                    onSelect: () => I(s('Move ":title" to the trash? It comes off the site; you can restore it.', { title: m.title }) + ke(o), () => j.router.delete(y), s("Move to trash")),
                    children: [
                      /* @__PURE__ */ e.jsx(be, {}),
                      " ",
                      s("Move to trash")
                    ]
                  }
                )
              ] })
            ] })
          ] }),
          t && D && k && /* @__PURE__ */ e.jsxs("span", { title: s("Machine translation isn't set up on this site: ask your developer (SUNRICE_TRANSLATE_DRIVER, see Help → Developer docs → Machine translation)."), children: [
            /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", disabled: !0, "aria-describedby": "machine-translate-missing", children: [
              /* @__PURE__ */ e.jsx(ve, {}),
              " ",
              s("Translate from :language", { language: d.find((n) => n.main)?.name ?? (M ? E(M) : s("the main language")) })
            ] }),
            /* @__PURE__ */ e.jsx("span", { id: "machine-translate-missing", className: "cms:sr-only", children: s("Machine translation isn't set up on this site: ask your developer.") })
          ] }),
          D && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", variant: t ? "outline" : "default", disabled: c.processing, children: [
            c.processing && /* @__PURE__ */ e.jsx(Be, { className: "cms:animate-spin" }),
            t ? s("Save draft") : s("Create draft")
          ] }),
          t && !t.trashed && D && !w.publish && (t.status === "draft" || t.hasUnpublishedChanges || c.isDirty) && /* @__PURE__ */ e.jsxs(
            a.Button,
            {
              type: "button",
              disabled: c.processing,
              onClick: We,
              title: t.review ? s("Already sent; sending again tells them again") : s("Ask those who can publish to review it"),
              children: [
                /* @__PURE__ */ e.jsx(ys, {}),
                " ",
                t.review ? s("Send for review again") : s("Submit for review")
              ]
            }
          ),
          t && !t.trashed && w.publish && !A.readOnly && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex", children: [
            Y && _ ? /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", className: "cms:rounded-r-none", disabled: c.processing, title: s("Change the date"), onClick: () => H(!0), children: [
              /* @__PURE__ */ e.jsx(re, {}),
              " ",
              s("Scheduled for :date", { date: S(t.publishedAt) })
            ] }) : /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: _ ? "outline" : "default", className: "cms:rounded-r-none cms:disabled:opacity-100", disabled: c.processing || _, onClick: () => X(J.at), children: [
              _ && /* @__PURE__ */ e.jsx($e, { className: "cms:text-emerald-600 cms:dark:text-emerald-400" }),
              _ ? s("Published") : J.action === "schedule" ? s("Schedule") : J.action === "backdate" ? s("Publish now, back-dated") : t.status === "draft" ? s("Publish") : s("Publish changes")
            ] }),
            /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
              /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "icon", variant: _ ? "outline" : "default", className: _ ? "cms:-ml-px cms:rounded-l-none" : "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": s("More publishing options"), children: /* @__PURE__ */ e.jsx(ms, {}) }) }),
              /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", children: [
                /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { onSelect: () => H(!0), children: [
                  /* @__PURE__ */ e.jsx(re, {}),
                  " ",
                  Y ? s("Change the date…") : s("Publish on a date…")
                ] }),
                Y && /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => X((/* @__PURE__ */ new Date()).toISOString()), children: s("Publish now") }),
                t.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
                  /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => j.router.post(`${y}/unpublish`, V, { preserveScroll: !0 }), children: Y ? s("Unschedule (back to draft)") : s("Unpublish") })
                ] })
              ] })
            ] })
          ] })
        ] }),
        children: [
          t && (t.trashed ? /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: s("In the trash") }) : /* @__PURE__ */ e.jsx(fe, { status: t.status, changes: t.status !== "draft" && t.hasUnpublishedChanges })),
          t?.review && !t.trashed && /* @__PURE__ */ e.jsx(a.Badge, { variant: "warning", title: t.review.by ? s(":name sent it on :date", { name: t.review.by, date: S(t.review.requestedAt) }) : s("Sent on :date", { date: S(t.review.requestedAt) }), children: s("Waiting for review") })
        ]
      }
    ),
    t && L && /* @__PURE__ */ e.jsx(
      Is,
      {
        state: L,
        entry: t,
        dirty: c.isDirty,
        actions: Xe(L, { liveUrl: t.url !== null, pages: Q, canUpdate: D }),
        onCompare: () => me(!0),
        onDiscard: () => I(
          s(`Discard the unpublished changes to ":title"? The editor goes back to the live version, as visitors see it. This can't be undone.`, { title: m.title }) + (c.isDirty ? ` ${s("Your unsaved edits are lost too.")}` : ""),
          () => j.router.post(B(`cms/entries/${t.id}/translations/${t.locale}/discard`), { version: t.version }, { preserveScroll: !0 }),
          s("Discard changes")
        )
      }
    ),
    t && d.length > 1 && /* @__PURE__ */ e.jsx(
      Es,
      {
        entryUrl: y,
        editUrl: `${K}/${t.id}/edit`,
        current: t.locale,
        locales: d,
        canAdd: (w.create || w.translate === !0) && !t.trashed,
        canRemove: w.delete && !t.isMain && !t.trashed,
        onRemove: () => I(
          s('Remove the :language translation of ":title"? Its revisions go with it.', { language: E(t.locale), title: m.title }),
          () => j.router.delete(`${y}/translations/${t.locale}`)
        )
      }
    ),
    /* @__PURE__ */ e.jsx(a.ViewingNotice, { by: A.viewingBy, onTakeOver: A.requestTakeOver }),
    /* @__PURE__ */ e.jsx(a.KeptEditsNotice, { kept: A.kept, disabled: !D, onLoad: (n) => {
      Ye(n);
    }, onDiscard: (n) => {
      A.discardKept(n);
    } }),
    C.version && /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: [
      /* @__PURE__ */ e.jsx("span", { children: C.version }),
      /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => j.router.reload(), children: s("Load theirs") }),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            type: "button",
            variant: "destructive",
            size: "sm",
            disabled: c.processing,
            onClick: () => I(s("Save your version over theirs? Their changes are replaced (their earlier published versions stay in the revisions)."), He),
            children: s("Save mine anyway")
          }
        )
      ] })
    ] }),
    (C.entry || C.published_at || G.published_at || G.homepage) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: C.entry ?? C.published_at ?? G.published_at ?? G.homepage }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_18rem]", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsx(a.CardContent, { children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: !D, className: "cms:grid cms:gap-4 cms:md:grid-cols-[2fr_1fr]", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsxs(a.Label, { htmlFor: "title", children: [
              s("Title"),
              xe("title")
            ] }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "title",
                value: c.data.title,
                "aria-invalid": C.title !== void 0,
                onChange: (n) => {
                  const v = n.target.value;
                  c.setData(($) => ({ ...$, title: v, slug: Ze($.slug, $.title, v, t !== null && t.publishedAt === null && t.status === "draft") })), O("title");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(F, { message: C.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsxs(a.Label, { htmlFor: "slug", children: [
              s("Slug"),
              xe("slug")
            ] }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "slug",
                className: "cms:font-mono",
                value: c.data.slug,
                placeholder: s("Made from the title"),
                "aria-invalid": C.slug !== void 0,
                onChange: (n) => {
                  c.setData("slug", n.target.value), O("slug");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(ns, { note: es(t?.publishedSlug, c.data.slug, t !== null && t.status !== "draft"), redirectsUrl: Ie }),
            /* @__PURE__ */ e.jsx(F, { message: C.slug })
          ] })
        ] }) }) }),
        /* @__PURE__ */ e.jsx(Ae.Provider, { value: le, children: /* @__PURE__ */ e.jsx(
          ds,
          {
            disabled: !D,
            fields: r,
            values: c.data.data,
            errors: C,
            storageKey: `cms:entry:${l.handle}`,
            shared: u,
            sharedValues: p,
            changed: W,
            sharedNote: M ? s("Shared by all languages: the greyed-out fields are edited in :language.", { language: E(M) }) : s("Shared by all languages: the greyed-out fields are edited in the main language."),
            onChange: (n, v) => {
              c.setData("data", { ...c.data.data, [n]: v }), O(`data.${n}`);
            }
          }
        ) }),
        /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: W.some((n) => n.startsWith("seo.")) ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          s("SEO"),
          /* @__PURE__ */ e.jsx(Z, {})
        ] }) : s("SEO"), description: s("How this entry appears in search results and shared links."), titleClassName: "cms:text-base", storageKey: "cms:entry:seo", hasErrors: ps(C, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !D, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(
          us,
          {
            bare: !0,
            id: "seo",
            fields: fs(),
            value: c.data.seo,
            errors: hs(C, "seo"),
            onChange: (n) => {
              c.setData("seo", n), O("seo");
            }
          }
        ) }) })
      ] }),
      !t && (l.hierarchical || b.length > 0) && /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-4", children: [
        l.hierarchical && /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: "Page settings", titleClassName: "cms:text-base", storageKey: "cms:entry:page-settings", hasErrors: C.parent_id !== void 0, children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !D, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-4 cms:text-sm", children: /* @__PURE__ */ e.jsx(ze, { collection: l, value: c.data.parent_id, error: C.parent_id, onChange: (n) => he({ parent_id: n }) }) }) }),
        /* @__PURE__ */ e.jsx(
          ye,
          {
            taxonomies: b,
            value: c.data.terms,
            labels: le,
            errors: C,
            changed: W,
            disabled: !D || w.terms !== !0,
            onChange: (n, v) => {
              c.setData("terms", { ...c.data.terms, [n]: v }), O(`terms.${n}`);
            }
          }
        )
      ] }),
      t && /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: s("Status"), titleClassName: "cms:text-base", storageKey: "cms:entry:status", contentClassName: "cms:flex cms:flex-col cms:gap-3 cms:text-sm", children: [
          /* @__PURE__ */ e.jsxs("dl", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-3", children: [
              /* @__PURE__ */ e.jsx("dt", { className: "cms:text-muted-foreground", children: s("Status") }),
              /* @__PURE__ */ e.jsx("dd", { className: "cms:flex cms:flex-wrap cms:justify-end cms:gap-1", children: t.trashed ? /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: s("In the trash") }) : /* @__PURE__ */ e.jsx(fe, { status: t.status, changes: t.status !== "draft" && t.hasUnpublishedChanges }) })
            ] }),
            t.status !== "draft" && t.publishedAt && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-baseline cms:justify-between cms:gap-3", children: [
              /* @__PURE__ */ e.jsx("dt", { className: "cms:text-muted-foreground", children: t.status === "scheduled" ? s("Scheduled for") : s("Published") }),
              /* @__PURE__ */ e.jsx("dd", { className: "cms:text-right cms:tabular-nums", children: S(t.publishedAt) })
            ] })
          ] }),
          t.review && /* @__PURE__ */ e.jsxs("p", { className: "cms:text-muted-foreground", children: [
            t.review.by ? s("Sent for review by :name · :date.", { name: t.review.by, date: S(t.review.requestedAt) }) : s("Sent for review · :date.", { date: S(t.review.requestedAt) }),
            w.publish ? ` ${s("Publishing it answers the request.")}` : ""
          ] }),
          t.review && !t.trashed && (t.review.mine || w.publish && !A.readOnly) && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: [
            w.publish && !A.readOnly && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", disabled: c.processing, onClick: () => te(!0), children: [
              /* @__PURE__ */ e.jsx(ie, {}),
              " ",
              s("Send back…")
            ] }),
            t.review.mine && /* @__PURE__ */ e.jsx(
              a.Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                disabled: c.processing,
                title: s("Take the request back, to keep working on it"),
                onClick: () => j.router.post(`${y}/review/withdraw`, V, { preserveScroll: !0 }),
                children: s("Withdraw the request")
              }
            )
          ] }),
          !t.trashed && w.publish && !A.readOnly && /* @__PURE__ */ e.jsx(
            Ps,
            {
              status: t.status,
              value: ce,
              onChange: oe,
              dated: J,
              processing: c.processing,
              onPublish: (n) => X(n),
              onUnpublish: () => j.router.post(`${y}/unpublish`, V, { preserveScroll: !0 })
            }
          ),
          z?.is && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: s("This is the site's homepage.") }),
          z && !z.is && z.can && t.status === "published" && !t.trashed && /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "cms:mt-1 cms:self-start",
              onClick: () => I(
                (z.current ? s('Make ":title" the homepage? Visitors to / will see it instead of ":current".', { title: m.title, current: z.current }) : s('Make ":title" the homepage? Visitors to / will see it.', { title: m.title })) + " " + s("Its own address will lead to / as well."),
                () => j.router.post(`${y}/homepage`, {}, { preserveScroll: !0 }),
                s("Make this the homepage")
              ),
              children: s("Make this the homepage")
            }
          ),
          d.find((n) => n.code === t.locale)?.outdated && /* @__PURE__ */ e.jsx("p", { className: "cms:text-amber-700 cms:dark:text-amber-400", children: M ? s("The :language version changed since this translation was last saved.", { language: E(M) }) : s("The main version changed since this translation was last saved.") })
        ] }),
        /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: s("Used by"), titleClassName: "cms:text-base", storageKey: "cms:entry:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          o.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: s("No other content links here.") }),
          o.map((n) => /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
            n.url ? /* @__PURE__ */ e.jsx("a", { href: n.url, className: "cms:block cms:truncate cms:underline-offset-4 cms:hover:underline", children: n.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:truncate", children: n.label }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", title: n.field, children: n.fieldLabel ?? n.field })
          ] }, `${n.label}:${n.field}`))
        ] }),
        T && /* @__PURE__ */ e.jsx(
          Vs,
          {
            entryUrl: y,
            collection: l,
            settings: T,
            templates: Re,
            blueprints: P,
            disabled: !D,
            values: c.data,
            errors: C,
            onChange: he,
            draftDirty: c.isDirty,
            commentCount: h ? h.counts.pending + h.counts.approved : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          ye,
          {
            taxonomies: b,
            value: c.data.terms,
            labels: le,
            errors: C,
            changed: W,
            disabled: !D || w.terms !== !0,
            onChange: (n, v) => {
              c.setData("terms", { ...c.data.terms, [n]: v }), O(`terms.${n}`);
            }
          }
        ),
        h !== null && l.comments && /* @__PURE__ */ e.jsx(Ts, { entryId: t.id, comments: h }),
        /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: s("Revisions"), titleClassName: "cms:text-base", storageKey: "cms:entry:revisions", contentClassName: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
          x !== null && w.update && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => j.router.post(B(`cms/entries/${t.id}/translations/${t.locale}/undo-restore`), {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(ie, {}),
            " ",
            s("Undo the restore")
          ] }),
          /* @__PURE__ */ e.jsx(j.Deferred, { data: "revisions", fallback: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-8" }),
            /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-8" })
          ] }), children: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            (g ?? []).length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: s("Each publish keeps one.") }),
            (g ?? []).map((n) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1 cms:border-b cms:border-border/60 cms:pb-2 cms:last:border-b-0 cms:last:pb-0", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
                /* @__PURE__ */ e.jsx("div", { className: "cms:truncate", children: n.title }),
                /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
                  S(n.createdAt),
                  n.author ? ` · ${n.author}` : ""
                ] }),
                /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: n.changed === null ? s("First kept version") : n.changed.length === 0 ? s("No field changed") : s("Changed: :fields", { fields: n.changed.join(", ") }) })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-1", children: [
                /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => de(n), children: s("Compare") }),
                w.update && !t.trashed && /* @__PURE__ */ e.jsx(
                  a.Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    onClick: () => j.router.post(B(`cms/entries/${t.id}/revisions/${n.id}/restore`), {}, { preserveScroll: !0 }),
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
      Ms,
      {
        open: Ke,
        onClose: () => te(!1),
        by: t.review.by,
        onSend: (n, v) => j.router.post(`${y}/review/send-back`, { ...V, note: n }, { preserveScroll: !0, onSuccess: () => {
          te(!1), v();
        }, onError: v })
      }
    ),
    t && L && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      /* @__PURE__ */ e.jsx(
        Se,
        {
          open: Ue,
          onClose: () => me(!1),
          dirty: c.isDirty,
          url: B(`cms/entries/${t.id}/translations/${t.locale}/compare-live`),
          read: (n) => ({ label: String(n.label), old: String(n.live ?? ""), new: String(n.draft ?? "") }),
          title: s("Your changes compared with the live version"),
          description: s("What visitors see, beside your saved changes. Removed words are struck through, added ones highlighted."),
          oldLabel: Ls(t.live),
          newLabel: s("Your changes (not published)"),
          same: s("Your changes are the same as the live version.")
        }
      ),
      /* @__PURE__ */ e.jsx(
        Se,
        {
          open: R !== null,
          onClose: () => de(null),
          dirty: c.isDirty,
          url: R ? B(`cms/entries/${t.id}/revisions/${R.id}/compare`) : null,
          read: (n) => ({ label: String(n.label), old: String(n.revision ?? ""), new: String(n.draft ?? "") }),
          title: s("Version of :date compared with :current", { date: S(R?.createdAt), current: Ne(L) }),
          description: s("A version published earlier, beside :current. Removed words are struck through, added ones highlighted.", { current: Ne(L) }),
          oldLabel: R ? Fs(R) : "",
          newLabel: zs(L),
          same: s("The two versions are the same.")
        }
      ),
      Q && /* @__PURE__ */ e.jsx(Rs, { open: qe, onClose: () => ue(!1), url: t.previewUrl, expiresAt: t.previewExpiresAt ?? null })
    ] }),
    /* @__PURE__ */ e.jsx(
      _s,
      {
        open: Oe,
        onClose: () => H(!1),
        processing: c.processing,
        rescheduling: Y,
        current: t?.publishedAt ?? null,
        onSchedule: (n) => X(n)
      }
    )
  ] });
}
function Ms({ open: l, onClose: r, by: d, onSend: u }) {
  const [p, t] = N.useState(""), [m, g] = N.useState(!1), h = j.usePage().props.errors ?? {};
  return N.useEffect(() => {
    l && t("");
  }, [l]), /* @__PURE__ */ e.jsx(a.Dialog, { open: l, onOpenChange: (i) => !i && !m && r(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: s("Send back without publishing") }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: d ? s(":name gets an email with your note, and the request is cleared. The draft stays as it is.", { name: d }) : s("The one who asked gets an email with your note, and the request is cleared. The draft stays as it is.") })
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
          onChange: (i) => t(i.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(F, { message: h.note })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", disabled: m, onClick: r, children: s("Cancel") }),
      /* @__PURE__ */ e.jsxs(a.Button, { type: "button", disabled: m, onClick: () => {
        g(!0), u(p, () => g(!1));
      }, children: [
        m && /* @__PURE__ */ e.jsx(Be, { className: "cms:animate-spin" }),
        " ",
        s("Send back")
      ] })
    ] })
  ] }) });
}
function Es({ entryUrl: l, editUrl: r, current: d, locales: u, canAdd: p, canRemove: t, onRemove: m }) {
  const g = u.filter((i) => i.status !== null), h = u.filter((i) => i.status === null);
  return /* @__PURE__ */ e.jsxs("nav", { "aria-label": s("Languages"), className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("div", { className: "cms:inline-flex cms:items-center cms:gap-0.5 cms:rounded-md cms:bg-muted cms:p-0.5", children: g.map((i) => {
      const o = i.code === d, x = i.main ? s(":language (main)", { language: i.name ?? E(i.code) }) : i.name ?? E(i.code), f = i.status ? ss(i.status) : "", k = i.outdated ? s(":language: :status, outdated (the main language changed since)", { language: x, status: f }) : s(":language: :status", { language: x, status: f });
      return /* @__PURE__ */ e.jsxs(
        "button",
        {
          type: "button",
          title: k,
          "aria-label": k,
          "aria-current": o ? "page" : void 0,
          onClick: () => !o && j.router.get(r, { locale: i.code }),
          className: `cms:relative cms:inline-flex cms:h-7 cms:min-w-10 cms:items-center cms:justify-center cms:gap-1.5 cms:rounded cms:px-2.5 cms:text-xs cms:font-semibold cms:tracking-wide cms:uppercase cms:transition-colors ${o ? "cms:bg-card cms:text-foreground cms:shadow-xs" : "cms:text-muted-foreground cms:hover:text-foreground"}`,
          children: [
            i.code,
            (i.outdated || i.status === "published") && /* @__PURE__ */ e.jsx("span", { "aria-hidden": !0, className: `cms:size-1.5 cms:rounded-full ${i.outdated ? "cms:bg-amber-500" : "cms:bg-emerald-500"}` })
          ]
        },
        i.code
      );
    }) }),
    p && h.map((i) => /* @__PURE__ */ e.jsxs(
      a.Button,
      {
        type: "button",
        variant: "outline",
        size: "sm",
        className: "cms:h-8 cms:border-dashed cms:text-xs cms:uppercase",
        title: s("Add :language", { language: i.name ?? E(i.code) }),
        onClick: () => j.router.post(`${l}/translations`, { locale: i.code }),
        children: [
          /* @__PURE__ */ e.jsx(ks, {}),
          " ",
          i.code
        ]
      },
      i.code
    )),
    t && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:ml-auto cms:text-destructive", onClick: m, children: s("Remove this language") })
  ] });
}
function Ps({ status: l, value: r, onChange: d, dated: u, processing: p, onPublish: t, onUnpublish: m }) {
  const g = u.action !== "now", h = {
    now: s("Publish"),
    schedule: l === "scheduled" ? s("Reschedule") : s("Schedule"),
    backdate: s("Publish now, back-dated"),
    redate: s("Change date")
  }[u.action];
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:border-t cms:border-border/60 cms:pt-3", children: [
    /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "entry-published-at", children: s("Publish date") }),
    /* @__PURE__ */ e.jsx(a.DatePicker, { id: "entry-published-at", withTime: !0, className: "cms:max-w-none", value: r || null, onChange: (i) => d(i ?? "") }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: l === "draft" ? s("Empty: now. A date in the future schedules it.") : s("The date shown as published. A date in the future takes it off the site until then.") }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: [
      (l === "draft" || g) && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", size: "sm", disabled: p, onClick: () => t(u.at), children: [
        /* @__PURE__ */ e.jsx(re, {}),
        " ",
        h
      ] }),
      l !== "draft" && /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "sm", variant: "outline", disabled: p, onClick: m, children: s("Unpublish") })
    ] })
  ] });
}
function _s({ open: l, onClose: r, onSchedule: d, current: u, processing: p, rescheduling: t }) {
  const [m, g] = N.useState("");
  N.useEffect(() => {
    l && g(De(ts(u)));
  }, [l, u]);
  const h = m === "" ? null : new Date(m), i = h !== null && h.getTime() <= Date.now();
  return /* @__PURE__ */ e.jsx(a.Dialog, { open: l, onOpenChange: (o) => !o && r(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: t ? s("Change the publish date") : s("Publish on a date") }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: s("The entry goes live then.") })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "published-at", children: s("Date and time") }),
      /* @__PURE__ */ e.jsx(a.DatePicker, { id: "published-at", withTime: !0, required: !0, className: "cms:max-w-none", value: m || null, onChange: (o) => g(o ?? "") }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s("In your time zone.") }),
      i && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-amber-700 cms:dark:text-amber-400", children: s("This date has passed: the entry goes live now, dated :date.", { date: S(h.toISOString()) }) })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: r, children: s("Cancel") }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", disabled: h === null || p, onClick: () => h && d(h.toISOString()), children: i ? s("Publish now, back-dated") : t ? s("Change the date") : s("Schedule") })
    ] })
  ] }) });
}
function Ls(l) {
  return l?.publishedAt ? l.by ? s("Live (published :date by :name)", { date: S(l.publishedAt), name: l.by }) : s("Live (published :date)", { date: S(l.publishedAt) }) : s("Live");
}
function Fs(l) {
  return l.author ? s("Version of :date by :name", { date: S(l.createdAt), name: l.author }) : s("Version of :date", { date: S(l.createdAt) });
}
function zs(l) {
  return l === "live" ? s("Live") : l === "scheduled" ? s("Published (scheduled)") : l === "draft" || l === "trashed" ? s("Draft (not published)") : s("Your changes (not published)");
}
function Ne(l) {
  return l === "live" ? s("the live version") : l === "scheduled" ? s("the scheduled version") : l === "draft" || l === "trashed" ? s("the draft") : s("your changes");
}
function Is({ state: l, entry: r, dirty: d, actions: u, onCompare: p, onDiscard: t }) {
  const m = r.live, g = m?.publishedAt ? m.by ? s("the version published on :date by :name", { date: S(m.publishedAt), name: m.by }) : s("the version published on :date", { date: S(m.publishedAt) }) : s("the version last published"), h = {
    draft: { title: s("Not published yet"), text: s("Only people who can edit see it."), tone: "muted" },
    offline: { title: s("Not published yet"), text: s("Taken off the site: only people who can edit see it."), tone: "muted" },
    scheduled: { title: s("Scheduled"), text: s("Goes live on :date.", { date: S(r.publishedAt) }), tone: "scheduled" },
    "scheduled-changes": { title: s("Scheduled, with unpublished changes"), text: s("Goes live on :date with :version; your changes since aren't in it.", { date: S(r.publishedAt), version: g }), tone: "pending" },
    live: { title: s("Live"), text: d ? s("Visitors see what was last published.") : s("Visitors see exactly this."), tone: "live" },
    "live-changes": { title: s("Live, with unpublished changes"), text: s("Visitors still see :version.", { version: g }), tone: "pending" },
    trashed: { title: s("In the trash"), text: s("It's off the site. Restore it to edit it again."), tone: "trash" }
  }, { title: i, text: o, tone: x } = h[l], f = { muted: "cms:bg-muted-foreground/50", live: "cms:bg-emerald-500", pending: "cms:bg-amber-500", scheduled: "cms:bg-sky-500", trash: "cms:bg-destructive" }[x], k = x === "pending" ? "cms:border-amber-500/40 cms:bg-amber-500/5" : x === "live" ? "cms:border-emerald-500/30 cms:bg-emerald-500/5" : "cms:border-border cms:bg-card", T = as(l);
  return /* @__PURE__ */ e.jsxs(
    "section",
    {
      "aria-label": s("Publishing status"),
      "data-state": l,
      className: `cms:flex cms:flex-col cms:gap-3 cms:rounded-lg cms:border cms:px-4 cms:py-3 cms:md:flex-row cms:md:items-center cms:md:justify-between ${k}`,
      children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-start cms:gap-3", children: [
          /* @__PURE__ */ e.jsx("span", { "aria-hidden": !0, className: `cms:mt-1.5 cms:size-2.5 cms:shrink-0 cms:rounded-full ${f}` }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0 cms:text-sm", children: [
            /* @__PURE__ */ e.jsx("p", { className: "cms:font-medium", children: i }),
            /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: o }),
            d && /* @__PURE__ */ e.jsx("p", { className: "cms:text-amber-700 cms:dark:text-amber-400", children: s("You have unsaved edits.") })
          ] })
        ] }),
        (u.viewLive || u.compare || u.preview || u.discard) && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-2 cms:md:justify-end", children: [
          u.viewLive && r.url && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: r.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(ws, {}),
            " ",
            s("View live page")
          ] }) }),
          u.compare && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: p, children: [
            /* @__PURE__ */ e.jsx(Ss, {}),
            " ",
            s("Compare with live")
          ] }),
          u.preview && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs(
            "a",
            {
              href: r.previewUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              title: d ? s("Shows what's saved: save first to see your unsaved edits.") : s("Shows what's saved, as visitors would see it once published."),
              children: [
                /* @__PURE__ */ e.jsx(Cs, {}),
                " ",
                T ? s("Preview changes") : s("Preview")
              ]
            }
          ) }),
          u.discard && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:text-destructive", onClick: t, children: [
            /* @__PURE__ */ e.jsx(ie, {}),
            " ",
            s("Discard changes")
          ] })
        ] })
      ]
    }
  );
}
function Ce({ old: l, next: r, side: d }) {
  if ((d === "old" ? l : r).trim() === "") return /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground cms:italic", children: s("(empty)") });
  const p = As($s(l, r), d);
  return /* @__PURE__ */ e.jsx(e.Fragment, { children: p.map((t, m) => t.op === "same" ? /* @__PURE__ */ e.jsx(N.Fragment, { children: t.text }, m) : t.op === "removed" ? /* @__PURE__ */ e.jsx("del", { className: "cms:rounded-sm cms:bg-red-500/15 cms:text-red-900 cms:decoration-red-500/60 cms:dark:text-red-200", children: t.text }, m) : /* @__PURE__ */ e.jsx("ins", { className: "cms:rounded-sm cms:bg-emerald-500/20 cms:text-emerald-900 cms:no-underline cms:dark:text-emerald-200", children: t.text }, m)) });
}
function Se({ open: l, url: r, read: d, title: u, description: p, oldLabel: t, newLabel: m, same: g, onClose: h, dirty: i }) {
  const [o, x] = N.useState(null), [f, k] = N.useState(!1), T = N.useRef(d);
  return T.current = d, N.useEffect(() => {
    if (x(null), k(!1), !l || !r) return;
    let b = !0;
    return fetch(r, { headers: { Accept: "application/json" }, credentials: "same-origin" }).then((P) => P.ok ? P.json() : Promise.reject(new Error(String(P.status)))).then((P) => {
      b && x(P.fields.map((q) => T.current(q)));
    }).catch(() => {
      b && k(!0);
    }), () => {
      b = !1;
    };
  }, [l, r]), /* @__PURE__ */ e.jsx(a.Dialog, { open: l, onOpenChange: (b) => !b && h(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto cms:sm:max-w-3xl", children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: u }),
      /* @__PURE__ */ e.jsxs(a.DialogDescription, { children: [
        p,
        i ? ` ${s("Your unsaved edits aren't included.")}` : ""
      ] })
    ] }),
    f && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: s("The comparison could not be loaded. Try again.") }),
    !f && o === null && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-12" }),
      /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-12" })
    ] }),
    o?.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: g }),
    o && o.length > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: [
      /* @__PURE__ */ e.jsxs("div", { "aria-hidden": !0, className: "cms:hidden cms:gap-2 cms:text-xs cms:font-medium cms:text-muted-foreground cms:sm:grid cms:sm:grid-cols-2", children: [
        /* @__PURE__ */ e.jsx("span", { children: t }),
        /* @__PURE__ */ e.jsx("span", { children: m })
      ] }),
      /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-4", children: o.map((b) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: b.label }),
        /* @__PURE__ */ e.jsxs("dd", { className: "cms:grid cms:gap-2 cms:sm:grid-cols-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:rounded-md cms:border cms:bg-muted/30 cms:p-2 cms:break-words cms:whitespace-pre-wrap", children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:text-xs cms:text-muted-foreground cms:sm:sr-only", children: t }),
            /* @__PURE__ */ e.jsx(Ce, { old: b.old, next: b.new, side: "old" })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:rounded-md cms:border cms:bg-muted/30 cms:p-2 cms:break-words cms:whitespace-pre-wrap", children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:text-xs cms:text-muted-foreground cms:sm:sr-only", children: m }),
            /* @__PURE__ */ e.jsx(Ce, { old: b.old, next: b.new, side: "new" })
          ] })
        ] })
      ] }, b.label)) })
    ] }),
    /* @__PURE__ */ e.jsx(a.DialogFooter, { children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: h, children: s("Close") }) })
  ] }) });
}
function Rs({ open: l, onClose: r, url: d, expiresAt: u }) {
  const p = () => {
    navigator.clipboard?.writeText(d).then(() => a.toast.success(s("Link copied.")), () => a.toast.error(s("Couldn't copy: select the link and copy it.")));
  };
  return /* @__PURE__ */ e.jsx(a.Dialog, { open: l, onOpenChange: (t) => !t && r(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: s("Share preview link") }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: s("Anyone with this link sees what's saved, as the page would look published, without signing in. Visitors of the site don't see it.") })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "preview-link", children: s("Preview link") }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Input, { id: "preview-link", readOnly: !0, value: d, className: "cms:font-mono cms:text-xs", onFocus: (t) => t.target.select() }),
        /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", onClick: p, children: [
          /* @__PURE__ */ e.jsx(Te, {}),
          " ",
          s("Copy")
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
        u ? s("It stops working at :time. Reload the editor for a new one.", { time: S(u) }) : s("It stops working after a while. Reload the editor for a new one."),
        " ",
        s("It shows changes saved after you share it too.")
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(a.DialogFooter, { children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: r, children: s("Close") }) })
  ] }) });
}
function ze({ collection: l, value: r, error: d, onChange: u }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "parent", children: s("Parent") }),
    /* @__PURE__ */ e.jsx(
      rs,
      {
        id: "parent",
        multiple: !1,
        max: 1,
        collections: [l.handle],
        invalid: d !== void 0,
        value: r,
        onChange: (p) => u(typeof p == "number" ? p : null)
      }
    ),
    /* @__PURE__ */ e.jsx(F, { message: d })
  ] });
}
function Vs({ entryUrl: l, collection: r, settings: d, templates: u, blueprints: p, disabled: t, values: m, errors: g, onChange: h, draftDirty: i, commentCount: o = null }) {
  const x = p.length > 1 ? d.blueprint ?? p[0].handle : void 0, f = j.useForm({ blueprint: x ?? "" }), k = f.errors.blueprint, T = ["parent_id", "template", "comments_closed"].some((b) => g[b] !== void 0) || k !== void 0;
  return /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: s("Page settings"), titleClassName: "cms:text-base", storageKey: "cms:entry:page-settings", hasErrors: T, children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: t, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-4 cms:text-sm", children: [
    r.hierarchical && /* @__PURE__ */ e.jsx(ze, { collection: r, value: m.parent_id, error: g.parent_id, onChange: (b) => h({ parent_id: b }) }),
    p.length > 1 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "blueprint", children: s("Blueprint") }),
      /* @__PURE__ */ e.jsxs(a.Select, { value: f.data.blueprint, onValueChange: (b) => f.setData("blueprint", b), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: "blueprint", className: "cms:w-full cms:min-w-0", "aria-invalid": k !== void 0, children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(a.SelectContent, { children: p.map((b) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: b.handle, children: b.title }, b.handle)) })
      ] }),
      f.data.blueprint !== x && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: s("The fields change in every language. Values of fields the new blueprint doesn't have stay saved and come back if you switch back. The editor reloads.") }),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            type: "button",
            size: "sm",
            disabled: f.processing || i,
            title: i ? s("Save your draft first") : void 0,
            onClick: () => f.put(`${l}/settings`, { preserveScroll: !0 }),
            children: s("Change blueprint")
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx(F, { message: k })
    ] }),
    /* @__PURE__ */ e.jsx(
      is,
      {
        id: "template",
        value: m.template,
        onChange: (b) => h({ template: b }),
        lookup: u,
        example: `cms.${r.handle}-landing`,
        automatic: s("Automatic uses the collection's template."),
        error: g.template,
        disabled: t
      }
    ),
    r.comments && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1 cms:border-t cms:border-border/60 cms:pt-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "comments-open", className: "cms:whitespace-nowrap", children: s("Accept new comments") }),
        /* @__PURE__ */ e.jsx(a.Switch, { id: "comments-open", checked: !m.comments_closed, onCheckedChange: (b) => h({ comments_closed: !b }) })
      ] }),
      /* @__PURE__ */ e.jsx("a", { href: B(`cms/comments?entry=${l.split("/").slice(-1)[0]}`), className: "cms:w-fit cms:text-xs cms:text-muted-foreground cms:underline-offset-4 cms:hover:text-foreground cms:hover:underline", children: o === null ? s("View comments") : s("View comments (:count)", { count: o }) })
    ] })
  ] }) });
}
function ye({ taxonomies: l, value: r, labels: d, errors: u, changed: p, disabled: t, onChange: m }) {
  if (l.length === 0) return null;
  const g = p.some((i) => i.startsWith("terms.")), h = u.terms !== void 0 || l.some((i) => u[`terms.${i.handle}`] !== void 0);
  return /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: g ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    s("Taxonomies"),
    /* @__PURE__ */ e.jsx(Z, {})
  ] }) : s("Taxonomies"), titleClassName: "cms:text-base", storageKey: "cms:entry:taxonomies", hasErrors: h, children: /* @__PURE__ */ e.jsx(Ae.Provider, { value: d, children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: t, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-4 cms:text-sm", children: [
    l.map((i) => {
      const o = `terms-${i.handle}`, x = r[i.handle] ?? [], f = u[`terms.${i.handle}`];
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(a.Label, { htmlFor: o, children: [
          i.title,
          p.includes(`terms.${i.handle}`) && /* @__PURE__ */ e.jsx(Z, {})
        ] }),
        /* @__PURE__ */ e.jsx(
          gs,
          {
            id: o,
            taxonomy: i.handle,
            multiple: !i.single,
            max: null,
            required: !1,
            invalid: f !== void 0,
            value: i.single ? x[0] ?? null : x,
            onChange: (k) => m(i.handle, k === null ? [] : Array.isArray(k) ? k : [k])
          }
        ),
        i.single && /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: s("One term only.") }),
        /* @__PURE__ */ e.jsx(F, { message: f })
      ] }, i.handle);
    }),
    /* @__PURE__ */ e.jsx(F, { message: u.terms })
  ] }) }) });
}
export {
  ut as default
};
